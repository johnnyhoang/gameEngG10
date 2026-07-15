import { DEFAULT_GRADE_TIER } from '../types/game';
import type { GradeTier, SubjectId } from '../types/game';

/**
 * BỘ LỌC NGỮ CẢNH HỌC TẬP (môn + lớp) DUY NHẤT của app.
 *
 * Mọi nơi tiêu thụ câu hỏi / bài giảng phía học sinh PHẢI đi qua các hàm này —
 * không tự viết lại điều kiện lọc trong component (tránh quên lọc lớp,
 * lệch quy ước default `?? 9` / `?? q.grade` từng gây rò rỉ nội dung môn cũ).
 * Nội dung không gắn lớp mặc định thuộc Lớp 9 (CORE_SPECS §1.4).
 */

/** Shape tối thiểu để xác định ngữ cảnh của một câu hỏi */
export interface QuestionScopeFields {
  subject?: SubjectId | string;
  grade?: number;
  gradeTier?: number;
}

/** Shape tối thiểu để xác định ngữ cảnh của một bài giảng */
export interface LessonScopeFields {
  subject: SubjectId | string;
  gradeTier?: number;
}

export const getQuestionSubject = (question: QuestionScopeFields): SubjectId =>
  (question.subject ?? 'english') as SubjectId;

export const getQuestionGradeTier = (question: QuestionScopeFields): number =>
  question.gradeTier ?? question.grade ?? DEFAULT_GRADE_TIER;

export const getLessonGradeTier = (lesson: LessonScopeFields): number =>
  lesson.gradeTier ?? DEFAULT_GRADE_TIER;

export const questionInScope = (
  question: QuestionScopeFields,
  subjectId: SubjectId,
  gradeTier: GradeTier | number
): boolean =>
  getQuestionSubject(question) === subjectId && getQuestionGradeTier(question) === gradeTier;

export const lessonInScope = (
  lesson: LessonScopeFields,
  subjectId: SubjectId,
  gradeTier: GradeTier | number
): boolean =>
  lesson.subject === subjectId && getLessonGradeTier(lesson) === gradeTier;

export const filterQuestionsInScope = <T extends QuestionScopeFields>(
  questions: T[],
  subjectId: SubjectId,
  gradeTier: GradeTier | number
): T[] => questions.filter(q => questionInScope(q, subjectId, gradeTier));

export const filterLessonsInScope = <T extends LessonScopeFields>(
  lessons: T[],
  subjectId: SubjectId,
  gradeTier: GradeTier | number
): T[] => lessons.filter(l => lessonInScope(l, subjectId, gradeTier));

/**
 * Watchdog (chỉ chạy ở dev): la lớn trên console khi một nội dung sắp render
 * lệch với môn/lớp đang chọn — chống tái phát lỗi rò rỉ khi thêm feature mới.
 */
export function devWarnOutOfScope(
  kind: 'question' | 'lesson',
  item: QuestionScopeFields | LessonScopeFields | null | undefined,
  subjectId: SubjectId,
  gradeTier: GradeTier | number,
  source: string
): void {
  if (!import.meta.env.DEV || !item) return;
  const inScope = kind === 'question'
    ? questionInScope(item as QuestionScopeFields, subjectId, gradeTier)
    : lessonInScope(item as LessonScopeFields, subjectId, gradeTier);
  if (!inScope) {
    console.error(
      `[learningScope] ${source}: ${kind} LỆCH NGỮ CẢNH — item(subject=${(item as any).subject}, tier=${(item as any).gradeTier ?? (item as any).grade}) vs đang chọn(${subjectId}, lớp ${gradeTier})`,
      item
    );
  }
}
