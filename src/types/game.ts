export type QuestionType = 'mcq' | 'multiple_choice' | 'text_input' | 'matching' | 'wordform' | 'rewrite' | 'cloze' | 'reading' | 'short-answer' | 'proof' | 'multi-part';
export type ChallengeType = 'daily' | 'weekly' | 'achievement' | 'one-time';
/** Trạng thái một lượt đổi quà (RewardRedemption) — CORE_SPECS §3.2. 'pending' = đã trừ NP, chờ chủ nhiệm trao; 'delivered' = chủ nhiệm đã bấm "Đã Trao". */
export type RewardStatus = 'pending' | 'delivered' | 'cancelled';
export type PetStage = 'egg' | 'baby' | 'adult' | 'legend';
export type PetMood = 'happy' | 'neutral' | 'sad' | 'sleeping';

export type PageLevel = 1 | 2 | 3;

export interface MapPage {
  id: string;
  level: PageLevel;
  parentId: string | null;
  rootPageId: string;
  name: string;
  icon?: string;
  decayDays?: number; // Ví dụ: 7 ngày thì bị mờ lại
  requiredCompletions?: number; // Số lần hoàn thành để mở vĩnh viễn (default: 1)
}

export interface PageExplorationState {
  studentId: string;
  pageId: string;
  lastExploredAt: string; // Lần cuối click vào
  lastCompletedAt: string | null; // Lần cuối thực sự hoàn thành task bên trong
  explorationCount: number; // Tương đương số lần hoàn thành (completionCount)
  pendingKeyQuestionId: string | null; // ID câu hỏi gatekeeper nếu giải sai
}

export interface ExplorationProgress {
  clearCount: number;
  lastClearedAt: string;
}

export interface CoinLedger {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  details?: string;
  createdAt: string;
}

/** Nhãn hiển thị cho từng giai đoạn tiến hóa của Heo Maikawaii. */
export const PET_STAGE_LABELS: Record<PetStage, string> = {
  egg: 'Đám Mây & Nấm Sơ Sinh 🍄',
  baby: 'Heo Con Mũm Mĩm 🐷',
  adult: 'Heo Hiệp Sĩ Trưởng Thành ⚔️',
  legend: 'Thần Heo Maikawaii 👑'
};

export type UiThemeId = 'current' | 'cute-pink-pastel' | 'space-adventure' | 'fantasy-forest' | 'pixel-arcade' | 'unicorn-dream';

export interface GameSettings {
  /** Bonus Điểm (NP) khi hạ Boss — quảng bá ngay trên Boss Card, do Chủ Viện/Hiệu Phó đặt (CORE_SPECS §2.1). Thay thế hoàn toàn tiền thưởng VND cũ. */
  bossCompletionBonusNP: [number, number, number];
  challengeEnergyCosts: [number, number, number, number];
  baseXP?: number;
  baseCoins?: number;
  updatedAt: number;
}

export interface FamilyLink {
  id: string;
  status: 'pending_student' | 'pending_parent' | 'active';
  parent_id?: string;
  parent_name?: string;
  parent_email?: string;
  student_id?: string;
  student_name?: string;
  student_email?: string;
  link_type?: 'primary' | 'secondary';
  secondary_permissions?: {
    can_approve_rewards?: boolean;
    can_create_missions?: boolean;
    read_only?: boolean;
  };
}

export interface UserProfile {
  id: string; // unique google id or email
  name: string;
  email: string;
  avatar: string;
  role?: string;
  familyId?: string;
  uiTheme?: any;
}

export interface PlayerProfile {
  id: string;
  name: string;
  role: 'student' | 'parent' | 'secondary_parent' | 'pho_vien' | 'truong_vien';
  level: number;
  xp: number;
  coins: number;
  streak: number;
  energy: number; // 0 - maxEnergy
  /** Trần Chân Khí riêng của con này — do chủ nhiệm cấu hình tại Ngân Các (SUB_SPEC_ENERGY §2). Mặc định 100, phạm vi 50-300. */
  maxEnergy: number;
  /** Số giờ để hồi ĐẦY Chân Khí sau khi cạn về 0 — chủ nhiệm chọn 1 trong {2,3,5} (SUB_SPEC_ENERGY §2). */
  resetHours: 2 | 3 | 5;
  /** Mốc thời gian (ms) Chân Khí chạm 0 — null nếu chưa cạn/đã hồi. Dùng để tính giờ hồi đầy (SUB_SPEC_ENERGY §5, Phương án A). */
  energyDepletedAt: number | null;
  /** @deprecated Hệ thống Tim sinh mệnh đã bị xóa (CORE_SPECS §2.1) — field giữ lại optional để không vỡ localStorage cũ. */
  hearts?: number;
  lastActive: string; // ISO String date
  badges: string[];
  /** Phong Vị (theme giao diện) đã mở khóa bằng NP tại Bách Hóa Phường (CORE_SPECS §2.4). 'current' luôn miễn phí mặc định. */
  unlockedThemes?: UiThemeId[];
  /** Phong vị giao diện đang dùng của profile này */
  uiTheme?: UiThemeId;
  /** Track daily skips for Môn Chủ Hỏi Tội */
  dailySkips?: { date: string, count: number };
  /** Luật Bất Thoái (CORE_SPECS §7.4.4): Đẳng Cấp Môn Phái cao nhất từng đạt theo từng môn (lưu `order` trong SECT_MASTERY_RANKS) — không bao giờ tụt kể cả khi Hiệu Trưởng import thêm câu hỏi/bài học làm tỉ lệ % thô giảm. */
  maxAchievedMasteryRank?: Partial<Record<SubjectId, number>>;
  /** Môn học đang chọn tu học (Sect) */
  activeSubject?: SubjectId;
  /** Tầng (Lớp) đang đứng */
  activeGradeTier?: GradeTier;
}

export interface Question {
  id: string;
  type: QuestionType;
  category: string; // e.g. "tenses", "passive-voice", "relative-clauses", "vocabulary", "wordform", "reading", "pronunciation", "stress"
  /** ID chuyên đề Core Knowledge (§9 CORE_SPECS) — dùng cho Gatekeeper, Coverage Dashboard, AI Sư Phụ */
  topicId?: string;
  prompt: string;
  options?: string[]; // for MCQs
  correctAnswer: string | string[]; // case-insensitive exact string or array of alternate valid strings
  explanation: string;
  difficulty: number; // 1 to 10 scale
  source: string; // e.g. "HCMC 2024 Exam", "Specialized 2025 Mock"
  subject?: SubjectId;
  /** Tầng Thế Giới của câu hỏi (CORE_SPECS §1.4). Bỏ trống = Tầng 9 (toàn bộ nội dung hiện hành). */
  gradeTier?: number;
  imageUrl?: string;
  metadata?: QuestionMeta;
  isConfused?: boolean;
  skipReason?: 'quá khó' | 'quá dài' | 'quá khùng';
  skipSeverity?: number;
}

// ==================== CORE KNOWLEDGE TAXONOMY ====================
export type HamNguyenTo = 'hoa' | 'bang' | 'thach';
export type ExamRelevance = 'high' | 'medium' | 'low';

/** Mỗi chuyên đề/nhóm kiến thức cốt lõi trong ngân hàng câu hỏi — xem CORE_SPECS §9 */
export interface CoreKnowledgeTopic {
  id: string;                       // kebab-case unique ID, e.g. "eng-tenses", "math-quadratic"
  subjectId: SubjectId;
  group: 'chuyen_sau' | 'co_ban';
  label: string;                    // tên hiển thị tiếng Việt
  labelEN: string;                  // tên kỹ thuật tiếng Anh
  hamNguyenTo: HamNguyenTo;         // Hầm nguyên tố gán cho topic này (🔥Hỏa/❄️Băng/🪨Thạch)
  examRelevance: ExamRelevance;     // mức độ xuất hiện trong đề tuyển sinh / HK
  minQuestions: number;             // số câu tối thiểu cần có trong DB để mở khu vực
  questionTypes: QuestionType[];    // dạng câu hỏi được phép
  description: string;              // mô tả cho Hiệu Trưởng khi import
}


export interface QuestionMeta {
  examPart?: string;
  mathTopic?: 'function-graph' | 'quadratic-equation' | 'linear-function' | 'growth-modeling' | 'percentage-discount' | 'volume-displacement' | 'shopping-discount' | 'tangent-geometry' | 'statistics-probability' | 'modeling' | 'solid-geometry' | 'finance' | 'plane-geometry' | 'mixed';
  answerMode?: 'single-choice' | 'short-answer' | 'proof' | 'multi-part' | 'numeric' | 'expression';
  solutionStyle?: 'direct' | 'worked' | 'proof-outline' | 'diagram' | 'table' | 'rubric';
  englishPart?: 'Part I' | 'Part II' | 'Part III' | 'Part IV' | 'Part V' | 'Part VI';
  englishTask?: 'grammar' | 'vocabulary' | 'pronunciation' | 'stress' | 'guided-cloze' | 'reading-true-false' | 'reading-mcq' | 'word-form' | 'rearrangement' | 'transformation' | 'mixed';
  englishSkill?: 'multiple-choice' | 'guided-cloze' | 'reading' | 'word-form' | 'rearrangement' | 'transformation';
  literatureTrack?: 'reading' | 'vietnamese' | 'social-essay' | 'literary-essay';
  literatureTask?: 'main-idea' | 'detail' | 'rhetoric' | 'vocabulary' | 'message' | 'social-essay' | 'poetry-analysis' | 'prose-analysis' | 'character-analysis' | 'comparison';
  textGenre?: 'poetry' | 'prose' | 'argument' | 'informative' | 'mixed';
  subparts?: string[];
  solutionSteps?: string[];
  formulaHints?: string[];
  diagramHint?: string;
  tags?: string[];
  isStandard?: boolean;
}

export interface CategoryStat {
  category: string;
  totalAnswered: number;
  totalCorrect: number;
  rollingAccuracy: number; // Rolling accuracy of the last N questions
  recentResults: boolean[]; // Array of last N question outcomes (true/false)
}

export interface PetState {
  name: string;
  stage: PetStage;
  level: number;
  exp: number;
  energy: number; // 0 - 100
  mood: PetMood;
  lastFed: string; // ISO String
}

/**
 * Phần Thưởng Thực Tế (Reward Catalog) — CORE_SPECS §3.2.
 * Do chủ nhiệm tự tạo, định giá bằng NP, có SỐ LƯỢNG GIỚI HẠN. App không quản lý tiền —
 * đây chỉ là một catalog item, không phải một lượt đổi (xem RewardRedemption bên dưới).
 */
export interface ParentReward {
  id: string;
  title: string;
  /** Giá NP cho một lượt đổi. */
  costCoins: number;
  /** Tổng số lượng chủ nhiệm tạo ra ban đầu. */
  quantity: number;
  /** Số lượng còn lại có thể đổi — giảm mỗi khi thiếu hiệp đổi, hết thì ẩn/disable. */
  remainingQuantity: number;
  timestamp: number;
}

/** Một lượt đổi quà cụ thể — trừ NP ngay, chờ chủ nhiệm xác nhận "Đã Trao" ngoài đời (CORE_SPECS §3.2). */
export interface RewardRedemption {
  id: string;
  rewardId: string;
  /** Snapshot tên quà tại thời điểm đổi — vẫn hiển thị đúng dù sau này quà gốc bị sửa/xóa. */
  rewardTitle: string;
  /** Snapshot giá NP đã trả — dùng để hoàn tiền nếu hủy. */
  costCoins: number;
  status: RewardStatus;
  timestamp: number;
  /** Thời điểm chủ nhiệm bấm "Đã Trao". */
  deliveredAt?: number;
}

/** Phần thưởng do giáo viên (Chủ Nhiệm) tạo cho cả lớp — học sinh trong lớp đều thấy, first-come-first-served. */
export interface ClassReward {
  id: string;
  teacherId: string;
  teacherName?: string;
  title: string;
  costCoins: number;
  quantity: number;
  remaining: number;
  createdAt: number;
}

/** Một lượt đổi phần thưởng lớp — học sinh gửi yêu cầu, giáo viên bấm "Phát Thưởng". */
export interface ClassRewardRedemption {
  id: string;
  classRewardId: string;
  studentId?: string;
  studentName?: string;
  studentAvatar?: string;
  rewardTitle: string;
  costCoins: number;
  status: RewardStatus;
  requestedAt: number;
  deliveredAt?: number;
}

export interface HistoryLog {
  id: string;
  timestamp: number;
  activityType: 'exercise' | 'challenge' | 'boss' | 'shop' | 'streak_penalty' | 'parent_approve' | 'pet_interact' | 'energy_refill' | 'box_open' | 'reward_claimed';
  title: string;
  detail: string;
  coinsChanged: number;
  xpChanged: number;
  /** Môn phái đang hoạt động tại thời điểm ghi log — dùng để cô lập nhật ký theo Sect Isolation Principle (CORE_SPECS §1.3) */
  subject?: SubjectId;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  rewardXP: number;
  completed: boolean;
  category?: string; // If restricted to a specific category
}

export interface HandbookPage {
  id: string;
  category: string;
  title: string;
  content: string;
  /** Danh sách gạch đầu dòng — dùng cho các trang tra cứu nhanh (thay cho content dạng đoạn văn). */
  bullets?: string[];
  /** Đối tượng xem trang: 'admin' chỉ hiện khi duyệt Cẩm Nang với vai trò Hiệu Trưởng. Bỏ trống = ai cũng xem được. */
  audience?: 'student' | 'admin';
  /** Tầng Thế Giới của trang cẩm nang (CORE_SPECS §1.4). Bỏ trống = dùng chung mọi tầng. */
  gradeTier?: number;
}

export interface DailyMission {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  requirements: {
    description: string;
    type: 'count' | 'accuracy' | 'category' | 'time';
    target: number;
    current: number;
    completed: boolean;
  }[];
  rewardXP: number;
  completed: boolean;
}

export interface ParentQuest {
  id: string;
  title: string;
  description: string;
  rewardNP: number;
  status: 'pending' | 'completed' | 'claimed';
  timestamp: number;
}

export interface GameEvent {
  id: string;
  timestamp: number;
  type: 'QUESTION_ANSWERED' | 'EXAM_COMPLETED' | 'DAILY_CHECK_IN' | 'REWARD_CLAIMED' | 'STREAK_RESET' | 'MISSION_COMPLETED' | 'CHALLENGE_COMPLETED' | 'PET_GROWTH' | 'ENERGY_CHANGE' | 'BOOST_ACTIVATED';
  payload: any;
}

// ==================== GRADE TIER (Tầng Thế Giới — CORE_SPECS §1.4) ====================
/** Mỗi lớp học là một Tầng Thế Giới giang hồ cô lập 100% (Tầng → Môn Phái → Nội dung). */
export type GradeTier = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const DEFAULT_GRADE_TIER: GradeTier = 9;

export interface GradeTierConfig {
  tier: GradeTier;
  name: string;
  icon: string;
  /** 'active' = tầng đang vận hành; 'coming_soon' = chưa khai mở (khóa trong UI chuyển tầng). */
  status: 'active' | 'coming_soon';
  description: string;
}

export const GRADE_TIERS: GradeTierConfig[] = [
  { tier: 6, name: 'Tầng Lớp 6', icon: '🏯', status: 'coming_soon', description: 'Nhập môn giang hồ — sắp khai mở.' },
  { tier: 7, name: 'Tầng Lớp 7', icon: '⛩️', status: 'coming_soon', description: 'Rèn gân cốt — sắp khai mở.' },
  { tier: 8, name: 'Tầng Lớp 8', icon: '🏔️', status: 'coming_soon', description: 'Luyện nội công — sắp khai mở.' },
  { tier: 9, name: 'Tầng Lớp 9', icon: '🗼', status: 'active', description: '9 môn phái: 3 Yêu Cầu Cao (bám tuyển sinh 10) + 6 Yêu Cầu Cơ Bản.' },
  { tier: 10, name: 'Tầng Lớp 10', icon: '🌋', status: 'coming_soon', description: 'Thượng tầng THPT — sắp khai mở.' },
  { tier: 11, name: 'Tầng Lớp 11', icon: '🌌', status: 'coming_soon', description: 'Thượng tầng THPT — sắp khai mở.' },
  { tier: 12, name: 'Tầng Lớp 12', icon: '☄️', status: 'coming_soon', description: 'Đỉnh tầng — hướng tới kỳ thi THPT Quốc Gia.' }
];

export function getGradeTierConfig(tier: GradeTier): GradeTierConfig {
  return GRADE_TIERS.find(t => t.tier === tier) ?? GRADE_TIERS[3];
}

// ==================== SUBJECT DEFINITIONS ====================
export type SubjectId = 
  | 'english' 
  | 'math' 
  | 'literature' 
  | 'science' 
  | 'history_geography' 
  | 'civics' 
  | 'technology' 
  | 'informatics' 
  | 'arts';

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  group: 'chuyen_sau' | 'co_ban';
}

export const SUBJECTS_CONFIG: Record<SubjectId, SubjectConfig> = {
  english: { id: 'english', name: 'Tiếng Anh', icon: '🇬🇧', color: '#00f0ff', group: 'chuyen_sau' },
  math: { id: 'math', name: 'Toán Học', icon: '📐', color: '#ff007f', group: 'chuyen_sau' },
  literature: { id: 'literature', name: 'Ngữ Văn', icon: '📖', color: '#f97316', group: 'chuyen_sau' },
  science: { id: 'science', name: 'Khoa Học Tự Nhiên', icon: '🧪', color: '#10b981', group: 'co_ban' },
  history_geography: { id: 'history_geography', name: 'Lịch Sử & Địa Lý', icon: '🗺️', color: '#8b5cf6', group: 'co_ban' },
  civics: { id: 'civics', name: 'Giáo Dục Công Dân', icon: '⚖️', color: '#f59e0b', group: 'co_ban' },
  technology: { id: 'technology', name: 'Công Nghệ', icon: '🛠️', color: '#3b82f6', group: 'co_ban' },
  informatics: { id: 'informatics', name: 'Tin Học', icon: '💻', color: '#ec4899', group: 'co_ban' },
  arts: { id: 'arts', name: 'Nghệ Thuật', icon: '🎨', color: '#14b8a6', group: 'co_ban' }
};

// ==================== WUXIA RANK DEFINITIONS ====================
export type StudentRankId = 'tan-de-tu' | 'de-tu' | 'thieu-hiep' | 'cao-thu' | 'dai-hiep' | 'tong-su';

export interface StudentRank {
  id: StudentRankId;
  name: string;
  icon: string;
  minLevel: number;
  description: string;
}

export const STUDENT_RANKS: StudentRank[] = [
  { id: 'tan-de-tu', name: 'Tân Đệ Tử', icon: '🌱', minLevel: 1, description: 'Mới nhập môn võ học học viện, làm quen với các khái niệm căn bản.' },
  { id: 'de-tu', name: 'Đệ Tử', icon: '🥋', minLevel: 5, description: 'Đã bắt đầu tu học kiến thức chuyên sâu của các môn phái.' },
  { id: 'thieu-hiep', name: 'Môn Sinh', icon: '⚔️', minLevel: 15, description: 'Có nền tảng vững vàng, đã tự mình vượt qua nhiều thử thách.' },
  { id: 'cao-thu', name: 'Cao Thủ', icon: '⭐', minLevel: 30, description: 'Đạt được những thành tích nổi bật và độ chính xác cao khi giải bài.' },
  { id: 'dai-hiep', name: 'Đại Hiệp', icon: '🐉', minLevel: 50, description: 'Võ công thượng thừa, nằm trong danh sách các môn sinh đứng đầu môn phái.' },
  { id: 'tong-su', name: 'Tông Sư', icon: '👑', minLevel: 80, description: 'Đỉnh phong võ học, danh hiệu cao nhất chỉ dành cho rất ít người xuất chúng.' }
];

export function getStudentRankForLevel(level: number): StudentRank {
  for (let i = STUDENT_RANKS.length - 1; i >= 0; i--) {
    if (level >= STUDENT_RANKS[i].minLevel) {
      return STUDENT_RANKS[i];
    }
  }
  return STUDENT_RANKS[0];
}
