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
      `SELECT DISTINCT subject FROM ge10_lessons WHERE grade_tier = 9`
    );
    console.log('--- Subjects in ge10_lessons (Grade 9) ---');
    console.log(res.rows);

    const res2 = await client.query(
      `SELECT DISTINCT subject FROM ge10_custom_questions WHERE grade_tier = 9`
    );
    console.log('\n--- Subjects in ge10_custom_questions (Grade 9) ---');
    console.log(res2.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
