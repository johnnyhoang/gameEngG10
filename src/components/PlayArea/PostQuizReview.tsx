import React, { useState, useMemo } from 'react';
import { Award, ArrowLeft, ArrowRight, List, HelpCircle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { Question } from '../../types/game';
import { QuestionMCQ } from './QuestionMCQ';
import { QuestionEssay } from './QuestionEssay';
import { QuestionTextInput } from './QuestionTextInput';
import { ExplanationBox } from './ExplanationBox';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';
import { getAssessmentProvider } from '../../subject-modules/registry';
import type { SubjectId } from '../../types/game';
import { shuffleWithSeed } from '../../utils/shuffle';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';

export interface PostQuizReviewProps {
  mode: string;
  rewardsEarned: { ruby: number; xp: number };
  runMistakes: number;
  currentQuestions: Question[];
  answersSubmitted: any[];
  activeSectId: string;
  onEscape: () => void;
}

export const PostQuizReview: React.FC<PostQuizReviewProps> = ({
  mode,
  rewardsEarned,
  runMistakes,
  currentQuestions,
  answersSubmitted,
  activeSectId,
  onEscape
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);

  // Determine defeat condition
  const isDefeat = runMistakes >= 3 && (mode === 'boss' || mode === 'survival');
  const displayedRuby = isDefeat ? Math.floor(rewardsEarned.ruby / 2) : rewardsEarned.ruby;
  const displayedXp = isDefeat ? Math.floor(rewardsEarned.xp / 2) : rewardsEarned.xp;

  // Process all questions into review records
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

      return {
        question: q,
        index: idx,
        isSkipped,
        isCorrect,
        scoreRatio,
        userAnswer,
        correctAnswer,
        submission
      };
    });
  }, [currentQuestions, answersSubmitted]);

  const shuffledReviewOptions = useMemo(() => {
    if (selectedReviewIndex === null) return [];
    const q = reviewData[selectedReviewIndex]?.question;
    if (!q || !q.options) return [];
    return shuffleWithSeed(q.options, q.id);
  }, [selectedReviewIndex, reviewData]);


  // Render Summary Table View
  if (selectedReviewIndex === null) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in p-4">
        {/* Summary Card Header */}
        <div className={`glass-panel rounded-3xl border p-8 text-center space-y-6 relative overflow-hidden ${
          isUnicorn 
            ? 'border-violet-200/50 bg-white/95 shadow-[0_0_30px_rgba(139,92,246,0.15)] text-slate-800' 
            : 'border-synth-magenta/30 bg-slate-950/80 shadow-[0_0_40px_rgba(255,0,127,0.15)] text-white'
        }`}>
          {/* Decorative gradients */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-synth-cyan/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-synth-magenta/10 rounded-full blur-3xl"></div>

          <Award className="w-16 h-16 mx-auto text-synth-orange animate-bounce" />

          <div className="space-y-1">
            <h2 className="font-orbitron font-black text-2xl uppercase tracking-wider bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent">
              {isDefeat ? 'TẨU HỎA NHẬP MA - THẤT BẠI 💀' : 'ẢI THỬ THÁCH HOÀN THÀNH 🏆'}
            </h2>
            <p className="text-xs text-synth-text-muted">
              {isDefeat
                ? 'Đệ tử đã phạm đủ 3 lỗi sai. Chỉ giữ lại 50% nanite tích lũy.'
                : 'Sĩ Tử đã vượt qua toàn bộ thử thách xuất sắc! Hãy xem lại phân tích đáp án bên dưới.'}
            </p>
          </div>

          {/* Rewards Grid */}
          <div className={`grid grid-cols-2 gap-4 max-w-md mx-auto p-4 rounded-2xl border ${
            isUnicorn ? 'bg-violet-50/50 border-violet-100' : 'bg-white/5 border-white/5'
          }`}>
            <div className="text-center font-orbitron">
              <span className="text-[10px] text-synth-text-muted uppercase font-bold tracking-widest">Ruby</span>
              <p className="text-2xl font-black text-synth-orange">+{displayedRuby} Ruby</p>
            </div>
            <div className="text-center font-orbitron">
              <span className="text-[10px] text-synth-text-muted uppercase font-bold tracking-widest">Điểm Tu Học (XP)</span>
              <p className="text-2xl font-black text-synth-cyan">+{displayedXp} XP</p>
            </div>
          </div>
        </div>

        {/* Summary Table Card */}
        <div className={`glass-panel rounded-3xl border p-6 space-y-4 ${
          isUnicorn ? 'border-violet-100 bg-white' : 'border-white/5 bg-black/40'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider text-synth-cyan flex items-center gap-2">
              <List className="w-4 h-4" /> Bảng Thống Kê Chi Tiết Phòng 
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
                    <td className="py-3 px-3 font-medium text-white truncate max-w-xs group-hover:text-synth-cyan transition-colors">
                      {row.question.prompt.substring(0, 75)}{row.question.prompt.length > 75 ? '...' : ''}
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
                    <td className="py-3 px-3 text-slate-300 font-sans truncate max-w-[150px]">
                      {row.isSkipped ? <span className="text-slate-500 italic">Chưa trả lời</span> : row.userAnswer}
                    </td>
                    <td className="py-3 px-3 text-emerald-400 font-sans font-semibold truncate max-w-[150px]">
                      {row.correctAnswer}
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

          {/* Proceed to Result Screen */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onEscape}
              className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Xem Kết Quả Cuối ➜
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Individual Question Review View
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
          <ArrowLeft className="w-3.5 h-3.5" /> Bảng thống kê 📋
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

        {/* Comprehensive MCQ Choice Annotations */}
        {isMcq && q.options && (
          <div className="space-y-3 pt-3 border-t border-white/5">
            <h5 className="font-orbitron font-bold text-xs uppercase tracking-wider text-synth-cyan">
              💡 Phân tích chi tiết các lựa chọn
            </h5>
            <div className="space-y-2">
              {shuffledReviewOptions.map((option, idx) => {
                const cleanOpt = option.trim();
                const isSelected = reviewItem.userAnswer === cleanOpt;
                const correctAnsStr = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
                const isCorrectChoice = cleanOpt.toLowerCase() === correctAnsStr.toLowerCase();

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
                    <div className="flex-1 space-y-1">
                      <p>{option}</p>
                      <div className="text-[10px] text-slate-400 italic">
                        {isCorrectChoice ? (
                          <span className="text-emerald-400 font-bold">
                            ✔️ Đáp án đúng. {q.explanation || 'Quy tắc ngữ pháp/kiến thức cơ bản áp dụng.'}
                          </span>
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
              <p className="text-emerald-400 font-semibold pt-1">
                Đáp án đúng cần điền: {reviewItem.correctAnswer}
              </p>
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
          className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{ background: 'transparent' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Câu trước
        </button>

        <button
          onClick={() => setSelectedReviewIndex(null)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all bg-synth-cyan text-black border-synth-cyan/35 shadow-[0_0_10px_rgba(0,240,255,0.2)]`}
        >
          <List className="w-3.5 h-3.5" /> Bảng Thống Kê
        </button>

        <button
          disabled={selectedReviewIndex === currentQuestions.length - 1}
          onClick={() => setSelectedReviewIndex(selectedReviewIndex + 1)}
          className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
          style={{ background: 'transparent' }}
        >
          Câu tiếp <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
