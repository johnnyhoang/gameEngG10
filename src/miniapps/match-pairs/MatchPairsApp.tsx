import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { toast } from '../../utils/toast';
import type { UiThemeId } from '../../types/game';
import { useGameState } from '../../hooks/useGameState';

export interface MatchPairsAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: { correctAnswers: number; timeSpent: number; score: number; passed: boolean }) => void;
}

interface MatchItem {
  id: string;
  text: string;
  pairId: string;
  isMatched: boolean;
}

const ENGLISH_PAIRS = [
  { word: 'Procrastinate', mean: 'Trì hoãn, khất lần' },
  { word: 'Benevolent', mean: 'Nhân từ, rộng lượng' },
  { word: 'Elaborate', mean: 'Chi tiết, tỉ mỉ' },
  { word: 'Abundant', mean: 'Dồi dào, phong phú' },
  { word: 'Obsolete', mean: 'Lỗi thời, cổ xưa' },
  { word: 'Resilient', mean: 'Kiên cường, bền bỉ' }
];
const MATH_PAIRS = [
  { word: 'Diện tích đường tròn', mean: 'S = π * r²' },
  { word: 'Hệ thức Pythagoras', mean: 'a² = b² + c²' },
  { word: 'Thể tích hình trụ', mean: 'V = π * r² * h' },
  { word: 'Diện tích tam giác', mean: 'S = ½ * a * h' },
  { word: 'Hệ thức Vi-ét (Tổng)', mean: 'x₁ + x₂ = -b/a' },
  { word: 'Thể tích hình nón', mean: 'V = ⅓ * π * r² * h' }
];
const LITERATURE_PAIRS = [
  { word: 'Xuân Quỳnh', mean: 'Tác phẩm "Sóng"' },
  { word: 'Nam Cao', mean: 'Tác phẩm "Lão Hạc"' },
  { word: 'Nguyễn Du', mean: 'Tác phẩm "Truyện Kiều"' },
  { word: 'Nguyễn Minh Châu', mean: 'Tác phẩm "Chiếc thuyền ngoài xa"' },
  { word: 'Tô Hoài', mean: 'Tác phẩm "Dế Mèn Phiêu Lưu Ký"' },
  { word: 'Chính Hữu', mean: 'Tác phẩm "Đồng chí"' }
];
const GENERAL_PAIRS = [
  { word: 'Phương pháp Feynman', mean: 'Học bằng cách dạy lại cho người khác' },
  { word: 'Active Recall', mean: 'Chủ động gợi nhớ thông tin để học sâu' },
  { word: 'Spaced Repetition', mean: 'Lặp lại ngắt quãng để chống quên' },
  { word: 'Pomodoro', mean: 'Học tập tập trung 25 phút, nghỉ 5 phút' },
  { word: 'Growth Mindset', mean: 'Tư duy phát triển, không ngại sai lầm' },
  { word: 'Maikawaii', mean: 'Bé Heo linh vật siêu đáng yêu của Học Viện' }
];

export const MatchPairsApp: React.FC<MatchPairsAppProps> = ({ 
  activeSectId, 
  uiTheme, 
  onReward,
  onGameComplete 
}) => {
  const isUnicorn = uiTheme === 'unicorn-dream';
  const questions = useGameState(state => state.questions);

  const matchSubject = activeSectId || 'english';

  const [matchCards, setMatchCards] = useState<MatchItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchStatus, setMatchStatus] = useState<'playing' | 'victory'>('playing');

  const initMatchGame = () => {
    // 1. Cố gắng lấy câu hỏi MCQ của môn học hiện tại
    const mcqQuestions = questions.filter(q => 
      (q.subject === activeSectId || (!q.subject && activeSectId === 'english')) &&
      (q.type === 'mcq' || q.type === 'multiple_choice')
    );

    let pairs: { word: string; mean: string }[] = [];

    if (mcqQuestions.length >= 3) {
      pairs = mcqQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(q => {
          const promptStr = q.prompt.replace(/\*\*.*?\*\*/g, '').trim(); // Bỏ bớt header markdown nếu có
          const shortPrompt = promptStr.length > 55 ? promptStr.substring(0, 52) + '...' : promptStr;
          const correctAns = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
          return {
            word: shortPrompt,
            mean: String(correctAns ?? '')
          };
        });
    } else {
      // 2. Fallback về dữ liệu tĩnh
      let source = GENERAL_PAIRS;
      if (activeSectId === 'math') source = MATH_PAIRS;
      else if (activeSectId === 'literature') source = LITERATURE_PAIRS;
      else if (activeSectId === 'english') source = ENGLISH_PAIRS;
      
      pairs = [...source].sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    const cards: MatchItem[] = [];
    pairs.forEach((p, idx) => {
      const pairId = `pair-${idx}`;
      cards.push({ id: `a-${idx}`, text: p.word, pairId, isMatched: false });
      cards.push({ id: `b-${idx}`, text: p.mean, pairId, isMatched: false });
    });
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchStatus('playing');
  };

  useEffect(() => { initMatchGame(); }, [activeSectId]);

  const handleCardClick = (cardId: string) => {
    const card = matchCards.find(c => c.id === cardId);
    if (!card || card.isMatched || selectedCards.includes(cardId)) return;
    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);
    if (newSelected.length === 2) {
      const card1 = matchCards.find(c => c.id === newSelected[0])!;
      const card2 = matchCards.find(c => c.id === newSelected[1])!;
      if (card1.pairId === card2.pairId) {
        setTimeout(() => {
          const nextCards = matchCards.map(c => c.pairId === card1.pairId ? { ...c, isMatched: true } : c);
          setMatchCards(nextCards);
          setSelectedCards([]);
          toast.success('Ghép khớp. 🎉');

          const allMatched = nextCards.every(c => c.isMatched);
          if (allMatched) {
            setMatchStatus('victory');
            onReward(10, 20, 'Ghép cặp thành công', `Hoàn thành bảng ghép cặp chủ đề ${matchSubject}`);
            onGameComplete?.({ correctAnswers: 5, timeSpent: 0, score: 100, passed: true });
          }
        }, 300);
      } else {
        setTimeout(() => { setSelectedCards([]); toast.error('Lệch cặp rồi, ghép lại đi!'); }, 800);
      }
    }
  };

  return (
    <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-magenta/30'}`}>
      <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
        <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🧩 Ghép Cặp Bài Trùng</h3>
        <p className="text-xs text-slate-400 leading-relaxed">Nối từ vựng với nghĩa, công thức với tên gọi để rèn luyện phản xạ siêu tốc.</p>
        <div className="text-[10px] font-bold font-orbitron uppercase mt-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 inline-block text-slate-400">
          Chủ đề: {matchSubject === 'math' ? 'Hình & Số 📐' : matchSubject === 'literature' ? 'Văn học 📖' : 'Từ vựng 🔤'}
        </div>
      </div>

      {matchStatus === 'playing' ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto py-4">
          {matchCards.map(card => {
            const isSelected = selectedCards.includes(card.id);
            return (
              <div key={card.id} onClick={() => handleCardClick(card.id)} className={`p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center text-center h-24 select-none ${
                card.isMatched ? 'opacity-0 scale-95 pointer-events-none'
                  : isSelected
                    ? isUnicorn ? 'border-violet-600 bg-violet-100 text-violet-900' : 'border-synth-magenta bg-synth-magenta/15 text-synth-magenta font-bold'
                    : isUnicorn ? 'border-violet-200 bg-white hover:border-violet-400 text-violet-900' : 'border-white/10 bg-synth-gray/30 hover:border-white/20 text-white'
              }`}>
                {card.text}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-10 space-y-4 max-w-md mx-auto">
          <div className="text-4xl animate-bounce">🎉🥇🏆</div>
          <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Hoàn Thành Tuyệt Đối</h4>
          <p className="text-xs text-slate-300">Ghép xong toàn bộ cặp liên kết. Thưởng: +10 Ruby, +20 XP</p>
          <button onClick={initMatchGame} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-magenta text-white cursor-pointer hover:scale-105 transition-all">Chơi Lại Bảng Mới 🔄</button>
        </div>
      )}

      {matchStatus === 'playing' && (
        <div className="flex justify-center items-center gap-6 text-xs font-bold pt-2 border-t border-white/5">
          <div className={isUnicorn ? 'text-violet-900' : 'text-white'}>
            Ghép đúng: <span className="font-orbitron font-bold text-synth-green">{matchCards.filter(c => c.isMatched).length / 2} / 5 cặp</span>
          </div>
          <button onClick={initMatchGame} className="text-[10px] text-synth-cyan hover:underline font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Trộn lại bảng
          </button>
        </div>
      )}
    </div>
  );
};
