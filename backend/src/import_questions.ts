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
  options: string[] | null;
  correct_answer: string[];
  explanation: string;
  difficulty: number;
  source: string;
  subject: 'english' | 'math' | 'literature';
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
    subject: 'english'
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
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           type = EXCLUDED.type,
           category = EXCLUDED.category,
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           difficulty = EXCLUDED.difficulty,
           source = EXCLUDED.source,
           subject = EXCLUDED.subject`,
        [
          q.id,
          q.type,
          q.category,
          q.prompt,
          q.options,
          q.correct_answer,
          q.explanation,
          q.difficulty,
          q.source,
          q.subject
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
