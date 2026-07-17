export interface LiteratureExamPartBlueprint {
  part: string;
  title: string;
  focus: string;
  commonQuestionForms: string[];
  answerModes: string[];
  importHint: string;
}

export const LITERATURE_EXAM_BLUEPRINT: LiteratureExamPartBlueprint[] = [
  {
    part: 'Phần I',
    title: 'Đọc hiểu văn bản thơ',
    focus: 'Nhận diện phương thức biểu đạt, biện pháp tu từ, hình ảnh biểu tượng, giọng điệu và thông điệp.',
    commonQuestionForms: ['phương thức biểu đạt', 'biện pháp tu từ', 'tác dụng', 'bài học rút ra'],
    answerModes: ['single-choice', 'short-answer', 'multi-part'],
    importHint: 'Nên gắn metadata.textGenre = poetry và metadata.literatureTask để tách câu nhận biết, thông hiểu và vận dụng.'
  },
  {
    part: 'Phần I',
    title: 'Đọc hiểu văn bản truyện, kí, tản văn',
    focus: 'Tập trung vào chi tiết, nhân vật, tình huống truyện, tình cảm và thông điệp nghệ thuật.',
    commonQuestionForms: ['chi tiết nghệ thuật', 'tâm lí nhân vật', 'ý nghĩa nhan đề', 'thông điệp'],
    answerModes: ['single-choice', 'short-answer', 'multi-part'],
    importHint: 'Phù hợp với metadata.textGenre = prose và metadata.literatureTask = detail / character-analysis.'
  },
  {
    part: 'Phần I',
    title: 'Đọc hiểu văn bản nghị luận / thông tin',
    focus: 'Kiểm tra năng lực xác định luận điểm, lí lẽ, dẫn chứng, thao tác lập luận và bài học thực tiễn.',
    commonQuestionForms: ['luận điểm', 'dẫn chứng', 'từ khóa', 'hậu quả / bài học'],
    answerModes: ['single-choice', 'short-answer', 'multi-part'],
    importHint: 'Nên lưu thêm metadata.textGenre = argument hoặc informative để phân biệt với văn bản văn học.'
  },
  {
    part: 'Phần II',
    title: 'Tiếng Việt thực hành',
    focus: 'Biện pháp tu từ, thành phần câu, liên kết, nghĩa tường minh/hàm ý, từ Hán Việt và thành ngữ.',
    commonQuestionForms: ['biện pháp tu từ', 'thành phần biệt lập', 'nghĩa từ', 'liên kết câu'],
    answerModes: ['single-choice', 'short-answer'],
    importHint: 'Có thể gắn metadata.literatureTask = rhetoric hoặc vocabulary để lọc nhanh theo chuyên đề.'
  },
  {
    part: 'Phần III',
    title: 'Nghị luận xã hội',
    focus: 'Viết bài khoảng 500 chữ về một giá trị sống, hiện tượng đời sống hoặc thông điệp rút ra từ đọc hiểu.',
    commonQuestionForms: ['giải thích', 'phân tích ý nghĩa', 'phản đề', 'bài học hành động'],
    answerModes: ['short-answer', 'multi-part'],
    importHint: 'Mỗi đề nên lưu dàn ý gợi ý trong solutionSteps và key words trong correctAnswer để hỗ trợ chấm rubric.'
  },
  {
    part: 'Phần IV',
    title: 'Nghị luận văn học - thơ',
    focus: 'Cảm nhận đoạn thơ, hình ảnh, nhịp điệu, giọng điệu, khát vọng và liên hệ trách nhiệm thế hệ trẻ.',
    commonQuestionForms: ['cảm nhận đoạn thơ', 'hình ảnh nghệ thuật', 'khát vọng sống', 'liên hệ'],
    answerModes: ['short-answer', 'multi-part'],
    importHint: 'Nên tách metadata.literatureTask = poetry-analysis và solutionSteps theo bố cục mở bài - thân bài - kết bài.'
  },
  {
    part: 'Phần IV',
    title: 'Nghị luận văn học - truyện ngắn',
    focus: 'Phân tích nhân vật, tình huống truyện, chi tiết nghệ thuật, giá trị hiện thực và nhân đạo.',
    commonQuestionForms: ['phân tích nhân vật', 'chi tiết nghệ thuật', 'tình huống truyện', 'giá trị tác phẩm'],
    answerModes: ['short-answer', 'multi-part'],
    importHint: 'Mỗi câu nên lưu metadata.literatureTask = character-analysis hoặc prose-analysis để UI và import hiểu đúng dạng.'
  }
];

export const LITERATURE_TASK_LABELS: Record<string, string> = {
  'main-idea': 'Ý chính',
  detail: 'Chi tiết',
  rhetoric: 'Biện pháp tu từ',
  vocabulary: 'Tiếng Việt thực hành',
  message: 'Thông điệp',
  'social-essay': 'Nghị luận xã hội',
  'poetry-analysis': 'Nghị luận thơ',
  'prose-analysis': 'Nghị luận truyện / kí',
  'character-analysis': 'Phân tích nhân vật',
  comparison: 'So sánh / liên hệ'
};

export const LITERATURE_TEXT_GENRE_LABELS: Record<string, string> = {
  poetry: 'Thơ',
  prose: 'Truyện / kí / tản văn',
  argument: 'Nghị luận',
  informative: 'Thông tin',
  mixed: 'Hỗn hợp'
};

export const LITERATURE_ANSWER_MODE_LABELS: Record<string, string> = {
  'single-choice': 'Trắc nghiệm',
  'short-answer': 'Tự luận ngắn',
  'multi-part': 'Nhiều ý',
  proof: 'Lập luận',
  numeric: 'Điền số',
  expression: 'Biểu thức'
};
