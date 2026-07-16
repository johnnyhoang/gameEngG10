-- Migration: Danh sách Quà Khuyến Học của TRƯỜNG chuyển từ mảng hardcode trong code
-- sang một bảng DB dùng chung toàn viện — không còn nhân bản theo từng học sinh.
-- Quà của TỪNG giáo viên (ge10_class_rewards) tiếp tục được clone từ danh sách này
-- ngay khi hồ sơ giáo viên được tạo (xem routes/profiles.ts, helpers/questions.ts).
-- Học sinh mồ côi (không có giáo viên) đọc thẳng bảng này; học sinh có giáo viên chỉ
-- thấy ge10_class_rewards của giáo viên đó.

-- 1. Bảng danh sách quà DÙNG CHUNG của trường — không có user_id vì chỉ có DUY NHẤT 1 danh sách.
CREATE TABLE IF NOT EXISTS ge10_school_reward_templates (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    cost_ruby INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    remaining_quantity INTEGER NOT NULL DEFAULT 1,
    created_at BIGINT NOT NULL
);

-- 2. Nếu DB cũ còn ge10_tutor_rewards (bản nhân theo từng học sinh) → gộp thành 1 danh sách
--    chung theo tiêu đề (title), lấy bản mới nhất mỗi tiêu đề.
DO $$
BEGIN
    IF to_regclass('public.ge10_tutor_rewards') IS NOT NULL THEN
        INSERT INTO ge10_school_reward_templates (id, title, cost_ruby, quantity, remaining_quantity, created_at)
        SELECT DISTINCT ON (LOWER(title))
            'sch-rew-' || md5(LOWER(title)),
            title, cost_ruby, quantity, remaining_quantity, timestamp
        FROM ge10_tutor_rewards
        ORDER BY LOWER(title), timestamp DESC
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- 3. Trỏ lại reward_id của các redemption cũ (đang trỏ vào ge10_tutor_rewards) sang bản ghi
--    tương ứng trong bảng mới theo cùng tiêu đề — không tìm được thì để NULL (lịch sử vẫn giữ
--    nguyên reward_title/cost_ruby ngay trên redemption, không mất thông tin hiển thị).
DO $$
BEGIN
    IF to_regclass('public.ge10_tutor_rewards') IS NOT NULL THEN
        UPDATE ge10_reward_redemptions r
        SET reward_id = 'sch-rew-' || md5(LOWER(t.title))
        FROM ge10_tutor_rewards t
        WHERE r.reward_id = t.id
          AND EXISTS (SELECT 1 FROM ge10_school_reward_templates s WHERE s.id = 'sch-rew-' || md5(LOWER(t.title)));
    END IF;
END $$;

-- 4. Đổi FK reward_id sang trỏ vào bảng mới; dọn tham chiếu mồ côi trước khi gắn FK.
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_reward_redemptions_reward_id_fkey') THEN
        ALTER TABLE ge10_reward_redemptions DROP CONSTRAINT ge10_reward_redemptions_reward_id_fkey;
    END IF;

    UPDATE ge10_reward_redemptions SET reward_id = NULL
    WHERE reward_id IS NOT NULL
      AND reward_id NOT IN (SELECT id FROM ge10_school_reward_templates);

    ALTER TABLE ge10_reward_redemptions
        ADD CONSTRAINT ge10_reward_redemptions_reward_id_fkey
        FOREIGN KEY (reward_id) REFERENCES ge10_school_reward_templates(id) ON DELETE SET NULL;
END $$;

-- 5. Xoá bảng cũ (đã nhân bản theo từng học sinh — không còn phù hợp kiến trúc "1 danh sách chung").
DROP TABLE IF EXISTS ge10_tutor_rewards;

-- 6. Nhập lần đầu (one-time import) danh mục quà đang hardcode trong code vào DB — CHỈ chạy nếu
--    bảng đang trống (DB hoàn toàn mới, chưa từng có ge10_tutor_rewards/ge10_parent_rewards).
--    Từ đây về sau, DB là nguồn dữ liệu duy nhất — Viện Trưởng/Phó Viện Trưởng chỉnh qua
--    API quản trị (/api/admin/school-rewards), không còn sửa trong code.
INSERT INTO ge10_school_reward_templates (id, title, cost_ruby, quantity, remaining_quantity, created_at)
SELECT * FROM (VALUES
    ('sch-rew-seed-1', '15 phút chơi game', 150, 999999, 999999, 0),
    ('sch-rew-seed-2', 'Ly trà sữa đặc biệt', 400, 999999, 999999, 0),
    ('sch-rew-seed-3', 'Bao lì xì 20.000đ', 500, 999999, 999999, 0),
    ('sch-rew-seed-4', 'Bao lì xì 50.000đ', 1000, 999999, 999999, 0),
    ('sch-rew-seed-5', 'Bao lì xì 100.000đ', 1800, 999999, 999999, 0)
) AS v(id, title, cost_ruby, quantity, remaining_quantity, created_at)
WHERE NOT EXISTS (SELECT 1 FROM ge10_school_reward_templates);
