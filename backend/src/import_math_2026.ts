import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const sourceText = 'KỲ THI TUYỂN SINH LỚP 10 THPT NĂM HỌC 2026-2027 MÔN TOÁN';

const questions = [
  {
    id: 'hcmc-math-2026-q1b',
    type: 'wordform',
    category: 'parabol-line',
    prompt: 'Cho hàm số y = 1/4 * x^2 có đồ thị (P). Tìm tọa độ điểm M thuộc (P) có hoành độ bằng 6.\n\n(Nhập đáp án dưới dạng tọa độ, ví dụ: (6;9))',
    options: null,
    correct_answer: ['(6;9)', '(6; 9)', 'M(6;9)', 'M(6; 9)'],
    explanation: 'Thay hoành độ x = 6 vào phương trình hàm số y = 1/4 * x^2 ta được y = 1/4 * 6^2 = 9. Vậy tọa độ điểm M là (6; 9).',
    difficulty: 5
  },
  {
    id: 'hcmc-math-2026-q2b',
    type: 'wordform',
    category: 'viet-theorem',
    prompt: 'Cho phương trình 2x^2 - 3x - 4 = 0 có hai nghiệm phân biệt x1, x2. Không giải phương trình, hãy tính giá trị của biểu thức A = x1^2 + x2^2 + 1/2*x1 + 1/2*x2.',
    options: null,
    correct_answer: ['7', 'A = 7', 'A=7'],
    explanation: 'Theo định lý Vi-ét ta có:\n- x1 + x2 = 3/2\n- x1 * x2 = -2\n\nBiến đổi biểu thức A:\nA = (x1 + x2)^2 - 2*x1*x2 + 1/2*(x1 + x2)\n= (3/2)^2 - 2*(-2) + 1/2*(3/2)\n= 9/4 + 4 + 3/4 = 7.',
    difficulty: 6
  },
  {
    id: 'hcmc-math-2026-q3a',
    type: 'wordform',
    category: 'probability-statistics',
    prompt: 'Kết quả khảo sát đối với một số bạn học sinh khối 9 về số giờ sử dụng điện thoại trong một ngày được thống kê như sau:\n- 1 giờ: 12 học sinh\n- 2 giờ: 28 học sinh\n- 3 giờ: 30 học sinh\n- 4 giờ: 20 học sinh\n- 5 giờ: 10 học sinh\n\nTính số học sinh đã tham gia cuộc khảo sát.',
    options: null,
    correct_answer: ['100', '100 học sinh', '100 hoc sinh'],
    explanation: 'Tổng số học sinh tham gia cuộc khảo sát được tính bằng cách cộng tất cả học sinh ở các nhóm:\n12 + 28 + 30 + 20 + 10 = 100 (học sinh).',
    difficulty: 4
  },
  {
    id: 'hcmc-math-2026-q3b',
    type: 'wordform',
    category: 'probability-statistics',
    prompt: 'Kết quả khảo sát số giờ sử dụng điện thoại của 100 học sinh khối 9 (1 giờ: 12 học sinh, 2 giờ: 28 học sinh, 3 giờ: 30 học sinh, 4 giờ: 20 học sinh, 5 giờ: 10 học sinh). Chọn ngẫu nhiên một học sinh trong nhóm học sinh được khảo sát. Tính xác suất của biến cố A: "Học sinh được chọn có thời gian sử dụng điện thoại 3 giờ một ngày".\n\n(Nhập đáp án dưới dạng số thập phân, ví dụ: 0.3)',
    options: null,
    correct_answer: ['0.3', '3/10', '30%'],
    explanation: 'Số học sinh sử dụng điện thoại đúng 3 giờ/ngày là 30 em.\nTổng số học sinh tham gia khảo sát là 100 em.\nXác suất của biến cố A là: P(A) = 30 / 100 = 0.3.',
    difficulty: 5
  },
  {
    id: 'hcmc-math-2026-q3c',
    type: 'wordform',
    category: 'probability-statistics',
    prompt: 'Kết quả khảo sát số giờ sử dụng điện thoại của 100 học sinh khối 9 (1 giờ: 12 học sinh, 2 giờ: 28 học sinh, 3 giờ: 30 học sinh, 4 giờ: 20 học sinh, 5 giờ: 10 học sinh). Nhà trường khuyến cáo học sinh không nên sử dụng điện thoại nhiều hơn 3 giờ một ngày. Chọn ngẫu nhiên một học sinh. Tính xác suất của biến cố B: "Học sinh được chọn đã thực hiện đúng khuyến cáo của nhà trường".\n\n(Nhập đáp án dưới dạng số thập phân, ví dụ: 0.7)',
    options: null,
    correct_answer: ['0.7', '7/10', '70%'],
    explanation: 'Học sinh thực hiện đúng khuyến cáo (không dùng quá 3 giờ/ngày) gồm những học sinh sử dụng điện thoại 1 giờ, 2 giờ hoặc 3 giờ.\nSố lượng học sinh thỏa mãn: 12 + 28 + 30 = 70 (học sinh).\nXác suất của biến cố B là: P(B) = 70 / 100 = 0.7.',
    difficulty: 5
  },
  {
    id: 'hcmc-math-2026-q4b',
    type: 'wordform',
    category: 'quadratic-equation',
    prompt: 'Bác Năm có một mảnh đất hình chữ nhật với chiều rộng x (m) (x > 11) và chiều dài hơn chiều rộng 9 (m). Bác Năm dùng một phần đất hình chữ nhật có chiều rộng là x - 11 (m) và chiều dài là x - 6 (m) để làm nhà ở. Biết diện tích toàn bộ mảnh đất gấp 8 lần diện tích làm nhà ở, tìm chiều dài và chiều rộng của mảnh đất.\n\n(Nhập đáp án theo định dạng: dài = [giá trị]m, rộng = [giá trị]m, ví dụ: dài = 25m, rộng = 16m)',
    options: null,
    correct_answer: [
      'dài = 25m, rộng = 16m',
      'dài=25m, rộng=16m',
      'dài = 25 m, rộng = 16 m',
      'dài: 25m, rộng: 16m',
      'rộng = 16m, dài = 25m',
      '25m và 16m',
      '25m, 16m'
    ],
    explanation: 'Ta có diện tích mảnh đất là x * (x + 9).\nDiện tích nhà ở là (x - 6) * (x - 11).\nTheo đề bài:\nx * (x + 9) = 8 * (x - 6) * (x - 11)\n=> x^2 + 9x = 8 * (x^2 - 17x + 66)\n=> x^2 + 9x = 8x^2 - 136x + 528\n=> 7x^2 - 145x + 528 = 0\n=> (x - 16) * (7x - 33) = 0\n\nDo x > 11 nên ta nhận nghiệm x = 16.\nVậy chiều rộng mảnh đất là 16 (m), chiều dài là 16 + 9 = 25 (m).',
    difficulty: 6
  },
  {
    id: 'hcmc-math-2026-q5a',
    type: 'wordform',
    category: 'geometry-spatial',
    prompt: 'Một bình inox có cấu tạo gồm hai phần: phần thân có dạng hình trụ với chiều cao 20 cm và bán kính đáy là 4 cm, phần nắp có dạng nửa hình cầu có đường kính bằng với đường kính đáy của phần thân. Tính thể tích không gian bên trong của cái bình nếu bỏ qua độ dày của vỏ bình. (Làm tròn kết quả đến hàng đơn vị của cm3, lấy pi = 3.14).',
    options: null,
    correct_answer: ['1139', '1139 cm3', '1139 cm³'],
    explanation: '- Bán kính của hình trụ và nửa hình cầu là r = 4 cm.\n- Thể tích phần nắp (nửa hình cầu): V1 = 1/2 * (4/3 * pi * r^3) = 2/3 * 3.14 * 4^3 = 133.97 cm3.\n- Thể tích phần thân (hình trụ): V2 = pi * r^2 * h = 3.14 * 4^2 * 20 = 1004.8 cm3.\n- Tổng thể tích bình: V = V1 + V2 = 133.97 + 1004.8 = 1138.77 cm3.\n- Làm tròn đến hàng đơn vị ta được: 1139 cm3.',
    difficulty: 6
  },
  {
    id: 'hcmc-math-2026-q5b',
    type: 'wordform',
    category: 'geometry-spatial',
    prompt: 'Một bình inox có cấu tạo gồm hai phần: phần thân hình trụ (chiều cao 20 cm, bán kính đáy 4 cm), phần nắp là nửa hình cầu (bán kính đáy 4 cm). Nhà sản xuất muốn phủ một lớp sơn tĩnh điện lên mặt ngoài của vỏ bình (gồm phần thân, phần nắp và đáy bình), giả sử chi phí sơn là 210.000 đồng/m2. Tính chi phí để sơn một cái bình inox.\n\n(Làm tròn kết quả đến hàng nghìn đồng, ví dụ: 14000)',
    options: null,
    correct_answer: ['14000', '14.000', '14000 đồng', '14000đ'],
    explanation: 'Diện tích cần sơn bao gồm:\n- Diện tích xung quanh hình trụ: S1 = 2 * pi * r * h = 2 * 3.14 * 4 * 20 = 502.4 cm2.\n- Diện tích nửa mặt cầu: S2 = 2 * pi * r^2 = 2 * 3.14 * 4^2 = 100.48 cm2.\n- Diện tích đáy bình: S3 = pi * r^2 = 3.14 * 4^2 = 50.24 cm2.\n\nTổng diện tích: S = S1 + S2 + S3 = 653.12 cm2 = 0.065312 m2.\nChi phí sơn: 0.065312 * 210.000 = 13715.52 (đồng).\nLàm tròn đến hàng nghìn đồng là 14.000 đồng.',
    difficulty: 6
  },
  {
    id: 'hcmc-math-2026-q6',
    type: 'wordform',
    category: 'work-rate',
    prompt: 'Hai đội A và B dự kiến cùng làm chung và xong công việc trong một số ngày. Nếu đội A làm 1/3 công việc rồi đội B làm phần còn lại thì chậm hơn so với dự kiến 6 ngày. Nếu đội B làm 1/3 công việc rồi đội A làm phần còn lại thì chậm hơn so với dự kiến 4 ngày. Hỏi hai đội A và B dự kiến cùng làm chung và xong công việc này trong bao nhiêu ngày?\n\n(Nhập đáp án số nguyên, ví dụ: 4)',
    options: null,
    correct_answer: ['4', '4 ngày', '4 ngay'],
    explanation: 'Gọi thời gian đội A và B làm một mình xong công việc lần lượt là x và y (ngày) (x, y > 0).\nThời gian dự kiến làm chung: t = (x * y) / (x + y) ngày.\nTheo bài ra:\n- Trường hợp 1: 1/3*x + 2/3*y = t + 6  (1)\n- Trường hợp 2: 1/3*y + 2/3*x = t + 4  (2)\n\nLấy (1) trừ (2) vế theo vế ta được:\n1/3 * (y - x) = 2 => y - x = 6 => y = x + 6.\n\nThay y = x + 6 vào (1):\n1/3*x + 2/3*(x + 6) - (x * (x + 6)) / (2x + 6) = 6\n=> x + 4 - (x^2 + 6x) / (2x + 6) = 6\n=> (x^2 + 6x) / (2x + 6) = x - 2\n=> x^2 + 6x = (x - 2)(2x + 6) = 2x^2 + 2x - 12\n=> x^2 - 4x - 12 = 0\n=> (x - 6)(x + 2) = 0 => x = 6 (vì x > 0).\n\nThời gian hai đội làm chung hoàn thành công việc là:\n6 * 12 / (6 + 12) = 4 ngày.',
    difficulty: 6
  }
];

async function main() {
  console.log('Bắt đầu kết nối database để nạp đề thi Toán 2026...');
  try {
    let successCount = 0;
    for (const q of questions) {
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
          sourceText,
          'math'
        ]
      );
      successCount++;
    }
    console.log(`Đã nạp thành công ${successCount}/${questions.length} câu hỏi tự luận toán (dạng điền đáp án) vào cơ sở dữ liệu!`);
  } catch (error) {
    console.error('Lỗi khi nạp dữ liệu:', error);
  } finally {
    await pool.end();
    console.log('Đã đóng kết nối database.');
  }
}

main();
