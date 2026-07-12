import { pool } from './db.js';

const TECHNOLOGY_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "tech-career-jobs",
    "topic_name": "Nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ",
    "zone": "Hầm Hỏa",
    "question": "Khái niệm \"nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ\" chủ yếu chỉ nhóm nghề nào sau đây?",
    "options": [
      "A. Nhóm nghề liên quan đến nghiên cứu lý thuyết khoa học xã hội và nhân văn",
      "B. Nhóm nghề trực tiếp áp dụng các nguyên lí khoa học, toán học để thiết kế, chế tạo, vận hành các hệ thống, máy móc và công trình",
      "C. Nhóm nghề chuyên về sáng tác nghệ thuật hội họa và biểu diễn âm nhạc sân khấu",
      "D. Nhóm nghề quản lí tài chính, kế toán ngân hàng và đầu tư chứng khoán"
    ],
    "correct_answer": "B",
    "explanation": "Nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ tập trung vào việc áp dụng các kiến thức toán học và khoa học tự nhiên vào thực tiễn để thiết kế, chế tạo, xây dựng, vận hành và bảo trì các sản phẩm, hệ thống, quy trình kĩ thuật phục vụ đời sống và sản xuất."
  },
  {
    "id": 2,
    "topic_code": "tech-career-education",
    "topic_name": "Giáo dục kĩ thuật, công nghệ trong hệ thống GDQD",
    "zone": "Hầm Thạch",
    "question": "Trong hệ thống giáo dục quốc dân Việt Nam hiện nay, học sinh tốt nghiệp Trung học cơ sở (lớp 9) có thể theo học tiếp các ngành kĩ thuật, công nghệ thông qua luồng đào tạo nào sau đây để sớm gia nhập thị trường lao động?",
    "options": [
      "A. Chỉ được phép tự học ở nhà hoặc đi làm tự do không qua đào tạo",
      "B. Đăng kí vào học tại các trường trung cấp nghề hoặc cao đẳng (hệ đào tạo kết hợp văn hóa và nghề)",
      "C. Bắt buộc phải hoàn thành bậc Đại học thì mới được học nghề kĩ thuật",
      "D. Chỉ có con đường duy nhất là học trường Trung học phổ thông chuyên ban xã hội"
    ],
    "correct_answer": "B",
    "explanation": "Sau khi tốt nghiệp THCS, học sinh có thể thực hiện phân luồng bằng cách rẽ sang con đường học nghề tại các trường trung cấp hoặc trường cao đẳng có hệ đào tạo song hành (học văn hóa kết hợp học nghề), giúp các em sớm trang bị kĩ năng nghề nghiệp thực tế để lập nghiệp."
  },
  {
    "id": 3,
    "topic_code": "tech-career-market",
    "topic_name": "Thị trường lao động kĩ thuật, công nghệ tại Việt Nam",
    "zone": "Hầm Hỏa",
    "question": "Xu hướng phát triển nổi bật nhất của thị trường lao động trong lĩnh vực kĩ thuật và công nghệ tại Việt Nam thời kì Cách mạng công nghiệp lần thứ tư (4.0) là gì?",
    "options": [
      "A. Giảm dần nhu cầu tuyển dụng các vị trí lao động có trình độ chuyên môn cao",
      "B. Ưu tiên tuyển dụng lao động thủ công truyền thống không cần sử dụng máy tính",
      "C. Nhu cầu tuyển dụng tăng mạnh ở các nhóm ngành tự động hóa, công nghệ thông tin, trí tuệ nhân tạo và kĩ thuật số",
      "D. Đóng cửa hoàn toàn thị trường lao động trong nước đối với các tập đoàn công nghệ nước ngoài"
    ],
    "correct_answer": "C",
    "explanation": "Dưới tác động của cuộc cách mạng 4.0, thị trường lao động Việt Nam đang chuyển dịch mạnh mẽ theo hướng công nghệ hóa. Nhu cầu nhân lực chất lượng cao trong các ngành như công nghệ thông tin, tự động hóa, điện tử viễn thông, robot và trí tuệ nhân tạo tăng vượt trội."
  },
  {
    "id": 4,
    "topic_code": "tech-career-choice",
    "topic_name": "Lựa chọn nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ",
    "zone": "Hầm Hỏa",
    "question": "Khi đưa ra quyết định lựa chọn một ngành nghề kĩ thuật, công nghệ cụ thể cho bản thân trong tương lai, yếu tố nào sau đây đóng vai trò quan trọng hàng đầu?",
    "options": [
      "A. Chọn hoàn toàn theo trào lưu bạn bè hoặc sở thích ngẫu hứng nhất thời trên mạng xã hội",
      "B. Cân nhắc sự phù hợp giữa năng lực cá nhân, sở thích cá nhân, điều kiện gia đình và nhu cầu thực tế của thị trường lao động",
      "C. Chỉ chọn những ngành nghề được cho là nhàn hạ nhất và không yêu cầu bất kì kĩ năng thực hành nào",
      "D. Chọn ngẫu nhiên một ngành bất kì mà không cần tìm hiểu trước về công việc thực tế của ngành đó"
    ],
    "correct_answer": "B",
    "explanation": "Việc lựa chọn nghề nghiệp hiệu quả cần dựa trên sự kết hợp hài hòa giữa năng lực, sở thích, tính cách bản thân, điều kiện thực tế của gia đình và xu hướng, nhu cầu nhân lực của thị trường lao động để đảm bảo cơ hội việc làm tốt nhất sau khi ra trường."
  },
  {
    "id": 5,
    "topic_code": "tech-circuit-install",
    "topic_name": "Mô đun lắp đặt mạng điện trong nhà",
    "zone": "Hầm Băng",
    "question": "Trong thiết kế và lắp đặt mạng điện sinh hoạt trong nhà, thiết bị nào sau đây bắt buộc phải được mắc nối tiếp trên dây pha (dây nóng) trước các tải tiêu thụ để tự động ngắt mạch bảo vệ hệ thống khi xảy ra sự cố quá tải hoặc ngắn mạch?",
    "options": [
      "A. Công tắc điện điều khiển bật tắt bóng đèn",
      "B. Ổ cắm lấy điện xoay chiều thông thường",
      "C. Thiết bị bảo vệ như cầu chì hoặc aptomat (cầu dao tự động)",
      "D. Đồng hồ đo điện năng tiêu thụ (công tơ điện)"
    ],
    "correct_answer": "C",
    "explanation": "Cầu chì hoặc aptomat (cầu dao tự động) là thiết bị có chức năng bảo vệ an toàn cho mạng điện. Chúng luôn luôn được lắp nối tiếp trên dây pha trước các thiết bị tiêu thụ để tự động cắt đứt dòng điện ngay khi xảy ra hiện tượng ngắn mạch (chập điện) hoặc quá tải điện."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 5 câu hỏi Gác Cổng Công Nghệ vào Database ===");
  let importedCount = 0;

  for (const q of TECHNOLOGY_GATEKEEPER_RAW) {
    const id = `technology-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "technology-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Công Nghệ 2026',
          'technology',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${TECHNOLOGY_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Công Nghệ vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
