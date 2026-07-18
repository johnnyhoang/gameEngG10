-- SQL migration to seed 100 question bank for cs_artificial_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_artificial_intelligence (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_artificial_intelligence';

-- ======================================================================================
-- BÀI GIẢNG 1: Tìm kiếm mù và tìm kiếm heuristics (cs_ai_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_001', 'mcq', 'search-heuristics',
    'Trong các thuật toán tìm kiếm mù, giải thuật nào đảm bảo luôn tìm thấy đường đi ngắn nhất (tối ưu) đến đích nếu tất cả các cạnh có trọng số bằng nhau?',
    ARRAY['BFS (Breadth-First Search)', 'DFS (Depth-First Search)', 'Greedy Best-First Search', 'A* Search'],
    ARRAY['BFS (Breadth-First Search)']::varchar[],
    'BFS duyệt tuần tự theo từng mức độ sâu, đảm bảo nút đích đầu tiên tìm thấy nằm ở mức sâu thấp nhất, tức đường đi ngắn nhất.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_002', 'mcq', 'search-heuristics',
    'Đặc tính nổi bật nhất về không gian lưu trữ bộ nhớ của DFS so với BFS là gì?',
    ARRAY['Độ phức tạp bộ nhớ của DFS thấp hơn nhiều, chỉ tăng tuyến tính theo chiều sâu tối đa O(bm)', 'DFS tốn nhiều RAM hơn BFS', 'Cả hai đều có độ phức tạp bộ nhớ giống nhau', 'DFS lưu trữ toàn bộ cây tìm kiếm trong RAM'],
    ARRAY['Độ phức tạp bộ nhớ của DFS thấp hơn nhiều, chỉ tăng tuyến tính theo chiều sâu tối đa O(bm)']::varchar[],
    'DFS chỉ cần lưu trữ đường đi hiện tại từ gốc đến lá cùng các nút lân cận chưa duyệt, trong khi BFS phải lưu toàn bộ biên (frontier) khổng lồ ở mức sâu hiện tại.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_003', 'mcq', 'search-heuristics',
    'Giải thuật tìm kiếm A* đánh giá mỗi nút n trong quá trình duyệt cây bằng hàm f(n) nào?',
    ARRAY['f(n) = g(n) + h(n)', 'f(n) = g(n) - h(n)', 'f(n) = g(n) * h(n)', 'f(n) = h(n)'],
    ARRAY['f(n) = g(n) + h(n)']::varchar[],
    'Trong A*, $g(n)$ là chi phí thực tế từ điểm bắt đầu đến $n$, và $h(n)$ là chi phí ước lượng tối ưu từ $n$ đến đích.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_004', 'mcq', 'search-heuristics',
    'Thế nào là một hàm Heuristic h(n) "chấp nhận được" (admissible)?',
    ARRAY['Hàm heuristic không bao giờ đánh giá chi phí cao hơn chi phí thực tế tối thiểu để đến đích', 'Hàm heuristic luôn trả về số nguyên dương', 'Hàm heuristic luôn tìm ra đường đi ngắn nhất', 'Hàm heuristic luôn nhỏ hơn hoặc bằng 0'],
    ARRAY['Hàm heuristic không bao giờ đánh giá chi phí cao hơn chi phí thực tế tối thiểu để đến đích']::varchar[],
    'Heuristic chấp nhận được luôn ước lượng lạc quan (underestimate) chi phí thực tế, bảo đảm không bỏ qua đường đi tối ưu.',
    6, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_005', 'mcq', 'search-heuristics',
    'Tính "nhất quán" (consistency/monotonicity) của một hàm Heuristic h(n) đòi hỏi điều gì?',
    ARRAY['Ước lượng h(n) của nút hiện tại luôn nhỏ hơn hoặc bằng chi phí chuyển trạng thái cộng ước lượng h(n'') của nút kề tiếp theo', 'Heuristic phải bằng 0 tại mọi nút', 'Heuristic tăng đều đặn qua mỗi giây', 'Heuristic có giá trị không đổi dọc theo mọi đường đi'],
    ARRAY['Ước lượng h(n) của nút hiện tại luôn nhỏ hơn hoặc bằng chi phí chuyển trạng thái cộng ước lượng h(n'') của nút kề tiếp theo']::varchar[],
    'Tính nhất quán bảo đảm $f(n)$ tăng đơn điệu dọc theo mọi đường đi, giúp A* tìm thấy đích tối ưu ngay lần đầu tiên mở rộng nút.',
    6, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_006', 'mcq', 'search-heuristics',
    'Điều gì xảy ra nếu ta sử dụng hàm heuristic h(n) = 0 cho mọi nút trong giải thuật A*?',
    ARRAY['Giải thuật A* suy biến thành thuật toán tìm kiếm chi phí đồng nhất (Dijkstra)', 'Giải thuật A* không thể chạy được', 'Giải thuật A* tìm đường đi nhanh gấp đôi', 'Giải thuật A* suy biến thành DFS'],
    ARRAY['Giải thuật A* suy biến thành thuật toán tìm kiếm chi phí đồng nhất (Dijkstra)']::varchar[],
    'Khi $h(n) = 0$, ta có $f(n) = g(n)$, A* chỉ chọn nút dựa trên chi phí thực tế tích lũy, tương đương Dijkstra.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_007', 'mcq', 'search-heuristics',
    'Heuristic nào sau đây là chấp nhận được cho bài toán tìm đường đi ngắn nhất giữa hai thành phố trên bản đồ thực tế?',
    ARRAY['Khoảng cách đường chim bay giữa hai thành phố', 'Khoảng cách đi bộ thực tế', 'Đường đi dài nhất trên bản đồ', 'Thời gian di chuyển ước lượng bằng phút'],
    ARRAY['Khoảng cách đường chim bay giữa hai thành phố']::varchar[],
    'Khoảng cách đường chim bay là đường thẳng ngắn nhất vật lý, chắc chắn không bao giờ lớn hơn khoảng cách di chuyển thực tế trên đường bộ quanh co.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_008', 'mcq', 'search-heuristics',
    'Đặc điểm của tìm kiếm Greedy Best-First Search là gì?',
    ARRAY['Chỉ đánh giá nút bằng f(n) = h(n), chạy rất nhanh nhưng không bảo đảm tính tối ưu', 'Luôn tìm ra đường đi ngắn nhất', 'Độ phức tạp bộ nhớ luôn bằng 0', 'Hoàn toàn giống giải thuật Dijkstra'],
    ARRAY['Chỉ đánh giá nút bằng f(n) = h(n), chạy rất nhanh nhưng không bảo đảm tính tối ưu']::varchar[],
    'Greedy Best-First Search chỉ cố gắng đi về phía có vẻ gần đích nhất tại mỗi bước mà không quan tâm chi phí đã đi qua, dễ đi vào ngõ cụt.',
    6, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_009', 'short-answer', 'search-heuristics',
    'Điền tên viết tắt của giải thuật tìm kiếm theo chiều sâu. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DFS']::varchar[],
    'DFS là Depth-First Search.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  ),
  (
    'cs_ai_q_010', 'short-answer', 'search-heuristics',
    'Điền tên giải thuật tìm kiếm tối ưu sử dụng tổ hợp chi phí thực tế và hàm heuristic g(n) + h(n). (Viết hoa chữ đầu kèm dấu hoa thị)',
    NULL,
    ARRAY['A*']::varchar[],
    'Giải thuật A* là thuật toán tìm kiếm heuristics tối ưu phổ biến nhất.',
    5, 'Search Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Tìm kiếm đối kháng (cs_ai_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_011', 'mcq', 'search-heuristics',
    'Trong cây trò chơi đối kháng Minimax, người chơi MAX thực hiện hành động nào?',
    ARRAY['Chọn nước đi có giá trị lớn nhất từ các nút con để tối đa hóa cơ hội thắng', 'Chọn nước đi có giá trị nhỏ nhất', 'Chọn nước đi ngẫu nhiên', 'Chặn nước đi của đối thủ'],
    ARRAY['Chọn nước đi có giá trị lớn nhất từ các nút con để tối đa hóa cơ hội thắng']::varchar[],
    'MAX cố gắng đạt điểm cao nhất, trong khi đối thủ MIN cố gắng giảm thiểu điểm số của MAX.',
    5, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_012', 'mcq', 'search-heuristics',
    'Vai trò của hai tham số Alpha và Beta trong cắt tỉa Alpha-Beta là gì?',
    ARRAY['Alpha là giá trị tốt nhất MAX bảo đảm đạt được; Beta là giá trị tốt nhất MIN bảo đảm đạt được', 'Alpha là số nút đã duyệt; Beta là độ sâu tối đa', 'Alpha là điểm số của người chơi; Beta là thời gian đi', 'Alpha là hệ số nhánh; Beta là số lượng quân cờ'],
    ARRAY['Alpha là giá trị tốt nhất MAX bảo đảm đạt được; Beta là giá trị tốt nhất MIN bảo đảm đạt được']::varchar[],
    'Alpha (khởi đầu $-\infty$) lưu điểm sàn của MAX; Beta (khởi đầu $+\infty$) lưu điểm trần của MIN.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_013', 'mcq', 'search-heuristics',
    'Điều kiện để thực hiện cắt tỉa (dừng duyệt nhánh con còn lại) trong giải thuật Alpha-Beta là gì?',
    ARRAY['Alpha >= Beta', 'Alpha < Beta', 'Alpha == 0', 'Beta == 0'],
    ARRAY['Alpha >= Beta']::varchar[],
    'Khi $\alpha \ge \beta$, đối thủ ở trên chắc chắn sẽ chọn một đường đi khác tốt hơn nhánh này, nên ta không cần duyệt tiếp nữa.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_014', 'mcq', 'search-heuristics',
    'Cắt tỉa Alpha-Beta ảnh hưởng như thế nào đến kết quả nước đi tối ưu so với Minimax thuần túy?',
    ARRAY['Không làm thay đổi nước đi tối ưu, chỉ giảm số lượng nút cần duyệt giúp thuật toán chạy nhanh hơn', 'Có thể làm nước đi kém tối ưu hơn', 'Làm thay đổi hoàn toàn kết quả nước đi', 'Chỉ đúng với các trò chơi đơn giản'],
    ARRAY['Không làm thay đổi nước đi tối ưu, chỉ giảm số lượng nút cần duyệt giúp thuật toán chạy nhanh hơn']::varchar[],
    'Cắt tỉa chỉ loại bỏ các nhánh chắc chắn không được chọn bởi cả hai bên, nên kết quả cuối cùng hoàn toàn giữ nguyên.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_015', 'mcq', 'search-heuristics',
    'Độ phức tạp thời gian tốt nhất của cắt tỉa Alpha-Beta đạt được khi nào (khi duyệt các nước đi tốt nhất trước)?',
    ARRAY['O(b^(d/2))', 'O(b^d)', 'O(d^b)', 'O(b * d)'],
    ARRAY['O(b^(d/2))']::varchar[],
    'Trong trường hợp lý tưởng, cắt tỉa tối đa cho phép duyệt sâu gấp đôi với cùng lượng tài nguyên tính toán.',
    7, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_016', 'mcq', 'search-heuristics',
    'Tại sao trong các trò chơi phức tạp như Cờ vua, người ta không thể chạy thuật toán Minimax đến tận các nút lá?',
    ARRAY['Vì hệ số nhánh b và độ sâu d quá lớn làm số lượng trạng thái b^d bùng nổ vượt quá khả năng tính toán vật lý', 'Vì cờ vua không có nút lá kết thúc', 'Vì cờ vua có yếu tố ngẫu nhiên tung xúc sắc', 'Vì luật cờ vua cấm sử dụng máy tính'],
    ARRAY['Vì hệ số nhánh b và độ sâu d quá lớn làm số lượng trạng thái b^d bùng nổ vượt quá khả năng tính toán vật lý']::varchar[],
    'Cờ vua có số lượng trạng thái ước tính khoảng $10^{120}$ (số Shannon), vượt xa số nguyên tử trong vũ trụ.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_017', 'mcq', 'search-heuristics',
    'Để giải quyết việc không thể duyệt cây trò chơi đến tận cùng, AI cờ vua áp dụng phương pháp nào?',
    ARRAY['Giới hạn độ sâu duyệt và sử dụng hàm lượng giá trạng thái (Evaluation function) để ước lượng điểm tại độ sâu đó', 'Chuyển sang đi ngẫu nhiên', 'Sử dụng bảng băm DNS', 'Bắt buộc đối thủ phải đi theo ý mình'],
    ARRAY['Giới hạn độ sâu duyệt và sử dụng hàm lượng giá trạng thái (Evaluation function) để ước lượng điểm tại độ sâu đó']::varchar[],
    'Hàm lượng giá tính toán sức mạnh tương quan dựa trên số lượng quân cờ, vị trí kiểm soát trung tâm để trả về điểm số.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_018', 'mcq', 'search-heuristics',
    'Trò chơi nào sau đây có yếu tố ngẫu nhiên (chúc phúc/may rủi) đòi hỏi giải thuật Expectiminimax thay vì Minimax thông thường?',
    ARRAY['Cờ cá ngựa (hoặc Backgammon)', 'Cờ vua', 'Cờ caro', 'Tic-Tac-Toe'],
    ARRAY['Cờ cá ngựa (hoặc Backgammon)']::varchar[],
    'Các trò chơi tung xúc sắc hoặc chia bài có các nút cơ hội (Chance nodes) tính toán giá trị kỳ vọng trung bình xác suất.',
    6, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_019', 'short-answer', 'search-heuristics',
    'Điền tên tham số biểu thị giá trị tốt nhất mà người chơi MIN bảo đảm đạt được trong cắt tỉa. (Viết thường)',
    NULL,
    ARRAY['beta']::varchar[],
    'Beta lưu điểm trần của người chơi MIN.',
    5, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  ),
  (
    'cs_ai_q_020', 'short-answer', 'search-heuristics',
    'Điền tên thuật toán tìm kiếm đối kháng nền tảng trong game hai người chơi. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Minimax']::varchar[],
    'Minimax tính toán nước đi tối ưu bằng đệ quy cây trò chơi.',
    5, 'Adversarial Search', 'cs_artificial_intelligence', 13, 'cs_ai_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Logic mệnh đề & Logic vị từ bậc nhất (cs_ai_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_021', 'mcq', 'knowledge-logic',
    'Biểu thức logic mệnh đề `P -> Q` có giá trị FALSE duy nhất khi nào?',
    ARRAY['P đúng và Q sai', 'P sai và Q đúng', 'Cả hai cùng sai', 'Cả hai cùng đúng'],
    ARRAY['P đúng và Q sai']::varchar[],
    'Phép kéo theo $P \rightarrow Q$ chỉ sai khi tiền đề $P$ đúng nhưng kết luận $Q$ lại sai.',
    5, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_022', 'mcq', 'knowledge-logic',
    'Điểm vượt trội cốt lõi của Logic vị từ bậc nhất (FOL) so với Logic mệnh đề là gì?',
    ARRAY['FOL hỗ trợ biểu diễn các đối tượng, quan hệ và các lượng từ toán học tổng quát', 'FOL chạy nhanh hơn logic mệnh đề', 'FOL luôn luôn decidable', 'FOL không dùng biến số'],
    ARRAY['FOL hỗ trợ biểu diễn các đối tượng, quan hệ và các lượng từ toán học tổng quát']::varchar[],
    'FOL đưa vào các lượng từ $\forall, \exists$ để phát biểu các quy luật chung cho toàn bộ tập hợp đối tượng.',
    6, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_023', 'mcq', 'knowledge-logic',
    'Ký hiệu `\\forall` đại diện cho lượng từ nào trong logic vị từ?',
    ARRAY['Lượng từ với mọi (Universal Quantifier)', 'Lượng từ tồn tại (Existential Quantifier)', 'Phép tuyển logic', 'Toán tử kéo theo'],
    ARRAY['Lượng từ với mọi (Universal Quantifier)']::varchar[],
    '$\forall x$ phát biểu tính chất đúng cho toàn bộ đối tượng $x$ trong miền xác định.',
    5, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_024', 'mcq', 'knowledge-logic',
    'Ký hiệu `\\exists` đại diện cho lượng từ nào trong logic vị từ bậc nhất?',
    ARRAY['Lượng từ tồn tại (Existential Quantifier)', 'Lượng từ với mọi', 'Phép hội logic', 'Toán tử tương đương'],
    ARRAY['Lượng từ tồn tại (Existential Quantifier)']::varchar[],
    '$\exists x$ phát biểu có ít nhất một đối tượng $x$ thỏa mãn tính chất.',
    5, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_025', 'mcq', 'knowledge-logic',
    'Tại sao ta cần thực hiện quá trình "Skolem hóa" (Skolemization) trên các câu logic vị từ?',
    ARRAY['Để loại bỏ các lượng từ tồn tại và đưa câu về dạng chuẩn hội CNF phục vụ suy diễn tự động', 'Để chuyển câu sang dạng phủ định', 'Để mã hóa câu chống nghe lén', 'Để tăng tốc độ chạy của CPU'],
    ARRAY['Để loại bỏ các lượng từ tồn tại và đưa câu về dạng chuẩn hội CNF phục vụ suy diễn tự động']::varchar[],
    'Skolem hóa thay thế các biến tồn tại bằng hằng số hoặc hàm Skolem của các biến với mọi bao ngoài.',
    6, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_026', 'mcq', 'knowledge-logic',
    'Biểu diễn FOL cho câu: "Có một học sinh đạt điểm 10" sử dụng lượng từ và toán tử nào hợp lý?',
    ARRAY['\\(\\exists x \\text{HocSinh}(x) \\land \\text{Diem10}(x)\\)', '\\(\\forall x \\text{HocSinh}(x) \\rightarrow \\text{Diem10}(x)\\)', '\\(\\exists x \\text{HocSinh}(x) \\rightarrow \\text{Diem10}(x)\\)', '\\(\\forall x \\text{HocSinh}(x) \\land \\text{Diem10}(x)\\)'],
    ARRAY['\\(\\exists x \\text{HocSinh}(x) \\land \\text{Diem10}(x)\\)']::varchar[],
    'Lượng từ tồn tại $\exists$ đi kèm toán tử hội $\land$ để khẳng định sự tồn tại đồng thời của đối tượng và tính chất.',
    6, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_027', 'mcq', 'knowledge-logic',
    'Biểu diễn FOL cho câu: "Tất cả mọi người đều có ngày sinh" sử dụng cấu trúc nào?',
    ARRAY['\\(\\forall x \\text{Nguoi}(x) \\rightarrow \\exists y \\text{NgaySinh}(y, x)\\)', '\\(\\exists x \\text{Nguoi}(x) \\land \\forall y \\text{NgaySinh}(y, x)\\)', '\\(\\forall x \\forall y \\text{Nguoi}(x) \\land \\text{NgaySinh}(y, x)\\)', '\\(\\exists x \\text{Nguoi}(x) \\rightarrow \\exists y \\text{NgaySinh}(y, x)\\)'],
    ARRAY['\\(\\forall x \\text{Nguoi}(x) \\rightarrow \\exists y \\text{NgaySinh}(y, x)\\)']::varchar[],
    'Với mọi $x$, nếu $x$ là người thì kéo theo tồn tại một ngày sinh $y$ của $x$.',
    7, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_028', 'mcq', 'knowledge-logic',
    'Khái niệm "Semi-decidable" (Bán quyết định được) của logic vị từ bậc nhất (FOL) phát biểu điều gì?',
    ARRAY['Nếu một câu logic là hệ quả logic của cơ sở tri thức, thuật toán chắc chắn chứng minh được; ngược lại nếu không phải, thuật toán có thể chạy vô hạn không dừng', 'Không bao giờ chứng minh được câu logic', 'Luôn kiểm tra được tính đúng sai trong thời gian hữu hạn', 'Hệ thống tự động đưa ra kết quả ngẫu nhiên'],
    ARRAY['Nếu một câu logic là hệ quả logic của cơ sở tri thức, thuật toán chắc chắn chứng minh được; ngược lại nếu không phải, thuật toán có thể chạy vô hạn không dừng']::varchar[],
    'Đây là tính chất giới hạn toán học của FOL (được chứng minh bởi Gödel và Turing).',
    7, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_029', 'short-answer', 'knowledge-logic',
    'Điền tên tiếng Anh viết tắt của dạng chuẩn hội logic mệnh đề/vị từ (Clause Normal Form / Conjunctive Normal Form). (Viết hoa toàn bộ)',
    NULL,
    ARRAY['CNF']::varchar[],
    'CNF là Conjunctive Normal Form.',
    5, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  ),
  (
    'cs_ai_q_030', 'short-answer', 'knowledge-logic',
    'Điền tên tiếng Việt của lượng từ biểu thị bằng ký hiệu `\\forall`. (Viết thường)',
    NULL,
    ARRAY['với mọi', 'lượng từ với mọi']::varchar[],
    '\\forall là lượng từ với mọi.',
    5, 'Mathematical Logic', 'cs_artificial_intelligence', 13, 'cs_ai_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Hệ chuyên gia & Suy diễn logic (cs_ai_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_031', 'mcq', 'knowledge-logic',
    'Trong hệ chuyên gia (Expert Systems), phần "Cơ sở tri thức" (Knowledge Base) chứa thông tin gì?',
    ARRAY['Tri thức chuyên ngành được mô hình hóa dưới dạng các luật IF-THEN', 'Dữ liệu thô thu thập từ cảm biến', 'Lịch sử chạy của CPU', 'Các thuật toán sắp xếp mảng'],
    ARRAY['Tri thức chuyên ngành được mô hình hóa dưới dạng các luật IF-THEN']::varchar[],
    'Cơ sở tri thức lưu trữ các luật sản xuất (Rules) do chuyên gia con người cung cấp.',
    5, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_032', 'mcq', 'knowledge-logic',
    'Cơ chế "Suy diễn tiến" (Forward Chaining) hoạt động theo nguyên lý nào?',
    ARRAY['Xuất phát từ các sự kiện đã biết (Facts), áp dụng các luật để rút ra sự kiện mới cho đến khi đạt đích (Data-driven)', 'Xuất phát từ mục tiêu cần chứng minh, tìm ngược lại các tiền đề (Goal-driven)', 'Thực hiện phép phân giải ngẫu nhiên', 'Chỉ chạy đệ quy lùi'],
    ARRAY['Xuất phát từ các sự kiện đã biết (Facts), áp dụng các luật để rút ra sự kiện mới cho đến khi đạt đích (Data-driven)']::varchar[],
    'Suy diễn tiến bắt đầu với dữ liệu thô ban đầu và suy luận xuôi để tìm kết luận mới.',
    6, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_033', 'mcq', 'knowledge-logic',
    'Cơ chế "Suy diễn lùi" (Backward Chaining) hoạt động theo nguyên lý nào?',
    ARRAY['Xuất phát từ mục tiêu cần chứng minh, tìm ngược lại các luật có kết luận khớp để đặt ra các mục tiêu phụ mới (Goal-driven)', 'Duyệt tuần tự các luật từ đầu đến cuối', 'Tự động sinh ra luật ngẫu nhiên', 'Lấy dữ liệu thô và suy diễn tiến'],
    ARRAY['Xuất phát từ mục tiêu cần chứng minh, tìm ngược lại các luật có kết luận khớp để đặt ra các mục tiêu phụ mới (Goal-driven)']::varchar[],
    'Suy diễn lùi đi ngược từ đích về giả thuyết ban đầu, phù hợp cho bài toán chẩn đoán lỗi.',
    6, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_034', 'mcq', 'knowledge-logic',
    'Quy tắc phân giải (Resolution Rule) phát biểu rằng từ hai mệnh đề tuyển `(P V Q)` và `(~P V R)` ta suy ra được điều gì?',
    ARRAY['Q V R', 'P V R', 'Q A R', 'Rỗng (Mâu thuẫn)'],
    ARRAY['Q V R']::varchar[],
    'Phép phân giải triệt tiêu vị từ đối lập $P$ và $\neg P$ để tạo câu tuyển mới $Q \lor R$.',
    6, 'Theorem Proving', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_035', 'mcq', 'knowledge-logic',
    'Để chứng minh câu A đúng bằng phương pháp "Phản chứng" (Refutation) sử dụng phép phân giải, ta làm thế nào?',
    ARRAY['Thêm phủ định của A (~A) vào cơ sở tri thức rồi chứng minh hệ thống xảy ra mâu thuẫn (thu được mệnh đề rỗng)', 'Chứng minh A luôn đúng với mọi bảng chân trị', 'Chạy suy diễn tiến cho đến khi gặp A', 'Chuyển đổi toàn bộ câu sang dạng FOL'],
    ARRAY['Thêm phủ định của A (~A) vào cơ sở tri thức rồi chứng minh hệ thống xảy ra mâu thuẫn (thu được mệnh đề rỗng)']::varchar[],
    'Phép phân giải phản chứng chứng minh $\text{KB} \land \neg A \vdash \square$ (mâu thuẫn), suy ra KB kéo theo A.',
    7, 'Theorem Proving', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_036', 'mcq', 'knowledge-logic',
    'Vai trò của phép "Hợp nhất" (Unification) trong suy diễn logic vị từ bậc nhất là gì?',
    ARRAY['Tìm phép thế biến đồng nhất để làm cho hai vị từ khác nhau về tham số trở nên hoàn toàn giống nhau để phân giải', 'Gom các câu logic mệnh đề lại thành một câu duy nhất', 'Loại bỏ lượng từ với mọi', 'Đổi tên các biến số trùng nhau'],
    ARRAY['Tìm phép thế biến đồng nhất để làm cho hai vị từ khác nhau về tham số trở nên hoàn toàn giống nhau để phân giải']::varchar[],
    'Ví dụ hợp nhất `Yeu(x, cha(x))` và `Yeu(John, y)` bằng phép thế $\{x/\text{John}, y/\text{cha}(\text{John})\}$.',
    7, 'Theorem Proving', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_037', 'mcq', 'knowledge-logic',
    'Mô hình suy diễn nào phù hợp nhất cho bài toán chẩn đoán hỏng hóc máy tính khi người dùng nhập vào lỗi màn hình xanh?',
    ARRAY['Suy diễn lùi (Backward Chaining)', 'Suy diễn tiến (Forward Chaining)', 'Thuật toán A*', 'Học không giám sát'],
    ARRAY['Suy diễn lùi (Backward Chaining)']::varchar[],
    'Hệ thống đi ngược từ triệu chứng mục tiêu (màn hình xanh) để truy tìm các nguyên nhân gốc rễ bên dưới.',
    6, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_038', 'mcq', 'knowledge-logic',
    'Mục tiêu của việc tách biệt "Động cơ suy diễn" và "Cơ sở tri thức" trong hệ chuyên gia là gì?',
    ARRAY['Để có thể cập nhật, sửa đổi tri thức dễ dàng mà không cần lập trình lại thuật toán suy diễn cốt lõi', 'Để hệ thống chạy nhanh hơn', 'Để tiết kiệm RAM', 'Vì luật pháp bắt buộc'],
    ARRAY['Để có thể cập nhật, sửa đổi tri thức dễ dàng mà không cần lập trình lại thuật toán suy diễn cốt lõi']::varchar[],
    'Tính mô-đun hóa giúp hệ chuyên gia dễ bảo trì, cập nhật luật mới chỉ cần cập nhật database tri thức.',
    6, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_039', 'short-answer', 'knowledge-logic',
    'Điền tên quy tắc suy diễn nền tảng trong chứng minh định lý tự động triệt tiêu các cặp vị từ đối lập. (Viết thường hoặc Tiếng Anh)',
    NULL,
    ARRAY['phép phân giải', 'resolution']::varchar[],
    'Resolution là phép toán suy diễn cực kỳ mạnh mẽ trên dạng CNF.',
    5, 'Theorem Proving', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  ),
  (
    'cs_ai_q_040', 'short-answer', 'knowledge-logic',
    'Điền tên tiếng Anh viết tắt của bộ phận xử lý logic trong hệ chuyên gia. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['IE']::varchar[],
    'IE là Inference Engine (Động cơ suy diễn).',
    5, 'Expert Systems', 'cs_artificial_intelligence', 13, 'cs_ai_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Học có giám sát vs Học không giám sát (cs_ai_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_041', 'mcq', 'machine-learning',
    'Học có giám sát (Supervised Learning) khác biệt cốt lõi nào so với Học không giám sát?',
    ARRAY['Dữ liệu huấn luyện của học có giám sát bắt buộc phải được gán nhãn sẵn (nhãn mục tiêu)', 'Học có giám sát chạy nhanh hơn', 'Học có giám sát tự động sinh ra dữ liệu mới', 'Học có giám sát không dùng hàm mất mát'],
    ARRAY['Dữ liệu huấn luyện của học có giám sát bắt buộc phải được gán nhãn sẵn (nhãn mục tiêu)']::varchar[],
    'Học có giám sát tối ưu hóa mô hình dựa trên sai số giữa dự đoán và nhãn thực tế có sẵn (Ground Truth).',
    5, 'Machine Learning', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_042', 'mcq', 'machine-learning',
    'Bài toán nào sau đây thuộc thể loại Hồi quy (Regression)?',
    ARRAY['Dự đoán giá trị căn nhà dựa trên diện tích và số phòng', 'Phân loại ảnh là chó hay mèo', 'Gom nhóm khách hàng mua sắm', 'Phát hiện email rác'],
    ARRAY['Dự đoán giá trị căn nhà dựa trên diện tích và số phòng']::varchar[],
    'Hồi quy dự đoán một biến số có giá trị liên tục trong dải số thực.',
    5, 'Machine Learning', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_043', 'mcq', 'machine-learning',
    'Thuật toán K-Means thuộc thể loại học máy nào?',
    ARRAY['Học không giám sát (Unsupervised Learning)', 'Học có giám sát (Supervised Learning)', 'Học tăng cường (Reinforcement Learning)', 'Học bán giám sát'],
    ARRAY['Học không giám sát (Unsupervised Learning)']::varchar[],
    'K-Means thực hiện phân cụm (Clustering) dữ liệu tự động không cần nhãn.',
    5, 'Machine Learning', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_044', 'mcq', 'machine-learning',
    'Trong Confusion Matrix, đại lượng "Precision" (Độ chính xác) được tính bằng công thức nào?',
    ARRAY['TP / (TP + FP)', 'TP / (TP + FN)', 'TN / (TN + FP)', '(TP + TN) / Tổng số'],
    ARRAY['TP / (TP + FP)']::varchar[],
    'Precision đo lường tỷ lệ dự đoán dương đúng trong tổng số các mẫu được dự đoán là dương.',
    6, 'Model Evaluation', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_045', 'mcq', 'machine-learning',
    'Trong Confusion Matrix, đại lượng "Recall" (Độ nhạy) được tính bằng công thức nào?',
    ARRAY['TP / (TP + FN)', 'TP / (TP + FP)', 'TN / (TN + FN)', 'FP / (FP + FN)'],
    ARRAY['TP / (TP + FN)']::varchar[],
    'Recall (hoặc Sensitivity) đo lường tỷ lệ dự đoán dương đúng trên tổng số các mẫu thực tế là dương.',
    6, 'Model Evaluation', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_046', 'mcq', 'machine-learning',
    'Tại sao F1-Score lại là hệ số đánh giá tốt hơn Accuracy (Độ chính xác tổng thể) khi làm việc với tập dữ liệu lệch nhãn (imbalanced data)?',
    ARRAY['Vì F1-Score là trung bình điều hòa của Precision và Recall, phản ánh chính xác hiệu năng khi một nhãn chiếm đa số tuyệt đối', 'Vì F1-Score dễ tính toán hơn', 'Vì F1-Score luôn lớn hơn Accuracy', 'Vì F1-Score tự động loại bỏ các điểm ngoại lai'],
    ARRAY['Vì F1-Score là trung bình điều hòa của Precision và Recall, phản ánh chính xác hiệu năng khi một nhãn chiếm đa số tuyệt đối']::varchar[],
    'Ví dụ trong tập phát hiện ung thư chỉ có 1% dương tính, mô hình đoán mò "âm tính" 100% lần sẽ đạt Accuracy 99% nhưng F1-Score sẽ bằng 0.',
    7, 'Model Evaluation', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_047', 'mcq', 'machine-learning',
    'Thuật toán PCA (Principal Component Analysis) dùng để làm gì?',
    ARRAY['Giảm chiều dữ liệu bằng cách chiếu dữ liệu lên các phương có phương sai lớn nhất', 'Phân loại ảnh nhị phân', 'Hồi quy tuyến tính đa biến', 'Tự động điền dữ liệu khuyết'],
    ARRAY['Giảm chiều dữ liệu bằng cách chiếu dữ liệu lên các phương có phương sai lớn nhất']::varchar[],
    'PCA là kỹ thuật học không giám sát dùng để nén dữ liệu đặc trưng bằng cách tối đa hóa phương sai bảo toàn thông tin.',
    7, 'Machine Learning', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_048', 'mcq', 'machine-learning',
    'Khái niệm "Overfitting" (Quá khớp) xảy ra khi nào?',
    ARRAY['Mô hình học quá kỹ các chi tiết và nhiễu của tập train, dẫn đến kết quả train rất tốt nhưng kết quả trên tập kiểm thử test rất tệ', 'Mô hình không đủ năng lực học dữ liệu', 'Mô hình chạy quá xung nhịp CPU', 'Dữ liệu kiểm thử bị trùng với tập huấn luyện'],
    ARRAY['Mô hình học quá kỹ các chi tiết và nhiễu của tập train, dẫn đến kết quả train rất tốt nhưng kết quả trên tập kiểm thử test rất tệ']::varchar[],
    'Overfitting xảy ra khi mô hình quá phức tạp so với lượng dữ liệu huấn luyện hiện có, mất khả năng tổng quát hóa (generalization).',
    6, 'Model Evaluation', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_049', 'short-answer', 'machine-learning',
    'Điền tên tiếng Anh viết tắt của các mẫu dương tính được dự đoán đúng trong Confusion Matrix. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['TP']::varchar[],
    'TP là True Positives.',
    5, 'Model Evaluation', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  ),
  (
    'cs_ai_q_050', 'short-answer', 'machine-learning',
    'Điền số lượng cụm phân hoạch tối ưu mà người dùng cần cấu hình trước khi chạy thuật toán K-Means. (Điền tên biến chữ cái viết thường đại diện)',
    NULL,
    ARRAY['k']::varchar[],
    'K-Means yêu cầu xác định trước số cụm k.',
    5, 'Machine Learning', 'cs_artificial_intelligence', 13, 'cs_ai_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Hồi quy tuyến tính & Logistic Regression (cs_ai_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_051', 'mcq', 'machine-learning',
    'Hàm mất mát sai số bình phương trung bình (MSE) trong Hồi quy tuyến tính đo lường điều gì?',
    ARRAY['Trung bình bình phương khoảng cách sai lệch giữa giá trị dự đoán của mô hình và nhãn thực tế', 'Số lượng mẫu bị đoán sai nhãn', 'Tốc độ học tập của mô hình', 'Tổng số lượng tham số trọng số'],
    ARRAY['Trung bình bình phương khoảng cách sai lệch giữa giá trị dự đoán của mô hình và nhãn thực tế']::varchar[],
    'MSE phạt nặng các sai số lớn do phép bình phương, giúp định hình đường hồi quy đi qua trung tâm phân bố.',
    5, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_052', 'mcq', 'machine-learning',
    'Giải thuật "Hạ gradient" (Gradient Descent) cập nhật các trọng số w theo hướng nào?',
    ARRAY['Ngược hướng với vector gradient của hàm mất mát để giảm thiểu Loss', 'Cùng hướng với gradient để tăng Loss', 'Ngẫu nhiên không theo quy luật', 'Luôn tăng w lên 1 đơn vị'],
    ARRAY['Ngược hướng với vector gradient của hàm mất mát để giảm thiểu Loss']::varchar[],
    'Gradient chỉ hướng tăng nhanh nhất của hàm số. Do đó đi ngược hướng gradient (trừ gradient) sẽ dẫn tới điểm cực tiểu của Loss.',
    6, 'Optimization Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_053', 'mcq', 'machine-learning',
    'Tại sao Logistic Regression lại sử dụng hàm kích hoạt Sigmoid ở đầu ra?',
    ARRAY['Để nén giá trị dự đoán tuyến tính về dải xác suất [0, 1] phục vụ phân loại nhị phân', 'Để loại bỏ hoàn toàn các trọng số âm', 'Để biến mô hình thành đa lớp', 'Để làm tăng tốc độ học tập của mô hình'],
    ARRAY['Để nén giá trị dự đoán tuyến tính về dải xác suất [0, 1] phục vụ phân loại nhị phân']::varchar[],
    'Sigmoid ánh xạ dải số thực vô hạn $(-\infty, \infty)$ về $(0, 1)$, biểu thị xác suất của nhãn dương.',
    5, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_054', 'mcq', 'machine-learning',
    'Hàm kích hoạt Sigmoid có công thức toán học là gì?',
    ARRAY['1 / (1 + e^-z)', 'e^z / (1 + e^z)', 'max(0, z)', 'log(1 + e^z)'],
    ARRAY['1 / (1 + e^-z)']::varchar[],
    'Sigmoid: $\sigma(z) = \frac{1}{1 + e^{-z}}$.',
    5, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_055', 'mcq', 'machine-learning',
    'Hàm mất mát "Binary Cross-Entropy Loss" (Entropy chéo nhị phân) được dùng làm loss function cho mô hình nào?',
    ARRAY['Logistic Regression', 'Linear Regression', 'K-Means Clustering', 'Hệ chuyên gia'],
    ARRAY['Logistic Regression']::varchar[],
    'Binary Cross-Entropy đo lường khoảng cách giữa hai phân phối xác suất dự đoán và thực tế của biến phân loại nhị phân.',
    6, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_056', 'mcq', 'machine-learning',
    'Hiện tượng gì xảy ra với Gradient Descent nếu ta chọn hệ số tốc độ học (Learning Rate) quá lớn?',
    ARRAY['Các bước nhảy w sẽ quá lớn làm thuật toán bị dao động và phân kỳ, không thể hội tụ về điểm tối ưu', 'Thuật toán sẽ hội tụ cực kỳ nhanh', 'Mô hình sẽ bị biến đổi thành tuyến tính', 'Không ảnh hưởng gì đến quá trình huấn luyện'],
    ARRAY['Các bước nhảy w sẽ quá lớn làm thuật toán bị dao động và phân kỳ, không thể hội tụ về điểm tối ưu']::varchar[],
    'Tốc độ học quá lớn vượt qua miệng thung lũng hàm mất mát, nhảy nhảy liên tục làm trị số Loss tăng vọt.',
    6, 'Optimization Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_057', 'mcq', 'machine-learning',
    'Tại sao hàm mất mát Cross-Entropy trong Logistic Regression lại được ưu tiên hơn MSE cho bài toán phân loại?',
    ARRAY['Vì Cross-Entropy tạo ra hàm mất mát lồi (convex) không có cực trị địa phương, bảo đảm Gradient Descent tìm thấy tối ưu toàn cục', 'Vì nó chạy nhanh hơn', 'Vì nó không dùng phép nhân', 'Vì nó triệt tiêu các đặc trưng nhiễu'],
    ARRAY['Vì Cross-Entropy tạo ra hàm mất mát lồi (convex) không có cực trị địa phương, bảo đảm Gradient Descent tìm thấy tối ưu toàn cục']::varchar[],
    'Sử dụng MSE với Sigmoid tạo ra hàm phi lồi (non-convex) có rất nhiều điểm cực tiểu cục bộ (local minima), làm Gradient Descent dễ bị kẹt.',
    7, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_058', 'mcq', 'machine-learning',
    'Khái niệm "Regularization" (như L1 Lasso, L2 Ridge) trong huấn luyện hồi quy dùng để làm gì?',
    ARRAY['Thêm thành phần phạt vào hàm mất mát để hạn chế giá trị trọng số w phình to, chống quá khớp (overfitting)', 'Tăng dung lượng dữ liệu huấn luyện', 'Đồng bộ hóa dữ liệu trên GPU', 'Tự động chuẩn hóa các đặc trưng đầu vào'],
    ARRAY['Thêm thành phần phạt vào hàm mất mát để hạn chế giá trị trọng số w phình to, chống quá khớp (overfitting)']::varchar[],
    'L1 phạt trị tuyệt đối giúp triệt tiêu các trọng số thừa về 0 (tạo độ thưa - sparsity). L2 phạt bình phương giúp thu nhỏ trọng số mượt mà.',
    7, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_059', 'short-answer', 'machine-learning',
    'Điền tên viết tắt của hàm mất mát sai số bình phương trung bình. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MSE']::varchar[],
    'MSE là Mean Squared Error.',
    5, 'Regression Models', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  ),
  (
    'cs_ai_q_060', 'short-answer', 'machine-learning',
    'Điền tên hằng số ký hiệu bằng chữ Hy Lạp `\\eta` biểu thị tốc độ bước nhảy trong tối ưu hóa Gradient Descent. (Tiếng Việt hoặc tiếng Anh)',
    NULL,
    ARRAY['learning rate', 'tốc độ học']::varchar[],
    'Learning Rate xác định kích thước bước chân cập nhật trọng số.',
    5, 'Optimization Algorithms', 'cs_artificial_intelligence', 13, 'cs_ai_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Cây quyết định & Rừng ngẫu nhiên (cs_ai_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_061', 'mcq', 'machine-learning',
    'Trong xây dựng Cây quyết định, chỉ số "Entropy" đo lường điều gì của tập dữ liệu?',
    ARRAY['Độ hỗn loạn thông tin (mức độ không tinh khiết) của tập dữ liệu', 'Độ lớn của các giá trị đặc trưng', 'Thời gian huấn luyện cây quyết định', 'Chiều sâu tối đa của cây'],
    ARRAY['Độ hỗn loạn thông tin (mức độ không tinh khiết) của tập dữ liệu']::varchar[],
    'Entropy cao nghĩa là các nhãn trộn lẫn lộn xộn. Entropy = 0 khi tập dữ liệu hoàn toàn tinh khiết (chỉ chứa 1 nhãn).',
    5, 'Decision Trees', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_062', 'mcq', 'machine-learning',
    'Tiêu chí "Information Gain" (Độ lợi thông tin) được tính toán thế nào?',
    ARRAY['Chênh lệch Entropy của tập dữ liệu trước và sau khi được phân tách bằng một đặc trưng', 'Tổng số lượng các nút lá', 'Độ sâu của cây quyết định chia cho số nhãn', 'Tần suất xuất hiện của đặc trưng'],
    ARRAY['Chênh lệch Entropy của tập dữ liệu trước và sau khi được phân tách bằng một đặc trưng']::varchar[],
    'Thuật toán ID3 chọn đặc trưng có Information Gain lớn nhất để thực hiện phân tách nút.',
    6, 'Decision Trees', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_063', 'mcq', 'machine-learning',
    'Đặc tính của chỉ số "Gini Impurity" so với Entropy là gì?',
    ARRAY['Gini Impurity tính toán nhanh hơn vì không chứa phép toán logarit phức tạp', 'Gini Impurity chính xác hơn Entropy gấp nhiều lần', 'Gini Impurity chỉ dùng cho biến số liên tục', 'Gini Impurity luôn lớn hơn 1'],
    ARRAY['Gini Impurity tính toán nhanh hơn vì không chứa phép toán logarit phức tạp']::varchar[],
    'Thuật toán CART dùng chỉ số Gini làm tiêu chí mặc định để xây dựng cây nhị phân nhanh chóng.',
    6, 'Decision Trees', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_064', 'mcq', 'machine-learning',
    'Phương pháp học máy tập hợp "Bagging" (Bootstrap Aggregating) hoạt động thế nào trong Rừng ngẫu nhiên (Random Forest)?',
    ARRAY['Lấy mẫu ngẫu nhiên có thay thế từ tập dữ liệu huấn luyện gốc để tạo ra các tập dữ liệu huấn luyện con độc lập cho từng cây', 'Xếp chồng các cây nối tiếp nhau', 'Lọc bỏ các thuộc tính có phương sai nhỏ', 'Tự động tạo nhãn giả cho dữ liệu'],
    ARRAY['Lấy mẫu ngẫu nhiên có thay thế từ tập dữ liệu huấn luyện gốc để tạo ra các tập dữ liệu huấn luyện con độc lập cho từng cây']::varchar[],
    'Bagging bảo đảm các cây trong rừng được học trên các góc nhìn dữ liệu khác nhau, giảm tính tương quan chéo.',
    7, 'Ensemble Learning', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_065', 'mcq', 'machine-learning',
    'Ngoài Bagging dữ liệu, Random Forest thực hiện kỹ thuật ngẫu nhiên nào khác trên đặc trưng?',
    ARRAY['Tại mỗi nút phân tách của cây, chỉ chọn ngẫu nhiên một nhóm nhỏ các đặc trưng để so sánh phân tách', 'Đổi tên ngẫu nhiên các đặc trưng', 'Mã hóa ngẫu nhiên các đặc trưng đầu vào', 'Xoá bỏ hoàn toàn 50% đặc trưng'],
    ARRAY['Tại mỗi nút phân tách của cây, chỉ chọn ngẫu nhiên một nhóm nhỏ các đặc trưng để so sánh phân tách']::varchar[],
    'Kỹ thuật này giúp các cây quyết định trong rừng không bị phụ thuộc quá mức vào một vài đặc trưng mạnh nhất, tăng độ đa dạng của rừng.',
    7, 'Ensemble Learning', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_066', 'mcq', 'machine-learning',
    'Kết quả dự đoán cuối cùng của Random Forest cho bài toán Phân loại (Classification) được đưa ra bằng cách nào?',
    ARRAY['Bỏ phiếu số đông (Majority Voting) từ kết quả dự đoán của tất cả các cây', 'Tính trung bình cộng kết quả của tất cả các cây', 'Lấy kết quả của cây có độ sâu lớn nhất', 'Lấy kết quả của cây chạy nhanh nhất'],
    ARRAY['Bỏ phiếu số đông (Majority Voting) từ kết quả dự đoán của tất cả các cây']::varchar[],
    'Mỗi cây bỏ một phiếu bầu cho nhãn dự đoán của nó, nhãn nào có số phiếu cao nhất sẽ là kết quả của toàn bộ rừng.',
    6, 'Ensemble Learning', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_067', 'mcq', 'machine-learning',
    'Biện pháp hiệu quả để giảm thiểu hiện tượng quá khớp (overfitting) của cây quyết định đơn lẻ là gì?',
    ARRAY['Cắt tỉa cành cây (Pruning) hoặc khống chế độ sâu tối đa (max_depth) của cây', 'Tăng độ sâu của cây lên vô hạn', 'Bỏ qua không dùng Gini Impurity', 'Chỉ huấn luyện cây trên 10 mẫu dữ liệu'],
    ARRAY['Cắt tỉa cành cây (Pruning) hoặc khống chế độ sâu tối đa (max_depth) của cây']::varchar[],
    'Pruning loại bỏ các nhánh cây quá sâu có độ lợi thông tin không đáng kể, giúp mô hình đơn giản và tổng quát hóa tốt hơn.',
    6, 'Decision Trees', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_068', 'mcq', 'machine-learning',
    'Tại sao Random Forest lại có khả năng chống quá khớp tốt hơn cây quyết định đơn lẻ?',
    ARRAY['Vì trung bình hóa kết quả của nhiều cây độc lập giúp triệt tiêu phương sai (variance) của toàn bộ hệ thống', 'Vì các cây trong rừng có độ sâu thấp hơn', 'Vì Random Forest chỉ sử dụng các đặc trưng số nguyên', 'Vì nó không dùng hàm mất mát để tối ưu'],
    ARRAY['Vì trung bình hóa kết quả của nhiều cây độc lập giúp triệt tiêu phương sai (variance) của toàn bộ hệ thống']::varchar[],
    'Tính đa dạng và độc lập của các cây quyết định làm cho sai số ngẫu nhiên của các cây tự bù trừ lẫn nhau.',
    7, 'Ensemble Learning', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_069', 'short-answer', 'machine-learning',
    'Điền tên đại lượng đo độ hỗn loạn thông tin trong công thức ID3. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Entropy']::varchar[],
    'Entropy đo lường mức độ không tinh khiết của tập dữ liệu.',
    5, 'Decision Trees', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  ),
  (
    'cs_ai_q_070', 'short-answer', 'machine-learning',
    'Điền tên phương pháp học máy kết hợp nhiều mô hình dự đoán độc lập (như Random Forest). (Tiếng Anh viết thường)',
    NULL,
    ARRAY['ensemble learning', 'ensemble']::varchar[],
    'Ensemble Learning kết hợp nhiều mô hình yếu để tạo ra mô hình mạnh.',
    5, 'Ensemble Learning', 'cs_artificial_intelligence', 13, 'cs_ai_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Mạng nơ-ron nhân tạo (cs_ai_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_071', 'mcq', 'neural-networks',
    'Hạn chế lớn nhất của mô hình Single-layer Perceptron là gì?',
    ARRAY['Chỉ phân loại được các tập dữ liệu phân tách tuyến tính; hoàn toàn thất bại trước các hàm logic phi tuyến như XOR', 'Không thể huấn luyện bằng Gradient Descent', 'Tốn quá nhiều RAM', 'Chỉ hỗ trợ dữ liệu đầu vào 1 chiều'],
    ARRAY['Chỉ phân loại được các tập dữ liệu phân tách tuyến tính; hoàn toàn thất bại trước các hàm logic phi tuyến như XOR']::varchar[],
    'Mặt phẳng phân chia của Perceptron là đường thẳng tuyến tính, không thể bao quát ranh giới quyết định của cổng XOR.',
    5, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_072', 'mcq', 'neural-networks',
    'Mạng Multi-Layer Perceptron (MLP) giải quyết bài toán phi tuyến bằng cách nào?',
    ARRAY['Xếp chồng nhiều tầng nơ-ron và chèn các hàm kích hoạt phi tuyến giữa các tầng ẩn', 'Sử dụng thêm các cảm biến phần cứng', 'Chuyển toàn bộ trọng số về dạng số dương', 'Tăng tốc độ học lên vô hạn'],
    ARRAY['Xếp chồng nhiều tầng nơ-ron và chèn các hàm kích hoạt phi tuyến giữa các tầng ẩn']::varchar[],
    'Tầng ẩn (Hidden Layer) thực hiện phép biến đổi phi tuyến không gian đặc trưng giúp tầng ra dễ dàng phân tách tuyến tính.',
    6, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_073', 'mcq', 'neural-networks',
    'Định lý xấp xỉ phổ quát (Universal Approximation Theorem) khẳng định điều gì về mạng MLP?',
    ARRAY['Một mạng MLP chỉ cần duy nhất 1 tầng ẩn với đủ số nơ-ron và hàm kích hoạt phi tuyến có thể xấp xỉ mọi hàm số liên tục với độ chính xác tùy ý', 'Mọi mạng MLP đều có độ chính xác 100%', 'Mạng MLP luôn luôn tự hội tụ không cần huấn luyện', 'MLP tương đương với một cây quyết định'],
    ARRAY['Một mạng MLP chỉ cần duy nhất 1 tầng ẩn với đủ số nơ-ron và hàm kích hoạt phi tuyến có thể xấp xỉ mọi hàm số liên tục với độ chính xác tùy ý']::varchar[],
    'Định lý chứng minh sức mạnh toán học khổng lồ của kiến trúc mạng nơ-ron nông nhưng rộng.',
    7, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_074', 'mcq', 'neural-networks',
    'Điều gì xảy ra nếu ta hoàn toàn loại bỏ hàm kích hoạt phi tuyến (activation function) khỏi các tầng của mạng MLP?',
    ARRAY['Tích các ma trận trọng số liên tiếp sẽ bị suy sụp toán học tương đương một phép biến đổi tuyến tính đơn tầng, làm mạng mất khả năng học phi tuyến', 'Mạng vẫn chạy bình thường và nhanh hơn', 'Mạng sẽ tự động chuyển sang cấu trúc cây', 'Hàm mất mát sẽ bằng 0 vĩnh viễn'],
    ARRAY['Tích các ma trận trọng số liên tiếp sẽ bị suy sụp toán học tương đương một phép biến đổi tuyến tính đơn tầng, làm mạng mất khả năng học phi tuyến']::varchar[],
    'Nếu không có phi tuyến, mạng đa tầng chỉ là phép nhân ma trận liên tiếp: $W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2) = W''x + b''$, tương đương 1 tầng.',
    7, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_075', 'mcq', 'neural-networks',
    'Tại sao người ta khuyên không nên khởi tạo toàn bộ trọng số w của mạng MLP bằng giá trị 0 trước khi huấn luyện?',
    ARRAY['Vì sẽ gây ra hiện tượng đối xứng hoàn hảo; mọi nơ-ron trong cùng một tầng ẩn sẽ nhận cùng một gradient và cập nhật y hệt nhau, làm mạng không thể học các đặc trưng khác nhau', 'Vì CPU sẽ bị sập lỗi chia cho 0', 'Vì hàm mất mát sẽ bị vô hạn', 'Vì trình biên dịch tự động huỷ tiến trình'],
    ARRAY['Vì sẽ gây ra hiện tượng đối xứng hoàn hảo; mọi nơ-ron trong cùng một tầng ẩn sẽ nhận cùng một gradient và cập nhật y hệt nhau, làm mạng không thể học các đặc trưng khác nhau']::varchar[],
    'Hiện tượng này gọi là "Symmetry problem". Phải khởi tạo trọng số ngẫu nhiên nhỏ (như Xavier/He) để phá vỡ sự đối xứng.',
    6, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_076', 'mcq', 'neural-networks',
    'Trong MLP, tầng ẩn (Hidden Layer) thực hiện nhiệm vụ gì?',
    ARRAY['Biến đổi phi tuyến không gian đặc trưng đầu vào thành không gian mới dễ phân loại hơn ở tầng ra', 'Ẩn giấu thông tin không cho hacker đọc trộm', 'Lưu trữ lịch sử huấn luyện của GPU', 'Cấp phát IP cho các node'],
    ARRAY['Biến đổi phi tuyến không gian đặc trưng đầu vào thành không gian mới dễ phân loại hơn ở tầng ra']::varchar[],
    'Tầng ẩn tự động trích xuất các đặc trưng từ mức độ thấp đến mức độ cao (representation learning).',
    6, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_077', 'mcq', 'neural-networks',
    'Mô hình MLP phân loại 10 lớp chữ số viết tay cần bao nhiêu nút ở tầng đầu ra (Output Layer)?',
    ARRAY['10', '1', '2', '784'],
    ARRAY['10']::varchar[],
    'Mỗi nút đầu ra đại diện cho xác suất (sau khi qua Softmax) của một lớp số từ 0 đến 9.',
    5, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_078', 'mcq', 'neural-networks',
    'Hàm kích hoạt nào thường được sử dụng ở tầng đầu ra (Output Layer) của bài toán phân loại đa lớp (Multi-class Classification)?',
    ARRAY['Softmax', 'Sigmoid', 'ReLU', 'Step function'],
    ARRAY['Softmax']::varchar[],
    'Softmax chuẩn hóa tổng toàn bộ đầu ra của các nút về bằng 1, biến các đầu ra thành một phân phối xác suất hợp lệ.',
    6, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_079', 'short-answer', 'neural-networks',
    'Điền tên viết tắt tiếng Anh của mạng nơ-ron đa tầng. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['MLP']::varchar[],
    'MLP là Multi-Layer Perceptron.',
    5, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  ),
  (
    'cs_ai_q_080', 'short-answer', 'neural-networks',
    'Điền tên cổng logic phi tuyến kinh điển mà Perceptron đơn tầng hoàn toàn thất bại không thể phân loại được. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['XOR']::varchar[],
    'Perceptron không giải được bài toán XOR vì nó không phân tách tuyến tính.',
    5, 'Neural Networks', 'cs_artificial_intelligence', 13, 'cs_ai_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Lan truyền ngược (cs_ai_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_081', 'mcq', 'neural-networks',
    'Thuật toán lan truyền ngược (Backpropagation) dựa trên quy tắc toán học giải tích nào để tính toán gradient sai số?',
    ARRAY['Quy tắc đạo hàm chuỗi (Chain Rule)', 'Định lý Bayes', 'Quy tắc L''Hopital', 'Phép nhân ma trận Gauss'],
    ARRAY['Quy tắc đạo hàm chuỗi (Chain Rule)']::varchar[],
    'Chain Rule cho phép tính đạo hàm của hàm hợp bằng cách nhân các đạo hàm trung gian dọc theo đường đi từ tầng cuối về tầng đầu.',
    5, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_082', 'mcq', 'neural-networks',
    'Hiện tượng "Triệt tiêu gradient" (Vanishing Gradient) trong mạng nơ-ron sâu xảy ra khi nào?',
    ARRAY['Khi đạo hàm của hàm kích hoạt (như Sigmoid) ở vùng biên quá nhỏ, khiến tích chuỗi đạo hàm ngược về các tầng đầu tiên tiệm cận về 0, làm trọng số ngừng cập nhật', 'Khi trọng số w bị giảm về 0', 'Khi CPU bị sụt giảm nguồn điện', 'Khi ta đặt tốc độ học learning rate quá lớn'],
    ARRAY['Khi đạo hàm của hàm kích hoạt (như Sigmoid) ở vùng biên quá nhỏ, khiến tích chuỗi đạo hàm ngược về các tầng đầu tiên tiệm cận về 0, làm trọng số ngừng cập nhật']::varchar[],
    'Đạo hàm cực đại của Sigmoid chỉ là 0.25. Nhân liên tiếp các số nhỏ hơn 0.25 qua nhiều tầng ẩn sâu sẽ làm gradient biến mất.',
    7, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_083', 'mcq', 'neural-networks',
    'Hàm kích hoạt ReLU (Rectified Linear Unit) giải quyết bài toán triệt tiêu gradient nhờ thuộc tính nào?',
    ARRAY['Đạo hàm của ReLU luôn bằng 1 đối với toàn bộ miền giá trị đầu vào dương, giúp dòng gradient truyền ngược nguyên vẹn', 'ReLU có dải ra đối xứng qua gốc tọa độ', 'ReLU triệt tiêu các đặc trưng âm', 'ReLU chạy không cần phép nhân'],
    ARRAY['Đạo làm của ReLU luôn bằng 1 đối với toàn bộ miền giá trị đầu vào dương, giúp dòng gradient truyền ngược nguyên vẹn', 'Đạo hàm của ReLU luôn bằng 1 đối với toàn bộ miền giá trị đầu vào dương, giúp dòng gradient truyền ngược nguyên vẹn']::varchar[],
    'ReLU: $f(x) = \max(0, x)$. Với $x > 0$, đạo hàm bằng 1, ngăn chặn việc thu nhỏ gradient khi nhân chuỗi.',
    6, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_084', 'mcq', 'neural-networks',
    'Nhược điểm "Dying ReLU" (ReLU chết) nói về hiện tượng gì?',
    ARRAY['Khi nơ-ron nhận đầu vào luôn âm, ReLU trả về 0 và đạo hàm bằng 0 làm nơ-ron đó ngừng cập nhật vĩnh viễn', 'Mạng nơ-ron tự động tắt nguồn', 'Các trọng số bị phình lên vô hạn', 'Hàm mất mát bị rơi vào cực đại'],
    ARRAY['Khi nơ-ron nhận đầu vào luôn âm, ReLU trả về 0 và đạo hàm bằng 0 làm nơ-ron đó ngừng cập nhật vĩnh viễn']::varchar[],
    'Nếu bị rơi vào miền âm, gradient qua nơ-ron đó bằng 0 vĩnh viễn, biến nơ-ron thành nút chết không còn đóng góp cho mạng.',
    6, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_085', 'mcq', 'neural-networks',
    'Hàm kích hoạt "Leaky ReLU" được thiết kế để khắc phục lỗi Dying ReLU thế nào?',
    ARRAY['Cho phép một đạo hàm nhỏ khác 0 (ví dụ 0.01) ở miền đầu vào âm để dòng gradient không bị triệt tiêu hoàn toàn', 'Bằng cách nhân đôi giá trị đầu vào', 'Bằng cách sử dụng hàm logarit ở miền âm', 'Bằng cách ngẫu nhiên hóa đầu ra'],
    ARRAY['Cho phép một đạo hàm nhỏ khác 0 (ví dụ 0.01) ở miền đầu vào âm để dòng gradient không bị triệt tiêu hoàn toàn']::varchar[],
    'Leaky ReLU: $f(x) = \max(0.01x, x)$ giữ lại một dòng gradient nhỏ ở miền âm giúp nơ-ron có cơ hội tự cập nhật thoát khỏi trạng thái chết.',
    6, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_086', 'mcq', 'neural-networks',
    'Tại sao hàm kích hoạt Tanh (Hyperbolic Tangent) thường được ưu tiên hơn Sigmoid ở các tầng ẩn?',
    ARRAY['Vì Tanh đối xứng qua gốc tọa độ (zero-centered), giúp dòng cập nhật trọng số không bị dao động chéo chữ chi (zig-zag)', 'Vì Tanh không bị vanishing gradient', 'Vì Tanh chạy nhanh hơn Sigmoid gấp 10 lần', 'Vì Tanh không chứa số mũ e'],
    ARRAY['Vì Tanh đối xứng qua gốc tọa độ (zero-centered), giúp dòng cập nhật trọng số không bị dao động chéo chữ chi (zig-zag)']::varchar[],
    'Sigmoid luôn ra số dương làm gradient của các trọng số cùng dấu, bắt chúng cập nhật lệch hướng zig-zag chậm chạp.',
    7, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_087', 'mcq', 'neural-networks',
    'Quy trình huấn luyện mạng nơ-ron gồm 2 bước: Forward pass và Backward pass. Giai đoạn "Forward pass" thực hiện hành động gì?',
    ARRAY['Truyền lan truyền đầu vào qua các tầng nơ-ron để tính toán đầu ra dự đoán và giá trị hàm mất mát Loss', 'Tính toán đạo hàm của toàn bộ trọng số', 'Cập nhật trọng số bằng Gradient Descent', 'Khởi tạo ngẫu nhiên lại trọng số'],
    ARRAY['Truyền lan truyền đầu vào qua các tầng nơ-ron để tính toán đầu ra dự đoán và giá trị hàm mất mát Loss']::varchar[],
    'Forward pass tính toán giá trị kích hoạt của từng tầng từ trái qua phải để xem mô hình đoán sai lệch bao nhiêu.',
    5, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_088', 'mcq', 'neural-networks',
    'Đạo hàm của hàm kích hoạt Sigmoid \\(\\sigma(x)\\) có thể tính toán nhanh chóng qua chính nó bằng công thức nào?',
    ARRAY['\\(\\sigma(x) \\cdot (1 - \\sigma(x))\\)', '\\(1 - \\sigma(x)\\)', '\\(\\sigma(x)^2\\)', '\\(\\sigma(x) \\cdot (1 + \\sigma(x))\\)'],
    ARRAY['\\(\\sigma(x) \\cdot (1 - \\sigma(x))\\)']::varchar[],
    'Đạo hàm của Sigmoid: $\sigma''(x) = \sigma(x)(1 - \sigma(x))$, cực kỳ đẹp và tối ưu tính toán cho máy tính.',
    6, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_089', 'short-answer', 'neural-networks',
    'Điền tên hàm kích hoạt phi tuyến viết tắt của Rectified Linear Unit. (Viết hoa toàn bộ hoặc viết thường)',
    NULL,
    ARRAY['ReLU', 'relu']::varchar[],
    'ReLU là hàm kích hoạt phổ biến nhất cho mạng sâu.',
    5, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  ),
  (
    'cs_ai_q_090', 'short-answer', 'neural-networks',
    'Điền tên tiếng Anh của quy tắc đạo hàm chuỗi dùng trong thuật toán lan truyền ngược. (Viết thường)',
    NULL,
    ARRAY['chain rule', 'đạo hàm chuỗi']::varchar[],
    'Chain Rule dùng để tính đạo hàm hàm hợp.',
    5, 'Backpropagation & Activations', 'cs_artificial_intelligence', 13, 'cs_ai_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Xử lý ngôn ngữ tự nhiên & Mô hình Transformers (cs_ai_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_ai_q_091', 'mcq', 'neural-networks',
    'Hạn chế lớn nhất của mạng nơ-ron tuần hoàn (RNN) truyền thống khi xử lý văn bản dài là gì?',
    ARRAY['Triệt tiêu gradient qua thời gian dài làm mạng bị mất trí nhớ dài hạn và không thể tính toán song song hóa trên GPU', 'Không hỗ trợ xử lý tiếng Anh', 'Không có các tầng ẩn', 'Tự động xóa các từ đầu tiên'],
    ARRAY['Triệt tiêu gradient qua thời gian dài làm mạng bị mất trí nhớ dài hạn và không thể tính toán song song hóa trên GPU']::varchar[],
    'RNN duyệt tuần tự từng từ một, tích lũy trạng thái ẩn qua chuỗi nhân đạo hàm liên tiếp gây vanishing/exploding gradient, và bắt buộc phải chạy tuần tự.',
    6, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_092', 'mcq', 'neural-networks',
    'Mạng LSTM giải quyết bài toán mất trí nhớ dài hạn của RNN bằng cách bổ sung cơ chế nào?',
    ARRAY['Đường truyền Cell State và các cổng Forget, Input, Output để kiểm soát luồng thông tin lưu trữ', 'Sử dụng thuật toán A* tìm từ ngắn nhất', 'Bỏ qua hoàn toàn các trạng thái ẩn', 'Chuyển toàn bộ dữ liệu sang mạng MLP'],
    ARRAY['Đường truyền Cell State và các cổng Forget, Input, Output để kiểm soát luồng thông tin lưu trữ']::varchar[],
    'LSTM dùng cổng Forget để quyết định bỏ thông tin cũ, cổng Input thêm thông tin mới vào Cell State chạy song song thông suốt.',
    6, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_093', 'mcq', 'neural-networks',
    'Cơ chế "Self-Attention" (Tự chú ý) trong Transformers hoạt động theo nguyên lý nào?',
    ARRAY['Cho phép mô hình đánh giá mức độ liên quan ngữ nghĩa giữa tất cả các từ trong câu đồng thời, bất kể khoảng cách vật lý của chúng', 'Chỉ tập trung vào từ đầu tiên và từ cuối cùng của câu', 'Tự động sửa lỗi chính tả của từ', 'So sánh câu với cơ sở dữ liệu luật chuyên gia'],
    ARRAY['Cho phép mô hình đánh giá mức độ liên quan ngữ nghĩa giữa tất cả các từ trong câu đồng thời, bất kể khoảng cách vật lý của chúng']::varchar[],
    'Self-attention liên kết ngữ cảnh của từ này với toàn bộ các từ khác trong câu giúp hiểu trọn vẹn ngữ nghĩa.',
    7, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_094', 'mcq', 'neural-networks',
    'Công thức tính toán Attention cơ bản trong Transformers là gì?',
    ARRAY['softmax(Q K^T / sqrt(d_k)) * V', 'softmax(Q K^T) * V', 'Q * K * V', 'softmax(Q * V) / K'],
    ARRAY['softmax(Q K^T / sqrt(d_k)) * V']::varchar[],
    'Phép nhân $QK^T$ tạo ma trận tương quan, chia cho căn $d_k$ để chuẩn hóa biên độ, qua Softmax lấy phân phối trọng số rồi nhân với Value $V$.',
    7, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_095', 'mcq', 'neural-networks',
    'Tại sao hệ số chia `sqrt(d_k)` lại cực kỳ quan trọng trong công thức tính toán Self-Attention?',
    ARRAY['Để giữ cho tích vô hướng không phình quá to khi d_k lớn, tránh đưa hàm Softmax vào vùng bão hòa có đạo hàm tiệm cận 0 gây triệt tiêu gradient', 'Để giảm kích thước ma trận', 'Để tăng tốc độ tính toán căn bậc hai', 'Để mã hóa thông tin vị trí của từ'],
    ARRAY['Để giữ cho tích vô hướng không phình quá to khi d_k lớn, tránh đưa hàm Softmax vào vùng bão hòa có đạo hàm tiệm cận 0 gây triệt tiêu gradient']::varchar[],
    'Nếu không chia căn $d_k$, các tích vô hướng lớn đẩy Softmax về 2 biên (trị số 1 và 0), nơi đạo hàm biến mất làm mạng ngừng học.',
    8, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_096', 'mcq', 'neural-networks',
    'Cơ chế "Multi-Head Attention" trong Transformers mang lại ưu điểm gì?',
    ARRAY['Cho phép mô hình chạy song song nhiều bộ Attention độc lập để học các mối quan hệ ngữ nghĩa ở nhiều góc nhìn và không gian khác nhau', 'Để tăng gấp đôi số lượng từ đầu vào', 'Để thay thế hoàn toàn tầng giải mã Decoder', 'Để tự động mã hóa ngôn ngữ thành mã máy nhị phân'],
    ARRAY['Cho phép mô hình chạy song song nhiều bộ Attention độc lập để học các mối quan hệ ngữ nghĩa ở nhiều góc nhìn và không gian khác nhau']::varchar[],
    'Multi-Head giúp nơ-ron học đồng thời các quan hệ ngữ pháp (chủ ngữ - động từ) và ngữ nghĩa (từ chỉ thời gian - địa điểm) độc lập.',
    7, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_097', 'mcq', 'neural-networks',
    'Tại sao kiến trúc Transformers bắt buộc phải sử dụng kỹ thuật "Positional Encoding"?',
    ARRAY['Vì Transformers xử lý song song toàn bộ câu cùng lúc, không duyệt tuần tự nên cần Positional Encoding để bổ sung thông tin vị trí thứ tự của các từ', 'Để dịch chuyển địa chỉ IP của các token', 'Để mã hóa bảo mật chống hacker đọc trộm văn bản', 'Để giảm số lượng tham số huấn luyện'],
    ARRAY['Vì Transformers xử lý song song toàn bộ câu cùng lúc, không duyệt tuần tự nên cần Positional Encoding để bổ sung thông tin vị trí thứ tự của các từ']::varchar[],
    'Không có Positional Encoding, câu "Mèo ăn cá" và "Cá ăn mèo" sẽ có biểu diễn toán học hoàn toàn giống nhau, làm mất thông tin thứ tự từ.',
    7, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_098', 'mcq', 'neural-networks',
    'Mô hình ngôn ngữ lớn (LLM) nổi tiếng GPT (Generative Pre-trained Transformer) được xây dựng dựa trên thành phần nào của kiến trúc Transformers gốc?',
    ARRAY['Phần Decoder (Bộ giải mã) chạy tự hồi quy (Autoregressive)', 'Phần Encoder (Bộ mã hóa)', 'Cả hai phần Encoder và Decoder đầy đủ', 'Không sử dụng thành phần nào của Transformers'],
    ARRAY['Phần Decoder (Bộ giải mã) chạy tự hồi quy (Autoregressive)']::varchar[],
    'GPT sử dụng Stack các tầng Masked Decoder để dự đoán từ tiếp theo trong chuỗi một cách tự hồi quy.',
    7, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_099', 'short-answer', 'neural-networks',
    'Điền tên bài báo khoa học kinh điển năm 2017 giới thiệu kiến trúc Transformers của Google. (Tiếng Anh viết thường)',
    NULL,
    ARRAY['attention is all you need']::varchar[],
    'Bài báo "Attention Is All You Need" khai sinh ra Transformers.',
    6, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  ),
  (
    'cs_ai_q_100', 'short-answer', 'neural-networks',
    'Điền tên viết tắt của cơ chế cốt lõi trong Transformers cho phép các từ liên kết ngữ cảnh song song. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Self-Attention', 'Self attention']::varchar[],
    'Self-Attention là cơ chế tự chú ý đột phá.',
    5, 'Transformers & NLP', 'cs_artificial_intelligence', 13, 'cs_ai_10'
  );

COMMIT;
