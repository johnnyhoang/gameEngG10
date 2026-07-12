import { pool } from './db.js';

const SCIENCE_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "sci-phy-electricity",
    "topic_name": "Điện học — Điện trở, Định luật Ôm, Mạch nối tiếp/song song",
    "zone": "Hầm Thạch",
    "question": "Định luật Ôm phát biểu về mối quan hệ giữa cường độ dòng điện (I), hiệu điện thế (U) và điện trở (R) của một dây dẫn như thế nào?",
    "options": [
      "A. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ thuận với điện trở",
      "B. Cường độ dòng điện tỉ lệ nghịch với hiệu điện thế và tỉ lệ thuận với điện trở",
      "C. Cường độ dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở",
      "D. Cường độ dòng điện không phụ thuộc vào hiệu điện thế và điện trở"
    ],
    "correct_answer": "C",
    "explanation": "Theo định luật Ôm, cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây đó. Hệ thức của định luật là: I = U/R."
  },
  {
    "id": 2,
    "topic_code": "sci-phy-electromagnet",
    "topic_name": "Điện từ học — Nam châm, Cảm ứng điện từ",
    "zone": "Hầm Băng",
    "question": "Điều kiện cốt lõi để xuất hiện dòng điện cảm ứng xoay chiều trong một cuộn dây dẫn kín là gì?",
    "options": [
      "A. Đặt một nam châm đứng yên hoàn toàn ở rất gần cuộn dây dẫn",
      "B. Số đường sức từ xuyên qua tiết diện S của cuộn dây dẫn kín biến thiên luân phiên (tăng, giảm liên tục)",
      "C. Giữ cho từ trường đi qua cuộn dây dẫn luôn ổn định, không thay đổi theo thời gian",
      "D. Nối cuộn dây dẫn kín với một nguồn điện một chiều có hiệu điện thế không đổi"
    ],
    "correct_answer": "B",
    "explanation": "Dòng điện cảm ứng xoay chiều chỉ xuất hiện trong cuộn dây dẫn kín khi số đường sức từ xuyên qua tiết diện S của cuộn dây biến thiên luân phiên (tăng rồi giảm, giảm rồi tăng liên tục). Điều này thường đạt được bằng cách cho nam châm quay trước cuộn dây hoặc đưa nam châm ra vào cuộn dây liên tục."
  },
  {
    "id": 3,
    "topic_code": "sci-phy-optics",
    "topic_name": "Quang học — Thấu kính hội tụ/phân kỳ",
    "zone": "Hầm Băng",
    "question": "Một chùm tia sáng song song với trục chính đi qua một thấu kính hội tụ sẽ cho chùm tia ló có đặc điểm gì?",
    "options": [
      "A. Trở thành chùm tia song song với trục chính",
      "B. Phân kỳ rộng ra xa trục chính của thấu kính",
      "C. Hội tụ tại tiêu điểm ảnh chính (F') của thấu kính",
      "D. Đi thẳng mà không bị lệch hướng (khúc xạ)"
    ],
    "correct_answer": "C",
    "explanation": "Theo đường truyền của các tia sáng đặc biệt qua thấu kính hội tụ: Tia sáng tới song song với trục chính thì tia ló đi qua tiêu điểm ảnh chính (F') của thấu kính."
  },
  {
    "id": 4,
    "topic_code": "sci-phy-energy",
    "topic_name": "Năng lượng — Công suất, Hiệu suất",
    "zone": "Hầm Hỏa",
    "question": "Hiệu suất (H) của một thiết bị tiêu thụ năng lượng được định nghĩa và tính theo công thức nào sau đây?",
    "options": [
      "A. H = (A_hao phí / A_toàn phần) . 100%",
      "B. H = (A_có ích / A_toàn phần) . 100%",
      "C. H = (A_có ích / A_hao phí) . 100%",
      "D. H = (A_toàn phần / A_có ích) . 100%"
    ],
    "correct_answer": "B",
    "explanation": "Hiệu suất (H) là tỉ số giữa năng lượng có ích được chuyển hóa (A_có ích) và toàn bộ năng lượng tiêu thụ đầu vào (A_toàn phần), được biểu diễn dưới dạng phần trăm: H = (A_có ích / A_toàn phần) . 100%."
  },
  {
    "id": 5,
    "topic_code": "sci-chem-oxacid",
    "topic_name": "Oxit — Axit — Bazơ — Muối",
    "zone": "Hầm Thạch",
    "question": "Chất nào sau đây thuộc loại muối và có khả năng tác dụng với dung dịch axit sunfuric loãng (H₂SO₄) để tạo ra kết tủa trắng không tan trong axit?",
    "options": [
      "A. NaCl (Natri clorua)",
      "B. BaCl₂ (Bari clorua)",
      "C. NaOH (Natri hiđroxit)",
      "D. CaCO₃ (Canxi cacbonat)"
    ],
    "correct_answer": "B",
    "explanation": "Bari clorua (BaCl₂) là một muối tan. Khi phản ứng với axit sunfuric (H₂SO₄), xảy ra phản ứng trao đổi tạo thành kết tủa trắng Bari sunfat (BaSO₄) đặc trưng không tan trong axit: BaCl₂ + H₂SO₄ -> BaSO₄↓ + 2HCl."
  },
  {
    "id": 6,
    "topic_code": "sci-chem-periodic",
    "topic_name": "Bảng tuần hoàn & Tính chất hóa học theo nhóm",
    "zone": "Hầm Thạch",
    "question": "Trong bảng tuần hoàn các nguyên tố hóa học, các nguyên tố thuộc cùng một nhóm A có đặc điểm chung nổi bật nào sau đây?",
    "options": [
      "A. Có cùng số lớp electron trong nguyên tử",
      "B. Có cùng số electron ở lớp ngoài cùng và có tính chất hóa học tương tự nhau",
      "C. Có cùng khối lượng nguyên tử (nguyên tử khối)",
      "D. Có cùng số proton trong hạt nhân nguyên tử"
    ],
    "correct_answer": "B",
    "explanation": "Các nguyên tố thuộc cùng một nhóm A có cùng số electron ở lớp ngoài cùng (quyết định tính chất hóa học cốt lõi), vì vậy chúng có tính chất hóa học gần giống nhau. Số lớp electron chung là đặc trưng của các nguyên tố thuộc cùng một chu kỳ."
  },
  {
    "id": 7,
    "topic_code": "sci-chem-metal",
    "topic_name": "Kim loại — Tính chất, Dãy hoạt động",
    "zone": "Hầm Hỏa",
    "question": "Dựa vào dãy hoạt động hóa học của kim loại, kim loại nào sau đây hoạt động hóa học rất mạnh, có thể phản ứng mãnh liệt với nước ở nhiệt độ thường tạo thành dung dịch kiềm và giải phóng khí hiđro (H₂)?",
    "options": [
      "A. Cu (Đồng)",
      "B. Fe (Sắt)",
      "C. Na (Natri)",
      "D. Al (Nhôm)"
    ],
    "correct_answer": "C",
    "explanation": "Các kim loại kiềm đứng đầu dãy hoạt động hóa học (như K, Na, Ca, Ba) có khả năng phản ứng trực tiếp với nước ở nhiệt độ thường tạo thành dung dịch bazơ mạnh (kiềm) và khí hiđro. Phương trình hóa học: 2Na + 2H₂O -> 2NaOH + H₂↑."
  },
  {
    "id": 8,
    "topic_code": "sci-chem-nonmetal",
    "topic_name": "Phi kim — Clo, Cacbon, Silic, Lưu huỳnh",
    "zone": "Hầm Hỏa",
    "question": "Nước clo thu được khi hòa tan khí Clo (Cl₂) vào nước có màu vàng lục và mùi hắc. Nước clo có tính tẩy màu mạnh là do sự xuất hiện của hợp chất có tính oxi hóa rất mạnh nào sau đây?",
    "options": [
      "A. Axit clohiđric (HCl)",
      "B. Khí Clo (Cl₂) chưa tan hết",
      "C. Axit hipoclorơ (HClO)",
      "D. Khí oxi (O₂) tự do"
    ],
    "correct_answer": "C",
    "explanation": "Clo phản ứng thuận nghịch với nước tạo thành hỗn hợp hai axit: Cl₂ + H₂O <=> HCl + HClO. Axit hipoclorơ (HClO) là chất kém bền nhưng có tính oxi hóa cực mạnh, dễ dàng phá hủy các chất màu hữu cơ, tạo ra tính tẩy màu của nước clo."
  },
  {
    "id": 9,
    "topic_code": "sci-chem-organic",
    "topic_name": "Hóa hữu cơ sơ lược — Hiđrocacbon, Rượu, Polime",
    "zone": "Hầm Băng",
    "question": "Hợp chất hữu cơ đơn giản nhất thuộc nhóm hiđrocacbon, là thành phần chính của khí thiên nhiên và khí bùn ao, có công thức phân tử CH₄ được gọi là gì?",
    "options": [
      "A. Etilen",
      "B. Axetilen",
      "C. Metan",
      "D. Rượu etylic"
    ],
    "correct_answer": "C",
    "explanation": "Metan (CH₄) là chất khí không màu, không mùi, nhẹ hơn không khí và là hiđrocacbon đơn giản nhất. Metan chiếm thành phần chủ yếu (hơn 90%) trong khí thiên nhiên, khí mỏ dầu và khí bùn ao."
  },
  {
    "id": 10,
    "topic_code": "sci-bio-genetics-mendelian",
    "topic_name": "Di truyền học — Quy luật Mendel",
    "zone": "Hầm Băng",
    "question": "Theo thí nghiệm của Mendel, khi lai hai dòng bố mẹ thuần chủng khác nhau về một cặp tính trạng tương phản (ví dụ: hạt vàng lai hạt xanh), thế hệ F₂ thu được sẽ có tỉ lệ phân ly kiểu hình xấp xỉ là bao nhiêu?",
    "options": [
      "A. 1 Trội : 1 Lặn",
      "B. 3 Trội : 1 Lặn",
      "C. 100% Trội",
      "D. 9 Trội : 7 Lặn"
    ],
    "correct_answer": "B",
    "explanation": "Theo quy luật phân ly của Mendel, khi cho các cây lai F₁ tự thụ phấn, thế hệ F₂ sẽ có sự phân ly kiểu gen theo tỉ lệ 1AA : 2Aa : 1aa, dẫn đến tỉ lệ phân ly kiểu hình biểu hiện ra bên ngoài là 3 trội : 1 lặn (3 hạt vàng : 1 hạt xanh)."
  },
  {
    "id": 11,
    "topic_code": "sci-bio-dna-gene",
    "topic_name": "Cấu trúc ADN, Gen, ARN, Protein",
    "zone": "Hầm Băng",
    "question": "Trong cấu trúc xoắn kép của phân tử ADN (DNA), các nuclêôtit giữa hai mạch liên kết với nhau thành từng cặp theo Nguyên tắc bổ sung (NTBS) như thế nào?",
    "options": [
      "A. A liên kết với G, T liên kết với X",
      "B. A liên kết với X, T liên kết với G",
      "C. A liên kết với T, G liên kết với X",
      "D. A liên kết với U, G liên kết với X"
    ],
    "correct_answer": "C",
    "explanation": "Trong phân tử ADN mạch kép, các nuclêôtit liên kết với nhau bằng liên kết hiđro theo nguyên tắc bổ sung: Adenin (A) chỉ liên kết với Timin (T), và Guanin (G) chỉ liên kết với Xitôzin (X)."
  },
  {
    "id": 12,
    "topic_code": "sci-bio-evolution",
    "topic_name": "Biến dị — Đột biến gen, NST, Biến dị tổ hợp",
    "zone": "Hầm Hỏa",
    "question": "Khái niệm 'đột biến gen' được định nghĩa chính xác nhất là gì?",
    "options": [
      "A. Những biến đổi liên quan đến cấu trúc hoặc số lượng của toàn bộ bộ nhiễm sắc thể",
      "B. Những biến đổi trong cấu trúc của gen, liên quan đến một hoặc một số cặp nuclêôtit",
      "C. Sự tổ hợp lại các gen vốn có của bố và mẹ do quá trình giảm phân và thụ tinh",
      "D. Những thay đổi về kiểu hình của cùng một kiểu gen trước sự biến động của môi trường"
    ],
    "correct_answer": "B",
    "explanation": "Đột biến gen là những biến đổi trong cấu trúc của gen, xảy ra ở một hoặc một số cặp nuclêôtit (mất, thêm, hoặc thay thế cặp nuclêôtit), làm thay đổi cấu trúc của gen ban đầu."
  },
  {
    "id": 13,
    "topic_code": "sci-bio-ecosystem",
    "topic_name": "Hệ sinh thái — Quần thể, Quần xã, Lưới thức ăn",
    "zone": "Hầm Thạch",
    "question": "Trong một chuỗi và lưới thức ăn của hệ sinh thái, sinh vật nào sau đây đóng vai trò là 'sinh vật sản xuất'?",
    "options": [
      "A. Các động vật ăn thực vật (như sâu, thỏ, trâu bò)",
      "B. Các nấm và vi khuẩn phân giải chất hữu cơ thành chất vô cơ",
      "C. Các loài thực vật xanh và tảo có khả năng quang hợp",
      "D. Các loài động vật ăn thịt (như cáo, sói, đại bàng)"
    ],
    "correct_answer": "C",
    "explanation": "Sinh vật sản xuất là sinh vật tự dưỡng (chủ yếu là thực vật xanh và tảo), có khả năng sử dụng năng lượng ánh sáng mặt trời để tổng hợp chất hữu cơ từ các chất vô cơ qua quá trình quang hợp, tạo nguồn dinh dưỡng đầu tiên cho hệ sinh thái."
  },
  {
    "id": 14,
    "topic_code": "sci-bio-environment",
    "topic_name": "Môi trường & Bảo vệ môi trường",
    "zone": "Hầm Thạch",
    "question": "Hành động nào sau đây trực tiếp góp phần làm giảm lượng khí cacbonic (CO₂) trong khí quyển, giúp giảm nhẹ hiệu ứng nhà kính toàn cầu?",
    "options": [
      "A. Sử dụng nhiều phân bón hóa học và thuốc trừ sâu hóa học",
      "B. Trồng thêm cây xanh, phục hồi và bảo vệ rừng tự nhiên",
      "C. Tăng lượng rác thải nhựa xả trực tiếp ra ngoài môi trường",
      "D. Tăng số lượng nhà máy chạy bằng than đá hoặc dầu mỏ"
    ],
    "correct_answer": "B",
    "explanation": "Rừng cây xanh hấp thụ khí CO₂ (khí nhà kính chủ yếu) trong quá trình quang hợp và giải phóng khí O₂ ra môi trường. Trồng rừng và bảo vệ cây xanh giúp điều hòa lượng CO₂ trong khí quyển, từ đó trực tiếp giảm nhẹ hiệu ứng nhà kính."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 14 câu hỏi Gác Cổng Khoa Học Tự Nhiên vào Database ===");
  let importedCount = 0;

  for (const q of SCIENCE_GATEKEEPER_RAW) {
    const id = `science-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "science-gatekeeper-2026"]
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
          q.topic_code,
          q.question,
          q.options,
          correctAnswersArray,
          q.explanation,
          5, // Độ khó = 5 (Đủ điều kiện Gác Cổng)
          'Bộ đề Gác Cổng Khoa Học Tự Nhiên 2026',
          'science',
          JSON.stringify(metadata),
          q.topic_code
        ]
      );
      importedCount++;
      console.log(`Đã nạp thành công câu hỏi Gác Cổng cho Topic: ${q.topic_code}`);
    } catch (err) {
      console.error(`Lỗi khi nạp câu hỏi cho Topic: ${q.topic_code}`, err);
    }
  }

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${SCIENCE_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Khoa Học Tự Nhiên vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
