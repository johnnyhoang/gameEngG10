import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config();

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const lessonsRes = await client.query('SELECT count(*) FROM ge10_lessons WHERE grade_tier = 13');
    const questionsRes = await client.query('SELECT count(*) FROM ge10_custom_questions WHERE grade_tier = 13');
    const topicsRes = await client.query('SELECT count(*) FROM ge10_topics WHERE grade_tier = 13');
    const activitiesRes = await client.query('SELECT count(*) FROM ge10_activities WHERE grade_tier = 13');
    
    console.log('--- Database Count for Grade 13 ---');
    console.log('Topics:', topicsRes.rows[0].count);
    console.log('Lessons:', lessonsRes.rows[0].count);
    console.log('Questions:', questionsRes.rows[0].count);
    console.log('Activities:', activitiesRes.rows[0].count);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
