-- SQL migration to link lessons and questions for cs_embedded_hardware (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Auto-link questions to their corresponding lessons by lesson_id if not already done
UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_01'
WHERE id BETWEEN 'cs_embhar_q_001' AND 'cs_embhar_q_010';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_02'
WHERE id BETWEEN 'cs_embhar_q_011' AND 'cs_embhar_q_020';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_03'
WHERE id BETWEEN 'cs_embhar_q_021' AND 'cs_embhar_q_030';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_04'
WHERE id BETWEEN 'cs_embhar_q_031' AND 'cs_embhar_q_040';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_05'
WHERE id BETWEEN 'cs_embhar_q_041' AND 'cs_embhar_q_050';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_06'
WHERE id BETWEEN 'cs_embhar_q_051' AND 'cs_embhar_q_060';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_07'
WHERE id BETWEEN 'cs_embhar_q_061' AND 'cs_embhar_q_070';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_08'
WHERE id BETWEEN 'cs_embhar_q_081' AND 'cs_embhar_q_090';

UPDATE ge10_custom_questions
SET lesson_id = 'cs_embhar_09'
WHERE id BETWEEN 'cs_embhar_q_091' AND 'cs_embhar_q_100';

-- 2. Verify all questions of cs_embedded_hardware are correctly associated with grade_tier=13 and subject='cs_embedded_hardware'
UPDATE ge10_custom_questions
SET grade_tier = 13, subject = 'cs_embedded_hardware'
WHERE id LIKE 'cs_embhar_q_%';

-- 3. Create active challenges / activities configs for this subject
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-cs_embhar_01', 'mcu-peripherals', 'boss', 'Thử thách Boss: Sư phụ ngắt ISR 🪨', '{"boss_id": "boss_embhar_isr", "hp": 400, "time_limit": 800}'::jsonb, 100, 60, 120, 'cs_embedded_hardware', 13),
  ('act-boss-cs_embhar_02', 'serial-bus', 'boss', 'Thử thách Boss: Ma trận CAN Bus 🔥', '{"boss_id": "boss_embhar_can", "hp": 450, "time_limit": 900}'::jsonb, 100, 65, 130, 'cs_embedded_hardware', 13),
  ('act-boss-cs_embhar_03', 'rtos-micro-ros', 'boss', 'Thử thách Boss: Vua FreeRTOS ❄️', '{"boss_id": "boss_embhar_rtos", "hp": 500, "time_limit": 1000}'::jsonb, 100, 75, 150, 'cs_embedded_hardware', 13),
  ('act-boss-cs_embhar_04', 'pcb-power', 'boss', 'Thử thách Boss: Thần sấm Pin LiPo 🌀', '{"boss_id": "boss_embhar_lipo", "hp": 550, "time_limit": 1100}'::jsonb, 100, 85, 170, 'cs_embedded_hardware', 13)
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
