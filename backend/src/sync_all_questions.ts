import { pool } from './db.js';
import { INITIAL_QUESTIONS } from '../../src/data/questions.js';

async function main() {
  console.log('Bắt đầu đồng bộ ngân hàng câu hỏi từ src/data/questions.ts...');
  try {
    const testRes = await pool.query('SELECT NOW()');
    console.log('Kết nối Postgres thành công. Giờ hiện tại DB:', testRes.rows[0].now);

    console.log(`Đang đồng bộ ${INITIAL_QUESTIONS.length} câu hỏi vào ge10_custom_questions...`);

    let successCount = 0;
    for (const q of INITIAL_QUESTIONS) {
      // In ge10_custom_questions, correct_answer is text[] (ARRAY of text).
      const correct_answer = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
      
      await pool.query(
        `INSERT INTO ge10_custom_questions 
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, metadata)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           type = EXCLUDED.type,
           category = EXCLUDED.category,
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           difficulty = EXCLUDED.difficulty,
           source = EXCLUDED.source,
           subject = EXCLUDED.subject,
           metadata = EXCLUDED.metadata`,
        [
          q.id,
          q.type,
          q.category,
          q.prompt,
          q.options || null,
          correct_answer,
          q.explanation,
          q.difficulty,
          q.source,
          q.subject || 'english',
          q.metadata ? JSON.stringify(q.metadata) : null
        ]
      );
      successCount++;
    }

    console.log(`Đồng bộ hoàn tất! Đã cập nhật ${successCount}/${INITIAL_QUESTIONS.length} câu hỏi.`);

    const countRes = await pool.query('SELECT COUNT(*), subject FROM ge10_custom_questions GROUP BY subject');
    console.log('Thống kê số lượng câu hỏi trong DB sau đồng bộ:');
    console.log(countRes.rows);
  } catch (error) {
    console.error('Lỗi khi đồng bộ câu hỏi:', error);
  } finally {
    await pool.end();
    console.log('Đã đóng kết nối cơ sở dữ liệu.');
  }
}

main();
