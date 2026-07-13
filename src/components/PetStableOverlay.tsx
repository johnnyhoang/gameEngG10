import { isAdmin } from '../utils/roleHelpers';
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGameState } from '../hooks/useGameState';
const PetSanctuary = lazy(() => import('./PetSanctuary').then(m => ({ default: m.PetSanctuary })));

interface PetStableOverlayProps {
  isDungeonScreen: boolean;
}

export const PetStableOverlay: React.FC<PetStableOverlayProps> = ({ isDungeonScreen }) => {
  const currentUser = useGameState(state => state.currentUser);
  const pet = useGameState(state => state.pet);
  const uiTheme = useGameState(state => state.uiTheme);
  const showHelp = useGameState(state => state.showHelp);
  const logout = useGameState(state => state.logout);
  const logoutState = useGameState(state => state.logoutState);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerReason, setTriggerReason] = useState<'login' | 'manual' | 'idle' | 'hunger' | 'energy-depleted'>('manual');
  const [logoutCountdown, setLogoutCountdown] = useState(10);
  
  // Track idle time
  const lastActiveTime = useRef(Date.now());
  
  // Heo không tự xuất hiện theo thời gian đăng nhập, cơn đói hoặc Năng Lượng.
  // Auto-trigger duy nhất là 10 phút không có bất kỳ tương tác nào.
  useEffect(() => {
    if (!currentUser || isAdmin(currentUser.role)) return;

    lastActiveTime.current = Date.now();

    const handleActivity = () => {
      if (isOpen) return;
      lastActiveTime.current = Date.now();
    };

    window.addEventListener('pointermove', handleActivity);
    window.addEventListener('pointerdown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    const interval = setInterval(() => {
      if (isOpen) return;
      const now = Date.now();
      if (now - lastActiveTime.current >= 10 * 60 * 1000) {
        setTriggerReason('idle');
        setLogoutCountdown(10);
        setIsOpen(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('pointermove', handleActivity);
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(interval);
    };
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (!isOpen || triggerReason !== 'idle') return;
    if (logoutCountdown <= 0) {
      void logout();
      return;
    }
    const timer = window.setTimeout(() => setLogoutCountdown(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [isOpen, triggerReason, logoutCountdown, logout]);

  const handleManualSummon = () => {
    if (isDungeonScreen) return;
    setTriggerReason('manual');
    setIsOpen(true);
  };

  const handleInteract = () => {
    // Only way to close is by interacting. We wait 2s to show the speech bubble reaction.
    setTimeout(() => {
      setIsOpen(false);
      lastActiveTime.current = Date.now();
    }, 2000);
  };

  const handleContinueLearning = () => {
    lastActiveTime.current = Date.now();
    setIsOpen(false);
    setLogoutCountdown(10);
  };

  if (!currentUser || isAdmin(currentUser.role)) return null;

  return (
    <>
      {/* Pet Stable Button */}
      {!isDungeonScreen && (
        <button
          onClick={handleManualSummon}
          className={`fixed bottom-24 lg:bottom-10 right-6 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-40 transition-transform hover:scale-110 active:scale-95 ${
            uiTheme === 'unicorn-dream'
              ? 'bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 border-2 border-violet-200 shadow-[0_0_14px_rgba(192,132,252,0.4)]'
              : 'bg-synth-gray border-2 border-synth-cyan shadow-[0_0_12px_rgba(0,240,255,0.4)]'
          }`}
          title="Chuồng Heo Maikawaii"
        >
          <span className="text-2xl lg:text-3xl animate-wiggle inline-block">🐷</span>
          {/* Notification dot if hungry */}
          {Date.now() - new Date(pet.lastFed).getTime() > 12 * 60 * 60 * 1000 && (
            <span className="absolute top-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full border-2 border-synth-bg animate-pulse"></span>
          )}
        </button>
      )}

      {/* Cẩm Nang Học Đường Floating Button */}
      {!isDungeonScreen && (
        <button
          onClick={() => showHelp('all')}
          className={`fixed bottom-24 lg:bottom-10 right-22 lg:right-24 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-40 transition-transform hover:scale-110 active:scale-95 ${
            uiTheme === 'unicorn-dream'
              ? 'bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 border-2 border-violet-200 shadow-[0_0_14px_rgba(192,132,252,0.4)]'
              : 'bg-synth-gray border-2 border-synth-cyan shadow-[0_0_12px_rgba(0,240,255,0.4)]'
          }`}
          title="Cẩm Nang Học Đường & Trợ Giúp"
        >
          <span className="text-2xl lg:text-3xl inline-block">📖</span>
        </button>
      )}

      {/* Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm flex flex-col items-center justify-center">
            <Suspense fallback={<div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan"></div></div>}>
              <PetSanctuary
                variant="sidebar"
                triggerReason={triggerReason}
                onInteract={triggerReason === 'idle' ? undefined : handleInteract}
              />
            </Suspense>

            {triggerReason === 'idle' ? (
              <div className="w-full mt-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleContinueLearning}
                    className="rounded-xl bg-synth-cyan px-3 py-2.5 font-orbitron text-xs font-black uppercase text-slate-950 hover:brightness-110"
                  >
                    Học tiếp
                  </button>
                  <button
                    onClick={() => void logout()}
                    disabled={logoutState === 'processing'}
                    className="rounded-xl border border-red-400/50 bg-red-500/15 px-3 py-2.5 font-orbitron text-xs font-black uppercase text-red-300 hover:bg-red-500/25 disabled:opacity-50"
                  >
                    {logoutState === 'processing' ? 'Đang rời viện...' : 'Rời viện'}
                  </button>
                </div>
                <p className="text-center text-xs font-bold text-amber-300">
                  Tự động rời viện sau {logoutCountdown} giây nếu không lựa chọn.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
