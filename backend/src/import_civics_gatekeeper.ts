import { pool } from './db.js';

const CIVICS_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "civ-ideal-life",
    "topic_name": "Sống có lí tưởng",
    "zone": "Hầm Hỏa",
    "question": "Ý kiến nào sau đây phản ánh chính xác nhất về khái niệm \"sống có lý tưởng\" của thế hệ trẻ ngày nay?",
    "options": [
      "A. Chỉ sống vì lợi ích và sự hưởng thụ của cá nhân mình mà không quan tâm đến người khác",
      "B. Luôn xác định được mục đích sống cao đẹp, phấn đấu vì lợi ích chung của bản thân, gia đình và toàn xã hội",
      "C. Sống an nhàn, phó mặc mọi việc cho hoàn cảnh quyết định và không cần cố gắng phấn đấu",
      "D. Luôn chạy theo những xu hướng nhất thời trên mạng xã hội để nhanh chóng khẳng định bản thân"
    ],
    "correct_answer": "B",
    "explanation": "Sống có lý tưởng là luôn xác định được mục đích sống cao đẹp, đúng đắn; có kế hoạch hành động cụ thể để hoàn thiện bản thân, cống hiến cho xã hội và đóng góp vào sự phát triển chung của quê hương đất nước."
  },
  {
    "id": 2,
    "topic_code": "civ-tolerance",
    "topic_name": "Khoan dung",
    "zone": "Hầm Hỏa",
    "question": "Trong đời sống xã hội, thái độ \"khoan dung\" được thể hiện thông qua biểu hiện nào sau đây?",
    "options": [
      "A. Rộng lòng tha thứ, biết tôn trọng và thông cảm cho lỗi lầm của người khác, đồng thời giúp đỡ họ sửa sai",
      "B. Đồng tình và bao che cho mọi hành vi sai phạm, vi phạm pháp luật của bạn bè thân thiết",
      "C. Thờ ơ, vô cảm trước những khó khăn, hoạn nạn hay mâu thuẫn của người xung quanh",
      "D. Chấp nhận nhường nhịn vô điều kiện ngay cả khi bản thân bị chèn ép, đối xử bất công"
    ],
    "correct_answer": "A",
    "explanation": "Khoan dung là rộng lòng tha thứ, biết thông cảm và chia sẻ với người khác, không chấp nhặt hay định kiến đối với lỗi lầm nhỏ, đồng thời biết tôn trọng sự khác biệt để cùng nhau hướng tới những điều tốt đẹp hơn."
  },
  {
    "id": 3,
    "topic_code": "civ-community",
    "topic_name": "Tích cực tham gia các hoạt động cộng đồng",
    "zone": "Hầm Hỏa",
    "question": "Hành động nào dưới đây thể hiện tinh thần tích cực, tự giác tham gia các hoạt động cộng đồng?",
    "options": [
      "A. Chỉ tham gia khi bị thầy cô giáo bắt buộc hoặc có tên trong danh sách thi đua",
      "B. Chủ động đề xuất ý kiến dọn dẹp vệ sinh khu phố và cùng bạn bè hăng hái thực hiện vào ngày cuối tuần",
      "C. Đóng góp tiền bạc thay thế cho việc tham gia trực tiếp mọi công việc lao động chung tại địa phương",
      "D. Chỉ chụp ảnh đăng mạng xã hội tỏ vẻ tích cực rồi rời đi ngay khi hoạt động vừa bắt đầu"
    ],
    "correct_answer": "B",
    "explanation": "Tích cực tham gia hoạt động cộng đồng thể hiện qua tinh thần tự giác, chủ động đóng góp công sức, thời gian và trí tuệ cho các hoạt động ích nước lợi nhà tại địa phương hoặc trường lớp mà không cần nhắc nhở hay ép buộc."
  },
  {
    "id": 4,
    "topic_code": "civ-fairness",
    "topic_name": "Khách quan và công bằng",
    "zone": "Hầm Thạch",
    "question": "Thế nào là một người có lối sống \"khách quan và công bằng\" trong giao tiếp và công việc hàng ngày?",
    "options": [
      "A. Đánh giá mọi sự việc dựa hoàn toàn trên cảm xúc yêu ghét cá nhân và luôn ưu tiên lợi ích của người thân",
      "B. Luôn đứng về phía số đông trong các cuộc tranh luận mà không cần kiểm chứng đúng sai thực tế",
      "C. Đánh giá sự việc dựa trên sự thật, đối xử bình đẳng và tôn trọng lẽ phải, không thiên vị vì lợi ích riêng",
      "D. Chọn cách im lặng trước mọi hành vi sai trái của người khác để giữ sự hòa hảo tối đa"
    ],
    "correct_answer": "C",
    "explanation": "Khách quan và công bằng là biết tôn trọng sự thật khách quan, nhận xét đánh giá mọi việc một cách vô tư, không thiên vị, luôn hành xử bình đẳng dựa trên các tiêu chuẩn đạo đức và pháp luật chung chứ không vì tình cảm riêng hay lợi ích cá nhân."
  },
  {
    "id": 5,
    "topic_code": "civ-peace",
    "topic_name": "Bảo vệ hoà bình",
    "zone": "Hầm Thạch",
    "question": "Hành động nào sau đây thể hiện rõ ràng tinh thần \"bảo vệ hòa bình\" ngay trong đời sống hàng ngày của học sinh?",
    "options": [
      "A. Sẵn sàng sử dụng vũ lực hoặc đe dọa để giải quyết nhanh chóng các xích mích cá nhân",
      "B. Biết tôn trọng sự khác biệt, luôn giải quyết các bất đồng và mâu thuẫn bằng đàm phán, thương lượng ôn hòa",
      "C. Thờ ơ, bỏ qua mọi xung đột và bạo lực học đường xảy ra ngay trước mắt mình",
      "D. Chia sẻ những thông tin kích động bạo lực và chia rẽ bè phái giữa các lớp"
    ],
    "correct_answer": "B",
    "explanation": "Bảo vệ hòa bình không chỉ là chống chiến tranh xâm lược mà còn được thể hiện qua lối sống nhân ái, hữu nghị, hợp tác, tôn trọng quyền bình đẳng của người khác và giải quyết mọi mâu thuẫn bằng con đường thương lượng ôn hòa."
  },
  {
    "id": 6,
    "topic_code": "civ-time-management",
    "topic_name": "Quản lí thời gian hiệu quả",
    "zone": "Hầm Hỏa",
    "question": "Đâu là biểu hiện rõ nét nhất của người biết cách \"quản lý thời gian hiệu quả\"?",
    "options": [
      "A. Luôn dồn toàn bộ công việc vào phút chót để làm một thể dưới áp lực cao",
      "B. Lập kế hoạch cụ thể, phân bổ thời gian hợp lý cho từng nhiệm vụ theo thứ tự ưu tiên và tự giác hoàn thành",
      "C. Dành trọn vẹn 24 giờ trong ngày để học tập và làm việc mà không cần dành thời gian nghỉ ngơi, thư giãn",
      "D. Thực hiện nhiều công việc cùng một lúc một cách ngẫu hứng dù hiệu suất mang lại không cao"
    ],
    "correct_answer": "B",
    "explanation": "Quản lý thời gian hiệu quả là việc lập kế hoạch chi tiết, sắp xếp công việc theo thứ tự ưu tiên từ quan trọng nhất đến ít quan trọng nhất, từ đó phân bổ thời gian hợp lý giúp nâng cao năng suất và giữ cân bằng cho cuộc sống."
  },
  {
    "id": 7,
    "topic_code": "civ-adaptability",
    "topic_name": "Thích ứng với thay đổi",
    "zone": "Hầm Hỏa",
    "question": "Khi phải đối mặt với một sự thay đổi lớn trong cuộc sống (ví dụ chuyển sang một ngôi trường mới), thái độ thích ứng tốt nhất là gì?",
    "options": [
      "A. Luôn lo sợ, chán nản và từ chối tham gia giao lưu với các thành viên trong tập thể mới",
      "B. Giữ nguyên toàn bộ thói quen và phương pháp cũ dù chúng không còn đem lại hiệu quả trong môi trường mới",
      "C. Chủ động tìm hiểu môi trường mới, cởi mở giao tiếp và linh hoạt điều chỉnh phương pháp học tập, sinh hoạt phù hợp",
      "D. Đòi hỏi tập thể mới phải tự thay đổi mọi quy định để chiều theo thói quen cũ của bản thân"
    ],
    "correct_answer": "C",
    "explanation": "Thích ứng với thay đổi là khả năng nhìn nhận biến động dưới góc độ tích cực, chủ động tìm tòi, cởi mở học hỏi để thích nghi nhanh chóng và phát triển tốt nhất trong môi trường sống và học tập mới."
  },
  {
    "id": 8,
    "topic_code": "civ-smart-consumer",
    "topic_name": "Tiêu dùng thông minh",
    "zone": "Hầm Hỏa",
    "question": "Để trở thành một \"người tiêu dùng thông minh\", bạn nên thực hiện hành vi nào sau đây trước khi mua sắm?",
    "options": [
      "A. Mua sắm theo trào lưu số đông hoặc mua thật nhiều đồ giảm giá tích trữ dù không có nhu cầu sử dụng thực tế",
      "B. Ưu tiên chọn mua các mặt hàng đắt đỏ nhất để thể hiện phong cách và đẳng cấp của bản thân",
      "C. Đánh giá kỹ nhu cầu thực tế, so sánh chất lượng, nguồn gốc xuất xứ, giá cả và cân đối với khả năng tài chính cá nhân",
      "D. Chỉ mua những sản phẩm rẻ nhất trên thị trường mà không cần quan tâm đến chất lượng hay độ an toàn"
    ],
    "correct_answer": "C",
    "explanation": "Tiêu dùng thông minh đòi hỏi việc đưa ra quyết định mua sắm hợp lý dựa trên nhu cầu thực tế và tài chính cá nhân, lựa chọn sản phẩm an toàn, có xuất xứ rõ ràng, tiết kiệm năng lượng và hướng đến tiêu dùng xanh bền vững."
  },
  {
    "id": 9,
    "topic_code": "civ-law-violation",
    "topic_name": "Vi phạm pháp luật và trách nhiệm pháp lí",
    "zone": "Hầm Băng",
    "question": "Theo quy định pháp luật Việt Nam, một hành vi chỉ bị coi là \"vi phạm pháp luật\" khi hội tụ đầy đủ những yếu tố nào sau đây?",
    "options": [
      "A. Là hành vi trái pháp luật, có lỗi, do người có năng lực trách nhiệm pháp lý thực hiện, xâm hại tới các quan hệ xã hội được pháp luật bảo vệ",
      "B. Là những suy nghĩ, ý đồ xấu trong tâm trí của một cá nhân nhưng chưa được bộc lộ ra hành động cụ thể",
      "C. Là bất kỳ hành vi nào đi ngược lại với thuần phong mỹ tục, phong tục tập quán lâu đời của một dòng họ",
      "D. Là hành vi vô ý gây thiệt hại cho người khác nhưng do một em bé 5 tuổi nghịch ngợm gây ra"
    ],
    "correct_answer": "A",
    "explanation": "Hành vi vi phạm pháp luật phải có đủ 4 yếu tố: phải là hành vi thực tế (hành động hoặc không hành động) trái pháp luật; có lỗi của chủ thể; do người có năng lực trách nhiệm pháp lý thực hiện; và xâm hại tới các quan hệ xã hội được pháp luật bảo vệ."
  },
  {
    "id": 10,
    "topic_code": "civ-business-tax",
    "topic_name": "Quyền tự do kinh doanh và nghĩa vụ nộp thuế",
    "zone": "Hầm Băng",
    "question": "Nhận định nào dưới đây phản ánh chính xác nhất về mối quan hệ giữa \"quyền tự do kinh doanh\" và \"nghĩa vụ nộp thuế\" của công dân?",
    "options": [
      "A. Công dân có quyền tự do kinh doanh mọi mặt hàng mà mình muốn mà không chịu bất cứ sự quản lý nào từ Nhà nước",
      "B. Quyền tự do kinh doanh đi liền với nghĩa vụ nộp thuế đầy đủ và tuân thủ các quy định quản lý của Nhà nước",
      "C. Chỉ những tập đoàn kinh tế lớn mới phải nộp thuế, còn các cá nhân kinh doanh nhỏ lẻ thì được miễn trừ hoàn toàn",
      "D. Nộp thuế là việc làm hoàn toàn tự nguyện của cơ sở kinh doanh, Nhà nước không có quyền bắt buộc"
    ],
    "correct_answer": "B",
    "explanation": "Mọi công dân có quyền tự do lựa chọn ngành nghề, hình thức kinh doanh theo đúng pháp luật (không kinh doanh hàng cấm). Đi liền với quyền lợi đó, công dân kinh doanh có nghĩa vụ nộp thuế đầy đủ cho Nhà nước để đóng góp xây dựng đất nước."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 10 câu hỏi Gác Cổng Giáo Dục Công Dân vào Database ===");
  let importedCount = 0;

  for (const q of CIVICS_GATEKEEPER_RAW) {
    const id = `civics-gatekeeper-topic-${q.topic_code}`;
    
    // Tìm đáp án chính xác từ mảng options
    const correctOpt = q.options.find(opt => opt.trim().startsWith(q.correct_answer));
    if (!correctOpt) {
      console.error(`Không tìm thấy đáp án khớp cho chữ cái "${q.correct_answer}" trong câu hỏi ID ${q.topic_code}`);
      continue;
    }
    const correctAnswersArray = [correctOpt];

    const metadata = {
      isStandard: true,
      isGatekeeper: true,
      answerMode: "single-choice",
      tags: ["gatekeeper", "civics-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Giáo Dục Công Dân 2026',
          'civics',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${CIVICS_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Giáo Dục Công Dân vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
