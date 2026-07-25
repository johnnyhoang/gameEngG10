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
      `SELECT * FROM ge10_lessons LIMIT 1`
    );
    console.log('--- Columns in ge10_lessons ---');
    console.log(Object.keys(res.rows[0]));
    
    // In ra 5 dòng đầu môn toán xem
    const mathRes = await client.query(
      `SELECT id, title, topic_id, category FROM ge10_lessons WHERE grade_tier = 9 AND subject = 'math' LIMIT 5`
    );
    console.log('\n--- Sample Math lessons ---');
    console.log(mathRes.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
