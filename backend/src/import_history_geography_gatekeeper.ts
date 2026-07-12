import { pool } from './db.js';

// Ánh xạ các topic_code của người dùng sang topic_id hợp lệ của hệ thống
// Lịch Sử & Địa Lý có 11 topic_id chuẩn:
// 1. his-world-ww2-background (Thạch)
// 2. his-world-ww2 (Băng)
// 3. his-world-asia-1918 (Hỏa)
// 4. his-vn-colonial (Thạch)
// 5. his-vn-party (Hỏa)
// 6. his-vn-aug-revolution (Hỏa)
// 7. geo-population (Thạch)
// 8. geo-agri-forestry-fish (Thạch)
// 9. geo-industry (Hỏa)
// 10. geo-service (Hỏa)
// 11. geo-regions-7 (Băng)

const HISTORY_GEOGRAPHY_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "his-world-ww2", // Mapped from his-world-war (Hầm Băng)
    "category": "his-world-war",
    "prompt": "Sự kiện lịch sử nào vào năm 1945 đã đánh dấu sự kết thúc hoàn toàn của Chiến tranh thế giới thứ hai (1939 - 1945) trên phạm vi toàn cầu?",
    "options": [
      "A. Đức ký văn kiện đầu hàng không điều kiện các nước Đồng minh",
      "B. Mỹ ném hai quả bom nguyên tử xuống các thành phố Hiroshima và Nagasaki của Nhật Bản",
      "C. Nhật Bản ký văn kiện đầu hàng không điều kiện lực lượng Đồng minh (15/8/1945)",
      "D. Hồng quân Liên Xô tấn công và cắm cờ chiến thắng trên nóc tòa nhà Quốc hội Đức"
    ],
    "correct_answer": "C",
    "explanation": "Chiến tranh thế giới thứ hai kết thúc hoàn toàn sau khi phát xít Nhật chấp nhận đầu hàng không điều kiện Đồng minh vào ngày 15/8/1945 và ký văn kiện đầu hàng chính thức vào ngày 2/9/1945."
  },
  {
    "id": 2,
    "topic_code": "his-world-ww2", // Mapped from his-cold-war (Hầm Băng)
    "category": "his-cold-war",
    "prompt": "Trong giai đoạn nửa sau thế kỷ XX, khái niệm \"Chiến tranh lạnh\" được định nghĩa chính xác nhất là gì?",
    "options": [
      "A. Cuộc đối đầu trực tiếp bằng vũ khí quân sự quy mô lớn giữa quân đội Mỹ và Liên Xô",
      "B. Sự cạnh tranh khốc liệt về kinh tế và áp thuế thương mại giữa các nước Đông Âu và Tây Âu",
      "C. Tình trạng đối đầu căng thẳng về chính trị, quân sự, ngoại giao giữa hai phe Tư bản chủ nghĩa và Xã hội chủ nghĩa nhưng không xảy ra chiến tranh trực tiếp giữa hai siêu cường",
      "D. Các cuộc chiến tranh cục bộ diễn ra liên tục tại vùng cực Bắc và Nam Cực"
    ],
    "correct_answer": "C",
    "explanation": "Chiến tranh lạnh là chính sách đối đầu căng thẳng về mọi mặt giữa hai phe (do Mỹ đứng đầu và Liên Xô đứng đầu). Điểm đặc biệt của Chiến tranh lạnh là đối đầu gay gắt trên mọi mặt trận nhưng không dẫn đến một cuộc xung đột quân sự trực tiếp giữa hai siêu cường."
  },
  {
    "id": 3,
    "topic_code": "his-vn-colonial", // Mapped from his-vn-1918-1945 (Hầm Thạch)
    "category": "his-vn-1918-1945",
    "prompt": "Cuộc tổng khởi nghĩa vĩ đại nào của nhân dân Việt Nam vào mùa thu năm 1945 đã đập tan ách thống trị của thực dân Pháp và phát xít Nhật, lập nên nước Việt Nam Dân chủ Cộng hòa?",
    "options": [
      "A. Phong trào cách mạng Xô viết Nghệ - Tĩnh (1930 - 1931)",
      "B. Cuộc Cách mạng Tháng Tám năm 1945",
      "C. Cuộc khởi nghĩa Yên Bái (1930)",
      "D. Phong trào dân chủ 1936 - 1939"
    ],
    "correct_answer": "B",
    "explanation": "Cách mạng Tháng Tám năm 1945 là một mốc son chói lọi, đập tan xiềng xích nô dịch của thực dân Pháp, phát xít Nhật và lật đổ chế độ phong kiến, mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam."
  },
  {
    "id": 4,
    "topic_code": "his-vn-colonial", // Mapped from his-vn-1945-1954 (Hầm Thạch)
    "category": "his-vn-1945-1954",
    "prompt": "Chiến thắng quân sự chiến lược nào của quân và dân Việt Nam đã đập tan hoàn toàn kế hoạch Nava của Pháp, quyết định thắng lợi của cuộc kháng chiến chống Pháp và buộc Pháp phải ký Hiệp định Giơ-ne-vơ năm 1954?",
    "options": [
      "A. Chiến dịch Biên giới thu - đông (1950)",
      "B. Chiến dịch Việt Bắc thu - đông (1947)",
      "C. Chiến dịch Điện Biên Phủ (1954)",
      "D. Chiến thắng Điện Biên Phủ trên không (1972)"
    ],
    "correct_answer": "C",
    "explanation": "Chiến thắng Điện Biên Phủ (1954) là đỉnh cao của cuộc kháng chiến chống thực dân Pháp, tạo cơ sở thực lực quyết định cho cuộc đấu tranh ngoại giao tại Hội nghị Giơ-ne-vơ, lập lại hòa bình ở Đông Dương."
  },
  {
    "id": 5,
    "topic_code": "his-vn-party", // Mapped from his-vn-1954-1975 (Hầm Hỏa)
    "category": "his-vn-1954-1975",
    "prompt": "Chiến dịch quân sự trọng đại nào diễn ra từ ngày 26/4 đến ngày 30/4/1975, là đỉnh cao của Tổng tiến công và nổi dậy mùa Xuân 1975, giải phóng hoàn toàn miền Nam?",
    "options": [
      "A. Chiến dịch Tây Nguyên",
      "B. Chiến dịch Huế - Đà Nẵng",
      "C. Chiến dịch Hồ Chí Minh",
      "D. Chiến dịch Đường 9 - Khe Sanh"
    ],
    "correct_answer": "C",
    "explanation": "Chiến dịch Hồ Chí Minh (từ 26/4 đến 30/4/1975) là chiến dịch cuối cùng trong cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975, giải phóng hoàn toàn Sài Gòn - Gia Định, kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước."
  },
  {
    "id": 6,
    "topic_code": "his-vn-party", // Mapped from his-vn-1975-now (Hầm Hỏa)
    "category": "his-vn-1975-now",
    "prompt": "Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam (tháng 12/1986) đã đưa ra chủ trương lịch sử nào nhằm đưa đất nước thoát khỏi khủng hoảng kinh tế - xã hội sâu sắc?",
    "options": [
      "A. Đẩy mạnh công nghiệp hóa theo mô hình tập trung bao cấp",
      "B. Đóng cửa nền kinh tế để thực hiện tự lực tự cường tuyệt đối",
      "C. Khởi xướng công cuộc Đổi mới toàn diện đất nước, trọng tâm là đổi mới về kinh tế",
      "D. Tập trung toàn bộ nguồn lực quốc gia vào phát triển các tập đoàn kinh tế nhà nước lớn"
    ],
    "correct_answer": "C",
    "explanation": "Đại hội VI (12/1986) đi vào lịch sử là Đại hội Đổi mới, mở đường cho nền kinh tế thị trường định hướng xã hội chủ nghĩa, giúp Việt Nam thoát khỏi khủng hoảng và hội nhập mạnh mẽ với thế giới."
  },
  {
    "id": 7,
    "topic_code": "geo-regions-7", // Mapped from geo-population (Hầm Băng / Hoạt động trong nhóm Vùng)
    "category": "geo-population",
    "prompt": "Nhận định nào sau đây phản ánh chính xác nhất về đặc điểm cơ cấu dân số theo độ tuổi của Việt Nam trong giai đoạn hiện nay?",
    "options": [
      "A. Cơ cấu dân số trẻ với tỉ lệ trẻ em dưới 14 tuổi ngày càng tăng mạnh",
      "B. Đang ở thời kỳ \"cơ cấu dân số vàng\" nhưng đồng thời có xu hướng già hóa dân số diễn ra rất nhanh",
      "C. Dân số phân bố cực kỳ đồng đều giữa các vùng trung du và các vùng đồng bằng lớn",
      "D. Nhóm tuổi trên lao động (từ 65 tuổi trở lên) chiếm tỉ lệ áp đảo trên 50% dân số"
    ],
    "correct_answer": "B",
    "explanation": "Việt Nam đang có cơ cấu dân số vàng (số người trong độ tuổi lao động gấp đôi số người phụ thuộc), nhưng tốc độ già hóa dân số cũng nằm trong nhóm nhanh nhất thế giới, đặt ra nhiều thách thức lớn cho an sinh xã hội."
  },
  {
    "id": 8,
    "topic_code": "geo-agri-forestry-fish", // Mapped from geo-agriculture (Hầm Thạch)
    "category": "geo-agriculture",
    "prompt": "Hai khu vực nào sau đây là vùng trọng điểm sản xuất và trồng cây công nghiệp lâu năm lớn nhất của nước ta hiện nay?",
    "options": [
      "A. Đồng bằng sông Hồng và Đồng bằng sông Cửu Long",
      "B. Tây Nguyên và Đông Nam Bộ",
      "C. Trung du và miền núi Bắc Bộ và Bắc Trung Bộ",
      "D. Duyên hải Nam Trung Bộ và Tây Nguyên"
    ],
    "correct_answer": "B",
    "explanation": "Tây Nguyên (thế mạnh về cà phê, hồ tiêu, cao su) và Đông Nam Bộ (thế mạnh về cao su, điều, tiêu) nhờ có đất đỏ feralit trên đá bazan và đất xám phù sa cổ, cùng khí hậu nóng ẩm quanh năm nên là hai vùng chuyên canh cây công nghiệp lớn nhất cả nước."
  },
  {
    "id": 9,
    "topic_code": "geo-industry", // Mapped from geo-industry (Hầm Hỏa)
    "category": "geo-industry",
    "prompt": "Các ngành công nghiệp nào sau đây được coi là ngành công nghiệp trọng điểm của nước ta nhờ có ưu thế về nguồn lao động dồi dào và thị trường tiêu thụ rộng lớn?",
    "options": [
      "A. Công nghiệp khai thác quặng kim loại và chế biến hóa chất",
      "B. Công nghiệp chế biến lương thực, thực phẩm và công nghiệp dệt may, da giày",
      "C. Công nghiệp luyện kim đen, luyện kim màu và cơ khí chính xác",
      "D. Công nghiệp sản xuất vật liệu hạt nhân và hàng không vũ trụ"
    ],
    "correct_answer": "B",
    "explanation": "Công nghiệp dệt may, da giày và chế biến lương thực, thực phẩm là các ngành công nghiệp trọng điểm truyền thống của Việt Nam. Chúng phát triển mạnh nhờ tận dụng tối đa lợi thế nhân công rẻ, khéo tay và nguồn nguyên liệu nông sản dồi dào."
  },
  {
    "id": 10,
    "topic_code": "geo-service", // Mapped from geo-service (Hầm Hỏa)
    "category": "geo-service",
    "prompt": "Sự phát triển mạnh mẽ và bùng nổ của các loại hình dịch vụ số, bưu chính viễn thông và thương mại điện tử ở nước ta hiện nay chủ yếu do yếu tố nào thúc đẩy?",
    "options": [
      "A. Việc duy trì cơ chế phân phối hàng hóa theo tem phiếu thời bao cấp",
      "B. Tác động của cuộc Cách mạng công nghiệp lần thứ tư (4.0) và quá trình hội nhập quốc tế sâu rộng",
      "C. Sự thu hẹp hoàn toàn của các ngành kinh tế nông nghiệp và công nghiệp nặng",
      "D. Chính sách hạn chế giao lưu kinh tế với các quốc gia bên ngoài"
    ],
    "correct_answer": "B",
    "explanation": "Nhờ vào hạ tầng Internet phát triển mạnh, việc ứng dụng công nghệ thông tin trong cuộc cách mạng 4.0 và hội nhập quốc tế đã thúc đẩy các ngành dịch vụ như giao hàng nhanh, ví điện tử, thương mại điện tử tăng trưởng vượt bậc."
  },
  {
    "id": 11,
    "topic_code": "geo-regions-7", // Mapped from geo-regions-north (Hầm Băng)
    "category": "geo-regions-north",
    "prompt": "Thế mạnh tự nhiên nổi bật hàng đầu của vùng Trung du và miền núi Bắc Bộ để phát triển công nghiệp năng lượng là gì?",
    "options": [
      "A. Trữ lượng dầu mỏ và khí tự nhiên lớn nhất cả nước ở vùng thềm lục địa",
      "B. Tài nguyên than đá lớn nhất cả nước (ở Quảng Ninh) và tiềm năng thủy điện dồi dào trên hệ thống sông Hồng, sông Đà",
      "C. Nguồn năng lượng gió và năng lượng mặt trời có cường độ bức xạ cao nhất cả nước",
      "D. Trữ lượng quặng sắt lớn tập trung ở vùng đồng bằng phẳng lặng"
    ],
    "correct_answer": "B",
    "explanation": "Trung du và miền núi Bắc Bộ sở hữu bể than đá Quảng Ninh lớn nhất Đông Nam Á, đồng thời địa hình đồi núi dốc cắt xẻ mạnh tạo điều kiện cho các nhà máy thủy điện lớn hoạt động (như Sơn La, Hòa Bình, Lai Châu)."
  },
  {
    "id": 12,
    "topic_code": "geo-agri-forestry-fish", // Mapped from geo-regions-central (Hầm Thạch)
    "category": "geo-regions-central",
    "prompt": "Khó khăn tự nhiên lớn nhất thường xuyên đe dọa hoạt động sản xuất nông nghiệp và đời sống dân cư vùng Duyên hải miền Trung (Bắc Trung Bộ và Duyên hải Nam Trung Bộ) là gì?",
    "options": [
      "A. Các trận động đất có dư chấn mạnh kèm theo hiện tượng núi lửa phun trào",
      "B. Thời tiết rét đậm rét hại kéo dài suốt cả năm khiến cây trồng không thể phát triển",
      "C. Thiên tai bão, lũ lụt, hạn hán kéo dài và hiện tượng cát bay, cát lấn, hoang mạc hóa",
      "D. Việc thiếu hoàn toàn nguồn nước ngầm và nước mặt do không có hệ thống sông ngòi"
    ],
    "correct_answer": "C",
    "explanation": "Duyên hải miền Trung có địa hình hẹp ngang, dốc ra biển, khí hậu phân hóa mưa lũ dữ dội vào mùa thu đông, nắng nóng khô hạn gay gắt vào mùa hè kèm gió Tây Nam dry-hot, gây ra sạt lở, lũ quét và nạn cát bay tàn phá đồng ruộng ven biển."
  },
  {
    "id": 13,
    "topic_code": "geo-service", // Mapped from geo-regions-south (Hầm Hỏa)
    "category": "geo-regions-south",
    "prompt": "Yếu tố tự nhiên cốt lõi nào giúp Đồng bằng sông Cửu Long trở thành vùng trọng điểm sản xuất lương thực (lúa gạo) và cây ăn quả lớn nhất cả nước?",
    "options": [
      "A. Có địa hình cao nguyên đất đỏ feralit dày, khí hậu lạnh cận ôn đới cực kỳ mát mẻ",
      "B. Diện tích đất phù sa ngọt rộng lớn, nguồn nước ngọt dồi dào từ sông Mê Công và khí hậu cận xích đạo nóng ẩm quanh năm",
      "C. Hệ thống đê sông cao và kiên cố ngăn lũ triệt để, không cho nước lũ tràn vào đồng ruộng",
      "D. Vùng đất có nhiều tuyết rơi vào mùa đông, thích hợp trồng các loại cây ôn đới"
    ],
    "correct_answer": "B",
    "explanation": "Đồng bằng sông Cửu Long được bồi đắp bởi lượng phù sa khổng lồ từ sông Tiền và sông Hậu, nguồn nước tưới dồi dào, kết hợp khí hậu cận xích đạo không có mùa đông lạnh, rất thích hợp cho việc thâm canh lúa nước và trồng cây ăn trái quanh năm."
  },
  {
    "id": 14,
    "topic_code": "geo-population", // Mapped from geo-sea-islands (Hầm Thạch)
    "category": "geo-sea-islands",
    "prompt": "Về mặt quản lý hành chính nhà nước, hai quần đảo Hoàng Sa và Trường Sa thuộc chủ quyền của Việt Nam hiện nay lần lượt trực thuộc các tỉnh, thành phố nào quản lý?",
    "options": [
      "A. Thành phố Hải Phòng và Tỉnh Quảng Ninh",
      "B. Thành phố Đà Nẵng và Tỉnh Khánh Hòa",
      "C. Tỉnh Quảng Nam và Tỉnh Bà Rịa - Vũng Tàu",
      "D. Tỉnh Bình Thuận và Tỉnh Ninh Thuận"
    ],
    "correct_answer": "B",
    "explanation": "Quần đảo Hoàng Sa hiện nay được tổ chức hành chính thành Huyện Hoàng Sa trực thuộc Thành phố Đà Nẵng. Quần đảo Trường Sa được tổ chức hành chính thành Huyện Trường Sa trực thuộc Tỉnh Khánh Hòa."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 14 câu hỏi Gác Cổng Lịch Sử & Địa Lý vào Database ===");
  let importedCount = 0;

  for (const q of HISTORY_GEOGRAPHY_GATEKEEPER_RAW) {
    const id = `history-geography-gatekeeper-topic-${q.category}`; // Unique by category to avoid overwrite
    
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
      tags: ["gatekeeper", "history-geography-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Lịch Sử & Địa Lý 2026',
          'history_geography',
          JSON.stringify(metadata),
          q.topic_code
        ]
      );
      importedCount++;
      console.log(`Đã nạp thành công câu hỏi Gác Cổng cho Category: ${q.category} -> Topic: ${q.topic_code}`);
    } catch (err) {
      console.error(`Lỗi khi nạp câu hỏi cho Category: ${q.category}`, err);
    }
  }

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${HISTORY_GEOGRAPHY_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Lịch Sử & Địa Lý vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
