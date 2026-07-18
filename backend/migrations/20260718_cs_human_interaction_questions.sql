-- SQL migration to seed 100 question bank for cs_human_interaction (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_human_interaction (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_human_interaction';

-- ======================================================================================
-- BÀI GIẢNG 1: Robot cộng tác (Cobots) & Tiêu chuẩn an toàn ISO/TS 15066 (cs_humint_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_001', 'mcq', 'cobot-safety',
    'Robot cộng tác (Cobot) khác biệt thế nào so với robot công nghiệp truyền thống?',
    ARRAY['Được thiết kế để làm việc chung không gian trực tiếp với con người mà không cần hàng rào bảo vệ sắt ngăn cách', 'Không tiêu hao điện năng', 'Không thể di chuyển cánh tay', 'Chỉ dùng để trang trí nhà xưởng'],
    ARRAY['Được thiết kế để làm việc chung không gian trực tiếp với con người mà không cần hàng rào bảo vệ sắt ngăn cách']::varchar[],
    'Cobots tích hợp sẵn các cảm biến lực và tính năng an toàn để chia sẻ không gian làm việc với người.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_002', 'mcq', 'cobot-safety',
    'Tiêu chuẩn quốc tế nào quy định nghiêm ngặt các giới hạn lực và áp lực va chạm của robot cộng tác?',
    ARRAY['ISO/TS 15066', 'ISO 9001', 'RFC 1918', 'IEEE 802.11'],
    ARRAY['ISO/TS 15066']::varchar[],
    'ISO/TS 15066 định nghĩa ma trận giới hạn lực va chạm cho phép trên các bộ phận cơ thể người.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_003', 'mcq', 'cobot-safety',
    'Chế độ an toàn PFL (Power and Force Limiting) của Cobots hoạt động ra sao khi va chạm?',
    ARRAY['Robot lập tức dừng khựng lại khi phát hiện lực cản va chạm vượt quá ngưỡng an toàn đã cài đặt', 'Robot tự động tăng mô-men động cơ để đẩy vật cản ra', 'Robot đi lùi hết tốc lực', 'Robot tự động báo động bằng còi cảnh sát'],
    ARRAY['Robot lập tức dừng khựng lại khi phát hiện lực cản va chạm vượt quá ngưỡng an toàn đã cài đặt']::varchar[],
    'PFL đo dòng điện hoặc lực tại khớp để phát hiện chạm nhẹ và dừng ngắt an toàn nhanh chóng.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_004', 'mcq', 'cobot-safety',
    'Yêu cầu thiết kế cơ khí bên ngoài bắt buộc của robot cộng tác để tránh chấn thương cho người là gì?',
    ARRAY['Các góc cạnh phải được bo tròn mềm mại và không có khe hở gây kẹt ngón tay', 'Thân robot phải sơn màu đỏ rực', 'Robot phải có kích thước khổng lồ', 'Sử dụng toàn bộ bánh răng nhựa'],
    ARRAY['Các góc cạnh phải được bo tròn mềm mại và không có khe hở gây kẹt ngón tay']::varchar[],
    'Bo tròn cạnh phân bổ lực va chạm đều, tránh tập trung áp lực nhọn gây rách da.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_005', 'mcq', 'cobot-safety',
    'Lực va chạm tối đa được khuyến cáo đối với vùng cánh tay người theo ISO/TS 15066 là khoảng bao nhiêu?',
    ARRAY['140 N đến 150 N', '10 N', '1000 N', '500 N'],
    ARRAY['140 N đến 150 N']::varchar[],
    'Giới hạn lực va chạm vùng tay là 140-150N để bảo đảm không gây chấn thương nghiêm trọng cho công nhân.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_006', 'mcq', 'cobot-safety',
    'Các dòng cánh tay robot UR (Universal Robots) là đại diện điển hình cho loại robot nào?',
    ARRAY['Robot cộng tác (Cobots)', 'Robot tự hành dưới nước', 'Robot humanoid đi bằng 2 chân', 'Drone thám hiểm rừng rậm'],
    ARRAY['Robot cộng tác (Cobots)']::varchar[],
    'Universal Robots là hãng tiên phong đi đầu sản xuất dòng Cobots thương mại.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_007', 'mcq', 'cobot-safety',
    'Tại sao Cobots lại được trang bị lớp da cảm biến điện dung (Tactile Skin)?',
    ARRAY['Để phát hiện sự tiếp cận gần hoặc va chạm của con người trên toàn bộ diện tích thân robot', 'Để robot giữ ấm thăng bằng', 'Để đo đạc nhiệt độ môi trường', 'Để hiển thị biểu tượng cảm xúc'],
    ARRAY['Để phát hiện sự tiếp cận gần hoặc va chạm của con người trên toàn bộ diện tích thân robot']::varchar[],
    'Da xúc giác điện dung cảm nhận sự thay đổi điện trường khi tay người tới sát để robot chủ động tránh tránh hoặc dừng.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_008', 'mcq', 'cobot-safety',
    'Khi robot cộng tác hoạt động ở chế độ PFL, nếu ta giảm khối lượng tải gá kẹp, lực va chạm tối đa đo được khi va quẹt sẽ thay đổi thế nào?',
    ARRAY['Giảm đi (do động năng của toàn hệ thống giảm)', 'Tăng lên', 'Giữ nguyên không đổi', 'Trở về bằng 0'],
    ARRAY['Giảm đi (do động năng của toàn hệ thống giảm)']::varchar[],
    'Động năng $E_k = 0.5 m v^2$, khối lượng m giảm làm giảm lực va quẹt cơ học.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_009', 'short-answer', 'cobot-safety',
    'Điền tên viết tắt tiếng Anh của loại robot thiết kế để làm việc cộng tác chung không gian với người. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Cobot', 'Cobots']::varchar[],
    'Cobots là Collaborative Robots.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_01'
  ),
  (
    'cs_humint_q_010', 'short-answer', 'cobot-safety',
    'Điền tên viết tắt tiếng Anh của chế độ an toàn hạn chế lực và công suất của robot cộng tác. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PFL']::varchar[],
    'PFL là Power and Force Limiting.',
    6, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Hiện tượng Thung lũng kỳ lạ (Uncanny Valley) (cs_humint_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_011', 'mcq', 'uncanny-social',
    'Hiện tượng "Thung lũng kỳ lạ" (Uncanny Valley) mô tả điều gì trong tâm lý học robot?',
    ARRAY['Sự sụt giảm đột ngột mức độ thiện cảm của con người đối với robot khi diện mạo robot đạt mức gần giống hệt người nhưng vẫn có chi tiết lỗi giả tạo', 'Sự mất tín hiệu định vị trong thung lũng sâu', 'Nỗi sợ hãi của robot đối với con người', 'Hiện tượng quá nhiệt của động cơ servo'],
    ARRAY['Sự sụt giảm đột ngột mức độ thiện cảm của con người đối với robot khi diện mạo robot đạt mức gần giống hệt người nhưng vẫn có chi tiết lỗi giả tạo']::varchar[],
    'Thung lũng kỳ lạ mô tả cảm giác ghê sợ rờn rợn đối với thực thể gần giống người nhưng không hoàn hảo.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_012', 'mcq', 'uncanny-social',
    'Ai là người đầu tiên giới thiệu khái niệm Thung lũng kỳ lạ vào lĩnh vực Robotics vào năm 1970?',
    ARRAY['Masahiro Mori', 'Nikola Tesla', 'Alan Turing', 'Isaac Asimov'],
    ARRAY['Masahiro Mori']::varchar[],
    'Giáo sư Masahiro Mori của Nhật Bản đã vẽ đồ thị quan hệ giữa mức độ giống người và mức thiện cảm xã hội.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_013', 'mcq', 'uncanny-social',
    'Yếu tố biểu cảm gương mặt nào của robot humanoid dễ đẩy con người vào thung lũng kỳ lạ nhất?',
    ARRAY['Ánh mắt đứng im vô hồn đờ đẫn (dead stare) trong khi các phần cơ mặt khác vẫn cử động nói', 'Màu da robot bị sơn màu hồng', 'Giọng nói phát ra bằng tiếng robot cơ khí', 'Robot di chuyển bằng bánh xe'],
    ARRAY['Ánh mắt đứng im vô hồn đờ đẫn (dead stare) trong khi các phần cơ mặt khác vẫn cử động nói']::varchar[],
    'Sự thiếu đồng bộ biểu cảm vi mô (micro-expressions) của cơ vùng mắt tạo cảm giác xác sống giả tạo.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_014', 'mcq', 'uncanny-social',
    'Để tránh rơi vào thung lũng kỳ lạ, các kỹ sư thiết kế robot dịch vụ công cộng thường làm gì?',
    ARRAY['Thiết kế diện mạo robot mang phong cách hoạt hình (mô phỏng máy thân thiện đáng yêu) thay vì cố bắt chước da mặt người thật', 'Chế tạo robot to hơn gấp 10 lần', 'Bọc toàn bộ robot bằng cao su đen', 'Tắt tính năng xoay đầu robot'],
    ARRAY['Thiết kế diện mạo robot mang phong cách hoạt hình (mô phỏng máy thân thiện đáng yêu) thay vì cố bắt chước da mặt người thật']::varchar[],
    'Phong cách hoạt hình tạo kỳ vọng thấp về diện mạo sinh học sinh học, tăng độ chấp nhận thiện cảm của người đối diện.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_015', 'mcq', 'uncanny-social',
    'Tại sao cử động chuyển động giật cục (robotic motion) của robot humanoid có diện mạo giống người thật lại gây sợ hãi hơn robot máy?',
    ARRAY['Vì nó tạo ra sự mâu thuẫn nhận thức (cognitive dissonance) trong não người giữa thực thể sống và cỗ máy vô tri', 'Vì nó làm tốn nhiều pin hơn', 'Vì nó làm hỏng động cơ mặt', 'Do robot dễ bị đổ ngã'],
    ARRAY['Vì nó tạo ra sự mâu thuẫn nhận thức (cognitive dissonance) trong não người giữa thực thể sống và cỗ máy vô tri']::varchar[],
    'Não người nhạy bén nhận diện cử động sinh học tự nhiên, cử động cơ khí trên mặt giống người báo hiệu trạng thái bệnh tật/dị dạng ghê sợ.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_016', 'mcq', 'uncanny-social',
    'Trạng thái thiện cảm của con người đối với robot robot máy móc hoàn toàn (ví dụ robot hút bụi Roomba) nằm ở vị trí nào trên đồ thị Masahiro Mori?',
    ARRAY['Nằm ở mức thấp trung bình và tăng dần đều khi robot tỏ ra thông minh, hữu ích hữu ích', 'Nằm ở đáy thung lũng kỳ lạ', 'Nằm ở đỉnh cao nhất của đồ thị giống người', 'Bằng 0 vĩnh viễn'],
    ARRAY['Nằm ở mức thấp trung bình và tăng dần đều khi robot tỏ ra thông minh, hữu ích hữu ích']::varchar[],
    'Robot công nghiệp/hút bụi không kích hoạt cơ chế nhận dạng giống người của não nên không gây ghê sợ.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_017', 'mcq', 'uncanny-social',
    'Tại sao robot Sophia của Hanson Robotics lại nhận được nhiều đánh giá trái chiều về mặt tâm lý xã hội?',
    ARRAY['Vì diện mạo khuôn mặt silicon biểu cảm gần giống người nhưng đầu phía sau lộ mạch điện và cử động còn đơ cứng', 'Vì Sophia không biết nói tiếng Anh', 'Vì Sophia di chuyển quá nhanh', 'Do Sophia chỉ hoạt động dưới nước'],
    ARRAY['Vì diện mạo khuôn mặt silicon biểu cảm gần giống người nhưng đầu phía sau lộ mạch điện và cử động còn đơ cứng']::varchar[],
    'Sự giao thoa nửa người nửa máy đẩy Sophia đứng sát mép bờ dốc thung lũng kỳ lạ đối với nhiều người quan sát.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_018', 'mcq', 'uncanny-social',
    'Lợi ích lớn nhất của việc thiết kế robot đồng hành thân thiện dạng thú cưng (như AIBO, Paro) là gì?',
    ARRAY['Tránh hoàn toàn thung lũng kỳ lạ mặt người và dễ kích hoạt bản năng chăm sóc vuốt ve của con người', 'Tiết kiệm 90% chi phí cơ khí', 'Không cần dùng lập trình điều khiển động học', 'Robot tự tìm được mồi ăn ngoài đời'],
    ARRAY['Tránh hoàn toàn thung lũng kỳ lạ mặt người và dễ kích hoạt bản năng chăm sóc vuốt ve của con người']::varchar[],
    'Động vật thân thiện dễ tạo kết nối cảm xúc xã hội nhanh hơn robot hình nhân.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_019', 'short-answer', 'uncanny-social',
    'Điền tên tiếng Việt của hiện tượng sụt giảm thiện cảm khi robot quá giống người nhưng chưa hoàn hảo. (Viết thường có khoảng trắng và dấu)',
    NULL,
    ARRAY['thung lũng kỳ lạ']::varchar[],
    'Thung lũng kỳ lạ là Uncanny Valley.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_02'
  ),
  (
    'cs_humint_q_020', 'short-answer', 'uncanny-social',
    'Điền họ của giáo sư người Nhật vẽ đồ thị Uncanny Valley đầu tiên năm 1970. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Mori']::varchar[],
    'Giáo sư Masahiro Mori.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Giao diện Người - Robot vật lý: Nút dừng khẩn cấp E-Stop & Teach Pendant (cs_humint_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_021', 'mcq', 'cobot-safety',
    'Tại sao nút dừng khẩn cấp E-Stop bắt buộc phải ngắt điện cấp trực tiếp qua mạch rơ-le cứng thay vì ngắt bằng lệnh phần mềm máy tính?',
    ARRAY['Để bảo đảm dừng robot lập tức kể cả khi hệ điều hành máy tính bị treo cứng hoặc lỗi phần mềm không phản hồi', 'Để bảo vệ nút nhấn không bị hỏng', 'Để tiết kiệm dây điện đấu nối', 'Do quy luật từ trường'],
    ARRAY['Để bảo đảm dừng robot lập tức kể cả khi hệ điều hành máy tính bị treo cứng hoặc lỗi phần mềm không phản hồi']::varchar[],
    'Ngắt nguồn trực tiếp bằng phần cứng cơ-điện bảo đảm độ tin cậy an toàn cao nhất.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_022', 'mcq', 'cobot-safety',
    'Nút dừng khẩn cấp E-Stop chuẩn công nghiệp có hình dáng và màu sắc đặc trưng thế nào?',
    ARRAY['Nút nhấn màu đỏ hình nấm trên nền màu vàng nổi bật', 'Nút bấm vuông màu xanh lá', 'Công tắc gạt nhỏ màu đen', 'Đèn LED nhấp nháy liên tục'],
    ARRAY['Nút nhấn màu đỏ hình nấm trên nền màu vàng nổi bật']::varchar[],
    'Hình nấm đỏ giúp người vận hành đập tay nhấn cực nhanh từ mọi hướng trong hoảng loạn.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_023', 'mcq', 'cobot-safety',
    'Nút bóp ba vị trí Deadman Switch trên bàn dạy học Teach Pendant hoạt động theo nguyên lý nào?',
    ARRAY['Cho phép robot chạy thủ công ở nấc bóp giữa; robot lập tức dừng nếu người buông lỏng tay hoàn toàn hoặc bóp chặt hết cỡ', 'Chỉ hoạt động khi bấm liên tục', 'Đóng ngắt nguồn bằng điều khiển giọng nói', 'Tự động tính góc quay khớp'],
    ARRAY['Cho phép robot chạy thủ công ở nấc bóp giữa; robot lập tức dừng nếu người buông lỏng tay hoàn toàn hoặc bóp chặt hết cỡ']::varchar[],
    'Thiết kế dựa trên phản xạ tự nhiên của con người khi hoảng sợ (hoặc buông xuôi tay hoặc co quắp bóp chặt lấy thiết bị).',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_024', 'mcq', 'cobot-safety',
    'Thao tác "Jogging" trên bàn dạy học Teach Pendant được hiểu là gì?',
    ARRAY['Điều khiển robot di chuyển thủ công từng khớp hoặc theo hệ tọa độ Descartes để lưu các điểm mốc quỹ đạo', 'Chạy thử phần mềm mô phỏng ảo', 'Lau chùi bôi trơn cho hộp số', 'Nạp firmware nhúng vào MCU'],
    ARRAY['Điều khiển robot di chuyển thủ công từng khớp hoặc theo hệ tọa độ Descartes để lưu các điểm mốc quỹ đạo']::varchar[],
    'Jogging giúp kỹ sư dắt tay robot đến tọa độ gá kẹp thực tế chính xác.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_025', 'mcq', 'cobot-safety',
    'Hành vi nhả nút E-Stop (reset E-Stop) sau khi nhấn có tự động làm cánh tay robot tiếp tục chuyển động cũ hay không?',
    ARRAY['Không, nhả E-Stop chỉ khôi phục nguồn điện cho driver; robot phải được ra lệnh thủ công khởi chạy lại từ chương trình chính', 'Có, robot chạy tiếp tức thì', 'Robot tự động quay về gốc Home', 'Động cơ tự động xả phanh cơ học'],
    ARRAY['Không, nhả E-Stop chỉ khôi phục nguồn điện cho driver; robot phải được ra lệnh thủ công khởi chạy lại từ chương trình chính']::varchar[],
    'Mục tiêu an toàn nghiêm ngặt ngăn robot tự ý di chuyển bất ngờ gây va chạm lại.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_026', 'mcq', 'cobot-safety',
    'Mục đích của việc thiết kế cơ cấu tự khóa (latching) của nút E-Stop khi nhấn vào là gì?',
    ARRAY['Để giữ trạng thái ngắt điện vĩnh viễn đến khi người vận hành chủ động xoay nhả nút khóa để chạy lại', 'Để nút không bị nẩy ra gây mỏi tay', 'Để tiết kiệm điện năng cho mạch rơ-le', 'Do cấu tạo bánh răng xoay'],
    ARRAY['Để giữ trạng thái ngắt điện vĩnh viễn đến khi người vận hành chủ động xoay nhả nút khóa để chạy lại']::varchar[],
    'Nút khóa cứng bảo đảm trạng thái an toàn được duy trì vĩnh viễn đến khi sự cố được khắc phục xong xuôi và xác nhận thủ công.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_027', 'mcq', 'cobot-safety',
    'Đèn tháp báo trạng thái (Signal Tower Light) 3 màu trên robot công nghiệp thường quy định màu Đỏ biểu thị trạng thái nào?',
    ARRAY['Robot gặp sự cố nghiêm trọng hoặc đang dừng khẩn cấp E-Stop', 'Robot đang hoạt động tự động bình thường', 'Robot đang chờ nạp phôi', 'Robot đang sạc pin'],
    ARRAY['Robot gặp sự cố nghiêm trọng hoặc đang dừng khẩn cấp E-Stop']::varchar[],
    'Màu đỏ đại diện cho dừng khẩn, màu xanh đại diện cho đang chạy tự động, màu vàng đại diện cho lỗi cảnh báo nhẹ.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_028', 'mcq', 'cobot-safety',
    'Tại sao bàn dạy học Teach Pendant hiện đại thường kết nối cáp dây thay vì không dây hoàn toàn bằng wifi?',
    ARRAY['Để tránh nguy cơ mất kết nối không dây đột ngột hoặc nhiễu tần số làm mất kiểm soát dừng an toàn của robot', 'Vì cáp dây truyền điện thế 220V', 'Vì kết nối không dây đắt tiền hơn', 'Do wifi không chạy được trên Linux'],
    ARRAY['Để tránh nguy cơ mất kết nối không dây đột ngột hoặc nhiễu tần số làm mất kiểm soát dừng an toàn của robot']::varchar[],
    'Kết nối dây bảo đảm đường tín hiệu nút Deadman và E-Stop đi kèm luôn liên tục, tránh rủi ro mất gói tin vô tuyến.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_029', 'short-answer', 'cobot-safety',
    'Điền tên nút dừng khẩn cấp viết bằng tiếng Anh có dấu gạch ngang ở giữa. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['E-STOP']::varchar[],
    'E-Stop là Emergency Stop.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_03'
  ),
  (
    'cs_humint_q_030', 'short-answer', 'cobot-safety',
    'Điền tên thiết bị cầm tay dùng lập trình dạy học tọa độ điểm cho robot công nghiệp. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Teach Pendant']::varchar[],
    'Teach Pendant là thiết bị cầm tay dạy học robot.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Ước lượng dáng người (Human Pose Estimation) trong điều khiển Robot (cs_humint_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_031', 'mcq', 'multimodal-interaction',
    'Tác vụ "Human Pose Estimation" (Ước lượng dáng người) làm nhiệm vụ gì trong thị giác máy tính?',
    ARRAY['Nhận diện và xác định tọa độ các điểm mốc khớp xương chính trên cơ thể người thời gian thực', 'Đo đạc nhịp tim của con người từ xa', 'Dự đoán chiều cao cân nặng của người đi bộ', 'Đo đạc nhiệt độ cơ thể người'],
    ARRAY['Nhận diện và xác định tọa độ các điểm mốc khớp xương chính trên cơ thể người thời gian thực']::varchar[],
    'Pose estimation tìm các keypoint khớp xương để xác định tư thế đứng nằm của con người.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_032', 'mcq', 'multimodal-interaction',
    'Thư viện mã nguồn mở nào của Google cung cấp mô hình Pose/Hand tracking siêu nhẹ chạy thời gian thực trên CPU?',
    ARRAY['MediaPipe', 'OpenCV', 'PCL', 'Gazebo'],
    ARRAY['MediaPipe']::varchar[],
    'MediaPipe của Google tích hợp các mô hình học sâu tối ưu hóa cao cho thiết bị di động, ARM CPU.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_033', 'mcq', 'multimodal-interaction',
    'Ứng dụng "Teleoperation" (Điều khiển từ xa) cánh tay robot bằng camera hoạt động ra sao?',
    ARRAY['Ánh xạ góc quay các khớp xương người di chuyển được đo bởi camera sang góc quay tương ứng của khớp robot', 'Robot tự động bắt chước nói giọng người', 'Robot tự động sạc pin khi người đi nghỉ', 'Robot tự động lập bản đồ phòng'],
    ARRAY['Ánh xạ góc quay các khớp xương người di chuyển được đo bởi camera sang góc quay tương ứng của khớp robot']::varchar[],
    'Teleoperation giúp người dùng múa tay trước camera để điều khiển trực quan tay gá kẹp robot từ xa.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_034', 'mcq', 'multimodal-interaction',
    'Sự cố "Self-occlusion" (Tự che khuất) gây khó khăn gì cho thuật toán nhận diện dáng người của robot?',
    ARRAY['Một bộ phận cơ thể bị khuất sau bộ phận khác dưới góc nhìn camera làm biến mất điểm mốc tọa độ khớp', 'Màu áo trùng với màu tường nhà', 'Người đeo găng tay cao su màu đen', 'Người di chuyển quá nhanh vượt tần số quét'],
    ARRAY['Một bộ phận cơ thể bị khuất sau bộ phận khác dưới góc nhìn camera làm biến mất điểm mốc tọa độ khớp']::varchar[],
    'Ví dụ: cánh tay che mất khớp vai $\rightarrow$ self-occlusion đòi hỏi mô hình ước lượng xác suất tư thế bù đắp.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_035', 'mcq', 'multimodal-interaction',
    'Để khôi phục tọa độ các điểm mốc khớp xương bị che khuất tạm thời khi robot di động di chuyển, người ta thường dùng thuật toán lọc số nào?',
    ARRAY['Lọc Kalman (Kalman Filter) dựa trên mô hình động học chuyển động người', 'Bộ phát hiện cạnh Canny', 'Bộ lọc Gaussian Blur', 'Biến đổi phối cảnh Homography'],
    ARRAY['Lọc Kalman (Kalman Filter) dựa trên mô hình động học chuyển động người']::varchar[],
    'Kalman Filter dự đoán vị trí keypoint tiếp theo dựa vào vận tốc chuyển động trước đó khi cảm biến mất dấu.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_036', 'mcq', 'multimodal-interaction',
    'Mô hình MediaPipe Pose xuất ra bao nhiêu điểm mốc (keypoints) cơ thể người?',
    ARRAY['33 điểm mốc', '10 điểm', '128 điểm', '1000 điểm'],
    ARRAY['33 điểm mốc']::varchar[],
    'Mô hình BlazePose của MediaPipe theo dõi 33 tọa độ khớp xương 3D trên cơ thể người.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_037', 'mcq', 'multimodal-interaction',
    'Mô hình MediaPipe Hands theo dõi bao nhiêu điểm mốc trên một bàn tay?',
    ARRAY['21 điểm mốc', '33 điểm', '5 điểm', '12 điểm'],
    ARRAY['21 điểm mốc']::varchar[],
    '21 keypoints gồm các khớp ngón tay và đầu ngón tay cho phép nhận diện cử chỉ bàn tay mịn màng.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_038', 'mcq', 'multimodal-interaction',
    'Việc điều khiển robot bằng cử chỉ cơ thể người từ xa qua camera đòi hỏi độ phân giải hình ảnh thế nào?',
    ARRAY['Độ phân giải trung bình (như 640x480) để chạy mạng neuron thời gian thực tốc độ cao (>30 FPS) trên CPU nhúng', 'Bắt buộc độ phân giải 8K cực nét', 'Chỉ cần ảnh xám 10x10 pixel', 'Không phụ thuộc độ phân giải'],
    ARRAY['Độ phân giải trung bình (như 640x480) để chạy mạng neuron thời gian thực tốc độ cao (>30 FPS) trên CPU nhúng']::varchar[],
    'Tốc độ đáp ứng FPS quan trọng hơn độ nét ảnh cao vốn ngốn ngốn sạch RAM và làm nóng vi xử lý nhúng.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_039', 'short-answer', 'multimodal-interaction',
    'Điền tên thư viện nhận diện mốc cơ thể người thời gian thực siêu nhẹ của Google. (Viết hoa chữ M và P ở giữa)',
    NULL,
    ARRAY['MediaPipe']::varchar[],
    'MediaPipe chạy rất nhanh trên CPU.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_04'
  ),
  (
    'cs_humint_q_040', 'short-answer', 'multimodal-interaction',
    'Điền từ tiếng Anh chỉ kỹ thuật điều khiển robot từ xa bằng cách bắt chước động tác của con người. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Teleoperation']::varchar[],
    'Teleoperation giúp điều khiển từ xa.',
    6, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Tương tác giọng nói tự nhiên trong môi trường công nghiệp (cs_humint_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_041', 'mcq', 'multimodal-interaction',
    'Thử thách lớn nhất của việc nhận dạng giọng nói (ASR) của robot trong môi trường nhà máy là gì?',
    ARRAY['Tiếng ồn công nghiệp cường độ lớn làm méo dạng sóng giọng nói của con người', 'Robot không có bộ nhớ chứa từ vựng', 'Tiếng Việt quá phức tạp để dịch nhị phân', 'Do robot không có loa phát âm thanh'],
    ARRAY['Tiếng ồn công nghiệp cường độ lớn làm méo dạng sóng giọng nói của con người']::varchar[],
    'Tiếng động cơ, búa gập có biên độ lớn lấn át hoàn toàn phổ âm thanh giọng nói.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_042', 'mcq', 'multimodal-interaction',
    'Phương pháp lọc nhiễu "Microphone Array Beamforming" hoạt động thế nào?',
    ARRAY['Sử dụng nhiều micro đo chênh lệch thời gian nhận sóng âm để triệt tiêu nhiễu ngoài hướng, chỉ tập trung thu âm từ hướng người nói', 'Sử dụng tụ điện cực lớn lọc nguồn', 'Xoay robot về phía tiếng ồn', 'Tự động ngắt mic khi có tiếng ồn'],
    ARRAY['Sử dụng nhiều micro đo chênh lệch thời gian nhận sóng âm để triệt tiêu nhiễu ngoài hướng, chỉ tập trung thu âm từ hướng người nói']::varchar[],
    'Beamforming định hướng búp sóng thu âm ảo về phía miệng người dùng, loại bỏ các tiếng vọng rìa.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_043', 'mcq', 'multimodal-interaction',
    'Bộ xử lý KWS (Keyword Spotting) trên robot thực hiện nhiệm vụ gì?',
    ARRAY['Chạy mạng neuron nhỏ ở chế độ chờ liên tục, lắng nghe từ khóa kích hoạt để đánh thức chương trình xử lý chính', 'Tự động tính góc quay khớp vai', 'Tìm kiếm thông tin trên google', 'Đăng ký địa chỉ IP cho robot'],
    ARRAY['Chạy mạng neuron nhỏ ở chế độ chờ liên tục, lắng nghe từ khóa kích hoạt để đánh thức chương trình xử lý chính']::varchar[],
    'KWS giúp tiết kiệm cực lớn điện năng pin vì chỉ chạy mạng xử lý ngôn ngữ lớn (NLU) khi có lệnh gọi trực tiếp.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_044', 'mcq', 'multimodal-interaction',
    'Tác vụ NLU (Natural Language Understanding) thực hiện vai trò gì trong chuỗi tương tác giọng nói?',
    ARRAY['Phân tích cú pháp câu nói tự nhiên để hiểu ý định (intent) và trích xuất tham số lệnh chuyển cho robot', 'Chuyển văn bản thành tiếng nói phát ra loa', 'Lọc bỏ nhiễu gió của micro', 'Tính ma trận quay Quaternion'],
    ARRAY['Phân tích cú pháp câu nói tự nhiên để hiểu ý định (intent) và trích xuất tham số lệnh chuyển cho robot']::varchar[],
    'NLU chuyển đổi tiếng người thô thành câu trúc lệnh JSON mà robot có thể gọi API thực hiện.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_045', 'mcq', 'multimodal-interaction',
    'Đại lượng TDoA (Time Difference of Arrival) dùng trong mảng micro để làm gì?',
    ARRAY['Đo chênh lệch thời gian sóng âm tới các micro khác nhau để suy ra góc hướng nguồn phát âm thanh', 'Đo đạc chu kỳ sạc pin', 'Tính toán sai số odometry', 'Tính góc bẻ lái xe đạp'],
    ARRAY['Đo chênh lệch thời gian sóng âm tới các micro khác nhau để suy ra góc hướng nguồn phát âm thanh']::varchar[],
    'TDoA là nền tảng hình học để mảng micro định vị hướng người nói trong không gian.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_046', 'mcq', 'multimodal-interaction',
    'Tại sao robot công nghiệp cần phản hồi bằng giọng nói TTS (Text-to-Speech)?',
    ARRAY['Để thông báo các lỗi vận hành hoặc trạng thái nhẹ bằng giọng tiếng Việt thân thiện giúp người dùng không phải nhìn màn hình', 'Để robot nói chuyện phiếm giải trí', 'Để tăng mô-men quay của các khớp', 'Để cách ly nguồn điện công suất'],
    ARRAY['Để thông báo các lỗi vận hành hoặc trạng thái nhẹ bằng giọng tiếng Việt thân thiện giúp người dùng không phải nhìn màn hình']::varchar[],
    'TTS phát thông báo sự cố bằng lời nói rõ ràng giúp công nhân rảnh tay xử lý, tăng trải nghiệm an toàn.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_047', 'mcq', 'multimodal-interaction',
    'Từ khóa kích hoạt (Wake-up word) được chọn cho robot công nghiệp cần thỏa mãn điều kiện gì?',
    ARRAY['Phải có cấu trúc âm tiết độc đáo, không trùng lặp với các từ giao tiếp thông thường để tránh kích hoạt giả', 'Càng ngắn càng tốt (như "A", "B")', 'Là một câu thơ dài dài', 'Thay đổi ngẫu nhiên mỗi giờ'],
    ARRAY['Phải có cấu trúc âm tiết độc đáo, không trùng lặp với các từ giao tiếp thông thường để tránh kích hoạt giả']::varchar[],
    'Từ khóa độc đáo giúp giảm thiểu tỷ lệ kích hoạt nhầm (false positives) gây nguy hiểm hoạt động ngoài ý muốn.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_048', 'mcq', 'multimodal-interaction',
    'Khi robot nhận được lệnh thoại tự nhiên "Đi tới cổng sạc nhanh ngay lập tức", NLU trích xuất ý định (Intent) và thực thể (Entity) tương ứng là gì?',
    ARRAY['Intent: \"go_to\", Entity: \"cổng sạc nhanh\"', 'Intent: \"sạc pin\", Entity: \"ngay lập tức\"', 'Intent: \"tốc độ\", Entity: \"cổng sạc\"', 'Không trích xuất được'],
    ARRAY['Intent: \"go_to\", Entity: \"cổng sạc nhanh\"']::varchar[],
    'Trích xuất cấu trúc giúp chuyển thành lệnh gọi ROS2 Action `/navigate_to_pose` đến tọa độ cổng sạc.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_049', 'short-answer', 'multimodal-interaction',
    'Điền tên viết tắt tiếng Anh của công nghệ chuyển đổi giọng nói nói sang văn bản chữ viết. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ASR', 'STT']::varchar[],
    'ASR là Automatic Speech Recognition.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_05'
  ),
  (
    'cs_humint_q_050', 'short-answer', 'multimodal-interaction',
    'Điền tên viết tắt tiếng Anh của tác vụ hiểu ngôn ngữ tự nhiên cấp độ intent/entity. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['NLU']::varchar[],
    'NLU là Natural Language Understanding.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Thiết lập vùng bảo vệ ảo (Safety Zones) bằng LiDAR an toàn (cs_humint_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_061', 'mcq', 'safe-zones',
    'LiDAR an toàn (Safety Laser Scanner) thường được cấu hình quét song song với mặt đất ở độ cao bao nhiêu để phát hiện chân người?',
    ARRAY['Khoảng 15 cm cách mặt đất', 'Khoảng 2 mét cách mặt đất', 'Sát mặt đất 1mm', 'Quét hướng thẳng đứng lên trời'],
    ARRAY['Khoảng 15 cm cách mặt đất']::varchar[],
    'Cao 15cm tránh quét trượt chân người khi đi hoặc bước bước dài và tránh các bụi bẩn nhiễu dưới sàn.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_062', 'mcq', 'safe-zones',
    'Khi có người bước vào vùng cảnh báo xa "Warning Zone" của robot tự hành, phản ứng của hệ thống là gì?',
    ARRAY['Phát cảnh báo bằng đèn vàng, còi báo động và giảm tốc độ robot đi khoảng 50%', 'Lập tức ngắt điện phanh dừng khựng xe', 'Chạy lùi hết tốc lực để bỏ chạy', 'Tự động gửi email báo cáo sự cố'],
    ARRAY['Phát cảnh báo bằng đèn vàng, còi báo động và giảm tốc độ robot đi khoảng 50%']::varchar[],
    'Cảnh báo xa giúp con người tự ý thức tránh đường mà không cần dừng đột ngột giật cục xe gây hao pin.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_063', 'mcq', 'safe-zones',
    'Điều gì xảy ra khi có người xâm nhập vào vùng dừng tuyệt đối "Stop Zone" sát thân robot tự hành?',
    ARRAY['Kích hoạt phanh điện từ ngắt nguồn động cơ lập tức dừng cứng robot trong mili-giây', 'Robot tự động đánh lái sang bên cạnh', 'Robot phát giọng nói nhắc nhở', 'Đèn LED chuyển sang màu xanh lá'],
    ARRAY['Kích hoạt phanh điện từ ngắt nguồn động cơ lập tức dừng cứng robot trong mili-giây']::varchar[],
    'Stop Zone (thường cách 30-40cm) yêu cầu ngắt khẩn cấp để đảm bảo không đâm vào chân con người.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_064', 'mcq', 'safe-zones',
    'Tại sao kích thước của các vùng bảo vệ (Safety Fields) quanh robot tự hành cần được co giãn động theo vận tốc?',
    ARRAY['Tốc độ xe càng nhanh thì khoảng cách dừng phanh (quán tính) càng xa, đòi hỏi mở rộng vùng Stop Zone dài hơn về phía trước để đảm bảo an toàn', 'Để giảm lượng điện tiêu thụ', 'Để tránh lóa mắt LiDAR', 'Do phần cứng động cơ bắt buộc'],
    ARRAY['Tốc độ xe càng nhanh thì khoảng cách dừng phanh (quán tính) càng xa, đòi hỏi mở rộng vùng Stop Zone dài hơn về phía trước để đảm bảo an toàn']::varchar[],
    'Co giãn động bảo đảm phanh dừng kịp thời trước chướng ngại vật ở mọi dải tốc độ của AMR.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_065', 'mcq', 'safe-zones',
    'Đặc trưng mạch điện an toàn (Safety-rated inputs/outputs) của LiDAR an toàn công nghiệp là gì?',
    ARRAY['Thiết kế mạch kênh đôi song song tự đối chiếu chéo lỗi (Dual-channel OSSD outputs) tự ngắt ngắt khi có linh kiện hỏng', 'Chạy ở điện áp 220V', 'Không dùng dây dẫn', 'Tự động sạc pin ngược'],
    ARRAY['Thiết kế mạch kênh đôi song song tự đối chiếu chéo lỗi (Dual-channel OSSD outputs) tự ngắt ngắt khi có linh kiện hỏng']::varchar[],
    'OSSD (Output Signal Switching Device) bảo đảm bảo vệ lỗi đơn: một linh kiện hỏng vẫn ngắt xe an toàn (Fail-safe).',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_066', 'mcq', 'safe-zones',
    'Động năng va chạm tỷ lệ thế nào với vận tốc tiến của robot tự hành?',
    ARRAY['Tỷ lệ thuận với bình phương vận tốc (v^2)', 'Tỷ lệ thuận tuyến tính với v', 'Tỷ lệ nghịch với v', 'Không có quan hệ'],
    ARRAY['Tỷ lệ thuận với bình phương vận tốc (v^2)']::varchar[],
    'Động năng $E_k = 0.5 m v^2$, do đó giảm nửa vận tốc sẽ giảm lực chấn thương đi gấp 4 lần.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_067', 'mcq', 'safe-zones',
    'Khi LiDAR an toàn bị bụi bẩn che khuất hoàn toàn mắt kính quét, hệ thống an toàn sẽ phản ứng thế nào?',
    ARRAY['Tự động ngắt ngõ ra OSSD kích hoạt phanh dừng xe lập tức và báo lỗi cảnh báo bẩn kính', 'Vẫn tiếp tục di chuyển', 'Tăng công suất phát laser', 'Tự động chuyển sang camera'],
    ARRAY['Tự động ngắt ngõ ra OSSD kích hoạt phanh dừng xe lập tức và báo lỗi cảnh báo bẩn kính']::varchar[],
    'Nguyên tắc Fail-safe bắt buộc thiết bị phải chuyển sang trạng thái ngắt an toàn nhất khi mất kiểm soát.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_068', 'mcq', 'safe-zones',
    'Chứng chỉ an toàn công nghiệp cao cấp SIL3 (Safety Integrity Level) yêu cầu xác suất lỗi nghiêm trọng mỗi giờ của thiết bị nằm dưới ngưỡng nào?',
    ARRAY['Dưới 1 phần 10 triệu mỗi giờ (< 10^-7)', 'Dưới 10%', 'Dưới 1%', 'Bằng 0 tuyệt đối'],
    ARRAY['Dưới 1 phần 10 triệu mỗi giờ (< 10^-7)']::varchar[],
    'SIL3 cam kết xác suất lỗi nguy hại cực kỳ thấp, bảo đảm thiết bị hoạt động tin cậy trong môi trường công nghiệp nặng.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_069', 'short-answer', 'safe-zones',
    'Điền tên ngõ ra an toàn tự động đối chiếu chéo lỗi kênh đôi của LiDAR an toàn. (Viết tắt 4 chữ cái viết hoa)',
    NULL,
    ARRAY['OSSD']::varchar[],
    'OSSD bảo đảm ngắt an toàn.',
    7, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_06'
  ),
  (
    'cs_humint_q_070', 'short-answer', 'safe-zones',
    'Điền tên viết tắt tiếng Anh của cấp chứng chỉ tích hợp an toàn từ SIL1 đến SIL4. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SIL']::varchar[],
    'SIL là Safety Integrity Level.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Giao tiếp phi ngôn ngữ bằng ánh mắt của Robot (cs_humint_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_071', 'mcq', 'uncanny-social',
    'Tác vụ "Mutual Gaze" (Tương tác ánh mắt xã hội) yêu cầu robot thực hiện hành vi nào?',
    ARRAY['Quay đầu hoặc camera hướng trực tiếp thẳng về phía mắt người đối diện khi giao tiếp thoại để biểu lộ sự lắng nghe', 'Tắt hoàn toàn cụm camera đầu', 'Chớp mắt liên tục tần số 50Hz', 'Nhìn xuống đất tránh mặt'],
    ARRAY['Quay đầu hoặc camera hướng trực tiếp thẳng về phía mắt người đối diện khi giao tiếp thoại để biểu lộ sự lắng nghe']::varchar[],
    'Mutual Gaze biểu thị sự gắn kết tập trung giao tiếp xã hội tự nhiên.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_072', 'mcq', 'uncanny-social',
    'Tại sao robot tự hành cần thể hiện hành vi phi ngôn ngữ "Báo trước hướng di chuyển" (Intent Expression)?',
    ARRAY['Để con người đi đối diện dễ dàng đoán trước hướng cua của robot, tránh giật mình hoặc xung đột né tránh hỗn loạn', 'Để tăng tốc độ chạy của động cơ', 'Để tiết kiệm bộ nhớ RAM', 'Do luật giao thông đường bộ bắt buộc'],
    ARRAY['Để con người đi đối diện dễ dàng đoán trước hướng cua của robot, tránh giật mình hoặc xung đột né tránh hỗn loạn']::varchar[],
    'Thể hiện ý đồ hướng cua cua trước giúp con người di chuyển tự tin trong hành lang hẹp cùng robot.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_073', 'mcq', 'uncanny-social',
    'Hành vi "nháy mắt" hoặc "nghiêng đầu nhẹ" của robot hỗ trợ xã hội mang lại lợi ích tâm lý nào?',
    ARRAY['Tạo cảm giác thân thiện, sống động và có tính sinh học làm giảm bớt sự căng thẳng đề phòng của con người đối với cỗ máy', 'Giảm nhiệt độ cho vi xử lý', 'Tăng độ nhạy cảm biến LiDAR', 'Tự động reset vị trí robot'],
    ARRAY['Tạo cảm giác thân thiện, sống động và có tính sinh học làm giảm bốt sự căng thẳng đề phòng của con người đối với cỗ máy', 'Tạo cảm giác thân thiện, sống động và có tính sinh học làm giảm bớt sự căng thẳng đề phòng của con người đối với cỗ máy']::varchar[],
    'Micro-movements mô phỏng cử chỉ tự nhiên của cơ thể sống giúp tăng thiện cảm tin cậy.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_074', 'mcq', 'uncanny-social',
    'Robot tự hành AMR xi nhan hướng cua sinh học bằng cách nào trước khi bẻ lái?',
    ARRAY['Nghiêng nhẹ toàn bộ thân xe về phía cua trước khi thực sự xoay bánh dẫn hướng', 'Bấm còi to liên tục', 'Đứng im phanh xe 1 phút', 'Nháy đèn màu đỏ chớp tắt'],
    ARRAY['Nghiêng nhẹ toàn bộ thân xe về phía cua trước khi thực sự xoay bánh dẫn hướng']::varchar[],
    'Chuyển động tịnh tiến thân nhẹ là dấu hiệu gợi ý hướng (cues) trực quan xuất sắc cho con người đi bộ.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_075', 'mcq', 'uncanny-social',
    'Cảm biến nào hỗ trợ đắc lực nhất cho thuật toán bám sát mắt người (Eye Gaze Tracking) của robot?',
    ARRAY['Camera hồng ngoại chiếu tia bắt sáng võng mạc kết hợp mạng neuron định vị con ngươi', 'LiDAR an toàn', 'Cảm biến siêu âm', 'Encoder quang đo vòng quay động cơ'],
    ARRAY['Camera hồng ngoại chiếu tia bắt sáng võng mạc kết hợp mạng neuron định vị con ngươi']::varchar[],
    'Camera IR bắt phản xạ giác mạc hồng ngoại, không phụ thuộc vào độ sáng tối của văn phòng.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_076', 'mcq', 'uncanny-social',
    'Giao tiếp phi ngôn ngữ (Non-verbal communication) của robot chiếm tỷ lệ tác động tâm lý thế nào so với lời nói thoại?',
    ARRAY['Rất lớn, đặc biệt trong việc xây dựng sự tin cậy (trust) và giảm lo âu ban đầu', 'Bằng 0%', 'Chỉ có tác dụng với trẻ em', 'Làm giảm độ chính xác của robot'],
    ARRAY['Rất lớn, đặc biệt trong việc xây dựng sự tin cậy (trust) và giảm lo âu ban đầu']::varchar[],
    'Biểu cảm cơ thể, hướng nhìn, khoảng cách đứng (Proxemics) quyết định độ an tâm của con người khi tiếp cận máy.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_077', 'mcq', 'uncanny-social',
    'Dải đèn LED ma trận quấn quanh thân robot AMR (như robot giao hàng) thường đổi màu để làm gì?',
    ARRAY['Trực quan hóa hướng rẽ hoặc biểu thị các trạng thái như sạc pin, đang bận tránh chướng ngại vật cho con người dễ nhận biết', 'Để trang trí làm cảnh cảnh', 'Để thay thế cảm biến LiDAR', 'Để tăng tốc độ chạy mạng DDS'],
    ARRAY['Trực quan hóa hướng rẽ hoặc biểu thị các trạng thái như sạc pin, đang bận tránh chướng ngại vật cho con người dễ nhận biết']::varchar[],
    'LED đổi màu là giao diện HMI trực quan cao từ xa cho mọi người xung quanh.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_078', 'mcq', 'uncanny-social',
    'Quy chuẩn khoảng cách an toàn giao tiếp (Proxemics) của Hall chia dải khoảng cách từ 1.2m đến 3.6m là vùng giao tiếp nào?',
    ARRAY['Vùng xã hội (Social space - thích hợp cho robot dịch vụ đứng tiếp cận người lạ)', 'Vùng thân mật', 'Vùng công cộng công cộng', 'Vùng riêng tư cá nhân'],
    ARRAY['Vùng xã hội (Social space - thích hợp cho robot dịch vụ đứng tiếp cận người lạ)']::varchar[],
    'Robot đứng quá gần (<0.5m) kích hoạt cơ chế tự vệ phản xạ sợ hãi của người đeo, đứng quá xa (>3.6m) làm loãng giao tiếp.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_079', 'short-answer', 'uncanny-social',
    'Điền thuật ngữ tiếng Anh chỉ hành vi tương tác hướng thẳng mắt nhìn giữa hai đối tượng. (Viết hoa chữ đầu cả hai từ, có khoảng trắng)',
    NULL,
    ARRAY['Mutual Gaze']::varchar[],
    'Mutual Gaze là tương tác ánh mắt xã hội.',
    6, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_07'
  ),
  (
    'cs_humint_q_080', 'short-answer', 'uncanny-social',
    'Điền tên ngành khoa học nghiên cứu về khoảng cách không gian giao tiếp giữa con người và robot. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Proxemics']::varchar[],
    'Proxemics quy định khoảng cách an toàn.',
    6, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Điều khiển Robot rảnh tay bằng cử chỉ radar sóng milimet (mmWave) (cs_humint_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_081', 'mcq', 'multimodal-interaction',
    'Radar sóng milimet (mmWave) hoạt động chủ yếu ở dải tần số nào?',
    ARRAY['Cực cao, khoảng 60 GHz đến 77 GHz', '2.4 GHz', '50 Hz', '100 MHz'],
    ARRAY['Cực cao, khoảng 60 GHz đến 77 GHz']::varchar[],
    'Dải tần GHz siêu cao tương ứng bước sóng cỡ milimet giúp đo chi tiết nhỏ mịn.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_082', 'mcq', 'multimodal-interaction',
    'Ưu điểm lớn nhất của cảm biến radar mmWave so với camera quang học khi nhận diện cử chỉ trong nhà máy thép là gì?',
    ARRAY['Hoạt động bền bỉ trong khói bụi mịt mù, bóng tối và có khả năng xuyên qua găng tay công hộ công nhân', 'Giá thành rẻ hơn gấp 10 lần', 'Hình ảnh xuất ra có màu sắc sặc sỡ', 'Không tốn CPU tính toán'],
    ARRAY['Hoạt động bền bỉ trong khói bụi mịt mù, bóng tối và có khả năng xuyên qua găng tay công hộ công nhân']::varchar[],
    'Sóng vô tuyến mmWave đi xuyên vật thể phi kim, không chịu tác động của ánh sáng lóa hay bụi mịn.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_083', 'mcq', 'multimodal-interaction',
    'Radar mmWave đo đạc các thông số chuyển động nào của ngón tay?',
    ARRAY['Khoảng cách (Range), vận tốc hướng tâm (Doppler) và góc hướng (Azimuth/Elevation)', 'Màu sắc da tay', 'Độ ẩm da tay', 'Trọng lượng của găng tay'],
    ARRAY['Khoảng cách (Range), vận tốc hướng tâm (Doppler) và góc hướng (Azimuth/Elevation)']::varchar[],
    'mmWave thu các chùm xung Doppler tạo bản đồ phản xạ mốc cử chỉ chuyển động.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_084', 'mcq', 'multimodal-interaction',
    'Cấu trúc mạng học sâu nào thường được dùng để nhận diện chuỗi cử chỉ tay theo thời gian từ dữ liệu radar?',
    ARRAY['LSTM (Long Short-Term Memory) hoặc GRU mạng chuỗi thời gian', 'U-Net phân đoạn ảnh', 'RANSAC mặt phẳng phẳng', 'Mạng neuron tuyến tính một lớp'],
    ARRAY['LSTM (Long Short-Term Memory) hoặc GRU mạng chuỗi thời gian']::varchar[],
    'Tín hiệu radar là chuỗi dòng thời gian, mạng LSTM ghi nhớ trạng thái động để phân loại cử chỉ vuốt, xoay.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_085', 'mcq', 'multimodal-interaction',
    'Tại sao việc dùng radar mmWave lại bảo mật quyền riêng tư cá nhân hơn camera?',
    ARRAY['Vì radar chỉ xuất ra các điểm mốc phản xạ Doppler rời rạc, không ghi nhận hình ảnh gương mặt nhận dạng người', 'Vì radar không truyền dữ liệu', 'Vì radar tự động mã hóa dữ liệu', 'Do radar chạy bằng pin rời'],
    ARRAY['Vì radar chỉ xuất ra các điểm mốc phản xạ Doppler rời rạc, không ghi nhận hình ảnh gương mặt nhận dạng người']::varchar[],
    'Bảo mật dữ liệu cá nhân là yếu tố then chốt cho các hệ thống giám sát công nghiệp thân thiện.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_086', 'mcq', 'multimodal-interaction',
    'Phương thức FMCW (Frequency Modulated Continuous Wave) của radar mmWave mang lại khả năng gì?',
    ARRAY['Cho phép đo khoảng cách tuyệt đối tới vật thể bằng cách điều tần sóng phát liên tục', 'Đồng bộ hóa nhịp xung clock động cơ', 'Ngắt điện phanh khẩn cấp', 'Tạo ra xung nhịp PWM'],
    ARRAY['Cho phép đo khoảng cách tuyệt đối tới vật thể bằng cách điều tần sóng phát liên tục']::varchar[],
    'FMCW đo độ lệch tần số giữa sóng phát và sóng thu dội về để suy ra khoảng cách chính xác.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_087', 'mcq', 'multimodal-interaction',
    'Khi robot nhận diện cử chỉ nắm chặt bàn tay (Fist gesture) từ radar mmWave, lệnh điều khiển cấp cho xe tự hành thường mặc định là gì?',
    ARRAY['Stop (Dừng khẩn cấp)', 'Go (Chạy tiếp)', 'Turn Left (Cua trái)', 'Speed Up (Tăng tốc tối đa)'],
    ARRAY['Stop (Dừng khẩn cấp)']::varchar[],
    'Nắm tay là cử chỉ chuẩn quốc tế báo hiệu dừng khẩn rảnh tay trong công nghiệp.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_088', 'mcq', 'multimodal-interaction',
    'Để nhận diện cử chỉ tay ở khoảng cách gần (nhỏ hơn 1 mét) trước mặt robot, cảm biến radar mmWave thường chọn dải tần số nào tối ưu hơn?',
    ARRAY['60 GHz', '24 GHz', '1.2 GHz', '900 MHz'],
    ARRAY['60 GHz']::varchar[],
    'Tần số 60GHz cho bước sóng ngắn hơn 24GHz, độ phân giải cự ly đo chi tiết ngón tay mịn mịn màng hơn nhiều.',
    7, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_089', 'short-answer', 'multimodal-interaction',
    'Điền tên dải bước sóng điện từ tần số cực cao dùng điều khiển cử chỉ. (Viết thường có khoảng trắng và dấu)',
    NULL,
    ARRAY['sóng milimet', 'sóng mili mét', 'sóng mm']::varchar[],
    'Sóng milimet có tần số 30GHz-300GHz.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_08'
  ),
  (
    'cs_humint_q_090', 'short-answer', 'multimodal-interaction',
    'Điền tên viết tắt mạng neuron ghi nhớ chuỗi thời gian dài ngắn nhận diện cử chỉ. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['LSTM']::varchar[],
    'LSTM là Long Short-Term Memory.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Robot hỗ trợ xã hội (Socially Assistive Robots - SAR) (cs_humint_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_humint_q_091', 'mcq', 'uncanny-social',
    'Khái niệm SAR (Socially Assistive Robots) định nghĩa nhóm robot nào?',
    ARRAY['Robot hỗ trợ con người thông qua các hoạt động tương tác giao tiếp xã hội phi vật lý', 'Robot chuyên nâng hạ hàng nặng', 'Robot thám hiểm sao Hỏa', 'Robot hàn mạch tự động'],
    ARRAY['Robot hỗ trợ con người thông qua các hoạt động tương tác giao tiếp xã hội phi vật lý']::varchar[],
    'SAR tập trung hỗ trợ tâm lý trị liệu, đồng hành chăm sóc sức khỏe tinh thần.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_092', 'mcq', 'uncanny-social',
    'Robot hải cẩu Paro nổi tiếng thế giới ứng dụng cho đối tượng nào?',
    ARRAY['Chăm sóc xoa dịu tâm lý bệnh nhân sa sút trí tuệ (Alzheimer) hoặc người già cô đơn', 'Dọn vệ sinh bể bơi công cộng', 'Hái quả trên cành cao', 'Chạy SLAM quét bản đồ'],
    ARRAY['Chăm sóc xoa dịu tâm lý bệnh nhân sa sút trí tuệ (Alzheimer) hoặc người già cô đơn']::varchar[],
    'Paro phủ lông mềm tự nhiên, tích hợp các cảm biến và âm thanh hải cẩu để giao tiếp trị liệu.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_093', 'mcq', 'uncanny-social',
    'Lợi ích của việc thiết kế âm thanh phi ngôn ngữ (như bíp bíp, giai điệu ngắn phi tuyến tính kiểu R2-D2) cho robot là gì?',
    ARRAY['Giúp người dùng tự phóng chiếu cảm xúc và giảm kỳ vọng quá mức vào trí thông minh ngôn ngữ của robot', 'Tiết kiệm 90% bộ nhớ ROM chứa tệp WAV', 'Để robot phát sóng vô tuyến xa hơn', 'Tránh làm lác mắt cảm biến LiDAR'],
    ARRAY['Giúp người dùng tự phóng chiếu cảm xúc và giảm kỳ vọng quá mức vào trí thông minh ngôn ngữ của robot']::varchar[],
    'Âm thanh biểu cảm phi tuyến kích thích sự tò mò và gắn kết tâm lý sâu sắc hơn giọng robot đơ cứng.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_094', 'mcq', 'uncanny-social',
    'Cảm biến chạm điện dung (Capacitive Touch Sensors) bố trí dọc thân robot hải cẩu Paro thực hiện nhiệm vụ gì?',
    ARRAY['Giúp robot phân biệt hành vi vuốt ve yêu thương và hành vi đánh đập thô bạo để phản hồi cảm xúc tương ứng', 'Đo đạc nhiệt độ cơ thể bệnh nhân', 'Sạc pin không dây khi có người sờ sờ vào', 'Điều chỉnh tốc độ động cơ'],
    ARRAY['Giúp robot phân biệt hành vi vuốt ve yêu thương và hành vi đánh đập thô bạo để phản hồi cảm xúc tương ứng']::varchar[],
    'Paro tự học cách phản ứng: gừ gừ sung sướng khi được nựng, nhắm mắt sợ hãi khi bị gõ mạnh.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_095', 'mcq', 'uncanny-social',
    'Tại sao việc đồng hành cùng robot hỗ trợ xã hội lại có thể làm giảm nồng độ hormone cortisol ở người già?',
    ARRAY['Vì tương tác trò chuyện làm giảm trạng thái lo âu, cô đơn và giảm căng thẳng tâm lý trực tiếp', 'Vì robot tự tiêm thuốc giảm đau', 'Vì robot phát từ trường sinh học đặc biệt', 'Không có tác dụng thực chứng'],
    ARRAY['Vì tương tác trò chuyện làm giảm trạng thái lo âu, cô đơn và giảm căng thẳng tâm lý trực tiếp']::varchar[],
    'Cortisol là hormone gây stress. Giảm cortisol chứng minh lâm sàng độ hiệu quả của liệu pháp robot đồng hành.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_096', 'mcq', 'uncanny-social',
    'Robot đồng hành gia đình Anki Vector biểu cảm cảm xúc qua bộ phận giao diện chính nào?',
    ARRAY['Đôi mắt hoạt hình hiển thị trên màn hình IPS nhỏ phía trước đầu đầu', 'Hệ thống loa phát nhạc sàn', 'Chuyển động của hai cánh tay sắt', 'Bánh xe Mecanum quay tít'],
    ARRAY['Đôi mắt hoạt hình hiển thị trên màn hình IPS nhỏ phía trước đầu đầu']::varchar[],
    'Vector có đôi mắt hoạt hình giàu cảm xúc: nháy mắt, mở to kinh ngạc, lim dim ngủ.',
    5, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_097', 'mcq', 'uncanny-social',
    'Mối lo ngại đạo đức lớn nhất khi triển khai robot SAR chăm sóc người già là gì?',
    ARRAY['Nguy cơ giảm bớt sự tương tác trực tiếp thực tế giữa con người với con người (bị gia đình phó thác hoàn toàn cho robot)', 'Robot làm tiêu tốn quá nhiều tiền điện', 'Robot có thể nổi loạn cướp tài sản', 'Robot làm suy giảm trí nhớ'],
    ARRAY['Nguy cơ giảm bớt sự tương tác trực tiếp thực tế giữa con người với con người (bị gia đình phó thác hoàn toàn cho robot)']::varchar[],
    'Robot chỉ là công cụ hỗ trợ bổ trợ, không thể thay thế hoàn toàn tình cảm xã hội thật của người thân.',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_098', 'mcq', 'uncanny-social',
    'Robot hỗ trợ xã hội thường được lập trình kịch bản phản hồi hành vi dựa trên mô hình toán học nào?',
    ARRAY['FSM (Finite State Machine) - Máy trạng thái hữu hạn cảm xúc', 'Tìm đường đi ngắn nhất A*', 'Giải thuật di truyền GA', 'Biến đổi Fourier nhanh FFT'],
    ARRAY['FSM (Finite State Machine) - Máy trạng thái hữu hạn cảm xúc']::varchar[],
    'FSM chuyển đổi linh hoạt giữa các bang trạng thái cảm xúc: Chờ $\rightarrow$ Vui (khi được vuốt) $\rightarrow$ Buồn (khi bị bỏ quên).',
    6, 'Human Interaction', 'cs_human_interaction', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_099', 'short-answer', 'uncanny-social',
    'Điền tên viết tắt tiếng Anh của nhóm robot hỗ trợ xã hội. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SAR']::varchar[],
    'SAR là Socially Assistive Robotics.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_09'
  ),
  (
    'cs_humint_q_100', 'short-answer', 'uncanny-social',
    'Điền tên robot hải cẩu trị liệu nổi tiếng thế giới của Nhật Bản. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Paro']::varchar[],
    'Robot Paro được xếp vào danh sách thiết bị y tế y tế ở Mỹ.',
    5, 'Human Interaction', 'cs_robotics_fundamentals', 13, 'cs_humint_09'
  );

COMMIT;
