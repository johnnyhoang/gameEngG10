-- SQL migration to seed 100 question bank for cs_computer_systems (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_computer_systems (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_computer_systems';

-- ======================================================================================
-- BÀI GIẢNG 1: Biểu diễn thông tin trong máy tính (cs_sys_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_001', 'mcq', 'computer-arithmetic',
    'Trong hệ số nguyên bù 2 (Two''s Complement) kích thước 8-bit, giá trị số nguyên `-1` được biểu diễn dưới dạng nhị phân như thế nào?',
    ARRAY['11111111', '10000001', '00000001', '11111110']::varchar[],
    ARRAY['11111111']::varchar[],
    'Số 1 là 00000001. Phép bù 1 đảo toàn bộ bit thành 11111110. Cộng thêm 1 thu được 11111111, biểu diễn cho số -1.',
    5, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_002', 'mcq', 'computer-arithmetic',
    'Tại sao máy tính lại ưu tiên sử dụng chuẩn bù 2 để biểu diễn số nguyên có dấu?',
    ARRAY['Vì phép cộng và trừ số nguyên có dấu có thể thực hiện trên cùng một mạch cộng phần cứng mà không cần phân biệt số âm/dương', 'Vì chuẩn bù 2 giúp tiết kiệm 50% dung lượng RAM lưu trữ', 'Vì chuẩn bù 2 chạy nhanh hơn hệ bù 1 gấp 10 lần', 'Vì nó tự động phát hiện mọi lỗi tràn số nguyên'],
    ARRAY['Vì phép cộng và trừ số nguyên có dấu có thể thực hiện trên cùng một mạch cộng phần cứng mà không cần phân biệt số âm/dương']::varchar[],
    'Nhờ chuẩn bù 2, phép toán trừ $A - B$ được máy tính xử lý trực tiếp bằng mạch cộng $A + (-B)$ cực kỳ đơn giản và tối ưu.',
    5, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_003', 'mcq', 'computer-arithmetic',
    'Theo chuẩn số thực dấu phẩy động IEEE 754 đơn (32-bit), cấu trúc các bit được phân bổ thế nào từ trái qua phải?',
    ARRAY['1 bit dấu (Sign), 8 bit mũ (Exponent), 23 bit định trị (Fraction)', '1 bit dấu, 11 bit mũ, 52 bit định trị', '8 bit dấu, 8 bit mũ, 16 bit định trị', '1 bit dấu, 15 bit mũ, 16 bit định trị'],
    ARRAY['1 bit dấu (Sign), 8 bit mũ (Exponent), 23 bit định trị (Fraction)']::varchar[],
    'IEEE 754 đơn sử dụng 32 bit: 1 bit dấu, 8 bit mũ lệch (bias = 127) và 23 bit fraction lưu mantissa.',
    6, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_004', 'mcq', 'computer-arithmetic',
    'Kích thước dải giá trị số nguyên có dấu N-bit biểu diễn bằng chuẩn bù 2 được giới hạn trong khoảng nào?',
    ARRAY['-2^(N-1) đến 2^(N-1) - 1', '-2^(N-1) - 1 đến 2^(N-1)', '-2^N đến 2^N - 1', '0 đến 2^N - 1'],
    ARRAY['-2^(N-1) đến 2^(N-1) - 1']::varchar[],
    'Ví dụ với 8-bit, dải giá trị là $-2^7$ đến $2^7 - 1$, tương ứng $-128$ đến $127$.',
    5, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_005', 'mcq', 'computer-arithmetic',
    'Phần mũ lệch (bias exponent) trong chuẩn IEEE 754 32-bit có giá trị hằng số lệch (bias) là bao nhiêu?',
    ARRAY['127', '1023', '128', '255'],
    ARRAY['127']::varchar[],
    'IEEE 754 32-bit dùng bias = 127 để ánh xạ dải số mũ thực tế $[-126, 127]$ thành số không âm $[1, 254]$ lưu trên RAM.',
    6, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_006', 'mcq', 'computer-arithmetic',
    'Hiện tượng tràn số nguyên dương (Arithmetic Overflow) xảy ra trong hệ bù 2 khi nào?',
    ARRAY['Khi cộng hai số dương thu được kết quả có bit dấu bằng 1 (số âm)', 'Khi cộng một số dương và một số âm', 'Khi chia một số nguyên cho 0', 'Khi giá trị số thực vượt quá chuẩn IEEE 754'],
    ARRAY['Khi cộng hai số dương thu được kết quả có bit dấu bằng 1 (số âm)']::varchar[],
    'Khi kết quả vượt quá giới hạn cực đại $2^{N-1}-1$, bit nhớ tràn sang MSB (bit dấu) biến kết quả thành số âm, báo hiệu tràn số.',
    6, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_007', 'mcq', 'computer-arithmetic',
    'Tại sao biểu thức toán học `0.1 + 0.2 === 0.3` trong nhiều ngôn ngữ lập trình lại trả về giá trị false?',
    ARRAY['Vì 0.1 và 0.2 là các số thập phân tuần hoàn vô hạn ở hệ nhị phân, gây ra sai số làm tròn khi biểu diễn bằng chuẩn IEEE 754', 'Vì trình biên dịch tự động ép kiểu sang string', 'Vì CPU không thực hiện được phép cộng số thực', 'Do lỗi phần cứng của dòng CPU Intel'],
    ARRAY['Vì 0.1 và 0.2 là các số thập phân tuần hoàn vô hạn ở hệ nhị phân, gây ra sai số làm tròn khi biểu diễn bằng chuẩn IEEE 754']::varchar[],
    'Trong hệ nhị phân, 0.1 được lưu dạng tuần hoàn: $0.00011001100..._2$. Khi cắt ngắn về 23 hoặc 52 bit, sai số làm tròn xuất hiện làm tổng thực tế hơi lớn hơn 0.3.',
    6, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_008', 'mcq', 'computer-arithmetic',
    'Số thực đặc biệt `NaN` (Not a Number) trong chuẩn IEEE 754 được đại diện bằng trạng thái bit nào?',
    ARRAY['Tất cả các bit của phần mũ là 1, và phần định trị khác 0', 'Tất cả các bit của phần mũ là 0, và phần định trị bằng 0', 'Bit dấu bằng 1, và phần mũ bằng 0', 'Tất cả các bit trên mảng đều bằng 1'],
    ARRAY['Tất cả các bit của phần mũ là 1, và phần định trị khác 0']::varchar[],
    'Chuẩn IEEE 754 quy định phần mũ toàn 1 biểu thị vô cùng (nếu định trị bằng 0) hoặc NaN (nếu định trị khác 0).',
    7, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_009', 'short-answer', 'computer-arithmetic',
    'Điền giá trị thập phân của số nhị phân 8-bit bù 2 sau: `11111110`.',
    NULL,
    ARRAY['-2']::varchar[],
    'Đảo bit của 11111110 thành 00000001, cộng 1 thành 00000010 (số 2). Nên giá trị là -2.',
    5, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  ),
  (
    'cs_sys_q_010', 'short-answer', 'computer-arithmetic',
    'Điền tên viết tắt của tổ chức thiết kế ra chuẩn số thực dấu phẩy động phổ biến nhất hiện nay trên máy tính. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IEEE']::varchar[],
    'IEEE (Institute of Electrical and Electronics Engineers) ban hành chuẩn IEEE 754.',
    5, 'Computer Arithmetic', 'cs_computer_systems', 13, 'cs_sys_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Kiến trúc Tập lệnh CPU (ISA) & Hợp ngữ Assembly (cs_sys_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_011', 'mcq', 'processor-architecture',
    'Đặc trưng cốt lõi của kiến trúc tập lệnh RISC (Reduced Instruction Set Computer) so với CISC là gì?',
    ARRAY['Lệnh có kích thước cố định, đơn giản, chỉ tương tác với bộ nhớ qua lệnh Load/Store và thực thi toán học trên thanh ghi', 'CPU hỗ trợ các lệnh phức tạp đọc và ghi RAM trực tiếp ở một lệnh duy nhất', 'Hỗ trợ nhiều kiểu đánh địa chỉ bộ nhớ phức tạp', 'Không cần sử dụng đến các thanh ghi bên trong CPU'],
    ARRAY['Lệnh có kích thước cố định, đơn giản, chỉ tương tác với bộ nhớ qua lệnh Load/Store và thực thi toán học trên thanh ghi']::varchar[],
    'RISC sử dụng kiến trúc Load-Store giúp đơn giản hoá bộ giải mã lệnh của CPU, tăng hiệu suất chạy pipelining.',
    6, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_012', 'mcq', 'processor-architecture',
    'Thanh ghi Program Counter (PC) trong CPU đóng vai trò gì?',
    ARRAY['Lưu trữ địa chỉ của chỉ lệnh tiếp theo chuẩn bị thực thi', 'Đếm số lượng phần tử của mảng vòng tròn', 'Lưu trữ kết quả của phép toán ALU gần nhất', 'Đếm tần số xung nhịp hoạt động của CPU'],
    ARRAY['Lưu trữ địa chỉ của chỉ lệnh tiếp theo chuẩn bị thực thi']::varchar[],
    'PC điều phối luồng thực thi của chương trình. Sau mỗi lệnh, PC tự động tăng để trỏ tới chỉ lệnh kế tiếp.',
    5, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_013', 'mcq', 'processor-architecture',
    'Thanh ghi Stack Pointer (SP) được dùng để làm gì trong hệ thống máy tính?',
    ARRAY['Lưu trữ địa chỉ đỉnh của vùng nhớ Stack hiện tại', 'Lưu trữ số lượng biến static của tiến trình', 'Đánh dấu điểm bắt đầu của mã nguồn chương trình', 'Trỏ tới địa chỉ của bảng trang phân trang'],
    ARRAY['Lưu trữ địa chỉ đỉnh của vùng nhớ Stack hiện tại']::varchar[],
    'SP thay đổi giá trị khi ta thực hiện push/pop hoặc cấp phát biến cục bộ trên Stack.',
    5, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_014', 'mcq', 'processor-architecture',
    'Trong RISC-V, tập lệnh "Load-Store Architecture" quy định điều gì?',
    ARRAY['Các phép toán số học chỉ được thực thi trên các giá trị nằm trong thanh ghi; việc đọc/ghi RAM bắt buộc phải qua lệnh lw/sw chuyên biệt', 'Cho phép tính toán trực tiếp giữa ô nhớ RAM và thanh ghi', 'Tự động sao lưu dữ liệu vào SSD', 'CPU không được phép truy xuất RAM'],
    ARRAY['Các phép toán số học chỉ được thực thi trên các giá trị nằm trong thanh ghi; việc đọc/ghi RAM bắt buộc phải qua lệnh lw/sw chuyên biệt']::varchar[],
    'Kiến trúc Load-Store phân tách độc lập việc truy cập bộ nhớ và tính toán, giúp tối ưu hóa luồng Pipelining.',
    6, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_015', 'mcq', 'processor-architecture',
    'Sự khác biệt về kích thước chỉ thị lệnh giữa kiến trúc Intel x86 (CISC) và ARM/RISC-V là gì?',
    ARRAY['Intel x86 có kích thước lệnh thay đổi (1 đến 15 bytes); ARM/RISC-V có kích thước lệnh cố định (thường là 32-bit)', 'ARM có kích thước lệnh thay đổi lớn hơn x86', 'Cả hai đều có kích thước lệnh cố định là 64-bit', 'x86 chỉ sử dụng các lệnh 8-bit đơn giản'],
    ARRAY['Intel x86 có kích thước lệnh thay đổi (1 đến 15 bytes); ARM/RISC-V có kích thước lệnh cố định (thường là 32-bit)']::varchar[],
    'Đặc trưng CISC có chiều dài lệnh thay đổi làm bộ giải mã lệnh của x86 rất cồng kềnh. RISC lệnh cố định giúp giải mã lệnh cực nhanh và đồng bộ.',
    6, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_016', 'mcq', 'processor-architecture',
    'Chỉ thị Assembly nào sau đây dùng để thực hiện phép nhảy không điều kiện đến một nhãn địa chỉ khác?',
    ARRAY['JMP / J', 'BEQ', 'MOV', 'ADD']::varchar[],
    ARRAY['JMP / J']::varchar[],
    'Lệnh J (Jump) hoặc JMP cập nhật trực tiếp địa chỉ mới vào thanh ghi PC không cần kiểm tra điều kiện.',
    5, 'Assembly Programming', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_017', 'mcq', 'processor-architecture',
    'Mục tiêu của việc lưu trữ các tham số truyền vào hàm trong thanh ghi (ví dụ a0-a7 trong RISC-V) thay vì đẩy vào Stack là gì?',
    ARRAY['Để tối ưu hóa hiệu năng, giảm thiểu tối đa các thao tác đọc/ghi bộ nhớ RAM chậm chạp', 'Để bảo mật tham số không bị hacker đọc trộm', 'Vì bộ nhớ Stack không hỗ trợ lưu trữ số thực', 'Để tự động ép kiểu dữ liệu của tham số'],
    ARRAY['Để tối ưu hóa hiệu năng, giảm thiểu tối đa các thao tác đọc/ghi bộ nhớ RAM chậm chạp']::varchar[],
    'Truy cập RAM chậm hơn thanh ghi hàng chục lần. Truyền tham số qua thanh ghi giúp hàm thực thi nhanh chóng không bị nghẽn RAM.',
    6, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_018', 'mcq', 'processor-architecture',
    'Chỉ thị Assembly RISC-V sau: `lw t0, 4(sp)` thực hiện hành động nào?',
    ARRAY['Nạp giá trị từ ô nhớ RAM có địa chỉ sp + 4 lưu vào thanh ghi t0', 'Ghi giá trị từ thanh ghi t0 vào RAM tại địa chỉ sp + 4', 'Cộng giá trị sp và 4 rồi gán cho t0', 'Dịch chuyển stack pointer sp lên 4 đơn vị'],
    ARRAY['Nạp giá trị từ ô nhớ RAM có địa chỉ sp + 4 lưu vào thanh ghi t0']::varchar[],
    '`lw` (Load Word) nạp 32-bit từ bộ nhớ RAM vào thanh ghi. Cú pháp `4(sp)` đại diện cho chế độ đánh địa chỉ lệch (offset = 4).',
    6, 'Assembly Programming', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_019', 'short-answer', 'processor-architecture',
    'Điền tên viết tắt của thanh ghi chứa địa chỉ của chỉ lệnh tiếp theo chuẩn bị thực thi. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['PC']::varchar[],
    'PC là Program Counter.',
    5, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  ),
  (
    'cs_sys_q_020', 'short-answer', 'processor-architecture',
    'Điền tên viết tắt của kiến trúc máy tính tập lệnh phức tạp có chiều dài lệnh thay đổi (như Intel x86). (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CISC']::varchar[],
    'CISC là Complex Instruction Set Computer.',
    5, 'Processor Architecture', 'cs_computer_systems', 13, 'cs_sys_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Cơ chế biên dịch và liên kết (cs_sys_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_021', 'mcq', 'processor-architecture',
    'Giai đoạn "Tiền xử lý" (Preprocessing) trong biên dịch GCC thực hiện hành động nào?',
    ARRAY['Xử lý các chỉ thị macro bắt đầu bằng dấu # (như #include, #define) và chèn code header file vào', 'Phân tích cú pháp và kiểm tra lỗi kiểu dữ liệu của mã nguồn', 'Dịch trực tiếp mã nguồn thành object code nhị phân', 'Liên kết các file object lại với nhau'],
    ARRAY['Xử lý các chỉ thị macro bắt đầu bằng dấu # (như #include, #define) và chèn code header file vào']::varchar[],
    'Tiền xử lý thực hiện thay thế chuỗi macro và gộp file thuần tuý, tạo ra mã nguồn sạch trước khi phân tích cú pháp.',
    5, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_022', 'mcq', 'processor-architecture',
    'Sản phẩm đầu ra của giai đoạn "Biên dịch" (Compilation - từ file .i sang .s) là gì?',
    ARRAY['Mã hợp ngữ Assembly của chương trình', 'File thực thi nhị phân hoàn chỉnh', 'Mã máy thô Object code', 'Mã nguồn đã tối ưu cấu trúc vòng lặp'],
    ARRAY['Mã hợp ngữ Assembly của chương trình']::varchar[],
    'Giai đoạn compile dịch mã nguồn C/C++ thành file hợp ngữ chứa các lệnh gợi nhớ dạng text (.s).',
    5, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_023', 'mcq', 'processor-architecture',
    'Vai trò cốt lõi của giai đoạn "Liên kết" (Linking) là gì?',
    ARRAY['Gom các file object và thư viện lại, phân giải các tham chiếu địa chỉ hàm chéo để tạo ra file chạy cuối cùng', 'Dịch file assembly thành file object nhị phân', 'Kiểm tra lỗi logic của chương trình', 'Nạp chương trình vào bộ nhớ RAM vật lý'],
    ARRAY['Gom các file object và thư viện lại, phân giải các tham chiếu địa chỉ hàm chéo để tạo ra file chạy cuối cùng']::varchar[],
    'Linker tìm kiếm địa chỉ của các hàm được khai báo ngoài file hiện tại (ví dụ printf từ thư viện stdio) và kết nối chúng lại.',
    6, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_024', 'mcq', 'processor-architecture',
    'Ưu điểm lớn nhất của Liên kết Động (Dynamic Linking - DLL/SO) so với Liên kết Tĩnh (Static Linking) là gì?',
    ARRAY['Tiết kiệm bộ nhớ RAM và ổ cứng nhờ chia sẻ chung một tệp thư viện cho nhiều tiến trình; dễ vá lỗi thư viện mà không cần biên dịch lại ứng dụng', 'Làm ứng dụng khởi động nhanh hơn gấp nhiều lần', 'Đảm bảo ứng dụng chạy độc lập không phụ thuộc môi trường', 'Tự động kiểm tra lỗ hổng tràn stack'],
    ARRAY['Tiết kiệm bộ nhớ RAM và ổ cứng nhờ chia sẻ chung một tệp thư viện cho nhiều tiến trình; dễ vá lỗi thư viện mà không cần biên dịch lại ứng dụng']::varchar[],
    'DLL/SO chỉ nạp 1 lần vào RAM. Khi thư viện có bản vá, ta chỉ cần thay thế file dll/so đó mà không phải compile lại toàn bộ project.',
    6, 'Linking Mechanisms', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_025', 'mcq', 'processor-architecture',
    'Nhược điểm lớn nhất của Liên kết Tĩnh (Static Linking) là gì?',
    ARRAY['Làm file thực thi phình to dung lượng và khó cập nhật khi thư viện nền tảng có lỗi bảo mật', 'Làm chậm tốc độ chạy thực tế của CPU', 'Yêu cầu hệ điều hành phải nạp thư viện tĩnh lúc runtime', 'Không chạy được trên hệ điều hành 64-bit'],
    ARRAY['Làm file thực thi phình to dung lượng và khó cập nhật khi thư viện nền tảng có lỗi bảo mật']::varchar[],
    'Do copy toàn bộ code thư viện vào exe, file chạy rất nặng và khi thư viện sửa lỗi ta bắt buộc phải liên kết (link) lại.',
    5, 'Linking Mechanisms', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_026', 'mcq', 'processor-architecture',
    'Lỗi Linker nào sau đây thường gặp nhất khi lập trình C/C++?',
    ARRAY['Undefined reference to function (Không tìm thấy triển khai của hàm)', 'Syntax error (Lỗi cú pháp)', 'NullPointerException (Truy cập con trỏ null)', 'Division by zero (Chia cho 0)'],
    ARRAY['Undefined reference to function (Không tìm thấy triển khai của hàm)']::varchar[],
    'Lỗi "Undefined reference" xảy ra ở bước Linker khi ta gọi hàm đã khai báo nhưng Linker không tìm thấy file object chứa mã máy của hàm đó.',
    5, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_027', 'mcq', 'processor-architecture',
    'Giai đoạn "Lắp ráp" (Assembly - từ file .s sang .o) thực hiện việc dịch mã như thế nào?',
    ARRAY['Chuyển mã hợp ngữ Assembly thành mã máy nhị phân thô (Object code)', 'Chuyển mã nguồn C sang Assembly', 'Liên kết các file object lại', 'Tối ưu hoá các vòng lặp trong code'],
    ARRAY['Chuyển mã hợp ngữ Assembly thành mã máy nhị phân thô (Object code)']::varchar[],
    'Lắp ráp (Assembler) chuyển đổi các từ gợi nhớ assembly trực tiếp thành các mã opcode nhị phân tương ứng của CPU.',
    5, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_028', 'mcq', 'processor-architecture',
    'Tệp tin Object (.o / .obj) chứa thông tin gì bên trong?',
    ARRAY['Mã máy nhị phân thô chưa được phân giải địa chỉ hàm liên kết và bảng ký hiệu (symbol table)', 'Mã nguồn C ban đầu', 'Mã assembly dạng text', 'File thực thi chạy được trực tiếp trên OS'],
    ARRAY['Mã máy nhị phân thô chưa được phân giải địa chỉ hàm liên kết và bảng ký hiệu (symbol table)']::varchar[],
    'File object chứa mã máy của riêng file source đó, địa chỉ các hàm ngoại vi vẫn là trống để chờ Linker điền vào.',
    6, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_029', 'short-answer', 'processor-architecture',
    'Điền đuôi tệp tin (extension) của thư viện liên kết động trong hệ điều hành Windows. (Viết thường có dấu chấm ở đầu)',
    NULL,
    ARRAY['.dll']::varchar[],
    '.dll đại diện cho Dynamic Link Library.',
    5, 'Linking Mechanisms', 'cs_computer_systems', 13, 'cs_sys_03'
  ),
  (
    'cs_sys_q_030', 'short-answer', 'processor-architecture',
    'Điền tên tiếng Anh của bảng chứa danh sách tên biến, tên hàm cùng địa chỉ tương ứng được Linker sử dụng để phân giải tham chiếu địa chỉ. (Viết thường)',
    NULL,
    ARRAY['symbol table', 'bảng ký hiệu']::varchar[],
    'Symbol Table lưu thông tin ánh xạ tên và địa chỉ hàm phục vụ liên kết.',
    6, 'Compilation Toolchain', 'cs_computer_systems', 13, 'cs_sys_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Hệ thống bộ nhớ phân cấp (cs_sys_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_031', 'mcq', 'memory-subsystem',
    'Mục tiêu lớn nhất của việc thiết kế Hệ thống bộ nhớ phân cấp (Memory Hierarchy) trong máy tính là gì?',
    ARRAY['Để đạt được tốc độ truy cập bộ nhớ gần bằng tốc độ của thanh ghi với mức chi phí trên mỗi byte gần bằng giá thành của ổ đĩa cứng', 'Để giảm lượng điện năng tiêu thụ của RAM', 'Để bảo mật dữ liệu không bị xoá khi mất điện', 'Để CPU không cần giao tiếp trực tiếp với RAM'],
    ARRAY['Để đạt được tốc độ truy cập bộ nhớ gần bằng tốc độ của thanh ghi với mức chi phí trên mỗi byte gần bằng giá thành của ổ đĩa cứng']::varchar[],
    'Thiết kế phân cấp tận dụng nguyên lý Locality để lưu các dữ liệu nóng lên Cache nhỏ/nhanh, dữ liệu nguội ở RAM/Disk to/rẻ, tối ưu hóa P/P (Price/Performance).',
    6, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_032', 'mcq', 'memory-subsystem',
    'Nguyên lý "Cục bộ thời gian" (Temporal Locality) phát biểu điều gì?',
    ARRAY['Một ô nhớ vừa được truy cập có khả năng cao sẽ được chương trình truy cập lại trong tương lai gần', 'Các ô nhớ nằm kề nhau trong bộ nhớ sẽ được truy cập liên tiếp nhau', 'Thời gian đọc dữ liệu từ RAM luôn bằng hằng số', 'CPU tự động xoá dữ liệu cũ sau 5 giây'],
    ARRAY['Một ô nhớ vừa được truy cập có khả năng cao sẽ được chương trình truy cập lại trong tương lai gần']::varchar[],
    'Ví dụ: biến đếm `i` hoặc tổng tích lũy `sum` trong vòng lặp được đọc ghi liên tục mỗi chu kỳ.',
    5, 'Locality Principles', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_033', 'mcq', 'memory-subsystem',
    'Nguyên lý "Cục bộ không gian" (Spatial Locality) phát biểu điều gì?',
    ARRAY['Nếu một ô nhớ được truy cập, các ô nhớ nằm gần kề nó vật lý có xu hướng sẽ được truy cập tiếp theo trong tương lai gần', 'Vùng nhớ của tiến trình được mở rộng không giới hạn', 'CPU chỉ truy xuất bộ nhớ khi rảnh rỗi', 'Bộ nhớ đệm tự động đồng bộ hóa trên đám mây'],
    ARRAY['If một ô nhớ được truy cập, các ô nhớ nằm gần kề nó vật lý có xu hướng sẽ được truy cập tiếp theo trong tương lai gần', 'Nếu một ô nhớ được truy cập, các ô nhớ nằm gần kề nó vật lý có xu hướng sẽ được truy cập tiếp theo trong tương lai gần']::varchar[],
    'Ví dụ tiêu biểu là duyệt tuần tự qua mảng 1 chiều, CPU nạp cả block mảng lên Cache giúp các phần tử tiếp theo được truy xuất ngay lập tức.',
    5, 'Locality Principles', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_034', 'mcq', 'memory-subsystem',
    'Trong phân cấp bộ nhớ, bộ nhớ nào có tốc độ truy cập nhanh nhất nhưng dung lượng nhỏ nhất?',
    ARRAY['Thanh ghi (Registers)', 'Bộ nhớ Cache L1', 'Bộ nhớ chính RAM', 'Ổ đĩa cứng SSD'],
    ARRAY['Thanh ghi (Registers)']::varchar[],
    'Thanh ghi nằm ngay trong lõi CPU, giao tiếp trực tiếp chỉ mất dưới 1 chu kỳ máy ($< 1$ ns).',
    5, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_035', 'mcq', 'memory-subsystem',
    'Tại sao việc duyệt mảng 2 chiều theo cột: `for (j) for (i) sum += arr[i][j]` (trong C/C++) lại có hiệu năng chạy rất tệ?',
    ARRAY['Vì các phần tử kế tiếp của cột nằm cách xa nhau trong bộ nhớ RAM, phá vỡ Spatial Locality và gây trượt Cache (Cache Miss) liên tục', 'Vì vòng lặp lồng nhau chạy không song song', 'Vì compiler không tối ưu được chỉ số cột', 'Vì mảng 2 chiều bắt buộc phải duyệt theo hàng'],
    ARRAY['Vì các phần tử kế tiếp của cột nằm cách xa nhau trong bộ nhớ RAM, phá vỡ Spatial Locality và gây trượt Cache (Cache Miss) liên tục']::varchar[],
    'Ngôn ngữ C lưu mảng 2 chiều dạng Row-major (theo hàng liên tục). Duyệt theo cột làm CPU nhảy cách quãng ô nhớ, trượt cache liên tiếp bắt RAM nạp block nhớ mới liên tục.',
    7, 'Locality Principles', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_036', 'mcq', 'memory-subsystem',
    'Khái niệm "Cache Line" (Dòng cache - thường có kích thước 64 bytes) đại diện cho điều gì?',
    ARRAY['Đơn vị khối nhớ cơ bản được nạp đồng thời từ RAM lên Cache khi có yêu cầu đọc dữ liệu', 'Một dòng lệnh Assembly duy nhất', 'Số lượng bit dấu trong chuẩn số thực', 'Chiều rộng của bus truyền dữ liệu RAM'],
    ARRAY['Đơn vị khối nhớ cơ bản được nạp đồng thời từ RAM lên Cache khi có yêu cầu đọc dữ liệu']::varchar[],
    'Để tận dụng Spatial Locality, CPU nạp cả một khối nhớ 64 byte kề nhau chứ không chỉ nạp byte đơn lẻ được yêu cầu.',
    6, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_037', 'mcq', 'memory-subsystem',
    'Điều gì xảy ra khi CPU yêu cầu một dữ liệu nhưng dữ liệu đó không nằm trong bộ nhớ Cache (Cache Miss)?',
    ARRAY['CPU bị nghẽn và phải đợi bộ điều khiển bộ nhớ nạp khối dữ liệu chứa byte đó từ RAM lên Cache (CPU Stall)', 'Hệ điều hành tắt ứng dụng lập tức', 'Dữ liệu được trả về giá trị mặc định là 0', 'CPU tự động nhảy sang chạy luồng đệ quy'],
    ARRAY['CPU bị nghẽn và phải đợi bộ điều khiển bộ nhớ nạp khối dữ liệu chứa byte đó từ RAM lên Cache (CPU Stall)']::varchar[],
    'Cache Miss bắt CPU chịu độ trễ (latency penalty) hàng trăm chu kỳ xung nhịp để đợi RAM nạp dữ liệu lên.',
    6, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_038', 'mcq', 'memory-subsystem',
    'Bộ nhớ đệm L1 Cache thường được chia thành 2 phần độc lập là L1i và L1d nhằm mục đích gì?',
    ARRAY['Để nạp song song chỉ thị lệnh (L1i) và dữ liệu tính toán (L1d) đồng thời, tránh xung đột tài nguyên phần cứng', 'Để tăng gấp đôi dung lượng bộ nhớ Cache', 'Để lưu số thực và số nguyên riêng biệt', 'Để hỗ trợ liên kết động'],
    ARRAY['Để nạp song song chỉ thị lệnh (L1i) và dữ liệu tính toán (L1d) đồng thời, tránh xung đột tài nguyên phần cứng']::varchar[],
    'Phân tách L1i và L1d giúp CPU thực hiện bước Fetch lệnh và Memory đọc/ghi dữ liệu trong cùng một chu kỳ máy mà không bị Structural Hazard.',
    7, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_039', 'short-answer', 'memory-subsystem',
    'Điền tên tiếng Anh của nguyên lý quy định chương trình có xu hướng sử dụng lại dữ liệu và ô nhớ kề nhau. (Viết thường)',
    NULL,
    ARRAY['locality', 'cục bộ']::varchar[],
    'Locality là nguyên lý nền tảng của bộ nhớ đệm Cache.',
    5, 'Locality Principles', 'cs_computer_systems', 13, 'cs_sys_04'
  ),
  (
    'cs_sys_q_040', 'short-answer', 'memory-subsystem',
    'Điền tên loại bộ nhớ đệm tốc độ cao tích hợp trực tiếp trong chip CPU nằm giữa thanh ghi và RAM. (Viết thường)',
    NULL,
    ARRAY['cache', 'bộ nhớ đệm']::varchar[],
    'Cache lưu trữ dữ liệu tạm thời phục vụ CPU xử lý cực nhanh.',
    5, 'Memory Hierarchy', 'cs_computer_systems', 13, 'cs_sys_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Cơ chế hoạt động của bộ nhớ Cache (cs_sys_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_041', 'mcq', 'memory-subsystem',
    'Trong Direct-Mapped Cache (Ánh xạ trực tiếp), làm thế nào để xác định dòng cache tương ứng cho một địa chỉ RAM?',
    ARRAY['Sử dụng phép chia lấy dư: index = Địa chỉ khối % Số dòng cache', 'Tìm kiếm tuần tự từ đầu đến cuối cache', 'Dùng hàm băm ngẫu nhiên', 'Nạp vào dòng cache bất kỳ đang trống'],
    ARRAY['Sử dụng phép chia lấy dư: index = Địa chỉ khối % Số dòng cache']::varchar[],
    'Mỗi khối nhớ RAM chỉ có duy nhất một địa chỉ index tương ứng trên cache, tính bằng phép toán modulo số dòng cache.',
    5, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_042', 'mcq', 'memory-subsystem',
    'Nhược điểm lớn nhất của bộ nhớ đệm ánh xạ trực tiếp (Direct-Mapped Cache) là gì?',
    ARRAY['Dễ bị trượt cache do tranh chấp (Conflict Miss) khi hai vùng nhớ RAM cần dùng liên tục cùng ánh xạ vào một dòng cache', 'Mạch thiết kế so sánh Tag quá phức tạp', 'Tốn nhiều điện năng hơn Set-Associative', 'Tốc độ truy xuất chậm hơn RAM'],
    ARRAY['Dễ bị trượt cache do tranh chấp (Conflict Miss) khi hai vùng nhớ RAM cần dùng liên tục cùng ánh xạ vào một dòng cache']::varchar[],
    'Chỉ cần hai khối RAM cách nhau đúng bội số kích thước cache, chúng sẽ liên tục đè lên nhau (thrashing), làm giảm hiệu năng thảm hại.',
    6, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_043', 'mcq', 'memory-subsystem',
    'Cơ chế Set-Associative Cache (Liên kết tập hợp) giải quyết bài toán tranh chấp dòng cache thế nào?',
    ARRAY['Chia cache thành các set, cho phép khối nhớ RAM ánh xạ vào set tương ứng và nằm ở dòng bất kỳ trong set đó', 'Loại bỏ hoàn toàn trường Tag', 'Tăng tốc độ truyền tải bus dữ liệu', 'Chuyển toàn bộ dữ liệu lên ổ đĩa cứng'],
    ARRAY['Chia cache thành các set, cho phép khối nhớ RAM ánh xạ vào set tương ứng và nằm ở dòng bất kỳ trong set đó']::varchar[],
    'Ví dụ ở 4-way Set-Associative, mỗi set có 4 dòng. Một khối RAM có thể nằm ở 1 trong 4 dòng trống của set đó, giảm thiểu tối đa conflict.',
    6, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_044', 'mcq', 'memory-subsystem',
    'Trường "Valid Bit" trong dòng Cache dùng để làm gì?',
    ARRAY['Đánh dấu dữ liệu trong dòng cache là hợp lệ hay chứa thông tin rác lúc khởi động hệ thống', 'Đếm số lần CPU truy cập dòng cache đó', 'Xác định quyền ghi đè của dòng cache', 'Kiểm tra lỗi chẵn lẻ (Parity check)'],
    ARRAY['Đánh dấu dữ liệu trong dòng cache là hợp lệ hay chứa thông tin rác lúc khởi động hệ thống']::varchar[],
    'Khi khởi động, Valid bit = 0. Khi dữ liệu được nạp từ RAM vào dòng cache, Valid bit được set thành 1.',
    5, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_045', 'mcq', 'memory-subsystem',
    'Tại sao Set-Associative Cache tốn nhiều điện năng và không gian bán dẫn hơn Direct-Mapped Cache?',
    ARRAY['Vì phần cứng MMU phải so sánh song song Tag của tất cả các dòng trong một set đồng thời để tìm dữ liệu khớp', 'Vì Set-Associative có kích thước cache line lớn hơn', 'Vì nó sử dụng các chip RAM động DRAM chậm chạp', 'Vì nó bắt buộc phải chạy đa luồng'],
    ARRAY['Vì phần cứng MMU phải so sánh song song Tag của tất cả các dòng trong một set đồng thời để tìm dữ liệu khớp']::varchar[],
    'Để biết dữ liệu nằm ở dòng nào trong set, mạch phần cứng phải so sánh song song toàn bộ Tag của set đó chỉ trong 1 chu kỳ máy.',
    7, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_046', 'mcq', 'memory-subsystem',
    'Thuật toán LRU (Least Recently Used) được dùng để làm gì khi quản lý Cache?',
    ARRAY['Chọn dòng cache làm nạn nhân bị ghi đè dựa trên tiêu chí: dòng nào lâu nhất chưa được CPU truy cập', 'Chọn ngẫu nhiên một dòng để ghi đè', 'Tìm kiếm dòng cache trống nhanh nhất', 'Tự động đồng bộ dữ liệu về RAM chính'],
    ARRAY['Chọn dòng cache làm nạn nhân bị ghi đè dựa trên tiêu chí: dòng nào lâu nhất chưa được CPU truy cập']::varchar[],
    'LRU hoạt động theo nguyên lý Temporal Locality, giả định dữ liệu lâu không dùng sẽ ít có khả năng dùng lại nhất.',
    6, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_047', 'mcq', 'memory-subsystem',
    'Loại trượt cache "Capacity Miss" xảy ra khi nào?',
    ARRAY['Khi dung lượng của toàn bộ bộ nhớ Cache quá nhỏ để chứa hết tập dữ liệu làm việc hoạt động của chương trình', 'Khi hai khối nhớ RAM tranh chấp một index', 'Khi lần đầu tiên chương trình đọc dữ liệu', 'Khi nguồn điện cấp cho CPU bị sụt giảm'],
    ARRAY['Khi dung lượng của toàn bộ bộ nhớ Cache quá nhỏ để chứa hết tập dữ liệu làm việc hoạt động của chương trình']::varchar[],
    'Capacity Miss xảy ra bất kể thiết kế ánh xạ nào, khắc phục bằng cách nâng cấp CPU có Cache lớn hơn hoặc tối ưu thuật toán giảm tập dữ liệu làm việc (Working set).',
    6, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_048', 'mcq', 'memory-subsystem',
    'Chiến lược ghi cache "Write-Through" hoạt động như thế nào?',
    ARRAY['Mỗi khi CPU sửa đổi dữ liệu trên Cache, dữ liệu mới lập tức được ghi đồng thời xuống bộ nhớ RAM chính', 'Dữ liệu chỉ được sửa trên cache và chỉ ghi xuống RAM khi dòng cache bị thay thế', 'CPU bỏ qua không lưu dữ liệu trên cache', 'Dữ liệu được ghi thẳng xuống ổ đĩa cứng'],
    ARRAY['Mỗi khi CPU sửa đổi dữ liệu trên Cache, dữ liệu mới lập tức được ghi đồng thời xuống bộ nhớ RAM chính']::varchar[],
    'Write-Through đơn giản, đảm bảo RAM luôn chứa dữ liệu mới nhất nhưng nhược điểm là tốc độ ghi bị nghẽn do RAM chạy chậm.',
    7, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_049', 'short-answer', 'memory-subsystem',
    'Điền tên viết tắt của thuật toán thay thế dòng cache lâu nhất chưa được truy cập. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['LRU']::varchar[],
    'LRU là Least Recently Used.',
    5, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  ),
  (
    'cs_sys_q_050', 'short-answer', 'memory-subsystem',
    'Điền tên loại trượt cache xảy ra ở lần đầu tiên chương trình truy cập vùng nhớ đó. (Tiếng Anh viết thường hoặc Tiếng Việt)',
    NULL,
    ARRAY['cold miss', 'compulsory miss', 'trượt lạnh']::varchar[],
    'Cold Miss là điều bắt buộc phải xảy ra khi khởi động nạp dữ liệu.',
    5, 'Cache Mechanics', 'cs_computer_systems', 13, 'cs_sys_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Bộ nhớ ảo & Phân trang (cs_sys_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_051', 'mcq', 'memory-subsystem',
    'Địa chỉ ảo (Virtual Address) được dịch sang Địa chỉ vật lý (Physical Address) nhờ bộ phận phần cứng nào?',
    ARRAY['MMU (Memory Management Unit)', 'ALU (Arithmetic Logic Unit)', 'Bộ điều khiển DMA', 'Thanh ghi PC'],
    ARRAY['MMU (Memory Management Unit)']::varchar[],
    'MMU là bộ quản lý bộ nhớ phần cứng nằm trong CPU, chịu trách nhiệm dịch địa chỉ ảo sang vật lý khi thực thi lệnh.',
    5, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_052', 'mcq', 'memory-subsystem',
    'Cấu trúc dữ liệu "Page Table" (Bảng trang) được lưu trữ ở đâu trong hệ thống?',
    ARRAY['Trong bộ nhớ chính RAM', 'Trong các thanh ghi của CPU', 'Trong L1 Cache', 'Trên ổ đĩa cứng'],
    ARRAY['Trong bộ nhớ chính RAM']::varchar[],
    'Page Table lưu trữ trong RAM. CPU duy trì thanh ghi trỏ tới địa chỉ gốc của bảng trang trong RAM.',
    5, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_053', 'mcq', 'memory-subsystem',
    'Bộ đệm TLB (Translation Lookaside Buffer) đóng vai trò gì trong dịch địa chỉ?',
    ARRAY['Lưu trữ các cặp dịch địa chỉ ảo-vật lý vừa thực hiện gần đây ngay trong MMU để CPU không cần tốn thời gian đọc bảng trang trong RAM', 'Lưu trữ dữ liệu nóng của Cache L2', 'Tự động giải phóng các tiến trình bị treo', 'Dịch địa chỉ của cổng mạng I/O'],
    ARRAY['Lưu trữ các cặp dịch địa chỉ ảo-vật lý vừa thực hiện gần đây ngay trong MMU để CPU không cần tốn thời gian đọc bảng trang trong RAM']::varchar[],
    'TLB là bộ đệm dịch địa chỉ ảo cực nhanh giúp tỉ lệ dịch địa chỉ đạt gần 1 chu kỳ máy.',
    6, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_054', 'mcq', 'memory-subsystem',
    'Sự kiện "Page Fault" (Lỗi trang) xảy ra khi nào?',
    ARRAY['Khi trang ảo được truy cập chưa được nạp vào bộ nhớ RAM vật lý (hoặc valid bit = 0 trong bảng trang)', 'Khi địa chỉ ảo vượt quá giới hạn 64-bit', 'Khi bộ nhớ RAM vật lý bị sụt nguồn điện', 'Khi TLB bị ghi đè toàn bộ'],
    ARRAY['Khi trang ảo được truy cập chưa được nạp vào bộ nhớ RAM vật lý (hoặc valid bit = 0 trong bảng trang)']::varchar[],
    'Khi Page Fault xảy ra, CPU gửi ngắt phần cứng bắt OS phải can thiệp đọc dữ liệu từ ổ cứng (Swap space) nạp vào RAM.',
    6, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_055', 'mcq', 'memory-subsystem',
    'Tại sao lỗi trang (Page Fault) lại làm giảm hiệu năng thực thi của hệ thống nghiêm trọng?',
    ARRAY['Vì hệ điều hành bắt buộc phải truy cập đọc/ghi ổ đĩa cứng (SSD/HDD) chậm hơn RAM hàng triệu lần để nạp trang ảo', 'Vì CPU sẽ tự động giảm xung nhịp hoạt động', 'Vì bảng trang sẽ bị xóa toàn bộ dữ liệu', 'Do mạch MMU bị nóng lên đột ngột'],
    ARRAY['Vì hệ điều hành bắt buộc phải truy cập đọc/ghi ổ đĩa cứng (SSD/HDD) chậm hơn RAM hàng triệu lần để nạp trang ảo']::varchar[],
    'Truy cập ổ đĩa cơ học hoặc SSD mất hàng mili-giây, cực kỳ chậm so với nano-giây của RAM vật lý.',
    6, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_056', 'mcq', 'memory-subsystem',
    'Bit quyền truy cập (R/W bit) trong mỗi dòng của Bảng trang (PTE) có vai trò gì?',
    ARRAY['Quy định tiến trình chỉ được phép đọc (Read-only) hay được phép ghi (Write) vào trang vật lý đó để bảo vệ tính toàn vẹn hệ thống', 'Đánh dấu trang có nằm ở RAM hay không', 'Đếm số lần tiến trình đọc ghi trang', 'Đồng bộ hóa dữ liệu xuống cache'],
    ARRAY['Quy định tiến trình chỉ được phép đọc (Read-only) hay được phép ghi (Write) vào trang vật lý đó để bảo vệ tính toàn vẹn hệ thống']::varchar[],
    'Nếu tiến trình cố tình thực hiện ghi dữ liệu vào trang Read-only (ví dụ vùng nhớ chứa mã nguồn code segment), MMU sẽ chặn lại và ném ra lỗi Segmentation Fault.',
    6, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_057', 'mcq', 'memory-subsystem',
    'Tại sao các hệ điều hành hiện đại lại sử dụng cấu trúc "Bảng trang đa cấp" (Multi-level Page Table)?',
    ARRAY['Để tiết kiệm không gian bộ nhớ lưu trữ bảng trang bằng cách không cấp phát bảng trang phụ cho các vùng địa chỉ ảo không sử dụng', 'Để tăng tốc độ dịch địa chỉ nhanh gấp 10 lần', 'Để gom bảng trang lưu chung với bộ nhớ đệm Cache', 'Để tránh lỗi tràn bộ nhớ đệm TLB'],
    ARRAY['Để tiết kiệm không gian bộ nhớ lưu trữ bảng trang bằng cách không cấp phát bảng trang phụ cho các vùng địa chỉ ảo không sử dụng']::varchar[],
    'Với địa chỉ ảo 32-bit/64-bit, bảng trang 1 cấp khổng lồ sẽ vắt kiệt RAM. Bảng trang đa cấp cho phép ta bỏ trống (không khởi tạo) bảng trang cấp dưới nếu không có tiến trình nào map tới.',
    7, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_058', 'mcq', 'memory-subsystem',
    'Khái niệm "Thrashing" (Trì trệ hệ thống do lỗi trang liên tục) xảy ra khi nào?',
    ARRAY['Khi lượng RAM vật lý trống quá nhỏ khiến hệ điều hành phải liên tục thực hiện page-out và page-in luân phiên, làm CPU dành 99% thời gian để đọc ghi ổ cứng', 'Khi CPU chạy quá xung nhịp thiết kế', 'Khi bảng trang đa cấp bị lỗi liên kết', 'Khi người dùng chạy quá nhiều luồng mạng'],
    ARRAY['Khi lượng RAM vật lý trống quá nhỏ khiến hệ điều hành phải liên tục thực hiện page-out và page-in luân phiên, làm CPU dành 99% thời gian để đọc ghi ổ cứng']::varchar[],
    'Thrashing làm sập hiệu năng hệ thống: máy tính đơ cứng, ổ đĩa sáng liên tục do đọc ghi swap file quá mức.',
    7, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_059', 'short-answer', 'memory-subsystem',
    'Điền tên viết tắt của bộ đệm dịch địa chỉ phần cứng tốc độ cao nằm trong MMU. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TLB']::varchar[],
    'TLB là Translation Lookaside Buffer.',
    5, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  ),
  (
    'cs_sys_q_060', 'short-answer', 'memory-subsystem',
    'Điền tên viết tắt tiếng Anh của bộ phận quản lý bộ nhớ phần cứng thực hiện nhiệm vụ dịch địa chỉ ảo sang địa chỉ vật lý. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MMU']::varchar[],
    'MMU là Memory Management Unit.',
    5, 'Virtual Memory', 'cs_computer_systems', 13, 'cs_sys_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Chu kỳ lệnh và luồng thực thi Pipelining (cs_sys_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_061', 'mcq', 'processor-architecture',
    'Nhiệm vụ chính diễn ra trong giai đoạn "Decode" (ID) của chu kỳ lệnh 5 bước là gì?',
    ARRAY['Giải mã chỉ thị lệnh xác định opcode và đọc dữ liệu từ các thanh ghi đầu vào', 'Nạp lệnh từ RAM vào thanh ghi chỉ thị', 'Thực thi phép tính số học bằng ALU', 'Ghi kết quả tính toán trở lại thanh ghi'],
    ARRAY['Giải mã chỉ thị lệnh xác định opcode và đọc dữ liệu từ các thanh ghi đầu vào']::varchar[],
    'Decode giải mã bit lệnh để kích hoạt các đường điều khiển phần cứng thích hợp và trích xuất dữ liệu thanh ghi.',
    5, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_062', 'mcq', 'processor-architecture',
    'Kỹ thuật Đường ống (Pipelining) tăng hiệu năng CPU bằng cách nào?',
    ARRAY['Cho phép thực thi đồng thời các giai đoạn khác nhau của nhiều chỉ thị lệnh gối đầu song song', 'Làm giảm thời gian thực thi (latency) của một chỉ thị đơn lẻ', 'Tự động song song hóa các process độc lập', 'Đồng bộ hóa RAM và Cache L1'],
    ARRAY['Cho phép thực thi đồng thời các giai đoạn khác nhau của nhiều chỉ thị lệnh gối đầu song song']::varchar[],
    'Pipelining hoạt động như dây chuyền lắp ráp. Khi lệnh 1 đang Execute thì lệnh 2 đang được Decode và lệnh 3 đang được Fetch, tăng Throughput của CPU.',
    6, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_063', 'mcq', 'processor-architecture',
    'Xung đột "Structural Hazard" xảy ra trong đường ống CPU khi nào?',
    ARRAY['Khi hai chỉ thị lệnh cùng tranh chấp sử dụng một tài nguyên phần cứng vật lý trong cùng một chu kỳ máy', 'Khi lệnh sau phụ thuộc dữ liệu của lệnh trước', 'Khi bộ dự đoán nhánh đoán sai hướng đi của vòng lặp', 'Khi CPU bị quá nhiệt phần cứng'],
    ARRAY['Khi hai chỉ thị lệnh cùng tranh chấp sử dụng một tài nguyên phần cứng vật lý trong cùng một chu kỳ máy']::varchar[],
    'Ví dụ: nếu CPU dùng chung một cổng bộ nhớ cho cả đọc lệnh (Fetch) và đọc dữ liệu (Memory), hai lệnh chạy gối đầu sẽ bị xung đột tài nguyên.',
    6, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_064', 'mcq', 'processor-architecture',
    'Xung đột "Data Hazard" xảy ra trong đường ống Pipelining khi nào?',
    ARRAY['Khi một chỉ thị phụ thuộc dữ liệu đầu vào từ kết quả của chỉ thị đi trước mà chỉ thị đi trước chưa kịp ghi kết quả lại vào thanh ghi', 'Khi hai luồng ghi dữ liệu vào một file', 'Khi thanh ghi SP bị tràn dữ liệu', 'Khi CPU ghi đè dữ liệu lên địa chỉ PC'],
    ARRAY['Khi một chỉ thị phụ thuộc dữ liệu đầu vào từ kết quả của chỉ thị đi trước mà chỉ thị đi trước chưa kịp ghi kết quả lại vào thanh ghi']::varchar[],
    'Lệnh sau cần đọc thanh ghi ở bước ID, trong khi lệnh trước chưa thực hiện bước Writeback (WB) để lưu kết quả vào thanh ghi đó.',
    6, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_065', 'mcq', 'processor-architecture',
    'Kỹ thuật "Forwarding" (hoặc Bypassing) giải quyết Data Hazard bằng cách nào?',
    ARRAY['Truyền trực tiếp kết quả đầu ra từ bộ ALU của lệnh trước về đầu vào ALU của lệnh sau ngay lập tức mà không cần đợi ghi lại thanh ghi ở bước WB', 'Tạm thời treo luồng chạy của CPU', 'Sao lưu dữ liệu thanh ghi sang bộ nhớ Cache', 'Chuyển toàn bộ phép toán sang bộ nhớ RAM chính'],
    ARRAY['Truyền trực tiếp kết quả đầu ra từ bộ ALU của lệnh trước về đầu vào ALU của lệnh sau ngay lập tức mà không cần đợi ghi lại thanh ghi ở bước WB']::varchar[],
    'Forwarding thêm các đường dây tắt vật lý trong CPU để chuyển giao dữ liệu tạm thời giữa các tầng của pipeline, loại bỏ nhu cầu chèn NOP.',
    7, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_066', 'mcq', 'processor-architecture',
    'Xung đột "Control Hazard" xuất hiện khi nào trong chu kỳ lệnh?',
    ARRAY['Khi gặp các chỉ thị rẽ nhánh (if-else, jump) làm CPU chưa thể xác định được địa chỉ của chỉ lệnh tiếp theo để nạp vào đường ống', 'Khi chia một số nguyên cho 0', 'Khi xảy ra tràn bộ đệm stack overflow', 'Khi bộ nhớ cache bị trượt liên tục'],
    ARRAY['Khi gặp các chỉ thị rẽ nhánh (if-else, jump) làm CPU chưa thể xác định được địa chỉ của chỉ lệnh tiếp theo để nạp vào đường ống']::varchar[],
    'CPU phải đợi đến bước Execute hoặc Memory của lệnh nhảy mới biết PC tiếp theo là gì. Việc nạp mò trước đó có thể bị sai lệch.',
    6, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_067', 'mcq', 'processor-architecture',
    'Phần cứng CPU giải quyết xung đột Data Hazard do lệnh Load gây ra (Load-Use Data Hazard) thế nào vì không thể dùng Forwarding thuần túy?',
    ARRAY['Bắt buộc phải chèn 1 chu kỳ khựng (bubble/stall) để đợi bước MEM của lệnh Load lấy dữ liệu xong rồi mới forward được', 'Tự động hủy bỏ lệnh Load', 'Nạp dữ liệu từ cache phụ L2', 'Cho phép lệnh sau chạy trước lệnh Load'],
    ARRAY['Bắt buộc phải chèn 1 chu kỳ khựng (bubble/stall) để đợi bước MEM của lệnh Load lấy dữ liệu xong rồi mới forward được']::varchar[],
    'Dữ liệu của lệnh Load chỉ có sau bước MEM (bước 4), trong khi lệnh tiếp theo cần dữ liệu ở bước EX (bước 3). Khoảng cách này đòi hỏi chèn tối thiểu 1 stall.',
    7, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_068', 'mcq', 'processor-architecture',
    'Chỉ lệnh "NOP" (No Operation) được chèn vào đường ống nhằm mục đích gì?',
    ARRAY['Tạo ra một chu kỳ khựng (stall) trống không làm gì để giải quyết các xung đột Hazard trong đường ống', 'Xoá dữ liệu thanh ghi PC', 'Chuyển CPU sang chế độ ngủ tiết kiệm điện', 'Đẩy dữ liệu stack pointer sp về vị trí ban đầu'],
    ARRAY['Tạo ra một chu kỳ khựng (stall) trống không làm gì để giải quyết các xung đột Hazard trong đường ống']::varchar[],
    'NOP là lệnh rỗng kéo dài thời gian để lệnh đi trước hoàn thành, giúp lệnh đi sau an tâm chạy mà không bị xung đột dữ liệu.',
    6, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_069', 'short-answer', 'processor-architecture',
    'Điền tên tiếng Anh viết tắt của giai đoạn đầu tiên nạp chỉ thị từ RAM vào CPU. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IF']::varchar[],
    'IF là Instruction Fetch.',
    5, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  ),
  (
    'cs_sys_q_070', 'short-answer', 'processor-architecture',
    'Điền tên tiếng Anh của hiện tượng khựng lại (trễ nhịp) của đường ống Pipelining khi gặp xung đột. (Viết thường)',
    NULL,
    ARRAY['stall', 'bubble']::varchar[],
    'Stall khựng đường ống để giải quyết xung đột.',
    5, 'CPU Pipelining', 'cs_computer_systems', 13, 'cs_sys_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Độc lập chỉ lệnh (ILP) & Superscalar CPU (cs_sys_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_071', 'mcq', 'processor-architecture',
    'Kiến trúc "Superscalar CPU" có thuộc tính thiết kế nào?',
    ARRAY['Tích hợp nhiều khối chức năng phần cứng song song để thực thi nhiều chỉ thị lệnh trong cùng một chu kỳ máy', 'Chỉ chạy được trên môi trường Linux', 'Sử dụng duy nhất một bộ giải mã lệnh cố định', 'Hoàn toàn không có bộ nhớ Cache'],
    ARRAY['Tích hợp nhiều khối chức năng phần cứng song song để thực thi nhiều chỉ thị lệnh trong cùng một chu kỳ máy']::varchar[],
    'Superscalar có IPC (Instructions Per Cycle) lớn hơn 1 nhờ phân phối song song các lệnh độc lập vào nhiều ALU/FPU.',
    5, 'Superscalar CPU', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_072', 'mcq', 'processor-architecture',
    'Cơ chế "Out-of-Order Execution" (Thực thi không tuần tự) trong CPU hoạt động thế nào?',
    ARRAY['CPU phân tích dữ liệu, tự động chạy trước các lệnh độc lập ở phía sau khi lệnh phía trước đang bị nghẽn (đợi RAM), sau đó sắp xếp kết quả lại theo đúng trật tự', 'CPU chạy các lệnh ngẫu nhiên tùy thích', 'Ứng dụng tự động chạy song song đa luồng', 'Trình biên dịch tự động đảo dòng code'],
    ARRAY['CPU phân tích dữ liệu, tự động chạy trước các lệnh độc lập ở phía sau khi lệnh phía trước đang bị nghẽn (đợi RAM), sau đó sắp xếp kết quả lại theo đúng trật tự']::varchar[],
    'Cơ chế thực thi không tuần tự giúp CPU tận dụng tối đa các chu kỳ chờ đợi rảnh rỗi để tăng tốc độ chạy chương trình.',
    7, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_073', 'mcq', 'processor-architecture',
    'Bộ dự đoán nhánh (Branch Prediction) đoán hướng đi của các câu lệnh rẽ nhánh (`if-else`) nhằm mục đích gì?',
    ARRAY['Giảm thiểu tối đa xung đột điều khiển (Control Hazard) làm trống đường ống Pipelining', 'Để tự động tối ưu hóa điều kiện logic của lập trình viên', 'Để tránh tràn bộ nhớ Stack', 'Để tự động sửa lỗi null của biến số'],
    ARRAY['Giảm thiểu tối đa xung đột điều khiển (Control Hazard) làm trống đường ống Pipelining']::varchar[],
    'Nếu đoán đúng, CPU nạp liên tục lệnh của nhánh đó mà không cần dừng lại chờ kết quả so sánh, duy trì hiệu năng cao.',
    6, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_074', 'mcq', 'processor-architecture',
    'Điều gì xảy ra khi bộ dự đoán nhánh của CPU bị đoán sai (Branch Misprediction)?',
    ARRAY['CPU phải huỷ bỏ toàn bộ kết quả thực thi suy đoán trước đó, làm sạch đường ống (flush) và nạp lại từ địa chỉ đúng, tốn nhiều chu kỳ máy', 'Chương trình lập tức bị sập lỗi hệ thống', 'Dữ liệu bộ nhớ cache bị xóa sạch', 'Hệ điều hành tự khởi động lại CPU'],
    ARRAY['CPU phải huỷ bỏ toàn bộ kết quả thực thi suy đoán trước đó, làm sạch đường ống (flush) và nạp lại từ địa chỉ đúng, tốn nhiều chu kỳ máy']::varchar[],
    'Đoán sai bắt buộc CPU phải dọn dẹp Reorder Buffer và xả đường ống (pipeline flush), gây độ trễ phạt (penalty) từ 10 đến 20 chu kỳ máy.',
    6, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_075', 'mcq', 'processor-architecture',
    'Tại sao việc sắp xếp mảng dữ liệu (Sort) trước khi chạy vòng lặp kiểm tra điều kiện `if (arr[i] > limit)` lại giúp chương trình chạy nhanh hơn đáng kể?',
    ARRAY['Vì mảng đã sắp xếp giúp Bộ dự đoán nhánh đoán trúng mẫu rẽ nhánh của vòng lặp gần như 100% thời gian, loại bỏ hoàn toàn việc xả đường ống', 'Vì mảng đã sắp xếp tốn ít bộ nhớ RAM hơn', 'Vì compiler tự động song song hóa mảng đã sắp xếp', 'Vì CPU không thực hiện so sánh trên mảng chưa sắp xếp'],
    ARRAY['Vì mảng đã sắp xếp giúp Bộ dự đoán nhánh đoán trúng mẫu rẽ nhánh của vòng lặp gần như 100% thời gian, loại bỏ hoàn toàn việc xả đường ống']::varchar[],
    'Mảng sắp xếp tạo ra mẫu rẽ nhánh tuần tự (ví dụ liên tục false rồi liên tục true). Bộ dự đoán nhánh dễ dàng học được quy luật và đoán đúng hoàn toàn.',
    7, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_076', 'mcq', 'processor-architecture',
    'Cơ chế "Register Renaming" (Đổi tên thanh ghi) trong Out-of-Order CPU dùng để làm gì?',
    ARRAY['Loại bỏ các xung đột dữ liệu giả do số lượng thanh ghi logic hữu hạn gây ra (WAR và WAW hazards)', 'Đổi tên các thanh ghi PC, SP thành các tên thân thiện', 'Sao lưu dữ liệu thanh ghi lên RAM', 'Tự động gán quyền read-only cho thanh ghi'],
    ARRAY['Loại bỏ các xung đột dữ liệu giả do số lượng thanh ghi logic hữu hạn gây ra (WAR và WAW hazards)']::varchar[],
    'Đổi tên thanh ghi ánh xạ các thanh ghi logic ảo của chương trình vào tập hợp lớn các thanh ghi vật lý thực tế của CPU, loại bỏ sự phụ thuộc tên.',
    7, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_077', 'mcq', 'processor-architecture',
    'Bộ đệm "Reorder Buffer" (ROB) trong Out-of-Order CPU có vai trò gì?',
    ARRAY['Đảm bảo các chỉ thị thực thi không tuần tự được ghi nhận kết quả trở lại trạng thái hệ thống theo đúng tuần tự ban đầu (In-Order Commit)', 'Sắp xếp lại mảng dữ liệu cache', 'Lưu trữ lịch sử rẽ nhánh', 'Tăng dung lượng lưu trữ của bộ nhớ Stack'],
    ARRAY['Đảm bảo các chỉ thị thực thi không tuần tự được ghi nhận kết quả trở lại trạng thái hệ thống theo đúng tuần tự ban đầu (In-Order Commit)']::varchar[],
    'ROB giữ kết quả tạm thời của các lệnh chạy trước. Chỉ khi các lệnh đi trước tuần tự hoàn thành an toàn, ROB mới ghi nhận vĩnh viễn (commit) để giữ đúng logic tuần tự của chương trình.',
    7, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_078', 'mcq', 'processor-architecture',
    'Khái niệm "Speculative Execution" (Thực thi suy đoán) nói về điều gì?',
    ARRAY['CPU đoán hướng rẽ nhánh và thực thi trước các chỉ thị tiếp theo trước khi biết kết quả so sánh thực tế là đúng hay sai', 'CPU dự đoán lỗi tràn bộ nhớ để sửa lỗi', 'Hệ điều hành suy đoán hành vi của người dùng', 'Trình biên dịch đoán kiểu dữ liệu của biến'],
    ARRAY['CPU đoán hướng rẽ nhánh và thực thi trước các chỉ thị tiếp theo trước khi biết kết quả so sánh thực tế là đúng hay sai']::varchar[],
    'Thực thi suy đoán kết hợp với dự đoán nhánh giúp CPU đi trước một bước để tối ưu hoá hiệu năng xử lý.',
    6, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_079', 'short-answer', 'processor-architecture',
    'Điền tên viết tắt của chỉ số số lượng chỉ thị thực thi được trên mỗi chu kỳ máy của CPU. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IPC']::varchar[],
    'IPC là Instructions Per Cycle.',
    5, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  ),
  (
    'cs_sys_q_080', 'short-answer', 'processor-architecture',
    'Điền từ tiếng Anh viết tắt của lỗ hổng bảo mật khai thác speculative execution để tấn công đọc trộm bộ nhớ ảo. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Spectre']::varchar[],
    'Spectre khai thác cơ chế speculative execution của CPU.',
    6, 'Instruction-Level Parallelism', 'cs_computer_systems', 13, 'cs_sys_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Giao tiếp ngoại vi & Cơ chế I/O (cs_sys_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_081', 'mcq', 'system-security-io',
    'Cơ chế giao tiếp ngoại vi "Polling" (Quét vòng) hoạt động thế nào và có điểm yếu gì?',
    ARRAY['CPU liên tục lặp kiểm tra cờ trạng thái thiết bị ngoại vi, gây lãng phí chu kỳ xử lý của CPU', 'Thiết bị ngoại vi tự động gửi tín hiệu khi có dữ liệu', 'CPU chỉ xử lý dữ liệu qua DMA', 'Polling chỉ chạy được trên hệ thống đơn luồng'],
    ARRAY['CPU liên tục lặp kiểm tra cờ trạng thái thiết bị ngoại vi, gây lãng phí chu kỳ xử lý của CPU']::varchar[],
    'Polling bắt CPU chạy vòng lặp vô hạn kiểm tra trạng thái, làm CPU không thể thực thi các chương trình khác.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_082', 'mcq', 'system-security-io',
    'Cơ chế "Ngắt phần cứng" (Interrupts) giải phóng CPU khỏi Polling bằng cách nào?',
    ARRAY['Khi thiết bị ngoại vi có dữ liệu, nó gửi tín hiệu yêu cầu ngắt (IRQ) bắt CPU tạm dừng tác vụ hiện tại để xử lý rồi quay lại chạy tiếp', 'Thiết bị ngoại vi tự động ghi dữ liệu vào RAM', 'CPU chủ động tắt thiết bị ngoại vi', 'Hệ điều hành ngắt kết nối mạng'],
    ARRAY['Khi thiết bị ngoại vi có dữ liệu, nó gửi tín hiệu yêu cầu ngắt (IRQ) bắt CPU tạm dừng tác vụ hiện tại để xử lý rồi quay lại chạy tiếp']::varchar[],
    'Ngắt phần cứng giúp CPU chỉ cần xử lý I/O khi thiết bị thực sự sẵn sàng, tối ưu hoá hiệu năng xử lý đa nhiệm.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_083', 'mcq', 'system-security-io',
    'Khi xảy ra ngắt, CPU thực hiện lưu trữ ngữ cảnh (Context Saving) bằng cách nào để quay lại an toàn?',
    ARRAY['Sao lưu toàn bộ giá trị của các thanh ghi hiện tại vào bộ nhớ Stack của hệ điều hành', 'Sao chép toàn bộ RAM vào ổ đĩa cứng', 'Ghi đè địa chỉ PC về 0', 'Tắt hoàn toàn đường ống Pipelining'],
    ARRAY['Sao lưu toàn bộ giá trị của các thanh ghi hiện tại vào bộ nhớ Stack của hệ điều hành']::varchar[],
    'CPU lưu trữ các biến trạng thái, thanh ghi, và PC vào Stack của hệ thống để sau khi chạy xong hàm xử lý ngắt có thể khôi phục nguyên trạng.',
    6, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_084', 'mcq', 'system-security-io',
    'Bảng "Interrupt Vector Table" (Bảng vector ngắt) chứa thông tin gì?',
    ARRAY['Bảng ánh xạ chứa địa chỉ của các hàm xử lý ngắt (Interrupt Service Routine - ISR) tương ứng với từng mã ngắt', 'Bảng chứa danh sách các thiết bị ngoại vi', 'Bảng lưu trữ dữ liệu của DMA', 'Bảng ghi nhận lịch sử commit của Git'],
    ARRAY['Bảng ánh xạ chứa địa chỉ của các hàm xử lý ngắt (Interrupt Service Routine - ISR) tương ứng với từng mã ngắt']::varchar[],
    'Khi nhận IRQ, CPU tra cứu bảng vector ngắt để lấy địa chỉ hàm xử lý ISR tương ứng và nhảy PC tới đó.',
    6, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_085', 'mcq', 'system-security-io',
    'Cơ chế "DMA" (Direct Memory Access) giải quyết bài toán truyền tải dữ liệu lớn thế nào?',
    ARRAY['Cho phép bộ điều khiển DMA tự động quản lý bus truyền trực tiếp dữ liệu giữa ngoại vi và RAM mà không cần đi qua CPU', 'CPU phải đọc từng byte từ ngoại vi rồi tự ghi vào RAM', 'Bộ điều khiển DMA lưu trữ dữ liệu trên mảng tĩnh', 'DMA chuyển dữ liệu qua mạng internet'],
    ARRAY['Cho phép bộ điều khiển DMA tự động quản lý bus truyền trực tiếp dữ liệu giữa ngoại vi và RAM mà không cần đi qua CPU']::varchar[],
    'DMA giải phóng CPU khỏi việc đọc ghi từng byte dữ liệu thô, CPU chỉ cần cấu hình địa chỉ ban đầu và nhận ngắt khi hoàn tất.',
    6, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_086', 'mcq', 'system-security-io',
    'Thiết bị ngoại vi gửi tín hiệu ngắt đến CPU thông qua cổng vật lý nào trên bo mạch?',
    ARRAY['Đường yêu cầu ngắt (IRQ - Interrupt Request Line)', 'Cáp nguồn điện', 'Bus truyền địa chỉ', 'Đầu kết nối bộ nhớ cache L1'],
    ARRAY['Đường yêu cầu ngắt (IRQ - Interrupt Request Line)']::varchar[],
    'IRQ là các đường dây vật lý nối thiết bị ngoại vi trực tiếp vào chip điều khiển ngắt (APIC/PIC) của CPU.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_087', 'mcq', 'system-security-io',
    'Mục tiêu của việc phân chia độ ưu tiên ngắt (Interrupt Priority) là gì?',
    ARRAY['Đảm bảo các ngắt quan trọng hơn (như lỗi mất nguồn điện, lỗi phần cứng) được CPU xử lý trước các ngắt thông thường (như bàn phím, card mạng)', 'Để tăng tốc độ đọc của ổ đĩa cứng', 'Để giảm lượng điện năng tiêu thụ của DMA', 'Để tránh lỗi tràn bộ đệm stack'],
    ARRAY['Đảm bảo các ngắt quan trọng hơn (như lỗi mất nguồn điện, lỗi phần cứng) được CPU xử lý trước các ngắt thông thường (như bàn phím, card mạng)']::varchar[],
    'Phần cứng CPU hỗ trợ ngắt lồng nhau (Nested Interrupts): một ngắt độ ưu tiên cao được phép tạm dừng một ISR của ngắt độ ưu tiên thấp đang chạy.',
    6, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_088', 'mcq', 'system-security-io',
    'Sau khi hoàn tất việc sao lưu dữ liệu lớn từ ổ đĩa cứng vào RAM, bộ điều khiển DMA thông báo cho CPU bằng cách nào?',
    ARRAY['Gửi một tín hiệu ngắt duy nhất tới CPU', 'Liên tục đổi màu cờ trạng thái', 'Tự động khởi động lại tiến trình của CPU', 'Ghi dữ liệu vào thanh ghi PC'],
    ARRAY['Gửi một tín hiệu ngắt duy nhất tới CPU']::varchar[],
    'Một tín hiệu ngắt duy nhất từ DMA kết thúc tiến trình truyền dữ liệu, báo hiệu cho CPU biết RAM đã sẵn sàng để xử lý dữ liệu đó.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_089', 'short-answer', 'system-security-io',
    'Điền tên viết tắt của cơ chế truy cập bộ nhớ trực tiếp không đi qua CPU. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DMA']::varchar[],
    'DMA là Direct Memory Access.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  ),
  (
    'cs_sys_q_090', 'short-answer', 'system-security-io',
    'Điền tên viết tắt của chương trình xử lý ngắt chuyên biệt của hệ điều hành. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ISR']::varchar[],
    'ISR là Interrupt Service Routine.',
    5, 'I/O Systems', 'cs_computer_systems', 13, 'cs_sys_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Tấn công tràn bộ đệm (cs_sys_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_sys_q_091', 'mcq', 'system-security-io',
    'Tấn công tràn bộ đệm trên Stack (Stack Buffer Overflow) lợi dụng kẽ hở nào của bộ nhớ Stack?',
    ARRAY['Stack lưu chung biến cục bộ và địa chỉ trả về (Return Address) của hàm; ghi tràn biến cục bộ sẽ đè lên địa chỉ trả về này', 'Stack nằm chung với vùng nhớ Heap', 'Stack không có giới hạn dung lượng RAM', 'Stack chỉ cho phép đọc dữ liệu'],
    ARRAY['Stack lưu chung biến cục bộ và địa chỉ trả về (Return Address) của hàm; ghi tràn biến cục bộ sẽ đè lên địa chỉ trả về này']::varchar[],
    'Do Stack lưu trữ dữ liệu người dùng kề sát với địa chỉ điều khiển (Return Address), việc ghi tràn buffer sẽ đè và thay đổi luồng PC khi thoát hàm.',
    6, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_092', 'mcq', 'system-security-io',
    'Hàm thư viện C nào sau đây được coi là CỰC KỲ NGUY HIỂM vì không kiểm tra giới hạn độ dài dữ liệu nhập vào, dễ gây lỗi tràn bộ đệm?',
    ARRAY['gets()', 'fgets()', 'strncpy()', 'snprintf()']::varchar[],
    ARRAY['gets()']::varchar[],
    'Hàm `gets()` đọc ký tự từ bàn phím đến khi gặp ký tự xuống dòng mà không kiểm tra mảng đệm có đủ dung lượng chứa hay không. Đã bị cấm sử dụng trong các tiêu chuẩn C hiện đại.',
    5, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_093', 'mcq', 'system-security-io',
    'Cơ chế bảo vệ "Stack Canary" hoạt động thế nào để phòng chống tấn công tràn bộ đệm?',
    ARRAY['Chèn một số ngẫu nhiên bí mật vào trước Return Address; trước khi thoát hàm, CPU kiểm tra nếu số này bị thay đổi thì lập tức huỷ chương trình', 'Mã hóa toàn bộ bộ nhớ Stack', 'Chuyển biến cục bộ sang lưu trữ trên Heap', 'Ngăn cản hoàn toàn việc gọi hàm đệ quy'],
    ARRAY['Chèn một số ngẫu nhiên bí mật vào trước Return Address; trước khi thoát hàm, CPU kiểm tra nếu số này bị thay đổi thì lập tức huỷ chương trình']::varchar[],
    'Stack Canary giống như chim hoàng yến trong mỏ than. Nếu chim chết (Canary bị ghi đè thay đổi giá trị), hệ thống phát hiện có tràn bộ đệm xảy ra và ngăn chặn lệnh ret thực thi địa chỉ độc hại.',
    6, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_094', 'mcq', 'system-security-io',
    'Cơ chế phòng thủ "Non-Executable Stack" (NX/DEP) ngăn chặn cuộc tấn công tràn bộ đệm bằng cách nào?',
    ARRAY['Đánh dấu vùng nhớ Stack chỉ có quyền Đọc/Ghi, không có quyền Thực thi lệnh, khiến shellcode của hacker nằm trên Stack không thể chạy', 'Tự động giải phóng các mảng tĩnh', 'Ngăn chặn hacker đọc trộm dữ liệu Stack', 'Tăng dung lượng bộ nhớ Cache L1'],
    ARRAY['Đánh dấu vùng nhớ Stack chỉ có quyền Đọc/Ghi, không có quyền Thực thi lệnh, khiến shellcode của hacker nằm trên Stack không thể chạy']::varchar[],
    'Cơ chế NX (No-Execute) chia tách rõ ràng vùng chứa code và vùng chứa dữ liệu (W^X - Write XOR Execute), ngăn chạy mã độc lưu trên Stack.',
    6, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_095', 'mcq', 'system-security-io',
    'Cơ chế "ASLR" (Address Space Layout Randomization) gây khó khăn cho hacker thế nào?',
    ARRAY['Ngẫu nhiên hóa địa chỉ bắt đầu của các vùng nhớ Stack, Heap, và thư viện chia sẻ mỗi lần chạy, khiến hacker không đoán được địa chỉ shellcode để nhảy tới', 'Mã hóa toàn bộ các file thư viện DLL', 'Tự động phát hiện virus phần mềm', 'Tăng tốc độ cấp phát bộ nhớ động'],
    ARRAY['Ngẫu nhiên hóa địa chỉ bắt đầu của các vùng nhớ Stack, Heap, và thư viện chia sẻ mỗi lần chạy, khiến hacker không đoán được địa chỉ shellcode để nhảy tới']::varchar[],
    'ASLR phá vỡ các địa chỉ hardcode tĩnh của hacker, biến cuộc tấn công tin cậy thành hành vi đoán mò dễ gây lỗi sập app.',
    7, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_096', 'mcq', 'system-security-io',
    'Hacker sử dụng kỹ thuật "Return-Oriented Programming" (ROP) nhằm mục đích gì?',
    ARRAY['Vượt qua cơ chế bảo vệ Non-Executable Stack (NX) bằng cách tận dụng xâu chuỗi các đoạn code hợp lệ có sẵn trong thư viện hệ thống (libc)', 'Tấn công tràn bộ đệm trên vùng nhớ Heap', 'Giải mã các mật khẩu lưu trên RAM', 'Vô hiệu hóa hoàn toàn cơ chế bảo vệ ASLR'],
    ARRAY['Vượt qua cơ chế bảo vệ Non-Executable Stack (NX) bằng cách tận dụng xâu chuỗi các đoạn code hợp lệ có sẵn trong thư viện hệ thống (libc)']::varchar[],
    'ROP tìm kiếm các đoạn code kết thúc bằng lệnh `ret` (gadgets) trong libc để ghép nối thành chuỗi hành vi độc hại mà không cần chạy shellcode tự chế trên Stack.',
    7, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_097', 'mcq', 'system-security-io',
    'Thành phần "Return Address" (Địa chỉ trả về) trong Stack Frame lưu trữ thông tin gì?',
    ARRAY['Địa chỉ của chỉ lệnh tiếp theo trong hàm cha để CPU quay lại thực thi tiếp sau khi hàm hiện tại chạy xong', 'Giá trị trả về của hàm (ví dụ kết quả phép cộng)', 'Địa chỉ đỉnh của vùng nhớ Heap', 'Giá trị của Stack Canary'],
    ARRAY['Địa chỉ của chỉ lệnh tiếp theo trong hàm cha để CPU quay lại thực thi tiếp sau khi hàm hiện tại chạy xong']::varchar[],
    'Khi hàm chạy xong và gọi lệnh `ret`, CPU nạp địa chỉ Return Address này vào thanh ghi PC để tiếp tục chạy chương trình cha.',
    5, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_098', 'mcq', 'system-security-io',
    'Để viết mã nguồn C an toàn, lập trình viên nên thay thế hàm `strcpy()` bằng hàm nào để chống tràn bộ đệm?',
    ARRAY['strncpy()', 'gets()', 'sprintf()', 'memcpy()']::varchar[],
    ARRAY['strncpy()']::varchar[],
    '`strncpy()` bắt buộc lập trình viên phải truyền thêm tham số kích thước tối đa của mảng đệm, ngăn chặn việc sao chép vượt quá giới hạn.',
    5, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_099', 'short-answer', 'system-security-io',
    'Điền tên cơ chế bảo vệ ngẫu nhiên hóa không gian địa chỉ bộ nhớ để chống hacker đoán địa chỉ. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['ASLR']::varchar[],
    'ASLR là Address Space Layout Randomization.',
    5, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  ),
  (
    'cs_sys_q_100', 'short-answer', 'system-security-io',
    'Điền tên từ tiếng Anh của giá trị ngẫu nhiên bí mật chèn trước Return Address để phát hiện tràn stack (tên loài chim gác cổng mỏ than). (Viết thường)',
    NULL,
    ARRAY['canary', 'stack canary']::varchar[],
    'Stack Canary phát hiện tràn dữ liệu Stack bảo vệ Return Address.',
    5, 'System Security', 'cs_computer_systems', 13, 'cs_sys_10'
  );

COMMIT;
