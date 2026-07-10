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
  completeBossVictory: () => void;
  completeLevel3Page: (pageId: string) => void;
  updatePendingKeyQuestion: (pageId: string, questionId: string | null) => void;
  awardCoinsAndXp: (coins: number, xp: number, activityTitle: string, activityDetails: string) => Promise<void>;
  clearExploration: (pageId: string) => Promise<void>;
  resetProgress: () => void;
  checkDailyReset: () => void;
  getAdaptiveQuestion: (category: string) => Question | null;
  getQuestionByWeight: (mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed') => Question | null;

  // === ADMIN & PARENT SLICE ===
  parentPIN: string;
  adminStudents: any[];
  selectedStudentProfile: any | null;
  failedQuestionIds: string[];
  recentlyPlayedQuestionIds: string[];
  parentQuests: ParentQuest[];
  
  verifyPIN: (pin: string) => Promise<boolean>;
  changePIN: (newPIN: string) => Promise<boolean>;
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
  skipReviews: any[];
  fetchSkipReviews: (studentId: string) => Promise<void>;
  resolveSkipReview: (reviewId: string) => Promise<boolean>;
  /** Phụ huynh xác nhận đã trao quà ngoài đời cho lượt đổi này (thay "duyệt" cũ). */
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
  updateGameSettings: (payload: {
    bossCompletionBonusNP?: [number, number, number];
    challengeEnergyCosts?: [number, number, number, number];
    maxEnergy?: number;
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
  sendInvite: (targetId: string) => Promise<boolean>;
  inviteSecondary: (targetEmail: string, studentId: string) => Promise<boolean>;
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
