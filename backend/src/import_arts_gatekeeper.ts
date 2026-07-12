import { pool } from './db.js';

const ARTS_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "art-music-theory",
    "topic_name": "Âm nhạc — Lí thuyết: Quãng, Hợp âm, Nhịp, Tiết tấu",
    "zone": "Hầm Thạch",
    "question": "Trong nhạc lý cơ bản, \"hợp âm ba\" (Triad) được cấu tạo từ bao nhiêu âm thanh và các âm đó cách nhau theo quãng mấy?",
    "options": [
      "A. Gồm 2 âm thanh, xếp chồng lên nhau theo quãng 2",
      "B. Gồm 3 âm thanh, xếp chồng lên nhau theo quãng 3",
      "C. Gồm 4 âm thanh, xếp chồng lên nhau theo quãng 4",
      "D. Gồm 5 âm thanh, xếp chồng lên nhau theo quãng 5"
    ],
    "correct_answer": "B",
    "explanation": "Hợp âm ba (Triad) là hợp âm được cấu tạo từ 3 âm thanh khác nhau, các âm này được xếp chồng lên nhau theo những quãng 3 tính từ âm nền (âm gốc)."
  },
  {
    "id": 2,
    "topic_code": "art-music-composers",
    "topic_name": "Âm nhạc — Thường thức: Nhạc sĩ tiêu biểu VN & Thế giới",
    "zone": "Hầm Hỏa",
    "question": "Nhạc sĩ nào sau đây là tác giả của ca khúc \"Tiến quân ca\" - tác phẩm được chọn làm Quốc ca chính thức của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam?",
    "options": [
      "A. Nhạc sĩ Phạm Tuyên",
      "B. Nhạc sĩ Văn Cao",
      "C. Nhạc sĩ Trịnh Công Sơn",
      "D. Nhạc sĩ Đỗ Nhuận"
    ],
    "correct_answer": "B",
    "explanation": "Nhạc sĩ Văn Cao (1923 - 1995) là một trong những cây đại thụ của nền tân nhạc Việt Nam. Ông sáng tác bài \"Tiến quân ca\" vào năm 1944 tại Hà Nội và tác phẩm đã được chọn làm Quốc ca Việt Nam từ năm 1946."
  },
  {
    "id": 3,
    "topic_code": "art-music-listening",
    "topic_name": "Âm nhạc — Nghe và nhận biết tác phẩm",
    "zone": "Hầm Hỏa",
    "question": "Khi nghe một bản nhạc hành khúc (March), nhịp điệu thường có đặc trưng nào nổi bật nhất giúp người nghe dễ dàng bước đều theo nhạc?",
    "options": [
      "A. Nhịp điệu chậm rãi, bay bổng theo nhịp 3/4 của điệu Valse quý tộc",
      "B. Nhịp điệu nhanh, mạnh mẽ, dứt khoát, thường viết ở nhịp 2/4 hoặc 4/4 với tiết tấu rõ ràng, đều đặn như bước chân quân hành",
      "C. Nhịp điệu tự do, không có phách mạnh phách nhẹ cố định",
      "D. Nhịp điệu êm dịu, nhẹ nhàng, du dương dùng để hát ru"
    ],
    "correct_answer": "B",
    "explanation": "Hành khúc là thể loại nhạc có nguồn gốc quân sự. Điểm đặc trưng nhất của hành khúc là nhịp điệu dứt khoát, mạnh mẽ, thường ở nhịp 2/4 hoặc 4/4 giúp giữ nhịp chân đều đặn khi di chuyển tập thể."
  },
  {
    "id": 4,
    "topic_code": "art-visual-figure",
    "topic_name": "Mĩ thuật tạo hình — Kí họa dáng người, Nhân vật & Sân khấu",
    "zone": "Hầm Băng",
    "question": "Trong nghệ thuật hội họa, hoạt động \"kí họa dáng người\" có đặc điểm cốt lõi nào sau đây để phân biệt với vẽ tranh chân dung tả thực lâu dài?",
    "options": [
      "A. Vẽ thật chậm, tô màu tỉ mỉ từng chi tiết hoa văn trên trang phục của nhân vật",
      "B. Vẽ nhanh bằng nét vẽ giản lược để kịp thời ghi lại dáng điệu, tư thế động tác và tỉ lệ đặc trưng của cơ thể người trong thực tế",
      "C. Chỉ tập trung vẽ đôi mắt của nhân vật và bỏ qua hoàn toàn các phần cơ thể còn lại",
      "D. Bắt buộc phải sử dụng phần mềm đồ họa 3D máy tính để dựng hình"
    ],
    "correct_answer": "B",
    "explanation": "Kí họa là hình thức vẽ nhanh, vẽ phác thảo. Mục đích cốt lõi của kí họa dáng người là dùng các nét vẽ tinh giản để nắm bắt nhanh tư thế, chuyển động và tỷ lệ cơ thể người trong một khoảnh khắc ngắn."
  },
  {
    "id": 5,
    "topic_code": "art-visual-apply",
    "topic_name": "Mĩ thuật ứng dụng — Thiết kế thời trang, Nhận diện thương hiệu",
    "zone": "Hầm Hỏa",
    "question": "Trong thiết kế mĩ thuật ứng dụng, yếu tố \"Logo\" (Biểu trưng) đóng vai trò quan trọng hàng đầu nào trong hệ thống nhận diện thương hiệu của một cơ quan hoặc doanh nghiệp?",
    "options": [
      "A. Là bài giới thiệu chi tiết về tiểu sử và quá trình thành lập doanh nghiệp",
      "B. Là biểu trưng trực quan cô đọng giúp công chúng dễ dàng nhận biết, ghi nhớ và phân biệt thương hiệu đó với các thương hiệu khác",
      "C. Là danh sách bảng lương và thông tin nội bộ của các nhân viên",
      "D. Là bản thiết kế trang phục bảo hộ lao động cho công nhân nhà máy"
    ],
    "correct_answer": "B",
    "explanation": "Logo là phần tử đồ họa đại diện trực quan nhất cho một thương hiệu. Vai trò chính của nó là tăng độ nhận diện, định vị giá trị của doanh nghiệp và giúp khách hàng dễ dàng ghi nhớ, phân biệt với đối thủ cạnh tranh."
  },
  {
    "id": 6,
    "topic_code": "art-visual-history",
    "topic_name": "Mĩ thuật thường thức — Nghệ thuật Đương đại VN & Thế giới",
    "zone": "Hầm Thạch",
    "question": "Xu hướng nổi bật nhất giúp phân biệt \"Nghệ thuật Đương đại\" (Contemporary Art) với các trào lưu nghệ thuật cổ điển truyền thống là gì?",
    "options": [
      "A. Chỉ được phép sử dụng chất liệu sơn dầu truyền thống vẽ trên vải bố",
      "B. Sự phá bỏ ranh giới về chất liệu, kết hợp nhiều hình thức thể hiện (như sắp đặt, trình diễn, video art, nghệ thuật số) và phản ánh trực tiếp các vấn đề của đời sống xã hội ngày nay",
      "C. Bắt buộc phải sao chép lại chính xác các tác phẩm từ thời Phục hưng châu Âu",
      "D. Hạn chế tối đa việc biểu đạt tư tưởng cá nhân hay cái tôi sáng tạo của người nghệ sĩ"
    ],
    "correct_answer": "B",
    "explanation": "Nghệ thuật đương đại (khoảng cuối thế kỷ XX đến nay) phản ánh các vấn đề đa chiều của thế giới ngày nay. Điểm độc đáo của nó là không bị giới hạn bởi chất liệu truyền thống, mà có sự giao thoa mạnh mẽ giữa công nghệ, nghệ thuật sắp đặt, trình diễn nhằm kích thích tư duy người xem."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 6 câu hỏi Gác Cổng Nghệ Thuật vào Database ===");
  let importedCount = 0;

  for (const q of ARTS_GATEKEEPER_RAW) {
    const id = `arts-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "arts-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Nghệ Thuật 2026',
          'arts',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${ARTS_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Nghệ Thuật vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
