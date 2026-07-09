import type { SubjectId } from '../types/game';

export interface Lesson {
  id: string;
  subject: SubjectId;
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
  },
  {
    id: 'math-eq-product',
    subject: 'math',
    topic: 'Phương trình và Hệ phương trình',
    title: 'Phương trình tích',
    category: 'real-equations',
    theory: `# Phương trình tích

Phương pháp giải phương trình dạng tích $A(x) \\cdot B(x) = 0$.

## 1. Công thức giải cơ bản
Phương trình $A(x) \\cdot B(x) = 0$ tương đương với:
$$A(x) = 0 \\quad \\text{hoặc} \\quad B(x) = 0$$

## 2. Các bước giải phương trình tích phức tạp
- **Bước 1:** Chuyển tất cả các hạng tử sang vế trái để vế phải bằng 0.
- **Bước 2:** Phân tích đa thức ở vế trái thành nhân tử (dùng hằng đẳng thức, đặt nhân tử chung, hoặc nhóm hạng tử).
- **Bước 3:** Cho từng nhân tử bằng 0 và giải tìm nghiệm.
- **Bước 4:** Kết luận tập nghiệm $S$.`
  },
  {
    id: 'math-eq-rational',
    subject: 'math',
    topic: 'Phương trình và Hệ phương trình',
    title: 'Phương trình chứa ẩn ở mẫu',
    category: 'real-equations',
    theory: `# Phương trình chứa ẩn ở mẫu

Quy trình giải phương trình chứa ẩn ở mẫu thức để tránh nghiệm ngoại lai.

## 1. Quy trình gồm 4 bước chuẩn
- **Bước 1: Tìm điều kiện xác định (ĐKXĐ):** Tìm các giá trị của ẩn làm cho các mẫu thức khác 0.
- **Bước 2: Quy đồng mẫu hai vế:** Tìm mẫu thức chung (MTC), quy đồng và khử mẫu hai vế.
- **Bước 3: Giải phương trình vừa nhận được.**
- **Bước 4: Đối chiếu điều kiện và kết luận:** Loại bỏ các giá trị không thỏa mãn ĐKXĐ.

## 2. Ví dụ thực hành
Giải phương trình: $\\frac{x+2}{x-2} - \\frac{1}{x} = 2$.
- ĐKXĐ: $x \\neq 0$ và $x \\neq 2$.
- MTC: $x(x-2)$.`
  },
  {
    id: 'math-system-eq-1',
    subject: 'math',
    topic: 'Phương trình và Hệ phương trình',
    title: 'Hệ phương trình - Cộng đại số và Thế',
    category: 'real-equations',
    theory: `# Hệ phương trình - Phương pháp thế và cộng đại số

Khái niệm và cách giải hệ hai phương trình bậc nhất hai ẩn.

## 1. Phương pháp thế
- Từ một phương trình, biểu diễn một ẩn (ví dụ $x$) theo ẩn kia (ví dụ $y$).
- Thế biểu thức này vào phương trình còn lại để được phương trình một ẩn.
- Giải phương trình một ẩn tìm nghiệm, rồi thế ngược lại tìm ẩn còn lại.

## 2. Phương pháp cộng đại số
- Nhân hai vế của mỗi phương trình với số thích hợp sao cho hệ số của một ẩn nào đó bằng nhau hoặc đối nhau.
- Cộng hoặc trừ từng vế hai phương trình để triệt tiêu một ẩn.
- Giải phương trình một ẩn vừa thu được, rồi tìm ẩn còn lại.`
  },
  {
    id: 'math-system-eq-2',
    subject: 'math',
    topic: 'Phương trình và Hệ phương trình',
    title: 'Hệ phương trình chứa tham số m',
    category: 'real-equations',
    theory: `# Hệ phương trình chứa tham số m

Biện luận số nghiệm của hệ hai phương trình bậc nhất hai ẩn chứa tham số $m$.

## 1. Điều kiện tồn tại nghiệm
Cho hệ phương trình:
$$\\begin{cases} ax + by = c \\\\ a'x + b'y = c' \\end{cases}$$
- **Hệ có nghiệm duy nhất:** $\\frac{a}{a'} \\neq \\frac{b}{b'}$.
- **Hệ vô nghiệm:** $\\frac{a}{a'} = \\frac{b}{b'} \\neq \frac{c}{c'}$.
- **Hệ vô số nghiệm:** $\\frac{a}{a'} = \\frac{b}{b'} = \\frac{c}{c'}$.
*(Lưu ý: Chỉ lập tỉ số khi các hệ số dưới mẫu khác 0. Nếu chứa tham số $m$ ở mẫu, cần xét các trường hợp $m$ làm mẫu bằng 0 riêng).*`
  },
  {
    id: 'math-right-triangle-ratio',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Hệ thức về cạnh và đường cao',
    category: 'real-geometry',
    theory: `# Hệ thức lượng về cạnh và đường cao

Các hệ thức cơ bản giữa cạnh và đường cao trong tam giác vuông.

## 1. Các hệ thức trong tam giác vuông
Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$ chia cạnh huyền $BC$ thành hai hình chiếu $HB$ và $HC$:
- Định lý Pitago: $a^2 = b^2 + c^2$
- Hệ thức 1 (Cạnh góc vuông và hình chiếu): $b^2 = a \\cdot b'$ và $c^2 = a \\cdot c'$
- Hệ thức 2 (Đường cao và hình chiếu): $h^2 = b' \\cdot c'$
- Hệ thức 3 (Đường cao và hai cạnh góc vuông): $a \\cdot h = b \\cdot c$
- Hệ thức 4 (Đường cao nghịch đảo): $\\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}$`
  },
  {
    id: 'lit-modern-conflict-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Xung đột truyện và tình huống kịch tính',
    category: 'literature-reading-prose',
    theory: `# Xung đột truyện và tình huống kịch tính

Phân tích xung đột nghệ thuật và vai trò của tình huống kịch tính trong tác phẩm văn xuôi hiện đại.

## 1. Xung đột truyện
- **Khái niệm:** Là sự mâu thuẫn, đối lập giữa các lực lượng xã hội, các tính cách nhân vật hoặc mâu thuẫn ngay trong nội tâm của một nhân vật.
- **Tác dụng:** Thúc đẩy cốt truyện phát triển và bộc lộ chủ đề tư tưởng của tác phẩm.

## 2. Tình huống kịch tính
- Là sự kiện đặc biệt, bước ngoặt làm thay đổi mối quan hệ giữa các nhân vật và đẩy xung đột lên đỉnh điểm (ví dụ: khoảnh khắc bé Thu nhận ra cha trước lúc ông Sáu lên đường).`
  },
  {
    id: 'lit-modern-conflict-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Diễn biến tâm lý nhân vật',
    category: 'literature-reading-prose',
    theory: `# Diễn biến tâm lý nhân vật

Phương pháp phân tích sự thay đổi cảm xúc và suy nghĩ nội tâm của nhân vật.

## 1. Các bước phân tích diễn biến tâm lý
- **Bước 1:** Xác định hoàn cảnh tác động trực tiếp đến nhân vật.
- **Bước 2:** Chỉ ra những biểu hiện cụ thể (nét mặt, cử chỉ, hành động, độc thoại nội tâm).
- **Bước 3:** Đánh giá ý nghĩa sự chuyển đổi tâm lý đối với việc khắc họa tính cách nhân vật.

## 2. Nghệ thuật miêu tả nội tâm
- Miêu tả trực tiếp qua dòng suy nghĩ (độc thoại nội tâm) hoặc gián tiếp qua cử chỉ hành động và cảnh vật xung quanh (tả cảnh ngụ tình).`
  },
  {
    id: 'lit-poem-rhythm-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Vần, nhịp và bố cục bài thơ',
    category: 'literature-reading-poetry',
    theory: `# Vần, nhịp và bố cục bài thơ

Cách nhận diện và phân tích cấu trúc hình thức của một văn bản thơ lớp 9.

## 1. Vần và Nhịp thơ
- **Vần:** Vần chân (gieo ở cuối câu) và vần lưng (gieo ở giữa câu); tác dụng tạo sự kết nối hài hòa giữa các dòng thơ.
- **Nhịp:** Cách ngắt quãng khi đọc câu thơ (ví dụ: nhịp 4/3 trong thơ bảy chữ, nhịp tự do). Tạo nhạc điệu và nhịp điệu cảm xúc.

## 2. Bố cục bài thơ
- Cách chia đoạn thơ theo mạch lô-gích nội dung hoặc mạch cảm xúc của nhân vật trữ tình.`
  },
  {
    id: 'lit-poem-rhythm-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Mạch cảm xúc và hình ảnh biểu tượng',
    category: 'literature-reading-poetry',
    theory: `# Mạch cảm xúc và hình ảnh biểu tượng trong thơ

Phân tích mạch vận động cảm xúc và ý nghĩa của các hình ảnh thơ mang tính biểu tượng.

## 1. Mạch cảm xúc
- Là dòng chảy cảm xúc xuyên suốt tác phẩm (ví dụ: từ hoài niệm quá khứ $\\rightarrow$ suy ngẫm hiện tại $\\rightarrow$ ước nguyện tương lai trong Viếng lăng Bác).

## 2. Hình ảnh biểu tượng
- Là hình ảnh cụ thể gợi liên tưởng đến những khái niệm trừu tượng, khái quát (ví dụ: "mặt trời trong lăng", "tràng hoa dâng bảy mươi chín mùa xuân").`
  },
  {
    id: 'lit-grammar-isolated-2',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Thành phần biệt lập nâng cao',
    category: 'literature-vietnamese',
    theory: `# Thành phần biệt lập nâng cao

Phân biệt chi tiết bốn thành phần biệt lập và cách ứng dụng trong bài viết văn.

## 1. Bốn thành phần biệt lập cốt lõi
- **Tình thái:** Thể hiện độ tin cậy (*chắc chắn, có lẽ, hình như*).
- **Cảm thán:** Thể hiện cảm xúc (*ôi, trời ơi, thay*).
- **Gọi - đáp:** Tạo lập, duy trì cuộc thoại (*này, dạ, thưa*).
- **Phụ chú:** Giải thích thêm chi tiết phụ (nằm giữa hai dấu phẩy/gạch ngang/ngoặc đơn).

## 2. Ứng dụng trong làm văn
- Giúp câu văn giàu sắc thái biểu cảm, lập luận chặt chẽ và truyền tải thông tin phụ một cách khéo léo.`
  },
  {
    id: 'eng-wordform-advanced',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Biến đổi từ loại nâng cao',
    category: 'wordform',
    theory: `# Biến đổi từ loại nâng cao

Cách nhận diện và sử dụng tiền tố phủ định và hậu tố đặc biệt để biến đổi từ loại.

## 1. Tiền tố tạo nghĩa trái ngược (Negative Prefixes)
Thêm tiền tố trước gốc từ:
- \`un-\` (happy $\\rightarrow$ unhappy, comfortable $\\rightarrow$ uncomfortable)
- \`im-\` (polite $\\rightarrow$ impolite, patient $\\rightarrow$ impatient)
- \`in-\` (correct $\\rightarrow$ incorrect, active $\\rightarrow$ inactive)
- \`dis-\` (agree $\\rightarrow$ disagree, honest $\\rightarrow$ dishonest)

## 2. Hậu tố tạo Danh từ trừu tượng
- \`-ness\` (sad $\\rightarrow$ sadness), \`-ity\` (able $\\rightarrow$ ability), \`-ment\` (develop $\\rightarrow$ development), \`-ance/-ence\` (import $\rightarrow$ importance, differ $\rightarrow$ difference).`
  },
  {
    id: 'eng-reading-skills-1',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Kỹ thuật Skimming & Scanning',
    category: 'grammar',
    theory: `# Kỹ thuật Skimming & Scanning

Hai kỹ năng đọc hiểu cốt lõi giúp tối ưu hóa thời gian làm bài thi đọc hiểu tiếng Anh.

## 1. Skimming (Đọc lướt lấy ý chính)
- **Mục đích:** Tìm chủ đề bao quát hoặc ý chính của cả bài đọc.
- **Cách thực hiện:** Đọc tiêu đề, đoạn mở đầu, câu đầu tiên và câu cuối cùng của mỗi đoạn văn; bỏ qua chi tiết nhỏ.

## 2. Scanning (Đọc dò tìm thông tin chi tiết)
- **Mục đích:** Tìm thông tin cụ thể (ngày tháng, tên riêng, con số).
- **Cách thực hiện:** Xác định từ khóa trong câu hỏi, đưa mắt quét nhanh qua bài đọc để định vị chính xác từ khóa đó.`
  },
  {
    id: 'eng-reading-skills-2',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Đoán nghĩa từ mới theo ngữ cảnh',
    category: 'grammar',
    theory: `# Đoán nghĩa từ mới theo ngữ cảnh

Phương pháp suy đoán nghĩa của từ chưa biết trong bài thi mà không cần dùng từ điển.

## 1. Dựa vào từ đồng nghĩa/trái nghĩa xung quanh
- Tìm các từ liên kết như \`and, or, like, such as\` để tìm từ đồng nghĩa.
- Tìm từ chỉ tương phản \`but, however, although, despite\` để tìm từ trái nghĩa.

## 2. Dựa vào ví dụ minh họa và định nghĩa
- Xem câu sau có giải thích hoặc đưa ra ví dụ để làm rõ nghĩa của từ đó không.
- Phân tích cấu trúc từ (tiền tố, hậu tố) để phán đoán sắc thái nghĩa tích cực hay tiêu cực.`
  },
  {
    id: 'eng-writing-paragraph-1',
    subject: 'english',
    topic: 'Kỹ năng Viết',
    title: 'Viết đoạn văn mô tả địa điểm/lối sống',
    category: 'rewrite',
    theory: `# Viết đoạn văn mô tả địa điểm hoặc lối sống

Phương pháp tổ chức ý và các cấu trúc diễn đạt khi viết đoạn văn 80-100 từ.

## 1. Cấu trúc 3 phần chuẩn
- **Topic sentence (Câu chủ đề):** Giới thiệu địa điểm/lối sống cần mô tả.
- **Supporting sentences (Các câu bổ trợ):** Nêu chi tiết đặc điểm nổi bật, hoạt động, cảm nhận.
- **Concluding sentence (Câu kết luận):** Khẳng định lại ấn tượng hoặc mong ước của bản thân.

## 2. Mẫu câu hữu ích
- *One of the most interesting features of... is...*
- *People here are friendly and they lead a simple life.*`
  },
  {
    id: 'eng-writing-paragraph-2',
    subject: 'english',
    topic: 'Kỹ năng Viết',
    title: 'Viết đoạn văn trình bày quan điểm cá nhân',
    category: 'rewrite',
    theory: `# Viết đoạn văn trình bày quan điểm cá nhân

Hướng dẫn cấu trúc lập luận bày tỏ sự đồng ý hoặc không đồng ý với một vấn đề.

## 1. Bố cục đoạn văn lập luận
- **Mở đoạn:** Nêu rõ quan điểm đồng ý hoặc không đồng ý với luận điểm đề bài đưa ra.
- **Thân đoạn:** Đưa ra 2-3 lý do kèm ví dụ thực tế. Sử dụng liên từ liên kết (*Firstly, Secondly, In addition, For example*).
- **Kết đoạn:** Khẳng định lại quan điểm một lần nữa.

## 2. Các cụm từ bày tỏ ý kiến
- *From my perspective, I strongly agree/disagree that...*
- *There are several reasons why I support this idea.*`
  },
  {
    id: 'math-trig-relations',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Các hệ thức lượng giác cơ bản',
    category: 'real-geometry',
    theory: `# Các hệ thức lượng giác cơ bản

Các công thức liên hệ giữa các tỉ số lượng giác của một góc nhọn $\\alpha$.

## 1. Hệ thức lượng giác cốt lõi
Với mọi góc nhọn $\\alpha$, ta luôn có:
- $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$
- $\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$
- $\\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$
- $\\tan \\alpha \\cdot \\cot \\alpha = 1$
- $1 + \\tan^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}$
- $1 + \\cot^2 \\alpha = \\frac{1}{\\sin^2 \\alpha}$

## 2. Ứng dụng giải toán
- Tính các tỉ số lượng giác còn lại của góc $\\alpha$ khi biết một tỉ số lượng giác.
- Chứng minh đẳng thức lượng giác, rút gọn biểu thức lượng giác đơn giản.`
  },
  {
    id: 'math-circle-concept',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Khái niệm và sự xác định đường tròn',
    category: 'plane-geometry',
    theory: `# Khái niệm đường tròn và sự xác định

Định nghĩa đường tròn, các yếu tố liên quan và cách xác định một đường tròn.

## 1. Định nghĩa đường tròn
Đường tròn tâm $O$ bán kính $R$ (kí hiệu $(O; R)$) là hình gồm các điểm cách điểm $O$ một khoảng bằng $R$.
- Điểm $M$ nằm trong đường tròn $(O; R)$ khi $OM < R$.
- Điểm $M$ nằm trên đường tròn $(O; R)$ khi $OM = R$.
- Điểm $M$ nằm ngoài đường tròn $(O; R)$ khi $OM > R$.

## 2. Cách xác định đường tròn
- Một đường tròn được xác định khi biết tâm và bán kính, hoặc biết một đoạn thẳng là đường kính.
- Qua ba điểm không thẳng hàng, ta vẽ được một và chỉ một đường tròn (tâm là giao điểm ba đường trung trực tam giác).`
  },
  {
    id: 'math-circle-position',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Vị trí tương đối trong đường tròn',
    category: 'plane-geometry',
    theory: `# Vị trí tương đối trong hình học đường tròn

Xác định mối quan hệ giữa đường thẳng và đường tròn, và giữa hai đường tròn.

## 1. Vị trí tương đối giữa đường thẳng và đường tròn
Gọi $d$ là khoảng cách từ tâm $O$ đến đường thẳng, $R$ là bán kính:
- **Cắt nhau:** $d < R$ (có 2 điểm chung).
- **Tiếp xúc nhau:** $d = R$ (có 1 điểm chung). Đường thẳng được gọi là tiếp tuyến.
- **Không giao nhau:** $d > R$ (không có điểm chung).

## 2. Vị trí tương đối giữa hai đường tròn $(O; R)$ và $(O'; r)$ (với $R \\geq r$)
Gọi $d = OO'$ là khoảng cách giữa hai tâm:
- **Cắt nhau:** $R - r < d < R + r$ (có 2 điểm chung).
- **Tiếp xúc ngoài:** $d = R + r$ (có 1 điểm chung).
- **Tiếp xúc trong:** $d = R - r$ (có 1 điểm chung).
- **Ngoài nhau:** $d > R + r$ (không có điểm chung).
- **Đựng nhau:** $d < R - r$ (không có điểm chung).`
  },
  {
    id: 'math-circle-length-area',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Chu vi, diện tích hình tròn và hình quạt',
    category: 'plane-geometry',
    theory: `# Độ dài và Diện tích hình tròn, hình quạt

Các công thức tính chu vi, diện tích đường tròn và hình quạt tròn.

## 1. Độ dài đường tròn và cung tròn
- **Chu vi đường tròn:** $C = 2\\pi R = \\pi d$ (với $d$ là đường kính).
- **Độ dài cung tròn $n^\\circ$:**
  $$l = \\frac{\\pi R n}{180}$$

## 2. Diện tích hình tròn và hình quạt tròn
- **Diện tích hình tròn:** $S = \\pi R^2$.
- **Diện tích hình quạt tròn bán kính $R$, cung $n^\\circ$:**
  $$S_{q} = \\frac{\\pi R^2 n}{360} = \\frac{l \\cdot R}{2}$$
*(Lưu ý: Trong các bài thi tuyển sinh thực tế, ta thường dùng giá trị xấp xỉ $\\pi \\approx 3,14$).*`
  },
  {
    id: 'math-circle-polygon',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Tứ giác nội tiếp đường tròn',
    category: 'plane-geometry',
    theory: `# Tứ giác nội tiếp đường tròn

Dấu hiệu nhận biết và ứng dụng của tứ giác nội tiếp trong các bài thi hình học tuyển sinh 10.

## 1. Định nghĩa
Tứ giác có bốn đỉnh nằm trên một đường tròn được gọi là tứ giác nội tiếp đường tròn.

## 2. Dấu hiệu nhận biết cốt lõi (Thường dùng để chứng minh)
- **Dấu hiệu 1:** Tứ giác có tổng hai góc đối diện bằng $180^\\circ$.
- **Dấu hiệu 2:** Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.
- **Dấu hiệu 3:** Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau (ví dụ: $\\widehat{ADB} = \\widehat{ACB}$).
- **Dấu hiệu 4:** Tứ giác có bốn đỉnh cách đều một điểm xác định.`
  },
  {
    id: 'lit-drama-conflict-1',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Xung đột kịch - Bi kịch và Hài kịch',
    category: 'literature-reading-prose',
    theory: `# Xung đột kịch - Bi kịch và Hài kịch

Đặc điểm thể loại kịch, cách nhận diện xung đột kịch và sự khác biệt giữa bi kịch và hài kịch.

## 1. Xung đột kịch
- Xung đột kịch là động lực phát triển của tác phẩm kịch, nảy sinh từ sự va chạm giữa các quan niệm sống, lợi ích hoặc tính cách đối lập.
- Xung đột có thể diễn ra giữa các cá nhân (xung đột bên ngoài) hoặc trong chính nội tâm nhân vật (xung đột nội tâm).

## 2. Bi kịch và Hài kịch
- **Bi kịch:** Phản ánh những mâu thuẫn gay gắt giữa cái đẹp, cái cao thượng với thế lực hắc ám, kết thúc bằng tổn thất nặng nề hoặc cái chết đau thương.
- **Hài kịch:** Khai thác các khía cạnh nực cười, kệch cỡm của đời sống để phê phán cái xấu, cái lạc hậu, hướng tới sự phê phán nhẹ nhàng hoặc tiếng cười trào phúng.`
  },
  {
    id: 'lit-drama-conflict-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Hành động kịch và Ngôn ngữ kịch',
    category: 'literature-reading-prose',
    theory: `# Hành động kịch và Ngôn ngữ kịch

Phương pháp phân tích hành động và các hình thức ngôn ngữ đặc thù trong văn bản kịch.

## 1. Hành động kịch
- Là những sự kiện, hành vi cụ thể của nhân vật trực tiếp thúc đẩy xung đột kịch phát triển từ thắt nút, phát triển, cao trào đến mở nút.

## 2. Ngôn ngữ kịch
Được thể hiện qua ba hình thức giao tiếp chính:
- **Đối thoại:** Cuộc trò chuyện qua lại giữa hai hoặc nhiều nhân vật.
- **Độc thoại:** Nhân vật nói chuyện một mình để bộc lộ suy nghĩ thầm kín.
- **Bàng thoại:** Nhân vật nói nhỏ trực tiếp với khán giả (các nhân vật khác trên sân khấu không nghe thấy).`
  },
  {
    id: 'lit-vocab-context-1',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Giải nghĩa từ theo ngữ cảnh và Từ mượn',
    category: 'literature-vietnamese',
    theory: `# Giải nghĩa từ theo ngữ cảnh và Từ mượn

Phương pháp tìm nghĩa của từ dựa vào văn cảnh trực tiếp và phân loại các từ mượn trong tiếng Việt.

## 1. Giải nghĩa từ theo ngữ cảnh
- **Cách thực hiện:** Đọc kỹ câu văn chứa từ và các câu xung quanh; xác định quan hệ ngữ pháp và trường từ vựng để suy đoán nghĩa gốc hoặc nghĩa chuyển của từ.

## 2. Phân loại từ mượn
- **Từ mượn tiếng Hán (từ Hán Việt):** Chiếm bộ phận lớn nhất, mang sắc thái trang trọng, trừu tượng (*sơn hà, phụ mẫu, quốc gia*).
- **Từ mượn tiếng Pháp, tiếng Anh:** Dùng trong công nghệ, khoa học, đời sống thường nhật (*ti vi, ra-đi-o, xà phòng*).`
  },
  {
    id: 'lit-vocab-context-2',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Điển tích và điển cố trong văn học',
    category: 'literature-vietnamese',
    theory: `# Điển tích, điển cố trong văn học

Cách nhận diện và phân tích ý nghĩa biểu đạt của các điển tích, điển cố trong văn học trung đại.

## 1. Khái niệm Điển tích, Điển cố
- **Điển tích:** Những câu chuyện lịch sử, sự kiện cổ xưa được thu gọn trong một vài từ để biểu đạt ý nghĩa sâu sắc.
- **Điển cố:** Những câu thơ, lời văn cổ mẫu mực được dùng lại để tăng tính cô đọng, hàm súc.

## 2. Cách phân tích điển tích trong thơ văn lớp 9
- Tra cứu nguồn gốc xuất hiện của điển tích.
- Giải thích hàm ý mà tác giả muốn truyền tải thông qua hình ảnh đó.
  *Ví dụ:* Hình ảnh "vọng phu" gợi nỗi cô đơn chờ chồng, "liễu chương đài" gợi cảnh ly tán hao gầy.`
  },
  {
    id: 'lit-grammar-expand-1',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Mở rộng câu bằng cụm từ',
    category: 'literature-vietnamese',
    theory: `# Mở rộng câu bằng cụm từ

Phương pháp mở rộng các thành phần câu bằng các cụm danh từ, cụm động từ hoặc cụm chủ - vị.

## 1. Mở rộng bằng cụm từ chính phụ
- Biến đổi một danh từ/động từ/tính từ đơn lẻ thành cụm từ tương ứng để bổ sung chi tiết về không gian, thời gian, đặc điểm.
  *Ví dụ:* "Hoa nở" $\\rightarrow$ "Những bông hoa hồng nhung đỏ thắm đang nở rộ dưới ánh nắng ban mai".

## 2. Mở rộng bằng cụm chủ - vị (C-V)
- Dùng cụm C-V làm thành phần phụ ngữ trong cụm từ hoặc trực tiếp làm chủ ngữ/vị ngữ trong câu phức.
  *Ví dụ:* "Quyển sách tôi mua hôm qua rất hay" (cụm C-V "tôi mua hôm qua" bổ nghĩa cho danh từ "quyển sách").`
  },
  {
    id: 'eng-pronunciation-stress',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Trọng âm từ - Quy tắc và Ngoại lệ',
    category: 'wordform',
    theory: `# Trọng âm từ - Quy tắc và Ngoại lệ

Phương pháp xác định trọng âm của từ có 2 và 3 âm tiết trở lên phục vụ làm bài thi trắc nghiệm.

## 1. Quy tắc trọng âm cơ bản
- **Từ có 2 âm tiết:**
  - Danh từ và Tính từ: Trọng âm thường rơi vào âm tiết **thứ nhất** (*table, happy*).
  - Động từ: Trọng âm thường rơi vào âm tiết **thứ hai** (*begin, enjoy*).

## 2. Quy tắc theo hậu tố (Suffixes)
- Các hậu tố không làm thay đổi trọng âm: \`-ful, -less, -ly, -ment, -ness\`.
- Trọng âm rơi vào chính nó: \`-ee, -eer, -ese, -ique\` (*employee, Chinese*).
- Trọng âm rơi vào âm tiết trước nó: \`-tion, -sion, -ic, -ity, -ical\` (*information, decision, magic*).`
  },
  {
    id: 'eng-pronunciation-sounds',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Phát âm đuôi -ed và -s/-es',
    category: 'wordform',
    theory: `# Phát âm đuôi -ed và -s/-es

Hai quy tắc phát âm đuôi bắt buộc phải nhớ cho phần trắc nghiệm phát âm đề thi vào 10 HCMC.

## 1. Cách phát âm đuôi -ed
Có 3 cách phát âm chính:
- **/ɪd/**: Khi động từ kết thúc bằng âm /t/ hoặc /d/ (*wanted, decided*).
- **/t/**: Khi kết thúc bằng âm vô thanh /p, k, f, s, ʃ, tʃ/ (*stopped, cooked, washed*).
- **/d/**: Các trường hợp còn lại (*played, lived*).

## 2. Cách phát âm đuôi -s/-es
Có 3 cách phát âm chính:
- **/ɪz/**: Khi kết thúc bằng âm xuýt /s, z, ʃ, ʒ, tʃ, dʒ/ (*boxes, washes, changes*).
- **/s/**: Khi kết thúc bằng âm vô thanh /p, t, k, f, θ/ (*books, cats, laughs*).
- **/z/**: Các trường hợp còn lại (*dogs, pens, played*).`
  },
  {
    id: 'eng-cloze-1',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Cloze Test - Điền từ theo loại từ',
    category: 'grammar',
    theory: `# Cloze Test - Điền từ theo loại từ và ngữ pháp

Chiến lược phân tích ngữ pháp để chọn đáp án chính xác trong bài đọc điền từ vào ô trống.

## 1. Xác định loại từ cần điền
Trước khi xem đáp án, hãy nhìn vị trí ô trống để xác định loại từ:
- Đứng trước danh từ $\\rightarrow$ chọn **Tính từ** (Adj).
- Đứng sau động từ thường $\\rightarrow$ chọn **Trạng từ** (Adv).
- Làm chủ ngữ hoặc sau giới từ $\\rightarrow$ chọn **Danh từ** (Noun).

## 2. Kiểm tra ngữ pháp và cấu trúc câu
- Xem động từ chia ở thì nào, chủ ngữ số ít hay số nhiều.
- Nhận biết các cấu trúc đi kèm giới từ đặc trưng (*interested in, fond of, focus on*).`
  },
  {
    id: 'eng-cloze-2',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Cloze Test - Điền từ theo ngữ nghĩa',
    category: 'grammar',
    theory: `# Cloze Test - Điền từ theo ngữ nghĩa và Collocation

Chiến lược kết hợp ngữ cảnh nghĩa và các cụm từ cố định để giải quyết bài đọc điền từ.

## 1. Nhận diện Collocation (Cụm từ cố định)
Các từ thường đi liền với nhau theo thói quen bản xứ:
- \`make\` $\\rightarrow$ *make a decision, make a mistake, make progress*.
- \`do\` $\\rightarrow$ *do homework, do research, do business*.
- \`take\` $\\rightarrow$ *take a photo, take part in, take responsibility*.

## 2. Điền từ nối Logic (Cohesive Devices)
Hiểu quan hệ giữa các câu để điền liên từ thích hợp:
- Tương phản: \`however, but, although\`.
- Nguyên nhân - kết quả: \`because, therefore, so\`.
- Bổ sung: \`in addition, moreover\`.`
  },
  {
    id: 'eng-rewrite-advanced',
    subject: 'english',
    topic: 'Kỹ năng Viết',
    title: 'Viết lại câu nâng cao tổng hợp',
    category: 'rewrite',
    theory: `# Viết lại câu nâng cao tổng hợp

Tổng hợp các cấu trúc biến đổi câu phức tạp thường gặp nhất trong đề thi tuyển sinh 10.

## 1. Cấu trúc biến đổi thì và trạng thái
- Hiện tại hoàn thành $\\leftrightarrow$ Quá khứ đơn:
  *Ví dụ: I haven't seen him for 2 years. $\\leftrightarrow$ The last time I saw him was 2 years ago.*

## 2. Cấu trúc Too / Enough / So / Such
- S + be + too + Adj + (for O) + to + V-inf.
- S + be + Adj + enough + (for O) + to + V-inf.
- S + be + so + Adj + that + mệnh đề.
- S + be + such + (a/an) + Adj + N + that + mệnh đề.

## 3. Cấu trúc chỉ ước muốn (Wish)
- Ước ở hiện tại: S + wish + S + V2/ed (were).*`
  },
  {
    id: 'math-cylinder-detail',
    subject: 'math',
    topic: 'Hình học không gian',
    title: 'Hình trụ - Bài toán thực tế',
    category: 'real-geometry',
    theory: `# Hình trụ - Bài toán thực tế

Phương pháp tính diện tích xung quanh, diện tích toàn phần và thể tích hình trụ trong thực tế.

## 1. Công thức cơ bản
Cho hình trụ có bán kính đáy $R$ và chiều cao $h$:
- **Diện tích xung quanh:** $S_{xq} = 2\\pi R h$.
- **Diện tích toàn phần (gồm 2 đáy):** $S_{tp} = S_{xq} + 2S_{đáy} = 2\\pi R h + 2\\pi R^2$.
- **Thể tích:** $V = S_{đáy} \\cdot h = \\pi R^2 h$.

## 2. Ứng dụng thực tế và cách giải
- Đọc kỹ đề bài để phân biệt giữa bán kính $R$ và đường kính $d$ ($R = d/2$).
- Xác định hình trụ có hở nắp hay không để tính diện tích toàn phần chính xác (ví dụ lon nước ngọt hở 1 nắp thì $S_{tp} = S_{xq} + \\pi R^2$).
- Đồng bộ đơn vị đo trước khi tính toán.`
  },
  {
    id: 'math-cone-detail',
    subject: 'math',
    topic: 'Hình học không gian',
    title: 'Hình nón và hình nón cụt',
    category: 'real-geometry',
    theory: `# Hình nón và Hình nón cụt

Công thức tính toán diện tích, thể tích hình nón và hình nón cụt bám sát đề thi tuyển sinh.

## 1. Hình nón
Cho hình nón có bán kính đáy $R$, chiều cao $h$, và đường sinh $l$:
- Quan hệ: $l = \\sqrt{R^2 + h^2}$ (định lý Pitago).
- **Diện tích xung quanh:** $S_{xq} = \\pi R l$.
- **Diện tích toàn phần:** $S_{tp} = \\pi R l + \\pi R^2$.
- **Thể tích:** $V = \\frac{1}{3}\\pi R^2 h$.

## 2. Hình nón cụt
Cho hình nón cụt có hai bán kính đáy là $R_1, R_2$ ($R_1 > R_2$) và chiều cao $h$:
- **Thể tích:** $V = \\frac{1}{3}\\pi h (R_1^2 + R_2^2 + R_1 R_2)$.`
  },
  {
    id: 'math-cone-sphere-combined',
    subject: 'math',
    topic: 'Hình học không gian',
    title: 'Hình cầu và bài toán kết hợp',
    category: 'real-geometry',
    theory: `# Hình cầu và Bài toán kết hợp hình khối

Phương pháp tính toán diện tích và thể tích hình cầu, cùng các bài toán liên kết nhiều hình khối.

## 1. Công thức hình cầu
Cho hình cầu có bán kính $R$:
- **Diện tích mặt cầu:** $S = 4\\pi R^2 = \\pi d^2$ (với $d = 2R$).
- **Thể tích hình cầu:** $V = \\frac{4}{3}\\pi R^3$.

## 2. Bài toán kết hợp hình khối thực tế
- Thường gặp dạng: đồ chơi có một đầu là hình bán cầu (nửa hình cầu), thân là hình trụ hoặc hình nón.
- **Phương pháp giải:** Chia nhỏ vật thể thành các khối hình học cơ bản, tính diện tích hoặc thể tích từng phần rồi cộng lại.`
  },
  {
    id: 'math-quadratic-applied',
    subject: 'math',
    topic: 'Hàm số và Phương trình',
    title: 'Bài toán thực tế bậc hai',
    category: 'real-equations',
    theory: `# Bài toán thực tế bậc hai

Cách lập phương trình bậc hai một ẩn từ các bài toán thực tế như kinh tế, hình học, chuyển động.

## 1. Quy trình giải
- **Bước 1: Chọn ẩn:** Chọn ẩn số trực tiếp hoặc gián tiếp, đặt điều kiện thích hợp cho ẩn (ví dụ kích thước phải dương, vận tốc lớn hơn 0).
- **Bước 2: Lập phương trình:** Biểu diễn các đại lượng chưa biết theo ẩn và lập mối quan hệ để có phương trình bậc hai $ax^2 + bx + c = 0$.
- **Bước 3: Giải phương trình và kết luận:** Giải phương trình, đối chiếu điều kiện để chọn nghiệm phù hợp.

## 2. Các dạng toán phổ biến
- **Diện tích hình học:** Tăng/giảm chiều dài, rộng của vườn/sân.
- **Toán kinh tế:** Tăng giá bán ảnh hưởng đến số lượng sản phẩm bán ra.`
  },
  {
    id: 'math-right-triangle-ratio-2',
    subject: 'math',
    topic: 'Hệ thức lượng',
    title: 'Ứng dụng hệ thức lượng nâng cao',
    category: 'real-geometry',
    theory: `# Ứng dụng hệ thức lượng nâng cao

Các phương pháp kết hợp hệ thức lượng, định lý Pitago để giải các bài toán tính toán hình học phức tạp.

## 1. Các bước giải bài toán tính toán
- **Bước 1:** Vẽ hình đúng tỉ lệ và ký hiệu các góc vuông, đường cao.
- **Bước 2:** Xác định tam giác vuông chứa các đại lượng đã biết và đại lượng cần tìm.
- **Bước 3:** Lựa chọn hệ thức phù hợp. Nếu chưa đủ dữ kiện, đặt ẩn phụ ($x$) cho một cạnh hình chiếu để thiết lập phương trình liên hệ.

## 2. Mẹo thi cử
- Luôn tìm các tam giác đồng dạng nếu không trực tiếp dùng được hệ thức lượng trong một tam giác vuông duy nhất.`
  },
  {
    id: 'lit-nlxh-doc-hieu-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Cách lập luận trong nghị luận xã hội',
    category: 'literature-reading-prose',
    theory: `# Phân tích cách lập luận trong văn nghị luận xã hội

Cách nhận diện các thao tác lập luận và kiểu bố cục lập luận trong đoạn văn hoặc bài viết nghị luận xã hội.

## 1. Các thao tác lập luận cơ bản
- **Giải thích:** Làm rõ khái niệm, nghĩa của từ ngữ, hiện tượng.
- **Phân tích:** Chia nhỏ vấn đề để xem xét tường tận các khía cạnh.
- **Chứng minh:** Dùng dẫn chứng thực tế để làm sáng tỏ lý lẽ.
- **Bình luận:** Bày tỏ ý kiến đánh giá đúng/sai, tốt/xấu về vấn đề.

## 2. Kiểu lập luận của đoạn văn
- **Diễn dịch:** Ý khái quát ở đầu, các câu sau triển khai cụ thể.
- **Quy nạp:** Các ý cụ thể đi trước, câu kết luận tổng hợp ở cuối.
- **Tổng - phân - hợp:** Mở đoạn nêu chủ đề, thân đoạn phân tích, kết đoạn tổng hợp và nâng cao.`
  },
  {
    id: 'lit-nlvh-doc-hieu-2',
    subject: 'literature',
    topic: 'Đọc hiểu văn bản',
    title: 'Lý lẽ và dẫn chứng trong nghị luận văn học',
    category: 'literature-reading-prose',
    theory: `# Phân tích lý lẽ và dẫn chứng trong nghị luận văn học

Cách khai thác dẫn chứng nghệ thuật và liên kết hệ thống lập luận khi đọc hiểu văn bản nghị luận văn học.

## 1. Vai trò của Lý lẽ và Dẫn chứng
- **Lý lẽ:** Ý kiến, quan điểm của người viết về giá trị tác phẩm.
- **Dẫn chứng:** Các chi tiết, câu thơ, trích đoạn lấy trực tiếp từ tác phẩm để chứng minh cho lý lẽ đó.

## 2. Cách phân tích cấu trúc nghị luận văn học
- Chỉ ra mối liên hệ tương hỗ: Dẫn chứng văn học này phục vụ cho việc chứng minh lý lẽ nào?
- Đánh giá tính thuyết phục của việc lựa chọn dẫn chứng (dẫn chứng có tiêu biểu và lột tả được tinh thần của tác phẩm không).`
  },
  {
    id: 'lit-rhetoric-advanced-1',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Điệp từ, chơi chữ, nói mỉa và nghịch ngữ',
    category: 'literature-vietnamese',
    theory: `# Điệp từ, chơi chữ, nói mỉa và nghịch ngữ

Nhận diện và phân tích hiệu quả nghệ thuật của các biện pháp tu từ nâng cao trong văn bản.

## 1. Điệp từ và Điệp ngữ
- Lặp lại từ ngữ để nhấn mạnh cảm xúc, tạo nhịp điệu.

## 2. Chơi chữ (Puns)
- Lợi dụng hiện tượng đồng âm, đồng nghĩa, gần âm để tạo nghĩa độc đáo, hóm hỉnh.

## 3. Nói mỉa (Irony) và Nghịch ngữ (Oxymoron)
- **Nói mỉa:** Dùng từ trái ngược với ý định thực sự để châm biếm, phê phán.
- **Nghịch ngữ:** Kết hợp các từ có nghĩa đối lập hoàn toàn đứng cạnh nhau (*sự im lặng ồn ào, niềm đau ngọt ngào*).`
  },
  {
    id: 'lit-rhetoric-advanced-2',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Biện pháp nói giảm nói tránh và nói quá',
    category: 'literature-vietnamese',
    theory: `# Biện pháp nói giảm nói tránh và nói quá

Phân biệt khái niệm và hiệu quả tu từ của biện pháp nói giảm nói tránh và nói quá.

## 1. Nói giảm nói tránh (Euphemism)
- **Khái niệm:** Dùng cách diễn đạt tế nhị, uyển chuyển.
- **Tác dụng:** Tránh gây cảm giác quá đau buồn, ghê sợ hoặc thiếu lịch sự.
  *Ví dụ: "Bác đã đi rồi sao Bác ơi!" (Tố Hữu) - dùng từ "đi" thay cho từ chết.*

## 2. Nói quá (Hyperbole)
- **Khái niệm:** Phóng đại quy mô, mức độ của sự vật, hiện tượng.
- **Tác dụng:** Nhấn mạnh, gây ấn tượng mạnh, tăng tính biểu cảm.`
  },
  {
    id: 'lit-grammar-expand-2',
    subject: 'literature',
    topic: 'Tiếng Việt',
    title: 'Thực hành viết câu chất lượng cao',
    category: 'literature-vietnamese',
    theory: `# Thực hành viết câu chất lượng cao

Kỹ năng phối hợp các thành phần câu để tạo nên những câu văn mạch lạc, giàu tính tạo hình phục vụ viết bài làm văn.

## 1. Tránh các lỗi câu thường gặp
- Lỗi câu thiếu chủ ngữ hoặc vị ngữ.
- Lỗi dùng từ không hợp lô-gích quan hệ nghĩa.

## 2. Bí quyết nâng cấp câu văn
- Sử dụng các cặp quan hệ từ thích hợp để nhấn mạnh logic (*Không những... mà còn..., Sở dĩ... là vì...*).
- Đưa thêm thành phần phụ chú hoặc tình thái để thể hiện quan điểm cá nhân một cách tinh tế và tăng tính học thuật cho bài viết.`
  },
  {
    id: 'eng-phonetics-stress-exam',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Ngữ âm và trọng âm dạng đề thi',
    category: 'wordform',
    theory: `# Trắc nghiệm Trọng âm và Phát âm dạng đề thi

Tổng hợp các bẫy thường gặp và danh sách từ vựng trọng tâm trong các câu hỏi ngữ âm đề thi tuyển sinh 10.

## 1. Các bẫy phát âm nguyên âm phổ biến
- Đuôi \`-ed\` và \`-s/-es\` (quy tắc chuẩn kèm từ đặc biệt: *wanted, sacred, dogs, cats*).
- Nguyên âm đơn khác nhau: \`u\` phát âm là /ʌ/ (*cut*) hay /juː/ (*mute*), \`a\` phát âm là /æ/ (*cat*) hay /eɪ/ (*date*).

## 2. Bẫy trọng âm đặc biệt
- Động từ có 2 âm tiết nhưng âm thứ hai chứa nguyên âm ngắn /ə/ hoặc /oʊ/ $\\rightarrow$ trọng âm rơi vào âm thứ nhất (*open, answer, follow*).
- Danh từ có 2 âm tiết nhưng âm thứ nhất chứa nguyên âm ngắn và âm thứ hai chứa nguyên âm dài $\\rightarrow$ trọng âm rơi vào âm thứ hai (*design, balloon*).`
  },
  {
    id: 'eng-grammar-mcq-2',
    subject: 'english',
    topic: 'Ngữ pháp lõi',
    title: 'Biển báo và thông báo thực tế',
    category: 'grammar',
    theory: `# Biển báo và Thông báo thực tế - Signs & Notices

Phương pháp phân tích hình ảnh biển báo và thông báo ngắn xuất hiện trong đề tuyển sinh 10 TP.HCM.

## 1. Đặc điểm dạng bài
- Đề thi thường cho hình ảnh một biển báo công cộng hoặc một mẩu giấy nhắn nhắn tin ngắn và yêu cầu học sinh chọn câu giải thích đúng ý nghĩa nhất.

## 2. Các từ khóa quan trọng cần nhớ
- **Bắt buộc / Cho phép:** \`must, have to, allowed to, permitted\`.
- **Cấm đoán:** \`mustn't, strictly prohibited, not allowed, forbidden\`.
- **Khuyên bảo / Cảnh báo:** \`should, warning, caution, beware of\`.`
  },
  {
    id: 'eng-reading-comprehension-1',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Trắc nghiệm đọc hiểu MCQ',
    category: 'grammar',
    theory: `# Kỹ thuật trả lời trắc nghiệm đọc hiểu MCQ

Cách giải quyết các câu hỏi đọc hiểu chọn đáp án đúng nhất (Multiple Choice Questions).

## 1. Nhận diện các loại câu hỏi
- **Câu hỏi chi tiết (Detail Questions):** Tìm thông tin cụ thể trong văn bản.
- **Câu hỏi tham chiếu (Reference Questions):** Từ *it, they, them, this* chỉ cái gì.
- **Câu hỏi từ vựng (Vocabulary Questions):** Tìm từ đồng nghĩa trong đoạn văn.
- **Câu hỏi ý chính (Main Idea):** Tiêu đề hoặc mục đích chính của bài đọc.

## 2. Kỹ thuật loại trừ bẫy
- Loại đáp án chứa từ mang nghĩa tuyệt đối (*always, never, only*) trừ khi bài viết khẳng định rõ.
- Cảnh giác với đáp án bê nguyên xi từ ngữ trong bài đọc nhưng sai logic.`
  },
  {
    id: 'eng-reading-comprehension-2',
    subject: 'english',
    topic: 'Kỹ năng Đọc',
    title: 'Đọc hiểu True/False/Not Given',
    category: 'grammar',
    theory: `# Kỹ thuật đọc hiểu True/False/Not Given

Phương pháp phân tích thông tin để giải quyết dạng bài Đúng/Sai/Không đề cập trong đề thi.

## 1. Phân biệt rõ các trạng thái
- **True (Đúng):** Thông tin trong câu hỏi khớp hoàn toàn về nghĩa với thông tin trong bài (được diễn đạt lại - paraphrase).
- **False (Sai):** Thông tin trong câu hỏi trái ngược hoàn toàn hoặc phủ nhận thông tin trong bài.
- **Not Given (Không đề cập):** Bài đọc không nhắc tới hoặc không thể kiểm chứng thông tin đó.

## 2. Các bước làm bài
- **Bước 1:** Đọc câu hỏi và gạch chân các từ khóa cốt lõi (tên riêng, số liệu, tính từ mạnh).
- **Bước 2:** Quét bài đọc để tìm vị trí chứa từ khóa.
- **Bước 3:** Đọc kỹ 2-3 câu xung quanh vị trí đó để đối chiếu nghĩa.`
  },
  {
    id: 'eng-vocab-community',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Từ vựng chủ điểm Our Communities',
    category: 'vocabulary',
    theory: `# Từ vựng chủ điểm Our Communities

Các từ vựng, cụm động từ và cấu trúc thường gặp xoay quanh chủ điểm Cộng đồng và Làng nghề truyền thống.

## 1. Từ vựng trọng tâm (Vocabularies)
- **Traditional craft:** Nghề thủ công truyền thống.
- **Artisan:** Nghệ nhân.
- **Attraction:** Điểm thu hút khách du lịch.
- **Preserve:** Bảo tồn.
- **Community:** Cộng đồng.

## 2. Cụm động từ liên quan (Phrasal Verbs)
- **Pass down:** Truyền lại (qua các thế hệ).
- **Live on:** Sống dựa vào (thu nhập, nghề nghiệp).
- **Set up:** Thành lập (doanh nghiệp, xưởng tranh).
- **Deal with:** Giải quyết, đối phó.`
  }
,
  {
    id: 'math-inequality-concept',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Khái niệm bất đẳng thức và tính chất cơ bản',
    category: 'math-inequality',
    theory: `# Khái niệm bất đẳng thức và tính chất cơ bản

## 1. Định nghĩa và ký hiệu
- Dùng để so sánh hai đại lượng: lớn hơn (>), nhỏ hơn (<), lớn hơn hoặc bằng (≥), nhỏ hơn hoặc bằng (≤).
- Nếu $a > b$, thì $a - b > 0$.

## 2. Tính chất cơ bản
1. **Tính chất bắc cầu:** Nếu $a > b$ và $b > c$ thì $a > c$.
2. **Cộng hai vế với một số:** $a > b \\implies a + c > b + c$.
3. **Nhân hai vế với số dương:** Nếu $c > 0$, $a > b \\implies a \\cdot c > b \\cdot c$.
4. **Nhân hai vế với số âm:** Nếu $c < 0$, $a > b \\implies a \\cdot c < b \\cdot c$ (Đổi chiều bất đẳng thức).
5. **Cộng hai bất đẳng thức cùng chiều:** Nếu $a > b$ và $c > d$ thì $a + c > b + d$.

> **Lưu ý:** Tuyệt đối KHÔNG trừ hai bất đẳng thức cùng chiều cho nhau. Phải đổi chiều rồi mới được áp dụng.`
  },
  {
    id: 'math-inequality-cauchy',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Bất đẳng thức Cauchy (AM-GM)',
    category: 'math-inequality',
    theory: `# Bất đẳng thức Cauchy (AM-GM)

## 1. Phát biểu định lý
- Trung bình cộng của n số không âm luôn lớn hơn hoặc bằng trung bình nhân của chúng.
- **Dạng 2 số:** Với $a, b \\ge 0$, ta có: $\\frac{a + b}{2} \\ge \\sqrt{ab}$ hay $a + b \\ge 2\\sqrt{ab}$.
- Dấu "=" xảy ra khi và chỉ khi $a = b$.

## 2. Các hệ quả thường gặp
- $(a+b)^2 \\ge 4ab$.
- $\\frac{1}{a} + \\frac{1}{b} \\ge \\frac{4}{a+b}$ với $a,b > 0$.

## 3. Ứng dụng
- Bất đẳng thức Cauchy thường được dùng để tìm Giá trị lớn nhất (GTLN) và Giá trị nhỏ nhất (GTNN).
- **Mẹo tìm GTNN:** Khi cần tìm GTNN của tổng $A + B$, nếu ta chứng minh được $A + B \\ge M$, và dấu "=" có thể xảy ra, thì $M$ là GTNN. Tích $A \\cdot B$ phải là hằng số để dùng Cauchy.`
  },
  {
    id: 'math-linear-inequality-1',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Giải bất phương trình bậc nhất một ẩn',
    category: 'math-inequality',
    theory: `# Giải bất phương trình bậc nhất một ẩn

## 1. Dạng tổng quát
- $ax + b > 0$, $ax + b < 0$, $ax + b \\ge 0$, $ax + b \\le 0$ (với $a \\ne 0$).

## 2. Các bước giải
1. Chuyển hạng tử chứa ẩn sang một vế, hạng tử tự do sang vế kia (đổi dấu hạng tử khi chuyển vế).
2. Thu gọn và chia cả hai vế cho hệ số của ẩn.
3. **LƯU Ý ĐẶC BIỆT:** Nếu chia cho số âm, phải đổi chiều bất phương trình.

Ví dụ: $-2x + 4 > 0 \\implies -2x > -4 \\implies x < 2$.

## 3. Biểu diễn tập nghiệm trên trục số
- Dùng dấu ngoặc tròn "$($", "$)$" cho khoảng (không lấy điểm đó, tức là $>$, $<$).
- Dùng dấu ngoặc vuông "$[$", "$]$" cho đoạn/nửa khoảng (có lấy điểm đó, tức là $\\ge$, $\\le$).
- Gạch bỏ phần trục số không thuộc tập nghiệm.`
  },
  {
    id: 'math-linear-inequality-2',
    subject: 'math',
    topic: 'Bất đẳng thức & BPT',
    title: 'Hệ bất phương trình & BPT chứa trị tuyệt đối',
    category: 'math-inequality',
    theory: `# Hệ bất phương trình & Bất phương trình chứa dấu giá trị tuyệt đối

## 1. Hệ bất phương trình bậc nhất một ẩn
- **Cách giải:** Giải riêng từng bất phương trình trong hệ.
- **Biểu diễn tập nghiệm:** Biểu diễn tập nghiệm của từng BPT lên cùng một trục số. Tập nghiệm của hệ là phần không bị gạch (phần giao của các tập nghiệm).
- **Ký hiệu giao:** $\\cap$. Ví dụ $x > 2$ và $x \\le 5 \\implies 2 < x \\le 5$.

## 2. Bất phương trình chứa giá trị tuyệt đối cơ bản
- Dạng 1: $|A| < M$ (với $M > 0$) $\\iff -M < A < M$.
- Dạng 2: $|A| > M$ (với $M > 0$) $\\iff A > M$ hoặc $A < -M$.

*Lưu ý:* Luôn kiểm tra điều kiện để phân tích bỏ dấu giá trị tuyệt đối nếu biểu thức nằm trong dấu trị tuyệt đối phức tạp.`
  },
  {
    id: 'math-quadratic-function',
    subject: 'math',
    topic: 'Hàm số bậc hai',
    title: 'Hàm số y = ax² — Tính chất và đồ thị Parabol',
    category: 'math-quadratic-function',
    theory: `# Hàm số y = ax² — Tính chất và đồ thị Parabol

## 1. Tính chất hàm số y = ax² ($a \\ne 0$)
- Tập xác định: $\\mathbb{R}$.
- Nếu $a > 0$: Hàm số nghịch biến khi $x < 0$ và đồng biến khi $x > 0$. GTNN là $y = 0$ khi $x = 0$.
- Nếu $a < 0$: Hàm số đồng biến khi $x < 0$ và nghịch biến khi $x > 0$. GTLN là $y = 0$ khi $x = 0$.

## 2. Đồ thị Parabol (P)
- Đồ thị là một đường cong Parabol đi qua gốc tọa độ O(0,0).
- O(0,0) là đỉnh của Parabol.
- Trục Oy ($x=0$) là trục đối xứng.
- Nằm phía trên trục hoành nếu $a > 0$, nằm phía dưới nếu $a < 0$.

## 3. Cách vẽ đồ thị chuẩn
1. Lập bảng giá trị: Lấy 5 điểm đối xứng qua $x=0$, ví dụ $x = -2, -1, 0, 1, 2$.
2. Biểu diễn các điểm trên mặt phẳng tọa độ.
3. Dùng thước Parabol nối các điểm lại thành đường cong trơn.`
  },
  {
    id: 'lit-info-explain-1',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đọc hiểu văn bản thông tin — Tổ chức thông tin',
    category: 'lit-reading-information',
    theory: `# Đọc hiểu văn bản thông tin — Tổ chức thông tin

## 1. Mục đích của văn bản thông tin
- Cung cấp thông tin khách quan, chính xác về một sự vật, hiện tượng, quá trình tự nhiên hoặc xã hội.
- Giúp người đọc mở rộng hiểu biết, nâng cao nhận thức.

## 2. Các cách tổ chức thông tin phổ biến
1. **Theo trật tự thời gian:** Trình bày sự kiện theo thứ tự trước - sau (thường dùng trong văn bản lịch sử, tiểu sử, báo cáo sự kiện).
2. **Theo trật tự không gian:** Miêu tả từ ngoài vào trong, từ trên xuống dưới (thường dùng trong giới thiệu danh lam thắng cảnh).
3. **Theo quan hệ nguyên nhân - kết quả:** Phân tích lý do xảy ra hiện tượng và hậu quả của nó (thường dùng trong giải thích hiện tượng tự nhiên, xã hội).
4. **Theo mức độ quan trọng:** Trình bày từ thông tin quan trọng nhất đến ít quan trọng hoặc ngược lại.

## 3. Kỹ năng đọc hiểu
- Đọc lướt (skimming) để tìm ý chính qua tiêu đề, sa-pô, đề mục.
- Đọc dò (scanning) để tìm thông tin chi tiết (số liệu, thời gian, nhân vật).
- Nhận biết cấu trúc để hiểu logic trình bày của tác giả.`
  },
  {
    id: 'lit-info-explain-2',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Yếu tố phi ngôn ngữ trong văn bản thông tin',
    category: 'lit-reading-information',
    theory: `# Yếu tố phi ngôn ngữ trong văn bản thông tin

## 1. Yếu tố phi ngôn ngữ là gì?
- Là các phương tiện không sử dụng từ ngữ mà dùng hình ảnh, đường nét, màu sắc, bố cục để truyền đạt thông tin.
- Bao gồm: Hình ảnh (ảnh chụp, hình vẽ), sơ đồ, biểu đồ, đồ thị, bảng biểu, bản đồ.

## 2. Vai trò của yếu tố phi ngôn ngữ
1. **Trực quan hóa:** Giúp người đọc dễ hình dung sự vật, hiện tượng một cách sinh động, cụ thể.
2. **Hệ thống hóa:** Bảng biểu, sơ đồ giúp tóm tắt số liệu phức tạp thành dạng dễ đối chiếu, so sánh và ghi nhớ.
3. **Tăng tính thuyết phục:** Các số liệu trong biểu đồ cung cấp bằng chứng khách quan, đáng tin cậy.
4. **Hỗ trợ yếu tố ngôn ngữ:** Bổ sung ý nghĩa cho phần chữ viết, giúp văn bản bớt nhàm chán và hấp dẫn hơn.

## 3. Cách đọc hiểu phối hợp
- Đọc nhan đề của bảng/biểu đồ để biết chủ đề.
- Chú thích và đơn vị đo lường.
- Kết nối thông tin từ hình ảnh với nội dung trong đoạn văn bản để hiểu trọn vẹn ý nghĩa.`
  },
  {
    id: 'lit-info-review-1',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đọc hiểu văn bản giới thiệu sách, bộ phim',
    category: 'lit-reading-information',
    theory: `# Đọc hiểu văn bản giới thiệu sách, bộ phim

## 1. Đặc điểm văn bản giới thiệu tác phẩm nghệ thuật
- Cung cấp thông tin cơ bản về tác phẩm (tên, tác giả/đạo diễn, năm xuất bản/phát hành, thể loại).
- Tóm tắt ngắn gọn nội dung mà không làm lộ kết thúc (không spoil).
- Nêu lên những điểm đặc sắc về nghệ thuật, nhân vật, thông điệp.
- Thể hiện sự đánh giá, nhận xét của người giới thiệu để khơi gợi sự hứng thú của người đọc.

## 2. Bố cục thường gặp
1. **Mở đầu:** Nêu tên tác phẩm, tác giả và ấn tượng khái quát.
2. **Thân bài:**
   - Tóm tắt bối cảnh, cốt truyện chính.
   - Nổi bật đặc điểm nhân vật.
   - Phân tích nét độc đáo về nghệ thuật (ngôn từ, kỹ xảo, góc quay).
3. **Kết luận:** Tổng kết giá trị tác phẩm và khuyến nghị người xem.

## 3. Kỹ năng tiếp nhận
- Phân biệt đâu là sự thật khách quan (năm xuất bản, diễn viên) và đâu là ý kiến chủ quan của người viết (hay, cảm động, xuất sắc).`
  },
  {
    id: 'lit-info-review-2',
    subject: 'literature',
    topic: 'Văn bản thông tin',
    title: 'Đánh giá và nhận xét trong văn bản thông tin',
    category: 'lit-reading-information',
    theory: `# Đánh giá và nhận xét trong văn bản thông tin

## 1. Sự đan xen giữa Thông tin và Bình luận
- Trong các bài viết giới thiệu sách, phim hay bài báo phân tích hiện tượng, yếu tố thông tin (sự thật, dữ kiện khách quan) luôn đi kèm với bình luận (đánh giá chủ quan).
- **Sự thật (Fact):** Bộ phim đoạt 3 giải Oscar vào năm 2023.
- **Ý kiến (Opinion):** Kịch bản phim thực sự là một kiệt tác của điện ảnh hiện đại.

## 2. Tiêu chí đánh giá tính thuyết phục
1. **Lý lẽ rõ ràng:** Lời nhận xét phải dựa trên những cơ sở cụ thể (ví dụ: khen phim hay vì diễn xuất của nam chính rất chân thực).
2. **Bằng chứng xác đáng:** Dùng chi tiết từ tác phẩm (một câu thoại đắt giá, một hình ảnh biểu tượng) để chứng minh.
3. **Thái độ khách quan:** Đánh giá cả điểm mạnh và điểm hạn chế, không ca ngợi mù quáng hay chê bai cực đoan.

## 3. Bài học khi làm bài thi
- Đề thi thường yêu cầu học sinh chỉ ra yếu tố nhận xét trong văn bản và đánh giá tính hợp lý của nó.
- Cần chỉ rõ bằng chứng mà tác giả đã sử dụng để làm nền tảng cho nhận xét đó.`
  },
  {
    id: 'lit-write-narrative-1',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Kỹ thuật viết văn tự sự kết hợp miêu tả nội tâm',
    category: 'lit-writing',
    theory: `# Kỹ thuật viết văn tự sự kết hợp miêu tả nội tâm

## 1. Tự sự kết hợp miêu tả nội tâm là gì?
- Kể lại sự việc (tự sự) kết hợp với việc tái hiện những suy nghĩ, cảm xúc, dằn vặt, trăn trở của nhân vật (miêu tả nội tâm).
- Miêu tả nội tâm giúp câu chuyện có chiều sâu, nhân vật trở nên sống động, chân thực, giúp người đọc thấu hiểu động cơ hành động.

## 2. Các phương thức miêu tả nội tâm
- **Trực tiếp:** Dùng ngôn ngữ kể để bộc lộ trực tiếp suy nghĩ, tình cảm. Dấu hiệu: từ ngữ chỉ cảm xúc (vui, buồn, sợ hãi), câu độc thoại nội tâm.
- **Gián tiếp:** Thể hiện tâm trạng qua cử chỉ, ánh mắt, nét mặt, lời nói và cảnh vật xung quanh (Tả cảnh ngụ tình).

## 3. Cách thức thực hành trong bài làm
- Xây dựng tình huống có vấn đề để nhân vật bộc lộ tâm lý (một quyết định khó khăn, một sự hối hận).
- Dừng lại ở các "điểm nút" của cốt truyện để chèn đoạn miêu tả nội tâm dài 3-5 câu.
- Dùng độc thoại nội tâm: "Trời ơi, sao tôi lại làm thế?", "Liệu mọi người có tha thứ cho mình không?".
- Sử dụng các hình ảnh so sánh, ẩn dụ để cụ thể hóa tâm trạng vô hình.`
  },
  {
    id: 'eng-writing-email-1',
    subject: 'english',
    topic: 'Kỹ năng Viết (Writing)',
    title: 'Viết email trang trọng (Formal Email)',
    category: 'eng-writing',
    theory: `# Viết email trang trọng (Formal Email)

## 1. Khi nào dùng Formal Email?
Gửi cho thầy cô, nhà trường, đối tác, người xin việc, cơ quan tổ chức, hoặc người lạ lớn tuổi.

## 2. Cấu trúc chuẩn
1. **Greeting (Chào hỏi):** Dear Mr. / Ms. [Họ/Tên], hoặc Dear Sir/Madam (nếu không biết tên).
2. **Opening (Mở đầu):** 
   - I am writing to inform you that... (Tôi viết thư này để báo...)
   - I am writing to request information about... (Tôi xin thông tin về...)
3. **Body (Nội dung chính):** Viết rõ ràng, dùng ngôn ngữ lịch sự, không viết tắt (dùng I am thay vì I'm, cannot thay vì can't).
4. **Closing (Kết thúc):** 
   - I look forward to hearing from you. (Rất mong nhận phản hồi).
   - Please let me know if you have any questions.
5. **Sign-off (Chữ ký):**
   - Yours sincerely, (Nếu đã xưng tên người nhận ở đầu).
   - Yours faithfully, (Nếu dùng Dear Sir/Madam).

## 3. Mẫu câu yêu cầu lịch sự
- Could you please send me...?
- I would be grateful if you could...
- I would appreciate it if...`
  },
  {
    id: 'eng-writing-email-2',
    subject: 'english',
    topic: 'Kỹ năng Viết (Writing)',
    title: 'Viết email không trang trọng (Informal Email)',
    category: 'eng-writing',
    theory: `# Viết email không trang trọng (Informal Email)

## 1. Khi nào dùng Informal Email?
Gửi cho bạn bè, người thân, hoặc những người ngang hàng có mối quan hệ thân thiết. Dùng ngôn ngữ thân thiện, có thể dùng câu hỏi tu từ, cảm thán, và từ viết tắt.

## 2. Cấu trúc chuẩn
1. **Greeting (Chào hỏi):** Hi [Tên], Hello, Dear [Tên],
2. **Opening (Mở đầu):**
   - How are things? / How is it going?
   - Thanks for your email. / Great to hear from you.
   - Sorry I haven't written for so long.
3. **Body (Nội dung chính):** Cung cấp tin tức, mời mọc, khuyên nhủ.
   - Guess what? (Đoán xem chuyện gì?)
   - I'm writing to tell you about...
   - Why don't we go to...? / How about V-ing...? (Đưa ra lời khuyên/mời)
4. **Closing (Kết thúc):**
   - Write back soon!
   - Can't wait to see you!
   - Give my love to your family.
5. **Sign-off (Ký tên):**
   - Best, / Best wishes, / See you, / Lots of love, + [Tên của bạn].

## 3. Lỗi thường gặp cần tránh
- Trộn lẫn văn phong trang trọng và thân mật trong cùng một bức thư.
- Quên trả lời tất cả các câu hỏi mà đề bài yêu cầu trong prompt (rất dễ mất điểm Task Achievement).`
  },
  {
    id: 'eng-phonetics-vowels',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Bảng âm chuẩn IPA — Nguyên âm và Phụ âm',
    category: 'eng-pronunciation',
    theory: `# Bảng âm chuẩn IPA — Nguyên âm và Phụ âm

## 1. Vai trò của IPA
- IPA (International Phonetic Alphabet) giúp học sinh biết cách phát âm chính xác một từ Tiếng Anh mà không cần phải đoán.
- Trong bài thi vào 10, câu hỏi phát âm từ gạch chân thường kiểm tra sự nhận biết các âm này.

## 2. Nguyên âm (Vowels)
- **Nguyên âm ngắn:** /ɪ/ (sit), /e/ (bed), /æ/ (cat), /ʌ/ (cup), /ɒ/ (hot), /ʊ/ (put), /ə/ (about).
- **Nguyên âm dài:** /iː/ (see), /ɑː/ (car), /ɔː/ (door), /uː/ (blue), /ɜː/ (bird).
- **Nguyên âm đôi (Diphthongs):** /eɪ/ (day), /aɪ/ (my), /ɔɪ/ (boy), /aʊ/ (how), /əʊ/ (go), /ɪə/ (here), /eə/ (hair), /ʊə/ (tour).

## 3. Phụ âm dễ nhầm lẫn trong đề thi
- **/θ/ và /ð/:**
  - /θ/ (vô thanh): think, math, both, through.
  - /ð/ (hữu thanh): this, that, mother, breathe.
- **/s/ và /z/:**
  - Thường kiểm tra quy tắc phát âm đuôi -s/es.
- **/tʃ/ và /dʒ/:**
  - /tʃ/: chair, watch, nature.
  - /dʒ/: jam, age, bridge.

*Mẹo thi:* Khi gặp từ khó, hãy đối chiếu phần gạch chân với các từ quen thuộc chứa âm tương tự.`
  },
  {
    id: 'eng-grammar-mcq-1',
    subject: 'english',
    topic: 'Ngữ pháp (Grammar)',
    title: 'Chiến lược làm trắc nghiệm Ngữ pháp & Từ vựng',
    category: 'eng-grammar',
    theory: `# Chiến lược làm bài trắc nghiệm Ngữ pháp & Từ vựng

## 1. Quan sát "Signal words" (Từ tín hiệu)
- Khi làm câu hỏi chia thì động từ, hãy quét nhanh câu để tìm các trạng từ chỉ thời gian.
  - *yesterday, in 2010* $\\rightarrow$ Quá khứ đơn.
  - *since, for, recently* $\\rightarrow$ Hiện tại hoàn thành.
  - *at this time tomorrow* $\\rightarrow$ Tương lai tiếp diễn.

## 2. Phân tích loại từ (Từ vựng/Word form)
- Nhìn vào chỗ trống: Phía trước là gì? Phía sau là gì?
  - Sau mạo từ (a/an/the) $\\rightarrow$ Danh từ.
  - Trạng từ (adv) bổ nghĩa cho Động từ (v) hoặc Tính từ (adj).
  - Tính từ (adj) bổ nghĩa cho Danh từ (n).
- Dùng phương pháp loại trừ (Elimination) để bỏ các đáp án sai ngữ pháp ngay từ đầu.

## 3. Sự hòa hợp Chủ ngữ - Động từ (Subject-Verb Agreement)
- Phân biệt danh từ đếm được / không đếm được.
- *Neither/Either + danh từ* thì chia động từ theo danh từ đứng gần động từ nhất.
- *The number of + N* $\\rightarrow$ V số ít.
- *A number of + N* $\\rightarrow$ V số nhiều.

## 4. Kiểm tra Collocations & Phrasal Verbs
- Câu hỏi từ vựng khó thường là cụm từ cố định. Nếu không chắc chắn, hãy dựa vào tiền tố/hậu tố để đoán nét nghĩa tích cực hay tiêu cực của từ.`
  },
  {
    id: 'eng-vocab-world-future',
    subject: 'english',
    topic: 'Từ vựng & Phát âm',
    title: 'Từ vựng chủ điểm Our World & Future',
    category: 'eng-vocab',
    theory: `# Từ vựng chủ điểm Our World & Future

## 1. Môi trường (Environment)
- **Danh từ:** pollution (sự ô nhiễm), conservation (sự bảo tồn), deforestation (sự phá rừng), ecosystem (hệ sinh thái), global warming (sự nóng lên toàn cầu).
- **Động từ:** protect (bảo vệ), preserve (giữ gìn), pollute (làm ô nhiễm), exhaust (làm cạn kiệt), recycle (tái chế).
- **Tính từ:** eco-friendly (thân thiện với môi trường), endangered (bị đe dọa), renewable (có thể tái tạo).

## 2. Công nghệ và Tương lai (Technology & Future)
- **Danh từ:** artificial intelligence (trí tuệ nhân tạo), breakthrough (bước đột phá), invention (sự phát minh), gadget (thiết bị điện tử), cyberspace (không gian mạng).
- **Động từ:** invent (phát minh), discover (khám phá), browse (duyệt web), upgrade (nâng cấp).
- **Tính từ:** advanced (tiên tiến), high-tech (công nghệ cao), outdated (lỗi thời).

## 3. Cụm động từ (Phrasal Verbs) thường đi kèm
- **cut down on:** cắt giảm (lượng rác thải, năng lượng).
- **die out:** tuyệt chủng.
- **use up:** dùng cạn kiệt.
- **turn up / turn down:** vặn to / vặn nhỏ.
- **wipe out:** xóa sổ, hủy diệt.

*Mẹo thi:* Các bài đọc hiểu thường có chủ đề về môi trường và công nghệ, hãy thuộc từ vựng để hiểu nhanh nội dung văn bản.`
  }
,
  {
    id: 'math-parabol-general',
    subject: 'math',
    topic: 'Hàm số bậc hai',
    title: 'Parabol y = ax² + bx + c',
    category: 'math-quadratic-function',
    theory: `# Parabol y = ax² + bx + c

## 1. Đỉnh và Trục đối xứng
- Tọa độ đỉnh I: $x_I = -\\frac{b}{2a}$, $y_I = -\\frac{\\Delta}{4a}$.
- Trục đối xứng là đường thẳng $x = -\\frac{b}{2a}$.

## 2. Chiều biến thiên
- Nếu $a > 0$: Bề lõm hướng lên, GTNN tại đỉnh.
- Nếu $a < 0$: Bề lõm hướng xuống, GTLN tại đỉnh.`
  },
  {
    id: 'math-circle-tangent-1',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Tính chất tiếp tuyến',
    category: 'math-circle-tangent',
    theory: `# Tính chất tiếp tuyến

## 1. Định nghĩa
- Tiếp tuyến là đường thẳng chỉ có 1 điểm chung với đường tròn.
- Tiếp tuyến vuông góc với bán kính đi qua tiếp điểm.

## 2. Dấu hiệu nhận biết
- Nếu đường thẳng d vuông góc với bán kính R tại một điểm nằm trên đường tròn thì d là tiếp tuyến.`
  },
  {
    id: 'math-circle-tangent-2',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Định lý hai tiếp tuyến cắt nhau',
    category: 'math-circle-tangent',
    theory: `# Định lý hai tiếp tuyến cắt nhau

## 1. Định lý
- Hai tiếp tuyến tại B và C cắt nhau tại A thì:
  - AB = AC.
  - OA là tia phân giác góc BOC.
  - AO là tia phân giác góc BAC.

## 2. Ứng dụng
- Chứng minh các đoạn thẳng bằng nhau, các góc bằng nhau.
- Đường tròn nội tiếp tam giác.`
  },
  {
    id: 'math-circle-angle-1',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Góc ở tâm và góc nội tiếp',
    category: 'math-circle-angle',
    theory: `# Góc ở tâm và góc nội tiếp

## 1. Góc ở tâm
- Đỉnh trùng với tâm đường tròn.
- Số đo góc ở tâm bằng số đo cung bị chắn.

## 2. Góc nội tiếp
- Đỉnh nằm trên đường tròn, hai cạnh chứa hai dây cung.
- Số đo bằng nửa số đo cung bị chắn.
- Góc nội tiếp chắn nửa đường tròn là góc vuông.`
  },
  {
    id: 'math-circle-angle-2',
    subject: 'math',
    topic: 'Đường tròn',
    title: 'Góc tạo bởi tia tiếp tuyến và dây cung',
    category: 'math-circle-angle',
    theory: `# Góc tạo bởi tia tiếp tuyến và dây cung

## 1. Định nghĩa
- Đỉnh nằm trên đường tròn.
- Một cạnh là tia tiếp tuyến, cạnh kia là dây cung.

## 2. Tính chất
- Số đo bằng nửa số đo cung bị chắn.
- Trong 1 đường tròn, góc này bằng góc nội tiếp cùng chắn một cung.`
  },
  {
    id: 'math-stat-collect',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Thu thập và tổ chức dữ liệu',
    category: 'math-statistics',
    theory: `# Thu thập và tổ chức dữ liệu

## 1. Thu thập số liệu
- Các phương pháp: quan sát, phỏng vấn, lập bảng hỏi.

## 2. Bảng tần số
- Tần số (n): Số lần xuất hiện của một giá trị trong dãy số liệu.
- Tổng tần số (N) bằng tổng số các quan sát.`
  },
  {
    id: 'math-stat-relative',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Tần số tương đối',
    category: 'math-statistics',
    theory: `# Tần số tương đối

## 1. Định nghĩa
- Tỷ số phần trăm giữa tần số của một giá trị và tổng số quan sát.
- Công thức: $f = \\frac{n}{N} \\cdot 100\\%$.

## 2. Ý nghĩa
- Cho biết cơ cấu, tỷ trọng của từng giá trị trong tổng thể.`
  },
  {
    id: 'math-stat-chart-1',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Biểu đồ cột và đoạn thẳng',
    category: 'math-statistics',
    theory: `# Biểu đồ cột và đoạn thẳng

## 1. Biểu đồ cột
- Trục ngang: các giá trị.
- Trục dọc: tần số.
- Dùng để so sánh các giá trị khác nhau.

## 2. Biểu đồ đoạn thẳng
- Thể hiện sự biến thiên của đại lượng theo thời gian.`
  },
  {
    id: 'math-stat-chart-2',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Biểu đồ hình quạt tròn',
    category: 'math-statistics',
    theory: `# Biểu đồ hình quạt tròn

## 1. Đặc điểm
- Biểu diễn tần số tương đối (cơ cấu phần trăm).
- Toàn bộ hình tròn là 100%, góc ở tâm tỷ lệ với phần trăm.

## 2. Tính góc ở tâm
- Góc = $f \\cdot 3.6^\\circ$.`
  },
  {
    id: 'math-stat-mean',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Các số đặc trưng đo xu hướng trung tâm',
    category: 'math-statistics',
    theory: `# Số đặc trưng đo xu hướng trung tâm

## 1. Số trung bình
- $\\overline{x} = \\frac{x_1 n_1 + x_2 n_2 + ... + x_k n_k}{N}$.

## 2. Trung vị (Median)
- Là giá trị đứng giữa dãy số liệu đã sắp xếp.

## 3. Mốt (Mode)
- Là giá trị có tần số lớn nhất trong bảng.`
  },
  {
    id: 'math-stat-interpret',
    subject: 'math',
    topic: 'Thống kê',
    title: 'Phân tích số liệu thống kê',
    category: 'math-statistics',
    theory: `# Phân tích số liệu thống kê

- Dựa vào biểu đồ và các số đặc trưng để rút ra kết luận xu hướng chung.
- Nhận diện các giá trị bất thường (outliers).
- Đánh giá sự phân tán của dữ liệu qua biên độ (max - min).`
  },
  {
    id: 'math-prob-sample-space',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Không gian mẫu và biến cố',
    category: 'math-probability',
    theory: `# Không gian mẫu và biến cố

## 1. Phép thử ngẫu nhiên
- Là phép thử mà ta không đoán trước được kết quả chính xác, nhưng biết tập hợp mọi kết quả có thể có.

## 2. Không gian mẫu ($\\Omega$)
- Tập hợp tất cả các kết quả có thể xảy ra của phép thử.

## 3. Biến cố
- Là một tập con của không gian mẫu, ký hiệu A, B, C...`
  },
  {
    id: 'math-prob-classical',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Xác suất cổ điển',
    category: 'math-probability',
    theory: `# Xác suất cổ điển

## 1. Định nghĩa
- Khi các kết quả đồng khả năng, xác suất của biến cố A là tỷ số giữa số kết quả thuận lợi cho A và tổng số kết quả của không gian mẫu.

## 2. Công thức
- $P(A) = \\frac{n(A)}{n(\\Omega)}$.
- $0 \\le P(A) \\le 1$.
- Xác suất của biến cố chắc chắn là 1, biến cố không thể là 0.`
  },
  {
    id: 'math-prob-calculate-1',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Bài toán tung đồng xu và xúc xắc',
    category: 'math-probability',
    theory: `# Tung đồng xu và xúc xắc

## 1. Tung đồng xu
- Tung 1 lần: $\\Omega = \\{S, N\\}$.
- Tung 2 lần: $\\Omega = \\{SS, SN, NS, NN\\}$.

## 2. Gieo xúc xắc 6 mặt
- Gieo 1 lần: $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$.
- Gieo 2 lần: Có 36 kết quả.`
  },
  {
    id: 'math-prob-calculate-2',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Bài toán rút thẻ và bốc bi',
    category: 'math-probability',
    theory: `# Bài toán rút thẻ và bốc bi

## Rút thẻ
- Trong hộp có n thẻ đánh số từ 1 đến n. Rút ngẫu nhiên 1 thẻ.
- Xác suất thẻ chẵn, thẻ chia hết cho 3...

## Bốc bi
- Hộp có a bi xanh, b bi đỏ. Bốc ngẫu nhiên 1 bi.
- $P(\\text{xanh}) = \\frac{a}{a+b}$.`
  },
  {
    id: 'math-prob-applied-1',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Ứng dụng xác suất vào đời sống',
    category: 'math-probability',
    theory: `# Ứng dụng xác suất

- Đánh giá khả năng chiến thắng trong trò chơi trúng thưởng.
- Quyết định rủi ro kinh doanh, thời tiết.
- Xác suất thực nghiệm: Tỷ số giữa số lần xuất hiện biến cố và tổng số phép thử khi thực hiện nhiều lần.`
  },
  {
    id: 'math-prob-applied-2',
    subject: 'math',
    topic: 'Xác suất',
    title: 'Xác suất nâng cao',
    category: 'math-probability',
    theory: `# Xác suất nâng cao

- Biến cố độc lập: Sự xuất hiện của biến cố này không ảnh hưởng đến biến cố kia.
- Quy tắc nhân: Nếu A và B độc lập, $P(AB) = P(A) \\cdot P(B)$.
- Bài tập tổng hợp nhiều giai đoạn (sơ đồ cây).`
  },
  {
    id: 'math-geogebra-1',
    subject: 'math',
    topic: 'Thực hành',
    title: 'Sử dụng GeoGebra vẽ đồ thị',
    category: 'math-practice',
    theory: `# Sử dụng GeoGebra vẽ đồ thị

- GeoGebra giúp trực quan hóa hàm số $y = ax^2$.
- Hướng dẫn nhập hàm số trên ô Input.
- Tạo thanh trượt (slider) cho các hệ số a, b, c để quan sát sự thay đổi hình dáng Parabol.`
  },
  {
    id: 'math-geogebra-2',
    subject: 'math',
    topic: 'Thực hành',
    title: 'Mô phỏng hình học bằng GeoGebra',
    category: 'math-practice',
    theory: `# Mô phỏng hình học GeoGebra

- Vẽ đường tròn đi qua 3 điểm.
- Dựng tiếp tuyến từ một điểm ngoài đường tròn.
- Tính số đo góc ở tâm và góc nội tiếp bằng công cụ Angle.`
  },
  {
    id: 'math-measure-height',
    subject: 'math',
    topic: 'Thực hành',
    title: 'Dự án đo chiều cao gián tiếp',
    category: 'math-practice',
    theory: `# Đo chiều cao gián tiếp

- Sử dụng giác kế và thước cuộn để đo chiều cao cây, tòa nhà.
- Áp dụng hệ thức lượng trong tam giác vuông và các tỷ số lượng giác.
- Quy trình: Đo góc nhìn đỉnh, đo khoảng cách đến gốc, tính toán và cộng với chiều cao ngang mắt.`
  },
  {
    id: 'math-stat-project',
    subject: 'math',
    topic: 'Thực hành',
    title: 'Dự án thống kê thực tế',
    category: 'math-practice',
    theory: `# Dự án thống kê

- Học sinh chia nhóm thu thập dữ liệu về điểm số, chiều cao, hoặc thói quen.
- Xử lý số liệu, lập bảng tần số.
- Vẽ biểu đồ trên Excel/Word.
- Báo cáo và trình bày trước lớp.`
  }
,
  {
    id: 'lit-write-narrative-2',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Thực hành viết tự sự có chiều sâu tâm lý',
    category: 'lit-writing',
    theory: `# Viết tự sự có chiều sâu tâm lý

## 1. Dàn ý chuẩn
- **Mở bài:** Giới thiệu tình huống truyện và nhân vật chính.
- **Thân bài:** Diễn biến sự việc, đan xen miêu tả nội tâm sâu sắc (sự dằn vặt, mâu thuẫn).
- **Kết bài:** Sự thay đổi trong nhận thức và bài học.

## 2. Bí quyết đạt điểm cao
- Sử dụng kết hợp đối thoại và độc thoại nội tâm.
- Từ ngữ giàu sức gợi hình, biểu cảm.`
  },
  {
    id: 'lit-write-emotion-1',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Viết bài văn biểu cảm về thơ tự do',
    category: 'lit-writing',
    theory: `# Biểu cảm về thơ tự do

## 1. Khai thác cảm xúc
- Biểu cảm về một bài thơ là nêu lên những rung động, tình cảm của người đọc trước bài thơ đó.
- Thơ tự do thường phóng khoáng, nhịp điệu biến đổi, cần chú ý nhịp thơ để hiểu mạch cảm xúc.

## 2. Cách viết
- Bắt đầu từ hình ảnh thơ gây ấn tượng mạnh.
- Phân tích và liên hệ bản thân để làm nổi bật cảm xúc thật.`
  },
  {
    id: 'lit-write-emotion-2',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Viết biểu cảm về truyện ngắn',
    category: 'lit-writing',
    theory: `# Biểu cảm về truyện ngắn

## 1. Đặc điểm
- Khác với phân tích truyện, biểu cảm thiên về bày tỏ sự yêu thích, xúc động trước số phận nhân vật hoặc thông điệp nhân văn.

## 2. Triển khai
- Bộc lộ cảm xúc về tình huống truyện độc đáo.
- Sự đồng cảm sâu sắc với tâm trạng, hành động của nhân vật chính.`
  },
  {
    id: 'lit-write-explain-1',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Thuyết minh về danh lam thắng cảnh',
    category: 'lit-writing',
    theory: `# Thuyết minh danh lam thắng cảnh

## 1. Yêu cầu chung
- Cung cấp tri thức khách quan, chính xác về vị trí địa lý, lịch sử, đặc điểm kiến trúc và giá trị văn hóa.

## 2. Bố cục
- **Mở bài:** Giới thiệu chung.
- **Thân bài:** Vị trí, quá trình hình thành, đặc điểm nổi bật.
- **Kết bài:** Giá trị của danh lam, ý thức bảo tồn.`
  },
  {
    id: 'lit-write-explain-2',
    subject: 'literature',
    topic: 'Kỹ năng Viết',
    title: 'Thuyết minh về tác phẩm văn học',
    category: 'lit-writing',
    theory: `# Thuyết minh về tác phẩm văn học

## 1. Mục đích
- Cung cấp thông tin khách quan về tác giả, hoàn cảnh ra đời, tóm tắt nội dung và đánh giá tổng quan giá trị tác phẩm.

## 2. Lưu ý
- Phân biệt với Nghị luận văn học: Thuyết minh chủ yếu cung cấp thông tin (fact), hạn chế bình luận cá nhân bay bổng.`
  },
  {
    id: 'lit-speak-present-1',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Chuẩn bị và trình bày bài nói',
    category: 'lit-speaking',
    theory: `# Chuẩn bị và trình bày bài nói

## 1. Chuẩn bị
- Lập đề cương chi tiết.
- Chuẩn bị slide, hình ảnh minh họa.

## 2. Trình bày
- Mở đầu thu hút bằng một câu hỏi hoặc câu chuyện.
- Trình bày rõ ràng theo từng luận điểm.
- Kết thúc tóm tắt lại và cảm ơn.`
  },
  {
    id: 'lit-speak-present-2',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Giọng điệu và ngôn ngữ cơ thể',
    category: 'lit-speaking',
    theory: `# Giọng điệu và ngôn ngữ cơ thể

## 1. Giọng điệu
- Tránh nói đều đều (monotone). Nhấn mạnh ở từ khóa, lúc trầm lúc bổng.

## 2. Ngôn ngữ cơ thể
- Giao tiếp bằng mắt (Eye contact) với người nghe.
- Tư thế tự tin, sử dụng tay để minh họa nhưng không quá đà.`
  },
  {
    id: 'lit-listen-1',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Nghe và ghi chép tóm tắt ý chính',
    category: 'lit-listening',
    theory: `# Nghe và ghi chép

## 1. Kỹ năng nghe
- Nghe chủ động, tập trung vào từ nối (Tuy nhiên, Tóm lại, Đầu tiên) để bắt ý chính.

## 2. Ghi chép (Note-taking)
- Sử dụng sơ đồ tư duy (Mindmap).
- Ghi từ khóa, không ghi từng chữ.`
  },
  {
    id: 'lit-listen-2',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Nhận biết thái độ người nói',
    category: 'lit-listening',
    theory: `# Nhận biết thái độ người nói

## 1. Thông qua giọng điệu
- Giọng cao, nhanh: Hào hứng hoặc tức giận.
- Giọng trầm, chậm: Buồn bã, nghiêm túc.

## 2. Thông qua ngôn từ
- Chú ý các từ tình thái, từ cảm thán để đánh giá quan điểm của họ là khen ngợi hay phản đối.`
  },
  {
    id: 'lit-discuss-1',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Đặt câu hỏi trong thảo luận',
    category: 'lit-speaking',
    theory: `# Đặt câu hỏi thảo luận

## 1. Câu hỏi mở
- Dùng câu hỏi "Vì sao?", "Bạn nghĩ thế nào?" để khuyến khích ý kiến nhiều chiều.

## 2. Phản hồi lịch sự
- "Tôi đồng ý với bạn ở điểm này, nhưng..."
- "Ý kiến của bạn rất hay, tôi muốn bổ sung thêm..."`
  },
  {
    id: 'lit-discuss-2',
    subject: 'literature',
    topic: 'Nói và Nghe',
    title: 'Tranh luận và biện hộ quan điểm',
    category: 'lit-speaking',
    theory: `# Tranh luận học thuật

## 1. Xây dựng lập luận
- Quan điểm phải đi kèm với lý lẽ và bằng chứng cụ thể.

## 2. Kỹ năng biện hộ
- Tôn trọng đối phương.
- Sử dụng nhượng bộ chiến thuật: Công nhận một phần ý đúng của đối phương trước khi đưa ra lý lẽ phản biện của mình.`
  }
,
  {
    id: 'eng-listening-gap-fill',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Chiến lược nghe Gap-fill',
    category: 'eng-listening',
    theory: `# Nghe Gap-fill (Điền từ)

## 1. Trước khi nghe
- Đọc nhanh đoạn văn, dự đoán loại từ cần điền (Noun, Verb, Adjective).
- Chú ý số lượng từ giới hạn (vd: NO MORE THAN TWO WORDS).

## 2. Trong khi nghe
- Nghe kỹ các từ khóa xung quanh khoảng trống.
- Lưu ý các đuôi danh từ số nhiều (-s, -es) hoặc chia động từ (-ed).`
  },
  {
    id: 'eng-listening-true-false',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Chiến lược nghe True/False',
    category: 'eng-listening',
    theory: `# Nghe True/False

## 1. Dấu hiệu nhận biết
- Lưu ý các từ phủ định: not, barely, hardly, never.
- Lưu ý các từ định lượng: all, some, none, always, often.

## 2. Xử lý bẫy
- Bài nghe thường dùng từ đồng nghĩa (paraphrase) chứ không đọc y hệt câu hỏi.
- Tránh tự suy diễn, chỉ dựa vào thông tin có trong băng.`
  },
  {
    id: 'eng-listening-dialogue',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Nghe hội thoại',
    category: 'eng-listening',
    theory: `# Nghe hội thoại

## 1. Nắm bắt đối tượng
- Xác định ai đang nói (Nam hay Nữ) và mối quan hệ của họ (bạn bè, khách hàng - nhân viên).

## 2. Thái độ
- Nghe ngữ điệu để biết họ đồng ý hay phản đối.
- Câu hỏi đuôi (..., isn't it?) thường dùng để tìm sự đồng tình.`
  },
  {
    id: 'eng-listening-monologue',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Nghe độc thoại',
    category: 'eng-listening',
    theory: `# Nghe độc thoại

## 1. Cấu trúc bài
- Thường là một bài giảng, giới thiệu địa điểm hoặc hướng dẫn.
- Có phần mở đầu (chủ đề), thân bài (chi tiết), kết luận.

## 2. Note-taking
- Ghi chép nhanh từ khóa. Không cần viết câu hoàn chỉnh.`
  },
  {
    id: 'eng-listening-topics-1',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Nghe về môi trường, công nghệ',
    category: 'eng-listening',
    theory: `# Nghe chủ đề Môi trường & Công nghệ

## 1. Môi trường
- Các từ khóa: global warming, pollution, recycling, energy, endangered species.

## 2. Công nghệ
- Các từ khóa: internet, smart devices, artificial intelligence, software.`
  },
  {
    id: 'eng-listening-topics-2',
    subject: 'english',
    topic: 'Kỹ năng Nghe (Listening)',
    title: 'Nghe về di sản, lịch sử',
    category: 'eng-listening',
    theory: `# Nghe chủ đề Lịch sử & Di sản

## 1. Đặc điểm
- Chứa nhiều năm tháng, con số, tên riêng địa danh.
- Nghe kỹ các mốc thời gian: in the 19th century, during the war, recently.

## 2. Làng nghề (Craft villages)
- Từ khóa: pottery, silk, traditional, artisan, handicraft.`
  },
  {
    id: 'eng-speaking-discuss-1',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Hỏi đáp và thảo luận nhóm',
    category: 'eng-speaking',
    theory: `# Thảo luận nhóm

## 1. Cách bắt đầu
- What do you think about...?
- How do you feel about...?

## 2. Bày tỏ sự đồng ý / phản đối
- Đồng ý: I totally agree with you. That's a great point.
- Phản đối lịch sự: I see your point, but I think... / I'm afraid I have to disagree.`
  },
  {
    id: 'eng-speaking-discuss-2',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Đưa ra lời khuyên',
    category: 'eng-speaking',
    theory: `# Đưa ra lời khuyên

## 1. Mẫu câu thông dụng
- You should / ought to + V.
- If I were you, I would + V.
- Why don't you + V?
- Have you considered + V-ing?

## 2. Đưa ra lý do
- This is because...
- The reason is that...`
  },
  {
    id: 'eng-speaking-presentation-1',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Chuẩn bị bài thuyết trình',
    category: 'eng-speaking',
    theory: `# Thuyết trình ngắn

## 1. Mở bài (Introduction)
- Good morning everyone, today I'm going to talk about...

## 2. Chuyển ý (Signposting)
- First of all...
- Next, let's move on to...
- Finally, to sum up...`
  },
  {
    id: 'eng-speaking-presentation-2',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Thuyết trình về dự án',
    category: 'eng-speaking',
    theory: `# Thuyết trình dự án

## 1. Trình bày kế hoạch
- Dùng thì Tương lai: We are going to..., Our plan is to..., We will...

## 2. Tương tác với khán giả
- Does anyone have any questions?
- Thank you for listening.`
  },
  {
    id: 'eng-speaking-fluency-1',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Sự lưu loát (Fluency)',
    category: 'eng-speaking',
    theory: `# Sự lưu loát trong giao tiếp

## 1. Tránh ngắt quãng im lặng
- Sử dụng "Fillers" khi cần thời gian suy nghĩ: Well, you know, let me see, actually, to be honest...

## 2. Nối âm
- Nối phụ âm cuối với nguyên âm đầu của từ tiếp theo (VD: find out -> fin-dout).`
  },
  {
    id: 'eng-speaking-fluency-2',
    subject: 'english',
    topic: 'Kỹ năng Nói (Speaking)',
    title: 'Nhấn âm và ngữ điệu',
    category: 'eng-speaking',
    theory: `# Nhấn âm và Ngữ điệu (Intonation)

## 1. Nhấn từ mang ý nghĩa chính (Content words)
- Động từ chính, danh từ, tính từ.
- Các từ chức năng (to, of, and, the) đọc lướt nhanh.

## 2. Ngữ điệu
- Câu hỏi Yes/No: Lên giọng ở cuối câu.
- Câu hỏi Wh-: Xuống giọng ở cuối câu.`
  }
];
