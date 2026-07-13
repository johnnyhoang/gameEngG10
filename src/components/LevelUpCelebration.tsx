import React, { useEffect, useState } from 'react';
import { eventBus } from '../utils/EventBus';
import type { StudentRank } from '../types/game';

interface LevelUpPayload {
  fromLevel: number;
  toLevel: number;
  rank: StudentRank;
  rankChanged: boolean;
}

// Popup chúc mừng thăng cấp — Luật Một Bảng (CORE_SPECS §7.2/§7.3). Gắn toàn cục 1 lần ở App.tsx,
// nghe sự kiện PLAYER_LEVEL_UP do checkLevelUp() bắn (src/store/helpers.ts) bất kể đang ở màn nào.
export const LevelUpCelebration: React.FC = () => {
  const [celebration, setCelebration] = useState<LevelUpPayload | null>(null);

  useEffect(() => {
    const unsub = eventBus.subscribe('PLAYER_LEVEL_UP', (payload: LevelUpPayload) => {
      setCelebration(payload);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!celebration) return;
    const timer = setTimeout(() => setCelebration(null), celebration.rankChanged ? 6000 : 4000);
    return () => clearTimeout(timer);
  }, [celebration]);

  if (!celebration) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in cursor-pointer"
      onClick={() => setCelebration(null)}
    >
      <div className="w-full max-w-sm text-center space-y-4">
        {celebration.rankChanged ? (
          <>
            <div className="text-7xl animate-float drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              {celebration.rank.icon}
            </div>
            <h2 className="font-orbitron font-black text-2xl uppercase tracking-widest text-synth-orange drop-shadow-md">
              Thăng Cấp Danh Hiệu!
            </h2>
            <p className="font-orbitron font-bold text-lg text-white">
              {celebration.rank.icon} {celebration.rank.name}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed px-4">
              {celebration.rank.description}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-synth-cyan">
              Level {celebration.toLevel} · +100 Ruby · +100 XP
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl animate-float drop-shadow-[0_0_16px_rgba(0,240,255,0.5)]">
              {celebration.rank.icon}
            </div>
            <h2 className="font-orbitron font-black text-2xl uppercase tracking-widest text-synth-cyan drop-shadow-md">
              Lên Cấp {celebration.toLevel}!
            </h2>
            <p className="text-xs text-slate-300">
              {celebration.rank.name} · Level {celebration.toLevel}
            </p>
          </>
        )}
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Chạm để đóng</p>
      </div>
    </div>
  );
};
