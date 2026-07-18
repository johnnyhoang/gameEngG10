-- SQL migration to seed integrations, blueprints, and activities for cs_robot_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_robot_programming
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_robot_programming', 'Part I', 'Hệ điều hành & Kiến trúc phần mềm Robot', 
    'ROS 2 Nodes, Topics, Services, Actions, Cây hành vi (Behavior Trees) và mô hình hóa cấu trúc URDF.', 
    '["ROS 2","DDS","Sequence","Fallback","Selector","link","joint"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Tập trung kiểm tra các lý thuyết kiến trúc phần mềm, truyền thông điệp và mô tả robot.'
  ),
  (
    'cs_robot_programming', 'Part II', 'Động học, Cảm biến & Thị giác máy tính', 
    'Động học thuận/nghịch, ma trận DH parameters, hệ TF2, EKF sensor fusion và xử lý ảnh OpenCV (lọc màu HSV, cv_bridge, Canny).', 
    '["kinematics","DH","Jacobian","TF2","quaternion","sensor fusion","OpenCV","HSV"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng tính toán tọa độ cơ khí, dung hợp dữ liệu cảm biến và xử lý ảnh đầu vào.'
  ),
  (
    'cs_robot_programming', 'Part III', 'Bộ điều khiển PID & Dẫn đường tối ưu (Nav2)', 
    'Thuật toán điều khiển PID động cơ, tinh chỉnh Kp/Ki/Kd, chống bão hòa tích phân, lập kế hoạch A*/Dijkstra và cấu hình Nav2 Costmaps.', 
    '["PID","anti-windup","Nav2","DWA","TEB","Pure Pursuit","Costmap","inflation"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra kỹ năng lập trình vòng lặp điều khiển phản hồi và điều hướng né tránh vật cản động.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_robot_programming
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-rob-software', 'robot-software-architecture', 'boss', 'Thần Khớp URDF Bất Kham', '{"boss_id": "b-rob-software", "boss_tag": "ROS 2", "energy": 100}'::jsonb, 100, 100, 150, 'cs_robot_programming', 13),
  ('act-boss-rob-kinematics', 'robot-kinematics', 'boss', 'Quái Thú Kỳ Dị Singularity', '{"boss_id": "b-rob-kinematics", "boss_tag": "PID", "energy": 100}'::jsonb, 100, 100, 150, 'cs_robot_programming', 13),
  ('act-boss-rob-perception', 'robot-perception', 'boss', 'Yêu Quái Trôi Odometry', '{"boss_id": "b-rob-perception", "boss_tag": "EKF", "energy": 100}'::jsonb, 100, 100, 150, 'cs_robot_programming', 13),
  ('act-boss-rob-navigation', 'robot-navigation', 'boss', 'Ma Vương Kẹt Góc Nav2', '{"boss_id": "b-rob-navigation", "boss_tag": "Cost", "energy": 100}'::jsonb, 100, 100, 150, 'cs_robot_programming', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_robot_programming
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-rob-software', 'robot-software-architecture', 'quiz', 'Luyện tập Cây hành vi & ROS 2', '{"mode": "grammar", "reward": "Ưu tiên thiết kế phần mềm robot và URDF"}'::jsonb, 50, 10, 20, 'cs_robot_programming', 13),
  ('act-quiz-rob-kinematics', 'robot-kinematics', 'quiz', 'Luyện tập Động học & PID', '{"mode": "vocabulary", "reward": "Ưu tiên tính toán động học và tinh chỉnh PID"}'::jsonb, 50, 10, 20, 'cs_robot_programming', 13),
  ('act-quiz-rob-perception', 'robot-perception', 'quiz', 'Luyện tập Cảm biến & OpenCV', '{"mode": "reading", "reward": "Ưu tiên Sensor fusion, SLAM và xử lý ảnh OpenCV"}'::jsonb, 50, 10, 20, 'cs_robot_programming', 13),
  ('act-quiz-rob-navigation', 'robot-navigation', 'quiz', 'Luyện tập Điều hướng & Costmap', '{"mode": "mixed", "reward": "Ưu tiên kế hoạch đường đi và cấu hình Costmap"}'::jsonb, 50, 10, 20, 'cs_robot_programming', 13)
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

-- 4. Seed Textbook Mappings for cs_robot_programming
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-rob-fundamentals', 'cs_robot_programming', 'Kiến trúc', 1, 'thach'),
  ('cs-rob-transforms', 'cs_robot_programming', 'Động học', 2, 'hoa'),
  ('cs-rob-pid-control', 'cs_robot_programming', 'Động học', 3, 'hoa'),
  ('cs-rob-sensor-integration', 'cs_robot_programming', 'Cảm nhận', 4, 'bang'),
  ('cs-rob-slam-localization', 'cs_robot_programming', 'Cảm nhận', 5, 'bang'),
  ('cs-rob-path-planning', 'cs_robot_programming', 'Dẫn đường', 6, 'phong'),
  ('cs-rob-costmaps-safety', 'cs_robot_programming', 'Dẫn đường', 7, 'phong'),
  ('cs-rob-opencv-vision', 'cs_robot_programming', 'Cảm nhận', 8, 'bang'),
  ('cs-rob-behavior-trees', 'cs_robot_programming', 'Kiến trúc', 9, 'thach'),
  ('cs-rob-urdf-simulation', 'cs_robot_programming', 'Kiến trúc', 10, 'thach')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
