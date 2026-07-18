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
        '20260718_cs_networking_security_lessons.sql',
        '20260718_cs_networking_security_questions.sql',
        '20260718_cs_networking_security_integration.sql',
        '20260718_cs_artificial_intelligence_lessons.sql',
        '20260718_cs_artificial_intelligence_questions.sql',
        '20260718_cs_artificial_intelligence_integration.sql',
        '20260718_cs_software_engineering_lessons.sql',
        '20260718_cs_software_engineering_questions.sql',
        '20260718_cs_software_engineering_integration.sql'
      )
    `);
    console.log('Cleared targeted migrations history rows for final subjects.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

clear();
