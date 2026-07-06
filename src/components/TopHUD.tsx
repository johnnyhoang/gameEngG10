import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Zap, Heart, Coins, Flame, Shield, Award, LogOut } from 'lucide-react';

interface TopHUDProps {
  currentScreen: 'map' | 'play' | 'shop' | 'parent';
  onOpenShop: () => void;
  onOpenParent: () => void;
  onBackToMap: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ 
  currentScreen, onOpenShop, onOpenParent, onBackToMap 
}) => {
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const logout = useGameState(state => state.logout);
  const showHelp = useGameState(state => state.showHelp);

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
            {currentUser && (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-9 h-9 rounded-full border border-synth-cyan/40 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
                title={`${currentUser.name} (${currentUser.email})`}
              />
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-white font-orbitron tracking-wide max-w-[100px] truncate">
                  {currentUser ? currentUser.name : 'Con yêu'}
                </span>
                {currentUser?.role === 'admin' ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-magenta/30 text-synth-magenta border border-synth-magenta/20 uppercase font-orbitron shadow-[0_0_8px_rgba(255,0,127,0.2)]">
                    ADMIN
                  </span>
                ) : (
                  <span 
                    onClick={() => showHelp('xp')}
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-purple/30 text-synth-cyan border border-synth-cyan/20 uppercase font-orbitron cursor-pointer hover:bg-synth-purple/50 flex items-center gap-0.5"
                    title="Cấp độ - Nhấp để xem hướng dẫn"
                  >
                    LV.{player.level} <span className="text-[8px] opacity-60">?</span>
                  </span>
                )}
              </div>
              {currentUser?.role !== 'admin' && (
                <div className="flex flex-col w-28 md:w-36 mt-1">
                  <div className="flex justify-between text-[9px] font-orbitron font-semibold text-synth-cyan mb-0.5">
                    <span>EXP</span>
                    <span>{player.xp}/{xpNeeded}</span>
                  </div>
                  <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden border border-synth-cyan/10">
                    <div 
                      className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple shadow-[0_0_8px_#00f0ff]" 
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {currentUser?.role !== 'admin' && (
          <div className="grid grid-cols-6 md:flex md:items-center gap-2 md:gap-3 w-full md:w-auto justify-center">
            {/* Energy */}
            <div 
              onClick={() => showHelp('energy')}
              className="col-span-2 md:col-span-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:bg-synth-blue/60 transition-all" 
              title="Năng lượng làm bài - Nhấp để xem hướng dẫn"
            >
              <Zap className="w-4 h-4 text-synth-cyan fill-synth-cyan animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] text-synth-cyan font-orbitron font-bold uppercase tracking-wider hidden sm:inline">Energy</span>
                <span className="text-xs font-semibold font-orbitron text-white">{player.energy}/100 <span className="text-[8px] opacity-50">?</span></span>
              </div>
            </div>

            {/* Hearts */}
            <div 
              onClick={() => showHelp('hearts')}
              className="col-span-2 md:col-span-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:bg-synth-blue/60 transition-all" 
              title="Mạng chơi - Nhấp để xem hướng dẫn"
            >
              <div className="flex gap-0.5 items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-4 h-4 ${i < player.hearts ? 'text-synth-magenta fill-synth-magenta shadow-lg animate-float' : 'text-synth-gray fill-transparent'}`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <span className="text-[8px] text-synth-magenta ml-1 opacity-50 font-bold font-orbitron">?</span>
              </div>
            </div>

            {/* Coins */}
            <div 
              onClick={() => showHelp('nanite')}
              className="col-span-2 md:col-span-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:bg-synth-blue/60 transition-all" 
              title="Tiền vàng Nanite NP - Nhấp để xem hướng dẫn"
            >
              <Coins className="w-4 h-4 text-synth-orange fill-synth-orange" />
              <div className="flex flex-col">
                <span className="text-[8px] text-synth-orange font-orbitron font-bold uppercase tracking-wider hidden sm:inline">Nanite NP</span>
                <span className="text-xs font-semibold font-orbitron text-white">{player.coins} <span className="text-[8px] opacity-50">?</span></span>
              </div>
            </div>

            {/* Streak */}
            <div 
              onClick={() => showHelp('streak')}
              className="col-span-3 md:col-span-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:bg-synth-blue/60 transition-all relative" 
              title="Chuỗi ngày liên tục học - Nhấp để xem hướng dẫn"
            >
              <div className="flex items-center justify-center gap-1.5">
                <Flame className={`w-4 h-4 ${player.streak > 0 ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-synth-gray'}`} />
                <div className="flex flex-col">
                  <span className="text-[8px] text-orange-400 font-orbitron font-bold uppercase tracking-wider hidden sm:inline">Streak</span>
                  <span className="text-xs font-semibold font-orbitron text-white">{player.streak}d <span className="text-[8px] opacity-50">?</span></span>
                </div>
                {hasShield && (
                  <span title="Khiên bảo vệ Streak đang hoạt động!">
                    <Shield className="w-3.5 h-3.5 text-synth-cyan fill-synth-cyan/20 animate-pulse ml-0.5" />
                  </span>
                )}
              </div>
            </div>

            {/* Virtual Wallet */}
            <div 
              onClick={() => showHelp('wallet')}
              className="col-span-3 md:col-span-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-magenta/30 cursor-pointer hover:bg-synth-blue/60 transition-all" 
              title="Ví thưởng VND - Nhấp để xem hướng dẫn"
            >
              <Award className="w-4 h-4 text-synth-magenta" />
              <div className="flex flex-col font-orbitron">
                <span className="text-[8px] text-synth-magenta font-bold uppercase tracking-wider hidden sm:inline">Ví Thưởng</span>
                <span className="text-xs font-semibold text-synth-magenta">{player.walletVND.toLocaleString()}đ <span className="text-[8px] opacity-50">?</span></span>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {currentUser?.role !== 'admin' && (
            <>
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
              
              {currentUser?.role === 'admin' && (
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
              )}
            </>
          )}

          {currentUser && (
            <button 
              onClick={logout}
              className="p-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/15 cursor-pointer hover:synth-glow-red transition-all duration-300 flex items-center justify-center"
              title="Đăng xuất tài khoản"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
