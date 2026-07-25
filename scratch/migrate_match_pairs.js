import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

const INITIAL_MATCH_PAIRS = [
  // Tiếng Anh
  { id: 'mp-eng-1', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Procrastinate', right_text: 'Trì hoãn, khất lần' },
  { id: 'mp-eng-2', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Benevolent', right_text: 'Nhân từ, rộng lượng' },
  { id: 'mp-eng-3', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Elaborate', right_text: 'Chi tiết, tỉ mỉ' },
  { id: 'mp-eng-4', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Abundant', right_text: 'Dồi dào, phong phú' },
  { id: 'mp-eng-5', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Obsolete', right_text: 'Lỗi thời, cổ xưa' },
  { id: 'mp-eng-6', subject: 'english', grade_tier: 9, category: 'vocabulary', left_text: 'Resilient', right_text: 'Kiên cường, bền bỉ' },

  // Toán
  { id: 'mp-math-1', subject: 'math', grade_tier: 9, category: 'geometry', left_text: 'Diện tích đường tròn', right_text: 'S = π * r²' },
  { id: 'mp-math-2', subject: 'math', grade_tier: 9, category: 'geometry', left_text: 'Hệ thức Pythagoras', right_text: 'a² = b² + c²' },
  { id: 'mp-math-3', subject: 'math', grade_tier: 9, category: 'spatial-geometry', left_text: 'Thể tích hình trụ', right_text: 'V = π * r² * h' },
  { id: 'mp-math-4', subject: 'math', grade_tier: 9, category: 'geometry', left_text: 'Diện tích tam giác', right_text: 'S = ½ * a * h' },
  { id: 'mp-math-5', subject: 'math', grade_tier: 9, category: 'vieta', left_text: 'Hệ thức Vi-ét (Tổng)', right_text: 'x₁ + x₂ = -b/a' },
  { id: 'mp-math-6', subject: 'math', grade_tier: 9, category: 'spatial-geometry', left_text: 'Thể tích hình nón', right_text: 'V = ⅓ * π * r² * h' },

  // Ngữ Văn
  { id: 'mp-lit-1', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Xuân Quỳnh', right_text: 'Tác phẩm "Sóng"' },
  { id: 'mp-lit-2', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Nam Cao', right_text: 'Tác phẩm "Lão Hạc"' },
  { id: 'mp-lit-3', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Nguyễn Du', right_text: 'Tác phẩm "Truyện Kiều"' },
  { id: 'mp-lit-4', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Nguyễn Minh Châu', right_text: 'Tác phẩm "Chiếc thuyền ngoài xa"' },
  { id: 'mp-lit-5', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Tô Hoài', right_text: 'Tác phẩm "Dế Mèn Phiêu Lưu Ký"' },
  { id: 'mp-lit-6', subject: 'literature', grade_tier: 9, category: 'authors', left_text: 'Chính Hữu', right_text: 'Tác phẩm "Đồng chí"' },

  // Chung / Phương pháp học
  { id: 'mp-gen-1', subject: 'general', grade_tier: 9, category: 'methodology', left_text: 'Phương pháp Feynman', right_text: 'Học bằng cách dạy lại cho người khác' },
  { id: 'mp-gen-2', subject: 'general', grade_tier: 9, category: 'methodology', left_text: 'Active Recall', right_text: 'Chủ động gợi nhớ thông tin để học sâu' },
  { id: 'mp-gen-3', subject: 'general', grade_tier: 9, category: 'methodology', left_text: 'Spaced Repetition', right_text: 'Lặp lại ngắt quãng để chống quên' },
  { id: 'mp-gen-4', subject: 'general', grade_tier: 9, category: 'methodology', left_text: 'Pomodoro', right_text: 'Học tập tập trung 25 phút, nghỉ 5 phút' },
  { id: 'mp-gen-5', subject: 'general', grade_tier: 9, category: 'methodology', left_text: 'Growth Mindset', right_text: 'Tư duy phát triển, không ngại sai lầm' },
  { id: 'mp-gen-6', subject: 'general', grade_tier: 9, category: 'mascot', left_text: 'Maikawaii', right_text: 'Bé Heo linh vật siêu đáng yêu của Học Viện' }
];

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    console.log('Tạo bảng ge10_match_pairs...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ge10_match_pairs (
        id VARCHAR(64) PRIMARY KEY,
        subject VARCHAR(32) NOT NULL,
        grade_tier INT NOT NULL DEFAULT 9,
        category VARCHAR(64) DEFAULT 'general',
        left_text TEXT NOT NULL,
        right_text TEXT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Chèn dữ liệu seed vào ge10_match_pairs...');
    for (const item of INITIAL_MATCH_PAIRS) {
      await client.query(`
        INSERT INTO ge10_match_pairs (id, subject, grade_tier, category, left_text, right_text)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE 
        SET subject = EXCLUDED.subject,
            grade_tier = EXCLUDED.grade_tier,
            category = EXCLUDED.category,
            left_text = EXCLUDED.left_text,
            right_text = EXCLUDED.right_text
      `, [item.id, item.subject, item.grade_tier, item.category, item.left_text, item.right_text]);
    }

    console.log('Migration ge10_match_pairs thành công 100%!');
  } catch (err) {
    console.error('Lỗi khi migrate match pairs:', err);
  } finally {
    await client.end();
  }
}

migrate();
