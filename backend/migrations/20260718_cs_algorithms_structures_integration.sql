-- SQL migration to seed integrations, blueprints, and activities for cs_algorithms_structures (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_algorithms_structures
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_algorithms_structures', 'Part I', 'Phân tích Big O & Cấu trúc Dữ liệu Tuyến tính', 
    'Đo lường thời gian chạy Big O, bộ nhớ phụ, cấu trúc Mảng tĩnh/động, Danh sách liên kết đơn/đôi, Ngăn xếp Stack, Hàng đợi Queue và Priority Queue (Binary Heap).', 
    '["O(1)","O(N)","O(log N)","Stack","Queue","Linked List","Heap"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng tính toán Big O, các thuộc tính cơ bản của danh sách liên kết và cơ chế LIFO/FIFO.'
  ),
  (
    'cs_algorithms_structures', 'Part II', 'Bảng băm, Cây & Thuật toán Sắp xếp', 
    'Thiết kế Hash Table giải quyết xung đột (Chaining, Open Addressing), Cây tìm kiếm nhị phân (BST), cây AVL/Red-Black và các giải thuật sắp xếp (Quick Sort, Merge Sort, Heap Sort).', 
    '["Hash","Chaining","BST","AVL","Rotation","Red-Black","Quick Sort","Merge Sort","Heap Sort"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra thuật toán sắp xếp tối ưu, cơ chế cân bằng cây nhị phân và tối ưu hoá xung đột bảng băm.'
  ),
  (
    'cs_algorithms_structures', 'Part III', 'Giải thuật Đồ thị & Phương pháp Thiết kế', 
    'Duyệt BFS/DFS, thuật toán tìm đường Dijkstra/Bellman-Ford, phát hiện chu trình đồ thị, kỹ thuật Chia để trị và Quy hoạch động (Memoization vs Tabulation).', 
    '["BFS","DFS","Dijkstra","Bellman-Ford","Divide and Conquer","Dynamic Programming","Memoization","Tabulation"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra tư duy giải quyết đồ thị đường đi ngắn nhất, thiết kế thuật toán quy hoạch động và chia để trị.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_algorithms_structures
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-algo-fundamentals', 'algorithm-fundamentals', 'boss', 'Ma Vương Big O Vô Hạn', '{"boss_id": "b-algo-fundamentals", "boss_tag": "O(N^2)", "energy": 100}'::jsonb, 100, 100, 150, 'cs_algorithms_structures', 13),
  ('act-boss-algo-basic-ds', 'basic-data-structures', 'boss', 'Quái Thú Xung Đột Bảng Băm', '{"boss_id": "b-algo-basic-ds", "boss_tag": "Collision", "energy": 100}'::jsonb, 100, 100, 150, 'cs_algorithms_structures', 13),
  ('act-boss-algo-advanced-ds', 'advanced-data-structures', 'boss', 'Thần Cây AVL Mất Cân Bằng', '{"boss_id": "b-algo-advanced-ds", "boss_tag": "AVL", "energy": 100}'::jsonb, 100, 100, 150, 'cs_algorithms_structures', 13),
  ('act-boss-algo-graph', 'graph-algorithms', 'boss', 'Ác Thần Chu Trình Âm Vô Tận', '{"boss_id": "b-algo-graph", "boss_tag": "Graph", "energy": 100}'::jsonb, 100, 100, 150, 'cs_algorithms_structures', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_algorithms_structures
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-algo-fundamentals', 'algorithm-fundamentals', 'quiz', 'Luyện tập Phân tích Big O & Sắp xếp', '{"mode": "grammar", "reward": "Ưu tiên phân tích tiệm cận và so sánh thuật toán sắp xếp"}'::jsonb, 50, 10, 20, 'cs_algorithms_structures', 13),
  ('act-quiz-algo-basic-ds', 'basic-data-structures', 'quiz', 'Luyện tập CTDL Tuyến tính & Hash', '{"mode": "vocabulary", "reward": "Ưu tiên cấu trúc ngăn xếp, hàng đợi và bảng băm"}'::jsonb, 50, 10, 20, 'cs_algorithms_structures', 13),
  ('act-quiz-algo-advanced-ds', 'advanced-data-structures', 'quiz', 'Luyện tập Cây nhị phân & Quy hoạch động', '{"mode": "reading", "reward": "Ưu tiên cây AVL, cây đỏ đen và công thức quy hoạch động"}'::jsonb, 50, 10, 20, 'cs_algorithms_structures', 13),
  ('act-quiz-algo-graph', 'graph-algorithms', 'quiz', 'Luyện tập BFS, DFS & Dijkstra', '{"mode": "mixed", "reward": "Ưu tiên duyệt đồ thị và giải thuật tìm đường ngắn nhất"}'::jsonb, 50, 10, 20, 'cs_algorithms_structures', 13)
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

-- 4. Seed Textbook Mappings for cs_algorithms_structures
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-algo-bigo', 'cs_algorithms_structures', 'Nền tảng', 1, 'thach'),
  ('cs-algo-linkedlists', 'cs_algorithms_structures', 'Cấu trúc', 2, 'hoa'),
  ('cs-algo-stacksqueues', 'cs_algorithms_structures', 'Cấu trúc', 3, 'hoa'),
  ('cs-algo-hashtables', 'cs_algorithms_structures', 'Cấu trúc', 4, 'hoa'),
  ('cs-algo-bst', 'cs_algorithms_structures', 'Nâng cao', 5, 'bang'),
  ('cs-algo-sorting', 'cs_algorithms_structures', 'Nền tảng', 6, 'thach'),
  ('cs-algo-bfsdfs', 'cs_algorithms_structures', 'Đồ thị', 7, 'phong'),
  ('cs-algo-shortestpath', 'cs_algorithms_structures', 'Đồ thị', 8, 'phong'),
  ('cs-algo-divideconquer', 'cs_algorithms_structures', 'Nền tảng', 9, 'thach'),
  ('cs-algo-dp', 'cs_algorithms_structures', 'Nâng cao', 10, 'bang')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
