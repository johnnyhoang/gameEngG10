import React, { useMemo } from 'react';
import type { QuestionMCQProps } from './types';
import { shuffleWithSeed } from '../../utils/shuffle';
import { MarkdownRenderer } from '../Common/MarkdownRenderer';

/** Strip leading A. / B. / C. / D. (case-insensitive) từ option text */
const stripOptionPrefix = (text: string): string =>
  text.trim().replace(/^[A-D]\s*[.)\u003e]\s*/i, '').trim();

const getMCQLayoutClass = (options: string[]) => {
  if (!options || options.length === 0) return 'grid grid-cols-1 gap-2.5';
  const maxLength = Math.max(...options.map(opt => stripOptionPrefix(opt || '').length));

  if (maxLength <= 8) {
    return 'grid grid-cols-2 md:grid-cols-4 gap-2.5';
  }
  if (maxLength <= 25) {
    return 'grid grid-cols-1 md:grid-cols-2 gap-2.5';
  }
  return 'grid grid-cols-1 gap-2.5';
};

export const QuestionMCQ: React.FC<QuestionMCQProps> = ({
  activeQuestion,
  selectedAnswer,
  checked,
  onSelectAnswer
}) => {
  const shuffledOptions = useMemo(() => {
    return shuffleWithSeed(activeQuestion.options || [], activeQuestion.id);
  }, [activeQuestion.id, activeQuestion.options]);

  if (!activeQuestion.options) return null;

  return (
    <div className={getMCQLayoutClass(shuffledOptions)}>
      {shuffledOptions.map((option, idx) => {
        const cleanOpt = option.trim();
        const displayOpt = stripOptionPrefix(cleanOpt);
        const isSelected = selectedAnswer === cleanOpt || selectedAnswer === displayOpt;
        const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
          ? activeQuestion.correctAnswer[0]
          : activeQuestion.correctAnswer;
        const correctStripped = stripOptionPrefix((correctAnsStr || '').trim());
        const isCorrectOpt =
          cleanOpt.toLowerCase() === (correctAnsStr || '').toLowerCase() ||
          displayOpt.toLowerCase() === correctStripped.toLowerCase();

        let borderClass = 'border-white/10 hover:border-synth-cyan/40 bg-synth-gray/10';
        if (isSelected) borderClass = 'border-synth-cyan bg-synth-cyan/15 text-theme-text-highlight font-semibold';
        if (checked) {
          if (isCorrectOpt) borderClass = 'border-theme-text-success bg-theme-bg-success text-theme-text-success font-bold';
          else if (isSelected) borderClass = 'border-theme-text-error bg-theme-bg-error text-theme-text-error font-bold';
        }

        return (
          <button
            type="button"
            key={idx}
            onClick={() => !checked && onSelectAnswer(cleanOpt)}
            disabled={checked}
            className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${borderClass}`}
          >
            <span className="inline-flex items-start gap-2.5 w-full">
              <span className="font-orbitron font-bold text-synth-text-muted shrink-0 mt-0.5 text-xs">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span className="flex-1 min-w-0">
                <MarkdownRenderer
                  content={displayOpt}
                  className="!text-sm leading-snug [&>p]:mb-0 [&>p]:text-inherit [&_*]:text-inherit"
                />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
