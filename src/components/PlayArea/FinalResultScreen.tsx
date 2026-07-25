import React, { useState, useMemo } from 'react';
import { Trophy, XCircle, Clock, Target, Coins, Zap, RotateCcw, Map, CheckCircle2, AlertTriangle, TimerOff, List, ArrowLeft, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import type { ActivityResult } from '../../types/activityResult';
import type { Question } from '../../types/game';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';
import { getSubjectModule, getAssessmentProvider } from '../../subject-modules/registry';
import type { SubjectId } from '../../types/game';
import { shuffleWithSeed } from '../../utils/shuffle';
import { QuestionMCQ } from './QuestionMCQ';
import { QuestionEssay } from './QuestionEssay';
import { QuestionTextInput } from './QuestionTextInput';
import { ExplanationBox } from './ExplanationBox';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';

/** Strip leading A. / B. / C. / D. from option text */
const stripOptionPrefix = (text: string): string =>
  text.trim().replace(/^[A-D]\s*[.)>]\s*/i, '').trim();


export interface FinalResultScreenProps {
  result: ActivityResult;
  mode: string;
  onFinish: () => void;
  onRetry?: () => void;
  // Review data (optional – merged from PostQuizReview)
  currentQuestions?: Question[];
  answersSubmitted?: any[];
  activeSectId?: string;
}

const MIN_ACCURACY: Record<string, number> = {
  lesson: 70,
  boss: 100,
  survival: 100,
  default: 60,
};

function getModeLabel(subjectId: string, mode: string): string {
  if (mode === 'lesson') return 'Phụ bản bài học';
  if (mode === 'mixed') return 'Phụ bản hỗn hợp';
  if (mode === 'revenge') return 'Phụ bản trả bài';
  if (mode === 'boss') return 'Trường Thi Boss';
  if (mode === 'survival') return 'Trường Thi sinh tồn';

  const module = getSubjectModule(subjectId as any);
  const activity = module?.activities?.find(a => a.modeKey === mode || a.id === mode || a.legacyMode === mode);
  return activity?.label || activity?.title || mode;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}p ${s}s` : `${s}s`;
}

export const FinalResultScreen: React.FC<FinalResultScreenProps> = ({
  result,
  mode,
  onFinish,
  onRetry,
  currentQuestions = [],
  answersSubmitted = [],
  activeSectId = '',
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);

  const { passed, status, score, total, accuracyRatio, timeSpentSeconds, rewardsEarned, isDefeat } = result;
  const accuracyPct = Math.round(accuracyRatio * 100);

  const isBossSurvival = mode === 'boss' || mode === 'survival';
  const minAcc = MIN_ACCURACY[mode] ?? MIN_ACCURACY.default;

  // ── Review Data ───────────────────────────────────────────────────────
  const reviewData = useMemo(() => {
    return currentQuestions.map((q, idx) => {
      const submission = answersSubmitted.find(s => s.questionId === q.id);
      const isSkipped = !submission || submission.isSkipped;
      const isCorrect = submission ? (submission.isCorrect || submission.scoreRatio === 1) : false;
      const scoreRatio = submission ? submission.scoreRatio : 0;
      let userAnswer = '';
      if (submission) {
        userAnswer = q.type === 'mcq' ? (submission.selectedAnswer || '') : (submission.typedAnswer || '');
      }
      const correctAnswer = Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' | ') : q.correctAnswer;
      return { question: q, index: idx, isSkipped, isCorrect, scoreRatio, userAnswer, correctAnswer, submission };
    });
  }, [currentQuestions, answersSubmitted]);

  const shuffledReviewOptions = useMemo(() => {
    if (selectedReviewIndex === null) return [];
    const q = reviewData[selectedReviewIndex]?.question;
    if (!q || !q.options) return [];
    return shuffleWithSeed(q.options, q.id);
  }, [selectedReviewIndex, reviewData]);

  // ── Status banner config ──────────────────────────────────────────────
  let statusIcon = passed ? <Trophy className="w-20 h-20" /> : <XCircle className="w-20 h-20" />;
  let statusColor = passed ? 'text-emerald-400' : 'text-red-400';
  let statusBg = passed
    ? 'from-emerald-950/60 to-emerald-900/30 border-emerald-500/40'
    : 'from-red-950/60 to-red-900/30 border-red-500/40';
  let statusTitle: string;
  let statusSubtitle: string;

  if (status === 'timeout') {
    statusIcon = <TimerOff className="w-20 h-20 text-orange-400" />;
    statusColor = 'text-orange-400';
    statusBg = 'from-orange-950/60 to-orange-900/30 border-orange-500/40';
    statusTitle = 'HẾT THỜI GIAN ⏰';
    statusSubtitle = 'Đồng hồ đã điểm. Trận lần này không tính vào tiến độ. Lần sau canh đủ 20 phút nhé.';
  } else if (status === 'failed' && isDefeat) {
    statusTitle = 'TẨU HỎA NHẬP MA 💀';
    statusSubtitle = 'Sai đủ 3 câu trong trận. Phần thưởng giảm 50%. Lần sau ra tay chắc hơn.';
  } else if (passed) {
    statusTitle = mode === 'lesson' ? 'ẢI HOÀN THÀNH 🏆' : 'CHINH PHỤC THÀNH CÔNG 🎖️';
    statusSubtitle = mode === 'lesson'
      ? 'Hoàn thành phòng bài học. Tiến độ đã được ghi nhận.'
      : isBossSurvival
        ? 'Đánh bại toàn bộ thử thách. Tiến độ đã được ghi nhận.'
        : 'Vượt qua ngưỡng yêu cầu. Tiến độ đã được ghi nhận.';
  } else {
    statusTitle = 'CHƯA ĐẠT YÊU CẦU ❌';
    statusSubtitle = `Cần độ chính xác tối thiểu ${minAcc}% để hoàn thành phòng này. Lần này không tính vào tiến độ.`;
  }

  // ── Individual Question Review ────────────────────────────────────────
  if (selectedReviewIndex !== null && reviewData[selectedReviewIndex]) {
    const reviewItem = reviewData[selectedReviewIndex];
    const q = reviewItem.question;
    const isMcq = q.type === 'mcq';
    const isEssay = Boolean(getAssessmentProvider(activeSectId as SubjectId, q));
    const isTextInput = q.type === 'short-answer' || q.type === 'text_input';

    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in p-4">
        {/* Navigation Header */}
        <div className={`glass-panel rounded-2xl border p-4 flex items-center justify-between gap-4 ${
          isUnicorn ? 'border-violet-100 bg-white' : 'border-white/5 bg-black/40'
        }`}>
          <button
            onClick={() => setSelectedReviewIndex(null)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all ${
              isUnicorn ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-synth-gray/30 border-white/5 text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kết quả 📋
          </button>

          <h3 className="font-orbitron font-black text-xs uppercase text-synth-cyan tracking-wider">
            Review Câu hỏi {selectedReviewIndex + 1} / {currentQuestions.length}
          </h3>

          <div>
            {reviewItem.isSkipped ? (
              <span className="px-2.5 py-1 rounded bg-slate-500/20 text-slate-400 border border-slate-500/30 text-[10px] font-bold font-orbitron uppercase">
                Bỏ qua
              </span>
            ) : reviewItem.isCorrect ? (
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-orbitron uppercase">
                Đúng
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold font-orbitron uppercase">
                Sai
              </span>
            )}
          </div>
        </div>

        {/* Main Review Panel */}
        <div className={`glass-panel rounded-3xl border p-6 space-y-6 ${
          isUnicorn ? 'border-violet-100 bg-white' : 'border-white/5 bg-black/40'
        }`}>
          {/* Question Prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[8px] font-bold bg-synth-cyan/10 border border-synth-cyan/30 text-synth-cyan uppercase font-orbitron tracking-widest rounded">
                Dạng: {q.type.toUpperCase()}
              </span>
              {q.source && (
                <span className="text-[10px] text-synth-text-muted font-semibold">
                  Nguồn: {q.source}
                </span>
              )}
            </div>
            <div className="font-orbitron font-bold text-base leading-relaxed text-white select-none">
              <MarkdownRenderer content={q.prompt} className="font-orbitron font-bold text-base text-white leading-relaxed" />
            </div>
          </div>

          {/* Read-Only Answer View */}
          <div className="p-4 rounded-2xl border border-white/5 bg-black/25">
            <p className="text-[10px] font-orbitron font-bold uppercase tracking-wider text-synth-text-muted mb-3">
              🎯 Bài làm và Đáp án
            </p>
            {isMcq && (
              <QuestionMCQ
                activeQuestion={q}
                selectedAnswer={reviewItem.userAnswer}
                checked={true}
                onSelectAnswer={() => {}}
              />
            )}
            {isEssay && (
              <QuestionEssay
                typedAnswer={reviewItem.userAnswer}
                checked={true}
                onTypeAnswer={() => {}}
                lang="vi-VN"
              />
            )}
            {isTextInput && (
              <QuestionTextInput
                typedAnswer={reviewItem.userAnswer}
                checked={true}
                onTypeAnswer={() => {}}
                lang={activeSectId === 'english' ? 'en-US' : 'vi-VN'}
              />
            )}
          </div>

          {/* Standard Explanation Box */}
          {!reviewItem.isSkipped && (
            <ExplanationBox
              activeSectId={activeSectId}
              activeQuestion={q}
              isLastCorrect={reviewItem.isCorrect}
              lastRubricScore={reviewItem.submission?.lastRubricScore ?? null}
              lastRubricMissing={reviewItem.submission?.lastRubricMissing ?? []}
              aiWarningMessage={reviewItem.submission?.aiWarningMessage ?? ''}
              aiFeedback={reviewItem.submission?.aiFeedback ?? ''}
              aiSuggestions={reviewItem.submission?.aiSuggestions ?? []}
            />
          )}

          {/* MCQ Choice Annotations */}
          {isMcq && q.options && (
            <div className="space-y-3 pt-3 border-t border-white/5">
              <h5 className="font-orbitron font-bold text-xs uppercase tracking-wider text-synth-cyan">
                💡 Phân tích chi tiết các lựa chọn
              </h5>
              <div className="space-y-2">
                {shuffledReviewOptions.map((option, idx) => {
                  const cleanOpt = option.trim();
                  const displayOpt = stripOptionPrefix(cleanOpt);
                  const correctAnsStr = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
                  const correctStripped = stripOptionPrefix((correctAnsStr || '').trim());
                  const isSelected = reviewItem.userAnswer === cleanOpt || reviewItem.userAnswer === displayOpt;
                  const isCorrectChoice =
                    cleanOpt.toLowerCase() === (correctAnsStr || '').toLowerCase() ||
                    displayOpt.toLowerCase() === correctStripped.toLowerCase();
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex gap-2 items-start ${
                        isCorrectChoice
                          ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-medium'
                          : isSelected
                            ? 'border-red-500/30 bg-red-500/5 text-red-400 font-medium'
                            : 'border-white/5 bg-white/[0.02] text-slate-300'
                      }`}
                    >
                      <span className="font-orbitron font-bold uppercase tracking-wider min-w-[20px] pt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <div className="flex-1 space-y-1 min-w-0">
                        <MarkdownRenderer
                          content={displayOpt}
                          className="text-xs leading-snug [&>p]:mb-0 [&>p]:text-inherit [&_*]:text-inherit"
                        />
                        <div className="text-[10px] text-slate-400 italic">
                          {isCorrectChoice ? (
                            <div className="text-emerald-400 font-bold">
                              ✔️ Đáp án đúng.{q.explanation ? (
                                <MarkdownRenderer content={q.explanation} className="inline ml-1 [&>p]:inline [&>p]:mb-0 [&_*]:text-emerald-400" />
                              ) : ' Quy tắc ngữ pháp/kiến thức cơ bản áp dụng.'}
                            </div>
                          ) : isSelected ? (
                            <span className="text-red-400 font-bold">
                              ❌ Đệ tử chọn câu này, nhưng chưa chính xác. Hãy xem phân tích đáp án đúng bên trên.
                            </span>
                          ) : (
                            <span>Lựa chọn không chính xác.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skipped Question Box */}
          {reviewItem.isSkipped && (
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex gap-3 text-xs leading-relaxed text-slate-400">
              <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="font-orbitron font-bold uppercase text-white tracking-wide text-[10px]">
                  Câu hỏi bị bỏ qua
                </h5>
                <p>Sĩ Tử đã bỏ qua câu hỏi này hoặc hết thời gian làm bài trước khi gửi kết quả.</p>
                <div className="text-emerald-400 font-semibold pt-1 flex flex-wrap items-baseline gap-1">
                  <span>Đáp án đúng cần điền:</span>
                  <MarkdownRenderer
                    content={reviewItem.correctAnswer || ''}
                    className="inline [&>p]:inline [&>p]:mb-0 [&_*]:text-emerald-400"
                  />
                </div>
                {q.explanation && (
                  <div className="text-slate-300 italic pt-1 flex flex-col gap-1">
                    <strong>Luận giải:</strong>
                    <MarkdownRenderer content={q.explanation} className="text-slate-300 italic text-xs leading-relaxed" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className={`glass-panel rounded-2xl border p-4 flex items-center justify-between gap-4 ${
          isUnicorn ? 'border-violet-100 bg-white' : 'border-white/5 bg-black/40'
        }`}>
          <button
            disabled={selectedReviewIndex === 0}
            onClick={() => setSelectedReviewIndex(selectedReviewIndex - 1)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'transparent' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Câu trước
          </button>

          <button
            onClick={() => setSelectedReviewIndex(null)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all bg-synth-cyan text-black border-synth-cyan/35 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <List className="w-3.5 h-3.5" /> Kết quả
          </button>

          <button
            disabled={selectedReviewIndex === currentQuestions.length - 1}
            onClick={() => setSelectedReviewIndex(selectedReviewIndex + 1)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'transparent' }}
          >
            Câu tiếp <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // ── Main Result + Review Table ────────────────────────────────────────
  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-fade-in p-4">

      {/* Status Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${statusBg} p-8 text-center space-y-3`}>
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className={`mx-auto w-fit ${statusColor}`}>{statusIcon}</div>
        <h2 className={`font-orbitron font-black text-2xl uppercase tracking-wider ${statusColor}`}>
          {statusTitle}
        </h2>
        <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">{statusSubtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className={`rounded-2xl border p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 ${
        isUnicorn ? 'bg-white border-violet-100' : 'bg-black/40 border-white/5'
      }`}>
        {/* Score */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Điểm số</span>
          </div>
          <p className="font-orbitron font-black text-2xl text-white">{score}<span className="text-sm text-slate-400">/{total}</span></p>
        </div>

        {/* Accuracy */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Chính xác</span>
          </div>
          <p className={`font-orbitron font-black text-2xl ${accuracyPct >= (minAcc) ? 'text-emerald-400' : 'text-red-400'}`}>
            {accuracyPct}<span className="text-sm">%</span>
          </p>
          <p className="text-[9px] text-slate-500">Yêu cầu: {isBossSurvival ? 'không sai 3 lần' : `≥${minAcc}%`}</p>
        </div>

        {/* Time */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Thời gian</span>
          </div>
          <p className="font-orbitron font-black text-2xl text-white">{formatTime(timeSpentSeconds)}</p>
        </div>

        {/* Mode */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Ải</span>
          </div>
          <p className="font-orbitron font-bold text-xs text-white leading-tight">
            {(() => {
              const currentSubject = useGameState.getState().currentSubject;
              return getModeLabel(currentSubject, mode);
            })()}
          </p>
        </div>
      </div>

      {/* Rewards Panel */}
      <div className={`rounded-2xl border p-5 space-y-3 ${
        isUnicorn ? 'bg-white border-violet-100' : 'bg-black/40 border-white/5'
      }`}>
        <p className="font-orbitron font-bold text-[10px] uppercase tracking-widest text-synth-text-muted">
          Chiến Lợi Phẩm
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${
            isUnicorn ? 'bg-amber-50 border-amber-100' : 'bg-amber-500/5 border-amber-500/10'
          }`}>
            <Coins className="w-6 h-6 text-synth-orange shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-orbitron uppercase">Ruby</p>
              <p className="font-orbitron font-black text-xl text-synth-orange">
                {rewardsEarned.ruby > 0 ? `+${rewardsEarned.ruby}` : '0'}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${
            isUnicorn ? 'bg-cyan-50 border-cyan-100' : 'bg-synth-cyan/5 border-synth-cyan/10'
          }`}>
            <Zap className="w-6 h-6 text-synth-cyan shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-orbitron uppercase">Điểm Tu Học (XP)</p>
              <p className="font-orbitron font-black text-xl text-synth-cyan">
                {rewardsEarned.xp > 0 ? `+${rewardsEarned.xp}` : '0'}
              </p>
            </div>
          </div>
        </div>
        {isDefeat && (
          <div className="flex items-center gap-2 text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Đã áp dụng hình phạt Tẩu Hỏa Nhập Ma: phần thưởng giảm 50%.
          </div>
        )}
      </div>

      {/* Progression Status */}
      <div className={`rounded-2xl border px-5 py-4 flex items-start gap-3 ${
        passed
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : 'bg-red-500/5 border-red-500/20'
      }`}>
        {passed
          ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          : <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        }
        <div>
          <p className={`font-orbitron font-bold text-xs uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {passed ? 'Lần này tính vào tiến độ ✅' : 'Lần này không tính vào tiến độ ❌'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            {passed
              ? mode === 'lesson'
                ? 'Bài học đã được ghi nhận. Tiến độ học tập đã được cập nhật.'
                : 'Kết quả đã được ghi nhận. Tiến độ học tập khu vực đã được cập nhật.'
              : status === 'timeout'
                ? 'Hết thời gian — lần này không tính. Hãy hoàn thành trong 20 phút ở lần tiếp theo.'
                : `Cần đạt tối thiểu ${isBossSurvival ? 'không mắc đủ 3 lỗi' : `${minAcc}% độ chính xác`} để tính vào tiến độ.`
            }
          </p>
        </div>
      </div>

      {/* Question Review Table (shown when we have review data) */}
      {reviewData.length > 0 && (
        <div className={`rounded-2xl border p-5 space-y-4 ${
          isUnicorn ? 'bg-white border-violet-100' : 'bg-black/40 border-white/5'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider text-synth-cyan flex items-center gap-2">
              <List className="w-4 h-4" /> Bảng Thống Kê Chi Tiết
            </h3>
            <span className="text-[11px] text-synth-text-muted font-orbitron">
              Tổng số câu: {currentQuestions.length}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b border-white/10 font-orbitron text-[9px] uppercase tracking-wider ${
                  isUnicorn ? 'bg-slate-50 text-slate-500' : 'bg-white/5 text-slate-400'
                }`}>
                  <th className="py-3.5 px-4 text-center w-12 font-bold">#</th>
                  <th className="py-3.5 px-3">Dạng/Chủ đề</th>
                  <th className="py-3.5 px-3 min-w-[200px]">Câu Hỏi</th>
                  <th className="py-3.5 px-3 text-center">Kết Quả</th>
                  <th className="py-3.5 px-3">Bài Làm của Bạn</th>
                  <th className="py-3.5 px-3">Đáp Án Đúng</th>
                  <th className="py-3.5 px-3 text-center w-16">Điểm</th>
                  <th className="py-3.5 px-4 text-center w-24">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reviewData.map((row) => (
                  <tr
                    key={row.question.id}
                    onClick={() => setSelectedReviewIndex(row.index)}
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 text-center font-bold text-slate-400 font-mono">
                      {row.index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-orbitron bg-synth-cyan/15 text-synth-cyan uppercase border border-synth-cyan/20">
                        {row.question.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-white max-w-xs group-hover:text-synth-cyan transition-colors">
                      <MarkdownRenderer content={row.question.prompt} className="text-xs text-white line-clamp-2 [&>p]:inline [&>p]:mb-0" />
                    </td>
                    <td className="py-3 px-3 text-center">
                      {row.isSkipped ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-orbitron bg-slate-500/10 border border-slate-500/20 text-slate-400 uppercase">
                          <AlertCircle className="w-3.5 h-3.5" /> Bỏ qua
                        </span>
                      ) : row.isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-orbitron bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-orbitron bg-red-500/10 border border-red-500/20 text-red-400 uppercase">
                          <XCircle className="w-3.5 h-3.5" /> Sai
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans max-w-[180px]">
                      {row.isSkipped ? (
                        <span className="text-slate-500 italic">Chưa trả lời</span>
                      ) : (
                        <MarkdownRenderer content={stripOptionPrefix(row.userAnswer || '')} className="text-xs text-slate-300 [&>p]:inline [&>p]:mb-0" />
                      )}
                    </td>
                    <td className="py-3 px-3 text-emerald-400 font-sans font-semibold max-w-[180px]">
                      <MarkdownRenderer content={stripOptionPrefix(row.correctAnswer || '')} className="text-xs text-emerald-400 font-semibold [&>p]:inline [&>p]:mb-0 [&_*]:text-emerald-400" />
                    </td>
                    <td className="py-3 px-3 text-center font-bold font-mono">
                      {(row.scoreRatio * 10).toFixed(0)}/10
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReviewIndex(row.index);
                        }}
                        className="px-2.5 py-1 text-[10px] bg-synth-cyan/10 hover:bg-synth-cyan text-synth-cyan hover:text-black font-orbitron font-bold uppercase rounded-lg border border-synth-cyan/30 transition-all cursor-pointer"
                      >
                        Chi Tiết 🔍
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        {!passed && onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-red-700 to-red-500 text-white cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <RotateCcw className="w-4 h-4" /> Thử Lại
          </button>
        )}
        <button
          onClick={onFinish}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <Map className="w-4 h-4" />
          {mode === 'lesson' ? 'Hoàn Thành Học Bài 🎓' : 'Trở Lại Bản Đồ 🗺️'}
        </button>
      </div>
    </div>
  );
};
