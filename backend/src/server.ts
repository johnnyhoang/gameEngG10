import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import { SEED_LESSONS } from './lessonsData.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const PLAYER_ENERGY_MAX = 1000;
// Bonus Điểm (NP) khi hạ Boss — thay hoàn toàn thưởng VND cũ (CORE_SPECS §2.1). Boss không thưởng tiền.
const DEFAULT_BOSS_COMPLETION_BONUS_NP: [number, number, number] = [100, 150, 200];
const DEFAULT_CHALLENGE_ENERGY_COSTS: [number, number, number, number] = [10, 10, 15, 10];

app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize Database Tables from schema.sql
const initDB = async () => {
  try {
    let schemaPath = path.join(__dirname, 'schema.sql');
    if (!fs.existsSync(schemaPath)) {
      schemaPath = path.join(__dirname, '..', 'src', 'schema.sql');
    }
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(sql);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS subject VARCHAR(50) DEFAULT 'english';`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS image_url TEXT;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS is_confused BOOLEAN DEFAULT FALSE;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);`);
    await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMP DEFAULT NOW();`);

    // Seed lessons
    for (const lesson of SEED_LESSONS) {
      await pool.query(
        `INSERT INTO ge10_lessons (id, subject, topic, title, theory, category)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
           topic = EXCLUDED.topic,
           title = EXCLUDED.title,
           theory = EXCLUDED.theory,
           category = EXCLUDED.category`,
        [lesson.id, lesson.subject, lesson.topic, lesson.title, lesson.theory, lesson.category]
      );
    }

    // Auto-link existing questions to their lessons by category
    await pool.query(
      `UPDATE ge10_custom_questions 
       SET lesson_id = (SELECT id FROM ge10_lessons WHERE ge10_lessons.category = ge10_custom_questions.category)
       WHERE lesson_id IS NULL`
    );

    console.log('Database initialized and lessons seeded successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDB();

// JWKS client for verifying asymmetric ES256 Supabase JWTs
const supabaseUrl = process.env.SUPABASE_URL || 'https://czngbleeeiljsrpbaksg.supabase.co';
const JWKS = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`));

// JWT Auth Middleware (Decodes Supabase signed tokens)
const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const supabaseUrl = process.env.SUPABASE_URL || 'https://czngbleeeiljsrpbaksg.supabase.co';

    // Debug token payload and header structure
    try {
      const parsed = jwt.decode(token, { complete: true });
      console.log('DEBUG: Parsed Token Header/Payload:', JSON.stringify(parsed));
    } catch (parseErr: any) {
      console.error('DEBUG: Failed to decode raw token string:', parseErr.message);
    }

    // Verify asymmetric ES256 signature using JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${supabaseUrl}/auth/v1`,
      algorithms: ['ES256']
    });

    req.user = payload; // payload contains user details like sub, email, user_metadata
    next();
  } catch (error: any) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

// Friendly Vietnamese message shown to users once GEMINI_API_KEY, GEMINI_API_KEY2 and GEMINI_API_KEY3 have all failed
const AI_EXHAUSTED_MESSAGE = 'Các sư phụ đã hết công lực AI rồi, phải nhờ đại sư phụ nạp thêm tiền để hồi phục công lực thì mới chấm bài bằng AI được!';

class GeminiExhaustedError extends Error {
  constructor() {
    super(AI_EXHAUSTED_MESSAGE);
    this.name = 'GeminiExhaustedError';
  }
}

const getGeminiApiKeys = (): string[] => {
  return [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY2, process.env.GEMINI_API_KEY3]
    .filter((key): key is string => !!key && key.trim() !== '' && !key.toLowerCase().includes('your_gemini_api_key'));
};

// Calls the Gemini API, trying GEMINI_API_KEY -> GEMINI_API_KEY2 -> GEMINI_API_KEY3 in order.
// Only moves on to the next key when a key fails (quota/error); throws GeminiExhaustedError once all keys are exhausted.
const callGeminiAPI = async (prompt: string, generationConfig: Record<string, any> = { responseMimeType: 'application/json' }): Promise<string> => {
  const keys = getGeminiApiKeys();
  if (keys.length === 0) {
    throw new GeminiExhaustedError();
  }

  let lastError: Error | null = null;
  for (let i = 0; i < keys.length; i++) {
    try {
      const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keys[i]}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig
        })
      });

      if (!apiRes.ok) {
        const errText = await apiRes.text();
        lastError = new Error(`Gemini key #${i + 1} thất bại: ${errText}`);
        console.error(lastError.message);
        continue;
      }

      const apiData = await apiRes.json() as any;
      const responseText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        lastError = new Error(`Gemini key #${i + 1} trả về response rỗng.`);
        console.error(lastError.message);
        continue;
      }

      return responseText;
    } catch (err: any) {
      lastError = err;
      console.error(`Gemini key #${i + 1} lỗi:`, err.message);
    }
  }

  console.error('Tất cả Gemini API keys đều thất bại:', lastError?.message);
  throw new GeminiExhaustedError();
};

const loadBossCompletionBonusNP = async (): Promise<[number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'boss_completion_bonus_np'"
  );
  const raw = res.rows[0]?.setting_json;
  const values = [
    Number(raw?.['easy']),
    Number(raw?.['medium']),
    Number(raw?.['hard'])
  ];

  if (values.every(v => Number.isFinite(v) && v >= 0)) {
    return [values[0], values[1], values[2]];
  }

  return DEFAULT_BOSS_COMPLETION_BONUS_NP;
};

const loadChallengeEnergyCosts = async (): Promise<[number, number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'challenge_energy_costs'"
  );
  const raw = res.rows[0]?.setting_json;
  const values = [
    Number(raw?.['1']),
    Number(raw?.['2']),
    Number(raw?.['3']),
    Number(raw?.['4'])
  ];

  if (values.every(v => Number.isFinite(v) && v >= 0)) {
    return [values[0], values[1], values[2], values[3]];
  }

  return DEFAULT_CHALLENGE_ENERGY_COSTS;
};

const loadMaxEnergy = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'max_energy'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 1000;
};

const loadBaseXP = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_xp'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 15;
};

const loadBaseCoins = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_coins'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 5;
};

const saveMaxEnergy = async (maxEnergy: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('max_energy', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: maxEnergy })]
  );
};

const saveBaseXP = async (baseXP: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_xp', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseXP })]
  );
};

const saveBaseCoins = async (baseCoins: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_coins', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseCoins })]
  );
};

const saveBossCompletionBonusNP = async (bossCompletionBonusNP: [number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('boss_completion_bonus_np', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ easy: bossCompletionBonusNP[0], medium: bossCompletionBonusNP[1], hard: bossCompletionBonusNP[2] })]
  );
};

const saveChallengeEnergyCosts = async (challengeEnergyCosts: [number, number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('challenge_energy_costs', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ 1: challengeEnergyCosts[0], 2: challengeEnergyCosts[1], 3: challengeEnergyCosts[2], 4: challengeEnergyCosts[3] })]
  );
};

const persistCustomQuestion = async (userId: string, question: any) => {
  let lessonId = null;
  try {
    const lessonRes = await pool.query('SELECT id FROM ge10_lessons WHERE category = $1', [question.category]);
    if (lessonRes.rows.length > 0) {
      lessonId = lessonRes.rows[0].id;
    }
  } catch (e: any) {
    console.error('Lỗi khi truy vấn lesson_id cho câu hỏi:', e.message);
  }

  await pool.query(
    `INSERT INTO ge10_custom_questions (id, user_id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, image_url, metadata, lesson_id, is_confused)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
     ON CONFLICT (id) DO UPDATE SET
       type = EXCLUDED.type,
       category = EXCLUDED.category,
       topic_id = EXCLUDED.topic_id,
       prompt = EXCLUDED.prompt,
       options = EXCLUDED.options,
       correct_answer = EXCLUDED.correct_answer,
       explanation = EXCLUDED.explanation,
       difficulty = EXCLUDED.difficulty,
       source = EXCLUDED.source,
       subject = EXCLUDED.subject,
       image_url = EXCLUDED.image_url,
       metadata = EXCLUDED.metadata,
       lesson_id = EXCLUDED.lesson_id,
       is_confused = EXCLUDED.is_confused`,
    [
      question.id,
      userId,
      question.type || 'mcq',
      question.category,
      question.topicId || null,
      question.prompt,
      question.options || null,
      Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer],
      question.explanation || '',
      question.difficulty || 5,
      question.source || 'AI Ingested English',
      question.subject || 'english',
      question.imageUrl || question.image_url || null,
      question.metadata ? JSON.stringify(question.metadata) : null,
      lessonId,
      question.isConfused || false
    ]
  );
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// GET /api/profiles: List all profiles for the Google Account
app.get('/api/profiles', authMiddleware, async (req: any, res) => {
  try {
    const accountId = req.user?.sub;
    if (!accountId) {
      console.error('No accountId in req.user');
      return res.status(401).json({ error: 'Unauthorized: missing accountId' });
    }
    const profilesRes = await pool.query('SELECT * FROM ge10_users WHERE account_id = $1', [accountId]);
    res.json({ profiles: profilesRes.rows });
  } catch (err: any) {
    console.error('Error fetching profiles:', err?.message || err);
    res.status(500).json({ error: 'Failed to fetch profiles', details: err?.message });
  }
});

// POST /api/profiles: Create a new profile for the Google Account
app.post('/api/profiles', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const email = req.user.email;
  const { role, name, avatarUrl } = req.body;
  
  if (!role || !name) return res.status(400).json({ error: 'Missing role or name' });
  
  try {
    const profileId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    const finalAvatar = avatarUrl || req.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
    
    await pool.query(
      `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [profileId, accountId, name, email, finalAvatar, role]
    );
    
    await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1)`, [profileId]);
    await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1)`, [profileId]);
    
    res.json({ success: true, profile: { id: profileId, account_id: accountId, name, email, avatar_url: finalAvatar, role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// GET /api/profile/:id: Retrieves the complete profile bundle from Supabase Postgres
app.get('/api/profile/:id', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const profileId = req.params.id;

  try {
    // 1. Verify ownership
    const userRes = await pool.query('SELECT * FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (userRes.rowCount === 0) {
      return res.status(403).json({ error: 'Access denied or profile not found.' });
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
    // 6. Fetch reward catalog (Phần Thưởng Thực Tế — CORE_SPECS §3.2)
    let rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    if (rewardsRes.rowCount === 0) {
      const defaultRewards = [
        { id: `default-rew-1-${userId}`, title: '15 phút chơi game', cost_coins: 150, quantity: 10 },
        { id: `default-rew-2-${userId}`, title: 'Ly trà sữa đặc biệt', cost_coins: 400, quantity: 4 },
        { id: `default-rew-3-${userId}`, title: 'Bao lì xì 20.000đ', cost_coins: 500, quantity: 5 },
        { id: `default-rew-4-${userId}`, title: 'Bao lì xì 50.000đ', cost_coins: 1000, quantity: 3 },
        { id: `default-rew-5-${userId}`, title: 'Bao lì xì 100.000đ', cost_coins: 1800, quantity: 1 }
      ];

      for (const dr of defaultRewards) {
        await pool.query(
          `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, quantity, remaining_quantity, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [dr.id, userId, dr.title, dr.cost_coins, dr.quantity, dr.quantity, Date.now()]
        );
      }
      rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    }
    // 6b. Fetch lượt đổi quà (RewardRedemption)
    const redemptionsRes = await pool.query('SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    // 7. Fetch challenges
    const challengesRes = await pool.query('SELECT * FROM ge10_user_challenges WHERE user_id = $1', [userId]);
    // 8. Fetch daily mission
    const missionRes = await pool.query('SELECT * FROM ge10_daily_missions WHERE user_id = $1', [userId]);
    // 9. Fetch custom questions (retrieve owned, admin-created, and system-wide questions)
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

    const bossCompletionBonusNP = await loadBossCompletionBonusNP();
    const challengeEnergyCosts = await loadChallengeEnergyCosts();
    const maxEnergy = await loadMaxEnergy();
    const baseXP = await loadBaseXP();
    const baseCoins = await loadBaseCoins();

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
      coinsChanged: row.coins_changed,
      xpChanged: row.xp_changed,
      walletChanged: row.wallet_changed
    }));

    // Format reward catalog list
    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costCoins: row.cost_coins,
      quantity: row.quantity,
      remainingQuantity: row.remaining_quantity,
      timestamp: Number(row.timestamp)
    }));

    // Format reward redemptions list
    const rewardRedemptions = redemptionsRes.rows.map((row: any) => ({
      id: row.id,
      rewardId: row.reward_id,
      rewardTitle: row.reward_title,
      costCoins: row.cost_coins,
      status: row.status,
      timestamp: Number(row.timestamp),
      deliveredAt: row.delivered_at ? Number(row.delivered_at) : undefined
    }));

    // Map challenges JSONB
    const challenges = challengesRes.rows[0]?.challenges_json || null;

    // Map daily mission JSONB
    const dailyMission = missionRes.rows[0]?.mission_json || null;

    // Map custom questions
    const customQuestions = questionsRes.rows.map((row: any) => ({
      id: row.id,
      type: row.type,
      category: row.category,
      prompt: row.prompt,
      options: row.options,
      correctAnswer: row.correct_answer,
      explanation: row.explanation,
      difficulty: row.difficulty,
      source: row.source,
      subject: row.subject,
      imageUrl: row.image_url,
      lessonId: row.lesson_id,
      isConfused: row.is_confused
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
        coins: playerRes.rows[0].coins,
        streak: playerRes.rows[0].streak,
        energy: playerRes.rows[0].energy,
        hearts: playerRes.rows[0].hearts,
        lastActive: playerRes.rows[0].last_active,
        badges: playerRes.rows[0].badges || []
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
      dailyMission,
      gameSettings: {
        bossCompletionBonusNP,
        challengeEnergyCosts,
        maxEnergy,
        baseXP,
        baseCoins
      },
      customQuestions,
      lessons: lessonsRes.rows.map((row: any) => ({
        id: row.id,
        subject: row.subject,
        topic: row.topic,
        title: row.title,
        theory: row.theory,
        category: row.category
      })),
      lessonsProgress,
      explorationProgress
    });
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    res.status(500).json({ error: 'Failed to retrieve profile data.' });
  }
});

// POST /api/profile/sync: Receives Zustand state and synchronizes it to Supabase PostgreSQL
app.post('/api/profile/:id/sync', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const userId = req.params.id;
  
  // Verify ownership
  const check = await pool.query('SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2', [userId, accountId]);
  if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
  const { player, pet, categoryStats, logs, rewards, rewardRedemptions, challenges, dailyMission, lessonsProgress } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    let mergedEnergy = player ? player.energy : 1000;

    // 1. Sync player profile
    if (player) {
      const currentProfileRes = await client.query(
        'SELECT energy, server_updated_at FROM ge10_player_profiles WHERE user_id = $1',
        [userId]
      );
      if (currentProfileRes.rows.length > 0) {
        const dbProfile = currentProfileRes.rows[0];
        const dbServerUpdatedAt = new Date(dbProfile.server_updated_at).getTime();
        const clientLastSyncTime = req.body.lastSyncTime ? new Date(req.body.lastSyncTime).getTime() : 0;

        if (dbServerUpdatedAt > clientLastSyncTime) {
          // Keep server values since they are newer (e.g. from parent console)
          mergedEnergy = dbProfile.energy;
        }
      }

      await client.query(
        `INSERT INTO ge10_player_profiles (user_id, level, xp, coins, streak, energy, hearts, last_active, badges)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (user_id) DO UPDATE SET
           level = EXCLUDED.level,
           xp = EXCLUDED.xp,
           coins = EXCLUDED.coins,
           streak = EXCLUDED.streak,
           energy = EXCLUDED.energy,
           hearts = EXCLUDED.hearts,
           last_active = EXCLUDED.last_active,
           badges = EXCLUDED.badges`,
        [
          userId,
          player.level,
          player.xp,
          player.coins,
          player.streak,
          mergedEnergy,
          player.hearts,
          player.lastActive,
          player.badges
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

    // 3. Sync category stats
    if (categoryStats) {
      for (const cat of Object.keys(categoryStats)) {
        const item = categoryStats[cat];
        await client.query(
          `INSERT INTO ge10_category_stats (user_id, category, total_answered, total_correct, rolling_accuracy)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (user_id, category) DO UPDATE SET
             total_answered = EXCLUDED.total_answered,
             total_correct = EXCLUDED.total_correct,
             rolling_accuracy = EXCLUDED.rolling_accuracy`,
          [userId, item.category, item.totalAnswered, item.totalCorrect, item.rollingAccuracy]
        );
      }
    }

    // 4. Sync history logs (delete old to keep DB clean, sync only current list)
    if (logs && Array.isArray(logs)) {
      // Upsert current logs list
      for (const log of logs) {
        await client.query(
          `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (id) DO NOTHING`,
          [log.id, userId, log.timestamp, log.activityType, log.title, log.detail, log.coinsChanged, log.xpChanged, log.walletChanged]
        );
      }
    }

    // 5. Sync reward catalog (Phần Thưởng Thực Tế — CORE_SPECS §3.2)
    if (rewards && Array.isArray(rewards)) {
      for (const r of rewards) {
        await client.query(
          `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, quantity, remaining_quantity, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO UPDATE SET
             title = EXCLUDED.title,
             cost_coins = EXCLUDED.cost_coins,
             quantity = EXCLUDED.quantity,
             remaining_quantity = EXCLUDED.remaining_quantity`,
          [r.id, userId, r.title, r.costCoins, r.quantity, r.remainingQuantity, r.timestamp]
        );
      }
    }

    // 5b. Sync reward redemptions (lượt đổi quà)
    if (rewardRedemptions && Array.isArray(rewardRedemptions)) {
      for (const rr of rewardRedemptions) {
        await client.query(
          `INSERT INTO ge10_reward_redemptions (id, user_id, reward_id, reward_title, cost_coins, status, timestamp, delivered_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO UPDATE SET
             status = EXCLUDED.status,
             delivered_at = EXCLUDED.delivered_at`,
          [rr.id, userId, rr.rewardId, rr.rewardTitle, rr.costCoins, rr.status, rr.timestamp, rr.deliveredAt || null]
        );
      }
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

    // 7. Sync daily mission JSON
    if (dailyMission !== undefined) {
      await client.query(
        `INSERT INTO ge10_daily_missions (user_id, mission_json)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET
           mission_json = EXCLUDED.mission_json`,
        [userId, dailyMission ? JSON.stringify(dailyMission) : null]
      );
    }

    // 8. Sync lessons progress
    if (lessonsProgress) {
      for (const [lessonId, completed] of Object.entries(lessonsProgress)) {
        if (completed) {
          await client.query(
            `INSERT INTO ge10_user_lessons_progress (user_id, lesson_id, completed, completed_at)
             VALUES ($1, $2, $3, NOW())
             ON CONFLICT (user_id, lesson_id) DO UPDATE SET
               completed = EXCLUDED.completed,
               completed_at = NOW()`,
            [userId, lessonId, completed]
          );
        }
      }
    }

    await client.query('COMMIT');
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      player: player ? {
        energy: mergedEnergy
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

// GET /api/questions: Loads default or custom questions for this user
app.get('/api/questions/custom', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  try {
    const qRes = await pool.query(
      `SELECT * FROM ge10_custom_questions 
       WHERE user_id = $1 
          OR user_id IS NULL 
          OR user_id IN (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien'))`,
      [userId]
    );
    res.json(qRes.rows.map((row: any) => ({
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
      imageUrl: row.image_url,
      metadata: row.metadata || undefined,
      isConfused: row.is_confused
    })));
  } catch (error) {
    console.error('Error loading custom questions:', error);
    res.status(500).json({ error: 'Failed to retrieve questions.' });
  }
});

// POST /api/questions/confused: Flags any question as confused/not understood
app.post('/api/questions/confused', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const question = req.body;
  try {
    await persistCustomQuestion(userId, { ...question, isConfused: true });
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error flagging question confused:', error.message);
    res.status(500).json({ error: 'Failed to flag question as confused.' });
  }
});

// PUT /api/questions/custom/:questionId: Updates a custom question owned by the signed-in user
app.put('/api/questions/custom/:questionId', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { questionId } = req.params;
  try {
    const exists = await pool.query('SELECT id FROM ge10_custom_questions WHERE id = $1 AND user_id = $2', [questionId, userId]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    const question = {
      id: questionId,
      ...req.body,
      subject: req.body.subject || 'english'
    };
    await persistCustomQuestion(userId, question);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error updating custom question:', error.message);
    res.status(500).json({ error: 'Failed to update question.' });
  }
});

// DELETE /api/questions/custom/:questionId: Deletes a custom question owned by the signed-in user
app.delete('/api/questions/custom/:questionId', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { questionId } = req.params;
  try {
    const result = await pool.query('DELETE FROM ge10_custom_questions WHERE id = $1 AND user_id = $2', [questionId, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting custom question:', error.message);
    res.status(500).json({ error: 'Failed to delete question.' });
  }
});

// GET /api/profile/:id/challenges: Retrieves challenges for a specific user profile
app.get('/api/profile/:id/challenges', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const userId = req.params.id;
  
  // Verify ownership
  const check = await pool.query('SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2', [userId, accountId]);
  if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

  try {
    const result = await pool.query('SELECT challenges_json FROM ge10_user_challenges WHERE user_id = $1', [userId]);
    res.json({ challenges: result.rows[0]?.challenges_json || [] });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Failed to fetch challenges.' });
  }
});
// ==================== ECONOMY ENDPOINTS ====================

// POST /api/economy/transaction: Record a coin transaction for a profile
app.post('/api/economy/transaction', authMiddleware, async (req: any, res) => {
  try {
    const accountId = req.user?.sub;
    if (!accountId) {
      console.error('No accountId in req.user');
      return res.status(401).json({ error: 'Unauthorized: missing accountId' });
    }

    const { profileId, amount, reason, details } = req.body;
    if (!profileId || amount === undefined) {
      return res.status(400).json({ error: 'Missing profileId or amount.' });
    }

    // Verify profile ownership
    const check = await pool.query('SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    // Update coins in player profile
    const result = await pool.query(
      `UPDATE ge10_player_profiles SET coins = GREATEST(0, coins + $1) WHERE user_id = $2 RETURNING coins`,
      [amount, profileId]
    );
    const newCoins = result.rows[0]?.coins ?? 0;
    res.json({ success: true, coins: newCoins, reason, details });
  } catch (error: any) {
    console.error('Error processing economy transaction:', error?.message || error);
    res.status(500).json({ error: 'Failed to process transaction.', details: error?.message });
  }
});

// ==================== FAMILY SYSTEM ENDPOINTS ====================

// GET /api/family/:profileId
// Fetch the family status, members, and pending invitations for a specific profile
app.get('/api/family/:profileId', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const profileId = req.params.profileId;
  
  try {
    // 1. Verify ownership
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const myRole = check.rows[0].role;

    // 2. Fetch data based on role
    if (myRole === 'student') {
      // Find my parent
      const linkRes = await pool.query(`
        SELECT l.id, l.status, u.id as parent_id, u.name as parent_name, u.email as parent_email 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.parent_id = u.id 
        WHERE l.student_id = $1
      `, [profileId]);
      
      return res.json({ role: 'student', links: linkRes.rows });
    } else {
      // Find my students
      const linkRes = await pool.query(`
        SELECT l.id, l.status, u.id as student_id, u.name as student_name, u.email as student_email 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1
      `, [profileId]);
      
      return res.json({ role: 'parent', links: linkRes.rows });
    }
  } catch (error) {
    console.error('Error fetching family:', error);
    res.status(500).json({ error: 'Failed to fetch family' });
  }
});

// POST /api/family/invite
app.post('/api/family/invite', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, targetId } = req.body; // targetId can be student ID or parent ID

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [senderProfileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const myRole = check.rows[0].role;

    // Check if target exists
    const targetCheck = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 OR email = $1', [targetId]);
    if (targetCheck.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    const target = targetCheck.rows[0];

    let parentId, studentId, initialStatus;

    if (myRole === 'student') {
      if (target.role === 'student') return res.status(400).json({ error: 'Cannot invite another student' });
      // Check if student already has a parent
      const existCheck = await pool.query('SELECT id FROM ge10_family_links WHERE student_id = $1', [senderProfileId]);
      if (existCheck.rowCount && existCheck.rowCount > 0) return res.status(400).json({ error: 'You already have a parent or pending invite' });
      
      studentId = senderProfileId;
      parentId = target.id;
      initialStatus = 'pending_parent'; // needs parent approval
    } else {
      if (target.role !== 'student') return res.status(400).json({ error: 'Can only invite a student' });
      const existCheck = await pool.query('SELECT id FROM ge10_family_links WHERE student_id = $1', [target.id]);
      if (existCheck.rowCount && existCheck.rowCount > 0) return res.status(400).json({ error: 'Student already has a parent or pending invite' });
      
      parentId = senderProfileId;
      studentId = target.id;
      initialStatus = 'pending_student'; // needs student approval
    }

    const linkId = crypto.randomUUID();
    await pool.query(
      'INSERT INTO ge10_family_links (id, parent_id, student_id, status) VALUES ($1, $2, $3, $4)',
      [linkId, parentId, studentId, initialStatus]
    );

    res.json({ success: true, message: 'Invite sent' });
  } catch (error) {
    console.error('Error inviting:', error);
    res.status(500).json({ error: 'Failed to invite' });
  }
});

// POST /api/family/respond
app.post('/api/family/respond', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, linkId, accept } = req.body;

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const myRole = check.rows[0].role;

    const linkCheck = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkCheck.rowCount === 0) return res.status(404).json({ error: 'Link not found' });
    const link = linkCheck.rows[0];

    // Authorize response
    if (myRole === 'student' && link.student_id !== profileId) return res.status(403).json({ error: 'Unauthorized' });
    if (myRole !== 'student' && link.parent_id !== profileId) return res.status(403).json({ error: 'Unauthorized' });

    if (!accept) {
      await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
      return res.json({ success: true, message: 'Invite rejected' });
    }

    await pool.query("UPDATE ge10_family_links SET status = 'active', updated_at = NOW() WHERE id = $1", [linkId]);
    res.json({ success: true, message: 'Invite accepted' });
  } catch (error) {
    console.error('Error responding:', error);
    res.status(500).json({ error: 'Failed to respond' });
  }
});

// POST /api/family/leave
app.post('/api/family/leave', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, linkId } = req.body;

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    const linkCheck = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkCheck.rowCount === 0) return res.status(404).json({ error: 'Link not found' });
    const link = linkCheck.rows[0];

    if (link.student_id !== profileId && link.parent_id !== profileId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
    res.json({ success: true, message: 'Left family' });
  } catch (error) {
    console.error('Error leaving:', error);
    res.status(500).json({ error: 'Failed to leave family' });
  }
});

// POST /api/ai/ingest: Uses Gemini API to parse raw text into structured grade 10 questions (English or Math)
app.post('/api/ai/ingest', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { rawText, subject = 'english' } = req.body;
  if (!rawText) return res.status(400).json({ error: 'Missing rawText.' });

  try {
    let prompt = '';
    if (subject === 'math') {
      prompt = `Bạn là một chuyên gia ôn thi môn Toán lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh Toán 10 TP.HCM. Đề thật thường chia theo 8 cụm nội dung: parabol/đồ thị, Vi-ét, hàm số bậc nhất/đổi đơn vị, tăng trưởng theo tỉ lệ phần trăm, giảm giá lũy tiến, hình học thể tích/dâng nước, mua hàng khuyến mãi, hình học phẳng chứng minh.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "short-answer" | "proof" | "multi-part",
          "category": "parabol-line" | "viet-relation" | "linear-function" | "growth-modeling" | "percentage-discount" | "volume-displacement" | "shopping-discount" | "tangent-geometry" | "real-equations" | "real-geometry" | "real-finance" | "plane-geometry" | "statistics-probability" | "modeling",
          "prompt": "Đề bài câu hỏi. Nếu là bài chứng minh hoặc nhiều ý, hãy giữ nguyên a/b/c rõ ràng.",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Đáp án đúng hoặc mảng các đáp án được chấp nhận",
          "explanation": "Giải thích chi tiết từng bước. Với bài hình hoặc chứng minh, tách các bước logic rõ ràng.",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Math",
          "metadata": {
            "examPart": "Bài 1|Bài 2|...",
            "mathTopic": "function-graph" | "quadratic-equation" | "linear-function" | "growth-modeling" | "percentage-discount" | "volume-displacement" | "shopping-discount" | "tangent-geometry" | "statistics-probability" | "modeling" | "solid-geometry" | "finance" | "plane-geometry" | "mixed",
            "answerMode": "single-choice" | "short-answer" | "proof" | "multi-part" | "numeric" | "expression",
            "solutionStyle": "direct" | "worked" | "proof-outline" | "diagram" | "table",
            "subparts": ["a", "b", "c"],
            "solutionSteps": ["Bước 1...", "Bước 2..."],
            "formulaHints": ["..."],
            "diagramHint": "...",
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else if (subject === 'literature') {
      prompt = `Bạn là một chuyên gia ôn thi môn Ngữ văn lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Ngữ văn. Ngân hàng câu hỏi phải bao phủ đủ 4 lớp nội dung:
      - "literature-reading-poetry": Đọc hiểu thơ.
      - "literature-reading-prose": Đọc hiểu truyện, kí, tản văn.
      - "literature-reading-argument": Đọc hiểu văn bản nghị luận hoặc văn bản thông tin.
      - "literature-vietnamese": Tiếng Việt thực hành: phương thức biểu đạt, biện pháp tu từ, thành phần câu, nghĩa từ, liên kết.
      - "literature-writing": Nghị luận xã hội và nghị luận văn học.

      Gợi ý phân tầng metadata để UI và CRUD hiểu đúng bank:
      - Phần I: reading, dùng cho câu nhận biết/thông hiểu/vận dụng đọc hiểu.
      - Phần II: vietnamese, dùng cho câu tiếng Việt thực hành.
      - Phần III: social-essay, dùng cho bài nghị luận xã hội.
      - Phần IV: literary-essay, dùng cho bài nghị luận văn học.
      - textGenre: poetry | prose | argument | informative | mixed.
      - literatureTask: main-idea | detail | rhetoric | vocabulary | message | social-essay | poetry-analysis | prose-analysis | character-analysis | comparison.
      - answerMode: single-choice | short-answer | multi-part.
      - solutionStyle: direct | worked | rubric.

      Lưu ý đặc biệt đối với đọc hiểu văn bản:
      Nếu câu hỏi có đi kèm một văn bản đọc hiểu (đoạn trích thơ/văn), hãy đặt văn bản đọc hiểu đó ở đầu thuộc tính "prompt" theo mẫu định dạng:
      "**Đọc đoạn trích sau và trả lời câu hỏi:**
[Đoạn văn bản trích dẫn]

[Câu hỏi cụ thể...]"

      Với câu nghị luận, hãy trả về các ý chấm/rubric dưới dạng mảng trong correctAnswer và solutionSteps để có thể tái dùng cho CRUD và hiển thị đáp án mẫu.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "short-answer" | "multi-part",
          "category": "literature-reading-poetry" | "literature-reading-prose" | "literature-reading-argument" | "literature-vietnamese" | "literature-writing",
          "prompt": "Đề bài câu hỏi (kèm đoạn văn bản trích dẫn nếu có)...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Lựa chọn chính xác hoặc mảng các ý/keyword được chấp nhận",
          "explanation": "Giải thích chi tiết tại sao chọn đáp án đó hoặc rubric chấm bài...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Literature",
          "metadata": {
            "examPart": "Phần I|Phần II|Phần III|Phần IV",
            "literatureTrack": "reading" | "vietnamese" | "social-essay" | "literary-essay",
            "literatureTask": "main-idea" | "detail" | "rhetoric" | "vocabulary" | "message" | "social-essay" | "poetry-analysis" | "prose-analysis" | "character-analysis" | "comparison",
            "textGenre": "poetry" | "prose" | "argument" | "informative" | "mixed",
            "answerMode": "single-choice" | "short-answer" | "multi-part",
            "solutionStyle": "direct" | "worked" | "rubric",
            "subparts": ["mở bài", "thân bài", "kết bài"],
            "solutionSteps": ["Bước 1...", "Bước 2..."],
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else {

      prompt = `Bạn là một chuyên gia ôn thi tiếng Anh lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra câu hỏi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Tiếng Anh. Đề chuẩn hóa có 6 phần:
      - Part I: Multiple Choice (grammar, vocabulary, pronunciation, stress, communication, signs).
      - Part II: Guided Cloze.
      - Part III: Reading Comprehension (true/false, main idea, detail, reference).
      - Part IV: Word Forms.
      - Part V: Sentence Rearrangement.
      - Part VI: Sentence Transformation.

      Gợi ý phân tầng metadata để UI và CRUD hiểu đúng bank:
      - englishPart: Part I | Part II | Part III | Part IV | Part V | Part VI.
      - englishTask: grammar | vocabulary | pronunciation | stress | guided-cloze | reading-true-false | reading-mcq | word-form | rearrangement | transformation.
      - englishSkill: multiple-choice | guided-cloze | reading | word-form | rearrangement | transformation.
      - answerMode: single-choice | short-answer | multi-part.
      - solutionStyle: direct | worked | rubric.

      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq" | "wordform" | "rewrite" | "cloze" | "short-answer" | "multi-part",
          "category": "grammar" | "reading" | "vocabulary" | "wordform" | "pronunciation" | "stress" | "tenses" | "passive-voice" | "relative-clauses" | "rewrite",
          "prompt": "Đề bài câu hỏi...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Đáp án đúng hoặc mảng các đáp án được chấp nhận",
          "explanation": "Giải thích chi tiết tại sao chọn đáp án đó...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested English",
          "metadata": {
            "examPart": "Part I|Part II|Part III|Part IV|Part V|Part VI",
            "englishPart": "Part I|Part II|Part III|Part IV|Part V|Part VI",
            "englishTask": "grammar|vocabulary|pronunciation|stress|guided-cloze|reading-true-false|reading-mcq|word-form|rearrangement|transformation",
            "englishSkill": "multiple-choice|guided-cloze|reading|word-form|rearrangement|transformation",
            "answerMode": "single-choice|short-answer|multi-part",
            "solutionStyle": "direct|worked|rubric",
            "subparts": ["a", "b", "c"],
            "solutionSteps": ["Step 1...", "Step 2..."],
            "tags": ["official-exam", "hcmc-2026"]
          }
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    }

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json' });
    const questions = JSON.parse(responseText.trim());

    // Save custom questions to PG custom_questions table
    for (const q of questions) {
      await persistCustomQuestion(userId, {
        id: q.id || `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...q,
        source: q.source || (subject === 'math' ? 'AI Ingested Math' : subject === 'literature' ? 'AI Ingested Literature' : 'AI Ingested English'),
        subject
      });
    }

    res.json({ success: true, questionsCount: questions.length, questions });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Ingest:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process AI Ingestion: ' + error.message });
  }
});

// POST /api/ai/geometry-3d: Uses Gemini API to analyze a grade 9 3D geometry problem and return structured drawing guidance
app.post('/api/ai/geometry-3d', authMiddleware, async (req: any, res) => {
  const { problemText, subjectHint = 'math', shapeHint = '' } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về hình học không gian theo định hướng chấm của Sở GD&ĐT TP.HCM. Nhiệm vụ của bạn là phân tích một đề bài hình học 3D và trả về kết quả JSON duy nhất, không có markdown.

Yêu cầu:
- Nhận dạng đúng dạng hình: hình trụ, hình chóp, lăng trụ, tứ diện, hình hộp, hoặc unknown.
- Không bịa số đo hay quan hệ nếu đề không cung cấp.
- Nếu đề là hình trụ có mặt cắt song song với trục, hãy ưu tiên nhận dạng cylinder và mô tả rõ dây cung, tâm đáy, chiều cao và mặt cắt chữ nhật.
- Khi đề có nhắc đến đường cao, trung điểm, mặt phẳng, vuông góc, song song, phải nêu rõ cách dựng hình và ý nghĩa hình học.
- Phần lời giải phải theo kiểu Toán 9: giả thiết -> dựng hình -> lập luận -> kết luận.
- Cho phép đề xuất các thao tác vẽ đơn giản để học sinh thao tác trên bảng.
- Quan trọng: Phân chia quá trình vẽ thành các bước nhỏ (từ 0). Mỗi modelActions đều phải có trường "stepIndex" tương ứng với vị trí trong mảng stepByStep mà thao tác đó được thực hiện.
- Nếu không đủ dữ kiện, phải nói rõ thiếu gì cần bổ sung.

Trả về JSON theo schema:
{
  "detectedShape": "prism" | "cuboid" | "pyramid" | "tetrahedron" | "cylinder" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "tóm tắt cách nhìn nhanh",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "...", "command": "lệnh vẽ ngắn gọn để hiện caption" }
  ],
  "modelActions": [
    {
      "type": "drawAltitude" | "connectVertexToEdge" | "connectVertexToVertex" | "highlightFace" | "markPerpendicular" | "markParallel" | "markMidpoint",
      "from": "S",
      "to": "BC",
      "face": ["A", "B", "C"],
      "note": "ghi chú ngắn",
      "style": "solid" | "dashed",
      "color": "#00f0ff",
      "stepIndex": 1
    }
  ],
  "commands": ["vẽ đường cao từ S", "nối trung điểm BC với đỉnh S"],
  "warnings": ["..."]
}

Thông tin bài toán:
- subjectHint: ${subjectHint}
- shapeHint: ${shapeHint}
- problemText: ${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Geometry 3D:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process geometry analysis: ' + error.message });
  }
});

// POST /api/ai/geometry-plane: Uses Gemini API to analyze a grade 9 plane geometry problem and return structured drawing guidance
app.post('/api/ai/geometry-plane', authMiddleware, async (req: any, res) => {
  const { problemText } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về hình học phẳng theo chương trình Bộ GD&ĐT và cách trình bày chấm điểm của Sở GD&ĐT TP.HCM. Hãy phân tích đề bài hình học phẳng và trả về đúng một JSON duy nhất, không markdown.

Yêu cầu:
- Nhận dạng đúng dạng hình: tam giác, tứ giác, đường tròn, hỗn hợp hoặc unknown.
- Ưu tiên mô tả các yếu tố cơ bản mà học sinh cần dựng trên bảng.
- Có thể đề xuất các thao tác đơn giản như nối đỉnh với đỉnh, nối đỉnh với cạnh, dựng đường cao, trung tuyến, vuông góc, song song, đánh dấu góc.
- Quan trọng: Phân chia quá trình vẽ thành các bước nhỏ (từ 0). Mỗi đối tượng point, polygon, circle, overlay đều phải có trường "stepIndex" tương ứng với vị trí trong mảng stepByStep mà đối tượng đó bắt đầu xuất hiện.
- Không bịa quan hệ nếu đề không cho.
- Lời giải phải ngắn gọn, theo kiểu: giả thiết -> dựng hình -> lập luận -> kết luận.
- Mọi điểm và tọa độ nên nằm trong khoảng hợp lý trên bảng 800x560 để dựng trực quan.

Trả về JSON theo schema:
{
  "figureKind": "triangle" | "quadrilateral" | "circle" | "mixed" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "mô tả nhanh cách nhìn hình",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "...", "command": "lệnh vẽ ngắn gọn để hiện caption" }
  ],
  "scene": {
    "points": [
      { "id": "A", "x": 180, "y": 120, "label": "A", "locked": false, "stepIndex": 0 }
    ],
    "polygon": {
      "id": "tri",
      "points": ["A", "B", "C"],
      "fill": "#38bdf8",
      "opacity": 0.14,
      "stepIndex": 0
    },
    "circle": {
      "center": "O",
      "radiusPoint": "A",
      "fill": "#38bdf8",
      "opacity": 0.08,
      "stepIndex": 1
    },
    "overlays": [
      {
        "type": "segment" | "marker" | "parallel" | "angle",
        "from": "A",
        "to": "BC",
        "at": "A",
        "color": "#00f0ff",
        "label": "Đường cao",
        "dashed": true,
        "stepIndex": 1
      }
    ]
  },
  "commands": ["vẽ đường cao từ A", "nối trung điểm BC với đỉnh A"],
  "warnings": ["..."]
}

Thông tin bài toán:
${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Geometry Plane:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process plane geometry analysis: ' + error.message });
  }
});

// POST /api/ai/function-graph: Uses Gemini API to analyze a grade 9 function graph problem and return structured guidance
app.post('/api/ai/function-graph', authMiddleware, async (req: any, res) => {
  const { problemText } = req.body || {};
  if (!problemText || !String(problemText).trim()) {
    return res.status(400).json({ error: 'Missing problemText.' });
  }

  try {
    const prompt = `Bạn là trợ lý Toán 9 chuyên về đồ thị hàm số theo chương trình Bộ GD&ĐT. Hãy phân tích đề bài và trả về đúng một JSON duy nhất, không markdown.

Yêu cầu:
- Nhận dạng đúng dạng hàm: bậc nhất, bậc hai hoặc unknown.
- Nếu là bậc nhất, ưu tiên hệ số m, n trong y = mx + n.
- Nếu là bậc hai, ưu tiên hệ số a, b, c trong y = ax^2 + bx + c.
- Có thể nêu các điểm đặc biệt: giao với Ox/Oy, đỉnh, trục đối xứng, xét chiều biến thiên cơ bản.
- Lời giải phải theo cách trình bày Toán 9: nhận dạng hàm -> nêu hệ số -> xác định điểm đặc biệt -> kết luận.

Trả về JSON theo schema:
{
  "functionKind": "linear" | "quadratic" | "unknown",
  "title": "chuỗi ngắn gọn",
  "summary": "mô tả nhanh",
  "assumptions": ["..."],
  "stepByStep": [
    { "title": "Bước 1", "body": "..." }
  ],
  "coefficients": {
    "m": 1,
    "n": 0,
    "a": 1,
    "b": 0,
    "c": 0
  },
  "commands": ["tăng a lên 2", "tìm giao điểm với Ox"],
  "warnings": ["..."]
}

Thông tin bài toán:
${problemText}`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Function Graph:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process function graph analysis: ' + error.message });
  }
});

// POST /api/ai/grade-literature: Uses Gemini API to evaluate and grade a student's literature essay
app.post('/api/ai/grade-literature', authMiddleware, async (req: any, res) => {
  const { promptText, essay, keywords = [], rubric = [] } = req.body || {};
  if (!promptText || !String(promptText).trim()) {
    return res.status(400).json({ error: 'Missing promptText.' });
  }
  if (!essay || !String(essay).trim()) {
    return res.status(400).json({ error: 'Missing essay.' });
  }

  try {
    const prompt = `Bạn là một giáo viên dạy Văn trung học phổ thông, chuyên chấm thi tuyển sinh lớp 10 môn Ngữ văn tại TP.HCM.
Nhiệm vụ của bạn là chấm điểm bài làm văn nghị luận của học sinh dựa trên đề bài, các từ khóa/ý chính cần có, và các bước giải quyết đề (rubric).

Yêu cầu chấm điểm và nhận xét:
1. Đánh giá xem bài làm có đáp ứng đề bài không, độ dài có phù hợp không (ví dụ đề yêu cầu khoảng 500 chữ thì bài làm cần đủ dung lượng tối thiểu 200-300 chữ, tối đa khoảng 600-700 chữ).
2. Kiểm tra xem học sinh có đưa vào bài viết các ý chính/từ khóa quan trọng hay không. Cần đánh giá theo mặt ý nghĩa/khái niệm chứ không chỉ so khớp từ ngữ thô cứng (ví dụ: học sinh dùng từ đồng nghĩa, diễn đạt khác nhưng vẫn đầy đủ ý thì vẫn tính là đạt).
3. Đánh giá tính liên kết, mạch lạc, lập luận logic của bài viết.
4. Đưa ra điểm số khách quan từ 0 đến 10 (chỉ lấy số nguyên).
5. Chỉ ra các ý chính cụ thể nào học sinh đã viết tốt (matchedKeywords) và các ý chính nào học sinh bị thiếu hoặc diễn đạt quá mờ nhạt (missingKeywords).
6. Viết một đoạn nhận xét chung ngắn gọn bằng tiếng Việt về ưu/nhược điểm (bố cục, hành văn, lập luận).
7. Đưa ra một vài gợi ý cụ thể để học sinh cải thiện.

Thông tin đầu vào:
- Đề bài: ${promptText}
- Bài làm của học sinh: ${essay}
- Các từ khóa/ý chính cần có: ${JSON.stringify(keywords)}
- Dàn ý/Rubric các bước gợi ý: ${JSON.stringify(rubric)}

Hãy trả về kết quả dưới dạng JSON duy nhất khớp chính xác với cấu trúc dưới đây:
{
  "score": 8,
  "matchedKeywords": ["ý 1", "ý 2"],
  "missingKeywords": ["ý 3", "ý 4"],
  "feedback": "Nhận xét chung ngắn gọn...",
  "suggestions": ["gợi ý 1", "gợi ý 2"]
}
Lưu ý: các phần tử trong matchedKeywords và missingKeywords phải lấy chính xác từ danh sách từ khóa/ý chính cần có đầu vào nếu chúng tương ứng với ý đó.`;

    const responseText = await callGeminiAPI(prompt, { responseMimeType: 'application/json', temperature: 0.2 });
    const parsed = JSON.parse(responseText.trim());
    res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Grade Literature:', error.message);
    if (error instanceof GeminiExhaustedError) {
      return res.status(503).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to process literature essay grading: ' + error.message });
  }
});

// GET /api/admin/users: Lists all users in the system
app.get('/api/admin/users', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const usersRes = await pool.query('SELECT id, name, email, avatar_url, role FROM ge10_users');
    res.json(usersRes.rows);
  } catch (error: any) {
    console.error('Error fetching admin users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});

// POST /api/admin/promote: Updates role for a specific user ID
app.post('/api/admin/promote', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    const adminRole = adminCheck.rows[0].role;
    if (adminRole !== 'truong_vien' && adminRole !== 'pho_vien') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { targetUserId, newRole } = req.body;
    if (!targetUserId || !newRole) {
      return res.status(400).json({ error: 'Missing targetUserId or newRole.' });
    }

    if (adminRole === 'pho_vien' && newRole !== 'student' && newRole !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Pho Vien can only promote to student or parent.' });
    }

    await pool.query('UPDATE ge10_users SET role = $1 WHERE id = $2', [newRole, targetUserId]);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error promoting user:', error.message);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// POST /api/admin/deliver-reward: Confirms a student's pending redemption has been handed over in real life
// (CORE_SPECS §3.2 — app không quản lý tiền, hành động này KHÔNG chạy bất kỳ giao dịch tiền nào).
app.post('/api/admin/deliver-reward', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId, redemptionId } = req.body;
    if (!studentUserId || !redemptionId) {
      return res.status(400).json({ error: 'Missing studentUserId or redemptionId.' });
    }

    const redemptionRes = await pool.query(
      'SELECT reward_title FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [redemptionId, studentUserId]
    );
    if (redemptionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending redemption not found.' });
    }
    const { reward_title } = redemptionRes.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const deliveredAt = Date.now();
      await client.query(
        "UPDATE ge10_reward_redemptions SET status = 'delivered', delivered_at = $1 WHERE id = $2 AND user_id = $3",
        [deliveredAt, redemptionId, studentUserId]
      );

      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Đã Trao Phần Thưởng',
          `Viện Chủ xác nhận đã trao "${reward_title}" ngoài đời.`,
          0,
          0
        ]
      );

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error delivering reward:', error.message);
    res.status(500).json({ error: 'Failed to deliver reward.' });
  }
});

// POST /api/admin/cancel-redemption: Cancels a student's pending redemption, refunding NP and restocking quantity
app.post('/api/admin/cancel-redemption', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId, redemptionId } = req.body;
    if (!studentUserId || !redemptionId) {
      return res.status(400).json({ error: 'Missing studentUserId or redemptionId.' });
    }

    const redemptionRes = await pool.query(
      'SELECT reward_id, reward_title, cost_coins FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [redemptionId, studentUserId]
    );
    if (redemptionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending redemption not found.' });
    }
    const { reward_id, reward_title, cost_coins } = redemptionRes.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2', [redemptionId, studentUserId]);

      // Hoàn NP — được phép âm/dương tùy tình huống, không kẹp đáy (CORE_SPECS §3.1).
      await client.query(
        'UPDATE ge10_player_profiles SET coins = coins + $1 WHERE user_id = $2',
        [cost_coins, studentUserId]
      );

      if (reward_id) {
        await client.query(
          'UPDATE ge10_parent_rewards SET remaining_quantity = remaining_quantity + 1 WHERE id = $1',
          [reward_id]
        );
      }

      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Viện Chủ hoàn trả Ngân Lượng',
          `Hủy lượt đổi "${reward_title}". Đã hoàn lại ${cost_coins} NP`,
          cost_coins,
          0
        ]
      );

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error cancelling redemption:', error.message);
    res.status(500).json({ error: 'Failed to cancel redemption.' });
  }
});

// POST /api/admin/refill-energy: Sets a student's energy to a percentage of the max when parent clicks "⚡ Nạp Năng Lượng"
app.post('/api/admin/refill-energy', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId } = req.body;
    if (!studentUserId) {
      return res.status(400).json({ error: 'Invalid parameters: studentUserId.' });
    }

    const currentRes = await pool.query('SELECT energy FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    if (currentRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    const rawPercent = Number(req.body.energyPercent);
    const rawEnergyValue = Number(req.body.energyValue);
    const maxEnergy = await loadMaxEnergy();
    let targetEnergy = maxEnergy;
    if (Number.isFinite(rawPercent)) {
      const clampedPercent = Math.max(0, Math.min(100, rawPercent));
      targetEnergy = Math.round((maxEnergy * clampedPercent) / 100);
    } else if (Number.isFinite(rawEnergyValue)) {
      targetEnergy = Math.max(0, Math.min(maxEnergy, Math.round(rawEnergyValue)));
    }

    await pool.query(
      'UPDATE ge10_player_profiles SET energy = $2, server_updated_at = NOW() WHERE user_id = $1',
      [studentUserId, targetEnergy]
    );

    // Log the energy refill log
    const logId = `log-refill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await pool.query(
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        logId,
        studentUserId,
        Date.now(),
        'exercise',
        '⚡ Bơm Năng Lượng',
        `Ba Mẹ đã cập nhật năng lượng cho bé lên ${targetEnergy}/${maxEnergy} (${Math.round((targetEnergy / maxEnergy) * 100)}%).`,
        0,
        0,
        0
      ]
    );

    res.json({ success: true, energy: targetEnergy, maxEnergy: maxEnergy });
  } catch (error: any) {
    console.error('Error refilling energy:', error.message);
    res.status(500).json({ error: 'Failed to refill energy.' });
  }
});

// PUT /api/admin/game-settings: Updates global game configuration parameters
app.put('/api/admin/game-settings', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { bossCompletionBonusNP, challengeEnergyCosts, maxEnergy, baseXP, baseCoins } = req.body || {};
    const response: any = { success: true };

    if (bossCompletionBonusNP !== undefined) {
      if (!Array.isArray(bossCompletionBonusNP) || bossCompletionBonusNP.length !== 3) {
        return res.status(400).json({ error: 'Invalid parameters: bossCompletionBonusNP must contain 3 values.' });
      }
      const normalizedBonus = bossCompletionBonusNP.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number];
      if (normalizedBonus.some(v => !Number.isFinite(v))) {
        return res.status(400).json({ error: 'Invalid boss completion bonus values.' });
      }
      await saveBossCompletionBonusNP(normalizedBonus);
      response.bossCompletionBonusNP = normalizedBonus;
    }

    if (challengeEnergyCosts !== undefined) {
      if (!Array.isArray(challengeEnergyCosts) || challengeEnergyCosts.length !== 4) {
        return res.status(400).json({ error: 'Invalid parameters: challengeEnergyCosts must contain 4 values.' });
      }
      const normalizedCosts = challengeEnergyCosts.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number, number];
      if (normalizedCosts.some(v => !Number.isFinite(v))) {
        return res.status(400).json({ error: 'Invalid challenge energy values.' });
      }
      await saveChallengeEnergyCosts(normalizedCosts);
      response.challengeEnergyCosts = normalizedCosts;
    }

    if (maxEnergy !== undefined) {
      const val = Math.max(1, Math.round(Number(maxEnergy)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid maxEnergy value.' });
      }
      await saveMaxEnergy(val);
      response.maxEnergy = val;
    }

    if (baseXP !== undefined) {
      const val = Math.max(1, Math.round(Number(baseXP)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid baseXP value.' });
      }
      await saveBaseXP(val);
      response.baseXP = val;
    }

    if (baseCoins !== undefined) {
      const val = Math.max(1, Math.round(Number(baseCoins)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid baseCoins value.' });
      }
      await saveBaseCoins(val);
      response.baseCoins = val;
    }

    res.json(response);
  } catch (error: any) {
    console.error('Error updating game settings:', error.message);
    res.status(500).json({ error: 'Failed to update game settings.' });
  }
});

// GET /api/admin/student-profile: Retrieves another student's profile statistics, logs, and pet state
app.get('/api/admin/student-profile', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId } = req.query;
    if (!studentUserId) {
      return res.status(400).json({ error: 'Missing studentUserId query parameter.' });
    }

    const userRes = await pool.query('SELECT id, name, email, avatar_url, role FROM ge10_users WHERE id = $1', [studentUserId]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    const userRow = userRes.rows[0];

    const playerRes = await pool.query('SELECT * FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    const petRes = await pool.query('SELECT * FROM ge10_pet_states WHERE user_id = $1', [studentUserId]);
    const statsRes = await pool.query('SELECT * FROM ge10_category_stats WHERE user_id = $1', [studentUserId]);
    const logsRes = await pool.query('SELECT * FROM ge10_history_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 100', [studentUserId]);
    let rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [studentUserId]);
    if (rewardsRes.rowCount === 0) {
      const defaultRewards = [
        { id: `default-rew-1-${studentUserId}`, title: '1 giờ chơi iPad/Game', cost_coins: 100, cash_value_vnd: 10000 },
        { id: `default-rew-2-${studentUserId}`, title: 'Ly trà sữa đặc biệt', cost_coins: 150, cash_value_vnd: 15000 },
        { id: `default-rew-3-${studentUserId}`, title: 'Một cuốn truyện tranh tự chọn', cost_coins: 150, cash_value_vnd: 15000 },
        { id: `default-rew-4-${studentUserId}`, title: 'Bữa gà rán KFC/Jollibee', cost_coins: 200, cash_value_vnd: 20000 },
        { id: `default-rew-5-${studentUserId}`, title: 'Vé xem phim cuối tuần', cost_coins: 200, cash_value_vnd: 20000 }
      ];

      for (const dr of defaultRewards) {
        await pool.query(
          `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, cash_value_vnd, status, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [dr.id, studentUserId, dr.title, dr.cost_coins, dr.cash_value_vnd, 'pending', Date.now()]
        );
      }
      rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [studentUserId]);
    }

    const categoryStats: any = {};
    statsRes.rows.forEach((row: any) => {
      categoryStats[row.category] = {
        category: row.category,
        totalAnswered: row.total_answered,
        totalCorrect: row.total_correct,
        rollingAccuracy: row.rolling_accuracy
      };
    });

    const logs = logsRes.rows.map((row: any) => ({
      id: row.id,
      timestamp: Number(row.timestamp),
      activityType: row.activity_type,
      title: row.title,
      detail: row.detail,
      coinsChanged: row.coins_changed,
      xpChanged: row.xp_changed,
      walletChanged: row.wallet_changed
    }));

    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costCoins: row.cost_coins,
      cashValueVND: row.cash_value_vnd,
      status: row.status,
      timestamp: Number(row.timestamp)
    }));

    res.json({
      studentUser: userRow,
      player: playerRes.rows[0] ? {
        id: playerRes.rows[0].user_id,
        name: userRow.name,
        role: userRow.role,
        level: playerRes.rows[0].level,
        xp: playerRes.rows[0].xp,
        coins: playerRes.rows[0].coins,
        walletVND: playerRes.rows[0].wallet_vnd,
        streak: playerRes.rows[0].streak,
        energy: playerRes.rows[0].energy,
        hearts: playerRes.rows[0].hearts,
        lastActive: playerRes.rows[0].last_active,
        badges: playerRes.rows[0].badges || []
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
      rewards
    });
  } catch (error: any) {
    console.error('Error fetching student profile:', error.message);
    res.status(500).json({ error: 'Failed to retrieve student profile.' });
  }
});

// GET /api/gatekeeper-history
app.get('/api/gatekeeper-history', authMiddleware, async (req, res) => {
  const { studentId, pageId } = req.query;
  if (!studentId) return res.status(400).json({ error: 'Missing studentId' });
  try {
    let query = 'SELECT * FROM ge10_gatekeeper_history WHERE student_id = $1';
    let params: any[] = [studentId];
    if (pageId) {
      query += ' AND page_id = $2';
      params.push(pageId);
    }
    const result = await pool.query(query, params);
    res.json(result.rows.map(r => ({
      studentId: r.student_id,
      pageId: r.page_id,
      questionId: r.question_id,
      usedAt: r.used_at
    })));
  } catch (error) {
    console.error('Error fetching gatekeeper history:', error);
    res.status(500).json({ error: 'Failed to fetch gatekeeper history' });
  }
});

// POST /api/gatekeeper-history
app.post('/api/gatekeeper-history', authMiddleware, async (req, res) => {
  const { studentId, pageId, questionId } = req.body;
  if (!studentId || !pageId || !questionId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO ge10_gatekeeper_history (student_id, page_id, question_id) VALUES ($1, $2, $3) RETURNING *',
      [studentId, pageId, questionId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error recording gatekeeper history:', error);
    res.status(500).json({ error: 'Failed to record gatekeeper history' });
  }
});

app.listen(PORT, () => {
  console.log(`CyberEnglish API Server booting on port ${PORT}...`);
});

export default app;
