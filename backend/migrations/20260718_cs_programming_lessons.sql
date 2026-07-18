-- SQL migration to seed topics and 10 core lessons for cs_programming (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_programming (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('programming-paradigms', 'cs_programming', 13, 'Mô hình & Phương pháp lập trình', 'Lập trình hướng đối tượng (OOP) nâng cao, quản lý con trỏ bộ nhớ và lập trình hàm (Functional Programming).', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('software-reliability', 'cs_programming', 13, 'Độ tin cậy & Xử lý lỗi', 'Lập trình đa luồng (Multithreading), bất đồng bộ (Concurrency), cơ chế đồng bộ hóa (Mutex/Locks) và hệ thống xử lý lỗi/logging.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('design-principles', 'cs_programming', 13, 'Nguyên lý & Mẫu thiết kế', 'Lập trình tổng quát Generics, 5 nguyên lý SOLID và các mẫu thiết kế phần mềm (Design Patterns) kinh điển.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('development-workflow', 'cs_programming', 13, 'Luồng phát triển & Kiểm thử', 'Quản lý mã nguồn với Git nâng cao, quy trình làm việc nhánh và kiểm thử đơn vị Unit Test / TDD.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_programming (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_prog_01', 
    'cs_programming', 
    13, 
    'Mô hình & Phương pháp lập trình', 
    'Lập trình Hướng đối tượng nâng cao (OOP)', 
    '### 1. 4 Tính chất cốt lõi của OOP
- **Đóng gói (Encapsulation):** Che giấu trạng thái nội bộ của đối tượng bằng cách dùng các access modifiers (`private`, `protected`) và chỉ cho phép truy cập qua các phương thức công khai (getter/setter).
- **Kế thừa (Inheritance):** Cho phép một lớp (con) tái sử dụng các thuộc tính và phương thức của lớp khác (cha).
- **Đa hình (Polymorphism):** Cho phép các đối tượng thuộc các lớp khác nhau phản hồi cùng một thông điệp theo các cách khác nhau. Thực hiện qua nạp chồng (Overloading - đa hình tĩnh) và ghi đè (Overriding - đa hình động).
- **Trừu tượng (Abstraction):** Tập trung vào những đặc điểm cốt lõi của đối tượng, ẩn đi các chi tiết triển khai phức tạp. Thể hiện qua `interface` hoặc `abstract class`.

### 2. Phân biệt Abstract Class và Interface
- **Abstract Class:** Có thể chứa cả phương thức trừu tượng (không thân) và phương thức thông thường (có thân), hỗ trợ biến trạng thái (state properties). Một lớp chỉ được kế thừa từ duy nhất một lớp cha.
- **Interface:** Chỉ chứa chữ ký phương thức trừu tượng (từ Java 8 trở đi có thêm default method). Một lớp có thể triển khai (implement) đồng thời nhiều Interface.', 
    'core-theory', 
    '["Thiết kế Interface `PaymentMethod` chứa hàm `pay()`, sau đó viết các lớp `CreditCardPayment` và `PaypalPayment` triển khai nó để hỗ trợ đa hình động khi thanh toán.", "Sử dụng Upcasting để quản lý danh sách các đối tượng dạng lớp cha: `List<Animal> list = new ArrayList<>(); list.add(new Dog());`"]'::jsonb, 
    '["Ưu tiên sử dụng Composition (thành phần) thay vì lạm dụng Inheritance (kế thừa) quá mức để tránh quan hệ cha-con quá chặt chẽ.", "Sử dụng abstract class khi các lớp con chia sẻ nhiều mã nguồn chung; dùng interface khi các lớp con chỉ chia sẻ hành vi quy chuẩn.", "Không bao giờ để lộ các thuộc tính thành viên ở chế độ public."]'::jsonb, 
    5, 
    TRUE,
    'programming-paradigms'
  ),
  (
    'cs_prog_02', 
    'cs_programming', 
    13, 
    'Mô hình & Phương pháp lập trình', 
    'Con trỏ & Quản lý Bộ nhớ (Stack vs Heap)', 
    '### 1. Phân biệt Stack và Heap
- **Stack (Bộ nhớ ngăn xếp):**
  - Quản lý tự động bởi CPU.
  - Lưu các biến cục bộ, tham số hàm.
  - Tốc độ truy cập rất nhanh, dung lượng giới hạn. Hoạt động theo cơ chế LIFO.
- **Heap (Bộ nhớ đống):**
  - Quản lý thủ công bởi lập trình viên (hoặc Garbage Collector).
  - Lưu các đối tượng được cấp phát động (dùng từ khóa `new` hoặc hàm `malloc`).
  - Dung lượng lớn, tốc độ truy cập chậm hơn Stack và dễ gây phân mảnh bộ nhớ.

### 2. Hiện tượng Rò rỉ Bộ nhớ (Memory Leak)
Rò rỉ bộ nhớ xảy ra khi lập trình viên cấp phát bộ nhớ động trên Heap nhưng quên giải phóng (`delete` hoặc `free`) sau khi sử dụng, làm cạn kiệt RAM của hệ thống theo thời gian.

### 3. Smart Pointers trong C++11
Giúp quản lý bộ nhớ động tự động mà không lo rò rỉ:
- `std::unique_ptr`: Sở hữu độc quyền tài nguyên.
- `std::shared_ptr`: Nhiều con trỏ cùng sở hữu tài nguyên, tự giải phóng khi bộ đếm tham chiếu (reference count) về 0.
- `std::weak_ptr`: Tham chiếu không làm tăng bộ đếm, tránh lỗi tham chiếu vòng (circular reference).', 
    'core-theory', 
    '["Cấp phát động trên Heap trong C++ và giải phóng: `int* ptr = new int(10); delete ptr;`", "Sử dụng smart pointer tránh leak: `std::unique_ptr<User> user = std::make_unique<User>();`"]'::jsonb, 
    '["Luôn ghép cặp new/delete và new[]/delete[] chính xác để tránh lỗi bộ nhớ.", "Trong các ngôn ngữ có Garbage Collector (như Java, C#), rò rỉ bộ nhớ vẫn xảy ra nếu bạn giữ tham chiếu đến các đối tượng không còn dùng tới trong các biến static.", "Sử dụng các công cụ như Valgrind để kiểm tra lỗi leak bộ nhớ khi chạy thử."]'::jsonb, 
    7, 
    TRUE,
    'programming-paradigms'
  ),
  (
    'cs_prog_03', 
    'cs_programming', 
    13, 
    'Mô hình & Phương pháp lập trình', 
    'Lập trình Hàm cơ bản (Functional Programming)', 
    '### 1. Các nguyên tắc cốt lõi của Lập trình hàm
- **Pure Functions (Hàm thuần khiết):** Trả về cùng một kết quả với cùng một tham số đầu vào và không gây ra bất kỳ tác động phụ (Side Effects) nào đến trạng thái bên ngoài hệ thống.
- **Immutability (Tính bất biến):** Dữ liệu sau khi tạo không được sửa đổi. Mọi biến đổi đều tạo ra bản sao mới.
- **First-Class & Higher-Order Functions:** Hàm được coi như một biến thông thường (có thể truyền vào hàm khác làm tham số hoặc trả về từ một hàm khác).

### 2. Biểu thức Lambda (Lambda Expressions)
Lambda là các hàm ẩn danh ngắn gọn, thường được viết dạng:
` (parameters) -> { body } `

### 3. Bộ ba hàm biến đổi Collection phổ biến
- **Map:** Biến đổi từng phần tử của danh sách theo một hàm và trả về danh sách mới có cùng kích thước.
- **Filter:** Lọc ra các phần tử thỏa mãn điều kiện logic cho trước.
- **Reduce (Fold):** Gộp toàn bộ các phần tử trong danh sách thành một giá trị duy nhất (ví dụ tính tổng).', 
    'core-theory', 
    '["Sử dụng Higher-Order Functions trong JavaScript/TypeScript: `const activeEmails = users.filter(u => u.isActive).map(u => u.email);`", "Viết một Pure Function tính diện tích hình tròn không phụ thuộc vào biến môi trường bên ngoài."]'::jsonb, 
    '["Lập trình hàm giúp mã nguồn dễ kiểm thử đơn vị (Unit Test) hơn do không có side effects.", "Hạn chế sử dụng biến toàn cục để tránh phá vỡ tính thuần khiết của hàm.", "Tận dụng cơ chế Lazy Evaluation để trì hoãn tính toán cho đến khi thực sự cần thiết, tiết kiệm tài nguyên."]'::jsonb, 
    6, 
    TRUE,
    'programming-paradigms'
  ),
  (
    'cs_prog_04', 
    'cs_programming', 
    13, 
    'Độ tin cậy & Xử lý lỗi', 
    'Lập trình Đa luồng & Bất đồng bộ (Concurrency)', 
    '### 1. Tiến trình (Process) và Luồng (Thread)
- **Process:** Một chương trình đang thực thi, sở hữu một không gian địa chỉ bộ nhớ và tài nguyên hệ thống độc lập. Các process khó chia sẻ dữ liệu với nhau.
- **Thread:** Đơn vị thực thi nhỏ nhất nằm trong một Process. Các thread trong cùng một process chia sẻ chung bộ nhớ Heap và tài nguyên, nhưng có Stack riêng.

### 2. Hiện tượng Race Condition (Tranh chấp tài nguyên)
Race Condition xảy ra khi nhiều luồng cùng truy cập và thay đổi một vùng nhớ dùng chung đồng thời mà không được đồng bộ hóa, dẫn đến kết quả dữ liệu cuối cùng bị sai lệch và không đoán trước được.

### 3. Đồng bộ hóa luồng (Synchronization)
- **Mutex (Mutual Exclusion):** Khóa độc quyền. Chỉ cho phép duy nhất một luồng truy cập vào phân đoạn găng (critical section) tại một thời điểm.
- **Semaphore:** Cho phép tối đa $N$ luồng truy cập đồng thời vào tài nguyên dùng chung.
- **Deadlock trong đa luồng:** Xảy ra khi Thread 1 giữ Khóa A chờ Khóa B, Thread 2 giữ Khóa B chờ Khóa A. Cả hai luồng treo vô hạn.', 
    'core-theory', 
    '["Sử dụng Mutex trong C++ để bảo vệ biến đếm chia sẻ giữa các luồng: `std::lock_guard<std::mutex> lock(mtx); shared_counter++;`", "Sử dụng cú pháp `async/await` trong JavaScript/TypeScript để xử lý tác vụ I/O bất đồng bộ phi chặn."]'::jsonb, 
    '["Luôn cố gắng thiết kế các tài nguyên dùng chung ở dạng bất biến (Read-only) để loại bỏ Race Condition mà không cần khóa.", "Tránh việc giữ khóa Mutex quá lâu trong các tác vụ gọi mạng hoặc đọc file.", "Sử dụng các thư viện thread-safe collections có sẵn của ngôn ngữ thay vì tự viết cơ chế đồng bộ hóa phức tạp."]'::jsonb, 
    7, 
    TRUE,
    'software-reliability'
  ),
  (
    'cs_prog_05', 
    'cs_programming', 
    13, 
    'Độ tin cậy & Xử lý lỗi', 
    'Xử lý Ngoại lệ & Chiến lược Ghi Log (Logging)', 
    '### 1. Phân loại Ngoại lệ (Exception)
Ngoại lệ là các sự kiện bất thường xảy ra trong quá trình chạy chương trình làm phá vỡ luồng thực thi bình thường.
- **Checked Exceptions (Ngoại lệ bắt buộc bắt):** Phát hiện lúc biên dịch (Compile-time), bắt buộc phải xử lý bằng khối `try-catch` hoặc khai báo `throws` (ví dụ: `IOException` trong Java).
- **Unchecked Exceptions (Ngoại lệ Runtime):** Xuất hiện khi chạy chương trình do lỗi logic của lập trình viên (ví dụ: `NullPointerException`, `IndexOutOfBoundsException`).

### 2. Nguyên tắc xử lý lỗi tốt
- Luôn giải phóng tài nguyên trong khối `finally` hoặc sử dụng cơ chế tự động đóng tài nguyên (như `try-with-resources` trong Java hoặc `using` trong C#).
- Tránh việc bắt ngoại lệ chung chung (`catch (Exception e)`) rồi bỏ qua không xử lý, làm nuốt lỗi hệ thống.

### 3. Hệ thống Ghi log (Logging) chuyên nghiệp
Thay vì dùng lệnh in thô (`console.log` hoặc `printf`), ta sử dụng thư viện ghi log chuyên biệt với các cấp độ (Log Levels) tăng dần:
1. **DEBUG:** Thông tin chi tiết phục vụ lập trình viên tìm lỗi ở local.
2. **INFO:** Ghi nhận các sự kiện bình thường quan trọng của hệ thống (ví dụ: khởi chạy server, giao dịch thành công).
3. **WARN:** Cảnh báo các bất thường nhỏ chưa gây lỗi nhưng cần chú ý (ví dụ: bộ nhớ đệm sắp đầy).
4. **ERROR:** Lỗi xảy ra làm thất bại một tác vụ cụ thể nhưng ứng dụng vẫn tiếp tục chạy được (ví dụ: lỗi gọi API bên thứ ba).
5. **FATAL/CRITICAL:** Lỗi nghiêm trọng làm sập toàn bộ ứng dụng.', 
    'core-theory', 
    '["Sử dụng khối try-with-resources để tự động đóng file đọc ghi: `try (BufferedReader br = new BufferedReader(new FileReader(\"file.txt\"))) { ... }`", "Ghi log kèm thông tin stack trace: `logger.error(\"Thao tác thanh toán thất bại\", exception);`"]'::jsonb, 
    '["Không ghi các thông tin nhạy cảm của người dùng (mật khẩu, mã thẻ tín dụng, token bảo mật) vào tệp tin log.", "Sử dụng định dạng cấu trúc (như JSON logging) để dễ dàng gom log tập trung về ELK stack hoặc Splunk.", "Xác định rõ ràng chiến lược xoay vòng log (log rotation) để tránh làm đầy ổ cứng máy chủ."]'::jsonb, 
    6, 
    TRUE,
    'software-reliability'
  ),
  (
    'cs_prog_06', 
    'cs_programming', 
    13, 
    'Nguyên lý & Mẫu thiết kế', 
    'Lập trình Tổng quát (Generic Programming)', 
    '### 1. Tại sao cần Lập trình tổng quát?
Lập trình tổng quát (Generics trong Java/TypeScript, Templates trong C++) cho phép lập trình viên viết mã nguồn (lớp, hàm, cấu trúc dữ liệu) hoạt động với nhiều kiểu dữ liệu khác nhau mà không cần viết lại mã nguồn nhiều lần, đảm bảo tính an toàn kiểu dữ liệu (Type Safety) ngay lúc biên dịch.

### 2. Cơ chế hoạt động của Generics
- **Java Type Erasure:** Trình biên dịch Java kiểm tra kiểu dữ liệu an toàn lúc compile, sau đó xóa bỏ thông tin Generics và thay thế bằng lớp cơ bản `Object` trong bytecode, giúp tương thích ngược với các phiên bản cũ.
- **C++ Template Instantiation:** Trình biên dịch C++ sinh ra một phiên bản mã nguồn vật lý riêng biệt cho mỗi kiểu dữ liệu được sử dụng, giúp tốc độ chạy tối ưu tối đa nhưng làm tăng kích thước file nhị phân đầu ra (code bloat).

### 3. Ràng buộc kiểu dữ liệu (Generic Constraints)
Giới hạn kiểu dữ liệu truyền vào Generic. Ví dụ trong TypeScript:
` function getLength<T extends { length: number }>(arg: T): number `
Đảm bảo tham số truyền vào bắt buộc phải có thuộc tính `length`.', 
    'core-theory', 
    '["Định nghĩa một lớp Generic Box trong C#: `public class Box<T> { private T data; }`", "Sử dụng ràng buộc kiểu dữ liệu mở rộng trong Java: `public <T extends Comparable<T>> T getMax(T a, T b)`"]'::jsonb, 
    '["Sử dụng lập trình tổng quát để xây dựng các cấu trúc dữ liệu dùng chung (như List, Stack, Map, Queue).", "Tránh ép kiểu thô (raw types) khi sử dụng các lớp Generics để duy trì tính an toàn kiểu dữ liệu của hệ thống.", "Tận dụng tính năng Covariance và Contravariance (ví dụ: ký tự đại diện wildcard `? extends T` và `? super T` trong Java) để tăng tính linh hoạt khi truyền tham số."]'::jsonb, 
    6, 
    TRUE,
    'design-principles'
  ),
  (
    'cs_prog_07', 
    'cs_programming', 
    13, 
    'Nguyên lý & Mẫu thiết kế', 
    '5 Nguyên lý Thiết kế hướng đối tượng SOLID', 
    '### 1. Ý nghĩa của SOLID
SOLID là bộ 5 nguyên lý thiết kế hệ thống hướng đối tượng giúp mã nguồn trở nên dễ đọc, dễ bảo trì, dễ mở rộng và kiểm thử:
- **S - Single Responsibility Principle (Đơn nhiệm):** Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ chịu trách nhiệm cho một chức năng duy nhất).
- **O - Open/Closed Principle (Mở/Đóng):** Lớp nên được mở cho việc mở rộng (thêm chức năng mới) nhưng đóng cho việc sửa đổi (không được sửa đổi mã nguồn hiện tại). Thực hiện qua trừu tượng hóa và kế thừa.
- **L - Liskov Substitution Principle (Thay thế Liskov):** Các đối tượng của lớp con phải có thể thay thế cho các đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình.
- **I - Interface Segregation Principle (Phân tách Interface):** Thà tạo nhiều Interface nhỏ, chuyên biệt còn hơn tạo một Interface lớn chứa quá nhiều phương thức dư thừa bắt các lớp con phải triển khai dù không dùng tới.
- **D - Dependency Inversion Principle (Đảo ngược phụ thuộc):** Các thành phần cấp cao không nên phụ thuộc trực tiếp vào các thành phần cấp thấp. Cả hai nên phụ thuộc vào sự trừu tượng (Interface/Abstract class).', 
    'core-theory', 
    '["Vi phạm Single Responsibility: Một lớp `Invoice` vừa tính tiền vừa ghi hóa đơn xuống database và in PDF. Sửa lại bằng cách tách thành `InvoiceCalculator`, `InvoiceRepository` và `InvoicePrinter`.", "Áp dụng Dependency Inversion: Lớp `OrderService` không khởi tạo trực tiếp `MySQLDatabase db = new MySQLDatabase()`, mà nhận qua Interface `Database` được bơm vào (Dependency Injection) từ bên ngoài."]'::jsonb, 
    '["Áp dụng SOLID giúp giảm thiểu sự phụ thuộc quá chặt chẽ (tight coupling) giữa các lớp.", "Đặc biệt chú ý nguyên lý Liskov: tránh việc kế thừa làm thay đổi hành vi logic cơ bản của cha (ví dụ: lớp chim cánh cụt kế thừa lớp chim nhưng ném ra ngoại lệ KhôngThểBay).", "Luôn lập trình hướng giao diện (program to an interface, not an implementation)."]'::jsonb, 
    7, 
    TRUE,
    'design-principles'
  ),
  (
    'cs_prog_08', 
    'cs_programming', 
    13, 
    'Nguyên lý & Mẫu thiết kế', 
    'Các mẫu thiết kế phần mềm kinh điển (Design Patterns)', 
    '### 1. Phân loại Design Patterns
Design Patterns là các giải pháp mẫu chuẩn hóa cho các vấn đề thường gặp trong thiết kế phần mềm. Được chia thành 3 nhóm chính:
- **Creational (Nhóm khởi tạo):** Giải quyết vấn đề tạo đối tượng một cách an toàn và linh hoạt.
  - **Singleton:** Đảm bảo một lớp chỉ có duy nhất một thực thể (instance) toàn cục.
  - **Factory Method:** Định nghĩa một interface tạo đối tượng nhưng để các lớp con quyết định lớp nào sẽ được khởi tạo.
- **Structural (Nhóm cấu trúc):** Giải quyết vấn đề liên kết cấu trúc các lớp và đối tượng.
  - **Adapter:** Cầu nối trung gian cho phép các interface không tương thích có thể làm việc cùng nhau.
  - **Decorator:** Cho phép bổ sung hành vi cho đối tượng một cách động mà không ảnh hưởng đến cấu trúc lớp gốc.
- **Behavioral (Nhóm hành vi):** Giải quyết vấn đề phân phối trách nhiệm giao tiếp giữa các đối tượng.
  - **Observer:** Thiết lập mối quan hệ một-nhiều. Khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc (subscribers) sẽ nhận được thông báo tự động.
  - **Strategy:** Định nghĩa một tập hợp thuật toán, bao đóng từng thuật toán lại và cho phép thay đổi thuật toán được sử dụng linh hoạt khi chạy chương trình.', 
    'core-theory', 
    '["Triển khai mẫu Singleton thread-safe bằng kỹ thuật Double-Checked Locking trong Java.", "Sử dụng Strategy Pattern để thay đổi linh hoạt thuật toán nén file (ZIP, RAR, TAR) tùy theo lựa chọn của người dùng khi ứng dụng đang chạy."]'::jsonb, 
    '["Tránh over-engineering: chỉ áp dụng Design Pattern khi bài toán thực sự đòi hỏi độ linh hoạt và khả năng mở rộng, tránh áp dụng bừa bãi làm phức tạp hóa mã nguồn.", "Nắm vững ý định thiết kế (intent) của từng pattern thay vì chỉ học thuộc cấu trúc sơ đồ lớp.", "Kết hợp nhuần nhuyễn các Design Patterns với nguyên lý SOLID để tạo ra kiến trúc sạch."]'::jsonb, 
    7, 
    TRUE,
    'design-principles'
  ),
  (
    'cs_prog_09', 
    'cs_programming', 
    13, 
    'Luồng phát triển & Kiểm thử', 
    'Quản lý Mã nguồn nâng cao với Git', 
    '### 1. Cơ chế lưu trữ nội bộ của Git
Khác với các hệ thống quản lý phiên bản cũ lưu trữ dưới dạng delta thay đổi, Git quản lý dữ liệu dưới dạng các ảnh chụp nhanh (Snapshots) của thư mục dự án tại mỗi thời điểm commit.

### 2. Phân biệt Git Merge và Git Rebase
- **Git Merge:** Kết hợp nhánh con vào nhánh chính bằng cách tạo ra một commit nối mới (merge commit). Giúp lưu trữ toàn vẹn lịch sử rẽ nhánh nhưng làm lịch sử commit bị rối rắm nhiều nhánh đan xen.
- **Git Rebase:** Mang các commit của nhánh con đặt đè lên đỉnh commit mới nhất của nhánh chính, viết lại lịch sử commit của nhánh con. Mang lại lịch sử commit dạng đường thẳng cực kỳ sạch đẹp, nhưng nguy hiểm nếu áp dụng cho các nhánh đã được push lên server chung.

### 3. Xử lý xung đột mã nguồn (Merge Conflict)
Xung đột xảy ra khi hai lập trình viên cùng sửa đổi một dòng code trên cùng một file ở hai nhánh khác nhau và tiến hành gộp nhánh. Git sẽ đánh dấu vùng xung đột (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) và bắt buộc lập trình viên phải chọn thủ công dòng code giữ lại trước khi commit hoàn tất phép gộp.', 
    'core-theory', 
    '["Thực hiện Rebase nhánh tính năng lên nhánh main: `git checkout feature; git rebase main;`", "Sử dụng lệnh `git stash` để lưu tạm các thay đổi chưa commit khi cần chuyển nhánh khẩn cấp để sửa lỗi."]'::jsonb, 
    '["Không bao giờ chạy git rebase trên các nhánh công khai đã được chia sẻ với các thành viên khác (Public Branches) để tránh phá vỡ lịch sử commit của họ.", "Viết thông điệp commit (commit message) rõ ràng, ngắn gọn và nhất quán cấu trúc quy định.", "Sử dụng tệp `.gitignore` chính xác để loại bỏ các thư mục node_modules, build artifacts hoặc file cấu hình chứa thông tin bảo mật nhạy cảm khỏi git repository."]'::jsonb, 
    6, 
    TRUE,
    'development-workflow'
  ),
  (
    'cs_prog_10', 
    'cs_programming', 
    13, 
    'Luồng phát triển & Kiểm thử', 
    'Kiểm thử Đơn vị (Unit Test) & Quy trình TDD', 
    '### 1. Khái niệm Unit Test
Kiểm thử đơn vị là quá trình kiểm tra tính đúng đắn của các đơn vị mã nguồn nhỏ nhất (thường là một hàm hoặc phương thức đơn lẻ) một cách cô lập hoàn toàn khỏi hệ thống (không truy cập cơ sở dữ liệu thật, không gọi mạng thật).

### 2. Kỹ thuật Mocking trong Kiểm thử
Để cô lập hàm cần test, ta sử dụng các thư viện Mocking (như Mockito, Jest) để tạo ra các đối tượng giả lập (Mock Objects). Khi hàm gọi đến database, đối tượng mock sẽ trả về kết quả giả định lập tức mà không cần kết nối DB thật.

### 3. Quy trình phát triển hướng kiểm thử (TDD - Test-Driven Development)
TDD đảo ngược quy trình truyền thống: Viết test trước, viết code chạy sau. Quy trình gồm 3 bước lặp (Red-Green-Refactor):
1. **Red (Đỏ):** Viết một ca kiểm thử (test case) cho tính năng mới. Chạy test và đảm bảo test bị báo thất bại vì tính năng chưa được viết.
2. **Green (Xanh):** Viết mã nguồn tối giản nhất có thể để vượt qua ca kiểm thử đó (chạy test báo thành công).
3. **Refactor (Tối ưu):** Tối ưu hóa mã nguồn cho sạch đẹp, loại bỏ trùng lặp mà vẫn đảm bảo test chạy thành công.', 
    'core-theory', 
    '["Viết một test case Jest kiểm tra hàm tính tổng: `expect(sum(2, 3)).toBe(5);`", "Sử dụng thư viện mock để giả lập kết quả trả về của một API client để test controller."]'::jsonb, 
    '["Mỗi ca kiểm thử đơn vị nên tuân theo cấu trúc 3A: Arrange (Chuẩn bị dữ liệu) -> Act (Thực thi hàm cần test) -> Assert (Xác minh kết quả).", "Đảm bảo độ bao phủ mã nguồn (Test Coverage) ở mức hợp lý (thường từ 70% đến 85%), tránh viết các test case vô nghĩa chỉ để tăng phần trăm coverage.", "Tự động hóa việc chạy toàn bộ bộ kiểm thử đơn vị (Test Suite) trong luồng CI/CD trước khi cho phép gộp code."]'::jsonb, 
    6, 
    TRUE,
    'development-workflow'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_prog_01', 'programming-paradigms', 'lesson', 'Lập trình Hướng đối tượng nâng cao (OOP)', '{"lesson_id": "cs_prog_01"}'::jsonb, 10, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_02', 'programming-paradigms', 'lesson', 'Con trỏ & Quản lý Bộ nhớ (Stack vs Heap)', '{"lesson_id": "cs_prog_02"}'::jsonb, 20, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_03', 'programming-paradigms', 'lesson', 'Lập trình Hàm cơ bản (Functional Programming)', '{"lesson_id": "cs_prog_03"}'::jsonb, 30, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_04', 'software-reliability', 'lesson', 'Lập trình Đa luồng & Bất đồng bộ (Concurrency)', '{"lesson_id": "cs_prog_04"}'::jsonb, 10, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_05', 'software-reliability', 'lesson', 'Xử lý Ngoại lệ & Ghi Log (Logging)', '{"lesson_id": "cs_prog_05"}'::jsonb, 20, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_06', 'design-principles', 'lesson', 'Lập trình Tổng quát (Generic Programming)', '{"lesson_id": "cs_prog_06"}'::jsonb, 10, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_07', 'design-principles', 'lesson', '5 Nguyên lý Thiết kế hướng đối tượng SOLID', '{"lesson_id": "cs_prog_07"}'::jsonb, 20, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_08', 'design-principles', 'lesson', 'Các mẫu thiết kế phần mềm kinh điển (Design Patterns)', '{"lesson_id": "cs_prog_08"}'::jsonb, 30, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_09', 'development-workflow', 'lesson', 'Quản lý Mã nguồn nâng cao với Git', '{"lesson_id": "cs_prog_09"}'::jsonb, 10, 10, 20, 'cs_programming', 13),
  ('act-lesson-cs_prog_10', 'development-workflow', 'lesson', 'Kiểm thử Đơn vị (Unit Test) & Quy trình TDD', '{"lesson_id": "cs_prog_10"}'::jsonb, 20, 10, 20, 'cs_programming', 13)
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
