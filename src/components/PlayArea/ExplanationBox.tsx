import React from 'react';
import { Check, X } from 'lucide-react';
import type { ExplanationBoxProps } from './types';
import { getAssessmentProvider } from '../../subject-modules/registry';
import type { SubjectId } from '../../types/game';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';

export const ExplanationBox: React.FC<ExplanationBoxProps> = ({
  activeSectId,
  activeQuestion,
  isLastCorrect,
  lastRubricScore,
  lastRubricMissing,
  aiWarningMessage,
  aiFeedback,
  aiSuggestions
}) => {
  const isWriting = Boolean(getAssessmentProvider(activeSectId as SubjectId, activeQuestion));

  return (
    <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed ${
      isLastCorrect 
        ? 'border-theme-border-success bg-theme-bg-success text-theme-text-success font-semibold' 
        : 'border-theme-border-error bg-theme-bg-error text-theme-text-error font-semibold'
    }`}>
      <div className="mt-0.5">
        {isLastCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </div>
      <div className="space-y-2 flex-1">
        <h5 className="font-bold uppercase tracking-wider mb-1">
          {isWriting
            ? isLastCorrect ? 'Bài viết vượt qua thử thách rubric' : 'Bài viết còn hở rubric'
            : isLastCorrect ? 'Chuẩn xác, khá đấy.' : 'Chưa chính xác rồi. Con hãy xem lại kiến thức và thử lại nhé.'}
        </h5>
        
        {isWriting ? (
          <p className="text-theme-text-highlight mb-2 font-medium">
            Điểm ước tính: <span className="font-bold underline text-theme-text-success">{lastRubricScore ?? 0}/10</span>
          </p>
        ) : (
          <p className="text-theme-text-highlight mb-2 font-medium">
            Đáp án chuẩn: <span className="font-bold underline text-theme-text-success">
              {Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join(' | ') : activeQuestion.correctAnswer}
            </span>
          </p>
        )}

        {aiWarningMessage && (
          <div className="p-2.5 bg-theme-bg-error/30 border border-theme-border-error/50 rounded-lg text-theme-text-warning font-bold text-[11px] mb-2">
            ⚠️ {aiWarningMessage}
          </div>
        )}

        {isWriting && lastRubricMissing.length > 0 && (
          <div className="text-theme-text-highlight/90 space-y-1">
            <p className="font-bold uppercase tracking-wider text-[10px]">Ý còn thiếu / cần mạnh hơn</p>
            <ul className="list-disc pl-4 space-y-0.5 text-theme-text-highlight/80">
              {lastRubricMissing.slice(0, 5).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {aiFeedback && (
          <div className="text-theme-text-highlight/95 space-y-1 mt-2">
            <p className="font-bold uppercase tracking-wider text-[10px] text-theme-text-info">Trợ Giáo MIKA luận giải</p>
            <div className="text-theme-text-highlight/90 italic leading-relaxed bg-synth-gray/25 p-2 rounded-lg">
              <MarkdownRenderer content={aiFeedback} className="italic text-theme-text-highlight/90" />
            </div>
          </div>
        )}

        {aiSuggestions && aiSuggestions.length > 0 && (
          <div className="text-theme-text-highlight/95 space-y-1 mt-2">
            <p className="font-bold uppercase tracking-wider text-[10px] text-theme-text-info">Cẩm nang sửa bài</p>
            <ul className="list-disc pl-4 space-y-0.5 text-theme-text-highlight/80">
              {aiSuggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeQuestion.explanation && (
          <div className="text-synth-text-muted">
            <MarkdownRenderer content={activeQuestion.explanation} className="text-synth-text-muted" />
          </div>
        )}

        {isWriting && activeQuestion.metadata?.solutionSteps?.length ? (
          <div className="text-theme-text-highlight/90 space-y-1">
            <p className="font-bold uppercase tracking-wider text-[10px]">Rubric gợi ý</p>
            <ol className="list-decimal pl-4 space-y-0.5 text-theme-text-highlight/80">
              {activeQuestion.metadata.solutionSteps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-synth-text-muted text-[10px] italic">Chỉ chấm, không viết hộ đáp án hoàn chỉnh.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
