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
      `SELECT id, lesson_id, prompt FROM ge10_custom_questions WHERE id = 'math-gatekeeper-topic-math-statistics'`
    );
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
