-- Users Table (linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY, -- Google/Supabase User ID
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Player Profiles Table
CREATE TABLE IF NOT EXISTS player_profiles (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 200,
    wallet_vnd INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    energy INTEGER DEFAULT 100,
    hearts INTEGER DEFAULT 3,
    last_active VARCHAR(100) DEFAULT '',
    badges TEXT[] DEFAULT '{}'::TEXT[]
);

-- Pet States Table
CREATE TABLE IF NOT EXISTS pet_states (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'Rồng Con',
    stage VARCHAR(50) DEFAULT 'egg',
    level INTEGER DEFAULT 1,
    exp INTEGER DEFAULT 0,
    energy INTEGER DEFAULT 100,
    mood VARCHAR(50) DEFAULT 'neutral',
    last_fed VARCHAR(100) DEFAULT ''
);

-- Category rolling stats Table
CREATE TABLE IF NOT EXISTS category_stats (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL,
    total_answered INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    rolling_accuracy DOUBLE PRECISION DEFAULT 0.5,
    UNIQUE(user_id, category)
);

-- History Logs Table
CREATE TABLE IF NOT EXISTS history_logs (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    timestamp BIGINT NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    detail TEXT,
    coins_changed INTEGER DEFAULT 0,
    xp_changed INTEGER DEFAULT 0,
    wallet_changed INTEGER DEFAULT 0
);

-- Parent Payout Rewards Table
CREATE TABLE IF NOT EXISTS parent_rewards (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    cost_coins INTEGER NOT NULL,
    cash_value_vnd INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    timestamp BIGINT NOT NULL
);

-- Active Challenges Table (JSONB format for flexibility)
CREATE TABLE IF NOT EXISTS user_challenges (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    challenges_json JSONB NOT NULL
);

-- Daily Missions Table
CREATE TABLE IF NOT EXISTS daily_missions (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    mission_json JSONB
);

-- Custom / Ingested Questions Table
CREATE TABLE IF NOT EXISTS custom_questions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    options TEXT[], -- array of options for MCQ
    correct_answer TEXT[] NOT NULL,
    explanation TEXT,
    difficulty INTEGER DEFAULT 5,
    source VARCHAR(255)
);
