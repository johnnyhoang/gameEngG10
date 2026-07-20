-- SQL migration: Improved questions for cs_software_engineering (grade_tier = 13)
-- Version 2 — options cân bằng độ dài, distractors plausible, đáp án đúng không phải luôn dài nhất
-- Pattern: A/B/C/D xoay vòng vị trí đúng, mỗi option ~15-30 từ

BEGIN;

-- Xóa câu hỏi cũ của SE để insert mới (giữ nguyên lesson_id linkage)
DELETE FROM ge10_custom_questions WHERE subject = 'cs_software_engineering' AND grade_tier = 13;

INSERT INTO ge10_custom_questions (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES

-- ===================== BÀI 1: Waterfall, V-Model, Spiral =====================
(
  'cs_se_q_001', 'mcq', 'software-processes', 'software-processes',
  'Đặc điểm cốt lõi phân biệt Waterfall với Agile là gì?',
  ARRAY[
    'Waterfall giao phần mềm chạy được cuối mỗi Sprint 2 tuần',
    'Waterfall không cần viết tài liệu thiết kế',
    'Waterfall tuyến tính tuần tự — giai đoạn sau chỉ bắt đầu khi giai đoạn trước kết thúc',
    'Waterfall cho phép thay đổi yêu cầu ở bất kỳ giai đoạn nào'
  ],
  ARRAY['Waterfall tuyến tính tuần tự — giai đoạn sau chỉ bắt đầu khi giai đoạn trước kết thúc']::varchar[],
  'Đây là bản chất của Waterfall: sequential + phase-gate. Không có vòng lặp, không có increment giữa chừng.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_002', 'mcq', 'software-processes', 'software-processes',
  'Nhược điểm nguy hiểm nhất của Waterfall trong thực tế là gì?',
  ARRAY[
    'Không thể ước tính chi phí dự án',
    'Lỗi thiết kế chỉ bị phát hiện ở giai đoạn test muộn, chi phí sửa rất cao',
    'Không phù hợp cho dự án có đội ngũ lớn hơn 10 người',
    'Không cho phép viết unit test trong quá trình phát triển'
  ],
  ARRAY['Lỗi thiết kế chỉ bị phát hiện ở giai đoạn test muộn, chi phí sửa rất cao']::varchar[],
  'Boehm Cost of Change curve: lỗi phát hiện ở test muộn tốn gấp 10-100x so với lỗi phát hiện lúc phân tích yêu cầu.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_003', 'mcq', 'software-processes', 'software-processes',
  'V-Model khác Waterfall ở điểm then chốt nào?',
  ARRAY[
    'V-Model dùng vòng lặp Sprint thay vì giai đoạn tuyến tính',
    'V-Model bỏ hoàn toàn giai đoạn thiết kế hệ thống',
    'V-Model lập kế hoạch test song song với từng giai đoạn phát triển tương ứng',
    'V-Model chỉ áp dụng được cho dự án phần mềm nhúng'
  ],
  ARRAY['V-Model lập kế hoạch test song song với từng giai đoạn phát triển tương ứng']::varchar[],
  'Requirements ↔ Acceptance Test; System Design ↔ System Test; Module Design ↔ Unit Test — viết cùng lúc, không phải sau khi code xong.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_004', 'mcq', 'software-processes', 'software-processes',
  'Hoạt động đặc trưng duy nhất của Spiral Model ở mỗi vòng lặp là gì?',
  ARRAY[
    'Phân tích rủi ro chuyên sâu trước khi tiến vào giai đoạn phát triển',
    'Họp Daily Standup hàng ngày với toàn bộ stakeholder',
    'Viết tài liệu SRS đầy đủ và phê duyệt trước mỗi sprint',
    'Deploy lên production sau mỗi vòng lặp bất kể độ hoàn thiện'
  ],
  ARRAY['Phân tích rủi ro chuyên sâu trước khi tiến vào giai đoạn phát triển']::varchar[],
  'Risk Analysis là đặc trưng độc nhất của Spiral. Mỗi vòng xoắn có 4 góc: Objectives → Risk Analysis → Development & Test → Planning.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_005', 'mcq', 'software-processes', 'software-processes',
  'Waterfall phù hợp nhất cho loại dự án nào trong thực tế?',
  ARRAY[
    'Dự án game mobile cần cập nhật tính năng theo tuần',
    'SaaS startup cần ra mắt MVP nhanh để thử nghiệm thị trường',
    'Phần mềm điều khiển tên lửa với yêu cầu cố định và chuẩn an toàn nghiêm ngặt',
    'Hệ thống thương mại điện tử cần tối ưu liên tục dựa trên A/B testing'
  ],
  ARRAY['Phần mềm điều khiển tên lửa với yêu cầu cố định và chuẩn an toàn nghiêm ngặt']::varchar[],
  'Hệ thống an toàn cao (DO-178C cho hàng không) yêu cầu tài liệu đầy đủ, phê duyệt từng giai đoạn — phù hợp nhất với Waterfall.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_006', 'mcq', 'software-processes', 'software-processes',
  'Mô hình nào phù hợp nhất cho dự án AI có rủi ro công nghệ chưa được kiểm chứng?',
  ARRAY[
    'V-Model vì có kế hoạch test rõ ràng từ sớm',
    'Waterfall vì yêu cầu được định nghĩa đầy đủ ngay từ ban đầu',
    'Spiral Model vì phân tích rủi ro từng vòng giúp quyết định tiếp tục hay dừng',
    'Scrum vì Sprint 2 tuần là đủ để phát triển AI'
  ],
  ARRAY['Spiral Model vì phân tích rủi ro từng vòng giúp quyết định tiếp tục hay dừng']::varchar[],
  'Dự án R&D với bất định công nghệ cao cần Spiral: vòng 1 prototype, đánh giá rủi ro, rồi mới đầu tư full.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_007', 'mcq', 'software-processes', 'software-processes',
  'Trong Spiral Model, vòng xoắn đầu tiên thường tập trung vào điều gì?',
  ARRAY[
    'Deploy sản phẩm hoàn chỉnh lên production ngay lập tức',
    'Xây dựng prototype để làm rõ yêu cầu và đánh giá rủi ro ban đầu',
    'Viết toàn bộ test case cho hệ thống cuối cùng',
    'Phân công task và thiết lập deadline cho toàn bộ dự án'
  ],
  ARRAY['Xây dựng prototype để làm rõ yêu cầu và đánh giá rủi ro ban đầu']::varchar[],
  'Vòng 1 Spiral thường nhỏ: xác định concept, tạo proof-of-concept, đánh giá rủi ro kỹ thuật và kinh doanh.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_008', 'mcq', 'software-processes', 'software-processes',
  'Tại sao Waterfall khó thích nghi với thay đổi yêu cầu giữa dự án?',
  ARRAY[
    'Waterfall không cho phép team họp hàng ngày để cập nhật tiến độ',
    'Vì mỗi giai đoạn có cổng phê duyệt (phase-gate), quay lại giai đoạn trước rất tốn kém',
    'Waterfall yêu cầu toàn bộ team phải ngồi cùng văn phòng',
    'Vì Waterfall bắt buộc dùng ngôn ngữ lập trình cố định từ đầu dự án'
  ],
  ARRAY['Vì mỗi giai đoạn có cổng phê duyệt (phase-gate), quay lại giai đoạn trước rất tốn kém']::varchar[],
  'Phase-gate = mỗi giai đoạn phải có deliverable được duyệt. Thay đổi requirement sau khi design đã phê duyệt đồng nghĩa với làm lại từ giai đoạn đó.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_009', 'mcq', 'software-processes', 'software-processes',
  'Điểm nào dưới đây là ưu điểm của V-Model so với Waterfall thuần túy?',
  ARRAY[
    'V-Model loại bỏ hoàn toàn giai đoạn coding',
    'V-Model cho phép thay đổi yêu cầu bất kỳ lúc nào trong dự án',
    'Test plan được viết sớm song song với phát triển, giúp phát hiện lỗi thiết kế sớm hơn',
    'V-Model không cần stakeholder review trước khi bắt đầu code'
  ],
  ARRAY['Test plan được viết sớm song song với phát triển, giúp phát hiện lỗi thiết kế sớm hơn']::varchar[],
  'Đây là giá trị cốt lõi V-Model thêm vào so với Waterfall: testability được xem xét ngay từ khi thiết kế.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_010', 'mcq', 'software-processes', 'software-processes',
  'Nhược điểm chính của Spiral Model là gì?',
  ARRAY[
    'Spiral không có tài liệu thiết kế nên khó bảo trì',
    'Spiral không cho phép team dùng framework hiện đại',
    'Chi phí cao và yêu cầu chuyên gia đánh giá rủi ro — không phù hợp cho dự án nhỏ',
    'Spiral bắt buộc phải dùng ngôn ngữ lập trình hướng đối tượng'
  ],
  ARRAY['Chi phí cao và yêu cầu chuyên gia đánh giá rủi ro — không phù hợp cho dự án nhỏ']::varchar[],
  'Risk Analysis chuyên sâu mỗi vòng tốn thời gian và tiền bạc. Spiral phù hợp dự án triệu đô, không phải startup nhỏ.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),

-- ===================== BÀI 2: Agile & Scrum =====================
(
  'cs_se_q_011', 'mcq', 'software-processes', 'software-processes',
  'Agile Manifesto đề cao điều gì hơn "tuân thủ kế hoạch"?',
  ARRAY[
    'Tài liệu đầy đủ cho mọi tính năng',
    'Phản hồi và thích nghi với thay đổi',
    'Hợp đồng cứng nhắc với khách hàng',
    'Phân quyền rõ ràng giữa developer và QA'
  ],
  ARRAY['Phản hồi và thích nghi với thay đổi']::varchar[],
  'Giá trị thứ 4 của Agile Manifesto: Responding to change over following a plan.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_012', 'mcq', 'software-processes', 'software-processes',
  'Vai trò của Product Owner (PO) trong Scrum là gì?',
  ARRAY[
    'Giao task trực tiếp cho từng developer và theo dõi tiến độ hàng ngày',
    'Viết code cho tính năng có độ ưu tiên cao nhất',
    'Quản lý Product Backlog và quyết định độ ưu tiên tính năng dựa trên giá trị business',
    'Chạy Daily Standup và ghi nhận blocker của team'
  ],
  ARRAY['Quản lý Product Backlog và quyết định độ ưu tiên tính năng dựa trên giá trị business']::varchar[],
  'PO sở hữu Product Backlog — danh sách ưu tiên của tất cả công việc cần làm. PO quyết định "What" chứ không quyết định "How".',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_013', 'mcq', 'software-processes', 'software-processes',
  'Scrum Master khác Project Manager ở điểm cơ bản nào?',
  ARRAY[
    'Scrum Master có quyền sa thải thành viên team không đạt KPI',
    'Scrum Master là servant-leader: phục vụ team, không giao task hay quản lý vi mô',
    'Scrum Master phụ trách viết tất cả tài liệu kỹ thuật cho dự án',
    'Scrum Master quyết định sprint goal cho mỗi sprint'
  ],
  ARRAY['Scrum Master là servant-leader: phục vụ team, không giao task hay quản lý vi mô']::varchar[],
  'Scrum Master loại bỏ blockers, coach team về Scrum process — không phải boss. Development Team tự tổ chức và tự nhận task.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_014', 'mcq', 'software-processes', 'software-processes',
  'Sự kiện nào trong Scrum dùng để cải thiện quy trình làm việc của team?',
  ARRAY[
    'Sprint Review',
    'Sprint Retrospective',
    'Sprint Planning',
    'Daily Standup'
  ],
  ARRAY['Sprint Retrospective']::varchar[],
  'Sprint Retrospective (Retro) là nơi team nhìn lại: What went well? What to improve? Actionable improvements cho Sprint tiếp.',
  4, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_015', 'mcq', 'software-processes', 'software-processes',
  'Daily Standup trong Scrum kéo dài tối đa bao lâu và tập trung vào điều gì?',
  ARRAY[
    '1 giờ — review toàn bộ tiến độ Sprint với Product Owner',
    '15 phút — đồng bộ team về tiến độ và phát hiện blocker',
    '30 phút — thảo luận kỹ thuật về cách implement tính năng',
    '4 giờ — lập kế hoạch chi tiết cho từng task của ngày hôm đó'
  ],
  ARRAY['15 phút — đồng bộ team về tiến độ và phát hiện blocker']::varchar[],
  '3 câu hỏi Daily Standup: Hôm qua làm gì? Hôm nay làm gì? Có blocker gì không? Đủ 15 phút là phải kết thúc.',
  4, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_016', 'mcq', 'software-processes', 'software-processes',
  'Sprint Review khác Sprint Retrospective ở chỗ nào?',
  ARRAY[
    'Sprint Review là họp nội bộ team, Retrospective là họp với khách hàng',
    'Sprint Review demo sản phẩm cho stakeholders, Retrospective cải thiện quy trình team',
    'Sprint Review chỉ có Scrum Master tham dự, Retrospective có toàn bộ team',
    'Sprint Review diễn ra đầu Sprint, Retrospective diễn ra giữa Sprint'
  ],
  ARRAY['Sprint Review demo sản phẩm cho stakeholders, Retrospective cải thiện quy trình team']::varchar[],
  'Review = product-focused (inspect increment). Retro = process-focused (inspect how the team works). Hai mục đích hoàn toàn khác nhau.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_017', 'mcq', 'software-processes', 'software-processes',
  'Hiểu đúng về Agile: phát biểu nào sau đây CHÍNH XÁC?',
  ARRAY[
    'Agile nghĩa là không cần viết tài liệu và không có kế hoạch',
    'Agile chỉ áp dụng được cho dự án phần mềm nhỏ dưới 5 người',
    'Agile đề cao phần mềm chạy tốt hơn tài liệu đầy đủ nhưng không phủ nhận vai trò của tài liệu',
    'Agile loại bỏ hoàn toàn vai trò Project Manager trong tổ chức'
  ],
  ARRAY['Agile đề cao phần mềm chạy tốt hơn tài liệu đầy đủ nhưng không phủ nhận vai trò của tài liệu']::varchar[],
  'Manifesto nói "over" không phải "instead of" — tài liệu vẫn cần, nhưng working software được ưu tiên hơn.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_018', 'mcq', 'software-processes', 'software-processes',
  'Velocity trong Scrum dùng để làm gì?',
  ARRAY[
    'Đo năng suất cá nhân của từng developer để khen thưởng',
    'Tính số giờ làm việc thực tế mỗi ngày của team',
    'Dự báo (forecast) tiến độ dựa trên Story Points hoàn thành trung bình mỗi Sprint',
    'Xác định bug density trong code sau mỗi Sprint'
  ],
  ARRAY['Dự báo (forecast) tiến độ dựa trên Story Points hoàn thành trung bình mỗi Sprint']::varchar[],
  'Velocity = Story Points done per Sprint (trung bình). Nếu velocity = 40 và backlog còn 200 points → cần ~5 Sprint nữa.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_019', 'mcq', 'software-processes', 'software-processes',
  'Ai có quyền hủy Sprint đang chạy trong Scrum?',
  ARRAY[
    'Scrum Master khi thấy team không đạt velocity mục tiêu',
    'Product Owner khi Sprint Goal không còn giá trị với business',
    'Development Team khi gặp quá nhiều technical blocker',
    'CEO hoặc sponsor dự án khi cần cắt giảm chi phí'
  ],
  ARRAY['Product Owner khi Sprint Goal không còn giá trị với business']::varchar[],
  'PO là người duy nhất có quyền hủy Sprint — và chỉ khi Sprint Goal không còn ý nghĩa (ví dụ: thị trường thay đổi đột ngột).',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_020', 'mcq', 'software-processes', 'software-processes',
  'Development Team trong Scrum lý tưởng gồm bao nhiêu người và tại sao?',
  ARRAY[
    '1-2 người vì càng ít người càng ít conflict và làm việc nhanh hơn',
    '3-9 người: đủ nhỏ để giao tiếp hiệu quả, đủ lớn để có đủ kỹ năng delivery',
    '10-20 người vì cần nhiều kỹ năng khác nhau cho dự án phức tạp',
    'Không giới hạn — Scrum có thể scale lên bất kỳ team size nào'
  ],
  ARRAY['3-9 người: đủ nhỏ để giao tiếp hiệu quả, đủ lớn để có đủ kỹ năng delivery']::varchar[],
  'Jeff Bezos 2-pizza rule tương đương. > 9 người: communication overhead tăng bậc hai. < 3 người: thiếu kỹ năng đa dạng.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),

-- ===================== BÀI 3: User Stories & UML =====================
(
  'cs_se_q_021', 'mcq', 'software-requirements', 'software-requirements',
  'Format chuẩn của một User Story trong Agile là gì?',
  ARRAY[
    'WHEN [trigger] THEN [system action] AND [expected outcome]',
    'As a [role], I want [feature] so that [benefit]',
    'Given [context] When [action] Then [result]',
    'Feature [name]: [description] — Priority [High/Med/Low]'
  ],
  ARRAY['As a [role], I want [feature] so that [benefit]']::varchar[],
  'User Story viết từ góc nhìn người dùng. "So that" bắt buộc — nếu không có lý do, story không có giá trị rõ ràng.',
  4, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_022', 'mcq', 'software-requirements', 'software-requirements',
  'Yêu cầu nào sau đây là Non-Functional Requirement (NFR)?',
  ARRAY[
    'Người dùng có thể đặt hàng tối đa 10 sản phẩm cùng lúc',
    'Hệ thống phải phản hồi trong vòng 200ms cho 95% request',
    'Admin có thể xem danh sách tất cả đơn hàng trong ngày',
    'Hệ thống gửi email xác nhận sau khi đặt hàng thành công'
  ],
  ARRAY['Hệ thống phải phản hồi trong vòng 200ms cho 95% request']::varchar[],
  'NFR mô tả chất lượng hệ thống (performance, security, reliability) — không phải "làm gì" mà là "làm thế nào tốt".',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_023', 'mcq', 'software-requirements', 'software-requirements',
  'Trong Use Case Diagram, quan hệ <<include>> có nghĩa là gì?',
  ARRAY[
    'Use Case A tùy chọn có thể gọi Use Case B trong một số tình huống nhất định',
    'Use Case A luôn luôn phải gọi Use Case B — quan hệ bắt buộc',
    'Use Case A và B có thể chạy song song không phụ thuộc nhau',
    'Use Case B kế thừa toàn bộ quan hệ của Use Case A'
  ],
  ARRAY['Use Case A luôn luôn phải gọi Use Case B — quan hệ bắt buộc']::varchar[],
  '<<include>> là bắt buộc: Checkout luôn include Authenticate User. Khác với <<extend>> là tùy chọn.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_024', 'mcq', 'software-requirements', 'software-requirements',
  'Quan hệ Composition trong UML Class Diagram thể hiện điều gì?',
  ARRAY[
    'Hai class có cùng interface và hoán đổi cho nhau được',
    'Object con tồn tại độc lập và có thể thuộc về nhiều object cha khác nhau',
    'Object cha sở hữu hoàn toàn object con — con không tồn tại nếu cha bị xóa',
    'Một class kế thừa tất cả methods và attributes từ class khác'
  ],
  ARRAY['Object cha sở hữu hoàn toàn object con — con không tồn tại nếu cha bị xóa']::varchar[],
  'House có Rooms (Composition): xóa House → Room không còn tồn tại. Khác với Aggregation (Library có Books: xóa Library, Book vẫn tồn tại).',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_025', 'mcq', 'software-requirements', 'software-requirements',
  'Tiêu chí "V" trong INVEST của User Story tốt có nghĩa là gì?',
  ARRAY[
    'Verifiable — Có thể xác minh bằng automated test',
    'Valuable — Mang giá trị rõ ràng và cụ thể cho người dùng',
    'Versioned — Được version control trong hệ thống quản lý',
    'Visible — Hiển thị rõ ràng trên Kanban board của team'
  ],
  ARRAY['Valuable — Mang giá trị rõ ràng và cụ thể cho người dùng']::varchar[],
  'Story không có giá trị rõ ràng → không nên làm. "Thêm index vào database" là technical task, không phải User Story có giá trị trực tiếp.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_026', 'mcq', 'software-requirements', 'software-requirements',
  'Actor trong Use Case Diagram có thể là gì?',
  ARRAY[
    'Chỉ có thể là người dùng con người với tài khoản đăng nhập',
    'Chỉ có thể là hệ thống bên ngoài (external system)',
    'Bất kỳ entity nào tương tác với hệ thống: người dùng, admin, hoặc hệ thống bên ngoài',
    'Chỉ có thể là các module nội bộ bên trong hệ thống đang phát triển'
  ],
  ARRAY['Bất kỳ entity nào tương tác với hệ thống: người dùng, admin, hoặc hệ thống bên ngoài']::varchar[],
  'Payment Gateway, Email Server, External API đều là Actor vì chúng tương tác với hệ thống từ bên ngoài.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_027', 'mcq', 'software-requirements', 'software-requirements',
  'NFR nào quyết định kiến trúc hệ thống nhiều nhất trong thực tế?',
  ARRAY[
    'Tính năng đăng nhập và đăng xuất người dùng',
    'Yêu cầu màu sắc giao diện phải khớp với brand guideline',
    'Yêu cầu hỗ trợ 100,000 concurrent users với latency < 100ms',
    'Yêu cầu export dữ liệu sang định dạng Excel và PDF'
  ],
  ARRAY['Yêu cầu hỗ trợ 100,000 concurrent users với latency < 100ms']::varchar[],
  'Performance NFR ở scale này buộc phải chọn microservices, caching, CDN, horizontal scaling — ảnh hưởng toàn bộ kiến trúc.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_028', 'mcq', 'software-requirements', 'software-requirements',
  'Sequence Diagram UML dùng để mô tả điều gì?',
  ARRAY[
    'Cấu trúc tĩnh của database và quan hệ giữa các bảng',
    'Chuỗi tương tác theo thời gian giữa các object để hoàn thành một use case',
    'Sơ đồ tổ chức nhân sự và phân quyền trong dự án',
    'Trạng thái của một object thay đổi theo các sự kiện'
  ],
  ARRAY['Chuỗi tương tác theo thời gian giữa các object để hoàn thành một use case']::varchar[],
  'Sequence Diagram là dynamic diagram: trục dọc là thời gian, trục ngang là các object/component tham gia.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_029', 'mcq', 'software-requirements', 'software-requirements',
  'Phương pháp FURPS+ phân loại NFR theo tiêu chí nào?',
  ARRAY[
    'Feature, User, Role, Permission, Security',
    'Functionality, Usability, Reliability, Performance, Supportability',
    'Frontend, UI/UX, REST, Privacy, Scalability',
    'Framework, Upgrade, Runtime, Protocol, Storage'
  ],
  ARRAY['Functionality, Usability, Reliability, Performance, Supportability']::varchar[],
  'FURPS+ do Hewlett-Packard đề xuất là framework phân loại NFR phổ biến. "+" thêm Design, Implementation, Interface constraints.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_030', 'mcq', 'software-requirements', 'software-requirements',
  'Quan hệ nào dưới đây thể hiện Aggregation (không phải Composition)?',
  ARRAY[
    'House có Rooms — xóa House thì Room biến mất',
    'Order có OrderLines — xóa Order thì OrderLine cũng biến mất',
    'Library có Books — xóa Library nhưng Book vẫn tồn tại độc lập',
    'Human có Heart — xóa Human thì Heart không thể tồn tại'
  ],
  ARRAY['Library có Books — xóa Library nhưng Book vẫn tồn tại độc lập']::varchar[],
  'Aggregation (weak ownership): Book có thể tồn tại ngoài Library. Composition (strong ownership): Room không thể tồn tại nếu không có House.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),

-- ===================== BÀI 4: Kiến trúc Monolith vs Microservices =====================
(
  'cs_se_q_031', 'mcq', 'architecture-design', 'architecture-design',
  'Nhược điểm lớn nhất của Monolithic Architecture khi scale là gì?',
  ARRAY[
    'Monolith không thể viết unit test vì code bị coupling',
    'Phải scale toàn bộ ứng dụng dù chỉ một module bị quá tải',
    'Monolith bắt buộc dùng ngôn ngữ lập trình cũ như COBOL',
    'Monolith không thể kết nối với database quan hệ'
  ],
  ARRAY['Phải scale toàn bộ ứng dụng dù chỉ một module bị quá tải']::varchar[],
  'Nếu Payment module bị spike traffic, Monolith phải scale cả app (User, Order, Catalog...). Microservices chỉ scale Payment service.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_032', 'mcq', 'architecture-design', 'architecture-design',
  'Trong MVC, nhiệm vụ của Controller là gì?',
  ARRAY[
    'Lưu trữ và xử lý dữ liệu business, kết nối database trực tiếp',
    'Render HTML template và quản lý CSS styling cho giao diện',
    'Nhận request từ user, gọi Model xử lý, rồi chọn View phù hợp để trả về',
    'Quản lý authentication và session của người dùng đã đăng nhập'
  ],
  ARRAY['Nhận request từ user, gọi Model xử lý, rồi chọn View phù hợp để trả về']::varchar[],
  'Controller là điều phối viên: nhận HTTP request → gọi business logic (Model) → chọn View render response.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_033', 'mcq', 'architecture-design', 'architecture-design',
  'API Gateway trong Microservices thực hiện những chức năng gì?',
  ARRAY[
    'Chỉ routing request đến đúng service — không làm thêm gì khác',
    'Lưu trữ dữ liệu thay thế database khi service bị down',
    'Auth, rate limiting, request routing, response aggregation — entry point duy nhất cho clients',
    'Compile và deploy code cho các microservices tự động'
  ],
  ARRAY['Auth, rate limiting, request routing, response aggregation — entry point duy nhất cho clients']::varchar[],
  'API Gateway như "front door": một endpoint public, xử lý cross-cutting concerns, fan-out request đến nhiều service nếu cần.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_034', 'mcq', 'architecture-design', 'architecture-design',
  'Phát biểu nào đúng về Microservices so với Monolith?',
  ARRAY[
    'Microservices luôn tốt hơn Monolith — đó là lý do mọi startup nên bắt đầu bằng Microservices',
    'Microservices deploy độc lập và scale riêng từng service, nhưng phức tạp hơn về distributed systems',
    'Microservices không thể dùng nhiều ngôn ngữ lập trình khác nhau trong cùng hệ thống',
    'Monolith không thể đạt được hiệu suất cao vì code quá lớn và chậm'
  ],
  ARRAY['Microservices deploy độc lập và scale riêng từng service, nhưng phức tạp hơn về distributed systems']::varchar[],
  'Microservices là tradeoff: gain flexibility/scalability, nhưng pay distributed complexity. Không có silver bullet.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_035', 'mcq', 'architecture-design', 'architecture-design',
  'Khi nào nên chọn Monolith thay vì Microservices?',
  ARRAY[
    'Khi hệ thống cần xử lý hàng triệu request mỗi giây',
    'Khi team lớn hơn 100 người cần làm việc độc lập trên nhiều domain',
    'Khi bắt đầu MVP hoặc team nhỏ chưa đủ DevOps để vận hành distributed system',
    'Khi yêu cầu uptime SLA 99.999% và không chịu được downtime'
  ],
  ARRAY['Khi bắt đầu MVP hoặc team nhỏ chưa đủ DevOps để vận hành distributed system']::varchar[],
  'Amazon, Netflix bắt đầu bằng Monolith. "Start simple, scale when needed" là wisdom của Martin Fowler.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),

-- ===================== BÀI 5: Design Patterns =====================
(
  'cs_se_q_036', 'mcq', 'architecture-design', 'architecture-design',
  'Singleton Pattern đảm bảo điều gì?',
  ARRAY[
    'Một class có thể tạo tối đa 10 instance trong toàn bộ application',
    'Chỉ duy nhất một instance của class tồn tại trong toàn bộ application',
    'Class có thể clone object mà không gọi constructor',
    'Mọi object của class đều có dữ liệu được chia sẻ qua database'
  ],
  ARRAY['Chỉ duy nhất một instance của class tồn tại trong toàn bộ application']::varchar[],
  'Singleton = private constructor + static instance + getInstance(). Dùng cho Logger, Config, ConnectionPool.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_037', 'mcq', 'architecture-design', 'architecture-design',
  'Factory Pattern giải quyết vấn đề nào trong thiết kế OOP?',
  ARRAY[
    'Giảm số lượng instance của một class',
    'Tạo object mà client code không cần biết class cụ thể nào được khởi tạo',
    'Thêm tính năng vào object mà không thay đổi class gốc',
    'Đảm bảo chỉ một thread được truy cập object tại một thời điểm'
  ],
  ARRAY['Tạo object mà client code không cần biết class cụ thể nào được khởi tạo']::varchar[],
  'Factory = creational pattern: NotificationFactory.create("email") trả về EmailSender. Client chỉ biết interface, không biết implementation.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_038', 'mcq', 'architecture-design', 'architecture-design',
  'Strategy Pattern cho phép làm gì mà inheritance thông thường khó làm?',
  ARRAY[
    'Đảm bảo class con override tất cả method của class cha',
    'Hoán đổi thuật toán lúc runtime mà không thay đổi class sử dụng nó',
    'Chia sẻ state giữa các instance của cùng một class',
    'Tự động log tất cả method call của một class'
  ],
  ARRAY['Hoán đổi thuật toán lúc runtime mà không thay đổi class sử dụng nó']::varchar[],
  'Strategy inject algorithm từ ngoài. sorter.setStrategy(new MergeSort()) thay thuật toán không cần subclass mới.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_039', 'mcq', 'architecture-design', 'architecture-design',
  'Observer Pattern được ứng dụng thế nào trong React?',
  ARRAY[
    'React dùng Observer để kết nối component với cơ sở dữ liệu PostgreSQL',
    'useState và useEffect hoạt động như Subject-Observer: state thay đổi tự động re-render component',
    'Observer trong React dùng để scale ứng dụng lên nhiều server khác nhau',
    'React Context API thay thế hoàn toàn Observer vì hiệu quả hơn'
  ],
  ARRAY['useState và useEffect hoạt động như Subject-Observer: state thay đổi tự động re-render component']::varchar[],
  'useState = Subject. Components dùng state = Observers. State change → notify → re-render. Đây là Observer pattern ở UI layer.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_040', 'mcq', 'architecture-design', 'architecture-design',
  'Nhóm nào của GoF Pattern gồm Singleton, Factory Method, Builder?',
  ARRAY[
    'Behavioral Patterns — điều phối hành vi giữa các objects',
    'Structural Patterns — tổ chức cấu trúc class và object',
    'Creational Patterns — tạo object linh hoạt và có kiểm soát',
    'Concurrency Patterns — xử lý đa luồng và race condition'
  ],
  ARRAY['Creational Patterns — tạo object linh hoạt và có kiểm soát']::varchar[],
  'Creational Patterns tập trung vào cách tạo objects: Singleton, Factory Method, Abstract Factory, Builder, Prototype.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),

-- ===================== BÀI 6: SOLID =====================
(
  'cs_se_q_041', 'mcq', 'quality-testing', 'quality-testing',
  'Nguyên lý S trong SOLID là gì?',
  ARRAY[
    'Security: mọi class phải có cơ chế bảo mật tích hợp sẵn',
    'Single Responsibility: một class chỉ có một lý do để thay đổi',
    'Scalability: class phải có khả năng xử lý dữ liệu lớn',
    'Synchronization: class phải thread-safe trong môi trường đa luồng'
  ],
  ARRAY['Single Responsibility: một class chỉ có một lý do để thay đổi']::varchar[],
  'SRP = "một lý do thay đổi" = một responsibility. UserService không nên vừa xử lý user vừa gửi email vừa kết nối DB.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_06'
),
(
  'cs_se_q_042', 'mcq', 'quality-testing', 'quality-testing',
  'Open/Closed Principle phát biểu rằng class nên như thế nào?',
  ARRAY[
    'Mở code để bất kỳ ai cũng có thể chỉnh sửa trực tiếp',
    'Đóng hoàn toàn, không cho phép kế thừa hay thay đổi',
    'Mở để mở rộng (thêm tính năng mới), đóng để sửa đổi code cũ',
    'Mở source code trên GitHub để cộng đồng đóng góp'
  ],
  ARRAY['Mở để mở rộng (thêm tính năng mới), đóng để sửa đổi code cũ']::varchar[],
  'OCP: thêm loại payment mới → thêm class mới implement PaymentStrategy, không sửa class PaymentProcessor cũ.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_06'
),
(
  'cs_se_q_043', 'mcq', 'quality-testing', 'quality-testing',
  'Ví dụ nào sau đây vi phạm Liskov Substitution Principle?',
  ARRAY[
    'Circle extends Shape và override getArea() đúng với công thức π×r²',
    'Square extends Rectangle nhưng setWidth() cũng thay đổi height — phá vỡ hành vi mong đợi',
    'Dog extends Animal và override sound() trả về "Woof" thay vì "Animal sound"',
    'AdminUser extends User và thêm method deleteAnyPost() không có trong User'
  ],
  ARRAY['Square extends Rectangle nhưng setWidth() cũng thay đổi height — phá vỡ hành vi mong đợi']::varchar[],
  'LSP test: nếu thay Rectangle bằng Square, code xử lý Rectangle vẫn phải đúng. Nhưng setWidth(5) + setHeight(3) → area = 9, không phải 15.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_06'
),
(
  'cs_se_q_044', 'mcq', 'quality-testing', 'quality-testing',
  'Interface Segregation Principle giải quyết vấn đề gì?',
  ARRAY[
    'Chia interface thành nhiều phiên bản để hỗ trợ nhiều phiên ngôn ngữ',
    'Class không bị buộc phải implement method của interface mà nó không cần dùng',
    'Gộp tất cả interface thành một để giảm số file trong project',
    'Interface chỉ nên dùng cho testing, không dùng trong production code'
  ],
  ARRAY['Class không bị buộc phải implement method của interface mà nó không cần dùng']::varchar[],
  'ISP: tách interface lớn thành interface nhỏ. Robot không cần implement eat() và sleep() — tách ra Workable, Eatable, Sleepable.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_06'
),
(
  'cs_se_q_045', 'mcq', 'quality-testing', 'quality-testing',
  'Dependency Inversion Principle (DIP) khác Dependency Injection (DI) thế nào?',
  ARRAY[
    'DIP và DI là hai tên gọi khác nhau của cùng một khái niệm',
    'DIP là nguyên lý thiết kế (phụ thuộc vào abstraction), DI là kỹ thuật để áp dụng DIP',
    'DI là nguyên lý thiết kế, còn DIP là framework như Spring',
    'DIP chỉ áp dụng cho Java, DI là khái niệm ngôn ngữ-agnostic'
  ],
  ARRAY['DIP là nguyên lý thiết kế (phụ thuộc vào abstraction), DI là kỹ thuật để áp dụng DIP']::varchar[],
  'DIP: "module cấp cao không phụ thuộc module cấp thấp, cả hai phụ thuộc abstraction." DI (constructor injection, Spring @Autowired) là cách implement DIP.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_06'
),

-- ===================== BÀI 7: Kiểm thử =====================
(
  'cs_se_q_046', 'mcq', 'quality-testing', 'quality-testing',
  'Unit Testing kiểm tra điều gì và isolate component như thế nào?',
  ARRAY[
    'Test toàn bộ hệ thống bao gồm database và external API thật',
    'Test UI từ góc độ người dùng cuối, click và nhập liệu thật',
    'Test một function/class độc lập, dùng mock/stub thay thế dependencies',
    'Test tích hợp giữa frontend và backend qua HTTP request thật'
  ],
  ARRAY['Test một function/class độc lập, dùng mock/stub thay thế dependencies']::varchar[],
  'Unit test = tốc độ nhanh (milliseconds), không cần DB/network. Mock database để tập trung test logic business.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_047', 'mcq', 'quality-testing', 'quality-testing',
  'Trong Test Pyramid, tỷ lệ Unit : Integration : E2E test lý tưởng là?',
  ARRAY[
    '33% : 33% : 33% — phân bổ đều để đảm bảo coverage toàn diện',
    '10% : 20% : 70% — tập trung vào E2E vì gần thực tế nhất',
    '70% : 20% : 10% — nhiều unit test nhất vì nhanh, rẻ và dễ maintain',
    '50% : 50% : 0% — không cần E2E test nếu có đủ integration test'
  ],
  ARRAY['70% : 20% : 10% — nhiều unit test nhất vì nhanh, rẻ và dễ maintain']::varchar[],
  'Test Pyramid (Mike Cohn): base rộng = unit tests (nhanh, rẻ). Lên đến đỉnh = E2E (chậm, đắt, brittle).',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_048', 'mcq', 'quality-testing', 'quality-testing',
  'Chu trình TDD (Test-Driven Development) diễn ra theo thứ tự nào?',
  ARRAY[
    'Write Code → Write Test → Refactor → Repeat',
    'Write Test (Red) → Write Code (Green) → Refactor → Repeat',
    'Design Architecture → Write Test → Deploy → Monitor',
    'Write Test → Deploy → Monitor → Fix Bugs'
  ],
  ARRAY['Write Test (Red) → Write Code (Green) → Refactor → Repeat']::varchar[],
  'Red-Green-Refactor: viết test fail trước (Red), viết code tối thiểu để pass (Green), cải thiện code (Refactor), lặp lại.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_049', 'mcq', 'quality-testing', 'quality-testing',
  'UAT (User Acceptance Testing) khác QA Testing ở điểm gì?',
  ARRAY[
    'UAT dùng automated test, QA Testing dùng manual test hoàn toàn',
    'UAT do business user thực hiện để xác nhận yêu cầu business, QA Testing tìm bug kỹ thuật',
    'UAT chỉ test performance và load, QA Testing test chức năng',
    'UAT là tên khác của Alpha Testing, QA Testing là Beta Testing'
  ],
  ARRAY['UAT do business user thực hiện để xác nhận yêu cầu business, QA Testing tìm bug kỹ thuật']::varchar[],
  'UAT = "Does this system do what the business needs?" QA = "Does this system work correctly?" — hai góc nhìn khác nhau.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_050', 'mcq', 'quality-testing', 'quality-testing',
  'Code coverage 100% có đảm bảo không có bug không?',
  ARRAY[
    'Có, 100% coverage nghĩa là mọi dòng code đã được kiểm thử kỹ lưỡng',
    'Không — coverage đo số dòng được chạy qua, không đảm bảo test case kiểm tra đúng logic',
    'Có, nhưng chỉ khi dùng mutation testing thay vì code coverage thông thường',
    'Không, vì 100% coverage chỉ đạt được trong môi trường staging, không phải production'
  ],
  ARRAY['Không — coverage đo số dòng được chạy qua, không đảm bảo test case kiểm tra đúng logic']::varchar[],
  'Test có thể execute 100% code nhưng assert sai → bug vẫn tồn tại. Mutation testing kiểm tra chất lượng của test case.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),

-- ===================== BÀI 8: CI/CD =====================
(
  'cs_se_q_051', 'mcq', 'quality-testing', 'quality-testing',
  'Continuous Integration (CI) mang lại lợi ích gì cho team?',
  ARRAY[
    'Deploy tự động lên production mà không cần bất kỳ sự can thiệp nào của con người',
    'Phát hiện lỗi tích hợp sớm khi mỗi commit được tự động build và test ngay',
    'Loại bỏ hoàn toàn nhu cầu code review giữa các developer',
    'Tự động viết unit test cho code mới bằng AI'
  ],
  ARRAY['Phát hiện lỗi tích hợp sớm khi mỗi commit được tự động build và test ngay']::varchar[],
  'CI: mỗi push → trigger build + test ngay. "Fail fast" — biết ngay có conflict hoặc regression, không đợi đến cuối sprint.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_052', 'mcq', 'quality-testing', 'quality-testing',
  'Continuous Delivery khác Continuous Deployment ở điểm nào?',
  ARRAY[
    'Continuous Delivery chạy test tự động, Continuous Deployment không cần test',
    'Continuous Delivery cần người bấm nút deploy production, Continuous Deployment tự deploy nếu test pass',
    'Continuous Delivery chỉ áp dụng cho backend, Continuous Deployment cho frontend',
    'Continuous Delivery dùng Docker, Continuous Deployment dùng Kubernetes'
  ],
  ARRAY['Continuous Delivery cần người bấm nút deploy production, Continuous Deployment tự deploy nếu test pass']::varchar[],
  'CD Delivery: auto chuẩn bị release, người approve deploy cuối. CD Deployment: hoàn toàn tự động từ commit đến production.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_053', 'mcq', 'quality-testing', 'quality-testing',
  'DORA Metrics đo lường hiệu quả CI/CD bằng 4 chỉ số, trong đó MTTR là?',
  ARRAY[
    'Mean Time to Release — thời gian trung bình để release một feature',
    'Mean Time to Restore — thời gian trung bình khôi phục hệ thống sau sự cố',
    'Maximum Throughput Rate — số request tối đa hệ thống xử lý per second',
    'Multi-Team Release Rate — số team có thể deploy đồng thời'
  ],
  ARRAY['Mean Time to Restore — thời gian trung bình khôi phục hệ thống sau sự cố']::varchar[],
  'DORA: Deployment Frequency, Lead Time, Change Failure Rate, MTTR. Elite team có MTTR < 1 giờ.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_054', 'mcq', 'quality-testing', 'quality-testing',
  'Docker Multi-stage Build giải quyết vấn đề gì trong CI/CD?',
  ARRAY[
    'Cho phép chạy nhiều container cùng lúc trong một Docker daemon',
    'Tách biệt build environment (có dev tools) và runtime environment, tạo image nhỏ và an toàn hơn',
    'Đồng bộ code giữa nhiều developer làm việc trên cùng một branch',
    'Tự động test và fix lỗi code trước khi build Docker image'
  ],
  ARRAY['Tách biệt build environment (có dev tools) và runtime environment, tạo image nhỏ và an toàn hơn']::varchar[],
  'Stage 1 (builder): cài compiler, build tools → build artifact. Stage 2 (runner): chỉ copy artifact, không có dev tools → image nhỏ và ít attack surface.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_055', 'mcq', 'quality-testing', 'quality-testing',
  'Feature Flag (Feature Toggle) giúp gì trong quy trình CI/CD?',
  ARRAY[
    'Tự động chuyển đổi giữa các version API cũ và mới trong production',
    'Tách biệt deployment (deploy code) và release (bật tính năng) — deploy an toàn, bật dần dần',
    'Đánh dấu feature nào đang được test để QA không test nhầm',
    'Quản lý phiên bản Git branch cho nhiều tính năng song song'
  ],
  ARRAY['Tách biệt deployment (deploy code) và release (bật tính năng) — deploy an toàn, bật dần dần']::varchar[],
  'Feature flag: deploy code vào production nhưng tắt feature. Bật cho 1% user → monitor → bật dần. Rollback instant = tắt flag.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),

-- ===================== BÀI 9: Sequence Diagram & REST API =====================
(
  'cs_se_q_056', 'mcq', 'software-requirements', 'software-requirements',
  'HTTP method nào là idempotent và tại sao điều đó quan trọng?',
  ARRAY[
    'POST — vì tạo resource mới mỗi lần gọi đảm bảo tính nhất quán',
    'GET, PUT, DELETE — gọi nhiều lần cho cùng kết quả, an toàn khi client retry',
    'GET và POST — vì đây là 2 method phổ biến nhất trong REST API',
    'Tất cả HTTP methods đều idempotent nếu server implement đúng'
  ],
  ARRAY['GET, PUT, DELETE — gọi nhiều lần cho cùng kết quả, an toàn khi client retry']::varchar[],
  'Idempotent quan trọng với retry logic: mạng chập → client retry PUT/DELETE không tạo duplicate. POST không idempotent → retry tạo nhiều records.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_057', 'mcq', 'software-requirements', 'software-requirements',
  'Sự khác biệt giữa HTTP 401 và 403 là gì?',
  ARRAY[
    '401 là lỗi server, 403 là lỗi client do request format sai',
    '401: chưa xác thực (unauthenticated), 403: đã xác thực nhưng không có quyền (unauthorized)',
    '401: resource không tìm thấy, 403: server từ chối xử lý request',
    '401: rate limit vượt ngưỡng, 403: IP bị blacklist vĩnh viễn'
  ],
  ARRAY['401: chưa xác thực (unauthenticated), 403: đã xác thực nhưng không có quyền (unauthorized)']::varchar[],
  'Hay bị nhầm: 401 Unauthorized thực ra nghĩa là "bạn chưa đăng nhập". 403 Forbidden = đăng nhập rồi nhưng không có permission.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_058', 'mcq', 'software-requirements', 'software-requirements',
  'Convention đặt tên REST API endpoint nào sau đây là ĐÚNG?',
  ARRAY[
    'GET /api/getUser/123 và POST /api/createOrder',
    'GET /api/user/123 và POST /api/order',
    'GET /api/users/123 và POST /api/orders',
    'GET /api/UserById?id=123 và POST /api/OrderCreate'
  ],
  ARRAY['GET /api/users/123 và POST /api/orders']::varchar[],
  'REST convention: danh từ số nhiều (/users, /orders), không dùng động từ trong URL (getUser, createOrder). Resource ID trong path.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_059', 'mcq', 'software-requirements', 'software-requirements',
  'Sự khác biệt giữa PUT và PATCH trong REST API là gì?',
  ARRAY[
    'PUT dùng cho create, PATCH dùng cho update',
    'PUT thay thế toàn bộ resource, PATCH chỉ cập nhật các field được gửi lên',
    'PUT là idempotent, PATCH không idempotent và nguy hiểm hơn',
    'PUT gửi data dạng JSON, PATCH gửi data dạng form-urlencoded'
  ],
  ARRAY['PUT thay thế toàn bộ resource, PATCH chỉ cập nhật các field được gửi lên']::varchar[],
  'PUT: gửi toàn bộ object, field không gửi → reset về null. PATCH: chỉ gửi field cần thay đổi, field khác giữ nguyên.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_060', 'mcq', 'software-requirements', 'software-requirements',
  'HTTP status code nào phù hợp khi tạo một resource mới thành công (POST)?',
  ARRAY[
    '200 OK',
    '201 Created',
    '204 No Content',
    '202 Accepted'
  ],
  ARRAY['201 Created']::varchar[],
  '201 Created = POST thành công và resource đã được tạo. Response body thường chứa resource vừa tạo với ID mới.',
  4, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),

-- ===================== BÀI 10: Code Review, Refactoring, Technical Debt =====================
(
  'cs_se_q_061', 'mcq', 'quality-testing', 'quality-testing',
  'Code Smell là gì?',
  ARRAY[
    'Lỗi syntax làm chương trình không compile được',
    'Runtime error làm hệ thống crash trong production',
    'Dấu hiệu trong code cho thấy có vấn đề tiềm ẩn về thiết kế, dù code vẫn chạy được',
    'Security vulnerability bị scanner bảo mật phát hiện tự động'
  ],
  ARRAY['Dấu hiệu trong code cho thấy có vấn đề tiềm ẩn về thiết kế, dù code vẫn chạy được']::varchar[],
  'Code smell ≠ bug. Long Method, God Class, Duplicate Code là smell. Code vẫn chạy nhưng khó bảo trì, dễ sinh bug sau này.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_062', 'mcq', 'quality-testing', 'quality-testing',
  'Kỹ thuật Refactoring "Extract Method" làm gì?',
  ARRAY[
    'Xóa method không được gọi để giảm kích thước code base',
    'Gộp nhiều method nhỏ thành một method lớn để dễ đọc hơn',
    'Tách một đoạn code trong method dài thành một hàm nhỏ có tên rõ ràng',
    'Copy method từ class này sang class khác khi có logic tương tự'
  ],
  ARRAY['Tách một đoạn code trong method dài thành một hàm nhỏ có tên rõ ràng']::varchar[],
  'Extract Method giải quyết Long Method smell. Tên hàm nhỏ = tài liệu. calculateTax() rõ ràng hơn 20 dòng code if/else inline.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_063', 'mcq', 'quality-testing', 'quality-testing',
  '"Technical Debt" được Ward Cunningham mô tả bằng ẩn dụ nào?',
  ARRAY[
    'Code xấu như rác trong cơ sở dữ liệu cần được dọn dẹp',
    'Viết code bẩn để kịp deadline giống như vay nợ tài chính — phải trả sau bằng effort refactoring',
    'Tài liệu kỹ thuật bị thiếu như khoản nợ với team sau này',
    'Bug tồn tại trong production là khoản nợ với khách hàng'
  ],
  ARRAY['Viết code bẩn để kịp deadline giống như vay nợ tài chính — phải trả sau bằng effort refactoring']::varchar[],
  'Technical Debt: vay (code bẩn nhanh) để kịp deadline, nhưng phải trả lãi (làm chậm dần vì code ngày càng khó hiểu).',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_064', 'mcq', 'quality-testing', 'quality-testing',
  'Quy tắc "Boy Scout" trong software development có nghĩa là gì?',
  ARRAY[
    'Mỗi developer phải review code của ít nhất 2 người khác trong team',
    'Code phải được tổ chức theo thứ tự bảng chữ cái để dễ tìm kiếm',
    'Luôn để code sạch hơn so với khi bạn tìm thấy — cải thiện nhỏ mỗi lần chỉnh sửa',
    'Chỉ commit code sau khi đã test thủ công ít nhất 3 lần'
  ],
  ARRAY['Luôn để code sạch hơn so với khi bạn tìm thấy — cải thiện nhỏ mỗi lần chỉnh sửa']::varchar[],
  '"Leave the campground cleaner than you found it." Robert C. Martin áp dụng vào code: đặt tên tốt hơn, xóa comment thừa, extract method nhỏ — mỗi lần chỉnh sửa.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_065', 'mcq', 'quality-testing', 'quality-testing',
  'Điều kiện tiên quyết trước khi Refactoring là gì?',
  ARRAY[
    'Phải được sự đồng ý của Product Owner và ghi vào Sprint Backlog',
    'Phải có test coverage đầy đủ để đảm bảo refactoring không thay đổi behavior',
    'Phải dùng IDE có tích hợp AI như GitHub Copilot để hỗ trợ',
    'Phải tạo branch mới và không được merge vào main ít nhất 2 tuần'
  ],
  ARRAY['Phải có test coverage đầy đủ để đảm bảo refactoring không thay đổi behavior']::varchar[],
  'Không có test = không biết refactoring có phá vỡ behavior hay không. Test là safety net của refactoring.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),

-- ===== THÊM 35 CÂU HỖN HỢP ĐỂ ĐẠT 100 CÂU =====
(
  'cs_se_q_066', 'mcq', 'software-processes', 'software-processes',
  'Kanban khác Scrum ở điểm cơ bản nào?',
  ARRAY[
    'Kanban dùng Sprint 4 tuần, Scrum dùng Sprint 1 tuần',
    'Kanban không có timebox, work item flow liên tục — giới hạn WIP thay vì Sprint',
    'Kanban bắt buộc có Daily Standup, Scrum thì không',
    'Kanban chỉ áp dụng cho dự án phần cứng, Scrum cho phần mềm'
  ],
  ARRAY['Kanban không có timebox, work item flow liên tục — giới hạn WIP thay vì Sprint']::varchar[],
  'Kanban: Pull system, limit WIP (Work In Progress), continuous flow. Không có Sprint, không có fixed team, không có Retro bắt buộc.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_067', 'mcq', 'architecture-design', 'architecture-design',
  'Decorator Pattern (GoF Structural) làm gì?',
  ARRAY[
    'Đảm bảo class chỉ có một instance tồn tại trong application',
    'Thêm tính năng mới vào object lúc runtime mà không thay đổi class gốc',
    'Tạo đại diện (proxy) để kiểm soát truy cập vào object thật',
    'Chuyển đổi interface của một class sang interface khác mà client mong đợi'
  ],
  ARRAY['Thêm tính năng mới vào object lúc runtime mà không thay đổi class gốc']::varchar[],
  'Decorator = wrap object: Coffee + MilkDecorator + SugarDecorator. Mỗi decorator thêm behavior, không sửa class Coffee.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_068', 'mcq', 'software-requirements', 'software-requirements',
  'GraphQL khác REST ở điểm gì?',
  ARRAY[
    'GraphQL chỉ dùng HTTP GET, REST dùng tất cả HTTP methods',
    'GraphQL cho phép client chỉ định chính xác data cần lấy, tránh over-fetching và under-fetching',
    'GraphQL nhanh hơn REST 10x vì dùng binary protocol thay vì JSON',
    'GraphQL không hỗ trợ mutation (chỉ đọc dữ liệu), REST hỗ trợ đầy đủ'
  ],
  ARRAY['GraphQL cho phép client chỉ định chính xác data cần lấy, tránh over-fetching và under-fetching']::varchar[],
  'REST: /api/users/123 trả về toàn bộ user object dù client chỉ cần name. GraphQL query chính xác { user(id:123) { name } }.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_069', 'mcq', 'quality-testing', 'quality-testing',
  'Cyclomatic Complexity đo lường điều gì?',
  ARRAY[
    'Số dòng code trong một file — càng ít càng tốt',
    'Số lượng dependency của một module',
    'Số lượng independent path (nhánh logic) trong một function — độ phức tạp code',
    'Thời gian build của toàn bộ project'
  ],
  ARRAY['Số lượng independent path (nhánh logic) trong một function — độ phức tạp code']::varchar[],
  'Cyclomatic Complexity > 10 → function quá phức tạp, cần refactor. Công thức: CC = E - N + 2P (E=edges, N=nodes, P=connected components).',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_070', 'mcq', 'software-processes', 'software-processes',
  'Product Backlog Refinement trong Scrum được thực hiện khi nào?',
  ARRAY[
    'Chỉ trong buổi Sprint Planning đầu Sprint',
    'Liên tục trong suốt Sprint — PO và team làm rõ, ước tính và ưu tiên backlog items',
    'Chỉ sau khi Sprint kết thúc trong buổi Retrospective',
    'Mỗi quý một lần bởi PO và stakeholders'
  ],
  ARRAY['Liên tục trong suốt Sprint — PO và team làm rõ, ước tính và ưu tiên backlog items']::varchar[],
  'Refinement (grooming) là ongoing activity, không phải formal ceremony. Scrum Guide khuyến khích team dành không quá 10% Sprint capacity cho refinement.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_071', 'mcq', 'architecture-design', 'architecture-design',
  'Facade Pattern (GoF) giải quyết vấn đề gì?',
  ARRAY[
    'Cung cấp một giao diện đơn giản cho một subsystem phức tạp',
    'Đảm bảo chỉ một instance của subsystem tồn tại',
    'Cho phép nhiều object chia sẻ cùng một interface',
    'Tự động tạo object mà không cần biết class cụ thể'
  ],
  ARRAY['Cung cấp một giao diện đơn giản cho một subsystem phức tạp']::varchar[],
  'Facade = simplification layer. Thay vì gọi 5 class trong audio subsystem, dùng AudioFacade.play() — đơn giản hóa client code.',
  5, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_072', 'mcq', 'quality-testing', 'quality-testing',
  'Static Analysis (SonarQube, ESLint) trong CI pipeline giúp gì?',
  ARRAY[
    'Tự động viết code để fix bug được phát hiện',
    'Phát hiện code smell, potential bug, security vulnerability mà không cần chạy code',
    'Đo performance của ứng dụng dưới điều kiện load thật',
    'Kiểm tra UX của giao diện bằng AI'
  ],
  ARRAY['Phát hiện code smell, potential bug, security vulnerability mà không cần chạy code']::varchar[],
  'Static analysis = analyze source code without executing. Fast feedback: SonarQube báo SQL injection risk, unused variable, code duplication ngay khi push.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_073', 'mcq', 'software-processes', 'software-processes',
  'Scrum at Scale (SAFe, LeSS) giải quyết vấn đề gì?',
  ARRAY[
    'Giúp một developer làm việc hiệu quả hơn không cần team',
    'Mở rộng Scrum cho nhiều team cùng làm trên cùng một sản phẩm lớn',
    'Thay thế hoàn toàn Scrum bằng một framework tốt hơn',
    'Áp dụng Scrum cho dự án phần cứng và embedded systems'
  ],
  ARRAY['Mở rộng Scrum cho nhiều team cùng làm trên cùng một sản phẩm lớn']::varchar[],
  'SAFe (Scaled Agile Framework), LeSS (Large-Scale Scrum): coordinate nhiều Scrum teams có shared backlog, sync ceremonies ở level program.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_074', 'mcq', 'architecture-design', 'architecture-design',
  'Event-Driven Architecture và Observer Pattern liên quan thế nào?',
  ARRAY[
    'Không liên quan — EDA dùng cho hardware, Observer cho software',
    'Event-Driven Architecture là Observer Pattern được scale lên hệ thống phân tán với Message Queue',
    'Observer Pattern là bản cải tiến của EDA, hiện đại hơn',
    'EDA thay thế Observer Pattern trong Microservices — không thể dùng cùng nhau'
  ],
  ARRAY['Event-Driven Architecture là Observer Pattern được scale lên hệ thống phân tán với Message Queue']::varchar[],
  'Observer trong process = direct method call. EDA giữa services = Kafka/RabbitMQ message. Cùng ý tưởng publish-subscribe, khác scale.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_05'
),
(
  'cs_se_q_075', 'mcq', 'quality-testing', 'quality-testing',
  'Mutation Testing kiểm tra điều gì mà Code Coverage không làm được?',
  ARRAY[
    'Tìm memory leak và performance bottleneck trong code',
    'Đánh giá chất lượng của test case bằng cách inject bug nhỏ và xem test có detect không',
    'Tự động tạo test case từ source code sử dụng AI',
    'Kiểm tra compatibility của code trên các OS và trình duyệt khác nhau'
  ],
  ARRAY['Đánh giá chất lượng của test case bằng cách inject bug nhỏ và xem test có detect không']::varchar[],
  'Mutation testing (PIT): thay đổi code nhỏ (> thành >=, + thành -) → chạy test. Nếu test không fail → test yếu (mutation survived).',
  7, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_076', 'mcq', 'software-requirements', 'software-requirements',
  'Trong Sequence Diagram, ký hiệu "alt" dùng để biểu diễn gì?',
  ARRAY[
    'Alternative execution flows — nhánh điều kiện if/else trong luồng xử lý',
    'Asynchronous message — gửi message không cần chờ response',
    'Actor liên kết với nhiều use case khác nhau',
    'Vòng lặp loop được thực thi số lần cố định'
  ],
  ARRAY['Alternative execution flows — nhánh điều kiện if/else trong luồng xử lý']::varchar[],
  '"alt [condition]" trong Sequence Diagram tương đương if/else. "opt [condition]" là tùy chọn (optional). "loop [n]" là vòng lặp.',
  6, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_077', 'mcq', 'quality-testing', 'quality-testing',
  'Canary Deployment trong CI/CD là chiến lược gì?',
  ARRAY[
    'Deploy toàn bộ users lên version mới cùng lúc vào giờ thấp điểm',
    'Deploy version mới cho một phần nhỏ users (1-5%) trước để monitor, rồi rollout dần',
    'Deploy version mới chỉ trong môi trường staging không bao giờ lên production',
    'Deploy 2 version song song và chọn ngẫu nhiên version nào phục vụ user'
  ],
  ARRAY['Deploy version mới cho một phần nhỏ users (1-5%) trước để monitor, rồi rollout dần']::varchar[],
  'Canary như con chim canary trong mỏ than: nếu 1% users gặp lỗi → rollback ngay trước khi ảnh hưởng tất cả. Netflix dùng chiến lược này.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_078', 'mcq', 'architecture-design', 'architecture-design',
  'Domain-Driven Design (DDD) và Microservices liên quan thế nào?',
  ARRAY[
    'DDD thay thế Microservices — hai cách tiếp cận không tương thích',
    'DDD chỉ áp dụng cho database design, không liên quan đến service decomposition',
    'Bounded Context trong DDD là nguyên tắc cơ bản để xác định ranh giới giữa các microservices',
    'DDD yêu cầu monolith architecture để giữ domain logic tập trung'
  ],
  ARRAY['Bounded Context trong DDD là nguyên tắc cơ bản để xác định ranh giới giữa các microservices']::varchar[],
  'DDD Bounded Context = mỗi domain có model riêng, ngôn ngữ riêng (Ubiquitous Language). Microservice nên = 1 Bounded Context.',
  7, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_079', 'mcq', 'software-processes', 'software-processes',
  'Story Points trong Scrum được ước tính bằng thang đo nào phổ biến nhất?',
  ARRAY[
    'Số giờ thực tế: 1h, 2h, 4h, 8h, 16h, 32h',
    'Dãy Fibonacci: 1, 2, 3, 5, 8, 13, 21 — thể hiện tính bất định tăng theo độ phức tạp',
    'T-shirt sizes: XS, S, M, L, XL, XXL',
    'Thang 1-10: tuyến tính và dễ tính average velocity'
  ],
  ARRAY['Dãy Fibonacci: 1, 2, 3, 5, 8, 13, 21 — thể hiện tính bất định tăng theo độ phức tạp']::varchar[],
  'Fibonacci: khoảng cách tăng dần thể hiện uncertainty. Story size 8 có uncertainty lớn hơn nhiều story size 1. Forcing số chính xác như 7 hay 9 là sai.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_080', 'mcq', 'quality-testing', 'quality-testing',
  'Load Testing khác Stress Testing ở điểm nào?',
  ARRAY[
    'Load Testing dùng real users, Stress Testing dùng simulated users',
    'Load Testing kiểm tra performance ở mức tải bình thường/peak, Stress Testing đẩy vượt ngưỡng để tìm điểm gãy',
    'Load Testing chỉ test API, Stress Testing test toàn bộ UI',
    'Load Testing là manual, Stress Testing phải automated'
  ],
  ARRAY['Load Testing kiểm tra performance ở mức tải bình thường/peak, Stress Testing đẩy vượt ngưỡng để tìm điểm gãy']::varchar[],
  'Load Test: "Hệ thống có đáp ứng được 10k users không?" Stress Test: "Hệ thống gãy ở 50k users hay 100k users? Gãy thế nào?"',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_081', 'mcq', 'software-processes', 'software-processes',
  'Definition of Done (DoD) trong Scrum là gì?',
  ARRAY[
    'Danh sách tính năng cần hoàn thành trong toàn bộ dự án',
    'Tiêu chí đồng thuận của team để một user story được coi là hoàn thành',
    'Document mô tả yêu cầu kỹ thuật của từng task trong Sprint',
    'Approval của Product Owner sau khi demo Sprint Review'
  ],
  ARRAY['Tiêu chí đồng thuận của team để một user story được coi là hoàn thành']::varchar[],
  'DoD là shared agreement: code review passed + unit test + integration test + deploy staging + PO accept. Không có DoD → "done" của mỗi người nghĩa khác nhau.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_082', 'mcq', 'architecture-design', 'architecture-design',
  'Conway''s Law liên quan đến kiến trúc phần mềm thế nào?',
  ARRAY[
    'Hiệu suất hệ thống tỷ lệ thuận với số lượng developer trong team',
    'Kiến trúc hệ thống phản ánh cấu trúc tổ chức team xây dựng nó',
    'Code chất lượng tỷ lệ nghịch với số lượng công cụ được dùng',
    'Chi phí bảo trì tăng theo hàm mũ theo thời gian nếu không refactor'
  ],
  ARRAY['Kiến trúc hệ thống phản ánh cấu trúc tổ chức team xây dựng nó']::varchar[],
  '"Organizations design systems which mirror their communication structures." — Melvin Conway. 3 team độc lập → 3 microservices tự nhiên.',
  6, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_083', 'mcq', 'quality-testing', 'quality-testing',
  'Empathetic Code Review có nghĩa là gì trong thực tế?',
  ARRAY[
    'Reviewer không được comment tiêu cực để tránh conflict trong team',
    'Reviewer nhận xét về code, không phán xét người viết — feedback constructive và cụ thể',
    'Chỉ senior developer được phép review code của junior',
    'Code review phải hoàn thành trong 30 phút để không làm chậm Sprint'
  ],
  ARRAY['Reviewer nhận xét về code, không phán xét người viết — feedback constructive và cụ thể']::varchar[],
  'Thay vì "Code này tệ" → "Tôi đề xuất extract method này để tăng readability. Nghĩ thế nào?" — giữ focus vào code, không phải cái tôi.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_084', 'mcq', 'software-requirements', 'software-requirements',
  'OpenAPI (Swagger) specification dùng để làm gì trong REST API?',
  ARRAY[
    'Chạy performance test tự động cho REST API endpoints',
    'Tạo tài liệu API tương tác và generate client SDK tự động từ YAML/JSON spec',
    'Kiểm tra security vulnerability trong API request/response',
    'Monitor API latency và error rate trong production'
  ],
  ARRAY['Tạo tài liệu API tương tác và generate client SDK tự động từ YAML/JSON spec']::varchar[],
  'OpenAPI spec → Swagger UI (interactive docs) → client code generation cho Python, Java, TypeScript. "API-first design" bắt đầu từ spec.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_09'
),
(
  'cs_se_q_085', 'mcq', 'quality-testing', 'quality-testing',
  'Deliberate Technical Debt khác Inadvertent Technical Debt thế nào?',
  ARRAY[
    'Deliberate là nợ do team thiếu kỹ năng, Inadvertent là nợ do cố tình',
    'Deliberate là cố tình để kịp deadline với nhận thức rõ ràng, Inadvertent là vô tình do thiếu kiến thức',
    'Deliberate là nợ ở database, Inadvertent là nợ ở frontend code',
    'Cả hai đều có tác hại như nhau và không có cách phân biệt'
  ],
  ARRAY['Deliberate là cố tình để kịp deadline với nhận thức rõ ràng, Inadvertent là vô tình do thiếu kiến thức']::varchar[],
  'Deliberate: "Cứ hardcode để kịp demo, sau refactor." Inadvertent: không biết có cách tốt hơn. Bit Rot: code tốt nhưng technology đã outdated.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),

-- ===== 15 CÂU CUỐI — CÁC CHỦ ĐỀ TỔNG HỢP =====
(
  'cs_se_q_086', 'mcq', 'software-processes', 'software-processes',
  'Extreme Programming (XP) thực hành nào là đặc trưng nhất?',
  ARRAY[
    'Sprint Planning kéo dài 2 tuần',
    'Pair Programming — 2 developer code cùng 1 máy để review liên tục',
    'Daily Standup bắt buộc mỗi ngày đúng giờ',
    'Product Backlog refinement liên tục trong Sprint'
  ],
  ARRAY['Pair Programming — 2 developer code cùng 1 máy để review liên tục']::varchar[],
  'XP (Kent Beck): Pair Programming, TDD, Continuous Integration, Simple Design, Collective Code Ownership — khác hoàn toàn với Scrum ceremonies.',
  6, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_087', 'mcq', 'architecture-design', 'architecture-design',
  'Circuit Breaker Pattern trong Microservices giải quyết vấn đề gì?',
  ARRAY[
    'Ngăn chặn request lặp đến service đang bị lỗi, tránh cascade failure',
    'Phân tải đều giữa các instance của cùng một service',
    'Mã hóa communication giữa các service để bảo mật',
    'Cache response của service để giảm latency'
  ],
  ARRAY['Ngăn chặn request lặp đến service đang bị lỗi, tránh cascade failure']::varchar[],
  'Circuit Breaker: sau N lần fail → "open circuit" → reject request ngay (không chờ timeout) → system ổn định. Netflix Hystrix implement pattern này.',
  7, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_088', 'mcq', 'quality-testing', 'quality-testing',
  'Smoke Testing và Regression Testing khác nhau thế nào?',
  ARRAY[
    'Smoke test kiểm tra feature mới, Regression test kiểm tra code style',
    'Smoke test nhanh để xác nhận build cơ bản hoạt động, Regression test đảm bảo feature cũ không bị phá vỡ',
    'Smoke test chỉ test backend, Regression test chỉ test frontend',
    'Smoke test là manual, Regression test phải 100% automated'
  ],
  ARRAY['Smoke test nhanh để xác nhận build cơ bản hoạt động, Regression test đảm bảo feature cũ không bị phá vỡ']::varchar[],
  'Smoke test: "App có mở được không? Login có được không?" — basic sanity. Regression: chạy full test suite sau mỗi thay đổi để đảm bảo không regression.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_07'
),
(
  'cs_se_q_089', 'mcq', 'software-requirements', 'software-requirements',
  'State Diagram (State Machine) UML dùng để mô tả gì?',
  ARRAY[
    'Chuỗi tương tác giữa các object trong một use case cụ thể',
    'Các trạng thái của một object và sự chuyển đổi giữa chúng qua các sự kiện',
    'Cấu trúc phân cấp của các class và inheritance',
    'Phân rã chức năng của hệ thống thành các module nhỏ hơn'
  ],
  ARRAY['Các trạng thái của một object và sự chuyển đổi giữa chúng qua các sự kiện']::varchar[],
  'State Diagram: Order có states (Pending → Confirmed → Shipped → Delivered → Cancelled). Event "payment received" trigger transition.',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_090', 'mcq', 'quality-testing', 'quality-testing',
  'Code Review quan trọng vì lý do gì ngoài việc tìm bug?',
  ARRAY[
    'Đảm bảo developer làm đủ giờ theo yêu cầu của công ty',
    'Knowledge sharing — cả team hiểu codebase, không chỉ người viết',
    'Tạo audit trail để biết ai chịu trách nhiệm khi có sự cố production',
    'Bắt buộc theo quy định pháp luật cho các công ty phần mềm'
  ],
  ARRAY['Knowledge sharing — cả team hiểu codebase, không chỉ người viết']::varchar[],
  'Bus factor: nếu chỉ 1 người hiểu một module, khi họ nghỉ team không thể maintain. Code Review là cách chống bus factor.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_10'
),
(
  'cs_se_q_091', 'mcq', 'software-processes', 'software-processes',
  'MVP (Minimum Viable Product) trong Agile có nghĩa là gì?',
  ARRAY[
    'Phiên bản hoàn chỉnh nhất của sản phẩm với đầy đủ tính năng',
    'Phiên bản sản phẩm tối thiểu đủ để kiểm chứng giả thuyết business và thu thập feedback thực tế',
    'Prototype không có code thật — chỉ là mockup để trình bày với nhà đầu tư',
    'Phiên bản beta chỉ dành cho nội bộ team test trước khi ra mắt thật'
  ],
  ARRAY['Phiên bản sản phẩm tối thiểu đủ để kiểm chứng giả thuyết business và thu thập feedback thực tế']::varchar[],
  'MVP ≠ prototype. MVP chạy thật, users thật dùng. Mục tiêu: validate assumption nhanh nhất với effort ít nhất. Eric Ries (Lean Startup).',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_01'
),
(
  'cs_se_q_092', 'mcq', 'architecture-design', 'architecture-design',
  'Service Mesh (Istio, Linkerd) trong Microservices cung cấp gì?',
  ARRAY[
    'Database cho tất cả microservices dùng chung',
    'Infrastructure layer xử lý service-to-service communication: mTLS, retry, circuit breaking, observability',
    'UI framework để xây dựng frontend cho microservices',
    'Container registry để lưu trữ Docker images của từng service'
  ],
  ARRAY['Infrastructure layer xử lý service-to-service communication: mTLS, retry, circuit breaking, observability']::varchar[],
  'Service Mesh = network layer cho microservices. Sidecar proxy (Envoy) inject vào mỗi service pod, handle cross-cutting: tracing, security, retry transparent.',
  7, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_093', 'mcq', 'quality-testing', 'quality-testing',
  'Zero Trust Security trong CI/CD nghĩa là gì?',
  ARRAY[
    'Không tin tưởng bất kỳ request nào — luôn verify identity và authorization kể cả traffic nội bộ',
    'Không deploy code nếu có bất kỳ warning nào trong quá trình build',
    'Chỉ cho phép Scrum Master approve merge request vào main branch',
    'Không dùng third-party library vì không thể kiểm soát security'
  ],
  ARRAY['Không tin tưởng bất kỳ request nào — luôn verify identity và authorization kể cả traffic nội bộ']::varchar[],
  '"Never trust, always verify." Zero Trust: mTLS giữa services, least privilege, assume breach. Ngược với perimeter security (tin tưởng trong network nội bộ).',
  7, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_094', 'mcq', 'software-processes', 'software-processes',
  'Burndown Chart trong Scrum thể hiện điều gì?',
  ARRAY[
    'Số lượng bug còn tồn đọng sau mỗi ngày của Sprint',
    'Lượng công việc còn lại (Story Points) giảm dần theo ngày trong Sprint',
    'Số giờ làm việc thực tế của từng member mỗi ngày',
    'Số tính năng đã deploy lên production trong Sprint'
  ],
  ARRAY['Lượng công việc còn lại (Story Points) giảm dần theo ngày trong Sprint']::varchar[],
  'Burndown: trục Y = Story Points remaining, trục X = ngày Sprint. Ideal line đi xuống đều. Thực tế trên ideal = delay risk.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
),
(
  'cs_se_q_095', 'mcq', 'architecture-design', 'architecture-design',
  'CQRS (Command Query Responsibility Segregation) pattern làm gì?',
  ARRAY[
    'Tách database read và write thành 2 model riêng biệt để tối ưu độc lập',
    'Gộp tất cả query vào một service để đơn giản hóa data access',
    'Đảm bảo mọi database mutation đều có rollback tự động',
    'Cache tất cả read query để giảm tải cho database chính'
  ],
  ARRAY['Tách database read và write thành 2 model riêng biệt để tối ưu độc lập']::varchar[],
  'CQRS: Command model (writes) được tối ưu cho consistency. Query model (reads) được tối ưu cho performance (denormalized, cached). Event Sourcing thường đi kèm.',
  7, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_096', 'mcq', 'quality-testing', 'quality-testing',
  'A/B Testing trong software development là gì?',
  ARRAY[
    'So sánh Test A (unit test) và Test B (integration test) để chọn chiến lược testing phù hợp',
    'Chạy 2 version code song song cho 2 nhóm users để đo impact của thay đổi',
    'Testing trên 2 môi trường: môi trường A (staging) và môi trường B (production)',
    'Phương pháp pair programming trong đó 2 developer thay nhau viết test và code'
  ],
  ARRAY['Chạy 2 version code song song cho 2 nhóm users để đo impact của thay đổi']::varchar[],
  'A/B test: 50% users thấy button xanh (A), 50% thấy button đỏ (B). Đo conversion rate để quyết định thiết kế nào tốt hơn.',
  5, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_097', 'mcq', 'software-requirements', 'software-requirements',
  'Acceptance Criteria khác User Story thế nào?',
  ARRAY[
    'Acceptance Criteria là tên khác của User Story trong Kanban',
    'User Story mô tả feature từ góc nhìn user, Acceptance Criteria định nghĩa tiêu chí cụ thể để story được coi là done',
    'Acceptance Criteria chỉ do QA viết, User Story chỉ do PO viết',
    'User Story là tài liệu kỹ thuật, Acceptance Criteria là mô tả business'
  ],
  ARRAY['User Story mô tả feature từ góc nhìn user, Acceptance Criteria định nghĩa tiêu chí cụ thể để story được coi là done']::varchar[],
  'Story: "As a user I want to login." Acceptance Criteria: "Given valid email/password When login Then redirect to dashboard AND session created."',
  5, 'Software Requirements', 'cs_software_engineering', 13, 'cs_se_03'
),
(
  'cs_se_q_098', 'mcq', 'architecture-design', 'architecture-design',
  'Hexagonal Architecture (Ports and Adapters) có lợi ích gì?',
  ARRAY[
    'Tối ưu hóa database query bằng cách tách read và write path',
    'Cô lập business logic khỏi infrastructure (DB, UI, external APIs) — dễ test và thay thế adapter',
    'Tự động generate REST API từ domain model',
    'Scale từng layer độc lập mà không ảnh hưởng layer khác'
  ],
  ARRAY['Cô lập business logic khỏi infrastructure (DB, UI, external APIs) — dễ test và thay thế adapter']::varchar[],
  'Hexagonal: core domain ở giữa, Ports định nghĩa interface, Adapters implement. Swap MySQL → MongoDB không cần sửa business logic.',
  7, 'Architecture Design', 'cs_software_engineering', 13, 'cs_se_04'
),
(
  'cs_se_q_099', 'mcq', 'quality-testing', 'quality-testing',
  'Observability trong Microservices gồm 3 trụ cột nào?',
  ARRAY[
    'Security, Availability, Performance',
    'Logs, Metrics, Traces — "three pillars of observability"',
    'Unit Test, Integration Test, End-to-End Test',
    'CI, CD, Monitoring'
  ],
  ARRAY['Logs, Metrics, Traces — "three pillars of observability"']::varchar[],
  'Logs: "what happened." Metrics: "how many, how fast." Traces: "where did request go across services." Stack: ELK + Prometheus/Grafana + Jaeger.',
  6, 'Quality Testing', 'cs_software_engineering', 13, 'cs_se_08'
),
(
  'cs_se_q_100', 'mcq', 'software-processes', 'software-processes',
  'Phát biểu nào tổng kết đúng nhất triết lý cốt lõi của Agile?',
  ARRAY[
    'Viết tài liệu đầy đủ trước, code sau để tránh hiểu nhầm yêu cầu',
    'Giao phần mềm chạy được sớm và thường xuyên, phản hồi với thay đổi liên tục',
    'Hoàn thành tất cả tính năng trước deadline đã cam kết với khách hàng',
    'Phân quyền rõ ràng giữa business và technical để tránh scope creep'
  ],
  ARRAY['Giao phần mềm chạy được sớm và thường xuyên, phản hồi với thay đổi liên tục']::varchar[],
  'Agile Manifesto principle #1: Satisfy customer through early and continuous delivery of valuable software. Đây là cốt lõi của toàn bộ phong trào Agile.',
  5, 'Software Processes', 'cs_software_engineering', 13, 'cs_se_02'
);

COMMIT;
