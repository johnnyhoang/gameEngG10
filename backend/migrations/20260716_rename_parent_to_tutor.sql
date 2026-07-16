-- Migration: Rename parent → tutor (code là source of truth, DB migrate theo).
-- File này chạy MỖI LẦN boot (initDB) nên mọi bước phải idempotent.
-- Tách từng DO block riêng để một bước lỗi không rollback các bước còn lại.

-- 1. Hợp nhất bảng rewards: ge10_parent_rewards (cũ) → ge10_tutor_rewards (mới).
--    Lưu ý: schema.sql chạy trước đã CREATE ge10_tutor_rewards, nên nhánh rename
--    thuần chỉ xảy ra trên DB chưa từng boot code mới.
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_parent_rewards') THEN
        IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_tutor_rewards') THEN
            -- Cả hai bảng cùng tồn tại: gộp dữ liệu cũ vào bảng mới (id trùng thì giữ bản mới)
            INSERT INTO ge10_tutor_rewards (id, user_id, title, cost_ruby, cost_coins, quantity, remaining_quantity, timestamp)
            SELECT id, user_id, title, cost_ruby, cost_coins, quantity, remaining_quantity, timestamp
            FROM ge10_parent_rewards
            ON CONFLICT (id) DO NOTHING;

            -- FK của ge10_reward_redemptions còn trỏ vào bảng cũ sẽ chặn DROP — gỡ trước
            IF EXISTS (
                SELECT FROM pg_constraint
                WHERE conname = 'ge10_reward_redemptions_reward_id_fkey'
                  AND confrelid = 'ge10_parent_rewards'::regclass
            ) THEN
                ALTER TABLE ge10_reward_redemptions DROP CONSTRAINT ge10_reward_redemptions_reward_id_fkey;
            END IF;

            DROP TABLE ge10_parent_rewards;
        ELSE
            ALTER TABLE ge10_parent_rewards RENAME TO ge10_tutor_rewards;
        END IF;
    END IF;
END $$;

-- 2. Đảm bảo FK reward_id của redemptions trỏ vào ge10_tutor_rewards
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_reward_redemptions')
       AND NOT EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_reward_redemptions_reward_id_fkey') THEN
        -- Dọn các tham chiếu mồ côi trước khi gắn lại FK
        UPDATE ge10_reward_redemptions SET reward_id = NULL
        WHERE reward_id IS NOT NULL
          AND reward_id NOT IN (SELECT id FROM ge10_tutor_rewards);

        ALTER TABLE ge10_reward_redemptions
            ADD CONSTRAINT ge10_reward_redemptions_reward_id_fkey
            FOREIGN KEY (reward_id) REFERENCES ge10_tutor_rewards(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 3. Rename cột parent_id → tutor_id trong ge10_class_links
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'ge10_class_links' AND column_name = 'parent_id') THEN
        ALTER TABLE ge10_class_links RENAME COLUMN parent_id TO tutor_id;
    END IF;
END $$;

-- 4. Rename các constraint còn mang tên family/parent cho khớp naming mới (cosmetic)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_family_links_parent_id_fkey') THEN
        ALTER TABLE ge10_class_links RENAME CONSTRAINT ge10_family_links_parent_id_fkey TO ge10_class_links_tutor_id_fkey;
    END IF;
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_family_links_parent_id_student_id_key') THEN
        ALTER TABLE ge10_class_links RENAME CONSTRAINT ge10_family_links_parent_id_student_id_key TO ge10_class_links_tutor_id_student_id_key;
    END IF;
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_family_links_student_id_fkey') THEN
        ALTER TABLE ge10_class_links RENAME CONSTRAINT ge10_family_links_student_id_fkey TO ge10_class_links_student_id_fkey;
    END IF;
    IF EXISTS (SELECT FROM pg_constraint WHERE conname = 'ge10_family_links_pkey') THEN
        ALTER TABLE ge10_class_links RENAME CONSTRAINT ge10_family_links_pkey TO ge10_class_links_pkey;
    END IF;
END $$;

-- 5. Cập nhật role theo naming mới
UPDATE ge10_users SET role = 'tutor' WHERE role = 'parent';
UPDATE ge10_users SET role = 'secondary_tutor' WHERE role = 'secondary_parent';

-- 6. Cập nhật status liên kết lớp
UPDATE ge10_class_links SET status = 'pending_tutor' WHERE status = 'pending_parent';

-- 7. Cập nhật audit log
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_audit_logs') THEN
        UPDATE ge10_audit_logs SET actor_role = 'tutor' WHERE actor_role = 'parent';
        UPDATE ge10_audit_logs SET actor_role = 'secondary_tutor' WHERE actor_role = 'secondary_parent';
    END IF;
END $$;
