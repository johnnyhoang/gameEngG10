-- SQL migration to seed topics and 10 core lessons for cs_robotics_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robotics_engineering (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('design-simulation', 'cs_robotics_engineering', 13, 'Thiết kế & Mô phỏng', 'Tính toán chọn động cơ hộp số, viết file URDF cấu trúc link/joint, mô phỏng Gazebo.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('integration-qos', 'cs_robotics_engineering', 13, 'Tích hợp hệ thống & Mạng', 'Tích hợp phần mềm, middleware DDS, cấu hình chất lượng dịch vụ QoS, Fleet Management.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('testing-calibration', 'cs_robotics_engineering', 13, 'Kiểm thử & Hiệu chuẩn', 'Kiểm thử Hardware-in-the-Loop HIL, hiệu chuẩn toàn hệ thống Camera-LiDAR, đồng bộ thời gian nhãn quét.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('safety-packaging', 'cs_robotics_engineering', 13, 'Tiêu chuẩn an toàn & Đóng gói', 'Tiêu chuẩn CE ISO 12100 đánh giá rủi ro, phân tích lỗi FMEA, đóng gói ROS2 package CMakeLists.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robotics_engineering (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_robeng_01', 
    'cs_robotics_engineering', 
    13, 
    'Thiết kế & Mô phỏng', 
    'Quy trình chọn lựa Động cơ & Hộp số giảm tốc cho Robot', 
    '### 1. Phân tích tải trọng cơ học
Để chọn động cơ phù hợp cho khớp robot, ta phải tính toán:
- **Mô-men xoắn tĩnh tối đa ($\tau_{\text{static}}$):** Xuất hiện khi cánh tay vươn dài nhất mang vật nặng (mô-men do trọng lực $M = m \cdot g \cdot L$).
- **Mô-men xoắn động ($\tau_{\text{dynamic}}$):** Xuất hiện khi gia tốc quay đột ngột ($\tau = I \cdot \alpha$).

### 2. Vai trò của Hộp số giảm tốc (Gearbox)
Động cơ điện BLDC thường quay rất nhanh nhưng mô-men yếu. Hộp số giúp:
- Giảm tốc độ quay đi $N$ lần.
- Tăng mô-men xoắn đầu ra lên $N$ lần:
  $$\tau_{\text{output}} = \eta \cdot N \cdot \tau_{\text{motor}}$$
  Trong đó $\eta$ là hiệu suất cơ học hộp số.
- Các dòng hộp số giảm tốc chuẩn cho robot: Bánh răng hành tinh (Planetary), Harmonic Drive (cho độ rơ bằng không), Cycloidal Drive (chịu tải sốc lớn).', 
    'core-theory', 
    '["Tính toán chọn động cơ BLDC 200W kết hợp hộp số Harmonic tỉ số truyền 1:100 để gánh khớp vai robot nâng tải 5kg.", "Vẽ đồ thị đặc tính Tốc độ - Mô-men (Speed-Torque curve) để xác định điểm làm việc tối ưu của động cơ."]'::jsonb, 
    '["Mô-men quán tính I của tải trọng tăng theo hàm bình phương khoảng cách: I = m * R^2.", "Hiện tượng giật ngược khớp (back-driving) xảy ra khi lực ngoài đẩy khâu cuối làm động cơ tự quay ngược sinh điện phản hồi.", "Hộp số Harmonic Drive có cấu trúc màng răng mềm, triệt tiêu hoàn toàn khe hở cơ học (zero backlash) nhưng giá thành rất đắt."]'::jsonb, 
    6, 
    TRUE,
    'design-simulation'
  ),
  (
    'cs_robeng_02', 
    'Thiết kế & Mô phỏng', 
    13, 
    'Thiết kế & Mô phỏng', 
    'Mô tả cấu trúc Robot bằng URDF & Mô phỏng vật lý trong Gazebo', 
    '### 1. File URDF (Unified Robot Description Format)
URDF là tệp định dạng XML tiêu chuẩn trong ROS/ROS2 dùng để mô tả toàn bộ cấu trúc cơ học của robot:
- **Link (Liên kết):** Biểu diễn các khâu cứng của robot, chứa thông số hình học (Visual), va chạm (Collision) và đặc tính quán tính (Inertial: khối lượng, ma trận quán tính $I$).
- **Joint (Khớp):** Biểu diễn liên kết giữa 2 link kề nhau (khớp xoay revolute, khớp trượt prismatic, khớp cố định fixed). Xác định vị trí tương đối và giới hạn góc xoay.

### 2. Mô phỏng vật lý Gazebo
Gazebo đọc file URDF để dựng mô hình 3D tương tác thế giới ảo:
- Mô phỏng trọng lực, lực ma sát lốp xe trên sàn, lực va đập cơ học thời gian thực nhờ các engine vật lý (ODE, Bullet).
- Cho phép giả lập quét tia LiDAR, camera để kiểm thử phần mềm trước khi nạp mạch thật.', 
    'core-theory', 
    '["Viết tệp urdf XML định nghĩa khớp bánh xe trái dạng revolute nối link thân chassis với link bánh xe.", "Cấu hình plugin gazebo_ros_diff_drive trong URDF để giả lập điều khiển robot bánh vi sai nhận topic cmd_vel."]'::jsonb, 
    '["Ma trận quán tính (Inertia Matrix) trong thẻ inertial của URDF quyết định phản ứng động lực học của robot khi tăng tốc quay.", "Thẻ collision định nghĩa hình dáng hình học đơn giản (như hộp, xy lanh) để tính toán va chạm nhanh, thẻ visual định nghĩa mesh CAD đẹp mắt cho người nhìn.", " Gazebo Classic sử dụng SDF làm định dạng nội bộ, ROS2 tự động chuyển đổi URDF sang SDF khi nạp mô hình vào môi trường mô phỏng."]'::jsonb, 
    6, 
    TRUE,
    'design-simulation'
  ),
  (
    'cs_robeng_03', 
    'Tích hợp hệ thống & Mạng', 
    13, 
    'Tích hợp hệ thống & Mạng', 
    'Cấu hình DDS & Tối ưu hóa QoS trong mạng ROS2', 
    '### 1. DDS (Data Distribution Service)
DDS là chuẩn truyền thông middleware phân tán dưới lớp ROS2:
- Giao tiếp ngang hàng (peer-to-peer), tự phát hiện nút (Discovery), không cần Master node trung gian như ROS1.
- Gửi nhận gói tin qua giao thức UDP/IP.

### 2. Chất lượng dịch vụ (QoS - Quality of Service)
ROS2 cho phép cấu hình QoS linh hoạt cho từng Topic:
- **History (Độ sâu hàng đợi):** `Keep last` (chỉ giữ N tin nhắn cuối) hoặc `Keep all`.
- **Reliability (Độ tin cậy):**
  - `Reliable`: Bảo đảm gửi lại gói tin nếu mất (dùng cho lệnh điều khiển quan trọng).
  - `Best effort`: Gửi nhanh nhất có thể, mất tin nhắn thì bỏ qua (dùng cho LiDAR, Camera dữ liệu lớn tần số cao).
- **Durability (Độ bền vững):**
  - `Transient local`: Lưu trữ tin nhắn cũ để gửi cho subscriber mới kết nối vào (dùng cho bản đồ `/map`).
  - `Volatile`: Chỉ nhận tin nhắn phát sinh sau khi subscribe.', 
    'core-theory', 
    '["Cấu hình QoS Best effort cho topic quét LiDAR `/scan` tần số 10Hz để tránh nghẽn băng thông mạng wifi cục bộ.", "Cấu hình QoS Transient local cho topic `/map` để robot mới khởi chạy lập tức nhận được bản đồ tĩnh cũ."]'::jsonb, 
    '["DDS sử dụng tệp cấu hình XML riêng (như FastDDS, CycloneDDS) để phân chia Domain ID tránh các nhóm robot trùng kênh phát tin chèn nhiễu nhau.", "QoS không khớp nhau (incompatible QoS) giữa publisher và subscriber sẽ làm hai node không thể kết nối giao tiếp với nhau.", "Độc lập mạng giúp ROS2 ổn định cao, lỗi sập một node không ảnh hưởng tới kết nối truyền thông của các node còn lại."]'::jsonb, 
    7, 
    TRUE,
    'integration-qos'
  ),
  (
    'cs_robeng_04', 
    'Kiểm thử & Hiệu chuẩn', 
    13, 
    'Kiểm thử & Hiệu chuẩn', 
    'Kiểm thử Hardware-in-the-Loop (HIL) cho Robot', 
    '### 1. Khái niệm HIL Testing
Phương pháp kiểm thử hệ thống nhúng trong đó vi điều khiển thật chạy firmware thật được kết nối trực tiếp với một máy tính mô phỏng thời gian thực:
- Máy tính mô phỏng chạy mô hình toán học động học robot và mô phỏng cảm biến (LiDAR ảo, IMU ảo), chuyển đổi thành tín hiệu điện vật lý (xung đếm encoder, điện áp ADC) bơm trực tiếp vào các chân IO của MCU thật.
- MCU thật xuất lệnh điều khiển (xung PWM) gửi ngược lại máy tính mô phỏng.

### 2. Ý nghĩa an toàn vượt trội
Cho phép kiểm thử các tình huống nguy hiểm cực đoan (như robot lao dốc mất phanh, pin quá nhiệt bốc cháy) một cách an toàn tuyệt đối trong phòng lab mà không sợ gãy hỏng cơ khí hay gây hỏa hoạn thực tế.', 
    'core-theory', 
    '["Kết nối bo mạch điều khiển STM32 lái xe tự hành vào bộ giả lập thời gian thực dSPACE để kiểm thử thuật toán phanh khẩn cấp khẩn cấp.", "Giả lập tín hiệu sườn xung encoder tần số 50kHz bơm vào cổng timer STM32 để thử nghiệm giới hạn tốc độ xử lý."]'::jsonb, 
    '["HIL nằm giữa mô phỏng phần mềm thuần túy (SIL - Software-in-the-Loop) và kiểm thử thực tế trên xe thật (Vehicle Testing).", "Đòi hỏi máy tính mô phỏng phải chạy hệ điều hành thời gian thực (RTOS PC) để bảo đảm vòng điều khiển đồng bộ tuyệt đối cấp micro-giây.", "HIL giúp phát hiện các lỗi bất đồng bộ xung nhịp phần cứng và lỗi bộ nhớ đệm driver trước khi sản xuất hàng loạt."]'::jsonb, 
    7, 
    TRUE,
    'testing-calibration'
  ),
  (
    'cs_robeng_05', 
    'Thiết kế & Mô phỏng', 
    13, 
    'Thiết kế & Mô phỏng', 
    'Kiểu dáng công nghiệp & Gia công cơ khí chính xác cho Robot', 
    '### 1. Các phương pháp gia công cơ khí phổ biến
- **Phay CNC (Computer Numerical Control):** Cắt gọt phôi kim loại (nhôm 6061, thép) bằng dao cắt tự động điều khiển số. Độ chính xác cực cao ($<0.01\,\text{mm}$), độ bền cơ học lớn, dùng làm khung xương chịu lực chính cho robot.
- **In 3D FDM (Fused Deposition Modeling):** Bồi đắp nhựa nóng chảy (PLA, ABS, PETG) theo lớp. Giá rẻ, chế tạo mẫu thử (prototype) hình dáng phức tạp nhanh.
- **In 3D SLA (Stereolithography):** Hóa cứng nhựa lỏng polymer bằng tia UV. Độ phân giải bề mặt cực mịn, dùng làm chi tiết cơ khí nhỏ thẩm mỹ.

### 2. Thiết kế lắp ráp cơ khí chính xác
Phải tính toán dung sai (tolerances) lắp gá vòng bi, khe hở hộp số bánh răng để tránh hiện tượng kẹt khớp hoặc rơ khớp lỏng lẻo.', 
    'core-theory', 
    '["Gia công phay CNC khung đỡ động cơ bằng nhôm 6061 đạt dung sai kích thước lắp vòng bi 22mm H7 (+0.021mm).", "In 3D vỏ hộp bảo vệ mạch điều khiển ESP32 bằng nhựa ABS chịu nhiệt."]'::jsonb, 
    '["Vật liệu nhôm 6061 được chọn phổ biến trong robot nhờ tỷ lệ độ bền trên khối lượng tốt và dễ gia công cắt gọt.", "In 3D FDM có nhược điểm chịu lực kém dọc theo phương xếp lớp (độ bền dị hướng), chi tiết chịu tải lớn dễ nứt toác theo thớ nhựa.", "Dung sai kích thước quy định giới hạn sai số cho phép khi chế tạo cơ khí để các cấu kiện sản xuất độc lập vẫn lắp khớp vừa vặn."]'::jsonb, 
    5, 
    TRUE,
    'design-simulation'
  ),
  (
    'cs_robeng_06', 
    'Thiết kế & Mô phỏng', 
    13, 
    'Thiết kế & Mô phỏng', 
    'Quản lý rủi ro FMEA trong thiết kế hệ thống Robot', 
    '### 1. Khái niệm FMEA (Failure Mode and Effects Analysis)
Phương pháp phân tích kỹ thuật hệ thống nhằm xác định các lỗi hư hỏng tiềm ẩn, đánh giá hậu quả và đề xuất giải pháp khắc phục ngay từ khâu thiết kế:
- **RPN (Risk Priority Number - Chỉ số ưu tiên rủi ro):**
  $$\text{RPN} = \text{Severity (Mức nghiêm trọng)} \times \text{Occurrence (Tần suất xuất hiện)} \times \text{Detection (Khả năng phát hiện)}$$
  Các lỗi có RPN cao nhất bắt buộc phải được xử lý thiết kế lại.

### 2. Thiết kế hệ thống dự phòng (Redundancy Design)
- Dự phòng phần cứng: Sử dụng 2 IMU chạy song song, nếu 1 IMU báo lỗi lệch pha, MCU tự động chuyển sang đọc IMU thứ 2.
- Thiết kế mạch bảo vệ điện giới hạn phần cứng (Fail-safe).', 
    'core-theory', 
    '["Phân tích lỗi kẹt phanh cơ học của robot AMR: Severity = 9 (rất cao), Occurrence = 2 (thấp), Detection = 5 (trung bình) -> RPN = 90. Giải pháp: Thêm mạch ngắt điện cơ độc lập thứ hai.", "Thiết kế mạch dự phòng nguồn điện kép cho robot y tế."]'::jsonb, 
    '["Severity chấm điểm từ 1 (không ảnh hưởng) đến 10 (gây nguy hiểm tính mạng con người).", "FMEA giúp đội ngũ kỹ sư loại bỏ các điểm hỏng hóc đơn lẻ (Single Point of Failure - SPoF) có nguy cơ làm sụp đổ toàn bộ hoạt động của robot.", "Quy trình FMEA bắt buộc phải được rà soát định kỳ mỗi khi cập nhật thiết kế cơ khí hoặc nâng cấp mạch điện."]'::jsonb, 
    6, 
    TRUE,
    'design-simulation'
  ),
  (
    'cs_robeng_07', 
    'Tích hợp hệ thống & Mạng', 
    13, 
    'Tích hợp hệ thống & Mạng', 
    'Quản lý hạm đội Robot (Fleet Management) trong nhà kho thông minh', 
    '### 1. Khái niệm Fleet Management
Hệ thống máy chủ trung tâm giám sát và điều phối hoạt động của hàng chục đến hàng trăm robot tự hành (AMR/AGV) di chuyển đồng thời trong cùng một mặt bằng nhà kho:
- Giao tiếp qua mạng Wi-Fi sử dụng giao thức chuẩn công nghiệp như VDA 5050.

### 2. Thuật toán phân luồng giao thông (Traffic Control)
Để tránh các robot đâm nhau hoặc kẹt cứng (deadlock) tại các ngã tư ngõ hẹp:
- **Phân luồng dựa trên đặt chỗ vùng (Zone-blocking):** Bản đồ được chia thành các khu vực ảo độc quyền. Robot muốn đi vào ngã tư phải gửi yêu cầu đặt chỗ lên máy chủ; máy chủ chỉ cấp phép cho duy nhất 1 robot đi vào tại một thời điểm, các robot khác phải xếp hàng chờ ngoài vạch dừng.', 
    'core-theory', 
    '["Máy chủ Fleet Manager chạy giao thức VDA 5050 gửi danh sách các điểm mốc (waypoints) tiếp theo cho 20 robot AMR chuyển hàng.", "Giải quyết xung đột tại ngã tư nhà kho: xe AMR1 được ưu tiên đi trước do mang hàng khẩn cấp, xe AMR2 đứng yên chờ ngoài zone ngã tư."]'::jsonb, 
    '["Giao thức VDA 5050 chuẩn hóa giao tiếp giữa xe tự hành và phần mềm quản lý trung tâm, cho phép tích hợp các dòng xe của nhiều hãng khác nhau chung 1 hệ thống.", "Fleet Management theo dõi liên tục dung lượng pin của từng xe để tự động lập lịch điều phối xe về trạm sạc tự động khi rảnh việc.", "Khi mạng Wi-Fi nhà kho bị mất kết nối tạm thời, robot bắt buộc phải tự kích hoạt hành vi đứng chờ an toàn thay vì tự ý di chuyển mò mẫm."]'::jsonb, 
    7, 
    TRUE,
    'integration-qos'
  ),
  (
    'cs_robeng_08', 
    'Tiêu chuẩn an toàn & Đóng gói', 
    13, 
    'Tiêu chuẩn an toàn & Đóng gói', 
    'Tiêu chuẩn an toàn cơ khí máy móc quốc tế ISO 12100', 
    '### 1. Quy định của ISO 12100
ISO 12100 là tiêu chuẩn nền tảng toàn cầu hướng dẫn quy trình đánh giá rủi ro và giảm thiểu rủi ro trong thiết kế chế tạo máy móc cơ khí, đặc biệt áp dụng cho robot:
- Quy trình 3 bước giảm thiểu rủi ro:
  1. **Thiết kế an toàn từ gốc (Inherently safe design):** Chọn hình dáng bo tròn, hạn chế tốc độ lực vật lý.
  2. **Giải pháp bảo vệ kỹ thuật (Safeguarding):** Thiết lập hàng rào chắn, lắp LiDAR quét an toàn, nút nhấn E-stop.
  3. **Thông tin cảnh báo (Information for use):** Dán nhãn cảnh báo nguy hiểm, sách hướng dẫn vận hành.

### 2. Chứng nhận CE (Conformité Européenne)
Chứng chỉ bắt buộc để robot được phép thương mại hóa và vận hành hợp pháp tại thị trường châu Âu, xác nhận robot đạt mọi quy chuẩn an toàn khắt khe.', 
    'core-theory', 
    '["Đánh giá rủi ro gập khớp cánh tay robot: bước thiết kế an toàn từ gốc giới hạn khoảng hở khớp >25mm để ngón tay người không bị kẹp dập.", "Dán nhãn cảnh báo nguy cơ điện giật áp cao trên nắp mở khoang tủ điện robot."]'::jsonb, 
    '["Thiết kế an toàn từ gốc luôn luôn được ưu tiên hàng đầu trước khi tính đến các biện pháp che chắn cơ học hay cảnh báo dán nhãn.", "Mạch rơ-le an toàn kép (Safety Relays) bảo đảm mạch ngắt điện vẫn hoạt động đúng kể cả khi 1 tiếp điểm rơ-le bị dính cháy tiếp xúc.", "CE Marking là tấm thông hành pháp lý khẳng định nhà sản xuất chịu trách nhiệm hoàn toàn về độ an toàn của sản phẩm."]'::jsonb, 
    6, 
    TRUE,
    'safety-packaging'
  ),
  (
    'cs_robeng_09', 
    'Tiêu chuẩn an toàn & Đóng gói', 
    13, 
    'Tiêu chuẩn an toàn & Đóng gói', 
    'Đóng gói ROS2 Package chuyên nghiệp với CMake & package.xml', 
    '### 1. Cấu trúc gói phần mềm ROS2 (ROS2 Package)
Một package là đơn vị tổ chức code độc lập trong ROS2, gồm các file:
- `package.xml`: Khai báo siêu dữ liệu metadata (tên package, phiên bản, tác giả) và danh sách các gói thư viện phụ thuộc để build (`<depend>`, `<build_depend>`).
- `CMakeLists.txt` (đối với C++) hoặc `setup.py` (đối với Python): Hướng dẫn trình biên dịch cách biên dịch mã nguồn thành file thực thi (executable), liên kết thư viện liên kết và cài đặt tài nguyên đích.

### 2. Quy trình biên dịch bằng Colcon
- Sử dụng lệnh `colcon build --symlink-install` tại thư mục workspace để biên dịch toàn bộ các package song song tốc độ cao.', 
    'core-theory', 
    '["Viết tệp package.xml khai báo phụ thuộc vào thư viện `rclcpp` và `sensor_msgs` để biên dịch node đọc camera C++.", "Cấu hình CMakeLists.txt sử dụng hàm `ament_target_dependencies` để liên kết thư viện ROS2 vào file thực thi node."]'::jsonb, 
    '["Sử dụng cờ `--symlink-install` giúp tránh phải biên dịch lại package mỗi khi thay đổi các tệp cấu hình Python launch hoặc YAML config, tiết kiệm cực lớn thời gian.", "Viết unit test gtest trực tiếp tích hợp trong CMakeLists.txt qua ament_add_gtest giúp kiểm tra tự động mã nguồn khi build CI/CD.", "Mỗi package nên có một file README.md mô tả rõ ràng các topic đầu vào ngõ ra và các tham số parameter cấu hình."]'::jsonb, 
    6, 
    TRUE,
    'safety-packaging'
  ),
  (
    'cs_robeng_10', 
    'Kiểm thử & Hiệu chuẩn', 
    13, 
    'Kiểm thử & Hiệu chuẩn', 
    'Hiệu chuẩn cảm biến liên hợp Camera-LiDAR (Sensor Calibration)', 
    '### 1. Sự lệch hệ tọa độ cảm biến
Robot tự hành mang nhiều cảm biến đặt ở các góc khác nhau (ví dụ: LiDAR đặt ở đỉnh xe có hệ tọa độ $L$, camera đặt ở mặt trước có hệ tọa độ $C$):
- Để chồng đè đám mây điểm 3D của LiDAR lên ảnh màu 2D của camera nhằm nhận diện khoảng cách vật thể có màu, ta bắt buộc phải biết chính xác ma trận chuyển đổi tọa độ ngoại ($R, t$) kết nối giữa 2 cảm biến (Extrinsic Calibration).

### 2. Thuật toán hiệu chuẩn Camera-LiDAR
- Sử dụng bia checkerboard lớn hoặc bia tam diện đặc biệt mà cả camera nhìn thấy biên và LiDAR quét thấy mặt phẳng xiên lệch.
- Giải bài toán tối ưu hóa hình học ước lượng ma trận xoay và tịnh tiến để giảm thiểu sai số chiếu lệch điểm mốc giữa 2 hệ quy chiếu.', 
    'core-theory', 
    '["Hiệu chuẩn Extrinsic giữa LiDAR 3D Robosense và Camera Basler bằng bia checkerboard 3D đặt cách robot 2 mét.", "Chạy thuật toán tối ưu hóa Levenberg-Marquardt tìm ma trận chuyển đổi 4x4 kết nối tọa độ LiDAR sang Camera."]'::jsonb, 
    '["Time Synchronization (Đồng bộ thời gian quét) cực kỳ quan trọng: sai lệch nhãn thời gian 50ms giữa ảnh và laser sẽ tạo ra vết quét lệch lớn khi robot di chuyển nhanh.", "Hiện tượng chiếu lệch điểm (reprojection error) đo độ lệch pixel giữa vị trí thực tế của mốc trên ảnh và vị trí điểm 3D LiDAR được chiếu phẳng xuống ảnh qua ma trận hiệu chuẩn.", "Hiệu chuẩn ngoại cảm biến phải được thực hiện lại mỗi khi robot bị rung lắc cơ khí mạnh hoặc va đập làm lệch gá đỡ."]'::jsonb, 
    7, 
    TRUE,
    'testing-calibration'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_robeng_01', 'design-simulation', 'lesson', 'Quy trình chọn lựa Động cơ & Hộp số giảm tốc cho Robot', '{"lesson_id": "cs_robeng_01"}'::jsonb, 10, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_02', 'design-simulation', 'lesson', 'Mô tả cấu trúc Robot bằng URDF & Mô phỏng vật lý trong Gazebo', '{"lesson_id": "cs_robeng_02"}'::jsonb, 20, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_03', 'integration-qos', 'lesson', 'Cấu hình DDS & Tối ưu hóa QoS trong mạng ROS2', '{"lesson_id": "cs_robeng_03"}'::jsonb, 10, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_04', 'testing-calibration', 'lesson', 'Kiểm thử Hardware-in-the-Loop (HIL) cho Robot', '{"lesson_id": "cs_robeng_04"}'::jsonb, 10, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_05', 'design-simulation', 'lesson', 'Kiểu dáng công nghiệp & Gia công cơ khí chính xác cho Robot', '{"lesson_id": "cs_robeng_05"}'::jsonb, 30, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_06', 'design-simulation', 'lesson', 'Quản lý rủi ro FMEA trong thiết kế hệ thống Robot', '{"lesson_id": "cs_robeng_06"}'::jsonb, 40, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_07', 'integration-qos', 'lesson', 'Quản lý hạm đội Robot (Fleet Management) trong nhà kho thông minh', '{"lesson_id": "cs_robeng_07"}'::jsonb, 20, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_08', 'safety-packaging', 'lesson', 'Tiêu chuẩn an toàn cơ khí máy móc quốc tế ISO 12100', '{"lesson_id": "cs_robeng_08"}'::jsonb, 10, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_09', 'safety-packaging', 'lesson', 'Đóng gói ROS2 Package chuyên nghiệp với CMake & package.xml', '{"lesson_id": "cs_robeng_09"}'::jsonb, 20, 10, 20, 'cs_robotics_engineering', 13),
  ('act-lesson-cs_robeng_10', 'testing-calibration', 'lesson', 'Hiệu chuẩn cảm biến liên hợp Camera-LiDAR (Sensor Calibration)', '{"lesson_id": "cs_robeng_10"}'::jsonb, 20, 10, 20, 'cs_robotics_engineering', 13)
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
