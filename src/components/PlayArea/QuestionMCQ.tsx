import React from 'react';
import type { QuestionMCQProps } from './types';

const getMCQLayoutClass = (options: string[]) => {
  if (!options || options.length === 0) return 'grid grid-cols-1 gap-2.5';
  const maxLength = Math.max(...options.map(opt => {
    if (!opt) return 0;
    let clean = opt.trim();
    if (/^[A-Z]\s*\.\s*/i.test(clean)) {
      clean = clean.replace(/^[A-Z]\s*\.\s*/i, '');
    }
    return clean.length;
  }));

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
  if (!activeQuestion.options) return null;

  return (
    <div className={getMCQLayoutClass(activeQuestion.options)}>
      {activeQuestion.options.map((option, idx) => {
        const cleanOpt = option.trim();
        const isSelected = selectedAnswer === cleanOpt;
        const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
          ? activeQuestion.correctAnswer[0]
          : activeQuestion.correctAnswer;
        const isCorrectOpt = cleanOpt.toLowerCase() === correctAnsStr.toLowerCase();

        let borderClass = 'border-white/10 hover:border-synth-cyan/40 bg-synth-gray/10';
        if (isSelected) borderClass = 'border-synth-cyan bg-synth-cyan/15 text-theme-text-highlight font-semibold';
        if (checked) {
          if (isCorrectOpt) borderClass = 'border-theme-text-success bg-theme-bg-success text-theme-text-success font-bold';
          else if (isSelected) borderClass = 'border-theme-text-error bg-theme-bg-error text-theme-text-error font-bold';
        }

        return (
          <button
            key={idx}
            onClick={() => !checked && onSelectAnswer(cleanOpt)}
            disabled={checked}
            className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${borderClass}`}
          >
            <span className="font-orbitron font-bold text-synth-text-muted mr-3">
              {String.fromCharCode(65 + idx)}.
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
};
