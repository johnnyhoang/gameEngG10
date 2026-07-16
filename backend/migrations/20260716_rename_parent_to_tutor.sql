-- Migration: Rename parent to tutor/mentor
DO $$
BEGIN
    -- 1. Rename table ge10_parent_rewards if exists
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_parent_rewards') THEN
        ALTER TABLE ge10_parent_rewards RENAME TO ge10_tutor_rewards;
    END IF;

    -- 2. Rename column parent_id in ge10_class_links if exists
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'ge10_class_links' AND column_name = 'parent_id') THEN
        ALTER TABLE ge10_class_links RENAME COLUMN parent_id TO tutor_id;
    END IF;

    -- 3. Update roles in ge10_users
    UPDATE ge10_users SET role = 'tutor' WHERE role = 'parent';
    UPDATE ge10_users SET role = 'secondary_tutor' WHERE role = 'secondary_parent';

    -- 4. Update status in ge10_class_links
    UPDATE ge10_class_links SET status = 'pending_tutor' WHERE status = 'pending_parent';

    -- 5. Update audit log roles
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ge10_audit_logs') THEN
        UPDATE ge10_audit_logs SET actor_role = 'tutor' WHERE actor_role = 'parent';
        UPDATE ge10_audit_logs SET actor_role = 'secondary_tutor' WHERE actor_role = 'secondary_parent';
    END IF;
END $$;
