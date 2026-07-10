import { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { toast } from '../utils/toast';
import { INITIAL_LESSONS } from '../data/lessons';
import {
  Sword, Mountain, Palmtree, Store, PawPrint, BrainCircuit, ArrowRight
} from 'lucide-react';
import { CORE_KNOWLEDGE_TOPICS, inferTopicId } from '../data/coreKnowledge';
import { getHamForPage } from '../utils/gatekeeper';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG } from '../types/game';

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
  const { activeSectId, setActiveSectId } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const categoryStats = useGameState(state => state.categoryStats);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const parentQuests = useGameState(state => state.parentQuests || []);
  const claimParentQuest = useGameState(state => state.claimParentQuest);
  
  const familyLinks = useGameState(state => state.familyLinks || []);
  const respondInvite = useGameState(state => state.respondInvite);
  const leaveFamily = useGameState(state => state.leaveFamily);

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const subjectLessons = INITIAL_LESSONS.filter(l => l.subject === activeSectId);
  const completedLessons = subjectLessons.filter(l => lessonsProgress[l.id]).length;

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

    return {
      lesson: matchingLesson,
      accuracy: weakTopicItem.accuracy
    };
  }, [pageExplorationStates, categoryStats, activeSectId, subjectLessons]);

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
      blurb: 'Đổi Ngân Lượng lấy Khai Ngộ Quyển, Hộ Tâm Phù, Phong Vị và Phúc Lợi Gia Môn.',
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

      {/* Lời mời kết nối gia đình */}
      {familyLinks.filter(l => l.status === 'pending_student').length > 0 && (
        <div className="glass-panel rounded-2xl border border-synth-magenta/50 bg-gradient-to-r from-synth-magenta/20 to-transparent p-4 space-y-3">
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
                  <p className="text-white">Phụ huynh <strong className="text-synth-cyan">{link.parent_name || 'Chưa có tên'}</strong> muốn kết nối với bạn.</p>
                  <p className="text-xs text-slate-400">ID: {link.parent_id}</p>
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
        </div>
      )}

      {/* Nhiệm Vụ Phụ Huynh Giao (Parent Quests) */}
      {parentQuests.filter((q: any) => q.status !== 'claimed').length > 0 && (
        <div className="glass-panel rounded-2xl border border-synth-magenta/30 bg-black/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-magenta">
              Nhiệm Vụ Phụ Huynh Giao
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
                    <span>💵 +{quest.rewardVND.toLocaleString()}đ</span>
                  </div>
                </div>

                {quest.status === 'completed' && (
                  <button
                    onClick={() => {
                      claimParentQuest(quest.id);
                      toast.success(`Nhận thưởng thành công: +${quest.rewardNP} NP và +${quest.rewardVND.toLocaleString()}đ! 🥳`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-synth-magenta text-white font-orbitron font-bold text-[9px] uppercase tracking-wider cursor-pointer hover:synth-glow-magenta shadow-md"
                  >
                    Nhận Quà 🎁
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5 Module Gate — CORE_SPECS §2.1 */}
      {/* Trạng thái gia đình hiện tại (Học sinh đã có Phụ huynh) */}
      {familyLinks.filter(l => l.status === 'active').length > 0 && (
        <div className="glass-panel rounded-2xl border border-synth-cyan/30 bg-synth-cyan/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍👩‍👧</span>
            <div className="space-y-0.5">
              <p className="font-orbitron font-bold text-xs uppercase text-synth-cyan tracking-wider">Gia Đình Liên Kết</p>
              {familyLinks.filter(l => l.status === 'active').map((link: any) => (
                <p key={link.id} className="text-xs text-slate-300">
                  {link.parent_id ? `Phụ huynh: ${link.parent_name || link.parent_id}` : `Học sinh: ${link.student_name || link.student_id}`}
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
                Rời Phụ Huynh
              </button>
            ))}
          </div>
        </div>
      )}

      <div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
            Bản Đồ Học Viện
          </h3>
          {/* Quick Sect Switcher on Hub */}
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
