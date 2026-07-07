import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

interface DBQuestion {
  id: string;
  type: string;
  category: string;
  prompt: string;
  options: string[] | null;
  correct_answer: string[];
  explanation: string;
  difficulty: number;
  source: string;
  subject: string;
}

async function main() {
  console.log('Bắt đầu kết nối cơ sở dữ liệu...');
  try {
    // Check connection first
    const testRes = await pool.query('SELECT NOW()');
    console.log('Kết nối thành công. Thời gian hiện tại trong DB:', testRes.rows[0].now);

    const jsonPath = 'C:\\Users\\hoa.hoang\\.gemini\\antigravity\\brain\\8586ba33-735d-45de-a5bb-39c60973f816\\scratch\\parsed_questions.json';
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Không tìm thấy file câu hỏi tại: ${jsonPath}`);
    }

    const questions: DBQuestion[] = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`Đang nạp ${questions.length} câu hỏi mới vào bảng ge10_custom_questions...`);
    
    let successCount = 0;
    for (const q of questions) {
      await pool.query(
        `INSERT INTO ge10_custom_questions 
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           type = EXCLUDED.type,
           category = EXCLUDED.category,
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           difficulty = EXCLUDED.difficulty,
           source = EXCLUDED.source,
           subject = EXCLUDED.subject`,
        [
          q.id,
          q.type,
          q.category,
          q.prompt,
          q.options,
          q.correct_answer,
          q.explanation,
          q.difficulty,
          q.source,
          q.subject
        ]
      );
      successCount++;
    }

    console.log(`Hoàn tất nạp câu hỏi thành công! Đã nạp: ${successCount}/${questions.length} câu hỏi.`);
    
    const countRes = await pool.query("SELECT COUNT(*), source FROM ge10_custom_questions WHERE id LIKE 'mock-2025-de%' OR id LIKE 'hcmc-2024%' GROUP BY source");
    console.log('Thống kê số lượng câu hỏi mới nạp trong DB theo nguồn:');
    console.log(countRes.rows);
  } catch (error) {
    console.error('Lỗi khi nạp câu hỏi vào cơ sở dữ liệu:', error);
  } finally {
    await pool.end();
    console.log('Đã đóng kết nối cơ sở dữ liệu.');
  }
}

main();
