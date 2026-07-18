-- SQL migration to link lessons and questions for cs_robot_perception (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_01'
WHERE id BETWEEN 'cs_robper_q_001' AND 'cs_robper_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_02'
WHERE id BETWEEN 'cs_robper_q_011' AND 'cs_robper_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_03'
WHERE id BETWEEN 'cs_robper_q_021' AND 'cs_robper_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_04'
WHERE id BETWEEN 'cs_robper_q_031' AND 'cs_robper_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_05'
WHERE id BETWEEN 'cs_robper_q_041' AND 'cs_robper_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_06'
WHERE id BETWEEN 'cs_robper_q_051' AND 'cs_robper_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_07'
WHERE id BETWEEN 'cs_robper_q_061' AND 'cs_robper_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_08'
WHERE id BETWEEN 'cs_robper_q_081' AND 'cs_robper_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_robper_09'
WHERE id BETWEEN 'cs_robper_q_091' AND 'cs_robper_q_100';

-- 2. Verify all questions of cs_robot_perception are correctly associated with grade_tier=13 and subject='cs_robot_perception'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_robot_perception'
WHERE id LIKE 'cs_robper_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_robper_01', 'camera-geometry', 'boss', 'Thử thách Boss: Ma vương Pinhole 🪨', '{"boss_id": "boss_robper_pin", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_robot_perception', 13),
  ('act-boss-cs_robper_02', 'feature-descriptors', 'boss', 'Thử thách Boss: Sư tổ SIFT/ORB 🔥', '{"boss_id": "boss_robper_feat", "hp": 450, "time_limit": 900}'::jsonb, 100, 65, 130, 'cs_robot_perception', 13),
  ('act-boss-cs_robper_03', 'pointcloud-processing', 'boss', 'Thử thách Boss: Chúa tể RANSAC ❄️', '{"boss_id": "boss_robper_ran", "hp": 500, "time_limit": 1000}'::jsonb, 100, 75, 150, 'cs_robot_perception', 13),
  ('act-boss-cs_robper_04', 'stereo-neural', 'boss', 'Thử thách Boss: Thần sấm U-Net 🌀', '{"boss_id": "boss_robper_unet", "hp": 550, "time_limit": 1100}'::jsonb, 100, 85, 170, 'cs_robot_perception', 13)
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
