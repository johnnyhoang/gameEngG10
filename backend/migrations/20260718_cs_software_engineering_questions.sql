-- SQL migration to seed 100 question bank for cs_software_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_software_engineering (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_software_engineering';

-- ======================================================================================
-- BÀI GIẢNG 1: Các mô hình quy trình phần mềm (cs_se_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_001', 'mcq', 'software-processes',
    'Đặc trưng cốt lõi của Mô hình Thác nước (Waterfall Model) là gì?',
    ARRAY['Quy trình phát triển tuyến tính tuần tự qua các giai đoạn độc lập, giai đoạn sau chỉ bắt đầu khi giai đoạn trước hoàn thành bàn giao đầy đủ', 'Cho phép thay đổi yêu cầu liên tục bất cứ lúc nào', 'Không cần kiểm thử phần mềm', 'Phát triển song song tất cả các tính năng đồng thời'],
    ARRAY['Quy trình phát triển tuyến tính tuần tự qua các giai đoạn độc lập, giai đoạn sau chỉ bắt đầu khi giai đoạn trước hoàn thành bàn giao đầy đủ']::varchar[],
    'Waterfall tuân thủ luồng chảy tuyến tính từ trên xuống, khó thích ứng thay đổi nhưng có tài liệu bàn giao rõ ràng.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_002', 'mcq', 'software-processes',
    'Nhược điểm lớn nhất của mô hình Waterfall là gì?',
    ARRAY['Cực kỳ cứng nhắc, khó thích ứng trước thay đổi yêu cầu và khách hàng chỉ thấy sản phẩm ở cuối chu kỳ', 'Không có tài liệu thiết kế', 'Thời gian phát triển quá ngắn', 'Chỉ chạy được trên hệ thống Linux'],
    ARRAY['Cực kỳ cứng nhắc, khó thích ứng trước thay đổi yêu cầu và khách hàng chỉ thấy sản phẩm ở cuối chu kỳ']::varchar[],
    'Nếu có lỗi thiết kế phát hiện ở giai đoạn code/test muộn, chi phí sửa chữa quay vòng của Waterfall cực kỳ khổng lồ.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_003', 'mcq', 'software-processes',
    'Mối quan hệ đặc biệt nào được nhấn mạnh trong Mô hình chữ V (V-Model)?',
    ARRAY['Mối quan hệ song song trực tiếp giữa mỗi giai đoạn phát triển mã nguồn và giai đoạn kiểm thử tương ứng tương đương', 'Quan hệ giữa Product Owner và Scrum Master', 'Không phân chia giai đoạn kiểm thử', 'Cho phép lặp lại vô hạn các vòng thiết kế'],
    ARRAY['Mối quan hệ song song trực tiếp giữa mỗi giai đoạn phát triển mã nguồn và giai đoạn kiểm thử tương ứng tương đương']::varchar[],
    'V-Model đối chiếu trực quan: Requirements khớp với Acceptance test, High-level design khớp với System test, Unit test khớp với Coding.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_004', 'mcq', 'software-processes',
    'Hoạt động độc đáo và quan trọng nhất được tích hợp trong mô hình Xoắn ốc (Spiral Model) là gì?',
    ARRAY['Phân tích rủi ro (Risk Analysis) chuyên sâu ở mỗi vòng lặp', 'Viết tài liệu hướng dẫn sử dụng', 'Lập trình đa luồng song song', 'Họp hàng ngày Daily Standup'],
    ARRAY['Phân tích rủi ro (Risk Analysis) chuyên sâu ở mỗi vòng lặp']::varchar[],
    'Spiral Model kết hợp tính lặp của tiến hóa và tính kiểm soát của thác nước, đặt phân tích rủi ro làm trung tâm để định hướng tiếp tục hay dừng dự án.',
    6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_005', 'mcq', 'software-processes',
    'Waterfall Model phù hợp nhất cho loại dự án nào?',
    ARRAY['Dự án có yêu cầu khách hàng cực kỳ rõ ràng, ổn định và không thay đổi trong suốt quá trình phát triển', 'Dự án khởi nghiệp công nghệ mới có nhiều biến động', 'Dự án game di động cần cập nhật hàng tuần', 'Dự án nghiên cứu trí tuệ nhân tạo thử nghiệm'],
    ARRAY['Dự án có yêu cầu khách hàng cực kỳ rõ ràng, ổn định và không thay đổi trong suốt quá trình phát triển']::varchar[],
    'Với yêu cầu tĩnh và được chuẩn hóa (như phần mềm chính phủ, cầu đường), Waterfall giúp quản lý tiến độ và chi phí chặt chẽ.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_006', 'mcq', 'software-processes',
    'Vòng xoáy của Spiral Model được chia làm mấy góc phần tư hoạt động chính?',
    ARRAY['4', '2', '3', '5'],
    ARRAY['4']::varchar[],
    '4 góc: Xác định mục tiêu -> Đánh giá & Phân tích rủi ro -> Phát triển & Kiểm thử -> Lập kế hoạch vòng lặp sau.',
    6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_007', 'mcq', 'software-processes',
    'Tại sao mô hình xoắn ốc Spiral ít được áp dụng cho các dự án phần mềm vừa và nhỏ?',
    ARRAY['Vì chi phí thuê chuyên gia phân tích rủi ro quá cao và quy trình quá cồng kềnh đối với dự án nhỏ', 'Vì Spiral không hỗ trợ viết code Java', 'Vì mô hình này đã bị cấm sử dụng', 'Vì nó không có giai đoạn kiểm thử'],
    ARRAY['Vì chi phí thuê chuyên gia phân tích rủi ro quá cao và quy trình quá cồng kềnh đối với dự án nhỏ']::varchar[],
    'Spiral đòi hỏi nhân sự có năng lực đánh giá rủi ro cực tốt và thủ tục họp lập kế hoạch phức tạp, gây lãng phí với dự án nhỏ.',
    6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_008', 'mcq', 'software-processes',
    'Quy trình kiểm thử nào song hành với giai đoạn Phân tích yêu cầu trong mô hình chữ V (V-Model)?',
    ARRAY['Kiểm thử chấp nhận (Acceptance Testing)', 'Kiểm thử đơn vị (Unit Testing)', 'Kiểm thử tích hợp (Integration Testing)', 'Kiểm thử hiệu năng'],
    ARRAY['Kiểm thử chấp nhận (Acceptance Testing)']::varchar[],
    'Yêu cầu người dùng là cơ sở trực tiếp để khách hàng nghiệm thu kiểm thử chấp nhận ở bước cuối.',
    6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_009', 'short-answer', 'software-processes',
    'Điền tên mô hình phát triển phần mềm tuyến tính tuần tự cổ điển nhất. (Tiếng Anh viết thường hoặc Tiếng Việt)',
    NULL,
    ARRAY['waterfall', 'thác nước']::varchar[],
    'Waterfall là mô hình cổ điển nhất.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  ),
  (
    'cs_se_q_010', 'short-answer', 'software-processes',
    'Điền số lượng hoạt động chính trong một vòng lặp của mô hình xoắn ốc Spiral. (Điền chữ số)',
    NULL,
    ARRAY['4']::varchar[],
    'Mỗi vòng lặp gồm 4 giai đoạn hoạt động.',
    5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Tuyên ngôn Agile & Quy trình Scrum (cs_se_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_011', 'mcq', 'software-processes',
    'Giá trị nào sau đây được Tuyên ngôn Agile (Agile Manifesto) đề cao hơn?',
    ARRAY['Phần mềm chạy tốt quan trọng hơn tài liệu đầy đủ', 'Quy trình và công cụ quan trọng hơn con người', 'Thương lượng hợp đồng quan trọng hơn cộng tác khách hàng', 'Tuân thủ kế hoạch quan trọng hơn ứng phó thay đổi'],
    ARRAY['Phần mềm chạy tốt quan trọng hơn tài liệu đầy đủ']::varchar[],
    'Agile ưu tiên việc nhanh chóng tạo ra giá trị thực tế (phần mềm chạy được) cho khách hàng trải nghiệm thay vì viết tài liệu thiết kế dày cộp.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_012', 'mcq', 'software-processes',
    'Trong khung làm việc Scrum, vai trò của Product Owner (PO) là gì?',
    ARRAY['Quản lý danh sách yêu cầu Product Backlog và tối đa hóa giá trị sản phẩm đại diện cho khách hàng', 'Quản lý nhân sự và phân chia task cho dev', 'Vận hành các buổi họp daily standup', 'Viết Unit Test cho hệ thống'],
    ARRAY['Quản lý danh sách yêu cầu Product Backlog và tối đa hóa giá trị sản phẩm đại diện cho khách hàng']::varchar[],
    'PO chịu trách nhiệm định nghĩa tính năng, sắp xếp độ ưu tiên backlog để mang lại lợi ích kinh doanh tốt nhất.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_013', 'mcq', 'software-processes',
    'Nhiệm vụ chính của Scrum Master (SM) là gì?',
    ARRAY['Hỗ trợ loại bỏ các trở ngại (blockers) cho team và bảo đảm quy trình Scrum được vận hành chuẩn xác', 'Quyết định kiến trúc cơ sở dữ liệu', 'Gán task trực tiếp cho lập trình viên', 'Báo cáo tiến độ và chịu phạt từ ban giám đốc'],
    ARRAY['Hỗ trợ loại bỏ các trở ngại (blockers) cho team và bảo đảm quy trình Scrum được vận hành chuẩn xác']::varchar[],
    'SM là Servant Leader, giúp bảo vệ team khỏi xao nhãng và tạo môi trường làm việc thông suốt.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_014', 'mcq', 'software-processes',
    'Cuộc họp "Daily Standup" trong Scrum diễn ra như thế nào?',
    ARRAY['Họp nhanh hàng ngày dưới 15 phút để các thành viên báo cáo công việc hôm qua, hôm nay và các khó khăn gặp phải', 'Họp bàn thiết kế kiến trúc hệ thống', 'Họp demo sản phẩm cho khách hàng duyệt', 'Họp rút kinh nghiệm quy trình cuối Sprint'],
    ARRAY['Họp nhanh hàng ngày dưới 15 phút để các thành viên báo cáo công việc hôm qua, hôm nay và các khó khăn gặp phải']::varchar[],
    'Daily Standup giúp đồng bộ hóa công việc hàng ngày của nhóm dev, phát hiện nút thắt cổ chai sớm.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_015', 'mcq', 'software-processes',
    'Sự kiện "Sprint Retrospective" (Họp cải tiến) diễn ra nhằm mục đích gì?',
    ARRAY['Để đánh giá lại quy trình làm việc, sự cộng tác của team sau Sprint và đề xuất các hành động cải tiến cho Sprint tới', 'Để viết code sửa lỗi khẩn cấp', 'Để thuyết trình demo sản phẩm cho khách hàng', 'Để gán thêm user story vào sprint backlog'],
    ARRAY['Để đánh giá lại quy trình làm việc, sự cộng tác của team sau Sprint và đề xuất các hành động cải tiến cho Sprint tới']::varchar[],
    'Retrospective hướng tới sự phát triển nội bộ của nhóm, tối ưu hóa sự phối hợp của con người qua từng Sprint.',
    6, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_016', 'mcq', 'software-processes',
    'Ai có quyền quyết định số lượng User Stories sẽ được đưa vào thực hiện trong Sprint mới tại buổi Sprint Planning?',
    ARRAY['Development Team (Nhóm tự tổ chức)', 'Product Owner', 'Scrum Master', 'Giám đốc dự án PM'],
    ARRAY['Development Team (Nhóm tự tổ chức)']::varchar[],
    'Scrum quy định nhóm dev tự ước lượng năng lực (Velocity) và kéo việc từ Product Backlog vào Sprint Backlog, PO không được ép ép thêm.',
    6, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_017', 'mcq', 'software-processes',
    'Điều gì xảy ra với danh sách Sprint Backlog trong suốt thời gian diễn ra Sprint?',
    ARRAY['Sprint Backlog được giữ cố định, không được phép thay đổi để bảo đảm nhóm tập trung hoàn thành mục tiêu Sprint', 'Có thể tự do thêm bớt task bất kỳ lúc nào', 'Chỉ được thêm task mới vào cuối tuần', 'Do Scrum Master cập nhật hàng giờ'],
    ARRAY['Sprint Backlog được giữ cố định, không được phép thay đổi để bảo đảm nhóm tập trung hoàn thành mục tiêu Sprint']::varchar[],
    'Mục tiêu Sprint là cam kết bất biến trong Sprint. Mọi thay đổi phát sinh của PO phải đợi Sprint sau.',
    6, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_018', 'mcq', 'software-processes',
    'Thước đo năng lực làm việc của Scrum team qua các Sprint được gọi là gì?',
    ARRAY['Vận tốc (Velocity) - lượng story points hoàn thành trung bình mỗi Sprint', 'Số lượng dòng code viết được', 'Số lượng bug tìm thấy', 'Tổng thời gian OT của nhân sự'],
    ARRAY['Vận tốc (Velocity) - lượng story points hoàn thành trung bình mỗi Sprint']::varchar[],
    'Velocity giúp nhóm lập kế hoạch chính xác cho các Sprint tương lai dựa trên số liệu thực tế quá khứ.',
    6, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_019', 'short-answer', 'software-processes',
    'Điền tên tiếng Anh của vòng lặp thời gian cố định (thường từ 2-4 tuần) trong Scrum. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Sprint']::varchar[],
    'Sprint là nhịp tim hoạt động cốt lõi của Scrum.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  ),
  (
    'cs_se_q_020', 'short-answer', 'software-processes',
    'Điền tên cuộc họp hàng ngày dưới 15 phút của nhóm Scrum. (Viết thường hoặc tiếng Anh)',
    NULL,
    ARRAY['daily standup', 'họp hàng ngày']::varchar[],
    'Daily Standup duy trì sự minh bạch tiến độ công việc.',
    5, 'Agile & Scrum', 'cs_software_engineering', 13, 'cs_se_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Phân tích yêu cầu (cs_se_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_021', 'mcq', 'software-requirements',
    'Yêu cầu nào sau đây thuộc nhóm Yêu cầu chức năng (Functional Requirement)?',
    ARRAY['Hệ thống phải cho phép người dùng khôi phục mật khẩu qua SMS OTP', 'Hệ thống phải mã hóa dữ liệu bằng HTTPS', 'Hệ thống phải phản hồi dưới 1 giây', 'Phần mềm phải chạy được trên Windows 11'],
    ARRAY['Hệ thống phải cho phép người dùng khôi phục mật khẩu qua SMS OTP']::varchar[],
    'Khôi phục mật khẩu qua SMS OTP là tính năng hành vi cụ thể người dùng có thể tương tác với phần mềm.',
    5, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_022', 'mcq', 'software-requirements',
    'Yêu cầu nào sau đây thuộc nhóm Yêu cầu phi chức năng (Non-functional Requirement)?',
    ARRAY['Hệ thống phải bảo đảm độ sẵn sàng hoạt động đạt 99.9% (Uptime)', 'Hệ thống phải hiển thị giỏ hàng của người dùng', 'Hệ thống phải tự động gửi email chúc mừng sinh nhật', 'Hệ thống phải hỗ trợ xuất báo cáo định dạng PDF'],
    ARRAY['Hệ thống phải bảo đảm độ sẵn sàng hoạt động đạt 99.9% (Uptime)']::varchar[],
    'Uptime 99.9% là yêu cầu về độ tin cậy và hiệu năng vận hành hệ thống (NFR).',
    5, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_023', 'mcq', 'software-requirements',
    'Trong sơ đồ Use Case, khái niệm "Actor" đại diện cho điều gì?',
    ARRAY['Người dùng hoặc hệ thống ngoại vi bên ngoài tương tác trực tiếp với phần mềm', 'Một chức năng viết bằng code của hệ thống', 'Một lớp đối tượng trong database', 'Lập trình viên viết mã nguồn'],
    ARRAY['Người dùng hoặc hệ thống ngoại vi bên ngoài tương tác trực tiếp với phần mềm']::varchar[],
    'Actor đóng vai trò kích hoạt hoặc nhận kết quả từ Use Case (ví dụ: Khách hàng, Cổng thanh toán Stripe).',
    5, 'Use Case Modeling', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_024', 'mcq', 'software-requirements',
    'Mối quan hệ `<<include>>` giữa Use Case A và Use Case B có nghĩa là gì?',
    ARRAY['Hành vi của Use Case B bắt buộc phải xảy ra như một phần của Use Case A', 'Hành vi của Use Case B là tùy chọn tùy điều kiện xảy ra', 'Use Case B kế thừa toàn bộ thuộc tính từ Use Case A', 'Hai Use Case chạy song song đa luồng'],
    ARRAY['Hành vi của Use Case B bắt buộc phải xảy ra như một phần của Use Case A']::varchar[],
    'Ví dụ: Rút tiền bắt buộc phải include Đăng nhập/Xác thực tài khoản.',
    6, 'Use Case Modeling', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_025', 'mcq', 'software-requirements',
    'Mối quan hệ `<<extend>>` từ Use Case B đến Use Case A biểu thị điều gì?',
    ARRAY['Hành vi của Use Case B chỉ được thực hiện tùy chọn tại một điểm neo cụ thể dưới điều kiện nhất định khi chạy Use Case A', 'Hành vi của Use Case B bắt buộc phải xảy ra', 'Use Case A là con của Use Case B', 'Use Case B bị lỗi không chạy được'],
    ARRAY['Hành vi của Use Case B chỉ được thực hiện tùy chọn tại một điểm neo cụ thể dưới điều kiện nhất định khi chạy Use Case A']::varchar[],
    'Ví dụ: Use Case Thanh toán có thể được extend bởi Nhập mã coupon (chỉ khi người dùng có coupon và muốn nhập).',
    6, 'Use Case Modeling', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_026', 'mcq', 'software-requirements',
    'Tại sao việc phân loại và làm rõ yêu cầu phi chức năng từ sớm lại cực kỳ quan trọng?',
    ARRAY['Vì yêu cầu phi chức năng ảnh hưởng sâu sắc đến lựa chọn kiến trúc phần cứng, hạ tầng mạng và công nghệ phát triển hệ thống', 'Vì nó mô tả các nút bấm trên UI', 'Để khách hàng ký hợp đồng nhanh hơn', 'Vì nó không cần kiểm thử'],
    ARRAY['Vì yêu cầu phi chức năng ảnh hưởng sâu sắc đến lựa chọn kiến trúc phần cứng, hạ tầng mạng và công nghệ phát triển hệ thống']::varchar[],
    'Yêu cầu chịu tải hay bảo mật quyết định cấu trúc hạ tầng cơ sở dữ liệu và bảo mật kênh truyền kết nối.',
    6, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_027', 'mcq', 'software-requirements',
    'Ai là người chịu trách nhiệm chính trong việc thu thập và chuyển giao yêu cầu từ khách hàng thành tài liệu cho team dev?',
    ARRAY['Business Analyst (BA) / Product Owner (PO)', 'Scrum Master', 'Lập trình viên trưởng (Lead Developer)', 'Kiểm thử viên (QA/QC)'],
    ARRAY['Business Analyst (BA) / Product Owner (PO)']::varchar[],
    'BA/PO là cầu nối ngôn ngữ kinh doanh của khách hàng và ngôn ngữ kỹ thuật của nhóm phát triển.',
    5, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_028', 'mcq', 'software-requirements',
    'Yêu cầu "Hệ thống phải tương thích hoàn toàn với trình duyệt Safari trên thiết bị iOS" thuộc loại yêu cầu nào?',
    ARRAY['Yêu cầu phi chức năng (Tính tương thích)', 'Yêu cầu chức năng', 'Yêu cầu của Scrum Master', 'Yêu cầu bảo mật'],
    ARRAY['Yêu cầu phi chức năng (Tính tương thích)']::varchar[],
    'Đây là ràng buộc về môi trường vận hành của phần mềm (Non-functional).',
    5, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_029', 'short-answer', 'software-requirements',
    'Điền tên tiếng Anh viết tắt của nhà phân tích nghiệp vụ chịu trách nhiệm viết tài liệu đặc tả yêu cầu. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['BA']::varchar[],
    'BA là Business Analyst.',
    5, 'Requirements Engineering', 'cs_software_engineering', 13, 'cs_se_03'
  ),
  (
    'cs_se_q_030', 'short-answer', 'software-requirements',
    'Điền tên mối quan hệ bắt buộc phải có giữa hai Use Case thể hiện tính tái sử dụng. (Viết thường nằm trong cặp ngoặc nhọn << >>)',
    NULL,
    ARRAY['<<include>>', 'include']::varchar[],
    'Mối quan hệ include biểu diễn hành vi bắt buộc đi kèm.',
    5, 'Use Case Modeling', 'cs_software_engineering', 13, 'cs_se_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Mô hình hóa hệ thống với UML (cs_se_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_031', 'mcq', 'software-requirements',
    'Mối quan hệ "Composition" (Bao hàm - mạnh) trong Class Diagram có thuộc tính đặc trưng nào?',
    ARRAY['Sinh tử có nhau: phần tử con bị hủy hoàn toàn khi phần tử cha bị hủy, không thể tồn tại độc lập', 'Phần tử con có thể tồn tại độc lập khi cha bị hủy', 'Biểu diễn quan hệ kế thừa cha-con', 'Không có liên kết vật lý nào'],
    ARRAY['Sinh tử có nhau: phần tử con bị hủy hoàn toàn khi phần tử cha bị hủy, không thể tồn tại độc lập']::varchar[],
    'Composition (hình thoi đặc) quản lý vòng đời chặt chẽ. Ví dụ: Đơn hàng bị xóa thì Chi tiết đơn hàng bắt buộc phải bị xóa theo.',
    6, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_032', 'mcq', 'software-requirements',
    'Mối quan hệ "Aggregation" (Thu gom - yếu) trong Class Diagram có ký hiệu trực quan nào?',
    ARRAY['Hình thoi rỗng ở phía lớp chứa (lớp cha)', 'Hình thoi đặc', 'Đường nét đứt có mũi tên rỗng', 'Đường nét liền không mũi tên'],
    ARRAY['Hình thoi rỗng ở phía lớp chứa (lớp cha)']::varchar[],
    'Aggregation biểu thị quan hệ "has-a" lỏng lẻo. Ví dụ: Lớp học giải tán, Giáo viên vẫn tồn tại bình thường.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_033', 'mcq', 'software-requirements',
    'Trong Class Diagram, mối quan hệ kế thừa (Inheritance/Generalization) được ký hiệu bằng hình vẽ nào?',
    ARRAY['Đường nét liền có mũi tên rỗng hình tam giác trỏ về lớp cha', 'Đường nét đứt có mũi tên đặc', 'Hình thoi rỗng', 'Đường nét liền có chữ <<inherits>>'],
    ARRAY['Đường nét liền có mũi tên rỗng hình tam giác trỏ về lớp cha']::varchar[],
    'Mũi tên tam giác rỗng nét liền hướng về lớp cha biểu thị quan hệ khái quát hóa/kế thừa trong UML.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_034', 'mcq', 'software-requirements',
    'Sơ đồ Sequence Diagram thuộc nhóm sơ đồ nào trong UML?',
    ARRAY['Sơ đồ động (Behavioral/Interaction Diagram) mô tả tương tác theo thời gian', 'Sơ đồ tĩnh mô tả cấu trúc lớp', 'Sơ đồ vật lý mô tả server deploy', 'Sơ đồ mô tả cơ sở dữ liệu quan hệ'],
    ARRAY['Sơ đồ động (Behavioral/Interaction Diagram) mô tả tương tác theo thời gian']::varchar[],
    'Sequence Diagram biểu diễn luồng trao đổi message giữa các object tuần tự theo thời gian.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_035', 'mcq', 'software-requirements',
    'Đường nét đứt dọc chạy bên dưới mỗi đối tượng trong Sequence Diagram được gọi là gì?',
    ARRAY['Đường đời (Lifeline)', 'Thanh kích hoạt (Activation Bar)', 'Thông điệp phản hồi (Return Message)', 'Đường ranh giới hệ thống'],
    ARRAY['Đường đời (Lifeline)']::varchar[],
    'Lifeline biểu diễn dòng thời gian sinh tồn hoạt động của đối tượng trong kịch bản tương tác.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_036', 'mcq', 'software-requirements',
    'Mũi tên nét đứt hướng ngược lại trong Sequence Diagram biểu diễn loại thông điệp nào?',
    ARRAY['Thông điệp trả về (Return Message)', 'Thông điệp đồng bộ (Synchronous)', 'Thông điệp bất đồng bộ (Asynchronous)', 'Thông điệp tự gọi chính mình'],
    ARRAY['Thông điệp trả về (Return Message)']::varchar[],
    'Return message trả lại kết quả tính toán sau khi nhận được yêu cầu đồng bộ trước đó.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_037', 'mcq', 'software-requirements',
    'Mối quan hệ nào biểu thị liên kết sinh tử giữa lớp "Đầu" (Head) và lớp "Mắt" (Eye)?',
    ARRAY['Composition (Bao hàm đặc)', 'Aggregation (Thu gom rỗng)', 'Generalization (Kế thừa)', 'Association (Liên kết thường)'],
    ARRAY['Composition (Bao hàm đặc)']::varchar[],
    'Mắt là bộ phận không thể tách rời khỏi Đầu, có cùng vòng đời với Đầu nên quan hệ là Composition.',
    6, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_038', 'mcq', 'software-requirements',
    'Ký hiệu dấu cộng (+) đứng trước tên thuộc tính trong Class Diagram biểu thị phạm vi truy cập (visibility) nào?',
    ARRAY['Public (Công khai toàn cục)', 'Private (Riêng tư nội bộ)', 'Protected (Bảo vệ kế thừa)', 'Package (Trong cùng thư mục)'],
    ARRAY['Public (Công khai toàn cục)']::varchar[],
    'UML quy định: `+` là public, `-` là private, `#` là protected, và `~` là package.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_039', 'short-answer', 'software-requirements',
    'Điền tên viết tắt của ngôn ngữ mô hình hóa thống nhất được sử dụng phổ biến nhất để thiết kế phần mềm. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['UML']::varchar[],
    'UML là Unified Modeling Language.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  ),
  (
    'cs_se_q_040', 'short-answer', 'software-requirements',
    'Điền ký hiệu dấu dùng để biểu thị thuộc tính có phạm vi truy cập riêng tư Private trong Class Diagram. (Điền ký tự)',
    NULL,
    ARRAY['-']::varchar[],
    'Dấu trừ `-` đại diện cho private visibility.',
    5, 'UML Modeling', 'cs_software_engineering', 13, 'cs_se_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Kiến trúc phần mềm phổ biến (cs_se_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_041', 'mcq', 'architecture-design',
    'Nhược điểm lớn nhất về mặt bảo mật và lỗi hệ thống của Kiến trúc Đơn khối (Monolith) là gì?',
    ARRAY['Một lỗi nhỏ ở mô-đun bất kỳ có thể làm sập toàn bộ hệ thống (Single Point of Failure)', 'Mã hóa dữ liệu quá phức tạp', 'Tốn quá nhiều chi phí hạ tầng cloud ban đầu', 'Không chạy được trên nhiều database'],
    ARRAY['Một lỗi nhỏ ở mô-đun bất kỳ có thể làm sập toàn bộ hệ thống (Single Point of Failure)']::varchar[],
    'Do chia sẻ chung tiến trình bộ nhớ và tài nguyên, một lỗi tràn bộ đệm hoặc crash ở mô-đun này sẽ kéo sập toàn bộ ứng dụng Monolith.',
    5, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_042', 'mcq', 'architecture-design',
    'Đặc trưng bắt buộc của mỗi dịch vụ trong Kiến trúc Vi dịch vụ (Microservices) là gì?',
    ARRAY['Mỗi dịch vụ phải tự quản lý cơ sở dữ liệu riêng biệt của nó (Database-per-service)', 'Mất kết nối mạng vẫn hoạt động bình thường', 'Bắt buộc viết bằng ngôn ngữ Java', 'Tất cả các dịch vụ dùng chung một database duy nhất'],
    ARRAY['Mỗi dịch vụ phải tự quản lý cơ sở dữ liệu riêng biệt của nó (Database-per-service)']::varchar[],
    'Sở hữu database riêng bảo đảm tính cô lập dữ liệu tối đa, tránh liên kết chặt chẽ (tight coupling) giữa các dịch vụ.',
    6, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_043', 'mcq', 'architecture-design',
    'Để duy trì tính nhất quán dữ liệu giao dịch trên nhiều Microservices độc lập, người ta sử dụng mẫu thiết kế nào?',
    ARRAY['Saga Pattern (chuỗi giao dịch địa phương bù trừ)', 'Singleton Pattern', 'MVC Pattern', 'Prepared Statements'],
    ARRAY['Saga Pattern (chuỗi giao dịch địa phương bù trừ)']::varchar[],
    'Do không dùng database chung, giao dịch phân tán 2PC quá chậm, Saga giúp thực hiện chuỗi giao dịch cục bộ tuần tự và gửi lệnh rollback bù trừ (compensating transaction) nếu có bước lỗi.',
    7, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_044', 'mcq', 'architecture-design',
    'Vai trò của thành phần "Model" trong mô hình MVC là gì?',
    ARRAY['Quản lý lưu trữ dữ liệu và thực thi các logic nghiệp vụ (business logic) cốt lõi của ứng dụng', 'Hiển thị giao diện HTML/CSS', 'Tiếp nhận click chuột của người dùng', 'Kết nối mạng internet'],
    ARRAY['Quản lý lưu trữ dữ liệu và thực thi các logic nghiệp vụ (business logic) cốt lõi của ứng dụng']::varchar[],
    'Model nắm giữ trạng thái và quy tắc xử lý thông tin thực tế của ứng dụng, hoàn toàn độc lập với giao diện.',
    5, 'Architectural Patterns', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_045', 'mcq', 'architecture-design',
    'Thành phần "Controller" trong mô hình MVC thực hiện nhiệm vụ gì?',
    ARRAY['Tiếp nhận yêu cầu từ View, tương tác xử lý với Model và điều phối cập nhật lại View tương ứng', 'Lưu trữ trực tiếp dữ liệu vào ổ cứng', 'Hiển thị các hiệu ứng hoạt họa UI', 'Tự động kiểm thử code'],
    ARRAY['Tiếp nhận yêu cầu từ View, tương tác xử lý với Model và điều phối cập nhật lại View tương ứng']::varchar[],
    'Controller đóng vai trò trung gian tiếp nhận input (HTTP Request) và điều hướng luồng nghiệp vụ.',
    5, 'Architectural Patterns', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_046', 'mcq', 'architecture-design',
    'Kiến trúc Microservices mang lại ưu điểm vượt trội nào so với Monolith khi hệ thống có lượng truy cập đột biến ở riêng chức năng Thanh toán?',
    ARRAY['Cho phép co giãn (scale-out) riêng biệt dịch vụ Thanh toán mà không cần nâng cấp tài nguyên cho các phần khác', 'Tự động sửa lỗi code của chức năng Thanh toán', 'Loại bỏ hoàn toàn sự kết nối của Database', 'Chạy nhanh hơn gấp 100 lần không cần RAM'],
    ARRAY['Cho phép co giãn (scale-out) riêng biệt dịch vụ Thanh toán mà không cần nâng cấp tài nguyên cho các phần khác']::varchar[],
    'Tính cô lập độc lập của microservices giúp doanh nghiệp tiết kiệm chi phí vận hành máy chủ đám mây cực lớn khi scale-up đúng chỗ.',
    6, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_047', 'mcq', 'architecture-design',
    'Khái niệm "API Gateway" trong hệ thống Microservices đóng vai trò gì?',
    ARRAY['Là điểm tiếp nhận duy nhất cho mọi request từ Client bên ngoài, điều hướng request đến đúng microservice bên trong và xử lý bảo mật, chịu tải', 'Là cơ sở dữ liệu trung tâm', 'Là tường lửa hệ điều hành', 'Là máy chủ lưu trữ code Git'],
    ARRAY['Là điểm tiếp nhận duy nhất cho mọi request từ Client bên ngoài, điều hướng request đến đúng microservice bên trong và xử lý bảo mật, chịu tải']::varchar[],
    'API Gateway gom luồng giao tiếp, ẩn giấu cấu trúc mạng vi dịch vụ bên trong giúp Client chỉ tương tác với 1 đầu mối duy nhất.',
    6, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_048', 'mcq', 'architecture-design',
    'Quy tắc vàng nào cần tuân thủ khi bắt đầu thiết kế hệ thống phần mềm mới cho một startup?',
    ARRAY['Nên bắt đầu bằng kiến trúc Monolith tinh gọn, khi hệ thống lớn lên và team đông mới chuyển đổi sang Microservices', 'Bắt buộc phải dùng Microservices ngay từ ngày đầu tiên', 'Không sử dụng bất kỳ mẫu thiết kế nào', 'Chỉ dùng database NoSQL'],
    ARRAY['Nên bắt đầu bằng kiến trúc Monolith tinh gọn, khi hệ thống lớn lên và team đông mới chuyển đổi sang Microservices']::varchar[],
    'Thiết kế microservices quá sớm (Premature decomposition) khi chưa rõ nghiệp vụ sẽ vắt kiệt nguồn lực của startup vào các vấn đề hạ tầng mạng phức tạp.',
    6, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_049', 'short-answer', 'architecture-design',
    'Điền tên viết tắt tiếng Anh của mẫu kiến trúc Model-View-Controller. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MVC']::varchar[],
    'MVC tách biệt rõ ràng dữ liệu, giao diện và điều phối.',
    5, 'Architectural Patterns', 'cs_software_engineering', 13, 'cs_se_05'
  ),
  (
    'cs_se_q_050', 'short-answer', 'architecture-design',
    'Điền tên tiếng Anh viết tắt của thành phần gác cổng tiếp nhận duy nhất mọi request từ Client trong Microservices. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['API Gateway', 'Api gateway']::varchar[],
    'API Gateway quản lý phân luồng giao tiếp microservices.',
    5, 'Software Architecture', 'cs_software_engineering', 13, 'cs_se_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Các mẫu thiết kế GoF khởi tạo (cs_se_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_051', 'mcq', 'architecture-design',
    'Mục tiêu chính của Mẫu thiết kế Singleton là gì?',
    ARRAY['Bảo đảm một lớp chỉ có duy nhất một thực thể (Instance) tồn tại trong suốt vòng đời ứng dụng và cung cấp điểm truy cập toàn cục', 'Tự động xóa các thực thể thừa', 'Khởi tạo đối tượng bằng nhiều tham số', 'Kế thừa nhiều lớp cha cùng lúc'],
    ARRAY['Bảo đảm một lớp chỉ có duy nhất một thực thể (Instance) tồn tại trong suốt vòng đời ứng dụng và cung cấp điểm truy cập toàn cục']::varchar[],
    'Singleton hạn chế việc tạo trùng lặp các đối tượng nặng (ví dụ connection pool, cấu hình hệ thống).',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_052', 'mcq', 'architecture-design',
    'Bước đầu tiên quan trọng nhất khi triển khai lớp Singleton là gì?',
    ARRAY['Khóa hàm khởi tạo bằng phạm vi truy cập private (Private Constructor) để ngăn bên ngoài new đối tượng tự do', 'Tạo hàm static kết nối database', 'Khai báo lớp kế thừa interface', 'Tạo mảng tĩnh lưu trữ dữ liệu'],
    ARRAY['Khóa hàm khởi tạo bằng phạm vi truy cập private (Private Constructor) để ngăn bên ngoài new đối tượng tự do']::varchar[],
    'Nếu constructor để public, client có thể new instance mới bất cứ lúc nào, phá vỡ nguyên lý Singleton.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_053', 'mcq', 'architecture-design',
    'Mẫu thiết kế "Factory Method" giải quyết bài toán gì khi khởi tạo đối tượng?',
    ARRAY['Định nghĩa giao diện khởi tạo đối tượng, để các lớp con tự quyết định lớp thực tế nào được new, giảm liên kết chặt chẽ', 'Tăng tốc độ chạy của hàm khởi tạo', 'Tự động kiểm tra lỗi cú pháp lúc runtime', 'Giới hạn số lượng đối tượng được sinh ra'],
    ARRAY['Định nghĩa giao diện khởi tạo đối tượng, để các lớp con tự quyết định lớp thực tế nào được new, giảm liên kết chặt chẽ']::varchar[],
    'Factory Method che giấu logic new đối tượng cụ thể, giúp mã nguồn sử dụng (client) chỉ tương tác qua interface tổng quát.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_054', 'mcq', 'architecture-design',
    'Lợi ích lớn nhất của việc áp dụng Factory Method khi hệ thống cần bổ sung thêm loại sản phẩm mới là gì?',
    ARRAY['Ta chỉ cần viết thêm lớp sản phẩm mới và lớp factory tương ứng mà không cần chỉnh sửa mã nguồn cốt lõi cũ (Open-Closed)', 'Không cần viết code kiểm thử', 'Tự động lưu trữ sản phẩm vào RAM', 'Tự động xóa sản phẩm lỗi'],
    ARRAY['Ta chỉ cần viết thêm lớp sản phẩm mới và lớp factory tương ứng mà không cần chỉnh sửa mã nguồn cốt lõi cũ (Open-Closed)']::varchar[],
    'Factory Method hạn chế tối đa việc động chạm sửa đổi các khối code cũ đang vận hành ổn định.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_055', 'mcq', 'architecture-design',
    'Mẫu thiết kế "Builder" giải quyết triệt để lỗi thiết kế nào khi khởi tạo đối tượng phức tạp?',
    ARRAY['Lỗi quá nhiều tham số truyền vào hàm khởi tạo (Telescoping Constructor) gây khó đọc và nhầm lẫn thứ tự', 'Lỗi rò rỉ bộ nhớ của biến static', 'Lỗi không gọi được hàm đệ quy', 'Lỗi không kế thừa được lớp cha'],
    ARRAY['Lỗi quá nhiều tham số truyền vào hàm khởi tạo (Telescoping Constructor) gây khó đọc và nhầm lẫn thứ tự']::varchar[],
    'Builder cho phép gán từng thuộc tính tùy chọn qua method chaining trực quan và kết thúc bằng hàm `.build()`.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_056', 'mcq', 'architecture-design',
    'Để bảo đảm an toàn đa luồng (Thread-safety) khi gọi hàm `getInstance()` của Singleton trong môi trường Multi-threading, ta làm thế nào?',
    ARRAY['Sử dụng khóa đồng bộ hóa (synchronized block) kết nối với kiểm tra hai bước (Double-Checked Locking)', 'Đặt tốc độ học của CPU chậm lại', 'Khóa hoàn toàn không cho luồng khác chạy', 'Tạo ra 2 biến static lưu trữ song song'],
    ARRAY['Sử dụng khóa đồng bộ hóa (synchronized block) kết nối với kiểm tra hai bước (Double-Checked Locking)']::varchar[],
    'Double-checked locking bảo đảm chỉ thực hiện đồng bộ hóa ở lần tạo instance đầu tiên, giữ hiệu năng cao cho các lần gọi sau.',
    7, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_057', 'mcq', 'architecture-design',
    'Đặc điểm của mẫu thiết kế "Abstract Factory" so với Factory Method là gì?',
    ARRAY['Cung cấp giao diện để khởi tạo một họ các đối tượng liên quan hoặc phụ thuộc lẫn nhau mà không chỉ ra các lớp cụ thể của chúng', 'Đơn giản và dễ viết hơn Factory Method', 'Không sử dụng tính kế thừa hướng đối tượng', 'Chỉ dùng để kết nối cơ sở dữ liệu'],
    ARRAY['Cung cấp giao diện để khởi tạo một họ các đối tượng liên quan hoặc phụ thuộc lẫn nhau mà không chỉ ra các lớp cụ thể của chúng']::varchar[],
    'Abstract Factory là nhà máy của các nhà máy (Factory of factories), quản lý việc tạo ra các nhóm sản phẩm ăn khớp nhau (ví dụ: họ nút bấm và thanh cuộn của Windows vs macOS).',
    7, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_058', 'mcq', 'architecture-design',
    'Singleton Pattern thường bị coi là một "Anti-pattern" (mẫu phản thiết kế) trong trường hợp nào?',
    ARRAY['Khi nó nắm giữ trạng thái toàn cục được chia sẻ chéo, gây khó khăn cho việc viết Unit Test cô lập độc lập', 'Khi nó làm chậm tốc độ CPU', 'Khi nó không hỗ trợ hệ cơ sở dữ liệu NoSQL', 'Khi chạy trên container Docker'],
    ARRAY['Khi nó nắm giữ trạng thái toàn cục được chia sẻ chéo, gây khó khăn cho việc viết Unit Test cô lập độc lập']::varchar[],
    'Do instance Singleton tồn tại suốt thời gian chạy, dữ liệu ghi nhận của bài test này có thể làm ảnh hưởng làm sai lệch kết quả của bài test khác chạy sau.',
    7, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_059', 'short-answer', 'architecture-design',
    'Điền tên mẫu thiết kế khởi tạo bảo đảm một lớp chỉ có duy nhất một thực thể. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Singleton']::varchar[],
    'Singleton giới hạn số lượng instance tối đa là 1.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  ),
  (
    'cs_se_q_060', 'short-answer', 'architecture-design',
    'Điền tên mẫu thiết kế khởi tạo đối tượng từng bước một bằng method chaining. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Builder']::varchar[],
    'Builder Pattern tối ưu hóa việc tạo đối tượng có nhiều thuộc tính.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Các mẫu thiết kế GoF hành vi và cấu trúc (cs_se_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_061', 'mcq', 'architecture-design',
    'Mục tiêu chính của Mẫu thiết kế Observer là gì?',
    ARRAY['Định nghĩa mối quan hệ phụ thuộc một-nhiều; khi một đối tượng thay đổi trạng thái, tất cả các bên phụ thuộc được thông báo tự động', 'Tự động kết nối hai hệ thống không tương thích', 'Che giấu cấu trúc lưu trữ của cơ sở dữ liệu', 'Đóng gói thuật toán rẽ nhánh'],
    ARRAY['Định nghĩa mối quan hệ phụ thuộc một-nhiều; khi một đối tượng thay đổi trạng thái, tất cả các bên phụ thuộc được thông báo tự động']::varchar[],
    'Observer giúp giảm tính liên kết (coupling), là nền tảng của mô hình Pub-Sub và lập trình hướng sự kiện.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_062', 'mcq', 'architecture-design',
    'Trong Observer Pattern, đối tượng phát đi thông báo thay đổi trạng thái được gọi là gì?',
    ARRAY['Subject (hoặc Publisher)', 'Observer (hoặc Subscriber)', 'Adapter', 'Strategy'],
    ARRAY['Subject (hoặc Publisher)']::varchar[],
    'Subject nắm giữ danh sách các Observers đăng ký nhận tin và gọi hàm thông báo của chúng khi trạng thái của nó đổi.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_063', 'mcq', 'architecture-design',
    'Mẫu thiết kế "Strategy" giải quyết bài toán gì trong thiết kế code?',
    ARRAY['Định nghĩa tập hợp các thuật toán rẽ nhánh, đóng gói lại để dễ dàng thay thế luân phiên nhau tại Runtime', 'Tạo ra kết nối an toàn cho cổng mạng', 'Ngăn chặn tràn bộ đệm stack', 'Thay đổi cấu trúc của class cha'],
    ARRAY['Định nghĩa tập hợp các thuật toán rẽ nhánh, đóng gói lại để dễ dàng thay thế luân phiên nhau tại Runtime']::varchar[],
    'Strategy thay thế các câu lệnh `if-else` phức tạp bằng cách đa hình hóa thuật toán thành các class chuyên biệt.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_064', 'mcq', 'architecture-design',
    'Mẫu thiết kế "Adapter" đóng vai trò là gì trong kiến trúc hệ thống?',
    ARRAY['Hoạt động như bộ chuyển đổi giúp hai interface không tương thích có thể tương tác làm việc được với nhau mà không cần sửa code cũ', 'Tăng tốc độ sao lưu của database', 'Chặn đứng các truy cập mạng không hợp lệ', 'Tự động dọn dẹp các đối tượng rác trong RAM'],
    ARRAY['Hoạt động như bộ chuyển đổi giúp hai interface không tương thích có thể tương tác làm việc được với nhau mà không cần sửa code cũ']::varchar[],
    'Adapter bọc (wrapper) lớp có sẵn để cung cấp giao diện phù hợp với yêu cầu của client.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_065', 'mcq', 'architecture-design',
    'Khi thiết kế giỏ hàng hỗ trợ các cổng thanh toán Paypal, Stripe, Momo linh hoạt đổi tại lúc checkout, ta áp dụng mẫu thiết kế nào?',
    ARRAY['Strategy Pattern', 'Singleton Pattern', 'Observer Pattern', 'Adapter Pattern'],
    ARRAY['Strategy Pattern']::varchar[],
    'Mỗi cổng thanh toán là một chiến lược (Strategy) triển khai chung interface `PaymentStrategy`. Giỏ hàng chỉ gọi phương thức `pay()` đa hình.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_066', 'mcq', 'architecture-design',
    'Nhược điểm lớn nhất cần lưu ý khi lập trình Observer Pattern để tránh rò rỉ bộ nhớ (Memory Leak) là gì?',
    ARRAY['Bắt buộc phải hủy đăng ký (unsubscribe/removeObserver) các đối tượng quan sát khi chúng không còn sử dụng để Garbage Collector thu hồi RAM', 'Thuật toán chạy tốn quá nhiều xung nhịp CPU', 'Không sử dụng được trên nhiều thread', 'Làm phình to kích thước file exe'],
    ARRAY['Bắt buộc phải hủy đăng ký (unsubscribe/removeObserver) các đối tượng quan sát khi chúng không còn sử dụng để Garbage Collector thu hồi RAM']::varchar[],
    'Nếu không unsubscribe, Subject vẫn giữ tham chiếu static tới Observer làm JVM/V8 không bao giờ giải phóng được vùng nhớ của Observer đó.',
    7, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_067', 'mcq', 'architecture-design',
    'Mẫu thiết kế cấu trúc "Decorator" dùng để làm gì?',
    ARRAY['Cho phép bổ sung thêm tính năng/trách nhiệm cho đối tượng hiện tại một cách động tại runtime mà không ảnh hưởng lớp khác', 'Trang trí màu sắc cho giao diện HTML', 'Khởi tạo đối tượng bằng hàm băm', 'Thay thế hoàn toàn cấu trúc Singleton'],
    ARRAY['Cho phép bổ sung thêm tính năng/trách nhiệm cho đối tượng hiện tại một cách động tại runtime mà không ảnh hưởng lớp khác']::varchar[],
    'Decorator bọc đối tượng gốc và ghi đè phương thức để thêm hành vi bổ sung (ví dụ: thêm trân châu, đường vào đối tượng trà sữa gốc).',
    7, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_068', 'mcq', 'architecture-design',
    'Để bọc một hệ thống con (Subsystem) phức tạp chứa hàng chục lớp bên trong bằng một giao diện đơn giản duy nhất cho client dễ gọi, ta dùng mẫu thiết kế nào?',
    ARRAY['Facade Pattern', 'Observer Pattern', 'Strategy Pattern', 'Adapter Pattern'],
    ARRAY['Facade Pattern']::varchar[],
    'Facade (Mặt tiền) cung cấp giao diện cấp cao đơn giản hóa việc tương tác với các thư viện/hệ thống con rối rắm bên dưới.',
    6, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_069', 'short-answer', 'architecture-design',
    'Điền tên mẫu thiết kế hành vi định nghĩa mối quan hệ phụ thuộc một-nhiều gửi thông báo sự kiện tự động. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Observer']::varchar[],
    'Observer đồng bộ hóa sự kiện tự động giữa các đối tượng.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  ),
  (
    'cs_se_q_070', 'short-answer', 'architecture-design',
    'Điền tên mẫu thiết kế hành vi đóng gói thuật toán rẽ nhánh linh hoạt thay thế tại runtime. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Strategy']::varchar[],
    'Strategy đa hình hóa các chiến lược thuật toán.',
    5, 'Design Patterns', 'cs_software_engineering', 13, 'cs_se_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Phương pháp kiểm thử (cs_se_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_071', 'mcq', 'quality-testing',
    'Cấp độ kiểm thử phần mềm nào tập trung kiểm tra các thành phần nhỏ nhất của code (như hàm, phương thức) một cách cô lập?',
    ARRAY['Kiểm thử đơn vị (Unit Testing)', 'Kiểm thử tích hợp (Integration Testing)', 'Kiểm thử hệ thống (System Testing)', 'Kiểm thử chấp nhận (Acceptance Testing)'],
    ARRAY['Kiểm thử đơn vị (Unit Testing)']::varchar[],
    'Unit test kiểm thử cô lập mã nguồn ở cấp độ hàm thô sơ nhất, do chính dev thực hiện.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_072', 'mcq', 'quality-testing',
    'Khác biệt cốt lõi giữa Kiểm thử hộp đen (Black-box) và Kiểm thử hộp trắng (White-box) là gì?',
    ARRAY['Hộp đen không biết cấu trúc mã nguồn bên trong, chỉ test input/output; hộp trắng biết rõ code bên trong để test luồng logic', 'Hộp đen chỉ chạy trên terminal đen', 'Hộp trắng bảo mật hơn hộp đen', 'Hộp đen do khách hàng làm, hộp trắng do QA làm'],
    ARRAY['Hộp đen không biết cấu trúc mã nguồn bên trong, chỉ test input/output; hộp trắng biết rõ code bên trong để test luồng logic']::varchar[],
    'Kiểm thử hộp trắng phân tích code coverage, nhánh rẽ nhánh if-else; kiểm thử hộp đen bám sát tài liệu đặc tả chức năng.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_073', 'mcq', 'quality-testing',
    'Kiểm thử tích hợp (Integration Testing) thực hiện nhiệm vụ gì?',
    ARRAY['Kiểm tra sự tương tác giao tiếp dữ liệu giữa các mô-đun kết hợp với nhau xem có ăn khớp không', 'Kiểm tra tốc độ tải của CPU', 'Kiểm tra lỗi chính tả của tài liệu yêu cầu', 'Chạy thử nghiệm sản phẩm với khách hàng'],
    ARRAY['Kiểm tra sự tương tác giao tiếp dữ liệu giữa các mô-đun kết hợp với nhau xem có ăn khớp không']::varchar[],
    'Integration testing phát hiện lỗi bất tương thích giao tiếp giữa các mô-đun riêng lẻ.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_074', 'mcq', 'quality-testing',
    'Tại sao ta cần sử dụng kỹ thuật "Mocking" khi viết Unit Test?',
    ARRAY['Để giả lập hành vi của các thành phần ngoại vi phụ thuộc (Database, API) giúp bài test chạy cô lập, cực nhanh và ổn định', 'Để tự động sửa các lỗi logic của code', 'Để tăng dung lượng RAM cho bài test', 'Để mã hóa kết nối mạng'],
    ARRAY['Để giả lập hành vi của các thành phần ngoại vi phụ thuộc (Database, API) giúp bài test chạy cô lập, cực nhanh và ổn định']::varchar[],
    'Mocking loại bỏ các tác động mạng chập chờn hay ghi đè dữ liệu rác vào database thật lúc chạy test.',
    6, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_075', 'mcq', 'quality-testing',
    'Quy trình TDD (Test-Driven Development) bắt buộc lập trình viên làm gì đầu tiên?',
    ARRAY['Viết kịch bản kiểm thử (Test Case) trước khi viết mã nguồn xử lý tính năng thực tế', 'Thiết kế sơ đồ database trước', 'Deploy ứng dụng lên production trước', 'Vẽ sơ đồ UML trước'],
    ARRAY['Viết kịch bản kiểm thử (Test Case) trước khi viết mã nguồn xử lý tính năng thực tế']::varchar[],
    'TDD gồm chu kỳ Red-Green-Refactor: viết test lỗi -> viết code tối giản để test qua -> refactor code sạch.',
    6, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_076', 'mcq', 'quality-testing',
    'Kiểm thử hồi quy (Regression Testing) được thực hiện khi nào?',
    ARRAY['Sau khi mã nguồn có sự thay đổi (sửa bug, thêm tính năng) để bảo đảm những thay đổi này không làm phát sinh lỗi mới ở các phần cũ hoạt động ổn định', 'Khi bắt đầu dự án', 'Khi server bị sập nguồn điện', 'Khi khách hàng từ chối nghiệm thu'],
    ARRAY['Sau khi mã nguồn có sự thay đổi (sửa bug, thêm tính năng) để bảo đảm những thay đổi này không làm phát sinh lỗi mới ở các phần cũ hoạt động ổn định']::varchar[],
    'Regression testing tự động hóa bảo vệ hệ thống không bị thụt lùi chất lượng khi nâng cấp code.',
    6, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_077', 'mcq', 'quality-testing',
    'Khái niệm "Code Coverage" (Độ bao phủ mã nguồn) đo lường điều gì?',
    ARRAY['Tỷ lệ phần trăm các dòng code/nhánh logic được thực thi bởi bộ Unit Test tự động', 'Tổng số lượng dòng code viết được', 'Số lượng bug đã sửa thành công', 'Kích thước của tệp mã nguồn lưu trên đĩa'],
    ARRAY['Tỷ lệ phần trăm các dòng code/nhánh logic được thực thi bởi bộ Unit Test tự động']::varchar[],
    'Code coverage giúp lập trình viên phát hiện các vùng code "chết" chưa bao giờ được chạy qua để bổ sung bài test.',
    6, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_078', 'mcq', 'quality-testing',
    'Ai chịu trách nhiệm chính trong việc thực hiện Kiểm thử đơn vị (Unit Test)?',
    ARRAY['Lập trình viên (Developers)', 'Kiểm thử viên (Tester/QA)', 'Product Owner', 'Scrum Master'],
    ARRAY['Lập trình viên (Developers)']::varchar[],
    'Unit test nằm sát tầng viết code nên do chính dev tự viết tự kiểm tra trước khi tạo Pull Request.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_079', 'short-answer', 'quality-testing',
    'Điền tên cấp độ kiểm thử nhỏ nhất cô lập do lập trình viên thực hiện. (Viết thường hoặc tiếng Anh)',
    NULL,
    ARRAY['unit test', 'kiểm thử đơn vị']::varchar[],
    'Unit Test là chốt chặn bảo vệ code ở mức cơ bản.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  ),
  (
    'cs_se_q_080', 'short-answer', 'quality-testing',
    'Điền tên phương pháp kiểm thử không quan tâm cấu trúc code bên trong, chỉ quan tâm chức năng input/output. (Tiếng Việt viết thường)',
    NULL,
    ARRAY['kiểm thử hộp đen', 'hộp đen']::varchar[],
    'Kiểm thử hộp đen bám sát nghiệp vụ người dùng.',
    5, 'Software Testing', 'cs_software_engineering', 13, 'cs_se_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Nguyên lý SOLID & Tái cấu trúc code (cs_se_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_081', 'mcq', 'quality-testing',
    'Chữ "S" trong nguyên lý SOLID - Single Responsibility Principle (Đơn nhiệm) yêu cầu điều gì?',
    ARRAY['Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ làm một nhiệm vụ duy nhất)', 'Một hàm chỉ được phép có 1 dòng code', 'Hệ thống chỉ chạy trên 1 luồng duy nhất', 'Chỉ dùng duy nhất một cơ sở dữ liệu'],
    ARRAY['Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ làm một nhiệm vụ duy nhất)']::varchar[],
    'Lớp gộp quá nhiều trách nhiệm (God Class) sẽ cực kỳ khó sửa đổi và dễ làm hỏng các tính năng liên quan khác.',
    5, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_082', 'mcq', 'quality-testing',
    'Chữ "O" trong SOLID - Open/Closed Principle (Mở/Đóng) phát biểu điều gì?',
    ARRAY['Mã nguồn nên mở cho việc mở rộng (thêm tính năng mới) nhưng đóng trước việc sửa đổi trực tiếp code cũ đang chạy ổn định', 'Mở mã nguồn cho cộng đồng và đóng database', 'Mở cổng mạng 80 và đóng cổng 22', 'Mở rộng RAM và đóng bớt CPU'],
    ARRAY['Mã nguồn nên mở cho việc mở rộng (thêm tính năng mới) nhưng đóng trước việc sửa đổi trực tiếp code cũ đang chạy ổn định']::varchar[],
    'Thực hiện Open-Closed bằng cách sử dụng đa hình (Polymorphism) và trừu tượng hóa (Abstract/Interface).',
    6, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_083', 'mcq', 'quality-testing',
    'Nguyên lý thay thế Liskov (Liskov Substitution Principle - chữ L trong SOLID) cảnh báo điều nguy hiểm nào khi kế thừa?',
    ARRAY['Lớp con khi kế thừa không được phép thay đổi logic mặc định hoặc làm hỏng tính đúng đắn của lớp cha (ví dụ ném ngoại lệ không mong đợi)', 'Cấm không cho lớp con ghi đè phương thức', 'Lớp con bắt buộc phải có kích thước nhỏ hơn lớp cha', 'Lớp con phải chạy nhanh hơn lớp cha'],
    ARRAY['Lớp con khi kế thừa không được phép thay đổi logic mặc định hoặc làm hỏng tính đúng đắn của lớp cha (ví dụ ném ngoại lệ không mong đợi)']::varchar[],
    'Liskov bảo đảm tính đa hình chạy an toàn. Ví dụ điển hình: Lớp Chim có hàm bay, lớp con Chim Cánh Cụt kế thừa ném lỗi UnsupportedOperation là vi phạm Liskov.',
    7, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_084', 'mcq', 'quality-testing',
    'Chữ "I" trong SOLID - Interface Segregation Principle (Phân tách giao diện) khuyên chúng ta nên thiết kế giao diện thế nào?',
    ARRAY['Nên chia nhỏ các giao diện lớn cồng kềnh thành nhiều giao diện nhỏ chuyên biệt để client không phải triển khai các hàm dư thừa', 'Gộp toàn bộ các hàm vào một interface lớn duy nhất', 'Cấm dùng interface trong dự án', 'Chỉ dùng interface cho các lớp số thực'],
    ARRAY['Nên chia nhỏ các giao diện lớn cồng kềnh thành nhiều giao diện nhỏ chuyên biệt để client không phải triển khai các hàm dư thừa']::varchar[],
    'Phân tách interface giúp giảm sự phụ thuộc rác giữa client và các phương thức không liên quan.',
    6, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_085', 'mcq', 'quality-testing',
    'Nguyên lý đảo ngược phụ thuộc (Dependency Inversion Principle - chữ D trong SOLID) quy định mối liên kết thế nào giữa mô-đun cấp cao và cấp thấp?',
    ARRAY['Cả hai mô-đun cấp cao và cấp thấp bắt buộc phải phụ thuộc vào sự trừu tượng (Interface/Abstraction), không phụ thuộc vào lớp triển khai cụ thể', 'Mô-đun cấp cao phụ thuộc trực tiếp vào mô-đun cấp thấp', 'Cấm không cho hai mô-đun gọi nhau', 'Mô-đun cấp thấp phải kế thừa mô-đun cấp cao'],
    ARRAY['Cả hai mô-đun cấp cao và cấp thấp bắt buộc phải phụ thuộc vào sự trừu tượng (Interface/Abstraction), không phụ thuộc vào lớp triển khai cụ thể']::varchar[],
    'Dependency Inversion loại bỏ sự phụ thuộc cứng nhắc, cho phép dễ dàng thay thế lớp triển khai chi tiết (như đổi loại DB, đổi cổng API).',
    7, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_086', 'mcq', 'quality-testing',
    'Khái niệm "Refactoring" (Tái cấu trúc code) thực hiện việc gì trên mã nguồn?',
    ARRAY['Cải tiến cấu trúc thiết kế nội bộ của mã nguồn làm sạch code mà KHÔNG làm thay đổi hành vi hoạt động bên ngoài của hệ thống', 'Viết lại toàn bộ phần mềm từ đầu bằng ngôn ngữ khác', 'Sửa đổi logic tính năng để đáp ứng yêu cầu mới của khách hàng', 'Mã hóa code để chống dịch ngược'],
    ARRAY['Cải tiến cấu trúc thiết kế nội bộ của mã nguồn làm sạch code mà KHÔNG làm thay đổi hành vi hoạt động bên ngoài của hệ thống']::varchar[],
    'Refactoring loại bỏ các mùi hôi của code (code smells) giúp code dễ đọc, dễ bảo trì và dễ mở rộng hơn.',
    6, 'Refactoring', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_087', 'mcq', 'quality-testing',
    'Kỹ thuật "Dependency Injection" (DI) hỗ trợ hiện thực hóa nguyên lý nào trong SOLID?',
    ARRAY['Dependency Inversion Principle (Đảo ngược phụ thuộc)', 'Single Responsibility Principle', 'Liskov Substitution Principle', 'Open/Closed Principle'],
    ARRAY['Dependency Inversion Principle (Đảo ngược phụ thuộc)']::varchar[],
    'DI tự động bơm (inject) các đối tượng phụ thuộc (qua constructor, setter) vào lớp sử dụng, loại bỏ việc tự new đối tượng cụ thể.',
    6, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_088', 'mcq', 'quality-testing',
    'Mùi hôi của code "Duplicated Code" (Code trùng lặp nhiều nơi) nên được xử lý thế nào khi Refactoring?',
    ARRAY['Trích xuất khối code trùng lặp ra một hàm chuyên biệt chung (Extract Method) và gọi dùng lại', 'Xoá bớt một nửa số code trùng lặp và bỏ qua lỗi', 'Mã hóa toàn bộ file code', 'Đổi tên các biến số cho khác nhau để đánh lừa compiler'],
    ARRAY['Trích xuất khối code trùng lặp ra một hàm chuyên biệt chung (Extract Method) và gọi dùng lại']::varchar[],
    'Trích xuất hàm giúp tuân thủ nguyên lý DRY (Don''t Repeat Yourself), giảm thiểu công sức sửa lỗi sau này.',
    5, 'Refactoring', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_089', 'short-answer', 'quality-testing',
    'Điền tên nguyên lý chữ O trong SOLID viết tắt bằng tiếng Việt. (Viết thường)',
    NULL,
    ARRAY['mở đóng', 'nguyên lý mở đóng']::varchar[],
    'Open/Closed là nguyên lý thiết kế mở rộng không sửa đổi.',
    5, 'SOLID Principles', 'cs_software_engineering', 13, 'cs_se_09'
  ),
  (
    'cs_se_q_090', 'short-answer', 'quality-testing',
    'Điền từ tiếng Anh chỉ quá trình cải tiến cấu trúc code bên trong giữ nguyên hành vi bên ngoài. (Viết thường)',
    NULL,
    ARRAY['refactoring', 'tái cấu trúc code']::varchar[],
    'Refactoring làm sạch code nâng cao khả năng bảo trì.',
    5, 'Refactoring', 'cs_software_engineering', 13, 'cs_se_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Tích hợp và triển khai liên tục (cs_se_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_se_q_091', 'mcq', 'quality-testing',
    'Tiến trình CI (Continuous Integration - Tích hợp liên tục) thực hiện tự động hóa hành động nào ngay khi developer commit code?',
    ARRAY['Tự động kích hoạt build dự án và chạy toàn bộ hệ thống Unit Test tự động để phát hiện lỗi tích hợp sớm nhất', 'Tự động gửi email báo cáo lương cho dev', 'Tự động deploy code thẳng lên máy chủ chạy thật Production', 'Tự động tạo ra các ticket lỗi trên Jira'],
    ARRAY['Tự động kích hoạt build dự án và chạy toàn bộ hệ thống Unit Test tự động để phát hiện lỗi tích hợp sớm nhất']::varchar[],
    'CI giúp đảm bảo code mới của các thành viên không làm hỏng (break) các tính năng hiện có của dự án.',
    5, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_092', 'mcq', 'quality-testing',
    'Sự khác biệt cốt lõi giữa Continuous Delivery và Continuous Deployment trong CD là gì?',
    ARRAY['Continuous Deployment tự động hóa hoàn toàn việc đưa bản build lên Production không cần con người can thiệp; Continuous Delivery cần nút bấm duyệt thủ công', 'Continuous Delivery chạy nhanh hơn', 'Continuous Deployment không cần chạy test', 'Continuous Delivery chỉ dành cho hệ thống di động'],
    ARRAY['Continuous Deployment tự động hóa hoàn toàn việc đưa bản build lên Production không cần con người can thiệp; Continuous Delivery cần nút bấm duyệt thủ công']::varchar[],
    'Continuous Deployment là tự động hóa tối đa luồng phát hành (fully automated release pipeline).',
    6, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_093', 'mcq', 'quality-testing',
    'Docker giải quyết bài toán kinh điển nào trong vận hành phần mềm?',
    ARRAY['Đóng gói ứng dụng kèm mọi thư viện môi trường phụ thuộc vào Container độc lập, loại bỏ lỗi lệch môi trường máy dev vs máy production', 'Tự động sửa các lỗi cú pháp code', 'Tăng tốc độ truy cập internet của server', 'Mã hóa cơ sở dữ liệu chống hack'],
    ARRAY['Đóng gói ứng dụng kèm mọi thư viện môi trường phụ thuộc vào Container độc lập, loại bỏ lỗi lệch môi trường máy dev vs máy production']::varchar[],
    'Docker bảo đảm tính nhất quán hoạt động "Build once, run anywhere".',
    6, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_094', 'mcq', 'quality-testing',
    'Tại sao Docker Container lại khởi động nhanh và nhẹ hơn Máy ảo (Virtual Machine - VM) truyền thống?',
    ARRAY['Vì Container chia sẻ chung nhân hệ điều hành (Host OS Kernel) và không cần cài đặt nguyên một hệ điều hành khách (Guest OS) bên trong', 'Vì Container không cần RAM để chạy', 'Vì Container chỉ viết bằng ngôn ngữ C', 'Vì Container tự động nén mã nguồn nhị phân'],
    ARRAY['Vì Container chia sẻ chung nhân hệ điều hành (Host OS Kernel) và không cần cài đặt nguyên một hệ điều hành khách (Guest OS) bên trong']::varchar[],
    'VM bắt buộc phải khởi chạy một Guest OS hoàn chỉnh tốn hàng GB RAM/Disk và mất vài phút khởi động; Container chỉ cô lập tiến trình nên cực nhẹ.',
    7, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_095', 'mcq', 'quality-testing',
    'Trong quy trình nhánh Git Flow, nhánh nào chứa mã nguồn ổn định nhất đang chạy thật trên môi trường Production?',
    ARRAY['main / master', 'develop', 'feature', 'release']::varchar[],
    ARRAY['main / master']::varchar[],
    'Nhánh main/master luôn là đại diện cho trạng thái production-ready đã được kiểm thử kỹ lưỡng.',
    5, 'Git Strategy', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_096', 'mcq', 'quality-testing',
    'Nhánh "hotfix" trong Git Flow được sử dụng khi nào?',
    ARRAY['Khi phát hiện lỗi nghiêm trọng phát sinh trực tiếp trên môi trường Production cần sửa và merge khẩn cấp', 'Khi bắt đầu code một tính năng mới', 'Khi chuẩn bị bàn giao bản phát hành cuối tháng', 'Khi Scrum Master muốn xem code'],
    ARRAY['Khi phát hiện lỗi nghiêm trọng phát sinh trực tiếp trên môi trường Production cần sửa và merge khẩn cấp']::varchar[],
    'Hotfix được rẽ nhánh trực tiếp từ master/main, sửa lỗi xong sẽ merge ngược lại vào cả main và develop.',
    6, 'Git Strategy', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_097', 'mcq', 'quality-testing',
    'Chốt chặn bảo vệ bắt buộc phải có để quy trình CI/CD vận hành an toàn và tin cậy là gì?',
    ARRAY['Hệ thống kiểm thử tự động (Automated Testing) tốt bao phủ các lỗi cốt lõi', 'Đội ngũ Scrum Master đông đảo', 'Một máy chủ CPU 128 lõi', 'Sử dụng hệ cơ sở dữ liệu NoSQL'],
    ARRAY['Hệ thống kiểm thử tự động (Automated Testing) tốt bao phủ các lỗi cốt lõi']::varchar[],
    'Thiếu test tự động, CI/CD sẽ trở thành Continuous Disaster - tự động chuyển mã lỗi lên production nhanh hơn.',
    6, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_098', 'mcq', 'quality-testing',
    'Tệp tin "Dockerfile" dùng để làm gì trong phát triển phần mềm?',
    ARRAY['Định nghĩa các chỉ thị từng bước để build một Container Image tự động chứa ứng dụng', 'Lưu trữ mật khẩu cơ sở dữ liệu của dự án', 'Đo kích thước code coverage của unit test', 'Chứa danh sách các thành viên Scrum team'],
    ARRAY['Định nghĩa các chỉ thị từng bước để build một Container Image tự động chứa ứng dụng']::varchar[],
    'Dockerfile là bản thiết kế chứa các dòng lệnh cài đặt môi trường, copy source và cấu hình cổng chạy cho container.',
    6, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_099', 'short-answer', 'quality-testing',
    'Điền tên viết tắt của tiến trình Tích hợp liên tục trong DevOps. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CI']::varchar[],
    'CI là Continuous Integration.',
    5, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  ),
  (
    'cs_se_q_100', 'short-answer', 'quality-testing',
    'Điền tên công cụ ảo hóa đóng gói ứng dụng vào container độc lập phổ biến nhất. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Docker']::varchar[],
    'Docker thống trị mảng containerization DevOps.',
    5, 'CI/CD & DevOps', 'cs_software_engineering', 13, 'cs_se_10'
  );

COMMIT;
