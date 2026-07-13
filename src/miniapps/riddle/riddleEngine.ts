import type { Question, SubjectId } from '../../types/game';
import type { HamNguyenTo } from '../../types/game';
import { getTopicById } from '../../data/coreKnowledge';
import { supabase } from '../../utils/supabaseClient';

export type RiddleMode = 'ruby-riddle' | 'encounter-sprint';

export function getQuestionSubject(question: Question): SubjectId {
  return (question.subject as SubjectId) || 'english';
}

export function isRiddleEligible(question: Question): boolean {
  const isMcq = question.type === 'mcq' || question.type === 'multiple_choice';
  return isMcq
    && question.difficulty >= 1
    && question.difficulty <= 5
    && !!question.topicId
    && question.topicId !== 'misc'
    && Array.isArray(question.options)
    && question.options.length >= 2;
}

export interface RiddleCoverageStats {
  total: number;
  eligible: number;
  byHam: Record<HamNguyenTo, number>;
}

export function getRiddleCoverageStats(
  allQuestions: Question[]
): Partial<Record<SubjectId, RiddleCoverageStats>> {
  const stats: Partial<Record<SubjectId, RiddleCoverageStats>> = {};
  for (const question of allQuestions) {
    const subjectId = getQuestionSubject(question);
    const entry = stats[subjectId] ?? { total: 0, eligible: 0, byHam: { hoa: 0, bang: 0, thach: 0 } };
    entry.total += 1;
    if (isRiddleEligible(question)) {
      entry.eligible += 1;
      const topic = question.topicId ? getTopicById(question.topicId) : undefined;
      if (topic) entry.byHam[topic.hamNguyenTo] += 1;
    }
    stats[subjectId] = entry;
  }
  return stats;
}

export function pickRiddleQuestions(
  subjectId: SubjectId,
  gradeTier: number,
  allQuestions: Question[],
  count: number,
  usedQuestionIds: string[] = []
): Question[] {
  const candidates = allQuestions.filter(question =>
    getQuestionSubject(question) === subjectId
    && (question.gradeTier ?? question.grade ?? 9) === gradeTier
    && isRiddleEligible(question)
  );
  const used = new Set(usedQuestionIds);
  const shuffle = (items: Question[]) => [...items].sort(() => Math.random() - 0.5);
  return [
    ...shuffle(candidates.filter(question => !used.has(question.id))),
    ...shuffle(candidates.filter(question => used.has(question.id))),
  ].slice(0, count);
}

export function normalizeRiddleAnswer(value: string): string {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[–−]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, digit => '₀₁₂₃₄₅₆₇₈₉'.indexOf(digit).toString());
}

export function isRiddleAnswerCorrect(selected: string, correctAnswer: string | string[], options: string[] = []): boolean {
  const correctAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  return correctAnswers.some(correct => {
    if (normalizeRiddleAnswer(selected) === normalizeRiddleAnswer(correct)) return true;
    const correctLetter = correct.trim().match(/^([A-D])(?:\s*[.):])?$/i)?.[1]?.toUpperCase();
    if (correctLetter && options.length > 0) {
      const selectedIndex = options.findIndex(option => normalizeRiddleAnswer(option) === normalizeRiddleAnswer(selected));
      if (selectedIndex >= 0) return selectedIndex === correctLetter.charCodeAt(0) - 65;
    }
    const optionPrefix = selected.match(/^([A-D])\s*[.):]/i);
    if (!optionPrefix) return false;
    const optionLetter = optionPrefix[1].toLowerCase();
    const optionContent = selected.slice(optionPrefix[0].length);
    return normalizeRiddleAnswer(correct) === optionLetter
      || normalizeRiddleAnswer(correct) === normalizeRiddleAnswer(optionContent);
  });
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const session = (await supabase.auth.getSession()).data.session;
  return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
}

export async function getRecentRiddleQuestionIds(profileId: string, mode: RiddleMode): Promise<string[]> {
  if (profileId.startsWith('mock-')) return [];
  try {
    const response = await fetch(`${backendUrl}/api/riddle-history?profileId=${encodeURIComponent(profileId)}&mode=${mode}`, {
      headers: { ...(await getAuthHeaders()), 'X-Profile-Id': profileId },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const history: Array<{ questionId: string; usedAt: string }> = await response.json();
    return history.filter(item => new Date(item.usedAt).getTime() >= cutoff).map(item => item.questionId);
  } catch (error) {
    console.error('[Riddle] Không thể tải lịch sử câu đố', { profileId, mode, error });
    return [];
  }
}

export async function recordRiddleQuestion(
  profileId: string,
  mode: RiddleMode,
  questionId: string
): Promise<void> {
  if (profileId.startsWith('mock-')) return;
  try {
    const response = await fetch(`${backendUrl}/api/riddle-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await getAuthHeaders()), 'X-Profile-Id': profileId },
      body: JSON.stringify({ profileId, mode, questionId }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    console.error('[Riddle] Không thể ghi lịch sử câu đố', { profileId, mode, questionId, error });
  }
}
