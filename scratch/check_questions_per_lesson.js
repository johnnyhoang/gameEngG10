import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    // 1. Lấy danh sách các bài học môn toán lớp 9
    const lessonsRes = await client.query(
      `SELECT id, title FROM ge10_lessons WHERE grade_tier = 9 AND subject = 'math' ORDER BY id`
    );
    const lessons = lessonsRes.rows;

    // 2. Lấy số lượng câu hỏi thực tế của mỗi bài học
    const countsRes = await client.query(
      `SELECT lesson_id, COUNT(*) as q_count 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 AND subject = 'math'
       GROUP BY lesson_id`
    );
    const countsMap = new Map(countsRes.rows.map(r => [r.lesson_id, Number(r.q_count)]));

    // 3. Tính cả số lượng câu hỏi có lesson_id = null
    const nullRes = await client.query(
      `SELECT COUNT(*) as q_count 
       FROM ge10_custom_questions 
       WHERE grade_tier = 9 AND subject = 'math' AND lesson_id IS NULL`
    );
    const nullCount = Number(nullRes.rows[0].q_count);

    console.log('Thống kê số lượng câu hỏi của từng bài học Toán lớp 9:');
    let totalMapped = 0;
    lessons.forEach((l, idx) => {
      const count = countsMap.get(l.id) || 0;
      totalMapped += count;
      console.log(`[${idx + 1}] ${l.id.padEnd(30)} | Qs: ${count.toString().padEnd(2)} | Title: "${l.title}"`);
    });

    console.log(`\nTổng số câu đã map: ${totalMapped}`);
    console.log(`Tổng số câu chưa map (null): ${nullCount}`);
    console.log(`Tổng cộng: ${totalMapped + nullCount}`);

  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
