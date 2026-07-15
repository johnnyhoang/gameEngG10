import { useMemo } from 'react';
import { useGameState } from './useGameState';
import { filterQuestionsInScope, filterLessonsInScope } from '../utils/learningScope';
import type { Question } from '../types/game';
import type { Lesson } from '../data/lessons';

/**
 * Câu hỏi / bài giảng ĐÃ LỌC theo môn + lớp đang chọn.
 * Component phía học sinh dùng các hook này thay vì đọc thẳng
 * state.questions / state.lessons (kho thô trộn mọi môn, mọi lớp).
 */

export function useScopedQuestions(): Question[] {
  const questions = useGameState(state => state.questions);
  const subjectId = useGameState(state => state.currentSubject);
  const gradeTier = useGameState(state => state.activeGradeTier);
  return useMemo(
    () => filterQuestionsInScope(questions, subjectId, gradeTier),
    [questions, subjectId, gradeTier]
  );
}

export function useScopedLessons(): Lesson[] {
  const lessons = useGameState(state => state.lessons);
  const subjectId = useGameState(state => state.currentSubject);
  const gradeTier = useGameState(state => state.activeGradeTier);
  return useMemo(
    () => filterLessonsInScope(lessons, subjectId, gradeTier),
    [lessons, subjectId, gradeTier]
  );
}
