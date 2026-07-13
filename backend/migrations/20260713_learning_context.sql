-- Canonical LearningContext migration: grade + subject are data attributes.
-- Existing canonical content is Grade 9. Grade-specific source files are not
-- imported here; their compatibility adapters will write explicit context.

BEGIN;

ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS grade_tier INTEGER;
UPDATE ge10_lessons SET grade_tier = 9 WHERE grade_tier IS NULL;
ALTER TABLE ge10_lessons ALTER COLUMN grade_tier SET NOT NULL;

ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS grade_tier INTEGER;
UPDATE ge10_custom_questions
SET grade_tier = COALESCE(
  grade_tier,
  CASE WHEN metadata->>'gradeTier' ~ '^(6|7|8|9|10|11|12)$'
    THEN (metadata->>'gradeTier')::INTEGER END,
  9
);
ALTER TABLE ge10_custom_questions ALTER COLUMN grade_tier SET NOT NULL;

ALTER TABLE ge10_topics ADD COLUMN IF NOT EXISTS grade_tier INTEGER;
UPDATE ge10_topics SET grade_tier = 9 WHERE grade_tier IS NULL;
ALTER TABLE ge10_topics ALTER COLUMN grade_tier SET NOT NULL;

ALTER TABLE ge10_activities
  ADD COLUMN IF NOT EXISTS grade_tier INTEGER,
  ADD COLUMN IF NOT EXISTS subject VARCHAR(50);
UPDATE ge10_activities activity
SET grade_tier = COALESCE(activity.grade_tier, topic.grade_tier, 9),
    subject = COALESCE(activity.subject, topic.subject)
FROM ge10_topics topic
WHERE topic.id = activity.topic_id
  AND (activity.grade_tier IS NULL OR activity.subject IS NULL);
UPDATE ge10_activities SET grade_tier = 9 WHERE grade_tier IS NULL;
UPDATE ge10_activities SET subject = 'english' WHERE subject IS NULL;
ALTER TABLE ge10_activities ALTER COLUMN grade_tier SET NOT NULL;
ALTER TABLE ge10_activities ALTER COLUMN subject SET NOT NULL;

ALTER TABLE ge10_grade_lesson_progress ADD COLUMN IF NOT EXISTS subject VARCHAR(50);
ALTER TABLE ge10_grade_quiz_results ADD COLUMN IF NOT EXISTS subject VARCHAR(50);
-- These tables are empty in the production preflight. Future writes must pass subject explicitly.
UPDATE ge10_grade_lesson_progress SET subject = 'english' WHERE subject IS NULL;
UPDATE ge10_grade_quiz_results SET subject = 'english' WHERE subject IS NULL;
ALTER TABLE ge10_grade_lesson_progress ALTER COLUMN subject SET NOT NULL;
ALTER TABLE ge10_grade_quiz_results ALTER COLUMN subject SET NOT NULL;
ALTER TABLE ge10_game_sessions ADD COLUMN IF NOT EXISTS grade_tier INTEGER;
UPDATE ge10_game_sessions SET grade_tier = 9 WHERE grade_tier IS NULL;
ALTER TABLE ge10_game_sessions ALTER COLUMN grade_tier SET NOT NULL;
ALTER TABLE ge10_grade_lesson_progress DROP CONSTRAINT IF EXISTS ge10_grade_lesson_progress_pkey;
ALTER TABLE ge10_grade_lesson_progress ADD PRIMARY KEY (user_id, grade_tier, subject, lesson_id);

CREATE INDEX IF NOT EXISTS idx_ge10_lessons_context ON ge10_lessons (grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_questions_context ON ge10_custom_questions (grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_topics_context ON ge10_topics (grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_activities_context ON ge10_activities (grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_lesson_progress_context ON ge10_grade_lesson_progress (user_id, grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_quiz_results_context ON ge10_grade_quiz_results (user_id, grade_tier, subject);
CREATE INDEX IF NOT EXISTS idx_ge10_game_sessions_context ON ge10_game_sessions (user_id, grade_tier, subject);

COMMIT;
