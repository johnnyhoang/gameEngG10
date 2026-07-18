-- SQL migration to seed topics and 10 core lessons for cs_specialized_robotics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_specialized_robotics (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('soft-medical', 'cs_specialized_robotics', 13, 'Robot Y tế & Robot mềm', 'Robot phẫu thuật phản hồi xúc giác, vật liệu đàn hồi elastomers, cơ cấu chấp hành khí nén mềm nâng niu trái cây.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('underwater-aerial', 'cs_specialized_robotics', 13, 'Robot dưới nước & Trên không', 'Robot tự hành AUV sonar thủy âm, drone UAV khí động học cánh quạt quay quaternions điều khiển thái độ bay.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('space-humanoid', 'cs_specialized_robotics', 13, 'Robot vũ trụ & Nhân hình', 'Robot thám hiểm chân không vũ trụ bôi trơn chất rắn, cơ cấu khớp hông 3 DOF humanoid cơ bắp nhân tạo.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('bio-exoskeleton', 'cs_specialized_robotics', 13, 'Mô phỏng sinh học & Exoskeleton', 'Bộ xương ngoài hỗ trợ lực cảm biến điện cơ EMG, robot rắn uốn lượn leo tường gecko, nông nghiệp gắp quả.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_specialized_robotics (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_spcrob_01', 
    'cs_specialized_robotics', 
    13, 
    'Robot Y tế & Robot mềm', 
    'Robot Y tế & Hệ thống phẫu thuật phản hồi xúc giác', 
    '### 1. Robot phẫu thuật Da Vinci
Hệ thống phẫu thuật nội soi xâm lấn tối thiểu hàng đầu thế giới:
- Bác sĩ ngồi trên bàn console điều khiển các tay kẹp Master; hệ thống robot chuyển dịch chuyển động Master sang cánh tay Slave phẫu thuật với tỷ lệ thu nhỏ để loại bỏ hoàn toàn sự run tay vật lý của con người.

### 2. Phản hồi lực xúc giác (Haptic Feedback)
Để bác sĩ cảm nhận được độ cứng mềm của mô cơ thể khi kẹp chỉ/rạch dao qua robot:
- Cảm biến lực đo phản lực tại khâu cuối Slave gửi tín hiệu điện về động cơ trên tay điều khiển Master để tạo ra một lực cản cản trở chuyển động tay bác sĩ tương ứng.
- Đòi hỏi độ trễ truyền thông cực thấp (<1ms) để tránh mất ổn định điều khiển lực.', 
    'core-theory', 
    '["Hệ thống Da Vinci phẫu thuật cắt bỏ khối u dạ dày qua các lỗ rạch nội soi nhỏ chỉ 8mm.", "Bác sĩ cảm nhận được sợi chỉ khâu sắp đứt nhờ lực cản ngược rung lên tại tay cầm master console."]'::jsonb, 
    '["Xâm lấn tối thiểu (minimally invasive surgery) giúp bệnh nhân mất ít máu và hồi phục nhanh hơn nhiều so với mổ phanh truyền thống.", "Phản hồi xúc giác haptic đòi hỏi các cảm biến lực có độ nhạy cực cao và khả năng chống khử trùng y tế hóa chất nhiệt độ cao.", "Giải thuật scaling chuyển dịch chuyển động lớn của tay người thành chuyển động siêu nhỏ mượt mà của đầu kim phẫu thuật."]'::jsonb, 
    7, 
    TRUE,
    'soft-medical'
  ),
  (
    'cs_spcrob_02', 
    'Robot Y tế & Robot mềm', 
    13, 
    'Robot Y tế & Robot mềm', 
    'Robot mềm (Soft Robotics) & Cơ cấu chấp hành đàn hồi', 
    '### 1. Bản chất của Soft Robotics
Khác với robot truyền thống làm bằng kim loại cứng vững, robot mềm chế tạo từ các vật liệu đàn hồi cao (Elastomers như silicon, cao su sinh học):
- Không có các khớp quay/trượt cơ khí rõ rệt. Chuyển động liên tục tự do (vô hạn bậc tự do).

### 2. Cơ cấu chấp hành khí nén mềm (SPA - Soft Pneumatic Actuators)
- Chế tạo bằng cách đúc khuôn silicon có các khoang chứa khí rỗng bên trong.
- Khi bơm khí nén vào, các khoang phồng lên co giãn không đều (do thiết kế lớp vách chịu lực không co giãn như sợi vải dệt ở một phía), làm ngón kẹp tự động uốn cong ôm trọn lấy vật thể.
- Ứng dụng: Tay kẹp gắp thực phẩm mềm (trứng, quả chín) mà không làm dập nát sản phẩm.', 
    'core-theory', 
    '["Tay kẹp silicon mềm 3 ngón bơm khí nén tự động gắp cà chua chín đóng hộp trong nhà máy nông nghiệp.", "Robot mềm mô phỏng con sứa bơi dưới nước bằng cách bơm xả khí liên tục tạo lực đẩy đàn hồi."]'::jsonb, 
    '["Vật liệu đàn hồi elastomers có khả năng chịu biến dạng lớn mà không bị phá hủy cấu trúc vật lý.", "Model động học của robot mềm cực kỳ phức tạp vì không thể dùng quy ước D-H truyền thống, phải dùng mô hình dầm đàn hồi liên tục (Cosserat rod theory).", "Robot mềm có khả năng tự thích nghi hình học cao với bề mặt tiếp xúc bất định mà không cần thuật toán lập kế hoạch Grasp phức tạp."]'::jsonb, 
    6, 
    TRUE,
    'soft-medical'
  ),
  (
    'cs_spcrob_03', 
    'cs_specialized_robotics', 
    13, 
    'Robot dưới nước & Trên không', 
    'Robot tự hành dưới nước (AUV): Định vị & Sonar thủy âm', 
    '### 1. Thử thách môi trường nước sâu
Nước hấp thụ hoàn toàn sóng vô tuyến điện từ tần số cao, do đó khi lặn dưới nước:
- Không thể dùng định vị vệ tinh GPS.
- Không thể dùng sóng Wi-Fi/RF để điều khiển từ xa.
- Ánh sáng tắt nhanh khiến camera chỉ nhìn được khoảng cách rất ngắn.

### 2. Sonar thủy âm (Acoustic Sonar)
Giải pháp thay thế duy nhất truyền dữ liệu và định vị dưới nước bằng sóng âm (vận tốc khoảng $1500\,\text{m/s}$ trong nước):
- **DVL (Doppler Velocity Log):** Đo sự thay đổi tần số sóng âm dội lại từ đáy biển để tính vận tốc tịnh tiến 3D của robot so với đáy biển.
- **USBL (Ultra-Short Baseline):** Trạm phát âm thanh từ tàu mẹ đo góc và thời gian nhận tín hiệu từ robot dưới sâu để định vị tọa độ của nó.', 
    'core-theory', 
    '["Robot lặn tự hành AUV quét bản đồ địa hình đáy biển bằng sonar quét sườn (Side-scan Sonar) dội sóng âm liên tục.", "Thiết bị DVL gắn dưới đáy robot lặn đo tần số Doppler phát ra để hiệu chỉnh sai số trôi vị trí odometry dưới nước."]'::jsonb, 
    '["Vận tốc âm thanh trong nước biển thay đổi theo nhiệt độ, độ mặn và độ sâu áp suất, cần cảm biến đo để hiệu chỉnh phép đo khoảng cách.", "AUV (Autonomous Underwater Vehicle) tự hoạt động bằng chương trình nạp sẵn, ROV (Remotely Operated Vehicle) cần dây cáp quang chịu lực kết nối lên tàu mẹ để truyền video thời gian thực.", "Sức nổi (Buoyancy) của robot được điều khiển bằng bình chứa nước dạt (ballast tanks) để lặn/nổi tự nhiên."]'::jsonb, 
    7, 
    TRUE,
    'underwater-aerial'
  ),
  (
    'cs_spcrob_04', 
    'cs_specialized_robotics', 
    13, 
    'Robot dưới nước & Trên không', 
    'Khí động học Drone & Mô tả hướng quay bằng Quaternion 3D', 
    '### 1. Khí động học Quadrotor
Drone 4 cánh quạt thay đổi lực đẩy bằng cách tăng/giảm tốc độ quay của 4 motor độc lập:
- Hai cánh quay thuận chiều kim đồng hồ (CW), hai cánh quay ngược chiều (CCW) để triệt tiêu mô-men xoắn xoay thân drone.
- Tiến lùi bằng cách nghiêng Pitch (tăng tốc cặp cánh sau, giảm cặp cánh trước).

### 2. Mô tả hướng quay bằng Quaternion 3D
Hệ góc Euler (Roll, Pitch, Yaw) gặp lỗi khóa gimbal (Gimbal Lock - mất đi 1 bậc tự do khi góc pitch đạt 90 độ). Để khắc phục, robot trên không dùng Quaternion gồm 4 phần tử số thực:
$$q = (w, x, y, z) = \cos(\theta/2) + \sin(\theta/2)(u_x i + u_y j + u_z k)$$
Trong đó $u$ là trục quay, $\theta$ là góc quay quanh trục đó.
- Không bị khóa gimbal, tính toán xoay 3D mượt mà và tiết kiệm CPU.', 
    'core-theory', 
    '["Drone bay tự hành bám theo quỹ đạo 3D thực hiện phép nội suy hướng quay bằng thuật toán SLERP sử dụng Quaternion.", "Mạch điều khiển IMU trên drone xuất dữ liệu góc nghiêng dưới dạng Quaternion để tránh lỗi sập thuật toán khi drone ngửa 90 độ."]'::jsonb, 
    '["Gimbal Lock xảy ra khi hai trục quay của hệ góc Euler trùng nhau, làm mất đi khả năng mô tả hướng xoay tự do.", "Quaternion bắt buộc phải được chuẩn hóa về độ dài bằng 1 (Unit Quaternion) để đại diện cho một phép quay hợp lệ.", "Điều khiển PID thái độ bay (Attitude Control) của drone chạy ở tần số cực cao (>400Hz) để giữ cân bằng trước gió giật."]'::jsonb, 
    7, 
    TRUE,
    'underwater-aerial'
  ),
  (
    'cs_spcrob_05', 
    'cs_specialized_robotics', 
    13, 
    'Robot vũ trụ & Nhân hình', 
    'Robot thám hiểm vũ trụ & Công nghệ bôi trơn chất rắn', 
    '### 1. Môi trường chân không & Nhiệt độ cực đoan
Vũ trụ sở hữu áp suất chân không siêu cao ($<10^{-9}$ Torr) và chênh lệch nhiệt độ khổng lồ giữa vùng nắng và bóng râm (từ $-150^{\circ}\text{C}$ đến $+150^{\circ}\text{C}$):
- Các loại dầu bôi trơn dạng lỏng thông thường sẽ bị bay hơi (outgassing) lập tức trong chân không, làm kẹt cứng các khớp bánh răng của robot.
- Hiện tượng hàn lạnh (Cold Welding): Hai bề mặt kim loại tiếp xúc trực tiếp trong chân không tự liên kết dính chặt vào nhau như một khối cứng do không có lớp màng oxit cách ngăn.

### 2. Bôi trơn chất rắn (Solid Lubricants)
Robot vũ trụ bắt buộc dùng màng bôi trơn thể rắn có độ bay hơi bằng 0:
- **MoS2 (Molybdenum Disulfide):** Cấu trúc tinh thể dạng lớp dễ trượt lên nhau, hệ số ma sát cực thấp trong chân không.
- **Vòng bi phủ gốm (Ceramic Bearings):** Tránh hiện tượng hàn lạnh và chịu nhiệt độ cực đoan tốt.', 
    'core-theory', 
    '["Xe tự hành Curiosity Rover trên Sao Hỏa sử dụng hộp số bánh răng được bôi trơn bằng màng chất rắn MoS2 và hệ thống sưởi ấm hạt nhân để duy trì nhiệt độ khớp.", "Các vòng bi của robot cánh tay trạm vũ trụ ISS được chế tạo bằng vật liệu silicon nitride gốm siêu cứng chống hàn lạnh."]'::jsonb, 
    '["Outgassing bay hơi dầu lỏng không chỉ làm kẹt khớp mà còn tạo ra các lớp sương bám bẩn làm mờ thấu kính camera cảm biến của robot.", "Chống bức xạ vũ trụ (Radiation Hardening) yêu cầu các linh kiện vi xử lý nhúng phải có lớp bọc chì bảo vệ và mạch logic dự phòng tự sửa lỗi bit.", "Robot vũ trụ đòi hỏi độ tin cậy tuyệt đối vì không thể bảo trì trực tiếp ngoài đời."]'::jsonb, 
    7, 
    TRUE,
    'space-humanoid'
  ),
  (
    'cs_spcrob_06', 
    'cs_specialized_robotics', 
    13, 
    'Robot vũ trụ & Nhân hình', 
    'Cấu trúc cơ học khớp háng & Cơ bắp nhân tạo của Robot nhân hình', 
    '### 1. Cấu trúc khớp hông (Hip Joint) trong Humanoid
Khớp háng là khớp phức tạp nhất của robot đi bằng hai chân, quyết định khả năng giữ thăng bằng và bước đi linh hoạt:
- Thường được thiết kế có **3 bậc tự do (3 DOF)** cắt nhau tại một điểm: quay Yaw (xoay người), pitch Pitch (bước tiến/lùi), roll Roll (lắc hông ngang).
- Đòi hỏi các động cơ có mật độ công suất mô-men cực cao dồn sát về phía trọng tâm thân để giảm mô-men quán tính của chân.

### 2. Cơ bắp nhân tạo (Artificial Muscles)
Các cơ cấu chấp hành mềm co rút mô phỏng sợi cơ sinh học:
- **PAM (Pneumatic Artificial Muscles / McKibben Muscles):** Ống cao su bọc trong lưới sợi dệt đan chéo. Khi bơm khí nén, ống phồng ngang làm co rút chiều dài, tạo lực kéo tuyến tính mạnh mẽ.
- **Vật liệu nhớ hình (SMA - Shape Memory Alloys):** Hợp kim Nitinol tự động co lại về hình dáng cũ khi được nung nóng bằng dòng điện.', 
    'core-theory', 
    '["Robot humanoid sử dụng cơ cấu McKibben Muscle để gập khớp gối êm ái đàn hồi tự nhiên như cơ chân người.", "Khớp háng 3 DOF của robot được thiết kế bằng động cơ BLDC kết hợp truyền động đai răng để phân bổ mô-men xoắn tốt nhất."]'::jsonb, 
    '["Khớp hông chịu toàn bộ trọng lượng thân trên robot khi đứng một chân, do đó động cơ Pitch hông cần mô-men xoắn lớn nhất hệ thống.", " McKibben Muscles có tỷ lệ lực trên khối lượng cực lớn nhưng điều khiển phi tuyến rất khó do tính đàn hồi co giãn của không khí.", "Vật liệu nhớ hình SMA phản hồi chậm do tốn thời gian truyền nhiệt làm nguội, chỉ dùng cho robot kích thước siêu nhỏ."]'::jsonb, 
    7, 
    TRUE,
    'space-humanoid'
  ),
  (
    'cs_spcrob_07', 
    'cs_specialized_robotics', 
    13, 
    'Mô phỏng sinh học & Exoskeleton', 
    'Exoskeleton: Cảm biến điện cơ EMG & Thuật toán hỗ trợ lực', 
    '### 1. Bộ xương ngoài hỗ trợ lực (Exoskeleton)
Hệ thống robot mặc trên người nhằm tăng cường sức mạnh cơ bắp hoặc hỗ trợ phục hồi chức năng cho người bại liệt.

### 2. Cảm biến điện cơ EMG (Electromyography)
Cảm biến dán trên da đo các xung điện thế siêu nhỏ (cỡ micro-volts) sinh ra từ sự co rút của các bó cơ bắp bên dưới da khi não ra lệnh vận động.

### 3. Thuật toán điều khiển hỗ trợ lực (Assistive Control)
- Đọc dữ liệu EMG, chạy thuật toán lọc thông dải và trích xuất phong bì tín hiệu (Envelope) để dự đoán lực cơ bắp mong muốn của người dùng.
- Bộ điều khiển robot tính toán cấp mô-men xoắn động cơ khớp tương ứng tỷ lệ thuận với lực cơ người:
  $$\tau_{\text{motor}} = k \cdot V_{\text{EMG}}$$
  Giúp người đeo nâng vật nặng 50kg mà chỉ cảm giác như 5kg (mô-men động cơ gánh 90% tải trọng).', 
    'core-theory', 
    '["Bộ đồ Exoskeleton công nghiệp giúp công nhân bốc xếp thùng hàng nặng mà không bị mỏi lưng nhờ cảm biến EMG đo cơ lưng.", "Thiết bị exoskeleton chân phục hồi chức năng giúp người bị tai biến tập đi theo chu kỳ bước đi lập trình sẵn."]'::jsonb, 
    '["Tín hiệu EMG cực kỳ nhạy cảm với nhiễu chuyển động da và mồ hôi, đòi hỏi lọc nhiễu số mạnh mẽ và bộ khuếch đại vi sai.", "Điều khiển Admittance (độ chấp nhận) đo lực tương tác giữa người và máy qua cảm biến lực để điều khiển vị trí khớp robot đi theo chuyển động người.", "Bảo mật an toàn phần cứng giới hạn góc quay tối đa của khớp exoskeleton để tránh bẻ gãy khớp xương người đeo."]'::jsonb, 
    7, 
    TRUE,
    'bio-exoskeleton'
  ),
  (
    'cs_spcrob_08', 
    'cs_specialized_robotics', 
    13, 
    'Mô phỏng sinh học & Exoskeleton', 
    'Robot nông nghiệp tự động: Dẫn đường hàng cây & Gắp quả mềm', 
    '### 1. Dẫn đường hàng cây (Crop-Row Detection)
Robot di động đi giữa các hàng cây nông nghiệp (như vườn nho, ruộng ngô) không thể dùng GPS do bị tán lá che khuất:
- Sử dụng camera hoặc 2D LiDAR quét biên hàng cây kề cạnh.
- Thuật toán **Biến đổi Hough (Hough Transform)** hoặc thuật toán hồi quy tuyến tính tìm kiếm các đường thẳng song song đại diện cho hàng cây để điều khiển robot đi chính giữa lối đi.

### 2. Cơ cấu gắp quả mềm không làm dập quả
Ngón kẹp thu hoạch nông sản tích hợp cảm biến lực siêu nhạy dạng màng mỏng (FSR - Force Sensing Resistor) ở đầu ngón:
- Bộ điều khiển lực bám sát mô-men kẹp tối thiểu thắng ma sát nâng quả nhưng dưới ngưỡng phá hủy cấu trúc vỏ tế bào của trái cây (như dâu tây, cà chua).', 
    'core-theory', 
    '["Robot hái dâu tây tự hành dùng camera RGB-D định vị quả chín đỏ, tay kẹp mềm SPA uốn cong nhẹ nhàng nhấc quả ra khỏi cuống.", "Biến đổi Hough quét ảnh nhị phân để vẽ các đường thẳng đại diện cho luống ngô giúp robot tự hành bám đuôi."]'::jsonb, 
    '["Hough Transform biến đổi các điểm pixel ảnh sang không gian tham số Hough để tìm giao điểm biểu thị đường thẳng.", "FSR là điện trở thay đổi trị số theo lực ép cơ học, giá rẻ và dễ tích hợp đầu ngón tay kẹp.", "Môi trường nông nghiệp bụi bẩn, bùn đất đòi hỏi các khớp và cảm biến robot phải đạt tiêu chuẩn chống nước IP67 trở lên."]'::jsonb, 
    6, 
    TRUE,
    'bio-exoskeleton'
  ),
  (
    'cs_spcrob_09', 
    'cs_specialized_robotics', 
    13, 
    'Mô phỏng sinh học & Exoskeleton', 
    'Robot mô phỏng sinh học: Robot rắn & Bám tường Gecko', 
    '### 1. Robot rắn (Snake Robots)
Robot gồm nhiều đốt khớp nối liên tiếp quay độc lập (dư dẫn động bậc cao):
- Chuyển động dựa trên sự phối hợp sóng uốn lượn (Serpentine gait) đẩy thân nghiêng vào các điểm tựa môi trường để tịnh tiến tiến.
- Khả năng luồn lách qua các đường ống hẹp, đống đổ nát sạt lở để tìm kiếm cứu nạn.

### 2. Công nghệ bám tường Gecko (Tắc kè)
Mô phỏng cơ chế bám dính khô của chân tắc kè:
- Đầu chân robot được phủ các lớp sợi silicon siêu nhỏ (micro-structures) mô phỏng các sợi lông setae của tắc kè.
- Khi robot áp chân lên tường kính, lực liên kết phân tử **Van der Waals** xuất hiện giữa hàng triệu đầu sợi lông và mặt kính tạo ra lực bám dính khổng lồ mà không cần keo ướt hay nam châm. Robot dễ dàng nhấc chân ra bằng cách thay đổi góc lột chân.', 
    'core-theory', 
    '["Robot rắn luồn lách qua khe nứt bê tông của tòa nhà đổ nát sau động đất để tìm người sống sót.", "Robot bám tường Gecko leo thẳng đứng trên kính tòa nhà cao tầng để lau kính tự động dùng lực liên kết Van der Waals."]'::jsonb, 
    '["Sóng uốn lượn của robot rắn được mô tả toán học bằng các hàm sóng hình sin phân pha dọc theo các khớp (Central Pattern Generators - CPG).", "Lực Van der Waals chỉ xuất hiện hiệu quả ở khoảng cách cực nhỏ cấp nano mét, yêu cầu bề mặt tiếp xúc phải siêu sạch.", "Leo trèo thẳng đứng đòi hỏi robot kiểm soát chặt chẽ vị trí trọng tâm để tránh mô-men lực trọng trường kéo lật robot ngã ra sau."]'::jsonb, 
    7, 
    TRUE,
    'bio-exoskeleton'
  ),
  (
    'cs_spcrob_10', 
    'cs_specialized_robotics', 
    13, 
    'Mô phỏng sinh học & Exoskeleton', 
    'Hệ thống Sonar quét sườn (Side-scan Sonar) đo vẽ địa hình đáy biển', 
    '### 1. Nguyên lý Side-scan Sonar
Thiết bị sonar gắn hai bên sườn robot lặn AUV phát các xung âm thanh hình quạt hướng xuống đáy biển:
- Đầu thu đo cường độ của sóng âm phản xạ dội lại từ đáy biển theo thời gian.
- Bề mặt cứng (đá, kim loại) phản xạ sóng âm mạnh tạo điểm sáng; bề mặt mềm (bùn, cát) hoặc vùng khuất (bóng đổ) hấp thụ sóng âm tạo điểm tối đen.

### 2. Tái tạo hình ảnh địa hình
Bằng cách xâu chuỗi các dòng dữ liệu quét âm thanh dọc theo đường di chuyển của robot, phần mềm tái tạo ảnh xám độ phân giải cao của địa hình đáy biển, giúp phát hiện xác tàu đắm, đường ống dẫn dầu dưới sâu.', 
    'core-theory', 
    '["Robot AUV khảo sát tuyến cáp quang biển chụp ảnh sonar quét sườn phát hiện vị trí cáp bị đứt do mỏ neo tàu kéo.", "Vẽ biểu đồ cường độ âm thanh phản xạ theo cự ly quét để xác định ranh giới giữa đá ngầm và cát mịn."]'::jsonb, 
    '["Side-scan Sonar chỉ cho ra hình ảnh cường độ phản xạ 2D, không cho ra độ sâu trực tiếp của từng điểm như sonar đa tia (Multibeam Sonar).", "Tốc độ di chuyển của robot lặn phải được khống chế chậm để tránh hiện tượng kéo vệt mờ ảnh do tần số phát xung âm thanh giới hạn bởi vận tốc âm thanh trong nước.", "Hiện tượng nhiễu nhiệt độ nước (thermocline) làm bẻ cong đường truyền sóng âm, gây sai lệch hình ảnh địa hình."]'::jsonb, 
    7, 
    TRUE,
    'bio-exoskeleton'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_spcrob_01', 'soft-medical', 'lesson', 'Robot Y tế & Hệ thống phẫu thuật phản hồi xúc giác', '{"lesson_id": "cs_spcrob_01"}'::jsonb, 10, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_02', 'soft-medical', 'lesson', 'Robot mềm (Soft Robotics) & Cơ cấu chấp hành đàn hồi', '{"lesson_id": "cs_spcrob_02"}'::jsonb, 20, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_03', 'underwater-aerial', 'lesson', 'Robot tự hành dưới nước (AUV): Định vị & Sonar thủy âm', '{"lesson_id": "cs_spcrob_03"}'::jsonb, 10, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_04', 'underwater-aerial', 'lesson', 'Khí động học Drone & Mô tả hướng quay bằng Quaternion 3D', '{"lesson_id": "cs_spcrob_04"}'::jsonb, 20, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_05', 'space-humanoid', 'lesson', 'Robot thám hiểm vũ trụ & Công nghệ bôi trơn chất rắn', '{"lesson_id": "cs_spcrob_05"}'::jsonb, 10, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_06', 'space-humanoid', 'lesson', 'Cấu trúc cơ học khớp háng & Cơ bắp nhân tạo của Robot nhân hình', '{"lesson_id": "cs_spcrob_06"}'::jsonb, 20, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_07', 'bio-exoskeleton', 'lesson', 'Exoskeleton: Cảm biến điện cơ EMG & Thuật toán hỗ trợ lực', '{"lesson_id": "cs_spcrob_07"}'::jsonb, 10, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_08', 'bio-exoskeleton', 'lesson', 'Robot nông nghiệp tự động: Dẫn đường hàng cây & Gắp quả mềm', '{"lesson_id": "cs_spcrob_08"}'::jsonb, 20, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_09', 'bio-exoskeleton', 'lesson', 'Robot mô phỏng sinh học: Robot rắn & Bám tường Gecko', '{"lesson_id": "cs_spcrob_09"}'::jsonb, 30, 10, 20, 'cs_specialized_robotics', 13),
  ('act-lesson-cs_spcrob_10', 'underwater-aerial', 'lesson', 'Hệ thống Sonar quét sườn (Side-scan Sonar) đo vẽ địa hình đáy biển', '{"lesson_id": "cs_spcrob_10"}'::jsonb, 30, 10, 20, 'cs_specialized_robotics', 13)
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
