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
        '20260718_cs_algorithms_structures_questions.sql', 
        '20260718_cs_algorithms_structures_integration.sql'
      )
    `);
    console.log('Cleared targeted Algorithms migration history rows.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

clear();
