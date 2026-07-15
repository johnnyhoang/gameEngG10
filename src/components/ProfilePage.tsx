import React, { useState } from 'react';
import { CheckCircle2, Palette, Sparkles } from 'lucide-react';
import { UI_THEMES, type UiThemeConfig } from '../theme/uiThemes';
import type { UiThemeId, UserProfile } from '../types/game';
import { useGameState, THEME_UNLOCK_COST } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG, GRADE_TIERS, getStudentRankForLevel, GRADE_SUBJECTS } from '../types/game';
import { getLessonGradeTier, getQuestionGradeTier, lessonInScope, questionInScope } from '../utils/learningScope';
import { toast } from '../utils/toast';
import { GiangHoCamNang } from './GiangHoCamNang';
import { ActivityLog } from './ActivityLog';
import { RubyConfirmModal } from './Common/RubyConfirmModal';

interface ProfilePageProps {
  currentUser: UserProfile;
  currentTheme: UiThemeId;
  onSelectTheme: (themeId: UiThemeId) => void;
}

const getThemeCardClass = (themeId: UiThemeId, isActive: boolean) => {
  const base = 'relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer';

  const variants: Record<UiThemeId, string> = {
    current: 'border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-fuchsia-500/10',
    'cute-pink-pastel': 'border-pink-200/50 bg-gradient-to-br from-pink-100 via-fuchsia-50 to-rose-100',
    'space-adventure': 'border-cyan-300/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-900/40',
    'fantasy-forest': 'border-emerald-200/40 bg-gradient-to-br from-lime-50 via-amber-50 to-green-100',
    'pixel-arcade': 'border-lime-300/40 bg-gradient-to-br from-slate-950 via-slate-900 to-green-900/40',
    'unicorn-dream': 'border-violet-200/60 bg-gradient-to-br from-fuchsia-50 via-white to-cyan-50'
  };

  return `${base} ${variants[themeId]} ${isActive ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-white/70 scale-[1.01]' : 'hover:-translate-y-1'}`;
};

const getTextToneClass = (themeId: UiThemeId) => {
  switch (themeId) {
    case 'cute-pink-pastel':
      return 'text-fuchsia-700';
    case 'space-adventure':
      return 'text-cyan-200';
    case 'fantasy-forest':
      return 'text-emerald-900';
    case 'pixel-arcade':
      return 'text-lime-300';
    case 'unicorn-dream':
      return 'text-violet-700';
    default:
      return 'text-cyan-200';
  }
};

const ThemePreview: React.FC<{ theme: UiThemeConfig }> = ({ theme }) => {
  const isUnicorn = theme.id === 'unicorn-dream';

  return (
    <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/50 px-4 py-3 backdrop-blur-sm">
      {isUnicorn && (
        <>
          <div className="unicorn-rainbow-strip absolute inset-x-0 top-0 h-1.5 opacity-90" />
          <div className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-fuchsia-200/40 blur-xl unicorn-cloud" />
          <div className="absolute -right-3 bottom-[-0.8rem] h-10 w-10 rounded-full bg-cyan-200/40 blur-xl unicorn-cloud" />
        </>
      )}

      <div className="flex items-center gap-3 min-w-0">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/80 text-lg shadow-sm">
          <span className={isUnicorn ? 'unicorn-twinkle' : ''}>{theme.iconSet[0]}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            {theme.shortName}
          </p>
          <p className="truncate text-sm font-bold text-slate-900">{theme.name}</p>
        </div>
      </div>
      {theme.recommended && (
        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
          Gợi ý
        </span>
      )}
    </div>
  );
};

import { isLightTheme } from '../theme/uiThemes';

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  currentTheme,
  onSelectTheme
}) => {
  const { activeSectId, setActiveSectId } = useSect();
  const player = useGameState(state => state.player);
  const buyTheme = useGameState(state => state.buyTheme);
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const setGradeTier = useGameState(state => state.setGradeTier);
  const lessons = useGameState(state => state.lessons);
  const questions = useGameState(state => state.questions);

  const [activeTab, setActiveTab] = useState<'identity' | 'themes' | 'logs'>('identity');
  const [isCamNangOpen, setIsCamNangOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    cost: number;
    actionDescription: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    cost: 0,
    actionDescription: '',
    onConfirm: () => {},
  });

  // States for Profile Renaming
  const renameProfile = useGameState(state => state.renameProfile);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(currentUser.name);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      toast.error('Tên gọi không được để trống.');
      return;
    }
    setIsRenaming(true);
    const ok = await renameProfile(tempName.trim());
    if (ok) {
      setIsEditingName(false);
    }
    setIsRenaming(false);
  };

  const activeTheme = UI_THEMES.find(theme => theme.id === currentTheme) || UI_THEMES[0];
  const isUnicorn = currentTheme === 'unicorn-dream';
  const isLight = isLightTheme(currentTheme);


  return (
    <div className="space-y-6">
      <div className={`relative overflow-hidden rounded-[2rem] border p-5 md:p-8 ${
        isLight ? 'border-violet-200/35 bg-white/40' : 'border-white/15 bg-slate-950/60'
      }`}>
        {isUnicorn && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-fuchsia-200/45 via-white/80 to-cyan-200/45" />
            <div className="absolute left-6 top-4 flex gap-2 text-xl opacity-70">
              <span className="unicorn-twinkle">✨</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.3s' }}>🦄</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.6s' }}>🌈</span>
            </div>
            <div className="absolute right-8 top-8 h-16 w-24 rounded-full bg-white/40 blur-2xl unicorn-cloud" />
          </div>
        )}

        <div className="relative z-10 mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-3xl border border-white/15 object-cover shadow-lg"
            />
            <div>
              <p className={`mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${
                isUnicorn
                  ? 'border-violet-200/40 bg-white/80 text-violet-700'
                  : 'border-white/10 bg-white/5 text-white/70'
              }`}>
                <Palette className={`h-3.5 w-3.5 ${isUnicorn ? 'text-fuchsia-500' : ''}`} />
                Học tịch hồ sơ
              </p>
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    className={`px-3 py-1 text-sm rounded border outline-none bg-white/10 ${
                      isUnicorn ? 'border-violet-300 text-violet-900' : 'border-white/20 text-white'
                    }`}
                    disabled={isRenaming}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={isRenaming}
                    className="px-3 py-1 rounded bg-synth-green text-black font-orbitron font-bold text-xs cursor-pointer hover:opacity-80"
                  >
                    {isRenaming ? '...' : 'Lưu'}
                  </button>
                  <button
                    onClick={() => { setIsEditingName(false); setTempName(currentUser.name); }}
                    className="px-3 py-1 rounded bg-white/10 text-xs text-white cursor-pointer hover:bg-white/20"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <h2 className={`text-2xl font-black md:text-3xl flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {currentUser.name}
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
                    title="Đổi tên gọi"
                  >
                    ✏️
                  </button>
                </h2>
              )}
              <p className={`mt-1 text-sm ${isUnicorn ? 'text-violet-700/75' : 'text-white/60'}`}>
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className={`relative z-10 grid gap-2 rounded-3xl border p-4 text-sm ${
            isUnicorn
              ? 'border-violet-200/40 bg-white/80 text-violet-700'
              : 'border-white/10 bg-white/5 text-white/75'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className={`h-4 w-4 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-cyan'}`} />
              <span className="font-semibold font-orbitron">Phong Cách Học Đường đang dùng</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{activeTheme.iconSet[0]}</span>
              <span className="font-bold text-white">{activeTheme.name}</span>
            </div>
            <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-white/55'}`}>{activeTheme.tagline}</p>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('identity')}
            className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-synth-magenta border border-synth-magenta text-black shadow-[0_0_8px_#ff007f]'
                : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            👑 Học Tích & Võ Học
          </button>
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'themes'
                ? 'bg-synth-magenta border border-synth-magenta text-black shadow-[0_0_8px_#ff007f]'
                : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            🎨 Cá Tính & Phong Cách Học Đường
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-synth-magenta border border-synth-magenta text-black shadow-[0_0_8px_#ff007f]'
                : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            📊 Dòng Hoạt Động
          </button>
        </div>


        {/* TAB 1: HỌC TÍCH & HỌC TẬP */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            {/* General Stats Header (Chỉ hiển thị cho Học Sinh) */}
            {currentUser.role === 'student' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Danh hiệu học tập</span>
                  <span className="font-orbitron font-black text-synth-cyan text-base">
                    {getStudentRankForLevel(player.level).icon} {getStudentRankForLevel(player.level).name}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Level {player.level}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Tích lũy điểm số</span>
                  <span className="font-orbitron font-black text-synth-magenta text-base">{player.xp} XP</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Ruby</span>
                  <span className="font-orbitron font-black text-synth-orange text-base">{player.ruby} Ruby</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Chuỗi học tập</span>
                  <span className="font-orbitron font-black text-synth-green text-base">{player.streak} Ngày</span>
                </div>
              </div>
            )}

            {/* Bậc Học (Grade Tier — CORE_SPECS §1.4). Đây là NƠI DUY NHẤT được đổi tầng. */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider font-orbitron text-slate-300">
                  🏫 Phân Lớp Học Tập
                </h4>
                <span className="text-[10px] text-slate-400">
                  Đang đứng: <span className="font-bold text-synth-cyan">{GRADE_TIERS.find(t => t.tier === activeGradeTier)?.name}</span>
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {GRADE_TIERS.filter(tierCfg =>
                  lessons.some(lesson => getLessonGradeTier(lesson) === tierCfg.tier)
                  || questions.some(question => getQuestionGradeTier(question) === tierCfg.tier)
                ).map(tierCfg => {
                  const isActive = tierCfg.tier === activeGradeTier;
                  return (
                    <button
                      key={tierCfg.tier}
                      onClick={() => setGradeTier(tierCfg.tier)}
                      title={tierCfg.description}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all ${
                        isActive
                          ? 'border-synth-cyan bg-synth-cyan/15 shadow-[0_0_10px_rgba(0,240,255,0.35)] cursor-default'
                          : 'border-white/10 bg-white/5 hover:border-synth-cyan/50 cursor-pointer'
                      }`}
                    >
                      <span className="text-lg leading-none">{tierCfg.icon}</span>
                      <span className={`text-[10px] font-bold font-orbitron ${isActive ? 'text-synth-cyan' : 'text-slate-400'}`}>
                        Lớp {tierCfg.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                Mỗi lớp là một ngữ cảnh nội dung độc lập. Danh sách chỉ hiển thị những lớp đã có dữ liệu.
              </p>
            </div>

            {/* Cẩm Nang Học Tập Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-amber-950/60 to-stone-900/60 p-4 rounded-2xl border border-amber-800/25 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <h4 className="text-sm font-bold text-amber-100 font-serif">Cẩm Nang Học Tập</h4>
                  <p className="text-xs text-slate-300 font-serif">Sổ tay tra cứu nội quy học tập, điều kiện thăng cấp và kinh nghiệm học viện.</p>
                </div>
              </div>
              <button
                onClick={() => setIsCamNangOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-amber-100 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-950/50 border border-amber-800/30 hover:scale-[1.02]"
              >
                MỞ CẨM NANG 📖
              </button>
            </div>

            {isCamNangOpen && (
              <GiangHoCamNang
                isOpen={isCamNangOpen}
                onClose={() => setIsCamNangOpen(false)}
              />
            )}

            {/* Nhật Ký Học Tập (Chỉ cho Học Sinh) */}
            {currentUser.role === 'student' && (
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Nhật Ký Học Tập</h4>
                    <p className="text-xs text-slate-400">Xem lại lịch sử hoạt động và rèn luyện của môn học đang chọn.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('logs')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-white/10 hover:scale-[1.02]"
                >
                  Xem Nhật Ký 📊
                </button>
              </div>

            )}

            {/* Subject Selection (Giao diện Card ngang Ngân Hàng Đề Thi) */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <h4 className="font-orbitron font-black text-sm text-white uppercase tracking-wider flex items-center justify-center gap-2">
                  📚 NGÂN HÀNG ĐỀ THI (KHO TRI THỨC & LUYỆN TẬP)
                </h4>
                <p className="text-[10px] text-slate-400">
                  Vui lòng lựa chọn Môn học để thiết lập bài ôn luyện và khảo sát.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
                {Object.values(SUBJECTS_CONFIG).filter(sub => {
                  const allowedSubjects = GRADE_SUBJECTS[activeGradeTier] || [];
                  return allowedSubjects.includes(sub.id) && (
                    lessons.some(lesson => lessonInScope(lesson, sub.id, activeGradeTier))
                    || questions.some(question => questionInScope(question, sub.id, activeGradeTier))
                  );
                }).map(sub => {
                  const isActive = activeSectId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveSectId(sub.id);
                        toast.success(`Đã chọn môn học ${sub.name}! 📚`);
                      }}
                      className={`rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer group shadow-lg flex items-center justify-between ${
                        isActive
                          ? 'border-synth-cyan bg-synth-cyan/15 shadow-[0_0_15px_rgba(0,240,255,0.2)] ring-1 ring-synth-cyan'
                          : 'border-white/5 bg-synth-gray/10 hover:border-white/10 hover:bg-synth-gray/20'
                      }`}
                      style={{ borderLeft: `4px solid ${sub.color}` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{sub.icon}</span>
                        <div>
                          <span className="block text-xs font-black uppercase font-orbitron text-white group-hover:text-synth-cyan transition-colors">
                            {sub.name}
                          </span>
                          <span className="block text-[10px] text-synth-text-muted mt-0.5">
                            Có nội dung cho Lớp {activeGradeTier}
                          </span>
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-synth-cyan text-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                          Đang chọn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CÀI ĐẶT THEME */}
        {activeTab === 'themes' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UI_THEMES.map(theme => {
              const isActive = theme.id === currentTheme;
              const toneClass = getTextToneClass(theme.id);
              const isUnicornTheme = theme.id === 'unicorn-dream';
              const isUnlocked = theme.id === 'current' || (player.unlockedThemes || ['current']).includes(theme.id);

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectTheme(theme.id);
                      return;
                    }
                    if (player.ruby < THEME_UNLOCK_COST) {
                      toast.error(`Không đủ Ruby. Cần ${THEME_UNLOCK_COST} Ruby để mở khóa Phong Cách Học Đường này.`);
                      return;
                    }
                    setConfirmModal({
                      isOpen: true,
                      cost: THEME_UNLOCK_COST,
                      actionDescription: `mở khóa Phong Cách Học Đường "${theme.name}"`,
                      onConfirm: () => {
                        const bought = buyTheme(theme.id);
                        if (bought) {
                          toast.success(`Đã mở khóa "${theme.name}" (-${THEME_UNLOCK_COST} Ruby)! Đang áp dụng...`);
                          onSelectTheme(theme.id);
                        }
                        setConfirmModal(prev => ({ ...prev, isOpen: false }));
                      }
                    });
                  }}
                  className={`${getThemeCardClass(theme.id, isActive)} ${!isUnlocked ? 'opacity-80' : ''}`}
                >
                  <div className={`absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                    isUnicornTheme ? 'bg-white/90 text-violet-700' : 'bg-white/85 text-slate-600'
                  }`}>
                    {theme.iconSet.join(' ')}
                  </div>

                  {isActive && (
                    <div className={`absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm ${
                      isUnicornTheme ? 'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400' : 'bg-emerald-500'
                    }`}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Đang dùng
                    </div>
                  )}

                  {!isActive && !isUnlocked && (
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm bg-slate-800/90">
                      🔒 {THEME_UNLOCK_COST} Ruby
                    </div>
                  )}

                  <div className="mt-10 space-y-3">
                    {isUnicornTheme && (
                      <div className="unicorn-rainbow-strip h-1.5 rounded-full opacity-90" />
                    )}
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-[0.28em] ${toneClass} opacity-80`}>
                        {theme.shortName}
                      </p>
                      <h3 className={`text-xl font-black ${theme.id === 'pixel-arcade' ? 'font-mono' : ''} ${theme.id === 'cute-pink-pastel' ? 'tracking-tight' : ''} ${toneClass}`}>
                        {theme.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-black/70">
                        {theme.description}
                      </p>
                    </div>

                    <div className={`space-y-2 rounded-2xl p-3 ${
                      isUnicornTheme ? 'bg-white/70 border border-violet-200/40' : 'bg-white/55'
                    }`}>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Phong cách</span>
                        <span className="text-right font-black text-black">{theme.mood}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Màu chủ đạo</span>
                        <span className="text-right font-black text-black">{theme.accentLabel}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Font</span>
                        <span className="text-right font-black text-black">{theme.fontLabel}</span>
                      </div>
                    </div>

                    <ThemePreview theme={theme} />

                    {isUnicornTheme && (
                      <div className="flex items-center justify-between rounded-2xl border border-violet-200/35 bg-white/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-700">
                        <span className="inline-flex items-center gap-1">
                          <span className="unicorn-twinkle">✨</span>
                          Magical cozy mode
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="unicorn-cloud">☁️</span>
                          Soft sparkles
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Todo card for future school themes and features */}
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-stone-700/50 bg-stone-900/10 p-5 flex flex-col justify-between text-left h-[260px]">
              <div>
                <div className="inline-block text-[9px] font-black bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider font-mono">
                  Đang thiết kế 🛠️
                </div>
                <h4 className="text-sm font-bold text-slate-200">Mở Rộng Cá Tính & Giao Diện</h4>
                <ul className="text-xs text-stone-400 space-y-2 mt-3 list-disc list-inside">
                  <li>🌅 **Giao diện Hoàng Hôn** (cam vàng - Đang nghiên cứu)</li>
                  <li>🌊 **Giao diện Thương Hải** (xanh đại dương - Đang nghiên cứu)</li>
                  <li>🥋 **Trang phục học sinh** (Cá nhân hóa nhân vật)</li>
                  <li>🧬 **Huy hiệu học tập** (Huy hiệu đồng hành)</li>
                </ul>
              </div>
              <p className="text-[10px] text-slate-500 italic">Hệ thống đang thiết kế thêm các giao diện bổ sung, bạn hãy đón chờ!</p>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <ActivityLog />
          </div>
        )}
      </div>
      <RubyConfirmModal
        isOpen={confirmModal.isOpen}
        cost={confirmModal.cost}
        actionDescription={confirmModal.actionDescription}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
