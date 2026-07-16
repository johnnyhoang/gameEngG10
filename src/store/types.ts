import type {
  UserProfile, PlayerProfile, Question, CategoryStat, PetState, TutorReward, RewardRedemption,
  ClassReward, ClassRewardRedemption,
  Challenge, HistoryLog,
  HandbookPage, ParentQuest, GradeTier, SubjectId, UiThemeId, GameSettings, ClassLink, LearningContext,
  PageExplorationState, ExplorationProgress
} from '../types/game';

// We might need to import Lesson and ExplorationProgress from their correct files.
import type { Lesson } from '../data/lessons';

/** Các tab chính của Phòng Điều Hành (TutorConsole) — nav đặt trên TopHUD */
export type TutorConsoleTab = 'phong_hieu_truong' | 'van_quyen_cac' | 'tang_kinh_cac' | 'ngan_cac' | 'than_phan';


export interface StoreState {
  // === AUTH & MULTI-PROFILE SLICE ===
  currentUser: UserProfile | null;
  sessionAccountId: string | null;
  availableProfiles: UserProfile[];
  profilesLoading: boolean;
  setSessionAccountId: (accountId: string) => void;
  fetchProfiles: () => Promise<void>;
  selectProfile: (profileId: string) => Promise<void>;
  createProfile: (role: 'student' | 'tutor', name: string) => Promise<void>;
  quickStartProfile: (role: 'student' | 'tutor') => Promise<void>;
  login: (user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  renameProfile: (newName: string) => Promise<boolean>;
  logoutState: 'idle' | 'processing' | 'success' | 'failed';

  // === PLAYER & MECHANICS SLICE ===
  player: PlayerProfile;
  pet: PetState;
  questions: Question[];
  lessons: Lesson[];
  lessonsProgress: Record<string, boolean>;
  topics: any[];
  activities: any[];
  activityProgress: Record<string, { status: string; completedAt: string | null }>;
  updateActivityProgress: (activityId: string, status: 'locked' | 'available' | 'completed', completedAt?: string | null) => Promise<void>;
  explorationProgress: Record<string, ExplorationProgress>;
  pageExplorationStates: Record<string, PageExplorationState>;
  categoryStats: Record<string, CategoryStat>;
  topicStats: Record<string, CategoryStat>;
  rewards: TutorReward[];
  rewardRedemptions: RewardRedemption[];
  /** Phần thưởng lớp học do giáo viên tạo. Học sinh trong lớp thấy; orphan student thấy rewards thường. */
  classRewards: ClassReward[];
  /** Lượt đổi class rewards — teacher thấy toàn bộ pending; student thấy của mình. */
  classRewardRedemptions: ClassRewardRedemption[];
  /** true nếu student chưa vào lớp nào → hiện school rewards thay vì class rewards. */
  isOrphanStudent: boolean;
  challenges: Challenge[];
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
  ) => { isCorrect: boolean; expGained: number; rubyGained: number; comboMultiplier: number; scoreRatio: number };
  useEnergy: (amount: number) => boolean;
  addEnergy: (amount: number) => void;
  /** Tự hồi ĐẦY Năng Lượng nếu đã cạn 0 đủ lâu (>= resetHours) — gọi định kỳ từ TopHUD + lúc khởi động app (SUB_SPEC_ENERGY §5, Phương án A). */
  tickEnergyRegen: () => void;
  /** Luật Bất Thoái (CORE_SPECS §7.4.4): nâng maxAchievedMasteryRank[subjectId] nếu ratio hiện tại quy ra rank cao hơn — không bao giờ hạ. */
  ratchetMasteryRank: (subjectId: SubjectId, ratio: number) => void;
  buyStreakShield: () => boolean;
  buyHint: () => boolean;
  buyTheme: (themeId: UiThemeId) => boolean;
  /** Đổi một Danh Mục Quà Khuyến Học: trừ Ruby + giảm remainingQuantity + tạo RewardRedemption 'pending'. */
  redeemReward: (rewardId: string) => boolean;
  feedPet: () => boolean;
  spinWheel: () => { rewardType: string; amount: number; message: string };
  openMysteryBox: () => { rewardType: string; amount: number; message: string };
  masterLesson: (lessonId: string, accuracyRatio?: number) => Promise<void>;
  applyDefeatPenalty: (rubyEarnedInRun: number, xpEarnedInRun: number) => void;
  /** bonusIndex khớp với chỉ số [dễ,trung bình,khó] trong gameSettings.bossCompletionBonusRuby — để bonus thực nhận khớp đúng số đã quảng bá trên Boss Card. Bỏ trống thì chọn ngẫu nhiên (tương thích ngược). */
  completeBossVictory: (bonusIndex?: number) => void;
  completeLevel3Page: (pageId: string) => void;
  awardRubyAndXp: (ruby: number, xp: number, activityTitle: string, activityDetails: string) => Promise<void>;
  clearExploration: (pageId: string) => Promise<void>;
  resetProgress: () => void;
  checkDailyReset: () => void;
  getAdaptiveQuestion: (category: string) => Question | null;
  getQuestionByWeight: (mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed') => Question | null;
  syncSessionResult: (data: { newRuby: number; newXp: number; newLevel: number; badges: string[] }) => void;
  syncWithServer: () => Promise<void>;
  pullServerState: (serverData: any) => void;

  // === ADMIN & PARENT SLICE ===
  adminStudents: any[];
  adminLinks: any[];
  selectedStudentProfile: any | null;
  failedQuestionIds: string[];
  recentlyPlayedQuestionIds: string[];
  tutorQuests: ParentQuest[];
  
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
  skipReviews: any[];
  fetchSkipReviews: (studentId: string) => Promise<void>;
  resolveSkipReview: (reviewId: string) => Promise<boolean>;
  /** Chủ nhiệm xác nhận đã trao quà ngoài đời cho lượt đổi này (thay "duyệt" cũ). */
  markRewardDelivered: (redemptionId: string) => void;
  /** Hủy lượt đổi: hoàn Ruby + trả lại remainingQuantity cho catalog item (thay "từ chối" cũ). */
  cancelRedemption: (redemptionId: string) => void;
  addTutorReward: (title: string, costRuby: number, quantity: number) => void;
  deleteTutorReward: (rewardId: string) => void;

  // === CLASS REWARDS (Quà Khuyến Học) ===
  fetchClassRewards: () => Promise<void>;
  createClassReward: (title: string, costRuby: number, quantity: number) => Promise<boolean>;
  deleteClassReward: (rewardId: string) => Promise<boolean>;
  redeemClassReward: (rewardId: string) => Promise<boolean>;
  cancelClassRedemption: (redemptionId: string) => Promise<boolean>;
  deliverClassRedemption: (redemptionId: string) => Promise<boolean>;
  importQuestions: (questions: Question[]) => void;
  deleteQuestion: (questionId: string) => Promise<boolean>;
  updateQuestion: (questionId: string, payload: Partial<Question>) => Promise<boolean>;
  addQuestion: (payload: Partial<Question>) => Promise<boolean>;
  flagQuestionConfused: (question: Question, reason?: 'quá khó' | 'quá dài' | 'quá khùng', severity?: number) => Promise<boolean>;
  fetchAdminStudents: () => Promise<void>;
  promoteUser: (targetUserId: string, newRole: string) => Promise<void>;
  fetchStudentProfile: (studentUserId: string) => Promise<void>;
  adminMarkRewardDelivered: (studentUserId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentUserId: string, redemptionId: string) => Promise<void>;
  adminSetEnergy: (studentUserId: string, energyPercent: number) => Promise<void>;
  /** Chủ nhiệm chỉnh Trần Năng Lượng + giờ hồi RIÊNG cho con này (SUB_SPEC_ENERGY §2). maxEnergy 50-300, resetHours ∈ {2,3,5}. */
  adminSetEnergyConfig: (studentUserId: string, maxEnergy: number, resetHours: 2 | 3 | 5) => Promise<void>;
  updateGameSettings: (payload: {
    bossCompletionBonusRuby?: [number, number, number];
    challengeEnergyCosts?: [number, number, number, number];
    baseXP?: number;
    baseRuby?: number;
  }) => Promise<void>;
  addTutorQuest: (title: string, description: string, rewardRuby: number) => void;
  completeTutorQuest: (questId: string) => void;
  deleteTutorQuest: (questId: string) => void;
  claimTutorQuest: (questId: string) => void;

  // === CLASS LINKS SLICE ===
  classLinks: ClassLink[];
  secondaryParents: any[];
  fetchClassLinks: () => Promise<void>;
  sendClassInvite: (targetEmail: string, connectAsSecondary?: boolean) => Promise<{ success: boolean; conflictCode?: string; error?: string }>;
  inviteSecondary: (targetEmail: string) => Promise<boolean>;
  inviteSecondaryRequest: (targetEmail: string) => Promise<{ success: boolean; error?: string }>;
  searchUsers: (q: string, role?: string) => Promise<any[]>;
  updateSecondaryPermissions: (linkId: string, permissions: { can_approve_rewards?: boolean, can_create_missions?: boolean, read_only?: boolean }) => Promise<boolean>;
  respondClassInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  leaveClass: (linkId: string) => Promise<boolean>;
  applyVicePrincipal: () => Promise<{ success: boolean; error?: string }>;
  inviteAdminConnection: (targetEmail: string) => Promise<{ success: boolean; error?: string }>;

  // === UI & SYSTEM SLICE ===
  handbookPages: HandbookPage[];
  isSectModalOpen: boolean;
  currentSubject: SubjectId;
  activeGradeTier: GradeTier;
  /** Đang trong quá trình chuyển môn/lớp — UI hiện spinner chặn thao tác đến khi xong */
  isSwitchingContext: boolean;
  /** Tăng mỗi lần đổi môn/lớp — response async cũ không được ghi đè context mới */
  learningContextVersion: number;
  uiTheme: UiThemeId;
  uiThemesByUser: Record<string, UiThemeId>;
  gameSettings: GameSettings;
  helpPageId: string | null;
  /** Tab đang mở trong Phòng Điều Hành — chia sẻ giữa TopHUD (nav chính) và TutorConsole */
  tutorConsoleTab: TutorConsoleTab;

  addHandbookPage: (page: Omit<HandbookPage, 'id'>) => void;
  setTutorConsoleTab: (tab: TutorConsoleTab) => void;
  setSectModalOpen: (open: boolean) => void;
  setLearningContext: (context: LearningContext) => void;
  setSubject: (subject: SubjectId) => void;
  setGradeTier: (tier: GradeTier) => void;
  setUiTheme: (themeId: UiThemeId) => void;
  showHelp: (topic: string) => void;
  closeHelp: () => void;
  initEventSubscriptions: () => () => void;
}
