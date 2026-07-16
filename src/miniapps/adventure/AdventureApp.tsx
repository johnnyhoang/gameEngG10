import React, { useState, useMemo } from 'react';
import { toast } from '../../utils/toast';
import type { Question } from '../../types/game';
import type { UiThemeId } from '../../types/game';
import { shuffleWithSeed } from '../../utils/shuffle';


export interface AdventureAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
  questions?: any[];
}

export const AdventureApp: React.FC<AdventureAppProps> = ({  uiTheme, onReward, onGameComplete,   questions = [] }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [boardPosition, setBoardPosition] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);
  const [rolledNumber, setRolledNumber] = useState(0);
  const [activeBoardQuestion, setActiveBoardQuestion] = useState<Question | null>(null);
  const [boardStatus, setBoardStatus] = useState<'idle' | 'answering' | 'won'>('idle');

  const shuffledAdventureOptions = useMemo(() => {
    if (!activeBoardQuestion?.options) return [];
    return shuffleWithSeed(activeBoardQuestion.options.slice(0, 4), activeBoardQuestion.id);
  }, [activeBoardQuestion?.id, activeBoardQuestion?.options]);

  const handleRollDice = () => {
    if (diceRolling || boardStatus !== 'idle') return;
    setDiceRolling(true);
    setRolledNumber(0);
    let rolls = 0;
    const interval = setInterval(() => {
      setRolledNumber(Math.floor(Math.random() * 3) + 1);
      rolls++;
      if (rolls > 8) {
        clearInterval(interval);
        setDiceRolling(false);
        const rolled = Math.floor(Math.random() * 3) + 1;
        setRolledNumber(rolled);
        const nextPos = Math.min(9, boardPosition + rolled);
        setBoardPosition(nextPos);
        if (nextPos >= 9) {
          setBoardStatus('won');
          onReward(100, 80, 'Về đích Du khảo', 'Nhận rương phần thưởng khuyến học');
          toast.success('Bạn đã clear xong bản đồ du khảo! 🏆');
          onGameComplete?.({ correctAnswers: 10, timeSpent: 0, score: 100, passed: true });
        } else {
          setBoardStatus('answering');
          const mcqQuestions = questions.filter(q => q.type === 'multiple_choice' || q.type === 'mcq');
          const randomQ = mcqQuestions[Math.floor(Math.random() * mcqQuestions.length)];
          setActiveBoardQuestion(randomQ);
        }
      }
    }, 120);
  };

  const handleBoardAnswer = (selectedOption: string) => {
    if (!activeBoardQuestion) return;
    const correctAnsStr = Array.isArray(activeBoardQuestion.correctAnswer) ? activeBoardQuestion.correctAnswer[0] : activeBoardQuestion.correctAnswer;
    if (selectedOption.trim().toLowerCase() === correctAnsStr.trim().toLowerCase()) {
      toast.success('Chuẩn xác, ô này an toàn. (+15 Ruby)');
      onReward(15, 10, 'Đúng ô du khảo', 'Trả lời chính xác ô trivia trên bản đồ du khảo');
      setBoardStatus('idle');
    } else {
      toast.error('Lạc nhịp rồi, lùi 1 ô.');
      setBoardPosition(prev => Math.max(0, prev - 1));
      setBoardStatus('idle');
    }
    setActiveBoardQuestion(null);
  };

  const BOARD_ICONS = ['🏠', '🌲', '🏔️', '🌊', '🗺️', '⚔️', '🔥', '💎', '🏰', '🏆'];

  return (
    <div className={`glass-panel rounded-3xl border p-6 space-y-6 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-orange/30'}`}>
      <div className="text-center space-y-1">
        <h3 className="font-orbitron font-black text-lg text-white uppercase">🧭 Du Khảo Kỳ Thú</h3>
        <p className="text-xs text-slate-400">Tung xúc xắc di chuyển trên bản đồ, trả lời câu hỏi để không bị lùi ô!</p>
      </div>

      {/* Board */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
        {BOARD_ICONS.map((icon, i) => (
          <div key={i} className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center text-xl transition-all ${
            i === boardPosition ? 'border-synth-orange bg-synth-orange/20 shadow-[0_0_12px_rgba(249,115,22,0.4)] scale-110' :
            i < boardPosition ? 'border-synth-green/40 bg-synth-green/10 text-synth-green opacity-60' :
            'border-white/10 bg-white/5 opacity-40'
          }`}>
            {icon}
            <span className="text-[8px] font-bold font-orbitron text-slate-400">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-orbitron font-black text-3xl transition-all ${diceRolling ? 'border-synth-orange animate-spin bg-synth-orange/10' : 'border-white/20 bg-white/5'}`}>
          {rolledNumber > 0 ? rolledNumber : '🎲'}
        </div>
        <div className="text-xs text-slate-400 space-y-1">
          <p>Vị trí: <span className="font-bold text-white">{boardPosition + 1} / 10</span></p>
          <p>Trạng thái: <span className={`font-bold ${boardStatus === 'idle' ? 'text-synth-green' : boardStatus === 'answering' ? 'text-synth-orange' : 'text-yellow-400'}`}>{boardStatus === 'idle' ? 'Sẵn sàng' : boardStatus === 'answering' ? 'Đang trả lời' : 'Thắng!'}</span></p>
        </div>
      </div>

      {boardStatus === 'idle' && boardPosition < 9 && (
        <div className="flex justify-center">
          <button onClick={handleRollDice} disabled={diceRolling}
            className="px-8 py-3 rounded-xl font-orbitron font-bold text-xs uppercase bg-gradient-to-r from-synth-orange to-amber-500 text-black cursor-pointer hover:scale-105 transition-all shadow-[0_0_12px_rgba(249,115,22,0.3)] disabled:opacity-50">
            {diceRolling ? 'Đang lắc...' : 'Tung Xúc Xắc 🎲'}
          </button>
        </div>
      )}

      {boardStatus === 'answering' && activeBoardQuestion && (
        <div className="bg-white/5 border border-synth-orange/20 p-4 rounded-2xl space-y-3 max-w-xl mx-auto">
          <p className="text-[10px] font-bold text-synth-orange font-orbitron uppercase">Câu hỏi ô {boardPosition + 1}:</p>
          <p className="text-sm text-white leading-relaxed">{activeBoardQuestion.prompt}</p>
          {activeBoardQuestion.options && (
            <div className="grid grid-cols-1 gap-2">
              {shuffledAdventureOptions.map((opt, i) => (
                <button key={i} onClick={() => handleBoardAnswer(opt)}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-left text-slate-300 hover:bg-synth-orange/15 hover:border-synth-orange/40 cursor-pointer transition-all">
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {boardStatus === 'won' && (
        <div className="text-center py-6 space-y-4">
          <div className="text-5xl animate-bounce">🏆🎉🥇</div>
          <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Về Đích! Rương Khuyến Học Mở Ra!</h4>
          <p className="text-xs text-slate-300">Phần thưởng: +100 Ruby, +80 XP</p>
          <button onClick={() => { setBoardPosition(0); setBoardStatus('idle'); setRolledNumber(0); }}
            className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-orange text-black cursor-pointer hover:scale-105 transition-all">
            Khám Phá Lại 🔁
          </button>
        </div>
      )}
    </div>
  );
};
