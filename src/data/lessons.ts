export interface Lesson {
  id: string;
  subject: 'english' | 'math' | 'literature';
  topic: string;
  title: string;
  theory: string;
  category: string;
}

export const INITIAL_LESSONS: Lesson[] = [
  // 1. English Lessons
  {
    id: 'eng-tenses',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Thì động từ (Verb Tenses)',
    category: 'tenses',
    theory: `# Các thì Tiếng Anh vào 10 (Verb Tenses)

## 1. Thì Hiện tại hoàn thành (Present Perfect)
- **Cấu trúc:** S + have/has + V3/ed
- **Cách dùng chính:** Diễn tả hành động xảy ra trong quá khứ kéo dài đến hiện tại và có thể tiếp tục ở tương lai. Hoặc hành động vừa mới xảy ra, hành động đã làm nhiều lần.
- **Dấu hiệu:** for, since, already, yet, just, ever, never, recently, so far.

## 2. Thì Quá khứ đơn (Past Simple)
- **Cấu trúc:** S + V2/ed (phủ định dùng didn't + V-inf)
- **Cách dùng chính:** Hành động đã xảy ra và chấm dứt hoàn toàn trong quá khứ, biết rõ thời gian.
- **Dấu hiệu:** yesterday, last week/month/year, ago, in + mốc năm quá khứ.

> **Mẹo phòng thi:** Phân biệt "for + khoảng thời gian" (HTHT) và "ago" (QKĐ). Tránh nhầm lẫn trạng từ chỉ mốc thời gian để chọn đúng thì phù hợp.`
  },
  {
    id: 'eng-passive',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Câu bị động (Passive Voice)',
    category: 'passive-voice',
    theory: `# Câu bị động (Passive Voice)

## 1. Quy tắc chuyển đổi chung
- **Bước 1:** Lấy Tân ngữ (O) của câu chủ động làm Chủ ngữ (S) của câu bị động.
- **Bước 2:** Chia động từ to be theo thì của câu chủ động và phù hợp với chủ ngữ mới.
- **Bước 3:** Đưa động từ chính về dạng V3/ed.
- **Bước 4:** Viết thêm by + Tác nhân (nếu cần thiết).

## 2. Bảng biến đổi nhanh
- **Hiện tại đơn:** S + am/is/are + V3/ed
- **Quá khứ đơn:** S + was/were + V3/ed
- **Tương lai đơn:** S + will be + V3/ed
- **Hiện tại hoàn thành:** S + have/has been + V3/ed

> **Lưu ý đặc biệt:** Các từ chỉ nơi chốn đứng trước "by", trạng từ chỉ thời gian đứng sau "by".
*Ví dụ: The report was written in the office by John yesterday.*`
  },
  {
    id: 'eng-relative',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Mệnh đề quan hệ (Relative Clauses)',
    category: 'relative-clauses',
    theory: `# Mệnh đề quan hệ (Relative Clauses)

## 1. Các đại từ quan hệ phổ biến
- **WHO:** Thay cho danh từ chỉ người, làm Chủ ngữ. (S + WHO + V)
- **WHOM:** Thay cho danh từ chỉ người, làm Tân ngữ. (S + WHOM + S + V)
- **WHICH:** Thay cho danh từ chỉ vật/sự việc, làm Chủ ngữ hoặc Tân ngữ.
- **THAT:** Thay thế cho WHO, WHOM, WHICH trong mệnh đề xác định (không dùng sau dấu phẩy hoặc giới từ).
- **WHOSE:** Thay cho tính từ sở hữu. (Danh từ + WHOSE + Danh từ)

## 2. Mệnh đề quan hệ rút gọn (Reduced Relative Clauses)
- **Dạng chủ động:** Rút gọn thành V-ing.
  *Ví dụ: The man who stands there -> The man standing there.*
- **Dạng bị động:** Rút gọn thành V3/ed.
  *Ví dụ: The book which was written by Nam -> The book written by Nam.*`
  },
  {
    id: 'eng-wordform',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Biến đổi từ loại (Word Form)',
    category: 'wordform',
    theory: `# Biến đổi từ loại (Word Form)

## 1. Nhận diện vị trí danh, động, tính, trạng
- **Danh từ (Noun):** Thường đứng sau tính từ, sau mạo từ (a/an/the), sau tính từ sở hữu, giới từ hoặc làm chủ ngữ đứng đầu câu.
  *Hậu tố phổ biến: -tion, -ness, -ment, -ty, -er/or, -ance/ence.*
- **Tính từ (Adjective):** Đứng trước danh từ để bổ nghĩa, hoặc đứng sau động từ liên kết (tobe, look, feel, become, seem).
  *Hậu tố phổ biến: -ful, -less, -ive, -ous, -able, -al, -ic.*
- **Trạng từ (Adverb):** Bổ nghĩa cho động từ thường, tính từ hoặc cả câu (thường đứng đầu câu trước dấu phẩy).
  *Cấu trúc: Tính từ + ly = Trạng từ.*

> **Quy tắc làm bài:** Đọc câu và xác định từ loại cần điền. Sau đó tìm gốc từ (trong ngoặc) và áp dụng tiền tố (un-, im-, dis- nếu mang nghĩa trái ngược) hoặc hậu tố phù hợp.`
  },
  {
    id: 'eng-rewrite',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Viết lại câu (Sentence Transformation)',
    category: 'rewrite',
    theory: `# Viết lại câu (Sentence Transformation)

## 1. Mẫu câu điều kiện (Conditionals)
- Nếu câu tình huống ở hiện tại -> Viết lại bằng Câu điều kiện loại 2 (trái thực tế hiện tại).
  *Cấu trúc: If + S + V2/ed (tobe dùng WERE), S + would/could + V-inf.*

## 2. Mẫu câu ước (Wish)
- Ước trái với hiện tại: S + wish(es) + S + V2/ed.

## 3. Mẫu câu quá khứ sang hiện tại hoàn thành
- *The last time I saw him was 2 years ago.*
  -> *I haven't seen him for 2 years.*
- *He started playing soccer in 2020.*
  -> *He has played soccer since 2020.*`
  },

  // 2. Math Lessons
  {
    id: 'math-parabol',
    subject: 'math',
    topic: 'Hàm số và phương trình bậc hai',
    title: 'Tương giao Parabol & Đường thẳng',
    category: 'parabol-line',
    theory: `# Tương giao giữa Parabol (P) và Đường thẳng (d)

Cho Parabol (P): $y = ax^2$ ($a \\neq 0$) và đường thẳng (d): $y = mx + n$.

## 1. Thiết lập phương trình hoành độ giao điểm
Hoành độ giao điểm của (P) và (d) là nghiệm của phương trình:
$$ax^2 = mx + n \\Leftrightarrow ax^2 - mx - n = 0$$
Đây là phương trình bậc hai có dạng $Ax^2 + Bx + C = 0$.

## 2. Biện luận số giao điểm dựa vào Delta ($\\Delta$)
- **$\\Delta > 0$:** Phương trình có hai nghiệm phân biệt $\\Rightarrow$ (d) cắt (P) tại hai điểm phân biệt.
- **$\\Delta = 0$:** Phương trình có nghiệm kép $\\Rightarrow$ (d) tiếp xúc với (P) (gọi là tiếp tuyến).
- **$\\Delta < 0$:** Phương trình vô nghiệm $\\Rightarrow$ (d) không cắt (P).`
  },
  {
    id: 'math-viet',
    subject: 'math',
    topic: 'Hàm số và phương trình bậc hai',
    title: 'Hệ thức Vi-ét và Ứng dụng',
    category: 'viet-relation',
    theory: `# Hệ thức Vi-ét và Ứng dụng

Nếu phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$) có hai nghiệm $x_1, x_2$, ta có:

## 1. Hệ thức Vi-ét
- **Tổng hai nghiệm:** $S = x_1 + x_2 = -\\frac{b}{a}$
- **Tích hai nghiệm:** $P = x_1 \\cdot x_2 = \\frac{c}{a}$

## 2. Các biểu thức đối xứng thường gặp
Khi làm bài tập, cần biến đổi các biểu thức chứa $x_1, x_2$ về dạng chỉ chứa S và P:
- $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = S^2 - 2P$
- $(x_1 - x_2)^2 = S^2 - 4P$
- $\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1+x_2}{x_1x_2} = \\frac{S}{P}$`
  },
  {
    id: 'math-finance',
    subject: 'math',
    topic: 'Bài toán thực tế',
    title: 'Toán thực tế tài chính',
    category: 'real-finance',
    theory: `# Toán thực tế: Tài chính & Phần trăm

Các bài toán tài chính tuyển sinh 10 thường xoay quanh vấn đề tăng giá, giảm giá, thuế và tiền lãi gửi tiết kiệm.

## 1. Bài toán Tăng/Giảm giá
- Nếu giá ban đầu là A, sau khi tăng thêm $x\\%$ thì giá mới là: $A \\cdot (1 + x\\%)$.
- Sau khi giảm giá $y\\%$ thì giá mới là: $A \\cdot (1 - y\\%)$.
- Khuyến mãi nhiều đợt (ví dụ giảm $10\\%$ đợt 1 rồi giảm tiếp $5\\%$ đợt 2): Giá cuối = $A \\cdot (1 - 10\\%) \\cdot (1 - 5\\%)$.

## 2. Công thức tính Thuế (VAT)
- Thuế VAT thường cộng thêm $8\\%$ hoặc $10\\%$ vào giá gốc:
  $$\\text{Giá sau thuế} = \\text{Giá trước thuế} \\cdot (1 + \\text{thuế VAT}\\%)$$`
  },
  {
    id: 'math-plane-geom',
    subject: 'math',
    topic: 'Hình học phẳng',
    title: 'Tứ giác nội tiếp đường tròn',
    category: 'plane-geometry',
    theory: `# Tứ giác nội tiếp đường tròn

Một tứ giác có cả 4 đỉnh cùng nằm trên một đường tròn được gọi là tứ giác nội tiếp.

## 1. Các dấu hiệu chứng minh phổ biến nhất
- **Dấu hiệu 1:** Tứ giác có tổng hai góc đối bằng $180^\\circ$. (Góc A + Góc C = $180^\\circ$ hoặc Góc B + Góc D = $180^\\circ$).
- **Dấu hiệu 2:** Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.
- **Dấu hiệu 3:** Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới hai góc bằng nhau (ví dụ: $\\widehat{DAC} = \\widehat{DBC}$).
- **Dấu hiệu 4:** Tứ giác có điểm cách đều cả 4 đỉnh (ví dụ giao điểm hai đường chéo là tâm đường tròn ngoại tiếp).`
  },
  {
    id: 'math-space-geom',
    subject: 'math',
    topic: 'Hình học không gian',
    title: 'Hình học không gian thực tế',
    category: 'real-geometry',
    theory: `# Hình học không gian thực tế

Tập trung vào các công thức diện tích, thể tích của 3 hình cốt lõi lớp 9.

## 1. Hình Trụ (Cylinder)
- **Diện tích xung quanh:** $S_{xq} = 2\\pi r h$
- **Thể tích:** $V = \\pi r^2 h$

## 2. Hình Nón (Cone)
- **Diện tích xung quanh:** $S_{xq} = \\pi r l$ ($l$ là đường sinh)
- **Thể tích:** $V = \\frac{1}{3}\\pi r^2 h$

## 3. Hình Cầu (Sphere)
- **Diện tích mặt cầu:** $S = 4\\pi r^2$
- **Thể tích cầu:** $V = \\frac{4}{3}\\pi r^3$

> **Lưu ý đơn vị:** Đề thi toán thực tế thường cho số đo các đại lượng ở các đơn vị khác nhau (m, dm, cm, lít...). Luôn đổi về cùng một đơn vị chuẩn trước khi tính toán ($1 \\text{ dm}^3 = 1 \\text{ lít}$).`
  },

  // 3. Literature Lessons
  {
    id: 'lit-poetry',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Đọc hiểu văn thơ lớp 9',
    category: 'literature-reading-poetry',
    theory: `# Đọc hiểu văn bản nghệ thuật (Thơ & Truyện)

Để đạt điểm tối đa phần đọc hiểu Ngữ văn vào 10, học sinh cần xác định chính xác các yếu tố nghệ thuật và nội dung cốt lõi của tác phẩm.

## 1. Xác định Phương thức biểu đạt (PTBD)
- **Văn bản Thơ:** PTBD chính luôn là **Biểu cảm**.
- **Văn bản Truyện/Truyện ngắn:** PTBD chính thường là **Tự sự**.

## 2. Các biện pháp tu từ tiêu biểu và tác dụng
Khi nêu tác dụng của biện pháp tu từ (So sánh, Ẩn dụ, Nhân hóa, Điệp từ), luôn trả lời theo công thức 3 ý:
- **Ý 1:** Gọi tên biện pháp tu từ và trích từ ngữ chứa biện pháp đó.
- **Ý 2:** Giúp câu thơ, câu văn trở nên sinh động, gợi hình, gợi cảm hơn.
- **Ý 3:** Làm nổi bật vẻ đẹp của hình tượng/tình cảm cảm xúc gì của tác giả (liên hệ nội dung đoạn trích).`
  },
  {
    id: 'lit-vietnamese',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Tiếng Việt và Phép liên kết',
    category: 'literature-vietnamese',
    theory: `# Tiếng Việt thực hành và Phép liên kết

Chuyên đề trọng tâm giúp giải quyết các câu hỏi cấu trúc ngữ pháp Tiếng Việt trong đề thi vào 10.

## 1. Phép liên kết câu
- **Phép lặp:** Lặp lại từ ngữ ở câu sau đã xuất hiện ở câu trước.
- **Phép thế:** Sử dụng các từ đồng nghĩa, đại từ (nó, họ, ta, điều đó) ở câu sau để thay thế cho từ ở câu trước.
- **Phép nối:** Sử dụng từ nối, quan hệ từ (nhưng, tuy nhiên, bởi vì, do đó) ở đầu câu sau để kết nối ý với câu trước.
- **Phép đồng nghĩa, trái nghĩa, liên tưởng:** Dùng các từ cùng trường từ vựng.

## 2. Các thành phần biệt lập
- **Tình thái:** Thể hiện độ tin cậy của người nói (chắc là, dường như, có lẽ).
- **Cảm thán:** Thể hiện cảm xúc (ôi, than ôi, trời ơi).
- **Gọi - đáp:** Dùng để tạo lập hoặc duy trì cuộc thoại (này, dạ, thưa).
- **Phụ chú:** Bổ sung chi tiết phụ (thường đặt trong dấu ngoặc đơn, dấu gạch ngang hoặc giữa hai dấu phẩy).`
  },
  {
    id: 'lit-writing',
    subject: 'literature',
    topic: 'Viết đoạn và bài nghị luận',
    title: 'Nghị luận xã hội 200 chữ',
    category: 'literature-writing',
    theory: `# Nghị luận xã hội (Đoạn văn 200 chữ)

Đoạn văn nghị luận xã hội đòi hỏi bố cục mạch lạc, lập luận sắc bén và dẫn chứng mang tính thuyết phục cao.

## 1. Cấu trúc đoạn văn 200 chữ chuẩn (Không xuống dòng)
- **Mở đoạn (1-2 câu):** Dẫn dắt và nêu vấn đề cần nghị luận (hiện tượng đời sống hoặc tư tưởng đạo lí).
- **Thân đoạn (10-12 câu):**
  - *Giải thích ngắn gọn* từ khóa/vấn đề.
  - *Phân tích ý nghĩa/vai trò* hoặc nguyên nhân/hậu quả của hiện tượng.
  - *Nêu dẫn chứng cụ thể* từ đời sống thực tế (người thật việc thật, tránh dẫn chứng chung chung).
  - *Phản đề:* Lên án biểu hiện lệch lạc hoặc nhìn nhận vấn đề từ góc độ trái ngược.
- **Kết đoạn (1-2 câu):** Rút ra bài học nhận thức và đề xuất hành động thực tiễn của bản thân.`
  },
  {
    id: 'lit-prose',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Đọc hiểu truyện ngắn và Cảm nhận nhân vật',
    category: 'literature-reading-prose',
    theory: `# Đọc hiểu truyện ngắn và Cảm nhận nhân vật

Chuyên đề trọng tâm giúp giải quyết các câu hỏi đọc hiểu truyện ngắn và phân tích nhân vật (như tác phẩm Chiếc lược ngà - Nguyễn Quang Sáng).

## 1. Phân tích cốt truyện và tình huống truyện
- **Tình huống truyện:** Là hoàn cảnh/sự kiện đặc biệt tạo nên xung đột và thể hiện tính cách nhân vật.
  *Ví dụ:* Trong Chiếc lược ngà, tình huống hai cha con gặp nhau sau 8 năm xa cách nhưng bé Thu cự tuyệt không nhận ba, đến khi nhận ra ba thì lại đến lúc ông Sáu phải lên đường đi chiến đấu.
- **Tác dụng:** Giúp bộc lộ sâu sắc tâm lý nhân vật và tạo sự hấp dẫn cho cốt truyện.

## 2. Phân tích diễn biến tâm lý nhân vật (như bé Thu)
- Phân tích nhân vật qua 2 giai đoạn logic:
  - **Giai đoạn cự tuyệt:** Phản ứng bướng bỉnh xuất phát từ tình yêu ba tuyệt đối (chỉ tin người ba không có vết thẹo trong ảnh chụp chung).
  - **Giai đoạn bùng nổ tình cảm:** Sự chuyển biến tâm lý đầy xúc động lúc ông Sáu chuẩn bị đi (tiếng gọi "Ba..." xé lòng, ôm chặt lấy cổ ba).`
  }
];
