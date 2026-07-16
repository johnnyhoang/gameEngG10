import React, { useEffect } from 'react';
import { useTranslate } from '../hooks/useTranslate';
import { Zap, Coins, Flame, Shield, LogOut, ChevronDown } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';

import { getStudentRankForLevel, SUBJECTS_CONFIG, getGradeTierConfig } from '../types/game';
import { isLightTheme } from '../theme/uiThemes';

interface TopHUDProps {
  currentScreen: 'map' | 'arena' | 'play' | 'shop' | 'tutor' | 'pet' | 'logs' | 'practice' | 'profile';
  onOpenShop: () => void;
  onOpenParent: () => void;
  onOpenPet: () => void;
  onOpenProfile: () => void;
  onBackToMap: () => void;
  onLogout?: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  currentScreen, onOpenShop, onOpenParent: _onOpenParent, onOpenPet, onOpenProfile, onBackToMap, onLogout
}) => {
  const { t } = useTranslate();
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const logout = useGameState(state => state.logout);
  const showHelp = useGameState(state => state.showHelp);
  const tickEnergyRegen = useGameState(state => state.tickEnergyRegen);
  const uiTheme = useGameState(state => state.uiTheme);
  const classLinks = useGameState(state => state.classLinks);
  const tutorConsoleTab = useGameState(state => state.tutorConsoleTab);
  const setTutorConsoleTab = useGameState(state => state.setTutorConsoleTab);
  const currentSubject = useGameState(state => state.currentSubject);
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const activeSubjectConfig = SUBJECTS_CONFIG[currentSubject];

  const isUnicorn = isLightTheme(uiTheme);

  const isStudent = currentUser?.role === 'student';
  const isConsoleUser = !!currentUser && !isStudent;
  const isConnected = isStudent && classLinks.some(l => l.status === 'active');

  // Tick Năng Lượng đều đặn để mở khóa đúng giờ hồi mà không cần reload trang (SUB_SPEC_ENERGY §5).
  useEffect(() => {
    const id = setInterval(() => tickEnergyRegen(), 30000);
    return () => clearInterval(id);
  }, [tickEnergyRegen]);

  const isEnergyDepleted = player.energy === 0 && !!player.energyDepletedAt;
  const energyResetLabel = isEnergyDepleted
    ? new Date(player.energyDepletedAt! + (player.resetHours ?? 3) * 60 * 60 * 1000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : null;

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
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 w-full">
        {/* Logo */}
        <span
          onClick={onBackToMap}
          className={`font-orbitron text-xl font-black bg-gradient-to-r ${isUnicorn ? 'from-fuchsia-500 via-violet-500 to-cyan-400' : 'from-synth-cyan to-synth-magenta'} bg-clip-text text-transparent cursor-pointer hover:synth-glow-cyan transition-all duration-300 shrink-0`}
        >
          MIKAWAII
        </span>

        {/* ── Trên Desktop (>= md): Hiển thị 2 box riêng biệt như cũ ── */}
        <div className="hidden md:flex items-center gap-2.5 md:order-none">
          {/* Cụm 1: Thẻ định danh — avatar + tên + rank/vai trò + thanh EXP + Năng Lượng, gộp làm 1 box duy nhất */}
          <div className={`${groupBoxClass} w-full sm:w-auto`}>
            {currentUser && (
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-synth-cyan/40 cursor-pointer hover:border-synth-magenta transition-colors"
                  title={
                    isStudent
                      ? `${currentUser.name} (${currentUser.email}) - ${isConnected ? 'Đã kết nối Lớp Chủ nhiệm' : 'Chưa gia nhập Lớp Chủ nhiệm'} - Nhấp để Đổi Hồ Sơ Sĩ Tử`
                      : `${currentUser.name} (${currentUser.email}) - Nhấp để Đổi Hồ Sơ`
                  }
                  onClick={() => {
                    useGameState.setState({ currentUser: null });
                    localStorage.removeItem('ge10_selected_profile_id');
                  }}
                />
                {isStudent && (
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-950 ${
                      isConnected ? 'bg-synth-green' : 'bg-amber-500 animate-pulse'
                    }`}
                    title={isConnected ? 'Đã kết nối Lớp Chủ nhiệm 🎓' : 'Chưa kết nối Lớp Chủ nhiệm ⚠️'}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col min-w-0 gap-0.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] font-black text-white font-orbitron tracking-wide max-w-[90px] truncate">
                  {currentUser ? currentUser.name : 'Con yêu'}
                </span>
                {isStudent ? (
                  <span
                    onClick={() => showHelp('xp')}
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-purple/30 text-synth-cyan border border-synth-cyan/20 uppercase font-orbitron cursor-pointer hover:bg-synth-purple/50 shrink-0"
                    title={`Danh hiệu: ${getStudentRankForLevel(player.level).name} — Cấp độ ${player.level}. Nhấp để xem hướng dẫn.`}
                  >
                    {getStudentRankForLevel(player.level).icon} Lvl.{player.level}
                  </span>
                ) : (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-orbitron shrink-0 ${
                    currentUser?.role === 'truong_vien' ? 'bg-synth-magenta/30 text-synth-magenta border border-synth-magenta/20' :
                    currentUser?.role === 'pho_vien' ? 'bg-purple-500/30 text-purple-400 border border-purple-500/20' :
                    currentUser?.role === 'tutor' ? 'bg-synth-orange/30 text-synth-orange border border-synth-orange/20' :
                    'bg-pink-500/30 text-pink-400 border border-pink-500/20'
                  }`}>
                    {currentUser?.role === 'truong_vien' ? 'Viện Trưởng 👑' :
                     currentUser?.role === 'pho_vien' ? 'Phó Viện Trưởng 🛡️' :
                     currentUser?.role === 'tutor' ? 'Chủ Nhiệm Chính 📋' : 'Chủ Nhiệm Phụ 📋'}
                  </span>
                )}
              </div>
              {isStudent && (
                <div className="w-24 sm:w-28 h-1.5 bg-synth-gray rounded-full overflow-hidden border border-synth-cyan/10">
                  <div
                    className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple"
                    style={{ width: `${xpPercent}%` }}
                    title={`EXP ${player.xp}/${xpNeeded}`}
                  />
                </div>
              )}
            </div>

            {isStudent && (
              <>
                <div className="w-px h-8 bg-white/10 shrink-0" />
                <div
                  className={statItemClass}
                  onClick={() => showHelp('energy')}
                  title={isEnergyDepleted ? `Hết Năng Lượng — hồi đầy lúc ${energyResetLabel}` : 'Năng Lượng — Nhấp để xem hướng dẫn'}
                >
                  <Zap className={`w-4 h-4 shrink-0 ${isEnergyDepleted ? 'text-red-400 fill-red-400' : 'text-synth-cyan fill-synth-cyan animate-pulse'}`} />
                  <span className={`text-xs font-semibold font-orbitron whitespace-nowrap ${isEnergyDepleted ? 'text-red-400' : 'text-white'}`}>
                    {isEnergyDepleted ? `Hồi lúc ${energyResetLabel}` : `${player.energy}/${player.maxEnergy ?? 100}`}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Cụm 2: Dải tài nguyên — Môn học + Lớp (cho cả học sinh và giáo viên/viện chủ) */}
          {(isStudent || isConsoleUser) && (
            <div className={`${groupBoxClass} w-full sm:w-auto justify-between sm:justify-start overflow-x-auto`}>
              {/* Cửa đổi môn DUY NHẤT trên top nav — mở GlobalSectModal */}
              <button
                onClick={() => setSectModalOpen(true)}
                className={statItemClass}
                title={`Đang học: ${activeSubjectConfig?.name || currentSubject} — ${getGradeTierConfig(activeGradeTier).name}. Nhấp để chuyển môn.`}
              >
                <span className="text-sm leading-none shrink-0">{activeSubjectConfig?.icon || '📚'}</span>
                <span className="text-xs font-semibold font-orbitron whitespace-nowrap text-white max-w-[180px] truncate">
                  {activeSubjectConfig?.name || currentSubject} - {getGradeTierConfig(activeGradeTier).name}
                </span>
                <ChevronDown className="w-3 h-3 text-synth-cyan shrink-0" />
              </button>

              {isStudent && (
                <>
                  <div className="w-px h-8 bg-white/10 shrink-0" />

                  <div className={statItemClass} onClick={() => showHelp('nanite')} title={player.ruby < 0 ? 'Ruby đang ÂM — trả nợ bằng cách rèn luyện thêm!' : 'Ruby — Nhấp để xem hướng dẫn'}>
                    <Coins className={`w-4 h-4 shrink-0 ${player.ruby < 0 ? 'text-red-400 fill-red-400' : 'text-synth-orange fill-synth-orange'}`} />
                    <span className={`text-xs font-semibold font-orbitron whitespace-nowrap ${player.ruby < 0 ? 'text-red-400' : 'text-white'}`}>{player.ruby}</span>
                  </div>

                  <div className="w-px h-8 bg-white/10 shrink-0" />

                  <div className={statItemClass} onClick={() => showHelp('streak')} title="Chuỗi học tập — Nhấp để xem hướng dẫn">
                    <Flame className={`w-4 h-4 shrink-0 ${player.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-synth-gray'}`} />
                    <span className="text-xs font-semibold font-orbitron text-white whitespace-nowrap">{player.streak}d</span>
                    {hasShield && (
                      <span title="Thẻ Chuyên Cần đang bảo vệ Chuỗi học tập!">
                        <Shield className="w-3.5 h-3.5 text-synth-cyan fill-synth-cyan/20 shrink-0" />
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Trên Mobile (< md): Gộp Khối Định Danh & Khối Tài Nguyên vào 1 Box duy nhất ── */}
        <div className="flex md:hidden flex-col w-full gap-2 order-3">
          {isStudent && (
            <div className={`${groupBoxClass.replace('h-14', 'min-h-14 py-2 px-3')} flex-wrap justify-center w-full gap-y-2 gap-x-4`}>
              {/* Thẻ định danh: Avatar, Tên, Cấp độ, EXP */}
              <div className="flex items-center gap-2">
                {currentUser && (
                  <div className="relative shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full border border-synth-cyan/40 cursor-pointer hover:border-synth-magenta transition-colors"
                      title={currentUser.name}
                      onClick={() => {
                        useGameState.setState({ currentUser: null });
                        localStorage.removeItem('ge10_selected_profile_id');
                      }}
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-950 ${
                        isConnected ? 'bg-synth-green' : 'bg-amber-500 animate-pulse'
                      }`}
                    />
                  </div>
                )}
                <div className="flex flex-col min-w-0 gap-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] font-black text-white font-orbitron tracking-wide max-w-[90px] truncate">
                      {currentUser ? currentUser.name : 'Con yêu'}
                    </span>
                    <span
                      onClick={() => showHelp('xp')}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-synth-purple/30 text-synth-cyan border border-synth-cyan/20 uppercase font-orbitron cursor-pointer hover:bg-synth-purple/50 shrink-0"
                    >
                      {getStudentRankForLevel(player.level).icon} Lvl.{player.level}
                    </span>
                  </div>
                  <div className="w-20 sm:w-24 h-1.5 bg-synth-gray rounded-full overflow-hidden border border-synth-cyan/10">
                    <div
                      className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Năng Lượng */}
              <div
                className={statItemClass}
                onClick={() => showHelp('energy')}
                title={isEnergyDepleted ? `Hết Năng Lượng — hồi đầy lúc ${energyResetLabel}` : 'Năng Lượng'}
              >
                <Zap className={`w-4 h-4 shrink-0 ${isEnergyDepleted ? 'text-red-400 fill-red-400' : 'text-synth-cyan fill-synth-cyan animate-pulse'}`} />
                <span className={`text-xs font-semibold font-orbitron whitespace-nowrap ${isEnergyDepleted ? 'text-red-400' : 'text-white'}`}>
                  {isEnergyDepleted ? `Hồi lúc ${energyResetLabel}` : `${player.energy}/${player.maxEnergy ?? 100}`}
                </span>
              </div>

              {/* Môn Học - Lớp */}
              <button
                onClick={() => setSectModalOpen(true)}
                className={statItemClass}
                title={`Đang học: ${activeSubjectConfig?.name || currentSubject} — ${getGradeTierConfig(activeGradeTier).name}. Nhấp để chuyển môn.`}
              >
                <span className="text-sm leading-none shrink-0">{activeSubjectConfig?.icon || '📚'}</span>
                <span className="text-xs font-semibold font-orbitron whitespace-nowrap text-white max-w-[150px] truncate">
                  {activeSubjectConfig?.name || currentSubject} - {getGradeTierConfig(activeGradeTier).name}
                </span>
                <ChevronDown className="w-3 h-3 text-synth-cyan shrink-0" />
              </button>

              {/* Ruby */}
              <div className={statItemClass} onClick={() => showHelp('nanite')} title="Ruby">
                <Coins className={`w-4 h-4 shrink-0 ${player.ruby < 0 ? 'text-red-400 fill-red-400' : 'text-synth-orange fill-synth-orange'}`} />
                <span className={`text-xs font-semibold font-orbitron whitespace-nowrap ${player.ruby < 0 ? 'text-red-400' : 'text-white'}`}>{player.ruby}</span>
              </div>

              {/* Streak */}
              <div className={statItemClass} onClick={() => showHelp('streak')} title="Chuỗi học tập">
                <Flame className={`w-4 h-4 shrink-0 ${player.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-synth-gray'}`} />
                <span className="text-xs font-semibold font-orbitron text-white whitespace-nowrap">{player.streak}d</span>
                {hasShield && (
                  <span title="Thẻ Chuyên Cần đang bảo vệ Chuỗi học tập!">
                    <Shield className="w-3.5 h-3.5 text-synth-cyan fill-synth-cyan/20 shrink-0" />
                  </span>
                )}
              </div>
            </div>
          )}

          {isConsoleUser && (
            <div className={`${groupBoxClass.replace('h-14', 'min-h-14 py-2 px-3')} flex-wrap justify-center w-full gap-y-2 gap-x-4`}>
              {/* Avatar + Tên + Vai trò */}
              <div className="flex items-center gap-2">
                {currentUser && (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border border-synth-cyan/40 cursor-pointer hover:border-synth-magenta transition-colors"
                    onClick={() => {
                      useGameState.setState({ currentUser: null });
                      localStorage.removeItem('ge10_selected_profile_id');
                    }}
                  />
                )}
                <div className="flex flex-col min-w-0 gap-0.5">
                  <span className="text-[11px] font-black text-white font-orbitron tracking-wide max-w-[90px] truncate">
                    {currentUser ? currentUser.name : 'Ban quản trị'}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-orbitron shrink-0 ${
                    currentUser?.role === 'truong_vien' ? 'bg-synth-magenta/30 text-synth-magenta border border-synth-magenta/20' :
                    currentUser?.role === 'pho_vien' ? 'bg-purple-500/30 text-purple-400 border border-purple-500/20' :
                    currentUser?.role === 'tutor' ? 'bg-synth-orange/30 text-synth-orange border border-synth-orange/20' :
                    'bg-pink-500/30 text-pink-400 border border-pink-500/20'
                  }`}>
                    {currentUser?.role === 'truong_vien' ? 'Viện Trưởng 👑' :
                     currentUser?.role === 'pho_vien' ? 'Phó Viện Trưởng 🛡️' :
                     currentUser?.role === 'tutor' ? 'Chủ Nhiệm Chính 📋' : 'Chủ Nhiệm Phụ 📋'}
                  </span>
                </div>
              </div>

              {/* Môn Học - Lớp */}
              <button
                onClick={() => setSectModalOpen(true)}
                className={statItemClass}
                title={`Đang học: ${activeSubjectConfig?.name || currentSubject} — ${getGradeTierConfig(activeGradeTier).name}. Nhấp để chuyển môn.`}
              >
                <span className="text-sm leading-none shrink-0">{activeSubjectConfig?.icon || '📚'}</span>
                <span className="text-xs font-semibold font-orbitron whitespace-nowrap text-white max-w-[150px] truncate">
                  {activeSubjectConfig?.name || currentSubject} - {getGradeTierConfig(activeGradeTier).name}
                </span>
                <ChevronDown className="w-3 h-3 text-synth-cyan shrink-0" />
              </button>
            </div>
          )}
        </div>

        {/* Cụm 3: Điều hướng nhanh + Hồ Sơ Sĩ Tử + Thoái Ẩn */}
        <div className="flex items-center gap-2 order-2 md:order-none ml-auto">
          {isStudent && (
            <div className="hidden lg:flex items-center gap-2">
              {/* Bản đồ */}
              <button
                onClick={onBackToMap}
                title="Bản Đồ Học Tập"
                className={navBtnClass(
                  currentScreen === 'map',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_12px_#00f0ff]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-cyan/50 text-synth-cyan hover:bg-synth-cyan/10'
                )}
              >
                <span>🗺️</span>
                <span className="hidden lg:inline">Bản đồ</span>
              </button>

              {/* Bách Hóa */}
              <button
                onClick={onOpenShop}
                title="Cửa Hàng Quà Tặng"
                className={navBtnClass(
                  currentScreen === 'shop',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'bg-synth-orange border-synth-orange text-black shadow-[0_0_12px_#ff9f1c]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-orange/50 text-synth-orange hover:bg-synth-orange/10'
                )}
              >
                <span>🛒</span>
                <span className="hidden lg:inline">Cửa hàng</span>
              </button>

              {/* Sân Thú */}
              <button
                onClick={onOpenPet}
                title="Sân Thú Cưng"
                className={navBtnClass(
                  currentScreen === 'pet',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'bg-purple-500 border-purple-500 text-white shadow-[0_0_12px_#a855f7]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
                )}
              >
                <span>🐷</span>
                <span className="hidden lg:inline">Sân Thú</span>
              </button>

              {/* Học Tích */}
              <button
                onClick={onOpenProfile}
                title="Hồ Sơ Học Tập"
                className={navBtnClass(
                  currentScreen === 'profile',
                  isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_12px_#ff007f]',
                  isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-magenta/50 text-synth-magenta hover:bg-synth-magenta/10'
                )}
              >
                <span>👑</span>
                <span className="hidden lg:inline">Học tịch</span>
              </button>
            </div>
          )}

          {/* Nav chính Phòng Điều Hành cho Giáo viên / Ban Giám Hiệu — cùng vị trí với nav học sinh */}
          {isConsoleUser && currentScreen === 'tutor' && (
            <div className="hidden md:flex items-center gap-2">
              {([
                { tab: 'management', icon: '🏫', label: t('Hiệu Trưởng', 'Principal'), title: t('Phòng Giáo Viên / Phòng Hiệu Trưởng ✦ Trung tâm quản trị', 'Homeroom / Principal Office ✦ Admin Center') },
                { tab: 'lectures', icon: '📖', label: t('Bài Giảng', 'Lectures'), title: t('Phòng Quản Lý Knowledge ✦ Tàng Kinh Các', 'Knowledge Room ✦ Lecture Bank') },
                { tab: 'questions', icon: '📚', label: t('Đề Thi', 'Questions'), title: t('Ngân Hàng Đề Thi ✦ Văn Quyển Các', 'Question Bank ✦ Exam Vault') },
              ] as const).map(item => (
                <button
                  key={item.tab}
                  onClick={() => setTutorConsoleTab(item.tab)}
                  title={item.title}
                  className={navBtnClass(
                    tutorConsoleTab === item.tab,
                    isUnicorn ? 'bg-gradient-to-r from-fuchsia-400 to-cyan-300 border-violet-200 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_12px_#00f0ff]',
                    isUnicorn ? 'bg-white/50 border-violet-200/50 text-violet-700 hover:bg-white/80' : 'bg-transparent border-synth-cyan/50 text-synth-cyan hover:bg-synth-cyan/10'
                  )}
                >
                  <span>{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {currentUser && (
            <button
              onClick={onLogout || logout}
              className="w-10 h-10 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/15 cursor-pointer hover:synth-glow-red transition-all duration-300 flex items-center justify-center shrink-0"
              title="Đăng xuất"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
