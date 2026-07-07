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
  {
    id: 'math-quadratic-formula',
    subject: 'math',
    topic: 'Phương trình bậc hai',
    title: 'Công thức nghiệm và nghiệm thu gọn',
    category: 'real-equations',
    theory: `# Công thức nghiệm và nghiệm thu gọn

Phương pháp giải phương trình bậc hai một ẩn $ax^2 + bx + c = 0$ ($a \\neq 0$).

## 1. Công thức nghiệm tổng quát (Delta $\\Delta$)
- Tính biệt thức: $\\Delta = b^2 - 4ac$.
- Các trường hợp nghiệm:
  - $\\Delta > 0$: Phương trình có 2 nghiệm phân biệt:
    $$x_1 = \\frac{-b + \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b - \\sqrt{\\Delta}}{2a}$$
  - $\\Delta = 0$: Phương trình có nghiệm kép:
    $$x_1 = x_2 = -\\frac{b}{2a}$$
  - $\\Delta < 0$: Phương trình vô nghiệm.

## 2. Công thức nghiệm thu gọn (Delta phẩy $\\Delta'$)
Sử dụng khi hệ số $b$ chẵn (đặt $b = 2b'$ hay $b' = \\frac{b}{2}$):
- Tính biệt thức thu gọn: $\\Delta' = b'^2 - ac$.
- Các trường hợp nghiệm:
  - $\\Delta' > 0$: Phương trình có 2 nghiệm phân biệt:
    $$x_1 = \\frac{-b' + \\sqrt{\\Delta'}}{a}, \\quad x_2 = \\frac{-b' - \\sqrt{\\Delta'}}{a}$$
  - $\\Delta' = 0$: Phương trình có nghiệm kép:
    $$x_1 = x_2 = -\\frac{b'}{a}$$
  - $\\Delta' < 0$: Phương trình vô nghiệm.`
  },
  {
    id: 'math-quadratic-discriminant',
    subject: 'math',
    topic: 'Phương trình bậc hai',
    title: 'Biện luận số nghiệm của phương trình',
    category: 'real-equations',
    theory: `# Biện luận số nghiệm của phương trình

Sử dụng biệt thức $\\Delta$ hoặc $\\Delta'$ để biện luận sự tồn tại và tính chất nghiệm của phương trình bậc hai chứa tham số $m$.

## 1. Điều kiện số nghiệm
Cho phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$):
- **Để phương trình có nghiệm:** $\\Delta \\geq 0$.
- **Để phương trình có 2 nghiệm phân biệt:** $\\Delta > 0$.
- **Để phương trình có nghiệm kép (hoặc tiếp xúc):** $\\Delta = 0$.
- **Để phương trình vô nghiệm:** $\\Delta < 0$.

## 2. Trường hợp hệ số $a$ chứa tham số
> **Lưu ý đặc biệt:** Nếu hệ số $a$ chứa tham số (ví dụ: $(m-1)x^2 + 2x + 3 = 0$), ta phải chia làm 2 trường hợp:
- **Trường hợp 1:** $a = 0$ (phương trình trở thành bậc nhất).
- **Trường hợp 2:** $a \\neq 0$ (biện luận $\\Delta$ bình thường).`
  },
  {
    id: 'math-viet-advanced',
    subject: 'math',
    topic: 'Hệ thức Vi-ét',
    title: 'Hệ thức Vi-ét nâng cao và Xét dấu',
    category: 'viet-relation',
    theory: `# Hệ thức Vi-ét nâng cao và Xét dấu

Vận dụng hệ thức Vi-ét để xét dấu nghiệm và giải các bài toán thực tế phức tạp.

## 1. Xét dấu hai nghiệm của phương trình bậc hai
Dựa vào tổng $S = x_1 + x_2 = -\\frac{b}{a}$ và tích $P = x_1x_2 = \\frac{c}{a}$:
- **Hai nghiệm trái dấu:** $P < 0$ (không cần xét $\\Delta$ vì khi $P < 0$ thì $ac < 0 \\Rightarrow \\Delta > 0$).
- **Hai nghiệm cùng dấu:** $\\Delta \\geq 0$ và $P > 0$.
- **Hai nghiệm cùng dương:** $\\Delta \\geq 0$, $P > 0$ và $S > 0$.
- **Hai nghiệm cùng âm:** $\\Delta \\geq 0$, $P > 0$ và $S < 0$.

## 2. Tìm hai số khi biết tổng và tích
Nếu hai số có tổng là $S$ và tích là $P$ (với $S^2 \\geq 4P$) thì hai số đó là nghiệm của phương trình:
$$X^2 - SX + P = 0$$`
  },
  {
    id: 'math-trig-ratio',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Tỉ số lượng giác của góc nhọn',
    category: 'real-geometry',
    theory: `# Tỉ số lượng giác của góc nhọn

Khái niệm tỉ số lượng giác (sin, cos, tan, cot) trong tam giác vuông.

## 1. Công thức định nghĩa
Cho tam giác vuông tại $A$ có góc nhọn $\\alpha$:
- $\\sin \\alpha = \\frac{\\text{Cạnh đối}}{\\text{Cạnh huyền}}$
- $\\cos \\alpha = \\frac{\\text{Cạnh kề}}{\\text{Cạnh huyền}}$
- $\\tan \\alpha = \\frac{\\text{Cạnh đối}}{\\text{Cạnh kề}}$
- $\\cot \\alpha = \\frac{\\text{Cạnh kề}}{\\text{Cạnh đối}}$

> **Mẹo học thuộc:** *Sin đi học, Cos không hư, Tan đoàn kết, Cot kết đoàn.*

## 2. Các tỉ số đặc biệt và góc phụ nhau
- Nếu hai góc phụ nhau (tổng bằng $90^\\circ$): $\\sin \\alpha = \\cos(90^\\circ - \\alpha)$, $\\tan \\alpha = \\cot(90^\\circ - \\alpha)$.
- Bảng góc đặc biệt:
  - $\\sin 30^\\circ = \\cos 60^\\circ = \\frac{1}{2}$
  - $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}$
  - $\\sin 60^\\circ = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$`
  },
  {
    id: 'math-trig-applied-1',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Giải tam giác vuông',
    category: 'real-geometry',
    theory: `# Giải tam giác vuông

Phương pháp tìm tất cả các cạnh và các góc chưa biết của một tam giác vuông.

## 1. Công thức tính cạnh
Trong tam giác vuông, mỗi cạnh góc vuông bằng:
- Cạnh huyền nhân với $\\sin$ góc đối hoặc nhân với $\\cos$ góc kề:
  $$b = a \\cdot \\sin B = a \\cdot \\cos C$$
- Cạnh góc vuông kia nhân với $\\tan$ góc đối hoặc nhân với $\\cot$ góc kề:
  $$b = c \\cdot \\tan B = c \\cdot \\cot C$$

## 2. Các bước giải tam giác vuông
- **Trường hợp biết hai cạnh:** Sử dụng định lý Pitago tính cạnh thứ ba, dùng tỉ số lượng giác để tính góc.
- **Trường hợp biết một cạnh và một góc nhọn:** Sử dụng tổng hai góc nhọn phụ nhau để tìm góc còn lại, dùng các công thức lượng giác trên để tìm hai cạnh còn lại.`
  },
  {
    id: 'math-trig-applied-2',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Đo đạc thực tế dùng tỉ số lượng giác',
    category: 'real-geometry',
    theory: `# Đo đạc thực tế dùng tỉ số lượng giác

Ứng dụng tỉ số lượng giác để giải quyết các bài toán đo chiều cao và khoảng cách thực tế (không thể đo trực tiếp).

## 1. Bài toán đo chiều cao vật thể (như tòa nhà, cây)
- Đứng cách gốc vật một khoảng $d$. Sử dụng giác kế đo góc ngẩng $\\alpha$ nhìn lên đỉnh.
- Chiều cao vật thể $H$ được tính theo công thức:
  $$H = h + d \\cdot \\tan \\alpha$$
  (với $h$ là chiều cao từ mắt người đo đến mặt đất).

## 2. Bài toán đo khoảng cách ngang (như con sông)
- Chọn một mốc đối diện bên kia sông. Đo khoảng cách kề dọc bờ sông là $a$.
- Đo góc nhìn $\\beta$ từ đầu khoảng cách đến mốc bên kia sông.
- Chiều rộng con sông $W$ là:
  $$W = a \\cdot \\tan \\beta$$`
  },
  {
    id: 'math-circle-angle-1',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Góc ở tâm và Góc nội tiếp',
    category: 'plane-geometry',
    theory: `# Góc ở tâm và Góc nội tiếp

Khái niệm và mối liên hệ giữa các loại góc liên quan đến đường tròn.

## 1. Góc ở tâm
- Là góc có đỉnh trùng với tâm đường tròn.
- Số đo góc ở tâm bằng số đo cung bị chắn: $\\widehat{AOB} = \\text{sđ} \\overparen{AB}$.

## 2. Góc nội tiếp
- Là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung.
- Số đo góc nội tiếp bằng nửa số đo cung bị chắn: $\\widehat{ACB} = \\frac{1}{2} \\text{sđ} \\overparen{AB}$.

## 3. Các hệ quả quan trọng
- Trong một đường tròn, góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung: $\\widehat{ACB} = \\frac{1}{2}\\widehat{AOB}$.
- Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).`
  },
  {
    id: 'math-circle-angle-2',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Góc tạo bởi tia tiếp tuyến và dây cung',
    category: 'plane-geometry',
    theory: `# Góc tạo bởi tia tiếp tuyến và dây cung

Định lý và hệ quả về góc tạo bởi tiếp tuyến và dây cung.

## 1. Định lý
Góc tạo bởi tia tiếp tuyến và dây cung đi qua tiếp điểm có số đo bằng nửa số đo của cung bị chắn.
- Ví dụ: Ax là tiếp tuyến tại A, AB là dây cung.
  $$\\widehat{xAB} = \\frac{1}{2} \\text{sđ} \\overparen{AB}$$

## 2. Hệ quả quan trọng nhất (Thường dùng trong bài toán chứng minh)
Trong một đường tròn, góc tạo bởi tia tiếp tuyến và dây cung và góc nội tiếp cùng chắn một cung thì bằng nhau.
- Ví dụ: C là một điểm trên đường tròn, thì:
  $$\\widehat{xAB} = \\widehat{ACB}$$`
  },
  {
    id: 'math-circle-tangent-1',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Tiếp tuyến đường tròn và Hai tiếp tuyến cắt nhau',
    category: 'tangent-geometry',
    theory: `# Tiếp tuyến đường tròn và Hai tiếp tuyến cắt nhau

Các định lý cơ bản về tiếp tuyến đường tròn và tính chất của hai tiếp tuyến cắt nhau.

## 1. Tính chất tiếp tuyến
Nếu một đường thẳng là tiếp tuyến của đường tròn thì nó vuông góc với bán kính đi qua tiếp điểm:
$$d \\perp OB \\text{ tại tiếp điểm } B$$

## 2. Tính chất hai tiếp tuyến cắt nhau
Nếu hai tiếp tuyến của đường tròn $(O)$ cắt nhau tại $A$ (với tiếp điểm là $B$ và $C$):
- $AB = AC$ (điểm cắt cách đều hai tiếp điểm).
- $AO$ là tia phân giác của góc $\\widehat{BAC}$.
- $OA$ là tia phân giác của góc $\\widehat{BOC}$.
- Giao điểm $AO$ và $BC$ là trung điểm của $BC$ và $AO \\perp BC$.`
  },
  {
    id: 'math-circle-tangent-2',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Chứng minh tiếp tuyến đường tròn',
    category: 'tangent-geometry',
    theory: `# Chứng minh tiếp tuyến đường tròn

Phương pháp chứng minh một đường thẳng là tiếp tuyến của đường tròn.

## 1. Phương pháp chứng minh trực tiếp
Để chứng minh đường thẳng $d$ là tiếp tuyến của đường tròn $(O; R)$ tại tiếp điểm $H$:
- **Bước 1:** Chứng minh điểm $H$ thuộc đường tròn ($OH = R$).
- **Bước 2:** Chứng minh đường thẳng $d$ vuông góc với bán kính tại $H$ ($d \\perp OH$).

## 2. Các dạng toán hay gặp tuyển sinh 10
- Chứng minh tam giác chứa tiếp tuyến vuông góc (dùng hệ thức lượng hoặc định lý Pitago đảo).
- Sử dụng tính chất góc nội tiếp chắn nửa đường tròn tạo góc $90^\\circ$.
- Chứng minh hai góc bằng nhau để suy ra góc tiếp xúc bằng $90^\\circ$.`
  },
  {
    id: 'math-word-problem-1',
    subject: 'math',
    topic: 'Bài toán thực tế',
    title: 'Giải bài toán bằng cách lập hệ phương trình',
    category: 'real-equations',
    theory: `# Giải bài toán bằng cách lập hệ phương trình

Quy trình giải bài toán bằng cách lập hệ hai phương trình bậc nhất hai ẩn.

## 1. Quy trình gồm 3 bước chuẩn
- **Bước 1: Lập hệ phương trình:**
  - Chọn hai ẩn số và đặt điều kiện thích hợp (đơn vị, khoảng giá trị).
  - Biểu diễn các đại lượng chưa biết theo ẩn và đại lượng đã biết.
  - Lập hai phương trình biểu thị mối quan hệ giữa các đại lượng.
- **Bước 2: Giải hệ phương trình:** Sử dụng cộng đại số hoặc thế.
- **Bước 3: Trả lời:** Kiểm tra nghiệm với điều kiện và kết luận.

## 2. Các dạng toán chuyển động và năng suất
- **Toán chuyển động:** $S = v \\cdot t$. Chú ý dòng nước ngược/xuôi: $v_{xuôi} = v_{thực} + v_{nước}$, $v_{ngược} = v_{thực} - v_{nước}$.
- **Toán năng suất/Làm chung làm riêng:**
  - Năng suất $\\times$ Thời gian = Công việc.
  - Làm chung trong 1 ngày = $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{t_{chung}}$.`
  },
  {
    id: 'math-word-problem-2',
    subject: 'math',
    topic: 'Bài toán thực tế',
    title: 'Giải bài toán thực tế bằng cách lập phương trình',
    category: 'real-equations',
    theory: `# Giải bài toán thực tế bằng cách lập phương trình

Phương pháp lập phương trình bậc hai giải bài toán thực tế.

## 1. Quy trình thực hiện
- Tương tự như lập hệ phương trình, nhưng chỉ chọn 1 ẩn chính $x$.
- Biểu diễn các đại lượng còn lại theo $x$.
- Thiết lập phương trình bậc hai dạng $ax^2 + bx + c = 0$.
- Giải phương trình và loại nghiệm âm hoặc không thỏa mãn ý nghĩa vật lý.

## 2. Các dạng toán kinh tế và diện tích
- **Toán tăng giảm phần trăm:** Giá trị sau khi đổi = Giá trị đầu $\\cdot (1 \\pm r\\%)$.
- **Toán diện tích/hình học:** Áp dụng công thức diện tích hình chữ nhật ($S = a \\cdot b$), hình vuông để lập phương trình liên hệ chiều dài/chiều rộng.`
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
  },
  {
    id: 'lit-truyen-truyen-ky-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Phân tích cốt truyện và yếu tố kỳ ảo',
    category: 'literature-reading-prose',
    theory: `# Phân tích cốt truyện và yếu tố kỳ ảo

Hướng dẫn phân tích tác phẩm truyện truyền kỳ tiêu biểu (Truyền kỳ mạn lục - Nguyễn Dữ).

## 1. Yếu tố kỳ ảo trong truyện truyền kỳ
- **Khái niệm:** Là những chi tiết hoang đường, kỳ lạ, không có thật trong thực tế (như người chết đầu thai, tiên nữ, rồng thần, mơ thấy cõi âm...).
- **Tác dụng nghệ thuật:**
  - Làm cho cốt truyện trở nên lung linh, hấp dẫn, ly kỳ.
  - Thể hiện thế giới quan, quan niệm tâm linh của người xưa.
  - Phản ánh gián tiếp hiện thực xã hội và gửi gắm ước mơ công lý, nhân đạo.

## 2. Phân tích không gian và thời gian
- **Không gian:** Có sự đan xen giữa cõi thực (làng quê, trần gian) và cõi ảo (cung nước của Linh Phi, cõi tiên).
- **Thời gian:** Thời gian lịch sử cụ thể đan xen với thời gian ước lệ của huyền thoại.`
  },
  {
    id: 'lit-truyen-truyen-ky-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Nhân vật Vũ Nương và Giá trị nhân đạo',
    category: 'literature-reading-prose',
    theory: `# Nhân vật Vũ Nương và Giá trị nhân đạo

Phân tích hình tượng nhân vật Vũ Nương trong tác phẩm "Chuyện người con gái Nam Xương" (Nguyễn Dữ).

## 1. Vẻ đẹp của nhân vật Vũ Nương
- **Tính cách:** Thùy mị nết na, tư dung tốt đẹp, hiếu thảo với mẹ chồng, yêu thương chồng con hết mực.
- **Bi kịch:** Bị chồng nghi oan mất lòng thủy chung chỉ vì chiếc bóng trên tường và lời nói ngây thơ của bé Đản, dẫn đến việc phải trẫm mình ở sông Hoàng Giang để chứng minh sự trong sạch.

## 2. Giá trị nhân đạo và hiện thực
- **Giá trị hiện thực:** Phản ánh xã hội phong kiến bất công, trọng nam khinh nữ và chiến tranh phi nghĩa gây chia lìa.
- **Giá trị nhân đạo:** Ca ngợi vẻ đẹp phẩm hạnh của người phụ nữ; cảm thông sâu sắc với số phận bi kịch của họ.`
  },
  {
    id: 'lit-truyen-tho-nom-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Nguyễn Du và Truyện Kiều - Nghệ thuật ngôn từ',
    category: 'literature-reading-poetry',
    theory: `# Nguyễn Du và Truyện Kiều - Nghệ thuật ngôn từ

Tìm hiểu nghệ thuật sử dụng thể thơ lục bát và ngôn từ bác học kết hợp bình dân trong Truyện Kiều.

## 1. Thể thơ Lục bát trong Truyện Kiều
- Nguyễn Du đã đưa thể thơ lục bát dân tộc đạt đến đỉnh cao mẫu mực của văn học cổ điển.
- Cách gieo vần, ngắt nhịp uyển chuyển, giàu tính nhạc (nhịp 2/2/2, 4/4, hoặc 3/3).

## 2. Nghệ thuật tả cảnh ngụ tình
- Tả cảnh để ngụ ý tả tình, cảnh vật mang màu sắc tâm trạng của nhân vật.
  *Ví dụ:* "Cảnh nào cảnh chẳng đeo sầu / Người buồn cảnh có vui đâu bao giờ".
- Ngôn ngữ ước lệ tượng trưng kết hợp với ngôn ngữ hội thoại tự nhiên, khắc họa sâu sắc tính cách nhân vật.`
  },
  {
    id: 'lit-truyen-tho-nom-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Phân tích đoạn trích Truyện Kiều',
    category: 'literature-reading-poetry',
    theory: `# Phân tích đoạn trích Truyện Kiều

Cách phân tích các đoạn trích tiêu biểu trong Truyện Kiều (như Chị em Thúy Kiều, Cảnh ngày xuân, Kiều ở lầu Ngưng Bích).

## 1. Đoạn trích "Chị em Thúy Kiều"
- Sử dụng nghệ thuật đòn bẩy: tả vẻ đẹp Thúy Vân làm nền để tôn vinh vẻ đẹp tài sắc vẹn toàn của Thúy Kiều.
- Bút pháp ước lệ tượng trưng: lấy vẻ đẹp thiên nhiên để miêu tả vẻ đẹp con người.

## 2. Đoạn trích "Kiều ở lầu Ngưng Bích"
- Khắc họa tâm trạng cô đơn, buồn tủi và lo sợ cho tương lai của Kiều qua điệp khúc "Buồn trông...".
- Nghệ thuật tả cảnh ngụ tình xuất sắc qua hình ảnh cánh hoa trôi, tiếng sóng vỗ bờ.`
  },
  {
    id: 'lit-nlxh-doc-hieu-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Đọc hiểu văn bản nghị luận xã hội',
    category: 'literature-reading-argument',
    theory: `# Đọc hiểu văn bản nghị luận xã hội

Hướng dẫn xác định hệ thống lập luận của tác giả trong văn bản nghị luận xã hội.

## 1. Luận đề và Luận điểm
- **Luận đề:** Vấn đề bao trùm, cốt lõi mà văn bản hướng tới giải quyết hoặc thuyết phục.
- **Luận điểm:** Các ý kiến, quan điểm lớn nhằm làm sáng tỏ luận đề. Mỗi luận điểm thường nằm ở đầu hoặc cuối đoạn văn dưới dạng câu chủ đề.

## 2. Lý lẽ và Bằng chứng (Dẫn chứng)
- **Lý lẽ:** Cơ sở lý thuyết, đạo lý, chân lý được thừa nhận để giải thích cho luận điểm.
- **Bằng chứng:** Số liệu, sự thật khách quan, người thật việc thật trong đời sống thực tế để minh họa cho lý lẽ.`
  },
  {
    id: 'lit-nlvh-doc-hieu-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Đọc hiểu văn bản nghị luận văn học',
    category: 'literature-reading-argument',
    theory: `# Đọc hiểu văn bản nghị luận văn học

Đặc điểm và cách tiếp cận văn bản nghị luận văn học trong đề thi tuyển sinh.

## 1. Mục đích của nghị luận văn học
- Nhằm phân tích, cảm thụ, đánh giá giá trị nội dung và nghệ thuật của một tác phẩm, tác giả hoặc trào lưu văn học.

## 2. Phân tích cách sử dụng dẫn chứng
- Dẫn chứng trong nghị luận văn học luôn là các từ ngữ, hình ảnh, câu thơ, đoạn văn trích trực tiếp từ tác phẩm được bàn tới.
- Học sinh cần chỉ ra cách người viết liên kết dẫn chứng văn học với lý lẽ phân tích để làm nổi bật cái hay, cái đẹp của tác phẩm.`
  },
  {
    id: 'lit-write-nlvh-1',
    subject: 'literature',
    topic: 'Viết đoạn và bài nghị luận',
    title: 'Nghị luận văn học - Phân tích đoạn trích',
    category: 'literature-writing',
    theory: `# Nghị luận văn học - Phân tích đoạn trích

Phương pháp viết bài văn phân tích một đoạn trích truyện hoặc thơ lớp 9.

## 1. Bố cục bài viết chuẩn
- **Mở bài:** Giới thiệu ngắn gọn tác giả, tác phẩm, vị trí đoạn trích và nội dung nghệ thuật cốt lõi cần phân tích.
- **Thân bài:**
  - Khái quát hoàn cảnh sáng tác, cốt truyện trước khi đi vào đoạn trích.
  - Phân tích chi tiết theo luận điểm (chia đoạn trích thành các phần nhỏ để phân tích).
  - Đánh giá nghệ thuật (thơ: vần nhịp, hình ảnh; truyện: ngôi kể, tình huống).
- **Kết bài:** Khẳng định lại giá trị đoạn trích và đóng góp của tác giả.

## 2. Mẹo liên hệ thực tế
- Nên đưa vào bài viết các nhận định văn học uy tín để tăng tính thuyết phục.`
  },
  {
    id: 'lit-write-nlvh-2',
    subject: 'literature',
    topic: 'Viết đoạn và bài nghị luận',
    title: 'Phân tích đặc điểm nhân vật',
    category: 'literature-writing',
    theory: `# Phân tích đặc điểm nhân vật

Quy trình viết bài văn khắc họa tính cách, số phận một nhân vật văn học.

## 1. Các phương diện phân tích nhân vật
- Hoàn cảnh xuất hiện (hoàn cảnh sống, xuất thân).
- Ngoại hình, ngôn ngữ đối thoại/độc thoại.
- Hành động, cử chỉ và thế giới nội tâm (suy nghĩ, cảm xúc).
- Mối quan hệ với các nhân vật xung quanh.

## 2. Tổng kết nghệ thuật xây dựng nhân vật
- Chỉ ra bút pháp nghệ thuật của tác giả: ước lệ tượng trưng hay tả thực; nghệ thuật miêu tả nội tâm gián tiếp qua cảnh vật hay trực tiếp.`
  },
  {
    id: 'lit-write-nlxh-2',
    subject: 'literature',
    topic: 'Viết đoạn và bài nghị luận',
    title: 'Nghị luận xã hội 400-500 chữ',
    category: 'literature-writing',
    theory: `# Nghị luận xã hội 400-500 chữ

Cách làm bài văn nghị luận xã hội đầy đủ về một tư tưởng đạo lý hoặc hiện tượng đời sống.

## 1. Cấu trúc bài văn nghị luận xã hội
- **Mở bài:** Giới thiệu vấn đề nghị luận và sự cần thiết phải bàn luận.
- **Thân bài:**
  - *Giải thích* vấn đề/từ khóa.
  - *Bàn luận thực trạng và nguyên nhân* (nếu là hiện tượng) hoặc *Ý nghĩa và vai trò* (nếu là tư tưởng).
  - *Đưa ra dẫn chứng thực tế* thuyết phục.
  - *Bác bỏ/Phản đề:* phê phán các hành vi trái ngược.
- **Kết bài:** Bài học nhận thức và hành động thiết thực cho bản thân.`
  },
  {
    id: 'lit-modern-story-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Ngôi kể và Điểm nhìn nghệ thuật',
    category: 'literature-reading-prose',
    theory: `# Ngôi kể và Điểm nhìn nghệ thuật

Phân biệt các ngôi kể và điểm nhìn nghệ thuật trong văn bản truyện hiện đại.

## 1. Ngôi kể thứ nhất
- Người kể xưng "tôi", trực tiếp tham gia hoặc chứng kiến câu chuyện.
- **Tác dụng:** Tăng độ tin cậy, tính chân thực của câu chuyện; dễ dàng đi sâu miêu tả thế giới nội tâm của người kể.

## 2. Ngôi kể thứ ba
- Người kể giấu mặt, gọi tên các nhân vật bằng tên hoặc đại từ chỉ họ.
- **Tác dụng:** Điểm nhìn khách quan, tự do kể lại mọi diễn biến ở các không gian và thời gian khác nhau.`
  },
  {
    id: 'eng-tenses-past-perfect',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Quá khứ đơn vs Quá khứ hoàn thành',
    category: 'tenses',
    theory: `# Quá khứ đơn vs Quá khứ hoàn thành

Phân biệt cách dùng thì Quá khứ đơn (Past Simple) và Quá khứ hoàn thành (Past Perfect).

## 1. Công thức thì Quá khứ hoàn thành
- **Khẳng định:** S + had + V3/ed
- **Phủ định:** S + had not (hadn't) + V3/ed
- **Nghi vấn:** Had + S + V3/ed?

## 2. Cách phối hợp thì
Khi hai hành động cùng xảy ra trong quá khứ:
- Hành động xảy ra trước: Chia ở thì **Quá khứ hoàn thành**.
- Hành động xảy ra sau: Chia ở thì **Quá khứ đơn**.

## 3. Từ chỉ thời gian thường gặp (Dấu hiệu)
- **Before / By the time:** Trước QKĐ, sau QKHT.
  *Ví dụ: By the time we arrived, the train had left.*
- **After:** Trước QKĐ, sau QKHT.
  *Ví dụ: After she had finished her homework, she went to bed.*`
  },
  {
    id: 'eng-conditional-1-2',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Câu điều kiện loại 1 & 2',
    category: 'rewrite',
    theory: `# Câu điều kiện loại 1 & 2

Cấu trúc và cách chuyển đổi câu dùng câu điều kiện.

## 1. Câu điều kiện loại 1 (Có thật ở hiện tại/tương lai)
- **Cấu trúc:** If + S + V(s/es) [Hiện tại đơn], S + will/can/must + V-inf
- **Cách dùng:** Diễn tả giả thuyết có thể xảy ra ở hiện tại hoặc tương lai.

## 2. Câu điều kiện loại 2 (Trái thực tế ở hiện tại)
- **Cấu trúc:** If + S + V2/ed [Quá khứ giả định], S + would/could/might + V-inf
  *(Lưu ý: Động từ to be chia là "WERE" cho tất cả các ngôi).*
- **Cách dùng:** Diễn tả giả thuyết trái ngược với thực tế ở hiện tại.

## 3. Mẹo viết lại câu chuyển đổi điều kiện
- Nếu câu đề bài cho ở dạng nguyên nhân - kết quả ở hiện tại (bằng liên từ "so" hoặc "because"):
  - Ta phải dùng câu điều kiện loại 2.
  - Phải đổi khẳng định thành phủ định và ngược lại.`
  },
  {
    id: 'eng-reported-1',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Câu gián tiếp - Câu kể và Câu hỏi',
    category: 'rewrite',
    theory: `# Câu gián tiếp - Câu kể và Câu hỏi

Quy tắc chuyển đổi từ câu trực tiếp sang gián tiếp cho câu trần thuật và câu hỏi.

## 1. Quy tắc lùi thì bắt buộc
- Hiện tại đơn $\\rightarrow$ Quá khứ đơn
- Hiện tại tiếp diễn $\\rightarrow$ Quá khứ tiếp diễn
- Hiện tại hoàn thành $\\rightarrow$ Quá khứ hoàn thành
- Quá khứ đơn $\\rightarrow$ Quá khứ hoàn thành
- Will $\\rightarrow$ Would / Can $\\rightarrow$ Could

## 2. Thay đổi đại từ và trạng ngữ
- Đại từ: thay đổi theo ngôi của người nói/người nghe.
- Trạng từ:
  - This $\\rightarrow$ That / Here $\\rightarrow$ There
  - Today $\\rightarrow$ That day
  - Yesterday $\\rightarrow$ The day before / The previous day
  - Tomorrow $\\rightarrow$ The next day / The following day

## 3. Chuyển đổi câu hỏi
- **Yes/No question:** S + asked + (O) + **if / whether** + S + V (lùi thì, không đảo ngữ).
- **Wh-question:** S + asked + (O) + **Wh-word** + S + V (lùi thì, không đảo ngữ).`
  },
  {
    id: 'eng-reported-2',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Câu gián tiếp - Mệnh lệnh và Đề nghị',
    category: 'rewrite',
    theory: `# Câu gián tiếp - Mệnh lệnh và Đề nghị

Cách chuyển đổi câu mệnh lệnh, yêu cầu và câu đề nghị sang gián tiếp.

## 1. Câu gián tiếp dạng mệnh lệnh/yêu cầu (Commands / Requests)
Sử dụng các động từ dẫn: \`tell, ask, order, beg, remind\`.
- **Khẳng định:** S + asked/told + O + **to + V-inf**
  *Ví dụ: "Close the door," he said. $\\rightarrow$ He asked me to close the door.*
- **Phủ định:** S + asked/told + O + **not to + V-inf**
  *Ví dụ: "Don't touch it," she said. $\\rightarrow$ She told me not to touch it.*

## 2. Câu gián tiếp dạng đề nghị (Suggestions)
Sử dụng cấu trúc với \`suggest\`.
- **Cấu trúc 1:** S + suggested + **V-ing** (khi người nói tự bao gồm mình).
- **Cấu trúc 2:** S + suggested + **that + S + (should) + V-inf** (khi đề nghị cho người khác).
  *Ví dụ: "Let's go swimming," he said. $\\rightarrow$ He suggested going swimming.*`
  },
  {
    id: 'eng-relative-advanced',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Mệnh đề quan hệ nâng cao',
    category: 'relative-clauses',
    theory: `# Mệnh đề quan hệ nâng cao

Phân biệt mệnh đề xác định và không xác định; các cách rút gọn mệnh đề quan hệ.

## 1. Mệnh đề quan hệ xác định vs Không xác định
- **Mệnh đề xác định (Defining):** Cần thiết cho nghĩa của câu, không dùng dấu phẩy, dùng được \`that\`.
- **Mệnh đề không xác định (Non-defining):** Bổ sung thông tin cho danh từ đã rõ ràng (tên riêng, có \`this/that/my\`), ngăn cách bởi dấu phẩy, **không** dùng \`that\`.

## 2. Giới từ trong mệnh đề quan hệ
Giới từ có thể đảo lên trước đại từ quan hệ \`whom\` hoặc \`which\`.
- *Ví dụ: The man to whom I spoke yesterday is my teacher.*

## 3. Rút gọn mệnh đề quan hệ
- **Chủ động:** Rút gọn thành cụm V-ing.
- **Bị động:** Rút gọn thành cụm V3/ed.
- **Sau từ chỉ số thứ tự (first, second, last) hoặc so sánh nhất:** Rút gọn thành to + V-inf.`
  },
  {
    id: 'eng-conjunctions-1',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Liên từ nguyên nhân, kết quả và mục đích',
    category: 'grammar',
    theory: `# Liên từ nguyên nhân, kết quả và mục đích

Cách dùng các từ nối chỉ nguyên nhân, kết quả và mục đích trong câu phức.

## 1. Chỉ nguyên nhân (Reason)
- \`Because, Since, As\` + Mệnh đề (S + V)
- \`Because of, Due to\` + Cụm danh từ / V-ing
  *Ví dụ: We stayed home because it rained heavily. $\\rightarrow$ We stayed home because of the heavy rain.*

## 2. Chỉ kết quả (Result)
- \`so\` + mệnh đề
- \`therefore, as a result\` (thường đứng sau dấu chấm phẩy hoặc dấu chấm).

## 3. Chỉ mục đích (Purpose)
- \`so that, in order that\` + Mệnh đề (thường chứa \`can/could/will/would\`).
- \`to, in order to, so as to\` + V-inf.`
  },
  {
    id: 'eng-conjunctions-2',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Liên từ tương phản và nhượng bộ',
    category: 'grammar',
    theory: `# Liên từ tương phản và nhượng bộ

Phân biệt cách dùng các liên từ nhượng bộ (mặc dù, tuy nhiên).

## 1. Cấu trúc nhượng bộ chỉ sự tương phản
- \`Although, Even though, Though\` + Mệnh đề (S + V)
- \`In spite of, Despite\` + Cụm danh từ / V-ing
  *Ví dụ: Although she was tired, she finished her work. $\\rightarrow$ Despite being tired, she finished her work.*

## 2. Quy tắc chuyển đổi
- S + be + Adj $\\rightarrow$ despite + Danh từ tương ứng (hoặc despite + being + Adj).
  *Ví dụ: Although the weather was bad $\\rightarrow$ Despite the bad weather.*

## 3. Các từ nối tương phản khác
- \`However, Nevertheless\` + dấu phẩy: Tuy nhiên.`
  },
  {
    id: 'eng-comparison-1',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'So sánh hơn và So sánh nhất',
    category: 'grammar',
    theory: `# So sánh hơn và So sánh nhất

Quy tắc cấu trúc so sánh của tính từ và trạng từ trong tiếng Anh.

## 1. So sánh hơn (Comparatives)
- **Tính từ/Trạng từ ngắn:** S + V + Adj/Adv-er + than + O.
- **Tính từ/Trạng từ dài:** S + V + more + Adj/Adv + than + O.

## 2. So sánh nhất (Superlatives)
- **Tính từ/Trạng từ ngắn:** S + V + the + Adj/Adv-est.
- **Tính từ/Trạng từ dài:** S + V + the most + Adj/Adv.

## 3. Các trường hợp bất quy tắc hay gặp
- good/well $\\rightarrow$ better $\\rightarrow$ the best
- bad/badly $\\rightarrow$ worse $\\rightarrow$ the worst
- far $\\rightarrow$ farther/further $\\rightarrow$ the farthest/furthest
- little $\\rightarrow$ less $\\rightarrow$ the least
- many/much $\\rightarrow$ more $\\rightarrow$ the most`
  },
  {
    id: 'eng-comparison-2',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Cấu trúc so sánh kép',
    category: 'grammar',
    theory: `# Cấu trúc so sánh kép

Cấu trúc so sánh kép diễn tả mối tương quan nguyên nhân - kết quả: "Càng... thì càng...".

## 1. Cấu trúc so sánh kép chuẩn
$$\\text{The} + \\text{So sánh hơn} + S + V, \\text{ the} + \\text{So sánh hơn} + S + V$$

## 2. Các dạng so sánh hơn áp dụng
- **Tính từ ngắn:** The colder it is, the more clothes you wear.
- **Tính từ dài:** The more beautiful she is, the more confident she feels.
- **Danh từ:** The more books you read, the more knowledge you gain.
- **Động từ:** The more you practice, the faster you learn.`
  },
  {
    id: 'eng-passive-advanced',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Câu bị động nâng cao',
    category: 'passive-voice',
    theory: `# Câu bị động nâng cao

Cấu trúc câu bị động của động từ khuyết thiếu, động từ chỉ quan điểm và các cấu trúc đặc biệt.

## 1. Bị động với Động từ khuyết thiếu (Modal Verbs)
Các động từ khuyết thiếu: \`can, could, should, must, may, might, will, would\`.
- **Chủ động:** S + Modal Verb + V-inf
- **Bị động:** S + Modal Verb + **be + V3/ed**
  *Ví dụ: You must finish this task. $\\rightarrow$ This task must be finished.*

## 2. Bị động với cấu trúc nhờ vả (Causative Form)
- **Active:** S + have + O(người) + V-inf + O(vật) / S + get + O(người) + to + V-inf + O(vật).
- **Passive:** S + **have / get + O(vật) + V3/ed** (+ by + người).
  *Ví dụ: I had the mechanic repair my car. $\\rightarrow$ I had my car repaired.*`
  },
  {
    id: 'eng-phrasal-verbs-1',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Cụm động từ thông dụng (Phần 1)',
    category: 'vocabulary',
    theory: `# Cụm động từ thông dụng (Phần 1)

Tổng hợp các cụm động từ (Phrasal Verbs) thường xuất hiện trong đề thi tuyển sinh 10 HCMC.

## 1. Nhóm từ LOOK (Nhìn)
- **Look after:** Chăm sóc.
- **Look for:** Tìm kiếm.
- **Look up:** Tra cứu (từ điển, thông tin).
- **Look forward to + V-ing:** Mong đợi, trông mong.

## 2. Nhóm từ GO (Đi)
- **Go on:** Tiếp tục (= continue).
- **Go off:** (Chuông) reo, (bom) nổ, (sữa) hỏng, (đèn) tắt.
- **Go over:** Ôn lại, kiểm tra kỹ.

## 3. Nhóm từ GIVE & CARRY
- **Give up:** Từ bỏ.
- **Carry out:** Tiến hành, thực hiện (nghiên cứu, dự án).`
  },
  {
    id: 'eng-phrasal-verbs-2',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Cụm động từ thông dụng (Phần 2)',
    category: 'vocabulary',
    theory: `# Cụm động từ thông dụng (Phần 2)

Tiếp tục các cụm động từ thông dụng nhất hỗ trợ viết lại câu và trắc nghiệm.

## 1. Nhóm từ TAKE & SET
- **Take off:** (Máy bay) cất cánh, cởi quần áo/giày, thành công nhanh.
- **Take part in:** Tham gia (= participate in).
- **Take care of:** Chăm sóc (= look after).
- **Set up:** Thành lập, dựng lên (= establish).
- **Set off:** Khởi hành, lên đường.

## 2. Nhóm từ TURN & PUT
- **Turn up:** Xuất hiện, đến (= arrive); vặn to âm lượng.
- **Turn down:** Từ chối (= refuse); vặn nhỏ âm lượng.
- **Put off:** Trì hoãn (= postpone).
- **Put on:** Mặc (quần áo), đi (giày).
- **Put up with:** Chịu đựng.`
  }
];
