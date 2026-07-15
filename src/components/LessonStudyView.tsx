import React, { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { INITIAL_LESSONS } from '../data/lessons';
import { lessonInScope } from '../utils/learningScope';
import { 
  ChevronLeft, Sparkles, BookOpen, Languages, Calculator, Play
} from 'lucide-react';

interface LessonStudyViewProps {
  lessonId: string;
  onStartPractice: (lessonId: string) => void;
  onBack: () => void;
}

const SUBJECT_META: Record<string, any> = {
  english: {
    label: 'Tiếng Anh',
    accent: 'text-synth-cyan',
    border: 'border-synth-cyan/30',
    bg: 'from-synth-cyan/10 to-synth-purple/5',
    icon: <Languages className="w-5 h-5 text-synth-cyan" />
  },
  math: {
    label: 'Toán Học',
    accent: 'text-synth-magenta',
    border: 'border-synth-magenta/30',
    bg: 'from-synth-magenta/10 to-synth-orange/5',
    icon: <Calculator className="w-5 h-5 text-synth-magenta" />
  },
  literature: {
    label: 'Ngữ Văn',
    accent: 'text-synth-orange',
    border: 'border-synth-orange/30',
    bg: 'from-synth-orange/10 to-synth-cyan/5',
    icon: <BookOpen className="w-5 h-5 text-synth-orange" />
  },
  science: {
    label: 'Khoa Học',
    accent: 'text-synth-green',
    border: 'border-synth-green/30',
    bg: 'from-synth-green/10 to-synth-cyan/5',
    icon: <BookOpen className="w-5 h-5 text-synth-green" />
  }
} as const;

export const LessonStudyView: React.FC<LessonStudyViewProps> = ({
  lessonId,
  onStartPractice,
  onBack
}) => {
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const currentSubject = useGameState(state => state.currentSubject);
  const activeGradeTier = useGameState(state => state.activeGradeTier);

  const lesson = useMemo(() => {
    return lessons.find(l => l.id === lessonId) || INITIAL_LESSONS.find(l => l.id === lessonId);
  }, [lessons, lessonId]);

  // Chốt chặn: lessonId có thể là ID cũ còn sót sau khi đổi môn/lớp —
  // không render bài giảng lệch ngữ cảnh học tập đang chọn.
  const isWrongContext = !!lesson && !lessonInScope(lesson, currentSubject, activeGradeTier);

  const isCompleted = lessonsProgress[lessonId] || false;

  const meta = useMemo(() => {
    if (!lesson) return null;
    return SUBJECT_META[lesson.subject] || SUBJECT_META.english;
  }, [lesson]);

  const parsedContent = useMemo(() => {
    if (!lesson) return [];
    
    // Parse markdown elements line by line
    const lines = lesson.theory.split('\n');
    let insideList = false;
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = (keyPrefix: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${keyPrefix}`} className="list-disc pl-6 space-y-1.5 my-3 text-slate-300">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                {parseInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        insideList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      // Handle list items
      if (trimmed.startsWith('- ')) {
        insideList = true;
        listItems.push(trimmed.substring(2));
        return;
      } else {
        if (insideList) {
          flushList(idx);
        }
      }

      // Handle Headers
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="font-orbitron font-black text-xl md:text-2xl text-white mt-6 mb-3 uppercase tracking-wide border-b border-white/10 pb-2">
            {parseInlineFormatting(trimmed.substring(2))}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="font-orbitron font-bold text-base md:text-lg text-synth-cyan mt-5 mb-2.5 uppercase tracking-wider">
            {parseInlineFormatting(trimmed.substring(3))}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="font-orbitron font-semibold text-sm md:text-base text-white mt-4 mb-2">
            {parseInlineFormatting(trimmed.substring(4))}
          </h3>
        );
      }
      // Handle Blockquotes / Alert Boxes
      else if (trimmed.startsWith('> ')) {
        elements.push(
          <div key={idx} className="my-4 p-4 rounded-xl bg-synth-blue/15 border-l-4 border-synth-cyan text-xs md:text-sm text-slate-200 leading-relaxed italic shadow-[0_4px_12px_rgba(0,240,255,0.03)]">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-synth-cyan shrink-0 mt-0.5" />
              <div>{parseInlineFormatting(trimmed.substring(2))}</div>
            </div>
          </div>
        );
      }
      // Handle Empty lines
      else if (trimmed === '') {
        elements.push(<div key={idx} className="h-3" />);
      }
      // Handle Normal Paragraphs
      else {
        elements.push(
          <p key={idx} className="text-sm md:text-base text-slate-300 mb-3.5 leading-relaxed">
            {parseInlineFormatting(trimmed)}
          </p>
        );
      }
    });

    if (insideList) {
      flushList(lines.length);
    }

    return elements;
  }, [lesson]);

  if (!lesson || !meta) {
    return (
      <div className="text-center py-10 font-orbitron text-synth-cyan">
        Không tìm thấy nội dung bài học.
      </div>
    );
  }

  if (isWrongContext) {
    return (
      <div className="max-w-xl mx-auto text-center py-10 space-y-4">
        <p className="font-orbitron font-bold text-sm text-synth-orange uppercase tracking-wider">
          📚 Bài giảng này thuộc môn/lớp khác
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Bạn vừa chuyển ngữ cảnh học tập nên bài giảng đang mở không còn phù hợp.
          Hãy quay lại chọn bài giảng của môn hiện tại nhé.
        </p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all"
        >
          <ChevronLeft className="w-4 h-4 inline -mt-0.5" /> Quay lại
        </button>
      </div>
    );
  }

  // Parses inline `code` and **bold** text
  function parseInlineFormatting(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let currentIdx = 0;
    
    // Regular expression to match bold (**text**) and inline code (`text`)
    const regex = /(\*\*.*?\*\*|`.*?`|\$\$.*?\$\$|\$.*?\$)/g;
    let match;
    let keyIdx = 0;

    const matches: Array<{ index: number; length: number; text: string }> = [];
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        text: match[0]
      });
    }

    if (matches.length === 0) {
      return [text];
    }

    matches.forEach(m => {
      // Add plain text before match
      if (m.index > currentIdx) {
        parts.push(text.substring(currentIdx, m.index));
      }

      const raw = m.text;
      if (raw.startsWith('**') && raw.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-bold text-white">
            {raw.substring(2, raw.length - 2)}
          </strong>
        );
      } else if (raw.startsWith('`') && raw.endsWith('`')) {
        parts.push(
          <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-synth-gray/30 text-synth-magenta text-xs font-mono font-bold border border-white/5 mx-0.5">
            {raw.substring(1, raw.length - 1)}
          </code>
        );
      } else if (raw.startsWith('$$') && raw.endsWith('$$')) {
        parts.push(
          <div key={keyIdx++} className="my-3 py-2 px-4 rounded-xl bg-black/20 border border-white/5 font-mono text-xs md:text-sm text-center overflow-x-auto text-synth-cyan">
            {raw.substring(2, raw.length - 2)}
          </div>
        );
      } else if (raw.startsWith('$') && raw.endsWith('$')) {
        parts.push(
          <span key={keyIdx++} className="font-mono text-xs md:text-sm text-synth-cyan px-0.5">
            {raw.substring(1, raw.length - 1)}
          </span>
        );
      }

      currentIdx = m.index + m.length;
    });

    if (currentIdx < text.length) {
      parts.push(text.substring(currentIdx));
    }

    return parts;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-orbitron font-bold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Học Đường
        </button>

        {isCompleted && (
          <span className="rounded-full border border-synth-cyan/30 bg-synth-cyan/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-orbitron font-bold shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            Đã Lĩnh Ngộ 🌟
          </span>
        )}
      </div>

      {/* Main Study Card */}
      <section className={`glass-panel rounded-3xl border ${meta.border} p-6 md:p-8 bg-gradient-to-b ${meta.bg} relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-white/5 to-transparent pointer-events-none rounded-full blur-3xl" />
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-orbitron font-bold uppercase tracking-wider text-slate-300">
            {meta.icon}
            {lesson.topic}
          </div>
          
          <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white uppercase tracking-wider leading-tight flex items-center gap-2 flex-wrap">
            {lesson.is_standard && (
              <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-black" title="Bài giảng đạt chuẩn">
                ✓
              </span>
            )}
            <span>{lesson.title}</span>
          </h1>

          {/* Theory parsed container */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 select-text selection:bg-synth-cyan/30 selection:text-white">
            {parsedContent}
          </div>

          {/* Bottom Actions */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-slate-400 max-w-sm leading-relaxed">
              * Sau khi đọc kỹ bài và tự tin đã nắm rõ kiến thức, con hãy bấm nút dưới đây để làm thử 3 câu hỏi thực tế.
            </div>

            <button
              onClick={() => onStartPractice(lessonId)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              <Play className="w-4 h-4 fill-black" />
              Đã Lĩnh Ngộ - Luyện Tập Ngay 🌟
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
