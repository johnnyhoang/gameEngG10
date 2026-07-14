import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';
import { ensureDefaultRewards } from '../helpers/questions.js';
import {
  loadBossCompletionBonusRuby,
  loadChallengeEnergyCosts,
  loadMaxEnergy,
  loadBaseXP,
  loadBaseRuby
} from '../helpers/gameSettings.js';

const router = express.Router();

// GET /api/profiles: List all active profiles for the Google Account
router.get('/profiles', authMiddleware, async (req: any, res) => {
  try {
    const accountId = req.user?.sub;
    if (!accountId) {
      console.error('No accountId in req.user');
      return res.status(401).json({ error: 'Unauthorized: missing accountId' });
    }
    // Chỉ trả về profile đang hoạt động (is_active = true) — profile bị vô hiệu hóa sẽ không hiển thị ở màn hình chọn
    const profilesRes = await pool.query(
      `SELECT u.*, p.ui_theme 
       FROM ge10_users u
       LEFT JOIN ge10_player_profiles p ON u.id = p.user_id
       WHERE u.account_id = $1 AND u.is_active = TRUE`,
      [accountId]
    );
    const profiles = profilesRes.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      avatar: row.avatar_url,
      avatar_url: row.avatar_url,
      role: row.role,
      uiTheme: row.ui_theme || 'current',
      ui_theme: row.ui_theme || 'current'
    }));
    res.json({ profiles });
  } catch (err: any) {
    console.error('Error fetching profiles:', err?.message || err);
    res.status(500).json({ error: 'Failed to fetch profiles', details: err?.message });
  }
});

// POST /api/profiles/quick-start
router.post('/profiles/quick-start', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const email = req.user?.email;
  const { role } = req.body;

  if (!accountId) return res.status(401).json({ error: 'Unauthorized: missing accountId' });
  if (!role || (role !== 'student' && role !== 'parent')) {
    return res.status(400).json({ error: 'Invalid or missing role' });
  }

  try {
    // Check if profile of this role already exists and is active
    const existCheck = await pool.query(
      'SELECT * FROM ge10_users WHERE account_id = $1 AND role = $2 AND is_active = TRUE',
      [accountId, role]
    );
    if (existCheck.rowCount && existCheck.rowCount > 0) {
      const profile = existCheck.rows[0];
      return res.json({ success: true, profile });
    }

    // Create a new profile automatically
    const profileId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    
    // Fallbacks for name and avatar from user_metadata
    const name = req.user.user_metadata?.full_name || email?.split('@')[0] || 'User';
    const avatarUrl = req.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

    await pool.query(
      `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
      [profileId, accountId, name, email, avatarUrl, role]
    );

    // Initialize stats
    await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1)`, [profileId]);
    await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1)`, [profileId]);
    
    // Ensure default rewards exist for parent
    if (role === 'parent') {
      await ensureDefaultRewards(profileId);
    }

    const newProfile = { id: profileId, account_id: accountId, name, email, avatar_url: avatarUrl, role, is_active: true };
    res.json({ success: true, profile: newProfile });
  } catch (err: any) {
    console.error('Error in quick-start profile:', err);
    res.status(500).json({ error: 'Failed to quick start profile', details: err?.message });
  }
});

// POST /api/profiles: Create a new profile for the Google Account
router.post('/profiles', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const email = req.user.email;
  const { role, name, avatarUrl } = req.body;
  
  if (!role || !name) return res.status(400).json({ error: 'Missing role or name' });
  
  try {
    const profileId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    const finalAvatar = avatarUrl || req.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
    
    await pool.query(
      `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
      [profileId, accountId, name, email, finalAvatar, role]
    );
    
    await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1)`, [profileId]);
    await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1)`, [profileId]);
    
    res.json({ success: true, profile: { id: profileId, account_id: accountId, name, email, avatar_url: finalAvatar, role, is_active: true } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// GET /api/profile/:id: Retrieves the complete profile bundle from Supabase Postgres
router.get('/profile/:id', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const profileId = req.params.id;

  try {
    // 1. Verify ownership AND profile is active
    const userRes = await pool.query(
      'SELECT * FROM ge10_users WHERE id = $1 AND account_id = $2 AND is_active = TRUE',
      [profileId, accountId]
    );
    if (userRes.rowCount === 0) {
      return res.status(403).json({ error: 'Access denied, profile not found, or profile is deactivated.' });
    }
    const userRow = userRes.rows[0];
    const userId = profileId;

    // 2. Fetch player profile stats
    const playerRes = await pool.query('SELECT * FROM ge10_player_profiles WHERE user_id = $1', [userId]);
    // 3. Fetch pet state
    const petRes = await pool.query('SELECT * FROM ge10_pet_states WHERE user_id = $1', [userId]);
    // 4. Fetch category stats
    const statsRes = await pool.query('SELECT * FROM ge10_category_stats WHERE user_id = $1', [userId]);
    // 5. Fetch logs (last 200)
    const logsRes = await pool.query('SELECT * FROM ge10_history_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 200', [userId]);
    // 6. Fetch reward catalog (Danh Mục Quà Khuyến Học — CORE_SPECS §3.2)
    await ensureDefaultRewards(userId);
    const rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    // 6b. Fetch lượt đổi quà (RewardRedemption)
    const redemptionsRes = await pool.query('SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    // 7. Fetch challenges
    const challengesRes = await pool.query('SELECT * FROM ge10_user_challenges WHERE user_id = $1', [userId]);
    // 8. Fetch custom questions (retrieve owned, admin-created, and system-wide questions)
    const questionsRes = await pool.query(
      `SELECT * FROM ge10_custom_questions 
       WHERE user_id = $1 
          OR user_id IS NULL 
          OR user_id IN (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien'))`,
      [userId]
    );
    // 10. Fetch lessons
    const lessonsRes = await pool.query('SELECT * FROM ge10_lessons');
    // 11. Fetch user lessons progress
    const progressRes = await pool.query('SELECT * FROM ge10_user_lessons_progress WHERE user_id = $1', [userId]);
    const lessonsProgress: Record<string, boolean> = {};
    progressRes.rows.forEach((row: any) => {
      lessonsProgress[row.lesson_id] = row.completed;
    });

    // 12. Fetch exploration progress
    const explorationRes = await pool.query('SELECT * FROM ge10_exploration_progress WHERE user_id = $1', [userId]);
    const explorationProgress: Record<string, { clearCount: number, lastClearedAt: string }> = {};
    explorationRes.rows.forEach((row: any) => {
      explorationProgress[row.page_id] = {
        clearCount: row.clear_count,
        lastClearedAt: row.last_cleared_at
      };
    });

    // 13. Fetch Topics (data-driven Phase 2)
    const topicsRes = await pool.query('SELECT * FROM ge10_topics ORDER BY sort_order ASC');

    // 14. Fetch Activities (data-driven Phase 3)
    const activitiesRes = await pool.query('SELECT * FROM ge10_activities ORDER BY sort_order ASC');

    // 15. Fetch Activity Progress (data-driven Phase 3)
    const activityProgressRes = await pool.query('SELECT * FROM ge10_user_activity_progress WHERE user_id = $1', [userId]);
    const activityProgress: Record<string, { status: string, completedAt: string | null }> = {};
    activityProgressRes.rows.forEach((row: any) => {
      activityProgress[row.activity_id] = {
        status: row.status,
        completedAt: row.completed_at ? new Date(row.completed_at).toISOString() : null
      };
    });

    const bossCompletionBonusRuby = await loadBossCompletionBonusRuby();
    const challengeEnergyCosts = await loadChallengeEnergyCosts();
    const maxEnergy = await loadMaxEnergy();
    const baseXP = await loadBaseXP();
    const baseRuby = await loadBaseRuby();

    // Format category stats array into record mapping
    const categoryStats: any = {};
    statsRes.rows.forEach((row: any) => {
      categoryStats[row.category] = {
        category: row.category,
        totalAnswered: row.total_answered,
        totalCorrect: row.total_correct,
        rollingAccuracy: row.rolling_accuracy
      };
    });

    // Format logs list
    const logs = logsRes.rows.map((row: any) => ({
      id: row.id,
      timestamp: Number(row.timestamp),
      activityType: row.activity_type,
      title: row.title,
      detail: row.detail,
      rubyChanged: row.ruby_changed,
      coinsChanged: row.ruby_changed, // legacy API alias
      xpChanged: row.xp_changed,
      walletChanged: row.wallet_changed
    }));

    // Format reward catalog list
    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costRuby: row.cost_ruby,
      costCoins: row.cost_ruby, // legacy API alias
      quantity: row.quantity,
      remainingQuantity: row.remaining_quantity,
      timestamp: Number(row.timestamp)
    }));

    // Format reward redemptions list
    const rewardRedemptions = redemptionsRes.rows.map((row: any) => ({
      id: row.id,
      rewardId: row.reward_id,
      rewardTitle: row.reward_title,
      costRuby: row.cost_ruby,
      costCoins: row.cost_ruby, // legacy API alias
      status: row.status,
      timestamp: Number(row.timestamp),
      deliveredAt: row.delivered_at ? Number(row.delivered_at) : undefined
    }));

    // Map challenges JSONB
    const challenges = challengesRes.rows[0]?.challenges_json || null;

    // Map custom questions
    const customQuestions = questionsRes.rows.map((row: any) => ({
      id: row.id,
      type: row.type,
      category: row.category,
      topicId: row.topic_id,
      prompt: row.prompt,
      options: row.options,
      correctAnswer: row.correct_answer,
      explanation: row.explanation,
      difficulty: row.difficulty,
      source: row.source,
      subject: row.subject,
      gradeTier: row.grade_tier,
      imageUrl: row.image_url,
      lessonId: row.lesson_id,
      isConfused: row.is_confused,
      metadata: row.metadata || undefined,
      timesOpened: row.times_opened || 0,
      timesAnsweredCorrectly: row.times_answered_correctly || 0,
      timesSkipped: row.times_skipped || 0,
      lastOpenedAt: row.last_opened_at
    }));

    res.json({
      currentUser: {
        id: userRow.id,
        name: userRow.name,
        email: userRow.email,
        avatar: userRow.avatar_url,
        role: userRow.role || 'student'
      },
      player: playerRes.rows[0] ? {
        id: playerRes.rows[0].user_id,
        name: userRow.name,
        role: userRow.role || 'student',
        level: playerRes.rows[0].level,
        xp: playerRes.rows[0].xp,
        ruby: playerRes.rows[0].ruby,
        coins: playerRes.rows[0].ruby, // legacy API alias
        streak: playerRes.rows[0].streak,
        energy: playerRes.rows[0].energy,
        hearts: playerRes.rows[0].hearts,
        lastActive: playerRes.rows[0].last_active,
        badges: playerRes.rows[0].badges || [],
        uiTheme: playerRes.rows[0].ui_theme || 'current',
        activeSubject: playerRes.rows[0].active_subject || 'english',
        activeGradeTier: playerRes.rows[0].active_grade_tier || 9
      } : null,
      pet: petRes.rows[0] ? {
        name: petRes.rows[0].name,
        stage: petRes.rows[0].stage,
        level: petRes.rows[0].level,
        exp: petRes.rows[0].exp,
        energy: petRes.rows[0].energy,
        mood: petRes.rows[0].mood,
        lastFed: petRes.rows[0].last_fed
      } : null,
      categoryStats,
      logs,
      rewards,
      rewardRedemptions,
      challenges,
      gameSettings: {
        bossCompletionBonusRuby,
        bossCompletionBonusNP: bossCompletionBonusRuby,
        challengeEnergyCosts,
        maxEnergy,
        baseXP,
        baseRuby,
        baseCoins: baseRuby
      },
      customQuestions,
      lessons: lessonsRes.rows.map((row: any) => ({
        id: row.id,
        subject: row.subject,
        gradeTier: row.grade_tier,
        topic: row.topic,
        title: row.title,
        theory: row.theory,
        category: row.category,
        examples: row.examples || [],
        practicePoints: row.practice_points || [],
        difficulty: row.difficulty
      })),
      lessonsProgress,
      explorationProgress,
      topics: topicsRes.rows.map((row: any) => ({
        id: row.id,
        subject: row.subject,
        gradeTier: row.grade_tier,
        name: row.name,
        description: row.description,
        sortOrder: row.sort_order,
        unlockRule: row.unlock_rule,
        completionRule: row.completion_rule,
        rewardNP: row.reward_np
      })),
      activities: activitiesRes.rows.map((row: any) => ({
        id: row.id,
        topicId: row.topic_id,
        subject: row.subject,
        gradeTier: row.grade_tier,
        activityType: row.activity_type,
        title: row.title,
        config: row.config,
        sortOrder: row.sort_order,
        unlockRule: row.unlock_rule,
        rewardNP: row.reward_np,
        rewardXP: row.reward_xp
      })),
      activityProgress
    });
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    res.status(500).json({ error: 'Failed to retrieve profile data.' });
  }
});

// POST /api/profile/:id/sync: Receives Zustand state and synchronizes it to Supabase PostgreSQL
router.post('/profile/:id/sync', authMiddleware, activeProfileMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const userId = req.params.id;

  if (userId !== req.profile.id) return res.status(403).json({ error: 'Profile ID does not match active profile.' });
  
  // Verify ownership
  const check = await pool.query('SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2', [userId, accountId]);
  if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
  const {
    player: rawPlayer,
    pet,
    categoryStats,
    logs: rawLogs,
    rewards: rawRewards,
    rewardRedemptions: rawRewardRedemptions,
    challenges: rawChallenges,
    lessonsProgress
  } = req.body;
  const player = rawPlayer ? { ...rawPlayer, ruby: rawPlayer.ruby ?? rawPlayer.coins ?? 0 } : null;
  const logs = Array.isArray(rawLogs)
    ? rawLogs.map((log: any) => ({ ...log, rubyChanged: log.rubyChanged ?? log.coinsChanged ?? 0 }))
    : rawLogs;
  const rewards = Array.isArray(rawRewards)
    ? rawRewards.map((reward: any) => ({ ...reward, costRuby: reward.costRuby ?? reward.costCoins }))
    : rawRewards;
  const rewardRedemptions = Array.isArray(rawRewardRedemptions)
    ? rawRewardRedemptions.map((redemption: any) => ({
        ...redemption,
        costRuby: redemption.costRuby ?? redemption.costCoins
      }))
    : rawRewardRedemptions;
  const challenges = Array.isArray(rawChallenges)
    ? rawChallenges.map((challenge: any) => ({
        ...challenge,
        rewardRuby: challenge.rewardRuby ?? challenge.rewardCoins ?? 0
      }))
    : rawChallenges;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let mergedEnergy = player ? player.energy : 100;
    let mergedEnergyDepletedAt = player ? (player.energyDepletedAt ?? null) : null;
    let mergedMasteryRankForResponse: Record<string, number> = player?.maxAchievedMasteryRank || {};

    // 1. Sync player profile
    if (player) {
      const currentProfileRes = await client.query(
        'SELECT * FROM ge10_player_profiles WHERE user_id = $1',
        [userId]
      );
      // Luật Bất Thoái (CORE_SPECS §7.4.4): gộp theo giá trị CAO HƠN từng môn giữa client/DB, không
      // bao giờ ghi đè xuống thấp — tránh 2 thiết bị đồng bộ lệch làm mất mốc đẳng cấp đã đạt.
      const dbMasteryRank = currentProfileRes.rows[0]?.max_achieved_mastery_rank || {};
      const clientMasteryRank = player.maxAchievedMasteryRank || {};
      const mergedMasteryRank: Record<string, number> = { ...dbMasteryRank };
      for (const subjectId of Object.keys(clientMasteryRank)) {
        mergedMasteryRank[subjectId] = Math.max(mergedMasteryRank[subjectId] || 0, clientMasteryRank[subjectId] || 0);
      }
      mergedMasteryRankForResponse = mergedMasteryRank;

      if (currentProfileRes.rows.length > 0) {
        const dbProfile = currentProfileRes.rows[0];
        const dbServerUpdatedAt = new Date(dbProfile.server_updated_at).getTime();
        const clientLastSyncTime = req.body.lastSyncTime ? new Date(req.body.lastSyncTime).getTime() : 0;

        if (dbServerUpdatedAt > clientLastSyncTime + 1000) {
          // Load all latest server state to send back to client
          const petRes = await client.query('SELECT * FROM ge10_pet_states WHERE user_id = $1', [userId]);
          const statsRes = await client.query('SELECT * FROM ge10_category_stats WHERE user_id = $1', [userId]);
          const logsRes = await client.query('SELECT * FROM ge10_history_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 200', [userId]);
          const rewardsRes = await client.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
          const redemptionsRes = await client.query('SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
          const challengesRes = await client.query('SELECT * FROM ge10_user_challenges WHERE user_id = $1', [userId]);
          const progressRes = await client.query('SELECT * FROM ge10_user_lessons_progress WHERE user_id = $1', [userId]);
          const explorationRes = await client.query('SELECT * FROM ge10_exploration_progress WHERE user_id = $1', [userId]);
          const activityProgressRes = await client.query('SELECT * FROM ge10_user_activity_progress WHERE user_id = $1', [userId]);

          const lessonsProgress: Record<string, boolean> = {};
          const activityProgress: Record<string, any> = {};
          activityProgressRes.rows.forEach((row: any) => {
            activityProgress[row.activity_id] = {
              status: row.status,
              completedAt: row.completed_at ? new Date(row.completed_at).toISOString() : null
            };
          });
          progressRes.rows.forEach((row: any) => {
            lessonsProgress[row.lesson_id] = row.completed;
          });

          const explorationProgress: Record<string, any> = {};
          explorationRes.rows.forEach((row: any) => {
            explorationProgress[row.area_id] = {
              clearCount: row.clear_count
            };
          });

          const categoryStats: any = {};
          statsRes.rows.forEach((row: any) => {
            categoryStats[row.category] = {
              category: row.category,
              totalAnswered: row.total_answered,
              totalCorrect: row.total_correct,
              rollingAccuracy: row.rolling_accuracy
            };
          });

          await client.query('ROLLBACK');
          return res.status(409).json({
            error: 'OUTDATED_CLIENT',
            message: 'Client state is outdated. Please pull the latest data first.',
            serverData: {
              player: {
                id: dbProfile.user_id,
                level: dbProfile.level,
                xp: dbProfile.xp,
                ruby: dbProfile.ruby,
                coins: dbProfile.ruby, // legacy API alias
                streak: dbProfile.streak,
                energy: dbProfile.energy,
                maxEnergy: dbProfile.max_energy,
                resetHours: dbProfile.reset_hours,
                energyDepletedAt: dbProfile.energy_depleted_at ? Number(dbProfile.energy_depleted_at) : null,
                hearts: dbProfile.hearts,
                lastActive: dbProfile.last_active,
                badges: dbProfile.badges,
                maxAchievedMasteryRank: dbProfile.max_achieved_mastery_rank,
                uiTheme: dbProfile.ui_theme || 'current',
                activeSubject: dbProfile.active_subject || 'english',
                activeGradeTier: dbProfile.active_grade_tier || 9
              },
              pet: petRes.rows[0] ? {
                name: petRes.rows[0].name,
                stage: petRes.rows[0].stage,
                level: petRes.rows[0].level,
                exp: petRes.rows[0].exp,
                energy: petRes.rows[0].energy,
                mood: petRes.rows[0].mood,
                lastFed: petRes.rows[0].last_fed
              } : null,
              categoryStats,
              logs: logsRes.rows.map((row: any) => ({
                id: row.id,
                timestamp: Number(row.timestamp),
                activityType: row.activity_type,
                title: row.title,
                detail: row.detail,
                rubyChanged: row.ruby_changed,
                coinsChanged: row.ruby_changed,
                xpChanged: row.xp_changed,
                walletChanged: row.wallet_changed
              })),
              rewards: rewardsRes.rows.map((row: any) => ({
                id: row.id,
                title: row.title,
                costRuby: row.cost_ruby,
                costCoins: row.cost_ruby,
                quantity: row.quantity,
                remainingQuantity: row.remaining_quantity,
                timestamp: Number(row.timestamp)
              })),
              rewardRedemptions: redemptionsRes.rows.map((row: any) => ({
                id: row.id,
                rewardId: row.reward_id,
                rewardTitle: row.reward_title,
                costRuby: row.cost_ruby,
                costCoins: row.cost_ruby,
                status: row.status,
                timestamp: Number(row.timestamp),
                deliveredAt: row.delivered_at ? Number(row.delivered_at) : null
              })),
              challenges: challengesRes.rows[0]?.challenges_json || null,
              lessonsProgress,
              explorationProgress,
              activityProgress
            }
          });
        }
      }

      // maxEnergy/resetHours KHÔNG nằm trong sync này — đó là cấu hình do chủ nhiệm chỉnh riêng
      // qua /api/admin/set-energy-config, con tự sync không được phép ghi đè (SUB_SPEC_ENERGY §2).
      await client.query(
        `INSERT INTO ge10_player_profiles (user_id, level, xp, ruby, streak, energy, energy_depleted_at, hearts, last_active, badges, max_achieved_mastery_rank, ui_theme, active_subject, active_grade_tier, server_updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           level = EXCLUDED.level,
           xp = EXCLUDED.xp,
           ruby = EXCLUDED.ruby,
           streak = EXCLUDED.streak,
           energy = EXCLUDED.energy,
           energy_depleted_at = EXCLUDED.energy_depleted_at,
           hearts = EXCLUDED.hearts,
           last_active = EXCLUDED.last_active,
           badges = EXCLUDED.badges,
           max_achieved_mastery_rank = EXCLUDED.max_achieved_mastery_rank,
           ui_theme = EXCLUDED.ui_theme,
           active_subject = EXCLUDED.active_subject,
           active_grade_tier = EXCLUDED.active_grade_tier,
           server_updated_at = NOW()`,
        [
          userId,
          player.level,
          player.xp,
          player.ruby,
          player.streak,
          mergedEnergy,
          mergedEnergyDepletedAt,
          player.hearts,
          player.lastActive,
          player.badges,
          JSON.stringify(mergedMasteryRank),
          player.uiTheme || 'current',
          player.activeSubject || 'english',
          player.activeGradeTier || 9
        ]
      );
    }

    // 2. Sync pet state
    if (pet) {
      await client.query(
        `INSERT INTO ge10_pet_states (user_id, name, stage, level, exp, energy, mood, last_fed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (user_id) DO UPDATE SET
           name = EXCLUDED.name,
           stage = EXCLUDED.stage,
           level = EXCLUDED.level,
           exp = EXCLUDED.exp,
           energy = EXCLUDED.energy,
           mood = EXCLUDED.mood,
           last_fed = EXCLUDED.last_fed`,
        [
          userId,
          pet.name,
          pet.stage,
          pet.level,
          pet.exp,
          pet.energy,
          pet.mood,
          pet.lastFed
        ]
      );
    }

    // 3. Sync category stats (Batch INSERT)
    if (categoryStats && Object.keys(categoryStats).length > 0) {
      const cats = Object.keys(categoryStats);
      const values: any[] = [];
      const placeholders: string[] = [];
      cats.forEach((cat, index) => {
        const item = categoryStats[cat];
        const offset = index * 5;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`);
        values.push(userId, item.category, item.totalAnswered, item.totalCorrect, item.rollingAccuracy);
      });
      await client.query(
        `INSERT INTO ge10_category_stats (user_id, category, total_answered, total_correct, rolling_accuracy)
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (user_id, category) DO UPDATE SET
           total_answered = EXCLUDED.total_answered,
           total_correct = EXCLUDED.total_correct,
           rolling_accuracy = EXCLUDED.rolling_accuracy`,
        values
      );
    }

    // 4. Sync history logs (Batch INSERT)
    if (logs && Array.isArray(logs) && logs.length > 0) {
      const values: any[] = [];
      const placeholders: string[] = [];
      logs.forEach((log, index) => {
        const offset = index * 9;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9})`);
        values.push(log.id, userId, log.timestamp, log.activityType, log.title, log.detail, log.rubyChanged, log.xpChanged, log.walletChanged);
      });
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed, xp_changed, wallet_changed)
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (id) DO NOTHING`,
        values
      );
    }

    // 5. Sync reward catalog (Batch INSERT)
    if (rewards && Array.isArray(rewards) && rewards.length > 0) {
      const values: any[] = [];
      const placeholders: string[] = [];
      rewards.forEach((r, index) => {
        const offset = index * 7;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`);
        values.push(r.id, userId, r.title, r.costRuby, r.quantity, r.remainingQuantity, r.timestamp);
      });
      await client.query(
        `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_ruby, quantity, remaining_quantity, timestamp)
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           cost_ruby = EXCLUDED.cost_ruby,
           quantity = EXCLUDED.quantity,
           remaining_quantity = EXCLUDED.remaining_quantity`,
        values
      );
    }

    // 5b. Sync reward redemptions (Batch INSERT)
    if (rewardRedemptions && Array.isArray(rewardRedemptions) && rewardRedemptions.length > 0) {
      const values: any[] = [];
      const placeholders: string[] = [];
      rewardRedemptions.forEach((rr, index) => {
        const offset = index * 8;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8})`);
        values.push(rr.id, userId, rr.rewardId, rr.rewardTitle, rr.costRuby, rr.status, rr.timestamp, rr.deliveredAt || null);
      });
      await client.query(
        `INSERT INTO ge10_reward_redemptions (id, user_id, reward_id, reward_title, cost_ruby, status, timestamp, delivered_at)
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (id) DO UPDATE SET
           status = EXCLUDED.status,
           delivered_at = EXCLUDED.delivered_at`,
        values
      );
    }

    // 6. Sync challenges list JSON
    if (challenges) {
      await client.query(
        `INSERT INTO ge10_user_challenges (user_id, challenges_json)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET
           challenges_json = EXCLUDED.challenges_json`,
        [userId, JSON.stringify(challenges)]
      );
    }

    // 7. Sync lessons progress (Batch INSERT)
    if (lessonsProgress && Object.keys(lessonsProgress).length > 0) {
      const progressEntries = Object.entries(lessonsProgress).filter(([_, completed]) => completed);
      if (progressEntries.length > 0) {
        const values: any[] = [];
        const placeholders: string[] = [];
        progressEntries.forEach(([lessonId, completed], index) => {
          const offset = index * 3;
          placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, NOW())`);
          values.push(userId, lessonId, completed);
        });
        await client.query(
          `INSERT INTO ge10_user_lessons_progress (user_id, lesson_id, completed, completed_at)
           VALUES ${placeholders.join(', ')}
           ON CONFLICT (user_id, lesson_id) DO UPDATE SET
             completed = EXCLUDED.completed,
             completed_at = NOW()`,
          values
        );
      }
    }

    // 9. Sync activity progress (Batch INSERT)
    if (req.body.activityProgress && Object.keys(req.body.activityProgress).length > 0) {
      const activityEntries = Object.entries(req.body.activityProgress);
      if (activityEntries.length > 0) {
        const values: any[] = [];
        const placeholders: string[] = [];
        activityEntries.forEach(([actId, data], index) => {
          const offset = index * 4;
          placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}::timestamptz)`);
          values.push(userId, actId, (data as any).status || 'available', (data as any).completedAt || null);
        });
        await client.query(
          `INSERT INTO ge10_user_activity_progress (user_id, activity_id, status, completed_at)
           VALUES ${placeholders.join(', ')}
           ON CONFLICT (user_id, activity_id) DO UPDATE SET
             status = EXCLUDED.status,
             completed_at = EXCLUDED.completed_at`,
          values
        );
      }
    }

    await client.query('COMMIT');
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      player: player ? {
        energy: mergedEnergy,
        energyDepletedAt: mergedEnergyDepletedAt,
        maxAchievedMasteryRank: mergedMasteryRankForResponse
      } : null
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error synchronizing profile data:', error);
    res.status(500).json({ error: 'Failed to sync game profile data.' });
  } finally {
    client.release();
  }
});

// PATCH /api/profiles/rename
router.patch('/profiles/rename', authMiddleware, activeProfileMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const { profileId, newName } = req.body;

  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });
  if (!profileId || !newName?.trim()) {
    return res.status(400).json({ error: 'Missing profileId or newName' });
  }
  if (profileId !== req.profile.id) return res.status(403).json({ error: 'Profile ID does not match active profile.' });

  try {
    const check = await pool.query(
      'SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2 AND is_active = TRUE',
      [profileId, accountId]
    );
    if (check.rowCount === 0) {
      return res.status(404).json({ error: 'Profile not found or access denied.' });
    }

    await pool.query(
      'UPDATE ge10_users SET name = $1 WHERE id = $2',
      [newName.trim(), profileId]
    );

    return res.json({ success: true, newName: newName.trim() });
  } catch (err: any) {
    console.error('[PATCH /profiles/rename]', err);
    return res.status(500).json({ error: 'Failed to update profile name.' });
  }
});

export default router;
