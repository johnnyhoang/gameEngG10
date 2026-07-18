-- SQL migration to seed topics and 10 core lessons for cs_robot_mechanics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robot_mechanics (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('mechanics-dynamics', 'cs_robot_mechanics', 13, 'Động lực học Robot', 'Ma trận Jacobian vi phân, công thức Euler-Lagrange, ma trận quán tính, Coriolis và Newton-Euler.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('contact-grippers', 'cs_robot_mechanics', 13, 'Cơ cấu chấp hành & Tiếp xúc', 'Cơ chế truyền tải cơ khí, ma sát khớp Coulomb/Viscous, cơ cấu kẹp và cơ học ma sát tiếp xúc vật.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('mobile-locomotion', 'cs_robot_mechanics', 13, 'Cơ học dịch chuyển Robot', 'Ràng buộc Non-holonomic, cơ học bánh xe Mecanum/Omni/Vi sai, thăng bằng robot chân đi ZMP.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('physics-simulation', 'cs_robot_mechanics', 13, 'Mô phỏng vật lý Robot', 'Thuật toán tích phân số trị, mô phỏng động lực học trong MuJoCo/Gazebo và tối ưu lực khớp.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robot_mechanics (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_robmec_01', 
    'cs_robot_mechanics', 
    13, 
    'Động lực học Robot', 
    'Động học vi phân & Ma trận Jacobian hình học', 
    '### 1. Định nghĩa Ma trận Jacobian
Ma trận Jacobian $J(q)$ là ma trận ánh xạ từ vận tốc khớp ($\dot{q}$) trong không gian khớp sang vận tốc tuyến tính và vận tốc góc ($v, \omega$) của khâu công tác cuối trong không gian Descartes:
$$\dot{x} = \begin{bmatrix} v \\ \omega \end{bmatrix} = J(q) \dot{q}$$
Trong đó $q \in \mathbb{R}^n$ là vector góc/vị trí khớp, và $\dot{x} \in \mathbb{R}^6$ là vector vận tốc Descartes.

### 2. Ý nghĩa vật lý
- **Vận tốc:** Cho phép tính toán vận tốc tức thời của khâu cuối khi robot chuyển động.
- **Tĩnh học lực:** Theo nguyên lý công ảo (Virtual Work), Jacobian thiết lập quan hệ trực tiếp giữa lực/mô-men xoắn tại các khớp ($\tau$) và lực/mô-men Descartes tác động tại khâu cuối ($F$):
  $$\tau = J^T(q) F$$
  Giúp robot điều khiển lực tiếp xúc mà không cần cảm biến lực ở mọi khớp.', 
    'core-theory', 
    '["Cánh tay robot phẳng 2 khâu tính toán ma trận Jacobian kích thước 2x2 để bám theo một đường thẳng quỹ đạo trơn với vận tốc không đổi.", "Mô tả cơ chế robot kẹp vật thể tác dụng lực F lên khâu cuối, bộ điều khiển dùng ma trận chuyển vị Jacobian J^T(q) để tính mô-men xoắn bù trừ cấp cho các động cơ khớp."]'::jsonb, 
    '["Ma trận Jacobian phụ thuộc vào cấu hình góc khớp hiện tại của robot, do đó phải liên tục được tính toán lại ở mỗi chu kỳ điều khiển.", "Khi ma trận Jacobian bị suy biến (rank < 6), robot rơi vào trạng thái kỳ dị và mất đi bậc tự do chuyển động tương ứng.", "Các cột của ma trận Jacobian hình học đại diện cho ảnh hưởng của từng khớp lên vận tốc của khâu cuối."]'::jsonb, 
    6, 
    TRUE,
    'mechanics-dynamics'
  ),
  (
    'cs_robmec_02', 
    'Động lực học Robot', 
    13, 
    'Động lực học Robot', 
    'Động lực học Robot: Công thức Euler-Lagrange', 
    '### 1. Phương pháp Euler-Lagrange
Phương pháp tiếp cận dựa trên năng lượng để xây dựng phương trình chuyển động của hệ thống nhiều vật thể cứng (robot).
- **Hàm Lagrange (Lagrangian):** Hiệu số giữa động năng $K$ và thế năng $P$ của robot:
  $$\mathcal{L}(q, \dot{q}) = K(q, \dot{q}) - P(q)$$
- **Phương trình chuyển động Euler-Lagrange:**
  $$\frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{q}_i} \right) - \frac{\partial \mathcal{L}}{\partial q_i} = \tau_i$$
  Trong đó $\tau_i$ là lực/mô-men ngoại lực tác động vào khớp $i$.

### 2. Phương trình động lực học tổng quát dạng ma trận
$$M(q)\ddot{q} + C(q, \dot{q})\dot{q} + g(q) = \tau$$
- $M(q) \in \mathbb{R}^{n \times n}$: Ma trận quán tính đối xứng và xác định dương.
- $C(q, \dot{q})\dot{q} \in \mathbb{R}^n$: Vector lực Coriolis và lực ly tâm phi tuyến.
- $g(q) \in \mathbb{R}^n$: Vector lực trọng trường.', 
    'core-theory', 
    '["Vẽ biểu đồ năng lượng của con lắc ngược quay để tính toán mô-men trọng trường cản trở chuyển động tại khớp vai.", "Thiết lập ma trận quán tính đối xứng M(q) của robot phẳng 2 khâu để tính toán gia tốc khớp khi chịu mô-men xoắn từ động cơ."]'::jsonb, 
    '["Ma trận quán tính M(q) luôn đối xứng và xác định dương (symmetric positive-definite), bảo đảm động năng robot K = 0.5 * q_dot^T * M * q_dot luôn lớn hơn 0 khi robot chuyển động.", "Lực Coriolis xuất hiện do sự tương tác giữa vận tốc của hai khớp khác nhau; lực ly tâm xuất hiện khi một khớp quay với vận tốc cao tự tác dụng lực lên chính nó.", "Vector trọng lực g(q) phụ thuộc trực tiếp vào góc khớp hiện tại và gia tốc trọng trường Trái Đất g."]'::jsonb, 
    7, 
    TRUE,
    'mechanics-dynamics'
  ),
  (
    'cs_robmec_03', 
    'cs_robot_mechanics', 
    13, 
    'Động lực học Robot', 
    'Động lực học ngược & Thuật toán Newton-Euler', 
    '### 1. Động lực học thuận vs Động lực học ngược
- **Động lực học thuận (Forward Dynamics):** Biết mô-men khớp $\tau$, tính gia tốc khớp $\ddot{q}$ $\rightarrow$ dùng để mô phỏng chuyển động robot.
- **Động lực học ngược (Inverse Dynamics):** Biết quỹ đạo mong muốn ($q, \dot{q}, \ddot{q}$), tính mô-men khớp $\tau$ cần thiết $\rightarrow$ dùng để điều khiển moment trực tiếp (Force Control).

### 2. Thuật toán Recursive Newton-Euler (RNEA)
Xây dựng phương trình chuyển động dựa trên định luật Newton (F=ma) và Euler (Mô-men = I*alpha) cho từng khâu bằng thuật toán đệ quy hiệu quả cao:
- **Đệ quy tiến (Forward pass):** Tính toán vận tốc, gia tốc tuyến tính và góc của từng khâu đi từ gốc (base) tới khâu cuối (end-effector).
- **Đệ quy lùi (Backward pass):** Tính toán lực và mô-men liên kết nội tại từ khâu cuối lùi dần về gốc để tìm mô-men xoắn động cơ tại các khớp.', 
    'core-theory', 
    '["Bộ điều khiển robot thực thi giải thuật RNEA ở chu kỳ 1kHz để tính toán mô-men bù trọng trường tức thời giúp cánh tay robot đứng lơ lửng chống lại trọng lực.", "Cấu hình gia tốc gốc base bằng [0, 0, 9.81]^T để tự động tích hợp lực trọng trường vào thuật toán đệ quy tiến."]'::jsonb, 
    '["RNEA có độ phức tạp thuật toán tuyến tính O(N) với N là số khớp robot, nhanh hơn nhiều so với phương pháp Euler-Lagrange O(N^3).", "RNEA là thuật toán tiêu chuẩn được cài đặt trong mọi thư viện mô phỏng vật lý robot hiện đại (như Pinocchio).", "Điều khiển động lực học ngược giúp triệt tiêu phi tuyến quán tính và ma sát, biến robot thành hệ tuyến tính dễ điều khiển PID."]'::jsonb, 
    7, 
    TRUE,
    'mechanics-dynamics'
  ),
  (
    'cs_robmec_04', 
    'cs_robot_mechanics', 
    13, 
    'Cơ cấu chấp hành & Tiếp xúc', 
    'Cơ học khớp mềm & Đàn hồi cơ khí (Joint Compliance)', 
    '### 1. Khái niệm Khớp mềm (Flexible Joints)
Trong robot thực tế, các khâu và khớp không hoàn toàn cứng vững tuyệt đối (rigid). Sự mềm dẻo xuất hiện do:
- Sự biến dạng đàn hồi của hộp số sóng Harmonic Drive.
- Sự co giãn của dây cáp truyền động (cable-driven) hoặc dây đai răng.
- Biến dạng uốn cong của các liên kết khâu dài, siêu nhẹ.

### 2. Mô hình hóa khớp mềm
Khớp mềm được mô tả vật lý như một hệ lò xo - giảm chấn tích hợp giữa trục động cơ ($\theta$) và trục khâu ($q$):
$$\tau = K_{\text{joint}} (\theta - q)$$
Trong đó $K_{\text{joint}}$ là độ cứng vững khớp (Stiffness).
- Dẫn tới hiện tượng dao động cộng hưởng ở tần số cao, làm giảm độ chính xác định vị khâu cuối và gây rung lắc khi robot dừng đột ngột.', 
    'core-theory', 
    '["Cánh tay robot cộng tác UR5 sử dụng khớp mềm giảm tải va chạm vật lý trực tiếp lên người công nhân.", "Phân tích dao động tắt dần của cánh tay robot nhẹ khi kết thúc di chuyển nhanh để thiết kế bộ lọc triệt tiêu cộng hưởng (Input Shaping)."]'::jsonb, 
    '["Khớp mềm làm tăng bậc tự do động lực học của robot lên gấp đôi, yêu cầu các giải thuật điều khiển phản hồi trạng thái phức tạp.", "SEA (Series Elastic Actuator) chủ động chèn lò xo vật lý vào khớp để đo lực va chạm qua độ biến dạng lò xo và tăng tính an toàn.", "Backlash (rơ răng) kết hợp với độ mềm khớp tạo nên phi tuyến phức tạp khó bù trừ."]'::jsonb, 
    6, 
    TRUE,
    'contact-grippers'
  ),
  (
    'cs_robmec_05', 
    'cs_robot_mechanics', 
    13, 
    'Cơ cấu chấp hành & Tiếp xúc', 
    'Cơ cấu kẹp & Cơ học ma sát khi tiếp xúc', 
    '### 1. Cơ cấu kẹp (Grippers / End-effectors)
Là khâu cuối thực hiện thao tác tương tác vật lý trực tiếp với vật thể.
- **Gripper kẹp ngón cơ khí (Parallel/Angular Grippers):** Kẹp vật bằng ma sát lực.
- **Giác hút chân không (Vacuum Grippers):** Giữ vật bằng chênh lệch áp suất khí quyển.

### 2. Cơ học ma sát tiếp xúc (Contact Mechanics)
Khi robot kẹp vật thể, lực kẹp $F_N$ (lực pháp tuyến) sinh ra lực ma sát $F_f$ (lực tiếp tuyến) giữ vật không rơi:
$$F_f \le \mu F_N$$
Trong đó $\mu$ là hệ số ma sát giữa bề mặt ngón kẹp và vật thể.
- **Nón ma sát (Friction Cone):** Vùng các hướng lực tác dụng khả thi mà không gây trượt. Lực tác dụng phải nằm trong nón ma sát để bảo đảm kẹp giữ vững chắc.
- **Kẹp khóa hình học (Form Closure):** Thiết kế ngón kẹp ôm trọn vật thể, giữ vật hoàn toàn bằng ràng buộc cơ khí không phụ thuộc ma sát lực.', 
    'core-theory', 
    '["Tính toán lực kẹp tối thiểu của tay kẹp 2 ngón song song để nâng hộp carton nặng 2kg với hệ số ma sát là 0.3 và gia tốc cực đại là 2G.", "Mô tả trạng thái trượt của vật thể hình trụ khi lực tác dụng lệch ra ngoài nón ma sát."]'::jsonb, 
    '["Kẹp khóa lực (Force Closure) phụ thuộc hoàn toàn vào lực ma sát và ma sát bề mặt tiếp xúc.", "Vật liệu ngón kẹp thường bọc cao su mềm để tăng hệ số ma sát và phân bố lực tiếp xúc đều hơn.", "Lập kế hoạch kẹp (Grasp Planning) tìm kiếm các điểm tiếp xúc tối ưu trên bề mặt vật thể 3D để tối đa hóa nón ma sát."]'::jsonb, 
    6, 
    TRUE,
    'contact-grippers'
  ),
  (
    'cs_robmec_06', 
    'cs_robot_mechanics', 
    13, 
    'cs_robot_mechanics', 
    'Cơ học khớp ma sát: Coulomb & Viscous Friction', 
    '### 1. Phân loại ma sát khớp trong Robot
Ma sát xuất hiện trong hộp số và ổ đỡ làm tiêu hao năng lượng và gây phi tuyến ở vận tốc thấp:
- **Ma sát khô Coulomb:** Lực ma sát không đổi về độ lớn, chỉ phụ thuộc vào chiều chuyển động (dấu của vận tốc):
  $$\tau_{\text{Coulomb}} = f_c \cdot \text{sgn}(\dot{q})$$
- **Ma sát nhớt (Viscous friction):** Lực ma sát tỷ lệ tuyến tính với vận tốc khớp:
  $$\tau_{\text{Viscous}} = f_v \cdot \dot{q}$$
- **Hiệu ứng Stribeck:** Lực ma sát cực đại ở vận tốc bằng 0 (ma sát nghỉ Static friction), sau đó giảm mạnh khi bắt đầu chuyển động rồi mới tăng tuyến tính theo ma sát nhớt.

### 2. Bù ma sát khớp (Friction Compensation)
Nếu không được bù trừ, ma sát khớp sẽ gây ra sai số bám quỹ đạo lớn tại các điểm đảo chiều vận tốc (vận tốc đi qua 0). Bộ điều khiển động lực học tích hợp mô hình ma sát để cộng thêm lực kéo bù trừ.', 
    'core-theory', 
    '["Vẽ đồ thị lực ma sát theo vận tốc thể hiện rõ hiệu ứng Stribeck và điểm ma sát nghỉ static friction.", "Bộ điều khiển robot cộng thêm mô-men bù ma sát: \\(\\tau_{\\text{bù}} = f_c \\cdot \\text{sgn}(\\dot{q}_d) + f_v \\cdot \\dot{q}_d\\) vào ngõ ra điều khiển."]'::jsonb, 
    '["Hiện tượng ma sát nghỉ làm robot bị giật cục (stick-slip) khi cố gắng di chuyển cực kỳ chậm.", "Mô hình ma sát khớp thay đổi theo thời gian và nhiệt độ bôi trơn của dầu hộp số.", "Nhận dạng hệ thống (System Identification) là bước bắt buộc để đo đạc các hệ số ma sát thực tế của từng khớp robot."]'::jsonb, 
    6, 
    TRUE,
    'contact-grippers'
  ),
  (
    'cs_robmec_07', 
    'cs_robot_mechanics', 
    13, 
    'Cơ học dịch chuyển Robot', 
    'Mô hình cơ học Robot di động: Bánh xe Mecanum, Omni & Vi sai', 
    '### 1. Hệ thống bánh xe di động
- **Robot di sai (Differential Drive):** Gồm 2 bánh chủ động song song chịu trách nhiệm điều hướng và di chuyển bằng chênh lệch vận tốc. Bị ràng buộc Non-holonomic (không thể trượt ngang trực tiếp).
- **Bánh xe Omni / Mecanum:** Cho phép robot chuyển động đa hướng (Holonomic) lập tức theo bất kỳ hướng nào ($x, y, \theta$) mà không cần xoay thân robot. Bánh Mecanum sử dụng các con lăn phụ nghiêng góc 45 độ quanh vành bánh xe.

### 2. Phương trình động học vi phân Mecanum
Ma trận động học thuận chuyển đổi vận tốc quay 4 bánh xe ($\omega_1, \omega_2, \omega_3, \omega_4$) sang vận tốc Descartes của robot ($v_x, v_y, \omega_z$):
$$\begin{bmatrix} v_x \\ v_y \\ \omega_z \end{bmatrix} = J_{\text{wheel}} \begin{bmatrix} \omega_1 \\ \omega_2 \\ \omega_3 \\ \omega_4 \end{bmatrix}$$
Quyết định trực tiếp khả năng bám quỹ đạo đa hướng của robot tự hành AMR trong nhà kho.', 
    'core-theory', 
    '["Robot AGV di sai quay đầu tại chỗ bằng cách cho 2 bánh quay ngược chiều với tốc độ bằng nhau.", "Tính toán tốc độ 4 bánh xe Mecanum để robot tịnh tiến ngang sang phải 90 độ."]'::jsonb, 
    '["Ràng buộc Non-holonomic giới hạn không gian vận tốc tức thời nhưng không giới hạn không gian cấu hình vị trí cuối cùng.", "Bánh xe Mecanum tạo ra nhiều rung động cơ khí hơn bánh xe cao su phẳng thông thường do sự chuyển tiếp giữa các con lăn nhỏ.", "Robot đa hướng holonomic có lợi thế điều động cực cao trong không gian chật hẹp của nhà kho công nghiệp."]'::jsonb, 
    7, 
    TRUE,
    'mobile-locomotion'
  ),
  (
    'cs_robmec_08', 
    'cs_robot_mechanics', 
    13, 
    'Cơ học dịch chuyển Robot', 
    'Động lực học robot đi bằng chân & Thăng bằng ZMP', 
    '### 1. Robot di chuyển bằng chân (Legged Robots)
Di chuyển linh hoạt trên địa hình phức tạp, gồ ghề (bậc thang, đá hộc) nơi robot bánh xe bất lực. Phổ biến là Robot 4 chân (Quadruped) và Robot 2 chân (Bipedal/Humanoid).

### 2. Điểm không mô-men (Zero Moment Point - ZMP)
Điểm trên mặt đất nơi tổng mô-men xoắn của lực quán tính và lực trọng trường tác động lên robot theo phương ngang bằng 0.
- **Tiêu chuẩn thăng bằng ZMP (Định lý Vukobratovic):** Để robot chân đi không bị ngã nhào, điểm ZMP bắt buộc phải nằm bên trong **Đa giác hỗ trợ (Support Polygon)** - đa giác bao quanh các điểm tiếp xúc của bàn chân robot với mặt đất.
- Nếu ZMP chạy ra ngoài đa giác hỗ trợ, robot bắt đầu xoay quanh cạnh bàn chân và ngã đổ.', 
    'core-theory', 
    '["Robot Atlas của Boston Dynamics nhảy lò cò giữ thăng bằng bằng cách liên tục điều chỉnh bàn chân đặt xuống để đa giác hỗ trợ bao trọn ZMP động.", "Tính toán đa giác hỗ trợ khi robot 2 chân đứng bằng cả 2 chân so với khi chỉ đứng bằng 1 chân."]'::jsonb, 
    '["Đa giác hỗ trợ co hẹp lại cực nhỏ khi robot chỉ tiếp đất bằng một gót chân, đòi hỏi thuật toán phản hồi nhanh.", "Mô hình con lắc ngược 3D (Linear Inverted Pendulum Model - LIPM) thường dùng để đơn giản hóa động lực học robot humanoid phục vụ lập kế hoạch bước chân.", "Khác với robot bánh xe ổn định tĩnh, robot đi bằng chân đòi hỏi sự ổn định động lực học liên tục."]'::jsonb, 
    7, 
    TRUE,
    'mobile-locomotion'
  ),
  (
    'cs_robmec_09', 
    'cs_robot_mechanics', 
    13, 
    'Mô phỏng vật lý Robot', 
    'Mô phỏng vật lý Robot & Thuật toán tích phân số trị', 
    '### 1. Vai trò của bộ mô phỏng vật lý (Physics Engines)
Mô phỏng động lực học robot trong máy tính giúp thử nghiệm thuật toán điều khiển mà không lo hư hỏng phần cứng thật. Các bộ mô phỏng lớn gồm Gazebo (ODE engine) và MuJoCo (tối ưu tính toán tiếp xúc cứng).

### 2. Thuật toán tích phân số trị (Numerical Integration)
Để mô phỏng chuyển động, máy tính phải giải phương trình vi phân động lực học $\ddot{q} = M^{-1}(\tau - C\dot{q} - g)$ theo thời gian thực bằng các bước nhảy thời gian nhỏ $\Delta t$:
- **Tích phân Euler:**
  $$q(t + \Delta t) \approx q(t) + \dot{q}(t) \Delta t$$
  Đơn giản, nhanh nhưng dễ tích lũy sai số gây mất ổn định vật lý (robot tự bay lên).
- **Phương pháp Runge-Kutta bậc 4 (RK4):** Tính toán đạo hàm tại 4 điểm thử trong khoảng $\Delta t$ để cho ra độ chính xác vượt trội, bảo toàn năng lượng tốt hơn.', 
    'core-theory', 
    '["Cấu hình bước thời gian mô phỏng \\(\\Delta t = 1\\text{ms}\\) trong Gazebo để chạy bộ điều khiển PID tần số 1kHz.", "Hiện tượng mô phỏng bị nổ tung (physics explosion) khi robot va chạm mạnh với mặt đất do bước tích phân quá lớn khiến lực tiếp xúc tính ra tiến tới vô cực."]'::jsonb, 
    '["MuJoCo giải bài toán tiếp xúc bằng phương pháp lập trình lồi (Convex Optimization) giúp tính toán va chạm của bàn tay robot nhiều ngón cực kỳ nhanh.", "Tích phân Euler ẩn (Implicit Euler) có tính ổn định toán học cao hơn Euler hiện (Explicit Euler) cho các hệ cứng vững.", "Mô phỏng Dynamics đòi hỏi thông số khối lượng (Mass), mô-men quán tính (Inertia Matrix) và vị trí trọng tâm (CoG) của từng khâu phải chính xác."]'::jsonb, 
    6, 
    TRUE,
    'physics-simulation'
  ),
  (
    'cs_robmec_10', 
    'cs_robot_mechanics', 
    13, 
    'Mô phỏng vật lý Robot', 
    'Hệ thống truyền động khí nén & thủy lực (Pneumatics & Hydraulics)', 
    '### 1. Hệ thống truyền động chất lưu (Fluid Power)
Sử dụng chất lưu áp suất cao để tạo ra lực tịnh tiến hoặc mô-men quay khổng lồ:
- **Khí nén (Pneumatics):** Sử dụng không khí nén. Lực vừa phải, chuyển động đàn hồi do không khí nén được (thuận lợi cho tay kẹp mềm), phản hồi nhanh, sạch sẽ.
- **Thủy lực (Hydraulics):** Sử dụng dầu thủy lực không nén được. Tạo ra mật độ công suất lực cực kỳ khủng khiếp, chịu tải siêu nặng, tự bôi trơn nhưng dễ rò rỉ dầu và nặng nề.

### 2. Đặc trưng cơ học chất lưu trong Robot
Lực tạo ra bởi pít-tông:
$$F = P \cdot A$$
Trong đó $P$ là áp suất chất lưu, $A$ là diện tích tiết diện pít-tông.
- Ứng dụng: Robot thủy lực hạng nặng (như robot cứu hộ, máy xúc tự hành) và tay kẹp khí nén mềm trong nhà máy thực phẩm.', 
    'core-theory', 
    '["Robot 4 chân BigDog đời đầu của Boston Dynamics sử dụng bơm động cơ xăng dẫn động hệ thống thủy lực toàn thân để mang tải 150kg đi rừng.", "Pít-tông khí nén hành trình 100mm điều khiển đóng mở giác kẹp hút chân không gắp trứng gà."]'::jsonb, 
    '["Hệ thống thủy lực đòi hỏi các van servo tỷ lệ (Proportional Servo Valves) cực kỳ tinh vi để điều phối lưu lượng dầu chính xác.", "Tính chất đàn hồi tự nhiên của không khí giúp robot khí nén chống lại va đập cơ khí rất tốt mà không cần lò xo phụ.", "Rò rỉ dầu thủy lực là kẻ thù lớn nhất trong môi trường phòng sạch công nghiệp."]'::jsonb, 
    6, 
    TRUE,
    'physics-simulation'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_robmec_01', 'mechanics-dynamics', 'lesson', 'Động học vi phân & Ma trận Jacobian hình học', '{"lesson_id": "cs_robmec_01"}'::jsonb, 10, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_02', 'mechanics-dynamics', 'lesson', 'Động lực học Robot: Công thức Euler-Lagrange', '{"lesson_id": "cs_robmec_02"}'::jsonb, 20, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_03', 'mechanics-dynamics', 'lesson', 'Động lực học ngược & Thuật toán Newton-Euler', '{"lesson_id": "cs_robmec_03"}'::jsonb, 30, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_04', 'contact-grippers', 'lesson', 'Cơ học khớp mềm & Đàn hồi cơ khí (Joint Compliance)', '{"lesson_id": "cs_robmec_04"}'::jsonb, 10, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_05', 'contact-grippers', 'lesson', 'Cơ cấu kẹp & Cơ học ma sát khi tiếp xúc', '{"lesson_id": "cs_robmec_05"}'::jsonb, 20, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_06', 'contact-grippers', 'lesson', 'Cơ học khớp ma sát: Coulomb & Viscous Friction', '{"lesson_id": "cs_robmec_06"}'::jsonb, 30, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_07', 'mobile-locomotion', 'lesson', 'Mô hình cơ học Robot di động: Bánh xe Mecanum, Omni & Vi sai', '{"lesson_id": "cs_robmec_07"}'::jsonb, 10, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_08', 'mobile-locomotion', 'lesson', 'Động lực học robot đi bằng chân & Thăng bằng ZMP', '{"lesson_id": "cs_robmec_08"}'::jsonb, 20, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_09', 'physics-simulation', 'lesson', 'Mô phỏng vật lý Robot & Thuật toán tích phân số trị', '{"lesson_id": "cs_robmec_09"}'::jsonb, 10, 10, 20, 'cs_robot_mechanics', 13),
  ('act-lesson-cs_robmec_10', 'physics-simulation', 'lesson', 'Hệ thống truyền động khí nén & thủy lực (Pneumatics & Hydraulics)', '{"lesson_id": "cs_robmec_10"}'::jsonb, 20, 10, 20, 'cs_robot_mechanics', 13)
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
