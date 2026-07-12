-- Users Table (linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS ge10_users (
    id VARCHAR(255) PRIMARY KEY, -- Profile ID (generated uuid)
    account_id VARCHAR(255) NOT NULL, -- Google/Supabase User ID
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Safe migration check for existing tables
ALTER TABLE ge10_users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'student';
ALTER TABLE ge10_users ADD COLUMN IF NOT EXISTS account_id VARCHAR(255);
UPDATE ge10_users SET account_id = id WHERE account_id IS NULL;
ALTER TABLE ge10_users ALTER COLUMN account_id SET NOT NULL;
ALTER TABLE ge10_users DROP CONSTRAINT IF EXISTS ge10_users_email_key;
ALTER TABLE ge10_users DROP COLUMN IF EXISTS family_id;
-- Profile deactivation support (soft delete): is_active = false thay vì DELETE
ALTER TABLE ge10_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;


-- Family Links Table (Multi-Profile & Secondary Parents)
CREATE TABLE IF NOT EXISTS ge10_family_links (
    id VARCHAR(255) PRIMARY KEY,
    parent_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    student_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending_student', 'pending_parent', 'active'
    link_type VARCHAR(20) DEFAULT 'primary', -- 'primary', 'secondary'
    secondary_permissions JSONB DEFAULT '{"can_approve_rewards": false, "can_create_missions": false, "read_only": true}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(parent_id, student_id)
);

-- Player Profiles Table
CREATE TABLE IF NOT EXISTS ge10_player_profiles (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 200,
    streak INTEGER DEFAULT 0,
    energy INTEGER DEFAULT 1000,
    hearts INTEGER DEFAULT 3,
    last_active VARCHAR(100) DEFAULT '',
    badges TEXT[] DEFAULT '{}'::TEXT[],
    daily_np_earned INTEGER DEFAULT 0,
    last_np_earned_date VARCHAR(10) DEFAULT '',
    daily_skips JSONB DEFAULT '{"date": "", "count": 0}'::jsonb,
    ui_theme VARCHAR(50) DEFAULT 'current',
    server_updated_at TIMESTAMP DEFAULT NOW()
);

-- App không quản lý tiền nữa (CORE_SPECS §3.2) — Ví VND bị bãi bỏ hoàn toàn.
ALTER TABLE ge10_player_profiles DROP COLUMN IF EXISTS wallet_vnd;

-- Chân Khí v2 (SUB_SPEC_ENERGY.md) — maxEnergy/resetHours là cấu hình RIÊNG từng con,
-- không còn dùng ge10_game_settings global nữa (mỗi con một mức do chủ nhiệm chỉnh ở Ngân Các).
ALTER TABLE ge10_player_profiles ALTER COLUMN energy SET DEFAULT 100;
ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS max_energy INTEGER NOT NULL DEFAULT 100;
ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS reset_hours INTEGER NOT NULL DEFAULT 3;
ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS energy_depleted_at BIGINT;
-- Chặn tràn: hồ sơ cũ (thời maxEnergy=1000) có thể đang có energy > 100 mới, hạ về đúng trần mới.
UPDATE ge10_player_profiles SET energy = max_energy WHERE energy > max_energy;
-- max_energy cũ là setting global — bỏ hẳn, không còn ai đọc key này nữa.
DELETE FROM ge10_game_settings WHERE setting_key = 'max_energy';

-- Luật Bất Thoái (CORE_SPECS §7.4.4): Đẳng Cấp Môn Phái cao nhất từng đạt theo từng môn,
-- key = SubjectId, value = order (0-5 trong SECT_MASTERY_RANKS) — không bao giờ tự hạ.
ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS max_achieved_mastery_rank JSONB DEFAULT '{}'::jsonb;

-- Pet States Table
CREATE TABLE IF NOT EXISTS ge10_pet_states (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    name VARCHAR(255) DEFAULT 'Heo Con',
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

-- Phần Thưởng Thực Tế (Reward Catalog) — CORE_SPECS §3.2. Do chủ nhiệm tự tạo, định giá NP,
-- có số lượng giới hạn. Đây CHỈ là catalog item — một lượt đổi cụ thể nằm ở ge10_reward_redemptions.
CREATE TABLE IF NOT EXISTS ge10_parent_rewards (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    cost_coins INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    remaining_quantity INTEGER NOT NULL DEFAULT 1,
    timestamp BIGINT NOT NULL
);

-- App không quản lý tiền nữa (CORE_SPECS §3.2) — bỏ tỷ giá cash_value_vnd + status (chuyển sang bảng redemptions).
ALTER TABLE ge10_parent_rewards DROP COLUMN IF EXISTS cash_value_vnd;
ALTER TABLE ge10_parent_rewards DROP COLUMN IF EXISTS status;
ALTER TABLE ge10_parent_rewards ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1;
ALTER TABLE ge10_parent_rewards ADD COLUMN IF NOT EXISTS remaining_quantity INTEGER NOT NULL DEFAULT 1;

-- Một lượt đổi quà cụ thể — trừ NP ngay, chờ chủ nhiệm xác nhận "Đã Trao" ngoài đời (CORE_SPECS §3.2).
CREATE TABLE IF NOT EXISTS ge10_reward_redemptions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    reward_id VARCHAR(255) REFERENCES ge10_parent_rewards(id) ON DELETE SET NULL,
    reward_title VARCHAR(255) NOT NULL,
    cost_coins INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    timestamp BIGINT NOT NULL,
    delivered_at BIGINT
);

CREATE INDEX IF NOT EXISTS idx_reward_redemptions_user ON ge10_reward_redemptions(user_id);

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

-- Bonus Điểm (NP) khi hạ Boss — thay hoàn toàn thưởng VND cũ (CORE_SPECS §2.1). Boss không thưởng tiền.
INSERT INTO ge10_game_settings (setting_key, setting_json)
VALUES (
    'boss_completion_bonus_np',
    '{"easy": 100, "medium": 150, "hard": 200}'::jsonb
)
ON CONFLICT (setting_key) DO NOTHING;
DELETE FROM ge10_game_settings WHERE setting_key = 'boss_bounties_vnd';

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
    metadata JSONB DEFAULT '{}'::jsonb,
    is_confused BOOLEAN DEFAULT FALSE
);

-- Force promote hoang.hoa@gmail.com to admin (in case they pre-existed in DB as student)
UPDATE ge10_users SET role = 'truong_vien' WHERE email = 'hoang.hoa@gmail.com';

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

-- Exploration Progress Table (Fog of War tracking)
CREATE TABLE IF NOT EXISTS ge10_exploration_progress (
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    area_id VARCHAR(255) NOT NULL,
    clear_count INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, area_id)
);

-- Ledger NP Transaction (Stored Procedure) to avoid negative coins and race conditions
CREATE OR REPLACE FUNCTION ge10_process_np_transaction(p_user_id VARCHAR, p_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    current_coins INTEGER;
BEGIN
    -- Lock the row for update to prevent race conditions
    SELECT coins INTO current_coins 
    FROM ge10_player_profiles 
    WHERE user_id = p_user_id 
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    IF current_coins + p_amount < 0 THEN
        RETURN FALSE; -- Insufficient funds
    END IF;

    UPDATE ge10_player_profiles
    SET coins = coins + p_amount, server_updated_at = NOW()
    WHERE user_id = p_user_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS ge10_gatekeeper_history (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
  page_id VARCHAR(50) NOT NULL,
  question_id VARCHAR(50) NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gatekeeper_history_student ON ge10_gatekeeper_history(student_id);
CREATE INDEX IF NOT EXISTS idx_gatekeeper_history_page ON ge10_gatekeeper_history(student_id, page_id);

-- Admin & Parent Audit Logs (Sprint 3)
CREATE TABLE IF NOT EXISTS ge10_audit_logs (
    id VARCHAR(255) PRIMARY KEY,
    actor_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE SET NULL,
    actor_name VARCHAR(255) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_id VARCHAR(255),
    target_name VARCHAR(255),
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Individual Profile Security PINs (Sprint 3)
CREATE TABLE IF NOT EXISTS ge10_users_security (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES ge10_users(id) ON DELETE CASCADE,
    pin_hash VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Student Skip Reviews Queue (Sprint 4)
CREATE TABLE IF NOT EXISTS ge10_skip_reviews (
    id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    question_id VARCHAR(255),
    question_prompt TEXT NOT NULL,
    reason VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Game Sessions Table (Task 7.2)
CREATE TABLE IF NOT EXISTS ge10_game_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES ge10_users(id) ON DELETE CASCADE,
    session_type VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    difficulty_tier VARCHAR(50),
    questions_pool VARCHAR(255)[] NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active',
    answers_summary JSONB DEFAULT '[]'::jsonb,
    xp_gained INTEGER DEFAULT 0,
    coins_gained INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

