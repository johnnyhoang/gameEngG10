-- SQL migration to seed topics and 10 core lessons for cs_computer_systems (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_computer_systems (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('computer-arithmetic', 'cs_computer_systems', 13, 'Số học & Biểu diễn dữ liệu', 'Biểu diễn bit nhị phân, hệ bù 2 của số nguyên và chuẩn dấu phẩy động IEEE 754 cho số thực.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('processor-architecture', 'cs_computer_systems', 13, 'Kiến trúc CPU & Tập lệnh', 'Kiến trúc tập lệnh Assembly, cơ chế biên dịch/liên kết, chu kỳ lệnh Pipelining và superscalar CPU.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('memory-subsystem', 'cs_computer_systems', 13, 'Hệ thống Bộ nhớ & Phân trang', 'Phân cấp bộ nhớ đệm Cache, nguyên lý cục bộ địa chỉ, bộ nhớ ảo và dịch địa chỉ phân trang.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('system-security-io', 'cs_computer_systems', 13, 'Giao tiếp Ngoại vi & Bảo mật', 'Giao tiếp thiết bị ngoại vi qua ngắt/DMA và lỗ hổng bảo mật tràn bộ đệm stack buffer overflow.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_computer_systems (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_sys_01', 
    'cs_computer_systems', 
    13, 
    'Số học & Biểu diễn dữ liệu', 
    'Biểu diễn thông tin trong máy tính (Bù 2 & IEEE 754)', 
    '### 1. Biểu diễn số nguyên bù 2 (Two''s Complement)
Để biểu diễn số nguyên có dấu, máy tính sử dụng chuẩn bù 2.
- Quy tắc chuyển đổi số dương $X$ thành số âm $-X$: Đảo toàn bộ các bit của $X$ (phép bù 1) rồi cộng thêm 1.
- Bit cao nhất (MSB - Most Significant Bit) đóng vai trò là bit dấu (0 là số dương, 1 là số âm).
- Ưu điểm: Phép cộng và trừ số nguyên được thực hiện trên cùng một mạch phần cứng mà không cần phân biệt số âm/dương.

### 2. Số thực dấu phẩy động IEEE 754
Biểu diễn số thực dưới dạng ký hiệu khoa học nhị phân:
$$V = (-1)^s \times M \times 2^E$$
Gồm 3 thành phần:
1. **Bit dấu ($s$):** Xác định số âm hay dương (1 bit).
2. **Phần mũ lệch ($E$ - Exponent):** Lưu trữ giá trị mũ được cộng thêm một hằng số lệch (bias) để tránh lưu số mũ âm (ở chuẩn đơn 32-bit là 8 bit, bias = 127).
3. **Phần định trị ($M$ - Fraction/Mantissa):** Lưu trữ phần thập phân sau số 1 ẩn (ở chuẩn đơn 32-bit là 23 bit).

### 3. Lỗi làm tròn số thực
Do số bit hữu hạn, nhiều số thập phân (như 0.1 hoặc 0.2) không thể biểu diễn chính xác tuyệt đối ở hệ nhị phân, dẫn đến sai số làm tròn tích lũy khi tính toán.', 
    'core-theory', 
    '["Biểu diễn số âm -5 dạng 8-bit bù 2: số 5 là 00000101, bù 1 là 11111010, cộng 1 thu được 11111011.", "Sai số dấu phẩy động: trong JavaScript, biểu thức `0.1 + 0.2 === 0.3` trả về false vì tổng thực tế là 0.30000000000000004."]'::jsonb, 
    '["Chuẩn IEEE 754 đơn (single precision) sử dụng 32 bit, chuẩn kép (double precision) sử dụng 64 bit.", "Trong số nguyên bù 2 kích thước N-bit, giá trị nhỏ nhất biểu diễn được là -2^(N-1) và lớn nhất là 2^(N-1) - 1.", "Không bao giờ so sánh bằng trực tiếp (==) giữa hai số thực dấu phẩy động, hãy dùng độ lệch epsilon nhỏ."]'::jsonb, 
    5, 
    TRUE,
    'computer-arithmetic'
  ),
  (
    'cs_sys_02', 
    'cs_computer_systems', 
    13, 
    'Kiến trúc CPU & Tập lệnh', 
    'Kiến trúc Tập lệnh CPU (ISA) & Hợp ngữ Assembly', 
    '### 1. Phân biệt RISC và CISC
- **CISC (Complex Instruction Set Computer - ví dụ x86):** Tập lệnh phức tạp, nhiều chỉ thị máy thực hiện được các tác vụ tinh vi trực tiếp trên bộ nhớ. Tiết kiệm số dòng code nhưng mạch giải mã lệnh của CPU rất phức tạp.
- **RISC (Reduced Instruction Set Computer - ví dụ RISC-V, ARM):** Tập lệnh rút gọn, các lệnh đơn giản và có kích thước cố định. Mọi thao tác tính toán chỉ thực hiện trên thanh ghi (Load-Store Architecture). Dễ tối ưu tốc độ xung nhịp CPU.

### 2. Hợp ngữ Assembly cơ bản
Hợp ngữ là ngôn ngữ trung gian gần nhất với mã máy, chuyển các byte nhị phân thành các từ gợi nhớ:
- `MOV / li`: Di chuyển/nạp dữ liệu.
- `ADD / SUB`: Phép toán số học.
- `LOAD / STORE (lw, sw)`: Đọc/ghi dữ liệu giữa RAM và thanh ghi.
- `JMP / BEQ`: Rẽ nhánh, nhảy địa chỉ lệnh.

### 3. Các thanh ghi (Registers) đặc biệt
Thanh ghi là các ô nhớ tốc độ cao nhất nằm ngay trong nhân CPU:
- **Program Counter (PC):** Lưu địa chỉ của chỉ lệnh tiếp theo chuẩn bị thực thi.
- **Stack Pointer (SP):** Trỏ tới đỉnh của bộ nhớ Stack hiện tại.
- **Frame Pointer (FP) / Base Pointer (BP):** Đánh dấu điểm bắt đầu của Stack Frame hiện tại.', 
    'core-theory', 
    '["Lệnh nạp số 10 vào thanh ghi t0 trong RISC-V: `li t0, 10`", "Lệnh đọc từ RAM vào thanh ghi: `lw t1, 0(s0)` đọc giá trị tại địa chỉ s0 + 0 lưu vào t1."]'::jsonb, 
    '["CPU RISC chỉ cho phép đọc ghi bộ nhớ qua hai lệnh Load và Store, các lệnh toán học bắt buộc phải lấy tham số từ thanh ghi.", "Thanh ghi PC tự động tăng sau mỗi chu kỳ lệnh để trỏ tới chỉ lệnh kế tiếp trừ khi có lệnh nhảy rẽ nhánh.", "Kiến trúc ARM (RISC) chiếm lĩnh thị phần chip di động nhờ tiết kiệm năng lượng vượt trội so với Intel x86 (CISC)."]'::jsonb, 
    6, 
    TRUE,
    'processor-architecture'
  ),
  (
    'cs_sys_03', 
    'cs_computer_systems', 
    13, 
    'Kiến trúc CPU & Tập lệnh', 
    'Cơ chế Biên dịch & Liên kết (Compilation & Linking)', 
    '### 1. 4 Giai đoạn biên dịch chương trình (ví dụ GCC)
Quá trình chuyển đổi từ mã nguồn C sang file chạy nhị phân:
1. **Tiền xử lý (Preprocessing):** Xử lý các chỉ thị bắt đầu bằng dấu `#` (như `#include`, `#define`), nạp code thư viện và thay thế macro. Tạo ra file `.i`.
2. **Biên dịch (Compilation):** Phân tích cú pháp và ngữ nghĩa, tối ưu hoá mã nguồn và dịch sang mã hợp ngữ Assembly. Tạo ra file `.s`.
3. **Lắp ráp (Assembly):** Dịch các lệnh hợp ngữ Assembly thành mã máy nhị phân thô (Object code). Tạo ra file `.o` hoặc `.obj`.
4. **Liên kết (Linking):** Kết hợp các file object và thư viện lại, giải quyết các tham chiếu địa chỉ hàm chéo để tạo ra file thực thi cuối cùng (`.exe` hoặc ELF).

### 2. Phân biệt Liên kết Tĩnh và Liên kết Động
- **Liên kết Tĩnh (Static Linking):** Sao chép toàn bộ mã nguồn của thư viện (`.a` / `.lib`) nén trực tiếp vào file chạy đầu ra. File chạy độc lập hoàn toàn nhưng dung lượng lớn và khó nâng cấp thư viện.
- **Liên kết Động (Dynamic Linking):** File chạy chỉ lưu con trỏ tham chiếu đến thư viện chia sẻ chung (`.so` / `.dll`). Thư viện được nạp vào RAM lúc chạy chương trình. Giúp tiết kiệm ổ đĩa và RAM, dễ dàng vá lỗi thư viện mà không cần biên dịch lại ứng dụng.', 
    'core-theory', 
    '["Chạy biên dịch từng bước với GCC: `gcc -S main.c` để dừng ở bước tạo hợp ngữ assembly main.s.", "Liên kết động trong Windows sử dụng các tệp tin .dll (Dynamic Link Library), trong Linux sử dụng .so (Shared Object)."]'::jsonb, 
    '["Giai đoạn tiền xử lý không kiểm tra cú pháp của code, chỉ thực hiện thay thế chuỗi thuần túy.", "Lỗi Linker (ví dụ: undefined reference) xảy ra khi khai báo hàm ở file header nhưng không viết triển khai ở file source hoặc thiếu chỉ định liên kết thư viện.", "Dynamic Linking làm chậm tốc độ khởi động ứng dụng một chút do chi phí phân giải địa chỉ lúc run-time."]'::jsonb, 
    6, 
    TRUE,
    'processor-architecture'
  ),
  (
    'cs_sys_04', 
    'cs_computer_systems', 
    13, 
    'Hệ thống Bộ nhớ & Phân trang', 
    'Hệ thống Bộ nhớ phân cấp & Nguyên lý cục bộ (Locality)', 
    '### 1. Phân cấp bộ nhớ (Memory Hierarchy)
Để tối ưu chi phí và hiệu năng, máy tính phân cấp bộ nhớ theo hình kim tự tháp:
$$\text{Registers} \rightarrow \text{Cache L1/L2/L3} \rightarrow \text{RAM} \rightarrow \text{SSD/HDD}$$
- Đi từ đỉnh xuống: Tốc độ giảm dần, dung lượng tăng dần, giá thành trên mỗi byte giảm dần.

### 2. Nguyên lý cục bộ (Principle of Locality)
Chương trình có xu hướng truy cập các vùng nhớ gần nhau.
- **Cục bộ thời gian (Temporal Locality):** Một vùng nhớ vừa được truy cập có khả năng cao sẽ được truy cập lại trong tương lai gần (ví dụ: biến đếm trong vòng lặp).
- **Cục bộ không gian (Spatial Locality):** Các vùng nhớ nằm kề nhau có xu hướng được truy cập liên tiếp nhau (ví dụ: duyệt qua các phần tử mảng tuần tự).

### 3. Tác động đến hiệu năng viết code
Thiết kế code tận dụng nguyên lý cục bộ giúp phần cứng dự đoán và nạp sẵn dữ liệu từ RAM lên bộ nhớ Cache tốc độ cao trước khi CPU yêu cầu, tăng tốc độ thực thi hàng chục lần.', 
    'core-theory', 
    '["Duyệt mảng 2 chiều theo hàng tận dụng Spatial Locality vì bộ nhớ C lưu mảng liên tục theo hàng: `for (i) for (j) sum += arr[i][j];`", "Duyệt theo cột `arr[j][i]` gây trượt cache (cache miss) liên tục vì các phần tử kế tiếp nằm cách xa nhau trong bộ nhớ RAM."]'::jsonb, 
    '["Bộ nhớ Cache L1/L2 tích hợp sẵn trong nhân CPU chạy nhanh hơn RAM vật lý từ 10 đến 100 lần.", "Khi nạp dữ liệu từ RAM, CPU không nạp từng byte lẻ mà nạp một khối nhớ liên tục gọi là Cache Line (thường là 64 bytes).", "Viết code thân thiện với Cache (cache-friendly code) là kỹ thuật tối ưu hóa phần mềm cực kỳ quan trọng."]'::jsonb, 
    6, 
    TRUE,
    'memory-subsystem'
  ),
  (
    'cs_sys_05', 
    'cs_computer_systems', 
    13, 
    'Hệ thống Bộ nhớ & Phân trang', 
    'Cơ chế Bộ nhớ đệm Cache (Direct-Mapped & Associative)', 
    '### 1. Cấu trúc dòng Cache (Cache Line)
Mỗi dòng cache gồm 3 thành phần chính:
- **Valid Bit:** Xác định dữ liệu trong dòng cache có hợp lệ hay không (0 là rác, 1 là dữ liệu chuẩn).
- **Tag:** Phần bit trích xuất từ địa chỉ RAM để xác định chính xác khối nhớ nào đang được nạp.
- **Data block:** Khối dữ liệu thực tế copy từ RAM lên.

### 2. Các phương thức ánh xạ địa chỉ vào Cache
- **Ánh xạ trực tiếp (Direct-Mapped):** Mỗi khối nhớ RAM chỉ có duy nhất một dòng cache tương ứng để nạp vào ($index = BlockAddress \pmod{CacheLines}$). Dễ bị xung đột trùng index.
- **Liên kết tập hợp (Set-Associative):** Cache được chia thành các tập hợp (Sets), mỗi khối RAM có thể nạp vào dòng bất kỳ trong set tương ứng. Ví dụ: 2-way Set-Associative (mỗi set có 2 dòng). Giảm xung đột hiệu quả.

### 3. Phân loại Trượt Cache (Cache Misses)
- **Compulsory/Cold Miss:** Trượt cache do lần đầu tiên truy cập dữ liệu, bắt buộc phải nạp từ RAM lên.
- **Capacity Miss:** Bộ nhớ cache quá nhỏ so với lượng dữ liệu chương trình cần dùng.
- **Conflict Miss:** Xảy ra ở Direct-Mapped hoặc Set-Associative khi nhiều khối nhớ RAM cùng tranh chấp ánh xạ vào một dòng cache trong khi các dòng cache khác vẫn trống.', 
    'core-theory', 
    '["Phân tích địa chỉ RAM 32-bit gửi tới Cache ánh xạ trực tiếp: gồm 3 trường [Tag | Index | Offset]. Offset chỉ vị trí byte trong cache line, Index chọn dòng cache, Tag dùng để đối chiếu khớp dữ liệu.", "Thuật toán LRU (Least Recently Used) được dùng trong Set-Associative Cache để chọn dòng cache lâu nhất chưa dùng làm nạn nhân bị ghi đè khi set bị đầy."]'::jsonb, 
    '["Set-Associative Cache đòi hỏi mạch so sánh song song nhiều Tag cùng lúc nên tốn năng lượng hơn Direct-Mapped.", "Trượt cache (Cache Miss) bắt CPU phải chờ đợi hàng trăm chu kỳ máy (CPU Stall) để RAM phản hồi dữ liệu.", "L1 Cache được chia làm hai phần độc lập: L1i chứa chỉ thị lệnh và L1d chứa dữ liệu."]'::jsonb, 
    7, 
    TRUE,
    'memory-subsystem'
  ),
  (
    'cs_sys_06', 
    'cs_computer_systems', 
    13, 
    'Hệ thống Bộ nhớ & Phân trang', 
    'Bộ nhớ ảo & Cơ chế dịch địa chỉ phân trang (Virtual Memory)', 
    '### 1. Mục tiêu của Bộ nhớ ảo
Bộ nhớ ảo tạo ra một không gian địa chỉ tuyến tính giả lập cho mỗi tiến trình (Process), giúp bảo vệ bộ nhớ cô lập giữa các tiến trình và cho phép chạy các chương trình có dung lượng lớn hơn dung lượng RAM vật lý thực tế.

### 2. Cơ chế phân trang (Paging)
- Không gian địa chỉ ảo được chia thành các khối kích thước cố định gọi là **Trang ảo (Virtual Pages - VP)**.
- RAM vật lý được chia thành các **Khung trang (Physical Frames - PF)** có cùng kích thước (thường là 4KB).
- **Bảng trang (Page Table):** Cấu trúc dữ liệu trong RAM giúp dịch Địa chỉ ảo sang Địa chỉ vật lý. Mỗi dòng chứa Page Table Entry (PTE) lưu khung trang vật lý và các bit quyền (valid, read, write).

### 3. TLB (Translation Lookaside Buffer) & Page Fault
- **TLB:** Bộ đệm phần cứng tốc độ cao nằm trong MMU (Memory Management Unit) lưu trữ các cặp dịch địa chỉ ảo-vật lý vừa dùng, tránh việc phải truy cập RAM 2 lần để dịch địa chỉ.
- **Lỗi trang (Page Fault):** Xảy ra khi trang ảo được truy cập chưa được nạp vào RAM vật lý (valid bit = 0 trong Page Table). Hệ điều hành sẽ nhảy vào ngắt lỗi trang, nạp trang từ ổ đĩa cứng vào RAM rồi cập nhật bảng trang.', 
    'core-theory', 
    '["Tính kích thước trang ảo: với địa chỉ ảo 32-bit và trang 4KB (2^12 bytes), 12 bit thấp dùng làm Page Offset, 20 bit cao làm Virtual Page Number (VPN). VPN dùng làm chỉ số tra cứu trong Page Table.", "Khi xảy ra Page Fault, OS phải chọn trang nạn nhân để ghi xuống ổ cứng (Page Out) giải phóng RAM trước khi nạp trang mới (Page In)."]'::jsonb, 
    '["Bảng trang đa cấp (Multi-level Page Table) được thiết kế để tiết kiệm bộ nhớ cho bảng trang khi không gian địa chỉ ảo thưa thớt.", "Lỗi trang Page Fault tốn hàng triệu chu kỳ CPU do phải đọc ghi ổ đĩa cơ học/SSD chậm chạp.", "Bit valid = 0 không phải lúc nào cũng là lỗi, nó biểu thị trang đó đang nằm ở Swap space trên ổ cứng."]'::jsonb, 
    7, 
    TRUE,
    'memory-subsystem'
  ),
  (
    'cs_sys_07', 
    'cs_computer_systems', 
    13, 
    'Kiến trúc CPU & Tập lệnh', 
    'Chu kỳ lệnh & Kỹ thuật Đường ống (Pipelining)', 
    '### 1. 5 Giai đoạn của Chu kỳ lệnh CPU
1. **Fetch (IF):** Nạp chỉ thị lệnh từ bộ nhớ (địa chỉ lưu ở thanh ghi PC) vào CPU.
2. **Decode (ID):** Giải mã chỉ thị để xác định thao tác cần làm và đọc dữ liệu từ các thanh ghi đầu vào.
3. **Execute (EX):** Thực thi phép toán số học/logic bằng khối ALU.
4. **Memory (MEM):** Đọc hoặc ghi dữ liệu vào bộ nhớ RAM (nếu là lệnh Load/Store).
5. **Writeback (WB):** Ghi kết quả tính toán trở lại thanh ghi đích.

### 2. Kỹ thuật đường ống Pipelining
Thay vì đợi một lệnh chạy xong cả 5 bước mới chạy lệnh tiếp theo, Pipelining cho phép gối đầu các lệnh đồng thời (giống như dây chuyền sản xuất công nghiệp). Giúp tăng luồng xử lý (throughput) của CPU.

### 3. Các lỗi gây nghẽn đường ống (Pipeline Hazards)
Xung đột làm đường ống bị khựng lại (stall):
- **Structural Hazard:** Hai lệnh cùng tranh chấp một tài nguyên phần cứng trong cùng một chu kỳ (ví dụ: cùng đọc RAM).
- **Data Hazard:** Lệnh sau phụ thuộc vào kết quả của lệnh trước chưa được ghi lại vào thanh ghi (chưa tới bước WB). Khắc phục bằng kỹ thuật chuyển tiếp dữ liệu (Forwarding/Bypassing).
- **Control Hazard:** Xảy ra khi gặp lệnh rẽ nhánh rẽ nhánh (Jump/Branch). CPU không biết lệnh tiếp theo ở đâu để nạp vào đường ống.', 
    'core-theory', 
    '["Mô tả Data Hazard: lệnh 1: `add t0, t1, t2` (chưa WB); lệnh 2: `sub t3, t0, t4` (cần t0 ở bước ID). Giải quyết bằng Forwarding đưa trực tiếp kết quả từ đầu ra ALU lệnh 1 vào đầu vào ALU lệnh 2.", "Control Hazard làm trống đường ống (pipeline flush) tốn 2-3 chu kỳ máy nếu đoán sai hướng rẽ nhánh."]'::jsonb, 
    '["Pipelining không làm giảm thời gian thực thi (latency) của một lệnh đơn, nó chỉ làm tăng số lệnh hoàn thành trên một đơn vị thời gian (throughput).", "Sự xuất hiện của Hazard bắt buộc CPU phải chèn các lệnh rỗng (NOP - No Operation) làm khựng đường ống.", "Kiến trúc tập lệnh RISC với chiều dài lệnh cố định giúp triển khai đường ống Pipelining dễ dàng hơn CISC."]'::jsonb, 
    7, 
    TRUE,
    'processor-architecture'
  ),
  (
    'cs_sys_08', 
    'cs_computer_systems', 
    13, 
    'Kiến trúc CPU & Tập lệnh', 
    'Độc lập chỉ lệnh (ILP) & Superscalar CPU', 
    '### 1. Kiến trúc Superscalar CPU
Superscalar CPU tích hợp nhiều bản sao của các khối chức năng (ví dụ: có 2-3 bộ ALU, nhiều bộ nhân). Cho phép CPU nạp và thực thi đồng thời nhiều lệnh độc lập trong cùng một chu kỳ máy ($IPC > 1$).

### 2. Out-of-Order Execution (Thực thi không tuần tự)
Để tối đa công suất phần cứng, CPU phân tích dòng lệnh đầu vào, tìm các lệnh không phụ thuộc dữ liệu lẫn nhau và thực thi chúng trước ngay cả khi chúng nằm sau các lệnh đang bị nghẽn (do chờ đọc RAM). Kết quả được lưu tạm và ghi nhận lại theo đúng tuần tự ban đầu (In-Order Commit) để đảm bảo tính đúng đắn.

### 3. Kỹ thuật dự đoán nhánh (Branch Prediction)
Để giải quyết Control Hazard của Pipelining, CPU tích hợp bộ dự đoán nhánh sử dụng lịch sử chạy để đoán trước hướng đi của lệnh rẽ nhánh (`if-else`).
- CPU suy đoán nạp lệnh và thực thi trước (Speculative Execution).
- Nếu đoán đúng: CPU chạy liên tục không bị khựng.
- Nếu đoán sai: CPU hủy bỏ toàn bộ kết quả thực thi suy đoán, làm sạch đường ống (flush) và nạp lại từ nhánh đúng.', 
    'core-theory', 
    '["Sử dụng giải thuật Tomasulo để lập lịch thực thi không tuần tự trong phần cứng CPU.", "Đoạn code duyệt mảng đã sắp xếp chạy nhanh hơn mảng ngẫu nhiên vì bộ dự đoán nhánh của CPU dễ dàng đoán đúng mẫu rẽ nhánh của vòng lặp."]'::jsonb, 
    '["Lỗ hổng bảo mật Spectre nổi tiếng khai thác cơ chế speculative execution của bộ dự đoán nhánh CPU để đọc trộm dữ liệu bộ nhớ ảo.", "Out-of-Order Execution đòi hỏi cấu trúc phần cứng phức tạp như bảng đổi tên thanh ghi (Register Renaming) và hàng đợi ghi nhận (Reorder Buffer).", "Superscalar đòi hỏi độ độc lập chỉ lệnh (Instruction-Level Parallelism) cao từ mã nguồn biên dịch."]'::jsonb, 
    8, 
    TRUE,
    'processor-architecture'
  ),
  (
    'cs_sys_09', 
    'cs_computer_systems', 
    13, 
    'Giao tiếp Ngoại vi & Bảo mật', 
    'Giao tiếp ngoại vi qua cơ chế Ngắt & DMA', 
    '### 1. Cơ chế Polling (Quét vòng)
CPU liên tục chạy một vòng lặp kiểm tra cờ trạng thái của thiết bị ngoại vi (ví dụ bàn phím, card mạng) để xem có dữ liệu mới hay không. Cực kỳ lãng phí chu kỳ xử lý của CPU.

### 2. Cơ chế ngắt phần cứng (Interrupts)
Khi ngoại vi có dữ liệu, nó gửi tín hiệu ngắt (Interrupt Request - IRQ) tới CPU. CPU tạm dừng chương trình đang chạy, sao lưu các thanh ghi, tra cứu bảng vector ngắt để nhảy vào thực thi hàm xử lý ngắt (Interrupt Service Routine - ISR), sau đó quay lại chạy tiếp chương trình cũ. Giúp CPU rảnh tay làm việc khác.

### 3. DMA (Direct Memory Access - Truy cập bộ nhớ trực tiếp)
DMA là bộ điều khiển phần cứng phụ. Khi cần truyền lượng dữ liệu lớn (ví dụ đọc file từ ổ cứng vào RAM):
1. CPU cấu hình địa chỉ nguồn, đích và kích thước dữ liệu cho bộ điều khiển DMA rồi chuyển sang làm việc khác.
2. Bộ điều khiển DMA tự động quản lý bus truyền trực tiếp dữ liệu từ thiết bị ngoại vi vào RAM mà không cần đi qua CPU.
3. Khi truyền xong, DMA gửi một tín hiệu ngắt duy nhất báo cho CPU biết.', 
    'core-theory', 
    '["Sử dụng ngắt bàn phím: khi người dùng gõ phím, phần cứng gửi ngắt, CPU dừng tác vụ render màn hình để lưu ký tự gõ vào buffer.", "DMA truyền gói tin mạng từ Card mạng (NIC) trực tiếp vào RAM, giảm tải 95% thời gian xử lý I/O cho CPU."]'::jsonb, 
    '["Chi phí lưu trữ ngữ cảnh (Context Saving) khi xảy ra ngắt gồm việc push toàn bộ thanh ghi hiện tại vào Stack.", "DMA yêu cầu cơ chế phân chia quyền sử dụng bus hệ thống (Bus Arbitration) để tránh tranh chấp với CPU.", "Polling vẫn hữu dụng trong các hệ thống nhúng thời gian thực cực nhanh nơi thiết bị ngoại vi phản hồi liên tục."]'::jsonb, 
    6, 
    TRUE,
    'system-security-io'
  ),
  (
    'cs_sys_10', 
    'cs_computer_systems', 
    13, 
    'Giao tiếp Ngoại vi & Bảo mật', 
    'Tấn công Tràn bộ đệm (Stack Buffer Overflow)', 
    '### 1. Cấu trúc Stack Frame lúc chạy hàm
Khi một hàm được gọi, một khung ngăn xếp được đẩy vào Stack chứa:
$$\text{[Tham số]} \rightarrow \text{[Return Address]} \rightarrow \text{[Saved Frame Pointer]} \rightarrow \text{[Biến cục bộ/Mảng đệm]}$$
- Stack phát triển từ vùng địa chỉ cao xuống vùng địa chỉ thấp trong RAM.

### 2. Nguyên lý tấn công tràn bộ đệm
Nếu hàm sử dụng các lệnh đọc dữ liệu không kiểm tra biên (như `gets()`, `strcpy()` trong C) ghi dữ liệu vào một mảng đệm cục bộ (buffer) vượt quá kích thước khai báo. Dữ liệu ghi thừa sẽ tràn lên phía trên (vùng địa chỉ cao hơn), ghi đè lên **Return Address** (Địa chỉ trả về của hàm). Hacker ghi đè địa chỉ này bằng địa chỉ trỏ tới mã độc hại (shellcode) do chúng chuẩn bị sẵn trong bộ nhớ, chiếm quyền điều khiển hệ thống khi hàm thực hiện lệnh `ret`.

### 3. Các cơ chế phòng thủ hệ thống
- **Stack Canary:** Chèn một giá trị ngẫu nhiên bí mật vào giữa biến cục bộ và Return Address. Trước khi thoát hàm, CPU kiểm tra giá trị Canary có bị đổi không; nếu có (bị tràn đè), chương trình lập tức tự tử.
- **Non-Executable Stack (NX/DEP):** Đánh dấu vùng nhớ Stack chỉ được đọc/ghi, không được thực thi mã lệnh, ngăn chặn việc chạy shellcode lưu trên Stack.
- **ASLR (Address Space Layout Randomization):** Ngẫu nhiên hóa địa chỉ các vùng nhớ Stack, Heap, thư viện mỗi lần chạy chương trình, khiến hacker không thể đoán trước địa chỉ mã độc để nhảy tới.', 
    'core-theory', 
    '["Đoạn code C nguy hiểm: `void vuln() { char buf[64]; gets(buf); }` nếu nhập 80 ký tự sẽ đè lên Return Address.", "Kỹ thuật ROP (Return-Oriented Programming) dùng để vượt qua cơ chế phòng thủ NX bằng cách xâu chuỗi các đoạn code hợp lệ có sẵn trong bộ nhớ."]'::jsonb, 
    '["Tuyệt đối không sử dụng các hàm không an toàn như gets, strcpy, sprintf; hãy thay thế bằng fgets, strncpy, snprintf.", "Tấn công tràn bộ đệm là một trong những lỗ hổng bảo mật kinh điển và nguy hiểm nhất trong lịch sử máy tính.", "ASLR phối hợp chặt chẽ với phần cứng MMU để bảo vệ không gian địa chỉ ảo."]'::jsonb, 
    8, 
    TRUE,
    'system-security-io'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_sys_01', 'computer-arithmetic', 'lesson', 'Biểu diễn thông tin trong máy tính (Bù 2 & IEEE 754)', '{"lesson_id": "cs_sys_01"}'::jsonb, 10, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_02', 'processor-architecture', 'lesson', 'Kiến trúc Tập lệnh CPU (ISA) & Hợp ngữ Assembly', '{"lesson_id": "cs_sys_02"}'::jsonb, 10, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_03', 'processor-architecture', 'lesson', 'Cơ chế Biên dịch & Liên kết (Compilation & Linking)', '{"lesson_id": "cs_sys_03"}'::jsonb, 20, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_04', 'memory-subsystem', 'lesson', 'Hệ thống Bộ nhớ phân cấp & Nguyên lý cục bộ (Locality)', '{"lesson_id": "cs_sys_04"}'::jsonb, 10, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_05', 'memory-subsystem', 'lesson', 'Cơ chế Bộ nhớ đệm Cache (Direct-Mapped & Associative)', '{"lesson_id": "cs_sys_05"}'::jsonb, 20, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_06', 'memory-subsystem', 'lesson', 'Bộ nhớ ảo & Cơ chế dịch địa chỉ phân trang (Virtual Memory)', '{"lesson_id": "cs_sys_06"}'::jsonb, 30, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_07', 'processor-architecture', 'lesson', 'Chu kỳ lệnh & Kỹ thuật Đường ống (Pipelining)', '{"lesson_id": "cs_sys_07"}'::jsonb, 30, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_08', 'processor-architecture', 'lesson', 'Độc lập chỉ lệnh (ILP) & Superscalar CPU', '{"lesson_id": "cs_sys_08"}'::jsonb, 40, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_09', 'system-security-io', 'lesson', 'Giao tiếp ngoại vi qua cơ chế Ngắt & DMA', '{"lesson_id": "cs_sys_09"}'::jsonb, 10, 10, 20, 'cs_computer_systems', 13),
  ('act-lesson-cs_sys_10', 'system-security-io', 'lesson', 'Tấn công Tràn bộ đệm (Stack Buffer Overflow)', '{"lesson_id": "cs_sys_10"}'::jsonb, 20, 10, 20, 'cs_computer_systems', 13)
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
