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
      `SELECT count(*), 
              count(lesson_id) as with_lesson_id, 
              count(topic_id) as with_topic_id 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9`
    );
    console.log('--- Custom Questions Stats (Grade 9) ---');
    console.log('Total Questions:', res.rows[0].count);
    console.log('Questions with lesson_id:', res.rows[0].with_lesson_id);
    console.log('Questions with topic_id:', res.rows[0].with_topic_id);

    const sampleRes = await client.query(
      `SELECT id, category, topic_id, lesson_id, prompt 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 
       LIMIT 10`
    );
    console.log('\n--- Sample Questions (10 rows) ---');
    sampleRes.rows.forEach((r, idx) => {
      console.log(`${idx + 1}. ID: ${r.id} | TopicID: ${r.topic_id} | LessonID: ${r.lesson_id} | Cat: ${r.category} | Prompt: "${r.prompt.slice(0, 30)}..."`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
