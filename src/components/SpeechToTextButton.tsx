import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { toast } from '../utils/toast';

interface SpeechToTextButtonProps {
  onTranscript: (text: string) => void;
  lang?: 'en-US' | 'vi-VN';
  className?: string;
}

export const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({
  onTranscript,
  lang = 'vi-VN',
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Hãy thử Google Chrome!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        toast.error('Vui lòng cấp quyền truy cập Mic cho ứng dụng.');
      } else {
        toast.error('Không thể nhận diện giọng nói. Vui lòng thử lại.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const resultText = event.results[0][0].transcript;
      if (resultText) {
        onTranscript(resultText);
      }
    };

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer ${
        isListening
          ? 'bg-red-500/20 text-red-500 border border-red-500/40 animate-pulse'
          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
      } ${className}`}
      title={isListening ? 'Đang lắng nghe...' : `Bấm để nói (${lang === 'en-US' ? 'Tiếng Anh' : 'Tiếng Việt'})`}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};
