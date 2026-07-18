-- SQL migration to link lessons and questions for cs_robot_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_01'
WHERE id BETWEEN 'cs_robint_q_001' AND 'cs_robint_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_02'
WHERE id BETWEEN 'cs_robint_q_011' AND 'cs_robint_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_03'
WHERE id BETWEEN 'cs_robint_q_021' AND 'cs_robint_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_04'
WHERE id BETWEEN 'cs_robint_q_031' AND 'cs_robint_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_05'
WHERE id BETWEEN 'cs_robint_q_041' AND 'cs_robint_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_06'
WHERE id BETWEEN 'cs_robint_q_051' AND 'cs_robint_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_07'
WHERE id BETWEEN 'cs_robint_q_061' AND 'cs_robint_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_08'
WHERE id BETWEEN 'cs_robint_q_081' AND 'cs_robint_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robint_09'
WHERE id BETWEEN 'cs_robint_q_091' AND 'cs_robint_q_100';

-- 2. Verify all questions of cs_robot_intelligence are correctly associated with grade_tier=13 and subject='cs_robot_intelligence'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_robot_intelligence'
WHERE id LIKE 'cs_robint_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_robint_01', 'slam-localization', 'boss', 'Thử thách Boss: Ma trận EKF SLAM 🪨', '{"boss_id": "boss_robint_slam", "hp": 380, "time_limit": 760}'::jsonb, 100, 55, 110, 'cs_robot_intelligence', 13),
  ('act-boss-cs_robint_02', 'path-planning', 'boss', 'Thử thách Boss: Cây thần RRT* 🔥', '{"boss_id": "boss_robint_plan", "hp": 420, "time_limit": 840}'::jsonb, 100, 60, 120, 'cs_robot_intelligence', 13),
  ('act-boss-cs_robint_03', 'robot-vision-rl', 'boss', 'Thử thách Boss: Quái thú PPO RL ❄️', '{"boss_id": "boss_robint_rl", "hp": 480, "time_limit": 960}'::jsonb, 100, 70, 140, 'cs_robot_intelligence', 13),
  ('act-boss-cs_robint_04', 'decision-behavior', 'boss', 'Thử thách Boss: Vua cây BT 🌀', '{"boss_id": "boss_robint_dec", "hp": 520, "time_limit": 1040}'::jsonb, 100, 80, 160, 'cs_robot_intelligence', 13)
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
