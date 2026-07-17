import React from 'react';

interface BossTimerBarProps {
  mode: string;
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export const BossTimerBar: React.FC<BossTimerBarProps> = ({ mode, timeLeft, formatTime }) => {
  if (mode !== 'boss' || timeLeft <= 0) return null;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[9px] font-orbitron font-bold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1">
          ⏰ Thời Gian Diệt Boss: <span className="text-synth-orange font-black">20 phút</span>
        </span>
        <span className={timeLeft < 180 ? 'text-red-400 animate-pulse font-black' : 'text-slate-300'}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full h-2 bg-synth-gray rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft < 180
              ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_10px_#ef4444]'
              : timeLeft < 480
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_10px_#f59e0b]'
              : 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_10px_#10b981]'
          }`}
          style={{ width: `${Math.min(100, (timeLeft / (20 * 60)) * 100)}%` }}
        />
      </div>
    </div>
  );
};
