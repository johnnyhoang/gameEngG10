import { useMemo } from 'react';
import { useGameState, DEFAULT_GAME_SETTINGS } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { DEFAULT_GRADE_TIER, SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import {
  Compass, Sword, ShieldAlert, Star, Zap, BookOpen,
  Skull, BookMarked, Heart, Volume2
} from 'lucide-react';
import { toast } from '../utils/toast';
import { FogCard } from './FogCard';

import { isLightTheme } from '../theme/uiThemes';
import { RiddleGames } from '../miniapps/riddle/RiddleGames';

interface ArenaProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    bossId?: string
  ) => void;
}

export function Arena({ onStartPlay }: ArenaProps) {
  const player = useGameState(state => state.player);
  const consumeEnergy = useGameState(state => state.useEnergy);
  const { activeSectId, activeGradeTier } = useSect();
  // Bonus Điểm (Ruby) khi hạ Boss — quảng bá ngay trên Boss Card (CORE_SPECS §2.1). Boss không thưởng tiền.
  const bossCompletionBonusRuby = useGameState(state => state.gameSettings?.bossCompletionBonusRuby ?? DEFAULT_GAME_SETTINGS.bossCompletionBonusRuby);
  const challengeEnergyCosts = useGameState(state => state.gameSettings?.challengeEnergyCosts ?? DEFAULT_GAME_SETTINGS.challengeEnergyCosts);
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);
  const topics = useGameState(state => state.topics);
  const activities = useGameState(state => state.activities);
  const isUnicorn = isLightTheme(uiTheme);

  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as SubjectId];
  const isChuyenSau = activeSubjectConfig.group === 'chuyen_sau';

  const subjectQuestionCount = useMemo(
    () => questions.filter(q =>
      (q.subject || 'english') === activeSectId
      && (q.gradeTier ?? q.grade ?? DEFAULT_GRADE_TIER) === activeGradeTier
    ).length,
    [questions, activeSectId, activeGradeTier]
  );

  const handleLaunchZone = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    energyCost: number,
    bossId?: string
  ) => {
    if (subjectQuestionCount === 0) {
      toast.error(`Viện Trưởng chưa nạp đề cho môn ${activeSubjectConfig.name}, thử chọn môn khác hoặc quay lại sau.`);
      return;
    }
    if (player.energy < energyCost) {
      toast.error('Hết năng lượng rồi. Nghỉ một nhịp hoặc đánh tiếp ải khác.');
      return;
    }
    consumeEnergy(energyCost);
    onStartPlay(mode, bossId);
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
    if (bossActs.length === 0) {
      // Fallback in case no activities loaded yet
      return [
        { id: 'b-2024', name: `Đại Ca - ${activeSubjectConfig.name} 2024`, tag: '2024', energy: bossEnergyCost },
        { id: 'b-2025', name: `Cự Long - ${activeSubjectConfig.name} 2025`, tag: '2025', energy: bossEnergyCost }
      ];
    }
    return bossActs.map(a => ({
      id: a.config?.boss_id || a.id,
      name: a.title,
      tag: a.config?.boss_tag || 'Boss',
      energy: a.config?.energy || bossEnergyCost
    }));
  }, [activities, subjectTopicIds, bossEnergyCost, activeSubjectConfig, activeGradeTier]);

  // Build free practice cards list based on subject activities
  const rankedCards = useMemo(() => {
    const quizActs = activities.filter(a =>
      a.activityType === 'quiz'
      && (a.gradeTier ?? DEFAULT_GRADE_TIER) === activeGradeTier
      && subjectTopicIds.includes(a.topicId)
    );
    if (quizActs.length === 0) {
      // Fallback
      return [
        {
          id: 'grammar',
          title: 'Mixed Practice',
          subtitle: 'Luyện tập ngẫu nhiên',
          description: `Rèn luyện toàn bộ trọng tâm môn ${activeSubjectConfig.name}.`,
          icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
          mode: 'mixed' as const,
          reward: 'Học tập ngẫu nhiên'
        }
      ];
    }
    return quizActs.map(a => {
      const mode = a.config?.mode || 'mixed';
      let icon = <Star className="w-8 h-8 text-synth-cyan" />;
      if (a.id.includes('grammar') || a.id.includes('quad') || a.id.includes('read')) {
        icon = <BookOpen className="w-8 h-8 text-synth-cyan" />;
      } else if (a.id.includes('vocabulary') || a.id.includes('essay')) {
        icon = <BookMarked className="w-8 h-8 text-synth-cyan" />;
      } else if (a.id.includes('reading') || a.id.includes('vn') || a.id.includes('plane')) {
        icon = <Compass className="w-8 h-8 text-synth-cyan" />;
      } else if (a.id.includes('pronunciation') || a.id.includes('lit')) {
        icon = <Volume2 className="w-8 h-8 text-synth-cyan" />;
      }

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
  }, [activities, subjectTopicIds, activeSubjectConfig, activeGradeTier]);

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
          Viện Trưởng chưa nạp đề cho môn {activeSubjectConfig.name}. Các ải bên dưới sẽ tạm chưa mở được — quay lại sau khi có đề.
        </div>
      )}

      {/* CẢNH 1: TRƯỜNG THI XẾP HẠNG (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-pink-50/40 border-pink-200/40' : 'bg-synth-magenta/5 border-synth-magenta/10'}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              🏅 Trường Thi Xếp Hạng
            </h3>
            <p className="text-[10px] text-slate-400">Rèn luyện phản xạ và tốc độ theo các kỹ năng/dạng bài chuyên sâu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankedCards.map(card => (
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
                  className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 h-full"
                >
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white z-10">
                    <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                  </div>
                  <div className="w-14 h-14 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-orbitron font-black text-sm text-synth-cyan">🏰 {card.title}</h4>
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400">{card.subtitle}</div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{card.description}</p>
                    <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                      Phần thưởng: <span className="text-white">{card.reward}</span>
                    </div>
                  </div>
                </div>
              </FogCard>
            </div>
          ))}

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
                className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 h-full"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white z-10">
                  <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-white/5 bg-synth-gray/50 flex items-center justify-center shrink-0">
                  <Star className="w-7 h-7 text-synth-cyan" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="font-orbitron font-bold text-sm text-white">🌀 Luyện tập ngẫu nhiên</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">10 câu hỏi ngẫu nhiên từ toàn bộ chuyên đề, ưu tiên câu yếu.</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">Phần thưởng: <span className="text-white">+15 XP / +5 Ruby</span></div>
                </div>
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
                onClick={(e) => { e.stopPropagation(); handleLaunchZone('revenge', challengeEnergyCosts[2] ?? 30); }}
                className="glass-panel glass-panel-hover rounded-2xl border border-synth-orange/30 hover:border-synth-orange bg-gradient-to-br from-synth-orange/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 h-full"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-orange/20 text-white z-10">
                  <Zap className="w-3 h-3 text-synth-orange fill-synth-orange" /> {challengeEnergyCosts[2] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-white/5 bg-synth-gray/50 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-7 h-7 text-synth-orange" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="font-orbitron font-bold text-sm text-synth-orange">💀 Sửa sai truy tung</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Tập hợp câu hỏi đã làm sai để giải lại và sửa lỗi lầm.</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">Phần thưởng: <span className="text-white">XP hồi phục / Xoá sai</span></div>
                </div>
              </div>
            </FogCard>
          </div>
        </div>
      </div>

      {/* CẢNH 2: LÔI ĐÀI THẦN THÚ (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-violet-50/40 border-violet-200/40' : 'bg-synth-purple/5 border-synth-purple/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            🐗 Lôi Đài Thần Thú (Boss Battle)
          </h3>
          <p className="text-[10px] text-slate-400">Khảo hạch 5 câu trích từ đề thi thật tuyển sinh/học kỳ các năm trước, trong 20 phút</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bosses.map((boss, index) => (
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
                  className={`glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between cursor-pointer relative min-h-[160px] transition-all duration-300 h-full ${
                    isUnicorn
                      ? 'border-violet-200/35 hover:border-violet-300 bg-gradient-to-t from-white/80 to-fuchsia-50/60 shadow-[0_14px_30px_rgba(192,132,252,0.1)]'
                      : 'border-synth-magenta/20 hover:border-synth-magenta bg-gradient-to-t from-synth-magenta/5 to-transparent'
                  }`}
                >
                  <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold z-10 ${
                    isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-magenta/30 text-synth-magenta'
                  }`}>
                    <Zap className={`w-3 h-3 ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-magenta fill-synth-magenta'}`} /> {boss.energy}
                  </div>

                  <div className="space-y-2">
                    <span className={`text-[9px] font-bold font-orbitron px-2 py-0.5 rounded uppercase ${
                      isUnicorn ? 'bg-fuchsia-100/80 text-violet-700 border border-violet-200/40' : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
                    }`}>
                      Độ Khó: Boss
                    </span>
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                      {boss.name}
                    </h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'} leading-relaxed`}>
                      {isChuyenSau
                        ? `Đề thi chuẩn cấu trúc sở GD HCMC năm ${boss.tag}. 5 câu trích đề, sai 3 câu là thua!`
                        : `Đề thi ${boss.tag === 'HK1' ? 'Học Kỳ 1' : 'Học Kỳ 2'} lớp 9. 5 câu trích đề, sai 3 câu là thua!`}
                    </p>
                  </div>

                  <div className="border-t border-synth-gray/50 pt-3 mt-3 flex justify-between items-center text-xs font-semibold">
                    <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Bonus hoàn thành:</span>
                    <span className={`font-orbitron font-bold flex items-center gap-1 ${isUnicorn ? 'text-violet-700' : 'text-synth-green'}`}>
                      +{bossCompletionBonusRuby[index] ?? [100, 150, 200][index]} Ruby
                    </span>
                  </div>
                </div>
              </FogCard>
            </div>
          ))}
        </div>
      </div>

      {/* CẢNH 3: VỰC SINH TỒN (Level 2 Section) */}
      {isChuyenSau && (
        <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-red-50/40 border-red-200/40' : 'bg-red-500/5 border-red-500/10'}`}>
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-red-800' : 'text-red-400'}`}>
              🛡️ Vực Sinh Tồn (Survival Mode)
            </h3>
            <p className="text-[10px] text-slate-400">Thử thách leo tháp sinh tồn cực hạn dưới giới hạn 3 mạng đỏ</p>
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
                className="glass-panel glass-panel-hover rounded-2xl border border-red-500/40 hover:border-red-400 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-red-500/20 border border-red-500/40 text-red-400 z-10">
                  <Zap className="w-3 h-3 text-red-400 fill-red-400" /> {challengeEnergyCosts[0] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center justify-center shrink-0">
                  <Skull className="w-8 h-8 text-red-400" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-orbitron font-black text-sm text-red-400">⚔️ Trường Thi Sinh Tồn</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    15 câu hỏi hỗn hợp liên tục – trả lời sai mất 1 mạng <Heart className="inline w-3 h-3 text-red-400 fill-red-400" />. Chỉ có 3 mạng, trả lời đúng liên tiếp nhận thưởng cấp số nhân!
                  </p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                    Phần thưởng: <span className="text-red-300">+1.5× XP & Ruby mỗi câu đúng / Combo multiplier</span>
                  </div>
                </div>
              </div>
            </FogCard>
          </div>
        </div>
      )}

    </div>
  );
}
