import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import katex from 'katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete standardized database for all 71 base math questions
export const STANDARDIZED_MATH_QUESTIONS: Record<string, {
  prompt: string;
  options: string[] | null;
  correctAnswer: string | string[];
  explanation: string;
}> = {
  // --- Nhóm đề thi mẫu & cơ bản (m-1 -> m-33) ---
  'm-1': {
    prompt: `Tìm tọa độ giao điểm của Parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.`,
    options: [`$(3; 9)$ và $(-1; 1)$`, `$(3; 9)$ và $(1; 1)$`, `$(-3; 9)$ và $(-1; 1)$`, `$(3; 6)$ và $(-1; 2)$`],
    correctAnswer: [`$(3; 9)$ và $(-1; 1)$`],
    explanation: `Phương trình hoành độ giao điểm của $(P)$ và $(d)$ là:\n$$x^2 = 2x + 3 \\Leftrightarrow x^2 - 2x - 3 = 0$$\nVì $a - b + c = 1 - (-2) + (-3) = 0$ nên phương trình có hai nghiệm $x_1 = -1$ và $x_2 = 3$.\n\n- Với $x = -1 \\Rightarrow y = 1 \\Rightarrow A(-1; 1)$.\n- Với $x = 3 \\Rightarrow y = 9 \\Rightarrow B(3; 9)$.\n\nVậy tọa độ hai giao điểm là $(3; 9)$ và $(-1; 1)$.`
  },
  'm-2': {
    prompt: `Cho phương trình bậc hai $x^2 - 5x + 3 = 0$ có hai nghiệm $x_1, x_2$. Tính giá trị của biểu thức $A = x_1^2 + x_2^2$.`,
    options: [`$A = 19$`, `$A = 22$`, `$A = 25$`, `$A = 16$`],
    correctAnswer: [`$A = 19$`],
    explanation: `Theo hệ thức Vi-ét ta có:\n$$S = x_1 + x_2 = 5, \\quad P = x_1 \\cdot x_2 = 3$$\nBiến đổi biểu thức $A$:\n$$A = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = S^2 - 2P = 5^2 - 2 \\cdot 3 = 25 - 6 = 19$$`
  },
  'm-3': {
    prompt: `Một chiếc balo có giá niêm yết là $300.000$ đồng. Nhân dịp khai giảng, cửa hàng thực hiện giảm giá hai đợt liên tiếp: đợt 1 giảm $10\\%$ trên giá niêm yết, đợt 2 giảm tiếp $5\\%$ trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?`,
    options: [`$256.500$ đồng`, `$255.000$ đồng`, `$270.000$ đồng`, `$245.000$ đồng`],
    correctAnswer: [`$256.500$ đồng`],
    explanation: `- Giá bán sau đợt giảm giá thứ nhất:\n  $$300.000 \\cdot (1 - 0{,}10) = 270.000\\text{ (đồng)}$$\n- Giá bán sau đợt giảm giá thứ hai:\n  $$270.000 \\cdot (1 - 0{,}05) = 256.500\\text{ (đồng)}$$`
  },
  'm-4': {
    prompt: `Một lon nước ngọt hình trụ có bán kính đáy $r = 3\\text{ cm}$ và chiều cao $h = 12\\text{ cm}$. Tính thể tích vỏ lon nước ngọt (lấy $\\pi \\approx 3{,}14$).`,
    options: [`$339{,}12\\text{ cm}^3$`, `$113{,}04\\text{ cm}^3$`, `$108{,}00\\text{ cm}^3$`, `$300{,}00\\text{ cm}^3$`],
    correctAnswer: [`$339{,}12\\text{ cm}^3$`],
    explanation: `Thể tích hình trụ được tính theo công thức:\n$$V = \\pi r^2 h$$\nThay số vào công thức:\n$$V \\approx 3{,}14 \\cdot 3^2 \\cdot 12 = 3{,}14 \\cdot 9 \\cdot 12 = 339{,}12\\text{ (cm}^3\\text{)}$$`
  },
  'm-5': {
    prompt: `Tìm giá trị của tham số $m$ để phương trình $x^2 - 2x + m - 1 = 0$ có hai nghiệm phân biệt.`,
    options: [`$m < 2$`, `$m > 2$`, `$m \\le 2$`, `$m < 1$`],
    correctAnswer: [`$m < 2$`],
    explanation: `Phương trình có hai nghiệm phân biệt khi và chỉ khi $\\Delta' > 0$.\nTa có:\n$$\\Delta' = (-1)^2 - 1 \\cdot (m - 1) = 1 - m + 1 = 2 - m$$\nĐể phương trình có hai nghiệm phân biệt:\n$$2 - m > 0 \\Leftrightarrow m < 2$$`
  },
  'm-6': {
    prompt: `Hai trường A và B có tổng cộng $560$ học sinh dự thi vào lớp 10. Sau khi có kết quả, có $500$ học sinh đỗ vào lớp 10. Biết tỷ lệ đỗ của trường A là $90\\%$ và trường B là $85\\%$. Hỏi trường A có bao nhiêu học sinh dự thi?`,
    options: [`$480$ học sinh`, `$320$ học sinh`, `$240$ học sinh`, `$80$ học sinh`],
    correctAnswer: [`$480$ học sinh`],
    explanation: `Gọi $x, y$ lần lượt là số học sinh dự thi của trường A và B ($0 < x, y < 560; x, y \\in \\mathbb{N}^*$).\nTa có hệ phương trình:\n$$\\begin{cases} x + y = 560 \\\\ 0{,}90x + 0{,}85y = 500 \\end{cases}$$\nTừ (1) suy ra $y = 560 - x$. Thế vào (2):\n$$0{,}90x + 0{,}85(560 - x) = 500 \\Leftrightarrow 0{,}05x + 476 = 500 \\Leftrightarrow 0{,}05x = 24 \\Leftrightarrow x = 480$$\nVậy trường A có $480$ học sinh dự thi.`
  },
  'm-7': {
    prompt: `Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Tính độ dài đoạn thẳng $AB$ theo $R$.`,
    options: [`$R\\sqrt{3}$`, `$R\\sqrt{2}$`, `$R$`, `$1{,}5R$`],
    correctAnswer: [`$R\\sqrt{3}$`],
    explanation: `Vì $AB$ là tiếp tuyến của đường tròn $(O)$ tại tiếp điểm $B$ nên $OB \\perp AB$, suy ra $\\Delta OAB$ vuông tại $B$.\nÁp dụng định lý Pitago trong $\\Delta OAB$ vuông tại $B$:\n$$OA^2 = OB^2 + AB^2 \\Leftrightarrow (2R)^2 = R^2 + AB^2 \\Leftrightarrow 4R^2 = R^2 + AB^2 \\Leftrightarrow AB^2 = 3R^2 \\Leftrightarrow AB = R\\sqrt{3}$$`
  },
  'm-8': {
    prompt: `Cho Parabol $(P): y = 2x^2$ và đường thẳng $(d): y = 4x - 2$. Tìm số giao điểm của $(P)$ và $(d)$.`,
    options: [`$1$ điểm (tiếp xúc)`, `$2$ điểm phân biệt`, `$0$ điểm (không giao nhau)`, `Vô số điểm`],
    correctAnswer: [`$1$ điểm (tiếp xúc)`],
    explanation: `Phương trình hoành độ giao điểm của $(P)$ và $(d)$:\n$$2x^2 = 4x - 2 \\Leftrightarrow 2x^2 - 4x + 2 = 0 \\Leftrightarrow 2(x - 1)^2 = 0 \\Leftrightarrow x = 1$$\nPhương trình có nghiệm kép $x = 1 \\Rightarrow y = 2$.\nVậy đường thẳng $(d)$ tiếp xúc với Parabol $(P)$ tại $1$ điểm duy nhất $(1; 2)$.`
  },
  'm-9': {
    prompt: `Cho Parabol $(P): y = -x^2$ và đường thẳng $(d): y = 2x + 3$. Tìm tọa độ các giao điểm của $(P)$ và $(d)$.`,
    options: [`$(-3; -9)$ và $(1; -1)$`, `$(-3; 9)$ và $(1; 1)$`, `$(3; -9)$ và $(-1; -1)$`, `$(3; 9)$ và $(-1; 1)$`],
    correctAnswer: [`$(-3; -9)$ và $(1; -1)$`],
    explanation: `Phương trình hoành độ giao điểm:\n$$-x^2 = 2x + 3 \\Leftrightarrow x^2 + 2x + 3 = 0$$\nXét $\\Delta' = 1^2 - 1 \\cdot 3 = -2 < 0$, phương trình vô nghiệm nên $(P)$ và $(d)$ không cắt nhau.`
  },
  'm-10': {
    prompt: `Tìm tham số $m$ để đường thẳng $(d): y = 2x + m$ cắt Parabol $(P): y = x^2$ tại hai điểm phân biệt.`,
    options: [`$m > -1$`, `$m < -1$`, `$m \\ge -1$`, `$m > 1$`],
    correctAnswer: [`$m > -1$`],
    explanation: `Phương trình hoành độ giao điểm:\n$$x^2 = 2x + m \\Leftrightarrow x^2 - 2x - m = 0$$\nĐể $(d)$ cắt $(P)$ tại hai điểm phân biệt thì $\\Delta' > 0$:\n$$\\Delta' = (-1)^2 - 1 \\cdot (-m) = 1 + m > 0 \\Leftrightarrow m > -1$$`
  },
  'm-11': {
    prompt: `Tìm tham số $m$ để đường thẳng $(d): y = -4x + m$ tiếp xúc với Parabol $(P): y = x^2$.`,
    options: [`$m = -4$`, `$m = 4$`, `$m = -2$`, `$m = 2$`],
    correctAnswer: [`$m = -4$`],
    explanation: `Phương trình hoành độ giao điểm:\n$$x^2 = -4x + m \\Leftrightarrow x^2 + 4x - m = 0$$\nĐể $(d)$ tiếp xúc $(P)$ thì $\\Delta' = 0$:\n$$\\Delta' = 2^2 - 1 \\cdot (-m) = 4 + m = 0 \\Leftrightarrow m = -4$$`
  },
  'm-12': {
    prompt: `Cho Parabol $(P): y = \\frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$. Tính diện tích tam giác $OAB$ với $A, B$ là hai giao điểm của $(P)$ và $(d)$ ($O$ là gốc tọa độ).`,
    options: [`$12$`, `$16$`, `$8$`, `$24$`],
    correctAnswer: [`$12$`],
    explanation: `Phương trình hoành độ giao điểm:\n$$\\frac{1}{2}x^2 = x + 4 \\Leftrightarrow x^2 - 2x - 8 = 0 \\Leftrightarrow x_1 = 4, x_2 = -2$$\nTọa độ hai giao điểm là $A(4; 8)$ và $B(-2; 2)$.\nĐường thẳng $(d)$ cắt trục tung $Oy$ tại điểm $C(0; 4) \\Rightarrow OC = 4$.\nDiện tích tam giác $OAB$:\n$$S_{OAB} = S_{OAC} + S_{OBC} = \\frac{1}{2} \\cdot OC \\cdot |x_A| + \\frac{1}{2} \\cdot OC \\cdot |x_B| = \\frac{1}{2} \\cdot 4 \\cdot 4 + \\frac{1}{2} \\cdot 4 \\cdot 2 = 8 + 4 = 12$$`
  },
  'm-13': {
    prompt: `Cho phương trình $2x^2 - 7x + 3 = 0$ có hai nghiệm $x_1, x_2$. Tính giá trị của biểu thức $B = \\frac{1}{x_1} + \\frac{1}{x_2}$.`,
    options: [`$B = \\frac{7}{3}$`, `$B = \\frac{3}{7}$`, `$B = -\\frac{7}{3}$`, `$B = \\frac{7}{6}$`],
    correctAnswer: [`$B = \\frac{7}{3}$`],
    explanation: `Theo hệ thức Vi-ét:\n$$S = x_1 + x_2 = \\frac{7}{2}, \\quad P = x_1 \\cdot x_2 = \\frac{3}{2}$$\nBiến đổi biểu thức $B$:\n$$B = \\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{\\frac{7}{2}}{\\frac{3}{2}} = \\frac{7}{3}$$`
  },
  'm-14': {
    prompt: `Cho phương trình $x^2 - 4x - 3 = 0$ có hai nghiệm $x_1, x_2$. Tính giá trị của biểu thức $A = \\frac{x_1^2}{x_2} + \\frac{x_2^2}{x_1}$.`,
    options: [`$-\\frac{100}{3}$`, `$\\frac{100}{3}$`, `$-33$`, `$\\frac{64}{3}$`],
    correctAnswer: [`-\\frac{100}{3}`],
    explanation: `Theo định lý Vi-ét: $S = x_1 + x_2 = 4, P = x_1 \\cdot x_2 = -3$.\nBiến đổi biểu thức $A$:\n$$A = \\frac{x_1^3 + x_2^3}{x_1 x_2} = \\frac{(x_1 + x_2)^3 - 3x_1x_2(x_1 + x_2)}{x_1 x_2} = \\frac{4^3 - 3(-3)(4)}{-3} = \\frac{64 + 36}{-3} = -\\frac{100}{3}$$`
  },
  'm-15': {
    prompt: `Cho phương trình: $x^2 - 2mx + 2m - 3 = 0$ ($m$ là tham số).\n\n**a)** Chứng minh phương trình luôn có hai nghiệm phân biệt $x_1, x_2$ với mọi giá trị của $m$.\n\n**b)** Tìm $m$ để hai nghiệm $x_1, x_2$ thỏa mãn hệ thức: $x_1^2 + x_2^2 = 10$.`,
    options: null,
    correctAnswer: [`m = 1`, `m = -3`, `\\Delta > 0`],
    explanation: `**a)** Ta có: $\\Delta' = (-m)^2 - 1 \\cdot (2m - 3) = m^2 - 2m + 3 = (m - 1)^2 + 2 > 0$ với mọi $m$.\nVì $\\Delta' > 0$ với mọi $m$ nên phương trình luôn có hai nghiệm phân biệt $x_1, x_2$.\n\n**b)** Theo định lý Vi-ét: $S = x_1 + x_2 = 2m, P = x_1 \\cdot x_2 = 2m - 3$.\nTa có: $x_1^2 + x_2^2 = S^2 - 2P = (2m)^2 - 2(2m - 3) = 4m^2 - 4m + 6$.\nTheo đề bài: $4m^2 - 4m + 6 = 10 \\Leftrightarrow 4m^2 - 4m - 4 = 0 \\Leftrightarrow m^2 - m - 1 = 0$.\nGiải phương trình bậc hai theo $m$ thu được: $m = \\frac{1 \\pm \\sqrt{5}}{2}$.`
  },
  'm-16': {
    prompt: `Cho phương trình $3x^2 - 5x - 1 = 0$ có hai nghiệm $x_1, x_2$. Hãy lập phương trình bậc hai có hai nghiệm là $y_1 = x_1 + \\frac{1}{x_2}$ và $y_2 = x_2 + \\frac{1}{x_1}$.`,
    options: null,
    correctAnswer: [`3y^2 + 10y - 4 = 0`, `y^2 + \\frac{10}{3}y - \\frac{4}{3} = 0`],
    explanation: `Theo Vi-ét: $S = x_1 + x_2 = \\frac{5}{3}, P = x_1 \\cdot x_2 = -\\frac{1}{3}$.\nTính tổng $S_y = y_1 + y_2$ và tích $P_y = y_1 \\cdot y_2$:\n$$S_y = (x_1 + x_2) + \\left(\\frac{1}{x_1} + \\frac{1}{x_2}\\right) = S + \\frac{S}{P} = \\frac{5}{3} + \\frac{\\frac{5}{3}}{-\\frac{1}{3}} = \\frac{5}{3} - 5 = -\\frac{10}{3}$$\n$$P_y = \\left(x_1 + \\frac{1}{x_2}\\right)\\left(x_2 + \\frac{1}{x_1}\\right) = x_1x_2 + 1 + 1 + \\frac{1}{x_1x_2} = P + 2 + \\frac{1}{P} = -\\frac{1}{3} + 2 - 3 = -\\frac{4}{3}$$\nPhương trình bậc hai cần tìm là $y^2 - S_y y + P_y = 0 \\Leftrightarrow y^2 + \\frac{10}{3}y - \\frac{4}{3} = 0 \\Leftrightarrow 3y^2 + 10y - 4 = 0$.`
  },
  'm-17': {
    prompt: `Cho phương trình: $x^2 - 2(m-1)x + m^2 - 4 = 0$. Tìm các giá trị của tham số $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$ sao cho biểu thức sau đạt giá trị nhỏ nhất:\n$$B = x_1 x_2 - (x_1 + x_2)$$`,
    options: null,
    correctAnswer: [`m = 1`],
    explanation: `Điều kiện phương trình có hai nghiệm phân biệt:\n$$\\Delta' = (m-1)^2 - (m^2 - 4) = m^2 - 2m + 1 - m^2 + 4 = 5 - 2m > 0 \\Leftrightarrow m < \\frac{5}{2}$$\n\nTheo định lý Vi-ét:\n$$S = x_1 + x_2 = 2(m - 1), \\quad P = x_1 \\cdot x_2 = m^2 - 4$$\nBiến đổi biểu thức $B$:\n$$B = P - S = m^2 - 4 - 2(m - 1) = m^2 - 2m - 2 = (m - 1)^2 - 3$$\nVì $(m - 1)^2 \\ge 0$ nên $B \\ge -3$. Dấu "$=$" xảy ra khi $m = 1$ (thỏa mãn điều kiện $m < \\frac{5}{2}$). Vậy $B$ đạt giá trị nhỏ nhất tại $m = 1$.`
  },
  'm-18': {
    prompt: `Một người gửi tiết kiệm $100.000.000$ đồng vào ngân hàng với lãi suất $6\\%/\\text{năm}$ theo hình thức lãi kép kỳ hạn $1$ năm. Hỏi sau $2$ năm người đó nhận được cả vốn lẫn lãi là bao nhiêu tiền?`,
    options: [`$112.360.000$ đồng`, `$112.000.000$ đồng`, `$110.000.000$ đồng`, `$115.000.000$ đồng`],
    correctAnswer: [`$112.360.000$ đồng`],
    explanation: `Áp dụng công thức lãi kép: $T = A \\cdot (1 + r)^n$.\nTrong đó $A = 100.000.000$ đồng, $r = 6\\% = 0{,}06$, $n = 2$ năm.\nSố tiền nhận được sau $2$ năm:\n$$T = 100.000.000 \\cdot (1 + 0{,}06)^2 = 100.000.000 \\cdot (1{,}06)^2 = 112.360.000\\text{ (đồng)}$$`
  },
  'm-19': {
    prompt: `Một cửa hàng điện máy bán một chiếc tivi với giá niêm yết là $12.000.000$ đồng. Trong chương trình khuyến mãi, cửa hàng giảm giá $15\\%$, đồng thời nếu thanh toán qua thẻ tín dụng sẽ được hoàn tiền thêm $500.000$ đồng. Hỏi khách hàng thanh toán qua thẻ tín dụng cần trả bao nhiêu tiền?`,
    options: [`$9.700.000$ đồng`, `$10.200.000$ đồng`, `$9.500.000$ đồng`, `$10.000.000$ đồng`],
    correctAnswer: [`$9.700.000$ đồng`],
    explanation: `- Giá tivi sau khi giảm giá $15\\%$:\n  $$12.000.000 \\cdot (1 - 0{,}15) = 10.200.000\\text{ (đồng)}$$\n- Số tiền thực tế phải trả sau khi được hoàn $500.000$ đồng:\n  $$10.200.000 - 500.000 = 9.700.000\\text{ (đồng)}$$`
  },
  'm-20': {
    prompt: `Bác Ba mua hai loại hàng hóa A và B hết tổng cộng $800.000$ đồng (đã bao gồm thuế VAT). Biết thuế VAT đối với hàng loại A là $10\\%$, đối với hàng loại B là $8\\%$. Nếu không tính thuế VAT thì tổng số tiền hai loại hàng là $730.000$ đồng. Tính tiền hàng loại A chưa tính thuế VAT.`,
    options: [`$400.000$ đồng`, `$330.000$ đồng`, `$450.000$ đồng`, `$350.000$ đồng`],
    correctAnswer: [`$400.000$ đồng`],
    explanation: `Gọi $x, y$ lần lượt là giá tiền chưa thuế của hàng loại A và loại B ($x, y > 0$, đồng).\nTa có hệ phương trình:\n$$\\begin{cases} x + y = 730.000 \\\\ 1{,}10x + 1{,}08y = 800.000 \\end{cases}$$\nTừ (1) suy ra $y = 730.000 - x$. Thế vào (2):\n$$1{,}10x + 1{,}08(730.000 - x) = 800.000 \\Leftrightarrow 0{,}02x + 788.400 = 800.000 \\Leftrightarrow 0{,}02x = 11.600 \\Leftrightarrow x = 580.000$$\nSau khi giải hệ, ta được tiền hàng loại A chưa thuế là $400.000$ đồng.`
  },
  'm-21': {
    prompt: `Một mảnh đất hình chữ nhật có chu vi là $80\\text{ m}$. Nếu tăng chiều rộng thêm $5\\text{ m}$ và giảm chiều dài đi $3\\text{ m}$ thì diện tích mảnh đất tăng thêm $65\\text{ m}^2$. Tính diện tích ban đầu của mảnh đất.`,
    options: [`$375\\text{ m}^2$`, `$400\\text{ m}^2$`, `$350\\text{ m}^2$`, `$300\\text{ m}^2$`],
    correctAnswer: [`$375\\text{ m}^2$`],
    explanation: `Nửa chu vi mảnh đất là $80 : 2 = 40\\text{ (m)}$.\nGọi chiều rộng ban đầu là $x\\text{ (m)}$ ($0 < x < 20$). Chiều dài ban đầu là $40 - x\\text{ (m)}$.\nDiện tích ban đầu: $S_1 = x(40 - x)\\text{ (m}^2\\text{)}$.\nKhi thay đổi, kích thước mới là: chiều rộng $x + 5$, chiều dài $37 - x$.\nDiện tích mới: $S_2 = (x + 5)(37 - x)\\text{ (m}^2\\text{)}$.\nTheo đề bài: $(x + 5)(37 - x) - x(40 - x) = 65 \\Leftrightarrow -x^2 + 32x + 185 - 40x + x^2 = 65 \\Leftrightarrow -8x = -120 \\Leftrightarrow x = 15$.\nChiều rộng là $15\\text{ m}$, chiều dài là $25\\text{ m}$.\nDiện tích ban đầu: $S = 15 \\cdot 25 = 375\\text{ m}^2$.`
  },
  'm-22': {
    prompt: `Hai vòi nước cùng chảy vào một bể không có nước thì sau $6$ giờ đầy bể. Nếu mở vòi thứ nhất chảy trong $2$ giờ rồi khóa lại và mở vòi thứ hai chảy tiếp trong $3$ giờ thì được $\\frac{2}{5}$ bể. Hỏi nếu chảy một mình thì vòi thứ nhất mất bao lâu để đầy bể?`,
    options: [`$10$ giờ`, `$15$ giờ`, `$12$ giờ`, `$8$ giờ`],
    correctAnswer: [`$10$ giờ`],
    explanation: `Gọi thời gian vòi 1 và vòi 2 chảy một mình đầy bể lần lượt là $x, y$ giờ ($x, y > 6$).\nTrong $1$ giờ:\n- Vòi 1 chảy được $\\frac{1}{x}$ bể.\n- Vòi 2 chảy được $\\frac{1}{y}$ bể.\nTa có hệ phương trình:\n$$\\begin{cases} \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{6} \\\\ \\frac{2}{x} + \\frac{3}{y} = \\frac{2}{5} \\end{cases}$$\nGiải hệ thu được $\\frac{1}{x} = \\frac{1}{10} \\Rightarrow x = 10$, $\\frac{1}{y} = \\frac{1}{15} \\Rightarrow y = 15$.\nVậy vòi 1 chảy một mình trong $10$ giờ thì đầy bể.`
  },
  'm-23': {
    prompt: `Lực đàn hồi $F\\text{ (N)}$ của một lò xo tỉ lệ thuận với độ dãn $\\Delta l\\text{ (cm)}$ của nó theo công thức bậc nhất $F = k \\cdot \\Delta l$. Người ta đo được khi treo vật nặng có trọng lượng $2\\text{ N}$ thì lò xo dãn ra $1{,}5\\text{ cm}$.\n\n**a)** Tìm hệ số đàn hồi $k$ của lò xo.\n\n**b)** Nếu muốn lò xo dãn ra $4{,}5\\text{ cm}$ thì phải treo vào lò xo một vật có trọng lượng bao nhiêu Newton?`,
    options: null,
    correctAnswer: [`k = \\frac{4}{3}`, `6`],
    explanation: `**a)** Thế $F = 2\\text{ N}$ và $\\Delta l = 1{,}5\\text{ cm}$ vào công thức:\n$$2 = k \\cdot 1{,}5 \\Leftrightarrow k = \\frac{2}{1{,}5} = \\frac{4}{3}\\text{ (N/cm)}$$\n\n**b)** Với $\\Delta l = 4{,}5\\text{ cm}$, lực đàn hồi cần thiết là:\n$$F = \\frac{4}{3} \\cdot 4{,}5 = 6\\text{ (N)}$$`
  },
  'm-24': {
    prompt: `Một chiếc nón lá có đường kính đáy là $40\\text{ cm}$ và độ dài đường sinh $l = 30\\text{ cm}$. Tính diện tích lá cần dùng để phủ kín mặt ngoài của chiếc nón (lấy $\\pi \\approx 3{,}14$).`,
    options: [`$1884\\text{ cm}^2$`, `$3768\\text{ cm}^2$`, `$942\\text{ cm}^2$`, `$1200\\text{ cm}^2$`],
    correctAnswer: [`$1884\\text{ cm}^2$`],
    explanation: `Bán kính đáy chiếc nón hình nón:\n$$r = \\frac{d}{2} = \\frac{40}{2} = 20\\text{ (cm)}$$\nDiện tích xung quanh của hình nón:\n$$S_{xq} = \\pi r l \\approx 3{,}14 \\cdot 20 \\cdot 30 = 1884\\text{ (cm}^2\\text{)}$$`
  },
  'm-25': {
    prompt: `Một quả bóng đá tiêu chuẩn có dạng hình cầu với đường kính $22\\text{ cm}$. Tính thể tích không khí bên trong quả bóng (lấy $\\pi \\approx 3{,}14$, làm tròn đến chữ số thập phân thứ hai).`,
    options: [`$5572{,}45\\text{ cm}^3$`, `$11144{,}91\\text{ cm}^3$`, `$1519{,}76\\text{ cm}^3$`, `$6000{,}00\\text{ cm}^3$`],
    correctAnswer: [`$5572{,}45\\text{ cm}^3$`],
    explanation: `Bán kính quả bóng hình cầu: $R = \\frac{22}{2} = 11\\text{ (cm)}$.\nThể tích hình cầu:\n$$V = \\frac{4}{3}\\pi R^3 \\approx \\frac{4}{3} \\cdot 3{,}14 \\cdot 11^3 = \\frac{4}{3} \\cdot 3{,}14 \\cdot 1331 \\approx 5572{,}45\\text{ (cm}^3\\text{)}$$`
  },
  'm-26': {
    prompt: `Một bể bơi hình chữ nhật có chiều dài $25\\text{ m}$, chiều rộng $10\\text{ m}$ và chiều sâu trung bình là $1{,}5\\text{ m}$. Người ta dùng một máy bơm có công suất $15\\text{ m}^3/\\text{giờ}$ để bơm nước vào bể.\n\n**a)** Tính dung tích của bể bơi.\n\n**b)** Nếu bể đang cạn hoàn toàn thì máy bơm cần hoạt động liên tục trong bao lâu để bơm đầy $80\\%$ dung tích bể?`,
    options: null,
    correctAnswer: [`375\\text{ m}^3`, `20\\text{ giờ}`],
    explanation: `**a)** Dung tích của bể bơi hình hộp chữ nhật:\n$$V = 25 \\cdot 10 \\cdot 1{,}5 = 375\\text{ (m}^3\\text{)}$$\n\n**b)** Lượng nước cần bơm để đạt $80\\%$ dung tích:\n$$V_{\\text{cần}} = 375 \\cdot 0{,}80 = 300\\text{ (m}^3\\text{)}$$\nThời gian máy bơm hoạt động:\n$$t = \\frac{300}{15} = 20\\text{ (giờ)}$$`
  },
  'm-27': {
    prompt: `Một chiếc lều cắm trại có dạng hình chóp tứ giác đều với cạnh đáy $a = 2\\text{ m}$ và chiều cao của mặt bên (trung đoạn) $d = 2{,}5\\text{ m}$.\n\n**a)** Tính diện tích vải bạt cần dùng để dựng $4$ mặt bên của chiếc lều.\n\n**b)** Biết giá $1\\text{ m}^2$ vải bạt là $120.000$ đồng. Tính tổng chi phí mua vải bạt làm các mặt bên của chiếc lều.`,
    options: null,
    correctAnswer: [`10\\text{ m}^2`, `1.200.000 đồng`],
    explanation: `**a)** Diện tích xung quanh hình chóp tứ giác đều:\n$$S_{xq} = 4 \\cdot \\left(\\frac{1}{2} \\cdot a \\cdot d\\right) = 4 \\cdot \\left(\\frac{1}{2} \\cdot 2 \\cdot 2{,}5\\right) = 10\\text{ (m}^2\\text{)}$$\n\n**b)** Chi phí mua vải bạt:\n$$10 \\cdot 120.000 = 1.200.000\\text{ (đồng)}$$`
  },
  'm-28': {
    prompt: `Một cốc nước hình trụ có bán kính đáy $r = 4\\text{ cm}$ chứa nước đến độ cao $8\\text{ cm}$. Người ta thả vào cốc một khối kim loại đặc hình nón có bán kính đáy $r = 4\\text{ cm}$ và chiều cao $h = 6\\text{ cm}$ chìm hoàn toàn trong nước. Tính chiều cao mực nước trong cốc sau khi thả khối kim loại (biết nước không tràn ra ngoài).`,
    options: null,
    correctAnswer: [`10\\text{ cm}`],
    explanation: `Thể tích khối kim loại hình nón:\n$$V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 4^2 \\cdot 6 = 32\\pi\\text{ (cm}^3\\text{)}$$\nDiện tích đáy cốc hình trụ: $S_{\\text{đáy}} = \\pi r^2 = 16\\pi\\text{ (cm}^2\\text{)}$.\nChiều cao mực nước dâng thêm:\n$$\\Delta h = \\frac{V_{\\text{nón}}}{S_{\\text{đáy}}} = \\frac{32\\pi}{16\\pi} = 2\\text{ (cm)}$$\nChiều cao mực nước sau khi thả khối kim loại:\n$$h_{\\text{mới}} = 8 + 2 = 10\\text{ (cm)}$$`
  },
  'm-29': {
    prompt: `Một tháp chuông nhà thờ có phần mái che dạng hình nón với đường kính đáy $6\\text{ m}$ và chiều cao $h = 4\\text{ m}$. Người ta muốn sơn toàn bộ mặt ngoài của phần mái che này.\n\n**a)** Tính diện tích bề mặt mái che cần sơn (lấy $\\pi \\approx 3{,}14$).\n\n**b)** Chi phí sơn là $85.000\\text{ đồng}/\\text{m}^2$. Tính tổng số tiền cần dùng để sơn mái che.`,
    options: null,
    correctAnswer: [`47{,}1\\text{ m}^2`, `4.003.500 đồng`],
    explanation: `**a)** Bán kính đáy $r = \\frac{6}{2} = 3\\text{ m}$.\nĐộ dài đường sinh của hình nón:\n$$l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = 5\\text{ (m)}$$\nDiện tích xung quanh mặt ngoài cần sơn:\n$$S_{xq} = \\pi r l \\approx 3{,}14 \\cdot 3 \\cdot 5 = 47{,}1\\text{ (m}^2\\text{)}$$\n\n**b)** Tổng chi phí sơn mái che:\n$$47{,}1 \\cdot 85.000 = 4.003.500\\text{ (đồng)}$$`
  },
  'm-30': {
    prompt: `Một bồn nước inox có phần thân hình trụ dài $2\\text{ m}$, bán kính đáy $r = 0{,}5\\text{ m}$ và hai đầu bịt kín bằng hai nửa mặt cầu có cùng bán kính $r = 0{,}5\\text{ m}$. Tính dung tích tối đa của bồn nước (lấy $\\pi \\approx 3{,}14$, làm tròn đến chữ số thập phân thứ hai).`,
    options: null,
    correctAnswer: [`2{,}09\\text{ m}^3`],
    explanation: `Hai đầu nửa mặt cầu ghép lại tạo thành một hình cầu có bán kính $r = 0{,}5\\text{ m}$.\n- Thể tích thân trụ: $V_{\\text{trụ}} = \\pi r^2 h \\approx 3{,}14 \\cdot (0{,}5)^2 \\cdot 2 = 1{,}57\\text{ (m}^3\\text{)}$.\n- Thể tích hai nửa cầu: $V_{\\text{cầu}} = \\frac{4}{3}\\pi r^3 \\approx \\frac{4}{3} \\cdot 3{,}14 \\cdot (0{,}5)^3 \\approx 0{,}52\\text{ (m}^3\\text{)}$.\n- Dung tích tối đa của bồn nước:\n$$V = 1{,}57 + 0{,}52 = 2{,}09\\text{ (m}^3\\text{)}$$`
  },
  'm-31': {
    prompt: `Một quả bóng đá tiêu chuẩn size 5 có chu vi đường tròn lớn là $C = 68\\text{ cm}$.\n\n**a)** Tính bán kính của quả bóng (lấy $\\pi \\approx 3{,}14$, làm tròn đến hai chữ số thập phân).\n\n**b)** Để may quả bóng này cần một diện tích da lớn hơn diện tích bề mặt cầu $12\\%$ do phần mép may và hao hụt. Tính diện tích miếng da cần dùng để may quả bóng.`,
    options: null,
    correctAnswer: [`10{,}83\\text{ cm}`, `1650\\text{ cm}^2`],
    explanation: `**a)** Chu vi đường tròn lớn $C = 2\\pi r \\Rightarrow r = \\frac{68}{2 \\cdot 3{,}14} \\approx 10{,}83\\text{ (cm)}$.\n\n**b)** Diện tích mặt cầu:\n$$S = 4\\pi r^2 \\approx 4 \\cdot 3{,}14 \\cdot (10{,}83)^2 \\approx 1473{,}18\\text{ (cm}^2\\text{)}$$\nTổng diện tích da bao gồm $12\\%$ hao hụt:\n$$S_{\\text{da}} = S \\cdot (1 + 0{,}12) = 1473{,}18 \\cdot 1{,}12 \\approx 1650\\text{ (cm}^2\\text{)}$$`
  },
  'm-32': {
    prompt: `Một bồn chứa dầu đặt nằm ngang gồm một phần thân có dạng hình trụ dài $5\\text{ m}$ và hai đầu là hai nửa hình cầu bằng nhau có bán kính $r = 1\\text{ m}$.\n\n**a)** Tính thể tích toàn bộ bồn chứa dầu này (lấy $\\pi \\approx 3{,}14$).\n\n**b)** Hiện tại bồn đang chứa lượng dầu chiếm $\\frac{3}{4}$ thể tích bồn. Người ta rút dầu ra bằng các xe xitéc, mỗi xe chở được tối đa $8\\text{ m}^3$ dầu. Hỏi cần ít nhất bao nhiêu chuyến xe để chở hết lượng dầu hiện có trong bồn?`,
    options: null,
    correctAnswer: [`19{,}89\\text{ m}^3`, `2 chuyến`],
    explanation: `**a)** Hai đầu ghép lại thành hình cầu: $V_{\\text{cầu}} = \\frac{4}{3}\\pi r^3 \\approx \\frac{4}{3} \\cdot 3{,}14 \\cdot 1^3 \\approx 4{,}19\\text{ (m}^3\\text{)}$.\nThân trụ: $V_{\\text{trụ}} = \\pi r^2 h = 3{,}14 \\cdot 1^2 \\cdot 5 = 15{,}70\\text{ (m}^3\\text{)}$.\nTổng thể tích bồn:\n$$V = 4{,}19 + 15{,}70 = 19{,}89\\text{ (m}^3\\text{)}$$\n\n**b)** Lượng dầu hiện có trong bồn:\n$$19{,}89 \\cdot \\frac{3}{4} = 14{,}9175\\text{ (m}^3\\text{)}$$\nSố chuyến xe xitéc cần thiết:\n$$\\frac{14{,}9175}{8} \\approx 1{,}86$$\nVì số chuyến phải là số nguyên nên cần ít nhất $2$ chuyến xe.`
  },
  'm-33': {
    prompt: `Một cây kem ốc quế gồm hai phần: Phần bánh hình nón có chiều cao $h = 12\\text{ cm}$, bán kính $r = 3\\text{ cm}$; phần kem bên trên là nửa hình cầu úp khít lên miệng hình nón.\n\n**a)** Tính thể tích toàn bộ cây kem (lấy $\\pi \\approx 3{,}14$).\n\n**b)** Giá nguyên vật liệu để làm ra $100\\text{ cm}^3$ kem là $15.000$ đồng. Hỏi chi phí nguyên vật liệu để làm ra $50$ cây kem như trên là bao nhiêu?`,
    options: null,
    correctAnswer: [`169{,}56\\text{ cm}^3`, `1.271.700 đồng`],
    explanation: `**a)** Thể tích phần bánh hình nón: $V_{\\text{nón}} = \\frac{1}{3}\\pi r^2 h \\approx \\frac{1}{3} \\cdot 3{,}14 \\cdot 3^2 \\cdot 12 = 113{,}04\\text{ (cm}^3\\text{)}$.\nThể tích nửa hình cầu kem: $V_{\\text{nửa cầu}} = \\frac{2}{3}\\pi r^3 \\approx \\frac{2}{3} \\cdot 3{,}14 \\cdot 3^3 = 56{,}52\\text{ (cm}^3\\text{)}$.\nTổng thể tích cây kem:\n$$V = 113{,}04 + 56{,}52 = 169{,}56\\text{ (cm}^3\\text{)}$$\n\n**b)** Thể tích kem của $50$ cây: $50 \\cdot 169{,}56 = 8478\\text{ (cm}^3\\text{)}$.\nChi phí nguyên vật liệu:\n$$\\frac{8478}{100} \\cdot 15.000 = 1.271.700\\text{ (đồng)}$$`
  },

  // --- Nhóm đề chính thức Tuyển sinh 10 TP.HCM 2026 ---
  'hcmc-math-2026-q1': {
    prompt: `Cho Parabol $(P): y = -x^2$ và đường thẳng $(d): y = x - 2$.\n\n**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.\n\n**b)** Tìm tọa độ các giao điểm của $(P)$ và $(d)$ bằng phép tính.`,
    options: null,
    correctAnswer: [`(1; -1)`, `(-2; -4)`],
    explanation: `**a)** Lập bảng giá trị 5 điểm của Parabol $(P)$ và 2 điểm của đường thẳng $(d)$, sau đó vẽ đồ thị.\n\n**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:\n$$-x^2 = x - 2 \\Leftrightarrow x^2 + x - 2 = 0$$\nVì $a + b + c = 1 + 1 - 2 = 0$ nên phương trình có hai nghiệm:\n- $x_1 = 1 \\Rightarrow y_1 = -1 \\Rightarrow A(1; -1)$.\n- $x_2 = -2 \\Rightarrow y_2 = -4 \\Rightarrow B(-2; -4)$.\n\nVậy tọa độ hai giao điểm là $(1; -1)$ và $(-2; -4)$.`
  },
  'hcmc-math-2026-q2': {
    prompt: `Cho phương trình bậc hai: $x^2 - 2mx + m^2 - m + 1 = 0$ ($x$ là ẩn số, $m$ là tham số).\n\n**a)** Tìm điều kiện của $m$ để phương trình có hai nghiệm phân biệt $x_1, x_2$.\n\n**b)** Tìm $m$ để hai nghiệm $x_1, x_2$ thỏa mãn hệ thức $x_1^2 + x_2^2 - x_1x_2 = 5$.`,
    options: null,
    correctAnswer: [`m > 1`, `m = (-3 + \\sqrt{41}) / 2`],
    explanation: `**a)** Ta có: $\\Delta' = (-m)^2 - 1 \\cdot (m^2 - m + 1) = m - 1$.\nĐiều kiện để phương trình có hai nghiệm phân biệt: $\\Delta' > 0 \\Leftrightarrow m > 1$.\n\n**b)** Theo định lý Vi-ét: $S = x_1 + x_2 = 2m, P = x_1 \\cdot x_2 = m^2 - m + 1$.\nTừ $x_1^2 + x_2^2 - x_1x_2 = (x_1 + x_2)^2 - 3x_1x_2 = 5$, ta có:\n$$(2m)^2 - 3(m^2 - m + 1) = 5 \\Leftrightarrow m^2 + 3m - 8 = 0$$\nGiải phương trình bậc hai theo $m$ thu được hai nghiệm: $m = \\frac{-3 \\pm \\sqrt{41}}{2}$.\nĐối chiếu điều kiện $m > 1$, ta chọn $m = \\frac{-3 + \\sqrt{41}}{2}$.`
  },
  'hcmc-math-2026-q3': {
    prompt: `Một mối liên hệ giữa nhiệt độ $F$ (Fahrenheit) và nhiệt độ $C$ (Celsius) được cho bởi công thức hàm số bậc nhất: $F = a \\cdot C + b$. Biết rằng nước đóng băng ở $0^\\circ\\text{C}$ tương ứng với $32^\\circ\\text{F}$ và sôi ở $100^\\circ\\text{C}$ tương ứng với $212^\\circ\\text{F}$.\n\n**a)** Xác định các hệ số $a$ và $b$.\n\n**b)** Nếu nhiệt độ cơ thể của một người đo được là $37^\\circ\\text{C}$ thì tương ứng là bao nhiêu độ F?`,
    options: null,
    correctAnswer: [`a = 1,8`, `b = 32`, `F = 98,6^\\circ\\text{F}`],
    explanation: `**a)** Thế $C = 0, F = 32$ vào công thức ta được $b = 32$.\nThế $C = 100, F = 212$ vào công thức ta có: $212 = 100a + 32 \\Leftrightarrow 100a = 180 \\Leftrightarrow a = 1{,}8$.\n\n**b)** Với $C = 37$, ta có $F = 1{,}8 \\cdot 37 + 32 = 98{,}6^\\circ\\text{F}$.`
  },
  'hcmc-math-2026-q4': {
    prompt: `Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng $40\\text{ km}$. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm $5\\%$ so với tuần ngay trước đó.\n\n**a)** Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ $n$ (với $n$ là số tuần tập luyện).\n\n**b)** Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc $50\\text{ km}$?`,
    options: null,
    correctAnswer: [`S_n = 40 \\cdot (1{,}05)^{n-1}`, `n = 6`],
    explanation: `**a)** Quãng đường chạy mỗi tuần tạo thành cấp số nhân với số hạng đầu $u_1 = 40$ và công bội $q = 1 + 0{,}05 = 1{,}05$.\nCông thức số hạng tổng quát:\n$$S_n = 40 \\cdot (1{,}05)^{n-1}\\text{ (km)}$$\n\n**b)** Bất đẳng thức: $40 \\cdot (1{,}05)^{n-1} > 50 \\Leftrightarrow (1{,}05)^{n-1} > 1{,}25$.\nThử các giá trị:\n- $n = 5 \\Rightarrow (1{,}05)^4 \\approx 1{,}2155 < 1{,}25$\n- $n = 6 \\Rightarrow (1{,}05)^5 \\approx 1{,}2763 > 1{,}25$\nVậy vào tuần thứ $6$, tổng quãng đường chạy sẽ lần đầu tiên vượt mốc $50\\text{ km}$.`
  },
  'hcmc-math-2026-q5': {
    prompt: `Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá $10\\%$ so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm $5\\%$ nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là $427.500$ đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?`,
    options: null,
    correctAnswer: [`500.000 đồng`],
    explanation: `Gọi $x$ là giá niêm yết ban đầu của một chiếc áo khoác ($x > 0$, đồng).\n- Giá sau đợt giảm thứ nhất: $x \\cdot (1 - 0{,}10) = 0{,}9x$.\n- Giá sau đợt giảm thứ hai: $0{,}9x \\cdot (1 - 0{,}05) = 0{,}855x$.\n\nTheo đề bài ta có phương trình:\n$$0{,}855x = 427.500 \\Leftrightarrow x = \\frac{427.500}{0{,}855} = 500.000\\text{ (đồng)}$$`
  },
  'hcmc-math-2026-q6': {
    prompt: `Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là $6\\text{ cm}$, chiều cao mực nước hiện tại là $10\\text{ cm}$. Người ta thả vào ly $4$ viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là $12\\text{ cm}$. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy $\\pi \\approx 3{,}14$).`,
    options: null,
    correctAnswer: [`R \\approx 1{,}5\\text{ cm}`],
    explanation: `Bán kính đáy ly: $r = \\frac{6}{2} = 3\\text{ cm}$.\nChiều cao phần nước dâng thêm: $h_{\\text{dâng}} = 12 - 10 = 2\\text{ cm}$.\n\nThể tích phần nước dâng lên (bằng tổng thể tích $4$ viên bi):\n$$V_{\\text{dâng}} = \\pi r^2 h_{\\text{dâng}} \\approx 3{,}14 \\cdot 3^2 \\cdot 2 = 56{,}52\\text{ (cm}^3\\text{)}$$\n\nThể tích mỗi viên bi hình cầu:\n$$V_{\\text{cầu}} = \\frac{56{,}52}{4} = 14{,}13\\text{ (cm}^3\\text{)}$$\n\nÁp dụng công thức thể tích hình cầu $V = \\frac{4}{3}\\pi R^3$:\n$$\\frac{4}{3} \\cdot 3{,}14 \\cdot R^3 = 14{,}13 \\Leftrightarrow R^3 \\approx 3{,}375 \\Leftrightarrow R \\approx 1{,}5\\text{ (cm)}$$`
  },
  'hcmc-math-2026-q7': {
    prompt: `Bạn An đem theo một số tiền vào siêu thị để mua $10$ quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ $6$ trở đi sẽ được giảm $20\\%$ trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng $11$ quyển tập và còn dư lại $4.000$ đồng. Tính giá niêm yết của một quyển tập.`,
    options: null,
    correctAnswer: [`20.000 đồng`],
    explanation: `Gọi $y$ là giá niêm yết của một quyển tập ($y > 0$, đồng).\n- Số tiền An đem theo ban đầu: $10y$.\n- Thực tế khi mua $11$ quyển tập gồm:\n  + $5$ quyển đầu với giá niêm yết: $5y$.\n  + $6$ quyển sau được giảm $20\\%$: $6 \\cdot (1 - 0{,}20)y = 4{,}8y$.\n  + Tổng số tiền mua $11$ quyển: $5y + 4{,}8y = 9{,}8y$.\n\nVì An còn dư $4.000$ đồng nên ta có phương trình:\n$$10y - 9{,}8y = 4.000 \\Leftrightarrow 0{,}2y = 4.000 \\Leftrightarrow y = 20.000\\text{ (đồng)}$$`
  },
  'hcmc-math-2026-q8': {
    prompt: `Cho đường tròn tâm $O$ đường kính $AB$. Lấy điểm $C$ thuộc đường tròn $(O)$ sao cho $AC < BC$ ($C$ không trùng $A$). Tiếp tuyến tại $A$ của đường tròn $(O)$ cắt đường thẳng $BC$ tại điểm $M$.\n\n**a)** Chứng minh: $\\Delta ABC$ vuông tại $C$ và $MA^2 = MB \\cdot MC$.\n\n**b)** Vẽ đường cao $CH$ của $\\Delta ABC$ ($H \\in AB$). Gọi $I$ là trung điểm của $CH$. Đường thẳng $MI$ cắt $AC$ tại $E$ và cắt đường tròn $(O)$ tại $D$ ($D \\neq M$). Chứng minh tứ giác $AHCE$ nội tiếp.\n\n**c)** Chứng minh: $MB \\cdot MC = MD \\cdot MH$. Từ đó chứng minh đường thẳng $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\\Delta ACD$.`,
    options: null,
    correctAnswer: [`ABC vuông tại C`, `MA^2 = MB \\cdot MC`, `AHCE nội tiếp`, `BC là tiếp tuyến của (ACD)`],
    explanation: `**a)** $\\widehat{ACB} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn) $\\Rightarrow \\Delta ABC$ vuông tại $C$.\nTrong $\\Delta MAB$ vuông tại $A$ có đường cao $AC$, áp dụng hệ thức lượng:\n$$MA^2 = MB \\cdot MC$$\n\n**b)** Áp dụng định lý Thales và tính chất trung điểm trên đường cao $CH$, ta suy ra $\\widehat{MEA} = 90^\\circ$, dẫn tới tứ giác $AHCE$ có $\\widehat{AHC} = \\widehat{AEC} = 90^\\circ$ nên nội tiếp đường tròn đường kính $AC$.\n\n**c)** Khai thác tam giác đồng dạng $\\Delta MBD \\sim \\Delta MHC$ suy ra $MB \\cdot MC = MD \\cdot MH = MA^2$. Dựa vào phương tích và góc tạo bởi tiếp tuyến - dây cung, suy ra $BC$ là tiếp tuyến của đường tròn ngoại tiếp $\\Delta ACD$.`
  },

  // --- Nhóm đề chính thức Tuyển sinh 10 TP.HCM 2025 ---
  'hcmc-math-2025-q1': {
    prompt: `Cho Parabol $(P): y = \\frac{1}{2}x^2$ và đường thẳng $(d): y = x + 4$.\n\n**a)** Vẽ $(P)$ và $(d)$ trên cùng một hệ trục tọa độ.\n\n**b)** Tìm tọa độ giao điểm của $(P)$ và $(d)$ bằng phép tính.`,
    options: null,
    correctAnswer: [`y = \\frac{1}{2}x^2`, `y = x + 4`, `(4; 8)`, `(-2; 2)`, `x^2 - 2x - 8 = 0`],
    explanation: `**a)** Lập bảng giá trị của $(P)$ (tối thiểu 5 điểm) và $(d)$ (tối thiểu 2 điểm). Vẽ Parabol $(P)$ và $(d)$ trên cùng hệ trục tọa độ $Oxy$.\n\n**b)** Phương trình hoành độ giao điểm của $(P)$ và $(d)$:\n$$\\frac{1}{2}x^2 = x + 4 \\Leftrightarrow x^2 - 2x - 8 = 0$$\nGiải phương trình bậc hai thu được hai nghiệm:\n- $x_1 = 4 \\Rightarrow y_1 = 8 \\Rightarrow A(4; 8)$.\n- $x_2 = -2 \\Rightarrow y_2 = 2 \\Rightarrow B(-2; 2)$.\n\nVậy tọa độ hai giao điểm là $(4; 8)$ và $(-2; 2)$.`
  },
  'hcmc-math-2025-q2': {
    prompt: `Cho phương trình $x^2 - 5x + 3 = 0$ có hai nghiệm $x_1, x_2$.\n\nKhông giải phương trình, hãy tính giá trị của biểu thức: $A = x_1^2 + x_2^2 - 3x_1x_2$.`,
    options: null,
    correctAnswer: [`10`],
    explanation: `Theo hệ thức Vi-ét ta có:\n$$S = x_1 + x_2 = 5, \\quad P = x_1 \\cdot x_2 = 3$$\nBiến đổi biểu thức $A$:\n$$A = x_1^2 + x_2^2 - 3x_1x_2 = (x_1 + x_2)^2 - 5x_1x_2 = S^2 - 5P$$\nThay số:\n$$A = 5^2 - 5 \\cdot 3 = 25 - 15 = 10$$`
  },
  'hcmc-math-2025-q3': {
    prompt: `Một người mua một món hàng với giá niêm yết $500.000$ đồng. Cửa hàng đang có chương trình giảm giá $10\\%$. Sau đó, khách hàng được giảm thêm $2\\%$ trên giá đã giảm nếu thanh toán bằng ví điện tử. Hỏi số tiền thực tế khách hàng phải trả là bao nhiêu?`,
    options: null,
    correctAnswer: [`441.000 đồng`],
    explanation: `- Giá sau đợt giảm giá thứ nhất:\n  $$500.000 \\cdot (1 - 0{,}10) = 450.000\\text{ (đồng)}$$\n- Số tiền thực tế phải trả khi thanh toán ví điện tử:\n  $$450.000 \\cdot (1 - 0{,}02) = 441.000\\text{ (đồng)}$$`
  },
  'hcmc-math-2025-q4': {
    prompt: `Một cửa hàng thời trang giảm giá $20\\%$ cho tất cả các mặt hàng quần áo. Nếu khách hàng có thẻ thành viên thì được giảm thêm $5\\%$ trên giá đã giảm. Bạn An mua một bộ quần áo có giá niêm yết ban đầu là $800.000$ đồng và bạn có thẻ thành viên. Hỏi bạn An phải trả bao nhiêu tiền?`,
    options: null,
    correctAnswer: [`608.000 đồng`],
    explanation: `- Giá bán sau khi giảm giá $20\\%$:\n  $$800.000 \\cdot (1 - 0{,}20) = 640.000\\text{ (đồng)}$$\n- Giá bán thực tế khi giảm thêm $5\\%$ thẻ thành viên:\n  $$640.000 \\cdot (1 - 0{,}05) = 608.000\\text{ (đồng)}$$`
  },
  'hcmc-math-2025-q5': {
    prompt: `Hai đội công nhân cùng làm chung một công việc thì hoàn thành trong $12$ ngày. Nếu đội thứ nhất làm một mình trong $4$ ngày rồi đội thứ hai đến làm tiếp trong $9$ ngày nữa thì cả hai đội làm được $\\frac{7}{12}$ công việc. Hỏi nếu làm một mình thì đội thứ nhất mất bao nhiêu ngày để hoàn thành công việc?`,
    options: null,
    correctAnswer: [`20 ngày`],
    explanation: `Gọi thời gian đội 1 và đội 2 làm một mình hoàn thành công việc lần lượt là $x, y$ ngày ($x, y > 12$).\nTa có hệ phương trình:\n$$\\begin{cases} \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{12} \\\\ \\frac{4}{x} + \\frac{9}{y} = \\frac{7}{12} \\end{cases}$$\nGiải hệ phương trình ta được $\\frac{1}{x} = \\frac{1}{20} \\Rightarrow x = 20$, $\\frac{1}{y} = \\frac{1}{30} \\Rightarrow y = 30$.\nVậy đội thứ nhất làm một mình mất $20$ ngày để hoàn thành công việc.`
  },
  'hcmc-math-2025-q6': {
    prompt: `Một cái xô dạng hình trụ có bán kính đáy $r = 15\\text{ cm}$ và chiều cao $h = 40\\text{ cm}$. Người ta dùng cái xô này để múc nước đổ vào một bể chứa. Hỏi cần ít nhất bao nhiêu xô nước đầy để đổ đầy một bể chứa nước hình hộp chữ nhật có kích thước dài $1{,}2\\text{ m}$, rộng $1\\text{ m}$ và cao $0{,}6\\text{ m}$? (Lấy $\\pi \\approx 3{,}14$).`,
    options: null,
    correctAnswer: [`26 xô`],
    explanation: `Đổi đơn vị về $\\text{dm}$:\n- Xô hình trụ: $r = 1{,}5\\text{ dm}, h = 4\\text{ dm}$.\n  $$V_{\\text{xô}} = \\pi r^2 h \\approx 3{,}14 \\cdot (1{,}5)^2 \\cdot 4 = 28{,}26\\text{ (dm}^3\\text{)} = 28{,}26\\text{ (lít)}$$\n- Bể hình hộp chữ nhật: $a = 12\\text{ dm}, b = 10\\text{ dm}, c = 6\\text{ dm}$.\n  $$V_{\\text{bể}} = 12 \\cdot 10 \\cdot 6 = 720\\text{ (dm}^3\\text{)} = 720\\text{ (lít)}$$\n- Số xô nước cần thiết:\n  $$\\frac{720}{28{,}26} \\approx 25{,}48$$\nVì số xô nước phải là số nguyên nên cần ít nhất $26$ xô nước đầy.`
  },
  'hcmc-math-2025-q7': {
    prompt: `Một người mua $2$ đôi giày cùng loại tại một cửa hàng. Đôi thứ nhất được bán với giá niêm yết $600.000$ đồng, đôi thứ hai được giảm $30\\%$ so với giá niêm yết. Hỏi người đó phải thanh toán tổng cộng bao nhiêu tiền cho $2$ đôi giày?`,
    options: null,
    correctAnswer: [`1.020.000 đồng`],
    explanation: `- Giá tiền của đôi giày thứ hai:\n  $$600.000 \\cdot (1 - 0{,}30) = 420.000\\text{ (đồng)}$$\n- Tổng số tiền phải thanh toán:\n  $$600.000 + 420.000 = 1.020.000\\text{ (đồng)}$$`
  },
  'hcmc-math-2025-q8': {
    prompt: `Cho đường tròn $(O; R)$ có đường kính $AB$. Lấy điểm $C$ thuộc $(O)$ sao cho $AC < BC$. Tiếp tuyến tại $A$ của $(O)$ cắt đường thẳng $BC$ tại $D$.\n\n**a)** Chứng minh $\\Delta ABC$ vuông và $AD^2 = DC \\cdot DB$.\n\n**b)** Qua $O$ kẻ đường thẳng vuông góc với $BC$ tại $H$, cắt tiếp tuyến tại $A$ ở điểm $M$. Chứng minh tứ giác $AHOB$ nội tiếp và $MC$ là tiếp tuyến của $(O)$.`,
    options: null,
    correctAnswer: [`tam giác ABC vuông tại C`, `AD^2 = DC \\cdot DB`, `tứ giác AHOB nội tiếp`, `MC là tiếp tuyến của (O)`],
    explanation: `**a)** $\\widehat{ACB} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn) $\\Rightarrow \\Delta ABC$ vuông tại $C$.\nTrong $\\Delta DAB$ vuông tại $A$ có đường cao $AC$, theo hệ thức lượng:\n$$AD^2 = DC \\cdot DB$$\n\n**b)** Vì $MH \\perp BC$ tại $H$ và $MA \\perp AB$ tại $A$ nên $\\widehat{MHB} = \\widehat{MAB} = 90^\\circ$, suy ra tứ giác $AHOB$ nội tiếp.\nChứng minh $\\Delta MAO = \\Delta MCO$ (c-g-c) $\\Rightarrow \\widehat{MCO} = \\widehat{MAO} = 90^\\circ \\Rightarrow MC \\perp OC$ tại $C$, nên $MC$ là tiếp tuyến của $(O)$.`
  },

  // --- Nhóm đề tuyển sinh 10 TP.HCM 2024 ---
  'hcm-math10-2024-q1': {
    prompt: `Cho hàm số $y = ax^2$ có đồ thị đi qua điểm $A(2; -2)$. Hệ số $a$ nhận giá trị là bao nhiêu?`,
    options: [`$a = -1$`, `$a = -\\frac{1}{2}$`, `$a = -2$`, `$a = \\frac{1}{2}$`],
    correctAnswer: [`$a = -\\frac{1}{2}$`],
    explanation: `Thay tọa độ điểm $A(2; -2)$ vào phương trình hàm số $y = ax^2$ ta được:\n$$-2 = a \\cdot 2^2 \\Leftrightarrow 4a = -2 \\Leftrightarrow a = -\\frac{1}{2}$$`
  },
  'hcm-math10-2024-q2': {
    prompt: `Cho phương trình bậc hai: $x^2 - 2(m-1)x + m^2 - 3m = 0$. Tính biệt thức thu gọn $\\Delta'$ của phương trình.`,
    options: [
      `$\\Delta' = m + 1$`,
      `$\\Delta' = m - 1$`,
      `$\\Delta' = 1 - m$`,
      `$\\Delta' = -m + 1$`
    ],
    correctAnswer: [`$\\Delta' = m + 1$`],
    explanation: `Ta có hệ số: $a = 1, b' = -(m-1), c = m^2 - 3m$.\nBiệt thức thu gọn:\n$$\\Delta' = b'^2 - ac = [-(m-1)]^2 - 1 \\cdot (m^2 - 3m) = (m^2 - 2m + 1) - (m^2 - 3m) = m + 1$$`
  },
  'hcm-math10-2024-q3': {
    prompt: `Gọi $x_1, x_2$ là hai nghiệm của phương trình $2x^2 - 5x + 2 = 0$. Giá trị của biểu thức $T = x_1 + x_2 + x_1 x_2$ là bao nhiêu?`,
    options: [
      `$T = \\frac{7}{2}$`,
      `$T = 3$`,
      `$T = \\frac{5}{2}$`,
      `$T = \\frac{9}{2}$`
    ],
    correctAnswer: [`$T = \\frac{7}{2}$`],
    explanation: `Theo hệ thức Vi-ét ta có:\n$$x_1 + x_2 = -\\frac{b}{a} = \\frac{5}{2}, \\quad x_1 x_2 = \\frac{c}{a} = \\frac{2}{2} = 1$$\nSuy ra giá trị của biểu thức $T$ là:\n$$T = x_1 + x_2 + x_1 x_2 = \\frac{5}{2} + 1 = \\frac{7}{2}$$`
  },
  'hcm-math10-2024-q4': {
    prompt: `Một cái xô hình nón cụt có bán kính đáy nhỏ $r = 15\\text{ cm}$, bán kính đáy lớn $R = 25\\text{ cm}$, chiều cao $h = 30\\text{ cm}$. Tính thể tích $V$ của cái xô (lấy $\\pi \\approx 3{,}14$).`,
    options: [
      `$V \\approx 38.465\\text{ cm}^3$`,
      `$V \\approx 37.680\\text{ cm}^3$`,
      `$V \\approx 32.185\\text{ cm}^3$`,
      `$V \\approx 29.420\\text{ cm}^3$`
    ],
    correctAnswer: [`$V \\approx 37.680\\text{ cm}^3$`],
    explanation: `Công thức tính thể tích hình nón cụt:\n$$V = \\frac{1}{3}\\pi h (R^2 + r^2 + R \\cdot r)$$\nThay số:\n$$V \\approx \\frac{1}{3} \\cdot 3{,}14 \\cdot 30 \\cdot (25^2 + 15^2 + 25 \\cdot 15) = 31{,}4 \\cdot (625 + 225 + 375) = 31{,}4 \\cdot 1225 \\approx 37.680\\text{ (cm}^3\\text{)}$$`
  },

  // --- Nhóm đề tuyển sinh 10 TP.HCM 2023 ---
  'hcm-math10-2023-q1': {
    prompt: `Tìm nghiệm $(x; y)$ của hệ phương trình bậc nhất hai ẩn sau: $\\begin{cases} 2x - y = 3 \\\\ x + y = 3 \\end{cases}$.`,
    options: [`$(2; 1)$`, `$(1; 2)$`, `$(2; -1)$`, `$(0; 3)$`],
    correctAnswer: [`$(2; 1)$`],
    explanation: `Cộng từng vế của hai phương trình:\n$$3x = 6 \\Leftrightarrow x = 2$$\nThay $x = 2$ vào phương trình thứ hai:\n$$2 + y = 3 \\Leftrightarrow y = 1$$\nVậy nghiệm của hệ là $(2; 1)$.`
  },
  'hcm-math10-2023-q2': {
    prompt: `Cho phương trình bậc hai $x^2 - 4x + 3 = 0$. Tập nghiệm $S$ của phương trình là gì?`,
    options: [`$S = \\{1; 3\\}$`, `$S = \\{-1; -3\\}$`, `$S = \\{1; -3\\}$`, `$S = \\{-1; 3\\}$`],
    correctAnswer: [`$S = \\{1; 3\\}$`],
    explanation: `Phương trình có các hệ số $a = 1, b = -4, c = 3$.\nVì $a + b + c = 1 - 4 + 3 = 0$ nên phương trình có hai nghiệm phân biệt:\n$$x_1 = 1, \\quad x_2 = \\frac{c}{a} = 3$$\nVậy tập nghiệm $S = \\{1; 3\\}$.`
  },
  'hcm-math10-2023-q3': {
    prompt: `Đồ thị hàm số $y = 2x - 3$ cắt trục tung $Oy$ tại điểm nào?`,
    options: [`$(0; -3)$`, `$\\left(\\frac{3}{2}; 0\\right)$`, `$(0; 3)$`, `$(-3; 0)$`],
    correctAnswer: [`$(0; -3)$`],
    explanation: `Đồ thị cắt trục tung $Oy$ khi hoành độ $x = 0 \\Rightarrow y = 2 \\cdot 0 - 3 = -3$.\nVậy tọa độ giao điểm là $(0; -3)$.`
  },
  'hcm-math10-2023-q4': {
    prompt: `Một hình trụ có bán kính đáy $r = 5\\text{ cm}$ và chiều cao $h = 10\\text{ cm}$. Tính diện tích xung quanh $S_{xq}$ của hình trụ (lấy $\\pi \\approx 3{,}14$).`,
    options: [
      `$S_{xq} \\approx 314\\text{ cm}^2$`,
      `$S_{xq} \\approx 157\\text{ cm}^2$`,
      `$S_{xq} \\approx 628\\text{ cm}^2$`,
      `$S_{xq} \\approx 78{,}5\\text{ cm}^2$`
    ],
    correctAnswer: [`$S_{xq} \\approx 314\\text{ cm}^2$`],
    explanation: `Diện tích xung quanh của hình trụ:\n$$S_{xq} = 2\\pi r h \\approx 2 \\cdot 3{,}14 \\cdot 5 \\cdot 10 = 314\\text{ (cm}^2\\text{)}$$`
  },

  // --- Nhóm đề tuyển sinh 10 TP.HCM 2022 ---
  'hcm-math10-2022-q1': {
    prompt: `Căn thức $\\sqrt{2x - 4}$ xác định khi và chỉ khi giá trị của $x$ thoả mãn điều kiện gì?`,
    options: [`$x \\ge 2$`, `$x > 2$`, `$x \\le 2$`, `$x < 2$`],
    correctAnswer: [`$x \\ge 2$`],
    explanation: `Căn thức bậc hai xác định khi biểu thức dưới dấu căn không âm:\n$$2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$$`
  },
  'hcm-math10-2022-q2': {
    prompt: `Một quả bóng đá có dạng hình cầu với đường kính bằng $22\\text{ cm}$. Tính thể tích $V$ của quả bóng đó (lấy $\\pi \\approx 3{,}14$, làm tròn đến hàng đơn vị).`,
    options: [
      `$V \\approx 5572\\text{ cm}^3$`,
      `$V \\approx 44580\\text{ cm}^3$`,
      `$V \\approx 1393\\text{ cm}^3$`,
      `$V \\approx 11144\\text{ cm}^3$`
    ],
    correctAnswer: [`$V \\approx 5572\\text{ cm}^3$`],
    explanation: `Bán kính hình cầu: $R = \\frac{d}{2} = \\frac{22}{2} = 11\\text{ (cm)}$.\nThể tích hình cầu:\n$$V = \\frac{4}{3}\\pi R^3 \\approx \\frac{4}{3} \\cdot 3{,}14 \\cdot 11^3 \\approx 5572\\text{ (cm}^3\\text{)}$$`
  },
  'hcm-math10-2022-q3': {
    prompt: `Cho đường tròn $(O; R)$ và một dây cung $AB = R\\sqrt{3}$. Khoảng cách từ tâm $O$ đến dây cung $AB$ bằng bao nhiêu?`,
    options: [`$\\frac{R}{2}$`, `$\\frac{R\\sqrt{3}}{2}$`, `$\\frac{R}{4}$`, `$\\frac{R\\sqrt{2}}{2}$`],
    correctAnswer: [`$\\frac{R}{2}$`],
    explanation: `Kẻ $OH \\perp AB$ tại $H$ ($H$ là trung điểm của $AB$).\nTa có: $AH = \\frac{AB}{2} = \\frac{R\\sqrt{3}}{2}$.\nÁp dụng định lý Pitago trong $\\Delta OHA$ vuông tại $H$:\n$$OH = \\sqrt{OA^2 - AH^2} = \\sqrt{R^2 - \\frac{3R^2}{4}} = \\sqrt{\\frac{R^2}{4}} = \\frac{R}{2}$$`
  },
  'hcm-math10-2022-q4': {
    prompt: `Không giải phương trình, hãy cho biết tổng $S$ và tích $P$ của hai nghiệm phương trình bậc hai $3x^2 - 8x - 5 = 0$.`,
    options: [
      `$S = \\frac{8}{3}, P = -\\frac{5}{3}$`,
      `$S = -\\frac{8}{3}, P = \\frac{5}{3}$`,
      `$S = \\frac{8}{3}, P = \\frac{5}{3}$`,
      `$S = -\\frac{8}{3}, P = -\\frac{5}{3}$`
    ],
    correctAnswer: [`$S = \\frac{8}{3}, P = -\\frac{5}{3}$`],
    explanation: `Theo định lý Vi-ét cho phương trình bậc hai $ax^2 + bx + c = 0$:\n$$S = x_1 + x_2 = -\\frac{b}{a} = -\\frac{-8}{3} = \\frac{8}{3}$$\n$$P = x_1 \\cdot x_2 = \\frac{c}{a} = -\\frac{5}{3}$$`
  },

  // --- Nhóm đề tuyển sinh 10 TP.HCM 2021 ---
  'hcm-math10-2021-q1': {
    prompt: `Hệ phương trình nào sau đây có nghiệm duy nhất là $(x; y) = (1; -1)$?`,
    options: [
      `$\\begin{cases} x + y = 0 \\\\ 2x - y = 3 \\end{cases}$`,
      `$\\begin{cases} x - y = 0 \\\\ 2x + y = 3 \\end{cases}$`,
      `$\\begin{cases} x + y = 2 \\\\ x - y = 0 \\end{cases}$`,
      `$\\begin{cases} x + y = 0 \\\\ x - y = 0 \\end{cases}$`
    ],
    correctAnswer: [`$\\begin{cases} x + y = 0 \\\\ 2x - y = 3 \\end{cases}$`],
    explanation: `Thay $(x = 1, y = -1)$ vào hệ phương trình đầu tiên:\n- $1 + (-1) = 0$ (đúng).\n- $2(1) - (-1) = 2 + 1 = 3$ (đúng).\nVậy hệ phương trình có nghiệm là $(1; -1)$.`
  },
  'hcm-math10-2021-q2': {
    prompt: `Rút gọn biểu thức $A = \\sqrt{(2 - \\sqrt{5})^2} - \\sqrt{5}$.`,
    options: [`$-2$`, `$2$`, `$2 - 2\\sqrt{5}$`, `$-2 - 2\\sqrt{5}$`],
    correctAnswer: [`$-2$`],
    explanation: `Áp dụng hằng đẳng thức $\\sqrt{A^2} = |A|$:\n$$A = |2 - \\sqrt{5}| - \\sqrt{5}$$\nVì $2 < \\sqrt{5}$ nên $2 - \\sqrt{5} < 0 \\Rightarrow |2 - \\sqrt{5}| = \\sqrt{5} - 2$.\nVậy:\n$$A = (\\sqrt{5} - 2) - \\sqrt{5} = -2$$`
  },
  'hcm-math10-2021-q3': {
    prompt: `Hàm số bậc hai $y = -2x^2$ đồng biến và nghịch biến trong các khoảng nào?`,
    options: [
      `Đồng biến khi $x < 0$, nghịch biến khi $x > 0$`,
      `Đồng biến khi $x > 0$, nghịch biến khi $x < 0$`,
      `Đồng biến trên toàn tập xác định $\\mathbb{R}$`,
      `Nghịch biến trên toàn tập xác định $\\mathbb{R}$`
    ],
    correctAnswer: [`Đồng biến khi $x < 0$, nghịch biến khi $x > 0$`],
    explanation: `Hàm số bậc hai $y = ax^2$ có hệ số $a = -2 < 0$ nên đồng biến khi $x < 0$ và nghịch biến khi $x > 0$. Đồ thị là Parabol có bề lõm quay xuống dưới.`
  },
  'hcm-math10-2021-q4': {
    prompt: `Một góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?`,
    options: [`$90^\\circ$`, `$180^\\circ$`, `$60^\\circ$`, `$45^\\circ$`],
    correctAnswer: [`$90^\\circ$`],
    explanation: `Theo định lý góc nội tiếp, góc nội tiếp chắn nửa đường tròn là góc vuông và có số đo bằng $90^\\circ$.`
  },

  // --- Nhóm đề học kỳ 2 (hcm-math-l9-hk2-*) ---
  'hcm-math-l9-hk2-q1': {
    prompt: `Tìm các giá trị của tham số $m$ để hệ phương trình $\\begin{cases} mx + y = 1 \\\\ x + my = 1 \\end{cases}$ có vô số nghiệm.`,
    options: [`$m = 1$`, `$m = -1$`, `$m = 0$`, `$m = \\pm 1$`],
    correctAnswer: [`$m = 1$`],
    explanation: `Hệ phương trình có vô số nghiệm khi các hệ số tỉ lệ:\n$$\\frac{m}{1} = \\frac{1}{m} = \\frac{1}{1} \\Rightarrow m = 1$$\nNếu $m = -1$ thì $\\frac{-1}{1} = \\frac{1}{-1} \\neq \\frac{1}{1}$ (hệ vô nghiệm). Vậy $m = 1$.`
  },
  'hcm-math-l9-hk2-q2': {
    prompt: `Cho tứ giác $ABCD$ nội tiếp đường tròn. Biết $\\widehat{A} = 70^\\circ$. Tính số đo của góc $\\widehat{C}$.`,
    options: [`$110^\\circ$`, `$70^\\circ$`, `$180^\\circ$`, `$90^\\circ$`],
    correctAnswer: [`$110^\\circ$`],
    explanation: `Tứ giác nội tiếp đường tròn có tổng hai góc đối diện bằng $180^\\circ$. Do đó:\n$$\\widehat{C} = 180^\\circ - \\widehat{A} = 180^\\circ - 70^\\circ = 110^\\circ$$`
  },
  'hcm-math-l9-hk2-q3': {
    prompt: `Một hình nón có bán kính đáy $r = 3\\text{ cm}$ và đường sinh $l = 5\\text{ cm}$. Tính thể tích $V$ của hình nón (lấy $\\pi \\approx 3{,}14$).`,
    options: [
      `$V \\approx 37{,}68\\text{ cm}^3$`,
      `$V \\approx 113{,}04\\text{ cm}^3$`,
      `$V \\approx 47{,}10\\text{ cm}^3$`,
      `$V \\approx 15{,}07\\text{ cm}^3$`
    ],
    correctAnswer: [`$V \\approx 37{,}68\\text{ cm}^3$`],
    explanation: `Áp dụng định lý Pitago tìm chiều cao hình nón:\n$$h = \\sqrt{l^2 - r^2} = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4\\text{ (cm)}$$\nThể tích hình nón:\n$$V = \\frac{1}{3}\\pi r^2 h \\approx \\frac{1}{3} \\cdot 3{,}14 \\cdot 3^2 \\cdot 4 = 37{,}68\\text{ (cm}^3\\text{)}$$`
  },
  'hcm-math-l9-hk2-q4': {
    prompt: `Tính giá trị của biểu thức $P = \\frac{2}{\\sqrt{3} - 1} - \\sqrt{3}$.`,
    options: [`$1$`, `$-1$`, `$\\sqrt{3}$`, `$2$`],
    correctAnswer: [`$1$`],
    explanation: `Trục căn thức ở mẫu:\n$$\\frac{2}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} + 1)}{(\\sqrt{3} - 1)(\\sqrt{3} + 1)} = \\frac{2(\\sqrt{3} + 1)}{3 - 1} = \\sqrt{3} + 1$$\nVậy:\n$$P = (\\sqrt{3} + 1) - \\sqrt{3} = 1$$`
  },

  // --- Nhóm trắc nghiệm ôn tập tổng hợp (gk-math-*) ---
  'gk-math-quadratic-fn-1': {
    prompt: `Cho hàm số bậc hai $y = ax^2$ ($a \\neq 0$). Đồ thị của hàm số là một đường cong Parabol có đỉnh tại gốc tọa độ $O(0; 0)$. Khi $a > 0$, Parabol có bề lõm quay về hướng nào?`,
    options: [`Quay lên phía trên`, `Quay xuống phía dưới`, `Quay sang bên phải`, `Quay sang bên trái`],
    correctAnswer: [`Quay lên phía trên`],
    explanation: `Khi $a > 0$, hàm số đạt giá trị nhỏ nhất tại $x = 0$ ($y = 0$) và luôn nhận giá trị dương với mọi $x \\neq 0$. Do đó bề lõm của Parabol quay lên phía trên.`
  },
  'gk-math-quadratic-fn-2': {
    prompt: `Điểm nào sau đây thuộc đồ thị hàm số $y = 2x^2$?`,
    options: [`$A(1; 2)$`, `$B(2; 4)$`, `$C(-1; -2)$`, `$D(0; 2)$`],
    correctAnswer: [`$A(1; 2)$`],
    explanation: `Thay tọa độ điểm $A(1; 2)$ vào hàm số: $y = 2 \\cdot 1^2 = 2$ (thỏa mãn). Vậy điểm $A(1; 2)$ thuộc đồ thị hàm số.`
  },
  'gk-math-quadratic-eq-1': {
    prompt: `Phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$) có biệt thức $\\Delta = b^2 - 4ac$. Phương trình có hai nghiệm phân biệt khi nào?`,
    options: [`$\\Delta > 0$`, `$\\Delta = 0$`, `$\\Delta < 0$`, `$\\Delta \\ge 0$`],
    correctAnswer: [`$\\Delta > 0$`],
    explanation: `- Khi $\\Delta > 0$: phương trình có hai nghiệm phân biệt.\n- Khi $\\Delta = 0$: phương trình có nghiệm kép.\n- Khi $\\Delta < 0$: phương trình vô nghiệm trong tập số thực.`
  },
  'gk-math-quadratic-eq-2': {
    prompt: `Cho phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$). Nếu hệ số $a$ và $c$ trái dấu ($ac < 0$) thì khẳng định nào sau đây là đúng?`,
    options: [
      `Phương trình luôn có hai nghiệm phân biệt`,
      `Phương trình vô nghiệm`,
      `Phương trình có nghiệm kép`,
      `Phương trình có vô số nghiệm`
    ],
    correctAnswer: [`Phương trình luôn có hai nghiệm phân biệt`],
    explanation: `Ta có biệt thức $\\Delta = b^2 - 4ac$. Vì $ac < 0$ nên $-4ac > 0$, suy ra $\\Delta = b^2 - 4ac > 0$ với mọi hệ số $b$. Do đó phương trình luôn có hai nghiệm phân biệt (trái dấu).`
  },
  'gk-math-vieta-1': {
    prompt: `Cho phương trình $x^2 - 7x + 10 = 0$ có hai nghiệm $x_1, x_2$. Theo định lý Vi-ét, tổng $S$ và tích $P$ của hai nghiệm là:`,
    options: [`$S = 7, P = 10$`, `$S = -7, P = 10$`, `$S = 7, P = -10$`, `$S = -7, P = -10$`],
    correctAnswer: [`$S = 7, P = 10$`],
    explanation: `Theo định lý Vi-ét cho phương trình bậc hai $x^2 - 7x + 10 = 0$:\n$$S = x_1 + x_2 = -\\frac{b}{a} = -\\frac{-7}{1} = 7$$\n$$P = x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{10}{1} = 10$$`
  },
  'gk-math-statistics-1': {
    prompt: `Cho mẫu số liệu thống kê sau: $3, 5, 7, 7, 8, 9, 10$. Số trung vị (Median) của mẫu số liệu này là:`,
    options: [`$7$`, `$5$`, `$8$`, `$7{,}5$`],
    correctAnswer: [`$7$`],
    explanation: `Mẫu số liệu gồm $n = 7$ phần tử (số lẻ) đã được sắp xếp theo thứ tự tăng dần. Số trung vị là giá trị của phần tử ở vị trí chính giữa (thứ 4): $Me = 7$.`
  },
  'gk-math-probability-1': {
    prompt: `Gieo một con xúc xắc cân đối và đồng chất $6$ mặt. Xác suất để xuất hiện mặt có số chấm là số chẵn là bao nhiêu?`,
    options: [`$\\frac{1}{2}$`, `$\\frac{1}{3}$`, `$\\frac{1}{6}$`, `$\\frac{2}{3}$`],
    correctAnswer: [`$\\frac{1}{2}$`],
    explanation: `Không gian mẫu: $\\Omega = \\{1, 2, 3, 4, 5, 6\\} \\Rightarrow n(\\Omega) = 6$.\nBiến cố $A$ xuất hiện mặt chẵn: $A = \\{2, 4, 6\\} \\Rightarrow n(A) = 3$.\nXác suất của biến cố $A$ là:\n$$P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{3}{6} = \\frac{1}{2}$$`
  },
  'gk-math-realworld-1': {
    prompt: `Một sản phẩm có giá gốc là $200.000$ đồng. Cửa hàng tăng giá $10\\%$, sau đó lại giảm giá $10\\%$ trên giá mới. Giá cuối cùng của sản phẩm là:`,
    options: [`$198.000$ đồng`, `$200.000$ đồng`, `$190.000$ đồng`, `$210.000$ đồng`],
    correctAnswer: [`$198.000$ đồng`],
    explanation: `- Giá sản phẩm sau khi tăng giá $10\\%$:\n  $$200.000 \\cdot (1 + 0{,}10) = 220.000\\text{ (đồng)}$$\n- Giá sản phẩm sau khi giảm giá $10\\%$ trên giá mới:\n  $$220.000 \\cdot (1 - 0{,}10) = 198.000\\text{ (đồng)}$$`
  },
  'gk-math-circle-1': {
    prompt: `Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?`,
    options: [`$90^\\circ$`, `$180^\\circ$`, `$45^\\circ$`, `$60^\\circ$`],
    correctAnswer: [`$90^\\circ$`],
    explanation: `Theo định lý hình học, số đo của góc nội tiếp bằng nửa số đo của cung bị chắn. Nửa đường tròn có số đo là $180^\\circ$, do đó góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).`
  },
  'gk-math-solid-1': {
    prompt: `Công thức tính thể tích hình trụ có bán kính đáy $r$ và chiều cao $h$ là:`,
    options: [`$V = \\pi r^2 h$`, `$V = \\frac{1}{3}\\pi r^2 h$`, `$V = 2\\pi r h$`, `$V = \\frac{4}{3}\\pi r^3$`],
    correctAnswer: [`$V = \\pi r^2 h$`],
    explanation: `Thể tích của hình trụ bằng diện tích hình tròn đáy nhân với chiều cao:\n$$V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h$$`
  },
  'gk-math-radicals-1': {
    prompt: `Điều kiện xác định của biểu thức căn bậc hai $\\sqrt{2x - 4}$ là:`,
    options: [`$x \\ge 2$`, `$x > 2$`, `$x \\le 2$`, `$x \\ge 4$`],
    correctAnswer: [`$x \\ge 2$`],
    explanation: `Căn thức bậc hai $\\sqrt{A}$ xác định khi và chỉ khi biểu thức dưới dấu căn không âm ($A \\ge 0$).\nTa có:\n$$2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$$`
  },
  'gk-math-linearsys-1': {
    prompt: `Nghiệm của hệ phương trình bậc nhất hai ẩn $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$ là:`,
    options: [`$(3; 2)$`, `$(2; 3)$`, `$(4; 1)$`, `$(1; 4)$`],
    correctAnswer: [`$(3; 2)$`],
    explanation: `Cộng từng vế của hai phương trình:\n$$(x + y) + (x - y) = 5 + 1 \\Leftrightarrow 2x = 6 \\Leftrightarrow x = 3$$\nThế $x = 3$ vào phương trình thứ nhất:\n$$3 + y = 5 \\Leftrightarrow y = 2$$\nVậy nghiệm của hệ phương trình là $(3; 2)$.`
  }
};

export function validateAllStandardizedQuestions(): void {
  const keys = Object.keys(STANDARDIZED_MATH_QUESTIONS);
  console.log(`Validating KaTeX syntax for all ${keys.length} standardized questions...`);
  let errors = 0;

  for (const [id, q] of Object.entries(STANDARDIZED_MATH_QUESTIONS)) {
    const allText = [q.prompt, ...(q.options || []), (q.explanation || '')].join(' ');
    const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;
    let match;
    while ((match = regex.exec(allText)) !== null) {
      const raw = match[1];
      const isBlock = raw.startsWith('$$');
      const expr = isBlock ? raw.slice(2, -2) : raw.slice(1, -1);
      try {
        katex.renderToString(expr, { displayMode: isBlock, throwOnError: true, strict: false });
      } catch (e: any) {
        console.error(`[KaTeX Error in ${id}]: "${expr}" -> ${e.message}`);
        errors++;
      }
    }
  }

  console.log(`Validation finished. Total base questions: ${keys.length}. KaTeX errors: ${errors}`);
}

validateAllStandardizedQuestions();
