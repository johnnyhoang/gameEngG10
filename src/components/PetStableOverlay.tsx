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
  const player = useGameState(state => state.player);
  const uiTheme = useGameState(state => state.uiTheme);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerReason, setTriggerReason] = useState<'login' | 'manual' | 'idle' | 'hunger' | 'energy-depleted'>('manual');
  
  // Track idle time
  const lastActiveTime = useRef(Date.now());
  
  // Shared cooldown across ALL auto-triggers (including across page reloads)
  const lastAutoTrigger = useRef<number>(Number(localStorage.getItem('ge10_last_pet_interaction') || 0));

  const setLastAutoTrigger = (time: number) => {
    lastAutoTrigger.current = time;
    localStorage.setItem('ge10_last_pet_interaction', time.toString());
  };

  // Global triggers
  useEffect(() => {
    if (!currentUser || isAdmin(currentUser.role)) return;

    // Initialize login time on first mount
    const loginTimeKey = 'ge10_login_time';
    const existingLoginTime = localStorage.getItem(loginTimeKey);
    if (!existingLoginTime) {
      localStorage.setItem(loginTimeKey, Date.now().toString());
    }

    const handleActivity = () => {
      lastActiveTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    const interval = setInterval(() => {
      if (isOpen || isDungeonScreen) {
        // Postpone triggers if overlay is already open or student is in dungeon
        lastActiveTime.current = Date.now();
        return;
      }

      // Check if any other modal is open
      const hasOtherModal = document.querySelectorAll('.fixed.inset-0').length > 0;
      if (hasOtherModal) {
        // Postpone trigger but DON'T reset lastActiveTime, so it will trigger as soon as modals are closed
        return;
      }

      const now = Date.now();

      // Cooldown chung: heo chỉ được TỰ xuất hiện tối đa 1 lần mỗi 30 PHÚT, bất kể lý do gì
      // (yêu cầu Hiệu Trưởng 2026-07-10 — chống làm phiền). Cooldown persist qua localStorage.
      const THIRTY_MINUTES = 30 * 60 * 1000;
      if (now - lastAutoTrigger.current < THIRTY_MINUTES) {
        return;
      }

      // Báo hết Chân Khí (SUB_SPEC_ENERGY §4): ưu tiên cao nhất, KHÔNG chờ "30 phút sau đăng nhập"
      // như idle/hunger — con cần biết ngay lý do bị khóa hoạt động sinh điểm và giờ hồi lại.
      if (player.energy === 0 && player.energyDepletedAt) {
        setTriggerReason('energy-depleted');
        setIsOpen(true);
        setLastAutoTrigger(now);
        return;
      }

      // Pet first appears 30 minutes after login (not immediately)
      const loginTime = Number(localStorage.getItem('ge10_login_time') || now);
      const timeSinceLogin = now - loginTime;
      if (timeSinceLogin < THIRTY_MINUTES) {
        return;
      }

      const idleTime = now - lastActiveTime.current;

      // 10 mins idle = 10 * 60 * 1000 = 600000
      if (idleTime > 600000) {
        setTriggerReason('idle');
        setIsOpen(true);
        setLastAutoTrigger(now);
      } else {
        // Hunger check (trigger ngủ 22h-5h đã bị xóa theo CORE_SPECS §2.5)
        const lastFedTime = new Date(pet.lastFed).getTime();
        const twelveHours = 12 * 60 * 60 * 1000;
        if (now - lastFedTime > twelveHours) {
          setTriggerReason('hunger');
          setIsOpen(true);
          setLastAutoTrigger(now);
        }
      }
    }, 10000); // Check every 10 seconds

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(interval);
    };
  }, [currentUser, isOpen, isDungeonScreen, pet.lastFed, player.energy, player.energyDepletedAt]);

  const handleManualSummon = () => {
    if (isDungeonScreen) return;
    setTriggerReason('manual');
    setIsOpen(true);
  };

  const handleInteract = () => {
    // Only way to close is by interacting. We wait 2s to show the speech bubble reaction.
    setTimeout(() => {
      setIsOpen(false);
      const now = Date.now();
      lastActiveTime.current = now; // reset idle timer
      setLastAutoTrigger(now); // snooze all auto-triggers, whatever the reason was
    }, 2000);
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

      {/* Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm">
            {/* Custom greeting based on trigger reason */}
            {triggerReason === 'login' && (
              <div className="text-center mb-4 font-orbitron font-bold text-synth-cyan animate-bounce drop-shadow-md">
                Chào ngày mới, môn sinh! 🐷
              </div>
            )}
            {triggerReason === 'idle' && (
              <div className="text-center mb-4 font-orbitron font-bold text-synth-magenta animate-bounce drop-shadow-md">
                Dậy học tiếp thôi, sao ngồi im thế! 📚
              </div>
            )}
            {triggerReason === 'hunger' && (
              <div className="text-center mb-4 font-orbitron font-bold text-red-400 animate-wiggle drop-shadow-md">
                Heo đói rã ruột rồi, cho ăn đi! 🍖
              </div>
            )}
            {triggerReason === 'energy-depleted' && (
              <div className="text-center mb-4 font-orbitron font-bold text-red-400 animate-wiggle drop-shadow-md">
                Hết Chân Khí rồi, nghỉ ngơi thôi! Hẹn con quay lại lúc{' '}
                {player.energyDepletedAt
                  ? new Date(player.energyDepletedAt + (player.resetHours ?? 3) * 60 * 60 * 1000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                  : '—'}{' '}
                nhé. Trong lúc chờ, con đọc Cẩm Nang hoặc chăm heo cũng được tính công đấy! 📖🐷
              </div>
            )}

            <Suspense fallback={<div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan"></div></div>}>
              <PetSanctuary variant="sidebar" onInteract={handleInteract} />
            </Suspense>
            
            <div className="text-center mt-4 text-[11px] font-semibold text-slate-300 drop-shadow">
              *Hãy tương tác (Thọt lét hoặc Cho ăn) để cất heo về chuồng
            </div>
          </div>
        </div>
      )}
    </>
  );
};
