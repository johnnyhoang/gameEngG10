import React, { useEffect, useMemo, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import {
  BookOpen,
  Calculator,
  ExternalLink,
  Languages,
  Layers3,
  LineChart,
  Move3D,
  Target,
  ScrollText,
  NotebookTabs,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  HANG_FLASHCARDS,
  HANG_SOURCES,
  HANG_TRACKS,
  type HangSubjectId
} from '../data/hangLuyenCong';

interface HangLuyenCongProps {
  onStartPractice: () => void;
  onBackToMap: () => void;
  onOpenMatThat3D: () => void;
  onOpenMatThatPlane: () => void;
  onOpenMatThatGraph: () => void;
}

type StudyPanelId = 'flashcards' | 'drill' | 'notes' | 'sources';

const STUDY_PANELS: Array<{
  id: StudyPanelId;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'flashcards', label: 'Thẻ nhớ', icon: <ScrollText className="w-4 h-4" /> },
  { id: 'drill', label: 'Luyện nhanh', icon: <Target className="w-4 h-4" /> },
  { id: 'notes', label: 'Sổ tay', icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: 'sources', label: 'Nguồn', icon: <NotebookTabs className="w-4 h-4" /> }
];

const MAT_THAT_CARDS = [
  {
    id: 'biki3d',
    title: 'Mật thất 3D',
    description: 'Dựng hình không gian, xoay 360°, chọn góc nhìn và đọc lời giải từng bước.',
    icon: <Move3D className="w-5 h-5" />
  },
  {
    id: 'bikiplane',
    title: 'Mật thất Hình học phẳng',
    description: 'Dựng tam giác, đường tròn, đường cao, trung tuyến và các dấu hiệu chứng minh.',
    icon: <Layers3 className="w-5 h-5" />
  },
  {
    id: 'bikigraph',
    title: 'Mật thất Đồ thị hàm số',
    description: 'Slider hệ số, đỉnh parabol, giao điểm và trục đối xứng theo thời gian thực.',
    icon: <LineChart className="w-5 h-5" />
  }
] as const;

const STUDY_PANEL_LABELS: Record<StudyPanelId, string> = {
  flashcards: 'Thẻ nhớ',
  drill: 'Luyện nhanh',
  notes: 'Sổ tay',
  sources: 'Nguồn'
};

const SUBJECT_META: Record<HangSubjectId, {
  label: string;
  shortLabel: string;
  accent: string;
  accentSoft: string;
  icon: React.ReactNode;
}> = {
  english: {
    label: 'Tiếng Anh',
    shortLabel: 'Anh',
    accent: 'text-synth-cyan',
    accentSoft: 'from-synth-cyan/20 to-synth-purple/10',
    icon: <Languages className="w-5 h-5" />
  },
  math: {
    label: 'Toán',
    shortLabel: 'Toán',
    accent: 'text-synth-magenta',
    accentSoft: 'from-synth-magenta/20 to-synth-orange/10',
    icon: <Calculator className="w-5 h-5" />
  },
  literature: {
    label: 'Ngữ Văn',
    shortLabel: 'Văn',
    accent: 'text-synth-orange',
    accentSoft: 'from-synth-orange/20 to-synth-cyan/10',
    icon: <BookOpen className="w-5 h-5" />
  }
};

export const HangLuyenCong: React.FC<HangLuyenCongProps> = ({
  onStartPractice,
  onBackToMap,
  onOpenMatThat3D,
  onOpenMatThatPlane,
  onOpenMatThatGraph
}) => {
  const currentSubject = useGameState(state => state.currentSubject);
  const setSubject = useGameState(state => state.setSubject);
  const questions = useGameState(state => state.questions);

  const [selectedSubject, setSelectedSubject] = useState<HangSubjectId>(currentSubject);
  const [selectedStudyPanel, setSelectedStudyPanel] = useState<StudyPanelId>('flashcards');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    setSelectedSubject(currentSubject);
  }, [currentSubject]);

  useEffect(() => {
    const saved = localStorage.getItem('gameengg10-hang-notes');
    if (saved) setNoteText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('gameengg10-hang-notes', noteText);
  }, [noteText]);

  const subjectQuestions = useMemo(() => {
    return questions.filter(q => (q.subject || 'english') === selectedSubject);
  }, [questions, selectedSubject]);

  const subjectCount = subjectQuestions.length;

  const sampleQuestions = useMemo(() => {
    const allowedCategories: Record<HangSubjectId, string[]> = {
      english: ['grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress'],
      math: ['parabol-line', 'viet-relation', 'real-equations', 'real-geometry', 'real-finance', 'plane-geometry'],
      literature: ['literature-vietnamese', 'literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument', 'literature-writing']
    };

    return subjectQuestions.filter(q => allowedCategories[selectedSubject].includes(q.category)).slice(0, 3);
  }, [selectedSubject, subjectQuestions]);

  const activeFlashcards = useMemo(() => {
    return HANG_FLASHCARDS.filter(card => card.subject === selectedSubject);
  }, [selectedSubject]);

  const currentFlashcard = activeFlashcards[flashcardIndex % activeFlashcards.length];
  const meta = SUBJECT_META[selectedSubject];

  const handleSelectSubject = (subject: HangSubjectId) => {
    setSelectedSubject(subject);
    setSubject(subject);
    setFlashcardIndex(0);
  };

  const handleStart = () => {
    setSubject(selectedSubject);
    onStartPractice();
  };

  const subjectTotals = {
    english: questions.filter(q => (q.subject || 'english') === 'english').length,
    math: questions.filter(q => q.subject === 'math').length,
    literature: questions.filter(q => q.subject === 'literature').length
  };

  const wizardSteps = [
    {
      step: '01',
      title: 'Chọn môn',
      body: `Hiện đang chọn ${meta.label}.`
    },
    {
      step: '02',
      title: 'Chọn mật thất',
      body: 'Bấm vào 1 mật thất để mở trang riêng, không làm dồn layout.'
    },
    {
      step: '03',
      title: 'Chọn công cụ',
      body: `Tab đang mở: ${STUDY_PANEL_LABELS[selectedStudyPanel]}.`
    }
  ] as const;

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-3xl border border-synth-cyan/20 p-5 md:p-8 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.10),transparent_32%)]">
        <div className="flex flex-col gap-5">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-synth-cyan/30 bg-synth-blue/40 text-[10px] font-orbitron font-bold uppercase tracking-[0.24em] text-synth-cyan">
              <Sparkles className="w-3.5 h-3.5" />
              Hang Luyện Công
            </div>
            <div className="space-y-2">
              <h1 className="font-orbitron font-black text-2xl md:text-5xl uppercase tracking-wider text-white leading-tight">
                Ôn toàn bộ kiến thức vào lớp 10
              </h1>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-3xl">
                Một phòng luyện hợp nhất cho Toán, Văn, Anh. Mỗi môn có bản đồ kiến thức, thẻ nhớ, bài luyện nhanh và sổ tay lỗi sai để con ôn tập theo cách phù hợp nhất.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_18px_rgba(0,240,255,0.35)] hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Vào luyện ngay <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBackToMap}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Trở lại bản đồ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(subjectTotals).map(([subject, total]) => {
              const key = subject as HangSubjectId;
              const item = SUBJECT_META[key];
              return (
                <button
                  key={subject}
                  onClick={() => handleSelectSubject(key)}
                  className={`rounded-2xl border p-4 text-left bg-gradient-to-br ${item.accentSoft} transition-all duration-200 cursor-pointer ${
                    selectedSubject === key ? 'border-white/30 shadow-[0_0_18px_rgba(255,255,255,0.08)] scale-[1.01]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`flex items-center gap-2 font-orbitron font-black uppercase ${item.accent}`}>
                    {item.icon}
                    <span className="text-[11px]">{item.shortLabel}</span>
                  </div>
                  <div className="mt-3 text-2xl font-black text-white">{total}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-300">câu hiện có</div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {wizardSteps.map(item => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-synth-cyan font-bold">
                  Bước {item.step}
                </div>
                <div className="mt-2 font-orbitron font-black uppercase tracking-wider text-white text-sm">
                  {item.title}
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl border border-white/10 p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-wrap mb-4">
          <div>
            <h2 className="font-orbitron font-black text-lg md:text-xl text-white uppercase tracking-wider">
              Mật thất nhanh
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Chọn đúng mật thất rồi vào thẳng không gian học riêng, tránh bị dồn chung trong một layout.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full border border-synth-cyan/30 bg-synth-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-bold">
              Đang xem: {meta.label}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-300 font-bold">
              Công cụ: {STUDY_PANEL_LABELS[selectedStudyPanel]}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {MAT_THAT_CARDS.map(card => {
            const onOpen = card.id === 'biki3d'
              ? onOpenMatThat3D
              : card.id === 'bikiplane'
                ? onOpenMatThatPlane
                : onOpenMatThatGraph;
            return (
              <button
                key={card.id}
                onClick={onOpen}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:border-synth-cyan/30 hover:bg-white/7 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 font-orbitron font-black uppercase tracking-wider text-white">
                    {card.icon}
                    {card.title}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-synth-cyan">
                  Mở mật thất
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5 md:gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl border border-white/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-orbitron font-black text-lg text-white uppercase tracking-wider">
                  Bản đồ kiến thức - {meta.label}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  {subjectCount} câu hỏi sẵn có trong kho đề và 4 mảng trọng tâm cần nắm.
                </p>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-gradient-to-r ${meta.accentSoft} text-xs font-bold ${meta.accent}`}>
                <Target className="w-4 h-4" />
                {meta.label} hiện tại
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HANG_TRACKS[selectedSubject].map(track => (
                <div key={track.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className={`text-sm font-orbitron font-black uppercase tracking-wider ${meta.accent}`}>
                    {track.title}
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{track.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {track.focus.map(item => (
                      <span key={item} className="px-2.5 py-1 rounded-full bg-synth-blue/40 border border-white/10 text-[10px] font-semibold text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {sampleQuestions.length > 0 ? sampleQuestions.map(question => (
              <div key={question.id} className="rounded-2xl border border-white/10 bg-synth-gray/20 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <span>{question.category}</span>
                  <span>{question.difficulty}/10</span>
                </div>
                {question.imageUrl && (
                  <div className="flex justify-center bg-synth-gray/10 rounded-xl p-2 max-h-[80px] overflow-hidden border border-white/5">
                    <img 
                      src={question.imageUrl} 
                      className="rounded max-h-[60px] object-contain" 
                      alt="Preview" 
                    />
                  </div>
                )}
                <p className="text-sm text-white leading-relaxed max-h-24 overflow-hidden">
                  {question.prompt}
                </p>
                <div className="mt-auto text-[10px] text-slate-400">
                  Nguồn: {question.source}
                </div>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-slate-300">
                Chưa có câu hỏi cho môn này trong kho hiện tại.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24">
          <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-white">
                <NotebookTabs className="w-5 h-5 text-synth-cyan" />
                <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Bảng công cụ</h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400 font-bold">
                1 công cụ / lúc
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {STUDY_PANELS.map(panel => {
                const isActive = selectedStudyPanel === panel.id;
                return (
                  <button
                    key={panel.id}
                    onClick={() => setSelectedStudyPanel(panel.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan'
                        : 'border-white/10 bg-white/5 text-white hover:border-white/20'
                    }`}
                  >
                    {panel.icon}
                    {panel.label}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-white/10 bg-synth-gray/20 p-4 space-y-4">
              {selectedStudyPanel === 'flashcards' && currentFlashcard && (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-white">
                      <ScrollText className="w-5 h-5 text-synth-magenta" />
                      <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Thẻ nhớ tốc hành</h3>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {flashcardIndex + 1}/{activeFlashcards.length}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-transparent p-4 min-h-[180px] flex flex-col justify-between gap-4">
                    <div className="text-xs font-bold text-synth-cyan uppercase tracking-wider">
                      {SUBJECT_META[currentFlashcard.subject].label}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white leading-relaxed">
                        {currentFlashcard.front}
                      </p>
                      <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                        {currentFlashcard.back}
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 border-t border-white/10 pt-3">
                      {currentFlashcard.note}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setFlashcardIndex(prev => Math.max(0, prev - 1))}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Trước
                    </button>
                    <button
                      onClick={() => setFlashcardIndex(prev => prev + 1)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Sau
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {selectedStudyPanel === 'drill' && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-synth-orange" />
                    <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Phòng luyện nhanh</h3>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Chuyển sang chế độ luyện hiện tại của kho câu hỏi. Đây là đường ngắn nhất từ ôn tập sang kiểm tra mức độ nắm bài.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span>Kho đề hiện tại</span>
                      <span className="font-bold text-white">{subjectCount} câu</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span>Môn đang chọn</span>
                      <span className={`font-bold ${meta.accent}`}>{meta.label}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleStart}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-synth-orange to-synth-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Bắt đầu luyện <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {selectedStudyPanel === 'notes' && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-5 h-5 text-synth-green" />
                    <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Sổ tay lỗi sai</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ghi đúng một việc cần sửa, không ghi lan man. Mỗi lỗi nên có 1 dòng: sai ở đâu, vì sao sai, lần sau làm thế nào.
                  </p>
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Ví dụ: nhầm passive voice với active voice; cần nhìn mốc thời gian trước..."
                    className="w-full min-h-[180px] rounded-2xl border border-white/10 bg-synth-gray/25 p-4 text-sm text-white outline-none focus:border-synth-cyan/40 resize-y"
                  />
                </>
              )}

              {selectedStudyPanel === 'sources' && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-synth-cyan" />
                    <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Nguồn học liệu</h3>
                  </div>
                  <div className="space-y-3">
                    {HANG_SOURCES.map(source => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl border border-white/10 bg-white/5 p-3 hover:border-synth-cyan/30 transition-colors"
                      >
                        <div className="text-xs font-bold text-white">{source.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">{source.note}</div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};
