import { pool } from './db.js';

const INFORMATICS_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "inf-digital-world",
    "topic_name": "Máy tính và cộng đồng (Chủ đề A)",
    "zone": "Hầm Hỏa",
    "question": "Khái niệm \"Điện toán đám mây\" (Cloud Computing) được định nghĩa chính xác nhất là gì trong bối cảnh kết nối mạng hiện nay?",
    "options": [
      "A. Việc lưu trữ dữ liệu hoàn toàn thủ công trên các thiết bị phần cứng rời như đĩa mềm hoặc băng từ ngoại tuyến",
      "B. Mô hình cung cấp các tài nguyên máy tính (lưu trữ, phần mềm, xử lí dữ liệu...) dưới dạng dịch vụ qua Internet, cho phép người dùng truy cập mọi lúc mọi nơi",
      "C. Hệ thống mạng cục bộ (LAN) chỉ kết nối các máy tính trong một văn phòng nhỏ không cần kết nối với Internet toàn cầu",
      "D. Việc sử dụng các phần mềm văn phòng cài đặt cục bộ trên máy tính cá nhân để soạn thảo văn bản và in ấn"
    ],
    "correct_answer": "B",
    "explanation": "Điện toán đám mây là mô hình cung cấp các tài nguyên ảo hóa (máy chủ, kho lưu trữ, cơ sở dữ liệu, mạng, phần mềm...) thông qua môi trường Internet. Người dùng có thể sử dụng và thanh toán dựa trên nhu cầu thực tế mà không cần đầu tư, vận hành hệ thống phần cứng vật lý cồng kềnh tại cơ sở."
  },
  {
    "id": 2,
    "topic_code": "inf-data-manage",
    "topic_name": "Tổ chức lưu trữ, tìm kiếm, trao đổi thông tin (Chủ đề C)",
    "zone": "Hầm Thạch",
    "question": "Khi tìm kiếm thông tin trên Internet bằng công cụ Google Search, nếu muốn tìm chính xác một cụm từ cụ thể theo đúng thứ tự các từ (ví dụ: Tin học lớp 9), bạn nên sử dụng ký hiệu bổ trợ nào sau đây?",
    "options": [
      "A. Đặt toàn bộ cụm từ tìm kiếm bên trong cặp dấu ngoặc kép (ví dụ: \"Tin học lớp 9\")",
      "B. Sử dụng từ khóa loại trừ bằng dấu gạch ngang (ví dụ: -Tin học lớp 9)",
      "C. Đặt từ khóa lựa chọn thế bằng dấu gạch ngang (ví dụ: Tin học OR lớp 9)",
      "D. Đặt cụm từ tìm kiếm bên trong cặp dấu ngoặc vuông (ví dụ: [Tin học lớp 9])"
    ],
    "correct_answer": "A",
    "explanation": "Đặt từ khóa hoặc cụm từ tìm kiếm trong cặp dấu ngoặc kép \"...\" là cú pháp bắt buộc công cụ tìm kiếm phải hiển thị những kết quả chứa chính xác cụm từ đó theo đúng thứ tự sắp đặt, tránh trường hợp các từ bị phân tách rải rác trong bài viết."
  },
  {
    "id": 3,
    "topic_code": "inf-ethics-law",
    "topic_name": "Đạo đức, pháp luật và văn hoá trong môi trường số (Chủ đề D)",
    "zone": "Hầm Thạch",
    "question": "Hành vi nào sau đây vi phạm nghiêm trọng luật pháp và đạo đức khi hoạt động trong môi trường số?",
    "options": [
      "A. Tải và tham khảo các tài liệu học tập miễn phí được tác giả chia sẻ công khai trên trang cá nhân của họ",
      "B. Tự ý sử dụng hình ảnh, bài viết hoặc phần mềm của người khác mà không xin phép, rồi nhận là tác phẩm do mình làm ra để trục lợi cá nhân",
      "C. Đăng ký tham gia các khóa học trực tuyến chính thống để phát triển năng lực bản thân",
      "D. Đóng góp ý kiến thảo luận văn minh, lịch sự dưới các bài viết học tập trên diễn đàn trường học"
    ],
    "correct_answer": "B",
    "explanation": "Việc sử dụng tài sản trí tuệ của người khác (bài viết, mã nguồn, hình ảnh, âm nhạc...) khi chưa có sự đồng ý của chủ sở hữu bản quyền, kết hợp với hành vi mạo nhận tác giả (đạo văn, vi phạm bản quyền) để trục lợi là hành vi vi phạm nghiêm trọng Luật Sở hữu trí tuệ và đạo đức số."
  },
  {
    "id": 4,
    "topic_code": "inf-digital-tools",
    "topic_name": "Ứng dụng tin học: Bảng tính, Trình chiếu, Biên tập video (Chủ đề E)",
    "zone": "Hầm Hỏa",
    "question": "Trong phần mềm bảng tính Excel, nếu ô A₁ chứa giá trị số 10, ô A₂ chứa giá trị số 20 và tại ô A₃ ta nhập công thức: =AVERAGE(A₁, A₂) thì kết quả hiển thị thu được tại ô A₃ là bao nhiêu?",
    "options": [
      "A. 30",
      "B. 10",
      "C. 15",
      "D. 200"
    ],
    "correct_answer": "C",
    "explanation": "Hàm AVERAGE là hàm tính trung bình cộng của các đối số truyền vào. Trung bình cộng của hai ô dữ liệu A₁ (10) và A₂ (20) được tính bằng công thức: (10 + 20) / 2 = 15."
  },
  {
    "id": 5,
    "topic_code": "inf-algorithm",
    "topic_name": "Giải quyết vấn đề với máy tính: Thuật toán, Lập trình (Chủ đề F)",
    "zone": "Hầm Băng",
    "question": "Trong ngôn ngữ lập trình Python, đoạn mã lệnh sau đây sẽ in ra màn hình kết quả bằng bao nhiêu?\n\ns = 0\nfor i in range(1, 4):\n    s = s + i\nprint(s)",
    "options": [
      "A. 3",
      "B. 6",
      "C. 10",
      "D. 0"
    ],
    "correct_answer": "B",
    "explanation": "Hàm range(1, 4) trong Python tạo ra dãy số nguyên liên tiếp bắt đầu từ 1 đến sát 4 (gồm các số: 1, 2, 3). Vòng lặp 'for' sẽ lần lượt duyệt qua từng số và cộng dồn vào biến s:\n- Lượt 1: i = 1 => s = 0 + 1 = 1\n- Lượt 2: i = 2 => s = 1 + 2 = 3\n- Lượt 3: i = 3 => s = 3 + 3 = 6\nKết thúc vòng lặp, lệnh print(s) sẽ in ra giá trị cuối cùng của s là 6."
  },
  {
    "id": 6,
    "topic_code": "inf-career",
    "topic_name": "Hướng nghiệp với tin học (Chủ đề G)",
    "zone": "Hầm Hỏa",
    "question": "Nhóm nghề nghiệp nào sau đây đòi hỏi kiến thức chuyên sâu về công nghệ thông tin và lập trình để thực hiện thiết kế, xây dựng và nâng cấp các ứng dụng phần mềm hoặc trang web phục vụ xã hội?",
    "options": [
      "A. Chuyên viên thiết kế thời trang và dệt may thủ công truyền thống",
      "B. Nhà phát triển phần mềm (Lập trình viên, Kỹ sư phần mềm)",
      "C. Nhân viên tư vấn bất động sản và môi giới tài chính",
      "D. Hướng dẫn viên du lịch và quản lý nhà hàng khách sạn"
    ],
    "correct_answer": "B",
    "explanation": "Nhà phát triển phần mềm (Software Developer/Programmer) là lực lượng nòng cốt trong lĩnh vực CNTT, chịu trách nhiệm viết mã (coding), kiểm thử hệ thống và triển khai các giải pháp công nghệ số như app di động, hệ thống quản trị dữ liệu hay các trang web thương mại."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 6 câu hỏi Gác Cổng Tin Học vào Database ===");
  let importedCount = 0;

  for (const q of INFORMATICS_GATEKEEPER_RAW) {
    const id = `informatics-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "informatics-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Tin Học 2026',
          'informatics',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${INFORMATICS_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Tin Học vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
