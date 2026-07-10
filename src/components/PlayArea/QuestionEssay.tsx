import React from 'react';
import type { QuestionEssayProps } from './types';

export const QuestionEssay: React.FC<QuestionEssayProps> = ({
  typedAnswer,
  checked,
  onTypeAnswer
}) => {
  return (
    <div className="space-y-2">
      <textarea
        value={typedAnswer}
        onChange={(e) => !checked && onTypeAnswer(e.target.value)}
        placeholder="Gõ bài làm vào đây, rồi trình bày cho gọn tay..."
        disabled={checked}
        rows={10}
        className="w-full p-4 rounded-xl border border-white/10 focus:border-synth-cyan bg-synth-gray/20 text-white text-sm outline-none transition-all duration-300 font-serif"
      />
      <span className="text-[10px] text-synth-text-muted">
        *Lưu ý: Bài làm nghị luận xã hội/văn học cần lập luận chặt chẽ, đầy đủ bố cục.
      </span>
    </div>
  );
};
