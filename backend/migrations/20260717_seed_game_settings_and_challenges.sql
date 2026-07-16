-- Migration: Dời các hằng số hardcode trong code (game settings + challenge templates)
-- vào DB — code là source of truth cho LẦN IMPORT ĐẦU TIÊN này, từ đây về sau DB là
-- nguồn duy nhất (Viện Trưởng/Phó Viện Trưởng chỉnh qua API quản trị, không sửa code).

-- 1. Nhập lần đầu base_xp/base_ruby/theme_unlock_cost nếu DB chưa có (one-time import).
INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES ('base_xp', '{"value": 15}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES ('base_ruby', '{"value": 5}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES ('theme_unlock_cost', '{"value": 200}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;

-- 2. Bảng mẫu Nhiệm Vụ/Thử Thách (Challenge Templates) — dùng để khởi tạo challenges cho
--    mỗi hồ sơ học sinh mới (xem routes/profiles.ts) và cho resetProgress(). Không còn
--    mảng hardcode INITIAL_CHALLENGES trong frontend.
CREATE TABLE IF NOT EXISTS ge10_challenge_templates (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- 'daily' | 'weekly' | 'achievement'
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500) NOT NULL,
    target_count INTEGER NOT NULL,
    reward_ruby INTEGER NOT NULL DEFAULT 0,
    reward_xp INTEGER NOT NULL DEFAULT 0,
    category VARCHAR(100),
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- 3. Nhập lần đầu danh sách nhiệm vụ hiện đang hardcode — CHỈ chạy nếu bảng đang trống.
INSERT INTO ge10_challenge_templates (id, type, title, description, target_count, reward_ruby, reward_xp, category, sort_order)
SELECT * FROM (VALUES
    ('ch-1', 'daily', 'Luyện 20 câu hỏi', 'Hoàn thành làm 20 câu hỏi bất kỳ', 20, 100, 100, NULL, 1),
    ('ch-2', 'daily', 'Chiến binh Grammar', 'Trả lời đúng 10 câu hỏi ngữ pháp', 10, 80, 80, 'grammar', 2),
    ('ch-3', 'daily', 'Không tỳ vết', 'Đạt chuỗi đúng 10 câu liên tiếp', 10, 120, 150, NULL, 3),
    ('ch-4', 'weekly', 'Học tập bền bỉ', 'Hoàn thành 100 câu hỏi trong tuần', 100, 500, 500, NULL, 4),
    ('ch-5', 'achievement', 'Khởi đầu vinh quang', 'Tổng cộng trả lời đúng 100 câu', 100, 300, 300, NULL, 5),
    ('ch-6', 'achievement', 'Huyền thoại học đường', 'Tổng cộng trả lời đúng 1000 câu', 1000, 2000, 2000, NULL, 6)
) AS v(id, type, title, description, target_count, reward_ruby, reward_xp, category, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM ge10_challenge_templates);
