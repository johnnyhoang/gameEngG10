import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: 'D:\\Hoa Hoang\\Apps\\gameEngG10\\backend\\.env' });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const OUT_DIR = 'C:\\Users\\HOA~1.HOA\\AppData\\Local\\Temp\\claude\\D--Hoa-Hoang-Apps-gameEngG10\\fdd68c69-89c1-4b20-b8b4-cd6f92c908b2\\scratchpad';

async function main() {
  const q = await pool.query(
    `SELECT id, type, category, prompt, options, correct_answer, explanation, subject, grade_tier
     FROM ge10_custom_questions ORDER BY subject, id`
  );
  fs.writeFileSync(path.join(OUT_DIR, 'questions.json'), JSON.stringify(q.rows, null, 0));
  console.log('questions:', q.rows.length);

  const l = await pool.query(
    `SELECT id, subject, grade_tier, topic, title, theory, category, examples, practice_points
     FROM ge10_lessons ORDER BY subject, id`
  );
  fs.writeFileSync(path.join(OUT_DIR, 'lessons.json'), JSON.stringify(l.rows, null, 0));
  console.log('lessons:', l.rows.length);

  const subjCount = await pool.query(`SELECT subject, COUNT(*) FROM ge10_custom_questions GROUP BY subject ORDER BY subject`);
  console.log('by subject:', JSON.stringify(subjCount.rows));

  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
