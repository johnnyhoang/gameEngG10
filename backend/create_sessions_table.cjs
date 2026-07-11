const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS ge10_game_sessions (
          id VARCHAR(255) PRIMARY KEY,
          user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
          session_type VARCHAR(50) NOT NULL,
          subject VARCHAR(50) NOT NULL,
          difficulty_tier VARCHAR(50),
          questions_pool VARCHAR(255)[] NOT NULL,
          start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          end_time TIMESTAMP WITH TIME ZONE,
          status VARCHAR(20) DEFAULT 'active',
          answers_summary JSONB DEFAULT '[]'::jsonb,
          xp_gained INTEGER DEFAULT 0,
          coins_gained INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('Created ge10_game_sessions table successfully.');
  } catch (e) {
    console.error('Failed to create table', e);
  } finally {
    await pool.end();
  }
}

run();
