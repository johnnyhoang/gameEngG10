import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock3, Gem, Sparkles, X } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { useSect } from '../../contexts/SectContext';
import type { Question, SubjectId } from '../../types/game';
import {
  getRecentRiddleQuestionIds,
  isRiddleAnswerCorrect,
  pickRiddleQuestions,
  recordRiddleQuestion,
  type RiddleMode,
} from './riddleEngine';
import { recordMissionEvent } from '../../services/missionLedgerService';
import { toast } from '../../utils/toast';

const MODE_CONFIG: Record<RiddleMode, { title: string; description: string; count: number; seconds: number | null }> = {
  'ruby-riddle': {
    title: 'Đố Vui Nhận Ruby',
    description: 'Một câu bất kỳ · Đúng +10 Ruby · Sai không phạt',
    count: 1,
    seconds: null,
  },
  'encounter-sprint': {
    title: 'Tốc Chiến Kỳ Ngộ',
    description: '3 câu trong 60 giây · Tối đa +30 Ruby',
    count: 3,
    seconds: 60,
  },
};

export function RiddleGames() {
  const questions = useGameState(state => state.questions);
  const currentUser = useGameState(state => state.currentUser);
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const { activeSectId, activeGradeTier } = useSect();

  const [mode, setMode] = useState<RiddleMode | null>(null);
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const usedThisSession = useRef<Set<string>>(new Set());
  const answeredThisRound = useRef<Set<string>>(new Set());
  const missionEventsSent = useRef<Set<string>>(new Set());
  const roundId = useRef(crypto.randomUUID());
  const activeQuestion = roundQuestions[questionIndex];

  const loadRound = useCallback(async (nextMode: RiddleMode, resetScore: boolean) => {
    if (!currentUser?.id) return;
    const config = MODE_CONFIG[nextMode];
    setLoading(true);
    roundId.current = crypto.randomUUID();
    setError('');
    setFinished(false);
    setQuestionIndex(0);
    setSelectedAnswer('');
    setSubmitted(false);
    setLastCorrect(false);
    if (resetScore) setScore(0);
    setSecondsLeft(config.seconds ?? 60);
    answeredThisRound.current = new Set();

    const recent = await getRecentRiddleQuestionIds(currentUser.id, nextMode);
    const usedIds = [...new Set([...recent, ...usedThisSession.current])];
    const selected = pickRiddleQuestions(
      activeSectId as SubjectId,
      activeGradeTier,
      questions,
      config.count,
      usedIds
    );

    if (selected.length < config.count) {
      console.error('[Riddle] Chưa đủ câu hỏi phù hợp', {
        gradeTier: activeGradeTier,
        subjectId: activeSectId,
        mode: nextMode,
        required: config.count,
        available: selected.length,
      });
      setRoundQuestions([]);
      setError(`Chưa đủ ${config.count} câu hỏi phù hợp cho lớp và môn học này.`);
      setLoading(false);
      return;
    }

    setRoundQuestions(selected);
    selected.forEach(question => {
      usedThisSession.current.add(question.id);
      void recordRiddleQuestion(currentUser.id, nextMode, question.id);
    });
    setLoading(false);
  }, [activeGradeTier, activeSectId, currentUser?.id, questions]);

  const openMode = (nextMode: RiddleMode) => {
    setMode(nextMode);
    void loadRound(nextMode, true);
  };

  useEffect(() => {
    if (mode !== 'encounter-sprint' || loading || finished || roundQuestions.length === 0) return;
    if (secondsLeft <= 0) {
      setFinished(true);
      setSubmitted(false);
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [finished, loading, mode, roundQuestions.length, secondsLeft]);

  const submitAnswer = () => {
    if (!mode || !activeQuestion || !selectedAnswer || submitted || finished) return;
    if (answeredThisRound.current.has(activeQuestion.id)) return;
    answeredThisRound.current.add(activeQuestion.id);

    const correct = isRiddleAnswerCorrect(selectedAnswer, activeQuestion.correctAnswer, activeQuestion.options ?? []);
    setLastCorrect(correct);
    setSubmitted(true);
    if (mode === 'ruby-riddle' && currentUser?.id) {
      const eventKey = `riddle:${roundId.current}`;
      if (!missionEventsSent.current.has(eventKey)) {
        missionEventsSent.current.add(eventKey);
        void recordMissionEvent({
          profileId: currentUser.id,
          idempotencyKey: eventKey,
          eventType: 'riddle_completed',
          gradeTier: activeGradeTier,
          subjectId: activeSectId,
          entityType: 'question',
          entityId: activeQuestion.id,
          metadata: { mode: 'ruby-riddle', isCorrect: correct },
        });
      }
    }
    if (correct) {
      setScore(current => current + 1);
      void awardRubyAndXp(
        10,
        0,
        MODE_CONFIG[mode].title,
        `Trả lời đúng câu ${activeQuestion.id} trong ${MODE_CONFIG[mode].title}.`
      );
    } else {
      toast.error('Nhầm rồi Sĩ Tử! Hãy thử sức ở câu sau nhé! 🐷');
    }
  };

  useEffect(() => {
    if (!finished || mode !== 'encounter-sprint' || !currentUser?.id || roundQuestions.length === 0) return;
    const eventKey = `encounter-sprint:${roundId.current}`;
    if (missionEventsSent.current.has(eventKey)) return;
    missionEventsSent.current.add(eventKey);
    void recordMissionEvent({
      profileId: currentUser.id,
      idempotencyKey: eventKey,
      eventType: 'encounter_sprint_completed',
      gradeTier: activeGradeTier,
      subjectId: activeSectId,
      entityType: 'riddle-round',
      entityId: roundQuestions.map(question => question.id).join(','),
      metadata: { score, timedOut: secondsLeft <= 0 },
    });
    void recordMissionEvent({
      profileId: currentUser.id,
      idempotencyKey: `riddle-daily:${roundId.current}`,
      eventType: 'riddle_completed',
      gradeTier: activeGradeTier,
      subjectId: activeSectId,
      entityType: 'riddle-round',
      entityId: roundQuestions.map(question => question.id).join(','),
      metadata: { mode: 'encounter-sprint', score, timedOut: secondsLeft <= 0 },
    });
  }, [activeGradeTier, activeSectId, currentUser?.id, finished, mode, roundQuestions, score, secondsLeft]);

  const advance = () => {
    if (!mode) return;
    if (mode === 'ruby-riddle') {
      void loadRound(mode, true);
      return;
    }
    if (questionIndex >= roundQuestions.length - 1) {
      setFinished(true);
      setSubmitted(false);
      return;
    }
    setQuestionIndex(index => index + 1);
    setSelectedAnswer('');
    setSubmitted(false);
    setLastCorrect(false);
  };

  const close = () => {
    setMode(null);
    setRoundQuestions([]);
    setFinished(false);
  };

  return (
    <section className="rounded-2xl border border-synth-cyan/20 bg-gradient-to-r from-synth-cyan/10 via-synth-purple/5 to-transparent p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">🐷</span>
        <div>
          <h3 className="font-orbitron text-sm font-black uppercase text-white">Heo mời Sĩ Tử khởi động</h3>
          <p className="text-[10px] text-slate-400">Chọn một màn giải đố nhanh trước khi vào Trường Thi.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {(Object.keys(MODE_CONFIG) as RiddleMode[]).map(itemMode => {
          const config = MODE_CONFIG[itemMode];
          return (
            <button
              key={itemMode}
              onClick={() => openMode(itemMode)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition-colors hover:border-synth-cyan/40 hover:bg-white/10"
            >
              {itemMode === 'ruby-riddle'
                ? <Gem className="h-5 w-5 shrink-0 text-synth-orange" />
                : <Clock3 className="h-5 w-5 shrink-0 text-synth-cyan" />}
              <span className="min-w-0">
                <span className="block font-orbitron text-xs font-bold text-white">{config.title}</span>
                <span className="block text-[10px] text-slate-400">{config.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {mode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-synth-cyan/30 bg-synth-bg p-4 shadow-2xl">
            <button onClick={close} className="absolute right-3 top-3 text-slate-400 hover:text-white" aria-label="Đóng">
              <X className="h-5 w-5" />
            </button>
            <div className="mb-3 flex items-center justify-between gap-3 pr-7">
              <div>
                <h3 className="font-orbitron text-sm font-black text-white">{MODE_CONFIG[mode].title}</h3>
                <p className="text-[10px] text-slate-400">
                  {mode === 'encounter-sprint' ? `Câu ${Math.min(questionIndex + 1, 3)}/3` : 'Một câu mỗi lượt'}
                </p>
              </div>
              {mode === 'encounter-sprint' && (
                <span className={`font-orbitron text-sm font-black ${secondsLeft <= 10 ? 'text-red-400' : 'text-synth-cyan'}`}>
                  {secondsLeft}s
                </span>
              )}
            </div>

            {loading ? (
              <p className="py-8 text-center text-sm text-slate-400">Đang chọn câu đố...</p>
            ) : error ? (
              <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-300">{error}</p>
            ) : finished ? (
              <div className="space-y-4 py-4 text-center">
                <Sparkles className="mx-auto h-9 w-9 text-synth-orange" />
                <div>
                  <p className="font-orbitron text-xl font-black text-white">Đúng {score}/3 câu</p>
                  <p className="text-sm text-synth-orange">Đã nhận +{score * 10} Ruby</p>
                </div>
                <button
                  onClick={() => void loadRound(mode, true)}
                  className="rounded-lg bg-synth-cyan px-4 py-2 text-xs font-black uppercase text-slate-950"
                >
                  Chơi lại
                </button>
              </div>
            ) : activeQuestion ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold leading-snug text-white">{activeQuestion.prompt}</p>
                <div className="space-y-2">
                  {activeQuestion.options?.map(option => {
                    const isCorrectOption = submitted && isRiddleAnswerCorrect(option, activeQuestion.correctAnswer, activeQuestion.options ?? []);
                    const isSelected = selectedAnswer === option;
                    return (
                      <button
                        key={option}
                        onClick={() => !submitted && setSelectedAnswer(option)}
                        disabled={submitted}
                        className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                          isCorrectOption
                            ? 'border-green-400 bg-green-500/15 text-green-200'
                            : submitted && isSelected
                              ? 'border-red-400 bg-red-500/15 text-red-200'
                              : isSelected
                                ? 'border-synth-cyan bg-synth-cyan/10 text-white'
                                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`rounded-lg border p-2.5 text-xs ${lastCorrect ? 'border-green-400/30 bg-green-500/10 text-green-200' : 'border-amber-400/30 bg-amber-500/10 text-amber-200'}`}>
                    <p className="font-bold">{lastCorrect ? 'Chính xác! +10 Ruby' : 'Chưa đúng — không bị phạt.'}</p>
                    {activeQuestion.explanation && <p className="mt-1 text-slate-300">{activeQuestion.explanation}</p>}
                  </div>
                )}

                <div className="flex justify-end">
                  {!submitted ? (
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="rounded-lg bg-synth-cyan px-4 py-2 text-xs font-black uppercase text-slate-950 disabled:opacity-40"
                    >
                      Trả lời
                    </button>
                  ) : (
                    <button onClick={advance} className="rounded-lg bg-synth-purple px-4 py-2 text-xs font-black uppercase text-white">
                      {mode === 'ruby-riddle' ? 'Chơi tiếp' : questionIndex === 2 ? 'Xem kết quả' : 'Câu tiếp'}
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
