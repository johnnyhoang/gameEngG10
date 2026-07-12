import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import type { Question } from '../types/game';
import { INITIAL_LESSONS } from '../data/lessons';
import { ENGLISH_SKILL_LABELS, ENGLISH_TASK_LABELS } from '../data/englishExamBlueprint';
import { MATH_TOPIC_LABELS } from '../data/mathExamBlueprint';
import { LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from '../data/literatureExamBlueprint';
import { Scratchpad } from './Scratchpad';
const BikiHinhHocPhang = lazy(() => import('./BikiHinhHocPhang').then(m => ({ default: m.BikiHinhHocPhang })));
const Biki3DStudio = lazy(() => import('./Biki3DStudio').then(m => ({ default: m.Biki3DStudio })));
import { ArrowRight, Award } from 'lucide-react';
import { MonChuHoiToiDialog } from './MonChuHoiToiDialog';
import { sound } from '../utils/sound';
import { toast } from '../utils/toast';
import { supabase } from '../utils/supabaseClient';
import { gameService } from '../services/gameService';

// Subcomponents
import { PlayAreaHeader } from './PlayArea/PlayAreaHeader';
import { QuestionMCQ } from './PlayArea/QuestionMCQ';
import { QuestionEssay } from './PlayArea/QuestionEssay';
import { QuestionTextInput } from './PlayArea/QuestionTextInput';
import { ExplanationBox } from './PlayArea/ExplanationBox';
import { RunFinishedScreen } from './PlayArea/RunFinishedScreen';

interface PlayAreaProps {
  mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival';
  bossId?: string;
  lessonId?: string;
  onFinish: (summary?: { accuracyRatio: number }) => void;
}

export const PlayArea: React.FC<PlayAreaProps> = ({ mode, bossId, lessonId, onFinish }) => {
  const getQuestionByWeight = useGameState(state => state.getQuestionByWeight);
  const questions = useGameState(state => state.questions);
  const player = useGameState(state => state.player);
  const activeCombo = useGameState(state => state.activeCombo);
  const answerQuestion = useGameState(state => state.answerQuestion);
  const { activeSectId } = useSect();
  const buyHint = useGameState(state => state.buyHint);
  const flagQuestionConfused = useGameState(state => state.flagQuestionConfused);
  const failedQuestionIds = useGameState(state => state.failedQuestionIds || []);
  const applyDefeatPenalty = useGameState(state => state.applyDefeatPenalty);
  const completeBossVictory = useGameState(state => state.completeBossVictory);
  const syncSessionResult = useGameState(state => state.syncSessionResult);
  const activeGradeTier = useGameState(state => state.activeGradeTier);

  // Game states
  const [sessionId, setSessionId] = useState<string>('');
  const [answersSubmitted, setAnswersSubmitted] = useState<any[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const [isLastCorrect, setIsLastCorrect] = useState(false);
  const [rewardsEarned, setRewardsEarned] = useState({ coins: 0, xp: 0 });
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  
  // Bộ đếm lỗi NỘI BỘ của lượt chơi
  const [runMistakes, setRunMistakes] = useState(0);
  const [runFinished, setRunFinished] = useState(false);
  const runEndHandledRef = useRef(false);
  
  const [lastRubricScore, setLastRubricScore] = useState<number | null>(null);
  const [lastRubricMissing, setLastRubricMissing] = useState<string[]>([]);
  const [isAiGrading, setIsAiGrading] = useState(false);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiWarningMessage, setAiWarningMessage] = useState<string>('');
  
  // Hint State
  const [hintUsed, setHintUsed] = useState(false);
  const [revealedHint, setRevealedHint] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showBikiBoard, setShowBikiBoard] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const toggleMute = () => {
    const nextMuted = !isMuted;
    sound.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleEscape = () => {
    sound.playEscape();
    const accuracyRatio = sessionAnswered > 0 ? sessionCorrect / sessionAnswered : 0;
    onFinish({ accuracyRatio });
  };

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<any>(null);

  // Initialize questions for this run
  useEffect(() => {
    let active = true;

    const initOnlineSession = async () => {
      // Phiên dev-backdoor (mock-*) không có backend thật — dùng thẳng bộ câu hỏi local.
      if (player.id?.startsWith('mock-')) {
        runLocalFallback();
        return;
      }
      try {
        const res = await gameService.startSession({
          profileId: player.id,
          sessionType: mode,
          subject: activeSectId,
          gradeTier: activeGradeTier,
          bossId,
          lessonId,
          failedQuestionIds
        });

        if (active) {
          setSessionId(res.sessionId);
          setCurrentQuestions(res.questions);
          setCurrentIndex(0);
          setAnswersSubmitted([]);
          setRewardsEarned({ coins: 0, xp: 0 });
          setSessionAnswered(0);
          setSessionCorrect(0);
          setRunFinished(false);
          runEndHandledRef.current = false;
          setRunMistakes(0);

          if (mode === 'boss') {
            setTimeLeft(20 * 60);
          } else {
            setTimeLeft(0);
          }
        }
      } catch (err) {
        console.error('Failed to start online game session, falling back to local pool:', err);
        if (active) {
          runLocalFallback();
        }
      }
    };

    const runLocalFallback = () => {
      const subjectQuestions = questions.filter(q => {
        const qSubject = (q as any).subject || 'english';
        return qSubject === activeSectId;
      });
      const fallbackQuestions = subjectQuestions.length > 0 ? subjectQuestions : questions;

      let pool: Question[] = [];
      const count = mode === 'boss' ? 5 : mode === 'survival' ? 15 : 10;

      if (mode === 'boss') {
        const bossTag = bossId === 'b-2024' ? '2024'
          : bossId === 'b-2025' ? '2025'
          : bossId === 'b-2026' ? '2026'
          : bossId === 'b-hk1' ? 'HK1'
          : bossId === 'b-hk2' ? 'HK2'
          : '2026';
        const examPool = fallbackQuestions.filter(q => q.source.includes(bossTag));
        const fullExamPool = examPool.length > 0 ? examPool : fallbackQuestions;
        const examSample = fullExamPool.length > 20
          ? [...fullExamPool].sort(() => Math.random() - 0.5).slice(0, 20)
          : fullExamPool;
        pool = [...examSample].sort(() => Math.random() - 0.5).slice(0, count);
      } else if (mode === 'revenge') {
        pool = subjectQuestions.filter(q => failedQuestionIds.includes(q.id));
      } else if (mode === 'lesson') {
        const lesson = INITIAL_LESSONS.find(l => l.id === lessonId);
        if (lesson) {
          pool = fallbackQuestions.filter(q => (q as any).lessonId === lessonId || q.category === lesson.category);
          pool = pool.slice(0, 3);
        }
        if (pool.length < 3) {
          const extra = fallbackQuestions.filter(q => !pool.includes(q));
          pool = [...pool, ...extra].slice(0, 3);
        }
      } else {
        const weightMode = mode === 'survival' ? 'mixed' : mode;
        for (let i = 0; i < count; i++) {
          const q = getQuestionByWeight(weightMode);
          if (q && ((q as any).subject || 'english') === activeSectId && !pool.some(existing => existing.id === q.id)) {
            pool.push(q);
          }
        }
        if (pool.length === 0) {
          pool = fallbackQuestions.filter(q => {
            if (activeSectId === 'math') {
              if (mode === 'grammar') return q.category === 'parabol-line' || q.category === 'viet-relation' || q.category === 'linear-function';
              if (mode === 'reading') return q.category === 'real-geometry' || q.category === 'plane-geometry' || q.category === 'volume-displacement' || q.category === 'tangent-geometry';
              if (mode === 'vocabulary') return q.category === 'real-equations' || q.category === 'real-finance' || q.category === 'growth-modeling' || q.category === 'percentage-discount' || q.category === 'shopping-discount';
            } else {
              if (mode === 'grammar') return q.category === 'grammar' || q.category === 'passive-voice' || q.category === 'relative-clauses' || q.category === 'rewrite';
              if (mode === 'reading') return q.category === 'reading' || q.category === 'cloze';
              if (mode === 'vocabulary') return q.category === 'vocabulary' || q.category === 'wordform';
              if (mode === 'pronunciation') return q.category === 'pronunciation' || q.category === 'stress';
            }
            return true;
          }).slice(0, count);
        }
      }

      setSessionId('');
      setCurrentQuestions(pool.sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setAnswersSubmitted([]);
      setRewardsEarned({ coins: 0, xp: 0 });
      setSessionAnswered(0);
      setSessionCorrect(0);
      setRunFinished(false);
      runEndHandledRef.current = false;
      setRunMistakes(0);

      if (mode === 'boss') {
        setTimeLeft(20 * 60);
      } else {
        setTimeLeft(0);
      }
    };

    initOnlineSession();

    return () => {
      active = false;
    };
  }, [mode, bossId, lessonId, activeSectId, questions, getQuestionByWeight, failedQuestionIds, player.id, activeGradeTier]);

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

  // Handle game end scenarios
  useEffect(() => {
    if (!runFinished || runEndHandledRef.current) return;
    runEndHandledRef.current = true;

    const isDefeat = runMistakes >= 3 && (mode === 'boss' || mode === 'survival');
    
    const submitResults = async () => {
      try {
        if (!sessionId) {
          // Fallback if session wasn't started online
          if (isDefeat) {
            applyDefeatPenalty(rewardsEarned.coins, rewardsEarned.xp);
          } else if (mode === 'boss') {
            const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
              : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
              : bossId === 'b-2026' ? 2
              : undefined;
            completeBossVictory(bossBonusIndex);
          }
          return;
        }

        const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
          : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
          : bossId === 'b-2026' ? 2
          : undefined;

        const res = await gameService.endSession({
          sessionId,
          profileId: player.id,
          answers: answersSubmitted,
          isDefeat,
          bossBonusIndex
        });

        if (res.success) {
          // Sync server rewards back to client store
          syncSessionResult({
            newCoins: res.newCoins,
            newXp: res.newXp,
            newLevel: res.newLevel,
            badges: res.badges
          });

          // Hiển thị phần thưởng thực tế nhận được từ server trên UI
          setRewardsEarned({
            coins: res.coinsGained,
            xp: res.xpGained
          });
        }
      } catch (err) {
        console.error('Failed to submit session result, run fallback:', err);
        // Fallback local update if network failed
        if (isDefeat) {
          applyDefeatPenalty(rewardsEarned.coins, rewardsEarned.xp);
        } else if (mode === 'boss') {
          const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
            : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
            : bossId === 'b-2026' ? 2
            : undefined;
          completeBossVictory(bossBonusIndex);
        }
      }
    };

    submitResults();
  }, [runFinished, runMistakes, mode, bossId, sessionId, player.id, answersSubmitted, rewardsEarned, applyDefeatPenalty, completeBossVictory, syncSessionResult]);

  const activeQuestion = currentQuestions[currentIndex];

  const handleUseHint = () => {
    if (!activeQuestion || hintUsed) return;
    if (player.coins < 50) {
      toast.error('Không đủ NP để mua gợi ý. Cần 50 NP.');
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
      const correctOpt = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      const wrongOpts = activeQuestion.options.filter(opt => opt !== correctOpt);
      const randomWrongs = wrongOpts.sort(() => Math.random() - 0.5).slice(0, 2);
      setRevealedHint(`Gợi ý: Hai lựa chọn này lệch nhịp: "${randomWrongs.join(' và ')}"`);
    } else if (activeSectId === 'english' && englishTask) {
      const skillLabel = englishSkill ? ENGLISH_SKILL_LABELS[englishSkill] || englishSkill : '';
      const taskLabel = ENGLISH_TASK_LABELS[englishTask] || englishTask;
      if (englishTask === 'guided-cloze') {
        setRevealedHint('Gợi ý: So câu trước sau chỗ trống rồi chốt loại từ, collocation.');
      } else if (englishTask === 'reading-true-false') {
        setRevealedHint('Gợi ý: Quét keyword trong statement rồi đối chiếu từng ý trong passage.');
      } else if (englishTask === 'reading-mcq') {
        setRevealedHint('Gợi ý: Bắt keyword chính rồi lần về đoạn chứa dữ kiện.');
      } else if (englishTask === 'word-form') {
        setRevealedHint('Gợi ý: Chốt loại từ cần điền: noun, verb, adjective hay adverb.');
      } else if (mode === 'pronunciation') {
        setRevealedHint('Gợi ý: Canh đuôi -ed/-s, âm gần nhau và trọng âm.');
      } else if (englishTask === 'rearrangement') {
        setRevealedHint('Gợi ý: Đi từ chủ ngữ, động từ và cụm cố định trước.');
      } else if (englishTask === 'transformation') {
        setRevealedHint('Gợi ý: Chốt cấu trúc trước: tense, reported speech, passive, clause...');
      } else {
        setRevealedHint(`Gợi ý${skillLabel ? ` (${skillLabel})` : ''}: Tập trung vào dạng ${taskLabel.toLowerCase()} và quy tắc ngữ pháp liên quan.`);
      }
    } else if (activeSectId === 'literature' && literatureTask === 'social-essay') {
      const steps = activeQuestion.metadata?.solutionSteps || [];
      setRevealedHint(`Gợi ý: Bám bố cục nghị luận, dựng dàn ý rõ ràng${steps[0] ? `, bắt đầu từ "${steps[0]}"` : ''}.`);
    } else if (activeSectId === 'literature' && literatureTask) {
      const genreLabel = textGenre ? LITERATURE_TEXT_GENRE_LABELS[textGenre] || textGenre : '';
      const taskLabel = LITERATURE_TASK_LABELS[literatureTask] || literatureTask;
      setRevealedHint(`Gợi ý${genreLabel ? ` (${genreLabel})` : ''}: Tập trung vào ý ${taskLabel.toLowerCase()} và nêu đúng chi tiết trọng tâm.`);
    } else if (answerMode === 'proof' || activeQuestion.type === 'proof') {
      setRevealedHint('Gợi ý: Đi từ giả thiết, dựng hình hoặc biến đổi trung gian rồi mới chốt.');
    } else if (answerMode === 'multi-part' || activeQuestion.type === 'multi-part') {
      setRevealedHint('Gợi ý: Chia a/b/c rõ ràng, hạ ý dễ trước để lấy đà.');
    } else if (activeQuestion.type === 'wordform' || answerMode === 'short-answer' || answerMode === 'numeric' || answerMode === 'expression') {
      const correctStr = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      setRevealedHint(`Gợi ý: Đáp án thường mở bằng "${correctStr.substring(0, 2).toUpperCase()}..."`);
    } else {
      const extra = mathTopic ? ` (${MATH_TOPIC_LABELS[mathTopic] || mathTopic})` : '';
      setRevealedHint(`Gợi ý${extra}: ${activeQuestion.explanation.substring(0, 50)}...`);
    }
  };

  const handleCheckAnswer = async () => {
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

    const runOldGradingBackup = () => {
      const answers = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer
        : [activeQuestion.correctAnswer];
      const normalizedTyped = cleanAnswer(typedAnswer);
      const matchedAnswers = answers.filter(ans => {
        const normalizedAns = cleanAnswer(ans);
        return normalizedAns.length >= 4 && normalizedTyped.includes(normalizedAns);
      });
      const matched = matchedAnswers.length;
      const computedScoreRatio = answers.length > 0 ? Math.min(1, matched / answers.length) : 0;
      const computedIsCorrect = computedScoreRatio >= 0.6;
      setLastRubricScore(Math.round(computedScoreRatio * 10));
      setLastRubricMissing(answers.filter(ans => !matchedAnswers.includes(ans)));
      return { isCorrect: computedIsCorrect, scoreRatio: computedScoreRatio };
    };

    const isLiteratureRubric = activeSectId === 'literature' && activeQuestion.category === 'literature-writing';

    if (activeQuestion.type === 'mcq') {
      const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer[0]
        : activeQuestion.correctAnswer;
      isCorrect = cleanAnswer(selectedAnswer) === cleanAnswer(correctAnsStr);
      scoreRatio = isCorrect ? 1 : 0;
      setLastRubricScore(null);
      setLastRubricMissing([]);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');
    } else if (isLiteratureRubric) {
      setIsAiGrading(true);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const token = session?.access_token;
        if (!token) throw new Error('No auth token available');

        const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
        const answers = Array.isArray(activeQuestion.correctAnswer)
          ? activeQuestion.correctAnswer
          : [activeQuestion.correctAnswer];
        
        const res = await fetch(`${backendUrl}/api/ai/grade-literature`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            promptText: activeQuestion.prompt,
            essay: typedAnswer,
            keywords: answers,
            rubric: activeQuestion.metadata?.solutionSteps || []
          })
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error(`API error: ${res.status} ${errText}`);
        }

        const data = await res.json();
        if (data.success && data.result) {
          const { score, missingKeywords = [], feedback = '', suggestions = [] } = data.result;
          scoreRatio = score / 10;
          isCorrect = scoreRatio >= 0.6;
          setLastRubricScore(score);
          setLastRubricMissing(missingKeywords);
          setAiFeedback(feedback);
          setAiSuggestions(suggestions);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err: any) {
        console.error('Lỗi khi gọi AI chấm bài, chuyển sang backup:', err);
        setAiWarningMessage('Linh Sư phải chấm dự phòng. Kết quả vẫn ổn, nhưng nên coi như mốc tham chiếu.');
        const fallbackResult = runOldGradingBackup();
        isCorrect = fallbackResult.isCorrect;
        scoreRatio = fallbackResult.scoreRatio;
      } finally {
        setIsAiGrading(false);
      }
    } else if (activeSectId === 'math' && (activeQuestion.type === 'short-answer' || activeQuestion.type === 'text_input')) {
      setIsAiGrading(true);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const token = session?.access_token;
        if (!token) throw new Error('No auth token available');

        const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
        const correctAnsStr = Array.isArray(activeQuestion.correctAnswer)
          ? activeQuestion.correctAnswer[0]
          : activeQuestion.correctAnswer;

        const res = await fetch(`${backendUrl}/api/ai/grade-math`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            questionPrompt: activeQuestion.prompt,
            correctAnswer: correctAnsStr,
            studentAnswer: typedAnswer
          })
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        isCorrect = data.isCorrect;
        scoreRatio = isCorrect ? 1 : 0;
        setAiFeedback(data.explanation || '');
      } catch (err: any) {
        console.error('Lỗi khi gọi AI chấm Toán tự luận, dùng backup:', err);
        setAiWarningMessage('Linh Sư chấm Toán tự luận dự phòng (So khớp chuỗi).');
        const answers = Array.isArray(activeQuestion.correctAnswer)
          ? activeQuestion.correctAnswer
          : [activeQuestion.correctAnswer];
        const normalizedTyped = cleanAnswer(typedAnswer);
        isCorrect = answers.some(ans => normalizedTyped === cleanAnswer(ans));
        scoreRatio = isCorrect ? 1 : 0;
      } finally {
        setIsAiGrading(false);
      }
    } else {
      const answers = Array.isArray(activeQuestion.correctAnswer)
        ? activeQuestion.correctAnswer
        : [activeQuestion.correctAnswer];
      const normalizedTyped = cleanAnswer(typedAnswer);
      isCorrect = answers.some(ans => normalizedTyped === cleanAnswer(ans));
      scoreRatio = isCorrect ? 1 : 0;
      setLastRubricScore(null);
      setLastRubricMissing([]);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');
    }

    if (activeQuestion.type === 'mcq') {
      setLastRubricScore(null);
      setLastRubricMissing([]);
    }

    const mappedMode = mode === 'boss' ? 'boss' : mode === 'survival' ? 'survival' : 'practice';
    const outcome = answerQuestion(
      activeQuestion.id,
      isCorrect,
      10,
      mappedMode,
      scoreRatio
    );

    setAnswersSubmitted(prev => [
      ...prev,
      {
        questionId: activeQuestion.id,
        typedAnswer: activeQuestion.type !== 'mcq' ? typedAnswer : undefined,
        selectedAnswer: activeQuestion.type === 'mcq' ? selectedAnswer : undefined,
        scoreRatio: scoreRatio
      }
    ]);

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
    setSessionAnswered(prev => prev + 1);
    if (isCorrect) setSessionCorrect(prev => prev + 1);

    if (scoreRatio < 0.35 && (mode === 'boss' || mode === 'survival')) {
      const nextMistakes = runMistakes + 1;
      setRunMistakes(nextMistakes);
      if (nextMistakes >= 3) {
        setTimeout(() => setRunFinished(true), 1500);
      }
    }
  };

  const handleSkipConfused = () => {
    if (!activeQuestion) return;
    setIsSkipDialogOpen(true);
  };

  const handleConfirmSkip = async (reason: 'quá khó' | 'quá dài' | 'quá khùng', severity: number) => {
    if (!activeQuestion) return;
    setIsSkipDialogOpen(false);
    
    const success = await flagQuestionConfused(activeQuestion, reason, severity);
    if (success) {
      toast.success('Đã gửi phản ánh tới Môn Chủ. Câu này sẽ được gác lại.');
      sound.playNext();
      
      setChecked(false);
      setSelectedAnswer('');
      setTypedAnswer('');
      setHintUsed(false);
      setRevealedHint('');
      setLastRubricScore(null);
      setLastRubricMissing([]);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');
      setShowBikiBoard(false);

      if (currentIndex + 1 < currentQuestions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setRunFinished(true);
      }
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
    setAiFeedback('');
    setAiSuggestions([]);
    setAiWarningMessage('');
    setShowBikiBoard(false);

    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setRunFinished(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const modeLabel = mode === 'vocabulary'
    ? 'Vocabulary Castle'
    : mode === 'pronunciation'
      ? 'Pronunciation Peak'
      : mode === 'grammar'
        ? 'Grammar Cave'
        : mode === 'reading'
          ? 'Reading Forest'
          : mode === 'mixed'
            ? 'Phụ bản hỗn hợp'
            : mode === 'revenge'
              ? 'Phụ bản trả bài'
              : mode === 'boss'
                ? 'Đấu trường Boss'
                : mode === 'survival'
                  ? 'Đấu trường sinh tồn'
                  : 'Phụ bản bài học';

  // --- Early returns ---
  if (runFinished) {
    return (
      <RunFinishedScreen
        mode={mode}
        rewardsEarned={rewardsEarned}
        runMistakes={runMistakes}
        onEscape={handleEscape}
      />
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
            Chuẩn xác, không có câu nào cần sửa ở môn{' '}
            <span className="text-synth-orange font-bold font-orbitron uppercase">
              {activeSectId === 'english' ? 'Tiếng Anh' : activeSectId === 'math' ? 'Toán Học' : 'Ngữ Văn'}
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
    return <div className="text-center py-10 font-orbitron text-theme-text-info">Đang rút câu vào ải...</div>;
  }

  const isLitSplit = activeSectId === 'literature' && activeQuestion.prompt.includes('\n\n');
  const passageText = isLitSplit 
    ? activeQuestion.prompt.split('\n\n').slice(0, -1).join('\n\n')
    : '';
  const questionText = isLitSplit 
    ? activeQuestion.prompt.split('\n\n').slice(-1)[0]
    : activeQuestion.prompt;

  const isGeometry = activeQuestion.subject === 'math' && (
    (activeQuestion.category || '').toLowerCase().includes('geometry') ||
    (activeQuestion.metadata?.mathTopic || '').toLowerCase().includes('geometry') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình học') ||
    (activeQuestion.prompt || '').toLowerCase().includes('đường tròn') ||
    (activeQuestion.prompt || '').toLowerCase().includes('tam giác') ||
    (activeQuestion.prompt || '').toLowerCase().includes('tứ giác') ||
    (activeQuestion.prompt || '').toLowerCase().includes('tiếp tuyến') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình trụ') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình nón') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình cầu')
  );

  const is3D = isGeometry && (
    (activeQuestion.category || '').toLowerCase().includes('real-geometry') ||
    (activeQuestion.category || '').toLowerCase().includes('space') ||
    (activeQuestion.metadata?.mathTopic || '').toLowerCase().includes('space') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình trụ') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình nón') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình cầu') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình hộp') ||
    (activeQuestion.prompt || '').toLowerCase().includes('lăng trụ') ||
    (activeQuestion.prompt || '').toLowerCase().includes('tứ diện') ||
    (activeQuestion.prompt || '').toLowerCase().includes('hình chóp')
  );

  // Render input form matching question type
  const renderAnswerForm = () => {
    if (activeQuestion.type === 'mcq' && activeQuestion.options) {
      return (
        <QuestionMCQ
          activeQuestion={activeQuestion}
          selectedAnswer={selectedAnswer}
          checked={checked}
          onSelectAnswer={setSelectedAnswer}
        />
      );
    }
    if (activeSectId === 'literature' && activeQuestion.category === 'literature-writing') {
      return (
        <QuestionEssay
          typedAnswer={typedAnswer}
          checked={checked}
          onTypeAnswer={setTypedAnswer}
          lang="vi-VN"
        />
      );
    }
    return (
      <QuestionTextInput
        typedAnswer={typedAnswer}
        checked={checked}
        onTypeAnswer={setTypedAnswer}
        lang={activeSectId === 'english' ? 'en-US' : 'vi-VN'}
      />
    );
  };

  return (
    <div className="relative glass-panel rounded-2xl border border-synth-cyan/15 p-6 max-w-2xl mx-auto space-y-6">
      {/* Scratchpad overlay */}
      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}

      {/* Play Header */}
      <PlayAreaHeader
        modeLabel={modeLabel}
        activeQuestion={activeQuestion}
        currentIndex={currentIndex}
        totalQuestions={currentQuestions.length}
        isMuted={isMuted}
        activeCombo={activeCombo}
        timeLeft={timeLeft}
        activeSectId={activeSectId}
        onToggleMute={toggleMute}
        onShowScratchpad={() => setShowScratchpad(true)}
        formatTime={formatTime}
      />

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

            {/* Render MCQ / Essay / TextInput */}
            {renderAnswerForm()}
          </div>
        </div>
      ) : (
        /* Regular single column layout */
        <>
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

          {/* Geometry drawing board */}
          {isGeometry && (
            <div className="border border-synth-cyan/20 rounded-xl bg-synth-gray/10 overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setShowBikiBoard(!showBikiBoard)}
                className="w-full px-4 py-2.5 bg-synth-cyan/10 hover:bg-synth-cyan/15 flex items-center justify-between text-xs font-orbitron font-bold text-synth-cyan uppercase tracking-wider cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  📐 Bảng Vẽ Hình Học (Phẳng & Không Gian)
                  <span className="text-[10px] text-synth-text-muted lowercase font-normal italic">
                    (Nhấp để {showBikiBoard ? 'thu gọn' : 'mở rộng'})
                  </span>
                </span>
                <span>{showBikiBoard ? '▼' : '▲'}</span>
              </button>
              
              {showBikiBoard && (
                <div className="p-3 border-t border-synth-cyan/15 bg-black/25 space-y-4">
                  <Suspense fallback={<div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan"></div></div>}>
                    {is3D ? (
                      <Biki3DStudio problemText={activeQuestion.prompt} />
                    ) : (
                      <BikiHinhHocPhang problemText={activeQuestion.prompt} />
                    )}
                  </Suspense>
                </div>
              )}
            </div>
          )}

          {/* Render MCQ / Essay / TextInput */}
          {renderAnswerForm()}
        </>
      )}

      {/* Hint Alert */}
      {revealedHint && (
        <div className="p-3 bg-theme-bg-success border border-theme-border-success rounded-xl text-xs text-theme-text-info font-semibold font-orbitron">
          {revealedHint}
        </div>
      )}

      {/* Explanation Box (Visible after check) */}
      {checked && (
        <ExplanationBox
          activeSectId={activeSectId}
          activeQuestion={activeQuestion}
          isLastCorrect={isLastCorrect}
          lastRubricScore={lastRubricScore}
          lastRubricMissing={lastRubricMissing}
          aiWarningMessage={aiWarningMessage}
          aiFeedback={aiFeedback}
          aiSuggestions={aiSuggestions}
        />
      )}

      {/* Bottom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-synth-gray/50 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {!checked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={isAiGrading || (activeQuestion.type === 'mcq' ? !selectedAnswer : !typedAnswer.trim())}
              className="px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 disabled:opacity-40 text-center flex items-center justify-center gap-2"
            >
              {isAiGrading ? (
                <>
                  <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                  Linh Sư đang chấm...
                </>
              ) : (
                'Chốt Đáp Án'
              )}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 text-center"
            >
              Sang câu kế <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {!checked && (
            <button
              onClick={handleUseHint}
              disabled={hintUsed}
              className="px-4 py-2.5 rounded-xl border border-synth-orange/40 hover:bg-synth-orange/5 text-synth-orange font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 text-center"
            >
              Rút gợi ý (50 NP)
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleEscape}
            className="px-4 py-2.5 rounded-xl border border-synth-gray hover:bg-synth-gray/20 text-synth-text-muted font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 text-center"
          >
            Rút khỏi ải
          </button>

          {!checked && (() => {
            const todayStr = new Date().toISOString().split('T')[0];
            const skipsCount = player.dailySkips?.date === todayStr ? (player.dailySkips.count || 0) : 0;
            const remainingSkips = Math.max(0, 3 - skipsCount);
            const isBlocked = remainingSkips <= 0 || player.coins < -100;
            return (
              <button
                onClick={handleSkipConfused}
                disabled={isBlocked}
                className="px-4 py-2.5 rounded-xl border border-red-500/40 hover:bg-red-500/10 text-red-400 font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 text-center flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                title={player.coins < -100 ? "Bị khóa vì số dư NP âm quá nhiều" : `Lượt bỏ qua hôm nay: ${remainingSkips}/3`}
              >
                Bỏ qua (Còn {remainingSkips}/3) 🧠
              </button>
            );
          })()}
        </div>
      </div>

      {isSkipDialogOpen && (
        <MonChuHoiToiDialog
          onConfirm={handleConfirmSkip}
          onCancel={() => setIsSkipDialogOpen(false)}
        />
      )}
    </div>
  );
};
