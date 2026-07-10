const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function migrate() {
  try {
    const res1 = await pool.query("UPDATE ge10_users SET role = 'truong_vien' WHERE role = 'admin'");
    console.log(`Updated ${res1.rowCount} admins to truong_vien`);
    
    const res2 = await pool.query("UPDATE ge10_users SET role = 'truong_vien' WHERE email = 'hoang.hoa@gmail.com'");
    console.log(`Updated hoang.hoa@gmail.com to truong_vien (affected: ${res2.rowCount})`);
    
  } catch (e) {
    console.error("Migration failed", e);
  } finally {
    await pool.end();
  }
}

migrate();
