import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createFamilySlice } from './slices/createFamilySlice';
import { createUISlice } from './slices/createUISlice';

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
  GameSettings,
  SubjectId,
  HandbookPage,
  PageExplorationState,
  ParentQuest,
  FamilyLink,
  GradeTier
} from '../types/game';
import { getStudentRankForLevel, SUBJECTS_CONFIG, DEFAULT_GRADE_TIER, getGradeTierConfig } from '../types/game';
import { DEFAULT_UI_THEME, UI_THEMES } from '../theme/uiThemes';

export const INITIAL_HANDBOOK_PAGES: HandbookPage[] = [
  {
    id: 'hb-1',
    category: 'Võ Học & Tinh Tấn',
    title: 'Tu Vi & Kinh Nghiệm (XP)',
    content: 'Tu vi (XP) đo lường trình độ võ học của Thiếu hiệp trên giang hồ. Khi làm đúng mỗi câu hỏi thường ở Hang Luyện Công, con sẽ tích lũy được +15 XP.'
  },
  {
    id: 'hb-2',
    category: 'Võ Học & Tinh Tấn',
    title: 'Vượt Ải & Diệt Boss',
    content: 'Lĩnh ngộ thành công mỗi chuyên đề võ học sẽ giúp con nhận thêm +50 XP. Quyết đấu thắng Boss nhận +150 XP và được nhân đôi điểm XP câu đúng trong trận.'
  },
  {
    id: 'hb-3',
    category: 'Võ Học & Tinh Tấn',
    title: 'Luật Lực Bất Tòng Tâm',
    content: 'Cho Heo Maikawaii ăn tăng cấp sẽ tiêu tốn 30 XP và 50 Ngân Lượng của con. Điều này có thể khiến con bị tụt cấp độ tạm thời để tập trung nuôi dưỡng pet.'
  },
  {
    id: 'hb-4',
    category: 'Võ Học & Tinh Tấn',
    title: 'Quy Tắc Thưởng Ngân Lượng',
    content: 'Ngân Lượng (NP) là tiền tệ để con mua sắm chân khí đan, mạng hồi phục, khiên bảo vệ trong shop. Làm đúng câu hỏi Đấu trường sẽ thưởng cho con +5 NP.'
  },
  {
    id: 'hb-5',
    category: 'Võ Học & Tinh Tấn',
    title: 'Luật Liên Hoàn Kích (Combo)',
    content: 'Làm đúng liên tiếp từ 3 câu trở lên sẽ nhận hệ số nhân Ngân Lượng cực lớn x1.2, x1.5, x2.0. Chỉ cần làm sai một câu, chuỗi liên hoàn kích sẽ bị reset.'
  },
  {
    id: 'hb-6',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Chân Khí Học Tập',
    content: 'Chân khí (Energy) là năng lượng cần thiết để xuất chiêu làm bài tập ở Đấu trường. Mỗi lượt luyện tập thường tiêu hao 30 Chân khí của thiếu hiệp.'
  },
  {
    id: 'hb-7',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Luật Chân Khí Tán Thất',
    content: 'Mỗi trận quyết đấu Boss tiêu hao 100 Chân khí và được trừ ngay khi vào trận. Nếu con bỏ cuộc giữa chừng, lượng chân khí này sẽ tiêu tán hoàn toàn.'
  },
  {
    id: 'hb-8',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Sinh Mệnh & Tim Đấu Trường',
    content: 'Thiếu hiệp có tối đa 3 Tim sinh mệnh trong mỗi lượt đấu sinh tử ở Đấu trường. Mỗi câu làm sai sẽ bị phạt khấu trừ 1 Tim sinh mệnh của con.'
  },
  {
    id: 'hb-9',
    category: 'Đấu Trường Kỳ Ngộ',
    title: 'Luật Tẩu Hỏa Nhập Ma',
    content: 'Hết Tim giữa trận đấu sẽ thất bại và bị khấu hao 50% số Ngân Lượng và XP kiếm được. Đồng thời Heo Maikawaii sẽ buồn bã giảm 5 điểm vui vẻ.'
  },
  {
    id: 'hb-10',
    category: 'Giang Hồ Quy Tắc',
    title: 'Duy Trì Chuỗi Luyện Công',
    content: 'Con cần chăm chỉ học tập mỗi ngày để duy trì Chuỗi học tập (Streak) của bản thân. Chuỗi học tập tăng giúp rèn luyện thói quen và nhận thưởng lớn.'
  },
  {
    id: 'hb-11',
    category: 'Giang Hồ Quy Tắc',
    title: 'Luật Chuỗi Tinh Tấn',
    content: 'Giữ chuỗi càng lâu thưởng càng lớn: ngày 2 được +10 NP, ngày 3 +20 NP, từ ngày 4 mỗi ngày +30 NP. Bỏ quá 24 giờ không học thì chuỗi reset về 0 (không bị trừ điểm) và phải leo lại từ đầu.'
  },
  {
    id: 'hb-12',
    category: 'Giang Hồ Quy Tắc',
    title: 'Kỳ Ngộ Giang Hồ',
    content: 'Khi luyện công hoặc đăng nhập, con có 5% cơ hội gặp Kỳ Ngộ nhận miễn phí +100 Chân khí, hoặc gặp Khảo Hạch bất ngờ từ Linh Sư.'
  }
];

// Cốt lõi Cẩm Nang Bí Lục là help/guide — mọi điểm chạm "?" trong app đều mở thẳng 1 trang ở đây
// (thay vì một modal help riêng biệt), mỗi trang có id `help-<topic>` khớp với tham số truyền vào showHelp(topic).
const HELP_HANDBOOK_PAGES: HandbookPage[] = [
  {
    id: 'help-xp', category: 'Trợ Giúp Nhanh', title: 'Cấp độ và XP', content: '', audience: 'student',
    bullets: [
      '• Làm đúng câu hỏi là có XP. Câu càng khó, XP càng nặng tay.',
      '• Đủ XP thì lên cấp, mở thêm giới hạn và tiến hóa thú cưng.',
      '• Boss và nhiệm vụ ngày là hai mỏ thưởng lớn nhất.'
    ]
  },
  {
    id: 'help-energy', category: 'Trợ Giúp Nhanh', title: 'Chân Khí (Energy)', content: '', audience: 'student',
    bullets: [
      '• Chân Khí hồi đầy mỗi ngày lúc 0h.',
      '• Mỗi lượt luyện thường tốn 30 Chân Khí.',
      '• Quyết đấu Boss tốn 100 Chân Khí, trừ ngay khi vào trận.',
      '• Cạn Chân Khí thì nghỉ nhịp, đừng cố kéo liều.'
    ]
  },
  {
    id: 'help-hearts', category: 'Trợ Giúp Nhanh', title: 'Tim sinh mệnh', content: '', audience: 'student',
    bullets: [
      '• Boss và Sinh Tồn cho tối đa 3 tim.',
      '• Sai câu là mất tim, nên đừng ham lao bừa.',
      '• Hết tim thì thua trận, chỉ giữ được 50% chiến lợi phẩm.',
      '• Tim không trừ vì sai thường, chỉ trừ trong chế độ sinh tử.'
    ]
  },
  {
    id: 'help-nanite', category: 'Trợ Giúp Nhanh', title: 'Ngân Lượng (NP)', content: '', audience: 'student',
    bullets: [
      '• NP là tiền tệ trong game, trả công cho câu đúng.',
      '• NP dùng để mua Khai Ngộ Quyển, Hộ Tâm Phù, Hồi Nguyên Đan, Phong Vị và đổi quà.',
      '• Kiếm NP đều tay thì chơi mượt hơn nhiều.'
    ]
  },
  {
    id: 'help-wallet', category: 'Trợ Giúp Nhanh', title: 'Phúc Lợi Gia Môn', content: '', audience: 'student',
    bullets: [
      '• Đây là phần thưởng thật bằng tiền mặt từ Viện Chủ.',
      '• Đổi Phúc Lợi xong thì yêu cầu sẽ chờ Viện Chủ phê duyệt.',
      '• Viện Chủ phê duyệt xong, tiền vào ví và con có thể chi tiêu.'
    ]
  },
  {
    id: 'help-adult', category: 'Trợ Giúp Nhanh', title: 'Heo Maikawaii', content: '', audience: 'student',
    bullets: [
      '• Heo Maikawaii lớn lên theo tiến trình tu luyện của con.',
      '• Cho Heo Maikawaii ăn chỉ tốn 10 NP và 5 XP mỗi lần — cho ăn thoải mái nhé!',
      '• Hết NP thì Heo tự về chuồng ngủ, cày thêm NP ở Hang Luyện Công rồi cho ăn tiếp.',
      '• Muốn Heo Maikawaii khôn lớn, con phải học đều chứ không được bỏ ải.'
    ]
  },
  {
    id: 'help-prediction', category: 'Trợ Giúp Nhanh', title: 'Dự đoán điểm thi', content: '', audience: 'student',
    bullets: [
      '• Hệ thống nhìn vào kết quả làm bài để ước tính điểm thi.',
      '• Càng làm nhiều câu thì ước lượng càng chắc.',
      '• Con nên lấy đó làm mốc luyện chứ đừng xem như phán quyết cuối.'
    ]
  },
  {
    id: 'help-streak', category: 'Trợ Giúp Nhanh', title: 'Chuỗi học tập', content: '', audience: 'student',
    bullets: [
      '• Học đều thì chuỗi tăng — ngày 2 thưởng +10 NP, ngày 3 +20 NP, ngày 4 trở đi +30 NP/ngày.',
      '• Bỏ quá 24h không học là chuỗi gãy, quay về 0 (không bị trừ điểm).',
      '• Có Hộ Tâm Phù thì còn cứu được, nhưng đừng ỷ lại.'
    ]
  },
  {
    id: 'help-ai-ingest', category: 'Trợ Giúp Quản Trị', title: 'Nhập đề bằng AI', content: '', audience: 'admin',
    bullets: [
      '• Dán đề thô hoặc file câu hỏi vào khung nhập.',
      '• AI sẽ tách câu, lựa chọn đáp án và gợi ý lời giải.',
      '• Xác nhận xong là câu hỏi vào kho đề ngay.'
    ]
  },
  {
    id: 'help-parent-console', category: 'Trợ Giúp Quản Trị', title: 'Bảng quản trị', content: '', audience: 'admin',
    bullets: [
      '• Chính Điện: quản lý tài khoản thiếu hiệp và cấp quyền toàn viện.',
      '• Vạn Quyển Các: lọc ngân hàng câu hỏi theo môn, dạng và thang chấm.',
      '• Ngân Các: duyệt đổi quà, cấu hình chân khí và định mức NP/XP.',
      '• Thân Phận: xem hồ sơ chi tiết từng thiếu hiệp.'
    ]
  },
  {
    id: 'help-bank-structure', category: 'Trợ Giúp Quản Trị', title: 'Cấu trúc ngân hàng', content: '', audience: 'admin',
    bullets: [
      '• Mỗi câu nên có subject, category và metadata rõ ràng.',
      '• examPart giúp chia đề, answerMode quyết định cách chấm.',
      '• solutionSteps dùng để chấm rubric và giải thích.'
    ]
  },
  {
    id: 'help-math-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Toán', content: '', audience: 'admin',
    bullets: [
      '• Giữ đủ các mảng: đại số, đồ thị, hình học, thực tế.',
      '• Bài nhiều ý nên tách a/b/c và solutionSteps theo từng ý.',
      '• proof hoặc diagram phải có bước trung gian rõ ràng.'
    ]
  },
  {
    id: 'help-english-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Tiếng Anh', content: '', audience: 'admin',
    bullets: [
      '• MCQ tách riêng grammar, vocabulary, pronunciation, stress, reading.',
      '• Tự luận nên lưu đáp án chấp nhận được và biến thể.',
      '• Chấm theo dạng bài, không chấm cảm tính.'
    ]
  },
  {
    id: 'help-literature-bank', category: 'Trợ Giúp Quản Trị', title: 'Dạng Ngữ văn', content: '', audience: 'admin',
    bullets: [
      '• Tách đọc hiểu, tiếng Việt, nghị luận xã hội và nghị luận văn học.',
      '• Bài văn nên có rubric, câu mấu chốt và ý cần đạt.',
      '• Chấm theo bố cục, lập luận, dẫn chứng và diễn đạt.'
    ]
  },
  {
    id: 'help-rubric', category: 'Trợ Giúp Quản Trị', title: 'Cách chấm', content: '', audience: 'admin',
    bullets: [
      '• Bố cục phải rõ, ý phải mạch, không viết kiểu phóng tay.',
      '• Dẫn chứng và bước giải phải đủ để AI không phải đoán.',
      '• Chấm theo rubric, không chấm theo cảm giác.'
    ]
  },
  {
    id: 'help-question-type-mcq', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Trắc nghiệm', content: '', audience: 'admin',
    bullets: [
      '• Chỉ lưu một đáp án đúng.',
      '• Bốn lựa chọn phải cùng kiểu, cùng độ dài tương đối.',
      '• Giải thích ngắn, gọn, đủ để thấy vì sao đúng và sai.'
    ]
  },
  {
    id: 'help-question-type-short-answer', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Tự luận ngắn', content: '', audience: 'admin',
    bullets: [
      '• Đáp số phải rõ ràng, có đơn vị nếu cần.',
      '• Bước làm chỉ cần vừa đủ, không lan man.',
      '• Chấm cả kết quả lẫn cách đi tới kết quả.'
    ]
  },
  {
    id: 'help-question-type-proof', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Chứng minh', content: '', audience: 'admin',
    bullets: [
      '• Đi từ giả thiết sang suy luận rồi chốt kết luận.',
      '• Mỗi ý nên có một mốc chấm riêng.',
      '• Hình học thì ghi rõ góc, tam giác, hệ thức hoặc đồng dạng.'
    ]
  },
  {
    id: 'help-question-type-multi-part', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Nhiều ý', content: '', audience: 'admin',
    bullets: [
      '• Tách rõ a/b/c ngay từ đầu.',
      '• Ý nào ra kết quả riêng thì chấm riêng.',
      '• Đừng để một ý sai kéo sập cả bài nếu các ý khác vẫn ổn.'
    ]
  },
  {
    id: 'help-question-type-wordform', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Word form', content: '', audience: 'admin',
    bullets: [
      '• Lưu từ gốc và các đáp án chấp nhận được.',
      '• Chấm đúng loại từ, đúng ngữ cảnh, đúng chính tả.',
      '• Nếu có biến thể hợp lệ thì phải ghi vào.'
    ]
  },
  {
    id: 'help-question-type-rewrite', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Viết lại câu', content: '', audience: 'admin',
    bullets: [
      '• Giữ nghĩa, đổi đúng cấu trúc đề yêu cầu.',
      '• Có nhiều đáp án đúng thì lưu hết.',
      '• Chấm theo mục tiêu chuyển đổi, không soi từng chữ vụn.'
    ]
  },
  {
    id: 'help-question-type-cloze', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Điền khuyết', content: '', audience: 'admin',
    bullets: [
      '• Nhìn trước và sau chỗ trống.',
      '• Ưu tiên collocation, từ loại và ngữ cảnh.',
      '• Nếu đề có gợi ý thì dùng gợi ý để khóa đáp án.'
    ]
  },
  {
    id: 'help-question-type-reading', category: 'Trợ Giúp Dạng Câu Hỏi', title: 'Đọc hiểu', content: '', audience: 'admin',
    bullets: [
      '• Luôn gắn ngữ liệu gốc ở đầu câu.',
      '• Câu hỏi phải nói rõ cần ý chính, chi tiết hay suy luận.',
      '• Chấm theo nội dung đúng, không chỉ theo từ khóa lẻ.'
    ]
  }
];

// Toàn bộ trang Cẩm Nang mặc định: lore gốc + mọi trang trợ giúp quy đổi từ hệ thống help cũ.
export const ALL_HANDBOOK_PAGES: HandbookPage[] = [...INITIAL_HANDBOOK_PAGES, ...HELP_HANDBOOK_PAGES];

import { StoreState } from './types';
const DEFAULT_PIN = '1234';
const PLAYER_ENERGY_MAX = 1000;
const DEFAULT_GAME_SETTINGS: GameSettings = {
  bossBountiesVnd: [10000, 15000, 20000],
  // Hao tổn Chân khí (CORE_SPECS §3.A): ải thường tiêu 30 Chân khí mỗi lượt.
  challengeEnergyCosts: [30, 30, 30, 30],
  maxEnergy: 1000,
  baseXP: 15,
  baseCoins: 5,
  updatedAt: Date.now()
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
  badges: [],
  unlockedThemes: ['current']
};

// 🎭 Phong Vị (CORE_SPECS §2.4): 'current' (Nguyệt Dạ) luôn miễn phí mặc định, các Phong Vị còn lại tốn NP để mở khóa tại Bách Hóa Phường.
export const THEME_UNLOCK_COST = 200;
const FREE_UI_THEME: UiThemeId = 'current';

const INITIAL_PET: PetState = {
  name: 'Heo Maikawaii',
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

export const useGameState = create<StoreState>()(
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
          walletChanged: wallet,
          // Cô lập nhật ký theo môn phái đang hoạt động (CORE_SPECS §1.3 Sect Isolation)
          subject: get().currentSubject
        };
        set(state => ({
          logs: [newLog, ...state.logs].slice(0, 200) // Keep last 200 logs
        }));
      };

      // Helper to process level up
      const checkLevelUp = (currentXp: number, currentLevel: number) => {
        let level = currentLevel;
        let xp = currentXp;
        const badges = [...(get().player.badges || [])];
        let badgesChanged = false;

        const oldRank = getStudentRankForLevel(currentLevel);

        // Define simple linear-exponential progression: next level costs Level * 200 XP
        const applyLevelUps = () => {
          while (xp >= level * 200) {
            xp -= level * 200;
            level += 1;
            logActivity('exercise', 'Thăng cấp!', `Bạn vừa chạm Level ${level}.`, 50, 0, 0);
            eventBus.publish('PET_GROWTH', { levelUp: true });
          }
        };
        applyLevelUps();

        const newRank = getStudentRankForLevel(level);
        if (newRank.id !== oldRank.id) {
          const badgeName = `Danh hiệu: ${newRank.name}`;
          if (!badges.includes(badgeName)) {
            badges.push(badgeName);
            badgesChanged = true;
            // Cơ chế Thăng hạng (CORE_SPECS §7.3): thưởng đột biến Coin/XP khi chạm cột mốc cấp bậc.
            const rankUpBonusXp = 100;
            xp += rankUpBonusXp;
            applyLevelUps(); // XP thưởng có thể đẩy tiếp lên level mới
            logActivity(
              'challenge',
              'Thăng cấp danh hiệu!',
              `Chúc mừng Thiếu hiệp đã thăng cấp danh hiệu lên ${newRank.icon} ${newRank.name}! Nhận thêm +100 Coin và +${rankUpBonusXp} XP.`,
              100, // Extra coin reward for thăng hạng
              rankUpBonusXp,
              0
            );
          }
        }

        return { level, xp, badges, badgesChanged };
      };

      return {
        // Multi-Profile Auth State
        sessionAccountId: null,
        availableProfiles: [],
        // Family System
        familyLinks: [],

        // Initial States
        currentUser: null,
        player: INITIAL_PLAYER,
        questions: INITIAL_QUESTIONS,
        lessons: INITIAL_LESSONS,
        lessonsProgress: {},
        explorationProgress: {},
        pageExplorationStates: {},
        currentSubject: 'english',
        activeGradeTier: DEFAULT_GRADE_TIER,
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
        handbookPages: ALL_HANDBOOK_PAGES,
        activeCombo: 0,
        adminStudents: [],
        selectedStudentProfile: null,
        helpPageId: null,
        maxCombo: 0,
        lastSyncTime: null,

        // Parent Quests
        parentQuests: [],

        // Profiles cache for multi-player
        profiles: {},
        petStates: {},
        categoryStatsAll: {},
        uiTheme: DEFAULT_UI_THEME,
        uiThemesByUser: {},
        isSectModalOpen: false,

        addHandbookPage: (page) => {
          set(state => {
            const newPage: HandbookPage = {
              ...page,
              id: `hb-${Date.now()}`
            };
            return {
              handbookPages: [...state.handbookPages, newPage]
            };
          });
        },

        setSubject: (subject) => {
          set({ currentSubject: subject });
          const subjectName = SUBJECTS_CONFIG[subject]?.name || subject;
          logActivity('exercise', 'Chuyển môn phái', `Bạn đã chuyển sang môn phái ${subjectName}.`, 0, 0, 0);
        },

        setGradeTier: (tier) => {
          const config = getGradeTierConfig(tier);
          if (config.status !== 'active') {
            toast.error(`${config.name} chưa khai mở!`);
            return;
          }
          if (get().activeGradeTier === tier) return;
          set({ activeGradeTier: tier });
          logActivity('exercise', 'Chuyển Tầng Thế Giới', `Bạn đã bước vào ${config.name}.`, 0, 0, 0);
        },

        setSectModalOpen: (open: boolean) => {
          set({ isSectModalOpen: open });
        },

        addParentQuest: (title, description, rewardNP, rewardVND) => {
          set(state => ({
            parentQuests: [
              ...state.parentQuests,
              {
                id: `pq-${Date.now()}`,
                title,
                description,
                rewardNP,
                rewardVND,
                status: 'pending',
                timestamp: Date.now()
              }
            ]
          }));
        },

        completeParentQuest: (questId) => {
          set(state => ({
            parentQuests: state.parentQuests.map(q => 
              q.id === questId ? { ...q, status: 'completed' } : q
            )
          }));
        },

        deleteParentQuest: (questId) => {
          set(state => ({
            parentQuests: state.parentQuests.filter(q => q.id !== questId)
          }));
        },

        claimParentQuest: (questId) => {
          let np = 0;
          let vnd = 0;
          let qTitle = '';
          set(state => {
            const quest = state.parentQuests.find(q => q.id === questId);
            if (!quest || quest.status !== 'completed') return {};
            np = quest.rewardNP;
            vnd = quest.rewardVND;
            qTitle = quest.title;
            return {
              parentQuests: state.parentQuests.map(q => 
                q.id === questId ? { ...q, status: 'claimed' } : q
              ),
              player: {
                ...state.player,
                coins: state.player.coins + np,
                walletVND: state.player.walletVND + vnd
              }
            };
          });
          if (np > 0 || vnd > 0) {
            logActivity('reward_claimed', 'Nhận thưởng nhiệm vụ', `Đã nhận thưởng: ${qTitle}`, np, 0, vnd);
          }
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
              else if (newPetLevel >= 8) newPetStage = 'adult';
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

          const unsubCheckIn = eventBus.subscribe('DAILY_CHECK_IN', (data: { streakBroken: boolean }) => {
            if (data.streakBroken) {
              // Luật Chuỗi Tinh Tấn (CORE_SPECS §3.1): mất chuỗi CHỈ reset về 0, KHÔNG trừ NP.
              set(state => ({
                player: {
                  ...state.player,
                  streak: 0
                },
                pet: {
                  ...state.pet,
                  mood: 'sad',
                  energy: Math.max(10, state.pet.energy - 30)
                }
              }));
              logActivity('streak_penalty', 'Đứt chuỗi Streak', 'Chuỗi Streak học đã quay lại số 0! Giữ chuỗi từ ngày thứ 2 để nhận thưởng leo thang.', 0, 0, 0);
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
                name: 'Heo Maikawaii',
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
            logActivity('energy_refill', 'Đã vào sân', `Chào mừng ${user.name}. Sân học đã mở.`);
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
                    name: 'Heo Maikawaii',
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
                  lessonsProgress: data.lessonsProgress || {},
                  explorationProgress: data.explorationProgress || {}
                };
              });
              logActivity('energy_refill', 'Đồng bộ Đám mây', `Dữ liệu học tập đã được kéo về cho ${user.name}!`);
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
            sessionAccountId: null,
            availableProfiles: [],
            familyLinks: [],
            player: INITIAL_PLAYER,
            pet: INITIAL_PET,
            categoryStats: {},
            gameSettings: DEFAULT_GAME_SETTINGS,
            activeCombo: 0,
            adminStudents: [],
            selectedStudentProfile: null,
            helpPageId: null,
            uiTheme: DEFAULT_UI_THEME
          });
        },

        // ==================== MULTI-PROFILE METHODS ====================

        setSessionAccountId: (accountId: string) => {
          set({ sessionAccountId: accountId });
        },

        fetchProfiles: async () => {
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/profiles`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              set({ availableProfiles: data.profiles || [] });
            }
          } catch (e) {
            console.error('fetchProfiles error', e);
          }
        },

        selectProfile: async (profileId: string) => {
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/profile/${profileId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              const resolvedTheme = (get().uiThemesByUser[profileId]?.[0] || DEFAULT_UI_THEME) as UiThemeId;
              const mergedQuestions = [...INITIAL_QUESTIONS];
              (data.customQuestions || []).forEach((q: any) => {
                const idx = mergedQuestions.findIndex(eq => eq.id === q.id);
                if (idx !== -1) mergedQuestions[idx] = q;
                else if (!mergedQuestions.some(eq => eq.prompt === q.prompt)) mergedQuestions.push(q);
              });
              set({
                currentUser: data.currentUser,
                player: data.player || INITIAL_PLAYER,
                pet: data.pet || INITIAL_PET,
                categoryStats: data.categoryStats || {},
                rewards: data.rewards || DEFAULT_REWARDS,
                challenges: data.challenges || INITIAL_CHALLENGES,
                dailyMission: data.dailyMission || null,
                lessonsProgress: data.lessonsProgress || {},
                explorationProgress: data.explorationProgress || {},
                questions: mergedQuestions,
                gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
                uiTheme: resolvedTheme,
                lastSyncTime: new Date().toISOString(),
              });
              // Fetch family data after profile is selected
              const state = get();
              await state.fetchFamily();
            }
          } catch (e) {
            console.error('selectProfile error', e);
          }
        },

        createProfile: async (role: 'student' | 'parent', name: string) => {
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token || !session?.user) return;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/profiles`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                name,
                email: session.user.email,
                avatar_url: session.user.user_metadata?.avatar_url,
                role
              })
            });
            if (res.ok) {
              await get().fetchProfiles();
            }
          } catch (e) {
            console.error('createProfile error', e);
          }
        },

        // ==================== FAMILY SYSTEM METHODS ====================

        fetchFamily: async () => {
          const state = get();
          const pId = state.currentUser?.id;
          if (!pId || pId.startsWith('mock-')) return;
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/family/${pId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              set({ familyLinks: data.links || [] });
            }
          } catch (e) {
            console.error('ời lấy dữ liệu gia đình', e);
          }
        },

        sendInvite: async (targetId: string) => {
          const state = get();
          const pId = state.currentUser?.id;
          if (!pId) return false;
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return false;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/family/invite`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ senderProfileId: pId, targetId })
            });
            if (res.ok) { await state.fetchFamily(); return true; }
            const err = await res.json();
            alert(err.error || 'Có lỗi xảy ra');
            return false;
          } catch (e) { return false; }
        },

        respondInvite: async (linkId: string, accept: boolean) => {
          const state = get();
          const pId = state.currentUser?.id;
          if (!pId) return false;
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return false;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/family/respond`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ profileId: pId, linkId, accept })
            });
            if (res.ok) { await state.fetchFamily(); return true; }
            return false;
          } catch (e) { return false; }
        },

        leaveFamily: async (linkId: string) => {
          const state = get();
          const pId = state.currentUser?.id;
          if (!pId) return false;
          const session = (await supabase.auth.getSession()).data.session;
          const token = session?.access_token;
          if (!token) return false;
          const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
          try {
            const res = await fetch(`${backendUrl}/api/family/leave`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ profileId: pId, linkId })
            });
            if (res.ok) { await state.fetchFamily(); return true; }
            return false;
          } catch (e) { return false; }
        },

        setUiTheme: (themeId) => {
          const state = get();
          const unlocked = state.player.unlockedThemes || [FREE_UI_THEME];
          // Chỉ cho phép chọn Phong Vị đã mở khóa (mặc định 'current' luôn miễn phí) — CORE_SPECS §2.4.
          if (themeId !== FREE_UI_THEME && !unlocked.includes(themeId)) return;

          const userId = state.currentUser?.id;
          set(prev => ({
            uiTheme: themeId,
            uiThemesByUser: userId
              ? { ...prev.uiThemesByUser, [userId]: themeId }
              : prev.uiThemesByUser
          }));
        },

        showHelp: (topic) => {
          // "?" ở bất kỳ đâu trong app đều mở thẳng trang tương ứng trong Cẩm Nang Bí Lục.
          set({ helpPageId: `help-${topic}` });
        },

        closeHelp: () => {
          set({ helpPageId: null });
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
            toast.success('Cấu hình đã được cập nhật.');
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
          const category = question.topicId || question.category;
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
            
            // Hệ số Combo (CORE_SPECS §3.A): đúng liên tiếp 3 câu là mốc đầu tiên, tăng dần theo bội số của 3.
            if (newCombo >= 9) comboMultiplier = 2.0;
            else if (newCombo >= 6) comboMultiplier = 1.5;
            else if (newCombo >= 3) comboMultiplier = 1.2;

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
            } else if (gameMode === 'boss') {
              // Quyết đấu Boss (CORE_SPECS §3.A): nhân đôi XP cho mọi câu trả lời đúng trong trận.
              expGained = Math.round(expGained * 2);
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
              coins: state.player.coins + coinsGained + (levelCheck.badgesChanged ? 100 : 0),
              badges: levelCheck.badges,
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

          logActivity('shop', 'Lĩnh Hộ Tâm Phù', 'Đã nhận 1 Hộ Tâm Phù bảo vệ Chuỗi Tu Luyện', -cost, 0);
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

          logActivity('shop', 'Nhận Hồi Nguyên Đan', 'Đã hồi phục 1 Tim sinh lực', -cost, 0);
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

          logActivity('shop', 'Khai Ngộ Quyển', 'Dùng 50 NP lĩnh Khai Ngộ Quyển hỗ trợ trong bài làm.', -cost, 0);
          return true;
        },

        // 🎭 Phong Vị (CORE_SPECS §2.4): mở khóa phong cách giao diện cá tính bằng NP tại Bách Hóa Phường.
        buyTheme: (themeId) => {
          const state = get();
          const unlocked = state.player.unlockedThemes || [FREE_UI_THEME];
          if (themeId === FREE_UI_THEME || unlocked.includes(themeId)) return false;
          if (state.player.coins < THEME_UNLOCK_COST) return false;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - THEME_UNLOCK_COST,
              unlockedThemes: [...unlocked, themeId]
            }
          });

          const themeConfig = UI_THEMES.find(t => t.id === themeId);
          logActivity('shop', 'Mở khóa Phong Vị', `Đã lĩnh ngộ Phong Vị "${themeConfig?.name || themeId}" mới.`, -THEME_UNLOCK_COST, 0);
          return true;
        },

        masterLesson: async (lessonId, accuracyRatio) => {
          const state = get();
          const lesson = state.lessons.find(l => l.id === lessonId) || INITIAL_LESSONS.find(l => l.id === lessonId);
          if (!lesson) return;

          // Tránh cộng trùng thưởng nếu bài học đã được hoàn thành trước đó
          if (state.lessonsProgress[lessonId]) {
            // Still mark it as completed for Fog of War to increment completion count
            get().completeLevel3Page(lessonId);
            return;
          }

          get().completeLevel3Page(lessonId);

          const expGained = 50;
          // Rương Báu Ải (CORE_SPECS §3.A): đạt độ chính xác từ 90% trở lên khi hoàn thành ải mới nhận thêm +20 NP.
          const hitTreasureChest = (accuracyRatio ?? 0) >= 0.9;
          const coinsGained = hitTreasureChest ? 20 : 0;

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
              coins: state.player.coins + coinsGained + (levelCheck.badgesChanged ? 100 : 0),
              badges: levelCheck.badges
            }
          });

          logActivity(
            'exercise',
            hitTreasureChest ? 'Lĩnh ngộ bài học! Mở Rương Báu Ải 🎁' : 'Lĩnh ngộ bài học!',
            hitTreasureChest
              ? `Đã qua ải chuyên đề: ${lesson.title}. Độ chính xác ≥90% mở thêm Rương Báu Ải!`
              : `Đã qua ải chuyên đề: ${lesson.title}.`,
            coinsGained,
            expGained,
            0
          );
        },

        // Luật "Tẩu Hỏa Nhập Ma" (CORE_SPECS §3.A): hết Tim trước khi hoàn thành ải Sinh Tồn/Boss
        // chỉ giữ được 50% XP/NP đã thu trong trận (thu hồi lại phần vừa cấp) và Pet giảm 5 điểm vui vẻ.
        applyDefeatPenalty: (coinsEarnedInRun, xpEarnedInRun) => {
          const state = get();
          const coinsClawback = Math.floor(Math.max(0, coinsEarnedInRun) / 2);
          const xpClawback = Math.floor(Math.max(0, xpEarnedInRun) / 2);

          set({
            player: {
              ...state.player,
              coins: Math.max(0, state.player.coins - coinsClawback),
              xp: Math.max(0, state.player.xp - xpClawback)
            },
            pet: {
              ...state.pet,
              energy: Math.max(0, state.pet.energy - 5),
              mood: 'sad'
            }
          });

          if (coinsClawback > 0 || xpClawback > 0) {
            logActivity(
              'exercise',
              'Tẩu Hỏa Nhập Ma!',
              'Hết Tim giữa trận, chỉ giữ được 50% chiến lợi phẩm thu được. Pet buồn thiu vì thấy con thất bại.',
              -coinsClawback,
              -xpClawback,
              0
            );
          }
        },

        // Quyết đấu Boss thắng trận (CORE_SPECS §3.A + §3.1): +150 XP và thưởng tiền mặt trực tiếp vào Ví Thưởng (10.000đ-20.000đ).
        completeBossVictory: () => {
          const state = get();
          const bonusXP = 150;
          const vndBonusOptions = [10000, 15000, 20000];
          const vndBonus = vndBonusOptions[Math.floor(Math.random() * vndBonusOptions.length)];

          const updatedXP = state.player.xp + bonusXP;
          const levelCheck = checkLevelUp(updatedXP, state.player.level);

          set({
            player: {
              ...state.player,
              xp: levelCheck.xp,
              level: levelCheck.level,
              badges: levelCheck.badges,
              coins: state.player.coins + (levelCheck.badgesChanged ? 100 : 0),
              walletVND: state.player.walletVND + vndBonus
            }
          });
          logActivity(
            'boss',
            'Hạ Gục Boss! 🔥',
            `Đánh bại Boss xuất sắc! Nhận thêm +${bonusXP} XP và ${vndBonus.toLocaleString()}đ thưởng nóng vào Ví Thưởng.`,
            0,
            bonusXP,
            vndBonus
          );
        },

        completeLevel3Page: (pageId) => {
          const state = get();
          const studentId = state.currentUser?.id || state.player.id;
          const currentExploration = state.pageExplorationStates[pageId] || {
            studentId,
            pageId,
            lastExploredAt: new Date().toISOString(),
            lastCompletedAt: null,
            explorationCount: 0,
            pendingKeyQuestionId: null
          };

          const updatedExploration = {
            ...currentExploration,
            lastCompletedAt: new Date().toISOString(),
            explorationCount: currentExploration.explorationCount + 1,
            pendingKeyQuestionId: null // Clear any pending question upon success
          };

          set({
            pageExplorationStates: {
              ...state.pageExplorationStates,
              [pageId]: updatedExploration
            }
          });
          
          // Also call the new DB-backed exploration clear logic
          get().clearExploration(pageId);
        },

        updatePendingKeyQuestion: (pageId, questionId) => {
          const state = get();
          const studentId = state.currentUser?.id || state.player.id;
          const currentExploration = state.pageExplorationStates[pageId] || {
            studentId,
            pageId,
            lastExploredAt: new Date().toISOString(),
            lastCompletedAt: null,
            explorationCount: 0,
            pendingKeyQuestionId: null
          };

          const updatedExploration = {
            ...currentExploration,
            pendingKeyQuestionId: questionId
          };

          set({
            pageExplorationStates: {
              ...state.pageExplorationStates,
              [pageId]: updatedExploration
            }
          });
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

          logActivity('shop', 'Yêu cầu Phúc Lợi Gia Môn', `Đã quy đổi "${reward.title}" gửi Viện Chủ phê duyệt`, -reward.costCoins, 0);
          return true;
        },

        feedPet: () => {
          const state = get();
          if (state.pet.mood === 'happy' && state.pet.energy >= 100) return false;

          // Luật "Lực Bất Tòng Tâm" (CORE_SPECS §3.B): cho Pet ăn tốn 10 NP và 5 XP của Thiếu Hiệp.
          const coinsCost = 10;
          const xpCost = 5;
          if (state.player.coins < coinsCost) return false;

          // Vì tiêu hao trực tiếp XP, Thiếu hiệp chấp nhận tụt Level tạm thời nếu dồn quá nhiều tài nguyên chăm Pet.
          let newLevel = state.player.level;
          let newXp = state.player.xp - xpCost;
          while (newXp < 0 && newLevel > 1) {
            newLevel -= 1;
            newXp += newLevel * 200;
          }
          newXp = Math.max(0, newXp);
          const didDeLevel = newLevel < state.player.level;

          set({
            player: {
              ...state.player,
              coins: state.player.coins - coinsCost,
              xp: newXp,
              level: newLevel
            },
            pet: {
              ...state.pet,
              energy: Math.min(100, state.pet.energy + 20),
              mood: 'happy',
              lastFed: new Date().toISOString()
            }
          });

          logActivity(
            'pet_interact',
            didDeLevel ? 'Cho thú nuôi ăn (tụt cấp tạm thời)' : 'Cho thú nuôi ăn',
            didDeLevel
              ? `Pet của con rất vui mừng, nhưng dồn quá nhiều tài nguyên khiến con tạm tụt xuống Level ${newLevel}. Quay lại Hang Luyện Công cày XP để lên cấp lại nhé!`
              : 'Pet của con rất vui mừng và đầy năng lượng!',
            -coinsCost,
            -xpCost
          );
          return true;
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
            { type: 'nothing', amount: 0, message: 'Trượt tay lần này, gỡ ở lần sau.' }
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

          logActivity('parent_approve', 'Viện Chủ duyệt Phúc Lợi', `Đã phê duyệt hoàn thành Phúc Lợi Gia Môn: "${reward.title}"`, 0, 0, -reward.cashValueVND);
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

          logActivity('parent_approve', 'Viện Chủ hoàn trả Ngân Lượng', `Từ chối Phúc Lợi: "${reward.title}". Đã hoàn lại ${reward.costCoins} NP`, reward.costCoins, 0);
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
          logActivity('parent_approve', 'Viện Chủ thêm Phúc Lợi mới', `Phúc Lợi mới: "${title}" trị giá ${costCoins} NP`, 0, 0);
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
          logActivity('parent_approve', 'Nhập Đề thi mới', `Đã nạp ${importedQuestions.length} câu hỏi vào kho đề.`, 0, 0);
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
          logActivity('parent_approve', 'Xóa câu hỏi', `Viện Chủ đã xóa câu hỏi mã số ${questionId}`, 0, 0);
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
          logActivity('parent_approve', 'Cập nhật câu hỏi', `Viện Chủ đã cập nhật câu hỏi mã số ${questionId}`, 0, 0);
          return true;
        },

        flagQuestionConfused: async (question, reason?: 'quá khó' | 'quá dài' | 'quá khùng', severity?: number) => {
          const nextQuestion = { ...question, isConfused: true, skipReason: reason, skipSeverity: severity } as Question;

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

          set(state => {
            const todayStr = new Date().toISOString().split('T')[0];
            let newSkips = state.player.dailySkips || { date: todayStr, count: 0 };
            if (newSkips.date !== todayStr) {
              newSkips = { date: todayStr, count: 1 };
            } else {
              newSkips = { date: todayStr, count: newSkips.count + 1 };
            }

            return {
              questions: state.questions.map(q => q.id === question.id ? nextQuestion : q),
              player: {
                ...state.player,
                dailySkips: newSkips,
                // Môn Chủ Hỏi Tội (CORE_SPECS §3.1): skip không giới hạn nhưng trừ 10 NP.
                // Khoản trừ BẮT BUỘC của hệ thống — được phép đẩy NP xuống ÂM (không kẹp Math.max 0).
                coins: state.player.coins - 10
              }
            };
          });
          logActivity('exercise', 'Bỏ qua câu này', `Đã gác lại câu hỏi mã số ${question.id} (Lý do: ${reason || 'Không rõ'}). Môn Chủ trừ 10 NP.`, -10, 0);
          return true;
        },

        awardCoinsAndXp: async (coins, xp, activityTitle, activityDetails) => {
          const state = get();
          
          // Local optimistic update
          set({
            player: {
              ...state.player,
              coins: Math.max(0, state.player.coins + coins),
              xp: state.player.xp + xp
            }
          });
          
          // Send transaction to Ledger backend if coins != 0
          if (coins !== 0 && state.currentUser?.id) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              if (session?.access_token) {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
                const res = await fetch(`${backendUrl}/api/economy/transaction`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                  body: JSON.stringify({
                    profileId: state.currentUser.id,
                    amount: coins,
                    reason: activityTitle,
                    details: activityDetails
                  })
                });
                if (res.ok) {
                  const data = await res.json();
                  // Sync exact coins from DB back
                  set((s) => ({ player: { ...s.player, coins: data.coins } }));
                }
              }
            } catch (e) {
              console.error('Failed to write to Ledger NP:', e);
            }
          }

          logActivity('box_open', activityTitle, activityDetails, coins, xp);
        },

        clearExploration: async (pageId: string) => {
          const state = get();
          
          // Optimistic local state update
          const currentProgress = state.explorationProgress[pageId] || { clearCount: 0, lastClearedAt: new Date().toISOString() };
          const newCount = currentProgress.clearCount + 1;
          
          set({
            explorationProgress: {
              ...state.explorationProgress,
              [pageId]: { clearCount: newCount, lastClearedAt: new Date().toISOString() }
            }
          });

          if (state.currentUser?.id) {
            try {
              const session = (await supabase.auth.getSession()).data.session;
              if (session?.access_token) {
                const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
                const res = await fetch(`${backendUrl}/api/exploration/clear`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                  body: JSON.stringify({
                    profileId: state.currentUser.id,
                    pageId
                  })
                });
                if (res.ok) {
                  const data = await res.json();
                  // Sync exact count from server
                  set(s => ({
                    explorationProgress: {
                      ...s.explorationProgress,
                      [pageId]: data.progress
                    }
                  }));
                }
              }
            } catch (e) {
              console.error('Failed to sync exploration progress:', e);
            }
          }
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
          logActivity('parent_approve', 'Khởi tạo lại tiến độ', 'Đã reset toàn bộ tiến độ.', 0, 0);
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
          // Luật Chuỗi Tinh Tấn (CORE_SPECS §3.1 + SUB_SPEC_XP_NP §2.1): thưởng leo thang theo ngày giữ chuỗi.
          let streakBonus = 0;

          if (diffDays === 1) {
            // Streak continued!
            newStreak += 1;
            streakBonus = newStreak >= 4 ? 30 : newStreak === 3 ? 20 : newStreak === 2 ? 10 : 0;
            logActivity(
              'exercise',
              'Duy trì Streak học tập!',
              `Chuỗi học tăng lên ${newStreak} ngày!${streakBonus > 0 ? ` Thưởng chuỗi +${streakBonus} NP.` : ''}`,
              streakBonus,
              0
            );
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
              logActivity('shop', 'Kích hoạt Khiên', 'Khiên đã nổ để giữ chuỗi.', 0, 0);
            } else {
              streakBroken = true;
              newStreak = 0;
              // Mất chuỗi CHỈ reset về 0 — KHÔNG trừ NP (bãi bỏ phạt -50 NP cũ).
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
              coins: state.player.coins + streakBonus,
              energy: state.gameSettings.maxEnergy ?? 1000, // Refill energy daily
              hearts: 3, // Refill hearts daily
              lastActive: new Date().toISOString(),
              dailySkips: { date: todayStr, count: 0 }
            },
            challenges: state.challenges.map(ch => 
              ch.type === 'daily' ? { ...ch, currentCount: 0, completed: false } : ch
            )
          });

          eventBus.publish('DAILY_CHECK_IN', { streakBroken });
        },

        // Adaptive Selection Logic
        getAdaptiveQuestion: (category) => {
          const state = get();
          const list = state.questions.filter(q => {
            const qSubject = (q as any).subject || 'english';
            // Cô lập Tầng → Môn Phái (CORE_SPECS §1.4): nội dung không gắn tầng mặc định thuộc Tầng 9.
            const qTier = q.gradeTier ?? DEFAULT_GRADE_TIER;
            return q.category === category && qSubject === state.currentSubject && qTier === state.activeGradeTier;
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
          } else if (state.currentSubject === 'english') {
            if (mode === 'grammar') {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite');
            } else if (mode === 'reading') {
              categoriesPool.push('reading', 'cloze');
            } else if (mode === 'vocabulary') {
              categoriesPool.push('vocabulary', 'wordform');
            } else if (mode === 'pronunciation') {
              categoriesPool.push('pronunciation', 'stress');
            } else {
              categoriesPool.push('grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress');
            }
          } else {
            // Generic fallback for basic subjects: gather categories dynamically from questions of that subject
            const uniqCategories = Array.from(new Set(
              state.questions
                .filter(q => q.subject === state.currentSubject && (q.gradeTier ?? DEFAULT_GRADE_TIER) === state.activeGradeTier)
                .map(q => q.category)
            )).filter(Boolean);
            
            if (uniqCategories.length > 0) {
              categoriesPool.push(...uniqCategories);
            } else {
              categoriesPool.push('basic-general');
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
      ,
        ...createAuthSlice(set, get, store),
        ...createFamilySlice(set, get, store),
        ...createUISlice(set, get, store)
      };
    },
    {
      name: 'cyber-english-state', // LocalStorage Key
      partialize: (state) => ({
        currentUser: state.currentUser,
        player: state.player,
        questions: state.questions,
        currentSubject: state.currentSubject,
        activeGradeTier: state.activeGradeTier,
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
        pageExplorationStates: state.pageExplorationStates,
        categoryStatsAll: state.categoryStatsAll,
        uiTheme: state.uiTheme,
        uiThemesByUser: state.uiThemesByUser,
        failedQuestionIds: state.failedQuestionIds,
        recentlyPlayedQuestionIds: state.recentlyPlayedQuestionIds,
        handbookPages: state.handbookPages
      }),
      // Người dùng đã có dữ liệu cũ trong localStorage sẽ không tự có các trang Cẩm Nang mặc định mới
      // (vd các trang help vừa hợp nhất) vì persist ghi đè nguyên mảng. Bù lại các trang mặc định bị thiếu
      // theo id, đồng thời giữ nguyên mọi trang Viện Chủ tự thêm.
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as object) } as GameState;
        const persistedPages = merged.handbookPages || [];
        const existingIds = new Set(persistedPages.map(p => p.id));
        const missingDefaults = ALL_HANDBOOK_PAGES.filter(p => !existingIds.has(p.id));
        merged.handbookPages = [...persistedPages, ...missingDefaults];
        return merged;
      }
    }
  )
);






