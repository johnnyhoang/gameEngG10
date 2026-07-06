import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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
    console.log('Database initialized successfully.');
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

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Auth / Profile Sync-User endpoint: Inserts or updates user metadata on login
app.post('/api/auth/sync-user', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const email = req.user.email;
  // Get name and avatar from Supabase metadata if exists, otherwise defaults
  const userMetadata = req.user.user_metadata || {};
  const name = userMetadata.name || userMetadata.full_name || email.split('@')[0];
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

  try {
    // Check if the user already exists to preserve their role
    const existingUser = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [userId]);
    let role = 'student';
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      role = existingUser.rows[0].role;
    } else {
      role = email === 'hoang.hoa@gmail.com' ? 'admin' : 'student';
    }

    await pool.query(
      `INSERT INTO ge10_users (id, name, email, avatar_url, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         avatar_url = EXCLUDED.avatar_url`,
      [userId, name, email, avatarUrl, role]
    );

    res.json({ success: true, user: { id: userId, name, email, avatar: avatarUrl, role } });
  } catch (error) {
    console.error('Error syncing user metadata:', error);
    res.status(500).json({ error: 'Failed to sync user.' });
  }
});

// GET /api/profile: Retrieves the complete profile bundle from Supabase Postgres
app.get('/api/profile', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;

  try {
    // 1. Fetch user metadata
    const userRes = await pool.query('SELECT * FROM ge10_users WHERE id = $1', [userId]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'User profile not found. Call sync-user first.' });
    }
    const userRow = userRes.rows[0];

    // 2. Fetch player profile stats
    const playerRes = await pool.query('SELECT * FROM ge10_player_profiles WHERE user_id = $1', [userId]);
    // 3. Fetch pet state
    const petRes = await pool.query('SELECT * FROM ge10_pet_states WHERE user_id = $1', [userId]);
    // 4. Fetch category stats
    const statsRes = await pool.query('SELECT * FROM ge10_category_stats WHERE user_id = $1', [userId]);
    // 5. Fetch logs (last 200)
    const logsRes = await pool.query('SELECT * FROM ge10_history_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 200', [userId]);
    // 6. Fetch rewards
    const rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    // 7. Fetch challenges
    const challengesRes = await pool.query('SELECT * FROM ge10_user_challenges WHERE user_id = $1', [userId]);
    // 8. Fetch daily mission
    const missionRes = await pool.query('SELECT * FROM ge10_daily_missions WHERE user_id = $1', [userId]);
    // 9. Fetch custom questions
    const questionsRes = await pool.query('SELECT * FROM ge10_custom_questions WHERE user_id = $1', [userId]);

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

    // Format rewards list
    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costCoins: row.cost_coins,
      cashValueVND: row.cash_value_vnd,
      status: row.status,
      timestamp: Number(row.timestamp)
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
      source: row.source
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
      rewards,
      challenges,
      dailyMission,
      customQuestions
    });
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    res.status(500).json({ error: 'Failed to retrieve profile data.' });
  }
});

// POST /api/profile/sync: Receives Zustand state and synchronizes it to Supabase PostgreSQL
app.post('/api/profile/sync', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { player, pet, categoryStats, logs, rewards, challenges, dailyMission } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Sync player profile
    if (player) {
      await client.query(
        `INSERT INTO ge10_player_profiles (user_id, level, xp, coins, wallet_vnd, streak, energy, hearts, last_active, badges)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (user_id) DO UPDATE SET
           level = EXCLUDED.level,
           xp = EXCLUDED.xp,
           coins = EXCLUDED.coins,
           wallet_vnd = EXCLUDED.wallet_vnd,
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
          player.walletVND,
          player.streak,
          player.energy,
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

    // 5. Sync parent rewards list
    if (rewards && Array.isArray(rewards)) {
      for (const r of rewards) {
        await client.query(
          `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, cash_value_vnd, status, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO UPDATE SET
             status = EXCLUDED.status`,
          [r.id, userId, r.title, r.costCoins, r.cashValueVND, r.status, r.timestamp]
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

    await client.query('COMMIT');
    res.json({ success: true, timestamp: new Date().toISOString() });
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
    const qRes = await pool.query('SELECT * FROM ge10_custom_questions WHERE user_id = $1', [userId]);
    res.json(qRes.rows);
  } catch (error) {
    console.error('Error loading custom questions:', error);
    res.status(500).json({ error: 'Failed to retrieve questions.' });
  }
});

// POST /api/ai/ingest: Uses Gemini API to parse raw text into structured grade 10 questions
app.post('/api/ai/ingest', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { rawText } = req.body;
  if (!rawText) return res.status(400).json({ error: 'Missing rawText.' });

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey || geminiKey.includes('AIzaSy') || geminiKey.includes('sk-')) {
      return res.status(400).json({ error: 'Gemini API Key is not configured or is a placeholder.' });
    }

    const prompt = `Bạn là một chuyên gia ôn thi tiếng Anh lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi luyện thi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM (MCQ, Word Form, Rewrite, Cloze).
    Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
    [
      {
        "id": "chuỗi ngẫu nhiên duy nhất",
        "type": "mcq" | "wordform" | "rewrite" | "cloze",
        "category": "grammar" | "reading" | "vocabulary" | "wordform" | "pronunciation" | "stress" | "tenses" | "passive-voice" | "relative-clauses",
        "prompt": "Đề bài câu hỏi...",
        "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
        "correctAnswer": "Đáp án đúng (nếu là rewrite hoặc wordform thì trả về mảng các đáp án được chấp nhận, ví dụ ['experienced'])",
        "explanation": "Giải thích chi tiết tại sao chọn đáp án đó...",
        "difficulty": số từ 1 đến 10,
        "source": "AI Ingested"
      }
    ]

    Văn bản cần phân tích:
    ${rawText}`;

    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      throw new Error(`Gemini API error: ${errText}`);
    }

    const apiData = await apiRes.json() as any;
    const responseText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) throw new Error('Empty response from Gemini AI.');

    const questions = JSON.parse(responseText.trim());

    // Save custom questions to PG custom_questions table
    for (const q of questions) {
      await pool.query(
        `INSERT INTO ge10_custom_questions (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO NOTHING`,
        [
          q.id || `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          q.type,
          q.category,
          q.prompt,
          q.options || null,
          Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer],
          q.explanation || '',
          q.difficulty || 5,
          q.source || 'AI Ingested'
        ]
      );
    }

    res.json({ success: true, questionsCount: questions.length, questions });
  } catch (error: any) {
    console.error('Lỗi gọi Gemini AI Ingest:', error.message);
    res.status(500).json({ error: 'Failed to process AI Ingestion: ' + error.message });
  }
});

// GET /api/admin/users: Lists all users in the system
app.get('/api/admin/users', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
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
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { targetUserId, newRole } = req.body;
    if (!targetUserId || !newRole) {
      return res.status(400).json({ error: 'Missing targetUserId or newRole.' });
    }

    await pool.query('UPDATE ge10_users SET role = $1 WHERE id = $2', [newRole, targetUserId]);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error promoting user:', error.message);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// GET /api/admin/student-profile: Retrieves another student's profile statistics, logs, and pet state
app.get('/api/admin/student-profile', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
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
    const rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [studentUserId]);

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

app.listen(PORT, () => {
  console.log(`CyberEnglish API Server booting on port ${PORT}...`);
});

export default app;
