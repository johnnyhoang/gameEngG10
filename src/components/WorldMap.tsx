import { useMemo, useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { toast } from '../utils/toast';
import { INITIAL_LESSONS } from '../data/lessons';
import {
  Sword, Mountain, Palmtree, Store, PawPrint, BrainCircuit, ArrowRight,
  Flame, Zap, Star, Gift
} from 'lucide-react';
import { CORE_KNOWLEDGE_TOPICS, inferTopicId } from '../data/coreKnowledge';
import { getHamForPage } from '../utils/gatekeeper';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG } from '../types/game';
import { SearchSuggest } from './Common/SearchSuggest';
import { isLightTheme } from '../theme/uiThemes';

interface WorldMapProps {
  onOpenArena: () => void;
  onOpenHang: () => void;
  onOpenRelax: () => void;
  onOpenShop: () => void;
  onOpenPet: () => void;
  onOpenMysteryBox: () => void;
  onSpinWheel: () => void;
  onStudyLesson?: (lessonId: string) => void;
  onStartLessonPractice?: (lessonId: string) => void;
}

// Worldmap hub (CORE_SPECS §2.1): 5 module chính ngang hàng cho Môn Sinh —
// Đấu Trường, Hang Luyện Công, Sơn Trang Thư Giãn, Bách Hóa Phường, Sân Thú Nuôi.
export function WorldMap({
  onOpenArena, onOpenHang, onOpenRelax, onOpenShop, onOpenPet,
  onOpenMysteryBox, onSpinWheel, onStudyLesson, onStartLessonPractice
}: WorldMapProps) {
  const dailyMission = useGameState(state => state.dailyMission);
  const { activeSectId, setActiveSectId } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = isLightTheme(uiTheme);
  const syncWithServer = useGameState(state => state.syncWithServer);
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);

  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  const parentQuests = useGameState(state => state.parentQuests || []);
  const claimParentQuest = useGameState(state => state.claimParentQuest);
  
  const familyLinks = useGameState(state => state.familyLinks || []);
  const respondInvite = useGameState(state => state.respondInvite);
  const leaveFamily = useGameState(state => state.leaveFamily);
  const sendInvite = useGameState(state => state.sendInvite);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const daysUntilWeekend = () => {
    const day = new Date().getDay(); // 0=Sun, 6=Sat
    if (day === 0 || day === 6) return 0;
    return day <= 5 ? 6 - day : 1;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Chào buổi sáng';
    if (hour < 13) return 'Chào buổi trưa';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const subjectLessons = INITIAL_LESSONS.filter(l => l.subject === activeSectId);
  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;

  // Daily mission progress
  const isMissionComplete = dailyMission?.completed ?? false;

  const weakData = useMemo(() => {
    const subjectPageStates = Object.values(pageExplorationStates).filter(state => 
      state.pageId.startsWith(`hang-${activeSectId}-`)
    );

    const sortedPages = [...subjectPageStates].sort((a, b) => {
      const timeA = a.lastExploredAt ? new Date(a.lastExploredAt).getTime() : 0;
      const timeB = b.lastExploredAt ? new Date(b.lastExploredAt).getTime() : 0;
      return timeA - timeB;
    });

    const preferredHam = sortedPages.length > 0 ? getHamForPage(sortedPages[0].pageId) : null;
    const subjectTopics = CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === activeSectId);
    
    const topicAccuracies = subjectTopics.map(t => {
      const stat = categoryStats[t.id] || categoryStats[t.label];
      return {
        topic: t,
        accuracy: stat && stat.totalAnswered > 0 ? stat.totalCorrect / stat.totalAnswered : 1,
        totalAnswered: stat ? stat.totalAnswered : 0
      };
    });

    const highRelevance = topicAccuracies.filter(item => item.topic.examRelevance === 'high');

    const sortedRecs = [...highRelevance].sort((a, b) => {
      const inHamA = preferredHam && a.topic.hamNguyenTo === preferredHam ? 1 : 0;
      const inHamB = preferredHam && b.topic.hamNguyenTo === preferredHam ? 1 : 0;
      if (inHamA !== inHamB) return inHamB - inHamA;
      return a.accuracy - b.accuracy;
    });

    const weakTopicItem = sortedRecs.find(item => item.accuracy < 0.8);
    if (!weakTopicItem) return null;

    const matchingLesson = subjectLessons.find(l => inferTopicId(l.category, l.subject) === weakTopicItem.topic.id);
    if (!matchingLesson) return null;

    return { lesson: matchingLesson, accuracy: weakTopicItem.accuracy };
  }, [pageExplorationStates, categoryStats, activeSectId, subjectLessons]);

  const weakLesson = weakData?.lesson ?? null;
  const weakAccuracy = weakData?.accuracy ?? 0;

  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as keyof typeof SUBJECTS_CONFIG];

  return (
    <div className="space-y-5">

      {/* ─── SECTION 1: HERO GREETING ─── */}
      <section className={`glass-panel rounded-3xl border p-5 md:p-7 relative overflow-hidden ${
        isUnicorn
          ? 'border-violet-200/35 bg-gradient-to-br from-fuchsia-50/80 via-white/70 to-cyan-50/80'
          : 'border-synth-cyan/20 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.07),transparent_50%)]'
      }`}>
        {/* Decorative orb */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-synth-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-synth-magenta/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
          <div className="space-y-3">
            {/* Greeting + Name */}
            <div className="space-y-1">
              <p className={`text-xs font-orbitron font-bold uppercase tracking-[0.2em] ${isUnicorn ? 'text-violet-500' : 'text-synth-cyan/70'}`}>
                {getGreeting()}, Đệ tử
              </p>
              <h1 className={`font-orbitron font-black text-2xl md:text-3xl uppercase tracking-wide ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>
                {currentUser?.name || 'Vô Danh Đệ Tử'} 👋
              </h1>
            </div>

            {/* Stats row: Streak + Level + Subject */}
            <div className="flex flex-wrap items-center gap-3">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                player.streak > 0
                  ? (isUnicorn ? 'border-orange-300 bg-orange-50 text-orange-700' : 'border-orange-500/40 bg-orange-500/10 text-orange-400')
                  : (isUnicorn ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-white/10 bg-white/5 text-slate-500')
              }`}>
                <Flame className={`w-3.5 h-3.5 ${player.streak > 0 ? 'fill-current' : ''}`} />
                {player.streak > 0 ? `${player.streak} ngày liên tiếp 🔥` : 'Bắt đầu chuỗi hôm nay!'}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                isUnicorn ? 'border-violet-200 bg-violet-50 text-violet-700' : 'border-synth-purple/40 bg-synth-purple/10 text-synth-purple'
              }`}>
                <Star className="w-3.5 h-3.5" />
                Cấp {player.level}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                isUnicorn ? 'border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan'
              }`}>
                <span>{activeSubjectConfig?.icon}</span>
                Môn: {activeSubjectConfig?.name}
              </div>
            </div>
          </div>

          {/* XP + Energy mini stats */}
          <div className={`shrink-0 rounded-2xl border p-4 space-y-3 min-w-[160px] ${
            isUnicorn ? 'border-violet-200/40 bg-white/60' : 'border-white/10 bg-black/30'
          }`}>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-orbitron font-bold uppercase">
                <span className={isUnicorn ? 'text-violet-600' : 'text-slate-400'}>EXP</span>
                <span className={isUnicorn ? 'text-violet-800' : 'text-white'}>{player.xp}/{player.level * 200}</span>
              </div>
              <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple rounded-full transition-all"
                  style={{ width: `${Math.min(100, (player.xp / (player.level * 200)) * 100)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] font-orbitron font-bold uppercase">
              <div className="flex items-center gap-1 text-synth-cyan">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{player.energy}/{player.maxEnergy ?? 100}</span>
              </div>
              <div className="flex items-center gap-1 text-synth-orange">
                <span>🪙</span>
                <span>{player.coins} NP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: DAILY MISSION + WEEKEND TEASER (side by side) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">

        {/* Daily Mission */}
        <section className={`glass-panel rounded-2xl border p-5 ${
          isMissionComplete
            ? (isUnicorn ? 'border-emerald-300/50 bg-emerald-50/60' : 'border-emerald-500/30 bg-emerald-500/5')
            : (isUnicorn ? 'border-violet-200/35 bg-white/50' : 'border-synth-magenta/25 bg-gradient-to-r from-synth-magenta/8 via-synth-purple/5 to-transparent')
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isMissionComplete ? 'bg-emerald-400' : 'bg-synth-magenta animate-ping'}`} />
                <h2 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  📋 Bảng Cáo Thị (Daily Quest)
                </h2>
              </div>

              {dailyMission ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {dailyMission.requirements.map((req, idx) => {
                    const reqPct = Math.min(100, Math.round((req.current / req.target) * 100));
                    return (
                      <div key={idx} className={`rounded-xl p-3 text-[11px] flex flex-col justify-between ${
                        isUnicorn ? 'bg-white/70 border border-violet-200/25' : 'bg-synth-gray/20 border border-white/5'
                      }`}>
                        <div className={`flex justify-between items-start gap-1 font-semibold mb-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                          <span className="leading-snug">{req.description}</span>
                          <span className="font-orbitron whitespace-nowrap shrink-0">{req.current}/{req.target}</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isUnicorn ? 'bg-violet-100' : 'bg-black/30'}`}>
                          <div 
                            className={`h-full transition-all duration-500 rounded-full ${
                              req.completed ? (isUnicorn ? 'unicorn-rainbow-strip' : 'bg-synth-green') : (isUnicorn ? 'bg-violet-300' : 'bg-synth-orange')
                            }`}
                            style={{ width: `${reqPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className={`text-[11px] leading-relaxed ${isUnicorn ? 'text-violet-600/80' : 'text-slate-400'}`}>
                  Chưa nhận được nhiệm vụ hôm nay. Vào ải/đấu trường để nhận nhiệm vụ!
                </p>
              )}

              {dailyMission && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] mt-2 pt-2 border-t border-white/5">
                  <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>
                    {isMissionComplete
                      ? '✅ Đã hoàn thành tất cả mục tiêu! Hòm Bí Mật đã sẵn sàng.'
                      : 'Hoàn thành mọi chỉ tiêu bên trên để mở khóa Hòm Bí Mật.'}
                  </span>
                  <span className={`font-orbitron font-bold px-2 py-0.5 rounded ${
                    isUnicorn ? 'bg-violet-100 text-violet-800' : 'bg-synth-magenta/25 text-synth-magenta'
                  }`}>
                    Thưởng: +{dailyMission.rewardXP} XP
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              {isMissionComplete ? (
                <button
                  onClick={onOpenMysteryBox}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all animate-bounce shadow-[0_0_18px_rgba(52,211,153,0.45)] ${
                    isUnicorn
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  Mở Hòm Bí Mật
                </button>
              ) : (
                <button
                  onClick={onOpenArena}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all hover:scale-[1.02] shadow-[0_0_16px_rgba(255,0,127,0.3)] ${
                    isUnicorn
                      ? 'bg-gradient-to-r from-fuchsia-400 to-violet-400 text-white'
                      : 'bg-gradient-to-r from-synth-magenta to-synth-purple text-white'
                  }`}
                >
                  <Sword className="w-4 h-4" />
                  Chiến ngay ⚡
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Weekend Spin Wheel teaser — always visible */}
        <section
          onClick={isWeekend() ? onSpinWheel : undefined}
          className={`glass-panel rounded-2xl border p-5 flex flex-col items-center justify-center gap-2 text-center min-w-[140px] transition-all ${
            isWeekend()
              ? 'cursor-pointer hover:scale-[1.02] border-synth-orange/50 bg-synth-orange/10 shadow-[0_0_18px_rgba(255,159,28,0.2)]'
              : (isUnicorn ? 'border-violet-100 bg-slate-50/50' : 'border-white/8 bg-white/[0.02]')
          }`}
        >
          <span className={`text-3xl ${isWeekend() ? 'animate-spin-slow' : 'opacity-40 grayscale'}`}>🎡</span>
          <div className="space-y-0.5">
            <p className={`font-orbitron font-black text-[10px] uppercase tracking-wider ${
              isWeekend() ? 'text-synth-orange' : (isUnicorn ? 'text-slate-400' : 'text-slate-500')
            }`}>
              {isWeekend() ? 'Vòng Quay Mở!' : 'Vòng Quay'}
            </p>
            <p className={`text-[9px] ${isUnicorn ? 'text-slate-400' : 'text-slate-600'}`}>
              {isWeekend() ? 'Bấm để quay ngay 🎁' : `Còn ${daysUntilWeekend()} ngày nữa`}
            </p>
          </div>
          {isWeekend() && (
            <span className="text-[8px] font-bold text-synth-orange bg-synth-orange/10 border border-synth-orange/30 px-2 py-0.5 rounded-full font-orbitron uppercase">
              Cuối Tuần
            </span>
          )}
        </section>
      </div>

      {/* ─── SECTION 3: AI SƯ PHỤ (chỉ hiện khi có điểm yếu) ─── */}
      {weakLesson && (
        <section className="glass-panel rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-transparent p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-orbitron font-bold text-xs uppercase text-amber-300 tracking-wider">Tàng Kinh Các · AI Sư Phụ</span>
          </div>
          <p className="text-xs text-slate-300 flex-1 leading-relaxed">
            Con đang yếu ở chuyên đề <span className="text-amber-300 font-bold">{weakLesson.title}</span> (chỉ{' '}
            {Math.round(weakAccuracy * 100)}% chính xác). Ôn lại ngay, đừng để lỗ hổng phình ra.
          </p>
          <div className="flex gap-2 shrink-0">
            {onStudyLesson && (
              <button
                onClick={() => onStudyLesson(weakLesson.id)}
                className="px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-400/20 transition-colors cursor-pointer"
              >
                Xem bí kíp 📖
              </button>
            )}
            {onStartLessonPractice && (
              <button
                onClick={() => onStartLessonPractice(weakLesson.id)}
                className="px-3 py-2 rounded-lg bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Vào ải ⚔️
              </button>
            )}
          </div>
        </section>
      )}

      {/* ─── SECTION 4: PARENT QUESTS (nếu có) ─── */}
      {parentQuests.filter((q: any) => q.status !== 'claimed').length > 0 && (
        <section className="glass-panel rounded-2xl border border-synth-magenta/30 bg-black/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-magenta">
              Nhiệm Vụ Chủ Nhiệm Giao
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {parentQuests.filter((q: any) => q.status !== 'claimed').map((quest: any) => (
              <div
                key={quest.id}
                className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex justify-between items-center gap-4 transition-all hover:bg-white/10"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white leading-snug">{quest.title}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-orbitron uppercase ${
                      quest.status === 'completed'
                        ? 'bg-synth-green/10 border border-synth-green/20 text-synth-green'
                        : 'bg-white/5 border border-white/10 text-slate-400'
                    }`}>
                      {quest.status === 'completed' ? 'Xong (Chờ nhận)' : 'Đang làm'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{quest.description}</p>
                  <div className="flex gap-3 text-[9px] font-bold font-orbitron text-synth-cyan">
                    <span>🎁 +{quest.rewardNP} NP</span>
                  </div>
                </div>
                {quest.status === 'completed' && (
                  <button
                    onClick={() => {
                      claimParentQuest(quest.id);
                      toast.success(`Nhận thưởng thành công: +${quest.rewardNP} NP! 🥳`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-synth-magenta text-white font-orbitron font-bold text-[9px] uppercase tracking-wider cursor-pointer hover:synth-glow-magenta shadow-md"
                  >
                    Nhận Quà 🎁
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── SECTION 5: KHU HỌC LUYỆN — 3 card to + 2 card nhỏ ─── */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className={`font-orbitron font-black text-base uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              🗺️ Bản Đồ Học Viện
            </h2>
            <p className={`text-[11px] mt-0.5 ${isUnicorn ? 'text-violet-500' : 'text-slate-400'}`}>
              Chọn khu vực để bắt đầu — {completedLessons}/{subjectLessons.length} chuyên đề đã lĩnh ngộ môn {activeSubjectConfig?.name}
            </p>
          </div>
          {/* Quick Sect Switcher */}
          <div className="flex flex-wrap gap-2">
            {Object.values(SUBJECTS_CONFIG).map(s => {
              const active = s.id === activeSectId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSectId(s.id)}
                  style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.05)' }}
                  className={`px-3 py-1.5 rounded-lg border font-orbitron font-bold text-[9px] uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                    active
                      ? 'bg-white/10 text-white shadow-[0_0_8px_rgba(255,255,255,0.05)]'
                      : 'bg-black/20 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {s.icon} {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 primary study zone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Đấu Trường — PRIMARY, nổi nhất */}
          <button
            onClick={onOpenArena}
            className="glass-panel glass-panel-hover rounded-2xl border border-synth-magenta/30 bg-gradient-to-br from-synth-magenta/15 via-synth-purple/10 to-transparent p-5 flex flex-col justify-between gap-4 text-left cursor-pointer transition-all duration-300 hover:border-synth-magenta/50 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-synth-magenta/30 bg-synth-magenta/10 flex items-center justify-center text-synth-magenta">
                  <Sword className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[8px] font-bold font-orbitron uppercase tracking-wider text-synth-magenta bg-synth-magenta/10 border border-synth-magenta/20 px-2 py-0.5 rounded-full">
                    Luyện thi chính
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">⚡ Đấu Trường</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  4 ải chiến đấu: <strong className="text-synth-magenta">Mixed</strong>, <strong className="text-synth-purple">Sinh Tồn</strong>, <strong className="text-synth-cyan">Boss</strong> và <strong className="text-synth-orange">Truy Tìm Lỗi Sai</strong>. Luyện phản xạ thi cử như thật.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-synth-magenta group-hover:gap-3 transition-all">
              Vào Đấu Trường <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Hang Luyện Công */}
          <button
            onClick={onOpenHang}
            className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/25 bg-gradient-to-br from-synth-cyan/12 via-synth-purple/8 to-transparent p-5 flex flex-col justify-between gap-4 text-left cursor-pointer transition-all duration-300 hover:border-synth-cyan/45 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)] group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center text-synth-cyan">
                  <Mountain className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-bold font-orbitron uppercase tracking-wider text-synth-cyan bg-synth-cyan/10 border border-synth-cyan/20 px-2 py-0.5 rounded-full">
                  {completedLessons}/{subjectLessons.length} lĩnh ngộ
                </span>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">📚 Hang Luyện Công</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Tự học theo chuyên đề, sổ tay lỗi sai và Mật Thất tương tác 3D. Nắm lý thuyết trước, chiến sau.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-synth-cyan group-hover:gap-3 transition-all">
              Vào Hang Luyện <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Sơn Trang */}
          <button
            onClick={onOpenRelax}
            className="glass-panel glass-panel-hover rounded-2xl border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-400/12 via-synth-purple/8 to-transparent p-5 flex flex-col justify-between gap-4 text-left cursor-pointer transition-all duration-300 hover:border-fuchsia-400/45 hover:shadow-[0_0_20px_rgba(192,132,252,0.12)] group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 flex items-center justify-center text-fuchsia-300">
                  <Palmtree className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-bold font-orbitron uppercase tracking-wider text-fuchsia-300 bg-fuchsia-400/10 border border-fuchsia-400/20 px-2 py-0.5 rounded-full">
                  Thư giãn
                </span>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">🦄 Sơn Trang</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Minigame nhẹ nhàng: ghép cặp từ vựng, sơ đồ tư duy, học qua cốt truyện kể chuyện.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fuchsia-300 group-hover:gap-3 transition-all">
              Ghé Sơn Trang <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* 2 secondary utility cards — nhỏ hơn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onOpenShop}
            className="glass-panel glass-panel-hover rounded-xl border border-synth-orange/20 bg-gradient-to-r from-synth-orange/8 to-transparent p-4 flex items-center gap-4 text-left cursor-pointer transition-all hover:border-synth-orange/35 group"
          >
            <div className="w-10 h-10 rounded-xl border border-synth-orange/30 bg-synth-orange/10 flex items-center justify-center text-synth-orange shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-orbitron font-black text-xs text-white uppercase tracking-wide">🏮 Bách Hóa Phường</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Đổi NP lấy vật phẩm, Hộ Tâm Phù và Phúc Lợi Lớp Học.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-synth-orange/50 group-hover:text-synth-orange shrink-0 transition-colors" />
          </button>

          <button
            onClick={onOpenPet}
            className="glass-panel glass-panel-hover rounded-xl border border-emerald-400/20 bg-gradient-to-r from-emerald-400/8 to-transparent p-4 flex items-center gap-4 text-left cursor-pointer transition-all hover:border-emerald-400/35 group"
          >
            <div className="w-10 h-10 rounded-xl border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center text-emerald-300 shrink-0">
              <PawPrint className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-orbitron font-black text-xs text-white uppercase tracking-wide">🐷 Sân Thú Nuôi</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Chăm sóc Heo Maikawaii, xem hành trình tiến hóa.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400/50 group-hover:text-emerald-400 shrink-0 transition-colors" />
          </button>
        </div>
      </div>

      {/* ─── SECTION 6: SOCIAL — Lời mời kết nối + Gia đình ─── */}
      {familyLinks.filter(l => l.status === 'pending_student').length > 0 && (
        <section className="glass-panel rounded-2xl border border-synth-magenta/50 bg-gradient-to-r from-synth-magenta/20 to-transparent p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">👨‍👩‍👧</span>
            <h3 className="font-orbitron font-bold text-xs uppercase tracking-wider text-synth-magenta">
              Lời Mời Kết Nối Gia Đình
            </h3>
          </div>
          <div className="space-y-2">
            {familyLinks.filter(l => l.status === 'pending_student').map((link: any) => (
              <div key={link.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-xl border border-white/10 bg-black/40 gap-3">
                <div className="space-y-1 text-sm">
                  <p className="text-white">Chủ nhiệm <strong className="text-synth-cyan">{link.parent_name || 'Chưa có tên'}</strong> muốn kết nối với bạn.</p>
                  <p className="text-xs text-slate-400">Email: {link.parent_email || 'Chưa cập nhật'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      const success = await respondInvite(link.id, true);
                      if (success) toast.success('Đã đồng ý kết nối!');
                    }}
                    className="px-4 py-2 bg-synth-cyan text-black font-bold text-xs uppercase rounded cursor-pointer hover:bg-synth-cyan/80"
                  >
                    Đồng Ý
                  </button>
                  <button
                    onClick={async () => {
                      const success = await respondInvite(link.id, false);
                      if (success) toast.success('Đã từ chối kết nối');
                    }}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-white font-bold text-xs uppercase rounded cursor-pointer hover:bg-white/20"
                  >
                    Từ Chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {familyLinks.filter(l => l.status === 'active').length > 0 ? (
        <section className="glass-panel rounded-2xl border border-synth-cyan/30 bg-synth-cyan/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div className="space-y-0.5">
              <p className="font-orbitron font-bold text-xs uppercase text-synth-cyan tracking-wider">Gia Đình Liên Kết</p>
              {familyLinks.filter(l => l.status === 'active').map((link: any) => (
                <p key={link.id} className="text-xs text-slate-300">
                  {link.parent_id ? `Chủ nhiệm: ${link.parent_name || link.parent_email || 'Giáo viên'}` : `Học sinh: ${link.student_name || link.student_email || 'Học sinh'}`}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {familyLinks.filter(l => l.status === 'active').map((link: any) => (
              <button
                key={link.id}
                onClick={async () => {
                  if (window.confirm('Bạn có chắc muốn rời khỏi gia đình này không?')) {
                    const success = await leaveFamily(link.id);
                    if (success) toast.success('Đã rời gia đình');
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors"
              >
                Rời Chủ Nhiệm
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="glass-panel rounded-2xl border border-synth-cyan/30 bg-synth-cyan/5 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div className="space-y-0.5">
              <h3 className="font-orbitron font-bold text-xs uppercase text-synth-cyan tracking-wider">
                Kết Nối Lớp Chủ Nhiệm
              </h3>
              <p className="text-[11px] text-slate-300">
                Bạn chưa kết nối với Chủ Nhiệm (Thầy/Cô). Nhập Email Google của Thầy/Cô để xin gia nhập lớp.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 max-w-lg">
            <SearchSuggest
              placeholder="Tìm Thầy/Cô theo tên/email..."
              roleFilter="parent"
              value={inviteEmail}
              onChange={setInviteEmail}
              onSelect={user => setInviteEmail(user.email)}
              className="flex-1"
            />
            <button
              onClick={async () => {
                if (!inviteEmail.trim()) return;
                setIsInviting(true);
                const result = await sendInvite(inviteEmail.trim());
                if (result.success) {
                  toast.success('Đã gửi yêu cầu kết nối thành công! Vui lòng chờ Thầy/Cô phê duyệt.');
                  setInviteEmail('');
                } else {
                  toast.error(result.error || 'Gửi yêu cầu thất bại.');
                }
                setIsInviting(false);
              }}
              disabled={isInviting || !inviteEmail.trim()}
              className="px-4 py-2 bg-synth-cyan text-black font-bold rounded-lg hover:bg-synth-cyan/80 disabled:opacity-50 transition-colors uppercase text-[10px] cursor-pointer"
            >
              {isInviting ? 'Đang gửi...' : 'Xin Kết Nối'}
            </button>
          </div>
          {familyLinks.filter(l => l.status === 'pending_parent' && l.student_id === currentUser?.id).length > 0 && (
            <div className="pt-3 border-t border-white/10 space-y-2">
              <h4 className="font-orbitron font-bold text-[10px] text-synth-text-muted uppercase tracking-wider">
                Yêu cầu kết nối đang chờ duyệt
              </h4>
              <div className="space-y-1.5">
                {familyLinks.filter(l => l.status === 'pending_parent' && l.student_id === currentUser?.id).map((link: any) => (
                  <div key={link.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 text-xs">
                    <span className="text-slate-300">Gửi tới Thầy/Cô: <strong className="text-synth-orange">{link.parent_name || link.parent_email || 'Giáo viên'}</strong></span>
                    <button
                      onClick={async () => {
                        if (window.confirm('Bạn có chắc muốn hủy yêu cầu kết nối này không?')) {
                          const ok = await leaveFamily(link.id);
                          if (ok) toast.success('Đã hủy yêu cầu kết nối.');
                        }
                      }}
                      className="px-2 py-1 text-[9px] font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded uppercase"
                    >
                      Hủy Yêu Cầu
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
