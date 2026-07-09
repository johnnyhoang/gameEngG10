import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { PetSanctuary } from './PetSanctuary';

interface PetStableOverlayProps {
  isDungeonScreen: boolean;
}

export const PetStableOverlay: React.FC<PetStableOverlayProps> = ({ isDungeonScreen }) => {
  const currentUser = useGameState(state => state.currentUser);
  const pet = useGameState(state => state.pet);
  const uiTheme = useGameState(state => state.uiTheme);
  
  const [isOpen, setIsOpen] = useState(false);
  const [triggerReason, setTriggerReason] = useState<'login' | 'manual' | 'idle' | 'sleep' | 'hunger'>('manual');
  
  // Track idle time
  const lastActiveTime = useRef(Date.now());
  const lastSleepReminder = useRef(0);
  
  // Login trigger state
  const hasGreeted = useRef(false);

  useEffect(() => {
    if (!currentUser || currentUser.role === 'admin') return;

    if (!hasGreeted.current && !isDungeonScreen) {
      // Show greeting overlay after 5s to avoid overlapping with handbook on login
      const timer = setTimeout(() => {
        setTriggerReason('login');
        setIsOpen(true);
        hasGreeted.current = true;
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, isDungeonScreen]);

  // Global triggers
  useEffect(() => {
    if (!currentUser || currentUser.role === 'admin') return;

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

      const now = Date.now();
      const idleTime = now - lastActiveTime.current;
      
      // 5 mins idle = 5 * 60 * 1000 = 300000
      if (idleTime > 300000) {
        setTriggerReason('idle');
        setIsOpen(true);
      } else {
        // Sleep check
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 5) {
          // It's sleep time
          if (now - lastSleepReminder.current > 300000) { // every 5 mins
            setTriggerReason('sleep');
            setIsOpen(true);
            lastSleepReminder.current = now;
          }
        }

        // Hunger check
        const lastFedTime = new Date(pet.lastFed).getTime();
        const twelveHours = 12 * 60 * 60 * 1000;
        if (now - lastFedTime > twelveHours) {
          setTriggerReason('hunger');
          setIsOpen(true);
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
  }, [currentUser, isOpen, isDungeonScreen, pet.lastFed]);

  const handleManualSummon = () => {
    if (isDungeonScreen) return;
    setTriggerReason('manual');
    setIsOpen(true);
  };

  const handleInteract = () => {
    // Only way to close is by interacting. We wait 2s to show the speech bubble reaction.
    setTimeout(() => {
      setIsOpen(false);
      lastActiveTime.current = Date.now(); // reset idle timer
    }, 2000); 
  };

  if (!currentUser || currentUser.role === 'admin') return null;

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
                Chào ngày mới, thiếu hiệp! 🐷
              </div>
            )}
            {triggerReason === 'idle' && (
              <div className="text-center mb-4 font-orbitron font-bold text-synth-magenta animate-bounce drop-shadow-md">
                Dậy học tiếp thôi, sao ngồi im thế! 📚
              </div>
            )}
            {triggerReason === 'sleep' && (
              <div className="text-center mb-4 font-orbitron font-bold text-synth-cyan animate-pulse drop-shadow-md">
                Khuya quá rồi, ngủ đi thiếu hiệp ơi! 😴
              </div>
            )}
            {triggerReason === 'hunger' && (
              <div className="text-center mb-4 font-orbitron font-bold text-red-400 animate-wiggle drop-shadow-md">
                Heo đói rã ruột rồi, cho ăn đi! 🍖
              </div>
            )}
            
            <PetSanctuary variant="sidebar" onInteract={handleInteract} />
            
            <div className="text-center mt-4 text-[11px] font-semibold text-slate-300 drop-shadow">
              *Hãy tương tác (Thọt lét hoặc Cho ăn) để cất heo về chuồng
            </div>
          </div>
        </div>
      )}
    </>
  );
};
