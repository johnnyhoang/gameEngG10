import type { UiThemeId } from '../../types/game';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from '../../utils/toast';

const EXPLAIN_TOPICS = {
  pythagoras: {
    title: 'Định lý Pythagoras (Toán 9)',
    keywords: ['vuông', 'cạnh huyền', 'bình phương', 'cộng', 'tổng'],
    missingAlert: 'đặc điểm tam giác vuông hoặc mối quan hệ bình phương cạnh huyền',
    successFeedback: 'Chào bạn! Mình đã ngấm bài. Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: a² + b² = c².',
    counterQ: 'Vậy nếu một tam giác có độ dài ba cạnh lần lượt là 3cm, 4cm, 5cm thì đó có phải là tam giác vuông không ạ?',
    opts: ['A. Đúng, vì 3² + 4² = 5² (9 + 16 = 25)', 'B. Sai, vì tam giác vuông phải có cạnh huyền lớn gấp đôi cạnh góc vuông'],
    correctOpt: 'A. Đúng, vì 3² + 4² = 5² (9 + 16 = 25)'
  },
  present_perfect: {
    title: 'Thì Hiện tại hoàn thành (Tiếng Anh)',
    keywords: ['have', 'has', 'past participle', 'v3', 'hoàn thành', 'trước đây'],
    missingAlert: 'công thức dùng Have/Has đi kèm động từ phân từ hai (V3/ed)',
    successFeedback: 'Hi teacher! Nhờ bạn giảng mà mình đã nắm: hiện tại hoàn thành dùng "Subject + have/has + V3/ed" để kể trải nghiệm chưa cần mốc thời gian.',
    counterQ: 'Cô ơi, vậy câu nào dưới đây chia đúng thì Hiện tại hoàn thành ạ?',
    opts: ['A. She has gone to Paris three times.', 'B. She went to Paris yesterday.', 'C. She goes to Paris every year.'],
    correctOpt: 'A. She has gone to Paris three times.'
  },
  song_poem: {
    title: 'Ý nghĩa hình tượng "Sóng" của Xuân Quỳnh (Văn)',
    keywords: ['tình yêu', 'phụ nữ', 'thủy chung', 'xuân quỳnh', 'biểu tượng', 'ẩn dụ'],
    missingAlert: 'khái niệm ẩn dụ biểu tượng cho tâm trạng thủy chung của người phụ nữ đang yêu',
    successFeedback: 'Chào bạn! Hình tượng "Sóng" vừa là hình ảnh tự nhiên, vừa là biểu tượng ẩn dụ cho tâm hồn rạo rực, khao khát tình yêu chân thành, chung thủy của người phụ nữ.',
    counterQ: 'Vậy trong bài thơ, hình tượng nào luôn song hành và hòa quyện cùng hình tượng "Sóng" ạ?',
    opts: ['A. Thuyền', 'B. Em', 'C. Biển'],
    correctOpt: 'B. Em'
  }
};


export interface ExplainAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (coins: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
}

const getTopicFromSectId = (sectId?: string) => {
  if (sectId === 'english') return 'present_perfect';
  if (sectId === 'literature') return 'song_poem';
  return 'pythagoras';
};

export const ExplainApp: React.FC<ExplainAppProps> = ({ activeSectId, uiTheme, onReward, onGameComplete }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [explainTopic, setExplainTopic] = useState<'pythagoras' | 'present_perfect' | 'song_poem'>(() => getTopicFromSectId(activeSectId));
  const [studentText, setStudentText] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [aiCounterQuestion, setAiCounterQuestion] = useState<{ q: string; opts: string[]; ans: string } | null>(null);
  const [counterAnswer, setCounterAnswer] = useState('');
  const [explainPhase, setExplainPhase] = useState<'input' | 'feedback' | 'won'>('input');

  const handleTeachAI = () => {
    const data = EXPLAIN_TOPICS[explainTopic];
    const text = studentText.toLowerCase().trim();
    if (text.length < 20) { toast.error('Bài giảng ngắn quá. Bạn bung ý thêm chút đi.'); return; }
    const matches = data.keywords.filter(kw => text.includes(kw));
    if (matches.length >= 2) {
      setAiFeedback(data.successFeedback);
      setAiCounterQuestion({ q: data.counterQ, opts: data.opts, ans: data.correctOpt });
      setExplainPhase('feedback');
    } else {
      setAiFeedback(`Mình vẫn chưa ngấm lắm. Bạn còn thiếu ý về [${data.missingAlert}]. Bạn giảng lại thêm một nhịp được không?`);
      setExplainPhase('feedback');
      setAiCounterQuestion(null);
    }
  };

  const handleCounterAnswerSubmit = () => {
    if (!aiCounterQuestion) return;
    if (counterAnswer === aiCounterQuestion.ans) {
      setExplainPhase('won');
      onReward(15, 30, 'Giảng giải cho AI', `Giảng bài thành công chủ đề ${explainTopic}`);
      toast.success('Chuẩn xác. AI đã thông suốt bài này. (+15 NP, +30 XP)');
      onGameComplete?.({ correctAnswers: 1, timeSpent: 0, score: 100, passed: true });
    } else {
      toast.error('Lệch rồi nhé. AI bắt ngược lại luôn, thử lại đi.');
    }
  };

  const restartExplainGame = () => {
    setStudentText(''); setAiFeedback(''); setAiCounterQuestion(null); setCounterAnswer(''); setExplainPhase('input');
  };

  React.useEffect(() => {
    setExplainTopic(getTopicFromSectId(activeSectId));
    restartExplainGame();
  }, [activeSectId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/25'}`}>
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-purple">✍️ Giảng Giải Cho AI</h3>
        </div>

        <div className="bg-synth-purple/5 border border-synth-purple/20 p-3 rounded-xl text-xs text-slate-300">
          <span className="font-bold text-synth-purple">📚 Chủ đề: </span>{EXPLAIN_TOPICS[explainTopic].title}
        </div>

        {explainPhase === 'input' && (
          <div className="space-y-3">
            <p className="text-[10px] text-slate-400">Hãy giảng chủ đề này cho AI như bạn đang dạy một học sinh nhỏ tuổi — dùng ngôn ngữ đơn giản nhất có thể:</p>
            <textarea
              value={studentText}
              onChange={e => setStudentText(e.target.value)}
              placeholder={`Giải thích về "${EXPLAIN_TOPICS[explainTopic].title}"...`}
              className="w-full min-h-[160px] rounded-2xl border border-white/10 bg-synth-gray/25 p-4 text-sm text-white outline-none focus:border-synth-purple/40 resize-y"
            />
            <button onClick={handleTeachAI} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black cursor-pointer hover:scale-105 transition-all">
              <Send className="w-3.5 h-3.5" /> Đẩy bài cho AI
            </button>
          </div>
        )}

        {explainPhase === 'feedback' && (
          <div className="space-y-5 text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
              <h4 className="text-xs font-bold text-synth-purple font-orbitron">💬 Phản hồi từ học sinh AI:</h4>
              <p className="text-xs leading-relaxed text-slate-200 italic">"{aiFeedback}"</p>
            </div>
            {aiCounterQuestion && (
              <div className="bg-synth-purple/5 border border-synth-purple/20 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-white font-orbitron">❓ Câu hỏi kiểm tra từ học sinh AI:</h4>
                <p className="text-xs text-slate-300">{aiCounterQuestion.q}</p>
                <div className="grid grid-cols-1 gap-2">
                  {aiCounterQuestion.opts.map((opt, i) => (
                    <button key={i} onClick={() => setCounterAnswer(opt)} className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${counterAnswer === opt ? 'border-synth-purple bg-synth-purple/10 text-white font-semibold' : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'}`}>{opt}</button>
                  ))}
                </div>
                <button onClick={handleCounterAnswerSubmit} className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black cursor-pointer">Đáp lại AI ✔</button>
              </div>
            )}
            {!aiCounterQuestion && (
              <button onClick={restartExplainGame} className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10">Quay Lại Giảng Bài 🔁</button>
            )}
          </div>
        )}

        {explainPhase === 'won' && (
          <div className="py-12 space-y-4 text-center">
            <div className="text-5xl animate-bounce">🎓🦉🎖️</div>
            <h4 className="font-orbitron font-black text-lg text-synth-green uppercase">Bài Giảng Xuất Sắc</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">AI đã ngấm bài. Bạn nhận +15 NP, +30 XP nhờ kiểu học Feynman.</p>
            <button onClick={restartExplainGame} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black cursor-pointer hover:scale-105 transition-all">Dạy Bài Khác 🔁</button>
          </div>
        )}
      </div>

      <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/15'}`}>
        <div className="space-y-4">
          <h3 className="font-orbitron font-bold text-xs text-synth-purple uppercase">💡 Phương pháp Feynman</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">Khi bạn dạy lại cho AI bằng lời dễ hiểu, hổng nào trong lập luận cũng lộ ra ngay.</p>
          <div className="border border-white/5 p-3 rounded-xl bg-white/5 text-[9px] text-slate-300 space-y-1">
            <span className="font-bold text-synth-orange uppercase block">Từ khóa AI tìm kiếm:</span>
            <ul className="list-disc list-inside text-slate-400 space-y-0.5">
              <li>Toán: vuông, cạnh huyền, bình phương, cộng...</li>
              <li>Anh: have/has, past participle, v3...</li>
              <li>Văn: tình yêu, phụ nữ, thủy chung, biểu tượng...</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
