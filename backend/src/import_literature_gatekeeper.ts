import { pool } from './db.js';

const LITERATURE_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "lit-reading-poetry",
    "topic_name": "Đọc hiểu — Văn bản thơ",
    "zone": "Hầm Băng",
    "question": "Trong các yếu tố sau, yếu tố nào đóng vai trò cốt lõi tạo nên tính nhạc điệu và nhịp điệu đặc trưng của một văn bản thơ?",
    "options": [
      "A. Cốt truyện và hệ thống nhân vật hành động",
      "B. Các số liệu thống kê và dẫn chứng thực tế",
      "C. Vần, nhịp, hệ thống hình ảnh và từ ngữ giàu sức gợi",
      "D. Các luận điểm lý luận sắc bén và chứng cứ khách quan"
    ],
    "correct_answer": "C",
    "explanation": "Thơ là thể loại văn học đặc trưng bởi tính trữ tình và nhạc điệu. Sự kết hợp giữa cách gieo vần, ngắt nhịp (nhịp điệu) cùng các hình ảnh biểu cảm chính là yếu tố cốt lõi tạo nên nhạc tính và chiều sâu cảm xúc cho văn bản thơ."
  },
  {
    "id": 2,
    "topic_code": "lit-reading-prose",
    "topic_name": "Đọc hiểu — Văn bản truyện/kí",
    "zone": "Hầm Băng",
    "question": "Trong văn bản truyện, khái niệm \"ngôi kể thứ ba\" được định nghĩa như thế nào?",
    "options": [
      "A. Người kể chuyện xưng \"tôi\", trực tiếp tham gia và kể lại câu chuyện",
      "B. Người kể chuyện giấu mình, gọi tên các nhân vật bằng tên của chúng và kể lại câu chuyện một cách khách quan",
      "C. Người kể chuyện trực tiếp trò chuyện và hướng về người đọc bằng từ \"bạn\"",
      "D. Người kể chuyện chỉ xuất hiện ở phần mở đầu và kết thúc để giới thiệu nhân vật"
    ],
    "correct_answer": "B",
    "explanation": "Ngôi kể thứ ba là khi người kể chuyện tự giấu mình đi, gọi tên các nhân vật bằng tên gọi của chúng. Cách kể này giúp người kể có thể linh hoạt, tự do kể lại mọi sự việc diễn ra một cách khách quan, bao quát toàn bộ câu chuyện."
  },
  {
    "id": 3,
    "topic_code": "lit-reading-argument",
    "topic_name": "Đọc hiểu — Văn bản nghị luận",
    "zone": "Hầm Băng",
    "question": "Khái niệm \"luận điểm\" trong một văn bản nghị luận được hiểu là gì?",
    "options": [
      "A. Những hình ảnh minh họa sinh động cho nội dung câu chuyện",
      "B. Những ý kiến thể hiện quan điểm, tư tưởng của người viết về vấn đề nghị luận, được trình bày một cách rõ ràng, nhất quán",
      "C. Các số liệu thực tế được thu thập từ các cuộc điều tra xã hội",
      "D. Cảm xúc chủ quan mang tính bộc phát của tác giả trước một hiện tượng"
    ],
    "correct_answer": "B",
    "explanation": "Luận điểm là linh hồn của bài văn nghị luận. Đó là những ý kiến thể hiện quan điểm, tư tưởng của người viết về vấn đề được đưa ra bàn luận. Luận điểm phải chính xác, rõ ràng thì mới có sức thuyết phục người đọc."
  },
  {
    "id": 4,
    "topic_code": "lit-reading-information",
    "topic_name": "Đọc hiểu — Văn bản thông tin",
    "zone": "Hầm Băng",
    "question": "Mục đích cốt lõi của một \"văn bản thông tin\" là gì?",
    "options": [
      "A. Bộc lộ tình cảm, cảm xúc cá nhân của tác giả trước thiên nhiên",
      "B. Xây dựng hình tượng nhân vật hư cấu và cốt truyện kịch tính",
      "C. Cung cấp tri thức khách quan, chính xác về các hiện tượng, sự vật hay vấn đề trong thực tế đời sống",
      "D. Thể hiện các triết lý nghệ thuật sâu sắc bằng ngôn ngữ giàu tính hình tượng"
    ],
    "correct_answer": "C",
    "explanation": "Văn bản thông tin được viết ra với mục đích hàng đầu là truyền tải thông tin, kiến thức khách quan, chính xác và có ích về một hiện tượng tự nhiên, xã hội, khoa học hoặc lịch sử thực tế đến người đọc."
  },
  {
    "id": 5,
    "topic_code": "lit-rhetoric-device",
    "topic_name": "Biện pháp tu từ",
    "zone": "Hầm Hỏa",
    "question": "Biện pháp tu từ nào gọi tên sự vật, hiện tượng này bằng tên sự vật, hiện tượng khác có nét tương đồng (giống nhau) nhằm tăng sức gợi hình, gợi cảm?",
    "options": [
      "A. So sánh",
      "B. Hoán dụ",
      "C. Điệp ngữ",
      "D. Ẩn dụ"
    ],
    "correct_answer": "D",
    "explanation": "Ẩn dụ là biện pháp tu từ dựa trên mối quan hệ tương đồng (giống nhau) giữa hai đối tượng. Khác với So sánh (giữ lại cả vế A và vế B cùng từ so sánh), ẩn dụ lược bỏ vế A chỉ giữ lại vế B, thường được gọi là \"so sánh ngầm\"."
  },
  {
    "id": 6,
    "topic_code": "lit-vietnamese-word-class",
    "topic_name": "Tiếng Việt — Từ loại, Nghĩa của từ",
    "zone": "Hầm Thạch",
    "question": "\"Nghĩa gốc\" (còn gọi là nghĩa đen) của một từ trong tiếng Việt được định nghĩa là gì?",
    "options": [
      "A. Nghĩa được hình thành sau này dựa trên phương thức ẩn dụ hoặc hoán dụ",
      "B. Nghĩa đầu tiên, nguyên thủy của từ, làm cơ sở để từ đó hình thành nên các nghĩa khác",
      "C. Nghĩa chỉ được sử dụng trong các tác phẩm văn chương nghệ thuật",
      "D. Nghĩa tạm thời xuất hiện trong một ngữ cảnh giao tiếp cụ thể"
    ],
    "correct_answer": "B",
    "explanation": "Nghĩa gốc là nghĩa ban đầu, làm điểm xuất phát cho sự phát triển nghĩa của từ. Từ nghĩa gốc này, qua thời gian, con người phát triển thêm các nghĩa chuyển (nghĩa bóng) khác nhau."
  },
  {
    "id": 7,
    "topic_code": "lit-vietnamese-sentence",
    "topic_name": "Tiếng Việt — Câu ghép, Thành phần câu",
    "zone": "Hầm Thạch",
    "question": "Thế nào là một \"câu ghép\" trong tiếng Việt?",
    "options": [
      "A. Câu chỉ có duy nhất một cụm Chủ ngữ - Vị ngữ",
      "B. Câu có hai hoặc nhiều vế câu ghép lại, trong đó mỗi vế câu có cấu trúc Chủ ngữ - Vị ngữ độc lập và biểu thị một ý trọn vẹn",
      "C. Câu chứa nhiều trạng ngữ đứng ở đầu câu",
      "D. Câu rút gọn lược bỏ đi thành phần chủ ngữ hoặc vị ngữ"
    ],
    "correct_answer": "B",
    "explanation": "Câu ghép là câu do nhiều vế câu tạo thành. Mỗi vế câu ghép có cấu tạo giống như một câu đơn (có đủ cụm Chủ - Vị độc lập) và giữa các vế thường có quan hệ ý nghĩa chặt chẽ với nhau."
  },
  {
    "id": 8,
    "topic_code": "lit-vietnamese-cohesion",
    "topic_name": "Tiếng Việt — Phép liên kết, Phép nối",
    "zone": "Hầm Thạch",
    "question": "Trong các phép liên kết câu về mặt hình thức, \"phép thế\" được định nghĩa như thế nào?",
    "options": [
      "A. Sử dụng lặp lại ở câu sau những từ ngữ đã có ở câu trước",
      "B. Sử dụng ở câu sau các từ ngữ đồng nghĩa hoặc cùng trường từ vựng với câu trước",
      "C. Sử dụng ở câu sau các từ ngữ có tác dụng thay thế cho từ ngữ đã xuất hiện ở câu trước nhằm tránh lặp từ",
      "D. Sử dụng các quan hệ từ để nối câu sau với câu trước"
    ],
    "correct_answer": "C",
    "explanation": "Phép thế là việc sử dụng ở câu đi sau những từ ngữ đồng nghĩa hoặc các đại từ (như: họ, nó, hắn, sinh viên ấy, việc đó,...) để thay thế cho những từ ngữ đã dùng ở câu đi trước, vừa tạo tính liên kết vừa tránh lỗi lặp từ."
  },
  {
    "id": 9,
    "topic_code": "lit-poem-analysis",
    "topic_name": "Cảm nhận/Phân tích đoạn thơ (Viết đoạn 200 chữ)",
    "zone": "Hầm Băng",
    "question": "Khi viết một đoạn văn nghị luận (khoảng 200 chữ) cảm nhận hoặc phân tích một đoạn thơ, yêu cầu quan trọng nhất về mặt hình thức trình bày là gì?",
    "options": [
      "A. Phải chia đoạn văn thành 3 phần rõ rệt, mỗi phần xuống dòng thụt đầu dòng",
      "B. Viết liền mạch thành một đoạn văn duy nhất, không xuống dòng giữa chừng từ chữ đầu tiên đến chữ cuối cùng",
      "C. Viết dưới dạng các dòng gạch đầu dòng tóm tắt các ý chính",
      "D. Xen kẽ các tranh ảnh minh họa vào giữa đoạn văn để tăng tính thuyết phục"
    ],
    "correct_answer": "B",
    "explanation": "Yêu cầu tiên quyết về mặt hình thức của một \"đoạn văn\" (kể cả đoạn văn 200 chữ trong phòng thi) là phải viết liền mạch, bắt đầu từ chỗ viết hoa lùi đầu dòng và kết thúc bằng dấu chấm xuống dòng. Tuyệt đối không được xuống dòng ngắt đoạn ở giữa."
  },
  {
    "id": 10,
    "topic_code": "lit-social-essay",
    "topic_name": "Viết bài NLXH (vấn đề đời sống)",
    "zone": "Hầm Băng",
    "question": "Đâu là đối tượng nghị luận chính của một bài văn \"Nghị luận về một hiện tượng đời sống\"?",
    "options": [
      "A. Một tư tưởng đạo lý, quan niệm sống tốt đẹp của con người trong quá khứ",
      "B. Một nhân vật văn học mang tính biểu tượng cao",
      "C. Một sự việc, hiện tượng thực tế đang diễn ra trong đời sống xã hội (có thể mang tính tích cực hoặc tiêu cực)",
      "D. Vẻ đẹp nghệ thuật của một bức tranh hay một bản nhạc cổ điển"
    ],
    "correct_answer": "C",
    "explanation": "Nghị luận về một hiện tượng đời sống hướng tới các sự việc, hiện tượng thực tế, mang tính thời sự và có tác động lớn đến xã hội như: ô nhiễm môi trường, bạo lực học đường, tinh thần tự học, lòng nhân ái trong đại dịch,..."
  },
  {
    "id": 11,
    "topic_code": "lit-literary-essay",
    "topic_name": "Viết NLVH (cảm nhận nhân vật/tác phẩm)",
    "zone": "Hầm Băng",
    "question": "Yêu cầu cốt lõi khi viết bài văn nghị luận văn học về một nhân vật trong tác phẩm truyện là gì?",
    "options": [
      "A. Chỉ cần tóm tắt lại toàn bộ diễn biến cốt truyện từ đầu đến cuối",
      "B. Phân tích, đánh giá các đặc điểm tính cách, phẩm chất, số phận của nhân vật dựa trên các chi tiết nghệ thuật (hành động, lời nói, nội tâm) trong tác phẩm",
      "C. Kể lại một câu chuyện sáng tạo mới về nhân vật đó theo trí tưởng tượng của người viết",
      "D. So sánh tiểu sử cuộc đời của tác giả với cuộc đời của nhân vật"
    ],
    "correct_answer": "B",
    "explanation": "Nghị luận về nhân vật văn học yêu cầu người viết không chỉ kể lại đơn thuần, mà phải phân tích và đưa ra đánh giá về tính cách, phẩm chất, số phận của nhân vật thông qua các chi tiết nghệ thuật mà nhà văn xây dựng trong tác phẩm."
  },
  {
    "id": 12,
    "topic_code": "lit-text-genre",
    "topic_name": "Nhận biết thể loại văn bản",
    "zone": "Hầm Hỏa",
    "question": "Thể loại văn học nào thường tập trung tái hiện một lát cắt cuộc sống, có dung lượng ngắn, ít nhân vật và sự kiện nhưng mang tính cô đọng và hàm súc cao?",
    "options": [
      "A. Tiểu thuyết dã sử",
      "B. Truyện ngắn",
      "C. Kịch bản văn học",
      "D. Sử thi đồ sộ"
    ],
    "correct_answer": "B",
    "explanation": "Truyện ngắn là thể loại tự sự cỡ nhỏ, tập trung phản ánh một khoảnh khắc, một tình huống tiêu biểu hay một lát cắt giàu ý nghĩa của cuộc sống với quy mô nhân vật và sự kiện được thu nhỏ, cô đọng."
  },
  {
    "id": 13,
    "topic_code": "lit-work-knowledge",
    "topic_name": "Kiến thức tác giả-tác phẩm lớp 9",
    "zone": "Hầm Hỏa",
    "question": "Truyện ngắn \"Lặng lẽ Sa Pa\" của nhà văn Nguyễn Thành Long được viết trong hoàn cảnh nào?",
    "options": [
      "A. Trong thời kỳ kháng chiến chống thực dân Pháp xâm lược",
      "B. Kết quả của chuyến đi thực tế Lào Cai năm 1970, trong công cuộc xây dựng chủ nghĩa xã hội ở miền Bắc",
      "C. Sau khi đất nước hoàn toàn thống nhất cả hai miền Nam - Bắc năm 1975",
      "D. Trong thời kỳ đổi mới kinh tế đất nước những năm 1986"
    ],
    "correct_answer": "B",
    "explanation": "Truyện ngắn \"Lặng lẽ Sa Pa\" là kết quả từ chuyến đi thực tế lên Lào Cai mùa hè năm 1970 của Nguyễn Thành Long. Tác phẩm khắc họa vẻ đẹp của những con người lao động thầm lặng cống hiến cho đất nước trong công cuộc xây dựng chủ nghĩa xã hội ở miền Bắc."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 13 câu hỏi Gác Cổng Ngữ Văn vào Database ===");
  let importedCount = 0;

  for (const q of LITERATURE_GATEKEEPER_RAW) {
    const id = `literature-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "literature-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Ngữ Văn 2026',
          'literature',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${LITERATURE_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Ngữ Văn vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
