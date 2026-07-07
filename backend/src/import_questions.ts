import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

interface DBQuestion {
  id: string;
  type: string;
  category: string;
  prompt: string;
  options?: string[] | null;
  correct_answer: string[];
  explanation: string;
  difficulty: number;
  source: string;
  subject: 'english' | 'math' | 'literature';
  metadata?: any;
}

const questionsToImport: DBQuestion[] = [
  // ==================== ENGLISH ====================
  {
    id: 'hcmc-eng-2024-q1',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others:\n\nlabel, campus, nation, parade (the underlined part is the first "a" in each word)',
    options: ['label', 'campus', 'nation', 'parade'],
    correct_answer: ['campus'],
    explanation: 'Phần gạch chân "a" trong "campus" được phát âm là /æ/, trong khi ở các từ còn lại phát âm là /eɪ/.',
    difficulty: 4,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'pronunciation', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-eng-2024-q2',
    type: 'mcq',
    category: 'stress',
    prompt: 'Choose the word whose main stress position is placed differently from the others:\n\ndestroy, control, predict, wander',
    options: ['destroy', 'control', 'predict', 'wander'],
    correct_answer: ['wander'],
    explanation: '"wander" nhấn trọng âm ở âm tiết thứ nhất (/ˈwɒn.dər/), các từ còn lại đều nhấn trọng âm ở âm tiết thứ hai.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'pronunciation', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-eng-2024-q3',
    type: 'wordform',
    category: 'wordform',
    prompt: 'She is a very ________ writer who has published ten books. (IMAGINE)',
    options: null,
    correct_answer: ['imaginative'],
    explanation: 'Cần tính từ "imaginative" (giàu trí tưởng tượng) đứng trước danh từ "writer" để bổ nghĩa cho nó.',
    difficulty: 6,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the word class needed.', 'Apply the correct derivation.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-eng-2024-q4',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The noise of the street is extremely ________ for his study. (DISRUPT)',
    options: null,
    correct_answer: ['disruptive'],
    explanation: 'Cấu trúc: tobe + extremely + adjective. Dùng tính từ "disruptive" (gây gián đoạn, cản trở).',
    difficulty: 7,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the word class needed.', 'Apply the correct derivation.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-eng-2024-q5',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Parents should encourage their children to act ________. (DEPEND)',
    options: null,
    correct_answer: ['independently'],
    explanation: 'Dùng trạng từ "independently" (một cách độc lập) để bổ nghĩa cho động từ "act".',
    difficulty: 6,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the word class needed.', 'Apply the correct derivation.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-eng-2024-q6',
    type: 'rewrite',
    category: 'tenses',
    prompt: 'The last time she visited her hometown was three years ago. (Rewrite starting with: "She has...")',
    options: null,
    correct_answer: [
      'She has not visited her hometown for three years.',
      'She hasn\'t visited her hometown for three years.',
      'She has not visited her hometown since three years ago.'
    ],
    explanation: 'Chuyển đổi từ câu quá khứ đơn khẳng định chỉ thời điểm cuối cùng sang câu hiện tại hoàn thành phủ định chỉ một khoảng thời gian: "S + has not + V3 + for/since".',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'english',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'pronunciation', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  },
    {
    id: 'hcmc-eng-2025-q1',
    type: 'mcq',
    category: 'relative-clauses',
    prompt: 'The laboratory in ________ we conducted our chemistry experiments has been renovated.',
    options: ['which', 'where', 'whom', 'that'],
    correct_answer: ['which'],
    explanation: 'Sau giới từ "in" dùng đại từ quan hệ "which" làm bổ ngữ chỉ nơi chốn cho "laboratory". Lưu ý không dùng "where" hay "that" ngay sau giới từ.',
    difficulty: 6,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'english',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  },
    {
    id: 'hcmc-eng-2025-q2',
    type: 'rewrite',
    category: 'passive-voice',
    prompt: 'They believe that the storm caused severe damage to the coastal area. (Rewrite starting with: "The storm...")',
    options: null,
    correct_answer: [
      'The storm is believed to have caused severe damage to the coastal area.'
    ],
    explanation: 'Cấu trúc bị động khách quan nâng cao: S2 + is/are + V3_1 (believed) + to have + V3_2 (caused) vì hành động ở mệnh đề "that" xảy ra trước hành động ở mệnh đề chính.',
    difficulty: 8,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'english',
    metadata: { examPart: 'Part VI', englishPart: 'Part VI', englishTask: 'transformation', englishSkill: 'transformation', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the target structure.', 'Rewrite without changing meaning.'], tags: ['official-exam', 'hcmc-2026'] }
  },
    {
    id: 'hcmc-eng-2026-q1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'If she ________ hard for the entrance exam last month, she would be a high school student now.',
    options: ['had studied', 'studied', 'would study', 'has studied'],
    correct_answer: ['had studied'],
    explanation: 'Câu điều kiện trộn (Mixed Conditional): Giả thiết trái thực tế trong quá khứ ("last month" -> dùng Had + V3), kết quả trái thực tế ở hiện tại ("now" -> would + V_inf).',
    difficulty: 7,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'english',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  },

  // ==================== MATHEMATICS ====================
  {
    id: 'hcmc-math-2024-q1',
    type: 'mcq',
    category: 'parabol-line',
    prompt: 'Cho Parabol (P): y = x^2 và đường thẳng (d): y = 2x + 3. Hãy xác định tọa độ giao điểm của (P) và (d).',
    options: [
      'A. (1; 1) và (-3; 9)',
      'B. (-1; 1) và (3; 9)',
      'C. (1; -1) và (-3; -9)',
      'D. (-1; -1) và (3; -9)'
    ],
    correct_answer: ['B. (-1; 1) và (3; 9)'],
    explanation: 'Phương trình hoành độ giao điểm: x^2 = 2x + 3 <=> x^2 - 2x - 3 = 0. Nghiệm là x = -1 và x = 3. Thay vào hàm số ta được các giao điểm là (-1; 1) và (3; 9).',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'math'
  },
  {
    id: 'hcmc-math-2024-q2',
    type: 'mcq',
    category: 'viet-relation',
    prompt: 'Cho phương trình bậc hai: x^2 - 5x + 3 = 0. Gọi x_1, x_2 là hai nghiệm của phương trình. Tính giá trị của biểu thức A = x_1^2 + x_2^2.',
    options: ['A. 19', 'B. 25', 'C. 22', 'D. 16'],
    correct_answer: ['A. 19'],
    explanation: 'Theo định lý Vi-ét: S = x_1 + x_2 = 5 và P = x_1 * x_2 = 3. Giá trị biểu thức A = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2*x_1*x_2 = S^2 - 2P = 5^2 - 2*3 = 25 - 6 = 19.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'math'
  },
  {
    id: 'hcmc-math-2024-q3',
    type: 'mcq',
    category: 'real-geometry',
    prompt: 'Một vỏ lon sữa hình trụ có bán kính đường tròn đáy là R = 4 cm, chiều cao của vỏ lon là h = 10 cm. Tính thể tích của vỏ lon sữa đó (lấy số pi xấp xỉ 3.14).',
    options: ['A. 502.4 cm^3', 'B. 251.2 cm^3', 'C. 160.0 cm^3', 'D. 125.6 cm^3'],
    correct_answer: ['A. 502.4 cm^3'],
    explanation: 'Thể tích hình trụ được tính theo công thức: V = pi * R^2 * h = 3.14 * (4^2) * 10 = 3.14 * 16 * 10 = 502.4 cm^3.',
    difficulty: 6,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'math'
  },
  {
    id: 'hcmc-math-2025-q1',
    type: 'mcq',
    category: 'real-finance',
    prompt: 'Một cái áo thun có giá niêm yết ban đầu là 300.000 đồng. Nhân dịp khuyến mãi, cửa hàng giảm giá lần một là 10%. Để thúc đẩy bán hàng, cửa hàng tiếp tục giảm tiếp đợt hai thêm 5% trên mức giá đã giảm ở đợt một. Hỏi giá bán thực tế của cái áo sau hai lần giảm là bao nhiêu?',
    options: ['A. 255.000 đồng', 'B. 256.500 đồng', 'C. 260.000 đồng', 'D. 270.000 đồng'],
    correct_answer: ['B. 256.500 đồng'],
    explanation: 'Giá áo sau lần giảm thứ nhất: 300.000 * (1 - 0.10) = 270.000 đồng. Giá áo sau lần giảm thứ hai: 270.000 * (1 - 0.05) = 256.500 đồng.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'math'
  },
  {
    id: 'hcmc-math-2025-q2',
    type: 'mcq',
    category: 'real-equations',
    prompt: 'Nhà bạn Nam có một bể nước hình chữ nhật chứa 2000 lít nước. Mỗi ngày gia đình Nam sử dụng hết 150 lít nước. Gọi y (lít) là lượng nước còn lại trong bể sau x (ngày) sử dụng. Hãy chọn công thức hàm số biểu diễn mối liên hệ giữa y và x.',
    options: [
      'A. y = 2000 - 150x (với 0 <= x <= 13)',
      'B. y = 2000 + 150x',
      'C. y = 2000 - 150x (với x >= 0)',
      'D. y = 150x'
    ],
    correct_answer: ['A. y = 2000 - 150x (với 0 <= x <= 13)'],
    explanation: 'Ban đầu có 2000 lít, mỗi ngày bớt đi 150 lít sau x ngày. Lượng nước còn lại là y = 2000 - 150x. Bể hết nước khi y = 0 <=> 2000 - 150x = 0 => x xấp xỉ 13.3 ngày. Do đó x nguyên chạy từ 0 đến 13 ngày.',
    difficulty: 6,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'math'
  },
  {
    id: 'hcmc-math-2026-q1',
    type: 'mcq',
    category: 'plane-geometry',
    prompt: 'Cho đường tròn (O; R) và điểm A nằm ngoài đường tròn sao cho OA = 2R. Vẽ tiếp tuyến AB với đường tròn (O) (B là tiếp điểm). Tính độ dài đoạn thẳng AB theo bán kính R.',
    options: ['A. R * căn(2)', 'B. R * căn(3)', 'C. R / 2', 'D. 2R'],
    correct_answer: ['B. R * căn(3)'],
    explanation: 'Xét tam giác ABO vuông tại B (do AB là tiếp tuyến). Áp dụng định lý Py-ta-go: AB^2 = OA^2 - OB^2 = (2R)^2 - R^2 = 4R^2 - R^2 = 3R^2. Vậy AB = R * căn(3).',
    difficulty: 6,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'math'
  },

  {
    id: 'hcmc-math-2026-q2',
    type: 'multi-part',
    category: 'quadratic-equation',
    prompt: 'Cho phương trình bậc hai: x^2 - 2mx + m^2 - m + 1 = 0 (x là ẩn số, m là tham số).\na) Tìm điều kiện của m để phương trình có hai nghiệm phân biệt x1, x2.\nb) Tìm m để hai nghiệm x1, x2 thỏa mãn hệ thức x1^2 + x2^2 - x1x2 = 5.',
    options: null,
    correctAnswer: ['m > 1', 'm = (-3 + sqrt(41)) / 2'],
    explanation: 'Ta có Delta phẩy = m - 1 nên điều kiện có hai nghiệm phân biệt là m > 1. Theo Viète, S = 2m và P = m^2 - m + 1. Từ x1^2 + x2^2 - x1x2 = (x1 + x2)^2 - 3x1x2 = 5 suy ra (2m)^2 - 3(m^2 - m + 1) = 5, tức m^2 + 3m - 8 = 0. Lấy nghiệm thỏa m > 1 là m = (-3 + sqrt(41)) / 2.',
    difficulty: 8,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 2', mathTopic: 'quadratic-equation', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Tính Delta phẩy để xét điều kiện có hai nghiệm phân biệt.', 'Viết hệ thức Viète rồi biến đổi biểu thức theo S và P.', 'Giải phương trình theo m và đối chiếu điều kiện.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q3',
    type: 'multi-part',
    category: 'linear-function',
    prompt: 'Một mối liên hệ giữa nhiệt độ F (Fahrenheit) và nhiệt độ C (Celsius) được cho bởi công thức hàm số bậc nhất: F = a.C + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và sôi ở 100°C tương ứng với 212°F.\na) Xác định các hệ số a và b.\nb) Nếu nhiệt độ cơ thể của một người đo được là 37°C thì tương ứng là bao nhiêu độ F?',
    options: null,
    correctAnswer: ['a = 1,8', 'b = 32', 'F = 98,6°F'],
    explanation: 'Thế C = 0 vào công thức suy ra b = 32. Thế C = 100, F = 212 suy ra 212 = 100a + 32, nên a = 1,8. Với C = 37 ta có F = 1,8 × 37 + 32 = 98,6°F.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 3', mathTopic: 'linear-function', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Thế hai cặp dữ kiện để tìm a, b.', 'Tính giá trị F khi C = 37.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q4',
    type: 'multi-part',
    category: 'growth-modeling',
    prompt: 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng 40 km. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm 5% so với tuần ngay trước đó.\na) Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ n (với n là số tuần tập luyện).\nb) Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc 50 km?',
    options: null,
    correctAnswer: ['S_n = 40 × (1,05)^(n-1)', 'n = 6'],
    explanation: 'Đây là cấp số nhân với số hạng đầu 40 và công bội 1,05 nên S_n = 40 × (1,05)^(n-1). Giải bất đẳng thức 40 × (1,05)^(n-1) > 50 cho thấy n = 6 là tuần đầu tiên vượt mốc 50 km.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 4', mathTopic: 'growth-modeling', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Xác định số hạng đầu và công bội.', 'Lập bất đẳng thức vượt mốc 50 km.', 'Thử các giá trị n để tìm tuần đầu tiên thỏa mãn.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q5',
    type: 'short-answer',
    category: 'percentage-discount',
    prompt: 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá 10% so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm 5% nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là 427.500 đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?',
    options: null,
    correctAnswer: ['500.000 đồng'],
    explanation: 'Sau hai lần giảm, giá còn 0,9 × 0,95 = 0,855 lần giá niêm yết. Suy ra 0,855x = 427.500 nên x = 500.000.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 5', mathTopic: 'percentage-discount', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Gọi x là giá niêm yết.', 'Tính giá sau hai lần giảm.', 'Lập phương trình và suy ra giá gốc.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q6',
    type: 'multi-part',
    category: 'volume-displacement',
    prompt: 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là 6 cm, chiều cao mực nước hiện tại là 10 cm. Người ta thả vào ly 4 viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là 12 cm. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy π ≈ 3,14).',
    options: null,
    correctAnswer: ['R ≈ 1,5 cm'],
    explanation: 'Bán kính ly là 3 cm, phần nước dâng thêm là 2 cm nên thể tích nước dâng là 3,14 × 3^2 × 2 = 56,52 cm³. Mỗi viên bi có thể tích 14,13 cm³. Giải (4/3)πR^3 = 14,13 suy ra R ≈ 1,5 cm.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 6', mathTopic: 'volume-displacement', answerMode: 'multi-part', solutionStyle: 'diagram', subparts: ['a', 'b'], solutionSteps: ['Tính thể tích phần nước dâng lên.', 'Chia cho 4 để được thể tích mỗi viên bi.', 'Dùng công thức hình cầu để suy bán kính.'], formulaHints: ['V_trụ = πr²h', 'V_cầu = 4/3 πR³'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q7',
    type: 'short-answer',
    category: 'shopping-discount',
    prompt: 'Bạn An đem theo một số tiền vào siêu thị để mua 10 quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ 6 trở đi sẽ được giảm 20% trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng 11 quyển tập và còn dư lại 4.000 đồng. Tính giá niêm yết của một quyển tập.',
    options: null,
    correctAnswer: ['20.000 đồng'],
    explanation: 'Nếu gọi y là giá niêm yết một quyển tập thì số tiền ban đầu đủ mua 10 quyển là 10y. Thực tế An mua 5 quyển đầu giá y và 6 quyển sau giá 0,8y, tổng là 9,8y. Hiệu 10y - 9,8y = 0,2y bằng 4.000 nên y = 20.000 đồng.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 7', mathTopic: 'shopping-discount', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Gọi y là giá niêm yết một quyển.', 'Tính tổng tiền theo chương trình khuyến mãi.', 'Lập phương trình với số tiền còn dư.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q8',
    type: 'proof',
    category: 'tangent-geometry',
    prompt: 'Cho đường tròn tâm O đường kính AB. Lấy điểm C thuộc đường tròn (O) sao cho AC < BC (C không trùng A). Tiếp tuyến tại A của đường tròn (O) cắt đường thẳng BC tại điểm M.\na) Chứng minh: Tam giác ABC vuông tại C và MA^2 = MB · MC.\nb) Vẽ đường cao CH của tam giác ABC (H thuộc AB). Gọi I là trung điểm của CH. Đường thẳng MI cắt AC tại E và cắt đường tròn (O) tại D (D khác M). Chứng minh tứ giác AHCE nội tiếp.\nc) Chứng minh: MB · MC = MD · MH. Từ đó chứng minh đường thẳng BC là tiếp tuyến của đường tròn ngoại tiếp tam giác ACD.',
    options: null,
    correctAnswer: ['ABC vuông tại C', 'MA^2 = MB · MC', 'AHCE nội tiếp', 'BC là tiếp tuyến của đường tròn ngoại tiếp tam giác ACD'],
    explanation: 'Sử dụng góc nội tiếp chắn nửa đường tròn để có tam giác ABC vuông tại C. Từ hệ thức tiếp tuyến - cát tuyến suy ra MA^2 = MB · MC. Phần b dùng quan hệ vuông góc và trung điểm trên đường cao. Phần c khai thác phương tích và góc tạo bởi tiếp tuyến với dây cung để kết luận BC là tiếp tuyến của (ACD).',
    difficulty: 8,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 8', mathTopic: 'tangent-geometry', answerMode: 'proof', solutionStyle: 'proof-outline', subparts: ['a', 'b', 'c'], solutionSteps: ['Chứng minh tam giác ABC vuông tại C.', 'Dùng hệ thức tiếp tuyến - cát tuyến.', 'Khai thác góc vuông và phương tích để suy ra tứ giác nội tiếp và tiếp tuyến.'], diagramHint: 'Đường tròn đường kính AB, điểm C trên đường tròn, tiếp tuyến tại A cắt BC tại M, đường cao CH và trung điểm I.', tags: ['official-exam', 'hcmc-2026'] }
  } as any,

  // ==================== LITERATURE ====================
  {
    id: 'hcmc-lit-2024-q1',
    type: 'mcq',
    category: 'literature-reading-poetry',
    prompt: '**Đọc đoạn thơ sau và trả lời câu hỏi:**\n"Con ở miền Nam ra thăm lăng Bác\nĐã thấy trong sương hàng tre bát ngát\nÔi! Hàng tre xanh xanh Việt Nam\nBão táp mưa sa, đứng thẳng hàng."\n(Viếng lăng Bác - Viễn Phương)\n\nHình ảnh "hàng tre xanh xanh Việt Nam" ẩn dụ cho điều gì của dân tộc?',
    options: [
      'A. Vẻ đẹp trù phú của thiên nhiên miền Nam đất nước',
      'B. Sức sống bền bỉ, ý chí kiên cường, bất khuất kiêu hãnh của con người Việt Nam',
      'C. Sự giản dị, mộc mạc và gần gũi của Bác Hồ kính yêu',
      'D. Tấm lòng hiếu thảo, tôn kính vô bờ bến của tác giả với Bác Hồ'
    ],
    correct_answer: ['B. Sức sống bền bỉ, ý chí kiên cường, bất khuất kiêu hãnh của con người Việt Nam'],
    explanation: 'Hình ảnh hàng tre trải qua bão táp mưa sa vẫn kiên cường đứng thẳng hàng là biểu tượng ẩn dụ đặc sắc cho tinh thần bất khuất, ý chí đoàn kết bền bỉ của dân tộc Việt Nam.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2024-q2',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Xác định thành phần biệt lập được sử dụng trong dòng thơ sau:\n"Ôi! Hàng tre xanh xanh Việt Nam\nBão táp mưa sa, đứng thẳng hàng."',
    options: [
      'A. Thành phần gọi - đáp',
      'B. Thành phần tình thái',
      'C. Thành phần cảm thán',
      'D. Thành phần phụ chú'
    ],
    correct_answer: ['C. Thành phần cảm thán'],
    explanation: 'Từ "Ôi" là thành phần cảm thán đứng đầu câu để biểu lộ cảm xúc ngỡ ngàng, xúc động nghẹn ngào của nhà thơ.',
    difficulty: 4,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2024-q3',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Nhận diện biện pháp tu từ được sử dụng nổi bật trong hai dòng thơ sau:\n"Ngày ngày mặt trời đi qua trên lăng\nThấy một mặt trời trong lăng rất đỏ."\n(Viếng lăng Bác - Viễn Phương)',
    options: ['A. So sánh', 'B. Ẩn dụ', 'C. Điệp từ', 'D. Hoán dụ'],
    correct_answer: ['B. Ẩn dụ'],
    explanation: 'Hình ảnh "mặt trời trong lăng" là hình ảnh ẩn dụ tuyệt đẹp để ví Bác Hồ như mặt trời, tỏa ánh sáng cách mạng ấm áp dẫn đường cho dân tộc Việt Nam.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2024',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2025-q1',
    type: 'mcq',
    category: 'literature-reading-prose',
    prompt: 'Trong tác phẩm "Chiếc lược ngà" của Nguyễn Quang Sáng, chi tiết nào đánh dấu sự chuyển đổi tâm lý mạnh mẽ của bé Thu, khi em nhận ra và ôm chặt lấy cha mình (ông Sáu)?',
    options: [
      'A. Khi Thu nghe lời giải thích của bà ngoại về vết thẹo trên má ba',
      'B. Khi ông Sáu gắp cho Thu cái trứng cá và bị em hất ra ngoài',
      'C. Khi Thu bất ngờ cất tiếng gọi "Ba!" xé lòng vào buổi sáng ông Sáu lên đường',
      'D. Khi Thu nhận được chiếc lược làm từ ngà voi của ba gửi tặng'
    ],
    correct_answer: ['C. Khi Thu bất ngờ cất tiếng gọi "Ba!" xé lòng vào buổi sáng ông Sáu lên đường'],
    explanation: 'Tiếng gọi "Ba" cất lên xé lòng vào giây phút chia tay, bé Thu ôm chầm lấy ba mình, thể hiện tình cha con thiêng liêng dồn nén bấy lâu nay bùng cháy mãnh liệt.',
    difficulty: 5,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2025-q2',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Xác định thành phần phụ chú trong câu văn sau:\n"Bác tôi - một cựu chiến binh Trường Sơn năm xưa - luôn giữ lối sống giản dị và tác phong nhanh nhẹn của người lính."',
    options: [
      'A. Bác tôi',
      'B. một cựu chiến binh Trường Sơn năm xưa',
      'C. luôn giữ lối sống giản dị và tác phong nhanh nhẹn',
      'D. của người lính'
    ],
    correct_answer: ['B. một cựu chiến binh Trường Sơn năm xưa'],
    explanation: 'Cụm từ nằm giữa hai dấu gạch ngang "một cựu chiến binh Trường Sơn năm xưa" đóng vai trò bổ sung giải thích rõ thân thế của nhân vật "Bác tôi", đây là thành phần phụ chú.',
    difficulty: 4,
    source: 'Đề thi chính thức Tuyển sinh lớp 10 TP.HCM 2025',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2026-q1',
    type: 'mcq',
    category: 'literature-reading-prose',
    prompt: 'Trong tác phẩm "Lặng lẽ Sa Pa" của Nguyễn Thành Long, cuộc gặp gỡ tình cờ giữa anh thanh niên làm khí tượng với ông họa sĩ già và cô kỹ sư trẻ kéo dài trong bao lâu?',
    options: ['A. 30 phút', 'B. 1 tiếng', 'C. 2 tiếng', 'D. Nửa ngày'],
    correct_answer: ['A. 30 phút'],
    explanation: 'Cuộc gặp gỡ vô cùng tình cờ và chớp nhoáng trên đỉnh Yên Sơn chỉ kéo dài vỏn vẹn trong 30 phút nhưng để lại ấn tượng sâu đậm trong lòng ông họa sĩ và cô kỹ sư.',
    difficulty: 5,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'literature'
  },
  {
    id: 'hcmc-lit-2026-q2',
    type: 'short-answer',
    category: 'literature-reading-argument',
    prompt: 'Đọc văn bản về giá trị của sự thấu hiểu và sẻ chia trong kỷ nguyên công nghệ. Theo tác giả, việc lạm dụng công nghệ mà thiếu đi giao tiếp trực tiếp sẽ dẫn đến hậu quả gì?',
    correct_answer: ['xa cách', 'giảm khả năng đồng cảm', 'cô đơn', 'lạc lõng'],
    explanation: 'Câu hỏi hướng tới ý chính: con người dễ xa cách nhau, giảm đồng cảm và rơi vào trạng thái cô đơn, lạc lõng nếu chỉ giao tiếp qua công nghệ.',
    difficulty: 4,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần I', literatureTrack: 'reading', literatureTask: 'main-idea', textGenre: 'argument', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Xác định ý chính của ngữ liệu.', 'Chọn các hậu quả được tác giả nhấn mạnh.', 'Diễn đạt ngắn gọn, đúng trọng tâm.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-lit-2026-q3',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Từ thông điệp của phần Đọc hiểu, hãy viết bài văn nghị luận khoảng 500 chữ bàn về ý nghĩa của sự lắng nghe chân thành trong mối quan hệ giữa con người với con người trong cuộc sống hiện đại ngày nay.',
    correct_answer: ['lắng nghe chân thành', 'thấu hiểu', 'giảm khoảng cách', 'xoa dịu tổn thương', 'mối quan hệ bền vững', 'phê phán thờ ơ', 'bài học hành động'],
    explanation: 'Bài viết cần nêu khái niệm lắng nghe chân thành, phân tích ý nghĩa, đưa dẫn chứng, phản đề và chốt bài học hành động.',
    difficulty: 8,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần III', literatureTrack: 'social-essay', literatureTask: 'social-essay', textGenre: 'argument', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'giải thích', 'phân tích', 'phản đề', 'bài học', 'kết bài'], solutionSteps: ['Xác định vấn đề nghị luận.', 'Giải thích khái niệm và nêu ý nghĩa.', 'Đưa dẫn chứng và phản đề.', 'Rút ra bài học và kết bài.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-lit-2026-q4',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Cảm nhận của em về tình yêu quê hương, đất nước và khát vọng cống hiến được thể hiện qua khổ thơ trong bài thơ Mùa xuân nho nhỏ của Thanh Hải. Từ đó, liên hệ trách nhiệm của thế hệ trẻ ngày nay đối với việc xây dựng và phát triển đất nước.',
    correct_answer: ['ta làm con chim hót', 'một mùa xuân nho nhỏ', 'lặng lẽ dâng cho đời', 'tuổi hai mươi', 'khi tóc bạc', 'cống hiến', 'thế hệ trẻ'],
    explanation: 'Bài viết cần làm rõ ước nguyện hóa thân giản dị, cống hiến lặng lẽ của Thanh Hải và liên hệ trách nhiệm của người trẻ trong học tập, lao động, sáng tạo.',
    difficulty: 8,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần IV', literatureTrack: 'literary-essay', literatureTask: 'poetry-analysis', textGenre: 'poetry', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'khổ 1', 'khổ 2', 'liên hệ', 'kết bài'], solutionSteps: ['Xác định chủ đề và hình tượng thơ.', 'Phân tích các hình ảnh và điệp cấu trúc.', 'Liên hệ trách nhiệm thế hệ trẻ.', 'Kết lại giá trị nội dung và nghệ thuật.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'hcmc-lit-2026-q5',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Trong tác phẩm Chiếc lược ngà của Nguyễn Quang Sáng, hãy phân tích nhân vật anh Sáu, đặc biệt là giai đoạn ở chiến khu khi anh dồn hết tâm trí để làm chiếc lược ngà tặng con. Từ câu chuyện cha con anh Sáu, hãy chia sẻ suy nghĩ của em về giá trị của tình cảm gia đình trong những hoàn cảnh thử thách.',
    correct_answer: ['anh sáu', 'chiếc lược ngà', 'tình phụ tử', 'gia đình', 'thử thách', 'hy sinh'],
    explanation: 'Bài làm cần làm rõ tình yêu con sâu nặng của anh Sáu, quá trình làm lược ngà như dồn nén mọi yêu thương, và rút ra giá trị của tình cảm gia đình khi đối diện thử thách.',
    difficulty: 8,
    source: 'Đề thi minh họa Tuyển sinh lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần IV', literatureTrack: 'literary-essay', literatureTask: 'character-analysis', textGenre: 'prose', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'tình yêu con ở chiến khu', 'nghệ thuật xây dựng nhân vật', 'ý nghĩa gia đình', 'kết bài'], solutionSteps: ['Xác định nhân vật và hoàn cảnh truyện.', 'Phân tích hành động, tâm lí và chi tiết chiếc lược ngà.', 'Khái quát giá trị tình cảm gia đình.', 'Kết luận thông điệp tác phẩm.'], tags: ['official-exam', 'hcmc-2026'] }
  }
];

async function main() {
  console.log('Bắt đầu kết nối cơ sở dữ liệu...');
  try {
    // Check connection first
    const testRes = await pool.query('SELECT NOW()');
    console.log('Kết nối thành công. Thời gian hiện tại trong DB:', testRes.rows[0].now);

    console.log(`Đang nạp ${questionsToImport.length} câu hỏi vào bảng ge10_custom_questions...`);
    
    let successCount = 0;
    for (const q of questionsToImport) {
      await pool.query(
        `INSERT INTO ge10_custom_questions 
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, metadata)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           type = EXCLUDED.type,
           category = EXCLUDED.category,
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           difficulty = EXCLUDED.difficulty,
           source = EXCLUDED.source,
           subject = EXCLUDED.subject,
           metadata = EXCLUDED.metadata`,
        [
          q.id,
          q.type,
          q.category,
          q.prompt,
          q.options || null,
          q.correct_answer,
          q.explanation,
          q.difficulty,
          q.source,
          q.subject,
          q.metadata ? JSON.stringify(q.metadata) : null
        ]
      );
      successCount++;
    }

    console.log(`Hoàn tất nạp câu hỏi thành công! Đã nạp: ${successCount}/${questionsToImport.length} câu hỏi.`);
    
    const countRes = await pool.query('SELECT COUNT(*), subject FROM ge10_custom_questions GROUP BY subject');
    console.log('Thống kê số lượng câu hỏi trong DB hiện tại theo môn học:');
    console.log(countRes.rows);
  } catch (error) {
    console.error('Lỗi khi nạp câu hỏi vào cơ sở dữ liệu:', error);
  } finally {
    await pool.end();
    console.log('Đã đóng kết nối cơ sở dữ liệu.');
  }
}

main();

