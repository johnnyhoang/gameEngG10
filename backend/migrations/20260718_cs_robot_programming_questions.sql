-- SQL migration to seed 100 question bank for cs_robot_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- Insert 100 questions linking to lessons and topics for cs_robot_programming (grade_tier = 13)
-- Format: id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id

-- ======================================================================================
-- BÀI GIẢNG 1: Hệ điều hành Robot (cs_rob_01) - Chuyên đề: robot-software-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_001', 'mcq', 'robot-software-architecture',
    'Cơ chế truyền thông tin nào trong ROS 2 phù hợp nhất để gửi lệnh tốc độ dạng liên tục (ví dụ: 50Hz) đến động cơ robot di động?',
    ARRAY['Topic (Publish/Subscribe)', 'Service (Request/Response)', 'Action (Goal/Feedback/Result)', 'Parameter Server']::varchar[],
    ARRAY['Topic (Publish/Subscribe)']::varchar[],
    'Topic hoạt động theo mô hình xuất bản/đăng ký bất đồng bộ không chặn, cực kỳ tối ưu cho việc truyền luồng dữ liệu liên tục với tần số cao như lệnh điều khiển `/cmd_vel`.',
    5, 'ROS 2 Documentation', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_002', 'mcq', 'robot-software-architecture',
    'Trong ROS 2, sự khác biệt cốt lõi giữa Service và Action là gì?',
    ARRAY['Service dùng cho các yêu cầu phản hồi nhanh tức thời; Action dùng cho các tác vụ tốn thời gian, hỗ trợ hủy bỏ (preemption) và phản hồi tiến độ (feedback)', 'Service sử dụng giao thức truyền tin UDP còn Action sử dụng TCP', 'Service chỉ chạy được trên C++ còn Action chỉ chạy được trên Python', 'Service cho phép nhiều Client kết nối đồng thời còn Action giới hạn duy nhất một Client']::varchar[],
    ARRAY['Service dùng cho các yêu cầu phản hồi nhanh tức thời; Action dùng cho các tác vụ tốn thời gian, hỗ trợ hủy bỏ (preemption) và phản hồi tiến độ (feedback)']::varchar[],
    'Action được xây dựng dựa trên các Topic và Service, được thiết kế chuyên biệt cho các tác vụ bất đồng bộ kéo dài (như dẫn đường robot) cần giám sát tiến độ và có thể hủy giữa chừng.',
    6, 'ROS 2 Design Principles', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_003', 'mcq', 'robot-software-architecture',
    'Lệnh CLI nào trong ROS 2 dùng để kiểm tra tần số gửi dữ liệu (tính bằng Hz) của một Topic cụ thể?',
    ARRAY['ros2 topic hz <topic_name>', 'ros2 topic echo <topic_name>', 'ros2 topic info <topic_name>', 'ros2 topic bw <topic_name>']::varchar[],
    ARRAY['ros2 topic hz <topic_name>']::varchar[],
    'Lệnh `ros2 topic hz` đo đạc và hiển thị tần số trung bình (hertz) các thông điệp được xuất bản lên topic đó.',
    5, 'ROS 2 CLI tools', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_004', 'mcq', 'robot-software-architecture',
    'Trong kiến trúc ROS 2, thành phần "DDS" (Data Distribution Service) đóng vai trò gì?',
    ARRAY['Cung cấp middleware giao tiếp tin cậy thời gian thực theo chuẩn công nghiệp dưới tầng truyền dẫn', 'Vẽ mô hình 3D cho robot mô phỏng', 'Tính toán ma trận động học ngược cho cánh tay robot', 'Biên dịch mã nguồn C++ thành file chạy hệ thống']::varchar[],
    ARRAY['Cung cấp middleware giao tiếp tin cậy thời gian thực theo chuẩn công nghiệp dưới tầng truyền dẫn']::varchar[],
    'ROS 2 sử dụng DDS làm tầng trung gian truyền thông điệp, mang lại khả năng phân tán thực sự (không cần ROS Master như ROS 1) và hỗ trợ chất lượng dịch vụ (QoS).',
    6, 'ROS 2 Design Principles', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_005', 'mcq', 'robot-software-architecture',
    'Chính sách QoS (Quality of Service) "Reliability" trong ROS 2 ở chế độ "Best Effort" có đặc điểm gì?',
    ARRAY['CSDL cố gắng truyền điệp nhanh nhất có thể và chấp nhận mất mát gói tin nếu mạng nghẽn', 'Đảm bảo thông điệp sẽ được gửi đến đích bằng mọi giá nhờ cơ chế gửi lại', 'Chỉ lưu trữ 1 thông điệp mới nhất trong hàng đợi', 'Tự động ngắt kết nối nếu phát hiện trễ mạng']::varchar[],
    ARRAY['CSDL cố gắng truyền điệp nhanh nhất có thể và chấp nhận mất mát gói tin nếu mạng nghẽn']::varchar[],
    'QoS Best Effort ưu tiên giảm thiểu độ trễ (latency), phù hợp cho việc truyền dữ liệu cảm biến tần số cao (như LiDAR, Camera) nơi dữ liệu cũ mất đi không quan trọng bằng dữ liệu mới nhất.',
    6, 'ROS 2 QoS Profile', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_006', 'mcq', 'robot-software-architecture',
    'Công cụ nào trong hệ sinh thái ROS 2 được dùng để trực quan hóa đồ họa cây liên kết các Nodes và Topics đang chạy?',
    ARRAY['rqt_graph', 'rviz2', 'gazebo', 'colcon']::varchar[],
    ARRAY['rqt_graph']::varchar[],
    'rqt_graph vẽ sơ đồ mạng lưới hoạt động của hệ thống, giúp kiểm tra xem các Node có subscribe và publish đúng Topic hay không.',
    5, 'ROS 2 Visualization Tools', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_007', 'mcq', 'robot-software-architecture',
    'Để chạy một file launch cấu hình khởi động đồng thời nhiều node trong ROS 2, ta dùng lệnh CLI nào?',
    ARRAY['ros2 launch <package_name> <launch_file>', 'ros2 run <package_name> <launch_file>', 'ros2 launch start <launch_file>', 'colcon build --launch <launch_file>']::varchar[],
    ARRAY['ros2 launch <package_name> <launch_file>']::varchar[],
    'Lệnh `ros2 launch` là cú pháp chuẩn để kích hoạt một kịch bản launch khởi chạy hệ thống robot.',
    5, 'ROS 2 CLI tools', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_008', 'mcq', 'robot-software-architecture',
    'Trong ROS 2 Node viết bằng Python, phương thức nào dùng để tạo ra một Timer gọi callback tuần hoàn sau một khoảng thời gian xác định?',
    ARRAY['self.create_timer(timer_period_sec, self.timer_callback)', 'self.add_timer_callback(timer_period_sec)', 'rclpy.timer.create(timer_period_sec, callback)', 'self.set_interval(timer_period_sec, self.timer_callback)']::varchar[],
    ARRAY['self.create_timer(timer_period_sec, self.timer_callback)']::varchar[],
    'Cú pháp chuẩn trong Python để tạo timer của Node ROS 2 là: `self.create_timer(period, callback)`.',
    6, 'rclpy API Reference', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_009', 'short-answer', 'robot-software-architecture',
    'Viết tên công cụ dòng lệnh (CLI) trong ROS 2 dùng để kiểm tra danh sách tất cả các Nodes hiện đang hoạt động trong mạng nội bộ. (Viết thường)',
    NULL,
    ARRAY['ros2 node list']::varchar[],
    'Lệnh `ros2 node list` trả về danh sách các Node đang chạy.',
    5, 'ROS 2 CLI tools', 'cs_robot_programming', 13, 'cs_rob_01'
  ),
  (
    'cs_rob_q_010', 'short-answer', 'robot-software-architecture',
    'Điền tên kiểu thông điệp chuẩn trong ROS 2 thường dùng để ra lệnh vận tốc dài và vận tốc góc cho robot bánh di động (ví dụ: /cmd_vel).',
    NULL,
    ARRAY['geometry_msgs/msg/Twist', 'geometry_msgs/Twist', 'Twist']::varchar[],
    'Thông điệp Twist định nghĩa vector vận tốc dài (linear) và vận tốc góc (angular) trong không gian 3D.',
    5, 'ROS 2 Interfaces', 'cs_robot_programming', 13, 'cs_rob_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Động học Robot & Hệ tọa độ (cs_rob_02) - Chuyên đề: robot-kinematics (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_011', 'mcq', 'robot-kinematics',
    'Bài toán Động học Nghịch (Inverse Kinematics) của cánh tay robot giải quyết yêu cầu gì?',
    ARRAY['Tính toán các góc khớp cần thiết để khâu tác động cuối đạt được tọa độ và hướng mục tiêu trong không gian', 'Tính toán vị trí của khâu tác động cuối dựa trên góc quay của các khớp đã biết', 'Tính toán lực kéo của động cơ cần thiết để nhấc vật thể', 'Xác định vận tốc di chuyển tối đa của robot dựa trên công suất pin'],
    ARRAY['Tính toán các góc khớp cần thiết để khâu tác động cuối đạt được tọa độ và hướng mục tiêu trong không gian']::varchar[],
    'Động học nghịch tính ngược lại góc các khớp từ vị trí khâu tác động cuối mong muốn, đây là bài toán phức tạp vì có thể có vô số nghiệm hoặc vô nghiệm.',
    6, 'Robot Modeling and Control', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_012', 'mcq', 'robot-kinematics',
    'Trong quy tắc thiết lập tham số Denavit-Hartenberg (D-H parameters), bốn tham số nào được dùng để mô tả mối quan hệ giữa hai khớp kế tiếp?',
    ARRAY['d (joint offset), theta (joint angle), a (link length), alpha (link twist)', 'x, y, z, roll, pitch, yaw', 'momen quán tính, khối lượng, ma sát, gia tốc', 'khóa chính, khóa ngoại, góc quay, độ dài'],
    ARRAY['d (joint offset), theta (joint angle), a (link length), alpha (link twist)']::varchar[],
    'Quy tắc D-H sử dụng đúng 4 tham số hình học đặc trưng: khoảng cách khớp d, góc khớp theta, độ dài thanh liên kết a, và góc xoắn thanh liên kết alpha để chuyển đổi hệ tọa độ.',
    6, 'Robot Modeling and Control', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_013', 'mcq', 'robot-kinematics',
    'Hệ tọa độ (frame) nào trong chuẩn ROS đại diện cho hệ tọa độ toàn cục không đổi theo thời gian thực tế, được cố định tại vị trí bản đồ?',
    ARRAY['map', 'odom', 'base_link', 'world']::varchar[],
    ARRAY['map']::varchar[],
    'Theo REP 105, frame `map` là hệ tọa độ cố định đại diện cho bản đồ thế giới 2D/3D của robot, không bị trôi theo thời gian.',
    5, 'ROS REP 105', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_014', 'mcq', 'robot-kinematics',
    'Tại sao vị trí ước lượng của robot trong hệ tọa độ tích lũy `odom` bị sai lệch (trôi - drift) dần theo thời gian khi robot di chuyển lâu?',
    ARRAY['Do tích lũy các sai số nhỏ từ cảm biến Odometry bánh xe (như trượt bánh, sai lệch đường kính bánh) qua phép tích phân liên tục', 'Do hệ tọa độ odom liên tục xoay ngược chiều kim đồng hồ', 'Do lực hấp dẫn của Trái Đất tác động lên cảm biến IMU', 'Do hệ điều hành ROS 2 tự động làm tròn số nguyên dữ liệu'],
    ARRAY['Do tích lũy các sai số nhỏ từ cảm biến Odometry bánh xe (như trượt bánh, sai lệch đường kính bánh) qua phép tích phân liên tục']::varchar[],
    'Định vị dựa trên Odometry (Dead Reckoning) tích hợp sai số vận tốc để tính vị trí. Theo thời gian, các sai số nhỏ này tích lũy lại làm vị trí ước lượng bị lệch xa vị trí thực (drift).',
    6, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_015', 'mcq', 'robot-kinematics',
    'Cấu trúc cây TF (Transform Tree) trong ROS 2 quy định ràng buộc nào sau đây về mối quan hệ giữa các hệ tọa độ (frames)?',
    ARRAY['Mỗi frame chỉ được phép có tối đa một frame cha', 'Mỗi frame bắt buộc phải có tối thiểu hai frame cha', 'Cây TF bắt buộc phải có dạng vòng khép kín', 'Tất cả các frame phải liên kết trực tiếp vào map frame'],
    ARRAY['Mỗi frame chỉ được phép có tối đa một frame cha']::varchar[],
    'Cây TF là cấu trúc hình cây (directed acyclic graph). Để phép tính biến đổi tọa độ duy nhất và không bị lặp vô hạn, mỗi hệ tọa độ chỉ được có duy nhất 1 cha.',
    6, 'TF2 Documentation', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_016', 'mcq', 'robot-kinematics',
    'Lệnh CLI nào sau đây dùng để hiển thị sơ đồ PDF cây tọa độ TF đang hoạt động của robot?',
    ARRAY['ros2 run tf2_tools view_frames', 'ros2 topic echo /tf', 'ros2 run tf2_monitor tf2', 'ros2 launch tf2_tools tf_view'],
    ARRAY['ros2 run tf2_tools view_frames']::varchar[],
    'Công cụ `view_frames` lắng nghe dữ liệu biến đổi tọa độ và kết xuất thành tệp tin sơ đồ trực quan.',
    5, 'TF2 Documentation', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_017', 'mcq', 'robot-kinematics',
    'Trong hệ thống robot, ma trận Jacobian ($J$) được dùng để thiết lập mối quan hệ giữa hai đại lượng nào?',
    ARRAY['Vận tốc khớp của cánh tay robot và vận tốc tuyến tính/góc của khâu tác động cuối', 'Góc khớp và lực kéo của động cơ', 'Khối lượng robot và gia tốc trọng trường', 'Tọa độ GPS và vị trí tương đối trên bản đồ'],
    ARRAY['Vận tốc khớp của cánh tay robot và vận tốc tuyến tính/góc của khâu tác động cuối']::varchar[],
    'Ma trận Jacobian thiết lập ánh xạ tuyến tính từ không gian vận tốc khớp ($\dot{q}$) sang không gian vận tốc đề-các ($v$) của khâu tác động cuối: $v = J(q)\dot{q}$.',
    7, 'Robot Modeling and Control', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_018', 'mcq', 'robot-kinematics',
    'Khái niệm "Singularity" (Điểm kỳ dị) của cánh tay máy robot nói về trạng thái nào?',
    ARRAY['Trạng thái robot bị mất một hoặc nhiều bậc tự do chuyển động do cấu hình khớp xếp hàng thẳng hàng, làm ma trận Jacobian bị suy biến (định thức bằng 0)', 'Trạng thái robot bị quá nhiệt động cơ do hoạt động quá công suất', 'Điểm mà robot đạt vận tốc di chuyển lớn nhất', 'Khi cảm biến LiDAR bị che khuất hoàn toàn bởi vật cản'],
    ARRAY['Trạng thái robot bị mất một hoặc nhiều bậc tự do chuyển động do cấu hình khớp xếp hàng thẳng hàng, làm ma trận Jacobian bị suy biến (định thức bằng 0)']::varchar[],
    'Tại điểm kỳ dị (Singularity), định thức của Jacobian bằng 0. Robot mất khả năng di chuyển theo một số hướng nhất định, và thuật toán động học nghịch có thể tính ra vận tốc khớp tiến tới vô hạn, gây giật hoặc lỗi robot.',
    7, 'Robot Modeling and Control', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_019', 'short-answer', 'robot-kinematics',
    'Để biểu diễn hướng của robot trong không gian 3D tránh được hiện tượng khóa trục (Gimbal Lock) của hệ góc Euler, ROS 2 sử dụng cấu trúc toán học gồm 4 chiều (x, y, z, w). Viết tên tiếng Anh của cấu trúc toán học này. (Viết thường)',
    NULL,
    ARRAY['quaternion']::varchar[],
    'Quaternion gồm 4 phần tử giúp biểu diễn phép xoay 3D mượt mà và tránh được hiện tượng Gimbal Lock.',
    5, 'Robot Modeling and Control', 'cs_robot_programming', 13, 'cs_rob_02'
  ),
  (
    'cs_rob_q_020', 'short-answer', 'robot-kinematics',
    'Trong hệ thống tọa độ của robot di động bánh xe, hệ tọa độ gắn cố định tại tâm vật lý di chuyển của robot được gọi là gì? (Điền tên viết thường theo chuẩn ROS)',
    NULL,
    ARRAY['base_link', 'base link']::varchar[],
    'Hệ tọa độ base_link đặt tại tâm vật lý, làm mốc cho mọi cảm biến và bánh xe liên kết.',
    5, 'ROS REP 105', 'cs_robot_programming', 13, 'cs_rob_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Lập trình Điều khiển Động cơ & PID (cs_rob_03) - Chuyên đề: robot-kinematics (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_021', 'mcq', 'robot-control',
    'Khâu Proportional (K_p - khâu tỉ lệ) trong bộ điều khiển PID có vai trò chính là gì?',
    ARRAY['Tạo tín hiệu điều khiển tỉ lệ thuận với sai số hiện tại để kéo nhanh hệ thống về giá trị đặt', 'Triệt tiêu hoàn toàn sai số xác lập của hệ thống', 'Dự báo xu hướng sai số tương lai để giảm dao động', 'Lọc bỏ nhiễu tần số cao của cảm biến encoder'],
    ARRAY['Tạo tín hiệu điều khiển tỉ lệ thuận với sai số hiện tại để kéo nhanh hệ thống về giá trị đặt']::varchar[],
    'Khâu P nhân trực tiếp với sai số hiện tại. Khâu P càng lớn thì phản ứng của robot càng mạnh mẽ và nhanh chóng, nhưng nếu quá lớn sẽ gây vọt lố và mất ổn định.',
    5, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_022', 'mcq', 'robot-control',
    'Khi bánh xe robot di động bị kẹt cứng (không thể quay) do vướng chướng ngại vật lớn, hiện tượng "Integral Windup" trong bộ điều khiển PID sẽ dẫn đến hậu quả gì?',
    ARRAY['Khâu I liên tục tích lũy sai số theo thời gian làm tín hiệu điều khiển tăng vọt đến mức tối đa, và sau khi vật cản biến mất, robot sẽ bị vọt lố dữ dội và mất kiểm soát', 'Bộ điều khiển PID tự động tắt để bảo vệ động cơ', 'Khâu D tự động triệt tiêu tín hiệu điều khiển về 0', 'Số xung đọc được từ Encoder tăng vọt bất thường'],
    ARRAY['Khâu I liên tục tích lũy sai số theo thời gian làm tín hiệu điều khiển tăng vọt đến mức tối đa, và sau khi vật cản biến mất, robot sẽ bị vọt lố dữ dội và mất kiểm soát']::varchar[],
    'Integral Windup xảy ra khi khâu tích phân tích lũy sai số quá lớn do cơ cấu chấp hành bị bão hòa. Robot sẽ tiếp tục quay bánh xe điên cuồng ngay cả khi đã vượt qua vật cản cho đến khi khâu tích phân xả hết sai số.',
    7, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_023', 'mcq', 'robot-control',
    'Khâu Derivative (K_d - khâu vi phân) trong PID giúp cải thiện đặc tính nào của chuyển động robot?',
    ARRAY['Giảm độ dao động và làm mịn chuyển động bằng cách hãm tốc khi tiến gần đến giá trị đặt', 'Triệt tiêu sai số tĩnh khi hệ thống đã ổn định', 'Tăng mô-men xoắn của động cơ ở vận tốc thấp', 'Tự động hiệu chuẩn số xung của Encoder'],
    ARRAY['Giảm độ dao động và làm mịn chuyển động bằng cách hãm tốc khi tiến gần đến giá trị đặt']::varchar[],
    'Khâu D phản ứng với tốc độ thay đổi sai số. Khi robot tiến gần đến đích (sai số giảm nhanh), khâu D tạo lực cản (dampening) giúp robot dừng lại êm ái, tránh dao động quanh đích.',
    6, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_024', 'mcq', 'robot-control',
    'Phương pháp điều xung PWM (Pulse Width Modulation) dùng để điều khiển tốc độ động cơ DC hoạt động dựa trên nguyên lý nào?',
    ARRAY['Thay đổi độ rộng của xung điện áp cấp cho động cơ (duty cycle) để thay đổi điện áp trung bình', 'Thay đổi tần số của dòng điện xoay chiều cấp cho động cơ', 'Thay đổi giá trị điện áp một chiều liên tục bằng biến trở', 'Thay đổi số lượng cực từ bên trong động cơ'],
    ARRAY['Thay đổi độ rộng của xung điện áp cấp cho động cơ (duty cycle) để thay đổi điện áp trung bình']::varchar[],
    'PWM bật tắt điện áp cực nhanh. Điện áp trung bình cấp cho động cơ tỉ lệ thuận với thời gian bật (On) so với chu kỳ xung, gọi là Duty Cycle.',
    5, 'Embedded Systems Fundamentals', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_025', 'mcq', 'robot-control',
    'Khâu Integral (K_i - khâu tích phân) trong PID có tác dụng chính là gì?',
    ARRAY['Tích lũy sai số quá khứ để triệt tiêu hoàn toàn sai số xác lập (steady-state error)', 'Tạo lực cản giảm chấn cho robot', 'Tăng tốc độ phản ứng ban đầu của robot', 'Đồng bộ hóa tốc độ giữa hai bánh xe'],
    ARRAY['Tích lũy sai số quá khứ để triệt tiêu hoàn toàn sai số xác lập (steady-state error)']::varchar[],
    'Khâu I cộng dồn các sai số nhỏ tích lũy theo thời gian. Ngay cả khi sai số nhỏ, khâu I vẫn tiếp tục tăng lực đẩy lên để đưa robot đạt chính xác giá trị cài đặt.',
    6, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_026', 'mcq', 'robot-control',
    'Quy trình tinh chỉnh tham số PID thủ công bằng thực nghiệm cho bánh xe robot nên tuân theo thứ tự nào?',
    ARRAY['Tăng Kp trước để đạt tốc độ nhanh, thêm Kd để giảm dao động vọt lố, cuối cùng thêm Ki để triệt tiêu sai số tĩnh', 'Tăng Ki trước để triệt tiêu sai số tĩnh, thêm Kp và Kd sau', 'Tinh chỉnh Kd trước, rồi đến Ki và Kp', 'Đặt cả ba tham số bằng nhau rồi giảm dần'],
    ARRAY['Tăng Kp trước để đạt tốc độ nhanh, thêm Kd để giảm dao động vọt lố, cuối cùng thêm Ki để triệt tiêu sai số tĩnh']::varchar[],
    'Thứ tự chuẩn giúp kiểm soát hệ thống dễ dàng: P kéo tốc độ nhanh, D làm êm chuyển động, I xử lý phần sai lệch nhỏ còn sót lại.',
    6, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_027', 'mcq', 'robot-control',
    'Tại sao sai số xác lập (steady-state error) vẫn tồn tại nếu ta chỉ sử dụng bộ điều khiển P đơn thuần cho vị trí robot?',
    ARRAY['Vì khi sai số rất nhỏ, lực đẩy sinh ra từ khâu P không đủ lớn để thắng lực ma sát tĩnh của robot, khiến robot dừng lại trước khi tới đích', 'Vì khâu P làm hệ thống bị trễ pha', 'Vì khâu P tự động triệt tiêu tín hiệu điều khiển khi gặp ma sát', 'Vì encoder bánh xe không thể đọc được vận tốc nhỏ'],
    ARRAY['Vì khi sai số rất nhỏ, lực đẩy sinh ra từ khâu P không đủ lớn để thắng lực ma sát tĩnh của robot, khiến robot dừng lại trước khi tới đích']::varchar[],
    'Khi robot tiến sát đích, sai số $e(t)$ tiến dần về 0, làm đầu ra $Kp \times e(t)$ quá nhỏ không đủ thắng ma sát cơ học, robot dừng hẳn khi chưa tới đích.',
    7, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_028', 'mcq', 'robot-control',
    'Tần số điều khiển (control loop frequency) của bộ điều khiển PID động cơ robot thông thường nên đạt tối thiểu bao nhiêu?',
    ARRAY['Từ 50Hz đến 200Hz để phản hồi kịp thời các thay đổi vật lý', 'Chỉ cần 1Hz để tiết kiệm CPU của vi điều khiển', 'Từ 10kHz đến 50kHz', 'Không quan trọng, chạy nhanh hay chậm đều được'],
    ARRAY['Từ 50Hz đến 200Hz để phản hồi kịp thời các thay đổi vật lý']::varchar[],
    'Tần số quá thấp khiến hệ thống phản hồi trễ, gây giật lắc và mất kiểm soát chuyển động.',
    6, 'Embedded Control Systems', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_029', 'short-answer', 'robot-control',
    'Viết tên tiếng Anh viết tắt của kỹ thuật điều chế độ rộng xung điện áp được dùng để điều chỉnh vận tốc động cơ DC (viết hoa).',
    NULL,
    ARRAY['PWM']::varchar[],
    'PWM (Pulse Width Modulation) là phương pháp điều tốc phổ biến nhất cho động cơ DC.',
    5, 'Embedded Systems Fundamentals', 'cs_robot_programming', 13, 'cs_rob_03'
  ),
  (
    'cs_rob_q_030', 'short-answer', 'robot-control',
    'Trong công thức tính bộ điều khiển PID tương tự, khâu nào thực hiện phép lấy đạo hàm sai số theo thời gian để dự báo xu hướng tương lai? (Viết chữ cái đại diện)',
    NULL,
    ARRAY['D']::varchar[],
    'Khâu D (Derivative) tính đạo hàm tốc độ thay đổi sai số để tạo lực cản hãm.',
    5, 'Control Systems Engineering', 'cs_robot_programming', 13, 'cs_rob_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Tích hợp Cảm biến & Đọc dữ liệu (cs_rob_04) - Chuyên đề: robot-perception (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_031', 'mcq', 'robot-perception',
    'Thông điệp chuẩn `sensor_msgs/msg/LaserScan` của ROS 2 chứa dữ liệu của cảm biến nào?',
    ARRAY['LiDAR 2D', 'IMU (cảm biến quán tính)', 'Odometry bánh xe', 'Camera RGB'],
    ARRAY['LiDAR 2D']::varchar[],
    'Thông điệp LaserScan lưu mảng dữ liệu khoảng cách quét của LiDAR 2D theo từng góc quét nhất định.',
    5, 'ROS 2 Interfaces', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_032', 'mcq', 'robot-perception',
    'Cảm biến IMU (Inertial Measurement Unit) tích hợp trên robot đo đạc các đại lượng vật lý nào?',
    ARRAY['Gia tốc tuyến tính và vận tốc góc của thân robot', 'Vận tốc bánh xe và số vòng quay của động cơ', 'Khoảng cách từ robot tới chướng ngại vật gần nhất', 'Góc quay tuyệt đối của bánh xe'],
    ARRAY['Gia tốc tuyến tính và vận tốc góc của thân robot']::varchar[],
    'IMU sử dụng gia tốc kế (Accelerometer) để đo gia tốc và con quay hồi chuyển (Gyroscope) để đo vận tốc góc xung quanh 3 trục.',
    5, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_033', 'mcq', 'robot-perception',
    'Tại sao gói `robot_localization` thường dùng thuật toán Extended Kalman Filter (EKF) để dung hợp (fuse) dữ liệu Odometry bánh xe và IMU?',
    ARRAY['Để tận dụng thế mạnh của cả hai cảm biến: Odometry trơn tru ở tốc độ thấp, IMU đo gia tốc góc nhạy bén, giúp giảm sai số định vị lũy tiến', 'Để chuyển dữ liệu ảnh camera thành dạng 2D', 'Để tiết kiệm pin cho động cơ của robot', 'Để vẽ bản đồ phòng học tự động'],
    ARRAY['Để tận dụng thế mạnh của cả hai cảm biến: Odometry trơn tru ở tốc độ thấp, IMU đo gia tốc góc nhạy bén, giúp giảm sai số định vị lũy tiến']::varchar[],
    'Dung hợp cảm biến (Sensor Fusion) bằng EKF bù trừ khuyết điểm của các cảm biến đơn lẻ, đem lại ước lượng trạng thái robot chính xác hơn.',
    6, 'robot_localization Documentation', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_034', 'mcq', 'robot-perception',
    'Trường dữ liệu `ranges` (mảng số thực) trong thông điệp LaserScan biểu diễn thông tin gì?',
    ARRAY['Mảng khoảng cách đo được từ tâm phát đến vật cản tại mỗi góc quét cụ thể', 'Tốc độ quay của cảm biến LiDAR', 'Danh sách các hệ tọa độ liên kết với cảm biến', 'Cường độ phản xạ ánh sáng của bề mặt vật cản'],
    ARRAY['Mảng khoảng cách đo được từ tâm phát đến vật cản tại mỗi góc quét cụ thể']::varchar[],
    'Mảng `ranges` chứa các khoảng cách đo (tính bằng mét). Giá trị bằng hoặc vượt quá ngưỡng quét tối đa/tối thiểu đại diện cho vùng trống không có vật cản.',
    5, 'ROS 2 Interfaces', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_035', 'mcq', 'robot-perception',
    'Hiện tượng "slippage" (trượt bánh xe) gây ra tác hại gì cho hệ thống định vị của robot?',
    ARRAY['Lập tức làm sai lệch dữ liệu ước lượng vị trí Odometry tính từ encoder bánh xe', 'Làm hỏng cảm biến LiDAR của robot', 'Khiến camera của robot không thể lấy nét', 'Bộ lọc Kalman tự động bị ngắt kết nối'],
    ARRAY['Lập tức làm sai lệch dữ liệu ước lượng vị trí Odometry tính từ encoder bánh xe']::varchar[],
    'Nếu bánh xe quay nhưng robot bị trượt tại chỗ, encoder vẫn đếm xung và báo robot di chuyển, dẫn đến định vị Odometry sai lệch nghiêm trọng so với thực tế.',
    6, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_036', 'mcq', 'robot-perception',
    'Trong cấu trúc thông điệp IMU (`sensor_msgs/msg/Imu`), trường dữ liệu nào lưu trữ ma trận thể hiện độ tin cậy/sai số của cảm biến?',
    ARRAY['Ma trận hiệp phương sai (covariance matrix)', 'Ma trận xoay Quaternion', 'Mảng gia tốc tuyến tính', 'Vector vận tốc góc'],
    ARRAY['Ma trận hiệp phương sai (covariance matrix)']::varchar[],
    'Ma trận hiệp phương sai (`orientation_covariance`, `angular_velocity_covariance`, `linear_acceleration_covariance`) chỉ ra mức độ nhiễu của cảm biến, làm cơ sở cho bộ lọc Kalman tính toán trọng số lọc.',
    7, 'ROS 2 Interfaces', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_037', 'mcq', 'robot-perception',
    'Khi cấu hình robot_localization cho robot bánh xe, tại sao việc đo đạc và nhập thông số ma trận hiệp phương sai sai lệch ban đầu cực kỳ quan trọng?',
    ARRAY['Nếu nhập sai số nhiễu quá nhỏ so với thực tế, bộ lọc Kalman sẽ quá tin tưởng cảm biến đó và tính toán sai lệch vị trí', 'Hệ thống ROS 2 sẽ báo lỗi biên dịch', 'Khiến robot không thể kết nối được với động cơ', 'Làm giảm tốc độ mạng Wifi của robot'],
    ARRAY['Nếu nhập sai số nhiễu quá nhỏ so với thực tế, bộ lọc Kalman sẽ quá tin tưởng cảm biến đó và tính toán sai lệch vị trí']::varchar[],
    'Hiệp phương sai quyết định hệ số Kalman gain (trọng số dung hợp). Cấu hình sai số quá nhỏ làm bộ lọc bỏ qua các cảm biến chính xác khác.',
    7, 'robot_localization Documentation', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_038', 'mcq', 'robot-perception',
    'Cảm biến khoảng cách siêu âm (Ultrasonic Sensor) đo khoảng cách dựa trên nguyên lý nào?',
    ARRAY['Đo thời gian phản hồi của sóng âm phát ra từ cảm biến và dội lại khi gặp vật cản (Time-of-Flight)', 'Đo cường độ phản xạ ánh sáng hồng ngoại từ vật thể', 'Đo sự thay đổi từ trường xung quanh cảm biến', 'Tính toán ma trận dòng quang học (Optical Flow) trên ảnh'],
    ARRAY['Đo thời gian phản hồi của sóng âm phát ra từ cảm biến và dội lại khi gặp vật cản (Time-of-Flight)']::varchar[],
    'Sóng siêu âm phát ra và dội lại. Đo thời gian bay (Time-of-Flight) nhân với vận tốc âm thanh trong không khí chia đôi sẽ ra khoảng cách.',
    5, 'Sensors and Transducers', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_039', 'short-answer', 'robot-perception',
    'Điền từ tiếng Anh viết tắt của bộ lọc Kalman mở rộng dùng để dung hợp dữ liệu cảm biến robotics (viết hoa).',
    NULL,
    ARRAY['EKF']::varchar[],
    'EKF (Extended Kalman Filter) được dùng để xử lý phi tuyến tính trong ước lượng trạng thái robot.',
    5, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_04'
  ),
  (
    'cs_rob_q_040', 'short-answer', 'robot-perception',
    'Trong thông điệp `sensor_msgs/msg/LaserScan`, tham số quy định khoảng cách tối đa (mét) mà LiDAR có thể đo được một cách tin cậy được lưu trong cột tên là gì? (Điền tên biến dạng: range_...)',
    NULL,
    ARRAY['range_max']::varchar[],
    'Biến `range_max` định nghĩa giới hạn quét tối đa của cảm biến LiDAR.',
    6, 'ROS 2 Interfaces', 'cs_robot_programming', 13, 'cs_rob_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Bản đồ hóa SLAM & Định vị AMCL (cs_rob_05) - Chuyên đề: robot-perception (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_041', 'mcq', 'robot-perception',
    'Thuật toán định vị AMCL (Adaptive Monte Carlo Localization) hoạt động dựa trên bộ lọc nào sau đây?',
    ARRAY['Bộ lọc hạt (Particle Filter)', 'Bộ lọc Kalman tuyến tính (Kalman Filter)', 'Bộ lọc trung vị (Median Filter)', 'Bộ lọc thông thấp (Low-pass Filter)'],
    ARRAY['Bộ lọc hạt (Particle Filter)']::varchar[],
    'AMCL rải hàng ngàn hạt giả định vị trí của robot trên bản đồ. Mỗi hạt di chuyển theo Odometry và được cập nhật trọng số dựa trên dữ liệu quét thực tế của LiDAR (Particle Filter).',
    6, 'Probabilistic Robotics', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_042', 'mcq', 'robot-perception',
    'Bản đồ lưới dạng Occupancy Grid Map dùng trong định vị robot biểu diễn môi trường như thế nào?',
    ARRAY['Chia môi trường thành lưới các ô vuông, mỗi ô chứa giá trị xác suất thể hiện ô đó trống, có vật cản hoặc chưa biết', 'Lưu tọa độ các điểm 3D trong không gian dạng Point Cloud', 'Vẽ các đường vector liên kết các điểm mốc hình học', 'Lưu trữ tệp ảnh vệ tinh độ phân giải cao'],
    ARRAY['Chia môi trường thành lưới các ô vuông, mỗi ô chứa giá trị xác suất thể hiện ô đó trống, có vật cản hoặc chưa biết']::varchar[],
    'Occupancy Grid Map lưu giá trị từ 0 (hoàn toàn trống) đến 100 (vật cản cứng) và -1 (vùng chưa thám hiểm/chưa biết).',
    5, 'Probabilistic Robotics', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_043', 'mcq', 'robot-perception',
    'Hiện tượng "Kidnapped Robot Problem" (Robot bị bắt cóc) trong định vị robot là gì?',
    ARRAY['Trạng thái robot đột ngột bị dịch chuyển sang vị trí mới và phải tự định vị lại từ đầu mà không có thông tin vị trí ban đầu', 'Khi robot bị hacker chiếm quyền điều khiển qua mạng', 'Khi robot bị kẹt động cơ không thể di chuyển', 'Khi cảm biến LiDAR bị hỏng phần cứng đột ngột'],
    ARRAY['Trạng thái robot đột ngột bị dịch chuyển sang vị trí mới và phải tự định vị lại từ đầu mà không có thông tin vị trí ban đầu']::varchar[],
    'Đây là bài toán thử thách khả năng định vị toàn cục (Global Localization) của AMCL khi vị trí ban đầu của robot bị sai lệch hoàn toàn so với thực tế.',
    6, 'Probabilistic Robotics', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_044', 'mcq', 'robot-perception',
    'Trong thuật toán SLAM, kỹ thuật "Loop Closure" (Khép vòng lặp) đóng vai trò gì?',
    ARRAY['Phát hiện khi robot quay lại một vị trí đã đi qua trước đó để tối ưu hóa và sửa chữa sai số tích lũy của toàn bộ bản đồ', 'Tạo ra vòng lặp chạy liên tục cho câu lệnh điều khiển động cơ', 'Ngăn không cho robot đi vào ngõ cụt', 'Tự động đóng cổng kết nối TCP khi hoàn thành bản đồ'],
    ARRAY['Phát hiện khi robot quay lại một vị trí đã đi qua trước đó để tối ưu hóa và sửa chữa sai số tích lũy của toàn bộ bản đồ']::varchar[],
    'Khi nhận ra địa điểm quen thuộc, SLAM liên kết tọa độ cũ và mới, kéo dãn và căn chỉnh lại các vùng bản đồ bị lệch do sai số trôi cảm biến trước đó.',
    7, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_045', 'mcq', 'robot-perception',
    'Tại sao thuật toán SLAM Cartographer (do Google phát triển) lại hoạt động hiệu quả hơn một số thư viện SLAM cũ?',
    ARRAY['Sử dụng tối ưu hóa đồ thị (Graph-based SLAM) kết hợp quét khớp đám mây điểm (Submap) thời gian thực hiệu năng cao', 'Không cần sử dụng dữ liệu LiDAR đầu vào', 'Tự động chạy song song trên nền tảng Cloud', 'Chỉ chạy được trên hệ điều hành Windows'],
    ARRAY['Sử dụng tối ưu hóa đồ thị (Graph-based SLAM) kết hợp quét khớp đám mây điểm (Submap) thời gian thực hiệu năng cao']::varchar[],
    'Cartographer chia nhỏ bản đồ thành các submaps và liên tục chạy tối ưu hóa đồ thị (pose graph optimization) ở background để khép vòng lặp cực kỳ chính xác.',
    7, 'Google Cartographer Documentation', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_046', 'mcq', 'robot-perception',
    'Khi rải các hạt định vị trong AMCL, các hạt có đặc điểm nào sẽ bị bộ lọc loại bỏ dần ở các chu kỳ sau?',
    ARRAY['Các hạt có dữ liệu quét giả định không trùng khớp với dữ liệu cảm biến LiDAR thực tế', 'Các hạt di chuyển nhanh hơn tốc độ của robot', 'Các hạt nằm ở trung tâm cây TF', 'Các hạt có ma trận hiệp phương sai bằng 0'],
    ARRAY['Các hạt có dữ liệu quét giả định không trùng khớp với dữ liệu cảm biến LiDAR thực tế']::varchar[],
    'Những hạt có mô tả tia laser quét đụng tường mà thực tế LiDAR đo được là trống sẽ nhận trọng số thấp (low weight) và bị đào thải trong quá trình chọn lọc lại (resampling).',
    6, 'Probabilistic Robotics', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_047', 'mcq', 'robot-perception',
    'Độ phân giải (resolution) của một bản đồ Occupancy Grid Map thông thường (ví dụ: resolution = 0.05) có nghĩa là gì?',
    ARRAY['Mỗi ô lưới trên bản đồ đại diện cho một ô vuông kích thước vật lý là 0.05m x 0.05m (5cm x 5cm) thực tế', 'Bản đồ chỉ có 5% số ô chứa vật cản', 'Tần số cập nhật bản đồ là 0.05 giây một lần', 'Sai số định vị tối đa của robot là 5%'],
    ARRAY['Mỗi ô lưới trên bản đồ đại diện cho một ô vuông kích thước vật lý là 0.05m x 0.05m (5cm x 5cm) thực tế']::varchar[],
    'Resolution quy định kích thước thực tế của mỗi điểm ảnh (pixel/cell) trên bản đồ lưới.',
    5, 'ROS 2 Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_048', 'mcq', 'robot-perception',
    'Trong AMCL, khi tất cả các hạt giả định định vị đã hội tụ lại thành một cụm duy nhất bao quanh vị trí robot thật trên RViz, điều này chứng tỏ điều gì?',
    ARRAY['Hệ thống định vị đã xác định được vị trí của robot với độ tin cậy rất cao', 'Hệ thống định vị đã bị lỗi hoàn toàn', 'Bản đồ của robot bị mất dữ liệu', 'Robot đã đi vào điểm kỳ dị cơ học'],
    ARRAY['Hệ thống định vị đã xác định được vị trí của robot với độ tin cậy rất cao']::varchar[],
    'Sự hội tụ các hạt chứng minh dữ liệu cảm biến hiện tại khớp hoàn hảo với duy nhất một vùng tọa độ trên bản đồ.',
    5, 'Probabilistic Robotics', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_049', 'short-answer', 'robot-perception',
    'Điền từ tiếng Anh viết tắt của bài toán đồng thời định vị và xây dựng bản đồ trong Robotics (viết hoa).',
    NULL,
    ARRAY['SLAM']::varchar[],
    'SLAM (Simultaneous Localization and Mapping) là bài toán nền tảng của robot tự hành.',
    5, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_05'
  ),
  (
    'cs_rob_q_050', 'short-answer', 'robot-perception',
    'Trong Occupancy Grid Map của ROS 2, giá trị số nguyên nào được dùng để biểu diễn các ô lưới thuộc vùng chưa được thám hiểm/chưa có dữ liệu cảm biến quét tới? (Điền số âm)',
    NULL,
    ARRAY['-1']::varchar[],
    'Giá trị -1 đại diện cho các ô vô định (unknown) trên bản đồ.',
    5, 'ROS 2 Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Lập kế hoạch đường đi & Điều hướng (cs_rob_06) - Chuyên đề: robot-navigation (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_051', 'mcq', 'robot-navigation',
    'Trong hệ điều hành ROS 2 Nav2 stack, nhiệm vụ chính của "Global Planner" là gì?',
    ARRAY['Tính toán đường đi tối ưu không va chạm từ vị trí hiện tại đến đích dựa trên bản đồ tĩnh', 'Tính toán lệnh vận tốc cmd_vel thời gian thực để né tránh vật cản động', 'Dung hợp dữ liệu IMU và Odometry', 'Điều khiển góc quay của khớp tay máy'],
    ARRAY['Tính toán đường đi tối ưu không va chạm từ vị trí hiện tại đến đích dựa trên bản đồ tĩnh']::varchar[],
    'Global Planner tìm kiếm đường đi lý thuyết ngắn nhất/tối ưu nhất trên bản đồ tĩnh bằng các thuật toán đồ thị, bỏ qua các vật cản động thời gian thực.',
    5, 'Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_052', 'mcq', 'robot-navigation',
    'Thuật toán "DWA" (Dynamic Window Approach) được sử dụng ở tầng nào của hệ thống điều hướng robot?',
    ARRAY['Local Planner (Bộ điều khiển bám quỹ đạo và né vật cản động)', 'Global Planner (Lập kế hoạch đường đi toàn cục)', 'SLAM (Vẽ bản đồ)', 'Sensor Driver (Đọc dữ liệu phần cứng)'],
    ARRAY['Local Planner (Bộ điều khiển bám quỹ đạo và né vật cản động)']::varchar[],
    'DWA là thuật toán điều khiển cục bộ, hoạt động bằng cách mô phỏng các cặp vận tốc tuyến tính và vận tốc góc hợp lệ của robot trong chu kỳ ngắn tiếp theo để chọn ra cặp vận tốc an toàn nhất bám theo đường đi toàn cục.',
    6, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_053', 'mcq', 'robot-navigation',
    'Hành vi khôi phục "Recovery Behavior" dạng "Spin" trong Nav2 được kích hoạt khi nào?',
    ARRAY['Khi robot gặp bế tắc/bị kẹt không tìm thấy đường đi khả thi, robot tự xoay tại chỗ để LiDAR quét tìm góc thoát', 'Khi robot đã đến đích thành công', 'Khi pin của robot bị cạn kiệt', 'Khi robot bắt đầu chạy SLAM'],
    ARRAY['Khi robot gặp bế tắc/bị kẹt không tìm thấy đường đi khả thi, robot tự xoay tại chỗ để LiDAR quét tìm góc thoát']::varchar[],
    'Spin giúp robot cập nhật lại bản đồ chi phí xung quanh 360 độ để giải vây và tự động phục hồi hành trình dẫn đường.',
    5, 'Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_054', 'mcq', 'robot-navigation',
    'Tại sao thuật toán lập kế hoạch đường đi TEB (Timed Elastic Band) lại tối ưu hơn DWA đối với các robot có ràng buộc cơ học không vi sai (như xe có cơ cấu lái Ackermann)?',
    ARRAY['TEB xem xét các ràng buộc động học phi trơn (kinematic constraints) của robot trực tiếp trong quá trình tối ưu quỹ đạo theo thời gian', 'TEB không cần sử dụng bản đồ Costmap', 'TEB chạy nhanh hơn DWA gấp 10 lần trên vi điều khiển yếu', 'TEB tự động bỏ qua các chướng ngại vật tĩnh'],
    ARRAY['TEB xem xét các ràng buộc động học phi trơn (kinematic constraints) của robot trực tiếp trong quá trình tối ưu quỹ đạo theo thời gian']::varchar[],
    'TEB tối ưu hóa quỹ đạo dưới dạng dải đàn hồi được kéo căng bởi các lực ảo đại diện cho vật cản và giới hạn cơ học của xe (bán kính quay đầu tối thiểu), rất tốt cho xe tự hành cỡ lớn.',
    7, 'TEB Local Planner Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_055', 'mcq', 'robot-navigation',
    'Trong thuật toán A* dùng để lập đường đi, hàm đánh giá có cấu trúc nào sau đây?',
    ARRAY['f(n) = g(n) + h(n)', 'f(n) = g(n) - h(n)', 'f(n) = g(n) * h(n)', 'f(n) = g(n) / h(n)'],
    ARRAY['f(n) = g(n) + h(n)']::varchar[],
    'Hàm đánh giá của A* gồm chi phí thực tế từ điểm xuất phát đến nút hiện tại g(n) cộng với khoảng cách ước lượng từ nút hiện tại đến đích h(n) (Heuristic).',
    6, 'Artificial Intelligence: A Modern Approach', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_056', 'mcq', 'robot-navigation',
    'Khi robot di chuyển đến đích, nếu Local Planner liên tục báo lỗi "Goal tolerance adl_tolerance violated", nguyên nhân do đâu?',
    ARRAY['Robot không thể dừng lại chính xác trong phạm vi vòng tròn bán kính sai số cho phép bao quanh đích cài đặt', 'Bản đồ tĩnh bị xoay 90 độ', 'Vận tốc tối đa của robot quá thấp', 'Tia laser LiDAR bị nhiễu do ánh sáng mặt trời'],
    ARRAY['Robot không thể dừng lại chính xác trong phạm vi vòng tròn bán kính sai số cho phép bao quanh đích cài đặt']::varchar[],
    'Goal Tolerance định nghĩa khoảng cách và góc lệch chấp nhận được khi robot dừng ở đích. Nếu cấu hình quá nhỏ, robot sẽ dao động liên tục để căn chỉnh mà không thể hoàn thành đích.',
    6, 'Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_057', 'mcq', 'robot-navigation',
    'Trong hệ thống Nav2, dịch vụ BT Navigator điều phối hoạt động dẫn đường bằng cách sử dụng công cụ nào?',
    ARRAY['Cây hành vi (Behavior Trees XML)', 'Máy trạng thái hữu hạn cứng trên code C++', 'Các câu lệnh if-else lồng nhau ở Python', 'Mô hình học máy Deep Learning'],
    ARRAY['Cây hành vi (Behavior Trees XML)']::varchar[],
    'Nav2 sử dụng Behavior Trees để tổ chức và điều phối linh hoạt các tác vụ tìm đường, bám quỹ đạo, hồi phục và lập kịch bản dẫn đường phức tạp.',
    6, 'Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_058', 'mcq', 'robot-navigation',
    'Để robot di động bám theo đường đi toàn cục một cách mượt mà ở tốc độ cao, thuật toán nào thường được dùng để tính toán góc lái và vận tốc bám đường dựa trên điểm mục tiêu phía trước (lookahead point)?',
    ARRAY['Pure Pursuit', 'Dijkstra', 'Extended Kalman Filter', 'A*'],
    ARRAY['Pure Pursuit']::varchar[],
    'Pure Pursuit là thuật toán điều khiển hình học bám đường phổ biến, tính toán bán kính cung tròn di chuyển để đưa robot hướng tới điểm mục tiêu nằm cách robot một khoảng lookahead nhất định.',
    6, 'Introduction to Autonomous Mobile Robots', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_059', 'short-answer', 'robot-navigation',
    'Trong ROS 2 Nav2, viết tên của thuật toán tìm kiếm đường đi ngắn nhất trên đồ thị không sử dụng hàm ước lượng Heuristic, là trường hợp đặc biệt của A* khi h(n) = 0. (Viết thường)',
    NULL,
    ARRAY['dijkstra']::varchar[],
    'Thuật toán Dijkstra quét đều về mọi hướng khi h(n) = 0, đảm bảo tìm thấy đường đi ngắn nhất nhưng chậm hơn A*.',
    5, 'Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  ),
  (
    'cs_rob_q_060', 'short-answer', 'robot-navigation',
    'Trong Nav2 Stack, viết tên của topic vận tốc đầu ra (kiểu Twist) mà Local Planner gửi trực tiếp tới driver động cơ để di chuyển robot. (Bắt đầu bằng dấu gạch chéo)',
    NULL,
    ARRAY['/cmd_vel']::varchar[],
    'Topic `/cmd_vel` là topic vận tốc chuẩn trong ROS.',
    5, 'ROS 2 Nav2 Documentation', 'cs_robot_programming', 13, 'cs_rob_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Bản đồ chi phí & An toàn (cs_rob_07) - Chuyên đề: robot-navigation (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_061', 'mcq', 'robot-navigation',
    'Lớp "Inflation Layer" (Lớp lạm phát) trong Costmap của robot có vai trò gì?',
    ARRAY['Mở rộng kích thước của các vật cản trên bản đồ chi phí một khoảng bằng bán kính an toàn của robot để tránh va chạm mép', 'Tăng tốc độ truy vấn tìm đường của A*', 'Tự động xóa các vật cản tĩnh ra khỏi bản đồ', 'Tăng kích thước vật lý của robot ảo trong mô phỏng'],
    ARRAY['Mở rộng kích thước của các vật cản trên bản đồ chi phí một khoảng bằng bán kính an toàn của robot để tránh va chạm mép']::varchar[],
    'Bằng cách tăng chi phí (cost) xung quanh vật cản, Inflation Layer ngăn cấm Global/Local Planner thiết lập quỹ đạo đưa tâm robot đi sát mép vật cản, tránh va quét thân robot.',
    5, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_062', 'mcq', 'robot-navigation',
    'Hiện tượng gì xảy ra nếu lập trình viên cấu hình tham số bán kính lạm phát (inflation_radius) nhỏ hơn bán kính vật lý thực tế của robot?',
    ARRAY['Robot sẽ thiết lập đường đi đi quá sát vật cản và có nguy cơ va chạm vật lý vào vật cản', 'Robot sẽ từ chối di chuyển và báo lỗi', 'Bản đồ chi phí tự động bị xóa sạch', 'Hệ thống định vị AMCL bị lệch hạt'],
    ARRAY['Robot sẽ thiết lập đường đi đi quá sát vật cản và có nguy cơ va chạm vật lý vào vật cản']::varchar[],
    'Khi bán kính lạm phát quá nhỏ, thuật toán coi đường đi sát vật cản là an toàn, dẫn tới va chạm mép robot khi chạy thực tế.',
    6, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_063', 'mcq', 'robot-navigation',
    'Trong Costmap, giá trị chi phí nào (cost value) đại diện cho vật cản tuyệt đối (Lethal Obstacle) mà robot chắc chắn va chạm nếu tâm robot đi vào đó?',
    ARRAY['254', '0', '100', '128']::varchar[],
    ARRAY['254']::varchar[],
    'Giá trị 254 (Lethal Cost) biểu diễn vùng không gian bị chiếm giữ hoàn toàn bởi vật cản cứng.',
    5, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_064', 'mcq', 'robot-navigation',
    'Sự khác biệt chính giữa Local Costmap và Global Costmap trong dẫn đường Nav2 là gì?',
    ARRAY['Global Costmap bao phủ toàn bộ bản đồ tĩnh; Local Costmap là cửa sổ trượt nhỏ bao quanh robot để tránh vật cản động tức thời', 'Global Costmap chỉ chạy trên RAM; Local Costmap lưu trên đĩa cứng', 'Local Costmap không chứa thông tin vật cản từ LiDAR', 'Global Costmap được cập nhật với tần số cao hơn Local Costmap'],
    ARRAY['Global Costmap bao phủ toàn bộ bản đồ tĩnh; Local Costmap là cửa sổ trượt nhỏ bao quanh robot để tránh vật cản động tức thời']::varchar[],
    'Global Costmap giúp tìm đường đi dài hạn. Local Costmap (ví dụ 3m x 3m di chuyển theo robot) cập nhật LiDAR liên tục giúp né vật cản động phát sinh thời gian thực.',
    6, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_065', 'mcq', 'robot-navigation',
    'Tính năng "Costmap Filters" trong Nav2 được dùng để thực hiện tác vụ nào?',
    ARRAY['Thiết lập vùng cấm đi (Keepout Zones) hoặc vùng giới hạn tốc độ (Speed Limits) bằng cách vẽ đè lên ảnh bản đồ lọc', 'Lọc nhiễu cảm biến LiDAR', 'Tăng độ phân giải của bản đồ lưới', 'Sao lưu bản đồ chi phí lên server Cloud'],
    ARRAY['Thiết lập vùng cấm đi (Keepout Zones) hoặc vùng giới hạn tốc độ (Speed Limits) bằng cách vẽ đè lên ảnh bản đồ lọc']::varchar[],
    'Costmap Filters sử dụng một bản đồ lọc (filter mask) định dạng hình ảnh để áp đặt các quy tắc di chuyển lên robot mà không cần sửa đổi bản đồ tĩnh gốc.',
    6, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_066', 'mcq', 'robot-navigation',
    'Tại sao lớp "Obstacle Layer" trong Costmap cần được thiết lập cơ chế tự động dọn dẹp (clearing)?',
    ARRAY['Để xóa bỏ các vật cản ảo tạm thời do cảm biến đọc nhiễu hoặc chướng ngại vật động đã di chuyển đi chỗ khác', 'Để tiết kiệm RAM cho máy tính nhúng', 'Để robot đi nhanh hơn', 'Để tự động tắt cảm biến khi robot dừng lại'],
    ARRAY['Để xóa bỏ các vật cản ảo tạm thời do cảm biến đọc nhiễu hoặc chướng ngại vật động đã di chuyển đi chỗ khác']::varchar[],
    'Nếu không tự dọn dẹp (clear), các chướng ngại vật động (như con người đi qua) sẽ để lại "vết chi phí" vĩnh viễn trên bản đồ làm robot bị kẹt.',
    6, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_067', 'mcq', 'robot-navigation',
    'Giá trị chi phí nào (cost value) đại diện cho vùng không gian trống hoàn toàn an toàn (Free Space) trong Costmap?',
    ARRAY['0', '254', '255', '100']::varchar[],
    ARRAY['0']::varchar[],
    'Giá trị 0 biểu thị vùng trống tuyệt đối, robot có thể di chuyển tự do qua đó.',
    5, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_068', 'mcq', 'robot-navigation',
    'Khi robot đi vào vùng "Inscribed Inflation" (Vùng lạm phát nội ký - giá trị cost từ 128 đến 253), robot có bị coi là va chạm vật cản hay không?',
    ARRAY['Chưa va chạm, nhưng CSDL cấm không cho phép tâm robot đi vào đó để đảm bảo an toàn mép xe', 'Đã va chạm hoàn toàn', 'Báo lỗi hệ thống tắt nguồn khẩn cấp', 'Tự động quay bánh xe lùi lại'],
    ARRAY['Chưa va chạm, nhưng CSDL cấm không cho phép tâm robot đi vào đó để đảm bảo an toàn mép xe']::varchar[],
    'Vùng Inscribed đại diện cho khoảng cách nhỏ hơn bán kính robot. Dù chưa đụng trực tiếp, nhưng nếu tâm robot đi vào đó thì mép robot sẽ quét vào vật cản.',
    7, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_069', 'short-answer', 'robot-navigation',
    'Trong cấu hình tệp YAML của Costmap 2D, viết tên của lớp bản đồ chịu trách nhiệm đọc dữ liệu từ LiDAR hoặc Camera chiều sâu để vẽ vật cản thời gian thực. (Viết thường, ví dụ: static_layer, obstacle_layer, ...)',
    NULL,
    ARRAY['obstacle_layer', 'obstacle layer']::varchar[],
    'Obstacle Layer chịu trách nhiệm chèn/xóa vật cản từ cảm biến đo khoảng cách trực tiếp.',
    5, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  ),
  (
    'cs_rob_q_070', 'short-answer', 'robot-navigation',
    'Trong Costmap, giá trị chi phí bằng 255 biểu diễn trạng thái nào của ô lưới? (Viết bằng tiếng Anh viết thường hoặc dịch sang tiếng Việt)',
    NULL,
    ARRAY['unknown', 'chưa biết', 'vô định']::varchar[],
    'Giá trị 255 đại diện cho vùng chưa thám hiểm (No Information/Unknown).',
    5, 'Nav2 Costmap 2D Documentation', 'cs_robot_programming', 13, 'cs_rob_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Thị giác máy tính trong Robotics (cs_rob_08) - Chuyên đề: robot-perception (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_071', 'mcq', 'computer-vision',
    'Tại sao không nên sử dụng không gian màu RGB để phân ngưỡng (thresholding) màu sắc vật thể trong các ứng dụng robot hoạt động thực tế?',
    ARRAY['Vì RGB rất nhạy cảm với sự thay đổi của cường độ ánh sáng môi trường, làm lệch vùng lọc màu', 'Vì RGB không được thư viện OpenCV hỗ trợ', 'Vì ảnh RGB chiếm quá nhiều dung lượng RAM', 'Vì RGB chỉ hiển thị ảnh đen trắng'],
    ARRAY['Vì RGB rất nhạy cảm với sự thay đổi của cường độ ánh sáng môi trường, làm lệch vùng lọc màu']::varchar[],
    'Khi cường độ sáng thay đổi, cả ba giá trị R, G, B đều biến đổi mạnh. Không gian màu HSV tách biệt kênh độ sáng (Value) nên lọc màu ổn định hơn.',
    5, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_072', 'mcq', 'computer-vision',
    'Kênh màu "H" trong không gian màu HSV viết tắt của từ nào và đại diện cho yếu tố gì?',
    ARRAY['Hue - Đại diện cho tông màu/màu sắc chính của điểm ảnh', 'High - Độ sáng cực đại', 'Horizontal - Tọa độ ngang của ảnh', 'Hybrid - Tỉ lệ trộn màu'],
    ARRAY['Hue - Đại diện cho tông màu/màu sắc chính của điểm ảnh']::varchar[],
    'Hue đại diện cho bước sóng màu sắc (tông màu từ 0 đến 360 độ, trong OpenCV chuẩn hóa về 0-180). Kênh S (Saturation) đại diện cho độ bão hòa màu, kênh V (Value) đại diện cho độ sáng.',
    5, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_073', 'mcq', 'computer-vision',
    'Thư viện `cv_bridge` đóng vai trò gì trong lập trình thị giác robot?',
    ARRAY['Chuyển đổi thông điệp ảnh của ROS (sensor_msgs/Image) thành ma trận ảnh của OpenCV (cv::Mat) và ngược lại', 'Kết nối camera USB vật lý vào bo mạch Raspberry Pi', 'Mã hóa ảnh JPEG thành chuỗi ký tự gửi qua topic', 'Đồng bộ hóa thời gian giữa camera và LiDAR'],
    ARRAY['Chuyển đổi thông điệp ảnh của ROS (sensor_msgs/Image) thành ma trận ảnh của OpenCV (cv::Mat) và ngược lại']::varchar[],
    'cv_bridge là cầu nối trung gian giúp lập trình viên sử dụng các thuật toán OpenCV trực tiếp trên dữ liệu camera thu được từ ROS node.',
    6, 'ROS 2 cv_bridge Documentation', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_074', 'mcq', 'computer-vision',
    'Mục đích của việc thực hiện "Camera Calibration" (Hiệu chuẩn camera) cho robot tự hành là gì?',
    ARRAY['Xác định các tham số hình học nội/ngoại và ma trận biến dạng của ống kính để hiệu chỉnh ảnh phẳng không bị méo', 'Tăng độ phân giải vật lý của cảm biến ảnh', 'Tự động nâng cao độ sáng khi robot đi vào bóng tối', 'Đồng bộ hóa khung hình camera đạt 120 FPS'],
    ARRAY['Xác định các tham số hình học nội/ngoại và ma trận biến dạng của ống kính để hiệu chỉnh ảnh phẳng không bị méo']::varchar[],
    'Hiệu chuẩn camera (thường dùng bản cờ checkerboard) giúp tính toán các tham số camera matrix và distortion coefficients để khử méo ảnh (undistort) phục vụ đo đạc tọa độ chính xác.',
    7, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_075', 'mcq', 'computer-vision',
    'Thuật toán "Canny Edge Detection" trong OpenCV thực hiện tác vụ nào?',
    ARRAY['Phát hiện các đường biên cạnh sắc nét của vật thể trong ảnh', 'Lọc bỏ hoàn toàn nhiễu hạt muối tiêu', 'Nhận diện khuôn mặt người đối diện', 'Tính toán ma trận dòng quang học'],
    ARRAY['Phát hiện các đường biên cạnh sắc nét của vật thể trong ảnh']::varchar[],
    'Canny là thuật toán phát hiện biên cạnh kinh điển, sử dụng đạo hàm Gauss để tìm các điểm có độ thay đổi cường độ sáng cực đại.',
    6, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_076', 'mcq', 'computer-vision',
    'Trong OpenCV, để tính toán tọa độ tâm hình học (Centroid) của một vùng biên (contour) màu sắc đã được lọc, ta dùng hàm nào để lấy các chỉ số momen ảnh?',
    ARRAY['cv::moments()', 'cv::findCentroid()', 'cv::contourArea()', 'cv::minAreaRect()'],
    ARRAY['cv::moments()']::varchar[],
    'Hàm `cv::moments()` trả về các momen không gian của đa giác. Tâm hình học được tính bằng: $C_x = M_{10}/M_{00}$ và $C_y = M_{01}/M_{00}$.',
    7, 'OpenCV Reference', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_077', 'mcq', 'computer-vision',
    'Hành động nào sau đây giúp tối ưu hóa CPU tối đa cho vi điều khiển nhúng của robot khi xử lý ảnh camera thời gian thực?',
    ARRAY['Giảm độ phân giải ảnh đầu vào (ví dụ: 320x240) và giới hạn vùng quan tâm (ROI - Region of Interest)', 'Tăng độ phân giải lên 4K để nhìn rõ hơn', 'Áp dụng liên tiếp nhiều bộ lọc làm mịn Gauss kích thước kernel lớn', 'Chuyển toàn bộ dữ liệu ảnh thô qua mạng không dây về PC'],
    ARRAY['Giảm độ phân giải ảnh đầu vào (ví dụ: 320x240) và giới hạn vùng quan tâm (ROI - Region of Interest)']::varchar[],
    'Giảm kích thước ma trận ảnh cần tính toán và chỉ quét vùng cần xử lý (ví dụ: chỉ quét 1/3 dưới của ảnh để dò vạch đường) giúp tăng FPS của robot đáng kể.',
    6, 'Embedded Computer Vision', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_078', 'mcq', 'computer-vision',
    'Khi robot sử dụng camera để tự hành bám làn đường (Line Following), phép biến đổi phối cảnh "Perspective Transform" (Bird''s Eye View) giúp giải quyết vấn đề gì?',
    ARRAY['Chuyển đổi góc nhìn nghiêng của camera thành góc nhìn phẳng từ trên xuống để tính toán chính xác độ lệch tâm đường thẳng và độ cong làn', 'Làm cho làn đường có màu sắc sáng hơn', 'Khử nhiễu rung lắc của camera khi xe di chuyển', 'Tự động phát hiện biển báo giao thông bên đường'],
    ARRAY['Chuyển đổi góc nhìn nghiêng của camera thành góc nhìn phẳng từ trên xuống để tính toán chính xác độ lệch tâm đường thẳng và độ cong làn']::varchar[],
    'Bird''s Eye View triệt tiêu hiệu ứng phối cảnh hội tụ xa gần, biến làn đường nghiêng hội tụ thành các đường thẳng song song trên ma trận ảnh giúp bám quỹ đạo chính xác.',
    7, 'Embedded Computer Vision', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_079', 'short-answer', 'computer-vision',
    'Điền tên viết tắt của thư viện thị giác máy tính mã nguồn mở phổ biến nhất được dùng cho robot. (Viết đúng hoa thường)',
    NULL,
    ARRAY['OpenCV']::varchar[],
    'OpenCV là thư viện chuẩn công nghiệp cho xử lý ảnh và thị giác máy tính.',
    5, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  ),
  (
    'cs_rob_q_080', 'short-answer', 'computer-vision',
    'Trong các kênh màu của HSV, kênh nào đại diện cho độ bão hòa màu sắc (độ thuần khiết của màu)? (Điền một chữ cái đại diện)',
    NULL,
    ARRAY['S']::varchar[],
    'Kênh S (Saturation) biểu diễn mức độ bão hòa màu sắc.',
    5, 'Learning OpenCV 3', 'cs_robot_programming', 13, 'cs_rob_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Lập trình Máy trạng thái & Hành vi (cs_rob_09) - Chuyên đề: robot-software-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_081', 'mcq', 'robot-software-architecture',
    'Trong Cây hành vi (Behavior Trees) của robot, nút "Sequence" hoạt động theo nguyên lý nào?',
    ARRAY['Chạy các nút con tuần tự từ trái sang phải; trả về FAILURE ngay khi có một nút con thất bại; chỉ trả về SUCCESS khi tất cả con đều thành công', 'Chạy các nút con tuần tự; trả về SUCCESS ngay khi có một nút con thành công; chỉ trả về FAILURE khi tất cả con thất bại', 'Chạy các nút con ngẫu nhiên không theo thứ tự', 'Luôn trả về trạng thái RUNNING vô hạn'],
    ARRAY['Chạy các nút con tuần tự từ trái sang phải; trả về FAILURE ngay khi có một nút con thất bại; chỉ trả về SUCCESS khi tất cả con đều thành công']::varchar[],
    'Nút Sequence biểu diễn logic điều kiện AND. Mọi bước trong chuỗi phải chạy thành công thì cả chuỗi mới hoàn tất.',
    6, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_082', 'mcq', 'robot-software-architecture',
    'Trong Cây hành vi, nút "Fallback" (hoặc Selector) hoạt động theo nguyên lý nào?',
    ARRAY['Chạy các nút con từ trái sang phải; trả về SUCCESS ngay khi có một nút con thành công; chỉ trả về FAILURE khi tất cả con đều thất bại', 'Chạy tất cả các nút con đồng thời và lấy điểm trung bình', 'Luôn đảo ngược trạng thái của nút con bên dưới', 'Chỉ chạy nút con đầu tiên và bỏ qua các nút còn lại'],
    ARRAY['Chạy các nút con từ trái sang phải; trả về SUCCESS ngay khi có một nút con thành công; chỉ trả về FAILURE khi tất cả con đều thất bại']::varchar[],
    'Nút Selector/Fallback biểu diễn logic điều kiện OR. Nó tìm kiếm giải pháp khả thi đầu tiên thành công trong danh sách các phương án dự phòng.',
    6, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_083', 'mcq', 'robot-software-architecture',
    'Tại sao Cây hành vi (Behavior Trees) đang dần thay thế Máy trạng thái hữu hạn (FSM) trong thiết kế AI cho các robot phức tạp?',
    ARRAY['BT có tính mô-đun hóa cực cao, dễ dàng tái sử dụng các hành vi và mở rộng quy mô cây mà không làm rối loạn luồng logic hiện tại', 'BT chạy tiết kiệm RAM hơn FSM gấp nhiều lần', 'BT bắt buộc robot phải sử dụng thuật toán học sâu', 'FSM không thể biểu diễn được các điều kiện rẽ nhánh đơn giản'],
    ARRAY['BT có tính mô-đun hóa cực cao, dễ dàng tái sử dụng các hành vi và mở rộng quy mô cây mà không làm rối loạn luồng logic hiện tại']::varchar[],
    'Trong FSM, khi thêm 1 trạng thái mới, ta phải vẽ lại các liên kết chuyển đổi từ tất cả trạng thái cũ, gây hiện tượng bùng nổ liên kết (state explosion). BT tổ chức phân cấp nên chỉ cần ghép thêm nhánh con độc lập.',
    7, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_084', 'mcq', 'robot-software-architecture',
    'Một nút Hành động (Action Node) trong Cây hành vi đang thực thi tác vụ tốn thời gian di chuyển của robot nên trả về trạng thái nào để tránh khóa cứng luồng chạy của cây?',
    ARRAY['RUNNING', 'SUCCESS', 'FAILURE', 'IDLE']::varchar[],
    ARRAY['RUNNING']::varchar[],
    'Nút trả về RUNNING báo cho cây biết hành động đang được thực hiện tốt ở background, cho phép cây tiếp tục duyệt và phản hồi các điều kiện an toàn khác ở các chu kỳ sau.',
    6, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_085', 'mcq', 'robot-software-architecture',
    'Trong Behavior Trees, nút "Decorator" đóng vai trò gì?',
    ARRAY['Có duy nhất một nút con và dùng để thay đổi kết quả trả về hoặc điều khiển số lần lặp lại của nút con đó', 'Vẽ giao diện đồ họa trang trí cho robot', 'Đọc dữ liệu từ cảm biến LiDAR gửi trực tiếp sang động cơ', 'Liên kết hai cây hành vi độc lập vật lý chạy trên hai robot khác nhau'],
    ARRAY['Có duy nhất một nút con và dùng để thay đổi kết quả trả về hoặc điều khiển số lần lặp lại của nút con đó']::varchar[],
    'Decorator (nút trang trí) bổ sung logic bao ngoài nút con, ví dụ: Inverter (đảo ngược kết quả), Retry (thử lại N lần nếu lỗi), Timeout.',
    6, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_086', 'mcq', 'robot-software-architecture',
    'Hành vi nào sau đây được coi là "non-blocking" (không chặn) của Action Node trong Cây hành vi?',
    ARRAY['Node gửi mục tiêu di chuyển đến ROS 2 Action Server bất đồng bộ, trả về RUNNING ngay lập tức và tiếp tục cập nhật trạng thái trong các tích tắc sau', 'Node dùng hàm sleep() để dừng chương trình trong 5 giây chờ robot di chuyển', 'Node liên tục chạy vòng lặp while(true) chờ robot đến đích mới thoát', 'Node tự động ngắt kết nối database khi chạy'],
    ARRAY['Node gửi mục tiêu di chuyển đến ROS 2 Action Server bất đồng bộ, trả về RUNNING ngay lập tức và tiếp tục cập nhật trạng thái trong các tích tắc sau']::varchar[],
    'Triển khai non-blocking giúp cây hành vi có thể tích tắc phản ứng với các điều kiện khẩn cấp (như Sensor báo pin yếu hoặc LiDAR phát hiện vật cản sát nút) trong khi robot vẫn đang đi.',
    7, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_087', 'mcq', 'robot-software-architecture',
    'Trong Cây hành vi, nút con nào có nhiệm vụ duy nhất là kiểm tra trạng thái môi trường (ví dụ: pin có yếu không, có vật cản phía trước không) và trả về SUCCESS hoặc FAILURE ngay lập tức?',
    ARRAY['Condition Node (Nút điều kiện)', 'Action Node (Nút hành động)', 'Selector Node', 'Subtree Node'],
    ARRAY['Condition Node (Nút điều kiện)']::varchar[],
    'Condition Node là nút lá dùng để kiểm tra logic điều kiện nhanh gọn, không đổi trạng thái hệ thống và không bao giờ trả về RUNNING.',
    5, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_088', 'mcq', 'robot-software-architecture',
    'Công cụ phần mềm giao diện trực quan nào thường được kết hợp với thư viện BehaviorTree.CPP để thiết kế, vẽ cây và theo dõi debug trạng thái cây thời gian thực?',
    ARRAY['Groot', 'rviz2', 'gazebo', 'webviz']::varchar[],
    ARRAY['Groot']::varchar[],
    'Groot kết nối trực tiếp với cổng debug của BehaviorTree.CPP để hiển thị màu sắc trạng thái các nút (Xanh lá = Success, Đỏ = Failure, Cam = Running) khi robot đang chạy.',
    6, 'BehaviorTree.CPP Documentation', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_089', 'short-answer', 'robot-software-architecture',
    'Trong Cây hành vi, điền tên trạng thái (bằng tiếng Anh viết hoa) mà một nút trả về để báo hiệu tác vụ đang được thực thi dở dang và cần tiếp tục chạy ở chu kỳ sau.',
    NULL,
    ARRAY['RUNNING']::varchar[],
    'Trạng thái RUNNING báo hiệu hành động đang được thực hiện bất đồng bộ.',
    5, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  ),
  (
    'cs_rob_q_090', 'short-answer', 'robot-software-architecture',
    'Trong Cây hành vi, nút điều khiển thực hiện việc duyệt con từ trái sang phải, dừng lại và trả về SUCCESS ngay khi gặp nút con đầu tiên thành công được gọi là nút gì? (Điền một từ tiếng Anh viết thường)',
    NULL,
    ARRAY['selector', 'fallback']::varchar[],
    'Nút Selector (hoặc Fallback) biểu diễn logic rẽ nhánh OR.',
    5, 'Behavior Trees in Robotics and AI', 'cs_robot_programming', 13, 'cs_rob_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Mô phỏng Robot (cs_rob_10) - Chuyên đề: robot-software-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_rob_q_091', 'mcq', 'robot-software-architecture',
    'Tệp định dạng XML dùng để mô tả cấu trúc vật lý của robot (bao gồm các links và joints) trong ROS 2 có tên viết tắt là gì?',
    ARRAY['URDF', 'SDF', 'Xacro', 'YAML']::varchar[],
    ARRAY['URDF']::varchar[],
    'URDF (Unified Robot Description Format) là định dạng XML chuẩn để mô tả các đặc tính hình học, va chạm và động học của robot.',
    5, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_092', 'mcq', 'robot-software-architecture',
    'Trong tệp mô tả robot URDF, thẻ `<collision>` dùng để định nghĩa thông tin gì?',
    ARRAY['Mô tả hình khối đơn giản đại diện cho vùng va chạm vật lý phục vụ động cơ vật lý tính toán va quẹt', 'Định nghĩa màu sắc và vân bề mặt hiển thị của robot trên RViz', 'Mô tả momen quán tính và khối lượng của bộ phận', 'Định nghĩa giới hạn lực kéo tối đa của khớp quay'],
    ARRAY['Mô tả hình khối đơn giản đại diện cho vùng va chạm vật lý phục vụ động cơ vật lý tính toán va quẹt']::varchar[],
    'Thẻ `<collision>` định nghĩa ranh giới va chạm của robot. Thường dùng các hình học cơ bản (Hộp, Trụ, Cầu) để giảm tải tính toán cho Engine vật lý thay vì dùng lưới mesh phức tạp của thẻ `<visual>`.',
    6, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_093', 'mcq', 'robot-software-architecture',
    'Khớp nối bánh xe chủ động liên kết với thân robot di động nên được khai báo kiểu khớp (joint type) nào trong URDF?',
    ARRAY['continuous (khớp quay không giới hạn góc)', 'revolute (khớp quay giới hạn góc)', 'fixed (khớp cứng cố định)', 'prismatic (khớp trượt tuyến tính)'],
    ARRAY['continuous (khớp quay không giới hạn góc)']::varchar[],
    'Bánh xe cần quay liên tục nhiều vòng tròn, do đó sử dụng kiểu `continuous`. Khớp `revolute` chỉ dùng cho các khớp cánh tay có giới hạn góc quay (ví dụ từ -180 đến 180 độ).',
    6, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_094', 'mcq', 'robot-software-architecture',
    'Trong mô hình URDF, thuộc tính `<inertial>` bắt buộc phải định nghĩa ma trận quán tính (inertia tensor matrix). Nếu ta nhập ma trận này bằng 0 cho một thanh liên kết có khối lượng, hiện tượng gì sẽ xảy ra trong mô phỏng Gazebo?',
    ARRAY['Engine vật lý của Gazebo sẽ tính toán sai lệch lực, khiến robot ảo bị rung lắc dữ dội, lật nhào hoặc biến mất một cách bất thường', 'Mô hình robot sẽ hiển thị với màu đen xì trên màn hình', 'Robot không thể quay bánh xe di chuyển', 'Không có hiện tượng gì xảy ra, robot vẫn hoạt động bình thường'],
    ARRAY['Engine vật lý của Gazebo sẽ tính toán sai lệch lực, khiến robot ảo bị rung lắc dữ dội, lật nhào hoặc biến mất một cách bất thường']::varchar[],
    'Momen quán tính bằng 0 vi phạm định luật vật lý trong bài toán động lực học của Gazebo, làm bộ giải ma trận lực (physics solver) bị tràn số hoặc chia cho 0.',
    7, 'Gazebo Physics Engine Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_095', 'mcq', 'robot-software-architecture',
    'Mục đích của việc sử dụng các Gazebo Plugins (như libgazebo_ros_diff_drive.so) nhúng vào URDF là gì?',
    ARRAY['Liên kết cảm biến ảo/động cơ ảo trong Gazebo với hệ thống truyền thông điệp ROS 2 để điều khiển và đọc dữ liệu giống robot thật', 'Dùng để vẽ giao diện điều khiển robot trực tiếp', 'Tự động kiểm tra lỗi cú pháp XML của file URDF', 'Để nâng cấp đồ họa của Gazebo đẹp hơn'],
    ARRAY['Liên kết cảm biến ảo/động cơ ảo trong Gazebo với hệ thống truyền thông điệp ROS 2 để điều khiển và đọc dữ liệu giống robot thật']::varchar[],
    'Plugin này bắt chước phần cứng vật lý: nó đọc topic `/cmd_vel` từ ROS 2 để làm quay bánh xe ảo trong Gazebo và publish dữ liệu `/odom` và `/scan` ảo ngược lại hệ thống.',
    6, 'Gazebo ROS Plugins', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_096', 'mcq', 'robot-software-architecture',
    'Sự khác biệt cốt lõi về mục đích sử dụng giữa RViz 2 và Gazebo là gì?',
    ARRAY['RViz 2 dùng để trực quan hóa dữ liệu cảm biến thực tế của robot (những gì robot "thấy"); Gazebo là môi trường mô phỏng vật lý 3D giả lập thế giới thực tế', 'RViz 2 chỉ chạy trên Python còn Gazebo chạy trên C++', 'Gazebo dùng để lập kế hoạch đường đi còn RViz 2 dùng để thiết kế 3D', 'RViz 2 bắt buộc phải cài trên máy tính của robot còn Gazebo chỉ chạy được trên điện thoại'],
    ARRAY['RViz 2 dùng để trực quan hóa dữ liệu cảm biến thực tế của robot (những gì robot "thấy"); Gazebo là môi trường mô phỏng vật lý 3D giả lập thế giới thực tế']::varchar[],
    'RViz 2 hiển thị các đám mây điểm, tia laser, cây hệ tọa độ dựa trên dữ liệu thật. Gazebo giả lập trọng lực, va chạm vật lý để robot chạy thử nghiệm.',
    6, 'ROS 2 Visualization Tools', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_097', 'mcq', 'robot-software-architecture',
    'Định dạng Xacro (XML Macros) hỗ trợ gì cho việc viết URDF của robot?',
    ARRAY['Cho phép sử dụng các biến số, phép tính toán học và các đoạn mã macro lặp lại giúp URDF gọn gàng và dễ quản lý hơn', 'Tự động chuyển đổi file URDF thành mã nguồn C++', 'Nén dung lượng file URDF nhỏ đi 10 lần', 'Mã hóa tệp tin để bảo mật chống đánh cắp bản quyền'],
    ARRAY['Cho phép sử dụng các biến số, phép tính toán học và các đoạn mã macro lặp lại giúp URDF gọn gàng và dễ quản lý hơn']::varchar[],
    'Xacro giải quyết nhược điểm viết lặp XML của URDF, cho phép khai báo biến chung (ví dụ: khối lượng bánh xe) và tái sử dụng macro định nghĩa bánh xe trái/phải.',
    5, 'ROS Xacro Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_098', 'mcq', 'robot-software-architecture',
    'Trong URDF Joint, thẻ `<origin>` quy định thông tin nào?',
    ARRAY['Vị trí tọa độ (xyz) và góc xoay hướng (rpy) của khớp nối so với hệ tọa độ của Link cha', 'Vị trí địa lý GPS nơi lắp ráp robot', 'Tên gói package lưu trữ mô hình robot', 'Kiểu truyền động cơ học của khớp'],
    ARRAY['Vị trí tọa độ (xyz) và góc xoay hướng (rpy) của khớp nối so với hệ tọa độ của Link cha']::varchar[],
    'Thẻ `<origin>` xác định gốc tọa độ của khớp so với Link cha, đóng vai trò tạo mối liên kết biến đổi TF tĩnh.',
    6, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_099', 'short-answer', 'robot-software-architecture',
    'Viết tên của thẻ XML chính trong file URDF dùng để định nghĩa một bộ phận vật lý cứng (khung xe, bánh xe, cảm biến) của robot. (Viết thường)',
    NULL,
    ARRAY['link']::varchar[],
    'Thẻ `<link>` định nghĩa các cấu kiện vật lý của robot.',
    5, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  ),
  (
    'cs_rob_q_100', 'short-answer', 'robot-software-architecture',
    'Viết tên của thẻ XML trong file URDF dùng để liên kết hai bộ phận vật lý (Link) lại với nhau và định nghĩa trục chuyển động giữa chúng. (Viết thường)',
    NULL,
    ARRAY['joint']::varchar[],
    'Thẻ `<joint>` kết nối các Link và định nghĩa cách chúng di chuyển tương đối với nhau.',
    5, 'URDF Documentation', 'cs_robot_programming', 13, 'cs_rob_10'
  );

COMMIT;
