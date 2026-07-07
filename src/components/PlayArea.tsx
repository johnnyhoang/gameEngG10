import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Question } from '../types/game';
import { ENGLISH_ANSWER_MODE_LABELS, ENGLISH_SKILL_LABELS, ENGLISH_TASK_LABELS } from '../data/englishExamBlueprint';
import { MATH_ANSWER_MODE_LABELS, MATH_TOPIC_LABELS } from '../data/mathExamBlueprint';
import { LITERATURE_ANSWER_MODE_LABELS, LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from '../data/literatureExamBlueprint';
import { Scratchpad } from './Scratchpad';
import { 
  Award, Flame, Check, X, ArrowRight, Volume2, VolumeX 
} from 'lucide-react';
import { sound } from '../utils/sound';

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
  const [lastRubricScore, setLastRubricScore] = useState<number | null>(null);
  const [lastRubricMissing, setLastRubricMissing] = useState<string[]>([]);
  
  // Hint State
  const [hintUsed, setHintUsed] = useState(false);
  const [revealedHint, setRevealedHint] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const toggleMute = () => {
    const nextMuted = !isMuted;
    sound.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleEscape = () => {
    sound.playEscape();
    onFinish();
  };

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
            if (mode === 'grammar') return q.category === 'parabol-line' || q.category === 'viet-relation' || q.category === 'linear-function';
            if (mode === 'reading') return q.category === 'real-geometry' || q.category === 'plane-geometry' || q.category === 'volume-displacement' || q.category === 'tangent-geometry';
            if (mode === 'vocabulary') return q.category === 'real-equations' || q.category === 'real-finance' || q.category === 'growth-modeling' || q.category === 'percentage-discount' || q.category === 'shopping-discount';
          } else {
            if (mode === 'grammar') return q.category === 'grammar' || q.category === 'passive-voice' || q.category === 'relative-clauses' || q.category === 'rewrite';
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
    sound.playCoin();
    setHintUsed(true);

    const answerMode = activeQuestion.metadata?.answerMode;
    const mathTopic = activeQuestion.metadata?.mathTopic;
    const englishTask = activeQuestion.metadata?.englishTask;
    const englishSkill = activeQuestion.metadata?.englishSkill;
    const literatureTask = activeQuestion.metadata?.literatureTask;
    const textGenre = activeQuestion.metadata?.textGenre;

    if (activeQuestion.type === 'mcq' && activeQuestion.options) {
      // 50/50: remove two wrong options
      const correctOpt = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      const wrongOpts = activeQuestion.options.filter(opt => opt !== correctOpt);
      const randomWrongs = wrongOpts.sort(() => Math.random() - 0.5).slice(0, 2);
      setRevealedHint(`Gợi ý: Hai lựa chọn này là sai: "${randomWrongs.join(' và ')}"`);
    } else if (currentSubject === 'english' && englishTask) {
      const skillLabel = englishSkill ? ENGLISH_SKILL_LABELS[englishSkill] || englishSkill : '';
      const taskLabel = ENGLISH_TASK_LABELS[englishTask] || englishTask;
      if (englishTask === 'guided-cloze') {
        setRevealedHint('Gợi ý: Nhìn câu trước và sau chỗ trống để chọn đúng loại từ và collocation.');
      } else if (englishTask === 'reading-true-false') {
        setRevealedHint('Gợi ý: Scan keywords trong statement rồi đối chiếu đúng từng ý trong passage.');
      } else if (englishTask === 'reading-mcq') {
        setRevealedHint('Gợi ý: Tìm từ khóa chính và xác định đoạn chứa thông tin liên quan nhất.');
      } else if (englishTask === 'word-form') {
        setRevealedHint('Gợi ý: Xác định loại từ cần điền: noun, verb, adjective hay adverb.');
      } else if (englishTask === 'rearrangement') {
        setRevealedHint('Gợi ý: Bắt đầu từ chủ ngữ, động từ và các cụm bổ nghĩa cố định trước.');
      } else if (englishTask === 'transformation') {
        setRevealedHint('Gợi ý: Xác định cấu trúc mục tiêu trước: tense, reported speech, passive, clause...');
      } else {
        setRevealedHint(`Gợi ý${skillLabel ? ` (${skillLabel})` : ''}: Tập trung vào dạng ${taskLabel.toLowerCase()} và quy tắc ngữ pháp liên quan.`);
      }
    } else if (currentSubject === 'literature' && literatureTask === 'social-essay') {
      const steps = activeQuestion.metadata?.solutionSteps || [];
      setRevealedHint(`Gợi ý: Bám bố cục nghị luận và nêu dàn ý rõ ràng${steps[0] ? `, bắt đầu từ "${steps[0]}"` : ''}.`);
    } else if (currentSubject === 'literature' && literatureTask) {
      const genreLabel = textGenre ? LITERATURE_TEXT_GENRE_LABELS[textGenre] || textGenre : '';
      const taskLabel = LITERATURE_TASK_LABELS[literatureTask] || literatureTask;
      setRevealedHint(`Gợi ý${genreLabel ? ` (${genreLabel})` : ''}: Tập trung vào ý ${taskLabel.toLowerCase()} và nêu đúng chi tiết trọng tâm.`);
    } else if (answerMode === 'proof' || activeQuestion.type === 'proof') {
      setRevealedHint('Gợi ý: Bài chứng minh nên đi từ giả thiết, dựng hình hoặc biến đổi trung gian trước khi kết luận.');
    } else if (answerMode === 'multi-part' || activeQuestion.type === 'multi-part') {
      setRevealedHint('Gợi ý: Chia bài thành từng ý a/b/c, làm ý dễ trước để lấy dữ kiện cho ý sau.');
    } else if (activeQuestion.type === 'wordform' || answerMode === 'short-answer' || answerMode === 'numeric' || answerMode === 'expression') {
      const correctStr = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      setRevealedHint(`Gợi ý: Đáp án có thể bắt đầu bằng "${correctStr.substring(0, 2).toUpperCase()}..."`);
    } else {
      const extra = mathTopic ? ` (${MATH_TOPIC_LABELS[mathTopic] || mathTopic})` : '';
      setRevealedHint(`Gợi ý${extra}: ${activeQuestion.explanation.substring(0, 50)}...`);
    }
  };

  const handleCheckAnswer = () => {
    if (checked || !activeQuestion) return;

    let isCorrect = false;
    let scoreRatio = 0;
    const cleanAnswer = (str: string) => str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[–−]/g, '-')
      .replace(/[×·]/g, '*')
      .replace(/[₁]/g, '1')
      .replace(/[₂]/g, '2');

    if (activeQuestion.type === 'mcq') {
      const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      isCorrect = cleanAnswer(selectedAnswer) === cleanAnswer(correctAnsStr);
      scoreRatio = isCorrect ? 1 : 0;
    } else {
      const answers = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer
        : [activeQuestion.correctAnswer];
      const normalizedTyped = cleanAnswer(typedAnswer);
      const isLiteratureRubric = currentSubject === 'literature' && activeQuestion.category === 'literature-writing';
      if (isLiteratureRubric) {
        const matchedAnswers = answers.filter(ans => {
          const normalizedAns = cleanAnswer(ans);
          return normalizedAns.length >= 4 && normalizedTyped.includes(normalizedAns);
        });
        const matched = matchedAnswers.length;
        scoreRatio = answers.length > 0 ? Math.min(1, matched / answers.length) : 0;
        isCorrect = scoreRatio >= 0.6;
        setLastRubricScore(Math.round(scoreRatio * 10));
        setLastRubricMissing(answers.filter(ans => !matchedAnswers.includes(ans)));
      } else {
        isCorrect = answers.some(ans => normalizedTyped === cleanAnswer(ans));
        scoreRatio = isCorrect ? 1 : 0;
        setLastRubricScore(null);
        setLastRubricMissing([]);
      }
    }

    if (activeQuestion.type === 'mcq') {
      setLastRubricScore(null);
      setLastRubricMissing([]);
    }

    const mappedMode = mode === 'boss' ? 'boss' : 'practice';
    const outcome = answerQuestion(
      activeQuestion.id,
      isCorrect,
      10, // time spent (mocked)
      mappedMode,
      scoreRatio
    );

    setIsLastCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }
    setRewardsEarned(prev => ({
      coins: prev.coins + outcome.coinsGained,
      xp: prev.xp + outcome.expGained
    }));

    // If hearts hit 0 in Survival/Boss, terminate
    if (scoreRatio < 0.35 && (mode === 'boss' || player.hearts <= 1)) {
      // Wait a moment for explanation then trigger Game Over
      setTimeout(() => {
        if (player.hearts <= 1) {
          setRunFinished(true);
        }
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    sound.playNext();
    setChecked(false);
    setSelectedAnswer('');
    setTypedAnswer('');
    setHintUsed(false);
    setRevealedHint('');
    setLastRubricScore(null);
    setLastRubricMissing([]);

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
          onClick={handleEscape}
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
            onClick={handleEscape}
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
          {activeQuestion.metadata?.examPart && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-synth-magenta/15 border border-synth-magenta/30 text-synth-magenta font-orbitron font-bold uppercase tracking-wider">
              {activeQuestion.metadata.examPart}
            </span>
          )}
          {activeQuestion.metadata?.answerMode && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan font-orbitron font-bold uppercase tracking-wider">
              {(activeQuestion.subject === 'literature' ? LITERATURE_ANSWER_MODE_LABELS : activeQuestion.subject === 'english' ? ENGLISH_ANSWER_MODE_LABELS : MATH_ANSWER_MODE_LABELS)[activeQuestion.metadata.answerMode] || activeQuestion.metadata.answerMode}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishPart && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-synth-magenta/15 border border-synth-magenta/30 text-synth-magenta font-orbitron font-bold uppercase tracking-wider">
              {activeQuestion.metadata.englishPart}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishTask && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white font-orbitron font-bold uppercase tracking-wider">
              {ENGLISH_TASK_LABELS[activeQuestion.metadata.englishTask] || activeQuestion.metadata.englishTask}
            </span>
          )}
          {activeQuestion.subject === 'english' && activeQuestion.metadata?.englishSkill && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan font-orbitron font-bold uppercase tracking-wider">
              {ENGLISH_SKILL_LABELS[activeQuestion.metadata.englishSkill] || activeQuestion.metadata.englishSkill}
            </span>
          )}
          {activeQuestion.metadata?.literatureTask && currentSubject === 'literature' && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-synth-orange/15 border border-synth-orange/30 text-synth-orange font-orbitron font-bold uppercase tracking-wider">
              {LITERATURE_TASK_LABELS[activeQuestion.metadata.literatureTask] || activeQuestion.metadata.literatureTask}
            </span>
          )}
          {activeQuestion.metadata?.textGenre && currentSubject === 'literature' && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white font-orbitron font-bold uppercase tracking-wider">
              {LITERATURE_TEXT_GENRE_LABELS[activeQuestion.metadata.textGenre] || activeQuestion.metadata.textGenre}
            </span>
          )}
          <span className="text-sm font-semibold text-white">
            Câu {currentIndex + 1}/{currentQuestions.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute/Unmute sound button */}
          <button
            onClick={toggleMute}
            className="px-2.5 py-1 rounded bg-synth-gray/50 border border-white/10 hover:bg-synth-gray text-white cursor-pointer transition-colors flex items-center justify-center"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-synth-magenta mr-1" /> : <Volume2 className="w-3.5 h-3.5 text-synth-cyan mr-1" />}
            <span className="font-orbitron font-bold text-[9px] tracking-wide uppercase">
              {isMuted ? 'MUTE' : 'SOUND'}
            </span>
          </button>

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
              {activeQuestion.imageUrl && (
                <div className="flex justify-center bg-synth-gray/10 border border-white/5 rounded-xl p-3">
                  <img 
                    src={activeQuestion.imageUrl} 
                    className="rounded-lg max-h-[140px] object-contain border border-synth-orange/20 shadow-[0_0_15px_rgba(255,165,0,0.05)]" 
                    alt="Question Illustration" 
                  />
                </div>
              )}
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
                    const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
                      ? activeQuestion.correctAnswer[0]
                      : activeQuestion.correctAnswer;
                    const isCorrectOpt = cleanOpt.toLowerCase() === correctAnsStr.toLowerCase();

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
            {activeQuestion.imageUrl && (
              <div className="flex justify-center bg-synth-gray/10 border border-white/5 rounded-xl p-3">
                <img 
                  src={activeQuestion.imageUrl} 
                  className="rounded-lg max-h-[160px] md:max-h-[220px] object-contain border border-synth-orange/20 shadow-[0_0_15px_rgba(255,165,0,0.05)]" 
                  alt="Question Illustration" 
                />
              </div>
            )}
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
                  const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
                    ? activeQuestion.correctAnswer[0]
                    : activeQuestion.correctAnswer;
                  const isCorrectOpt = cleanOpt.toLowerCase() === correctAnsStr.toLowerCase();

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
          <div className="space-y-2">
            <h5 className="font-bold uppercase tracking-wider mb-1">
              {currentSubject === 'literature' && activeQuestion.category === 'literature-writing'
                ? isLastCorrect ? 'Bài viết đạt rubric' : 'Bài viết cần cải thiện theo rubric'
                : isLastCorrect ? 'Chính xác! Cực tốt con ơi.' : 'Sai rồi! Đừng nản lòng.'}
            </h5>
            {currentSubject === 'literature' && activeQuestion.category === 'literature-writing' ? (
              <p className="text-white mb-2 font-medium">
                Điểm ước tính: <span className="font-bold underline text-synth-green">{lastRubricScore ?? 0}/10</span>
              </p>
            ) : (
              <p className="text-white mb-2 font-medium">
                Đáp án đúng: <span className="font-bold underline text-synth-green">
                  {Array.isArray(activeQuestion.correctAnswer) ? activeQuestion.correctAnswer.join(' | ') : activeQuestion.correctAnswer}
                </span>
              </p>
            )}
            {currentSubject === 'literature' && activeQuestion.category === 'literature-writing' && lastRubricMissing.length > 0 && (
              <div className="text-white/90 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px]">Ý còn thiếu / cần mạnh hơn</p>
                <ul className="list-disc pl-4 space-y-0.5 text-white/80">
                  {lastRubricMissing.slice(0, 5).map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-synth-text-muted">
              {activeQuestion.explanation}
            </p>
            {currentSubject === 'literature' && activeQuestion.category === 'literature-writing' && activeQuestion.metadata?.solutionSteps?.length ? (
              <div className="text-white/90 space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px]">Rubric gợi ý</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-white/80">
                  {activeQuestion.metadata.solutionSteps.map(step => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="text-synth-text-muted text-[10px] italic">Không viết hộ đáp án hoàn chỉnh; chỉ chấm và chỉ ra điểm cần cải thiện.</p>
              </div>
            ) : null}
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
          onClick={handleEscape}
          className="px-4 py-3 rounded-xl border border-synth-gray hover:bg-synth-gray/20 text-synth-text-muted font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 w-full sm:w-auto text-center"
        >
          Trốn Chạy (Thoát)
        </button>
      </div>
    </div>
  );
};
