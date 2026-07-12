import { pool } from './db.js';

const MATH_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topicId": "math-quadratic-function",
    "category": "quadratic-function",
    "prompt": "Cho parabol (P): y = -x² và đường thẳng (d): y = 2x - 3. Tìm tọa độ giao điểm của (P) và (d).",
    "options": [
      "A. (1; -1) và (3; -9)",
      "B. (1; -1) và (-3; -9)",
      "C. (-1; -1) và (3; 9)",
      "D. (1; 1) và (-3; 9)"
    ],
    "correct_answer": "B",
    "explanation": "Phương trình hoành độ giao điểm của (P) và (d) là:\n-x² = 2x - 3\n<=> x² + 2x - 3 = 0\n\nVì a + b + c = 1 + 2 - 3 = 0 nên phương trình có hai nghiệm:\nx₁ = 1 => y₁ = -1² = -1. Ta được giao điểm thứ nhất (1; -1).\nx₂ = -3 => y₂ = -(-3)² = -9. Ta được giao điểm thứ hai (-3; -9).\n\nVậy hai giao điểm là (1; -1) và (-3; -9)."
  },
  {
    "id": 2,
    "topicId": "math-quadratic-equation",
    "category": "quadratic-equation",
    "prompt": "Cho phương trình ẩn x: x² - 2mx + m² - 4 = 0 (m là tham số). Kết luận nào sau đây là đúng về số nghiệm của phương trình?",
    "options": [
      "A. Phương trình luôn có hai nghiệm phân biệt với mọi m",
      "B. Phương trình vô nghiệm với mọi m",
      "C. Phương trình chỉ có nghiệm khi m > 2",
      "D. Phương trình có nghiệm kép với mọi m"
    ],
    "correct_answer": "A",
    "explanation": "Ta xác định các hệ số: a = 1; b' = -m; c = m² - 4.\nTính biệt thức Delta phẩy (Δ'):\nΔ' = (b')² - ac\nΔ' = (-m)² - 1.(m² - 4)\nΔ' = m² - m² + 4\nΔ' = 4\n\nVì Δ' = 4 > 0 với mọi giá trị của m nên phương trình luôn luôn có hai nghiệm phân biệt với mọi m."
  },
  {
    "id": 3,
    "topicId": "math-vieta",
    "category": "vieta",
    "prompt": "Gọi x₁, x₂ là hai nghiệm của phương trình x² - 5x + 3 = 0. Không giải phương trình, hãy tính giá trị của biểu thức A = x₁² + x₂².",
    "options": [
      "A. A = 19",
      "B. A = 22",
      "C. A = 25",
      "D. A = 13"
    ],
    "correct_answer": "A",
    "explanation": "Theo định lý Vi-ét, hai nghiệm x₁, x₂ của phương trình x² - 5x + 3 = 0 thỏa mãn:\n* Tổng nghiệm: x₁ + x₂ = -b/a = 5\n* Tích nghiệm: x₁.x₂ = c/a = 3\n\nBiến đổi biểu thức A:\nA = x₁² + x₂² = (x₁ + x₂)² - 2x₁.x₂\n\nThay các giá trị Vi-ét vào:\nA = 5² - 2.3 = 25 - 6 = 19.\nVậy A = 19."
  },
  {
    "id": 4,
    "topicId": "math-linear-system",
    "category": "linear-system",
    "prompt": "Tìm nghiệm (x; y) của hệ phương trình sau:\n2x + y = 5\n3x - y = 5",
    "options": [
      "A. (1; 2)",
      "B. (2; 1)",
      "C. (2; -1)",
      "D. (-2; 1)"
    ],
    "correct_answer": "B",
    "explanation": "Cộng vế theo vế hai phương trình của hệ ta được:\n(2x + y) + (3x - y) = 5 + 5\n<=> 5x = 10\n<=> x = 2\n\nThay x = 2 vào phương trình đầu tiên:\n2(2) + y = 5\n<=> 4 + y = 5\n<=> y = 1\n\nVậy hệ phương trình có nghiệm duy nhất (x; y) là (2; 1)."
  },
  {
    "id": 5,
    "topicId": "math-inequality",
    "category": "inequality",
    "prompt": "Tìm tập nghiệm của bất phương trình sau: 3x - 5 ≥ 5x + 3.",
    "options": [
      "A. x ≥ -4",
      "B. x ≤ -4",
      "C. x ≥ 4",
      "D. x ≤ 4"
    ],
    "correct_answer": "B",
    "explanation": "Ta biến đổi bất phương trình đã cho:\n3x - 5 ≥ 5x + 3\n<=> 3x - 5x ≥ 3 + 5 (chuyển vế đổi dấu)\n<=> -2x ≥ 8\n<=> x ≤ 8 / (-2) (chia cho số âm phải đổi chiều bất đẳng thức)\n<=> x ≤ -4\n\nVậy tập nghiệm của bất phương trình là x ≤ -4."
  },
  {
    "id": 6,
    "topicId": "math-statistics",
    "category": "statistics",
    "prompt": "Cho bảng tần số về điểm kiểm tra của một nhóm 10 học sinh:\nĐiểm số (x): 6 | 7 | 8 | 9 | 10\nTần số (n): 1 | 3 | 4 | 1 | 1\nHãy tính điểm trung bình (X_tb) của nhóm học sinh này.",
    "options": [
      "A. X_tb = 7.5",
      "B. X_tb = 7.8",
      "C. X_tb = 8.0",
      "D. X_tb = 8.2"
    ],
    "correct_answer": "B",
    "explanation": "Tổng số học sinh (tổng tần số) N = 1 + 3 + 4 + 1 + 1 = 10.\n\nTính điểm số trung bình (X_tb):\nX_tb = (6.1 + 7.3 + 8.4 + 9.1 + 10.1) / N\nX_tb = (6 + 21 + 32 + 9 + 10) / 10\nX_tb = 78 / 10 = 7.8.\n\nVậy điểm số trung bình của nhóm học sinh là 7.8."
  },
  {
    "id": 7,
    "topicId": "math-probability",
    "category": "probability",
    "prompt": "Một hộp chứa 3 quả cầu đỏ, 4 quả cầu xanh và 5 quả cầu vàng có kích thước giống hệt nhau. Lấy ngẫu nhiên một quả cầu từ hộp. Tính xác suất để quả cầu được lấy ra không phải màu xanh.",
    "options": [
      "A. 1/3",
      "B. 2/3",
      "C. 5/12",
      "D. 7/12"
    ],
    "correct_answer": "B",
    "explanation": "Tổng số quả cầu trong hộp là: 3 + 4 + 5 = 12 quả.\n\nSố quả cầu không phải màu xanh (tức là màu đỏ hoặc màu vàng) là:\n3 + 5 = 8 quả.\n\nXác suất cần tìm là tỉ số giữa số quả cầu không phải màu xanh và tổng số quả cầu:\nP = 8 / 12 = 2/3.\n\nVậy xác suất để lấy được quả cầu không phải màu xanh là 2/3."
  },
  {
    "id": 8,
    "topicId": "math-real-world-algebra",
    "category": "real-world-algebra",
    "prompt": "Một mảnh đất hình chữ nhật có chiều dài hơn chiều rộng 4m. Nếu tăng chiều rộng thêm 3m và giảm chiều dài đi 2m thì diện tích tăng thêm 8m². Tính chiều rộng ban đầu của mảnh đất.",
    "options": [
      "A. 2m",
      "B. 4m",
      "C. 6m",
      "D. 8m"
    ],
    "correct_answer": "A",
    "explanation": "Gọi chiều rộng ban đầu của mảnh đất là x (m) (Điều kiện: x > 0).\nChiều dài ban đầu của mảnh đất là: x + 4 (m).\nDiện tích ban đầu của mảnh đất là: x(x + 4) (m²).\n\nSau khi thay đổi kích thước:\n* Chiều rộng mới: x + 3 (m)\n* Chiều dài mới: (x + 4) - 2 = x + 2 (m)\n* Diện tích mới là: (x + 3)(x + 2) (m²)\n\nTheo đề bài, diện tích mới tăng thêm 8m² so với diện tích cũ nên ta có phương trình:\n(x + 3)(x + 2) - x(x + 4) = 8\n<=> x² + 5x + 6 - (x² + 4x) = 8\n<=> x + 6 = 8\n<=> x = 2 (thỏa mãn)\n\nVậy chiều rộng ban đầu của mảnh đất là 2m."
  },
  {
    "id": 9,
    "topicId": "math-real-world-percent",
    "category": "real-world-percent",
    "prompt": "Một cửa hàng niêm yết giá bán một chiếc áo khoác là 400,000 đồng. Nhân dịp lễ, cửa hàng giảm giá lần thứ nhất 10%. Sau đó, để thanh lý nhanh, cửa hàng tiếp tục giảm thêm 5% trên giá đã giảm của lần thứ nhất. Hỏi giá của chiếc áo sau hai lần giảm giá là bao nhiêu?",
    "options": [
      "A. 340,000 đồng",
      "B. 342,000 đồng",
      "C. 350,000 đồng",
      "D. 338,000 đồng"
    ],
    "correct_answer": "B",
    "explanation": "Giá của chiếc áo sau lần giảm giá thứ nhất (giảm 10%):\n400,000 . (1 - 10%) = 400,000 . 0.9 = 360,000 (đồng).\n\nGiá của chiếc áo sau lần giảm giá thứ hai (giảm tiếp 5% trên giá mới):\n360,000 . (1 - 5%) = 360,000 . 0.95 = 342,000 (đồng).\n\nVậy giá của chiếc áo sau hai lần giảm giá là 342,000 đồng."
  },
  {
    "id": 10,
    "topicId": "math-plane-geometry-circle",
    "category": "plane-geometry",
    "prompt": "Cho đường tròn (O; 5cm) và một điểm A nằm ngoài đường tròn sao cho OA = 13cm. Vẽ tiếp tuyến AB với đường tròn (B là tiếp điểm). Tính độ dài đoạn tiếp tuyến AB.",
    "options": [
      "A. AB = 12cm",
      "B. AB = 8cm",
      "C. AB = 10cm",
      "D. AB = √194cm"
    ],
    "correct_answer": "A",
    "explanation": "Vì AB là tiếp tuyến của đường tròn (O) tại tiếp điểm B nên OB vuông góc với AB tại B. Do đó, tam giác OAB vuông tại B.\n\nTheo định lý Pythagore trong tam giác vuông OAB, ta có:\nOA² = OB² + AB²\n<=> 13² = 5² + AB²\n<=> 169 = 25 + AB²\n<=> AB² = 144\n<=> AB = 12cm (do AB > 0).\n\nVậy độ dài đoạn tiếp tuyến AB là 12cm."
  },
  {
    "id": 11,
    "topicId": "math-plane-geometry-triangle",
    "category": "plane-geometry",
    "prompt": "Cho tam giác ABC đồng dạng với tam giác A'B'C' theo tỉ số đồng dạng k = 2/3. Biết diện tích tam giác A'B'C' là 36cm². Tính diện tích tam giác ABC.",
    "options": [
      "A. S = 24cm²",
      "B. S = 16cm²",
      "C. S = 54cm²",
      "D. S = 81cm²"
    ],
    "correct_answer": "B",
    "explanation": "Khi hai tam giác đồng dạng với nhau, tỉ số diện tích của chúng bằng bình phương tỉ số đồng dạng.\n\nTa có:\nS_ABC / S_A'B'C' = k²\n<=> S_ABC / 36 = (2/3)²\n<=> S_ABC / 36 = 4/9\n<=> S_ABC = 36 . 4/9\n<=> S_ABC = 16cm².\n\nVậy diện tích tam giác ABC là 16cm²."
  },
  {
    "id": 12,
    "topicId": "math-plane-geometry-cyclic",
    "category": "plane-geometry",
    "prompt": "Cho tứ giác ABCD nội tiếp đường tròn (O). Biết góc A = 70° và góc B = 110°. Tính số đo góc C và góc D của tứ giác.",
    "options": [
      "A. C = 110°, D = 70°",
      "B. C = 70°, D = 110°",
      "C. C = 110°, D = 110°",
      "D. C = 70°, D = 70°"
    ],
    "correct_answer": "A",
    "explanation": "Tứ giác ABCD nội tiếp đường tròn nên tổng hai góc đối diện luôn bằng 180°.\n\nTa có:\n* Góc A + Góc C = 180°\n* Góc C = 180° - Góc A = 180° - 70° = 110°.\n* Góc B + Góc D = 180°\n* Góc D = 180° - Góc B = 180° - 110° = 70°.\n\nVậy số đo góc C và góc D lần lượt là 110° và 70°."
  },
  {
    "id": 13,
    "topicId": "math-plane-geometry-coordinates",
    "category": "plane-geometry",
    "prompt": "Xác định phương trình đường thẳng (d): y = ax + b biết (d) đi qua điểm A(1; 5) và song song với đường thẳng (d'): y = 2x + 1.",
    "options": [
      "A. y = 2x + 3",
      "B. y = 2x + 1",
      "C. y = -2x + 7",
      "D. y = 2x + 5"
    ],
    "correct_answer": "A",
    "explanation": "Đường thẳng (d): y = ax + b song song với đường thẳng (d'): y = 2x + 1 nên:\na = 2 và b ≠ 1.\n\nKhi đó đường thẳng (d) có dạng: y = 2x + b.\nVì (d) đi qua điểm A(1; 5), ta thay tọa độ x = 1, y = 5 vào phương trình đường thẳng (d):\n5 = 2.(1) + b\n<=> 5 = 2 + b\n<=> b = 3 (thỏa mãn điều kiện b ≠ 1).\n\nVậy phương trình đường thẳng (d) cần tìm là: y = 2x + 3."
  },
  {
    "id": 14,
    "topicId": "math-solid-geometry-volume",
    "category": "solid-geometry",
    "prompt": "Tính thể tích V của một hình nón có bán kính đáy r = 3cm and chiều cao h = 4cm (lấy số Pi π ≈ 3.14, kết quả làm tròn đến chữ số thập phân thứ hai).",
    "options": [
      "A. V ≈ 37.68cm³",
      "B. V ≈ 113.04cm³",
      "C. V ≈ 12.56cm³",
      "D. V ≈ 50.24cm³"
    ],
    "correct_answer": "A",
    "explanation": "Công thức tính thể tích hình nón là:\nV = (1/3).π.r².h\n\nThay các giá trị r = 3cm, h = 4cm và π ≈ 3.14 vào công thức:\nV = (1/3) . 3.14 . 3² . 4\nV = (1/3) . 3.14 . 9 . 4\nV = 3.14 . 3 . 4\nV = 37.68cm³.\n\nVậy thể tích hình nón xấp xỉ bằng 37.68cm³."
  },
  {
    "id": 15,
    "topicId": "math-solid-geometry-3d",
    "category": "solid-geometry",
    "prompt": "Một hình trụ có bán kính đáy r = 5cm. Một mặt phẳng song song với trục của hình trụ và cách trục một khoảng d = 3cm cắt hình trụ tạo thành một thiết diện hình chữ nhật có diện tích là 40cm². Tính chiều cao h của hình trụ.",
    "options": [
      "A. h = 4cm",
      "B. h = 5cm",
      "C. h = 8cm",
      "D. h = 10cm"
    ],
    "correct_answer": "B",
    "explanation": "Thiết diện cắt bởi mặt phẳng song song với trục là hình chữ nhật ABCD có chiều cao bằng chiều cao h của hình trụ và chiều rộng là dây cung AB của đường tròn đáy.\n\nKhoảng cách từ tâm O của đáy đến dây cung AB là d = 3cm. Bán kính đường tròn đáy là r = 5cm.\nGọi H là trung điểm của AB, tam giác OHB vuông tại H có OB = 5cm, OH = 3cm.\nTheo định lý Pythagore:\nHB = √(OB² - OH²) = √(5² - 3²) = 4cm.\nDo đó, độ dài dây cung AB (chiều rộng thiết diện) là:\nAB = 2 . HB = 8cm.\n\nDiện tích thiết diện S = AB . h = 40cm².\nSuy ra chiều cao h là:\nh = 40 / AB = 40 / 8 = 5cm.\n\nVậy chiều cao của hình trụ là 5cm."
  },
  {
    "id": 16,
    "topicId": "math-trigonometry",
    "category": "trigonometry",
    "prompt": "Cho tam giác ABC vuông tại A, đường cao AH. Biết độ dài hai đoạn hình chiếu HB = 2cm và HC = 8cm. Tính độ dài đường cao AH.",
    "options": [
      "A. AH = 4cm",
      "B. AH = 16cm",
      "C. AH = 5cm",
      "D. AH = 6cm"
    ],
    "correct_answer": "A",
    "explanation": "Áp dụng hệ thức lượng vào tam giác ABC vuông tại A có đường cao AH, ta có công thức:\nAH² = HB . HC\n\nThay số liệu HB = 2cm, HC = 8cm vào:\nAH² = 2 . 8 = 16\n=> AH = √16 = 4cm (vì AH > 0).\n\nVậy độ dài đường cao AH là 4cm."
  },
  {
    "id": 17,
    "topicId": "math-radicals",
    "category": "radicals",
    "prompt": "Rút gọn biểu thức sau: A = √12 - 3√27 + √48.",
    "options": [
      "A. A = -3√3",
      "B. A = -5√3",
      "C. A = 3√3",
      "D. A = 5√3"
    ],
    "correct_answer": "A",
    "explanation": "Ta phân tích các biểu thức dưới dấu căn thành tích của các số chính phương để đưa ra ngoài căn:\n* √12 = √(4 . 3) = 2√3\n* √27 = √(9 . 3) = 3√3 => 3√27 = 3 . 3√3 = 9√3\n* √48 = √(16 . 3) = 4√3\n\nThay vào biểu thức A:\nA = 2√3 - 9√3 + 4√3\nA = (2 - 9 + 4)√3\nA = -3√3.\n\nVậy biểu thức rút gọn là A = -3√3."
  },
  {
    "id": 18,
    "topicId": "math-rational-expression",
    "category": "rational-expression",
    "prompt": "Rút gọn biểu thức hữu tỉ sau: P = (x² - 4) / (x² - 2x) với điều kiện x ≠ 0 và x ≠ 2.",
    "options": [
      "A. P = (x + 2)/x",
      "B. P = (x - 2)/x",
      "C. P = x/(x + 2)",
      "D. P = x + 2"
    ],
    "correct_answer": "A",
    "explanation": "Ta phân tích tử thức và mẫu thức thành nhân tử để rút gọn:\n* Tử thức: x² - 4 = (x - 2)(x + 2) (áp dụng hằng đẳng thức hiệu hai bình phương)\n* Mẫu thức: x² - 2x = x(x - 2) (đặt nhân tử chung x ra ngoài)\n\nThay vào biểu thức P:\nP = [(x - 2)(x + 2)] / [x(x - 2)]\n\nVới điều kiện x ≠ 2, ta triệt tiêu lượng chung (x - 2) ở cả tử và mẫu:\nP = (x + 2) / x.\n\nVậy biểu thức rút gọn là P = (x + 2)/x."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 18 câu hỏi Gác Cổng Toán Học vào Database ===");
  let importedCount = 0;

  for (const q of MATH_GATEKEEPER_RAW) {
    const id = `math-gatekeeper-topic-${q.topicId}`;
    
    // Tìm đáp án chính xác từ mảng options
    const correctOpt = q.options.find(opt => opt.trim().startsWith(q.correct_answer));
    if (!correctOpt) {
      console.error(`Không tìm thấy đáp án khớp cho chữ cái "${q.correct_answer}" trong câu hỏi ID ${q.id}`);
      continue;
    }
    const correctAnswersArray = [correctOpt];

    const metadata = {
      isStandard: true,
      isGatekeeper: true,
      answerMode: "single-choice",
      tags: ["gatekeeper", "math-gatekeeper-2026"]
    };

    try {
      await pool.query(
        `INSERT INTO ge10_custom_questions 
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, metadata, topic_id)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
           metadata = EXCLUDED.metadata,
           topic_id = EXCLUDED.topic_id`,
        [
          id,
          'mcq',
          q.category,
          q.prompt,
          q.options,
          correctAnswersArray,
          q.explanation,
          5, // Độ khó = 5 (Đủ điều kiện Gác Cổng)
          'Bộ đề Gác Cổng Toán Học 2026',
          'math',
          JSON.stringify(metadata),
          q.topicId
        ]
      );
      importedCount++;
      console.log(`Đã nạp thành công câu hỏi Gác Cổng cho Topic: ${q.topicId}`);
    } catch (err) {
      console.error(`Lỗi khi nạp câu hỏi cho Topic: ${q.topicId}`, err);
    }
  }

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${MATH_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Toán Học vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
