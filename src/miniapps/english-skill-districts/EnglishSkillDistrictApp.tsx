import { useEffect, useRef, useState, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import type { EnglishChoiceItem, EnglishSkillDistrictId, EnglishWritingItem } from '../../data/englishSkillDistricts';
import { CONVERSATION_TOWN_ITEMS, LISTENING_LAKE_ITEMS, PHRASE_VALLEY_ITEMS, WRITING_PAVILION_ITEMS } from '../../data/englishSkillDistricts';
import { toast } from '../../utils/toast';
import { shuffleWithSeed } from '../../utils/shuffle';

interface EnglishSkillDistrictAppProps {
  mode: EnglishSkillDistrictId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: { correctAnswers: number; timeSpent: number; score: number; passed: boolean }) => void;
}

const MODE_CONFIG = {
  'phrase-valley': { title: 'Phrase Valley', icon: '🏞️', rewardRuby: 25, rewardXp: 30 },
  'conversation-town': { title: 'Conversation Town', icon: '🏘️', rewardRuby: 25, rewardXp: 30 },
  'writing-pavilion': { title: 'Writing Pavilion', icon: '📝', rewardRuby: 35, rewardXp: 40 },
  'listening-lake': { title: 'Listening Lake', icon: '🌊', rewardRuby: 35, rewardXp: 40 },
} as const;

const normalizeAnswer = (value: string) => value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');

export function EnglishSkillDistrictApp({ mode, onReward, onGameComplete }: EnglishSkillDistrictAppProps) {
  const config = MODE_CONFIG[mode];
  const isWriting = mode === 'writing-pavilion';
  const choiceItems: EnglishChoiceItem[] = mode === 'phrase-valley'
    ? PHRASE_VALLEY_ITEMS
    : mode === 'conversation-town'
      ? CONVERSATION_TOWN_ITEMS
      : LISTENING_LAKE_ITEMS;
  const items: Array<EnglishChoiceItem | EnglishWritingItem> = isWriting ? WRITING_PAVILION_ITEMS : choiceItems;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [audioError, setAudioError] = useState('');
  const startedAt = useRef(Date.now());
  const rewarded = useRef(false);

  const item = items[index];

  const shuffledOptions = useMemo(() => {
    if (isWriting || !item || !(item as EnglishChoiceItem).options) return [];
    return shuffleWithSeed((item as EnglishChoiceItem).options, item.id);
  }, [item?.id, isWriting, item]);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const playSpeech = () => {
    if (mode !== 'listening-lake' || !('speechSynthesis' in window)) {
      setAudioError('Audio is not supported in this browser.');
      return;
    }
    const speechText = (item as EnglishChoiceItem).speechText;
    if (!speechText) {
      setAudioError('Audio content is unavailable for this question.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onerror = () => setAudioError('Audio playback failed. Please try again.');
    setAudioError('');
    window.speechSynthesis.speak(utterance);
  };

  const submitAnswer = () => {
    if (!selectedAnswer.trim() || submitted) return;
    const correct = isWriting
      ? (item as EnglishWritingItem).acceptedAnswers.some(answer => normalizeAnswer(answer) === normalizeAnswer(selectedAnswer))
      : selectedAnswer === (item as EnglishChoiceItem).correctAnswer;
    if (correct) setScore(current => current + 1);
    setLastAnswerCorrect(correct);
    setSubmitted(true);
  };

  const next = () => {
    if (index < items.length - 1) {
      setIndex(current => current + 1);
      setSelectedAnswer('');
      setSubmitted(false);
      setLastAnswerCorrect(false);
      setAudioError('');
      return;
    }
    const finalScore = score;
    const passed = finalScore >= 4;
    const result = { correctAnswers: finalScore, timeSpent: Math.round((Date.now() - startedAt.current) / 1000), score: Math.round((finalScore / items.length) * 100), passed };
    if (passed && !rewarded.current) {
      rewarded.current = true;
      onReward(config.rewardRuby, config.rewardXp, config.title, `Completed ${config.title} with ${finalScore}/${items.length}`);
      toast.success(`Completed ${config.title}: +${config.rewardRuby} Ruby, +${config.rewardXp} XP`);
    }
    onGameComplete?.(result);
    setFinished(true);
  };

  const restart = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    startedAt.current = Date.now();
    rewarded.current = false;
    setIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setSubmitted(false);
    setLastAnswerCorrect(false);
    setFinished(false);
    setAudioError('');
  };

  if (finished) {
    return (
      <section className="glass-panel rounded-3xl border border-synth-cyan/25 p-8 text-center space-y-4">
        <div className="text-5xl">{score >= 4 ? '🏆' : '📘'}</div>
        <h2 className="font-orbitron font-black text-xl text-white">{config.title}</h2>
        <p className="text-synth-text-muted">Score: {score}/{items.length}. {score >= 4 ? 'Excellent work!' : 'Review the explanations and try again.'}</p>
        {score < 4 && (
          <button type="button" onClick={restart} className="px-5 py-2.5 rounded-xl bg-synth-cyan text-black font-orbitron font-black uppercase cursor-pointer">
            Try again
          </button>
        )}
      </section>
    );
  }

  const explanation = item.explanation;
  const expected = isWriting ? (item as EnglishWritingItem).acceptedAnswers[0] : (item as EnglishChoiceItem).correctAnswer;

  return (
    <section className="glass-panel rounded-3xl border border-synth-cyan/25 p-5 sm:p-7 space-y-5" aria-labelledby={`${mode}-title`}>
      <header className="flex items-center justify-between gap-3">
        <h2 id={`${mode}-title`} className="font-orbitron font-black text-lg text-white">{config.icon} {config.title}</h2>
        <span className="text-xs font-bold text-synth-text-muted">{index + 1}/{items.length}</span>
      </header>

      {mode === 'listening-lake' && (
        <div className="space-y-2">
          <button type="button" onClick={playSpeech} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-synth-cyan text-black font-bold cursor-pointer">
            <Volume2 className="w-4 h-4" /> Play audio
          </button>
          {audioError && <p role="alert" className="text-xs text-red-400">{audioError}</p>}
          {audioError && <p className="text-xs text-white">Transcript fallback: {(item as EnglishChoiceItem).speechText}</p>}
        </div>
      )}

      <p className="text-base text-white leading-relaxed">{item.prompt}</p>

      {isWriting ? (
        <textarea
          value={selectedAnswer}
          onChange={event => setSelectedAnswer(event.target.value)}
          disabled={submitted}
          aria-label="Your answer"
          className="w-full min-h-28 rounded-xl border border-white/10 bg-black/25 p-3 text-white outline-none focus:border-synth-cyan disabled:opacity-70"
          placeholder="Write your answer in English..."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {shuffledOptions.map(option => (
            <button
              type="button"
              key={option}
              onClick={() => !submitted && setSelectedAnswer(option)}
              disabled={submitted}
              className={`p-3 rounded-xl border text-left cursor-pointer disabled:cursor-default ${selectedAnswer === option ? 'border-synth-cyan bg-synth-cyan/10 text-white' : 'border-white/10 bg-white/5 text-synth-text-muted'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {submitted && (
        <div className={`rounded-xl border p-3 text-sm ${lastAnswerCorrect ? 'border-synth-green/30 bg-synth-green/5 text-synth-green' : 'border-red-500/30 bg-red-500/5 text-red-300'}`}>
          <p className="font-bold">Correct answer: {expected}</p>
          <p className="mt-1 text-synth-text-muted">{explanation}</p>
          {mode === 'listening-lake' && <p className="mt-2 text-xs text-white">Transcript: {(item as EnglishChoiceItem).speechText}</p>}
        </div>
      )}

      <button
        type="button"
        onClick={submitted ? next : submitAnswer}
        disabled={!selectedAnswer.trim()}
        className="w-full py-3 rounded-xl bg-synth-magenta text-white font-orbitron font-black uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitted ? (index === items.length - 1 ? 'Finish' : 'Next') : 'Check answer'}
      </button>
    </section>
  );
}
