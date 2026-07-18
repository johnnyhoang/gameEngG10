-- SQL migration to seed topics and 10 core lessons for cs_artificial_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_artificial_intelligence (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('search-heuristics', 'cs_artificial_intelligence', 13, 'Tìm kiếm & Heuristics', 'Các giải thuật tìm kiếm mù, tìm kiếm thông minh A*, và tìm kiếm đối kháng Minimax trong game.', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('knowledge-logic', 'cs_artificial_intelligence', 13, 'Biểu diễn tri thức & Logic', 'Logic mệnh đề, logic vị từ bậc nhất, suy diễn tự động và kiến trúc của Hệ chuyên gia.', 2, 'phong', 'high', 30, ARRAY['mcq']::varchar[]),
  ('machine-learning', 'cs_artificial_intelligence', 13, 'Học máy cơ bản', 'Phương pháp học có/không giám sát, các thuật toán hồi quy, phân loại và cây quyết định.', 3, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('neural-networks', 'cs_artificial_intelligence', 13, 'Mạng Nơ-ron & Deep Learning', 'Perceptron, Multi-layer Perceptron, thuật toán lan truyền ngược, hàm kích hoạt và cơ chế Attention Transformers.', 4, 'bang', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_artificial_intelligence (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_ai_01', 
    'cs_artificial_intelligence', 
    13, 
    'Tìm kiếm & Heuristics', 
    'Tìm kiếm mù và tìm kiếm heuristics (DFS, BFS, A*)', 
    '### 1. Phân loại thuật toán tìm kiếm không thông tin (Tìm kiếm mù)
- **DFS (Depth-First Search):** Duyệt theo chiều sâu sử dụng Stack (hoặc đệ quy). Không tối ưu, độ phức tạp không gian thấp $O(bm)$ với $b$ là hệ số nhánh và $m$ là chiều sâu tối đa.
- **BFS (Breadth-First Search):** Duyệt theo chiều rộng sử dụng Queue. Bảo đảm tìm thấy lời giải ngắn nhất (tối ưu) nếu trọng số các cạnh bằng nhau. Độ phức tạp không gian cao $O(b^d)$ với $d$ là độ sâu của đích.

### 2. Tìm kiếm có thông tin (Heuristic Search)
Tận dụng tri thức bổ trợ dưới dạng hàm heuristic $h(n)$ (ước lượng khoảng cách từ trạng thái hiện tại $n$ đến đích).
- **Greedy Best-First Search:** Đánh giá nút bằng hàm $f(n) = h(n)$, đi theo hướng có vẻ gần đích nhất. Dễ bị rơi vào cực trị địa phương.
- **Giải thuật A* Search:** Giải thuật tìm kiếm tối ưu nổi tiếng, đánh giá nút bằng:
  $$f(n) = g(n) + h(n)$$
  Trong đó $g(n)$ là chi phí thực tế từ điểm bắt đầu đến $n$, và $h(n)$ là chi phí ước lượng từ $n$ đến đích.

### 3. Điều kiện tối ưu của A*
- **Tính chấp nhận được (Admissibility):** Hàm heuristic $h(n)$ chấp nhận được nếu nó không bao giờ đánh giá cao hơn chi phí thực tế tối thiểu đến đích: $0 \le h(n) \le h^*(n)$.
- **Tính nhất quán (Consistency / Monotonicity):** Với mọi nút $n$ và nút con $n''$ kề nó được chuyển qua hành động $a$, ta có:
  $$h(n) \le c(n, a, n'') + h(n'')$$
  Heuristic nhất quán bảo đảm rằng $f(n)$ tăng đơn điệu dọc theo mọi đường đi.', 
    'core-theory', 
    '["Bài toán tìm đường đi ngắn nhất trên bản đồ giao thông đường bộ sử dụng khoảng cách đường chim bay làm hàm heuristic h(n) chấp nhận được.", "Tìm kiếm trạng thái giải trò chơi 8-puzzle sử dụng số lượng mảnh nằm sai vị trí làm heuristic h1(n) hoặc khoảng cách Manhattan làm h2(n)."]'::jsonb, 
    '["BFS bảo đảm tính tối ưu nếu chi phí các bước nhảy bằng nhau, ngược lại giải thuật Dijkstra hoặc A* là bắt buộc.", "Heuristic nhất quán (consistent) chắc chắn là chấp nhận được (admissible), nhưng chiều ngược lại không phải lúc nào cũng đúng.", "A* mở rộng số lượng nút ít nhất so với bất kỳ giải thuật tìm kiếm tối ưu nào khác sử dụng cùng hàm heuristic."]'::jsonb, 
    6, 
    TRUE,
    'search-heuristics'
  ),
  (
    'cs_ai_02', 
    'cs_artificial_intelligence', 
    13, 
    'Tìm kiếm & Heuristics', 
    'Tìm kiếm đối kháng (Minimax & Cắt tỉa Alpha-Beta)', 
    '### 1. Thuật toán Minimax
Được áp dụng trong các trò chơi đối kháng hai người chơi có thông tin hoàn hảo (như Cờ vua, Cờ caro).
- Hai người chơi: **MAX** (cố gắng tối đa hóa điểm số của mình) và **MIN** (cố gắng tối thiểu hóa điểm số của MAX).
- Thuật toán duyệt đệ quy cây trò chơi để tính toán nước đi tối ưu tại mỗi trạng thái:
  - Nếu là nút MAX: chọn giá trị lớn nhất từ các nút con.
  - Nếu là nút MIN: chọn giá trị nhỏ nhất từ các nút con.

### 2. Kỹ thuật cắt tỉa Alpha-Beta (Alpha-Beta Pruning)
Cắt tỉa Alpha-Beta giúp tăng tốc độ tìm kiếm bằng cách bỏ qua các nhánh chắc chắn không ảnh hưởng đến quyết định cuối cùng ở nút gốc.
- **$\alpha$ (Alpha):** Giá trị tốt nhất (lớn nhất) mà nút MAX bảo đảm đạt được cho đến nay dọc theo đường đi. Mặc định khởi tạo bằng $-\infty$.
- **$\beta$ (Beta):** Giá trị tốt nhất (nhỏ nhất) mà nút MIN bảo đảm đạt được cho đến nay dọc theo đường đi. Mặc định khởi tạo bằng $+\infty$.
- **Điều kiện cắt tỉa:** Khi duyệt cây, nếu phát hiện tại một nút nào đó có điều kiện:
  $$\alpha \ge \beta$$
  Ta lập tức ngừng duyệt tất cả các nhánh con còn lại của nút đó (cắt tỉa).

### 3. Tối ưu hóa thứ tự duyệt
Hiệu năng cắt tỉa phụ thuộc mạnh mẽ vào thứ tự duyệt các nước đi. Nếu duyệt các nước đi tốt nhất trước, ta đạt độ phức tạp thời gian tối ưu là $O(b^{d/2})$, cho phép nhìn sâu gấp đôi so với Minimax thông thường.', 
    'core-theory', 
    '["Triển khai AI chơi cờ Tic-Tac-Toe sử dụng cây trò chơi Minimax hoàn chỉnh vì số lượng trạng thái nhỏ.", "Mô phỏng quá trình cắt tỉa Alpha-Beta trên cây trò chơi 3 tầng để chỉ ra các nhánh bị loại bỏ."]'::jsonb, 
    '["Alpha-Beta Pruning không hề làm thay đổi kết quả nước đi tối ưu của Minimax, nó chỉ làm giảm số lượng nút cần duyệt.", "Tham số alpha chỉ được cập nhật tại các nút MAX, tham số beta chỉ được cập nhật tại các nút MIN.", "Trong các game phức tạp như cờ vua, ta phải giới hạn độ sâu duyệt và sử dụng hàm lượng giá trạng thái (Evaluation function) thay vì duyệt đến lá."]'::jsonb, 
    7, 
    TRUE,
    'search-heuristics'
  ),
  (
    'cs_ai_03', 
    'cs_artificial_intelligence', 
    13, 
    'Biểu diễn tri thức & Logic', 
    'Logic mệnh đề & Logic vị từ bậc nhất (First-Order Logic)', 
    '### 1. Logic mệnh đề (Propositional Logic)
Logic mệnh đề biểu diễn tri thức dưới dạng các mệnh đề đúng/sai (ví dụ $P, Q$) kết hợp bằng các toán tử logic:
- Phủ định ($\neg$), Hội ($\land$), Tuyển ($\lor$), Kéo theo ($\rightarrow$), Tương đương ($\leftrightarrow$).
- Bảng chân trị (Truth Table) dùng để xác minh tính thỏa mãn của câu logic.

### 2. Logic vị từ bậc nhất (First-Order Logic - FOL)
Logic mệnh đề thiếu khả năng biểu diễn tổng quát các đối tượng và mối quan hệ. FOL bổ sung các khái niệm mạnh mẽ:
- **Đối tượng (Objects):** Con người, ngôi nhà, con số.
- **Quan hệ (Relations / Predicates):** `LaCha(x, y)`, `LieuLinh(x)`.
- **Hàm (Functions):** `MeCua(x)`.
- **Lượng từ (Quantifiers):**
  - Lượng từ với mọi ($\forall$): Ví dụ $\forall x \text{ ConNguoi}(x) \rightarrow \text{PhaiChet}(x)$.
  - Lượng từ tồn tại ($\exists$): Ví dụ $\exists x \text{ ConNguoi}(x) \land \text{LaHacker}(x)$.

### 3. Skolem hóa (Skolemization)
Quá trình loại bỏ lượng từ tồn tại $\exists$ trong FOL để đưa câu về dạng chuẩn hội (CNF) phục vụ suy diễn tự động. Ta thay thế biến được định lượng tồn tại bằng một hằng số Skolem mới (nếu nằm ngoài phạm vi $\forall$) hoặc một hàm Skolem của các biến được định lượng với mọi xung quanh.', 
    'core-theory', 
    '["Chuyển câu tiếng Việt sang FOL: ''Mọi người cha đều yêu thương con của mình'' thành \\(\\forall x \\forall y \\text{ChaCua}(x, y) \\rightarrow \\text{YeuThuong}(x, y)\\).", "Skolem hóa câu \\(\\forall x \\exists y \\text{ConCua}(y, x)\\) thành \\(\\forall x \\text{ConCua}(f(x), x)\\) với f là hàm Skolem."]'::jsonb, 
    '["Logic mệnh đề có tính quyết định được (decidable) vì luôn có thể dùng bảng chân trị, nhưng FOL là bán quyết định được (semi-decidable).", "Toán tử kéo theo P -> Q chỉ sai khi P đúng và Q sai, các trường hợp khác đều đúng.", "Lượng từ \\(\\forall\\) thường đi kèm toán tử kéo theo (\\(\\rightarrow\\)), lượng từ \\(\\exists\\) thường đi kèm toán tử hội (\\(\\land\\))."]'::jsonb, 
    6, 
    TRUE,
    'knowledge-logic'
  ),
  (
    'cs_ai_04', 
    'cs_artificial_intelligence', 
    13, 
    'Biểu diễn tri thức & Logic', 
    'Hệ chuyên gia & Suy diễn logic (Expert Systems)', 
    '### 1. Kiến trúc Hệ chuyên gia (Expert Systems)
Hệ chuyên gia là chương trình AI mô phỏng khả năng ra quyết định của chuyên gia con người trong một lĩnh vực hẹp. Gồm 2 thành phần cốt lõi biệt lập:
- **Cơ sở tri thức (Knowledge Base):** Chứa tri thức chuyên ngành biểu diễn dưới dạng các luật sản xuất: `IF <tiền đề> THEN <kết luận>`.
- **Động cơ suy diễn (Inference Engine):** Bộ não điều khiển việc vận dụng các luật để rút ra kết luận mới.

### 2. Các phương pháp suy diễn luật
- **Suy diễn tiến (Forward Chaining):** Xuất phát từ các sự kiện đã biết (Fact), tìm các luật có tiền đề thỏa mãn để sinh ra sự kiện mới. Quá trình lặp lại cho đến khi đạt được đích hoặc không còn luật nào thỏa mãn. Phương pháp này hướng dữ liệu (data-driven).
- **Suy diễn lùi (Backward Chaining):** Xuất phát từ mục tiêu cần chứng minh (Goal), tìm các luật có kết luận trùng với mục tiêu, sau đó đặt các tiền đề của luật đó làm mục tiêu phụ mới cần chứng minh. Phương pháp này hướng mục tiêu (goal-driven).

### 3. Phép phân giải (Resolution Rule)
Quy tắc suy diễn nền tảng trong chứng minh định lý tự động. Với hai câu dạng tuyển chứa các vị từ đối lập:
$$(P \lor Q) \land (\neg P \lor R) \vdash (Q \lor R)$$
Ta triệt tiêu vị từ đối lập $P$ và $\neg P$ để tạo ra câu mới (Resolvent).', 
    'core-theory', 
    '["Hệ chuyên gia chẩn đoán y khoa MYCIN sử dụng luật sản xuất và suy diễn lùi để đề xuất phác đồ điều trị bệnh nhiễm trùng máu.", "Chứng minh P đúng bằng phương pháp phản chứng (Refutation): thêm \\(\\neg P\\) vào cơ sở tri thức rồi dùng phép phân giải chứng minh thu được mâu thuẫn (rỗng \\(\\square\\))."]'::jsonb, 
    '["Suy diễn tiến phù hợp cho các bài toán thiết kế, lập cấu hình hoặc lập kế hoạch từ dữ liệu thô.", "Suy diễn lùi phù hợp cho bài toán chẩn đoán lỗi, điều tra nguyên nhân khi đã biết triệu chứng cuối cùng.", "Phép hợp nhất (Unification) trong FOL giúp tìm phép thế biến đồng nhất để thực hiện phép phân giải trên các vị từ khác nhau về tham số."]'::jsonb, 
    6, 
    TRUE,
    'knowledge-logic'
  ),
  (
    'cs_ai_05', 
    'cs_artificial_intelligence', 
    13, 
    'Học máy cơ bản', 
    'Học có giám sát vs Học không giám sát', 
    '### 1. Học có giám sát (Supervised Learning)
Mô hình học từ tập dữ liệu huấn luyện đã được gán nhãn sẵn: $\mathcal{D} = \{(x_i, y_i)\}_{i=1}^N$.
- **Phân loại (Classification):** Nhãn $y$ thuộc tập rời rạc (ví dụ: Email rác hay không rác, nhận diện chữ số).
- **Hồi quy (Regression):** Nhãn $y$ thuộc miền giá trị liên tục (ví dụ: Dự đoán giá nhà, dự đoán nhiệt độ).

### 2. Học không giám sát (Unsupervised Learning)
Mô hình tự khám phá cấu trúc ẩn từ tập dữ liệu chưa gán nhãn: $\mathcal{D} = \{x_i\}_{i=1}^N$.
- **Phân cụm (Clustering):** Gom nhóm các điểm dữ liệu có đặc điểm tương đồng lại với nhau (ví dụ: thuật toán K-Means, DBSCAN).
- **Giảm chiều dữ liệu (Dimensionality Reduction):** Giảm số lượng đặc trưng nhưng vẫn giữ lại tối đa thông tin cốt lõi (ví dụ: thuật toán PCA - Principal Component Analysis).

### 3. Đánh giá mô hình phân loại (Confusion Matrix)
- **Precision (Độ chính xác trên tập dự đoán dương):**
  $$\text{Precision} = \frac{TP}{TP + FP}$$
- **Recall (Độ nhạy - tỉ lệ tìm thấy thực tế):**
  $$\text{Recall} = \frac{TP}{TP + FN}$$
- **F1-Score (Trung bình điều hòa giữa Precision và Recall):**
  $$F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$', 
    'core-theory', 
    '["Huấn luyện mô hình phân loại ảnh chó/mèo từ tập 10,000 ảnh đã được gán nhãn thủ công (Supervised).", "Gom nhóm khách hàng dựa vào hành vi mua sắm trên sàn thương mại điện tử bằng K-Means để tối ưu quảng cáo (Unsupervised)."]'::jsonb, 
    '["Học có giám sát bắt buộc phải có tập nhãn chuẩn Ground Truth để tối ưu hóa hàm mất mát (Loss function).", "K-Means cực kỳ nhạy cảm với việc chọn số cụm K ban đầu và các điểm ngoại lai (Outliers).", "F1-Score là thước đo chuẩn xác hơn Accuracy khi làm việc với tập dữ liệu mất cân bằng nhãn nghiêm trọng."]'::jsonb, 
    5, 
    TRUE,
    'machine-learning'
  ),
  (
    'cs_ai_06', 
    'cs_artificial_intelligence', 
    13, 
    'Học máy cơ bản', 
    'Hồi quy tuyến tính & Logistic Regression', 
    '### 1. Hồi quy tuyến tính (Linear Regression)
Dự đoán biến mục tiêu liên tục $y$ dựa trên tổ hợp tuyến tính của các biến đầu vào $x$:
$$\hat{y} = w^T x + b$$
- **Hàm mất mát (Loss function):** Thường sử dụng sai số bình phương trung bình (Mean Squared Error - MSE):
  $$\mathcal{L}(w, b) = \frac{1}{2N} \sum_{i=1}^N (w^T x_i + b - y_i)^2$$
- **Tối ưu hóa:** Tìm $w, b$ bằng giải thuật **Hạ gradient (Gradient Descent)**:
  $$w \leftarrow w - \eta \frac{\partial \mathcal{L}}{\partial w}$$

### 2. Logistic Regression (Hồi quy Logistic)
Mặc dù tên là hồi quy nhưng thực tế được dùng cho bài toán phân loại nhị phân (Binary Classification).
- Ánh xạ đầu ra tuyến tính sang không gian xác suất $[0, 1]$ bằng hàm kích hoạt phi tuyến **Sigmoid**:
  $$\sigma(z) = \frac{1}{1 + e^{-z}}$$
- Công thức mô hình xác suất: $P(y=1|x) = \sigma(w^T x + b)$.
- **Hàm mất mát:** Entropy chéo nhị phân (Binary Cross-Entropy Loss):
  $$\mathcal{L}(w, b) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]$$
  Hàm mất mát này lồi (convex), bảo đảm Gradient Descent tìm thấy điểm tối ưu toàn cục.', 
    'core-theory', 
    '["Dự đoán doanh thu bán hàng dựa trên chi phí chạy quảng cáo Facebook sử dụng Linear Regression.", "Xác định khả năng một giao dịch thẻ tín dụng là giả mạo (0 hoặc 1) dựa trên giá trị giao dịch và vị trí địa lý dùng Logistic Regression."]'::jsonb, 
    '["Linear Regression giả định mối quan hệ giữa biến độc lập và biến phụ thuộc là tuyến tính; nhạy cảm với hiện tượng đa cộng tuyến (Multicollinearity).", "Hàm Sigmoid ép giá trị từ vô cực về dải sát (0, 1), đóng vai trò phân chia ranh giới quyết định (Decision boundary) dạng siêu phẳng.", "Hạ gradient với tốc độ học (Learning rate) quá lớn sẽ làm thuật toán phân kỳ, ngược lại quá nhỏ sẽ làm hội tụ cực kỳ chậm."]'::jsonb, 
    6, 
    TRUE,
    'machine-learning'
  ),
  (
    'cs_ai_07', 
    'cs_artificial_intelligence', 
    13, 
    'Học máy cơ bản', 
    'Cây quyết định & Rừng ngẫu nhiên (Decision Trees, Random Forest)', 
    '### 1. Cây quyết định (Decision Tree)
Mô hình phân loại trực quan dạng cây. Tại mỗi nút không phải lá, thuật toán thực hiện phép so sánh giá trị đặc trưng để rẽ nhánh.
- **Tiêu chí phân tách (Splitting Criteria):** Chọn đặc trưng phân tách tốt nhất dựa trên:
  - **Entropy:** Thước đo độ hỗn loạn thông tin của tập dữ liệu:
    $$H(S) = - \sum_{i} p_i \log_2(p_i)$$
  - **Độ lợi thông tin (Information Gain):** Chênh lệch Entropy trước và sau khi phân tách. Chọn đặc trưng tối đa hóa Information Gain.
  - **Chỉ số Gini (Gini Impurity):** Đo lường mức độ phân loại sai ngẫu nhiên:
    $$I_G(S) = 1 - \sum p_i^2$$

### 2. Rừng ngẫu nhiên (Random Forest)
Phương pháp học máy tập hợp (Ensemble Learning) mạnh mẽ kết hợp nhiều cây quyết định độc lập.
- **Bagging (Bootstrap Aggregating):** Lấy mẫu ngẫu nhiên có thay thế từ tập dữ liệu huấn luyện gốc để tạo ra nhiều tập dữ liệu con khác nhau cho mỗi cây.
- **Lấy mẫu đặc trưng ngẫu nhiên:** Tại mỗi nút phân tách, cây chỉ chọn ngẫu nhiên một nhóm nhỏ các đặc trưng để so sánh, giảm thiểu sự tương quan chéo giữa các cây.
- **Kết quả cuối cùng:** Kết hợp bình chọn số đông (Majority Vote) cho bài toán phân loại hoặc tính trung bình cho hồi quy.', 
    'core-theory', 
    '["Xây dựng cây quyết định tự động phân loại hồ sơ vay vốn ngân hàng dựa trên thu nhập và điểm tín dụng.", "Huấn luyện Random Forest gồm 100 cây quyết định để nhận diện chữ viết tay số hóa có độ chính xác cực cao và chống quá khớp."]'::jsonb, 
    '["Cây quyết định đơn lẻ rất dễ bị hiện tượng quá khớp (Overfitting) khi phát triển quá sâu; khắc phục bằng cách tỉa cành (Pruning) hoặc khống chế độ sâu tối đa.", "Random Forest là mô hình hộp đen (Black-box) khó giải thích cấu trúc trực quan hơn cây quyết định đơn nhưng có khả năng tổng quát hóa dữ liệu vượt trội.", "Bằng cách kết hợp nhiều cây độc lập yếu (weak learners), Random Forest làm giảm đáng kể phương sai (variance) của mô hình."]'::jsonb, 
    6, 
    TRUE,
    'machine-learning'
  ),
  (
    'cs_ai_08', 
    'cs_artificial_intelligence', 
    13, 
    'Mạng Nơ-ron & Deep Learning', 
    'Mạng nơ-ron nhân tạo (Perceptron & MLP)', 
    '### 1. Mô hình Perceptron đơn giản
Là đơn vị cấu tạo cơ bản của mạng nơ-ron (nhân tạo đơn lẻ):
$$y = f(w^T x + b) = f\left(\sum_{i=1}^d w_i x_i + b\right)$$
- Trong đó $x$ là vector đầu vào, $w$ là trọng số (weights), $b$ là bias, và $f$ là hàm kích hoạt bước (Step function).
- **Hạn chế:** Perceptron chỉ phân loại được các tập dữ liệu phân tách tuyến tính (Linearly separable). Nó hoàn toàn thất bại trước bài toán cổng logic phi tuyến **XOR**.

### 2. Mạng nơ-ron đa tầng (Multi-Layer Perceptron - MLP)
Giải quyết bài toán phi tuyến bằng cách xếp chồng nhiều tầng nơ-ron:
- **Tầng đầu vào (Input Layer).**
- **Một hoặc nhiều tầng ẩn (Hidden Layers):** Nơi diễn ra các phép biến đổi phi tuyến biểu diễn các đặc trưng phức tạp.
- **Tầng đầu ra (Output Layer).**
- Bắt buộc phải sử dụng các hàm kích hoạt phi tuyến giữa các tầng ẩn để tránh việc mạng đa tầng bị suy sụp toán học thành một phép biến đổi tuyến tính đơn cấp.', 
    'core-theory', 
    '["Vẽ đồ thị biểu diễn mặt phẳng phân tách của Perceptron cho hàm AND/OR, và chứng minh trực quan tại sao không thể vẽ một đường thẳng phân tách cổng XOR.", "Kiến trúc MLP gồm 784 nút đầu vào, 1 tầng ẩn 128 nút, và 10 nút đầu ra phân loại ảnh chữ số viết tay MNIST."]'::jsonb, 
    '["Định lý xấp xỉ phổ quát (Universal Approximation Theorem) chỉ ra rằng một mạng MLP chỉ cần 1 tầng ẩn với đủ số lượng nơ-ron và hàm kích hoạt phi tuyến có thể xấp xỉ mọi hàm số liên tục.", "Nếu bỏ qua hàm kích hoạt phi tuyến (activation function), tích của các ma trận trọng số liên tiếp chỉ tương đương với một ma trận tuyến tính duy nhất.", "Trọng số trong MLP được khởi tạo ngẫu nhiên nhỏ (ví dụ Xavier/He initialization) để phá vỡ tính đối xứng khi huấn luyện."]'::jsonb, 
    6, 
    TRUE,
    'neural-networks'
  ),
  (
    'cs_ai_09', 
    'cs_artificial_intelligence', 
    13, 
    'Mạng Nơ-ron & Deep Learning', 
    'Lan truyền ngược (Backpropagation) & Hàm kích hoạt', 
    '### 1. Thuật toán lan truyền ngược (Backpropagation)
Thuật toán tính toán gradient của hàm mất mát đối với tất cả trọng số trong mạng nơ-ron để cập nhật trọng số.
- Dựa trên quy tắc đạo hàm chuỗi **Chain Rule** của giải tích:
  $$\frac{\partial \mathcal{L}}{\partial w_{ij}} = \frac{\partial \mathcal{L}}{\partial a_j} \cdot \frac{\partial a_j}{\partial z_j} \cdot \frac{\partial z_j}{\partial w_{ij}}$$
- Quy trình gồm 2 bước tuần hoàn:
  1. **Lan truyền xuôi (Forward pass):** Tính giá trị kích hoạt của các tầng từ đầu vào ra đầu ra để tính Loss.
  2. **Lan truyền ngược (Backward pass):** Tính toán gradient sai số từ tầng ra ngược về các tầng ẩn trước đó.

### 2. Các hàm kích hoạt phi tuyến (Activation Functions)
- **Sigmoid:** $\sigma(x) = \frac{1}{1 + e^{-x}}$. Dải ra $(0, 1)$. Điểm yếu: gây hiện tượng triệt tiêu gradient (Vanishing Gradient) khi đầu vào quá lớn hoặc quá âm.
- **Tanh (Hyperbolic Tangent):** $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$. Dải ra $(-1, 1)$, đối xứng qua gốc tọa độ. Vẫn bị vanishing gradient.
- **ReLU (Rectified Linear Unit):** $f(x) = \max(0, x)$. Đạo hàm bằng 1 với $x > 0$. Giúp giải quyết triệt tiêu gradient và tính toán cực nhanh. Điểm yếu: lỗi chết nơ-ron (Dying ReLU) khi giá trị âm triệt tiêu vĩnh viễn.', 
    'core-theory', 
    '["Mô tả toán học của quy tắc chuỗi Chain Rule khi tính đạo hàm lỗi qua 2 tầng ẩn của MLP.", "Lập bảng so sánh công thức, đồ thị đạo hàm và ưu/nhược điểm của Sigmoid, Tanh và ReLU."]'::jsonb, 
    '["Hiện tượng triệt tiêu gradient (Vanishing Gradient) xảy ra vì đạo hàm của Sigmoid ở các vùng biên cực kỳ nhỏ (cận 0), khi nhân chuỗi ngược về các tầng đầu, gradient biến mất làm trọng số ngừng cập nhật.", "ReLU có đạo hàm bằng 1 ở miền dương giúp dòng gradient đi ngược về các tầng trước nguyên vẹn, là chìa khóa giúp huấn luyện các mạng cực sâu.", "Leaky ReLU: f(x) = max(0.01x, x) được thiết kế để khắc phục lỗi Dying ReLU bằng cách giữ lại đạo hàm nhỏ ở miền âm."]'::jsonb, 
    7, 
    TRUE,
    'neural-networks'
  ),
  (
    'cs_ai_10', 
    'cs_artificial_intelligence', 
    13, 
    'Mạng Nơ-ron & Deep Learning', 
    'Xử lý ngôn ngữ tự nhiên & Mô hình Transformers', 
    '### 1. Sự phát triển xử lý chuỗi trong NLP
- **RNN (Recurrent Neural Networks):** Xử lý dữ liệu chuỗi tuần tự theo thời gian, cập nhật trạng thái ẩn (hidden state). Yếu điểm: Mất trí nhớ dài hạn (Vanishing gradient qua thời gian) và không thể tính toán song song hóa.
- **LSTM (Long Short-Term Memory):** Bổ sung cổng Cell State và các cổng kiểm soát thông tin (Forget, Input, Output gate) để lưu giữ thông tin dài hạn tốt hơn. Vẫn bị nghẽn do tuần tự.

### 2. Kiến trúc Transformers & Cơ chế Tự chú ý (Self-Attention)
Được giới thiệu trong bài báo "Attention Is All You Need" (2017), loại bỏ hoàn toàn cấu trúc RNN tuần tự.
- **Self-Attention:** Cho phép mô hình đánh giá mức độ liên quan giữa các từ trong câu đồng thời, bất kể khoảng cách vật lý của chúng.
- Phép toán được thực hiện qua các ma trận **Query ($Q$)**, **Key ($K$)**, và **Value ($V$)** tạo ra từ vector nhúng của từ:
  $$\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V$$
  Trong đó $d_k$ là chiều của vector Key dùng để chuẩn hóa tránh trị số Softmax quá lớn làm triệt tiêu gradient.
- **Multi-Head Attention:** Chạy song song nhiều bộ Attention độc lập để học các mối quan hệ ngữ nghĩa ở các góc nhìn khác nhau.
- **Positional Encoding:** Bổ sung thông tin vị trí của từ vào dữ liệu đầu vào vì kiến trúc Transformers xử lý song song toàn bộ câu cùng lúc.', 
    'core-theory', 
    '["Giải thích cơ chế Self-Attention qua câu: ''Con sông này chảy xiết vì dòng của nó rất mạnh'', từ ''nó'' sẽ có trọng số liên kết (attention weight) cực cao với từ ''con sông''.", "Mô tả kiến trúc Encoder-Decoder của Transformers ứng dụng trong dịch thuật tự động."]'::jsonb, 
    '["Nhờ xử lý song song toàn bộ chuỗi đầu vào cùng lúc thay vì duyệt từng từ tuần tự, Transformers tận dụng tối đa sức mạnh tính toán song song của phần cứng GPU.", "Hệ số chia căn bậc hai của d_k trong công thức Attention đóng vai trò cực kỳ quan trọng: giữ cho tích vô hướng không bị phình quá to, tránh đưa hàm Softmax vào vùng bão hòa đạo hàm sát 0.", "Mô hình ngôn ngữ lớn (LLM) như GPT được xây dựng dựa trên phần Decoder của kiến trúc Transformers."]'::jsonb, 
    8, 
    TRUE,
    'neural-networks'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_ai_01', 'search-heuristics', 'lesson', 'Tìm kiếm mù và tìm kiếm heuristics (DFS, BFS, A*)', '{"lesson_id": "cs_ai_01"}'::jsonb, 10, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_02', 'search-heuristics', 'lesson', 'Tìm kiếm đối kháng (Minimax & Cắt tỉa Alpha-Beta)', '{"lesson_id": "cs_ai_02"}'::jsonb, 20, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_03', 'knowledge-logic', 'lesson', 'Logic mệnh đề & Logic vị từ bậc nhất (FOL)', '{"lesson_id": "cs_ai_03"}'::jsonb, 10, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_04', 'knowledge-logic', 'lesson', 'Hệ chuyên gia & Suy diễn logic (Expert Systems)', '{"lesson_id": "cs_ai_04"}'::jsonb, 20, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_05', 'machine-learning', 'lesson', 'Học có giám sát vs Học không giám sát', '{"lesson_id": "cs_ai_05"}'::jsonb, 10, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_06', 'machine-learning', 'lesson', 'Hồi quy tuyến tính & Logistic Regression', '{"lesson_id": "cs_ai_06"}'::jsonb, 20, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_07', 'machine-learning', 'lesson', 'Cây quyết định & Rừng ngẫu nhiên', '{"lesson_id": "cs_ai_07"}'::jsonb, 30, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_08', 'neural-networks', 'lesson', 'Mạng nơ-ron nhân tạo (Perceptron & MLP)', '{"lesson_id": "cs_ai_08"}'::jsonb, 10, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_09', 'neural-networks', 'lesson', 'Lan truyền ngược & Hàm kích hoạt phi tuyến', '{"lesson_id": "cs_ai_09"}'::jsonb, 20, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-lesson-cs_ai_10', 'neural-networks', 'lesson', 'Xử lý ngôn ngữ tự nhiên & Mô hình Transformers', '{"lesson_id": "cs_ai_10"}'::jsonb, 30, 10, 20, 'cs_artificial_intelligence', 13)
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
