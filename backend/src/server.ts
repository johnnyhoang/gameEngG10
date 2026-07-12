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
import familyRouter from './routes/family.js';
import aiRouter from './routes/ai.js';
import adminRouter from './routes/admin.js';
import economyRouter from './routes/economy.js';
import gatekeeperRouter from './routes/gatekeeper.js';
import gameRouter from './routes/game.js';
import classRewardsRouter from './routes/classRewards.js';
import { adaptLegacyProfiles } from './helpers/profileAdapter.js';

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
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS subject VARCHAR(50) DEFAULT 'english';`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS image_url TEXT;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS is_confused BOOLEAN DEFAULT FALSE;`);
    await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);`);
    await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMP DEFAULT NOW();`);
    await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS ui_theme VARCHAR(50) DEFAULT 'current';`);
    await pool.query(`ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS is_standard BOOLEAN DEFAULT FALSE;`);

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

    // Auto-link existing questions to their lessons by category.
    await pool.query(
      `UPDATE ge10_custom_questions
       SET lesson_id = (SELECT id FROM ge10_lessons WHERE ge10_lessons.category = ge10_custom_questions.category LIMIT 1)
       WHERE lesson_id IS NULL`
    );

    console.log('Database initialized and lessons seeded successfully.');
    
    // Tự động thích ứng và phân tách các profile cũ chứa dữ liệu chéo
    await adaptLegacyProfiles();
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
app.use('/api', familyRouter);
app.use('/api', aiRouter);
app.use('/api', adminRouter);
app.use('/api', economyRouter);
app.use('/api', gatekeeperRouter);
app.use('/api', gameRouter);
app.use('/api', classRewardsRouter);

app.listen(PORT, () => {
  console.log(`CyberEnglish API Server booting on port ${PORT}...`);
});

export default app;
