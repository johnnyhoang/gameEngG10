// Hằng số/dữ liệu khởi tạo dùng chung giữa các slice và shim `hooks/useGameState.ts`.
// Đặt ở đây (module lá, không import ngược từ '../hooks/useGameState' hay './index') để
// tránh vòng lặp import: slice -> hooks/useGameState -> store/index -> slice (từng gây
// ReferenceError "Cannot access 'INITIAL_PLAYER' before initialization" khi load app).
import type { PlayerProfile, PetState, GameSettings, UiThemeId } from '../types/game';
import type { StoreState } from './types';

// Năng Lượng v2 (SUB_SPEC_ENERGY §2): maxEnergy giờ là cấu hình RIÊNG từng con (PlayerProfile.maxEnergy),
// không còn nằm trong GameSettings global. Hằng số này chỉ còn là giá trị mặc định khi tạo hồ sơ mới.
export const PLAYER_ENERGY_MAX = 100;
export const DEFAULT_RESET_HOURS: 2 | 3 | 5 = 3;
export const FREE_UI_THEME: UiThemeId = 'current';

// Placeholder trước khi gameSettings thật từ DB (ge10_game_settings) tải về — không phải
// nguồn dữ liệu, chỉ tránh undefined trong lúc đang tải (xem createAuthSlice.ts).
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  bossCompletionBonusRuby: [100, 150, 200],
  challengeEnergyCosts: [30, 30, 30, 30],
  baseXP: 15,
  baseRuby: 5,
  themeUnlockCost: 200,
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

/**
 * Toàn bộ state gắn với MỘT profile cụ thể — phải reset mỗi khi ngừng xem profile đó
 * (đổi sang profile khác hoặc rời về màn hình chọn vai trò), để tránh dữ liệu của
 * profile cũ lộ ra dưới profile mới. Dùng chung bởi `selectProfile` và `deselectProfile`
 * (createAuthSlice.ts) — không tự reset lẻ tẻ từng field ở nơi khác (xem TopHUD.tsx).
 */
export function getProfileScopedResetState(): Partial<StoreState> {
  return {
    currentUser: null,
    player: INITIAL_PLAYER,
    pet: INITIAL_PET,
    categoryStats: {},
    lessonsProgress: {},
    topics: [],
    activities: [],
    activityProgress: {},
    explorationProgress: {},
    pageExplorationStates: {},
    rewards: [],
    rewardRedemptions: [],
    classRewards: [],
    classRewardRedemptions: [],
    classLinks: [],
    secondaryTutors: [],
    isOrphanStudent: true,
    challenges: [],
    logs: [],
    activeCombo: 0,
    maxCombo: 0,
    failedQuestionIds: [],
    recentlyPlayedQuestionIds: [],
    selectedStudentProfile: null,
    questions: [],
    lessons: [],
    adminStudents: [],
    tutorQuests: []
  };
}

