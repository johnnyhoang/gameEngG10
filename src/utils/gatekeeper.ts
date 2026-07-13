/**
 * Gatekeeper Utilities — CORE_SPECS §2.8.7 & §9.D
 *
 * Logic chọn câu hỏi kiểm soát cổng (Người Gác Cổng) khi Thiếu Hiệp muốn vào
 * khu vực mờ sương trong Học Đường (Page Cấp 2).
 */

import type { Question, SubjectId } from '../types/game';
import type { HamNguyenTo } from '../types/game';
import { getTopicsBySubjectAndHam, getTopicById } from '../data/coreKnowledge';
import { supabase } from './supabaseClient';

/**
 * Băng độ khó dùng để phân loại câu hỏi cho mục đích Gatekeeper (CORE_SPECS §9.5):
 * Dễ (1-3) và Vừa (4-5) đủ điều kiện; Khó (6-10) không dùng cho Gatekeeper.
 */
export type DifficultyBand = 'de' | 'vua' | 'kho';

export function getDifficultyBand(difficulty: number): DifficultyBand {
  if (difficulty <= 3) return 'de';
  if (difficulty <= 5) return 'vua';
  return 'kho';
}

/**
 * Một câu hỏi "đủ điều kiện Gác Cổng" (CORE_SPECS §9.5) khi:
 * - Dạng MCQ (trắc nghiệm) — không dùng Wordform/tự luận.
 * - Độ khó Dễ hoặc Vừa (1-5/10) — không dùng câu Khó.
 * - Đã gắn `topicId` thuộc Core Knowledge taxonomy (không phải 'misc') — có tính kiến thức cốt lõi.
 *
 * Không kiểm tra `subject` ở đây — việc lọc theo môn phái do caller tự áp dụng,
 * vì hàm này còn dùng để tính thống kê tổng quát trên toàn bộ ngân hàng câu hỏi.
 */
export function isGatekeeperEligible(q: Question): boolean {
  const isMcq = q.type === 'mcq' || q.type === 'multiple_choice';
  const band = getDifficultyBand(q.difficulty);
  const isEasyOrMedium = band === 'de' || band === 'vua';
  const hasCoreTopic = !!q.topicId && q.topicId !== 'misc';
  return isMcq && isEasyOrMedium && hasCoreTopic;
}

/**
 * Môn phái thực tế của một câu hỏi — câu hỏi không gắn `subject` tường minh
 * (phần lớn ngân hàng câu Tiếng Anh cũ) mặc định thuộc 'english', theo đúng quy
 * ước đã dùng ở nơi khác trong app (vd. PlayArea.tsx runLocalFallback).
 */
export function getQuestionSubject(q: Question): SubjectId {
  return (q.subject as SubjectId) || 'english';
}

export interface GatekeeperCoverageStats {
  total: number;
  eligible: number;
  byHam: Record<HamNguyenTo, number>;
}

/**
 * Thống kê số câu hỏi đủ điều kiện Gác Cổng theo từng môn phái (và theo Hầm
 * nguyên tố) — dùng cho màn thống kê phía Giáo viên/Hiệu trưởng (Kho Đề Thi).
 */
export function getGatekeeperCoverageStats(
  allQuestions: Question[]
): Partial<Record<SubjectId, GatekeeperCoverageStats>> {
  const stats: Partial<Record<SubjectId, GatekeeperCoverageStats>> = {};

  for (const q of allQuestions) {
    const subjectId = getQuestionSubject(q);
    if (!stats[subjectId]) {
      stats[subjectId] = { total: 0, eligible: 0, byHam: { hoa: 0, bang: 0, thach: 0 } };
    }
    const entry = stats[subjectId]!;
    entry.total += 1;
    if (isGatekeeperEligible(q)) {
      entry.eligible += 1;
      const topic = q.topicId ? getTopicById(q.topicId) : undefined;
      if (topic) entry.byHam[topic.hamNguyenTo] += 1;
    }
  }

  return stats;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

/**
 * Câu hỏi gác cổng tạm thời — dùng khi một môn phái chưa có đủ câu hỏi trong
 * kho để làm Gatekeeper, thay vì để học viên bị kẹt với "Không tìm thấy câu
 * hỏi gác cổng". Xóa fallback này khi mọi môn đã có đủ đề Gatekeeper thật.
 */
/** Bảng ánh xạ pageId (Page Cấp 2 trong Học Đường) → Hầm nguyên tố */
export const PAGE_TO_HAM_MAP: Record<string, HamNguyenTo> = {
  // === Học Đường — Tiếng Anh ===
  'hang-eng-hoa': 'hoa',        // Hỏa Hầm (Pronunciation, Stress, Vocabulary, Communication)
  'hang-eng-thach': 'thach',    // Thạch Hầm (Tenses, Passive, Relative, Word Form)
  'hang-eng-bang': 'bang',      // Băng Hầm (Conditional, Reported, Reading, Rewrite)
  // === Học Đường — Toán ===
  'hang-math-hoa': 'hoa',       // Hỏa Hầm (Statistics, Probability, Real-world percent)
  'hang-math-thach': 'thach',   // Thạch Hầm (Inequality, Radicals, Rational Expressions)
  'hang-math-bang': 'bang',     // Băng Hầm (Quadratic, Circle Geometry, System)
  // === Học Đường — Văn ===
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
 * 3. Lọc câu hỏi đủ điều kiện Gác Cổng (`isGatekeeperEligible`) thuộc đúng hầm đó.
 * 4. Nếu hầm đó chưa đủ câu, nới ra toàn bộ câu đủ điều kiện của môn phái (không phân biệt hầm).
 * 5. Ưu tiên câu chưa được dùng trong 30 ngày (dựa trên usedQuestionIds).
 * 6. Random chọn 1 câu; nếu context không có câu đủ điều kiện, trả `null` và ghi log coverage.
 */
export function pickGatekeeperQuestion(
  pageId: string,
  subjectId: SubjectId,
  gradeTier: number,
  allQuestions: Question[],
  usedQuestionIds: string[] = []
): Question | null {
  const ham = getHamForPage(pageId);
  const eligibleTopics = getTopicsBySubjectAndHam(subjectId, ham);
  const eligibleTopicIds = new Set(eligibleTopics.map(t => t.id));

  const matchContext = (q: Question) =>
    getQuestionSubject(q) === subjectId && (q.gradeTier ?? q.grade ?? 9) === gradeTier;

  // Tier 1: đúng môn phái + đúng Hầm nguyên tố + đủ điều kiện Gác Cổng.
  const candidates = allQuestions.filter(q =>
    matchContext(q) && !!q.topicId && eligibleTopicIds.has(q.topicId) && isGatekeeperEligible(q)
  );

  if (candidates.length > 0) {
    const unused = candidates.filter(q => !usedQuestionIds.includes(q.id));
    const pool = unused.length > 0 ? unused : candidates;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Tier 2: Hầm này chưa đủ câu — nới ra toàn bộ câu đủ điều kiện của môn phái.
  const fallback = allQuestions.filter(q => matchContext(q) && isGatekeeperEligible(q));
  if (fallback.length === 0) {
    console.error('[Gatekeeper] Chưa có câu hỏi kiểm tra phù hợp', { gradeTier, subjectId, pageId, ham });
    return null;
  }

  const unused = fallback.filter(q => !usedQuestionIds.includes(q.id));
  const pool = unused.length > 0 ? unused : fallback;
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
  // Phiên dev-backdoor (mock-*) không có dữ liệu lịch sử trên backend — bỏ qua gọi mạng.
  if (studentId.startsWith('mock-')) return [];
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/gatekeeper-history?studentId=${studentId}&pageId=${pageId}`, {
      headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': studentId }
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
  // Phiên dev-backdoor (mock-*) không có backend thật để ghi lịch sử — bỏ qua gọi mạng.
  if (studentId.startsWith('mock-')) return;
  try {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;

    await fetch(`${backendUrl}/api/gatekeeper-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Profile-Id': studentId
      },
      body: JSON.stringify({ studentId, pageId, questionId })
    });
  } catch (err) {
    console.error('Failed to record gatekeeper usage to server:', err);
  }
}
