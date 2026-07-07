import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_QUESTIONS } from '../data/questions';
import { INITIAL_LESSONS, type Lesson } from '../data/lessons';
import { eventBus } from '../utils/EventBus';
import { supabase } from '../utils/supabaseClient';
import { toast } from '../utils/toast';
import type {
  UserProfile,
  PlayerProfile,
  Question,
  CategoryStat,
  PetState,
  ParentReward,
  HistoryLog,
  Challenge,
  DailyMission,
  UiThemeId,
  GameSettings
} from '../types/game';
import { DEFAULT_UI_THEME } from '../theme/uiThemes';

const HELP_TOPICS: Record<string, { title: string; bullets: string[] }> = {
  xp: {
    title: 'Cấp độ & Kinh Nghiệm (XP)',
    bullets: [
      '• Làm đúng mỗi câu hỏi trắc nghiệm sẽ cộng thêm từ 10 - 25 XP tùy độ khó.',
      '• Đủ điểm XP quy định sẽ thăng cấp (Level Up) giúp tăng giới hạn và tiến hóa Thú cưng.',
      '• Chiến thắng Boss hoặc hoàn thành Nhiệm vụ ngày nhận lượng XP siêu khủng.'
    ]
  },
  energy: {
    title: 'Chỉ số Năng lượng (Energy)',
    bullets: [
      '• Giới hạn 1000 Energy mỗi ngày, tự động nạp đầy 100% vào lúc 0h sáng.',
      '• Mỗi lần làm bài luyện tập thường tiêu hao 10 Energy.',
      '• Các trận đấu Boss hoặc khiêu chiến Dungeon tiêu hao 20 Energy.',
      '• Giới hạn này giúp bảo vệ mắt và sức khỏe của con, tránh học tập quá sức.'
    ]
  },
  hearts: {
    title: 'Trái tim sinh mệnh (Hearts)',
    bullets: [
      '• Con có tối đa 3 trái tim khi tham gia Đấu trường hoặc làm bài thi.',
      '• Mỗi câu trả lời sai sẽ làm mất 1 trái tim.',
      '• Nếu mất hết cả 3 trái tim, lượt thi đấu sẽ thất bại và con phải làm lại từ đầu.',
      '• Năng lượng không bị mất khi con làm sai, chỉ mất mạng chơi.'
    ]
  },
  nanite: {
    title: 'Nanite Points (Xu NP)',
    bullets: [
      '• Đây là tiền ảo trong game nhận được mỗi khi con trả lời đúng câu hỏi.',
      '• Số xu kiếm được tương xứng với lượng XP nhận được.',
      '• Con dùng xu vàng NP này trong Cửa hàng để mua Khiên bảo vệ Streak hoặc đổi các phần quà thực tế từ Ba Mẹ.'
    ]
  },
  wallet: {
    title: 'Ví tích lũy VND từ Ba Mẹ',
    bullets: [
      '• Hiển thị số tiền mặt thực tế con tích lũy được từ việc học tập.',
      '• Khi con dùng xu NP để đổi các phần quà có giá trị tiền mặt (ví dụ: Ly trà sữa, 1h chơi iPad), yêu cầu sẽ gửi tới Ba Mẹ.',
      '• Khi Ba Mẹ bấm duyệt yêu cầu trên trang Admin, số tiền sẽ được cộng vào Ví này và con có thể rút ra chi tiêu.'
    ]
  },
  dragon: {
    title: 'Thú cưng Rồng Đồng Hành',
    bullets: [
      '• Rồng con sẽ đồng hành cùng con trong suốt quá trình làm bài tập.',
      '• Rồng tiến hóa qua 4 giai đoạn: Trứng (Egg) -> Rồng con (Hatchling) -> Rồng thiếu niên (Teen) -> Rồng trưởng thành (Adult).',
      '• Thú cưng thăng cấp dựa trên Cấp độ học tập của con.',
      '• Con cần dùng xu NP mua thức ăn trong shop để cho Rồng ăn thường xuyên, giữ chỉ số cảm xúc vui vẻ.'
    ]
  },
  prediction: {
    title: 'AI Dự đoán điểm thi lớp 10',
    bullets: [
      '• Công cụ phân tích thông minh sử dụng thuật toán máy học đánh giá kết quả làm bài của con.',
      '• Yêu cầu con làm tối thiểu 20 câu hỏi để AI bắt đầu có dữ liệu phân tích.',
      '• Luyện tập trên 200 câu giúp giảm biên độ sai số xuống cực thấp (±0.2 điểm).',
      '• Điểm số dự kiến mô phỏng sát nhất với kết quả làm bài thi thật vào lớp 10.'
    ]
  },
  'ai-ingest': {
    title: 'Tự động Nhập Đề thi bằng AI',
    bullets: [
      '• Ba Mẹ chỉ cần copy văn bản thô, tài liệu đề thi học kỳ hoặc gõ câu hỏi vào khung nhập liệu.',
      '• Nhấn nút "Phân tích bằng AI" để AI tự động bóc tách thành các câu hỏi trắc nghiệm hoàn chỉnh (có đề bài, 4 đáp án lựa chọn, đáp án đúng và lời giải chi tiết).',
      '• Nhấn "Xác nhận nhập" để lưu trực tiếp câu hỏi vào ngân hàng đề thi của con.'
    ]
  },
  'parent-console': {
    title: 'Hướng dẫn sử dụng Bảng Quản Trị',
    bullets: [
      '• Tab Thành viên: Hiển thị danh sách các con. Nhấp "Xem Hoạt Động" để xem chi tiết tiến trình học, biểu đồ năng lực, trạng thái pet và 50 lịch sử gần nhất.',
      '• Tab Ngân hàng: Có bộ đếm theo loại câu, theo part, theo chuyên đề và nút mở help cho từng môn.',
      '• Duyệt đổi quà: Phê duyệt nhanh các món quà con gửi yêu cầu ngay trong bảng Xem Hoạt Động.',
      '• AI Ingest: Nơi ba mẹ tự biên soạn hoặc nạp thêm ngân hàng câu hỏi mới cho con làm bài.'
    ]
  },
  'bank-structure': {
    title: 'Cách đọc ngân hàng câu hỏi',
    bullets: [
      '• Mỗi câu nên có subject, category và metadata để UI lọc đúng dạng.',
      '• examPart dùng để chia đề theo phần / bài; answerMode cho biết cách chấm.',
      '• solutionStyle và solutionSteps là khung chấm điểm nhanh cho CRUD và AI.'
    ]
  },
  'math-bank': {
    title: 'Dạng Toán & cách chấm',
    bullets: [
      '• Giữ đủ 8 bài: đồ thị, Viète, hàm bậc nhất, tăng trưởng %, giảm giá, thể tích dâng nước, mua hàng khuyến mãi, hình học chứng minh.',
      '• Bài nhiều ý nên dùng answerMode = multi-part và subparts = [a, b, c].',
      '• proof / diagram nên có solutionSteps rõ từng ý để chấm rubric không lệch.'
    ]
  },
  'english-bank': {
    title: 'Dạng Tiếng Anh',
    bullets: [
      '• Part I là MCQ: grammar, vocabulary, pronunciation, stress, communication, signs.',
      '• Part II - III nên gắn guided-cloze hoặc reading để lọc đúng bài đọc.',
      '• Part IV - VI nên lưu word-form, rearrangement, transformation và các đáp án chấp nhận được.'
    ]
  },
  'literature-bank': {
    title: 'Dạng Ngữ văn',
    bullets: [
      '• Tách rõ reading, tiếng Việt, nghị luận xã hội và nghị luận văn học.',
      '• Bài đọc hiểu nên lưu textGenre và literatureTask để lọc đúng câu hỏi.',
      '• Bài nghị luận nên dùng solutionSteps + correctAnswer dạng rubric để chấm từng ý.'
    ]
  },
  rubric: {
    title: 'Cách trình bày và chấm điểm',
    bullets: [
      '• Bố cục rõ: mở bài, thân bài, kết luận hoặc từng ý a/b/c.',
      '• Ghi đủ bước biến đổi, công thức, và đơn vị để AI chấm không phải đoán.',
      '• Ưu tiên answerMode phù hợp: short-answer cho đáp số, proof cho chứng minh, multi-part cho bài phân hóa.'
    ]
  },
  'question-type-mcq': {
    title: 'Trắc nghiệm',
    bullets: [
      '• Chỉ nên lưu 1 đáp án đúng duy nhất trong correctAnswer.',
      '• Giữ 4 lựa chọn rõ ràng, cùng định dạng, tránh đáp án dài ngắn lệch nhau.',
      '• Khi giải thích, nêu vì sao đáp án đúng và vì sao các phương án còn lại sai.'
    ]
  },
  'question-type-short-answer': {
    title: 'Tự luận ngắn',
    bullets: [
      '• Nên có đáp số cuối rõ ràng, kèm đơn vị nếu có.',
      '• solutionSteps nên chia 2-4 bước ngắn, đúng trọng tâm.',
      '• Chấm theo đáp số + lập luận; không nên viết dài lan man.'
    ]
  },
  'question-type-proof': {
    title: 'Chứng minh',
    bullets: [
      '• Trình bày theo giả thiết -> suy luận -> kết luận.',
      '• Mỗi ý chứng minh nên có mốc riêng để chấm rubric.',
      '• Nếu là hình học, nên nêu rõ góc, tam giác đồng dạng, hệ thức lượng hoặc phương tích.'
    ]
  },
  'question-type-multi-part': {
    title: 'Nhiều ý',
    bullets: [
      '• Tách từng ý a/b/c trong prompt và solutionSteps.',
      '• Mỗi ý cần kết quả riêng để hệ thống chấm từng phần.',
      '• Nếu một ý là điều kiện, ý sau là tính toán, phải ghi rõ trình tự để UI không lẫn.'
    ]
  },
  'question-type-wordform': {
    title: 'Word form',
    bullets: [
      '• Lưu đúng từ gốc và các đáp án chấp nhận được.',
      '• Nếu có nhiều biến thể đúng, liệt kê hết trong correctAnswer.',
      '• Khi chấm, ưu tiên đúng loại từ và đúng ngữ cảnh câu.'
    ]
  },
  'question-type-rewrite': {
    title: 'Rewrite / Transformation',
    bullets: [
      '• Giữ nguyên nghĩa, đổi đúng cấu trúc được yêu cầu.',
      '• Lưu nhiều đáp án chấp nhận được nếu đề cho phép biến thể.',
      '• Chấm theo đúng dạng chuyển đổi: passive, reported speech, clause, inversion, etc.'
    ]
  },
  'question-type-cloze': {
    title: 'Cloze',
    bullets: [
      '• Chú ý ngữ cảnh trước và sau chỗ trống.',
      '• Nếu là guided cloze, nên ghi rõ dạng từ cần điền và collocation.',
      '• Chấm theo đáp án đúng hoặc các biến thể được chấp nhận.'
    ]
  },
  'question-type-reading': {
    title: 'Reading',
    bullets: [
      '• Luôn gắn đoạn đọc / ngữ liệu gốc ở đầu prompt.',
      '• Câu hỏi nên ghi rõ cần main idea, detail, reference hay true/false.',
      '• Chấm theo ý chính, không chỉ theo từ khóa rời rạc.'
    ]
  },
  streak: {
    title: 'Chuỗi học tập liên tục (Streak)',
    bullets: [
      '• Chuỗi ngày liên tiếp con đăng nhập làm bài tập.',
      '• Duy trì chuỗi Streak giúp nhân đôi lượng XP nhận được.',
      '• Nếu một ngày con không học tập, chuỗi Streak sẽ bị reset về 0.',
      '• Mẹo: Mua Khiên bảo vệ Streak (Streak Shield) trong cửa hàng để tự động giữ chuỗi nếu bận đột xuất.'
    ]
  }
};

interface GameState {
  // State
  currentUser: UserProfile | null;
  player: PlayerProfile;
  questions: Question[];
  lessons: Lesson[];
  lessonsProgress: Record<string, boolean>;
  categoryStats: Record<string, CategoryStat>;
  pet: PetState;
  rewards: ParentReward[];
  challenges: Challenge[];
  dailyMission: DailyMission | null;
  logs: HistoryLog[];
  parentPIN: string;
  activeCombo: number;
  maxCombo: number;

  // Subject States
  currentSubject: 'english' | 'math' | 'literature';
  setSubject: (subject: 'english' | 'math' | 'literature') => void;
  lastSyncTime: string | null;

  // Admin and management states
  adminStudents: any[];
  selectedStudentProfile: any | null;
  failedQuestionIds: string[];
  recentlyPlayedQuestionIds: string[];

  // Help States
  activeHelp: { title: string; bullets: string[] } | null;
  showHelp: (topic: string) => void;
  closeHelp: () => void;

  // Profiles cache for multi-player
  profiles: Record<string, PlayerProfile>;
  petStates: Record<string, PetState>;
  categoryStatsAll: Record<string, Record<string, CategoryStat>>;
  gameSettings: GameSettings;
  uiTheme: UiThemeId;
  uiThemesByUser: Record<string, UiThemeId>;
  setUiTheme: (themeId: UiThemeId) => void;

  // Initializers
  initEventSubscriptions: () => () => void;

  // Auth Actions
  login: (user: UserProfile) => void;
  logout: () => void;
  fetchAdminStudents: () => Promise<void>;
  promoteUser: (targetUserId: string, newRole: string) => Promise<void>;
  fetchStudentProfile: (studentUserId: string) => Promise<void>;
  adminApproveReward: (studentUserId: string, rewardId: string) => Promise<void>;
  adminRejectReward: (studentUserId: string, rewardId: string) => Promise<void>;
  adminDeductWallet: (studentUserId: string, amount: number) => Promise<void>;
  adminSetEnergy: (studentUserId: string, energyPercent: number) => Promise<void>;
  updateGameSettings: (payload: {
    bossBountiesVnd?: [number, number, number];
    challengeEnergyCosts?: [number, number, number, number];
    maxEnergy?: number;
    baseXP?: number;
    baseCoins?: number;
  }) => Promise<void>;

  // Player Actions
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
  buyHeart: () => boolean;
  buyHint: () => boolean;
  claimParentReward: (rewardId: string) => boolean;
  feedPet: () => void;
  spinWheel: () => { rewardType: string; amount: number; message: string };
  openMysteryBox: () => { rewardType: string; amount: number; message: string };
  masterLesson: (lessonId: string) => Promise<void>;

  // Parent Actions
  verifyPIN: (pin: string) => boolean;
  changePIN: (newPIN: string) => void;
  approveReward: (rewardId: string) => void;
  rejectReward: (rewardId: string) => void;
  addParentReward: (title: string, costCoins: number, cashValueVND: number) => void;
  importQuestions: (questions: Question[]) => void;
  deleteQuestion: (questionId: string) => Promise<boolean>;
  updateQuestion: (questionId: string, updatedQuestion: Partial<Question>) => Promise<boolean>;
  flagQuestionConfused: (question: Question) => Promise<boolean>;
  resetProgress: () => void; // Keeps questions, resets student stats

  // Systems Reset
  checkDailyReset: () => void;

  // Selection Logic
  getAdaptiveQuestion: (category: string) => Question | null;
  getQuestionByWeight: (mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed') => Question | null;
}

const DEFAULT_PIN = '1234';
const PLAYER_ENERGY_MAX = 1000;
const DEFAULT_GAME_SETTINGS: GameSettings = {
  bossBountiesVnd: [10000, 15000, 20000],
  challengeEnergyCosts: [10, 10, 15, 10],
  maxEnergy: 1000,
  baseXP: 15,
  baseCoins: 5
};

const INITIAL_PLAYER: PlayerProfile = {
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
  badges: []
};

const INITIAL_PET: PetState = {
  name: 'Rồng Con',
  stage: 'egg',
  level: 1,
  exp: 0,
  energy: 100,
  mood: 'neutral',
  lastFed: new Date().toISOString()
};

const DEFAULT_REWARDS: ParentReward[] = [
  { id: 'r-1', title: '15 phút chơi game', costCoins: 150, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-2', title: 'Ly trà sữa đặc biệt', costCoins: 400, cashValueVND: 0, status: 'pending', timestamp: Date.now() },
  { id: 'r-3', title: 'Thưởng 20.000đ tiền mặt', costCoins: 500, cashValueVND: 20000, status: 'pending', timestamp: Date.now() },
  { id: 'r-4', title: 'Thưởng 50.000đ tiền mặt', costCoins: 1000, cashValueVND: 50000, status: 'pending', timestamp: Date.now() },
  { id: 'r-5', title: 'Thưởng 100.000đ tiền mặt', costCoins: 1800, cashValueVND: 100000, status: 'pending', timestamp: Date.now() }
];

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch-1', type: 'daily', title: 'Luyện 20 câu hỏi', description: 'Hoàn thành làm 20 câu hỏi bất kỳ', targetCount: 20, currentCount: 0, rewardCoins: 100, rewardXP: 100, completed: false },
  { id: 'ch-2', type: 'daily', title: 'Chiến binh Grammar', description: 'Trả lời đúng 10 câu hỏi ngữ pháp', targetCount: 10, currentCount: 0, rewardCoins: 80, rewardXP: 80, completed: false, category: 'grammar' },
  { id: 'ch-3', type: 'daily', title: 'Không tỳ vết', description: 'Đạt chuỗi đúng 10 câu liên tiếp', targetCount: 10, currentCount: 0, rewardCoins: 120, rewardXP: 150, completed: false },
  { id: 'ch-4', type: 'weekly', title: 'Học tập bền bỉ', description: 'Hoàn thành 100 câu hỏi trong tuần', targetCount: 100, currentCount: 0, rewardCoins: 500, rewardXP: 500, completed: false },
  { id: 'ch-5', type: 'achievement', title: 'Khởi đầu vinh quang', description: 'Tổng cộng trả lời đúng 100 câu', targetCount: 100, currentCount: 0, rewardCoins: 300, rewardXP: 300, completed: false },
  { id: 'ch-6', type: 'achievement', title: 'Huyền thoại học đường', description: 'Tổng cộng trả lời đúng 1000 câu', targetCount: 1000, currentCount: 0, rewardCoins: 2000, rewardXP: 2000, completed: false }
];

export const useGameState = create<GameState>()(
  persist(
    (originalSet, get) => {
      // Intercept set updates to automatically keep profiles in sync
      let syncTimeout: any = null;
      const triggerDebouncedSync = () => {
        const user = get().currentUser;
        if (!user || user.id.startsWith('mock-')) return;

        if (syncTimeout) clearTimeout(syncTimeout);

        syncTimeout = setTimeout(async () => {
          try {
            const state = get();
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const syncPayload = {
              player: state.player,
              pet: state.pet,
              categoryStats: state.categoryStats,
              logs: state.logs,
              rewards: state.rewards,
              challenges: state.challenges,
              dailyMission: state.dailyMission,
              lessonsProgress: state.lessonsProgress,
              lastSyncTime: state.lastSyncTime
            };

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000')}/api/profile/sync`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(syncPayload)
            });
            if (res.ok) {
              const resData = await res.json();
              console.log('Profile synced with Supabase Postgres.');
              
              originalSet((s: GameState) => {
                const updatedPlayer = resData.player ? {
                  ...s.player,
                  energy: resData.player.energy,
                  walletVND: resData.player.walletVND
                } : s.player;
                return {
                  lastSyncTime: resData.timestamp || new Date().toISOString(),
                  player: updatedPlayer
                };
              });
            }
          } catch (error) {
            console.error('Lỗi đồng bộ Supabase:', error);
          }
        }, 3000);
      };

      const set = (
        fn: GameState | Partial<GameState> | ((state: GameState) => GameState | Partial<GameState>),
        replace?: any
      ) => {
        originalSet((state: GameState) => {
          const nextState = typeof fn === 'function' ? (fn as Function)(state) : fn;
          const currentUser = nextState.currentUser !== undefined ? nextState.currentUser : state.currentUser;
          
          const extra: any = {};
          if (currentUser) {
            const activePlayer = nextState.player || state.player;
            const activePet = nextState.pet || state.pet;
            const activeStats = nextState.categoryStats || state.categoryStats;
            
            extra.profiles = { ...(nextState.profiles || state.profiles), [currentUser.id]: activePlayer };
            extra.petStates = { ...(nextState.petStates || state.petStates), [currentUser.id]: activePet };
            extra.categoryStatsAll = { ...(nextState.categoryStatsAll || state.categoryStatsAll), [currentUser.id]: activeStats };
          }
          return { ...nextState, ...extra };
        }, replace);
        triggerDebouncedSync();
      };
      // Helper to log audit trail
      const logActivity = (
        activityType: HistoryLog['activityType'],
        title: string,
        detail: string,
        coins = 0,
        xp = 0,
        wallet = 0
      ) => {
        const newLog: HistoryLog = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          activityType,
          title,
          detail,
          coinsChanged: coins,
          xpChanged: xp,
          walletChanged: wallet
        };
        set(state => ({
          logs: [newLog, ...state.logs].slice(0, 200) // Keep last 200 logs
        }));
      };

      // Helper to process level up
      const checkLevelUp = (currentXp: number, currentLevel: number) => {
        let level = currentLevel;
        let xp = currentXp;
        
        // Define simple linear-exponential progression: next level costs Level * 200 XP
        while (xp >= level * 200) {
          xp -= level * 200;
          level += 1;
          logActivity('exercise', 'Thăng cấp!', `Con đã đạt Level ${level}!`, 50, 0, 0);
          eventBus.publish('PET_GROWTH', { levelUp: true });
        }
        return { level, xp };
      };

      return {
        // Initial States
        currentUser: null,
        player: INITIAL_PLAYER,
        questions: INITIAL_QUESTIONS,
        lessons: INITIAL_LESSONS,
        lessonsProgress: {},
        currentSubject: 'english',
        categoryStats: {},
        failedQuestionIds: [],
        recentlyPlayedQuestionIds: [],
        gameSettings: DEFAULT_GAME_SETTINGS,
        pet: INITIAL_PET,
        rewards: DEFAULT_REWARDS,
        challenges: INITIAL_CHALLENGES,
        dailyMission: null,
        logs: [],
        parentPIN: DEFAULT_PIN,
        activeCombo: 0,
        adminStudents: [],
        selectedStudentProfile: null,
        activeHelp: null,
        maxCombo: 0,
        lastSyncTime: null,

        // Profiles cache for multi-player
        profiles: {},
        petStates: {},
        categoryStatsAll: {},
        uiTheme: DEFAULT_UI_THEME,
        uiThemesByUser: {},

        setSubject: (subject) => {
          set({ currentSubject: subject });
          logActivity('exercise', 'Chuyển môn học', `Con đã chuyển sang học môn ${subject === 'math' ? 'Toán Học' : subject === 'literature' ? 'Ngữ Văn' : 'Tiếng Anh'}.`, 0, 0, 0);
        },

        // Initialize listeners
        initEventSubscriptions: () => {
          const unsubQuestion = eventBus.subscribe('QUESTION_ANSWERED', (data: { questionId: string; category: string; isCorrect: boolean; difficulty: number; gameMode: string }) => {
            const { category, isCorrect } = data;
            
            // 1. Update Pet state
            set(state => {
              const petExpGained = isCorrect ? 15 : 3;
              let newPetXp = state.pet.exp + petExpGained;
              let newPetLevel = state.pet.level;
              let newPetStage = state.pet.stage;

              // Pet evolution milestones
              const expNeeded = newPetLevel * 150;
              if (newPetXp >= expNeeded) {
                newPetXp -= expNeeded;
                newPetLevel += 1;
              }

              if (newPetLevel >= 15) newPetStage = 'legend';
              else if (newPetLevel >= 8) newPetStage = 'dragon';
              else if (newPetLevel >= 3) newPetStage = 'baby';

              return {
                pet: {
                  ...state.pet,
                  level: newPetLevel,
                  exp: newPetXp,
                  stage: newPetStage,
                  mood: isCorrect ? 'happy' : state.pet.mood,
                  energy: Math.min(100, state.pet.energy + (isCorrect ? 2 : 0))
                }
              };
            });

            // 2. Update Challenges current progress
            set(state => {
              const updatedChallenges = state.challenges.map(ch => {
                if (ch.completed) return ch;

                let match = false;
                if (ch.type === 'daily' || ch.type === 'weekly' || ch.type === 'achievement') {
                  if (ch.id === 'ch-1' || ch.id === 'ch-4' || ch.id === 'ch-5' || ch.id === 'ch-6') {
                    // General question counters
                    match = true;
                  } else if (ch.id === 'ch-2' && (category === 'grammar' || category === 'passive-voice' || category === 'relative-clauses' || category === 'tenses' || category === 'rewrite')) {
                    // Grammar specific
                    match = isCorrect;
                  } else if (ch.id === 'ch-3' && isCorrect) {
                    // Handled separately below by matching the active combo count
                  }
                }

                if (match) {
                  const newCount = ch.currentCount + 1;
                  const isCompletedNow = newCount >= ch.targetCount;
                  if (isCompletedNow) {
                    // Publish reward
                    setTimeout(() => {
                      get().addEnergy(20);
                      set(prev => ({
                        player: {
                          ...prev.player,
                          coins: prev.player.coins + ch.rewardCoins,
                          xp: prev.player.xp + ch.rewardXP
                        }
                      }));
                      logActivity('challenge', 'Hoàn thành Thử thách', `Đã xong: ${ch.title}`, ch.rewardCoins, ch.rewardXP);
                    }, 10);
                  }
                  return {
                    ...ch,
                    currentCount: newCount,
                    completed: isCompletedNow
                  };
                }
                return ch;
              });

              return { challenges: updatedChallenges };
            });

            // Handled combo challenge
            if (isCorrect) {
              const combo = get().activeCombo;
              set(state => {
                const updatedChallenges = state.challenges.map(ch => {
                  if (ch.id === 'ch-3' && !ch.completed) {
                    const isCompletedNow = combo >= ch.targetCount;
                    if (isCompletedNow) {
                      setTimeout(() => {
                        get().addEnergy(20);
                        set(prev => ({
                          player: {
                            ...prev.player,
                            coins: prev.player.coins + ch.rewardCoins,
                            xp: prev.player.xp + ch.rewardXP
                          }
                        }));
                        logActivity('challenge', 'Hoàn thành Thử thách', `Đã xong: ${ch.title}`, ch.rewardCoins, ch.rewardXP);
                      }, 10);
                      return { ...ch, currentCount: combo, completed: true };
                    }
                    return { ...ch, currentCount: Math.max(ch.currentCount, combo) };
                  }
                  return ch;
                });
                return { challenges: updatedChallenges };
              });
            }

            // 3. Update Daily Mission requirements
            set(state => {
              if (!state.dailyMission || state.dailyMission.completed) return {};

              let updatedRequirements = state.dailyMission.requirements.map(req => {
                if (req.completed) return req;

                let match = false;
                if (req.type === 'count') {
                  match = true;
                } else if (req.type === 'category') {
                  if (req.description.includes('Grammar') && (category === 'grammar' || category === 'passive-voice' || category === 'relative-clauses' || category === 'tenses' || category === 'rewrite')) {
                    match = true;
                  } else if (req.description.includes('Reading') && (category === 'reading' || category === 'cloze')) {
                    match = true;
                  }
                }

                if (match) {
                  const newCurrent = req.current + 1;
                  return {
                    ...req,
                    current: newCurrent,
                    completed: newCurrent >= req.target
                  };
                }
                return req;
              });

              // Check accuracy constraint (accuracy calculated across this session)
              // If accuracy req exists, update its value based on historical records of the day.
              const allReqsDone = updatedRequirements.every(req => req.completed);
              
              if (allReqsDone && !state.dailyMission.completed) {
                // Mission completed
                setTimeout(() => {
                  set(prev => ({
                    player: {
                      ...prev.player,
                      walletVND: prev.player.walletVND + (state.dailyMission?.rewardVND || 0),
                      xp: prev.player.xp + (state.dailyMission?.rewardXP || 0)
                    }
                  }));
                  logActivity('box_open', 'Nhiệm vụ Ngày hoàn thành!', `Tiền thưởng nhiệm vụ +${state.dailyMission?.rewardVND.toLocaleString()}đ đã cộng vào ví`, 0, state.dailyMission?.rewardXP || 0, state.dailyMission?.rewardVND);
                }, 10);
              }

              return {
                dailyMission: {
                  ...state.dailyMission,
                  requirements: updatedRequirements,
                  completed: allReqsDone
                }
              };
            });
          });

          const unsubCheckIn = eventBus.subscribe('DAILY_CHECK_IN', (data: { streakBroken: boolean; penaltyApplied: boolean }) => {
            if (data.streakBroken) {
              set(state => ({
                player: {
                  ...state.player,
                  streak: 0,
                  coins: Math.max(0, state.player.coins - (data.penaltyApplied ? 50 : 0))
                },
                pet: {
                  ...state.pet,
                  mood: 'sad',
                  energy: Math.max(10, state.pet.energy - 30)
                }
              }));
              if (data.penaltyApplied) {
                logActivity('streak_penalty', 'Hụt Streak Học tập', 'Ba ngày lười biếng làm Pet buồn, trừ 50 NP bảo trì hệ thống!', -50, 0, 0);
              } else {
                logActivity('streak_penalty', 'Đứt chuỗi Streak', 'Chuỗi Streak học đã quay lại số 0!', 0, 0, 0);
              }
            }
          });

          return () => {
            unsubQuestion();
            unsubCheckIn();
          };
        },

        // Auth Actions
        login: async (user) => {
          if (user.id.startsWith('mock-')) {
            set(state => {
              const resolvedTheme = state.uiThemesByUser[user.id] || DEFAULT_UI_THEME;
              const newPlayer = state.profiles[user.id] || {
                id: user.id,
                name: user.name,
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

              const newPet = state.petStates[user.id] || {
                name: 'Rồng Con',
                stage: 'egg',
                level: 1,
                exp: 0,
                energy: 100,
                mood: 'neutral',
                lastFed: new Date().toISOString()
              };

              const newStats = state.categoryStatsAll[user.id] || {};

              return {
                currentUser: user,
                player: newPlayer,
                pet: newPet,
                categoryStats: newStats,
                gameSettings: state.gameSettings || DEFAULT_GAME_SETTINGS,
                uiTheme: resolvedTheme
              };
            });
            logActivity('energy_refill', 'Đăng nhập thành công', `Chào mừng ${user.name} đã gia nhập CyberEnglish!`);
            return;
          }

          // Real Supabase login
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

            // Sync user details to backend pg first
            await fetch(`${backendUrl}/api/auth/sync-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            // Retrieve profile
            const res = await fetch(`${backendUrl}/api/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (res.ok) {
              const data = await res.json();
              const dbCustomQs = data.customQuestions || [];
              const resolvedTheme = (get().uiThemesByUser[data.currentUser?.id || user.id] || DEFAULT_UI_THEME) as UiThemeId;

              set(_state => {
                const mergedQuestions = [...INITIAL_QUESTIONS];
                dbCustomQs.forEach((q: any) => {
                  const idx = mergedQuestions.findIndex(eq => eq.id === q.id);
                  if (idx !== -1) {
                    mergedQuestions[idx] = q;
                  } else if (!mergedQuestions.some(eq => eq.prompt === q.prompt)) {
                    mergedQuestions.push(q);
                  }
                });

                return {
                  currentUser: data.currentUser || user,
                  uiTheme: resolvedTheme,
                  player: data.player || {
                    id: user.id,
                    name: user.name,
                    role: (data.currentUser?.role || 'student') as any,
                    level: 1,
                    xp: 0,
                    coins: 200,
                    walletVND: 0,
                    streak: 0,
                    energy: PLAYER_ENERGY_MAX,
                    hearts: 3,
                    lastActive: new Date().toISOString(),
                    badges: []
                  },
                  pet: data.pet || {
                    name: 'Rồng Con',
                    stage: 'egg',
                    level: 1,
                    exp: 0,
                    energy: 100,
                    mood: 'neutral',
                    lastFed: new Date().toISOString()
                  },
                  categoryStats: data.categoryStats || {},
                  logs: data.logs || [],
                  rewards: data.rewards || [],
                  challenges: data.challenges || INITIAL_CHALLENGES,
                  dailyMission: data.dailyMission || null,
                  gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
                  questions: mergedQuestions,
                  lessons: data.lessons || INITIAL_LESSONS,
                  lessonsProgress: data.lessonsProgress || {}
                };
              });
              logActivity('energy_refill', 'Đồng bộ Đám mây', `Tải dữ liệu học tập thành công cho ${user.name}!`);
            }
          } catch (e) {
            console.error('Lỗi khi tải thông tin từ backend Supabase:', e);
            // Fallback to local profile if offline
            set(state => {
              const updatedUser = {
                ...user,
                role: user.email === 'hoang.hoa@gmail.com' ? 'admin' : 'student'
              };
              const resolvedTheme = state.uiThemesByUser[user.id] || DEFAULT_UI_THEME;
              const newPlayer = state.profiles[user.id] || {
                id: user.id,
                name: user.name,
                role: updatedUser.role as any,
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
              return {
                currentUser: updatedUser,
                player: newPlayer,
                uiTheme: resolvedTheme,
                gameSettings: state.gameSettings || DEFAULT_GAME_SETTINGS
              };
            });
          }
        },

        logout: async () => {
          await supabase.auth.signOut();
          set({
            currentUser: null,
            player: INITIAL_PLAYER,
            pet: INITIAL_PET,
            categoryStats: {},
            gameSettings: DEFAULT_GAME_SETTINGS,
            activeCombo: 0,
            adminStudents: [],
            selectedStudentProfile: null,
            activeHelp: null,
            uiTheme: DEFAULT_UI_THEME
          });
        },

        setUiTheme: (themeId) => {
          const userId = get().currentUser?.id;
          set(prev => ({
            uiTheme: themeId,
            uiThemesByUser: userId
              ? { ...prev.uiThemesByUser, [userId]: themeId }
              : prev.uiThemesByUser
          }));
        },

        showHelp: (topic) => {
          const content = HELP_TOPICS[topic] || null;
          set({ activeHelp: content });
        },

        closeHelp: () => {
          set({ activeHelp: null });
        },

        fetchAdminStudents: async () => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/users`, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
              const users = await res.json();
              set({ adminStudents: users });
            }
          } catch (e) {
            console.error('Error fetching admin students list:', e);
          }
        },

        promoteUser: async (targetUserId: string, newRole: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/promote`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ targetUserId, newRole })
            });
            if (res.ok) {
              // Refresh students list
              await get().fetchAdminStudents();
            }
          } catch (e) {
            console.error('Error promoting user:', e);
          }
        },

        fetchStudentProfile: async (studentUserId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/student-profile?studentUserId=${studentUserId}`, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            if (res.ok) {
              const profile = await res.json();
              set({ selectedStudentProfile: profile });
            }
          } catch (e) {
            console.error('Error fetching student profile:', e);
          }
        },

        adminApproveReward: async (studentUserId: string, rewardId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/approve-reward`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, rewardId })
            });
            if (res.ok) {
              // Reload profile
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error approving student reward:', e);
          }
        },

        adminRejectReward: async (studentUserId: string, rewardId: string) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/reject-reward`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, rewardId })
            });
            if (res.ok) {
              // Reload profile
              await get().fetchStudentProfile(studentUserId);
            }
          } catch (e) {
            console.error('Error rejecting student reward:', e);
          }
        },

        adminDeductWallet: async (studentUserId: string, amount: number) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/deduct-wallet`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, amount })
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi khấu trừ ví.');
              return;
            }
            // Reload profile
            await get().fetchStudentProfile(studentUserId);
            toast.success(`Khấu trừ ví thành công: ${amount.toLocaleString()}đ.`);
          } catch (e) {
            console.error('Error deducting student wallet:', e);
            toast.error('Lỗi kết nối khi khấu trừ ví.');
          }
        },

        adminSetEnergy: async (studentUserId: string, energyPercent: number) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const clampedPercent = Math.max(0, Math.min(100, Math.round(energyPercent)));
            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/refill-energy`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ studentUserId, energyPercent: clampedPercent })
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi cập nhật năng lượng.');
              return;
            }
            await get().fetchStudentProfile(studentUserId);
            toast.success(`Cập nhật năng lượng thành công: ${clampedPercent}%.`);
          } catch (e) {
            console.error('Error updating student energy:', e);
            toast.error('Lỗi kết nối khi cập nhật năng lượng.');
          }
        },

        updateGameSettings: async (payload) => {
          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/admin/game-settings`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(payload)
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Lỗi khi cập nhật cấu hình.');
              return;
            }
            set(state => ({
              gameSettings: {
                ...state.gameSettings,
                ...payload
              }
            }));
            toast.success('Cập nhật cấu hình trò chơi thành công.');
          } catch (e) {
            console.error('Error updating game settings:', e);
            toast.error('Lỗi kết nối khi cập nhật cấu hình.');
          }
        },

        // Student Actions
        answerQuestion: (questionId, isCorrect, _timeSpent, gameMode, scoreRatio = isCorrect ? 1 : 0) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return { isCorrect: false, expGained: 0, coinsGained: 0, comboMultiplier: 1, scoreRatio: 0 };

          // 1. Update rolling category stats
          const category = question.category;
          const currentStat = state.categoryStats[category] || {
            category,
            totalAnswered: 0,
            totalCorrect: 0,
            rollingAccuracy: 1,
            recentResults: []
          };

          const performanceScore = Math.max(0, Math.min(1, scoreRatio));
          const effectiveCorrect = performanceScore >= 0.6;
          const newRecentResults = [...(currentStat.recentResults || []), effectiveCorrect].slice(-10); // Keep last 10
          const correctCount = newRecentResults.filter(Boolean).length;
          const rollingAccuracy = correctCount / newRecentResults.length;

          const updatedStats = {
            ...state.categoryStats,
            [category]: {
              category,
              totalAnswered: currentStat.totalAnswered + 1,
              totalCorrect: currentStat.totalCorrect + (effectiveCorrect ? 1 : 0),
              rollingAccuracy,
              recentResults: newRecentResults
            }
          };

          // 2. Calculate rewards
          let expGained = 0;
          let coinsGained = 0;
          let newCombo = state.activeCombo;
          let comboMultiplier = 1.0;

          if (performanceScore > 0) {
            if (effectiveCorrect) newCombo += 1;
            
            // Set multipliers
            if (newCombo >= 30) comboMultiplier = 2.0;
            else if (newCombo >= 20) comboMultiplier = 1.5;
            else if (newCombo >= 10) comboMultiplier = 1.2;

            // Base scores adjusted by difficulty
            const baseXP = state.gameSettings.baseXP ?? 15;
            const baseCoins = state.gameSettings.baseCoins ?? 5;
            const difficultyMultiplier = 1 + (question.difficulty - 1) * 0.1; // e.g. diff 10 gives 1.9x

            expGained = Math.round(baseXP * difficultyMultiplier * comboMultiplier * performanceScore);
            coinsGained = Math.round(baseCoins * difficultyMultiplier * comboMultiplier * performanceScore);

            // Apply streak multiplier to coins and XP
            const streakBonus = 1 + Math.min(1.0, state.player.streak * 0.1); // Max 2.0x (10 days streak)
            expGained = Math.round(expGained * streakBonus);
            coinsGained = Math.round(coinsGained * streakBonus);

            // Apply 1.5x bonus for survival mode challenge
            if (gameMode === 'survival') {
              expGained = Math.round(expGained * 1.5);
              coinsGained = Math.round(coinsGained * 1.5);
            }
          } else {
            newCombo = 0; // Combo resets
            
            // Deduct heart for Survival/Boss mode
            if ((gameMode === 'survival' || gameMode === 'boss') && performanceScore < 0.35) {
              set(prev => ({
                player: {
                  ...prev.player,
                  hearts: Math.max(0, prev.player.hearts - 1)
                }
              }));
              logActivity('exercise', 'Mất 1 mạng!', `Trả lời sai câu hỏi ở chế độ ${gameMode}`, 0, 0, 0);
            }
          }

          const maxCombo = Math.max(state.maxCombo, newCombo);
          
          // Apply changes to player store
          const updatedXP = state.player.xp + expGained;
          const levelCheck = checkLevelUp(updatedXP, state.player.level);

          const updatedFailedIds = isCorrect
            ? state.failedQuestionIds.filter(id => id !== questionId)
            : state.failedQuestionIds.includes(questionId)
              ? state.failedQuestionIds
              : [...state.failedQuestionIds, questionId];

          const currentRecent = state.recentlyPlayedQuestionIds || [];
          const updatedRecent = [questionId, ...currentRecent.filter(id => id !== questionId)].slice(0, 20);

          set({
            categoryStats: updatedStats,
            activeCombo: newCombo,
            maxCombo,
            failedQuestionIds: updatedFailedIds,
            recentlyPlayedQuestionIds: updatedRecent,
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              coins: state.player.coins + coinsGained,
              lastActive: new Date().toISOString()
            }
          });

          // Write activity log
          if (performanceScore > 0 && !effectiveCorrect) {
            logActivity(
              'exercise',
              'Câu trả lời CHƯA ĐẠT',
              `Đúng một phần dạng [${question.category}] - Đạt ${Math.round(performanceScore * 10)}/10 theo rubric. Nhận +${coinsGained} NP / +${expGained} XP.`,
              coinsGained,
              expGained
            );
          } else if (isCorrect) {
            logActivity(
              'exercise', 
              'Câu trả lời ĐÚNG', 
              `Đúng dạng [${question.category}] - Nhận +${coinsGained} NP / +${expGained} XP. Combo: ${newCombo}x`, 
              coinsGained, 
              expGained
            );
          } else {
            logActivity(
              'exercise', 
              'Câu trả lời SAI', 
              `Sai dạng [${question.category}] - Thử lại lần sau nhé. Combo bị reset.`, 
              0, 
              0
            );
          }

          // Publish event
          eventBus.publish('QUESTION_ANSWERED', {
            questionId,
            category,
            isCorrect: effectiveCorrect,
            difficulty: question.difficulty,
            gameMode,
            scoreRatio: performanceScore
          });

          return { isCorrect: effectiveCorrect, expGained, coinsGained, comboMultiplier, scoreRatio: performanceScore };
        },

        useEnergy: (amount) => {
          const state = get();
          if (state.player.energy < amount) return false;
          set({
            player: {
              ...state.player,
              energy: state.player.energy - amount
            }
          });
          logActivity('energy_refill', 'Tiêu hao năng lượng', `Tiêu tốn ${amount} năng lượng khởi hành phụ bản.`);
          return true;
        },

        addEnergy: (amount) => {
          set(state => ({
            player: {
              ...state.player,
              energy: Math.min(state.gameSettings.maxEnergy ?? 1000, state.player.energy + amount)
            }
          }));
        },

        buyStreakShield: () => {
          const state = get();
          const cost = 150;
          if (state.player.coins < cost) return false;

          const hasShieldBadge = state.player.badges.includes('Streak Shield');
          if (hasShieldBadge) return false; // Max 1 shield owned

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost,
              badges: [...state.player.badges, 'Streak Shield']
            }
          });

          logActivity('shop', 'Mua Khiên Bảo Vệ', 'Đã mua 1 Khiên bảo vệ Chuỗi Streak học tập', -cost, 0);
          return true;
        },

        buyHeart: () => {
          const state = get();
          const cost = 100;
          if (state.player.coins < cost || state.player.hearts >= 3) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost,
              hearts: Math.min(3, state.player.hearts + 1)
            }
          });

          logActivity('shop', 'Mua Mạng (Heart)', 'Đã hồi phục 1 mạng', -cost, 0);
          return true;
        },

        buyHint: () => {
          const state = get();
          const cost = 50;
          if (state.player.coins < cost) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - cost
            }
          });

          logActivity('shop', 'Mua Gợi Ý', 'Dùng 50 NP mua 1 gợi ý cứu trợ trong bài làm', -cost, 0);
          return true;
        },

        masterLesson: async (lessonId) => {
          const state = get();
          const lesson = state.lessons.find(l => l.id === lessonId) || INITIAL_LESSONS.find(l => l.id === lessonId);
          if (!lesson) return;

          // Tránh cộng trùng thưởng nếu bài học đã được hoàn thành trước đó
          if (state.lessonsProgress[lessonId]) {
            return;
          }

          const expGained = 50;
          const coinsGained = 20;

          const updatedXP = state.player.xp + expGained;
          const levelCheck = checkLevelUp(updatedXP, state.player.level);

          set({
            lessonsProgress: {
              ...state.lessonsProgress,
              [lessonId]: true
            },
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              coins: state.player.coins + coinsGained
            }
          });

          logActivity('exercise', 'Lĩnh ngộ bài học!', `Đã lĩnh ngộ thành công chuyên đề: ${lesson.title}`, coinsGained, expGained, 0);
        },

        claimParentReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward || reward.status !== 'pending' || state.player.coins < reward.costCoins) return false;

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins - reward.costCoins
            },
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'approved' } : r)
          }));

          logActivity('shop', 'Yêu cầu Phần thưởng', `Đã quy đổi "${reward.title}" gửi cho Ba duyệt`, -reward.costCoins, 0);
          return true;
        },

        feedPet: () => {
          const state = get();
          if (state.pet.mood === 'happy' && state.pet.energy >= 100) return;

          set(prev => ({
            pet: {
              ...prev.pet,
              energy: Math.min(100, prev.pet.energy + 20),
              mood: 'happy',
              lastFed: new Date().toISOString()
            }
          }));

          logActivity('pet_interact', 'Cho thú nuôi ăn', 'Pet của con rất vui mừng và đầy năng lượng!');
        },

        spinWheel: () => {
          const state = get();
          // Simulating lucky rewards
          const rewardsOptions = [
            { type: 'coins', amount: 50, message: 'Nhận thêm +50 NP!' },
            { type: 'coins', amount: 100, message: 'Nhận thêm +100 NP!' },
            { type: 'energy', amount: 30, message: 'Hồi phục +30 Năng lượng!' },
            { type: 'wallet', amount: 5000, message: 'May mắn nhận 5.000đ từ Ví thưởng!' },
            { type: 'wallet', amount: 10000, message: 'Siêu cấp may mắn nhận 10.000đ từ Ví thưởng!' },
            { type: 'nothing', amount: 0, message: 'Gặp may mắn lần sau nhé con!' }
          ];

          const resultIndex = Math.floor(Math.random() * rewardsOptions.length);
          const spin = rewardsOptions[resultIndex];

          if (spin.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + spin.amount } });
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, spin.amount, 0);
          } else if (spin.type === 'energy') {
            get().addEnergy(spin.amount);
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, 0, 0);
          } else if (spin.type === 'wallet') {
            set({ player: { ...state.player, walletVND: state.player.walletVND + spin.amount } });
            logActivity('box_open', 'Vòng Quay May Mắn', spin.message, 0, 0, spin.amount);
          }

          return { rewardType: spin.type, amount: spin.amount, message: spin.message };
        },

        openMysteryBox: () => {
          const state = get();
          const boxRewards = [
            { type: 'wallet', amount: 5000, message: 'Nhận ngay 5.000đ vào Ví thưởng!' },
            { type: 'wallet', amount: 10000, message: 'Nhận ngay 10.000đ vào Ví thưởng!' },
            { type: 'coins', amount: 150, message: 'Nhận gói +150 NP!' },
            { type: 'shield', amount: 1, message: 'Nhận được 1 Khiên bảo vệ Streak!' },
            { type: 'empty', amount: 0, message: 'Rương trống rỗng, chúc con may mắn lần sau!' }
          ];

          const index = Math.floor(Math.random() * boxRewards.length);
          const reward = boxRewards[index];

          if (reward.type === 'wallet') {
            set({ player: { ...state.player, walletVND: state.player.walletVND + reward.amount } });
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, 0, 0, reward.amount);
          } else if (reward.type === 'coins') {
            set({ player: { ...state.player, coins: state.player.coins + reward.amount } });
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, reward.amount, 0);
          } else if (reward.type === 'shield') {
            const hasShield = state.player.badges.includes('Streak Shield');
            if (!hasShield) {
              set({ player: { ...state.player, badges: [...state.player.badges, 'Streak Shield'] } });
            }
            logActivity('box_open', 'Mở Hòm Bí Mật', reward.message, 0, 0);
          }

          return { rewardType: reward.type, amount: reward.amount, message: reward.message };
        },

        // Parent Actions
        verifyPIN: (pin) => {
          return get().parentPIN === pin;
        },

        changePIN: (newPIN) => {
          set({ parentPIN: newPIN });
        },

        approveReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward) return;

          set(prev => ({
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'claimed' } : r)
          }));

          logActivity('parent_approve', 'Ba duyệt Phần thưởng', `Đã duyệt hoàn thành quà tặng: "${reward.title}"`, 0, 0, -reward.cashValueVND);
        },

        rejectReward: (rewardId) => {
          const state = get();
          const reward = state.rewards.find(r => r.id === rewardId);
          if (!reward) return;

          set(prev => ({
            player: {
              ...prev.player,
              coins: prev.player.coins + reward.costCoins
            },
            rewards: prev.rewards.map(r => r.id === rewardId ? { ...r, status: 'pending' } : r) // Revert status
          }));

          logActivity('parent_approve', 'Ba hoàn trả Coins', `Từ chối quà tặng: "${reward.title}". Đã hoàn lại ${reward.costCoins} NP cho con`, reward.costCoins, 0);
        },

        addParentReward: (title, costCoins, cashValueVND) => {
          const newReward: ParentReward = {
            id: `r-${Date.now()}`,
            title,
            costCoins,
            cashValueVND,
            status: 'pending',
            timestamp: Date.now()
          };
          set(state => ({
            rewards: [...state.rewards, newReward]
          }));
          logActivity('parent_approve', 'Ba thêm Quà mới', `Quà mới: "${title}" trị giá ${costCoins} NP`, 0, 0);
        },

        importQuestions: (importedQuestions) => {
          set(state => {
            // Filter duplicates by checking prompts/ids
            const filteredNew = importedQuestions.filter(newQ => 
              !state.questions.some(existingQ => existingQ.prompt === newQ.prompt)
            );
            return {
              questions: [...state.questions, ...filteredNew]
            };
          });
          logActivity('parent_approve', 'Ba nhập Đề thi mới', `Thêm thành công ${importedQuestions.length} câu hỏi vào Kho đề.`, 0, 0);
        },

        deleteQuestion: async (questionId) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return false;

          const isCustomQuestion = question.source?.startsWith('AI Ingested') || question.isConfused;
          if (isCustomQuestion && !questionId.startsWith('ai-')) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              const token = session?.access_token;
              if (!token) return false;

              const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
              const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if (!res.ok) {
                const errData = await res.json();
                toast.error(errData.error || 'Không thể xóa câu hỏi.');
                return false;
              }
            } catch (error) {
              console.error('Error deleting question:', error);
              toast.error('Lỗi kết nối khi xóa câu hỏi.');
              return false;
            }
          }

          set(state => ({
            questions: state.questions.filter(q => q.id !== questionId)
          }));
          logActivity('parent_approve', 'Xóa câu hỏi', `Ba đã xóa câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

        updateQuestion: async (questionId, updatedQuestion) => {
          const state = get();
          const question = state.questions.find(q => q.id === questionId);
          if (!question) return false;

          const isCustomQuestion = question.source?.startsWith('AI Ingested') || question.isConfused;
          const nextQuestion = { ...question, ...updatedQuestion } as Question;

          if (isCustomQuestion) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              const token = session?.access_token;
              if (!token) return false;

              const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
              const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nextQuestion)
              });
              if (!res.ok) {
                const errData = await res.json();
                toast.error(errData.error || 'Không thể cập nhật câu hỏi.');
                return false;
              }
            } catch (error) {
              console.error('Error updating question:', error);
              toast.error('Lỗi kết nối khi cập nhật câu hỏi.');
              return false;
            }
          }

          set(state => ({
            questions: state.questions.map(q => q.id === questionId ? nextQuestion : q)
          }));
          logActivity('parent_approve', 'Cập nhật câu hỏi', `Ba đã cập nhật câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

        flagQuestionConfused: async (question) => {
          const nextQuestion = { ...question, isConfused: true } as Question;

          try {
            const session = (await supabase.auth.getSession()).data.session;
            const token = session?.access_token;
            if (!token) return false;

            const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
            const res = await fetch(`${backendUrl}/api/questions/confused`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(question)
            });
            if (!res.ok) {
              const errData = await res.json();
              toast.error(errData.error || 'Không thể đánh dấu câu hỏi.');
              return false;
            }
          } catch (error) {
            console.error('Error flagging question:', error);
            toast.error('Lỗi kết nối khi đánh dấu câu hỏi.');
            return false;
          }

          set(state => ({
            questions: state.questions.map(q => q.id === question.id ? nextQuestion : q)
          }));
          logActivity('exercise', 'Hổng hiểu - Lướt', `Đã bỏ qua câu hỏi mã số ${question.id} và đánh dấu cần hỗ trợ.`, 0, 0);
          return true;
        },

        resetProgress: () => {
          set({
            player: INITIAL_PLAYER,
            pet: INITIAL_PET,
            categoryStats: {},
            activeCombo: 0,
            maxCombo: 0,
            challenges: INITIAL_CHALLENGES.map(ch => ({ ...ch, currentCount: 0, completed: false })),
            dailyMission: null,
            logs: []
          });
          logActivity('parent_approve', 'Khởi tạo lại tiến độ', 'Ba đã reset toàn bộ tiến độ của con học sinh.', 0, 0);
        },

        // System Resets
        checkDailyReset: () => {
          const state = get();
          const todayStr = new Date().toISOString().split('T')[0];
          const lastActiveStr = state.player.lastActive.split('T')[0];

          if (todayStr === lastActiveStr) return; // Already updated today

          // Calculate dates difference
          const lastActiveDate = new Date(lastActiveStr);
          const todayDate = new Date(todayStr);
          const diffTime = Math.abs(todayDate.getTime() - lastActiveDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let newStreak = state.player.streak;
          let streakBroken = false;
          let penaltyApplied = false;

          if (diffDays === 1) {
            // Streak continued!
            newStreak += 1;
            logActivity('exercise', 'Duy trì Streak học tập!', `Chuỗi học liên tục tăng lên ${newStreak} ngày!`, 0, 0);
          } else if (diffDays > 1) {
            // Streak broken! Check for shield
            const hasShield = state.player.badges.includes('Streak Shield');
            if (hasShield) {
              set({
                player: {
                  ...state.player,
                  badges: state.player.badges.filter(b => b !== 'Streak Shield')
                }
              });
              logActivity('shop', 'Kích hoạt Khiên bảo vệ', 'Khiên chắn tự động nổ tung để bảo vệ chuỗi Streak học của con!', 0, 0);
            } else {
              streakBroken = true;
              newStreak = 0;
              if (diffDays >= 3) {
                penaltyApplied = true;
              }
              eventBus.publish('STREAK_RESET', { brokenDays: diffDays });
            }
          }

          // Generate New Daily Mission
          const customMission: DailyMission = {
            id: `m-${todayStr}`,
            date: todayStr,
            title: 'Nhiệm Vụ Chiến Binh Ngày Mới',
            requirements: [
              { description: 'Hoàn thành làm 20 câu hỏi luyện tập', type: 'count', target: 20, current: 0, completed: false },
              { description: 'Đạt đúng trên 10 câu Grammar Cave', type: 'category', target: 10, current: 0, completed: false },
              { description: 'Đạt đúng trên 10 câu Vocabulary Castle', type: 'category', target: 10, current: 0, completed: false }
            ],
            rewardVND: 20000,
            rewardXP: 250,
            completed: false
          };

          set({
            dailyMission: customMission,
            activeCombo: 0,
            player: {
              ...state.player,
              streak: newStreak,
              energy: state.gameSettings.maxEnergy ?? 1000, // Refill energy daily
              hearts: 3, // Refill hearts daily
              lastActive: new Date().toISOString()
            },
            challenges: state.challenges.map(ch => 
              ch.type === 'daily' ? { ...ch, currentCount: 0, completed: false } : ch
            )
          });

          eventBus.publish('DAILY_CHECK_IN', { streakBroken, penaltyApplied });
        },

        // Adaptive Selection Logic
        getAdaptiveQuestion: (category) => {
          const state = get();
          const list = state.questions.filter(q => {
            const qSubject = (q as any).subject || 'english';
            return q.category === category && qSubject === state.currentSubject;
          });
          if (list.length === 0) return null;

          // Find historical rolling accuracy for this category
          const stat = state.categoryStats[category];
          const accuracy = stat ? stat.rollingAccuracy : 0.5; // default to medium

          // Dynamic difficulty selector:
          // Low accuracy (e.g. 30%) -> pick easier questions (difficulty 1 - 4) to boost confidence & review basics
          // High accuracy (e.g. 85%) -> pick harder questions (difficulty 6 - 10) to challenge
          let minDiff = 1;
          let maxDiff = 10;

          if (accuracy < 0.4) {
            maxDiff = 4;
          } else if (accuracy < 0.75) {
            minDiff = 3;
            maxDiff = 7;
          } else {
            minDiff = 6;
          }

          const matchedDiffList = list.filter(q => q.difficulty >= minDiff && q.difficulty <= maxDiff);
          const finalPool = matchedDiffList.length > 0 ? matchedDiffList : list;

          // Aggressive randomization: filter out recently played questions to avoid repetition
          const recentlyPlayed = state.recentlyPlayedQuestionIds || [];
          let filteredPool = finalPool.filter(q => !recentlyPlayed.includes(q.id));

          // If filtering leaves the pool empty or too small (e.g. less than 2 questions), fall back to original pool
          if (filteredPool.length === 0) {
            filteredPool = finalPool;
          }

          // Random pick from final/filtered pool
          return filteredPool[Math.floor(Math.random() * filteredPool.length)];
        },

        getQuestionByWeight: (mode) => {
          const state = get();
          const categoriesPool: string[] = [];

          if (state.currentSubject === 'math') {
            if (mode === 'grammar') {
              categoriesPool.push('parabol-line', 'viet-relation', 'linear-function');
            } else if (mode === 'reading') {
              categoriesPool.push('real-geometry', 'plane-geometry', 'volume-displacement', 'tangent-geometry');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('real-equations', 'real-finance', 'growth-modeling', 'percentage-discount', 'shopping-discount');
            } else {
              categoriesPool.push('parabol-line', 'viet-relation', 'linear-function', 'growth-modeling', 'percentage-discount', 'volume-displacement', 'shopping-discount', 'real-equations', 'real-geometry', 'real-finance', 'plane-geometry', 'tangent-geometry');
            }
          } else if (state.currentSubject === 'literature') {
            if (mode === 'grammar') {
              categoriesPool.push('literature-vietnamese');
            } else if (mode === 'reading') {
              categoriesPool.push('literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('literature-writing');
            } else {
              categoriesPool.push('literature-vietnamese', 'literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument', 'literature-writing');
            }
          } else {
            if (mode === 'grammar') {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite');
            } else if (mode === 'reading') {
              categoriesPool.push('reading', 'cloze');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('vocabulary', 'wordform');
            } else {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress');
            }
          }

          // Calculate weights: W_c = (1.0 - Accuracy) + 0.1
          const weightedCategories = categoriesPool.map(cat => {
            const stat = state.categoryStats[cat];
            const accuracy = stat ? stat.rollingAccuracy : 0.5; // Default to 50%
            const weight = (1.0 - accuracy) + 0.1; // epsilon = 0.1
            return { cat, weight };
          });

          // Spin weighted roulette
          const totalWeight = weightedCategories.reduce((acc, current) => acc + current.weight, 0);
          let randomWeight = Math.random() * totalWeight;
          let selectedCategory = categoriesPool[0];

          for (const item of weightedCategories) {
            randomWeight -= item.weight;
            if (randomWeight <= 0) {
              selectedCategory = item.cat;
              break;
            }
          }

          // Fetch adaptive question from the selected category
          return get().getAdaptiveQuestion(selectedCategory);
        }
      };
    },
    {
      name: 'cyber-english-state', // LocalStorage Key
      partialize: (state) => ({
        currentUser: state.currentUser,
        player: state.player,
        questions: state.questions,
        currentSubject: state.currentSubject,
        categoryStats: state.categoryStats,
        pet: state.pet,
        rewards: state.rewards,
        challenges: state.challenges,
        dailyMission: state.dailyMission,
        logs: state.logs,
        parentPIN: state.parentPIN,
        maxCombo: state.maxCombo,
        profiles: state.profiles,
        petStates: state.petStates,
        categoryStatsAll: state.categoryStatsAll,
        uiTheme: state.uiTheme,
        uiThemesByUser: state.uiThemesByUser,
        failedQuestionIds: state.failedQuestionIds,
        recentlyPlayedQuestionIds: state.recentlyPlayedQuestionIds
      })
    }
  )
);






