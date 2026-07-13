-- Resolve active profiles efficiently for every authenticated business request.
CREATE INDEX IF NOT EXISTS idx_ge10_users_account_profile_active
  ON public.ge10_users (account_id, id)
  WHERE is_active = TRUE;

-- Never infer or migrate business ownership from account_id, even when an account
-- currently has one profile. Existing rows remain attached to their explicit,
-- foreign-keyed profile ID; application authorization prevents account-scoped writes.
