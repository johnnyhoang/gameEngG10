import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const res = await client.query(
      `SELECT subject, count(*) as count, 
              count(lesson_id) as with_lesson_id 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 
       GROUP BY subject`
    );
    console.log('--- Questions count per subject (Grade 9) ---');
    res.rows.forEach(r => {
      console.log(`Subject: ${r.subject} | Total: ${r.count} | With lesson_id: ${r.with_lesson_id}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
