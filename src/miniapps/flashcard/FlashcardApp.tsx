import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { toast } from '../../utils/toast';
import { SUBJECTS_CONFIG } from '../../types/game';
import type { Question, SubjectId, UiThemeId } from '../../types/game';

export interface FlashcardAppProps {
  questions: Question[];
  activeSectId?: string;
  gradeTier: number;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: { correctAnswers: number; timeSpent: number; score: number; passed: boolean }) => void;
}

export const FlashcardApp: React.FC<FlashcardAppProps> = ({ 
  questions, 
  activeSectId, 
  gradeTier,
  uiTheme, 
  onReward,
  onGameComplete 
}) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [activeFlashcards, setActiveFlashcards] = useState<Question[]>([]);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcRememberedCount, setFcRememberedCount] = useState(0);

  const targetSubject = (activeSectId || 'english') as SubjectId;

  useEffect(() => {
    const filtered = questions.filter(q =>
      (q.subject || 'english') === targetSubject && (q.gradeTier ?? q.grade ?? 9) === gradeTier
    );
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 15);
    setActiveFlashcards(shuffled);
  }, [questions, targetSubject, gradeTier]);

  const handleFcNext = () => {
    if (fcIndex < activeFlashcards.length - 1) {
      setFcFlipped(false);
      setTimeout(() => setFcIndex(fcIndex + 1), 300);
    }
  };

  const handleFcPrev = () => {
    if (fcIndex > 0) {
      setFcFlipped(false);
      setTimeout(() => setFcIndex(fcIndex - 1), 300);
    }
  };

  const handleFcRemembered = () => {
    const nextCount = fcRememberedCount + 1;
    setFcRememberedCount(nextCount);
    
    // Call the reward prop instead of global state
    onReward(2, 5, 'Thuộc thẻ nhớ', `Ghi nhớ câu hỏi: ${activeFlashcards[fcIndex].prompt.slice(0, 20)}...`);
    toast.success('Ghi nhận rồi. +2 Ruby, +5 XP 🧠');
    
    if (nextCount === 5) {
      const passed = nextCount >= 4;
      onGameComplete?.({ correctAnswers: nextCount, timeSpent: 0, score: Math.round((nextCount / 5) * 100), passed });
      toast.success('Xuất sắc! Con đã hoàn thành Xong Thẻ Nhớ hôm nay! 🌟');
    }
    
    handleFcNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6 flex flex-col items-center">
        <div
          className="flex items-center gap-2 w-full max-w-2xl px-3 py-2 rounded-xl border border-white/5 bg-black/20 text-[10px] font-bold font-orbitron uppercase"
          style={{ color: SUBJECTS_CONFIG[targetSubject]?.color }}
        >
          <span>{SUBJECTS_CONFIG[targetSubject]?.icon}</span>
          <span>{SUBJECTS_CONFIG[targetSubject]?.name}</span>
        </div>

        {activeFlashcards.length > 0 ? (
          <>
            <div
              onClick={() => setFcFlipped(!fcFlipped)}
              className="w-full max-w-lg aspect-[5/3] cursor-pointer group [perspective:1000px]"
            >
              <div className={`relative w-full h-full duration-500 transform-style-3d ${fcFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                  isUnicorn
                    ? 'bg-gradient-to-br from-white to-violet-50/50 border-violet-200/50 text-violet-900'
                    : 'bg-gradient-to-br from-synth-gray/40 to-synth-bg border-synth-cyan/30 text-white'
                }`}>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${isUnicorn ? 'bg-violet-100 text-violet-700' : 'bg-synth-cyan/15 text-synth-cyan'}`}>
                      Hệ Thống Thẻ Nhớ
                    </span>
                    <span className="text-[10px] font-bold font-orbitron text-slate-400">
                      Thẻ {fcIndex + 1}/{activeFlashcards.length}
                    </span>
                  </div>
                  <div className="text-center py-4 overflow-y-auto max-h-[120px]">
                    <h3 className="font-orbitron font-semibold text-sm sm:text-base tracking-wide select-none leading-relaxed whitespace-pre-line">
                      {activeFlashcards[fcIndex].prompt}
                    </h3>
                  </div>
                  <div className="text-center text-[9px] text-synth-text-muted uppercase tracking-wider font-semibold animate-pulse border-t border-white/5 pt-2">
                    👆 Nhấp vào thẻ để lật xem đáp án mẫu
                  </div>
                </div>
                {/* Back */}
                <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                  isUnicorn
                    ? 'bg-gradient-to-br from-fuchsia-50/90 to-white border-violet-200/50 text-violet-950'
                    : 'bg-gradient-to-br from-synth-gray/50 to-synth-bg border-synth-magenta/30 text-white'
                }`}>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${isUnicorn ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-synth-magenta/15 text-synth-magenta'}`}>
                      Đáp Án & Giải Thích
                    </span>
                    <span className="text-[10px] font-bold font-orbitron text-slate-400">
                      Thẻ {fcIndex + 1}/{activeFlashcards.length}
                    </span>
                  </div>
                  <div className="text-center py-4 overflow-y-auto max-h-[140px] px-2 space-y-2">
                    <p className="text-xs sm:text-sm font-bold text-synth-green">
                      Đáp Án: {Array.isArray(activeFlashcards[fcIndex].correctAnswer) ? activeFlashcards[fcIndex].correctAnswer.join(', ') : activeFlashcards[fcIndex].correctAnswer}
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-300 italic whitespace-pre-line">
                      {activeFlashcards[fcIndex].explanation || 'Chưa cập nhật lý thuyết giải chi tiết.'}
                    </p>
                  </div>
                  <div className="text-center text-[9px] text-synth-text-muted uppercase tracking-wider font-semibold border-t border-white/5 pt-2">
                    Bấm lật lại mặt trước
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button onClick={handleFcPrev} className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'}`}>
                Thẻ Trước
              </button>
              <button onClick={handleFcRemembered} className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.03] transition-all flex items-center gap-1.5 ${isUnicorn ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-synth-green text-black shadow-[0_0_12px_rgba(57,255,20,0.25)]'}`}>
                <Award className="w-4 h-4 text-black" /> Thuộc rồi (+2 Ruby, +5 XP)
              </button>
              <button onClick={handleFcNext} className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'}`}>
                Bỏ qua / Tiếp
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-10 font-orbitron text-synth-text-muted border border-dashed border-white/10 rounded-2xl w-full max-w-lg">
            Không tìm thấy câu hỏi tương thích trong kho học liệu.
          </div>
        )}
      </div>

      <div className={`glass-panel rounded-2xl p-5 border flex flex-col gap-4 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'}`}>
        <h3 className={`font-orbitron font-black text-sm uppercase tracking-wide ${isUnicorn ? 'text-violet-800' : 'text-synth-cyan'}`}>
          📈 Thống Kê Thẻ
        </h3>
        <div className="space-y-2 text-xs">
          <div className={`p-3 rounded-xl border flex justify-between ${isUnicorn ? 'bg-violet-50/50 border-violet-100' : 'bg-white/5 border-white/5'}`}>
            <span className="text-slate-400">Thẻ đang nạp:</span>
            <span className="font-bold font-orbitron">{activeFlashcards.length}</span>
          </div>
          <div className={`p-3 rounded-xl border flex justify-between ${isUnicorn ? 'bg-violet-50/50 border-violet-100' : 'bg-white/5 border-white/5'}`}>
            <span className="text-slate-400">Đã nhớ hôm nay:</span>
            <span className="font-bold font-orbitron text-synth-green">+{fcRememberedCount} thẻ</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-3">
          💡 Kỹ thuật lặp lại ngắt quãng (SRS) giúp tiết kiệm 70% thời gian ôn luyện mà ghi nhớ lâu gấp 3 lần!
        </p>
      </div>
    </div>
  );
};
