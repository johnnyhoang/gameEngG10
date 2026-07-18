-- SQL migration to seed 100 question bank for cs_algorithms_structures (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 2. Seed Questions for cs_algorithms_structures (grade_tier = 13)
DELETE FROM ge10_custom_questions WHERE grade_tier = 13 AND subject = 'cs_algorithms_structures';

-- ======================================================================================
-- BÀI GIẢNG 1: Độ phức tạp Thuật toán (cs_algo_01) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_001', 'mcq', 'algorithm-fundamentals',
    'Ký hiệu Big O ($O$) trong phân tích thuật toán mô tả thuộc tính nào của giải thuật?',
    ARRAY['Giới hạn tiệm cận trên (Upper bound) của thời gian chạy hoặc không gian bộ nhớ phụ tối đa trong trường hợp xấu nhất', 'Thời gian chạy trung bình chính xác tính bằng mili-giây', 'Số lượng dòng code tối thiểu của thuật toán', 'Dung lượng RAM tối thiểu để chương trình khởi chạy'],
    ARRAY['Giới hạn tiệm cận trên (Upper bound) của thời gian chạy hoặc không gian bộ nhớ phụ tối đa trong trường hợp xấu nhất']::varchar[],
    'Big O xác định biên trên của hàm tăng thời gian khi kích thước đầu vào N lớn vô hạn, thể hiện độ tin cậy của thuật toán trong điều kiện xấu nhất.',
    5, 'Algorithm Fundamentals', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_002', 'mcq', 'algorithm-fundamentals',
    'Thuật toán có hai vòng lặp lồng nhau chạy độc lập từ $0$ đến $N$ có độ phức tạp thời gian là bao nhiêu?',
    ARRAY['O(N^2)', 'O(N)', 'O(N \log N)', 'O(1)'],
    ARRAY['O(N^2)']::varchar[],
    'Với mỗi lần chạy của vòng lặp ngoài (N lần), vòng lặp trong chạy N lần. Tổng số chỉ thị máy là $N \times N = N^2$, tương ứng độ phức tạp $O(N^2)$.',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_003', 'mcq', 'algorithm-fundamentals',
    'Trong các độ phức tạp thuật toán sau đây, độ phức tạp nào tối ưu nhất (chạy nhanh nhất)?',
    ARRAY['O(\log N)', 'O(N)', 'O(N \log N)', 'O(N^2)'],
    ARRAY['O(\log N)']::varchar[],
    'Độ phức tạp tăng dần: $O(1) < O(\log N) < O(N) < O(N \log N) < O(N^2)$. Vì vậy $O(\log N)$ là tối ưu nhất trong số các phương án trên.',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_004', 'mcq', 'algorithm-fundamentals',
    'Thời gian chạy thực tế của một thuật toán có độ phức tạp $O(2^N)$ sẽ thay đổi thế nào khi ta tăng kích thước đầu vào $N$ thêm 1 đơn vị?',
    ARRAY['Thời gian chạy thực tế tăng lên gấp đôi', 'Thời gian chạy tăng thêm 2 giây', 'Thời gian chạy không thay đổi', 'Thời gian chạy tăng lên bình phương lần'],
    ARRAY['Thời gian chạy thực tế tăng lên gấp đôi']::varchar[],
    'Với hàm mũ cơ số 2: $f(N+1) = 2^{N+1} = 2 \times 2^N = 2 \times f(N)$. Thời gian chạy tăng lên gấp đôi đối với mỗi đơn vị dữ liệu tăng thêm.',
    6, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_005', 'mcq', 'algorithm-fundamentals',
    'Phân tích độ phức tạp không gian (Space Complexity) của thuật toán đệ quy tính giai thừa $N!$ ngây thơ là bao nhiêu?',
    ARRAY['O(N)', 'O(1)', 'O(\log N)', 'O(N^2)'],
    ARRAY['O(N)']::varchar[],
    'Mỗi lời gọi đệ quy tạo ra một khung ngăn xếp (Stack Frame) lưu trữ trên Stack. Đệ quy gọi $N$ lần sâu sẽ tốn $O(N)$ không gian ngăn xếp.',
    6, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_006', 'mcq', 'algorithm-fundamentals',
    'Độ phức tạp thời gian chạy của vòng lặp sau: `for (int i = 1; i < n; i = i * 2) { ... }` là bao nhiêu?',
    ARRAY['O(\log N)', 'O(N)', 'O(N \log N)', 'O(1)'],
    ARRAY['O(\log N)']::varchar[],
    'Biến lặp $i$ nhân đôi sau mỗi bước ($1, 2, 4, 8...$). Số bước lặp $k$ thỏa mãn $2^k < N \rightarrow k \approx \log_2 N$, tương ứng $O(\log N)$.',
    6, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_007', 'mcq', 'algorithm-fundamentals',
    'Khái niệm "Space-Time Tradeoff" (Đánh đổi không gian - thời gian) trong giải thuật có nghĩa là gì?',
    ARRAY['Ta có thể thiết kế thuật toán chạy nhanh hơn bằng cách chấp nhận sử dụng nhiều bộ nhớ phụ hơn và ngược lại', 'Thuật toán tốn ít bộ nhớ thì tự động chạy nhanh hơn', 'Thời gian chạy và không gian bộ nhớ của thuật toán luôn bằng nhau', 'OS tự động cấp thêm RAM khi luồng CPU quá tải'],
    ARRAY['Ta có thể thiết kế thuật toán chạy nhanh hơn bằng cách chấp nhận sử dụng nhiều bộ nhớ phụ hơn và ngược lại']::varchar[],
    'Ví dụ: thuật toán tìm kiếm trên mảng thô mất $O(N)$ thời gian, $O(1)$ bộ nhớ. Nếu dùng bảng băm (Hash Table) tốn thêm $O(N)$ bộ nhớ, thời gian tìm kiếm giảm xuống chỉ còn $O(1)$.',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_008', 'mcq', 'algorithm-fundamentals',
    'Độ phức tạp thời gian chạy của thuật toán tìm kiếm tuyến tính (Linear Search) trên mảng có $N$ phần tử trong trường hợp xấu nhất là bao nhiêu?',
    ARRAY['O(N)', 'O(1)', 'O(\log N)', 'O(N^2)'],
    ARRAY['O(N)']::varchar[],
    'Trường hợp xấu nhất xảy ra khi phần tử cần tìm nằm ở cuối mảng hoặc không có trong mảng. Ta phải so sánh với toàn bộ $N$ phần tử, tốn $O(N)$ phép toán.',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_009', 'short-answer', 'algorithm-fundamentals',
    'Điền độ phức tạp Big O của thuật toán truy xuất phần tử mảng tĩnh tại chỉ số index K cho trước. (Ví dụ viết: O(1))',
    NULL,
    ARRAY['O(1)', 'o(1)']::varchar[],
    'Truy cập qua chỉ số index mảng là phép toán trực tiếp mất thời gian hằng số O(1).',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  ),
  (
    'cs_algo_q_010', 'short-answer', 'algorithm-fundamentals',
    'Điền độ phức tạp Big O của thuật toán tìm kiếm nhị phân trên mảng đã sắp xếp có N phần tử. (Viết hoa chữ O và dùng log, ví dụ: O(log N))',
    NULL,
    ARRAY['O(log N)', 'O(log n)']::varchar[],
    'Tìm kiếm nhị phân chia đôi không gian dữ liệu sau mỗi bước, tốn tối đa O(log N) lần so sánh.',
    5, 'Algorithm Analysis', 'cs_algorithms_structures', 13, 'cs_algo_01'
  );

-- ======================================================================================
-- BÀI GIẢNG 2: Mảng & Danh sách liên kết (cs_algo_02) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_011', 'mcq', 'basic-data-structures',
    'Tại sao mảng tĩnh (Static Array) lại hỗ trợ truy cập ngẫu nhiên (Random Access) phần tử bất kỳ chỉ với độ phức tạp $O(1)$?',
    ARRAY['Vì các phần tử mảng nằm liên tiếp trong bộ nhớ, địa chỉ ô nhớ thứ K được tính bằng công thức: Địa chỉ gốc + K * Kích thước kiểu dữ liệu', 'Vì mảng tĩnh sử dụng thuật toán tìm kiếm nhị phân ngầm định', 'Vì bộ nhớ của mảng tĩnh luôn được lưu trữ trên bộ nhớ đệm Cache L1', 'Vì mảng tĩnh tự động sắp xếp các phần tử khi thêm vào'],
    ARRAY['Vì các phần tử mảng nằm liên tiếp trong bộ nhớ, địa chỉ ô nhớ thứ K được tính bằng công thức: Địa chỉ gốc + K * Kích thước kiểu dữ liệu']::varchar[],
    'Nhờ lưu trữ liên tục (contiguous memory), địa chỉ ô nhớ được xác định trực tiếp bằng toán học mà không cần duyệt qua các ô nhớ trước đó.',
    6, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_012', 'mcq', 'basic-data-structures',
    'Khi chèn một phần tử mới vào vị trí index 0 của mảng có $N$ phần tử, độ phức tạp thời gian chạy là bao nhiêu?',
    ARRAY['O(N)', 'O(1)', 'O(\log N)', 'O(N^2)'],
    ARRAY['O(N)']::varchar[],
    'Ta bắt buộc phải dịch chuyển toàn bộ $N$ phần tử hiện có sang bên phải một vị trí để giải phóng ô trống ở đầu mảng, tốn $O(N)$ chỉ thị máy.',
    5, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_013', 'mcq', 'basic-data-structures',
    'Nhược điểm lớn nhất của Danh sách liên kết đơn (Singly Linked List) so với Mảng là gì?',
    ARRAY['Không hỗ trợ truy cập ngẫu nhiên trực tiếp qua chỉ số index, muốn lấy nút thứ K phải duyệt tuần tự từ đầu danh sách', 'Tốn nhiều RAM hơn mảng do phải lưu thêm các con trỏ liên kết', 'Thao tác thêm phần tử vào đầu danh sách cực kỳ chậm', 'Không thể thay đổi kích thước linh hoạt khi đang chạy'],
    ARRAY['Không hỗ trợ truy cập ngẫu nhiên trực tiếp qua chỉ số index, muốn lấy nút thứ K phải duyệt tuần tự từ đầu danh sách', 'Tốn nhiều RAM hơn mảng do phải lưu thêm các con trỏ liên kết']::varchar[],
    'Hai nhược điểm lớn của danh sách liên kết đơn là: (1) Truy cập tuần tự $O(N)$ thay vì $O(1)$, (2) Phải dành thêm bộ nhớ để lưu con trỏ `next` ở mỗi Node.',
    6, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_014', 'mcq', 'basic-data-structures',
    'Thao tác xóa phần tử ở cuối Danh sách liên kết đơn (Singly Linked List) có độ phức tạp thời gian chạy là bao nhiêu nếu chỉ lưu con trỏ `head` và `tail`?',
    ARRAY['O(N) vì phải duyệt từ head để tìm nút kế cuối (nút trước tail)', 'O(1) vì ta đã có con trỏ tail trỏ trực tiếp nút cuối', 'O(\log N) vì ta dùng đệ quy chia đôi để tìm', 'O(1) vì chỉ cần giải phóng vùng nhớ của tail'],
    ARRAY['O(N) vì phải duyệt từ head để tìm nút kế cuối (nút trước tail)']::varchar[],
    'Mặc dù có tail, nhưng vì liên kết đơn chỉ trỏ xuôi, ta không thể tìm được nút kế cuối nếu không duyệt từ đầu. Để xoá tail, ta phải cập nhật trường `next` của nút kế cuối thành NULL và trỏ tail về nút kế cuối, tốn $O(N)$ thời gian.',
    7, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_015', 'mcq', 'basic-data-structures',
    'Danh sách liên kết đôi (Doubly Linked List) giải quyết được vấn đề xoá nút cuối của liên kết đơn như thế nào với độ phức tạp $O(1)$?',
    ARRAY['Mỗi nút có thêm con trỏ prev trỏ ngược lại, giúp tìm được nút kế cuối lập tức từ tail mà không cần duyệt từ đầu', 'Danh sách liên kết đôi tự động dọn rác bằng Garbage Collector', 'Sử dụng cấu trúc lưu trữ vòng tròn khép kín', 'Nó chia đôi danh sách thành hai phần độc lập'],
    ARRAY['Mỗi nút có thêm con trỏ prev trỏ ngược lại, giúp tìm được nút kế cuối lập tức từ tail mà không cần duyệt từ đầu']::varchar[],
    'Nhờ liên kết hai chiều, từ nút cuối `tail` ta có thể đi ngược về nút trước nó `tail->prev` mất $O(1)$ thời gian, cập nhật liên kết và giải phóng tail cực nhanh.',
    6, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_016', 'mcq', 'basic-data-structures',
    'Cơ chế tự động nhân đôi kích thước mảng động (ví dụ ArrayList trong Java) khi đầy được gọi là gì và có độ phức tạp khấu hao (amortized) khi thêm phần tử vào cuối là bao nhiêu?',
    ARRAY['Resizing; độ phức tạp khấu hao là O(1)', 'Rehashing; độ phức tạp khấu hao là O(N)', 'Garbage Collection; độ phức tạp khấu hao là O(log N)', 'Paging; độ phức tạp khấu hao là O(1)'],
    ARRAY['Resizing; độ phức tạp khấu hao là O(1)']::varchar[],
    'Khi mảng đầy, mảng động cấp phát mảng mới có kích thước gấp đôi và copy $N$ phần tử sang. Phép toán này mất $O(N)$, nhưng do chỉ xảy ra rất ít lần (tần suất giảm dần), độ phức tạp trung bình tính trên mỗi phần tử thêm vào (amortized cost) vẫn là $O(1)$.',
    7, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_017', 'mcq', 'basic-data-structures',
    'Thao tác thêm một nút mới vào đầu một Danh sách liên kết đơn có độ phức tạp thời gian chạy là bao nhiêu?',
    ARRAY['O(1)', 'O(N)', 'O(\log N)', 'O(N^2)'],
    ARRAY['O(1)']::varchar[],
    'Chỉ cần tạo Node mới, trỏ trường `next` của Node mới vào `head` cũ, rồi cập nhật `head` mới trỏ vào Node mới. Thao tác hoàn toàn là cập nhật liên kết con trỏ mất thời gian hằng số.',
    5, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_018', 'mcq', 'basic-data-structures',
    'Trong C++, cấu trúc `std::vector` quản lý dữ liệu dưới dạng cấu trúc dữ liệu nào?',
    ARRAY['Mảng động (Dynamic Array)', 'Danh sách liên kết đơn (Singly Linked List)', 'Danh sách liên kết đôi (Doubly Linked List)', 'Bảng băm (Hash Table)'],
    ARRAY['Mảng động (Dynamic Array)']::varchar[],
    '`std::vector` cung cấp khả năng lưu trữ liên tiếp trong bộ nhớ và tự động co giãn kích thước linh hoạt, tức là một mảng động.',
    5, 'C++ STL Vectors', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_019', 'short-answer', 'basic-data-structures',
    'Điền tên tiếng Anh của nút gốc đóng vai trò là điểm bắt đầu của Danh sách liên kết. (Viết thường)',
    NULL,
    ARRAY['head']::varchar[],
    'Head trỏ vào Node đầu tiên của danh sách liên kết.',
    5, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  ),
  (
    'cs_algo_q_020', 'short-answer', 'basic-data-structures',
    'Điền từ tiếng Anh viết tắt của cấu trúc dữ liệu lưu trữ các phần tử liên tiếp nhau trong RAM với kích thước cố định. (Viết thường)',
    NULL,
    ARRAY['array', 'mảng']::varchar[],
    'Array là cấu trúc cơ bản nhất của lập trình tuyến tính.',
    5, 'Arrays & Linked Lists', 'cs_algorithms_structures', 13, 'cs_algo_02'
  );

-- ======================================================================================
-- BÀI GIẢNG 3: Ngăn xếp & Hàng đợi (cs_algo_03) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_021', 'mcq', 'basic-data-structures',
    'Cấu trúc dữ liệu Ngăn xếp (Stack) hoạt động theo nguyên lý nào?',
    ARRAY['LIFO (Last In, First Out) - Vào sau cùng, ra đầu tiên', 'FIFO (First In, First Out) - Vào đầu tiên, ra đầu tiên', 'LILO (Last In, Last Out) - Vào sau cùng, ra sau cùng', 'Độ ưu tiên ngẫu nhiên'],
    ARRAY['LIFO (Last In, First Out) - Vào sau cùng, ra đầu tiên']::varchar[],
    'Stack giống như chồng đĩa, đĩa đặt vào sau cùng (ở đỉnh) sẽ phải lấy ra trước tiên.',
    5, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_022', 'mcq', 'basic-data-structures',
    'Cấu trúc dữ liệu Hàng đợi (Queue) hoạt động theo nguyên lý nào?',
    ARRAY['FIFO (First In, First Out) - Vào đầu tiên, ra đầu tiên', 'LIFO (Last In, First Out) - Vào sau cùng, ra đầu tiên', 'Ưu tiên giá trị lớn nhất', 'Đệ quy quay lui'],
    ARRAY['FIFO (First In, First Out) - Vào đầu tiên, ra đầu tiên']::varchar[],
    'Queue hoạt động như một hàng người xếp hàng mua vé, ai đến trước tiên (ở đầu hàng) sẽ được phục vụ và lấy ra đầu tiên.',
    5, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_023', 'mcq', 'basic-data-structures',
    'Tại sao khi cài đặt Hàng đợi (Queue) bằng mảng tĩnh, ta nên sử dụng mô hình "Circular Queue" (Hàng đợi vòng tròn)?',
    ARRAY['Để tận dụng lại các ô nhớ trống ở đầu mảng sau khi phần tử đã được lấy ra (dequeue), tránh lãng phí bộ nhớ', 'Để tăng gấp đôi kích thước của mảng động', 'Để đảo ngược thứ tự các phần tử tự động', 'Để biến hàng đợi thành ngăn xếp'],
    ARRAY['Để tận dụng lại các ô nhớ trống ở đầu mảng sau khi phần tử đã được lấy ra (dequeue), tránh lãng phí bộ nhớ']::varchar[],
    'Trong hàng đợi mảng tĩnh, con trỏ đầu (front) liên tục tịnh tiến sang phải khi dequeue. Hàng đợi vòng tròn quay con trỏ về index 0 khi chạm cuối mảng nếu đầu mảng còn ô trống.',
    6, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_024', 'mcq', 'basic-data-structures',
    'Thao tác đẩy một phần tử mới vào Ngăn xếp (`push`) có độ phức tạp thời gian chạy là bao nhiêu?',
    ARRAY['O(1)', 'O(N)', 'O(\log N)', 'O(N^2)'],
    ARRAY['O(1)']::varchar[],
    'Thêm vào đỉnh ngăn xếp là thao tác trực tiếp và độc lập với số lượng phần tử hiện có trong ngăn xếp.',
    5, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_025', 'mcq', 'basic-data-structures',
    'Cấu trúc dữ liệu "Deque" (Double-ended Queue) hỗ trợ các thao tác nào?',
    ARRAY['Cho phép thêm và xoá phần tử linh hoạt ở cả hai đầu (đầu và cuối) với độ phức tạp O(1)', 'Chỉ cho phép thêm ở đầu và xoá ở cuối', 'Chỉ cho phép thêm ở cuối và xoá ở đầu', 'Cho phép chèn phần tử vào giữa mảng bất kỳ lúc nào'],
    ARRAY['Cho phép thêm và xoá phần tử linh hoạt ở cả hai đầu (đầu và cuối) với độ phức tạp O(1)']::varchar[],
    'Deque (hàng đợi hai đầu) là cấu trúc linh hoạt kết hợp các thế mạnh của cả Stack và Queue.',
    6, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_026', 'mcq', 'basic-data-structures',
    'Cấu trúc Binary Heap (vun đống nhị phân) duy trì tính chất của một cây nhị phân hoàn chỉnh (Complete Binary Tree). Điều này đem lại lợi ích gì?',
    ARRAY['Giúp lưu trữ cây tối ưu dưới dạng một mảng một chiều (Array) mà không cần dùng đến các con trỏ liên kết phức tạp', 'Giúp cây luôn đạt chiều cao tối đa', 'Giúp tăng tốc độ duyệt cây theo chiều sâu', 'Ngăn cản việc chèn phần tử trùng lặp'],
    ARRAY['Giúp lưu trữ cây tối ưu dưới dạng một mảng một chiều (Array) mà không cần dùng đến các con trỏ liên kết phức tạp']::varchar[],
    'Nhờ tính chất hoàn chỉnh (không có ô khuyết), ta biểu diễn Heap bằng mảng: nút tại chỉ số $i$ có con trái là $2i+1$ và con phải là $2i+2$, cực kỳ tiết kiệm bộ nhớ.',
    7, 'Binary Heaps', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_027', 'mcq', 'basic-data-structures',
    'Thao tác lấy ra phần tử có độ ưu tiên cao nhất từ Min-Heap (Extract-Min) có độ phức tạp thời gian chạy trong trường hợp xấu nhất là bao nhiêu?',
    ARRAY['O(\log N)', 'O(1)', 'O(N)', 'O(N \log N)'],
    ARRAY['O(\log N)']::varchar[],
    'Lấy gốc Min-Heap mất $O(1)$ nhưng ta phải đưa nút cuối lên đỉnh và thực hiện vun đống đi xuống (heapify-down) để duy trì cấu trúc Heap, tốn tối đa chiều cao cây $O(\log N)$ bước.',
    6, 'Binary Heaps', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_028', 'mcq', 'basic-data-structures',
    'Trong cấu trúc Max-Heap, quan hệ về giá trị giữa nút cha (parent) và các nút con (children) của nó được quy định như thế nào?',
    ARRAY['Nút cha luôn lớn hơn hoặc bằng tất cả các nút con của nó', 'Nút cha luôn nhỏ hơn hoặc bằng nút con', 'Nút cha phải có giá trị bằng tổng hai nút con', 'Nút con bên trái phải nhỏ hơn nút cha, nút con bên phải phải lớn hơn nút cha'],
    ARRAY['Nút cha luôn lớn hơn hoặc bằng tất cả các nút con của nó']::varchar[],
    'Max-Heap duy trì phần tử lớn nhất ở nút gốc (root). Trật tự giữa con trái và con phải không quan trọng (khác với BST).',
    5, 'Binary Heaps', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_029', 'short-answer', 'basic-data-structures',
    'Điền từ tiếng Anh viết tắt của nguyên lý hoạt động của cấu trúc Ngăn xếp (Stack). (Viết hoa toàn bộ)',
    NULL,
    ARRAY['LIFO']::varchar[],
    'LIFO là Last In, First Out.',
    5, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  ),
  (
    'cs_algo_q_030', 'short-answer', 'basic-data-structures',
    'Điền tên tiếng Anh của thao tác lấy một phần tử ra khỏi Hàng đợi (Queue). (Viết thường)',
    NULL,
    ARRAY['dequeue']::varchar[],
    'Dequeue lấy phần tử ở đầu hàng đợi ra ngoài.',
    5, 'Stacks & Queues', 'cs_algorithms_structures', 13, 'cs_algo_03'
  );

-- ======================================================================================
-- BÀI GIẢNG 4: Bảng băm (cs_algo_04) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_031', 'mcq', 'basic-data-structures',
    'Vai trò chính của Hàm băm (Hash Function) trong cấu trúc Bảng băm là gì?',
    ARRAY['Chuyển đổi một khóa (Key) có kiểu bất kỳ thành một chỉ số số nguyên (index) nằm trong phạm vi kích thước của mảng', 'Mã hóa dữ liệu để bảo mật tệp tin', 'Sắp xếp các khóa theo thứ tự bảng chữ cái', 'Kiểm tra xem dữ liệu có bị null hay không'],
    ARRAY['Chuyển đổi một khóa (Key) có kiểu bất kỳ thành một chỉ số số nguyên (index) nằm trong phạm vi kích thước của mảng']::varchar[],
    'Hàm băm chuyển đổi khóa thành index để xác định vị trí lưu trữ trực tiếp trong mảng.',
    5, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_032', 'mcq', 'basic-data-structures',
    'Hiện tượng "Xung đột băm" (Hash Collision) xảy ra khi nào?',
    ARRAY['Khi hai khóa khác nhau đi qua hàm băm cho ra cùng một kết quả chỉ số index', 'Khi bảng băm bị đầy 100% dung lượng', 'Khi hàm băm trả về giá trị âm', 'Khi chương trình hết bộ nhớ RAM vật lý'],
    ARRAY['Khi hai khóa khác nhau đi qua hàm băm cho ra cùng một kết quả chỉ số index']::varchar[],
    'Vì không gian khóa là vô hạn còn kích thước mảng băm là hữu hạn, xung đột là không thể tránh khỏi (theo nguyên lý chuồng bồ câu).',
    5, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_033', 'mcq', 'basic-data-structures',
    'Kỹ thuật "Chaining" (Phân chuỗi) giải quyết xung đột băm bằng cách nào?',
    ARRAY['Lưu trữ toàn bộ các phần tử bị trùng chỉ số vào một Danh sách liên kết tại chính chỉ số index đó', 'Tìm ô nhớ trống kế tiếp trong mảng để nhét phần tử vào', 'Tự động nhân đôi kích thước bảng băm lập tức', 'Sử dụng một hàm băm thứ hai để băm lại khóa'],
    ARRAY['Lưu trữ toàn bộ các phần tử bị trùng chỉ số vào một Danh sách liên kết tại chính chỉ số index đó']::varchar[],
    'Chaining cho phép mỗi ô mảng là một xô (bucket) chứa danh sách các Node trùng băm, thiết kế đơn giản và hiệu quả.',
    6, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_034', 'mcq', 'basic-data-structures',
    'Trong kỹ thuật "Open Addressing", phương pháp "Linear Probing" (Dò tuyến tính) tìm ô trống như thế nào khi gặp xung đột?',
    ARRAY['Quét tuần tự sang các ô nhớ kế tiếp: index + 1, index + 2, index + 3...', 'Quét theo khoảng cách bình phương: index + 1^2, index + 2^2...', 'Dùng hàm băm thứ hai tính bước nhảy', 'Ném ra ngoại lệ và dừng chương trình'],
    ARRAY['Quét tuần tự sang các ô nhớ kế tiếp: index + 1, index + 2, index + 3...']::varchar[],
    'Dò tuyến tính duyệt mảng tuần tự từ điểm xung đột để tìm ô trống gần nhất.',
    5, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_035', 'mcq', 'basic-data-structures',
    'Hiện tượng "Primary Clustering" (Bó cụm sơ cấp) trong bảng băm dùng địa chỉ mở (Open Addressing) xảy ra do nguyên nhân nào?',
    ARRAY['Do thuật toán dò tuyến tính Linear Probing tạo ra các khối ô nhớ bị chiếm liên tục, làm tăng số bước dò của các khóa băm gần nhau', 'Do mảng băm bị phân mảnh bộ nhớ', 'Do sử dụng quá nhiều danh sách liên kết đơn', 'Do hàm băm trả về giá trị hằng số'],
    ARRAY['Do thuật toán dò tuyến tính Linear Probing tạo ra các khối ô nhớ bị chiếm liên tục, làm tăng số bước dò của các khóa băm gần nhau']::varchar[],
    'Khi các ô nhớ kề nhau bị chiếm đóng hàng loạt, bất kỳ khóa nào băm rơi vào vùng đó đều phải dò qua toàn bộ bó cụm để tìm ô trống, làm giảm hiệu năng đáng kể.',
    7, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_036', 'mcq', 'basic-data-structures',
    'Chỉ số "Load Factor" (Hệ số tải) $\alpha$ của bảng băm có công thức tính là gì (với $N$ là số phần tử và $M$ là kích thước bảng)?',
    ARRAY['alpha = N / M', 'alpha = M / N', 'alpha = N * M', 'alpha = N^2 / M'],
    ARRAY['alpha = N / M']::varchar[],
    'Hệ số tải $\alpha$ biểu thị độ lấp đầy của bảng băm, là chỉ số quyết định khi nào cần rehashing.',
    6, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_037', 'mcq', 'basic-data-structures',
    'Tại sao khi xóa một phần tử trong bảng băm sử dụng địa chỉ mở (Open Addressing), ta không được xóa vật lý dòng dữ liệu (hoặc gán NULL) mà phải dùng thẻ đánh dấu đặc biệt (tombstone)?',
    ARRAY['Vì nếu xóa vật lý gán NULL, quá trình tìm kiếm (lookup) của các khóa chèn sau bị xung đột sẽ bị ngắt quãng nửa chừng tại ô NULL đó và báo sai kết quả', 'Vì mảng tĩnh không cho phép gán giá trị NULL', 'Vì Garbage Collector sẽ hiểu lầm làm sập RAM', 'Để tiết kiệm chỉ thị máy tính của CPU'],
    ARRAY['Vì nếu xóa vật lý gán NULL, quá trình tìm kiếm (lookup) của các khóa chèn sau bị xung đột sẽ bị ngắt quãng nửa chừng tại ô NULL đó và báo sai kết quả']::varchar[],
    'Tìm kiếm địa chỉ mở dừng lại khi gặp ô trống thực sự (chưa từng dùng). Nếu ta xoá vật lý ô nhớ giữa chuỗi xung đột thành NULL, phép tìm kiếm phần tử chèn sau sẽ kết luận sai rằng phần tử đó không tồn tại.',
    7, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_038', 'mcq', 'basic-data-structures',
    'Thao tác "Rehashing" trong bảng băm diễn ra khi nào?',
    ARRAY['Khi hệ số tải vượt ngưỡng quy định, bảng băm tăng kích thước mảng chứa và thực hiện băm lại toàn bộ các khóa cũ vào mảng mới', 'Khi có xung đột băm lần đầu tiên', 'Khi hàm băm bị sập lỗi hệ thống', 'Khi giải phóng toàn bộ bảng băm ra khỏi bộ nhớ'],
    ARRAY['Khi hệ số tải vượt ngưỡng quy định, bảng băm tăng kích thước mảng chứa và thực hiện băm lại toàn bộ các khóa cũ vào mảng mới']::varchar[],
    'Tăng kích thước mảng (thường gấp đôi) và rehashing giúp giảm hệ số tải, đưa hiệu năng trung bình các thao tác tìm kiếm/thêm về lại $O(1)$.',
    6, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_039', 'short-answer', 'basic-data-structures',
    'Điền tên tiếng Anh viết tắt của hệ số tải dùng để giám sát độ lấp đầy của bảng băm. (Viết thường 2 từ)',
    NULL,
    ARRAY['load factor']::varchar[],
    'Load factor biểu thị mật độ phần tử trên bảng băm.',
    5, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  ),
  (
    'cs_algo_q_040', 'short-answer', 'basic-data-structures',
    'Điền độ phức tạp thời gian chạy trung bình (Average-case) của phép toán tìm kiếm một khóa trên bảng băm được thiết kế tốt. (Ví dụ viết: O(1))',
    NULL,
    ARRAY['O(1)', 'o(1)']::varchar[],
    'Bảng băm tốt duy trì thời gian tìm kiếm O(1) nhờ phân phối khóa đều.',
    5, 'Hash Tables', 'cs_algorithms_structures', 13, 'cs_algo_04'
  );

-- ======================================================================================
-- BÀI GIẢNG 5: Cây tìm kiếm nhị phân (BST) & Cây tự cân bằng (cs_algo_05) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_041', 'mcq', 'advanced-data-structures',
    'Thuộc tính cốt lõi quy định cấu trúc của một Cây tìm kiếm nhị phân (BST) là gì?',
    ARRAY['Mọi nút con thuộc cây con bên trái đều nhỏ hơn nút cha, và mọi nút con thuộc cây con bên phải đều lớn hơn nút cha', 'Cây con bên trái bắt buộc phải có chiều cao bằng cây con bên phải', 'Nút cha luôn nhỏ hơn các nút con', 'Mỗi nút cha bắt buộc phải có đủ 2 nút con'],
    ARRAY['Mọi nút con thuộc cây con bên trái đều nhỏ hơn nút cha, và mọi nút con thuộc cây con bên phải đều lớn hơn nút cha']::varchar[],
    'Quy tắc sắp xếp trái < cha < phải giúp loại bỏ một nửa nhánh tìm kiếm ở mỗi bước đi xuống.',
    5, 'Binary Search Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_042', 'mcq', 'advanced-data-structures',
    'Phương thức duyệt cây nhị phân nào trả về danh sách khóa theo đúng thứ tự tăng dần?',
    ARRAY['In-order (Trung thứ tự)', 'Pre-order (Tiền thứ tự)', 'Post-order (Hậu thứ tự)', 'Level-order (Duyệt theo tầng)'],
    ARRAY['In-order (Trung thứ tự)']::varchar[],
    'Duyệt In-order (Trái -> Cha -> Phải) trên cây BST đảm bảo in ra các phần tử theo thứ tự tăng dần.',
    5, 'Binary Search Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_043', 'mcq', 'advanced-data-structures',
    'Trường hợp xấu nhất (Worst-case) của cây tìm kiếm nhị phân thông thường (không tự cân bằng) xảy ra khi nào và độ phức tạp tìm kiếm khi đó là bao nhiêu?',
    ARRAY['Khi chèn các phần tử theo thứ tự đã sắp xếp sẵn; độ phức tạp giảm xuống O(N) giống như danh sách liên kết', 'Khi cây hoàn toàn cân bằng; độ phức tạp là O(N)', 'Khi chèn ngẫu nhiên các phần tử; độ phức tạp là O(1)', 'Khi chèn các phần tử trùng lặp; độ phức tạp là O(log N)'],
    ARRAY['Khi chèn các phần tử theo thứ tự đã sắp xếp sẵn; độ phức tạp giảm xuống O(N) giống như danh sách liên kết']::varchar[],
    'Chèn số tăng dần (ví dụ: 1, 2, 3, 4...) khiến tất cả các nút con đều nằm bên phải, cây bị suy biến lệch thành danh sách liên kết đơn mất hiệu năng $O(N)$.',
    6, 'Binary Search Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_044', 'mcq', 'advanced-data-structures',
    'Mục tiêu của các cấu trúc cây tự cân bằng (như AVL Tree hoặc Red-Black Tree) là gì?',
    ARRAY['Duy trì chiều cao của cây ở mức O(log N) bằng các phép biến đổi cấu trúc khi thêm/xóa phần tử để bảo đảm hiệu năng tìm kiếm luôn đạt O(log N)', 'Tối ưu hóa cây thành mảng tĩnh', 'Giảm số lượng nút lá xuống tối thiểu', 'Mã hóa màu sắc cho các nút cây đẹp mắt'],
    ARRAY['Duy trì chiều cao của cây ở mức O(log N) bằng các phép biến đổi cấu trúc khi thêm/xóa phần tử để bảo đảm hiệu năng tìm kiếm luôn đạt O(log N)']::varchar[],
    'Duy trì cây cân bằng giúp các thao tác tìm kiếm, chèn, xóa được bảo đảm đạt độ phức tạp thời gian $O(\log N)$ trong mọi tình huống.',
    6, 'AVL & Red-Black Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_045', 'mcq', 'advanced-data-structures',
    'Chiều cao của cây AVL tự cân bằng được quy định chặt chẽ như thế nào qua chỉ số cân bằng (Balance Factor) của mỗi nút?',
    ARRAY['Trị tuyệt đối của hiệu chiều cao giữa cây con trái và cây con phải không được vượt quá 1', 'Cây con trái phải luôn cao hơn cây con phải đúng 2 đơn vị', 'Chiều cao của cây con trái phải luôn bằng 0', 'Chiều cao của cây luôn là hằng số O(1)'],
    ARRAY['Trị tuyệt đối của hiệu chiều cao giữa cây con trái và cây con phải không được vượt quá 1']::varchar[],
    'Cây AVL duy trì sự cân bằng nghiêm ngặt: $BalanceFactor = Height(Left) - Height(Right) \in \{-1, 0, 1\}$. Nếu vi phạm, cây sẽ tự xoay để cân bằng.',
    7, 'AVL Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_046', 'mcq', 'advanced-data-structures',
    'Khi thêm một nút mới làm lệch cấu trúc cây AVL dạng Trái-Trái (Left-Left), ta thực hiện phép xoay nào để tái cân bằng cây?',
    ARRAY['Xoay Phải đơn (Single Right Rotation) tại nút bị mất cân bằng', 'Xoay Trái đơn (Single Left Rotation)', 'Xoay kép Trái-Phải (Left-Right)', 'Xoay kép Phải-Trái (Right-Left)'],
    ARRAY['Xoay Phải đơn (Single Right Rotation) tại nút bị mất cân bằng']::varchar[],
    'Lệch trái-trái được xử lý đơn giản bằng cách xoay nút cha xuống bên phải để kéo nút con ở giữa lên làm cha mới.',
    7, 'AVL Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_047', 'mcq', 'advanced-data-structures',
    'Thuộc tính nào sau đây thuộc về quy ước màu sắc của cây Đỏ-Đen (Red-Black Tree)?',
    ARRAY['Nút gốc (Root) bắt buộc phải là màu Đen', 'Nút gốc bắt buộc phải là màu Đỏ', 'Tất cả các nút lá (NIL) đều phải là màu Đỏ', 'Nếu một nút là màu Đen, các con của nó bắt buộc phải là màu Đỏ'],
    ARRAY['Nút gốc (Root) bắt buộc phải là màu Đen']::varchar[],
    'Các thuộc tính cây Đỏ-Đen gồm: (1) Nút gốc màu Đen, (2) Nút lá NIL màu Đen, (3) Nút đỏ không được có con đỏ, (4) Số nút đen trên mọi đường đi từ gốc đến lá là bằng nhau.',
    7, 'Red-Black Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_048', 'mcq', 'advanced-data-structures',
    'Tại sao cây Đỏ-Đen (Red-Black Tree) lại được ưa chuộng cài đặt trong thư viện của các ngôn ngữ lập trình hơn cây AVL?',
    ARRAY['Vì cây Đỏ-Đen yêu cầu cân bằng lỏng lẻo hơn, dẫn tới chi phí xoay cây khi chèn/xóa phần tử nhỏ hơn cây AVL trên thực tế', 'Vì cây Đỏ-Đen chạy nhanh hơn khi tìm kiếm thuần túy', 'Vì cây Đỏ-Đen không tốn bộ nhớ lưu trữ', 'Vì cây AVL không hỗ trợ kiểu dữ liệu chuỗi ký tự'],
    ARRAY['Vì cây Đỏ-Đen yêu cầu cân bằng lỏng lẻo hơn, dẫn tới chi phí xoay cây khi chèn/xóa phần tử nhỏ hơn cây AVL trên thực tế']::varchar[],
    'Cây AVL cân bằng rất chặt chẽ nên tìm kiếm nhanh hơn một chút, nhưng chèn/xoá phải xoay cây nhiều lần. Cây Đỏ-Đen cân bằng tương đối giúp cân bằng tốt hiệu năng giữa tìm kiếm và sửa đổi.',
    7, 'Red-Black Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_049', 'short-answer', 'advanced-data-structures',
    'Điền tên viết tắt của cây tìm kiếm nhị phân tự cân bằng đầu tiên trong lịch sử CNTT đặt tên theo Adelson-Velsky và Landis. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['AVL']::varchar[],
    'Cây AVL là cấu trúc cây tự cân bằng kinh điển.',
    5, 'AVL Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  ),
  (
    'cs_algo_q_050', 'short-answer', 'advanced-data-structures',
    'Điền tên tiếng Anh của phương thức duyệt cây nhị phân thăm các nút theo thứ tự: Trái -> Phải -> Cha. (Viết thường gạch nối hoặc viết thường liền nhau)',
    NULL,
    ARRAY['post-order', 'postorder']::varchar[],
    'Post-order traversal thăm cha sau cùng, thích hợp để xoá cây.',
    5, 'Binary Search Trees', 'cs_algorithms_structures', 13, 'cs_algo_05'
  );

-- ======================================================================================
-- BÀI GIẢNG 6: Thuật toán Sắp xếp (cs_algo_06) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_051', 'mcq', 'algorithm-fundamentals',
    'Thuật toán Insertion Sort (Sắp xếp chèn) hoạt động hiệu quả nhất ($O(N)$ thời gian) trong điều kiện dữ liệu nào?',
    ARRAY['Mảng dữ liệu đầu vào đã gần như được sắp xếp sẵn theo thứ tự', 'Mảng dữ liệu bị đảo ngược thứ tự hoàn toàn', 'Mảng dữ liệu chứa toàn bộ các số ngẫu nhiên', 'Mảng dữ liệu có kích thước vô hạn'],
    ARRAY['Mảng dữ liệu đã gần như được sắp xếp sẵn theo thứ tự']::varchar[],
    'Trong mảng gần như đã sắp xếp, vòng lặp trong của Insertion Sort kết thúc sớm (chỉ mất O(1) phép so sánh cho mỗi phần tử), đưa tổng thời gian về $O(N)$.',
    5, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_052', 'mcq', 'algorithm-fundamentals',
    'Đặc tính "Ổn định" (Stability) của một thuật toán sắp xếp có nghĩa là gì?',
    ARRAY['Thuật toán bảo toàn thứ tự tương đối của các phần tử có khóa trùng nhau sau khi sắp xếp xong', 'Thuật toán luôn chạy cùng một khoảng thời gian trong mọi lần chạy', 'Thuật toán không tốn thêm bộ nhớ phụ', 'Thuật toán tự động sửa được lỗi dữ liệu null'],
    ARRAY['Thuật toán bảo toàn thứ tự tương đối của các phần tử có khóa trùng nhau sau khi sắp xếp xong']::varchar[],
    'Ví dụ nếu ta sắp xếp danh sách sinh viên theo điểm số, thuật toán ổn định giữ nguyên thứ tự nộp bài của các sinh viên có cùng điểm số.',
    6, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_053', 'mcq', 'algorithm-fundamentals',
    'Tại sao thuật toán Quick Sort có độ phức tạp thời gian trung bình là $O(N \log N)$ nhưng trong trường hợp xấu nhất lại bị suy biến thành $O(N^2)$?',
    ARRAY['Khi chọn phần tử chốt (Pivot) tồi liên tục (ví dụ chọn phần tử cực biên lớn nhất hoặc nhỏ nhất trong mảng đã sắp xếp), làm phân chia mảng lệch hoàn toàn', 'Khi mảng có quá nhiều số nguyên tố', 'Do hệ thống đệ quy bị tràn bộ nhớ ngăn xếp', 'Do mảng chứa các chuỗi ký tự dài'],
    ARRAY['Khi chọn phần tử chốt (Pivot) tồi liên tục (ví dụ chọn phần tử cực biên lớn nhất hoặc nhỏ nhất trong mảng đã sắp xếp), làm phân chia mảng lệch hoàn toàn']::varchar[],
    'Nếu mảng bị chia lệch $1$ và $N-1$ phần tử ở mỗi bước đệ quy, số tầng đệ quy tăng lên $N$ thay vì $\log N$, dẫn tới tổng độ phức tạp $O(N^2)$. Giải pháp là chọn pivot ngẫu nhiên hoặc lấy median-of-three.',
    7, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_054', 'mcq', 'algorithm-fundamentals',
    'Thuật toán sắp xếp nào sau đây bắt buộc phải tốn không gian bộ nhớ phụ $O(N)$ để thực hiện việc sắp xếp dữ liệu?',
    ARRAY['Merge Sort (Sắp xếp trộn)', 'Quick Sort (Sắp xếp nhanh)', 'Heap Sort (Sắp xếp vun đống)', 'Bubble Sort (Sắp xếp nổi bọt)'],
    ARRAY['Merge Sort (Sắp xếp trộn)']::varchar[],
    'Merge Sort đòi hỏi mảng phụ để chứa các phần tử tạm thời trong quá trình trộn hai mảng con đã sắp xếp.',
    6, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_055', 'mcq', 'algorithm-fundamentals',
    'Độ phức tạp thời gian chạy của thuật toán Heap Sort trong mọi trường hợp (tốt nhất, trung bình, xấu nhất) được bảo đảm ở mức nào?',
    ARRAY['O(N \log N)', 'O(N^2)', 'O(N)', 'O(\log N)'],
    ARRAY['O(N \log N)']::varchar[],
    'Heap Sort duy trì cấu trúc Heap có chiều cao tối đa $\log N$ và lặp $N$ lần lấy phần tử gốc, đảm bảo tính ổn định thời gian $O(N \log N)$.',
    6, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_056', 'mcq', 'algorithm-fundamentals',
    'Phát biểu nào sau đây đúng khi so sánh giữa Quick Sort và Merge Sort?',
    ARRAY['Merge Sort là sắp xếp ổn định và tốn bộ nhớ phụ; Quick Sort sắp xếp tại chỗ (in-place) nhưng không ổn định', 'Merge Sort chạy nhanh hơn Quick Sort trên thực tế', 'Quick Sort là sắp xếp ổn định còn Merge Sort thì không', 'Quick Sort tốn bộ nhớ phụ O(N) còn Merge Sort tốn O(1)'],
    ARRAY['Merge Sort là sắp xếp ổn định và tốn bộ nhớ phụ; Quick Sort sắp xếp tại chỗ (in-place) nhưng không ổn định']::varchar[],
    'Merge Sort giữ nguyên vị trí ban đầu của phần tử trùng lặp và tốn RAM để trộn. Quick Sort sắp xếp trực tiếp trên mảng hiện tại (in-place) bằng cách hoán đổi phần tử nên không ổn định.',
    6, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_057', 'mcq', 'algorithm-fundamentals',
    'Thuật toán sắp xếp nổi bọt (Bubble Sort) hoạt động dựa trên nguyên lý nào?',
    ARRAY['Liên tục so sánh và hoán đổi các phần tử kề nhau nếu chúng bị ngược trật tự cho đến khi mảng sạch bóng xung đột', 'Tìm phần tử nhỏ nhất đưa về đầu mảng', 'Vun đống mảng thành cấu trúc cây nhị phân', 'Chia đôi mảng đệ quy liên tục'],
    ARRAY['Liên tục so sánh và hoán đổi các phần tử kề nhau nếu chúng bị ngược trật tự cho đến khi mảng sạch bóng xung đột']::varchar[],
    'Bubble Sort đưa các phần tử lớn nhất nổi dần lên cuối mảng qua từng lượt quét kề nhau.',
    5, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_058', 'mcq', 'algorithm-fundamentals',
    'Ý tưởng cốt lõi của giải thuật Heap Sort là gì?',
    ARRAY['Xây dựng Max-Heap từ mảng gốc, liên tục tráo phần tử lớn nhất ở gốc với phần tử cuối cùng rồi vun lại đống giảm dần kích thước', 'Chia mảng thành các phần bằng nhau rồi trộn', 'Dùng con trỏ chạy quét hai đầu mảng', 'Sắp xếp dữ liệu ngẫu nhiên dựa vào hàm random'],
    ARRAY['Xây dựng Max-Heap từ mảng gốc, liên tục tráo phần tử lớn nhất ở gốc với phần tử cuối cùng rồi vun lại đống giảm dần kích thước']::varchar[],
    'Heap Sort tận dụng cấu trúc Heap để chọn nhanh phần tử lớn nhất đưa về cuối mảng mà không tốn thêm bộ nhớ.',
    6, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_059', 'short-answer', 'algorithm-fundamentals',
    'Điền độ phức tạp thời gian chạy trong trường hợp xấu nhất của giải thuật Quick Sort. (Ví dụ viết: O(N))',
    NULL,
    ARRAY['O(N^2)', 'O(n^2)']::varchar[],
    'Quick Sort bị suy biến thành O(N^2) khi chọn pivot cực biên liên tục.',
    5, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  ),
  (
    'cs_algo_q_060', 'short-answer', 'algorithm-fundamentals',
    'Điền tên thuật toán sắp xếp tối ưu O(N log N) áp dụng triệt để mô hình Chia để trị và giữ được tính ổn định (stability) khi sắp xếp. (Viết thường)',
    NULL,
    ARRAY['merge sort', 'sắp xếp trộn']::varchar[],
    'Merge Sort là giải pháp sắp xếp ổn định và tối ưu.',
    5, 'Sorting Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_06'
  );

-- ======================================================================================
-- BÀI GIẢNG 7: Biểu diễn Đồ thị & Các giải thuật Duyệt đồ thị (cs_algo_07) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_061', 'mcq', 'graph-algorithms',
    'Khi biểu diễn đồ thị thưa (ít cạnh) có $V$ đỉnh và $E$ cạnh, cách biểu diễn nào giúp tiết kiệm bộ nhớ tối đa?',
    ARRAY['Danh sách kề (Adjacency List) vì chỉ tốn không gian bộ nhớ O(V + E)', 'Ma trận kề (Adjacency Matrix) vì tốn O(V^2)', 'Mảng hai chiều lưu toàn bộ các đỉnh kề', 'Không dùng cấu trúc nào cả'],
    ARRAY['Danh sách kề (Adjacency List) vì chỉ tốn không gian bộ nhớ O(V + E)']::varchar[],
    'Ma trận kề luôn tốn $O(V^2)$ ô nhớ kể cả khi không có cạnh nào. Danh sách kề chỉ cấp phát ô nhớ cho các cạnh thực tế có liên kết, cực kỳ tối ưu cho đồ thị thưa.',
    5, 'Graph Theory', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_062', 'mcq', 'graph-algorithms',
    'Thuật toán Duyệt đồ thị theo chiều rộng (BFS) sử dụng cấu trúc dữ liệu bổ trợ nào?',
    ARRAY['Hàng đợi (Queue) để lưu trữ các đỉnh chuẩn bị duyệt theo thứ tự FIFO', 'Ngăn xếp (Stack) để duyệt theo LIFO', 'Bảng băm để lưu trữ các đỉnh kề', 'Mảng tĩnh chứa trọng số các cạnh'],
    ARRAY['Hàng đợi (Queue) để lưu trữ các đỉnh chuẩn bị duyệt theo thứ tự FIFO']::varchar[],
    'BFS duyệt lan toả ra các đỉnh kề gần nguồn nhất trước. Hàng đợi Queue đảm bảo đỉnh nào tìm thấy trước sẽ được duyệt trước.',
    5, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_063', 'mcq', 'graph-algorithms',
    'Thuật toán Duyệt đồ thị theo chiều sâu (DFS) hoạt động theo nguyên lý nào?',
    ARRAY['Đi sâu nhất có thể dọc theo mỗi nhánh trước khi thực hiện quay lui (Backtracking), sử dụng Stack hoặc đệ quy', 'Lan tỏa đều sang tất cả các đỉnh lân cận cùng lúc', 'Luôn chọn đỉnh có trọng số nhỏ nhất để đi tiếp', 'Duyệt ngẫu nhiên các đỉnh của đồ thị'],
    ARRAY['Đi sâu nhất có thể dọc theo mỗi nhánh trước khi thực hiện quay lui (Backtracking), sử dụng Stack hoặc đệ quy']::varchar[],
    'DFS đi theo đường đi dài nhất đến khi gặp ngõ cụt thì quay lui, thích hợp để tìm kiếm đường đi trong mê cung hoặc phát hiện chu trình.',
    5, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_064', 'mcq', 'graph-algorithms',
    'Tại sao ta bắt buộc phải sử dụng mảng đánh dấu `visited` khi duyệt đồ thị bằng BFS/DFS?',
    ARRAY['Để ngăn chặn việc duyệt lặp lại các đỉnh đã đi qua, tránh gây vòng lặp vô hạn nếu đồ thị có chu trình', 'Để sắp xếp các đỉnh theo thứ tự tăng dần', 'Để tính toán trọng số đường đi ngắn nhất', 'Để giải phóng bộ nhớ của đồ thị'],
    ARRAY['Để ngăn chặn việc duyệt lặp lại các đỉnh đã đi qua, tránh gây vòng lặp vô hạn nếu đồ thị có chu trình']::varchar[],
    'Đồ thị có thể chứa các liên kết khép kín (chu trình). Không đánh dấu đã duyệt sẽ khiến thuật toán chạy lặp vô hạn giữa các đỉnh đó.',
    5, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_065', 'mcq', 'graph-algorithms',
    'Độ phức tạp thời gian chạy của thuật toán BFS/DFS trên đồ thị biểu diễn bằng Danh sách kề là bao nhiêu?',
    ARRAY['O(V + E)', 'O(V^2)', 'O(E \log V)', 'O(V \times E)'],
    ARRAY['O(V + E)']::varchar[],
    'Thuật toán ghé thăm mỗi đỉnh đúng 1 lần và duyệt qua danh sách kề của từng đỉnh (tổng cộng quét hết các cạnh), tốn thời gian tuyến tính $O(V + E)$.',
    6, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_066', 'mcq', 'graph-algorithms',
    'Ứng dụng nào sau đây phù hợp nhất với giải thuật Duyệt đồ thị theo chiều rộng (BFS)?',
    ARRAY['Tìm đường đi ngắn nhất (ít cạnh nhất) nối giữa hai đỉnh trên đồ thị không có trọng số', 'Tìm các thành phần liên thông mạnh của đồ thị có hướng', 'Sắp xếp topo cho đồ thị có hướng không chu trình (DAG)', 'Tìm cây khung nhỏ nhất'],
    ARRAY['Tìm đường đi ngắn nhất (ít cạnh nhất) nối giữa hai đỉnh trên đồ thị không có trọng số']::varchar[],
    'Vì BFS lan toả theo từng tầng cạnh, khoảng cách tìm thấy đầu tiên đến đích luôn là khoảng cách chứa ít cạnh nhất.',
    6, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_067', 'mcq', 'graph-algorithms',
    'Trong DFS, làm thế nào để phát hiện đồ thị có hướng chứa chu trình?',
    ARRAY['Nếu ta gặp lại một đỉnh đang nằm trong ngăn xếp đệ quy (đang duyệt dở dang, chưa kết thúc lời gọi hàm)', 'Nếu ta gặp lại một đỉnh đã visited hoàn toàn', 'Nếu đồ thị không liên thông', 'Nếu số cạnh E lớn hơn số đỉnh V'],
    ARRAY['Nếu ta gặp lại một đỉnh đang nằm trong ngăn xếp đệ quy (đang duyệt dở dang, chưa kết thúc lời gọi hàm)']::varchar[],
    'Gặp lại đỉnh đang trong Call Stack (cạnh ngược - Back Edge) chứng tỏ tồn tại đường đi quay ngược lại đỉnh tổ tiên, tức là có chu trình.',
    7, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_068', 'mcq', 'graph-algorithms',
    'Lệnh duyệt đồ thị topo (Topological Sort) áp dụng được cho loại đồ thị nào?',
    ARRAY['Đồ thị có hướng không chu trình (DAG - Directed Acyclic Graph)', 'Đồ thị vô hướng liên thông', 'Mọi đồ thị có trọng số cạnh dương', 'Cây nhị phân hoàn chỉnh'],
    ARRAY['Đồ thị có hướng không chu trình (DAG - Directed Acyclic Graph)']::varchar[],
    'Sắp xếp topo sắp xếp các đỉnh sao cho với mọi cạnh có hướng từ $u \rightarrow v$, đỉnh $u$ luôn xuất hiện trước $v$. Đồ thị có chu trình không thể sắp xếp topo.',
    6, 'Graph Theory', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_069', 'short-answer', 'graph-algorithms',
    'Điền tên tiếng Anh viết tắt của thuật toán Duyệt đồ thị theo chiều rộng. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['BFS']::varchar[],
    'BFS là Breadth-First Search.',
    5, 'Graph Traversals', 'cs_algorithms_structures', 13, 'cs_algo_07'
  ),
  (
    'cs_algo_q_070', 'short-answer', 'graph-algorithms',
    'Điền tên tiếng Anh viết tắt của kiểu đồ thị có hướng không chu trình, điều kiện cần để thực hiện sắp xếp topo. (Viết hoa toàn bộ)',
    NULL,
    ARRAY['DAG']::varchar[],
    'DAG là Directed Acyclic Graph.',
    5, 'Graph Theory', 'cs_algorithms_structures', 13, 'cs_algo_07'
  );

-- ======================================================================================
-- BÀI GIẢNG 8: Thuật toán Tìm đường đi ngắn nhất (cs_algo_08) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_071', 'mcq', 'graph-algorithms',
    'Thuật toán Dijkstra được thiết kế để giải quyết bài toán nào?',
    ARRAY['Tìm đường đi ngắn nhất từ một nguồn đến mọi đỉnh khác trên đồ thị có trọng số cạnh không âm', 'Tìm cây khung nhỏ nhất của đồ thị vô hướng', 'Phát hiện chu trình âm của đồ thị', 'Tìm đường đi ngắn nhất đi qua mọi đỉnh của đồ thị đúng 1 lần'],
    ARRAY['Tìm đường đi ngắn nhất từ một nguồn đến mọi đỉnh khác trên đồ thị có trọng số cạnh không âm']::varchar[],
    'Dijkstra giải bài toán Single-Source Shortest Path trên đồ thị trọng số dương hiệu quả.',
    5, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_072', 'mcq', 'graph-algorithms',
    'Tại sao thuật toán Dijkstra chạy sai trên đồ thị chứa trọng số cạnh âm?',
    ARRAY['Vì thuật toán hoạt động theo nguyên lý tham lam (Greedy), giả định khoảng cách ngắn nhất đến đỉnh đã duyệt là tối ưu vĩnh viễn và không cập nhật lại', 'Vì Heap không lưu được số âm', 'Vì thuật toán sẽ bị lặp vô hạn', 'Vì trình biên dịch sẽ báo lỗi cú pháp'],
    ARRAY['Vì thuật toán hoạt động theo nguyên lý tham lam (Greedy), giả định khoảng cách ngắn nhất đến đỉnh đã duyệt là tối ưu vĩnh viễn và không cập nhật lại']::varchar[],
    'Nguyên lý Greedy của Dijkstra khoá trạng thái đỉnh đã duyệt. Cạnh âm có thể tạo ra đường đi ngắn hơn sau đó, nhưng Dijkstra đã bỏ qua đỉnh cũ.',
    7, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_073', 'mcq', 'graph-algorithms',
    'Thuật toán Bellman-Ford giải quyết điểm yếu nào của Dijkstra?',
    ARRAY['Chạy tốt trên đồ thị có chứa các cạnh mang trọng số âm và phát hiện được chu trình âm', 'Tăng tốc độ chạy nhanh gấp 10 lần', 'Tiết kiệm không gian bộ nhớ hơn', 'Chỉ chạy trên đồ thị vô hướng'],
    ARRAY['Chạy tốt trên đồ thị có chứa các cạnh mang trọng số âm và phát hiện được chu trình âm']::varchar[],
    'Bellman-Ford duyệt qua toàn bộ các cạnh và thực hiện phép nới lỏng n lần, cho phép sửa khoảng cách linh hoạt kể cả khi có cạnh âm.',
    6, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_074', 'mcq', 'graph-algorithms',
    'Một đồ thị được gọi là chứa "Chu trình âm" (Negative Cycle) khi nào và ảnh hưởng gì đến bài toán tìm đường đi ngắn nhất?',
    ARRAY['Khi có vòng lặp khép kín mà tổng trọng số các cạnh trong vòng lặp đó nhỏ hơn 0, làm đường đi ngắn nhất có thể giảm xuống âm vô cùng', 'Khi tất cả các cạnh đồ thị đều âm', 'Khi đồ thị không chứa chu trình', 'Khi khoảng cách đường đi luôn là số dương'],
    ARRAY['Khi có vòng lặp khép kín mà tổng trọng số các cạnh trong vòng lặp đó nhỏ hơn 0, làm đường đi ngắn nhất có thể giảm xuống âm vô cùng']::varchar[],
    'Càng đi quanh chu trình âm, chi phí càng giảm. Do đó không tồn tại đường đi ngắn nhất hợp lệ vì có thể giảm chi phí vô hạn.',
    6, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_075', 'mcq', 'graph-algorithms',
    'Thuật toán Bellman-Ford phát hiện chu trình âm bằng cách nào?',
    ARRAY['Thực hiện thêm phép nới lỏng (relaxation) lần thứ V trên toàn bộ cạnh; nếu khoảng cách đến đỉnh nào vẫn tiếp tục giảm thì đồ thị chứa chu trình âm', 'Nếu đếm số cạnh âm vượt quá số đỉnh V', 'Nếu thuật toán Dijkstra báo lỗi', 'Nếu khoảng cách đến nút nguồn bị thay đổi'],
    ARRAY['Thực hiện thêm phép nới lỏng (relaxation) lần thứ V trên toàn bộ cạnh; nếu khoảng cách đến đỉnh nào vẫn tiếp tục giảm thì đồ thị chứa chu trình âm']::varchar[],
    'Theo toán học, đường đi ngắn nhất không chu trình chỉ qua tối đa $V-1$ cạnh. Lần nới lỏng thứ $V$ vẫn làm giảm khoảng cách chứng tỏ có chu trình âm.',
    7, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_076', 'mcq', 'graph-algorithms',
    'Độ phức tạp thời gian chạy của thuật toán Bellman-Ford trong trường hợp xấu nhất là bao nhiêu?',
    ARRAY['O(V * E)', 'O(V + E)', 'O((V + E) \log V)', 'O(V^3)'],
    ARRAY['O(V * E)']::varchar[],
    'Do phải lặp $V-1$ lần, mỗi lần quét qua toàn bộ $E$ cạnh, nên độ phức tạp là $O(V \times E)$.',
    6, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_077', 'mcq', 'graph-algorithms',
    'Kỹ thuật tối ưu hoá thuật toán Dijkstra bằng Min-Heap (Priority Queue) giúp cải thiện độ phức tạp từ $O(V^2)$ xuống còn bao nhiêu?',
    ARRAY['O((V + E) \log V)', 'O(V * E)', 'O(V^2 \log V)', 'O(V + E)'],
    ARRAY['O((V + E) \log V)']::varchar[],
    'Min-Heap giúp lấy đỉnh có khoảng cách nhỏ nhất mất $O(\log V)$ thay vì duyệt tuyến tính $O(V)$, đem lại hiệu năng vượt trội cho đồ thị thưa.',
    7, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_078', 'mcq', 'graph-algorithms',
    'Thuật toán Floyd-Warshall dùng để giải quyết bài toán nào?',
    ARRAY['Tìm đường đi ngắn nhất giữa mọi cặp đỉnh của đồ thị (All-pairs shortest path) với độ phức tạp O(V^3)', 'Tìm đường đi từ một nguồn nguồn đến mọi nguồn', 'Tìm cây khung nhỏ nhất', 'Duyệt toàn bộ đồ thị theo chiều rộng'],
    ARRAY['Tìm đường đi ngắn nhất giữa mọi cặp đỉnh của đồ thị (All-pairs shortest path) với độ phức tạp O(V^3)']::varchar[],
    'Floyd-Warshall sử dụng Quy hoạch động để tính đường đi ngắn nhất giữa mọi cặp đỉnh $u, v$ qua các đỉnh trung gian, độ phức tạp $O(V^3)$.',
    7, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_079', 'short-answer', 'graph-algorithms',
    'Điền tên thuật toán tìm đường đi ngắn nhất tham lam O((V+E) log V) yêu cầu trọng số cạnh không âm. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Dijkstra']::varchar[],
    'Dijkstra là giải thuật tìm đường đi ngắn nhất cực kỳ phổ biến.',
    5, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  ),
  (
    'cs_algo_q_080', 'short-answer', 'graph-algorithms',
    'Điền tên viết tắt của phương pháp nới lỏng khoảng cách ước lượng đến các đỉnh kề khi duyệt đồ thị. (Tiếng Việt: "nới lỏng", điền từ tiếng Anh viết thường)',
    NULL,
    ARRAY['relaxation', 'relax']::varchar[],
    'Relaxation cập nhật khoảng cách tốt hơn đến đỉnh kế cận.',
    6, 'Shortest Path Algorithms', 'cs_algorithms_structures', 13, 'cs_algo_08'
  );

-- ======================================================================================
-- BÀI GIẢNG 9: Chia để trị (cs_algo_09) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_081', 'mcq', 'algorithm-fundamentals',
    'Quy trình 3 bước cốt lõi của phương pháp Chia để trị (Divide and Conquer) diễn ra theo thứ tự nào?',
    ARRAY['Divide (Chia bài toán lớn) -> Conquer (Giải bài toán con bằng đệ quy) -> Combine (Gộp kết quả)', 'Conquer (Giải quyết) -> Divide (Chia nhỏ) -> Combine (Gộp lại)', 'Combine (Gộp) -> Divide (Chia) -> Conquer (Giải)', 'Arrange (Chuẩn bị) -> Act (Thực thi) -> Assert (Xác minh)'],
    ARRAY['Divide (Chia bài toán lớn) -> Conquer (Giải bài toán con bằng đệ quy) -> Combine (Gộp kết quả)']::varchar[],
    'Chia để trị bẻ gãy bài toán lớn thành các phần độc lập cùng dạng để xử lý đệ quy, sau đó tổng hợp kết quả.',
    5, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_082', 'mcq', 'algorithm-fundamentals',
    'Tại sao thuật toán Tìm kiếm nhị phân (Binary Search) lại đạt độ phức tạp thời gian tối ưu $O(\log N)$?',
    ARRAY['Vì mỗi bước so sánh loại bỏ được một nửa số lượng phần tử của không gian tìm kiếm', 'Vì mảng đã được nén an toàn', 'Vì thuật toán sử dụng bộ nhớ đệm Cache', 'Vì nó chạy đa luồng song song'],
    ARRAY['Vì mỗi bước so sánh loại bỏ được một nửa số lượng phần tử của không gian tìm kiếm']::varchar[],
    'Nhờ mảng đã sắp xếp, so sánh với phần tử ở giữa cho biết phần tử cần tìm nằm ở nửa trái hay nửa phải, giảm kích thước bài toán đi 2 lần sau mỗi bước.',
    5, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_083', 'mcq', 'algorithm-fundamentals',
    'Định lý Thầy (Master Theorem) được dùng để làm gì trong phân tích thuật toán?',
    ARRAY['Giải nhanh độ phức tạp thời gian của các hệ thức truy hồi xuất hiện trong thuật toán đệ quy chia để trị', 'Tìm đường đi ngắn nhất của đồ thị', 'Chứng minh tính đúng đắn của TDD', 'Tối ưu hoá không gian bộ nhớ ngăn xếp'],
    ARRAY['Giải nhanh độ phức tạp thời gian của các hệ thức truy hồi xuất hiện trong thuật toán đệ quy chia để trị']::varchar[],
    'Master Theorem cung cấp công thức toán học giải hệ thức truy hồi dạng $T(N) = aT(N/b) + f(N)$ rất nhanh chóng.',
    6, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_084', 'mcq', 'algorithm-fundamentals',
    'Kỹ thuật "Tính lũy thừa nhanh" $a^n$ giảm độ phức tạp thời gian chạy từ $O(N)$ xuống còn bao nhiêu nhờ áp dụng Chia để trị?',
    ARRAY['O(\log N)', 'O(1)', 'O(N \log N)', 'O(N^2)'],
    ARRAY['O(\log N)']::varchar[],
    'Tính lũy thừa nhanh chia đôi số mũ $n$ ở mỗi bước: $a^n = (a^{n/2})^2$, giảm số phép nhân từ $n$ xuống $\log n$.',
    6, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_085', 'mcq', 'algorithm-fundamentals',
    'Tại sao việc thiết kế thuật toán theo kiểu Chia để trị lại cực kỳ phù hợp cho môi trường tính toán đa xử lý (Multi-processor / Parallel computing)?',
    ARRAY['Vì các bài toán con sau khi chia ra hoàn toàn độc lập với nhau, có thể giao cho các nhân CPU khác nhau xử lý song song không tranh chấp', 'Vì chia để trị chạy tốn ít RAM hơn', 'Vì nó không dùng đệ quy', 'Vì các CPU tự động gộp kết quả không cần code'],
    ARRAY['Vì các bài toán con sau khi chia ra hoàn toàn độc lập với nhau, có thể giao cho các nhân CPU khác nhau xử lý song song không tranh chấp']::varchar[],
    'Tính độc lập của các nhánh con (như sắp xếp nửa trái và nửa phải trong Merge Sort) cho phép song song hóa luồng chạy cực kỳ tự nhiên.',
    6, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_086', 'mcq', 'algorithm-fundamentals',
    'Đoạn code đệ quy chia để trị bắt buộc phải có điều kiện gì để không bị lỗi tràn bộ nhớ ngăn xếp (Stack Overflow)?',
    ARRAY['Trường hợp cơ sở (Base Case) để dừng đệ quy khi bài toán đủ nhỏ', 'Sử dụng con trỏ Null', 'Mảng đầu vào phải có kích thước chẵn', 'Bắt buộc phải sử dụng vòng lặp while'],
    ARRAY['Trường hợp cơ sở (Base Case) để dừng đệ quy khi bài toán đủ nhỏ']::varchar[],
    'Base case là điểm neo thoát đệ quy, nếu thiếu cây đệ quy sẽ đi sâu vô hạn làm tràn bộ nhớ Stack.',
    5, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_087', 'mcq', 'algorithm-fundamentals',
    'Hệ thức truy hồi của thuật toán sắp xếp Merge Sort là gì?',
    ARRAY['T(N) = 2T(N/2) + O(N)', 'T(N) = T(N/2) + O(1)', 'T(N) = 2T(N/2) + O(1)', 'T(N) = T(N-1) + O(N)'],
    ARRAY['T(N) = 2T(N/2) + O(N)']::varchar[],
    'Merge Sort chia đôi mảng thành 2 phần kích thước $N/2$ (tốn $2T(N/2)$) và thực hiện trộn mất thời gian tuyến tính $O(N)$. Giải hệ thức này cho ra $O(N \log N)$.',
    6, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_088', 'mcq', 'algorithm-fundamentals',
    'Giải thuật Tìm kiếm nhị phân có hệ thức truy hồi là gì?',
    ARRAY['T(N) = T(N/2) + O(1)', 'T(N) = 2T(N/2) + O(1)', 'T(N) = T(N/2) + O(N)', 'T(N) = T(N-1) + O(1)'],
    ARRAY['T(N) = T(N/2) + O(1)']::varchar[],
    'Binary search chỉ đi vào 1 trong 2 nửa kích thước $N/2$ và thực hiện 1 phép so sánh $O(1)$. Giải ra thu được $O(\log N)$.',
    6, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_089', 'short-answer', 'algorithm-fundamentals',
    'Điền tên tiếng Anh của bước neo kiểm tra điều kiện dừng của hàm đệ quy. (Viết thường 2 từ)',
    NULL,
    ARRAY['base case']::varchar[],
    'Base case ngăn chặn đệ quy vô hạn.',
    5, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  ),
  (
    'cs_algo_q_090', 'short-answer', 'algorithm-fundamentals',
    'Điền tên tiếng Anh của định lý dùng để giải nhanh hệ thức truy hồi đệ quy chia để trị. (Viết hoa chữ đầu)',
    NULL,
    ARRAY['Master theorem', 'Định lý Master', 'định lý master']::varchar[],
    'Master Theorem giải nhanh hệ thức truy hồi của thuật toán chia để trị.',
    5, 'Divide and Conquer', 'cs_algorithms_structures', 13, 'cs_algo_09'
  );

-- ======================================================================================
-- BÀI GIẢNG 10: Quy hoạch động (cs_algo_10) - 10 câu
-- ======================================================================================
INSERT INTO ge10_custom_questions (id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, lesson_id)
VALUES
  (
    'cs_algo_q_091', 'mcq', 'advanced-data-structures',
    'Đặc trưng cốt lõi quyết định một bài toán có thể giải quyết bằng Quy hoạch động (Dynamic Programming) là gì?',
    ARRAY['Bài toán chứa các bài toán con trùng lặp (Overlapping Subproblems) và có cấu trúc con tối ưu (Optimal Substructure)', 'Bài toán không sử dụng đệ quy', 'Dữ liệu đầu vào phải là số âm', 'Đồ thị phải liên thông mạnh'],
    ARRAY['Bài toán chứa các bài toán con trùng lặp (Overlapping Subproblems) và có cấu trúc con tối ưu (Optimal Substructure)']::varchar[],
    'Optimal Substructure nghĩa là lời giải tối ưu bài toán lớn cấu thành từ lời giải tối ưu bài toán con. Overlapping Subproblems nghĩa là bài toán con được tính lại nhiều lần, cho phép ta lưu trữ kết quả để tránh tính trùng.',
    6, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_092', 'mcq', 'advanced-data-structures',
    'Kỹ thuật "Memoization" trong Quy hoạch động hoạt động theo cơ chế nào?',
    ARRAY['Top-down: Đi từ bài toán lớn xuống, giải quyết bằng đệ quy và lưu kết quả bài toán con vào mảng/hash map để dùng lại', 'Bottom-up: Đi từ bài toán nhỏ nhất lên bằng vòng lặp', 'Sắp xếp lại mảng dữ liệu ngẫu nhiên', 'Giải phóng bộ nhớ ngăn xếp tự động'],
    ARRAY['Top-down: Đi từ bài toán lớn xuống, giải quyết bằng đệ quy và lưu kết quả bài toán con vào mảng/hash map để dùng lại']::varchar[],
    'Memoization (ghi nhớ) đi từ trên xuống (Top-down), giữ nguyên mô hình đệ quy tự nhiên nhưng chặn việc tính trùng bằng bảng tra cứu.',
    6, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_093', 'mcq', 'advanced-data-structures',
    'Kỹ thuật "Tabulation" trong Quy hoạch động hoạt động theo cơ chế nào?',
    ARRAY['Bottom-up: Giải quyết tuần tự từ bài toán nhỏ nhất lên bằng vòng lặp và điền kết quả vào bảng tính', 'Top-down: Duyệt đệ quy từ trên xuống', 'Xóa hoàn toàn bảng dữ liệu để giải phóng RAM', 'Đồng bộ hóa dữ liệu đa luồng'],
    ARRAY['Bottom-up: Giải quyết tuần tự từ bài toán nhỏ nhất lên bằng vòng lặp và điền kết quả vào bảng tính']::varchar[],
    'Tabulation (lập bảng) đi từ dưới lên (Bottom-up), tính toán không đệ quy nên loại bỏ hoàn toàn chi phí gọi hàm và nguy cơ tràn Stack.',
    6, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_094', 'mcq', 'advanced-data-structures',
    'Phát biểu nào sau đây đúng khi so sánh Memoization (Top-down) và Tabulation (Bottom-up)?',
    ARRAY['Tabulation chạy nhanh hơn và an toàn về bộ nhớ Stack hơn vì không sử dụng đệ quy; Memoization dễ viết hơn do bám sát công thức truy hồi', 'Memoization luôn chạy nhanh hơn Tabulation', 'Tabulation tốn nhiều bộ nhớ Stack hơn', 'Không có sự khác biệt về hiệu năng giữa hai phương pháp'],
    ARRAY['Tabulation chạy nhanh hơn và an toàn về bộ nhớ Stack hơn vì không sử dụng đệ quy; Memoization dễ viết hơn do bám sát công thức truy hồi']::varchar[],
    'Tabulation không dùng đệ quy nên tránh được overhead của hàm. Memoization thì chỉ tính toán các trạng thái thực sự được gọi tới (lợi thế nếu không gian trạng thái thưa).',
    7, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_095', 'mcq', 'advanced-data-structures',
    'Bài toán "Cái túi 0/1" (0/1 Knapsack) giải bằng quy hoạch động lập bảng có độ phức tạp thời gian chạy là bao nhiêu (với $N$ vật phẩm và sức chứa $W$)?',
    ARRAY['O(N * W)', 'O(2^N)', 'O(N^2)', 'O(N + W)'],
    ARRAY['O(N * W)']::varchar[],
    'Thuật toán lập bảng kích thước $N \times W$ và điền từng ô bằng phép so sánh mất $O(1)$, tổng độ phức tạp là $O(N \times W)$ (thuật toán giả đa thức - pseudo-polynomial).',
    7, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_096', 'mcq', 'advanced-data-structures',
    'Tại sao phương pháp đệ quy tính số Fibonacci $F(n) = F(n-1) + F(n-2)$ ngây thơ lại có độ phức tạp thời gian chạy tồi tệ $O(2^n)$?',
    ARRAY['Do nó tính đi tính lại các số Fibonacci nhỏ hơn nhiều lần trên cây đệ quy mà không lưu kết quả', 'Do hệ số Fibonacci tăng quá nhanh', 'Do đệ quy bị sập lỗi hệ điều hành', 'Do sử dụng mảng tĩnh kích thước nhỏ'],
    ARRAY['Do nó tính đi tính lại các số Fibonacci nhỏ hơn nhiều lần trên cây đệ quy mà không lưu kết quả']::varchar[],
    'Ví dụ tính $F(5)$ gọi $F(4)$ và $F(3)$, cả hai đều tính tiếp $F(2)$. Việc lặp thừa thãi làm số nút trên cây đệ quy tăng theo hàm mũ $O(2^n)$.',
    6, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_097', 'mcq', 'advanced-data-structures',
    'Bước quan trọng nhất và khó khăn nhất khi thiết kế thuật toán Quy hoạch động là gì?',
    ARRAY['Tìm ra công thức truy hồi chuyển trạng thái (State Transition Equation) thể hiện mối liên hệ giữa bài toán lớn và bài toán con', 'Khai báo mảng dữ liệu', 'Viết khối try-catch xử lý lỗi', 'Đếm số lượng vòng lặp trong code'],
    ARRAY['Tìm ra công thức truy hồi chuyển trạng thái (State Transition Equation) thể hiện mối liên hệ giữa bài toán lớn và bài toán con']::varchar[],
    'Công thức truy hồi xác định cách tính trạng thái hiện tại từ các trạng thái trước đó. Đây là chìa khoá cốt lõi của Quy hoạch động.',
    7, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_098', 'mcq', 'advanced-data-structures',
    'Làm thế nào để tối ưu hóa không gian bộ nhớ (Space Optimization) từ $O(N)$ xuống $O(1)$ khi tính số Fibonacci bằng quy hoạch động lập bảng?',
    ARRAY['Chỉ cần lưu hai giá trị Fibonacci liền trước F(i-1) và F(i-2) thay vì lưu toàn bộ mảng N phần tử', 'Sử dụng con trỏ thông minh', 'Không khai báo bất kỳ biến số nào', 'Chuyển dữ liệu sang lưu trữ trên ổ đĩa cứng'],
    ARRAY['Chỉ làm lưu hai giá trị Fibonacci liền trước F(i-1) và F(i-2) thay vì lưu toàn bộ mảng N phần tử']::varchar[],
    'Vì số thứ $i$ chỉ phụ thuộc vào số thứ $i-1$ và $i-2$, ta chỉ cần 2 biến số để cập nhật luỹ tiến, tiết kiệm không gian mảng.',
    6, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_099', 'short-answer', 'advanced-data-structures',
    'Điền tên tiếng Anh của kỹ thuật Quy hoạch động theo cơ chế Top-down sử dụng đệ quy kết hợp bảng lưu trữ kết quả. (Viết thường)',
    NULL,
    ARRAY['memoization']::varchar[],
    'Memoization lưu trữ các kết quả trung gian để tránh tính toán trùng lặp.',
    5, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  ),
  (
    'cs_algo_q_100', 'short-answer', 'advanced-data-structures',
    'Điền tên tiếng Anh của kỹ thuật Quy hoạch động theo cơ chế Bottom-up sử dụng vòng lặp tính toán tuần tự và điền vào bảng. (Viết thường)',
    NULL,
    ARRAY['tabulation']::varchar[],
    'Tabulation lập bảng tính toán từ dưới lên loại bỏ đệ quy.',
    5, 'Dynamic Programming', 'cs_algorithms_structures', 13, 'cs_algo_10'
  );

COMMIT;
