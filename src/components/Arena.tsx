import { useMemo, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { INITIAL_LESSONS } from '../data/lessons';
import { HANG_TRACKS } from '../data/hangLuyenCong';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import {
  Compass, Sword, ShieldAlert, Star, Zap, BookOpen,
  ChevronDown, ChevronUp, ChevronLeft, Skull, Swords, BookMarked, Heart, Volume2
} from 'lucide-react';
import { toast } from '../utils/toast';
import { FogCard } from './FogCard';

interface ArenaProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    bossId?: string
  ) => void;
  onBack: () => void;
  onStudyLesson?: (lessonId: string) => void;
  onStartLessonPractice?: (lessonId: string) => void;
}

export function Arena({ onStartPlay, onBack, onStudyLesson, onStartLessonPractice }: ArenaProps) {
  const player = useGameState(state => state.player);
  const consumeEnergy = useGameState(state => state.useEnergy);
  const { activeSectId } = useSect();
  const bossBountiesVnd = useGameState(state => state.gameSettings.bossBountiesVnd);
  const challengeEnergyCosts = useGameState(state => state.gameSettings.challengeEnergyCosts);
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const questions = useGameState(state => state.questions);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [topicOpen, setTopicOpen] = useState(false);

  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as SubjectId];
  const isChuyenSau = activeSubjectConfig.group === 'chuyen_sau';

  const subjectQuestionCount = useMemo(
    () => questions.filter(q => (q.subject || 'english') === activeSectId).length,
    [questions, activeSectId]
  );

  const handleLaunchZone = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    energyCost: number,
    bossId?: string
  ) => {
    if (subjectQuestionCount === 0) {
      toast.error(`Viện Chủ chưa nạp đề cho môn ${activeSubjectConfig.name}, thử chọn môn khác hoặc quay lại sau.`);
      return;
    }
    if (player.energy < energyCost) {
      toast.error('Hết năng lượng rồi. Nghỉ một nhịp hoặc đánh tiếp ải khác.');
      return;
    }
    consumeEnergy(energyCost);
    onStartPlay(mode, bossId);
  };

  const subjectLessons = INITIAL_LESSONS.filter(l => l.subject === activeSectId);

  const bosses = activeSectId === 'math' ? [
    { id: 'b-2024', name: 'Đại Ca Toán HCMC 2024', tag: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long Toán HCMC 2025', tag: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long Toán HCMC 2026 (Mock)', tag: '2026', energy: 100 }
  ] : activeSectId === 'literature' ? [
    { id: 'b-2024', name: 'Đại Ca Văn HCMC 2024', tag: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long Văn HCMC 2025', tag: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long Văn HCMC 2026 (Mock)', tag: '2026', energy: 100 }
  ] : activeSectId === 'english' ? [
    { id: 'b-2024', name: 'Đại Ca HCMC 2024', tag: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long HCMC 2025', tag: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long HCMC 2026 (Mock)', tag: '2026', energy: 100 }
  ] : [
    { id: 'b-hk1', name: `Khảo Hạch ${activeSubjectConfig.name} - Học Kỳ 1`, tag: 'HK1', energy: 100 },
    { id: 'b-hk2', name: `Khảo Hạch ${activeSubjectConfig.name} - Học Kỳ 2`, tag: 'HK2', energy: 100 }
  ];

  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;
  const progressPct = subjectLessons.length > 0
    ? Math.round((completedLessons / subjectLessons.length) * 100)
    : 0;

  // Build free practice cards list based on subject
  const rankedCards = useMemo(() => {
    if (activeSectId === 'english') {
      return [
        {
          id: 'grammar',
          title: 'Grammar Cave',
          subtitle: 'Ngữ pháp cốt lõi',
          description: 'Bám thì, bị động, mệnh đề quan hệ và viết lại câu ở tốc độ đề thi.',
          icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
          mode: 'grammar' as const,
          reward: 'Ưu tiên grammar + rewrite'
        },
        {
          id: 'vocabulary',
          title: 'Vocabulary Castle',
          subtitle: 'Từ vựng và word form',
          description: 'Luyện bám nghĩa, collocation và ngữ cảnh, tách riêng vocabulary.',
          icon: <BookMarked className="w-8 h-8 text-synth-cyan" />,
          mode: 'vocabulary' as const,
          reward: 'Ưu tiên vocabulary + word form'
        },
        {
          id: 'reading',
          title: 'Reading Forest',
          subtitle: 'Đọc hiểu và cloze',
          description: 'Đi xuyên qua passage, scan keyword, nối ý và xử lý câu đọc hiểu.',
          icon: <Compass className="w-8 h-8 text-synth-cyan" />,
          mode: 'reading' as const,
          reward: 'Ưu tiên reading + cloze'
        },
        {
          id: 'pronunciation',
          title: 'Pronunciation Peak',
          subtitle: 'Phát âm và stress',
          description: 'Bắt đuôi -ed/-s, trọng âm và minimal pairs trong một đường leo riêng.',
          icon: <Volume2 className="w-8 h-8 text-synth-cyan" />,
          mode: 'pronunciation' as const,
          reward: 'Ưu tiên pronunciation + stress'
        }
      ];
    } else if (activeSectId === 'math') {
      return [
        {
          id: 'math-quad',
          title: HANG_TRACKS.math[0].title,
          subtitle: 'Phương trình bậc hai',
          description: HANG_TRACKS.math[0].summary,
          icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
          mode: 'grammar' as const,
          reward: HANG_TRACKS.math[0].focus.join(' · ')
        },
        {
          id: 'math-real',
          title: HANG_TRACKS.math[1].title,
          subtitle: 'Bài toán thực tế',
          description: HANG_TRACKS.math[1].summary,
          icon: <Star className="w-8 h-8 text-synth-cyan" />,
          mode: 'vocabulary' as const,
          reward: HANG_TRACKS.math[1].focus.join(' · ')
        },
        {
          id: 'math-plane',
          title: HANG_TRACKS.math[2].title,
          subtitle: 'Hình học phẳng',
          description: HANG_TRACKS.math[2].summary,
          icon: <Compass className="w-8 h-8 text-synth-cyan" />,
          mode: 'reading' as const,
          reward: HANG_TRACKS.math[2].focus.join(' · ')
        },
        {
          id: 'math-solid',
          title: HANG_TRACKS.math[3].title,
          subtitle: 'Hình học không gian',
          description: HANG_TRACKS.math[3].summary,
          icon: <ShieldAlert className="w-8 h-8 text-synth-cyan" />,
          mode: 'mixed' as const,
          reward: HANG_TRACKS.math[3].focus.join(' · ')
        }
      ];
    } else if (activeSectId === 'literature') {
      return [
        {
          id: 'lit-read',
          title: HANG_TRACKS.literature[0].title,
          subtitle: 'Đọc hiểu văn bản',
          description: HANG_TRACKS.literature[0].summary,
          icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
          mode: 'grammar' as const,
          reward: HANG_TRACKS.literature[0].focus.join(' · ')
        },
        {
          id: 'lit-vn',
          title: HANG_TRACKS.literature[1].title,
          subtitle: 'Tiếng Việt',
          description: HANG_TRACKS.literature[1].summary,
          icon: <BookMarked className="w-8 h-8 text-synth-cyan" />,
          mode: 'reading' as const,
          reward: HANG_TRACKS.literature[1].focus.join(' · ')
        },
        {
          id: 'lit-essay',
          title: HANG_TRACKS.literature[2].title,
          subtitle: 'Viết đoạn và bài nghị luận',
          description: HANG_TRACKS.literature[2].summary,
          icon: <Compass className="w-8 h-8 text-synth-cyan" />,
          mode: 'vocabulary' as const,
          reward: HANG_TRACKS.literature[2].focus.join(' · ')
        },
        {
          id: 'lit-lit',
          title: HANG_TRACKS.literature[3].title,
          subtitle: 'Nghị luận văn học',
          description: HANG_TRACKS.literature[3].summary,
          icon: <Volume2 className="w-8 h-8 text-synth-cyan" />,
          mode: 'mixed' as const,
          reward: HANG_TRACKS.literature[3].focus.join(' · ')
        }
      ];
    } else {
      // Basic subjects
      return [
        {
          id: 'basic-mixed',
          title: `Mixed Practice - ${activeSubjectConfig.name}`,
          subtitle: 'Luyện tập ngẫu nhiên',
          description: `Rèn luyện toàn bộ trọng tâm môn ${activeSubjectConfig.name}.`,
          icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
          mode: 'mixed' as const,
          reward: 'Học tập ngẫu nhiên'
        }
      ];
    }
  }, [activeSectId, activeSubjectConfig]);

  return (
    <div className="space-y-6">
      {/* Header HUD */}
      <div className="flex items-center justify-between gap-3">
        <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
          <Sword className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-magenta'}`} />
          🏛️ Đấu Trường - {activeSubjectConfig.name}
        </h2>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white font-orbitron font-bold text-[10px] uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Trở lại bản đồ
        </button>
      </div>

      {subjectQuestionCount === 0 && (
        <div className="glass-panel rounded-2xl border border-dashed border-white/15 bg-white/5 p-4 text-xs text-slate-300">
          Viện Chủ chưa nạp đề cho môn {activeSubjectConfig.name}. Các ải bên dưới sẽ tạm chưa mở được — thử đổi môn phái ở Thân Phận hoặc quay lại sau.
        </div>
      )}

      {/* CẢNH 1: ĐẤU TRƯỜNG XẾP HẠNG (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-pink-50/40 border-pink-200/40' : 'bg-synth-magenta/5 border-synth-magenta/10'}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className={`font-orbitron font-black text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              🏅 Đấu Trường Xếp Hạng
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
                  <h4 className="font-orbitron font-bold text-sm text-white">🌀 Vào ải ngẫu nhiên</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">10 câu hỏi ngẫu nhiên từ toàn bộ chuyên đề, ưu tiên câu yếu.</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">Phần thưởng: <span className="text-white">+15 XP / +5 NP</span></div>
                </div>
              </div>
            </FogCard>
          </div>

          <div className="relative">
            <FogCard
              pageId="arena-free-revenge"
              requiredCompletions={3}
              decayDays={7}
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
            🐲 Lôi Đài Thần Thú (Boss Battle)
          </h3>
          <p className="text-[10px] text-slate-400">Khảo hạch toàn diện bằng các đề thi thật tuyển sinh/học kỳ các năm trước</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bosses.map((boss, index) => (
            <div key={boss.id} className="relative">
              <FogCard
                pageId={`arena-boss-${boss.id}`}
                requiredCompletions={1}
                decayDays={7}
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
                        ? `Đề thi chuẩn cấu trúc sở GD HCMC năm ${boss.tag}. Chỉ 1 mạng duy nhất!`
                        : `Đề thi ${boss.tag === 'HK1' ? 'Học Kỳ 1' : 'Học Kỳ 2'} lớp 9. Chỉ 1 mạng duy nhất!`}
                    </p>
                  </div>

                  <div className="border-t border-synth-gray/50 pt-3 mt-3 flex justify-between items-center text-xs font-semibold">
                    <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Vàng săn thưởng:</span>
                    <span className={`font-orbitron font-bold flex items-center gap-1 ${isUnicorn ? 'text-violet-700' : 'text-synth-green'}`}>
                      +{(bossBountiesVnd[index] ?? [10000, 15000, 20000][index]).toLocaleString('vi-VN')}đ
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
                    <h4 className="font-orbitron font-black text-sm text-red-400">⚔️ Đấu Trường Sinh Tồn</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    15 câu hỏi hỗn hợp liên tục – trả lời sai mất 1 mạng <Heart className="inline w-3 h-3 text-red-400 fill-red-400" />. Chỉ có 3 mạng, trả lời đúng liên tiếp nhận thưởng cấp số nhân!
                  </p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                    Phần thưởng: <span className="text-red-300">+1.5× XP & NP mỗi câu đúng / Combo multiplier</span>
                  </div>
                </div>
              </div>
            </FogCard>
          </div>
        </div>
      )}

      {/* ─── HẦM NGỤC CHUYÊN ĐỀ ─── */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <button
          onClick={() => setTopicOpen(prev => !prev)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <BookMarked className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-purple'}`} />
            <div className="text-left">
              <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
                Hầm Ngục Chuyên Đề
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Luyện sâu từng chuyên đề · {completedLessons}/{subjectLessons.length} đã lĩnh ngộ
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-synth-cyan to-synth-purple transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400">{progressPct}%</span>
            </div>
            {topicOpen
              ? <ChevronUp className="w-4 h-4 text-slate-400" />
              : <ChevronDown className="w-4 h-4 text-slate-400" />
            }
          </div>
        </button>

        {topicOpen && (
          <div className="border-t border-white/10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectLessons.length === 0 && (
              <div className="col-span-2 text-center text-slate-400 text-sm py-4">
                Môn này chưa có chuyên đề.
              </div>
            )}
            {subjectLessons.map(lesson => {
              const isCompleted = lessonsProgress[lesson.id] || false;
              const stat = categoryStats[lesson.category];
              const accuracy = stat && stat.totalAnswered > 0
                ? Math.round((stat.totalCorrect / stat.totalAnswered) * 100)
                : null;

              return (
                <div
                  key={lesson.id}
                  className={`rounded-xl border p-4 flex flex-col gap-3 transition-all duration-200 ${
                    isCompleted
                      ? 'border-synth-cyan/20 bg-synth-cyan/5'
                      : 'border-white/10 bg-white/4 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        {lesson.topic}
                      </span>
                      <h4 className="font-orbitron font-black uppercase text-xs text-white tracking-wide leading-snug">
                        {lesson.title}
                      </h4>
                    </div>
                    <div className="shrink-0 text-right">
                      {isCompleted ? (
                        <span className="text-[9px] font-bold text-synth-cyan font-orbitron uppercase">Qua ải 🌟</span>
                      ) : (
                        <span className="text-[9px] font-semibold text-slate-400 uppercase">Chưa xong ⏳</span>
                      )}
                      {accuracy !== null && (
                        <div className={`text-[9px] font-bold mt-0.5 ${accuracy >= 70 ? 'text-green-400' : accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {accuracy}% chính xác
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    {onStudyLesson && (
                      <button
                        onClick={e => { e.stopPropagation(); onStudyLesson(lesson.id); }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3 h-3" /> Lý thuyết
                      </button>
                    )}
                    {onStartLessonPractice && (
                      <button
                        onClick={e => { e.stopPropagation(); onStartLessonPractice(lesson.id); }}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isCompleted
                            ? 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                            : 'bg-gradient-to-r from-synth-cyan to-synth-purple text-black shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:scale-[1.02]'
                        }`}
                      >
                        <Swords className="w-3 h-3" /> Luyện tập
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
