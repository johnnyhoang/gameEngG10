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
const PLAYER_ENERGY_MAX = 1000;
const DEFAULT_BOSS_BOUNTIES_VND: [number, number, number] = [10000, 15000, 20000];

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

const loadBossBounties = async (): Promise<[number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'boss_bounties_vnd'"
  );
  const raw = res.rows[0]?.setting_json;
  const values = [
    Number(raw?.['2024']),
    Number(raw?.['2025']),
    Number(raw?.['2026'])
  ];

  if (values.every(v => Number.isFinite(v) && v >= 0)) {
    return [values[0], values[1], values[2]];
  }

  return DEFAULT_BOSS_BOUNTIES_VND;
};

const saveBossBounties = async (bossBountiesVnd: [number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('boss_bounties_vnd', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ 2024: bossBountiesVnd[0], 2025: bossBountiesVnd[1], 2026: bossBountiesVnd[2] })]
  );
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
    let rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    if (rewardsRes.rowCount === 0) {
      const defaultRewards = [
        { id: `default-rew-1-${userId}`, title: '1 giờ chơi iPad/Game', cost_coins: 100, cash_value_vnd: 10000 },
        { id: `default-rew-2-${userId}`, title: 'Ly trà sữa đặc biệt', cost_coins: 150, cash_value_vnd: 15000 },
        { id: `default-rew-3-${userId}`, title: 'Một cuốn truyện tranh tự chọn', cost_coins: 150, cash_value_vnd: 15000 },
        { id: `default-rew-4-${userId}`, title: 'Bữa gà rán KFC/Jollibee', cost_coins: 200, cash_value_vnd: 20000 },
        { id: `default-rew-5-${userId}`, title: 'Vé xem phim cuối tuần', cost_coins: 200, cash_value_vnd: 20000 }
      ];

      for (const dr of defaultRewards) {
        await pool.query(
          `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, cash_value_vnd, status, timestamp)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [dr.id, userId, dr.title, dr.cost_coins, dr.cash_value_vnd, 'pending', Date.now()]
        );
      }
      rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [userId]);
    }
    // 7. Fetch challenges
    const challengesRes = await pool.query('SELECT * FROM ge10_user_challenges WHERE user_id = $1', [userId]);
    // 8. Fetch daily mission
    const missionRes = await pool.query('SELECT * FROM ge10_daily_missions WHERE user_id = $1', [userId]);
    // 9. Fetch custom questions
    const questionsRes = await pool.query('SELECT * FROM ge10_custom_questions WHERE user_id = $1', [userId]);
    const bossBountiesVnd = await loadBossBounties();

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
      gameSettings: {
        bossBountiesVnd
      },
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

// POST /api/ai/ingest: Uses Gemini API to parse raw text into structured grade 10 questions (English or Math)
app.post('/api/ai/ingest', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { rawText, subject = 'english' } = req.body;
  if (!rawText) return res.status(400).json({ error: 'Missing rawText.' });

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey || geminiKey.includes('AIzaSy') || geminiKey.includes('sk-')) {
      return res.status(400).json({ error: 'Gemini API Key is not configured or is a placeholder.' });
    }

    let prompt = '';
    if (subject === 'math') {
      prompt = `Bạn là một chuyên gia ôn thi môn Toán lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi luyện thi trắc nghiệm theo đúng cấu trúc đề tuyển sinh môn Toán lớp 10 của Sở GD&ĐT TP.HCM. Các chủ đề bao gồm:
      - "parabol-line": Hàm số đồ thị Parabol và đường thẳng y = ax+b.
      - "viet-relation": Hệ thức Vi-ét và phương trình bậc hai.
      - "real-equations": Giải toán bằng cách lập hệ phương trình hoặc phương trình thực tế.
      - "real-geometry": Hình học không gian thực tế (thể tích/diện tích lon nước, phễu nón, quả cầu).
      - "real-finance": Toán thực tế tài chính (lãi suất ngân hàng, khuyến mãi giảm giá, phần trưng).
      - "plane-geometry": Hình học phẳng (tứ giác nội tiếp, tiếp tuyến đường tròn, tam giác đồng dạng).
      
      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq",
          "category": "parabol-line" | "viet-relation" | "real-equations" | "real-geometry" | "real-finance" | "plane-geometry",
          "prompt": "Đề bài câu hỏi (sử dụng ký hiệu toán học dễ đọc như x^2, x_1, x_2, căn(x), phân số dạng a/b)...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Lựa chọn chính xác, khớp với 1 trong các tùy chọn trong options",
          "explanation": "Giải thích chi tiết các bước tính toán và lời giải từng bước...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Math"
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else if (subject === 'literature') {
      prompt = `Bạn là một chuyên gia ôn thi môn Ngữ văn lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi trắc nghiệm theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM môn Ngữ văn. Các chủ đề bao gồm:
      - "literature-reading-poetry": Đọc hiểu tác phẩm thơ.
      - "literature-reading-prose": Đọc hiểu tác phẩm truyện, kí, tản văn.
      - "literature-reading-argument": Đọc hiểu văn bản nghị luận xã hội hoặc văn bản thông tin (biểu đồ, số liệu).
      - "literature-vietnamese": Tiếng Việt thực hành (các biện pháp tu từ như ẩn dụ, hoán dụ, điệp từ; nghĩa tường minh/hàm ý; thành ngữ; liên kết câu).
      - "literature-writing": Kỹ năng làm văn nghị luận xã hội và nghị luận văn học.
      
      Lưu ý đặc biệt đối với đọc hiểu văn bản:
      Nếu câu hỏi có đi kèm một văn bản đọc hiểu (đoạn trích thơ/văn), hãy đặt văn bản đọc hiểu đó ở đầu thuộc tính "prompt" theo mẫu định dạng:
      "**Đọc đoạn trích sau và trả lời câu hỏi:**\\n[Đoạn văn bản trích dẫn]\\n\\n[Câu hỏi cụ thể...]"
      
      Trả về kết quả duy nhất là một mảng JSON các đối tượng theo schema sau, không kèm theo markdown hay phần giải thích ngoài JSON:
      [
        {
          "id": "chuỗi ngẫu nhiên duy nhất",
          "type": "mcq",
          "category": "literature-reading-poetry" | "literature-reading-prose" | "literature-reading-argument" | "literature-vietnamese" | "literature-writing",
          "prompt": "Đề bài câu hỏi (kèm đoạn văn bản trích dẫn nếu có)...",
          "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
          "correctAnswer": "Lựa chọn chính xác, khớp với 1 trong các tùy chọn trong options",
          "explanation": "Giải thích chi tiết tại sao chọn đáp án đó...",
          "difficulty": số từ 1 đến 10,
          "source": "AI Ingested Literature"
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    } else {
      prompt = `Bạn là một chuyên gia ôn thi tiếng Anh lớp 10 TP.HCM. Hãy phân tích đoạn văn bản sau đây và trích xuất/tạo ra các câu hỏi luyện thi theo đúng cấu trúc đề tuyển sinh lớp 10 TP.HCM (MCQ, Word Form, Rewrite, Cloze).
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
          "source": "AI Ingested English"
        }
      ]

      Văn bản cần phân tích:
      ${rawText}`;
    }

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
        `INSERT INTO ge10_custom_questions (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO NOTHING`,
        [
          q.id || `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId,
          q.type || 'mcq',
          q.category,
          q.prompt,
          q.options || null,
          Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer],
          q.explanation || '',
          q.difficulty || 5,
          q.source || (subject === 'math' ? 'AI Ingested Math' : 'AI Ingested English'),
          subject
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

// POST /api/admin/approve-reward: Approves a student's pending reward, adding cash to their wallet
app.post('/api/admin/approve-reward', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId, rewardId } = req.body;
    if (!studentUserId || !rewardId) {
      return res.status(400).json({ error: 'Missing studentUserId or rewardId.' });
    }

    // Check if the reward exists and is pending
    const rewardRes = await pool.query(
      'SELECT title, cash_value_vnd FROM ge10_parent_rewards WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [rewardId, studentUserId]
    );

    if (rewardRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending reward not found.' });
    }

    const { title, cash_value_vnd } = rewardRes.rows[0];

    // Begin Transaction to ensure atomic update
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update reward status
      await client.query(
        'UPDATE ge10_parent_rewards SET status = \'approved\' WHERE id = $1 AND user_id = $2',
        [rewardId, studentUserId]
      );

      // Increase wallet balance
      await client.query(
        'UPDATE ge10_player_profiles SET wallet_vnd = wallet_vnd + $1 WHERE user_id = $2',
        [cash_value_vnd, studentUserId]
      );

      // Log activity
      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'energy_refill',
          `Ví thưởng +${cash_value_vnd.toLocaleString()}đ`,
          `Ba mẹ đã duyệt đổi phần quà: ${title}`,
          0,
          0,
          cash_value_vnd
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
    console.error('Error approving reward:', error.message);
    res.status(500).json({ error: 'Failed to approve reward.' });
  }
});

// POST /api/admin/reject-reward: Rejects a student's pending reward, refunding their coins
app.post('/api/admin/reject-reward', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId, rewardId } = req.body;
    if (!studentUserId || !rewardId) {
      return res.status(400).json({ error: 'Missing studentUserId or rewardId.' });
    }

    // Check if the reward exists and is pending
    const rewardRes = await pool.query(
      'SELECT title, cost_coins FROM ge10_parent_rewards WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [rewardId, studentUserId]
    );

    if (rewardRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending reward not found.' });
    }

    const { title, cost_coins } = rewardRes.rows[0];

    // Begin Transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update reward status
      await client.query(
        'UPDATE ge10_parent_rewards SET status = \'rejected\' WHERE id = $1 AND user_id = $2',
        [rewardId, studentUserId]
      );

      // Refund coins
      await client.query(
        'UPDATE ge10_player_profiles SET coins = coins + $1 WHERE user_id = $2',
        [cost_coins, studentUserId]
      );

      // Log activity
      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'energy_refill',
          `Hoàn trả +${cost_coins} NP`,
          `Ba mẹ từ chối phần quà: ${title}. Hoàn lại xu.`,
          cost_coins,
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
    console.error('Error rejecting reward:', error.message);
    res.status(500).json({ error: 'Failed to reject reward.' });
  }
});

// POST /api/admin/deduct-wallet: Deducts cash from a student's virtual wallet when parent pays out real cash
app.post('/api/admin/deduct-wallet', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { studentUserId, amount } = req.body;
    if (!studentUserId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid parameters: studentUserId or amount.' });
    }

    const currentRes = await pool.query('SELECT wallet_vnd FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    if (currentRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    const currentWallet = currentRes.rows[0].wallet_vnd;
    if (currentWallet < amount) {
      return res.status(400).json({ error: `Số tiền khấu trừ (${amount.toLocaleString()}đ) vượt quá số dư hiện có (${currentWallet.toLocaleString()}đ)!` });
    }

    await pool.query(
      'UPDATE ge10_player_profiles SET wallet_vnd = wallet_vnd - $1 WHERE user_id = $2',
      [amount, studentUserId]
    );

    // Log the pocket money payout log
    const logId = `log-deduct-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await pool.query(
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        logId,
        studentUserId,
        Date.now(),
        'reward',
        'Rút tiền mặt / Khấu trừ Ví',
        `Ba Mẹ đã thanh toán ${amount.toLocaleString()}đ tiền mặt và khấu trừ vào Ví Thưởng.`,
        0,
        0,
        -amount
      ]
    );

    res.json({ success: true, newBalance: currentWallet - amount });
  } catch (error: any) {
    console.error('Error deducting wallet:', error.message);
    res.status(500).json({ error: 'Failed to deduct wallet.' });
  }
});

// POST /api/admin/refill-energy: Sets a student's energy to a percentage of the max when parent clicks "⚡ Nạp Năng Lượng"
app.post('/api/admin/refill-energy', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
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
    let targetEnergy = PLAYER_ENERGY_MAX;
    if (Number.isFinite(rawPercent)) {
      const clampedPercent = Math.max(0, Math.min(100, rawPercent));
      targetEnergy = Math.round((PLAYER_ENERGY_MAX * clampedPercent) / 100);
    } else if (Number.isFinite(rawEnergyValue)) {
      targetEnergy = Math.max(0, Math.min(PLAYER_ENERGY_MAX, Math.round(rawEnergyValue)));
    }

    await pool.query(
      'UPDATE ge10_player_profiles SET energy = $2 WHERE user_id = $1',
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
        `Ba Mẹ đã cập nhật năng lượng cho bé lên ${targetEnergy}/${PLAYER_ENERGY_MAX} (${Math.round((targetEnergy / PLAYER_ENERGY_MAX) * 100)}%).`,
        0,
        0,
        0
      ]
    );

    res.json({ success: true, energy: targetEnergy, maxEnergy: PLAYER_ENERGY_MAX });
  } catch (error: any) {
    console.error('Error refilling energy:', error.message);
    res.status(500).json({ error: 'Failed to refill energy.' });
  }
});

// PUT /api/admin/game-settings: Updates global boss bounty amounts
app.put('/api/admin/game-settings', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { bossBountiesVnd } = req.body || {};
    if (!Array.isArray(bossBountiesVnd) || bossBountiesVnd.length !== 3) {
      return res.status(400).json({ error: 'Invalid parameters: bossBountiesVnd must contain 3 values.' });
    }

    const normalized = bossBountiesVnd.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number];
    if (normalized.some(v => !Number.isFinite(v))) {
      return res.status(400).json({ error: 'Invalid boss bounty values.' });
    }

    await saveBossBounties(normalized);
    res.json({ success: true, bossBountiesVnd: normalized });
  } catch (error: any) {
    console.error('Error updating boss bounties:', error.message);
    res.status(500).json({ error: 'Failed to update boss bounties.' });
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

app.listen(PORT, () => {
  console.log(`CyberEnglish API Server booting on port ${PORT}...`);
});

export default app;
