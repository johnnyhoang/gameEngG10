-- SQL migration to seed integrations, blueprints, and activities for cs_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_programming
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_programming', 'Part I', 'Mô hình lập trình & Quản lý bộ nhớ', 
    'Lập trình hướng đối tượng (OOP) nâng cao, quản lý bộ nhớ Stack vs Heap, con trỏ thông minh (Smart Pointers) và lập trình hàm (Functional Programming).', 
    '["OOP","Stack","Heap","Pointer","Smart Pointer","Lambda","Pure Function"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Tập trung kiểm tra các nền tảng OOP, cơ chế quản lý bộ nhớ RAM vật lý và mô hình lập trình khai báo.'
  ),
  (
    'cs_programming', 'Part II', 'Độ tin cậy phần mềm & Lập trình song song', 
    'Xử lý bất đồng bộ, đa luồng (Multithreading), race conditions, cơ chế Mutex/Semaphore/Locks, deadlock và chiến lược xử lý ngoại lệ/logging.', 
    '["concurrency","multithreading","race condition","mutex","deadlock","try-catch","log level"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng thiết kế hệ thống đa luồng an toàn và chiến lược xử lý lỗi chuyên nghiệp.'
  ),
  (
    'cs_programming', 'Part III', 'Nguyên lý SOLID, Design Patterns & Workflow', 
    'Lập trình tổng quát Generics, 5 nguyên lý SOLID, các mẫu thiết kế (Creational, Structural, Behavioral), Git workflows và quy trình test Unit Test / TDD.', 
    '["Generics","SOLID","Singleton","Factory","Observer","Strategy","Git","TDD"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra kỹ năng thiết kế phần mềm sạch (clean architecture), kiểm soát phiên bản mã nguồn và tự động hóa kiểm thử.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_programming
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-prog-paradigms', 'programming-paradigms', 'boss', 'Ma Vương Leak Bộ Nhớ Heap', '{"boss_id": "b-prog-paradigms", "boss_tag": "Leak", "energy": 100}'::jsonb, 100, 100, 150, 'cs_programming', 13),
  ('act-boss-prog-reliability', 'software-reliability', 'boss', 'Quái Thú Khóa Chết Deadlock', '{"boss_id": "b-prog-reliability", "boss_tag": "Lock", "energy": 100}'::jsonb, 100, 100, 150, 'cs_programming', 13),
  ('act-boss-prog-design', 'design-principles', 'boss', 'Thần Đa Kế Thừa Hỗn Mang', '{"boss_id": "b-prog-design", "boss_tag": "SOLID", "energy": 100}'::jsonb, 100, 100, 150, 'cs_programming', 13),
  ('act-boss-prog-workflow', 'development-workflow', 'boss', 'Ác Thần Conflict Phép Gộp', '{"boss_id": "b-prog-workflow", "boss_tag": "Git", "energy": 100}'::jsonb, 100, 100, 150, 'cs_programming', 13)
ON CONFLICT (id) DO UPDATE SET
  topic_id = EXCLUDED.topic_id,
  activity_type = EXCLUDED.activity_type,
  title = EXCLUDED.title,
  config = EXCLUDED.config,
  sort_order = EXCLUDED.sort_order,
  reward_np = EXCLUDED.reward_np,
  reward_xp = EXCLUDED.reward_xp,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier;

-- 3. Seed Quiz Activities for 4 topics of cs_programming
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-prog-paradigms', 'programming-paradigms', 'quiz', 'Luyện tập OOP & Lập trình hàm', '{"mode": "grammar", "reward": "Ưu tiên mô hình hướng đối tượng và functional programming"}'::jsonb, 50, 10, 20, 'cs_programming', 13),
  ('act-quiz-prog-reliability', 'software-reliability', 'quiz', 'Luyện tập Đa luồng & Ngoại lệ', '{"mode": "vocabulary", "reward": "Ưu tiên giải quyết race condition và exception handling"}'::jsonb, 50, 10, 20, 'cs_programming', 13),
  ('act-quiz-prog-design', 'design-principles', 'quiz', 'Luyện tập SOLID & Design Patterns', '{"mode": "reading", "reward": "Ưu tiên thiết kế SOLID và áp dụng mẫu thiết kế"}'::jsonb, 50, 10, 20, 'cs_programming', 13),
  ('act-quiz-prog-workflow', 'development-workflow', 'quiz', 'Luyện tập Git & TDD', '{"mode": "mixed", "reward": "Ưu tiên quy trình Gitflow và chu trình test TDD"}'::jsonb, 50, 10, 20, 'cs_programming', 13)
ON CONFLICT (id) DO UPDATE SET
  topic_id = EXCLUDED.topic_id,
  activity_type = EXCLUDED.activity_type,
  title = EXCLUDED.title,
  config = EXCLUDED.config,
  sort_order = EXCLUDED.sort_order,
  reward_np = EXCLUDED.reward_np,
  reward_xp = EXCLUDED.reward_xp,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier;

-- 4. Seed Textbook Mappings for cs_programming
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-prog-oop', 'cs_programming', 'Mô hình', 1, 'thach'),
  ('cs-prog-memory', 'cs_programming', 'Mô hình', 2, 'thach'),
  ('cs-prog-functional', 'cs_programming', 'Mô hình', 3, 'thach'),
  ('cs-prog-multithreading', 'cs_programming', 'Tin cậy', 4, 'hoa'),
  ('cs-prog-exceptions', 'cs_programming', 'Tin cậy', 5, 'hoa'),
  ('cs-prog-generics', 'cs_programming', 'Thiết kế', 6, 'bang'),
  ('cs-prog-solid', 'cs_programming', 'Thiết kế', 7, 'bang'),
  ('cs-prog-patterns', 'cs_programming', 'Thiết kế', 8, 'bang'),
  ('cs-prog-git-vcs', 'cs_programming', 'Workflow', 9, 'phong'),
  ('cs-prog-testing-tdd', 'cs_programming', 'Workflow', 10, 'phong')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
