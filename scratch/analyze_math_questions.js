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
      `SELECT id, prompt, category, topic_id, lesson_id 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 AND subject = 'math'
       ORDER BY id`
    );
    console.log(`--- Total Math Grade 9 Questions: ${res.rows.length} ---`);
    res.rows.forEach((r, idx) => {
      console.log(`[${idx + 1}] ID: ${r.id} | Cat: ${r.category} | Current Lesson: ${r.lesson_id}`);
      console.log(`Prompt: ${r.prompt.replace(/\n/g, ' ').substring(0, 120)}...\n`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
