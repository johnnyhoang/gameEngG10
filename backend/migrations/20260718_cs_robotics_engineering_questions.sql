-- SQL migration to seed 100 question bank for cs_robotics_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_robotics_engineering (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_robotics_engineering';

-- ======================================================================================
-- BÀI GIẢNG 1: Quy trình chọn lựa Động cơ & Hộp số giảm tốc cho Robot (cs_robeng_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_001', 'mcq', 'design-simulation',
    'Để chọn được động cơ phù hợp cho khớp robot, kỹ sư bắt buộc phải tính toán hai thành phần mô-men xoắn nào?',
    ARRAY['Mô-men tĩnh tối đa (do tải và trọng lực) và Mô-men động tối đa (khi gia tốc quay)', 'Mô-men ma sát Coulomb và dòng điện không tải', 'Mô-men quán tính lốp và góc lái', 'Hiệu suất pin và hệ số ma sát lốp'],
    ARRAY['Mô-men tĩnh tối đa (do tải và trọng lực) và Mô-men động tối đa (khi gia tốc quay)']::varchar[],
    'Mô-men tĩnh đảm bảo cánh tay đứng yên giữ được tải, mô-men động đảm bảo cánh tay tăng tốc vung được tải.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_002', 'mcq', 'design-simulation',
    'Hộp số giảm tốc (Gearbox) tích hợp vào động cơ robot thực hiện vai trò cơ học nào?',
    ARRAY['Giảm tốc độ quay đi N lần và tăng mô-men xoắn đầu ra lên N lần (nhân với hiệu suất)', 'Tăng tốc độ quay lên N lần', 'Làm mát trực tiếp cho cuộn dây động cơ', 'Cách ly từ trường nhiễu của động cơ'],
    ARRAY['Giảm tốc độ quay đi N lần và tăng mô-men xoắn đầu ra lên N lần (nhân với hiệu suất)']::varchar[],
    'Hộp số đánh đổi tốc độ để lấy mô-men xoắn lớn kéo khớp robot nặng.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_003', 'mcq', 'design-simulation',
    'Hiện tượng "Rơ khớp" (Backlash) trong hộp số bánh răng được định nghĩa là gì?',
    ARRAY['Khe hở nhỏ giữa các răng ăn khớp gây ra góc quay tự do vô ích khi đảo chiều quay động cơ', 'Sự rò rỉ dầu bôi trơn ra ngoài', 'Động cơ bị quay ngược chiều thiết kế', 'Hiện tượng trượt bánh răng cơ học hoàn toàn'],
    ARRAY['Khe hở nhỏ giữa các răng ăn khớp gây ra góc quay tự do vô ích khi đảo chiều quay động cơ']::varchar[],
    'Backlash làm mất đi độ chính xác định vị khâu cuối và gây va đập rung động cơ khí.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_004', 'mcq', 'design-simulation',
    'Dòng hộp số giảm tốc nào có ưu thế vượt trội "độ rơ bằng không" (Zero Backlash) chuyên dùng cho khớp robot chính xác?',
    ARRAY['Harmonic Drive (Sóng giảm tốc)', 'Bánh răng thẳng thông thường', 'Bánh răng côn nghiêng', 'Truyền động xích kéo'],
    ARRAY['Harmonic Drive (Sóng giảm tốc)']::varchar[],
    'Harmonic Drive sử dụng biến dạng đàn hồi của vòng răng mỏng để triệt tiêu khe hở rơ khớp cơ khí.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_005', 'mcq', 'design-simulation',
    'Đặc trưng cơ học của hộp số xycloit (Cycloidal Drive) thích hợp cho loại khớp robot nào?',
    ARRAY['Khớp chịu tải trọng va đập sốc lớn nhờ diện tích tiếp xúc răng rộng và khả năng quá tải cao', 'Khớp di chuyển tốc độ siêu nhanh', 'Khớp gá kẹp siêu nhẹ dưới 10g', 'Khớp trượt tịnh tiến hành trình dài'],
    ARRAY['Khớp chịu tải trọng va đập sốc lớn nhờ diện tích tiếp xúc răng rộng và khả năng quá tải cao']::varchar[],
    'Cycloidal drive cực kỳ bền bỉ vững chắc, dùng nhiều cho khớp chân robot lớn hoặc chân robot công nghiệp tải nặng.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_006', 'mcq', 'design-simulation',
    'Khi cánh tay robot vươn dài ra tối đa mang vật nặng m, mô-men tĩnh tĩnh do trọng lực tác động lên khớp vai thay đổi thế nào?',
    ARRAY['Đạt giá trị lớn nhất (cánh tay đòn dài nhất)', 'Giảm về bằng 0', 'Giữ nguyên không đổi so với khi co cánh tay', 'Thay đổi dấu âm dương liên tục'],
    ARRAY['Đạt giá trị lớn nhất (cánh tay đòn dài nhất)']::varchar[],
    'Mô-men trọng lực $M = m \cdot g \cdot L$, cánh tay đòn L tối đa làm mô-men xoắn khớp lớn nhất.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_007', 'mcq', 'design-simulation',
    'Hiệu suất cơ học (\\(\\eta\\)) của hộp số giảm tốc bánh răng hành tinh thông thường đạt khoảng bao nhiêu?',
    ARRAY['Khoảng 85% - 95%', 'Chỉ khoảng 10%', 'Luôn đạt 100% tuyệt đối', 'Khoảng 50%'],
    ARRAY['Khoảng 85% - 95%']::varchar[],
    'Bánh răng hành tinh có hiệu suất truyền động tương đối cao, giá thành hợp lý.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_008', 'mcq', 'design-simulation',
    'Hiện tượng "Back-driving" (tự quay ngược) xảy ra khi nào trên khớp robot?',
    ARRAY['Lực tác động bên ngoài vào khâu cuối đủ mạnh để thắng ma sát và tự quay ngược trục động cơ', 'Động cơ tự động đảo chiều quay do phần mềm lỗi', 'Bánh răng bị trượt hoàn toàn', 'Dòng điện sạc pin bị đảo chiều ngược'],
    ARRAY['Lực tác động bên ngoài vào khâu cuối đủ mạnh để thắng ma sát và tự quay ngược trục động cơ']::varchar[],
    'Back-driving cho phép dắt tay robot dạy học (teaching by demonstration) nhưng gây nguy hiểm nếu mất điện tự rơi tải.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_009', 'short-answer', 'design-simulation',
    'Điền tên tiếng Anh của dòng hộp số cơ học cho độ rơ bằng không chuyên dùng khớp vai/khuỷu robot. (Viết hoa chữ đầu cả 2 từ, có khoảng trắng)',
    NULL,
    ARRAY['Harmonic Drive', 'Harmonic drive']::varchar[],
    'Harmonic Drive triệt tiêu độ rơ.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_01'
  ),
  (
    'cs_robeng_q_010', 'short-answer', 'design-simulation',
    'Điền tên tiếng Anh chỉ khe hở rơ khớp cơ khí khi đảo chiều bánh răng. (Viết thường)',
    NULL,
    ARRAY['backlash', 'độ rơ', 'khe hở răng']::varchar[],
    'Backlash là khe hở ăn khớp răng.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Mô tả cấu trúc Robot bằng URDF & Mô phỏng vật lý trong Gazebo (cs_robeng_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_011', 'mcq', 'design-simulation',
    'Định dạng tệp tin nào được dùng phổ biến nhất trong ROS2 để mô tả cấu trúc liên kết cơ học robot?',
    ARRAY['URDF (Unified Robot Description Format) dạng XML', 'JSON', 'YAML', 'CSV'],
    ARRAY['URDF (Unified Robot Description Format) dạng XML']::varchar[],
    'URDF là tệp XML chuẩn hóa mô tả các khâu link và khớp joint.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_012', 'mcq', 'design-simulation',
    'Thẻ `<link>` trong file URDF dùng để biểu diễn đối tượng nào?',
    ARRAY['Khâu cứng vật lý của robot (chứa thông số visual, va chạm collision và ma trận quán tính inertial)', 'Khớp quay kết nối', 'Tín hiệu điều khiển động cơ', 'Địa chỉ IP cổng mạng'],
    ARRAY['Khâu cứng vật lý của robot (chứa thông số visual, va chạm collision và ma trận quán tính inertial)']::varchar[],
    'Link đại diện cho bộ phận cơ thể cứng của robot (ví dụ cánh tay, bánh xe).',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_013', 'mcq', 'design-simulation',
    'Thẻ `<joint>` trong file URDF biểu thị điều gì?',
    ARRAY['Mối quan hệ liên kết hình học và giới hạn chuyển động giữa 2 link kề cạnh nhau', 'Màu sắc hiển thị của robot', 'Động năng của robot', 'Trọng lượng của pin'],
    ARRAY['Mối quan hệ liên kết hình học và giới hạn chuyển động giữa 2 link kề cạnh nhau']::varchar[],
    'Joint quy định khớp động học kết nối (ví dụ khớp xoay, trượt, cố định).',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_014', 'mcq', 'design-simulation',
    'Sự khác nhau cơ bản giữa thẻ `<visual>` và thẻ `<collision>` trong link URDF là gì?',
    ARRAY['`<visual>` định nghĩa hình dáng đồ họa hiển thị đẹp mắt cho người nhìn; `<collision>` định nghĩa hình dáng hình học đơn giản để engine vật lý tính toán va chạm nhanh', 'Không có sự khác nhau', '`<collision>` làm tốn nhiều RAM hơn', '`<visual>` chỉ chạy ngoài đời thật'],
    ARRAY['`<visual>` định nghĩa hình dáng đồ họa hiển thị đẹp mắt cho người nhìn; `<collision>` định nghĩa hình dáng hình học đơn giản để engine vật lý tính toán va chạm nhanh']::varchar[],
    'Dùng box/cylinder cho collision giúp giải thuật tránh va chạm chạy siêu nhanh trên CPU.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_015', 'mcq', 'design-simulation',
    'Tại sao việc mô tả chính xác thẻ `<inertial>` trong URDF lại bắt buộc khi mô phỏng robot trong Gazebo?',
    ARRAY['Để engine vật lý tính toán chính xác trọng lực, quán tính gia tốc và lực va đập cơ học của robot ảo', 'Để robot hiển thị màu sắc đúng', 'Để tăng tốc độ truyền mạng wifi', 'Để nạp code nhanh hơn'],
    ARRAY['Để engine vật lý tính toán chính xác trọng lực, quán tính gia tốc và lực va đập cơ học của robot ảo']::varchar[],
    'Nếu thiếu khối lượng m và ma trận quán tính I, mô hình robot sẽ lơ lửng hoặc bay mất kiểm soát trong Gazebo.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_016', 'mcq', 'design-simulation',
    'Loại khớp "revolute" trong URDF cho phép thực hiện chuyển động nào?',
    ARRAY['Xoay quanh một trục duy nhất và bị giới hạn góc xoay tối đa/tối thiểu', 'Xoay tròn vô hạn vòng', 'Tịnh tiến trọc dọc', 'Cố định cứng không di chuyển'],
    ARRAY['Xoay quanh một trục duy nhất và bị giới hạn góc xoay tối đa/tối thiểu']::varchar[],
    'Khớp revolute dùng cho khớp gối, khớp vai có hành trình giới hạn cơ học.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_017', 'mcq', 'design-simulation',
    'Loại khớp "continuous" trong URDF khác khớp "revolute" ở điểm nào?',
    ARRAY['Continuous cho phép xoay tròn vô hạn không giới hạn góc quay (như khớp bánh xe)', 'Continuous là khớp trượt', 'Continuous không chuyển động được', 'Continuous chạy nhanh hơn'],
    ARRAY['Continuous cho phép xoay tròn vô hạn không giới hạn góc quay (như khớp bánh xe)']::varchar[],
    'Bánh xe vi sai quay vô hạn vòng chọn loại continuous.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_018', 'mcq', 'design-simulation',
    'Gói phần mềm mô phỏng 3D tương tác vật lý động lực học thời gian thực phổ biến nhất đi kèm ROS2 là gì?',
    ARRAY['Gazebo', 'OpenCV', 'MoveIt', 'TF2'],
    ARRAY['Gazebo']::varchar[],
    'Gazebo giả lập đầy đủ camera, LiDAR, tiếp xúc đất cầu H động lực học.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_019', 'short-answer', 'design-simulation',
    'Điền tên viết tắt tiếng Anh của định dạng mô tả robot XML chuẩn trong ROS2. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['URDF']::varchar[],
    'URDF là Unified Robot Description Format.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_02'
  ),
  (
    'cs_robeng_q_020', 'short-answer', 'design-simulation',
    'Điền tên phần mềm mô phỏng vật lý 3D động lực học tích hợp sâu với ROS2. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Gazebo']::varchar[],
    'Gazebo mô phỏng môi trường thế giới ảo.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Cấu hình DDS & Tối ưu hóa QoS trong mạng ROS2 (cs_robeng_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_021', 'mcq', 'integration-qos',
    'Kiến trúc truyền thông DDS (Data Distribution Service) dưới lớp ROS2 hoạt động theo cơ chế nào?',
    ARRAY['Ngang hàng (Peer-to-peer) phân tán tự phát hiện nút (Discovery), không cần Master trung gian', 'Client-Server tập trung qua một Broker', 'Truyền nhận tuần tự qua cổng serial', 'Mạng hình sao tập trung'],
    ARRAY['Ngang hàng (Peer-to-peer) phân tán tự phát hiện nút (Discovery), không cần Master trung gian']::varchar[],
    'DDS tự động quảng bá (multicast discovery) để kết nối trực tiếp các node, tăng độ bền bỉ mạng.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_022', 'mcq', 'integration-qos',
    'Cấu hình QoS "Best effort" cho thuộc tính Reliability hoạt động như thế nào?',
    ARRAY['Gửi gói tin nhanh nhất có thể qua UDP, nếu mất gói tin thì bỏ qua không truyền lại để tránh nghẽn mạng', 'Bắt buộc truyền nhận xác thực 3 bước', 'Đứng chờ đến khi gửi được mới thôi', 'Tự động mã hóa gói tin'],
    ARRAY['Gửi gói tin nhanh nhất có thể qua UDP, nếu mất gói tin thì bỏ qua không truyền lại để tránh nghẽn mạng']::varchar[],
    'Best effort tối ưu cho dữ liệu lớn tần số cao như LiDAR scan `/scan` hay camera frame `/image_raw`.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_023', 'mcq', 'integration-qos',
    'Cấu hình QoS "Reliable" cho thuộc tính Reliability phù hợp cho loại dữ liệu nào?',
    ARRAY['Lệnh điều khiển di chuyển khẩn cấp hoặc lệnh dịch vụ bắt buộc phải đến đích không được mất', 'Dữ liệu ảnh camera 8K', 'Xung nhiễu điện từ', 'Tọa độ điểm LiDAR thô'],
    ARRAY['Lệnh điều khiển di chuyển khẩn cấp hoặc lệnh dịch vụ bắt buộc phải đến đích không được mất']::varchar[],
    'Reliable dùng cơ chế bắt tay gửi lại gói tin lỗi, bảo đảm an toàn truyền lệnh `/cmd_vel`.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_024', 'mcq', 'integration-qos',
    'Cấu hình QoS "Transient local" cho thuộc tính Durability mang lại lợi ích gì?',
    ARRAY['Lưu trữ các tin nhắn cũ tại publisher để gửi lập tức cho subscriber mới kết nối vào sau đó', 'Tự động xóa tin nhắn cũ đi ngay', 'Chỉ lưu tin nhắn vào ổ cứng', 'Chuyển tin nhắn qua cổng DMA'],
    ARRAY['Lưu trữ các tin nhắn cũ tại publisher để gửi lập tức cho subscriber mới kết nối vào sau đó']::varchar[],
    'Transient local dùng để gửi bản đồ tĩnh hoặc cấu hình ban đầu khi robot khởi tạo node muộn.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_025', 'mcq', 'integration-qos',
    'Biến môi trường ROS2 nào được dùng để phân vùng mạng độc lập, tránh các robot trong cùng dải Wifi chèn sóng đè lệnh lên nhau?',
    ARRAY['ROS_DOMAIN_ID', 'ROS_MASTER_URI', 'ROS_PACKAGE_PATH', 'ROS_QOS_PROFILE'],
    ARRAY['ROS_DOMAIN_ID']::varchar[],
    'ROS_DOMAIN_ID (từ 0 đến 232) gán cổng port DDS độc lập để chia cụm mạng robot cô lập.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_026', 'mcq', 'integration-qos',
    'Điều gì xảy ra nếu Publisher cấu hình QoS Reliability là "Best effort" nhưng Subscriber lại cấu hình là "Reliable"?',
    ARRAY['Hai node không thể kết nối truyền nhận dữ liệu với nhau do không tương thích cấu hình QoS (incompatible QoS)', 'Hai node vẫn kết nối bình thường và chạy theo Best effort', 'Hệ thống tự động báo lỗi treo máy', 'Subscriber tự động thay đổi cấu hình'],
    ARRAY['Hai node không thể kết nối truyền nhận dữ liệu với nhau do không tương thích cấu hình QoS (incompatible QoS)']::varchar[],
    'QoS compatibility matrix quy định Subscriber không được yêu cầu độ tin cậy cao hơn khả năng cung cấp của Publisher.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_027', 'mcq', 'integration-qos',
    'Trong ROS2, QoS Profile mặc định `sensor_data` thường cấu hình các thông số thế nào?',
    ARRAY['Reliability: Best effort, History: Keep last (depth=5)', 'Reliability: Reliable, History: Keep all', 'Reliability: Best effort, Durability: Transient local', 'Reliability: Reliable, Durability: Volatile'],
    ARRAY['Reliability: Best effort, History: Keep last (depth=5)']::varchar[],
    'Profile sensor_data tối ưu sẵn cho việc đẩy dữ liệu cảm biến băng thông rộng, chấp nhận mất gói tin cũ.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_028', 'mcq', 'integration-qos',
    'Nhà sản xuất middleware DDS mặc định được cài sẵn cùng gói cài đặt chuẩn ROS2 Humble là gì?',
    ARRAY['Fast DDS (eProsima)', 'Cyclone DDS (Eclipse)', 'Connext DDS (RTI)', 'OpenDDS'],
    ARRAY['Fast DDS (eProsima)']::varchar[],
    'Fast DDS là middleware mặc định của ROS2 Humble, hỗ trợ đầy đủ các tính năng tối ưu bảo mật.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_029', 'short-answer', 'integration-qos',
    'Điền tên viết tắt tiếng Anh của chuẩn middleware phân tán làm nền tảng truyền thông ROS2. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DDS']::varchar[],
    'DDS là Data Distribution Service.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_03'
  ),
  (
    'cs_robeng_q_030', 'short-answer', 'integration-qos',
    'Điền tên viết tắt tiếng Anh của chất lượng dịch vụ cấu hình cho topic truyền tin. (Viết hoa chữ Q và S đầu cuối, o viết thường)',
    NULL,
    ARRAY['QoS', 'Qos']::varchar[],
    'QoS là Quality of Service.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Kiểm thử Hardware-in-the-Loop (HIL) cho Robot (cs_robeng_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_031', 'mcq', 'testing-calibration',
    'Kiểm thử Hardware-in-the-Loop (HIL) được định nghĩa thế nào?',
    ARRAY['Firmware thật chạy trên vi điều khiển thật kết nối vật lý với máy tính giả lập thời gian thực đóng vai trò môi trường và robot ảo', 'Kiểm thử toàn bộ hệ thống bằng phần mềm mô phỏng máy tính', 'Kiểm thử độ cứng của kim loại vỏ xe', 'Để robot tự chạy thử ngoài đời thực'],
    ARRAY['Firmware thật chạy trên vi điều khiển thật kết nối vật lý với máy tính giả lập thời gian thực đóng vai trò môi trường và robot ảo']::varchar[],
    'HIL đưa phần cứng điều khiển thật vào vòng lặp mô phỏng vật lý ảo thời gian thực.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_032', 'mcq', 'testing-calibration',
    'Ưu điểm lớn nhất của HIL Testing đối với độ an toàn phát triển robot là gì?',
    ARRAY['Cho phép thử nghiệm các tình huống lỗi nguy hiểm (như đứt phanh, quá nhiệt pin) mà không sợ hỏng hóc cơ khí thật hay gây tai nạn chấn thương', 'HIL có chi phí rẻ hơn mô phỏng phần mềm', 'HIL không cần dùng nguồn điện', 'HIL tự động viết code thay cho kỹ sư'],
    ARRAY['Cho phép thử nghiệm các tình huống lỗi nguy hiểm (như đứt phanh, quá nhiệt pin) mà không sợ hỏng hóc cơ khí thật hay gây tai nạn chấn thương']::varchar[],
    'Giả lập tín hiệu sự cố cho MCU thật phản ứng, nếu thuật toán sai xe ảo đâm tường ảo, bo mạch thật vẫn an toàn.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_033', 'mcq', 'testing-calibration',
    'Tín hiệu nào được máy tính giả lập HIL tạo ra để bơm vào chân đọc xung Timer của MCU thật để giả lập xe đang chạy?',
    ARRAY['Chuỗi xung số sườn lên xuống mô phỏng xung A/B từ Quadrature Encoder bánh xe', 'Điện áp xoay chiều 220V', 'Tín hiệu GPS không dây vệ tinh', 'Lưới điện xoay chiều 50Hz'],
    ARRAY['Chuỗi xung số sườn lên xuống mô phỏng xung A/B từ Quadrature Encoder bánh xe']::varchar[],
    'Giả lập xung encoder giúp MCU đếm tốc độ ảo và tính toán PID vòng kín.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_034', 'mcq', 'testing-calibration',
    'Tại sao máy tính giả lập HIL bắt buộc phải chạy hệ điều hành thời gian thực (Real-time OS)?',
    ARRAY['Để bảo đảm bước mô phỏng vật lý luôn đồng bộ cứng cấp micro-giây với phản hồi điện của mạch thật, tránh sai lệch thời gian', 'Để cài đặt được hệ điều hành Windows', 'Để tăng dung lượng lưu trữ ổ cứng', 'Do quy định của hãng sản xuất bo mạch'],
    ARRAY['Để bảo đảm bước mô phỏng vật lý luôn đồng bộ cứng cấp micro-giây với phản hồi điện của mạch thật, tránh sai lệch thời gian']::varchar[],
    'Hệ điều hành thường (như Windows, Linux thông thường) có độ trễ lập lịch ngẫu nhiên lớn (jitter), làm hỏng tính đồng bộ điện của HIL.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_035', 'mcq', 'testing-calibration',
    'HIL nằm ở vị trí nào trong quy trình kiểm thử chữ V (V-model) tiêu chuẩn?',
    ARRAY['Giữa kiểm thử phần mềm mô phỏng (SIL) và kiểm thử thực địa trên xe thật', 'Ở bước phân tích yêu cầu đầu tiên', 'Sau khi sản phẩm đã bán ra thị trường', 'Trùng với bước viết code firmware'],
    ARRAY['Giữa kiểm thử phần mềm mô phỏng (SIL) và kiểm thử thực địa trên xe thật']::varchar[],
    'HIL là bước chuyển tiếp cốt lõi xác nhận phần cứng điều khiển trước khi lắp ráp vào khung vỏ cơ khí thật.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_036', 'mcq', 'testing-calibration',
    'Khi chạy HIL, lệnh điều khiển (như PWM) từ MCU thật được gửi đi đâu?',
    ARRAY['Được nối trực tiếp làm đầu vào cho máy tính mô phỏng thời gian thực để cập nhật trạng thái động cơ ảo', 'Gửi trực tiếp ra động cơ thật', 'Tải lên đám mây google drive', 'Tự động reset về bằng 0'],
    ARRAY['Được nối trực tiếp làm đầu vào cho máy tính mô phỏng thời gian thực để cập nhật trạng thái động cơ ảo']::varchar[],
    'Máy tính mô phỏng đo chu kỳ nhiệm vụ xung PWM để tính ra lực kéo ảo của động cơ ảo.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_037', 'mcq', 'testing-calibration',
    'Thiết bị HIL nổi tiếng thế học được dùng nhiều trong phát triển ô tô tự lái và máy bay là gì?',
    ARRAY['dSPACE (hoặc NI VeriStand)', 'Arduino Uno', 'Raspberry Pi 4', 'OpenCV Python'],
    ARRAY['dSPACE (hoặc NI VeriStand)']::varchar[],
    'dSPACE cung cấp các bo mạch FPGA và vi xử lý thời gian thực chuyên dụng để chạy mô hình mô phỏng Simulink siêu tốc.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_038', 'mcq', 'testing-calibration',
    'HIL giúp phát hiện lỗi nào mà kiểm thử phần mềm thuần túy (SIL) thường bỏ qua?',
    ARRAY['Lỗi độ trễ driver phần cứng, tràn số bộ đếm timer vật lý và sụt áp cổng IO', 'Lỗi cú pháp biên dịch C++', 'Lỗi định dạng cấu trúc tệp XML', 'Lỗi thiết kế kiểu dáng vỏ hộp nhựa'],
    ARRAY['Lỗi độ trễ driver phần cứng, tràn số bộ đếm timer vật lý và sụt áp cổng IO']::varchar[],
    'Môi trường SIL không mô phỏng các thuộc tính điện và độ trễ vật lý thực của chip MCU.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_039', 'short-answer', 'testing-calibration',
    'Điền tên viết tắt tiếng Anh của phương pháp kiểm thử Hardware-in-the-Loop. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['HIL']::varchar[],
    'HIL là Hardware-in-the-Loop.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_04'
  ),
  (
    'cs_robeng_q_040', 'short-answer', 'testing-calibration',
    'Điền tên viết tắt tiếng Anh của phương pháp kiểm thử mô phỏng phần mềm thuần túy trước HIL. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SIL']::varchar[],
    'SIL là Software-in-the-Loop.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Kiểu dáng công nghiệp & Gia công cơ khí chính xác cho Robot (cs_robeng_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_051', 'mcq', 'design-simulation',
    'Đặc tính của phương pháp gia công phay CNC kim loại là gì?',
    ARRAY['Cắt gọt phôi kim loại bằng dao cắt tự động điều khiển số đạt độ chính xác cực cao (<0.01mm) và độ bền cơ học cao', 'Bồi đắp nhựa theo lớp nóng chảy', 'Sử dụng tia cực tím hóa cứng nhựa lỏng', 'Đúc áp lực khuôn cát'],
    ARRAY['Cắt gọt phôi kim loại bằng dao cắt tự động điều khiển số đạt độ chính xác cực cao (<0.01mm) và độ bền cơ học cao']::varchar[],
    'CNC là phương pháp gia công cắt gọt (subtractive manufacturing) chính cho khung xương robot chịu lực.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_052', 'mcq', 'design-simulation',
    'Nhược điểm cơ học lớn nhất của chi tiết in 3D công nghệ FDM (sợi nhựa nóng chảy) là gì?',
    ARRAY['Độ bền cơ học dị hướng: lực liên kết giữa các lớp nhựa xếp chồng yếu, dễ nứt toác dọc theo thớ in khi chịu tải', 'Giá thành vật liệu quá đắt đỏ', 'Không in được các chi tiết rỗng', 'Bề mặt nhựa dẫn điện rất tốt'],
    ARRAY['Độ bền cơ học dị hướng: lực liên kết giữa các lớp nhựa xếp chồng yếu, dễ nứt toác dọc theo thớ in khi chịu tải']::varchar[],
    'In FDM bồi đắp từng lớp nóng chảy dính nhau, liên kết liên lớp luôn kém hơn độ bền nội tại của thớ nhựa.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_053', 'mcq', 'design-simulation',
    'Độ chính xác lắp ghép vòng bi cơ khí yêu cầu chế độ dung sai nào?',
    ARRAY['Dung sai kích thước siêu mịn cấp độ micromet (như hệ lỗ tiêu chuẩn H7/g6) để bảo đảm lắp khít chặt hoặc quay êm', 'Dung sai tự do không cần kiểm soát', 'Sai số cho phép trong khoảng 1mm đến 2mm', 'Không dùng vòng bi cơ khí'],
    ARRAY['Dung sai kích thước siêu mịn cấp độ micromet (như hệ lỗ tiêu chuẩn H7/g6) để bảo đảm lắp khít chặt hoặc quay êm']::varchar[],
    'Lắp vòng bi yêu cầu dung sai trục và lỗ chặt chẽ để vòng ngoài không bị xoay trượt lỏng lẻo trong ổ đỡ.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_054', 'mcq', 'design-simulation',
    'Nhôm hợp kim 6061 được ứng dụng rộng rãi làm khung robot nhờ ưu điểm nào?',
    ARRAY['Tỷ số độ bền trên khối lượng tốt, nhẹ, khả năng kháng ăn mòn cao và dễ gia công cắt gọt CNC', 'Có khả năng tự phục hồi hình dạng cũ', 'Nhôm 6061 dẫn từ tốt nhất', 'Giá rẻ như nhựa PLA'],
    ARRAY['Tỷ số độ bền trên khối lượng tốt, nhẹ, khả năng kháng ăn mòn cao và dễ gia công cắt gọt CNC']::varchar[],
    'Nhôm 6061 là hợp kim nhôm chuẩn cơ khí chế tạo máy robot.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_055', 'mcq', 'design-simulation',
    'Công nghệ in 3D SLA (Stereolithography) hóa cứng vật liệu bằng nguồn năng lượng nào?',
    ARRAY['Tia UV cực tím quét trên bề mặt nhựa lỏng polymer nhạy sáng', 'Dòng khí nén áp lực lớn', 'Nung chảy sợi nhựa PLA nhiệt độ cao', 'Từ trường nam châm điện'],
    ARRAY['Tia UV cực tím quét trên bề mặt nhựa lỏng polymer nhạy sáng']::varchar[],
    'In SLA (resin printing) cho độ sắc nét bề mặt siêu cao, thích hợp cho các chi tiết mô hình nhỏ chính xác.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_056', 'mcq', 'design-simulation',
    'Tại sao việc thiết kế vỏ hộp robot phải tích hợp các khe rãnh đệm cao su (O-rings) tại mép nối?',
    ARRAY['Để chống bụi bẩn xâm nhập và chống nước theo chuẩn bảo vệ IP', 'Để trang trí thêm màu sắc', 'Để cách điện hoàn toàn vỏ hộp', 'Để tăng mô-men động cơ'],
    ARRAY['Để chống bụi bẩn xâm nhập và chống nước theo chuẩn bảo vệ IP']::varchar[],
    'Gioăng cao su biến dạng cơ học lấp kín các khe hở cơ khí chế tạo gá nối vỏ.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_057', 'mcq', 'design-simulation',
    'Dung sai hình học GD&T (Geometric Dimensioning and Tolerancing) quy định điều gì?',
    ARRAY['Giới hạn sai số cho phép về hình dáng hình học (độ phẳng, độ tròn, độ đồng tâm) của chi tiết chế tạo', 'Giá tiền của nguyên liệu nhôm', 'Tốc độ quay tối đa của dao phay CNC', 'Trọng lượng của robot sau khi lắp ráp'],
    ARRAY['Giới hạn sai số cho phép về hình dáng hình học (độ phẳng, độ tròn, độ đồng tâm) của chi tiết chế tạo']::varchar[],
    'GD&T bảo đảm độ đồng trục của hai ổ bi khớp vai cánh tay robot để tránh bị gập bó cứng khớp khi quay.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_058', 'mcq', 'design-simulation',
    'Nhựa kỹ thuật POM (Polyoxymethylene / Acetal) thường dùng làm cấu kiện nào trong robot?',
    ARRAY['Bánh răng truyền động chịu mài mòn cao, độ tự bôi trơn tốt và độ bền kích thước cao', 'Lốp xe kéo hàng', 'Vỏ bọc chì chống phóng xạ vũ trụ', 'Cơ cấu cách ly quang học'],
    ARRAY['Bánh răng truyền động chịu mài mòn cao, độ tự bôi trơn tốt và độ bền kích thước cao']::varchar[],
    'Nhựa POM có độ cứng cơ học cao, hệ số ma sát trượt thấp, dùng làm bánh răng hoặc bạc trượt giá rẻ.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_059', 'short-answer', 'design-simulation',
    'Điền tên viết tắt tiếng Anh của công nghệ gia công cắt gọt điều khiển số bằng máy tính. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CNC']::varchar[],
    'CNC là Computer Numerical Control.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_05'
  ),
  (
    'cs_robeng_q_060', 'short-answer', 'design-simulation',
    'Điền tên viết tắt tiếng Anh của công nghệ in 3D bồi đắp nhựa sợi nóng chảy phổ biến nhất. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FDM']::varchar[],
    'FDM là Fused Deposition Modeling.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Quản lý rủi ro FMEA trong thiết kế hệ thống Robot (cs_robeng_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_061', 'mcq', 'design-simulation',
    'Chỉ số RPN (Risk Priority Number) trong FMEA được tính bằng tích của các đại lượng nào?',
    ARRAY['RPN = Severity (Nghiêm trọng) * Occurrence (Tần suất) * Detection (Khả năng phát hiện)', 'RPN = Vận tốc * Khối lượng * Gia tốc', 'RPN = Lực va chạm * Độ trễ * Giá thành', 'RPN = Điện áp * Dòng điện * Thời gian'],
    ARRAY['RPN = Severity (Nghiêm trọng) * Occurrence (Tần suất) * Detection (Khả năng phát hiện)']::varchar[],
    'RPN là chỉ số ưu tiên rủi ro để lọc ra các lỗi nguy hiểm bắt buộc phải thiết kế lại.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_062', 'mcq', 'design-simulation',
    'Mục tiêu chính của việc chạy quy trình rà soát rủi ro FMEA trong phát triển robot là gì?',
    ARRAY['Phát hiện và loại bỏ các lỗi thiết kế tiềm ẩn trước khi sản xuất hàng loạt và đưa robot vào vận hành thực tế', 'Tăng tốc độ động cơ lên tối đa', 'Đăng ký bản quyền thương mại', 'Tự động sinh mã nguồn ROS2'],
    ARRAY['Phát hiện và loại bỏ các lỗi thiết kế tiềm ẩn trước khi sản xuất hàng loạt và đưa robot vào vận hành thực tế']::varchar[],
    'FMEA phòng ngừa rủi ro hệ thống, tiết kiệm chi phí triệu hồi sửa chữa lỗi thiết kế thô sơ.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_063', 'mcq', 'design-simulation',
    'Khái niệm "SPoF" (Single Point of Failure) biểu thị điều gì nguy hiểm?',
    ARRAY['Một điểm hỏng hóc đơn lẻ duy nhất mà nếu xảy ra sẽ làm tê liệt toàn bộ hoạt động của cả hệ thống robot', 'Điểm gốc tọa độ của robot', 'Động cơ chính của bánh xe', 'Chân cắm sạc pin duy nhất'],
    ARRAY['Một điểm hỏng hóc đơn lẻ duy nhất mà nếu xảy ra sẽ làm tê liệt toàn bộ hoạt động của cả hệ thống robot']::varchar[],
    'SPoF là điểm chí tử trong thiết kế, cần bị triệt tiêu bằng cơ chế dự phòng (redundancy).',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_064', 'mcq', 'design-simulation',
    'Thiết kế dự phòng "Redundancy Design" giải quyết SPoF bằng cách nào?',
    ARRAY['Trang bị song song 2 hoặc nhiều cảm biến/linh kiện cùng nhiệm vụ để tự thế chỗ khi có 1 linh kiện hỏng', 'Giảm số lượng chân vi xử lý', 'Tắt toàn bộ robot khi có sự cố', 'Sử dụng linh kiện đắt tiền nhất'],
    ARRAY['Trang bị song song 2 hoặc nhiều cảm biến/linh kiện cùng nhiệm vụ để tự thế chỗ khi có 1 linh kiện hỏng']::varchar[],
    'Dự phòng cảm biến (như chạy 2 IMU, dùng nút E-stop tiếp điểm kép) bảo đảm hệ thống vẫn chạy an toàn khi có lỗi đơn.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_065', 'mcq', 'design-simulation',
    'Điểm nghiêm trọng Severity trong FMEA được chấm điểm cao nhất (9-10) cho hậu quả nào?',
    ARRAY['Hư hỏng gây nguy hiểm trực tiếp đến tính mạng hoặc sức khỏe của con người vận hành', 'Làm xước sơn vỏ robot', 'Làm mất kết nối mạng Wifi 1 giây', 'Làm sụt áp pin 0.1V'],
    ARRAY['Hư hỏng gây nguy hiểm trực tiếp đến tính mạng hoặc sức khỏe của con người vận hành']::varchar[],
    'Mọi lỗi đe dọa an toàn tính mạng con người luôn được xếp hạng nghiêm trọng nhất để bắt buộc xử lý phần cứng ngắt khẩn cấp.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_066', 'mcq', 'design-simulation',
    'Làm thế nào để giảm điểm khả năng phát hiện Detection (giảm RPN) cho lỗi rò rỉ dòng điện ra vỏ robot?',
    ARRAY['Tích hợp thêm cảm biến đo dòng rò liên kết mạch bảo vệ tự động ngắt điện lập tức khi phát hiện rò điện', 'Chụp ảnh vỏ xe định kỳ', 'Sử dụng găng tay cách điện', 'Không cần làm gì cả'],
    ARRAY['Tích hợp thêm cảm biến đo dòng rò liên kết mạch bảo vệ tự động ngắt điện lập tức khi phát hiện rò điện']::varchar[],
    'Detection càng nhỏ biểu thị lỗi càng dễ được hệ thống tự động phát hiện sớm trước khi gây hậu quả.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_067', 'mcq', 'design-simulation',
    'Quy chuẩn FMEA chia làm các loại phân tích nào chính?',
    ARRAY['DFMEA (Design - thiết kế) và PFMEA (Process - quy trình sản xuất)', 'SFMEA (Software) và HFMEA (Hardware)', 'Không phân loại', 'Chỉ dùng cho cơ khí'],
    ARRAY['DFMEA (Design - thiết kế) và PFMEA (Process - quy trình sản xuất)']::varchar[],
    'DFMEA rà soát lỗi cấu trúc sơ đồ bản vẽ; PFMEA rà soát lỗi do công đoạn lắp ráp, hàn mạch tại nhà máy.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_068', 'mcq', 'design-simulation',
    'Thang điểm chấm Severity, Occurrence và Detection trong FMEA chuẩn là bao nhiêu?',
    ARRAY['Từ 1 đến 10', 'Từ 0 đến 100', 'Chỉ có 0 và 1', 'Tùy chọn ngẫu nhiên'],
    ARRAY['Từ 1 đến 10']::varchar[],
    'Chấm điểm từ 1 (tốt nhất/an toàn/dễ phát hiện) đến 10 (tệ nhất/nguy hiểm/không thể phát hiện).',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_069', 'short-answer', 'design-simulation',
    'Điền tên viết tắt tiếng Anh của Phương pháp phân tích dạng sai lỗi và ảnh hưởng. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FMEA']::varchar[],
    'FMEA là Failure Mode and Effects Analysis.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_06'
  ),
  (
    'cs_robeng_q_070', 'short-answer', 'design-simulation',
    'Điền tên viết tắt tiếng Anh của Điểm lỗi đơn chí tử gây sập toàn bộ hệ thống robot. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SPOF', 'SPoF']::varchar[],
    'SPoF là Single Point of Failure.',
    6, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Quản lý hạm đội Robot (Fleet Management) trong nhà kho thông minh (cs_robeng_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_071', 'mcq', 'integration-qos',
    'Phần mềm Fleet Management (Quản lý hạm đội) thực hiện nhiệm vụ gì?',
    ARRAY['Giám sát trạng thái và điều phối, phân làn đường đi cho hàng chục đến hàng trăm robot di chuyển đồng thời tránh đâm nhau', 'Tự động sạc pin không dây', 'Viết chương trình điều khiển PID cho bánh xe', 'Chụp ảnh camera giám sát'],
    ARRAY['Giám sát trạng thái và điều phối, phân làn đường đi cho hàng chục đến hàng trăm robot di chuyển đồng thời tránh đâm nhau']::varchar[],
    'Fleet Management hoạt động như bộ não trung tâm kiểm soát giao thông kho hàng thông minh.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_072', 'mcq', 'integration-qos',
    'Giao thức mạng tiêu chuẩn quốc tế quy định giao tiếp giữa xe tự hành AMR và máy chủ Fleet Manager có tên là gì?',
    ARRAY['VDA 5050', 'TCP/IP v6', 'ROS2 DDS', 'Modbus RTU'],
    ARRAY['VDA 5050']::varchar[],
    'VDA 5050 là chuẩn hóa giao thức chung của hiệp hội công nghiệp ô tô Đức cho phép điều phối các loại xe khác hãng chung 1 map.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_073', 'mcq', 'integration-qos',
    'Cơ chế điều phối giao thông "Zone-blocking" trong kho hoạt động ra sao?',
    ARRAY['Chia bản đồ thành các vùng ảo độc quyền, robot phải xin phép vào vùng ngã tư ngõ hẹp và máy chủ chỉ cấp phép cho duy nhất 1 xe tại một thời điểm', 'Khóa cứng bánh xe robot', 'Bắt buộc robot đi thành hàng dọc sát nhau', 'Tự động tắt mạng wifi của xe rảnh'],
    ARRAY['Chia bản đồ thành các vùng ảo độc quyền, robot phải xin phép vào vùng ngã tư ngõ hẹp và máy chủ chỉ cấp phép cho duy nhất 1 xe tại một thời điểm']::varchar[],
    'Zone-blocking ngăn hiện tượng 2 robot đi đầu đầu đối diện nhau gây kẹt cứng deadlock không thể lùi lách.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_074', 'mcq', 'integration-qos',
    'Khi robot bị mất kết nối Wi-Fi tạm thời trong kho hàng, hành vi an toàn mặc định bắt buộc là gì?',
    ARRAY['Robot tự động phanh đứng chờ tại chỗ, phát đèn cảnh báo vàng và liên tục thử kết nối lại', 'Vẫn tiếp tục di chuyển mù theo odometry', 'Tự động tăng tốc độ tối đa để tìm sóng', 'Xóa toàn bộ bản đồ tĩnh'],
    ARRAY['Robot tự động phanh đứng chờ tại chỗ, phát đèn cảnh báo vàng và liên tục thử kết nối lại']::varchar[],
    'Mất sóng wifi làm xe mất kiểm soát điều phối từ Fleet Manager, di chuyển tiếp có nguy cơ cao va đập với xe khác.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_075', 'mcq', 'integration-qos',
    'Tính năng "Auto-docking" của Fleet Management thực hiện việc gì?',
    ARRAY['Tự động lập lịch điều phối robot có dung lượng pin sụt dưới ngưỡng an toàn di chuyển về trạm sạc tự động cắm giắc', 'Đóng gói robot vào thùng gỗ xuất khẩu', 'Lập bản đồ 2D cho LiDAR', 'Đồng bộ hóa nhịp xung clock'],
    ARRAY['Tự động lập lịch điều phối robot có dung lượng pin sụt dưới ngưỡng an toàn di chuyển về trạm sạc tự động cắm giắc']::varchar[],
    'Auto-docking bảo đảm hạm đội hoạt động 24/7 không bị gián đoạn ngắt nguồn giữa đường.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_076', 'mcq', 'integration-qos',
    'Trong VDA 5050, thông tin chính nào được máy chủ gửi cho robot để di chuyển?',
    ARRAY['Danh sách các điểm mốc (Waypoints) tạo thành quỹ đạo đi (Order)', 'Mã nhị phân firmware hex', 'Giá trị điện áp pin', 'Tốc độ động cơ bước chi tiết'],
    ARRAY['Danh sách các điểm mốc (Waypoints) tạo thành quỹ đạo đi (Order)']::varchar[],
    'Máy chủ gửi lộ trình đích dưới dạng chuỗi các đỉnh node; robot tự chịu trách nhiệm lập lộ trình cục bộ di chuyển an toàn.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_077', 'mcq', 'integration-qos',
    'Để đo đạc hiệu suất hoạt động của toàn hạm đội robot trong tháng, chỉ số KPI nào được quan tâm nhất?',
    ARRAY['OEE (Hiệu suất thiết bị tổng thể) và Tỷ lệ sẵn sàng (Availability)', 'Số lượng sườn xung encoder đếm được', 'Dung lượng RAM tối đa sử dụng', 'Tần số xung PWM trung bình'],
    ARRAY['OEE (Hiệu suất thiết bị tổng thể) và Tỷ lệ sẵn sàng (Availability)']::varchar[],
    'KPI phản ánh hiệu quả sử dụng hạm đội robot AMR tối ưu hóa năng suất vận hành kho hàng.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_078', 'mcq', 'integration-qos',
    'Hệ thống quản lý hạm đội robot điều phối luồng giao thông ngã tư dựa trên mô hình thuật toán tìm đường nào?',
    ARRAY['Lập lịch đường đi tránh va chạm đa robot (MAPF - Multi-Agent Path Finding)', 'Dijkstra đơn thuần không thời gian', 'Canny Edge', 'RANSAC mặt phẳng'],
    ARRAY['Lập lịch đường đi tránh va chạm đa robot (MAPF - Multi-Agent Path Finding)']::varchar[],
    'MAPF lập lộ trình trong không gian-thời gian (space-time A*) bảo đảm các robot không chiếm trùng tọa độ ở cùng thời điểm.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_079', 'short-answer', 'integration-qos',
    'Điền tên giao thức giao tiếp tiêu chuẩn công nghiệp Đức cho hạm đội robot. (Viết hoa toàn bộ có khoảng trắng)',
    NULL,
    ARRAY['VDA 5050']::varchar[],
    'VDA 5050 là giao thức chuẩn.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_07'
  ),
  (
    'cs_robeng_q_080', 'short-answer', 'integration-qos',
    'Điền tên viết tắt tiếng Anh của bài toán lập đường đi tránh va chạm đa robot. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MAPF']::varchar[],
    'MAPF là Multi-Agent Path Finding.',
    6, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Tiêu chuẩn an toàn cơ khí máy móc quốc tế ISO 12100 (cs_robeng_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_081', 'mcq', 'safety-packaging',
    'Tiêu chuẩn ISO 12100 quy định phương pháp luận cốt lõi nào cho nhà thiết kế chế tạo máy?',
    ARRAY['Đánh giá rủi ro và giảm thiểu rủi ro an toàn hệ thống', 'Tính toán chọn đường kính lốp xe', 'Cách biên dịch mã nguồn C++', 'Cách lập cấu trúc tệp XML'],
    ARRAY['Đánh giá rủi ro và giảm thiểu rủi ro an toàn hệ thống']::varchar[],
    'ISO 12100 hướng dẫn quy trình xác định mối nguy, ước lượng rủi ro và áp dụng các biện pháp giảm thiểu.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_082', 'mcq', 'safety-packaging',
    'Bước đầu tiên và quan trọng nhất trong quy trình 3 bước giảm thiểu rủi ro của ISO 12100 là gì?',
    ARRAY['Thiết kế an toàn từ gốc (Inherently safe design) - loại bỏ mối nguy bằng thiết kế hình học lực học', 'Lắp rào chắn cơ học bên ngoài', 'Dán nhãn cảnh báo nguy hiểm màu vàng', 'Đào tạo kỹ sư sử dụng'],
    ARRAY['Thiết kế an toàn từ gốc (Inherently safe design) - loại bỏ mối nguy bằng thiết kế hình học lực học']::varchar[],
    'Loại bỏ mối nguy hiểm ngay từ bàn vẽ CAD (ví dụ: dùng góc bo tròn, khống chế lực động cơ nhỏ) là phương pháp bảo vệ triệt để nhất.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_083', 'mcq', 'safety-packaging',
    'Dán nhãn cảnh báo nguy hiểm (Safety signs) được xếp vào bước nào của quy trình giảm thiểu rủi ro?',
    ARRAY['Bước 3: Thông tin sử dụng và cảnh báo (Information for use) - biện pháp yếu nhất', 'Bước 1: Thiết kế an toàn từ gốc', 'Bước 2: Giải pháp bảo vệ kỹ thuật', 'Không thuộc quy trình'],
    ARRAY['Bước 3: Thông tin sử dụng và cảnh báo (Information for use) - biện pháp yếu nhất']::varchar[],
    'Cảnh báo chỉ có tác dụng nhắc nhở ý thức người dùng, không ngăn chặn vật lý hành vi va chạm nguy hiểm.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_084', 'mcq', 'safety-packaging',
    'Chứng nhận bắt buộc để robot được phép lưu hành thương mại hóa tại liên minh châu Âu là gì?',
    ARRAY['Chứng nhận CE (Conformité Européenne)', 'Chứng chỉ FCC', 'Chứng nhận FDA', 'Tiêu chuẩn UL của Mỹ'],
    ARRAY['Chứng nhận CE (Conformité Européenne)']::varchar[],
    'CE marking khẳng định robot đáp ứng mọi tiêu chuẩn chỉ thị an toàn máy móc cơ khí của châu Âu.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_085', 'mcq', 'safety-packaging',
    'Tại sao mạch an toàn (Safety circuits) trên robot thường bắt buộc dùng rơ-le an toàn kép (Safety Relays)?',
    ARRAY['Để bảo đảm mạch vẫn ngắt điện được kể cả khi có lỗi đơn xảy ra (ví dụ 1 tiếp điểm rơ-le bị dính cháy tiếp xúc)', 'Để tăng công suất sạc pin', 'Để giảm lượng điện năng tiêu thụ', 'Do quy luật từ trường dòng điện xoay chiều'],
    ARRAY['Để bảo đảm mạch vẫn ngắt điện được kể cả khi có lỗi đơn xảy ra (ví dụ 1 tiếp điểm rơ-le bị dính cháy tiếp xúc)']::varchar[],
    'Safety Relays có cấu trúc tiếp điểm dẫn động cưỡng bức (forcibly guided contacts) tự phát hiện dính tiếp điểm để ngắt kênh còn lại.',
    7, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_086', 'mcq', 'safety-packaging',
    'Cấp hiệu năng an toàn PL (Performance Level) quy định mức độ tin cậy từ PLa đến PLe. Cấp nào yêu cầu độ tin cậy an toàn cao nhất?',
    ARRAY['PLe', 'PLa', 'PLc', 'PLd'],
    ARRAY['PLe']::varchar[],
    'PLe tương ứng với xác suất xảy ra lỗi nguy hại cực thấp ($< 10^{-7}$ mỗi giờ), dùng cho ngắt phanh dừng khẩn cấp.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_087', 'mcq', 'safety-packaging',
    'Mục tiêu chính của bước đánh giá rủi ro (Risk Assessment) là gì?',
    ARRAY['Xác định các mối nguy hiểm cơ khí, điện, nhiệt và ước lượng mức độ nghiêm trọng chấn thương có thể xảy ra', 'Tính toán giá thành sản xuất robot', 'Tìm kiếm địa chỉ IP của thiết bị', 'Biên dịch code CMake'],
    ARRAY['Xác định các mối nguy hiểm cơ khí, điện, nhiệt và ước lượng mức độ nghiêm trọng chấn thương có thể xảy ra']::varchar[],
    'Đánh giá rủi ro cung cấp dữ liệu định lượng để kỹ sư lựa chọn biện pháp bảo vệ tương ứng.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_088', 'mcq', 'safety-packaging',
    'Khi robot hoạt động tự động trong lồng kính bảo vệ, cơ cấu chốt khóa an toàn cửa (Interlock switch) thực hiện nhiệm vụ gì?',
    ARRAY['Ngắt điện lập tức dừng robot khi cửa lồng bị mở ra ra ngoài ý muốn trong lúc robot đang chạy', 'Khóa chặt cửa không cho robot đi ra ngoài', 'Tự động sạc pin cho robot', 'Lọc nhiễu cảm biến'],
    ARRAY['Ngắt điện lập tức dừng robot khi cửa lồng bị mở ra ra ngoài ý muốn trong lúc robot đang chạy']::varchar[],
    'Interlock bảo vệ công nhân không vô tình bước vào vùng hoạt động tốc độ cao của robot công nghiệp.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_089', 'short-answer', 'safety-packaging',
    'Điền tên viết tắt tiếng Âu của chứng chỉ bắt buộc để thương mại hóa robot tại thị trường châu Âu. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CE']::varchar[],
    'CE marking là bắt buộc ở châu Âu.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_08'
  ),
  (
    'cs_robeng_q_090', 'short-answer', 'safety-packaging',
    'Điền mã số tiêu chuẩn quốc tế hướng dẫn đánh giá và giảm thiểu rủi ro máy móc. (Điền số)',
    NULL,
    ARRAY['12100']::varchar[],
    'ISO 12100 là tiêu chuẩn cốt lõi.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Đóng gói ROS2 Package chuyên nghiệp với CMake & package.xml (cs_robeng_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robeng_q_091', 'mcq', 'safety-packaging',
    'Tệp tin `package.xml` trong gói ROS2 package thực hiện vai trò gì?',
    ARRAY['Khai báo siêu dữ liệu metadata (tên package, phiên bản, tác giả) và liệt kê các thư viện phụ thuộc phụ thuộc', 'Viết chương trình điều khiển C++', 'Cấu hình ma trận Quaternion', 'Tải code lên Github'],
    ARRAY['Khai báo siêu dữ liệu metadata (tên package, phiên bản, tác giả) và liệt kê các thư viện phụ thuộc phụ thuộc']::varchar[],
    'package.xml giúp hệ thống ROS2 quản lý sự phụ thuộc và tự động cài đặt thư viện thiếu qua rosdep.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_092', 'mcq', 'safety-packaging',
    'Thành phần nào trong tệp `package.xml` khai báo thư viện cần thiết để build mã nguồn package?',
    ARRAY['`<build_depend>`', '`<exec_depend>`', '`<test_depend>`', '`<export>`'],
    ARRAY['`<build_depend>`']::varchar[],
    'build_depend chỉ định các gói cần thiết tại thời điểm biên dịch (compile-time dependencies).',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_093', 'mcq', 'safety-packaging',
    'Tệp `CMakeLists.txt` trong ROS2 package dùng để làm gì?',
    ARRAY['Hướng dẫn trình biên dịch cách biên dịch mã nguồn C++, liên kết thư viện và cài đặt tài nguyên mục tiêu', 'Đăng ký địa chỉ IP cho robot', 'Cấu hình mạng wifi', 'Lưu trữ bản đồ 2D SLAM'],
    ARRAY['Hướng dẫn trình biên dịch cách biên dịch mã nguồn C++, liên kết thư viện và cài đặt tài nguyên mục tiêu']::varchar[],
    'CMakeLists.txt định nghĩa các lệnh CMake tạo file thực thi node và build thư viện.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_094', 'mcq', 'safety-packaging',
    'Hệ thống công cụ biên dịch (build tool) tiêu chuẩn được dùng để build toàn bộ ROS2 workspace là gì?',
    ARRAY['colcon', 'cmake', 'make', 'gcc'],
    ARRAY['colcon']::varchar[],
    'colcon (collective construction) là build tool tối ưu kế thừa catkin của ROS1 để compile song song nhiều package.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_095', 'mcq', 'safety-packaging',
    'Hàm CMake nào trong ROS2 dùng để khai báo các gói thư viện ROS2 phụ thuộc phụ thuộc như rclcpp?',
    ARRAY['find_package(rclcpp REQUIRED)', 'add_executable()', 'ament_package()', 'target_link_libraries()'],
    ARRAY['find_package(rclcpp REQUIRED)']::varchar[],
    'find_package tìm kiếm file CMake cấu hình của gói rclcpp để nạp các header và đường dẫn link.',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_096', 'mcq', 'safety-packaging',
    'Hàm CMake cuối cùng bắt buộc phải gọi trong file CMakeLists.txt của một package ROS2 C++ là gì?',
    ARRAY['ament_package()', 'find_package()', 'project()', 'cmake_minimum_required()'],
    ARRAY['ament_package()']::varchar[],
    'ament_package() thực hiện xuất siêu dữ liệu và đăng ký package vào hệ thống quản lý ament của ROS2.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_097', 'mcq', 'safety-packaging',
    'Lệnh biên dịch nào giúp tự động tạo liên kết động (symlink) cho các file cấu hình launch Python mà không cần build lại khi sửa file?',
    ARRAY['colcon build --symlink-install', 'colcon build --packages-select', 'colcon test', 'colcon clean'],
    ARRAY['colcon build --symlink-install']::varchar[],
    'symlink-install giúp liên kết các tệp launch từ thư mục code gốc sang install workspace, tiết kiệm thời gian gỡ lỗi.',
    6, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_098', 'mcq', 'safety-packaging',
    'Thư mục nào trong cấu trúc gói ROS2 package C++ tiêu chuẩn chứa các tệp tiêu đề (.hpp)?',
    ARRAY['include', 'src', 'launch', 'config'],
    ARRAY['include']::varchar[],
    'include chứa cấu trúc cây tiêu đề khai báo lớp lớp; src chứa mã nguồn hiện thực hóa logic (.cpp).',
    5, 'Robotics Engineering', 'cs_robotics_engineering', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_099', 'short-answer', 'safety-packaging',
    'Điền tên công cụ dòng lệnh dùng để biên dịch workspace ROS2. (Viết thường)',
    NULL,
    ARRAY['colcon', 'colcon build']::varchar[],
    'colcon là công cụ build workspace.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_09'
  ),
  (
    'cs_robeng_q_100', 'short-answer', 'safety-packaging',
    'Điền tên tệp XML bắt buộc phải có trong mọi package ROS2 để mô tả metadata. (Viết thường có đuôi mở rộng)',
    NULL,
    ARRAY['package.xml']::varchar[],
    'package.xml khai báo phụ thuộc.',
    5, 'Robotics Engineering', 'cs_robotics_fundamentals', 13, 'cs_robeng_09'
  );

COMMIT;
