import React, { useState } from 'react';
import { CheckCircle2, Palette, Sparkles, X, Clock, Award, Shield } from 'lucide-react';
import { UI_THEMES, type UiThemeConfig } from '../theme/uiThemes';
import type { UiThemeId, UserProfile } from '../types/game';
import { useGameState, THEME_UNLOCK_COST } from '../hooks/useGameState';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import { toast } from '../utils/toast';
import { GiangHoCamNang } from './GiangHoCamNang';

interface ProfileThemeModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  currentTheme: UiThemeId;
  onClose: () => void;
  onSelectTheme: (themeId: UiThemeId) => void;
  onGoToScreen?: (screenName: 'map' | 'hang' | 'logs') => void;
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

export const ProfileThemeModal: React.FC<ProfileThemeModalProps> = ({
  isOpen,
  currentUser,
  currentTheme,
  onClose,
  onSelectTheme,
  onGoToScreen
}) => {
  if (!isOpen) return null;

  // Load game state values internally
  const questions = useGameState(state => state.questions);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const currentSubject = useGameState(state => state.currentSubject);
  const setSubject = useGameState(state => state.setSubject);
  const player = useGameState(state => state.player);
  const buyTheme = useGameState(state => state.buyTheme);

  const [activeTab, setActiveTab] = useState<'identity' | 'themes'>('identity');
  const [isCamNangOpen, setIsCamNangOpen] = useState(false);

  const activeTheme = UI_THEMES.find(theme => theme.id === currentTheme) || UI_THEMES[0];
  const isUnicorn = currentTheme === 'unicorn-dream';

  // Local helper for Subject Mastery calculations
  const getSubjectMastery = (subId: SubjectId) => {
    // Find all categories associated with this subject
    const subjectCategories = Array.from(new Set(questions.filter(q => q.subject === subId).map(q => q.category)));
    
    // Calculate correct questions count
    const correctCount = subjectCategories.reduce((sum, cat) => sum + (categoryStats[cat]?.totalCorrect || 0), 0);
    const totalQuestions = questions.filter(q => q.subject === subId).length;
    
    // Calculate lessons progress
    const totalLessons = lessons.filter(l => l.subject === subId).length;
    const completedLessons = lessons.filter(l => l.subject === subId && lessonsProgress[l.id]).length;
    
    // Ratio calculation: 50% lessons completed + 50% correct questions ratio
    const lessonRatio = totalLessons > 0 ? (completedLessons / totalLessons) : 0;
    const questionRatio = totalQuestions > 0 ? (correctCount / totalQuestions) : 0;
    const ratio = (lessonRatio * 0.5) + (questionRatio * 0.5);
    
    // Determine rank based on ratio
    let rankName = '🌱 Nhập Môn';
    let rankColor = 'text-slate-400';
    if (ratio >= 0.98) {
      rankName = '🏆 Xuất Chúng';
      rankColor = 'text-yellow-400 shadow-[0_0_8px_#facc15] font-black';
    } else if (ratio >= 0.85) {
      rankName = '⭐ Đại Thành';
      rankColor = 'text-cyan-400 font-bold';
    } else if (ratio >= 0.65) {
      rankName = '🔥 Tinh Thông';
      rankColor = 'text-orange-500 font-bold';
    } else if (ratio >= 0.40) {
      rankName = '⚔️ Tiểu Thành';
      rankColor = 'text-fuchsia-400 font-semibold';
    } else if (ratio >= 0.15) {
      rankName = '📜 Lĩnh Ngộ';
      rankColor = 'text-violet-400 font-semibold';
    }
    
    return {
      correctCount,
      totalQuestions,
      completedLessons,
      totalLessons,
      ratio,
      percent: Math.min(100, Math.round(ratio * 100)),
      rankName,
      rankColor
    };
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/95 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        {isUnicorn && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-fuchsia-200/45 via-white/80 to-cyan-200/45" />
            <div className="pointer-events-none absolute left-6 top-4 flex gap-2 text-xl opacity-70">
              <span className="unicorn-twinkle">✨</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.3s' }}>🦄</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.6s' }}>🌈</span>
            </div>
            <div className="pointer-events-none absolute right-8 top-8 h-16 w-24 rounded-full bg-white/40 blur-2xl unicorn-cloud" />
          </>
        )}

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border transition ${
            isUnicorn
              ? 'border-violet-200/40 bg-white/70 text-violet-700 hover:bg-white'
              : 'border-white/10 bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label="Đóng Thân Phận"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
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
                  Thân phận hồ sơ
                </p>
                <h2 className={`text-2xl font-black md:text-3xl ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {currentUser.name}
                </h2>
                <p className={`mt-1 text-sm ${isUnicorn ? 'text-violet-700/75' : 'text-white/60'}`}>
                  {currentUser.email}
                </p>
              </div>
            </div>

            <div className={`grid gap-2 rounded-3xl border p-4 text-sm ${
              isUnicorn
                ? 'border-violet-200/40 bg-white/80 text-violet-700'
                : 'border-white/10 bg-white/5 text-white/75'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-cyan'}`} />
                <span className="font-semibold font-orbitron">Phong Vị đang dùng</span>
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
              👑 Thân Phận & Võ Học
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'themes'
                  ? 'bg-synth-magenta border border-synth-magenta text-black shadow-[0_0_8px_#ff007f]'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              🎨 Cá Tính & Phong Vị
            </button>
          </div>

          {/* TAB 1: THÂN PHẬN & VÕ HỌC */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              {/* General Stats Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Cấp độ tu học</span>
                  <span className="font-orbitron font-black text-synth-cyan text-base">LV.{player.level}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Tích lũy Chân Lý</span>
                  <span className="font-orbitron font-black text-synth-magenta text-base">{player.xp} XP</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Ngân khoản Nanite</span>
                  <span className="font-orbitron font-black text-synth-orange text-base">{player.coins} NP</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Chuỗi luyện công</span>
                  <span className="font-orbitron font-black text-synth-green text-base">{player.streak} Ngày</span>
                </div>
              </div>

              {/* Cẩm Nang Bí Lục Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-amber-950/60 to-stone-900/60 p-4 rounded-2xl border border-amber-800/25 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📖</span>
                  <div>
                    <h4 className="text-sm font-bold text-amber-100 font-serif">Giang Hồ Cẩm Nang Bí Lục</h4>
                    <p className="text-xs text-slate-300 font-serif">Sổ tay tra cứu quy tắc võ học, điều kiện thăng cấp và kinh nghiệm giang hồ.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCamNangOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-amber-100 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-950/50 border border-amber-800/30 hover:scale-[1.02]"
                >
                  MỞ SÁCH LỤC 📜
                </button>
              </div>

              {isCamNangOpen && (
                <GiangHoCamNang
                  isOpen={isCamNangOpen}
                  onClose={() => setIsCamNangOpen(false)}
                />
              )}

              {/* Nhật Ký Truyền Công — không phải 1 trong 5 module chính (CORE_SPECS §2.1),
                  gói gọn lối vào tại đây thay vì chiếm 1 slot bottom-nav mobile. */}
              {onGoToScreen && (
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Nhật Ký Truyền Công</h4>
                      <p className="text-xs text-slate-400">Xem lại lịch sử hoạt động và tu luyện của môn phái đang mở.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onGoToScreen('logs')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-white/10 hover:scale-[1.02]"
                  >
                    Xem Nhật Ký 📊
                  </button>
                </div>
              )}

              {/* Subject Sects Grid */}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Object.values(SUBJECTS_CONFIG).map(sub => {
                  const stats = getSubjectMastery(sub.id);
                  const isActive = currentSubject === sub.id;
                  const timeTrained = Math.round(stats.correctCount * 1.5);
                  const hours = Math.floor(timeTrained / 60);
                  const minutes = timeTrained % 60;
                  const timeStr = hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSubject(sub.id);
                        toast.success(`Đã nhập môn phái ${sub.name}! ⚔️`);
                      }}
                      className={`relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between h-[210px] ${
                        isActive
                          ? 'border-synth-cyan bg-synth-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.15)] ring-1 ring-synth-cyan'
                          : 'border-white/5 bg-white/5'
                      }`}
                    >
                      {/* Subject icon & title */}
                      <div className="flex justify-between items-start w-full">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{sub.icon}</span>
                          <div>
                            <span className="block text-xs font-black uppercase font-orbitron text-white">
                              {sub.name}
                            </span>
                            <span className="block text-[8px] text-slate-400 uppercase font-semibold">
                              {sub.group === 'chuyen_sau' ? 'Môn Chuyên Sâu' : 'Môn Cơ Bản'}
                            </span>
                          </div>
                        </div>
                        {isActive && (
                          <span className="text-[8px] font-black uppercase tracking-wider bg-synth-cyan text-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                            Đang tu luyện
                          </span>
                        )}
                      </div>

                      {/* Subject stats metrics */}
                      <div className="space-y-2 text-[11px] text-slate-300 w-full mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-synth-orange" /> Đẳng Cấp:</span>
                          <span className={`font-black uppercase ${stats.rankColor}`}>{stats.rankName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold flex items-center gap-1"><Award className="w-3.5 h-3.5 text-synth-green" /> Nội Công:</span>
                          <span className="font-bold text-white">{stats.correctCount} thành tựu (Đúng)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 font-semibold flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-synth-cyan" /> Thời Gian:</span>
                          <span className="font-bold text-white">{timeStr}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1 w-full mt-2">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>Tu luyện hoàn thành</span>
                          <span>{stats.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${stats.percent}%`, 
                              backgroundColor: isActive ? sub.color : '#64748b' 
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CÀI ĐẶT THEME */}
          {activeTab === 'themes' && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {UI_THEMES.map(theme => {
                const isActive = theme.id === currentTheme;
                const toneClass = getTextToneClass(theme.id);
                const isUnicorn = theme.id === 'unicorn-dream';
                const isUnlocked = theme.id === 'current' || (player.unlockedThemes || ['current']).includes(theme.id);

                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectTheme(theme.id);
                        onClose();
                        return;
                      }
                      // 🎭 Phong Vị (CORE_SPECS §2.4): mở khóa bằng NP tại chỗ, tự áp dụng ngay sau khi mua thành công.
                      const bought = buyTheme(theme.id);
                      if (bought) {
                        toast.success(`Đã mở khóa "${theme.name}" (-${THEME_UNLOCK_COST} NP)! Đang áp dụng...`);
                        onSelectTheme(theme.id);
                        onClose();
                      } else {
                        toast.error(`Không đủ NP. Cần ${THEME_UNLOCK_COST} NP để mở khóa Phong Vị này.`);
                      }
                    }}
                    className={`${getThemeCardClass(theme.id, isActive)} ${!isUnlocked ? 'opacity-80' : ''}`}
                  >
                    <div className={`absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      isUnicorn ? 'bg-white/90 text-violet-700' : 'bg-white/85 text-slate-600'
                    }`}>
                      {theme.iconSet.join(' ')}
                    </div>

                    {isActive && (
                      <div className={`absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm ${
                        isUnicorn ? 'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400' : 'bg-emerald-500'
                      }`}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Đang dùng
                      </div>
                    )}

                    {!isActive && !isUnlocked && (
                      <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm bg-slate-800/90">
                        🔒 {THEME_UNLOCK_COST} NP
                      </div>
                    )}

                    <div className="mt-10 space-y-3">
                      {isUnicorn && (
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
                        isUnicorn ? 'bg-white/70 border border-violet-200/40' : 'bg-white/55'
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

                      {isUnicorn && (
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

              {/* Todo card for missing wuxia themes and features */}
              <div className="relative overflow-hidden rounded-3xl border border-dashed border-stone-700/50 bg-stone-900/10 p-5 flex flex-col justify-between text-left h-[260px]">
                <div>
                  <div className="inline-block text-[9px] font-black bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider font-mono">
                    Đang thiết kế 🛠️
                  </div>
                  <h4 className="text-sm font-bold text-amber-200 font-serif">Mở Rộng Cá Tính & Phong Vị</h4>
                  <ul className="text-xs text-stone-400 space-y-2 mt-3 list-disc list-inside font-serif">
                    <li>🌅 **Phong Vị Hoàng Hôn** (cam vàng - Đang nghiên cứu)</li>
                    <li>🌊 **Phong Vị Thương Hải** (xanh đại dương - Đang nghiên cứu)</li>
                    <li>🥋 **Trang phục môn phái** (Cá nhân hóa nhân vật)</li>
                    <li>🧬 **Thần binh & Tọa kỵ** (Vũ khí & Thú cưỡi đồng hành)</li>
                  </ul>
                </div>
                <p className="text-[10px] text-slate-500 italic font-serif">Hệ thống đang tinh luyện các phong vị bổ sung, thiếu hiệp hãy đón chờ!</p>
              </div>
            </div>
          )}

          {/* Action Gates to exit/navigate */}
          {onGoToScreen && (
            <div className={`mt-8 pt-5 border-t flex flex-col sm:flex-row gap-3 justify-end ${
              isUnicorn ? 'border-violet-200/35' : 'border-white/10'
            }`}>
              <button
                onClick={() => onGoToScreen('map')}
                className={`px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] border ${
                  isUnicorn
                    ? 'bg-white hover:bg-violet-50 border-violet-200/50 text-violet-700 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 border-white/10 text-white'
                }`}
              >
                🚪 Bôn Tẩu Giang Hồ
              </button>
              <button
                onClick={() => onGoToScreen('hang')}
                className={`px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] ${
                  isUnicorn
                    ? 'bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-900 shadow-md shadow-fuchsia-200/40 hover:brightness-105'
                    : 'bg-synth-magenta hover:bg-synth-magenta/90 text-black shadow-[0_0_15px_rgba(255,0,127,0.45)]'
                }`}
              >
                ⚔️ Vào Hang Luyện Công
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
