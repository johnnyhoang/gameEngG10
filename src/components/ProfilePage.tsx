import React, { useState } from 'react';
import { CheckCircle2, Palette, Sparkles, Clock, Award, Shield } from 'lucide-react';
import { UI_THEMES, type UiThemeConfig } from '../theme/uiThemes';
import type { UiThemeId, UserProfile } from '../types/game';
import { useGameState, THEME_UNLOCK_COST } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG, GRADE_TIERS, getStudentRankForLevel } from '../types/game';
import { computeSubjectMasteryRatio, getMasteryRankByRatio, getMasteryRankByOrder } from '../utils/masteryRank';
import type { SubjectId } from '../types/game';
import { toast } from '../utils/toast';
import { GiangHoCamNang } from './GiangHoCamNang';
import { ActivityLog } from './ActivityLog';

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

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  currentTheme,
  onSelectTheme
}) => {
  // Load game state values internally
  const questions = useGameState(state => state.questions);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const { activeSectId, setActiveSectId } = useSect();
  const player = useGameState(state => state.player);
  const buyTheme = useGameState(state => state.buyTheme);
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const setGradeTier = useGameState(state => state.setGradeTier);

  const [activeTab, setActiveTab] = useState<'identity' | 'themes' | 'logs'>('identity');

  const [isCamNangOpen, setIsCamNangOpen] = useState(false);

  const activeTheme = UI_THEMES.find(theme => theme.id === currentTheme) || UI_THEMES[0];
  const isUnicorn = currentTheme === 'unicorn-dream';

  // Local helper for Subject Mastery calculations — công thức dùng chung với store (src/utils/masteryRank.ts)
  // để ratchet maxAchievedMasteryRank khớp đúng số hiển thị (Luật Một Bảng, CORE_SPECS §7.4).
  const getSubjectMastery = (subId: SubjectId) => {
    const ratio = computeSubjectMasteryRatio({
      subjectId: subId,
      questions,
      categoryStats,
      lessons,
      lessonsProgress
    });

    // Nội Công hiển thị (§7.4.3) — tổng câu đúng của môn, tách biệt khỏi công thức % tu luyện.
    const subjectCategories = Array.from(new Set(questions.filter(q => q.subject === subId).map(q => q.category)));
    const correctCount = subjectCategories.reduce((sum, cat) => sum + (categoryStats[cat]?.totalCorrect || 0), 0);

    // Luật Bất Thoái (CORE_SPECS §7.4.4): hiển thị đẳng cấp CAO NHẤT giữa tỉ lệ thực tế hiện tại
    // và đẳng cấp cao nhất từng đạt đã lưu — không bao giờ tụt hạng dù mẫu số tăng lên.
    const liveRank = getMasteryRankByRatio(ratio);
    const maxAchievedOrder = player.maxAchievedMasteryRank?.[subId] ?? 0;
    const displayRank = liveRank.order >= maxAchievedOrder ? liveRank : getMasteryRankByOrder(maxAchievedOrder);

    return {
      ratio,
      correctCount,
      percent: Math.min(100, Math.round(ratio * 100)),
      rankName: `${displayRank.icon} ${displayRank.name}`,
      rankColor: displayRank.colorClass
    };
  };

  return (
    <div className="space-y-6">
      <div className={`relative overflow-hidden rounded-[2rem] border p-5 md:p-8 ${
        isUnicorn ? 'border-violet-200/35 bg-white/40' : 'border-white/15 bg-slate-950/60'
      }`}>
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


        {/* TAB 1: THÂN PHẬN & VÕ HỌC */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            {/* General Stats Header (Chỉ hiển thị cho Học Sinh) */}
            {currentUser.role === 'student' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron">Danh hiệu tu học</span>
                  <span className="font-orbitron font-black text-synth-cyan text-base">
                    {getStudentRankForLevel(player.level).icon} {getStudentRankForLevel(player.level).name}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold">Level {player.level}</span>
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
            )}

            {/* Tầng Thế Giới (Grade Tier — CORE_SPECS §1.4). Đây là NƠI DUY NHẤT được đổi tầng. */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider font-orbitron text-slate-300">
                  🗼 Tầng Thế Giới Giang Hồ
                </h4>
                <span className="text-[10px] text-slate-400">
                  Đang đứng: <span className="font-bold text-synth-cyan">{GRADE_TIERS.find(t => t.tier === activeGradeTier)?.name}</span>
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {GRADE_TIERS.map(tierCfg => {
                  const isActive = tierCfg.tier === activeGradeTier;
                  const isLocked = tierCfg.status !== 'active';
                  return (
                    <button
                      key={tierCfg.tier}
                      onClick={() => !isLocked && setGradeTier(tierCfg.tier)}
                      disabled={isLocked}
                      title={isLocked ? `${tierCfg.name} — Sắp khai mở` : tierCfg.description}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all ${
                        isActive
                          ? 'border-synth-cyan bg-synth-cyan/15 shadow-[0_0_10px_rgba(0,240,255,0.35)] cursor-default'
                          : isLocked
                            ? 'border-white/5 bg-white/[0.02] opacity-45 cursor-not-allowed'
                            : 'border-white/10 bg-white/5 hover:border-synth-cyan/50 cursor-pointer'
                      }`}
                    >
                      <span className="text-lg leading-none">{isLocked ? '🔒' : tierCfg.icon}</span>
                      <span className={`text-[10px] font-bold font-orbitron ${isActive ? 'text-synth-cyan' : 'text-slate-400'}`}>
                        Lớp {tierCfg.tier}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                Mỗi tầng là một thế giới cô lập 100% (bản đồ, đấu trường, hang luyện công, cẩm nang...). Các tầng 🔒 sẽ khai mở sau.
              </p>
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

            {/* Nhật Ký Truyền Công (Chỉ cho Học Sinh) */}
            {currentUser.role === 'student' && (
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Nhật Ký Truyền Công</h4>
                    <p className="text-xs text-slate-400">Xem lại lịch sử hoạt động và tu luyện của môn phái đang mở.</p>
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

            {/* Subject Sects Grid */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Object.values(SUBJECTS_CONFIG).map(sub => {
                const stats = getSubjectMastery(sub.id);
                const isActive = activeSectId === sub.id;
                const timeTrained = Math.round(stats.correctCount * 1.5);
                const hours = Math.floor(timeTrained / 60);
                const minutes = timeTrained % 60;
                const timeStr = hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSectId(sub.id);
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

                    {/* Subject stats metrics & progress (Học Sinh) hoặc Description (Giáo viên/Admin) */}
                    {currentUser.role === 'student' ? (
                      <>
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
                      </>
                    ) : (
                      <div className="text-[11px] text-slate-400 mt-2 leading-relaxed flex-1 flex items-center">
                        Nhấp để tập trung quản lý lớp học, ngân hàng câu hỏi và nghiên cứu học liệu thuộc môn {sub.name}.
                      </div>
                    )}
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
                    // 🎭 Phong Vị (CORE_SPECS §2.4): mở khóa bằng NP tại chỗ, tự áp dụng ngay sau khi mua thành công.
                    const bought = buyTheme(theme.id);
                    if (bought) {
                      toast.success(`Đã mở khóa "${theme.name}" (-${THEME_UNLOCK_COST} NP)! Đang áp dụng...`);
                      onSelectTheme(theme.id);
                    } else {
                      toast.error(`Không đủ NP. Cần ${THEME_UNLOCK_COST} NP để mở khóa Phong Vị này.`);
                    }
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
                      🔒 {THEME_UNLOCK_COST} NP
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

        {activeTab === 'logs' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <ActivityLog />
          </div>
        )}
      </div>
    </div>
  );
};

