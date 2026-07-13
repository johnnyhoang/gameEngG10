import { Pool } from 'pg';

export async function seedTopicsAndActivities(pool: Pool) {
  console.log('=== Khởi chạy seeding Topics và Activities ===');

  // 1. Seed Topics
  const topics = [
    // English
    { id: 'eng-grammar', subject: 'english', name: 'Ngữ pháp lõi', description: 'Hệ thống hóa các điểm thường ra nhất trong đề lớp 10 và bám sát năng lực giao tiếp thực hành.', sort_order: 1 },
    { id: 'eng-pronunciation', subject: 'english', name: 'Phát âm và trọng âm', description: 'Luyện nhận diện đuôi -ed/-s, nguyên âm, phụ âm và quy tắc nhấn âm.', sort_order: 2 },
    { id: 'eng-reading', subject: 'english', name: 'Đọc hiểu và điền khuyết', description: 'Tập trung đọc ý chính, từ nối, đại từ tham chiếu và ngữ cảnh đoạn văn.', sort_order: 3 },
    { id: 'eng-rewrite', subject: 'english', name: 'Viết lại câu', description: 'Rèn chuyển đổi cấu trúc câu nhanh, gọn, đúng chuẩn chấm điểm.', sort_order: 4 },

    // Math
    { id: 'math-quadratic', subject: 'math', name: 'Hàm số và phương trình bậc hai', description: 'Bài trọng tâm của toán vào 10: parabol, hoành độ giao điểm, Vi-ét và tham số.', sort_order: 1 },
    { id: 'math-real', subject: 'math', name: 'Bài toán thực tế', description: 'Các câu vận dụng số liệu, phần trăm, tăng giảm giá, năng suất và chuyển động.', sort_order: 2 },
    { id: 'math-plane', subject: 'math', name: 'Hình học phẳng', description: 'Ôn các hệ thức trong tam giác vuông, đường tròn, tiếp tuyến và tứ giác nội tiếp.', sort_order: 3 },
    { id: 'math-solid', subject: 'math', name: 'Hình học không gian', description: 'Nắm công thức thể tích, diện tích xung quanh và bài toán liên hệ thực tế.', sort_order: 4 },

    // Literature
    { id: 'lit-reading', subject: 'literature', name: 'Đọc hiểu văn bản', description: 'Phân biệt thơ, truyện, kí và văn bản nghị luận; rút ý, tìm biện pháp nghệ thuật và thông điệp.', sort_order: 1 },
    { id: 'lit-vietnamese', subject: 'literature', name: 'Tiếng Việt', description: 'Ôn các lớp từ, thành phần câu, phép liên kết, từ Hán Việt và lỗi diễn đạt.', sort_order: 2 },
    { id: 'lit-essay', subject: 'literature', name: 'Viết đoạn và bài nghị luận', description: 'Luyện bố cục, luận điểm, luận cứ và cách triển khai đoạn văn 200 chữ.', sort_order: 3 },
    { id: 'lit-analysis', subject: 'literature', name: 'Nghị luận văn học', description: 'Rèn dàn ý cảm nhận tác phẩm, nhân vật và hình ảnh thơ theo hướng ngắn gọn, rõ ý.', sort_order: 4 },

    // Science
    { id: 'sci-physics', subject: 'science', name: 'Vật lý (Lớp 9)', description: 'Hệ thống hóa lý thuyết Điện học, Điện từ học, Quang học và Sự bảo toàn năng lượng.', sort_order: 1 },
    { id: 'sci-chemistry', subject: 'science', name: 'Hóa học (Lớp 9)', description: 'Các hợp chất vô cơ, Kim loại, Phi kim và Sơ lược hóa học hữu cơ.', sort_order: 2 },
    { id: 'sci-biology', subject: 'science', name: 'Sinh học (Lớp 9)', description: 'Di truyền học, Biến dị, Sinh vật và Môi trường sống.', sort_order: 3 },

    // History & Geography
    { id: 'hist-history', subject: 'history_geography', name: 'Lịch sử lớp 9', description: 'Lịch sử thế giới hiện đại từ 1945 và tiến trình cách mạng Việt Nam từ năm 1919.', sort_order: 1 },
    { id: 'hist-geography', subject: 'history_geography', name: 'Địa lý lớp 9', description: 'Địa lý dân cư Việt Nam và sự phát triển, phân bố của các ngành kinh tế.', sort_order: 2 },

    // Civics
    { id: 'civ-civics', subject: 'civics', name: 'Đạo đức & Pháp luật', description: 'Nghĩa vụ công dân, quyền tự do dân chủ và trách nhiệm với gia đình, xã hội.', sort_order: 1 },

    // Tech
    { id: 'tech-technology', subject: 'technology', name: 'Công nghệ lắp đặt & Đời sống', description: 'Lý thuyết mạch điện sinh hoạt trong nhà và quy trình lắp đặt an toàn.', sort_order: 1 },

    // Informatics
    { id: 'info-informatics', subject: 'informatics', name: 'Lập trình & Mạng máy tính', description: 'Tư duy thuật toán căn bản ( Scratch / Python ), Cơ sở dữ liệu và sử dụng Internet an toàn.', sort_order: 1 },

    // Arts
    { id: 'arts-arts', subject: 'arts', name: 'Âm nhạc & Mỹ thuật', description: 'Nhạc lý cơ bản, các nhạc sĩ tiêu biểu và Mỹ thuật ứng dụng vẽ tranh đề tài.', sort_order: 1 }
  ];

  for (const topic of topics) {
    await pool.query(
      `INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order)
       VALUES ($1, $2, 9, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         description = EXCLUDED.description,
         sort_order = EXCLUDED.sort_order`,
      [topic.id, topic.subject, topic.name, topic.description, topic.sort_order]
    );
  }

  // 2. Link existing lessons to topics
  const lessonTopicMappings = [
    // English
    { text: 'Ngữ pháp lõi', topicId: 'eng-grammar' },
    { text: 'Phát âm và trọng âm', topicId: 'eng-pronunciation' },
    { text: 'Đọc hiểu và điền khuyết', topicId: 'eng-reading' },
    { text: 'Viết lại câu', topicId: 'eng-rewrite' },
    // Math
    { text: 'Hàm số và phương trình bậc hai', topicId: 'math-quadratic' },
    { text: 'Bài toán thực tế', topicId: 'math-real' },
    { text: 'Hình học phẳng', topicId: 'math-plane' },
    { text: 'Hình học không gian', topicId: 'math-solid' },
    // Literature
    { text: 'Đọc hiểu văn bản', topicId: 'lit-reading' },
    { text: 'Tiếng Việt', topicId: 'lit-vietnamese' },
    { text: 'Viết đoạn và bài nghị luận', topicId: 'lit-essay' },
    { text: 'Nghị luận văn học', topicId: 'lit-analysis' }
  ];

  for (const mapping of lessonTopicMappings) {
    await pool.query(
      `UPDATE ge10_lessons SET topic_id = $1 WHERE topic = $2`,
      [mapping.topicId, mapping.text]
    );
  }

  // 3. Seed Activities (Lessons)
  const lessonsRes = await pool.query('SELECT id, topic_id, title, subject, grade_tier FROM ge10_lessons');
  for (const lesson of lessonsRes.rows) {
    if (!lesson.topic_id) continue;
    const actId = `act-lesson-${lesson.id}`;
    const subject = lesson.subject;
    await pool.query(
      `INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
       VALUES ($1, $2, 'lesson', $3, $4::jsonb, $5, 10, 20, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [actId, lesson.topic_id, lesson.title, JSON.stringify({ lesson_id: lesson.id }), 0, subject, lesson.grade_tier]
    );
  }

  // 4. Seed Activities (Bosses)
  const bosses = [
    // English
    { id: 'act-boss-eng-2024', topic_id: 'eng-grammar', title: 'Đại Ca HCMC 2024', config: { boss_id: 'b-2024', boss_tag: '2024', energy: 100 } },
    { id: 'act-boss-eng-2025', topic_id: 'eng-grammar', title: 'Cự Long HCMC 2025', config: { boss_id: 'b-2025', boss_tag: '2025', energy: 100 } },
    { id: 'act-boss-eng-2026', topic_id: 'eng-grammar', title: 'Cổ Long HCMC 2026 (Mock)', config: { boss_id: 'b-2026', boss_tag: '2026', energy: 100 } },
    // Math
    { id: 'act-boss-math-2024', topic_id: 'math-quadratic', title: 'Đại Ca Toán HCMC 2024', config: { boss_id: 'b-2024', boss_tag: '2024', energy: 100 } },
    { id: 'act-boss-math-2025', topic_id: 'math-quadratic', title: 'Cự Long Toán HCMC 2025', config: { boss_id: 'b-2025', boss_tag: '2025', energy: 100 } },
    { id: 'act-boss-math-2026', topic_id: 'math-quadratic', title: 'Cổ Long Toán HCMC 2026 (Mock)', config: { boss_id: 'b-2026', boss_tag: '2026', energy: 100 } },
    // Literature
    { id: 'act-boss-lit-2024', topic_id: 'lit-reading', title: 'Đại Ca Văn HCMC 2024', config: { boss_id: 'b-2024', boss_tag: '2024', energy: 100 } },
    { id: 'act-boss-lit-2025', topic_id: 'lit-reading', title: 'Cự Long Văn HCMC 2025', config: { boss_id: 'b-2025', boss_tag: '2025', energy: 100 } },
    { id: 'act-boss-lit-2026', topic_id: 'lit-reading', title: 'Cổ Long Văn HCMC 2026 (Mock)', config: { boss_id: 'b-2026', boss_tag: '2026', energy: 100 } },

    // Science
    { id: 'act-boss-sci-hk1', topic_id: 'sci-physics', title: 'Khảo Hạch Khoa học - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-sci-hk2', topic_id: 'sci-physics', title: 'Khảo Hạch Khoa học - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } },
    // History
    { id: 'act-boss-hist-hk1', topic_id: 'hist-history', title: 'Khảo Hạch Sử Địa - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-hist-hk2', topic_id: 'hist-history', title: 'Khảo Hạch Sử Địa - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } },
    // Civics
    { id: 'act-boss-civ-hk1', topic_id: 'civ-civics', title: 'Khảo Hạch Giáo dục công dân - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-civ-hk2', topic_id: 'civ-civics', title: 'Khảo Hạch Giáo dục công dân - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } },
    // Tech
    { id: 'act-boss-tech-hk1', topic_id: 'tech-technology', title: 'Khảo Hạch Công nghệ - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-tech-hk2', topic_id: 'tech-technology', title: 'Khảo Hạch Công nghệ - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } },
    // Info
    { id: 'act-boss-info-hk1', topic_id: 'info-informatics', title: 'Khảo Hạch Tin học - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-info-hk2', topic_id: 'info-informatics', title: 'Khảo Hạch Tin học - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } },
    // Arts
    { id: 'act-boss-arts-hk1', topic_id: 'arts-arts', title: 'Khảo Hạch Nghệ thuật - Học Kỳ 1', config: { boss_id: 'b-hk1', boss_tag: 'HK1', energy: 100 } },
    { id: 'act-boss-arts-hk2', topic_id: 'arts-arts', title: 'Khảo Hạch Nghệ thuật - Học Kỳ 2', config: { boss_id: 'b-hk2', boss_tag: 'HK2', energy: 100 } }
  ];

  for (const boss of bosses) {
    const topicRes = await pool.query('SELECT subject FROM ge10_topics WHERE id = $1', [boss.topic_id]);
    const subject = topicRes.rows[0]?.subject || 'english';
    await pool.query(
      `INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject)
       VALUES ($1, $2, 'boss', $3, $4::jsonb, 100, 100, 150, $5)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         config = EXCLUDED.config,
         subject = EXCLUDED.subject`,
      [boss.id, boss.topic_id, boss.title, JSON.stringify(boss.config), subject]
    );
  }

  // 5. Seed Activities (Quizzes / Practice Cards)
  const quizzes = [
    // English
    { id: 'act-quiz-eng-grammar', topic_id: 'eng-grammar', title: 'Grammar Cave', config: { mode: 'grammar', reward: 'Ưu tiên grammar + rewrite' } },
    { id: 'act-quiz-eng-vocabulary', topic_id: 'eng-grammar', title: 'Vocabulary Castle', config: { mode: 'vocabulary', reward: 'Ưu tiên vocabulary + word form' } },
    { id: 'act-quiz-eng-reading', topic_id: 'eng-reading', title: 'Reading Forest', config: { mode: 'reading', reward: 'Ưu tiên reading + cloze' } },
    { id: 'act-quiz-eng-pronunciation', topic_id: 'eng-pronunciation', title: 'Pronunciation Peak', config: { mode: 'pronunciation', reward: 'Ưu tiên pronunciation + stress' } },

    // Math
    { id: 'act-quiz-math-quad', topic_id: 'math-quadratic', title: 'Hàm số & Phương trình bậc hai', config: { mode: 'grammar', reward: 'Parabol y = ax^2 + bx + c · Giao điểm · Hệ thức Vi-ét · Điều kiện nghiệm' } },
    { id: 'act-quiz-math-real', topic_id: 'math-real', title: 'Bài toán thực tế', config: { mode: 'vocabulary', reward: 'Phần trăm · Lập phương trình · Tỉ lệ · Giải bài toán thực tế' } },
    { id: 'act-quiz-math-plane', topic_id: 'math-plane', title: 'Hình học phẳng', config: { mode: 'reading', reward: 'Tiếp tuyến · Đường tròn · Tứ giác nội tiếp · Chứng minh hình học' } },
    { id: 'act-quiz-math-solid', topic_id: 'math-solid', title: 'Hình học không gian', config: { mode: 'mixed', reward: 'Hình trụ · Hình nón · Hình cầu · Công thức thể tích' } },

    // Literature
    { id: 'act-quiz-lit-read', topic_id: 'lit-reading', title: 'Đọc hiểu văn bản', config: { mode: 'grammar', reward: 'Ý nghĩa nhan đề · Biện pháp tu từ · Hình ảnh biểu tượng · Thông điệp tác phẩm' } },
    { id: 'act-quiz-lit-vn', topic_id: 'lit-vietnamese', title: 'Tiếng Việt', config: { mode: 'reading', reward: 'Từ loại · Câu ghép · Phép nối · Biện pháp tu từ' } },
    { id: 'act-quiz-lit-essay', topic_id: 'lit-essay', title: 'Viết đoạn và bài nghị luận', config: { mode: 'vocabulary', reward: 'Mở đoạn · Luận điểm · Dẫn chứng · Kết đoạn' } },
    { id: 'act-quiz-lit-lit', topic_id: 'lit-analysis', title: 'Nghị luận văn học', config: { mode: 'mixed', reward: 'Dàn ý · Dẫn thơ · Phân tích chi tiết · Giọng điệu nghệ thuật' } },

    // Science
    { id: 'act-quiz-sci-phys', topic_id: 'sci-physics', title: 'Vật lý Luyện tập', config: { mode: 'mixed', reward: 'Điện trở · Định luật Ôm · Thấu kính hội tụ' } },
    { id: 'act-quiz-sci-chem', topic_id: 'sci-chemistry', title: 'Hóa học Luyện tập', config: { mode: 'mixed', reward: 'Oxit - Axit - Bazơ · Bảng tuần hoàn · Hiđrocacbon' } },
    { id: 'act-quiz-sci-bio', topic_id: 'sci-biology', title: 'Sinh học Luyện tập', config: { mode: 'mixed', reward: 'Quy luật Men-đen · Cấu trúc ADN và Gen · Hệ sinh thái' } },

    // History
    { id: 'act-quiz-hist-hist', topic_id: 'hist-history', title: 'Lịch sử Luyện tập', config: { mode: 'mixed', reward: 'Cách mạng Việt Nam · Chiến dịch lịch sử' } },
    { id: 'act-quiz-hist-geo', topic_id: 'hist-geography', title: 'Địa lý Luyện tập', config: { mode: 'mixed', reward: 'Phân bố dân cư · Nông - Lâm - Ngư nghiệp' } },

    // Others
    { id: 'act-quiz-civics-mixed', topic_id: 'civ-civics', title: 'Đạo đức & Pháp luật Luyện tập', config: { mode: 'mixed', reward: 'Quyền tự do ngôn luận · Hiến pháp' } },
    { id: 'act-quiz-tech-mixed', topic_id: 'tech-technology', title: 'Công nghệ Luyện tập', config: { mode: 'mixed', reward: 'Thiết bị bảo vệ mạng điện · Sơ đồ lắp đặt' } },
    { id: 'act-quiz-info-mixed', topic_id: 'info-informatics', title: 'Tin học Luyện tập', config: { mode: 'mixed', reward: 'Cấu trúc điều khiển · Biến và kiểu dữ liệu' } },
    { id: 'act-quiz-arts-mixed', topic_id: 'arts-arts', title: 'Nghệ thuật Luyện tập', config: { mode: 'mixed', reward: 'Quãng và Hợp xướng · Tỉ lệ hình họa' } }
  ];

  for (const quiz of quizzes) {
    const topicRes = await pool.query('SELECT subject FROM ge10_topics WHERE id = $1', [quiz.topic_id]);
    const subject = topicRes.rows[0]?.subject || 'english';
    await pool.query(
      `INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject)
       VALUES ($1, $2, 'quiz', $3, $4::jsonb, 50, 10, 20, $5)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         config = EXCLUDED.config,
         subject = EXCLUDED.subject`,
      [quiz.id, quiz.topic_id, quiz.title, JSON.stringify(quiz.config), subject]
    );
  }

  console.log('=== Hoàn tất seeding Topics và Activities thành công! ===');
}
