-- SQL migration to seed integrations, blueprints, and activities for cs_artificial_intelligence (grade_tier = 13)
-- Created on 2026-07-18

BEGIN;

-- 1. Seed ge10_subject_exam_blueprints for cs_artificial_intelligence
INSERT INTO ge10_subject_exam_blueprints (subject, part, title, focus, common_question_forms, answer_modes, import_hint)
VALUES 
  (
    'cs_artificial_intelligence', 'Part I', 'Tìm kiếm thông minh & Tìm kiếm đối kháng', 
    'DFS, BFS, giải thuật tìm kiếm A* (hàm heuristic chấp nhận được/nhất quán), tìm kiếm đối kháng Minimax và cắt tỉa Alpha-Beta trong game.', 
    '["DFS","BFS","A*","Heuristic","Minimax","Alpha-Beta","Pruning"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng phân tích thuật toán tìm kiếm, điều kiện tối ưu heuristics và tính toán cắt tỉa Alpha-Beta trên cây trò chơi.'
  ),
  (
    'cs_artificial_intelligence', 'Part II', 'Biểu diễn tri thức & Học máy cơ bản', 
    'Logic mệnh đề, logic vị từ bậc nhất FOL, skolem hóa, hệ chuyên gia (suy diễn tiến/lùi), học có giám sát/không giám sát, hồi quy và cây quyết định.', 
    '["FOL","Inference","Forward Chaining","Backward Chaining","Supervised","Unsupervised","Regression","Gini","Entropy"]'::jsonb, 
    '["single-choice"]'::jsonb, 
    'Kiểm tra khả năng chuyển đổi câu logic, phân tích suy diễn luật sản xuất và kiến thức thuật toán hồi quy, cây quyết định.'
  ),
  (
    'cs_artificial_intelligence', 'Part III', 'Mạng nơ-ron, Lan truyền ngược & Transformers', 
    'Cấu trúc Perceptron và MLP, hàm kích hoạt phi tuyến Sigmoid/ReLU, lan truyền ngược (Chain Rule), kiến trúc Transformers (Self-Attention, Multi-head).', 
    '["Perceptron","MLP","Activation","Sigmoid","ReLU","Backpropagation","Transformers","Self-Attention","LLM"]'::jsonb, 
    '["short-answer"]'::jsonb, 
    'Kiểm tra hiểu biết sâu sắc về toán học lan truyền ngược, hiện tượng vanishing gradient, cơ chế attention và kiến trúc mô hình ngôn ngữ lớn LLM.'
  )
ON CONFLICT (id) DO UPDATE SET
  subject = EXCLUDED.subject,
  part = EXCLUDED.part,
  title = EXCLUDED.title,
  focus = EXCLUDED.focus,
  common_question_forms = EXCLUDED.common_question_forms,
  answer_modes = EXCLUDED.answer_modes,
  import_hint = EXCLUDED.import_hint;

-- 2. Seed Boss Activities for 4 topics of cs_artificial_intelligence
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-boss-ai-search', 'search-heuristics', 'boss', 'Ma Vương Alpha-Beta Thất Lạc', '{"boss_id": "b-ai-search", "boss_tag": "Pruning", "energy": 100}'::jsonb, 100, 100, 150, 'cs_artificial_intelligence', 13),
  ('act-boss-ai-logic', 'knowledge-logic', 'boss', 'Ác Linh Logic Mệnh Đề', '{"boss_id": "b-ai-logic", "boss_tag": "FOL", "energy": 100}'::jsonb, 100, 100, 150, 'cs_artificial_intelligence', 13),
  ('act-boss-ai-learning', 'machine-learning', 'boss', 'Quái Nhân Hồi Quy Logistic', '{"boss_id": "b-ai-learning", "boss_tag": "Logistic", "energy": 100}'::jsonb, 100, 100, 150, 'cs_artificial_intelligence', 13),
  ('act-boss-ai-neural', 'neural-networks', 'boss', 'Sứ Giả Triệt Tiêu Gradient', '{"boss_id": "b-ai-neural", "boss_tag": "Backprop", "energy": 100}'::jsonb, 100, 100, 150, 'cs_artificial_intelligence', 13)
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

-- 3. Seed Quiz Activities for 4 topics of cs_artificial_intelligence
INSERT INTO ge10_activities (id, topic_id, activity_type, title, config, sort_order, reward_np, reward_xp, subject, grade_tier)
VALUES
  ('act-quiz-ai-search', 'search-heuristics', 'quiz', 'Luyện tập A* & Alpha-Beta', '{"mode": "grammar", "reward": "Ưu tiên giải thuật tìm kiếm A* và cắt tỉa Alpha-Beta đối kháng"}'::jsonb, 50, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-quiz-ai-logic', 'knowledge-logic', 'quiz', 'Luyện tập Logic & Suy diễn', '{"mode": "vocabulary", "reward": "Ưu tiên logic vị từ bậc nhất và suy diễn tiến/lùi hệ chuyên gia"}'::jsonb, 50, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-quiz-ai-learning', 'machine-learning', 'quiz', 'Luyện tập Hồi quy & Cây quyết định', '{"mode": "reading", "reward": "Ưu tiên thuật toán hồi quy, Gini/Entropy và Random Forest"}'::jsonb, 50, 10, 20, 'cs_artificial_intelligence', 13),
  ('act-quiz-ai-neural', 'neural-networks', 'quiz', 'Luyện tập MLP, Backpropagation & Transformers', '{"mode": "mixed", "reward": "Ưu tiên lan truyền ngược chain rule và cơ chế tự chú ý attention"}'::jsonb, 50, 10, 20, 'cs_artificial_intelligence', 13)
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

-- 4. Seed Textbook Mappings for cs_artificial_intelligence
INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
VALUES
  ('cs-ai-astar', 'cs_artificial_intelligence', 'Tìm kiếm', 1, 'thach'),
  ('cs-ai-minimax', 'cs_artificial_intelligence', 'Tìm kiếm', 2, 'thach'),
  ('cs-ai-fol', 'cs_artificial_intelligence', 'Logic', 3, 'phong'),
  ('cs-ai-expert', 'cs_artificial_intelligence', 'Logic', 4, 'phong'),
  ('cs-ai-supervised', 'cs_artificial_intelligence', 'Học máy', 5, 'hoa'),
  ('cs-ai-regression', 'cs_artificial_intelligence', 'Học máy', 6, 'hoa'),
  ('cs-ai-decisiontree', 'cs_artificial_intelligence', 'Học máy', 7, 'hoa'),
  ('cs-ai-mlp', 'cs_artificial_intelligence', 'Mạng nơ-ron', 8, 'bang'),
  ('cs-ai-backprop', 'cs_artificial_intelligence', 'Mạng nơ-ron', 9, 'bang'),
  ('cs-ai-transformers', 'cs_artificial_intelligence', 'Mạng nơ-ron', 10, 'bang')
ON CONFLICT (category_key) DO UPDATE SET
  subject = EXCLUDED.subject,
  loai = EXCLUDED.loai,
  bai = EXCLUDED.bai,
  ham = EXCLUDED.ham;

COMMIT;
