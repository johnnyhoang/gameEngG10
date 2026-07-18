-- SQL migration to link lessons and questions for cs_robot_mechanics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_01'
WHERE id BETWEEN 'cs_robmec_q_001' AND 'cs_robmec_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_02'
WHERE id BETWEEN 'cs_robmec_q_011' AND 'cs_robmec_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_03'
WHERE id BETWEEN 'cs_robmec_q_021' AND 'cs_robmec_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_04'
WHERE id BETWEEN 'cs_robmec_q_031' AND 'cs_robmec_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_05'
WHERE id BETWEEN 'cs_robmec_q_041' AND 'cs_robmec_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_06'
WHERE id BETWEEN 'cs_robmec_q_051' AND 'cs_robmec_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_07'
WHERE id BETWEEN 'cs_robmec_q_061' AND 'cs_robmec_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_08'
WHERE id BETWEEN 'cs_robmec_q_081' AND 'cs_robmec_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robmec_09'
WHERE id BETWEEN 'cs_robmec_q_091' AND 'cs_robmec_q_100';

-- 2. Verify all questions of cs_robot_mechanics are correctly associated with grade_tier=13 and subject='cs_robot_mechanics'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_robot_mechanics'
WHERE id LIKE 'cs_robmec_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_robmec_01', 'mechanics-dynamics', 'boss', 'Thử thách Boss: Quái thú RNEA 🪨', '{"boss_id": "boss_robmec_dyn", "hp": 350, "time_limit": 700}'::jsonb, 100, 55, 110, 'cs_robot_mechanics', 13),
  ('act-boss-cs_robmec_02', 'contact-grippers', 'boss', 'Thử thách Boss: Ma kẹp Friction 🔥', '{"boss_id": "boss_robmec_grip", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_robot_mechanics', 13),
  ('act-boss-cs_robmec_03', 'mobile-locomotion', 'boss', 'Thử thách Boss: Mecanum Chúa ❄️', '{"boss_id": "boss_robmec_loco", "hp": 450, "time_limit": 900}'::jsonb, 100, 65, 130, 'cs_robot_mechanics', 13),
  ('act-boss-cs_robmec_04', 'physics-simulation', 'boss', 'Thử thách Boss: Thần sấm MuJoCo 🌀', '{"boss_id": "boss_robmec_sim", "hp": 500, "time_limit": 1000}'::jsonb, 100, 75, 150, 'cs_robot_mechanics', 13)
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
