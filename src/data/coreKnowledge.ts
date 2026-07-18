import type { CoreKnowledgeTopic, SubjectId, HamNguyenTo } from '../types/game';

// Bộ Nội Công Cốt Lõi (Core Knowledge Bank) — CORE_SPECS §9
// Được tải động từ Database qua store topics. Dưới đây là danh sách chuyên đề chính thức khớp 100% với DB.

export const CORE_KNOWLEDGE_TOPICS: CoreKnowledgeTopic[] = [
  // English
  {
    id: 'eng-grammar',
    subjectId: 'english',
    group: 'co_ban',
    label: 'Ngữ pháp lõi',
    hamNguyenTo: 'thach',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Hệ thống hóa các điểm thường ra nhất trong đề lớp 10 và bám sát năng lực giao tiếp thực hành.',
  },
  {
    id: 'eng-pronunciation',
    subjectId: 'english',
    group: 'co_ban',
    label: 'Phát âm và trọng âm',
    hamNguyenTo: 'hoa',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Luyện nhận diện đuôi -ed/-s, nguyên âm, phụ âm và quy tắc nhấn âm.',
  },
  {
    id: 'eng-reading',
    subjectId: 'english',
    group: 'co_ban',
    label: 'Đọc hiểu và điền khuyết',
    hamNguyenTo: 'bang',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Tập trung đọc ý chính, từ nối, đại từ tham chiếu và ngữ cảnh đoạn văn.',
  },
  {
    id: 'eng-rewrite',
    subjectId: 'english',
    group: 'co_ban',
    label: 'Viết lại câu',
    hamNguyenTo: 'phong',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['rewrite'],
    description: 'Rèn chuyển đổi cấu trúc câu nhanh, gọn, đúng chuẩn chấm điểm.',
  },

  // Math
  {
    id: 'math-quadratic',
    subjectId: 'math',
    group: 'co_ban',
    label: 'Hàm số và phương trình bậc hai',
    hamNguyenTo: 'thach',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Bài trọng tâm của toán vào 10: parabol, hoành độ giao điểm, Vi-ét và tham số.',
  },
  {
    id: 'math-real',
    subjectId: 'math',
    group: 'co_ban',
    label: 'Bài toán thực tế',
    hamNguyenTo: 'bang',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Các câu vận dụng số liệu, phần trăm, tăng giảm giá, năng suất và chuyển động.',
  },
  {
    id: 'math-plane',
    subjectId: 'math',
    group: 'co_ban',
    label: 'Hình học phẳng',
    hamNguyenTo: 'hoa',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Ôn các hệ thức trong tam giác vuông, đường tròn, tiếp tuyến và tứ giác nội tiếp.',
  },
  {
    id: 'math-solid',
    subjectId: 'math',
    group: 'co_ban',
    label: 'Hình học không gian',
    hamNguyenTo: 'phong',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Nắm công thức thể tích, diện tích xung quanh và bài toán liên hệ thực tế.',
  },

  // Literature
  {
    id: 'lit-reading',
    subjectId: 'literature',
    group: 'co_ban',
    label: 'Đọc hiểu văn bản',
    hamNguyenTo: 'thach',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Phân biệt thơ, truyện, kí và văn bản nghị luận; rút ý, tìm biện pháp nghệ thuật và thông điệp.',
  },
  {
    id: 'lit-vietnamese',
    subjectId: 'literature',
    group: 'co_ban',
    label: 'Tiếng Việt',
    hamNguyenTo: 'hoa',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Ôn các lớp từ, thành phần câu, phép liên kết, từ Hán Việt và lỗi diễn đạt.',
  },
  {
    id: 'lit-essay',
    subjectId: 'literature',
    group: 'co_ban',
    label: 'Viết đoạn và bài nghị luận',
    hamNguyenTo: 'bang',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Luyện bố cục, luận điểm, luận cứ và cách triển khai đoạn văn 200 chữ.',
  },
  {
    id: 'lit-analysis',
    subjectId: 'literature',
    group: 'co_ban',
    label: 'Nghị luận văn học',
    hamNguyenTo: 'phong',
    examRelevance: 'high',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Rèn dàn ý cảm nhận tác phẩm, nhân vật và hình ảnh thơ theo hướng ngắn gọn, rõ ý.',
  },

  // Science
  {
    id: 'sci-physics',
    subjectId: 'science',
    group: 'co_ban',
    label: 'Vật lý (Lớp 9)',
    hamNguyenTo: 'thach',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Hệ thống hóa lý thuyết Điện học, Điện từ học, Quang học và Sự bảo toàn năng lượng.',
  },
  {
    id: 'sci-chemistry',
    subjectId: 'science',
    group: 'co_ban',
    label: 'Hóa học (Lớp 9)',
    hamNguyenTo: 'hoa',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Các hợp chất vô cơ, Kim loại, Phi kim và Sơ lược hóa học hữu cơ.',
  },
  {
    id: 'sci-biology',
    subjectId: 'science',
    group: 'co_ban',
    label: 'Sinh học (Lớp 9)',
    hamNguyenTo: 'bang',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Di truyền học, Biến dị, Sinh vật và Môi trường sống.',
  },

  // History & Geography
  {
    id: 'hist-history',
    subjectId: 'history_geography',
    group: 'co_ban',
    label: 'Lịch sử lớp 9',
    hamNguyenTo: 'thach',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Lịch sử thế giới hiện đại từ 1945 và tiến trình cách mạng Việt Nam từ năm 1919.',
  },
  {
    id: 'hist-geography',
    subjectId: 'history_geography',
    group: 'co_ban',
    label: 'Địa lý lớp 9',
    hamNguyenTo: 'hoa',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Địa lý dân cư Việt Nam và sự phát triển, phân bố của các ngành kinh tế.',
  },

  // Civics
  {
    id: 'civ-civics',
    subjectId: 'civics',
    group: 'co_ban',
    label: 'Đạo đức & Pháp luật',
    hamNguyenTo: 'bang',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Nghĩa vụ công dân, quyền tự do dân chủ và trách nhiệm với gia đình, xã hội.',
  },

  // Technology
  {
    id: 'tech-technology',
    subjectId: 'technology',
    group: 'co_ban',
    label: 'Công nghệ lắp đặt & Đời sống',
    hamNguyenTo: 'phong',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Lý thuyết mạch điện sinh hoạt trong nhà và quy trình lắp đặt an toàn.',
  },

  // Informatics
  {
    id: 'info-informatics',
    subjectId: 'informatics',
    group: 'co_ban',
    label: 'Lập trình & Mạng máy tính',
    hamNguyenTo: 'loi',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Tư duy thuật toán căn bản ( Scratch / Python ), Cơ sở dữ liệu và sử dụng Internet an toàn.',
  },

  // Arts
  {
    id: 'arts-arts',
    subjectId: 'arts',
    group: 'co_ban',
    label: 'Âm nhạc & Mỹ thuật',
    hamNguyenTo: 'thuy',
    examRelevance: 'medium',
    minQuestions: 30,
    questionTypes: ['mcq'],
    description: 'Nhạc lý cơ bản, các nhạc sĩ tiêu biểu và Mỹ thuật ứng dụng vẽ tranh đề tài.',
  }
];

export function getTopicsBySubject(subjectId: SubjectId): CoreKnowledgeTopic[] {
  return CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === subjectId);
}

export function getTopicsByHam(ham: HamNguyenTo): CoreKnowledgeTopic[] {
  return CORE_KNOWLEDGE_TOPICS.filter(t => t.hamNguyenTo === ham);
}

export function getTopicById(id: string): CoreKnowledgeTopic | undefined {
  return CORE_KNOWLEDGE_TOPICS.find(t => t.id === id);
}

export function getTopicsBySubjectAndHam(subjectId: SubjectId, ham: HamNguyenTo): CoreKnowledgeTopic[] {
  return CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === subjectId && t.hamNguyenTo === ham);
}

export function getHighPriorityTopics(subjectId: SubjectId): CoreKnowledgeTopic[] {
  return CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === subjectId && t.examRelevance === 'high');
}

export function inferTopicId(category: string, subjectId?: SubjectId): string {
  const normalizedCategory = category.toLowerCase().trim();
  
  // Ánh xạ nhanh dựa trên từ khóa trong category
  if (normalizedCategory.includes('ngữ pháp') || normalizedCategory.includes('grammar')) return 'eng-grammar';
  if (normalizedCategory.includes('phát âm') || normalizedCategory.includes('pronunciation') || normalizedCategory.includes('trọng âm') || normalizedCategory.includes('stress')) return 'eng-pronunciation';
  if (normalizedCategory.includes('đọc hiểu') || normalizedCategory.includes('reading') || normalizedCategory.includes('điền khuyết') || normalizedCategory.includes('cloze')) return 'eng-reading';
  if (normalizedCategory.includes('viết lại') || normalizedCategory.includes('rewrite') || normalizedCategory.includes('sentence')) return 'eng-rewrite';

  if (normalizedCategory.includes('quadratic') || normalizedCategory.includes('bậc hai') || normalizedCategory.includes('parabol')) return 'math-quadratic';
  if (normalizedCategory.includes('thực tế') || normalizedCategory.includes('modeling') || normalizedCategory.includes('percent')) return 'math-real';
  if (normalizedCategory.includes('hình học phẳng') || normalizedCategory.includes('plane') || normalizedCategory.includes('đường tròn') || normalizedCategory.includes('tam giác')) return 'math-plane';
  if (normalizedCategory.includes('không gian') || normalizedCategory.includes('solid') || normalizedCategory.includes('thể tích')) return 'math-solid';

  if (normalizedCategory.includes('tiếng việt')) return 'lit-vietnamese';
  if (normalizedCategory.includes('đọc hiểu')) return 'lit-reading';
  if (normalizedCategory.includes('nghị luận xã hội') || normalizedCategory.includes('đoạn văn')) return 'lit-essay';
  if (normalizedCategory.includes('nghị luận văn học') || normalizedCategory.includes('tác phẩm')) return 'lit-analysis';

  if (subjectId) {
    if (subjectId === 'science') {
      if (normalizedCategory.includes('vật lý') || normalizedCategory.includes('physics') || normalizedCategory.includes('điện')) return 'sci-physics';
      if (normalizedCategory.includes('hóa học') || normalizedCategory.includes('chemistry')) return 'sci-chemistry';
      return 'sci-biology';
    }
    if (subjectId === 'history_geography') {
      if (normalizedCategory.includes('lịch sử') || normalizedCategory.includes('history')) return 'hist-history';
      return 'hist-geography';
    }
    const fallback = CORE_KNOWLEDGE_TOPICS.find(t => t.subjectId === subjectId);
    if (fallback) return fallback.id;
  }
  return 'misc';
}
