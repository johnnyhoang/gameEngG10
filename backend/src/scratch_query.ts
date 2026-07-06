import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    const res = await pool.query('SELECT id, name, email, role FROM ge10_users');
    console.log('Users in DB:');
    console.log(res.rows);
    
    const questionsRes = await pool.query('SELECT COUNT(*), subject FROM ge10_custom_questions GROUP BY subject');
    console.log('Questions count in DB by subject:');
    console.log(questionsRes.rows);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

main();
