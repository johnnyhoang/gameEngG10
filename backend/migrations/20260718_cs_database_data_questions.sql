-- SQL migration to seed 100 question bank for cs_database_data (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- Insert 100 questions linking to lessons and topics for cs_database_data (grade_tier = 13)
-- Format: id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id

-- ======================================================================================
-- BÀI GIẢNG 1: Thiết kế Cơ sở Dữ liệu & Chuẩn hóa (cs_db_01) - Chuyên đề: db-design (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_001', 'mcq', 'database-design',
    'Trong thiết kế cơ sở dữ liệu quan hệ, thuộc tính đa trị (multivalued attribute) vi phạm dạng chuẩn nào sau đây?',
    ARRAY['Dạng chuẩn 1 (1NF)', 'Dạng chuẩn 2 (2NF)', 'Dạng chuẩn 3 (3NF)', 'Dạng chuẩn Boyce-Codd (BCNF)']::varchar[],
    ARRAY['Dạng chuẩn 1 (1NF)']::varchar[],
    'Dạng chuẩn 1 (1NF) yêu cầu tất cả các thuộc tính phải chứa các giá trị nguyên tố (atomic). Thuộc tính đa trị vi phạm quy tắc này.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_002', 'mcq', 'database-design',
    'Để một quan hệ đạt dạng chuẩn 2 (2NF), điều kiện tiên quyết nào sau đây phải được thỏa mãn?',
    ARRAY['Đạt 1NF và không có phụ thuộc hàm bộ phận (partial dependency) vào khóa chính', 'Đạt 1NF và không có phụ thuộc bắc cầu (transitive dependency)', 'Đạt 1NF và mọi thuộc tính đều là nguyên tố', 'Đạt 3NF và không có khóa chính ghép']::varchar[],
    ARRAY['Đạt 1NF và không có phụ thuộc hàm bộ phận (partial dependency) vào khóa chính']::varchar[],
    'Dạng chuẩn 2 (2NF) yêu cầu quan hệ đạt 1NF và tất cả thuộc tính không khóa phải phụ thuộc hàm đầy đủ vào khóa chính (loại bỏ phụ thuộc bộ phận vào một phần của khóa chính ghép).',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_003', 'mcq', 'database-design',
    'Cho lược đồ quan hệ R(A, B, C, D) với các phụ thuộc hàm F = {A -> B, B -> C}. Khóa chính của R là gì?',
    ARRAY['A, D', 'A', 'A, B', 'C, D']::varchar[],
    ARRAY['A, D']::varchar[],
    'Vì D không xuất hiện ở vế phải của bất kỳ phụ thuộc hàm nào nên D phải là một phần của khóa chính. Bao đóng của {A, D} là {A, B, C, D}, do đó {A, D} là khóa chính duy nhất.',
    7, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_004', 'mcq', 'database-design',
    'Phụ thuộc bắc cầu (transitive dependency) được loại bỏ ở dạng chuẩn nào?',
    ARRAY['Dạng chuẩn 1 (1NF)', 'Dạng chuẩn 2 (2NF)', 'Dạng chuẩn 3 (3NF)', 'Dạng chuẩn Boyce-Codd (BCNF)']::varchar[],
    ARRAY['Dạng chuẩn 3 (3NF)']::varchar[],
    'Dạng chuẩn 3 (3NF) yêu cầu quan hệ đạt 2NF và loại bỏ các phụ thuộc bắc cầu giữa các thuộc tính không khóa.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_005', 'mcq', 'database-design',
    'Dị thường dữ liệu nào sau đây xảy ra khi ta không thể thêm một bản ghi mới do thiếu thông tin của một thuộc tính khác không liên quan trực tiếp?',
    ARRAY['Dị thường thêm mới (Insertion Anomaly)', 'Dị thường xóa (Deletion Anomaly)', 'Dị thường cập nhật (Update Anomaly)', 'Dị thường truy vấn (Query Anomaly)']::varchar[],
    ARRAY['Dị thường thêm mới (Insertion Anomaly)']::varchar[],
    'Dị thường thêm mới (Insertion Anomaly) xảy ra khi ta muốn chèn dữ liệu hợp lệ nhưng không thể làm được vì thiếu khóa ngoại hoặc thông tin bắt buộc khác thuộc thực thể khác trong cùng một bảng chưa chuẩn hóa.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_006', 'mcq', 'database-design',
    'Khi chuẩn hóa một quan hệ từ 2NF lên 3NF, ta thường thực hiện hành động nào?',
    ARRAY['Tách quan hệ thành các quan hệ nhỏ hơn để loại bỏ phụ thuộc bắc cầu', 'Gộp các bảng lại để giảm phép JOIN', 'Thêm khóa ngoại mới vào bảng hiện tại', 'Đổi kiểu dữ liệu của khóa chính']::varchar[],
    ARRAY['Tách quan hệ thành các quan hệ nhỏ hơn để loại bỏ phụ thuộc bắc cầu']::varchar[],
    'Để loại bỏ phụ thuộc bắc cầu A -> B -> C, ta tách bảng thành hai bảng mới: một bảng lưu (A, B) và một bảng lưu (B, C) với B đóng vai trò khóa ngoại liên kết.',
    6, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_007', 'mcq', 'database-design',
    'Dạng chuẩn Boyce-Codd (BCNF) nghiêm ngặt hơn 3NF ở điểm nào?',
    ARRAY['Vế trái của mọi phụ thuộc hàm không tầm thường bắt buộc phải là siêu khóa (superkey)', 'Loại bỏ hoàn toàn khóa ngoại ghép', 'Không cho phép bảng có quá 3 thuộc tính', 'Đòi hỏi dữ liệu phải được phân mảnh vật lý']::varchar[],
    ARRAY['Vế trái của mọi phụ thuộc hàm không tầm thường bắt buộc phải là siêu khóa (superkey)']::varchar[],
    'BCNF quy định với mọi phụ thuộc hàm X -> Y không tầm thường, X phải là siêu khóa (superkey). 3NF vẫn cho phép Y là thuộc tính khóa (prime attribute) kể cả khi X không phải là siêu khóa.',
    7, 'MIT Database Systems', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_008', 'mcq', 'database-design',
    'Lợi ích chính của việc thiết kế cơ sở dữ liệu đạt chuẩn hóa cao (ví dụ: 3NF) là gì?',
    ARRAY['Giảm thiểu dư thừa dữ liệu và loại bỏ dị thường khi cập nhật', 'Tối đa hóa tốc độ truy vấn đọc dữ liệu lớn', 'Giảm số lượng bảng cần thiết trong hệ thống', 'Tự động sao lưu dữ liệu khi có sự cố']::varchar[],
    ARRAY['Giảm thiểu dư thừa dữ liệu và loại bỏ dị thường khi cập nhật']::varchar[],
    'Chuẩn hóa giúp loại bỏ sự dư thừa dữ liệu, từ đó ngăn chặn dị thường chèn/xóa/sửa dữ liệu và bảo đảm tính nhất quán dữ liệu ở mức cao nhất.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_009', 'short-answer', 'database-design',
    'Cho lược đồ quan hệ R(A, B, C) với phụ thuộc hàm A -> B và B -> C. Dạng chuẩn cao nhất mà lược đồ này đạt được là dạng chuẩn mấy?',
    NULL,
    ARRAY['2', '2NF', 'dạng chuẩn 2']::varchar[],
    'Vì khóa chính là A, phụ thuộc hàm B -> C chứa các thuộc tính không khóa B và C, đây là phụ thuộc bắc cầu (A -> B -> C). Lược đồ R đạt 2NF nhưng không đạt 3NF.',
    6, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_01'
  ),
  (
    'cs_db_q_010', 'short-answer', 'database-design',
    'Nếu một quan hệ có khóa chính chỉ gồm duy nhất một thuộc tính (khóa đơn) và đã đạt dạng chuẩn 1 (1NF), thì quan hệ đó tự động đạt dạng chuẩn mấy?',
    NULL,
    ARRAY['2', '2NF', 'dạng chuẩn 2']::varchar[],
    'Do khóa chính là khóa đơn (chỉ có 1 thuộc tính), nên không thể tồn tại phụ thuộc hàm bộ phận vào một phần của khóa chính. Vì vậy, quan hệ đã đạt 1NF sẽ tự động đạt 2NF.',
    6, 'MIT Database Systems', 'cs_database_data', 13, 'cs_db_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Kỹ thuật Đánh chỉ mục Indexing & Tối ưu hóa (cs_db_02) - Chuyên đề: db-query-opt (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_011', 'mcq', 'indexing-optimization',
    'Cấu trúc dữ liệu nào được sử dụng phổ biến nhất để lưu trữ chỉ mục (index) trong các hệ quản trị CSDL quan hệ như PostgreSQL hay MySQL?',
    ARRAY['B-Tree', 'Hash Table', 'Red-Black Tree', 'Singly Linked List']::varchar[],
    ARRAY['B-Tree']::varchar[],
    'B-Tree (hoặc biến thể B+ Tree) là cấu trúc chỉ mục mặc định và phổ biến nhất nhờ khả năng cân bằng tốt và hỗ trợ hiệu quả cả truy vấn bằng, truy vấn khoảng lẫn sắp xếp.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_012', 'mcq', 'indexing-optimization',
    'Giả sử ta tạo một Composite Index trên hai cột (A, B) của bảng R. Câu lệnh truy vấn có bộ lọc WHERE nào sau đây KHÔNG thể tận dụng index này?',
    ARRAY['WHERE B = 10', 'WHERE A = 5', 'WHERE A = 5 AND B = 10', 'WHERE A > 5']::varchar[],
    ARRAY['WHERE B = 10']::varchar[],
    'Composite Index tuân theo quy tắc tiền tố bên trái (Leftmost Prefix Rule). Chỉ mục được tạo trên (A, B) chỉ có hiệu lực khi bộ lọc có chứa cột A.',
    6, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_013', 'mcq', 'indexing-optimization',
    'Tại sao không nên tạo chỉ mục (index) trên tất cả các cột của một bảng?',
    ARRAY['Làm chậm các thao tác ghi (INSERT/UPDATE/DELETE) và tiêu tốn nhiều dung lượng lưu trữ', 'Khiến hệ thống tự động khóa bảng (Table Lock) khi đọc', 'Hệ quản trị CSDL sẽ từ chối thực thi các câu lệnh truy vấn', 'Làm giảm tính toàn vẹn dữ liệu của khóa chính']::varchar[],
    ARRAY['Làm chậm các thao tác ghi (INSERT/UPDATE/DELETE) và tiêu tốn nhiều dung lượng lưu trữ']::varchar[],
    'Mỗi khi chèn, cập nhật hoặc xóa dữ liệu, CSDL phải cập nhật lại tất cả cấu trúc index tương ứng, dẫn tới giảm hiệu năng ghi và tốn không gian đĩa để lưu index.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_014', 'mcq', 'indexing-optimization',
    'Khi phân tích hiệu năng truy vấn bằng `EXPLAIN` trong PostgreSQL, kết quả nào cho thấy câu truy vấn đang quét toàn bộ dữ liệu vật lý của bảng thay vì dùng index?',
    ARRAY['Sequential Scan (Seq Scan)', 'Index Scan', 'Index Only Scan', 'Bitmap Index Scan']::varchar[],
    ARRAY['Sequential Scan (Seq Scan)']::varchar[],
    'Sequential Scan (Seq Scan) nghĩa là hệ thống quét tuần tự từng dòng của bảng từ đầu đến cuối để lọc kết quả, biểu hiện của việc không dùng index.',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_015', 'mcq', 'indexing-optimization',
    'Chỉ mục Hash Index phù hợp nhất cho loại toán tử so sánh nào sau đây?',
    ARRAY['Bằng (=)', 'Lớn hơn (>)', 'Nhỏ hơn (<)', 'Tìm kiếm mẫu (LIKE)']::varchar[],
    ARRAY['Bằng (=)']::varchar[],
    'Hash Index sử dụng hàm băm nên chỉ hỗ trợ so sánh bằng trực tiếp, không hỗ trợ tìm kiếm khoảng hoặc so sánh lớn hơn/nhỏ hơn.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_016', 'mcq', 'indexing-optimization',
    'Sự khác biệt chính giữa `EXPLAIN` và `EXPLAIN ANALYZE` trong PostgreSQL là gì?',
    ARRAY['EXPLAIN chỉ ước lượng kế hoạch thực thi, còn EXPLAIN ANALYZE thực sự chạy câu lệnh và đo lường thời gian thực tế', 'EXPLAIN ANALYZE chỉ chạy trên các câu lệnh SELECT tĩnh', 'EXPLAIN nhanh hơn và cho kết quả chính xác hơn về thời gian thực tế', 'EXPLAIN ANALYZE không hiển thị chi phí (cost) dự báo']::varchar[],
    ARRAY['EXPLAIN chỉ ước lượng kế hoạch thực thi, còn EXPLAIN ANALYZE thực sự chạy câu lệnh và đo lường thời gian thực tế']::varchar[],
    'EXPLAIN chỉ phân tích tĩnh và ước lượng chi phí của kế hoạch, trong khi EXPLAIN ANALYZE thực thi câu query thực tế trên dữ liệu để thu thập thông số thời gian chạy thực tế.',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_017', 'mcq', 'indexing-optimization',
    'Trường hợp nào sau đây được gọi là "Index Only Scan" trong PostgreSQL?',
    ARRAY['Tất cả các trường cần lấy dữ liệu đều nằm ngay trong chỉ mục, CSDL không cần truy cập vào bảng vật lý (heap)', 'Chỉ mục được xây dựng trên khóa chính duy nhất', 'Hệ thống quét chỉ mục từ cuối lên đầu', 'CSDL bỏ qua mọi ràng buộc khóa ngoại để tìm kiếm nhanh']::varchar[],
    ARRAY['Tất cả các trường cần lấy dữ liệu đều nằm ngay trong chỉ mục, CSDL không cần truy cập vào bảng vật lý (heap)']::varchar[],
    'Index Only Scan xảy ra khi index chứa toàn bộ thông tin mà câu SELECT yêu cầu, giúp bỏ qua bước đọc file dữ liệu vật lý (heap), mang lại hiệu năng cao nhất.',
    7, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_018', 'mcq', 'indexing-optimization',
    'Khi viết câu truy vấn có điều kiện lọc dạng `WHERE age + 1 > 18`, tại sao index trên cột `age` thường không được sử dụng?',
    ARRAY['Do sử dụng biểu thức tính toán trên cột được đánh index khiến trình tối ưu hóa bỏ qua index', 'Do cột age chứa giá trị số nguyên', 'Do age không phải là khóa chính', 'Do toán tử lớn hơn không được B-Tree hỗ trợ']::varchar[],
    ARRAY['Do sử dụng biểu thức tính toán trên cột được đánh index khiến trình tối ưu hóa bỏ qua index']::varchar[],
    'Khi áp dụng phép toán hoặc hàm trực tiếp lên cột chỉ mục (ví dụ: `age + 1`), hệ quản trị CSDL không thể so khớp trực tiếp giá trị chỉ mục mà phải tính toán lại từng dòng, dẫn tới quét toàn bảng. Nên viết lại thành `WHERE age > 17`.',
    7, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_019', 'short-answer', 'indexing-optimization',
    'Nếu câu lệnh EXPLAIN ANALYZE trả về chi phí thực tế (actual time) của một câu query là 150ms bằng Seq Scan, sau khi tạo index đúng đắn và chạy lại thu được kết quả Index Scan là 1.5ms. Hiệu năng truy vấn đã được tăng tốc lên gấp bao nhiêu lần?',
    NULL,
    ARRAY['100', '100 lần']::varchar[],
    'Hiệu năng tăng tốc = Thời gian trước / Thời gian sau = 150ms / 1.5ms = 100 lần.',
    5, 'Database Tuning', 'cs_database_data', 13, 'cs_db_02'
  ),
  (
    'cs_db_q_020', 'short-answer', 'indexing-optimization',
    'Viết tên của lệnh trong SQL dùng để xóa một chỉ mục có tên là "idx_user_email".',
    NULL,
    ARRAY['DROP INDEX idx_user_email', 'DROP INDEX idx_user_email;']::varchar[],
    'Câu lệnh chuẩn trong SQL để xóa index là: DROP INDEX <tên_index>.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Quản lý Giao dịch & ACID (cs_db_03) - Chuyên đề: db-transactions (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_021', 'mcq', 'transactions-acid',
    'Thuộc tính "Atomicity" (Tính nguyên tử) trong ACID của giao dịch CSDL bảo đảm điều gì?',
    ARRAY['Tất cả các thao tác trong giao dịch phải hoàn thành thành công, hoặc toàn bộ giao dịch bị hủy bỏ', 'Dữ liệu không bao giờ bị rò rỉ ra các giao dịch khác', 'Dữ liệu được lưu trữ vĩnh viễn trên ổ đĩa cứng', 'Giao dịch chỉ chạy trên một luồng xử lý duy nhất']::varchar[],
    ARRAY['Tất cả các thao tác trong giao dịch phải hoàn thành thành công, hoặc toàn bộ giao dịch bị hủy bỏ']::varchar[],
    'Atomicity (Tính nguyên tử) đảm bảo nguyên tắc "tất cả hoặc không có gì". Một giao dịch nếu có bất kỳ bước nào lỗi thì toàn bộ thay đổi trước đó phải bị khôi phục (ROLLBACK).',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_022', 'mcq', 'transactions-acid',
    'Hiện tượng "Dirty Read" xảy ra khi nào?',
    ARRAY['Giao dịch A đọc dữ liệu đã bị thay đổi bởi giao dịch B nhưng giao dịch B chưa thực hiện COMMIT', 'Giao dịch A cập nhật dữ liệu đè lên giao dịch B', 'Giao dịch A đọc cùng một dòng dữ liệu hai lần nhưng ra hai giá trị khác nhau', 'Dữ liệu bị lỗi vật lý trên đĩa cứng']::varchar[],
    ARRAY['Giao dịch A đọc dữ liệu đã bị thay đổi bởi giao dịch B nhưng giao dịch B chưa thực hiện COMMIT']::varchar[],
    'Dirty Read là hiện tượng một transaction đọc được dữ liệu tạm thời của một transaction khác đang viết dở dang và chưa chính thức lưu (COMMIT). Nếu transaction kia ROLLBACK, dữ liệu đã đọc trở nên không hợp lệ.',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_023', 'mcq', 'transactions-acid',
    'Mức độ cô lập (Isolation Level) nào sau đây ngăn chặn được cả ba hiện tượng: Dirty Read, Non-repeatable Read và Phantom Read?',
    ARRAY['Serializable', 'Repeatable Read', 'Read Committed', 'Read Uncommitted']::varchar[],
    ARRAY['Serializable']::varchar[],
    'Serializable là mức cô lập cao nhất và nghiêm ngặt nhất, ngăn chặn hoàn toàn mọi hiện tượng dị thường giao dịch bằng cách thực thi tuần tự hóa.',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_024', 'mcq', 'transactions-acid',
    'Thuộc tính "Durability" (Tính bền vững) trong ACID đảm bảo dữ liệu đã được lưu trữ vĩnh viễn sau khi xảy ra sự kiện nào?',
    ARRAY['COMMIT', 'ROLLBACK', 'START TRANSACTION', 'SELECT']::varchar[],
    ARRAY['COMMIT']::varchar[],
    'Durability đảm bảo sau khi một transaction đã COMMIT thành công, các thay đổi dữ liệu sẽ được lưu trữ vĩnh viễn và không bị mất ngay cả khi hệ thống bị sập nguồn hoặc gặp sự cố vật lý.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_025', 'mcq', 'transactions-acid',
    'Sự khác biệt chính giữa hiện tượng "Non-repeatable Read" và "Phantom Read" là gì?',
    ARRAY['Non-repeatable Read liên quan đến cập nhật/xóa dòng hiện tại, còn Phantom Read liên quan đến chèn thêm dòng mới (hàng loạt)', 'Phantom Read chỉ xảy ra ở mức cô lập Serializable', 'Non-repeatable Read xảy ra khi đọc dữ liệu chưa commit', 'Không có sự khác biệt, hai khái niệm này là một']::varchar[],
    ARRAY['Non-repeatable Read liên quan đến cập nhật/xóa dòng hiện tại, còn Phantom Read liên quan đến chèn thêm dòng mới (hàng loạt)']::varchar[],
    'Non-repeatable Read xảy ra khi một transaction đọc lại một dòng và thấy dữ liệu dòng đó bị UPDATE/DELETE bởi transaction khác. Phantom Read xảy ra khi chạy lại cùng một query điều kiện và thấy có thêm các dòng mới được INSERT bởi transaction khác.',
    7, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_026', 'mcq', 'transactions-acid',
    'Cơ chế khóa "Exclusive Lock" (khóa độc quyền - Write Lock) cho phép thực hiện hành động nào?',
    ARRAY['Chỉ giao dịch giữ khóa mới được quyền đọc và ghi dữ liệu, các giao dịch khác không được truy cập', 'Mọi giao dịch đều được đọc và viết đồng thời', 'Các giao dịch khác chỉ được đọc chứ không được ghi', 'Tự động sao lưu bảng dữ liệu']::varchar[],
    ARRAY['Chỉ giao dịch giữ khóa mới được quyền đọc và ghi dữ liệu, các giao dịch khác không được truy cập']::varchar[],
    'Exclusive Lock (khóa X) ngăn cấm các transaction khác giành bất kỳ loại khóa nào (Shared hay Exclusive) trên đối tượng đó, chỉ transaction đang giữ khóa được đọc/ghi.',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_027', 'mcq', 'transactions-acid',
    'Hiện tượng "Deadlock" trong quản lý giao dịch CSDL là gì?',
    ARRAY['Hai hoặc nhiều giao dịch bị khóa vĩnh viễn vì mỗi giao dịch đều chờ giao dịch kia giải phóng khóa', 'Dữ liệu bị xóa nhầm bởi người quản trị CSDL', 'Ổ cứng bị đầy và không thể ghi thêm dữ liệu', 'Mạng kết nối bị ngắt kết nối giữa client và server']::varchar[],
    ARRAY['Hai hoặc nhiều giao dịch bị khóa vĩnh viễn vì mỗi giao dịch đều chờ giao dịch kia giải phóng khóa']::varchar[],
    'Deadlock (tắc nghẽn chết) xảy ra khi Transaction 1 giữ tài nguyên A và đợi khóa tài nguyên B, đồng thời Transaction 2 giữ tài nguyên B và đợi khóa tài nguyên A. Cả hai chờ đợi lẫn nhau vô hạn.',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_028', 'mcq', 'transactions-acid',
    'Mức độ cô lập mặc định của hệ quản trị CSDL PostgreSQL là gì?',
    ARRAY['Read Committed', 'Read Uncommitted', 'Repeatable Read', 'Serializable']::varchar[],
    ARRAY['Read Committed']::varchar[],
    'PostgreSQL sử dụng Read Committed làm Isolation Level mặc định, giúp cân bằng tốt giữa tính nhất quán và hiệu năng hoạt động đồng thời.',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_029', 'short-answer', 'transactions-acid',
    'Điền từ tiếng Anh viết tắt của thuộc tính ACID đại diện cho tính chất đảm bảo một transaction phải được thực thi toàn bộ hoặc không có bước nào được thực thi (All or Nothing).',
    NULL,
    ARRAY['Atomicity']::varchar[],
    'Atomicity (Tính nguyên tử) là thuộc tính đảm bảo giao dịch được thực hiện trọn vẹn hoặc bị hủy hoàn toàn.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_03'
  ),
  (
    'cs_db_q_030', 'short-answer', 'transactions-acid',
    'Trong câu lệnh SQL SELECT của PostgreSQL, ta có thể thêm mệnh đề nào vào cuối để chủ động khóa các dòng được chọn nhằm cập nhật dữ liệu và ngăn các transaction khác sửa đổi chúng? (Viết bằng tiếng Anh viết hoa)',
    NULL,
    ARRAY['FOR UPDATE']::varchar[],
    'Mệnh đề FOR UPDATE dùng để áp đặt Exclusive Lock trên các dòng được truy vấn.',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Hệ Quản trị CSDL Quan hệ vs NoSQL (cs_db_04) - Chuyên đề: db-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_031', 'mcq', 'sql-vs-nosql',
    'Theo định lý CAP, ba yếu tố nào cấu thành nên giới hạn của một hệ thống lưu trữ phân tán?',
    ARRAY['Consistency, Availability, Partition Tolerance', 'Concurrency, Accuracy, Performance', 'Caching, Accessibility, Portability', 'Cost, Availability, Security']::varchar[],
    ARRAY['Consistency, Availability, Partition Tolerance']::varchar[],
    'Định lý CAP chỉ ra một hệ thống phân tán chỉ có thể đáp ứng đồng thời tối đa hai trong ba yếu tố: Consistency (Nhất quán), Availability (Sẵn sàng), và Partition Tolerance (Chịu lỗi phân mảnh).',
    5, 'CAP Theorem - Brewer', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_032', 'mcq', 'sql-vs-nosql',
    'Cơ sở dữ liệu NoSQL dạng Key-Value (ví dụ: Redis) thường được ứng dụng tối ưu nhất cho bài toán nào?',
    ARRAY['Lưu trữ cache dữ liệu và quản lý session người dùng', 'Xây dựng mối quan hệ bạn bè phức tạp của mạng xã hội', 'Truy vấn báo cáo tài chính doanh nghiệp cuối năm', 'Thiết kế cấu trúc bảng chuẩn hóa 3NF']::varchar[],
    ARRAY['Lưu trữ cache dữ liệu và quản lý session người dùng']::varchar[],
    'Redis lưu trữ dữ liệu dưới dạng khóa - giá trị trực tiếp trên RAM, đem lại tốc độ đọc/ghi siêu nhanh (< 1ms), cực kỳ phù hợp cho bài toán caching và session store.',
    5, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_033', 'mcq', 'sql-vs-nosql',
    'Hệ CSDL NoSQL nào sau đây lưu trữ dữ liệu dưới dạng các tài liệu bán cấu trúc (thường là BSON/JSON)?',
    ARRAY['MongoDB', 'Neo4j', 'Cassandra', 'Redis']::varchar[],
    ARRAY['MongoDB']::varchar[],
    'MongoDB là hệ quản trị cơ sở dữ liệu NoSQL hướng tài liệu (Document Store) phổ biến nhất, lưu trữ bản ghi dưới dạng tài liệu JSON/BSON linh hoạt.',
    5, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_034', 'mcq', 'sql-vs-nosql',
    'Điểm vượt trội chính của cơ sở dữ liệu quan hệ (SQL) so với hầu hết hệ thống NoSQL là gì?',
    ARRAY['Hỗ trợ giao dịch ACID mạnh mẽ trên nhiều bảng và tính toàn vẹn dữ liệu chặt chẽ', 'Khả năng mở rộng chiều ngang (horizontal scaling) dễ dàng hơn', 'Không cần khai báo schema trước khi ghi dữ liệu', 'Tốc độ ghi dữ liệu phi cấu trúc nhanh hơn']::varchar[],
    ARRAY['Hỗ trợ giao dịch ACID mạnh mẽ trên nhiều bảng và tính toàn vẹn dữ liệu chặt chẽ']::varchar[],
    'Các hệ quản trị CSDL quan hệ có thế mạnh tuyệt đối về tính toàn vẹn dữ liệu, ràng buộc khóa, và khả năng thực thi giao dịch ACID phức tạp liên kết nhiều bảng.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_035', 'mcq', 'sql-vs-nosql',
    'Trong định lý CAP, tính chất "Consistency" (Nhất quán) yêu cầu điều gì?',
    ARRAY['Mọi nút trong mạng phân tán đều trả về cùng một phiên bản dữ liệu mới nhất tại cùng một thời điểm', 'Hệ thống luôn sẵn sàng phản hồi trong mọi tình huống mạng lỗi', 'Mạng lưới hoạt động liên tục không bao giờ bị mất gói tin', 'Dữ liệu được mã hóa an toàn trước khi truyền đi']::varchar[],
    ARRAY['Mọi nút trong mạng phân tán đều trả về cùng một phiên bản dữ liệu mới nhất tại cùng một thời điểm']::varchar[],
    'Consistency (Nhất quán) trong CAP đảm bảo tất cả các máy khách đọc dữ liệu ở các nút khác nhau trong cùng thời điểm sẽ nhận được dữ liệu hoàn toàn giống nhau.',
    6, 'CAP Theorem - Brewer', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_036', 'mcq', 'sql-vs-nosql',
    'Khái niệm "Polyglot Persistence" trong kiến trúc phần mềm hiện đại có nghĩa là gì?',
    ARRAY['Sử dụng nhiều công nghệ CSDL khác nhau trong cùng một hệ thống để tận dụng thế mạnh của từng loại', 'Chỉ sử dụng một cơ sở dữ liệu duy nhất cho mọi tác vụ để giảm độ phức tạp', 'Mã hóa cơ sở dữ liệu bằng nhiều ngôn ngữ lập trình', 'Sao chép dữ liệu ra nhiều quốc gia khác nhau']::varchar[],
    ARRAY['Sử dụng nhiều công nghệ CSDL khác nhau trong cùng một hệ thống để tận dụng thế mạnh của từng loại']::varchar[],
    'Polyglot Persistence khuyên lập trình viên nên chọn loại CSDL phù hợp nhất cho từng tác vụ riêng biệt (ví dụ: dùng PostgreSQL cho thanh toán, Redis làm cache, Elasticsearch để tìm kiếm) thay vì cố ép một CSDL gánh vác mọi việc.',
    6, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_037', 'mcq', 'sql-vs-nosql',
    'Đặc trưng "Schema-less" của NoSQL mang lại lợi ích gì?',
    ARRAY['Nhà phát triển có thể chèn dữ liệu mà không cần định nghĩa trước cấu trúc cột, giúp dễ dàng thay đổi cấu trúc dữ liệu ứng dụng', 'Dữ liệu tự động được định dạng và chuẩn hóa về dạng 3NF', 'CSDL chạy nhanh hơn vì không cần kiểm tra bảo mật', 'Dữ liệu không bao giờ bị trùng lặp']::varchar[],
    ARRAY['Nhà phát triển có thể chèn dữ liệu mà không cần định nghĩa trước cấu trúc cột, giúp dễ dàng thay đổi cấu trúc dữ liệu ứng dụng']::varchar[],
    'Schema-less cho phép lưu trữ các tài liệu có cấu trúc khác nhau trong cùng một collection, giúp phát triển nhanh và thích ứng tốt với sự thay đổi liên tục của business.',
    5, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_038', 'mcq', 'sql-vs-nosql',
    'Mô hình CSDL NoSQL nào phù hợp nhất để xây dựng công cụ gợi ý bạn bè (Friend Recommendation) hoặc phát hiện gian lận tài chính liên đới?',
    ARRAY['Graph Database (CSDL Đồ thị)', 'Key-Value Database', 'Document Database', 'Column-Family Database']::varchar[],
    ARRAY['Graph Database (CSDL Đồ thị)']::varchar[],
    'Graph Database (như Neo4j) lưu trữ các thực thể dưới dạng nút (Nodes) và mối quan hệ dưới dạng cạnh (Edges), giúp thực hiện các truy vấn tìm đường đi, kết nối sâu cực kỳ nhanh chóng.',
    6, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_039', 'short-answer', 'sql-vs-nosql',
    'Theo định lý CAP, nếu một hệ thống phân tán xảy ra lỗi phân mảnh mạng (Partition xảy ra) và hệ thống quyết định tiếp tục phục vụ người dùng bằng cách chấp nhận dữ liệu cũ ở các nút bị cô lập để đảm bảo hệ thống luôn phản hồi, hệ thống này đã ưu tiên yếu tố A (Availability) và đánh đổi yếu tố nào? (Viết bằng tên tiếng Anh)',
    NULL,
    ARRAY['Consistency']::varchar[],
    'Khi xảy ra lỗi phân mảnh mạng (P), hệ thống bắt buộc phải chọn lựa giữa tính nhất quán dữ liệu (C) hoặc tính sẵn sàng (A). Ưu tiên Availability thì phải chấp nhận mất Consistency.',
    6, 'CAP Theorem - Brewer', 'cs_database_data', 13, 'cs_db_04'
  ),
  (
    'cs_db_q_040', 'short-answer', 'sql-vs-nosql',
    'Điền tên viết tắt của cơ chế đảm bảo dữ liệu trong NoSQL mang tính chất nhất quán cuối cùng (Eventual Consistency), trái ngược với ACID của SQL.',
    NULL,
    ARRAY['BASE']::varchar[],
    'Mô hình BASE (Basically Available, Soft state, Eventual consistency) là đặc trưng của các hệ thống NoSQL phân tán.',
    6, 'NoSQL Distilled', 'cs_database_data', 13, 'cs_db_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Connection Pooling & Tích hợp ORM (cs_db_05) - Chuyên đề: db-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_041', 'mcq', 'connection-pooling-orm',
    'Mục đích cốt lõi của việc sử dụng Connection Pooling trong ứng dụng kết nối cơ sở dữ liệu là gì?',
    ARRAY['Tái sử dụng các kết nối vật lý hiện có để giảm thời gian và tài nguyên thiết lập kết nối mới liên tục', 'Tự động tối ưu hóa các câu lệnh SQL viết chưa chuẩn', 'Phân chia cơ sở dữ liệu thành nhiều mảnh nhỏ vật lý', 'Mã hóa đường truyền dữ liệu giữa backend và DB']::varchar[],
    ARRAY['Tái sử dụng các kết nối vật lý hiện có để giảm thời gian và tài nguyên thiết lập kết nối mới liên tục']::varchar[],
    'Khởi tạo một kết nối TCP/IP và xác thực với DB rất tốn kém thời gian và CPU. Connection Pooling giữ sẵn một lượng kết nối mở để ứng dụng dùng lại ngay lập tức.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_042', 'mcq', 'connection-pooling-orm',
    'Hiện tượng lỗi "N+1 Query" khi sử dụng ORM (Object-Relational Mapping) thường xuất phát từ nguyên nhân nào?',
    ARRAY['Chế độ tải dữ liệu trễ (Lazy Loading) tự động thực hiện thêm câu truy vấn con cho từng bản ghi trong danh sách', 'Hệ thống bị cạn kiệt số lượng kết nối trong connection pool', 'Database thiếu chỉ mục trên các cột khóa chính', 'Sử dụng quá nhiều câu lệnh JOIN phức tạp trong một query']::varchar[],
    ARRAY['Chế độ tải dữ liệu trễ (Lazy Loading) tự động thực hiện thêm câu truy vấn con cho từng bản ghi trong danh sách']::varchar[],
    'Lazy Loading trì hoãn việc tải dữ liệu liên kết cho đến khi lập trình viên gọi thuộc tính đó. Khi duyệt qua danh sách N phần tử cha, ORM sẽ thực thi thêm N câu query con để lấy dữ liệu liên kết, tạo thành N+1 truy vấn.',
    7, 'Java Persistence with Hibernate', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_043', 'mcq', 'connection-pooling-orm',
    'Kỹ thuật nào sau đây là giải pháp trực tiếp để khắc phục lỗi N+1 Query trong ORM?',
    ARRAY['Eager Loading (Sử dụng JOIN để tải dữ liệu đồng thời)', 'Tạo thêm B-Tree Index cho bảng con', 'Tăng kích thước tối đa của Connection Pool', 'Chuyển đổi cơ sở dữ liệu sang dạng NoSQL Schema-less']::varchar[],
    ARRAY['Eager Loading (Sử dụng JOIN để tải dữ liệu đồng thời)']::varchar[],
    'Eager Loading yêu cầu ORM tải dữ liệu cha và con đồng thời bằng cách thực hiện câu lệnh SQL JOIN, gom toàn bộ quá trình thành 1 câu query duy nhất.',
    6, 'Java Persistence with Hibernate', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_044', 'mcq', 'connection-pooling-orm',
    'Nếu kích thước tối đa của Connection Pool (Max Pool Size) được cấu hình quá nhỏ, điều gì có thể xảy ra khi ứng dụng có lượng truy cập đột biến?',
    ARRAY['Các yêu cầu mới phải xếp hàng chờ kết nối rảnh, dẫn tới tăng độ trễ (latency) hoặc lỗi Timeout', 'Database bị sập nguồn do quá tải CPU', 'Hệ quản trị CSDL tự động xóa bớt dữ liệu để giải phóng bộ nhớ', 'Tất cả các câu lệnh SQL đều bị biến đổi thành Seq Scan']::varchar[],
    ARRAY['Các yêu cầu mới phải xếp hàng chờ kết nối rảnh, dẫn tới tăng độ trễ (latency) hoặc lỗi Timeout']::varchar[],
    'Khi số lượng request vượt quá Max Pool Size, ứng dụng không lấy được connection rảnh và phải đợi. Nếu hàng đợi quá lâu, client sẽ nhận lỗi Gateway Timeout hoặc Pool Timeout.',
    6, 'Database Tuning', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_045', 'mcq', 'connection-pooling-orm',
    'Tại sao việc cấu hình kích thước Connection Pool cực kỳ lớn (ví dụ: Max Pool Size = 1000) trên một cấu hình server database yếu lại phản tác dụng?',
    ARRAY['Gây cạn kiệt tài nguyên RAM/CPU của DB server để quản lý kết nối và gây tranh chấp tài nguyên', 'Làm giảm tốc độ mạng internet của client', 'Hệ thống tự động chuyển toàn bộ dữ liệu lên RAM', 'Khiến CSDL tự động chuyển sang chế độ Read Only']::varchar[],
    ARRAY['Gây cạn kiệt tài nguyên RAM/CPU của DB server để quản lý kết nối và gây tranh chấp tài nguyên']::varchar[],
    'Mỗi kết nối mở chiếm dung lượng bộ nhớ RAM và CPU của DB. Quá nhiều kết nối đồng thời làm tăng chi phí chuyển đổi ngữ cảnh (context switching) và tranh chấp khóa, làm giảm hiệu năng tổng thể của database.',
    7, 'Database Tuning', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_046', 'mcq', 'connection-pooling-orm',
    'Nhược điểm lớn nhất của việc sử dụng công cụ ORM so với viết SQL thuần (Raw SQL) là gì?',
    ARRAY['Mất khả năng kiểm soát hoàn toàn câu lệnh SQL được sinh ra, có thể dẫn đến các câu truy vấn ngầm kém tối ưu', 'ORM không hỗ trợ chèn dữ liệu vào bảng có khóa ngoại', 'Không thể sử dụng ORM kết nối với PostgreSQL', 'Ứng dụng viết bằng ORM sẽ tốn đĩa cứng hơn để lưu trữ database']::varchar[],
    ARRAY['Mất khả năng kiểm soát hoàn toàn câu lệnh SQL được sinh ra, có thể dẫn đến các câu truy vấn ngầm kém tối ưu']::varchar[],
    'ORM che giấu SQL phía dưới giúp lập trình viên viết code nhanh, nhưng đôi khi sinh ra các câu query lồng nhau vô cùng phức tạp và kém hiệu quả mà nhà phát triển khó kiểm soát.',
    6, 'Java Persistence with Hibernate', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_047', 'mcq', 'connection-pooling-orm',
    'Trong Prisma ORM (Node.js), để giải quyết bài toán tải danh sách bài viết kèm theo thông tin tác giả của từng bài mà không bị lỗi N+1 Query, ta dùng cú pháp nào?',
    ARRAY['prisma.post.findMany({ include: { author: true } })', 'prisma.post.findMany().author()', 'prisma.post.findMany({ select: { author_id: true } })', 'prisma.post.findMany({ relation: "join" })']::varchar[],
    ARRAY['prisma.post.findMany({ include: { author: true } })']::varchar[],
    'Sử dụng tùy chọn `include` trong Prisma kích hoạt Eager Loading, gom thông tin bài viết và tác giả bằng câu JOIN để lấy dữ liệu đồng thời.',
    6, 'Prisma Documentation', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_048', 'mcq', 'connection-pooling-orm',
    'Hành động nào sau đây của lập trình viên là nguyên nhân phổ biến nhất dẫn đến rò rỉ kết nối (Connection Leak) trong ứng dụng?',
    ARRAY['Không đóng kết nối hoặc không trả kết nối về pool sau khi thực thi xong câu lệnh (nhất là khi xảy ra biệt lệ/error)', 'Cấu hình Max Pool Size quá nhỏ', 'Sử dụng mệnh đề WHERE không có index', 'Thực hiện quá nhiều câu lệnh SELECT đồng thời']::varchar[],
    ARRAY['Không đóng kết nối hoặc không trả kết nối về pool sau khi thực thi xong câu lệnh (nhất là khi xảy ra biệt lệ/error)']::varchar[],
    'Nếu kết nối được lấy ra từ pool nhưng gặp lỗi trong code xử lý và không đi qua khối lệnh đóng/giải phóng (`finally`), kết nối đó sẽ bị chiếm dụng vĩnh viễn, lâu dần gây cạn kiệt pool.',
    6, 'Database Tuning', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_049', 'short-answer', 'connection-pooling-orm',
    'Nếu một trang web có 100 bài viết. Mỗi bài viết có 5 bình luận. Nếu ORM bị lỗi N+1 Query khi tải trang chủ hiển thị toàn bộ bài viết kèm bình luận của chúng, tổng số câu lệnh SQL SELECT gửi tới database sẽ là bao nhiêu?',
    NULL,
    ARRAY['101']::varchar[],
    'Số câu lệnh = 1 (lấy danh sách bài viết) + N (với N = 100 câu lấy bình luận của từng bài viết) = 101 câu query.',
    6, 'Java Persistence with Hibernate', 'cs_database_data', 13, 'cs_db_05'
  ),
  (
    'cs_db_q_050', 'short-answer', 'connection-pooling-orm',
    'Cấu hình connection pool có một tham số quy định thời gian tối đa (bằng mili-giây) một kết nối nhàn rỗi được phép tồn tại trong pool trước khi bị đóng để giải phóng tài nguyên. Điền tên tiếng Anh viết thường của cơ chế nhàn rỗi này (ví dụ: max, idle, ...).',
    NULL,
    ARRAY['idle timeout', 'idletimeout']::varchar[],
    'Idle Timeout quy định thời gian tối đa kết nối nhàn rỗi được giữ mở trong pool.',
    5, 'Database Tuning', 'cs_database_data', 13, 'cs_db_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Mô hình hóa Kho dữ liệu & OLAP (cs_db_06) - Chuyên đề: db-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_051', 'mcq', 'data-warehouse-olap',
    'Điểm khác biệt cốt lõi giữa hệ thống OLTP và OLAP là gì?',
    ARRAY['OLTP phục vụ giao dịch ghi/đọc nhanh thường nhật, còn OLAP phục vụ phân tích dữ liệu lớn', 'OLTP sử dụng NoSQL còn OLAP bắt buộc sử dụng SQL', 'OLAP không hỗ trợ lưu trữ dữ liệu lịch sử', 'OLTP có tốc độ đọc chậm hơn OLAP']::varchar[],
    ARRAY['OLTP phục vụ giao dịch ghi/đọc nhanh thường nhật, còn OLAP phục vụ phân tích dữ liệu lớn']::varchar[],
    'OLTP (Online Transaction Processing) tối ưu hóa cho các thao tác chèn/xóa/sửa dòng đơn lẻ nhanh chóng. OLAP (Online Analytical Processing) tối ưu cho các truy vấn phân tích, gom nhóm trên hàng triệu bản ghi.',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_052', 'mcq', 'data-warehouse-olap',
    'Trong thiết kế kho dữ liệu (Data Warehouse), bảng "Fact" thường chứa thông tin loại nào?',
    ARRAY['Các chỉ số đo lường định lượng (doanh thu, số lượng) và khóa ngoại dẫn tới bảng Dimension', 'Thông tin chi tiết về địa chỉ và danh tính của khách hàng', 'Mô tả cấu trúc cây danh mục sản phẩm', 'Các chính sách bảo mật hệ thống CSDL']::varchar[],
    ARRAY['Các chỉ số đo lường định lượng (doanh thu, số lượng) và khóa ngoại dẫn tới bảng Dimension']::varchar[],
    'Bảng Fact chứa các dữ liệu số đo lường thực tế (metrics/measures) của hoạt động kinh doanh và các khóa ngoại liên kết tới các chiều phân tích (Dimension).',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_053', 'mcq', 'data-warehouse-olap',
    'Đặc điểm cấu trúc của mô hình ngôi sao (Star Schema) là gì?',
    ARRAY['Một bảng Fact lớn nằm ở trung tâm và kết nối trực tiếp với các bảng Dimension xung quanh không chuẩn hóa', 'Các bảng kết nối xoay vòng không có trung tâm', 'Bảng Dimension được chuẩn hóa tối đa thành nhiều bảng nhỏ phân cấp', 'Dữ liệu được lưu trữ dạng Key-Value phẳng'],
    ARRAY['Một bảng Fact lớn nằm ở trung tâm và kết nối trực tiếp với các bảng Dimension xung quanh không chuẩn hóa']::varchar[],
    'Star Schema có cấu trúc đơn giản giống hình ngôi sao: bảng Fact ở giữa liên kết trực tiếp với các bảng Dimension (được giải chuẩn hóa để tăng tốc độ truy vấn đọc).',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_054', 'mcq', 'data-warehouse-olap',
    'Ưu điểm lớn nhất của mô hình Snowflake Schema so với Star Schema là gì?',
    ARRAY['Tiết kiệm dung lượng lưu trữ nhờ chuẩn hóa các bảng Dimension để loại bỏ dư thừa', 'Tốc độ truy vấn JOIN nhanh hơn', 'Đơn giản và dễ viết câu lệnh SQL phân tích hơn', 'Không cần sử dụng khóa ngoại để liên kết'],
    ARRAY['Tiết kiệm dung lượng lưu trữ nhờ chuẩn hóa các bảng Dimension để loại bỏ dư thừa']::varchar[],
    'Snowflake Schema chuẩn hóa các bảng Dimension (phân tách thành các bảng con cấp dưới), giúp cấu trúc dữ liệu gọn gàng hơn, giảm thiểu dư thừa dữ liệu nhưng đổi lại làm tăng độ phức tạp phép JOIN.',
    6, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_055', 'mcq', 'data-warehouse-olap',
    'Tại sao việc áp dụng dạng chuẩn cao (3NF) rất phù hợp cho hệ thống OLTP nhưng lại không tối ưu cho hệ thống OLAP?',
    ARRAY['Vì 3NF yêu cầu thực hiện quá nhiều phép JOIN giữa các bảng khi cần truy vấn tổng hợp lượng dữ liệu khổng lồ', 'Vì 3NF làm tăng nguy cơ xảy ra lỗi Dirty Read', 'Vì 3NF không hỗ trợ lưu trữ kiểu dữ liệu số nguyên', 'Vì 3NF giới hạn số dòng tối đa của một bảng là 1 triệu dòng']::varchar[],
    ARRAY['Vì 3NF yêu cầu thực hiện quá nhiều phép JOIN giữa các bảng khi cần truy vấn tổng hợp lượng dữ liệu khổng lồ']::varchar[],
    'Trong OLAP, ta thường quét hàng triệu bản ghi để tính tổng/trung bình. Nếu dữ liệu phân rã ở 3NF, CSDL phải thực hiện JOIN hàng chục bảng lớn, tiêu tốn cực kỳ nhiều CPU và tài nguyên mạng đĩa.',
    6, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_056', 'mcq', 'data-warehouse-olap',
    'Cơ sở dữ liệu hướng cột (Column-oriented Database, ví dụ: ClickHouse, Google BigQuery) tối ưu cho tác vụ nào?',
    ARRAY['Các truy vấn phân tích quét và tính toán aggregation trên một vài cột cụ thể của hàng tỷ dòng dữ liệu', 'Các thao tác chèn và cập nhật bản ghi đơn lẻ liên tục tần suất cao', 'Quản lý tài khoản đăng nhập thời gian thực', 'Lưu trữ session người dùng Web']::varchar[],
    ARRAY['Các truy vấn phân tích quét và tính toán aggregation trên một vài cột cụ thể của hàng tỷ dòng dữ liệu']::varchar[],
    'CSDL hướng cột lưu trữ dữ liệu của cùng một cột cạnh nhau trên đĩa. Khi chạy lệnh SELECT SUM(revenue), hệ thống chỉ đọc dữ liệu cột revenue trên ổ đĩa, bỏ qua toàn bộ các cột khác, tăng tốc độ xử lý hàng trăm lần.',
    7, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_057', 'mcq', 'data-warehouse-olap',
    'Khái niệm "Slicing" và "Dicing" trong khối dữ liệu OLAP (OLAP Cube) nói về hành động nào?',
    ARRAY['Chọn một lát cắt dữ liệu theo một chiều phân tích cụ thể (Slicing) hoặc chọn một khối con đa chiều (Dicing)', 'Xóa bỏ các bản ghi trùng lặp trong kho dữ liệu', 'Sao lưu dữ liệu từ Master sang Slave', 'Phân chia phân mảnh dữ liệu (Sharding) cho các bảng Fact']::varchar[],
    ARRAY['Chọn một lát cắt dữ liệu theo một chiều phân tích cụ thể (Slicing) hoặc chọn một khối con đa chiều (Dicing)']::varchar[],
    'Slicing cắt một lát phẳng của cube (ví dụ: doanh số chỉ riêng năm 2025). Dicing chọn một khối nhỏ hơn chứa tập con của nhiều chiều (ví dụ: doanh số năm 2025 tại khu vực Châu Á đối với ngành hàng Điện tử).',
    6, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_058', 'mcq', 'data-warehouse-olap',
    'Quá trình ETL trong xây dựng Kho dữ liệu viết tắt của ba bước nào?',
    ARRAY['Extract, Transform, Load', 'Encrypt, Transfer, Lock', 'Evaluate, Test, Log', 'Export, Translate, Link']::varchar[],
    ARRAY['Extract, Transform, Load']::varchar[],
    'ETL là quy trình: Extract (Trích xuất dữ liệu từ các nguồn sinh giao dịch), Transform (Biến đổi, làm sạch dữ liệu theo chuẩn), và Load (Nạp dữ liệu vào kho dữ liệu tập trung).',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_059', 'short-answer', 'data-warehouse-olap',
    'Điền tên tiếng Anh của chiều phân tích dữ liệu phổ biến nhất, luôn xuất hiện trong mọi mô hình kho dữ liệu bán hàng để phân tích doanh thu theo ngày, tháng, quý, năm (viết thường).',
    NULL,
    ARRAY['time', 'date', 'dimension time', 'dim time']::varchar[],
    'Time/Date Dimension là chiều phân tích bắt buộc để thống kê dữ liệu theo tiến trình thời gian.',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  ),
  (
    'cs_db_q_060', 'short-answer', 'data-warehouse-olap',
    'Trong thiết kế kho dữ liệu, bảng chứa các chiều phân tích như thông tin sản phẩm, thông tin khách hàng, cửa hàng được gọi là bảng gì? (Điền một từ tiếng Anh viết thường, ví dụ: fact, dimension, metadata...)',
    NULL,
    ARRAY['dimension']::varchar[],
    'Bảng Dimension lưu trữ các thuộc tính mô tả ngữ cảnh xung quanh sự kiện cần phân tích.',
    5, 'Data Warehouse Toolkit', 'cs_database_data', 13, 'cs_db_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Kỹ thuật Tìm kiếm Toàn văn Full-Text Search (cs_db_07) - Chuyên đề: db-query-opt (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_061', 'mcq', 'full-text-search',
    'Tại sao truy vấn tìm kiếm bằng mệnh đề `LIKE ''%keyword%''` trong SQL lại có hiệu năng rất tệ trên các bảng dữ liệu lớn?',
    ARRAY['Do kí tự đại diện đứng đầu (%) khiến CSDL không thể sử dụng B-Tree Index và buộc phải quét toàn bộ bảng (Seq Scan)', 'Do LIKE không hỗ trợ kiểu dữ liệu chuỗi ký tự VARCHAR', 'Do SQL cấm sử dụng từ khóa LIKE trên bảng có khóa ngoại', 'Do CSDL tự động chuyển sang chế độ ghi khóa bảng']::varchar[],
    ARRAY['Do kí tự đại diện đứng đầu (%) khiến CSDL không thể sử dụng B-Tree Index và buộc phải quét toàn bộ bảng (Seq Scan)']::varchar[],
    'Khi tìm kiếm có dấu `%` ở đầu, B-Tree index không thể xác định điểm bắt đầu của chuỗi ký tự cần tìm, buộc hệ quản trị CSDL phải thực hiện Full Table Scan.',
    6, 'Stanford CS145', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_062', 'mcq', 'full-text-search',
    'Cơ chế hoạt động của "Inverted Index" (Chỉ mục đảo ngược) trong Full-Text Search là gì?',
    ARRAY['Tách văn bản thành các từ đơn lẻ và ánh xạ mỗi từ tới danh sách các tài liệu có chứa từ đó', 'Lưu trữ văn bản theo chiều ngược từ dưới lên trên', 'Mã hóa chuỗi văn bản thành các đoạn mã băm MD5', 'Tạo khóa chính tự động tăng ngược cho bảng dữ liệu']::varchar[],
    ARRAY['Tách văn bản thành các từ đơn lẻ và ánh xạ mỗi từ tới danh sách các tài liệu có chứa từ đó']::varchar[],
    'Inverted Index hoạt động tương tự mục lục cuối cuốn sách: chia tách văn bản thành các từ tố (tokens) và lưu thông tin từ tố đó nằm ở những dòng/tài liệu nào, giúp tìm kiếm tức thì.',
    6, 'Introduction to Information Retrieval', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_063', 'mcq', 'full-text-search',
    'Trong PostgreSQL, kiểu dữ liệu nào được sử dụng để lưu trữ văn bản dưới dạng danh sách từ khóa đã được chuẩn hóa và tối ưu cho tìm kiếm Full-Text Search?',
    ARRAY['tsvector', 'tsquery', 'varchar', 'jsonb']::varchar[],
    ARRAY['tsvector']::varchar[],
    'PostgreSQL sử dụng kiểu `tsvector` để lưu danh sách các lexemes (từ đã chuẩn hóa) kèm theo vị trí xuất hiện của chúng trong văn bản gốc.',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_064', 'mcq', 'full-text-search',
    'Toán tử nào được PostgreSQL sử dụng để kiểm tra xem một `tsvector` có khớp với điều kiện tìm kiếm của `tsquery` hay không?',
    ARRAY['@@', '||', '&&', '::']::varchar[],
    ARRAY['@@']::varchar[],
    'Toán tử `@@` là toán tử so khớp mặc định trong PostgreSQL Full-Text Search, ví dụ: `vector @@ query`.',
    5, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_065', 'mcq', 'full-text-search',
    'Kỹ thuật "Stemming" trong tiền xử lý văn bản Full-Text Search có tác dụng gì?',
    ARRAY['Đưa các từ biến thể về dạng từ gốc (ví dụ: "studying", "studies" đều quy về "study")', 'Loại bỏ toàn bộ các nguyên âm trong câu', 'Dịch tự động văn bản sang ngôn ngữ khác', 'Mã hóa ký tự đặc biệt thành thực thể HTML']::varchar[],
    ARRAY['Đưa các từ biến thể về dạng từ gốc (ví dụ: "studying", "studies" đều quy về "study")']::varchar[],
    'Stemming giúp loại bỏ hậu tố từ để giữ lại phần gốc (stem). Nhờ vậy, người dùng tìm kiếm "study" vẫn tìm ra các tài liệu chứa "studying" hay "studies".',
    6, 'Introduction to Information Retrieval', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_066', 'mcq', 'full-text-search',
    'Trong công cụ tìm kiếm Elasticsearch, thuật toán mặc định nào được sử dụng để xếp hạng độ tương đồng và tính điểm liên quan (Relevance Score) của kết quả tìm kiếm?',
    ARRAY['BM25 (hoặc TF-IDF)', 'Dijkstra', 'B-Tree Traversal', 'Hash Match']::varchar[],
    ARRAY['BM25 (hoặc TF-IDF)']::varchar[],
    'BM25 (Okapi BM25) là biến thể nâng cấp của TF-IDF (Term Frequency-Inverse Document Frequency), dùng để xếp hạng độ phù hợp của tài liệu dựa trên tần suất từ khóa.',
    7, 'Elasticsearch Reference', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_067', 'mcq', 'full-text-search',
    'Các từ cực kỳ phổ biến nhưng ít mang giá trị phân loại tìm kiếm (như "and", "the", "a", "của", "và") được gọi là gì trong kỹ thuật FTS?',
    ARRAY['Stop Words (Từ dừng)', 'Keywords (Từ khóa)', 'Synonyms (Từ đồng nghĩa)', 'Lexemes (Từ vị)']::varchar[],
    ARRAY['Stop Words (Từ dừng)']::varchar[],
    'Stop Words là các từ ngữ có tần suất xuất hiện quá cao nhưng không giúp ích cho việc định vị nội dung đặc trưng, nên thường bị loại bỏ khi tạo index FTS để tiết kiệm bộ nhớ.',
    5, 'Introduction to Information Retrieval', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_068', 'mcq', 'full-text-search',
    'Khi nào nhà phát triển nên lựa chọn một công cụ chuyên dụng như Elasticsearch thay vì dùng tính năng FTS tích hợp sẵn của SQL Database?',
    ARRAY['Khi cần tìm kiếm thời gian thực trên lượng dữ liệu khổng lồ, hỗ trợ autocomplete, gợi ý sửa lỗi gõ sai và xếp hạng phức tạp', 'Khi muốn thực hiện các giao dịch ACID khắt khe trên nhiều bảng', 'Khi dự án có quy mô nhỏ để tiết kiệm chi phí vận hành máy chủ', 'Khi muốn lưu trữ dữ liệu dạng cấu trúc hình cây nội bộ']::varchar[],
    ARRAY['Khi cần tìm kiếm thời gian thực trên lượng dữ liệu khổng lồ, hỗ trợ autocomplete, gợi ý sửa lỗi gõ sai và xếp hạng phức tạp']::varchar[],
    'Elasticsearch tối ưu cho tìm kiếm nâng cao, xử lý ngôn ngữ tự nhiên, phân tích log phân tán và tìm kiếm mờ thời gian thực, điều mà CSDL quan hệ khó gánh vác hiệu quả.',
    6, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_069', 'short-answer', 'full-text-search',
    'Trong PostgreSQL FTS, viết tên hàm dùng để chuyển đổi câu truy vấn dạng văn bản thường của người dùng (ví dụ: "database optimization") thành cấu trúc điều kiện `tsquery` ngăn cách bởi toán tử AND.',
    NULL,
    ARRAY['plainto_tsquery', 'plainto_tsquery()']::varchar[],
    'Hàm plainto_tsquery() tự động chuyển đổi chuỗi văn bản thường thành các lexemes nối với nhau bằng toán tử &. Ví dụ: plainto_tsquery(''database optimization'') -> ''databas'' & ''optim''',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_07'
  ),
  (
    'cs_db_q_070', 'short-answer', 'full-text-search',
    'Điền từ viết tắt của thuật toán đo lường tầm quan trọng của một từ đối với một văn bản trong một tập hợp văn bản bằng cách nhân tần suất xuất hiện trong văn bản với nghịch đảo tần suất xuất hiện trong toàn bộ các văn bản (viết hoa).',
    NULL,
    ARRAY['TF-IDF', 'TFIDF']::varchar[],
    'TF-IDF (Term Frequency - Inverse Document Frequency) là thuật toán kinh điển dùng để tính trọng số từ khóa trong tìm kiếm.',
    6, 'Introduction to Information Retrieval', 'cs_database_data', 13, 'cs_db_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Bản sao và Phân mảnh Dữ liệu (cs_db_08) - Chuyên đề: db-architecture (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_071', 'mcq', 'replication-sharding',
    'Trong mô hình Replication Master-Slave (Primary-Replica), hoạt động ghi dữ liệu (INSERT/UPDATE) được định tuyến đến máy chủ nào?',
    ARRAY['Chỉ máy chủ Master', 'Chỉ máy chủ Slave', 'Bất kỳ máy chủ nào ngẫu nhiên', 'Tất cả các máy chủ đồng thời từ phía client']::varchar[],
    ARRAY['Chỉ máy chủ Master']::varchar[],
    'Trong mô hình sao chép một chiều, chỉ Master (Primary) được quyền ghi dữ liệu để đảm bảo tính nhất quán nguồn gốc. Các thay đổi sau đó được đồng bộ xuống các Slave.',
    5, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_072', 'mcq', 'replication-sharding',
    'Điểm hạn chế lớn nhất của cơ chế đồng bộ dữ liệu bất đồng bộ (Asynchronous Replication) trong CSDL là gì?',
    ARRAY['Có nguy cơ mất dữ liệu vừa ghi nếu Master bị hỏng đột ngột trước khi kịp đồng bộ xuống Slave', 'Làm chậm đáng kể tốc độ ghi dữ liệu ở Master', 'Slave không thể phục vụ các truy vấn đọc dữ liệu', 'Client không được phép kết nối trực tiếp đến Slave']::varchar[],
    ARRAY['Có nguy cơ mất dữ liệu vừa ghi nếu Master bị hỏng đột ngột trước khi kịp đồng bộ xuống Slave']::varchar[],
    'Asynchronous Replication giúp Master ghi cực nhanh vì không cần đợi Slave xác nhận. Tuy nhiên, nếu Master sập nguồn đột ngột, các transaction chưa kịp chuyển sang Slave sẽ bị mất vĩnh viễn.',
    6, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_073', 'mcq', 'replication-sharding',
    'Kỹ thuật "Sharding" (Phân mảnh ngang) giải quyết bài toán scale CSDL như thế nào?',
    ARRAY['Phân chia các dòng của bảng dữ liệu vật lý sang các máy chủ độc lập dựa trên một quy tắc (Shard Key)', 'Phân tách các cột của bảng dữ liệu sang các máy chủ khác nhau', 'Tạo ra nhiều bản sao giống hệt nhau trên các server', 'Tự động nén dữ liệu để tiết kiệm ổ cứng']::varchar[],
    ARRAY['Phân chia các dòng của bảng dữ liệu vật lý sang các máy chủ độc lập dựa trên một quy tắc (Shard Key)']::varchar[],
    'Sharding thực hiện phân chia bảng dữ liệu theo chiều ngang (Horizontal Partitioning), mỗi phân mảnh chứa một tập hợp dòng dữ liệu cụ thể chạy trên một server riêng biệt.',
    6, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_074', 'mcq', 'replication-sharding',
    'Hiện tượng "Hotspot Shard" xảy ra khi nào trong hệ thống Sharded Database?',
    ARRAY['Khi Shard Key được lựa chọn không phân bố đều, dẫn đến một mảnh (Shard) phải gánh lượng tải cực lớn trong khi các mảnh khác rảnh rỗi', 'Khi máy chủ database bị quá nhiệt vật lý', 'Khi tất cả các Slave đều được bầu làm Master cùng lúc', 'Khi mạng kết nối giữa các Shard bị ngắt hoàn toàn']::varchar[],
    ARRAY['Khi Shard Key được lựa chọn không phân bố đều, dẫn đến một mảnh (Shard) phải gánh lượng tải cực lớn trong khi các mảnh khác rảnh rỗi']::varchar[],
    'Nếu chọn Shard Key kém (ví dụ: chọn cột `status` chỉ có hai giá trị `Active` và `Inactive`, mà 99% dữ liệu là `Active`), phân mảnh chứa dữ liệu `Active` sẽ bị quá tải, triệt tiêu lợi ích của việc phân mảnh.',
    7, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_075', 'mcq', 'replication-sharding',
    'Trong hệ thống Replication, cơ chế "Read-after-write consistency" nhằm đảm bảo điều gì cho người dùng?',
    ARRAY['Người dùng luôn nhìn thấy dữ liệu do chính mình vừa mới ghi/cập nhật, tránh hiện tượng bất đồng bộ trễ dữ liệu từ Slave', 'Mọi truy vấn đọc đều phải thực thi trước truy vấn ghi', 'Hệ thống tự động hủy các truy vấn đọc nếu ghi thất bại', 'Dữ liệu chỉ được đọc khi đã sao chép đủ 100% các máy chủ phụ']::varchar[],
    ARRAY['Người dùng luôn nhìn thấy dữ liệu do chính mình vừa mới ghi/cập nhật, tránh hiện tượng bất đồng bộ trễ dữ liệu từ Slave']::varchar[],
    'Vì đồng bộ tới Slave có độ trễ (replication lag), nếu người dùng vừa submit comment mà tải lại trang đọc từ Slave ngay, họ có thể không thấy comment của mình. Cơ chế này ép các truy vấn đọc của chính user vừa ghi phải đọc trực tiếp từ Master trong một khoảng thời gian ngắn.',
    7, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_076', 'mcq', 'replication-sharding',
    'Nhược điểm lớn nhất của kiến trúc Sharded Database đối với lập trình viên ứng dụng là gì?',
    ARRAY['Độ phức tạp tăng cao, các phép JOIN liên shard (cross-shard join) rất chậm và giao dịch phân tán khó thực thi', 'Không thể cài đặt PostgreSQL trên các máy chủ phân mảnh', 'CSDL tự động từ chối chạy các câu lệnh SELECT đơn giản', 'Mất khả năng đánh index B-Tree trên khóa chính']::varchar[],
    ARRAY['Độ phức tạp tăng cao, các phép JOIN liên shard (cross-shard join) very chậm và giao dịch phân tán khó thực thi']::varchar[],
    'JOIN dữ liệu nằm ở hai server vật lý khác nhau đòi hỏi kéo dữ liệu qua mạng về ứng dụng xử lý, cực kỳ chậm. Đồng thời, bảo đảm giao dịch ACID trên nhiều server (2-Phase Commit) rất đắt đỏ.',
    7, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_077', 'mcq', 'replication-sharding',
    'Sự khác biệt giữa "Vertical Scaling" (Mở rộng dọc) và "Horizontal Scaling" (Mở rộng ngang) là gì?',
    ARRAY['Mở rộng dọc là nâng cấp phần cứng (CPU, RAM) của máy chủ hiện tại, còn mở rộng ngang là thêm nhiều máy chủ mới vào hệ thống', 'Mở rộng dọc là chuyển từ SQL sang NoSQL', 'Mở rộng ngang là tăng số lượng index trong bảng', 'Không có sự khác biệt về bản chất kiến trúc']::varchar[],
    ARRAY['Mở rộng dọc là nâng cấp phần cứng (CPU, RAM) của máy chủ hiện tại, còn mở rộng ngang là thêm nhiều máy chủ mới vào hệ thống']::varchar[],
    'Vertical Scaling tăng sức mạnh vật lý cho 1 máy (có giới hạn phần cứng và chi phí tăng lũy thừa). Horizontal Scaling phân tải ra nhiều máy rẻ hơn (phù hợp cho các hệ thống quy mô khổng lồ).',
    5, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_078', 'mcq', 'replication-sharding',
    'Cơ chế "Failover" trong hệ thống Replication hoạt động như thế nào?',
    ARRAY['Tự động phát hiện Master bị lỗi và bầu chọn một Slave đủ điều kiện lên thay thế làm Master mới', 'Tự động rollback toàn bộ dữ liệu về trạng thái ban đầu của hệ thống', 'Ngắt kết nối của tất cả người dùng để bảo trì hệ thống', 'Mã hóa lại toàn bộ database khi bị tấn công mạng']::varchar[],
    ARRAY['Tự động phát hiện Master bị lỗi và bầu chọn một Slave đủ điều kiện lên thay thế làm Master mới']::varchar[],
    'Failover là tính năng tự động chuyển đổi dự phòng để đảm bảo tính sẵn sàng cao (High Availability), giảm thiểu downtime khi máy chủ chính gặp sự cố.',
    6, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_079', 'short-answer', 'replication-sharding',
    'Trong hệ thống cơ sở dữ liệu phân mảnh, thuộc tính hoặc cột được sử dụng để quyết định một dòng dữ liệu cụ thể sẽ được định tuyến ghi vào mảnh (shard) vật lý nào được gọi là gì? (Điền 2 từ tiếng Anh viết thường, ví dụ: primary key, shard key, ...) ',
    NULL,
    ARRAY['shard key']::varchar[],
    'Shard Key là trường thông tin định tuyến dữ liệu đến đúng phân mảnh vật lý.',
    5, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  ),
  (
    'cs_db_q_080', 'short-answer', 'replication-sharding',
    'Nếu hệ thống của bạn có tỉ lệ truy cập là 90% truy vấn đọc (SELECT) và 10% truy vấn ghi (INSERT/UPDATE/DELETE). Giải pháp mở rộng quy mô đơn giản và hiệu quả nhất là sử dụng cơ chế nào để chia tải đọc ra nhiều máy chủ? (Điền một từ tiếng Anh viết thường)',
    NULL,
    ARRAY['replication', 'database replication', 'sao chép']::varchar[],
    'Replication (Master-Slave) cho phép hướng 90% lượng đọc (SELECT) vào các Slave Replica, giải tỏa tải cho Master.',
    5, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Bảo mật CSDL, Phân quyền & RLS (cs_db_09) - Chuyên đề: db-design (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_081', 'mcq', 'database-security',
    'Phương thức tấn công nào lợi dụng việc nối chuỗi đầu vào của người dùng trực tiếp vào câu lệnh SQL để thực thi mã độc hại ngoài ý muốn?',
    ARRAY['SQL Injection', 'Cross-Site Scripting (XSS)', 'Man-in-the-middle', 'DDoS']::varchar[],
    ARRAY['SQL Injection']::varchar[],
    'SQL Injection chèn các đoạn mã SQL trái phép vào tham số đầu vào của ứng dụng, khiến trình biên dịch SQL thực thi mã độc hại.',
    5, 'OWASP Top 10', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_082', 'mcq', 'database-security',
    'Tại sao việc sử dụng Parameterized Queries (Prepared Statements) lại có khả năng chống lại tấn công SQL Injection một cách triệt để?',
    ARRAY['Vì nó phân tách hoàn toàn phần cú pháp câu lệnh (compiled template) và dữ liệu tham số đầu vào', 'Vì nó tự động mã hóa toàn bộ cơ sở dữ liệu', 'Vì nó chặn không cho người dùng nhập các ký tự đặc biệt', 'Vì nó chuyển đổi toàn bộ câu lệnh sang NoSQL']::varchar[],
    ARRAY['Vì nó phân tách hoàn toàn phần cú pháp câu lệnh (compiled template) và dữ liệu tham số đầu vào']::varchar[],
    'Trình tối ưu hóa SQL biên dịch trước khung câu lệnh (Prepared Statement). Dữ liệu truyền vào sau đó chỉ được đối xử thuần túy như giá trị (literals) chứ không thể thay đổi cấu trúc cú pháp của câu lệnh SQL.',
    6, 'OWASP Top 10', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_083', 'mcq', 'database-security',
    'Cơ chế Row-Level Security (RLS) trong PostgreSQL hoạt động như thế nào?',
    ARRAY['Cho phép định nghĩa các chính sách bảo mật để tự động lọc bỏ các dòng dữ liệu không thuộc quyền truy cập của người dùng hiện tại', 'Khóa toàn bộ bảng dữ liệu không cho chỉnh sửa', 'Mã hóa từng cột nhạy cảm trong bảng dữ liệu', 'Chỉ cho phép chạy câu lệnh SELECT từ các địa chỉ IP được cấp phép']::varchar[],
    ARRAY['Cho phép định nghĩa các chính sách bảo mật để tự động lọc bỏ các dòng dữ liệu không thuộc quyền truy cập của người dùng hiện tại']::varchar[],
    'RLS tích hợp chính sách lọc bảo mật trực tiếp ở tầng CSDL. Khi chạy SELECT, CSDL tự động chèn thêm điều kiện lọc dòng dựa trên định danh của kết nối đang chạy, bảo mật tuyệt đối dữ liệu multi-tenant.',
    7, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_084', 'mcq', 'database-security',
    'Nguyên lý "Least Privilege" (Quyền hạn tối thiểu) trong bảo mật CSDL khuyên điều gì?',
    ARRAY['Chỉ cấp phát quyền truy cập tối thiểu vừa đủ để một ứng dụng/người dùng thực hiện công việc của họ', 'Cấp quyền Administrator cho tất cả lập trình viên để tăng tốc độ phát triển', 'Không cấp bất kỳ quyền nào và thực hiện thao tác thủ công', 'Chỉ phân quyền ở mức giao diện ứng dụng (Frontend)']::varchar[],
    ARRAY['Chỉ cấp phát quyền truy cập tối thiểu vừa đủ để một ứng dụng/người dùng thực hiện công việc của họ']::varchar[],
    'Nguyên lý Least Privilege giảm thiểu rủi ro bảo mật: nếu thông tin kết nối của một microservice bị lộ, kẻ tấn công chỉ có thể thao tác trên các bảng giới hạn mà service đó được cấp quyền.',
    5, 'OWASP Top 10', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_085', 'mcq', 'database-security',
    'Để băm và lưu trữ mật khẩu người dùng trong cơ sở dữ liệu một cách an toàn nhất, ta nên dùng giải pháp nào?',
    ARRAY['Sử dụng thuật toán băm mạnh kèm muối (Salted Hashing như bcrypt hoặc Argon2)', 'Mã hóa đối xứng bằng thuật toán AES-256', 'Lưu trữ mật khẩu dưới dạng Base64', 'Băm mật khẩu bằng thuật toán MD5 hoặc SHA1']::varchar[],
    ARRAY['Sử dụng thuật toán băm mạnh kèm muối (Salted Hashing như bcrypt hoặc Argon2)']::varchar[],
    'bcrypt/Argon2 là các thuật toán băm chậm được thiết kế chuyên biệt để chống tấn công brute-force và cầu vồng (Rainbow Table). Sử dụng Salt giúp hai mật khẩu giống nhau vẫn sinh ra hai chuỗi băm khác nhau.',
    6, 'OWASP Top 10', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_086', 'mcq', 'database-security',
    'Trong PostgreSQL, từ khóa SQL nào dùng để cấp quyền SELECT hoặc INSERT trên một bảng cụ thể cho một User/Role?',
    ARRAY['GRANT', 'REVOKE', 'ALLOW', 'CREATE POLICY']::varchar[],
    ARRAY['GRANT']::varchar[],
    'Lệnh GRANT được dùng để cấp quyền thao tác trên database object cho database user/role. Ví dụ: GRANT SELECT ON users TO app_reader;',
    5, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_087', 'mcq', 'database-security',
    'Sự khác biệt giữa mã hóa dữ liệu tại chỗ (Encryption at Rest) và mã hóa trên đường truyền (Encryption in Transit) là gì?',
    ARRAY['Encryption at Rest bảo vệ dữ liệu lưu trên ổ cứng vật lý, còn Encryption in Transit bảo vệ dữ liệu khi truyền qua mạng (như SSL/TLS)', 'Encryption at Rest chỉ hoạt động khi tắt database', 'Encryption in Transit chỉ hoạt động đối với CSDL NoSQL', 'Hai khái niệm này hoàn toàn tương đương nhau']::varchar[],
    ARRAY['Encryption at Rest bảo vệ dữ liệu lưu trên ổ cứng vật lý, còn Encryption in Transit bảo vệ dữ liệu khi truyền qua mạng (như SSL/TLS)']::varchar[],
    'Encryption at Rest ngăn chặn kẻ trộm lấy ổ đĩa vật lý để đọc dữ liệu. Encryption in Transit ngăn chặn kẻ tấn công nghe lén (sniffing) dữ liệu trên mạng truyền tải.',
    6, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_088', 'mcq', 'database-security',
    'Khi xây dựng kiến trúc Multi-tenant (nhiều tổ chức dùng chung một database), giải pháp bảo mật RLS giúp giải quyết vấn đề gì?',
    ARRAY['Đảm bảo dữ liệu của tenant này không bị rò rỉ sang tenant khác mà không cần tách riêng database vật lý', 'Tăng gấp đôi tốc độ truy vấn SELECT của các tenant', 'Tự động tạo ra các bản sao backup cho từng tenant', 'Chuyển đổi kiểu dữ liệu của các tenant tự động']::varchar[],
    ARRAY['Đảm bảo dữ liệu của tenant này không bị rò rỉ sang tenant khác mà không cần tách riêng database vật lý']::varchar[],
    'RLS tự động lọc dữ liệu dựa trên tenant_id của phiên làm việc hiện tại, ngăn ngừa lập trình viên viết thiếu điều kiện WHERE làm rò rỉ dữ liệu chéo giữa các khách hàng.',
    7, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_089', 'short-answer', 'database-security',
    'Điền từ tiếng Anh viết tắt của cơ chế kiểm soát quyền truy cập dựa trên vai trò (ví dụ: cấp quyền cho vai trò giáo viên, học sinh, admin) rất phổ biến trong các hệ quản trị cơ sở dữ liệu (viết hoa).',
    NULL,
    ARRAY['RBAC']::varchar[],
    'RBAC (Role-Based Access Control) là cơ chế phân quyền dựa trên vai trò của người dùng.',
    5, 'Database System Concepts', 'cs_database_data', 13, 'cs_db_09'
  ),
  (
    'cs_db_q_090', 'short-answer', 'database-security',
    'Trong PostgreSQL, để kích hoạt tính năng Row-Level Security trên bảng "orders", ta dùng câu lệnh: "ALTER TABLE orders ______ ROW LEVEL SECURITY;". Điền từ khóa tiếng Anh viết hoa còn thiếu vào chỗ trống.',
    NULL,
    ARRAY['ENABLE']::varchar[],
    'Câu lệnh hoàn chỉnh: ALTER TABLE orders ENABLE ROW LEVEL SECURITY;',
    6, 'PostgreSQL Documentation', 'cs_database_data', 13, 'cs_db_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Chiến lược Caching & Tối ưu Hiệu năng (cs_db_10) - Chuyên đề: db-transactions (10 câu)
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_db_q_091', 'mcq', 'database-caching',
    'Chiến lược Caching "Cache-Aside" (Lazy Loading) hoạt động theo quy trình nào sau đây?',
    ARRAY['Ứng dụng tìm dữ liệu trong cache; nếu có (hit) thì trả về; nếu không (miss), ứng dụng đọc từ DB, lưu vào cache rồi trả về', 'Ứng dụng luôn ghi thẳng vào DB trước, sau đó đồng bộ bất đồng bộ lên cache', 'Ứng dụng chỉ đọc dữ liệu từ cache, nếu thiếu thì báo lỗi', 'Dữ liệu được nạp sẵn 100% vào cache khi khởi động ứng dụng']::varchar[],
    ARRAY['Ứng dụng tìm dữ liệu trong cache; nếu có (hit) thì trả về; nếu không (miss), ứng dụng đọc từ DB, lưu vào cache rồi trả về']::varchar[],
    'Cache-Aside là mô hình phổ biến nhất. Ứng dụng chịu trách nhiệm kiểm tra cache và tự động nạp dữ liệu từ DB vào cache khi gặp tình huống Cache Miss.',
    5, 'Caching Strategies', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_092', 'mcq', 'database-caching',
    'Nhược điểm lớn nhất của chiến lược Caching "Write-Back" (Write-Behind) là gì?',
    ARRAY['Có rủi ro mất mát dữ liệu nếu máy chủ Cache bị sập đột ngột trước khi dữ liệu kịp ghi xuống DB', 'Làm giảm tốc độ ghi dữ liệu từ phía ứng dụng khách', 'Gây quá tải ngay lập tức cho database khi cập nhật', 'Không hỗ trợ đọc dữ liệu đã cache']::varchar[],
    ARRAY['Có rủi ro mất mát dữ liệu nếu máy chủ Cache bị sập đột ngột trước khi dữ liệu kịp ghi xuống DB']::varchar[],
    'Write-Back ghi dữ liệu vào cache trước và xác nhận ngay với client, sau đó mới ghi bất đồng bộ xuống DB theo lô. Nếu server cache sập khi chưa kịp đồng bộ xuống DB, dữ liệu đó sẽ bị mất.',
    7, 'Caching Strategies', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_093', 'mcq', 'database-caching',
    'Hiện tượng "Cache Stampede" (hoặc Thundering Herd) xảy ra khi nào?',
    ARRAY['Khi một key cache cực kỳ hot hết hạn (TTL = 0), dẫn đến hàng ngàn request đồng thời đổ dồn vào query database cùng một lúc', 'Khi bộ nhớ RAM của Redis bị tràn và từ chối ghi dữ liệu', 'Khi mạng kết nối giữa cache và database bị nghẽn hoàn toàn', 'Khi dữ liệu trong cache bị mã hóa sai định dạng']::varchar[],
    ARRAY['Khi một key cache cực kỳ hot hết hạn (TTL = 0), dẫn đến hàng ngàn request đồng thời đổ dồn vào query database cùng một lúc']::varchar[],
    'Cache Stampede xảy ra khi cache của dữ liệu hot hết hạn. Do chưa kịp ghi lại cache mới, tất cả các luồng truy cập đồng thời đều thấy cache trống và cùng gửi query nặng tới DB, gây sập DB.',
    7, 'Database Tuning', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_094', 'mcq', 'database-caching',
    'Thuật toán thu hồi cache "LRU" (Least Recently Used) hoạt động theo nguyên lý nào để giải phóng bộ nhớ khi cache đầy?',
    ARRAY['Xóa bỏ các khóa (keys) đã lâu nhất không được truy cập đọc hoặc ghi', 'Xóa bỏ các khóa được tạo ra đầu tiên (FIFO)', 'Xóa bỏ các khóa ngẫu nhiên trong hệ thống', 'Xóa các khóa có dung lượng lưu trữ lớn nhất']::varchar[],
    ARRAY['Xóa bỏ các khóa (keys) đã lâu nhất không được truy cập đọc hoặc ghi']::varchar[],
    'LRU theo dõi thời gian truy cập gần nhất của các phần tử và tự động trục xuất phần tử ít được sử dụng nhất trong thời gian qua để nhường chỗ cho dữ liệu mới.',
    5, 'Redis Documentation', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_095', 'mcq', 'database-caching',
    'Tại sao việc thiết lập thời gian sống (TTL - Time to Live) cho dữ liệu trong cache là cực kỳ quan trọng?',
    ARRAY['Để đảm bảo dữ liệu trong cache tự động hết hạn, giúp giải phóng RAM và tránh hiện tượng hiển thị dữ liệu quá cũ (stale data) vĩnh viễn', 'Để CSDL quan hệ tự động sao lưu dữ liệu sang Redis', 'Để ngăn ngừa hoàn toàn các cuộc tấn công SQL Injection', 'Để mã hóa dữ liệu trong bộ nhớ RAM']::varchar[],
    ARRAY['Để đảm bảo dữ liệu trong cache tự động hết hạn, giúp giải phóng RAM và tránh hiện tượng hiển thị dữ liệu quá cũ (stale data) vĩnh viễn']::varchar[],
    'Nếu không cài TTL, dữ liệu sẽ nằm trong cache mãi mãi kể cả khi DB gốc đã thay đổi, dẫn đến dữ liệu hiển thị bị sai lệch nghiêm trọng so với thực tế.',
    5, 'Caching Strategies', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_096', 'mcq', 'database-caching',
    'Trong hệ thống Caching, khái niệm "Cache Penetration" nói về hiện tượng gì?',
    ARRAY['Ứng dụng liên tục yêu cầu các khóa không hề tồn tại trong cả cache lẫn database, khiến mọi request đều đi thẳng xuống DB', 'Dữ liệu cache bị rò rỉ ra các file log hệ thống', 'Kẻ tấn công truy cập trực tiếp vào RAM của máy chủ Redis', 'Tốc độ đọc của cache bị giảm xuống ngang bằng tốc độ đọc của đĩa cứng']::varchar[],
    ARRAY['Ứng dụng liên tục yêu cầu các khóa không hề tồn tại trong cả cache lẫn database, khiến mọi request đều đi thẳng xuống DB']::varchar[],
    'Cache Penetration xảy ra khi truy vấn dữ liệu rác (ví dụ id = -999). Vì không tồn tại nên cache miss, và hệ thống phải query DB liên tục. Giải pháp là cache luôn cả giá trị rỗng (null/empty) với TTL ngắn hoặc dùng Bloom Filter.',
    7, 'Database Tuning', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_097', 'mcq', 'database-caching',
    'Cơ chế "Cache Invalidation" (Thu hồi/Xóa cache) chủ động nên được ứng dụng thực hiện khi nào?',
    ARRAY['Ngay khi dữ liệu tương ứng trong cơ sở dữ liệu quan hệ bị thay đổi (UPDATE hoặc DELETE)', 'Chỉ khi máy chủ Redis bị đầy bộ nhớ', 'Vào lúc nửa đêm khi lượng truy cập của trang web thấp nhất', 'Khi người dùng đăng xuất khỏi hệ thống']::varchar[],
    ARRAY['Ngay khi dữ liệu tương ứng trong cơ sở dữ liệu quan hệ bị thay đổi (UPDATE hoặc DELETE)']::varchar[],
    'Để đảm bảo tính nhất quán cao nhất, ứng dụng nên chủ động xóa key cache cũ ngay khi ghi đè dữ liệu mới vào DB, tránh việc client đọc phải dữ liệu stale.',
    6, 'Caching Strategies', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_098', 'mcq', 'database-caching',
    'Tại sao không nên sử dụng Redis làm cơ sở dữ liệu lưu trữ vĩnh viễn duy nhất cho các thông tin giao dịch tài chính nhạy cảm?',
    ARRAY['Vì Redis lưu dữ liệu mặc định trên RAM và cơ chế lưu đĩa (AOF/RDB) bất đồng bộ có thể làm mất dữ liệu khi sập nguồn đột ngột', 'Vì Redis không hỗ trợ lưu trữ kiểu dữ liệu số thực', 'Vì Redis chỉ chạy được trên hệ điều hành Windows', 'Vì Redis tự động xóa toàn bộ dữ liệu sau mỗi 24 giờ']::varchar[],
    ARRAY['Vì Redis lưu dữ liệu mặc định trên RAM và cơ chế lưu đĩa (AOF/RDB) bất đồng bộ có thể làm mất dữ liệu khi sập nguồn đột ngột']::varchar[],
    'Mặc dù Redis hỗ trợ bền vững hóa dữ liệu (persistence) xuống ổ đĩa, nhưng nó được tối ưu cho tốc độ RAM nên không đảm bảo an toàn tuyệt đối chống mất mát dữ liệu như Transaction Log (WAL) của CSDL quan hệ.',
    6, 'Designing Data-Intensive Applications', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_099', 'short-answer', 'database-caching',
    'Điền từ tiếng Anh viết tắt của cơ chế thời gian sống của một khóa trong cache (ví dụ: đặt khóa này hết hạn sau 60 giây).',
    NULL,
    ARRAY['TTL']::varchar[],
    'TTL (Time to Live) quy định thời gian tồn tại của dữ liệu trong bộ nhớ cache.',
    5, 'Caching Strategies', 'cs_database_data', 13, 'cs_db_10'
  ),
  (
    'cs_db_q_100', 'short-answer', 'database-caching',
    'Trong các chiến lược trục xuất dữ liệu cache khi bộ nhớ bị đầy, điền tên viết tắt của thuật toán loại bỏ phần tử ít được sử dụng nhất dựa trên TẦN SUẤT truy cập (Least Frequently Used) (viết hoa).',
    NULL,
    ARRAY['LFU']::varchar[],
    'LFU (Least Frequently Used) loại bỏ các khóa có số lần truy cập ít nhất để giải phóng RAM cho dữ liệu mới.',
    6, 'Redis Documentation', 'cs_database_data', 13, 'cs_db_10'
  );

COMMIT;
