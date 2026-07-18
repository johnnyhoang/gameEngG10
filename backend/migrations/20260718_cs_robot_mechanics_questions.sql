-- SQL migration to seed 100 question bank for cs_robot_mechanics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_robot_mechanics (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_robot_mechanics';

-- ======================================================================================
-- BÀI GIẢNG 1: Động học vi phân & Ma trận Jacobian hình học (cs_robmec_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_001', 'mcq', 'mechanics-dynamics',
    'Ma trận Jacobian hình học J(q) ánh xạ đại lượng nào sang đại lượng nào?',
    ARRAY['Vận tốc khớp sang vận tốc tuyến tính và vận tốc góc khâu cuối Descartes', 'Góc khớp sang vị trí khâu cuối', 'Mô-men xoắn khớp sang lực tiếp xúc', 'Gia tốc khớp sang năng lượng'],
    ARRAY['Vận tốc khớp sang vận tốc tuyến tính và vận tốc góc khâu cuối Descartes']::varchar[],
    'Jacobian liên kết vận tốc khớp và vận tốc khâu cuối: x_dot = J(q) * q_dot.',
    6, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_002', 'mcq', 'mechanics-dynamics',
    'Mối quan hệ tĩnh học lực giữa lực khâu cuối F và mô-men khớp \\(\\tau\\) qua ma trận Jacobian chuyển vị là gì?',
    ARRAY['\\(\\tau = J^T(q) F\\)', '\\(\\tau = J(q) F\\)', '\\(\\tau = J^{-1}(q) F\\)', 'F = J^T(q) \\(\\tau\\)'],
    ARRAY['\\(\\tau = J^T(q) F\\)']::varchar[],
    'Theo nguyên lý công ảo, moment khớp tỷ lệ với lực khâu cuối nhân với ma trận chuyển vị Jacobian J^T(q).',
    7, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_003', 'mcq', 'mechanics-dynamics',
    'Khi robot ở trạng thái kỳ dị (Singularity), ma trận Jacobian có thuộc tính nào?',
    ARRAY['Định thức bằng 0 (bị suy biến, rank giảm)', 'Tất cả phần tử bằng 0', 'Trở thành ma trận đơn vị', 'Có định thức bằng vô cực'],
    ARRAY['Định thức bằng 0 (bị suy biến, rank giảm)']::varchar[],
    'Tại điểm kỳ dị, ma trận Jacobian suy biến khiến hệ phương trình vận tốc không còn độc lập tuyến tính.',
    6, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_004', 'mcq', 'mechanics-dynamics',
    'Một robot có 6 khớp quay độc lập thì ma trận Jacobian hình học có kích thước bao nhiêu?',
    ARRAY['6x6', '6x1', '3x3', '4x4'],
    ARRAY['6x6']::varchar[],
    'Vận tốc khâu cuối Descartes có 6 chiều (3 tịnh tiến, 3 xoay) và robot có 6 khớp quay nên Jacobian là 6x6.',
    5, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_005', 'mcq', 'mechanics-dynamics',
    'Cột thứ i của ma trận Jacobian biểu thị điều gì?',
    ARRAY['Ảnh hưởng của vận tốc khớp thứ i lên vận tốc của khâu cuối khi các khớp khác đứng yên', 'Góc quay của khớp i', 'Mô-men quán tính của khâu i', 'Khối lượng của khâu i'],
    ARRAY['Ảnh hưởng của vận tốc khớp thứ i lên vận tốc của khâu cuối khi các khớp khác đứng yên']::varchar[],
    'Mỗi cột đại diện cho vi phân vận tốc khâu cuối đối với một biến khớp tương ứng.',
    6, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_006', 'mcq', 'mechanics-dynamics',
    'Điều gì xảy ra với mô-men khớp lý thuyết khi robot cố gắng tác dụng lực lớn gần điểm kỳ dị?',
    ARRAY['Mô-men khớp yêu cầu rất nhỏ (tiến về 0)', 'Mô-men khớp tiến tới vô hạn', 'Robot tự động ngắt nguồn điện', 'Không có ảnh hưởng gì'],
    ARRAY['Mô-men khớp yêu cầu rất nhỏ (tiến về 0)']::varchar[],
    'Gần điểm kỳ dị, robot có thể chịu lực rất lớn ở khâu cuối theo hướng kỳ dị mà chỉ cần mô-men khớp cực nhỏ nhờ cơ cấu cơ khí tự khóa.',
    7, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_007', 'mcq', 'mechanics-dynamics',
    'Tại sao Jacobian hình học lại được gọi là "hình học" (geometric)?',
    ARRAY['Vì nó được xây dựng trực tiếp từ cấu trúc hình học liên kết của robot mà không dùng đạo hàm thời gian của Euler Angles', 'Vì nó chỉ vẽ được hình tròn', 'Vì nó có giá trị cố định', 'Vì nó chỉ dùng cho robot 2D phẳng'],
    ARRAY['Vì it được xây dựng trực tiếp từ cấu trúc hình học liên kết của robot mà không dùng đạo hàm thời gian của Euler Angles']::varchar[],
    'Jacobian hình học biểu diễn vận tốc góc trực tiếp bằng vector vận tốc quay vật lý, tránh hiện tượng kỳ dị biểu diễn góc Euler.',
    7, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_008', 'mcq', 'mechanics-dynamics',
    'Khi robot có nhiều khớp hơn số bậc tự do yêu cầu của tác vụ (ví dụ robot 7 khớp làm việc 6 DOF), robot đó được gọi là gì?',
    ARRAY['Robot dư dẫn động (Redundant Robot)', 'Robot thiếu dẫn động', 'Robot kỳ dị', 'Robot tĩnh học'],
    ARRAY['Robot dư dẫn động (Redundant Robot)']::varchar[],
    'Redundant Robot có nhiều hơn số DOF tối thiểu, cho phép tránh chướng ngại vật linh hoạt trong khi khâu cuối vẫn giữ nguyên vị trí.',
    6, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_009', 'short-answer', 'mechanics-dynamics',
    'Điền tên ma trận đạo hàm riêng làm cầu nối vận tốc khớp và vận tốc khâu cuối. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Jacobian', 'Ma trận jacobian']::varchar[],
    'Ma trận Jacobian mô tả động học vi phân.',
    5, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  ),
  (
    'cs_robmec_q_010', 'short-answer', 'mechanics-dynamics',
    'Nếu robot có 3 khớp thì ma trận Jacobian hình học có bao nhiêu cột? (Điền số)',
    NULL,
    ARRAY['3']::varchar[],
    'Số cột của ma trận Jacobian luôn bằng số khớp của robot.',
    5, 'Robot Mechanics', 'cs_robot_mechanics', 13, 'cs_robmec_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Động lực học Robot: Công thức Euler-Lagrange (cs_robmec_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_011', 'mcq', 'mechanics-dynamics',
    'Hàm Lagrangian L được định nghĩa thế nào trong phương pháp Euler-Lagrange?',
    ARRAY['L = K - P (Động năng trừ Thế năng)', 'L = K + P', 'L = K * P', 'L = dK/dt'],
    ARRAY['L = K - P (Động năng trừ Thế năng)']::varchar[],
    'Hàm Lagrange bằng hiệu số năng lượng động năng K và thế năng P.',
    5, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_012', 'mcq', 'mechanics-dynamics',
    'Thành phần M(q) trong phương trình động lực học tổng quát M(q)q_ddot + C(q,q_dot)q_dot + g(q) = \\(\\tau\\) là gì?',
    ARRAY['Ma trận quán tính đối xứng và xác định dương', 'Ma trận ma sát khớp', 'Ma trận trọng trường', 'Ma trận Jacobian'],
    ARRAY['Ma trận quán tính đối xứng và xác định dương']::varchar[],
    'M(q) biểu diễn quán tính khối lượng của các khâu đối với các tọa độ khớp.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_013', 'mcq', 'mechanics-dynamics',
    'Thành phần C(q, q_dot)q_dot trong phương trình động lực học tổng quát biểu thị các lực phi tuyến nào?',
    ARRAY['Lực Coriolis và lực ly tâm', 'Lực ma sát Coulomb', 'Lực trọng trường Trái Đất', 'Lực đẩy pít-tông khí nén'],
    ARRAY['Lực Coriolis và lực ly tâm']::varchar[],
    'C(q, q_dot) chứa các tích số vận tốc góc sinh ra do chuyển động quay của hệ nhiều vật cứng.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_014', 'mcq', 'mechanics-dynamics',
    'Thế năng P(q) của robot chủ yếu sinh ra do yếu tố môi trường vật lý nào?',
    ARRAY['Trọng trường của Trái Đất tác dụng lên khối lượng các khâu', 'Nhiệt độ phòng thi', 'Điện áp ắc quy', 'Độ ẩm không khí'],
    ARRAY['Trọng trường của Trái Đất tác dụng lên khối lượng các khâu']::varchar[],
    'Thế năng trọng trường $P = mgh$ phụ thuộc trực tiếp vào vị trí hình học của tâm khối lượng các khâu.',
    5, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_015', 'mcq', 'mechanics-dynamics',
    'Đặc trưng quan trọng nhất của ma trận quán tính M(q) giúp đảm bảo động năng của robot luôn dương khi chuyển động là gì?',
    ARRAY['Xác định dương (positive-definite)', 'Có các phần tử bằng 0', 'Là ma trận chéo', 'Có định thức bằng -1'],
    ARRAY['Xác định dương (positive-definite)']::varchar[],
    'Ma trận xác định dương bảo đảm động năng $K = 0.5 * \dot{q}^T * M * \dot{q} > 0$ với mọi $\dot{q} \ne 0$.',
    7, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_016', 'mcq', 'mechanics-dynamics',
    'Khi robot đứng yên hoàn toàn (vận tốc và gia tốc khớp bằng 0), mô-men xoắn khớp cần cấp để giữ robot đứng im chống lại trọng lực bằng đại lượng nào?',
    ARRAY['Vector lực trọng trường g(q)', 'Bằng 0', 'Lực ma sát nhớt', 'Mô-men quán tính M(q)'],
    ARRAY['Vector lực trọng trường g(q)']::varchar[],
    'Khi $\dot{q} = \ddot{q} = 0$, phương trình động lực học rút gọn thành $g(q) = \tau$.',
    5, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_017', 'mcq', 'mechanics-dynamics',
    'Tại sao phương pháp Euler-Lagrange ít được dùng trực tiếp để tính toán điều khiển thời gian thực cho robot trên 6 khớp?',
    ARRAY['Độ phức tạp tính toán tăng theo hàm lũy thừa bậc 3 O(N^3) với N là số khớp, quá nặng cho CPU nhúng', 'Vì công thức cho kết quả sai lệch', 'Vì nó không có ma sát', 'Vì nó đòi hỏi cảm biến LiDAR'],
    ARRAY['Độ phức tạp tính toán tăng theo hàm lũy thừa bậc 3 O(N^3) với N là số khớp, quá nặng cho CPU nhúng']::varchar[],
    'Tính toán đạo hàm tượng trưng trong Euler-Lagrange tốn rất nhiều phép nhân ma trận cho hệ nhiều khớp.',
    7, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_018', 'mcq', 'mechanics-dynamics',
    'Công thức tính động năng K của một khâu quay là gì?',
    ARRAY['K = 0.5 * m * v^2 + 0.5 * I * omega^2', 'K = m * g * h', 'K = F * d', 'K = 0.5 * k * x^2'],
    ARRAY['K = 0.5 * m * v^2 + 0.5 * I * omega^2']::varchar[],
    'Động năng khâu cứng gồm động năng tịnh tiến của trọng tâm và động năng quay quanh trọng tâm.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_019', 'short-answer', 'mechanics-dynamics',
    'Điền tên tiếng Anh của hiệu số năng lượng Động năng trừ Thế năng dùng trong cơ học phân tích. (Viết thường)',
    NULL,
    ARRAY['lagrangian', 'lagrange']::varchar[],
    'Lagrangian là hàm Lagrange L = K - P.',
    5, 'Robot Dynamics', 'cs_robotics_fundamentals', 13, 'cs_robmec_02'
  ),
  (
    'cs_robmec_q_020', 'short-answer', 'mechanics-dynamics',
    'Đồ thị lực trọng trường g(q) của một khớp quay biến đổi tuần hoàn theo hàm lượng giác nào của góc khớp? (Viết thường)',
    NULL,
    ARRAY['sin', 'cos', 'sine', 'cosine']::varchar[],
    'Mô-men trọng lực tỷ lệ với cánh tay đòn, biến thiên theo hàm sin hoặc cos của góc khớp.',
    5, 'Robot Dynamics', 'cs_robotics_fundamentals', 13, 'cs_robmec_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Động lực học ngược & Thuật toán Newton-Euler (cs_robmec_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_021', 'mcq', 'mechanics-dynamics',
    'Bài toán Động lực học ngược (Inverse Dynamics) thực hiện việc gì?',
    ARRAY['Biết trước quỹ đạo mong muốn (q, q_dot, q_ddot), tính toán mô-men khớp cần thiết', 'Biết mô-men khớp, tính quỹ đạo chuyển động', 'Tính góc khớp từ vị trí Descartes', 'Tính ma trận xoay từ góc D-H'],
    ARRAY['Biết trước quỹ đạo mong muốn (q, q_dot, q_ddot), tính toán mô-men khớp cần thiết']::varchar[],
    'Động lực học ngược tính mô-men xoắn cần cấp cho động cơ để sinh ra gia tốc quỹ đạo mong muốn.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_022', 'mcq', 'mechanics-dynamics',
    'Bài toán Động lực học thuận (Forward Dynamics) dùng để làm gì trong phần mềm robot?',
    ARRAY['Mô phỏng chuyển động vật lý của robot trong môi trường ảo khi biết lực tác dụng', 'Tính toán vị trí khâu cuối', 'Tính mô-men chống trọng lực', 'Tính sai số bám quỹ đạo'],
    ARRAY['Mô phỏng chuyển động vật lý của robot trong môi trường ảo khi biết lực tác dụng']::varchar[],
    'Động lực học thuận tính gia tốc từ lực/mô-men, tích phân gia tốc theo thời gian để mô phỏng chuyển động.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_023', 'mcq', 'mechanics-dynamics',
    'Độ phức tạp tính toán của thuật toán đệ quy Newton-Euler (RNEA) là bao nhiêu?',
    ARRAY['O(N) - Tuyến tính với số khớp N', 'O(N^3)', 'O(2^N)', 'O(1)'],
    ARRAY['O(N) - Tuyến tính với số khớp N']::varchar[],
    'RNEA đệ quy tiến và lùi dọc theo các khâu từ base tới tip nên có thời gian chạy tuyến tính O(N), cực nhanh.',
    7, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_024', 'mcq', 'mechanics-dynamics',
    'Trong thuật toán RNEA, bước đệ quy tiến (Forward pass) tính toán các đại lượng nào?',
    ARRAY['Vận tốc, gia tốc tuyến tính và góc của từng khâu đi từ base tới end-effector', 'Lực và mô-men liên kết nội tại từ đầu khâu lùi về gốc', 'Hệ số ma sát của các ổ bi', 'Điện áp cấp cho driver động cơ'],
    ARRAY['Vận tốc, gia tốc tuyến tính và góc của từng khâu đi từ base tới end-effector']::varchar[],
    'Đệ quy tiến truyền chuyển động từ gốc (base) đã biết gia tốc và vận tốc (thường bằng 0 và gia tốc trọng lực) ra ngoài.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_025', 'mcq', 'mechanics-dynamics',
    'Trong thuật toán RNEA, bước đệ quy lùi (Backward pass) thực hiện việc gì?',
    ARRAY['Tính toán lực và mô-men liên kết tại khớp từ khâu cuối ngược về gốc để tìm mô-men xoắn khớp', 'Tính toán ma trận Jacobian', 'Tích phân Euler gia tốc khớp', 'Đo đạc góc quay encoder'],
    ARRAY['Tính toán lực và mô-men liên kết tại khớp từ khâu cuối ngược về gốc để tìm mô-men xoắn khớp']::varchar[],
    'Đệ quy lùi cân bằng lực/mô-men Newton-Euler trên từng khâu từ khâu tự do cuối cùng lùi dần về gốc base.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_026', 'mcq', 'mechanics-dynamics',
    'Định luật vật lý nào làm nền tảng cho việc tính toán lực khâu trong thuật toán Newton-Euler?',
    ARRAY['Định luật 2 Newton (F=m*a) và phương trình Euler cho vật rắn quay', 'Định luật vạn vật hấp dẫn', 'Định luật bảo toàn năng lượng', 'Định luật Ohm về dòng điện'],
    ARRAY['Định luật 2 Newton (F=m*a) và phương trình Euler cho vật rắn quay']::varchar[],
    'Thuật toán Newton-Euler cân bằng lực tuyến tính bằng F=ma và mô-men xoắn xoay bằng phương trình Euler.',
    6, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_027', 'mcq', 'mechanics-dynamics',
    'Để tích hợp gia tốc trọng lực vào thuật toán đệ quy tiến RNEA một cách đơn giản, người ta làm cách nào?',
    ARRAY['Cấu hình gia tốc của base (khâu gốc 0) hướng thẳng lên trên bằng gia tốc trọng trường g', 'Trừ đi g ở mọi bước đệ quy lùi', 'Đặt thế năng của robot bằng hằng số', 'Tắt trọng lực trong cấu hình mô phỏng'],
    ARRAY['Cấu hình gia tốc của base (khâu gốc 0) hướng thẳng lên trên bằng gia tốc trọng trường g']::varchar[],
    'Đặt gia tốc base 0 bằng [0, 0, 9.81]^T (trên trục Z hướng lên) tự động truyền gia tốc này ra ngoài tạo lực quán tính bù trừ trọng lực chính xác.',
    7, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_028', 'mcq', 'mechanics-dynamics',
    'Thư viện lập trình C++ nổi tiếng chuyên giải quyết động lực học robot tốc độ cao bằng RNEA có tên là gì?',
    ARRAY['Pinocchio', 'RViz', 'Webpack', 'OpenCV'],
    ARRAY['Pinocchio']::varchar[],
    'Pinocchio là thư viện tính toán dynamics robot nhanh nhất hiện nay.',
    5, 'Robot Dynamics', 'cs_robot_mechanics', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_029', 'short-answer', 'mechanics-dynamics',
    'Điền tên viết tắt tiếng Anh của thuật toán đệ quy Newton-Euler. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RNEA']::varchar[],
    'RNEA là Recursive Newton-Euler Algorithm.',
    5, 'Robot Dynamics', 'cs_robotics_fundamentals', 13, 'cs_robmec_03'
  ),
  (
    'cs_robmec_q_030', 'short-answer', 'mechanics-dynamics',
    'Độ phức tạp O(N) của thuật toán RNEA đại diện cho tính chất chạy toán học nào? (Viết thường không dấu)',
    NULL,
    ARRAY['tuyen tinh']::varchar[],
    'Tuyến tính O(N) nghĩa là thời gian chạy tỷ lệ thuận với số khớp.',
    5, 'Robot Dynamics', 'cs_robotics_fundamentals', 13, 'cs_robmec_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Cơ học khớp mềm & Đàn hồi cơ khí (cs_robmec_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_031', 'mcq', 'contact-grippers',
    'Độ đàn hồi cơ khí (Compliance) tại các khớp robot công nghiệp thường phát sinh từ linh kiện nào?',
    ARRAY['Hộp số sóng Harmonic Drive và dây đai truyền động', 'Vỏ bọc nhựa của robot', 'Mạch Driver của động cơ', 'Dây cáp mạng ethernet'],
    ARRAY['Hộp số sóng Harmonic Drive và dây đai truyền động']::varchar[],
    'Harmonic Drive có đĩa biến dạng cơ khí nên có độ mềm tự nhiên, dây đai răng/cáp truyền cũng co giãn dưới tải lớn.',
    5, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_032', 'mcq', 'contact-grippers',
    'Tác hại chính của khớp mềm (Joint Compliance) khi robot chuyển động tốc độ cao là gì?',
    ARRAY['Gây dao động cộng hưởng rung lắc khâu cuối khi dừng đột ngột', 'Động cơ bị mất nguồn', 'Làm robot bị quay ngược chiều', 'Cản trở tín hiệu điều khiển của encoder'],
    ARRAY['Gây dao động cộng hưởng rung lắc khâu cuối khi dừng đột ngột']::varchar[],
    'Khớp mềm hoạt động như hệ lò xo khối lượng, quán tính khâu cuối làm lò xo nén dãn tạo dao động rung lắc.',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_033', 'mcq', 'contact-grippers',
    'Mô hình toán học cơ bản của một khớp mềm coi liên kết cơ khí như linh kiện vật lý nào?',
    ARRAY['Hệ lò xo - giảm chấn phi tuyến', 'Khung sắt cứng tuyệt đối', 'Hệ bánh răng không khe hở', 'Dây đai cao su đàn hồi vô hạn'],
    ARRAY['Hệ lò xo - giảm chấn phi tuyến']::varchar[],
    'Mô hình khớp mềm đặt một lò xo xoắn có hằng số đàn hồi K giữa góc quay động cơ và góc quay khâu.',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_034', 'mcq', 'contact-grippers',
    'Thiết bị khớp chấp hành đàn hồi nối tiếp SEA (Series Elastic Actuator) chủ động đưa bộ phận nào vào khớp?',
    ARRAY['Lò xo đàn hồi đàn hồi vật lý đặt giữa động cơ và tải để đo và kiểm soát lực va chạm', 'Hộp số không rơ răng', 'Cảm biến dòng điện rò', 'Cơ cấu chốt khóa phanh cơ học'],
    ARRAY['Lò xo đàn hồi đàn hồi vật lý đặt giữa động cơ và tải để đo và kiểm soát lực va chạm']::varchar[],
    'SEA sử dụng biến dạng của lò xo đo qua encoder để tính lực tác dụng chính xác, tăng độ êm dịu khi tương tác người.',
    7, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_035', 'mcq', 'contact-grippers',
    'Phương pháp "Input Shaping" được dùng để giải quyết vấn đề gì của robot khớp mềm?',
    ARRAY['Triệt tiêu dao động cộng hưởng của khâu cuối bằng cách định hình xung lệnh vị trí gửi cho động cơ', 'Tăng mô-men xoắn cực đại', 'Bù sai số ma sát tĩnh', 'Tự động hiệu chuẩn encoder'],
    ARRAY['Triệt tiêu dao động cộng hưởng của khâu cuối bằng cách định hình xung lệnh vị trí gửi cho động cơ']::varchar[],
    'Input Shaping chia nhỏ lệnh di chuyển thành nhiều xung lệch pha để tự dập tắt dao động của khớp mềm.',
    7, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_036', 'mcq', 'contact-grippers',
    'Bậc tự do động lực học của một robot có khớp mềm thay đổi thế nào so với mô hình vật cứng?',
    ARRAY['Tăng lên gấp đôi do góc động cơ và góc khâu độc lập nhau', 'Giảm đi một nửa', 'Giữ nguyên không đổi', 'Trở thành vô hạn'],
    ARRAY['Tăng lên gấp đôi do góc động cơ và góc khâu độc lập nhau']::varchar[],
    'Mỗi khớp mềm cần 2 biến trạng thái để mô tả (góc rotor động cơ và góc khâu), làm số chiều không gian trạng thái tăng gấp đôi.',
    7, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_037', 'mcq', 'contact-grippers',
    'Khi robot va chạm mạnh vào người, lò xo đàn hồi trong khớp mềm giúp giảm thiểu chấn thương nhờ cơ chế nào?',
    ARRAY['Hấp thụ và lưu trữ năng lượng va chạm tức thời, kéo dài thời gian va chạm làm giảm lực đỉnh', 'Tăng tốc độ lùi của robot', 'Cắt nguồn điện động cơ', 'Đảo chiều quay khớp'],
    ARRAY['Hấp thụ và lưu trữ năng lượng va chạm tức thời, kéo dài thời gian va chạm làm giảm lực đỉnh']::varchar[],
    'Theo định luật xung lượng, kéo dài thời gian va chạm giúp giảm lực tác động cực đại (peak force).',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_038', 'mcq', 'contact-grippers',
    'Lực mô-men \\(\\tau\\) truyền qua khớp mềm tỉ lệ với đại lượng nào?',
    ARRAY['Độ lệch góc giữa trục động cơ và trục khâu (\\(\\theta\\) - q)', 'Gia tốc quay của rotor', 'Tổng khối lượng robot', 'Hệ số ma sát nhớt'],
    ARRAY['Độ lệch góc giữa trục động cơ và trục khâu (\\(\\theta\\) - q)']::varchar[],
    'Moment tỷ lệ với độ biến dạng xoắn của lò xo khớp: \\(\\tau = K_{\\text{joint}} (\\theta - q)\\).',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_039', 'short-answer', 'contact-grippers',
    'Điền tên viết tắt tiếng Anh của thiết bị khớp chấp hành đàn hồi nối tiếp chủ động chèn lò xo vào khớp. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SEA']::varchar[],
    'SEA là Series Elastic Actuator.',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  ),
  (
    'cs_robmec_q_040', 'short-answer', 'contact-grippers',
    'Điền tên tiếng Anh chỉ độ đàn hồi mềm dẻo của khớp cơ khí (ngược lại với độ cứng vững Stiffness). (Viết thường)',
    NULL,
    ARRAY['compliance']::varchar[],
    'Compliance chỉ độ mềm cơ học của khớp.',
    6, 'Robot Joints', 'cs_robot_mechanics', 13, 'cs_robmec_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Cơ cấu kẹp & Cơ học ma sát khi tiếp xúc (cs_robmec_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_041', 'mcq', 'contact-grippers',
    'Điều kiện ma sát Coulomb để vật thể kẹp không bị trượt khỏi tay kẹp 2 ngón là gì?',
    ARRAY['Lực ma sát tiếp tuyến nhỏ hơn hoặc bằng lực pháp tuyến nhân hệ số ma sát (F_f <= \\(\\mu\\) F_N)', 'Lực kẹp bằng 0', 'Hệ số ma sát bằng 0', 'Lực ma sát lớn hơn lực kẹp'],
    ARRAY['Lực ma sát tiếp tuyến nhỏ hơn hoặc bằng lực pháp tuyến nhân hệ số ma sát (F_f <= \\(\\mu\\) F_N)']::varchar[],
    'Lực ma sát tĩnh tối đa giới hạn khả năng chống trượt vật thể.',
    5, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_042', 'mcq', 'contact-grippers',
    'Khái niệm "Nón ma sát" (Friction Cone) mô tả điều gì?',
    ARRAY['Vùng góc các hướng lực tác dụng khả thi tại điểm tiếp xúc mà không gây ra hiện tượng trượt', 'Hình dáng của tay kẹp hút chân không', 'Vùng không gian làm việc của robot', 'Đồ thị phân bố áp lực kẹp'],
    ARRAY['Vùng góc các hướng lực tác dụng khả thi tại điểm tiếp xúc mà không gây ra hiện tượng trượt']::varchar[],
    'Lực tác dụng phải nằm trong nón ma sát (góc bán đỉnh \\(\\alpha = \\arctan(\\mu)\\)) để giữ vật ổn định.',
    6, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_043', 'mcq', 'contact-grippers',
    'Trạng thái kẹp "Khóa hình học" (Form Closure) có đặc trưng nào?',
    ARRAY['Robot giới hạn chuyển động vật thể hoàn toàn bằng hình dáng ngón kẹp ôm sát, không phụ thuộc vào ma sát lực', 'Đòi hỏi lực kẹp khổng lồ', 'Chỉ dùng cho vật bằng sắt', 'Bắt buộc phải dùng nam châm điện'],
    ARRAY['Robot giới hạn chuyển động vật thể hoàn toàn bằng hình dáng ngón kẹp ôm sát, không phụ thuộc vào ma sát lực']::varchar[],
    'Form Closure giữ vật bằng các vách chặn cơ khí, bảo đảm vật không thể chuyển động dù không có ma sát.',
    6, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_044', 'mcq', 'contact-grippers',
    'Trạng thái kẹp "Khóa lực" (Force Closure) khác biệt thế nào với khóa hình học?',
    ARRAY['Duy trì trạng thái kẹp giữ hoàn toàn bằng lực ma sát tiếp xúc chủ động ép lên vật thể', 'Không cần lực ép ngón kẹp', 'Chỉ dùng cho pít-tông khí nén', 'Vật thể tự động bị khóa cứng'],
    ARRAY['Duy trì trạng thái kẹp giữ hoàn toàn bằng lực ma sát tiếp xúc chủ động ép lên vật thể']::varchar[],
    'Force Closure đòi hỏi duy trì lực ép pháp tuyến liên tục để tạo lực ma sát chống lại ngoại lực.',
    6, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_045', 'mcq', 'contact-grippers',
    'Tại sao ngón kẹp của robot thường được bọc một lớp cao su mềm hoặc silicon?',
    ARRAY['Để tăng hệ số ma sát và phân bố đều áp lực tiếp xúc lên bề mặt vật thể tránh móp méo', 'Để cách điện cho tay kẹp', 'Để làm tay kẹp trông đẹp hơn', 'Để giảm trọng lượng khâu cuối'],
    ARRAY['Để tăng hệ số ma sát và phân bố đều áp lực tiếp xúc lên bề mặt vật thể tránh móp méo']::varchar[],
    'Vật liệu đàn hồi tăng diện tích tiếp xúc thực tế, nâng cao hệ số ma sát và hấp thụ lực va chạm.',
    5, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_046', 'mcq', 'contact-grippers',
    'Giác hút chân không (Vacuum Gripper) giữ vật thể dựa trên nguyên lý cơ học nào?',
    ARRAY['Tạo vùng chân không áp suất thấp để áp suất khí quyển bên ngoài ép chặt vật thể vào giác hút', 'Sử dụng lực từ trường hút sắt', 'Sử dụng keo dính hóa học', 'Móc cơ khí vào lỗ ren vật'],
    ARRAY['Tạo vùng chân không áp suất thấp để áp suất khí quyển bên ngoài ép chặt vật thể vào giác hút']::varchar[],
    'Lực hút $F = \Delta P \cdot A$ sinh ra do chênh lệch áp suất $\Delta P$ trên diện tích giác hút $A$.',
    5, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_047', 'mcq', 'contact-grippers',
    'Khi robot nâng vật thể thẳng đứng với gia tốc đi lên là a, lực kẹp tối thiểu yêu cầu thay đổi thế nào so với khi robot đứng yên?',
    ARRAY['Tăng lên do phải chống lại lực quán tính hướng xuống (trọng lượng biểu kiến tăng)', 'Giảm đi một nửa', 'Giữ nguyên không đổi', 'Tiến về 0'],
    ARRAY['Tăng lên do phải chống lại lực quán tính hướng xuống (trọng lượng biểu kiến tăng)']::varchar[],
    'Lực ma sát phải thắng lực $m(g + a)$, đòi hỏi lực kẹp pháp tuyến lớn hơn.',
    6, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_048', 'mcq', 'contact-grippers',
    'Giải thuật "Grasp Planning" trong phần mềm robot giải quyết bài toán nào?',
    ARRAY['Tìm kiếm các vị trí đặt ngón kẹp tối ưu trên vật thể 3D để bảo đảm kẹp vững chắc nhất', 'Lập kế hoạch tránh vật cản cho bánh xe', 'Điều khiển PID cho động cơ', 'Tính ma trận nghịch đảo Jacobian'],
    ARRAY['Tìm kiếm các vị trí đặt ngón kẹp tối ưu trên vật thể 3D để bảo đảm kẹp vững chắc nhất']::varchar[],
    'Grasp Planning phân tích đám mây điểm 3D của vật thể để chọn góc tiếp cận ngón kẹp tối ưu.',
    7, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_049', 'short-answer', 'contact-grippers',
    'Điền tên tiếng Anh chỉ trạng thái kẹp giữ vật hoàn toàn bằng biên dạng hình học ngón kẹp ôm sát. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['form closure']::varchar[],
    'Form Closure khóa hình học vật thể.',
    6, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  ),
  (
    'cs_robmec_q_050', 'short-answer', 'contact-grippers',
    'Điền tên tiếng Anh của nón giới hạn hướng lực tiếp xúc không trượt. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['friction cone']::varchar[],
    'Friction Cone là nón ma sát.',
    5, 'Robot Grippers', 'cs_robot_mechanics', 13, 'cs_robmec_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Cơ học khớp ma sát: Coulomb & Viscous Friction (cs_robmec_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_051', 'mcq', 'contact-grippers',
    'Lực ma sát Coulomb trong khớp robot có đặc trưng gì?',
    ARRAY['Độ lớn không đổi, chỉ phụ thuộc vào chiều chuyển động (dấu của vận tốc)', 'Tỉ lệ tuyến tính với vận tốc khớp', 'Biến thiên theo góc khớp', 'Chỉ xuất hiện khi robot đứng im'],
    ARRAY['Độ lớn không đổi, chỉ phụ thuộc vào chiều chuyển động (dấu của vận tốc)']::varchar[],
    'Ma sát khô Coulomb có mô hình toán học: F_c * sgn(q_dot).',
    5, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_052', 'mcq', 'contact-grippers',
    'Lực ma sát nhớt (Viscous friction) trong hộp số khớp robot thay đổi thế nào theo vận tốc?',
    ARRAY['Tỷ lệ tuyến tính với vận tốc khớp (f_v * q_dot)', 'Không thay đổi khi vận tốc tăng', 'Giảm dần khi vận tốc tăng', 'Tỉ lệ với bình phương góc khớp'],
    ARRAY['Tỷ lệ tuyến tính với vận tốc khớp (f_v * q_dot)']::varchar[],
    'Ma sát nhớt sinh ra do sự cắt của màng dầu bôi trơn trong hộp số ổ đỡ, tỷ lệ với tốc độ.',
    5, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_053', 'mcq', 'contact-grippers',
    'Hiệu ứng Stribeck mô tả sự thay đổi ma sát khớp ở dải vận tốc nào?',
    ARRAY['Dải vận tốc cực thấp ngay khi bắt đầu chuyển động từ trạng thái nghỉ', 'Dải vận tốc siêu âm của khâu cuối', 'Khi robot chịu tải trọng tối đa', 'Khi nhiệt độ động cơ tăng cao'],
    ARRAY['Dải vận tốc cực thấp ngay khi bắt đầu chuyển động từ trạng thái nghỉ']::varchar[],
    'Hiệu ứng Stribeck thể hiện lực ma sát sụt giảm nhanh khi màng dầu bôi trơn bắt đầu hình thành ngăn cách tiếp xúc kim loại.',
    7, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_054', 'mcq', 'contact-grippers',
    'Tác hại chính của ma sát nghỉ (Static friction) lớn tại các khớp là gì?',
    ARRAY['Hiện tượng chuyển động giật cục (stick-slip) khi robot cố gắng dịch chuyển siêu chậm', 'Động cơ bị cháy cuộn dây', 'Robot tự động dừng khẩn cấp', 'Sai số D-H bị tăng lên'],
    ARRAY['Hiện tượng chuyển động giật cục (stick-slip) khi robot cố gắng dịch chuyển siêu chậm']::varchar[],
    'Stick-slip xảy ra khi động cơ liên tục tích lũy lực để thắng ma sát nghỉ rồi bị trượt nhanh khi lực ma sát giảm về ma sát động.',
    6, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_055', 'mcq', 'contact-grippers',
    'Tại sao việc đảo chiều chuyển động của khớp robot lại gặp sai số bám quỹ đạo lớn nếu không bù ma sát?',
    ARRAY['Vì lực ma sát đột ngột đổi chiều (bước nhảy ma sát Coulomb từ -f_c sang +f_c)', 'Vì encoder bị trễ tín hiệu', 'Vì dòng điện động cơ bị đảo chiều', 'Vì robot rơi vào điểm kỳ dị'],
    ARRAY['Vì lực ma sát đột ngột đổi chiều (bước nhảy ma sát Coulomb từ -f_c sang +f_c)']::varchar[],
    'Sự thay đổi đột ngột của lực cản khi vận tốc đi qua điểm 0 đòi hỏi bộ điều khiển phải cộng moment bù lập tức.',
    7, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_056', 'mcq', 'contact-grippers',
    'Hoạt động "Nhận dạng hệ thống" (System Identification) phục vụ mục đích gì liên quan đến ma sát?',
    ARRAY['Đo đạc các hệ số ma sát thực tế (f_c, f_v) của từng khớp thông qua các bài test chuyển động mẫu', 'Xác định mã IP bảo vệ của robot', 'Đo đạc nhiệt độ dầu bôi trơn', 'Lập bản đồ 2D cho bánh xe'],
    ARRAY['Đo đạc các hệ số ma sát thực tế (f_c, f_v) của từng khớp thông qua các bài test chuyển động mẫu']::varchar[],
    'System ID chạy robot với quỹ đạo tối ưu để thu thập dữ liệu dòng điện và vận tốc khớp để hồi quy tìm các thông số ma sát.',
    6, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_057', 'mcq', 'contact-grippers',
    'Ma sát khớp robot phụ thuộc nhiều vào yếu tố vận hành nào sau đây?',
    ARRAY['Nhiệt độ hoạt động của hộp số (làm thay đổi độ nhớt của dầu bôi trơn)', 'Số lượng node ROS2 đang chạy', 'Màu sơn vỏ robot', 'Địa chỉ IP của máy tính trạm'],
    ARRAY['Nhiệt độ hoạt động của hộp số (làm thay đổi độ nhớt của dầu bôi trơn)']::varchar[],
    'Nhiệt độ tăng làm loãng dầu bôi trơn, làm giảm hệ số ma sát nhớt f_v rõ rệt.',
    5, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_058', 'mcq', 'contact-grippers',
    'Bù ma sát dựa trên mô hình (Model-based friction compensation) thực hiện việc gì?',
    ARRAY['Cộng thêm mô-men xoắn ước lượng từ mô hình ma sát vào ngõ ra điều khiển để triệt tiêu lực cản ma sát thực tế', 'Tắt khâu vi phân K_d', 'Giảm 50% dòng điện động cơ', 'Không cho phép robot đảo chiều chuyển động'],
    ARRAY['Cộng thêm mô-men xoắn ước lượng từ mô hình ma sát vào ngõ ra điều khiển để triệt tiêu lực cản ma sát thực tế']::varchar[],
    'Bù trước ma sát (feedforward compensation) giúp giảm gánh nặng sai số phản hồi cho PID.',
    7, 'Robot Friction', 'cs_robot_mechanics', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_059', 'short-answer', 'contact-grippers',
    'Điền tên loại ma sát tỉ lệ tuyến tính với vận tốc khớp. (Viết thường)',
    NULL,
    ARRAY['ma sát nhớt', 'ma sat nhot', 'viscous friction']::varchar[],
    'Ma sát nhớt tỷ lệ với vận tốc.',
    5, 'Robot Friction', 'cs_robotics_fundamentals', 13, 'cs_robmec_06'
  ),
  (
    'cs_robmec_q_060', 'short-answer', 'contact-grippers',
    'Điền tên hiệu ứng vật lý mô tả sự sụt giảm ma sát ở vận tốc cực thấp trước khi tăng tuyến tính theo ma sát nhớt. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Stribeck', 'Hiệu ứng stribeck']::varchar[],
    'Hiệu ứng Stribeck xuất hiện ở vùng bôi trơn ranh giới.',
    6, 'Robot Friction', 'cs_robotics_fundamentals', 13, 'cs_robmec_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Mô hình cơ học Robot di động (cs_robmec_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_061', 'mcq', 'mobile-locomotion',
    'Ràng buộc Non-holonomic (không holonomic) của robot di động bánh xe vi sai có nghĩa là gì?',
    ARRAY['Robot không thể chuyển động tịnh tiến ngang tức thời theo trục bánh xe (v_y = 0)', 'Robot không thể quay tại chỗ', 'Robot không di chuyển lùi được', 'Vận tốc robot luôn bằng hằng số'],
    ARRAY['Robot không thể chuyển động tịnh tiến ngang tức thời theo trục bánh xe (v_y = 0)']::varchar[],
    'Bánh xe cao su bám sàn ngăn cản robot trượt ngang trực tiếp, chỉ có thể di chuyển dọc và xoay.',
    6, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_062', 'mcq', 'mobile-locomotion',
    'Bánh xe Mecanum cho phép robot chuyển động đa hướng (Holonomic) nhờ bộ phận cấu tạo đặc biệt nào?',
    ARRAY['Các con lăn phụ (rollers) nghiêng góc 45 độ phân bố quanh vành bánh xe chủ động', 'Sử dụng lốp cao su siêu dày', 'Tích hợp động cơ bước bên trong', 'Có khả năng tự thay đổi đường kính'],
    ARRAY['Các con lăn phụ (rollers) nghiêng góc 45 độ phân bố quanh vành bánh xe chủ động']::varchar[],
    'Các con lăn tự do xoay góc 45 độ phân tách lực kéo thành hai thành phần lực dọc và ngang, tạo chuyển động đa hướng.',
    6, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_063', 'mcq', 'mobile-locomotion',
    'Để một robot Mecanum 4 bánh tịnh tiến ngang sang phải, chiều quay của các bánh xe phải cấu hình thế nào?',
    ARRAY['Các bánh quay ngược hướng nhau theo cặp chéo để triệt tiêu lực dọc và cộng dồn lực ngang', 'Tất cả 4 bánh quay cùng chiều tiến', 'Tất cả 4 bánh quay cùng chiều lùi', 'Hai bánh bên trái đứng yên, hai bánh bên phải quay'],
    ARRAY['Các bánh quay ngược hướng nhau theo cặp chéo để triệt tiêu lực dọc và cộng dồn lực ngang']::varchar[],
    'Chuyển động tịnh tiến ngang yêu cầu phối hợp quay ngược chiều giữa các bánh trên cùng trục để khử lực tiến.',
    7, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_064', 'mcq', 'mobile-locomotion',
    'Robot di động bánh xe vi sai (Differential Drive) thực hiện chuyển hướng bằng cách nào?',
    ARRAY['Tạo chênh lệch vận tốc quay giữa bánh trái và bánh phải', 'Quay góc bánh xe dẫn hướng phía trước bằng động cơ servo độc lập', 'Đổi chiều dòng điện cả hai bánh cùng lúc', 'Sử dụng cánh quạt tạo lực đẩy ngang'],
    ARRAY['Tạo chênh lệch vận tốc quay giữa bánh trái và bánh phải']::varchar[],
    'Vận tốc góc của thân robot tỷ lệ với hiệu vận tốc 2 bánh xe chia cho khoảng cách hai bánh (track width).',
    5, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_065', 'mcq', 'mobile-locomotion',
    'Ràng buộc Non-holonomic giới hạn đại lượng nào tức thời của robot?',
    ARRAY['Vận tốc tức thời bị giới hạn, nhưng không giới hạn không gian vị trí cấu hình có thể đạt tới của robot', 'Tổng quãng đường đi được', 'Bậc tự do quay của robot', 'Khối lượng tải trọng nâng'],
    ARRAY['Vận tốc tức thời bị giới hạn, nhưng không giới hạn không gian vị trí cấu hình có thể đạt tới của robot']::varchar[],
    'Dù xe vi sai không trượt ngang được tức thời, ta vẫn có thể đưa xe tới bất kỳ vị trí x, y nào bằng chuỗi thao tác tiến lùi quay.',
    7, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_066', 'mcq', 'mobile-locomotion',
    'Nhược điểm cơ khí lớn nhất của bánh xe Mecanum khi vận hành trong nhà máy là gì?',
    ARRAY['Tạo ra nhiều rung động và dễ bị trượt bánh làm sai số định vị tích lũy (Odom error) lớn hơn bánh cao su thông thường', 'Không chịu được tải trọng quá 5kg', 'Chỉ chạy được trên sàn nhựa', 'Tiêu hao năng lượng gấp 10 lần'],
    ARRAY['Tạo ra nhiều rung động và dễ bị trượt bánh làm sai số định vị tích lũy (Odom error) lớn hơn bánh cao su thông thường']::varchar[],
    'Sự tiếp xúc gián đoạn của các con lăn nhỏ gây rung động cơ khí và dễ gây hiện tượng trượt vi mô (micro-slip) trên sàn trơn.',
    6, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_067', 'mcq', 'mobile-locomotion',
    'Hệ thống bánh xe Omni (Omnidirectional wheels) khác bánh xe Mecanum ở điểm nào?',
    ARRAY['Các con lăn phụ của bánh Omni vuông góc 90 độ với trục bánh chính thay vì 45 độ', 'Bánh Omni không có con lăn phụ', 'Bánh Omni chỉ dùng cho xe vi sai', 'Bánh Omni quay bằng từ trường'],
    ARRAY['Các con lăn phụ của bánh Omni vuông góc 90 độ với trục bánh chính thay vì 45 độ']::varchar[],
    'Bánh Omni có con lăn 90 độ, thường được bố trí lệch góc 120 độ quanh thân robot 3 bánh đa hướng.',
    6, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_068', 'mcq', 'mobile-locomotion',
    'Phương trình Kinematics ngược của robot di động thực hiện việc gì?',
    ARRAY['Tính toán tốc độ quay của từng bánh xe cần thiết để robot đạt được vận tốc Descartes mong muốn', 'Tính toán vị trí robot từ bản đồ', 'Tính toán sai số GPS', 'Tính mô-men xoắn của động cơ'],
    ARRAY['Tính toán tốc độ quay của từng bánh xe cần thiết để robot đạt được vận tốc Descartes mong muốn']::varchar[],
    'Động học ngược bánh xe chuyển đổi vector vận tốc thân xe (v_x, v_y, omega) thành tốc độ góc cấp cho các motor bánh xe.',
    6, 'Robot Locomotion', 'cs_robot_mechanics', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_069', 'short-answer', 'mobile-locomotion',
    'Điền tên bánh xe đa hướng có các con lăn phụ nghiêng góc 45 độ. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Mecanum', 'Bánh mecanum']::varchar[],
    'Bánh xe Mecanum là thiết kế bánh đa hướng kinh điển.',
    5, 'Robot Locomotion', 'cs_robotics_fundamentals', 13, 'cs_robmec_07'
  ),
  (
    'cs_robmec_q_070', 'short-answer', 'mobile-locomotion',
    'Điền từ tiếng Anh chỉ ràng buộc động học hạn chế vận tốc ngang tức thời của xe vi sai. (Có gạch nối, viết thường)',
    NULL,
    ARRAY['non-holonomic']::varchar[],
    'Ràng buộc non-holonomic giới hạn vận tốc tức thời.',
    6, 'Robot Locomotion', 'cs_robotics_fundamentals', 13, 'cs_robmec_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Động lực học robot đi bằng chân & Thăng bằng ZMP (cs_robmec_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_081', 'mcq', 'mobile-locomotion',
    'Điểm không mô-men (Zero Moment Point - ZMP) được định nghĩa là gì?',
    ARRAY['Điểm trên mặt đất nơi tổng mô-men xoắn của lực quán tính và lực trọng trường tác động lên robot theo phương ngang bằng 0', 'Điểm trọng tâm hình học của robot', 'Khớp gối của robot hai chân', 'Điểm tiếp xúc giữa robot và tường'],
    ARRAY['Điểm trên mặt đất nơi tổng mô-men xoắn của lực quán tính và lực trọng trường tác động lên robot theo phương ngang bằng 0']::varchar[],
    'ZMP biểu diễn điểm đặt của hợp lực phản lực bàn chân. Tại ZMP, mô-men lực quán tính ngang triệt tiêu.',
    6, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_082', 'mcq', 'mobile-locomotion',
    'Theo tiêu chuẩn thăng bằng ZMP, robot đi bằng chân sẽ không bị ngã đổ khi nào?',
    ARRAY['Khi điểm ZMP nằm hoàn toàn bên trong Đa giác hỗ trợ (Support Polygon)', 'Khi ZMP nằm trùng với trọng tâm robot', 'Khi ZMP chạy ra ngoài bàn chân', 'Khi robot di chuyển với vận tốc không đổi'],
    ARRAY['Khi điểm ZMP nằm hoàn toàn bên trong Đa giác hỗ trợ (Support Polygon)']::varchar[],
    'Đa giác hỗ trợ bao quanh các điểm tiếp xúc chân. ZMP nằm trong đa giác bảo đảm phản lực đất có thể cân bằng mô-men xoắn.',
    6, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_083', 'mcq', 'mobile-locomotion',
    'Đa giác hỗ trợ (Support Polygon) của robot 2 chân (Bipedal) thay đổi thế nào khi robot chuyển từ trạng thái đứng hai chân sang nhấc một chân bước đi?',
    ARRAY['Thu nhỏ lại bằng diện tích tiếp xúc của duy nhất một bàn chân đang chạm đất', 'Giữ nguyên không đổi', 'Phình to gấp đôi', 'Biến mất hoàn toàn'],
    ARRAY['Thu nhỏ lại bằng diện tích tiếp xúc của duy nhất một bàn chân đang chạm đất']::varchar[],
    'Khi đi một chân, đa giác hỗ trợ cực kỳ nhỏ (chỉ bằng biên dạng đế giày), đòi hỏi thuật toán điều khiển ZMP cực kỳ khắt khe.',
    7, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_084', 'mcq', 'mobile-locomotion',
    'Mô hình đơn giản hóa động lực học kinh điển nào thường dùng để lập kế hoạch bước đi cho robot nhân hình?',
    ARRAY['LIPM (Linear Inverted Pendulum Model - Mô hình con lắc ngược tuyến tính)', 'Mô hình con lắc đơn giản', 'Mô hình dầm công-xôn', 'Mô hình chất lưu thủy lực'],
    ARRAY['LIPM (Linear Inverted Pendulum Model - Mô hình con lắc ngược tuyến tính)']::varchar[],
    'LIPM giả định chiều cao trọng tâm robot không đổi, biến phương trình động lực học phi tuyến thành tuyến tính dễ giải.',
    7, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_085', 'mcq', 'mobile-locomotion',
    'Điều gì xảy ra ngay lập tức nếu điểm ZMP tính toán chạy ra ngoài biên của đa giác hỗ trợ?',
    ARRAY['Robot bắt đầu xoay quanh cạnh bàn chân tiếp đất và ngã đổ', 'Robot sẽ tự động nhảy lên', 'Động cơ gối tự động phanh cứng', 'Tải trọng nâng của robot tăng lên'],
    ARRAY['Robot bắt đầu xoay quanh cạnh bàn chân tiếp đất và ngã đổ']::varchar[],
    'Đất không thể hút chân để tạo mô-men ngược chiều kéo robot lại, robot sẽ bị lật đổ.',
    6, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_086', 'mcq', 'mobile-locomotion',
    'Người đặt nền móng cho lý thuyết thăng bằng ZMP ứng dụng cho robot humanoid là nhà khoa học nào?',
    ARRAY['Miomir Vukobratovic', 'Isaac Newton', 'Rudolf Kalman', 'Richard Feynman'],
    ARRAY['Miomir Vukobratovic']::varchar[],
    'Vukobratovic giới thiệu khái niệm ZMP vào năm 1969, trở thành trụ cột cho robot đi bằng chân.',
    7, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_087', 'mcq', 'mobile-locomotion',
    'Đặc điểm vượt trội của robot di chuyển bằng chân so với robot di động bánh xe là gì?',
    ARRAY['Khả năng vượt địa hình gồ ghề, bậc thang, đá hộc linh hoạt', 'Tốc độ di chuyển nhanh hơn trên đường phẳng', 'Hiệu suất tiêu thụ năng lượng tốt hơn', 'Chế tạo cơ khí đơn giản và rẻ hơn'],
    ARRAY['Khả năng vượt địa hình gồ ghề, bậc thang, đá hộc linh hoạt']::varchar[],
    'Chân đi cho phép chọn điểm đặt chân rời rạc trên địa hình không bằng phẳng, tránh các vết nứt hố sâu.',
    5, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_088', 'mcq', 'mobile-locomotion',
    'Robot 4 chân (Quadruped Robot) giữ ổn định tĩnh (Static Stability) dễ dàng hơn robot 2 chân nhờ ưu thế nào?',
    ARRAY['Luôn duy trì đa giác hỗ trợ rộng tạo bởi 3 hoặc 4 chân tiếp đất cùng lúc', 'Không có trọng lực tác dụng', 'Chạy bằng pin dung lượng lớn hơn', 'Khớp háng linh hoạt hơn'],
    ARRAY['Luôn duy trì đa giác hỗ trợ rộng tạo bởi 3 hoặc 4 chân tiếp đất cùng lúc']::varchar[],
    'Chỉ cần giữ hình chiếu trọng tâm CoG nằm trong đa giác hỗ trợ 3 chân, robot 4 chân đứng im an toàn không ngã.',
    5, 'Legged Robots', 'cs_robot_mechanics', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_089', 'short-answer', 'mobile-locomotion',
    'Điền tên viết tắt tiếng Anh của Điểm Không Mô-men. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ZMP']::varchar[],
    'ZMP là Zero Moment Point.',
    5, 'Legged Robots', 'cs_robotics_fundamentals', 13, 'cs_robmec_08'
  ),
  (
    'cs_robmec_q_090', 'short-answer', 'mobile-locomotion',
    'Điền tên tiếng Việt của hình đa giác bao quanh các điểm tiếp xúc của chân robot với mặt đất. (Viết thường)',
    NULL,
    ARRAY['đa giác hỗ trợ', 'da giac ho tro']::varchar[],
    'Đa giác hỗ trợ là Support Polygon.',
    5, 'Legged Robots', 'cs_robotics_fundamentals', 13, 'cs_robmec_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Mô phỏng vật lý Robot & Thuật toán tích phân số trị (cs_robmec_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robmec_q_091', 'mcq', 'physics-simulation',
    'Mục tiêu của thuật toán Tích phân số trị (Numerical Integration) trong bộ mô phỏng vật lý robot là gì?',
    ARRAY['Giải phương trình vi phân động lực học theo các bước thời gian nhỏ để tính toán tọa độ và vận tốc tiếp theo của robot', 'Tính toán ma trận Jacobian nghịch đảo', 'Lập bản đồ 2D cho cảm biến LiDAR', 'Mã hóa tín hiệu truyền thông DDS'],
    ARRAY['Giải phương trình vi phân động lực học theo các bước thời gian nhỏ để tính toán tọa độ và vận tốc tiếp theo của robot']::varchar[],
    'Tích phân số trị giải tích phân gia tốc sang vận tốc và vị trí tại mỗi bước thời gian dt.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_092', 'mcq', 'physics-simulation',
    'Nhược điểm lớn nhất của phương pháp tích phân Euler hiện (Explicit Euler) là gì?',
    ARRAY['Kém ổn định toán học, dễ tích lũy sai số gây nổ vật lý (mất bảo toàn năng lượng) nếu bước nhảy dt lớn', 'Tốc độ tính toán quá chậm', 'Công thức quá phức tạp', 'Không chạy được trên máy tính đa nhân'],
    ARRAY['Kém ổn định toán học, dễ tích lũy sai số gây nổ vật lý (mất bảo toàn năng lượng) nếu bước nhảy dt lớn']::varchar[],
    'Euler hiện giả định đạo hàm không đổi trong suốt khoảng dt, tạo sai số tích lũy dạng phân kỳ cho hệ dao động.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_093', 'mcq', 'physics-simulation',
    'Ưu điểm của phương pháp Runge-Kutta bậc 4 (RK4) so với tích phân Euler là gì?',
    ARRAY['Độ chính xác vượt trội và bảo toàn năng lượng tốt hơn nhờ tính toán đạo hàm tại 4 điểm thử trong khoảng dt', 'Chạy nhanh hơn Euler gấp 10 lần', 'Không cần biết phương trình vi phân', 'Tự động sửa lỗi va chạm cứng'],
    ARRAY['Độ chính xác vượt trội và bảo toàn năng lượng tốt hơn nhờ tính toán đạo hàm tại 4 điểm thử trong khoảng dt']::varchar[],
    'RK4 triệt tiêu các thành phần sai số bậc thấp, cho phép mô phỏng chính xác các hệ động lực học phi tuyến cao.',
    7, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_094', 'mcq', 'physics-simulation',
    'Hiện tượng "Physics Explosion" (Mô phỏng bị nổ tung) xảy ra trong simulator khi nào?',
    ARRAY['Sai số tích phân số trị quá lớn làm lực tiếp xúc tính ra đột ngột tiến tới vô cực đẩy các liên kết văng xa', 'Động cơ bị quá tải nhiệt', 'Robot bị rơi xuống nước ảo', 'Hệ điều hành bị treo đứng'],
    ARRAY['Sai số tích phân số trị quá lớn làm lực tiếp xúc tính ra đột ngột tiến tới vô cực đẩy các liên kết văng xa']::varchar[],
    'Xảy ra khi bước thời gian dt quá lớn hoặc hệ số đàn hồi va chạm đặt quá cứng vượt giới hạn ổn định toán học.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_095', 'mcq', 'physics-simulation',
    'Physics engine nào được tối ưu chuyên biệt cho mô phỏng tiếp xúc đa khớp và điều khiển học máy (Reinforcement Learning) cho robot?',
    ARRAY['MuJoCo', 'ODE', 'PhysX', 'Bullet'],
    ARRAY['MuJoCo']::varchar[],
    'MuJoCo (Multi-Joint dynamics with Contact) giải hệ phương trình động lực học khớp nhanh vượt trội.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_096', 'mcq', 'physics-simulation',
    'Thông số động học khâu nào bắt buộc phải khai báo chính xác trong file URDF để simulator tính toán lực quán tính?',
    ARRAY['Khối lượng (Mass), Ma trận quán tính (Inertia Tensor) và vị trí trọng tâm (CoG)', 'Hệ số ma sát của bánh xe', 'Mã lệnh điều khiển PID', 'Cấu hình cổng mạng DDS'],
    ARRAY['Khối lượng (Mass), Ma trận quán tính (Inertia Tensor) và vị trí trọng tâm (CoG)']::varchar[],
    'Simulator cần các thông số khối lượng và quán tính để lắp ráp ma trận quán tính M(q) của robot.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_097', 'mcq', 'physics-simulation',
    'Để mô phỏng va chạm của robot với môi trường, physics engine phải giải quyết bài toán cơ học nào?',
    ARRAY['Động lực học tiếp xúc (Contact Dynamics) và giải quyết ràng buộc va chạm cứng/mềm', 'Động học thuận D-H', 'Giải thuật định tuyến mạng', 'Biến đổi Fourier nhanh FFT'],
    ARRAY['Động lực học tiếp xúc (Contact Dynamics) và giải quyết ràng buộc va chạm cứng/mềm']::varchar[],
    'Contact Dynamics tính toán lực phản lực pháp tuyến và ma sát tiếp xúc để ngăn các vật thể đâm xuyên qua nhau.',
    7, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_098', 'mcq', 'physics-simulation',
    'Bước thời gian tích phân dt thường đặt trong các mô phỏng robot thời gian thực công nghiệp là bao nhiêu?',
    ARRAY['0.1 ms đến 1 ms', '1 giây đến 2 giây', '1 micro-giây', '1 phút'],
    ARRAY['0.1 ms đến 1 ms']::varchar[],
    'Bước thời gian nhỏ (1kHz đến 10kHz) bảo đảm tính ổn định toán học khi mô phỏng va chạm cứng.',
    6, 'Physics Simulation', 'cs_robot_mechanics', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_099', 'short-answer', 'physics-simulation',
    'Điền tên viết tắt của phương pháp tích phân Runge-Kutta bậc 4. (Viết hoa kèm số)',
    NULL,
    ARRAY['RK4']::varchar[],
    'RK4 là Runge-Kutta bậc 4.',
    5, 'Physics Simulation', 'cs_robotics_fundamentals', 13, 'cs_robmec_09'
  ),
  (
    'cs_robmec_q_100', 'short-answer', 'physics-simulation',
    'Điền tên bộ mô phỏng vật lý đa khớp nổi tiếng do DeepMind sở hữu và phát triển miễn phí mã nguồn mở. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['MuJoCo', 'Mujoco']::varchar[],
    'MuJoCo là viết tắt của Multi-Joint dynamics with Contact.',
    5, 'Physics Simulation', 'cs_robotics_fundamentals', 13, 'cs_robmec_09'
  );

COMMIT;
