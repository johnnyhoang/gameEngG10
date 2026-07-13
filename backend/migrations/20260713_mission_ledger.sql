CREATE TABLE IF NOT EXISTS ge10_mission_definitions (
  mission_key VARCHAR(100) PRIMARY KEY,
  category VARCHAR(20) NOT NULL CHECK (category IN ('onboarding', 'daily', 'milestone')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  event_type VARCHAR(80) NOT NULL,
  condition_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  target INTEGER NOT NULL CHECK (target > 0),
  reward_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  grade_scope INTEGER,
  subject_scope VARCHAR(50),
  feature_key VARCHAR(100),
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ge10_profile_mission_assignments (
  id BIGSERIAL PRIMARY KEY,
  profile_id VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
  mission_key VARCHAR(100) NOT NULL REFERENCES ge10_mission_definitions(mission_key),
  definition_version INTEGER NOT NULL,
  period_key VARCHAR(20) NOT NULL,
  target INTEGER NOT NULL CHECK (target > 0),
  current INTEGER NOT NULL DEFAULT 0 CHECK (current >= 0),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'claimed', 'expired')),
  completed_at TIMESTAMPTZ,
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, mission_key, period_key)
);

CREATE INDEX IF NOT EXISTS idx_mission_assignments_profile_period
  ON ge10_profile_mission_assignments(profile_id, period_key, status);

CREATE TABLE IF NOT EXISTS ge10_learning_events (
  event_id UUID PRIMARY KEY,
  idempotency_key VARCHAR(255) NOT NULL,
  profile_id VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
  event_type VARCHAR(80) NOT NULL,
  grade_tier INTEGER,
  subject_id VARCHAR(50),
  entity_type VARCHAR(80),
  entity_id VARCHAR(255),
  value INTEGER NOT NULL DEFAULT 1,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, idempotency_key)
);

CREATE INDEX IF NOT EXISTS idx_learning_events_profile_type_time
  ON ge10_learning_events(profile_id, event_type, occurred_at DESC);

CREATE TABLE IF NOT EXISTS ge10_mission_reward_ledger (
  id BIGSERIAL PRIMARY KEY,
  assignment_id BIGINT NOT NULL REFERENCES ge10_profile_mission_assignments(id) ON DELETE CASCADE,
  profile_id VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
  reward_type VARCHAR(30) NOT NULL CHECK (reward_type IN ('xp', 'ruby')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(assignment_id, reward_type)
);

INSERT INTO ge10_mission_definitions
  (mission_key, category, title, description, event_type, condition_json, target, reward_json, subject_scope, feature_key, display_order)
VALUES
  ('onboarding-teacher-link', 'onboarding', 'Gia nhập lớp học', 'Liên kết với một Chủ Nhiệm để không còn là Sĩ Tử mới.', 'teacher_link_activated', '{}', 1, '{"xp":50}', NULL, 'teacher-link', 10),
  ('onboarding-feed-pet', 'onboarding', 'Bữa ăn đầu tiên', 'Cho Heo Maikawaii ăn lần đầu.', 'pet_fed', '{}', 1, '{"xp":20}', NULL, 'pet', 20),
  ('onboarding-tickle-pet', 'onboarding', 'Làm quen với MIKA', 'Thọc lét Heo Maikawaii lần đầu.', 'pet_tickled', '{}', 1, '{"xp":10}', NULL, 'pet', 30),
  ('onboarding-riddle', 'onboarding', 'Đố vui đầu tiên', 'Hoàn thành Đố Vui Nhận Ruby lần đầu.', 'riddle_completed', '{"mode":"ruby-riddle"}', 1, '{"xp":20}', NULL, 'ruby-riddle', 40),
  ('onboarding-sprint', 'onboarding', 'Tốc chiến đầu tiên', 'Hoàn thành Tốc Chiến Kỳ Ngộ lần đầu.', 'encounter_sprint_completed', '{}', 1, '{"xp":30}', NULL, 'encounter-sprint', 50),
  ('onboarding-math-lesson', 'onboarding', 'Bài Toán đầu tiên', 'Hoàn thành một bài học môn Toán.', 'lesson_completed', '{}', 1, '{"xp":30}', 'math', NULL, 60),
  ('onboarding-english-lesson', 'onboarding', 'Bài Anh đầu tiên', 'Hoàn thành một bài học môn Tiếng Anh.', 'lesson_completed', '{}', 1, '{"xp":30}', 'english', NULL, 70),
  ('onboarding-3d', 'onboarding', 'Khám phá hình học 3D', 'Mở Xưởng Toán Hình 3D lần đầu.', 'feature_opened', '{"featureKey":"math-3d-studio"}', 1, '{"xp":20}', 'math', 'math-3d-studio', 80),
  ('onboarding-hint', 'onboarding', 'Thẻ Nhắc Bài đầu tiên', 'Sử dụng Thẻ Nhắc Bài lần đầu.', 'hint_used', '{}', 1, '{"xp":10}', NULL, 'hint', 90),
  ('onboarding-shop', 'onboarding', 'Học cụ đầu tiên', 'Đổi một Học Cụ bằng Ruby lần đầu.', 'shop_item_redeemed', '{}', 1, '{"xp":20}', NULL, 'shop', 95),
  ('onboarding-boss', 'onboarding', 'Khoa Thi đầu tiên', 'Hoàn thành một Khoa Thi lần đầu.', 'boss_completed', '{}', 1, '{"xp":40}', NULL, 'boss', 100),
  ('daily-answer-10', 'daily', 'Rèn câu hỏi', 'Trả lời 10 câu hỏi trong ngày.', 'question_answered', '{}', 10, '{"xp":50}', NULL, NULL, 110),
  ('daily-correct-7', 'daily', 'Bảy câu chính xác', 'Trả lời đúng 7 câu trong ngày.', 'question_answered', '{"isCorrect":true}', 7, '{"xp":50}', NULL, NULL, 120),
  ('daily-lesson-1', 'daily', 'Một bài mỗi ngày', 'Hoàn thành một bài học trong ngày.', 'lesson_completed', '{}', 1, '{"xp":50}', NULL, NULL, 130),
  ('daily-riddle-1', 'daily', 'Khởi động trí óc', 'Hoàn thành một mini-game câu đố trong ngày.', 'riddle_completed', '{}', 1, '{"xp":30}', NULL, NULL, 140)
ON CONFLICT (mission_key) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  event_type = EXCLUDED.event_type,
  condition_json = EXCLUDED.condition_json,
  target = EXCLUDED.target,
  reward_json = EXCLUDED.reward_json,
  grade_scope = EXCLUDED.grade_scope,
  subject_scope = EXCLUDED.subject_scope,
  feature_key = EXCLUDED.feature_key,
  version = EXCLUDED.version,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

UPDATE ge10_mission_definitions
SET is_active = FALSE, updated_at = NOW()
WHERE mission_key = 'onboarding-fog';

UPDATE ge10_profile_mission_assignments
SET status = 'expired', updated_at = NOW()
WHERE mission_key = 'onboarding-fog' AND status = 'active';

-- Khởi tạo cột mốc lifetime cho profile hiện có và reconcile bằng dữ liệu thật.
INSERT INTO ge10_profile_mission_assignments
  (profile_id, mission_key, definition_version, period_key, target)
SELECT u.id, d.mission_key, d.version, 'lifetime', d.target
FROM ge10_users u
CROSS JOIN ge10_mission_definitions d
WHERE u.role = 'student' AND d.is_active = TRUE AND d.category IN ('onboarding', 'milestone')
ON CONFLICT (profile_id, mission_key, period_key) DO NOTHING;

UPDATE ge10_profile_mission_assignments a
SET current = a.target, status = 'completed', completed_at = COALESCE(a.completed_at, NOW()), updated_at = NOW()
WHERE a.mission_key = 'onboarding-teacher-link'
  AND EXISTS (SELECT 1 FROM ge10_family_links f WHERE f.student_id = a.profile_id AND f.status = 'active');

UPDATE ge10_profile_mission_assignments a
SET current = a.target, status = 'completed', completed_at = COALESCE(a.completed_at, p.completed_at), updated_at = NOW()
FROM ge10_user_lessons_progress p
JOIN ge10_lessons l ON l.id = p.lesson_id
WHERE p.user_id = a.profile_id AND p.completed = TRUE
  AND ((a.mission_key = 'onboarding-math-lesson' AND l.subject = 'math')
    OR (a.mission_key = 'onboarding-english-lesson' AND l.subject = 'english'));

-- JSON daily mission cũ được giữ nguyên để audit/rollback; runtime mới không đọc bảng này.
