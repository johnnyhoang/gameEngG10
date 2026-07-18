-- SQL migration to seed 100 question bank for cs_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_programming (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_programming';

-- ======================================================================================
-- BÀI GIẢNG 1: Lập trình Hướng đối tượng nâng cao (cs_prog_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_001', 'mcq', 'programming-paradigms',
    'Tính chất nào trong OOP quy định việc che giấu thông tin chi tiết triển khai nội bộ và chỉ để lộ các giao tiếp công khai ra ngoài?',
    ARRAY['Đóng gói (Encapsulation)', 'Kế thừa (Inheritance)', 'Đa hình (Polymorphism)', 'Trừu tượng (Abstraction)']::varchar[],
    ARRAY['Đóng gói (Encapsulation)']::varchar[],
    'Đóng gói (Encapsulation) gom thuộc tính và phương thức vào đối tượng và dùng các từ khóa như private để bảo vệ, ngăn truy cập trực tiếp từ bên ngoài.',
    5, 'OOP Principles', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_002', 'mcq', 'programming-paradigms',
    'Phát biểu nào sau đây là ĐÚNG khi so sánh giữa Interface và Abstract Class?',
    ARRAY['Một lớp có thể triển khai nhiều Interface nhưng chỉ được kế thừa tối đa một Abstract Class', 'Interface có thể chứa các biến thực thể (state instance variables) còn Abstract Class thì không', 'Tất cả các phương thức trong Abstract Class bắt buộc phải là phương thức trừu tượng', 'Lớp con kế thừa Abstract Class không được phép ghi đè (override) phương thức của lớp cha']::varchar[],
    ARRAY['Một lớp có thể triển khai nhiều Interface nhưng chỉ được kế thừa tối đa một Abstract Class']::varchar[],
    'Hầu hết các ngôn ngữ lập trình (Java, C#, C++) chỉ hỗ trợ đơn kế thừa lớp (để tránh lỗi Diamond Problem) nhưng cho phép triển khai (implement) nhiều giao diện (Interface) đồng thời.',
    6, 'OOP Design', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_003', 'mcq', 'programming-paradigms',
    'Trong Java/C#, hiện tượng "Upcasting" xảy ra khi nào?',
    ARRAY['Gán một đối tượng của lớp con cho một biến tham chiếu thuộc kiểu lớp cha', 'Gán một đối tượng của lớp cha cho một biến tham chiếu thuộc kiểu lớp con', 'Biến đổi kiểu dữ liệu số nguyên thành số thực tự động', 'Tự động gọi phương thức nạp chồng của lớp con'],
    ARRAY['Gán một đối tượng của lớp con cho một biến tham chiếu thuộc kiểu lớp cha']::varchar[],
    'Upcasting là hành động chuyển đổi kiểu tham chiếu từ lớp con lên lớp cha. Phép toán này luôn an toàn và tự động thực hiện vì lớp con luôn kế thừa mọi đặc tính của lớp cha.',
    5, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_004', 'mcq', 'programming-paradigms',
    'Khi lớp con kế thừa lớp cha và viết lại phương thức trùng tên, trùng chữ ký (signature) và tham số của cha, hiện tượng này được gọi là gì?',
    ARRAY['Ghi đè phương thức (Method Overriding)', 'Nạp chồng phương thức (Method Overloading)', 'Ẩn phương thức (Method Hiding)', 'Ủy quyền phương thức (Method Delegation)'],
    ARRAY['Ghi đè phương thức (Method Overriding)']::varchar[],
    'Ghi đè (Overriding) xảy ra ở mối quan hệ kế thừa và cho phép lớp con cung cấp một triển khai cụ thể khác cho phương thức đã có ở lớp cha (đa hình động).',
    5, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_005', 'mcq', 'programming-paradigms',
    'Tại sao nạp chồng phương thức (Method Overloading) lại được gọi là đa hình tĩnh (Static/Compile-time Polymorphism)?',
    ARRAY['Vì việc quyết định phương thức nào được gọi được trình biên dịch xác định ngay lúc biên dịch dựa trên số lượng và kiểu của đối số', 'Vì phương thức được gọi được xác định động khi chạy chương trình dựa trên đối tượng thực tế trên Heap', 'Vì phương thức bắt buộc phải sử dụng từ khóa static', 'Vì các phương thức nạp chồng không được thay đổi dữ liệu trong bộ nhớ'],
    ARRAY['Vì việc quyết định phương thức nào được gọi được trình biên dịch xác định ngay lúc biên dịch dựa trên số lượng và kiểu của đối số']::varchar[],
    'Nạp chồng (Overloading) được trình biên dịch liên kết sớm (Early binding) ngay lúc compile dựa trên chữ ký hàm, giúp tối ưu hóa hiệu năng khi chạy.',
    6, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_006', 'mcq', 'programming-paradigms',
    'Trong C++, nếu ta kế thừa một lớp có các phương thức thông thường không có từ khóa `virtual` và gọi qua con trỏ lớp cha, đa hình động có hoạt động không?',
    ARRAY['Không, trình biên dịch sẽ thực hiện liên kết tĩnh và gọi phương thức của lớp cha', 'Có, hệ thống vẫn tự động gọi phương thức ghi đè ở lớp con', 'Có, nhưng chương trình sẽ bị sập lỗi phân đoạn', 'Không, chương trình sẽ báo lỗi compile ngay lập tức'],
    ARRAY['Không, trình biên dịch sẽ thực hiện liên kết tĩnh và gọi phương thức của lớp cha']::varchar[],
    'Trong C++, để kích hoạt đa hình động (Dynamic dispatch), ta bắt buộc phải khai báo từ khóa `virtual` cho phương thức ở lớp cha để tạo bảng ảo (vtable).',
    7, 'C++ Polymorphism', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_007', 'mcq', 'programming-paradigms',
    'Khái niệm "Downcasting" trong lập trình hướng đối tượng dùng để làm gì?',
    ARRAY['Chuyển đổi kiểu tham chiếu từ lớp cha xuống lớp con thực tế', 'Chuyển đổi kiểu tham chiếu từ lớp con lên lớp cha', 'Hạ độ ưu tiên thực thi của lớp đối tượng trong RAM', 'Ép kiểu đối tượng thành kiểu dữ liệu nguyên thủy'],
    ARRAY['Chuyển đổi kiểu tham chiếu từ lớp cha xuống lớp con thực tế']::varchar[],
    'Downcasting ép kiểu từ cha xuống con. Phép toán này có rủi ro cao và có thể gây lỗi Run-time (như `ClassCastException` trong Java) nếu đối tượng thực tế không thuộc kiểu lớp con đó.',
    6, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_008', 'mcq', 'programming-paradigms',
    'Ràng buộc truy cập (Access Modifier) `protected` quy định quyền truy cập dữ liệu như thế nào?',
    ARRAY['Chỉ cho phép truy cập từ bên trong lớp đó và từ các lớp con kế thừa nó (hoặc cùng package)', 'Cho phép truy cập tự do từ bất kỳ đâu ngoài hệ thống', 'Chỉ cho phép truy cập từ bên trong nội bộ lớp đó, cấm hoàn toàn lớp con kế thừa', 'Chỉ cho phép các hàm static truy cập'],
    ARRAY['Chỉ cho phép truy cập từ bên trong lớp đó và từ các lớp con kế thừa nó (hoặc cùng package)']::varchar[],
    'Từ khóa `protected` được thiết kế để chia sẻ tài nguyên giữa cha và các con kế thừa trực tiếp, đồng thời che giấu khỏi các đối tượng bên ngoài.',
    5, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_009', 'short-answer', 'programming-paradigms',
    'Điền từ tiếng Anh viết tắt của bộ 4 tính chất OOP gồm: Encapsulation, Inheritance, Polymorphism, Abstraction. (Viết hoa chữ cái đầu hoặc viết thường toàn bộ)',
    NULL,
    ARRAY['oop', 'OOP']::varchar[],
    'OOP là viết tắt của Object-Oriented Programming (Lập trình hướng đối tượng).',
    5, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  ),
  (
    'cs_prog_q_010', 'short-answer', 'programming-paradigms',
    'Điền tên tiếng Anh của kiểu đa hình xảy ra khi chương trình quyết định gọi phương thức nào dựa vào kiểu thực tế của đối tượng lúc chạy ứng dụng (Runtime). (Viết thường)',
    NULL,
    ARRAY['dynamic polymorphism', 'đa hình động']::varchar[],
    'Đa hình động (Dynamic/Runtime Polymorphism) giúp hệ thống linh hoạt gọi hành vi dựa vào đối tượng thực tế.',
    6, 'OOP Core Concepts', 'cs_programming', 13, 'cs_prog_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Con trỏ & Quản lý Bộ nhớ (cs_prog_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_011', 'mcq', 'programming-paradigms',
    'Vùng nhớ Stack (Ngăn xếp) trong quản lý RAM của máy tính có đặc điểm nào sau đây?',
    ARRAY['Dữ liệu được cấp phát và giải phóng tự động khi ra khỏi phạm vi hàm, tốc độ truy cập cực nhanh', 'Dữ liệu được lưu trữ lâu dài và do lập trình viên giải phóng bằng tay', 'Kích thước lưu trữ không giới hạn và được quét bởi Garbage Collector', 'Lưu trữ các đối tượng cấp phát động qua từ khóa new'],
    ARRAY['Dữ liệu được cấp phát và giải phóng tự động khi ra khỏi phạm vi hàm, tốc độ truy cập cực nhanh']::varchar[],
    'Bộ nhớ Stack hoạt động theo nguyên tắc LIFO, tự động thu hồi khi kết thúc lời gọi hàm nên rất an toàn và nhanh chóng.',
    5, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_012', 'mcq', 'programming-paradigms',
    'Tại sao việc cấp phát dữ liệu trên Heap lại chậm hơn so với trên Stack?',
    ARRAY['Vì OS phải tìm kiếm một vùng trống đủ lớn trên Heap thông qua các thuật toán quản lý bộ nhớ phức tạp và ghi nhận thông tin quản lý', 'Vì Heap nằm ở chip vật lý khác trên bo mạch chủ', 'Vì dữ liệu trên Heap bắt buộc phải mã hóa an toàn trước khi lưu', 'Vì Heap bị giới hạn tần số đọc ghi của CPU'],
    ARRAY['Vì OS phải tìm kiếm một vùng trống đủ lớn trên Heap thông qua các thuật toán quản lý bộ nhớ phức tạp và ghi nhận thông tin quản lý']::varchar[],
    'Cấp phát trên Heap đòi hỏi các thuật toán tìm kiếm ô nhớ trống (như First-Fit, Best-Fit) và có thể gây phân mảnh bộ nhớ (fragmentation), đòi hỏi nhiều chỉ thị máy tính hơn Stack.',
    6, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_013', 'mcq', 'programming-paradigms',
    'Đoạn mã C++ sau đây gây ra lỗi nghiêm trọng nào? \n`void func() { int* p = new int(5); }`',
    ARRAY['Rò rỉ bộ nhớ (Memory Leak)', 'Lỗi phân đoạn (Segmentation Fault)', 'Lỗi tràn bộ nhớ ngăn xếp (Stack Overflow)', 'Lỗi ép kiểu không hợp lệ'],
    ARRAY['Rò rỉ bộ nhớ (Memory Leak)']::varchar[],
    'Biến p là con trỏ cục bộ nằm trên Stack sẽ bị hủy khi kết thúc hàm `func`, tuy nhiên ô nhớ chứa số 5 được cấp phát động trên Heap không được giải phóng (`delete`), gây Memory Leak.',
    6, 'C++ Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_014', 'mcq', 'programming-paradigms',
    'Trong C++11, smart pointer `std::unique_ptr` hoạt động theo cơ chế quản lý nào?',
    ARRAY['Sở hữu độc quyền vùng nhớ vật lý; không cho phép sao chép (copy) mà chỉ cho phép chuyển quyền sở hữu (move)', 'Tự động đếm số lượng tham chiếu để giải phóng bộ nhớ khi đếm về 0', 'Chỉ lưu trữ tạm thời con trỏ mà không có quyền giải phóng bộ nhớ', 'Chuyển toàn bộ dữ liệu con trỏ sang vùng nhớ Stack để tối ưu'],
    ARRAY['Sở hữu độc quyền vùng nhớ vật lý; không cho phép sao chép (copy) mà chỉ cho phép chuyển quyền sở hữu (move)']::varchar[],
    '`unique_ptr` đảm bảo tính duy nhất sở hữu tài nguyên, tối ưu hiệu năng vì không tốn chi phí quản lý bộ đếm tham chiếu.',
    6, 'C++ Smart Pointers', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_015', 'mcq', 'programming-paradigms',
    'Lỗi "Stack Overflow" thường xảy ra nhất trong tình huống lập trình nào sau đây?',
    ARRAY['Hàm đệ quy gọi vô hạn lần không có điểm dừng làm đầy bộ nhớ ngăn xếp', 'Cấp phát mảng tĩnh quá kích thước của bộ nhớ RAM', 'Truy cập vào con trỏ Null hoặc con trỏ rác', 'Khi Garbage Collector hoạt động quá tải trên Heap'],
    ARRAY['Hàm đệ quy gọi vô hạn lần không có điểm dừng làm đầy bộ nhớ ngăn xếp']::varchar[],
    'Mỗi lần gọi hàm, một khung ngăn xếp (Stack Frame) mới chứa các tham số và địa chỉ quay lại được đẩy vào Stack. Đệ quy vô hạn sẽ nhanh chóng vắt kiệt dung lượng giới hạn của Stack.',
    5, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_016', 'mcq', 'programming-paradigms',
    'Tại sao việc xuất hiện "Circular Reference" (Tham chiếu vòng) lại làm hỏng cơ chế dọn rác của `std::shared_ptr`?',
    ARRAY['Hai đối tượng trỏ chéo lẫn nhau giữ bộ đếm tham chiếu luôn lớn hơn 0, làm cả hai không bao giờ được tự động giải phóng', 'Làm tràn ngăn xếp Stack của ứng dụng', 'Khiến chương trình báo lỗi biên dịch', 'Làm tăng tốc độ đọc dữ liệu lên quá nhanh gây tràn bộ đệm'],
    ARRAY['Hai đối tượng trỏ chéo lẫn nhau giữ bộ đếm tham chiếu luôn lớn hơn 0, làm cả hai không bao giờ được tự động giải phóng']::varchar[],
    'Vì mỗi đối tượng đều có ít nhất một shared_ptr trỏ tới từ đối tượng kia, bộ đếm tham chiếu của cả hai không bao giờ chạm mốc 0, dẫn tới rò rỉ bộ nhớ vĩnh viễn.',
    7, 'C++ Smart Pointers', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_017', 'mcq', 'programming-paradigms',
    'Để giải quyết lỗi tham chiếu vòng (Circular Reference) khi sử dụng `std::shared_ptr` trong C++, ta nên kết hợp con trỏ thông minh nào?',
    ARRAY['std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr', 'Con trỏ thô (Raw pointer)'],
    ARRAY['std::weak_ptr']::varchar[],
    '`weak_ptr` giữ tham chiếu không độc quyền (non-owning) và không làm tăng bộ đếm tham chiếu (reference count), giúp phá vỡ vòng lặp tham chiếu chéo.',
    7, 'C++ Smart Pointers', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_018', 'mcq', 'programming-paradigms',
    'Khái niệm "Dangling Pointer" (Con trỏ lơ lửng) nói về trạng thái nào của con trỏ?',
    ARRAY['Con trỏ vẫn trỏ tới địa chỉ của vùng nhớ đã bị giải phóng trước đó', 'Con trỏ được gán giá trị NULL', 'Con trỏ chưa được khai báo kiểu dữ liệu đầu vào', 'Con trỏ trỏ tới vùng nhớ Stack của luồng khác'],
    ARRAY['Con trỏ vẫn trỏ tới địa chỉ của vùng nhớ đã bị giải phóng trước đó']::varchar[],
    'Dangling pointer cực kỳ nguy hiểm vì khi ta đọc hoặc ghi dữ liệu qua nó, chương trình có thể bị sập (crash) hoặc ghi đè lên dữ liệu không mong muốn của đối tượng khác.',
    6, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_019', 'short-answer', 'programming-paradigms',
    'Điền tên vùng nhớ tự động thu hồi chứa các local variables khi thực thi hàm. (Viết thường)',
    NULL,
    ARRAY['stack', 'ngăn xếp']::varchar[],
    'Stack là vùng nhớ có cơ chế tự động giải phóng nhanh chóng.',
    5, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  ),
  (
    'cs_prog_q_020', 'short-answer', 'programming-paradigms',
    'Điền tên tiếng Anh của hiện tượng xảy ra khi bộ nhớ Heap liên tục bị chiếm giữ mà không được giải phóng, gây cạn kiệt bộ nhớ hệ thống. (Viết thường)',
    NULL,
    ARRAY['memory leak', 'rò rỉ bộ nhớ']::varchar[],
    'Memory leak xảy ra khi lập trình viên bỏ quên việc thu hồi tài nguyên Heap.',
    5, 'Memory Management', 'cs_programming', 13, 'cs_prog_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Lập trình Hàm cơ bản (cs_prog_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_021', 'mcq', 'programming-paradigms',
    'Một hàm được gọi là "Pure Function" (Hàm thuần khiết) khi thỏa mãn điều kiện nào sau đây?',
    ARRAY['Luôn trả về cùng kết quả với cùng tham số đầu vào và không thay đổi trạng thái bên ngoài (không có Side Effect)', 'Hàm không sử dụng bất kỳ tham số đầu vào nào', 'Hàm bắt buộc phải có kiểu trả về là void', 'Hàm chỉ chạy được trong môi trường đa luồng'],
    ARRAY['Luôn trả về cùng kết quả với cùng tham số đầu vào và không thay đổi trạng thái bên ngoài (không có Side Effect)']::varchar[],
    'Pure Function giúp chương trình mang tính tiền định (deterministic), cực kỳ dễ kiểm thử và an toàn trong đa luồng.',
    5, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_022', 'mcq', 'programming-paradigms',
    'Trong lập trình hàm, khái niệm "Higher-Order Function" (Hàm bậc cao) nghĩa là gì?',
    ARRAY['Hàm có thể nhận hàm khác làm tham số truyền vào hoặc trả về một hàm khác từ kết quả của nó', 'Hàm chạy ở mức độ ưu tiên cao nhất của hệ điều hành', 'Hàm đệ quy gọi chính nó nhiều lần', 'Hàm được định nghĩa trong lớp trừu tượng cấp cao nhất'],
    ARRAY['Hàm có thể nhận hàm khác làm tham số truyền vào hoặc trả về một hàm khác từ kết quả của nó']::varchar[],
    'Higher-Order Function coi hàm như công dân hạng nhất (first-class citizen) giúp tăng tính linh hoạt và tái sử dụng mã nguồn.',
    6, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_023', 'mcq', 'programming-paradigms',
    'Hàm `Map` trong lập trình hàm thực hiện thao tác nào trên danh sách (collection)?',
    ARRAY['Áp dụng một hàm biến đổi lên từng phần tử và trả về danh sách mới có cùng số lượng phần tử', 'Lọc ra các phần tử thỏa mãn điều kiện logic', 'Gộp toàn bộ các phần tử lại thành một giá trị duy nhất', 'Tìm kiếm vị trí của phần tử trong mảng'],
    ARRAY['Áp dụng một hàm biến đổi lên từng phần tử và trả về danh sách mới có cùng số lượng phần tử']::varchar[],
    'Hàm `Map` biến đổi một-một từ danh sách đầu vào sang danh sách kết quả, giữ nguyên trật tự và số lượng phần tử.',
    5, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_024', 'mcq', 'programming-paradigms',
    'Hàm `Reduce` (hoặc Fold) trong lập trình hàm có vai trò gì?',
    ARRAY['Tích lũy và kết hợp toàn bộ các phần tử trong danh sách thành một giá trị kết quả duy nhất', 'Loại bỏ các phần tử trùng lặp trong mảng', 'Chia đôi danh sách thành hai phần bằng nhau', 'Sắp xếp danh sách theo thứ tự tăng dần'],
    ARRAY['Tích lũy và kết hợp toàn bộ các phần tử trong danh sách thành một giá trị kết quả duy nhất']::varchar[],
    'Hàm `Reduce` duyệt qua các phần tử và kết hợp chúng luỹ tiến (ví dụ: tính tổng, tìm max, nối chuỗi).',
    5, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_025', 'mcq', 'programming-paradigms',
    'Tại sao tính bất biến (Immutability) lại giúp mã nguồn giảm thiểu tối đa các lỗi chạy bất ngờ (bugs)?',
    ARRAY['Vì dữ liệu không thể thay đổi sau khi tạo, loại bỏ khả năng trạng thái đối tượng bị sửa đổi sai lệch bởi các luồng khác ngoài ý muốn', 'Vì tính bất biến làm tăng tốc độ biên dịch chương trình', 'Vì dữ liệu bất biến tự động được lưu trữ trên bộ nhớ Stack', 'Vì nó ngăn cản lập trình viên viết các câu lệnh rẽ nhánh if-else'],
    ARRAY['Vì dữ liệu không thể thay đổi sau khi tạo, loại bỏ khả năng trạng thái đối tượng bị sửa đổi sai lệch bởi các luồng khác ngoài ý muốn']::varchar[],
    'Không có thay đổi trạng thái (no state mutations) đồng nghĩa với việc loại bỏ hoàn toàn các lỗi tác động phụ bất ngờ giữa các module và an toàn tuyệt đối khi chạy đa luồng.',
    6, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_026', 'mcq', 'programming-paradigms',
    'Đoạn mã JavaScript sau đây: `const prices = [10, 20, 30]; const doubled = prices.map(p => p * 2);` sẽ trả về mảng `doubled` có giá trị là gì?',
    ARRAY['[20, 40, 60]', '[10, 20, 30]', '[20, 20, 30]', '[60]']::varchar[],
    ARRAY['[20, 40, 60]']::varchar[],
    'Hàm map nhân đôi giá trị của từng phần tử trong mảng gốc, tạo ra mảng mới `[20, 40, 60]`.',
    5, 'Functional Programming in JS', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_027', 'mcq', 'programming-paradigms',
    'Khái niệm "Side Effect" (Tác động phụ) của một hàm nói về điều gì?',
    ARRAY['Khi hàm thay đổi trạng thái của biến toàn cục hoặc thực hiện ghi file, ghi console, thay đổi dữ liệu bên ngoài phạm vi của nó', 'Khi hàm trả về giá trị kiểu boolean', 'Khi hàm chạy quá thời gian quy định của CPU', 'Khi hàm được gọi bởi một luồng bất đồng bộ'],
    ARRAY['Khi hàm thay đổi trạng thái của biến toàn cục hoặc thực hiện ghi file, ghi console, thay đổi dữ liệu bên ngoài phạm vi của nó']::varchar[],
    'Tác động phụ (Side Effect) là bất kỳ hành động nào làm thay đổi trạng thái nằm ngoài phạm vi tính toán cục bộ của hàm.',
    6, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_028', 'mcq', 'programming-paradigms',
    'Kỹ thuật "Currying" trong lập trình hàm là quá trình chuyển đổi một hàm nhận nhiều tham số thành chuỗi các hàm như thế nào?',
    ARRAY['Thành chuỗi các hàm, mỗi hàm chỉ nhận duy nhất một tham số', 'Thành một hàm chạy đệ quy vô hạn', 'Thành các lớp đối tượng kế thừa lẫn nhau', 'Thành các hàm static không có trạng thái'],
    ARRAY['Thành chuỗi các hàm, mỗi hàm chỉ nhận duy nhất một tham số']::varchar[],
    'Currying biến đổi một hàm $f(a, b, c)$ thành chuỗi các hàm gọi liên tiếp $f(a)(b)(c)$, giúp tạo ra các hàm chuyên biệt từ hàm tổng quát dễ dàng (partial application).',
    7, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_029', 'short-answer', 'programming-paradigms',
    'Điền tên tiếng Anh của các hàm ẩn danh ngắn gọn thường được định nghĩa bằng ký hiệu mũi tên (arrow functions) hoặc dấu lambda. (Viết thường)',
    NULL,
    ARRAY['lambda expression', 'lambda', 'arrow function']::varchar[],
    'Lambda là cú pháp viết hàm ẩn danh cực kỳ cô đọng.',
    5, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  ),
  (
    'cs_prog_q_030', 'short-answer', 'programming-paradigms',
    'Trong bộ ba hàm Map, Filter, Reduce, hàm nào có vai trò lọc bỏ các phần tử không đạt điều kiện logic khỏi danh sách? (Viết thường)',
    NULL,
    ARRAY['filter']::varchar[],
    'Hàm filter loại bỏ các phần tử trả về false trong biểu thức logic kiểm tra.',
    5, 'Functional Programming', 'cs_programming', 13, 'cs_prog_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Lập trình bất đồng bộ & Đa luồng (cs_prog_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_031', 'mcq', 'software-reliability',
    'Sự khác biệt cơ bản giữa Tiến trình (Process) và Luồng (Thread) trong hệ điều hành là gì?',
    ARRAY['Process sở hữu không gian địa chỉ độc lập; các Thread trong cùng một Process chia sẻ chung tài nguyên và bộ nhớ Heap', 'Thread chạy độc lập không cần nằm trong Process', 'Process chạy nhanh hơn Thread gấp 10 lần', 'Process chỉ chạy được trên một nhân CPU duy nhất'],
    ARRAY['Process sở hữu không gian địa chỉ độc lập; các Thread trong cùng một Process chia sẻ chung tài nguyên và bộ nhớ Heap']::varchar[],
    'Process là đơn vị cấp phát tài nguyên độc lập của OS. Thread chia sẻ chung không gian bộ nhớ của Process nên việc trao đổi dữ liệu rất nhanh nhưng cần đồng bộ hóa.',
    6, 'Operating Systems', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_032', 'mcq', 'software-reliability',
    'Hiện tượng "Race Condition" xảy ra khi nào trong hệ thống đa luồng?',
    ARRAY['Khi hai hoặc nhiều luồng cùng đọc và ghi vào một tài nguyên dùng chung đồng thời mà không được đồng bộ hóa, dẫn đến dữ liệu sai lệch', 'Khi hai luồng chạy đua về thời gian xem luồng nào kết thúc trước', 'Khi một luồng bị treo do lỗi tràn bộ nhớ', 'Khi CPU tăng tốc độ xử lý luồng lên tối đa'],
    ARRAY['Khi hai hoặc nhiều luồng cùng đọc và ghi vào một tài nguyên dùng chung đồng thời mà không được đồng bộ hóa, dẫn đến dữ liệu sai lệch']::varchar[],
    'Race condition xuất hiện khi kết quả cuối cùng phụ thuộc vào trình tự thực thi của các luồng. Việc ghi đè chéo làm hỏng dữ liệu.',
    6, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_033', 'mcq', 'software-reliability',
    'Bộ khóa "Mutex" (Mutual Exclusion) hoạt động theo nguyên lý nào để bảo vệ tài nguyên dùng chung?',
    ARRAY['Chỉ cho phép duy nhất một luồng sở hữu khóa và truy cập tài nguyên tại một thời điểm; các luồng khác phải xếp hàng chờ', 'Cho phép tối đa 5 luồng cùng ghi dữ liệu đồng thời', 'Tự động sao lưu dữ liệu sang vùng nhớ khác khi phát hiện tranh chấp', 'Tự động chia nhỏ tài nguyên dùng chung thành các phần độc lập'],
    ARRAY['Chỉ cho phép duy nhất một luồng sở hữu khóa và truy cập tài nguyên tại một thời điểm; các luồng khác phải xếp hàng chờ']::varchar[],
    'Mutex là cơ chế khóa nhị phân giúp cô lập tuyệt đối luồng truy cập để bảo vệ tính toàn vẹn dữ liệu trong critical section.',
    5, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_034', 'mcq', 'software-reliability',
    'Sự khác biệt cơ bản giữa Semaphore và Mutex là gì?',
    ARRAY['Mutex chỉ cho phép 1 luồng giữ khóa; Semaphore cho phép tối đa N luồng truy cập đồng thời dựa trên số lượng giấy phép (permits)', 'Mutex dùng trên bộ nhớ Stack còn Semaphore dùng trên Heap', 'Semaphore chỉ chạy được trên môi trường đơn luồng', 'Mutex không thể ngăn cản lỗi tranh chấp dữ liệu'],
    ARRAY['Mutex chỉ cho phép 1 luồng giữ khóa; Semaphore cho phép tối đa N luồng truy cập đồng thời dựa trên số lượng giấy phép (permits)']::varchar[],
    'Mutex là khoá nhị phân (0 và 1). Semaphore (Counting Semaphore) quản lý một nhóm tài nguyên có số lượng giới hạn N.',
    6, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_035', 'mcq', 'software-reliability',
    'Tình huống nào sau đây được gọi là "Deadlock"?',
    ARRAY['Hai luồng treo vô hạn vì luồng này chờ giải phóng khóa mà luồng kia đang giữ và ngược lại', 'Khi một luồng bị hệ điều hành tắt đột ngột', 'Khi luồng chạy quá nhanh làm quá tải hệ thống tản nhiệt CPU', 'Khi chương trình kết thúc và giải phóng toàn bộ luồng'],
    ARRAY['Hai luồng treo vô hạn vì luồng này chờ giải phóng khóa mà luồng kia đang giữ và ngược lại']::varchar[],
    'Deadlock (Khóa chết) xảy ra do phụ thuộc vòng tròn tài nguyên bị khóa, khiến không bên nào có thể tiến tiếp.',
    6, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_036', 'mcq', 'software-reliability',
    'Mô hình lập trình Asynchronous (Bất đồng bộ) với cơ chế Event Loop (ví dụ trong Node.js) giúp giải quyết vấn đề hiệu năng nào?',
    ARRAY['Tránh việc chặn luồng chính (blocking) khi thực hiện các tác vụ I/O (đọc file, gọi mạng) bằng cách đẩy tác vụ xuống background', 'Tăng tốc độ tính toán số học của CPU', 'Tự động song song hóa mọi câu lệnh tuần tự', 'Chuyển đổi toàn bộ mã nguồn sang ngôn ngữ C++'],
    ARRAY['Tránh việc chặn luồng chính (blocking) khi thực hiện các tác vụ I/O (đọc file, gọi mạng) bằng cách đẩy tác vụ xuống background']::varchar[],
    'Event Loop quản lý các tác vụ I/O bất đồng bộ bằng hàng đợi callback, cho phép một luồng đơn vẫn xử lý được hàng ngàn kết nối đồng thời mà không bị treo.',
    7, 'Node.js Design Patterns', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_037', 'mcq', 'software-reliability',
    'Cú pháp `async/await` được thiết kế nhằm mục đích gì trong lập trình bất đồng bộ?',
    ARRAY['Giúp viết mã nguồn bất đồng bộ trông giống như mã nguồn tuần tự (đồng bộ), dễ đọc và bảo trì hơn so với viết chuỗi callback/promise', 'Để tăng tốc độ chạy của CPU', 'Bắt buộc ứng dụng phải chạy song song đa luồng thực tế', 'Tự động bỏ qua mọi ngoại lệ phát sinh khi chạy'],
    ARRAY['Giúp viết mã nguồn bất đồng bộ trông giống như mã nguồn tuần tự (đồng bộ), dễ đọc và bảo trì hơn so với viết chuỗi callback/promise']::varchar[],
    'Cú pháp `async/await` là một lớp bọc cú pháp (syntactic sugar) cho Promise, giúp loại bỏ thảm họa lồng callback (callback hell).',
    5, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_038', 'mcq', 'software-reliability',
    'Trong lập trình đa luồng, từ khóa `volatile` dùng cho một biến có tác dụng gì?',
    ARRAY['Báo cho trình biên dịch không được tối ưu lưu biến vào thanh ghi (cache register) mà phải luôn đọc/ghi trực tiếp từ bộ nhớ RAM chính', 'Khóa dòng dữ liệu ngăn không cho luồng khác sửa đổi', 'Tự động chuyển kiểu dữ liệu của biến sang dạng string', 'Giải phóng biến ra khỏi bộ nhớ lập tức'],
    ARRAY['Báo cho trình biên dịch không được tối ưu lưu biến vào thanh ghi (cache register) mà phải luôn đọc/ghi trực tiếp từ bộ nhớ RAM chính']::varchar[],
    'Từ khóa `volatile` đảm bảo tính hiển thị (visibility): khi một luồng thay đổi giá trị của biến, các luồng khác sẽ lập tức nhìn thấy giá trị mới thay vì đọc giá trị cũ lưu trong cache thanh ghi riêng của luồng.',
    7, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_039', 'short-answer', 'software-reliability',
    'Viết tên của cơ chế khóa nhị phân (Mutual Exclusion) được thiết kế để chỉ cho phép duy nhất một luồng truy cập tài nguyên tại một thời điểm. (Viết thường)',
    NULL,
    ARRAY['mutex']::varchar[],
    'Mutex bảo vệ các critical sections an toàn trong đa luồng.',
    5, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  ),
  (
    'cs_prog_q_040', 'short-answer', 'software-reliability',
    'Điền tên tiếng Anh của lỗi xảy ra khi hai luồng cùng khóa chéo tài nguyên của nhau làm toàn bộ chương trình bị treo cứng vô hạn. (Viết thường)',
    NULL,
    ARRAY['deadlock', 'khóa chết']::varchar[],
    'Deadlock yêu cầu phải khởi động lại hoặc ngắt luồng xử lý.',
    5, 'Concurrency in Practice', 'cs_programming', 13, 'cs_prog_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Xử lý ngoại lệ & Ghi log (cs_prog_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_041', 'mcq', 'software-reliability',
    'Khối lệnh `finally` trong cú pháp `try-catch-finally` có đặc trưng nào?',
    ARRAY['Luôn được thực thi bất kể có ngoại lệ xảy ra hay không, thường dùng để dọn dẹp giải phóng tài nguyên', 'Chỉ được thực thi khi có ngoại lệ xảy ra trong khối try', 'Chỉ được thực thi khi không có bất kỳ ngoại lệ nào xảy ra', 'Dùng để ném tiếp ngoại lệ lên lớp cha'],
    ARRAY['Luôn được thực thi bất kể có ngoại lệ xảy ra hay không, thường dùng để dọn dẹp giải phóng tài nguyên']::varchar[],
    'Khối `finally` bảo đảm các tác vụ cleanup (đóng file, ngắt kết nối database) luôn được chạy ngay cả khi chương trình gặp lỗi nghiêm trọng.',
    5, 'Exception Handling', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_042', 'mcq', 'software-reliability',
    'Sự khác biệt cơ bản giữa Checked Exception và Unchecked Exception trong Java là gì?',
    ARRAY['Checked Exception được trình biên dịch kiểm tra và bắt buộc phải xử lý lúc compile; Unchecked Exception xảy ra lúc runtime do lỗi logic của lập trình viên', 'Checked Exception chỉ chạy được trên môi trường Linux', 'Unchecked Exception bắt buộc phải dùng từ khóa throws ở đầu hàm', 'Checked Exception không bao giờ làm sập ứng dụng'],
    ARRAY['Checked Exception được trình biên dịch kiểm tra và bắt buộc phải xử lý lúc compile; Unchecked Exception xảy ra lúc runtime do lỗi logic của lập trình viên']::varchar[],
    'Checked Exception (như FileNotFoundException) buộc lập trình viên phải chuẩn bị phương án xử lý lỗi từ trước. Unchecked Exception (như NullPointerException) thường phản ánh lỗi viết mã cẩu thả.',
    6, 'Java Programming', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_043', 'mcq', 'software-reliability',
    'Hành vi "nuốt ngoại lệ" (swallowing exception) là gì và tại sao nó lại bị coi là phản mẫu thiết kế (anti-pattern)?',
    ARRAY['Bắt ngoại lệ bằng catch nhưng để trống khối xử lý và không ghi log, làm mất hoàn toàn dấu vết của lỗi khi hệ thống gặp sự cố', 'Tự động sửa lỗi mà không cần báo cáo', 'Chuyển ngoại lệ thành một luồng xử lý khác', 'Ném ngoại lệ liên tục lên server'],
    ARRAY['Bắt ngoại lệ bằng catch nhưng để trống khối xử lý và không ghi log, làm mất hoàn toàn dấu vết của lỗi khi hệ thống gặp sự cố']::varchar[],
    'Nuốt ngoại lệ che giấu lỗi thực sự, khiến hệ thống chạy sai lệch mà lập trình viên không thể tìm ra nguyên nhân vì không có log ghi lại.',
    6, 'Best Programming Practices', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_044', 'mcq', 'software-reliability',
    'Cấp độ ghi log "DEBUG" nên được sử dụng trong trường hợp nào?',
    ARRAY['Ghi lại các thông tin cực kỳ chi tiết của luồng chạy phục vụ lập trình viên tìm lỗi tại môi trường cục bộ (local/dev)', 'Ghi nhận sự kiện sập hệ thống thanh toán chính', 'Cảnh báo tài nguyên RAM máy chủ sắp đầy', 'Ghi thông tin đăng nhập thành công của người dùng ở production'],
    ARRAY['Ghi lại các thông tin cực kỳ chi tiết của luồng chạy phục vụ lập trình viên tìm lỗi tại môi trường cục bộ (local/dev)']::varchar[],
    'Log DEBUG chứa các chi tiết biến số, luồng vòng lặp lặt vặt. Cấp độ này sẽ bị tắt đi khi deploy lên môi trường Production để tránh đầy ổ cứng.',
    5, 'Logging Best Practices', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_045', 'mcq', 'software-reliability',
    'Hiện tượng "NullPointerException" thuộc nhóm ngoại lệ nào sau đây?',
    ARRAY['Unchecked Exception (Runtime Exception)', 'Checked Exception', 'Compile-time Error', 'Syntax Error'],
    ARRAY['Unchecked Exception (Runtime Exception)']::varchar[],
    'NullPointerException xảy ra khi ta cố gắng gọi phương thức hoặc truy cập thuộc tính trên một tham chiếu đang trỏ tới giá trị `null`.',
    5, 'Java Exceptions', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_046', 'mcq', 'software-reliability',
    'Giao thức tự động đóng tài nguyên "try-with-resources" (trong Java) hoạt động dựa trên điều kiện nào của đối tượng khai báo?',
    ARRAY['Đối tượng đó phải triển khai interface `AutoCloseable`', 'Đối tượng bắt buộc phải có từ khóa static', 'Đối tượng phải được lưu trữ trên bộ nhớ Stack', 'Đối tượng phải được thừa kế từ lớp Thread'],
    ARRAY['Đối tượng đó phải triển khai interface `AutoCloseable`']::varchar[],
    'try-with-resources tự động gọi phương thức `close()` khi thoát khỏi khối try nhờ vào việc đối tượng kế thừa AutoCloseable, tránh rò rỉ file descriptor.',
    7, 'Java Programming', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_047', 'mcq', 'software-reliability',
    'Cấp độ ghi log nào được khuyên dùng để ghi lại thông tin khi một tiến trình nghiệp vụ diễn ra thành công bình thường (ví dụ: "Người dùng đăng ký tài khoản thành công")?',
    ARRAY['INFO', 'DEBUG', 'WARN', 'ERROR']::varchar[],
    ARRAY['INFO']::varchar[],
    'INFO dùng để ghi lại các mốc hoạt động bình thường, ổn định quan trọng của hệ thống.',
    5, 'Logging Best Practices', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_048', 'mcq', 'software-reliability',
    'Tại sao việc ghi log cấu trúc (structured logging - ví dụ dạng JSON) lại vượt trội hơn ghi log text dòng thông thường?',
    ARRAY['Giúp các công cụ thu thập và phân tích log tập trung (như ELK stack) dễ dàng parse, truy vấn lọc và lập chỉ mục các trường thông tin', 'Vì ghi log JSON làm ứng dụng chạy nhanh hơn gấp 10 lần', 'Vì log JSON tự động sửa được lỗi cú pháp của code', 'Vì file JSON chiếm ít dung lượng ổ đĩa hơn'],
    ARRAY['Giúp các công cụ thu thập và phân tích log tập trung (như ELK stack) dễ dàng parse, truy vấn lọc và lập chỉ mục các trường thông tin']::varchar[],
    'Structured logging phân tách rõ các trường như `timestamp`, `level`, `userId`, `message` dưới dạng key-value, phục vụ tìm kiếm vết lỗi cực kỳ nhanh.',
    6, 'Logging Best Practices', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_049', 'short-answer', 'software-reliability',
    'Viết tên khối lệnh trong cấu trúc try-catch luôn được đảm bảo thực thi cuối cùng để giải phóng file, kết nối DB. (Viết thường)',
    NULL,
    ARRAY['finally']::varchar[],
    'Khối finally đảm bảo cleanup tài nguyên an toàn.',
    5, 'Exception Handling', 'cs_programming', 13, 'cs_prog_05'
  ),
  (
    'cs_prog_q_050', 'short-answer', 'software-reliability',
    'Ghi tên viết tắt của cấp độ log cao nhất biểu thị lỗi cực kỳ nghiêm trọng làm ứng dụng ngừng hoạt động ngay lập tức. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['FATAL', 'CRITICAL']::varchar[],
    'Log FATAL/CRITICAL cảnh báo sự cố khẩn cấp làm sập hệ thống.',
    5, 'Logging Best Practices', 'cs_programming', 13, 'cs_prog_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Lập trình Tổng quát (cs_prog_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_051', 'mcq', 'design-principles',
    'Mục tiêu lớn nhất của việc áp dụng Generics / Templates trong thiết kế phần mềm là gì?',
    ARRAY['Tái sử dụng mã nguồn cho nhiều kiểu dữ liệu khác nhau mà vẫn đảm bảo an toàn kiểu dữ liệu (Type Safety) ngay lúc biên dịch', 'Tăng tốc độ chạy thực tế của CPU', 'Cho phép ép kiểu tự động lúc runtime', 'Giảm dung lượng file nhị phân đầu ra'],
    ARRAY['Tái sử dụng mã nguồn cho nhiều kiểu dữ liệu khác nhau mà vẫn đảm bảo an toàn kiểu dữ liệu (Type Safety) ngay lúc biên dịch']::varchar[],
    'Lập trình tổng quát loại bỏ việc viết lặp code cho từng kiểu dữ liệu riêng lẻ và phát hiện lỗi ép kiểu ngay khi compile thay vì runtime.',
    5, 'Generic Programming', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_052', 'mcq', 'design-principles',
    'Cơ chế "Type Erasure" trong Generics của ngôn ngữ Java hoạt động như thế nào?',
    ARRAY['Xóa bỏ toàn bộ thông tin kiểu Generics lúc biên dịch và thay thế bằng kiểu Object thô trong Bytecode để đảm bảo tương thích ngược', 'Xoá sạch dữ liệu trên RAM khi chạy hàm', 'Tự động chuyển đổi toàn bộ kiểu dữ liệu sang String', 'Phát hiện lỗi ép kiểu sai lúc runtime'],
    ARRAY['Xóa bỏ toàn bộ thông tin kiểu Generics lúc biên dịch và thay thế bằng kiểu Object thô trong Bytecode để đảm bảo tương thích ngược']::varchar[],
    'Java biên dịch kiểm tra Type Safety, sau đó xóa bỏ Generics (chuyển thành Object) để tương thích ngược với các phiên bản máy ảo Java cũ.',
    7, 'Java Generics', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_053', 'mcq', 'design-principles',
    'Sự khác biệt cốt lõi trong biên dịch Templates của C++ so với Generics của Java là gì?',
    ARRAY['C++ biên dịch sinh mã nguồn vật lý độc lập cho từng kiểu dữ liệu sử dụng (Instantiation); Java xóa kiểu và dùng chung mã nguồn vật lý (Type Erasure)', 'C++ biên dịch chậm hơn Java gấp 100 lần', 'Java Generics chạy nhanh hơn C++ Templates', 'C++ không hỗ trợ kiểm tra kiểu dữ liệu an toàn'],
    ARRAY['C++ biên dịch sinh mã nguồn vật lý độc lập cho từng kiểu dữ liệu sử dụng (Instantiation); Java xóa kiểu và dùng chung mã nguồn vật lý (Type Erasure)']::varchar[],
    'C++ Instantiation tạo ra mã máy tối ưu hoá cao cho từng kiểu dữ liệu cụ thể (như vector<int> độc lập với vector<double>), nhưng nhược điểm là làm phình to file nhị phân đầu ra (code bloat).',
    7, 'C++ Templates', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_054', 'mcq', 'design-principles',
    'Trong TypeScript, đoạn khai báo: `function show<T extends string>(arg: T): void` quy định ràng buộc nào cho kiểu Generic `T`?',
    ARRAY['Kiểu T truyền vào bắt buộc phải là kiểu string hoặc lớp con của string', 'Kiểu T phải là một mảng dữ liệu', 'Kiểu T có thể nhận bất kỳ kiểu dữ liệu nào', 'Kiểu T bắt buộc phải có thuộc tính length'],
    ARRAY['Kiểu T truyền vào bắt buộc phải là kiểu string hoặc lớp con của string']::varchar[],
    'Từ khóa `extends` định nghĩa ràng buộc biên (bound constraint), giới hạn kiểu dữ liệu hợp lệ chấp nhận bởi tham số generic.',
    6, 'TS Generics', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_055', 'mcq', 'design-principles',
    'Tại sao việc sử dụng lớp Generic (ví dụ: `List<User>`) lại an toàn hơn sử dụng lớp chứa kiểu Object chung chung (`List<Object>`)?',
    ARRAY['Vì trình biên dịch sẽ chặn lỗi sai kiểu dữ liệu ngay khi compile; không cần phải thực hiện ép kiểu thủ công khi lấy dữ liệu ra khỏi danh sách', 'Vì List<User> chạy tiết kiệm RAM hơn', 'Vì List<User> tự động mã hóa dữ liệu', 'Vì List<Object> không thể chứa được dữ liệu null'],
    ARRAY['Vì trình biên dịch sẽ chặn lỗi sai kiểu dữ liệu ngay khi compile; không cần phải thực hiện ép kiểu thủ công khi lấy dữ liệu ra khỏi danh sách']::varchar[],
    'Dùng List<Object> bắt buộc phải ép kiểu thủ công lúc đọc dữ liệu, dễ gây lỗi ClassCastException lúc runtime nếu gán nhầm kiểu.',
    6, 'Generic Programming', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_056', 'mcq', 'design-principles',
    'Trong Java, ký tự đại diện wildcard `? extends ParentClass` thể hiện đặc tính nào của Generics?',
    ARRAY['Hiệp biến (Covariance) - Cho phép đọc dữ liệu của ParentClass hoặc con của nó từ danh sách, nhưng cấm ghi dữ liệu vào danh sách', 'Bất biến (Invariance) - Không cho phép thay đổi bất kỳ thuộc tính nào', 'Phản biến (Contravariance) - Cho phép ghi dữ liệu nhưng cấm đọc', 'Đa kế thừa - Cho phép kế thừa đồng thời nhiều lớp'],
    ARRAY['Hiệp biến (Covariance) - Cho phép đọc dữ liệu của ParentClass hoặc con của nó từ danh sách, nhưng cấm ghi dữ liệu vào danh sách']::varchar[],
    'Covariance cho phép truyền vào danh sách con (như List<Dog> thay cho List<Animal>) phục vụ thao tác đọc dữ liệu an toàn, chặn thao tác ghi vì compiler không biết chính xác kiểu con thực tế là gì.',
    7, 'Java Generics', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_057', 'mcq', 'design-principles',
    'Trong Java, ký tự đại diện wildcard `? super ChildClass` thể hiện đặc tính nào của Generics?',
    ARRAY['Phản biến (Contravariance) - Cho phép ghi dữ liệu thuộc kiểu ChildClass vào danh sách, nhưng chỉ đọc ra được kiểu Object cơ bản', 'Hiệp biến (Covariance) - Cho phép đọc nhưng cấm ghi', 'Bất biến (Invariance) - Chỉ cho phép kiểu ChildClass chính xác', 'Xóa kiểu dữ liệu toàn phần'],
    ARRAY['Phản biến (Contravariance) - Cho phép ghi dữ liệu thuộc kiểu ChildClass vào danh sách, nhưng chỉ đọc ra được kiểu Object cơ bản']::varchar[],
    'Contravariance (`? super ChildClass`) cho phép ghi dữ liệu an toàn vì mọi lớp cha đều chứa được kiểu con ChildClass, nhưng khi đọc ra chỉ đảm bảo kiểu Object.',
    7, 'Java Generics', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_058', 'mcq', 'design-principles',
    'Để thiết lập hàm Generic nhận 2 kiểu dữ liệu tổng quát khác nhau, ta khai báo như thế nào trong C#?',
    ARRAY['public void MyMethod<T1, T2>(T1 arg1, T2 arg2)', 'public void MyMethod<T>(T arg1, T arg2)', 'public void MyMethod(object arg1, object arg2)', 'public void MyMethod<dynamic>(dynamic arg1, dynamic arg2)'],
    ARRAY['public void MyMethod<T1, T2>(T1 arg1, T2 arg2)']::varchar[],
    'Ta có thể định nghĩa bao nhiêu tham số generic tuỳ ý bằng cách phân tách chúng bằng dấu phẩy trong cặp ngoặc nhọn.',
    5, 'C# Generics', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_059', 'short-answer', 'design-principles',
    'Điền tên tiếng Anh của tính năng kiểm tra tính hợp lệ kiểu dữ liệu ngay lúc biên dịch để đảm bảo hệ thống không bị lỗi ép kiểu khi chạy. (Viết thường)',
    NULL,
    ARRAY['type safety', 'an toàn kiểu']::varchar[],
    'Type safety là mục tiêu cốt lõi của lập trình generic.',
    5, 'Generic Programming', 'cs_programming', 13, 'cs_prog_06'
  ),
  (
    'cs_prog_q_060', 'short-answer', 'design-principles',
    'Trong C++, cấu trúc lập trình tổng quát cho phép biên dịch sinh mã nguồn động cho từng kiểu dữ liệu cụ thể được gọi là gì? (Viết thường số nhiều)',
    NULL,
    ARRAY['templates', 'template']::varchar[],
    'C++ Templates đem lại hiệu năng tối đa nhờ tối ưu hoá riêng biệt lúc biên dịch.',
    5, 'C++ Templates', 'cs_programming', 13, 'cs_prog_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: 5 Nguyên lý Thiết kế hướng đối tượng SOLID (cs_prog_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_061', 'mcq', 'design-principles',
    'Nguyên lý Single Responsibility Principle (SRP - Đơn nhiệm) quy định điều gì?',
    ARRAY['Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ chịu trách nhiệm cho một chức năng duy nhất)', 'Một phương thức chỉ được phép gọi duy nhất một hàm khác', 'Một dự án chỉ được phép kết nối vào duy nhất một database chính', 'Tất cả các biến thành viên phải là private'],
    ARRAY['Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ chịu trách nhiệm cho một chức năng duy nhất)']::varchar[],
    'SRP giúp lớp có độ kết dính cao (high cohesion) và độc lập (low coupling), dễ dàng sửa đổi chức năng mà không gây ảnh hưởng liên đới đến chức năng khác.',
    5, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_062', 'mcq', 'design-principles',
    'Nguyên lý Open/Closed Principle (OCP - Mở/Đóng) quy định điều gì?',
    ARRAY['Lớp nên được mở cho việc mở rộng (thêm tính năng mới) nhưng đóng cho việc sửa đổi mã nguồn hiện có', 'Các file mã nguồn phải đóng kín không cho phép đọc', 'Các hàm public bắt buộc phải được kế thừa', 'Chỉ mở cổng mạng cần thiết và đóng các cổng mạng khác'],
    ARRAY['Lớp nên được mở cho việc mở rộng (thêm tính năng mới) nhưng đóng cho việc sửa đổi mã nguồn hiện có']::varchar[],
    'OCP khuyến khích việc sử dụng Abstraction và Polymorphism. Thay vì sửa đổi code hiện có (dễ gây lỗi cho các module đang chạy ổn định), ta mở rộng hệ thống bằng cách kế thừa và ghi đè.',
    6, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_063', 'mcq', 'design-principles',
    'Nếu lớp con kế thừa lớp cha nhưng làm thay đổi hành vi logic cơ bản của cha (ví dụ ném ra ngoại lệ KhôngHỗTrợ ở phương thức mà cha quy định chạy bình thường), thiết kế này vi phạm nguyên lý nào?',
    ARRAY['Liskov Substitution Principle (LSP)', 'Single Responsibility Principle (SRP)', 'Interface Segregation Principle (ISP)', 'Dependency Inversion Principle (DIP)'],
    ARRAY['Liskov Substitution Principle (LSP)']::varchar[],
    'Nguyên lý LSP quy định các lớp con phải thay thế được cho lớp cha mà không làm thay đổi tính đúng đắn của chương trình.',
    6, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_064', 'mcq', 'design-principles',
    'Nguyên lý Interface Segregation Principle (ISP - Phân tách Interface) khuyên điều gì?',
    ARRAY['Thà thiết kế nhiều Interface nhỏ, chuyên biệt còn hơn tạo một Interface lớn chứa quá nhiều phương thức bắt các lớp con phải triển khai dù không dùng tới', 'Bắt buộc phải tách biệt Interface và Class thành hai thư mục riêng', 'Các phương thức của Interface phải được đồng bộ hóa', 'Không được sử dụng Interface trong đa luồng'],
    ARRAY['Thà thiết kế nhiều Interface nhỏ, chuyên biệt còn hơn tạo một Interface lớn chứa quá nhiều phương thức bắt các lớp con phải triển khai dù không dùng tới']::varchar[],
    'ISP ngăn cản sự phụ thuộc dư thừa của Client vào các phương thức mà họ không sử dụng, giúp thiết kế linh hoạt hơn.',
    6, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_065', 'mcq', 'design-principles',
    'Nguyên lý Dependency Inversion Principle (DIP - Đảo ngược phụ thuộc) quy định điều gì?',
    ARRAY['Các module cấp cao không nên phụ thuộc vào các module cấp thấp; cả hai nên phụ thuộc vào sự trừu tượng (Interface/Abstract Class)', 'Các lớp con bắt buộc phải phụ thuộc vào lớp cha', 'Các phương thức static không được gọi các phương thức non-static', 'Database phải được đặt phụ thuộc vào mã nguồn ứng dụng'],
    ARRAY['Các module cấp cao không nên phụ thuộc vào các module cấp thấp; cả hai nên phụ thuộc vào sự trừu tượng (Interface/Abstract Class)']::varchar[],
    'DIP giúp phá vỡ sự phụ thuộc trực tiếp cứng nhắc (hard dependency). Ta sử dụng Dependency Injection để bơm triển khai thực tế vào lớp sử dụng thông qua Interface.',
    7, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_066', 'mcq', 'design-principles',
    'Tình huống nào sau đây vi phạm nguyên lý Single Responsibility (SRP)?',
    ARRAY['Lớp UserManager vừa thực hiện thêm tài khoản vào DB, vừa gửi email chào mừng và vừa tự in xuất hóa đơn dạng PDF', 'Lớp UserManager chỉ chịu trách nhiệm quản lý thông tin tài khoản', 'Lớp EmailSender chuyên gửi email dịch vụ', 'Lớp InvoicePrinter chuyên xuất hóa đơn'],
    ARRAY['Lớp UserManager vừa thực hiện thêm tài khoản vào DB, vừa gửi email chào mừng và vừa tự in xuất hóa đơn dạng PDF']::varchar[],
    'Lớp này có quá nhiều trách nhiệm độc lập. Khi cấu trúc lưu DB thay đổi, mẫu email thay đổi hoặc định dạng PDF thay đổi, lớp này đều phải sửa đổi.',
    5, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_067', 'mcq', 'design-principles',
    'Tại sao việc thiết kế lớp `Rectangle` (Chữ nhật) và lớp `Square` (Vuông) kế thừa nó dễ dẫn tới vi phạm nguyên lý Liskov (LSP)?',
    ARRAY['Vì hình vuông quy định hai cạnh bằng nhau. Nếu thay đổi chiều rộng của đối tượng Square qua hàm của Rectangle, chiều dài của nó cũng tự động đổi, làm phá vỡ logic tính diện tích của Rectangle cha', 'Vì hình vuông không có góc vuông', 'Vì hình chữ nhật chạy chậm hơn hình vuông', 'Vì trình biên dịch không cho phép kế thừa các lớp hình học'],
    ARRAY['Vì hình vuông quy định hai cạnh bằng nhau. Nếu thay đổi chiều rộng của đối tượng Square qua hàm của Rectangle, chiều dài của nó cũng tự động đổi, làm phá vỡ logic tính diện tích của Rectangle cha']::varchar[],
    'Square thay đổi logic thiết lập cạnh của Rectangle. Nếu một chương trình nhận kiểu Rectangle và chạy thử thiết lập rộng/dài độc lập, nó sẽ nhận kết quả sai khi truyền vào đối tượng Square.',
    7, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_068', 'mcq', 'design-principles',
    'Kỹ thuật "Dependency Injection" (DI) thường được dùng để hiện thực hóa nguyên lý nào trong SOLID?',
    ARRAY['Dependency Inversion Principle (DIP)', 'Liskov Substitution Principle (LSP)', 'Open/Closed Principle (OCP)', 'Single Responsibility Principle (SRP)'],
    ARRAY['Dependency Inversion Principle (DIP)']::varchar[],
    'DI cung cấp cơ chế để tự động bơm các đối tượng phụ thuộc vào lớp cần dùng, hiện thực hóa DIP một cách dễ dàng.',
    6, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_069', 'short-answer', 'design-principles',
    'Điền từ tiếng Anh viết tắt của nguyên lý SOLID khuyên rằng lớp nên được mở cho mở rộng nhưng đóng cho sửa đổi. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['OCP']::varchar[],
    'OCP (Open/Closed Principle) là nguyên lý cốt lõi của thiết kế hướng đối tượng.',
    5, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  ),
  (
    'cs_prog_q_070', 'short-answer', 'design-principles',
    'Chữ cái đầu tiên "S" trong SOLID viết tắt của từ tiếng Anh nào? (Viết đúng chính tả tiếng Anh)',
    NULL,
    ARRAY['Single Responsibility', 'Single Responsibility Principle', 'single responsibility']::varchar[],
    'Single Responsibility Principle định nghĩa sự đơn nhiệm của lớp.',
    5, 'SOLID Principles', 'cs_programming', 13, 'cs_prog_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Các mẫu thiết kế phần mềm kinh điển (cs_prog_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_071', 'mcq', 'design-principles',
    'Mẫu thiết kế "Singleton" được thiết kế nhằm mục đích gì?',
    ARRAY['Đảm bảo một lớp chỉ có duy nhất một thực thể toàn cục và cung cấp một điểm truy cập toàn cục tới nó', 'Tự động tạo ra hàng loạt đối tượng con', 'Chuyển đổi giao diện lớp này sang lớp khác', 'Đồng bộ hóa dữ liệu trên mạng'],
    ARRAY['Đảm bảo một lớp chỉ có duy nhất một thực thể toàn cục và cung cấp một điểm truy cập toàn cục tới nó']::varchar[],
    'Singleton hữu ích cho các lớp quản lý tài nguyên chung như Database Connection Pool, Configuration Manager.',
    5, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_072', 'mcq', 'design-principles',
    'Nhóm mẫu thiết kế "Structural Patterns" (Mẫu cấu trúc) tập trung giải quyết vấn đề gì?',
    ARRAY['Cách liên kết cấu trúc các lớp và đối tượng để tạo ra các cấu trúc lớn hơn, linh hoạt hơn', 'Cách khởi tạo các đối tượng an toàn', 'Cách phân phối hành vi và giao tiếp giữa các đối tượng', 'Cách mã hóa dữ liệu đầu ra'],
    ARRAY['Cách liên kết cấu trúc các lớp và đối tượng để tạo ra các cấu trúc lớn hơn, linh hoạt hơn']::varchar[],
    'Nhóm cấu trúc (như Adapter, Decorator, Facade, Composite) giúp tổ chức các mối quan hệ giữa các đối tượng một cách tối ưu.',
    6, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_073', 'mcq', 'design-principles',
    'Mẫu thiết kế "Strategy" (Chiến lược) thuộc nhóm mẫu thiết kế nào và giải quyết bài toán gì?',
    ARRAY['Behavioral (Hành vi) - Cho phép đóng gói các thuật toán độc lập và thay đổi linh hoạt thuật toán sử dụng khi chạy chương trình', 'Creational (Khởi tạo) - Giải quyết việc tạo đối tượng phức tạp', 'Structural (Cấu trúc) - Bổ sung hành vi động cho đối tượng', 'Behavioral - Tạo kết nối mạng một-nhiều'],
    ARRAY['Behavioral (Hành vi) - Cho phép đóng gói các thuật toán độc lập và thay đổi linh hoạt thuật toán sử dụng khi chạy chương trình']::varchar[],
    'Strategy Pattern giúp cô lập thuật toán khỏi lớp sử dụng (Client), đáp ứng nguyên lý OCP hoàn hảo.',
    6, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_074', 'mcq', 'design-principles',
    'Mẫu thiết kế "Observer" (Người quan sát) hoạt động theo nguyên lý giao tiếp nào?',
    ARRAY['Mối quan hệ một-nhiều: khi đối tượng chính thay đổi trạng thái, tất cả các đối tượng đăng ký lắng nghe (subscribers) sẽ tự động nhận thông báo', 'Khóa độc quyền tài nguyên dùng chung', 'Ép kiểu đối tượng con về kiểu đối tượng cha', 'Mỗi đối tượng tự chạy một luồng thread riêng biệt'],
    ARRAY['Mối quan hệ một-nhiều: khi đối tượng chính thay đổi trạng thái, tất cả các đối tượng đăng ký lắng nghe (subscribers) sẽ tự động nhận thông báo']::varchar[],
    'Observer Pattern (Publish/Subscribe) giúp các lớp giao tiếp với nhau lỏng lẻo (loose coupling), rất phổ biến trong các thư viện UI Event handling.',
    6, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_075', 'mcq', 'design-principles',
    'Mẫu thiết kế "Decorator" có đặc trưng hoạt động như thế nào?',
    ARRAY['Bọc đối tượng gốc lại để bổ sung các hành vi, trách nhiệm mới một cách động khi chạy chương trình mà không cần thay đổi code của lớp gốc', 'Đóng vai trò cầu nối chuyển đổi interface không tương thích', 'Tạo ra bản sao hoàn hảo của đối tượng', 'Chỉ cho phép khởi tạo duy nhất một đối tượng trong RAM'],
    ARRAY['Bọc đối tượng gốc lại để bổ sung các hành vi, trách nhiệm mới một cách động khi chạy chương trình mà không cần thay đổi code của lớp gốc']::varchar[],
    'Decorator kế thừa cùng interface với đối tượng gốc và chứa một tham chiếu tới đối tượng đó, cho phép lồng nhiều bộ trang trí đè lên nhau.',
    7, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_076', 'mcq', 'design-principles',
    'Tại sao Singleton dạng "Lazy Initialization" (Khởi tạo trễ) đơn giản nếu không được đồng bộ hóa lại không an toàn trong môi trường đa luồng (Multi-threading)?',
    ARRAY['Vì nhiều luồng có thể cùng vượt qua khối kiểm tra `instance == null` đồng thời và khởi tạo ra nhiều đối tượng Singleton khác nhau', 'Vì nó làm tràn bộ nhớ Stack', 'Vì CPU sẽ chặn không cho luồng hoạt động', 'Vì Garbage Collector sẽ tự động xóa đối tượng đi'],
    ARRAY['Vì nhiều luồng có thể cùng vượt qua khối kiểm tra `instance == null` đồng thời và khởi tạo ra nhiều đối tượng Singleton khác nhau']::varchar[],
    'Race condition ở khối kiểm tra null làm phá vỡ quy tắc duy nhất của Singleton. Cần dùng đồng bộ hóa (như synchronized hoặc double-checked locking).',
    7, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_077', 'mcq', 'design-principles',
    'Mẫu thiết kế "Adapter" đóng vai trò gì?',
    ARRAY['Chuyển đổi giao diện (interface) của một lớp thành một giao diện khác mà Client mong muốn, giúp các lớp không tương thích hoạt động cùng nhau', 'Đảm bảo đối tượng chỉ có một instance', 'Đăng ký lắng nghe sự kiện từ đối tượng khác', 'Định nghĩa thuật toán khung cho các lớp con kế thừa triển khai'],
    ARRAY['Chuyển đổi giao diện (interface) của một lớp thành một giao diện khác mà Client mong muốn, giúp các lớp không tương thích hoạt động cùng nhau']::varchar[],
    'Adapter (Wrapper) đóng vai trò như bộ chuyển đổi phích cắm điện, bọc lớp cũ lại để cung cấp giao diện chuẩn mới.',
    6, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_078', 'mcq', 'design-principles',
    'Mẫu thiết kế "Factory Method" giải quyết vấn đề gì?',
    ARRAY['Định nghĩa giao diện tạo đối tượng, nhưng để các lớp con quyết định lớp cụ thể nào được khởi tạo, giúp giảm phụ thuộc cứng vào tên lớp cụ thể', 'Đồng bộ hóa luồng dữ liệu của bộ nhớ Heap', 'Bảo vệ các biến private của đối tượng', 'Giúp ghi đè phương thức an toàn'],
    ARRAY['Định nghĩa giao diện tạo đối tượng, nhưng để các lớp con quyết định lớp cụ thể nào được khởi tạo, giúp giảm phụ thuộc cứng vào tên lớp cụ thể']::varchar[],
    'Factory Method tuân thủ nguyên lý Dependency Inversion, lập trình viên không cần dùng từ khóa new trực tiếp với tên lớp cụ thể.',
    6, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_079', 'short-answer', 'design-principles',
    'Điền tên tiếng Anh của mẫu thiết kế đảm bảo một lớp chỉ có duy nhất một instance toàn cục. (Viết hoa chữ cái đầu)',
    NULL,
    ARRAY['Singleton']::varchar[],
    'Singleton được thiết kế để kiểm soát tài nguyên độc bản.',
    5, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  ),
  (
    'cs_prog_q_080', 'short-answer', 'design-principles',
    'Điền tên tiếng Anh của mẫu thiết kế hành vi thiết lập mối quan hệ đăng ký lắng nghe sự kiện một-nhiều giữa các đối tượng. (Viết hoa chữ cái đầu)',
    NULL,
    ARRAY['Observer']::varchar[],
    'Observer Pattern là nền tảng của lập trình hướng sự kiện (Event-driven Programming).',
    5, 'Design Patterns', 'cs_programming', 13, 'cs_prog_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Quản lý Mã nguồn nâng cao với Git (cs_prog_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_081', 'mcq', 'development-workflow',
    'Hệ thống quản lý phiên bản Git lưu trữ và theo dõi lịch sử tệp tin dưới dạng cấu trúc nào?',
    ARRAY['Ảnh chụp nhanh (Snapshots) của toàn bộ thư mục dự án tại mỗi thời điểm commit', 'Mảng so sánh delta sự khác biệt dòng chữ thô', 'Các file nén zip lưu trên máy chủ chính', 'Danh sách liên kết đơn các dòng code'],
    ARRAY['Ảnh chụp nhanh (Snapshots) của toàn bộ thư mục dự án tại mỗi thời điểm commit']::varchar[],
    'Git coi dữ liệu là một tập hợp các snapshot. Nếu tệp tin không thay đổi, Git chỉ lưu con trỏ trỏ tới tệp tin cũ trước đó để tiết kiệm dung lượng.',
    5, 'Git Documentation', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_082', 'mcq', 'development-workflow',
    'Sự khác biệt cơ bản giữa Git Merge và Git Rebase là gì?',
    ARRAY['Merge tạo ra một commit nối mới để kết hợp lịch sử; Rebase đặt lại đỉnh các commit của nhánh con lên trên commit mới nhất của nhánh chính, viết lại lịch sử dạng đường thẳng', 'Merge chạy nhanh hơn Rebase gấp 10 lần', 'Rebase không thể xử lý được xung đột dòng code', 'Merge làm mất đi mã nguồn của nhánh con'],
    ARRAY['Merge tạo ra một commit nối mới để kết hợp lịch sử; Rebase đặt lại đỉnh các commit của nhánh con lên trên commit mới nhất của nhánh chính, viết lại lịch sử dạng đường thẳng']::varchar[],
    'Merge lưu lại nguyên vẹn sơ đồ rẽ nhánh thực tế. Rebase viết lại lịch sử để tạo ra luồng commit tuyến tính thẳng băng cực kỳ sạch sẽ.',
    6, 'Git Workflows', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_083', 'mcq', 'development-workflow',
    'Nguyên tắc vàng nào sau đây CẤM thực hiện khi sử dụng lệnh `git rebase`?',
    ARRAY['Không bao giờ rebase trên các nhánh công khai đã push lên server và đang có nhiều người cùng làm việc (Public Branches)', 'Không được rebase trên máy local', 'Không được rebase khi có xung đột code', 'Không được rebase quá 3 lần một ngày'],
    ARRAY['Không bao giờ rebase trên các nhánh công khai đã push lên server và đang có nhiều người cùng làm việc (Public Branches)']::varchar[],
    'Rebase viết lại lịch sử commit. Nếu bạn rebase một nhánh công khai, lịch sử commit của bạn sẽ lệch hoàn toàn với lịch sử của người khác, gây rối loạn trầm trọng cho toàn đội.',
    7, 'Git Best Practices', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_084', 'mcq', 'development-workflow',
    'Xung đột mã nguồn (Merge Conflict) xảy ra khi nào trong Git?',
    ARRAY['Khi hai nhánh cùng sửa đổi cùng một dòng code ở một file và tiến hành gộp nhánh', 'Khi dung lượng file mã nguồn vượt quá 100MB', 'Khi bạn quên chưa gõ lệnh git add trước khi commit', 'Khi hai thành viên cùng push code lên server cùng một giây'],
    ARRAY['Khi hai nhánh cùng sửa đổi cùng một dòng code ở một file và tiến hành gộp nhánh']::varchar[],
    'Git không thể tự quyết định dòng code nào là đúng khi cả hai bên cùng sửa một dòng, bắt buộc lập trình viên phải chọn thủ công.',
    5, 'Git Documentation', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_085', 'mcq', 'development-workflow',
    'Lệnh `git stash` dùng để làm gì trong thực tế phát triển phần mềm?',
    ARRAY['Lưu tạm thời các thay đổi chưa commit vào vùng đệm riêng của Git để dọn sạch thư mục làm việc, cho phép chuyển nhánh khẩn cấp', 'Xóa vĩnh viễn toàn bộ các thay đổi chưa lưu', 'Tạo ra một commit rỗng gửi lên server', 'Tải toàn bộ code mới từ server về máy local'],
    ARRAY['Lưu tạm thời các thay đổi chưa commit vào vùng đệm riêng của Git để dọn sạch thư mục làm việc, cho phép chuyển nhánh khẩn cấp']::varchar[],
    'Stash cất tạm code đang viết dở (chưa đủ điều kiện commit) sang một bên để bạn có thể git checkout sang nhánh khác sửa lỗi khẩn cấp, sau đó dùng `git stash pop` lấy lại code cũ.',
    5, 'Git Tools', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_086', 'mcq', 'development-workflow',
    'Lệnh nào sau đây dùng để xem lịch sử commit dưới dạng sơ đồ cây trực quan rút gọn?',
    ARRAY['git log --oneline --graph', 'git status --short', 'git diff --stat', 'git reflog view'],
    ARRAY['git log --oneline --graph']::varchar[],
    'Lệnh `git log --oneline --graph` vẽ nhánh và commit cực kỳ tinh gọn, giúp lập trình viên bao quát được tiến trình rẽ nhánh.',
    5, 'Git CLI tools', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_087', 'mcq', 'development-workflow',
    'Trong tệp tin `.gitignore`, dòng cấu trúc: `config/*.json` có ý nghĩa gì?',
    ARRAY['Bỏ qua không theo dõi toàn bộ các tệp tin có đuôi .json nằm bên trong thư mục config', 'Bắt buộc phải commit các file json trong config', 'Mã hóa các file json trong thư mục config', 'Tự động kiểm tra cú pháp các file json này'],
    ARRAY['Bỏ qua không theo dõi toàn bộ các tệp tin có đuôi .json nằm bên trong thư mục config']::varchar[],
    '.gitignore giúp loại bỏ các tệp tin cấu hình nhạy cảm khỏi kho lưu trữ Git công khai.',
    5, 'Git Configuration', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_088', 'mcq', 'development-workflow',
    'Lệnh `git reflog` có tính năng đặc biệt nào so với `git log`?',
    ARRAY['Ghi lại lịch sử của mọi hành động di chuyển con trỏ HEAD (kể cả các commit đã bị xóa, commit mồ côi do rebase/reset)', 'Chỉ hiển thị các commit của người dùng khác', 'Tự động gửi thông điệp cảnh báo lỗi lên GitHub', 'Xóa lịch sử commit cục bộ'],
    ARRAY['Ghi lại lịch sử của mọi hành động di chuyển con trỏ HEAD (kể cả các commit đã bị xóa, commit mồ côi do rebase/reset)']::varchar[],
    'Reflog là lưới bảo hiểm của Git. Nó ghi lại mọi thao tác di chuyển HEAD, giúp bạn khôi phục lại các commit bị mất do lỡ tay chạy `git reset --hard` hoặc rebase hỏng.',
    7, 'Git Advanced Tools', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_089', 'short-answer', 'development-workflow',
    'Điền tên của lệnh Git dùng để cất tạm thời các thay đổi chưa commit khi chuyển nhánh gấp. (Viết thường)',
    NULL,
    ARRAY['git stash', 'stash']::varchar[],
    'Git stash cất trữ tạm thời mã nguồn sạch sẽ.',
    5, 'Git Tools', 'cs_programming', 13, 'cs_prog_09'
  ),
  (
    'cs_prog_q_090', 'short-answer', 'development-workflow',
    'Điền tên của tệp tin cấu hình đặc biệt dùng để chỉ định các thư mục (như node_modules) hoặc tệp tin rác mà Git không được phép theo dõi. (Bắt đầu bằng dấu chấm viết liền)',
    NULL,
    ARRAY['.gitignore']::varchar[],
    '.gitignore loại bỏ các tệp tin không mong muốn khỏi commit.',
    5, 'Git Configuration', 'cs_programming', 13, 'cs_prog_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Kiểm thử Đơn vị & TDD (cs_prog_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_prog_q_091', 'mcq', 'development-workflow',
    'Khái niệm "Unit Test" (Kiểm thử đơn vị) quy định đơn vị cần test phải có đặc trưng nào?',
    ARRAY['Phải được kiểm thử cô lập hoàn toàn khỏi hệ thống, không kết nối database thật và không gọi mạng thật', 'Bắt buộc phải kiểm thử tích hợp toàn bộ các bảng CSDL', 'Phải có sự tham gia kiểm thử thủ công của con người', 'Chỉ chạy được trên môi trường Production'],
    ARRAY['Phải được kiểm thử cô lập hoàn toàn khỏi hệ thống, không kết nối database thật và không gọi mạng thật']::varchar[],
    'Unit Test kiểm tra đơn vị mã nguồn nhỏ nhất (hàm/phương thức) một cách độc lập để đảm bảo tốc độ chạy cực nhanh và kết quả nhất quán.',
    5, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_092', 'mcq', 'development-workflow',
    'Tại sao ta cần sử dụng kỹ thuật "Mocking" trong viết Unit Test?',
    ARRAY['Để tạo ra các đối tượng giả lập thay thế cho các phụ thuộc phức tạp (database, mạng, API bên ngoài) giúp cô lập hàm cần test', 'Để chạy tự động hóa giao diện người dùng', 'Để tăng độ phức tạp của mã nguồn kiểm thử', 'Để dịch ngược mã nguồn của ứng dụng'],
    ARRAY['Để tạo ra các đối tượng giả lập thay thế cho các phụ thuộc phức tạp (database, mạng, API bên ngoài) giúp cô lập hàm cần test']::varchar[],
    'Mocking giả lập hành vi của các module phụ thuộc, giúp test case chạy độc lập mà không phụ thuộc vào trạng thái mạng hay CSDL.',
    6, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_093', 'mcq', 'development-workflow',
    'Quy trình phát triển hướng kiểm thử TDD (Test-Driven Development) gồm ba bước lặp nào?',
    ARRAY['Red (Viết test thất bại) -> Green (Viết code tối giản vượt qua test) -> Refactor (Tối ưu hóa mã nguồn)', 'Design (Thiết kế) -> Code (Viết code) -> Test (Kiểm thử cuối)', 'Plan (Lên kế hoạch) -> Test (Viết test) -> Deploy (Triển khai)', 'Analysis (Phân tích) -> Mock (Giả lập) -> Release (Phát hành)'],
    ARRAY['Red (Viết test thất bại) -> Green (Viết code tối giản vượt qua test) -> Refactor (Tối ưu hóa mã nguồn)']::varchar[],
    'Quy trình Red-Green-Refactor của TDD bảo đảm mọi dòng code viết ra đều có test case kiểm chứng và mã nguồn luôn được tối ưu sạch đẹp.',
    6, 'TDD by Example', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_094', 'mcq', 'development-workflow',
    'Cấu trúc viết một ca kiểm thử đơn vị chuẩn "3A" gồm các bước theo thứ tự nào?',
    ARRAY['Arrange (Chuẩn bị dữ liệu) -> Act (Thực thi hàm test) -> Assert (Xác minh kết quả)', 'Analysis (Phân tích) -> Action (Chạy code) -> Alert (Cảnh báo lỗi)', 'Add (Thêm test) -> Apply (Áp dụng) -> Approve (Phê duyệt)', 'Assert (Xác minh) -> Act (Chạy) -> Arrange (Chuẩn bị)'],
    ARRAY['Arrange (Chuẩn bị dữ liệu) -> Act (Thực thi hàm test) -> Assert (Xác minh kết quả)']::varchar[],
    'Cấu trúc 3A giúp ca test rõ ràng, mạch lạc: chuẩn bị môi trường (Arrange), kích hoạt hàm chạy (Act), và kiểm tra kỳ vọng đầu ra (Assert).',
    5, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_095', 'mcq', 'development-workflow',
    'Chỉ số "Test Coverage" (Độ bao phủ kiểm thử) đo lường khía cạnh nào của dự án?',
    ARRAY['Tỷ lệ phần trăm các dòng mã nguồn của ứng dụng được thực thi khi chạy toàn bộ bộ kiểm thử đơn vị', 'Số lượng lập trình viên tham gia viết test', 'Tổng số lỗi được tìm thấy sau khi deploy', 'Dung lượng ổ cứng chứa các file test'],
    ARRAY['Tỷ lệ phần trăm các dòng mã nguồn của ứng dụng được thực thi khi chạy toàn bộ bộ kiểm thử đơn vị']::varchar[],
    'Test Coverage chỉ ra tỷ lệ mã nguồn được bảo vệ bởi test cases, giúp lập trình viên phát hiện các vùng code bị bỏ quên.',
    5, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_096', 'mcq', 'development-workflow',
    'Một ca kiểm thử đơn vị (Unit Test) chạy tốt CẤM thực hiện hành động nào sau đây?',
    ARRAY['Kết nối và truy vấn dữ liệu trực tiếp vào một cơ sở dữ liệu vật lý đang hoạt động thực tế', 'Sử dụng đối tượng giả lập Mock', 'Chạy các phép tính số học phức tạp', 'Gọi một hàm cục bộ khác'],
    ARRAY['Kết nối và truy vấn dữ liệu trực tiếp vào một cơ sở dữ liệu vật lý đang hoạt động thực tế']::varchar[],
    'Unit test cấm kết nối DB thật vì sẽ làm chậm tốc độ chạy test, gây mất nhất quán (nếu data DB thay đổi làm test tạch) và gây rác dữ liệu DB.',
    6, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_097', 'mcq', 'development-workflow',
    'Lợi ích lớn nhất của việc áp dụng quy trình viết test trước code sau (TDD) là gì?',
    ARRAY['Giúp lập trình viên hiểu sâu sắc yêu cầu nghiệp vụ trước khi viết code và tạo ra mã nguồn có kiến trúc ghép nối lỏng lẻo dễ test', 'Giúp ứng dụng chạy nhanh hơn gấp đôi trên CPU nhúng', 'Tự động sửa được các lỗi cú pháp biên dịch', 'Không cần tuyển dụng QA/Tester nữa'],
    ARRAY['Giúp lập trình viên hiểu sâu sắc yêu cầu nghiệp vụ trước khi viết code và tạo ra mã nguồn có kiến trúc ghép nối lỏng lẻo dễ test']::varchar[],
    'Viết test trước ép buộc lập trình viên phải nghĩ về cách gọi hàm (interface design) trước, dẫn đến cấu trúc code sạch và tách biệt phụ thuộc tốt.',
    6, 'TDD by Example', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_098', 'mcq', 'development-workflow',
    'Trong viết test, đối tượng "Stub" khác đối tượng "Mock" ở điểm nào?',
    ARRAY['Stub chỉ trả về dữ liệu giả lập cố định để hàm chạy qua; Mock ghi nhận thông tin cuộc gọi (hàm được gọi bao nhiêu lần, tham số gì) để xác minh hành vi', 'Stub kết nối DB thật còn Mock thì không', 'Stub chỉ viết được trên Java còn Mock chỉ viết trên Python', 'Không có sự khác biệt nào giữa chúng'],
    ARRAY['Stub chỉ trả về dữ liệu giả lập cố định để hàm chạy qua; Mock ghi nhận thông tin cuộc gọi (hàm được gọi bao nhiêu lần, tham số gì) để xác minh hành vi']::varchar[],
    'Stub dùng để cung cấp trạng thái giả lập (state verification). Mock dùng để xác minh hành vi tương tác giữa các lớp (behavior verification).',
    7, 'Software Testing', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_099', 'short-answer', 'development-workflow',
    'Điền từ viết tắt của quy trình phát triển hướng kiểm thử (viết hoa toàn bộ).',
    NULL,
    ARRAY['TDD']::varchar[],
    'TDD (Test-Driven Development) là phương pháp phát triển phần mềm chất lượng cao.',
    5, 'TDD by Example', 'cs_programming', 13, 'cs_prog_10'
  ),
  (
    'cs_prog_q_100', 'short-answer', 'development-workflow',
    'Trong quy trình TDD, bước viết lại mã nguồn tối ưu mà không làm thay đổi hành vi logic được gọi là gì? (Viết thường)',
    NULL,
    ARRAY['refactor', 'tối ưu hóa']::varchar[],
    'Refactor giúp giữ code sạch, giảm nợ kỹ thuật (technical debt) sau khi tính năng đã chạy ổn định.',
    5, 'TDD by Example', 'cs_programming', 13, 'cs_prog_10'
  );

COMMIT;
