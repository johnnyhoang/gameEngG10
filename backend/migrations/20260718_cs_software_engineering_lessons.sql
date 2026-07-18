-- SQL migration to seed topics and 10 core lessons for cs_software_engineering (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_software_engineering (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('software-processes', 'cs_software_engineering', 13, 'Quy trình & Mô hình Phát triển', 'Các mô hình phát triển phần mềm truyền thống Waterfall, mô hình lặp xoắn ốc Spiral và hệ phương pháp Agile/Scrum.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('software-requirements', 'cs_software_engineering', 13, 'Phân tích Yêu cầu & UML', 'Thu thập yêu cầu chức năng/phi chức năng, sơ đồ Use Cases, Class Diagram, Sequence Diagram biểu diễn hệ thống.', 2, 'phong', 'high', 30, ARRAY['mcq']::varchar[]),
  ('architecture-design', 'cs_software_engineering', 13, 'Kiến trúc & Mẫu thiết kế (Design Patterns)', 'Phân biệt Monolith vs Microservices, mô hình MVC và các mẫu thiết kế GoF kinh điển Singleton, Factory, Strategy, Observer.', 3, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('quality-testing', 'cs_software_engineering', 13, 'Kiểm thử, SOLID & CI/CD', 'Các cấp độ kiểm thử phần mềm, nguyên lý thiết kế SOLID, tái cấu trúc mã nguồn và quy trình DevOps CI/CD.', 4, 'bang', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_software_engineering (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_se_01', 
    'cs_software_engineering', 
    13, 
    'Quy trình & Mô hình Phát triển', 
    'Các mô hình quy trình phần mềm (Waterfall, V-Model, Spiral)', 
    '### 1. Mô hình Thác nước (Waterfall Model)
Quy trình phát triển tuyến tính tuần tự qua các giai đoạn độc lập:
`Yêu cầu` $\rightarrow$ `Thiết kế` $\rightarrow$ `Triển khai` $\rightarrow$ `Kiểm thử` $\rightarrow$ `Bảo trì`.
- **Đặc trưng:** Giai đoạn sau chỉ bắt đầu khi giai đoạn trước đã hoàn thành và được phê duyệt tài liệu đầy đủ.
- **Nhược điểm:** Cực kỳ cứng nhắc, khó thích ứng trước thay đổi yêu cầu của khách hàng; người dùng chỉ thấy được sản phẩm ở cuối chu kỳ.

### 2. Mô hình chữ V (V-Model)
Bản cải tiến của Thác nước, nhấn mạnh mối quan hệ song song trực tiếp giữa mỗi giai đoạn phát triển và giai đoạn kiểm thử (testing) tương ứng (ví dụ: Phân tích yêu cầu đi đôi với Kiểm thử hệ thống, Thiết kế chi tiết đi đôi với Kiểm thử đơn vị Unit Test).

### 3. Mô hình xoắn ốc (Spiral Model)
Mô hình phát triển tiến hóa lặp kết hợp phân tích rủi ro (Risk Analysis) chuyên sâu. Mỗi vòng xoắn gồm 4 hoạt động:
1. Xác định mục tiêu, các giải pháp thay thế.
2. Đánh giá giải pháp, nhận diện và giải quyết rủi ro (Risk management).
3. Phát triển và kiểm thử sản phẩm của vòng lặp đó.
4. Lập kế hoạch cho vòng lặp tiếp theo.
Phù hợp cho các dự án quy mô lớn, phức tạp và chứa đựng nhiều yếu tố bất định.', 
    'core-theory', 
    '["Dự án xây dựng cầu đường hoặc hệ thống phần mềm hàng không bắt buộc dùng Waterfall/V-Model để bảo đảm quy chuẩn an toàn tuyệt đối.", "Dự án phát triển phần mềm trí tuệ nhân tạo thế hệ mới có tính rủi ro công nghệ cao áp dụng Spiral Model để kiểm soát rủi ro qua từng vòng lặp."]'::jsonb, 
    '["Mô hình Waterfall chỉ phù hợp khi yêu cầu hệ thống cực kỳ rõ ràng, ổn định và không thay đổi trong suốt quá trình phát triển.", "Trong V-Model, việc lập kế hoạch kiểm thử được thực hiện rất sớm ngay khi đang phân tích thiết kế, giúp phát hiện lỗi hệ thống sớm.", "Phân tích rủi ro là đặc trưng độc nhất và quan trọng nhất của Spiral Model so với các mô hình khác."]'::jsonb, 
    5, 
    TRUE,
    'software-processes'
  ),
  (
    'cs_se_02', 
    'cs_software_engineering', 
    13, 
    'Quy trình & Mô hình Phát triển', 
    'Tuyên ngôn Agile & Hệ phương pháp Scrum', 
    '### 1. Tuyên ngôn Agile (Agile Manifesto)
Agile đề cao sự linh hoạt, phản ứng nhanh với thay đổi thay vì tuân thủ cứng nhắc kế hoạch. Gồm 4 giá trị cốt lõi:
1. **Cá nhân và sự tương tác** quan trọng hơn quy trình và công cụ.
2. **Phần mềm chạy tốt** quan trọng hơn tài liệu đầy đủ.
3. **Cộng tác với khách hàng** quan trọng hơn thương lượng hợp đồng.
4. **Phản hồi với thay đổi** quan trọng hơn tuân thủ kế hoạch.

### 2. Quy trình phát triển Scrum
Scrum là khung làm việc phổ biến nhất của Agile, chia nhỏ quá trình phát triển thành các vòng lặp thời gian cố định gọi là **Sprint** (thường dài từ 2 đến 4 tuần).
- **Các vai trò trong Scrum (Roles):**
  - **Product Owner (PO):** Đại diện khách hàng, quản lý Backlog (danh sách yêu cầu), quyết định độ ưu tiên tính năng.
  - **Scrum Master (SM):** Người hỗ trợ luồng làm việc, loại bỏ các trở ngại (blockers) cho team, đảm bảo quy trình Scrum được vận hành chuẩn xác.
  - **Development Team (Developers/QA):** Nhóm tự tổ chức thực hiện viết code và kiểm thử tạo ra phần mềm chạy được cuối Sprint.
- **Các sự kiện trong Scrum (Events):**
  - **Sprint Planning:** Lập kế hoạch công việc cho Sprint mới.
  - **Daily Standup:** Họp nhanh hàng ngày dưới 15 phút để báo cáo tiến độ (Hôm qua làm gì, hôm nay làm gì, có blocker gì).
  - **Sprint Review:** Trình diễn sản phẩm chạy được cho PO và khách hàng duyệt ở cuối Sprint.
  - **Sprint Retrospective:** Họp cải tiến quy trình của team sau mỗi Sprint.', 
    'core-theory', 
    '["Team phát triển game áp dụng Scrum với Sprint dài 2 tuần, họp Daily Standup mỗi buổi sáng lúc 9:00 để cập nhật tiến độ board Jira.", "Product Owner thực hiện phân tích và gán độ ưu tiên cho các User Story trong Product Backlog trước buổi Sprint Planning."]'::jsonb, 
    '["Agile không có nghĩa là không viết tài liệu, mà đề cao việc tạo ra giá trị phần mềm chạy được trước tiên cho khách hàng.", "Trong Scrum, Development Team có quyền tự quyết định khối lượng công việc họ có thể hoàn thành trong một Sprint, PO và SM không được áp đặt.", "Sprint Backlog là danh sách các tác vụ được chọn lọc từ Product Backlog để hoàn thành riêng trong Sprint hiện tại và không được thay đổi giữa chừng."]'::jsonb, 
    5, 
    TRUE,
    'software-processes'
  ),
  (
    'cs_se_03', 
    'cs_software_engineering', 
    13, 
    'Phân tích Yêu cầu & UML', 
    'Phân tích yêu cầu phần mềm (Functional vs Non-functional)', 
    '### 1. Yêu cầu chức năng (Functional Requirements)
Mô tả các hành vi, dịch vụ cụ thể mà hệ thống phần mềm bắt buộc phải thực hiện được khi người dùng tương tác.
- *Ví dụ:* "Hệ thống phải cho phép người dùng đăng nhập qua Google", "Hệ thống phải tự động tính tiền giỏ hàng và gửi email hóa đơn".

### 2. Yêu cầu phi chức năng (Non-functional Requirements)
Mô tả các tiêu chuẩn chất lượng, ràng buộc kỹ thuật của hệ thống (hiệu năng, bảo mật, độ tin cậy, tính tương thích).
- *Ví dụ:* "Hệ thống phải chịu tải được 10,000 người dùng truy cập đồng thời", "Thời gian tải trang web phải dưới 2 giây", "Mật khẩu người dùng bắt buộc phải được mã hóa một chiều bằng thuật toán bcrypt".

### 3. Use Case (Trường hợp sử dụng)
Phương pháp đặc tả yêu cầu chức năng trực quan dưới góc nhìn tương tác của người dùng.
- **Actor (Tác nhân):** Người dùng hoặc hệ thống ngoại vi tương tác với phần mềm (ví dụ: Khách hàng, Quản trị viên).
- **Use Case:** Chức năng hệ thống mang lại giá trị cho Actor (ví dụ: Thanh toán hóa đơn).
- **Mối quan hệ:**
  - `<<include>>`: Hành vi bắt buộc phải xảy ra (ví dụ: Use case `Thanh toán` bắt buộc include `Xác thực tài khoản`).
  - `<<extend>>`: Hành vi tùy chọn chỉ xảy ra trong điều kiện nhất định (ví dụ: `Thanh toán` extend `Nhập mã giảm giá`).', 
    'core-theory', 
    '["Yêu cầu ''Phần mềm chạy trên hệ điều hành Android và iOS'' là yêu cầu phi chức năng thuộc nhóm tính tương thích (Compatibility).", "Thiết lập sơ đồ Use Case cho chức năng rút tiền tại cây ATM với Actor là Khách hàng và Hệ thống Ngân hàng liên kết."]'::jsonb, 
    '["Yêu cầu chức năng định nghĩa hệ thống làm gì (What), yêu cầu phi chức năng định nghĩa hệ thống hoạt động thế nào (How).", "Thiếu sót yêu cầu phi chức năng (như hiệu năng, bảo mật) là nguyên nhân hàng đầu khiến các dự án phần mềm bị sập khi đưa vào vận hành thực tế.", "Mối quan hệ include thể hiện sự tái sử dụng mã nguồn bắt buộc, extend thể hiện luồng rẽ nhánh điều kiện của Use Case."]'::jsonb, 
    6, 
    TRUE,
    'software-requirements'
  ),
  (
    'cs_se_04', 
    'cs_software_engineering', 
    13, 
    'Phân tích Yêu cầu & UML', 
    'Mô hình hóa hệ thống với UML (Class, Sequence Diagrams)', 
    '### 1. UML Class Diagram (Sơ đồ lớp)
Sơ đồ tĩnh mô tả cấu trúc của hệ thống bằng cách hiển thị các lớp (Classes), thuộc tính (Attributes), phương thức (Methods) và mối quan hệ giữa chúng:
- **Association (Liên kết):** Quan hệ ngữ nghĩa chung giữa hai lớp (ví dụ: `SinhVien` liên kết với `MonHoc`).
- **Aggregation (Thu gom - yếu):** Quan hệ "has-a", phần tử con có thể tồn tại độc lập khi phần tử cha bị hủy (ký hiệu hình thoi rỗng $\diamondsuit$, ví dụ: `LopHoc` và `GiaoVien`).
- **Composition (Bao hàm - mạnh):** Quan hệ "part-of" sinh tử có nhau, phần tử con không thể tồn tại độc lập nếu phần tử cha bị hủy (ký hiệu hình thoi đặc $\blacklozenge$, ví dụ: `Folder` và `File`, `DonHang` và `ChiTietDonHang`).
- **Generalization (Khái quát hóa):** Quan hệ kế thừa lớp cha - con (ví dụ: `XeMay` kế thừa từ `PhuongTien`).

### 2. UML Sequence Diagram (Sơ đồ tuần tự)
Sơ đồ động mô tả cách thức các đối tượng tương tác trao đổi thông điệp (Messages) với nhau theo dòng thời gian.
- **Lifeline (Đường đời):** Biểu diễn sự tồn tại của đối tượng theo thời gian (đường đứt nét dọc).
- **Activation Bar:** Biểu thị khoảng thời gian đối tượng đang thực hiện hành động.
- **Synchronous Message (Thông điệp đồng bộ):** Máy gửi đợi phản hồi trước khi chạy tiếp (mũi tên nét liền đầu đặc $\rightarrow$).
- **Return Message (Thông điệp trả về):** Trả dữ liệu về (mũi tên đứt nét $\dashrightarrow$).', 
    'core-theory', 
    '["Thiết lập Class Diagram cho hệ thống quản lý thư viện gồm các lớp: Book, Author, LibraryCard, Patron với mối quan hệ tương ứng.", "Vẽ Sequence Diagram mô tả luồng đăng nhập hệ thống: User -> Browser -> Auth API -> Database và phản hồi ngược lại."]'::jsonb, 
    '["Aggregation và Composition đều biểu thị mối quan hệ toàn thể - bộ phận, nhưng Composition có ràng buộc vòng đời nghiêm ngặt hơn.", "Sơ đồ Class Diagram phục vụ trực tiếp cho việc sinh code hướng đối tượng (OOP).", "Sơ đồ Sequence Diagram cực kỳ hữu ích để làm tài liệu thiết kế các luồng giao tiếp API giữa các microservices."]'::jsonb, 
    6, 
    TRUE,
    'software-requirements'
  ),
  (
    'cs_se_05', 
    'cs_software_engineering', 
    13, 
    'Architecture & Design Patterns', 
    'Kiến trúc phần mềm phổ biến (Monolith vs Microservices)', 
    '### 1. Kiến trúc Đơn khối (Monolithic Architecture)
Toàn bộ các thành phần chức năng của phần mềm (UI, Logic nghiệp vụ, Database access) được đóng gói và triển khai chung trong một ứng dụng duy nhất.
- **Ưu điểm:** Dễ phát triển ban đầu, dễ test tích hợp và triển khai nhanh trên 1 server duy nhất.
- **Nhược điểm:** Khó mở rộng quy mô (bắt buộc phải scale toàn bộ cục), mã nguồn phình to gây khó bảo trì, một lỗi nhỏ ở mô-đun này có thể làm sập toàn bộ hệ thống (Single Point of Failure).

### 2. Kiến trúc Vi dịch vụ (Microservices Architecture)
Hệ thống được chia nhỏ thành nhiều dịch vụ độc lập, mỗi dịch vụ xử lý một nghiệp vụ cụ thể, có database riêng biệt và giao tiếp với nhau qua API (REST, gRPC) hoặc Message Queue.
- **Ưu điểm:** Dễ dàng scale độc lập dịch vụ chịu tải cao, cho phép sử dụng các công nghệ/ngôn ngữ khác nhau cho từng service, cô lập lỗi tốt.
- **Nhược điểm:** Phức tạp trong việc quản lý giao tiếp mạng, khó bảo đảm tính nhất quán dữ liệu (phải dùng Distributed Transactions - Saga pattern), triển khai phức tạp (yêu cầu DevOps tốt, Docker/Kubernetes).

### 3. Mô hình MVC (Model-View-Controller)
Mẫu kiến trúc tách biệt ứng dụng thành 3 thành phần độc lập:
- **Model:** Quản lý dữ liệu và logic nghiệp vụ.
- **View:** Hiển thị giao diện người dùng (UI).
- **Controller:** Tiếp nhận yêu cầu từ người dùng, tương tác với Model và cập nhật View.', 
    'core-theory', 
    '["Hệ thống thương mại điện tử ban đầu viết bằng Laravel đơn khối (Monolith), sau đó scale up tách ra các microservices: Payment Service (Go), Inventory Service (Java), Auth Service (Node.js).", "Mô tả dòng chảy MVC khi người dùng click nút xem giỏ hàng trên trình duyệt."]'::jsonb, 
    '["Không có kiến trúc nào là vạn năng. Quy tắc vàng: Bắt đầu dự án bằng Monolith gọn nhẹ, khi quy mô phình to và team đông mới chuyển đổi sang Microservices.", "Trong Microservices, mỗi dịch vụ bắt buộc phải tự quản lý database riêng của nó để tránh liên kết chặt chẽ (tight coupling) tầng dữ liệu.", "Mô hình MVC giúp lập trình viên frontend và backend làm việc độc lập song song không đè code lên nhau."]'::jsonb, 
    6, 
    TRUE,
    'architecture-design'
  ),
  (
    'cs_se_06', 
    'cs_software_engineering', 
    13, 
    'Architecture & Design Patterns', 
    'Các mẫu thiết kế khởi tạo GoF (Singleton, Factory, Builder)', 
    '### 1. Mẫu thiết kế Singleton
Bảo đảm một lớp chỉ có duy nhất một thực thể (Instance) tồn tại toàn cục và cung cấp điểm truy cập duy nhất tới thực thể đó.
- **Cách triển khai:** Khóa hàm khởi tạo (private constructor), duy trì một biến static lưu instance duy nhất, cung cấp hàm static `getInstance()` để lấy instance đó (kết hợp Lazy Initialization và Thread-safe locking).

### 2. Mẫu thiết kế Factory Method
Định nghĩa một giao diện (Interface) để khởi tạo đối tượng, nhưng để các lớp con tự quyết định lớp nào sẽ được khởi tạo.
- **Mục tiêu:** Tách biệt logic khởi tạo đối tượng khỏi mã nguồn sử dụng trực tiếp, giúp hệ thống dễ mở rộng thêm class mới mà không cần sửa code cũ (tuân thủ nguyên lý Open-Closed).

### 3. Mẫu thiết kế Builder
Tách biệt quá trình xây dựng một đối tượng phức tạp ra khỏi biểu diễn của nó, cho phép cùng một quá trình khởi tạo tạo ra các biểu diễn khác nhau.
- **Mục tiêu:** Tránh lỗi constructor quá nhiều tham số (telescoping constructor) khó đọc, cho phép khởi tạo từng thuộc tính linh hoạt dạng xâu chuỗi (Method Chaining).', 
    'core-theory', 
    '["Triển khai lớp kết nối cơ sở dữ liệu DatabaseConnection bằng Singleton để tránh việc tạo hàng ngàn kết nối trùng lặp gây nghẽn DB.", "Khởi tạo đối tượng xe hơi phức tạp bằng Builder: `Car car = new CarBuilder().setEngine(\"V8\").setColor(\"Red\").setSeats(4).build();`"]'::jsonb, 
    '["Singleton có thể gây khó khăn cho việc viết Unit Test vì trạng thái toàn cục bị chia sẻ chéo chéo giữa các bài test.", "Factory Method biến việc gọi từ `new SpecificProduct()` thành một hàm trung gian, giúp giảm phụ thuộc code chặt chẽ.", "Builder Pattern cực kỳ hữu dụng khi tạo các đối tượng bất biến (Immutable objects) có nhiều thuộc tính tùy chọn."]'::jsonb, 
    6, 
    TRUE,
    'architecture-design'
  ),
  (
    'cs_se_07', 
    'cs_software_engineering', 
    13, 
    'Architecture & Design Patterns', 
    'Mẫu thiết kế hành vi & cấu trúc GoF (Observer, Strategy, Adapter)', 
    '### 1. Mẫu thiết kế Observer (Người quan sát)
Định nghĩa mối quan hệ phụ thuộc một-nhiều giữa các đối tượng. Khi một đối tượng thay đổi trạng thái (Subject), tất cả các đối tượng phụ thuộc của nó (Observers) sẽ được tự động thông báo và cập nhật.
- **Mục tiêu:** Giảm sự liên kết giữa nguồn phát tín hiệu và các bên tiêu thụ tín hiệu. Nền tảng của lập trình hướng sự kiện (Event-driven).

### 2. Mẫu thiết kế Strategy (Chiến lược)
Định nghĩa một tập hợp các thuật toán, đóng gói từng thuật toán lại và làm cho chúng có thể thay thế luân phiên nhau dễ dàng tại thời điểm chạy (Runtime).
- **Mục tiêu:** Tránh việc viết các câu lệnh điều kiện `if-else` hoặc `switch-case` quá dài khi lựa chọn giải pháp hành vi.

### 3. Mẫu thiết kế Adapter (Bộ chuyển đổi)
Cho phép các đối tượng có giao diện (Interface) không tương thích có thể làm việc được với nhau.
- **Mục tiêu:** Hoạt động như một bộ chuyển đổi nguồn điện, chuyển interface của một class có sẵn thành interface mà client mong đợi mà không cần sửa code của class có sẵn đó.', 
    'core-theory', 
    '["Hệ thống thương mại điện tử gửi thông báo cho khách hàng khi trạng thái đơn hàng đổi từ ''Chờ duyệt'' sang ''Đang giao'' dùng Observer.", "Thuật toán tính phí vận chuyển đổi luồng linh hoạt giữa GiaoHangNhanh, ViettelPost và GrabExpress tại runtime dùng Strategy Pattern."]'::jsonb, 
    '["Observer Pattern có thể gây rò rỉ bộ nhớ (Memory leaks) nếu các đối tượng đăng ký nhận tin không được hủy đăng ký (unsubscribe) khi bị xóa.", "Strategy Pattern thúc đẩy nguyên lý SOLID Single Responsibility bằng cách cô lập thuật toán phức tạp ra các lớp chuyên biệt độc lập.", "Adapter Pattern thường được dùng khi tích hợp thư viện từ bên thứ ba vào hệ thống cũ của doanh nghiệp."]'::jsonb, 
    7, 
    TRUE,
    'architecture-design'
  ),
  (
    'cs_se_08', 
    'cs_software_engineering', 
    13, 
    'Kiểm thử, SOLID & CI/CD', 
    'Các phương pháp & Cấp độ kiểm thử phần mềm', 
    '### 1. Cấp độ kiểm thử phần mềm (Testing Levels)
1. **Unit Testing (Kiểm thử đơn vị):** Kiểm thử các thành phần nhỏ nhất của code (hàm, phương thức, lớp) một cách cô lập. Thực hiện bởi lập trình viên.
2. **Integration Testing (Kiểm thử tích hợp):** Kiểm thử sự tương tác giao tiếp giữa các mô-đun kết hợp với nhau.
3. **System Testing (Kiểm thử hệ thống):** Kiểm thử toàn bộ phần mềm hoàn chỉnh sau tích hợp để đảm bảo đáp ứng đúng yêu cầu ban đầu.
4. **Acceptance Testing (Kiểm thử chấp nhận):** Thực hiện bởi khách hàng/người dùng cuối để quyết định nghiệm thu bàn giao hệ thống.

### 2. Phương pháp kiểm thử
- **Black-box Testing (Kiểm thử hộp đen):** Kiểm thử viên không biết cấu trúc mã nguồn bên trong. Chỉ tập trung vào nhập đầu vào và đối chiếu đầu ra có đúng đặc tả yêu cầu không.
- **White-box Testing (Kiểm thử hộp trắng):** Kiểm thử viên biết rõ cấu trúc mã nguồn bên trong. Thiết kế test cases để đi qua tối đa các nhánh logic, vòng lặp và câu điều kiện trong code.

### 3. Khái niệm Mocking trong Unit Test
Khi viết Unit Test cho một hàm, ta cần cô lập hoàn toàn hàm đó khỏi các yếu tố bên ngoài (như Database, API mạng). Ta sử dụng **Mock** để giả lập hành vi của các đối tượng ngoại vi này, trả về kết quả định sẵn để bài test chạy nhanh và ổn định.', 
    'core-theory', 
    '["Viết Unit Test bằng Jest cho hàm tính tổng hóa đơn, giả lập (Mock) kết nối tới cơ sở dữ liệu tỷ giá.", "Kiểm thử hộp đen kiểm tra tính năng thanh toán thẻ tín dụng xem hệ thống có trả lời lỗi khi nhập thẻ hết hạn không."]'::jsonb, 
    '["Unit Test chạy cực kỳ nhanh (vài mili-giây) vì không tương tác với các I/O thực tế như ổ cứng hay mạng nhờ Mocking.", "Độ bao phủ mã nguồn (Code Coverage) là thước đo phần trăm số dòng code được chạy qua bởi bộ Unit Test; Coverage cao không đồng nghĩa với việc code hoàn hảo không lỗi.", "TDD (Test-Driven Development) là quy trình bắt lập trình viên viết test case trước rồi mới viết code chạy sau."]'::jsonb, 
    6, 
    TRUE,
    'quality-testing'
  ),
  (
    'cs_se_09', 
    'cs_software_engineering', 
    13, 
    'Kiểm thử, SOLID & CI/CD', 
    'Nguyên lý thiết kế SOLID & Tái cấu trúc code', 
    '### 1. Nguyên lý SOLID
Bộ 5 nguyên lý thiết kế hướng đối tượng giúp hệ thống dễ mở rộng và bảo trì:
- **S - Single Responsibility Principle (Đơn nhiệm):** Một lớp chỉ nên có duy nhất một lý do để thay đổi (chỉ làm một nhiệm vụ duy nhất).
- **O - Open/Closed Principle (Mở/Đóng):** Lớp nên mở cho việc mở rộng (kế thừa, thêm tính năng) nhưng đóng trước việc sửa đổi trực tiếp code cũ.
- **L - Liskov Substitution Principle (Thay thế Liskov):** Các đối tượng của lớp con phải có khả năng thay thế lớp cha mà không làm thay đổi tính đúng đắn của chương trình.
- **I - Interface Segregation Principle (Phân tách giao diện):** Không nên bắt buộc client triển khai các giao diện chứa các hàm mà chúng không sử dụng. Chia nhỏ giao diện lớn thành nhiều giao diện nhỏ chuyên biệt.
- **D - Dependency Inversion Principle (Đảo ngược phụ thuộc):** Các mô-đun cấp cao không nên phụ thuộc vào các mô-đun cấp thấp; cả hai nên phụ thuộc vào sự trừu tượng (Abstraction/Interface).

### 2. Tái cấu trúc code (Refactoring)
Quá trình cải tiến cấu trúc nội bộ của mã nguồn (làm sạch code, tối ưu thiết kế) mà **không làm thay đổi hành vi bên ngoài** của hệ thống. Nhằm loại bỏ các "mùi hôi của code" (code smells) như code trùng lặp, hàm quá dài.', 
    'core-theory', 
    '["Vi phạm Single Responsibility: Lớp `User` vừa lưu thông tin vừa chứa logic ghi dữ liệu vào file. Sửa đổi: tách lớp `User` và lớp `UserRepository` ghi file.", "Dependency Inversion: Lớp `Car` khởi tạo trực tiếp `GasEngine engine = new GasEngine()`. Sửa đổi: Lớp `Car` nhận tham số interface `IEngine` truyền vào qua constructor."]'::jsonb, 
    '["Nguyên lý Liskov Substitution cảnh báo việc ghi đè (override) hàm của lớp cha làm ném lỗi ngoại lệ (exception) hoặc thay đổi logic mặc định là cực kỳ nguy hiểm.", "Dependency Injection (DI) là kỹ thuật hiện thực hóa nguyên lý Dependency Inversion bằng cách bơm phụ thuộc vào đối tượng từ bên ngoài.", "Chỉ nên tiến hành Refactoring khi hệ thống đã có bộ Unit Test bao phủ tốt để tránh việc tối ưu hóa code vô tình làm phát sinh lỗi mới."]'::jsonb, 
    7, 
    TRUE,
    'quality-testing'
  ),
  (
    'cs_se_10', 
    'cs_software_engineering', 
    13, 
    'Kiểm thử, SOLID & CI/CD', 
    'Tích hợp & Triển khai liên tục (CI/CD) & DevOps', 
    '### 1. Quy trình CI/CD
- **CI (Continuous Integration - Tích hợp liên tục):** Lập trình viên liên tục commit code mới lên repository chung. Mỗi commit tự động kích hoạt tiến trình chạy build dự án và thực thi toàn bộ Unit Test để phát hiện lỗi tích hợp sớm nhất.
- **CD (Continuous Delivery / Deployment - Bàn giao/Triển khai liên tục):**
  - Continuous Delivery: Tự động chuẩn bị gói build sẵn sàng release, việc deploy lên production do con người bấm nút.
  - Continuous Deployment: Tự động hóa hoàn toàn việc đưa bản build vượt qua kiểm thử lên chạy thật trên môi trường Production không cần con người can thiệp.

### 2. Ảo hóa với Docker
Docker đóng gói ứng dụng cùng toàn bộ môi trường chạy (dependencies, libraries, runtime) thành một **Container** độc lập:
- Giải quyết triệt để bài toán: "Code chạy tốt trên máy tôi nhưng lỗi khi đưa lên máy chủ production".
- Tiết kiệm tài nguyên và khởi động nhanh hơn nhiều so với Máy ảo (Virtual Machine) truyền thống nhờ chia sẻ chung nhân hệ điều hành (Host OS Kernel).

### 3. Git Branching Strategy
- **Git Flow:** Quy trình chia nhánh nghiêm ngặt gồm nhánh chính `main/master` (chạy thật), `develop` (tích hợp), nhánh `feature` (phát triển tính năng), `release` (chuẩn bị bàn giao) và `hotfix` (sửa lỗi khẩn cấp trên production).', 
    'core-theory', 
    '["Mỗi khi lập trình viên tạo Pull Request trên GitHub, pipeline GitHub Actions tự động kích hoạt chạy `npm run test` để duyệt PR (CI).", "Viết file Dockerfile định nghĩa môi trường Node.js đóng gói source code app chạy trên container độc lập."]'::jsonb, 
    '["CI/CD không thể hoạt động hiệu quả nếu thiếu hệ thống kiểm thử tự động (Automated Testing) tin cậy làm chốt chặn bảo vệ.", "Container Docker chia sẻ chung nhân hệ điều hành nên nhẹ và khởi động trong vài mili-giây, trong khi Máy ảo VM chứa nguyên một hệ điều hành khách (Guest OS) nặng hàng GB khởi động mất vài phút.", "Tránh tích tụ các nhánh feature quá lâu không merge để tránh xung đột code (Merge Conflict) nghiêm trọng khi tích hợp."]'::jsonb, 
    6, 
    TRUE,
    'quality-testing'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_se_01', 'software-processes', 'lesson', 'Các mô hình quy trình phần mềm (Waterfall, V-Model, Spiral)', '{"lesson_id": "cs_se_01"}'::jsonb, 10, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_02', 'software-processes', 'lesson', 'Tuyên ngôn Agile & Quy trình Scrum', '{"lesson_id": "cs_se_02"}'::jsonb, 20, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_03', 'software-requirements', 'lesson', 'Phân tích yêu cầu phần mềm (Functional vs Non-functional)', '{"lesson_id": "cs_se_03"}'::jsonb, 10, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_04', 'software-requirements', 'lesson', 'Mô hình hóa hệ thống với UML (Class, Sequence)', '{"lesson_id": "cs_se_04"}'::jsonb, 20, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_05', 'architecture-design', 'lesson', 'Kiến trúc phần mềm phổ biến (Monolith vs Microservices)', '{"lesson_id": "cs_se_05"}'::jsonb, 10, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_06', 'architecture-design', 'lesson', 'Các mẫu thiết kế khởi tạo GoF (Singleton, Factory, Builder)', '{"lesson_id": "cs_se_06"}'::jsonb, 20, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_07', 'architecture-design', 'lesson', 'Mẫu thiết kế hành vi & cấu trúc GoF (Observer, Strategy)', '{"lesson_id": "cs_se_07"}'::jsonb, 30, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_08', 'quality-testing', 'lesson', 'Các phương pháp & Cấp độ kiểm thử phần mềm', '{"lesson_id": "cs_se_08"}'::jsonb, 10, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_09', 'quality-testing', 'lesson', 'Nguyên lý thiết kế SOLID & Tái cấu trúc code', '{"lesson_id": "cs_se_09"}'::jsonb, 20, 10, 20, 'cs_software_engineering', 13),
  ('act-lesson-cs_se_10', 'quality-testing', 'lesson', 'Tích hợp & Triển khai liên tục (CI/CD) & DevOps', '{"lesson_id": "cs_se_10"}'::jsonb, 30, 10, 20, 'cs_software_engineering', 13)
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
