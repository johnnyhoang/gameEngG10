-- SQL migration to seed 100 question bank for cs_robot_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_robot_intelligence (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_robot_intelligence';

-- ======================================================================================
-- BÀI GIẢNG 1: Bản đồ & Định vị SLAM (cs_robint_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_001', 'mcq', 'slam-localization',
    'SLAM giải quyết đồng thời hai bài toán cốt lõi nào của robot tự hành?',
    ARRAY['Định vị vị trí robot và xây dựng bản đồ môi trường xung quanh', 'Thiết lập tham số D-H và giải động học ngược', 'Lập trình bộ điều khiển PID và điều tốc động cơ', 'Mô phỏng lực va chạm cơ học khâu cuối'],
    ARRAY['Định vị vị trí robot và xây dựng bản đồ môi trường xung quanh']::varchar[],
    'SLAM là Simultaneous Localization and Mapping, đồng thời định vị và vẽ bản đồ.',
    5, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_002', 'mcq', 'slam-localization',
    'Tại sao bài toán SLAM được ví như bài toán "con gà và quả trứng"?',
    ARRAY['Để định vị cần có bản đồ chính xác, nhưng để vẽ bản đồ chính xác lại đòi hỏi biết vị trí chính xác của robot', 'Vì nó chạy trên hệ điều hành ROS2', 'Vì nó có giá thành đắt đỏ', 'Do thuật toán chỉ chạy vào ban ngày'],
    ARRAY['Để định vị cần có bản đồ chính xác, nhưng để vẽ bản đồ chính xác lại đòi hỏi biết vị trí chính xác của robot']::varchar[],
    'Đây là mâu thuẫn cơ bản của SLAM đòi hỏi các bộ lọc ước lượng xác suất để giải quyết đồng thời cả hai trạng thái.',
    6, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_003', 'mcq', 'slam-localization',
    'Bộ lọc xác suất kinh điển nào thường dùng trong SLAM để ước lượng trạng thái robot và cập nhật bản đồ các điểm mốc?',
    ARRAY['Lọc Kalman mở rộng (EKF SLAM) hoặc Lọc hạt (Particle Filter)', 'Bộ lọc thông thấp Low-pass Filter', 'Bộ biến đổi Fourier', 'Bộ điều khiển PID'],
    ARRAY['Lọc Kalman mở rộng (EKF SLAM) hoặc Lọc hạt (Particle Filter)']::varchar[],
    'EKF và Lọc hạt là hai giải thuật nền tảng để giải quyết sự không chắc chắn của cảm biến trong SLAM.',
    6, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_004', 'mcq', 'slam-localization',
    'Trong LiDAR SLAM, cơ chế "Scan Matching" (khớp quét) thực hiện việc gì?',
    ARRAY['So sánh các tia quét laser kề nhau để ước lượng sự dịch chuyển tương đối của robot', 'Đo đạc nhiệt độ của mắt phát laser', 'Lọc nhiễu bụi bẩn trong phòng', 'Định tuyến gói tin mạng DDS'],
    ARRAY['So sánh các tia quét laser kề nhau để ước lượng sự dịch chuyển tương đối của robot']::varchar[],
    'Scan Matching tìm ma trận quay và tịnh tiến tối ưu khớp khung hình quét mới vào khung hình quét cũ.',
    6, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_005', 'mcq', 'slam-localization',
    'Visual SLAM (vSLAM) sử dụng loại cảm biến thu nhận thông tin nào làm đầu vào?',
    ARRAY['Camera (RGB, Stereo hoặc Depth)', 'Cảm biến siêu âm', 'Bánh xe encoder', 'Bộ thu sóng UWB'],
    ARRAY['Camera (RGB, Stereo hoặc Depth)']::varchar[],
    'vSLAM sử dụng hình ảnh thu thập từ camera để tính toán tọa độ đặc trưng 3D của môi trường.',
    5, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_006', 'mcq', 'slam-localization',
    'Khái niệm "Loop Closure" (Đóng vòng lặp) trong SLAM có vai trò cực kỳ quan trọng nào?',
    ARRAY['Phát hiện robot quay lại một vị trí cũ để tối ưu hóa và triệt tiêu sai số lũy kế của toàn bộ bản đồ', 'Chạy lặp lại đoạn code điều khiển', 'Ngắt điện động cơ khi robot đi hết 1 vòng', 'Mã hóa vòng quay encoder bánh xe'],
    ARRAY['Phát hiện robot quay lại một vị trí cũ để tối ưu hóa và triệt tiêu sai số lũy kế của toàn bộ bản đồ']::varchar[],
    'Loop Closure nhận diện cảnh cũ, tính toán sai lệch lũy kế và phân bổ sai số ngược lại toàn bộ đồ thị quỹ đạo (Graph Optimization).',
    7, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_007', 'mcq', 'slam-localization',
    'Bản đồ lưới chiếm chỗ (Occupancy Grid Map) lưu trữ thông tin gì tại mỗi ô lưới?',
    ARRAY['Xác suất ô lưới đó có vật cản (từ 0 đến 100%)', 'Tên của chướng ngại vật', 'Màu sắc của vật cản', 'Tọa độ góc khớp robot'],
    ARRAY['Xác suất ô lưới đó có vật cản (từ 0 đến 100%)']::varchar[],
    'Bản đồ lưới chia không gian thành các ô vuông độc lập, gán xác suất chiếm chỗ: 0 (trống), 100 (vật cản), -1 (chưa thám hiểm).',
    5, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_008', 'mcq', 'slam-localization',
    'Nhược điểm lớn nhất của Visual SLAM so với LiDAR SLAM là gì?',
    ARRAY['Nhạy cảm với sự thay đổi ánh sáng đột ngột và khu vực tường trắng trơn không có chi tiết đặc trưng', 'Giá thành thiết bị camera đắt hơn LiDAR nhiều', 'Camera tiêu thụ điện năng quá lớn', 'Trọng lượng camera quá nặng'],
    ARRAY['Nhạy cảm với sự thay đổi ánh sáng đột ngột và khu vực tường trắng trơn không có chi tiết đặc trưng']::varchar[],
    'vSLAM phụ thuộc vào thuật toán trích xuất điểm mốc ảnh (Features), tường trơn không có điểm mốc làm thuật toán bị mất dấu (Lost tracking).',
    6, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_009', 'short-answer', 'slam-localization',
    'Điền tên viết tắt tiếng Anh của bài toán đồng thời định vị và vẽ bản đồ. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SLAM']::varchar[],
    'SLAM là Simultaneous Localization and Mapping.',
    5, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  ),
  (
    'cs_robint_q_010', 'short-answer', 'slam-localization',
    'Điền tên tiếng Anh của cơ chế phát hiện robot quay lại điểm xuất phát cũ để sửa sai số bản đồ. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['loop closure']::varchar[],
    'Loop Closure đóng vòng lặp bản đồ.',
    6, 'Robot Intelligence', 'cs_robot_intelligence', 13, 'cs_robint_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Lập kế hoạch đường đi toàn cục: A* vs RRT (cs_robint_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_011', 'mcq', 'path-planning',
    'Công thức tính hàm đánh giá f(n) của thuật toán tìm đường A* là gì?',
    ARRAY['f(n) = g(n) + h(n)', 'f(n) = g(n) - h(n)', 'f(n) = g(n) * h(n)', 'f(n) = h(n)'],
    ARRAY['f(n) = g(n) + h(n)']::varchar[],
    'A* kết hợp khoảng cách thực tế đã đi g(n) và chi phí ước lượng heuristic tới đích h(n) để tối ưu hướng tìm kiếm.',
    5, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_012', 'mcq', 'path-planning',
    'Trong thuật toán A*, đại lượng h(n) được gọi là gì?',
    ARRAY['Hàm Heuristic ước lượng khoảng cách từ nút hiện tại tới đích', 'Khoảng cách thực tế từ gốc tới nút hiện tại', 'Lực ma sát bánh xe', 'Thời gian tính toán của CPU'],
    ARRAY['Hàm Heuristic ước lượng khoảng cách từ nút hiện tại tới đích']::varchar[],
    'h(n) định hướng cho A* tìm kiếm tập trung về phía đích thay vì loang đều ra mọi hướng như Dijkstra.',
    5, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_013', 'mcq', 'path-planning',
    'Thuật toán RRT (Rapidly-explored Random Trees) phát triển cây tìm kiếm trong không gian bằng cách nào?',
    ARRAY['Chọn điểm ngẫu nhiên trong C-Space, tìm nút gần nhất trên cây để phát triển nhánh mới không va chạm', 'Tìm kiếm tuần tự từ trái qua phải', 'Vẽ các đường tròn đồng tâm từ gốc', 'Giải hệ phương trình ma trận Jacobian'],
    ARRAY['Chọn điểm ngẫu nhiên trong C-Space, tìm nút gần nhất trên cây để phát triển nhánh mới không va chạm']::varchar[],
    'RRT chọn mẫu ngẫu nhiên không gian cấu hình, giúp vượt qua bùng nổ chiều của cánh tay nhiều khớp.',
    6, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_014', 'mcq', 'path-planning',
    'Ưu điểm nổi bật nhất của RRT so với A* là gì?',
    ARRAY['Hiệu quả vượt trội trong không gian tìm kiếm số chiều cao (như cánh tay robot 6-7 bậc tự do)', 'Luôn tìm ra đường đi ngắn nhất tuyệt đối', 'Không đòi hỏi CPU tính toán va chạm', 'Độ phức tạp thuật toán luôn bằng O(1)'],
    ARRAY['Hiệu quả vượt trội trong không gian tìm kiếm số chiều cao (như cánh tay robot 6-7 bậc tự do)']::varchar[],
    'A* bị bùng nổ lưới ô trong không gian nhiều chiều, RRT chỉ chọn mẫu ngẫu nhiên nên xử lý cực tốt hệ nhiều DOF.',
    6, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_015', 'mcq', 'path-planning',
    'Thuộc tính "Đầy đủ xác suất" (Probabilistic Completeness) của RRT có nghĩa là gì?',
    ARRAY['Nếu tồn tại đường đi không va chạm, xác suất thuật toán tìm ra nó tiến tới 100% khi thời gian chạy tiến tới vô cùng', 'Thuật toán luôn tìm ra đường đi tức thời', 'Đường đi tìm được luôn là ngắn nhất', 'Xác suất tìm được đường đi là 50%'],
    ARRAY['Nếu tồn tại đường đi không va chạm, xác suất thuật toán tìm ra nó tiến tới 100% khi thời gian chạy tiến tới vô cùng']::varchar[],
    'RRT không cam kết tìm ra đường đi tức thời nhưng bảo đảm sẽ tìm thấy nếu cho nó đủ thời gian chọn mẫu.',
    6, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_016', 'mcq', 'path-planning',
    'Thuật toán RRT* nâng cấp RRT cơ bản ở điểm nào?',
    ARRAY['Tối ưu hóa lại các liên kết của các nút xung quanh nút mới để tìm đường đi ngắn nhất tiệm cận tối ưu', 'Chạy nhanh hơn gấp 10 lần', 'Không sử dụng điểm ngẫu nhiên', 'Chỉ dùng cho xe di động 2 bánh'],
    ARRAY['Tối ưu hóa lại các liên kết của các nút xung quanh nút mới để tìm đường đi ngắn nhất tiệm cận tối ưu']::varchar[],
    'RRT* thực hiện bước quấn lại cây (rewiring), bảo đảm tính tối ưu tiệm cận (asymptotic optimality).',
    7, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_017', 'mcq', 'path-planning',
    'Khi lập kế hoạch đường đi 2D phẳng cho AMR, hàm Heuristic h(n) của A* thường chọn khoảng cách hình học nào?',
    ARRAY['Khoảng cách Euclid hoặc khoảng cách Manhattan', 'Độ dài đường cong spline', 'Khoảng cách Hamming nhị phân', 'Độ cao chênh lệch sàn'],
    ARRAY['Khoảng cách Euclid hoặc khoảng cách Manhattan']::varchar[],
    'Khoảng cách đường thẳng hình học bảo đảm h(n) luôn nhỏ hơn hoặc bằng chi phí thực tế (heuristic chấp nhận được - admissible), bảo đảm tính tối ưu của A*.',
    5, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_018', 'mcq', 'path-planning',
    'Khái niệm "Bản đồ tĩnh" (Static Map) dùng trong lập kế hoạch toàn cục thường được lưu trữ dưới định dạng nào?',
    ARRAY['Bản đồ lưới chiếm chỗ Occupancy Grid Map vẽ bằng SLAM trước đó', 'Dòng video streaming từ camera', 'Ma trận Jacobian hệ thống', 'File chứa các thông số D-H'],
    ARRAY['Bản đồ lưới chiếm chỗ Occupancy Grid Map vẽ bằng SLAM trước đó']::varchar[],
    'Global planner cần bản đồ tĩnh không thay đổi để chạy các thuật toán tìm kiếm đồ thị ổn định.',
    5, 'Path Planning', 'cs_robot_intelligence', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_019', 'short-answer', 'path-planning',
    'Điền tên viết tắt tiếng Anh của thuật toán cây ngẫu nhiên khám phá nhanh. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RRT']::varchar[],
    'RRT là Rapidly-explored Random Tree.',
    5, 'Path Planning', 'cs_robotics_fundamentals', 13, 'cs_robint_02'
  ),
  (
    'cs_robint_q_020', 'short-answer', 'path-planning',
    'Điền tên thuật toán tìm đường trên lưới ô vuông sử dụng hàm f(n) = g(n) + h(n). (Viết chữ cái kèm dấu sao)',
    NULL,
    ARRAY['A*']::varchar[],
    'Thuật toán A* (A-Star) là giải thuật heuristic kinh điển.',
    5, 'Path Planning', 'cs_robotics_fundamentals', 13, 'cs_robint_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Tránh vật cản động cục bộ: DWA vs TEB (cs_robint_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_021', 'mcq', 'path-planning',
    'Không gian tìm kiếm quỹ đạo của thuật toán tránh vật cản động DWA là gì?',
    ARRAY['Không gian vận tốc tuyến tính và vận tốc góc của robot (v, \\(\\omega\\))', 'Không gian tọa độ Cartesian thế giới (x, y)', 'Không gian góc khớp cánh tay', 'Không gian tần số của cảm biến'],
    ARRAY['Không gian vận tốc tuyến tính và vận tốc góc của robot (v, \\(\\omega\\))']::varchar[],
    'DWA (Dynamic Window Approach) tìm kiếm trực tiếp cặp vận tốc (v, omega) tối ưu để gửi thẳng cho Driver động cơ.',
    6, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_022', 'mcq', 'path-planning',
    'Thuật toán DWA giới hạn các cặp vận tốc trong "Cửa sổ động" dựa trên thông số vật lý nào của robot?',
    ARRAY['Giới hạn gia tốc cực đại của các động cơ bánh xe trong một chu kỳ thời gian ngắn', 'Dung lượng pin còn lại', 'Trọng lượng robot', 'Góc mở quét của cảm biến LiDAR'],
    ARRAY['Giới hạn gia tốc cực đại của các động cơ bánh xe trong một chu kỳ thời gian ngắn']::varchar[],
    'Cửa sổ động bảo đảm vận tốc lựa chọn có thể đạt tới được tức thời mà không vượt quá khả năng gia tốc/hãm phanh của động cơ.',
    6, 'Local Planner', 'cs_robot_mechanics', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_023', 'mcq', 'path-planning',
    'Hàm mục tiêu chấm điểm các quỹ đạo thử nghiệm của DWA bao gồm các tiêu chí nào?',
    ARRAY['Độ lệch hướng tới đích, tốc độ di chuyển tiến, và khoảng cách an toàn tới chướng ngại vật gần nhất', 'Góc quay khớp vai và khớp gối', 'Điện áp cấp cho motor và độ trễ ros2 topic', 'Mức độ rung lắc cơ học của bánh mecanum'],
    ARRAY['Độ lệch hướng tới đích, tốc độ di chuyển tiến, và khoảng cách an toàn tới chướng ngại vật gần nhất']::varchar[],
    'DWA tối ưu hóa đồng thời 3 tiêu chí để chọn quỹ đạo đi nhanh nhất, bám đường đi toàn cục nhất và an toàn nhất.',
    6, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_024', 'mcq', 'path-planning',
    'Thuật toán TEB (Timed-Elastic-Band) tối ưu hóa quỹ đạo cục bộ dựa trên mô hình toán học nào?',
    ARRAY['Tối ưu hóa đa mục tiêu coi quỹ đạo như dải băng đàn hồi chịu lực kéo đẩy của đích và vật cản', 'Tìm kiếm ngẫu nhiên RRT', 'Lưới ô vuông Heuristic của A*', 'Hợp nhất Kalman EKF'],
    ARRAY['Tối ưu hóa đa mục tiêu coi quỹ đạo như dải băng đàn hồi chịu lực kéo đẩy của đích và vật cản']::varchar[],
    'TEB biểu diễn quỹ đạo là chuỗi tư thế và khoảng thời gian dt, giải bài toán tối ưu phi tuyến có ràng buộc thời gian ngắn nhất.',
    7, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_025', 'mcq', 'path-planning',
    'Điểm vượt trội của TEB so với DWA khi điều khiển robot đa hướng (như bánh xe Mecanum) là gì?',
    ARRAY['TEB hỗ trợ tối ưu hóa chuyển động tịnh tiến ngang đi chéo tức thời; DWA truyền thống bị giới hạn cho xe di động di sai', 'TEB chạy nhẹ máy hơn DWA nhiều', 'TEB không cần thông số gia tốc', 'TEB tự động tắt nguồn robot khi có va chạm'],
    ARRAY['TEB hỗ trợ tối ưu hóa chuyển động tịnh tiến ngang đi chéo tức thời; DWA truyền thống bị giới hạn cho xe di động di sai']::varchar[],
    'TEB mô hình hóa đầy đủ các trạng thái tự do chuyển động trong tối ưu hóa, giúp tận dụng thế mạnh đa hướng.',
    7, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_026', 'mcq', 'path-planning',
    'Tần số cập nhật (Update rate) của một bộ lập quỹ đạo cục bộ (Local Planner) thường được cấu hình ở mức nào để né vật cản động tin cậy?',
    ARRAY['10Hz đến 50Hz', '1Hz', '1kHz đến 10kHz', '0.1Hz'],
    ARRAY['10Hz đến 50Hz']::varchar[],
    'Local planner cần chạy ở tần số trung bình (mỗi 20ms - 100ms) để liên tục phản ứng với người đi bộ cắt ngang.',
    6, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_027', 'mcq', 'path-planning',
    'Điều gì xảy ra nếu robot chỉ chạy bộ lập quỹ đạo toàn cục (Global Planner) mà không có bộ lập quỹ đạo cục bộ (Local Planner)?',
    ARRAY['Robot sẽ đâm vào con người hoặc vật cản mới xuất hiện đột xuất vì bản đồ toàn cục không cập nhật kịp thời', 'Robot di chuyển nhanh hơn', 'Robot không thể quay đầu được', 'Động cơ bánh xe sẽ bị cháy'],
    ARRAY['Robot sẽ đâm vào con người hoặc vật cản mới xuất hiện đột xuất vì bản đồ toàn cục không cập nhật kịp thời']::varchar[],
    'Global planner chỉ vẽ đường trên bản đồ tĩnh cũ. Phải có local planner để phản ứng nhanh thời gian thực.',
    5, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_028', 'mcq', 'path-planning',
    'Trong hệ điều hành ROS2, gói phần mềm tiêu chuẩn quản lý định hướng, SLAM và di chuyển của robot tự hành là gì?',
    ARRAY['Navigation2 (Nav2)', 'MoveIt2', 'OpenCV', 'Gazebo'],
    ARRAY['Navigation2 (Nav2)']::varchar[],
    'Nav2 cung cấp kiến trúc lập kế hoạch toàn cục/cục bộ và phục hồi trạng thái cho AMR.',
    5, 'Local Planner', 'cs_robot_intelligence', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_029', 'short-answer', 'path-planning',
    'Điền tên viết tắt tiếng Anh của thuật toán tránh vật cản động cục bộ dựa trên "cửa sổ động" vận tốc. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DWA']::varchar[],
    'DWA là Dynamic Window Approach.',
    5, 'Local Planner', 'cs_robotics_fundamentals', 13, 'cs_robint_03'
  ),
  (
    'cs_robint_q_030', 'short-answer', 'path-planning',
    'Điền tên viết tắt tiếng Anh của thuật toán tối ưu hóa quỹ đạo cục bộ đàn hồi. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TEB']::varchar[],
    'TEB là Timed-Elastic-Band.',
    6, 'Local Planner', 'cs_robotics_fundamentals', 13, 'cs_robint_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Thị giác máy tính trong Robotics: YOLO & Aruco Markers (cs_robint_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_031', 'mcq', 'robot-vision-rl',
    'Đặc trưng nổi bật của mạng thần kinh YOLO (You Only Look Once) phù hợp cho thị giác robot là gì?',
    ARRAY['Xử lý toàn bộ hình ảnh trong một lượt quét duy nhất giúp đạt tốc độ FPS cực cao cho robot phản ứng thời gian thực', 'Độ phân giải ảnh vô hạn', 'Không cần huấn luyện mô hình trước', 'Chỉ nhận diện được ảnh đen trắng'],
    ARRAY['Xử lý toàn bộ hình ảnh trong một lượt quét duy nhất giúp đạt tốc độ FPS cực cao cho robot phản ứng thời gian thực']::varchar[],
    'YOLO chia lưới bức ảnh và dự báo đồng thời hộp bao cùng xác suất nhãn, tối ưu cho GPU nhúng (Jetson Nano/Orin).',
    6, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_032', 'mcq', 'robot-vision-rl',
    'Thẻ Aruco Marker là gì trong ứng dụng định vị camera?',
    ARRAY['Thẻ mã vạch ma trận hình vuông màu đen trắng có hoa văn mã hóa số ID độc nhất', 'Một loại anten phát sóng wifi', 'Cảm biến siêu âm gắn trần', 'Nhãn hiệu của camera độ sâu'],
    ARRAY['Thẻ mã vạch ma trận hình vuông màu đen trắng có hoa văn mã hóa số ID độc nhất']::varchar[],
    'Aruco marker cung cấp các điểm mốc hình học rõ ràng giúp camera dễ dàng tính toán tư thế 3D.',
    5, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_033', 'mcq', 'robot-vision-rl',
    'Phép toán phối cảnh PnP (Perspective-n-Point) ứng dụng cho Aruco Marker dùng để tính toán đại lượng nào?',
    ARRAY['Ma trận chuyển đổi 3D của thẻ Aruco so với ống kính camera (T_marker^cam)', 'Vận tốc quay của khớp robot', 'Hệ số ma sát của ngón kẹp', 'Bản đồ lưới chiếm chỗ phẳng'],
    ARRAY['Ma trận chuyển đổi 3D của thẻ Aruco so với ống kính camera (T_marker^cam)']::varchar[],
    'PnP sử dụng kích thước vật lý đã biết của thẻ và tọa độ các góc 2D ảnh chụp được để tính tọa độ 3D của thẻ.',
    6, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_034', 'mcq', 'robot-vision-rl',
    'Ứng dụng phổ biến nhất của thẻ Aruco trong hệ thống robot tự hành AMR nhà kho là gì?',
    ARRAY['Hỗ trợ robot định vị milimet tự động lùi vào gá sạc pin hoặc căn chỉnh khớp gầm kệ hàng', 'Thay thế hoàn toàn cảm biến LiDAR', 'Lập trình bộ PID điều khiển động cơ', 'Phát hiện con người đi siêu thị'],
    ARRAY['Hỗ trợ robot định vị milimet tự động lùi vào gá sạc pin hoặc căn chỉnh khớp gầm kệ hàng']::varchar[],
    'Aruco marker dán ở các trạm sạc hoặc gầm kệ hàng cung cấp điểm tham chiếu chính xác cao giúp robot căn chỉnh khớp nối cơ khí.',
    6, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_035', 'mcq', 'robot-vision-rl',
    'Thành phần mã Hammming tích hợp trong hoa văn Aruco Marker có vai trò gì?',
    ARRAY['Tự phát hiện và sửa lỗi đọc sai mã thẻ khi ảnh bị mờ, nhiễu hoặc ánh sáng kém', 'Mã hóa mật khẩu bảo mật', 'Tăng tốc độ hiển thị hình ảnh', 'Giảm dung lượng file ảnh'],
    ARRAY['Tự phát hiện và sửa lỗi đọc sai mã thẻ khi ảnh bị mờ, nhiễu hoặc ánh sáng kém']::varchar[],
    'Mã Hamming giúp xác thực ID thẻ Aruco chính xác, tránh hiện tượng nhận diện nhầm ô lưới nhiễu ngoài đời.',
    6, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_036', 'mcq', 'robot-vision-rl',
    'Để camera robot tính toán được chính xác khoảng cách 3D thực tế của vật thể qua ảnh chụp, ta cần thực hiện bước hiệu chuẩn nào trước?',
    ARRAY['Hiệu chuẩn camera (Camera Calibration) để tìm các thông số nội camera (Intrinsic Parameters như tiêu cự, tâm ảnh)', 'Sơn lại vỏ camera', 'Tăng dung lượng pin cho robot', 'Cài đặt hệ điều hành Ubuntu'],
    ARRAY['Hiệu chuẩn camera (Camera Calibration) để tìm các thông số nội camera (Intrinsic Parameters như tiêu cự, tâm ảnh)']::varchar[],
    'Intrinsic matrix $K$ chuyển đổi tọa độ pixel ảnh sang tia chiếu 3D thế giới thực, loại bỏ méo thấu kính (distortion).',
    7, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_037', 'mcq', 'robot-vision-rl',
    'Thuật toán YOLO cho kết quả đầu ra dạng "Bounding Box". Bounding Box đại diện cho điều gì trên ảnh?',
    ARRAY['Hộp hình chữ nhật bao quanh vật thể được nhận diện kèm nhãn tên và độ tin cậy', 'Tọa độ đám mây điểm 3D', 'Góc quay của camera', 'Bản đồ lưới Occupancy Grid'],
    ARRAY['Hộp hình chữ nhật bao quanh vật thể được nhận diện kèm nhãn tên và độ tin cậy']::varchar[],
    'Bounding Box gồm tọa độ tâm hộp ($x, y$), chiều rộng ($w$), chiều cao ($h$) của vật thể trong ảnh.',
    5, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_038', 'mcq', 'robot-vision-rl',
    'Thư viện mã nguồn mở tiêu chuẩn xử lý hình ảnh 2D/3D đi kèm trong lập trình robot camera là gì?',
    ARRAY['OpenCV', 'Pinocchio', 'Docker', 'RViz'],
    ARRAY['OpenCV']::varchar[],
    'OpenCV cung cấp hàng ngàn thuật toán xử lý ảnh, lọc nhiễu, tìm cạnh và nhận diện thẻ Aruco.',
    5, 'Robot Vision', 'cs_robot_intelligence', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_039', 'short-answer', 'robot-vision-rl',
    'Điền tên viết tắt tiếng Anh của mạng thần kinh nhận dạng vật thể thời gian thực nổi tiếng chạy trong 1 lượt. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['YOLO']::varchar[],
    'YOLO là You Only Look Once.',
    5, 'Robot Vision', 'cs_robotics_fundamentals', 13, 'cs_robint_04'
  ),
  (
    'cs_robint_q_040', 'short-answer', 'robot-vision-rl',
    'Điền tên thư viện lập trình thị giác máy tính mã nguồn mở phổ biến nhất. (Viết hoa chữ CV ở cuối)',
    NULL,
    ARRAY['OpenCV']::varchar[],
    'OpenCV là Open Source Computer Vision Library.',
    5, 'Robot Vision', 'cs_robotics_fundamentals', 13, 'cs_robint_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Học tăng cường cho Robot (cs_robint_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_041', 'mcq', 'robot-vision-rl',
    'Mục tiêu của Học tăng cường (Reinforcement Learning) cho robot là gì?',
    ARRAY['Huấn luyện robot tự học hành vi tối ưu thông qua quá trình thử và sai để tối đa hóa điểm thưởng tích lũy', 'Lập trình các luật IF-THEN cố định', 'Tính toán ma trận D-H chính xác', 'Kết nối robot với mạng internet công cộng'],
    ARRAY['Huấn luyện robot tự học hành vi tối ưu thông qua quá trình thử và sai để tối đa hóa điểm thưởng tích lũy']::varchar[],
    'RL huấn luyện mô hình thông qua cơ chế phản hồi phần thưởng từ môi trường.',
    6, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_042', 'mcq', 'robot-vision-rl',
    'Trong mô hình RL, "Agent" đại diện cho bộ phận nào của robot?',
    ARRAY['Bộ điều khiển / Thuật toán ra quyết định của robot', 'Động cơ cơ khí vật lý', 'Môi trường phòng lab', 'Hệ thống cảm biến ngoài'],
    ARRAY['Bộ điều khiển / Thuật toán ra quyết định của robot']::varchar[],
    'Agent là thực thể ra quyết định hành động hành vi.',
    5, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_043', 'mcq', 'robot-vision-rl',
    'Tại sao Q-learning truyền thống không thể áp dụng trực tiếp cho việc điều khiển góc khớp của cánh tay robot?',
    ARRAY['Vì góc khớp chuyển động trong không gian liên tục, trong khi Q-learning chỉ hoạt động cho không gian trạng thái/hành động rời rạc nhỏ', 'Vì Q-learning chạy quá chậm', 'Vì Q-learning không hỗ trợ camera', 'Do động cơ servo không đọc được giá trị Q'],
    ARRAY['Vì góc khớp chuyển động trong không gian liên tục, trong khi Q-learning chỉ hoạt động cho không gian trạng thái/hành động rời rạc nhỏ']::varchar[],
    'Không gian khớp liên tục đòi hỏi các giải thuật Policy Gradient (như DDPG, PPO) để xấp xỉ hàm chính sách liên tục.',
    7, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_044', 'mcq', 'robot-vision-rl',
    'Thuật toán RL PPO (Proximal Policy Optimization) được OpenAI phát triển sở hữu ưu điểm gì?',
    ARRAY['Học an toàn, ổn định và tránh được các bước cập nhật chính sách quá lớn gây đổ vỡ hệ thống', 'Không cần tính toán đạo hàm', 'Chỉ dùng cho game cờ vua', 'Tốc độ học nhanh gấp 100 lần DDPG'],
    ARRAY['Học an toàn, ổn định và tránh được các bước cập nhật chính sách quá lớn gây đổ vỡ hệ thống']::varchar[],
    'PPO kẹp (clip) hàm mục tiêu để tránh thay đổi đột ngột hành động, tăng độ tin cậy huấn luyện.',
    7, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_045', 'mcq', 'robot-vision-rl',
    'Thử thách "Sim-to-Real gap" trong RL Robotics nghĩa là gì?',
    ARRAY['Sự lệch pha giữa mô phỏng vật lý ảo và thực tế ngoài đời khiến robot học rất tốt trong simulator nhưng thất bại khi chạy thật', 'Dung lượng file mô phỏng quá nặng', 'Sự chênh lệch tốc độ truyền dữ liệu mạng', 'Hiện tượng trôi sai số của cảm biến IMU'],
    ARRAY['Sự lệch pha giữa mô phỏng vật lý ảo và thực tế ngoài đời khiến robot học rất tốt trong simulator nhưng thất bại khi chạy thật']::varchar[],
    'Simulator ảo không thể mô phỏng chính xác 100% ma sát, độ đàn hồi khớp, nhiễu cảm biến ngoài đời.',
    7, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_046', 'mcq', 'robot-vision-rl',
    'Phương pháp "Domain Randomization" (ngẫu nhiên hóa miền) giúp khắc phục Sim-to-Real gap bằng cách nào?',
    ARRAY['Ngẫu nhiên hóa các thuộc tính vật lý (ma sát, khối lượng, màu sắc, ánh sáng) trong mô phỏng ảo để robot học cách thích nghi rộng', 'Tăng độ phân giải mô phỏng lên tối đa', 'Huấn luyện trực tiếp trên robot thật trong 1 năm', 'Đặt hệ số PID ngẫu nhiên'],
    ARRAY['Ngẫu nhiên hóa các thuộc tính vật lý (ma sát, khối lượng, màu sắc, ánh sáng) trong mô phỏng ảo để robot học cách thích nghi rộng']::varchar[],
    'Domain Randomization biến thế giới thật thành một trường hợp ngẫu nhiên nằm trong dải phân bố robot đã được học trong simulator.',
    7, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_047', 'mcq', 'robot-vision-rl',
    'Hàm phần thưởng (Reward function) được thiết kế như thế nào cho tác vụ cánh tay robot gắp vật?',
    ARRAY['Phần thưởng tỷ lệ nghịch với khoảng cách từ ngón kẹp tới vật thể, cộng điểm lớn khi gắp thành công và phạt nặng nếu va chạm tự hủy', 'Đặt bằng hằng số 1', 'Tăng dần theo thời gian chạy CPU', 'Tỷ lệ thuận với tốc độ quay của động cơ'],
    ARRAY['Phần thưởng tỷ lệ nghịch với khoảng cách từ ngón kẹp tới vật thể, cộng điểm lớn khi gắp thành công và phạt nặng nếu va chạm tự hủy']::varchar[],
    'Thiết kế hàm thưởng (Reward shaping) dẫn dắt robot tự tìm hành vi tối ưu từng bước.',
    6, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_048', 'mcq', 'robot-vision-rl',
    'Nhược điểm lớn nhất của việc huấn luyện Học tăng cường trực tiếp trên robot vật lý thật là gì?',
    ARRAY['Quá trình thử sai hàng triệu lần dễ gây hao mòn cơ khí và nguy cơ va chạm phá hủy phần cứng thật của robot', 'Không thể đo đạc được điểm thưởng', 'Robot không có GPU để tính toán', 'Động cơ servo không hỗ trợ học tăng cường'],
    ARRAY['Quá trình thử sai hàng triệu lần dễ gây hao mòn cơ khí và nguy cơ va chạm phá hủy phần cứng thật của robot']::varchar[],
    'Mất hàng ngàn giờ chạy thật có thể làm hỏng cơ cấu robot trước khi mô hình kịp hội tụ, bắt buộc phải học trước trong mô phỏng.',
    6, 'Robot Machine Learning', 'cs_robot_intelligence', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_049', 'short-answer', 'robot-vision-rl',
    'Điền tên viết tắt tiếng Anh của ngành Học Tăng Cường. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RL']::varchar[],
    'RL là Reinforcement Learning.',
    5, 'Robot Machine Learning', 'cs_robotics_fundamentals', 13, 'cs_robint_05'
  ),
  (
    'cs_robint_q_050', 'short-answer', 'robot-vision-rl',
    'Điền tên viết tắt của thuật toán học tăng cường an toàn kẹp hàm mục tiêu do OpenAI phát triển. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PPO']::varchar[],
    'PPO là Proximal Policy Optimization.',
    6, 'Robot Machine Learning', 'cs_robotics_fundamentals', 13, 'cs_robint_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Behavior Trees vs Finite State Machines (cs_robint_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_051', 'mcq', 'decision-behavior',
    'Nhược điểm lớn nhất của Máy trạng thái hữu hạn (FSM) khi thiết kế hành vi cho robot phức tạp là gì?',
    ARRAY['Bùng nổ số lượng đường chuyển đổi trạng thái tạo thành mã nguồn rối rắm khó bảo trì (Spaghetti code)', 'Robot chạy tốn điện hơn', 'Không kết nối được với cảm biến LiDAR', 'Tốc độ thực thi của FSM quá chậm'],
    ARRAY['Bùng nổ số lượng đường chuyển đổi trạng thái tạo thành mã nguồn rối rắm khó bảo trì (Spaghetti code)']::varchar[],
    'Khi số trạng thái N tăng, số đường chuyển trạng thái tăng theo cấp số nhân N^2, cực kỳ khó quản lý.',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_052', 'mcq', 'decision-behavior',
    'Nút "Sequence" trong Cây hành vi (Behavior Tree) hoạt động theo logic nào?',
    ARRAY['Chạy các nút con lần lượt; dừng lại báo thất bại nếu có 1 con thất bại; chỉ báo thành công khi toàn bộ con thành công', 'Chạy ngẫu nhiên các nút con', 'Báo thành công ngay khi có 1 con thành công', 'Chạy song song tất cả các nút con'],
    ARRAY['Chạy các nút con lần lượt; dừng lại báo thất bại nếu có 1 con thất bại; chỉ báo thành công khi toàn bộ con thành công']::varchar[],
    'Sequence hoạt động như cổng logic AND tuần tự, thích hợp cho chuỗi hành động bắt buộc (ví dụ: Tới kệ -> Gắp vật -> Quay về).',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_053', 'mcq', 'decision-behavior',
    'Nút "Fallback" (hoặc Selector) trong Cây hành vi (Behavior Tree) hoạt động theo logic nào?',
    ARRAY['Chạy các nút con lần lượt; báo thành công ngay khi có 1 con báo thành công; chỉ báo thất bại khi toàn bộ con thất bại', 'Chạy lặp vô hạn', 'Chỉ chạy nút con cuối cùng', 'Tạm dừng toàn bộ hệ thống'],
    ARRAY['Chạy các nút con lần lượt; báo thành công ngay khi có 1 con báo thành công; chỉ báo thất bại khi toàn bộ con thất bại']::varchar[],
    'Fallback hoạt động như cổng logic OR, dùng để thử các giải pháp thay thế (ví dụ: Sạc pin -> Nếu không được thì Thử sạc lại -> Nếu không được thì Báo động).',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_054', 'mcq', 'decision-behavior',
    'Cơ chế "Tick" trong Cây hành vi (Behavior Tree) đóng vai trò gì?',
    ARRAY['Xung tín hiệu phát từ gốc truyền xuống dưới để kích hoạt đánh giá trạng thái và thực thi cây hành vi định kỳ', 'Tiếng kêu tích tắc phát ra từ robot', 'Đo đạc thời gian chạy CPU', 'Hiệu chuẩn vòng quay động cơ'],
    ARRAY['Xung tín hiệu phát từ gốc truyền xuống dưới để kích hoạt đánh giá trạng thái và thực thi cây hành vi định kỳ']::varchar[],
    'Tick giúp cây hành vi liên tục cập nhật trạng thái ở tần số cao (ví dụ 10Hz), giúp robot phản ứng tức thời với thay đổi.',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_055', 'mcq', 'decision-behavior',
    'Ba trạng thái trả về (Return Status) tiêu chuẩn của một nút trong Behavior Tree là gì?',
    ARRAY['SUCCESS, FAILURE, RUNNING', 'TRUE, FALSE, NULL', 'ON, OFF, STANDBY', 'START, PROCESS, END'],
    ARRAY['SUCCESS, FAILURE, RUNNING']::varchar[],
    'SUCCESS (thành công), FAILURE (thất bại), và RUNNING (đang thực thi tác vụ dài hạn).',
    5, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_056', 'mcq', 'decision-behavior',
    'Ưu điểm cốt lõi của Behavior Trees so với FSM là gì?',
    ARRAY['Tính mô-đun hóa và tái sử dụng cao, cho phép thiết kế hành vi phân cấp dễ dàng mà không bị Spaghetti code', 'Độ chính xác động học cao hơn', 'Không cần dùng RAM máy tính', 'Tự động sửa lỗi cảm biến'],
    ARRAY['Tính mô-đun hóa và tái sử dụng cao, cho phép thiết kế hành vi phân cấp dễ dàng mà không bị Spaghetti code']::varchar[],
    'BT cô lập logic trong từng nút, giúp lập trình viên có thể thay thế hoặc thêm nhánh con độc lập.',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_057', 'mcq', 'decision-behavior',
    'Trong BT, nút "Decorator" thực hiện nhiệm vụ gì?',
    ARRAY['Nhận kết quả từ 1 nút con duy nhất và biến đổi nó theo một logic (như đảo ngược kết quả, chạy lặp, giới hạn thời gian)', 'Vẽ đồ thị hành vi', 'Điều khiển van khí nén', 'Đọc dữ liệu từ camera RGB'],
    ARRAY['Nhận kết quả từ 1 nút con duy nhất và biến đổi nó theo một logic (như đảo ngược kết quả, chạy lặp, giới hạn thời gian)']::varchar[],
    'Decorator (nút trang trí) chỉ có duy nhất 1 nút con, dùng để bổ sung logic bổ trợ.',
    6, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_058', 'mcq', 'decision-behavior',
    'Thư viện C++ tiêu chuẩn tích hợp trong ROS2 để xây dựng Cây hành vi cho robot là gì?',
    ARRAY['BehaviorTree.CPP', 'MoveIt2', 'OpenCV', 'PCL'],
    ARRAY['BehaviorTree.CPP']::varchar[],
    'BehaviorTree.CPP là lõi của hệ thống dẫn đường Nav2 trong ROS2.',
    5, 'Robot Behavior', 'cs_robot_intelligence', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_059', 'short-answer', 'decision-behavior',
    'Điền tên viết tắt tiếng Anh của Máy trạng thái hữu hạn. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FSM']::varchar[],
    'FSM là Finite State Machine.',
    5, 'Robot Behavior', 'cs_robotics_fundamentals', 13, 'cs_robint_06'
  ),
  (
    'cs_robint_q_060', 'short-answer', 'decision-behavior',
    'Điền tên tiếng Anh của Cây hành vi. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['behavior tree', 'behavior trees']::varchar[],
    'Behavior Tree quản lý hành vi robot phân cấp.',
    5, 'Robot Behavior', 'cs_robotics_fundamentals', 13, 'cs_robint_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Định vị trong nhà: UWB, BLE Beacons & Sensor Fusion (cs_robint_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_061', 'mcq', 'slam-localization',
    'Tại sao robot tự hành trong nhà kho lớn không thể sử dụng định vị GPS?',
    ARRAY['Sóng GPS từ vệ tinh bị suy hao và chặn hoàn toàn bởi mái bê tông nhà xưởng', 'GPS tiêu tốn quá nhiều pin', 'GPS chỉ chạy ngoài biển', 'Động cơ robot phát sóng nhiễu GPS'],
    ARRAY['Sóng GPS từ vệ tinh bị suy hao và chặn hoàn toàn bởi mái bê tông nhà xưởng']::varchar[],
    'Mái che và tường bê tông hấp thụ sóng vi ba cực yếu từ vệ tinh GPS.',
    5, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_062', 'mcq', 'slam-localization',
    'Công nghệ định vị UWB (Ultra-Wideband) xác định khoảng cách dựa trên nguyên lý sóng vô tuyến nào?',
    ARRAY['Phát các xung vô tuyến siêu ngắn băng thông rộng để đo thời gian bay khứ hồi (ToF)', 'Đo cường độ tín hiệu suy giảm RSSI', 'Đo tần số quét âm thanh', 'Quét tia hồng ngoại'],
    ARRAY['Phát các xung vô tuyến siêu ngắn băng thông rộng để đo thời gian bay khứ hồi (ToF)']::varchar[],
    'UWB sử dụng xung thời gian cực ngắn để tính khoảng cách chính xác đến 5-10cm, vượt trội so với Wi-Fi/Bluetooth.',
    6, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_063', 'mcq', 'slam-localization',
    'Đặc trưng đo đạc khoảng cách của công nghệ BLE Beacons so với UWB là gì?',
    ARRAY['Dựa trên cường độ tín hiệu thu nhận RSSI nên sai số lớn (1m-2m) và dễ bị nhiễu do vật cản kim loại phản xạ', 'Độ chính xác cao đến 1mm', 'Không dùng sóng vô tuyến', 'Tốc độ truyền dữ liệu nhanh hơn'],
    ARRAY['Dựa trên cường độ tín hiệu thu nhận RSSI nên sai số lớn (1m-2m) và dễ bị nhiễu do vật cản kim loại phản xạ']::varchar[],
    'BLE Beacons đo RSSI (Received Signal Strength Indicator), sóng Bluetooth bị suy hao ngẫu nhiên khi đâm xuyên vật cản nên định vị kém chính xác hơn UWB.',
    6, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_064', 'mcq', 'slam-localization',
    'Tại sao robot phải thực hiện "Hợp nhất cảm biến" (Sensor Fusion)?',
    ARRAY['Để tận dụng thế mạnh và bù đắp điểm yếu của từng cảm biến riêng lẻ, cho ra kết quả ước lượng trạng thái tin cậy nhất', 'Để tiết kiệm chi phí mua cảm biến', 'Để giảm tải cho CPU nhúng', 'Để chạy robot không cần pin'],
    ARRAY['Để tận dụng thế mạnh và bù đắp điểm yếu của từng cảm biến riêng lẻ, cho ra kết quả ước lượng trạng thái tin cậy nhất']::varchar[],
    'Ví dụ: IMU phản hồi nhanh nhưng trôi sai số; LiDAR SLAM chính xác nhưng chậm. Hợp nhất hai cảm biến cho ra vị trí vừa mượt vừa không trôi.',
    6, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_065', 'mcq', 'slam-localization',
    'Thuật toán toán học nào là tiêu chuẩn vàng để hợp nhất cảm biến và tuyến tính hóa động học phi tuyến của robot?',
    ARRAY['Extended Kalman Filter (EKF)', 'Bộ điều khiển PID', 'Mạng neuron YOLO', 'Giải thuật tìm đường RRT*'],
    ARRAY['Extended Kalman Filter (EKF)']::varchar[],
    'EKF dự báo và hiệu chỉnh trạng thái robot liên tục bằng cách tính ma trận Jacobian tuyến tính hóa cục bộ phương trình chuyển động phi tuyến.',
    7, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_066', 'mcq', 'slam-localization',
    'Nguyên lý đo khoảng cách TWR (Two-Way Ranging) của UWB hoạt động thế nào?',
    ARRAY['Đo thời gian truyền nhận gói tin khứ hồi giữa trạm phát Anchor và thẻ Tag gắn trên robot', 'Đo pha của sóng điện từ', 'Sử dụng camera đọc mã vạch', 'Đo áp suất không khí'],
    ARRAY['Đo thời gian truyền nhận gói tin khứ hồi giữa trạm phát Anchor và thẻ Tag gắn trên robot']::varchar[],
    'TWR tính thời gian bay thực tế của sóng vô tuyến nhân với vận tốc ánh sáng c để tính khoảng cách.',
    6, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_067', 'mcq', 'slam-localization',
    'Điều kiện môi trường nào gây cản trở nghiêm trọng nhất cho công nghệ định vị UWB?',
    ARRAY['Môi trường có nhiều tường thép, kệ hàng sắt dày che khuất tầm nhìn thẳng (NLOS - Non-Line-of-Sight)', 'Bóng tối hoàn toàn', 'Môi trường quá ồn ào', 'Nhiệt độ phòng lạnh'],
    ARRAY['Môi trường có nhiều tường thép, kệ hàng sắt dày che khuất tầm nhìn thẳng (NLOS - Non-Line-of-Sight)']::varchar[],
    'Sóng UWB bị kim loại chặn hoàn toàn hoặc phản xạ đa đường (multipath), làm sai lệch phép đo thời gian bay khứ hồi.',
    6, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_068', 'mcq', 'slam-localization',
    'Trong hệ điều hành ROS2, node `robot_localization` thường dùng thuật toán nào để xuất ra vị trí odometry hợp nhất?',
    ARRAY['Extended Kalman Filter (EKF)', 'A* Planner', 'YOLO Detector', 'Behavior Tree'],
    ARRAY['Extended Kalman Filter (EKF)']::varchar[],
    'Node `robot_localization` chạy EKF để hợp nhất encoder bánh xe, IMU và GPS/UWB.',
    5, 'Indoor Localization', 'cs_robot_intelligence', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_069', 'short-answer', 'slam-localization',
    'Điền tên viết tắt tiếng Anh của công nghệ sóng vô tuyến định vị trong nhà chính xác cao bằng thời gian bay. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['UWB']::varchar[],
    'UWB là Ultra-Wideband.',
    5, 'Indoor Localization', 'cs_robotics_fundamentals', 13, 'cs_robint_07'
  ),
  (
    'cs_robint_q_070', 'short-answer', 'slam-localization',
    'Điền tên viết tắt của bộ lọc Kalman mở rộng dùng để hợp nhất cảm biến phi tuyến. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['EKF']::varchar[],
    'EKF là Extended Kalman Filter.',
    5, 'Indoor Localization', 'cs_robotics_fundamentals', 13, 'cs_robint_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Định hướng điều phối đa Robot (cs_robint_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_081', 'mcq', 'decision-behavior',
    'Kiến trúc điều phối đa robot "Tập trung" (Centralized) có ưu điểm và nhược điểm gì?',
    ARRAY['Ưu điểm: Tối ưu toàn cục dễ dàng; Nhược điểm: Dễ sập toàn bộ hệ thống nếu máy chủ trung tâm mất kết nối (Single Point of Failure)', 'Ưu điểm: Giá rẻ; Nhược điểm: Robot chạy chậm', 'Ưu điểm: Không cần lập trình; Nhược điểm: Robot dễ đụng nhau', 'Ưu điểm: Bảo mật tuyệt đối; Nhược điểm: Không mở rộng được'],
    ARRAY['Ưu điểm: Tối ưu toàn cục dễ dàng; Nhược điểm: Dễ sập toàn bộ hệ thống nếu máy chủ trung tâm mất kết nối (Single Point of Failure)']::varchar[],
    'Centralized quản lý tất cả thông tin để phân bổ tối ưu lộ trình nhưng bị phụ thuộc hoàn toàn vào kết nối của máy chủ trung tâm.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_082', 'mcq', 'decision-behavior',
    'Kiến trúc điều phối đa robot "Phân tán" (Decentralized) hoạt động dựa trên nguyên lý nào?',
    ARRAY['Mỗi robot tự tính toán đường đi và tự thương lượng tránh va chạm trực tiếp với các robot kề cận', 'Máy chủ trung tâm chỉ đạo từng mili-giây', 'Robot tự động dừng lại đợi con người điều khiển', 'Sử dụng hệ thống dẫn đường bằng la bàn'],
    ARRAY['Mỗi robot tự tính toán đường đi và tự thương lượng tránh va chạm trực tiếp với các robot kề cận']::varchar[],
    'Decentralized phân bổ tính toán xuống từng robot, giúp hệ thống có khả năng mở rộng cao và đáng tin cậy hơn.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_083', 'mcq', 'decision-behavior',
    'Swarm Robotics (Robotics bầy đàn) lấy cảm hứng từ hành vi sinh học nào?',
    ARRAY['Hành vi bầy đàn của côn trùng như bầy ong, kiến tự tổ chức tổ chức xã hội phức tạp từ các cá thể đơn giản', 'Chuyển động của các hạt bụi', 'Sự phân rã nguyên tử', 'Hành vi săn mồi của loài hổ'],
    ARRAY['Hành vi bầy đàn của côn trùng như bầy ong, kiến tự tổ chức tổ chức xã hội phức tạp từ các cá thể đơn giản']::varchar[],
    'Swarm robotics sử dụng hàng trăm robot giá rẻ tự phối hợp bằng tương tác cục bộ đơn giản.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_084', 'mcq', 'decision-behavior',
    'Thuật toán ORCA (Optimal Reciprocal Collision Avoidance) giải quyết bài toán nào cho đa robot?',
    ARRAY['Tránh va chạm đa robot thời gian thực một cách phân tán bằng cách phân chia không gian vận tốc an toàn chung', 'Tìm đường đi ngắn nhất A*', 'Nhận diện nhãn vật thể YOLO', 'Tuning các hệ số PID'],
    ARRAY['Tránh va chạm đa robot thời gian thực một cách phân tán bằng cách phân chia không gian vận tốc an toàn chung']::varchar[],
    'ORCA giả định mỗi robot tự điều chỉnh một nửa trách nhiệm tránh va chạm, tránh rung lắc giật cục khi hai robot đối đầu.',
    7, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_085', 'mcq', 'decision-behavior',
    'Bài toán "Phân bổ tác vụ" (Task Allocation) trong kho thông minh Amazon giải quyết việc gì?',
    ARRAY['Lựa chọn robot tối ưu (gần nhất, đủ pin) để đi gắp kệ hàng tương ứng nhằm tối đa hóa năng suất kho', 'Tính góc quay động cơ servo', 'Vẽ bản đồ SLAM 2D', 'Bật tắt camera giám sát'],
    ARRAY['Lựa chọn robot tối ưu (gần nhất, đủ pin) để đi gắp kệ hàng tương ứng nhằm tối đa hóa năng suất kho']::varchar[],
    'Task Allocation giải bài toán tối ưu tổ hợp (như thuật toán Hungari hoặc đấu giá) để phân bổ tài nguyên hiệu quả.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_086', 'mcq', 'decision-behavior',
    'Cấu hình mạng không dây nào thường được dùng để kết nối các robot tự hành trong mạng phân tán?',
    ARRAY['Wi-Fi Mesh hoặc ZigBee', 'Cáp quang biển', 'Sóng AM/FM', 'Đường truyền Bluetooth 1-1'],
    ARRAY['Wi-Fi Mesh hoặc ZigBee']::varchar[],
    'Mạng Mesh cho phép các robot tự làm cầu nối truyền dữ liệu cho nhau, mở rộng vùng phủ sóng không dây.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_087', 'mcq', 'decision-behavior',
    'Điều gì xảy ra trong hệ thống đa robot tập trung nếu băng thông kết nối wifi nhà kho bị quá tải hoặc nhiễu nặng?',
    ARRAY['Các robot sẽ bị mất kết nối, lập tức dừng chuyển động an toàn để tránh va chạm hỗn loạn', 'Robot chạy nhanh hơn', 'Robot tự động chuyển sang bay', 'Robot tự giải động học ngược'],
    ARRAY['Các robot sẽ bị mất kết nối, lập tức dừng chuyển động an toàn để tránh va chạm hỗn loạn']::varchar[],
    'Mất kết nối trung tâm làm tê liệt toàn bộ luồng điều khiển của hệ thống centralized.',
    5, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_088', 'mcq', 'decision-behavior',
    'Thuộc tính "Khả năng mở rộng" (Scalability) của mạng robot phân tán có nghĩa là gì?',
    ARRAY['Hệ thống dễ dàng hoạt động trơn tru khi tăng số lượng robot lên hàng trăm con mà không gây nghẽn máy chủ trung tâm', 'Robot có thể tự phóng to kích thước cơ khí', 'Robot tự động tăng điện áp pin', 'Robot tự thay đổi mã nguồn c++'],
    ARRAY['Hệ thống dễ dàng hoạt động trơn tru khi tăng số lượng robot lên hàng trăm con mà không gây nghẽn máy chủ trung tâm']::varchar[],
    'Vì không có tính toán tập trung tại một máy chủ, việc thêm robot chỉ tốn thêm giao tiếp cục bộ.',
    6, 'Multi-Robot Systems', 'cs_robot_intelligence', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_089', 'short-answer', 'decision-behavior',
    'Điền từ tiếng Anh chỉ kiến trúc điều phối đa robot có máy chủ trung tâm quản lý. (Viết thường)',
    NULL,
    ARRAY['centralized']::varchar[],
    'Centralized là kiến trúc quản lý tập trung.',
    5, 'Multi-Robot Systems', 'cs_robotics_fundamentals', 13, 'cs_robint_08'
  ),
  (
    'cs_robint_q_090', 'short-answer', 'decision-behavior',
    'Điền từ tiếng Anh chỉ kiến trúc điều phối phân tán không có máy chủ trung tâm quản lý. (Viết thường)',
    NULL,
    ARRAY['decentralized']::varchar[],
    'Decentralized là kiến trúc quản lý phân tán.',
    5, 'Multi-Robot Systems', 'cs_robotics_fundamentals', 13, 'cs_robint_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Tương tác Người - Robot: Thiết kế cử chỉ & HMI (cs_robint_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robint_q_091', 'mcq', 'robot-vision-rl',
    'Ngành khoa học HRI (Human-Robot Interaction) nghiên cứu điều gì?',
    ARRAY['Các giao thức giao tiếp tự nhiên và an toàn giữa con người và robot', 'Cách chế tạo thép cho khung robot', 'Thuật toán tích phân số trị', 'Giao thức truyền dữ liệu CAN bus'],
    ARRAY['Các giao thức giao tiếp tự nhiên và an toàn giữa con người và robot']::varchar[],
    'HRI là tương tác Người - Robot, tối ưu hóa giao tiếp qua giọng nói, cử chỉ, màn hình.',
    5, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_092', 'mcq', 'robot-vision-rl',
    'Thư viện mã nguồn mở nào của Google thường được dùng để trích xuất các điểm mốc xương bàn tay (Hand Landmarks) thời gian thực phục vụ nhận diện cử chỉ?',
    ARRAY['MediaPipe', 'OpenCV', 'Gazebo', 'Pinocchio'],
    ARRAY['MediaPipe']::varchar[],
    'MediaPipe cung cấp các mô hình học máy cực nhẹ chạy thời gian thực trên CPU trích xuất mốc xương tay và cơ thể.',
    6, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_093', 'mcq', 'robot-vision-rl',
    'Hệ thống ASR (Automatic Speech Recognition) thực hiện vai trò gì trong tương tác giọng nói với robot?',
    ARRAY['Chuyển đổi âm thanh giọng nói của con người thành văn bản chữ viết', 'Chuyển văn bản thành giọng nói nhân tạo', 'Lọc tiếng ồn của động cơ', 'Bảo mật dữ liệu đám mây'],
    ARRAY['Chuyển đổi âm thanh giọng nói của con người thành văn bản chữ viết']::varchar[],
    'ASR là nhận dạng giọng nói, bước đầu tiên để robot tiếp nhận lệnh nói.',
    5, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_094', 'mcq', 'robot-vision-rl',
    'TTS (Text-to-Speech) thực hiện vai trò gì trong tương tác giọng nói với robot?',
    ARRAY['Chuyển đổi văn bản chữ viết thành giọng nói nhân tạo phát ra loa', 'Nhận diện cử chỉ tay', 'Lập bản đồ SLAM', 'Điều khiển động cơ servo'],
    ARRAY['Chuyển đổi văn bản chữ viết thành giọng nói nhân tạo phát ra loa']::varchar[],
    'TTS giúp robot phát âm câu trả lời cho con người nghe.',
    5, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_095', 'mcq', 'robot-vision-rl',
    'Độ trễ phản hồi hội thoại của robot xã hội (Social Robot) nên giữ ở mức nào để con người không cảm thấy khó chịu?',
    ARRAY['Dưới 1.5 giây', 'Khoảng 10 giây đến 20 giây', 'Vài phút', 'Không giới hạn'],
    ARRAY['Dưới 1.5 giây']::varchar[],
    'Độ trễ thấp bảo đảm nhịp đối thoại tự nhiên như giữa người với người.',
    6, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_096', 'mcq', 'robot-vision-rl',
    'Tích hợp Mô hình ngôn ngữ lớn (LLM) mang lại ưu thế gì cho robot giao tiếp?',
    ARRAY['Giúp robot hiểu ý định linh hoạt, đối thoại tự nhiên không bị giới hạn trong kịch bản cứng nhắc', 'Giúp robot di chuyển nhanh hơn', 'Tự động sửa lỗi phần cứng động cơ', 'Tăng độ nhạy của cảm biến LiDAR'],
    ARRAY['Giúp robot hiểu ý định linh hoạt, đối thoại tự nhiên không bị giới hạn trong kịch bản cứng nhắc']::varchar[],
    'LLM cung cấp khả năng hiểu ngôn ngữ tự nhiên sâu sắc và sinh phản hồi thông minh.',
    7, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_097', 'mcq', 'robot-vision-rl',
    'Tại sao phản hồi phản hồi thị giác (ví dụ: nháy led mắt, cử chỉ gật đầu) lại quan trọng khi con người ra lệnh cho robot?',
    ARRAY['Để con người biết chắc chắn robot đã tiếp nhận thông tin và đang xử lý lệnh', 'Để làm robot trông dễ thương hơn', 'Để giảm lượng điện tiêu thụ', 'Để tăng độ chính xác D-H'],
    ARRAY['Để con người biết chắc chắn robot đã tiếp nhận thông tin và đang xử lý lệnh']::varchar[],
    'Phản hồi trực quan (Visual Feedback) tạo tâm lý tin tưởng và mượt mà cho quá trình tương tác.',
    5, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_098', 'mcq', 'robot-vision-rl',
    'Cảm biến camera độ sâu (Depth Camera) giúp ích gì cho nhận diện cử chỉ tay so với camera thường?',
    ARRAY['Cung cấp tọa độ 3D giúp tách biệt bàn tay khỏi nền background dễ dàng nhờ khoảng cách Z', 'Chụp được ảnh màu sắc đẹp hơn', 'Tiêu hao ít điện năng hơn', 'Góc nhìn rộng hơn camera thường'],
    ARRAY['Cung cấp tọa độ 3D giúp tách biệt bàn tay khỏi nền background dễ dàng nhờ khoảng cách Z']::varchar[],
    'Khoảng cách chiều sâu giúp cô lập bàn tay ra khỏi hậu cảnh phức tạp chỉ bằng phép lọc ngưỡng khoảng cách.',
    6, 'Human-Robot Interaction', 'cs_robot_intelligence', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_099', 'short-answer', 'robot-vision-rl',
    'Điền tên viết tắt tiếng Anh của tương tác Người - Robot. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['HRI']::varchar[],
    'HRI là Human-Robot Interaction.',
    5, 'Human-Robot Interaction', 'cs_robotics_fundamentals', 13, 'cs_robint_09'
  ),
  (
    'cs_robint_q_100', 'short-answer', 'robot-vision-rl',
    'Điền tên viết tắt tiếng Anh của công nghệ Chuyển văn bản thành Giọng nói. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TTS']::varchar[],
    'TTS là Text-to-Speech.',
    5, 'Human-Robot Interaction', 'cs_robotics_fundamentals', 13, 'cs_robint_09'
  );

COMMIT;
