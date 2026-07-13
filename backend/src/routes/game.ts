import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';
import crypto from 'crypto';
import {
  trackQuestionOpened,
  trackQuestionAnsweredCorrectly,
  trackQuestionSkipped,
  trackStudentQuestionPerformance
} from '../helpers/questionStats.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

export const STUDENT_RANKS = [
  { id: 'tan-de-tu', name: 'Tân Đệ Tử', icon: '🌱', minLevel: 1 },
  { id: 'de-tu', name: 'Đệ Tử', icon: '🥋', minLevel: 5 },
  { id: 'thieu-hiep', name: 'Thiếu Hiệp', icon: '⚔️', minLevel: 15 },
  { id: 'cao-thu', name: 'Cao Thủ', icon: '⭐', minLevel: 30 },
  { id: 'dai-hiep', name: 'Đại Hiệp', icon: '🐉', minLevel: 50 },
  { id: 'tong-su', name: 'Tông Sư', icon: '👑', minLevel: 80 }
];

export function getStudentRankForLevel(level: number) {
  for (let i = STUDENT_RANKS.length - 1; i >= 0; i--) {
    if (level >= STUDENT_RANKS[i].minLevel) {
      return STUDENT_RANKS[i];
    }
  }
  return STUDENT_RANKS[0];
}

const cleanAnswer = (str: string) => {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[–−]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/[₁]/g, '1')
    .replace(/[₂]/g, '2');
};

// POST /api/game/session/start
router.post('/game/session/start', async (req: any, res) => {
  const { profileId, sessionType, subject, gradeTier, bossId, lessonId, failedQuestionIds = [] } = req.body;

  if (!profileId || !sessionType || !subject || ![6, 7, 8, 9, 10, 11, 12].includes(Number(gradeTier))) {
    return res.status(400).json({ error: 'Missing or invalid profileId, sessionType, subject, or gradeTier.' });
  }

  try {
    if (profileId !== req.profile.id) return res.status(403).json({ error: 'Profile ID does not match active profile.' });

    // Load custom/system questions
    const qRes = await pool.query(
      `SELECT * FROM ge10_custom_questions 
       WHERE (user_id = $1 
          OR user_id IS NULL 
          OR user_id IN (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien')))
         AND subject = $2 AND grade_tier = $3`,
      [profileId, subject, gradeTier]
    );

    let questions = qRes.rows.map((row: any) => ({
      id: row.id,
      type: row.type,
      category: row.category,
      topicId: row.topic_id,
      prompt: row.prompt,
      options: row.options,
      correctAnswer: row.correct_answer,
      explanation: row.explanation,
      difficulty: row.difficulty ?? 5,
      source: row.source || '',
      subject: row.subject,
      imageUrl: row.image_url,
      metadata: row.metadata || undefined,
      isConfused: row.is_confused,
      gradeTier: row.grade_tier
    }));

    let poolSelected: typeof questions = [];
    const count = sessionType === 'boss' ? 5 : sessionType === 'survival' ? 15 : 10;

    if (sessionType === 'boss') {
      const bossTag = bossId === 'b-2024' ? '2024'
        : bossId === 'b-2025' ? '2025'
        : bossId === 'b-2026' ? '2026'
        : bossId === 'b-hk1' ? 'HK1'
        : bossId === 'b-hk2' ? 'HK2'
        : '2026';
      const examPool = questions.filter(q => q.source.includes(bossTag));
      const fullExamPool = examPool.length > 0 ? examPool : questions;
      const examSample = fullExamPool.length > 20
        ? [...fullExamPool].sort(() => Math.random() - 0.5).slice(0, 20)
        : fullExamPool;
      poolSelected = [...examSample].sort(() => Math.random() - 0.5).slice(0, count);
    } else if (sessionType === 'revenge') {
      poolSelected = questions.filter(q => failedQuestionIds.includes(q.id));
    } else if (sessionType === 'lesson') {
      poolSelected = questions.filter(q => q.metadata?.lessonId === lessonId || q.category === lessonId); // fallback
      poolSelected = poolSelected.slice(0, 3);
      if (poolSelected.length < 3) {
        const extra = questions.filter(q => !poolSelected.some(p => p.id === q.id));
        poolSelected = [...poolSelected, ...extra].slice(0, 3);
      }
    } else {
      // Practice / Normal: randomize and pick count
      poolSelected = [...questions].sort(() => Math.random() - 0.5).slice(0, count);
    }

    const sessionId = crypto.randomUUID();
    const questionsPoolIds = poolSelected.map(q => q.id);

    // Save game session to DB
    await pool.query(
      `INSERT INTO ge10_game_sessions 
       (id, user_id, session_type, subject, grade_tier, difficulty_tier, questions_pool, status)
       VALUES ($1, $2, $3, $4, $5, NULL, $6, 'active')`,
      [sessionId, profileId, sessionType, subject, gradeTier, questionsPoolIds]
    );

    res.json({
      success: true,
      sessionId,
      questions: poolSelected
    });
  } catch (error: any) {
    console.error('Error starting game session:', error);
    res.status(500).json({ error: 'Failed to start game session.', details: error.message });
  }
});

// POST /api/game/session/end
router.post('/game/session/end', async (req: any, res) => {
  const { sessionId, profileId, answers = [], isDefeat = false, bossBonusIndex } = req.body;

  if (!sessionId || !profileId) {
    return res.status(400).json({ error: 'Missing sessionId or profileId.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (profileId !== req.profile.id) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'Profile ID does not match active profile.' });
    }

    // SELECT and LOCK the session row
    const sessionRes = await client.query(
      `SELECT * FROM ge10_game_sessions WHERE id = $1 FOR UPDATE`,
      [sessionId]
    );

    if (sessionRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Game session not found.' });
    }

    const session = sessionRes.rows[0];
    if (session.status !== 'active') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Game session is no longer active.' });
    }

    if (session.user_id !== profileId) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'Profile ID mismatch.' });
    }

    // Get base settings from settings
    const baseSettingsRes = await client.query(`SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'game_settings'`); // placeholder
    const baseXP = 15;
    const baseRuby = 5;

    // Fetch player profile info
    const profileRes = await client.query(
      `SELECT level, xp, ruby, streak, badges FROM ge10_player_profiles WHERE user_id = $1`,
      [profileId]
    );
    if (profileRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Player profile not found.' });
    }
    const player = profileRes.rows[0];

    // Fetch actual questions info in this session pool
    const qRes = await client.query(
      `SELECT id, correct_answer, difficulty, category FROM ge10_custom_questions WHERE id = ANY($1)`,
      [session.questions_pool]
    );
    const questionsMap = new Map<string, any>();
    qRes.rows.forEach(q => questionsMap.set(q.id, q));

    // Calculate score
    let totalXpGained = 0;
    let totalRubyGained = 0;
    let activeCombo = 0;
    let correctCount = 0;

    const computedAnswers = answers.map((ans: any) => {
      const dbQ = questionsMap.get(ans.questionId);
      if (!dbQ) return { ...ans, isCorrect: false, scoreRatio: 0 };

      let isCorrect = false;
      let scoreRatio = 0;

      // Grade answer based on type
      if (dbQ.correct_answer) {
        const correctAnswers = Array.isArray(dbQ.correct_answer) ? dbQ.correct_answer : [dbQ.correct_answer];
        if (ans.selectedAnswer !== undefined && ans.selectedAnswer !== null) {
          // MCQ
          const correctOpt = correctAnswers[0];
          isCorrect = cleanAnswer(ans.selectedAnswer) === cleanAnswer(correctOpt);
          scoreRatio = isCorrect ? 1 : 0;
        } else if (ans.scoreRatio !== undefined && ans.scoreRatio !== null) {
          // Essay / Math grading AI was run on client, we respect their scoreRatio but clamp it
          scoreRatio = Math.max(0, Math.min(1, ans.scoreRatio));
          isCorrect = scoreRatio >= 0.6;
        } else {
          // Normal typed fill
          const normalizedTyped = cleanAnswer(ans.typedAnswer || '');
          isCorrect = correctAnswers.some((ansOpt: any) => normalizedTyped === cleanAnswer(ansOpt));
          scoreRatio = isCorrect ? 1 : 0;
        }
      }

      if (isCorrect) {
        correctCount += 1;
        activeCombo += 1;
      } else {
        activeCombo = 0;
      }

      let expGained = 0;
      let rubyGained = 0;

      if (scoreRatio > 0) {
        let comboMultiplier = 1.0;
        if (activeCombo >= 9) comboMultiplier = 2.0;
        else if (activeCombo >= 6) comboMultiplier = 1.5;
        else if (activeCombo >= 3) comboMultiplier = 1.2;

        const difficulty = dbQ.difficulty || 5;
        const difficultyMultiplier = 1 + (difficulty - 1) * 0.1;
        const streakBonus = 1 + Math.min(1.0, (player.streak || 0) * 0.1);

        expGained = Math.round(baseXP * difficultyMultiplier * comboMultiplier * scoreRatio * streakBonus);
        rubyGained = Math.round(baseRuby * difficultyMultiplier * comboMultiplier * scoreRatio * streakBonus);

        if (session.session_type === 'survival') {
          expGained = Math.round(expGained * 1.5);
          rubyGained = Math.round(rubyGained * 1.5);
        } else if (session.session_type === 'boss') {
          expGained = Math.round(expGained * 2);
          rubyGained = 0; // Boss does not award base ruby
        }
      }

      totalXpGained += expGained;
      totalRubyGained += rubyGained;

      return {
        questionId: ans.questionId,
        isCorrect,
        scoreRatio,
        xpGained: expGained,
        rubyGained: rubyGained,
        coinsGained: rubyGained
      };
    });

    // If victory Boss, award completion bonus
    if (!isDefeat && session.session_type === 'boss') {
      const bonusXP = 150;
      const bossCompletionBonusRuby = [100, 150, 200];
      const rubyBonus = (bossBonusIndex !== undefined && bossCompletionBonusRuby[bossBonusIndex] !== undefined)
        ? bossCompletionBonusRuby[bossBonusIndex]
        : 150;
      totalXpGained += bonusXP;
      totalRubyGained += rubyBonus;
    }

    // Apply defeat penalty if applicable
    if (isDefeat) {
      totalXpGained = Math.floor(totalXpGained / 2);
      totalRubyGained = Math.floor(totalRubyGained / 2);
    }

    // Daily Ruby Cap implementation: limit daily Ruby earned to 300
    // Check daily Ruby earned so far
    const todayStr = new Date().toISOString().split('T')[0];
    const checkCapRes = await client.query(
      `SELECT daily_ruby_earned, last_ruby_earned_date FROM ge10_player_profiles WHERE user_id = $1`,
      [profileId]
    );
    let dailyRubyEarned = 0;
    if (checkCapRes.rows.length > 0) {
      const pData = checkCapRes.rows[0];
      if (pData.last_ruby_earned_date === todayStr) {
        dailyRubyEarned = pData.daily_ruby_earned || 0;
      }
    }

    if (totalRubyGained > 0) {
      const remainingCap = Math.max(0, 300 - dailyRubyEarned);
      if (totalRubyGained > remainingCap) {
        totalRubyGained = remainingCap;
      }
      dailyRubyEarned += totalRubyGained;
    }

    // Process Ledger transaction for Ruby
    const newRubyAmount = Math.max(0, player.ruby + totalRubyGained);
    await client.query(
      `UPDATE ge10_player_profiles 
       SET ruby = $1,
           daily_ruby_earned = $2,
           last_ruby_earned_date = $3,
           server_updated_at = NOW() 
       WHERE user_id = $4`,
      [newRubyAmount, dailyRubyEarned, todayStr, profileId]
    );

    // Process Level Up calculations
    let newLevel = player.level || 1;
    let newXp = (player.xp || 0) + totalXpGained;
    const badges = [...(player.badges || [])];
    let badgesChanged = false;

    while (newXp >= newLevel * 200) {
      newXp -= newLevel * 200;
      newLevel += 1;
    }

    // Check student rank up
    const oldRank = getStudentRankForLevel(player.level || 1);
    const newRank = getStudentRankForLevel(newLevel);
    if (newRank.id !== oldRank.id) {
      const badgeName = `Danh hiệu: ${newRank.name}`;
      if (!badges.includes(badgeName)) {
        badges.push(badgeName);
        badgesChanged = true;
        const rankUpBonusXp = 100;
        newXp += rankUpBonusXp;
        while (newXp >= newLevel * 200) {
          newXp -= newLevel * 200;
          newLevel += 1;
        }
      }
    }

    // Update level, xp, badges
    await client.query(
      `UPDATE ge10_player_profiles 
       SET level = $1, xp = $2, badges = $3, server_updated_at = NOW() 
       WHERE user_id = $4`,
      [newLevel, newXp, badges, profileId]
    );

    // Track question statistics for each question in this session
    for (let i = 0; i < answers.length; i++) {
      const originalAnswer = answers[i];
      const computedAnswer = computedAnswers[i];

      // Track question opened
      await trackQuestionOpened(computedAnswer.questionId);

      // Track if skipped
      if (originalAnswer.isSkipped) {
        await trackQuestionSkipped(computedAnswer.questionId);
      }

      // Track if answer is correct
      if (computedAnswer.isCorrect) {
        await trackQuestionAnsweredCorrectly(computedAnswer.questionId);
      }

      // Track per-student performance
      await trackStudentQuestionPerformance(
        profileId,
        computedAnswer.questionId,
        computedAnswer.isCorrect,
        originalAnswer.isSkipped || false
      );
    }

    // Save session summary
    await client.query(
      `UPDATE ge10_game_sessions
       SET status = $1, end_time = NOW(), xp_gained = $2, ruby_gained = $3, answers_summary = $4
       WHERE id = $5`,
      [isDefeat ? 'defeat' : 'completed', totalXpGained, totalRubyGained, JSON.stringify(computedAnswers), sessionId]
    );

    // Write activity log to history logs
    const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const logTitle = isDefeat ? 'Tẩu Hỏa Nhập Ma!' : (session.session_type === 'boss' ? 'Hạ Gục Boss! 🔥' : 'Hoàn thành Ải Luyện');
    const logDetail = isDefeat 
      ? 'Sai đủ 3 câu giữa trận, chỉ giữ được 50% chiến lợi phẩm thu được.' 
      : `Đã hoàn thành ải [${session.session_type}] môn [${session.subject}]. Đúng ${correctCount}/${answers.length} câu.`;
    
    await client.query(
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed, xp_changed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [logId, profileId, Date.now(), 'exercise', logTitle, logDetail, totalRubyGained, totalXpGained]
    );

    await client.query('COMMIT');
    res.json({
      success: true,
      xpGained: totalXpGained,
      rubyGained: totalRubyGained,
      coinsGained: totalRubyGained,
      newLevel,
      newXp,
      newRuby: newRubyAmount,
      newCoins: newRubyAmount,
      badges,
      badgesChanged
    });
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Error ending game session:', error);
    res.status(500).json({ error: 'Failed to end game session.', details: error.message });
  } finally {
    client.release();
  }
});

// POST /api/exploration/clear
router.post('/exploration/clear', async (req: any, res) => {
  const { profileId, pageId } = req.body;

  if (!profileId || !pageId) {
    return res.status(400).json({ error: 'Missing profileId or pageId.' });
  }

  try {
    if (profileId !== req.profile.id) return res.status(403).json({ error: 'Profile ID does not match active profile.' });

    // Upsert exploration progress
    const upsertRes = await pool.query(
      `INSERT INTO ge10_exploration_progress (user_id, page_id, clear_count, last_cleared_at)
       VALUES ($1, $2, 1, NOW())
       ON CONFLICT (user_id, page_id) DO UPDATE SET
         clear_count = ge10_exploration_progress.clear_count + 1,
         last_cleared_at = NOW()
       RETURNING clear_count, last_cleared_at`,
      [profileId, pageId]
    );

    const row = upsertRes.rows[0];
    res.json({
      progress: {
        clearCount: row.clear_count,
        lastClearedAt: row.last_cleared_at
      }
    });
  } catch (err: any) {
    console.error('[POST /exploration/clear] Error:', err);
    res.status(500).json({ error: 'Failed to clear exploration progress', details: err.message });
  }
});

export default router;
