import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Question } from '../types/game';
import { Scratchpad } from './Scratchpad';
import { 
  Award, Flame, Check, X, ArrowRight 
} from 'lucide-react';

interface PlayAreaProps {
  mode: 'grammar' | 'reading' | 'vocabulary' | 'mixed' | 'revenge' | 'boss';
  bossId?: string;
  onFinish: () => void;
}

export const PlayArea: React.FC<PlayAreaProps> = ({ mode, bossId, onFinish }) => {
  const getQuestionByWeight = useGameState(state => state.getQuestionByWeight);
  const questions = useGameState(state => state.questions);
  const player = useGameState(state => state.player);
  const activeCombo = useGameState(state => state.activeCombo);
  const answerQuestion = useGameState(state => state.answerQuestion);
  const currentSubject = useGameState(state => state.currentSubject);
  const buyHint = useGameState(state => state.buyHint);
  const failedQuestionIds = useGameState(state => state.failedQuestionIds || []);
  
  // Game states
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [isLastCorrect, setIsLastCorrect] = useState(false);
  const [rewardsEarned, setRewardsEarned] = useState({ coins: 0, xp: 0 });
  const [runFinished, setRunFinished] = useState(false);
  
  // Hint State
  const [hintUsed, setHintUsed] = useState(false);
  const [revealedHint, setRevealedHint] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<any>(null);

  // Initialize questions for this run
  useEffect(() => {
    // Filter questions by active subject, but keep a safe fallback so the game never stalls on an empty pool.
    const subjectQuestions = questions.filter(q => {
      const qSubject = (q as any).subject || 'english';
      return qSubject === currentSubject;
    });
    const fallbackQuestions = subjectQuestions.length > 0 ? subjectQuestions : questions;

    let pool: Question[] = [];
    const count = mode === 'boss' ? 30 : 10; // Bosses are 30 questions, others are 10
    
    if (mode === 'boss') {
      // Find actual/mock papers based on bossId
      const year = bossId === 'b-2024' ? '2024' : bossId === 'b-2025' ? '2025' : '2026';
      pool = fallbackQuestions.filter(q => q.source.includes(year));
      // Fallback if not enough questions
      if (pool.length < count) {
        pool = [...pool, ...fallbackQuestions.filter(q => !pool.includes(q))].slice(0, count);
      }
    } else if (mode === 'revenge') {
      // Find actual previously failed questions for the current subject
      pool = subjectQuestions.filter(q => failedQuestionIds.includes(q.id));
    } else {
      // Adaptive learning weight selector
      for (let i = 0; i < count; i++) {
        const q = getQuestionByWeight(mode);
        if (q && ((q as any).subject || 'english') === currentSubject && !pool.some(existing => existing.id === q.id)) {
          pool.push(q);
        }
      }
      // If pool is empty, fill with default questions
      if (pool.length === 0) {
        pool = fallbackQuestions.filter(q => {
          if (currentSubject === 'math') {
            if (mode === 'grammar') return q.category === 'parabol-line' || q.category === 'viet-relation';
            if (mode === 'reading') return q.category === 'real-geometry' || q.category === 'plane-geometry';
            if (mode === 'vocabulary') return q.category === 'real-equations' || q.category === 'real-finance';
          } else {
            if (mode === 'grammar') return q.category === 'grammar' || q.category === 'passive-voice' || q.category === 'relative-clauses';
            if (mode === 'reading') return q.category === 'reading' || q.category === 'cloze';
            if (mode === 'vocabulary') return q.category === 'vocabulary' || q.category === 'wordform';
          }
          return true;
        }).slice(0, count);
      }
    }

    // Shuffle questions pool slightly
    setCurrentQuestions(pool.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setRewardsEarned({ coins: 0, xp: 0 });
    setRunFinished(false);

    // Initialize timer for speed challenges / Bosses
    if (mode === 'boss') {
      setTimeLeft(20 * 60); // 20 minutes
    } else {
      setTimeLeft(0);
    }
  }, [mode, bossId, currentSubject, questions, getQuestionByWeight]);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !runFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setRunFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, runFinished]);

  const activeQuestion = currentQuestions[currentIndex];

  const handleUseHint = () => {
    if (!activeQuestion || hintUsed) return;
    if (player.coins < 50) {
      alert('Không đủ Coins (NP) để mua Gợi ý! Cần 50 NP.');
      return;
    }
    
    buyHint();
    setHintUsed(true);

    if (activeQuestion.type === 'mcq' && activeQuestion.options) {
      // 50/50: remove two wrong options
      const correctOpt = activeQuestion.correctAnswer as string;
      const wrongOpts = activeQuestion.options.filter(opt => opt !== correctOpt);
      const randomWrongs = wrongOpts.sort(() => Math.random() - 0.5).slice(0, 2);
      setRevealedHint(`Gợi ý: Hai lựa chọn này là sai: "${randomWrongs.join('" và "')}"`);
    } else if (activeQuestion.type === 'wordform') {
      // Reveal first 2 letters
      const correctStr = Array.isArray(activeQuestion.correctAnswer) 
        ? activeQuestion.correctAnswer[0] 
        : activeQuestion.correctAnswer;
      setRevealedHint(`Gợi ý: Từ bắt đầu bằng: "${correctStr.substring(0, 2).toUpperCase()}..."`);
    } else {
      setRevealedHint(`Gợi ý: ${activeQuestion.explanation.substring(0, 50)}...`);
    }
  };

  const handleCheckAnswer = () => {
    if (checked || !activeQuestion) return;

    let isCorrect = false;
    const cleanAnswer = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');

    if (activeQuestion.type === 'mcq') {
      isCorrect = cleanAnswer(selectedAnswer) === cleanAnswer(activeQuestion.correctAnswer as string);
    } else {
      const answers = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer
        : [activeQuestion.correctAnswer];
      isCorrect = answers.some(ans => cleanAnswer(typedAnswer) === cleanAnswer(ans));
    }

    const mappedMode = mode === 'boss' ? 'boss' : 'practice';
    const outcome = answerQuestion(
      activeQuestion.id,
      isCorrect,
      10, // time spent (mocked)
      mappedMode
    );

    setIsLastCorrect(isCorrect);
    setChecked(true);
    setRewardsEarned(prev => ({
      coins: prev.coins + outcome.coinsGained,
      xp: prev.xp + outcome.expGained
    }));

    // If hearts hit 0 in Survival/Boss, terminate
    if (!isCorrect && (mode === 'boss' || player.hearts <= 1)) {
      // Wait a moment for explanation then trigger Game Over
      setTimeout(() => {
        if (player.hearts <= 1) {
          setRunFinished(true);
        }
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    setChecked(false);
    setSelectedAnswer('');
    setTypedAnswer('');
    setHintUsed(false);
    setRevealedHint('');

    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setRunFinished(true);
      // Double rewards if daily mission completed
      logRunSuccess();
    }
  };

  const logRunSuccess = () => {
    // Custom trigger at end of dungeon
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (runFinished) {
    const isGameOver = player.hearts <= 0 && mode === 'boss';
    return (
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-8 max-w-xl mx-auto text-center space-y-6">
        <Award className="w-16 h-16 mx-auto text-synth-orange animate-bounce" />
        
        <h2 className="font-orbitron font-black text-2xl text-white uppercase tracking-wider">
          {isGameOver ? 'GAME OVER - BOSS THẤT BẠI' : 'CHINH PHỤC THÀNH CÔNG'}
        </h2>
        
        <p className="text-xs text-synth-text-muted">
          {isGameOver 
            ? 'Rất tiếc, con đã cạn kiệt mạng (Hearts) khi chiến đấu với Boss. Hãy quay lại ôn tập thêm nhé!' 
            : `Đã hoàn thành phụ bản ${mode.toUpperCase()}! Hãy cùng xem thành quả chiến lợi phẩm.`}
        </p>

        {/* Reward card */}
        {!isGameOver && (
          <div className="bg-synth-gray/40 rounded-xl p-5 border border-synth-cyan/20 grid grid-cols-2 gap-4">
            <div className="text-center font-orbitron">
              <span className="text-[10px] text-synth-text-muted uppercase">Nanite Vàng</span>
              <p className="text-2xl font-black text-synth-orange">+{rewardsEarned.coins} NP</p>
            </div>
            <div className="text-center font-orbitron">
              <span className="text-[10px] text-synth-text-muted uppercase">Điểm Kinh Nghiệm</span>
              <p className="text-2xl font-black text-synth-cyan">+{rewardsEarned.xp} XP</p>
            </div>
          </div>
        )}

        {/* Payout note */}
        {mode === 'boss' && !isGameOver && (
          <div className="bg-synth-magenta/10 border border-synth-magenta/30 rounded-lg p-3 text-xs text-synth-magenta">
            🔥 Đánh bại Boss: Thưởng tiền mặt đã tự động cộng thêm vào Ví Thưởng!
          </div>
        )}

        <button
          onClick={onFinish}
          className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          Trở Lại Bản Đồ 🗺️
        </button>
      </div>
    );
  }
  if (currentQuestions.length === 0) {
    if (mode === 'revenge') {
      return (
        <div className="glass-panel rounded-2xl border border-synth-cyan/30 p-8 max-w-xl mx-auto text-center space-y-6">
          <Award className="w-16 h-16 mx-auto text-synth-cyan animate-pulse" />
          
          <h2 className="font-orbitron font-black text-2xl text-white uppercase tracking-wider">
            HẦM NGỤC YÊN BÌNH 🛡️
          </h2>
          
          <p className="text-sm text-synth-text-muted leading-relaxed">
            Tuyệt vời! Con không có câu hỏi làm sai nào cần sửa ở môn{' '}
            <span className="text-synth-orange font-bold font-orbitron uppercase">
              {currentSubject === 'english' ? 'Tiếng Anh' : currentSubject === 'math' ? 'Toán Học' : 'Ngữ Văn'}
            </span>. Hãy tiếp tục duy trì phong độ xuất sắc này nhé!
          </p>

          <button
            onClick={onFinish}
            className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Trở Lại Bản Đồ 🗺️
          </button>
        </div>
      );
    }
    return <div className="text-center py-10 font-orbitron text-synth-cyan">Đang nạp câu hỏi...</div>;
  }

  // Check if we should render split screen for literature passages
  const isLitSplit = currentSubject === 'literature' && activeQuestion.prompt.includes('\n\n');
  const passageText = isLitSplit 
    ? activeQuestion.prompt.split('\n\n').slice(0, -1).join('\n\n')
    : '';
  const questionText = isLitSplit 
    ? activeQuestion.prompt.split('\n\n').slice(-1)[0]
    : activeQuestion.prompt;

  return (
    <div className="relative glass-panel rounded-2xl border border-synth-cyan/15 p-6 max-w-2xl mx-auto space-y-6">
      {/* Scratchpad overlay */}
      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}

      {/* Top Play Header */}
      <div className="flex justify-between items-center border-b border-synth-gray pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-synth-cyan font-orbitron uppercase tracking-wider">
            {mode.toUpperCase()} Dungeon
          </span>
          <span className="text-sm font-semibold text-white">
            Câu {currentIndex + 1}/{currentQuestions.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bảng Nháp button */}
          {(currentSubject === 'math' || currentSubject === 'literature') && (
            <button
              onClick={() => setShowScratchpad(true)}
              className="px-2.5 py-1 rounded bg-synth-magenta/20 border border-synth-magenta/40 hover:bg-synth-magenta/40 text-[10px] text-synth-magenta font-bold cursor-pointer transition-colors font-orbitron"
              title="Mở bảng nháp để tính toán"
            >
              BẢNG NHÁP ✏️
            </button>
          )}

          {/* Combo Multiplier */}
          {activeCombo > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded bg-synth-magenta/15 border border-synth-magenta text-synth-magenta font-orbitron font-bold text-xs animate-pulse">
              <Flame className="w-4 h-4 fill-synth-magenta" /> COMBO {activeCombo}
            </div>
          )}
        </div>

        {/* Timer */}
        {timeLeft > 0 && (
          <div className="px-3 py-1 rounded bg-synth-gray border border-white/10 text-xs font-orbitron text-white">
            Hạn Giờ: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden">
        <div 
          className="h-full bg-synth-cyan shadow-[0_0_8px_#00f0ff] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      {/* Content Area */}
      {isLitSplit ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Passage Column */}
          <div className="glass-panel border border-synth-orange/30 p-4 rounded-xl space-y-2 bg-synth-orange/5 max-h-[220px] md:max-h-[350px] overflow-y-auto shadow-[0_0_15px_rgba(255,165,0,0.05)]">
            <span className="text-[10px] font-bold text-synth-orange font-orbitron uppercase tracking-wider block border-b border-synth-orange/20 pb-1.5 mb-2">
              📖 ĐOẠN TRÍCH ĐỌC HIỂU
            </span>
            <div className="text-xs text-white/90 leading-relaxed whitespace-pre-line font-serif italic">
              {passageText}
            </div>
          </div>

          {/* Question & Options Column */}
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] text-synth-text-muted font-bold">
                <span>Nguồn: {activeQuestion.source}</span>
                <span className="text-synth-cyan font-orbitron">Cấp độ khó: {activeQuestion.difficulty}/10</span>
              </div>
              <p className="text-sm text-white font-semibold leading-relaxed bg-synth-gray/20 border border-white/5 rounded-xl p-3.5 whitespace-pre-line">
                {questionText}
              </p>
            </div>

            {/* Answer Forms */}
            <div className="space-y-3">
              {activeQuestion.type === 'mcq' && activeQuestion.options ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeQuestion.options.map((option, idx) => {
                    const cleanOpt = option.trim();
                    const isSelected = selectedAnswer === cleanOpt;
                    const isCorrectOpt = cleanOpt.toLowerCase() === (activeQuestion.correctAnswer as string).toLowerCase();

                    let borderClass = 'border-white/10 hover:border-synth-cyan/40 bg-synth-gray/10';
                    if (isSelected) borderClass = 'border-synth-cyan bg-synth-cyan/15 text-white';
                    if (checked) {
                      if (isCorrectOpt) borderClass = 'border-synth-green bg-synth-green/10 text-synth-green';
                      else if (isSelected) borderClass = 'border-synth-magenta bg-synth-magenta/10 text-synth-magenta';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => !checked && setSelectedAnswer(cleanOpt)}
                        disabled={checked}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all duration-300 cursor-pointer ${borderClass}`}
                      >
                        <span className="font-orbitron font-bold text-synth-text-muted mr-2">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => !checked && setTypedAnswer(e.target.value)}
                    placeholder="Gõ câu trả lời chính xác của con vào đây..."
                    disabled={checked}
                    className="w-full p-3.5 rounded-xl border border-white/10 focus:border-synth-cyan bg-synth-gray/20 text-white text-xs outline-none transition-all duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Regular single column layout */
        <>
          {/* The Question Prompt */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] text-synth-text-muted font-bold">
              <span>Nguồn: {activeQuestion.source}</span>
              <span className="text-synth-cyan font-orbitron">Cấp độ khó: {activeQuestion.difficulty}/10</span>
            </div>
            <p className="text-base text-white font-medium leading-relaxed bg-synth-gray/20 border border-white/5 rounded-xl p-4 whitespace-pre-line">
              {activeQuestion.prompt}
            </p>
          </div>

          {/* Answer Forms */}
          <div className="space-y-3">
            {activeQuestion.type === 'mcq' && activeQuestion.options ? (
              <div className="grid grid-cols-1 gap-2.5">
                {activeQuestion.options.map((option, idx) => {
                  const cleanOpt = option.trim();
                  const isSelected = selectedAnswer === cleanOpt;
                  const isCorrectOpt = cleanOpt.toLowerCase() === (activeQuestion.correctAnswer as string).toLowerCase();

                  let borderClass = 'border-white/10 hover:border-synth-cyan/40 bg-synth-gray/10';
                  if (isSelected) borderClass = 'border-synth-cyan bg-synth-cyan/15 text-white';
                  if (checked) {
                    if (isCorrectOpt) borderClass = 'border-synth-green bg-synth-green/10 text-synth-green';
                    else if (isSelected) borderClass = 'border-synth-magenta bg-synth-magenta/10 text-synth-magenta';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !checked && setSelectedAnswer(cleanOpt)}
                      disabled={checked}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${borderClass}`}
                    >
                      <span className="font-orbitron font-bold text-synth-text-muted mr-3">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => !checked && setTypedAnswer(e.target.value)}
                  placeholder="Gõ câu trả lời chính xác của con vào đây..."
                  disabled={checked}
                  className="w-full p-4 rounded-xl border border-white/10 focus:border-synth-cyan bg-synth-gray/20 text-white text-sm outline-none transition-all duration-300"
                />
                <span className="text-[10px] text-synth-text-muted">
                  *Lưu ý: Viết đúng chính tả, viết hoa chữ cái đầu nếu cần thiết.
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Hint Alert */}
      {revealedHint && (
        <div className="p-3 bg-synth-blue/40 border border-synth-cyan/30 rounded-xl text-xs text-synth-cyan">
          {revealedHint}
        </div>
      )}

      {/* Explanation Box (Visible after check) */}
      {checked && (
        <div className={`p-4 rounded-xl border flex gap-3 text-xs leading-relaxed ${
          isLastCorrect 
            ? 'border-synth-green/30 bg-synth-green/5 text-synth-green' 
            : 'border-synth-magenta/30 bg-synth-magenta/5 text-synth-magenta'
        }`}>
          <div className="mt-0.5">
            {isLastCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </div>
          <div>
            <h5 className="font-bold uppercase tracking-wider mb-1">
              {isLastCorrect ? 'Chính xác! Cực tốt con ơi.' : 'Sai rồi! Đừng nản lòng.'}
            </h5>
            <p className="text-white mb-2 font-medium">
              Đáp án đúng: <span className="font-bold underline text-synth-green">
                {Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join(' | ') : activeQuestion.correctAnswer}
              </span>
            </p>
            <p className="text-synth-text-muted">
              {activeQuestion.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row gap-3 border-t border-synth-gray/50 pt-4">
        {/* Hint button */}
        {!checked && (
          <button
            onClick={handleUseHint}
            disabled={hintUsed}
            className="px-4 py-3 rounded-xl border border-synth-orange/40 hover:bg-synth-orange/5 text-synth-orange font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 w-full sm:w-auto text-center"
          >
            Mua Gợi Ý (50 NP)
          </button>
        )}

        {/* Check/Next button */}
        {!checked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={activeQuestion.type === 'mcq' ? !selectedAnswer : !typedAnswer.trim()}
            className="flex-1 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 disabled:opacity-40 text-center"
          >
            Kiểm Tra Đáp Án
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex-1 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-center"
          >
            Câu Tiếp Theo <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onFinish}
          className="px-4 py-3 rounded-xl border border-synth-gray hover:bg-synth-gray/20 text-synth-text-muted font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 w-full sm:w-auto text-center"
        >
          Trốn Chạy (Thoát)
        </button>
      </div>
    </div>
  );
};
