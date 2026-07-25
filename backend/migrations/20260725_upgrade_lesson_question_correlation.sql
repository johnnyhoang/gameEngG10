-- Migration: Upgrade Lesson-Question Correlation Schema
-- Date: 2026-07-25

-- 1. Upgrade ge10_lessons table
ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);
ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS scope_code VARCHAR(150);

-- Create indexes on ge10_lessons
CREATE INDEX IF NOT EXISTS idx_ge10_lessons_topic_id ON ge10_lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_ge10_lessons_scope_code ON ge10_lessons(scope_code);

-- 2. Upgrade ge10_custom_questions table
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS related_lesson_ids TEXT[];
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS pedagogical_phase VARCHAR(50) DEFAULT 'comprehension';
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS scope_code VARCHAR(150);

-- Create indexes on ge10_custom_questions
CREATE INDEX IF NOT EXISTS idx_ge10_questions_topic_id ON ge10_custom_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_ge10_questions_scope_code ON ge10_custom_questions(scope_code);
CREATE INDEX IF NOT EXISTS idx_ge10_questions_pedagogical_phase ON ge10_custom_questions(pedagogical_phase);

-- 3. Create Lesson-Question Analytics Table for tracking post-study performance
CREATE TABLE IF NOT EXISTS ge10_lesson_question_analytics (
    id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(255) REFERENCES ge10_lessons(id) ON DELETE CASCADE,
    question_id VARCHAR(255) REFERENCES ge10_custom_questions(id) ON DELETE CASCADE,
    times_attempted_post_study INTEGER DEFAULT 0,
    times_correct_post_study INTEGER DEFAULT 0,
    last_attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lesson_id, question_id)
);
