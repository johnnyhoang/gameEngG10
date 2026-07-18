-- SQL migration to seed integrations, blueprints, and activities for cs_database_data (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_database_data
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_database_data', 'Part I', 'Trắc nghiệm Kiến thức & Thiết kế CSDL', 
    'Thiết kế ERD, dạng chuẩn 1NF-3NF, thuộc tính ACID, so sánh CSDL SQL vs NoSQL.', 
    '["chuẩn hóa","dạng chuẩn","ACID","giao dịch","SQL vs NoSQL"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Tập trung kiểm tra các lý thuyết nền tảng cốt lõi và lựa chọn công nghệ phù hợp.'
  ),
  (
    'cs_database_data', 'Part II', 'Tối ưu hóa & Tìm kiếm toàn văn (FTS)', 
    'Cấu trúc Indexing (B-Tree/Hash), luật Leftmost Prefix Composite Index, đọc hiểu EXPLAIN, Inverted Index và Full-Text Search.', 
    '["index","EXPLAIN","Composite Index","FTS","Full-Text Search","Inverted Index"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng phân tích hiệu năng và tối ưu hóa truy vấn thực tế.'
  ),
  (
    'cs_database_data', 'Part III', 'Tự luận ngắn & Vận hành Hệ thống lớn', 
    'Tính toán số lượng truy vấn do lỗi N+1, cấu hình Connection Pooling, Row-Level Security (RLS) bảo mật dòng, Sharding và chiến lược Caching với Redis.', 
    '["N+1 query","Prepared Statement","RLS","Sharding","Cache-Aside","TTL"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra tư duy giải quyết vấn đề thực tế trong kiến trúc hệ thống và bảo mật.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_database_data
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-db-design', 'db-design', 'boss', 'Chúa Tể Dị Thường Dữ Liệu', '{"boss_id": "b-db-design", "boss_tag": "3NF", "energy": 100}'::jsonb, 100, 100, 150, 'cs_database_data', 13),
  ('act-boss-db-query-opt', 'db-query-opt', 'boss', 'Cổ Long Table Scan', '{"boss_id": "b-db-query-opt", "boss_tag": "Index", "energy": 100}'::jsonb, 100, 100, 150, 'cs_database_data', 13),
  ('act-boss-db-transactions', 'db-transactions', 'boss', 'Hắc Thần Deadlock', '{"boss_id": "b-db-transactions", "boss_tag": "ACID", "energy": 100}'::jsonb, 100, 100, 150, 'cs_database_data', 13),
  ('act-boss-db-architecture', 'db-architecture', 'boss', 'Ma Vương N+1 Query', '{"boss_id": "b-db-architecture", "boss_tag": "Scale", "energy": 100}'::jsonb, 100, 100, 150, 'cs_database_data', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_database_data
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-db-design', 'db-design', 'quiz', 'Hầm ngục Chuẩn hóa & Thiết kế', '{"mode": "grammar", "reward": "Ưu tiên thiết kế CSDL và bảo mật RLS"}'::jsonb, 50, 10, 20, 'cs_database_data', 13),
  ('act-quiz-db-query-opt', 'db-query-opt', 'quiz', 'Đỉnh cao Đánh chỉ mục & Tìm kiếm', '{"mode": "vocabulary", "reward": "Ưu tiên Indexing, EXPLAIN và Full-Text Search"}'::jsonb, 50, 10, 20, 'cs_database_data', 13),
  ('act-quiz-db-transactions', 'db-transactions', 'quiz', 'Mê cung ACID & Cô lập', '{"mode": "reading", "reward": "Ưu tiên thuộc tính ACID, Isolation levels và Caching"}'::jsonb, 50, 10, 20, 'cs_database_data', 13),
  ('act-quiz-db-architecture', 'db-architecture', 'quiz', 'Thung lũng Scale & Tích hợp', '{"mode": "mixed", "reward": "Ưu tiên SQL vs NoSQL, ORM Pooling và Replication/Sharding"}'::jsonb, 50, 10, 20, 'cs_database_data', 13)
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

-- 4. Seed Textbook Mappings for cs_database_data
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-db-design-normalization', 'cs_database_data', 'Thiết kế', 1, 'thach'),
  ('cs-db-indexing-explain', 'cs_database_data', 'Tối ưu hóa', 2, 'hoa'),
  ('cs-db-transactions-acid', 'cs_database_data', 'Giao dịch', 3, 'bang'),
  ('cs-db-sql-vs-nosql', 'cs_database_data', 'Kiến trúc', 4, 'phong'),
  ('cs-db-orm-pooling', 'cs_database_data', 'Kiến trúc', 5, 'phong'),
  ('cs-db-warehouse-olap', 'cs_database_data', 'Kiến trúc', 6, 'phong'),
  ('cs-db-fulltext-search', 'cs_database_data', 'Tối ưu hóa', 7, 'hoa'),
  ('cs-db-replication-sharding', 'cs_database_data', 'Kiến trúc', 8, 'phong'),
  ('cs-db-security-rls', 'cs_database_data', 'Thiết kế', 9, 'thach'),
  ('cs-db-caching-redis', 'cs_database_data', 'Giao dịch', 10, 'bang')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
