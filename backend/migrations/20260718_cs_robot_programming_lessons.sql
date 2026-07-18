-- SQL migration to seed topics and 10 core lessons for cs_robot_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robot_programming (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('robot-software-architecture', 'cs_robot_programming', 13, 'Kiến trúc & Phần mềm Robot', 'Hệ điều hành ROS 2 (Nodes, Topics, Actions), thiết kế Cây hành vi (Behavior Trees) và mô hình hóa URDF.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-kinematics', 'cs_robot_programming', 13, 'Động học & Điều khiển cơ học', 'Động học thuận/nghịch (DH parameters), quản lý hệ tọa độ TF2 và thuật toán điều khiển PID động cơ.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-perception', 'cs_robot_programming', 13, 'Cảm nhận cảm biến & Thị giác', 'Đọc dữ liệu cảm biến (LiDAR Scan, IMU, Odom), định vị SLAM, bộ lọc Kalman và xử lý ảnh OpenCV.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-navigation', 'cs_robot_programming', 13, 'Dẫn đường & Bản đồ di động', 'Lập kế hoạch đường đi (A*, DWA, TEB), cấu hình Nav2 stack và tối ưu hóa bản đồ chi phí Costmap.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robot_programming (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_rob_01', 
    'cs_robot_programming', 
    13, 
    'Kiến trúc & Phần mềm Robot', 
    'Hệ điều hành Robot (ROS 2 Fundamentals)', 
    '### 1. Giới thiệu về ROS 2
ROS 2 (Robot Operating System) là một framework trung gian (middleware) mã nguồn mở chứa các công cụ và thư viện giúp xây dựng phần mềm robot phân tán.

### 2. Các khái niệm cốt lõi
- **Node (Nút):** Một chương trình/tiến trình đơn lẻ chịu trách nhiệm cho một tác vụ cụ thể (ví dụ: node đọc LiDAR, node điều khiển động cơ).
- **Topic (Chủ đề):** Cơ chế truyền thông điệp một-nhiều bất đồng bộ (Publish/Subscribe). Một node xuất bản dữ liệu (Publisher) lên Topic, và các node khác đăng ký lắng nghe (Subscriber).
- **Service (Dịch vụ):** Cơ chế truyền thông đồng bộ dạng Yêu cầu-Phản hồi (Request-Response) một-một.
- **Action (Hành động):** Phù hợp cho các tác vụ tốn thời gian (như di chuyển đến đích). Hỗ trợ gửi mục tiêu (Goal), cập nhật tiến độ liên tục (Feedback), và trả về kết quả cuối cùng (Result).', 
    'core-theory', 
    '["Viết một Node Publisher trong ROS 2 bằng Python kế thừa từ rclpy.node.Node.", "Sử dụng công cụ CLI: ros2 topic pub /cmd_vel geometry_msgs/msg/Twist ''{linear: {x: 0.1, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 0.5}}'' để điều khiển robot ảo quay vòng tròn."]'::jsonb, 
    '["Luôn định nghĩa rõ kiểu thông điệp (msg/srv/action) trước khi viết Node.", "Tránh chặn luồng chính (blocking main thread) trong callback của Topic, nên sử dụng MultiThreadedExecutor khi cần.", "Sử dụng lệnh ros2 node info và ros2 topic hz để giám sát tần số và trạng thái hoạt động của hệ thống."]'::jsonb, 
    6, 
    TRUE,
    'robot-software-architecture'
  ),
  (
    'cs_rob_02', 
    'cs_robot_programming', 
    13, 
    'Động học & Điều khiển cơ học', 
    'Động học Robot & Quản lý Hệ tọa độ (TF2)', 
    '### 1. Động học thuận và nghịch
- **Động học thuận (Forward Kinematics):** Tính toán tọa độ và hướng của khâu tác động cuối (End-effector) trong không gian dựa trên góc quay hoặc độ dịch chuyển của các khớp.
- **Động học nghịch (Inverse Kinematics):** Tính toán các góc khớp cần thiết để khâu tác động cuối đạt được tọa độ mong muốn.

### 2. Hệ tọa độ TF2 trong ROS 2
Robotics sử dụng rất nhiều hệ tọa độ (Frames) như: `map` (bản đồ toàn cục), `odom` (hệ tọa độ tích lũy), `base_link` (tâm vật lý robot), `laser_link` (vị trí LiDAR). Thư viện TF2 tự động theo dõi và tính toán các ma trận xoay và dịch chuyển giữa các hệ tọa độ này theo thời gian thực.', 
    'core-theory', 
    '["Sử dụng tham số Denavit-Hartenberg (DH) để lập ma trận biến biến đổi thuần nhất A_i từ khớp i-1 sang khớp i.", "Viết code lắng nghe transform (TF listener) trong ROS 2 để chuyển tọa độ vật cản từ hệ tọa độ laser_link về base_link."]'::jsonb, 
    '["Đặt tên hệ tọa độ thống nhất theo chuẩn ROS (REP 105).", "Tránh việc thiết lập vòng lặp trong cây TF (mỗi frame chỉ được phép có tối đa một frame cha).", "Kiểm tra cấu trúc cây tọa độ bằng công cụ view_frames hoặc tf2_monitor."]'::jsonb, 
    7, 
    TRUE,
    'robot-kinematics'
  ),
  (
    'cs_rob_03', 
    'cs_robot_programming', 
    13, 
    'Động học & Điều khiển cơ học', 
    'Lập trình Điều khiển Động cơ & Thuật toán PID', 
    '### 1. Điều khiển động cơ với Encoder phản hồi
Để robot di chuyển chính xác, ta cần đọc số xung từ Encoder để tính toán vận tốc bánh xe thực tế, sau đó điều chỉnh điện áp cấp cho động cơ bằng tín hiệu điều xung PWM.

### 2. Bộ điều khiển PID
PID là thuật toán phản hồi vòng kín kinh điển giúp ổn định hệ thống. Sai số hiện tại được tính bằng:
$$e(t) = r(t) - y(t)$$
Với $r(t)$ là giá trị cài đặt và $y(t)$ là giá trị đo đạc thực tế.

Tín hiệu điều khiển đầu ra $u(t)$:
$$u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) d\tau + K_d \frac{de(t)}{dt}$$
- **Khâu P ($K_p$):** Tỉ lệ thuận với sai số hiện tại. Khâu P càng lớn phản ứng càng nhanh nhưng dễ gây vọt lố (overshoot).
- **Khâu I ($K_i$):** Tích lũy sai số theo thời gian để triệt tiêu sai số xác lập (steady-state error).
- **Khâu D ($K_d$):** Dự báo sai số tương lai dựa trên tốc độ thay đổi sai số, giúp giảm dao động và làm mịn chuyển động.', 
    'control-systems', 
    '["Hàm cập nhật PID trong C++ chạy định kỳ sau mỗi delta_t: double error = target_speed - current_speed; double derivative = (error - last_error) / dt; integral += error * dt; double output = Kp * error + Ki * integral + Kd * derivative; last_error = error; return output;"]'::jsonb, 
    '["Triển khai cơ chế chống bão hòa tích phân (Anti-windup) cho khâu I để tránh việc tích phân tích lũy quá mức khi động cơ bị kẹt.", "Tinh chỉnh tham số theo thứ tự: tăng Kp đến khi bắt đầu dao động, sau đó điều chỉnh Kd để giảm dao động, và cuối cùng thêm Ki để triệt tiêu sai số tĩnh.", "Đảm bảo tần số chạy vòng lặp PID đủ cao (thường từ 50Hz đến 200Hz)."]'::jsonb, 
    7, 
    TRUE,
    'robot-kinematics'
  ),
  (
    'cs_rob_04', 
    'cs_robot_programming', 
    13, 
    'Cảm nhận cảm biến & Thị giác', 
    'Tích hợp Cảm biến & Đọc dữ liệu (Sensor Integration)', 
    '### 1. Các cảm biến Robotics thông dụng
- **LiDAR (Light Detection and Ranging):** Đo khoảng cách xung quanh bằng tia laser, trả về mảng khoảng cách theo các góc quay.
- **IMU (Inertial Measurement Unit):** Đo gia tốc tuyến tính và vận tốc góc của robot.
- **Odometry (Định vị tích lũy):** Ước lượng vị trí robot dựa trên số vòng quay bánh xe từ Encoder.

### 2. Ước lượng trạng thái robot
Do các cảm biến đều có nhiễu (Odometry bị trượt bánh, IMU bị trôi theo thời gian), ta cần sử dụng các bộ lọc như bộ lọc Kalman mở rộng (Extended Kalman Filter - EKF) để dung hợp dữ liệu (Sensor Fusion), tạo ra ước lượng vị trí chính xác nhất.', 
    'hardware-integration', 
    '["Đọc topic /scan kiểu sensor_msgs/msg/LaserScan để tìm chướng ngại vật gần nhất trong góc quét phía trước từ -30 đến 30 độ.", "Sử dụng gói robot_localization để gộp dữ liệu /odom của bánh xe và /imu/data của IMU thành topic /odometry/filtered."]'::jsonb, 
    '["Luôn hiệu chuẩn (calibrate) cảm biến IMU trước khi sử dụng để loại bỏ sai số tĩnh (bias).", "Kiểm tra tần số dữ liệu của các cảm biến để đảm bảo bộ lọc Kalman hoạt động ổn định.", "Cấu hình chính xác ma trận hiệp phương sai nhiễu (covariance matrix) cho từng cảm biến đầu vào."]'::jsonb, 
    6, 
    TRUE,
    'robot-perception'
  ),
  (
    'cs_rob_05', 
    'cs_robot_programming', 
    13, 
    'Cảm nhận cảm biến & Thị giác', 
    'Bản đồ hóa SLAM & Định vị AMCL', 
    '### 1. SLAM (Simultaneous Localization and Mapping)
SLAM là bài toán robot tự xây dựng bản đồ của môi trường chưa biết xung quanh, đồng thời tự xác định vị trí của mình trên bản đồ đó. Thuật toán SLAM phổ biến là Cartographer, Gmapping, hoặc Hector SLAM sử dụng dữ liệu LiDAR và Odometry.

### 2. Định vị toàn cục AMCL
Khi đã có bản đồ lưới (Occupancy Grid Map), robot sử dụng thuật toán AMCL (Adaptive Monte Carlo Localization). AMCL sử dụng bộ lọc hạt (Particle Filter) để rải các hạt giả định vị trí của robot trên bản đồ, sau đó so khớp dữ liệu quét của LiDAR thực tế với bản đồ để hội tụ các hạt về vị trí thực sự của robot.', 
    'navigation', 
    '["Khởi chạy SLAM để vẽ bản đồ: ros2 launch slam_toolbox online_async_launch.py", "Sử dụng công cụ Rviz 2 để rải các hạt định vị ước lượng ban đầu (2D Pose Estimate) cho AMCL khi robot khởi động bị lệch vị trí."]'::jsonb, 
    '["Đảm bảo môi trường có đủ các đặc trưng hình học (góc tường, cột) để LiDAR SLAM không bị trượt bản đồ ở hành lang dài.", "Cấu hình đúng số lượng hạt tối thiểu và tối đa cho bộ lọc hạt AMCL nhằm cân bằng hiệu năng CPU.", "Lưu bản đồ thành công bằng map_saver sau khi hoàn thành SLAM."]'::jsonb, 
    7, 
    TRUE,
    'robot-perception'
  ),
  (
    'cs_rob_06', 
    'cs_robot_programming', 
    13, 
    'Dẫn đường & Bản đồ di động', 
    'Lập kế hoạch đường đi & Điều hướng (Nav2)', 
    '### 1. Kiến trúc dẫn đường Nav2 Stack
Nav2 là hệ thống dẫn đường tiêu chuẩn trong ROS 2 giúp điều khiển robot di chuyển từ điểm A đến điểm B một cách tự động và an toàn.

### 2. Global Planner & Local Planner
- **Global Planner:** Lập kế hoạch đường đi toàn cục tối ưu (quãng đường ngắn nhất) từ vị trí hiện tại đến đích trên bản đồ tĩnh, sử dụng thuật toán như A* hoặc Dijkstra.
- **Local Planner (Controller):** Nhận đường đi toàn cục và tính toán vận tốc động cơ thực thời (`cmd_vel`) để robot bám theo đường đi đó, đồng thời chủ động né tránh các vật cản động xuất hiện đột xuất bằng thuật toán DWA (Dynamic Window Approach) hoặc TEB (Timed Elastic Band).', 
    'navigation', 
    '["Cấu hình tệp YAML cho Nav2 định nghĩa các plugin điều khiển (nav2_dwb_controller/DWBLocalPlanner).", "Viết một mã nguồn Python sử dụng thư viện `nav2_simple_commander` để điều khiển robot tuần tra qua các điểm Waypoints thiết lập sẵn."]'::jsonb, 
    '["Kiểm tra tần số cập nhật của Local Planner (thường cấu hình ở mức 10Hz-20Hz) để robot phản ứng kịp thời với vật cản.", "Cấu hình giới hạn vận tốc tối đa và gia tốc vật lý của robot phù hợp với động cơ thực tế.", "Thiết lập các hành vi khôi phục (Recovery Behaviors) như tự xoay tại chỗ (Spin) để giải vây khi robot bị kẹt."]'::jsonb, 
    7, 
    TRUE,
    'robot-navigation'
  ),
  (
    'cs_rob_07', 
    'cs_robot_programming', 
    13, 
    'Dẫn đường & Bản đồ di động', 
    'Bản đồ chi phí Costmap & Thiết lập Vùng an toàn', 
    '### 1. Khái niệm Costmap 2D
Bản đồ chi phí (Costmap) biểu diễn độ nguy hiểm của các khu vực xung quanh robot dưới dạng các giá trị số từ 0 (an toàn) đến 254 (vật cản vật lý gây va chạm).

### 2. Các lớp của Costmap (Costmap Layers)
- **Static Map Layer:** Lớp bản đồ tĩnh được xây dựng từ SLAM.
- **Obstacle Map Layer:** Lớp vật cản động được cập nhật liên tục từ dữ liệu thời gian thực của LiDAR hoặc cảm biến khoảng cách.
- **Inflation Layer (Lớp lạm phát):** Tạo ra một vùng đệm an toàn xung quanh vật cản. Bất kỳ ô nào nằm trong khoảng cách bằng bán kính vật lý của robot tính từ vật cản sẽ có giá trị chi phí cực cao, ngăn không cho tâm robot đi vào đó.', 
    'navigation', 
    '["Cấu hình tham số inflation_radius (bán kính lạm phát) = 0.55m cho robot có bán kính vật lý là 0.3m.", "Sử dụng Costmap Filters để tạo vùng cấm đi (Keepout Zones) chặn robot không được đi vào khu vực hành lang nguy hiểm mặc dù bản đồ trống."]'::jsonb, 
    '["Đặt bán kính lạm phát lớn hơn bán kính vật lý của robot để đảm bảo an toàn, tránh va chạm do sai số định vị.", "Đảm bảo dọn dẹp (clear) các vật cản ảo xuất hiện do nhiễu cảm biến bằng cách cấu hình bộ lọc clearing trong obstacle_layer.", "Sử dụng bản đồ chi phí cục bộ (Local Costmap) có kích thước nhỏ (ví dụ 3m x 3m) bao quanh robot để tiết kiệm CPU."]'::jsonb, 
    6, 
    TRUE,
    'robot-navigation'
  ),
  (
    'cs_rob_08', 
    'cs_robot_programming', 
    13, 
    'Cảm nhận cảm biến & Thị giác', 
    'Thị giác máy tính OpenCV trong Robotics', 
    '### 1. OpenCV trong Robotics
Thị giác máy tính giúp robot nhận diện môi trường trực quan. OpenCV (Open Source Computer Vision Library) cung cấp các thuật toán xử lý ảnh thời gian thực mạnh mẽ.

### 2. Các tác vụ thị giác robot cơ bản
- **Lọc không gian màu HSV:** Không gian màu HSV (Hue - Saturation - Value) ổn định hơn RGB khi ánh sáng thay đổi, thường dùng để lọc và phát hiện màu sắc vật thể.
- **Phát hiện đường biên Canny:** Xác định các đường nét cạnh của ảnh, phục vụ thuật toán nhận diện làn đường cho xe tự hành.
- **Giao tiếp ROS 2 & OpenCV:** Sử dụng thư viện `cv_bridge` để chuyển đổi qua lại giữa định dạng ảnh ROS (`sensor_msgs/msg/Image`) và ma trận ảnh OpenCV (`cv::Mat`).', 
    'computer-vision', 
    '["Viết node ROS 2 nhận ảnh từ camera, dùng cv_bridge chuyển thành cv::Mat, áp dụng cv::inRange() lọc màu đỏ, tìm tâm hình học (centroid) và publish tọa độ lệch để robot tự xoay bám theo bóng.", "Áp dụng phép biến đổi phối cảnh (Perspective Transform) biến ảnh camera xiên thành ảnh nhìn từ trên xuống (Bird''s Eye View) giúp xe tự hành bám làn chính xác hơn."]'::jsonb, 
    '["Luôn giảm độ phân giải ảnh camera đầu vào (ví dụ xuống 320x240 hoặc 640x480) để đảm bảo tốc độ xử lý đạt 30 FPS trên các máy tính nhúng yếu như Raspberry Pi.", "Sử dụng luồng xử lý ảnh độc lập để tránh gây trễ cho các tác vụ điều khiển động cơ quan trọng.", "Hiệu chuẩn camera (Camera Calibration) để loại bỏ hiện tượng méo ảnh do ống kính (lens distortion)."]'::jsonb, 
    7, 
    TRUE,
    'robot-perception'
  ),
  (
    'cs_rob_09', 
    'cs_robot_programming', 
    13, 
    'Kiến trúc & Phần mềm Robot', 
    'Lập trình Máy trạng thái & Cây hành vi (Behavior Trees)', 
    '### 1. Quản lý nhiệm vụ robot phức tạp
Khi robot cần thực hiện một chuỗi nhiệm vụ phức tạp đan xen (như tuần tra, tránh vật cản, đi sạc pin, giao hàng), việc viết code bằng các câu lệnh `if-else` lồng nhau sẽ nhanh chóng trở thành thảm họa bảo trì.

### 2. Máy trạng thái (Finite State Machines - FSM)
Robot chuyển đổi qua lại giữa các trạng thái (ví dụ: IDLE, NAVIGATING, CHARGING). Nhược điểm là khó mở rộng và tái sử dụng trạng thái.

### 3. Cây hành vi (Behavior Trees - BT)
BT là mô hình phân cấp điều khiển hành vi robot theo cấu trúc cây. 
- **Leaf Nodes (Nút lá):** Chứa các hành động cụ thể (Action) hoặc điều kiện kiểm tra (Condition).
- **Control Nodes (Nút điều khiển):** 
  - *Sequence (Nút tuần tự - kí hiệu `->`):* Chạy các nút con từ trái sang phải. Nếu một nút con báo thất bại (Failure), cả Sequence thất bại.
  - *Fallback/Selector (Nút lựa chọn - kí hiệu `?`):* Chạy các nút con từ trái sang phải. Nếu có một nút con báo thành công (Success), Fallback dừng lại và báo thành công.', 
    'robot-intelligence', 
    '["Thiết kế cây hành vi tuần tra: Sequence [Kiểm tra pin -> Đi tới điểm A -> Chờ 5s -> Đi tới điểm B]. Nếu nút Kiểm tra pin trả về Failure (pin yếu), Sequence dừng lại lập tức.", "Sử dụng thư viện BehaviorTree.CPP kết hợp với công cụ giao diện trực quan Groot để thiết kế và debug cây hành vi theo thời gian thực."]'::jsonb, 
    '["Tách biệt rõ ràng logic hành động (Action Nodes) và logic điều khiển cây (Control Nodes).", "Các Action node trong Cây hành vi nên viết dạng phi chặn (non-blocking) bằng cách trả về trạng thái RUNNING và sử dụng ROS 2 Action Client ở chế độ bất đồng bộ.", "Sử dụng các nút Decorator để bổ sung điều kiện lặp lại (Retry) hoặc phủ định (Inverter) cho các hành vi của robot."]'::jsonb, 
    8, 
    TRUE,
    'robot-software-architecture'
  ),
  (
    'cs_rob_10', 
    'cs_robot_programming', 
    13, 
    'Kiến trúc & Phần mềm Robot', 
    'Mô phỏng Robot vật lý 3D với Gazebo & URDF', 
    '### 1. Tại sao cần mô phỏng?
Việc thử nghiệm code điều khiển trực tiếp trên phần cứng robot thật rất nguy hiểm (dễ va chạm gây hư hỏng mạch, động cơ). Mô phỏng giúp kiểm thử an toàn, nhanh chóng và không tốn chi phí phần cứng.

### 2. Thiết lập mô hình URDF
URDF (Unified Robot Description Format) là file định dạng XML dùng để mô tả cấu trúc vật lý của robot:
- **Link:** Định nghĩa hình học (visual), khối lượng, momen quán tính (inertial), và vùng va chạm vật lý (collision) của từng bộ phận.
- **Joint:** Định nghĩa liên kết giữa các Link (khớp quay Revolute, khớp trượt Prismatic, khớp cứng Fixed).

### 3. Mô phỏng vật lý Gazebo
Gazebo là môi trường mô phỏng 3D tích hợp engine vật lý (trọng lực, ma sát, va chạm). Ta có thể nhúng các plugin ROS 2 vào URDF để giả lập động cơ vi sai (differential drive), camera ảo, LiDAR ảo truyền dữ liệu thẳng vào các Topic của ROS 2 giống hệt robot thật.', 
    'simulation', 
    '["Viết file URDF định nghĩa một robot 2 bánh xe chủ động liên kết với thân robot qua khớp quay revolute.", "Chạy mô phỏng robot ảo trong môi trường mê cung Gazebo và dùng Rviz 2 để hiển thị tia laser LiDAR ảo quét xung quanh để chạy SLAM vẽ bản đồ."]'::jsonb, 
    '["Luôn định nghĩa vùng va chạm collision chính xác (thường dùng hình khối đơn giản như Box, Cylinder để tối ưu hóa CPU tính toán va chạm).", "Đảm bảo tính toán momen quán tính (inertia matrix) đúng đắn cho các Link, nếu không robot ảo sẽ bị bay hoặc lật bất thường trong Gazebo.", "Sử dụng định dạng Xacro để chia nhỏ và quản lý mã nguồn URDF gọn gàng hơn."]'::jsonb, 
    7, 
    TRUE,
    'robot-software-architecture'
  )
ON CONFLICT (id) DO UPDATE SET
  theory = EXCLUDED.theory,
  examples = EXCLUDED.examples,
  practice_points = EXCLUDED.practice_points;

COMMIT;
