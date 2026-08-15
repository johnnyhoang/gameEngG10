import { useState, useEffect, useMemo } from 'react';
import { useGameState, DEFAULT_GAME_SETTINGS } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { DEFAULT_GRADE_TIER, SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import { filterQuestionsInScope, filterLessonsInScope } from '../utils/learningScope';
import { getSubjectActivities } from '../subject-modules/registry';
import {
  Compass, Sword, Star, Zap, BookOpen,
  BookMarked, Heart, Volume2
} from 'lucide-react';
import { toast } from '../utils/toast';
import { FogCard } from './FogCard';

import { isLightTheme } from '../theme/uiThemes';
import { RiddleGames } from '../miniapps/riddle/RiddleGames';
import { DUNGEONS_CONFIG, getDungeonConfig } from '../utils/textbookEnricher';

interface ArenaProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival' | 'lesson',
    bossId?: string,
    backTarget?: 'map' | 'arena' | 'practice'
  ) => void;
}

export function Arena({ onStartPlay }: ArenaProps) {
  const player = useGameState(state => state.player);
  const failedQuestionIds = useGameState(state => state.failedQuestionIds);
  const consumeEnergy = useGameState(state => state.useEnergy);
  const { activeSectId, activeGradeTier } = useSect();
  // Bonus Điểm (Ruby) khi hạ Boss — quảng bá ngay trên Boss Card (CORE_SPECS §2.1). Boss không thưởng tiền.
  const bossCompletionBonusRuby = useGameState(state => state.gameSettings?.bossCompletionBonusRuby ?? DEFAULT_GAME_SETTINGS.bossCompletionBonusRuby);
  const challengeEnergyCosts = useGameState(state => state.gameSettings?.challengeEnergyCosts ?? DEFAULT_GAME_SETTINGS.challengeEnergyCosts);
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);
  const topics = useGameState(state => state.topics);
  const activities = useGameState(state => state.activities);
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = isLightTheme(uiTheme);

  const [visibleLessonsCount, setVisibleLessonsCount] = useState(20);
  const [activeDungeonTab, setActiveDungeonTab] = useState<string>('all');

  useEffect(() => {
    setVisibleLessonsCount(20);
    setActiveDungeonTab('all');
  }, [activeSectId, activeGradeTier]);

  const subjectLessonsSorted = useMemo(() => {
    const rawLessons = filterLessonsInScope(lessons, activeSectId as SubjectId, activeGradeTier);

    // Bài có trong SGK (loai hợp lệ, không phải 'Chưa phân loại SGK') lên trước
    const inSgk = rawLessons.filter(l => l.loai && l.loai !== 'Chưa phân loại SGK');
    const notInSgk = rawLessons.filter(l => !l.loai || l.loai === 'Chưa phân loại SGK');

    // Trong mỗi nhóm: bài có số bài (bai) lên trước rồi mới đến bài không có số
    const sortGroup = (group: typeof rawLessons) => {
      const mapped = group.filter(l => typeof l.bai === 'number');
      const unmapped = group.filter(l => typeof l.bai !== 'number');
      const maxBai = mapped.length > 0 ? Math.max(...mapped.map(l => l.bai as number)) : 0;
      return [
        ...mapped,
        ...unmapped.map((l, idx) => ({ ...l, bai: maxBai + 1 + idx }))
      ].sort((a, b) => (a.bai ?? 0) - (b.bai ?? 0));
    };

    return [...sortGroup(inSgk), ...sortGroup(notInSgk)];
  }, [lessons, activeSectId, activeGradeTier]);

  const arenaDungeonsWithLessons = useMemo(() => {
    return Object.values(DUNGEONS_CONFIG).map(dungeon => {
      const dLessons = subjectLessonsSorted.filter(l => (l.hamNguyenTo || 'thach') === dungeon.id);
      if (dLessons.length === 0) return null;
      return {
        dungeon,
        dungeonConfig: getDungeonConfig(dungeon.id, activeSectId),
        lessons: dLessons
      };
    }).filter(Boolean) as { dungeon: typeof DUNGEONS_CONFIG[keyof typeof DUNGEONS_CONFIG]; dungeonConfig: ReturnType<typeof getDungeonConfig>; lessons: typeof subjectLessonsSorted }[];
  }, [subjectLessonsSorted, activeSectId]);

  const filteredSubjectLessons = useMemo(() => {
    if (activeDungeonTab === 'all') return subjectLessonsSorted;
    return subjectLessonsSorted.filter(l => (l.hamNguyenTo || 'thach') === activeDungeonTab);
  }, [subjectLessonsSorted, activeDungeonTab]);


  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as SubjectId];
  const isChuyenSau = activeSubjectConfig.group === 'chuyen_sau';

  const subjectQuestionCount = useMemo(
    () => filterQuestionsInScope(questions, activeSectId as SubjectId, activeGradeTier).length,
    [questions, activeSectId, activeGradeTier]
  );

  const handleLaunchZone = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival' | 'lesson',
    energyCost: number,
    bossId?: string,
    backTarget?: 'map' | 'arena' | 'practice'
  ) => {
    if (subjectQuestionCount === 0) {
      toast.error(`Viện Trưởng chưa nạp đề cho môn ${activeSubjectConfig.name}, thử chọn môn khác hoặc quay lại sau.`);
      return;
    }
    if (mode === 'revenge' && (!failedQuestionIds || failedQuestionIds.length === 0)) {
      toast.error('Chưa có câu sai nào để sửa sai truy tung!');
      return;
    }
    if (player.energy < energyCost) {
      toast.error('Hết năng lượng rồi. Nghỉ một nhịp hoặc rèn luyện ở phòng khác.');
      return;
    }
    consumeEnergy(energyCost);
    onStartPlay(mode, bossId, backTarget);
  };

  // Quyết Đấu Boss tốn -100 Năng Lượng; nếu maxEnergy riêng của con < 100 thì tốn = maxEnergy,
  // để con vẫn luôn đánh được 1 lượt Boss khi đầy bình dù chủ nhiệm siết trần thấp (SUB_SPEC_ENERGY §3).
  const bossEnergyCost = Math.min(100, player.maxEnergy ?? 100);

  const subjectTopicIds = useMemo(() => {
    return topics.filter(t =>
      t.subject === activeSectId && (t.gradeTier ?? DEFAULT_GRADE_TIER) === activeGradeTier
    ).map(t => t.id);
  }, [topics, activeSectId, activeGradeTier]);

  const bosses = useMemo(() => {
    const bossActs = activities.filter(a =>
      a.activityType === 'boss'
      && (a.gradeTier ?? DEFAULT_GRADE_TIER) === activeGradeTier
      && subjectTopicIds.includes(a.topicId)
    );
    return bossActs.map(a => ({
      id: a.config?.boss_id || a.id,
      name: a.title,
      tag: a.config?.boss_tag || 'Boss',
      energy: a.config?.energy || bossEnergyCost
    }));
  }, [activities, subjectTopicIds, bossEnergyCost]);

  // Build free practice cards list based on subject activities
  const rankedCards = useMemo(() => {
    const quizActs = activities.filter(a =>
      a.activityType === 'quiz'
      && (a.gradeTier ?? DEFAULT_GRADE_TIER) === activeGradeTier
      && subjectTopicIds.includes(a.topicId)
    );
    
    const manifestActivities = getSubjectActivities(activeSectId);

    const ICON_MAP: Record<string, any> = {
      Compass: <Compass className="w-8 h-8 text-synth-cyan" />,
      Star: <Star className="w-8 h-8 text-synth-cyan" />,
      BookOpen: <BookOpen className="w-8 h-8 text-synth-cyan" />,
      BookMarked: <BookMarked className="w-8 h-8 text-synth-cyan" />,
      Volume2: <Volume2 className="w-8 h-8 text-synth-cyan" />
    };

    return quizActs.map(a => {
      const mode = a.config?.mode || 'mixed';
      const manifestAct = manifestActivities.find(item => item.id === a.id || item.modeKey === mode || item.legacyMode === mode);
      
      const icon = (manifestAct?.icon && ICON_MAP[manifestAct.icon]) || <Star className="w-8 h-8 text-synth-cyan" />;

      return {
        id: a.id,
        title: a.title,
        subtitle: 'Luyện tập chuyên đề',
        description: a.config?.reward || 'Rèn luyện phản xạ nhanh với các dạng bài tập.',
        icon,
        mode: mode as any,
        reward: a.config?.reward || 'Đầy đủ nội dung'
      };
    });
  }, [activities, subjectTopicIds, activeSectId]);

  return (
    <div className="space-y-6">
      {/* Header HUD */}
      <div className="flex items-center justify-between gap-3">
        <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
          <Sword className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-magenta'}`} />
          🏛️ Trường Thi - {activeSubjectConfig.name}
        </h2>
      </div>

      <RiddleGames />

      {subjectQuestionCount === 0 && (
        <div className="glass-panel rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-xs text-slate-300">
          Viện Trưởng chưa nạp đề cho môn {activeSubjectConfig.name}. Các phòng thi bên dưới sẽ tạm chưa mở được — quay lại sau khi có đề.
        </div>
      )}

      {/* THI THEO BÀI (Lazy Load / Load More) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-blue-50/40 border-blue-200/40' : 'bg-synth-cyan/5 border-synth-cyan/10'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-2">
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              📝 Thi theo Bài học
            </h3>
          </div>
          <span className="text-[10px] font-orbitron font-semibold text-slate-400">
            Tổng cộng: {filteredSubjectLessons.length} bài
          </span>
        </div>

        {/* TAB CHO TỪNG HẦM NGUYÊN TỐ */}
        {arenaDungeonsWithLessons.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => { setActiveDungeonTab('all'); setVisibleLessonsCount(20); }}
              className={`px-3 py-1.5 rounded-xl font-orbitron font-semibold text-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeDungeonTab === 'all'
                  ? (isUnicorn ? 'bg-violet-600 text-white shadow-sm' : 'bg-synth-cyan text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]')
                  : (isUnicorn ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white')
              }`}
            >
              ✨ Tất cả ({subjectLessonsSorted.length})
            </button>

            {arenaDungeonsWithLessons.map(({ dungeon, dungeonConfig, lessons: dLessons }) => {
              const isActive = activeDungeonTab === dungeon.id;
              return (
                <button
                  key={dungeon.id}
                  type="button"
                  onClick={() => { setActiveDungeonTab(dungeon.id); setVisibleLessonsCount(20); }}
                  className={`px-3 py-1.5 rounded-xl font-orbitron font-semibold text-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? (isUnicorn ? 'bg-violet-600 text-white shadow-sm' : 'bg-synth-cyan text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]')
                      : (isUnicorn ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white')
                  }`}
                >
                  <span>{dungeonConfig.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? (isUnicorn ? 'bg-white/20 text-white' : 'bg-black/30 text-black')
                      : 'bg-white/10 text-slate-400'
                  }`}>
                    {dLessons.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredSubjectLessons.length === 0 ? (
            <div className="col-span-2 lg:col-span-4 glass-panel rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-400">
              📭 Chưa có bài học nào trong hầm này.
            </div>
          ) : (
            filteredSubjectLessons
              .slice(0, visibleLessonsCount)
              .map(lesson => {
                const isCompleted = lessonsProgress[lesson.id] || false;
                const cost = challengeEnergyCosts[1] ?? 30;
                const dungeonConfig = getDungeonConfig(lesson.hamNguyenTo || 'thach', activeSectId);

                return (
                  <div key={lesson.id} className="relative">
                    <FogCard
                      pageId={`arena-lesson-${lesson.id}`}
                      requiredCompletions={1}
                      decayDays={7}
                      label="Thử thách chưa mở khóa"
                      onOpenLevel3={() => handleLaunchZone('lesson', cost, lesson.id, 'arena')}
                    >
                      <div
                        onClick={(e) => { e.stopPropagation(); handleLaunchZone('lesson', cost, lesson.id, 'arena'); }}
                        className={`glass-panel rounded-xl border p-3 flex flex-col gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 h-full ${
                          subjectQuestionCount === 0
                            ? 'opacity-40 border-slate-700 bg-slate-900/10 pointer-events-none'
                            : 'border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent glass-panel-hover'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-orbitron font-black text-[11px] text-synth-cyan leading-tight line-clamp-2 flex-1">
                            {lesson.bai ? `Bài ${lesson.bai}: ` : ''}{lesson.title}
                          </h4>
                          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold bg-synth-blue border border-synth-cyan/20 text-white shrink-0">
                            <Zap className="w-2.5 h-2.5 text-synth-cyan fill-synth-cyan" /> {cost}
                          </div>
                        </div>
                        <div className={`text-[8px] font-semibold uppercase tracking-[0.18em] ${
                          lesson.loai === 'Chưa phân loại SGK' ? 'text-red-400 font-bold' : 'text-slate-400'
                        }`}>
                          {lesson.loai === 'Chưa phân loại SGK' 
                            ? '⚠️ CHƯA PHÂN LOẠI SGK' 
                            : `${dungeonConfig.label} • ${lesson.loai || 'Luyện thi'}`}
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-1">
                          {isCompleted ? (
                            <span className="text-[8px] font-orbitron font-semibold bg-synth-green/20 text-synth-green border border-synth-green/30 px-1.5 py-0.5 rounded">
                              ĐÃ HOÀN THÀNH
                            </span>
                          ) : (
                            <span className="text-[8px] font-semibold font-orbitron text-slate-500">+15 XP / +5 Ruby</span>
                          )}
                        </div>
                      </div>
                    </FogCard>
                  </div>
                );
              })
          )}
        </div>

        {/* Nút Xem thêm (Load More) */}
        {visibleLessonsCount < filteredSubjectLessons.length && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setVisibleLessonsCount(prev => prev + 20)}
              className="px-6 py-2 rounded-xl border border-synth-cyan/30 hover:border-synth-cyan bg-synth-cyan/10 hover:bg-synth-cyan/20 text-synth-cyan font-orbitron font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              Xem thêm bài thi ⚔️
            </button>
          </div>
        )}
      </div>

      {/* CẢNH 1: THI NÂNG CAO (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-pink-50/40 border-pink-200/40' : 'bg-synth-magenta/5 border-synth-magenta/10'}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              🏅 Thi Nâng Cao
            </h3>
            <p className="text-[10px] text-slate-400">Rèn luyện phản xạ và tốc độ theo các kỹ năng/dạng bài chuyên sâu</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {rankedCards.length === 0 ? (
            <div className="col-span-2 glass-panel rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-400">
              📭 Chưa có chuyên đề thử thách nào được cấu hình cho môn này. Vui lòng liên hệ Giáo viên/Admin để thiết lập.
            </div>
          ) : (
            rankedCards.map(card => (
              <div key={card.id} className="relative">
                <FogCard
                  pageId={`arena-free-${card.id}`}
                  requiredCompletions={3}
                  decayDays={7}
                  label="Thử thách chưa trải nghiệm"
                  onOpenLevel3={() => handleLaunchZone(card.mode, challengeEnergyCosts[1] ?? 30)}
                >
                  <div
                    onClick={(e) => { e.stopPropagation(); handleLaunchZone(card.mode, challengeEnergyCosts[1] ?? 30); }}
                    className={`glass-panel rounded-xl border p-3 flex flex-col gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 h-full ${
                      subjectQuestionCount === 0
                        ? 'opacity-40 border-slate-700 bg-slate-900/10 pointer-events-none'
                        : 'border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent glass-panel-hover'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-orbitron font-black text-[11px] text-synth-cyan leading-tight flex-1">🏰 {card.title}</h4>
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold bg-synth-blue border border-synth-cyan/20 text-white shrink-0">
                        <Zap className="w-2.5 h-2.5 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                      </div>
                    </div>
                    <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-400">{card.subtitle}</div>
                    <p className="text-[10px] text-slate-300 leading-snug line-clamp-2">{card.description}</p>
                    <div className="text-[8px] font-semibold font-orbitron mt-auto pt-1 text-slate-500">{card.reward}</div>
                  </div>
                </FogCard>
              </div>
            ))
          )}

          {/* Random & Revenge inside Ranked list for more options */}
          <div className="relative">
            <FogCard
              pageId="arena-free-random"
              requiredCompletions={3}
              decayDays={7}
              label="Thử thách chưa trải nghiệm"
              onOpenLevel3={() => handleLaunchZone('mixed', challengeEnergyCosts[1] ?? 30)}
            >
              <div
                onClick={(e) => { e.stopPropagation(); handleLaunchZone('mixed', challengeEnergyCosts[1] ?? 30); }}
                className={`glass-panel rounded-xl border p-3 flex flex-col gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 h-full ${
                  subjectQuestionCount === 0
                    ? 'opacity-40 border-slate-700 bg-slate-900/10 pointer-events-none'
                    : 'border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/5 to-transparent glass-panel-hover'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-orbitron font-semibold text-[11px] text-white leading-tight flex-1">🌀 Luyện ngẫu nhiên</h4>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold bg-synth-blue border border-synth-cyan/20 text-white shrink-0">
                    <Zap className="w-2.5 h-2.5 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">10 câu ngẫu nhiên toàn chuyên đề, ưu tiên câu yếu.</p>
                <div className="text-[8px] font-semibold font-orbitron mt-auto pt-1 text-slate-500">+15 XP / +5 Ruby</div>
              </div>
            </FogCard>
          </div>

          <div className="relative">
            <FogCard
              pageId="arena-free-revenge"
              requiredCompletions={3}
              decayDays={7}
              label="Thử thách chưa trải nghiệm"
              onOpenLevel3={() => handleLaunchZone('revenge', challengeEnergyCosts[2] ?? 30)}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!failedQuestionIds || failedQuestionIds.length === 0) {
                    toast.error('Chưa có câu sai nào để sửa sai truy tung!');
                    return;
                  }
                  handleLaunchZone('revenge', challengeEnergyCosts[2] ?? 30);
                }}
                className={`glass-panel rounded-xl border p-3 flex flex-col gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300 h-full ${
                  (!failedQuestionIds || failedQuestionIds.length === 0 || subjectQuestionCount === 0)
                    ? 'opacity-40 border-slate-700 bg-slate-900/10 pointer-events-none'
                    : 'border-synth-orange/30 hover:border-synth-orange bg-gradient-to-br from-synth-orange/5 to-transparent glass-panel-hover'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-orbitron font-semibold text-[11px] text-synth-orange leading-tight flex-1">💀 Sửa sai truy tung</h4>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold bg-synth-blue border border-synth-orange/20 text-white shrink-0">
                    <Zap className="w-2.5 h-2.5 text-synth-orange fill-synth-orange" /> {challengeEnergyCosts[2] ?? 30}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                  {(!failedQuestionIds || failedQuestionIds.length === 0)
                    ? 'Chưa có câu sai nào để phục thù.'
                    : 'Giải lại câu sai để sửa lỗi lầm.'}
                </p>
                <div className="text-[8px] font-semibold font-orbitron mt-auto pt-1 text-slate-500">XP hồi phục / Xoá sai</div>
              </div>
            </FogCard>
          </div>
        </div>
      </div>

      {/* CẢNH 2: LÔI ĐÀI THẦN THÚ (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-violet-50/40 border-violet-200/40' : 'bg-synth-purple/5 border-synth-purple/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            🏛️ Khoa Thi (Đề Thi Chính Thức)
          </h3>
          <p className="text-[10px] text-slate-400">Khảo thí 5 câu trích từ đề thi thật tuyển sinh/học kỳ các năm trước, trong 20 phút</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {bosses.length === 0 ? (
            <div className="col-span-3 glass-panel rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-400">
              📭 Môn học này chưa thiết lập Khoa Thi.
            </div>
          ) : (
            bosses.map((boss, index) => (
              <div key={boss.id} className="relative">
                <FogCard
                  pageId={`arena-boss-${boss.id}`}
                  requiredCompletions={1}
                  decayDays={7}
                  label="Thử thách chưa trải nghiệm"
                  onOpenLevel3={() => handleLaunchZone('boss', boss.energy, boss.id)}
                >
                  <div
                    onClick={(e) => { e.stopPropagation(); handleLaunchZone('boss', boss.energy, boss.id); }}
                    className={`glass-panel glass-panel-hover rounded-xl p-3 flex flex-col justify-between cursor-pointer relative min-h-[100px] transition-all duration-300 h-full ${
                      isUnicorn
                        ? 'border-violet-200/35 hover:border-violet-300 bg-gradient-to-t from-white/80 to-fuchsia-50/60 shadow-[0_14px_30px_rgba(192,132,252,0.1)]'
                        : 'border-synth-magenta/20 hover:border-synth-magenta bg-gradient-to-t from-synth-magenta/5 to-transparent'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <span className={`text-[8px] font-semibold font-orbitron px-1.5 py-0.5 rounded uppercase ${
                          isUnicorn ? 'bg-fuchsia-100/80 text-violet-700 border border-violet-200/40' : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
                        }`}>
                          Khoa Thi
                        </span>
                        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold shrink-0 ${
                          isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-magenta/30 text-synth-magenta'
                        }`}>
                          <Zap className={`w-2.5 h-2.5 ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-magenta fill-synth-magenta'}`} /> {boss.energy}
                        </div>
                      </div>
                      <h4 className={`font-orbitron font-bold text-[11px] leading-tight ${ isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                        {boss.name}
                      </h4>
                      <p className={`text-[9px] leading-snug ${ isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
                        {isChuyenSau
                          ? `Đề thi chuẩn GD HCMC ${boss.tag} — 5 câu, phạm 3 lỗi là thua`
                          : `${boss.tag === 'HK1' ? 'HK1' : 'HK2'} lớp 9 — 5 câu, phạm 3 lỗi là thua`}
                      </p>
                    </div>
                    <div className="border-t border-synth-gray/30 pt-1.5 mt-1.5 flex justify-between items-center">
                      <span className={`text-[8px] font-semibold ${ isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Bonus:</span>
                      <span className={`font-orbitron font-semibold text-[9px] flex items-center gap-0.5 ${ isUnicorn ? 'text-violet-700' : 'text-synth-green'}`}>
                        +{bossCompletionBonusRuby[index] ?? [100, 150, 200][index]} Ruby
                      </span>
                    </div>
                  </div>
                </FogCard>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CẢNH 3: VỰC SINH TỒN (Level 2 Section) */}
      {isChuyenSau && (
        <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-red-50/40 border-red-200/40' : 'bg-red-500/5 border-red-500/10'}`}>
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-red-800' : 'text-red-400'}`}>
              🛡️ Vực Sinh Tồn (Survival Mode)
            </h3>
          </div>

          <div className="relative">
            <FogCard
              pageId="arena-survival"
              requiredCompletions={1}
              decayDays={7}
              label="Thử thách chưa trải nghiệm"
              onOpenLevel3={() => handleLaunchZone('survival', challengeEnergyCosts[0] ?? 30)}
            >
              <div
                onClick={(e) => { e.stopPropagation(); handleLaunchZone('survival', challengeEnergyCosts[0] ?? 30); }}
                className="glass-panel glass-panel-hover rounded-xl border border-red-500/40 hover:border-red-400 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent p-3 flex flex-col gap-1.5 cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-orbitron font-semibold text-[11px] text-red-400 leading-tight flex-1">⚔️ Trường Thi Sinh Tồn</h4>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-orbitron font-semibold bg-red-500/20 border border-red-500/40 text-red-400 shrink-0">
                    <Zap className="w-2.5 h-2.5 text-red-400 fill-red-400" /> {challengeEnergyCosts[0] ?? 30}
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 leading-snug">
                  15 câu liên tục – sai mất 1 mạng <Heart className="inline w-2.5 h-2.5 text-red-400 fill-red-400" />. Chỉ 3 mạng, đúng liên tiếp x nhân thưởng!
                </p>
                <div className="text-[8px] font-semibold font-orbitron pt-1 text-red-300/70">+1.5× XP & Ruby / Combo multiplier</div>
              </div>
            </FogCard>
          </div>
        </div>
      )}

    </div>
  );
}
