-- Ruby currency migration (phase 1): canonical Ruby fields + legacy coins compatibility.
-- Do not drop legacy columns until every deployed client has stopped using them.

BEGIN;

ALTER TABLE ge10_player_profiles
  ADD COLUMN IF NOT EXISTS ruby INTEGER,
  ADD COLUMN IF NOT EXISTS daily_ruby_earned INTEGER,
  ADD COLUMN IF NOT EXISTS last_ruby_earned_date VARCHAR(10);
UPDATE ge10_player_profiles
SET ruby = COALESCE(ruby, coins, 200),
    daily_ruby_earned = COALESCE(daily_ruby_earned, daily_np_earned, 0),
    last_ruby_earned_date = COALESCE(last_ruby_earned_date, last_np_earned_date, '');
ALTER TABLE ge10_player_profiles
  ALTER COLUMN ruby SET DEFAULT 200,
  ALTER COLUMN ruby SET NOT NULL,
  ALTER COLUMN daily_ruby_earned SET DEFAULT 0,
  ALTER COLUMN daily_ruby_earned SET NOT NULL,
  ALTER COLUMN last_ruby_earned_date SET DEFAULT '',
  ALTER COLUMN last_ruby_earned_date SET NOT NULL;

ALTER TABLE ge10_history_logs ADD COLUMN IF NOT EXISTS ruby_changed INTEGER;
UPDATE ge10_history_logs SET ruby_changed = COALESCE(ruby_changed, coins_changed, 0);
ALTER TABLE ge10_history_logs ALTER COLUMN ruby_changed SET DEFAULT 0;

-- ge10_parent_rewards đã được đổi tên thành ge10_tutor_rewards (xem 20260716_rename_parent_to_tutor.sql).
-- Guard bằng to_regclass để migration cũ này vẫn idempotent trên DB đã chạy rename.
DO $$
BEGIN
  IF to_regclass('public.ge10_parent_rewards') IS NOT NULL THEN
    ALTER TABLE ge10_parent_rewards ADD COLUMN IF NOT EXISTS cost_ruby INTEGER;
    UPDATE ge10_parent_rewards SET cost_ruby = COALESCE(cost_ruby, cost_coins);
    ALTER TABLE ge10_parent_rewards ALTER COLUMN cost_ruby SET NOT NULL;
  END IF;
END $$;

ALTER TABLE ge10_reward_redemptions ADD COLUMN IF NOT EXISTS cost_ruby INTEGER;
UPDATE ge10_reward_redemptions SET cost_ruby = COALESCE(cost_ruby, cost_coins);
ALTER TABLE ge10_reward_redemptions ALTER COLUMN cost_ruby SET NOT NULL;

ALTER TABLE ge10_game_sessions
  ADD COLUMN IF NOT EXISTS ruby_gained INTEGER,
  ADD COLUMN IF NOT EXISTS coins_gained INTEGER DEFAULT 0;
UPDATE ge10_game_sessions SET ruby_gained = COALESCE(ruby_gained, coins_gained, 0);
ALTER TABLE ge10_game_sessions ALTER COLUMN ruby_gained SET DEFAULT 0;

CREATE OR REPLACE FUNCTION ge10_sync_session_ruby_legacy()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.ruby_gained := COALESCE(NEW.ruby_gained, NEW.coins_gained, 0);
    NEW.coins_gained := NEW.ruby_gained;
  ELSIF NEW.ruby_gained IS DISTINCT FROM OLD.ruby_gained THEN
    NEW.coins_gained := NEW.ruby_gained;
  ELSIF NEW.coins_gained IS DISTINCT FROM OLD.coins_gained THEN
    NEW.ruby_gained := NEW.coins_gained;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ge10_session_ruby_legacy ON ge10_game_sessions;
CREATE TRIGGER trg_ge10_session_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_game_sessions
FOR EACH ROW EXECUTE FUNCTION ge10_sync_session_ruby_legacy();

CREATE TABLE IF NOT EXISTS ge10_class_rewards (
  id VARCHAR(255) PRIMARY KEY,
  teacher_id VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  cost_ruby INTEGER NOT NULL DEFAULT 200,
  cost_coins INTEGER,
  quantity INTEGER NOT NULL DEFAULT 5,
  remaining INTEGER NOT NULL DEFAULT 5,
  created_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS ge10_class_reward_redemptions (
  id VARCHAR(255) PRIMARY KEY,
  class_reward_id VARCHAR(255) NOT NULL REFERENCES ge10_class_rewards(id) ON DELETE CASCADE,
  student_id VARCHAR(255) NOT NULL REFERENCES ge10_users(id) ON DELETE CASCADE,
  reward_title VARCHAR(500) NOT NULL,
  cost_ruby INTEGER NOT NULL,
  cost_coins INTEGER,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  requested_at BIGINT NOT NULL,
  delivered_at BIGINT
);
CREATE INDEX IF NOT EXISTS idx_ge10_class_rewards_teacher ON ge10_class_rewards(teacher_id);
CREATE INDEX IF NOT EXISTS idx_ge10_crr_student ON ge10_class_reward_redemptions(student_id);
CREATE INDEX IF NOT EXISTS idx_ge10_crr_reward ON ge10_class_reward_redemptions(class_reward_id);

DO $$
BEGIN
  IF to_regclass('public.ge10_class_rewards') IS NOT NULL THEN
    ALTER TABLE ge10_class_rewards ADD COLUMN IF NOT EXISTS cost_ruby INTEGER;
    UPDATE ge10_class_rewards SET cost_ruby = COALESCE(cost_ruby, cost_coins);
    ALTER TABLE ge10_class_rewards ALTER COLUMN cost_ruby SET NOT NULL;
  END IF;
  IF to_regclass('public.ge10_class_reward_redemptions') IS NOT NULL THEN
    ALTER TABLE ge10_class_reward_redemptions ADD COLUMN IF NOT EXISTS cost_ruby INTEGER;
    UPDATE ge10_class_reward_redemptions SET cost_ruby = COALESCE(cost_ruby, cost_coins);
    ALTER TABLE ge10_class_reward_redemptions ALTER COLUMN cost_ruby SET NOT NULL;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION ge10_sync_player_ruby_legacy()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.ruby := COALESCE(NEW.ruby, NEW.coins, 200);
    NEW.coins := NEW.ruby;
    NEW.daily_ruby_earned := COALESCE(NEW.daily_ruby_earned, NEW.daily_np_earned, 0);
    NEW.daily_np_earned := NEW.daily_ruby_earned;
    NEW.last_ruby_earned_date := COALESCE(NEW.last_ruby_earned_date, NEW.last_np_earned_date, '');
    NEW.last_np_earned_date := NEW.last_ruby_earned_date;
  ELSE
    IF NEW.ruby IS DISTINCT FROM OLD.ruby THEN NEW.coins := NEW.ruby;
    ELSIF NEW.coins IS DISTINCT FROM OLD.coins THEN NEW.ruby := NEW.coins;
    END IF;
    IF NEW.daily_ruby_earned IS DISTINCT FROM OLD.daily_ruby_earned THEN NEW.daily_np_earned := NEW.daily_ruby_earned;
    ELSIF NEW.daily_np_earned IS DISTINCT FROM OLD.daily_np_earned THEN NEW.daily_ruby_earned := NEW.daily_np_earned;
    END IF;
    IF NEW.last_ruby_earned_date IS DISTINCT FROM OLD.last_ruby_earned_date THEN NEW.last_np_earned_date := NEW.last_ruby_earned_date;
    ELSIF NEW.last_np_earned_date IS DISTINCT FROM OLD.last_np_earned_date THEN NEW.last_ruby_earned_date := NEW.last_np_earned_date;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ge10_sync_player_ruby_legacy ON ge10_player_profiles;
CREATE TRIGGER trg_ge10_sync_player_ruby_legacy
BEFORE INSERT OR UPDATE ON ge10_player_profiles
FOR EACH ROW EXECUTE FUNCTION ge10_sync_player_ruby_legacy();

CREATE OR REPLACE FUNCTION ge10_sync_ruby_pair()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'ge10_history_logs' THEN
      NEW.ruby_changed := COALESCE(NEW.ruby_changed, NEW.coins_changed, 0);
      NEW.coins_changed := NEW.ruby_changed;
    ELSE
      NEW.cost_ruby := COALESCE(NEW.cost_ruby, NEW.cost_coins);
      NEW.cost_coins := NEW.cost_ruby;
    END IF;
  ELSIF TG_TABLE_NAME = 'ge10_history_logs' THEN
    IF NEW.ruby_changed IS DISTINCT FROM OLD.ruby_changed THEN NEW.coins_changed := NEW.ruby_changed;
    ELSIF NEW.coins_changed IS DISTINCT FROM OLD.coins_changed THEN NEW.ruby_changed := NEW.coins_changed;
    END IF;
  ELSE
    IF NEW.cost_ruby IS DISTINCT FROM OLD.cost_ruby THEN NEW.cost_coins := NEW.cost_ruby;
    ELSIF NEW.cost_coins IS DISTINCT FROM OLD.cost_coins THEN NEW.cost_ruby := NEW.cost_coins;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ge10_history_ruby_legacy ON ge10_history_logs;
CREATE TRIGGER trg_ge10_history_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_history_logs
FOR EACH ROW EXECUTE FUNCTION ge10_sync_ruby_pair();
DO $$
BEGIN
  IF to_regclass('public.ge10_parent_rewards') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_ge10_parent_reward_ruby_legacy ON ge10_parent_rewards;
    CREATE TRIGGER trg_ge10_parent_reward_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_parent_rewards
    FOR EACH ROW EXECUTE FUNCTION ge10_sync_ruby_pair();
  END IF;
END $$;
DROP TRIGGER IF EXISTS trg_ge10_redemption_ruby_legacy ON ge10_reward_redemptions;
CREATE TRIGGER trg_ge10_redemption_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_reward_redemptions
FOR EACH ROW EXECUTE FUNCTION ge10_sync_ruby_pair();

DO $$
BEGIN
  IF to_regclass('public.ge10_class_rewards') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_ge10_class_reward_ruby_legacy ON ge10_class_rewards;
    CREATE TRIGGER trg_ge10_class_reward_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_class_rewards
    FOR EACH ROW EXECUTE FUNCTION ge10_sync_ruby_pair();
  END IF;
  IF to_regclass('public.ge10_class_reward_redemptions') IS NOT NULL THEN
    DROP TRIGGER IF EXISTS trg_ge10_class_redemption_ruby_legacy ON ge10_class_reward_redemptions;
    CREATE TRIGGER trg_ge10_class_redemption_ruby_legacy BEFORE INSERT OR UPDATE ON ge10_class_reward_redemptions
    FOR EACH ROW EXECUTE FUNCTION ge10_sync_ruby_pair();
  END IF;
END $$;

INSERT INTO ge10_game_settings (setting_key, setting_json)
SELECT 'boss_completion_bonus_ruby', setting_json
FROM ge10_game_settings
WHERE setting_key = 'boss_completion_bonus_np'
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO ge10_game_settings (setting_key, setting_json)
SELECT 'base_ruby', setting_json
FROM ge10_game_settings
WHERE setting_key = 'base_coins'
ON CONFLICT (setting_key) DO NOTHING;

CREATE OR REPLACE FUNCTION ge10_process_ruby_transaction(p_user_id VARCHAR, p_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  current_ruby INTEGER;
BEGIN
  SELECT ruby INTO current_ruby
  FROM ge10_player_profiles
  WHERE user_id = p_user_id
  FOR UPDATE;
  IF NOT FOUND OR current_ruby + p_amount < 0 THEN RETURN FALSE; END IF;
  UPDATE ge10_player_profiles
  SET ruby = ruby + p_amount, server_updated_at = NOW()
  WHERE user_id = p_user_id;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMIT;
