import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Zap, Heart, Coins, Flame, Shield, Award } from 'lucide-react';

interface TopHUDProps {
  onOpenParent: () => void;
  onOpenShop: () => void;
  onBackToMap: () => void;
  currentScreen: string;
}

export const TopHUD: React.FC<TopHUDProps> = ({ onOpenParent, onOpenShop, onBackToMap, currentScreen }) => {
  const player = useGameState(state => state.player);
  
  // Calculate percentage of XP to next level
  const xpNeeded = player.level * 200;
  const xpPercent = Math.min(100, (player.xp / xpNeeded) * 100);

  const hasShield = player.badges.includes('Streak Shield');

  return (
    <header className="glass-panel border-b border-synth-cyan/20 p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Level */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={onBackToMap}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-orbitron text-2xl font-black bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent group-hover:synth-glow-cyan transition-all duration-300">
              CYBER_ENGLISH
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded border border-synth-magenta text-synth-magenta uppercase font-orbitron animate-pulse">
              G10 HCMC
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-synth-purple to-synth-cyan border border-synth-cyan/30 text-white font-orbitron font-bold">
              L{player.level}
            </div>
            <div className="flex flex-col w-28 md:w-36">
              <div className="flex justify-between text-xs font-orbitron font-semibold text-synth-cyan mb-1">
                <span>EXP</span>
                <span>{player.xp}/{xpNeeded}</span>
              </div>
              <div className="w-full h-2 bg-synth-gray rounded-full overflow-hidden border border-synth-cyan/20">
                <div 
                  className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple shadow-[0_0_8px_#00f0ff]" 
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          {/* Energy */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-synth-blue/40 border border-synth-cyan/20" title="Năng lượng làm bài hôm nay">
            <Zap className="w-5 h-5 text-synth-cyan fill-synth-cyan animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] text-synth-cyan font-orbitron font-bold uppercase tracking-wider">Energy</span>
              <span className="text-sm font-semibold font-orbitron">{player.energy}/100</span>
            </div>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-synth-blue/40 border border-synth-cyan/20" title="Mạng chơi trong Dungeon/Arena">
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-5 h-5 ${i < player.hearts ? 'text-synth-magenta fill-synth-magenta shadow-lg animate-float' : 'text-synth-gray fill-transparent'}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:border-synth-orange/50 transition-all duration-300" onClick={onOpenShop} title="Tiền vàng Nanite Points (NP)">
            <Coins className="w-5 h-5 text-synth-orange fill-synth-orange" />
            <div className="flex flex-col">
              <span className="text-[10px] text-synth-orange font-orbitron font-bold uppercase tracking-wider">Nanite NP</span>
              <span className="text-sm font-semibold font-orbitron">{player.coins}</span>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-synth-blue/40 border border-synth-cyan/20" title="Chuỗi Streak liên tục học tập">
            <Flame className={`w-5 h-5 ${player.streak > 0 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-synth-gray'}`} />
            <div className="flex flex-col">
              <span className="text-[10px] text-orange-400 font-orbitron font-bold uppercase tracking-wider">Streak</span>
              <span className="text-sm font-semibold font-orbitron">{player.streak} Ngày</span>
            </div>
            {hasShield && (
              <span title="Khiên bảo vệ Streak đang hoạt động!">
                <Shield className="w-4 h-4 text-synth-cyan fill-synth-cyan/20 animate-pulse ml-1" />
              </span>
            )}
          </div>

          {/* Virtual Wallet */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-synth-blue/40 border border-synth-magenta/30" title="Ví tích lũy quy đổi VND từ Ba">
            <Award className="w-5 h-5 text-synth-magenta" />
            <div className="flex flex-col font-orbitron">
              <span className="text-[10px] text-synth-magenta font-bold uppercase tracking-wider">Ví Thưởng</span>
              <span className="text-sm font-semibold text-synth-magenta">{player.walletVND.toLocaleString()}đ</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenShop}
            className={`px-4 py-2 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
              currentScreen === 'shop' 
                ? 'bg-synth-orange border-synth-orange text-black shadow-[0_0_12px_#ff9f1c]' 
                : 'bg-transparent border-synth-orange/50 text-synth-orange hover:bg-synth-orange/10'
            }`}
          >
            Item Shop
          </button>
          
          <button 
            onClick={onOpenParent}
            className={`px-4 py-2 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
              currentScreen === 'parent' 
                ? 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_12px_#ff007f]' 
                : 'bg-transparent border-synth-magenta/50 text-synth-magenta hover:bg-synth-magenta/10'
            }`}
          >
            Parent HUD
          </button>
        </div>
      </div>
    </header>
  );
};
