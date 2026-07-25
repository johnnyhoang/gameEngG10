import { pool } from '../db.js';

// Cache in RAM to avoid DB exhaustion (1-minute TTL)
interface GameSettings {
  bossCompletionBonusRuby: [number, number, number];
  challengeEnergyCosts: [number, number, number, number];
  maxEnergy: number;
  baseXP: number;
  baseRuby: number;
  themeUnlockCost: number;
}

let cachedSettings: GameSettings | null = null;
let settingsCacheExpiresAt = 0;

let cachedChallengeTemplates: any[] | null = null;
let templatesCacheExpiresAt = 0;

const CACHE_TTL_MS = 60000; // 1 minute

export const invalidateSettingsCache = () => {
  cachedSettings = null;
  cachedChallengeTemplates = null;
};

export const loadAllGameSettings = async (): Promise<GameSettings> => {
  const now = Date.now();
  if (cachedSettings && now < settingsCacheExpiresAt) {
    return cachedSettings;
  }

  const res = await pool.query('SELECT setting_key, setting_json FROM ge10_game_settings');
  const settingsMap: Record<string, any> = {};
  res.rows.forEach(row => {
    settingsMap[row.setting_key] = row.setting_json;
  });

  const boss = settingsMap['boss_completion_bonus_ruby'] || {};
  const energyCosts = settingsMap['challenge_energy_costs'] || {};

  cachedSettings = {
    bossCompletionBonusRuby: [
      Number(boss['easy'] ?? 10),
      Number(boss['medium'] ?? 20),
      Number(boss['hard'] ?? 30)
    ],
    challengeEnergyCosts: [
      Number(energyCosts['1'] ?? 10),
      Number(energyCosts['2'] ?? 20),
      Number(energyCosts['3'] ?? 30),
      Number(energyCosts['4'] ?? 40)
    ],
    maxEnergy: Number(settingsMap['max_energy']?.['value'] ?? 1000),
    baseXP: Number(settingsMap['base_xp']?.['value'] ?? 10),
    baseRuby: Number(settingsMap['base_ruby']?.['value'] ?? 5),
    themeUnlockCost: Number(settingsMap['theme_unlock_cost']?.['value'] ?? 100)
  };

  settingsCacheExpiresAt = now + CACHE_TTL_MS;
  return cachedSettings;
};

// Tương thích ngược với các API cũ
export const loadBossCompletionBonusRuby = async (): Promise<[number, number, number]> => {
  const s = await loadAllGameSettings();
  return s.bossCompletionBonusRuby;
};

export const loadChallengeEnergyCosts = async (): Promise<[number, number, number, number]> => {
  const s = await loadAllGameSettings();
  return s.challengeEnergyCosts;
};

export const loadMaxEnergy = async (): Promise<number> => {
  const s = await loadAllGameSettings();
  return s.maxEnergy;
};

export const loadBaseXP = async (): Promise<number> => {
  const s = await loadAllGameSettings();
  return s.baseXP;
};

export const loadBaseRuby = async (): Promise<number> => {
  const s = await loadAllGameSettings();
  return s.baseRuby;
};

export const loadThemeUnlockCost = async (): Promise<number> => {
  const s = await loadAllGameSettings();
  return s.themeUnlockCost;
};

export const loadChallengeTemplates = async (): Promise<any[]> => {
  const now = Date.now();
  if (cachedChallengeTemplates && now < templatesCacheExpiresAt) {
    return cachedChallengeTemplates;
  }

  const res = await pool.query('SELECT * FROM ge10_challenge_templates ORDER BY sort_order');
  cachedChallengeTemplates = res.rows.map(row => ({
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

  templatesCacheExpiresAt = now + CACHE_TTL_MS;
  return cachedChallengeTemplates;
};

export const ensureInitialChallenges = async (profileId: string) => {
  const templates = await loadChallengeTemplates();
  await pool.query(
    `INSERT INTO ge10_user_challenges (user_id, challenges_json)
     VALUES ($1, $2)
     ON CONFLICT (user_id) DO NOTHING`,
    [profileId, JSON.stringify(templates)]
  );
};

export const saveThemeUnlockCost = async (themeUnlockCost: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('theme_unlock_cost', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: themeUnlockCost })]
  );
  invalidateSettingsCache();
};

export const saveMaxEnergy = async (maxEnergy: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('max_energy', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: maxEnergy })]
  );
  invalidateSettingsCache();
};

export const saveBaseXP = async (baseXP: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_xp', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseXP })]
  );
  invalidateSettingsCache();
};

export const saveBaseRuby = async (baseRuby: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_ruby', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseRuby })]
  );
  invalidateSettingsCache();
};

export const saveBossCompletionBonusRuby = async (bossCompletionBonusRuby: [number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('boss_completion_bonus_ruby', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ easy: bossCompletionBonusRuby[0], medium: bossCompletionBonusRuby[1], hard: bossCompletionBonusRuby[2] })]
  );
  invalidateSettingsCache();
};

export const saveChallengeEnergyCosts = async (challengeEnergyCosts: [number, number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('challenge_energy_costs', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ 1: challengeEnergyCosts[0], 2: challengeEnergyCosts[1], 3: challengeEnergyCosts[2], 4: challengeEnergyCosts[3] })]
  );
  invalidateSettingsCache();
};
