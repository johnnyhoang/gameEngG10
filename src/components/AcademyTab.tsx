import { useMemo, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { BrainCircuit } from 'lucide-react';
import { inferTopicId } from '../data/coreKnowledge';
import { useSect } from '../contexts/SectContext';
import { DEFAULT_GRADE_TIER } from '../types/game';
import { filterLessonsInScope } from '../utils/learningScope';
import { isLightTheme } from '../theme/uiThemes';
import { LearningLedger } from './LearningLedger';
import { ActivityLog } from './ActivityLog';
import { UI_THEMES } from '../theme/uiThemes';
import { useTranslate } from '../hooks/useTranslate';

const getHamForPage = (pageId: string) => {
  const ham = pageId.split('-').at(-1);
  return ham === 'hoa' || ham === 'thach' || ham === 'bang' ? ham : 'thach';
};

interface AcademyTabProps {
  onStudyLesson?: (lessonId: string) => void;
  onStartLessonPractice?: (lessonId: string) => void;
  onNavigateToFunzone?: () => void;
}

export function AcademyTab({ onStudyLesson, onStartLessonPractice }: AcademyTabProps) {
  const { t } = useTranslate();
  const { activeSectId, activeGradeTier } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const isUnicorn = isLightTheme(uiTheme);
  const syncWithServer = useGameState(state => state.syncWithServer);
  const currentUser = useGameState(state => state.currentUser);
  const lessons = useGameState(state => state.lessons);
  const topics = useGameState(state => state.topics || []);

  // Profile / class connection state
  const classLinks = useGameState(state => state.classLinks);

  const activeLink = classLinks.find((l: any) => l.status === 'active');

  // Quests
  const tutorQuests = useGameState(state => state.tutorQuests || []);
  const claimTutorQuest = useGameState(state => state.claimTutorQuest);

  useEffect(() => { syncWithServer(); }, [syncWithServer]);

  const activeTheme = UI_THEMES.find(theme => theme.id === uiTheme) || UI_THEMES[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return t('Chào buổi sáng', 'Good morning');
    if (hour < 13) return t('Chào buổi trưa', 'Good afternoon');
    if (hour < 18) return t('Chào buổi chiều', 'Good afternoon');
    return t('Chào buổi tối', 'Good evening');
  };

  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const subjectLessons = filterLessonsInScope(lessons, activeSectId as any, activeGradeTier);

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
    const subjectTopics = topics.filter(t =>
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
  }, [pageExplorationStates, categoryStats, activeSectId, activeGradeTier, subjectLessons, topics]);

  const weakLesson = weakData?.lesson ?? null;
  const weakAccuracy = weakData?.accuracy ?? 0;

  const pendingQuests = tutorQuests.filter((q: any) => q.status === 'assigned');
  const claimableQuests = tutorQuests.filter((q: any) => q.status === 'completed' && !q.claimedAt);

  return (
    <div className="space-y-5">

      {/* ══ 2-column layout ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: Hero + AI Tutor + Quests ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* SECTION: Hero Greeting */}
          <section className={`glass-panel rounded-3xl border p-5 md:p-6 relative overflow-hidden ${
            isUnicorn
              ? 'border-violet-200/35 bg-gradient-to-br from-fuchsia-50/80 via-white/70 to-cyan-50/80'
              : 'border-synth-cyan/20 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(255,0,127,0.07),transparent_50%)]'
          }`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-synth-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-synth-magenta/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className={`text-xs font-orbitron font-bold uppercase tracking-[0.2em] ${isUnicorn ? 'text-violet-500' : 'text-synth-cyan/70'}`}>
                    {getGreeting()}, {t('Sĩ Tử', 'Scholar')}
                  </p>
                  <h1 className={`font-orbitron font-black text-2xl md:text-3xl uppercase tracking-wide ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>
                    {currentUser?.name || t('Sĩ Tử mới', 'New Scholar')} 👋
                  </h1>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-2">
                  {activeLink ? (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                      isUnicorn ? 'border-violet-200 bg-violet-50/70 text-violet-700' : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan'
                    }`}>
                      👨‍🏫 {t('Lớp', 'Class')}: {activeLink.tutor_name || activeLink.tutor_email || t('Chưa rõ tên', 'Unknown')}
                    </div>
                  ) : (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed font-orbitron font-bold text-[10px] uppercase ${
                      isUnicorn ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-white/10 bg-white/5 text-slate-500'
                    }`}>
                      👨‍🏫 {t('Chưa kết nối lớp', 'No class connected')}
                    </div>
                  )}
                  {/* Badge hiển thị phong cách học đường hiện tại */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                    isUnicorn ? 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700' : 'border-synth-magenta/30 bg-synth-magenta/10 text-synth-magenta'
                  }`}>
                    <span>🎨</span>
                    {t('Phong Cách', 'Style')}: {activeTheme.name.replace(/[🎨✨🌙🌸⭐🎋🍁❄️]/g, '').trim()} {activeTheme.iconSet[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Sổ Tu Học (Learning Ledger) hiển thị trực quan trực tiếp */}
            <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
              <LearningLedger />
            </div>
          </section>

          {/* SECTION: AI Tutor Recommendation */}
          {weakLesson && (
            <section className="glass-panel rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-transparent p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-orbitron font-bold text-xs uppercase text-amber-300 tracking-wider">
                  {t('Thư Viện ✦ AI Trợ Giảng', 'Library ✦ AI Tutor')}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex-1 leading-relaxed">
                {t('Bạn đang yếu ở chuyên đề ', 'You are weak in topic ')}
                <span className="text-amber-300 font-bold">{weakLesson.title}</span>
                {t(
                  ` (chỉ ${Math.round(weakAccuracy * 100)}% chính xác). Ôn lại ngay, đừng để lỗ hổng phình ra.`,
                  ` (only ${Math.round(weakAccuracy * 100)}% accuracy). Review now to fill this learning gap.`
                )}
              </p>
              <div className="flex gap-2 shrink-0">
                {onStudyLesson && (
                  <button
                    onClick={() => onStudyLesson(weakLesson.id)}
                    className="px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-400/20 transition-colors cursor-pointer"
                  >
                    {t('Xem bài giảng 📖', 'View Lecture 📖')}
                  </button>
                )}
                {onStartLessonPractice && (
                  <button
                    onClick={() => onStartLessonPractice(weakLesson.id)}
                    className="px-3 py-2 rounded-lg border border-amber-400/30 bg-amber-400/15 text-amber-200 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-400/25 transition-colors cursor-pointer"
                  >
                    {t('Luyện ngay ⚡', 'Practice Now ⚡')}
                  </button>
                )}
              </div>
            </section>
          )}

          {/* SECTION: Quests (Giáo viên giao) */}
          {(pendingQuests.length > 0 || claimableQuests.length > 0) && (
            <section className="space-y-3">
              <h2 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
                📋 {t('Nhiệm Vụ Được Giao', 'Assigned Quests')}
              </h2>
              <div className="space-y-2">
                {[...claimableQuests, ...pendingQuests].slice(0, 4).map((quest: any) => (
                  <div key={quest.id} className={`glass-panel rounded-2xl border p-4 flex items-center justify-between gap-3 ${
                    quest.status === 'completed'
                      ? (isUnicorn ? 'border-green-200/50 bg-green-50/30' : 'border-synth-green/30 bg-synth-green/5')
                      : (isUnicorn ? 'border-violet-200/35 bg-white/40' : 'border-white/10 bg-white/5')
                  }`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{quest.status === 'completed' ? '✅' : '📋'}</span>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{quest.title}</p>
                        {quest.reward && (
                          <p className={`text-[10px] font-orbitron font-bold ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-orange'}`}>
                            +{quest.reward.ruby} Ruby · +{quest.reward.xp} XP
                          </p>
                        )}
                      </div>
                    </div>
                    {quest.status === 'completed' && !quest.claimedAt && (
                      <button
                        onClick={() => claimTutorQuest(quest.id)}
                        className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shrink-0 ${
                          isUnicorn
                            ? 'bg-gradient-to-r from-green-300 to-cyan-300 text-violet-900 shadow-md hover:brightness-105'
                            : 'bg-synth-green text-black hover:shadow-[0_0_10px_rgba(0,255,127,0.4)]'
                        }`}
                      >
                        {t('Nhận Quà 🎁', 'Claim Reward 🎁')}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ── Right: ActivityLog ── */}
        <div className="lg:col-span-1 h-full flex flex-col">


          {/* ActivityLog */}
          <ActivityLog />

        </div>
      </div>
    </div>
  );
}
