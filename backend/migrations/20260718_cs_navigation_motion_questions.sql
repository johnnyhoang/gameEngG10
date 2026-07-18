-- SQL migration to seed 100 question bank for cs_navigation_motion (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_navigation_motion (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_navigation_motion';

-- ======================================================================================
-- BÀI GIẢNG 1: Bản đồ chi phí Costmap & Các lớp bản đồ trong ROS2 (cs_navmot_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_001', 'mcq', 'costmap-localization',
    'Bản đồ chi phí (Costmap) được dùng để làm gì trong robot tự hành?',
    ARRAY['Biểu diễn mức độ nguy hiểm chi phí di chuyển của từng khu vực để lập lộ trình không va chạm', 'Đo điện áp của pin', 'Tính toán góc quay của động cơ servo', 'Truyền thông tin mạng DDS'],
    ARRAY['Biểu diễn mức độ nguy hiểm chi phí di chuyển của từng khu vực để lập lộ trình không va chạm']::varchar[],
    'Costmap gán giá trị chi phí từ 0 (trống) đến 254 (vật cản) cho mỗi ô lưới để các planner tìm đường đi an toàn.',
    5, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_002', 'mcq', 'costmap-localization',
    'Sự khác nhau cơ bản giữa Global Costmap và Local Costmap là gì?',
    ARRAY['Global Costmap dùng để lập đường đi dài hạn dựa trên bản đồ tĩnh; Local Costmap di chuyển theo robot để tránh vật cản động thời gian thực', 'Global Costmap có kích thước nhỏ hơn', 'Local Costmap không cập nhật từ LiDAR', 'Global Costmap chạy ở tần số cao hơn'],
    ARRAY['Global Costmap dùng để lập đường đi dài hạn dựa trên bản đồ tĩnh; Local Costmap di chuyển theo robot để tránh vật cản động thời gian thực']::varchar[],
    'Global Costmap bao phủ toàn bộ khu vực hoạt động, còn Local Costmap là cửa sổ trượt (rolling window) quanh robot để phản ứng nhanh với vật cản kề cạnh.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_003', 'mcq', 'costmap-localization',
    'Lớp bản đồ chi phí "Inflation Layer" thực hiện nhiệm vụ gì?',
    ARRAY['Lan tỏa biên của vật cản ra ngoài theo bán kính robot để ngăn robot đi quá sát gây va chạm cơ khí', 'Tăng tốc độ di chuyển của robot', 'Tự động vẽ thêm tường giả', 'Xóa chướng ngại vật tĩnh'],
    ARRAY['Lan tỏa biên của vật cản ra ngoài theo bán kính robot để ngăn robot đi quá sát gây va chạm cơ khí']::varchar[],
    'Inflation layer cộng thêm vùng chi phí đệm xung quanh vật cản, bảo đảm tâm robot không đi vào vùng an toàn này.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_004', 'mcq', 'costmap-localization',
    'Giá trị chi phí tối đa (LETHAL_OBSTACLE = 254) trong hệ thống Costmap biểu thị điều gì?',
    ARRAY['Tọa độ chính xác của chướng ngại vật thực tế, robot tuyệt đối không được đi qua', 'Khu vực trống an toàn tuyệt đối', 'Điểm sạc pin tự động', 'Vị trí của máy chủ trung tâm'],
    ARRAY['Tọa độ chính xác của chướng ngại vật thực tế, robot tuyệt đối không được đi qua']::varchar[],
    'Giá trị 254 biểu thị vật cản cứng đã được kiểm chứng bằng cảm biến, đi qua sẽ gây va chạm tức thì.',
    5, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_005', 'mcq', 'costmap-localization',
    'Lớp bản đồ chi phí "Obstacle Map Layer" thu thập dữ liệu đầu vào chủ yếu từ cảm biến nào?',
    ARRAY['LiDAR hoặc Camera độ sâu (Depth Camera)', 'Encoder động cơ bánh xe', 'Cảm biến dòng điện', 'Bộ thu sóng GPS'],
    ARRAY['LiDAR hoặc Camera độ sâu (Depth Camera)']::varchar[],
    'Obstacle layer cập nhật liên tục tọa độ chướng ngại vật 3D thực tế trước mặt robot.',
    5, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_006', 'mcq', 'costmap-localization',
    'Tại sao lớp lan tỏa Inflation Layer lại giúp tiết kiệm cực lớn tài nguyên tính toán hình học va chạm cho robot?',
    ARRAY['Vì nó cho phép coi robot như một điểm toán học không kích thước di chuyển trên lưới chi phí đã mở rộng vật cản', 'Vì nó tự động tắt camera', 'Vì nó không sử dụng CPU', 'Vì nó giảm kích thước bản đồ'],
    ARRAY['Vì nó cho phép coi robot như một điểm toán học không kích thước di chuyển trên lưới chi phí đã mở rộng vật cản']::varchar[],
    'Nhờ mở rộng vật cản bằng bán kính robot, ta không cần liên tục tính toán khoảng cách va chạm phức tạp từ mọi cạnh cơ thể robot tới vật cản.',
    7, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_007', 'mcq', 'costmap-localization',
    'Chế độ "Rolling Window" của Local Costmap hoạt động thế nào?',
    ARRAY['Bản đồ cục bộ luôn di chuyển theo vị trí robot làm tâm, giữ kích thước cố định để quét vật cản gần', 'Bản đồ tự động quay tròn 360 độ', 'Bản đồ được lưu vĩnh viễn vào ổ cứng', 'Bản đồ tự động phóng to gấp đôi khi đi nhanh'],
    ARRAY['Bản đồ cục bộ luôn di chuyển theo vị trí robot làm tâm, giữ kích thước cố định để quét vật cản gần']::varchar[],
    'Rolling Window giải phóng bộ nhớ của các vùng robot đã đi qua, chỉ tập trung tài nguyên vào vùng va chạm tức thời.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_008', 'mcq', 'costmap-localization',
    'Trong Costmap, giá trị đặc biệt `NO_INFORMATION` (bằng 255) biểu thị điều gì?',
    ARRAY['Vùng bản đồ chưa được robot thám hiểm, chưa có thông tin cảm biến', 'Vật cản tĩnh cố định', 'Điểm đích đến mong muốn', 'Lỗi nghiêm trọng của cảm biến'],
    ARRAY['Vùng bản đồ chưa được robot thám hiểm, chưa có thông tin cảm biến']::varchar[],
    'Giá trị 255 biểu thị vùng sương mù (fog of war) chưa được khám phá.',
    5, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_009', 'short-answer', 'costmap-localization',
    'Điền tên tiếng Anh của lớp bản đồ chi phí thực hiện nhiệm vụ lan tỏa biên vật cản ra ngoài. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['inflation layer', 'inflation']::varchar[],
    'Inflation Layer lan tỏa chi phí.',
    5, 'Navigation & Motion', 'cs_robotics_fundamentals', 13, 'cs_navmot_01'
  ),
  (
    'cs_navmot_q_010', 'short-answer', 'costmap-localization',
    'Điền giá trị chi phí tối đa biểu thị vật cản cứng trong lưới Costmap. (Điền số)',
    NULL,
    ARRAY['254']::varchar[],
    'Giá trị 254 là LETHAL_OBSTACLE.',
    5, 'Navigation & Motion', 'cs_robotics_fundamentals', 13, 'cs_navmot_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Định vị thích nghi Monte Carlo (cs_navmot_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_011', 'mcq', 'costmap-localization',
    'Thuật toán AMCL định vị vị trí robot dựa trên phương pháp toán học lọc nào?',
    ARRAY['Lọc hạt (Particle Filter)', 'Lọc thông cao High-pass Filter', 'Bộ điều khiển PID', 'Q-Learning'],
    ARRAY['Lọc hạt (Particle Filter)']::varchar[],
    'AMCL sử dụng thuật toán lọc hạt Monte Carlo để ước lượng phân bố xác suất vị trí robot.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_012', 'mcq', 'costmap-localization',
    'Mỗi "hạt" (particle) trong thuật toán AMCL lưu trữ thông tin gì?',
    ARRAY['Một giả thuyết vị trí khả thi của robot (x, y, góc theta) kèm trọng số tin cậy', 'Tốc độ quay của động cơ bánh xe', 'Mã số ID của các trạm mốc UWB', 'Độ phân giải của camera depth'],
    ARRAY['Một giả thuyết vị trí khả thi của robot (x, y, góc theta) kèm trọng số tin cậy']::varchar[],
    'Mỗi hạt đại diện cho một vị trí trạng thái khả thi của robot trên bản đồ.',
    5, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_013', 'mcq', 'costmap-localization',
    'Trong bước "Dự báo" (Prediction) của AMCL, các hạt được dịch chuyển dựa trên thông tin nào?',
    ARRAY['Mô hình Odometry chuyển động của bánh xe cộng thêm sai số nhiễu ngẫu nhiên', 'Dữ liệu quét trực tiếp của LiDAR', 'Lệnh điều khiển từ máy chủ trung tâm', 'Lực hấp dẫn Trái Đất'],
    ARRAY['Mô hình Odometry chuyển động của bánh xe cộng thêm sai số nhiễu ngẫu nhiên']::varchar[],
    'Odometry ước lượng vị trí đi tiếp của các hạt trước khi hiệu chỉnh bằng cảm biến ngoài.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_014', 'mcq', 'costmap-localization',
    'Trong bước "Hiệu chỉnh" (Update) của AMCL, trọng số tin cậy của mỗi hạt được tính toán lại dựa trên tiêu chí nào?',
    ARRAY['Độ tương đồng giữa tia quét LiDAR thực tế và tia quét giả thuyết bắn từ vị trí của hạt đó trên bản đồ', 'Tốc độ CPU xử lý hạt', 'Khoảng cách từ hạt tới đích đến', 'Độ lớn của dòng điện sạc pin'],
    ARRAY['Độ similarity giữa tia quét LiDAR thực tế và tia quét giả thuyết bắn từ vị trí của hạt đó trên bản đồ', 'Độ tương đồng giữa tia quét LiDAR thực tế và tia quét giả thuyết bắn từ vị trí của hạt đó trên bản đồ']::varchar[],
    'Hạt ở vị trí càng khớp với hình dáng tường quét thực tế sẽ nhận trọng số tin cậy càng cao.',
    7, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_015', 'mcq', 'costmap-localization',
    'Mục tiêu của bước "Tái chọn mẫu" (Resampling) trong AMCL là gì?',
    ARRAY['Loại bỏ các hạt có trọng số thấp (giả thuyết sai) và nhân bản các hạt có trọng số cao (giả thuyết đúng)', 'Đổi chiều quay bánh xe', 'Tăng số lượng hạt lên vô hạn', 'Tải lại tệp bản đồ tĩnh từ bộ nhớ'],
    ARRAY['Loại bỏ các hạt có trọng số thấp (giả thuyết sai) và nhân bản các hạt có trọng số cao (giả thuyết đúng)']::varchar[],
    'Tái chọn mẫu giúp tập trung đám mây hạt vào các vùng có khả năng cao nhất chứa robot.',
    6, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_016', 'mcq', 'costmap-localization',
    'Thuộc tính "Thích nghi" (Adaptive) của AMCL thể hiện ở hành vi nào?',
    ARRAY['Tự động điều chỉnh số lượng hạt: rải nhiều hạt khi robot bị lạc đường để tìm kiếm, và co hẹp ít hạt khi robot đã định vị rõ để tiết kiệm CPU', 'Tự thay đổi tốc độ xe', 'Tự hiệu chỉnh góc lái trục trước', 'Tự động bật đèn chiếu sáng'],
    ARRAY['Tự động điều chỉnh số lượng hạt: rải nhiều hạt khi robot bị lạc đường để tìm kiếm, và co hẹp ít hạt khi robot đã định vị rõ để tiết kiệm CPU']::varchar[],
    'KLD-sampling thích nghi số lượng hạt dựa trên độ hội tụ của đám mây hạt.',
    7, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_017', 'mcq', 'costmap-localization',
    'Thử thách "Bắt cóc robot" (Kidnapped Robot Problem) kiểm tra tính năng gì của thuật toán định vị?',
    ARRAY['Khả năng tự động phát hiện sai lệch và tái định vị toàn cục khi robot đột ngột bị nhấc sang vị trí khác chưa biết', 'Khả năng tránh trộm cướp robot', 'Khả năng chạy pin dự phòng', 'Tính năng khóa cứng bánh xe'],
    ARRAY['Khả năng tự động phát hiện sai lệch và tái định vị toàn cục khi robot đột ngột bị nhấc sang vị trí khác chưa biết']::varchar[],
    'Khi sai số giữa LiDAR quét và bản đồ đột ngột quá lớn, AMCL tự động rải lại hạt ngẫu nhiên (recovery) để tìm vị trí mới.',
    7, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_018', 'mcq', 'costmap-localization',
    'Hàm mật độ xác suất đo đạc LiDAR trong AMCL thường sử dụng mô hình nào để chịu được nhiễu do vật cản động đi qua?',
    ARRAY['Likelihood Field Model (Mô hình trường khả trị)', 'Mô hình chuyển vị ma trận', 'Mạng neuron tích chập CNN', 'Bộ biến đổi Wavelet'],
    ARRAY['Likelihood Field Model (Mô hình trường khả trị)']::varchar[],
    'Likelihood Field tính khoảng cách từ điểm quét laser tới chướng ngại vật tĩnh gần nhất trên bản đồ, bền bỉ hơn mô hình tia quét (Ray-casting model).',
    7, 'Navigation & Motion', 'cs_navigation_motion', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_019', 'short-answer', 'costmap-localization',
    'Điền tên viết tắt tiếng Anh của thuật toán định vị thích nghi Monte Carlo. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AMCL']::varchar[],
    'AMCL là Adaptive Monte Carlo Localization.',
    5, 'Navigation & Motion', 'cs_robotics_fundamentals', 13, 'cs_navmot_02'
  ),
  (
    'cs_navmot_q_020', 'short-answer', 'costmap-localization',
    'Phương pháp lọc toán học làm nền tảng cho AMCL có tên tiếng Anh là gì? (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['particle filter', 'lọc hạt']::varchar[],
    'Particle Filter là bộ lọc hạt.',
    5, 'Navigation & Motion', 'cs_robotics_fundamentals', 13, 'cs_navmot_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Mô hình động học xe: Mô hình xe đạp & Lái Ackermann (cs_navmot_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_021', 'mcq', 'kinematic-models',
    'Cơ cấu lái Ackermann quy định điều gì đối với góc lái của 2 bánh trước dẫn hướng khi xe đi vào đường cong?',
    ARRAY['Bánh xe phía trong cua phải quay góc lớn hơn bánh xe phía ngoài để tránh trượt lốp', 'Hai bánh trước phải quay góc bằng nhau tuyệt đối', 'Bánh ngoài cua phải quay góc lớn hơn', 'Hai bánh trước phải quay ngược chiều nhau'],
    ARRAY['Bánh xe phía trong cua phải quay góc lớn hơn bánh xe phía ngoài để tránh trượt lốp']::varchar[],
    'Vì bánh trong đi trên cung tròn có bán kính nhỏ hơn bánh ngoài, cơ cấu liên kết lái Ackermann bảo đảm hai bánh dẫn hướng đồng tâm quay.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_022', 'mcq', 'kinematic-models',
    'Mô hình xe đạp (Bicycle Model) đơn giản hóa cơ cấu lái Ackermann bằng cách nào?',
    ARRAY['Gộp hai bánh trước thành 1 bánh ảo ở giữa và hai bánh sau thành 1 bánh ảo ở giữa', 'Loại bỏ hoàn toàn bánh xe phía sau', 'Robot chỉ sử dụng 1 bánh xe duy nhất', 'Biến xe Ackermann thành xe vi sai'],
    ARRAY['Gộp hai bánh trước thành 1 bánh ảo ở giữa và hai bánh sau thành 1 bánh ảo ở giữa']::varchar[],
    'Mô hình xe đạp giữ đầy đủ tính chất phi tuyến non-holonomic của Ackermann nhưng giảm số lượng biến liên kết cơ học.',
    5, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_023', 'mcq', 'kinematic-models',
    'Trong phương pháp mô hình xe đạp, đại lượng L (wheelbase) biểu thị khoảng cách nào?',
    ARRAY['Khoảng cách dọc giữa trục trước và trục sau', 'Chiều rộng của thân xe', 'Đường kính của bánh xe', 'Khoảng cách từ xe tới điểm nhìn trước'],
    ARRAY['Khoảng cách dọc giữa trục trước và trục sau']::varchar[],
    'Wheelbase L là khoảng cách trục cơ sở của xe.',
    5, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_024', 'mcq', 'kinematic-models',
    'Tâm quay tức thời ICC (Instantaneous Center of Curvature) của xe lái Ackermann nằm ở giao điểm của các đường thẳng nào?',
    ARRAY['Đường kéo dài của trục bánh sau và đường vuông góc vuông góc với bánh lái trước', 'Giao điểm hai đường chéo thân xe', 'Trùng với trọng tâm xe', 'Nằm ở vô cực'],
    ARRAY['Đường kéo dài của trục bánh sau và đường vuông góc vuông góc với bánh lái trước']::varchar[],
    'Tất cả các bánh xe lăn không trượt quanh tâm quay chung ICC.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_025', 'mcq', 'kinematic-models',
    'Tại sao xe lái Ackermann/xe đạp không thể xoay đầu tại chỗ như xe vi sai (Differential drive)?',
    ARRAY['Vì góc lái của bánh dẫn hướng bị giới hạn cơ học cơ học (bán kính quay vòng tối thiểu luôn lớn hơn 0)', 'Vì xe Ackermann quá nặng', 'Vì xe Ackermann không đi lùi được', 'Vì driver động cơ không hỗ trợ đảo chiều'],
    ARRAY['Vì góc lái của bánh dẫn hướng bị giới hạn cơ học cơ học (bán kính quay vòng tối thiểu luôn lớn hơn 0)']::varchar[],
    'Xe Ackermann có bán kính quay vòng R = L / tan(phi), phi bị giới hạn góc tối đa vật lý (thường khoảng 30-40 độ).',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_026', 'mcq', 'kinematic-models',
    'Phương trình vi phân góc hướng xe \\(\\dot{\\theta}\\) của mô hình xe đạp là gì?',
    ARRAY['\\(\\dot{\\theta} = \\frac{v}{L} \\tan\\phi\\)', '\\(\\dot{\\theta} = v \\cos\\phi\\)', '\\(\\dot{\\theta} = \\frac{v}{b}\\)', '\\(\\dot{\\theta} = \\omega\\)'],
    ARRAY['\\(\\dot{\\theta} = \\frac{v}{L} \\tan\\phi\\)']::varchar[],
    'Tốc độ thay đổi hướng xe tỷ lệ thuận với vận tốc tiến v, tang của góc lái phi và tỷ lệ nghịch với wheelbase L.',
    7, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_027', 'mcq', 'kinematic-models',
    'Điểm tham chiếu tọa độ (x, y) của mô hình xe đạp thường được đặt ở vị trí nào để đơn giản hóa phương trình động học?',
    ARRAY['Tâm của trục sau', 'Tâm của trục trước', 'Trọng tâm xe CoG', 'Góc trước bên trái xe'],
    ARRAY['Tâm của trục sau']::varchar[],
    'Đặt ở trục sau giúp triệt tiêu thành phần vận tốc trượt ngang tức thời do bánh sau không dẫn hướng (v_y = 0).',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_028', 'mcq', 'kinematic-models',
    'Khi robot xe đạp lùi xe, dấu của vận tốc v trong phương trình động học thay đổi như thế nào?',
    ARRAY['Vận tốc v nhận giá trị âm (v < 0)', 'Vận tốc v giữ nguyên dương', 'Góc lái phi tự động đảo ngược dấu', 'Phương trình động học trở nên tuyến tính'],
    ARRAY['Vận tốc v nhận giá trị âm (v < 0)']::varchar[],
    'Vận tốc âm đại diện cho hướng đi lùi dọc theo thân xe.',
    5, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_029', 'short-answer', 'kinematic-models',
    'Điền tên cơ cấu cơ khí liên kết hệ bánh lái của ô tô giúp các bánh dẫn hướng lăn không trượt quanh tâm quay chung. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Ackermann', 'Lái ackermann']::varchar[],
    'Ackermann steering là cơ cấu lái tiêu chuẩn.',
    5, 'Kinematic Models', 'cs_robotics_fundamentals', 13, 'cs_navmot_03'
  ),
  (
    'cs_navmot_q_030', 'short-answer', 'kinematic-models',
    'Điền tên mô hình đơn giản hóa cơ cấu lái Ackermann bằng cách chập các bánh xe trên cùng trục thành một bánh ảo. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['mô hình xe đạp', 'xe đạp', 'bicycle model']::varchar[],
    'Bicycle model là mô hình xe đạp.',
    5, 'Kinematic Models', 'cs_robotics_fundamentals', 13, 'cs_navmot_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Bộ điều khiển bám đường hình học: Pure Pursuit (cs_navmot_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_031', 'mcq', 'path-tracking',
    'Ý tưởng cốt lõi của thuật toán bám đường Pure Pursuit là gì?',
    ARRAY['Tính toán bán kính cung tròn nối từ robot đến một điểm nhìn trước (Look-ahead point) nằm trên đường đi mong muốn', 'Giải phương trình vi phân PID', 'Đo khoảng cách tới tường gần nhất bằng siêu âm', 'Tối ưu hóa năng lượng tiêu thụ bằng học máy'],
    ARRAY['Tính toán bán kính cung tròn nối từ robot đến một điểm nhìn trước (Look-ahead point) nằm trên đường đi mong muốn']::varchar[],
    'Pure Pursuit liên tục "đuổi theo" một điểm mục tiêu ảo phía trước robot.',
    5, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_032', 'mcq', 'path-tracking',
    'Đại lượng L_d (Look-ahead distance) biểu thị điều gì?',
    ARRAY['Khoảng cách nhìn trước cố định từ robot tới điểm mục tiêu trên đường đi', 'Chiều dài của toàn bộ quãng đường', 'Bán kính quay vòng của bánh xe', 'Khoảng cách từ xe tới vật cản gần nhất'],
    ARRAY['Khoảng cách nhìn trước cố định từ robot tới điểm mục tiêu trên đường đi']::varchar[],
    'Look-ahead distance L_d là tham số thiết kế cốt lõi của Pure Pursuit.',
    5, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_033', 'mcq', 'path-tracking',
    'Tác động của việc chọn khoảng cách nhìn trước L_d quá nhỏ là gì?',
    ARRAY['Robot bám sát cua nhưng dễ bị dao động uốn lượn hình rắn (nhạy cảm với sai số)', 'Robot di chuyển quá mượt', 'Góc lái lái tiến về 0', 'Robot tự động dừng lại'],
    ARRAY['Robot bám sát cua nhưng dễ bị dao động uốn lượn hình rắn (nhạy cảm với sai số)']::varchar[],
    'L_d nhỏ làm tăng hệ số khuếch đại phản hồi, gây vọt lố qua lại quanh đường thẳng.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_034', 'mcq', 'path-tracking',
    'Tác động của việc chọn khoảng cách nhìn trước L_d quá lớn là gì?',
    ARRAY['Robot di chuyển mượt mà nhưng dễ bị cắt góc cua lớn (sai số bám đường tăng ở góc cua gắt)', 'Động cơ bị quá tải dòng', 'Bánh xe bị trượt bánh hoàn toàn', 'Robot đi lùi ngược chiều'],
    ARRAY['Robot di chuyển mượt mà nhưng dễ bị cắt góc cua lớn (sai số bám đường tăng ở góc cua gắt)']::varchar[],
    'L_d lớn làm robot "lười" phản ứng với cua gắt, xe bo cua rộng cắt góc.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_035', 'mcq', 'path-tracking',
    'Để robot di chuyển mượt ở cả tốc độ thấp và cao, khoảng cách nhìn trước L_d thường được lập trình biến đổi như thế nào?',
    ARRAY['Tỷ lệ thuận với vận tốc tiến của robot (L_d = k * v)', 'Tỷ lệ nghịch với vận tốc', 'Giữ cố định tuyệt đối ở mọi dải tốc độ', 'Biến thiên ngẫu nhiên'],
    ARRAY['Tỷ lệ thuận với vận tốc tiến của robot (L_d = k * v)']::varchar[],
    'Tốc độ nhanh cần nhìn xa để xe cua mượt; tốc độ chậm cần nhìn gần để xe bám cua chính xác.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_036', 'mcq', 'path-tracking',
    'Góc \\(\\alpha\\) trong công thức góc lái Pure Pursuit là góc lệch giữa các hướng nào?',
    ARRAY['Hướng đầu xe và vector nối từ xe tới điểm nhìn trước look-ahead', 'Trục dọc và trục ngang xe', 'Đường line ảo và vách tường', 'Trục bánh trước và trục bánh sau'],
    ARRAY['Hướng đầu xe và vector nối từ xe tới điểm nhìn trước look-ahead']::varchar[],
    'Góc alpha đo độ lệch hướng trực tiếp của xe so với điểm mục tiêu.',
    5, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_037', 'mcq', 'path-tracking',
    'Điểm tham chiếu hình học (gốc tính L_d) trên robot của thuật toán Pure Pursuit thường được đặt ở đâu?',
    ARRAY['Tâm của trục sau', 'Tâm của trục trước', 'Đầu xe', 'Trọng tâm robot'],
    ARRAY['Tâm của trục sau']::varchar[],
    'Pure Pursuit cổ điển đo khoảng cách từ tâm trục sau tới điểm look-ahead.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_038', 'mcq', 'path-tracking',
    'Khi robot đi chệch hẳn ra ngoài đường đi mong muốn một khoảng cách lớn hơn L_d, Pure Pursuit xử lý như thế nào?',
    ARRAY['Tìm điểm gần nhất trên đường đi làm look-ahead tạm thời để kéo robot quay lại', 'Robot lập tức báo lỗi dừng lại', 'Robot đi ngẫu nhiên', 'Tăng tốc độ tối đa'],
    ARRAY['Tìm điểm gần nhất trên đường đi làm look-ahead tạm thời để kéo robot quay lại']::varchar[],
    'Cơ chế fallback chiếu tọa độ robot xuống đường đi để kéo robot quay về tầm bám L_d.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_039', 'short-answer', 'path-tracking',
    'Điền tên bộ điều khiển bám đường hình học kinh điển. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['pure pursuit']::varchar[],
    'Pure Pursuit là bộ điều khiển bám đường hình học.',
    5, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_04'
  ),
  (
    'cs_navmot_q_040', 'short-answer', 'path-tracking',
    'Khoảng cách nhìn trước L_d tỉ lệ thuận với đại lượng nào của robot để tăng độ mượt? (Viết thường)',
    NULL,
    ARRAY['vận tốc', 'tốc độ', 'velocity', 'speed']::varchar[],
    'L_d thường tỷ lệ thuận với vận tốc v.',
    5, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Bộ điều khiển Stanley cho xe tự hành (cs_navmot_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_041', 'mcq', 'path-tracking',
    'Thuật toán Stanley đo đạc sai số bám đường tại vị trí vật lý nào của xe?',
    ARRAY['Trục trước', 'Trục sau', 'Trọng tâm xe CoG', 'Gá sạc pin'],
    ARRAY['Trục trước']::varchar[],
    'Khác với Pure Pursuit (trục sau), Stanley tính toán sai số ngang và sai số hướng trực tiếp tại tâm trục trước.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_042', 'mcq', 'path-tracking',
    'Hai thành phần sai số đầu vào cốt lõi của bộ điều khiển Stanley là gì?',
    ARRAY['Sai số hướng (heading error) và Sai số ngang (cross-track error)', 'Sai số tốc độ và sai số dòng điện', 'Sai số D-H và sai số lốp', 'Sai số gia tốc và sai số LiDAR'],
    ARRAY['Sai số hướng (heading error) và Sai số ngang (cross-track error)']::varchar[],
    'Stanley xử lý đồng thời góc lệch hướng của xe so với đường thẳng và khoảng cách lệch vuông góc từ trục trước tới đường.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_043', 'mcq', 'path-tracking',
    'Luật điều khiển Stanley triệt tiêu sai số ngang e_y bằng hàm lượng giác ngược nào?',
    ARRAY['arctan', 'arcsin', 'arccos', 'sinh'],
    ARRAY['arctan']::varchar[],
    'Stanley dùng hàm arctan(k * e_y / v) để giới hạn góc bẻ lái trục trước không vượt quá 90 độ khi lệch lớn.',
    5, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_044', 'mcq', 'path-tracking',
    'Hành vi bẻ lái của Stanley khi xe chạy rất nhanh và có sai số ngang lớn là gì?',
    ARRAY['Tự động giảm góc bẻ lái để tránh lật xe và giảm hiện tượng bẻ lái đột ngột ở tốc độ cao', 'Tăng tối đa góc lái lập tức', 'Đứng im phanh cứng', 'Tự động đảo chiều quay bánh'],
    ARRAY['Tự động giảm góc bẻ lái để tránh lật xe và giảm hiện tượng bẻ lái đột ngột ở tốc độ cao']::varchar[],
    'Vận tốc v nằm ở mẫu số của hàm arctan giúp giảm độ nhạy của sai số ngang khi đi nhanh, bảo đảm an toàn động lực học.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_045', 'mcq', 'path-tracking',
    'Tham số k trong luật điều khiển Stanley đóng vai trò gì?',
    ARRAY['Hệ số khuếch đại điều khiển xác định tốc độ sửa lỗi sai số ngang', 'Khoảng cách trục cơ sở L', 'Đường kính bánh xe', 'Bước thời gian tích phân dt'],
    ARRAY['Hệ số khuếch đại điều khiển xác định tốc độ sửa lỗi sai số ngang']::varchar[],
    'k lớn giúp xe bám sát đường đi nhanh hơn nhưng dễ gây rung giật lái; k nhỏ giúp lái êm hơn nhưng chậm sửa lỗi lệch ngang.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_046', 'mcq', 'path-tracking',
    'Tại sao Stanley không bị hiện tượng cắt góc cua lớn (cutting corners) ở vận tốc cao như Pure Pursuit?',
    ARRAY['Vì Stanley liên tục đo đạc và phản hồi trực tiếp sai số ngang tức thời ngay tại trục dẫn hướng trước', 'Vì Stanley chỉ dùng cho xe 4 bánh', 'Vì Stanley chạy trên máy chủ đám mây', 'Vì Stanley sử dụng động cơ bước'],
    ARRAY['Vì Stanley liên tục đo đạc và phản hồi trực tiếp sai số ngang tức thời ngay tại trục dẫn hướng trước']::varchar[],
    'Phản hồi sai số ngang trực tiếp tại bánh dẫn hướng bắt buộc bánh xe luôn hướng bám sát đường đi thực tế.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_047', 'mcq', 'path-tracking',
    'Để phòng tránh lỗi chia cho 0 khi xe đứng im hoàn toàn (v = 0), công thức Stanley được cải tiến như thế nào?',
    ARRAY['Thêm hằng số nhỏ \\(\\epsilon\\) vào mẫu số: arctan(k * e_y / (v + \\(\\epsilon\\)))', 'Đặt góc lái bằng 0', 'Tự động gán v = 1', 'Tắt thuật toán Stanley'],
    ARRAY['Thêm hằng số nhỏ \\(\\epsilon\\) vào mẫu số: arctan(k * e_y / (v + \\(\\epsilon\\)))']::varchar[],
    'Hằng số làm mượt (smoothing parameter) tránh mẫu số bằng 0 và giảm dao động của góc lái khi xe đi cực chậm.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_048', 'mcq', 'path-tracking',
    'Thuật toán Stanley chứng minh được tính chất ổn định toán học nào?',
    ARRAY['Ổn định tiệm cận toàn cục (Globally Asymptotically Stable)', 'Ổn định biên giới', 'Kém ổn định động lực', 'Luôn luôn dao động tuần hoàn'],
    ARRAY['Ổn định tiệm cận toàn cục (Globally Asymptotically Stable)']::varchar[],
    'Chứng minh Lyapunov bảo đảm sai số ngang và sai số hướng sẽ hội tụ về 0 theo thời gian từ mọi trạng thái lệch ban đầu.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_049', 'short-answer', 'path-tracking',
    'Điền tên bộ điều khiển bám đường đo sai số tại trục trước của đại học Stanford. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Stanley', 'Bộ điều khiển stanley']::varchar[],
    'Stanley controller được dùng cho xe tự lái.',
    5, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_05'
  ),
  (
    'cs_navmot_q_050', 'short-answer', 'path-tracking',
    'Sai số ngang (cross-track error) trong Stanley kí hiệu là gì? (Viết thường kèm gạch dưới nếu cần)',
    NULL,
    ARRAY['e_y', 'ey']::varchar[],
    'e_y là khoảng cách lệch ngang từ xe tới đường.',
    5, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Bộ điều khiển dự báo mô hình (Model Predictive Control - MPC) (cs_navmot_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_051', 'mcq', 'path-tracking',
    'Cơ chế "Dự báo" của bộ điều khiển MPC hoạt động thế nào?',
    ARRAY['Sử dụng mô hình toán học của robot để ước lượng các trạng thái tương lai trong khoảng thời gian N bước tiếp theo', 'Dự báo thời tiết ngoài trời', 'Dự đoán dung lượng pin sạc', 'Dự báo hướng di chuyển của vật cản động'],
    ARRAY['Sử dụng mô hình toán học của robot để ước lượng các trạng thái tương lai trong khoảng thời gian N bước tiếp theo']::varchar[],
    'MPC sử dụng mô hình hệ thống để mô phỏng phản ứng của robot trước khi thực sự gửi lệnh.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_052', 'mcq', 'path-tracking',
    'Cơ chế "Horizon trượt" (Receding Horizon) trong MPC thực hiện việc gì?',
    ARRAY['Giải bài toán tối ưu cho chuỗi lệnh N bước, nhưng chỉ gửi lệnh đầu tiên đi thực hiện, ở chu kỳ sau lặp lại toàn bộ quá trình', 'Chỉ chạy robot theo hướng ngang', 'Giữ cố định chuỗi lệnh điều khiển mãi mãi', 'Tự động dịch chuyển đích đến'],
    ARRAY['Giải bài toán tối ưu cho chuỗi lệnh N bước, nhưng chỉ gửi lệnh đầu tiên đi thực hiện, ở chu kỳ sau lặp lại toàn bộ quá trình']::varchar[],
    'Horizon trượt giúp robot cập nhật phản hồi sai số thực tế liên tục, tăng độ bền bỉ chống nhiễu.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_053', 'mcq', 'path-tracking',
    'Ưu thế nổi bật nhất của MPC so với các bộ điều khiển phản hồi cổ điển (như PID, LQR) là gì?',
    ARRAY['Khả năng tích hợp trực tiếp các ràng buộc vật lý (như góc lái cực đại, gia tốc tối đa) vào bài toán tối ưu thời gian thực', 'Đòi hỏi cấu hình phần cứng siêu rẻ', 'Không cần biết mô hình toán của robot', 'Độ trễ tính toán luôn bằng 0'],
    ARRAY['Khả năng tích hợp trực tiếp các ràng buộc vật lý (như góc lái cực đại, gia tốc tối đa) vào bài toán tối ưu thời gian thực']::varchar[],
    'MPC giải bài toán tối ưu ràng buộc, bảo đảm tín hiệu điều khiển không vượt ngưỡng bão hòa vật lý.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_054', 'mcq', 'path-tracking',
    'Hàm chi phí (Cost function) của MPC thường tối thiểu hóa các mục tiêu nào?',
    ARRAY['Sai số bám quỹ đạo tương lai và năng lượng tiêu thụ (độ lớn tín hiệu điều khiển)', 'Tốc độ CPU chạy code', 'Số lượng trạm sạc pin', 'Kích thước tệp bản đồ costmap'],
    ARRAY['Sai số bám quỹ đạo tương lai và năng lượng tiêu thụ (độ lớn tín hiệu điều khiển)']::varchar[],
    'MPC cân bằng giữa độ chính xác bám quỹ đạo và sự êm dịu, tiết kiệm điện năng của cơ cấu chấp hành.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_055', 'mcq', 'path-tracking',
    'Dạng bài toán toán học nào thường phải giải quyết ở mỗi chu kỳ của MPC tuyến tính có ràng buộc?',
    ARRAY['Lập trình bình phương (Quadratic Programming - QP)', 'Biến đổi Fourier nhanh', 'Tìm đường đi ngắn nhất Dijkstra', 'Hồi quy tuyến tính đơn giản'],
    ARRAY['Lập trình bình phương (Quadratic Programming - QP)']::varchar[],
    'MPC tuyến tính tối thiểu hóa hàm chi phí bậc hai với ràng buộc tuyến tính (QP solver), giải cực nhanh trong vài mili-giây.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_056', 'mcq', 'path-tracking',
    'Nhược điểm lớn nhất ngăn cản việc sử dụng MPC trên các vi điều khiển nhúng 8-bit rẻ tiền là gì?',
    ARRAY['Đòi hỏi năng lực tính toán toán học ma trận lớn để giải bài toán tối ưu lặp thời gian thực', 'MPC tiêu hao quá nhiều điện năng của pin', 'MPC bắt buộc phải có hệ thống làm mát bằng nước', 'Không hỗ trợ giao tiếp qua bluetooth'],
    ARRAY['Đòi hỏi năng lực tính toán toán học ma trận lớn để giải bài toán tối ưu lặp thời gian thực']::varchar[],
    'Giải QP solver đòi hỏi máy tính nhúng 32-bit tốc độ cao hoặc có bộ tăng tốc chuyên biệt.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_057', 'mcq', 'path-tracking',
    'Điều gì xảy ra nếu mô hình toán học của robot nạp vào MPC bị sai lệch nhiều so với thực tế (ví dụ khối lượng thay đổi)?',
    ARRAY['Chất lượng điều khiển bị giảm sút, robot có thể bị dao động hoặc lệch quỹ đạo bám', 'Robot tự động dừng lại báo lỗi', 'MPC tự động sửa mô hình hình học', 'Không có ảnh hưởng gì'],
    ARRAY['Chất lượng điều khiển bị giảm sút, robot có thể bị dao động hoặc lệch quỹ đạo bám']::varchar[],
    'MPC là bộ điều khiển dựa trên mô hình (Model-based), mô hình sai làm sai lệch dự báo tương lai.',
    6, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_058', 'mcq', 'path-tracking',
    'Horizon dự báo N (Prediction Horizon) lớn mang lại lợi ích gì?',
    ARRAY['Robot nhìn xa hơn về tương lai giúp đi mượt hơn ở cua và tự chuẩn bị giảm tốc độ sớm trước vật cản', 'Tiết kiệm CPU tính toán', 'Làm bánh xe bám đường tốt hơn', 'Giảm sai số D-H của khớp'],
    ARRAY['Robot nhìn xa hơn về tương lai giúp đi mượt hơn ở cua và tự chuẩn bị giảm tốc độ sớm trước vật cản']::varchar[],
    'N lớn tăng tầm nhìn tối ưu của robot nhưng làm tăng kích thước ma trận QP cần giải ở mỗi chu kỳ.',
    7, 'Path Tracking', 'cs_navigation_motion', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_059', 'short-answer', 'path-tracking',
    'Điền tên viết tắt tiếng Anh của bộ điều khiển dự báo mô hình. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MPC']::varchar[],
    'MPC là Model Predictive Control.',
    5, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_06'
  ),
  (
    'cs_navmot_q_060', 'short-answer', 'path-tracking',
    'Giải MPC tuyến tính đòi hỏi giải bài toán tối ưu lập trình nào? (Viết tắt 2 chữ cái viết hoa)',
    NULL,
    ARRAY['QP']::varchar[],
    'QP là Quadratic Programming.',
    6, 'Path Tracking', 'cs_robotics_fundamentals', 13, 'cs_navmot_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Mô hình Odometry bánh xe & Tính toán sai số tích phân (cs_navmot_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_061', 'mcq', 'kinematic-models',
    'Odometry bánh xe tính toán vị trí robot dựa trên thông tin từ cảm biến nào?',
    ARRAY['Encoder quang xoay đo vòng quay bánh xe', 'Bộ thu sóng GPS ngoài trời', 'Quét tia laser của LiDAR', 'Mạch đo dòng điện động cơ'],
    ARRAY['Encoder quang xoay đo vòng quay bánh xe']::varchar[],
    'Odometry bánh xe tính góc quay bánh xe để suy ra quãng đường tịnh tiến của từng bánh.',
    5, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_062', 'mcq', 'kinematic-models',
    'Đặc trưng nguy hiểm nhất của sai số định vị bằng Odometry là gì?',
    ARRAY['Sai số tích lũy (drift) tăng vô hạn theo thời gian và quãng đường di chuyển', 'Sai số luôn bằng 0', 'Sai số tự động giảm về 0 sau 1 phút', 'Làm hỏng bánh răng cơ khí'],
    ARRAY['Sai số tích lũy (drift) tăng vô hạn theo thời gian và quãng đường di chuyển']::varchar[],
    'Vì là phép tính tích phân cộng dồn vi sai, mọi sai lệch nhỏ ở mỗi bước thời gian sẽ lũy kế phình to.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_063', 'mcq', 'kinematic-models',
    'Hiện tượng trượt bánh (Wheel slip) gây tác động thế nào đến kết quả tính Odometry?',
    ARRAY['Làm bánh xe quay nhưng robot không dịch chuyển thực tế, gây sai lệch lớn giữa tọa độ tính toán và tọa độ thực', 'Giúp robot đi nhanh hơn', 'Triệt tiêu hoàn toàn sai số hệ thống', 'Tự động reset vị trí về gốc'],
    ARRAY['Làm bánh xe quay nhưng robot không dịch chuyển thực tế, gây sai lệch lớn giữa tọa độ tính toán và tọa độ thực']::varchar[],
    'Trượt bánh làm encoder ghi nhận số vòng quay nhưng thực chất robot đứng yên hoặc trượt ngang, làm odometry bị sai nặng.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_064', 'mcq', 'kinematic-models',
    'Tại sao việc hiệu chuẩn Odometry (Odometry Calibration) lại bắt buộc trước khi đưa robot vào hoạt động?',
    ARRAY['Để đo đạc chính xác đường kính thực tế của bánh xe và khoảng cách trục b để giảm sai số hệ thống', 'Để tăng mô-men xoắn của động cơ', 'Để nạp bản đồ costmap', 'Để đăng ký địa chỉ IP'],
    ARRAY['Để đo đạc chính xác đường kính thực tế của bánh xe và khoảng cách trục b để giảm sai số hệ thống']::varchar[],
    'Sai lệch cơ khí sản xuất (ví dụ đường kính bánh lệch 1mm) sẽ tạo ra sai số góc cua lớn sau vài vòng lăn.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_065', 'mcq', 'kinematic-models',
    'Để tính toán quãng đường tịnh tiến của tâm robot vi sai, ta lấy trung bình cộng quãng đường đi được của 2 bánh xe. Công thức tương ứng là gì?',
    ARRAY['\\(ds = \\frac{ds_R + ds_L}{2}\\)', '\\(ds = ds_R - ds_L\\)', '\\(ds = ds_R \\times ds_L\\)', '\\(ds = \\sqrt{ds_R^2 + ds_L^2}\\)'],
    ARRAY['\\(ds = \\frac{ds_R + ds_L}{2}\\)']::varchar[],
    'Quãng đường đi của tâm robot vi sai bằng trung bình cộng quãng đường đi của bánh trái và bánh phải.',
    5, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_066', 'mcq', 'kinematic-models',
    'Để tính toán góc xoay hướng \\(d\\theta\\) của robot vi sai, công thức nào sau đây là đúng?',
    ARRAY['\\(d\\theta = \\frac{ds_R - ds_L}{b}\\) (với b là khoảng cách hai bánh)', '\\(d\\theta = ds_R + ds_L\\)', '\\(d\\theta = \\frac{ds_R \\times ds_L}{b}\\)', '\\(d\\theta = \\arctan(\\frac{ds_R}{ds_L})\\)'],
    ARRAY['\\(d\\theta = \\frac{ds_R - ds_L}{b}\\) (với b là khoảng cách hai bánh)']::varchar[],
    'Sự chênh lệch quãng đường giữa bánh phải và bánh trái chia cho wheelbase b tạo ra góc xoay hướng của thân xe.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_067', 'mcq', 'kinematic-models',
    'Tại sao tần số cập nhật dữ liệu của Odometry bánh xe thường rất cao (50Hz - 100Hz)?',
    ARRAY['Để cung cấp dữ liệu phản hồi chuyển động tức thời tốc độ cao cho bộ lọc hợp nhất Kalman EKF', 'Để giảm lượng điện tiêu thụ của encoder', 'Do giới hạn của hệ điều hành Linux', 'Để tăng dung lượng bộ nhớ RAM'],
    ARRAY['Để cung cấp dữ liệu phản hồi chuyển động tức thời tốc độ cao cho bộ lọc hợp nhất Kalman EKF']::varchar[],
    'Odometry tần số cao giúp bám sát các thay đổi gia tốc nhanh của robot trước khi có hiệu chỉnh từ cảm biến laser tần số thấp (10Hz).',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_068', 'mcq', 'kinematic-models',
    'Sai số phi hệ thống (Non-systematic error) của odometry sinh ra từ nguồn nào?',
    ARRAY['Sự trượt bánh ngẫu nhiên trên bề mặt gồ ghề hoặc vấp phải chướng ngại vật nhỏ dưới sàn', 'Đường kính bánh xe bị thiết kế sai lệch', 'Độ lệch khoảng cách trục bánh', 'Độ trễ tín hiệu của dây cáp'],
    ARRAY['Sự trượt bánh ngẫu nhiên trên bề mặt gồ ghề hoặc vấp phải chướng ngại vật nhỏ dưới sàn']::varchar[],
    'Sai số phi hệ thống xuất hiện ngẫu nhiên do môi trường không bằng phẳng, khó bù trừ bằng phần mềm cố định.',
    6, 'Kinematic Models', 'cs_navigation_motion', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_069', 'short-answer', 'kinematic-models',
    'Điền từ chỉ hiện tượng trôi sai số tích lũy tăng vô hạn của odometry theo thời gian. (Viết thường)',
    NULL,
    ARRAY['trôi sai số', 'drift', 'lũy kế sai số']::varchar[],
    'Drift là hiện tượng trôi vị trí của odometry.',
    5, 'Kinematic Models', 'cs_robotics_fundamentals', 13, 'cs_navmot_07'
  ),
  (
    'cs_navmot_q_070', 'short-answer', 'kinematic-models',
    'Bộ mã hóa vòng quay gắn trên trục bánh xe đo đạc số xung quay có tên tiếng Anh là gì? (Viết thường)',
    NULL,
    ARRAY['encoder', 'rotary encoder']::varchar[],
    'Encoder đo vòng quay bánh xe.',
    5, 'Kinematic Models', 'cs_robotics_fundamentals', 13, 'cs_navmot_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Lập quỹ đạo trơn cho khớp Robot dựa trên đường cong Spline (cs_navmot_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_081', 'mcq', 'trajectory-recovery',
    'Tại sao việc lập quỹ đạo trơn (Trajectory Generation) lại bắt buộc cho khớp cánh tay robot công nghiệp?',
    ARRAY['Để tránh thay đổi gia tốc đột ngột gây lực giật (Jerk) lớn làm rung lắc và phá hủy hộp số bánh răng', 'Để tiết kiệm bộ nhớ ổ cứng của robot', 'Để robot nhận diện vật cản tốt hơn', 'Để tăng vận tốc quay lên vô hạn'],
    ARRAY['Để tránh thay đổi gia tốc đột ngột gây lực giật (Jerk) lớn làm rung lắc và phá hủy hộp số bánh răng']::varchar[],
    'Thay đổi gia tốc đột ngột tạo ra lực giật Jerk phá hủy các khớp cơ khí và gây rung lắc khâu cuối.',
    6, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_082', 'mcq', 'trajectory-recovery',
    'Độ mịn C1 của một đường cong quỹ đạo yêu cầu điều kiện gì?',
    ARRAY['Vận tốc chuyển động liên tục không bị nhảy bước (bước nhảy vận tốc bằng 0)', 'Vị trí khớp liên tục', 'Gia tốc khớp liên tục', 'Lực giật Jerk bằng 0'],
    ARRAY['Vận tốc chuyển động liên tục không bị nhảy bước (bước nhảy vận tốc bằng 0)']::varchar[],
    'C1 continuity yêu cầu đạo hàm bậc nhất (vận tốc) phải liên tục.',
    6, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_083', 'mcq', 'trajectory-recovery',
    'Đường cong đa thức bậc 3 (Cubic Spline) có hạn chế nào khi làm quỹ đạo?',
    ARRAY['Gia tốc tại điểm biên đầu cuối có thể bị thay đổi đột ngột (gia tốc không liên tục, Jerk lớn)', 'Không thể đi qua điểm đích', 'Đường đi bị cong vênh bất định', 'Tốn quá nhiều CPU để tính toán'],
    ARRAY['Gia tốc tại điểm biên đầu cuối có thể bị thay đổi đột ngột (gia tốc không liên tục, Jerk lớn)']::varchar[],
    'Cubic spline chỉ khống chế vị trí và vận tốc đầu cuối, gia tốc khớp đầu cuối có thể khác 0 gây giật nhẹ khi bắt đầu/kết thúc chuyển động.',
    6, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_084', 'mcq', 'trajectory-recovery',
    'Đường cong đa thức bậc 5 (Quintic Spline) cho phép khống chế đồng thời những đại lượng biên nào tại hai đầu quỹ đạo?',
    ARRAY['Vị trí, Vận tốc và Gia tốc', 'Chỉ vị trí và vận tốc', 'Mô-men xoắn và dòng điện động cơ', 'Không gian C-Space và ma trận Jacobian'],
    ARRAY['Vị trí, Vận tốc và Gia tốc']::varchar[],
    'Quintic Spline có 6 hệ số, cho phép đặt 6 điều kiện biên: vị trí, vận tốc, gia tốc tại t_start và t_end.',
    7, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_085', 'mcq', 'trajectory-recovery',
    'Đại lượng Jerk được định nghĩa toán học là gì?',
    ARRAY['Đạo hàm theo thời gian của gia tốc (độ thay đổi gia tốc)', 'Tích phân của vận tốc', 'Lực ma sát Coulomb', 'Bình phương của góc khớp'],
    ARRAY['Đạo hàm theo thời gian của gia tốc (độ thay đổi gia tốc)']::varchar[],
    'Jerk là đạo hàm bậc ba của vị trí, đặc trưng cho độ giật đột ngột của lực.',
    6, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_086', 'mcq', 'trajectory-recovery',
    'Ưu điểm của đường cong B-Spline so với đa thức đơn thuần khi lập quỹ đạo là gì?',
    ARRAY['Cho phép hiệu chỉnh hình dáng cục bộ của một đoạn quỹ đạo qua điểm điều khiển mà không cần tính toán lại toàn bộ đường cong', 'Độ phức tạp luôn bằng O(1)', 'Không phụ thuộc vào biến thời gian t', 'Tự động tránh được mọi chướng ngại vật'],
    ARRAY['Cho phép hiệu chỉnh hình dáng cục bộ của một đoạn quỹ đạo qua điểm điều khiển mà không cần tính toán lại toàn bộ đường cong']::varchar[],
    'B-spline có thuộc tính hỗ trợ cục bộ (local support), thích hợp cho việc tối ưu hóa quỹ đạo thời gian thực.',
    7, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_087', 'mcq', 'trajectory-recovery',
    'Khi lập quỹ đạo cho cánh tay robot gắp sản phẩm nhanh, gia tốc khớp tối đa tính toán phải luôn nằm trong giới hạn nào?',
    ARRAY['Nhỏ hơn giới hạn mô-men xoắn định mức của động cơ chia cho quán tính khâu tương ứng', 'Lớn hơn gia tốc trọng trường g', 'Đặt bằng vô cùng để tăng tốc', 'Tỷ lệ nghịch với số khớp robot'],
    ARRAY['Nhỏ hơn giới hạn mô-men xoắn định mức của động cơ chia cho quán tính khâu tương ứng']::varchar[],
    'Gia tốc quá lớn đòi hỏi mô-men vượt quá khả năng của động cơ, gây lỗi quá dòng (overcurrent) làm sập hệ thống điều khiển.',
    6, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_088', 'mcq', 'trajectory-recovery',
    'Để triệt tiêu Jerk tại thời điểm xuất phát và kết thúc của hành trình, gia tốc đặt biên đầu cuối phải chọn bằng bao nhiêu?',
    ARRAY['0', '9.81', '-1', 'Hằng số tối đa của động cơ'],
    ARRAY['0']::varchar[],
    'Đặt gia tốc đầu và cuối bằng 0 bảo đảm lực tăng dần từ tốn từ trạng thái đứng yên và hãm êm dịu khi dừng.',
    5, 'Trajectory Generation', 'cs_navigation_motion', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_089', 'short-answer', 'trajectory-recovery',
    'Điền tên đại lượng đạo hàm bậc 3 của vị trí biểu thị độ giật của chuyển động cơ khí. (Viết thường)',
    NULL,
    ARRAY['jerk', 'lực giật']::varchar[],
    'Jerk lớn gây hại lớn cho hộp số cơ khí.',
    5, 'Trajectory Generation', 'cs_robotics_fundamentals', 13, 'cs_navmot_08'
  ),
  (
    'cs_navmot_q_090', 'short-answer', 'trajectory-recovery',
    'Đa thức bậc mấy được dùng để lập đường cong Quintic Spline? (Điền số)',
    NULL,
    ARRAY['5']::varchar[],
    'Quintic Spline là đa thức bậc 5.',
    5, 'Trajectory Generation', 'cs_robotics_fundamentals', 13, 'cs_navmot_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Hành vi phục hồi trạng thái trong ROS2 Navigation (cs_navmot_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_navmot_q_091', 'mcq', 'trajectory-recovery',
    'Tại sao robot tự hành cần được trang bị "Hành vi phục hồi trạng thái" (Recovery Behaviors)?',
    ARRAY['Để tự giải cứu thoát kẹt khi rơi vào tình huống ngõ cụt hoặc bị con người chắn lối xung quanh mà local planner bất lực', 'Để tự động cập nhật phần mềm', 'Để sạc pin nhanh hơn', 'Để tăng tốc độ tính toán SLAM'],
    ARRAY['Để tự giải cứu thoát kẹt khi rơi vào tình huống ngõ cụt hoặc bị con người chắn lối xung quanh mà local planner bất lực']::varchar[],
    'Recovery behaviors giúp robot tự giải quyết các sự cố kẹt đường nhẹ mà không cần gọi người vận hành hỗ trợ.',
    5, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_092', 'mcq', 'trajectory-recovery',
    'Hành vi phục hồi "Clear Costmap" thực hiện nhiệm vụ gì?',
    ARRAY['Xóa toàn bộ các vật cản động tạm thời trong Local Costmap để LiDAR quét lại từ đầu (phòng tránh chướng ngại vật ma)', 'Xóa bản đồ tĩnh SLAM', 'Xóa toàn bộ bộ nhớ RAM của hệ thống', 'Tự động dịch chuyển robot về gốc tọa độ'],
    ARRAY['Xóa toàn bộ các vật cản động tạm thời trong Local Costmap để LiDAR quét lại từ đầu (phòng tránh chướng ngại vật ma)']::varchar[],
    'Đôi khi nhiễu cảm biến tạo ra vật cản ảo chắn lối đi, xóa costmap buộc robot cập nhật lại thông tin mới nhất.',
    6, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_093', 'mcq', 'trajectory-recovery',
    'Hành vi phục hồi "Clearing Rotation" (hoặc Spin) điều khiển robot thực hiện chuyển động nào?',
    ARRAY['Tự xoay tròn 360 độ chậm rãi tại chỗ để cảm biến LiDAR quét và làm sạch vùng khuất xung quanh', 'Chạy lùi hết tốc lực', 'Quay bánh dẫn hướng liên tục sang hai bên', 'Bay lên không trung'],
    ARRAY['Tự xoay tròn 360 độ chậm rãi tại chỗ để cảm biến LiDAR quét và làm sạch vùng khuất xung quanh']::varchar[],
    'Quay tại chỗ giúp cập nhật thông tin cảm biến xung quanh, tìm khe hở lối thoát.',
    5, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_094', 'mcq', 'trajectory-recovery',
    'Hành vi phục hồi "Backup" (Đi lùi) yêu cầu robot phải chú ý điều gì để đảm bảo an toàn vật lý?',
    ARRAY['Phải giới hạn khoảng cách đi lùi cực ngắn (ví dụ 10cm-15cm) vì phía sau thường là vùng mù cảm biến không có LiDAR quét', 'Đi lùi với tốc độ cực đại', 'Tắt toàn bộ cảm biến', 'Bắt buộc phải đi lùi theo hình chữ S'],
    ARRAY['Phải giới hạn khoảng cách đi lùi cực ngắn (ví dụ 10cm-15cm) vì phía sau thường là vùng mù cảm biến không có LiDAR quét']::varchar[],
    'Vùng mù phía sau xe có nguy cơ va chạm lớn, đi lùi chỉ là bước giải cứu nhỏ thoát kẹt cơ khí góc khuất.',
    6, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_095', 'mcq', 'trajectory-recovery',
    'Mạch logic quản lý chuỗi phục hồi trạng thái (ví dụ: clear_costmap -> backup -> spin -> wait) trong ROS2 Nav2 được cấu hình ở đâu?',
    ARRAY['Cây hành vi của Nav2 (Behavior Tree)', 'Mạch điện vật lý của robot', 'File driver của động cơ bánh xe', 'Bộ điều khiển PID vòng kín'],
    ARRAY['Cây hành vi của Nav2 (Behavior Tree)']::varchar[],
    'Behavior Tree quản lý các luồng rẽ nhánh và gọi các Recovery Servers tương ứng khi các planner báo FAILURE.',
    6, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_096', 'mcq', 'trajectory-recovery',
    'Nếu chạy toàn bộ chuỗi hành vi phục hồi vẫn không thoát kẹt, robot ROS2 tự hành sẽ phản ứng như thế nào?',
    ARRAY['Báo trạng thái lỗi thất bại (FAILED) về hệ thống quản lý trung tâm (Fleet Manager) và đứng yên chờ trợ giúp', 'Tự động reset máy tính nhúng', 'Quay vòng tròn vô hạn đến khi hết pin', 'Tự động xóa toàn bộ bản đồ tĩnh'],
    ARRAY['Báo trạng thái lỗi thất bại (FAILED) về hệ thống quản lý trung tâm (Fleet Manager) và đứng yên chờ trợ giúp']::varchar[],
    'Khi không thể phục hồi, robot phải gọi sự trợ giúp của con người để bảo đảm an toàn cơ khí.',
    5, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_097', 'mcq', 'trajectory-recovery',
    'Hành vi "Wait" (Chờ đợi) trong chuỗi phục hồi có lợi ích gì khi robot di chuyển trong siêu thị?',
    ARRAY['Đợi con người đi qua chỗ khác giải phóng lối đi bị chắn tạm thời', 'Để hạ nhiệt độ cho động cơ', 'Để pin tự hồi phục dung lượng', 'Để camera tự hiệu chuẩn lại tiêu cự'],
    ARRAY['Đợi con người đi qua chỗ khác giải phóng lối đi bị chắn tạm thời']::varchar[],
    'Đứng im chờ đợi vài giây tránh va chạm không đáng có với người đi bộ cắt ngang.',
    5, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_098', 'mcq', 'trajectory-recovery',
    'Thuật toán quét tia laser (Raycasting) giúp Obstacle Layer xóa chướng ngại vật ma như thế nào sau khi Clear Costmap?',
    ARRAY['Tia laser bắn xuyên qua khoảng trống không phản xạ xác nhận ô lưới đó đã trống (Free space)', 'Laser tự động hấp thụ các hạt bụi ảo', 'Robot tự động chiếu đèn LED chiếu sáng', 'Không cần LiDAR quét lại'],
    ARRAY['Tia laser bắn xuyên qua khoảng trống không phản xạ xác nhận ô lưới đó đã trống (Free space)']::varchar[],
    'Tia laser đi qua ô lưới mà không dội lại chứng tỏ vùng đó không còn vật cản, cập nhật chi phí về 0.',
    6, 'Recovery Behaviors', 'cs_navigation_motion', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_099', 'short-answer', 'trajectory-recovery',
    'Điền tên hành vi phục hồi quay 360 độ tại chỗ để cập nhật LiDAR. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['clearing rotation', 'spin', 'quay tại chỗ']::varchar[],
    'Clearing Rotation giúp quét sạch góc khuất quanh robot.',
    5, 'Recovery Behaviors', 'cs_robotics_fundamentals', 13, 'cs_navmot_09'
  ),
  (
    'cs_navmot_q_100', 'short-answer', 'trajectory-recovery',
    'Gói phần mềm ROS2 quản lý hành vi di chuyển và phục hồi của robot tự hành là gì? (Viết tắt kèm chữ số 2)',
    NULL,
    ARRAY['nav2', 'navigation2']::varchar[],
    'Nav2 quản lý toàn bộ quá trình tự hành trong ROS2.',
    5, 'Recovery Behaviors', 'cs_robotics_fundamentals', 13, 'cs_navmot_09'
  );

COMMIT;
