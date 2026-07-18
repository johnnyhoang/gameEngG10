-- SQL migration to seed 100 question bank for cs_embedded_hardware (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_embedded_hardware (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_embedded_hardware';

-- ======================================================================================
-- BÀI GIẢNG 1: Kiến trúc Vi điều khiển (MCU) STM32 & ESP32 (cs_embhar_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_001', 'mcq', 'mcu-peripherals',
    'Vi điều khiển (MCU) khác biệt thế nào so với vi xử lý máy tính (CPU thô)?',
    ARRAY['MCU tích hợp sẵn CPU, bộ nhớ RAM, bộ nhớ Flash và các khối ngoại vi điều phối I/O trên cùng một chip duy nhất', 'MCU chạy nhanh hơn CPU máy tính gấp 10 lần', 'MCU không cần nguồn điện', 'MCU chỉ xử lý được tín hiệu tương tự analog'],
    ARRAY['MCU tích hợp sẵn CPU, bộ nhớ RAM, bộ nhớ Flash và các khối ngoại vi điều phối I/O trên cùng một chip duy nhất']::varchar[],
    'MCU là máy tính đơn chip tích hợp toàn bộ tài nguyên hệ thống tối ưu cho điều khiển nhúng.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_002', 'mcq', 'mcu-peripherals',
    'Dòng MCU STM32 được thiết kế dựa trên lõi vi xử lý ARM nào?',
    ARRAY['Cortex-M (như Cortex-M3, M4, M7)', 'Cortex-A', 'Cortex-R', 'ARM9'],
    ARRAY['Cortex-M (như Cortex-M3, M4, M7)']::varchar[],
    'Cortex-M là lõi vi xử lý tối ưu cho các hệ nhúng điều khiển thời gian thực siêu tiết kiệm năng lượng.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_003', 'mcq', 'mcu-peripherals',
    'MCU ESP32 sở hữu ưu thế nổi bật nào so với STM32 truyền thống?',
    ARRAY['Tích hợp sẵn bộ thu phát vô tuyến Wi-Fi và Bluetooth trên chip', 'Có nhiều chân GPIO hơn gấp 10 lần', 'Hoạt động được ở điện áp 220V AC', 'Độ ổn định công nghiệp cao hơn nhiều'],
    ARRAY['Tích hợp sẵn bộ thu phát vô tuyến Wi-Fi và Bluetooth trên chip']::varchar[],
    'ESP32 là giải pháp SoC lý tưởng cho các robot kết nối IoT nhờ kết nối không dây giá rẻ.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_004', 'mcq', 'mcu-peripherals',
    'Khối ngoại vi "GPIO" của vi điều khiển làm nhiệm vụ gì?',
    ARRAY['Xuất nhập tín hiệu số mức logic cao (High) hoặc thấp (Low) trên các chân chip', 'Điều chế độ rộng xung', 'Đọc tín hiệu cảm biến analog', 'Đồng bộ hóa xung clock hệ thống'],
    ARRAY['Xuất nhập tín hiệu số mức logic cao (High) hoặc thấp (Low) trên các chân chip']::varchar[],
    'GPIO là General Purpose Input/Output, cổng đa dụng để giao tiếp trực tiếp với nút bấm, led, rơ le.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_005', 'mcq', 'mcu-peripherals',
    'Tại sao chân GPIO của ESP32 không được phép kết nối trực tiếp với cảm biến 5V cũ của Arduino?',
    ARRAY['Vì ESP32 chạy ở mức điện áp logic 3.3V, cấp 5V trực tiếp sẽ gây quá dòng phá hủy vĩnh viễn GPIO', 'Vì ESP32 không hỗ trợ cảm biến tương tự', 'Vì cảm biến 5V sẽ bị hỏng pin', 'Do thiết kế chân cắm khác nhau'],
    ARRAY['Vì ESP32 chạy ở mức điện áp logic 3.3V, cấp 5V trực tiếp sẽ gây quá dòng phá hủy vĩnh viễn GPIO']::varchar[],
    'GPIO của ESP32 không có tính năng chịu được 5V (not 5V tolerant), bắt buộc phải dùng mạch chuyển mức logic (logic level shifter).',
    6, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_006', 'mcq', 'mcu-peripherals',
    'Bộ nhớ Flash tích hợp trong vi điều khiển dùng để lưu trữ đối tượng nào?',
    ARRAY['Mã nguồn chương trình (firmware) biên dịch của robot', 'Bộ đệm dữ liệu cảm biến tạm thời', 'Bản đồ costmap cục bộ', 'Địa chỉ IP của gateway'],
    ARRAY['Mã nguồn chương trình (firmware) biên dịch của robot']::varchar[],
    'Bộ nhớ Flash là bộ nhớ bất biến (non-volatile), giữ lại dữ liệu chương trình kể cả khi ngắt nguồn điện.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_007', 'mcq', 'mcu-peripherals',
    'Bộ nhớ SRAM trong vi điều khiển thực hiện nhiệm vụ gì?',
    ARRAY['Lưu trữ các biến số tạm thời và ngăn xếp (stack/heap) khi chương trình đang chạy', 'Lưu trữ firmware vĩnh viễn', 'Cách ly nguồn điện của chip', 'Điều khiển xung nhịp timer'],
    ARRAY['Lưu trữ các biến số tạm thời và ngăn xếp (stack/heap) khi chương trình đang chạy']::varchar[],
    'SRAM là bộ nhớ truy cập ngẫu nhiên tĩnh, tốc độ cao, mất dữ liệu khi mất điện.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_008', 'mcq', 'mcu-peripherals',
    'Cơ chế "Pipelining" (đường ống nạp lệnh) trong lõi ARM Cortex-M hoạt động thế nào?',
    ARRAY['Chia quá trình xử lý lệnh thành các bước song song (Nạp lệnh, Giải mã, Thực thi) chạy gối đầu nhau để tăng tốc độ', 'Truyền dòng nước làm mát chip', 'Kết nối nối tiếp các task RTOS', 'Bơm điện áp từ pin vào tụ điện'],
    ARRAY['Chia quá trình xử lý lệnh thành các bước song song (Nạp lệnh, Giải mã, Thực thi) chạy gối đầu nhau để tăng tốc độ']::varchar[],
    'Pipelining giúp CPU thực thi tiệm cận 1 lệnh trên 1 chu kỳ xung nhịp.',
    6, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_009', 'short-answer', 'mcu-peripherals',
    'Điền tên dòng vi điều khiển 32-bit nổi tiếng của hãng STMicroelectronics dựa trên lõi ARM. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['STM32']::varchar[],
    'STM32 là dòng vi điều khiển công nghiệp phổ biến.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  ),
  (
    'cs_embhar_q_010', 'short-answer', 'mcu-peripherals',
    'Điền tên dòng vi điều khiển tích hợp sẵn Wi-Fi và Bluetooth do Espressif Systems phát triển. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ESP32']::varchar[],
    'ESP32 là dòng chip SoC không dây siêu rẻ.',
    5, 'Embedded Hardware', 'cs_embedded_hardware', 13, 'cs_embhar_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Chuẩn giao tiếp UART, SPI & I2C (cs_embhar_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_011', 'mcq', 'serial-bus',
    'Số lượng dây tối thiểu cần thiết để giao tiếp UART giữa hai thiết bị là bao nhiêu?',
    ARRAY['3 dây (Tx, Rx, và GND chung)', '2 dây', '4 dây', '1 dây'],
    ARRAY['3 dây (Tx, Rx, và GND chung)']::varchar[],
    'UART cần Tx (truyền), Rx (nhận) và GND chung làm mốc tham chiếu điện áp.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_012', 'mcq', 'serial-bus',
    'Tại sao giao tiếp I2C bắt buộc phải có điện trở kéo lên (pull-up resistors) trên hai đường dây SDA và SCL?',
    ARRAY['Vì chân I2C cấu hình cực má hở (open-drain), cần điện trở kéo lên nguồn để tạo mức logic 1 khi bus rảnh', 'Để giảm dòng điện tiêu thụ', 'Để cách ly nguồn điện', 'Để tăng tốc độ truyền xung'],
    ARRAY['Vì chân I2C cấu hình cực má hở (open-drain), cần điện trở kéo lên nguồn để tạo mức logic 1 khi bus rảnh']::varchar[],
    'Open-drain chỉ có thể chủ động kéo bus xuống 0. Khi buông ra, điện trở kéo lên đưa bus về 1.',
    6, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_013', 'mcq', 'serial-bus',
    'Giao tiếp SPI (Serial Peripheral Interface) sử dụng chân nào để Master chủ động chọn chip Slave cần giao tiếp?',
    ARRAY['SS / CS (Slave Select / Chip Select)', 'MOSI', 'MISO', 'SCK'],
    ARRAY['SS / CS (Slave Select / Chip Select)']::varchar[],
    'Master kéo chân SS/CS của Slave tương ứng xuống mức thấp 0 để bắt đầu truyền dữ liệu.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_014', 'mcq', 'serial-bus',
    'Đặc trưng truyền dữ liệu của bus SPI so với I2C là gì?',
    ARRAY['Hỗ trợ truyền nhận song công toàn phần (Full-duplex) tốc độ cao đồng thời trên 2 dây MOSI và MISO', 'Chỉ truyền một chiều', 'Chậm hơn I2C nhiều', 'Không có dây xung nhịp đồng bộ'],
    ARRAY['Hỗ trợ truyền nhận song công toàn phần (Full-duplex) tốc độ cao đồng thời trên 2 dây MOSI và MISO']::varchar[],
    'SPI truyền nhận đồng thời nhờ đường truyền Tx/Rx riêng biệt đồng bộ chung 1 clock.',
    6, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_015', 'mcq', 'serial-bus',
    'UART là chuẩn giao tiếp đồng bộ hay bất đồng bộ?',
    ARRAY['Bất đồng bộ (Asynchronous - không truyền dây xung nhịp clock đi kèm)', 'Đồng bộ', 'Song công thời gian thực', 'Đa Master'],
    ARRAY['Bất đồng bộ (Asynchronous - không truyền dây xung nhịp clock đi kèm)']::varchar[],
    'UART bất đồng bộ đòi hỏi hai bên thỏa thuận trước tốc độ Baudrate để tự định thì.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_016', 'mcq', 'serial-bus',
    'Địa chỉ (Address) của thiết bị Slave trong mạng I2C thường có độ dài bao nhiêu bit?',
    ARRAY['7 bits (hoặc 10 bits)', '32 bits', '8 bits', '4 bits'],
    ARRAY['7 bits (hoặc 10 bits)']::varchar[],
    'Địa chỉ 7-bit cho phép tối đa 127 thiết bị Slave kết nối chung 1 đường bus I2C.',
    6, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_017', 'mcq', 'serial-bus',
    'Tín hiệu SCK (Serial Clock) trong bus SPI được tạo ra bởi thiết bị nào?',
    ARRAY['Thiết bị Master', 'Thiết bị Slave', 'Tự tạo ngẫu nhiên', 'Nguồn điện ắc quy'],
    ARRAY['Thiết bị Master']::varchar[],
    'Master chịu trách nhiệm phát xung nhịp SCK để giữ nhịp dịch bit cho toàn bộ hệ thống.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_018', 'mcq', 'serial-bus',
    'Khi kết nối nhiều thiết bị Slave trên bus SPI chung 3 đường dây (SCK, MOSI, MISO), số lượng chân SS/CS của Master tăng lên thế nào?',
    ARRAY['Mỗi Slave cần 1 chân SS/CS riêng biệt từ Master', 'Không thay đổi chân', 'Chỉ cần duy nhất 1 chân cho toàn bộ', 'Tăng gấp đôi số Slave'],
    ARRAY['Mỗi Slave cần 1 chân SS/CS riêng biệt từ Master']::varchar[],
    'Kết nối song song (Star topology) của SPI đòi hỏi Master cấp riêng các đường dây SS/CS độc lập.',
    6, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_019', 'short-answer', 'serial-bus',
    'Điền tên viết tắt của chuẩn giao tiếp 2 dây sử dụng SDA và SCL. (Viết hoa toàn bộ, chữ số ở giữa)',
    NULL,
    ARRAY['I2C']::varchar[],
    'I2C là Inter-Integrated Circuit.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  ),
  (
    'cs_embhar_q_020', 'short-answer', 'serial-bus',
    'Điền tên viết tắt tiếng Anh của chân truyền dữ liệu từ Master sang Slave trong bus SPI. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MOSI']::varchar[],
    'MOSI là Master Out Slave In.',
    5, 'Serial Bus', 'cs_embedded_hardware', 13, 'cs_embhar_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Bus CAN (Controller Area Network) (cs_embhar_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_021', 'mcq', 'serial-bus',
    'Mạng giao tiếp CAN Bus sử dụng phương thức truyền tín hiệu nào để chống nhiễu vượt trội?',
    ARRAY['Truyền tín hiệu vi sai qua hai dây CAN_H và CAN_L', 'Truyền cáp quang xoắn', 'Bọc lưới chống từ trường', 'Sử dụng điện áp cực cao 220V'],
    ARRAY['Truyền tín hiệu vi sai qua hai dây CAN_H và CAN_L']::varchar[],
    'Tín hiệu vi sai đo độ chênh lệch điện áp giữa CAN_H và CAN_L, tự động triệt tiêu nhiễu đồng pha (Common-mode noise).',
    6, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_022', 'mcq', 'serial-bus',
    'Trị số điện trở đầu cuối (Termination Resistor) mắc ở hai đầu đường dây CAN Bus là bao nhiêu?',
    ARRAY['120 Ohm', '10 kOhm', '4.7 kOhm', '1 Ohm'],
    ARRAY['120 Ohm']::varchar[],
    'Cần hai điện trở 120 Ohm đấu song song ở hai đầu bus để phối hợp trở kháng và dập tắt sóng phản xạ đường truyền.',
    6, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_023', 'mcq', 'serial-bus',
    'Trong truyền tin CAN, trạng thái logic "Trội" (Dominant) tương ứng với giá trị bit nào?',
    ARRAY['0', '1', 'Hằng số điện áp', 'Không xác định'],
    ARRAY['0']::varchar[],
    'Dominant bit 0 có mức điện áp chênh lệch vi sai lớn, đè bẹp trạng thái lặn Recessive bit 1.',
    6, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_024', 'mcq', 'serial-bus',
    'Cơ chế phân xử ưu tiên (Arbitration) của CAN Bus giải quyết xung đột thế nào khi hai node phát cùng lúc?',
    ARRAY['Node có Frame ID nhỏ hơn (chứa nhiều bit trội 0 ở đầu) giành quyền truyền tiếp mà không bị ngắt quãng dữ liệu', 'Node phát trước được đi trước', 'Node tự động hủy gói tin phát lại', 'Máy chủ trung tâm phân xử'],
    ARRAY['Node có Frame ID nhỏ hơn (chứa nhiều bit trội 0 ở đầu) giành quyền truyền tiếp mà không bị ngắt quãng dữ liệu']::varchar[],
    'Arbitration phi phá hủy (non-destructive) bảo đảm bus luôn truyền được gói tin ưu tiên cao nhất.',
    7, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_025', 'mcq', 'serial-bus',
    'Hệ điều hành mạng robot công nghiệp tiêu chuẩn chạy đè lên lớp vật lý CAN bus có tên là gì?',
    ARRAY['CANopen (hoặc DeviceNet)', 'ROS2', 'TCP/IP', 'EtherCAT'],
    ARRAY['CANopen (hoặc DeviceNet)']::varchar[],
    'CANopen định nghĩa các lớp ứng dụng điều khiển thiết bị, truyền thông PDO/SDO cho động cơ khớp.',
    6, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_026', 'mcq', 'serial-bus',
    'Trạng thái vi sai của CAN Bus khi rảnh (Recessive) có hiệu điện thế chênh lệch bằng bao nhiêu?',
    ARRAY['0V (cả hai dây CAN_H và CAN_L đều ở mức 2.5V)', '2V', '5V', '-2.5V'],
    ARRAY['0V (cả hai dây CAN_H và CAN_L đều ở mức 2.5V)']::varchar[],
    'Khi rảnh, hiệu điện thế chênh lệch bằng 0V biểu thị bit lặn 1.',
    7, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_027', 'mcq', 'serial-bus',
    'Độ dài tối đa của vùng dữ liệu (Payload) trong khung truyền CAN truyền thống là bao nhiêu?',
    ARRAY['8 bytes', '64 bytes', '128 bytes', '1024 bytes'],
    ARRAY['8 bytes']::varchar[],
    'CAN cổ điển giới hạn payload 8 bytes để giữ khung truyền ngắn gọn, giảm độ trễ cho xe hơi.',
    5, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_028', 'mcq', 'serial-bus',
    'Bản nâng cấp CAN FD (Flexible Data-rate) mang lại cải tiến nào?',
    ARRAY['Tăng tốc độ truyền dữ liệu lên tới 5-8 Mbps và nâng payload tối đa lên tới 64 bytes', 'Sử dụng cáp quang', 'Cách ly hoàn toàn bằng từ trường', 'Loại bỏ điện trở đầu cuối'],
    ARRAY['Tăng tốc độ truyền dữ liệu lên tới 5-8 Mbps và nâng payload tối đa lên tới 64 bytes']::varchar[],
    'CAN FD cho phép chuyển đổi baudrate cao hơn ở phần truyền payload, tăng thông lượng mạng xe tự hành.',
    7, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_029', 'short-answer', 'serial-bus',
    'Điền tên viết tắt của mạng điều khiển xe hơi công nghiệp phát triển bởi Bosch. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CAN']::varchar[],
    'CAN là Controller Area Network.',
    5, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  ),
  (
    'cs_embhar_q_030', 'short-answer', 'serial-bus',
    'Điền giá trị trở kháng đầu cuối mắc ở cuối bus truyền CAN. (Điền số kèm đơn vị viết thường)',
    NULL,
    ARRAY['120 ohm', '120 ôm']::varchar[],
    'Trở kháng phối hợp là 120 Ohm.',
    6, 'CAN Bus', 'cs_embedded_hardware', 13, 'cs_embhar_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Cơ chế ngắt ISR & Truy cập bộ nhớ trực tiếp DMA (cs_embhar_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_031', 'mcq', 'mcu-peripherals',
    'Cơ chế "Ngắt" (Interrupt) hoạt động thế nào trong vi điều khiển?',
    ARRAY['CPU tạm dừng chương trình chính lập tức để chuyển sang xử lý một tác vụ khẩn cấp (ISR), sau đó quay lại chạy tiếp', 'Cắt nguồn điện tức thời', 'Tự động reset toàn bộ thanh ghi', 'Không cho phép nạp code mới'],
    ARRAY['CPU tạm dừng chương trình chính lập tức để chuyển sang xử lý một tác vụ khẩn cấp (ISR), sau đó quay lại chạy tiếp']::varchar[],
    'Ngắt giải quyết các sự kiện bất đồng bộ thời gian thực nhanh hơn cơ chế thăm dò (polling).',
    5, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_032', 'mcq', 'mcu-peripherals',
    'Quy tắc vàng quan trọng nhất khi viết chương trình phục vụ ngắt (ISR) là gì?',
    ARRAY['Viết code cực kỳ ngắn gọn, thực thi nhanh và tuyệt đối không dùng hàm delay() hay các hàm giao tiếp chờ', 'Viết toàn bộ logic thuật toán SLAM vào ISR', 'Gọi hàm in debug liên tục', 'Sử dụng các biến số thực double phức tạp'],
    ARRAY['Viết code cực kỳ ngắn gọn, thực thi nhanh và tuyệt đối không dùng hàm delay() hay các hàm giao tiếp chờ']::varchar[],
    'ISR giữ CPU quá lâu sẽ làm trễ các ngắt khác và phá hỏng tính thời gian thực của hệ thống.',
    6, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_033', 'mcq', 'mcu-peripherals',
    'Cơ chế DMA (Direct Memory Access) mang lại lợi ích gì cho MCU?',
    ARRAY['Cho phép ngoại vi tự động chuyển dữ liệu trực tiếp vào bộ nhớ RAM mà không cần sự can thiệp của CPU', 'Tăng dung lượng Flash lên gấp đôi', 'Tự động dập tắt dao động nhiễu nguồn', 'Không cần dùng đến mạch cầu H'],
    ARRAY['Cho phép ngoại vi tự động chuyển dữ liệu trực tiếp vào bộ nhớ RAM mà không cần sự can thiệp của CPU']::varchar[],
    'DMA giải phóng CPU khỏi công việc chép dữ liệu tẻ nhạt tần số cao từ ngoại vi (như ADC, SPI) vào RAM.',
    6, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_034', 'mcq', 'mcu-peripherals',
    'Sự cố "Tràn ngăn xếp" (Stack Overflow) xảy ra khi nào trong quá trình xử lý ngắt chồng nhau?',
    ARRAY['Khi có quá nhiều ngắt lồng nhau (nested interrupts) vượt quá dung lượng bộ nhớ ngăn xếp lưu con trỏ chương trình', 'Khi điện áp pin sụt quá mức', 'Khi bus I2C bị đứt dây SDA', 'Khi timer chạy quá chu kỳ đếm tối đa'],
    ARRAY['Khi có quá nhiều ngắt lồng nhau (nested interrupts) vượt quá dung lượng bộ nhớ ngăn xếp lưu con trỏ chương trình']::varchar[],
    'Mỗi ngắt lồng nhau đòi hỏi đẩy các thanh ghi hiện tại vào Stack. Ngăn xếp quá tải sẽ làm đè vùng nhớ biến gây crash MCU.',
    7, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_035', 'mcq', 'mcu-peripherals',
    'Chương trình chính giao tiếp với ISR thông qua loại biến đặc trưng nào?',
    ARRAY['Biến toàn cục được khai báo từ khóa `volatile` để tránh tối ưu hóa biên dịch', 'Biến cục bộ trong hàm main', 'Biến lưu trong bộ nhớ Flash', 'Không thể dùng chung biến'],
    ARRAY['Biến toàn cục được khai báo từ khóa `volatile` để tránh tối ưu hóa biên dịch']::varchar[],
    'Từ khóa `volatile` bắt buộc trình biên dịch phải đọc giá trị trực tiếp từ RAM thay vì thanh ghi tối ưu, bảo đảm đọc đúng dữ liệu thay đổi bất ngờ trong ISR.',
    6, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_036', 'mcq', 'mcu-peripherals',
    'Bộ ngắt NVIC (Nested Vectored Interrupt Controller) trong lõi ARM Cortex-M thực hiện nhiệm vụ gì?',
    ARRAY['Quản lý và phân phối độ ưu tiên cho hàng chục nguồn ngắt phần cứng khác nhau', 'Đo đạc khoảng cách LiDAR', 'Băm xung PWM', 'Tính toán ma trận quay'],
    ARRAY['Quản lý và phân phối độ ưu tiên cho hàng chục nguồn ngắt phần cứng khác nhau']::varchar[],
    'NVIC quản lý các vector ngắt, cho phép ngắt có độ ưu tiên cao chèn ngang ngắt độ ưu tiên thấp.',
    6, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_037', 'mcq', 'mcu-peripherals',
    'Khi sử dụng DMA để truyền dữ liệu qua SPI, CPU rảnh rang để làm tác vụ nào?',
    ARRAY['Xử lý thuật toán điều khiển hoặc tính toán logic hành vi', 'Đứng yên hoàn toàn', 'Báo động tắt nguồn', 'Tự động băm xung clock'],
    ARRAY['Xử lý thuật toán điều khiển hoặc tính toán logic hành vi']::varchar[],
    'DMA xử lý truyền nhận dữ liệu nền, CPU rảnh tay thực thi các phép tính toán cao cấp.',
    5, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_038', 'mcq', 'mcu-peripherals',
    'Ngắt Timer (Timer Interrupt) thường được sử dụng cho tác vụ nào trong robot?',
    ARRAY['Kích hoạt chạy thuật toán điều khiển PID định kỳ để bảo đảm bước thời gian dt không đổi', 'Phát hiện va chạm cơ học', 'Nạp firmware mới qua cáp USB', 'Đo đạc dòng xả của pin'],
    ARRAY['Kích hoạt chạy thuật toán điều khiển PID định kỳ để bảo đảm bước thời gian dt không đổi']::varchar[],
    'Điều khiển PID yêu cầu chu kỳ trích mẫu ổn định tuyệt đối (isochronous sampling) để tính tích phân/vi phân chính xác.',
    6, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_039', 'short-answer', 'mcu-peripherals',
    'Điền tên viết tắt tiếng Anh của chương trình phục vụ ngắt. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ISR']::varchar[],
    'ISR là Interrupt Service Routine.',
    5, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  ),
  (
    'cs_embhar_q_040', 'short-answer', 'mcu-peripherals',
    'Điền tên viết tắt tiếng Anh của cơ chế truy cập bộ nhớ trực tiếp không qua CPU. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DMA']::varchar[],
    'DMA là Direct Memory Access.',
    5, 'Interrupts & DMA', 'cs_embedded_hardware', 13, 'cs_embhar_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Tạo xung PWM & Đọc bộ đếm Encoder (cs_embhar_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_051', 'mcq', 'mcu-peripherals',
    'Công thức tính điện áp trung bình ngõ ra giả lập của xung PWM cấp cho động cơ là gì?',
    ARRAY['V_out = Duty Cycle * V_cc', 'V_out = V_cc / Duty Cycle', 'V_out = V_cc + Duty Cycle', 'V_out = V_cc * f'],
    ARRAY['V_out = Duty Cycle * V_cc']::varchar[],
    'Duty Cycle (%) xác định tỷ lệ thời gian cấp nguồn trên toàn chu kỳ, điều biến điện áp trung bình.',
    5, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_052', 'mcq', 'mcu-peripherals',
    'Tại sao tần số PWM điều khiển mô-men động cơ DC thường chọn ở mức trên 20kHz?',
    ARRAY['Để nằm ngoài dải nghe của tai con người, tránh tạo ra tiếng rít cơ khí khó chịu', 'Để tăng mô-men động cơ', 'Để giảm lượng điện năng tiêu thụ', 'Do timer của vi xử lý giới hạn'],
    ARRAY['Để nằm ngoài dải nghe của tai con người, tránh tạo ra tiếng rít cơ khí khó chịu']::varchar[],
    'Tần số nghe được của tai người là 20Hz - 20kHz. Băm xung trên 20kHz triệt tiêu tiếng ồn âm học.',
    6, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_053', 'mcq', 'mcu-peripherals',
    'Tại sao Quadrature Encoder lại phát ra hai kênh xung A và B lệch pha nhau 90 độ?',
    ARRAY['Để xác định hướng quay của động cơ (dựa vào pha nào dẫn trước)', 'Để tăng độ phân giải màu sắc', 'Để dự phòng khi 1 kênh bị đứt dây', 'Để cách ly nguồn điện'],
    ARRAY['Để xác định hướng quay của động cơ (dựa vào pha nào dẫn trước)']::varchar[],
    'Độ lệch pha 90 độ tạo mã Gray 2-bit, thay đổi thứ tự trạng thái sườn xung cho biết chiều xoay.',
    6, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_054', 'mcq', 'mcu-peripherals',
    'Tại sao việc đọc Quadrature Encoder tốc độ cao bắt buộc phải dùng chế độ Hardware Timer Encoder của MCU thay vì ngắt GPIO?',
    ARRAY['Vì ngắt GPIO tần số cao dễ làm nghẽn CPU và mất xung; Timer phần cứng tự động đếm xung độc lập mà không tốn CPU', 'Vì GPIO không chịu được điện áp 3.3V', 'Vì timer giúp tăng dòng điện của encoder', 'Do GPIO chỉ đọc được tín hiệu tương tự'],
    ARRAY['Vì ngắt GPIO tần số cao dễ làm nghẽn CPU và mất xung; Timer phần cứng tự động đếm xung độc lập mà không tốn CPU']::varchar[],
    'Ở vận tốc cao, xung encoder phát ra hàng chục kHz. Chạy ngắt GPIO sẽ ngốn sạch thời gian CPU chỉ để tăng biến đếm.',
    7, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_055', 'mcq', 'mcu-peripherals',
    'Chế độ đếm x4 (4x encoding) của bộ đếm xung hoạt động thế nào?',
    ARRAY['Đếm cả sườn lên và sườn xuống của cả hai kênh xung A và B để tăng gấp 4 lần độ phân giải đo góc', 'Nhân giá trị đếm được với 4', 'Sử dụng 4 cảm biến quang song song', 'Tăng chu kỳ xung PWM lên 4 lần'],
    ARRAY['Đếm cả sườn lên và sườn xuống của cả hai kênh xung A và B để tăng gấp 4 lần độ phân giải đo góc']::varchar[],
    'Quét tất cả các sự kiện thay đổi trạng thái của cả hai kênh giúp khai thác tối đa thông tin hình học của đĩa encoder.',
    6, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_056', 'mcq', 'mcu-peripherals',
    'Khi chu kỳ nhiệm vụ (Duty Cycle) của xung PWM bằng 50%, điện áp trung bình cấp cho động cơ 12V là bao nhiêu?',
    ARRAY['6V', '12V', '0V', '24V'],
    ARRAY['6V']::varchar[],
    'V_out = 50% * 12V = 6V.',
    5, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_057', 'mcq', 'mcu-peripherals',
    'Mạch cầu H (H-Bridge) dùng trong điều khiển động cơ DC có vai trò gì?',
    ARRAY['Cho phép đảo chiều dòng điện cấp qua động cơ để đổi hướng quay', 'Tăng độ phân giải encoder', 'Lọc nhiễu điện từ nguồn', 'Tự động sạc pin LiPo'],
    ARRAY['Cho phép đảo chiều dòng điện cấp qua động cơ để đổi hướng quay']::varchar[],
    'Cầu H gồm 4 switch bán dẫn điều phối hướng dòng điện đi qua cuộn dây động cơ.',
    5, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_058', 'mcq', 'mcu-peripherals',
    'Tín hiệu PWM điều khiển động cơ RC Servo truyền thông tin gì để điều phối góc quay?',
    ARRAY['Độ rộng của xung cao (Pulse Width, thường từ 1ms đến 2ms ứng với góc 0 đến 180 độ) lặp lại mỗi 20ms', 'Tần số xung thay đổi liên tục', 'Biên độ điện áp thay đổi từ 0V đến 12V', 'Chuỗi bit nhị phân mã Hamming'],
    ARRAY['Độ rộng của xung cao (Pulse Width, thường từ 1ms đến 2ms ứng với góc 0 đến 180 độ) lặp lại mỗi 20ms']::varchar[],
    'Độ rộng xung (ví dụ 1.5ms định vị servo ở góc trung tâm 90 độ) là quy chuẩn giao tiếp của RC Servo.',
    6, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_059', 'short-answer', 'mcu-peripherals',
    'Điền tên viết tắt tiếng Anh của phương pháp điều chế độ rộng xung. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PWM']::varchar[],
    'PWM là Pulse Width Modulation.',
    5, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  ),
  (
    'cs_embhar_q_060', 'short-answer', 'mcu-peripherals',
    'Độ lệch pha góc giữa hai kênh xung A và B của Quadrature Encoder bằng bao nhiêu độ? (Điền số)',
    NULL,
    ARRAY['90']::varchar[],
    'Lệch pha đúng 90 độ.',
    5, 'PWM & Encoders', 'cs_embedded_hardware', 13, 'cs_embhar_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Hệ điều hành thời gian thực FreeRTOS (cs_embhar_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_061', 'mcq', 'rtos-micro-ros',
    'Đặc trưng cốt lõi quyết định tính chất "thời gian thực" (Real-time) của RTOS là gì?',
    ARRAY['Bộ lập lịch dựa trên độ ưu tiên (Priority-based Preemptive Scheduler) bảo đảm tác vụ cao giành CPU tức thời', 'Hỗ trợ chạy đồng thời nhiều màn hình đồ họa', 'Độ phân giải lấy mẫu ADC cực lớn', 'Tốc độ CPU đạt hàng GHz'],
    ARRAY['Bộ lập lịch dựa trên độ ưu tiên (Priority-based Preemptive Scheduler) bảo đảm tác vụ cao giành CPU tức thời']::varchar[],
    'RTOS cam kết thời gian đáp ứng (determinism) chứ không phải tốc độ trung bình.',
    6, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_062', 'mcq', 'rtos-micro-ros',
    'Sự khác nhau giữa Mutex và Semaphore trong FreeRTOS là gì?',
    ARRAY['Mutex có cơ chế sở hữu (ownership) và giải phóng bởi chính task khóa nó; Semaphore là cờ báo tín hiệu chung không có tính sở hữu', 'Semaphore chính xác hơn Mutex', 'Mutex tiêu tốn nhiều RAM hơn', 'Semaphore chỉ dùng cho vi điều khiển 8-bit'],
    ARRAY['Mutex có cơ chế sở hữu (ownership) và giải phóng bởi chính task khóa nó; Semaphore là cờ báo tín hiệu chung không có tính sở hữu']::varchar[],
    'Mutex được dùng để bảo vệ tài nguyên độc quyền (Mutual Exclusion), hỗ trợ cơ chế chống nghịch đảo ưu tiên.',
    6, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_063', 'mcq', 'rtos-micro-ros',
    'Hiện tượng "Nghịch đảo ưu tiên" (Priority Inversion) xảy ra khi nào?',
    ARRAY['Tác vụ ưu tiên cao bị treo chờ khóa tài nguyên giữ bởi tác vụ thấp, trong khi tác vụ trung bình chèn vào chiếm CPU của tác vụ thấp', 'Động cơ servo quay ngược hướng', 'Độ ưu tiên của các task bị đảo ngược dấu ngẫu nhiên', 'Khi bộ nhớ RAM bị đầy'],
    ARRAY['Tác vụ ưu tiên cao bị treo chờ khóa tài nguyên giữ bởi tác vụ thấp, trong khi tác vụ trung bình chèn vào chiếm CPU của tác vụ thấp']::varchar[],
    'Sự cố nghiêm trọng làm tê liệt tác vụ khẩn cấp, khắc phục bằng cơ chế nâng ưu tiên (Priority Inheritance).',
    7, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_064', 'mcq', 'rtos-micro-ros',
    'Giải pháp "Priority Inheritance" (Kế thừa ưu tiên) giải quyết nghịch đảo ưu tiên bằng cách nào?',
    ARRAY['Tự động nâng độ ưu tiên của tác vụ thấp đang giữ khóa lên bằng độ ưu tiên của tác vụ cao đang chờ nó', 'Xóa bỏ hoàn toàn tác vụ thấp', 'Chuyển tài nguyên sang cổng DMA', 'Khởi động lại toàn bộ vi điều khiển'],
    ARRAY['Tự động nâng độ ưu tiên của tác vụ thấp đang giữ khóa lên bằng độ ưu tiên của tác vụ cao đang chờ nó']::varchar[],
    'Nâng ưu tiên giúp tác vụ thấp chạy nhanh để giải phóng khóa Mutex rồi trả lại ưu tiên ban đầu.',
    7, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_065', 'mcq', 'rtos-micro-ros',
    'Tại sao việc gọi hàm `delay()` trong Arduino lại là điều cấm kỵ khi chạy hệ điều hành FreeRTOS?',
    ARRAY['Vì delay() treo cứng CPU không làm việc gì; trong khi RTOS yêu cầu dùng vTaskDelay() để nhường CPU cho các task khác chạy', 'Vì delay() làm nóng chip', 'Vì delay() gây sai số ADC', 'Vì delay() làm mất nguồn cấp pin'],
    ARRAY['Vì delay() treo cứng CPU không làm việc gì; trong khi RTOS yêu cầu dùng vTaskDelay() để nhường CPU cho các task khác chạy']::varchar[],
    'vTaskDelay đưa task vào trạng thái Blocked, giải phóng Scheduler gọi task sẵn sàng tiếp theo.',
    6, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_066', 'mcq', 'rtos-micro-ros',
    'Hiện tượng "Deadlock" (Khóa chết) xảy ra khi nào giữa các tác vụ RTOS?',
    ARRAY['Hai hoặc nhiều tác vụ bị treo vô hạn vì cùng chờ đợi tài nguyên mà tác vụ kia đang giữ khóa', 'Khi vi điều khiển bị chập nguồn điện', 'Khi timer bị đếm tràn số', 'Khi bộ nhớ Flash bị hỏng'],
    ARRAY['Hai hoặc nhiều tác vụ bị treo vô hạn vì cùng chờ đợi tài nguyên mà tác vụ kia đang giữ khóa']::varchar[],
    'Ví dụ: Task A giữ khóa 1 chờ khóa 2; Task B giữ khóa 2 chờ khóa 1 $\rightarrow$ cả hai treo vô hạn.',
    6, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_067', 'mcq', 'rtos-micro-ros',
    'Khái niệm "Preemption" trong bộ lập lịch RTOS có nghĩa là gì?',
    ARRAY['Bộ lập lịch lập tức ngắt ngang tác vụ có độ ưu tiên thấp ngay khi tác vụ ưu tiên cao hơn sẵn sàng chạy', 'Tự động gán thêm RAM cho CPU', 'Tự động tính ma trận Jacobian', 'Cho phép các tác vụ chia đều CPU'],
    ARRAY['Bộ lập lịch lập tức ngắt ngang tác vụ có độ ưu tiên thấp ngay khi tác vụ ưu tiên cao hơn sẵn sàng chạy']::varchar[],
    'Preemptive scheduling bảo đảm thời gian phản hồi tức thì cho sự kiện khẩn cấp.',
    6, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_068', 'mcq', 'rtos-micro-ros',
    'Hàm nào trong FreeRTOS được dùng để giải phóng CPU nhường quyền cho các task khác trong một khoảng thời gian xác định?',
    ARRAY['vTaskDelay()', 'delay()', 'sleep()', 'vTaskSuspend()'],
    ARRAY['vTaskDelay()']::varchar[],
    'vTaskDelay đưa task vào hàng đợi chặn theo số tích tắc nhịp (Ticks) hệ thống.',
    5, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_069', 'short-answer', 'rtos-micro-ros',
    'Điền tên hệ điều hành thời gian thực mã nguồn mở phổ biến nhất cho vi điều khiển. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FREERTOS', 'FreeRTOS']::varchar[],
    'FreeRTOS là hệ điều hành nhúng thời gian thực.',
    5, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  ),
  (
    'cs_embhar_q_070', 'short-answer', 'rtos-micro-ros',
    'Điền từ tiếng Anh chỉ khóa loại trừ tương hỗ có tính sở hữu trong FreeRTOS. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Mutex']::varchar[],
    'Mutex bảo vệ tài nguyên dùng chung độc quyền.',
    5, 'FreeRTOS', 'cs_embedded_hardware', 13, 'cs_embhar_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: micro-ROS: Kết nối Vi điều khiển trực tiếp vào mạng ROS2 (cs_embhar_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_071', 'mcq', 'rtos-micro-ros',
    'Mục tiêu cốt lõi của giải pháp phần mềm micro-ROS là gì?',
    ARRAY['Đưa giao tiếp ROS2 (Nodes, Topics, Services) trực tiếp vào chạy trên các vi điều khiển nhúng cấu hình thấp', 'Thay thế hệ điều hành Ubuntu', 'Lập bản đồ 2D cho LiDAR', 'Tăng điện áp của pin sạc'],
    ARRAY['Đưa giao tiếp ROS2 (Nodes, Topics, Services) trực tiếp vào chạy trên các vi điều khiển nhúng cấu hình thấp']::varchar[],
    'micro-ROS kết nối trực tiếp các cảm biến actuator nhúng vào mạng ROS2 thế giới mà không cần máy tính trung gian.',
    6, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_072', 'mcq', 'rtos-micro-ros',
    'Chuẩn truyền thông siêu nhẹ nào được micro-ROS sử dụng để thay thế DDS chuẩn mạng lớn?',
    ARRAY['XRCE-DDS', 'HTTP/3', 'MQTT', 'WebSocket'],
    ARRAY['XRCE-DDS']::varchar[],
    'XRCE-DDS tối ưu hóa bộ nhớ tĩnh và kích thước gói tin cho môi trường vi điều khiển cực kỳ giới hạn tài nguyên.',
    6, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_073', 'mcq', 'rtos-micro-ros',
    'Trong kiến trúc micro-ROS, "micro-ROS Agent" đóng vai trò gì?',
    ARRAY['Tiến trình trung gian chạy trên máy tính lớn nhận dữ liệu XRCE-DDS từ MCU và chuyển tiếp lên mạng DDS của ROS2', 'Đăng ký địa chỉ IP cho robot', 'Cảm biến đọc LiDAR', 'Thuật toán giải động lực học ngược'],
    ARRAY['Tiến trình trung gian chạy trên máy tính lớn nhận dữ liệu XRCE-DDS từ MCU và chuyển tiếp lên mạng DDS của ROS2']::varchar[],
    'Agent hoạt động như cầu nối ngôn ngữ mạng giữa thế giới MCU nhúng và thế giới PC.',
    6, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_074', 'mcq', 'rtos-micro-ros',
    'Các kênh vật lý truyền dữ liệu nào được hỗ trợ để kết nối giữa micro-ROS Client (MCU) và Agent (PC)?',
    ARRAY['UART (Serial USB), Wi-Fi (UDP/TCP) hoặc Ethernet', 'Sóng AM/FM', 'Đường dây CAN bus', 'Cáp quang biển'],
    ARRAY['UART (Serial USB), Wi-Fi (UDP/TCP) hoặc Ethernet']::varchar[],
    'micro-ROS linh hoạt chạy qua dây cáp USB serial hoặc không dây qua mạng cục bộ.',
    5, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_075', 'mcq', 'rtos-micro-ros',
    'Đặc trưng tối ưu bộ nhớ của micro-ROS Client phù hợp với MCU nhúng là gì?',
    ARRAY['Hỗ trợ cấp phát bộ nhớ tĩnh hoàn toàn để tránh hiện tượng phân mảnh RAM (static memory allocation)', 'Đòi hỏi bộ nhớ RAM tối thiểu 1GB', 'Không sử dụng bộ nhớ Flash', 'Tải toàn bộ code lên đám mây'],
    ARRAY['Hỗ trợ cấp phát bộ nhớ tĩnh hoàn toàn để tránh hiện tượng phân mảnh RAM (static memory allocation)']::varchar[],
    'Cấp phát tĩnh bảo đảm firmware hoạt động an toàn bền bỉ năm này qua năm khác không lo lỗi treo cấp phát động (heap allocation).',
    7, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_076', 'mcq', 'rtos-micro-ros',
    'micro-ROS hỗ trợ chạy trên các nền tảng hệ điều hành nhúng nào?',
    ARRAY['FreeRTOS, Zephyr RTOS hoặc chạy trực tiếp không hệ điều hành (Bare-metal)', 'Chỉ Windows 11', 'Chỉ Ubuntu Server', 'Android OS'],
    ARRAY['FreeRTOS, Zephyr RTOS hoặc chạy trực tiếp không hệ điều hành (Bare-metal)']::varchar[],
    'Mức độ tương thích rộng rãi giúp tích hợp micro-ROS vào firmware hiện hữu của doanh nghiệp.',
    6, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_077', 'mcq', 'rtos-micro-ros',
    'Lợi ích lớn nhất của việc đồng bộ thời gian (Time Synchronization) giữa MCU và PC qua micro-ROS là gì?',
    ARRAY['Dữ liệu cảm biến gửi từ MCU được gán nhãn thời gian (timestamp) chuẩn xác theo giờ của CPU chính', 'Để hiển thị đồng hồ ngoài màn hình', 'Để tăng tần số PWM của động cơ', 'Không có tác dụng thực tế'],
    ARRAY['Dữ liệu cảm biến gửi từ MCU được gán nhãn thời gian (timestamp) chuẩn xác theo giờ của CPU chính']::varchar[],
    'Nhãn thời gian đồng bộ là chìa khóa để thuật toán Kalman Filter tính toán dự báo chính xác vận tốc và gia tốc.',
    7, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_078', 'mcq', 'rtos-micro-ros',
    'Ngôn ngữ lập trình chính được viết trong firmware micro-ROS Client là gì?',
    ARRAY['C / C++', 'Python', 'Java', 'Rust'],
    ARRAY['C / C++']::varchar[],
    'C/C++ bảo đảm hiệu suất cao, tối ưu dung lượng bộ nhớ nhỏ gọn của MCU.',
    5, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_079', 'short-answer', 'rtos-micro-ros',
    'Điền tên giao thức giao tiếp siêu nhẹ của micro-ROS. (Viết hoa toàn bộ có dấu gạch ngang)',
    NULL,
    ARRAY['XRCE-DDS']::varchar[],
    'XRCE-DDS là chuẩn truyền tin nhúng.',
    6, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  ),
  (
    'cs_embhar_q_080', 'short-answer', 'rtos-micro-ros',
    'Điền tên tiến trình trung gian chạy trên PC nhận dữ liệu từ vi điều khiển gửi lên ROS2. (Viết hoa chữ Agent)',
    NULL,
    ARRAY['micro-ROS Agent', 'Agent']::varchar[],
    'micro-ROS Agent làm trung gian kết nối.',
    5, 'micro-ROS', 'cs_embedded_hardware', 13, 'cs_embhar_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Cách ly điện quang (Optocouplers) chống nhiễu cuộn dây động cơ (cs_embhar_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_081', 'mcq', 'pcb-power',
    'Tại sao việc băm xung động cơ công suất lớn lại dễ gây nhiễu làm treo hoặc hỏng chip điều khiển MCU?',
    ARRAY['Cuộn dây động cơ đóng ngắt sinh ra sức điện động phản ngược (back-EMF) và gai điện áp cao truyền ngược về đường nguồn VCC', 'Động cơ phát sóng vô tuyến cực mạnh', 'Động cơ hút hết từ trường phòng thí nghiệm', 'Làm thay đổi địa chỉ IP của chip'],
    ARRAY['Cuộn dây động cơ đóng ngắt sinh ra sức điện động phản ngược (back-EMF) và gai điện áp cao truyền ngược về đường nguồn VCC']::varchar[],
    'Đóng ngắt cuộn cảm của động cơ sinh ra dòng điện cảm ứng áp cao, truyền nhiễu gai phá hủy mạch digital.',
    6, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_082', 'mcq', 'pcb-power',
    'Linh kiện cách ly quang học (Optocoupler) truyền tín hiệu qua môi trường trung gian nào?',
    ARRAY['Ánh sáng hồng ngoại phát ra từ đèn LED sang Phototransistor', 'Đường dẫn đồng trên bo mạch', 'Cuộn dây cảm ứng từ trường', 'Sóng vô tuyến wifi'],
    ARRAY['Ánh sáng hồng ngoại phát ra từ đèn LED sang Phototransistor']::varchar[],
    'Optocoupler chuyển tín hiệu điện thành ánh sáng rồi ngược lại, bảo đảm cách ly vật lý hoàn toàn.',
    5, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_083', 'mcq', 'pcb-power',
    'Yêu cầu thiết kế đường đất (GND) bắt buộc khi sử dụng cách ly quang học để bảo vệ mạch là gì?',
    ARRAY['Phải tách biệt hoàn toàn hai đường đất: GND_MCU (mạch số) và GND_POWER (mạch động cơ) độc lập nhau, không đấu chung', 'Bắt buộc phải đấu chung đất', 'Chỉ sử dụng duy nhất một đường đất', 'Đất phải nối trực tiếp ra vỏ sắt'],
    ARRAY['Phải tách biệt hoàn toàn hai đường đất: GND_MCU (mạch số) và GND_POWER (mạch động cơ) độc lập nhau, không đấu chung']::varchar[],
    'Nếu đấu chung GND, dòng nhiễu công suất lớn vẫn sẽ truyền ngược về mạch digital qua đường đất chung, làm vô hiệu hóa vai trò của Optocoupler.',
    6, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_084', 'mcq', 'pcb-power',
    'Diode chặn ngược (Flyback Diode) mắc song song ngược đầu với cuộn dây động cơ có vai trò gì?',
    ARRAY['Triệt tiêu dòng điện cảm ứng áp cao sinh ra do cuộn cảm xả năng lượng khi ngắt dòng, bảo vệ các transistor cầu H', 'Tăng dòng điện cho động cơ', 'Lọc nhiễu tần số cao cho thấu kính', 'Cách ly hoàn toàn đất của hệ thống'],
    ARRAY['Triệt tiêu dòng điện cảm ứng áp cao sinh ra do cuộn cảm xả năng lượng khi ngắt dòng, bảo vệ các transistor cầu H']::varchar[],
    'Flyback diode tạo vòng khép kín tiêu tán dòng năng lượng cảm ứng tự cảm của động cơ.',
    6, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_085', 'mcq', 'pcb-power',
    'Tại sao các tín hiệu PWM tần số cao (>20kHz) đòi hỏi phải chọn cách ly quang học tốc độ cao (như 6N137)?',
    ARRAY['Để tránh hiện tượng méo dạng xung, trễ sườn lên/xuống của xung điều khiển do thời gian đóng ngắt của optocoupler thường chậm', 'Để tăng điện áp điều khiển', 'Để cách ly từ trường tốt hơn', 'Do 6N137 có kích thước nhỏ hơn'],
    ARRAY['Để tránh hiện tượng méo dạng xung, trễ sườn lên/xuống của xung điều khiển do thời gian đóng ngắt của optocoupler thường chậm']::varchar[],
    'Optocoupler thường (như PC817) có thời gian đáp ứng mili-giây, băm xung nhanh sẽ làm biến dạng xung PWM thành điện áp phẳng.',
    7, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_086', 'mcq', 'pcb-power',
    'Khoảng cách ly cách điện (Dielectric Isolation) của Optocoupler thông thường đạt mức bao nhiêu?',
    ARRAY['Hàng ngàn Volts (kV) cách ly điện hoàn toàn', 'Chỉ cách ly được 5V', 'Không cách ly được điện áp', 'Chỉ dùng cho dòng điện xoay chiều AC'],
    ARRAY['Hàng ngàn Volts (kV) cách ly điện hoàn toàn']::varchar[],
    'Sự phân tách vật lý bằng khoảng không ánh sáng cho phép chịu đựng các xung sét quá áp khổng lồ.',
    5, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_087', 'mcq', 'pcb-power',
    'Tụ lọc nguồn Bypass (tụ gốm 100nF) dán sát chân cấp nguồn VCC của MCU thực hiện nhiệm vụ gì?',
    ARRAY['Lọc bỏ nhiễu gai tần số cao trên đường nguồn cấp ổn định điện áp tức thời cho chip', 'Lưu trữ điện năng khi mất pin', 'Cách ly hoàn toàn tín hiệu GPIO', 'Băm xung PWM động cơ'],
    ARRAY['Lọc bỏ nhiễu gai tần số cao trên đường nguồn cấp ổn định điện áp tức thời cho chip']::varchar[],
    'Tụ bypass hoạt động như nguồn dự phòng siêu nhỏ, dập tắt các gai sụt áp cục bộ khi MCU nạp lệnh nhanh.',
    5, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_088', 'mcq', 'pcb-power',
    'Linh kiện thu quang bên trong Optocoupler thường là loại linh kiện bán dẫn nào?',
    ARRAY['Phototransistor (hoặc Photodiode)', 'Đèn LED phát quang', 'Điện trở nhiệt NTC', 'Tụ hóa công suất lớn'],
    ARRAY['Phototransistor (hoặc Photodiode)']::varchar[],
    'Phototransistor nhận photon ánh sáng kích mở dòng điện chạy qua cực C-E.',
    5, 'Optocouplers', 'cs_embedded_hardware', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_089', 'short-answer', 'pcb-power',
    'Điền tên linh kiện cách ly điện quang học bảo vệ mạch số. (Viết thường)',
    NULL,
    ARRAY['optocoupler', 'cách ly quang']::varchar[],
    'Optocoupler là linh kiện cách ly quang học.',
    5, 'Optocouplers', 'cs_robotics_fundamentals', 13, 'cs_embhar_08'
  ),
  (
    'cs_embhar_q_090', 'short-answer', 'pcb-power',
    'Điền tên diode mắc song song ngược đầu cuộn dây động cơ bảo vệ transistor. (Viết thường)',
    NULL,
    ARRAY['flyback diode', 'diode chặn ngược', 'diode triệt nhiễu']::varchar[],
    'Flyback diode triệt tiêu năng lượng tự cảm.',
    5, 'Optocouplers', 'cs_robotics_fundamentals', 13, 'cs_embhar_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Quản lý năng lượng pin LiPo & Hệ thống BMS (cs_embhar_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_embhar_q_091', 'mcq', 'pcb-power',
    'Điện áp định mức của một cell pin Lithium Polymer (LiPo) tiêu chuẩn là bao nhiêu?',
    ARRAY['3.7V', '1.2V', '5.0V', '12.0V'],
    ARRAY['3.7V']::varchar[],
    'Cell pin LiPo có điện áp định mức 3.7V (đầy 4.2V, cạn hoàn toàn 3.0V).',
    5, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_092', 'mcq', 'pcb-power',
    'Ký hiệu "4S" trên khối pin LiPo biểu thị cấu trúc mắc nối thế nào?',
    ARRAY['4 cell pin mắc nối tiếp (điện áp định mức tổng cộng 14.8V)', '4 cell pin mắc song song', 'Pin có dòng xả tối đa 4C', 'Pin có thời gian sạc 4 giờ'],
    ARRAY['4 cell pin mắc nối tiếp (điện áp định mức tổng cộng 14.8V)']::varchar[],
    'S đại diện cho Series (nối tiếp), làm tăng điện áp tổng của khối pin.',
    5, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_093', 'mcq', 'pcb-power',
    'Dòng xả cực đại của khối pin LiPo dung lượng 4000mAh cấu hình 25C được tính toán thế nào?',
    ARRAY['I_max = 4.0A * 25 = 100A', 'I_max = 4000mA / 25 = 160mA', 'I_max = 25A', 'I_max = 4.0A + 25 = 29A'],
    ARRAY['I_max = 4.0A * 25 = 100A']::varchar[],
    'Dòng xả tối đa bằng dung lượng (đơn vị Ah) nhân với hệ số C-rate.',
    6, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_094', 'mcq', 'pcb-power',
    'Điều gì xảy ra nếu ta xả cạn điện áp cell pin LiPo xuống dưới mức giới hạn 3.0V?',
    ARRAY['Cấu trúc hóa học của cell pin bị phá hủy, gây phồng pin và chai hỏng vĩnh viễn', 'Pin tự động phục hồi khi sạc lại', 'Tăng dòng xả của pin ở lần sau', 'Góc quay servo bị đảo ngược'],
    ARRAY['Cấu trúc hóa học của cell pin bị phá hủy, gây phồng pin và chai hỏng vĩnh viễn']::varchar[],
    'Xả quá cạn gây phản ứng hóa học đảo ngược phá hủy cấu trúc bản cực Lithium.',
    5, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_095', 'mcq', 'pcb-power',
    'Hệ thống quản lý pin BMS (Battery Management System) thực hiện vai trò gì cho khối pin của robot?',
    ARRAY['Bảo vệ quá dòng, ngắn mạch và cân bằng điện áp giữa các cell pin sạc nối tiếp', 'Tăng tốc độ di chuyển của robot', 'Đo đạc vị trí SLAM', 'Điều phối nhịp xung của timer'],
    ARRAY['Bảo vệ quá dòng, ngắn mạch và cân bằng điện áp giữa các cell pin sạc nối tiếp']::varchar[],
    'BMS bảo đảm an toàn cháy nổ và tăng tuổi thọ cho khối pin nhiều cell.',
    6, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_096', 'mcq', 'pcb-power',
    'Hiện tượng "Voltage Sag" (Sụt áp tức thời) xảy ra khi nào trên robot tự hành?',
    ARRAY['Khi các động cơ khởi động đột ngột rút dòng điện lớn vượt quá khả năng xả tức thời của pin', 'Khi pin được sạc đầy 100%', 'Khi robot đứng im không chuyển động', 'Khi tắt toàn bộ các node ROS2'],
    ARRAY['Khi các động cơ khởi động đột ngột rút dòng điện lớn vượt quá khả năng xả tức thời của pin']::varchar[],
    'Voltage Sag làm điện áp cấp cho MCU sụt xuống dưới mức tối thiểu (Brownout), làm reset vi điều khiển giữa chừng.',
    6, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_097', 'mcq', 'pcb-power',
    'Tại sao tính năng "Cân bằng cell" (Cell Balancing) của mạch BMS lại quan trọng khi sạc pin?',
    ARRAY['Để bảo đảm tất cả các cell pin nối tiếp được nạp đầy đều nhau ở điện áp tối đa 4.2V, tránh cell sạc quá áp gây cháy nổ', 'Để tăng tốc độ sạc gấp 4 lần', 'Để pin không tỏa nhiệt', 'Để tự động xả dòng điện thừa ra vỏ'],
    ARRAY['Để bảo đảm tất cả các cell pin nối tiếp được nạp đầy đều nhau ở điện áp tối đa 4.2V, tránh cell sạc quá áp gây cháy nổ']::varchar[],
    'Mắc nối tiếp làm dòng điện đi qua các cell như nhau nhưng nội trở khác nhau làm điện áp tích lũy lệch nhau. BMS xả bớt điện áp của cell đầy trước qua điện trở nhiệt.',
    7, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_098', 'mcq', 'pcb-power',
    'Dòng sạc an toàn tiêu chuẩn cho pin LiPo (thường chọn ở mức 1C) cho viên pin 3000mAh là bao nhiêu?',
    ARRAY['3.0 A', '30 A', '0.3 A', '1.0 A'],
    ARRAY['3.0 A']::varchar[],
    'Dòng sạc 1C bằng đúng dung lượng pin: 3000mA = 3.0A.',
    5, 'Battery & BMS', 'cs_embedded_hardware', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_099', 'short-answer', 'pcb-power',
    'Điền tên viết tắt tiếng Anh của loại pin Lithium Polymer siêu nhẹ dòng xả cao. (Viết hoa chữ cái đầu và cuối)',
    NULL,
    ARRAY['LiPo', 'Lipo']::varchar[],
    'LiPo là pin Lithium Polymer.',
    5, 'Battery & BMS', 'cs_robotics_fundamentals', 13, 'cs_embhar_09'
  ),
  (
    'cs_embhar_q_100', 'short-answer', 'pcb-power',
    'Điền tên viết tắt tiếng Anh của hệ thống quản lý bảo vệ an toàn pin. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['BMS']::varchar[],
    'BMS là Battery Management System.',
    5, 'Battery & BMS', 'cs_robotics_fundamentals', 13, 'cs_embhar_09'
  );

COMMIT;
