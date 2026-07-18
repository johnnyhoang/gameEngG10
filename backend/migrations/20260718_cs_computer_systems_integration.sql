-- SQL migration to seed integrations, blueprints, and activities for cs_computer_systems (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_computer_systems
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_computer_systems', 'Part I', 'Số học máy tính & Kiến trúc tập lệnh', 
    'Biểu diễn bù 2, số thực dấu phẩy động IEEE 754, tập lệnh hợp ngữ Assembly (PC, SP registers), RISC vs CISC và cơ chế biên dịch/liên kết toolchain.', 
    '["Binary","IEEE 754","Assembly","Registers","PC","Linker","Compilation"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng tính toán hệ nhị phân, phân tích lệnh Assembly cơ bản và cơ chế hoạt động của chuỗi biên dịch.'
  ),
  (
    'cs_computer_systems', 'Part II', 'Hệ thống bộ nhớ, Cache & Phân trang', 
    'Kiến trúc phân cấp bộ nhớ, nguyên lý cục bộ (Locality), ánh xạ Cache Set-Associative, Cache Miss LRU, dịch địa chỉ bộ nhớ ảo Page Table và TLB.', 
    '["Cache","Locality","Tag","Index","LRU","Page Table","TLB","Page Fault"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng thiết kế code tối ưu cache, cơ chế dịch địa chỉ phân trang ảo và xử lý lỗi trang Page Fault.'
  ),
  (
    'cs_computer_systems', 'Part III', 'Thực thi lệnh Pipelining & Bảo mật hệ thống', 
    '5 bước chu kỳ lệnh, Pipelining Hazards, Superscalar Out-of-Order execution, bộ dự đoán nhánh, cơ chế ngắt ngoại vi, DMA và lỗi tràn bộ đệm stack overflow.', 
    '["Pipeline","Hazard","Forwarding","Superscalar","Branch Prediction","Interrupt","DMA","Canary","ASLR","Overflow"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra hiểu biết sâu sắc về tối ưu luồng lệnh CPU, cơ chế DMA truyền dữ liệu trực tiếp và các phương án phòng ngự bảo mật.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_computer_systems
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-sys-arithmetic', 'computer-arithmetic', 'boss', 'Ma Vương Làm Tròn Số Thực', '{"boss_id": "b-sys-arithmetic", "boss_tag": "Float", "energy": 100}'::jsonb, 100, 100, 150, 'cs_computer_systems', 13),
  ('act-boss-sys-architecture', 'processor-architecture', 'boss', 'Quái Nhân Trễ Nhịp Pipelining', '{"boss_id": "b-sys-architecture", "boss_tag": "Hazard", "energy": 100}'::jsonb, 100, 100, 150, 'cs_computer_systems', 13),
  ('act-boss-sys-memory', 'memory-subsystem', 'boss', 'Linh Hồn Trượt Cache Lạnh Giá', '{"boss_id": "b-sys-memory", "boss_tag": "Cache", "energy": 100}'::jsonb, 100, 100, 150, 'cs_computer_systems', 13),
  ('act-boss-sys-security', 'system-security-io', 'boss', 'Ác Linh Tràn Bộ Đệm Stack', '{"boss_id": "b-sys-security", "boss_tag": "Overflow", "energy": 100}'::jsonb, 100, 100, 150, 'cs_computer_systems', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_computer_systems
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-sys-arithmetic', 'computer-arithmetic', 'quiz', 'Luyện tập Nhị phân & IEEE 754', '{"mode": "grammar", "reward": "Ưu tiên biểu diễn số nguyên bù 2 và chuẩn số thực dấu phẩy động"}'::jsonb, 50, 10, 20, 'cs_computer_systems', 13),
  ('act-quiz-sys-architecture', 'processor-architecture', 'quiz', 'Luyện tập Assembly & Pipelining', '{"mode": "vocabulary", "reward": "Ưu tiên tập lệnh Assembly, biên dịch và xung đột đường ống CPU"}'::jsonb, 50, 10, 20, 'cs_computer_systems', 13),
  ('act-quiz-sys-memory', 'memory-subsystem', 'quiz', 'Luyện tập Cache & Bộ nhớ ảo', '{"mode": "reading", "reward": "Ưu tiên thiết kế cache-friendly, bảng trang dịch địa chỉ và TLB"}'::jsonb, 50, 10, 20, 'cs_computer_systems', 13),
  ('act-quiz-sys-security', 'system-security-io', 'quiz', 'Luyện tập Ngắt, DMA & Tràn bộ đệm', '{"mode": "mixed", "reward": "Ưu tiên cơ chế truyền tin I/O, ngắt phần cứng và lỗi bảo mật Stack"}'::jsonb, 50, 10, 20, 'cs_computer_systems', 13)
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

-- 4. Seed Textbook Mappings for cs_computer_systems
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-sys-binary', 'cs_computer_systems', 'Số học', 1, 'thach'),
  ('cs-sys-assembly', 'cs_computer_systems', 'Kiến trúc', 2, 'hoa'),
  ('cs-sys-toolchain', 'cs_computer_systems', 'Kiến trúc', 3, 'hoa'),
  ('cs-sys-hierarchy', 'cs_computer_systems', 'Bộ nhớ', 4, 'bang'),
  ('cs-sys-cache', 'cs_computer_systems', 'Bộ nhớ', 5, 'bang'),
  ('cs-sys-virtual', 'cs_computer_systems', 'Bộ nhớ', 6, 'bang'),
  ('cs-sys-pipelining', 'cs_computer_systems', 'Kiến trúc', 7, 'hoa'),
  ('cs-sys-superscalar', 'cs_computer_systems', 'Kiến trúc', 8, 'hoa'),
  ('cs-sys-interrupts', 'cs_computer_systems', 'Ngoại vi', 9, 'phong'),
  ('cs-sys-bufferoverflow', 'cs_computer_systems', 'Bảo mật', 10, 'phong')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
