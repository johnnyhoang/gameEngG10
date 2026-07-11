import { pool } from '../db.js';

export const DEFAULT_BOSS_COMPLETION_BONUS_NP: [number, number, number] = [100, 150, 200];
export const DEFAULT_CHALLENGE_ENERGY_COSTS: [number, number, number, number] = [10, 10, 15, 10];

export const loadBossCompletionBonusNP = async (): Promise<[number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'boss_completion_bonus_np'"
  );
  const raw = res.rows[0]?.setting_json;
  const values = [
    Number(raw?.['easy']),
    Number(raw?.['medium']),
    Number(raw?.['hard'])
  ];

  if (values.every(v => Number.isFinite(v) && v >= 0)) {
    return [values[0], values[1], values[2]];
  }

  return DEFAULT_BOSS_COMPLETION_BONUS_NP;
};

export const loadChallengeEnergyCosts = async (): Promise<[number, number, number, number]> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'challenge_energy_costs'"
  );
  const raw = res.rows[0]?.setting_json;
  const values = [
    Number(raw?.['1']),
    Number(raw?.['2']),
    Number(raw?.['3']),
    Number(raw?.['4'])
  ];

  if (values.every(v => Number.isFinite(v) && v >= 0)) {
    return [values[0], values[1], values[2], values[3]];
  }

  return DEFAULT_CHALLENGE_ENERGY_COSTS;
};

export const loadMaxEnergy = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'max_energy'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 1000;
};

export const loadBaseXP = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_xp'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 15;
};

export const loadBaseCoins = async (): Promise<number> => {
  const res = await pool.query(
    "SELECT setting_json FROM ge10_game_settings WHERE setting_key = 'base_coins'"
  );
  const raw = res.rows[0]?.setting_json;
  const value = Number(raw?.['value']);
  return (Number.isFinite(value) && value > 0) ? value : 5;
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

export const saveBaseCoins = async (baseCoins: number) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('base_coins', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ value: baseCoins })]
  );
};

export const saveBossCompletionBonusNP = async (bossCompletionBonusNP: [number, number, number]) => {
  await pool.query(
    `INSERT INTO ge10_game_settings (setting_key, setting_json)
     VALUES ('boss_completion_bonus_np', $1::jsonb)
     ON CONFLICT (setting_key) DO UPDATE SET setting_json = EXCLUDED.setting_json`,
    [JSON.stringify({ easy: bossCompletionBonusNP[0], medium: bossCompletionBonusNP[1], hard: bossCompletionBonusNP[2] })]
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
