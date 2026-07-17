import React, { useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { lessonInScope } from '../utils/learningScope';
import type { Lesson } from '../data/lessons';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import { 
  ChevronLeft, Sparkles, BookOpen, Languages, Calculator, Play
} from 'lucide-react';
import { MarkdownRenderer } from './Common/MarkdownRenderer';

interface LessonStudyViewProps {
  lessonId?: string;
  draftLesson?: any;
  onStartPractice?: (lessonId: string) => void;
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
  draftLesson,
  onStartPractice,
  onBack
}) => {
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const currentSubject = useGameState(state => state.currentSubject);
  const activeGradeTier = useGameState(state => state.activeGradeTier);

  const lesson = useMemo(() => {
    if (draftLesson) return draftLesson as Lesson;
    if (lessonId) return lessons.find(l => l.id === lessonId);
    return null;
  }, [lessons, lessonId, draftLesson]);

  // Chốt chặn: lessonId có thể là ID cũ còn sót sau khi đổi môn/lớp —
  // không render bài giảng lệch ngữ cảnh học tập đang chọn.
  const isWrongContext = !draftLesson && !!lesson && !lessonInScope(lesson, currentSubject, activeGradeTier);

  const isCompleted = lessonId ? (lessonsProgress[lessonId] || false) : false;

  const meta = useMemo(() => {
    if (!lesson) return null;
    return SUBJECT_META[lesson.subject] || {
      label: SUBJECTS_CONFIG[lesson.subject as SubjectId]?.name || lesson.subject,
      accent: 'text-synth-cyan',
      border: 'border-synth-cyan/30',
      bg: 'from-synth-cyan/10 to-synth-purple/5',
      icon: <Sparkles className="w-5 h-5 text-synth-cyan" />
    };
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Navigation Header */}
      {!draftLesson && (
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-orbitron font-bold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Phòng Luyện Tập
        </button>

        {isCompleted && (
          <span className="rounded-full border border-synth-cyan/30 bg-synth-cyan/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-orbitron font-bold shadow-[0_0_12px_rgba(0,240,255,0.15)]">
            Đã Lĩnh Ngộ 🌟
          </span>
        )}
      </div>
      )}

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
            <MarkdownRenderer content={lesson.theory} />
          </div>

          {/* Bottom Actions */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-slate-400 max-w-sm leading-relaxed">
              * Sau khi đọc kỹ bài và tự tin đã nắm rõ kiến thức, con hãy bấm nút dưới đây để làm thử 3 câu hỏi thực tế (Cần chính xác tối thiểu 2/3 câu để lĩnh ngộ thành công bài học).
            </div>

            {onStartPractice && (
              <button
                onClick={() => onStartPractice(lesson?.id || lessonId || '')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
              >
                <Play className="w-4 h-4 fill-black" />
                Đã Lĩnh Ngộ - Luyện Tập Ngay 🌟
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
