// migrate_class_rewards.cjs
// Run: node migrate_class_rewards.cjs
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS ge10_class_rewards (
        id           VARCHAR(255) PRIMARY KEY,
        teacher_id   VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
        title        VARCHAR(500) NOT NULL,
        cost_coins   INTEGER NOT NULL DEFAULT 200,
        quantity     INTEGER NOT NULL DEFAULT 5,
        remaining    INTEGER NOT NULL DEFAULT 5,
        created_at   BIGINT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS ge10_class_reward_redemptions (
        id              VARCHAR(255) PRIMARY KEY,
        class_reward_id VARCHAR(255) NOT NULL REFERENCES ge10_class_rewards(id) ON DELETE CASCADE,
        student_id      VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
        reward_title    VARCHAR(500) NOT NULL,
        cost_coins      INTEGER NOT NULL,
        status          VARCHAR(50) NOT NULL DEFAULT 'pending',
        requested_at    BIGINT NOT NULL,
        delivered_at    BIGINT
      );
    `);

    await client.query(`CREATE INDEX IF NOT EXISTS idx_ge10_class_rewards_teacher ON ge10_class_rewards(teacher_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_ge10_crr_student ON ge10_class_reward_redemptions(student_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_ge10_crr_reward ON ge10_class_reward_redemptions(class_reward_id);`);

    await client.query('COMMIT');
    console.log('✅ Migration completed: ge10_class_rewards + ge10_class_reward_redemptions created.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
