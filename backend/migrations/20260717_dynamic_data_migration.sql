-- Migration to move static data into database tables
-- Created on 2026-07-17

-- 1. Create ge10_handbook_pages
CREATE TABLE IF NOT EXISTS ge10_handbook_pages (
  id VARCHAR(50) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  audience VARCHAR(50) DEFAULT 'student',
  bullets JSONB DEFAULT '[]'::jsonb
);

-- Seed ge10_handbook_pages
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-1', 'Học Vấn & Tinh Tấn', 'Học Vấn & Kinh Nghiệm (XP)', 'Học vấn (XP) đo lường trình độ kiến thức của Sĩ Tử trên học đường. Khi làm đúng mỗi câu hỏi thường ở Học Đường, con sẽ tích lũy được +15 XP.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-2', 'Học Vấn & Tinh Tấn', 'Vượt Chuyên Đề & Khoa Thi', 'Lĩnh ngộ thành công mỗi chuyên đề kiến thức sẽ giúp con nhận thêm +50 XP. Thi đỗ Khoa Thi nhận +150 XP và được nhân đôi điểm XP câu đúng trong bài.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-3', 'Học Vấn & Tinh Tấn', 'Luật Nuôi Dưỡng Linh Vật', 'Cho Heo Maikawaii ăn tăng cấp sẽ tiêu tốn 30 XP và 50 Ruby của con. Điều này có thể khiến con bị giảm cấp độ tạm thời để tập trung nuôi dưỡng Linh vật.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-4', 'Học Vấn & Tinh Tấn', 'Quy Tắc Thưởng Ruby', 'Ruby là đơn vị tích lũy để con đổi học cụ và quà khuyến học trong Shop Học Cụ. Làm đúng câu hỏi Trường Thi sẽ thưởng cho con +5 Ruby.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-5', 'Học Vấn & Tinh Tấn', 'Luật Đăng Khoa Liên Tiếp (Combo)', 'Làm đúng liên tiếp từ 3 câu trở lên sẽ nhận hệ số nhân Ruby cực lớn x1.2, x1.5, x2.0. Chỉ cần làm sai một câu, chuỗi trả lời liên tiếp sẽ bị reset.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-6', 'Trường Thi & Khoa Cử', 'Năng Lượng Học Tập', 'Năng Lượng (Energy) là tài nguyên cần thiết để làm bài tập ở Trường Thi. Mỗi lượt luyện tập thường tiêu hao 30 Năng Lượng của Sĩ Tử.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-7', 'Trường Thi & Khoa Cử', 'Luật Tiêu Hao Năng Lượng', 'Mỗi Khoa Thi tiêu hao 100 Năng Lượng và được trừ ngay khi vào lượt thi. Nếu con bỏ cuộc giữa chừng, lượng Năng Lượng này không được hoàn lại.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-8', 'Trường Thi & Khoa Cử', 'Số Lượt Làm Bài & Trái Tim', 'Sĩ Tử có tối đa 3 Trái tim trong mỗi lượt làm bài khảo thí ở Trường Thi. Mỗi câu làm sai sẽ bị khấu trừ 1 Trái tim của con.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-9', 'Trường Thi & Khoa Cử', 'Luật Phạm Quy Trường Thi', 'Hết Trái tim giữa lượt thi sẽ thất bại và bị giảm 50% số Ruby và XP kiếm được trong lượt đó. Đồng thời Heo Maikawaii sẽ buồn bã giảm 5 điểm vui vẻ.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-10', 'Học Viện Quy Củ', 'Duy Trì Chuỗi Đèn Sách', 'Con cần chăm chỉ học tập mỗi ngày để duy trì Chuỗi học tập (Streak) của bản thân. Chuỗi học tập tăng giúp rèn luyện thói quen và nhận thưởng lớn.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-11', 'Học Viện Quy Củ', 'Luật Chuyên Cần', 'Giữ chuỗi càng lâu thưởng càng lớn: ngày 2 được +10 Ruby, ngày 3 +20 Ruby, từ ngày 4 mỗi ngày +30 Ruby. Bỏ quá 24 giờ không học thì chuỗi reset về 0 (không bị trừ điểm) và phải leo lại từ đầu.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('hb-12', 'Học Viện Quy Củ', 'Thử Thách Bất Ngờ', 'Khi ôn luyện hoặc đăng nhập, con có 5% cơ hội gặp Thử Thách Bất Ngờ để nhận +100 Năng Lượng hoặc một bài kiểm tra từ Trợ Giáo MIKA.', 'student', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-xp', 'Trợ Giúp Nhanh', 'Cấp độ và XP', '', 'student', '["• Làm đúng câu hỏi là có XP. Câu càng khó, XP càng nặng tay.","• Đủ XP thì lên cấp, mở thêm giới hạn và tiến hóa thú cưng.","• Boss và nhiệm vụ ngày là hai mỏ thưởng lớn nhất."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-energy', 'Trợ Giúp Nhanh', 'Năng Lượng (Energy)', '', 'student', '["• Năng Lượng hồi đầy mỗi ngày lúc 0h.","• Mỗi lượt luyện thường tốn 30 Năng Lượng.","• Khoa Thi tốn 100 Năng Lượng, trừ ngay khi bắt đầu.","• Cạn Năng Lượng thì nghỉ một nhịp và chờ hồi."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-hearts', 'Trợ Giúp Nhanh', 'Luật 3 Lần Sai (Sinh Tồn/Boss)', '', 'student', '["• Boss và Sinh Tồn cho phép sai tối đa 2 câu — sai câu thứ 3 là kết thúc lượt.","• Bộ đếm lỗi chỉ tính trong lượt đang chơi, hết lượt là xóa sạch.","• Thua trận chỉ giữ được 50% chiến lợi phẩm thu được trong trận.","• Sai ở chế độ luyện tập thường không bị tính lỗi sinh tử."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-nanite', 'Trợ Giúp Nhanh', 'Ruby', '', 'student', '["• Ruby là tiền tệ trong game, trả công cho câu đúng.","• Ruby dùng để mua Thẻ Nhắc Bài, Thẻ Chuyên Cần, Hồi Nguyên Đan, Phong Cách Học Đường và đổi quà.","• Kiếm Ruby đều tay thì chơi mượt hơn nhiều."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-wallet', 'Trợ Giúp Nhanh', 'Quà Khuyến Học', '', 'student', '["• Đây là phần thưởng thật do Chủ Nhiệm Chính hoặc Viện Trưởng tạo, có số lượng giới hạn — đổi sớm để không bị hết.","• Đổi xong sẽ trừ Ruby ngay và chờ người quản lý trao quà thật ngoài đời.","• Khi người quản lý bấm \"Đã Trao\" thì yêu cầu hoàn tất."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-adult', 'Trợ Giúp Nhanh', 'Heo Maikawaii', '', 'student', '["• Heo Maikawaii lớn lên theo tiến trình tu luyện của con.","• Cho Heo Maikawaii ăn chỉ tốn 10 Ruby và 5 XP mỗi lần — cho ăn thoải mái nhé!","• Hết Ruby thì Heo tự về chuồng ngủ, cày thêm Ruby ở Học Đường rồi cho ăn tiếp.","• Muốn Heo Maikawaii khôn lớn, con phải học đều chứ không được bỏ phòng."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-prediction', 'Trợ Giúp Nhanh', 'Dự đoán điểm thi', '', 'student', '["• Hệ thống nhìn vào kết quả làm bài để ước tính điểm thi.","• Càng làm nhiều câu thì ước lượng càng chắc.","• Con nên lấy đó làm mốc luyện chứ đừng xem như phán quyết cuối."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-streak', 'Trợ Giúp Nhanh', 'Chuỗi học tập', '', 'student', '["• Học đều thì chuỗi tăng — ngày 2 thưởng +10 Ruby, ngày 3 +20 Ruby, ngày 4 trở đi +30 Ruby/ngày.","• Bỏ quá 24h không học là chuỗi gãy, quay về 0 (không bị trừ điểm).","• Có Thẻ Chuyên Cần thì còn cứu được, nhưng đừng ỷ lại."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-ai-ingest', 'Trợ Giúp Quản Trị', 'Nhập đề bằng AI', '', 'admin', '["• Dán đề thô hoặc file câu hỏi vào khung nhập.","• AI sẽ tách câu, lựa chọn đáp án và gợi ý lời giải.","• Xác nhận xong là câu hỏi vào kho đề ngay."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-parent-console', 'Trợ Giúp Quản Trị', 'Phòng Điều Hành', '', 'admin', '["• Sổ Danh Bộ: quản lý tài khoản Sĩ Tử và cấp quyền toàn viện.","• Kho Đề Thi: lọc ngân hàng câu hỏi theo môn, dạng và thang chấm.","• Phòng Tài Vụ: duyệt đổi quà, cấu hình Năng Lượng và định mức Ruby/XP.","• Hồ Sơ Sĩ Tử: xem hồ sơ chi tiết từng Sĩ Tử."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-bank-structure', 'Trợ Giúp Quản Trị', 'Cấu trúc ngân hàng', '', 'admin', '["• Mỗi câu nên có subject, category và metadata rõ ràng.","• examPart giúp chia đề, answerMode quyết định cách chấm.","• solutionSteps dùng để chấm rubric và giải thích."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-math-bank', 'Trợ Giúp Quản Trị', 'Dạng Toán', '', 'admin', '["• Giữ đủ các mảng: đại số, đồ thị, hình học, thực tế.","• Bài nhiều ý nên tách a/b/c và solutionSteps theo từng ý.","• proof hoặc diagram phải có bước trung gian rõ ràng."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-english-bank', 'Trợ Giúp Quản Trị', 'Dạng Tiếng Anh', '', 'admin', '["• MCQ tách riêng grammar, vocabulary, pronunciation, stress, reading.","• Tự luận nên lưu đáp án chấp nhận được và biến thể.","• Chấm theo dạng bài, không chấm cảm tính."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-literature-bank', 'Trợ Giúp Quản Trị', 'Dạng Ngữ văn', '', 'admin', '["• Tách đọc hiểu, tiếng Việt, nghị luận xã hội và nghị luận văn học.","• Bài văn nên có rubric, câu mấu chốt và ý cần đạt.","• Chấm theo bố cục, lập luận, dẫn chứng và diễn đạt."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-rubric', 'Trợ Giúp Quản Trị', 'Cách chấm', '', 'admin', '["• Bố cục phải rõ, ý phải mạch, không viết kiểu phóng tay.","• Dẫn chứng và bước giải phải đủ để AI không phải đoán.","• Chấm theo rubric, không chấm theo cảm giác."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-mcq', 'Trợ Giúp Dạng Câu Hỏi', 'Trắc nghiệm', '', 'admin', '["• Chỉ lưu một đáp án đúng.","• Bốn lựa chọn phải cùng kiểu, cùng độ dài tương đối.","• Giải thích ngắn, gọn, đủ để thấy vì sao đúng và sai."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-short-answer', 'Trợ Giúp Dạng Câu Hỏi', 'Tự luận ngắn', '', 'admin', '["• Đáp số phải rõ ràng, có đơn vị nếu cần.","• Bước làm chỉ cần vừa đủ, không lan man.","• Chấm cả kết quả lẫn cách đi tới kết quả."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-proof', 'Trợ Giúp Dạng Câu Hỏi', 'Chứng minh', '', 'admin', '["• Đi từ giả thiết sang suy luận rồi chốt kết luận.","• Mỗi ý nên có một mốc chấm riêng.","• Hình học thì ghi rõ góc, tam giác, hệ thức hoặc đồng dạng."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-multi-part', 'Trợ Giúp Dạng Câu Hỏi', 'Nhiều ý', '', 'admin', '["• Tách rõ a/b/c ngay từ đầu.","• Ý nào ra kết quả riêng thì chấm riêng.","• Đừng để một ý sai kéo sập cả bài nếu các ý khác vẫn ổn."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-wordform', 'Trợ Giúp Dạng Câu Hỏi', 'Word form', '', 'admin', '["• Lưu từ gốc và các đáp án chấp nhận được.","• Chấm đúng loại từ, đúng ngữ cảnh, đúng chính tả.","• Nếu có biến thể hợp lệ thì phải ghi vào."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-rewrite', 'Trợ Giúp Dạng Câu Hỏi', 'Viết lại câu', '', 'admin', '["• Giữ nghĩa, đổi đúng cấu trúc đề yêu cầu.","• Có nhiều đáp án đúng thì lưu hết.","• Chấm theo mục tiêu chuyển đổi, không soi từng chữ vụn."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-cloze', 'Trợ Giúp Dạng Câu Hỏi', 'Điền khuyết', '', 'admin', '["• Nhìn trước và sau chỗ trống.","• Ưu tiên collocation, từ loại và ngữ cảnh.","• Nếu đề có gợi ý thì dùng gợi ý để khóa đáp án."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;
INSERT INTO ge10_handbook_pages (id, category, title, content, audience, bullets)
VALUES ('help-question-type-reading', 'Trợ Giúp Dạng Câu Hỏi', 'Đọc hiểu', '', 'admin', '["• Luôn gắn ngữ liệu gốc ở đầu câu.","• Câu hỏi phải nói rõ cần ý chính, chi tiết hay suy luận.","• Chấm theo nội dung đúng, không chỉ theo từ khóa lẻ."]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  audience = EXCLUDED.audience,
  bullets = EXCLUDED.bullets;

-- 2. Create ge10_english_island_items
CREATE TABLE IF NOT EXISTS ge10_english_island_items (
  id VARCHAR(50) PRIMARY KEY,
  district_id VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer TEXT,
  accepted_answers JSONB DEFAULT '[]'::jsonb,
  explanation TEXT NOT NULL,
  speech_text TEXT
);

-- Seed ge10_english_island_items
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'pv-1', 
  'phrase-valley', 
  'choice', 
  'The school trip was cancelled ___ the heavy rain.', 
  '["because of","although","despite of","in order to"]'::jsonb, 
  'because of', 
  NULL, 
  'Because of is followed by a noun phrase: the heavy rain.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'pv-2', 
  'phrase-valley', 
  'choice', 
  'Mai always ___ attention to the teacher’s pronunciation.', 
  '["pays","makes","takes","does"]'::jsonb, 
  'pays', 
  NULL, 
  'Pay attention is the standard collocation.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'pv-3', 
  'phrase-valley', 
  'choice', 
  'We should ___ up plastic bottles instead of throwing them away.', 
  '["pick","look","turn","give"]'::jsonb, 
  'pick', 
  NULL, 
  'Pick up means collect something from the ground.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'pv-4', 
  'phrase-valley', 
  'choice', 
  'Nam is looking ___ to joining the English speaking club.', 
  '["forward","after","into","over"]'::jsonb, 
  'forward', 
  NULL, 
  'Look forward to is followed by a noun or gerund.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'pv-5', 
  'phrase-valley', 
  'choice', 
  'The new library gives students easy ___ to digital books.', 
  '["access","approach","entrance","arrival"]'::jsonb, 
  'access', 
  NULL, 
  'Have/give access to is the natural collocation.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'ct-1', 
  'conversation-town', 
  'choice', 
  'A: “Would you like to join our study group?” — B: “___”', 
  '["Yes, I’d love to.","Never mind.","You are welcome.","Not at all."]'::jsonb, 
  'Yes, I’d love to.', 
  NULL, 
  'This politely accepts an invitation.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'ct-2', 
  'conversation-town', 
  'choice', 
  'A: “I’m sorry I broke your ruler.” — B: “___”', 
  '["Don’t worry about it.","That sounds great.","Here you are.","The same to you."]'::jsonb, 
  'Don’t worry about it.', 
  NULL, 
  'This is an appropriate response to an apology.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'ct-3', 
  'conversation-town', 
  'choice', 
  'A: “Could you show me the way to the library?” — B: “___”', 
  '["Sure. Go straight and turn left.","Yes, I could.","No, I don’t.","That is my library."]'::jsonb, 
  'Sure. Go straight and turn left.', 
  NULL, 
  'The response accepts the request and gives directions.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'ct-4', 
  'conversation-town', 
  'choice', 
  'A: “You did a great job on the presentation!” — B: “___”', 
  '["Thank you. That’s kind of you.","No problem.","I disagree.","You must be joking."]'::jsonb, 
  'Thank you. That’s kind of you.', 
  NULL, 
  'Thanking the speaker is the natural response to a compliment.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'ct-5', 
  'conversation-town', 
  'choice', 
  'A: “How about practising English after class?” — B: “___”', 
  '["That’s a good idea.","I’m fine, thanks.","It doesn’t matter.","Here it is."]'::jsonb, 
  'That’s a good idea.', 
  NULL, 
  'This appropriately agrees with a suggestion.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'wp-1', 
  'writing-pavilion', 
  'writing', 
  'Rewrite: “I started learning English three years ago.” → I have ...', 
  NULL, 
  NULL, 
  '["I have learned English for three years.","I have learnt English for three years.","I have been learning English for three years."]'::jsonb, 
  'Use the present perfect with for + duration.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'wp-2', 
  'writing-pavilion', 
  'writing', 
  'Rewrite: “The test was difficult, but Lan completed it.” → Although ...', 
  NULL, 
  NULL, 
  '["Although the test was difficult, Lan completed it."]'::jsonb, 
  'Although introduces a concessive clause.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'wp-3', 
  'writing-pavilion', 
  'writing', 
  'Complete with the correct word form: She answered all the questions ___. (CONFIDENT)', 
  NULL, 
  NULL, 
  '["confidently"]'::jsonb, 
  'An adverb is needed to modify answered.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'wp-4', 
  'writing-pavilion', 
  'writing', 
  'Rewrite in the passive voice: “People speak English in many countries.”', 
  NULL, 
  NULL, 
  '["English is spoken in many countries."]'::jsonb, 
  'Present simple passive: is/am/are + past participle.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'wp-5', 
  'writing-pavilion', 
  'writing', 
  'Combine using “so”: The bus was late. We arrived after the bell.', 
  NULL, 
  NULL, 
  '["The bus was late, so we arrived after the bell."]'::jsonb, 
  'So connects a cause with its result.', 
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'll-1', 
  'listening-lake', 
  'choice', 
  'Where does the English club meet?', 
  '["In room 12","In room 20","In the library","In the school yard"]'::jsonb, 
  'In room 12', 
  NULL, 
  'The announcement says “in room twelve”.', 
  'The English club meets in room twelve every Friday afternoon.'
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'll-2', 
  'listening-lake', 
  'choice', 
  'What must students bring?', 
  '["Their student card","A notebook","A dictionary","Their timetable"]'::jsonb, 
  'Their student card', 
  NULL, 
  'The key detail is “bring your student card”.', 
  'Please bring your student card when you borrow books from the library.'
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'll-3', 
  'listening-lake', 
  'choice', 
  'When does the workshop start?', 
  '["8:30","8:00","9:00","9:30"]'::jsonb, 
  '8:30', 
  NULL, 
  'Half past eight means 8:30.', 
  'The science workshop starts at half past eight, not at nine o’clock.'
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'll-4', 
  'listening-lake', 
  'choice', 
  'Why will the match be indoors?', 
  '["It may rain","It is too hot","The field is closed","The team is late"]'::jsonb, 
  'It may rain', 
  NULL, 
  'The reason given is possible rain.', 
  'Because it may rain this afternoon, the football match will take place in the sports hall.'
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;
INSERT INTO ge10_english_island_items (id, district_id, type, prompt, options, correct_answer, accepted_answers, explanation, speech_text)
VALUES (
  'll-5', 
  'listening-lake', 
  'choice', 
  'How should students submit their projects?', 
  '["By email","By post","In person only","Through a classmate"]'::jsonb, 
  'By email', 
  NULL, 
  'The instruction explicitly says “by email”.', 
  'Students can submit their projects by email before Monday morning.'
)
ON CONFLICT (id) DO UPDATE SET
  district_id = EXCLUDED.district_id,
  type = EXCLUDED.type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  accepted_answers = EXCLUDED.accepted_answers,
  explanation = EXCLUDED.explanation,
  speech_text = EXCLUDED.speech_text;

-- 3. Create ge10_subject_exam_blueprints
CREATE TABLE IF NOT EXISTS ge10_subject_exam_blueprints (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(50) NOT NULL,
  part VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  focus TEXT NOT NULL,
  common_question_forms JSONB NOT NULL,
  answer_modes JSONB NOT NULL,
  import_hint TEXT
);

-- Seed ge10_subject_exam_blueprints
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 1', 'Parabol và đường thẳng', 'Vẽ đồ thị hàm bậc hai, tìm giao điểm, kiểm tra nghiệm bằng phép tính.', '["vẽ đồ thị","tìm giao điểm","phương trình hoành độ giao điểm"]'::jsonb, '["short-answer","numeric","expression","multi-part"]'::jsonb, 'Lưu rõ bảng giá trị, phương trình giao điểm và tọa độ kết luận.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 2', 'Phương trình bậc hai - Viète', 'Điều kiện có hai nghiệm phân biệt và biến đổi biểu thức theo tổng, tích nghiệm.', '["discriminant","viète","biểu thức nghiệm"]'::jsonb, '["short-answer","expression","multi-part"]'::jsonb, 'Gắn công thức trung gian vào solutionSteps để tái hiện lập luận chấm điểm.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 3', 'Hàm số bậc nhất và đổi đơn vị', 'Lập hàm bậc nhất từ hai cặp giá trị và suy ra giá trị thực tế theo đơn vị.', '["hàm bậc nhất","đổi nhiệt độ","hai điểm xác định hàm số"]'::jsonb, '["short-answer","numeric","multi-part"]'::jsonb, 'Cần lưu rõ cặp dữ liệu mốc để UI hiển thị đúng phép thế a, b.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 4', 'Tăng trưởng theo tỉ lệ phần trăm', 'Mô hình tăng đều theo cấp số nhân từ dữ liệu thực tế như quãng đường, dân số, doanh thu.', '["cấp số nhân","tăng trưởng %","mốc vượt ngưỡng"]'::jsonb, '["short-answer","numeric","multi-part"]'::jsonb, 'Nên lưu công thức tổng quát và mốc cần tìm để hỗ trợ nhiều bước giải.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 5', 'Giảm giá lũy tiến', 'Tính giá sau nhiều lần giảm liên tiếp và truy ngược giá niêm yết ban đầu.', '["giảm giá","khuyến mãi nhiều lần","tính ngược giá gốc"]'::jsonb, '["short-answer","numeric","multi-part"]'::jsonb, 'Cần lưu hệ số giảm theo từng lần để AI tạo đúng lời giải ngược.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 6', 'Thể tích và dâng nước', 'Dùng thể tích hình trụ, hình cầu và độ chênh mực nước để suy bán kính.', '["thể tích hình trụ","hình cầu","dâng nước"]'::jsonb, '["short-answer","numeric","multi-part"]'::jsonb, 'Nên tách thể tích phần dâng và thể tích mỗi vật để dễ chấm tự động.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 7', 'Mua hàng và khuyến mãi', 'Quy đổi số tiền, giá niêm yết và mức giảm áp dụng cho các mốc mua khác nhau.', '["mua hàng","khuyến mãi","bài toán giá bán"]'::jsonb, '["short-answer","numeric","multi-part"]'::jsonb, 'Gắn đơn vị tiền trong solutionSteps và giữ rõ giả thiết về số lượng mua.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('math', 'Bài 8', 'Hình học phẳng chứng minh', 'Tiếp tuyến, tứ giác nội tiếp, đồng dạng, hệ thức lượng và phương tích.', '["chứng minh","tứ giác nội tiếp","tiếp tuyến"]'::jsonb, '["proof","multi-part"]'::jsonb, 'Nên nhập theo từng ý a/b/c và có diagramHint để hỗ trợ UI dựng hình.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part I', 'Multiple Choice', 'Grammar, vocabulary, pronunciation, stress, communication, and sign/notice reading.', '["grammar","vocabulary","pronunciation","stress","communication","signs"]'::jsonb, '["single-choice"]'::jsonb, 'Use metadata.englishTask to separate grammar, pronunciation, stress, and sign questions inside the same multiple-choice block.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part II', 'Guided Cloze', 'Choose the best option based on sentence context, collocations, and grammar clues around each blank.', '["guided cloze","context clue","collocation"]'::jsonb, '["single-choice"]'::jsonb, 'Set metadata.englishSkill = guided-cloze and keep each blank as a separate question when importing itemized banks.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part III', 'Reading Comprehension', 'True/False, main idea, detail, reference, and inference questions based on one passage.', '["true/false","main idea","reference","detail"]'::jsonb, '["single-choice","multi-part","short-answer"]'::jsonb, 'Mark the passage genre and task type so the UI can show whether the question is T/F or main-idea reading.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part IV', 'Word Forms', 'Build the correct noun, adjective, adverb, or verb form from the given root word.', '["word form","part of speech","derivation"]'::jsonb, '["short-answer"]'::jsonb, 'Store acceptable variants in correctAnswer and set englishTask = word-form for quick filtering.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part V', 'Sentence Rearrangement', 'Reorder jumbled words or phrases into a correct and meaningful sentence.', '["rearrangement","ordering","sentence building"]'::jsonb, '["short-answer"]'::jsonb, 'Use solutionSteps to show how the sentence should be built from subject to predicate and modifiers.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('english', 'Part VI', 'Sentence Transformation', 'Rewrite sentences while preserving meaning using tense shifts, reported speech, passive voice, and structural changes.', '["rewrite","transformation","reported speech","passive"]'::jsonb, '["short-answer","multi-part"]'::jsonb, 'Keep all accepted rewrites in correctAnswer and set englishTask = transformation for analysis and hints.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần I', 'Đọc hiểu văn bản thơ', 'Nhận diện phương thức biểu đạt, biện pháp tu từ, hình ảnh biểu tượng, giọng điệu và thông điệp.', '["phương thức biểu đạt","biện pháp tu từ","tác dụng","bài học rút ra"]'::jsonb, '["single-choice","short-answer","multi-part"]'::jsonb, 'Nên gắn metadata.textGenre = poetry và metadata.literatureTask để tách câu nhận biết, thông hiểu và vận dụng.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần I', 'Đọc hiểu văn bản truyện, kí, tản văn', 'Tập trung vào chi tiết, nhân vật, tình huống truyện, tình cảm và thông điệp nghệ thuật.', '["chi tiết nghệ thuật","tâm lí nhân vật","ý nghĩa nhan đề","thông điệp"]'::jsonb, '["single-choice","short-answer","multi-part"]'::jsonb, 'Phù hợp với metadata.textGenre = prose và metadata.literatureTask = detail / character-analysis.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần I', 'Đọc hiểu văn bản nghị luận / thông tin', 'Kiểm tra năng lực xác định luận điểm, lí lẽ, dẫn chứng, thao tác lập luận và bài học thực tiễn.', '["luận điểm","dẫn chứng","từ khóa","hậu quả / bài học"]'::jsonb, '["single-choice","short-answer","multi-part"]'::jsonb, 'Nên lưu thêm metadata.textGenre = argument hoặc informative để phân biệt với văn bản văn học.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần II', 'Tiếng Việt thực hành', 'Biện pháp tu từ, thành phần câu, liên kết, nghĩa tường minh/hàm ý, từ Hán Việt và thành ngữ.', '["biện pháp tu từ","thành phần biệt lập","nghĩa từ","liên kết câu"]'::jsonb, '["single-choice","short-answer"]'::jsonb, 'Có thể gắn metadata.literatureTask = rhetoric hoặc vocabulary để lọc nhanh theo chuyên đề.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần III', 'Nghị luận xã hội', 'Viết bài khoảng 500 chữ về một giá trị sống, hiện tượng đời sống hoặc thông điệp rút ra từ đọc hiểu.', '["giải thích","phân tích ý nghĩa","phản đề","bài học hành động"]'::jsonb, '["short-answer","multi-part"]'::jsonb, 'Mỗi đề nên lưu dàn ý gợi ý trong solutionSteps và key words trong correctAnswer để hỗ trợ chấm rubric.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần IV', 'Nghị luận văn học - thơ', 'Cảm nhận đoạn thơ, hình ảnh, nhịp điệu, giọng điệu, khát vọng và liên hệ trách nhiệm thế hệ trẻ.', '["cảm nhận đoạn thơ","hình ảnh nghệ thuật","khát vọng sống","liên hệ"]'::jsonb, '["short-answer","multi-part"]'::jsonb, 'Nên tách metadata.literatureTask = poetry-analysis và solutionSteps theo bố cục mở bài - thân bài - kết bài.');
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES ('literature', 'Phần IV', 'Nghị luận văn học - truyện ngắn', 'Phân tích nhân vật, tình huống truyện, chi tiết nghệ thuật, giá trị hiện thực và nhân đạo.', '["phân tích nhân vật","chi tiết nghệ thuật","tình huống truyện","giá trị tác phẩm"]'::jsonb, '["short-answer","multi-part"]'::jsonb, 'Mỗi câu nên lưu metadata.literatureTask = character-analysis hoặc prose-analysis để UI và import hiểu đúng dạng.');
