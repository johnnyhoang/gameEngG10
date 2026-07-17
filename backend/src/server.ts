import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import { SEED_LESSONS } from './lessonsData.js';

// Routers
import profilesRouter from './routes/profiles.js';
import questionsRouter from './routes/questions.js';
import classLinksRouter from './routes/classLinks.js';
import aiRouter from './routes/ai.js';
import adminRouter from './routes/admin.js';
import economyRouter from './routes/economy.js';
import riddleRouter from './routes/riddle.js';
import gameRouter from './routes/game.js';
import classRewardsRouter from './routes/classRewards.js';
import learningContextRouter from './routes/learningContext.js';
import missionLedgerRouter from './routes/missionLedger.js';
import { ensureDefaultClassRewards } from './helpers/questions.js';
import { seedTopicsAndActivities } from './helpers/seedTopicsAndActivities.js';

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
    const rubyMigrationPath = path.join(__dirname, '..', 'migrations', '20260713_ruby_currency.sql');
    if (fs.existsSync(rubyMigrationPath)) {
      await pool.query(fs.readFileSync(rubyMigrationPath, 'utf8'));
    } else {
      throw new Error(`Missing required Ruby migration: ${rubyMigrationPath}`);
    }
    const learningContextMigrationPath = path.join(__dirname, '..', 'migrations', '20260713_learning_context.sql');
    if (fs.existsSync(learningContextMigrationPath)) {
      await pool.query(fs.readFileSync(learningContextMigrationPath, 'utf8'));
    } else {
      throw new Error(`Missing required LearningContext migration: ${learningContextMigrationPath}`);
    }
    const canonicalContentPayloadPath = path.join(__dirname, '..', 'migrations', '20260713_canonical_content_payload.sql');
    if (fs.existsSync(canonicalContentPayloadPath)) {
      await pool.query(fs.readFileSync(canonicalContentPayloadPath, 'utf8'));
    } else {
      throw new Error(`Missing required canonical content migration: ${canonicalContentPayloadPath}`);
    }
    const canonicalContentSeedPath = path.join(__dirname, '..', 'migrations', '20260713_seed_canonical_learning_content.sql');
    if (fs.existsSync(canonicalContentSeedPath)) {
      await pool.query(fs.readFileSync(canonicalContentSeedPath, 'utf8'));
    } else {
      throw new Error(`Missing required canonical content seed: ${canonicalContentSeedPath}`);
    }
    const dataApiHardeningPath = path.join(__dirname, '..', 'migrations', '20260713_harden_ge10_data_api.sql');
    if (fs.existsSync(dataApiHardeningPath)) {
      await pool.query(fs.readFileSync(dataApiHardeningPath, 'utf8'));
    } else {
      throw new Error(`Missing required Data API hardening migration: ${dataApiHardeningPath}`);
    }
    const profileIdentityPath = path.join(__dirname, '..', 'migrations', '20260713_isolate_profile_identity.sql');
    if (fs.existsSync(profileIdentityPath)) {
      await pool.query(fs.readFileSync(profileIdentityPath, 'utf8'));
    } else {
      throw new Error(`Missing required profile identity migration: ${profileIdentityPath}`);
    }
    const removeProfilePinPath = path.join(__dirname, '..', 'migrations', '20260713_remove_profile_pin.sql');
    if (fs.existsSync(removeProfilePinPath)) {
      await pool.query(fs.readFileSync(removeProfilePinPath, 'utf8'));
    } else {
      throw new Error(`Missing required profile PIN cleanup migration: ${removeProfilePinPath}`);
    }
    const normalizePetNamePath = path.join(__dirname, '..', 'migrations', '20260713_normalize_legacy_pet_name.sql');
    if (fs.existsSync(normalizePetNamePath)) {
      await pool.query(fs.readFileSync(normalizePetNamePath, 'utf8'));
    } else {
      throw new Error(`Missing required pet name normalization migration: ${normalizePetNamePath}`);
    }
    const riddleHistoryPath = path.join(__dirname, '..', 'migrations', '20260713_generalize_riddle_history.sql');
    if (fs.existsSync(riddleHistoryPath)) {
      await pool.query(fs.readFileSync(riddleHistoryPath, 'utf8'));
    } else {
      throw new Error(`Missing required riddle history migration: ${riddleHistoryPath}`);
    }
    const missionLedgerPath = path.join(__dirname, '..', 'migrations', '20260713_mission_ledger.sql');
    if (fs.existsSync(missionLedgerPath)) {
      await pool.query(fs.readFileSync(missionLedgerPath, 'utf8'));
    } else {
      throw new Error(`Missing required mission ledger migration: ${missionLedgerPath}`);
    }
    const renameFamilyToClassPath = path.join(__dirname, '..', 'migrations', '20260714_rename_family_to_class.sql');
    if (fs.existsSync(renameFamilyToClassPath)) {
      await pool.query(fs.readFileSync(renameFamilyToClassPath, 'utf8'));
    } else {
      throw new Error(`Missing required rename family to class migration: ${renameFamilyToClassPath}`);
    }
    const renameParentToTutorPath = path.join(__dirname, '..', 'migrations', '20260716_rename_parent_to_tutor.sql');
    if (fs.existsSync(renameParentToTutorPath)) {
      await pool.query(fs.readFileSync(renameParentToTutorPath, 'utf8'));
    } else {
      throw new Error(`Missing required rename parent to tutor migration: ${renameParentToTutorPath}`);
    }
    const schoolRewardTemplatesPath = path.join(__dirname, '..', 'migrations', '20260717_school_reward_templates.sql');
    if (fs.existsSync(schoolRewardTemplatesPath)) {
      await pool.query(fs.readFileSync(schoolRewardTemplatesPath, 'utf8'));
    } else {
      throw new Error(`Missing required school reward templates migration: ${schoolRewardTemplatesPath}`);
    }
    const gameSettingsAndChallengesPath = path.join(__dirname, '..', 'migrations', '20260717_seed_game_settings_and_challenges.sql');
    if (fs.existsSync(gameSettingsAndChallengesPath)) {
      await pool.query(fs.readFileSync(gameSettingsAndChallengesPath, 'utf8'));
    } else {
      throw new Error(`Missing required game settings and challenges seed migration: ${gameSettingsAndChallengesPath}`);
    }
    const preventDuplicateProfilesPath = path.join(__dirname, '..', 'migrations', '20260717_prevent_duplicate_profiles.sql');
    if (fs.existsSync(preventDuplicateProfilesPath)) {
      await pool.query(fs.readFileSync(preventDuplicateProfilesPath, 'utf8'));
    } else {
      throw new Error(`Missing required prevent duplicate profiles migration: ${preventDuplicateProfilesPath}`);
    }
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS subject VARCHAR(50) DEFAULT 'english';`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS image_url TEXT;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS is_confused BOOLEAN DEFAULT FALSE;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);`);
    await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMP DEFAULT NOW();`);
    await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS ui_theme VARCHAR(50) DEFAULT 'current';`);
    await pool.query(`ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS is_standard BOOLEAN DEFAULT FALSE;`);
    await pool.query(`ALTER TABLE ge10_lessons ALTER COLUMN grade_tier SET DEFAULT 9;`);
    await pool.query(`ALTER TABLE ge10_topics ALTER COLUMN grade_tier SET DEFAULT 9;`);
    await pool.query(`ALTER TABLE ge10_activities ALTER COLUMN grade_tier SET DEFAULT 9;`);

    // Seed lessons
    for (const lesson of SEED_LESSONS) {
      await pool.query(
        `INSERT INTO ge10_lessons (id, subject, topic, title, theory, category)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO NOTHING`,
        [lesson.id, lesson.subject, lesson.topic, lesson.title, lesson.theory, lesson.category]
      );
    }

    // Seed ngân hàng câu hỏi gốc (trước đây hardcode trong src/data/questions.ts phía frontend,
    // mỗi client tự trộn vào bộ nhớ) — nay là dữ liệu hệ thống thật trong DB (user_id = NULL),
    // trả về cho MỌI hồ sơ qua GET /api/profile/:id (WHERE user_id IS NULL đã có sẵn).
    const seedQuestionsPath = path.join(__dirname, 'questionsData.json');
    if (!fs.existsSync(seedQuestionsPath)) {
      throw new Error(`Missing required base question bank seed: ${seedQuestionsPath}`);
    }
    const seedQuestions: any[] = JSON.parse(fs.readFileSync(seedQuestionsPath, 'utf8'));
    const QUESTION_BATCH_SIZE = 500;
    for (let i = 0; i < seedQuestions.length; i += QUESTION_BATCH_SIZE) {
      const batch = seedQuestions.slice(i, i + QUESTION_BATCH_SIZE);
      const values: any[] = [];
      const placeholders: string[] = [];
      batch.forEach((q, idx) => {
        const o = idx * 13;
        placeholders.push(`($${o + 1}, $${o + 2}, $${o + 3}, $${o + 4}, $${o + 5}, $${o + 6}, $${o + 7}, $${o + 8}, $${o + 9}, $${o + 10}, $${o + 11}, $${o + 12}, $${o + 13})`);
        values.push(
          q.id, q.type, q.category, q.topicId, q.prompt, q.options, q.correctAnswer,
          q.explanation, q.difficulty, q.source, q.subject, q.gradeTier,
          q.metadata ? JSON.stringify(q.metadata) : null
        );
      });
      await pool.query(
        `INSERT INTO ge10_custom_questions
           (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
         VALUES ${placeholders.join(', ')}
         ON CONFLICT (id) DO NOTHING`,
        values
      );
    }

    // Auto-link existing questions to their lessons by category.
    await pool.query(
      `UPDATE ge10_custom_questions
       SET lesson_id = (SELECT id FROM ge10_lessons
         WHERE ge10_lessons.category = ge10_custom_questions.category
           AND ge10_lessons.grade_tier = ge10_custom_questions.grade_tier
           AND ge10_lessons.subject = ge10_custom_questions.subject
         LIMIT 1)
       WHERE lesson_id IS NULL`
    );

    // Seed data-driven Topics and Activities
    await seedTopicsAndActivities(pool);

    console.log('Database initialized and lessons seeded successfully.');
    
    // Migration: Seed default classroom rewards for all existing active teachers
    console.log('=== Khởi chạy migration Quà Khuyến Học cho Chủ Nhiệm ===');
    const teachersRes = await pool.query(
      `SELECT DISTINCT tutor_id FROM ge10_class_links 
       WHERE status = 'active' 
         AND tutor_id IN (SELECT id FROM ge10_users WHERE role IN ('tutor', 'secondary_tutor', 'truong_vien', 'pho_vien'))`
    );
    for (const row of teachersRes.rows) {
      await ensureDefaultClassRewards(row.tutor_id);
    }
    console.log(`=== Hoàn tất migration Quà Khuyến Học cho ${teachersRes.rows.length} Chủ Nhiệm ===`);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// initDB();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Register routes
app.use('/api', profilesRouter);
app.use('/api', questionsRouter);
app.use('/api', classLinksRouter);
app.use('/api', aiRouter);
app.use('/api', adminRouter);
app.use('/api', economyRouter);
app.use('/api', riddleRouter);
app.use('/api', gameRouter);
app.use('/api', classRewardsRouter);
app.use('/api', learningContextRouter);
app.use('/api', (req, res, next) => {
  if (req.url.startsWith('/mission-ledger') || req.url.startsWith('/mission-events')) {
    console.log(`[Debug] Routing mission ledger request: ${req.method} ${req.url}`);
  }
  next();
}, missionLedgerRouter);

// Error Handler Middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(`[${new Date().toISOString()}] Server Error:`, err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`CyberEnglish API Server booting on port ${PORT}...`);
  });
}

export default app;
// Trigger reload: 2026-07-14 11:21
