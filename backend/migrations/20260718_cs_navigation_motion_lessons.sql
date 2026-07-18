-- SQL migration to seed topics and 10 core lessons for cs_navigation_motion (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_navigation_motion (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('costmap-localization', 'cs_navigation_motion', 13, 'Bản đồ chi phí & Định vị', 'Bản đồ chi phí Costmap (Inflation, Obstacle layers), định vị hạt thích nghi AMCL, Odometry bánh xe.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('kinematic-models', 'cs_navigation_motion', 13, 'Mô hình động học xe', 'Mô hình xe đạp Bicycle model, cơ cấu lái Ackermann steering, thuật toán Odometry tích phân bánh xe.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('path-tracking', 'cs_navigation_motion', 13, 'Bộ điều khiển bám đường', 'Thuật toán bám đường Pure Pursuit, Stanley controller, điều khiển dự báo mô hình MPC.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('trajectory-recovery', 'cs_navigation_motion', 13, 'Quỹ đạo & Phục hồi', 'Lập quỹ đạo trơn Spline, thuật toán phục hồi trạng thái Recovery Behaviors khi robot kẹt cứng.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_navigation_motion (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_navmot_01', 
    'cs_navigation_motion', 
    13, 
    'Bản đồ chi phí & Định vị', 
    'Bản đồ chi phí Costmap & Các lớp bản đồ trong ROS2', 
    '### 1. Khái niệm Costmap
Costmap là bản đồ lưới ô vuông biểu diễn mức độ nguy hiểm (chi phí di chuyển) của từng khu vực đối với robot. Bản đồ chi phí gồm 2 loại: Global Costmap (toàn cục) dùng để lập đường đi và Local Costmap (cục bộ) dùng để né vật cản động.

### 2. Cấu trúc phân lớp (Costmap Layers)
Costmap tích hợp dữ liệu từ nhiều nguồn qua cấu trúc phân lớp chồng đè:
- **Static Map Layer:** Lớp bản đồ tĩnh cố định (từ SLAM).
- **Obstacle Map Layer:** Lớp vật cản thời gian thực cập nhật liên tục từ LiDAR, camera depth.
- **Inflation Layer (Lớp lan tỏa):** Tự động mở rộng biên của vật cản ra ngoài bằng một hàm giảm dần chi phí theo bán kính robot. Giúp ngăn robot đi quá sát tường gây va quẹt cơ khí.', 
    'core-theory', 
    '["Thiết lập bán kính lan tỏa inflation_radius = 0.3m trong file cấu hình nav2 cho robot có chiều rộng 0.5m.", "Obstacle layer tự động xóa vật cản tĩnh khi con người đi qua nhờ cơ chế dò quét tia (Raycasting)."]'::jsonb, 
    '["Vùng chi phí cực đại (LETHAL_OBSTACLE = 254) đại diện cho vị trí chướng ngại vật thực tế, robot tuyệt đối không được đi vào.", "Inflation layer giúp coi robot như một điểm toán học duy nhất chuyển động, tiết kiệm cực lớn tài nguyên tính toán hình học va chạm.", "Local Costmap di chuyển liên tục theo vị trí robot (Rolling Window mode), thường có kích thước nhỏ (như 3mx3m)."]'::jsonb, 
    6, 
    TRUE,
    'costmap-localization'
  ),
  (
    'cs_navmot_02', 
    'Bản đồ chi phí & Định vị', 
    13, 
    'Bản đồ chi phí & Định vị', 
    'Định vị thích nghi Monte Carlo (AMCL)', 
    '### 1. Nguyên lý hoạt động của AMCL
AMCL (Adaptive Monte Carlo Localization) là thuật toán định vị robot trong bản đồ 2D tĩnh dựa trên bộ lọc hạt (Particle Filter).
- Robot duy trì một tập hợp các giả thuyết vị trí (gọi là các hạt - particles). Mỗi hạt lưu trữ một cấu hình vị trí khả thi $(x, y, \theta)$ kèm trọng số tin cậy.

### 2. Chu kỳ cập nhật AMCL
1. **Dự báo (Prediction):** Khi robot di chuyển, các hạt được dịch chuyển theo mô hình odometry bánh xe cộng thêm nhiễu ngẫu nhiên.
2. **Hiệu chỉnh (Update):** Khi cảm biến LiDAR quét khoảng cách, trọng số của từng hạt được tính lại dựa trên độ tương đồng giữa tia LiDAR thực tế và tia LiDAR giả thuyết bắn từ vị trí của hạt đó trên bản đồ.
3. **Tái chọn mẫu (Resampling):** Loại bỏ các hạt có trọng số thấp, nhân bản các hạt có trọng số cao. Số lượng hạt tự động thích nghi: tập trung dày đặc khi đã biết rõ vị trí và loang rộng khi bị lạc đường.', 
    'core-theory', 
    '["Khi robot mới khởi động và chưa biết vị trí gốc (Global Localization), các hạt của AMCL được rải đều ngẫu nhiên khắp bản đồ.", "Màn hình RViz2 hiển thị chùm mũi tên màu đỏ bao quanh robot đại diện cho đám mây hạt của bộ lọc AMCL."]'::jsonb, 
    '["Trọng số của hạt tỷ lệ thuận với xác suất trùng khớp của phép đo cảm biến laser (Likelihood Field model).", "Hiện tượng bắt cóc robot (Kidnapped Robot Problem) kiểm tra khả năng phục hồi định vị của AMCL khi robot đột ngột bị nhấc sang vị trí khác.", "Số lượng hạt của AMCL được khống chế tự động giữa ngưỡng tối thiểu (ví dụ 500) và tối đa (ví dụ 5000) để tiết kiệm CPU."]'::jsonb, 
    7, 
    TRUE,
    'costmap-localization'
  ),
  (
    'cs_navmot_03', 
    'cs_navigation_motion', 
    13, 
    'Mô hình động học xe', 
    'Mô hình động học xe: Mô hình xe đạp & Lái Ackermann', 
    '### 1. Cơ cấu lái Ackermann
Cơ cấu lái tiêu chuẩn của xe ô tô và robot tự hành cỡ lớn:
- Hai bánh trước dẫn hướng, hai bánh sau chủ động di chuyển.
- Để tránh hiện tượng trượt lốp khi cua, bánh xe phía trong góc cua phải quay góc lớn hơn bánh xe phía ngoài. Đường thẳng vuông góc của tất cả các bánh xe phải cắt nhau tại một điểm duy nhất (tâm quay tức thời ICC).

### 2. Mô hình xe đạp (Bicycle Model)
Đơn giản hóa cơ cấu lái Ackermann bằng cách gộp hai bánh trước thành 1 bánh ảo ở tâm và hai bánh sau thành 1 bánh ảo ở tâm:
- **Tọa độ trạng thái:** $(x, y, \theta)$ tại tâm trục sau.
- **Phương trình động học:**
  $$\dot{x} = v \cos\theta, \quad \dot{y} = v \sin\theta, \quad \dot{\theta} = \frac{v}{L} \tan\phi$$
  Trong đó $v$ là vận tốc tiến, $\phi$ là góc lái bánh trước, và $L$ là khoảng cách trục cơ sở (wheelbase).', 
    'core-theory', 
    '["Xe tự hành AGV kéo rơ-moóc sử dụng cơ cấu lái Ackermann để di chuyển êm ái trong khuôn viên nhà xưởng ngoài trời.", "Tính bán kính quay vòng tối thiểu R = L / tan(\\(\\phi\\)_max) của robot xe đạp khi góc lái đạt tối đa."]'::jsonb, 
    '["Mô hình xe đạp là mô hình Non-holonomic điển hình vì xe không thể tịnh tiến ngang trực tiếp.", "Khác với robot bánh vi sai có thể xoay đầu tại chỗ (bán kính quay vòng bằng 0), xe Ackermann đòi hỏi không gian cua rộng.", "Tâm quay tức thời ICC nằm trên đường kéo dài của trục bánh sau xe đạp."]'::jsonb, 
    6, 
    TRUE,
    'kinematic-models'
  ),
  (
    'cs_navmot_04', 
    'cs_navigation_motion', 
    13, 
    'Bộ điều khiển bám đường', 
    'Bộ điều khiển bám đường hình học: Pure Pursuit', 
    '### 1. Ý tưởng cốt lõi của Pure Pursuit
Pure Pursuit là bộ điều khiển bám đường hình học kinh điển cho robot non-holonomic.
- Robot liên tục tìm kiếm một điểm mục tiêu (Look-ahead point $g$) nằm trên đường đi mong muốn ở một khoảng cách nhìn trước cố định $L_d$ từ vị trí hiện tại.
- Thuật toán tính toán bán kính cung tròn duy nhất nối từ tâm robot đến điểm $g$ đó và điều khiển xe di chuyển theo cung tròn này.

### 2. Công thức tính góc lái
Từ hình học tam giác, góc lái $\delta$ cần thiết cho mô hình xe đạp được tính bằng:
$$\delta = \arctan\left( \frac{2 L \sin\alpha}{L_d} \right)$$
- $L$: Khoảng cách trục cơ sở.
- $\alpha$: Góc lệch giữa hướng đầu xe và vector nối từ xe tới điểm nhìn trước $g$.
- $L_d$: Khoảng cách nhìn trước (Look-ahead distance).', 
    'core-theory', 
    '["Robot AGV bám theo đường line ảo sử dụng Pure Pursuit với L_d = 0.5m.", "Tính toán góc lái lái xe Ackermann khi điểm nhìn trước lệch sang trái 15 độ."]'::jsonb, 
    '["Khoảng cách nhìn trước L_d quyết định độ mượt của chuyển động: L_d lớn giúp xe đi mượt nhưng dễ cắt góc cua; L_d nhỏ giúp bám sát cua nhưng dễ gây dao động uốn lượn rắn bò.", "L_d thường được lập trình tỷ lệ tuyến tính với vận tốc tiến hiện tại của robot: L_d = k * v.", "Pure Pursuit cực kỳ dễ cài đặt và ổn định cao ngoài thực tế."]'::jsonb, 
    6, 
    TRUE,
    'path-tracking'
  ),
  (
    'cs_navmot_05', 
    'cs_navigation_motion', 
    13, 
    'Bộ điều khiển bám đường', 
    'Bộ điều khiển Stanley cho xe tự hành', 
    '### 1. Ý tưởng của Stanley Controller
Stanley là bộ điều khiển bám quỹ đạo tiêu chuẩn dùng cho xe tự hành DARPA của đại học Stanford:
- Khác với Pure Pursuit tham chiếu vị trí so với trục sau, Stanley đo đạc sai số trực tiếp tại **trục trước** của xe.
- Sai số đầu vào gồm hai thành phần: Sai số hướng ($\theta_e$) và Sai số khoảng cách ngang (Cross-track error $e_y$).

### 2. Luật điều khiển Stanley
Góc lái $\delta(t)$ được tính bằng tổng sai số hướng và hàm phi tuyến của sai số ngang:
$$\delta(t) = \theta_e(t) + \arctan\left( \frac{k \cdot e_y(t)}{v(t)} \right)$$
- $k$: Hệ số khuếch đại điều khiển.
- $v(t)$: Vận tốc tiến hiện tại của xe.
- Ưu điểm: Bám đường cua gắt cực tốt và tự động sửa lỗi lệch ngang lớn nhanh chóng.', 
    'core-theory', 
    '["Xe tự lái Stanley chạy sa mạc bám theo quỹ đạo GPS với tốc độ 40km/h dùng thuật toán hiệu chỉnh góc lái trục trước tức thời.", "Phân tích phản ứng góc lái Stanley khi xe bị lệch ngang sang phải 0.2m so với tâm đường."]'::jsonb, 
    '["Hằng số vận tốc nhỏ ở mẫu số giúp tránh chia cho 0 khi xe đứng yên: arctan(k * e_y / (v + epsilon)).", "Stanley bảo đảm tính ổn định tiệm cận toàn cục (globally asymptotically stable) đối với các sai số nhỏ xung quanh quỹ đạo.", "Khác với Pure Pursuit, Stanley không bị hiện tượng cắt góc cua lớn ở vận tốc cao."]'::jsonb, 
    7, 
    TRUE,
    'path-tracking'
  ),
  (
    'cs_navmot_06', 
    'cs_navigation_motion', 
    13, 
    'Bộ điều khiển bám đường', 
    'Bộ điều khiển dự báo mô hình (Model Predictive Control - MPC)', 
    '### 1. Nguyên lý của MPC
MPC là phương pháp điều khiển tối ưu tiên tiến. Tại mỗi chu kỳ điều khiển:
1. Sử dụng mô hình động học/động lực học của robot để **dự báo** trạng thái tương lai của robot trong một khoảng thời gian dự báo $N$ bước tiếp theo.
2. Giải một bài toán **tối ưu hóa có ràng buộc** thời gian thực để tìm ra chuỗi tín hiệu điều khiển tối ưu ($u_0, u_1, \dots, u_{N-1}$) nhằm tối thiểu hóa sai số bám quỹ đạo và năng lượng tiêu thụ.
3. Chỉ gửi tín hiệu điều khiển đầu tiên ($u_0$) cho động cơ. Ở chu kỳ tiếp theo, lặp lại toàn bộ quá trình (Cơ chế cửa sổ trượt Horizon).

### 2. Ưu thế vượt trội của MPC
Cho phép tích hợp trực tiếp các ràng buộc vật lý vật lý của robot vào bài toán tối ưu:
- Giới hạn góc lái tối đa: $\phi_{\min} \le \phi \le \phi_{\max}$.
- Giới hạn gia tốc cực đại để tránh lật xe.', 
    'core-theory', 
    '["Robot cánh tay công nghiệp bám quỹ đạo siêu tốc dùng MPC để kiểm soát mô-men không vượt quá giới hạn dòng điện của driver.", "Xe tự lái Mercedes chạy tốc độ cao dùng MPC để tự động phanh tránh chướng ngại vật đồng thời khống chế gia tốc ly tâm tránh trượt lốp."]'::jsonb, 
    '["MPC đòi hỏi giải bài toán lập trình bình phương (Quadratic Programming - QP) ở mỗi chu kỳ máy, tốn cực nhiều tài nguyên CPU hơn PID hay Pure Pursuit.", "Độ chính xác của MPC phụ thuộc hoàn toàn vào độ chính xác của mô hình toán học robot.", "Khoảng dự báo N (Prediction Horizon) lớn giúp xe đi mượt và thông minh hơn nhưng tăng độ phức tạp tính toán theo cấp số mũ."]'::jsonb, 
    7, 
    TRUE,
    'path-tracking'
  ),
  (
    'cs_navmot_07', 
    'cs_navigation_motion', 
    13, 
    'Mô hình động học xe', 
    'Mô hình Odometry bánh xe & Tính toán sai số tích phân', 
    '### 1. Odometry bánh xe (Wheel Odometry)
Odometry là phương pháp ước lượng vị trí hiện tại $(x, y, \theta)$ của robot dựa trên việc đếm số vòng quay của các bánh xe qua encoder.
- Với robot vi sai: Đo góc quay bánh trái $\Delta \theta_L$ và bánh phải $\Delta \theta_R$ để tính quãng đường đi được của từng bánh:
  $$\Delta s_L = r \Delta \theta_L, \quad \Delta s_R = r \Delta \theta_R$$
- Quãng đường dịch chuyển của tâm robot: $\Delta s = (\Delta s_R + \Delta s_L) / 2$.
- Độ lệch góc xoay: $\Delta \theta = (\Delta s_R - \Delta s_L) / b$ (với $b$ là khoảng cách 2 bánh).

### 2. Tích lũy sai số (Drift Error)
Odometry là phép tính tích phân cộng dồn các lượng dịch chuyển nhỏ:
- Sai số cảm biến, sự trượt bánh xe trên sàn trơn và sai số đường kính bánh xe $r$ thực tế sẽ bị **tích lũy không giới hạn** theo thời gian.
- Bắt buộc phải kết hợp định vị tuyệt đối (AMCL, LiDAR, UWB) để reset sai số.', 
    'core-theory', 
    '["Tính toán tọa độ x, y tiếp theo của robot vi sai sau khi bánh phải đi được 10cm và bánh trái đi được 8cm.", "Hiện tượng robot vi sai bị trượt bánh khi đi qua vũng nước làm vị trí tính bằng Odometry chạy lệch đi 0.5m so với thực tế."]'::jsonb, 
    '["Sai số tích phân odometry tăng dần theo quãng đường di chuyển của robot.", "Hiệu chuẩn odometry (Odometry Calibration) đo đạc đường kính thực tế của bánh xe và khoảng cách trục để giảm thiểu sai số hệ thống.", "Tần số odometry bánh xe thường rất cao (50Hz - 100Hz) để cung cấp phản hồi chuyển động nhanh cho bộ lọc Kalman."]'::jsonb, 
    6, 
    TRUE,
    'kinematic-models'
  ),
  (
    'cs_navmot_08', 
    'cs_navigation_motion', 
    13, 
    'Quỹ đạo & Phục hồi', 
    'Lập quỹ đạo trơn cho khớp Robot dựa trên đường cong Spline', 
    '### 1. Lập quỹ đạo trơn (Trajectory Generation)
Để cánh tay robot chuyển động êm ái không bị rung giật, quỹ đạo góc khớp theo thời gian phải liên tục về cả vị trí, vận tốc (C1 continuity) và gia tốc (C2 continuity).

### 2. Đường cong Cubic Spline (Bậc 3)
Nối hai điểm bằng đa thức bậc 3:
$$q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3$$
- Cho phép đặt điều kiện biên cho vị trí và vận tốc tại điểm đầu và điểm cuối (vận tốc bằng 0). Gia tốc khớp có thể bị nhảy đột ngột tại điểm biên.

### 3. Đường cong Quintic Spline (Bậc 5)
Nối hai điểm bằng đa thức bậc 5:
$$q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5$$
- Cho phép khống chế đồng thời Vị trí, Vận tốc và **Gia tốc** tại điểm đầu và cuối. Bảo đảm gia tốc liên tục, triệt tiêu hiện tượng giật cơ khí (Jerk) bảo vệ hộp số robot.', 
    'core-theory', 
    '["Tính toán 6 hệ số của đa thức Quintic Spline để di chuyển khớp vai từ 0 độ lên 90 độ trong 2 giây mượt mà gia tốc đầu cuối bằng 0.", "Vẽ đồ thị gia tốc khớp dạng hình thang để so sánh độ êm dịu so với quỹ đạo đa thức bậc 5."]'::jsonb, 
    '["Jerk là đạo hàm của gia tốc theo thời gian. Jerk lớn gây ra lực tác động đột ngột làm gãy hỏng cơ khí khớp robot.", "Đường cong B-Spline cho phép thay đổi hình dáng quỹ đạo cục bộ thông qua các điểm điều khiển mà không cần tính toán lại toàn bộ đường đi.", "Lập quỹ đạo khớp phải bảo đảm không vượt quá giới hạn mô-men xoắn của động cơ tại bất kỳ thời điểm nào."]'::jsonb, 
    7, 
    TRUE,
    'trajectory-recovery'
  ),
  (
    'cs_navmot_09', 
    'cs_navigation_motion', 
    13, 
    'Quỹ đạo & Phục hồi', 
    'Hành vi phục hồi trạng thái trong ROS2 Navigation', 
    '### 1. Sự cố kẹt robot khi tự hành
Trong quá trình tự di chuyển, robot có thể rơi vào tình huống bị kẹt cứng (ví dụ: bị con người bao quanh, đi vào ngõ cụt quá hẹp làm Local Costmap đầy vật cản không tìm được vận tốc an toàn).

### 2. Thuật toán phục hồi trạng thái (Recovery Behaviors / Recovery Servers)
ROS2 Nav2 định nghĩa chuỗi hành vi phục hồi tự động tăng dần cấp độ để tự giải cứu robot:
1. **Clear Costmap (Xóa bản đồ chi phí):** Xóa toàn bộ vật cản động tạm thời trong Local Costmap để LiDAR quét lại từ đầu (đề phòng nhiễu quét ma).
2. **Clearing Rotation (Quay tại chỗ):** Robot tự xoay tròn 360 độ chậm rãi để LiDAR quét sạch các góc khuất phía sau.
3. **Backup (Đi lùi):** Đi lùi thẳng một khoảng nhỏ (ví dụ 15cm) để thoát khỏi khe hẹp vừa đâm đầu vào.
4. **Wait (Chờ đợi):** Đứng im chờ vài giây đợi con người đi qua chỗ khác.', 
    'core-theory', 
    '["Robot tự hành AMR lau sàn siêu thị bị kẹt giữa đống xe đẩy, tự động thực hiện hành vi quay tại chỗ clearing rotation để tìm lối thoát.", "Cấu hình chuỗi recovery trong file cấu hình nav2: clear_costmap -> backup -> spin -> wait."]'::jsonb, 
    '["Mạch logic phục hồi trạng thái được quản lý bởi Behavior Tree của Nav2 ở tầng cao nhất.", "Hành vi đi lùi (Backup) phải khống chế khoảng cách cực kỳ cẩn thận để tránh va đập vào vật cản phía sau robot không có LiDAR quét.", "Nếu chạy toàn bộ chuỗi phục hồi vẫn không thoát kẹt, robot sẽ báo lỗi đỏ về máy chủ trung tâm để gọi nhân viên hỗ trợ ngoài đời."]'::jsonb, 
    6, 
    TRUE,
    'trajectory-recovery'
  ),
  (
    'cs_navmot_10', 
    'cs_navigation_motion', 
    13, 
    'Bản đồ chi phí & Định vị', 
    'Lớp bản đồ chướng ngại vật dựa trên quét tia Raycasting', 
    '### 1. Lớp vật cản Obstacle Layer
Lớp bản đồ chi phí cập nhật liên tục các vật cản động từ LiDAR.
- Thách thức: Làm thế nào để xóa vật cản cũ khỏi bản đồ khi chướng ngại vật di chuyển đi chỗ khác?

### 2. Thuật toán quét tia (Raycasting / Ray-clearing)
Khi LiDAR bắn một tia laser tới chướng ngại vật ở khoảng cách $d$:
- Ô lưới ở khoảng cách $d$ được đánh dấu là **Vật cản (Lethal Obstacle)**.
- Toàn bộ các ô lưới nằm dọc theo đường truyền của tia laser từ mắt phát tới khoảng cách $d-1$ được xác nhận là **Trống (Free Space)**.
- Nhờ cơ chế Raycasting này, khi con người đi qua chỗ khác, tia laser bắn xuyên qua khoảng không cũ sẽ tự động xóa vết vật cản cũ khỏi Costmap thời gian thực.', 
    'core-theory', 
    '["Mô tả cơ chế cập nhật của Obstacle layer khi robot đi qua cửa: tia laser quét trúng cánh cửa mở, ghi nhận vật cản; khi cửa đóng, tia quét trúng cánh cửa gần hơn, xóa vùng trống phía sau cánh cửa cũ.", "Thuật toán Bresenham vẽ đường thẳng trên pixel được dùng để tìm các ô lưới dọc theo đường truyền tia laser."]'::jsonb, 
    '["Raycasting đòi hỏi năng lực tính toán cực lớn nếu LiDAR có số lượng tia quét cao (như 3D LiDAR 16/32 kênh).", "Thông số obstacle_max_range giới hạn khoảng cách quét tia an toàn để tránh ghi nhận nhiễu bụi bẩn ở quá xa.", "Ray-clearing ngăn hiện tượng bóng ma vật cản (ghost obstacles) lưu lại trên costmap làm nghẽn đường đi robot."]'::jsonb, 
    7, 
    TRUE,
    'costmap-localization'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_navmot_01', 'costmap-localization', 'lesson', 'Bản đồ chi phí Costmap & Các lớp bản đồ trong ROS2', '{"lesson_id": "cs_navmot_01"}'::jsonb, 10, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_02', 'costmap-localization', 'lesson', 'Định vị thích nghi Monte Carlo (AMCL)', '{"lesson_id": "cs_navmot_02"}'::jsonb, 20, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_03', 'kinematic-models', 'lesson', 'Mô hình động học xe: Mô hình xe đạp & Lái Ackermann', '{"lesson_id": "cs_navmot_03"}'::jsonb, 10, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_04', 'path-tracking', 'lesson', 'Bộ điều khiển bám đường hình học: Pure Pursuit', '{"lesson_id": "cs_navmot_04"}'::jsonb, 10, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_05', 'path-tracking', 'lesson', 'Bộ điều khiển Stanley cho xe tự hành', '{"lesson_id": "cs_navmot_05"}'::jsonb, 20, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_06', 'path-tracking', 'lesson', 'Bộ điều khiển dự báo mô hình (Model Predictive Control - MPC)', '{"lesson_id": "cs_navmot_06"}'::jsonb, 30, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_07', 'kinematic-models', 'lesson', 'Mô hình Odometry bánh xe & Tính toán sai số tích phân', '{"lesson_id": "cs_navmot_07"}'::jsonb, 20, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_08', 'trajectory-recovery', 'lesson', 'Lập quỹ đạo trơn cho khớp Robot dựa trên đường cong Spline', '{"lesson_id": "cs_navmot_08"}'::jsonb, 10, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_09', 'trajectory-recovery', 'lesson', 'Hành vi phục hồi trạng thái trong ROS2 Navigation', '{"lesson_id": "cs_navmot_09"}'::jsonb, 20, 10, 20, 'cs_navigation_motion', 13),
  ('act-lesson-cs_navmot_10', 'costmap-localization', 'lesson', 'Lớp bản đồ chướng ngại vật dựa trên quét tia Raycasting', '{"lesson_id": "cs_navmot_10"}'::jsonb, 30, 10, 20, 'cs_navigation_motion', 13)
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
