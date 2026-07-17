import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import type { Question } from '../types/game';
import { SUBJECTS_CONFIG } from '../types/game';
import { devWarnOutOfScope, questionInScope } from '../utils/learningScope';
import { getAssessmentProvider, getQuestionPresentation, getSubjectHint, getSubjectActivities, getSubjectModule, getGeometryVisualization } from '../subject-modules/registry';
import { Scratchpad } from './Scratchpad';

const ENGLISH_SKILL_LABELS: Record<string, string> = {
  reading: 'Đọc hiểu',
  writing: 'Viết câu',
  listening: 'Nghe hiểu',
  speaking: 'Nói thực hành',
  language: 'Kiến thức ngôn ngữ'
};

const ENGLISH_TASK_LABELS: Record<string, string> = {
  pronunciation: 'Pronunciation',
  stress: 'Stress',
  vocabulary: 'Vocabulary',
  grammar: 'Grammar',
  cloze: 'Guided Cloze',
  reading: 'Reading Comprehension',
  wordform: 'Word Form',
  rewrite: 'Sentence Transformation'
};

const MATH_TOPIC_LABELS: Record<string, string> = {
  'function-graph': 'Đồ thị hàm số',
  'quadratic-equation': 'Phương trình bậc hai',
  'linear-function': 'Hàm số bậc nhất',
  'growth-modeling': 'Tăng trưởng %',
  'percentage-discount': 'Giảm giá lũy tiến',
  'volume-displacement': 'Dâng nước - thể tích',
  'shopping-discount': 'Mua hàng khuyến mãi',
  'tangent-geometry': 'Tiếp tuyến & nội tiếp',
  'statistics-probability': 'Thống kê & xác suất',
  modeling: 'Mô hình hóa thực tế',
  'solid-geometry': 'Hình học không gian',
  finance: 'Tài chính thực tế',
  'plane-geometry': 'Hình học phẳng',
  mixed: 'Tổng hợp'
};
import { Award } from 'lucide-react';
import { BossTimerBar } from './PlayArea/BossTimerBar';
import { SplitPassageView } from './PlayArea/SplitPassageView';
import { SingleQuestionView } from './PlayArea/SingleQuestionView';
import { PlayAreaControls } from './PlayArea/PlayAreaControls';

import { SkipDialog } from './SkipDialog';
import { RubyConfirmModal } from './Common/RubyConfirmModal';
import { sound } from '../utils/sound';
import { toast } from '../utils/toast';
import { supabase } from '../utils/supabaseClient';
import { gameService } from '../services/gameService';
import type { ActivityResult } from '../types/activityResult';
import { getHoChiMinhDateString } from '../utils/date';

// Subcomponents
import { PlayAreaHeader } from './PlayArea/PlayAreaHeader';
import { QuestionMCQ } from './PlayArea/QuestionMCQ';
import { QuestionEssay } from './PlayArea/QuestionEssay';
import { QuestionTextInput } from './PlayArea/QuestionTextInput';
import { ExplanationBox } from './PlayArea/ExplanationBox';
import { PostQuizReview } from './PlayArea/PostQuizReview';
import { FinalResultScreen } from './PlayArea/FinalResultScreen';
// MarkdownRenderer is now used inside split/single question view subcomponents.

interface PlayAreaProps {
  mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'lesson' | 'survival' | 'preview';
  bossId?: string;
  lessonId?: string;
  previewQuestion?: Question;
  onFinish: (result: ActivityResult) => void;
}

export const PlayArea: React.FC<PlayAreaProps> = ({ mode, bossId, lessonId, previewQuestion, onFinish }) => {
  const getQuestionByWeight = useGameState(state => state.getQuestionByWeight);
  const questions = useGameState(state => state.questions);
  const lessons = useGameState(state => state.lessons);
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
  const [rewardsEarned, setRewardsEarned] = useState({ ruby: 0, xp: 0 });
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionStartTime] = useState(() => Date.now());

  // Bộ đếm lỗi NỘI BỘ của lượt chơi
  const [runMistakes, setRunMistakes] = useState(0);
  const [runFinished, setRunFinished] = useState(false);
  const [timeoutOccurred, setTimeoutOccurred] = useState(false);
  const [activityResult, setActivityResult] = useState<ActivityResult | null>(null);
  // 'review' = PostQuizReview, 'result' = FinalResultScreen
  const [runPhase, setRunPhase] = useState<'review' | 'result'>('review');
  const runEndHandledRef = useRef(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    cost: number;
    actionDescription: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    cost: 0,
    actionDescription: '',
    onConfirm: () => {},
  });
  
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
  const [showHandbookBoard, setShowBikiBoard] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [mobilePassageTab, setMobilePassageTab] = useState<'passage' | 'question'>('passage');

  const toggleMute = () => {
    const nextMuted = !isMuted;
    sound.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const questionsRef = useRef(questions);
  const lessonsRef = useRef(lessons);
  const failedQuestionIdsRef = useRef(failedQuestionIds);
  const playerIdRef = useRef(player.id);
  const getQuestionByWeightRef = useRef(getQuestionByWeight);
  const currentQuestionIdRef = useRef(currentQuestions[currentIndex]?.id);

  useEffect(() => {
    questionsRef.current = questions;
    lessonsRef.current = lessons;
    failedQuestionIdsRef.current = failedQuestionIds;
    playerIdRef.current = player.id;
    getQuestionByWeightRef.current = getQuestionByWeight;
    currentQuestionIdRef.current = currentQuestions[currentIndex]?.id;
  }, [questions, lessons, failedQuestionIds, player.id, getQuestionByWeight, currentQuestions[currentIndex]?.id]);

  // Reset question-specific states when question ID changes
  useEffect(() => {
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
    setIsLastCorrect(false);
    setMobilePassageTab('passage');
  }, [currentQuestions[currentIndex]?.id]);


  const handleEscape = () => {
    sound.playEscape();
    const accuracyRatio = sessionAnswered > 0 ? sessionCorrect / sessionAnswered : 0;
    const timeSpentSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
    const result: ActivityResult = {
      status: 'abandoned',
      score: sessionCorrect,
      total: currentQuestions.length,
      accuracyRatio,
      timeSpentSeconds,
      rewardsEarned,
      isDefeat: false,
      passed: false,
    };
    onFinish(result);
  };

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<any>(null);

  // Đã nạp xong pool câu hỏi cho phòng này chưa (phân biệt "đang tải" với "pool rỗng")
  const [initDone, setInitDone] = useState(false);

  // Initialize questions for this run
  useEffect(() => {
    let active = true;
    setInitDone(false);

    const initOnlineSession = async () => {
      if (mode === 'preview' && previewQuestion) {
        if (active) {
          setSessionId('preview');
          setCurrentQuestions([previewQuestion]);
          setCurrentIndex(0);
          setAnswersSubmitted([]);
          setRewardsEarned({ ruby: 0, xp: 0 });
          setSessionAnswered(0);
          setSessionCorrect(0);
          setRunFinished(false);
          runEndHandledRef.current = false;
          setRunMistakes(0);
          setTimeLeft(0);
          setInitDone(true);
        }
        return;
      }
      // Phiên dev-backdoor (mock-*) không có backend thật — dùng thẳng bộ câu hỏi local.
      if (playerIdRef.current?.startsWith('mock-')) {
        runLocalFallback();
        return;
      }
      try {
        const res = await gameService.startSession({
          profileId: playerIdRef.current,
          sessionType: mode,
          subject: activeSectId,
          gradeTier: activeGradeTier,
          bossId,
          lessonId,
          failedQuestionIds: failedQuestionIdsRef.current
        });

        if (active) {
          setSessionId(res.sessionId);
          setCurrentQuestions(res.questions);
          setCurrentIndex(0);
          setAnswersSubmitted([]);
          setRewardsEarned({ ruby: 0, xp: 0 });
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
          setInitDone(true);
        }
      } catch (err) {
        console.error('Failed to start online game session, falling back to local pool:', err);
        if (active) {
          runLocalFallback();
        }
      }
    };

    const runLocalFallback = () => {
      // Pool local phải lọc chặt CẢ môn lẫn lớp — tuyệt đối không nới sang môn/lớp khác
      // khi thiếu câu (thiếu thì hiện trạng thái "chưa đủ câu hỏi" thay vì lộ nội dung sai).
      const subjectQuestions = questionsRef.current.filter(q =>
        questionInScope(q, activeSectId as any, activeGradeTier)
      );
      const fallbackQuestions = subjectQuestions;

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
        pool = subjectQuestions.filter(q => failedQuestionIdsRef.current.includes(q.id));
      } else if (mode === 'lesson') {
        const lesson = lessonsRef.current.find(l => l.id === lessonId);
        if (lesson) {
          pool = fallbackQuestions.filter(q => (q as any).lessonId === lessonId || q.category === lesson.category);
          pool = pool.slice(0, 3);
        }
        if (pool.length < 3) {
          const extra = fallbackQuestions.filter(q => !pool.includes(q));
          pool = [...pool, ...extra].slice(0, 3);
        }
      } else {
        const weightMode = (mode === 'survival' || mode === 'preview')
          ? 'mixed'
          : (mode as 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed');
        for (let i = 0; i < count; i++) {
          const q = getQuestionByWeightRef.current(weightMode);
          if (q && ((q as any).subject || 'english') === activeSectId && !pool.some(existing => existing.id === q.id)) {
            pool.push(q);
          }
        }
        if (pool.length === 0) {
          const activities = getSubjectActivities(activeSectId);
          const activity = activities.find(a => a.modeKey === mode || a.id === mode || a.legacyMode === mode);
          
          let topicIds: string[] = [];
          if (mode === 'mixed') {
            topicIds = Array.from(new Set(activities.flatMap(a => a.topicIds ?? [])));
          } else if (activity?.topicIds) {
            topicIds = [...activity.topicIds];
          }

          pool = fallbackQuestions.filter(q => {
            if (topicIds.length === 0 || topicIds.includes('*')) return true;
            const qTopicId = q.topicId;
            if (!qTopicId) return false;
            const normalizedQTopicId = qTopicId.replace(/-g\d+$/, '');
            return topicIds.includes(normalizedQTopicId) || topicIds.includes(qTopicId);
          }).slice(0, count);
        }
      }

      setSessionId('');
      setCurrentQuestions(pool.sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setAnswersSubmitted([]);
      setRewardsEarned({ ruby: 0, xp: 0 });
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
      setInitDone(true);
    };

    initOnlineSession();

    return () => {
      active = false;
    };
  }, [mode, bossId, lessonId, activeSectId, activeGradeTier, previewQuestion]);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !runFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimeoutOccurred(true);
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
    const accuracyRatio = sessionAnswered > 0 ? sessionCorrect / sessionAnswered : 0;
    const timeSpentSeconds = Math.round((Date.now() - sessionStartTime) / 1000);

    // ── Completion threshold per mode ──────────────────────────────────
    // lesson : ≥70% AND no timeout
    // boss   : no defeat AND no timeout (timer running out = fail)
    // survival: no defeat
    // others : ≥60% (relaxed practice threshold)
    let passed: boolean;
    let status: ActivityResult['status'];

    if (timeoutOccurred) {
      // Boss timed out → always fail; other modes without timers never reach here
      passed = false;
      status = 'timeout';
    } else if (isDefeat) {
      passed = false;
      status = 'failed';
    } else if (mode === 'lesson') {
      passed = accuracyRatio >= 0.7;
      status = passed ? 'completed' : 'failed';
    } else if (mode === 'boss') {
      passed = true; // reached here = no defeat, no timeout
      status = 'completed';
    } else if (mode === 'survival') {
      passed = true; // reached here = no defeat
      status = 'completed';
    } else {
      // grammar / reading / vocabulary / pronunciation / mixed / revenge
      passed = accuracyRatio >= 0.6;
      status = passed ? 'completed' : 'failed';
    }

    const submitResults = async () => {
      let finalRuby = rewardsEarned.ruby;
      let finalXp = rewardsEarned.xp;

      if (mode !== 'preview') {
        try {
          if (!sessionId) {
            // Fallback if session wasn't started online
            if (isDefeat) {
              applyDefeatPenalty(rewardsEarned.ruby, rewardsEarned.xp);
              finalRuby = Math.floor(rewardsEarned.ruby / 2);
              finalXp = Math.floor(rewardsEarned.xp / 2);
            } else if (mode === 'boss') {
              const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
                : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
                : bossId === 'b-2026' ? 2
                : undefined;
              completeBossVictory(bossBonusIndex);
            }
          } else {
          const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
            : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
            : bossId === 'b-2026' ? 2
            : undefined;

          const res = await gameService.endSession({
            sessionId,
            profileId: player.id,
            answers: answersSubmitted.map(ans => ({
              questionId: ans.questionId,
              typedAnswer: ans.typedAnswer,
              selectedAnswer: ans.selectedAnswer,
              scoreRatio: ans.scoreRatio,
              isSkipped: ans.isSkipped || false
            })),
            isDefeat,
            bossBonusIndex
          });

          if (res.success) {
            syncSessionResult({
              newRuby: res.newRuby,
              newXp: res.newXp,
              newLevel: res.newLevel,
              badges: res.badges
            });
            finalRuby = res.rubyGained;
            finalXp = res.xpGained;
            setRewardsEarned({ ruby: finalRuby, xp: finalXp });
          }
        }
      } catch (err) {
        console.error('Failed to submit session result, run fallback:', err);
        if (isDefeat) {
          applyDefeatPenalty(rewardsEarned.ruby, rewardsEarned.xp);
          finalRuby = Math.floor(rewardsEarned.ruby / 2);
          finalXp = Math.floor(rewardsEarned.xp / 2);
        } else if (mode === 'boss') {
          const bossBonusIndex = bossId === 'b-2024' || bossId === 'b-hk1' ? 0
            : bossId === 'b-2025' || bossId === 'b-hk2' ? 1
            : bossId === 'b-2026' ? 2
            : undefined;
          completeBossVictory(bossBonusIndex);
        }
      }
    }

    // Store final ActivityResult — render phases will consume this
      setActivityResult({
        status,
        score: sessionCorrect,
        total: currentQuestions.length,
        accuracyRatio,
        timeSpentSeconds,
        rewardsEarned: { ruby: finalRuby, xp: finalXp },
        isDefeat,
        passed,
      });
      // Start at the review phase so student can review answers first
      setRunPhase('review');
    };

    submitResults();
  }, [runFinished, runMistakes, mode, bossId, sessionId, player.id, answersSubmitted, rewardsEarned, applyDefeatPenalty, completeBossVictory, syncSessionResult, sessionAnswered, sessionCorrect, sessionStartTime, timeoutOccurred, currentQuestions.length]);

  const activeQuestion = currentQuestions[currentIndex];

  // Watchdog (dev): câu hỏi đang hiển thị bắt buộc thuộc đúng môn/lớp đang chọn
  useEffect(() => {
    devWarnOutOfScope('question', activeQuestion, activeSectId as any, activeGradeTier, 'PlayArea');
  }, [activeQuestion, activeSectId, activeGradeTier]);

  const handleUseHint = () => {
    if (!activeQuestion || hintUsed) return;
    if (player.ruby < 50) {
      toast.error('Không đủ Ruby để mua gợi ý. Cần 50 Ruby.');
      return;
    }
    
    setConfirmModal({
      isOpen: true,
      cost: 50,
      actionDescription: 'lĩnh Thẻ Nhắc Bài trợ giúp trong câu hỏi này',
      onConfirm: () => {
        buyHint();
        sound.playRuby();
        setHintUsed(true);

        const answerMode = activeQuestion.metadata?.answerMode;
        const mathTopic = activeQuestion.metadata?.mathTopic;
        const englishTask = activeQuestion.metadata?.englishTask;
        const englishSkill = activeQuestion.metadata?.englishSkill;
        const subjectHint = getSubjectHint(activeSectId, activeQuestion, mode);

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
        } else if (subjectHint) {
          setRevealedHint(subjectHint);
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
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleCheckAnswer = async () => {
    if (checked || !activeQuestion) return;

    const questionIdBeingGraded = activeQuestion.id;

    let isCorrect = false;
    let scoreRatio = 0;
    let data: any = undefined;
    let localAiWarningMessage = '';
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

    const assessmentProvider = getAssessmentProvider(activeSectId, activeQuestion);

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
    } else if (assessmentProvider) {
      setIsAiGrading(true);
      setLastRubricScore(null);
      setLastRubricMissing([]);
      setAiFeedback('');
      setAiSuggestions([]);
      setAiWarningMessage('');

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const token = session?.access_token;
        if (!token) throw new Error('No auth token available');

        const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
        const assessmentResult = await assessmentProvider.assess({
          question: activeQuestion,
          answer: typedAnswer,
          token,
          profileId: localStorage.getItem('ge10_selected_profile_id') || '',
          backendUrl,
        });
        data = { result: assessmentResult };
        if (currentQuestionIdRef.current !== questionIdBeingGraded) return;
        const { score, missingKeywords, feedback, suggestions } = assessmentResult;
        scoreRatio = score / 10;
        isCorrect = scoreRatio >= 0.6;
        setLastRubricScore(activeSectId === 'math' ? null : score);
        setLastRubricMissing(missingKeywords);
        setAiFeedback(feedback);
        setAiSuggestions(suggestions);
      } catch (err: any) {
        if (currentQuestionIdRef.current !== questionIdBeingGraded) return;
        console.error('Lỗi khi gọi AI chấm bài, chuyển sang backup:', err);
        localAiWarningMessage = activeSectId === 'math'
          ? 'Trợ Giáo MIKA chấm Toán tự luận dự phòng (So khớp chuỗi).'
          : 'Trợ Giáo MIKA phải chấm dự phòng. Kết quả vẫn ổn, nhưng nên coi như mốc tham chiếu.';
        setAiWarningMessage(localAiWarningMessage);
        const fallbackResult = runOldGradingBackup();
        isCorrect = fallbackResult.isCorrect;
        scoreRatio = fallbackResult.scoreRatio;
      } finally {
        if (currentQuestionIdRef.current === questionIdBeingGraded) {
          setIsAiGrading(false);
        }
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

    if (currentQuestionIdRef.current !== questionIdBeingGraded) {
      return;
    }

    if (activeQuestion.type === 'mcq') {
      setLastRubricScore(null);
      setLastRubricMissing([]);
    }

    const mappedMode = mode === 'boss' ? 'boss' : mode === 'survival' ? 'survival' : 'practice';
    const outcome = mode === 'preview' 
      ? { rubyGained: 0, expGained: 0, newLevel: 0, leveledUp: false }
      : answerQuestion(
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
        scoreRatio: scoreRatio,
        isCorrect: isCorrect,
        isSkipped: false,
        aiFeedback: data?.result?.feedback ?? '',
        aiSuggestions: data?.result?.suggestions ?? [],
        lastRubricScore: (activeSectId === 'math' ? null : data?.result?.score) ?? null,
        lastRubricMissing: data?.result?.missingKeywords ?? [],
        aiWarningMessage: localAiWarningMessage
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
      ruby: prev.ruby + outcome.rubyGained,
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
    
    if (mode === 'preview') {
      toast.success('Bỏ qua thành công (Preview mode)');
      sound.playNext();
      if (currentIndex + 1 < currentQuestions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setRunFinished(true);
      }
      return;
    }

    const success = await flagQuestionConfused(activeQuestion, reason, severity);
    if (success) {
      toast.success('Đã gửi phản ánh tới Chủ Nhiệm. Câu hỏi này sẽ được gác lại.');
      sound.playNext();
      
      setAnswersSubmitted(prev => [
        ...prev,
        {
          questionId: activeQuestion.id,
          isSkipped: true,
          isCorrect: false,
          scoreRatio: 0
        }
      ]);
      
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

  const modeLabel = (() => {
    if (mode === 'mixed') return 'Phụ bản hỗn hợp';
    if (mode === 'revenge') return 'Phụ bản trả bài';
    if (mode === 'boss') return 'Trường Thi Boss';
    if (mode === 'survival') return 'Trường Thi sinh tồn';
    if (mode === 'lesson') return 'Phụ bản bài học';

    const activities = getSubjectActivities(activeSectId);
    const activity = activities.find(a => a.modeKey === mode || a.id === mode || a.legacyMode === mode);
    return activity?.label || activity?.title || mode;
  })();

  // --- Early returns ---
  if (runFinished && activityResult) {
    if (runPhase === 'review') {
      return (
        <PostQuizReview
          mode={mode}
          rewardsEarned={activityResult.rewardsEarned}
          runMistakes={runMistakes}
          currentQuestions={currentQuestions}
          answersSubmitted={answersSubmitted}
          activeSectId={activeSectId}
          onEscape={() => setRunPhase('result')}
        />
      );
    }
    // runPhase === 'result'
    return (
      <FinalResultScreen
        result={activityResult}
        mode={mode}
        onFinish={() => onFinish(activityResult)}
        onRetry={() => {
          // Reset the whole run for a retry attempt
          runEndHandledRef.current = false;
          setRunFinished(false);
          setTimeoutOccurred(false);
          setActivityResult(null);
          setRunPhase('review');
          setRunMistakes(0);
          setCurrentIndex(0);
          setAnswersSubmitted([]);
          setRewardsEarned({ ruby: 0, xp: 0 });
          setSessionAnswered(0);
          setSessionCorrect(0);
        }}
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
              {SUBJECTS_CONFIG[activeSectId]?.name ?? activeSectId}
            </span>. Hãy tiếp tục duy trì phong độ xuất sắc này nhé!
          </p>
          <button
            type="button"
            onClick={handleEscape}
            className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Trở Lại Bản Đồ 🗺️
          </button>
        </div>
      );
    }
    if (!initDone) {
      return <div className="text-center py-10 font-orbitron text-theme-text-info">Đang rút câu vào phòng...</div>;
    }
    // Pool đã nạp xong nhưng rỗng: môn/lớp này chưa đủ câu hỏi — không mượn nội dung môn/lớp khác
    return (
      <div className="glass-panel rounded-2xl border border-synth-orange/30 p-8 max-w-xl mx-auto text-center space-y-6">
        <Award className="w-16 h-16 mx-auto text-synth-orange" />
        <h2 className="font-orbitron font-black text-2xl text-white uppercase tracking-wider">
          CHƯA CÓ ĐỀ PHÙ HỢP 📭
        </h2>
        <p className="text-sm text-synth-text-muted leading-relaxed">
          Ngân hàng câu hỏi của môn và lớp đang chọn chưa đủ đề cho phòng này.
          Hãy nhờ Thầy/Cô nạp thêm câu hỏi, hoặc thử phòng khác nhé!
        </p>
        <button
          type="button"
          onClick={handleEscape}
          className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          Trở Lại Bản Đồ 🗺️
        </button>
      </div>
    );
  }

  const questionPresentation = getQuestionPresentation(activeSectId, activeQuestion);
  const isSplitPassage = questionPresentation.splitPassage;
  const passageText = questionPresentation.passageText;
  const questionText = questionPresentation.questionText;

  // Nhận diện câu hỏi hình học 2D/3D thuộc về module Toán (src/subject-modules/math/manifest.ts),
  // không phải logic của core component — xem getGeometryVisualization().
  const geometryVisualization = getGeometryVisualization(activeSectId, activeQuestion);
  const isGeometry = geometryVisualization !== null;
  const is3D = geometryVisualization?.is3D ?? false;

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
    if (getAssessmentProvider(activeSectId, activeQuestion)) {
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
        lang={getSubjectModule(activeSectId)?.lang ?? 'vi-VN'}
      />
    );
  };

  return (
    <div className="relative glass-panel rounded-2xl border border-synth-cyan/15 p-6 pb-20 md:pb-6 max-w-2xl mx-auto space-y-6">
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
        mode={mode}
      />

      {/* Boss Time Progress Bar */}
      <BossTimerBar mode={mode} timeLeft={timeLeft} formatTime={formatTime} />

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden">
        <div 
          className="h-full bg-synth-cyan shadow-[0_0_8px_#00f0ff] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      {/* Content Area */}
      {isSplitPassage ? (
        <SplitPassageView
          activeQuestion={activeQuestion}
          passageText={passageText}
          questionText={questionText}
          mobilePassageTab={mobilePassageTab}
          onTabChange={setMobilePassageTab}
          renderAnswerForm={renderAnswerForm()}
        />
      ) : (
        <SingleQuestionView
          activeQuestion={activeQuestion}
          isGeometry={isGeometry}
          showHandbookBoard={showHandbookBoard}
          onToggleBikiBoard={() => setShowBikiBoard(!showHandbookBoard)}
          is3D={is3D}
          renderAnswerForm={renderAnswerForm()}
        />
      )}

      {/* Hint Alert */}
      {revealedHint && (
        <div className="p-3 bg-synth-cyan/10 border border-synth-cyan/30 rounded-xl text-xs text-synth-cyan font-semibold font-orbitron">
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
      <PlayAreaControls
        checked={checked}
        isAiGrading={isAiGrading}
        selectedAnswer={selectedAnswer}
        typedAnswer={typedAnswer}
        mode={mode}
        dailySkipsCount={player.dailySkips?.date === getHoChiMinhDateString(new Date()) ? (player.dailySkips.count || 0) : 0}
        hintUsed={hintUsed}
        activeQuestionType={activeQuestion.type}
        onCheckAnswer={handleCheckAnswer}
        onNextQuestion={handleNextQuestion}
        onUseHint={handleUseHint}
        onEscape={handleEscape}
        onSkipConfused={handleSkipConfused}
        onFinishPreview={() => onFinish({
          status: 'completed',
          score: 1,
          total: 1,
          accuracyRatio: 1,
          timeSpentSeconds: 0,
          rewardsEarned: { ruby: 0, xp: 0 },
          isDefeat: false,
          passed: true
        })}
      />

      {isSkipDialogOpen && (
        <SkipDialog
          onConfirm={handleConfirmSkip}
          onCancel={() => setIsSkipDialogOpen(false)}
        />
      )}

      <RubyConfirmModal
        isOpen={confirmModal.isOpen}
        cost={confirmModal.cost}
        actionDescription={confirmModal.actionDescription}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
