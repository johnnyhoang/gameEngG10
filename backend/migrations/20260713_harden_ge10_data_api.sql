-- Lock GameEngG10 application data behind the authenticated Express API.
-- Frontend uses Supabase Auth only; it does not access ge10_* through PostgREST.

BEGIN;

DO $$
DECLARE
  target_table regclass;
BEGIN
  FOR target_table IN
    SELECT c.oid::regclass
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relkind = 'r'
      AND c.relname LIKE 'ge10\_%' ESCAPE '\'
  LOOP
    EXECUTE format('REVOKE ALL PRIVILEGES ON TABLE %s FROM anon, authenticated', target_table);
    EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', target_table);
  END LOOP;
END $$;

-- These functions are internal implementation details. They must not be
-- callable through the public Data API/RPC surface.
DO $$
DECLARE
  target_function regprocedure;
BEGIN
  FOR target_function IN
    SELECT to_regprocedure(function_name)
    FROM unnest(ARRAY[
      'public.ge10_process_np_transaction(character varying,integer)',
      'public.ge10_process_ruby_transaction(character varying,integer)',
      'public.ge10_sync_player_ruby_legacy()',
      'public.ge10_sync_ruby_pair()',
      'public.ge10_sync_session_ruby_legacy()'
    ]) AS function_name
    WHERE to_regprocedure(function_name) IS NOT NULL
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', target_function);
  END LOOP;
END $$;

COMMIT;

-- Rollback (run only after explicit approval):
-- BEGIN;
-- DO $$
-- DECLARE target_table regclass;
-- BEGIN
--   FOR target_table IN
--     SELECT c.oid::regclass
--     FROM pg_class c
--     JOIN pg_namespace n ON n.oid = c.relnamespace
--     WHERE n.nspname = 'public'
--       AND c.relkind = 'r'
--       AND c.relname LIKE 'ge10\_%' ESCAPE '\'
--   LOOP
--     EXECUTE format('ALTER TABLE %s DISABLE ROW LEVEL SECURITY', target_table);
--     EXECUTE format('GRANT ALL PRIVILEGES ON TABLE %s TO anon, authenticated', target_table);
--   END LOOP;
-- END $$;
-- GRANT EXECUTE ON FUNCTION public.ge10_process_np_transaction(VARCHAR, INTEGER) TO PUBLIC;
-- GRANT EXECUTE ON FUNCTION public.ge10_process_ruby_transaction(VARCHAR, INTEGER) TO PUBLIC;
-- GRANT EXECUTE ON FUNCTION public.ge10_sync_player_ruby_legacy() TO PUBLIC;
-- GRANT EXECUTE ON FUNCTION public.ge10_sync_ruby_pair() TO PUBLIC;
-- GRANT EXECUTE ON FUNCTION public.ge10_sync_session_ruby_legacy() TO PUBLIC;
-- COMMIT;
