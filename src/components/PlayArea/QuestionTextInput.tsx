import React from 'react';
import type { QuestionTextInputProps } from './types';

export const QuestionTextInput: React.FC<QuestionTextInputProps> = ({
  typedAnswer,
  checked,
  onTypeAnswer
}) => {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={typedAnswer}
        onChange={(e) => !checked && onTypeAnswer(e.target.value)}
        placeholder="Nhập đáp án gọn và đúng vào đây..."
        disabled={checked}
        className="w-full p-4 rounded-xl border border-white/10 focus:border-synth-cyan bg-synth-gray/20 text-white text-sm outline-none transition-all duration-300"
      />
      <span className="text-[10px] text-synth-text-muted">
        *Lưu ý: Viết đúng chính tả, viết hoa chữ cái đầu nếu cần thiết.
      </span>
    </div>
  );
};
