-- SQL migration to seed 100 question bank for cs_specialized_robotics (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_specialized_robotics (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_specialized_robotics';

-- ======================================================================================
-- BÀI GIẢNG 1: Robot Y tế & Hệ thống phẫu thuật phản hồi xúc giác (cs_spcrob_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_001', 'mcq', 'soft-medical',
    'Hệ thống phẫu thuật nội soi nổi tiếng Da Vinci hoạt động chủ yếu dựa trên cơ chế điều khiển nào?',
    ARRAY['Master-Slave (Bác sĩ điều khiển tay kẹp Master, cánh tay Slave chuyển dịch phẫu thuật tương ứng)', 'Tự động hóa hoàn toàn bằng trí tuệ nhân tạo', 'Điều khiển từ xa bằng giọng nói', 'Hồi quy tuyến tính đơn giản'],
    ARRAY['Master-Slave (Bác sĩ điều khiển tay kẹp Master, cánh tay Slave chuyển dịch phẫu thuật tương ứng)']::varchar[],
    'Da Vinci là hệ thống robot trợ giúp bác sĩ phẫu thuật chính xác qua cơ cấu Master-Slave đồng bộ chuyển động.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_002', 'mcq', 'soft-medical',
    'Khái niệm "Phản hồi xúc giác" (Haptic Feedback) trong robot y tế có ý nghĩa gì?',
    ARRAY['Đo phản lực tại khâu phẫu thuật và tạo ra một lực cản cản trở ngược lại lên tay cầm điều khiển để bác sĩ cảm thấy độ cứng mô', 'Tự động phát âm thanh cảnh báo', 'Chiếu hình ảnh 3D lên màn hình', 'Tăng tốc độ di chuyển cánh tay'],
    ARRAY['Đo phản lực tại khâu phẫu thuật và tạo ra một lực cản cản trở ngược lại lên tay cầm điều khiển để bác sĩ cảm thấy độ cứng mô']::varchar[],
    'Phản hồi lực haptic giúp bác sĩ có cảm giác xúc giác như đang mổ phanh trực tiếp trên cơ thể bệnh nhân.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_003', 'mcq', 'soft-medical',
    'Độ trễ truyền thông tối đa cho phép để hệ thống phản hồi xúc giác Haptic hoạt động ổn định không bị trễ pha gây rung lắc tay lái là bao nhiêu?',
    ARRAY['Dưới 1 milili-giây (1ms)', 'Dưới 100 mili-giây', 'Khoảng 1 giây', 'Không giới hạn độ trễ'],
    ARRAY['Dưới 1 milili-giây (1ms)']::varchar[],
    'Vòng lặp điều khiển lực haptic cực kỳ nhạy cảm với pha trễ, yêu cầu tần số cập nhật > 1000Hz (độ trễ < 1ms).',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_004', 'mcq', 'soft-medical',
    'Lợi ích lớn nhất của việc thu nhỏ tỉ lệ chuyển động (Motion Scaling) từ Master sang Slave là gì?',
    ARRAY['Bác sĩ dịch tay 10cm ngoài đời nhưng cánh tay robot y tế chỉ di chuyển 1cm bên trong, giúp khử hoàn toàn sự run tay', 'Tăng tốc độ phẫu thuật lên gấp 10 lần', 'Tiết kiệm điện năng tiêu thụ', 'Giúp robot tự động cắt chỉ khâu'],
    ARRAY['Bác sĩ dịch tay 10cm ngoài đời nhưng cánh tay robot y tế chỉ di chuyển 1cm bên trong, giúp khử hoàn toàn sự run tay']::varchar[],
    'Motion Scaling chia tỷ lệ chuyển dịch hình học giúp bác sĩ thực hiện các đường khâu siêu vi phẫu mượt mà.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_005', 'mcq', 'soft-medical',
    'Thử thách kỹ thuật lớn nhất đối với việc thiết kế cảm biến lực gắn trên dụng cụ phẫu thuật nội soi của robot là gì?',
    ARRAY['Phải chịu được nhiệt độ và áp suất cao trong quá trình hấp tiệt trùng khử khuẩn (Autoclave) nhiều lần', 'Phải có giá thành siêu rẻ dưới 1 USD', 'Phải kết nối không dây qua sóng wifi', 'Phải chế tạo bằng vàng nguyên chất'],
    ARRAY['Phải chịu được nhiệt độ và áp suất cao trong quá trình hấp tiệt trùng khử khuẩn (Autoclave) nhiều lần']::varchar[],
    'Thiết bị y tế bắt buộc phải vô trùng. Các cảm biến silicon thông thường sẽ hỏng ngay sau 1 lần hấp hơi nước nóng 121 độ C ở áp suất cao.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_006', 'mcq', 'soft-medical',
    'Cụm từ "Xâm lấn tối thiểu" (Minimally Invasive Surgery) định nghĩa phương pháp phẫu thuật nào?',
    ARRAY['Phẫu thuật qua các vết rạch nhỏ (chỉ vài mm) thay vì mổ phanh phanh vệt dài', 'Phẫu thuật không cần dùng thuốc gây mê', 'Mổ bằng tia laser công suất lớn', 'Bác sĩ đứng ngoài phòng mổ'],
    ARRAY['Phẫu thuật qua các vết rạch nhỏ (chỉ vài mm) thay vì mổ phanh phanh vệt dài']::varchar[],
    'Vết rạch nhỏ giúp giảm tối đa tổn thương mô lành quanh vùng bệnh, rút ngắn thời gian nằm viện.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_007', 'mcq', 'soft-medical',
    'Để robot phẫu thuật di chuyển chính xác quanh vết rạch nhỏ cố định trên bụng bệnh nhân mà không làm rách rộng da, robot phải được thiết kế có cơ cấu cơ học đặc biệt nào?',
    ARRAY['Tâm quay bất động cơ học (RCM - Remote Center of Motion)', 'Khớp xoay tự do 360 độ', 'Động cơ servo tuyến tính siêu tốc', 'Cơ cấu bánh xe Mecanum'],
    ARRAY['Tâm quay bất động cơ học (RCM - Remote Center of Motion)']::varchar[],
    'RCM ràng buộc cơ khí buộc trục dụng cụ phẫu thuật luôn đi qua một điểm cố định trong không gian (vết rạch trên da).',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_008', 'mcq', 'soft-medical',
    'Dụng cụ phẫu thuật đầu cuối của robot Da Vinci mô phỏng khớp cổ tay người linh hoạt có tên gọi thương mại là gì?',
    ARRAY['EndoWrist', 'RoboHand', 'SmartPin', 'DaVinciJoint'],
    ARRAY['EndoWrist']::varchar[],
    'EndoWrist cung cấp 7 bậc tự do và khả năng uốn góc linh hoạt vượt trội hơn cả cổ tay người trong không gian hẹp.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_009', 'short-answer', 'soft-medical',
    'Điền tên tiếng Anh của hệ thống phản hồi lực cảm giác xúc giác lên tay cầm điều khiển. (Viết thường)',
    NULL,
    ARRAY['haptic feedback', 'haptic', 'phản hồi xúc giác']::varchar[],
    'Haptic Feedback truyền lực ngược lại tay người dùng.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_01'
  ),
  (
    'cs_spcrob_q_010', 'short-answer', 'soft-medical',
    'Điền tên viết tắt tiếng Anh của cơ cấu cơ học giữ tâm quay bất động ngoài cơ thể trong robot y tế. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['RCM']::varchar[],
    'RCM là Remote Center of Motion.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Robot mềm (Soft Robotics) & Cơ cấu chấp hành đàn hồi (cs_spcrob_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_011', 'mcq', 'soft-medical',
    'Vật liệu chính cấu thành nên thân robot mềm (Soft Robot) thuộc nhóm vật liệu nào?',
    ARRAY['Vật liệu đàn hồi cao (Elastomers như silicon, cao su sinh học)', 'Hợp kim Titan siêu cứng', 'Sợi carbon đúc nhiệt', 'Gốm kỹ thuật chịu nhiệt'],
    ARRAY['Vật liệu đàn hồi cao (Elastomers như silicon, cao su sinh học)']::varchar[],
    'Elastomers cho phép robot chịu được biến dạng uốn cong, kéo giãn khổng lồ mà không gãy hỏng.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_012', 'mcq', 'soft-medical',
    'Cơ cấu chấp hành khí nén mềm (SPA - Soft Pneumatic Actuators) tạo ra chuyển động uốn cong bằng cách nào?',
    ARRAY['Bơm khí nén vào các khoang rỗng không đối xứng, làm phồng một phía trong khi phía đối diện có lớp chịu lực giữ cố định', 'Sử dụng động cơ bước siêu nhỏ', 'Nung nóng bằng tia laser', 'Sử dụng nam châm vĩnh cửu hút đẩy'],
    ARRAY['Bơm khí nén vào các khoang rỗng không đối xứng, làm phồng một phía trong khi phía đối diện có lớp chịu lực giữ cố định']::varchar[],
    'Sự bất đối xứng của cấu trúc khoang giãn nở buộc ngón tay silicon tự động cụp uốn cong khi áp suất tăng.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_013', 'mcq', 'soft-medical',
    'Ứng dụng nổi bật nhất của tay kẹp robot mềm (Soft Grippers) ngoài đời thực là gì?',
    ARRAY['Gắp các vật thể nông nghiệp mềm dễ vỡ (quả chín, trứng) hoặc thực phẩm mà không cần lập trình lực kẹp chính xác', 'Nâng hạ container hàng vạn tấn', 'Khoan cắt bê tông cốt thép', 'Hàn vỏ xe ô tô tự động'],
    ARRAY['Gắp các vật thể nông nghiệp mềm dễ vỡ (quả chín, trứng) hoặc thực phẩm mà không cần lập trình lực kẹp chính xác']::varchar[],
    'Tính tự thích nghi cơ học (compliance) của silicon giúp ngón mềm tự bọc lấy bề mặt quả không gây trầy xước.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_014', 'mcq', 'soft-medical',
    'Mô hình động học của robot mềm (Soft Robotics) phức tạp hơn robot cứng truyền thống vì lý do nào?',
    ARRAY['Robot mềm có số bậc tự do lý thuyết là vô hạn, không thể biểu diễn bằng các khớp quay cứng rời rạc (công thức D-H)', 'Vật liệu silicon không dẫn điện', 'Robot mềm không dùng nguồn pin', 'Do silicon có trọng lượng quá nặng'],
    ARRAY['Robot mềm có số bậc tự do lý thuyết là vô hạn, không thể biểu diễn bằng các khớp quay cứng rời rạc (công thức D-H)']::varchar[],
    'Biến dạng liên tục của dầm đàn hồi đòi hỏi giải hệ phương trình vi phân đạo hàm riêng phi tuyến (Cosserat Rod Theory).',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_015', 'mcq', 'soft-medical',
    'Thuộc tính "Compliance" (độ mềm dẻo tự thích nghi) của Soft Robotics mang lại lợi ích gì?',
    ARRAY['Robot tự thay đổi hình dáng khớp để ôm vừa khít chướng ngại vật mà không cần cảm biến đo lực đắt tiền', 'Giúp robot tăng tốc độ chạy gấp 3 lần', 'Giúp robot tự động sạc pin không dây', 'Giảm hoàn toàn giá thành chế tạo'],
    ARRAY['Robot tự thay đổi hình dáng khớp để ôm vừa khít chướng ngại vật mà không cần cảm biến đo lực đắt tiền']::varchar[],
    'Độ mềm tự nhiên tự hấp thụ va chạm vật lý, an toàn tuyệt đối khi tương tác cận cảnh với con người.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_016', 'mcq', 'soft-medical',
    'Cơ cấu ngón kẹp hạt mạt đá (Granular Jamming Gripper) hoạt động dựa trên nguyên lý nào?',
    ARRAY['Bình bóng cao su chứa cát hạt nhỏ: ấn sát vật thể rồi hút chân không để các hạt nén chặt cứng khóa chặt hình dạng vật', 'Sử dụng dòng điện xoay chiều', 'Bơm keo siêu dính thời gian thực', 'Sử dụng cánh tay đòn sắt'],
    ARRAY['Bình bóng cao su chứa cát hạt nhỏ: ấn sát vật thể rồi hút chân không để các hạt nén chặt cứng khóa chặt hình dạng vật']::varchar[],
    'Hiện tượng kẹt hạt (jamming) biến đổi trạng thái túi hạt từ lỏng thích nghi sang rắn cứng để gá kẹp đa hình dạng.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_017', 'mcq', 'soft-medical',
    'Nhược điểm lớn nhất của robot mềm hoạt động bằng khí nén (SPA) là gì?',
    ARRAY['Yêu cầu hệ thống máy nén khí, van điện từ cồng kềnh đi kèm và thời gian đáp ứng lực tương đối trễ', 'Vật liệu cao su dễ truyền điện', 'Silicon có độ bền cơ học cao vô hạn', 'Robot không thể hoạt động dưới nước'],
    ARRAY['Yêu cầu hệ thống máy nén khí, van điện từ cồng kềnh đi kèm và thời gian đáp ứng lực tương đối trễ']::varchar[],
    'Hệ thống cấp khí nén bên ngoài làm giảm tính tự lập di chuyển gọn nhẹ của robot mềm.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_018', 'mcq', 'soft-medical',
    'Khi thiết kế robot mềm, người ta thường chèn thêm các sợi chỉ dệt chịu lực (strain-limiting fibers) nhằm mục đích gì?',
    ARRAY['Giới hạn sự kéo giãn của một bề mặt để định hướng chuyển động uốn cong của ngón tay khí nén', 'Để trang trí cho đẹp mắt', 'Để truyền dẫn dòng điện điều khiển', 'Để đo đạc nhiệt độ silicon'],
    ARRAY['Giới hạn sự kéo giãn của một bề mặt để định hướng chuyển động uốn cong của ngón tay khí nén']::varchar[],
    'Sợi chỉ không giãn đặt ở mặt dưới ngón kẹp buộc mặt trên phồng giãn nở bẻ cong ngón cụp lại.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_019', 'short-answer', 'soft-medical',
    'Điền tên tiếng Anh chỉ nhóm vật liệu polyme đàn hồi cao cấu tạo nên robot mềm. (Viết thường số nhiều)',
    NULL,
    ARRAY['elastomers', 'vật liệu đàn hồi']::varchar[],
    'Elastomers là vật liệu chế tạo robot mềm.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_02'
  ),
  (
    'cs_spcrob_q_020', 'short-answer', 'soft-medical',
    'Điền tên viết tắt tiếng Anh của cơ cấu chấp hành hoạt động bằng khí nén mềm. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['SPA']::varchar[],
    'SPA là Soft Pneumatic Actuator.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Robot tự hành dưới nước (AUV): Định vị & Sonar thủy âm (cs_spcrob_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_021', 'mcq', 'underwater-aerial',
    'Tại sao robot lặn sâu dưới biển AUV không thể sử dụng hệ thống định vị vệ tinh GPS?',
    ARRAY['Vì nước biển hấp thụ hoàn toàn sóng vô tuyến điện từ tần số cao của GPS chỉ sau vài mét độ sâu', 'Vì GPS không hoạt động ở vĩ độ lạnh', 'Vì robot lặn không có ăng-ten thu phát', 'Do áp suất nước quá lớn làm hỏng chíp GPS'],
    ARRAY['Vì nước biển hấp thụ hoàn toàn sóng vô tuyến điện từ tần số cao của GPS chỉ sau vài mét độ sâu']::varchar[],
    'Sóng điện từ tần số cao bị suy hao cực lớn trong môi trường dẫn điện của nước biển mặn.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_022', 'mcq', 'underwater-aerial',
    'Thiết bị "DVL" (Doppler Velocity Log) gắn trên robot lặn đo đạc đại lượng nào?',
    ARRAY['Vận tốc tịnh tiến 3D của robot so với đáy biển nhờ đo sự lệch tần số Doppler của sóng âm phản xạ', 'Độ sâu tuyệt đối bằng áp suất', 'Độ mặn của nước biển', 'Tốc độ gió trên mặt biển'],
    ARRAY['Vận tốc tịnh tiến 3D của robot so với đáy biển nhờ đo sự lệch tần số Doppler của sóng âm phản xạ']::varchar[],
    'DVL là cảm biến then chốt giúp tính toán odometry dưới nước chống trôi vị trí.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_023', 'mcq', 'underwater-aerial',
    'Vận tốc truyền sóng âm trung bình trong nước biển là bao nhiêu để tính toán cự ly sonar?',
    ARRAY['Khoảng 1500 m/s', '340 m/s', '300,000 km/s', '10 m/s'],
    ARRAY['Khoảng 1500 m/s']::varchar[],
    'Vận tốc âm thanh trong nước nhanh hơn gấp 4.4 lần trong không khí ($340\,\text{m/s}$), thay đổi theo nhiệt độ, áp suất.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_024', 'mcq', 'underwater-aerial',
    'Sự khác nhau cơ bản giữa robot AUV và ROV là gì?',
    ARRAY['AUV tự chạy bằng chương trình lập trình sẵn tự động; ROV nối cáp vật lý lên tàu mẹ để con người điều khiển trực tiếp', 'ROV không dùng nguồn pin', 'AUV chỉ đi trên mặt nước', 'ROV có kích thước nhỏ hơn gấp 100 lần'],
    ARRAY['AUV tự chạy bằng chương trình lập trình sẵn tự động; ROV nối cáp vật lý lên tàu mẹ để con người điều khiển trực tiếp']::varchar[],
    'AUV là Autonomous Underwater Vehicle, ROV là Remotely Operated Vehicle kết nối bằng tether.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_025', 'mcq', 'underwater-aerial',
    'Hệ thống định vị thủy âm "USBL" (Ultra-Short Baseline) đo vị trí robot lặn dựa trên thiết bị đặt ở đâu?',
    ARRAY['Đầu thu đặt dưới đáy tàu mẹ trên mặt nước, đo góc hướng và thời gian trễ của tín hiệu âm thanh phát ra từ robot', 'Đặt dưới đáy biển sâu 4000m', 'Tích hợp sẵn bên trong pin của robot', 'Đặt trên vệ tinh không gian'],
    ARRAY['Đầu thu đặt dưới đáy tàu mẹ trên mặt nước, đo góc hướng và thời gian trễ của tín hiệu âm thanh phát ra từ robot']::varchar[],
    'Tàu mẹ định vị tọa độ GPS của mình và tính khoảng cách tương đối của robot lặn qua cảm biến âm thanh góc pha USBL.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_026', 'mcq', 'underwater-aerial',
    'Độ sâu tuyệt đối (depth) của robot lặn được đo đạc phổ biến nhất bằng cảm biến gì?',
    ARRAY['Cảm biến áp suất nước (Pressure Sensor) dựa trên cột nước đè lên robot', 'Cảm biến siêu âm dội từ mặt nước', 'Con quay hồi chuyển IMU', 'Camera RGB-D'],
    ARRAY['Cảm biến áp suất nước (Pressure Sensor) dựa trên cột nước đè lên robot']::varchar[],
    'Cứ xuống sâu 10m, áp suất tăng thêm khoảng 1 Bar (100 kPa), cho phép tính độ sâu chính xác cấp cm.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_027', 'mcq', 'underwater-aerial',
    'Để robot lặn đứng im lơ lửng giữa cột nước mà không cần chạy động cơ chân vịt tốn pin, lực nổi của robot phải thỏa mãn điều kiện gì?',
    ARRAY['Lực nổi trung tính (Neutral Buoyancy) - trọng lượng robot bằng đúng trọng lượng nước thể tích tương đương chiếm chỗ', 'Lực nổi phải lớn hơn trọng lượng gấp 3 lần', 'Lực nổi phải bằng 0', 'Trọng lượng robot phải bằng 0'],
    ARRAY['Lực nổi trung tính (Neutral Buoyancy) - trọng lượng robot bằng đúng trọng lượng nước thể tích tương đương chiếm chỗ']::varchar[],
    'Neutral buoyancy giúp robot lặn đứng im cân bằng lực Archimedes và trọng lực.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_028', 'mcq', 'underwater-aerial',
    'Hiện tượng "Thermocline" (lớp dị biệt nhiệt độ nước) gây khó khăn gì cho việc truyền sóng âm định vị dưới nước?',
    ARRAY['Lớp nước có nhiệt độ thay đổi đột ngột làm khúc xạ (bẻ cong) đường truyền sóng âm, gây sai lệch cự ly đo đạc', 'Làm nước biển đóng băng lập tức', 'Làm rỉ sét vỏ nhôm của robot', 'Làm mất nguồn điện của cảm biến'],
    ARRAY['Lớp nước có nhiệt độ thay đổi đột ngột làm khúc xạ (bẻ cong) đường truyền sóng âm, gây sai lệch cự ly đo đạc']::varchar[],
    'Sự thay đổi nhiệt độ đột ngột làm thay đổi vận tốc âm thanh, tạo ra lớp cách âm khúc xạ bẻ cong tia sonar.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_029', 'short-answer', 'underwater-aerial',
    'Điền tên viết tắt tiếng Anh của robot lặn tự hành không dây cáp. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AUV']::varchar[],
    'AUV là Autonomous Underwater Vehicle.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_03'
  ),
  (
    'cs_spcrob_q_030', 'short-answer', 'underwater-aerial',
    'Điền tên viết tắt tiếng Anh của thiết bị đo vận tốc vi sai sóng âm dội từ đáy biển của robot lặn. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DVL']::varchar[],
    'DVL là Doppler Velocity Log.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Khí động học Drone & Mô tả hướng quay bằng Quaternion 3D (cs_spcrob_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_031', 'mcq', 'underwater-aerial',
    'Tại sao drone quadrotor (4 cánh quạt) bắt buộc phải có 2 cánh quay thuận (CW) và 2 cánh quay ngược (CCW) đối xứng chéo nhau?',
    ARRAY['Để triệt tiêu hoàn toàn mô-men xoắn phản lực xoay thân drone quanh trục đứng', 'Để tăng lực đẩy lên gấp đôi', 'Để drone bay lùi dễ dàng hơn', 'Do nhà sản xuất động cơ yêu cầu'],
    ARRAY['Để triệt tiêu hoàn toàn mô-men xoắn phản lực xoay thân drone quanh trục đứng']::varchar[],
    'Nếu cả 4 cánh quay cùng chiều, phản lực mô-men xoắn sẽ làm toàn bộ thân drone quay tít mù ngược hướng cánh.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_032', 'mcq', 'underwater-aerial',
    'Để điều khiển drone nghiêng đầu tiến về phía trước (chuyển động Pitch tiến), bộ điều khiển động cơ thực hiện hành vi nào?',
    ARRAY['Tăng tốc độ quay của cặp cánh sau và giảm tốc độ quay của cặp cánh trước', 'Tăng tốc cả 4 cánh đồng đều', 'Đảo chiều quay của 2 cánh chéo', 'Tắt hoàn toàn 2 cánh bên trái'],
    ARRAY['Tăng tốc độ quay của cặp cánh sau và giảm tốc độ quay của cặp cánh trước']::varchar[],
    'Chênh lệch lực đẩy trước sau tạo ra mô-men quay nghiêng dọc Pitch bẻ đầu xe chúc xuống tạo lực tịnh tiến tiến.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_033', 'mcq', 'underwater-aerial',
    'Hiện tượng lỗi "Khóa gimbal" (Gimbal Lock) của hệ góc Euler (Roll, Pitch, Yaw) xảy ra khi nào?',
    ARRAY['Khi góc Pitch đạt chính xác cộng/trừ 90 độ, làm hai trục quay trùng khớp nhau và mất đi một bậc tự do xoay tự do', 'Khi động cơ gimbal bị chập điện', 'Khi drone bay quá nhanh', 'Khi camera bị mất tín hiệu truyền hình'],
    ARRAY['Khi góc Pitch đạt chính xác cộng/trừ 90 độ, làm hai trục quay trùng khớp nhau và mất đi một bậc tự do xoay tự do']::varchar[],
    'Gimbal Lock là khuyết điểm hình học toán học của ma trận xoay góc Euler khi 3 bậc tự do bị suy biến mất đi 1 chiều xoay.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_034', 'mcq', 'underwater-aerial',
    'Quaternion 3D mô tả phép xoay trong không gian bằng bao nhiêu phần tử số thực?',
    ARRAY['4 phần tử (w, x, y, z)', '3 phần tử (roll, pitch, yaw)', '9 phần tử ma trận', '1 phần tử góc duy nhất'],
    ARRAY['4 phần tử (w, x, y, z)']::varchar[],
    'Quaternion gồm 1 phần số thực w và 3 phần số ảo x, y, z tương ứng trục quay.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_035', 'mcq', 'underwater-aerial',
    'Ưu điểm vượt trội nhất của Quaternion 3D so với góc Euler trong lập trình bay của drone là gì?',
    ARRAY['Không bị hiện tượng khóa gimbal (Gimbal Lock) và tính toán số học mượt mà dễ nội suy góc xoay', 'Không tốn bộ nhớ RAM để lưu trữ', 'Chỉ dùng các phép cộng đơn giản', 'Tự động triệt tiêu lực cản của gió'],
    ARRAY['Không bị hiện tượng khóa gimbal (Gimbal Lock) và tính toán số học mượt mà dễ nội suy góc xoay']::varchar[],
    'Quaternion biểu diễn không gian xoay trơn tru vô hướng, tránh các điểm kỳ dị (singularities).',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_036', 'mcq', 'underwater-aerial',
    'Để đại diện cho một phép quay hợp lệ trong không gian 3D, độ dài (Norm) của Quaternion bắt buộc phải bằng bao nhiêu?',
    ARRAY['1 (Unit Quaternion)', '0', 'Vô cùng', 'Bằng giá trị góc quay tính theo radian'],
    ARRAY['1 (Unit Quaternion)']::varchar[],
    'Chuẩn hóa độ dài Quaternion w^2 + x^2 + y^2 + z^2 = 1 bảo đảm phép biến đổi không làm co giãn kích thước vật thể.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_037', 'mcq', 'underwater-aerial',
    'Thuật toán nội suy tuyến tính hình cầu "SLERP" (Spherical Linear Interpolation) dùng Quaternion phục vụ mục đích gì?',
    ARRAY['Nội suy mượt mà quỹ đạo xoay của drone giữa hai tư thế hướng quay 3D khác nhau', 'Tính toán tốc độ bay tiến của drone', 'Dự báo dung lượng pin còn lại', 'Lọc nhiễu cảm biến gia tốc'],
    ARRAY['Nội suy mượt mà quỹ đạo xoay của drone giữa hai tư thế hướng quay 3D khác nhau']::varchar[],
    'SLERP dịch chuyển hướng quay dọc theo cung tròn vĩ độ lớn trên mặt cầu Quaternion đơn vị, tốc độ góc không đổi.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_038', 'mcq', 'underwater-aerial',
    'Tại sao tần số vòng lặp điều khiển PID thái độ bay (Attitude Control) của drone phải chạy cực cao (>400Hz)?',
    ARRAY['Để phản ứng tức thời bám thăng bằng trước các cơn gió giật ngẫu nhiên trong không khí', 'Để động cơ cánh quạt không bị nóng', 'Do giới hạn của hệ thống vệ tinh GPS', 'Để truyền video trực tiếp mượt mà'],
    ARRAY['Để phản ứng tức thời bám thăng bằng trước các cơn gió giật ngẫu nhiên trong không khí']::varchar[],
    'Khí động học drone biến đổi phi tuyến nhanh, chậm phản hồi góc nghiêng vài ms sẽ gây lật nhào rơi rớt ngay.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_039', 'short-answer', 'underwater-aerial',
    'Điền tên tiếng Anh chỉ hệ số 4 phần tử số phức dùng mô tả hướng xoay 3D tránh Gimbal Lock. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Quaternion']::varchar[],
    'Quaternion mô tả hướng xoay 3D hiệu quả.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_04'
  ),
  (
    'cs_spcrob_q_040', 'short-answer', 'underwater-aerial',
    'Điền tên hiện tượng suy biến mất 1 bậc tự do khi góc pitch của hệ Euler đạt 90 độ. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['gimbal lock', 'khóa gimbal']::varchar[],
    'Gimbal Lock làm mất bậc tự do quay.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Robot thám hiểm vũ trụ & Công nghệ bôi trơn chất rắn (cs_spcrob_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_041', 'mcq', 'space-humanoid',
    'Tại sao robot vũ trụ (như các Rover trên Sao Hỏa) không được phép dùng mỡ bôi trơn lỏng thông thường cho ổ khớp?',
    ARRAY['Vì trong môi trường chân không siêu cao, dầu mỡ lỏng sẽ bị bay hơi lập tức (outgassing) làm kẹt cứng khớp bánh răng', 'Vì dầu mỡ lỏng làm hỏng vi mạch điện tử', 'Vì dầu mỡ nặng hơn màng bôi trơn chất rắn', 'Do dầu mỡ hấp thụ phóng xạ vũ trụ'],
    ARRAY['Vì trong môi trường chân không siêu cao, dầu mỡ lỏng sẽ bị bay hơi lập tức (outgassing) làm kẹt cứng khớp bánh răng']::varchar[],
    'Chân không vũ trụ làm giảm nhiệt độ sôi của chất lỏng, biến dầu mỡ lỏng thành hơi khí thoát đi.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_042', 'mcq', 'space-humanoid',
    'Hiện tượng "Hàn lạnh" (Cold Welding) trong chân không vũ trụ xảy ra thế nào?',
    ARRAY['Hai bề mặt kim loại tiếp xúc trực tiếp tự liên kết dính chặt vào nhau do không có lớp màng oxit cách ngăn', 'Robot bị đông cứng do nhiệt độ lạnh', 'Kim loại tự chảy lỏng ở nhiệt độ âm', 'Dòng điện tự phát sinh giữa hai thanh sắt'],
    ARRAY['Hai bề mặt kim loại tiếp xúc trực tiếp tự liên kết dính chặt vào nhau do không có lớp màng oxit cách ngăn']::varchar[],
    'Ngoài vũ trụ không có khí oxy để tự động tái tạo lớp oxit bảo vệ bề mặt kim loại, khiến các nguyên tử sắt chạm nhau tự liên kết hóa trị.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_043', 'mcq', 'space-humanoid',
    'Vật liệu bôi trơn chất rắn (Solid Lubricant) nào sau đây được dùng phổ biến nhất cho robot vũ trụ?',
    ARRAY['MoS2 (Molybdenum Disulfide)', 'Dầu mỡ động cơ ô tô', 'Nước cất tinh khiết', 'Bột than củi thông thường'],
    ARRAY['MoS2 (Molybdenum Disulfide)']::varchar[],
    'MoS2 có cấu trúc tinh thể dạng lớp dẹt, dễ trượt sạt lên nhau trong chân không khô tuyệt đối.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_044', 'mcq', 'space-humanoid',
    'Tại sao việc bay hơi dầu mỡ lỏng (outgassing) lại gây tổn hại lớn cho các cảm biến quang học của robot vũ trụ?',
    ARRAY['Hơi dầu bay ra sẽ ngưng tụ bám một lớp màng sương mờ bẩn làm hỏng thấu kính camera và cảm biến laser', 'Làm chập cháy bóng LED hồng ngoại', 'Tự động phản xạ tia laser đi chỗ khác', 'Làm sụt áp nguồn điện cảm biến'],
    ARRAY['Hơi dầu bay ra sẽ ngưng tụ bám một lớp màng sương mờ bẩn làm hỏng thấu kính camera và cảm biến laser']::varchar[],
    'Khí hóa chất bay hơi trong chân không bám vào thấu kính lạnh, phá hủy khả năng thu nhận hình ảnh quang học.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_045', 'mcq', 'space-humanoid',
    'Vật liệu làm vòng bi nào giúp robot tránh được hiện tượng hàn lạnh (Cold Welding) hiệu quả?',
    ARRAY['Ceramic (Gốm silicon nitride)', 'Thép carbon thông thường', 'Nhôm dẻo chế tạo vỏ máy', 'Hợp kim đồng thau'],
    ARRAY['Ceramic (Gốm silicon nitride)']::varchar[],
    'Gốm ceramic là phi kim, không có liên kết electron tự do như kim loại nên không xảy ra hiện tượng hàn lạnh.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_046', 'mcq', 'space-humanoid',
    'Yêu cầu "Radiation Hardening" đối với chip máy tính nhúng của robot vũ trụ là gì?',
    ARRAY['Chế tạo vi xử lý có khả năng kháng bức xạ ion hóa vũ trụ (chống lỗi lật bit nhớ và quá nhiệt)', 'Bọc chip bằng lớp vỏ chống nước nước', 'Tăng tốc độ xung nhịp CPU lên gấp 10', 'Sử dụng tản nhiệt chất lỏng tuần hoàn'],
    ARRAY['Chạy thiết kế vi xử lý có khả năng kháng bức xạ ion hóa vũ trụ (chống lỗi lật bit nhớ và quá nhiệt)', 'Chế tạo vi xử lý có khả năng kháng bức xạ ion hóa vũ trụ (chống lỗi lật bit nhớ và quá nhiệt)']::varchar[],
    'Bức xạ vũ trụ bắn phá các transistor trên chip silicon gây lỗi biến đổi bit dữ liệu (Single Event Upset). Radiation Hardening bọc chì bảo vệ mạch và dùng SRAM dự phòng.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_047', 'mcq', 'space-humanoid',
    'Nguồn năng lượng hạt nhân RTG (Radioisotope Thermoelectric Generator) trên các Rover vũ trụ tạo ra điện bằng cách nào?',
    ARRAY['Chuyển hóa nhiệt lượng tỏa ra từ sự phân rã phóng xạ tự nhiên của Plutonium-238 thành điện năng', 'Sử dụng cánh quạt gió thu năng lượng', 'Đốt cháy hydro lỏng mang theo', 'Hấp thụ năng lượng sóng hấp dẫn'],
    ARRAY['Chuyển hóa nhiệt lượng tỏa ra từ sự phân rã phóng xạ tự nhiên của Plutonium-238 thành điện năng']::varchar[],
    'RTG cấp nguồn điện liên tục hàng chục năm bất kể bão bụi che kín ánh mặt trời trên Sao Hỏa.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_048', 'mcq', 'space-humanoid',
    'Tại sao robot vũ trụ thường phải trang bị các tấm heater sưởi ấm cục bộ bên trong các ổ khớp?',
    ARRAY['Để giữ nhiệt độ khớp không bị tụt xuống âm hàng trăm độ C ngoài râm, ngăn màng bôi trơn bị đông cứng dòn gãy', 'Để robot di chuyển nhanh hơn', 'Để nung nóng chảy các khối băng cản đường', 'Để phát sóng hồng ngoại cứu hộ'],
    ARRAY['Để giữ nhiệt độ khớp không bị tụt xuống âm hàng trăm độ C ngoài râm, ngăn màng bôi trơn bị đông cứng dòn gãy']::varchar[],
    'Nhiệt độ âm sâu làm kim loại dòn gãy và thay đổi dung sai cơ khí chế tạo bánh răng khớp.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_049', 'short-answer', 'space-humanoid',
    'Điền tên viết tắt tiếng Anh của chất bôi trơn rắn Molybdenum Disulfide. (Viết hoa chữ đầu và cuối)',
    NULL,
    ARRAY['MoS2', 'MoS_2']::varchar[],
    'MoS2 là chất bôi trơn rắn vũ trụ.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_05'
  ),
  (
    'cs_spcrob_q_050', 'short-answer', 'space-humanoid',
    'Điền tên hiện tượng hai thanh kim loại tự dính chặt vào nhau trong chân không vũ trụ. (Viết thường có khoảng trắng)',
    NULL,
    ARRAY['hàn lạnh', 'cold welding']::varchar[],
    'Hàn lạnh gây nguy cơ kẹt cơ cấu kẹp vũ trụ.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Cấu trúc cơ học khớp háng & Cơ bắp nhân tạo của Robot nhân hình (cs_spcrob_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_051', 'mcq', 'space-humanoid',
    'Tại sao khớp hông (Hip Joint) của robot nhân hình humanoid thường được thiết kế có đúng 3 bậc tự do (3 DOF)?',
    ARRAY['Để mô phỏng hoàn chỉnh chuyển động đa hướng của khớp hông người: xoay Yaw, gập Pitch, nghiêng Roll', 'Để giảm số lượng động cơ điều khiển', 'Để tăng chiều cao thân robot', 'Do quy định của hệ điều hành ROS2'],
    ARRAY['Để mô phỏng hoàn chỉnh chuyển động đa hướng của khớp hông người: xoay Yaw, gập Pitch, nghiêng Roll']::varchar[],
    '3 DOF giao nhau tại tâm khớp háng cho phép chân chuyển động cầu linh hoạt giữ thăng bằng động.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_052', 'mcq', 'space-humanoid',
    'Cơ cấu cơ bắp nhân tạo khí nén (PAM - Pneumatic Artificial Muscle) co rút tạo lực kéo bằng cách nào?',
    ARRAY['Bơm khí nén làm phồng đường kính ống cao su lưới dệt, làm co rút chiều dài dọc trục của cơ', 'Nung nóng dây Nitinol bằng dòng điện', 'Hút chân không túi hạt cát', 'Đảo chiều quay của rotor động cơ'],
    ARRAY['Bơm khí nén làm phồng đường kính ống cao su lưới dệt, làm co rút chiều dài dọc trục của cơ']::varchar[],
    'McKibben muscle chuyển đổi sự nở ngang thành sự co dọc trục tạo lực kéo tuyến tính rất mạnh.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_053', 'mcq', 'space-humanoid',
    'Hợp kim nhớ hình Nitinol (SMA - Shape Memory Alloy) phản hồi chuyển động co rút cơ học dựa trên tác nhân nào?',
    ARRAY['Sự thay đổi nhiệt độ bằng dòng điện chạy qua nung nóng vật liệu', 'Sự chênh lệch áp suất khí nén', 'Từ trường xoay của nam châm', 'Quét tia laser ToF'],
    ARRAY['Sự thay đổi nhiệt độ bằng dòng điện chạy qua nung nóng vật liệu']::varchar[],
    'SMA chuyển pha tinh thể giữa Martensite (lạnh, dẻo) và Austenite (nóng, cứng phục hồi dạng cũ) sinh lực co kéo.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_054', 'mcq', 'space-humanoid',
    'Nhược điểm lớn nhất khiến hợp kim nhớ hình SMA ít được dùng cho khớp đi chân chính của robot humanoid lớn là gì?',
    ARRAY['Tốc độ phản hồi chậm do tốn thời gian truyền nhiệt làm nguội tự nhiên và hiệu suất năng lượng thấp', 'Giá thành vật liệu Nitinol quá đắt đỏ', 'Trọng lượng của sợi dây Nitinol quá nặng', 'Gây nhiễu điện từ cực mạnh làm treo chip'],
    ARRAY['Tốc độ phản hồi chậm do tốn thời gian truyền nhiệt làm nguội tự nhiên và hiệu suất năng lượng thấp']::varchar[],
    'SMA bị giới hạn bởi chu kỳ giải nhiệt nguội, tần số co duỗi thấp (<1Hz), không đáp ứng được bước đi nhanh.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_055', 'mcq', 'space-humanoid',
    'Tại sao các động cơ khớp của chân robot humanoid thường được thiết kế dồn hết lên sát phần thân trên?',
    ARRAY['Để giảm mô-men quán tính của các chi dưới chân giúp chân robot vung đá bước đi nhanh và tiết kiệm năng lượng', 'Để tránh động cơ bị ướt khi đi qua vũng nước', 'Để dễ cắm dây cáp điều khiển', 'Do chân robot không có chỗ trống chứa động cơ'],
    ARRAY['Để giảm mô-men quán tính của các chi dưới chân giúp chân robot vung đá bước đi nhanh và tiết kiệm năng lượng']::varchar[],
    'Dồn khối lượng lên hông giúp chân nhẹ hơn (đùi, bắp chân mỏng nét), dễ điều khiển gia tốc vung chân.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_056', 'mcq', 'space-humanoid',
    'Cơ cấu truyền động giảm tốc Harmonic Drive được dùng phổ biến trong khớp robot humanoid nhờ ưu thế nào?',
    ARRAY['Độ rơ bằng không (Zero Backlash) và tỷ số giảm tốc cực lớn trong kích thước siêu phẳng nhẹ', 'Giá thành rẻ như bánh răng nhựa', 'Không cần dùng dầu bôi trơn', 'Tự động đảo chiều quay bánh'],
    ARRAY['Độ rơ bằng không (Zero Backlash) và tỷ số giảm tốc cực lớn trong kích thước siêu phẳng nhẹ']::varchar[],
    'Harmonic Drive sử dụng biến dạng đàn hồi của vòng răng mỏng để triệt tiêu hoàn toàn khe hở rơ khớp.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_057', 'mcq', 'space-humanoid',
    'Điểm không thế năng Zero Moment Point (ZMP) là tiêu chuẩn để robot humanoid làm gì?',
    ARRAY['Lập kế hoạch bước đi giữ thăng bằng không bị ngã đổ', 'Tính góc quay camera', 'Đo đạc tốc độ sạc pin', 'Điều phối nhịp xung PWM động cơ'],
    ARRAY['Lập kế hoạch bước đi giữ thăng bằng không bị ngã đổ']::varchar[],
    'Nếu điểm ZMP nằm hoàn toàn bên trong đa giác nâng đỡ của lòng bàn chân robot, robot sẽ đứng vững không bị lật ngã.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_058', 'mcq', 'space-humanoid',
    'Bộ truyền động nối tiếp đàn hồi (SEA - Series Elastic Actuator) tích hợp thêm lò xo giữa động cơ và khớp nhằm mục đích gì?',
    ARRAY['Tạo độ đàn hồi tự nhiên để bảo vệ hộp số khỏi va đập đột ngột và đo lực khớp chính xác qua độ biến dạng lò xo', 'Để tăng tốc độ quay tối đa', 'Để cách ly nguồn điện', 'Để tăng dòng điện động cơ'],
    ARRAY['Tạo độ đàn hồi tự nhiên để bảo vệ hộp số khỏi va đập đột ngột và đo lực khớp chính xác qua độ biến dạng lò xo']::varchar[],
    'SEA bảo vệ cơ khí khi robot humanoid dẫm mạnh xuống sàn phẳng cứng và cho phép điều khiển lực tương tác an toàn.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_059', 'short-answer', 'space-humanoid',
    'Điền tên viết tắt tiếng Anh của cơ bắp nhân tạo hoạt động bằng khí nén. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PAM']::varchar[],
    'PAM là Pneumatic Artificial Muscle.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_06'
  ),
  (
    'cs_spcrob_q_060', 'short-answer', 'space-humanoid',
    'Điền tên viết tắt tiếng Anh của điểm không thế năng dùng để kiểm soát thăng bằng đi bộ của humanoid. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ZMP']::varchar[],
    'ZMP là Zero Moment Point.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Exoskeleton: Cảm biến điện cơ EMG & Thuật toán hỗ trợ lực (cs_spcrob_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_071', 'mcq', 'bio-exoskeleton',
    'Cảm biến điện cơ EMG (Electromyography) đo đạc tín hiệu sinh học nào từ con người?',
    ARRAY['Các xung điện thế cực nhỏ sinh ra do sự co rút của các bó cơ bắp bên dưới da khi não ra lệnh vận động', 'Điện tâm đồ nhịp tim', 'Sóng điện não tập trung', 'Nhiệt độ cơ thể bên ngoài'],
    ARRAY['Các xung điện thế cực nhỏ sinh ra do sự co rút của các bó cơ bắp bên dưới da khi não ra lệnh vận động']::varchar[],
    'EMG đo hoạt động điện sinh học của cơ bắp, cho biết ý định vận động tức thời của người đeo.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_072', 'mcq', 'bio-exoskeleton',
    'Biên độ của tín hiệu điện cơ EMG đo trên bề mặt da thường nằm trong dải nào?',
    ARRAY['Cực kỳ nhỏ, cấp độ micro-volts (uV) đến vài mili-volts (mV), đòi hỏi bộ khuếch đại nhạy bén', 'Khoảng 5V đến 12V', 'Xoay chiều 220V', 'Bằng 0'],
    ARRAY['Cực kỳ nhỏ, cấp độ micro-volts (uV) đến vài mili-volts (mV), đòi hỏi bộ khuếch đại nhạy bén']::varchar[],
    'Tín hiệu sinh học siêu nhỏ dễ bị chìm trong nhiễu lưới điện xoay chiều 50Hz, cần mạch khuếch đại vi sai (Instrumentation Amplifier).',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_073', 'mcq', 'bio-exoskeleton',
    'Mục tiêu của thuật toán "Hỗ trợ lực" (Assistive Control) trong bộ đồ xương ngoài Exoskeleton là gì?',
    ARRAY['Điều khiển mô-men động cơ khớp tỷ lệ thuận với cường độ co cơ người đeo để gánh bớt tải trọng vật lý', 'Tự động khóa cứng khớp không cho người cử động', 'Tải dữ liệu sức khỏe lên mạng internet', 'Phát nhạc giải trí cho công nhân'],
    ARRAY['Điều khiển mô-men động cơ khớp tỷ lệ thuận với cường độ co cơ người đeo để gánh bớt tải trọng vật lý']::varchar[],
    'Thuật toán đồng bộ hóa lực trợ giúp lực của robot khớp với nhịp vận động sinh học con người.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_074', 'mcq', 'bio-exoskeleton',
    'Tại sao cảm biến EMG bề mặt da (sEMG) lại dễ bị nhiễu sai lệch kết quả đọc?',
    ARRAY['Do mồ hôi làm thay đổi trở kháng tiếp xúc của điện cực và sự dịch chuyển trượt của da khi cơ co rút', 'Do ánh sáng mặt trời lóa sáng cảm biến', 'Do sóng bluetooth điện thoại', 'Do robot đi quá nhanh'],
    ARRAY['Do mồ hôi làm thay đổi trở kháng tiếp xúc của điện cực và sự dịch chuyển trượt của da khi cơ co rút']::varchar[],
    'Trở kháng da biến đổi liên tục yêu cầu các gel dẫn điện điện cực chất lượng cao và bộ lọc số thông dải dải tần 20Hz-500Hz.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_075', 'mcq', 'bio-exoskeleton',
    'Phương pháp điều khiển Admittance (độ chấp nhận lực) hoạt động dựa trên thông số đầu vào nào?',
    ARRAY['Đo lực tương tác giữa người đeo và bộ khung Exoskeleton để điều khiển vị trí khớp robot bám theo chuyển động người', 'Đo tốc độ gió xung quanh', 'Đo dung lượng pin sạc', 'Đo nhiệt độ của Driver động cơ'],
    ARRAY['Đo lực tương tác giữa người đeo và bộ khung Exoskeleton để điều khiển vị trí khớp robot bám theo chuyển động người']::varchar[],
    'Cảm biến lực gắn tại giao diện tiếp xúc người-máy đo lực đẩy của chân người để điều phối tốc độ xoay động cơ đi trước đón đường.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_076', 'mcq', 'bio-exoskeleton',
    'Ràng buộc an toàn phần cứng (Mechanical Limit) quan trọng nhất của mọi khớp Exoskeleton là gì?',
    ARRAY['Giới hạn góc quay tối đa của khớp robot nhỏ hơn giới hạn sinh học khớp xương người đeo để tránh bẻ gãy chi người', 'Không cho phép động cơ dừng hoạt động', 'Bắt buộc dùng pin điện áp cao', 'Cách ly hoàn toàn vỏ sắt của máy'],
    ARRAY['Giới hạn góc quay tối đa của khớp robot nhỏ hơn giới hạn sinh học khớp xương người đeo để tránh bẻ gãy chi người']::varchar[],
    'Mọi lỗi phần mềm điều khiển vượt giới hạn góc bẻ khớp người đeo có thể gây chấn thương xương khớp vĩnh viễn cho người sử dụng.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_077', 'mcq', 'bio-exoskeleton',
    'Trong xử lý tín hiệu EMG thô, bước "Lấy phong bì tín hiệu" (Envelope) thường sử dụng tổ hợp bộ lọc số nào?',
    ARRAY['Chỉnh lưu toàn phần (lấy trị tuyệt đối) kết hợp bộ lọc thông thấp (Low-pass filter)', 'Lọc thông cao Butterworth', 'Biến đổi Fourier nhanh FFT', 'Bộ lọc Kalman tích hợp động cơ'],
    ARRAY['Chỉnh lưu toàn phần (lấy trị tuyệt đối) kết hợp bộ lọc thông thấp (Low-pass filter)']::varchar[],
    'Lấy trị tuyệt đối và lọc thông thấp cắt tần số cao giúp trích xuất đường viền biên độ co cơ mượt mà đại diện cho độ lớn lực.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_078', 'mcq', 'bio-exoskeleton',
    'Mục tiêu chính của việc phát triển các bộ đồ xương ngoài Exoskeleton phục hồi chức năng là gì?',
    ARRAY['Hỗ trợ người liệt bán thân tập đi lại theo chu kỳ quỹ đạo chuẩn để kích thích hệ thần kinh cơ phục hồi', 'Giúp người đeo chạy nhanh hơn ô tô', 'Hỗ trợ bay lượn trên không', 'Thay thế các xe đẩy hàng trong nhà máy'],
    ARRAY['Hỗ trợ người liệt bán thân tập đi lại theo chu kỳ quỹ đạo chuẩn để kích thích hệ thần kinh cơ phục hồi']::varchar[],
    'Robot phục hồi chức năng hoạt động như giáo án vật lý trị liệu chuyển động thụ động cho bệnh nhân.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_079', 'short-answer', 'bio-exoskeleton',
    'Điền tên viết tắt tiếng Anh của cảm biến đo điện cơ bắp người. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['EMG']::varchar[],
    'EMG là Electromyography.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_07'
  ),
  (
    'cs_spcrob_q_080', 'short-answer', 'bio-exoskeleton',
    'Điền tên tiếng Anh chỉ bộ đồ khung xương ngoài robot hỗ trợ lực đeo trên người. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Exoskeleton']::varchar[],
    'Exoskeleton là bộ khung hỗ trợ lực.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Robot nông nghiệp tự động: Dẫn đường hàng cây & Gắp quả mềm (cs_spcrob_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_081', 'mcq', 'bio-exoskeleton',
    'Giải thuật toán học nào thường được dùng để phát hiện các đường thẳng hàng cây song song (Crop-row) từ ảnh quét camera của robot nông nghiệp?',
    ARRAY['Biến đổi Hough (Hough Transform)', 'Bộ lọc Canny đơn thuần', 'Giải thuật tìm đường đi A*', 'Bộ lọc Kalman thích nghi'],
    ARRAY['Biến đổi Hough (Hough Transform)']::varchar[],
    'Hough Transform tìm các đường thẳng tập trung từ tập hợp các pixel biên cạnh hàng cây.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_082', 'mcq', 'bio-exoskeleton',
    'Cảm biến lực dạng màng mỏng FSR (Force Sensing Resistor) gắn ở đầu ngón kẹp hái quả hoạt động dựa trên nguyên lý nào?',
    ARRAY['Điện trở giảm dần khi lực ép cơ học lên bề mặt màng tăng lên', 'Đo tần số siêu âm phản xạ', 'Đo cường độ ánh sáng hồng ngoại', 'Tự động phát ra dòng điện xoay chiều'],
    ARRAY['Điện trở giảm dần khi lực ép cơ học lên bề mặt màng tăng lên']::varchar[],
    'FSR đổi trị số trở kháng theo tiếp xúc nén lực, dễ đọc điện áp chia áp qua ADC vi điều khiển.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_083', 'mcq', 'bio-exoskeleton',
    'Để robot nông nghiệp tự hành hoạt động bền bỉ trong môi trường sương mù, bùn đất, nước tưới cây ngoài đồng ruộng, vỏ robot phải đạt chỉ số chống nước tối thiểu nào?',
    ARRAY['IP65 hoặc IP67', 'IP20', 'IP30', 'Không cần chống nước'],
    ARRAY['IP65 hoặc IP67']::varchar[],
    'IP67 bảo đảm robot kháng bụi cát hoàn toàn và chịu được nước phun từ vòi tưới hoặc ngập nước nông tạm thời.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_084', 'mcq', 'bio-exoskeleton',
    'Phương pháp nắn ảnh nào biến đổi góc nhìn nghiêng của camera gắn trên đầu robot nông nghiệp thành ảnh phẳng nhìn thẳng Bird''s Eye View từ trên xuống?',
    ARRAY['Biến đổi phối cảnh Homography (ma trận H)', 'Bộ lọc Gaussian', 'Lọc nhiễu muối tiêu', 'Biến đổi Fourier 2D'],
    ARRAY['Biến đổi phối cảnh Homography (ma trận H)']::varchar[],
    'Homography nắn ảnh mặt sàn ruộng giúp robot đo khoảng cách thực tế giữa các luống cây để căn chỉnh bánh lái.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_085', 'mcq', 'bio-exoskeleton',
    'Khi robot hái dâu tây chín đỏ, camera RGB-D thực hiện nhiệm vụ gì?',
    ARRAY['Xác định màu sắc đỏ của quả chín (RGB) và tọa độ vị trí 3D (Z) của quả dâu trong không gian để cánh tay vươn tới kẹp gắp', 'Chỉ đo khoảng cách nhiệt độ', 'Publish dữ liệu lên internet', 'Đo đạc tốc độ gió ngoài đồng'],
    ARRAY['Xác định màu sắc đỏ của quả chín (RGB) và tọa độ vị trí 3D (Z) của quả dâu trong không gian để cánh tay vươn tới kẹp gắp']::varchar[],
    'RGB-D cung cấp đồng thời kênh màu để phân đoạn quả chín và bản đồ độ sâu để định vị tọa độ khâu chấp hành kẹp.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_086', 'mcq', 'bio-exoskeleton',
    'Tại sao việc lập kế hoạch đường đi (Path Planning) cho robot nông nghiệp ngoài cánh đồng lại khó hơn trong nhà kho công nghiệp phẳng?',
    ARRAY['Địa hình ruộng gồ ghề, lồi lõm, trơn trượt làm bánh xe bị trượt liên tục gây sai số odometry bánh lớn', 'Cánh đồng không có nguồn điện wifi', 'Đồng ruộng có quá ít chướng ngại vật', 'Do cây trồng tự động di chuyển'],
    ARRAY['Địa hình ruộng gồ ghề, lồi lõm, trơn trượt làm bánh xe bị trượt liên tục gây sai số odometry bánh lớn']::varchar[],
    'Sự trượt lốp trên bùn đất phá hỏng mô hình odometry bánh xe, đòi hỏi tích hợp cảm biến định vị tuyệt đối tần số cao.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_087', 'mcq', 'bio-exoskeleton',
    'Trong bài toán phân loại hoa quả chín trên băng chuyền nông sản, mạng học sâu CNN thường xuất kết quả đầu ra dạng gì?',
    ARRAY['Nhãn phân loại (ví dụ: Loại A, Loại B, Bị hỏng) kèm xác suất tin cậy', 'Tín hiệu băm xung PWM', 'Góc xoay ma trận Euler', 'Dữ liệu đám mây điểm Point Cloud'],
    ARRAY['Nhãn phân loại (ví dụ: Loại A, Loại B, Bị hỏng) kèm xác suất tin cậy']::varchar[],
    'Mạng CNN phân lớp đặc trưng bề mặt để gán chất lượng nông sản tự động tốc độ cao.',
    5, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_088', 'mcq', 'bio-exoskeleton',
    'Cơ cấu kẹp hái bằng lực hút chân không (Vacuum Gripper) thích hợp cho loại nông sản nào?',
    ARRAY['Các quả có bề mặt vỏ nhẵn cứng và kích thước đều đặn (như táo, cam)', 'Quả có nhiều gai nhọn như sầu riêng', 'Hạt lúa mì rơi vãi', 'Các củ khoai tây dưới lòng đất'],
    ARRAY['Các quả có bề mặt vỏ nhẵn cứng và kích thước đều đặn (như táo, cam)']::varchar[],
    'Giác hút silicone tạo chênh lệch áp suất ôm chặt bề mặt nhẵn bóng của cam, táo mà không làm trầy xước.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_089', 'short-answer', 'bio-exoskeleton',
    'Điền tên cảm biến điện trở lực màng mỏng gắn ở ngón kẹp robot. (Viết tắt 3 chữ cái viết hoa)',
    NULL,
    ARRAY['FSR']::varchar[],
    'FSR là Force Sensing Resistor.',
    5, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_08'
  ),
  (
    'cs_spcrob_q_090', 'short-answer', 'bio-exoskeleton',
    'Điền tên thuật toán biến đổi hình học ảnh dùng phát hiện đường thẳng hàng cây. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Hough', 'Biến đổi hough']::varchar[],
    'Hough Transform tìm đường thẳng trên ảnh nhị phân.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Robot mô phỏng sinh học: Robot rắn & Bám tường Gecko (cs_spcrob_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_spcrob_q_091', 'mcq', 'bio-exoskeleton',
    'Robot rắn (Snake Robot) di chuyển tịnh tiến chủ yếu dựa trên chuyển động phối hợp nào?',
    ARRAY['Sóng uốn lượn (Serpentine motion) tạo lực đẩy ngang nghiêng vào các mốc tiếp xúc môi trường', 'Lăn tròn toàn bộ thân hình', 'Sử dụng các bánh xích ẩn dưới bụng', 'Bay lơ lửng nhờ phản lực khí'],
    ARRAY['Sóng uốn lượn (Serpentine motion) tạo lực đẩy ngang nghiêng vào các mốc tiếp xúc môi trường']::varchar[],
    'Robot rắn luồn lách qua các chướng ngại vật bằng cách tạo sóng uốn khúc uốn lượn cơ học dọc thân.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_092', 'mcq', 'bio-exoskeleton',
    'Công nghệ bám dính khô chân tắc kè (Gecko adhesion) mô phỏng cơ chế bám kính nào?',
    ARRAY['Lực liên kết phân tử Van der Waals giữa hàng triệu sợi lông silicon siêu nhỏ (setae) và bề mặt tiếp xúc', 'Keo dán ướt tự xịt liên tục', 'Nam châm điện công suất cực lớn', 'Giác hút chân không bằng nhựa'],
    ARRAY['Lực liên kết phân tử Van der Waals giữa hàng triệu sợi lông silicon siêu nhỏ (setae) và bề mặt tiếp xúc']::varchar[],
    'Mô phỏng chân tắc kè tạo ra lực hút bám dính khô ở cấp độ phân tử nano, bám tốt trên cả kính siêu nhẵn thẳng đứng.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_093', 'mcq', 'bio-exoskeleton',
    'Làm thế nào để robot bám tường Gecko nhấc chân ra khỏi mặt kính dễ dàng mà không bị keo giữ lại?',
    ARRAY['Thay đổi góc lột chân (peeling angle) để tách dần dần các sợi lông siêu nhỏ khỏi tiếp xúc phân tử', 'Tắt dòng điện cấp cho chân', 'Xịt hóa chất dung môi làm tan keo', 'Dùng động cơ búa đập mạnh chân ra'],
    ARRAY['Thay đổi góc lột chân (peeling angle) để tách dần dần các sợi lông siêu nhỏ khỏi tiếp xúc phân tử']::varchar[],
    'Bám dính tắc kè có thuộc tính dị hướng (anisotropic), góc bám gắt sinh lực giữ chặt, góc lột rộng tự nhả nhẹ nhàng.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_094', 'mcq', 'bio-exoskeleton',
    'Mô hình toán học sinh học CPG (Central Pattern Generator) được dùng trong robot rắn để làm gì?',
    ARRAY['Tạo ra các chuỗi xung tuần hoàn hình sin tự nhiên điều phối góc quay của tất cả các khớp nối liên tiếp', 'Tính toán vị trí GPS', 'Lập bản đồ 3D point cloud', 'Điều khiển đóng ngắt van khí nén'],
    ARRAY['Tạo ra các chuỗi xung tuần hoàn hình sin tự nhiên điều phối góc quay của tất cả các khớp nối liên tiếp']::varchar[],
    'CPG mô phỏng mạng thần kinh cột sống sinh vật tạo nhịp sóng cơ học phối hợp tự nhiên.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_095', 'mcq', 'bio-exoskeleton',
    'Thử thách điều khiển lớn nhất của robot leo tường thẳng đứng là gì?',
    ARRAY['Kiểm soát lực bám và mô-men lực trọng trường để tránh mô-men kéo lật robot ngửa ngã ra phía sau', 'Động cơ bị nóng quá nhanh', 'Sóng truyền thông wifi bị mất khi lên cao', 'Trọng lượng robot tăng lên gấp đôi khi ở trên cao'],
    ARRAY['Kiểm soát lực bám và mô-men lực trọng trường để tránh mô-men kéo lật robot ngửa ngã ra phía sau']::varchar[],
    'Trọng tâm xe nằm xa tường tạo cánh tay đòn mô-men kéo lật thân robot, bắt buộc chân trên phải có lực bám thắng mô-men này.',
    7, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_096', 'mcq', 'bio-exoskeleton',
    'Robot rắn thuộc nhóm robot có đặc trưng cơ học nào?',
    ARRAY['Robot dư dẫn động bậc cao (Hyper-redundant robot)', 'Robot non-holonomic xe đạp', 'Robot song song 6 chân Delta', 'Cánh tay robot SCARA cố định'],
    ARRAY['Robot dư dẫn động bậc cao (Hyper-redundant robot)']::varchar[],
    'Robot có số bậc tự do nhiều vượt trội so với số bậc tự do cần thiết để định vị khâu cuối.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_097', 'mcq', 'bio-exoskeleton',
    'Ưu điểm của robot rắn so với robot bánh xích thông thường khi cứu nạn là gì?',
    ARRAY['Khả năng luồn lách qua các đường ống nước quanh co, khe sạt lở đá nhỏ hẹp bất định hình', 'Tốc độ chạy nhanh hơn rất nhiều', 'Khả năng nâng vật nặng 10 tấn', 'Không tiêu tốn điện năng của pin'],
    ARRAY['Khả năng luồn lách qua các đường ống nước quanh co, khe sạt lở đá nhỏ hẹp bất định hình']::varchar[],
    'Thân dẻo thon giúp chui lọt qua các khe hẹp bê tông đổ nát đổ nát.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_098', 'mcq', 'bio-exoskeleton',
    'Vật liệu làm chân bám tường Gecko nhân tạo thường là vật liệu nào?',
    ARRAY['PDMS (Polydimethylsiloxane) hoặc Silicon đúc vi cấu trúc', 'Thép không gỉ', 'Đồng đỏ nguyên chất', 'Nhựa ABS cứng'],
    ARRAY['PDMS (Polydimethylsiloxane) hoặc Silicon đúc vi cấu trúc']::varchar[],
    'PDMS đàn hồi mềm, dễ điền khuôn đúc cấp micromet tạo các sợi lông tắc kè nhân tạo.',
    6, 'Specialized Robotics', 'cs_specialized_robotics', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_099', 'short-answer', 'bio-exoskeleton',
    'Điền tên lực liên kết vật lý phân tử yếu tạo lực bám dính cho chân tắc kè Gecko. (Viết hoa toàn bộ từ đầu, có khoảng trắng)',
    NULL,
    ARRAY['Van der Waals', 'Lực van der waals']::varchar[],
    'Lực Van der Waals tạo độ dính khô.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_09'
  ),
  (
    'cs_spcrob_q_100', 'short-answer', 'bio-exoskeleton',
    'Điền tên viết tắt tiếng Anh của bộ tạo nhịp trung ương sinh học mô tả sóng sin khớp robot rắn. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CPG']::varchar[],
    'CPG là Central Pattern Generator.',
    6, 'Specialized Robotics', 'cs_robotics_fundamentals', 13, 'cs_spcrob_09'
  );

COMMIT;
