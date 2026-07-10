require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create ge10_coin_ledger table
    console.log("Creating ge10_coin_ledger...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS ge10_coin_ledger (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        reason VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create ge10_exploration_progress table
    console.log("Creating ge10_exploration_progress...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS ge10_exploration_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
        page_id VARCHAR(100) NOT NULL,
        clear_count INTEGER DEFAULT 0,
        last_cleared_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, page_id)
      );
    `);

    await client.query('COMMIT');
    console.log("Migration successful!");
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Migration failed:", error);
  } finally {
    client.release();
    pool.end();
  }
}

runMigration();
