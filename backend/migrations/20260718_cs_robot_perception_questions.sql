-- SQL migration to seed 100 question bank for cs_robot_perception (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_robot_perception (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_robot_perception';

-- ======================================================================================
-- BÀI GIẢNG 1: Mô hình Camera kim lỗ & Hiệu chuẩn thông số hình học (cs_robper_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_001', 'mcq', 'camera-geometry',
    'Mô hình Camera kim lỗ (Pinhole Camera) mô tả quá trình biến đổi hình học nào?',
    ARRAY['Chiếu phối cảnh vật thể từ không gian 3D thế giới lên mặt phẳng ảnh 2D của camera', 'Biến đổi màu sắc ảnh sang đen trắng', 'Lọc nhiễu tần số cao của camera', 'Xoay ảnh 180 độ quanh tâm'],
    ARRAY['Chiếu phối cảnh vật thể từ không gian 3D thế giới lên mặt phẳng ảnh 2D của camera']::varchar[],
    'Mô hình pinhole chiếu xuyên tâm các tia sáng qua tâm quang học để dựng ảnh 2D phẳng.',
    5, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_002', 'mcq', 'camera-geometry',
    'Thông số nội (Intrinsic Parameters) của camera chứa thông tin về đại lượng cấu tạo nào?',
    ARRAY['Tiêu cự thấu kính (f_x, f_y) và tọa độ tâm ảnh (c_x, c_y)', 'Ma trận xoay R và tịnh tiến t so với mốc thế giới', 'Hệ số ma sát của camera', 'Độ phân giải pixel của cảm biến LiDAR'],
    ARRAY['Tiêu cự thấu kính (f_x, f_y) và tọa độ tâm ảnh (c_x, c_y)']::varchar[],
    'Intrinsic parameters đặc trưng cho cấu tạo hình học bên trong thấu kính thô của camera.',
    6, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_003', 'mcq', 'camera-geometry',
    'Thông số ngoại (Extrinsic Parameters) của camera biểu thị điều gì?',
    ARRAY['Vị trí và hướng xoay của camera trong không gian tọa độ thế giới (ma trận quay R và tịnh tiến t)', 'Tiêu cự thấu kính', 'Độ méo thấu kính', 'Bước sóng hồng ngoại phát ra'],
    ARRAY['Vị trí và hướng xoay của camera trong không gian tọa độ thế giới (ma trận quay R và tịnh tiến t)']::varchar[],
    'Extrinsic parameters định vị tư thế camera so với hệ tọa độ thế giới hoặc hệ tọa độ robot.',
    6, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_004', 'mcq', 'camera-geometry',
    'Mục tiêu chính của việc hiệu chuẩn camera (Camera Calibration) bằng checkerboard là gì?',
    ARRAY['Tính toán ma trận Intrinsic K và các hệ số méo thấu kính để nắn ảnh phẳng chính xác', 'Tăng độ phân giải pixel', 'Đo đạc nhiệt độ cảm biến', 'Tự động lấy nét ống kính'],
    ARRAY['Tính toán ma trận Intrinsic K và các hệ số méo thấu kính để nắn ảnh phẳng chính xác']::varchar[],
    'Hiệu chuẩn camera giúp tính toán các hệ số khử méo hình rìa ảnh, phục vụ đo đạc kích thước thật.',
    6, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_005', 'mcq', 'camera-geometry',
    'Hiện tượng "Méo thấu kính xuyên tâm" (Radial Distortion) gây ra biến dạng hình học nào cho ảnh?',
    ARRAY['Các đường thẳng thực tế ở rìa ảnh bị cong phình (méo phao) hoặc cong lõm (méo gối)', 'Ảnh bị mờ nhòe đều', 'Ảnh bị mất hoàn toàn màu sắc', 'Ảnh bị lệch sang trái 10 pixel'],
    ARRAY['Các đường thẳng thực tế ở rìa ảnh bị cong phình (méo phao) hoặc cong lõm (méo gối)']::varchar[],
    'Radial distortion do khúc xạ ánh sáng lệch tâm thấu kính cong, gây cong biên ảnh.',
    6, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_006', 'mcq', 'camera-geometry',
    'Ký hiệu K trong hình học camera đại diện cho ma trận nào?',
    ARRAY['Intrinsic Matrix (Ma trận thông số nội)', 'Extrinsic Matrix (Ma trận thông số ngoại)', 'Ma trận Jacobian', 'Ma trận hiệp biến nhiễu'],
    ARRAY['Intrinsic Matrix (Ma trận thông số nội)']::varchar[],
    'Ma trận K (thông số nội) có kích thước 3x3 chứa tiêu cự và điểm gốc ảnh.',
    5, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_007', 'mcq', 'camera-geometry',
    'Để nắn ảnh méo thấu kính về ảnh phẳng chuẩn trực quan, ta cần sử dụng các hệ số méo (distortion coefficients) gồm những loại nào?',
    ARRAY['Méo xuyên tâm (Radial) và Méo tiếp tuyến (Tangential)', 'Méo dọc và méo ngang', 'Méo từ trường và méo thấu kính', 'Không có phân loại'],
    ARRAY['Méo xuyên tâm (Radial) và Méo tiếp tuyến (Tangential)']::varchar[],
    'Méo xuyên tâm do hình dáng ống kính; méo tiếp tuyến do cảm biến ảnh không song song tuyệt đối với thấu kính.',
    6, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_008', 'mcq', 'camera-geometry',
    'Khi robot tự hành dịch chuyển, ma trận Extrinsic thay đổi thế nào?',
    ARRAY['Thay đổi liên tục theo quỹ đạo di chuyển của robot', 'Giữ cố định không đổi', 'Chỉ thay đổi tiêu cự', 'Tự động reset về ma trận đơn vị'],
    ARRAY['Thay đổi liên tục theo quỹ đạo di chuyển của robot']::varchar[],
    'Extrinsic matrix biến đổi theo sự tịnh tiến và quay của thân robot mang camera.',
    5, 'Robot Perception', 'cs_robot_perception', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_009', 'short-answer', 'camera-geometry',
    'Điền tên tiếng Anh của ma trận thông số nội camera. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['intrinsic matrix', 'ma trận thông số nội', 'ma trận intrinsic']::varchar[],
    'Intrinsic matrix K chứa thông số thấu kính.',
    5, 'Robot Perception', 'cs_robotics_fundamentals', 13, 'cs_robper_01'
  ),
  (
    'cs_robper_q_010', 'short-answer', 'camera-geometry',
    'Điền số lượng phần tử của ma trận thông số nội K. (Điền số)',
    NULL,
    ARRAY['9']::varchar[],
    'Ma trận K kích thước 3x3 có đúng 9 phần tử.',
    5, 'Robot Perception', 'cs_robotics_fundamentals', 13, 'cs_robper_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Xử lý ảnh 2D cơ bản: Lọc Gaussian, Canny Edge & Contours (cs_robper_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_011', 'mcq', 'camera-geometry',
    'Mục đích của việc chập ảnh (Convolution) với một nhân (Kernel) Gaussian là gì?',
    ARRAY['Làm mượt mịn hình ảnh, giảm nhiễu hạt trước khi xử lý biên cạnh', 'Tăng độ tương phản màu sắc', 'Phóng to kích thước ảnh lên gấp đôi', 'Xoay ngược ảnh'],
    ARRAY['Làm mượt mịn hình ảnh, giảm nhiễu hạt trước khi xử lý biên cạnh']::varchar[],
    'Lọc Gaussian là bộ lọc thông thấp làm nhạt các tần số nhiễu hạt gai cao.',
    5, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_012', 'mcq', 'camera-geometry',
    'Bước đầu tiên của bộ phát hiện cạnh Canny Edge Detector là gì?',
    ARRAY['Lọc Gaussian để giảm nhiễu hình ảnh', 'Tính đạo hàm gradient độ sáng', 'Triệt tiêu điểm không cực đại', 'Lọc ngưỡng kép Hysteresis'],
    ARRAY['Lọc Gaussian để giảm nhiễu hình ảnh']::varchar[],
    'Canny bắt buộc phải khử nhiễu trước để tránh các hạt nhiễu gai bị tính toán nhầm thành biên cạnh.',
    5, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_013', 'mcq', 'camera-geometry',
    'Bước "Triệt tiêu các điểm không phải cực đại" (Non-maximum suppression) trong Canny Edge phục vụ mục đích gì?',
    ARRAY['Làm mỏng nét biên cạnh về độ dày 1 pixel để giữ lại biên sắc nhất', 'Tăng cường độ sáng ảnh', 'Xóa bỏ các pixel màu đen', 'Lọc nhiễu muối tiêu'],
    ARRAY['Làm mỏng nét biên cạnh về độ dày 1 pixel để giữ lại biên sắc nhất']::varchar[],
    'Non-maximum suppression loại bỏ các điểm mờ xung quanh biên, giữ lại đúng đỉnh dốc gradient.',
    6, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_014', 'mcq', 'camera-geometry',
    'Cơ chế "Lọc ngưỡng kép" (Hysteresis Thresholding) trong Canny Edge hoạt động như thế nào?',
    ARRAY['Chỉ giữ lại các cạnh yếu nếu chúng kết nối vật lý với các cạnh mạnh vượt ngưỡng cao', 'Xóa bỏ toàn bộ các cạnh có độ dài ngắn', 'Tự động tính toán ngưỡng dựa trên độ ẩm', 'Không có tác dụng thực tế'],
    ARRAY['Chỉ giữ lại các cạnh yếu nếu chúng kết nối vật lý với các cạnh mạnh vượt ngưỡng cao']::varchar[],
    'Ngưỡng kép sử dụng hai mức High và Low để giữ lại các cạnh mờ liên tục và triệt tiêu nhiễu đốm rời rạc.',
    7, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_015', 'mcq', 'camera-geometry',
    'Khái niệm "Contour" (đường bao) trong xử lý ảnh 2D được hiểu là gì?',
    ARRAY['Một chuỗi liên tiếp các điểm biên cạnh bao quanh một vùng màu sắc hoặc độ sáng đồng nhất', 'Ma trận nội camera K', 'Góc xoay của camera', 'Lớp bản đồ chi phí local'],
    ARRAY['Một chuỗi liên tiếp các điểm biên cạnh bao quanh một vùng màu sắc hoặc độ sáng đồng nhất']::varchar[],
    'Contours giúp khoanh vùng hình dáng vật thể để tính toán trọng tâm hình học (centroids) và hướng xoay.',
    5, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_016', 'mcq', 'camera-geometry',
    'Đạo hàm Gradient của hình ảnh đo đạc đại lượng biến đổi nào của pixel?',
    ARRAY['Tốc độ thay đổi độ sáng tức thời theo hướng trục X và Y', 'Tần số quét khung hình', 'Sự biến đổi màu sắc từ đỏ sang xanh', 'Góc nghiêng của thấu kính'],
    ARRAY['Tốc độ thay đổi độ sáng tức thời theo hướng trục X và Y']::varchar[],
    'Gradient thể hiện độ gắt của biên cạnh: độ dốc càng đứng chứng tỏ cạnh càng rõ.',
    6, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_017', 'mcq', 'camera-geometry',
    'Hàm nhân chập (Kernel) Gaussian Blur có hình dáng ma trận phân bố như thế nào?',
    ARRAY['Giá trị lớn nhất ở tâm ma trận và giảm dần ra các phía xung quanh theo đường cong Gauss', 'Tất cả các phần tử bằng nhau', 'Ma trận đơn vị đường chéo 1', 'Các phần tử có giá trị âm dương xen kẽ'],
    ARRAY['Giá trị lớn nhất ở tâm ma trận và giảm dần ra các phía xung quanh theo đường cong Gauss']::varchar[],
    'Phân bố chuẩn Gauss giúp giữ lại cấu trúc hình dạng cơ bản trong khi triệt tiêu các tần số nhiễu gai nhỏ lẻ.',
    6, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_018', 'mcq', 'camera-geometry',
    'Trong bộ lọc Canny, nếu ta tăng ngưỡng Low threshold lên quá cao, hiện tượng gì sẽ xảy ra?',
    ARRAY['Nhiều cạnh biên thực tế sẽ bị đứt gãy hoặc biến mất hoàn toàn', 'Ảnh sẽ bị đen xì', 'Không có cạnh nào được phát hiện', 'Nét biên cạnh bị dày lên'],
    ARRAY['Nhiều cạnh biên thực tế sẽ bị đứt gãy hoặc biến mất hoàn toàn']::varchar[],
    'Ngưỡng Low quá cao làm đứt luồng kết nối Hysteresis của các cạnh có độ dốc trung bình.',
    6, 'Image Processing', 'cs_robot_perception', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_019', 'short-answer', 'camera-geometry',
    'Điền tên bộ phát hiện biên cạnh ảnh tối ưu 4 bước phổ biến nhất trong OpenCV. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Canny', 'Bộ lọc canny']::varchar[],
    'Canny Edge Detector là giải thuật tìm biên cạnh tối ưu.',
    5, 'Image Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_02'
  ),
  (
    'cs_robper_q_020', 'short-answer', 'camera-geometry',
    'Lọc Gaussian hoạt động như một bộ lọc thông nào đối với tần số hình ảnh? (Viết thường)',
    NULL,
    ARRAY['thông thấp', 'low pass', 'low-pass']::varchar[],
    'Gaussian Blur là bộ lọc thông thấp (low-pass filter).',
    5, 'Image Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Trích xuất đặc trưng hình ảnh: SIFT, SURF & ORB (cs_robper_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_021', 'mcq', 'feature-descriptors',
    'Thuộc tính "Scale-invariant" (bất biến tỷ lệ) của keypoint SIFT có nghĩa là gì?',
    ARRAY['Keypoint vẫn được nhận diện chính xác dù vật thể bị phóng to hay thu nhỏ trong ảnh', 'Không thay đổi khi xoay ảnh', 'Giữ nguyên màu sắc', 'Tốc độ CPU không đổi'],
    ARRAY['Keypoint vẫn được nhận diện chính xác dù vật thể bị phóng to hay thu nhỏ trong ảnh']::varchar[],
    'SIFT tìm keypoint trong không gian tỷ lệ (Scale-space), giúp đối sánh chính xác vật thể ở các khoảng cách xa gần khác nhau.',
    6, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_022', 'mcq', 'feature-descriptors',
    'Thuật toán ORB (Oriented FAST and Rotated BRIEF) sử dụng bộ phát hiện nào để tìm kiếm keypoint siêu tốc?',
    ARRAY['FAST', 'DoG', 'Harris Corner', 'Canny'],
    ARRAY['FAST']::varchar[],
    'FAST (Features from Accelerated Segment Test) kiểm tra vòng tròn 16 pixel xung quanh để tìm góc trong vài micro-giây.',
    6, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_023', 'mcq', 'feature-descriptors',
    'Bộ mô tả BRIEF nhị phân (Binary Descriptor) trong ORB lưu trữ thông tin dưới định dạng nào?',
    ARRAY['Một chuỗi bit nhị phân (bitstring) đại diện cho kết quả so sánh cường độ sáng của các cặp điểm', 'Ma trận số thực 128 chiều', 'Hàm lượng giác sin cos', 'Tệp ảnh màu thu nhỏ'],
    ARRAY['Một chuỗi bit nhị phân (bitstring) đại diện cho kết quả so sánh cường độ sáng của các cặp điểm']::varchar[],
    'BRIEF lưu trữ chuỗi bit (ví dụ 256 bits) giúp tối ưu hóa không gian lưu trữ và so sánh tốc độ cao.',
    6, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_024', 'mcq', 'feature-descriptors',
    'Tại sao ORB descriptor lại cho phép so sánh độ tương đồng (Feature Matching) nhanh gấp hàng trăm lần SIFT?',
    ARRAY['Vì so sánh hai chuỗi bit nhị phân bằng phép toán XOR khoảng cách Hamming cực nhanh trên CPU nhúng', 'Vì ORB không sử dụng bộ nhớ RAM', 'Vì ORB chỉ chạy trên ảnh đen trắng', 'Vì ORB tự động giảm độ phân giải ảnh'],
    ARRAY['Vì so sánh hai chuỗi bit nhị phân bằng phép toán XOR khoảng cách Hamming cực nhanh trên CPU nhúng']::varchar[],
    'Khoảng cách Hamming đếm số bit khác nhau bằng lệnh XOR và popcount phần cứng, nhanh hơn khoảng cách Euclid số thực của SIFT.',
    7, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_025', 'mcq', 'feature-descriptors',
    'Hạn chế lớn nhất của thuật toán SIFT khi ứng dụng cho robot di động tự hành thời gian thực là gì?',
    ARRAY['Tính toán vector 128 số thực quá nặng nề cho CPU nhúng', 'Độ chính xác đối sánh rất kém', 'Nhạy cảm với xoay ảnh', 'Không chạy được trên hệ điều hành Linux'],
    ARRAY['Tính toán vector 128 số thực quá nặng nề cho CPU nhúng']::varchar[],
    'SIFT đòi hỏi tính toán gradient không gian scale-space liên tục, làm quá tải các chip nhúng ARM không có GPU mạnh.',
    6, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_026', 'mcq', 'feature-descriptors',
    'Trong đối sánh đặc trưng (Feature Matching), giải thuật RANSAC thường được kết hợp nhằm mục đích gì?',
    ARRAY['Loại bỏ các cặp điểm đối sánh sai lệch (outliers) để tìm ma trận chuyển đổi chính xác', 'Tăng tốc độ trích xuất keypoints', 'Giảm số lượng pixel ảnh', 'Tự động lấy nét camera'],
    ARRAY['Loại bỏ các cặp điểm đối sánh sai lệch (outliers) để tìm ma trận chuyển đổi chính xác']::varchar[],
    'RANSAC lọc sạch các kết nối sai giữa các chi tiết ảnh tương đồng nhưng không cùng cấu trúc hình học.',
    7, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_027', 'mcq', 'feature-descriptors',
    'Đại lượng "Descriptor" của một keypoint có vai trò gì?',
    ARRAY['Là một vector chữ ký số đại diện cho hoa văn kết cấu xung quanh keypoint dùng để so sánh nhận diện điểm đó ở ảnh khác', 'Đo đạc tọa độ pixel của keypoint', 'Tính tốc độ di chuyển của robot', 'Đo khoảng cách tới vật cản'],
    ARRAY['Là một vector chữ ký số đại diện cho hoa văn kết cấu xung quanh keypoint dùng để so sánh nhận diện điểm đó ở ảnh khác']::varchar[],
    'Descriptor là dấu vân tay của điểm đặc trưng giúp thuật toán phân biệt các góc nhọn khác nhau.',
    6, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_028', 'mcq', 'feature-descriptors',
    'SIFT trích xuất keypoint thông qua việc tìm cực trị của hàm nào?',
    ARRAY['DoG (Difference of Gaussians)', 'Canny Edge', 'Lọc thông thấp Butterworth', 'Ma trận Homography'],
    ARRAY['DoG (Difference of Gaussians)']::varchar[],
    'DoG xấp xỉ Laplacian of Gaussian (LoG) giúp tìm các điểm cực trị không gian scale-space nhanh chóng.',
    7, 'Feature Extraction', 'cs_robot_perception', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_029', 'short-answer', 'feature-descriptors',
    'Điền tên viết tắt tiếng Anh của thuật toán trích xuất keypoint bất biến tỷ lệ của David Lowe. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SIFT']::varchar[],
    'SIFT là Scale-Invariant Feature Transform.',
    5, 'Feature Extraction', 'cs_robotics_fundamentals', 13, 'cs_robper_03'
  ),
  (
    'cs_robper_q_030', 'short-answer', 'feature-descriptors',
    'Điền tên viết tắt tiếng Anh của thuật toán trích xuất đặc trưng nhị phân siêu tốc dùng cho ROS2 vSLAM. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ORB']::varchar[],
    'ORB là Oriented FAST and Rotated BRIEF.',
    5, 'Feature Extraction', 'cs_robotics_fundamentals', 13, 'cs_robper_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Xử lý đám mây điểm 3D & Thư viện PCL (Point Cloud Library) (cs_robper_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_031', 'mcq', 'pointcloud-processing',
    'Đầu vào dữ liệu đám mây điểm 3D (Point Cloud) của robot được đo đạc trực tiếp từ cảm biến nào?',
    ARRAY['LiDAR hoặc Camera độ sâu (Depth Camera)', 'Cảm biến Encoder bánh xe', 'Bộ đo quán tính IMU', 'Cảm biến lực tiếp xúc'],
    ARRAY['LiDAR hoặc Camera độ sâu (Depth Camera)']::varchar[],
    'Point cloud được sinh ra từ các cảm biến quét khoảng cách 3D chủ động.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_032', 'mcq', 'pointcloud-processing',
    'Thư viện lập trình C++ tiêu chuẩn chứa các thuật toán tối ưu xử lý đám mây điểm 3D có tên là gì?',
    ARRAY['PCL (Point Cloud Library)', 'OpenCV', 'MoveIt', 'Nav2'],
    ARRAY['PCL (Point Cloud Library)']::varchar[],
    'PCL là thư viện mã nguồn mở lớn nhất chuyên xử lý hình học 3D rời rạc.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_033', 'mcq', 'pointcloud-processing',
    'Bộ lọc "PassThrough Filter" trong PCL thực hiện nhiệm vụ lọc nào?',
    ARRAY['Cắt bỏ các điểm nằm ngoài một khoảng giới hạn tọa độ do người dùng quy định trên một trục cụ thể', 'Giảm mật độ đám mây điểm đều', 'Tính toán sai số ma sát', 'Xoay đám mây điểm đi 90 độ'],
    ARRAY['Cắt bỏ các điểm nằm ngoài một khoảng giới hạn tọa độ do người dùng quy định trên một trục cụ thể']::varchar[],
    'PassThrough filter giống như nhát cắt không gian (ví dụ: chỉ lấy dữ liệu trong khoảng Z từ 0.5m đến 4.0m).',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_034', 'mcq', 'pointcloud-processing',
    'Bộ lọc "VoxelGrid Filter" trong PCL thực hiện giảm điểm (Downsampling) bằng cách nào?',
    ARRAY['Chia không gian thành các ô lập phương nhỏ (voxels) và thay thế toàn bộ điểm bên trong bằng 1 điểm trọng tâm', 'Xóa ngẫu nhiên một nửa số điểm', 'Chỉ giữ lại các điểm có màu đỏ', 'Lọc bỏ các điểm nằm sát robot'],
    ARRAY['Chia không gian thành các ô lập phương nhỏ (voxels) và thay thế toàn bộ điểm bên trong bằng 1 điểm trọng tâm']::varchar[],
    'VoxelGrid giảm mật độ dữ liệu dư thừa trong khi vẫn bảo toàn hình học bao cảnh 3D của vật thể.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_035', 'mcq', 'pointcloud-processing',
    'Tại sao việc giảm mật độ điểm (Downsampling) bằng VoxelGrid lại bắt buộc trước khi chạy thuật toán tránh vật cản trên robot?',
    ARRAY['Để giảm tải cho tính toán CPU nhúng bằng cách lược bỏ hàng vạn điểm dư thừa lặp lại', 'Để tăng độ nhạy cảm biến LiDAR', 'Để tăng dung lượng ắc quy của robot', 'Do giới hạn của card mạng không dây'],
    ARRAY['Để giảm tải cho tính toán CPU nhúng bằng cách lược bỏ hàng vạn điểm dư thừa lặp lại']::varchar[],
    'Chạy các thuật toán va chạm 3D trực tiếp trên hàng trăm ngàn điểm thô ở tần số cao sẽ làm đơ bộ xử lý nhúng.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_036', 'mcq', 'pointcloud-processing',
    'Đặc trưng hình học rời rạc của Point Cloud khác biệt thế nào so với ảnh kỹ thuật số 2D thông thường?',
    ARRAY['Point Cloud là dữ liệu không có cấu trúc lưới topo cố định, các điểm phân bố tự do trong không gian 3D', 'Point cloud chỉ có màu đen trắng', 'Point cloud không có tọa độ Z', 'Point cloud lưu trữ dưới dạng video'],
    ARRAY['Point Cloud là dữ liệu không có cấu trúc lưới topo cố định, các điểm phân bố tự do trong không gian 3D']::varchar[],
    'Ảnh 2D có cấu trúc pixel dạng ma trận đều $[W \times H]$, point cloud là tập hợp các điểm rời rạc bất định vị trí.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_037', 'mcq', 'pointcloud-processing',
    'Cấu trúc dữ liệu cây nào thường dùng trong PCL để tăng tốc độ tìm kiếm lân cận (nearest neighbor search) giữa các điểm 3D?',
    ARRAY['KD-Tree (K-Dimensional Tree)', 'Cây nhị phân tìm kiếm thông thường', 'Mảng 1 chiều liên kết', 'Bản đồ băm HashMap'],
    ARRAY['KD-Tree (K-Dimensional Tree)']::varchar[],
    'KD-Tree phân vùng không gian nhị phân, giảm độ phức tạp tìm điểm gần nhất từ O(N^2) xuống O(N log N).',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_038', 'mcq', 'pointcloud-processing',
    'Khi LiDAR quét trúng chùm bụi hoặc hơi nước, point cloud thu được sẽ xuất hiện lỗi gì?',
    ARRAY['Các điểm nhiễu lơ lửng biệt lập trong không gian (outliers)', 'Cảm biến bị dừng hoạt động hoàn toàn', 'Bản đồ SLAM bị tự động xóa', 'Tín hiệu điều khiển PID bị mất'],
    ARRAY['Các điểm nhiễu lơ lửng biệt lập trong không gian (outliers)']::varchar[],
    'Các hạt bụi gây phản xạ yếu tạo ra các điểm rác bay lơ lửng, cần lọc bỏ bằng thuật toán SOR.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_039', 'short-answer', 'pointcloud-processing',
    'Điền tên viết tắt tiếng Anh của Thư viện Đám mây Điểm C++. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PCL']::varchar[],
    'PCL là Point Cloud Library.',
    5, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_04'
  ),
  (
    'cs_robper_q_040', 'short-answer', 'pointcloud-processing',
    'Điền tên viết tắt cấu trúc dữ liệu cây đa chiều dùng để tìm kiếm điểm gần nhất nhanh trong PCL. (Viết hoa chữ đầu kèm gạch nối)',
    NULL,
    ARRAY['KD-Tree', 'Kd-tree']::varchar[],
    'KD-Tree là cấu trúc dữ liệu tối ưu tìm kiếm 3D.',
    6, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Phân đoạn mặt phẳng đám mây điểm bằng RANSAC (cs_robper_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_041', 'mcq', 'pointcloud-processing',
    'Mục tiêu chính của việc chạy RANSAC mặt phẳng trên đám mây điểm 3D trước mặt robot tự hành là gì?',
    ARRAY['Nhận diện và phân đoạn mặt phẳng sàn nhà (ground plane) để robot di chuyển an toàn', 'Tính mô-men động cơ bánh xe', 'Mã hóa video camera', 'Điều khiển van khí nén'],
    ARRAY['Nhận diện và phân đoạn mặt phẳng sàn nhà (ground plane) để robot di chuyển an toàn']::varchar[],
    'RANSAC tách biệt các điểm thuộc sàn nhà để robot xác định đường đi trống và cô lập các chướng ngại vật nổi lên.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_042', 'mcq', 'pointcloud-processing',
    'Bước đầu tiên của thuật toán RANSAC để tìm kiếm một mặt phẳng là gì?',
    ARRAY['Chọn ngẫu nhiên 3 điểm không thẳng hàng để dựng một mặt phẳng thử nghiệm', 'Tính toán trung bình cộng toàn bộ đám mây điểm', 'Đo đạc gia tốc IMU', 'Xóa 50% số điểm'],
    ARRAY['Chọn ngẫu nhiên 3 điểm không thẳng hàng để dựng một mặt phẳng thử nghiệm']::varchar[],
    'Cần tối thiểu 3 điểm độc lập để xác định duy nhất phương trình mặt phẳng Ax + By + Cz + D = 0.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_043', 'mcq', 'pointcloud-processing',
    'Trong RANSAC, nhóm "Inliers" (tập đồng thuận) đại diện cho những điểm nào?',
    ARRAY['Các điểm nằm sát mô hình mặt phẳng đang thử nghiệm trong phạm vi khoảng cách sai số cho phép', 'Các điểm nhiễu bay lơ lửng bị loại bỏ', 'Các điểm có màu sáng rực rỡ', 'Các điểm đo đạc bởi encoder bánh xe'],
    ARRAY['Các điểm nằm sát mô hình mặt phẳng đang thử nghiệm trong phạm vi khoảng cách sai số cho phép']::varchar[],
    'Inliers là các điểm ủng hộ cho giả thuyết mặt phẳng hiện tại.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_044', 'mcq', 'pointcloud-processing',
    'Tại sao RANSAC lại cực kỳ hiệu quả đối với dữ liệu thực tế ngoài đời có tỷ lệ nhiễu ngoại lai (outliers) cao?',
    ARRAY['Vì nó hoạt động dựa trên cơ chế lặp chọn mẫu ngẫu nhiên nên không bị ảnh hưởng bởi đống dữ liệu rác khổng lồ', 'Vì nó không tốn bộ nhớ RAM', 'Vì nó tự động tăng độ sáng ảnh', 'Vì nó chạy bằng GPU của card màn hình'],
    ARRAY['Vì nó hoạt động dựa trên cơ chế lặp chọn mẫu ngẫu nhiên nên không bị ảnh hưởng bởi đống dữ liệu rác khổng lồ']::varchar[],
    'Khác với phương pháp bình phương tối thiểu (least squares) bị kéo lệch bởi nhiễu lớn, RANSAC bỏ qua hoàn toàn outliers.',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_045', 'mcq', 'pointcloud-processing',
    'Sau khi tìm được mặt phẳng sàn bằng RANSAC, robot làm thế nào để xác định các chướng ngại vật?',
    ARRAY['Loại bỏ các điểm inliers thuộc mặt sàn, các điểm còn lại nhô lên chính là chướng ngại vật', 'Tăng tốc độ di chuyển tối đa', 'Định tuyến lại địa chỉ IP', 'Tự động gọi cứu hộ cơ khí'],
    ARRAY['Loại bỏ các điểm inliers thuộc mặt sàn, các điểm còn lại nhô lên chính là chướng ngại vật']::varchar[],
    'Tách riêng sàn nhà (inliers) giúp robot chỉ tập trung phân tích hình học của các cụm điểm lồi lên (outliers).',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_046', 'mcq', 'pointcloud-processing',
    'Số lượng điểm tối thiểu cần chọn ngẫu nhiên ở mỗi bước lặp của RANSAC để tìm kiếm một đường thẳng trong không gian 2D là bao nhiêu?',
    ARRAY['2', '3', '4', '1'],
    ARRAY['2']::varchar[],
    'Đường thẳng 2D $y = ax + b$ chỉ cần tối thiểu 2 điểm độc lập để dựng phương trình.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_047', 'mcq', 'pointcloud-processing',
    'Điều kiện dừng của thuật toán RANSAC là gì?',
    ARRAY['Khi số lượng vòng lặp đạt mức tối đa đã thiết lập hoặc khi tìm được mô hình có số inliers vượt ngưỡng yêu cầu', 'Khi robot hết pin', 'Khi cảm biến LiDAR bị lóa sáng', 'Khi hệ điều hành Ubuntu bị shutdown'],
    ARRAY['Khi số lượng vòng lặp đạt mức tối đa đã thiết lập hoặc khi tìm được mô hình có số inliers vượt ngưỡng yêu cầu']::varchar[],
    'Thiết lập số vòng lặp tối đa bảo đảm thuật toán không chạy vô hạn khi dữ liệu quá bẩn.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_048', 'mcq', 'pointcloud-processing',
    'Phương trình toán học tổng quát của mặt phẳng 3D được tìm bởi RANSAC là gì?',
    ARRAY['Ax + By + Cz + D = 0', 'y = ax + b', 'x^2 + y^2 = r^2', 'z = f(x, y)'],
    ARRAY['Ax + By + Cz + D = 0']::varchar[],
    'Phương trình mặt phẳng 3D tổng quát với vector pháp tuyến $n = [A, B, C]^T$.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_049', 'short-answer', 'pointcloud-processing',
    'Điền tên viết tắt của thuật toán lặp chọn mẫu ngẫu nhiên đồng thuận. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RANSAC']::varchar[],
    'RANSAC là RANdom SAmple Consensus.',
    5, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_05'
  ),
  (
    'cs_robper_q_050', 'short-answer', 'pointcloud-processing',
    'Điền tên tiếng Anh chỉ các điểm dữ liệu ủng hộ cho mô hình giả thuyết trong RANSAC. (Viết thường số nhiều)',
    NULL,
    ARRAY['inliers']::varchar[],
    'Inliers là tập hợp điểm đồng thuận.',
    5, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Đăng ký đám mây điểm: Thuật toán ICP (cs_robper_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_051', 'mcq', 'pointcloud-processing',
    'Mục tiêu của thuật toán đăng ký đám mây điểm (Point Cloud Registration) là gì?',
    ARRAY['Tìm ma trận chuyển đổi 3D (xoay R và tịnh tiến t) để khớp trùng hai đám mây điểm lệch góc', 'Tăng số lượng điểm quét của LiDAR', 'Tính toán hệ số PID cho động cơ', 'Mã hóa ảnh màu sang nhị phân'],
    ARRAY['Tìm ma trận chuyển đổi 3D (xoay R và tịnh tiến t) để khớp trùng hai đám mây điểm lệch góc']::varchar[],
    'Point cloud registration căn chỉnh khớp các đám mây điểm thu thập ở các góc/thời điểm khác nhau về cùng hệ quy chiếu.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_052', 'mcq', 'pointcloud-processing',
    'Giải thuật lặp kinh điển nhất dùng để đăng ký đám mây điểm có tên viết tắt là gì?',
    ARRAY['ICP (Iterative Closest Point)', 'RRT*', 'DWA', 'AMCL'],
    ARRAY['ICP (Iterative Closest Point)']::varchar[],
    'ICP liên tục tìm điểm gần nhất và tính ma trận quay/tịnh tiến tối ưu qua từng vòng lặp.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_053', 'mcq', 'pointcloud-processing',
    'Bước đầu tiên ở mỗi vòng lặp của thuật toán ICP là gì?',
    ARRAY['Với mỗi điểm trong đám mây nguồn (Source), tìm điểm gần nhất tương ứng trong đám mây đích (Target)', 'Tính toán ma trận Jacobian hệ thống', 'Xoay đám mây nguồn đi 180 độ', 'Lọc giảm mật độ điểm bằng VoxelGrid'],
    ARRAY['Với mỗi điểm trong đám mây nguồn (Source), tìm điểm gần nhất tương ứng trong đám mây đích (Target)']::varchar[],
    'ICP bắt đầu bằng cách tìm các cặp điểm tương đồng hình học gần nhau nhất.',
    5, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_054', 'mcq', 'pointcloud-processing',
    'Phương pháp toán học nào thường được dùng bên trong ICP để giải nhanh ma trận quay R và tịnh tiến t từ các cặp điểm?',
    ARRAY['Phân tích suy biến ma trận SVD (Singular Value Decomposition)', 'Biến đổi Fourier nhanh FFT', 'Giải thuật Dijkstra', 'Mạng neuron tích chập CNN'],
    ARRAY['Phân tích suy biến ma trận SVD (Singular Value Decomposition)']::varchar[],
    'SVD giải quyết bài toán Orthogonal Procrustes một cách giải tích cực nhanh, cho ra ma trận trực giao R tối ưu.',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_055', 'mcq', 'pointcloud-processing',
    'Yêu cầu trạng thái ban đầu (Initial alignment) quan trọng nhất để ICP hội tụ đúng về nghiệm tối ưu toàn cục là gì?',
    ARRAY['Hai đám mây điểm phải nằm tương đối sát nhau ở vị trí ban đầu (tránh rơi vào tối tiểu cục bộ)', 'Hai đám mây phải nằm vuông góc nhau', 'Đám mây phải có màu sắc đồng nhất', 'Robot phải đứng im tuyệt đối'],
    ARRAY['Hai đám mây điểm phải nằm tương đối sát nhau ở vị trí ban đầu (tránh rơi vào tối tiểu cục bộ)']::varchar[],
    'Vì ICP tìm điểm gần nhất, nếu lệch quá xa, các điểm sẽ bị ghép cặp sai lệch hoàn toàn dẫn tới lặp phân kỳ.',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_056', 'mcq', 'pointcloud-processing',
    'Ứng dụng "LiDAR Odometry" sử dụng ICP như thế nào để ước lượng đường đi của robot?',
    ARRAY['Khớp liên tiếp đám mây điểm quét mới vào đám mây điểm quét cũ để tính toán cự ly di chuyển từng giây', 'Đo đạc tốc độ quay của lốp xe', 'Điều hướng robot bám theo line đất', 'Gửi tọa độ GPS về trung tâm'],
    ARRAY['Khớp liên tiếp đám mây điểm quét mới vào đám mây điểm quét cũ để tính toán cự ly di chuyển từng giây']::varchar[],
    'Bằng cách khớp chồng các khung quét LiDAR kế cận, robot tự tính được sự tịnh tiến và quay của chính mình mà không cần encoder.',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_057', 'mcq', 'pointcloud-processing',
    'Nhược điểm lớn nhất của ICP khi hoạt động trong môi trường có hành lang phẳng dài trơn tru là gì?',
    ARRAY['Thuật toán bị trượt dọc theo hành lang do thiếu các mốc hình học chặn hướng (ambiguity/under-constrained)', 'Robot không thể quay đầu', 'LiDAR bị lóa sáng hoàn toàn', 'Dữ liệu point cloud bị xóa sạch'],
    ARRAY['Thuật toán bị trượt dọc theo hành lang do thiếu các mốc hình học chặn hướng (ambiguity/under-constrained)']::varchar[],
    'Hành lang phẳng không có vật cản chặn đầu làm các điểm trượt dọc khớp nhau đều, làm sai lệch ước lượng quãng đường tiến.',
    7, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_058', 'mcq', 'pointcloud-processing',
    'Để tăng tốc độ chạy của thuật toán ICP trên CPU nhúng, người ta thường làm gì?',
    ARRAY['Chạy bộ lọc VoxelGrid giảm bớt 90% số điểm trước khi thực hiện vòng lặp ICP', 'Tăng góc quét của LiDAR', 'Tắt khâu vi phân PID', 'Sử dụng camera hồng ngoại'],
    ARRAY['Chạy bộ lọc VoxelGrid giảm bớt 90% số điểm trước khi thực hiện vòng lặp ICP']::varchar[],
    'Giảm điểm đầu vào giúp giảm số lượng phép tìm kiếm lân cận gần nhất KD-Tree ở mỗi vòng lặp.',
    6, 'Point Cloud Processing', 'cs_robot_perception', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_059', 'short-answer', 'pointcloud-processing',
    'Điền tên viết tắt tiếng Anh của thuật toán khớp điểm lặp gần nhất. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ICP']::varchar[],
    'ICP là Iterative Closest Point.',
    5, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_06'
  ),
  (
    'cs_robper_q_060', 'short-answer', 'pointcloud-processing',
    'Điền tên viết tắt tiếng Anh của phép toán phân tích ma trận dùng để tính ma trận quay R tối ưu từ các cặp điểm tương đồng. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SVD']::varchar[],
    'SVD là Singular Value Decomposition.',
    5, 'Point Cloud Processing', 'cs_robotics_fundamentals', 13, 'cs_robper_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Nhận diện độ sâu lập thể (Stereo Vision) & Disparity Map (cs_robper_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_061', 'mcq', 'stereo-neural',
    'Nguyên lý cơ bản của thị giác Stereo (Stereo Vision) để đo khoảng cách là gì?',
    ARRAY['Sử dụng 2 camera song song đo độ lệch vị trí (disparity) của cùng một điểm trên hai ảnh để tính toán độ sâu Z', 'Quét tia laser ToF', 'Sử dụng mạng neuron YOLO nhận diện', 'Đo cường độ âm thanh phản xạ'],
    ARRAY['Sử dụng 2 camera song song đo độ lệch vị trí (disparity) của cùng một điểm trên hai ảnh để tính toán độ sâu Z']::varchar[],
    'Stereo vision mô phỏng cặp mắt người tính khoảng cách qua độ lệch ảnh.',
    5, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_062', 'mcq', 'stereo-neural',
    'Đại lượng "Disparity" (độ lệch ảnh) được tính toán thế nào từ tọa độ pixel?',
    ARRAY['Hiệu tọa độ x của cùng một điểm ảnh trên ảnh trái và ảnh phải (d = x_L - x_R)', 'Tổng tọa độ y của hai ảnh', 'Khoảng cách từ camera tới sàn', 'Tỉ lệ phóng to của ống kính'],
    ARRAY['Hiệu tọa độ x của cùng một điểm ảnh trên ảnh trái và ảnh phải (d = x_L - x_R)']::varchar[],
    'Disparity biểu thị sự lệch vị trí ngang do góc nhìn khác nhau giữa hai camera.',
    5, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_063', 'mcq', 'stereo-neural',
    'Mối quan hệ toán học giữa khoảng cách Z thực tế và độ lệch ảnh disparity d là gì?',
    ARRAY['Tỷ lệ nghịch (Z = f * B / d)', 'Tỷ lệ thuận (Z = k * d)', 'Bằng bình phương disparity', 'Không có quan hệ'],
    ARRAY['Tỷ lệ nghịch (Z = f * B / d)']::varchar[],
    'Vật thể càng ở gần camera sẽ có độ lệch ảnh disparity d càng lớn, vật càng ở xa disparity tiến về 0.',
    6, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_064', 'mcq', 'stereo-neural',
    'Đại lượng B (baseline) trong công thức tính độ sâu Stereo biểu thị khoảng cách nào?',
    ARRAY['Khoảng cách vật lý giữa tâm quang học của hai ống kính camera', 'Tiêu cự thấu kính', 'Độ phân giải pixel của cảm biến', 'Bán kính quay vòng của bánh xe'],
    ARRAY['Khoảng cách vật lý giữa tâm quang học của hai ống kính camera']::varchar[],
    'Baseline B là trục cơ sở ngang giữa hai camera đặt song song.',
    5, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_065', 'mcq', 'stereo-neural',
    'Tại sao Stereo Vision lại gặp khó khăn lớn khi đo khoảng cách tới một bức tường trắng trơn đồng màu?',
    ARRAY['Vì thuật toán đối sánh khối (Block Matching) không thể tìm được đặc trưng tương đồng để ghép cặp pixel giữa hai ảnh', 'Vì bức tường hấp thụ sóng hồng ngoại', 'Vì tường trắng phản xạ tia laser', 'Do camera stereo chỉ hoạt động ngoài trời'],
    ARRAY['Vì thuật toán đối sánh khối (Block Matching) không thể tìm được đặc trưng tương đồng để ghép cặp pixel giữa hai ảnh']::varchar[],
    'Vùng đồng màu (textureless) không có chi tiết nổi bật làm thuật toán so khớp pixel bị bế tắc.',
    6, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_066', 'mcq', 'stereo-neural',
    'Ảnh "Disparity Map" (Bản đồ độ lệch ảnh) thường được trực quan hóa thế nào?',
    ARRAY['Vật ở gần có màu sáng rực (disparity lớn), vật ở xa có màu tối đen (disparity nhỏ)', 'Ảnh màu RGB thông thường', 'Bản đồ 2D lưới ô vuông', 'Đồ thị vector vận tốc'],
    ARRAY['Vật ở gần có màu sáng rực (disparity lớn), vật ở xa có màu tối đen (disparity nhỏ)']::varchar[],
    'Disparity map biểu thị khoảng cách tương đối: độ sáng tỷ lệ nghịch với khoảng cách vật lý.',
    5, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_067', 'mcq', 'stereo-neural',
    'Cơ chế "Epipolar Line Constraint" (ràng buộc đường cực cực) giúp tăng tốc độ tìm kiếm pixel tương đồng bằng cách nào?',
    ARRAY['Giới hạn vùng tìm kiếm pixel tương hợp trên ảnh phải dọc theo duy nhất một đường thẳng ngang tương ứng', 'Quét toàn bộ bức ảnh từ trên xuống dưới', 'Chỉ tìm kiếm ở 4 góc ảnh', 'Sử dụng ma trận xoay Jacobian'],
    ARRAY['Giới hạn vùng tìm kiếm pixel tương hợp trên ảnh phải dọc theo duy nhất một đường thẳng ngang tương ứng']::varchar[],
    'Nhờ hiệu chuẩn song song hóa (Stereo Rectification), điểm ở dòng y trên ảnh trái chỉ có thể nằm ở dòng y trên ảnh phải, giảm không gian tìm kiếm từ 2D xuống 1D.',
    7, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_068', 'mcq', 'stereo-neural',
    'Độ chính xác đo khoảng cách của hệ thống camera stereo thay đổi thế nào khi khoảng cách Z tới vật tăng lên quá xa?',
    ARRAY['Độ chính xác giảm mạnh theo hàm bình phương khoảng cách (sai số tăng tỷ lệ thuận với Z^2)', 'Độ chính xác giữ nguyên không đổi', 'Độ chính xác tăng lên', 'Sai số giảm về 0'],
    ARRAY['Độ chính xác giảm mạnh theo hàm bình phương khoảng cách (sai số tăng tỷ lệ thuận với Z^2)']::varchar[],
    'Sai số đo độ sâu tỷ lệ với bình phương khoảng cách Z^2 và tỷ lệ nghịch với baseline B, do đó stereo không đo được vật quá xa.',
    7, 'Stereo Vision', 'cs_robot_perception', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_069', 'short-answer', 'stereo-neural',
    'Điền tên tiếng Anh chỉ khoảng cách lệch pixel ngang giữa ảnh trái và phải. (Viết thường)',
    NULL,
    ARRAY['disparity']::varchar[],
    'Disparity là độ lệch ảnh.',
    5, 'Stereo Vision', 'cs_robotics_fundamentals', 13, 'cs_robper_07'
  ),
  (
    'cs_robper_q_070', 'short-answer', 'stereo-neural',
    'Điền tên tiếng Anh chỉ khoảng cách trục song song giữa 2 camera trong hệ thống stereo. (Viết thường)',
    NULL,
    ARRAY['baseline']::varchar[],
    'Baseline là trục cơ sở giữa 2 camera.',
    5, 'Stereo Vision', 'cs_robotics_fundamentals', 13, 'cs_robper_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Phân đoạn ngữ nghĩa đám mây điểm bằng CNN và U-Net (cs_robper_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_081', 'mcq', 'stereo-neural',
    'Tác vụ "Phân đoạn ngữ nghĩa" (Semantic Segmentation) thực hiện việc gì trên ảnh của robot?',
    ARRAY['Gán một nhãn phân loại (sàn nhà, làn đường, người) cho từng pixel riêng lẻ của ảnh', 'Tìm hộp bao bounding box quanh vật thể', 'Đo đạc cự ly laser', 'Tính ma trận xoay camera'],
    ARRAY['Gán một nhãn phân loại (sàn nhà, làn đường, người) cho từng pixel riêng lẻ của ảnh']::varchar[],
    'Phân đoạn ngữ nghĩa gán lớp nhãn ở mức độ chi tiết pixel, giúp robot nhận thức sâu sắc về môi trường.',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_082', 'mcq', 'stereo-neural',
    'Cấu trúc đối xứng hình chữ U của mạng U-Net gồm hai nhánh chính nào?',
    ARRAY['Nhánh co hẹp (Encoder) trích xuất đặc trưng và Nhánh mở rộng (Decoder) khôi phục độ phân giải ảnh', 'Nhánh lọc Gaussian và nhánh Canny Edge', 'Nhánh RANSAC và nhánh ICP', 'Nhánh UWB và nhánh IMU'],
    ARRAY['Nhánh co hẹp (Encoder) trích xuất đặc trưng và Nhánh mở rộng (Decoder) khôi phục độ phân giải ảnh']::varchar[],
    'Encoder nén ảnh để hiểu ngữ nghĩa ngữ cảnh, Decoder giải nén để khôi phục bản đồ phân đoạn pixel.',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_083', 'mcq', 'stereo-neural',
    'Cơ chế "Skip Connections" (kết nối tắt) trong mạng U-Net có vai trò quan trọng gì?',
    ARRAY['Truyền trực tiếp thông tin không gian chi tiết từ Encoder sang Decoder để khôi phục biên cạnh sắc nét của vật thể', 'Giúp bỏ qua các lớp tích chập để tăng tốc độ', 'Tự động gán nhãn cho ảnh', 'Khử nhiễu cho dữ liệu LiDAR'],
    ARRAY['Truyền trực tiếp thông tin không gian chi tiết từ Encoder sang Decoder để khôi phục biên cạnh sắc nét của vật thể']::varchar[],
    'Skip connections giữ lại các đặc trưng hình học tần số cao bị mất đi trong quá trình pooling của encoder.',
    7, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_084', 'mcq', 'stereo-neural',
    'Mạng U-Net ban đầu được thiết kế ứng dụng cho lĩnh vực nào trước khi phổ biến trong tự hành?',
    ARRAY['Xử lý hình ảnh y tế (Medical Image Segmentation)', 'Drone lái tự động', 'Hệ thống nhận diện biển số xe', 'Robot hút bụi'],
    ARRAY['Xử lý hình ảnh y tế (Medical Image Segmentation)']::varchar[],
    'U-Net thiết kế năm 2015 cho phân đoạn tế bào y tế, sau đó chứng minh độ hiệu quả vượt trội cho mọi phân đoạn ảnh.',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_085', 'mcq', 'stereo-neural',
    'Để chạy mạng phân đoạn ngữ nghĩa thời gian thực trên robot di động sử dụng GPU nhúng, người ta thường dùng công cụ tối ưu nào của NVIDIA?',
    ARRAY['TensorRT', 'RViz2', 'GitLab', 'Gazebo'],
    ARRAY['TensorRT']::varchar[],
    'TensorRT tối ưu hóa đồ thị mạng neuron, hợp nhất các lớp và chuyển kiểu dữ liệu sang FP16/INT8 để tăng tốc độ chạy.',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_086', 'mcq', 'stereo-neural',
    'Lớp "Max Pooling" trong nhánh Encoder thực hiện nhiệm vụ gì?',
    ARRAY['Giảm kích thước không gian của ảnh (trích xuất đặc trưng nổi bật nhất và giảm tính toán)', 'Tăng độ phân giải ảnh', 'Tính đạo hàm Canny', 'Khử méo thấu kính'],
    ARRAY['Giảm kích thước không gian của ảnh (trích xuất đặc trưng nổi bật nhất và giảm tính toán)']::varchar[],
    'Max Pooling lấy giá trị lớn nhất trong vùng ô, làm mờ không gian để tăng vùng cảm nhận (receptive field) ngữ nghĩa.',
    5, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_087', 'mcq', 'stereo-neural',
    'Hàm kích hoạt (Activation Function) thường dùng ở lớp cuối cùng của mạng U-Net cho phân đoạn đa lớp là gì?',
    ARRAY['Softmax', 'ReLU', 'Sigmoid', 'Linear'],
    ARRAY['Softmax']::varchar[],
    'Softmax chuyển đổi đầu ra thành ma trận xác suất phân bố cho từng lớp nhãn tại mỗi pixel.',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_088', 'mcq', 'stereo-neural',
    'Chỉ số đánh giá độ chính xác tiêu chuẩn cho bài toán phân đoạn ngữ nghĩa là gì?',
    ARRAY['IoU (Intersection over Union - Tỉ lệ phần giao trên phần hợp)', 'Độ lệch chuẩn Gauss', 'Hệ số ma sát Coulomb', 'Bán kính quay vòng'],
    ARRAY['IoU (Intersection over Union - Tỉ lệ phần giao trên phần hợp)']::varchar[],
    'IoU đo đạc mức độ chồng lấp giữa vùng phân đoạn dự báo và vùng thực tế (ground truth).',
    6, 'Semantic Segmentation', 'cs_robot_perception', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_089', 'short-answer', 'stereo-neural',
    'Điền tên mạng neuron tích chập đối xứng chữ U phân đoạn pixel ảnh. (Viết hoa chữ đầu kèm gạch nối)',
    NULL,
    ARRAY['U-Net', 'U net']::varchar[],
    'U-Net là mạng phân đoạn pixel ảnh đối xứng.',
    5, 'Semantic Segmentation', 'cs_robotics_fundamentals', 13, 'cs_robper_08'
  ),
  (
    'cs_robper_q_090', 'short-answer', 'stereo-neural',
    'Điền tên viết tắt tiếng Anh của chỉ số giao trên hợp dùng để đánh giá phân đoạn ảnh. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IOU', 'IoU']::varchar[],
    'IoU là Intersection over Union.',
    5, 'Semantic Segmentation', 'cs_robotics_fundamentals', 13, 'cs_robper_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Biến đổi phối cảnh Homography & Ứng dụng nắn ảnh (cs_robper_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_robper_q_091', 'mcq', 'camera-geometry',
    'Ma trận chiếu phối cảnh Homography (H) thực hiện ánh xạ giữa các đối tượng nào?',
    ARRAY['Ánh xạ tọa độ giữa hai mặt phẳng phẳng 2D trong không gian', 'Ánh xạ vận tốc khớp sang vận tốc Descartes', 'Ánh xạ đám mây điểm sang ảnh đen trắng', 'Ánh xạ góc lái sang vị trí bánh xe'],
    ARRAY['Ánh xạ tọa độ giữa hai mặt phẳng phẳng 2D trong không gian']::varchar[],
    'Homography liên kết hai hình ảnh chụp của cùng một bề mặt phẳng từ hai góc nhìn khác nhau.',
    6, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_092', 'mcq', 'camera-geometry',
    'Cần tối thiểu bao nhiêu cặp điểm tương ứng không thẳng hàng để giải ma trận Homography H?',
    ARRAY['4', '3', '2', '8'],
    ARRAY['4']::varchar[],
    'Vì ma trận H kích thước 3x3 có 8 bậc tự do (phần tử thứ 9 là hệ số tỷ lệ chập 1), mỗi cặp điểm cho 2 phương trình độc lập $\rightarrow$ cần tối thiểu 4 cặp điểm.',
    6, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_093', 'mcq', 'camera-geometry',
    'Ứng dụng "Bird''s Eye View" (BEV) của xe tự lái sử dụng Homography để làm gì?',
    ARRAY['Nắn ảnh nghiêng của camera thành ảnh nhìn phẳng phẳng từ trên xuống để đo đạc làn đường', 'Nhận diện biển báo giao thông', 'Tăng tốc độ xử lý CPU', 'Khử nhiễu LiDAR'],
    ARRAY['Nắn ảnh nghiêng của camera thành ảnh nhìn phẳng phẳng từ trên xuống để đo đạc làn đường']::varchar[],
    'BEV loại bỏ hiệu ứng biến dạng xa gần phối cảnh, biến vạch kẻ xiên thành song song dưới mặt sàn.',
    6, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_094', 'mcq', 'camera-geometry',
    'Hạn chế vật lý lớn nhất khi sử dụng phép biến đổi Homography để nắn ảnh là gì?',
    ARRAY['Chỉ áp dụng chính xác cho các bề mặt phẳng hình học (như mặt sàn, vách tường phẳng), các vật thể lồi lên sẽ bị biến dạng kéo dài', 'Không chạy được trên ảnh màu', 'Không hỗ trợ camera độ sâu', 'Gây lóa thấu kính'],
    ARRAY['Chỉ áp dụng chính xác cho các bề mặt phẳng hình học (như mặt sàn, vách tường phẳng), các vật thể lồi lên sẽ bị biến dạng kéo dài']::varchar[],
    'Homography giả thiết toàn bộ các điểm nằm trên 1 mặt phẳng duy nhất. Vật thể 3D nhô lên sẽ bị kéo vệt dài (ghosting distortion).',
    7, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_095', 'mcq', 'camera-geometry',
    'Ma trận Homography H có kích thước bao nhiêu?',
    ARRAY['3x3', '4x4', '2x2', '3x4'],
    ARRAY['3x3']::varchar[],
    'Homography là ma trận vuông 3x3 hoạt động trên hệ tọa độ thuần nhất 2D $[x, y, 1]^T$.',
    5, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_096', 'mcq', 'camera-geometry',
    'Thuật toán nào thường dùng kèm khi tính toán Homography từ hàng trăm điểm keypoint để loại bỏ các điểm so khớp sai?',
    ARRAY['RANSAC', 'Dijkstra', 'Extended Kalman Filter', 'A*'],
    ARRAY['RANSAC']::varchar[],
    'RANSAC tìm ma trận H có số cặp điểm đồng thuận (inliers) lớn nhất, loại bỏ các đường nối chéo sai.',
    6, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_097', 'mcq', 'camera-geometry',
    'Trong OpenCV, hàm nào dùng để tính toán ma trận Homography?',
    ARRAY['cv2.findHomography', 'cv2.Canny', 'cv2.calibrateCamera', 'cv2.warpAffine'],
    ARRAY['cv2.findHomography']::varchar[],
    'Hàm findHomography nhận 2 tập điểm và trả về ma trận H 3x3 kèm mặt nạ lọc inliers.',
    5, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_098', 'mcq', 'camera-geometry',
    'Trong OpenCV, sau khi có ma trận H, ta dùng hàm nào để thực hiện phép nắn biến đổi phối cảnh lên ảnh gốc?',
    ARRAY['cv2.warpPerspective', 'cv2.resize', 'cv2.threshold', 'cv2.blur'],
    ARRAY['cv2.warpPerspective']::varchar[],
    'warpPerspective thực hiện nhân ma trận H và nội suy pixel để tạo ảnh nắn mới.',
    5, 'Image Geometry', 'cs_robot_perception', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_099', 'short-answer', 'camera-geometry',
    'Điền tên tiếng Anh của phép chiếu phối cảnh mặt phẳng phẳng. (Viết thường)',
    NULL,
    ARRAY['homography', 'phép chiếu homography']::varchar[],
    'Homography là phép chiếu phối cảnh mặt phẳng.',
    5, 'Image Geometry', 'cs_robotics_fundamentals', 13, 'cs_robper_09'
  ),
  (
    'cs_robper_q_100', 'short-answer', 'camera-geometry',
    'Điền số lượng điểm tương ứng tối thiểu cần thiết để giải ma trận Homography. (Điền số)',
    NULL,
    ARRAY['4']::varchar[],
    'Cần tối thiểu 4 cặp điểm.',
    5, 'Image Geometry', 'cs_robotics_fundamentals', 13, 'cs_robper_09'
  );

COMMIT;
