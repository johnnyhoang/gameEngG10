import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    // 1. Kiểm tra trước khi cập nhật
    const lessonsRes = await client.query(
      `SELECT count(*) FROM ge10_lessons WHERE subject = 'art'`
    );
    const mappingsRes = await client.query(
      `SELECT count(*) FROM ge10_textbook_mappings WHERE subject = 'art'`
    );
    
    console.log('--- Trước khi di trú ---');
    console.log(`Lessons có subject = 'art': ${lessonsRes.rows[0].count}`);
    console.log(`Textbook Mappings có subject = 'art': ${mappingsRes.rows[0].count}`);
    
    // 2. Chạy UPDATE
    if (parseInt(lessonsRes.rows[0].count) > 0) {
      const upLessons = await client.query(
        `UPDATE ge10_lessons SET subject = 'arts' WHERE subject = 'art'`
      );
      console.log(`Đã cập nhật ${upLessons.rowCount} bài học trong ge10_lessons thành 'arts'.`);
    }
    
    if (parseInt(mappingsRes.rows[0].count) > 0) {
      const upMappings = await client.query(
        `UPDATE ge10_textbook_mappings SET subject = 'arts' WHERE subject = 'art'`
      );
      console.log(`Đã cập nhật ${upMappings.rowCount} mappings trong ge10_textbook_mappings thành 'arts'.`);
    }
    
    // 3. Kiểm tra lại
    const lessonsAfter = await client.query(
      `SELECT count(*) FROM ge10_lessons WHERE subject = 'art'`
    );
    const mappingsAfter = await client.query(
      `SELECT count(*) FROM ge10_textbook_mappings WHERE subject = 'art'`
    );
    console.log('\n--- Sau khi di trú ---');
    console.log(`Lessons có subject = 'art': ${lessonsAfter.rows[0].count}`);
    console.log(`Textbook Mappings có subject = 'art': ${mappingsAfter.rows[0].count}`);
  } catch (err) {
    console.error('Lỗi khi chạy di trú:', err);
  } finally {
    await client.end();
  }
}

migrate();
