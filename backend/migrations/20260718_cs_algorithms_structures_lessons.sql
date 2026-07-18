-- SQL migration to seed topics and 10 core lessons for cs_algorithms_structures (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed Topics for cs_algorithms_structures (grade_tier = 13)
INSERT INTO ge10_topics (id, subject, grade_tier, name, description, sort_order, ham_nguyen_to, exam_relevance, min_questions, question_types)
VALUES 
  ('algorithm-fundamentals', 'cs_algorithms_structures', 13, 'Nền tảng Thuật toán', 'Phân tích Big O, thuật toán sắp xếp (Quick/Merge/Heap) và kỹ thuật Chia để trị (Divide and Conquer).', 1, 'thach', 'high', 30, ARRAY['mcq']::varchar[]),
  ('basic-data-structures', 'cs_algorithms_structures', 13, 'Cấu trúc dữ liệu Tuyến tính & Băm', 'Lập trình mảng tĩnh/động, danh sách liên kết, cơ chế Stack/Queue/Heap và thiết kế bảng băm giải quyết xung đột.', 2, 'hoa', 'high', 30, ARRAY['mcq']::varchar[]),
  ('advanced-data-structures', 'cs_algorithms_structures', 13, 'Cấu trúc Cây & Quy hoạch động', 'Cây tìm kiếm nhị phân (BST), cây tự cân bằng (AVL, Red-Black) và kỹ thuật thiết kế giải thuật Quy hoạch động.', 3, 'bang', 'high', 30, ARRAY['mcq']::varchar[]),
  ('graph-algorithms', 'cs_algorithms_structures', 13, 'Giải thuật Đồ thị & Tìm đường', 'Biểu diễn đồ thị, thuật toán duyệt đồ thị (BFS, DFS) và thuật toán tìm đường đi ngắn nhất (Dijkstra, Bellman-Ford).', 4, 'phong', 'high', 30, ARRAY['mcq']::varchar[])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  ham_nguyen_to = EXCLUDED.ham_nguyen_to,
  exam_relevance = EXCLUDED.exam_relevance,
  min_questions = EXCLUDED.min_questions,
  question_types = EXCLUDED.question_types;

-- 2. Seed Lessons for cs_algorithms_structures (grade_tier = 13)
INSERT INTO ge10_lessons (id, subject, grade_tier, topic, title, theory, category, examples, practice_points, difficulty, is_standard, topic_id)
VALUES
  (
    'cs_algo_01', 
    'cs_algorithms_structures', 
    13, 
    'Nền tảng Thuật toán', 
    'Độ phức tạp Thuật toán (Big O Notation)', 
    '### 1. Phân tích độ phức tạp thuật toán
Để đánh giá hiệu năng của một thuật toán, ta không đo thời gian chạy thực tế (vì phụ thuộc vào phần cứng máy tính) mà đo xu hướng tăng lượng chỉ thị máy tính thực thi khi kích thước đầu vào $N$ tiến tới vô cùng.

### 2. Độ phức tạp thời gian chạy (Time Complexity)
Các bậc Big O phổ biến xếp theo hiệu năng từ nhanh đến chậm:
- $O(1)$ (Thời gian hằng số): Không phụ thuộc vào đầu vào (ví dụ: truy cập phần tử mảng qua chỉ số).
- $O(\log N)$ (Thời gian logarit): Mỗi bước chia đôi không gian tìm kiếm (ví dụ: tìm kiếm nhị phân).
- $O(N)$ (Thời gian tuyến tính): Thời gian tăng tỉ lệ thuận với $N$ (ví dụ: duyệt qua mảng 1 chiều).
- $O(N \log N)$ (Thời gian tuyến tính - logarit): Đặc trưng của các thuật toán sắp xếp tối ưu (Merge Sort, Quick Sort).
- $O(N^2)$ (Thời gian bậc hai): Thường xuất hiện ở hai vòng lặp lồng nhau (ví dụ: Bubble Sort).
- $O(2^N)$ (Thời gian mũ): Tăng cực kỳ nhanh (ví dụ: đệ quy Fibonacci ngây thơ).

### 3. Phân tích Không gian bộ nhớ (Space Complexity)
Đo lượng bộ nhớ phụ tối đa mà thuật toán cần sử dụng ngoài bộ nhớ cấp phát cho dữ liệu đầu vào.', 
    'core-theory', 
    '["Hàm lấy phần tử đầu tiên của mảng có độ phức tạp thời gian là O(1) và không gian là O(1).", "Thuật toán tìm kiếm nhị phân có độ phức tạp thời gian là O(log N) và không gian là O(1) nếu viết dạng lặp."]'::jsonb, 
    '["Luôn phân tích trường hợp xấu nhất (Worst-case) để đảm bảo độ tin cậy hệ thống.", "Tối ưu hóa thời gian chạy đôi khi đòi hỏi sự đánh đổi (trade-off) bằng cách dùng thêm nhiều bộ nhớ hơn (Space-Time Tradeoff).", "Tránh việc viết các thuật toán có độ phức tạp O(N^2) khi kích thước đầu vào N lớn hơn 10,000."]'::jsonb, 
    5, 
    TRUE,
    'algorithm-fundamentals'
  ),
  (
    'cs_algo_02', 
    'cs_algorithms_structures', 
    13, 
    'Cấu trúc dữ liệu Tuyến tính & Băm', 
    'Mảng & Danh sách liên kết (Arrays & Linked Lists)', 
    '### 1. Cấu trúc Mảng (Array)
- **Mảng tĩnh:** Các phần tử được lưu trữ liên tiếp trong bộ nhớ. Kích thước cố định khi khởi tạo.
- **Mảng động (vector/ArrayList):** Tự động nhân đôi kích thước khi đầy.
- **Hiệu năng:**
  - Truy cập ngẫu nhiên qua chỉ số: $O(1)$.
  - Chèn/Xoá ở vị trí bất kỳ: $O(N)$ (vì phải dịch chuyển các phần tử kế tiếp).

### 2. Danh sách liên kết (Linked List)
- **Đặc trưng:** Gồm nhiều nút (Nodes) phân tán trong bộ nhớ, mỗi nút chứa dữ liệu và con trỏ trỏ tới nút tiếp theo (`next`).
- **Phân loại:**
  - Danh sách liên kết đơn (Singly Linked List): Một con trỏ trỏ tới node kế tiếp.
  - Danh sách liên kết đôi (Doubly Linked List): Có thêm con trỏ `prev` trỏ ngược lại node trước đó.
- **Hiệu năng:**
  - Truy cập phần tử ngẫu nhiên: $O(N)$ (phải duyệt từ đầu).
  - Chèn/Xoá tại vị trí đã biết con trỏ: $O(1)$ (chỉ cần thay đổi liên kết con trỏ).', 
    'core-theory', 
    '["Triển khai chèn thêm nút mới vào đầu Danh sách liên kết đơn: Node newNode = new Node(data); newNode.next = head; head = newNode;", "Khai báo cấu trúc Node trong C++ gồm con trỏ tự tham chiếu."]'::jsonb, 
    '["Sử dụng mảng khi kích thước dữ liệu cố định và cần truy xuất ngẫu nhiên liên tục.", "Sử dụng Danh sách liên kết khi cần thêm/xóa phần tử ở hai đầu liên tục và không cần truy xuất ngẫu nhiên.", "Luôn kiểm tra kỹ con trỏ NULL khi duyệt hoặc sửa đổi Danh sách liên kết để tránh lỗi sập chương trình."]'::jsonb, 
    6, 
    TRUE,
    'basic-data-structures'
  ),
  (
    'cs_algo_03', 
    'cs_algorithms_structures', 
    13, 
    'Cấu trúc dữ liệu Tuyến tính & Băm', 
    'Ngăn xếp & Hàng đợi (Stacks & Queues)', 
    '### 1. Ngăn xếp (Stack)
- **Nguyên lý:** LIFO (Last In, First Out - Vào sau, Ra trước). Phần tử chèn vào cuối cùng sẽ là phần tử đầu tiên bị xoá khỏi ngăn xếp.
- **Các thao tác chính:**
  - `push(x)`: Đẩy x vào đỉnh stack ($O(1)$).
  - `pop()`: Lấy và xóa phần tử ở đỉnh stack ($O(1)$).

### 2. Hàng đợi (Queue)
- **Nguyên lý:** FIFO (First In, First Out - Vào trước, Ra trước). Phần tử chèn vào đầu tiên sẽ được lấy ra đầu tiên.
- **Các thao tác chính:**
  - `enqueue(x)`: Thêm x vào cuối hàng đợi ($O(1)$).
  - `dequeue()`: Lấy và xóa phần tử ở đầu hàng đợi ($O(1)$).

### 3. Hàng đợi ưu tiên & Binary Heap
- Hàng đợi ưu tiên (Priority Queue) không lấy phần tử theo thời gian vào, mà lấy phần tử có độ ưu tiên cao nhất trước.
- Được xây dựng tối ưu bằng cấu trúc **Binary Heap** (cây nhị phân hoàn chỉnh):
  - Max-Heap: Nút cha luôn lớn hơn hoặc bằng nút con.
  - Min-Heap: Nút cha luôn nhỏ hơn hoặc bằng nút con.', 
    'core-theory', 
    '["Sử dụng Stack để thực hiện kiểm tra tính hợp lệ của các dấu ngoặc đóng mở trong một chuỗi.", "Sử dụng Queue để lập trình giải thuật duyệt cây theo chiều rộng (BFS)."]'::jsonb, 
    '["Stack có thể triển khai đơn giản bằng mảng hoặc danh sách liên kết đơn.", "Khi dùng Queue triển khai bằng mảng tĩnh, cần cấu hình dạng Vòng tròn (Circular Queue) để tái sử dụng không gian ô nhớ trống.", "Cơ chế chèn/xóa phần tử trên Binary Heap chỉ mất O(log N)."]'::jsonb, 
    6, 
    TRUE,
    'basic-data-structures'
  ),
  (
    'cs_algo_04', 
    'cs_algorithms_structures', 
    13, 
    'Cấu trúc dữ liệu Tuyến tính & Băm', 
    'Thiết kế Bảng băm & Giải quyết xung đột (Hash Tables)', 
    '### 1. Khái niệm Bảng băm
Bảng băm (Hash Table) là cấu trúc dữ liệu lưu cặp khóa-giá trị (Key-Value), sử dụng một hàm băm (Hash Function) để chuyển đổi khóa thành chỉ số mảng (index) lưu trữ, giúp thao tác đọc/ghi đạt hiệu năng trung bình là $O(1)$.

### 2. Giải quyết xung đột băm (Collision Resolution)
Xung đột xảy ra khi hai khóa khác nhau qua hàm băm cho ra cùng một chỉ số index.
- **Kỹ thuật Chaining (Phân chuỗi):** Mỗi vị trí chỉ số mảng chứa một danh sách liên kết lưu các phần tử bị trùng.
- **Kỹ thuật Open Addressing (Địa chỉ mở):** Tìm vị trí ô trống khác trong mảng:
  - *Linear Probing:* Quét tuần tự ô tiếp theo ($index + 1, index + 2...$). Dễ gây hiện tượng bó cụm (clustering).
  - *Quadratic Probing:* Quét theo hàm bậc hai ($index + 1^2, index + 2^2...$).
  - *Double Hashing:* Sử dụng một hàm băm phụ thứ hai để tính bước nhảy.', 
    'core-theory', 
    '["Lập trình một hàm băm đơn giản cho chuỗi ký tự bằng cách cộng mã ASCII nhân với một số nguyên tố.", "Mô tả cơ chế Chaining: ô index 3 của mảng trỏ tới danh sách liên kết đơn chứa [Key1 -> Key2]."]'::jsonb, 
    '["Hàm băm tốt phải phân phối đều các khóa trên không gian mảng để giảm thiểu tối đa xung đột.", "Giám sát hệ số tải (Load Factor) alpha = N / M. Khi alpha vượt quá 0.7, cần tiến hành tăng kích thước mảng và băm lại toàn bộ (Rehashing) để giữ hiệu năng O(1).", "Open Addressing đòi hỏi xử lý xóa logic (tombstone) thay vì xóa vật lý dòng dữ liệu để không làm đứt mạch quét."]'::jsonb, 
    7, 
    TRUE,
    'basic-data-structures'
  ),
  (
    'cs_algo_05', 
    'cs_algorithms_structures', 
    13, 
    'Cấu trúc Cây & Quy hoạch động', 
    'Cây tìm kiếm nhị phân (BST) & Cây tự cân bằng', 
    '### 1. Cây tìm kiếm nhị phân (Binary Search Tree)
BST là cây nhị phân mà mỗi nút có thuộc tính: mọi nút thuộc cây con bên trái đều có giá trị nhỏ hơn nút cha, và mọi nút thuộc cây con bên phải đều có giá trị lớn hơn nút cha.

### 2. Thuật toán duyệt cây nhị phân
- **In-order (Trung thứ tự):** Trái -> Cha -> Phải. Trả về danh sách phần tử có thứ tự tăng dần.
- **Pre-order (Tiền thứ tự):** Cha -> Trái -> Phải. Phù hợp sao chép cấu trúc cây.
- **Post-order (Hậu thứ tự):** Trái -> Phải -> Cha. Phù hợp giải phóng bộ nhớ của cây.

### 3. Cây tự cân bằng (AVL & Red-Black Tree)
Trong trường hợp xấu nhất (chèn các số tăng dần), BST bị suy biến thành danh sách liên kết, hiệu năng tìm kiếm giảm từ $O(\log N)$ xuống $O(N)$.
- **AVL Tree:** Cân bằng nghiêm ngặt bằng cách duy trì độ lệch chiều cao giữa hai cây con không quá 1. Sử dụng các phép xoay cây (Left/Right rotation) để cân bằng lại.
- **Red-Black Tree:** Sử dụng thuộc tính màu sắc nút (Đỏ/Đen) để đảm bảo đường đi từ gốc đến nút lá dài nhất không vượt quá 2 lần đường đi ngắn nhất.', 
    'core-theory', 
    '["Viết hàm tìm kiếm đệ quy trên BST trong Java.", "Vẽ cấu trúc cây AVL đơn giản và mô tả phép xoay phải (Right Rotation) để cân bằng khi chèn nút làm lệch bên trái cây."]'::jsonb, 
    '["Tìm kiếm, chèn và xóa trên cây tự cân bằng luôn được bảo đảm ở mức O(log N).", "Duyệt cây BST bằng phương thức In-order luôn sinh ra một dãy số được sắp xếp tăng dần.", "Cây Đỏ-Đen được sử dụng rộng rãi trong các thư viện chuẩn (như TreeMap trong Java, std::map trong C++)."]'::jsonb, 
    7, 
    TRUE,
    'advanced-data-structures'
  ),
  (
    'cs_algo_06', 
    'cs_algorithms_structures', 
    13, 
    'Nền tảng Thuật toán', 
    'Thuật toán Sắp xếp kinh điển (Sorting)', 
    '### 1. Các thuật toán sắp xếp cơ bản ($O(N^2)$)
- **Bubble Sort (Sắp xếp nổi bọt):** Liên tục hoán đổi các phần tử kề nhau nếu sai thứ tự.
- **Insertion Sort (Sắp xếp chèn):** Chèn từng phần tử vào vị trí thích hợp của dãy đã được sắp xếp trước đó. Hiệu năng tốt khi mảng gần như đã được sắp xếp.

### 2. Các thuật toán sắp xếp tối ưu ($O(N \log N)$)
- **Merge Sort (Sắp xếp trộn):** Áp dụng kỹ thuật Chia để trị. Chia đôi mảng thành các phần nhỏ đến khi còn 1 phần tử, sau đó trộn (Merge) chúng lại theo thứ tự. Cần không gian bộ nhớ phụ $O(N)$.
- **Quick Sort (Sắp xếp nhanh):** Chọn một phần tử chốt (Pivot), phân chia mảng thành hai phần (nhỏ hơn pivot và lớn hơn pivot) rồi đệ quy. Không cần bộ nhớ phụ ($O(1)$) nhưng có thể bị suy biến thành $O(N^2)$ nếu chọn pivot tồi.
- **Heap Sort (Sắp xếp vun đống):** Nhét các phần tử vào Max-Heap, liên tục lấy phần tử gốc lớn nhất ra ngoài đưa về cuối mảng.', 
    'core-theory', 
    '["Viết hàm Merge trộn hai mảng con đã sắp xếp trong giải thuật Merge Sort.", "Sử dụng phân vùng Hoare hoặc Lomuto để phân chia mảng trong thuật toán Quick Sort."]'::jsonb, 
    '["Merge Sort là thuật toán sắp xếp ổn định (Stable Sort), giữ nguyên thứ tự của các phần tử trùng lặp.", "Quick Sort thường chạy nhanh hơn Merge Sort trên thực tế vì có tính chất cục bộ bộ nhớ đệm (Cache Locality) tốt hơn.", "Heap Sort có độ phức tạp được bảo đảm là O(N log N) trong mọi trường hợp và không tốn bộ nhớ phụ."]'::jsonb, 
    6, 
    TRUE,
    'algorithm-fundamentals'
  ),
  (
    'cs_algo_07', 
    'cs_algorithms_structures', 
    13, 
    'Giải thuật Đồ thị & Tìm đường', 
    'Biểu diễn Đồ thị & Các giải thuật Duyệt đồ thị (BFS/DFS)', 
    '### 1. Biểu diễn đồ thị trong máy tính
Đồ thị $G = (V, E)$ gồm tập các đỉnh $V$ và tập các cạnh $E$.
- **Ma trận kề (Adjacency Matrix):** Mảng 2 chiều kích thước $V \times V$. Truy xuất nhanh mối liên kết giữa 2 đỉnh ($O(1)$) nhưng tốn không gian bộ nhớ ($O(V^2)$).
- **Danh sách kề (Adjacency List):** Mảng chứa các danh sách liên kết. Tiết kiệm không gian ($O(V + E)$), phù hợp cho đồ thị thưa.

### 2. Thuật toán Duyệt đồ thị
- **BFS (Breadth-First Search - Duyệt theo chiều rộng):**
  - Sử dụng hàng đợi **Queue**.
  - Quét đều các đỉnh lân cận trước khi đi sâu hơn.
  - Ứng dụng: Tìm đường đi ngắn nhất (ít cạnh nhất) trên đồ thị không trọng số.
- **DFS (Depth-First Search - Duyệt theo chiều sâu):**
  - Sử dụng ngăn xếp **Stack** (hoặc đệ quy).
  - Đi sâu nhất có thể theo một nhánh trước khi quay lui (backtracking).
  - Ứng dụng: Phát hiện chu trình, tìm các thành phần liên thông mạnh.', 
    'core-theory', 
    '["Viết code duyệt đồ thị theo chiều rộng BFS bằng Queue trong Python.", "Sử dụng DFS để giải bài toán thoát khỏi mê cung."]'::jsonb, 
    '["Độ phức tạp thời gian của cả BFS và DFS là O(V + E) khi biểu diễn bằng danh sách kề.", "Luôn sử dụng mảng đánh dấu trạng thái (visited array) để tránh duyệt trùng lặp gây lặp vô hạn.", "BFS tìm đường đi ngắn nhất dựa trên số cạnh, không dùng được cho đồ thị có trọng số cạnh khác nhau."]'::jsonb, 
    6, 
    TRUE,
    'graph-algorithms'
  ),
  (
    'cs_algo_08', 
    'cs_algorithms_structures', 
    13, 
    'Giải thuật Đồ thị & Tìm đường', 
    'Thuật toán Tìm đường đi ngắn nhất (Dijkstra & Bellman-Ford)', 
    '### 1. Thuật toán Dijkstra
- **Mục tiêu:** Tìm đường đi ngắn nhất từ một đỉnh nguồn đến tất cả các đỉnh khác trên đồ thị có trọng số không âm.
- **Cơ chế:** Hoạt động theo nguyên lý tham lam (Greedy). Liên tục chọn đỉnh có khoảng cách ước lượng nhỏ nhất chưa duyệt, sau đó cập nhật khoảng cách đến các đỉnh kề của nó (phép nới lỏng - Relaxation).
- **Tối ưu:** Sử dụng Min-Heap (Priority Queue) để lấy đỉnh nhanh chóng. Độ phức tạp: $O((V + E) \log V)$.

### 2. Thuật toán Bellman-Ford
- **Đặc trưng:** Chạy phép nới lỏng cạnh liên tiếp đúng $V-1$ lần trên tất cả các cạnh đồ thị.
- **Thế mạnh:** Chạy được trên đồ thị có trọng số cạnh âm.
- **Phát hiện chu trình âm:** Nếu thực hiện phép nới lỏng lần thứ $V$ mà khoảng cách vẫn tiếp tục giảm, đồ thị tồn tại chu trình âm (đường đi ngắn nhất tiến tới âm vô cùng).
- **Độ phức tạp:** $O(V \times E)$ (chậm hơn Dijkstra).', 
    'core-theory', 
    '["Triển khai Dijkstra dùng Priority Queue trong C++.", "Giải thích cơ chế phát hiện chu trình âm bằng Bellman-Ford qua đoạn mã giả giải thuật."]'::jsonb, 
    '["Dijkstra chạy sai hoàn toàn trên đồ thị có cạnh âm vì không thể sửa lại khoảng cách của các đỉnh đã duyệt trước đó theo nguyên tắc Greedy.", "Bellman-Ford phù hợp cho các hệ thống định tuyến mạng nơi trọng số cạnh (chi phí truyền tin) có thể âm.", "Thuật toán Floyd-Warshall dùng để tìm đường đi ngắn nhất giữa mọi cặp đỉnh có độ phức tạp là O(V^3)."]'::jsonb, 
    8, 
    TRUE,
    'graph-algorithms'
  ),
  (
    'cs_algo_09', 
    'cs_algorithms_structures', 
    13, 
    'Nền tảng Thuật toán', 
    'Kỹ thuật thiết kế thuật toán Chia để trị (Divide & Conquer)', 
    '### 1. Nguyên lý Chia để trị
Chia để trị (Divide and Conquer) là kỹ thuật giải quyết bài toán lớn bằng cách:
1. **Divide (Chia):** Chia bài toán lớn thành các bài toán con độc lập cùng dạng.
2. **Conquer (Trị):** Giải quyết các bài toán con bằng đệ quy. Nếu bài toán con đủ nhỏ (Base case), giải trực tiếp.
3. **Combine (Kết hợp):** Gộp kết quả của các bài toán con để tạo ra lời giải cho bài toán gốc.

### 2. Các ứng dụng kinh điển
- **Binary Search (Tìm kiếm nhị phân):** Chia đôi không gian tìm kiếm trên mảng đã sắp xếp. Mỗi bước giảm nửa kích thước bài toán: $T(N) = T(N/2) + O(1) \rightarrow O(\log N)$.
- **Merge Sort & Quick Sort:** Phân chia mảng và gộp/sắp xếp.
- **Tính lũy thừa nhanh $a^n$:** 
  - Nếu $n$ chẵn: $a^n = (a^{n/2})^2$.
  - Nếu $n$ lẻ: $a^n = a \times (a^{n/2})^2$.
  - Độ phức tạp giảm từ $O(N)$ xuống $O(\log N)$.', 
    'core-theory', 
    '["Triển khai hàm đệ quy tìm kiếm nhị phân: `int binarySearch(int arr[], int l, int r, int x)`", "Viết thuật toán tính lũy thừa nhanh với độ phức tạp thời gian O(log N)."]'::jsonb, 
    '["Chia để trị rất phù hợp để xử lý song song vì các bài toán con độc lập nhau hoàn toàn.", "Định lý Thầy (Master Theorem) thường được dùng để giải nhanh độ phức tạp của thuật toán chia để trị dạng đệ quy.", "Đảm bảo xác định chính xác trường hợp cơ sở (base case) để tránh đệ quy vô hạn gây tràn Stack."]'::jsonb, 
    6, 
    TRUE,
    'algorithm-fundamentals'
  ),
  (
    'cs_algo_10', 
    'cs_algorithms_structures', 
    13, 
    'Cấu trúc Cây & Quy hoạch động', 
    'Kỹ thuật thiết kế thuật toán Quy hoạch động (Dynamic Programming)', 
    '### 1. Quy hoạch động là gì?
Quy hoạch động (Dynamic Programming - DP) là kỹ thuật giải quyết bài toán lớn bằng cách kết hợp lời giải của các bài toán con trùng lặp (Overlapping Subproblems) có cấu trúc con tối ưu (Optimal Substructure).

### 2. Phân biệt Quy hoạch động và Chia để trị
- **Chia để trị:** Các bài toán con độc lập (không trùng nhau, ví dụ: Merge Sort chia đôi mảng).
- **Quy hoạch động:** Các bài toán con trùng lặp nhiều lần (ví dụ: tính Fibonacci $F(n) = F(n-1) + F(n-2)$, cả hai đều gọi đến $F(n-3)$).

### 3. Hai phương pháp triển khai Quy hoạch động
- **Top-down với Memoization (Ghi nhớ):** Đi từ bài toán lớn xuống, giải quyết bằng đệ quy và lưu kết quả bài toán con vào bảng tra cứu (hash map/mảng). Nếu gặp lại bài toán con đã giải, lấy ngay kết quả từ bảng ra.
- **Bottom-up với Tabulation (Lập bảng):** Đi từ các bài toán con nhỏ nhất lên, tính toán tuần tự và điền vào bảng (mảng 1 chiều hoặc 2 chiều) bằng vòng lặp không đệ quy.', 
    'core-theory', 
    '["Viết giải thuật giải bài toán cái túi (Knapsack 0/1) bằng quy hoạch động lập bảng 2 chiều.", "Tính số Fibonacci tối ưu O(N) thời gian và O(1) không gian bằng cách chỉ lưu hai giá trị liền trước."]'::jsonb, 
    '["Memoization dễ viết hơn do bám sát công thức truy hồi đệ quy, nhưng tốn không gian Stack do đệ quy sâu.", "Tabulation chạy nhanh hơn và an toàn về bộ nhớ hơn do loại bỏ hoàn toàn đệ quy.", "Tìm ra công thức truy hồi (State Transition Equation) là bước quan trọng nhất và khó nhất khi thiết kế giải thuật Quy hoạch động."]'::jsonb, 
    7, 
    TRUE,
    'advanced-data-structures'
  );

-- 3. Create ge10_activities for these lessons to unlock them in the learning path
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-lesson-cs_algo_01', 'algorithm-fundamentals', 'lesson', 'Độ phức tạp Thuật toán (Big O Notation)', '{"lesson_id": "cs_algo_01"}'::jsonb, 10, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_02', 'basic-data-structures', 'lesson', 'Mạng & Danh sách liên kết (Arrays & Linked Lists)', '{"lesson_id": "cs_algo_02"}'::jsonb, 10, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_03', 'basic-data-structures', 'lesson', 'Ngăn xếp & Hàng đợi (Stacks & Queues)', '{"lesson_id": "cs_algo_03"}'::jsonb, 20, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_04', 'basic-data-structures', 'lesson', 'Thiết kế Bảng băm & Giải quyết xung đột (Hash Tables)', '{"lesson_id": "cs_algo_04"}'::jsonb, 30, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_05', 'advanced-data-structures', 'lesson', 'Cây tìm kiếm nhị phân (BST) & Cây tự cân bằng', '{"lesson_id": "cs_algo_05"}'::jsonb, 10, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_06', 'algorithm-fundamentals', 'lesson', 'Thuật toán Sắp xếp kinh điển (Sorting)', '{"lesson_id": "cs_algo_06"}'::jsonb, 20, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_07', 'graph-algorithms', 'lesson', 'Biểu diễn Đồ thị & Các giải thuật Duyệt đồ thị (BFS/DFS)', '{"lesson_id": "cs_algo_07"}'::jsonb, 10, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_08', 'graph-algorithms', 'lesson', 'Thuật toán Tìm đường đi ngắn nhất (Dijkstra & Bellman-Ford)', '{"lesson_id": "cs_algo_08"}'::jsonb, 20, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_09', 'algorithm-fundamentals', 'lesson', 'Kỹ thuật thiết kế thuật toán Chia để trị (Divide & Conquer)', '{"lesson_id": "cs_algo_09"}'::jsonb, 30, 10, 20, 'cs_algorithms_structures', 13),
  ('act-lesson-cs_algo_10', 'advanced-data-structures', 'lesson', 'Kỹ thuật thiết kế thuật toán Quy hoạch động (Dynamic Programming)', '{"lesson_id": "cs_algo_10"}'::jsonb, 20, 10, 20, 'cs_algorithms_structures', 13)
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
