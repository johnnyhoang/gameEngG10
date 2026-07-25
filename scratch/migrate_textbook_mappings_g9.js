import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

const mappings = [
  // --- MATH (22 bài) ---
  { key: 'math-eq-product', subject: 'math', loai: 'Đại số', bai: 4, ham: 'thach' },
  { key: 'math-eq-rational', subject: 'math', loai: 'Đại số', bai: 4, ham: 'thach' },
  { key: 'math-system-eq-1', subject: 'math', loai: 'Đại số', bai: 2, ham: 'thach' },
  { key: 'math-system-eq-2', subject: 'math', loai: 'Đại số', bai: 2, ham: 'thach' },
  { key: 'math-word-problem-1', subject: 'math', loai: 'Đại số', bai: 3, ham: 'thach' },
  { key: 'math-quadratic-formula', subject: 'math', loai: 'Đại số', bai: 19, ham: 'thach' },
  { key: 'math-quadratic-discriminant', subject: 'math', loai: 'Đại số', bai: 19, ham: 'thach' },
  { key: 'math-quadratic-applied', subject: 'math', loai: 'Đại số', bai: 21, ham: 'thach' },
  { key: 'math-word-problem-2', subject: 'math', loai: 'Đại số', bai: 21, ham: 'thach' },
  { key: 'math-trig-ratio', subject: 'math', loai: 'Hình học và Đo lường', bai: 11, ham: 'hoa' },
  { key: 'math-trig-relations', subject: 'math', loai: 'Hình học và Đo lường', bai: 11, ham: 'hoa' },
  { key: 'math-right-triangle-ratio', subject: 'math', loai: 'Hình học và Đo lường', bai: 12, ham: 'hoa' },
  { key: 'math-right-triangle-ratio-2', subject: 'math', loai: 'Hình học và Đo lường', bai: 12, ham: 'hoa' },
  { key: 'math-trig-applied-1', subject: 'math', loai: 'Hình học và Đo lường', bai: 12, ham: 'hoa' },
  { key: 'math-trig-applied-2', subject: 'math', loai: 'Hình học và Đo lường', bai: 12, ham: 'hoa' },
  { key: 'math-circle-tangent-1', subject: 'math', loai: 'Hình học và Đo lường', bai: 16, ham: 'hoa' },
  { key: 'math-circle-tangent-2', subject: 'math', loai: 'Hình học và Đo lường', bai: 16, ham: 'hoa' },
  { key: 'math-cylinder-detail', subject: 'math', loai: 'Hình học và Đo lường', bai: 31, ham: 'hoa' },
  { key: 'math-cone-detail', subject: 'math', loai: 'Hình học và Đo lường', bai: 32, ham: 'hoa' },
  { key: 'math-cone-sphere-combined', subject: 'math', loai: 'Hình học và Đo lường', bai: 33, ham: 'hoa' },
  { key: 'math-space-geom', subject: 'math', loai: 'Hình học và Đo lường', bai: 33, ham: 'hoa' },
  { key: 'math-finance', subject: 'math', loai: 'Ngoài sách giáo khoa', bai: 34, ham: 'bang' },

  // --- LITERATURE (29 bài) ---
  { key: 'lit-truyen-truyen-ky-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 1, ham: 'bang' },
  { key: 'lit-truyen-truyen-ky-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 1, ham: 'bang' },
  { key: 'lit-modern-conflict-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 2, ham: 'bang' },
  { key: 'lit-modern-story-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 2, ham: 'bang' },
  { key: 'lit-prose', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 2, ham: 'bang' },
  { key: 'lit-write-nlvh-2', subject: 'literature', loai: 'Nghị luận văn học', bai: 2, ham: 'hoa' },
  { key: 'lit-grammar-expand-1', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-grammar-expand-2', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-grammar-isolated-2', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-vietnamese', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-vocab-context-1', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-rhetoric-advanced-1', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-rhetoric-advanced-2', subject: 'literature', loai: 'Tiếng Việt', bai: 3, ham: 'thach' },
  { key: 'lit-nlvh-doc-hieu-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 4, ham: 'bang' },
  { key: 'lit-nlvh-doc-hieu-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 4, ham: 'bang' },
  { key: 'lit-write-nlvh-1', subject: 'literature', loai: 'Nghị luận văn học', bai: 4, ham: 'hoa' },
  { key: 'lit-drama-conflict-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 5, ham: 'bang' },
  { key: 'lit-drama-conflict-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 5, ham: 'bang' },
  { key: 'lit-modern-conflict-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 5, ham: 'bang' },
  { key: 'lit-poem-rhythm-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 7, ham: 'bang' },
  { key: 'lit-poem-rhythm-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 7, ham: 'bang' },
  { key: 'lit-poetry', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 7, ham: 'bang' },
  { key: 'lit-nlxh-doc-hieu-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 8, ham: 'bang' },
  { key: 'lit-nlxh-doc-hieu-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 8, ham: 'bang' },
  { key: 'lit-write-nlxh-2', subject: 'literature', loai: 'Nghị luận xã hội', bai: 8, ham: 'phong' },
  { key: 'lit-writing', subject: 'literature', loai: 'Nghị luận xã hội', bai: 8, ham: 'phong' },
  { key: 'lit-truyen-tho-nom-1', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 10, ham: 'bang' },
  { key: 'lit-truyen-tho-nom-2', subject: 'literature', loai: 'Đọc hiểu văn bản', bai: 10, ham: 'bang' },
  { key: 'lit-vocab-context-2', subject: 'literature', loai: 'Tiếng Việt', bai: 10, ham: 'thach' },

  // --- ENGLISH (11 bài) ---
  { key: 'eng-comparison-1', subject: 'english', loai: 'Ngữ pháp', bai: 2, ham: 'thach' },
  { key: 'eng-comparison-2', subject: 'english', loai: 'Ngữ pháp', bai: 2, ham: 'thach' },
  { key: 'eng-conjunctions-1', subject: 'english', loai: 'Ngữ pháp', bai: 12, ham: 'thach' },
  { key: 'eng-conjunctions-2', subject: 'english', loai: 'Ngữ pháp', bai: 12, ham: 'thach' },
  { key: 'eng-cloze-1', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 13, ham: 'bang' },
  { key: 'eng-cloze-2', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 14, ham: 'bang' },
  { key: 'eng-grammar-mcq-2', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 15, ham: 'bang' },
  { key: 'eng-reading-comprehension-1', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 16, ham: 'bang' },
  { key: 'eng-reading-comprehension-2', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 17, ham: 'bang' },
  { key: 'eng-reading-skills-1', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 18, ham: 'bang' },
  { key: 'eng-reading-skills-2', subject: 'english', loai: 'Ngoài sách giáo khoa', bai: 19, ham: 'bang' },

  // --- SCIENCE (18 bài) ---
  { key: 'sci-9-1', subject: 'science', loai: 'Vật lý', bai: 5, ham: 'thach' },
  { key: 'sci-9-2', subject: 'science', loai: 'Vật lý', bai: 8, ham: 'thach' },
  { key: 'sci-9-7', subject: 'science', loai: 'Vật lý', bai: 11, ham: 'thach' },
  { key: 'sci-9-8', subject: 'science', loai: 'Vật lý', bai: 13, ham: 'thach' },
  { key: 'sci-9-9', subject: 'science', loai: 'Vật lý', bai: 14, ham: 'thach' },
  { key: 'sci-9-10', subject: 'science', loai: 'Vật lý', bai: 15, ham: 'thach' },
  { key: 'sci-9-3', subject: 'science', loai: 'Hóa học', bai: 18, ham: 'hoa' },
  { key: 'sci-9-11', subject: 'science', loai: 'Hóa học', bai: 21, ham: 'hoa' },
  { key: 'sci-9-4', subject: 'science', loai: 'Hóa học', bai: 22, ham: 'hoa' },
  { key: 'sci-9-12', subject: 'science', loai: 'Hóa học', bai: 24, ham: 'hoa' },
  { key: 'sci-9-13', subject: 'science', loai: 'Hóa học', bai: 26, ham: 'hoa' },
  { key: 'sci-9-14', subject: 'science', loai: 'Hóa học', bai: 28, ham: 'hoa' },
  { key: 'sci-9-5', subject: 'science', loai: 'Sinh học', bai: 37, ham: 'bang' },
  { key: 'sci-9-6', subject: 'science', loai: 'Sinh học', bai: 38, ham: 'bang' },
  { key: 'sci-9-16', subject: 'science', loai: 'Sinh học', bai: 41, ham: 'bang' },
  { key: 'sci-9-15', subject: 'science', loai: 'Sinh học', bai: 45, ham: 'bang' },
  { key: 'sci-9-17', subject: 'science', loai: 'Ngoài sách giáo khoa', bai: 52, ham: 'bang' },
  { key: 'sci-9-18', subject: 'science', loai: 'Ngoài sách giáo khoa', bai: 53, ham: 'bang' },

  // --- HISTORY & GEOGRAPHY (8 bài) ---
  { key: 'his-9-1', subject: 'history_geography', loai: 'Lịch sử', bai: 1, ham: 'thach' },
  { key: 'his-9-2', subject: 'history_geography', loai: 'Lịch sử', bai: 5, ham: 'thach' },
  { key: 'his-9-3', subject: 'history_geography', loai: 'Lịch sử', bai: 8, ham: 'thach' },
  { key: 'his-9-4', subject: 'history_geography', loai: 'Lịch sử', bai: 14, ham: 'thach' },
  { key: 'his-9-5', subject: 'history_geography', loai: 'Lịch sử', bai: 15, ham: 'thach' },
  { key: 'his-9-8', subject: 'history_geography', loai: 'Địa lý', bai: 30, ham: 'hoa' },
  { key: 'his-9-6', subject: 'history_geography', loai: 'Ngoài sách giáo khoa', bai: 31, ham: 'bang' },
  { key: 'his-9-7', subject: 'history_geography', loai: 'Ngoài sách giáo khoa', bai: 32, ham: 'bang' },

  // --- INFORMATICS (6 bài) ---
  { key: 'ict-9-3', subject: 'informatics', loai: 'Đạo đức, pháp luật và văn hóa', bai: 4, ham: 'thach' },
  { key: 'ict-9-4', subject: 'informatics', loai: 'Trình chiếu', bai: 7, ham: 'thach' },
  { key: 'ict-9-5', subject: 'informatics', loai: 'Giải quyết vấn đề', bai: 14, ham: 'thach' },
  { key: 'ict-9-6', subject: 'informatics', loai: 'Lập trình', bai: 16, ham: 'thach' },
  { key: 'ict-9-1', subject: 'informatics', loai: 'Ngoài sách giáo khoa', bai: 17, ham: 'bang' },
  { key: 'ict-9-2', subject: 'informatics', loai: 'Ngoài sách giáo khoa', bai: 18, ham: 'bang' },

  // --- TECHNOLOGY (6 bài) ---
  { key: 'tec-9-3', subject: 'technology', loai: 'Lắp đặt mạng điện', bai: 1, ham: 'thach' },
  { key: 'tec-9-5', subject: 'technology', loai: 'Lắp đặt mạng điện', bai: 3, ham: 'thach' },
  { key: 'tec-9-2', subject: 'technology', loai: 'Lắp đặt mạng điện', bai: 4, ham: 'thach' },
  { key: 'tec-9-6', subject: 'technology', loai: 'Lắp đặt mạng điện', bai: 6, ham: 'thach' },
  { key: 'tec-9-1', subject: 'technology', loai: 'Ngoài sách giáo khoa', bai: 8, ham: 'bang' },
  { key: 'tec-9-4', subject: 'technology', loai: 'Ngoài sách giáo khoa', bai: 9, ham: 'bang' },

  // --- CIVICS (GDCD) (6 bài) ---
  { key: 'gdcd-9-1', subject: 'civics', loai: 'Đạo đức', bai: 1, ham: 'thach' },
  { key: 'gdcd-9-2', subject: 'civics', loai: 'Kỹ năng sống', bai: 7, ham: 'thach' },
  { key: 'gdcd-9-4', subject: 'civics', loai: 'Pháp luật', bai: 10, ham: 'thach' },
  { key: 'gdcd-9-3', subject: 'civics', loai: 'Ngoài sách giáo khoa', bai: 11, ham: 'bang' },
  { key: 'gdcd-9-5', subject: 'civics', loai: 'Ngoài sách giáo khoa', bai: 12, ham: 'bang' },
  { key: 'gdcd-9-6', subject: 'civics', loai: 'Ngoài sách giáo khoa', bai: 13, ham: 'bang' },

  // --- ART (NGHỆ THUẬT) (5 bài) ---
  { key: 'art-9-3', subject: 'art', loai: 'Mỹ thuật', bai: 3, ham: 'bang' },
  { key: 'art-9-5', subject: 'art', loai: 'Mỹ thuật', bai: 4, ham: 'bang' },
  { key: 'art-9-4', subject: 'art', loai: 'Mỹ thuật', bai: 2, ham: 'bang' },
  { key: 'art-9-1', subject: 'art', loai: 'Âm nhạc', bai: 6, ham: 'thach' },
  { key: 'art-9-2', subject: 'art', loai: 'Âm nhạc', bai: 13, ham: 'thach' }
];

async function migrate() {
  console.log(`Bắt đầu di trú ${mappings.length} ánh xạ SGK lớp 9...`);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    let successCount = 0;
    for (const m of mappings) {
      await client.query(
        `INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (category_key) DO UPDATE SET
           subject = EXCLUDED.subject,
           loai = EXCLUDED.loai,
           bai = EXCLUDED.bai,
           ham = EXCLUDED.ham`,
        [m.key, m.subject, m.loai, m.bai, m.ham]
      );
      successCount++;
    }
    console.log(`Di trú thành công ${successCount}/${mappings.length} bản ghi!`);
  } catch (err) {
    console.error('Lỗi khi chạy di trú:', err);
  } finally {
    await client.end();
  }
}

migrate();
