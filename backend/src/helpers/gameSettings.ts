import { pool } from '../db.js';

// Các key dưới đây được schema.sql/migration đảm bảo LUÔN tồn tại trong ge10_game_settings
// (import một lần từ giá trị cấu hình gốc — xem schema.sql và
// migrations/20260717_seed_game_settings_and_challenges.sql). Không còn fallback hardcode:
// nếu thiếu, đó là lỗi seed cần sửa migration, không phải trạng thái bình thường để che giấu.

export const loadBossCompletionBonusRuby = async (): Promise<[number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'boss_completion_bonus_ruby'"
  );
  const raw = res.rows[0]?.setting_json;
  return [Number(raw['easy']), Number(raw['medium']), Number(raw['hard'])];
};

export const loadChallengeEnergyCosts = async (): Promise<[number, number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'challenge_energy_costs'"
  );
  const raw = res.rows[0]?.setting_json;
  return [Number(raw['1']), Number(raw['2']), Number(raw['3']), Number(raw['4'])];
};

export const loadMaxEnergy = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'max_energy'"
  );
  const raw = res.rows[0]?.setting_json;
  return Number(raw?.['value'] ?? 1000);
};

export const loadBaseXP = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_xp'"
  );
  const raw = res.rows[0]?.setting_json;
  return Number(raw['value']);
};

export const loadBaseRuby = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_ruby'"
  );
  const raw = res.rows[0]?.setting_json;
  return Number(raw['value']);
};

export const loadThemeUnlockCost = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'theme_unlock_cost'"
  );
  const raw = res.rows[0]?.setting_json;
  return Number(raw['value']);
};

export const saveThemeUnlockCost = async (themeUnlockCost: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('theme_unlock_cost', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: themeUnlockCost })]
  );
};

export const loadChallengeTemplates = async (): Promise<any[]> => {
  const res = await pool.query('SELECT * FROM ge10_challenge_templates ORDER BY sort_order');
  return res.rows.map(row => ({
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description,
    targetCount: row.target_count,
    currentCount: 0,
    rewardRuby: row.reward_ruby,
    rewardXP: row.reward_xp,
    category: row.category || undefined,
    completed: false
  }));
};

/** Khởi tạo danh sách nhiệm vụ (challenges) ban đầu cho một hồ sơ học sinh mới, từ
 * ge10_challenge_templates — thay cho mảng hardcode INITIAL_CHALLENGES trước đây. */
export const ensureInitialChallenges = async (profileId: string) => {
  const templates = await loadChallengeTemplates();
  await pool.query(
    `INSERT INTO ge10_user_challenges (user_id, challenges_json)
     VALUES ($1, $2)
     ON CONFLICT (user_id) DO NOTHING`,
    [profileId, JSON.stringify(templates)]
  );
};

export const saveMaxEnergy = async (maxEnergy: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('max_energy', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: maxEnergy })]
  );
};

export const saveBaseXP = async (baseXP: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_xp', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseXP })]
  );
};

export const saveBaseRuby = async (baseRuby: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_ruby', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseRuby })]
  );
};

export const saveBossCompletionBonusRuby = async (bossCompletionBonusRuby: [number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('boss_completion_bonus_ruby', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ easy: bossCompletionBonusRuby[0], medium: bossCompletionBonusRuby[1], hard: bossCompletionBonusRuby[2] })]
  );
};

export const saveChallengeEnergyCosts = async (challengeEnergyCosts: [number, number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('challenge_energy_costs', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ 1: challengeEnergyCosts[0], 2: challengeEnergyCosts[1], 3: challengeEnergyCosts[2], 4: challengeEnergyCosts[3] })]
  );
};
