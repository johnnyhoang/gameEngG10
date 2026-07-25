-- Migration to clean up legacy coins and NP columns, ensuring ruby is the single source of currency truth.

-- 1. Drop legacy columns from ge10_users if exist
ALTER TABLE ge10_users DROP COLUMN IF EXISTS coins CASCADE;

-- 2. Drop legacy columns from ge10_player_profiles if exist
ALTER TABLE ge10_player_profiles DROP COLUMN IF EXISTS coins CASCADE;

-- 3. Drop legacy columns from ge10_rewards if exist
ALTER TABLE ge10_rewards DROP COLUMN IF EXISTS cost_coins CASCADE;

-- 4. Drop legacy columns from ge10_reward_redemptions if exist
ALTER TABLE ge10_reward_redemptions DROP COLUMN IF EXISTS cost_coins CASCADE;

-- 5. Drop legacy columns from ge10_class_rewards if exist
ALTER TABLE ge10_class_rewards DROP COLUMN IF EXISTS cost_coins CASCADE;

-- 6. Drop legacy columns from ge10_class_reward_redemptions if exist
ALTER TABLE ge10_class_reward_redemptions DROP COLUMN IF EXISTS cost_coins CASCADE;

-- 7. Drop legacy columns from ge10_challenges if exist
ALTER TABLE ge10_challenges DROP COLUMN IF EXISTS reward_coins CASCADE;

-- 8. Drop legacy columns from ge10_game_settings if exist
ALTER TABLE ge10_game_settings DROP COLUMN IF EXISTS base_coins CASCADE;
ALTER TABLE ge10_game_settings DROP COLUMN IF EXISTS boss_completion_bonus_np;
