import { isAdmin } from '../utils/roleHelpers';
import React from 'react';
import { Zap, Coins, Flame, Shield, LogOut } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG, getStudentRankForLevel } from '../types/game';
import type { SubjectId } from '../types/game';

interface TopHUDProps {
  currentScreen: 'map' | 'arena' | 'play' | 'shop' | 'parent' | 'pet' | 'logs' | 'hang';
  onOpenShop: () => void;
  onOpenParent: () => void;
  onOpenHang: () => void;
  onBackToMap: () => void;
  onLogout?: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  currentScreen, onOpenShop, onOpenParent, onOpenHang, onBackToMap, onLogout
}) => {
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const logout = useGameState(state => state.logout);
  const showHelp = useGameState(state => state.showHelp);
  const { activeSectId } = useSect();
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const uiTheme = useGameState(state => state.uiTheme);

  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as SubjectId];
  const isAdminUser = isAdmin(currentUser?.role);
  const isUnicorn = uiTheme === 'unicorn-dream';

  // Calculate percentage of XP to next level
  const xpNeeded = player.level * 200;
  const xpPercent = Math.min(100, (player.xp / xpNeeded) * 100);
  const hasShield = player.badges.includes('Streak Shield');

  const headerClass = isUnicorn
    ? 'glass-panel border-b border-violet-200/30 p-3 sticky top-0 z-40 bg-gradient-to-r from-fuchsia-50/80 via-white/90 to-cyan-50/80'
    : 'glass-panel border-b border-synth-cyan/20 p-3 sticky top-0 z-40';

  // 1 kiểu box dùng chung cho mọi cụm gộp (định danh, tài nguyên) — cùng chiều cao, cùng bo góc, tránh "cao thấp khác nhau"
  const groupBoxClass = isUnicorn
    ? 'flex items-center gap-3 px-3 h-14 rounded-xl bg-white/70 border border-violet-200/35 shadow-[0_8px_18px_rgba(192,132,252,0.12)]'
    : 'flex items-center gap-3 px-3 h-14 rounded-xl bg-synth-blue/40 border border-synth-cyan/20';

  const statItemClass = 'flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity';
  const navBtnClass = (active: boolean, activeStyle: string, idleStyle: string) =>
    `flex items-center gap-1.5 px-3 h-10 font-orbitron font-bold text-xs rounded-lg uppercase tracking-wider border cursor-pointer transition-all duration-300 ${active ? activeStyle : idleStyle}`;

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5">
        {/* Logo */}
        <span
          onClick={onBackToMap}
          className={`font-orbitron text-xl font-black bg-gradient-to-r ${isUnicorn ? 'from-fuchsia-500 via-violet-500 to-cyan-400' : 'from-synth-cyan to-synth-magenta'} bg-clip-text text-transparent cursor-pointer hover:synth-glow-cyan transition-all duration-300 shrink-0`}
        >
          MIKAWAII
        </span>

        {/* Cụm 1: Thẻ định danh — avatar + tên + rank/vai trò + thanh EXP + Chân Khí, gộp làm 1 box duy nhất */}
        <div className={`${groupBoxClass} order-1 md:order-none w-full sm:w-auto`}>
          {currentUser && (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-synth-cyan/40 shrink-0"
              title={`${currentUser.name} (${currentUser.email})`}
            />
          )}
          <div className="flex flex-col min-w-0 gap-0.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] font-black text-white font-orbitron tracking-wide max-w-[90px] truncate">
                {currentUser ? currentUser.name : 'Con yêu'}
              </span>
              {isAdminUser ? (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-magenta/30 text-synth-magenta border border-synth-magenta/20 uppercase font-orbitron shrink-0">
                  Viện Chủ 👑
                </span>
              ) : (
                <span
                  onClick={() => showHelp('xp')}
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-purple/30 text-synth-cyan border border-synth-cyan/20 uppercase font-orbitron cursor-pointer hover:bg-synth-purple/50 shrink-0"
                  title={`Danh hiệu: ${getStudentRankForLevel(player.level).name} — Cấp độ ${player.level}. Nhấp để xem hướng dẫn.`}
                >
                  {getStudentRankForLevel(player.level).icon} Lvl.{player.level}
                </span>
              )}
            </div>
            {!isAdminUser && (
              <div className="w-24 sm:w-28 h-1.5 bg-synth-gray rounded-full overflow-hidden border border-synth-cyan/10">
                <div
                  className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple"
                  style={{ width: `${xpPercent}%` }}
                  title={`EXP ${player.xp}/${xpNeeded}`}
                />
              </div>
            )}
          </div>

          {!isAdminUser && (
            <>
              <div className="w-px h-8 bg-white/10 shrink-0" />
              <div className={statItemClass} onClick={() => showHelp('energy')} title="Chân Khí — Nhấp để xem hướng dẫn">
                <Zap className="w-4 h-4 text-synth-cyan fill-synth-cyan animate-pulse shrink-0" />
                <span className="text-xs font-semibold font-orbitron text-white whitespace-nowrap">{player.energy}/1000</span>
              </div>
            </>
          )}
        </div>

        {/* Cụm 2: Dải tài nguyên — Ngân Lượng + Chuỗi (Tim sinh mệnh đã bị xóa khỏi hệ thống — CORE_SPECS §2.1) */}
        {!isAdminUser && (
          <div className={`${groupBoxClass} order-2 md:order-none w-full sm:w-auto justify-between sm:justify-start overflow-x-auto`}>
            <div className={statItemClass} onClick={() => showHelp('nanite')} title={player.coins < 0 ? 'Ngân Lượng đang ÂM — trả nợ bằng cách luyện tập thêm!' : 'Ngân Lượng (NP) — Nhấp để xem hướng dẫn'}>
              <Coins className={`w-4 h-4 shrink-0 ${player.coins < 0 ? 'text-red-400 fill-red-400' : 'text-synth-orange fill-synth-orange'}`} />
              <span className={`text-xs font-semibold font-orbitron whitespace-nowrap ${player.coins < 0 ? 'text-red-400' : 'text-white'}`}>{player.coins}</span>
            </div>

            <div className="w-px h-8 bg-white/10 shrink-0" />

            <div className={statItemClass} onClick={() => showHelp('streak')} title="Chuỗi luyện công — Nhấp để xem hướng dẫn">
              <Flame className={`w-4 h-4 shrink-0 ${player.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-synth-gray'}`} />
              <span className="text-xs font-semibold font-orbitron text-white whitespace-nowrap">{player.streak}d</span>
              {hasShield && (
                <span title="Hộ Tâm Phù đang bảo vệ Chuỗi!">
                  <Shield className="w-3.5 h-3.5 text-synth-cyan fill-synth-cyan/20 shrink-0" />
                </span>
              )}
            </div>
          </div>
        )}

        {/* Cụm 3: Điều hướng nhanh + Thân Phận (mang luôn badge môn phái, là nơi duy nhất đổi môn — CORE_SPECS §7.4) + Thoái Ẩn */}
        <div className="flex items-center gap-2 order-3 md:order-none ml-auto">
          {!isAdminUser && (
            <>
              <button
                onClick={onOpenShop}
                title="Bách Hóa Phường"
                className={navBtnClass(
                  currentScreen === 'shop',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900' : 'bg-synth-orange border-synth-orange text-black shadow-[0_0_12px_#ff9f1c]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-orange/50 text-synth-orange hover:bg-synth-orange/10'
                )}
              >
                <span>🏮</span>
                <span className="hidden lg:inline">Bách Hóa</span>
              </button>

              <button
                onClick={onOpenHang}
                title="Hang Luyện Công"
                className={navBtnClass(
                  currentScreen === 'hang',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-300 to-cyan-200 border-violet-200 text-violet-900' : 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_12px_#00f0ff]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-cyan/50 text-synth-cyan hover:bg-synth-cyan/10'
                )}
              >
                <span>📚</span>
                <span className="hidden lg:inline">Hang Luyện Công</span>
              </button>
            </>
          )}

          {isAdminUser && (
            <button
              onClick={onOpenParent}
              className={navBtnClass(
                currentScreen === 'parent',
                'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_12px_#ff007f]',
                'bg-transparent border-synth-magenta/50 text-synth-magenta hover:bg-synth-magenta/10'
              )}
            >
              <span>👑</span>
              <span className="hidden sm:inline">Bảng Viện Chủ</span>
            </button>
          )}

          {!isAdminUser && currentUser && (
            <button
              onClick={() => setSectModalOpen(true)}
              title={`Môn phái hiện tại: ${activeSubjectConfig?.name}. Bấm để đổi.`}
              className={`relative flex items-center gap-1.5 px-3 h-10 rounded-lg border font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn 
                  ? 'border-violet-200/40 bg-violet-50 text-violet-800 hover:bg-violet-100' 
                  : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan hover:bg-synth-cyan/20'
              }`}
            >
              <span className="text-sm">{activeSubjectConfig?.icon}</span>
              <span className="hidden md:inline">{activeSubjectConfig?.name}</span>
            </button>
          )}


          {currentUser && (
            <button
              onClick={onLogout || logout}
              className="w-10 h-10 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/15 cursor-pointer hover:synth-glow-red transition-all duration-300 flex items-center justify-center shrink-0"
              title="Thoái Ẩn Giang Hồ (Đăng xuất)"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
