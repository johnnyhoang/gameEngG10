-- SQL migration to seed topics and 10 core lessons for cs_database_data (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_database_data (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('db-design', 'cs_database_data', 13, 'Thiết kế & Chuẩn hóa CSDL', 'Mô hình ER, các dạng chuẩn (1NF, 2NF, 3NF, BCNF) và kỹ thuật phân rã không mất mát thông tin.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-query-opt', 'cs_database_data', 13, 'Tối ưu hóa & Đánh chỉ mục', 'Cơ chế hoạt động của Index (B-Tree, Hash), tối ưu câu lệnh SQL, tránh lỗi N+1 Query và phân tích Query Plan.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-transactions', 'cs_database_data', 13, 'Giao dịch & Tính ACID', 'Các cấp độ cô lập giao dịch (Transaction Isolation Levels), cơ chế khóa (Locking) và xử lý tranh chấp dữ liệu.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-architecture', 'cs_database_data', 13, 'Kiến trúc & Tích hợp CSDL', 'Phân biệt SQL vs NoSQL, kỹ thuật Sharding, Replication, cơ chế Cache và tích hợp CSDL trong hệ thống lớn.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_database_data (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_db_01', 
    'cs_database_data', 
    13, 
    'Thiết kế & Chuẩn hóa CSDL', 
    'Mô hình ERD & Thiết kế CSDL Thực tế', 
    '### 1. Khái niệm và Vai trò của Thiết kế CSDL
Thiết kế CSDL là quá trình xác định cấu trúc dữ liệu, các thực thể, mối quan hệ và các ràng buộc nhằm đảm bảo tính toàn vẹn dữ liệu, hiệu năng truy vấn cao và dễ dàng mở rộng.

### 2. Các thành phần chính trong ERD (Entity-Relationship Diagram)
- **Thực thể (Entity):** Một đối tượng trong thế giới thực cần lưu trữ (ví dụ: `User`, `Order`, `Product`).
- **Thuộc tính (Attribute):** Các đặc điểm của thực thể (ví dụ: `email`, `created_at`, `price`).
- **Mối quan hệ (Relationship):** Liên kết giữa các thực thể:
  - **Một - Một (1:1):** Mỗi bản ghi ở bảng A liên kết với duy nhất một bản ghi ở bảng B (ví dụ: `User` và `UserProfile`).
  - **Một - Nhiều (1:N):** Một bản ghi ở bảng A liên kết với nhiều bản ghi ở bảng B (ví dụ: `Class` và `Student`).
  - **Nhiều - Nhiều (N:N):** Cần tách thành một bảng trung gian để tránh trùng lặp dữ liệu (ví dụ: `Student` và `Course` liên kết qua bảng `Enrollment`).', 
    'core-theory', 
    '["Thiết kế bảng trung gian `order_items` để giải quyết mối quan hệ Nhiều - Nhiều giữa `orders` và `products`.", "Sử dụng khóa ngoại (Foreign Key) kèm ràng buộc `ON DELETE CASCADE` để đảm bảo khi xóa một đơn hàng thì các chi tiết đơn hàng tương ứng cũng tự động bị xóa."]'::jsonb, 
    '["Luôn vẽ biểu đồ ERD rõ ràng trước khi viết lệnh SQL tạo bảng.", "Đặt tên bảng ở dạng số nhiều (ví dụ `users`, `orders`) và nhất quán quy tắc đặt tên cột (ví dụ snake_case).", "Xác định rõ ràng các trường bắt buộc (`NOT NULL`) và các giá trị mặc định để tránh dữ liệu rác."]'::jsonb, 
    5, 
    TRUE,
    'db-design'
  ),
  (
    'cs_db_02', 
    'cs_database_data', 
    13, 
    'Thiết kế & Chuẩn hóa CSDL', 
    'Các Dạng chuẩn CSDL & Kỹ thuật Chuẩn hóa', 
    '### 1. Tại sao phải chuẩn hóa CSDL?
Chuẩn hóa (Normalization) là quá trình phân rã các bảng dữ liệu lớn nhằm giảm thiểu sự dư thừa dữ liệu, tránh các dị thường dữ liệu (Anomaly) khi thêm, sửa hoặc xóa bản ghi.

### 2. Các dạng chuẩn cơ bản
- **Dạng chuẩn 1 (1NF):** Mỗi ô dữ liệu chỉ chứa giá trị đơn trị (Atomic value), không chứa danh sách hoặc mảng giá trị lồng nhau.
- **Dạng chuẩn 2 (2NF):** Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hoàn toàn vào khóa chính (không phụ thuộc vào một phần của khóa chính phức hợp).
- **Dạng chuẩn 3 (3NF):** Đạt 2NF và mọi thuộc tính không khóa phải phụ thuộc trực tiếp vào khóa chính, không có phụ thuộc bắc cầu (transitive dependency) qua một thuộc tính không khóa khác.
- **Dạng chuẩn Boyce-Codd (BCNF):** Dạng chuẩn mạnh hơn 3NF. Đạt BCNF nếu với mọi phụ thuộc hàm $X \rightarrow Y$ không tầm thường, thì $X$ phải là siêu khóa (superkey).', 
    'core-theory', 
    '["Phân rã bảng nhân viên chứa thông tin phòng ban (MãNV, TênNV, MãPB, TênPB) thành hai bảng độc lập: `employees` (MãNV, TênNV, MãPB) và `departments` (MãPB, TênPB) để đạt dạng chuẩn 3NF.", "Tách trường danh sách kỹ năng `skills` (ví dụ: ''C++, Python'') trong bảng ứng viên thành các dòng riêng biệt ở bảng phụ để đạt 1NF."]'::jsonb, 
    '["Chuẩn hóa quá mức (lên dạng chuẩn 4NF, 5NF) có thể làm giảm hiệu năng hệ thống do phải thực hiện quá nhiều phép JOIN.", "Luôn xác định rõ các phụ thuộc hàm (Functional Dependency) giữa các thuộc tính để tìm ra khóa chính xác.", "Kỹ thuật chuẩn hóa giúp đảm bảo tính toàn vẹn dữ liệu ở mức tối đa."]'::jsonb, 
    6, 
    TRUE,
    'db-design'
  ),
  (
    'cs_db_03', 
    'cs_database_data', 
    13, 
    'Tối ưu hóa & Đánh chỉ mục', 
    'Cơ chế hoạt động của Index & B-Tree', 
    '### 1. Index là gì?
Index (Chỉ mục) là một cấu trúc dữ liệu phụ giúp tăng tốc độ tìm kiếm bản ghi trong bảng mà không cần phải quét toàn bộ bảng (Table Scan).

### 2. Cấu trúc dữ liệu B-Tree Index
Hầu hết các RDBMS (PostgreSQL, MySQL) sử dụng cấu trúc cây tự cân bằng **B-Tree** (hoặc B+ Tree) làm chỉ mục mặc định:
- Các nút lá (Leaf nodes) chứa giá trị khóa và con trỏ trỏ trực tiếp đến dòng dữ liệu vật lý trên ổ đĩa.
- Độ phức tạp tìm kiếm chỉ là $O(\log N)$ thay vì $O(N)$ của quét toàn bảng.

### 3. Hash Index
Chỉ hỗ trợ so sánh bằng (`=`), không hỗ trợ so sánh khoảng (`<`, `>`, `BETWEEN`) hoặc sắp xếp dữ liệu (`ORDER BY`), vì Hash Index chuyển đổi trực tiếp khóa tìm kiếm thành mã băm không có thứ tự tuần tự.', 
    'core-theory', 
    '["Tạo chỉ mục B-Tree: `CREATE INDEX idx_users_email ON users(email);` giúp tăng tốc độ tìm kiếm đăng nhập từ 500ms xuống dưới 2ms.", "Sử dụng Hash Index trong PostgreSQL: `CREATE INDEX idx_orders_code ON orders USING HASH (order_code);`"]'::jsonb, 
    '["Chỉ mục giúp tăng tốc truy vấn đọc (`SELECT`) nhưng sẽ làm chậm các thao tác ghi (`INSERT`, `UPDATE`, `DELETE`) do hệ thống phải cập nhật cây chỉ mục.", "Tránh đánh chỉ mục cho các cột có độ phân biệt thấp (low cardinality) như giới tính.", "Định kỳ bảo trì, tái xây dựng chỉ mục (`REINDEX`) để dọn dẹp các nút cây bị phân mảnh."]'::jsonb, 
    6, 
    TRUE,
    'db-query-opt'
  ),
  (
    'cs_db_04', 
    'cs_database_data', 
    13, 
    'Tối ưu hóa & Đánh chỉ mục', 
    'Chiến lược Tối ưu hóa truy vấn SQL nâng cao', 
    '### 1. Phân tích truy vấn bằng EXPLAIN
Trước khi tối ưu, ta sử dụng lệnh `EXPLAIN ANALYZE <query>` để xem công cụ lập kế hoạch truy vấn (Query Planner) thực hiện câu lệnh ra sao:
- **Seq Scan (Sequential Scan):** Quét toàn bộ bảng (chậm).
- **Index Scan:** Tìm bằng chỉ mục B-Tree (nhanh).
- **Index Only Scan:** Chỉ quét trên cây chỉ mục mà không cần truy xuất dữ liệu từ bảng vật lý (rất nhanh).

### 2. Tránh lỗi N+1 Query kinh điển
Lỗi N+1 xảy ra khi ta thực hiện 1 câu lệnh truy vấn để lấy danh sách $N$ dòng dữ liệu cha, sau đó chạy thêm $N$ câu lệnh truy vấn riêng lẻ ở vòng lặp để lấy dữ liệu con tương ứng. 
- **Giải pháp:** Sử dụng phép nối `JOIN` hoặc kỹ thuật Preloading/Eager loading dữ liệu con trong một câu lệnh duy nhất.', 
    'core-theory', 
    '["Chuyển câu lệnh lặp N lần SELECT chi tiết sang sử dụng JOIN: `SELECT o.id, o.date, i.product_id FROM orders o JOIN order_items i ON o.id = i.order_id WHERE o.user_id = 1;`", "Sử dụng `EXPLAIN ANALYZE SELECT * FROM users WHERE age > 25;` để đánh giá hiệu năng truy vấn."]'::jsonb, 
    '["Tránh sử dụng `SELECT *` trong ứng dụng production, luôn chỉ rõ các cột cần lấy để tiết kiệm băng thông và RAM.", "Khi viết câu lệnh SQL, đảm bảo các cột dùng trong điều kiện WHERE hoặc JOIN đã được đánh chỉ mục phù hợp.", "Sử dụng LIMIT / OFFSET một cách thông minh để phân trang dữ liệu, tránh tải một lượng dữ liệu quá khổng lồ lên bộ nhớ."]'::jsonb, 
    7, 
    TRUE,
    'db-query-opt'
  ),
  (
    'cs_db_05', 
    'cs_database_data', 
    13, 
    'Giao dịch & Tính ACID', 
    'Giao dịch CSDL & Các cấp độ cô lập (ACID & Isolation Levels)', 
    '### 1. Tính chất ACID của Giao dịch (Transaction)
- **Atomicity (Tính khả phân):** Giao dịch phải được thực hiện trọn vẹn (Tất cả thành công hoặc tất cả thất bại).
- **Consistency (Tính nhất quán):** Giao dịch chuyển đổi CSDL từ trạng thái hợp lệ này sang trạng thái hợp lệ khác.
- **Isolation (Tính cô lập):** Các giao dịch đồng thời không được can thiệp lẫn nhau.
- **Durability (Tính bền vững):** Khi giao dịch đã commit, dữ liệu phải được lưu vĩnh viễn dù hệ thống có bị sập nguồn.

### 2. Các hiện tượng dị thường khi đồng thời truy cập
- **Dirty Read:** Giao dịch A đọc dữ liệu chưa commit của giao dịch B.
- **Non-repeatable Read:** Giao dịch A đọc một dòng dữ liệu, sau đó giao dịch B cập nhật dòng đó và commit, giao dịch A đọc lại dòng đó thì thấy giá trị thay đổi.
- **Phantom Read:** Giao dịch A truy vấn danh sách dòng theo điều kiện, giao dịch B thêm dòng mới thỏa mãn điều kiện đó và commit, giao dịch A đọc lại thấy xuất hiện thêm dòng mới.

### 3. Cấp độ cô lập (Isolation Levels)
Theo chuẩn SQL-92, có 4 cấp độ cô lập từ yếu đến mạnh:
1. `Read Uncommitted`
2. `Read Committed` (Mặc định trong PostgreSQL)
3. `Repeatable Read`
4. `Serializable` (Mạnh nhất, chặn mọi dị thường nhưng làm giảm hiệu năng do khóa nhiều)', 
    'core-theory', 
    '["Sử dụng lệnh thiết lập cấp độ cô lập: `BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;`", "Sử dụng cơ chế khóa tường minh: `SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;` để giữ khóa dòng cho đến khi giao dịch kết thúc."]'::jsonb, 
    '["Luôn giữ giao dịch ngắn nhất có thể để tránh giữ khóa lâu gây tắc nghẽn hệ thống (Deadlock).", "Lựa chọn cấp độ cô lập phù hợp với nghiệp vụ: Read Committed là đủ cho hầu hết ứng dụng thông thường, chỉ dùng Serializable cho các nghiệp vụ tài chính nhạy cảm.", "Xử lý lỗi Deadlock trong ứng dụng bằng cơ chế Retry tự động."]'::jsonb, 
    7, 
    TRUE,
    'db-transactions'
  ),
  (
    'cs_db_06', 
    'cs_database_data', 
    13, 
    'Giao dịch & Tính ACID', 
    'Cơ chế Khóa (Locking) & Giải quyết tranh chấp Deadlock', 
    '### 1. Phân loại Khóa trong CSDL
Để đảm bảo tính cô lập, RDBMS sử dụng cơ chế khóa (Locking):
- **Shared Lock (Khóa chia sẻ - S):** Dùng cho thao tác đọc dữ liệu. Nhiều giao dịch có thể cùng giữ Shared Lock trên cùng một dòng.
- **Exclusive Lock (Khóa độc quyền - X):** Dùng cho thao tác ghi dữ liệu. Chỉ duy nhất một giao dịch được giữ khóa này, chặn tất cả giao dịch đọc/ghi khác trên dòng đó.

### 2. Deadlock là gì?
Deadlock xảy ra khi Giao dịch A giữ Khóa 1 và đợi Khóa 2, trong khi Giao dịch B giữ Khóa 2 và đợi Khóa 1. Cả hai giao dịch sẽ bị treo vô hạn.
- **Giải pháp xử lý:** RDBMS chạy tiến trình ngầm tự động phát hiện Deadlock và chủ động hủy (rollback) một giao dịch để giải phóng tài nguyên cho giao dịch còn lại.', 
    'core-theory', 
    '["Giao dịch A cập nhật bảng A rồi bảng B. Giao dịch B cập nhật bảng B rồi bảng A. Nếu chạy đồng thời sẽ dễ gây Deadlock.", "Khắc phục Deadlock bằng cách đồng bộ hóa thứ tự cập nhật các bảng ở tất cả các luồng xử lý ứng dụng."]'::jsonb, 
    '["Quy định chặt chẽ thứ tự truy cập tài nguyên trong mã nguồn hệ thống để phòng ngừa deadlock.", "Thiết lập thời gian chờ khóa (lock_timeout) để tránh luồng ứng dụng bị treo quá lâu khi đợi khóa.", "Tận dụng cơ chế Optimistic Locking (Khóa lạc quan) sử dụng số phiên bản (version column) để tránh dùng khóa cứng khi không cần thiết."]'::jsonb, 
    8, 
    TRUE,
    'db-transactions'
  ),
  (
    'cs_db_07', 
    'cs_database_data', 
    13, 
    'Kiến trúc & Tích hợp CSDL', 
    'Phân biệt SQL vs NoSQL & Lựa chọn Kiến trúc phù hợp', 
    '### 1. CSDL Quan hệ (SQL)
- **Đặc trưng:** Dữ liệu có cấu trúc bảng chặt chẽ, hỗ trợ ACID toàn diện, quan hệ khóa ngoại phức tạp.
- **Đại diện:** PostgreSQL, MySQL, MS SQL Server.
- **Sử dụng:** Hệ thống tài chính, ERP, quản lý người dùng.

### 2. CSDL Phi quan hệ (NoSQL)
- **Document Store (ví dụ MongoDB):** Lưu dữ liệu dạng JSON linh hoạt, dễ dàng mở rộng theo chiều ngang (Scale-out).
- **Key-Value Store (ví dụ Redis):** Tốc độ đọc ghi cực nhanh nhờ lưu hoàn toàn trên RAM, phù hợp làm Cache.
- **Wide-Column Store (ví dụ Cassandra):** Tối ưu hóa cho việc ghi lượng dữ liệu khổng lồ theo chuỗi thời gian.
- **Graph Database (ví dụ Neo4j):** Tối ưu cho dữ liệu mạng lưới có liên kết phức tạp (mạng xã hội).', 
    'core-theory', 
    '["Sử dụng Redis làm tầng đệm Cache lưu thông tin cấu hình hệ thống ít thay đổi giúp giảm tải 90% truy vấn trực tiếp vào PostgreSQL.", "Thiết kế CSDL MongoDB lưu trữ danh mục sản phẩm thương mại điện tử có các thuộc tính biến động linh hoạt."]'::jsonb, 
    '["NoSQL không phải là sự thay thế hoàn toàn cho SQL; hãy kết hợp chúng dưới dạng kiến trúc đa cơ sở dữ liệu (Polyglot Persistence).", "Khi dùng NoSQL, cần chú ý tính nhất quán cuối cùng (Eventual Consistency) thay vì tính nhất quán tức thời.", "Luôn xây dựng cơ chế backup tự động định kỳ cho cả SQL và NoSQL."]'::jsonb, 
    5, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_08', 
    'cs_database_data', 
    13, 
    'Kiến trúc & Tích hợp CSDL', 
    'Kỹ thuật Sharding & Replication trong Hệ thống lớn', 
    '### 1. Database Replication (Nhân bản CSDL)
Replication là quá trình sao chép dữ liệu từ một máy chủ CSDL chủ (Primary/Master) sang một hoặc nhiều máy chủ CSDL phụ (Replica/Slave):
- **Master:** Chịu trách nhiệm ghi dữ liệu (`INSERT`, `UPDATE`, `DELETE`).
- **Replica:** Chịu trách nhiệm đọc dữ liệu (`SELECT`). Giúp tăng tải đọc và dự phòng thảm họa (High Availability).

### 2. Database Sharding (Phân mảnh dữ liệu)
Sharding là kỹ thuật phân chia một bảng dữ liệu khổng lồ thành nhiều phần nhỏ (Shards) và lưu trữ chúng trên các máy chủ vật lý độc lập dựa trên một khóa phân mảnh (Shard Key).
- Ví dụ: Phân sharding theo quốc gia hoặc theo mã băm ID người dùng.', 
    'core-theory', 
    '["Thiết lập Replication master-slave trên PostgreSQL sử dụng WAL (Write-Ahead Logging) replication.", "Cấu hình Shard Key dựa trên `tenant_id` cho hệ thống SaaS đa khách hàng."]'::jsonb, 
    '["Kỹ thuật Sharding rất phức tạp, chỉ nên triển khai khi kích thước DB vượt quá giới hạn lưu trữ và năng lực xử lý của một máy chủ đơn lẻ.", "Chọn Shard Key cẩn thận để tránh hiện tượng mất cân bằng dữ liệu giữa các phân vùng (Hotspot Shards).", "Sử dụng các giải pháp Proxy hoặc Middleware như Vitess để quản lý Sharding tự động."]'::jsonb, 
    8, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_09', 
    'cs_database_data', 
    13, 
    'Kiến trúc & Tích hợp CSDL', 
    'Chiến lược Caching & Đồng bộ hóa Dữ liệu', 
    '### 1. Tại sao cần Caching?
Cache là tầng lưu trữ dữ liệu tạm thời tốc độ cao (thường nằm trên bộ nhớ RAM). Sử dụng Cache giúp phản hồi nhanh chóng và giảm tải đáng kể cho CSDL chính.

### 2. Các chiến lược ghi Cache thông dụng
- **Cache-Aside (Lazy Loading):** Ứng dụng kiểm tra dữ liệu trong Cache trước. Nếu không có (Cache Miss), ứng dụng truy vấn CSDL chính, trả về cho người dùng và lưu lại vào Cache cho lần sau.
- **Write-Through:** Ứng dụng ghi dữ liệu đồng thời vào cả Cache và CSDL chính. Đảm bảo dữ liệu trong Cache luôn mới nhất nhưng làm tăng trễ ghi.
- **Write-Behind (Write-Back):** Ứng dụng ghi dữ liệu vào Cache trước, sau đó một luồng background sẽ bất đồng bộ đồng bộ dữ liệu đó xuống CSDL chính sau một khoảng thời gian.', 
    'core-theory', 
    '["Triển khai mẫu thiết kế Cache-Aside sử dụng thư viện Redis Client trong Node.js.", "Đặt thời gian hết hạn hợp lý (TTL - Time to Live = 3600s) cho dữ liệu Cache thông tin bài học."]'::jsonb, 
    '["Luôn xác định cơ chế giải phóng Cache (Cache Invalidation) khi dữ liệu gốc trong CSDL bị cập nhật để tránh hiển thị thông tin cũ.", "Đề phòng hiện tượng Cache Stampede (nhiều luồng cùng truy vấn CSDL khi Cache hết hạn cùng lúc) bằng cách sử dụng khóa mutex.", "Giám sát dung lượng RAM sử dụng của Redis để tránh lỗi tràn bộ nhớ (Out of Memory)."]'::jsonb, 
    6, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_10', 
    'cs_database_data', 
    13, 
    'Thiết kế & Chuẩn hóa CSDL', 
    'Quản trị Migration & Quản lý Schema CSDL', 
    '### 1. Database Migration là gì?
Migration (Di chuyển Schema) là kỹ thuật quản lý phiên bản (Version Control) cho cấu trúc CSDL của ứng dụng. Thay vì sửa đổi trực tiếp cấu trúc bảng bằng tay, lập trình viên viết các tệp mã nguồn hoặc tệp tin SQL để ghi lại các thay đổi.

### 2. Cơ chế hoạt động của Migration Runner
Bộ chạy Migration đọc các tệp tin theo thứ tự thời gian và duy trì một bảng đặc biệt trong CSDL (thường tên là `schema_migrations`) để lưu trữ danh sách các tệp tin đã chạy thành công. Khi chạy cập nhật, nó chỉ thực thi các tệp tin mới chưa có tên trong bảng này, đảm bảo tính đồng bộ cấu trúc CSDL giữa các môi trường phát triển (Local, Staging, Production).', 
    'core-theory', 
    '["Viết tệp tin SQL migration thêm cột `phone_number` vào bảng `users`: `ALTER TABLE users ADD COLUMN phone_number VARCHAR(15);`", "Sử dụng bảng `schema_migrations` để lưu trạng thái phiên bản."]'::jsonb, 
    '["Không bao giờ được thay đổi nội dung của một tệp migration cũ đã được commit và deploy lên môi trường Production; thay vào đó hãy tạo một tệp migration mới.", "Luôn viết hàm rollback (Down migration) tương ứng để có thể khôi phục lại cấu trúc cũ nếu quá trình triển khai gặp lỗi.", "Thực hiện sao lưu (backup) dữ liệu trước khi chạy các migration thay đổi cấu trúc bảng lớn."]'::jsonb, 
    6, 
    TRUE,
    'db-design'
  )
ON CONFLICT (id) DO UPDATE SET
  theory = EXCLUDED.theory,
  examples = EXCLUDED.examples,
  practice_points = EXCLUDED.practice_points;

COMMIT;
