-- Migration: Format Markdown LaTeX for Math Lessons and Questions
-- Date: 2026-08-14

BEGIN;

-- 1. Update Math Lessons Theory in ge10_lessons
UPDATE ge10_lessons SET theory = '# Tương giao giữa Parabol (P) và Đường thẳng (d)

Cho Parabol $(P): y = ax^2$ ($a \neq 0$) và đường thẳng $(d): y = mx + n$.

## 1. Thiết lập phương trình hoành độ giao điểm
Hoành độ giao điểm của $(P)$ và $(d)$ là nghiệm của phương trình:
$$ax^2 = mx + n \Leftrightarrow ax^2 - mx - n = 0$$
Đây là phương trình bậc hai có dạng $Ax^2 + Bx + C = 0$.

## 2. Biện luận số giao điểm dựa vào biệt thức Delta ($\Delta$)
- **$\Delta > 0$:** Phương trình có hai nghiệm phân biệt $\Rightarrow$ $(d)$ cắt $(P)$ tại hai điểm phân biệt.
- **$\Delta = 0$:** Phương trình có nghiệm kép $\Rightarrow$ $(d)$ tiếp xúc với $(P)$ (gọi là tiếp tuyến).
- **$\Delta < 0$:** Phương trình vô nghiệm $\Rightarrow$ $(d)$ không cắt $(P)$.' WHERE id = 'math-parabol';
UPDATE ge10_lessons SET theory = '# Hệ thức Vi-ét và Ứng dụng

Nếu phương trình bậc hai $ax^2 + bx + c = 0$ ($a \neq 0$) có hai nghiệm $x_1, x_2$, ta có:

## 1. Hệ thức Vi-ét
- **Tổng hai nghiệm:** $S = x_1 + x_2 = -\frac{b}{a}$
- **Tích hai nghiệm:** $P = x_1 \cdot x_2 = \frac{c}{a}$

## 2. Các biểu thức đối xứng thường gặp
Khi làm bài tập, cần biến đổi các biểu thức chứa $x_1, x_2$ về dạng chỉ chứa $S$ và $P$:
- $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = S^2 - 2P$
- $(x_1 - x_2)^2 = S^2 - 4P$
- $\frac{1}{x_1} + \frac{1}{x_2} = \frac{x_1+x_2}{x_1x_2} = \frac{S}{P}$' WHERE id = 'math-viet';
UPDATE ge10_lessons SET theory = '# Toán thực tế: Tài chính & Phần trăm

Các bài toán tài chính tuyển sinh 10 thường xoay quanh vấn đề tăng giá, giảm giá, thuế và tiền lãi gửi tiết kiệm.

## 1. Bài toán Tăng/Giảm giá
- Nếu giá ban đầu là $A$, sau khi tăng thêm $x\%$ thì giá mới là: $A \cdot (1 + x\%)$.
- Sau khi giảm giá $y\%$ thì giá mới là: $A \cdot (1 - y\%)$.
- Khuyến mãi nhiều đợt (ví dụ giảm $10\%$ đợt 1 rồi giảm tiếp $5\%$ đợt 2):
  $$\text{Giá cuối} = A \cdot (1 - 10\%) \cdot (1 - 5\%)$$

## 2. Công thức tính Thuế (VAT)
- Thuế VAT thường cộng thêm $8\%$ hoặc $10\%$ vào giá gốc:
  $$\text{Giá sau thuế} = \text{Giá trước thuế} \cdot (1 + \text{thuế VAT}\%)$$' WHERE id = 'math-finance';
UPDATE ge10_lessons SET theory = '# Tứ giác nội tiếp đường tròn

Một tứ giác có cả 4 đỉnh cùng nằm trên một đường tròn được gọi là tứ giác nội tiếp.

## 1. Các dấu hiệu chứng minh phổ biến nhất
- **Dấu hiệu 1:** Tứ giác có tổng hai góc đối bằng $180^\circ$. ($ \widehat{A} + \widehat{C} = 180^\circ$ hoặc $\widehat{B} + \widehat{D} = 180^\circ$).
- **Dấu hiệu 2:** Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.
- **Dấu hiệu 3:** Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới hai góc bằng nhau (ví dụ: $\widehat{DAC} = \widehat{DBC}$).
- **Dấu hiệu 4:** Tứ giác có điểm cách đều cả 4 đỉnh (ví dụ giao điểm hai đường chéo là tâm đường tròn ngoại tiếp).' WHERE id = 'math-plane-geom';
UPDATE ge10_lessons SET theory = '# Hình học không gian thực tế

Tập trung vào các công thức diện tích, thể tích của 3 hình cốt lõi lớp 9.

## 1. Hình Trụ (Cylinder)
- **Diện tích xung quanh:** $S_{xq} = 2\pi r h$
- **Thể tích:** $V = \pi r^2 h$

## 2. Hình Nón (Cone)
- **Diện tích xung quanh:** $S_{xq} = \pi r l$ ($l$ là đường sinh)
- **Thể tích:** $V = \frac{1}{3}\pi r^2 h$

## 3. Hình Cầu (Sphere)
- **Diện tích mặt cầu:** $S = 4\pi r^2$
- **Thể tích cầu:** $V = \frac{4}{3}\pi r^3$

> **Lưu ý đơn vị:** Đề thi toán thực tế thường cho số đo các đại lượng ở các đơn vị khác nhau (m, dm, cm, lít...). Luôn đổi về cùng một đơn vị chuẩn trước khi tính toán ($1\text{ dm}^3 = 1\text{ lít}$).' WHERE id = 'math-space-geom';
UPDATE ge10_lessons SET theory = '# Công thức nghiệm và nghiệm thu gọn

Phương pháp giải phương trình bậc hai một ẩn $ax^2 + bx + c = 0$ ($a \neq 0$).

## 1. Công thức nghiệm tổng quát (Delta $\Delta$)
- Tính biệt thức: $\Delta = b^2 - 4ac$.
- Các trường hợp nghiệm:
  - $\Delta > 0$: Phương trình có 2 nghiệm phân biệt:
    $$x_1 = \frac{-b + \sqrt{\Delta}}{2a}, \quad x_2 = \frac{-b - \sqrt{\Delta}}{2a}$$
  - $\Delta = 0$: Phương trình có nghiệm kép:
    $$x_1 = x_2 = -\frac{b}{2a}$$
  - $\Delta < 0$: Phương trình vô nghiệm.

## 2. Công thức nghiệm thu gọn (Delta phẩy $\Delta''$)
Sử dụng khi hệ số $b$ chẵn (đặt $b = 2b''$ hay $b'' = \frac{b}{2}$):
- Tính biệt thức thu gọn: $\Delta'' = b''^2 - ac$.
- Các trường hợp nghiệm:
  - $\Delta'' > 0$: Phương trình có 2 nghiệm phân biệt:
    $$x_1 = \frac{-b'' + \sqrt{\Delta''}}{a}, \quad x_2 = \frac{-b'' - \sqrt{\Delta''}}{a}$$
  - $\Delta'' = 0$: Phương trình có nghiệm kép:
    $$x_1 = x_2 = -\frac{b''}{a}$$
  - $\Delta'' < 0$: Phương trình vô nghiệm.' WHERE id = 'math-quadratic-formula';
UPDATE ge10_lessons SET theory = '# Biện luận số nghiệm của phương trình

Sử dụng biệt thức $\Delta$ hoặc $\Delta''$ để biện luận sự tồn tại và tính chất nghiệm của phương trình bậc hai chứa tham số $m$.

## 1. Điều kiện số nghiệm
Cho phương trình bậc hai $ax^2 + bx + c = 0$ ($a \neq 0$):
- **Để phương trình có nghiệm:** $\Delta \ge 0$.
- **Để phương trình có 2 nghiệm phân biệt:** $\Delta > 0$.
- **Để phương trình có nghiệm kép (hoặc tiếp xúc):** $\Delta = 0$.
- **Để phương trình vô nghiệm:** $\Delta < 0$.

## 2. Trường hợp hệ số $a$ chứa tham số
> **Lưu ý đặc biệt:** Nếu hệ số $a$ chứa tham số (ví dụ: $(m-1)x^2 + 2x + 3 = 0$), ta phải chia làm 2 trường hợp:
- **Trường hợp 1:** $a = 0$ (phương trình trở thành bậc nhất).
- **Trường hợp 2:** $a \neq 0$ (biện luận $\Delta$ bình thường).' WHERE id = 'math-quadratic-discriminant';
UPDATE ge10_lessons SET theory = '# Hệ thức Vi-ét nâng cao và Xét dấu

Vận dụng hệ thức Vi-ét để xét dấu nghiệm và giải các bài toán thực tế phức tạp.

## 1. Xét dấu hai nghiệm của phương trình bậc hai
Dựa vào tổng $S = x_1 + x_2 = -\frac{b}{a}$ và tích $P = x_1 \cdot x_2 = \frac{c}{a}$:
- **Hai nghiệm trái dấu:** $P < 0$ (không cần xét $\Delta$ vì khi $P < 0$ thì $ac < 0 \Rightarrow \Delta > 0$).
- **Hai nghiệm cùng dấu:** $\Delta \ge 0$ và $P > 0$.
- **Hai nghiệm cùng dương:** $\Delta \ge 0$, $P > 0$ và $S > 0$.
- **Hai nghiệm cùng âm:** $\Delta \ge 0$, $P > 0$ và $S < 0$.

## 2. Tìm hai số khi biết tổng và tích
Nếu hai số có tổng là $S$ và tích là $P$ (với $S^2 \ge 4P$) thì hai số đó là nghiệm của phương trình:
$$X^2 - SX + P = 0$$' WHERE id = 'math-viet-advanced';
UPDATE ge10_lessons SET theory = '# Tỉ số lượng giác của góc nhọn

Khái niệm tỉ số lượng giác ($\sin, \cos, \tan, \cot$) trong tam giác vuông.

## 1. Công thức định nghĩa
Cho tam giác vuông tại $A$ có góc nhọn $\alpha$:
- $\sin \alpha = \frac{\text{Cạnh đối}}{\text{Cạnh huyền}}$
- $\cos \alpha = \frac{\text{Cạnh kề}}{\text{Cạnh huyền}}$
- $\tan \alpha = \frac{\text{Cạnh đối}}{\text{Cạnh kề}}$
- $\cot \alpha = \frac{\text{Cạnh kề}}{\text{Cạnh đối}}$

> **Mẹo học thuộc:** *Sin đi học, Cos không hư, Tan đoàn kết, Cot kết đoàn.*

## 2. Các tỉ số đặc biệt và góc phụ nhau
- Nếu hai góc phụ nhau (tổng bằng $90^\circ$): $\sin \alpha = \cos(90^\circ - \alpha)$, $\tan \alpha = \cot(90^\circ - \alpha)$.
- Bảng góc đặc biệt:
  - $\sin 30^\circ = \cos 60^\circ = \frac{1}{2}$
  - $\sin 45^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}$
  - $\sin 60^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}$' WHERE id = 'math-trig-ratio';
UPDATE ge10_lessons SET theory = '# Giải tam giác vuông

Phương pháp tìm tất cả các cạnh và các góc chưa biết của một tam giác vuông.

## 1. Công thức tính cạnh
Trong tam giác vuông, mỗi cạnh góc vuông bằng:
- Cạnh huyền nhân với $\sin$ góc đối hoặc nhân với $\cos$ góc kề:
  $$b = a \cdot \sin B = a \cdot \cos C$$
- Cạnh góc vuông kia nhân với $\tan$ góc đối hoặc nhân với $\cot$ góc kề:
  $$b = c \cdot \tan B = c \cdot \cot C$$

## 2. Các bước giải tam giác vuông
- **Trường hợp biết hai cạnh:** Sử dụng định lý Pitago tính cạnh thứ ba, dùng tỉ số lượng giác để tính góc.
- **Trường hợp biết một cạnh và một góc nhọn:** Sử dụng tổng hai góc nhọn phụ nhau để tìm góc còn lại, dùng các công thức lượng giác trên để tìm hai cạnh còn lại.' WHERE id = 'math-trig-applied-1';
UPDATE ge10_lessons SET theory = '# Đo đạc thực tế dùng tỉ số lượng giác

Ứng dụng tỉ số lượng giác để giải quyết các bài toán đo chiều cao và khoảng cách thực tế (không thể đo trực tiếp).

## 1. Bài toán đo chiều cao vật thể (như tòa nhà, cây)
- Đứng cách gốc vật một khoảng $d$. Sử dụng giác kế đo góc ngẩng $\alpha$ nhìn lên đỉnh.
- Chiều cao vật thể $H$ được tính theo công thức:
  $$H = h + d \cdot \tan \alpha$$
  (với $h$ là chiều cao từ mắt người đo đến mặt đất).

## 2. Bài toán đo khoảng cách ngang (như con sông)
- Chọn một mốc đối diện bên kia sông. Đo khoảng cách kề dọc bờ sông là $a$.
- Đo góc nhìn $\beta$ từ đầu khoảng cách đến mốc bên kia sông.
- Chiều rộng con sông $W$ là:
  $$W = a \cdot \tan \beta$$' WHERE id = 'math-trig-applied-2';
UPDATE ge10_lessons SET theory = '# Góc ở tâm và Góc nội tiếp

Khái niệm và mối liên hệ giữa các loại góc liên quan đến đường tròn.

## 1. Góc ở tâm
- Là góc có đỉnh trùng với tâm đường tròn.
- Số đo góc ở tâm bằng số đo cung bị chắn: $\widehat{AOB} = \text{sđ}\overgroup{AB}$.

## 2. Góc nội tiếp
- Là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung.
- Số đo góc nội tiếp bằng nửa số đo cung bị chắn: $\widehat{ACB} = \frac{1}{2} \text{sđ}\overgroup{AB}$.

## 3. Các hệ quả quan trọng
- Trong một đường tròn, góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung: $\widehat{ACB} = \frac{1}{2}\widehat{AOB}$.
- Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\circ$).' WHERE id = 'math-circle-angle-1';
UPDATE ge10_lessons SET theory = '# Góc tạo bởi tia tiếp tuyến và dây cung

Định lý và hệ quả về góc tạo bởi tiếp tuyến và dây cung.

## 1. Định lý
Góc tạo bởi tia tiếp tuyến và dây cung đi qua tiếp điểm có số đo bằng nửa số đo của cung bị chắn.
- Ví dụ: $Ax$ là tiếp tuyến tại $A$, $AB$ là dây cung:
  $$\widehat{xAB} = \frac{1}{2} \text{sđ}\overgroup{AB}$$

## 2. Hệ quả quan trọng nhất (Thường dùng trong bài toán chứng minh)
Trong một đường tròn, góc tạo bởi tia tiếp tuyến và dây cung và góc nội tiếp cùng chắn một cung thì bằng nhau.
- Ví dụ: $C$ là một điểm trên đường tròn, thì:
  $$\widehat{xAB} = \widehat{ACB}$$' WHERE id = 'math-circle-angle-2';
UPDATE ge10_lessons SET theory = '# Tiếp tuyến đường tròn và Hai tiếp tuyến cắt nhau

Các định lý cơ bản về tiếp tuyến đường tròn và tính chất của hai tiếp tuyến cắt nhau.

## 1. Tính chất tiếp tuyến
Nếu một đường thẳng là tiếp tuyến của đường tròn thì nó vuông góc với bán kính đi qua tiếp điểm:
$$d \perp OB \text{ tại tiếp điểm } B$$

## 2. Tính chất hai tiếp tuyến cắt nhau
Nếu hai tiếp tuyến của đường tròn $(O)$ cắt nhau tại $A$ (với tiếp điểm là $B$ và $C$):
- $AB = AC$ (điểm cắt cách đều hai tiếp điểm).
- $AO$ là tia phân giác của góc $\widehat{BAC}$.
- $OA$ là tia phân giác của góc $\widehat{BOC}$.
- Giao điểm $AO$ và $BC$ là trung điểm của $BC$ và $AO \perp BC$.' WHERE id = 'math-circle-tangent-1';
UPDATE ge10_lessons SET theory = '# Chứng minh tiếp tuyến đường tròn

Phương pháp chứng minh một đường thẳng là tiếp tuyến của đường tròn.

## 1. Phương pháp chứng minh trực tiếp
Để chứng minh đường thẳng $d$ là tiếp tuyến của đường tròn $(O; R)$ tại tiếp điểm $H$:
- **Bước 1:** Chứng minh điểm $H$ thuộc đường tròn ($OH = R$).
- **Bước 2:** Chứng minh đường thẳng $d$ vuông góc với bán kính tại $H$ ($d \perp OH$).

## 2. Các dạng toán hay gặp tuyển sinh 10
- Chứng minh tam giác chứa tiếp tuyến vuông góc (dùng hệ thức lượng hoặc định lý Pitago đảo).
- Sử dụng tính chất góc nội tiếp chắn nửa đường tròn tạo góc $90^\circ$.
- Chứng minh hai góc bằng nhau để suy ra góc tiếp xúc bằng $90^\circ$.' WHERE id = 'math-circle-tangent-2';
UPDATE ge10_lessons SET theory = '# Giải bài toán bằng cách lập hệ phương trình

Quy trình giải bài toán bằng cách lập hệ hai phương trình bậc nhất hai ẩn.

## 1. Quy trình gồm 3 bước chuẩn
- **Bước 1: Lập hệ phương trình:**
  - Chọn hai ẩn số và đặt điều kiện thích hợp (đơn vị, khoảng giá trị).
  - Biểu diễn các đại lượng chưa biết theo ẩn và đại lượng đã biết.
  - Lập hai phương trình biểu thị mối quan hệ giữa các đại lượng.
- **Bước 2: Giải hệ phương trình:** Sử dụng cộng đại số hoặc thế.
- **Bước 3: Trả lời:** Kiểm tra nghiệm với điều kiện và kết luận.

## 2. Các dạng toán chuyển động và năng suất
- **Toán chuyển động:** $S = v \cdot t$. Chú ý dòng nước ngược/xuôi:
  $$v_{\text{xuôi}} = v_{\text{thực}} + v_{\text{nước}}, \quad v_{\text{ngược}} = v_{\text{thực}} - v_{\text{nước}}$$
- **Toán năng suất/Làm chung làm riêng:**
  - $\text{Năng suất} \times \text{Thời gian} = \text{Công việc}$.
  - Làm chung trong 1 ngày: $\frac{1}{x} + \frac{1}{y} = \frac{1}{t_{\text{chung}}}$.' WHERE id = 'math-word-problem-1';
UPDATE ge10_lessons SET theory = '# Giải bài toán thực tế bằng cách lập phương trình

Phương pháp lập phương trình bậc hai giải bài toán thực tế.

## 1. Quy trình thực hiện
- Tương tự như lập hệ phương trình, nhưng chỉ chọn 1 ẩn chính $x$.
- Biểu diễn các đại lượng còn lại theo $x$.
- Thiết lập phương trình bậc hai dạng $ax^2 + bx + c = 0$.
- Giải phương trình và loại nghiệm âm hoặc không thỏa mãn ý nghĩa vật lý.

## 2. Các dạng toán kinh tế và diện tích
- **Toán tăng giảm phần trăm:** Giá trị sau khi đổi = $\text{Giá trị đầu} \cdot (1 \pm r\%)$.
- **Toán diện tích/hình học:** Áp dụng công thức diện tích hình chữ nhật ($S = a \cdot b$), hình vuông để lập phương trình liên hệ chiều dài/chiều rộng.' WHERE id = 'math-word-problem-2';
UPDATE ge10_lessons SET theory = '# Phương trình tích

Phương pháp giải phương trình dạng tích $A(x) \cdot B(x) = 0$.

## 1. Công thức giải cơ bản
Phương trình $A(x) \cdot B(x) = 0$ tương đương với:
$$A(x) = 0 \quad \text{hoặc} \quad B(x) = 0$$

## 2. Các bước giải phương trình tích phức tạp
- **Bước 1:** Chuyển tất cả các hạng tử sang vế trái để vế phải bằng $0$.
- **Bước 2:** Phân tích đa thức ở vế trái thành nhân tử (dùng hằng đẳng thức, đặt nhân tử chung, hoặc nhóm hạng tử).
- **Bước 3:** Cho từng nhân tử bằng $0$ và giải tìm nghiệm.
- **Bước 4:** Kết luận tập nghiệm $S$.' WHERE id = 'math-eq-product';
UPDATE ge10_lessons SET theory = '# Phương trình chứa ẩn ở mẫu

Quy trình giải phương trình chứa ẩn ở mẫu thức để tránh nghiệm ngoại lai.

## 1. Quy trình gồm 4 bước chuẩn
- **Bước 1: Tìm điều kiện xác định (ĐKXĐ):** Tìm các giá trị của ẩn làm cho các mẫu thức khác $0$.
- **Bước 2: Quy đồng mẫu hai vế:** Tìm mẫu thức chung (MTC), quy đồng và khử mẫu hai vế.
- **Bước 3: Giải phương trình vừa nhận được.**
- **Bước 4: Đối chiếu điều kiện và kết luận:** Loại bỏ các giá trị không thỏa mãn ĐKXĐ.

## 2. Ví dụ thực hành
Giải phương trình: $\frac{x+2}{x-2} - \frac{1}{x} = 2$.
- ĐKXĐ: $x \neq 0$ và $x \neq 2$.
- MTC: $x(x-2)$.' WHERE id = 'math-eq-rational';
UPDATE ge10_lessons SET theory = '# Hệ phương trình - Phương pháp thế và cộng đại số

Khái niệm và cách giải hệ hai phương trình bậc nhất hai ẩn.

## 1. Phương pháp thế
- Từ một phương trình, biểu diễn một ẩn (ví dụ $x$) theo ẩn kia (ví dụ $y$).
- Thế biểu thức này vào phương trình còn lại để được phương trình một ẩn.
- Giải phương trình một ẩn tìm nghiệm, rồi thế ngược lại tìm ẩn còn lại.

## 2. Phương pháp cộng đại số
- Nhân hai vế của mỗi phương trình với số thích hợp sao cho hệ số của một ẩn nào đó bằng nhau hoặc đối nhau.
- Cộng hoặc trừ từng vế hai phương trình để triệt tiêu một ẩn.
- Giải phương trình một ẩn vừa thu được, rồi tìm ẩn còn lại.' WHERE id = 'math-system-eq-1';
UPDATE ge10_lessons SET theory = '# Hệ phương trình chứa tham số m

Biện luận số nghiệm của hệ hai phương trình bậc nhất hai ẩn chứa tham số $m$.

## 1. Điều kiện tồn tại nghiệm
Cho hệ phương trình:
$$\begin{cases} ax + by = c \\ a''x + b''y = c'' \end{cases}$$
- **Hệ có nghiệm duy nhất:** $\frac{a}{a''} \neq \frac{b}{b''}$.
- **Hệ vô nghiệm:** $\frac{a}{a''} = \frac{b}{b''} \neq \frac{c}{c''}$.
- **Hệ vô số nghiệm:** $\frac{a}{a''} = \frac{b}{b''} = \frac{c}{c''}$.

*(Lưu ý: Chỉ lập tỉ số khi các hệ số dưới mẫu khác 0. Nếu chứa tham số $m$ ở mẫu, cần xét các trường hợp $m$ làm mẫu bằng 0 riêng).*' WHERE id = 'math-system-eq-2';
UPDATE ge10_lessons SET theory = '# Hệ thức lượng về cạnh và đường cao

Các hệ thức cơ bản giữa cạnh và đường cao trong tam giác vuông.

## 1. Các hệ thức trong tam giác vuông
Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$ chia cạnh huyền $BC$ thành hai hình chiếu $HB$ và $HC$:
- Định lý Pitago: $a^2 = b^2 + c^2$
- Hệ thức 1 (Cạnh góc vuông và hình chiếu): $b^2 = a \cdot b''$ và $c^2 = a \cdot c''$
- Hệ thức 2 (Đường cao và hình chiếu): $h^2 = b'' \cdot c''$
- Hệ thức 3 (Đường cao và hai cạnh góc vuông): $a \cdot h = b \cdot c$
- Hệ thức 4 (Đường cao nghịch đảo): $\frac{1}{h^2} = \frac{1}{b^2} + \frac{1}{c^2}$' WHERE id = 'math-right-triangle-ratio';
UPDATE ge10_lessons SET theory = '# Các hệ thức lượng giác cơ bản

Các công thức liên hệ giữa các tỉ số lượng giác của một góc nhọn $\alpha$.

## 1. Hệ thức lượng giác cốt lõi
Với mọi góc nhọn $\alpha$, ta luôn có:
- $\sin^2 \alpha + \cos^2 \alpha = 1$
- $\tan \alpha = \frac{\sin \alpha}{\cos \alpha}$
- $\cot \alpha = \frac{\cos \alpha}{\sin \alpha}$
- $\tan \alpha \cdot \cot \alpha = 1$
- $1 + \tan^2 \alpha = \frac{1}{\cos^2 \alpha}$
- $1 + \cot^2 \alpha = \frac{1}{\sin^2 \alpha}$

## 2. Ứng dụng giải toán
- Tính các tỉ số lượng giác còn lại của góc $\alpha$ khi biết một tỉ số lượng giác.
- Chứng minh đẳng thức lượng giác, rút gọn biểu thức lượng giác đơn giản.' WHERE id = 'math-trig-relations';
UPDATE ge10_lessons SET theory = '# Khái niệm đường tròn và sự xác định

Định nghĩa đường tròn, các yếu tố liên quan và cách xác định một đường tròn.

## 1. Định nghĩa đường tròn
Đường tròn tâm $O$ bán kính $R$ (kí hiệu $(O; R)$) là hình gồm các điểm cách điểm $O$ một khoảng bằng $R$.
- Điểm $M$ nằm trong đường tròn $(O; R)$ khi $OM < R$.
- Điểm $M$ nằm trên đường tròn $(O; R)$ khi $OM = R$.
- Điểm $M$ nằm ngoài đường tròn $(O; R)$ khi $OM > R$.

## 2. Cách xác định đường tròn
- Một đường tròn được xác định khi biết tâm và bán kính, hoặc biết một đoạn thẳng là đường kính.
- Qua ba điểm không thẳng hàng, ta vẽ được một và chỉ một đường tròn (tâm là giao điểm ba đường trung trực tam giác).' WHERE id = 'math-circle-concept';
UPDATE ge10_lessons SET theory = '# Vị trí tương đối trong hình học đường tròn

Xác định mối quan hệ giữa đường thẳng và đường tròn, và giữa hai đường tròn.

## 1. Vị trí tương đối giữa đường thẳng và đường tròn
Gọi $d$ là khoảng cách từ tâm $O$ đến đường thẳng, $R$ là bán kính:
- **Cắt nhau:** $d < R$ (có 2 điểm chung).
- **Tiếp xúc nhau:** $d = R$ (có 1 điểm chung). Đường thẳng được gọi là tiếp tuyến.
- **Không giao nhau:** $d > R$ (không có điểm chung).

## 2. Vị trí tương đối giữa hai đường tròn $(O; R)$ và $(O''; r)$ (với $R \ge r$)
Gọi $d = OO''$ là khoảng cách giữa hai tâm:
- **Cắt nhau:** $R - r < d < R + r$ (có 2 điểm chung).
- **Tiếp xúc ngoài:** $d = R + r$ (có 1 điểm chung).
- **Tiếp xúc trong:** $d = R - r$ (có 1 điểm chung).
- **Ngoài nhau:** $d > R + r$ (không có điểm chung).
- **Đựng nhau:** $d < R - r$ (không có điểm chung).' WHERE id = 'math-circle-position';
UPDATE ge10_lessons SET theory = '# Độ dài và Diện tích hình tròn, hình quạt

Các công thức tính chu vi, diện tích đường tròn và hình quạt tròn.

## 1. Độ dài đường tròn và cung tròn
- **Chu vi đường tròn:** $C = 2\pi R = \pi d$ (với $d$ là đường kính).
- **Độ dài cung tròn $n^\circ$:**
  $$l = \frac{\pi R n}{180}$$

## 2. Diện tích hình tròn và hình quạt tròn
- **Diện tích hình tròn:** $S = \pi R^2$.
- **Diện tích hình quạt tròn bán kính $R$, cung $n^\circ$:**
  $$S_{q} = \frac{\pi R^2 n}{360} = \frac{l \cdot R}{2}$$

*(Lưu ý: Trong các bài thi tuyển sinh thực tế, ta thường dùng giá trị xấp xỉ $\pi \approx 3{,}14$).*' WHERE id = 'math-circle-length-area';
UPDATE ge10_lessons SET theory = '# Tứ giác nội tiếp đường tròn

Dấu hiệu nhận biết và ứng dụng của tứ giác nội tiếp trong các bài thi hình học tuyển sinh 10.

## 1. Định nghĩa
Tứ giác có bốn đỉnh nằm trên một đường tròn được gọi là tứ giác nội tiếp đường tròn.

## 2. Dấu hiệu nhận biết cốt lõi (Thường dùng để chứng minh)
- **Dấu hiệu 1:** Tứ giác có tổng hai góc đối diện bằng $180^\circ$.
- **Dấu hiệu 2:** Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.
- **Dấu hiệu 3:** Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau (ví dụ: $\widehat{ADB} = \widehat{ACB}$).
- **Dấu hiệu 4:** Tứ giác có bốn đỉnh cách đều một điểm xác định.' WHERE id = 'math-circle-polygon';
UPDATE ge10_lessons SET theory = '# Hình trụ - Bài toán thực tế

Phương pháp tính diện tích xung quanh, diện tích toàn phần và thể tích hình trụ trong thực tế.

## 1. Công thức cơ bản
Cho hình trụ có bán kính đáy $R$ và chiều cao $h$:
- **Diện tích xung quanh:** $S_{xq} = 2\pi R h$.
- **Diện tích toàn phần (gồm 2 đáy):** $S_{tp} = S_{xq} + 2S_{\text{đáy}} = 2\pi R h + 2\pi R^2$.
- **Thể tích:** $V = S_{\text{đáy}} \cdot h = \pi R^2 h$.

## 2. Ứng dụng thực tế và cách giải
- Đọc kỹ đề bài để phân biệt giữa bán kính $R$ và đường kính $d$ ($R = \frac{d}{2}$).
- Xác định hình trụ có hở nắp hay không để tính diện tích toàn phần chính xác (ví dụ lon nước ngọt hở 1 nắp thì $S_{tp} = S_{xq} + \pi R^2$).
- Đồng bộ đơn vị đo trước khi tính toán.' WHERE id = 'math-cylinder-detail';
UPDATE ge10_lessons SET theory = '# Hình nón và Hình nón cụt

Công thức tính toán diện tích, thể tích hình nón và hình nón cụt bám sát đề thi tuyển sinh.

## 1. Hình nón
Cho hình nón có bán kính đáy $R$, chiều cao $h$, và đường sinh $l$:
- Quan hệ: $l = \sqrt{R^2 + h^2}$ (định lý Pitago).
- **Diện tích xung quanh:** $S_{xq} = \pi R l$.
- **Diện tích toàn phần:** $S_{tp} = \pi R l + \pi R^2$.
- **Thể tích:** $V = \frac{1}{3}\pi R^2 h$.

## 2. Hình nón cụt
Cho hình nón cụt có hai bán kính đáy là $R_1, R_2$ ($R_1 > R_2$) và chiều cao $h$:
- **Thể tích:** $V = \frac{1}{3}\pi h (R_1^2 + R_2^2 + R_1 R_2)$.' WHERE id = 'math-cone-detail';
UPDATE ge10_lessons SET theory = '# Hình cầu và Bài toán kết hợp hình khối

Phương pháp tính toán diện tích và thể tích hình cầu, cùng các bài toán liên kết nhiều hình khối.

## 1. Công thức hình cầu
Cho hình cầu có bán kính $R$:
- **Diện tích mặt cầu:** $S = 4\pi R^2 = \pi d^2$ (với $d = 2R$).
- **Thể tích hình cầu:** $V = \frac{4}{3}\pi R^3$.

## 2. Bài toán kết hợp hình khối thực tế
- Thường gặp dạng: đồ chơi có một đầu là hình bán cầu (nửa hình cầu), thân là hình trụ hoặc hình nón.
- **Phương pháp giải:** Chia nhỏ vật thể thành các khối hình học cơ bản, tính diện tích hoặc thể tích từng phần rồi cộng lại.' WHERE id = 'math-cone-sphere-combined';
UPDATE ge10_lessons SET theory = '# Bài toán thực tế bậc hai

Cách lập phương trình bậc hai một ẩn từ các bài toán thực tế như kinh tế, hình học, chuyển động.

## 1. Quy trình giải
- **Bước 1: Chọn ẩn:** Chọn ẩn số trực tiếp hoặc gián tiếp, đặt điều kiện thích hợp cho ẩn (ví dụ kích thước phải dương, vận tốc lớn hơn 0).
- **Bước 2: Lập phương trình:** Biểu diễn các đại lượng chưa biết theo ẩn và lập mối quan hệ để có phương trình bậc hai $ax^2 + bx + c = 0$.
- **Bước 3: Giải phương trình và kết luận:** Giải phương trình, đối chiếu điều kiện để chọn nghiệm phù hợp.

## 2. Các dạng toán phổ biến
- **Diện tích hình học:** Tăng/giảm chiều dài, rộng của vườn/sân.
- **Toán kinh tế:** Tăng giá bán ảnh hưởng đến số lượng sản phẩm bán ra.' WHERE id = 'math-quadratic-applied';
UPDATE ge10_lessons SET theory = '# Ứng dụng hệ thức lượng nâng cao

Các phương pháp kết hợp hệ thức lượng, định lý Pitago để giải các bài toán tính toán hình học phức tạp.

## 1. Các bước giải bài toán tính toán
- **Bước 1:** Vẽ hình đúng tỉ lệ và ký hiệu các góc vuông, đường cao.
- **Bước 2:** Xác định tam giác vuông chứa các đại lượng đã biết và đại lượng cần tìm.
- **Bước 3:** Lựa chọn hệ thức phù hợp. Nếu chưa đủ dữ kiện, đặt ẩn phụ ($x$) cho một cạnh hình chiếu để thiết lập phương trình liên hệ.

## 2. Mẹo thi cử
- Luôn tìm các tam giác đồng dạng nếu không trực tiếp dùng được hệ thức lượng trong một tam giác vuông duy nhất.' WHERE id = 'math-right-triangle-ratio-2';

-- 2. Update Math Questions in ge10_custom_questions
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g6';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g6';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g6';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g6';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g6';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g6';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g6';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g6';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g6';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g6';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g6';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g6';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g6';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g6';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g6';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g6';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g6';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g6';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g6';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g6';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g6';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g6';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g7';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g7';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g7';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g7';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g7';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g7';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g7';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g7';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g7';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g7';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g7';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g7';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g7';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g7';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g7';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g7';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g7';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g7';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g7';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g7';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g7';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g7';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g8';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g8';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g8';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g8';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g8';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g8';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g8';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g8';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g8';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g8';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g8';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g8';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g8';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g8';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g8';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g8';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g8';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g8';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g8';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g8';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g8';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g8';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g10';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g10';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g10';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g10';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g10';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g10';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g10';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g10';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g10';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g10';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g10';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g10';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g10';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g10';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g10';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g10';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g10';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g10';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g10';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g10';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g10';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g10';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g11';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g11';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g11';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g11';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g11';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g11';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g11';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g11';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g11';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g11';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g11';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g11';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g11';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g11';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g11';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g11';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g11';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g11';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g11';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g11';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g11';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g11';
UPDATE ge10_custom_questions SET prompt = 'Tìm giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', options = '{"$(3; 9)$ và $(-1; 1)$","$(3; 9)$ và $(1; 1)$","$(-3; 9)$ và $(-1; 1)$","$(3; 6)$ và $(-1; 2)$"}', correct_answer = '{"$(3; 9)$ và $(-1; 1)$"}', explanation = 'Phương trình hoành độ giao điểm: $x^2 = 2x + 3 \Leftrightarrow x^2 - 2x - 3 = 0$.

Vì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x = -1$ và $x = 3$.

- Với $x = -1 \Rightarrow y = 1$.
- Với $x = 3 \Rightarrow y = 9$.

Vậy hai giao điểm là $(3; 9)$ và $(-1; 1)$.' WHERE id = 'm-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ . Tính giá trị biểu thức $A = x_1^2 + x_2^2$.', options = '{"$A = 19$","$A = 22$","$A = 25$","$A = 16$"}', correct_answer = '{"$A = 19$"}', explanation = 'Theo hệ thức Vi-ét ta có: $S =  x_1 + x_2  = 5$ và $P =  x_1 \cdot x_2  = 3$.

Biểu thức:
 A = x_1^2 + x_2^2 = ( x_1 + x_2 )^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \cdot 3 = 25 - 6 = 19' WHERE id = 'm-2-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng niêm yết giá bán một chiếc balo là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là $10\%$. Sau đó đợt 2 cửa hàng lại giảm tiếp $5\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?', options = '{"$256.500$ đồng","$255.000$ đồng","$270.000$ đồng","$245.000$ đồng"}', correct_answer = '{"$256.500$ đồng"}', explanation = '- Giá bán sau đợt giảm thứ nhất:
   300.000 \cdot (1 - 0{,}10) = 270.000\text{ đồng} 
- Giá bán sau đợt giảm thứ hai:
   270.000 \cdot (1 - 0{,}05) = 256.500\text{ đồng}' WHERE id = 'm-3-g12';
UPDATE ge10_custom_questions SET prompt = 'Một lon nước ngọt hình trụ có bán kính đáy $r = 3\text{ cm}$ và chiều cao $h = 12\text{ cm}$. Tính thể tích vỏ lon nước ngọt này (lấy $\pi \approx 3{,}14$).', options = '{"$339{,}12\\text{ cm}^3$","$113{,}04\\text{ cm}^3$","$108{,}00\\text{ cm}^3$","$300{,}00\\text{ cm}^3$"}', correct_answer = '{"$339{,}12\\text{ cm}^3$"}', explanation = 'Thể tích hình trụ:
 V = \pi r^2 h 
Thay số:
 V \approx 3{,}14 \cdot 3^2 \cdot 12 = 3{,}14 \cdot 9 \cdot 12 = 339{,}12\text{ cm}^3' WHERE id = 'm-4-g12';
UPDATE ge10_custom_questions SET prompt = 'Tìm giá trị tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.', options = '{"$m < 2$","$m > 2$","$m \\le 2$","$m < 1$"}', correct_answer = '{"$m < 2$"}', explanation = 'Phương trình có hai nghiệm phân biệt khi $\Delta'' > 0$.

Ta có:
 \Delta'' = (-1)^2 - 1 \cdot (m - 1) = 1 - m + 1 = 2 - m 
Để phương trình có hai nghiệm phân biệt thì:
 2 - m > 0 \Leftrightarrow m < 2' WHERE id = 'm-5-g12';
UPDATE ge10_custom_questions SET prompt = 'Hai trường A và B có tổng cộng $500$ học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là $90\%$, trường B là $85\%$. Tổng số học sinh dự thi của hai trường là $560$ học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?', options = '{"$480$ học sinh","$320$ học sinh","$240$ học sinh","$80$ học sinh"}', correct_answer = '{"$480$ học sinh"}', explanation = 'Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($x, y > 0$).

Ta có hệ phương trình:
 \begin{cases} x + y = 560 \\ 0{,}90x + 0{,}85y = 500 \end{cases} 
Từ phương trình (1) suy ra $y = 560 - x$. Thế vào phương trình (2):
 0{,}90x + 0{,}85(560 - x) = 500 \Leftrightarrow 0{,}05x + 476 = 500 \Leftrightarrow 0{,}05x = 24 \Leftrightarrow x = 480 
Vậy trường A có $480$ học sinh dự thi.' WHERE id = 'm-6-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài tiếp tuyến $AB$ theo $R$.', options = '{"$R\\sqrt{3}$","$R\\sqrt{2}$","$R$","$1{,}5R$"}', correct_answer = '{"$R\\sqrt{3}$"}', explanation = 'Vì $AB$ là tiếp tuyến của $(O)$ tại $B$ nên $\Delta OAB$ vuông tại $B$.

Áp dụng định lý Pitago:
 OA^2 = OB^2 + AB^2 \Leftrightarrow (2R)^2 = R^2 + AB^2 \Leftrightarrow 4R^2 = R^2 + AB^2 \Leftrightarrow AB^2 = 3R^2 \Leftrightarrow AB = R\sqrt{3}' WHERE id = 'm-7-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).

**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức $x_1^2 + x_2^2 -  x_1 x_2  = 5$.', options = NULL, correct_answer = '{"m > 1","m = (-3 + \\sqrt{41}) / 2"}', explanation = '**a)** Ta có $\Delta'' = (-m)^2 - 1 \cdot (m^2 - m + 1) = m - 1$.
Điều kiện có hai nghiệm phân biệt là $\Delta'' > 0 \Leftrightarrow m > 1$.

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m$, $P =  x_1 \cdot x_2  = m^2 - m + 1$.
Từ $x_1^2 + x_2^2 -  x_1 x_2  = ( x_1 + x_2 )^2 - 3x_1x_2 = 5$, ta có:
 (2m)^2 - 3(m^2 - m + 1) = 5 \Leftrightarrow m^2 + 3m - 8 = 0 
Giải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \frac{-3 \pm \sqrt{41}}{2}$.
Đối chiếu điều kiện $m > 1$, ta chọn $m = \frac{-3 + \sqrt{41}}{2}$.' WHERE id = 'hcmc-math-2026-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \cdot C + b$. Biết rằng nước đóng băng ở $0^\circ\text{C}$ tương ứng với $32^\circ\text{F}$ và sôi ở $100^\circ\text{C}$ tương ứng với $212^\circ\text{F}$.

**a)** Xác định các hệ số $a$ và $b$.

**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\circ\text{C}$ thì tương ứng là bao nhiêu độ F?', options = NULL, correct_answer = '{"a = 1,8","b = 32","F = 98,6^\\circ\\text{F}"}', explanation = '**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.
Thế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \Leftrightarrow 100a = 180 \Leftrightarrow a = 1{,}8$.

**b)** Với $C = 37$, ta có $F = 1{,}8 \cdot 37 + 32 = 98{,}6^\circ\text{F}$.' WHERE id = 'hcmc-math-2026-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\%$ so với tuần ngay trước đó.

**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).

**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\text{ km}$?', options = NULL, correct_answer = '{"S_n = 40 \\cdot (1{,}05)^{n-1}","n = 6"}', explanation = '**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.
Công thức số hạng tổng quát:
 S_n = 40 \cdot (1{,}05)^{n-1}\text{ (km)} 

**b)** Bất đẳng thức: $40 \cdot (1{,}05)^{n-1} > 50 \Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.
Thử các giá trị:
- $n = 5 \Rightarrow (1{,}05)^4 \approx 1{,}2155 < 1{,}25$
- $n = 6 \Rightarrow (1{,}05)^5 \approx 1{,}2763 > 1{,}25$
Vậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\text{ km}$.' WHERE id = 'hcmc-math-2026-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?', options = NULL, correct_answer = '{"500.000 đồng"}', explanation = 'Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).
- Giá sau đợt giảm thứ nhất: $x \cdot (1 - 0{,}10) = 0{,}9x$.
- Giá sau đợt giảm thứ hai: $0{,}9x \cdot (1 - 0{,}05) = 0{,}855x$.

Theo đề bài ta có phương trình:
 0{,}855x = 427.500 \Leftrightarrow x = \frac{427.500}{0{,}855} = 500.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q5-g12';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\text{ cm}$, chiều cao mực nước hiện tại là $10\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"R \\approx 1{,}5\\text{ cm}"}', explanation = 'Bán kính đáy ly: $r = \frac{6}{2} = 3\text{ cm}$.
Chiều cao phần nước dâng thêm: $h_{\text{dâng}} = 12 - 10 = 2\text{ cm}$.

Thể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):
 V_{\text{dâng}} = \pi r^2 h_{\text{dâng}} \approx 3{,}14 \cdot 3^2 \cdot 2 = 56{,}52\text{ cm}^3 

Thể tích mỗi viên bi hình cầu:
 V_{\text{cầu}} = \frac{56{,}52}{4} = 14{,}13\text{ cm}^3 

Áp dụng công thức thể tích hình cầu $V = \frac{4}{3}\pi R^3$:
 \frac{4}{3} \cdot 3{,}14 \cdot R^3 = 14{,}13 \Leftrightarrow R^3 \approx 3{,}375 \Leftrightarrow R \approx 1{,}5\text{ cm}' WHERE id = 'hcmc-math-2026-q6-g12';
UPDATE ge10_custom_questions SET prompt = 'Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.', options = NULL, correct_answer = '{"20.000 đồng"}', explanation = 'Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).
- Số tiền An đem theo ban đầu: $10y$.
- Thực tế khi mua $11$ quyển tập gồm:
  + $5$ quyển đầu với giá niêm yết: $5y$.
  + $6$ quyển sau được giảm $20\%$: $6 \cdot (1 - 0{,}20)y = 4{,}8y$.
  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.

Vì An còn dư $4.000$ đồng nên ta có phương trình:
 10y - 9{,}8y = 4.000 \Leftrightarrow 0{,}2y = 4.000 \Leftrightarrow y = 20.000\text{ đồng}' WHERE id = 'hcmc-math-2026-q7-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.

**a)** Chứng minh: $\Delta ABC$ vuông tại $C$ và $MA^2 = MB \cdot MC$.

**b)** Vẽ đường cao $CH$ của $\Delta ABC$ ($H \in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.

**c)** Chứng minh: $MB \cdot MC = MD \cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.', options = NULL, correct_answer = '{"ABC vuông tại C","MA^2 = MB \\cdot MC","AHCE nội tiếp","BC là tiếp tuyến của (ACD)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:
 MA^2 = MB \cdot MC 

**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\widehat{MEA} = 90^\circ$, dẫn tới tứ giác $AHCE$ có $\widehat{AHC} = \widehat{AEC} = 90^\circ$ nên nội tiếp đường tròn đường kính $AC$.

**c)** Khai thác tam giác đồng dạng $\Delta MBD \sim \Delta MHC$ suy ra $MB \cdot MC = MD \cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\Delta ACD$.' WHERE id = 'hcmc-math-2026-q8-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho Parabol $(P): y = \frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.

**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.

**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.', options = NULL, correct_answer = '{"y = \\frac{1}{2}x^2","y = x + 4","(4; 8)","(-2; 2)","x^2 - 2x - 8 = 0"}', explanation = '**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.

**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:
 \frac{1}{2}x^2 = x + 4 \Leftrightarrow x^2 - 2x - 8 = 0 
Giải phương trình bậc hai thu được hai nghiệm:
- $x_1 = 4 \Rightarrow y_1 = 8$.
- $x_2 = -2 \Rightarrow y_2 = 2$.

Vậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.' WHERE id = 'hcmc-math-2025-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm  $x_1, x_2$ .

Không giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.', options = NULL, correct_answer = '{"10"}', explanation = 'Theo hệ thức Vi-ét ta có:
 S =  x_1 + x_2  = 5, \quad P =  x_1 \cdot x_2  = 3 
Biến đổi biểu thức $A$:
 A = x_1^2 + x_2^2 - 3x_1x_2 = ( x_1 + x_2 )^2 - 5x_1x_2 = S^2 - 5P 
Thay số:
 A = 5^2 - 5 \cdot 3 = 25 - 15 = 10' WHERE id = 'hcmc-math-2025-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng thời trang giảm giá $20\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?', options = NULL, correct_answer = '{"608.000 đồng"}', explanation = '- Giá bán sau khi giảm giá $20\%$:
   800.000 \cdot (1 - 0{,}20) = 640.000\text{ đồng} 
- Giá bán thực tế khi giảm thêm $5\%$ thẻ thành viên:
   640.000 \cdot (1 - 0{,}05) = 608.000\text{ đồng}' WHERE id = 'hcmc-math-2025-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô dạng hình trụ có bán kính đáy $r = 15\text{ cm}$ và chiều cao $h = 40\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\text{ m}$, rộng $1\text{ m}$ và cao $0{,}6\text{ m}$? (Lấy $\pi \approx 3{,}14$).', options = NULL, correct_answer = '{"26 xô"}', explanation = 'Đổi đơn vị về $\text{dm}$:
- Xô hình trụ: $r = 1{,}5\text{ dm}, h = 4\text{ dm}$.
   V_{\text{xô}} = \pi r^2 h \approx 3{,}14 \cdot (1{,}5)^2 \cdot 4 = 28{,}26\text{ dm}^3 = 28{,}26\text{ lít} 
- Bể hình hộp chữ nhật: $a = 12\text{ dm}, b = 10\text{ dm}, c = 6\text{ dm}$.
   V_{\text{bể}} = 12 \cdot 10 \cdot 6 = 720\text{ dm}^3 = 720\text{ lít} 
- Số xô nước cần thiết:
   \frac{720}{28{,}26} \approx 25{,}48 
Vì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.' WHERE id = 'hcmc-math-2025-q6-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.

**a)** Chứng minh $\Delta ABC$ vuông và $AD^2 = DC \cdot DB$.

**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.', options = NULL, correct_answer = '{"tam giác ABC vuông tại C","AD^2 = DC \\cdot DB","tứ giác AHOB nội tiếp","MC là tiếp tuyến của (O)"}', explanation = '**a)** $\widehat{ACB} = 90^\circ$ (góc nội tiếp chắn nửa đường tròn) $\Rightarrow \Delta ABC$ vuông tại $C$.
Trong $\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:
 AD^2 = DC \cdot DB 

**b)** Vì $MH \perp BC$ tại $H$ và $MA \perp AB$ tại $A$ nên $\widehat{MHB} = \widehat{MAB} = 90^\circ$, suy ra tứ giác $AHOB$ nội tiếp.
Chứng minh $\Delta MAO = \Delta MCO$ (c-g-c) $\Rightarrow \widehat{MCO} = \widehat{MAO} = 90^\circ \Rightarrow MC \perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.' WHERE id = 'hcmc-math-2025-q8-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 4x - 3 = 0 có hai nghiệm phân biệt $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
A = $x_1$^2 / $x_2$ + $x_2$^2 / $x_1$', options = NULL, correct_answer = '{"-100/3","-33.33"}', explanation = 'Theo định lý Vi-ét: S = $x_1$ + $x_2$ = 4, P =  x_1$ \cdot $x_2  = -3.
Biến đổi biểu thức: A = ($x_1$^3 + $x_2$^3) / ( x_1$ \cdot $x_2 ) = [$S \cdot (S^2$ - 3P)] / P = [$4 \cdot (16$ - $3 \cdot ($-3))] / (-3) = -100/3.' WHERE id = 'm-14-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).

**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$  với mọi giá trị của $m$.

**b)** Tìm $m$ để hai nghiệm  $x_1, x_2$  thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.', options = NULL, correct_answer = '{"m = 1","m = -3","\\Delta > 0"}', explanation = '**a)** Ta có: $\Delta'' = (-m)^2 - 1 \cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.
Vì $\Delta'' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt  $x_1, x_2$ .

**b)** Theo định lý Vi-ét: $S =  x_1 + x_2  = 2m, P =  x_1 \cdot x_2  = 2m - 3$.
Ta có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.
Theo đề bài: $4m^2 - 4m + 6 = 10 \Leftrightarrow 4m^2 - 4m - 4 = 0 \Leftrightarrow m^2 - m - 1 = 0$.
Giải phương trình bậc hai theo $m$ thu được: $m = \frac{1 \pm \sqrt{5}}{2}$.' WHERE id = 'm-15-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: 3x^2 - 5x - 1 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy lập một phương trình bậc hai một ẩn y có hai nghiệm $y_1$, $y_2$ sao cho:
$y_1$ = $x_1$ + 1/$x_2$ và $y_2$ = $x_2$ + 1/$x_1$', options = NULL, correct_answer = '{"3y^2 + 10y - 4 = 0","y^2 + 10/$3 \\cdot y$ - 4/3 = 0"}', explanation = 'Theo Vi-ét: $x_1$ + $x_2$ = 5/3,  x_1$ \cdot $x_2  = -1/3.
Tính tổng S_y = $y_1$ + $y_2$ = ($x_1$ + $x_2$) + ($x_1$ + $x_2$)/( x_1$ \cdot $x_2 ) = 5/3 + (5/3)/(-1/3) = 5/3 - 5 = -10/3.
Tính tích P_y =  y_1$ \cdot $y_2  =  x_1$ \cdot $x_2  + 2 + 1/( x_1$ \cdot $x_2 ) = -1/3 + 2 - 3 = -4/3.
Phương trình lập được: y^2 + 10/$3 \cdot y$ - 4/3 = 0 $\Leftrightarrow$ 3y^2 + 10y - 4 = 0.' WHERE id = 'm-16-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt  $x_1, x_2$  sao cho biểu thức sau đạt giá trị cực trị (đạt đỉnh parabol):
 B =  x_1 x_2  - ( x_1 + x_2 )', options = NULL, correct_answer = '{"m = 1"}', explanation = 'Điều kiện phương trình có hai nghiệm phân biệt:
 \Delta'' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \Leftrightarrow m < \frac{5}{2} 

Theo định lý Vi-ét:
 S =  x_1 + x_2  = 2(m - 1), \quad P =  x_1 \cdot x_2  = m^2 - 4 
Biến đổi biểu thức $B$:
 B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3 
Vì $(m - 1)^2 \ge 0$ nên $B \ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.' WHERE id = 'm-17-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình: x^2 - 3x - 5 = 0 có hai nghiệm $x_1$, $x_2$. Không giải phương trình, hãy tính giá trị của biểu thức:
C = ($x_1$^2 - 3x1 + 1)($x_2$^2 - 3x2 + 1)', options = NULL, correct_answer = '{"36"}', explanation = 'Vì $x_1$, $x_2$ là nghiệm của phương trình nên $x_1$^2 - 3x1 = 5 và $x_2$^2 - 3x2 = 5.
Thay vào biểu thức C: C = (5 + 1)(5 + 1) = $6 \cdot 6$ = 36.' WHERE id = 'm-18-g12';
UPDATE ge10_custom_questions SET prompt = 'Mối liên hệ giữa nhiệt độ F (độ Fahrenheit) và nhiệt độ C (độ Celsius) được cho bởi công thức hàm số bậc nhất: F = aC + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và nước sôi ở 100°C tương ứng với 212°F

**a)** Xác định các hệ số a và b

**b)** Nếu nhiệt độ cơ thể người bình thường là 37°C thì tương ứng bao nhiêu độ F?', options = NULL, correct_answer = '{"$a = 1.8$","$b = 32$","98.6"}', explanation = '**a)** Thế C = 0, F = 32 $\Rightarrow$ b = 32. Thế C = 100, F = 212 $\Rightarrow$ 212 = 100a + 32 $\Rightarrow$ a = 1.8. Hàm số: F = 1.8C + 32

**b)** Thế C = 37 $\Rightarrow$ F = 1.$8 \cdot 37$ + 32 = 98.6°F.' WHERE id = 'm-19-g12';
UPDATE ge10_custom_questions SET prompt = 'Một công ty viễn thông đưa ra hai gói cước mạng Internet như sau:
- Gói A: Chi phí đăng ký ban đầu là 300.000 đồng và phí duy trì hàng tháng là 120.000 đồng.
- Gói B: Không tốn phí đăng ký ban đầu nhưng phí duy trì hàng tháng là 150.000 đồng

**a)** Viết công thức tính tổng số tiền y (đồng) khách hàng phải trả sau x (tháng) sử dụng đối với từng gói cước

**b)** Nếu một hộ gia đình có nhu cầu sử dụng Internet trong vòng 2 năm (24 tháng) thì nên chọn gói cước nào để tiết kiệm chi phí hơn?', options = NULL, correct_answer = '{"y = 120.000x + 300.000","y = 150.000x","Gói A"}', explanation = '**a)** Gói A: y = 120.000x + 300.000. Gói B: y = 150.000x

**b)** Với x = 24 tháng: Gói A tốn 120.$000 \cdot 24$ + 300.000 = 3.180.000 đồng. Gói B tốn 150.$000 \cdot 24$ = 3.600.000 đồng. Vậy chọn gói A để tiết kiệm chi phí hơn.' WHERE id = 'm-20-g12';
UPDATE ge10_custom_questions SET prompt = 'Càng lên cao áp suất khí quyển càng giảm. Mối liên hệ giữa áp suất khí quyển y (mmHg) và độ cao x (m) so với mực nước biển là một hàm số bậc nhất y = ax + b. Biết tại mực nước biển (độ cao 0 m) áp suất là 760 mmHg, và tại độ cao 1000 m áp suất là 670 mmHg

**a)** Xác định hàm số y theo x

**b)** Thành phố Đà Lạt có độ cao trung bình khoảng 1500 m so với mực nước biển. Hãy tính áp suất khí quyển tại đây.', options = NULL, correct_answer = '{"y = -0.09x + 760","625"}', explanation = '**a)** Tại x = 0, y = 760 $\Rightarrow$ b = 760. Tại x = 1000, y = 670 $\Rightarrow$ 670 = 1000a + 760 $\Rightarrow$ a = -0.09. Hàm số: y = -0.09x + 760

**b)** Thế x = 1500 $\Rightarrow$ y = -0.$09 \cdot 1500$ + 760 = 625 mmHg.' WHERE id = 'm-21-g12';
UPDATE ge10_custom_questions SET prompt = 'Một xí nghiệp may mặc cần thanh lý một lô hàng gồm 5.000 bộ quần áo. Kể từ ngày bắt đầu thanh lý, mỗi ngày xí nghiệp bán được 150 bộ quần áo

**a)** Thiết lập hàm số biểu diễn số bộ quần áo còn lại y sau x ngày thanh lý

**b)** Hỏi sau bao nhiêu ngày thì xí nghiệp chỉ còn lại 1.400 bộ quần áo? Sau bao lâu thì thanh lý hết hoàn toàn lô hàng?', options = NULL, correct_answer = '{"y = 5000 - 150x","24","34"}', explanation = '**a)** Số áo còn lại bằng lượng ban đầu trừ lượng đã bán: y = 5000 - 150x

**b)** Còn lại 1400 bộ: 1400 = 5000 - 150x $\Leftrightarrow$ 150x = 3600 $\Leftrightarrow$ x = 24 ngày. Bán hết sạch: y = 0 $\Leftrightarrow$ 5000 - 150x = 0 $\Leftrightarrow$ x = 33.33 ngày. Do x là số ngày nguyên, ta làm tròn lên 34 ngày để thanh lý hoàn toàn.' WHERE id = 'm-22-g12';
UPDATE ge10_custom_questions SET prompt = 'Lực đàn hồi $F\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\Delta l\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \cdot \Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\text{ N}$ thì lò xo dãn ra $1{,}5\text{ cm}$.

**a)** Tìm hệ số đàn hồi $k$ của lò xo.

**b)** Nếu muốn lò xo dãn ra $4{,}5\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?', options = NULL, correct_answer = '{"k = \\frac{4}{3}","6"}', explanation = '**a)** Thế $F = 2\text{ N}$ và $\Delta l = 1{,}5\text{ cm}$ vào công thức:
 2 = k \cdot 1{,}5 \Leftrightarrow k = \frac{2}{1{,}5} = \frac{4}{3}\text{ (N/cm)} 

**b)** Với $\Delta l = 4{,}5\text{ cm}$, lực đàn hồi cần thiết là:
 F = \frac{4}{3} \cdot 4{,}5 = 6\text{ N}' WHERE id = 'm-23-g12';
UPDATE ge10_custom_questions SET prompt = 'Vào đầu năm học, một cửa hàng sách giảm giá 10% cho tất cả các loại sách văn học. Bạn Bình mua 5 quyển sách văn học cùng loại và một chiếc ba lô có giá niêm yết 350.000 đồng (ba lô không được giảm giá). Tổng số tiền Bình phải trả cho cửa hàng là 575.000 đồng. Tính giá niêm yết ban đầu của một quyển sách văn học đó.', options = NULL, correct_answer = '{"50.000 đồng","50000"}', explanation = 'Số tiền Bình mua 5 quyển sách sau giảm giá: 575.000 - 350.000 = 225.000 đồng.
Giá tiền 1 quyển sách sau giảm giá: 225.000 / 5 = 45.000 đồng.
Giá niêm yết ban đầu của 1 quyển sách: 45.000 / (1 - 0.1) = 50.000 đồng.' WHERE id = 'm-24-g12';
UPDATE ge10_custom_questions SET prompt = 'Một siêu thị điện máy thực hiện chương trình khuyến mãi: Tivi mẫu A giảm giá 15% so với giá niêm yết. Người mua chiếc tivi thứ hai cùng loại sẽ được giảm thêm 10% trên giá đã giảm của chiếc thứ nhất. Gia đình ông Bình đã mua 2 chiếc tivi mẫu A và phải trả tổng số tiền là 26.350.000 đồng. Hỏi giá niêm yết ban đầu của một chiếc tivi mẫu A là bao nhiêu? (Lưu ý: Giảm thêm 10% ở đây tương ứng mức giảm 25% so với giá gốc cho chiếc thứ hai).', options = NULL, correct_answer = '{"17.000.000 đồng","17000000"}', explanation = 'Gọi x là giá niêm yết ban đầu. Chiếc tivi thứ nhất có giá 0.85x. Chiếc tivi thứ hai có giá (0.85 - 0.1)x = 0.70x (hoặc 15% + 10% = 25% off giá niêm yết).
Ta có phương trình: 0.85x + 0.70x = 1.55x = 26.350.000 $\Rightarrow$ x = 17.000.000 đồng.' WHERE id = 'm-25-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cửa hàng kinh doanh đồ uống áp dụng chính sách: Giá một ly trà sữa ban đầu là 40.000 đồng. Nếu mua từ ly thứ 4 trở đi, mỗi ly sẽ được giảm giá 20% so với giá ban đầu. Một nhóm học sinh mua tổng cộng n ly trà sữa (n > 3) và trả tổng số tiền là 248.000 đồng. Tìm số lượng ly trà sữa nhóm học sinh đó đã mua.', options = NULL, correct_answer = '{"7 ly","7"}', explanation = 'Giá 3 ly đầu: $3 \cdot 40$.000 = 120.000 đồng.
Số tiền còn lại mua các ly tiếp theo: 248.000 - 120.000 = 128.000 đồng.
Giá mỗi ly từ ly thứ 4: 40.$000 \cdot 0$.8 = 32.000 đồng/ly.
Số ly mua thêm: 128.000 / 32.000 = 4 ly. Tổng cộng đã mua: 3 + 4 = 7 ly.' WHERE id = 'm-26-g12';
UPDATE ge10_custom_questions SET prompt = 'Giá một mét khối nước sinh hoạt được tính lũy tiến như sau: 10 m^3 đầu giá 6.500 đ/m^3; từ m^3 11 đến 20 giá 8.000 đ/m^3; từ m^3 21 trở đi giá 11.000 đ/m^3. Thuế VAT là 5% và phí bảo vệ môi trường là 10% (tổng cộng cộng thêm 15% vào hóa đơn). Tháng 5 gia đình Nam dùng 22 m^3 nước. Tính số tiền phải trả.', options = NULL, correct_answer = '{"192.050 đồng","192050"}', explanation = 'Tiền nước trước thuế: $10 \cdot 6$.500 + $10 \cdot 8$.000 + $2 \cdot 11$.000 = 65.000 + 80.000 + 22.000 = 167.000 đồng.
Tổng tiền gồm thuế và phí (15%): 167.$000 \cdot 1$.15 = 192.050 đồng.' WHERE id = 'm-27-g12';
UPDATE ge10_custom_questions SET prompt = 'Cửa hàng nhập 200 kg cam giá 25.000 đ/kg. Đợt 1 bán 120 kg với giá lãi 40% so với giá vốn. Đợt 2 bán 80 kg còn lại với giá rẻ hơn 10% so với giá vốn. Hỏi sau khi bán hết, cửa hàng lời hay lỗ bao nhiêu tiền?', options = NULL, correct_answer = '{"lời 1.000.000 đồng","lời 1000000","1000000"}', explanation = 'Giá vốn: $200 \cdot 25$.000 = 5.000.000 đồng.
Doanh thu đợt 1: $120 \cdot (25$.$000 \cdot 1$.4) = 4.200.000 đồng.
Doanh thu đợt 2: $80 \cdot (25$.$000 \cdot 0$.9) = 1.800.000 đồng.
Tổng doanh thu: 4.200.000 + 1.800.000 = 6.000.000 đồng. Vậy cửa hàng lời: 6.000.000 - 5.000.000 = 1.000.000 đồng.' WHERE id = 'm-28-g12';
UPDATE ge10_custom_questions SET prompt = 'Một chiếc ly thủy tinh có phần chứa nước dạng hình nón với bán kính đáy nón r = 4 cm và chiều cao h = 9 cm. Người ta đổ nước vào ly sao cho chiều cao của cột nước bằng 2/3 chiều cao hình nón. Tính thể tích nước có trong ly (lấy pi $\approx$ 3,14, làm tròn đến hàng đơn vị).', options = NULL, correct_answer = '{"$45\\text{ cm}^3$","45"}', explanation = 'Chiều cao cột nước h'' = 2/$3 \cdot 9$ = 6 cm.
Tỷ lệ bán kính đáy cột nước r'' / r = h'' / h = 2/3 $\Rightarrow$ r'' = 8/3 cm.
Thể tích nước: V_nước = 1/$3 \cdot p$i * (r'')^2 * h'' $\approx$ 1/$3 \cdot 3$.$14 \cdot (8$/$3)^2 \cdot 6 \approx$ 44.66 cm^3 $\approx$ 45 cm^3.' WHERE id = 'm-29-g12';
UPDATE ge10_custom_questions SET prompt = 'Một hộp sữa bột hình trụ có chiều cao h = 18 cm và bán kính đáy r = 6 cm

**a)** Tính diện tích phần nhãn giấy cần dùng để dán kín xung quanh mặt bên của hộp sữa (bỏ qua mép dán)

**b)** Biết thể tích sữa bột chiếm 85% thể tích của cả hộp. Tính khối lượng sữa bột có trong hộp nếu cứ 1 cm^3 sữa bột nặng 0,6 gram. (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"678.24 cm^2","1038","1037.7"}', explanation = '**a)** Diện tích xung quanh: S_xq = $2 \cdot p$i * r * h $\approx 2 \cdot 3$.$14 \cdot 6$ * 18 = 678.24 cm^2

**b)** Thể tích hộp: V = pi * r^2 * h $\approx$ 2034.72 cm^3. Khối lượng sữa bột: m = 2034.$72 \cdot 0$.$85 \cdot 0$.6 $\approx$ 1037.7 gram (làm tròn lên khoảng 1038 g).' WHERE id = 'm-30-g12';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá tiêu chuẩn có dạng hình cầu với chu vi đường tròn lớn là 68 cm

**a)** Tính bán kính của quả bóng đá đó (làm tròn đến chữ số thập phân thứ hai)

**b)** Tính diện tích da tối thiểu cần dùng để khâu thành quả bóng đó, biết diện tích các mép khâu và phần hao hụt bằng 12% diện tích bề mặt quả bóng. (Sử dụng công thức C = $2 \cdot p$i*r và S = $4 \cdot p$i*r^2, lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"10.83 cm","1650"}', explanation = '**a)** C = $2 \cdot p$i*r $\Rightarrow$ r = 68 / ($2 \cdot 3$.14) $\approx$ 10.83 cm

**b)** Diện tích mặt cầu S = $4 \cdot 3$.$14 \cdot 10$.83^2 $\approx$ 1473.18 cm^2. Tổng diện tích da bao gồm 12% hao hụt: S_da = $S \cdot 1$.12 $\approx$ 1650 cm^2.' WHERE id = 'm-31-g12';
UPDATE ge10_custom_questions SET prompt = 'Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài 5 m và hai đầu là hai nửa hình cầu bằng nhau có bán kính r = 1 m

**a)** Tính thể tích toàn bộ bồn chứa dầu này

**b)** Hiện tại bồn đang chứa lượng dầu chiếm 3/4 thể tích bồn. Người ta rút dầu ra bằng các xe xitec, mỗi xe chở được tối đa 8 m^3 dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$19.89\\text{ m}^3$","2 chuyến"}', explanation = '**a)** Hai đầu là một hình cầu V_cầu = 4/$3 \cdot p$i * r^3 $\approx$ 4.19 m^3. Thân trụ V_trụ = pi * r^2 * h = 3.$14 \cdot 1$ * 5 = 15.7 m^3. Tổng V = 19.89 m^3

**b)** Lượng dầu: 19.$89 \cdot 3$/4 = 14.9175 m^3. Số chuyến xe: 14.9175 / 8 $\approx$ 1.86 $\Rightarrow$ Cần ít nhất 2 chuyến xe.' WHERE id = 'm-32-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cây kem ốc quế gồm hai phần: Phần bánh hình nón chiều cao h = 12 cm, bán kính r = 3 cm; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón

**a)** Tính thể tích toàn bộ cây kem

**b)** Giá nguyên vật liệu để làm ra 100 cm^3 kem là 15.000 đồng. Hỏi chi phí nguyên vật liệu để làm ra 50 cây kem như trên là bao nhiêu? (Lấy pi $\approx$ 3,14).', options = NULL, correct_answer = '{"$169.56\\text{ cm}^3$","1.271.700 đồng","1271700"}', explanation = '**a)** V_nón = 1/$3 \cdot p$i * r^2 * h = 113.04 cm^3. V_nửa_cầu = 2/$3 \cdot p$i * r^3 = 56.52 cm^3. Tổng V = 169.56 cm^3

**b)** Thể tích 50 cây kem: $50 \cdot 169$.56 = 8478 cm^3. Chi phí: $8478 \cdot 15$.000 / 100 = 1.271.700 đồng.' WHERE id = 'm-33-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số (y = ax^2) có đồ thị đi qua điểm (A(2; -2)). Hệ số (a) nhận giá trị là bao nhiêu?', options = '{"A. $a = -1$","B. a = -1/2","C. $a = -2$","D. a = 1/2"}', correct_answer = '{"B. a = -1/2"}', explanation = 'Thay tọa độ điểm (A(2; -2)) vào phương trình ta được: (-2 = a cdot 2^2 Rightarrow 4a = -2 Rightarrow a = -1/2).' WHERE id = 'hcm-math10-2024-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\Delta''$ của phương trình.', options = '{"$\\Delta' = m + 1$","$\\Delta' = m - 1$","$\\Delta' = 1 - m$","$\\Delta' = -m + 1$"}', correct_answer = '{"$\\Delta' = m + 1$"}', explanation = 'Ta có hệ số: $a = 1, b'' = -(m-1), c = m^2 - 3m$.
Biệt thức thu gọn:
  \Delta'' = b''^2 - ac  = [-(m-1)]^2 - 1 \cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1' WHERE id = 'hcm-math10-2024-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Gọi ($x_1$, $x_2$) là hai nghiệm của phương trình (2x^2 - 5x + 2 = 0). Giá trị của biểu thức (T = $x_1$ + $x_2$ +  $x_1 x_2$ ) là bao nhiêu?', options = '{"A. T = 7/2","B. $T = 3$","C. T = 5/2","D. T = 9/2"}', correct_answer = '{"A. T = 7/2"}', explanation = 'Theo hệ thức Vi-ét: ($x_1$ + $x_2$ = -b/a = 5/2), ( $x_1 x_2$  = c/a = 2/2 = 1). Suy ra (T = 5/2 + 1 = 7/2).' WHERE id = 'hcm-math10-2024-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Một cái xô hình nón cụt có bán kính đáy nhỏ là (15	ext{ cm}), bán kính đáy lớn là (25	ext{ cm}), chiều cao là (30	ext{ cm}). Tính thể tích (V) của cái xô (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 38465 cm^3","B. V $\\approx$ 37680 cm^3","C. V $\\approx$ 32185 cm^3","D. V $\\approx$ 29420 cm^3"}', correct_answer = '{"B. V $\\approx$ 37680 cm^3"}', explanation = 'Công thức thể tích hình nón cụt: (V = rac{1}{3}pi h (R^2 + r^2 + Rr)). Thay số: (V = rac{1}{3} cdot 3,14 cdot 30 (25^2 + 15^2 + 25 cdot 15) = 31,4 cdot (625 + 225 + 375) = 31,4 cdot 1225 approx 37680	ext{ cm}^3).' WHERE id = 'hcm-math10-2024-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Tìm nghiệm ((x; y)) của hệ phương trình bậc nhất hai ẩn sau: (egin{cases} 2x - y = 3 \ x + y = 3 end{cases}).', options = '{"A. $(2; 1)$","B. $(1; 2)$","C. $(2; -1)$","D. $(0; 3)$"}', correct_answer = '{"A. $(2; 1)$"}', explanation = 'Cộng hai vế phương trình: (3x = 6 Rightarrow x = 2). Thay vào phương trình thứ hai: (2 + y = 3 Rightarrow y = 1).' WHERE id = 'hcm-math10-2023-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai (x^2 - 4x + 3 = 0). Tập nghiệm (S) của phương trình là gì?', options = '{"A. S = {1; 3}","B. S = {-1; -3}","C. S = {1; -3}","D. S = {-1; 3}"}', correct_answer = '{"A. S = {1; 3}"}', explanation = 'Phương trình có các hệ số (a = 1, b = -4, c = 3). Vì (a + b + c = 1 - 4 + 3 = 0), phương trình có hai nghiệm phân biệt: ($x_1$ = 1, $x_2$ = c/a = 3).' WHERE id = 'hcm-math10-2023-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Đồ thị hàm số (y = 2x - 3) cắt trục tung (Oy) tại điểm nào?', options = '{"A. $(0; -3)$","B. (3/2; 0)","C. $(0; 3)$","D. $(-3; 0)$"}', correct_answer = '{"A. $(0; -3)$"}', explanation = 'Đồ thị cắt trục tung khi hoành độ (x = 0 Rightarrow y = 2 cdot 0 - 3 = -3). Điểm cắt là ((0; -3)).' WHERE id = 'hcm-math10-2023-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Một hình trụ có bán kính đáy (r = 5	ext{ cm}) và chiều cao (h = 10	ext{ cm}). Tính diện tích xung quanh (S_{xq}) của hình trụ (lấy (pi approx 3,14)).', options = '{"A. S_xq $\\approx$ 314 cm^2","B. S_xq $\\approx$ 157 cm^2","C. S_xq $\\approx$ 628 cm^2","D. S_xq $\\approx$ 78.5 cm^2"}', correct_answer = '{"A. S_xq $\\approx$ 314 cm^2"}', explanation = 'Diện tích xung quanh hình trụ: (S_{xq} = 2pi rh). Thay số: (S_{xq} = 2 cdot 3,14 cdot 5 cdot 10 = 314	ext{ cm}^2).' WHERE id = 'hcm-math10-2023-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Căn thức (sqrt{2x - 4}) xác định khi và chỉ khi giá trị của (x) thoả mãn điều kiện gì?', options = '{"A. $x \\ge 2$","B. $x > 2$","C. $x \\le 2$","D. $x < 2$"}', correct_answer = '{"A. $x \\ge 2$"}', explanation = 'Căn thức bậc hai xác định khi biểu thức dưới căn không âm: (2x - 4 ge 0 Rightarrow 2x ge 4 Rightarrow x ge 2).' WHERE id = 'hcm-math10-2022-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Một quả bóng đá có dạng hình cầu với đường kính bằng (22	ext{ cm}). Tính thể tích (V) của quả bóng đó (lấy (pi approx 3,14), làm tròn đến hàng đơn vị).', options = '{"A. V $\\approx$ 5572 cm^3","B. V $\\approx$ 44580 cm^3","C. V $\\approx$ 1393 cm^3","D. V $\\approx$ 11144 cm^3"}', correct_answer = '{"A. V $\\approx$ 5572 cm^3"}', explanation = 'Bán kính hình cầu (R = d/2 = 22/2 = 11	ext{ cm}). Thể tích hình cầu: (V = rac{4}{3}pi R^3 = rac{4}{3} cdot 3,14 cdot 11^3 approx 5572	ext{ cm}^3).' WHERE id = 'hcm-math10-2022-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho đường tròn ((O; R)) và một dây cung (AB = Rsqrt{3}). Khoảng cách từ tâm (O) đến dây cung (AB) bằng bao nhiêu?', options = '{"A. R/2","B. R$\\sqrt{3}$ / 2","C. R/4","D. R$\\sqrt{2}$ / 2"}', correct_answer = '{"A. R/2"}', explanation = 'Kẻ (OH perp AB) tại (H) là trung điểm của (AB). Ta có: (AH = rac{AB}{2} = rac{Rsqrt{3}}{2}). Áp dụng định lý Pytago trong tam giác vuông (OHA): (OH = sqrt{OA^2 - AH^2} = sqrt{R^2 - rac{3R^2}{4}} = sqrt{rac{R^2}{4}} = rac{R}{2}).' WHERE id = 'hcm-math10-2022-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Không giải phương trình, hãy cho biết tổng (S) và tích (P) của hai nghiệm phương trình bậc hai (3x^2 - 8x - 5 = 0).', options = '{"A. S = 8/3, P = -5/3","B. S = -8/3, P = 5/3","C. S = 8/3, P = 5/3","D. S = -8/3, P = -5/3"}', correct_answer = '{"A. S = 8/3, P = -5/3"}', explanation = 'Theo hệ thức Vi-ét: (S = $x_1$ + $x_2$ = -b/a = 8/3); (P =  $x_1 x_2$  = c/a = -5/3).' WHERE id = 'hcm-math10-2022-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Hệ phương trình nào sau đây có nghiệm duy nhất là ((x; y) = (1; -1))?', options = '{"A. {x + y = 0; 2x - y = 3}","B. {x - y = 0; 2x + y = 3}","C. {x + y = 2; x - y = 0}","D. {x + y = 0; x - y = 0}"}', correct_answer = '{"A. {x + y = 0; 2x - y = 3}"}', explanation = 'Thay (x=1, y=-1) vào hệ phương trình A: (1 + (-1) = 0) (đúng) và (2(1) - (-1) = 3) (đúng).' WHERE id = 'hcm-math10-2021-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Rút gọn biểu thức (A = sqrt{(2-sqrt{5})^2} - sqrt{5}).', options = '{"A. -2","B. 2","C. 2 - 2$\\sqrt{5}$","D. -2 - 2$\\sqrt{5}$"}', correct_answer = '{"A. -2"}', explanation = '(A = |2-sqrt{5}| - sqrt{5}). Vì (2 < sqrt{5}) nên (|2-sqrt{5}| = sqrt{5} - 2). Vậy (A = sqrt{5} - 2 - sqrt{5} = -2).' WHERE id = 'hcm-math10-2021-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Hàm số bậc hai (y = -2x^2) đồng biến và nghịch biến trong các khoảng nào?', options = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0","B. Đồng biến khi x > 0, nghịch biến khi x < 0","C. Đồng biến trên toàn tập xác định","D. Nghịch biến trên toàn tập xác định"}', correct_answer = '{"A. Đồng biến khi x < 0, nghịch biến khi x > 0"}', explanation = 'Hàm số (y = ax^2) có hệ số (a = -2 < 0) nên đồng biến khi (x < 0) và nghịch biến khi (x > 0). Đồ thị có bề lõm hướng xuống dưới.' WHERE id = 'hcm-math10-2021-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?', options = '{"A. 90 độ","B. 180 độ","C. 60 độ","D. 45 độ"}', correct_answer = '{"A. 90 độ"}', explanation = 'Theo tính chất góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và bằng $90^\circ$.' WHERE id = 'hcm-math10-2021-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Tìm các giá trị của tham số (m) để hệ phương trình (egin{cases} mx + y = 1 \ x + my = 1 end{cases}) vô số nghiệm.', options = '{"A. $m = 1$","B. $m = -1$","C. $m = 0$","D. m = $\\pm$1"}', correct_answer = '{"A. $m = 1$"}', explanation = 'Hệ có vô số nghiệm khi các hệ số tỷ lệ: (rac{m}{1} = rac{1}{m} = rac{1}{1} Rightarrow m = 1). Nếu (m = -1) thì (rac{-1}{1} = rac{1}{-1} 
eq rac{1}{1}) (hệ vô nghiệm).' WHERE id = 'hcm-math-l9-hk2-q1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho tứ giác (ABCD) nội tiếp đường tròn. Biết góc (A = 70^circ). Tính số đo của góc (C).', options = '{"A. 110 độ","B. 70 độ","C. 180 độ","D. 90 độ"}', correct_answer = '{"A. 110 độ"}', explanation = 'Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng (180^circ). Do đó: (widehat{C} = 180^circ - widehat{A} = 180^circ - 70^circ = 110^circ).' WHERE id = 'hcm-math-l9-hk2-q2-g12';
UPDATE ge10_custom_questions SET prompt = 'Một hình nón có bán kính đáy (r = 3	ext{ cm}) và đường sinh (l = 5	ext{ cm}). Tính thể tích (V) của hình nón (lấy (pi approx 3,14)).', options = '{"A. V $\\approx$ 37.68 cm^3","B. V $\\approx$ 113.04 cm^3","C. V $\\approx$ 47.1 cm^3","D. V $\\approx$ 15.07 cm^3"}', correct_answer = '{"A. V $\\approx$ 37.68 cm^3"}', explanation = 'Áp dụng định lý Pytago tìm chiều cao hình nón: (h = sqrt{l^2 - r^2} = sqrt{5^2 - 3^2} = 4	ext{ cm}). Thể tích hình nón: (V = rac{1}{3}pi r^2 h = rac{1}{3} cdot 3,14 cdot 3^2 cdot 4 = 37,68	ext{ cm}^3).' WHERE id = 'hcm-math-l9-hk2-q3-g12';
UPDATE ge10_custom_questions SET prompt = 'Tính giá trị của biểu thức (P = rac{2}{sqrt{3}-1} - sqrt{3}).', options = '{"A. 1","B. -1","C. $\\sqrt{3}$","D. 2"}', correct_answer = '{"A. 1"}', explanation = 'Trục căn thức ở mẫu: (rac{2(sqrt{3}+1)}{(sqrt{3}-1)(sqrt{3}+1)} = rac{2(sqrt{3}+1)}{3-1} = sqrt{3}+1). Vậy (P = sqrt{3}+1 - sqrt{3} = 1).' WHERE id = 'hcm-math-l9-hk2-q4-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho hàm số bậc hai $y = ax^2$ ($a \neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?', options = '{"Quay lên phía trên","Quay xuống phía dưới","Quay sang bên phải","Quay sang bên trái"}', correct_answer = '{"Quay lên phía trên"}', explanation = 'Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \neq 0$. Do đó bề lõm của Parabol quay lên phía trên.' WHERE id = 'gk-math-quadratic-fn-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?', options = '{"$A(1; 2)$","$B(2; 4)$","$C(-1; -2)$","$D(0; 2)$"}', correct_answer = '{"$A(1; 2)$"}', explanation = 'Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị.' WHERE id = 'gk-math-quadratic-fn-2-g12';
UPDATE ge10_custom_questions SET prompt = 'Phương trình bậc hai  $ax^2 + bx + c = 0$  có biệt thức  $\Delta = b^2 - 4ac$ . Phương trình có hai nghiệm phân biệt khi nào?', options = '{"$\\Delta > 0$","$\\Delta = 0$","$\\Delta < 0$","$\\Delta \\ge 0$"}', correct_answer = '{"$\\Delta > 0$"}', explanation = '- Khi $\Delta > 0$: phương trình có hai nghiệm phân biệt.
- Khi $\Delta = 0$: phương trình có nghiệm kép.
- Khi $\Delta < 0$: phương trình vô nghiệm trong tập số thực.' WHERE id = 'gk-math-quadratic-eq-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình bậc hai  $ax^2 + bx + c = 0$  ($a \neq 0$). Nếu $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?', options = '{"Phương trình luôn có hai nghiệm phân biệt","Phương trình vô nghiệm","Phương trình có nghiệm kép","Phương trình có vô số nghiệm"}', correct_answer = '{"Phương trình luôn có hai nghiệm phân biệt"}', explanation = 'Ta có  $\Delta = b^2 - 4ac$ . Vì $ac < 0$ nên $-4ac > 0$, suy ra  $\Delta = b^2 - 4ac  > 0$ với mọi $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).' WHERE id = 'gk-math-quadratic-eq-2-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm  $x_1, x_2$ . Tổng và tích của hai nghiệm theo định lý Vi-ét là:', options = '{"$S = 7, P = 10$","$S = -7, P = 10$","$S = 7, P = -10$","$S = -7, P = -10$"}', correct_answer = '{"$S = 7, P = 10$"}', explanation = 'Theo định lý Vi-ét:
 S =  x_1 + x_2  = -\frac{b}{a} = -\frac{-7}{1} = 7, \quad P =  x_1 \cdot x_2  = \frac{c}{a} = \frac{10}{1} = 10' WHERE id = 'gk-math-vieta-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Cho mẫu số liệu sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:', options = '{"$7$","$5$","$8$","$7{,}5$"}', correct_answer = '{"$7$"}', explanation = 'Mẫu số liệu có $n = 7$ phần tử (số lẻ) đã được sắp xếp tăng dần. Số trung vị là phần tử thứ 4: $Me = 7$.' WHERE id = 'gk-math-statistics-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là:', options = '{"$\\frac{1}{2}$","$\\frac{1}{3}$","$\\frac{1}{6}$","$\\frac{2}{3}$"}', correct_answer = '{"$\\frac{1}{2}$"}', explanation = 'Không gian mẫu: $\Omega = \{1, 2, 3, 4, 5, 6\} \Rightarrow n(\Omega) = 6$.
Biến cố xuất hiện mặt chẵn: $A = \{2, 4, 6\} \Rightarrow n(A) = 3$.
Xác suất: $P(A) = \frac{3}{6} = \frac{1}{2}$.' WHERE id = 'gk-math-probability-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\%$, sau đó lại giảm giá $10\%$ trên giá mới. Giá cuối cùng của sản phẩm là:', options = '{"$198.000$ đồng","$200.000$ đồng","$190.000$ đồng","$210.000$ đồng"}', correct_answer = '{"$198.000$ đồng"}', explanation = '- Giá sau khi tăng $10\%$: $200.000 \cdot (1 + 0{,}10) = 220.000\text{ đồng}$.
- Giá sau khi giảm $10\%$: $220.000 \cdot (1 - 0{,}10) = 198.000\text{ đồng}$.' WHERE id = 'gk-math-realworld-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', options = '{"$90^\\circ$","$180^\\circ$","$45^\\circ$","$60^\\circ$"}', correct_answer = '{"$90^\\circ$"}', explanation = 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn. Nửa đường tròn có số đo $180^\circ$, do đó góc nội tiếp chắn nửa đường tròn bằng $\frac{180^\circ}{2} = 90^\circ$.' WHERE id = 'gk-math-circle-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', options = '{"$V = \\pi r^2 h$","$V = \\frac{1}{3}\\pi r^2 h$","$V = 2\\pi r h$","$V = \\frac{4}{3}\\pi r^3$"}', correct_answer = '{"$V = \\pi r^2 h$"}', explanation = 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: $V = S_{\text{đáy}} \cdot h = \pi r^2 h$.' WHERE id = 'gk-math-solid-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Điều kiện xác định của biểu thức $\sqrt{2x - 4}$ là:', options = '{"$x \\ge 2$","$x > 2$","$x \\le 2$","$x \\ge 4$"}', correct_answer = '{"$x \\ge 2$"}', explanation = 'Căn thức bậc hai $\sqrt{A}$ xác định khi và chỉ khi $A \ge 0$.
Ta có: $2x - 4 \ge 0 \Leftrightarrow 2x \ge 4 \Leftrightarrow x \ge 2$.' WHERE id = 'gk-math-radicals-1-g12';
UPDATE ge10_custom_questions SET prompt = 'Nghiệm của hệ phương trình $\begin{cases} x + y = 5 \\ x - y = 1 \end{cases}$ là:', options = '{"$(3; 2)$","$(2; 3)$","$(4; 1)$","$(1; 4)$"}', correct_answer = '{"$(3; 2)$"}', explanation = 'Cộng từng vế hai phương trình:
 2x = 6 \Leftrightarrow x = 3 
Thế $x = 3$ vào phương trình thứ nhất:
 3 + y = 5 \Leftrightarrow y = 2 
Vậy nghiệm của hệ phương trình là $(3; 2)$.' WHERE id = 'gk-math-linearsys-1-g12';

COMMIT;
