import { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { INITIAL_LESSONS } from '../data/lessons';
import {
  Sword, Mountain, Palmtree, Store, PawPrint, BrainCircuit, ArrowRight
} from 'lucide-react';
import { CORE_KNOWLEDGE_TOPICS, inferTopicId } from '../data/coreKnowledge';
import { getHamForPage } from '../utils/gatekeeper';

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

// Worldmap hub (CORE_SPECS §2.1): 5 module chính ngang hàng cho Thiếu Hiệp —
// Đấu Trường, Hang Luyện Công, Sơn Trang Thư Giãn, Bách Hóa Phường, Sân Thú Nuôi.
export function WorldMap({
  onOpenArena, onOpenHang, onOpenRelax, onOpenShop, onOpenPet,
  onOpenMysteryBox, onSpinWheel, onStudyLesson, onStartLessonPractice
}: WorldMapProps) {
  const dailyMission = useGameState(state => state.dailyMission);
  const currentSubject = useGameState(state => state.currentSubject);
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const subjectLessons = INITIAL_LESSONS.filter(l => l.subject === currentSubject);
  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;

  const weakData = useMemo(() => {
    const subjectPageStates = Object.values(pageExplorationStates).filter(state => 
      state.pageId.startsWith(`hang-${currentSubject}-`)
    );

    const sortedPages = [...subjectPageStates].sort((a, b) => {
      const timeA = a.lastExploredAt ? new Date(a.lastExploredAt).getTime() : 0;
      const timeB = b.lastExploredAt ? new Date(b.lastExploredAt).getTime() : 0;
      return timeA - timeB;
    });

    const preferredHam = sortedPages.length > 0 ? getHamForPage(sortedPages[0].pageId) : null;
    const subjectTopics = CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === currentSubject);
    
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

    return {
      lesson: matchingLesson,
      accuracy: weakTopicItem.accuracy
    };
  }, [pageExplorationStates, categoryStats, currentSubject, subjectLessons]);

  const weakLesson = weakData?.lesson ?? null;
  const weakAccuracy = weakData?.accuracy ?? 0;

  const questBannerClass = isUnicorn
    ? 'glass-panel rounded-2xl border border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90 p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_10px_28px_rgba(192,132,252,0.12)]'
    : 'glass-panel rounded-2xl border border-synth-magenta/30 bg-gradient-to-r from-synth-magenta/10 via-synth-purple/10 to-transparent p-5 flex flex-col md:flex-row justify-between items-center gap-4';

  const gates = [
    {
      id: 'arena',
      icon: <Sword className="w-7 h-7" />,
      title: 'Đấu Trường',
      blurb: 'Luyện phản xạ thi cử: Mixed/Skill, Sinh Tồn, Quyết Đấu Boss và Truy Tìm Lỗi Sai.',
      cta: 'Vào Đấu Trường',
      onOpen: onOpenArena,
      accent: 'from-synth-magenta/15 via-synth-purple/10 to-transparent border-synth-magenta/30 text-synth-magenta'
    },
    {
      id: 'hang',
      icon: <Mountain className="w-7 h-7" />,
      title: 'Hang Luyện Công',
      blurb: `Tự học theo chuyên đề, thẻ nhớ và sổ tay lỗi sai. ${completedLessons}/${subjectLessons.length} chuyên đề đã lĩnh ngộ.`,
      cta: 'Vào Hang Luyện Công',
      onOpen: onOpenHang,
      accent: 'from-synth-cyan/15 via-synth-purple/10 to-transparent border-synth-cyan/30 text-synth-cyan'
    },
    {
      id: 'relax',
      icon: <Palmtree className="w-7 h-7" />,
      title: 'Sơn Trang Thư Giãn',
      blurb: 'Minigame tương tác nhẹ nhàng: ghép cặp, sơ đồ tư duy, học qua cốt truyện.',
      cta: 'Ghé Sơn Trang',
      onOpen: onOpenRelax,
      accent: 'from-fuchsia-400/15 via-synth-purple/10 to-transparent border-fuchsia-400/30 text-fuchsia-300'
    },
    {
      id: 'shop',
      icon: <Store className="w-7 h-7" />,
      title: 'Bách Hóa Phường',
      blurb: 'Đổi Ngân Lượng lấy Khai Ngộ Quyển, Hồi Nguyên Đan, Phong Vị và Phúc Lợi Gia Môn.',
      cta: 'Ghé Bách Hóa Phường',
      onOpen: onOpenShop,
      accent: 'from-synth-orange/15 via-amber-400/10 to-transparent border-synth-orange/30 text-synth-orange'
    },
    {
      id: 'pet',
      icon: <PawPrint className="w-7 h-7" />,
      title: 'Sân Thú Nuôi',
      blurb: 'Chăm sóc Heo Maikawaii, xem hành trình tiến hóa và Album Kỷ Niệm.',
      cta: 'Thăm Heo Maikawaii',
      onOpen: onOpenPet,
      accent: 'from-emerald-400/15 via-teal-400/10 to-transparent border-emerald-400/30 text-emerald-300'
    }
  ];

  return (
    <div className="space-y-6">

      {/* Daily Quest Banner */}
      <div className={questBannerClass}>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isUnicorn ? 'bg-fuchsia-400' : 'bg-synth-magenta'}`} />
            <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              Bảng Cáo Thị (Daily Quest)
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
              onClick={onOpenArena}
              className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                isUnicorn
                  ? 'bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 text-violet-900 shadow-[0_0_15px_rgba(125,211,252,0.28)]'
                  : 'bg-synth-cyan text-black hover:synth-glow-cyan shadow-[0_0_15px_#00f0ff]'
              }`}
            >
              Vào Đấu Trường ⚡
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
            <span className="font-orbitron font-bold text-xs uppercase text-amber-300 tracking-wider">Tàng Kinh Các Phân Đà (AI Sư Phụ)</span>
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
        </div>
      )}

      {/* 5 Module Gate — CORE_SPECS §2.1 */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
          Bản Đồ Học Viện
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {gates.map(gate => (
            <button
              key={gate.id}
              onClick={gate.onOpen}
              className={`glass-panel glass-panel-hover rounded-2xl border p-5 flex flex-col justify-between gap-4 text-left cursor-pointer transition-all duration-300 bg-gradient-to-br ${gate.accent}`}
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center">
                  {gate.icon}
                </div>
                <h4 className="font-orbitron font-black text-sm text-white uppercase tracking-wider">
                  {gate.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {gate.blurb}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                {gate.cta} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
