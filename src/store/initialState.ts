// Hằng số/dữ liệu khởi tạo dùng chung giữa các slice và shim `hooks/useGameState.ts`.
// Đặt ở đây (module lá, không import ngược từ '../hooks/useGameState' hay './index') để
// tránh vòng lặp import: slice -> hooks/useGameState -> store/index -> slice (từng gây
// ReferenceError "Cannot access 'INITIAL_PLAYER' before initialization" khi load app).
import type { PlayerProfile, PetState, Challenge, ParentReward, GameSettings, UiThemeId } from '../types/game';

export const DEFAULT_PIN = '1234';
export const PLAYER_ENERGY_MAX = 1000;
export const THEME_UNLOCK_COST = 200;
export const FREE_UI_THEME: UiThemeId = 'current';

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  bossBountiesVnd: [10000, 15000, 20000],
  // Hao tổn Chân khí (SUB_SPEC_ENERGY): ải thường tiêu 30 Chân khí mỗi lượt.
  challengeEnergyCosts: [30, 30, 30, 30],
  maxEnergy: 1000,
  baseXP: 15,
  baseCoins: 5,
  updatedAt: Date.now()
};

export const INITIAL_PLAYER: PlayerProfile = {
  id: 'student-1',
  name: 'Con yêu',
  role: 'student',
  level: 1,
  xp: 0,
  coins: 200,
  walletVND: 0,
  streak: 0,
  energy: PLAYER_ENERGY_MAX,
  hearts: 3,
  lastActive: new Date().toISOString(),
  badges: [],
  unlockedThemes: ['current']
};

export const INITIAL_PET: PetState = {
  name: 'Heo Maikawaii',
  stage: 'egg',
  level: 1,
  exp: 0,
  energy: 100,
  mood: 'neutral',
  lastFed: new Date().toISOString()
};

export const DEFAULT_REWARDS: ParentReward[] = [
  { id: 'r-1', title: '15 phút chơi game', costCoins: 150, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-2', title: 'Ly trà sữa đặc biệt', costCoins: 400, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-3', title: 'Thưởng 20.000đ tiền mặt', costCoins: 500, cashValueVND: 20000, status: 'pending', timestamp: Date.now() },
  { id: 'r-4', title: 'Thưởng 50.000đ tiền mặt', costCoins: 1000, cashValueVND: 50000, status: 'pending', timestamp: Date.now() },
  { id: 'r-5', title: 'Thưởng 100.000đ tiền mặt', costCoins: 1800, cashValueVND: 100000, status: 'pending', timestamp: Date.now() }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch-1', type: 'daily', title: 'Luyện 20 câu hỏi', description: 'Hoàn thành làm 20 câu hỏi bất kỳ', targetCount: 20, currentCount: 0, rewardCoins: 100, rewardXP: 100, completed: false },
  { id: 'ch-2', type: 'daily', title: 'Chiến binh Grammar', description: 'Trả lời đúng 10 câu hỏi ngữ pháp', targetCount: 10, currentCount: 0, rewardCoins: 80, rewardXP: 80, completed: false, category: 'grammar' },
  { id: 'ch-3', type: 'daily', title: 'Không tỳ vết', description: 'Đạt chuỗi đúng 10 câu liên tiếp', targetCount: 10, currentCount: 0, rewardCoins: 120, rewardXP: 150, completed: false },
  { id: 'ch-4', type: 'weekly', title: 'Học tập bền bỉ', description: 'Hoàn thành 100 câu hỏi trong tuần', targetCount: 100, currentCount: 0, rewardCoins: 500, rewardXP: 500, completed: false },
  { id: 'ch-5', type: 'achievement', title: 'Khởi đầu vinh quang', description: 'Tổng cộng trả lời đúng 100 câu', targetCount: 100, currentCount: 0, rewardCoins: 300, rewardXP: 300, completed: false },
  { id: 'ch-6', type: 'achievement', title: 'Huyền thoại học đường', description: 'Tổng cộng trả lời đúng 1000 câu', targetCount: 1000, currentCount: 0, rewardCoins: 2000, rewardXP: 2000, completed: false }
];
