import type { SubjectId, CategoryStat } from '../types/game';
import { CORE_KNOWLEDGE_TOPICS } from '../data/coreKnowledge';

// Đẳng Cấp Môn Phái — nguồn định nghĩa DUY NHẤT (CORE_SPECS §7.4). Dùng chung giữa UI hiển thị
// (ProfilePage) và store (ratchet maxAchievedMasteryRank) để không lệch bảng như từng xảy ra
// với XP→Level→Danh hiệu trước Task #40.
export interface SectMasteryRank {
  id: string;
  name: string;
  icon: string;
  minRatio: number; // 0..1
  order: number;
  colorClass: string;
}

export const SECT_MASTERY_RANKS: SectMasteryRank[] = [
  { id: 'nhap-mon', name: 'Nhập Môn', icon: '🌱', minRatio: 0, order: 0, colorClass: 'text-slate-400' },
  { id: 'linh-ngo', name: 'Lĩnh Ngộ', icon: '📜', minRatio: 0.15, order: 1, colorClass: 'text-violet-400 font-semibold' },
  { id: 'tieu-thanh', name: 'Tiểu Thành', icon: '⚔️', minRatio: 0.40, order: 2, colorClass: 'text-fuchsia-400 font-semibold' },
  { id: 'tinh-thong', name: 'Tinh Thông', icon: '🔥', minRatio: 0.65, order: 3, colorClass: 'text-orange-500 font-bold' },
  { id: 'dai-thanh', name: 'Đại Thành', icon: '⭐', minRatio: 0.85, order: 4, colorClass: 'text-cyan-400 font-bold' },
  { id: 'xuat-chung', name: 'Xuất Chúng', icon: '🏆', minRatio: 0.98, order: 5, colorClass: 'text-yellow-400 shadow-[0_0_8px_#facc15] font-black' }
];

export function getMasteryRankByRatio(ratio: number): SectMasteryRank {
  for (let i = SECT_MASTERY_RANKS.length - 1; i >= 0; i--) {
    if (ratio >= SECT_MASTERY_RANKS[i].minRatio) return SECT_MASTERY_RANKS[i];
  }
  return SECT_MASTERY_RANKS[0];
}

export function getMasteryRankByOrder(order: number): SectMasteryRank {
  return SECT_MASTERY_RANKS.find(r => r.order === order) ?? SECT_MASTERY_RANKS[0];
}

export interface SubjectMasteryInput {
  subjectId: SubjectId;
  questions: { subject?: SubjectId; category: string }[];
  categoryStats: Record<string, CategoryStat>;
  lessons: { subject: SubjectId; id: string }[];
  lessonsProgress: Record<string, boolean>;
}

// Công thức CORE_SPECS §7.4.2: 50% bài học hoàn thành + 50% tỉ lệ câu đúng (mẫu số = tổng
// minQuestions của Core Knowledge topics thuộc môn, để Viện Chủ import thêm câu không ăn gian tỉ lệ).
export function computeSubjectMasteryRatio({ subjectId, questions, categoryStats, lessons, lessonsProgress }: SubjectMasteryInput): number {
  const subjectCategories = Array.from(new Set(questions.filter(q => q.subject === subjectId).map(q => q.category)));
  const correctCount = subjectCategories.reduce((sum, cat) => sum + (categoryStats[cat]?.totalCorrect || 0), 0);

  const topics = CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === subjectId);
  const totalQuestions = topics.reduce((sum, t) => sum + t.minQuestions, 0) || questions.filter(q => q.subject === subjectId).length || 1;

  const totalLessons = lessons.filter(l => l.subject === subjectId).length;
  const completedLessons = lessons.filter(l => l.subject === subjectId && lessonsProgress[l.id]).length;

  const lessonRatio = totalLessons > 0 ? (completedLessons / totalLessons) : 0;
  const questionRatio = totalQuestions > 0 ? (correctCount / totalQuestions) : 0;
  return (lessonRatio * 0.5) + (questionRatio * 0.5);
}
