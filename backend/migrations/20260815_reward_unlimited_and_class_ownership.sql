-- Migration: audit Danh Mục Quà Khuyến Học (trường + lớp) — 3 việc:
--   1) Thay hack "quantity = 999999" bằng cờ is_unlimited thật (trường VÀ lớp, để khi
--      1 quà trường "không giới hạn" được nhân bản xuống lớp, cờ này giữ nguyên).
--   2) Cờ class_rewards_seeded trên ge10_users — nhân bản quà trường -> quà lớp CHỈ 1 LẦN
--      lúc hồ sơ giáo viên được tạo (helpers/questions.ts::ensureDefaultClassRewards), không
--      tự "mọc lại" mỗi lần giáo viên xoá hết quà mặc định rồi load lại trang.
--   3) Backfill để không phá dữ liệu cũ: các dòng đã seed với 999999 -> is_unlimited = TRUE;
--      giáo viên đã có sẵn quà lớp -> đánh dấu đã seeded để không bị nhân bản chồng lần tới.

ALTER TABLE ge10_school_reward_templates ADD COLUMN IF NOT EXISTS is_unlimited BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE ge10_class_rewards ADD COLUMN IF NOT EXISTS is_unlimited BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE ge10_users ADD COLUMN IF NOT EXISTS class_rewards_seeded BOOLEAN NOT NULL DEFAULT FALSE;

-- Các dòng quà trường seed ban đầu dùng 999999 làm hack "không giới hạn" (xem
-- 20260717_school_reward_templates.sql) -> chuyển hẳn sang cờ thật.
UPDATE ge10_school_reward_templates SET is_unlimited = TRUE WHERE quantity >= 999999;

-- Quà lớp được nhân bản (clone) trực tiếp từ quantity của quà trường tại thời điểm tạo hồ sơ
-- giáo viên -> những dòng nhân bản từ quà trường "không giới hạn" cũ cũng dính số 999999.
UPDATE ge10_class_rewards SET is_unlimited = TRUE WHERE quantity >= 999999;

-- Giáo viên nào đã có ít nhất 1 quà lớp (do đã từng được ensureDefaultClassRewards nhân bản
-- theo logic cũ "seed nếu đang có 0 quà") -> đánh dấu đã seeded, tránh nhân bản chồng lần tới
-- khi logic seed chuyển sang dùng cờ này thay vì đếm số dòng.
UPDATE ge10_users u SET class_rewards_seeded = TRUE
WHERE EXISTS (SELECT 1 FROM ge10_class_rewards cr WHERE cr.teacher_id = u.id);
