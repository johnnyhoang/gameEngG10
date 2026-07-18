import type { HamNguyenTo } from '../types/game';
import { useGameState } from '../store';

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

export function getCleanTopicKey(key: string): string {
  return key.replace(/-g\d+$/, '').toLowerCase().trim();
}

/**
 * Tra cứu thông tin SGK (Loại, bài học, hầm nguyên tố) động từ Database/Store.
 * Loại bỏ hoàn toàn MATH_MAP, ENGLISH_MAP... cứng trên code.
 */
export function enrichTextbookAttributes(
  topicId?: string,
  category?: string,
  subject?: string
): { loai: string; bai: number; hamNguyenTo: HamNguyenTo } {
  const normSubject = (subject || '').toLowerCase().trim();
  const rawKey = (topicId || category || '').toLowerCase().trim();
  const cleanKey = getCleanTopicKey(rawKey);
  const cleanCat = category ? getCleanTopicKey(category) : '';

  // 1. Tra cứu động trong Zustand store (được tải trực tiếp từ ge10_textbook_mappings)
  const textbookMappings = useGameState.getState().textbookMappings || [];
  const dbMapped = textbookMappings.find(m => m.categoryKey === cleanKey || (cleanCat && m.categoryKey === cleanCat));
  
  if (dbMapped) {
    return {
      loai: dbMapped.loai,
      bai: dbMapped.bai,
      hamNguyenTo: dbMapped.ham
    };
  }

  // 2. Đối với Kiến thức Đại học (hoặc các môn chuyên ngành bắt đầu bằng cs_), cho phép tự động đề xuất thứ tự
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

  // 3. Các cấp học phổ thông (6-12): Không suy đoán bừa bãi.
  // Trả về 'Chưa phân loại SGK' nếu chưa được Admin khai báo/CRUD trong Phòng IT.
  return {
    loai: 'Chưa phân loại SGK',
    bai: 0,
    hamNguyenTo: 'phong'
  };
}
