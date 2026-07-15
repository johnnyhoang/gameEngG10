import type { UiThemeId, SubjectId } from '../../types/game';
import { SUBJECTS_CONFIG } from '../../types/game';
import React, { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

interface StepItem { id: string; text: string; correctOrder: number; }

const STEP_DATA: Record<'math' | 'english' | 'literature', StepItem[]> = {
  math: [
    { id: 's-m1', text: '1. Xác định hệ số a, b, c của phương trình ax² + bx + c = 0', correctOrder: 0 },
    { id: 's-m2', text: '2. Tính biệt thức Delta = b² - 4ac', correctOrder: 1 },
    { id: 's-m3', text: '3. So sánh Delta với số 0 (lớn hơn, bằng hoặc nhỏ hơn 0)', correctOrder: 2 },
    { id: 's-m4', text: '4. Kết luận số nghiệm và áp dụng công thức tìm x₁, x₂', correctOrder: 3 }
  ],
  english: [
    { id: 's-e1', text: '1. Xác định tân ngữ của câu chủ động đưa lên làm chủ ngữ mới', correctOrder: 0 },
    { id: 's-e2', text: '2. Chia động từ BE theo đúng thì của câu chủ động gốc', correctOrder: 1 },
    { id: 's-e3', text: '3. Đưa động từ chính về dạng Quá khứ phân từ V3/ed', correctOrder: 2 },
    { id: 's-e4', text: '4. Thêm cụm "by + tác nhân hành động" ở cuối câu', correctOrder: 3 }
  ],
  literature: [
    { id: 's-l1', text: '1. Tìm hiểu hoàn cảnh sáng tác, tác giả và đề tài chính của tác phẩm', correctOrder: 0 },
    { id: 's-l2', text: '2. Đọc văn bản, phân tích kết cấu và xác định bố cục liên kết', correctOrder: 1 },
    { id: 's-l3', text: '3. Khai thác sâu các biện pháp tu từ, hình ảnh thơ/chi tiết truyện đặc sắc', correctOrder: 2 },
    { id: 's-l4', text: '4. Khái quát giá trị nhân văn nghệ thuật và bài học tư tưởng rút ra', correctOrder: 3 }
  ]
};

const TITLES: Record<string, string> = {
  math: 'Quy Trình Giải PT Bậc Hai',
  english: 'Quy Trình Đổi Câu Bị Động',
  literature: 'Quy Trình Phân Tích Tác Phẩm'
};



export interface StepBuilderAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: { correctAnswers: number; timeSpent: number; score: number; passed: boolean }) => void;
  onGameStart?: () => void;
}

export const StepBuilderApp: React.FC<StepBuilderAppProps> = ({ activeSectId, uiTheme, onReward, onGameComplete, onGameStart }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const hasGameData = activeSectId && activeSectId in STEP_DATA;
  const stepSubject = activeSectId as keyof typeof STEP_DATA;
  
  const [scrambledSteps, setScrambledSteps] = useState<StepItem[]>([]);
  const [stepStatus, setStepStatus] = useState<'playing' | 'won'>('playing');

  useEffect(() => {
    onGameStart?.();
  }, []);

  const initStepGame = () => {
    if (!hasGameData) return;
    setScrambledSteps([...STEP_DATA[stepSubject]].sort(() => 0.5 - Math.random()));
    setStepStatus('playing');
  };

  useEffect(() => { initStepGame(); }, [activeSectId]);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (stepStatus !== 'playing') return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= scrambledSteps.length) return;
    const list = [...scrambledSteps];
    [list[index], list[targetIdx]] = [list[targetIdx], list[index]];
    setScrambledSteps(list);
  };

  const checkStepOrder = () => {
    const isCorrect = scrambledSteps.every((step, idx) => step.correctOrder === idx);
    if (isCorrect) {
      setStepStatus('won');
      onReward(30, 25, 'Hoàn thành Sắp xếp', `Sắp xếp trình tự giải chủ đề ${stepSubject}`);
      toast.success('Chuẩn xác, xếp trình tự ngon rồi! 🎉');
      onGameComplete?.({ correctAnswers: scrambledSteps.length, timeSpent: 0, score: 100, passed: true });
    } else {
      toast.error('Trình tự chưa đúng rồi, hãy suy nghĩ lại nhé!');
    }
  };

  if (!hasGameData) {
    return (
      <div className={`glass-panel rounded-3xl border p-8 text-center space-y-4 max-w-xl mx-auto ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'}`}>
        <p className="text-sm text-slate-300">
          📭 Trò chơi Sắp xếp Trình tự chưa được thiết lập cho môn {SUBJECTS_CONFIG[activeSectId as SubjectId]?.name || activeSectId}.
        </p>
      </div>
    );
  }

  const subjectName = SUBJECTS_CONFIG[stepSubject as SubjectId]?.name || stepSubject;

  return (
    <div className={`glass-panel rounded-3xl border p-6 space-y-6 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-orbitron font-black text-sm uppercase text-white">🧩 Trình Tự Giải</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">{TITLES[stepSubject]}</p>
        </div>
        <div className="text-[10px] font-bold font-orbitron uppercase px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 text-slate-400">
          Chủ đề: {subjectName}
        </div>
      </div>

      {stepStatus === 'playing' ? (
        <div className="space-y-3 max-w-xl mx-auto">
          <p className="text-[10px] text-slate-400 italic">Dùng nút ▲▼ để sắp xếp lại thứ tự các bước cho đúng quy trình:</p>
          {scrambledSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveStep(index, 'up')} disabled={index === 0} className="w-6 h-5 text-[10px] rounded bg-white/10 border border-white/10 hover:bg-white/20 disabled:opacity-20 cursor-pointer transition-all">▲</button>
                <button onClick={() => moveStep(index, 'down')} disabled={index === scrambledSteps.length - 1} className="w-6 h-5 text-[10px] rounded bg-white/10 border border-white/10 hover:bg-white/20 disabled:opacity-20 cursor-pointer transition-all">▼</button>
              </div>
              <div className="w-7 h-7 rounded-full border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center text-xs font-bold font-orbitron text-synth-cyan">{index + 1}</div>
              <p className="text-xs text-slate-200 flex-1 leading-relaxed">{step.text}</p>
            </div>
          ))}
          <button onClick={checkStepOrder} className="w-full mt-2 px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-[1.01] transition-all">
            Kiểm Tra Trình Tự ✔️
          </button>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="text-5xl animate-bounce">🎉🧩✅</div>
          <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Trình Tự Hoàn Hảo!</h4>
          <p className="text-xs text-slate-300">Phần thưởng: +30 Ruby, +25 XP</p>
          <button onClick={initStepGame} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-105 transition-all">
            Thử Chủ Đề Khác 🔁
          </button>
        </div>
      )}
    </div>
  );
};
