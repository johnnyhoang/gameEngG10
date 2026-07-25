-- Migration to create ge10_match_pairs table and seed match pairs data

CREATE TABLE IF NOT EXISTS ge10_match_pairs (
  id VARCHAR(64) PRIMARY KEY,
  subject VARCHAR(32) NOT NULL,
  grade_tier INT NOT NULL DEFAULT 9,
  left_text TEXT NOT NULL,
  right_text TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ge10_match_pairs (id, subject, grade_tier, left_text, right_text, is_active) VALUES
  ('eng-1', 'english', 9, 'Procrastinate', 'Trì hoãn, khất lần', TRUE),
  ('eng-2', 'english', 9, 'Benevolent', 'Nhân từ, rộng lượng', TRUE),
  ('eng-3', 'english', 9, 'Elaborate', 'Chi tiết, tỉ mỉ', TRUE),
  ('eng-4', 'english', 9, 'Abundant', 'Dồi dào, phong phú', TRUE),
  ('eng-5', 'english', 9, 'Obsolete', 'Lỗi thời, cổ xưa', TRUE),
  ('eng-6', 'english', 9, 'Resilient', 'Kiên cường, bền bỉ', TRUE),

  ('math-1', 'math', 9, 'Diện tích đường tròn', 'S = π * r²', TRUE),
  ('math-2', 'math', 9, 'Hệ thức Pythagoras', 'a² = b² + c²', TRUE),
  ('math-3', 'math', 9, 'Thể tích hình trụ', 'V = π * r² * h', TRUE),
  ('math-4', 'math', 9, 'Diện tích tam giác', 'S = ½ * a * h', TRUE),
  ('math-5', 'math', 9, 'Hệ thức Vi-ét (Tổng)', 'x₁ + x₂ = -b/a', TRUE),
  ('math-6', 'math', 9, 'Thể tích hình nón', 'V = ⅓ * π * r² * h', TRUE),

  ('lit-1', 'literature', 9, 'Xuân Quỳnh', 'Tác phẩm "Sóng"', TRUE),
  ('lit-2', 'literature', 9, 'Nam Cao', 'Tác phẩm "Lão Hạc"', TRUE),
  ('lit-3', 'literature', 9, 'Nguyễn Du', 'Tác phẩm "Truyện Kiều"', TRUE),
  ('lit-4', 'literature', 9, 'Nguyễn Minh Châu', 'Tác phẩm "Chiếc thuyền ngoài xa"', TRUE),
  ('lit-5', 'literature', 9, 'Tô Hoài', 'Tác phẩm "Dế Mèn Phiêu Lưu Ký"', TRUE),
  ('lit-6', 'literature', 9, 'Chính Hữu', 'Tác phẩm "Đồng chí"', TRUE),

  ('gen-1', 'general', 9, 'Phương pháp Feynman', 'Học bằng cách dạy lại cho người khác', TRUE),
  ('gen-2', 'general', 9, 'Active Recall', 'Chủ động gợi nhớ thông tin để học sâu', TRUE),
  ('gen-3', 'general', 9, 'Spaced Repetition', 'Lặp lại ngắt quãng để chống quên', TRUE),
  ('gen-4', 'general', 9, 'Pomodoro', 'Học tập tập trung 25 phút, nghỉ 5 phút', TRUE),
  ('gen-5', 'general', 9, 'Growth Mindset', 'Tư duy phát triển, không ngại sai lầm', TRUE),
  ('gen-6', 'general', 9, 'Maikawaii', 'Bé Heo linh vật siêu đáng yêu của Học Viện', TRUE)
ON CONFLICT (id) DO UPDATE SET left_text = EXCLUDED.left_text, right_text = EXCLUDED.right_text;
