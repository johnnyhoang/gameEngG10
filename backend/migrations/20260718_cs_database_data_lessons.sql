-- SQL migration to seed topics and 10 core lessons for cs_database_data (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_database_data (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('db-design', 'cs_database_data', 13, 'Thiết kế & Chuẩn hóa dữ liệu', 'Mô hình ERD, chuẩn hóa 1NF-3NF, bảo mật phân quyền dòng RLS và cấu trúc bảng.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-query-opt', 'cs_database_data', 13, 'Tối ưu hóa & Đánh chỉ mục', 'Cơ chế Indexing (B-Tree/Hash), EXPLAIN ANALYZE, tìm kiếm toàn văn Full-Text Search.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-transactions', 'cs_database_data', 13, 'Giao dịch & Kiểm soát đồng thời', 'ACID, Isolation Levels, các hiện tượng tranh chấp dữ liệu và Caching Redis.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('db-architecture', 'cs_database_data', 13, 'Kiến trúc CSDL & Tích hợp', 'SQL vs NoSQL, Connection Pooling, lỗi N+1 Query, OLAP vs OLTP, Replication & Sharding.', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
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
    'Thiết kế & Chuẩn hóa dữ liệu', 
    'Thiết kế Cơ sở Dữ liệu & Chuẩn hóa (1NF - 3NF)', 
    '### 1. Khái niệm cơ bản\nThiết kế cơ sở dữ liệu (Database Design) là quá trình xây dựng cấu trúc bảng biểu, mối quan hệ và các ràng buộc dữ liệu nhằm đáp ứng nhu cầu lưu trữ và truy xuất của ứng dụng. \n\n### 2. Các dạng chuẩn (Normalization)\nChuẩn hóa là kỹ thuật tổ chức dữ liệu nhằm giảm thiểu **dư thừa dữ liệu (Data Redundancy)** và ngăn chặn các **dị thường dữ liệu (Insert/Update/Delete Anomalies)**.\n- **Dạng chuẩn 1 (1NF):** Mỗi ô dữ liệu chỉ chứa một giá trị nguyên tố (atomic). Không có nhóm lặp.\n- **Dạng chuẩn 2 (2NF):** Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hoàn toàn vào khóa chính (loại bỏ phụ thuộc hàm bộ phận vào một phần của khóa chính ghép).\n- **Dạng chuẩn 3 (3NF):** Đạt 2NF và loại bỏ phụ thuộc bắc cầu (thuộc tính không khóa không được phụ thuộc vào thuộc tính không khóa khác).\n\n$$A \rightarrow B, B \rightarrow C \implies A \rightarrow C \text{ (Phụ thuộc bắc cầu - cần loại bỏ)}$$', 
    'core-theory', 
    '["Bảng đơn hàng chứa cột chứa nhiều sản phẩm ngăn cách bởi dấu phẩy (Vi phạm 1NF) -> Tách thành bảng chi tiết đơn hàng.", "Bảng chứa mã sinh viên, mã môn học, tên môn học và điểm thi (Vi phạm 2NF vì tên môn học chỉ phụ thuộc vào mã môn học chứ không phải toàn bộ khóa ghép) -> Tách thành bảng MonHoc(MaMH, TenMH) và Diem(MaSV, MaMH, Diem)."]'::jsonb, 
    '["Luôn xác định rõ Khóa chính (PK) và Khóa ngoại (FK) trước khi thiết kế bảng.", "Sử dụng dạng chuẩn 3NF làm tiêu chuẩn thiết kế cho hầu hết ứng dụng OLTP thông thường.", "Tránh lạm dụng giải chuẩn hóa (Denormalization) khi chưa gặp vấn đề hiệu năng thực sự."]'::jsonb, 
    6, 
    TRUE,
    'db-design'
  ),
  (
    'cs_db_02', 
    'cs_database_data', 
    13, 
    'Tối ưu hóa & Đánh chỉ mục', 
    'Kỹ thuật Đánh chỉ mục Indexing & Tối ưu hóa truy vấn', 
    '### 1. Chỉ mục (Index) là gì?\nIndex là một cấu trúc dữ liệu đặc biệt giúp tăng tốc độ truy tìm dòng dữ liệu trong bảng mà không cần quét qua toàn bộ dữ liệu vật lý (Sequential Scan).\n\n### 2. Các loại Index phổ biến\n- **B-Tree Index:** Loại mặc định và đa năng nhất. Cực kỳ hiệu quả cho các so sánh bằng (`=`), khoảng (`<`, `>`, `BETWEEN`), và sắp xếp (`ORDER BY`).\n- **Hash Index:** Phù hợp cho so sánh bằng cụ thể (`=`), không hỗ trợ truy vấn khoảng hoặc sắp xếp.\n- **Composite Index (Chỉ mục ghép):** Index trên nhiều cột. Thứ tự khai báo cột cực kỳ quan trọng (nguyên lý tiền tố bên trái - Leftmost Prefix).\n\n### 3. Phân tích truy vấn bằng EXPLAIN\nSử dụng lệnh `EXPLAIN` hoặc `EXPLAIN ANALYZE` để xem kế hoạch thực thi (Execution Plan) của hệ quản trị CSDL, phát hiện xem câu query đang dùng **Seq Scan** hay **Index Scan**.', 
    'optimization', 
    '["Tạo index đơn giản: CREATE INDEX idx_users_email ON users(email);", "Tạo composite index: CREATE INDEX idx_orders_user_status ON orders(user_id, status); -> Tăng tốc cho query lọc theo user_id hoặc cả user_id và status, nhưng KHÔNG tăng tốc cho lọc chỉ theo status."]'::jsonb, 
    '["Không đánh index bừa bãi vì làm chậm các thao tác ghi (INSERT/UPDATE/DELETE).", "Luôn kiểm tra Execution Plan để đảm bảo các query nặng được phủ bởi Index.", "Đánh Composite Index theo thứ tự cột lọc thường xuyên nhất ở phía trước."]'::jsonb, 
    7, 
    TRUE,
    'db-query-opt'
  ),
  (
    'cs_db_03', 
    'cs_database_data', 
    13, 
    'Giao dịch & Kiểm soát đồng thời', 
    'Quản lý Giao dịch & Thuộc tính ACID', 
    '### 1. Thuộc tính ACID\nMột giao dịch (Transaction) là tập hợp các thao tác phải được thực thi trọn vẹn. ACID là chuẩn bảo đảm tính toàn vẹn dữ liệu:\n- **Atomicity (Tính nguyên tử):** Tất cả hoặc không gì cả. Nếu một thao tác thất bại, toàn bộ giao dịch bị ROLLBACK.\n- **Consistency (Tính nhất quán):** Đưa DB từ trạng thái hợp lệ này sang trạng thái hợp lệ khác.\n- **Isolation (Tính cô lập):** Các transaction chạy đồng thời không ảnh hưởng lẫn nhau.\n- **Durability (Tính bền vững):** Một khi giao dịch đã COMMIT, dữ liệu sẽ được lưu vĩnh viễn.\n\n### 2. Isolation Levels & Hiện tượng tranh chấp\n- **Read Uncommitted:** Cho phép đọc dữ liệu chưa commit (gây ra **Dirty Read**).\n- **Read Committed:** Chỉ đọc dữ liệu đã commit (ngăn Dirty Read nhưng có thể bị **Non-Repeatable Read**).\n- **Repeatable Read:** Đảm bảo đọc cùng một dòng dữ liệu sẽ luôn ra kết quả giống nhau trong một transaction (ngăn Non-Repeatable Read nhưng có thể bị **Phantom Read**).\n- **Serializable:** Mức độ cô lập cao nhất, thực thi tuần tự hoàn toàn.', 
    'core-theory', 
    '["Bắt đầu transaction chuyển tiền: BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;", "Nếu một câu UPDATE lỗi hoặc máy chủ mất điện trước COMMIT, hệ thống sẽ thực hiện ROLLBACK tự động."]'::jsonb, 
    '["Sử dụng Read Committed làm mức cô lập mặc định trong hầu hết ứng dụng web.", "Chỉ dùng Serializable khi thực sự cần thiết (ví dụ: giao dịch tài chính nhạy cảm) vì hiệu năng rất thấp.", "Sử dụng mệnh đề FOR UPDATE để khóa dòng dữ liệu khi cần cập nhật đồng thời."]'::jsonb, 
    7, 
    TRUE,
    'db-transactions'
  ),
  (
    'cs_db_04', 
    'cs_database_data', 
    13, 
    'Kiến trúc CSDL & Tích hợp', 
    'Hệ Quản trị CSDL Quan hệ vs NoSQL', 
    '### 1. Cơ sở dữ liệu Quan hệ (SQL RDBMS)\nSử dụng mô hình bảng biểu nghiêm ngặt, có mối quan hệ rõ ràng, hỗ trợ giao dịch ACID mạnh mẽ (ví dụ: PostgreSQL, MySQL, SQL Server).\n\n### 2. Cơ sở dữ liệu Phi quan hệ (NoSQL)\nĐược thiết kế để lưu trữ dữ liệu không cấu trúc hoặc bán cấu trúc, khả năng mở rộng ngang (horizontal scaling) vượt trội.\n- **Document Store (MongoDB):** Lưu dữ liệu dạng JSON/BSON. Phù hợp lưu trữ dữ liệu động, cấu trúc thay đổi liên tục.\n- **Key-Value Store (Redis):** Lưu cặp khóa-giá trị trong bộ nhớ RAM, dùng làm Cache hoặc Message Broker.\n- **Graph Store (Neo4j):** Lưu nút và mối liên kết. Phù hợp cho mạng xã hội, hệ thống gợi ý.\n\n### 3. Định lý CAP\nMột hệ thống phân tán chỉ có thể chọn tối đa 2 trong 3 yếu tố:\n- **C (Consistency):** Tính nhất quán dữ liệu.\n- **A (Availability):** Tính sẵn sàng phản hồi.\n- **P (Partition Tolerance):** Khả năng chịu lỗi phân mảnh mạng.', 
    'architecture', 
    '["Dùng SQL (PostgreSQL) cho dữ liệu người dùng, hóa đơn, thanh toán cần ràng buộc chặt chẽ.", "Dùng NoSQL (MongoDB/Redis) cho lưu trữ log, session người dùng, bảng xếp hạng game, giỏ hàng."]'::jsonb, 
    '["Không có công nghệ nào hoàn hảo cho mọi bài toán, cần kết hợp đa dạng cơ sở dữ liệu (Polyglot Persistence).", "Thiết kế Document Schema trong NoSQL nên hướng tới giảm thiểu việc JOIN dữ liệu.", "Cần đánh giá kỹ định lý CAP trước khi chọn giải pháp phân tán dữ liệu."]'::jsonb, 
    6, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_05', 
    'cs_database_data', 
    13, 
    'Kiến trúc CSDL & Tích hợp', 
    'Connection Pooling & Tích hợp ORM', 
    '### 1. Connection Pooling là gì?\nViệc khởi tạo một kết nối vật lý tới database rất tốn tài nguyên và thời gian. Connection Pooling duy trì sẵn một nhóm các kết nối đang rảnh để tái sử dụng ngay lập tức.\n\n### 2. Đối tượng quan hệ ánh xạ (ORM)\nORM (Object-Relational Mapping) giúp lập trình viên thao tác với cơ sở dữ liệu thông qua ngôn ngữ hướng đối tượng thay vì viết câu lệnh SQL thô (ví dụ: Prisma, Sequelize, Hibernate).\n\n### 3. Vấn đề N+1 Query\nĐây là lỗi hiệu năng kinh điển khi dùng ORM. Ứng dụng thực hiện 1 truy vấn để lấy danh sách cha (N phần tử), sau đó chạy thêm N truy vấn phụ để lấy thông tin con tương ứng.\n- **Giải pháp:** Sử dụng **Eager Loading** (sử dụng JOIN) hoặc **Batch Loading** để gộp tất cả truy vấn thành một hoặc vài câu lệnh duy nhất.', 
    'integration', 
    '["Ví dụ lỗi N+1: Lấy 10 bài viết, ORM tự động lặp qua từng bài viết để lấy bình luận tương ứng bằng 10 câu SELECT con -> Giải quyết: Sử dụng include trong Prisma: prisma.post.findMany({ include: { comments: true } }) để thực hiện gộp SELECT bằng INNER/LEFT JOIN."]'::jsonb, 
    '["Giới hạn kích thước pool (max connections) phù hợp với khả năng xử lý của phần cứng database và RAM.", "Luôn sử dụng các công cụ phân tích để phát hiện và ngăn chặn lỗi N+1 Query trước khi deploy.", "Cẩn thận với việc dùng ORM cho các câu query phân tích dữ liệu lớn phức tạp."]'::jsonb, 
    7, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_06', 
    'cs_database_data', 
    13, 
    'Kiến trúc CSDL & Tích hợp', 
    'Mô hình hóa Kho dữ liệu & OLAP', 
    '### 1. OLTP vs OLAP\n- **OLTP (Online Transaction Processing):** Phục vụ các giao dịch thường nhật nhanh gọn (chèn, cập nhật, xóa dòng đơn lẻ). Thiết kế chuẩn hóa cao (3NF) để tránh dị thường dữ liệu.\n- **OLAP (Online Analytical Processing):** Phục vụ phân tích dữ liệu lớn, truy vấn tổng hợp phức tạp (aggregation). Thiết kế giải chuẩn hóa (Denormalization) để tối ưu tốc độ đọc.\n\n### 2. Thiết kế Kho dữ liệu (Data Warehouse)\n- **Bảng Fact (Bảng sự kiện):** Chứa các chỉ số định lượng đo lường (doanh thu, số lượng) và các khóa ngoại liên kết tới bảng Dimension.\n- **Bảng Dimension (Bảng chiều):** Chứa thông tin mô tả ngữ cảnh (khách hàng, thời gian, vị trí địa lý).\n- **Star Schema:** Mô hình ngôi sao với bảng Fact ở trung tâm, bao quanh bởi các bảng Dimension liên kết trực tiếp.\n- **Snowflake Schema:** Tương tự Star Schema nhưng các bảng Dimension được chuẩn hóa tiếp thành các bảng nhỏ hơn.', 
    'analytics', 
    '["Thiết kế Star Schema cho app bán hàng: Fact_Sales (sale_id, customer_id, product_id, time_id, amount) liên kết trực tiếp tới các bảng Dim_Customer, Dim_Product, Dim_Time."]'::jsonb, 
    '["Xác định rõ nhu cầu nghiệp vụ để phân định bảng Fact và Dimension.", "Tránh JOIN quá nhiều bảng Dimension trong mô hình Snowflake vì làm giảm hiệu năng đọc dữ liệu lớn.", "Sử dụng cơ sở dữ liệu hướng cột (Columnar Database) như BigQuery, ClickHouse cho các tác vụ phân tích OLAP."]'::jsonb, 
    6, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_07', 
    'cs_database_data', 
    13, 
    'Tối ưu hóa & Đánh chỉ mục', 
    'Kỹ thuật Tìm kiếm Toàn văn Full-Text Search (FTS)', 
    '### 1. Vấn đề của tìm kiếm thông thường\nSử dụng `LIKE %keyword%` trong SQL buộc hệ thống phải quét toàn bộ bảng (Full Table Scan), không dùng được Index thông thường và cực kỳ chậm trên tập dữ liệu lớn.\n\n### 2. Chỉ mục đảo ngược (Inverted Index)\nInverted Index ánh xạ từng từ khóa đơn lẻ tới danh sách các tài liệu chứa từ khóa đó. Giống như mục lục ở cuối cuốn sách.\n\n### 3. Full-Text Search trong PostgreSQL\nPostgreSQL cung cấp kiểu dữ liệu `tsvector` (lưu trữ văn bản đã được phân tách từ khóa và chuẩn hóa) và `tsquery` (câu lệnh truy vấn tìm kiếm).\n\n### 4. Elasticsearch vs Database FTS\nElasticsearch là một công cụ tìm kiếm và phân tích phân tán chuyên dụng dựa trên Apache Lucene. Nó hỗ trợ tìm kiếm mờ (fuzzy search), xếp hạng độ tương đồng (TF-IDF/BM25), và phân tích từ vựng nâng cao.', 
    'advanced-query', 
    '["Sử dụng FTS trong PostgreSQL: SELECT * FROM documents WHERE to_tsvector(''english'', body) @@ to_tsquery(''english'', ''database & search'');", "Cấu hình index trong Elasticsearch với Custom Analyzer để tìm kiếm không dấu trong tiếng Việt."]'::jsonb, 
    '["Sử dụng Full-Text Search tích hợp sẵn trong DB cho dự án nhỏ và vừa để giảm chi phí vận hành hạ tầng.", "Chuyển sang Elasticsearch/Meilisearch khi cần tìm kiếm thời gian thực, có gợi ý từ khóa (autocomplete) và xử lý lượng văn bản khổng lồ.", "Luôn chuẩn hóa văn bản đầu vào trước khi lưu vào tsvector (loại bỏ stop words, dấu câu, đưa về dạng gốc)."]'::jsonb, 
    7, 
    TRUE,
    'db-query-opt'
  ),
  (
    'cs_db_08', 
    'cs_database_data', 
    13, 
    'Kiến trúc CSDL & Tích hợp', 
    'Bản sao và Phân mảnh Dữ liệu (Replication & Sharding)', 
    '### 1. Sao chép dữ liệu (Replication)\nReplication sao chép dữ liệu từ máy chủ chính (Master/Primary) sang một hoặc nhiều máy chủ phụ (Slave/Replica).\n- **Đọc/Ghi độc lập (Read/Write Splitting):** Lệnh ghi (INSERT/UPDATE) đi vào Master, lệnh đọc (SELECT) đi vào các Slave để chia tải.\n- **Dự phòng (High Availability):** Nếu Master gặp sự cố, một Slave sẽ được bầu lên làm Master mới.\n\n### 2. Phân mảnh dữ liệu (Sharding)\nSharding là kỹ thuật phân chia cơ sở dữ liệu theo chiều ngang (Horizontal Partitioning) thành nhiều phần nhỏ độc lập vật lý được đặt trên các server khác nhau. \n- **Shard Key:** Cột dữ liệu quyết định dòng đó nằm ở Shard nào. Việc chọn Shard Key không tốt sẽ dẫn tới **Hotspot Shard** (một server gánh 90% lượng tải).', 
    'scaling', 
    '["Thiết kế Shard Key theo country_id cho ứng dụng toàn cầu. Dữ liệu khách hàng Châu Á nằm ở Shard ASIA, khách hàng Châu Âu nằm ở Shard EUROPE.", "Cấu hình Asynchronous Replication trong MySQL giúp đảm bảo Master ghi cực nhanh, dữ liệu sẽ được đồng bộ tới Slave sau vài mili-giây."]'::jsonb, 
    '["Luôn thiết kế ứng dụng có khả năng định tuyến câu lệnh SELECT tới Read Replica.", "Chọn Shard Key dựa trên tần suất truy cập dữ liệu để đảm bảo tải trọng được phân bố đều giữa các Shard.", "Tránh thực hiện các câu query JOIN liên kết nhiều Shard vật lý vì nó làm tăng độ trễ mạng cực lớn."]'::jsonb, 
    8, 
    TRUE,
    'db-architecture'
  ),
  (
    'cs_db_09', 
    'cs_database_data', 
    13, 
    'Thiết kế & Chuẩn hóa dữ liệu', 
    'Bảo mật CSDL, Phân quyền & Row-Level Security (RLS)', 
    '### 1. Nguyên lý phân quyền tối thiểu (Least Privilege)\nKhông cấp quyền admin cho ứng dụng kết nối trực tiếp vào CSDL. Thay vào đó, phân quyền cụ thể thông qua vai trò (Role-based Access Control - RBAC).\n\n### 2. Row-Level Security (RLS)\nRLS cho phép chúng ta định nghĩa các chính sách bảo mật để kiểm soát việc đọc/ghi dữ liệu đến từng dòng dựa trên định danh của người dùng đang thực hiện truy vấn.\n\n### 3. Ngăn chặn SQL Injection\nSQL Injection xảy ra khi dữ liệu người dùng nhập vào được nối chuỗi trực tiếp tạo thành câu lệnh SQL thực thi.\n- **Giải pháp:** Sử dụng **Parameterized Queries (Prepared Statements)** để tách biệt phần lệnh và phần dữ liệu đầu vào.', 
    'security', 
    '["Chính sách RLS trong PostgreSQL: ALTER TABLE orders ENABLE ROW LEVEL SECURITY; CREATE POLICY user_orders_policy ON orders FOR SELECT USING (user_id = current_setting(''app.current_user_id''));", "Prepared Statement trong Node.js/pg: pool.query(''SELECT * FROM users WHERE email = $1'', [userInputEmail]); -> Ngăn chặn hoàn toàn SQL Injection."]'::jsonb, 
    '["Luôn kích hoạt RLS cho các bảng chứa thông tin nhạy cảm của khách hàng trong ứng dụng multi-tenant.", "Tuyệt đối không sử dụng nối chuỗi string để tạo câu SQL trong mã nguồn backend.", "Mã hóa các thông tin nhạy cảm (như mật khẩu, số thẻ tín dụng) ở mức ứng dụng trước khi ghi xuống database."]'::jsonb, 
    7, 
    TRUE,
    'db-design'
  ),
  (
    'cs_db_10', 
    'cs_database_data', 
    13, 
    'Giao dịch & Kiểm soát đồng thời', 
    'Chiến lược Caching & Tối ưu Hiệu năng CSDL', 
    '### 1. Tại sao cần Caching?\nCác truy vấn tính toán nặng hoặc đọc dữ liệu tĩnh tần suất cao gây quá tải cho database. Caching lưu trữ kết quả này trên bộ nhớ RAM (Redis/Memcached) với tốc độ đọc cực nhanh.\n\n### 2. Các chiến lược Caching phổ biến\n- **Cache-Aside (Lazy Loading):** Ứng dụng kiểm tra cache, nếu thiếu (Cache Miss) thì query DB rồi lưu kết quả vào cache.\n- **Write-Through:** Ứng dụng ghi dữ liệu vào cache trước, cache tự động cập nhật xuống database.\n- **Write-Back (Write-Behind):** Ghi vào cache rồi cập nhật bất đồng bộ xuống DB sau đó để tăng tốc độ ghi.\n\n### 3. Vấn đề Cache Invalidation & TTL\nLàm sao để xóa cache khi DB thay đổi? Thiết lập TTL (Time to Live) hợp lý và chủ động xóa cache khi cập nhật dữ liệu để đảm bảo tính nhất quán dữ liệu.', 
    'optimization', 
    '["Triển khai Cache-Aside cho chi tiết sản phẩm: const key = `product:${id}`; let p = await redis.get(key); if(!p){ p = await db.getProduct(id); await redis.setex(key, 3600, JSON.stringify(p)); } return JSON.parse(p);"]'::jsonb, 
    '["Sử dụng cơ chế giải tỏa cache (Cache Eviction) mặc định là LRU (Least Recently Used) để tự động xóa key ít dùng.", "Thiết lập TTL thông minh phù hợp với tần suất thay đổi của dữ liệu.", "Phòng ngừa lỗi Cache Stampede (nhiều request cùng lúc query DB khi cache hết hạn) bằng cách sử dụng locking hoặc sinh cache nền."]'::jsonb, 
    7, 
    TRUE,
    'db-transactions'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_db_01', 'db-design', 'lesson', 'Thiết kế Cơ sở Dữ liệu & Chuẩn hóa (1NF - 3NF)', '{"lesson_id": "cs_db_01"}'::jsonb, 10, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_02', 'db-query-opt', 'lesson', 'Kỹ thuật Đánh chỉ mục Indexing & Tối ưu hóa truy vấn', '{"lesson_id": "cs_db_02"}'::jsonb, 10, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_03', 'db-transactions', 'lesson', 'Quản lý Giao dịch & Thuộc tính ACID', '{"lesson_id": "cs_db_03"}'::jsonb, 10, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_04', 'db-architecture', 'lesson', 'Hệ Quản trị CSDL Quan hệ vs NoSQL', '{"lesson_id": "cs_db_04"}'::jsonb, 10, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_05', 'db-architecture', 'lesson', 'Connection Pooling & Tích hợp ORM', '{"lesson_id": "cs_db_05"}'::jsonb, 20, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_06', 'db-architecture', 'lesson', 'Mô hình hóa Kho dữ liệu & OLAP', '{"lesson_id": "cs_db_06"}'::jsonb, 30, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_07', 'db-query-opt', 'lesson', 'Kỹ thuật Tìm kiếm Toàn văn Full-Text Search (FTS)', '{"lesson_id": "cs_db_07"}'::jsonb, 20, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_08', 'db-architecture', 'lesson', 'Bản sao và Phân mảnh Dữ liệu (Replication & Sharding)', '{"lesson_id": "cs_db_08"}'::jsonb, 40, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_09', 'db-design', 'lesson', 'Bảo mật CSDL, Phân quyền & Row-Level Security (RLS)', '{"lesson_id": "cs_db_09"}'::jsonb, 20, 10, 20, 'cs_database_data', 13),
  ('act-lesson-cs_db_10', 'db-transactions', 'lesson', 'Chiến lược Caching & Tối ưu Hiệu năng CSDL', '{"lesson_id": "cs_db_10"}'::jsonb, 20, 10, 20, 'cs_database_data', 13)
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
