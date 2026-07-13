CREATE TABLE IF NOT EXISTS ge10_riddle_history (
  id BIGSERIAL PRIMARY KEY,
  profile_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
  mode VARCHAR(50) NOT NULL CHECK (mode IN ('ruby-riddle', 'encounter-sprint')),
  question_id VARCHAR(255) NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_riddle_history_profile_mode_used
  ON ge10_riddle_history(profile_id, mode, used_at DESC);

DO $$
BEGIN
  IF to_regclass('public.ge10_gatekeeper_history') IS NOT NULL THEN
    INSERT INTO ge10_riddle_history (profile_id, mode, question_id, used_at)
    SELECT student_id, 'ruby-riddle', question_id, used_at
    FROM ge10_gatekeeper_history legacy
    WHERE NOT EXISTS (
      SELECT 1
      FROM ge10_riddle_history current_history
      WHERE current_history.profile_id = legacy.student_id
        AND current_history.mode = 'ruby-riddle'
        AND current_history.question_id = legacy.question_id
        AND current_history.used_at = legacy.used_at
    );

    DROP TABLE ge10_gatekeeper_history;
  END IF;
END $$;
