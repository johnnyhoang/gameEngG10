import type {
  UserProfile, PlayerProfile, Question, CategoryStat, PetState, ParentReward, RewardRedemption, Challenge, DailyMission, HistoryLog,
  HandbookPage, ParentQuest, GradeTier, SubjectId, UiThemeId, GameSettings, FamilyLink,
  PageExplorationState, ExplorationProgress
} from '../types/game';

// We might need to import Lesson and ExplorationProgress from their correct files.
import type { Lesson } from '../data/lessons';


export interface StoreState {
  // === AUTH & MULTI-PROFILE SLICE ===
  currentUser: UserProfile | null;
  sessionAccountId: string | null;
  availableProfiles: UserProfile[];
  setSessionAccountId: (accountId: string) => void;
  fetchProfiles: () => Promise<void>;
  selectProfile: (profileId: string) => Promise<void>;
  createProfile: (role: 'student' | 'parent', name: string) => Promise<void>;
  quickStartProfile: (role: 'student' | 'parent') => Promise<void>;
  login: (user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;

  // === PLAYER & MECHANICS SLICE ===
  player: PlayerProfile;
  pet: PetState;
  questions: Question[];
  lessons: Lesson[];
  lessonsProgress: Record<string, boolean>;
  explorationProgress: Record<string, ExplorationProgress>;
  pageExplorationStates: Record<string, PageExplorationState>;
  categoryStats: Record<string, CategoryStat>;
  topicStats: Record<string, CategoryStat>;
  rewards: ParentReward[];
  rewardRedemptions: RewardRedemption[];
  challenges: Challenge[];
  dailyMission: DailyMission | null;
  logs: HistoryLog[];
  activeCombo: number;
  maxCombo: number;
  lastSyncTime: string | null;
  profiles: Record<string, PlayerProfile>;
  petStates: Record<string, PetState>;
  categoryStatsAll: Record<string, Record<string, CategoryStat>>;
  topicStatsAll: Record<string, Record<string, CategoryStat>>;

  answerQuestion: (
    questionId: string,
    isCorrect: boolean,
    timeSpentSeconds: number,
    gameMode: 'practice' | 'survival' | 'boss' | 'infinite',
    scoreRatio?: number
  ) => { isCorrect: boolean; expGained: number; coinsGained: number; comboMultiplier: number; scoreRatio: number };
  useEnergy: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  /** Tự hồi ĐẦY Chân Khí nếu đã cạn 0 đủ lâu (>= resetHours) — gọi định kỳ từ TopHUD + lúc khởi động app (SUB_SPEC_ENERGY §5, Phương án A). */
  tickEnergyRegen: () => void;
  /** Luật Bất Thoái (CORE_SPECS §7.4.4): nâng maxAchievedMasteryRank[subjectId] nếu ratio hiện tại quy ra rank cao hơn — không bao giờ hạ. */
  ratchetMasteryRank: (subjectId: SubjectId, ratio: number) => void;
  buyStreakShield: () => boolean;
  buyHint: () => boolean;
  buyTheme: (themeId: UiThemeId) => boolean;
  /** Đổi một Phần Thưởng Thực Tế: trừ NP + giảm remainingQuantity + tạo RewardRedemption 'pending'. */
  redeemReward: (rewardId: string) => boolean;
  feedPet: () => boolean;
  spinWheel: () => { rewardType: string; amount: number; message: string };
  openMysteryBox: () => { rewardType: string; amount: number; message: string };
  masterLesson: (lessonId: string, accuracyRatio?: number) => Promise<void>;
  applyDefeatPenalty: (coinsEarnedInRun: number, xpEarnedInRun: number) => void;
  /** bonusIndex khớp với chỉ số [dễ,trung bình,khó] trong gameSettings.bossCompletionBonusNP — để bonus thực nhận khớp đúng số đã quảng bá trên Boss Card. Bỏ trống thì chọn ngẫu nhiên (tương thích ngược). */
  completeBossVictory: (bonusIndex?: number) => void;
  completeLevel3Page: (pageId: string) => void;
  updatePendingKeyQuestion: (pageId: string, questionId: string | null) => void;
  awardCoinsAndXp: (coins: number, xp: number, activityTitle: string, activityDetails: string) => Promise<void>;
  clearExploration: (pageId: string) => Promise<void>;
  resetProgress: () => void;
  checkDailyReset: () => void;
  getAdaptiveQuestion: (category: string) => Question | null;
  getQuestionByWeight: (mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed') => Question | null;
  syncSessionResult: (data: { newCoins: number; newXp: number; newLevel: number; badges: string[] }) => void;
  syncWithServer: () => Promise<void>;
  pullServerState: (serverData: any) => void;

  // === ADMIN & PARENT SLICE ===
  adminStudents: any[];
  selectedStudentProfile: any | null;
  failedQuestionIds: string[];
  recentlyPlayedQuestionIds: string[];
  parentQuests: ParentQuest[];
  
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
  skipReviews: any[];
  fetchSkipReviews: (studentId: string) => Promise<void>;
  resolveSkipReview: (reviewId: string) => Promise<boolean>;
  /** Chủ nhiệm xác nhận đã trao quà ngoài đời cho lượt đổi này (thay "duyệt" cũ). */
  markRewardDelivered: (redemptionId: string) => void;
  /** Hủy lượt đổi: hoàn NP + trả lại remainingQuantity cho catalog item (thay "từ chối" cũ). */
  cancelRedemption: (redemptionId: string) => void;
  addParentReward: (title: string, costCoins: number, quantity: number) => void;
  deleteParentReward: (rewardId: string) => void;
  importQuestions: (questions: Question[]) => void;
  deleteQuestion: (questionId: string) => Promise<boolean>;
  updateQuestion: (questionId: string, payload: Partial<Question>) => Promise<boolean>;
  flagQuestionConfused: (question: Question, reason?: 'quá khó' | 'quá dài' | 'quá khùng', severity?: number) => Promise<boolean>;
  fetchAdminStudents: () => Promise<void>;
  promoteUser: (targetUserId: string, newRole: string) => Promise<void>;
  fetchStudentProfile: (studentUserId: string) => Promise<void>;
  adminMarkRewardDelivered: (studentUserId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentUserId: string, redemptionId: string) => Promise<void>;
  adminSetEnergy: (studentUserId: string, energyPercent: number) => Promise<void>;
  /** Chủ nhiệm chỉnh Trần Chân Khí + giờ hồi RIÊNG cho con này (SUB_SPEC_ENERGY §2). maxEnergy 50-300, resetHours ∈ {2,3,5}. */
  adminSetEnergyConfig: (studentUserId: string, maxEnergy: number, resetHours: 2 | 3 | 5) => Promise<void>;
  updateGameSettings: (payload: {
    bossCompletionBonusNP?: [number, number, number];
    challengeEnergyCosts?: [number, number, number, number];
    baseXP?: number;
    baseCoins?: number;
  }) => Promise<void>;
  addParentQuest: (title: string, description: string, rewardNP: number) => void;
  completeParentQuest: (questId: string) => void;
  deleteParentQuest: (questId: string) => void;
  claimParentQuest: (questId: string) => void;

  // === FAMILY SLICE ===
  familyLinks: FamilyLink[];
  secondaryParents: any[];
  fetchFamily: () => Promise<void>;
  sendInvite: (targetEmail: string, connectAsSecondary?: boolean) => Promise<{ success: boolean; conflictCode?: string; error?: string }>;
  inviteSecondary: (targetEmail: string) => Promise<boolean>;
  inviteSecondaryRequest: (targetEmail: string) => Promise<{ success: boolean; error?: string }>;
  searchUsers: (q: string, role?: string) => Promise<any[]>;
  updateSecondaryPermissions: (linkId: string, permissions: { can_approve_rewards?: boolean, can_create_missions?: boolean, read_only?: boolean }) => Promise<boolean>;
  respondInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  leaveFamily: (linkId: string) => Promise<boolean>;

  // === UI & SYSTEM SLICE ===
  handbookPages: HandbookPage[];
  isSectModalOpen: boolean;
  currentSubject: SubjectId;
  activeGradeTier: GradeTier;
  uiTheme: UiThemeId;
  uiThemesByUser: Record<string, UiThemeId>;
  gameSettings: GameSettings;
  helpPageId: string | null;

  addHandbookPage: (page: Omit<HandbookPage, 'id'>) => void;
  setSectModalOpen: (open: boolean) => void;
  setSubject: (subject: SubjectId) => void;
  setGradeTier: (tier: GradeTier) => void;
  setUiTheme: (themeId: UiThemeId) => void;
  showHelp: (topic: string) => void;
  closeHelp: () => void;
  initEventSubscriptions: () => () => void;
}
