-- SQL migration to link lessons and questions for cs_specialized_robotics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_01'
WHERE id BETWEEN 'cs_spcrob_q_001' AND 'cs_spcrob_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_02'
WHERE id BETWEEN 'cs_spcrob_q_011' AND 'cs_spcrob_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_03'
WHERE id BETWEEN 'cs_spcrob_q_021' AND 'cs_spcrob_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_04'
WHERE id BETWEEN 'cs_spcrob_q_031' AND 'cs_spcrob_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_05'
WHERE id BETWEEN 'cs_spcrob_q_041' AND 'cs_spcrob_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_06'
WHERE id BETWEEN 'cs_spcrob_q_051' AND 'cs_spcrob_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_07'
WHERE id BETWEEN 'cs_spcrob_q_061' AND 'cs_spcrob_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_08'
WHERE id BETWEEN 'cs_spcrob_q_081' AND 'cs_spcrob_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_spcrob_09'
WHERE id BETWEEN 'cs_spcrob_q_091' AND 'cs_spcrob_q_100';

-- 2. Verify all questions of cs_specialized_robotics are correctly associated with grade_tier=13 and subject='cs_specialized_robotics'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_specialized_robotics'
WHERE id LIKE 'cs_spcrob_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_spcrob_01', 'soft-medical', 'boss', 'Thử thách Boss: Y vương Da Vinci 🪨', '{"boss_id": "boss_spcrob_dav", "hp": 420, "time_limit": 840}'::jsonb, 100, 65, 130, 'cs_specialized_robotics', 13),
  ('act-boss-cs_spcrob_02', 'underwater-aerial', 'boss', 'Thử thách Boss: Quái thú Sonar 3D 🔥', '{"boss_id": "boss_spcrob_son", "hp": 480, "time_limit": 960}'::jsonb, 100, 70, 140, 'cs_specialized_robotics', 13),
  ('act-boss-cs_spcrob_03', 'space-humanoid', 'boss', 'Thử thách Boss: Robot Curiosity ❄️', '{"boss_id": "boss_spcrob_cur", "hp": 520, "time_limit": 1040}'::jsonb, 100, 80, 160, 'cs_specialized_robotics', 13),
  ('act-boss-cs_spcrob_04', 'bio-exoskeleton', 'boss', 'Thử thách Boss: Thần mã leo tường Gecko 🌀', '{"boss_id": "boss_spcrob_gec", "hp": 580, "time_limit": 1160}'::jsonb, 100, 90, 180, 'cs_specialized_robotics', 13)
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
