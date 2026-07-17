import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PlayAreaControlsProps {
  checked: boolean;
  isAiGrading: boolean;
  selectedAnswer: string;
  typedAnswer: string;
  mode: string;
  dailySkipsCount: number;
  hintUsed: boolean;
  activeQuestionType: string;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
  onUseHint: () => void;
  onEscape: () => void;
  onSkipConfused: () => void;
  onFinishPreview?: () => void;
}

export const PlayAreaControls: React.FC<PlayAreaControlsProps> = ({
  checked,
  isAiGrading,
  selectedAnswer,
  typedAnswer,
  mode,
  dailySkipsCount,
  hintUsed,
  activeQuestionType,
  onCheckAnswer,
  onNextQuestion,
  onUseHint,
  onEscape,
  onSkipConfused,
  onFinishPreview,
}) => {
  const remainingSkips = Math.max(0, 3 - dailySkipsCount);
  const isSkipBlocked = remainingSkips <= 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-2xl mx-auto bg-slate-950/95 backdrop-blur border-t border-white/10 p-3.5 flex flex-wrap items-center justify-between gap-2.5 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] md:relative md:bg-transparent md:backdrop-blur-none md:border-t md:border-synth-gray/50 md:p-0 md:pt-4 md:shadow-none">
      <div className="flex flex-wrap items-center gap-2">
        {!checked ? (
          <button
            type="button"
            onClick={onCheckAnswer}
            disabled={
              isAiGrading ||
              (activeQuestionType === 'mcq' ? !selectedAnswer : !typedAnswer.trim())
            }
            className="px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 disabled:opacity-40 text-center flex items-center justify-center gap-2"
          >
            {isAiGrading ? (
              <>
                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                Trợ Giáo MIKA đang chấm...
              </>
            ) : (
              'Chốt Đáp Án'
            )}
          </button>
        ) : mode === 'preview' ? (
          <button
            type="button"
            onClick={onFinishPreview}
            className="px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-center"
          >
            Đóng xem trước
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-center"
          >
            Sang câu kế <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {!checked && mode !== 'preview' && (
          <button
            type="button"
            onClick={onUseHint}
            disabled={hintUsed || isAiGrading}
            className="px-4 py-2.5 rounded-xl border border-synth-orange/40 hover:bg-synth-orange/5 text-synth-orange font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 text-center"
          >
            Rút gợi ý (50 Ruby)
          </button>
        )}
      </div>

      {mode !== 'preview' && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEscape}
            className="px-4 py-2.5 rounded-xl border border-synth-gray hover:bg-synth-gray/20 text-synth-text-muted font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 text-center"
          >
            Rút khỏi phòng
          </button>

          {!checked && (
            <button
              type="button"
              onClick={onSkipConfused}
              disabled={isSkipBlocked || isAiGrading}
              className="px-4 py-2.5 rounded-xl border border-red-500/40 hover:bg-red-500/10 text-red-400 font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 text-center flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              title={`Lượt Bỏ qua hôm nay: ${remainingSkips}/3`}
            >
              Bỏ qua (Còn {remainingSkips}/3) 🧠
            </button>
          )}
        </div>
      )}
    </div>
  );
};
