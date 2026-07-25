-- Create Tutor Quests Table for student assigned tasks
CREATE TABLE IF NOT EXISTS ge10_tutor_quests (
    id VARCHAR(255) PRIMARY KEY,
    tutor_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    student_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    reward_ruby INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'assigned', -- 'assigned', 'completed', 'claimed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    claimed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_tutor_quests_student ON ge10_tutor_quests(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_quests_tutor ON ge10_tutor_quests(tutor_id);
