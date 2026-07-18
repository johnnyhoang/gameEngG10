-- SQL migration to link lessons and questions for cs_robotics_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_01'
WHERE id BETWEEN 'cs_robeng_q_001' AND 'cs_robeng_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_02'
WHERE id BETWEEN 'cs_robeng_q_011' AND 'cs_robeng_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_03'
WHERE id BETWEEN 'cs_robeng_q_021' AND 'cs_robeng_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_04'
WHERE id BETWEEN 'cs_robeng_q_031' AND 'cs_robeng_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_05'
WHERE id BETWEEN 'cs_robeng_q_041' AND 'cs_robeng_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_06'
WHERE id BETWEEN 'cs_robeng_q_051' AND 'cs_robeng_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_07'
WHERE id BETWEEN 'cs_robeng_q_061' AND 'cs_robeng_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_08'
WHERE id BETWEEN 'cs_robeng_q_081' AND 'cs_robeng_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robeng_09'
WHERE id BETWEEN 'cs_robeng_q_091' AND 'cs_robeng_q_100';

-- 2. Verify all questions of cs_robotics_engineering are correctly associated with grade_tier=13 and subject='cs_robotics_engineering'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_robotics_engineering'
WHERE id LIKE 'cs_robeng_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_robeng_01', 'design-simulation', 'boss', 'Thử thách Boss: Ma vương URDF 🪨', '{"boss_id": "boss_robeng_urdf", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_robotics_engineering', 13),
  ('act-boss-cs_robeng_02', 'integration-qos', 'boss', 'Thử thách Boss: Sứ giả FastDDS 🔥', '{"boss_id": "boss_robeng_dds", "hp": 450, "time_limit": 900}'::jsonb, 100, 65, 130, 'cs_robotics_engineering', 13),
  ('act-boss-cs_robeng_03', 'testing-calibration', 'boss', 'Thử thách Boss: Chúa tể HIL ❄️', '{"boss_id": "boss_robeng_hil", "hp": 500, "time_limit": 1000}'::jsonb, 100, 75, 150, 'cs_robotics_engineering', 13),
  ('act-boss-cs_robeng_04', 'safety-packaging', 'boss', 'Thử thách Boss: Vua an toàn ISO 🌀', '{"boss_id": "boss_robeng_iso", "hp": 550, "time_limit": 1100}'::jsonb, 100, 85, 170, 'cs_robotics_engineering', 13)
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
