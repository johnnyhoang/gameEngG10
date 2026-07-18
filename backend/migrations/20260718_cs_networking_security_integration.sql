-- SQL migration to seed integrations, blueprints, and activities for cs_networking_security (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_networking_security
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_networking_security', 'Part I', 'Kiến trúc mạng phân tầng & Tầng ứng dụng', 
    'Mô hình OSI và TCP/IP, đóng gói dữ liệu encapsulation, hoạt động của HTTP/1.1 vs HTTP/2/3 và cơ chế phân giải tên miền DNS.', 
    '["OSI","TCP/IP","HTTP","DNS","Encapsulation","PDU","Port"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng phân tích kiến trúc phân tầng mạng và cơ chế hoạt động của các giao thức tầng ứng dụng.'
  ),
  (
    'cs_networking_security', 'Part II', 'Tầng giao vận, kiểm soát nghẽn & Định tuyến IP', 
    'Bắt tay 3 bước TCP, so sánh TCP vs UDP, kiểm soát luồng sliding window, kiểm soát tắc nghẽn cwnd, chia mạng con CIDR và các thuật toán định tuyến.', 
    '["TCP","UDP","Handshake","cwnd","rwnd","Subnetting","OSPF","Dijkstra","Bellman-Ford"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng tính toán mạng con, phân tích thuật toán định tuyến và cơ chế kiểm soát tắc nghẽn của TCP.'
  ),
  (
    'cs_networking_security', 'Part III', 'Mật mã học, bảo mật kênh truyền & Tấn công mạng', 
    'Mã hóa đối xứng AES, không đối xứng RSA, bắt tay TLS/SSL, tường lửa WAF, IDS/IPS và phòng ngừa các cuộc tấn công SYN Flood, SQLi, XSS, ARP Spoofing.', 
    '["AES","RSA","TLS","Handshake","Firewall","IDS","IPS","SQLi","XSS","DDoS","ARP"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra hiểu biết sâu sắc về các giao thức bảo mật thông tin, mật mã học nâng cao và kỹ thuật phòng thủ tấn công ứng dụng.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_networking_security
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-net-architecture', 'network-architecture', 'boss', 'Ma Vương Giải Mã OSI', '{"boss_id": "b-net-architecture", "boss_tag": "OSI", "energy": 100}'::jsonb, 100, 100, 150, 'cs_networking_security', 13),
  ('act-boss-net-transmission', 'data-transmission', 'boss', 'Ác Thần Nghẽn Mạng Congestion', '{"boss_id": "b-net-transmission", "boss_tag": "TCP", "energy": 100}'::jsonb, 100, 100, 150, 'cs_networking_security', 13),
  ('act-boss-net-cryptography', 'cryptography-protocols', 'boss', 'Quái Nhân Bẻ Khóa RSA', '{"boss_id": "b-net-cryptography", "boss_tag": "RSA", "energy": 100}'::jsonb, 100, 100, 150, 'cs_networking_security', 13),
  ('act-boss-net-defenses', 'system-defenses', 'boss', 'Linh Hồn Chèn Mã SQL Injection', '{"boss_id": "b-net-defenses", "boss_tag": "SQLi", "energy": 100}'::jsonb, 100, 100, 150, 'cs_networking_security', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_networking_security
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-net-architecture', 'network-architecture', 'quiz', 'Luyện tập Phân tầng & HTTP', '{"mode": "grammar", "reward": "Ưu tiên mô hình phân tầng OSI/TCP-IP và các giao thức tầng ứng dụng"}'::jsonb, 50, 10, 20, 'cs_networking_security', 13),
  ('act-quiz-net-transmission', 'data-transmission', 'quiz', 'Luyện tập Giao vận & Định tuyến', '{"mode": "vocabulary", "reward": "Ưu tiên bắt tay TCP, kiểm soát tắc nghẽn và tính toán chia mạng con CIDR"}'::jsonb, 50, 10, 20, 'cs_networking_security', 13),
  ('act-quiz-net-cryptography', 'cryptography-protocols', 'quiz', 'Luyện tập Mật mã & TLS/SSL', '{"mode": "reading", "reward": "Ưu tiên phân biệt mã hóa đối xứng/không đối xứng và TLS handshake"}'::jsonb, 50, 10, 20, 'cs_networking_security', 13),
  ('act-quiz-net-defenses', 'system-defenses', 'quiz', 'Luyện tập Tường lửa & Phòng chống tấn công', '{"mode": "mixed", "reward": "Ưu tiên cấu hình firewall WAF và kỹ thuật chống DDoS/SQLi/XSS"}'::jsonb, 50, 10, 20, 'cs_networking_security', 13)
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

-- 4. Seed Textbook Mappings for cs_networking_security
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-net-osi', 'cs_networking_security', 'Phân tầng', 1, 'thach'),
  ('cs-net-http', 'cs_networking_security', 'Phân tầng', 2, 'thach'),
  ('cs-net-tcp', 'cs_networking_security', 'Truyền tải', 3, 'hoa'),
  ('cs-net-congestion', 'cs_networking_security', 'Truyền tải', 4, 'hoa'),
  ('cs-net-ip', 'cs_networking_security', 'Truyền tải', 5, 'hoa'),
  ('cs-net-mac', 'cs_networking_security', 'Phân tầng', 6, 'thach'),
  ('cs-net-crypto', 'cs_networking_security', 'Bảo mật', 7, 'bang'),
  ('cs-net-tls', 'cs_networking_security', 'Bảo mật', 8, 'bang'),
  ('cs-net-firewall', 'cs_networking_security', 'Bảo mật', 9, 'phong'),
  ('cs-net-attacks', 'cs_networking_security', 'Bảo mật', 10, 'phong')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
