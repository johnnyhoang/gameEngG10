# Sub-Spec: Đặc Tả Các Loại Câu Hỏi & Cấu Trúc Ngân Hàng Câu Hỏi

Tài liệu này là đặc tả chuẩn (**Single Source of Truth**) cho toàn bộ các loại câu hỏi trắc nghiệm và tự luận được hỗ trợ trong hệ thống GameEngG10. Đặc tả này định nghĩa mô hình dữ liệu trong code, cấu trúc bảng trong cơ sở dữ liệu, hành vi giao diện người dùng (UI/UX) và cơ chế đánh giá (chấm điểm) cho từng loại.

---

## 1. Mô hình Dữ liệu Hệ thống

### 1.1. Cấu trúc TypeScript (`src/types/game.ts`)

Mỗi câu hỏi trong hệ thống được định nghĩa bởi interface [Question](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/types/game.ts#L122-L152):

```typescript
export type QuestionType = 
  | 'mcq' 
  | 'multiple_choice' 
  | 'text_input' 
  | 'matching' 
  | 'wordform' 
  | 'rewrite' 
  | 'cloze' 
  | 'reading' 
  | 'short-answer' 
  | 'proof' 
  | 'multi-part';

export interface Question {
  id: string;                               // ID duy nhất (UUID hoặc chuỗi định danh)
  type: QuestionType;                       // Dạng câu hỏi
  category: string;                         // Thể loại cụ thể (ví dụ: "tenses", "geometry")
  topicId?: string;                         // ID chuyên đề Core Knowledge tương ứng
  prompt: string;                           // Đề bài (chấp nhận định dạng Markdown/LaTeX)
  options?: string[];                       // Các lựa chọn phương án nhiễu (Dành cho MCQ/Cloze)
  correctAnswer: string | string[];         // Đáp án đúng (Chuỗi đơn hoặc Mảng các đáp án hợp lệ)
  explanation: string;                      // Hướng dẫn giải thích lời giải cho học sinh
  difficulty: number;                       // Độ khó (Thang từ 1 đến 10)
  source: string;                           // Nguồn của đề (ví dụ: "Đề Tuyển Sinh Lớp 10 TP.HCM 2024")
  subject?: SubjectId;                      // ID Môn học (english, math, literature...)
  grade?: number;                           // Lớp học (8, 9, 10, 11, 12)
  gradeTier?: GradeTier;                    // Tầng lớp học đường cô lập dữ liệu (6 đến 12)
  imageUrl?: string;                        // URL hình ảnh đính kèm (nếu có)
  metadata?: QuestionMeta;                  // Metadata bổ trợ chuyên sâu cho từng môn học
  isConfused?: boolean;                     // Cờ đánh dấu câu hỏi bị lỗi/cần xem xét
  skipReason?: 'quá khó' | 'quá dài' | 'quá khùng'; // Lý do học sinh dùng Miễn Phạt để bỏ qua
  skipSeverity?: number;                    // Mức độ nghiêm trọng của lượt bỏ qua
  
  // Các trường thống kê hiệu suất câu hỏi (denormalized)
  timesOpened?: number;                     // Số lần câu hỏi được mở
  timesAnsweredCorrectly?: number;          // Số lần trả lời đúng
  timesSkipped?: number;                    // Số lần bị học sinh bỏ qua
  lastOpenedAt?: string;                    // Lần cuối cùng sử dụng
}
```

Cấu trúc metadata chi tiết [QuestionMeta](file:///d:/Hoa%20Hoang/Apps/gameEngG10/src/types/game.ts#L174-L192):

```typescript
export interface QuestionMeta {
  isStandard?: boolean;                     // Đánh dấu câu hỏi đã được kiểm duyệt Đạt Chuẩn 🏆
  examPart?: string;                        // Phần thi trong đề (ví dụ: "Phần I", "Bài 1")
  mathTopic?: 'function-graph' | 'quadratic-equation' | 'linear-function' | 'growth-modeling' | 'percentage-discount' | 'volume-displacement' | 'shopping-discount' | 'tangent-geometry' | 'statistics-probability' | 'modeling' | 'solid-geometry' | 'finance' | 'plane-geometry' | 'mixed';
  answerMode?: 'single-choice' | 'short-answer' | 'proof' | 'multi-part' | 'numeric' | 'expression';
  solutionStyle?: 'direct' | 'worked' | 'proof-outline' | 'diagram' | 'table' | 'rubric';
  englishPart?: 'Part I' | 'Part II' | 'Part III' | 'Part IV' | 'Part V' | 'Part VI';
  englishTask?: 'grammar' | 'vocabulary' | 'pronunciation' | 'stress' | 'guided-cloze' | 'reading-true-false' | 'reading-mcq' | 'word-form' | 'rearrangement' | 'transformation' | 'mixed';
  englishSkill?: 'multiple-choice' | 'guided-cloze' | 'reading' | 'word-form' | 'rearrangement' | 'transformation';
  literatureTrack?: 'reading' | 'vietnamese' | 'social-essay' | 'literary-essay';
  literatureTask?: 'main-idea' | 'detail' | 'rhetoric' | 'vocabulary' | 'message' | 'social-essay' | 'poetry-analysis' | 'prose-analysis' | 'character-analysis' | 'comparison';
  textGenre?: 'poetry' | 'prose' | 'argument' | 'informative' | 'mixed';
  subparts?: string[];                      // Danh sách các ý con trong câu hỏi nhiều ý (ví dụ: ["a", "b", "c"])
  solutionSteps?: string[];                 // Các bước giải gợi ý dùng để làm khung chấm điểm AI Rubric
  formulaHints?: string[];                  // Gợi ý công thức toán học liên quan
  diagramHint?: string;                     // Chỉ dẫn vẽ hình học
  tags?: string[];                          // Nhãn phân loại linh hoạt
}
```

### 1.2. Cấu trúc Database (`ge10_custom_questions`)

Trong cơ sở dữ liệu Supabase/PostgreSQL, thông tin câu hỏi được lưu trữ trong bảng [ge10_custom_questions](file:///d:/Hoa%20Hoang/Apps/gameEngG10/backend/src/schema.sql#L189-L205):

| Tên Cột | Kiểu Dữ Liệu | Ràng Buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `VARCHAR(255)` | `PRIMARY KEY` | Định danh duy nhất của câu hỏi |
| `user_id` | `VARCHAR(255)` | `FOREIGN KEY` | Tham chiếu tới người tạo (`ge10_users.id`) |
| `type` | `VARCHAR(50)` | `NOT NULL` | Khớp với `QuestionType` trong code |
| `category` | `VARCHAR(255)` | `NOT NULL` | Phân loại mảng kiến thức |
| `prompt` | `TEXT` | `NOT NULL` | Nội dung đề bài |
| `options` | `TEXT[]` | | Mảng danh sách các phương án lựa chọn |
| `correct_answer` | `TEXT[]` | `NOT NULL` | Mảng danh sách các câu trả lời đúng/chấp nhận được |
| `explanation` | `TEXT` | | Giải thích đáp án |
| `difficulty` | `INTEGER` | `DEFAULT 5` | Độ khó câu hỏi |
| `source` | `VARCHAR(255)` | | Nguồn gốc câu hỏi |
| `subject` | `VARCHAR(50)` | `DEFAULT 'english'` | Môn học liên quan |
| `grade_tier` | `INTEGER` | `NOT NULL DEFAULT 9` | Tầng lớp học tập của câu hỏi |
| `image_url` | `TEXT` | | Hình ảnh minh họa |
| `metadata` | `JSONB` | `DEFAULT '{}'` | Metadata mở rộng cấu hình môn học |
| `is_confused` | `BOOLEAN` | `DEFAULT FALSE` | Đánh dấu lỗi báo cáo |

---

## 2. Chi tiết 11 loại câu hỏi (`QuestionType`)

### 2.1. `mcq` (Trắc nghiệm đơn)
- **Mô tả**: Dạng trắc nghiệm 4 lựa chọn phổ biến nhất. Học sinh chọn 1 đáp án duy nhất trong danh sách.
- **Hành vi UI**: Hiển thị đề bài và danh sách 4 lựa chọn dưới dạng các nút bấm tròn. Học sinh chọn và nhấn xác nhận.
- **Cơ chế chấm**: Khớp chuỗi chính xác sau khi chuẩn hóa qua hàm `cleanAnswer()`.
- **Cấu trúc lưu trữ**:
  - `options`: Mảng 4 phần tử chuỗi.
  - `correctAnswer`: Chuỗi đơn (phải trùng khớp chính xác với 1 phần tử trong `options`).
- **Ví dụ thực tế**:
  ```json
  {
    "id": "hcm-eng-mcq-1",
    "type": "mcq",
    "category": "grammar",
    "prompt": "She wishes she ________ a teacher next year.",
    "options": ["will be", "would be", "is", "were"],
    "correctAnswer": "would be",
    "explanation": "Câu ước ở tương lai dùng S + wish + S + would/could + V-bare."
  }
  ```

### 2.2. `multiple_choice` (Trắc nghiệm nâng cao / Nhiều lựa chọn đúng)
- **Mô tả**: Câu hỏi trắc nghiệm có thể có nhiều phương án đúng cùng lúc. Học sinh phải chọn đúng toàn bộ các câu trả lời đúng.
- **Hành vi UI**: Hiển thị danh sách lựa chọn dưới dạng các ô check-box. Học sinh đánh dấu và nhấn kiểm tra.
- **Cơ chế chấm**: So sánh tập hợp câu trả lời của học sinh với mảng `correctAnswer` (Không quan tâm thứ tự).
- **Cấu trúc lưu trữ**:
  - `options`: Mảng danh sách các phương án.
  - `correctAnswer`: Mảng các phương án đúng.
- **Ví dụ thực tế**:
  ```json
  {
    "id": "mc-multi-1",
    "type": "multiple_choice",
    "category": "grammar",
    "prompt": "Các từ nào sau đây là trạng từ chỉ tần suất?",
    "options": ["Always", "Beautifully", "Often", "Quickly"],
    "correctAnswer": ["Always", "Often"],
    "explanation": "Always và Often là các trạng từ chỉ tần suất thường gặp."
  }
  ```

### 2.3. `text_input` (Tự luận ngắn tự do)
- **Mô tả**: Câu hỏi tự luận mở yêu cầu viết câu trả lời ngắn dưới dạng văn bản tự do.
- **Hành vi UI**: Hiển thị ô nhập văn bản (Text field) để học sinh tự gõ câu trả lời.
- **Cơ chế chấm**: Khớp chuỗi chính xác với đáp án lưu trữ, hoặc thông qua AI Grader nếu được định nghĩa bộ chấm chuyên biệt.
- **Cấu trúc lưu trữ**:
  - `correctAnswer`: Mảng các chuỗi đáp án được chấp nhận (chỉ cần khớp một trong các phương án).
- **Ví dụ thực tế**:
  ```json
  {
    "id": "ti-free-1",
    "type": "text_input",
    "category": "vocabulary",
    "prompt": "What is the antonym of 'generous'?",
    "correctAnswer": ["mean", "selfish", "stingy"],
    "explanation": "Trái nghĩa với generous (hào phóng) là ích kỷ, keo kiệt."
  }
  ```

### 2.4. `matching` (Nối cặp)
- **Mô tả**: Dạng bài nối các phần tử ở cột trái với các phần tử tương ứng ở cột phải.
- **Hành vi UI**: Giao diện hiển thị các ô kéo thả (Drag and drop) hoặc click chọn hai phần tử để tạo đường nối liên kết giữa chúng.
- **Cơ chế chấm**: So khớp toàn bộ các cặp nối của học sinh có trùng với định nghĩa đáp án đúng hay không.
- **Cấu trúc lưu trữ**:
  - `options`: Chứa danh sách các phần tử cột trái và cột phải (Ví dụ: `["A-1", "B-2"]`).
  - `correctAnswer`: Danh sách các chuỗi định nghĩa cặp đúng (Ví dụ dạng JSON hoặc mảng mapping).

### 2.5. `wordform` (Dạng của từ)
- **Mô tả**: Dạng bài tập đặc thù của môn Tiếng Anh. Học sinh điền dạng đúng của từ gốc trong ngoặc đơn.
- **Hành vi UI**: Đề bài chứa câu có khoảng trống kèm từ gốc đặt trong dấu ngoặc đơn, phía dưới hiển thị ô nhập đáp án ngắn.
- **Cơ chế chấm**: Khớp chuỗi chính xác sau khi chuẩn hóa viết thường, bỏ khoảng trắng dư thừa.
- **Cấu trúc lưu trữ**:
  - `correctAnswer`: Mảng các từ biến thể được chấp nhận (thông thường là 1 hoặc 2 biến thể).
- **Ví dụ thực tế**:
  ```json
  {
    "id": "eng-wf-1",
    "type": "wordform",
    "category": "wordform",
    "prompt": "The book was very ________. (INTEREST)",
    "correctAnswer": ["interesting"],
    "explanation": "Chỗ trống cần một tính từ để bổ nghĩa cho danh từ chỉ vật 'The book'. Vì thế dùng interesting."
  }
  ```

### 2.6. `rewrite` (Viết lại câu)
- **Mô tả**: Bài tập viết lại câu giữ nguyên nghĩa, thường bắt đầu bằng các từ gợi ý sẵn.
- **Hành vi UI**: Hiển thị câu gốc, phần bắt đầu câu mới và một ô nhập văn bản dài.
- **Cơ chế chấm**: So khớp chuỗi chuẩn hóa đối chiếu với mảng đáp án mẫu. Nếu câu hỏi thuộc module viết nâng cao, hệ thống có thể tích hợp AI chấm theo ngữ pháp.
- **Cấu trúc lưu trữ**:
  - `correctAnswer`: Mảng các cách viết lại câu đúng và được chấp nhận.
- **Ví dụ thực tế**:
  ```json
  {
    "id": "eng-rw-1",
    "type": "rewrite",
    "category": "rewrite",
    "prompt": "We started studying English five years ago.\n-> We have ................................................",
    "correctAnswer": [
      "we have studied english for five years",
      "we have been studying english for five years"
    ],
    "explanation": "Viết lại câu từ quá khứ đơn (started + V-ing + thời gian ago) sang hiện tại hoàn thành (have + V3/ed + for + khoảng thời gian)."
  }
  ```

### 2.7. `cloze` (Điền khuyết đoạn văn)
- **Mô tả**: Bài tập đọc hiểu điền khuyết. Đoạn văn dài có các khoảng trống đánh số thứ tự, mỗi khoảng trống tương ứng một câu trắc nghiệm.
- **Hành vi UI**: Hiển thị đoạn văn hoàn chỉnh. Khi học sinh click vào khoảng trống (1), (2), giao diện hiển thị 4 lựa chọn trắc nghiệm tương ứng bên dưới để chọn.
- **Cơ chế chấm**: So khớp đáp án đơn lẻ của từng khoảng trống như câu hỏi `mcq`.
- **Cấu trúc lưu trữ**:
  - Mỗi khoảng trống thường được tách thành một câu hỏi có `type = 'cloze'` trong database, tham chiếu chung một ngữ cảnh thông qua `category` hoặc `topicId`.

### 2.8. `reading` (Đọc hiểu văn bản lớn)
- **Mô tả**: Bài đọc hiểu văn bản dài, đi kèm một hoặc nhiều câu hỏi trắc nghiệm/tự luận ngắn khai thác nội dung bài đọc.
- **Hành vi UI**: Áp dụng cơ chế **Split screen (Giao diện chia đôi)**:
  - Nửa bên trái: Hiển thị ngữ liệu đọc hiểu cố định (Passage text), hỗ trợ cuộn độc lực.
  - Nửa bên phải: Hiển thị câu hỏi hiện tại, các lựa chọn trả lời và nút điều hướng qua lại giữa các câu hỏi con thuộc bài đọc.
- **Cơ chế chấm**: Theo cấu trúc của từng câu hỏi con được nhúng (Trắc nghiệm hoặc tự luận ngắn).
- **Cấu trúc lưu trữ**:
  - Ngữ liệu đọc hiểu (Passage) được lưu trữ trong trường `prompt` trước dấu phân cách hoặc được định nghĩa cụ thể qua trường `metadata` phụ thuộc vào renderer chuyên biệt của môn học (ví dụ: `literature-reading`).

### 2.9. `short-answer` (Tự luận ngắn / Điền số / Điền biểu thức)
- **Mô tả**: Dạng bài tập tự luận yêu cầu học sinh giải và điền đáp số ngắn (chữ số, giá trị đại số hoặc biểu thức ngắn).
- **Hành vi UI**: Ô nhập liệu ngắn, hỗ trợ bàn phím ảo công thức toán nếu môn học là Toán Học.
- **Cơ chế chấm**:
  - *Môn Toán*: Gửi đáp án lên endpoint `/api/ai/grade-math` để AI phân tích tính tương đương toán học (ví dụ: học sinh nhập `x + 1` vẫn được tính là đúng nếu đáp án gốc là `1 + x`, hoặc `0.5` so với `1/2`).
  - *Các môn khác*: So khớp chuỗi chuẩn hóa chính xác.
- **Ví dụ thực tế**:
  ```json
  {
    "id": "math-sa-1",
    "type": "short-answer",
    "category": "quadratic-equation",
    "prompt": "Tìm nghiệm dương của phương trình: x^2 - 5x + 6 = 0",
    "correctAnswer": ["3", "x = 3"],
    "explanation": "Phương trình có hai nghiệm x = 2 và x = 3. Nghiệm lớn nhất/dương là 3.",
    "subject": "math"
  }
  ```

### 2.10. `proof` (Chứng minh lập luận)
- **Mô tả**: Dạng tự luận tự do yêu cầu học sinh trình bày đầy đủ các bước chứng minh hình học hoặc đại số phức tạp.
- **Hành vi UI**: Hiển thị đề bài, ô nhập văn bản lớn (Text area) hỗ trợ định dạng cơ bản, và nút mở **Nháp vẽ hình/Nháp viết tự do (`scratchpad`)** hỗ trợ học sinh tư duy trực quan.
- **Cơ chế chấm**: Chuyển tiếp dữ liệu lên AI Grader chấm điểm tự động dựa trên ma trận tiêu chí (Rubric) và danh sách gợi ý giải đề (`metadata.solutionSteps`). Học sinh nhận thang điểm từ 1 đến 10 kèm nhận xét chi tiết từng lỗi sai.
- **Ví dụ thực tế**:
  ```json
  {
    "id": "math-pf-1",
    "type": "proof",
    "category": "tangent-geometry",
    "prompt": "Cho đường tròn (O) và điểm A nằm ngoài đường tròn. Vẽ tiếp tuyến AB. Chứng minh OB vuông góc với AB.",
    "correctAnswer": "Vì AB là tiếp tuyến của đường tròn (O) tại tiếp điểm B, nên bán kính OB vuông góc với tiếp tuyến AB tại tiếp điểm B (theo tính chất tiếp tuyến). Do đó OB vuông góc với AB.",
    "explanation": "Bám sát định nghĩa tính chất tiếp tuyến của đường tròn để suy ra quan hệ vuông góc.",
    "subject": "math",
    "metadata": {
      "answerMode": "proof",
      "solutionStyle": "proof-outline",
      "solutionSteps": [
        "Chỉ ra B là tiếp điểm trên đường tròn (O).",
        "Áp dụng tính chất tiếp tuyến: bán kính đi qua tiếp điểm thì vuông góc với tiếp tuyến.",
        "Kết luận OB vuông góc với AB."
      ]
    }
  }
  ```

### 2.11. `multi-part` (Câu hỏi nhiều ý hỏi con)
- **Mô tả**: Dạng bài tổng hợp gồm một ngữ cảnh lớn nhưng chia nhỏ thành các ý hỏi riêng biệt (ví dụ: ý a, ý b, ý c).
- **Hành vi UI**: Giao diện hiển thị đề bài chung ở trên. Phía dưới hiển thị các hộp nhập câu trả lời tương ứng với từng ý `a)`, `b)`.
- **Cơ chế chấm**: Chấm điểm độc lập cho từng ý con. Kết quả tổng hợp là tỷ lệ phần trăm số ý trả lời đúng trên tổng số ý.
- **Cấu trúc lưu trữ**:
  - `correctAnswer`: Lưu trữ dưới dạng mảng các chuỗi, mỗi chuỗi tương ứng với đáp án của một ý con (khớp theo thứ tự chỉ mục).
  - `metadata.subparts`: Danh sách tên các ý con (Ví dụ: `["a", "b"]`).
- **Ví dụ thực tế**:
  ```json
  {
    "id": "math-mp-1",
    "type": "multi-part",
    "category": "linear-function",
    "prompt": "Cho hàm số y = 2x + 3.\na) Tính giá trị của y khi x = 1.\nb) Tìm tọa độ giao điểm của đồ thị hàm số với trục tung Oy.",
    "correctAnswer": ["5", "(0;3)"],
    "explanation": "a) Thế x = 1 vào y = 2(1) + 3 = 5.\nb) Giao điểm trục tung Oy có x = 0 => y = 3. Tọa độ là (0;3).",
    "subject": "math",
    "metadata": {
      "subparts": ["a", "b"]
    }
  }
  ```

---

## 3. Quy trình Chấm điểm & Đánh giá Dữ liệu Học tập

### 3.1. Chuẩn hóa Chuỗi (`cleanAnswer`)
Trước khi tiến hành so sánh, toàn bộ dữ liệu nhập của học sinh và đáp án lưu trữ sẽ đi qua bộ lọc chuẩn hóa chuỗi để hạn chế sai số định dạng:
```typescript
const cleanAnswer = (str: string) => str
  .trim()
  .toLowerCase()
  .replace(/\s+/g, '')       // Xóa toàn bộ khoảng trắng thừa
  .replace(/[–−]/g, '-')     // Chuẩn hóa dấu gạch ngang/dấu trừ âm
  .replace(/[×·]/g, '*')     // Chuẩn hóa dấu nhân
  .replace(/[₁]/g, '1')      // Chuẩn hóa số nhỏ subscript
  .replace(/[₂]/g, '2');
```

### 3.2. Hệ thống Tự Động chấm điểm bằng Trí Tuệ Nhân Tạo (AI Grading)
Đối với các câu hỏi tự luận dài hoặc câu hỏi chấm theo ma trận tiêu chí:

#### 3.2.1. Chấm điểm Toán tự luận tự động (`/api/ai/grade-math`)
- **Nguyên lý**: Gửi prompt câu hỏi, đáp án mẫu và lời giải của học sinh lên LLM.
- **Mục tiêu**: Nhận diện tính tương đương toán học. Chấp nhận các cách viết biểu thức tương đương (ví dụ: `(x-1)(x+2)` và `x^2 + x - 2` đều được chấm Đúng nếu đó là đáp án hợp lệ).

#### 3.2.2. Chấm điểm Ngữ Văn theo Rubric tiêu chí (`assessLiteratureRubric`)
- **Nguyên lý**: Sử dụng dịch vụ AI Companion đánh giá bài viết của học sinh đối chiếu với `solutionSteps` và các từ khóa chuẩn trong `correctAnswer`.
- **Đầu ra**: Trả về điểm số thang 10, danh sách các từ khóa/luận điểm thiếu (`missingKeywords`), nhận xét tổng quan (`feedback`), và đề xuất sửa đổi cụ thể (`suggestions`).

---

## 4. Phân phối Câu hỏi theo Mô-đun Chuyên Môn

Hệ thống phân bổ các loại câu hỏi vào từng môn học như sau:

| Môn Học | Nhóm Hoạt Động | Các Loại Câu Hỏi Được Hỗ Trợ |
| :--- | :--- | :--- |
| **Tiếng Anh** 🇬🇧 | Ngữ pháp, Từ vựng, Điền khuyết, Viết lại câu, Đọc hiểu | `mcq`, `cloze`, `wordform`, `rewrite`, `reading` |
| **Toán Học** 📐 | Đại số, Hình học, Bài toán thực tế | `mcq`, `short-answer` (điền số/biểu thức), `proof` (hình học), `multi-part` (bài toán nhiều ý) |
| **Ngữ Văn** 📖 | Đọc hiểu văn bản, Thực hành Tiếng Việt, Viết đoạn/bài nghị luận | `mcq` (nhận biết), `short-answer` (thông hiểu), `proof` (viết luận văn học/xã hội) |
| **Môn Cơ Bản** ⚖️ | Trắc nghiệm kiến thức, Đố vui nhận Ruby | `mcq` (thuần trắc nghiệm 4 lựa chọn) |
