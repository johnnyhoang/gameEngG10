export interface MathExamPartBlueprint {
  part: string;
  title: string;
  focus: string;
  commonQuestionForms: string[];
  answerModes: string[];
  importHint: string;
}

export const MATH_EXAM_BLUEPRINT: MathExamPartBlueprint[] = [
  {
    part: 'Bài 1',
    title: 'Parabol và đường thẳng',
    focus: 'Vẽ đồ thị hàm bậc hai, tìm giao điểm, kiểm tra nghiệm bằng phép tính.',
    commonQuestionForms: ['vẽ đồ thị', 'tìm giao điểm', 'phương trình hoành độ giao điểm'],
    answerModes: ['short-answer', 'numeric', 'expression', 'multi-part'],
    importHint: 'Lưu rõ bảng giá trị, phương trình giao điểm và tọa độ kết luận.'
  },
  {
    part: 'Bài 2',
    title: 'Phương trình bậc hai - Viète',
    focus: 'Điều kiện có hai nghiệm phân biệt và biến đổi biểu thức theo tổng, tích nghiệm.',
    commonQuestionForms: ['discriminant', 'viète', 'biểu thức nghiệm'],
    answerModes: ['short-answer', 'expression', 'multi-part'],
    importHint: 'Gắn công thức trung gian vào solutionSteps để tái hiện lập luận chấm điểm.'
  },
  {
    part: 'Bài 3',
    title: 'Hàm số bậc nhất và đổi đơn vị',
    focus: 'Lập hàm bậc nhất từ hai cặp giá trị và suy ra giá trị thực tế theo đơn vị.',
    commonQuestionForms: ['hàm bậc nhất', 'đổi nhiệt độ', 'hai điểm xác định hàm số'],
    answerModes: ['short-answer', 'numeric', 'multi-part'],
    importHint: 'Cần lưu rõ cặp dữ liệu mốc để UI hiển thị đúng phép thế a, b.'
  },
  {
    part: 'Bài 4',
    title: 'Tăng trưởng theo tỉ lệ phần trăm',
    focus: 'Mô hình tăng đều theo cấp số nhân từ dữ liệu thực tế như quãng đường, dân số, doanh thu.',
    commonQuestionForms: ['cấp số nhân', 'tăng trưởng %', 'mốc vượt ngưỡng'],
    answerModes: ['short-answer', 'numeric', 'multi-part'],
    importHint: 'Nên lưu công thức tổng quát và mốc cần tìm để hỗ trợ nhiều bước giải.'
  },
  {
    part: 'Bài 5',
    title: 'Giảm giá lũy tiến',
    focus: 'Tính giá sau nhiều lần giảm liên tiếp và truy ngược giá niêm yết ban đầu.',
    commonQuestionForms: ['giảm giá', 'khuyến mãi nhiều lần', 'tính ngược giá gốc'],
    answerModes: ['short-answer', 'numeric', 'multi-part'],
    importHint: 'Cần lưu hệ số giảm theo từng lần để AI tạo đúng lời giải ngược.'
  },
  {
    part: 'Bài 6',
    title: 'Thể tích và dâng nước',
    focus: 'Dùng thể tích hình trụ, hình cầu và độ chênh mực nước để suy bán kính.',
    commonQuestionForms: ['thể tích hình trụ', 'hình cầu', 'dâng nước'],
    answerModes: ['short-answer', 'numeric', 'multi-part'],
    importHint: 'Nên tách thể tích phần dâng và thể tích mỗi vật để dễ chấm tự động.'
  },
  {
    part: 'Bài 7',
    title: 'Mua hàng và khuyến mãi',
    focus: 'Quy đổi số tiền, giá niêm yết và mức giảm áp dụng cho các mốc mua khác nhau.',
    commonQuestionForms: ['mua hàng', 'khuyến mãi', 'bài toán giá bán'],
    answerModes: ['short-answer', 'numeric', 'multi-part'],
    importHint: 'Gắn đơn vị tiền trong solutionSteps và giữ rõ giả thiết về số lượng mua.'
  },
  {
    part: 'Bài 8',
    title: 'Hình học phẳng chứng minh',
    focus: 'Tiếp tuyến, tứ giác nội tiếp, đồng dạng, hệ thức lượng và phương tích.',
    commonQuestionForms: ['chứng minh', 'tứ giác nội tiếp', 'tiếp tuyến'],
    answerModes: ['proof', 'multi-part'],
    importHint: 'Nên nhập theo từng ý a/b/c và có diagramHint để hỗ trợ UI dựng hình.'
  }
];

export const MATH_TOPIC_LABELS: Record<string, string> = {
  'function-graph': 'Đồ thị hàm số',
  'quadratic-equation': 'Phương trình bậc hai',
  'linear-function': 'Hàm số bậc nhất',
  'growth-modeling': 'Tăng trưởng %',
  'percentage-discount': 'Giảm giá lũy tiến',
  'volume-displacement': 'Dâng nước - thể tích',
  'shopping-discount': 'Mua hàng khuyến mãi',
  'tangent-geometry': 'Tiếp tuyến & nội tiếp',
  'statistics-probability': 'Thống kê & xác suất',
  modeling: 'Mô hình hóa thực tế',
  'solid-geometry': 'Hình học không gian',
  finance: 'Tài chính thực tế',
  'plane-geometry': 'Hình học phẳng',
  mixed: 'Tổng hợp'
};

export const MATH_ANSWER_MODE_LABELS: Record<string, string> = {
  'single-choice': 'Trắc nghiệm',
  'short-answer': 'Tự luận ngắn',
  numeric: 'Điền số',
  expression: 'Biểu thức',
  proof: 'Chứng minh',
  'multi-part': 'Nhiều ý'
};
