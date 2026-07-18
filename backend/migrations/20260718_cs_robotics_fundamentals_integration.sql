-- SQL migration to link lessons and questions for cs_robotics_fundamentals (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
-- (Already handled during seed, but double check and reinforce here)
UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_01'
WHERE id BETWEEN 'cs_robfun_q_001' AND 'cs_robfun_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_02'
WHERE id BETWEEN 'cs_robfun_q_011' AND 'cs_robfun_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_03'
WHERE id BETWEEN 'cs_robfun_q_021' AND 'cs_robfun_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_04'
WHERE id BETWEEN 'cs_robfun_q_031' AND 'cs_robfun_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_05'
WHERE id BETWEEN 'cs_robfun_q_041' AND 'cs_robfun_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_06'
WHERE id BETWEEN 'cs_robfun_q_051' AND 'cs_robfun_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_07'
WHERE id BETWEEN 'cs_robfun_q_061' AND 'cs_robfun_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_08'
WHERE id BETWEEN 'cs_robfun_q_071' AND 'cs_robfun_q_080';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_09'
WHERE id BETWEEN 'cs_robfun_q_081' AND 'cs_robfun_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robfun_10'
WHERE id BETWEEN 'cs_robfun_q_091' AND 'cs_robfun_q_100';

-- 2. Verify all questions of cs_robotics_fundamentals are correctly associated with grade_tier=13 and subject='cs_robotics_fundamentals'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_robotics_fundamentals'
WHERE id LIKE 'cs_robfun_q_%';

-- 3. Create active challenges / activities configs for this subject
-- (We will seed dynamic activities in seedTopicsAndActivities helper but we register standard blueprints here)
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_robfun_01', 'robot-introduction', 'boss', 'Thử thách Boss: Sư phụ C-Space 🪨', '{"boss_id": "boss_robfun_intro", "hp": 300, "time_limit": 600}'::jsonb, 100, 50, 100, 'cs_robotics_fundamentals', 13),
  ('act-boss-cs_robfun_02', 'robot-kinematics', 'boss', 'Thử thách Boss: Ma vương D-H 🔥', '{"boss_id": "boss_robfun_kin", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_robotics_fundamentals', 13),
  ('act-boss-cs_robfun_03', 'robot-sensing', 'boss', 'Thử thách Boss: Chúa tể ROS2 ❄️', '{"boss_id": "boss_robfun_sens", "hp": 350, "time_limit": 700}'::jsonb, 100, 55, 110, 'cs_robotics_fundamentals', 13),
  ('act-boss-cs_robfun_04', 'robot-control', 'boss', 'Thử thách Boss: Vua PID 🌀', '{"boss_id": "boss_robfun_ctrl", "hp": 450, "time_limit": 900}'::jsonb, 100, 70, 140, 'cs_robotics_fundamentals', 13)
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

COMMIT;
