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
    // Check topics
    const topicsRes = await client.query(
      `SELECT id, name, subject, grade_tier FROM ge10_topics WHERE grade_tier = 9 AND subject = 'math'`
    );
    console.log('--- Math Grade 9 Topics ---');
    console.log(topicsRes.rows);

    // Check activities
    const activitiesRes = await client.query(
      `SELECT a.id, a.title, a.activity_type, a.topic_id 
       FROM ge10_activities a
       JOIN ge10_topics t ON a.topic_id = t.id
       WHERE t.grade_tier = 9 AND t.subject = 'math'`
    );
    console.log('\n--- Math Grade 9 Activities ---');
    console.log(activitiesRes.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
