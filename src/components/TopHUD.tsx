import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Zap, Heart, Coins, Flame, Shield, Award, LogOut, Palette } from 'lucide-react';

interface TopHUDProps {
  currentScreen: 'map' | 'play' | 'shop' | 'parent' | 'pet' | 'logs' | 'hang';
  onOpenShop: () => void;
  onOpenParent: () => void;
  onOpenHang: () => void;
  onOpenProfile: () => void;
  onBackToMap: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ 
  currentScreen, onOpenShop, onOpenParent, onOpenHang, onOpenProfile, onBackToMap 
}) => {
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const logout = useGameState(state => state.logout);
  const showHelp = useGameState(state => state.showHelp);
  const currentSubject = useGameState(state => state.currentSubject);
  const setSubject = useGameState(state => state.setSubject);
  const uiTheme = useGameState(state => state.uiTheme);

  // Calculate percentage of XP to next level
  const xpNeeded = player.level * 200;
  const xpPercent = Math.min(100, (player.xp / xpNeeded) * 100);

  const hasShield = player.badges.includes('Streak Shield');
  const isUnicorn = uiTheme === 'unicorn-dream';
  const headerClass = isUnicorn
    ? 'glass-panel border-b border-violet-200/30 p-4 sticky top-0 z-40 bg-gradient-to-r from-fuchsia-50/80 via-white/90 to-cyan-50/80'
    : 'glass-panel border-b border-synth-cyan/20 p-4 sticky top-0 z-40';
  const statChipClass = isUnicorn
    ? 'flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-white/70 border border-violet-200/35 text-violet-800 shadow-[0_8px_18px_rgba(192,132,252,0.12)] cursor-pointer hover:bg-white/90 transition-all'
    : 'flex items-center justify-center gap-1.5 px-2 py-1 rounded-lg bg-synth-blue/40 border border-synth-cyan/20 cursor-pointer hover:bg-synth-blue/60 transition-all';

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Level */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={onBackToMap}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <span className={`font-orbitron text-2xl font-black bg-gradient-to-r ${isUnicorn ? 'from-fuchsia-500 via-violet-500 to-cyan-400' : 'from-synth-cyan to-synth-magenta'} bg-clip-text text-transparent group-hover:synth-glow-cyan transition-all duration-300`}>
              MIKAWAII
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase font-orbitron animate-pulse ${
              currentSubject === 'math' 
                ? 'border-synth-magenta text-synth-magenta shadow-[0_0_6px_rgba(255,0,128,0.3)]' 
                : currentSubject === 'literature'
                ? 'border-synth-orange text-synth-orange shadow-[0_0_6px_rgba(255,165,0,0.3)]'
                : 'border-synth-cyan text-synth-cyan shadow-[0_0_6px_rgba(0,240,255,0.3)]'
            }`}>
              {currentSubject === 'math' ? 'MATH' : currentSubject === 'literature' ? 'LIT' : 'ENGLISH'}
            </span>
          </div>

          {/* Subject Switcher */}
          {currentUser && currentUser.role !== 'admin' && (
            <div className="flex items-center bg-synth-gray/30 rounded-xl p-0.5 border border-white/10 font-orbitron text-[9px] shrink-0">
              <button
                onClick={() => setSubject('english')}
                className={`px-2 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                  currentSubject === 'english'
                    ? 'bg-gradient-to-r from-synth-purple to-synth-cyan text-black shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                    : 'text-synth-text-muted hover:text-white'
                }`}
              >
                ANH
              </button>
              <button
                onClick={() => setSubject('math')}
                className={`px-2 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                  currentSubject === 'math'
                    ? 'bg-gradient-to-r from-synth-purple to-synth-magenta text-white shadow-[0_0_8px_rgba(255,0,128,0.4)]'
                    : 'text-synth-text-muted hover:text-white'
                }`}
              >
                TOÁN
              </button>
              <button
                onClick={() => setSubject('literature')}
                className={`px-2 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                  currentSubject === 'literature'
                    ? 'bg-gradient-to-r from-synth-purple to-synth-orange text-white shadow-[0_0_8px_rgba(255,165,0,0.4)]'
                    : 'text-synth-text-muted hover:text-white'
                }`}
              >
                VĂN
              </button>
            </div>
          )}

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
              className={`col-span-2 md:col-span-1 ${statChipClass}`} 
              title="Năng lượng làm bài - Nhấp để xem hướng dẫn"
            >
              <Zap className="w-4 h-4 text-synth-cyan fill-synth-cyan animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[8px] text-synth-cyan font-orbitron font-bold uppercase tracking-wider hidden sm:inline">Energy</span>
                <span className="text-xs font-semibold font-orbitron text-white">{player.energy}/1000 <span className="text-[8px] opacity-50">?</span></span>
              </div>
            </div>

            {/* Hearts */}
            <div 
              onClick={() => showHelp('hearts')}
              className={`col-span-2 md:col-span-1 ${statChipClass}`} 
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
              className={`col-span-2 md:col-span-1 ${statChipClass}`} 
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
              className={`col-span-3 md:col-span-1 ${statChipClass} relative`} 
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
              className={`col-span-3 md:col-span-1 ${statChipClass}`} 
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
                className={`hidden sm:inline-block px-4 py-2 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  currentScreen === 'shop' 
                    ? isUnicorn
                      ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_12px_rgba(192,132,252,0.35)]'
                      : 'bg-synth-orange border-synth-orange text-black shadow-[0_0_12px_#ff9f1c]'
                    : isUnicorn
                      ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80'
                      : 'bg-transparent border-synth-orange/50 text-synth-orange hover:bg-synth-orange/10'
                }`}
              >
                Item Shop
              </button>

              <button
                onClick={onOpenHang}
                className={`inline-flex items-center gap-2 px-4 py-2 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  currentScreen === 'hang'
                    ? isUnicorn
                      ? 'bg-gradient-to-r from-fuchsia-300 to-cyan-200 border-violet-200 text-violet-900 shadow-[0_0_12px_rgba(125,211,252,0.35)]'
                      : 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_12px_#00f0ff]'
                    : isUnicorn
                      ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80'
                      : 'bg-transparent border-synth-cyan/50 text-synth-cyan hover:bg-synth-cyan/10'
                }`}
              >
                <span>📚</span>
                <span className="hidden sm:inline">Hang Luyện Công</span>
              </button>
            </>
          )}

          {currentUser?.role === 'admin' && (
            <button 
              onClick={onOpenParent}
              className={`hidden sm:inline-flex px-4 py-2 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                currentScreen === 'parent' 
                  ? 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_12px_#ff007f]' 
                  : 'bg-transparent border-synth-magenta/50 text-synth-magenta hover:bg-synth-magenta/10'
              }`}
            >
              Admin Hub
            </button>
          )}

          {currentUser && (
            <button
              onClick={onOpenProfile}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'border-violet-200/40 bg-white/70 text-violet-700 hover:bg-white/90'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>
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
