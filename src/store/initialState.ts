// Hằng số/dữ liệu khởi tạo dùng chung giữa các slice và shim `hooks/useGameState.ts`.
// Đặt ở đây (module lá, không import ngược từ '../hooks/useGameState' hay './index') để
// tránh vòng lặp import: slice -> hooks/useGameState -> store/index -> slice (từng gây
// ReferenceError "Cannot access 'INITIAL_PLAYER' before initialization" khi load app).
import type { PlayerProfile, PetState, Challenge, TutorReward, GameSettings, UiThemeId } from '../types/game';

// Năng Lượng v2 (SUB_SPEC_ENERGY §2): maxEnergy giờ là cấu hình RIÊNG từng con (PlayerProfile.maxEnergy),
// không còn nằm trong GameSettings global. Hằng số này chỉ còn là giá trị mặc định khi tạo hồ sơ mới.
export const PLAYER_ENERGY_MAX = 100;
export const DEFAULT_RESET_HOURS: 2 | 3 | 5 = 3;
export const THEME_UNLOCK_COST = 200;
export const FREE_UI_THEME: UiThemeId = 'current';

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  // Bonus Điểm (Ruby) khi hạ Boss — quảng bá trên Boss Card, thay hoàn toàn thưởng VND cũ (CORE_SPECS §2.1).
  bossCompletionBonusRuby: [100, 150, 200],
  // Hao tổn Năng Lượng (SUB_SPEC_ENERGY): phòng thường tiêu 30 Năng Lượng mỗi lượt.
  challengeEnergyCosts: [30, 30, 30, 30],
  baseXP: 15,
  baseRuby: 5,
  updatedAt: Date.now()
};

export const INITIAL_PLAYER: PlayerProfile = {
  id: 'student-1',
  name: 'Con yêu',
  role: 'student',
  level: 1,
  xp: 0,
  ruby: 200,
  streak: 0,
  energy: PLAYER_ENERGY_MAX,
  maxEnergy: PLAYER_ENERGY_MAX,
  resetHours: DEFAULT_RESET_HOURS,
  energyDepletedAt: null,
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

// Danh Mục Quà Khuyến Học mặc định (CORE_SPECS §3.2) — mỗi món có số lượng giới hạn do chủ nhiệm nạp lại khi hết.
export const DEFAULT_TUTOR_REWARDS: TutorReward[] = [
  { id: 'r-1', title: '15 phút chơi game', costRuby: 150, quantity: 10, remainingQuantity: 10, timestamp: Date.now() },
  { id: 'r-2', title: 'Ly trà sữa đặc biệt', costRuby: 400, quantity: 4, remainingQuantity: 4, timestamp: Date.now() },
  { id: 'r-3', title: 'Bao lì xì 20.000đ', costRuby: 500, quantity: 5, remainingQuantity: 5, timestamp: Date.now() },
  { id: 'r-4', title: 'Bao lì xì 50.000đ', costRuby: 1000, quantity: 3, remainingQuantity: 3, timestamp: Date.now() },
  { id: 'r-5', title: 'Bao lì xì 100.000đ', costRuby: 1800, quantity: 1, remainingQuantity: 1, timestamp: Date.now() }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch-1', type: 'daily', title: 'Luyện 20 câu hỏi', description: 'Hoàn thành làm 20 câu hỏi bất kỳ', targetCount: 20, currentCount: 0, rewardRuby: 100, rewardXP: 100, completed: false },
  { id: 'ch-2', type: 'daily', title: 'Chiến binh Grammar', description: 'Trả lời đúng 10 câu hỏi ngữ pháp', targetCount: 10, currentCount: 0, rewardRuby: 80, rewardXP: 80, completed: false, category: 'grammar' },
  { id: 'ch-3', type: 'daily', title: 'Không tỳ vết', description: 'Đạt chuỗi đúng 10 câu liên tiếp', targetCount: 10, currentCount: 0, rewardRuby: 120, rewardXP: 150, completed: false },
  { id: 'ch-4', type: 'weekly', title: 'Học tập bền bỉ', description: 'Hoàn thành 100 câu hỏi trong tuần', targetCount: 100, currentCount: 0, rewardRuby: 500, rewardXP: 500, completed: false },
  { id: 'ch-5', type: 'achievement', title: 'Khởi đầu vinh quang', description: 'Tổng cộng trả lời đúng 100 câu', targetCount: 100, currentCount: 0, rewardRuby: 300, rewardXP: 300, completed: false },
  { id: 'ch-6', type: 'achievement', title: 'Huyền thoại học đường', description: 'Tổng cộng trả lời đúng 1000 câu', targetCount: 1000, currentCount: 0, rewardRuby: 2000, rewardXP: 2000, completed: false }
];
