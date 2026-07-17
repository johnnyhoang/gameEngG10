import React, { useState, useMemo } from 'react';
import { toast } from '../../utils/toast';
import type { Question, UiThemeId, SubjectId } from '../../types/game';
import { SUBJECTS_CONFIG } from '../../types/game';
import { shuffleWithSeed } from '../../utils/shuffle';
import { filterQuestionsInScope } from '../../utils/learningScope';


export interface StoryAppProps {
  activeSectId?: string;
  gradeTier: number;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
  questions?: any[];
}

export const StoryApp: React.FC<StoryAppProps> = ({ activeSectId, uiTheme, gradeTier, onReward, onGameComplete, questions = [] }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [storyStep, setStoryStep] = useState(0);
  const [storyLives, setStoryLives] = useState(3);
  const [storyInventory, setStoryInventory] = useState<string[]>([]);
  const [activeStoryQuest, setActiveStoryQuest] = useState<Question | null>(null);

  const shuffledStoryOptions = useMemo(() => {
    if (!activeStoryQuest?.options) return [];
    return shuffleWithSeed(activeStoryQuest.options, activeStoryQuest.id);
  }, [activeStoryQuest?.id, activeStoryQuest?.options]);

  const initStoryQuest = (subject: string) => {
    const isCoreSubject = activeSectId === 'math' || activeSectId === 'english' || activeSectId === 'literature';
    const targetSubject = isCoreSubject ? subject : (activeSectId || 'math');

    const list = filterQuestionsInScope(questions, targetSubject as any, gradeTier);
    if (list.length > 0) {
      setActiveStoryQuest(list[Math.floor(Math.random() * list.length)]);
    } else {
      const fallbackList = filterQuestionsInScope(questions, subject as any, gradeTier);
      if (fallbackList.length > 0) {
        setActiveStoryQuest(fallbackList[Math.floor(Math.random() * fallbackList.length)]);
      }
    }
  };

  const handleStartStory = () => {
    setStoryStep(1);
    setStoryLives(3);
    setStoryInventory([]);
    initStoryQuest('math');
  };

  const handleStoryAnswer = (selectedOption: string) => {
    if (!activeStoryQuest) return;
    const rawCorrect = Array.isArray(activeStoryQuest.correctAnswer) ? activeStoryQuest.correctAnswer[0] : activeStoryQuest.correctAnswer;
    const correctAnsStr = String(rawCorrect ?? '').trim().toLowerCase();
    const selectedOptionStr = String(selectedOption ?? '').trim().toLowerCase();
    if (selectedOptionStr === correctAnsStr) {
      toast.success('Chuẩn, bạn vượt qua thử thách này rồi.');
      if (storyStep === 1) { setStoryInventory(prev => [...prev, '🔑 Chìa Khóa Vàng']); setStoryStep(2); initStoryQuest('english'); }
      else if (storyStep === 2) { setStoryInventory(prev => [...prev, '🧭 La Bàn Cổ']); setStoryStep(3); initStoryQuest('literature'); }
      else if (storyStep === 3) { 
        setStoryInventory(prev => [...prev, '📜 Cuộn Sách Cổ']); 
        setStoryStep(4); 
        onReward(60, 50, 'Phiêu lưu tình huống', 'Giải thoát Heo Maikawaii thành công'); 
        onGameComplete?.({ correctAnswers: 3, timeSpent: 0, score: 100, passed: true });
      }
    } else {
      toast.error('Lệch rồi, chỉnh lại đi.');
      const nextLives = storyLives - 1;
      setStoryLives(nextLives);
      if (nextLives <= 0) { 
        setStoryStep(5); 
        onGameComplete?.({ correctAnswers: storyStep - 1, timeSpent: 0, score: Math.round(((storyStep - 1) / 3) * 100), passed: false });
      } else { 
        initStoryQuest(activeStoryQuest.subject as any); 
      }
    }
  };

  const subjectName = activeSectId === 'math' || activeSectId === 'english' || activeSectId === 'literature' 
    ? '' 
    : (SUBJECTS_CONFIG[activeSectId as SubjectId]?.name || activeSectId);

  const STEP_CONTEXT = [
    '', // step 0
    { icon: '⚔️', location: 'Cổng Đền Cổ', desc: `Quỷ gác cổng chặn đường. Giải câu ${subjectName || 'Toán Học'} để qua!`, subject: subjectName || 'Toán Học' },
    { icon: '🏰', location: 'Hành Lang Thứ Hai', desc: `Đọc hiểu để mở cửa! Giải câu ${subjectName || 'Tiếng Anh'} để tiến bước.`, subject: subjectName || 'Tiếng Anh' },
    { icon: '🗝️', location: 'Phòng Heo Maikawaii', desc: `Giải đúng câu hỏi môn ${subjectName || 'Ngữ Văn'} để giải phóng Heo!`, subject: subjectName || 'Ngữ Văn' },
  ];

  return (
    <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/30'}`}>
      {storyStep === 0 && (
        <div className="max-w-md mx-auto space-y-5 py-6">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl bg-synth-purple/15 border border-synth-purple/35">🎭</div>
          <h3 className="font-orbitron font-black text-lg text-white uppercase">Giải Cứu Heo Maikawaii</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Bé Heo Maikawaii đang bị giam cầm tại đền cổ. Dùng tri thức Toán học, Tiếng Anh và Ngữ văn để vượt qua 3 thử thách!</p>
          <button onClick={handleStartStory} className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold hover:scale-105 transition-all shadow-[0_0_15px_rgba(188,19,254,0.3)] cursor-pointer">
            Bắt Đầu Hành Trình 🧭
          </button>
        </div>
      )}

      {storyStep >= 1 && storyStep <= 3 && activeStoryQuest && (() => {
        const ctx = STEP_CONTEXT[storyStep] as any;
        return (
          <div className="max-w-2xl mx-auto text-left space-y-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">{ctx.icon}</span>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase font-orbitron">{ctx.location}</p>
                  <p className="text-xs font-semibold text-white">Màn {storyStep} / 3</p>
                </div>
              </div>
              <div className="flex gap-1">{Array.from({ length: 3 }).map((_, i) => <span key={i} className={`text-lg ${i < storyLives ? '❤️' : '🖤'}`} />)}</div>
            </div>
            <div className="bg-synth-purple/5 border border-synth-purple/20 p-3 rounded-xl text-xs text-slate-300 italic">{ctx.desc}</div>
            {storyInventory.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {storyInventory.map((item, i) => <span key={i} className="text-xs bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-lg text-yellow-300">{item}</span>)}
              </div>
            )}
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
              <p className="text-[10px] font-bold text-synth-purple font-orbitron uppercase">Câu đố [{ctx.subject}]:</p>
              <p className="text-sm text-white leading-relaxed">{activeStoryQuest.prompt}</p>
              {activeStoryQuest.options && (
                 <div className="grid grid-cols-1 gap-2 mt-2">
                   {shuffledStoryOptions.map((opt, i) => (
                     <button key={i} onClick={() => handleStoryAnswer(opt)} className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-left text-slate-300 hover:bg-synth-purple/15 hover:border-synth-purple/40 cursor-pointer transition-all">
                       {String.fromCharCode(65 + i)}. {opt}
                     </button>
                   ))}
                 </div>
               )}
            </div>
          </div>
        );
      })()}

      {storyStep === 4 && (
        <div className="py-10 space-y-4 max-w-md mx-auto">
          <div className="text-5xl animate-bounce">🎉🐷👑</div>
          <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Heo Maikawaii Được Giải Phóng!</h4>
          <div className="flex gap-2 flex-wrap justify-center">{storyInventory.map((item, i) => <span key={i} className="text-sm">{item}</span>)}</div>
          <p className="text-xs text-slate-300">Phần thưởng: +60 Ruby, +50 XP</p>
          <button onClick={() => setStoryStep(0)} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black cursor-pointer hover:scale-105 transition-all">Chơi Lại Hành Trình 🔁</button>
        </div>
      )}

      {storyStep === 5 && (
        <div className="py-10 space-y-4 max-w-md mx-auto">
          <div className="text-5xl">💀</div>
          <h4 className="font-orbitron font-black text-xl text-red-400 uppercase">Hết Mạng — Thất Bại</h4>
          <p className="text-xs text-slate-400">Tri thức còn thiếu. Ôn luyện thêm rồi quay lại!</p>
          <button onClick={() => setStoryStep(0)} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/10 border border-white/10 text-white cursor-pointer hover:bg-white/15 transition-all">Thử Lại 🔄</button>
        </div>
      )}
    </div>
  );
};
