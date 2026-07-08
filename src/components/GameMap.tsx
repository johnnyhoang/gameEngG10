import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { INITIAL_LESSONS } from '../data/lessons';
import { HANG_TRACKS } from '../data/hangLuyenCong';
import {
  Compass, Sword, ShieldAlert, Star, Zap, BookOpen,
  ChevronDown, ChevronUp, Skull, Swords, BookMarked, BrainCircuit, Heart, Volume2
} from 'lucide-react';
import { toast } from '../utils/toast';

interface GameMapProps {
  onStartPlay: (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    bossId?: string
  ) => void;
  onOpenMysteryBox: () => void;
  onSpinWheel: () => void;
  onOpenHang: () => void;
  onStudyLesson?: (lessonId: string) => void;
  onStartLessonPractice?: (lessonId: string) => void;
  onOpenRelax?: () => void;
}

export function GameMap({ onStartPlay, onOpenMysteryBox, onSpinWheel, onOpenHang, onStudyLesson, onStartLessonPractice, onOpenRelax }: GameMapProps) {
  const player = useGameState(state => state.player);
  const dailyMission = useGameState(state => state.dailyMission);
  const consumeEnergy = useGameState(state => state.useEnergy);
  const currentSubject = useGameState(state => state.currentSubject);
  const bossBountiesVnd = useGameState(state => state.gameSettings.bossBountiesVnd);
  const challengeEnergyCosts = useGameState(state => state.gameSettings.challengeEnergyCosts);
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const [topicOpen, setTopicOpen] = useState(false);

  // Check if weekend for Lucky Wheel
  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const handleLaunchZone = (
    mode: 'grammar' | 'reading' | 'vocabulary' | 'pronunciation' | 'mixed' | 'revenge' | 'boss' | 'survival',
    energyCost: number,
    bossId?: string
  ) => {
    if (player.energy < energyCost) {
      toast.error('Hết năng lượng rồi. Nghỉ một nhịp hoặc đánh tiếp ải khác.');
      return;
    }
    consumeEnergy(energyCost);
    onStartPlay(mode, bossId);
  };

  // Get lessons for current subject
  const subjectLessons = INITIAL_LESSONS.filter(l => l.subject === currentSubject);

  // Find weakest categories (accuracy < 50%) for AI hint
  const weakCategories = Object.entries(categoryStats)
    .map(([cat, stat]) => ({
      cat,
      accuracy: stat.totalAnswered > 0 ? stat.totalCorrect / stat.totalAnswered : 1
    }))
    .filter(x => x.accuracy < 0.5 && categoryStats[x.cat].totalAnswered >= 2)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 2);

  // Find matching lesson for weak category
  const weakLesson = weakCategories.length > 0
    ? subjectLessons.find(l => l.category === weakCategories[0].cat)
    : null;

  // Hao tổn Chân khí (CORE_SPECS §3.A): Quyết đấu Boss tiêu 100 Chân khí mỗi lượt vào trận.
  const bosses = currentSubject === 'math' ? [
    { id: 'b-2024', name: 'Đại Ca Toán HCMC 2024', year: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long Toán HCMC 2025', year: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long Toán HCMC 2026 (Mock)', year: '2026', energy: 100 }
  ] : currentSubject === 'literature' ? [
    { id: 'b-2024', name: 'Đại Ca Văn HCMC 2024', year: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long Văn HCMC 2025', year: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long Văn HCMC 2026 (Mock)', year: '2026', energy: 100 }
  ] : [
    { id: 'b-2024', name: 'Đại Ca HCMC 2024', year: '2024', energy: 100 },
    { id: 'b-2025', name: 'Cự Long HCMC 2025', year: '2025', energy: 100 },
    { id: 'b-2026', name: 'Cổ Long HCMC 2026 (Mock)', year: '2026', energy: 100 }
  ];

  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;
  const progressPct = subjectLessons.length > 0
    ? Math.round((completedLessons / subjectLessons.length) * 100)
    : 0;

  const questBannerClass = isUnicorn
    ? 'glass-panel rounded-2xl border border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90 p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_10px_28px_rgba(192,132,252,0.12)]'
    : 'glass-panel rounded-2xl border border-synth-magenta/30 bg-gradient-to-r from-synth-magenta/10 via-synth-purple/10 to-transparent p-5 flex flex-col md:flex-row justify-between items-center gap-4';

  return (
    <div className="space-y-6">

      {/* Daily Quest Banner */}
      <div className={questBannerClass}>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isUnicorn ? 'bg-fuchsia-400' : 'bg-synth-magenta'}`} />
            <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              Nhiệm Vụ Chiến Dịch Ngày
            </h2>
          </div>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            {dailyMission?.completed
              ? 'Khá đấy. Hôm nay đã dọn sạch nhiệm vụ. Mở Hòm Bí Mật đi.'
              : 'Dọn xong chỉ tiêu hôm nay thì Hòm Bí Mật và Ví Thưởng sẽ mở.'}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {dailyMission?.completed ? (
            <button
              onClick={onOpenMysteryBox}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 animate-bounce ${
                isUnicorn
                  ? 'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 text-violet-900 shadow-[0_0_15px_rgba(192,132,252,0.35)]'
                  : 'bg-synth-magenta text-black hover:synth-glow-magenta shadow-[0_0_15px_#ff007f]'
              }`}
            >
              Mở Hòm Bí Mật 🎁
            </button>
          ) : (
            <button
              onClick={() => handleLaunchZone('mixed', challengeEnergyCosts[1] ?? 30)}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 text-violet-900 shadow-[0_0_15px_rgba(125,211,252,0.28)]'
                  : 'bg-synth-cyan text-black hover:synth-glow-cyan shadow-[0_0_15px_#00f0ff]'
              }`}
            >
              Vào ải ngẫu nhiên ⚡
            </button>
          )}

          {isWeekend() && (
            <button
              onClick={onSpinWheel}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'bg-gradient-to-r from-fuchsia-200 via-amber-100 to-cyan-200 text-violet-900 shadow-[0_0_15px_rgba(249,168,212,0.25)]'
                  : 'bg-synth-orange text-black hover:synth-glow-orange shadow-[0_0_15px_#ff9f1c]'
              }`}
            >
              Vòng Quay Cuối Tuần 🎡
            </button>
          )}
        </div>
      </div>

      {/* AI Sư Phụ suggestion banner */}
      {weakLesson && (
        <div className="glass-panel rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-transparent p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-orbitron font-bold text-xs uppercase text-amber-300 tracking-wider">Chỉ ải AI</span>
          </div>
          <p className="text-xs text-slate-300 flex-1 leading-relaxed">
            Con đang yếu ở chuyên đề <span className="text-amber-300 font-bold">{weakLesson.title}</span> (chỉ{' '}
            {Math.round((weakCategories[0].accuracy) * 100)}% chính xác). Ôn lại ngay, đừng để lỗ hổng phình ra.
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
        </div>
      )}

      {/* Shortcut Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hang Luyen Cong shortcut */}
        <div className="glass-panel rounded-2xl border border-synth-cyan/30 bg-gradient-to-r from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-synth-cyan animate-ping" />
              <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider">
                Hang Luyện Công
              </h2>
            </div>
            <p className="text-xs text-synth-text-muted">
              Tổng ôn Toán, Văn, Anh bằng bản đồ kiến thức, thẻ nhớ, sổ tay lỗi sai và đường vào phòng luyện nhanh.
            </p>
          </div>

          <button
            onClick={onOpenHang}
            className="w-full py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_#00f0ff]"
          >
            Vào Hang Luyện Công
          </button>
        </div>

        {/* Son Trang Thu Gian shortcut */}
        <div className={`glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 border ${
          isUnicorn 
            ? 'border-violet-200/35 bg-gradient-to-r from-fuchsia-50/20 via-white/10 to-cyan-50/20 shadow-[0_10px_28px_rgba(192,132,252,0.06)]' 
            : 'border-synth-magenta/30 bg-gradient-to-r from-synth-magenta/10 via-synth-purple/10 to-transparent'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-synth-magenta animate-ping" />
              <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider">
                Sơn Trang Thư Giãn
              </h2>
            </div>
            <p className="text-xs text-synth-text-muted">
              Khu vui chơi giải trí nhẹ nhàng, tích hợp flashcards, ghép cặp bài trùng, sơ đồ tư duy sáng tạo và học qua cốt truyện hấp dẫn.
            </p>
          </div>

          <button
            onClick={onOpenRelax}
            className={`w-full py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
              isUnicorn
                ? 'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 text-violet-900 shadow-[0_0_15px_rgba(192,132,252,0.35)]'
                : 'bg-synth-magenta text-black hover:synth-glow-magenta shadow-[0_0_15px_#ff007f]'
            }`}
          >
            Ghé Sơn Trang Thư Giãn 🏝️
          </button>
        </div>
      </div>

      {/* ─── ARENA MODES ─── */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
          <Compass className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-cyan'}`} /> Đấu Trường Tự Do
        </h3>

        {currentSubject === 'english' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                title: 'Grammar Cave',
                subtitle: 'Ngữ pháp cốt lõi',
                description: 'Bám thì, bị động, mệnh đề quan hệ và viết lại câu ở tốc độ đề thi.',
                icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
                mode: 'grammar' as const,
                reward: 'Ưu tiên grammar + rewrite'
              },
              {
                title: 'Vocabulary Castle',
                subtitle: 'Từ vựng và word form',
                description: 'Luyện bám nghĩa, collocation và ngữ cảnh, tách riêng vocabulary khỏi phần còn lại.',
                icon: <BookMarked className="w-8 h-8 text-synth-cyan" />,
                mode: 'vocabulary' as const,
                reward: 'Ưu tiên vocabulary + word form'
              },
              {
                title: 'Reading Forest',
                subtitle: 'Đọc hiểu và cloze',
                description: 'Đi xuyên qua passage, scan keyword, nối ý và xử lý câu hỏi đọc hiểu.',
                icon: <Compass className="w-8 h-8 text-synth-cyan" />,
                mode: 'reading' as const,
                reward: 'Ưu tiên reading + cloze'
              },
              {
                title: 'Pronunciation Peak',
                subtitle: 'Phát âm và stress',
                description: 'Bắt đuôi -ed/-s, trọng âm và minimal pairs trong một đường leo riêng.',
                icon: <Volume2 className="w-8 h-8 text-synth-cyan" />,
                mode: 'pronunciation' as const,
                reward: 'Ưu tiên pronunciation + stress'
              }
            ].map(card => (
              <div
                key={card.title}
                onClick={() => handleLaunchZone(card.mode, challengeEnergyCosts[1] ?? 30)}
                className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.08),transparent_60%)]" />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white">
                  <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-orbitron font-black text-base text-synth-cyan">🏰 {card.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan">English</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{card.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                    Phần thưởng: <span className="text-white">{card.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentSubject === 'math' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                title: HANG_TRACKS.math[0].title,
                subtitle: 'Phương trình bậc hai',
                description: HANG_TRACKS.math[0].summary,
                icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
                mode: 'grammar' as const,
                reward: HANG_TRACKS.math[0].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.math[1].title,
                subtitle: 'Bài toán thực tế',
                description: HANG_TRACKS.math[1].summary,
                icon: <Star className="w-8 h-8 text-synth-cyan" />,
                mode: 'vocabulary' as const,
                reward: HANG_TRACKS.math[1].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.math[2].title,
                subtitle: 'Hình học phẳng',
                description: HANG_TRACKS.math[2].summary,
                icon: <Compass className="w-8 h-8 text-synth-cyan" />,
                mode: 'reading' as const,
                reward: HANG_TRACKS.math[2].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.math[3].title,
                subtitle: 'Hình học không gian',
                description: HANG_TRACKS.math[3].summary,
                icon: <ShieldAlert className="w-8 h-8 text-synth-cyan" />,
                mode: 'mixed' as const,
                reward: HANG_TRACKS.math[3].focus.join(' · ')
              }
            ].map(card => (
              <div
                key={card.title}
                onClick={() => handleLaunchZone(card.mode, challengeEnergyCosts[1] ?? 30)}
                className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.08),transparent_60%)]" />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white">
                  <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-orbitron font-black text-base text-synth-cyan">🏰 {card.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan">Toán</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{card.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                    Phần thưởng: <span className="text-white">{card.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentSubject === 'literature' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              {
                title: HANG_TRACKS.literature[0].title,
                subtitle: 'Đọc hiểu văn bản',
                description: HANG_TRACKS.literature[0].summary,
                icon: <BookOpen className="w-8 h-8 text-synth-cyan" />,
                mode: 'grammar' as const,
                reward: HANG_TRACKS.literature[0].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.literature[1].title,
                subtitle: 'Tiếng Việt',
                description: HANG_TRACKS.literature[1].summary,
                icon: <BookMarked className="w-8 h-8 text-synth-cyan" />,
                mode: 'reading' as const,
                reward: HANG_TRACKS.literature[1].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.literature[2].title,
                subtitle: 'Viết đoạn và bài nghị luận',
                description: HANG_TRACKS.literature[2].summary,
                icon: <Compass className="w-8 h-8 text-synth-cyan" />,
                mode: 'vocabulary' as const,
                reward: HANG_TRACKS.literature[2].focus.join(' · ')
              },
              {
                title: HANG_TRACKS.literature[3].title,
                subtitle: 'Nghị luận văn học',
                description: HANG_TRACKS.literature[3].summary,
                icon: <Volume2 className="w-8 h-8 text-synth-cyan" />,
                mode: 'mixed' as const,
                reward: HANG_TRACKS.literature[3].focus.join(' · ')
              }
            ].map(card => (
              <div
                key={card.title}
                onClick={() => handleLaunchZone(card.mode, challengeEnergyCosts[1] ?? 30)}
                className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/10 via-synth-purple/10 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.08),transparent_60%)]" />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white">
                  <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
                </div>
                <div className="w-14 h-14 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-orbitron font-black text-base text-synth-cyan">🏰 {card.title}</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-synth-cyan/15 border border-synth-cyan/30 text-synth-cyan">Văn</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{card.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
                  <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                    Phần thưởng: <span className="text-white">{card.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Survival Mode – prominent */}
          <div
            onClick={() => handleLaunchZone('survival', challengeEnergyCosts[0] ?? 30)}
            className="glass-panel glass-panel-hover rounded-2xl border border-red-500/40 hover:border-red-400 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300 md:col-span-2"
          >
            {/* glow backdrop */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.07),transparent_60%)]" />
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-red-500/20 border border-red-500/40 text-red-400">
              <Zap className="w-3 h-3 text-red-400 fill-red-400" /> {challengeEnergyCosts[0] ?? 30}
            </div>
            <div className="w-14 h-14 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center justify-center shrink-0">
              <Skull className="w-8 h-8 text-red-400" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-orbitron font-black text-base text-red-400">⚔️ Đấu Trường Sinh Tồn</h4>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-500/20 border border-red-500/30 text-red-300">Survival</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                15 câu hỏi hỗn hợp liên tục – trả lời sai mất 1 mạng <Heart className="inline w-3 h-3 text-red-400 fill-red-400" />. Chỉ có 3 mạng, trả lời đúng liên tiếp nhận thưởng XP và NP tăng theo cấp số nhân!
              </p>
              <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">
                Phần thưởng: <span className="text-red-300">+1.5× XP & NP mỗi câu đúng / Combo multiplier</span>
              </div>
            </div>
          </div>

          {/* Mixed random */}
          <div
            onClick={() => handleLaunchZone('mixed', challengeEnergyCosts[1] ?? 30)}
            className="glass-panel glass-panel-hover rounded-2xl border border-synth-cyan/30 hover:border-synth-cyan bg-gradient-to-br from-synth-cyan/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-cyan/20 text-white">
              <Zap className="w-3 h-3 text-synth-cyan fill-synth-cyan" /> {challengeEnergyCosts[1] ?? 30}
            </div>
            <div className="w-12 h-12 rounded-xl border border-white/5 bg-synth-gray/50 flex items-center justify-center shrink-0">
              <Star className="w-7 h-7 text-synth-cyan" />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="font-orbitron font-bold text-base text-synth-cyan">🌀 Vào ải ngẫu nhiên</h4>
              <p className="text-xs text-slate-400 leading-relaxed">10 câu hỏi ngẫu nhiên từ toàn bộ chuyên đề, ưu tiên câu yếu.</p>
              <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">Phần thưởng: <span className="text-white">+15 XP / +5 NP</span></div>
            </div>
          </div>

          {/* Revenge Dungeon */}
          <div
            onClick={() => handleLaunchZone('revenge', challengeEnergyCosts[2] ?? 30)}
            className="glass-panel glass-panel-hover rounded-2xl border border-synth-orange/30 hover:border-synth-orange bg-gradient-to-br from-synth-orange/5 to-transparent p-5 flex gap-4 cursor-pointer relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-synth-blue border border-synth-orange/20 text-white">
              <Zap className="w-3 h-3 text-synth-orange fill-synth-orange" /> {challengeEnergyCosts[2] ?? 30}
            </div>
            <div className="w-12 h-12 rounded-xl border border-white/5 bg-synth-gray/50 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-synth-orange" />
            </div>
            <div className="space-y-1 min-w-0">
              <h4 className="font-orbitron font-bold text-base text-synth-orange">💀 Sửa sai truy tung</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Tập hợp toàn bộ câu hỏi đã từng làm sai để giải lại và sửa chữa lỗi lầm.</p>
              <div className="text-[10px] font-bold font-orbitron pt-1 text-slate-400">Phần thưởng: <span className="text-white">XP hồi phục / Xoá sai cũ</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TOPIC DUNGEON ─── */}
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
            {/* Progress bar */}
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
                Môn này chưa có chuyên đề. Bổ sung rồi quay lại.
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

      {/* ─── BOSS ARENA ─── */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-magenta'}`}>
          <Sword className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : ''}`} /> Boss Arena (Đề thi thử lớp 10 HCMC)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bosses.map((boss, index) => (
            <div
              key={boss.id}
              onClick={() => handleLaunchZone('boss', boss.energy, boss.id)}
              className={`glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between cursor-pointer relative min-h-[160px] transition-all duration-300 ${
                isUnicorn
                  ? 'border-violet-200/35 hover:border-violet-300 bg-gradient-to-t from-white/80 to-fuchsia-50/60 shadow-[0_14px_30px_rgba(192,132,252,0.1)]'
                  : 'border-synth-magenta/20 hover:border-synth-magenta bg-gradient-to-t from-synth-magenta/5 to-transparent'
              }`}
            >
              <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-orbitron font-bold ${
                isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-magenta/30 text-synth-magenta'
              }`}>
                <Zap className={`w-3 h-3 ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-magenta fill-synth-magenta'}`} /> {boss.energy}
              </div>

              <div className="space-y-2">
                <span className={`text-[10px] font-bold font-orbitron px-2 py-0.5 rounded uppercase ${
                  isUnicorn ? 'bg-fuchsia-100/80 text-violet-700 border border-violet-200/40' : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
                }`}>
                  Độ Khó: Boss
                </span>
                <h4 className={`font-orbitron font-bold text-base ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {boss.name}
                </h4>
                <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
                  Đề thi chuẩn cấu trúc sở GD HCMC năm {boss.year}. Chỉ 1 mạng duy nhất!
                </p>
              </div>

              <div className="border-t border-synth-gray/50 pt-3 mt-3 flex justify-between items-center text-xs font-semibold">
                <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Vàng săn thưởng:</span>
                <span className={`font-orbitron font-bold flex items-center gap-1 ${isUnicorn ? 'text-violet-700' : 'text-synth-green'}`}>
                  +{(bossBountiesVnd[index] ?? [10000, 15000, 20000][index]).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

