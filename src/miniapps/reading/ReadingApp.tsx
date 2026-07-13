import type { UiThemeId } from '../../types/game';
import React, { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

const READING_DATA = {
  english: {
    words: ['Solar', 'energy', 'represents', 'a', 'clean,', 'renewable,', 'and', 'infinitely', 'abundant', 'source', 'of', 'power.'],
    targetWords: ['Solar', 'energy', 'clean,', 'renewable,'],
    question: 'Ý chính của đoạn văn trên thảo luận về điều gì?',
    options: ['A. Sự hạn chế của điện than truyền thống', 'B. Lợi ích vượt trội của nguồn năng lượng mặt trời', 'C. Cơ chế chuyển đổi nhiệt lượng Trái đất'],
    correctOption: 'B. Lợi ích vượt trội của nguồn năng lượng mặt trời',
    passage: 'Solar energy represents a clean, renewable, and infinitely abundant source of power. Harnessing this energy helps decrease emissions dramatically.'
  },
  math: {
    words: ['Theo', 'định', 'lý', 'Pythagoras,', 'bình', 'phương', 'cạnh', 'huyền', 'bằng', 'tổng', 'bình', 'phương', 'hai', 'cạnh', 'góc', 'vuông.'],
    targetWords: ['Pythagoras,', 'cạnh', 'huyền'],
    question: 'Phát biểu Pythagoras áp dụng cho loại tam giác nào?',
    options: ['A. Tam giác đều', 'B. Tam giác cân', 'C. Tam giác vuông'],
    correctOption: 'C. Tam giác vuông',
    passage: 'Một tam giác vuông luôn có tổng hai góc nhọn phụ nhau. Theo định lý Pythagoras, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.'
  },
  literature: {
    words: ['hình', 'tượng', 'sóng', 'là', 'biểu', 'tượng', 'sinh', 'động', 'của', 'tâm', 'trạng', 'người', 'phụ', 'nữ', 'đang', 'yêu.'],
    targetWords: ['sóng', 'tâm', 'trạng', 'người', 'phụ', 'nữ'],
    question: 'Hình tượng sóng trong bài thơ của Xuân Quỳnh ẩn dụ cho điều gì?',
    options: ['A. Sự dữ dội của bão tố thiên tai', 'B. Vẻ đẹp kỳ vĩ của đại dương xanh', 'C. Tâm trạng thiết tha thủy chung của người con gái đang yêu'],
    correctOption: 'C. Tâm trạng thiết tha thủy chung của người con gái đang yêu',
    passage: 'Xuân Quỳnh đã tạo ra một ẩn dụ độc đáo. Trong bài thơ Sóng, hình tượng sóng là biểu tượng sinh động của tâm trạng người phụ nữ đang yêu.'
  }
};


export interface ReadingAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
}

const getSubjectFromSectId = (sectId?: string) => {
  if (sectId === 'english') return 'english';
  if (sectId === 'literature') return 'literature';
  return 'math';
};

export const ReadingApp: React.FC<ReadingAppProps> = ({ activeSectId, uiTheme, onReward, onGameComplete }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [readingSubject, setReadingSubject] = useState<'english' | 'math' | 'literature'>(() => getSubjectFromSectId(activeSectId));
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [selectedReadingOption, setSelectedReadingOption] = useState('');
  const [readingChecked, setReadingChecked] = useState(false);
  const [readingResult, setReadingResult] = useState<'success' | 'fail' | null>(null);

  const initReadingGame = () => {
    setHighlightedIndices([]);
    setSelectedReadingOption('');
    setReadingChecked(false);
    setReadingResult(null);
  };

  useEffect(() => {
    setReadingSubject(getSubjectFromSectId(activeSectId));
  }, [activeSectId]);

  useEffect(() => { initReadingGame(); }, [readingSubject]);

  const toggleWordHighlight = (index: number) => {
    if (readingChecked) return;
    setHighlightedIndices(prev => prev.includes(index) ? prev.filter(x => x !== index) : [...prev, index]);
  };

  const checkReadingChallenge = () => {
    const data = READING_DATA[readingSubject];
    if (!selectedReadingOption.trim()) { toast.error('Vui lòng chọn một đáp án!'); return; }
    const highlightedWords = highlightedIndices.map(idx => data.words[idx].replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ''));
    const matchCount = highlightedWords.filter(w => data.targetWords.some(tw => tw.toLowerCase().includes(w.toLowerCase()))).length;
    const isOptionCorrect = selectedReadingOption.trim() === data.correctOption;
    const isHighlightAcceptable = matchCount >= 1;
    setReadingChecked(true);
    if (isOptionCorrect && isHighlightAcceptable) {
      setReadingResult('success');
      onReward(35, 30, 'Đọc hiểu sâu', `Hoàn thành thử thách đọc hiểu môn ${readingSubject}`);
      toast.success('Chuẩn, bạn bắt đúng từ khóa và chốt đúng ý cốt lõi! 🎉');
      onGameComplete?.({ correctAnswers: 1, timeSpent: 0, score: 100, passed: true });
    } else {
      setReadingResult('fail');
      toast.error('Đáp án hoặc từ khóa tô sáng chưa chính xác rồi.');
      onGameComplete?.({ correctAnswers: 0, timeSpent: 0, score: 0, passed: false });
    }
  };

  const data = READING_DATA[readingSubject];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'}`}>
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-cyan">📖 Thử Thách Đọc Hiểu</h3>
        </div>

        <div className="bg-synth-cyan/5 border border-synth-cyan/10 p-3 rounded-xl text-[10px] text-synth-cyan font-semibold">
          👉 Nhấp chọn các từ khóa chính liên quan đến ý chính của đoạn văn:
        </div>

        <div className="bg-black/30 border border-white/5 rounded-2xl p-4 leading-relaxed flex flex-wrap gap-1.5 text-xs text-white italic text-slate-300 mb-2">
          <span className="not-italic font-bold text-slate-400 w-full text-[9px] uppercase">Đoạn văn:</span>
          {data.words.map((word, idx) => {
            const isHighlighted = highlightedIndices.includes(idx);
            return (
              <span key={idx} onClick={() => toggleWordHighlight(idx)} className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${isHighlighted ? 'bg-synth-cyan/30 border border-synth-cyan/50 text-synth-cyan font-bold scale-105' : 'bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10'}`}>
                {word}
              </span>
            );
          })}
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3 text-left">
          <h4 className="text-xs font-bold text-white">Câu hỏi: {data.question}</h4>
          <div className="grid grid-cols-1 gap-2">
            {data.options.map((opt, i) => (
              <button key={i} onClick={() => !readingChecked && setSelectedReadingOption(opt)} disabled={readingChecked}
                className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${selectedReadingOption === opt ? 'border-synth-cyan bg-synth-cyan/15 text-synth-cyan font-semibold' : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                {opt}
              </button>
            ))}
          </div>
          {!readingChecked ? (
            <button onClick={checkReadingChallenge} className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer">Xác Nhận Thử Thách ✔️</button>
          ) : (
            <button onClick={initReadingGame} className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10">Thử Lại Màn Khác 🔁</button>
          )}
        </div>
      </div>

      <div className={`glass-panel rounded-2xl p-5 border ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'}`}>
        <h3 className="font-orbitron font-black text-xs text-synth-cyan uppercase mb-3">📝 Hướng Dẫn</h3>
        <ul className="text-[10px] text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
          <li>Đọc đoạn văn bên trái, nhấp chọn từ khóa chính mà bạn cho là quan trọng.</li>
          <li>Chọn đáp án MCQ phù hợp với ý chính đoạn văn.</li>
          <li>Nhấn "Xác Nhận" để kiểm tra kết quả.</li>
        </ul>
        {readingResult && (
          <div className={`mt-4 p-3 rounded-xl border text-xs font-bold ${readingResult === 'success' ? 'bg-synth-green/10 border-synth-green/30 text-synth-green' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            {readingResult === 'success' ? '✅ Xuất sắc! +35 Ruby, +30 XP' : '❌ Chưa đúng. Thử lại nhé!'}
          </div>
        )}
      </div>
    </div>
  );
};
