import type { HamNguyenTo } from '../types/game';

export interface TextbookInfo {
  loai: string;
  bai: number;
  hamNguyenTo: HamNguyenTo;
}

export interface DungeonDetail {
  id: HamNguyenTo;
  label: string;
  desc: string;
  bg: string;
}

export const DUNGEONS_CONFIG: Record<HamNguyenTo, DungeonDetail> = {
  thach: {
    id: 'thach',
    label: '🪨 Thạch Hầm',
    desc: 'Kiến thức nền tảng, quy tắc cốt lõi',
    bg: 'bg-stone-500/[0.02] border-stone-500/15 text-stone-400 hover:border-stone-500/40'
  },
  hoa: {
    id: 'hoa',
    label: '🔥 Hỏa Hầm',
    desc: 'Phản xạ nhanh, ghi nhớ ngắn hạn',
    bg: 'bg-orange-500/[0.02] border-orange-500/15 text-orange-400 hover:border-orange-500/40'
  },
  bang: {
    id: 'bang',
    label: '❄️ Băng Hầm',
    desc: 'Suy luận logic sâu, điềm tĩnh',
    bg: 'bg-cyan-500/[0.02] border-cyan-500/15 text-synth-cyan hover:border-cyan-500/40'
  },
  phong: {
    id: 'phong',
    label: '🌀 Phong Hầm',
    desc: 'Tốc độ nhạy bén, linh hoạt',
    bg: 'bg-teal-500/[0.02] border-teal-500/15 text-teal-400 hover:border-teal-500/40'
  },
  loi: {
    id: 'loi',
    label: '⚡ Lôi Hầm',
    desc: 'Đột phá tư duy, phản xạ tức thì',
    bg: 'bg-yellow-500/[0.02] border-yellow-500/15 text-yellow-400 hover:border-yellow-500/40'
  },
  thuy: {
    id: 'thuy',
    label: '💧 Thủy Hầm',
    desc: 'Mềm mại uyển chuyển, liên kết kiến thức',
    bg: 'bg-blue-500/[0.02] border-blue-500/15 text-blue-400 hover:border-blue-500/40'
  },
  moc: {
    id: 'moc',
    label: '🌿 Mộc Hầm',
    desc: 'Sinh trưởng bền bỉ, kiên trì',
    bg: 'bg-green-500/[0.02] border-green-500/15 text-green-400 hover:border-green-500/40'
  },
  kim: {
    id: 'kim',
    label: '🪙 Kim Hầm',
    desc: 'Sắc bén kiên cố, thực chiến cao',
    bg: 'bg-gray-400/[0.02] border-gray-400/15 text-gray-300 hover:border-gray-400/40'
  },
  quang: {
    id: 'quang',
    label: '☀️ Quang Hầm',
    desc: 'Sáng suốt khai mở, lý thuyết chuyên sâu',
    bg: 'bg-amber-400/[0.02] border-amber-400/15 text-amber-300 hover:border-amber-400/40'
  },
  am: {
    id: 'am',
    label: '🔮 Ám Hầm',
    desc: 'Bí ẩn thâm sâu, chinh phục thử thách',
    bg: 'bg-purple-500/[0.02] border-purple-500/15 text-purple-400 hover:border-purple-500/40'
  }
};

const ENGLISH_ALIASES: Record<HamNguyenTo, { label: string; desc: string }> = {
  thach: { label: '🪨 Grammar Sanctuary', desc: 'Master core structures & syntax rules' },
  hoa: { label: '🔥 Vocabulary Keep', desc: 'Expand lexical range & active word usage' },
  bang: { label: '❄️ Reading Citadel', desc: 'Deep text comprehension & critical analysis' },
  phong: { label: '🌀 Phonetics Valley', desc: 'Perfect your pronunciation & word stress' },
  loi: { label: '⚡ Rewrite Arena', desc: 'Fast sentence transforms & functional writing' },
  thuy: { label: '💧 Writing Spring', desc: 'Creative composition & flowing paragraphs' },
  moc: { label: '🌿 Conversation Grove', desc: 'Interactive dialogues & daily English' },
  kim: { label: '🪙 Listening Vault', desc: 'Accents training & deep audio decoding' },
  quang: { label: '☀️ Idiom Beacon', desc: 'Unravel advanced idioms & phrasal verbs' },
  am: { label: '🔮 Slang Abyss', desc: 'Explore modern slangs & informal speech' }
};

export function getDungeonConfig(ham: HamNguyenTo, subject?: string): DungeonDetail {
  const details = DUNGEONS_CONFIG[ham];
  const normSubject = (subject || '').toLowerCase().trim();
  if (normSubject === 'english') {
    const alias = ENGLISH_ALIASES[ham];
    return {
      id: ham,
      label: alias?.label || details.label,
      desc: alias?.desc || details.desc,
      bg: details.bg
    };
  }
  return details;
}

// Mapear subject & normalized topic/category key to SGK details
const MATH_MAP: Record<string, { loai: string; bai: number; ham: HamNguyenTo }> = {
  // Đại số
  'math-quadratic-function': { loai: 'Đại số', bai: 1, ham: 'thach' },
  'quadratic-function': { loai: 'Đại số', bai: 1, ham: 'thach' },
  'parabol-line': { loai: 'Đại số', bai: 2, ham: 'thach' },
  'math-quadratic-equation': { loai: 'Đại số', bai: 3, ham: 'thach' },
  'quadratic-equation': { loai: 'Đại số', bai: 3, ham: 'thach' },
  'math-quadratic-formula': { loai: 'Đại số', bai: 4, ham: 'thach' },
  'math-quadratic-discriminant': { loai: 'Đại số', bai: 5, ham: 'thach' },
  'math-vieta': { loai: 'Đại số', bai: 6, ham: 'thach' },
  'vieta': { loai: 'Đại số', bai: 6, ham: 'thach' },
  'viet-relation': { loai: 'Đại số', bai: 6, ham: 'thach' },
  'math-viet-advanced': { loai: 'Đại số', bai: 7, ham: 'thach' },
  'math-linear-system': { loai: 'Đại số', bai: 8, ham: 'thach' },
  'linear-system': { loai: 'Đại số', bai: 8, ham: 'thach' },
  'math-system-eq-1': { loai: 'Đại số', bai: 9, ham: 'thach' },
  'math-system-eq-2': { loai: 'Đại số', bai: 10, ham: 'thach' },
  'math-inequality': { loai: 'Đại số', bai: 11, ham: 'thach' },
  'inequality': { loai: 'Đại số', bai: 11, ham: 'thach' },
  'math-inequality-concept': { loai: 'Đại số', bai: 12, ham: 'thach' },
  'math-inequality-cauchy': { loai: 'Đại số', bai: 13, ham: 'thach' },
  'math-linear-inequality-1': { loai: 'Đại số', bai: 14, ham: 'thach' },
  'math-linear-inequality-2': { loai: 'Đại số', bai: 15, ham: 'thach' },
  'math-real-world-algebra': { loai: 'Đại số', bai: 16, ham: 'thach' },
  'real-world-algebra': { loai: 'Đại số', bai: 16, ham: 'thach' },
  'math-real-world-percent': { loai: 'Đại số', bai: 17, ham: 'thach' },
  'real-world-percent': { loai: 'Đại số', bai: 17, ham: 'thach' },
  'math-radicals': { loai: 'Đại số', bai: 18, ham: 'thach' },
  'radicals': { loai: 'Đại số', bai: 18, ham: 'thach' },
  'math-rational-expression': { loai: 'Đại số', bai: 19, ham: 'thach' },
  'math-eq-product': { loai: 'Đại số', bai: 20, ham: 'thach' },
  'math-eq-rational': { loai: 'Đại số', bai: 21, ham: 'thach' },
  'math-parabol-general': { loai: 'Đại số', bai: 22, ham: 'thach' },
  'math-quadratic-applied': { loai: 'Đại số', bai: 23, ham: 'thach' },

  // Hình học và Đo lường
  'math-plane-geometry-circle': { loai: 'Hình học và Đo lường', bai: 1, ham: 'hoa' },
  'plane-geometry': { loai: 'Hình học và Đo lường', bai: 1, ham: 'hoa' },
  'math-plane-geometry-triangle': { loai: 'Hình học và Đo lường', bai: 2, ham: 'hoa' },
  'math-plane-geometry-cyclic': { loai: 'Hình học và Đo lường', bai: 3, ham: 'hoa' },
  'math-plane-geometry-coordinates': { loai: 'Hình học và Đo lường', bai: 4, ham: 'hoa' },
  'math-solid-geometry-volume': { loai: 'Hình học và Đo lường', bai: 5, ham: 'hoa' },
  'solid-geometry': { loai: 'Hình học và Đo lường', bai: 5, ham: 'hoa' },
  'math-solid-geometry-3d': { loai: 'Hình học và Đo lường', bai: 6, ham: 'hoa' },
  'math-trigonometry': { loai: 'Hình học và Đo lường', bai: 7, ham: 'hoa' },
  'math-plane-geom': { loai: 'Hình học và Đo lường', bai: 8, ham: 'hoa' },
  'math-space-geom': { loai: 'Hình học và Đo lường', bai: 9, ham: 'hoa' },
  'math-trig-ratio': { loai: 'Hình học và Đo lường', bai: 10, ham: 'hoa' },
  'math-trig-applied-1': { loai: 'Hình học và Đo lường', bai: 11, ham: 'hoa' },
  'math-trig-applied-2': { loai: 'Hình học và Đo lường', bai: 12, ham: 'hoa' },
  'math-circle-angle-1': { loai: 'Hình học và Đo lường', bai: 13, ham: 'hoa' },
  'math-circle-angle-2': { loai: 'Hình học và Đo lường', bai: 14, ham: 'hoa' },
  'math-circle-tangent-1': { loai: 'Hình học và Đo lường', bai: 15, ham: 'hoa' },
  'math-circle-tangent-2': { loai: 'Hình học và Đo lường', bai: 16, ham: 'hoa' },
  'math-right-triangle-ratio': { loai: 'Hình học và Đo lường', bai: 17, ham: 'hoa' },
  'math-right-triangle-ratio-2': { loai: 'Hình học và Đo lường', bai: 18, ham: 'hoa' },
  'math-trig-relations': { loai: 'Hình học và Đo lường', bai: 19, ham: 'hoa' },
  'math-circle-concept': { loai: 'Hình học và Đo lường', bai: 20, ham: 'hoa' },
  'math-circle-position': { loai: 'Hình học và Đo lường', bai: 21, ham: 'hoa' },
  'math-circle-length-area': { loai: 'Hình học và Đo lường', bai: 22, ham: 'hoa' },
  'math-circle-polygon': { loai: 'Hình học và Đo lường', bai: 23, ham: 'hoa' },
  'math-cylinder-detail': { loai: 'Hình học và Đo lường', bai: 24, ham: 'hoa' },
  'math-cone-detail': { loai: 'Hình học và Đo lường', bai: 25, ham: 'hoa' },
  'math-cone-sphere-combined': { loai: 'Hình học và Đo lường', bai: 26, ham: 'hoa' },

  // Thống kê và Xác suất
  'math-statistics': { loai: 'Thống kê và Xác suất', bai: 1, ham: 'bang' },
  'statistics': { loai: 'Thống kê và Xác suất', bai: 1, ham: 'bang' },
  'math-probability': { loai: 'Thống kê và Xác suất', bai: 2, ham: 'bang' },
  'probability': { loai: 'Thống kê và Xác suất', bai: 2, ham: 'bang' },
  'math-stat-collect': { loai: 'Thống kê và Xác suất', bai: 3, ham: 'bang' },
  'math-stat-relative': { loai: 'Thống kê và Xác suất', bai: 4, ham: 'bang' },
  'math-stat-chart-1': { loai: 'Thống kê và Xác suất', bai: 5, ham: 'bang' },
  'math-stat-chart-2': { loai: 'Thống kê và Xác suất', bai: 6, ham: 'bang' },
  'math-stat-mean': { loai: 'Thống kê và Xác suất', bai: 7, ham: 'bang' },
  'math-stat-interpret': { loai: 'Thống kê và Xác suất', bai: 8, ham: 'bang' },
  'math-prob-sample-space': { loai: 'Thống kê và Xác suất', bai: 9, ham: 'bang' },
  'math-prob-classical': { loai: 'Thống kê và Xác suất', bai: 10, ham: 'bang' },
};

const ENGLISH_MAP: Record<string, { loai: string; bai: number; ham: HamNguyenTo }> = {
  // Ngữ pháp
  'eng-tenses': { loai: 'Ngữ pháp', bai: 1, ham: 'thach' },
  'tenses': { loai: 'Ngữ pháp', bai: 1, ham: 'thach' },
  'eng-passive-voice': { loai: 'Ngữ pháp', bai: 2, ham: 'thach' },
  'passive-voice': { loai: 'Ngữ pháp', bai: 2, ham: 'thach' },
  'eng-relative-clauses': { loai: 'Ngữ pháp', bai: 3, ham: 'thach' },
  'relative-clauses': { loai: 'Ngữ pháp', bai: 3, ham: 'thach' },
  'eng-conditional': { loai: 'Ngữ pháp', bai: 4, ham: 'thach' },
  'conditional': { loai: 'Ngữ pháp', bai: 4, ham: 'thach' },
  'eng-reported-speech': { loai: 'Ngữ pháp', bai: 5, ham: 'thach' },
  'reported-speech': { loai: 'Ngữ pháp', bai: 5, ham: 'thach' },
  'eng-gerund-infinitive': { loai: 'Ngữ pháp', bai: 6, ham: 'thach' },
  'eng-comparison': { loai: 'Ngữ pháp', bai: 7, ham: 'thach' },
  'eng-modal-verbs': { loai: 'Ngữ pháp', bai: 8, ham: 'thach' },
  'eng-wish-suggest': { loai: 'Ngữ pháp', bai: 9, ham: 'thach' },
  'eng-have-get-done': { loai: 'Ngữ pháp', bai: 10, ham: 'thach' },

  // Từ vựng
  'eng-vocabulary-topic': { loai: 'Từ vựng', bai: 1, ham: 'hoa' },
  'vocabulary': { loai: 'Từ vựng', bai: 1, ham: 'hoa' },
  'eng-word-form': { loai: 'Từ vựng', bai: 2, ham: 'hoa' },
  'wordform': { loai: 'Từ vựng', bai: 2, ham: 'hoa' },
  'word-form': { loai: 'Từ vựng', bai: 2, ham: 'hoa' },

  // Phát âm & Trọng âm
  'eng-pronunciation': { loai: 'Phát âm & Trọng âm', bai: 1, ham: 'phong' },
  'pronunciation': { loai: 'Phát âm & Trọng âm', bai: 1, ham: 'phong' },
  'eng-stress': { loai: 'Phát âm & Trọng âm', bai: 2, ham: 'phong' },
  'stress': { loai: 'Phát âm & Trọng âm', bai: 2, ham: 'phong' },

  // Đọc hiểu
  'eng-reading-passage': { loai: 'Đọc hiểu', bai: 1, ham: 'bang' },
  'reading': { loai: 'Đọc hiểu', bai: 1, ham: 'bang' },
  'eng-reading-cloze': { loai: 'Đọc hiểu', bai: 2, ham: 'bang' },
  'cloze': { loai: 'Đọc hiểu', bai: 2, ham: 'bang' },
  'eng-reading-sign': { loai: 'Đọc hiểu', bai: 3, ham: 'bang' },

  // Viết & Biến đổi câu
  'eng-rewrite': { loai: 'Viết & Biến đổi câu', bai: 1, ham: 'loi' },
  'rewrite': { loai: 'Viết & Biến đổi câu', bai: 1, ham: 'loi' },
  'eng-communication': { loai: 'Viết & Biến đổi câu', bai: 2, ham: 'loi' },
  'communication': { loai: 'Viết & Biến đổi câu', bai: 2, ham: 'loi' },
};

const LITERATURE_MAP: Record<string, { loai: string; bai: number; ham: HamNguyenTo }> = {
  'lit-rhetoric-device': { loai: 'Tiếng Việt', bai: 1, ham: 'thach' },
  'lit-reading-poetry': { loai: 'Đọc hiểu', bai: 1, ham: 'bang' },
  'lit-reading-prose': { loai: 'Đọc hiểu', bai: 2, ham: 'bang' },
  'lit-social-essay': { loai: 'Nghị luận xã hội', bai: 1, ham: 'phong' },
  'lit-literary-essay': { loai: 'Nghị luận văn học', bai: 1, ham: 'hoa' },
};

const SCIENCE_MAP: Record<string, { loai: string; bai: number; ham: HamNguyenTo }> = {
  // Vật lý
  'sci-phy-electricity': { loai: 'Vật lý', bai: 1, ham: 'thach' },
  'sci-phy-electromagnet': { loai: 'Vật lý', bai: 2, ham: 'thach' },
  'sci-phy-optics': { loai: 'Vật lý', bai: 3, ham: 'thach' },

  // Hóa học
  'sci-chem-oxacid': { loai: 'Hóa học', bai: 1, ham: 'hoa' },

  // Sinh học
  'sci-bio-genetics-mendelian': { loai: 'Sinh học', bai: 1, ham: 'bang' },
  'sci-bio-dna-gene': { loai: 'Sinh học', bai: 2, ham: 'bang' },
  'sci-bio-ecosystem': { loai: 'Sinh học', bai: 3, ham: 'bang' },
};

const HIS_GEO_MAP: Record<string, { loai: string; bai: number; ham: HamNguyenTo }> = {
  'his-vn-party': { loai: 'Lịch sử', bai: 1, ham: 'thach' },
  'geo-regions-7': { loai: 'Địa lý', bai: 1, ham: 'hoa' },
};

export function getCleanTopicKey(key: string): string {
  return key.replace(/-g\d+$/, '').toLowerCase().trim();
}

export function enrichTextbookAttributes(
  topicId?: string,
  category?: string,
  subject?: string
): { loai: string; bai: number; hamNguyenTo: HamNguyenTo } {
  const normSubject = (subject || '').toLowerCase().trim();
  const rawKey = (topicId || category || '').toLowerCase().trim();
  const cleanKey = getCleanTopicKey(rawKey);
  const cleanCat = category ? getCleanTopicKey(category) : '';

  let mapped: { loai: string; bai: number; ham: HamNguyenTo } | undefined;

  if (normSubject === 'math' || cleanKey.startsWith('math-')) {
    mapped = MATH_MAP[cleanKey] || MATH_MAP[cleanCat];
  } else if (normSubject === 'english' || cleanKey.startsWith('eng-')) {
    mapped = ENGLISH_MAP[cleanKey] || ENGLISH_MAP[cleanCat];
  } else if (normSubject === 'literature' || cleanKey.startsWith('lit-')) {
    mapped = LITERATURE_MAP[cleanKey] || LITERATURE_MAP[cleanCat];
  } else if (normSubject === 'science' || cleanKey.startsWith('sci-') || normSubject === 'physics' || normSubject === 'chemistry' || normSubject === 'biology') {
    mapped = SCIENCE_MAP[cleanKey] || SCIENCE_MAP[cleanCat];
  } else if (normSubject === 'history_geography' || cleanKey.startsWith('his-') || cleanKey.startsWith('geo-') || normSubject === 'history' || normSubject === 'geography') {
    mapped = HIS_GEO_MAP[cleanKey] || HIS_GEO_MAP[cleanCat];
  }

  if (mapped) {
    return {
      loai: mapped.loai,
      bai: mapped.bai,
      hamNguyenTo: mapped.ham
    };
  }

  // Đối với Kiến thức Đại học (Grade 13 hoặc các môn chuyên ngành bắt đầu bằng cs_), cho phép tự động đề xuất thứ tự
  const isDaiHoc = normSubject.startsWith('cs_') || cleanKey.startsWith('cs-') || cleanKey.startsWith('cs_');
  if (isDaiHoc) {
    const hash = cleanKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hams: HamNguyenTo[] = ['thach', 'hoa', 'bang', 'phong', 'loi', 'thuy', 'moc', 'kim', 'quang', 'am'];
    const hamNguyenTo = hams[hash % hams.length];
    const loai = 'Chuyên ngành Đại học';
    const numMatch = cleanKey.match(/\d+$/);
    const bai = numMatch ? parseInt(numMatch[0], 10) : 1;
    return { loai, bai, hamNguyenTo };
  }

  // Các cấp học phổ thông (6-12): Không suy đoán. Thiếu cấu hình SGK là báo lỗi Chưa phân loại SGK.
  return {
    loai: 'Chưa phân loại SGK',
    bai: 0,
    hamNguyenTo: 'phong'
  };
}
