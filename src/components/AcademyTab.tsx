import { useMemo, useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { toast } from '../utils/toast';
import { BrainCircuit, Zap, Star, Flame, Sparkles } from 'lucide-react';
import { CORE_KNOWLEDGE_TOPICS, inferTopicId } from '../data/coreKnowledge';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG, DEFAULT_GRADE_TIER, getStudentRankForLevel } from '../types/game';
import { filterLessonsInScope } from '../utils/learningScope';
import { isLightTheme } from '../theme/uiThemes';
import { LearningLedger } from './LearningLedger';
import { ActivityLog } from './ActivityLog';
import { SearchSuggest } from './Common/SearchSuggest';
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

export function AcademyTab({ onStudyLesson, onStartLessonPractice, onNavigateToFunzone }: AcademyTabProps) {
  const { t, isEnglish } = useTranslate();
  const { activeSectId, activeGradeTier } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const isUnicorn = isLightTheme(uiTheme);
  const syncWithServer = useGameState(state => state.syncWithServer);
  const player = useGameState(state => state.player);
  const currentUser = useGameState(state => state.currentUser);
  const lessons = useGameState(state => state.lessons);

  // Profile / class connection state
  const classLinks = useGameState(state => state.classLinks);
  const respondClassInvite = useGameState(state => state.respondClassInvite);
  const leaveClass = useGameState(state => state.leaveClass);
  const sendClassInvite = useGameState(state => state.sendClassInvite);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const activeLink = classLinks.find((l: any) => l.status === 'active');
  const pendingLink = classLinks.find((l: any) => l.status === 'pending_parent' && l.student_id === currentUser?.id);
  const pendingStudentInvites = classLinks.filter((l: any) => l.status === 'pending_student');

  // Quests
  const tutorQuests = useGameState(state => state.tutorQuests || []);
  const claimTutorQuest = useGameState(state => state.claimTutorQuest);

  useEffect(() => { syncWithServer(); }, [syncWithServer]);

  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as keyof typeof SUBJECTS_CONFIG];
  const activeTheme = UI_THEMES.find(theme => theme.id === uiTheme) || UI_THEMES[0];
  const isLight = isLightTheme(uiTheme);

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

  const pendingQuests = tutorQuests.filter((q: any) => q.status === 'assigned');
  const claimableQuests = tutorQuests.filter((q: any) => q.status === 'completed' && !q.claimedAt);

  return (
    <div className="space-y-5">

      {/* ══ Sổ Tu Học (Learning Ledger) — full width, đầu trang ══ */}
      <LearningLedger compact={false} defaultExpanded={true} />

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
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                    player.streak > 0
                      ? (isUnicorn ? 'border-orange-300 bg-orange-50 text-orange-700' : 'border-orange-500/40 bg-orange-500/10 text-orange-400')
                      : (isUnicorn ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-white/10 bg-white/5 text-slate-500')
                  }`}>
                    <Flame className={`w-3.5 h-3.5 ${player.streak > 0 ? 'fill-current' : ''}`} />
                    {player.streak > 0 ? t(`${player.streak} ngày liên tiếp 🔥`, `${player.streak} days streak 🔥`) : t('Bắt đầu chuỗi hôm nay!', 'Start your streak today!')}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                    isUnicorn ? 'border-violet-200 bg-violet-50 text-violet-700' : 'border-synth-purple/40 bg-synth-purple/10 text-synth-purple'
                  }`}>
                    <Star className="w-3.5 h-3.5" />
                    {t('Cấp', 'Level')} {player.level}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                    isUnicorn ? 'border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan'
                  }`}>
                    <span>{activeSubjectConfig?.icon}</span>
                    {t('Môn', 'Subject')}: {isEnglish ? 'English' : activeSubjectConfig?.name}
                  </div>
                  {activeLink ? (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-orbitron font-bold text-[10px] uppercase ${
                      isUnicorn ? 'border-violet-200 bg-violet-50/70 text-violet-700' : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan'
                    }`}>
                      👨‍🏫 {t('Lớp', 'Class')}: {activeLink.parent_name || activeLink.parent_email || t('Chưa rõ tên', 'Unknown')}
                    </div>
                  ) : (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed font-orbitron font-bold text-[10px] uppercase ${
                      isUnicorn ? 'border-slate-200 bg-slate-50 text-slate-400' : 'border-white/10 bg-white/5 text-slate-500'
                    }`}>
                      👨‍🏫 {t('Chưa kết nối lớp', 'No class connected')}
                    </div>
                  )}
                </div>
              </div>

              {/* XP + Energy mini */}
              <div className={`shrink-0 rounded-2xl border p-4 space-y-3 min-w-[150px] ${
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
                    <span>💎</span>
                    <span>{player.ruby} Ruby</span>
                  </div>
                </div>
              </div>
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

          {/* SECTION: Kết nối Giáo Viên */}
          {currentUser?.role === 'student' && (
            <section className={`p-5 rounded-2xl border ${isLight ? 'border-violet-200/50 bg-violet-50/20' : 'border-white/10 bg-white/5'} space-y-4`}>
              <h3 className={`font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                <span>👨‍🏫</span> {t('Lớp Chủ Nhiệm & Kết Nối Giáo Viên', 'Homeroom Class & Teacher Connection')}
              </h3>

              {/* Pending student invites */}
              {pendingStudentInvites.length > 0 && (
                <div className="space-y-2">
                  {pendingStudentInvites.map((invite: any) => (
                    <div key={invite.id} className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border ${
                      isLight ? 'border-violet-200/50 bg-white/80' : 'border-synth-cyan/20 bg-black/30'
                    }`}>
                      <p className={`text-xs font-semibold ${isLight ? 'text-violet-800' : 'text-white'}`}>
                        {t('Giáo viên ', 'Teacher ')}
                        <span className="text-synth-cyan">{invite.parent_name || invite.parent_email}</span>
                        {t(' mời bạn vào lớp', ' invited you to their class')}
                      </p>
                      <div className="flex gap-2">
                      <button onClick={() => respondClassInvite(invite.id, true)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase cursor-pointer ${isLight ? 'bg-green-500 text-white' : 'bg-synth-green text-black'}`}>
                          {t('Đồng ý', 'Accept')}
                        </button>
                        <button onClick={() => respondClassInvite(invite.id, false)}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase cursor-pointer bg-white/10 text-slate-300 hover:bg-white/20">
                          {t('Từ chối', 'Decline')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active link status */}
              {activeLink && (
                <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
                  isLight ? 'border-violet-200/50 bg-white/80 text-violet-800' : 'border-synth-cyan/20 bg-black/30 text-synth-cyan'
                }`}>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400">{t('Đang học lớp của:', 'Currently in class of:')}</p>
                    <p className={`font-bold ${isLight ? 'text-violet-900' : 'text-white'}`}>{activeLink.parent_name || t('Chưa rõ tên', 'Unknown')}</p>
                    <p className="text-[10px] opacity-70">({activeLink.parent_email})</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (window.confirm(t('Bạn có chắc muốn rời khỏi lớp này không?', 'Are you sure you want to leave this class?'))) {
                        const success = await leaveClass(activeLink.id);
                        if (success) toast.success(t('Đã rời Lớp Chủ Nhiệm', 'Left class successfully'));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-[9px] uppercase font-black tracking-wide cursor-pointer transition-colors ${
                      isLight ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' : 'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    }`}
                  >
                    {t('Rời Lớp', 'Leave Class')} 🚪
                  </button>
                </div>
              )}

              {/* Pending link status */}
              {pendingLink && (
                <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
                  isLight ? 'border-amber-200/50 bg-amber-50/50 text-amber-800' : 'border-synth-orange/20 bg-black/30 text-synth-orange'
                }`}>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400">{t('Đang chờ phản hồi kết nối:', 'Awaiting connection response:')}</p>
                    <p className={`font-bold ${isLight ? 'text-amber-900' : 'text-white'}`}>{pendingLink.parent_name || t('Chưa rõ tên', 'Unknown')}</p>
                    <p className="text-[10px] opacity-70">({pendingLink.parent_email})</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (window.confirm(t('Bạn có chắc muốn hủy yêu cầu kết nối này không?', 'Cancel this connection request?'))) {
                        const ok = await leaveClass(pendingLink.id);
                        if (ok) toast.success(t('Đã hủy yêu cầu kết nối.', 'Connection request cancelled.'));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-[9px] uppercase font-black tracking-wide cursor-pointer transition-colors ${
                      isLight ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' : 'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    }`}
                  >
                    {t('Hủy Yêu Cầu', 'Cancel Request')}
                  </button>
                </div>
              )}

              {/* Join / switch class form */}
              <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl border ${
                isLight ? 'border-violet-200/40 bg-white/60' : 'border-white/5 bg-black/20'
              }`}>
                <div className="space-y-0.5 shrink-0 flex-1 min-w-[180px]">
                  <p className={`font-bold text-xs flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                    <span>👨‍🏫</span> {(activeLink || pendingLink) ? t('Chuyển Lớp Thầy/Cô', 'Switch Class') : t('Gia Nhập Lớp Mới', 'Join New Class')}
                  </p>
                  <p className="text-[10px] leading-normal text-slate-400">
                    {t("Nhập Email Google của Thầy/Cô để kết nối lớp.", "Enter your teacher's Google Email to connect to class.")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-1 max-w-sm w-full">
                  <SearchSuggest
                    placeholder={t("Email Thầy/Cô...", "Teacher's Email...")}
                    roleFilter="tutor"
                    value={inviteEmail}
                    onChange={setInviteEmail}
                    onSelect={user => setInviteEmail(user.email)}
                    className="flex-1"
                  />
                  <button
                    onClick={async () => {
                      if (!inviteEmail.trim()) return;
                      setIsInviting(true);
                      const result = await sendClassInvite(inviteEmail.trim());
                      if (result.success) {
                        toast.success(t('Đã gửi yêu cầu kết nối thành công! Vui lòng chờ Thầy/Cô phê duyệt.', 'Connection request sent! Please wait for teacher approval.'));
                        setInviteEmail('');
                      } else {
                        toast.error(result.error || t('Gửi yêu cầu thất bại.', 'Failed to send request.'));
                      }
                      setIsInviting(false);
                    }}
                    disabled={isInviting || !inviteEmail.trim()}
                    className={`px-3.5 py-2 rounded-lg font-orbitron font-bold text-[9px] uppercase tracking-wider cursor-pointer transition-all ${
                      isLight
                        ? 'bg-violet-600 hover:bg-violet-700 text-white disabled:bg-violet-200'
                        : 'bg-synth-cyan hover:bg-synth-cyan/80 text-black disabled:opacity-50'
                    }`}
                  >
                    {isInviting ? '...' : t('Kết Nối', 'Connect')}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* SECTION: Current Theme */}
          <div className={`relative z-10 grid gap-2 rounded-2xl border p-4 text-sm ${
            isLight ? 'border-violet-200/40 bg-white/80 text-violet-700' : 'border-white/10 bg-white/5 text-white/75'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className={`h-4 w-4 ${isLight ? 'text-fuchsia-500' : 'text-synth-cyan'}`} />
              <span className="font-semibold font-orbitron text-xs">{t('Phong Cách Học Đường Đang Dùng', 'Current School Style')}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeTheme.iconSet[0]}</span>
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>{activeTheme.name}</span>
              </div>
              {onNavigateToFunzone && (
                <button
                  onClick={onNavigateToFunzone}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-orbitron font-bold uppercase tracking-wider cursor-pointer transition-all ${
                    isLight
                      ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100'
                      : 'border-synth-cyan/30 bg-synth-cyan/5 text-synth-cyan hover:bg-synth-cyan/15'
                  }`}
                >
                  {t('Đổi Phong Cách 🎨', 'Change Style 🎨')}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ── Right: ActivityLog + Missions ── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Profile summary card */}
          <div className={`glass-panel rounded-2xl border p-4 space-y-3 ${
            isUnicorn ? 'border-violet-200/35 bg-white/60' : 'border-white/10 bg-black/30'
          }`}>
            <div className="flex items-center gap-3">
              {currentUser?.avatar && (
                <img src={currentUser.avatar} alt={currentUser.name} className="h-12 w-12 rounded-2xl border border-white/15 object-cover" />
              )}
              <div>
                <p className={`font-orbitron font-black text-sm ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>{currentUser?.name}</p>
                <p className={`text-[10px] font-orbitron font-bold flex items-center gap-1 ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-cyan'}`}>
                  {getStudentRankForLevel(player.level).icon} {getStudentRankForLevel(player.level).name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: t('Cấp độ', 'Level'), value: player.level, color: 'text-synth-purple' },
                { label: 'XP', value: `${player.xp}`, color: 'text-synth-magenta' },
                { label: 'Ruby', value: `${player.ruby} 💎`, color: 'text-synth-orange' },
                { label: t('Chuỗi', 'Streak'), value: `${player.streak} ${t('ngày', 'days')}`, color: 'text-synth-green' },
              ].map(item => (
                <div key={item.label} className={`p-2.5 rounded-xl border ${isUnicorn ? 'border-violet-200/40 bg-white/50' : 'border-white/5 bg-white/5'}`}>
                  <span className={`block text-[9px] font-orbitron font-bold uppercase tracking-wider ${isUnicorn ? 'text-slate-400' : 'text-slate-400'}`}>{item.label}</span>
                  <span className={`font-orbitron font-black text-sm ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ActivityLog */}
          <ActivityLog />

        </div>
      </div>
    </div>
  );
}
