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
      `SELECT DISTINCT parent_id FROM ge10_class_links 
       WHERE status = 'active' 
         AND parent_id IN (SELECT id FROM ge10_users WHERE role IN ('parent', 'secondary_parent', 'truong_vien', 'pho_vien'))`
    );
    for (const row of teachersRes.rows) {
      await ensureDefaultClassRewards(row.parent_id);
    }
    console.log(`=== Hoàn tất migration Quà Khuyến Học cho ${teachersRes.rows.length} Chủ Nhiệm ===`);
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDB();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
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
app.use('/api', missionLedgerRouter);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`CyberEnglish API Server booting on port ${PORT}...`);
  });
}

export default app;
// Trigger reload: 2026-07-14 11:21
