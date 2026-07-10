export * from '../store';
export * from '../store/types';

// Export constants that were previously in this file so that other parts of the app don't break.
export const PLAYER_ENERGY_MAX = 100;
export const DEFAULT_PIN = '1234';
export const DEFAULT_GRADE_TIER = 'bronze';
export const DEFAULT_UI_THEME = 'cyber';

export const INITIAL_PLAYER: import('../types/game').PlayerProfile = {
  id: 'mock-student',
  name: 'Student',
  role: 'student',
  level: 1,
  xp: 0,
  coins: 200,
  walletVND: 0,
  streak: 0,
  energy: PLAYER_ENERGY_MAX,
  hearts: 3,
  lastActive: new Date().toISOString(),
  badges: []
};

export const INITIAL_PET: import('../types/game').PetState = {
  name: 'Heo Maikawaii',
  stage: 'egg',
  level: 1,
  exp: 0,
  energy: 100,
  mood: 'neutral',
  lastFed: new Date().toISOString()
};

export const INITIAL_QUESTIONS: import('../types/game').Question[] = [];
export const INITIAL_LESSONS: any[] = [];
export const INITIAL_CHALLENGES: import('../types/game').Challenge[] = [];
export const DEFAULT_REWARDS: import('../types/game').ParentReward[] = [];
export const DEFAULT_GAME_SETTINGS: import('../types/game').GameSettings = {
  bossBountiesVnd: [10000, 20000, 50000],
  challengeEnergyCosts: [10, 15, 20, 25],
  maxEnergy: PLAYER_ENERGY_MAX,
  baseXP: 10,
  baseCoins: 5,
  updatedAt: Date.now()
};
export const ALL_HANDBOOK_PAGES: import('../types/game').HandbookPage[] = [];
export const THEME_UNLOCK_COST = 200;
export const FREE_UI_THEME: import('../types/game').UiThemeId = 'current';
export const UI_THEMES: any[] = [];
