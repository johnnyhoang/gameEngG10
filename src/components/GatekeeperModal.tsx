import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { ShieldAlert, X, Brain, AlertCircle, ArrowRight } from 'lucide-react';
import type { SubjectId } from '../types/game';
import { useSect } from '../contexts/SectContext';
import type { Question } from '../types/game';
import {
  pickGatekeeperQuestion,
  getRecentlyUsedGatekeeperIds,
  recordGatekeeperUsage,
} from '../utils/gatekeeper';
import { BikiHinhHocPhang } from './BikiHinhHocPhang';
import { Biki3DStudio } from './Biki3DStudio';

import { toast } from '../utils/toast';

interface GatekeeperModalProps {}

export const GatekeeperModal: React.FC<GatekeeperModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [onUnlockCallback, setOnUnlockCallback] = useState<(() => void) | null>(null);
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [geometryMode, setGeometryMode] = useState<'2d' | '3d' | null>(null);

  const { questions, pageExplorationStates, updatePendingKeyQuestion, player, awardCoinsAndXp } = useGameState();
  const { activeSectId } = useSect();

  const isGeometry2D = React.useMemo(() => {
    if (!question) return false;
    if (question.metadata?.mathTopic === 'plane-geometry') return true;
    const text = question.prompt.toLowerCase();
    return text.includes('tam giác') || text.includes('hình chữ nhật') || text.includes('hình vuông') || text.includes('hình thang') || text.includes('đường tròn') || text.includes('tứ giác');
  }, [question]);

  const isGeometry3D = React.useMemo(() => {
    if (!question) return false;
    if (question.metadata?.mathTopic === 'solid-geometry') return true;
    const text = question.prompt.toLowerCase();
    return text.includes('hình chóp') || text.includes('hình trụ') || text.includes('hình hộp') || text.includes('lăng trụ') || text.includes('tứ diện') || text.includes('mặt cầu');
  }, [question]);

  useEffect(() => {
    const handleOpen = async (e: Event) => {
      const customEvent = e as CustomEvent;
      const { pageId, onUnlock } = customEvent.detail;
      setPageId(pageId);
      setOnUnlockCallback(() => onUnlock);
      
      // Load question — ưu tiên câu bị ghim (pendingKeyQuestionId)
      const currentState = pageExplorationStates[pageId];
      let q: Question | undefined;
      
      if (currentState?.pendingKeyQuestionId) {
        q = questions.find(q => q.id === currentState.pendingKeyQuestionId);
      }
      
      if (!q) {
        // Dùng Core Knowledge-aware picker (CORE_SPECS §9.D)
        const studentId = player?.id ?? 'guest';
        const recentlyUsed = await getRecentlyUsedGatekeeperIds(studentId, pageId);
        const picked = pickGatekeeperQuestion(pageId, activeSectId as SubjectId, questions, recentlyUsed);
        q = picked ?? undefined;
        if (picked) await recordGatekeeperUsage(studentId, pageId, picked.id);
      }

      setQuestion(q || null);
      setSelectedAnswer('');
      setIsError(false);
      setShowWelcome(false);
      setGeometryMode(null);
      setIsOpen(true);
    };

    window.addEventListener('FOG_CARD_CLICKED', handleOpen);
    return () => window.removeEventListener('FOG_CARD_CLICKED', handleOpen);
  }, [questions, activeSectId, pageExplorationStates, player]);


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
      awardCoinsAndXp(10, 0, 'Giải mã cổng sương mù đúng', `Trả lời đúng câu hỏi Gatekeeper tại ${pageId}`);
      toast.success('Trả lời chính xác! +10 NP 🎉');
      setShowWelcome(true);
    } else {
      setIsError(true);
      awardCoinsAndXp(-5, 0, 'Giải mã cổng sương mù sai', `Trả lời sai câu hỏi Gatekeeper tại ${pageId}`);
      toast.error('Nhầm rồi thiếu hiệp! Bị phạt -5 NP. Đang đổi câu hỏi mới... 🐷');
      
      // Tự động load câu hỏi mới sau 2 giây để người dùng kịp quan sát
      setTimeout(async () => {
        const studentId = player?.id ?? 'guest';
        const recentlyUsed = pageId ? await getRecentlyUsedGatekeeperIds(studentId, pageId) : [];
        const picked = pageId ? pickGatekeeperQuestion(pageId, activeSectId as SubjectId, questions, recentlyUsed) : null;
        if (picked) {
          setQuestion(picked);
          if (pageId) await recordGatekeeperUsage(studentId, pageId, picked.id);
        } else {
          setQuestion(null);
        }
        setSelectedAnswer('');
        setIsError(false);
      }, 2000);
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
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-3xl">
              🐷
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-base text-white tracking-wide uppercase">
                Heo Maikawaii Gác Cổng
              </h2>
              <p className="text-[10px] text-slate-400">
                Hãy giúp Heo giải đáp thử thách trắc nghiệm này để xua tan sương mù nhé!
              </p>
            </div>
          </div>

          {question ? (
            <div className="space-y-6">
              <div className="text-lg text-slate-200 leading-relaxed font-medium">
                {question.prompt}
              </div>

              {(isGeometry2D || isGeometry3D) && (
                <div className="flex gap-3">
                  {isGeometry2D && (
                    <button
                      onClick={() => setGeometryMode('2d')}
                      className="px-4 py-2 rounded-xl bg-synth-cyan/10 border border-synth-cyan/30 text-synth-cyan hover:bg-synth-cyan/20 transition-colors text-sm font-bold flex items-center gap-2"
                    >
                      <Brain className="w-4 h-4" /> Vẽ Hình 2D
                    </button>
                  )}
                  {isGeometry3D && (
                    <button
                      onClick={() => setGeometryMode('3d')}
                      className="px-4 py-2 rounded-xl bg-synth-purple/10 border border-synth-purple/30 text-synth-purple hover:bg-synth-purple/20 transition-colors text-sm font-bold flex items-center gap-2"
                    >
                      <Brain className="w-4 h-4" /> Vẽ Hình 3D
                    </button>
                  )}
                </div>
              )}

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

      {geometryMode === '2d' && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-6xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-orbitron font-bold text-synth-cyan">Bảng Vẽ 2D</h2>
              <button onClick={() => setGeometryMode(null)} className="p-2 text-slate-400 hover:text-white bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-[#07111f] rounded-2xl border border-white/10 p-4">
              <BikiHinhHocPhang problemText={question?.prompt} />
            </div>
          </div>
        </div>
      )}

      {geometryMode === '3d' && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-7xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-orbitron font-bold text-synth-purple">Bảng Vẽ 3D</h2>
              <button onClick={() => setGeometryMode(null)} className="p-2 text-slate-400 hover:text-white bg-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-[#07111f] rounded-2xl border border-white/10 p-4">
              <Biki3DStudio problemText={question?.prompt || ''} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
