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
      `SELECT q.id, q.prompt, q.category, q.subject, q.lesson_id, l.title as lesson_title
       FROM ge10_custom_questions q
       JOIN ge10_lessons l ON q.lesson_id = l.id
       WHERE q.grade_tier = 9 AND q.subject = 'math'
       ORDER BY q.lesson_id`
    );
    console.log(`--- Existing Math Grade 9 Question-Lesson Associations: ${res.rows.length} ---`);
    res.rows.forEach((r, idx) => {
      console.log(`\n${idx + 1}. Q_ID: ${r.id} | Lesson_ID: ${r.lesson_id}`);
      console.log(`   Lesson Title: "${r.lesson_title}"`);
      console.log(`   Q Prompt: "${r.prompt.substring(0, 150)}..."`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
