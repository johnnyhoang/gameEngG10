import { useMemo, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { toast } from '../utils/toast';
import {
  Sword, Mountain, Palmtree, BrainCircuit, ArrowRight,
  Flame, Zap, Star
} from 'lucide-react';
import { CORE_KNOWLEDGE_TOPICS, inferTopicId } from '../data/coreKnowledge';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG, DEFAULT_GRADE_TIER } from '../types/game';
import { filterLessonsInScope } from '../utils/learningScope';
import { isLightTheme } from '../theme/uiThemes';
import { LearningLedger } from './LearningLedger';

const getHamForPage = (pageId: string) => {
  const ham = pageId.split('-').at(-1);
  return ham === 'hoa' || ham === 'thach' || ham === 'bang' ? ham : 'thach';
};

interface WorldMapProps {
  onOpenArena: () => void;
  onOpenPracticeHall: () => void;
  onOpenRelax: () => void;
  onStudyLesson?: (lessonId: string) => void;
  onStartLessonPractice?: (lessonId: string) => void;
}

// Worldmap hub (CORE_SPECS §2.1): 5 module chính ngang hàng cho Sĩ Tử —
// Trường Thi, Học Đường, Công Viên Thư Giãn.
export function WorldMap({
  onOpenArena, onOpenPracticeHall, onOpenRelax, onStudyLesson, onStartLessonPractice
}: WorldMapProps) {
  const { activeSectId, activeGradeTier } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = isLightTheme(uiTheme);
  const syncWithServer = useGameState(state => state.syncWithServer);
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const lessons = useGameState(state => state.lessons);
  useEffect(() => {
    syncWithServer();
  }, [syncWithServer]);

  const tutorQuests = useGameState(state => state.tutorQuests || []);
  const claimTutorQuest = useGameState(state => state.claimTutorQuest);
  
  const classLinks = useGameState(state => state.classLinks);
  const activeLink = classLinks.find((l: any) => l.status === 'active');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Chào buổi sáng';
    if (hour < 13) return 'Chào buổi trưa';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const subjectLessons = filterLessonsInScope(lessons, activeSectId as any, activeGradeTier);
  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;


  const weakData = useMemo(() => {
    const subjectPageStates = Object.values(pageExplorationStates).filter(state => 
      state.pageId.startsWith(`hang-${activeGradeTier}-${activeSectId}-`)
    );

    const sortedPages = [...subjectPageStates].sort((a, b) => {
      const timeA = a.lastExploredAt ? new Date(a.lastExploredAt).getTime() : 0;
      const timeB = b.lastExploredAt ? new Date(b.lastExploredAt).getTime() : 0;
      return timeA - timeB;
    });

    const preferredHam = sortedPages.length > 0 ? getHamForPage(sortedPages[0].pageId) : null;
    const subjectTopics = CORE_KNOWLEDGE_TOPICS.filter(t =>
      t.subjectId === activeSectId && (t.gradeTier ?? DEFAULT_GRADE_TIER) === activeGradeTier
    );
    
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
  }, [pageExplorationStates, categoryStats, activeSectId, activeGradeTier, subjectLessons]);

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
                {getGreeting()}, Sĩ Tử
              </p>
              <h1 className={`font-orbitron font-black text-2xl md:text-3xl uppercase tracking-wide ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>
                {currentUser?.name || 'Sĩ Tử mới'} 👋
              </h1>
            </div>

            {/* Stats row: Streak + Level + Subject + Teacher (Static info only) */}
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
              {/* Badge Giáo viên chủ nhiệm tĩnh */}
              {activeLink ? (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                  isUnicorn ? 'border-violet-200 bg-violet-50/70 text-violet-700' : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan'
                }`}>
                  🎓 Lớp: {activeLink.parent_name || activeLink.parent_email || 'Chưa rõ tên'}
                </div>
              ) : (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed font-orbitron font-bold text-[10px] uppercase ${
                  isUnicorn ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-white/10 bg-white/5 text-slate-500'
                }`}>
                  🎓 Chưa kết nối lớp
                </div>
              )}
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
                <span>{player.ruby} Ruby</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sổ Tu Học của sĩ tử - hiển thị mở rộng ngay đầu trang */}
      {currentUser?.role === 'student' && (
        <div className="-mt-1">
          <LearningLedger defaultExpanded={true} />
        </div>
      )}

      {/* ─── SECTION 3: AI TRỢ GIẢNG (chỉ hiện khi có điểm yếu) ─── */}
      {weakLesson && (
        <section className="glass-panel rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-transparent p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-orbitron font-bold text-xs uppercase text-amber-300 tracking-wider">Thư Viện · AI Trợ Giảng</span>
          </div>
          <p className="text-xs text-slate-300 flex-1 leading-relaxed">
            Bạn đang yếu ở chuyên đề <span className="text-amber-300 font-bold">{weakLesson.title}</span> (chỉ{' '}
            {Math.round(weakAccuracy * 100)}% chính xác). Ôn lại ngay, đừng để lỗ hổng phình ra.
          </p>
          <div className="flex gap-2 shrink-0">
            {onStudyLesson && (
              <button
                onClick={() => onStudyLesson(weakLesson.id)}
                className="px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-400/20 transition-colors cursor-pointer"
              >
                Xem bài giảng 📖
              </button>
            )}
            {onStartLessonPractice && (
              <button
                onClick={() => onStartLessonPractice(weakLesson.id)}
                className="px-3 py-2 rounded-lg bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Luyện tập 📚
              </button>
            )}
          </div>
        </section>
      )}

      {/* ─── SECTION 4: PARENT QUESTS (nếu có) ─── */}
      {tutorQuests.filter((q: any) => q.status !== 'claimed').length > 0 && (
        <section className="glass-panel rounded-2xl border border-synth-magenta/30 bg-black/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-magenta">
              Nhiệm Vụ Chủ Nhiệm Giao
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tutorQuests.filter((q: any) => q.status !== 'claimed').map((quest: any) => (
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
                    <span>🎁 +{quest.rewardRuby} Ruby</span>
                  </div>
                </div>
                {quest.status === 'completed' && (
                  <button
                    onClick={() => {
                      claimTutorQuest(quest.id);
                      toast.success(`Nhận thưởng thành công: +${quest.rewardRuby} Ruby! 🥳`);
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
        </div>

        {/* 3 primary study zone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trường Thi — PRIMARY, nổi nhất */}
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
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">⚡ Trường Thi</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  4 phòng chiến đấu: <strong className="text-synth-magenta">Mixed</strong>, <strong className="text-synth-purple">Sinh Tồn</strong>, <strong className="text-synth-cyan">Boss</strong> và <strong className="text-synth-orange">Truy Tìm Lỗi Sai</strong>. Luyện phản xạ thi cử như thật.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-synth-magenta group-hover:gap-3 transition-all">
              Vào Trường Thi <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Học Đường */}
          <button
            onClick={onOpenPracticeHall}
            className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/25 bg-gradient-to-br from-synth-cyan/12 via-synth-purple/8 to-transparent p-5 flex flex-col justify-between gap-4 text-left cursor-pointer transition-all duration-300 hover:border-synth-cyan/45 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)] group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center text-synth-cyan">
                  <Mountain className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-bold font-orbitron uppercase tracking-wider text-synth-cyan bg-synth-cyan/10 border border-synth-cyan/20 px-2 py-0.5 rounded-full">
                  {completedLessons}/{subjectLessons.length} lĩnh hội
                </span>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">📚 Học Đường</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Tự học theo chuyên đề, sổ tay lỗi sai và Xưởng Toán tương tác 3D. Nắm lý thuyết trước, ứng thí sau.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-synth-cyan group-hover:gap-3 transition-all">
              Vào Học Đường <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Công Viên Thư Giãn */}
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
                <h3 className="font-orbitron font-black text-base text-white uppercase tracking-wide">🦄 Công Viên Thư Giãn</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                  Minigame nhẹ nhàng: ghép cặp từ vựng, sơ đồ tư duy, học qua cốt truyện kể chuyện.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-fuchsia-300 group-hover:gap-3 transition-all">
              Ghé Công Viên <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>


      </div>



    </div>
  );
}
