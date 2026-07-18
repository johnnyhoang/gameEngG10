-- SQL migration to seed topics and 10 core lessons for cs_robot_perception (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_robot_perception (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('camera-geometry', 'cs_robot_perception', 13, 'Hình học Camera & Ảnh 2D', 'Mô hình camera kim lỗ Pinhole, hiệu chuẩn Intrinsic/Extrinsic, lọc ảnh Gauss, phát hiện cạnh Canny, phối cảnh Homography.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('feature-descriptors', 'cs_robot_perception', 13, 'Trích xuất đặc trưng', 'Thuật toán trích xuất đặc trưng hình ảnh SIFT, ORB, đối sánh đặc trưng và ghép ảnh.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('pointcloud-processing', 'cs_robot_perception', 13, 'Xử lý đám mây điểm 3D', 'Thư viện PCL, lọc VoxelGrid, phân đoạn mặt sàn RANSAC, đăng ký đám mây điểm ICP.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('stereo-neural', 'cs_robot_perception', 13, 'Thị giác Stereo & Học sâu', 'Nhận diện độ sâu Stereo Vision, disparity map, phân đoạn ngữ nghĩa CNN và mạng U-Net.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_robot_perception (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_robper_01', 
    'cs_robot_perception', 
    13, 
    'Hình học Camera & Ảnh 2D', 
    'Mô hình Camera kim lỗ & Hiệu chuẩn thông số hình học', 
    '### 1. Mô hình Camera kim lỗ (Pinhole Camera Model)
Mô hình toán học cơ bản nhất mô tả cách ánh sáng từ vật thể 3D trong không gian đi xuyên qua tâm quang học (pinhole) để chiếu lên mặt phẳng ảnh 2D:
- **Tọa độ pixel:** $(u, v)$ được tính từ tọa độ camera 3D $(X_c, Y_c, Z_c)$ qua tiêu cự $f$ và tâm ảnh $(c_x, c_y)$.

### 2. Thông số nội và ngoại (Intrinsic & Extrinsic Parameters)
- **Intrinsic Matrix (Thông số nội $K$):** Đặc trưng cho cấu tạo thấu kính bên trong camera, chuyển đổi hệ mét 3D sang pixel 2D:
  $$K = \begin{bmatrix} f_x & 0 & c_x \\ 0 & f_y & c_y \\ 0 & 0 & 1 \end{bmatrix}$$
- **Extrinsic Matrix (Thông số ngoại $T_c^w$):** Xác định vị trí và hướng xoay của camera trong không gian thế giới (ma trận quay $R$ và tịnh tiến $t$).

### 3. Hiệu chuẩn Camera (Camera Calibration)
Quy trình tính toán ma trận $K$ và các hệ số méo thấu kính (radial/tangential distortion) bằng cách chụp tấm bia cờ caro (checkerboard) từ nhiều góc độ khác nhau.', 
    'core-theory', 
    '["Sử dụng bia checkerboard đen trắng 9x7 chụp 20 tấm ảnh bằng OpenCV để tìm ma trận Intrinsic K và triệt tiêu méo hình rìa ảnh.", "Mô tả tham số ngoại Extrinsic khi camera di chuyển theo robot, thay đổi ma trận quay R so với mốc thế giới."]'::jsonb, 
    '["Méo thấu kính xuyên tâm (Radial Distortion) làm các đường thẳng ở rìa ảnh bị cong phình (méo phao) hoặc cong lõm (méo gối).", "Trực quan hóa Intrinsic K: f_x, f_y đại diện cho tiêu cự tính theo đơn vị pixel dọc theo 2 trục.", "Hiệu chuẩn camera là bước đầu tiên bắt buộc cho mọi tác vụ đo đạc 3D hoặc Visual SLAM."]'::jsonb, 
    6, 
    TRUE,
    'camera-geometry'
  ),
  (
    'cs_robper_02', 
    'Hình học Camera & Ảnh 2D', 
    13, 
    'Hình học Camera & Ảnh 2D', 
    'Xử lý ảnh 2D cơ bản: Lọc Gaussian, Canny Edge & Contours', 
    '### 1. Phép chập ảnh (Image Convolution)
Kỹ thuật quét một ma trận hạt nhân nhỏ (Kernel - ví dụ $3 \times 3$ hoặc $5 \times 5$) qua toàn bộ các pixel ảnh để tính tổng tích chập nhằm làm mượt hoặc trích xuất biên ảnh.

### 2. Lọc Gaussian (Gaussian Blur)
Lọc nhiễu ảnh bằng nhân chập Gaussian. Giá trị pixel mới là trung bình trọng số của các ô lân cận theo phân bố chuẩn. Giúp làm mịn ảnh, loại bỏ nhiễu hạt trước khi xử lý biên.

### 3. Bộ phát hiện cạnh Canny (Canny Edge Detection)
Giải thuật tìm biên cạnh ảnh tối ưu qua 4 bước:
1. Lọc Gaussian giảm nhiễu.
2. Tính toán đạo hàm Gradient độ sáng (độ gắt của cạnh) theo hướng X và Y.
3. Triệt tiêu các điểm không phải cực đại (Non-maximum suppression) để làm mỏng nét biên cạnh.
4. Lọc ngưỡng kép (Hysteresis Thresholding) để loại bỏ các cạnh yếu rời rạc.

### 4. Tìm đường bao (Contours)
Xâu chuỗi các điểm biên cạnh liên tục có cùng cường độ màu sắc thành các đường bao khép kín, phục vụ việc tính toán diện tích, chu vi vật thể.', 
    'core-theory', 
    '["Áp dụng bộ phát hiện cạnh Canny trong OpenCV: `cv2.Canny(image, low_threshold, high_threshold)` để trích xuất biên của vỏ hộp sản phẩm.", "Lọc Gaussian hạt nhân 5x5 giúp làm nhòe nhiễu hạt camera trước khi chạy thuật toán nhận diện marker."]'::jsonb, 
    '["Lọc Gaussian hoạt động như một bộ lọc thông thấp (low-pass filter) cơ bản cho hình ảnh.", "Canny được coi là bộ phát hiện cạnh chuẩn nhờ đáp ứng biên mỏng nét và tính ổn định trước nhiễu.", "Contours giúp xác định hình dáng vật thể (tròn, vuông) để robot phân loại sản phẩm trên băng chuyền."]'::jsonb, 
    5, 
    TRUE,
    'camera-geometry'
  ),
  (
    'cs_robper_03', 
    'cs_robot_perception', 
    13, 
    'Trích xuất đặc trưng', 
    'Trích xuất đặc trưng hình ảnh: SIFT, SURF & ORB', 
    '### 1. Khái niệm Điểm đặc trưng (Feature Points / Keypoints)
Những điểm ảnh nổi bật (như góc nhọn, điểm giao nhau) có tính độc nhất, không đổi khi thay đổi góc chụp, ánh sáng hoặc kích thước ảnh (Scale-invariant).

### 2. Thuật toán SIFT (Scale-Invariant Feature Transform)
Giải thuật trích xuất đặc trưng mạnh mẽ nhất:
- Tìm keypoints thông qua sai phân Gauss (Difference of Gaussians - DoG) ở các tỷ lệ phóng to thu nhỏ khác nhau.
- Tính vector đặc trưng (descriptor) 128 chiều mô tả sự phân bố hướng của gradient xung quanh keypoint.
- Ưu điểm: Cực kỳ bền bỉ chống xoay ảnh, co giãn tỉ lệ và thay đổi độ sáng.

### 3. Thuật toán ORB (Oriented FAST and Rotated BRIEF)
Thuật toán thay thế miễn phí bản quyền chạy siêu tốc cho robot thời gian thực:
- Dùng bộ phát hiện góc FAST để tìm điểm nhanh.
- Dùng bộ mô tả BRIEF nhị phân để tạo descriptor nhanh dưới dạng chuỗi bit (bitstring).
- Ưu điểm: Nhanh gấp 100 lần SIFT, chạy tốt trên máy tính nhúng.', 
    'core-theory', 
    '["Mô hình vSLAM ORB-SLAM3 trích xuất 1000 keypoint ORB trên mỗi frame camera để đối sánh tìm vị trí robot.", "Ghép hai ảnh phong cảnh bằng cách tìm các điểm mốc tương đồng qua SIFT descriptor rồi thực hiện phép biến đổi RANSAC."]'::jsonb, 
    '["Descriptor nhị phân của ORB cho phép so sánh độ tương đồng bằng phép toán XOR khoảng cách Hamming cực nhanh trên CPU.", "SIFT có độ chính xác cao nhưng tốn nhiều năng lực tính toán và bị bản quyền thương mại trong thời gian dài.", "Feature Matching kết hợp keypoints và descriptors để xác định các cặp điểm trùng nhau giữa hai ảnh chụp lệch góc."]'::jsonb, 
    6, 
    TRUE,
    'feature-descriptors'
  ),
  (
    'cs_robper_04', 
    'cs_robot_perception', 
    13, 
    'Xử lý đám mây điểm 3D', 
    'Xử lý đám mây điểm 3D & Thư viện PCL (Point Cloud Library)', 
    '### 1. Đám mây điểm 3D (Point Cloud)
Tập hợp các điểm trong không gian 3D được đo đạc bởi LiDAR hoặc camera Depth. Mỗi điểm lưu tọa độ $(X, Y, Z)$ và có thể có thêm màu sắc $(R, G, B)$ hoặc cường độ phản xạ (Intensity).

### 2. Thư viện PCL (Point Cloud Library)
Thư viện C++ tiêu chuẩn công nghiệp chứa hàng ngàn thuật toán tối ưu xử lý đám mây điểm 3D.

### 3. Các bộ lọc đám mây điểm cơ bản trong PCL
- **PassThrough Filter:** Lọc cắt không gian theo trục tọa độ (ví dụ: chỉ giữ lại các điểm nằm trong khoảng cách $Z \in [0.5\text{m}, 3\text{m}]$ trước mặt robot).
- **VoxelGrid Filter:** Giảm mật độ đám mây điểm (downsampling) bằng cách chia không gian thành các khối lập phương nhỏ (voxels) và thay thế tất cả các điểm trong voxel bằng trọng tâm của chúng. Giúp tăng tốc độ xử lý CPU.', 
    'core-theory', 
    '["Cắt bớt các điểm nhiễu phản xạ trần nhà kho bằng bộ lọc PassThrough theo trục Y của camera.", "Giảm kích thước đám mây điểm LiDAR từ 100,000 điểm xuống 5,000 điểm bằng bộ lọc VoxelGrid kích thước ô 5cm để chạy thuật toán tránh vật cản."]'::jsonb, 
    '["Point cloud không có cấu trúc topo lưới như ảnh 2D, các điểm phân bố rời rạc không đều.", "VoxelGrid bảo toàn cấu trúc hình học 3D của vật thể trong khi giảm thiểu số lượng dữ liệu dư thừa.", "Đám mây điểm 3D thô đòi hỏi bộ lọc nhiễu thống kê (Statistical Outlier Removal) để loại bỏ các tia quét trượt vào bụi không khí."]'::jsonb, 
    6, 
    TRUE,
    'pointcloud-processing'
  ),
  (
    'cs_robper_05', 
    'cs_robot_perception', 
    13, 
    'Xử lý đám mây điểm 3D', 
    'Phân đoạn mặt phẳng đám mây điểm bằng RANSAC', 
    '### 1. Thuật toán RANSAC (RANdom SAmple Consensus)
Giải thuật lặp ngẫu nhiên cực kỳ mạnh mẽ để tìm kiếm các mô hình toán học (đường thẳng, mặt phẳng) nằm ẩn trong dữ liệu chứa nhiều nhiễu ngoại lai (outliers):
1. Chọn ngẫu nhiên số lượng điểm tối thiểu để xác định mô hình (ví dụ: chọn ngẫu nhiên 3 điểm để dựng 1 mặt phẳng).
2. Tính toán phương trình mặt phẳng đi qua 3 điểm đó: $Ax + By + Cz + D = 0$.
3. Đếm số lượng điểm còn lại nằm sát mặt phẳng này trong khoảng sai số cho phép (gọi là tập đồng thuận - inliers).
4. Lặp lại bước 1-3 nhiều lần. Chọn mặt phẳng có tập đồng thuận inliers lớn nhất.

### 2. Ứng dụng tìm mặt sàn cho Robot di động
Robot tự hành sử dụng RANSAC quét đám mây điểm 3D trước mặt để phân đoạn và tách riêng **Mặt phẳng sàn nhà (Ground Plane)** để robot di chuyển và cô lập các chướng ngại vật nổi lên trên mặt sàn.', 
    'core-theory', 
    '["Chạy RANSAC mặt phẳng trong PCL để loại bỏ hoàn toàn các điểm thuộc sàn nhà ra khỏi point cloud, chỉ giữ lại các điểm lồi lên làm chướng ngại vật.", "Mô tả quá trình RANSAC loại bỏ các điểm nhiễu quét sai lệch nằm lơ lửng trong không gian."]'::jsonb, 
    '["RANSAC cực kỳ hiệu quả khi dữ liệu chứa tỷ lệ nhiễu ngoại lai (outliers) lên tới hơn 50%.", "Số vòng lặp tối thiểu của RANSAC được tính toán dựa trên xác suất bảo đảm chọn trúng một tập điểm sạch.", "Mặt phẳng sàn nhà sau khi phân đoạn được dùng để xác định ma trận chuyển đổi nghiêng roll-pitch của robot so với sàn phẳng."]'::jsonb, 
    7, 
    TRUE,
    'pointcloud-processing'
  ),
  (
    'cs_robper_06', 
    'cs_robot_perception', 
    13, 
    'Xử lý đám mây điểm 3D', 
    'Đăng ký đám mây điểm: Thuật toán ICP (Iterative Closest Point)', 
    '### 1. Bài toán Đăng ký đám mây điểm (Point Cloud Registration)
Tìm kiếm ma trận chuyển đổi tọa độ 3D ($R, t$) để khớp trùng hai đám mây điểm chụp ở hai thời điểm/góc độ khác nhau ($P_{\text{source}}$ và $P_{\text{target}}$).

### 2. Thuật toán ICP (Iterative Closest Point)
Giải thuật lặp kinh điển gồm các bước:
1. Đối với mỗi điểm trong $P_{\text{source}}$, tìm điểm gần nhất tương ứng trong $P_{\text{target}}$.
2. Ước lượng ma trận quay $R$ và tịnh tiến $t$ để tối thiểu hóa tổng bình phương khoảng cách giữa các cặp điểm tương ứng này (bằng phương pháp SVD).
3. Biến đổi đám mây $P_{\text{source}}$ bằng ma trận ($R, t$) vừa tìm được.
4. Lặp lại bước 1-3 đến khi sai số hội tụ dưới ngưỡng cho phép.

### 3. Ứng dụng trong Robot
Đo đạc sự dịch chuyển của robot (Odometry 3D) bằng cách khớp liên tiếp các khung quét LiDAR khi robot di chuyển (LiDAR Odometry).', 
    'core-theory', 
    '["Khớp đám mây điểm 3D quét bởi LiDAR xe tự hành tại giây thứ 1 và giây thứ 2 để tính quãng đường xe vừa đi được.", "ICP căn chỉnh khớp mô hình CAD 3D của linh kiện cơ khí vào đám mây điểm quét thực tế để robot gá kẹp chính xác."]'::jsonb, 
    '["ICP đòi hỏi hai đám mây điểm phải nằm tương đối gần nhau ở trạng thái ban đầu để tránh rơi vào tối tiểu cục bộ.", "Thuật toán KD-Tree được sử dụng trong ICP để tăng tốc độ tìm kiếm điểm gần nhất từ độ phức tạp O(N^2) xuống O(N log N).", "ICP hội tụ rất nhanh nhưng nhạy cảm với các cấu trúc đối xứng phẳng hoàn toàn (ví dụ hành lang dài trơn)."]'::jsonb, 
    7, 
    TRUE,
    'pointcloud-processing'
  ),
  (
    'cs_robper_07', 
    'cs_robot_perception', 
    13, 
    'Thị giác Stereo & Học sâu', 
    'Nhận diện độ sâu lập thể (Stereo Vision) & Disparity Map', 
    '### 1. Nguyên lý Stereo Vision
Mô phỏng cơ chế hai mắt của con người để tính khoảng cách 3D từ hai camera đặt song song cách nhau một khoảng $B$ (baseline):
- Một điểm vật lý $P$ trong không gian sẽ chiếu lên hai mặt phẳng ảnh trái và ảnh phải ở hai vị trí pixel khác nhau ($x_L, x_R$).

### 2. Độ lệch ảnh (Disparity)
Disparity $d$ là hiệu khoảng cách tọa độ pixel của cùng một điểm trên hai ảnh:
$$d = x_L - x_R$$
Khoảng cách thực tế $Z$ từ camera tới vật thể tỉ lệ nghịch với độ lệch ảnh:
$$Z = \frac{f \cdot B}{d}$$
- **Disparity Map:** Bản đồ biểu diễn độ lệch ảnh của từng pixel dưới dạng ảnh xám (vật càng gần có disparity càng lớn $\rightarrow$ ảnh càng sáng).', 
    'core-theory', 
    '["Camera Stereo của robot tự hành bám đuôi người đi bộ đo khoảng cách Z = (700 pixel tiêu cự * 0.12m baseline) / 28 pixel disparity = 3.0 mét.", "Vẽ bản đồ disparity của văn phòng thể hiện rõ các vật cản gần có màu sáng rực rỡ và tường xa có màu tối đen."]'::jsonb, 
    '["Thuật toán đối sánh khối (Block Matching) tìm kiếm pixel tương đồng giữa ảnh trái và ảnh phải dọc theo đường quét ngang Epipolar line.", "Stereo Vision bất lực trước các vùng bề mặt đồng màu (tường trắng) vì không thể tìm được điểm tương đồng giữa hai ảnh.", "Baseline B càng lớn thì tầm đo khoảng cách xa của camera stereo càng tăng nhưng vùng mù cận cảnh càng rộng."]'::jsonb, 
    7, 
    TRUE,
    'stereo-neural'
  ),
  (
    'cs_robper_08', 
    'cs_robot_perception', 
    13, 
    'Thị giác Stereo & Học sâu', 
    'Phân đoạn ngữ nghĩa đám mây điểm bằng CNN và U-Net', 
    '### 1. Phân đoạn ngữ nghĩa (Semantic Segmentation)
Gán một nhãn phân loại (như sàn nhà, vật cản, người đi bộ, làn đường) cho **từng pixel** trên ảnh chụp của robot. Giúp robot hiểu rõ bản chất ngữ nghĩa của môi trường thay vì chỉ biết khoảng cách vật lý.

### 2. Kiến trúc mạng U-Net
Mạng thần kinh tích chập đối xứng kinh điển cho phân đoạn ngữ nghĩa:
- **Nhánh co hẹp (Encoder):** Gồm các lớp tích chập chập và max pooling để trích xuất đặc trưng ngữ nghĩa mức cao.
- **Nhánh mở rộng (Decoder):** Gồm các lớp giải tích chập (up-convolution) để khôi phục lại độ phân giải ban đầu của ảnh.
- **Kết nối tắt (Skip Connections):** Truyền trực tiếp thông tin không gian chi tiết từ encoder sang decoder để bảo toàn biên cạnh vật thể sắc nét.', 
    'core-theory', 
    '["Robot tự hành nông nghiệp chạy mạng U-Net phân đoạn ngữ nghĩa tách biệt vùng cỏ dại (màu đỏ) và cây trồng (màu xanh) để phun thuốc.", "Xe tự lái phân đoạn pixel làn đường nhựa để bám đường cua."]'::jsonb, 
    '["U-Net kết hợp hiệu quả thông tin ngữ nghĩa toàn cục và thông tin không gian chi tiết nhờ cấu trúc skip connections.", "Phân đoạn ngữ nghĩa đòi hỏi dán nhãn dữ liệu huấn luyện (Pixel-level annotation) cực kỳ tốn công sức công phu.", "Mạng U-Net có thể tối ưu chạy thời gian thực trên card đồ họa nhúng NVIDIA Jetson bằng công cụ TensorRT."]'::jsonb, 
    7, 
    TRUE,
    'stereo-neural'
  ),
  (
    'cs_robper_09', 
    'cs_robot_perception', 
    13, 
    'Hình học Camera & Ảnh 2D', 
    'Biến đổi phối cảnh Homography & Ứng dụng nắn ảnh', 
    '### 1. Phép chiếu Homography (Ma trận H)
Ma trận $3 \times 3$ biểu diễn phép chiếu phối cảnh giữa hai mặt phẳng phẳng trong không gian:
$$\begin{bmatrix} x_2 \\ y_2 \\ 1 \end{bmatrix} \sim H \begin{bmatrix} x_1 \\ y_1 \\ 1 \end{bmatrix}$$
Cho phép biến đổi tọa độ pixel từ góc nhìn nghiêng của camera thành góc nhìn phẳng từ trên xuống (Bird''s Eye View - BEV).

### 2. Các bước tính toán Homography
- Cần tối thiểu **4 cặp điểm tương ứng** (không thẳng hàng) giữa hai mặt phẳng để giải hệ phương trình tìm 8 tham số độc lập của ma trận $H$.
- Thuật toán RANSAC thường được tích hợp để tự động loại bỏ các cặp điểm đối sánh sai lệch (outliers).', 
    'core-theory', 
    '["Nắn ảnh camera nghiêng của xe tự hành thành ảnh nhìn thẳng Bird''s Eye View từ trên xuống để dễ dàng đo khoảng cách vạch kẻ làn đường.", "Ghép 2 ảnh chụp chồng lấp góc của robot bằng cách tính ma trận Homography H kết nối đặc trưng ORB giữa 2 ảnh."]'::jsonb, 
    '["Homography chỉ áp dụng chính xác cho các bề mặt phẳng (như mặt sàn nhà, vách tường phẳng).", "Ma trận H có 9 phần tử nhưng chỉ có 8 bậc tự do do có tính đồng nhất tỷ lệ.", "Định vị robot bằng camera hướng xuống sàn nhà (Visual Odometry) phụ thuộc nhiều vào phép tính Homography giữa các frame liên tiếp."]'::jsonb, 
    6, 
    TRUE,
    'camera-geometry'
  ),
  (
    'cs_robper_10', 
    'cs_robot_perception', 
    13, 
    'cs_robot_perception', 
    'Bộ lọc nhiễu thống kê cho LiDAR (Statistical Outlier Removal)', 
    '### 1. Nhiễu trong dữ liệu LiDAR
Khi robot hoạt động ngoài thực tế, bụi bẩn, hơi sương hoặc sự phản xạ chéo tạo ra các điểm quét lỗi lơ lửng trong không gian (nhiễu ngoại lai Outliers).

### 2. Bộ lọc nhiễu thống kê (Statistical Outlier Removal - SOR)
Giải thuật lọc nhiễu dựa trên khoảng cách của các điểm kề cận:
1. Đối với mỗi điểm trong đám mây, tính toán khoảng cách trung bình $d$ tới $k$ điểm lân cận gần nhất của nó.
2. Giả thiết khoảng cách $d$ tuân theo phân bố Gauss. Tính toán giá trị trung bình toàn cục $\mu$ và độ lệch chuẩn $\sigma$ của toàn bộ các khoảng cách này.
3. Loại bỏ các điểm có khoảng cách trung bình vượt quá giới hạn phân bố Gauss cho phép:
   $$d > \mu + \alpha \cdot \sigma$$
   Trong đó $\alpha$ là hệ số lọc (thường chọn từ 1.0 đến 2.0). Giúp dọn dẹp sạch đám mây điểm trước khi chạy SLAM.', 
    'core-theory', 
    '["Chạy bộ lọc SOR trong PCL với k=50 và hệ số \\(\\alpha=1.0\\) để lọc sạch các hạt bụi ảo lơ lửng xung quanh robot.", "Đồ thị phân bố khoảng cách thể hiện rõ các điểm nhiễu lơ lửng có khoảng cách trung bình vượt xa ngưỡng phân bố Gauss."]'::jsonb, 
    '["SOR là bộ lọc dọn dẹp điểm mốc tối ưu nhất cho LiDAR nhưng tốn tài nguyên tìm kiếm lân cận KNN.", "SOR giúp ngăn ngừa thuật toán RANSAC mặt phẳng bị chọn nhầm vào các điểm nhiễu lơ lửng.", "Hệ số lọc \\(\\alpha\\) càng nhỏ thì lọc càng ngặt nghèo nhưng có nguy cơ xóa nhầm các điểm biên cạnh mỏng của vật thể thật."]'::jsonb, 
    6, 
    TRUE,
    'pointcloud-processing'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_robper_01', 'camera-geometry', 'lesson', 'Mô hình Camera kim lỗ & Hiệu chuẩn thông số hình học', '{"lesson_id": "cs_robper_01"}'::jsonb, 10, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_02', 'camera-geometry', 'lesson', 'Xử lý ảnh 2D cơ bản: Lọc Gaussian, Canny Edge & Contours', '{"lesson_id": "cs_robper_02"}'::jsonb, 20, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_03', 'feature-descriptors', 'lesson', 'Trích xuất đặc trưng hình ảnh: SIFT, SURF & ORB', '{"lesson_id": "cs_robper_03"}'::jsonb, 10, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_04', 'pointcloud-processing', 'lesson', 'Xử lý đám mây điểm 3D & Thư viện PCL (Point Cloud Library)', '{"lesson_id": "cs_robper_04"}'::jsonb, 10, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_05', 'pointcloud-processing', 'lesson', 'Phân đoạn mặt phẳng đám mây điểm bằng RANSAC', '{"lesson_id": "cs_robper_05"}'::jsonb, 20, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_06', 'pointcloud-processing', 'lesson', 'Đăng ký đám mây điểm: Thuật toán ICP (Iterative Closest Point)', '{"lesson_id": "cs_robper_06"}'::jsonb, 30, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_07', 'stereo-neural', 'lesson', 'Nhận diện độ sâu lập thể (Stereo Vision) & Disparity Map', '{"lesson_id": "cs_robper_07"}'::jsonb, 10, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_08', 'stereo-neural', 'lesson', 'Phân đoạn ngữ nghĩa đám mây điểm bằng CNN và U-Net', '{"lesson_id": "cs_robper_08"}'::jsonb, 20, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_09', 'camera-geometry', 'lesson', 'Biến đổi phối cảnh Homography & Ứng dụng nắn ảnh', '{"lesson_id": "cs_robper_09"}'::jsonb, 30, 10, 20, 'cs_robot_perception', 13),
  ('act-lesson-cs_robper_10', 'pointcloud-processing', 'lesson', 'Bộ lọc nhiễu thống kê cho LiDAR (Statistical Outlier Removal)', '{"lesson_id": "cs_robper_10"}'::jsonb, 40, 10, 20, 'cs_robot_perception', 13)
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
