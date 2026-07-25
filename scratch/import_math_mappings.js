import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function importMappings() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    const rawData = fs.readFileSync('d:/Hoa Hoang/Apps/gameEngG10/scratch/math_questions_mapped.json', 'utf-8');
    const { mappings } = JSON.parse(rawData);
    console.log(`Đã đọc ${mappings.length} mappings từ file JSON.`);

    // Lấy thông tin các câu hỏi hiện tại trong DB
    const questionsRes = await client.query(
      `SELECT id, lesson_id, prompt FROM ge10_custom_questions WHERE grade_tier = 9 AND subject = 'math'`
    );
    const questionsMap = new Map(questionsRes.rows.map(q => [q.id, q]));

    const updates = [];
    mappings.forEach(m => {
      const q = questionsMap.get(m.id);
      if (q && q.lesson_id !== m.lesson_id) {
        updates.push(m);
        console.log(`- Sẽ cập nhật [${m.id}]: "${q.prompt.substring(0, 80).replace(/\n/g, ' ')}..."`);
        console.log(`  Cũ: ${q.lesson_id} => Mới: ${m.lesson_id}\n`);
      }
    });

    if (updates.length > 0) {
      console.log(`Đang tiến hành cập nhật ${updates.length} câu hỏi lên database...`);
      await client.query('BEGIN');
      for (const item of updates) {
        await client.query(
          `UPDATE ge10_custom_questions SET lesson_id = $1 WHERE id = $2`,
          [item.lesson_id, item.id]
        );
      }
      await client.query('COMMIT');
      console.log('Phân bổ dữ liệu câu hỏi môn Toán lớp 9 bằng AI Antigravity thành công 100%!');
    } else {
      console.log('Không có câu hỏi nào cần thay đổi (dữ liệu đã hoàn hảo và trùng khớp hoàn toàn).');
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lỗi khi import mappings:', err);
  } finally {
    await client.end();
  }
}

importMappings();
