import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config();

async function clear() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    await client.query(`
      DELETE FROM schema_migrations 
      WHERE filename IN (
        '20260718_cs_database_data_lessons.sql', 
        '20260718_cs_robot_programming_lessons.sql'
      )
    `);
    console.log('Cleared targeted migration history rows from schema_migrations.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

clear();
