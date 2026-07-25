import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function exportQuestions() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const res = await client.query(
      `SELECT id, prompt, category, topic_id, lesson_id 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 AND subject = 'math'
       ORDER BY id`
    );
    fs.writeFileSync(
      'd:/Hoa Hoang/Apps/gameEngG10/scratch/math_questions_raw.json',
      JSON.stringify(res.rows, null, 2),
      'utf-8'
    );
    console.log(`Đã xuất ${res.rows.length} câu hỏi ra scratch/math_questions_raw.json`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

exportQuestions();
