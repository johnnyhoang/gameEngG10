-- SQL migration to seed topics and 10 core lessons for cs_embedded_hardware (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_embedded_hardware (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('mcu-peripherals', 'cs_embedded_hardware', 13, 'Vi điều khiển & Ngoại vi', 'Kiến trúc MCU STM32/ESP32, ngắt ISR, DMA, ADC/DAC, bộ đếm xung encoder, xung PWM.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('serial-bus', 'cs_embedded_hardware', 13, 'Bus giao tiếp nối tiếp', 'Các chuẩn giao tiếp nối tiếp UART, I2C, SPI và mạng điều khiển công nghiệp CAN bus.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('rtos-micro-ros', 'cs_embedded_hardware', 13, 'Hệ điều hành nhúng & Micro-ROS', 'Hệ điều hành thời gian thực FreeRTOS (Tasks, Mutex, Semaphores) và micro-ROS kết nối trực tiếp DDS.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('pcb-power', 'cs_embedded_hardware', 13, 'Thiết kế mạch & Nguồn điện', 'Thiết kế mạch PCB lọc nguồn, cách ly quang học chống nhiễu động cơ, quản lý pin LiPo BMS.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_embedded_hardware (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_embhar_01', 
    'cs_embedded_hardware', 
    13, 
    'Vi điều khiển & Ngoại vi', 
    'Kiến trúc Vi điều khiển (MCU) STM32 & ESP32', 
    '### 1. Vi điều khiển (Microcontroller Unit - MCU)
MCU là một máy tính nhỏ tích hợp trên một chip bán dẫn duy nhất, gồm lõi vi xử lý CPU, bộ nhớ (Flash, RAM) và các khối ngoại vi (peripherals) điều phối I/O.
- **STM32:** Dòng MCU 32-bit dựa trên lõi ARM Cortex-M phổ biến trong robot nhờ số lượng lớn timer tốc độ cao và độ ổn định công nghiệp.
- **ESP32:** Dòng MCU tích hợp sẵn Wi-Fi và Bluetooth, lõi kép Xtensa 32-bit, thích hợp cho robot IoT hoặc điều khiển từ xa.

### 2. Sơ đồ khối ngoại vi cơ bản
- **GPIO:** Cổng xuất/nhập số mức logic (High/Low).
- **Timers:** Khối tạo nhịp thời gian, điều khiển xung nhịp PWM và đếm xung động cơ.', 
    'core-theory', 
    '["STM32F4 Discovery board điều khiển góc quay của 6 servo cánh tay thông qua các kênh timer PWM độc lập.", "ESP32 gửi dữ liệu trạng thái pin về máy chủ giám sát qua mạng Wi-Fi dùng giao thức MQTT."]'::jsonb, 
    '["Khác với vi xử lý máy tính (CPU thô), MCU tích hợp sẵn bộ nhớ RAM và Flash trên cùng chip nên khởi động cực nhanh và chạy trực tiếp không cần hệ điều hành nặng.", "Lõi ARM Cortex-M có kiến trúc nạp lệnh đường ống (Pipelining) giúp tối ưu hóa thời gian thực thi mã máy.", "ESP32 có điện áp hoạt động 3.3V, GPIO không chịu được điện áp 5V của các cảm biến Arduino cũ."]'::jsonb, 
    5, 
    TRUE,
    'mcu-peripherals'
  ),
  (
    'cs_embhar_02', 
    'Bus giao tiếp nối tiếp', 
    13, 
    'Bus giao tiếp nối tiếp', 
    'Chuẩn giao tiếp UART, SPI & I2C', 
    '### 1. UART (Universal Asynchronous Receiver-Transmitter)
Giao tiếp bất đồng bộ, chỉ cần 2 dây (Tx, Rx) và dây mát (GND). Hai thiết bị phải cấu hình cùng tốc độ truyền (Baudrate) để tự phân tách khung truyền. Khoảng cách ngắn, kết nối 1-1.

### 2. I2C (Inter-Integrated Circuit)
Giao tiếp đồng bộ nối tiếp, sử dụng 2 dây:
- **SDA (Serial Data):** Dây dữ liệu song hướng.
- **SCL (Serial Clock):** Dây xung nhịp đồng bộ từ Master.
- Hỗ trợ kết nối nhiều Slave trên cùng 1 bus qua địa chỉ (Address). Cần điện trở kéo lên (Pull-up resistors) trên 2 đường dây.

### 3. SPI (Serial Peripheral Interface)
Giao tiếp đồng bộ bốn dây tốc độ cao:
- **MOSI:** Master Out Slave In.
- **MISO:** Master In Slave Out.
- **SCK:** Serial Clock.
- **SS/CS:** Slave Select / Chip Select chọn thiết bị giao tiếp.
- Tốc độ truyền cực nhanh, thích hợp đọc cảm biến IMU tần số cao.', 
    'core-theory', 
    '["MCU giao tiếp với module GPS thông qua cổng UART tốc độ 9600 bps.", "Đọc dữ liệu từ IMU MPU6050 qua bus I2C tần số 400kHz.", "Đọc dữ liệu thẻ nhớ MicroSD qua bus SPI tốc độ 10MHz."]'::jsonb, 
    '["I2C sử dụng cấu trúc cực má hở (open-drain), bắt buộc phải có điện trở kéo lên (pull-up) để duy trì mức logic 1 khi bus rảnh.", "SPI hỗ trợ truyền nhận dữ liệu đồng thời song công toàn phần (Full-duplex), nhanh hơn I2C đơn công bán phần (Half-duplex).", "UART bất đồng bộ không có dây xung nhịp đi kèm nên nhạy cảm với sai lệch xung nội của hai thiết bị."]'::jsonb, 
    6, 
    TRUE,
    'serial-bus'
  ),
  (
    'cs_embhar_03', 
    'Bus giao tiếp nối tiếp', 
    13, 
    'Bus giao tiếp nối tiếp', 
    'Bus CAN (Controller Area Network) trong ô tô & robot', 
    '### 1. Bản chất của CAN Bus
CAN là mạng truyền thông công nghiệp bất đồng bộ, phân tán, chịu nhiễu cực tốt thiết kế bởi Bosch:
- Truyền dữ liệu vi sai qua hai dây **CAN_H (CAN High)** và **CAN_L (CAN Low)**. Hiệu điện thế vi sai giữa 2 dây giúp triệt tiêu hoàn toàn nhiễu điện từ ngoài.
- Cần hai điện trở đầu cuối $120\,\Omega$ ở hai đầu bus để chống phản xạ sóng.

### 2. Cơ chế phân xử ưu tiên (Arbitration)
- CAN sử dụng cơ chế CSMA/CR. Trạng thái trội (Dominant - mức logic 0) đè trạng thái lặn (Recessive - mức logic 1).
- Nếu hai thiết bị truyền cùng lúc, thiết bị có **Frame ID nhỏ hơn** (chứa nhiều bit trội 0 ở đầu) sẽ giành quyền ưu tiên truyền tiếp mà không làm hỏng dữ liệu đang chạy trên bus.', 
    'core-theory', 
    '["Cánh tay robot công nghiệp sử dụng mạng CANOpen kết nối 6 driver động cơ servo dọc theo các khớp để gửi lệnh moment.", "Điện trở đầu cuối 120 Ohm mắc song song ở hai đầu dây CAN High và CAN Low để dập tắt sóng phản xạ."]'::jsonb, 
    '["Đường truyền vi sai CAN giúp truyền tín hiệu tin cậy trong môi trường rung động nhiễu điện từ cực mạnh của nhà máy.", "CAN ID không đại diện cho địa chỉ người nhận mà đại diện cho mức ưu tiên của gói dữ liệu đó.", "Mạng CAN FD nâng cấp CAN truyền thống tăng tốc độ truyền lên tới 5-8 Mbps và chiều dài payload tới 64 bytes."]'::jsonb, 
    7, 
    TRUE,
    'serial-bus'
  ),
  (
    'cs_embhar_04', 
    'Vi điều khiển & Ngoại vi', 
    13, 
    'Vi điều khiển & Ngoại vi', 
    'Cơ chế ngắt ISR & Truy cập bộ nhớ trực tiếp DMA', 
    '### 1. Cơ chế ngắt (Interrupts & ISR)
Ngắt là cơ chế phần cứng dừng luồng chạy chính của CPU lập tức để chuyển sang xử lý một sự kiện khẩn cấp qua chương trình phục vụ ngắt (Interrupt Service Routine - ISR):
- Ngắt ngoài (External Interrupt): Khi có nút bấm, cảm biến báo va chạm.
- Ngắt timer: Khi đếm đủ thời gian chu kỳ lấy mẫu PID.
- Quy tắc viết ISR: Cực kỳ ngắn gọn, không chứa hàm trễ (delay) hoặc in debug.

### 2. Truy cập bộ nhớ trực tiếp (Direct Memory Access - DMA)
DMA cho phép các khối ngoại vi (như ADC, SPI) tự động chuyển dữ liệu trực tiếp vào bộ nhớ RAM của hệ thống mà **không cần sự can thiệp của CPU**.
- Giúp giải phóng hoàn toàn CPU khỏi các phép sao chép dữ liệu tẻ nhạt tần số cao, tăng hiệu suất xử lý thời gian thực.', 
    'core-theory', 
    '["Bộ ngắt ngoài EXTI trên chân GPIO kích hoạt ISR dừng cánh tay robot ngay lập tức khi phát hiện va chạm cơ học.", "Cơ chế DMA tự động chuyển ma trận dữ liệu ảnh quét camera vào RAM mà CPU không cần đọc từng pixel một."]'::jsonb, 
    '["Viết code trong ISR quá dài dễ gây ra hiện tượng tràn ngăn xếp (Stack Overflow) hoặc treo vi điều khiển.", "DMA hoạt động song song với CPU nhờ cơ chế tranh chấp bus bộ nhớ (Bus Master).", "Ngắt truyền thông UART giúp nhận dữ liệu chuỗi byte bất đồng bộ mà không cần chạy hàm kiểm tra liên tục (polling)."]'::jsonb, 
    6, 
    TRUE,
    'mcu-peripherals'
  ),
  (
    'cs_embhar_05', 
    'Vi điều khiển & Ngoại vi', 
    13, 
    'Vi điều khiển & Ngoại vi', 
    'Tạo xung PWM & Đọc bộ đếm Encoder', 
    '### 1. PWM (Pulse Width Modulation)
Phương pháp điều chế độ rộng xung để tạo ra mức điện áp trung bình giả lập tương tự từ nguồn số:
- **Chu kỳ nhiệm vụ (Duty Cycle):** Tỉ lệ thời gian xung ở mức cao (High) so với toàn bộ chu kỳ:
  $$V_{\text{out}} = \text{DutyCycle} \times V_{\text{cc}}$$
- Ứng dụng: Điều khiển tốc độ động cơ DC qua mạch cầu H, điều khiển vị trí góc quay động cơ RC Servo.

### 2. Đọc Encoder bằng Timer phần cứng
Quadrature Encoder phát ra 2 kênh xung A và B lệch pha nhau 90 độ khi xoay:
- Khối Timer của MCU cấu hình ở **chế độ Encoder** tự động đếm số sườn xung.
- Hướng xoay (chiều kim đồng hồ hay ngược) được xác định bằng việc kiểm tra kênh nào dẫn trước (pha A dẫn trước B hay ngược lại). Tính toán hoàn toàn bằng phần cứng Timer, không tốn tài nguyên CPU.', 
    'core-theory', 
    '["Timer 2 của STM32F4 cấu hình chế độ Encoder Mode đếm xung từ động cơ vai tần số 10kHz.", "Mạch cầu H nhận xung PWM tần số 20kHz từ chân GPIO để điều khiển mô-men xoắn động cơ bánh xe."]'::jsonb, 
    '["Tần số PWM điều khiển động cơ thường chọn trên 20kHz để tai con người không nghe thấy tiếng rít cơ khí (nằm ngoài dải nghe 20Hz-20kHz).", "Đọc encoder bằng ngắt GPIO thông thường dễ bị mất xung ở vận tốc cao, bắt buộc dùng khối Hardware Timer Encoder chuyên biệt.", "Chế độ đếm x4 quét cả sườn lên và sườn xuống của cả hai kênh A và B để tăng gấp 4 lần độ phân giải đo góc."]'::jsonb, 
    6, 
    TRUE,
    'mcu-peripherals'
  ),
  (
    'cs_embhar_06', 
    'Hệ điều hành nhúng & Micro-ROS', 
    13, 
    'Hệ điều hành nhúng & Micro-ROS', 
    'Hệ điều hành thời gian thực FreeRTOS', 
    '### 1. Khái niệm RTOS (Real-Time Operating System)
RTOS là hệ điều hành đa nhiệm ưu tiên được thiết kế chuyên biệt cho hệ thống nhúng thời gian thực.
- Khác với Windows/Linux phân phối thời gian CPU theo cơ chế công bằng (Time-sharing), RTOS phân phối CPU dựa vào **Độ ưu tiên (Priority)** của tác vụ. Tác vụ có độ ưu tiên cao hơn luôn giành quyền chạy CPU tức thời.

### 2. Các linh kiện đồng bộ trong FreeRTOS
- **Task (Tác vụ):** Các vòng lặp chạy độc lập thực hiện nhiệm vụ (ví dụ: Task PID, Task đọc cảm biến).
- **Mutex (Mutual Exclusion):** Cơ chế khóa bảo vệ tài nguyên dùng chung (ví dụ: cổng ghi SPI) tránh hiện tượng tranh chấp ghi dữ liệu đồng thời.
- **Semaphore:** Cờ hiệu báo tin đồng bộ hóa giữa các tác vụ (ví dụ: ngắt ISR giải phóng Semaphore báo Task xử lý dữ liệu chạy).', 
    'core-theory', 
    '["Tạo Task điều khiển PID tần số 200Hz có độ ưu tiên cao nhất, Task in thông số debug tần số 1Hz có độ ưu tiên thấp.", "Task đọc cảm biến IMU dùng Mutex khóa bus SPI để tránh bị Task ghi thẻ nhớ chèn vào giữa dòng truyền."]'::jsonb, 
    '["Hiện tượng nghịch đảo ưu tiên (Priority Inversion) xảy ra khi tác vụ trung bình chèn vào giữa làm tác vụ cao bị treo đợi khóa Mutex từ tác vụ thấp.", "FreeRTOS sử dụng bộ lập lịch pre-emptive để lập tức ngắt tác vụ thấp khi tác vụ cao sẵn sàng.", "Tránh dùng hàm delay() của Arduino trong RTOS vì nó treo cứng CPU, phải thay thế bằng `vTaskDelay()` để nhường CPU cho tác vụ khác."]'::jsonb, 
    7, 
    TRUE,
    'rtos-micro-ros'
  ),
  (
    'cs_embhar_07', 
    'Hệ điều hành nhúng & Micro-ROS', 
    13, 
    'Hệ điều hành nhúng & Micro-ROS', 
    'micro-ROS: Kết nối Vi điều khiển trực tiếp vào mạng ROS2', 
    '### 1. Ý tưởng của micro-ROS
Truyền thống, vi điều khiển nhỏ không thể chạy ROS2 vì đòi hỏi cấu hình máy tính lớn. micro-ROS giải quyết bài toán này bằng cách đưa giao tiếp ROS2 trực tiếp vào các MCU nhúng (STM32, ESP32):
- Viết code publisher, subscriber trực tiếp trong firmware của MCU bằng ngôn ngữ C/C++.

### 2. Giao thức XRCE-DDS (eXtremely Resource Constrained Environments)
micro-ROS sử dụng chuẩn XRCE-DDS siêu nhẹ thay thế cho DDS truyền thống:
- MCU đóng vai trò là **Client** kết nối qua UART/Wi-Fi/Ethernet tới một **micro-ROS Agent** chạy trên máy tính nhúng (như Raspberry Pi). Agent dịch dữ liệu XRCE-DDS sang mạng DDS chuẩn của ROS2.', 
    'core-theory', 
    '["ESP32 đọc góc khớp từ encoder rồi publish trực tiếp dữ liệu lên topic `/joint_states` của ROS2 qua mạng Wifi dùng micro-ROS.", "Cấu hình micro-ROS Agent chạy trên Raspberry Pi đọc cổng serial USB kết nối từ STM32."]'::jsonb, 
    '["micro-ROS hỗ trợ chạy trên các hệ điều hành RTOS như FreeRTOS, Zephyr hoặc chạy trần (Bare-metal).", "XRCE-DDS giảm thiểu kích thước tiêu đề gói tin và dung lượng bộ nhớ tĩnh để phù hợp với bộ nhớ RAM dưới 100KB của MCU.", "Sử dụng micro-ROS giúp đồng bộ hóa trực tiếp thời gian thực (time synchronization) giữa CPU chính và các vi điều khiển khớp."]'::jsonb, 
    7, 
    TRUE,
    'rtos-micro-ros'
  ),
  (
    'cs_embhar_08', 
    'Thiết kế mạch & Nguồn điện', 
    13, 
    'Thiết kế mạch & Nguồn điện', 
    'Cách ly điện quang (Optocouplers) chống nhiễu cuộn dây động cơ', 
    '### 1. Nhiễu điện từ do động cơ (EMI)
Động cơ điện khi băm xung PWM tiêu thụ dòng điện lớn và đóng ngắt liên tục cuộn cảm, sinh ra sức điện động phản ngược (back-EMF) khổng lồ và các xung nhiễu điện từ gai cao truyền ngược về đường nguồn VCC, dễ làm sập nguồn, treo hoặc phá hủy chip MCU nhạy cảm.

### 2. Cách ly quang học (Optocouplers / Optoisolators)
Linh kiện tích hợp gồm 1 đèn LED hồng ngoại phát quang và 1 Phototransistor thu quang nằm đối diện nhau trong vỏ kín cách điện:
- Tín hiệu điều khiển từ chân GPIO của MCU kích sáng LED phát $\rightarrow$ ánh sáng kích mở transistor thu ở mạch công suất động cơ.
- **Bảo vệ tuyệt đối:** Không có bất kỳ kết nối vật lý bằng dây dẫn nào giữa mạch điều khiển (digital) và mạch công suất động cơ (power). Ngăn hoàn toàn dòng điện quá áp phản ngược phá hỏng vi xử lý.', 
    'core-theory', 
    '["Thiết kế mạch PCB đặt chip cách ly quang EL817 để cách ly tín hiệu xung PWM từ chân STM32 sang chân Driver mạch cầu H động cơ.", "Sử dụng hai đường nguồn GND độc lập (GND_MCU và GND_POWER) cách ly cách nhau hoàn toàn qua Optocoupler."]'::jsonb, 
    '["Nếu không nối hai đất (GND) độc lập cách ly nhau hoàn toàn, việc dùng Optocoupler sẽ mất đi tác dụng bảo vệ điện.", "Diode chặn ngược (Flyback Diode) bắt buộc phải mắc song song ngược đầu với cuộn dây động cơ để triệt tiêu năng lượng cảm ứng tích lũy khi ngắt dòng.", "Optocoupler tốc độ cao (như 6N137) được chọn cho các tín hiệu PWM tần số lớn để tránh méo dạng xung."]'::jsonb, 
    6, 
    TRUE,
    'pcb-power'
  ),
  (
    'cs_embhar_09', 
    'Thiết kế mạch & Nguồn điện', 
    13, 
    'Thiết kế mạch & Nguồn điện', 
    'Quản lý năng lượng pin LiPo & Hệ thống BMS', 
    '### 1. Pin Lithium Polymer (LiPo)
Loại pin mật độ năng lượng cao, nhẹ, dòng xả lớn, là nguồn năng lượng chuẩn cho robot di động và Drone.
- **Điện áp cell:** Điện áp định mức 3.7V, đầy 4.2V, cạn hoàn toàn 3.0V (dưới 3.0V pin sẽ bị hỏng phồng).
- **C-rate (Dòng xả C):** Thể hiện khả năng xả dòng điện tối đa của pin:
  $$I_{\text{max}} = \text{Dung lượng} \times C\text{-rate}$$
  Ví dụ: Pin 2000mAh 30C xả tối đa $2\text{A} \times 30 = 60\text{A}$.

### 2. Hệ thống quản lý pin BMS (Battery Management System)
Mạch bảo vệ an toàn tích hợp trực tiếp trên khối pin thực hiện:
- Bảo vệ quá dòng, ngắn mạch phần cứng.
- Cân bằng điện áp giữa các cell pin mắc nối tiếp (cell balancing) để tăng tuổi thọ.
- Tự động ngắt xả khi pin chạm ngưỡng cạn 3.0V/cell.', 
    'core-theory', 
    '["Robot AMR dùng pin LiPo 4S (4 cell nối tiếp, điện áp định mức 14.8V) dung lượng 5000mAh dòng xả 25C cấp nguồn cho 4 động cơ kéo hàng.", "Mạch BMS tự động cắt tải khi phát hiện nhiệt độ pin vượt quá 60 độ C khi sạc."]'::jsonb, 
    '["Pin LiPo không có mạch bảo vệ BMS rất dễ bị cháy nổ nếu bị ngắn mạch hoặc sạc quá áp.", "C-rate sạc thường rất nhỏ (1C-2C) để đảm bảo an toàn nhiệt hóa học cho pin.", "Hiện tượng sụt áp tức thời (Voltage Sag) xảy ra khi robot khởi động động cơ đột ngột kéo dòng điện lớn vượt dòng xả."]'::jsonb, 
    6, 
    TRUE,
    'pcb-power'
  ),
  (
    'cs_embhar_10', 
    'Vi điều khiển & Ngoại vi', 
    13, 
    'Vi điều khiển & Ngoại vi', 
    'Chuyển đổi tín hiệu tương tự ADC & Lọc số Moving Average', 
    '### 1. Bộ chuyển đổi tương tự - số (ADC)
ADC (Analog-to-Digital Converter) đọc điện áp tương tự từ cảm biến (như cảm biến khoảng cách hồng ngoại) và chuyển thành số nhị phân:
- **Độ phân giải (Resolution):** Xác định độ mịn của phép đo. ADC 12-bit chuyển đổi điện áp $0 - 3.3\text{V}$ thành dải số nguyên $0 - 4095$.

### 2. Lọc số Moving Average (Lọc trung bình trượt)
Tín hiệu ADC thực tế luôn bị nhiễu điện từ làm nhảy số liên tục. Lọc Moving Average lọc nhiễu tần số cao bằng cách lấy trung bình cộng của $N$ mẫu đo gần nhất trong cửa sổ trượt:
$$y[n] = \frac{1}{N} \sum_{i=0}^{N-1} x[n - i]$$
- $N$ càng lớn thì tín hiệu lọc càng mịn nhưng độ trễ đáp ứng càng tăng.', 
    'core-theory', 
    '["Đọc giá trị điện áp cảm biến nhiệt độ qua cổng ADC 12-bit của STM32, chạy lọc trung bình trượt cửa sổ N=10 để triệt tiêu nhiễu dao động số.", "Vẽ biểu đồ so sánh tín hiệu ADC thô và tín hiệu sau khi qua bộ lọc Moving Average để thấy độ mịn."]'::jsonb, 
    '["ADC của ESP32 nổi tiếng là không tuyến tính ở vùng biên điện áp thấp (<0.1V) và cao (>3.2V), cần hiệu chuẩn phi tuyến.", "Tần số lấy mẫu (Sampling Rate) phải tuân theo định lý Nyquist - lớn hơn ít nhất 2 lần tần số cao nhất của nhiễu tín hiệu.", "Lọc trung bình trượt là bộ lọc số FIR (Finite Impulse Response) đơn giản và hiệu quả nhất cho vi điều khiển nhúng."]'::jsonb, 
    6, 
    TRUE,
    'mcu-peripherals'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_embhar_01', 'mcu-peripherals', 'lesson', 'Kiến trúc Vi điều khiển (MCU) STM32 & ESP32', '{"lesson_id": "cs_embhar_01"}'::jsonb, 10, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_02', 'serial-bus', 'lesson', 'Chuẩn giao tiếp UART, SPI & I2C', '{"lesson_id": "cs_embhar_02"}'::jsonb, 10, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_03', 'serial-bus', 'lesson', 'Bus CAN (Controller Area Network) trong ô tô & robot', '{"lesson_id": "cs_embhar_03"}'::jsonb, 20, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_04', 'mcu-peripherals', 'lesson', 'Cơ chế ngắt ISR & Truy cập bộ nhớ trực tiếp DMA', '{"lesson_id": "cs_embhar_04"}'::jsonb, 20, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_05', 'mcu-peripherals', 'lesson', 'Tạo xung PWM & Đọc bộ đếm Encoder', '{"lesson_id": "cs_embhar_05"}'::jsonb, 30, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_06', 'rtos-micro-ros', 'lesson', 'Hệ điều hành thời gian thực FreeRTOS', '{"lesson_id": "cs_embhar_06"}'::jsonb, 10, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_07', 'rtos-micro-ros', 'lesson', 'micro-ROS: Kết nối Vi điều khiển trực tiếp vào mạng ROS2', '{"lesson_id": "cs_embhar_07"}'::jsonb, 20, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_08', 'pcb-power', 'lesson', 'Cách ly điện quang (Optocouplers) chống nhiễu cuộn dây động cơ', '{"lesson_id": "cs_embhar_08"}'::jsonb, 10, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_09', 'pcb-power', 'lesson', 'Quản lý năng lượng pin LiPo & Hệ thống BMS', '{"lesson_id": "cs_embhar_09"}'::jsonb, 20, 10, 20, 'cs_embedded_hardware', 13),
  ('act-lesson-cs_embhar_10', 'mcu-peripherals', 'lesson', 'Chuyển đổi tín hiệu tương tự ADC & Lọc số Moving Average', '{"lesson_id": "cs_embhar_10"}'::jsonb, 40, 10, 20, 'cs_embedded_hardware', 13)
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
