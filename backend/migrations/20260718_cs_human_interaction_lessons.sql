-- SQL migration to seed topics and 10 core lessons for cs_human_interaction (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_human_interaction (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('cobot-safety', 'cs_human_interaction', 13, 'Robot cộng tác & An toàn', 'Robot cộng tác Cobots, tiêu chuẩn ISO/TS 15066 giới hạn lực va chạm, nút dừng khẩn vật lý E-Stop, Teach Pendant.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('uncanny-social', 'cs_human_interaction', 13, 'Thung lũng kỳ lạ & Robot xã hội', 'Thung lũng kỳ lạ Uncanny Valley, tương tác ánh mắt xã hội Mutual Gaze, giao tiếp phi ngôn ngữ, robot hỗ trợ xã hội.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('multimodal-interaction', 'cs_human_interaction', 13, 'Tương tác đa phương thức', 'Nhận diện khung xương người MediaPipe, nhận diện giọng nói ASR/TTS khử nhiễu công nghiệp, điều khiển cử chỉ hand gestures.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('safe-zones', 'cs_human_interaction', 13, 'Vùng làm việc an toàn', 'Vùng bảo vệ ảo Safety Zones, cảm biến LiDAR an toàn, hệ thống giảm tốc độ thích nghi khi người đi lại gần.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_human_interaction (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_humint_01', 
    'cs_human_interaction', 
    13, 
    'Robot cộng tác & An toàn', 
    'Robot cộng tác (Cobots) & Tiêu chuẩn an toàn ISO/TS 15066', 
    '### 1. Khái niệm Robot cộng tác (Cobots)
Cobots (Collaborative Robots) là robot được thiết kế để làm việc chung không gian trực tiếp với con người mà không cần hàng rào bảo vệ sắt ngăn cách:
- Khác với robot công nghiệp truyền thống vốn cực kỳ nguy hiểm, sẵn sàng vung tay bẻ gãy bất cứ vật cản nào trên đường đi.

### 2. Tiêu chuẩn ISO/TS 15066
Quy định nghiêm ngặt về giới hạn lực và áp lực va chạm lên từng vùng cơ thể người:
- **Chế độ hạn chế lực và công suất (PFL - Power and Force Limiting):** Khớp robot tích hợp cảm biến mô-men xoắn. Khi va chạm nhẹ với tay người, lực cản đột ngột vượt quá ngưỡng cài đặt (ví dụ 150N), robot lập tức kích hoạt phanh dừng khẩn cấp an toàn trong mili-giây.', 
    'core-theory', 
    '["Cánh tay robot UR5 gắp linh kiện cơ khí chung bàn với công nhân, tự động dừng khựng lại khi chạm khủy tay người.", "Cài đặt giới hạn lực va chạm tối đa 140 Newton cho khớp vai robot theo quy chuẩn ISO/TS 15066."]'::jsonb, 
    '["Robot cộng tác bắt buộc phải có thiết kế bo tròn các góc cạnh cơ khí và không có khe hẹp gây kẹt ngón tay người đeo.", "PFL sử dụng các cảm biến mô-men khớp trực tiếp hoặc đo dòng điện động cơ phản hồi để suy ra lực va chạm đầu ngón.", "ISO 10218 và ISO/TS 15066 là bộ tiêu chuẩn an toàn cốt lõi cho mọi tích hợp hệ thống Cobots trong nhà máy."]'::jsonb, 
    6, 
    TRUE,
    'cobot-safety'
  ),
  (
    'cs_humint_02', 
    'Thung lũng kỳ lạ & Robot xã hội', 
    13, 
    'Thung lũng kỳ lạ & Robot xã hội', 
    'Hiện tượng Thung lũng kỳ lạ (Uncanny Valley)', 
    '### 1. Khái niệm Thung lũng kỳ lạ
Giả thuyết tâm lý học mô tả cảm xúc con người đối với robot có diện mạo giống người:
- Khi độ giống người của robot tăng lên, sự thiện cảm của con người tăng dần.
- Tuy nhiên, khi robot đạt mức **gần như giống hệt người** nhưng vẫn có những chi tiết phi tự nhiên nhỏ (như ánh mắt đờ đẫn vô hồn, da silicon lạnh, cử động giật cục), sự thiện cảm đột ngột sụt sâu xuống vùng **Ghê sợ/Kỳ dị (Thung lũng kỳ lạ)**.
- Khi robot đạt mức giống hệt người hoàn hảo không tì vết, sự thiện cảm quay trở lại mức tối đa.

### 2. Ứng dụng trong thiết kế Robot
Thiết kế robot phục vụ cộng đồng (như robot tiếp tân, robot phục vụ) thường chọn phong cách hoạt hình (mô phỏng sinh học thân thiện dạng robot máy) thay vì cố tạo mặt người thật để tránh rơi vào thung lũng ghê sợ.', 
    'core-theory', 
    '["Robot tiếp tân Hanson Sophia gây ra cảm giác rờn rợn cho người đối diện vì nét mặt cử động giống người nhưng ánh mắt đứng im vô hồn.", "Thiết kế robot phục vụ Pepper với hình dạng hoạt hình đáng yêu nhận được thiện cảm lớn từ trẻ em."]'::jsonb, 
    '["Thung lũng kỳ lạ do Ernst Jentsch định nghĩa ban đầu và được giáo sư Masahiro Mori đưa vào robotics năm 1970.", "Ánh mắt đờ đẫn (dead stare) và sự thiếu đồng bộ micro-expressions (biểu cảm vi mô cơ mặt) là nguyên nhân hàng đầu gây ra cảm giác ghê rợn.", "Tránh rơi vào thung lũng kỳ lạ bằng cách thiết kế robot rõ ràng là một chiếc máy thông minh thân thiện."]'::jsonb, 
    6, 
    TRUE,
    'uncanny-social'
  ),
  (
    'cs_humint_03', 
    'Robot cộng tác & An toàn', 
    13, 
    'Robot cộng tác & An toàn', 
    'Giao diện Người - Robot vật lý: Nút dừng khẩn cấp E-Stop & Teach Pendant', 
    '### 1. Nút dừng khẩn cấp (Emergency Stop - E-Stop)
Linh kiện an toàn phần cứng bắt buộc trên mọi hệ thống robot:
- Nút nhấn màu đỏ hình nấm trên nền vàng.
- **Mạch ngắt vật lý trực tiếp:** Nhấn nút sẽ ngắt trực tiếp nguồn điện cấp cho các driver động cơ (mạch rơ-le ngắt cứng), bypass hoàn toàn phần mềm máy tính để bảo đảm dừng tức khắc kể cả khi hệ điều hành bị treo.

### 2. Bàn dạy học Robot (Teach Pendant)
Thiết bị cầm tay kết nối với bộ điều khiển robot giúp người vận hành:
- Di chuyển robot thủ công (Jogging) để lưu trữ các điểm tọa độ mục tiêu.
- Lập trình quỹ đạo trực quan.
- Tích hợp nút **Deadman Switch (Nút ba vị trí):** Người vận hành phải bóp nhẹ nút này ở nấc giữa để cho phép robot chạy thủ công; nếu buông tay hoặc bóp quá chặt (do giật mình khi gặp sự cố), robot lập tức ngắt phanh dừng lại.', 
    'core-theory', 
    '["Kỹ sư vận hành bóp giữ Deadman Switch bằng tay trái trong khi tay phải bấm phím điều khiển robot UR di chuyển lưu điểm gá kẹp.", "Nhấn nút E-Stop màu đỏ trên tủ điện cứu mạng công nhân khi cánh tay robot bị kẹt xích kéo tải."]'::jsonb, 
    '["Nút E-Stop phải được thiết kế có cơ cấu khóa cơ khí, nhấn vào phải tự khóa cứng ở vị trí ngắt, muốn chạy lại phải xoay núm để nhả khóa.", "Deadman Switch hoạt động dựa trên phản xạ tự nhiên của con người khi hoảng loạn: hoặc buông lỏng tay hoặc bóp chặt tay.", "Teach Pendant hiện đại sử dụng màn hình cảm ứng điện dung tích hợp mô phỏng đồ họa 3D trực quan."]'::jsonb, 
    5, 
    TRUE,
    'cobot-safety'
  ),
  (
    'cs_humint_04', 
    'Tương tác đa phương thức', 
    13, 
    'Tương tác đa phương thức', 
    'Ước lượng dáng người (Human Pose Estimation) trong điều khiển Robot', 
    '### 1. Khái niệm Human Pose Estimation
Thuật toán thị giác máy tính nhận diện và định vị các điểm mốc khớp xương chính trên cơ thể người (như vai, khủy tay, cổ tay, đầu gối) từ ảnh camera 2D/3D.

### 2. Thư viện MediaPipe & OpenPose
- **MediaPipe Hands/Pose:** Giải pháp mã nguồn mở chạy thời gian thực siêu nhẹ của Google, xuất tọa độ 3D của 33 điểm mốc cơ thể và 21 điểm mốc bàn tay.
- **Ứng dụng điều khiển Robot:**
  - Robot bám đuôi người đi bộ bằng cách bám theo tọa độ trọng tâm cơ thể.
  - Điều khiển cánh tay robot từ xa (Teleoperation) bằng cách ánh xạ góc xoay khớp vai và khủy tay của con người sang góc xoay tương ứng của khớp robot.', 
    'core-theory', 
    '["Camera gắn trên robot lau kính đo đạc góc vai của kỹ sư điều khiển bằng MediaPipe Pose để gập góc chổi lau tương ứng.", "Robot AGV tự động chạy bám đuôi người kho hàng nhờ camera RGB theo dõi vị trí điểm mốc hông xương người."]'::jsonb, 
    '["Human Pose Estimation chuyển đổi hình ảnh pixel thành ma trận tọa độ điểm mốc (keypoints) dạng số thực.", "Teleoperation hỗ trợ điều khiển robot làm việc trong môi trường độc hại (như rò rỉ phóng xạ, hầm mỏ sâu) an toàn từ xa.", "Nhiễu tự che khuất (Self-occlusion) xảy ra khi tay người che mất vai dưới góc nhìn camera, đòi hỏi thuật toán dự báo Kalman Filter bù đắp điểm mốc bị mất."]'::jsonb, 
    6, 
    TRUE,
    'multimodal-interaction'
  ),
  (
    'cs_humint_05', 
    'Tương tác đa phương thức', 
    13, 
    'Tương tác đa phương thức', 
    'Tương tác giọng nói tự nhiên trong môi trường công nghiệp', 
    '### 1. Thách thức tiếng ồn công nghiệp (Factory Noise)
Nhà xưởng sản xuất chứa nhiều tiếng ồn máy động cơ, tiếng búa gõ tần số lớn làm méo dạng sóng âm thanh giọng nói của con người, gây sai lệch nghiêm trọng cho bộ nhận dạng tiếng nói (ASR).

### 2. Quy trình xử lý giọng nói cho Robot công nghiệp
1. **Khử nhiễu micro mảng (Microphone Array Beamforming):** Sử dụng nhiều micro song song phối hợp pha để triệt tiêu âm thanh đến từ các hướng xung quanh, chỉ tập trung thu âm từ hướng miệng người điều khiển nói.
2. **Kích hoạt bằng từ khóa (Keyword Spotting - KWS):** Robot chạy mạng neuron siêu nhỏ chế độ chờ, chỉ khởi động xử lý lệnh lớn khi nghe thấy từ khóa cụ thể (ví dụ: "Hey Heo Maikawaii").
3. **Hiểu ý định (NLU - Natural Language Understanding):** Chuyển câu nói thành lệnh điều khiển cấu trúc JSON gửi cho ROS2.', 
    'core-theory', 
    '["Robot hàn tự động nhận lệnh giọng nói \"Dừng hàn ngay\" từ công nhân nhờ mảng 4 micro lọc hướng chùm tia beamforming khử tiếng ồn máy dập xung quanh.", "Mạch xử lý KWS nhúng trên chip STM32 lắng nghe từ khóa kích hoạt để đánh thức luồng xử lý giọng nói chính."]'::jsonb, 
    '["Beamforming đo chênh lệch thời gian nhận sóng âm (TDoA) giữa các đầu micro để tính toán góc hướng nguồn phát âm thanh.", "NLU chuyển câu lệnh nói tự nhiên \"lấy cho tôi con ốc vít\" thành cấu trúc dữ liệu lệnh `{\"action\": \"fetch\", \"object\": \"screw\"}`.", "Phản hồi giọng nói TTS (Text-to-Speech) giúp robot báo cáo trạng thái lỗi nhẹ bằng tiếng Việt thân thiện."]'::jsonb, 
    7, 
    TRUE,
    'multimodal-interaction'
  ),
  (
    'cs_humint_06', 
    'Vung làm việc an toàn', 
    13, 
    'Vùng làm việc an toàn', 
    'Thiết lập vùng bảo vệ ảo (Safety Zones) bằng LiDAR an toàn', 
    '### 1. LiDAR an toàn (Safety Laser Scanner)
Thiết bị LiDAR đạt chuẩn chứng nhận an toàn công nghiệp (như SIL3, PLd) chuyên quét mặt phẳng nằm ngang cách mặt đất 15cm để phát hiện chân người di chuyển.

### 2. Thiết lập các vùng bảo vệ (Safety Fields)
ROS2 Nav2 phân chia khu vực xung quanh robot tự hành thành 3 vùng đồng tâm động:
1. **Warning Zone (Vùng cảnh báo xa):** Khi con người đi vào vùng này, robot phát âm thanh cảnh báo hoặc nháy đèn vàng, đồng thời giảm tốc độ đi 50%.
2. **Reduced Speed Zone (Vùng giảm tốc gần):** Robot giảm tốc độ tối đa xuống cực thấp (như 0.2m/s) để hạn chế động năng va chạm.
3. **Stop Zone (Vùng dừng tuyệt đối):** Vùng sát cơ thể robot (như 30cm). Người đi vào vùng này lập tức kích hoạt phanh điện từ ngắt động cơ dừng khựng robot lại.', 
    'core-theory', 
    '["Robot tự hành AMR thiết lập vùng Stop Zone bán kính 0.4 mét quét bằng LiDAR an toàn SICK để dừng ngay khi có người bước cắt ngang đầu xe.", "RViz2 trực quan hóa vùng Warning màu vàng rộng 2m và vùng Stop màu đỏ sát thân robot."]'::jsonb, 
    '["LiDAR an toàn tích hợp mạch phần cứng tự kiểm tra lỗi (dual-channel outputs) để bảo đảm báo lỗi ngắt xe khi mắt quét bị bụi bẩn che khuất.", "Vùng an toàn có thể tự động co giãn kích thước động tỷ lệ thuận với tốc độ tiến hiện tại của robot (tốc độ nhanh cần vùng stop dài hơn).", "Giảm tốc độ giúp giảm động năng $E_k = 0.5 m v^2$ theo hàm bình phương, giảm thiểu lực chấn thương va đập vật lý."]'::jsonb, 
    6, 
    TRUE,
    'safe-zones'
  ),
  (
    'cs_humint_07', 
    'Thung lũng kỳ lạ & Robot xã hội', 
    13, 
    'Thung lũng kỳ lạ & Robot xã hội', 
    'Giao tiếp phi ngôn ngữ bằng ánh mắt của Robot', 
    '### 1. Tương tác ánh mắt xã hội (Mutual Gaze)
Trong giao tiếp, ánh mắt là kênh truyền đạt ý định mạnh mẽ nhất:
- Robot đồng hành quay đầu và camera hướng thẳng về phía mắt người đối diện khi giao tiếp để thể hiện sự lắng nghe và thấu hiểu.

### 2. Báo trước hướng di chuyển (Intent Expression)
Để tránh người đi bộ bị giật mình hoặc hiểu lầm hướng đi của robot trong hành lang hẹp:
- Robot tự nghiêng thân nhẹ về phía chuẩn bị rẽ trước khi bẻ bánh lái (như hành vi xi nhan sinh học).
- Xoay cụm camera/mắt quét đầu robot nhìn về hướng cua trước để báo trước ý định cho con người đi đối diện tránh đường chủ động.', 
    'core-theory', 
    '["Robot giao hàng AMR xoay cụm camera mắt hướng sang trái 2 giây trước khi cua trái giúp người đi bộ chủ động tránh sang phải.", "Robot chăm sóc người già Paro chớp mắt nhẹ nhàng nghiêng đầu đáp ứng tiếng gọi tạo cảm giác ấm áp tin tưởng."]'::jsonb, 
    '["Tương tác ánh mắt Mutual Gaze yêu cầu chạy thuật toán nhận diện mắt người (Eye Gaze Tracking) thời gian thực.", "Giao tiếp phi ngôn ngữ (non-verbal communication) giúp robot hòa nhập êm ái vào xã hội con người mà không gây căng thẳng tâm lý.", "Đèn tín hiệu LED chạy ma trận dải màu quanh thân robot cũng là phương thức báo hướng di chuyển trực quan cao."]'::jsonb, 
    6, 
    TRUE,
    'uncanny-social'
  ),
  (
    'cs_humint_08', 
    'Tương tác đa phương thức', 
    13, 
    'Tương tác đa phương thức', 
    'Điều khiển Robot rảnh tay bằng cử chỉ radar sóng milimet (mmWave)', 
    '### 1. Hạn chế của camera khi nhận dạng cử chỉ bàn tay
Camera thông thường dễ bị ảnh hưởng bởi điều kiện thiếu sáng hoặc bị bụi bẩn che mờ thấu kính ống kính trong môi trường công nghiệp nặng.

### 2. Radar sóng milimet (mmWave Radar)
Công nghệ cảm biến phát sóng điện từ tần số cực cao (như 60GHz - 77GHz):
- Đo đạc độ lệch tần số Doppler siêu nhỏ tạo bởi chuyển động của các ngón tay.
- **Ưu điểm:** Bất chấp bóng đêm, sương mù bụi bẩn, có thể xuyên qua các lớp găng tay bảo hộ dày của công nhân.
- Thuật toán phân loại cử chỉ dùng mạng LSTM nhỏ nhận diện các cử chỉ: vuốt trái (lùi xe), vuốt phải (tiến xe), nắm tay (dừng khẩn cấp).', 
    'core-theory', 
    '["Công nhân kho hàng đeo găng tay dày, vuốt tay trước cảm biến mmWave để lệnh cho xe nâng tự động hạ pallet xuống đất.", "Mạng LSTM phân loại tín hiệu phản xạ radar 77GHz thành 5 cử chỉ tay điều khiển cánh tay gắp."]'::jsonb, 
    '["Radar mmWave đo cự ly, vận tốc hướng tâm và góc hướng của vật thể chuyển động siêu nhạy.", "Tín hiệu phản xạ của radar tạo ra bản đồ đám mây điểm vi mô Doppler-Range, phân tích cấu trúc chuyển động của các ngón tay.", "Không xâm phạm quyền riêng tư hình ảnh con người như camera thông thường."]'::jsonb, 
    7, 
    TRUE,
    'multimodal-interaction'
  ),
  (
    'cs_humint_09', 
    'Thung lũng kỳ lạ & Robot xã hội', 
    13, 
    'Thung lũng kỳ lạ & Robot xã hội', 
    'Robot hỗ trợ xã hội (Socially Assistive Robots - SAR)', 
    '### 1. Khái niệm SAR
Robot được thiết kế chuyên biệt để tương tác xã hội, đồng hành, động viên tinh thần hoặc hỗ trợ vật lý trị liệu cho con người thông qua các hoạt động giao tiếp phi vật lý (như robot thú cưng chăm sóc bệnh nhân sa sút trí tuệ).

### 2. Thiết kế âm thanh cảm xúc (Emotional Sound Design)
Robot không nói tiếng người trực tiếp mà sử dụng các âm thanh bíp bíp, giai điệu ngắn phi tuyến tính (mô phỏng R2-D2) để biểu thị trạng thái cảm xúc (vui, buồn, tò mò). Giúp con người tự phóng chiếu cảm xúc và tăng sự gắn kết thân thiện.', 
    'core-theory', 
    '["Robot hải cẩu Paro phát ra âm thanh gừ gừ êm tai khi được người già vuốt ve lông mềm giúp xoa dịu lo âu trầm cảm.", "Robot đồng hành gia đình Anki Vector biểu lộ đôi mắt tò mò nháy sáng kèm tiếng bíp nhỏ khi nhìn thấy chủ về."]'::jsonb, 
    '["SAR được chứng minh có khả năng cải thiện đáng kể tâm lý, giảm nhịp tim căng thẳng của bệnh nhân hồi sức tích cực.", "Thiết kế âm thanh phi ngôn ngữ tránh được kỳ vọng giao tiếp quá mức của con người vào năng lực trí tuệ thực tế của robot.", "Cảm biến chạm điện dung (Capacitive Touch Sensors) bố trí dọc thân giúp robot phân biệt hành vi vuốt ve yêu thương hay đánh đập thô bạo."]'::jsonb, 
    6, 
    TRUE,
    'uncanny-social'
  ),
  (
    'cs_humint_10', 
    'Vung làm việc an toàn', 
    13, 
    'Vung làm việc an toàn', 
    'Hành vi giảm tốc thích nghi theo khoảng cách va chạm', 
    '### 1. Nguyên lý giảm tốc thích nghi (Adaptive Speed Scaling)
Thay vì chỉ ngắt phanh dừng đột ngột khi người tới sát (gây giật cơ khí hỏng khớp robot), robot tự hành AMR điều khiển vận tốc tiến tối đa $v_{\max}$ tỷ lệ trơn tru với khoảng cách $d$ đo được tới con người:
$$v_{\max}(d) = \begin{cases} v_{\text{nominal}} & \text{nếu } d > d_{\text{warning}} \\ v_{\text{nominal}} \cdot \frac{d - d_{\text{stop}}}{d_{\text{warning}} - d_{\text{stop}}} & \text{nếu } d_{\text{stop}} \le d \le d_{\text{warning}} \\ 0 & \text{nếu } d < d_{\text{stop}} \end{cases}$$

### 2. Lợi ích vượt trội
Giúp robot di chuyển liên tục êm dịu, tự động lách qua người đi bộ mà không phải liên tục dừng khựng giật cục gây lãng phí năng lượng và làm người xung quanh hoảng sợ.', 
    'core-theory', 
    '["Robot giao đồ ăn chạy trong văn phòng giảm dần tốc độ từ 1.2m/s xuống 0.2m/s khi đi ngang qua bàn làm việc có nhiều người đi lại.", "Đồ thị vận tốc robot giảm dốc tuyến tính mượt mà khi khoảng cách tới chân người thu hẹp."]'::jsonb, 
    '["Hành vi này được lập trình tích hợp sâu trong bộ local planner của ROS2 Navigation2.", "Gia tốc hãm phanh phải được khống chế để tránh làm đổ vỡ đồ đạc xếp trên khay hàng robot.", "Tích hợp dữ liệu laser an toàn bảo đảm tính toán khoảng cách d là dữ liệu có độ tin cậy phần cứng cao nhất."]'::jsonb, 
    6, 
    TRUE,
    'safe-zones'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_humint_01', 'cobot-safety', 'lesson', 'Robot cộng tác (Cobots) & Tiêu chuẩn an toàn ISO/TS 15066', '{"lesson_id": "cs_humint_01"}'::jsonb, 10, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_02', 'uncanny-social', 'lesson', 'Hiện tượng Thung lũng kỳ lạ (Uncanny Valley)', '{"lesson_id": "cs_humint_02"}'::jsonb, 10, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_03', 'cobot-safety', 'lesson', 'Giao diện Người - Robot vật lý: Nút dừng khẩn cấp E-Stop & Teach Pendant', '{"lesson_id": "cs_humint_03"}'::jsonb, 20, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_04', 'multimodal-interaction', 'lesson', 'Ước lượng dáng người (Human Pose Estimation) trong điều khiển Robot', '{"lesson_id": "cs_humint_04"}'::jsonb, 10, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_05', 'multimodal-interaction', 'lesson', 'Tương tác giọng nói tự nhiên trong môi trường công nghiệp', '{"lesson_id": "cs_humint_05"}'::jsonb, 20, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_06', 'safe-zones', 'lesson', 'Thiết lập vùng bảo vệ ảo (Safety Zones) bằng LiDAR an toàn', '{"lesson_id": "cs_humint_06"}'::jsonb, 10, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_07', 'uncanny-social', 'lesson', 'Giao tiếp phi ngôn ngữ bằng ánh mắt của Robot', '{"lesson_id": "cs_humint_07"}'::jsonb, 20, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_08', 'multimodal-interaction', 'lesson', 'Điều khiển Robot rảnh tay bằng cử chỉ radar sóng milimet (mmWave)', '{"lesson_id": "cs_humint_08"}'::jsonb, 30, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_09', 'uncanny-social', 'lesson', 'Robot hỗ trợ xã hội (Socially Assistive Robots - SAR)', '{"lesson_id": "cs_humint_09"}'::jsonb, 30, 10, 20, 'cs_human_interaction', 13),
  ('act-lesson-cs_humint_10', 'safe-zones', 'lesson', 'Hành vi giảm tốc thích nghi theo khoảng cách va chạm', '{"lesson_id": "cs_humint_10"}'::jsonb, 20, 10, 20, 'cs_human_interaction', 13)
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
