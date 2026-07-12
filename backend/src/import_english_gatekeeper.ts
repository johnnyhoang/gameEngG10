import { pool } from './db.js';

const ENGLISH_GATEKEEPER_RAW = [
  {
    "id": 1,
    "topic_code": "eng-pronunciation",
    "topic_name": "Phát âm đuôi -ed/-s",
    "zone": "Hầm Hỏa",
    "question": "Which of the following words has the underlined part pronounced differently from the others?",
    "options": [
      "A. stopped",
      "B. worked",
      "C. wanted",
      "D. laughed"
    ],
    "correct_answer": "C",
    "explanation": "Quy tắc phát âm đuôi \"-ed\":\n- Đuôi \"-ed\" phát âm là /ɪd/ khi động từ tận cùng bằng âm /t/ hoặc /d/ (wanted).\n- Đuôi \"-ed\" phát âm là /t/ khi động từ tận cùng bằng các âm vô thanh như /p/ (stopped), /k/ (worked), /f/ (laughed).\n- Các trường hợp còn lại phát âm là /d/."
  },
  {
    "id": 2,
    "topic_code": "eng-stress",
    "topic_name": "Trọng âm từ (Word Stress)",
    "zone": "Hầm Hỏa",
    "question": "Choose the word that has a different stress pattern from the others.",
    "options": [
      "A. decide",
      "B. return",
      "C. offer",
      "D. agree"
    ],
    "correct_answer": "C",
    "explanation": "Quy tắc trọng âm đối với động từ hai âm tiết:\n- offer (v): trọng âm rơi vào âm tiết thứ nhất /'ɒf.ər/.\n- decide (v): trọng âm rơi vào âm tiết thứ hai /dɪ'saɪd/.\n- return (v): trọng âm rơi vào âm tiết thứ hai /rɪ'tɜːn/.\n- agree (v): trọng âm rơi vào âm tiết thứ hai /ə'ɡriː/."
  },
  {
    "id": 3,
    "topic_code": "eng-tenses",
    "topic_name": "Các thì động từ (Tenses)",
    "zone": "Hầm Thạch",
    "question": "When we arrived at the cinema last night, the film _______ already.",
    "options": [
      "A. started",
      "B. has started",
      "C. had started",
      "D. was starting"
    ],
    "correct_answer": "C",
    "explanation": "Hành động \"bộ phim bắt đầu\" (the film start) xảy ra và kết thúc hoàn toàn trước một hành động khác trong quá khứ (\"we arrived\"). Vì vậy, ta phải dùng thì Quá khứ hoàn thành (Past Perfect) với cấu trúc: S + had + V₃/ed."
  },
  {
    "id": 4,
    "topic_code": "eng-passive-voice",
    "topic_name": "Câu bị động (Passive Voice)",
    "zone": "Hầm Thạch",
    "question": "They are building a new bridge over the river at the moment. -> A new bridge _______ over the river at the moment.",
    "options": [
      "A. is built",
      "B. is being built",
      "C. was built",
      "D. is building"
    ],
    "correct_answer": "B",
    "explanation": "Câu chủ động ở thì Hiện tại tiếp diễn: S + am/is/are + V-ing. Khi chuyển sang bị động, cấu trúc tương ứng là: S + am/is/are + being + V₃/ed. Do chủ ngữ mới \"A new bridge\" là danh từ số ít nên ta dùng \"is being built\"."
  },
  {
    "id": 5,
    "topic_code": "eng-relative-clauses",
    "topic_name": "Mệnh đề quan hệ (Relative Clauses)",
    "zone": "Hầm Thạch",
    "question": "The man _______ lives next door to us is a famous doctor in the city hospital.",
    "options": [
      "A. which",
      "B. whom",
      "C. who",
      "D. whose"
    ],
    "correct_answer": "C",
    "explanation": "Đại từ quan hệ \"who\" được dùng để thay thế cho danh từ chỉ người đóng vai trò làm chủ ngữ trong mệnh đề quan hệ (đứng trước động từ \"lives\"). Danh từ được thay thế ở đây là \"The man\"."
  },
  {
    "id": 6,
    "topic_code": "eng-conditional",
    "topic_name": "Câu điều kiện (Conditional Sentences)",
    "zone": "Hầm Băng",
    "question": "If I _______ enough money right now, I would buy that beautiful house on the hill.",
    "options": [
      "A. have",
      "B. had",
      "C. will have",
      "D. had had"
    ],
    "correct_answer": "B",
    "explanation": "Đây là câu điều kiện loại 2 (Conditional Sentences Type 2) diễn tả giả định trái ngược với thực tế ở hiện tại. Cấu trúc: If + S + V₂/ed, S + would/could + V-inf. Động từ \"have\" chuyển sang quá khứ đơn là \"had\"."
  },
  {
    "id": 7,
    "topic_code": "eng-reported-speech",
    "topic_name": "Câu tường thuật (Reported Speech)",
    "zone": "Hầm Băng",
    "question": "Mary said, \"I am going to visit my grandmother tomorrow.\" -> Mary said she _______ to visit her grandmother the following day.",
    "options": [
      "A. is going",
      "B. was going",
      "C. went",
      "D. had gone"
    ],
    "correct_answer": "B",
    "explanation": "Khi chuyển đổi từ câu trực tiếp sang câu gián tiếp với động từ dẫn ở quá khứ (\"said\"):\n- Thì Hiện tại tiếp diễn (\"am going\") lùi về Quá khứ tiếp diễn (\"was going\").\n- Đại từ nhân xưng \"I\" đổi thành \"she\".\n- Tính từ sở hữu \"my\" đổi thành \"her\".\n- Trạng từ chỉ thời gian \"tomorrow\" đổi thành \"the following day\"."
  },
  {
    "id": 8,
    "topic_code": "eng-word-form",
    "topic_name": "Biến đổi dạng từ (Word Form)",
    "zone": "Hầm Thạch",
    "question": "Air pollution is extremely bad and can have a _______ effect on our health. (harm)",
    "options": [
      "A. harmful",
      "B. harmless",
      "C. harmfully",
      "D. unharmed"
    ],
    "correct_answer": "A",
    "explanation": "Vị trí cần điền đứng trước danh từ \"effect\" nên ta cần một tính từ (adjective) để bổ nghĩa cho nó. Dựa vào ngữ cảnh tiêu cực \"Air pollution is extremely bad\" (Ô nhiễm không khí cực kỳ tệ), ta chọn tính từ mang nghĩa gây hại: \"harmful\"."
  },
  {
    "id": 9,
    "topic_code": "eng-gerund-infinitive",
    "topic_name": "Danh động từ / Động từ nguyên mẫu",
    "zone": "Hầm Thạch",
    "question": "My parents don't mind _______ me to the science museum on weekends.",
    "options": [
      "A. take",
      "B. to take",
      "C. taking",
      "D. took"
    ],
    "correct_answer": "C",
    "explanation": "Trong tiếng Anh, sau động từ \"mind\" (ngại, phiền làm gì đó), ta bắt buộc phải sử dụng một Danh động từ (Gerund - V-ing). Do đó, phương án đúng là \"taking\"."
  },
  {
    "id": 10,
    "topic_code": "eng-comparison",
    "topic_name": "So sánh (Comparison)",
    "zone": "Hầm Thạch",
    "question": "This new computer model is far _______ than the one I bought last year.",
    "options": [
      "A. more expensive",
      "B. expensive",
      "C. most expensive",
      "D. as expensive"
    ],
    "correct_answer": "A",
    "explanation": "Dấu hiệu nhận biết cấu trúc so sánh hơn là từ \"than\". Với tính từ dài \"expensive\" (3 âm tiết), cấu trúc so sánh hơn là: more + adj + than. Từ \"far\" được thêm vào phía trước để nhấn mạnh mức độ chênh lệch."
  },
  {
    "id": 11,
    "topic_code": "eng-modal-verbs",
    "topic_name": "Động từ khiếm khuyết (Modal Verbs)",
    "zone": "Hầm Thạch",
    "question": "You _______ park your car here. It is a strictly prohibited area and you could be fined.",
    "options": [
      "A. must",
      "B. don't have to",
      "C. needn't",
      "D. mustn't"
    ],
    "correct_answer": "D",
    "explanation": "Động từ khiếm khuyết \"mustn't\" biểu thị sự cấm đoán (prohibition). Ngữ cảnh \"strictly prohibited area\" (khu vực bị cấm nghiêm ngặt) cho thấy người lái xe tuyệt đối không được phép đỗ xe tại đây."
  },
  {
    "id": 12,
    "topic_code": "eng-wish-suggest",
    "topic_name": "Cấu trúc Wish / Suggest / It's time",
    "zone": "Hầm Băng",
    "question": "I don't have a personal computer to study online. -> I wish I _______ a personal computer to study online.",
    "options": [
      "A. have",
      "B. had",
      "C. will have",
      "D. am having"
    ],
    "correct_answer": "B",
    "explanation": "Câu ước ở hiện tại (Present wish) diễn tả một mong muốn trái ngược với sự thật ở hiện tại. Cấu trúc câu ước ở hiện tại: S + wish + S + V₂/ed. Do đó, động từ \"have\" phải lùi thì thành \"had\"."
  },
  {
    "id": 13,
    "topic_code": "eng-have-get-done",
    "topic_name": "Cấu trúc have/get something done",
    "zone": "Hầm Băng",
    "question": "My roof is leaking, so I need to have it _______ by a professional builder.",
    "options": [
      "A. repair",
      "B. repairing",
      "C. to repair",
      "D. repaired"
    ],
    "correct_answer": "D",
    "explanation": "Cấu trúc truyền khiến (causative) dạng bị động: Have + something (vật) + V₃/ed (nhờ/có cái gì được làm bởi ai). Vì \"it\" ở đây thay thế cho \"my roof\" (mái nhà - chịu tác động) nên động từ \"repair\" chia ở dạng Quá khứ phân từ là \"repaired\"."
  },
  {
    "id": 14,
    "topic_code": "eng-vocabulary-topic",
    "topic_name": "Từ vựng theo chủ đề",
    "zone": "Hầm Hỏa",
    "question": "We should turn off the _______ when they are not in use to conserve clean water.",
    "options": [
      "A. electricity",
      "B. faucets",
      "C. solar panels",
      "D. light bulbs"
    ],
    "correct_answer": "B",
    "explanation": "Thuộc chủ đề Tiết kiệm năng lượng & Bảo vệ nguồn nước. Từ \"faucets\" nghĩa là vòi nước. Hành động tắt vòi nước khi không sử dụng giúp tiết kiệm nước sạch (\"conserve clean water\")."
  },
  {
    "id": 15,
    "topic_code": "eng-communication",
    "topic_name": "Giao tiếp tình huống thực tế",
    "zone": "Hầm Hỏa",
    "question": "- Nam: \"Would you like to go to the new museum with me tonight?\" - Lan: \"_______\"",
    "options": [
      "A. Yes, I'd love to.",
      "B. Yes, I do.",
      "C. You're welcome.",
      "D. No, I don't."
    ],
    "correct_answer": "A",
    "explanation": "Đây là lời mời lịch sự bắt đầu bằng cấu trúc \"Would you like + to-inf...?\". Để đáp lại lời mời một cách đồng ý và lịch sự nhất, ta dùng cụm từ cố định: \"Yes, I'd love to\" (Có chứ, mình rất thích)."
  },
  {
    "id": 16,
    "topic_code": "eng-reading-sign",
    "topic_name": "Đọc hiểu biển báo/thông báo ngắn",
    "zone": "Hầm Băng",
    "question": "What does a sign saying \"NO LITTERING - FINE UP TO $100\" mean?",
    "options": [
      "A. You can throw garbage here for free.",
      "B. You must pay $100 to enter this clean area.",
      "C. You are not allowed to drop rubbish here, or you will have to pay money.",
      "D. Garbage bins are sold here for exactly $100."
    ],
    "correct_answer": "C",
    "explanation": "Biển báo \"NO LITTERING - FINE UP TO $100\" mang ý nghĩa: \"Không vứt rác bừa bãi - Phạt tiền lên đến 100 đô la\". Điều này tương đương với phương án C: Bạn không được phép xả rác ở đây, nếu không sẽ phải nộp tiền phạt."
  },
  {
    "id": 17,
    "topic_code": "eng-reading-cloze",
    "topic_name": "Điền từ vào văn bản (Cloze Test)",
    "zone": "Hầm Băng",
    "question": "Read the text and choose the best word to fill in the blank: \"Learning a foreign language is not easy. However, if you practice speaking it _______, you will improve your pronunciation quickly.\"",
    "options": [
      "A. regular",
      "B. regularly",
      "C. regularity",
      "D. irregular"
    ],
    "correct_answer": "B",
    "explanation": "Vị trí cần điền đứng sau động từ \"practice speaking it\" để bổ nghĩa cho hoạt động này, do đó ta cần một trạng từ (adverb). Trạng từ \"regularly\" (một cách thường xuyên) là lựa chọn đúng ngữ pháp và ngữ nghĩa."
  },
  {
    "id": 18,
    "topic_code": "eng-reading-passage",
    "topic_name": "Đọc hiểu đoạn văn dài",
    "zone": "Hầm Băng",
    "question": "Read the passage and answer the question: \"Vietnam is famous for its diverse culture and beautiful landscapes. Among many attractions, Ha Long Bay is one of the most famous. It was officially recognized as a World Heritage Site by UNESCO in 1994.\" \n\nQuestion: According to the passage, when was Ha Long Bay recognized by UNESCO?",
    "options": [
      "A. In 1990",
      "B. In 1994",
      "C. In 2000",
      "D. In 1945"
    ],
    "correct_answer": "B",
    "explanation": "Thông tin được nêu rõ ràng trực tiếp trong đoạn văn: \"It was officially recognized as a World Heritage Site by UNESCO in 1994.\""
  },
  {
    "id": 19,
    "topic_code": "eng-rewrite",
    "topic_name": "Viết lại câu (Sentence Transformation)",
    "zone": "Hầm Băng",
    "question": "Choose the sentence that has the closest meaning to: \"She began working as an English teacher three years ago.\"",
    "options": [
      "A. She has worked as an English teacher for three years.",
      "B. She worked as an English teacher for three years.",
      "C. She has worked as an English teacher since three years.",
      "D. She is working as an English teacher for three years."
    ],
    "correct_answer": "A",
    "explanation": "Viết lại câu chuyển đổi từ thì Quá khứ đơn sang Hiện tại hoàn thành:\nCấu trúc: S + began + V-ing + [khoảng thời gian] + ago -> S + has/have + V₃/ed + for + [khoảng thời gian].\n(Lưu ý phương án C sai vì dùng từ \"since\" trước một khoảng thời gian)."
  }
];

async function run() {
  console.log("=== Bắt đầu nạp 19 câu hỏi Gác Cổng Tiếng Anh vào Database ===");
  let importedCount = 0;

  for (const q of ENGLISH_GATEKEEPER_RAW) {
    const id = `english-gatekeeper-topic-${q.topic_code}`;
    
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
      tags: ["gatekeeper", "english-gatekeeper-2026"]
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
          'Bộ đề Gác Cổng Tiếng Anh 2026',
          'english',
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

  console.log(`=== Hoàn tất! Đã nạp thành công ${importedCount}/${ENGLISH_GATEKEEPER_RAW.length} câu hỏi Gác Cổng Tiếng Anh vào DB ===`);
  process.exit(0);
}

run().catch(console.error);
