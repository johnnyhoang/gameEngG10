-- SQL migration to seed topics and 10 core lessons for cs_robotics_fundamentals (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robotics_fundamentals (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('robot-introduction', 'cs_robotics_fundamentals', 13, 'Tổng quan & Cấu trúc Robot', 'Lịch sử phát triển, không gian cấu hình C-Space, bậc tự do DOF, động cơ chấp hành và thiết kế truyền động.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-kinematics', 'cs_robotics_fundamentals', 13, 'Động học Robot', 'Ma trận chuyển đổi thuần nhất SE(3), quy ước Denavit-Hartenberg, bài toán động học thuận và động học ngược.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-sensing', 'cs_robotics_fundamentals', 13, 'Cảm biến & Phần mềm ROS2', 'Cảm biến trong/ngoài (IMU, LiDAR, Encoders), kiến trúc hệ điều hành robot ROS2 (Nodes, Topics, Services).', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('robot-control', 'cs_robotics_fundamentals', 13, 'Điều khiển & An toàn Robot', 'Bộ điều khiển phản hồi PID, thiết kế vùng làm việc an toàn và tiêu chuẩn an toàn công nghiệp ISO/Cobots.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robotics_fundamentals (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_robfun_01', 
    'cs_robotics_fundamentals', 
    13, 
    'Tổng quan & Cấu trúc Robot', 
    'Giới thiệu tổng quan về Robotics & Phân loại Robot', 
    '### 1. Cấu trúc cơ bản của hệ thống Robot
Một hệ thống robot hoàn chỉnh là sự tích hợp của 3 khối chức năng vật lý cốt lõi:
- **Cảm biến (Sensors):** Tai mắt thu thập dữ liệu trạng thái bên trong robot (góc khớp, vận tốc) và môi trường ngoài (khoảng cách vật cản, bản đồ).
- **Bộ điều khiển (Controller / Brain):** Máy tính nhúng chạy giải thuật xử lý thông tin cảm biến để ra quyết định và tính toán tín hiệu điều khiển.
- **Cơ cấu chấp hành (Actuators):** Các cơ cấu chuyển động cơ khí tạo ra lực/mô-men dịch chuyển robot (động cơ, cánh tay, bánh xe).

### 2. Phân loại Robot
- **Robot thao tác công nghiệp (Manipulators):** Cánh tay robot cố định làm việc trong nhà xưởng (hàn, lắp ráp, đóng gói).
- **Robot di động (Mobile Robots):** AGV (Automated Guided Vehicle) đi theo vạch và AMR (Autonomous Mobile Robot) tự tránh vật cản vận chuyển hàng hóa.
- **Drone / UAV (Unmanned Aerial Vehicle):** Thiết bị bay không người lái.
- **Robot nhân hình (Humanoids):** Robot có hình dáng và chuyển động mô phỏng cơ thể người.', 
    'core-theory', 
    '["Cánh tay robot công nghiệp Fanuc hàn thân xe ô tô trong dây chuyền sản xuất tự động hóa.", "Robot tự hành AMR Boston Dynamics Spot đi tuần tra giám sát công trường xây dựng dùng camera 360 độ."]'::jsonb, 
    '["Robotics là ngành khoa học liên ngành tích hợp Cơ khí, Điện tử, Khoa học máy tính và Tự động hóa.", "Khác với AGV chỉ đi theo lộ trình vạch sẵn cố định, AMR sử dụng LiDAR và SLAM để tự lập đường đi linh hoạt.", "Hệ thống vòng kín (closed-loop) luôn sử dụng dữ liệu cảm biến phản hồi ngược về bộ điều khiển để điều chỉnh sai số tức thời."]'::jsonb, 
    5, 
    TRUE,
    'robot-introduction'
  ),
  (
    'cs_robfun_02', 
    'Tổng quan & Cấu trúc Robot', 
    13, 
    'Tổng quan & Cấu trúc Robot', 
    'Không gian cấu hình & Khớp động học (C-Space & Joints)', 
    '### 1. Không gian cấu hình (Configuration Space - C-Space)
Là tập hợp tất cả các vị trí khả thi của robot. Một cấu hình $q$ xác định vị trí của mọi điểm trên thân robot trong không gian làm việc.
- Robot di động 2D trên mặt sàn phẳng có C-Space biểu diễn bằng $\mathbb{R}^2 \times S^1$ (tọa độ $x, y$ và góc hướng $\theta$).

### 2. Bậc tự do (Degrees of Freedom - DOF)
Số lượng tọa độ độc lập tối thiểu cần thiết để xác định hoàn toàn cấu hình của hệ thống.
- Một vật thể tự do trong không gian 2D có 3 DOF ($x, y, \theta$).
- Một vật thể tự do trong không gian 3D có 6 DOF ($x, y, z$, cuộn Yaw, pitch Pitch, nghiêng Roll).

### 3. Khớp động học (Joints)
- **Khớp quay (Revolute joint - R):** Cho phép một chuyển động quay tương đối quanh trục khớp (1 DOF).
- **Khớp trượt (Prismatic joint - P):** Cho phép một chuyển động tịnh tiến dọc theo trục khớp (1 DOF).
- **Công thức Kutzbach** tính bậc tự do của cơ cấu cơ khí gồm $N$ khâu và $J$ khớp:
  $$\text{DOF} = m(N - 1 - J) + \sum_{i=1}^J f_i$$
  Trong đó $m = 3$ cho cơ cấu phẳng 2D, và $m = 6$ cho cơ cấu không gian 3D; $f_i$ là số bậc tự do của khớp $i$.', 
    'core-theory', 
    '["Cánh tay robot phẳng 2 khâu chỉ sử dụng khớp quay có 2 DOF trong không gian 2D.", "Tính bậc tự do của cơ cấu phẳng 3 khâu có 3 khớp quay: DOF = 3*(3 - 1 - 3) + 3 = 3*(-1) + 3 = 0 (cơ cấu bị khóa cứng, không chuyển động được)."]'::jsonb, 
    '["C-Space giúp lập kế hoạch quỹ đạo dễ dàng bằng cách coi robot là một điểm toán học duy nhất chuyển động trong không gian cấu hình.", "Khớp quay và khớp trượt là hai khớp cơ bản nhất chiếm 99% thiết kế của các cánh tay robot công nghiệp.", "Bậc tự do của khâu cuối không bao giờ vượt quá tổng bậc tự do của tất cả các khớp nối của robot."]'::jsonb, 
    6, 
    TRUE,
    'robot-introduction'
  ),
  (
    'cs_robfun_03', 
    'cs_robotics_fundamentals', 
    13, 
    'Động học Robot', 
    'Ma trận chuyển đổi tọa độ thuần nhất (SE(3))', 
    '### 1. Ma trận quay 3D (Rotation Matrix)
Biểu diễn hướng của khung tọa độ $\{B\}$ so với khung tọa độ tham chiếu $\{A\}$ bằng ma trận $3 \times 3$ thuộc nhóm trực giao đặc biệt $SO(3)$:
$$R_B^A \in \mathbb{R}^{3 \times 3}, \quad (R_B^A)^T R_B^A = I, \quad \det(R_B^A) = 1$$
Mỗi cột của $R_B^A$ là tọa độ của các vector đơn vị của $\{B\}$ biểu diễn trong $\{A\}$.

### 2. Ma trận chuyển đổi thuần nhất (Homogeneous Transformation Matrix)
Để kết hợp cả phép quay và phép tịnh tiến $p$ của hệ tọa độ $\{B\}$ so với $\{A\}$ vào một phép toán ma trận duy nhất, ta sử dụng ma trận kích thước $4 \times 4$ thuộc nhóm $SE(3)$:
$$T_B^A = \begin{bmatrix} R_B^A & p \\ 0_{1 \times 3} & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4}$$

### 3. Phép chiếu điểm tọa độ (Point Transformation)
Khi biết tọa độ của điểm $P$ trong khung $\{B\}$ ($P^B$), ta tính tọa độ của nó trong khung $\{A\}$ ($P^A$) bằng phép nhân ma trận (sử dụng tọa độ thuần nhất mở rộng thêm số 1 ở cuối vector):
$$\begin{bmatrix} P^A \\ 1 \end{bmatrix} = T_B^A \begin{bmatrix} P^B \\ 1 \end{bmatrix}$$', 
    'core-theory', 
    '["Quay khung tọa độ quanh trục Z một góc \\(\\theta\\): ma trận quay tương ứng là R_z(\\(\\theta\\)) = [[cos\\(\\theta\\), -sin\\(\\theta\\), 0], [sin\\(\\theta\\), cos\\(\\theta\\), 0], [0, 0, 1]].", "Ma trận chuyển đổi thuần nhất T kết hợp phép quay quanh Z 90 độ và tịnh tiến theo X 5 đơn vị."]'::jsonb, 
    '["Tính chất trực giao của ma trận quay giúp phép tính nghịch đảo cực kỳ nhanh: (R_B^A)^-1 = (R_B^A)^T.", "Ma trận chuyển đổi thuần nhất 4x4 cho phép xâu chuỗi nhiều phép biến đổi tọa độ liên tiếp bằng phép nhân ma trận đơn giản.", "Tọa độ thuần nhất bổ sung hằng số 1 ở cuối vector để biến phép tịnh tiến phi tuyến thành phép nhân ma trận tuyến tính."]'::jsonb, 
    6, 
    TRUE,
    'robot-kinematics'
  ),
  (
    'cs_robfun_04', 
    'cs_robotics_fundamentals', 
    13, 
    'Động học Robot', 
    'Động học thuận cánh tay robot (Forward Kinematics & D-H)', 
    '### 1. Bài toán Động học thuận (Forward Kinematics)
Tính toán vị trí và hướng của khâu cuối (End-effector) trong hệ tọa độ Descartes thế giới (Task Space) khi biết trước giá trị các góc khớp/khoảng trượt (Joint Space $\theta$).

### 2. Phương pháp tham số Denavit-Hartenberg (D-H Parameters)
Quy ước chuẩn để gắn hệ tọa độ lên từng khâu của robot và tính ma trận chuyển tiếp giữa các khớp nối liên tiếp $T_{i}^{i-1}$. Gồm 4 tham số hình học cốt lõi:
1. **Liên kết góc $\theta_i$ (Joint angle):** Góc quay quanh trục $Z_{i-1}$ từ trục $X_{i-1}$ đến trục $X_i$.
2. **Liên kết dịch $d_i$ (Link offset):** Khoảng cách dọc theo trục $Z_{i-1}$ từ gốc tọa độ cũ đến giao điểm của $Z_{i-1}$ và $X_i$.
3. **Chiều dài khâu $a_i$ (Link length):** Khoảng cách dọc theo trục $X_i$ từ giao điểm đến gốc tọa độ mới (khoảng cách ngắn nhất giữa $Z_{i-1}$ và $Z_i$).
4. **Góc xoắn khâu $\alpha_i$ (Link twist):** Góc quay quanh trục $X_i$ từ trục $Z_{i-1}$ đến trục $Z_i$.

### 3. Ma trận chuyển đổi D-H
$$T_i^{i-1} = \text{Rot}_z(\theta_i) \text{Trans}_z(d_i) \text{Trans}_x(a_i) \text{Rot}_x(\alpha_i)$$
Nhân chuỗi các ma trận này từ gốc tới khâu cuối thu được vị trí cuối cùng của robot:
$$T_N^0 = T_1^0 T_2^1 \cdots T_N^{N-1}$$', 
    'core-theory', 
    '["Thiết lập bảng tham số D-H cho cánh tay robot phẳng 2 khâu (2R) để tính toán vị trí x, y khâu cuối: x = a1*cos\\(\\theta_1\\) + a2*cos\\(\\theta_1 + \\theta_2\\), y = a1*sin\\(\\theta_1\\) + a2*sin\\(\\theta_1 + \\theta_2\\).", "Xác định các trục Z trùng với trục quay của động cơ khi gắn khung tọa độ theo quy ước D-H."]'::jsonb, 
    '["Quy ước D-H giảm số lượng tham số cần thiết để mô tả cấu trúc robot từ 6 xuống còn 4 tham số nhờ các ràng buộc hình học vuông góc.", "Trục X_i luôn được chọn là đường vuông góc chung giữa trục Z_i-1 và Z_i.", "Động học thuận luôn có nghiệm duy nhất cho bất kỳ bộ góc khớp nào."]'::jsonb, 
    6, 
    TRUE,
    'robot-kinematics'
  ),
  (
    'cs_robfun_05', 
    'cs_robotics_fundamentals', 
    13, 
    'Động học Robot', 
    'Động học ngược cánh tay robot (Inverse Kinematics)', 
    '### 1. Bài toán Động học ngược (Inverse Kinematics - IK)
Tính toán giá trị các góc khớp/khoảng trượt cần thiết ($\theta_1, \theta_2, \dots$) để khâu cuối đạt được vị trí và hướng mong muốn trong không gian Descartes. Đây là bài toán cực kỳ phức tạp vì phi tuyến, có thể có nhiều nghiệm hoặc vô nghiệm.

### 2. Các phương pháp giải IK
- **Phương pháp giải tích (Analytical / Closed-form Method):** Giải trực tiếp bằng hình học hoặc đại số để tìm ra công thức nghiệm tường minh. Chạy cực nhanh và chính xác. Robot cấu hình đặc biệt (như có 3 trục khớp cuối cắt nhau tại 1 điểm - cổ tay cầu Spherical Wrist) bảo đảm có nghiệm giải tích (Định lý Pieper).
- **Phương pháp số trị (Numerical Method):** Lặp xấp xỉ sử dụng ma trận Jacobian nghịch đảo để cập nhật góc khớp dần dần:
  $$\Delta \theta \approx J^{-1}(q) \Delta x$$
  Chậm hơn và có thể không hội tụ, nhưng áp dụng được cho mọi cấu trúc robot.

### 3. Trạng thái kỳ dị (Singularities)
Trạng thái mà robot bị mất đi một hoặc nhiều hướng chuyển động Descartes (DOF giảm). Tại điểm kỳ dị, định thức của ma trận Jacobian bằng 0 ($\det(J) = 0$), khiến việc giải IK số trị bị đổ vỡ (vận tốc khớp tiến tới vô hạn).', 
    'core-theory', 
    '["Giải động học ngược cho robot phẳng 2 khâu bằng định lý cosin để tìm ra hai bộ nghiệm tương ứng với cấu hình khuỷu tay gập lên (Elbow up) và gập xuống (Elbow down).", "Mô tả trạng thái kỳ dị khi cánh tay robot duỗi thẳng hoàn toàn dọc theo một đường thẳng."]'::jsonb, 
    '["Giải tích là phương pháp tối ưu nhất cho điều khiển thời gian thực vì tính toán mất dưới 1 micro-giây.", "Định lý Pieper bảo đảm cánh tay robot 6 trục có 3 trục khớp kề nhau song song hoặc cắt nhau tại 1 điểm luôn có nghiệm giải tích.", "Phòng tránh kỳ dị bằng cách giới hạn vùng làm việc của robot hoặc sử dụng phương pháp Jacobian giả nghịch đảo (Pseudo-inverse) có giảm chấn."]'::jsonb, 
    7, 
    TRUE,
    'robot-kinematics'
  ),
  (
    'cs_robfun_06', 
    'Tổng quan & Cấu trúc Robot', 
    13, 
    'Tổng quan & Cấu trúc Robot', 
    'Động cơ & Cơ cấu chấp hành (Actuators & Transmission)', 
    '### 1. Phân loại động cơ trong Robotics
- **Động cơ DC Servo:** Động cơ một chiều tích hợp cảm biến phản hồi Encoder và mạch điều khiển vòng kín. Cung cấp mô-men xoắn cao ở dải tốc độ rộng, điều khiển vị trí chính xác.
- **Động cơ bước (Stepper Motor):** Quay theo từng bước góc cố định không cần cảm biến phản hồi (vòng hở). Giá rẻ nhưng dễ bị mất bước (slip) khi tải nặng.
- **Động cơ BLDC (Brushless DC):** Động cơ không chổi than, tuổi thọ cao, hiệu suất lớn, tỏa nhiệt thấp, ứng dụng nhiều trong Drone và khớp khớp robot di động.

### 2. Cơ cấu truyền động (Transmission)
- **Hộp số điều tốc (Gearboxes):** Giảm tốc độ quay để tăng mô-men xoắn theo tỷ số truyền $N$:
  $$\tau_{\text{out}} = N \cdot \tau_{\text{in}}$$
- **Harmonic Drive (Hộp số sóng):** Thiết kế độc đáo không có khe hở rơ (Zero backlash), tỷ số truyền cực lớn trong không gian nhỏ, độ chính xác cao. Bắt buộc cho các khớp cánh tay robot công nghiệp.
- **Trục vít me bi (Ball Screw):** Chuyển đổi chuyển động quay thành chuyển động tịnh tiến tuyến tính hiệu suất cao.', 
    'core-theory', 
    '["Khớp vai robot công nghiệp nặng sử dụng động cơ BLDC kết hợp hộp số sóng Harmonic Drive tỷ số truyền 100:1 để nâng tải trọng 10kg.", "Phân tích hiện tượng Backlash (khe hở răng) làm sai lệch vị trí của khâu cuối khi robot đổi chiều chuyển động."]'::jsonb, 
    '["Mạch Driver động cơ nhận tín hiệu PWM hoặc tập lệnh qua CAN bus để điều phối điện áp cấp cho cuộn dây động cơ.", "Hộp số Harmonic Drive hoạt động dựa trên nguyên lý biến dạng đàn hồi của vòng răng kim loại mỏng (Flexspline).", "Động cơ servo đòi hỏi quá trình tuning các hệ số PID điều khiển dòng điện, vận tốc và vị trí độc lập."]'::jsonb, 
    6, 
    TRUE,
    'robot-introduction'
  ),
  (
    'cs_robfun_07', 
    'cs_robotics_fundamentals', 
    13, 
    'Cảm biến & Phần mềm ROS2', 
    'Cảm biến nhận thức môi trường vật lý (Sensors)', 
    '### 1. Cảm biến trạng thái trong (Proprietary Sensors)
Đo đạc các thông số nội tại của robot:
- **Encoder (Bộ mã hóa vòng quay):** Đo góc quay và vận tốc góc của khớp. Gồm Encoder quang học incremental (đếm xung tăng dần) và absolute (đọc mã vị trí tuyệt đối bằng đĩa mã hóa).
- **IMU (Inertial Measurement Unit - Bộ đo quán tính):** Tích hợp cảm biến gia tốc (Accelerometer) đo gia tốc tuyến tính 3 trục và cảm biến góc quay (Gyroscope) đo vận tốc góc 3 trục.

### 2. Cảm biến nhận thức ngoài (Exteroceptive Sensors)
Đo đạc môi trường xung quanh:
- **LiDAR (Light Detection and Ranging):** Quét tia laser đo thời gian bay (Time of Flight - ToF) để tính khoảng cách tới vật cản, xây dựng đám mây điểm 2D/3D (Point Cloud).
- **Camera Depth (như Intel RealSense):** Cung cấp ảnh màu RGB kèm ma trận độ sâu chiều dọc Z của từng pixel.', 
    'core-theory', 
    '["LiDAR 2D xoay liên tục tần số 10Hz quét xung quanh để robot tự hành lập bản đồ tránh người đi bộ.", "IMU gán trên robot cân bằng 2 bánh tự hành để đo góc nghiêng pitch phục vụ thuật toán giữ thăng bằng phản hồi nhanh."]'::jsonb, 
    '["Encoder tuyệt đối (Absolute Encoder) không bị mất vị trí góc khớp khi robot bị mất nguồn điện đột ngột.", "IMU thường gặp sai số trôi tích lũy (drift error) theo thời gian khi tính tích phân kép gia tốc để tìm vị trí, cần lọc Kalman xử lý.", "Cảm biến siêu âm đo khoảng cách bằng sóng âm giá rẻ nhưng góc mở rộng dễ bị nhiễu phản xạ chéo."]'::jsonb, 
    6, 
    TRUE,
    'robot-sensing'
  ),
  (
    'cs_robfun_08', 
    'cs_robotics_fundamentals', 
    13, 
    'Cảm biến & Phần mềm ROS2', 
    'Hệ điều hành Robot ROS2 & Cấu trúc phân tán', 
    '### 1. Kiến trúc phân tán của ROS2
ROS2 không phải là hệ điều hành phần cứng mà là một trung gian phần mềm (Middleware) cung cấp cơ chế giao tiếp phân tán cho robot.
- **Node (Nút):** Một tiến trình chạy độc lập thực hiện một nhiệm vụ cụ thể (ví dụ: Node đọc LiDAR, Node lập quỹ đạo).

### 2. Các cơ chế giao tiếp trong ROS2
- **Topic (Chủ đề):** Giao tiếp bất đồng bộ 1-nhiều dạng **Publish/Subscribe**. Node gửi (Publisher) đẩy dữ liệu lên Topic liên tục không cần quan tâm bên nhận. Phù hợp truyền dữ liệu cảm biến (ví dụ: `/scan` của LiDAR).
- **Service (Dịch vụ):** Giao tiếp đồng bộ 1-1 dạng **Request/Response**. Node yêu cầu gửi request và treo đợi phản hồi. Phù hợp cho lệnh cấu hình nhanh (ví dụ: bật/tắt camera).
- **Action (Hành động):** Giao tiếp bất đồng bộ dài hạn cho các tác vụ lâu dài. Gồm Goal (gửi đích), Feedback (phản hồi tiến độ liên tục) và Result (kết quả cuối). Phù hợp cho lệnh di chuyển robot tới tọa độ xa.

### 3. Giao tiếp DDS (Data Distribution Service)
ROS2 sử dụng chuẩn DDS làm nền tảng truyền tin công nghiệp dưới tầng mạng, bảo đảm an toàn thời gian thực (Real-time) và cấu hình chất lượng dịch vụ QoS (Quality of Service).', 
    'core-theory', 
    '["Node LiDAR publisher đẩy dữ liệu PointCloud lên topic `/scan`, Node SLAM subscriber đọc topic này để vẽ bản đồ.", "Action `/navigate_to_pose` nhận đích đến, gửi liên tiếp tọa độ hiện tại về máy tính trạm và báo hoàn thành khi robot tới nơi."]'::jsonb, 
    '["ROS2 loại bỏ hoàn toàn Master Node của ROS1 để tránh Single Point of Failure nhờ cơ chế tự khám phá node của DDS.", "Tham số QoS cho phép cấu hình độ tin cậy (Reliable vs Best Effort) và hàng đợi lịch sử (History) cho gói tin mạng.", "Công cụ mô phỏng Gazebo và trực quan hóa RViz2 là trợ thủ đắc lực không thể thiếu của lập trình viên ROS2."]'::jsonb, 
    7, 
    TRUE,
    'robot-sensing'
  ),
  (
    'cs_robfun_09', 
    'cs_robotics_fundamentals', 
    13, 
    'Điều khiển & An toàn Robot', 
    'Hệ thống điều khiển phản hồi vòng kín & Bộ điều khiển PID', 
    '### 1. Mô hình điều khiển vòng kín (Closed-loop Control)
Hệ thống liên tục so sánh giá trị đặt mong muốn ($r(t)$) với giá trị thực tế đo được từ cảm biến ($y(t)$) để tính toán sai số (Error):
$$e(t) = r(t) - y(t)$$
Tín hiệu điều khiển $u(t)$ được tính toán trực tiếp từ $e(t)$ để giảm sai số về 0.

### 2. Bộ điều khiển PID (Proportional-Integral-Derivative)
Công thức tính tín hiệu điều khiển:
$$u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) d\tau + K_d \frac{de(t)}{dt}$$
- **Khâu tỉ lệ $K_p$ (Proportional):** Tạo lực điều khiển tỉ lệ thuận với sai số hiện tại. $K_p$ càng lớn thì đáp ứng càng nhanh nhưng dễ gây vọt lố và dao động.
- **Khâu tích phân $K_i$ (Integral):** Tích lũy sai số quá khứ để triệt tiêu sai số xác lập (Steady-state error) ở trạng thái ổn định. Tuy nhiên, dễ gây hiện tượng bão hòa tích phân (Windup).
- **Khâu vi phân $K_d$ (Derivative):** Dự đoán sai số tương lai dựa trên tốc độ thay đổi sai số, đóng vai trò như bộ giảm chấn làm mượt hệ thống, giảm vọt lố.', 
    'core-theory', 
    '["Điều khiển vị trí góc quay khớp vai robot dùng bộ điều khiển PID so sánh góc đặt mong muốn và góc thực tế đọc từ Encoder quang.", "Quá trình Tuning hệ số PID thủ công: tăng K_p đến khi hệ thống bắt đầu dao động nhẹ, sau đó tăng K_d để dập tắt dao động, cuối cùng thêm K_i để triệt tiêu sai số tĩnh."]'::jsonb, 
    '["Khâu vi phân K_d cực kỳ nhạy cảm với nhiễu tần số cao của cảm biến, do đó bắt buộc phải đi kèm bộ lọc nhiễu thông thấp (low-pass filter) khi triển khai thực tế.", "Hiện tượng Integral Windup xảy ra khi cơ cấu chấp hành bị bão hòa vật lý (ví dụ động cơ đạt tối đa điện áp) nhưng sai số vẫn còn làm khâu tích phân liên tục tăng lũy kế khổng lồ.", "Hầu hết các khớp robot công nghiệp đều chạy các bộ điều khiển PID xếp tầng (Cascade PID) độc lập cho dòng điện, vận tốc và vị trí."]'::jsonb, 
    7, 
    TRUE,
    'robot-control'
  ),
  (
    'cs_robfun_10', 
    'cs_robotics_fundamentals', 
    13, 
    'Điều khiển & An toàn Robot', 
    'Thiết kế an toàn & Tiêu chuẩn công nghiệp trong Robotics', 
    '### 1. Rủi ro vận hành trong Robotics
Robot công nghiệp sở hữu khối lượng sắt thép lớn, chuyển động tốc độ cao và mô-men xoắn mạnh mẽ có khả năng gây chấn thương nghiêm trọng cho con người trong vùng làm việc.

### 2. Tiêu chuẩn an toàn công nghiệp
- **ISO 10218:** Quy định các yêu cầu an toàn đối với hệ thống robot công nghiệp lắp đặt cố định.
- **ISO/TS 15066:** Tiêu chuẩn chuyên biệt cho Robot cộng tác (**Cobots** - Collaborative Robots) làm việc chung không gian không có hàng rào bảo vệ với con người.

### 3. Các cơ chế bảo vệ vật lý và logic
- **Emergency Stop (E-Stop):** Nút dừng khẩn cấp cắt trực tiếp nguồn động lực cấp cho động cơ của robot bằng mạch rơ-le an toàn phần cứng (không qua phần mềm).
- **Hạn chế lực và mô-men (Power and Force Limiting):** Cobots tích hợp cảm biến lực ở các khớp. Khi xảy ra va chạm nhẹ với con người vượt ngưỡng an toàn, robot tự động dừng chuyển động lập tức.
- **Vùng bảo vệ an toàn (Safe Zones):** Sử dụng LiDAR quét an toàn (Safety Scanner) quét vùng sàn xung quanh. Khi con người bước vào vùng cảnh báo: robot giảm tốc độ; bước vào vùng nguy hiểm: robot dừng hẳn chuyển động.', 
    'core-theory', 
    '["Cánh tay robot Universal Robots UR10 (Cobot) tự động khựng lại khi va chạm nhẹ vào tay công nhân đứng cạnh dây chuyền lắp ráp.", "Thiết lập Safety Scanner quét vùng bán kính 2m xung quanh robot công nghiệp: vùng 1.5m giảm 50% tốc độ, vùng 0.5m dừng khẩn cấp."]'::jsonb, 
    '["Nút dừng khẩn cấp E-Stop bắt buộc phải là linh kiện cơ khí màu đỏ nổi bật trên nền vàng và có cơ chế khóa cơ học giữ trạng thái dừng khi bấm.", "Robot cộng tác đạt tiêu chuẩn an toàn nhờ thiết kế bo tròn các góc cạnh cơ khí và sử dụng động cơ có độ nhạy phản hồi lực cao.", "An toàn chức năng (Functional Safety) đòi hỏi các cảm biến và mạch điều khiển đạt chuẩn SIL (Safety Integrity Level) hoặc PL (Performance Level) quy chuẩn."]'::jsonb, 
    6, 
    TRUE,
    'robot-control'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_robfun_01', 'robot-introduction', 'lesson', 'Giới thiệu tổng quan về Robotics & Phân loại Robot', '{"lesson_id": "cs_robfun_01"}'::jsonb, 10, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_02', 'robot-introduction', 'lesson', 'Không gian cấu hình & Khớp động học (C-Space & Joints)', '{"lesson_id": "cs_robfun_02"}'::jsonb, 20, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_03', 'robot-kinematics', 'lesson', 'Ma trận chuyển đổi tọa độ thuần nhất (SE(3))', '{"lesson_id": "cs_robfun_03"}'::jsonb, 10, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_04', 'robot-kinematics', 'lesson', 'Động học thuận cánh tay robot (Forward Kinematics & D-H)', '{"lesson_id": "cs_robfun_04"}'::jsonb, 20, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_05', 'robot-kinematics', 'lesson', 'Động học ngược cánh tay robot (Inverse Kinematics)', '{"lesson_id": "cs_robfun_05"}'::jsonb, 30, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_06', 'robot-introduction', 'lesson', 'Động cơ & Cơ cấu chấp hành (Actuators & Transmission)', '{"lesson_id": "cs_robfun_06"}'::jsonb, 30, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_07', 'robot-sensing', 'lesson', 'Cảm biến nhận thức môi trường vật lý (Sensors)', '{"lesson_id": "cs_robfun_07"}'::jsonb, 10, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_08', 'robot-sensing', 'lesson', 'Hệ điều hành Robot ROS2 & Cấu trúc phân tán', '{"lesson_id": "cs_robfun_08"}'::jsonb, 20, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_09', 'robot-control', 'lesson', 'Hệ thống điều khiển phản hồi vòng kín & Bộ điều khiển PID', '{"lesson_id": "cs_robfun_09"}'::jsonb, 10, 10, 20, 'cs_robotics_fundamentals', 13),
  ('act-lesson-cs_robfun_10', 'robot-control', 'lesson', 'Thiết kế an toàn & Tiêu chuẩn công nghiệp trong Robotics', '{"lesson_id": "cs_robfun_10"}'::jsonb, 20, 10, 20, 'cs_robotics_fundamentals', 13)
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
