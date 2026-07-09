import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { ShieldAlert, X, Brain, AlertCircle, ArrowRight } from 'lucide-react';
import type { Question } from '../types/game';

interface GatekeeperModalProps {}

export const GatekeeperModal: React.FC<GatekeeperModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [onUnlockCallback, setOnUnlockCallback] = useState<(() => void) | null>(null);
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const { questions, currentSubject, pageExplorationStates, updatePendingKeyQuestion } = useGameState();

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { pageId, onUnlock } = customEvent.detail;
      setPageId(pageId);
      setOnUnlockCallback(() => onUnlock);
      
      // Load question
      const currentState = pageExplorationStates[pageId];
      let q: Question | undefined;
      
      if (currentState?.pendingKeyQuestionId) {
        q = questions.find(q => q.id === currentState.pendingKeyQuestionId);
      }
      
      if (!q) {
        // Pick a random question for the current subject (preferably core knowledge: grammar, formula, wordform)
        const subjectQuestions = questions.filter(q => q.subject === currentSubject && (q.type === 'multiple_choice' || q.type === 'short-answer' || q.type === 'wordform'));
        q = subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];
      }

      setQuestion(q || null);
      setSelectedAnswer('');
      setIsError(false);
      setShowWelcome(false);
      setIsOpen(true);
    };

    window.addEventListener('FOG_CARD_CLICKED', handleOpen);
    return () => window.removeEventListener('FOG_CARD_CLICKED', handleOpen);
  }, [questions, currentSubject, pageExplorationStates]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnswerSubmit = () => {
    if (!question) return;

    let isCorrect = false;
    if (question.type === 'multiple_choice') {
      isCorrect = selectedAnswer === question.correctAnswer;
    } else {
      const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
      const match = correctAnswers.find(ans => selectedAnswer.trim().toLowerCase() === (ans || '').trim().toLowerCase());
      isCorrect = !!match;
    }

    if (isCorrect) {
      if (pageId) updatePendingKeyQuestion(pageId, null);
      setShowWelcome(true);
    } else {
      setIsError(true);
      if (pageId) updatePendingKeyQuestion(pageId, question.id);
    }
  };

  if (!isOpen) return null;

  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-black/90 border border-synth-cyan/50 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,240,255,0.2)] text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-synth-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            <ShieldAlert className="w-10 h-10 text-synth-cyan" />
          </div>
          <h2 className="font-orbitron font-black text-2xl text-white mb-2 uppercase tracking-widest">
            Sương mù tản ra!
          </h2>
          <p className="text-slate-300 mb-8 text-sm leading-relaxed">
            Tuyệt vời! Tri thức của con đã thắp sáng khu vực này. Cánh cổng đã mở, hãy tiến vào và bắt đầu hành trình.
          </p>
          <button
            onClick={() => {
              setIsOpen(false);
              if (onUnlockCallback) onUnlockCallback();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
          >
            Tiến vào ngay
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-black/90 border border-slate-700 rounded-2xl max-w-lg w-full relative shadow-2xl animate-in fade-in duration-200">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
            <div className="p-3 rounded-xl bg-purple-500/10 text-synth-purple">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-lg text-white tracking-wide">
                NGƯỜI GÁC CỔNG
              </h2>
              <p className="text-xs text-slate-400">
                Hãy giải đáp câu hỏi để xua tan sương mù
              </p>
            </div>
          </div>

          {question ? (
            <div className="space-y-6">
              <div className="text-lg text-slate-200 leading-relaxed font-medium">
                {question.prompt}
              </div>

              {isError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>Đáp án chưa chính xác! Câu hỏi này đã bị ghim lại. Hãy ôn tập và quay lại thử sức nhé.</p>
                </div>
              )}

              {question.type === 'multiple_choice' && question.options ? (
                <div className="space-y-3">
                  {question.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedAnswer(opt);
                        setIsError(false);
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                        selectedAnswer === opt
                          ? 'bg-synth-cyan/10 border-synth-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => {
                    setSelectedAnswer(e.target.value);
                    setIsError(false);
                  }}
                  placeholder="Nhập đáp án của bạn..."
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-synth-cyan focus:ring-1 focus:ring-synth-cyan"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAnswerSubmit();
                  }}
                />
              )}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer}
                  className="px-8 py-3 rounded-xl bg-white text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-synth-cyan transition-colors"
                >
                  Giải Mã
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Không tìm thấy câu hỏi gác cổng.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
