-- Users Table (linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS ge10_users (
    id VARCHAR(255) PRIMARY KEY, -- Google/Supabase User ID
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Safe migration check for existing tables
ALTER TABLE ge10_users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'student';

-- Player Profiles Table
CREATE TABLE IF NOT EXISTS ge10_player_profiles (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 200,
    wallet_vnd INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    energy INTEGER DEFAULT 1000,
    hearts INTEGER DEFAULT 3,
    last_active VARCHAR(100) DEFAULT '',
    badges TEXT[] DEFAULT '{}'::TEXT[],
    server_updated_at TIMESTAMP DEFAULT NOW()
);

-- Pet States Table
CREATE TABLE IF NOT EXISTS ge10_pet_states (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'Rồng Con',
    stage VARCHAR(50) DEFAULT 'egg',
    level INTEGER DEFAULT 1,
    exp INTEGER DEFAULT 0,
    energy INTEGER DEFAULT 100,
    mood VARCHAR(50) DEFAULT 'neutral',
    last_fed VARCHAR(100) DEFAULT ''
);

-- Category rolling stats Table
CREATE TABLE IF NOT EXISTS ge10_category_stats (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL,
    total_answered INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    rolling_accuracy DOUBLE PRECISION DEFAULT 0.5,
    UNIQUE(user_id, category)
);

-- History Logs Table
CREATE TABLE IF NOT EXISTS ge10_history_logs (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    timestamp BIGINT NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    detail TEXT,
    coins_changed INTEGER DEFAULT 0,
    xp_changed INTEGER DEFAULT 0,
    wallet_changed INTEGER DEFAULT 0
);

-- Parent Payout Rewards Table
CREATE TABLE IF NOT EXISTS ge10_parent_rewards (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    cost_coins INTEGER NOT NULL,
    cash_value_vnd INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    timestamp BIGINT NOT NULL
);

-- Active Challenges Table (JSONB format for flexibility)
CREATE TABLE IF NOT EXISTS ge10_user_challenges (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    challenges_json JSONB NOT NULL
);

-- Daily Missions Table
CREATE TABLE IF NOT EXISTS ge10_daily_missions (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    mission_json JSONB
);

-- Global Game Settings Table
CREATE TABLE IF NOT EXISTS ge10_game_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_json JSONB NOT NULL
);

INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES (
    'boss_bounties_vnd',
    '{"2024": 10000, "2025": 15000, "2026": 20000}'::jsonb
)
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES (
    'challenge_energy_costs',
    '{"1": 10, "2": 10, "3": 15, "4": 10}'::jsonb
)
ON CONFLICT (setting_key) DO NOTHING;

-- Custom / Ingested Questions Table
CREATE TABLE IF NOT EXISTS ge10_custom_questions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    options TEXT[], -- array of options for MCQ
    correct_answer TEXT[] NOT NULL,
    explanation TEXT,
    difficulty INTEGER DEFAULT 5,
    source VARCHAR(255),
    subject VARCHAR(50) DEFAULT 'english',
    image_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Force promote hoang.hoa@gmail.com to admin (in case they pre-existed in DB as student)
UPDATE ge10_users SET role = 'admin' WHERE email = 'hoang.hoa@gmail.com';

-- Lessons Table
CREATE TABLE IF NOT EXISTS ge10_lessons (
    id VARCHAR(255) PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    theory TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Lesson Progress Table
CREATE TABLE IF NOT EXISTS ge10_user_lessons_progress (
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(255) REFERENCES ge10_lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, lesson_id)
);

-- Add lesson_id to custom questions table
ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS lesson_id VARCHAR(255) REFERENCES ge10_lessons(id) ON DELETE SET NULL;
