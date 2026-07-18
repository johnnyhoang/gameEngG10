-- SQL migration to seed 100 question bank for cs_robotics_fundamentals (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_robotics_fundamentals (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_robotics_fundamentals';

-- ======================================================================================
-- BÀI GIẢNG 1: Giới thiệu tổng quan về Robotics & Phân loại Robot (cs_robfun_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_001', 'mcq', 'robot-introduction',
    'Ba khối chức năng vật lý cốt lõi cấu tạo nên một hệ thống robot hoàn chỉnh là gì?',
    ARRAY['Cảm biến (Sensors), Bộ điều khiển (Controller), Cơ cấu chấp hành (Actuators)', 'Cáp kết nối, Nguồn điện, Khung sắt', 'Camera, Bánh xe, Hệ điều hành ROS', 'Động cơ servo, Hộp số, Cánh tay cơ khí']::varchar[],
    ARRAY['Cảm biến (Sensors), Bộ điều khiển (Controller), Cơ cấu chấp hành (Actuators)']::varchar[],
    'Cơ chế hoạt động của robot là: Cảm biến thu nhận thông tin, Bộ điều khiển tính toán xử lý và Cơ cấu chấp hành tạo ra chuyển động vật lý.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_002', 'mcq', 'robot-introduction',
    'Sự khác biệt cốt lõi về mặt vận hành giữa robot di động tự hành AMR và xe tự hành AGV là gì?',
    ARRAY['AMR sử dụng cảm biến LiDAR và thuật toán SLAM để tự lập đường đi tránh vật cản; AGV chỉ đi theo vạch từ hoặc đường kẻ cố định', 'AGV thông minh hơn AMR', 'AMR chỉ bay được trên không trung', 'AGV chạy bằng động cơ xăng còn AMR chạy bằng pin'],
    ARRAY['AMR sử dụng cảm biến LiDAR và thuật toán SLAM để tự lập đường đi tránh vật cản; AGV chỉ đi theo vạch từ hoặc đường kẻ cố định']::varchar[],
    'AMR (Autonomous Mobile Robot) có khả năng tự nhận thức không gian và tránh chướng ngại vật linh hoạt, còn AGV (Automated Guided Vehicle) bị phụ thuộc vào hạ tầng đường dẫn tĩnh.',
    6, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_003', 'mcq', 'robot-introduction',
    'Robot thao tác công nghiệp (Manipulators) thường được lắp đặt ở trạng thái vật lý nào?',
    ARRAY['Cố định tại một vị trí trong nhà xưởng', 'Tự do di chuyển trên bánh xích', 'Bay lơ lửng trên không trung', 'Tự động bơi dưới nước'],
    ARRAY['Cố định tại một vị trí trong nhà xưởng']::varchar[],
    'Cánh tay robot công nghiệp (Manipulator) thường được bắt vít chặt xuống sàn xưởng để bảo đảm độ chính xác lặp lại cao.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_004', 'mcq', 'robot-introduction',
    'Vai trò của "Cơ cấu chấp hành" (Actuators) là gì?',
    ARRAY['Biến đổi năng lượng điện/thủy lực/khí nén thành chuyển động cơ học của robot', 'Đo đạc nhiệt độ môi trường', 'Truyền thông tin dữ liệu mạng không dây', 'Lập trình luồng chạy cho CPU'],
    ARRAY['Biến đổi năng lượng điện/thủy lực/khí nén thành chuyển động cơ học của robot']::varchar[],
    'Actuators (như động cơ điện, pít-tông khí nén) tạo ra lực hoặc mô-men quay trực tiếp tại các khớp để dịch chuyển cơ thể robot.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_005', 'mcq', 'robot-introduction',
    'Khái niệm "Hệ thống điều khiển vòng kín" (Closed-loop system) trong robot yêu cầu thành phần nào?',
    ARRAY['Cảm biến phản hồi dữ liệu trạng thái thực tế về bộ điều khiển để liên tục điều chỉnh sai số', 'Không sử dụng bất kỳ cảm biến nào', 'Động cơ chạy với công suất không đổi', 'Sử dụng hệ điều hành Windows'],
    ARRAY['Cảm biến phản hồi dữ liệu trạng thái thực tế về bộ điều khiển để liên tục điều chỉnh sai số']::varchar[],
    'Hệ thống vòng kín liên tục đo đạc đầu ra thực tế và so sánh với giá trị mong muốn để triệt tiêu độ lệch (Error).',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_006', 'mcq', 'robot-introduction',
    'Robot nhân hình (Humanoid Robot) có đặc điểm cấu tạo nổi bật nào?',
    ARRAY['Có hình dáng và chuyển động mô phỏng cơ thể con người (hai chân, hai tay, đầu)', 'Chỉ di chuyển bằng 4 bánh xe phẳng', 'Không có bộ điều khiển trung tâm', 'Được thiết kế hoàn toàn bằng nhựa dẻo'],
    ARRAY['Có hình dáng và chuyển động mô phỏng cơ thể con người (hai chân, hai tay, đầu)']::varchar[],
    'Robot nhân hình được phát triển để làm việc trong môi trường thiết kế sẵn cho con người, sử dụng các công cụ của con người.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_007', 'mcq', 'robot-introduction',
    'Bộ phận nào được ví là "tai mắt" giúp robot thu thập thông tin về trạng thái bên trong và môi trường bên ngoài?',
    ARRAY['Cảm biến (Sensors)', 'Động cơ servo', 'Hộp số sóng Harmonic', 'Khung kim loại'],
    ARRAY['Cảm biến (Sensors)']::varchar[],
    'Cảm biến biến đổi các đại lượng vật lý thực tế thành tín hiệu điện cho máy tính đọc.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_008', 'mcq', 'robot-introduction',
    'UAV (Unmanned Aerial Vehicle) thường được gọi là gì trong đời sống thường ngày?',
    ARRAY['Thiết bị bay không người lái (Drone)', 'Robot hút bụi tự động', 'Xe tự hành trong nhà kho', 'Cánh tay robot xếp bao tải'],
    ARRAY['Thiết bị bay không người lái (Drone)']::varchar[],
    'UAV là viết tắt của thiết bị bay không người lái.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_009', 'short-answer', 'robot-introduction',
    'Điền tên viết tắt tiếng Anh của loại Robot di động tự hành có khả năng tự tránh vật cản linh hoạt bằng LiDAR. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AMR']::varchar[],
    'AMR là Autonomous Mobile Robot.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  ),
  (
    'cs_robfun_q_010', 'short-answer', 'robot-introduction',
    'Điền tên viết tắt tiếng Anh của loại xe tự hành đi theo vạch cố định trong nhà kho. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AGV']::varchar[],
    'AGV là Automated Guided Vehicle.',
    5, 'Robotics Fundamentals', 'cs_robotics_fundamentals', 13, 'cs_robfun_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Không gian cấu hình & Khớp động học (cs_robfun_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_011', 'mcq', 'robot-introduction',
    'Khái niệm "Không gian cấu hình" (Configuration Space - C-Space) của robot định nghĩa điều gì?',
    ARRAY['Tập hợp tất cả các vị trí khả thi mà các khớp của robot có thể đạt tới', 'Kích thước căn phòng robot làm việc', 'Tổng khối lượng của cánh tay robot', 'Dung lượng bộ nhớ RAM của bộ điều khiển'],
    ARRAY['Tập hợp tất cả các vị trí khả thi mà các khớp của robot có thể đạt tới']::varchar[],
    'C-Space mô tả trạng thái hình học của robot bằng các tọa độ độc lập.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_012', 'mcq', 'robot-introduction',
    'Một vật thể tự do di chuyển trong không gian phẳng 2D có bao nhiêu bậc tự do (DOF)?',
    ARRAY['3 DOF (x, y, góc quay theta)', '2 DOF (x, y)', '6 DOF', '1 DOF'],
    ARRAY['3 DOF (x, y, góc quay theta)']::varchar[],
    'Vật thể phẳng 2D có 2 bậc tự do tịnh tiến ($x, y$) và 1 bậc tự do quay ($\theta$).',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_013', 'mcq', 'robot-introduction',
    'Một vật thể tự do bay trong không gian 3D có bao nhiêu bậc tự do (DOF)?',
    ARRAY['6 DOF (3 tịnh tiến x, y, z và 3 quay Roll, Pitch, Yaw)', '3 DOF', '4 DOF', '12 DOF'],
    ARRAY['6 DOF (3 tịnh tiến x, y, z và 3 quay Roll, Pitch, Yaw)']::varchar[],
    'Vật thể 3D tự do có 6 DOF đại diện cho toàn bộ các hướng tịnh tiến và định hướng quay trong không gian.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_014', 'mcq', 'robot-introduction',
    'Khớp quay (Revolute joint) cung cấp bao nhiêu bậc tự do (DOF) chuyển động?',
    ARRAY['1 DOF', '2 DOF', '3 DOF', '0 DOF'],
    ARRAY['1 DOF']::varchar[],
    'Khớp quay chỉ cho phép một chuyển động xoay tương đối quanh trục của nó.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_015', 'mcq', 'robot-introduction',
    'Khớp trượt (Prismatic joint) cung cấp loại chuyển động nào?',
    ARRAY['Chuyển động tịnh tiến dọc theo một trục (1 DOF)', 'Chuyển động quay tròn quanh trục', 'Chuyển động cầu xoay nhiều hướng', 'Chuyển động lắc lư tự do'],
    ARRAY['Chuyển động tịnh tiến dọc theo một trục (1 DOF)']::varchar[],
    'Khớp trượt giới hạn chuyển động trượt tịnh tiến tuyến tính.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_016', 'mcq', 'robot-introduction',
    'Công thức Kutzbach được dùng để làm gì trong thiết kế robot?',
    ARRAY['Tính toán số bậc tự do (DOF) thực tế của một cơ cấu khớp cơ khí', 'Tính toán mô-men xoắn của động cơ', 'Tính toán tọa độ ma trận quay', 'Tính toán sai số tích phân PID'],
    ARRAY['Tính toán số bậc tự do (DOF) thực tế của một cơ cấu khớp cơ khí']::varchar[],
    'Kutzbach tính toán bậc tự do dựa vào số khâu (links), số khớp (joints) và bậc tự do của từng khớp.',
    6, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_017', 'mcq', 'robot-introduction',
    'Không gian cấu hình (C-Space) của một robot di động di chuyển trên mặt sàn phẳng 2D được biểu diễn toán học bằng dải không gian nào?',
    ARRAY['R^2 x S^1', 'R^3', 'SE(3)', 'SO(3)'],
    ARRAY['R^2 x S^1']::varchar[],
    '$\mathbb{R}^2$ đại diện cho tọa độ mặt phẳng phẳng $(x, y)$, và $S^1$ đại diện cho vòng tròn góc xoay của hướng robot.',
    7, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_018', 'mcq', 'robot-introduction',
    'Tại sao không gian cấu hình C-Space lại cực kỳ quan trọng đối với thuật toán lập kế hoạch đường đi (Path Planning)?',
    ARRAY['Vì nó giúp biến bài toán lập quỹ đạo cho robot có hình dáng phức tạp thành bài toán tìm đường đi cho 1 điểm toán học duy nhất trong không gian cấu hình', 'Vì nó giúp tăng tốc độ CPU của robot', 'Vì nó tự động loại bỏ các nhiễu cảm biến LiDAR', 'Để tiết kiệm pin cho động cơ chấp hành'],
    ARRAY['Vì nó giúp biến bài toán lập quỹ đạo cho robot có hình dáng phức tạp thành bài toán tìm đường đi cho 1 điểm toán học duy nhất trong không gian cấu hình']::varchar[],
    'Bằng cách mở rộng các vật cản trong không gian làm việc thành vật cản trong C-Space, ta chỉ cần lập quỹ đạo cho 1 điểm không kích thước.',
    7, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_019', 'short-answer', 'robot-introduction',
    'Điền từ tiếng Anh chỉ số lượng tọa độ độc lập tối thiểu cần có để xác định cấu hình robot. (Viết tắt 3 chữ cái đầu)',
    NULL,
    ARRAY['DOF']::varchar[],
    'DOF là Degrees of Freedom.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  ),
  (
    'cs_robfun_q_020', 'short-answer', 'robot-introduction',
    'Điền tên tiếng Anh của khớp trượt tịnh tiến tuyến tính cung cấp 1 bậc tự do. (Viết thường)',
    NULL,
    ARRAY['prismatic joint', 'prismatic']::varchar[],
    'Prismatic joint là khớp trượt tịnh tiến.',
    5, 'C-Space & Joints', 'cs_robotics_fundamentals', 13, 'cs_robfun_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Ma trận chuyển đổi tọa độ thuần nhất (cs_robfun_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_021', 'mcq', 'robot-kinematics',
    'Ma trận quay 3D biểu diễn hướng xoay thuộc nhóm toán học đặc biệt nào?',
    ARRAY['SO(3) - Nhóm trực giao đặc biệt kích thước 3x3', 'SE(3)', 'SL(3)', 'GL(3)'],
    ARRAY['SO(3) - Nhóm trực giao đặc biệt kích thước 3x3']::varchar[],
    'SO(3) là Special Orthogonal group, ma trận quay trực giao có định thức bằng 1.',
    6, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_022', 'mcq', 'robot-kinematics',
    'Kích thước của ma trận chuyển đổi tọa độ thuần nhất kết hợp cả quay và tịnh tiến là bao nhiêu?',
    ARRAY['4x4', '3x3', '4x3', '6x6'],
    ARRAY['4x4']::varchar[],
    'Ma trận chuyển đổi thuần nhất $T$ thuộc SE(3) có kích thước 4x4.',
    5, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_023', 'mcq', 'robot-kinematics',
    'Thành phần vector [x, y, z]^T biểu thị phép tịnh tiến nằm ở vị trí nào trong ma trận chuyển đổi thuần nhất 4x4?',
    ARRAY['3 dòng đầu của cột thứ 4', 'Dòng thứ 4 của cột thứ 4', 'Đường chéo chính', '3 dòng đầu của cột thứ 1'],
    ARRAY['3 dòng đầu của cột thứ 4']::varchar[],
    'Ma trận $T = [[R, p], [0, 1]]$, vector tịnh tiến $p$ nằm ở cột 4.',
    6, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_024', 'mcq', 'robot-kinematics',
    'Thuộc tính trực giao của ma trận quay R giúp tính ma trận nghịch đảo nhanh chóng bằng phép toán nào?',
    ARRAY['Chuyển vị ma trận (R^T)', 'Tính định thức chia cho ma trận phụ hợp', 'Đổi dấu toàn bộ phần tử', 'Chia toàn bộ cho trị tuyệt đối'],
    ARRAY['Chuyển vị ma trận (R^T)']::varchar[],
    'Vì $R^T R = I$, ta có $R^{-1} = R^T$, giúp tiết kiệm tài nguyên tính toán cực kỳ lớn cho robot.',
    6, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_025', 'mcq', 'robot-kinematics',
    'Khi nhân chuỗi hai ma trận chuyển đổi liên tiếp: T_C^A = T_B^A * T_C^B, ta đang thực hiện phép biến đổi tọa độ nào?',
    ARRAY['Chiếu tọa độ của hệ C qua hệ trung gian B để biểu diễn trong hệ tham chiếu gốc A', 'Cộng dồn hai khoảng cách tịnh tiến', 'Quay hệ C quanh trục Z', 'Không có nghĩa toán học'],
    ARRAY['Chiếu tọa độ của hệ C qua hệ trung gian B để biểu diễn trong hệ tham chiếu gốc A']::varchar[],
    'Nhân xâu chuỗi ma trận chuyển đổi giúp chuyển dịch hệ tọa độ liên tiếp từ khâu này sang khâu khác.',
    6, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_026', 'mcq', 'robot-kinematics',
    'Tại sao ta phải mở rộng vector tọa độ điểm 3D bằng cách thêm giá trị hằng số 1 ở cuối (tọa độ thuần nhất)?',
    ARRAY['Để biến phép toán tịnh tiến phi tuyến thành phép nhân ma trận tuyến tính kích thước 4x4 đồng bộ với phép quay', 'Để kiểm tra lỗi chẵn lẻ', 'Để tăng độ phân giải của tọa độ', 'Do yêu cầu của phần cứng GPU'],
    ARRAY['Để biến phép toán tịnh tiến phi tuyến thành phép nhân ma trận tuyến tính kích thước 4x4 đồng bộ với phép quay']::varchar[],
    'Tọa độ thuần nhất đồng bộ hóa phép quay và tịnh tiến vào 1 phép nhân ma trận đơn giản duy nhất.',
    7, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_027', 'mcq', 'robot-kinematics',
    'Định thức (determinant) của một ma trận quay hợp lệ R luôn luôn bằng bao nhiêu?',
    ARRAY['1', '-1', '0', 'Vô hạn'],
    ARRAY['1']::varchar[],
    'Định thức ma trận quay luôn bằng 1, bảo toàn chiều hướng của hệ tọa độ (hệ tay phải).',
    5, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_028', 'mcq', 'robot-kinematics',
    'Dòng cuối cùng của một ma trận chuyển đổi thuần nhất 4x4 chuẩn chứa các giá trị nào?',
    ARRAY['[0, 0, 0, 1]', '[1, 1, 1, 0]', '[0, 0, 1, 0]', '[1, 0, 0, 0]'],
    ARRAY['[0, 0, 0, 1]']::varchar[],
    'Hàng cuối cùng của ma trận $T$ là cố định `[0, 0, 0, 1]` để bảo đảm cấu trúc nhân tọa độ thuần nhất.',
    5, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_029', 'short-answer', 'robot-kinematics',
    'Điền tên viết tắt của nhóm toán học đặc biệt mô tả ma trận quay 3D trực giao có định thức bằng 1. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['SO(3)', 'So(3)']::varchar[],
    'SO(3) là Special Orthogonal group.',
    5, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  ),
  (
    'cs_robfun_q_030', 'short-answer', 'robot-kinematics',
    'Điền số lượng phần tử tối đa của một ma trận chuyển đổi thuần nhất SE(3). (Điền số)',
    NULL,
    ARRAY['16']::varchar[],
    'Ma trận 4x4 có đúng 16 phần tử.',
    5, 'Robot Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Động học thuận cánh tay robot (cs_robfun_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_031', 'mcq', 'robot-kinematics',
    'Mục tiêu của bài toán Động học thuận (Forward Kinematics) là gì?',
    ARRAY['Tính toán vị trí và hướng của khâu cuối khi đã biết trước giá trị các góc khớp', 'Tính toán góc khớp khi biết vị trí khâu cuối', 'Tính mô-men xoắn cần thiết của động cơ', 'Tính toán sai số PID'],
    ARRAY['Tính toán vị trí và hướng của khâu cuối khi đã biết trước giá trị các góc khớp']::varchar[],
    'Động học thuận ánh xạ từ không gian khớp (Joint Space) sang không gian làm việc (Task Space).',
    5, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_032', 'mcq', 'robot-kinematics',
    'Phương pháp tham số Denavit-Hartenberg (D-H parameters) chuẩn sử dụng bao nhiêu tham số hình học để mô tả mỗi liên kết?',
    ARRAY['4', '6', '3', '2'],
    ARRAY['4']::varchar[],
    'Quy ước D-H sử dụng đúng 4 tham số: theta, d, a, alpha.',
    5, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_033', 'mcq', 'robot-kinematics',
    'Trong quy ước D-H, trục tọa độ Z_i-1 luôn được chọn dọc theo trục nào của robot?',
    ARRAY['Trục chuyển động (quay hoặc tịnh tiến) của khớp thứ i', 'Trục vuông góc chung', 'Trục song song với mặt đất', 'Trục nối tới khâu cuối'],
    ARRAY['Trục chuyển động (quay hoặc tịnh tiến) của khớp thứ i']::varchar[],
    'Trục Z của hệ tọa độ khớp luôn là trục vật lý của động cơ khớp đó.',
    6, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_034', 'mcq', 'robot-kinematics',
    'Tham số D-H "Chiều dài khâu" (Link length - a_i) được định nghĩa là gì?',
    ARRAY['Khoảng cách ngắn nhất (đường vuông góc chung) giữa trục Z_i-1 và Z_i dọc theo trục X_i', 'Khoảng cách dọc theo trục Z_i-1', 'Góc quay quanh trục X_i', 'Chiều dài toàn bộ thanh sắt chế tạo khâu'],
    ARRAY['Khoảng cách ngắn nhất (đường vuông góc chung) giữa trục Z_i-1 và Z_i dọc theo trục X_i']::varchar[],
    'a_i là khoảng cách ngắn nhất giữa hai trục khớp kế cận.',
    6, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_035', 'mcq', 'robot-kinematics',
    'Tham số D-H "Góc xoắn khâu" (Link twist - alpha_i) đo góc quay quanh trục nào?',
    ARRAY['Trục X_i', 'Trục Z_i-1', 'Trục Y_i', 'Trục thế giới'],
    ARRAY['Trục X_i']::varchar[],
    'alpha_i là góc quay từ trục Z_i-1 sang trục Z_i quanh trục hoành X_i.',
    6, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_036', 'mcq', 'robot-kinematics',
    'Để tính toán ma trận chuyển đổi khâu cuối so với gốc thế giới (T_N^0), ta thực hiện phép toán nào với các ma trận khâu kề nhau?',
    ARRAY['Nhân liên tiếp các ma trận chuyển đổi từ gốc tới ngọn (T_1^0 * T_2^1 * ... * T_N^(N-1))', 'Cộng các ma trận lại với nhau', 'Tính giá trị trung bình cộng', 'Lấy định thức của ma trận cuối cùng'],
    ARRAY['Nhân liên tiếp các ma trận chuyển đổi từ gốc tới ngọn (T_1^0 * T_2^1 * ... * T_N^(N-1))']::varchar[],
    'Nhân chuỗi các ma trận D-H liên tiếp xâu chuỗi sự chuyển dịch hệ tọa độ của robot.',
    6, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_037', 'mcq', 'robot-kinematics',
    'Số lượng nghiệm của bài toán động học thuận (Forward Kinematics) là bao nhiêu cho một bộ góc khớp cho trước?',
    ARRAY['Luôn duy nhất một nghiệm vị trí/hướng khâu cuối', 'Vô số nghiệm', 'Không có nghiệm nào', 'Tùy thuộc vào cấu trúc robot'],
    ARRAY['Luôn duy nhất một nghiệm vị trí/hướng khâu cuối']::varchar[],
    'Cánh tay robot ở trạng thái khớp xác định thì khâu cuối chỉ có thể nằm ở duy nhất một vị trí vật lý cố định.',
    5, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_038', 'mcq', 'robot-kinematics',
    'Khi thiết lập D-H parameters, trục hoành X_i được chọn như thế nào khi hai trục Z_i-1 và Z_i cắt nhau?',
    ARRAY['Trục X_i được chọn vuông góc với mặt phẳng chứa hai trục Z_i-1 và Z_i', 'Trục X_i được chọn trùng với Z_i-1', 'Trục X_i song song với mặt đất', 'Trục X_i hướng về gốc tọa độ thế giới'],
    ARRAY['Trục X_i được chọn vuông góc với mặt phẳng chứa hai trục Z_i-1 và Z_i']::varchar[],
    'Quy ước D-H quy định trục X_i là đường vuông góc chung, khi hai trục cắt nhau thì X_i vuông góc với mặt phẳng chứa hai trục đó.',
    7, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_039', 'short-answer', 'robot-kinematics',
    'Điền tên viết tắt tiếng Anh của quy ước thiết lập hệ tọa độ khớp robot phổ biến nhất. (Viết hoa cách nhau bằng gạch ngang)',
    NULL,
    ARRAY['D-H']::varchar[],
    'Quy ước Denavit-Hartenberg viết tắt là D-H.',
    5, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  ),
  (
    'cs_robfun_q_040', 'short-answer', 'robot-kinematics',
    'Điền tên tiếng Anh của khâu công tác cuối cùng thực hiện nhiệm vụ của robot (như kẹp, hàn). (Viết thường có gạch nối ở giữa)',
    NULL,
    ARRAY['end-effector', 'khâu cuối']::varchar[],
    'End-effector là khâu công tác cuối.',
    5, 'Forward Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Động học ngược cánh tay robot (cs_robfun_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_041', 'mcq', 'robot-kinematics',
    'Mục tiêu của bài toán Động học ngược (Inverse Kinematics) là gì?',
    ARRAY['Tính toán giá trị các góc khớp cần thiết để khâu cuối đạt được vị trí và hướng yêu cầu', 'Tính vị trí khâu cuối từ góc khớp', 'Tính ma trận Jacobian', 'Tính vận tốc của động cơ'],
    ARRAY['Tính toán giá trị các góc khớp cần thiết để khâu cuối đạt được vị trí và hướng yêu cầu']::varchar[],
    'Động học ngược ánh xạ ngược từ Task Space sang Joint Space, phục vụ cho việc điều khiển robot di chuyển tới đích.',
    5, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_042', 'mcq', 'robot-kinematics',
    'Đặc trưng toán học phức tạp của bài toán động học ngược (IK) so với động học thuận là gì?',
    ARRAY['Phương trình phi tuyến, có thể vô nghiệm hoặc có nhiều nghiệm khác nhau', 'Phương trình luôn tuyến tính đơn giản', 'Luôn luôn chỉ có duy nhất 1 nghiệm', 'Không thể giải bằng máy tính'],
    ARRAY['Phương trình phi tuyến, có thể vô nghiệm hoặc có nhiều nghiệm khác nhau']::varchar[],
    'Do lượng giác phi tuyến, cánh tay robot có thể gập lên/gập xuống để đạt cùng 1 vị trí (nhiều nghiệm) hoặc mục tiêu nằm ngoài tầm với (vô nghiệm).',
    6, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_043', 'mcq', 'robot-kinematics',
    'Định lý Pieper phát biểu điều kiện gì để cánh tay robot 6 trục chắc chắn có nghiệm giải tích (Closed-form)?',
    ARRAY['Ba trục khớp kề nhau song song hoặc cắt nhau tại duy nhất một điểm (như Spherical Wrist)', 'Robot chỉ sử dụng khớp trượt', 'Tổng chiều dài các khâu bằng 0', 'Robot phải chạy hệ điều hành ROS2'],
    ARRAY['Ba trục khớp kề nhau song song hoặc cắt nhau tại duy nhất một điểm (như Spherical Wrist)']::varchar[],
    'Định lý Pieper là nền tảng để thiết kế cơ khí robot 6 DOF công nghiệp luôn có nghiệm giải tích nhanh chóng.',
    7, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_044', 'mcq', 'robot-kinematics',
    'Nhược điểm lớn nhất của Phương pháp số trị (Numerical Method) khi giải động học ngược là gì?',
    ARRAY['Tốc độ tính toán chậm do lặp xấp xỉ và có khả năng không hội tụ được về nghiệm', 'Không áp dụng được cho robot nhiều khớp', 'Bắt buộc robot phải dừng lại khi tính toán', 'Luôn cho ra kết quả sai lệch lớn'],
    ARRAY['Tốc độ tính toán chậm do lặp xấp xỉ và có khả năng không hội tụ được về nghiệm']::varchar[],
    'Phương pháp số trị cần tính toán lặp ma trận Jacobian nghịch đảo qua nhiều chu kỳ máy nên tốn tài nguyên hơn phương pháp giải tích.',
    6, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_045', 'mcq', 'robot-kinematics',
    'Hiện tượng "Kỳ dị" (Singularity) của robot xảy ra khi nào?',
    ARRAY['Khi định thức của ma trận Jacobian tiến về 0, làm robot bị mất đi một hoặc nhiều hướng di chuyển trong không gian Descartes', 'Khi nguồn điện cấp cho robot bị quá tải', 'Khi robot va chạm mạnh vào vật cản', 'Khi cảm biến LiDAR bị bám bụi bẩn'],
    ARRAY['Khi định thức của ma trận Jacobian tiến về 0, làm robot bị mất đi một hoặc nhiều hướng di chuyển trong không gian Descartes']::varchar[],
    'Tại điểm kỳ dị, ma trận Jacobian bị suy biến (rank giảm), vận tốc khớp lý thuyết tiến tới vô cực để tạo chuyển động Descartes nhỏ nhất.',
    7, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_046', 'mcq', 'robot-kinematics',
    'Tại sao việc giải động học ngược bằng phương pháp số trị lại bị đổ vỡ tại điểm kỳ dị (Singularity)?',
    ARRAY['Vì ma trận Jacobian bị suy biến làm phép tính nghịch đảo J^-1 không tồn tại (vận tốc khớp lý thuyết tiến tới vô hạn)', 'Vì động cơ bị tắt đột ngột', 'Vì robot tự động chuyển sang chế độ an toàn', 'Vì ma trận quay trở nên bất đối xứng'],
    ARRAY['Vì ma trận Jacobian bị suy biến làm phép tính nghịch đảo J^-1 không tồn tại (vận tốc khớp lý thuyết tiến tới vô hạn)']::varchar[],
    'Nghịch đảo của số tiệm cận 0 tiến tới vô cực, mạch Driver không thể cung cấp điện áp lớn vô hạn cho động cơ.',
    7, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_047', 'mcq', 'robot-kinematics',
    'Phương pháp nào thường dùng để khắc phục lỗi tính toán IK gần điểm kỳ dị khi chạy số trị?',
    ARRAY['Sử dụng phương pháp Jacobian giả nghịch đảo có giảm chấn (Damped Least Squares)', 'Tắt nguồn robot lập tức', 'Sử dụng động cơ bước', 'Chuyển đổi toàn bộ khớp trượt thành khớp quay'],
    ARRAY['Sử dụng phương pháp Jacobian giả nghịch đảo có giảm chấn (Damped Least Squares)']::varchar[],
    'Damped Least Squares giới hạn vận tốc khớp cực đại bằng cách hy sinh một chút độ chính xác quỹ đạo gần điểm kỳ dị.',
    7, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_048', 'mcq', 'robot-kinematics',
    'Một cánh tay robot phẳng 2 khâu gập khuỷu tay lên (Elbow up) và gập khuỷu tay xuống (Elbow down) để chạm cùng một điểm đích biểu thị điều gì?',
    ARRAY['Bài toán động học ngược có nhiều nghiệm (đa nghiệm)', 'Robot bị lỗi cơ khí', 'Robot ở điểm kỳ dị', 'Bài toán động học thuận bị sai lệch'],
    ARRAY['Bài toán động học ngược có nhiều nghiệm (đa nghiệm)']::varchar[],
    'Mỗi cấu hình gập biểu thị một nghiệm hình học hợp lệ của phương trình động học ngược.',
    6, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_049', 'short-answer', 'robot-kinematics',
    'Điền tên viết tắt tiếng Anh của bài toán động học ngược. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IK']::varchar[],
    'IK là Inverse Kinematics.',
    5, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  ),
  (
    'cs_robfun_q_050', 'short-answer', 'robot-kinematics',
    'Điền tên ma trận đạo hàm riêng biểu thị mối quan hệ giữa vận tốc khớp và vận tốc Descartes khâu cuối. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Jacobian', 'Ma trận jacobian']::varchar[],
    'Ma trận Jacobian liên kết vận tốc khớp và vận tốc khâu cuối.',
    6, 'Inverse Kinematics', 'cs_robotics_fundamentals', 13, 'cs_robfun_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Động cơ & Cơ cấu chấp hành (cs_robfun_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_051', 'mcq', 'robot-introduction',
    'Tại sao động cơ DC Servo được sử dụng rộng rãi trong các khớp robot đòi hỏi độ chính xác cao?',
    ARRAY['Vì nó tích hợp sẵn cảm biến phản hồi Encoder tạo thành hệ điều hành vòng kín kiểm soát góc quay chính xác', 'Vì nó có giá thành rẻ nhất', 'Vì nó chạy trực tiếp không cần Driver', 'Vì nó không tỏa nhiệt năng'],
    ARRAY['Vì nó tích hợp sẵn cảm biến phản hồi Encoder tạo thành hệ điều hành vòng kín kiểm soát góc quay chính xác']::varchar[],
    'Hệ thống phản hồi vòng kín của Servo liên tục sửa sai số vị trí thực tế so với vị trí đặt.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_052', 'mcq', 'robot-introduction',
    'Đặc trưng hoạt động của động cơ bước (Stepper Motor) là gì?',
    ARRAY['Quay theo từng bước góc cố định khi nhận các xung điện kích hoạt cuộn dây tuần tự (vòng hở)', 'Quay liên tục không thể điều khiển góc', 'Bắt buộc phải có encoder absolute', 'Chỉ chạy bằng dòng điện xoay chiều AC khổng lồ'],
    ARRAY['Quay theo từng bước góc cố định khi nhận các xung điện kích hoạt cuộn dây tuần tự (vòng hở)']::varchar[],
    'Động cơ bước điều khiển góc quay bằng số lượng xung cấp cho Driver, đơn giản nhưng có nguy cơ mất bước khi bị quá tải.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_053', 'mcq', 'robot-introduction',
    'Ưu điểm nổi bật nhất của động cơ BLDC (Brushless DC) so với động cơ DC chổi than truyền thống là gì?',
    ARRAY['Hiệu suất cao, không mài mòn chổi than nên tuổi thọ lâu dài và giảm thiểu tia lửa điện gây cháy nổ', 'Giá thành rẻ hơn nhiều', 'Không cần dùng mạch điều khiển Driver', 'Có kích thước lớn hơn'],
    ARRAY['Hiệu suất cao, không mài mòn chổi than nên tuổi thọ lâu dài và giảm thiểu tia lửa điện gây cháy nổ']::varchar[],
    'Động cơ không chổi than BLDC điều khiển chuyển mạch bằng mạch điện tử linh hoạt, giảm hao mòn cơ khí.',
    6, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_054', 'mcq', 'robot-introduction',
    'Vai trò của Hộp số giảm tốc (Gearbox) gắn đầu trục động cơ khớp robot là gì?',
    ARRAY['Giảm tốc độ quay của động cơ để tăng mô-men xoắn ngõ ra tại khớp tương ứng', 'Tăng tốc độ quay của khớp lên tối đa', 'Mã hóa tín hiệu góc khớp', 'Cách điện cho động cơ'],
    ARRAY['Giảm tốc độ quay của động cơ để tăng mô-men xoắn ngõ ra tại khớp tương ứng']::varchar[],
    'Tỷ số truyền giảm tốc $N$ làm giảm tốc độ $N$ lần nhưng nâng mô-men xoắn lên gấp $N$ lần, giúp khớp chịu được tải trọng nâng lớn.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_055', 'mcq', 'robot-introduction',
    'Hộp số sóng Harmonic Drive sở hữu ưu điểm vượt trội nào bắt buộc phải dùng cho cánh tay robot công nghiệp?',
    ARRAY['Độ rơ răng bằng 0 (Zero backlash) và tỷ số truyền cực lớn trong không gian siêu nhỏ nhẹ', 'Giá thành rẻ và dễ chế tạo bằng nhựa', 'Không cần dầu bôi trơn', 'Có vỏ bọc chống nước tiêu chuẩn IP68'],
    ARRAY['Độ rơ răng bằng 0 (Zero backlash) và tỷ số truyền cực lớn trong không gian siêu nhỏ nhẹ']::varchar[],
    'Không rơ răng (backlash) giúp robot di chuyển lặp lại cực kỳ chính xác, không bị rung lắc rơ lệch khâu cuối khi dừng/đổi chiều.',
    6, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_056', 'mcq', 'robot-introduction',
    'Cơ cấu "Trục vít me bi" (Ball Screw) thực hiện nhiệm vụ chuyển đổi chuyển động nào?',
    ARRAY['Chuyển đổi chuyển động quay thành chuyển động tịnh tiến tuyến tính hiệu suất cao', 'Chuyển đổi chuyển động tịnh tiến thành quay', 'Chuyển đổi dòng điện xoay chiều thành một chiều', 'Chuyển đổi góc quay từ trục X sang Z'],
    ARRAY['Chuyển đổi chuyển động quay thành chuyển động tịnh tiến tuyến tính hiệu suất cao']::varchar[],
    'Vít me bi sử dụng các viên bi kim loại tuần hoàn trong rãnh ren để giảm thiểu ma sát trượt, tối ưu chuyển động tịnh tiến khớp trượt.',
    6, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_057', 'mcq', 'robot-introduction',
    'Hiện tượng "Backlash" trong hộp số giảm tốc gây ra tác hại gì?',
    ARRAY['Khe hở răng cơ khí làm khớp bị rơ lệch vị trí khi động cơ đổi chiều quay', 'Động cơ bị quá nhiệt cháy cuộn dây', 'Tốc độ động cơ bị giảm đột ngột', 'Tín hiệu PWM bị nhiễu'],
    ARRAY['Khe hở răng cơ khí làm khớp bị rơ lệch vị trí khi động cơ đổi chiều quay']::varchar[],
    'Backlash là khoảng rơ tự do giữa các răng ăn khớp, làm sai lệch tọa độ khâu cuối khi đảo chiều.',
    6, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_058', 'mcq', 'robot-introduction',
    'Tín hiệu điều khiển nào thường được dùng để chỉ đạo mạch Driver cấp công suất điện áp cho động cơ DC?',
    ARRAY['PWM (Pulse Width Modulation - Điều chế độ rộng xung)', 'CAN bus', 'Dịch địa chỉ IP', 'Tín hiệu số nhị phân bù 2'],
    ARRAY['PWM (Pulse Width Modulation - Điều chế độ rộng xung)']::varchar[],
    'Tần số và chu kỳ nhiệm vụ (Duty Cycle) của PWM xác định điện áp trung bình cấp cho động cơ, thay đổi tốc độ quay.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_059', 'short-answer', 'robot-introduction',
    'Điền tên tiếng Anh viết tắt của loại động cơ một chiều không chổi than hiệu suất cao dùng cho Drone. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['BLDC']::varchar[],
    'BLDC là Brushless DC motor.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  ),
  (
    'cs_robfun_q_060', 'short-answer', 'robot-introduction',
    'Điền từ tiếng Anh chỉ độ rơ rơ răng cơ khí của hộp số giảm tốc khi đảo chiều. (Viết thường)',
    NULL,
    ARRAY['backlash', 'độ rơ']::varchar[],
    'Backlash gây sai số vị trí khi robot chuyển động đảo hướng.',
    5, 'Actuators', 'cs_robotics_fundamentals', 13, 'cs_robfun_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Cảm biến nhận thức môi trường vật lý (cs_robfun_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_061', 'mcq', 'robot-sensing',
    'Cảm biến Encoder gán trên trục động cơ thực hiện nhiệm vụ gì?',
    ARRAY['Đo góc quay và vận tốc góc thực tế của trục động cơ', 'Đo gia tốc tuyến tính 3 hướng', 'Đo khoảng cách tới vật cản xung quanh', 'Đo nhiệt độ lõi dây đồng'],
    ARRAY['Đo góc quay và vận tốc góc thực tế của trục động cơ']::varchar[],
    'Encoder quang học hoặc từ tính chuyển đổi vị trí góc quay thành chuỗi xung điện gửi về controller.',
    5, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_062', 'mcq', 'robot-sensing',
    'Sự khác biệt cốt lõi giữa Absolute Encoder và Incremental Encoder là gì?',
    ARRAY['Absolute Encoder lưu vị trí góc quay tuyệt đối kể cả khi mất nguồn điện; Incremental Encoder chỉ đếm xung tăng dần và mất gốc khi reset nguồn', 'Incremental Encoder chính xác hơn', 'Absolute Encoder có giá thành rẻ hơn', 'Incremental Encoder đo được khoảng cách xa'],
    ARRAY['Absolute Encoder lưu vị trí góc quay tuyệt đối kể cả khi mất nguồn điện; Incremental Encoder chỉ đếm xung tăng dần và mất gốc khi reset nguồn']::varchar[],
    'Absolute Encoder sử dụng đĩa mã hóa mã Gray hoặc giao tiếp nối tiếp để báo góc tức thời không cần quy không (Homing) khi khởi động.',
    6, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_063', 'mcq', 'robot-sensing',
    'Bộ đo quán tính IMU (Inertial Measurement Unit) tích hợp hai cảm biến cốt lõi nào bên trong?',
    ARRAY['Cảm biến gia tốc (Accelerometer) và Cảm biến góc quay (Gyroscope)', 'Cảm biến LiDAR và Encoder quang', 'Cảm biến siêu âm và Camera độ sâu', 'Cảm biến lực và Nút E-stop'],
    ARRAY['Cảm biến gia tốc (Accelerometer) và Cảm biến góc quay (Gyroscope)']::varchar[],
    'IMU đo gia tốc tuyến tính 3 trục và vận tốc góc 3 trục phục vụ tính toán định hướng tư thế robot.',
    6, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_064', 'mcq', 'robot-sensing',
    'Cảm biến LiDAR (Light Detection and Ranging) đo khoảng cách dựa trên nguyên lý vật lý nào?',
    ARRAY['Time of Flight (ToF) - Đo thời gian bay khứ hồi của tia sáng Laser phản xạ từ vật cản về cảm biến', 'Đo cường độ âm thanh phản xạ', 'Đo cảm ứng điện từ của kim loại', 'Đo sự thay đổi nhiệt độ không khí'],
    ARRAY['Time of Flight (ToF) - Đo thời gian bay khứ hồi của tia sáng Laser phản xạ từ vật cản về cảm biến']::varchar[],
    'Tia laser đi với tốc độ ánh sáng, khoảng cách $d = (c \cdot t) / 2$. LiDAR vẽ đám mây điểm 2D/3D cực kỳ chính xác.',
    6, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_065', 'mcq', 'robot-sensing',
    'Nhược điểm lớn nhất cần lưu ý khi sử dụng dữ liệu IMU để tính toán vị trí robot bằng tích phân hai lần gia tốc là gì?',
    ARRAY['Sai số trôi tích lũy (Drift error) phình to theo thời gian làm tọa độ tính toán bị lệch hướng nghiêm trọng', 'Tốc độ phản hồi của IMU quá chậm', 'IMU tiêu thụ lượng điện năng quá lớn', 'IMU không hoạt động được trong bóng tối'],
    ARRAY['Sai số trôi tích lũy (Drift error) phình to theo thời gian làm tọa độ tính toán bị lệch hướng nghiêm trọng']::varchar[],
    'Nhiễu nhỏ của gia tốc tích phân 2 lần tạo sai số vị trí tăng theo hàm bậc hai, bắt buộc phải lọc kết hợp thông tin odom/LiDAR (Lọc Kalman).',
    7, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_066', 'mcq', 'robot-sensing',
    'Camera độ sâu (Depth Camera) cung cấp thông tin gì khác biệt so với camera RGB thông thường?',
    ARRAY['Cung cấp ma trận giá trị khoảng cách Z của từng pixel từ camera tới bề mặt vật thể thực tế', 'Cung cấp ảnh đen trắng độ phân giải cao', 'Chỉ chụp được ảnh hồng ngoại ban đêm', 'Tự động bóc tách màu sắc của ảnh'],
    ARRAY['Cung cấp ma trận giá trị khoảng cách Z của từng pixel từ camera tới bề mặt vật thể thực tế']::varchar[],
    'Camera Depth tái tạo hình ảnh 3D môi trường trước mặt robot phục vụ nhận diện vật cản và SLAM.',
    6, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_067', 'mcq', 'robot-sensing',
    'Cảm biến nào sau đây thuộc nhóm Cảm biến trạng thái trong (Propriative)?',
    ARRAY['Encoder quang học đo góc khớp', 'LiDAR quét vật cản bên ngoài', 'Camera Depth nhận diện người dùng', 'Cảm biến siêu âm đo khoảng cách tường'],
    ARRAY['Encoder quang học đo góc khớp']::varchar[],
    'Cảm biến trong chỉ đo đạc các thông số nội tại của cơ thể robot, không tương tác với thế giới ngoài.',
    5, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_068', 'mcq', 'robot-sensing',
    'Nguyên lý hoạt động của cảm biến siêu âm đo khoảng cách là gì?',
    ARRAY['Phát sóng siêu âm và đo thời gian âm phản xạ dội lại từ vật cản', 'Quét tia laser hồng ngoại xoay tròn', 'Đo lực ép cơ học lên bề mặt đầu thu', 'Phân tích hình ảnh chụp được'],
    ARRAY['Phát sóng siêu âm và đo thời gian âm phản xạ dội lại từ vật cản']::varchar[],
    'Siêu âm sử dụng vận tốc âm thanh trong không khí (khoảng 343 m/s) để ước lượng khoảng cách giá rẻ.',
    5, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_069', 'short-answer', 'robot-sensing',
    'Điền tên viết tắt tiếng Anh của bộ đo quán tính tích hợp gia tốc và con quay hồi chuyển. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IMU']::varchar[],
    'IMU là Inertial Measurement Unit.',
    5, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  ),
  (
    'cs_robfun_q_070', 'short-answer', 'robot-sensing',
    'Điền tên viết tắt của nguyên lý đo khoảng cách bằng cách đo thời gian bay của sóng điện từ/âm thanh đến vật cản. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['ToF', 'Time of flight']::varchar[],
    'ToF là Time of Flight.',
    5, 'Robot Sensors', 'cs_robotics_fundamentals', 13, 'cs_robfun_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Hệ điều hành Robot ROS2 & Cấu trúc phân tán (cs_robfun_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_071', 'mcq', 'robot-sensing',
    'Bản chất cốt lõi của ROS2 (Robot Operating System 2) là gì?',
    ARRAY['Là một trung gian phần mềm (Middleware) cung cấp cơ chế và thư viện truyền tin phân tán cho robot', 'Là một hệ điều hành nhân Linux riêng biệt', 'Là một ngôn ngữ lập trình mới thay thế C++', 'Là phần cứng chip vi xử lý của robot'],
    ARRAY['Là một trung gian phần mềm (Middleware) cung cấp cơ chế và thư viện truyền tin phân tán cho robot']::varchar[],
    'ROS2 cung cấp cơ sở hạ tầng giao tiếp (topics, services, actions) kết nối các tiến trình (nodes) chạy độc lập.',
    5, 'ROS2 Architecture', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_072', 'mcq', 'robot-sensing',
    'Đơn vị thực thi nhiệm vụ độc lập (một process chạy code) trong mạng ROS2 được gọi là gì?',
    ARRAY['Node (Nút)', 'Topic (Chủ đề)', 'Service (Dịch vụ)', 'Action (Hành động)'],
    ARRAY['Node (Nút)']::varchar[],
    'Mỗi Node thực hiện một vai trò đơn nhiệm (như đọc LiDAR, tính toán động học) giúp hệ thống mô-đun hóa dễ dàng.',
    5, 'ROS2 Architecture', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_073', 'mcq', 'robot-sensing',
    'Cơ chế truyền tin "Topic" trong ROS2 hoạt động theo mô hình nào?',
    ARRAY['Publish/Subscribe (Bất đồng bộ, một-nhiều)', 'Request/Response (Đồng bộ, một-một)', 'Client/Server', 'Dữ liệu lưu trữ trên bộ nhớ đệm dùng chung'],
    ARRAY['Publish/Subscribe (Bất đồng bộ, một-nhiều)']::varchar[],
    'Topic thích hợp cho dòng dữ liệu cảm biến truyền liên tục (stream data): node gửi publish liên tục, node nhận subscribe tự động đọc.',
    5, 'ROS2 Communication', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_074', 'mcq', 'robot-sensing',
    'Cơ chế truyền tin "Service" trong ROS2 phù hợp cho loại tác vụ nào?',
    ARRAY['Các lệnh cấu hình nhanh chóng dạng đồng bộ Request/Response (gửi yêu cầu và đợi kết quả lập tức)', 'Truyền dữ liệu LiDAR tần số cao liên tục', 'Điều khiển robot di chuyển tới đích xa mất nhiều phút', 'Đọc dữ liệu quán tính của IMU'],
    ARRAY['Các lệnh cấu hình nhanh chóng dạng đồng bộ Request/Response (gửi yêu cầu và đợi kết quả lập tức)']::varchar[],
    'Service chặn (block) luồng chạy của client để đợi phản hồi tức thì từ server, không dùng cho tác vụ chạy lâu.',
    6, 'ROS2 Communication', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_075', 'mcq', 'robot-sensing',
    'Cơ chế truyền tin "Action" trong ROS2 cung cấp luồng thông tin phản hồi nào đặc trưng cho các tác vụ dài hạn?',
    ARRAY['Goal (gửi đích), Feedback (tiến độ liên tục) và Result (kết quả cuối)', 'Chỉ gửi kết quả cuối cùng', 'Không gửi bất kỳ thông báo nào', 'Dữ liệu được băm nhỏ gửi qua UDP'],
    ARRAY['Goal (gửi đích), Feedback (tiến độ liên tục) và Result (kết quả cuối)']::varchar[],
    'Action cho phép theo dõi tiến trình (feedback) thực hiện nhiệm vụ (ví dụ: robot đã đi được 50% quãng đường) và có thể hủy bỏ (cancel) giữa chừng.',
    6, 'ROS2 Communication', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_076', 'mcq', 'robot-sensing',
    'Chuẩn truyền tin mạng công nghiệp nào được ROS2 tích hợp trực tiếp dưới tầng middleware để đảm bảo an toàn thời gian thực?',
    ARRAY['DDS (Data Distribution Service)', 'HTTP/3', 'FTP', 'WebSocket'],
    ARRAY['DDS (Data Distribution Service)']::varchar[],
    'DDS cung cấp khả năng khám phá node tự động, cấu hình QoS cho phép ROS2 chạy tin cậy thời gian thực cấp công nghiệp.',
    7, 'ROS2 Architecture', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_077', 'mcq', 'robot-sensing',
    'Công cụ trực quan hóa 3D giúp hiển thị tọa độ khâu, dữ liệu LiDAR, camera của robot trong ROS2 có tên là gì?',
    ARRAY['RViz2', 'Gazebo', 'Docker', 'Webpack'],
    ARRAY['RViz2']::varchar[],
    'RViz2 hiển thị trực quan trạng thái cảm biến và mô hình robot theo thời gian thực.',
    5, 'ROS2 Tools', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_078', 'mcq', 'robot-sensing',
    'Phần mềm giả lập môi trường vật lý 3D động lực học thường đi kèm với ROS2 để test code trước khi chạy robot thật là gì?',
    ARRAY['Gazebo (hoặc Webots)', 'RViz2', 'ROS Master', 'GitLab'],
    ARRAY['Gazebo (hoặc Webots)']::varchar[],
    'Gazebo mô phỏng trọng lực, ma sát, va chạm cơ lý giúp kiểm tra thuật toán an toàn.',
    5, 'ROS2 Tools', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_079', 'short-answer', 'robot-sensing',
    'Điền tên viết tắt của chuẩn truyền tin phân tán công nghiệp làm nền tảng cho ROS2. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DDS']::varchar[],
    'DDS là Data Distribution Service.',
    5, 'ROS2 Architecture', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  ),
  (
    'cs_robfun_q_080', 'short-answer', 'robot-sensing',
    'Điền tên công cụ trực quan hóa hiển thị dữ liệu cảm biến của ROS2. (Viết chữ thường kèm số 2 ở cuối)',
    NULL,
    ARRAY['rviz2']::varchar[],
    'rviz2 là công cụ hiển thị đồ họa trực quan.',
    5, 'ROS2 Tools', 'cs_robotics_fundamentals', 13, 'cs_robfun_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Hệ thống điều khiển phản hồi vòng kín (cs_robfun_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_081', 'mcq', 'robot-control',
    'Công thức tính sai số điều khiển e(t) trong hệ thống phản hồi vòng kín là gì?',
    ARRAY['e(t) = r(t) - y(t) (Giá trị đặt trừ giá trị thực tế)', 'e(t) = r(t) + y(t)', 'e(t) = r(t) * y(t)', 'e(t) = y(t)'],
    ARRAY['e(t) = r(t) - y(t) (Giá trị đặt trừ giá trị thực tế)']::varchar[],
    'Sai số $e(t)$ chỉ độ lệch giữa mục tiêu mong muốn $r(t)$ và trạng thái thực tế đo được từ cảm biến $y(t)$.',
    5, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_082', 'mcq', 'robot-control',
    'Khâu tỉ lệ K_p (Proportional) trong bộ điều khiển PID tạo ra lực điều khiển dựa trên yếu tố nào?',
    ARRAY['Tỉ lệ trực tiếp với sai số hiện tại e(t)', 'Tích lũy sai số quá khứ', 'Tốc độ thay đổi sai số tương lai', 'Giá trị lớn nhất của góc đặt'],
    ARRAY['Tỉ lệ trực tiếp với sai số hiện tại e(t)']::varchar[],
    'Khâu P phản ứng lập tức với độ lớn sai số hiện tại. $K_p$ càng lớn thì lực kéo càng mạnh.',
    5, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_083', 'mcq', 'robot-control',
    'Khâu tích phân K_i (Integral) đóng vai trò quan trọng nào trong chất lượng điều khiển?',
    ARRAY['Tích lũy sai số quá khứ để triệt tiêu hoàn toàn sai số xác lập (Steady-state error) ở trạng thái ổn định', 'Dập tắt dao động của hệ thống', 'Làm mượt đáp ứng đầu ra', 'Tự động giới hạn tốc độ cực đại'],
    ARRAY['Tích lũy sai số quá khứ để triệt tiêu hoàn toàn sai số xác lập (Steady-state error) ở trạng thái ổn định']::varchar[],
    'Khi có ma sát hoặc tải trọng tĩnh, khâu P/D không thể tự đưa sai số về 0. Khâu I cộng dồn sai số theo thời gian để tạo đủ lực triệt tiêu độ lệch tĩnh.',
    6, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_084', 'mcq', 'robot-control',
    'Khâu vi phân K_d (Derivative) mang lại tác động gì cho bộ điều khiển PID?',
    ARRAY['Dự đoán sai số tương lai dựa trên tốc độ thay đổi sai số, đóng vai trò như bộ giảm chấn để dập tắt dao động và giảm vọt lố', 'Loại bỏ hoàn toàn sai số xác lập', 'Tăng tốc độ đáp ứng ban đầu lên vô hạn', 'Tự động đảo chiều quay động cơ'],
    ARRAY['Dự đoán sai số tương lai dựa trên tốc độ thay đổi sai số, đóng vai trò như bộ giảm chấn để dập tắt dao động và giảm vọt lố']::varchar[],
    'Khâu D tỷ lệ với tốc độ thay đổi sai số, có xu hướng chống lại sự thay đổi nhanh, giúp giảm quán tính làm mượt hệ thống.',
    6, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_085', 'mcq', 'robot-control',
    'Nhược điểm lớn nhất cần phòng ngừa khi triển khai khâu vi phân K_d trên phần cứng thực tế là gì?',
    ARRAY['K_d cực kỳ nhạy cảm với nhiễu tần số cao của cảm biến, dễ làm tín hiệu điều khiển bị rung giật mạnh', 'Làm động cơ bị trễ đáp ứng', 'Làm sập nguồn điện của controller', 'Không chạy được trên vi điều khiển 8-bit'],
    ARRAY['K_d cực kỳ nhạy cảm với nhiễu tần số cao của cảm biến, dễ làm tín hiệu điều khiển bị rung giật mạnh']::varchar[],
    'Phép đạo hàm số trị khuếch đại nhiễu gai của cảm biến. Phải lọc thông thấp (low-pass filter) dữ liệu trước khi tính đạo hàm.',
    7, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_086', 'mcq', 'robot-control',
    'Hiện tượng "Integral Windup" (Bão hòa tích phân) xảy ra khi nào?',
    ARRAY['Khi cơ cấu chấp hành bị bão hòa vật lý (ví dụ động cơ đạt tối đa điện áp) nhưng sai số vẫn còn, làm khâu tích phân liên tục tăng lũy kế khổng lồ gây vọt lố rất lớn', 'Khi hệ số K_i được đặt bằng 0', 'Khi cảm biến bị đứt dây tín hiệu', 'Khi động cơ quay ngược hướng đặt'],
    ARRAY['Khi cơ cấu chấp hành bị bão hòa vật lý (ví dụ động cơ đạt tối đa điện áp) nhưng sai số vẫn còn, làm khâu tích phân liên tục tăng lũy kế khổng lồ gây vọt lố rất lớn']::varchar[],
    'Khi bão hòa, hệ thống không thể tăng thêm lực điều khiển nhưng khâu I vẫn tiếp tục cộng dồn, bắt buộc phải có cơ chế anti-windup (khống chế ngưỡng tích phân).',
    7, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_087', 'mcq', 'robot-control',
    'Tác động tiêu cực khi ta đặt hệ số tỉ lệ K_p quá lớn là gì?',
    ARRAY['Hệ thống sẽ bị dao động mạnh quanh giá trị đặt và có nguy cơ bị mất ổn định (phân kỳ)', 'Hệ thống phản ứng cực kỳ mượt mà', 'Triệt tiêu hoàn toàn sai số tĩnh', 'Làm khâu vi phân K_d bị triệt tiêu'],
    ARRAY['Hệ thống sẽ bị dao động mạnh quanh giá trị đặt và có nguy cơ bị mất ổn định (phân kỳ)']::varchar[],
    'K_p quá lớn tạo lực kéo vượt mức, làm hệ thống vọt lố qua đích liên tục sang hai phía tạo dao động không tắt.',
    6, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_088', 'mcq', 'robot-control',
    'Cấu trúc "Cascade PID" (PID xếp tầng) thường dùng trong điều khiển khớp robot công nghiệp điều phối các vòng lặp nào?',
    ARRAY['Vòng điều khiển dòng điện (trong cùng), vòng vận tốc (giữa) và vòng vị trí (ngoài cùng)', 'Ba vòng điều khiển vị trí độc lập', 'Vòng điều khiển nhiệt độ và tốc độ', 'Vòng điều khiển I/O của ROS2'],
    ARRAY['Vòng điều khiển dòng điện (trong cùng), vòng vận tốc (giữa) và vòng vị trí (ngoài cùng)']::varchar[],
    'Điều khiển xếp tầng bảo đảm động cơ chạy êm, kiểm soát được mô-men xoắn (dòng điện) và giới hạn vận tốc an toàn khi bám vị trí.',
    7, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_089', 'short-answer', 'robot-control',
    'Điền tên viết tắt của bộ điều khiển phản hồi cổ điển phổ biến nhất dựa trên Tỉ lệ, Tích phân và Vi phân. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PID']::varchar[],
    'PID là Proportional Integral Derivative.',
    5, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  ),
  (
    'cs_robfun_q_090', 'short-answer', 'robot-control',
    'Điền tên tiếng Anh của hiện tượng bão hòa tích phân khâu I khi cơ cấu chấp hành đạt giới hạn vật lý. (Viết thường)',
    NULL,
    ARRAY['windup', 'integral windup']::varchar[],
    'Integral Windup gây vọt lố lớn khi thoát khỏi bão hòa.',
    6, 'PID Control', 'cs_robotics_fundamentals', 13, 'cs_robfun_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Thiết kế an toàn & Tiêu chuẩn công nghiệp trong Robotics (cs_robfun_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robfun_q_091', 'mcq', 'robot-control',
    'Tiêu chuẩn ISO 10218 quy định các yêu cầu an toàn đối với loại robot nào?',
    ARRAY['Robot công nghiệp lắp đặt cố định', 'Robot cộng tác (Cobots)', 'Robot đồ chơi trẻ em', 'Thiết bị bay không người lái'],
    ARRAY['Robot công nghiệp lắp đặt cố định']::varchar[],
    'ISO 10218 định nghĩa vùng an toàn, hàng rào bảo vệ vật lý cho các robot công nghiệp tải trọng lớn chuyển động nhanh.',
    5, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_092', 'mcq', 'robot-control',
    'Tiêu chuẩn chuyên biệt ISO/TS 15066 định nghĩa các quy tắc an toàn cho hệ thống robot nào?',
    ARRAY['Robot cộng tác (Cobots) làm việc chung không gian không hàng rào bảo vệ với con người', 'Robot thám hiểm đại dương', 'Xe tự hành ngoài đường lộ', 'Robot y tế phẫu thuật'],
    ARRAY['Robot cộng tác (Cobots) làm việc chung không gian không hàng rào bảo vệ với con người']::varchar[],
    'ISO/TS 15066 quy định giới hạn lực va chạm, tốc độ an toàn tối đa để bảo đảm không gây chấn thương cho người đứng cạnh.',
    6, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_093', 'mcq', 'robot-control',
    'Cơ chế dừng khẩn cấp "Emergency Stop" (E-Stop) bắt buộc phải được thiết kế phần cứng thế nào?',
    ARRAY['Ngắt trực tiếp nguồn điện cấp cho động cơ bằng mạch rơ-le an toàn phần cứng độc lập, không thông qua phần mềm xử lý của máy tính', 'Gửi lệnh tắt qua mạng wifi', 'Tắt phần mềm ROS2', 'Tự động giảm dần 50% tốc độ quay'],
    ARRAY['Emergency Stop (E-Stop) bắt buộc phải được thiết kế phần cứng thế nào?', 'Ngắt trực tiếp nguồn điện cấp cho động cơ bằng mạch rơ-le an toàn phần cứng độc lập, không thông qua phần mềm xử lý của máy tính']::varchar[],
    'E-Stop vật lý bảo đảm robot dừng lập tức kể cả khi hệ điều hành bị treo hay lỗi phần mềm.',
    6, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_094', 'mcq', 'robot-control',
    'Đặc điểm hình học nổi bật giúp Robot cộng tác (Cobots) thân thiện hơn robot công nghiệp thông thường là gì?',
    ARRAY['Thiết bị bo tròn các góc cạnh cơ khí, không có điểm kẹt tay vật lý và cấu trúc nhẹ hấp thụ lực tốt', 'Được sơn màu xanh dương', 'Không có dây cáp điện lộ ra ngoài', 'Có kích thước khổng lồ'],
    ARRAY['Thiết bị bo tròn các góc cạnh cơ khí, không có điểm kẹt tay vật lý và cấu trúc nhẹ hấp thụ lực tốt']::varchar[],
    'Cobots giảm thiểu rủi ro chấn thương sắc nhọn bằng thiết kế công thái học trơn nhẵn.',
    5, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_095', 'mcq', 'robot-control',
    'Cơ chế "Hạn chế lực và mô-men" (Power and Force Limiting) của Cobots hoạt động thế nào?',
    ARRAY['Cảm biến lực tích hợp tại các khớp phát hiện va chạm vượt ngưỡng an toàn và ra lệnh dừng chuyển động lập tức trong mili-giây', 'Giới hạn điện áp nguồn cấp cố định ở mức rất thấp', 'Không cho phép robot nâng tải trọng quá 100g', 'Robot tự động chuyển hướng đi ngẫu nhiên'],
    ARRAY['Cảm biến lực tích hợp tại các khớp phát hiện va chạm vượt ngưỡng an toàn và ra lệnh dừng chuyển động lập tức trong mili-giây']::varchar[],
    'Cobots đo đạc phản lực phản hồi từ khớp. Va chạm cản trở chuyển động sẽ kích hoạt ngắt an toàn dừng khớp.',
    6, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_096', 'mcq', 'robot-control',
    'Để thiết lập "Vùng bảo vệ an toàn" (Safe Zones) không tiếp xúc vật lý quanh robot công nghiệp nặng, người ta dùng thiết bị cảm biến ngoài nào?',
    ARRAY['LiDAR quét an toàn (Safety Scanner) gắn dưới sàn', 'Encoder quang học trên khớp', 'IMU gắn trên vai robot', 'Cảm biến siêu âm mini'],
    ARRAY['LiDAR quét an toàn (Safety Scanner) gắn dưới sàn']::varchar[],
    'Safety Scanner đạt chuẩn an toàn chức năng quét liên tục mặt sàn phẳng bảo vệ vùng làm việc.',
    6, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_097', 'mcq', 'robot-control',
    'Màu sắc quy chuẩn quốc tế bắt buộc của Nút dừng khẩn cấp E-Stop cơ khí là gì?',
    ARRAY['Nút nhấn màu đỏ nổi bật trên đế nền màu vàng', 'Nút nhấn màu xanh lá cây nền trắng', 'Nút nhấn màu đen nền xám', 'Nút nhấn màu xanh dương nền đen'],
    ARRAY['Nút nhấn màu đỏ nổi bật trên đế nền màu vàng']::varchar[],
    'Đỏ trên nền vàng là ký hiệu nhận diện trực quan khẩn cấp chuẩn OSHA/ISO.',
    5, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_098', 'mcq', 'robot-control',
    'Khái niệm "An toàn chức năng" (Functional Safety) trong thiết kế hệ thống robot yêu cầu điều gì?',
    ARRAY['Các cảm biến, mạch logic và mạch chấp hành liên quan đến an toàn phải đạt các cấp độ tin cậy được chứng nhận (như PL hoặc SIL)', 'Robot chỉ hoạt động khi có admin giám sát', 'Robot không được phép chạy quá 8 giờ/ngày', 'Sử dụng mật khẩu bảo mật 2 lớp'],
    ARRAY['Các cảm biến, mạch logic và mạch chấp hành liên quan đến an toàn phải đạt các cấp độ tin cậy được chứng nhận (như PL hoặc SIL)']::varchar[],
    'Mạch an toàn chức năng tự phát hiện lỗi nội bộ (như chập mạch, đứt dây) để đưa robot về trạng thái an toàn mặc định (safe state).',
    7, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_099', 'short-answer', 'robot-control',
    'Điền tên viết tắt tiếng Anh của nút dừng khẩn cấp cơ khí bắt buộc phải có trên bàn điều khiển dạy robot (Teach Pendant). (Viết hoa chữ đầu kèm gạch nối)',
    NULL,
    ARRAY['E-Stop', 'E stop']::varchar[],
    'E-Stop ngắt mạch an toàn dừng khẩn cấp.',
    5, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  ),
  (
    'cs_robfun_q_100', 'short-answer', 'robot-control',
    'Điền tên viết tắt của loại robot cộng tác được thiết kế an toàn để làm việc chung với con người. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Cobot', 'Cobots']::varchar[],
    'Cobot là Collaborative Robot.',
    5, 'Robot Safety', 'cs_robotics_fundamentals', 13, 'cs_robfun_10'
  );

COMMIT;
