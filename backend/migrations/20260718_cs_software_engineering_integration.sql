-- SQL migration to seed integrations, blueprints, and activities for cs_software_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_software_engineering
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_software_engineering', 'Part I', 'Quy trình phần mềm & Phân tích yêu cầu', 
    'Mô hình Waterfall, V-Model, Spiral, hệ phương pháp Agile/Scrum (vai trò, sự kiện), phân tích yêu cầu chức năng/phi chức năng và sơ đồ Use Cases.', 
    '["Waterfall","Spiral","Scrum","Sprint","Functional","NFR","Actor","include","extend"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng phân tích mô hình quy trình phần mềm, tổ chức Scrum team và phân loại yêu cầu chức năng/phi chức năng.'
  ),
  (
    'cs_software_engineering', 'Part II', 'Thiết kế UML & Mẫu thiết kế GoF', 
    'UML Class Diagram (Association, Aggregation, Composition, Generalization), Sequence Diagram, kiến trúc Monolith vs Microservices, MVC và các mẫu thiết kế GoF khởi tạo.', 
    '["UML","Class Diagram","Sequence","Composition","Aggregation","Monolith","Microservices","MVC","Singleton","Factory","Builder"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng đọc hiểu sơ đồ UML, phân biệt cấu trúc Monolith/Microservices và áp dụng mẫu thiết kế khởi tạo đối tượng.'
  ),
  (
    'cs_software_engineering', 'Part III', 'Mẫu thiết kế hành vi, SOLID & CI/CD DevOps', 
    'Mẫu thiết kế Strategy, Observer, Facade, bộ 5 nguyên lý thiết kế SOLID, kiểm thử hộp trắng/hộp đen, TDD, tái cấu trúc Refactoring, CI/CD, Git Flow và Docker.', 
    '["Observer","Strategy","Facade","SOLID","Liskov","Unit Test","Mock","Refactoring","CI/CD","Docker","Git"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra hiểu biết sâu sắc về các mẫu thiết kế hành vi, nguyên lý SOLID, cô lập kiểm thử unit test, DevOps pipeline và ảo hóa container.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_software_engineering
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-se-processes', 'software-processes', 'boss', 'Ma Vương Waterfall Cứng Nhắc', '{"boss_id": "b-se-processes", "boss_tag": "Waterfall", "energy": 100}'::jsonb, 100, 100, 150, 'cs_software_engineering', 13),
  ('act-boss-se-requirements', 'software-requirements', 'boss', 'Ác Thần Mất Kết Nối UML', '{"boss_id": "b-se-requirements", "boss_tag": "UML", "energy": 100}'::jsonb, 100, 100, 150, 'cs_software_engineering', 13),
  ('act-boss-se-design', 'architecture-design', 'boss', 'Quái Nhân Singleton Phá Hoại', '{"boss_id": "b-se-design", "boss_tag": "Singleton", "energy": 100}'::jsonb, 100, 100, 150, 'cs_software_engineering', 13),
  ('act-boss-se-quality', 'quality-testing', 'boss', 'Linh Hồn Vi Phạm Liskov', '{"boss_id": "b-se-quality", "boss_tag": "SOLID", "energy": 100}'::jsonb, 100, 100, 150, 'cs_software_engineering', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_software_engineering
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-se-processes', 'software-processes', 'quiz', 'Luyện tập Mô hình & Agile/Scrum', '{"mode": "grammar", "reward": "Ưu tiên mô hình thác nước, xoắn ốc và quy trình Scrum"}'::jsonb, 50, 10, 20, 'cs_software_engineering', 13),
  ('act-quiz-se-requirements', 'software-requirements', 'quiz', 'Luyện tập Yêu cầu & Thiết kế UML', '{"mode": "vocabulary", "reward": "Ưu tiên yêu cầu chức năng/phi chức năng, sơ đồ class và sequence"}'::jsonb, 50, 10, 20, 'cs_software_engineering', 13),
  ('act-quiz-se-design', 'architecture-design', 'quiz', 'Luyện tập Kiến trúc & Design Patterns', '{"mode": "reading", "reward": "Ưu tiên monolith vs microservices, MVC và các mẫu thiết kế GoF"}'::jsonb, 50, 10, 20, 'cs_software_engineering', 13),
  ('act-quiz-se-quality', 'quality-testing', 'quiz', 'Luyện tập Kiểm thử, SOLID & DevOps', '{"mode": "mixed", "reward": "Ưu tiên white-box/black-box testing, nguyên lý SOLID và Docker CI/CD"}'::jsonb, 50, 10, 20, 'cs_software_engineering', 13)
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

-- 4. Seed Textbook Mappings for cs_software_engineering
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-se-models', 'cs_software_engineering', 'Quy trình', 1, 'thach'),
  ('cs-se-scrum', 'cs_software_engineering', 'Quy trình', 2, 'thach'),
  ('cs-se-requirements', 'cs_software_engineering', 'Phân tích', 3, 'phong'),
  ('cs-se-uml', 'cs_software_engineering', 'Phân tích', 4, 'phong'),
  ('cs-se-microservices', 'cs_software_engineering', 'Thiết kế', 5, 'hoa'),
  ('cs-se-singleton', 'cs_software_engineering', 'Thiết kế', 6, 'hoa'),
  ('cs-se-strategy', 'cs_software_engineering', 'Thiết kế', 7, 'hoa'),
  ('cs-se-testing', 'cs_software_engineering', 'Chất lượng', 8, 'bang'),
  ('cs-se-solid', 'cs_software_engineering', 'Chất lượng', 9, 'bang'),
  ('cs-se-devops', 'cs_software_engineering', 'Chất lượng', 10, 'bang')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
