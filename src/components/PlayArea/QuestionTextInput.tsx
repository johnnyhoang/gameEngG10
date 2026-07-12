import React from 'react';
import type { QuestionTextInputProps } from './types';
import { SpeechToTextButton } from '../SpeechToTextButton';

export const QuestionTextInput: React.FC<QuestionTextInputProps> = ({
  typedAnswer,
  checked,
  onTypeAnswer,
  lang = 'vi-VN'
}) => {
  const handleTranscript = (text: string) => {
    onTypeAnswer(typedAnswer ? typedAnswer + ' ' + text : text);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={typedAnswer}
          onChange={(e) => !checked && onTypeAnswer(e.target.value)}
          placeholder="Nhập đáp án gọn và đúng vào đây..."
          disabled={checked}
          className="w-full p-4 rounded-xl border border-white/10 focus:border-synth-cyan bg-synth-gray/20 text-white text-sm outline-none transition-all duration-300"
        />
        {!checked && (
          <SpeechToTextButton
            onTranscript={handleTranscript}
            lang={lang}
            className="p-4 hover:synth-glow-cyan h-full"
          />
        )}
      </div>
      <span className="text-[10px] text-synth-text-muted">
        *Lưu ý: Viết đúng chính tả, viết hoa chữ cái đầu nếu cần thiết.
      </span>
    </div>
  );
};
