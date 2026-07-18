-- SQL migration to seed topics and 10 core lessons for cs_robot_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robot_intelligence (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('slam-localization', 'cs_robot_intelligence', 13, 'SLAM & Định vị', 'Thuật toán đồng thời vẽ bản đồ và định vị SLAM, bộ lọc Kalman, định vị trong nhà UWB.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('path-planning', 'cs_robot_intelligence', 13, 'Lập kế hoạch đường đi', 'Giải thuật tìm đường toàn cục A*, RRT và tránh vật cản động cục bộ DWA/TEB.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-vision-rl', 'cs_robot_intelligence', 13, 'Thị giác & Học máy Robot', 'Nhận dạng vật thể YOLO, định vị Aruco, học tăng cường Reinforcement Learning cho cánh tay robot.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('decision-behavior', 'cs_robot_intelligence', 13, 'Ra quyết định & Hành vi', 'Kiến trúc ra quyết định Behavior Trees, máy trạng thái FSM và điều phối đa robot Swarm.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robot_intelligence (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_robint_01', 
    'cs_robot_intelligence', 
    13, 
    'SLAM & Định vị', 
    'Bản đồ & Định vị SLAM (Simultaneous Localization and Mapping)', 
    '### 1. Khái niệm SLAM
SLAM là bài toán đồng thời xây dựng bản đồ của môi trường chưa biết (Mapping) và xác định vị trí của robot trong bản đồ đó (Localization).
- **Vòng lặp con gà và quả trứng:** Để vẽ bản đồ tốt, ta cần biết vị trí robot chính xác; để biết vị trí chính xác, ta cần một bản đồ tốt.

### 2. Các phương pháp SLAM phổ biến
- **Lidar SLAM (như Cartographer, Gmapping):** Sử dụng các tia quét khoảng cách laser LiDAR để khớp đám mây điểm (Scan Matching) tìm độ dịch chuyển và vẽ bản đồ lưới chiếm chỗ (Occupancy Grid Map).
- **Visual SLAM (vSLAM như ORB-SLAM):** Sử dụng camera RGB-D hoặc camera mono/stereo để trích xuất các điểm đặc trưng hình ảnh (Features), tối ưu hóa cấu trúc từ chuyển động (Structure from Motion - SfM) để ước lượng quỹ đạo.', 
    'core-theory', 
    '["Robot hút bụi tự động sử dụng LiDAR SLAM xoay vòng để vẽ bản đồ căn hộ 2D ngay trong lần dọn dẹp đầu tiên.", "Camera của kính VR Oculus Quest quét các góc bàn ghế để tự định vị vị trí đầu người đeo dựa trên Visual SLAM."]'::jsonb, 
    '["SLAM lưới chiếm chỗ lưu trữ giá trị xác suất từ 0 đến 100 biểu thị khả năng có vật cản tại từng ô lưới vuông.", "Đóng vòng lặp (Loop Closure) là cơ chế phát hiện robot quay lại một vị trí đã đi qua trong quá khứ để triệt tiêu sai số lũy kế của toàn bộ bản đồ.", "Visual SLAM nhạy cảm với sự thay đổi ánh sáng đột ngột và bề mặt tường trắng trơn không có điểm đặc trưng (textureless)."]'::jsonb, 
    7, 
    TRUE,
    'slam-localization'
  ),
  (
    'cs_robint_02', 
    'SLAM & Định vị', 
    13, 
    'SLAM & Định vị', 
    'Lập kế hoạch đường đi toàn cục: A* vs RRT', 
    '### 1. Bài toán Lập kế hoạch đường đi toàn cục (Global Path Planning)
Tìm kiếm lộ trình tối ưu không va chạm đi từ vị trí hiện tại đến vị trí đích dựa trên bản đồ tĩnh đã biết trước.

### 2. Thuật toán A* (A-Star)
Thuật toán tìm kiếm đồ thị heuristic hiệu quả dựa trên lưới ô vuông:
$$f(n) = g(n) + h(n)$$
- $g(n)$: Chi phí thực tế đi từ điểm xuất phát tới nút hiện tại $n$.
- $h(n)$: Chi phí ước lượng heuristic (như khoảng cách Euclid) từ nút $n$ tới đích.
- Ưu điểm: Đảm bảo tìm ra đường đi ngắn nhất nếu hàm heuristic hợp lệ.

### 3. Thuật toán RRT (Rapidly-explored Random Trees)
Thuật toán tìm kiếm ngẫu nhiên bằng cách xây dựng một cây phủ khắp không gian C-Space:
1. Chọn một điểm ngẫu nhiên $q_{\text{rand}}$ trong không gian.
2. Tìm nút gần nhất trên cây $q_{\text{near}}$.
3. Phát triển một nhánh nhỏ từ $q_{\text{near}}$ hướng về $q_{\text{rand}}$ tạo thành nút mới $q_{\text{new}}$ nếu không va chạm.
- Ưu điểm: Phù hợp cho không gian C-Space số chiều lớn (như cánh tay robot 7 khớp).', 
    'core-theory', 
    '["Robot tự hành AMR dùng thuật toán A* để tính toán đường đi tối ưu chạy qua các hành lang nhà kho dạng lưới vuông.", "Cánh tay robot 6 trục dùng RRT Connect để luồn lách qua các khe hở hẹp gắp linh kiện cơ khí."]'::jsonb, 
    '["A* hoạt động rất tốt cho bài toán 2D phẳng nhưng bị bùng nổ không gian tìm kiếm khi số bậc tự do robot tăng cao.", "RRT chỉ bảo đảm tính đầy đủ xác suất (probabilistic completeness) - chắc chắn tìm được đường đi nếu chạy đủ lâu, chứ không bảo đảm đường đi ngắn nhất.", "Thuật toán RRT* nâng cấp RRT bằng cách tối ưu hóa lại các kết nối cây xung quanh nút mới để tìm đường đi tiệm cận tối ưu."]'::jsonb, 
    7, 
    TRUE,
    'path-planning'
  ),
  (
    'cs_robint_03', 
    'cs_robot_intelligence', 
    13, 
    'Lập kế hoạch đường đi', 
    'Tránh vật cản động cục bộ: DWA vs TEB', 
    '### 1. Kế hoạch quỹ đạo cục bộ (Local Planner)
Điều khiển robot bám theo đường đi toàn cục đồng thời chủ động né tránh các vật cản động xuất hiện bất ngờ (con người, robot khác).

### 2. Thuật toán DWA (Dynamic Window Approach)
DWA lập kế hoạch trực tiếp trong không gian vận tốc của robot ($v, \omega$):
1. Giới hạn các cặp vận tốc khả thi mà robot có thể đạt tới trong chu kỳ tiếp theo dựa trên giới hạn gia tốc vật lý (Cửa sổ động).
2. Mô phỏng quỹ đạo đi thử cho từng cặp vận tốc trong khoảng thời gian ngắn.
3. Chấm điểm các quỹ đạo dựa trên tiêu chí: khoảng cách tới đích, tốc độ tiến, và khoảng cách an toàn tới vật cản. Chọn cặp vận tốc điểm cao nhất.

### 3. Thuật toán TEB (Timed-Elastic-Band)
TEB biến đổi bài toán tìm quỹ đạo thành bài toán tối ưu hóa đa mục tiêu:
- Coi quỹ đạo như một chuỗi các trạng thái liên kết đàn hồi chịu lực đẩy của vật cản và lực hút của đích đến.
- Tối ưu hóa đồng thời thời gian di chuyển và giới hạn vận tốc/gia tốc cơ học.', 
    'core-theory', 
    '["Robot AMR trong siêu thị tự động giảm tốc độ và né sang bên khi phát hiện hành khách chắn trước mặt nhờ bộ điều khiển DWA.", "Robot Mecanum dùng TEB Local Planner để tận dụng khả năng tịnh tiến ngang đi chéo qua chướng ngại vật hẹp."]'::jsonb, 
    '["DWA chạy cực kỳ nhanh và nhẹ, phù hợp cho vi xử lý nhúng của robot tự hành bình dân.", "TEB hỗ trợ tốt các ràng buộc non-holonomic phức tạp của xe kéo hoặc xe vi sai nhưng tốn nhiều năng lực CPU.", "Local planner chạy ở tần số cao (10Hz đến 50Hz) để liên tục phản ứng với thay đổi môi trường tức thời."]'::jsonb, 
    7, 
    TRUE,
    'path-planning'
  ),
  (
    'cs_robint_04', 
    'cs_robot_intelligence', 
    13, 
    'Thị giác & Học máy Robot', 
    'Thị giác máy tính trong Robotics: YOLO & Aruco Markers', 
    '### 1. Vai trò của Thị giác máy tính
Thị giác máy tính (Computer Vision) cung cấp khả năng nhận biết ngữ nghĩa môi trường (Semantic perception) cho robot.

### 2. Nhận diện vật thể với YOLO (You Only Look Once)
Mạng thần kinh tích chập sâu (CNN) nhận diện vật thể thời gian thực:
- Đầu ra là vị trí hộp bao (Bounding Box) và nhãn loại vật thể (Class label) của đồ vật trước camera robot.
- Ứng dụng: Robot phân loại rác nhận diện chai nhựa, lon nhôm.

### 3. Định vị pose với Aruco Marker
Aruco là các thẻ mã vạch hình vuông màu đen trắng có mẫu hoa văn độc nhất:
- Máy ảnh robot chụp thẻ Aruco, dùng thuật toán phối cảnh 3 điểm (PnP) để tính toán chính xác ma trận chuyển đổi 3D của thẻ so với ống kính camera ($T_{\text{marker}}^{\text{cam}}$).
- Ứng dụng: Robot tự hành sạc pin tự động căn chỉnh vị trí docking chính xác đến từng milimet.', 
    'core-theory', 
    '["Cánh tay robot gắp sản phẩm tự động nhận diện hộp quà chạy trên băng chuyền thông qua camera gắn trên đỉnh.", "Robot AGV đi lùi vào gầm kệ hàng nhờ camera hướng lên đọc thẻ Aruco dán dưới đáy kệ."]'::jsonb, 
    '["YOLO xử lý toàn bộ bức ảnh trong một lượt quét mạng duy nhất, bảo đảm tần số khung hình cao (>30fps) trên GPU nhúng.", "Thẻ Aruco tích hợp sẵn mã sửa lỗi Hamming giúp chống nhiễu nhận diện sai trong điều kiện ánh sáng yếu.", "Định vị bằng Aruco Marker có chi phí cực rẻ và độ chính xác milimet nhưng đòi hỏi thẻ không bị che khuất."]'::jsonb, 
    6, 
    TRUE,
    'robot-vision-rl'
  ),
  (
    'cs_robint_05', 
    'cs_robot_intelligence', 
    13, 
    'Thị giác & Học máy Robot', 
    'Học tăng cường cho Robot (Reinforcement Learning)', 
    '### 1. Khái niệm Học tăng cường (RL)
Phương pháp huấn luyện robot tự học hành vi thông qua tương tác thử và sai với môi trường để tối đa hóa hàm phần thưởng (Reward function):
- **Agent:** Bộ điều khiển khớp robot.
- **State:** Góc khớp, vận tốc, vị trí vật cần gắp.
- **Action:** Lệnh điện áp / mô-men xoắn khớp.
- **Reward:** Điểm dương khi chạm gần vật, điểm âm khi va chạm lỗi.

### 2. Thuật toán RL cho không gian chuyển động liên tục
Khớp robot di chuyển liên tục, do đó không thể dùng Q-Learning truyền thống. Thay vào đó dùng các thuật toán Policy Gradient:
- **DDPG (Deep Deterministic Policy Gradient):** Học chính sách hành động liên tục.
- **PPO (Proximal Policy Optimization):** Thuật toán học an toàn và ổn định của OpenAI.', 
    'core-theory', 
    '["Bàn tay robot nhiều ngón tự xoay khối Rubik bằng cách huấn luyện hàng triệu lượt trong môi trường mô phỏng MuJoCo.", "Robot 4 chân tự học đi bộ trên cát lún thông qua giải thuật PPO tích hợp mạng neuron recurrent."]'::jsonb, 
    '["Thách thức lớn nhất của RL cho robot là Sim-to-Real gap - sự lệch pha giữa mô phỏng ảo và thế giới thật khiến mô hình học tốt trong ảo nhưng chạy lỗi ngoài thật.", "Hàm phần thưởng thiết kế không khéo dễ dẫn đến hành vi gian lận (ví dụ robot chọn tự hủy để tránh bị điểm phạt va chạm).", "Domain Randomization ngẫu nhiên hóa các thông số vật lý (ma sát, khối lượng) trong mô phỏng để tăng tính thích nghi cho mô hình khi deploy ra thật."]'::jsonb, 
    7, 
    TRUE,
    'robot-vision-rl'
  ),
  (
    'cs_robint_06', 
    'cs_robot_intelligence', 
    13, 
    'Ra quyết định & Hành vi', 
    'Behavior Trees vs Finite State Machines trong thiết kế hành vi', 
    '### 1. Máy trạng thái hữu hạn (Finite State Machines - FSM)
Cơ chế điều khiển hành vi cổ điển: robot hoạt động trong một tập hợp các trạng thái cố định (ví dụ: `IDLE`, `NAVIGATING`, `DOCKING`). Sự chuyển đổi trạng thái xảy ra do các sự kiện (Events).
- **Nhược điểm:** Khi số lượng trạng thái tăng, số lượng đường chuyển trạng thái tăng theo cấp số nhân tạo nên đống code rối rắm khó bảo trì (Spaghetti code).

### 2. Cây hành vi (Behavior Trees - BT)
Cấu trúc cây phân cấp quản lý hành vi robot linh hoạt:
- **Nút gốc (Root):** Phát nhịp tic để kích hoạt cây hoạt động.
- **Nút điều phối (Control Nodes):**
  - **Sequence (Tuần tự):** Chạy các nút con lần lượt. Dừng lại báo thất bại nếu có 1 con thất bại. Chỉ báo thành công khi toàn bộ con thành công.
  - **Fallback / Selector (Lựa chọn thay thế):** Thử các phương án con lần lượt. Báo thành công ngay khi có 1 con báo thành công.
- **Nút lá (Action / Condition):** Thực thi lệnh chuyển động hoặc đọc cảm biến kiểm tra điều kiện.', 
    'core-theory', 
    '["Thiết kế cây hành vi cho robot hút bụi: Fallback(Sequence(PinYếu, QuayVềSạc), Sequence(QuétDọn))", "Chuyển đổi trạng thái robot từ dò line sang gắp vật bằng FSM trong Arduino."]'::jsonb, 
    '["Behavior Trees cung cấp tính tái sử dụng và mô-đun hóa cực cao, cho phép chèn các nhánh hành vi mới mà không ảnh hưởng code cũ.", "Cơ chế Tick của BT giúp hệ thống phản ứng nhanh với các điều kiện ngắt khẩn cấp ở mỗi chu kỳ.", "ROS2 tích hợp sẵn thư viện BehaviorTree.CPP làm lõi quản lý hành vi cho Nav2."]'::jsonb, 
    6, 
    TRUE,
    'decision-behavior'
  ),
  (
    'cs_robint_07', 
    'cs_robot_intelligence', 
    13, 
    'SLAM & Định vị', 
    'Định vị trong nhà: UWB, BLE Beacons & Sensor Fusion', 
    '### 1. Thử thách định vị trong nhà (Indoor Localization)
Trong nhà, sóng GPS bị chặn bởi mái bê tông, do đó robot tự hành không thể dùng định vị GPS toàn cầu.

### 2. Công nghệ UWB (Ultra-Wideband)
Sử dụng sóng vô tuyến băng thông siêu rộng phát xung thời gian siêu ngắn:
- Gồm các trạm mốc cố định (Anchors) dán trên tường và đầu thu (Tag) gắn trên robot.
- Đo khoảng cách dựa trên nguyên lý **TWR (Two-Way Ranging)** hoặc **TDoA (Time Difference of Arrival)** độ chính xác đạt tới 5cm - 10cm.

### 3. Hợp nhất cảm biến (Sensor Fusion)
Để định vị tin cậy, robot hợp nhất dữ liệu từ nhiều nguồn:
- **IMU:** Phản hồi nhanh nhưng dễ trôi sai số.
- **Odometry bánh xe:** Tốt ở khoảng cách ngắn nhưng trượt bánh.
- **UWB / LiDAR SLAM:** Độ chính xác cao nhưng tần số thấp.
- Thuật toán **Lọc Kalman mở rộng (EKF - Extended Kalman Filter)** hoặc **Lọc hạt (Particle Filter)** liên tục ước lượng trạng thái tối ưu.', 
    'core-theory', 
    '["Robot AMR chạy trong kho lạnh lớn dùng 4 trạm UWB Anchor ở 4 góc để tự xác định tọa độ x, y thông qua thuật toán tam giác lượng.", "Lọc Kalman tích hợp gia tốc IMU và vận tốc bánh xe để ước lượng vị trí robot mượt mà tần số 100Hz."]'::jsonb, 
    '["UWB hoạt động tốt nhất trong điều kiện tầm nhìn thẳng (LOS - Line of Sight), sóng dễ bị suy hao khi đi xuyên qua kệ sắt dày.", "Extended Kalman Filter tuyến tính hóa phương trình động học phi tuyến bằng ma trận Jacobian tại mỗi bước dự báo.", "BLE (Bluetooth Low Energy) Beacons có chi phí rẻ hơn UWB nhưng độ chính xác kém hơn (1m - 2m) do nhạy cảm với nhiễu phản xạ tường."]'::jsonb, 
    7, 
    TRUE,
    'slam-localization'
  ),
  (
    'cs_robint_08', 
    'cs_robot_intelligence', 
    13, 
    'Ra quyết định & Hành vi', 
    'Định hướng điều phối đa Robot (Multi-Agent System & Swarm)', 
    '### 1. Phối hợp đa Robot (Multi-Robot Coordination)
Sự kết hợp của nhiều robot độc lập cùng thực hiện một nhiệm vụ chung (như gom hàng trong kho thông minh của Amazon).

### 2. Các kiến trúc điều phối
- **Tập trung (Centralized):** Một máy chủ trung tâm quản lý toàn bộ trạng thái, lập lộ trình không va chạm cho từng robot và gửi lệnh trực tiếp. Nhược điểm: Dễ sập toàn hệ thống nếu máy chủ mất kết nối.
- **Phân tán (Decentralized):** Mỗi robot tự tính toán đường đi, trao đổi thông tin cục bộ với các robot xung quanh để tự thương lượng thứ tự đi qua giao lộ.

### 3. Swarm Robotics (Robotics bầy đàn)
Mô phỏng hành vi của bầy kiến, bầy ong. Hàng trăm robot giá rẻ tự tổ chức hành vi phức tạp (như xếp hình xếp chữ trên không trung) dựa trên các quy tắc giao tiếp cực kỳ đơn giản với các robot kề cạnh.', 
    'core-theory', 
    '["Hệ thống 500 robot Kiva vận hành trong kho Amazon phối hợp đi qua các giao lộ bằng bản đồ đặt chỗ trước từ máy chủ.", "Màn trình diễn ánh sáng nghệ thuật của 1000 flycam tự động bay theo quỹ đạo 3D lập trước."]'::jsonb, 
    '["Thuật toán phân bổ tác vụ (Task Allocation) giải quyết bài toán tối ưu phân chia robot nào đi lấy kệ hàng nào gần nhất.", "Giao tiếp mạng nội bộ không dây (như Wi-Fi Mesh hoặc ZigBee) là mạch máu sống còn cho hệ thống đa robot phân tán.", "Tránh va chạm đa robot thường dùng mô hình ORCA (Optimal Reciprocal Collision Avoidance)."]'::jsonb, 
    6, 
    TRUE,
    'decision-behavior'
  ),
  (
    'cs_robint_09', 
    'cs_robot_intelligence', 
    13, 
    'Thị giác & Học máy Robot', 
    'Tương tác Người - Robot: Thiết kế cử chỉ & HMI', 
    '### 1. Tương tác Người - Robot (HRI - Human-Robot Interaction)
Nghiên cứu các giao thức giao tiếp tự nhiên giữa con người và robot.

### 2. Nhận diện cử chỉ (Gesture Recognition)
Sử dụng camera RGB hoặc camera Depth để đọc chuyển động tay, cơ thể người dùng:
- Thuật toán trích xuất các điểm mốc xương bàn tay (Mediapipe Hand landmarks) để nhận diện ký hiệu ngón tay.
- Ứng dụng: Robot phục vụ dừng lại khi người dùng giơ tay báo hiệu dừng.

### 3. Nhận diện giọng nói & Đối thoại
- Tích hợp mô hình ASR (Automatic Speech Recognition) để chuyển giọng nói sang văn bản.
- Dùng mô hình ngôn ngữ lớn (LLM) hoặc cây kịch bản hội thoại để hiểu ý định của con người và sinh câu phản hồi tự nhiên.', 
    'core-theory', 
    '["Người dùng giơ ngón tay cái hướng lên (Like gesture) để ra lệnh cho robot nâng bàn nâng lên cao.", "Robot lễ tân bệnh viện nhận diện câu hỏi của bệnh nhân để tự động chỉ đường tới phòng khám tương ứng."]'::jsonb, 
    '["HRI tốt yêu cầu robot phải có phản hồi thị giác hoặc âm thanh (như nhấp nháy mắt led) để con người biết robot đã nhận lệnh.", "Camera độ sâu hoạt động tốt trong nhà nhưng dễ bị lóa ngoài trời nắng do ánh sáng hồng ngoại từ mặt trời.", "Độ trễ xử lý giọng nói (ASR + LLM + TTS) cần giữ dưới 1.5 giây để bảo đảm hội thoại tự nhiên."]'::jsonb, 
    6, 
    TRUE,
    'robot-vision-rl'
  ),
  (
    'cs_robint_10', 
    'cs_robot_intelligence', 
    13, 
    'Ra quyết định & Hành vi', 
    'Hệ thống tránh vật cản dựa trên mô hình hình học lực cản ảo (APF)', 
    '### 1. Trường lực nhân tạo (Artificial Potential Field - APF)
Thuật toán tránh vật cản thời gian thực cực kỳ trực quan dựa trên mô hình lực vật lý ảo:
- **Lực hút mục tiêu (Attractive Force):** Mục tiêu đích đến tạo ra một lực hút kéo robot về phía nó. Lực hút tăng dần khi robot ở xa đích:
  $$F_{\text{att}}(x) = -K_{\text{att}} (x - x_{\text{goal}})$$
- **Lực đẩy vật cản (Repulsive Force):** Mỗi chướng ngại vật phát ra một trường lực đẩy xung quanh nó. Lực đẩy cực lớn khi robot ở rất gần vật cản và bằng 0 khi nằm ngoài vùng ảnh hưởng:
  $$F_{\text{rep}}(x) = K_{\text{rep}} \left( \frac{1}{\rho(x)} - \frac{1}{\rho_0} \right) \frac{1}{\rho^2(x)} \nabla \rho(x)$$

### 2. Tổng hợp lực điều khiển
Robot di chuyển theo hướng của vector tổng lực:
$$F_{\text{total}} = F_{\text{att}} + F_{\text{rep}}$$
- **Nhược điểm:** Dễ rơi vào điểm tối tiểu cục bộ (Local Minimum) nơi lực đẩy và lực hút triệt tiêu nhau khiến robot bị kẹt đứng trước khi tới đích.', 
    'core-theory', 
    '["Robot tự hành AMR luồn qua khe giữa hai bàn nhờ lực đẩy ảo phát ra từ hai góc bàn cân bằng lực tiến.", "Robot bị kẹt cứng trong hành lang hình chữ U do lực đẩy của vách chữ U triệt tiêu hoàn toàn lực hút hướng tới đích nằm sau vách."]'::jsonb, 
    '["APF chạy cực kỳ nhanh vì chỉ tốn vài phép tính toán vector số học tức thời.", "Khắc phục local minimum bằng cách thêm lực ngẫu nhiên (Random Walk) hoặc kết hợp với giải thuật lập đường đi toàn cục A*.", "Lực đẩy APF hoạt động hiệu quả như một lớp phòng thủ an toàn cuối cùng đặt ngay sát robot."]'::jsonb, 
    7, 
    TRUE,
    'decision-behavior'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_robint_01', 'slam-localization', 'lesson', 'Bản đồ & Định vị SLAM (Simultaneous Localization and Mapping)', '{"lesson_id": "cs_robint_01"}'::jsonb, 10, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_02', 'path-planning', 'lesson', 'Lập kế hoạch đường đi toàn cục: A* vs RRT', '{"lesson_id": "cs_robint_02"}'::jsonb, 10, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_03', 'path-planning', 'lesson', 'Tránh vật cản động cục bộ: DWA vs TEB', '{"lesson_id": "cs_robint_03"}'::jsonb, 20, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_04', 'robot-vision-rl', 'lesson', 'Thị giác máy tính trong Robotics: YOLO & Aruco Markers', '{"lesson_id": "cs_robint_04"}'::jsonb, 10, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_05', 'robot-vision-rl', 'lesson', 'Học tăng cường cho Robot (Reinforcement Learning)', '{"lesson_id": "cs_robint_05"}'::jsonb, 20, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_06', 'decision-behavior', 'lesson', 'Behavior Trees vs Finite State Machines trong thiết kế hành vi', '{"lesson_id": "cs_robint_06"}'::jsonb, 10, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_07', 'slam-localization', 'lesson', 'Định vị trong nhà: UWB, BLE Beacons & Sensor Fusion', '{"lesson_id": "cs_robint_07"}'::jsonb, 20, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_08', 'decision-behavior', 'lesson', 'Định hướng điều phối đa Robot (Multi-Agent System & Swarm)', '{"lesson_id": "cs_robint_08"}'::jsonb, 20, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_09', 'robot-vision-rl', 'lesson', 'Tương tác Người - Robot: Thiết kế cử chỉ & HMI', '{"lesson_id": "cs_robint_09"}'::jsonb, 30, 10, 20, 'cs_robot_intelligence', 13),
  ('act-lesson-cs_robint_10', 'decision-behavior', 'lesson', 'Hệ thống tránh vật cản dựa trên mô hình hình học lực cản ảo (APF)', '{"lesson_id": "cs_robint_10"}'::jsonb, 30, 10, 20, 'cs_robot_intelligence', 13)
ON CONFLICT (id) DO UPDATE SET
  topic_id = EXCLUDED.topic_id,
  activity_type = EXCLUDED.activity_type,
  title = EXCLUDED.title,
  config = EXCLUDED.config,
  sort_order = EXCLUDED.sort_order,
  reward_np = EXCLUDED.reward_np,
  reward_xp = EXCLUDED.reward_xp,
  subject = EXCLUDED.subject,
  grade_tier = EXCLUDED.grade_tier;

COMMIT;
