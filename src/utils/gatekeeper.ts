/**
 * Gatekeeper Utilities — CORE_SPECS §2.8.7 & §9.D
 *
 * Logic chọn câu hỏi kiểm soát cổng (Người Gác Cổng) khi Thiếu Hiệp muốn vào
 * khu vực mờ sương trong Hang Luyện Công (Page Cấp 2).
 */

import type { Question, SubjectId } from '../types/game';
import type { HamNguyenTo } from '../types/game';
import { getTopicsBySubjectAndHam } from '../data/coreKnowledge';
import { supabase } from './supabaseClient';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

/** Bảng ánh xạ pageId (Page Cấp 2 trong Hang Luyện Công) → Hầm nguyên tố */
export const PAGE_TO_HAM_MAP: Record<string, HamNguyenTo> = {
  // === Hang Luyện Công — Tiếng Anh ===
  'hang-eng-hoa': 'hoa',        // Hỏa Hầm (Pronunciation, Stress, Vocabulary, Communication)
  'hang-eng-thach': 'thach',    // Thạch Hầm (Tenses, Passive, Relative, Word Form)
  'hang-eng-bang': 'bang',      // Băng Hầm (Conditional, Reported, Reading, Rewrite)
  // === Hang Luyện Công — Toán ===
  'hang-math-hoa': 'hoa',       // Hỏa Hầm (Statistics, Probability, Real-world percent)
  'hang-math-thach': 'thach',   // Thạch Hầm (Inequality, Radicals, Rational Expressions)
  'hang-math-bang': 'bang',     // Băng Hầm (Quadratic, Circle Geometry, System)
  // === Hang Luyện Công — Văn ===
  'hang-lit-hoa': 'hoa',        // Hỏa Hầm (Rhetoric, Genre, Work knowledge)
  'hang-lit-thach': 'thach',    // Thạch Hầm (Word class, Sentence, Cohesion)
  'hang-lit-bang': 'bang',      // Băng Hầm (Reading, Essay writing)
  // === Nhóm cơ bản ===
  'hang-science-hoa': 'hoa',
  'hang-science-thach': 'thach',
  'hang-science-bang': 'bang',
  'hang-history-hoa': 'hoa',
  'hang-history-thach': 'thach',
  'hang-history-bang': 'bang',
  'hang-civics-hoa': 'hoa',
  'hang-civics-thach': 'thach',
  'hang-civics-bang': 'bang',
  'hang-tech-hoa': 'hoa',
  'hang-tech-thach': 'thach',
  'hang-tech-bang': 'bang',
  'hang-inf-hoa': 'hoa',
  'hang-inf-thach': 'thach',
  'hang-inf-bang': 'bang',
  'hang-arts-hoa': 'hoa',
  'hang-arts-thach': 'thach',
  'hang-arts-bang': 'bang',
};

/**
 * Lấy Hầm nguyên tố của một pageId.
 * Fallback về 'thach' (kiến thức nền tảng) nếu không tìm thấy mapping.
 */
export function getHamForPage(pageId: string): HamNguyenTo {
  return PAGE_TO_HAM_MAP[pageId] ?? 'thach';
}

/**
 * Chọn câu hỏi Gatekeeper cho một Page Cấp 2.
 *
 * Quy tắc (CORE_SPECS §9.5):
 * 1. Xác định hamNguyenTo của page đó.
 * 2. Lấy tập chuyên đề thuộc hầm đó + môn phái hiện tại.
 * 3. Lọc câu hỏi: topicId thuộc hầm đó, difficulty 3–5, type MCQ hoặc wordform.
 * 4. Ưu tiên câu chưa được dùng trong 30 ngày (dựa trên usedQuestionIds).
 * 5. Random chọn 1 câu.
 */
export function pickGatekeeperQuestion(
  pageId: string,
  subjectId: SubjectId,
  allQuestions: Question[],
  usedQuestionIds: string[] = []
): Question | null {
  const ham = getHamForPage(pageId);
  const eligibleTopics = getTopicsBySubjectAndHam(subjectId, ham);
  const eligibleTopicIds = new Set(eligibleTopics.map(t => t.id));

  // Lọc câu hỏi đủ điều kiện - Ưu tiên câu Core Knowledge DỄ (difficulty 1-3)
  const candidates = allQuestions.filter(q => {
    const matchSubject = q.subject === subjectId;
    const matchTopic = q.topicId ? eligibleTopicIds.has(q.topicId) : false;
    const matchDifficulty = q.difficulty >= 1 && q.difficulty <= 3;
    const matchType = q.type === 'mcq' || q.type === 'multiple_choice' || q.type === 'wordform';
    return matchSubject && matchTopic && matchDifficulty && matchType;
  });

  if (candidates.length === 0) {
    // Fallback 1: Cho phép độ khó lên tới 4 nếu quá hiếm câu 1-3
    const candidates4 = allQuestions.filter(q => {
      const matchSubject = q.subject === subjectId;
      const matchTopic = q.topicId ? eligibleTopicIds.has(q.topicId) : false;
      const matchDifficulty = q.difficulty >= 1 && q.difficulty <= 4;
      const matchType = q.type === 'mcq' || q.type === 'multiple_choice' || q.type === 'wordform';
      return matchSubject && matchTopic && matchDifficulty && matchType;
    });

    if (candidates4.length === 0) {
      // Fallback 2: Bỏ điều kiện topic, chọn câu MCQ/wordform dễ của môn phái
      const fallback = allQuestions.filter(q =>
        q.subject === subjectId &&
        (q.type === 'mcq' || q.type === 'multiple_choice' || q.type === 'wordform') &&
        q.difficulty <= 3
      );
      if (fallback.length === 0) return null;
      const unused = fallback.filter(q => !usedQuestionIds.includes(q.id));
      const pool = unused.length > 0 ? unused : fallback;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    const unused = candidates4.filter(q => !usedQuestionIds.includes(q.id));
    const pool = unused.length > 0 ? unused : candidates4;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Ưu tiên câu chưa được dùng gần đây
  const unused = candidates.filter(q => !usedQuestionIds.includes(q.id));
  const pool = unused.length > 0 ? unused : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ==================== GATEKEEPER HISTORY ====================

export interface GatekeeperHistoryEntry {
  studentId: string;
  pageId: string;
  questionId: string;
  usedAt: string; // ISO timestamp
}

/** Lấy danh sách questionId đã dùng từ backend */
export async function getRecentlyUsedGatekeeperIds(studentId: string, pageId: string): Promise<string[]> {
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/gatekeeper-history?studentId=${studentId}&pageId=${pageId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data: GatekeeperHistoryEntry[] = await res.json();
    
    const GATEKEEPER_COOLDOWN_DAYS = 30;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - GATEKEEPER_COOLDOWN_DAYS);

    return data
      .filter(e => new Date(e.usedAt) > cutoff)
      .map(e => e.questionId);
  } catch (err) {
    console.error('Failed to fetch gatekeeper history from server:', err);
    return [];
  }
}

/** Ghi lại câu hỏi Gatekeeper đã dùng lên backend */
export async function recordGatekeeperUsage(studentId: string, pageId: string, questionId: string): Promise<void> {
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;

    await fetch(`${backendUrl}/api/gatekeeper-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ studentId, pageId, questionId })
    });
  } catch (err) {
    console.error('Failed to record gatekeeper usage to server:', err);
  }
}
