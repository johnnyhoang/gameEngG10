import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    await pool.query('ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS times_opened INTEGER DEFAULT 0;');
    await pool.query('ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS times_completed INTEGER DEFAULT 0;');
    console.log('Success altering ge10_lessons');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}

run();
