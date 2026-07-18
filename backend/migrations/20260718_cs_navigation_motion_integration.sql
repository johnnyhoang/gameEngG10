-- SQL migration to link lessons and questions for cs_navigation_motion (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_01'
WHERE id BETWEEN 'cs_navmot_q_001' AND 'cs_navmot_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_02'
WHERE id BETWEEN 'cs_navmot_q_011' AND 'cs_navmot_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_03'
WHERE id BETWEEN 'cs_navmot_q_021' AND 'cs_navmot_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_04'
WHERE id BETWEEN 'cs_navmot_q_031' AND 'cs_navmot_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_05'
WHERE id BETWEEN 'cs_navmot_q_041' AND 'cs_navmot_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_06'
WHERE id BETWEEN 'cs_navmot_q_051' AND 'cs_navmot_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_07'
WHERE id BETWEEN 'cs_navmot_q_061' AND 'cs_navmot_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_08'
WHERE id BETWEEN 'cs_navmot_q_081' AND 'cs_navmot_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_navmot_09'
WHERE id BETWEEN 'cs_navmot_q_091' AND 'cs_navmot_q_100';

-- 2. Verify all questions of cs_navigation_motion are correctly associated with grade_tier=13 and subject='cs_navigation_motion'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_navigation_motion'
WHERE id LIKE 'cs_navmot_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_navmot_01', 'costmap-localization', 'boss', 'Thử thách Boss: Sứ giả AMCL 🪨', '{"boss_id": "boss_navmot_amcl", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_navigation_motion', 13),
  ('act-boss-cs_navmot_02', 'kinematic-models', 'boss', 'Thử thách Boss: Ma xe Ackermann 🔥', '{"boss_id": "boss_navmot_ack", "hp": 450, "time_limit": 900}'::jsonb, 100, 65, 130, 'cs_navigation_motion', 13),
  ('act-boss-cs_navmot_03', 'path-tracking', 'boss', 'Thử thách Boss: Vua đường Stanley ❄️', '{"boss_id": "boss_navmot_stan", "hp": 500, "time_limit": 1000}'::jsonb, 100, 75, 150, 'cs_navigation_motion', 13),
  ('act-boss-cs_navmot_04', 'trajectory-recovery', 'boss', 'Thử thách Boss: Chúa tể Quintic Spline 🌀', '{"boss_id": "boss_navmot_spline", "hp": 550, "time_limit": 1100}'::jsonb, 100, 85, 170, 'cs_navigation_motion', 13)
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
