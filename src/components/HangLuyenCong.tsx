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
   NotebookTabs,
   Sparkles,
   ArrowRight,
   CheckCircle2
} from 'lucide-react';
import {
   HANG_SOURCES
} from '../data/hangLuyenCong';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId, HamNguyenTo } from '../types/game';
import { useSect } from '../contexts/SectContext';
import { filterLessonsInScope, filterQuestionsInScope } from '../utils/learningScope';
import type { Lesson } from '../data/lessons';
import { FogCard } from './FogCard';
import { FullscreenModal } from './Common/FullscreenModal';
import { LessonStudyView } from './LessonStudyView';
import { getSubjectActivities, getSubjectToolIds } from '../subject-modules/registry';
import { DUNGEONS_CONFIG, enrichTextbookAttributes, getDungeonConfig } from '../utils/textbookEnricher';

const getElementalDungeon = (lesson: Lesson): HamNguyenTo => {
  if (lesson.hamNguyenTo) return lesson.hamNguyenTo;
  return enrichTextbookAttributes(lesson.id, lesson.category, lesson.subject).hamNguyenTo;
};

interface HangLuyenCongProps {
   onStartPractice: () => void;
   onStudyLesson: (lessonId: string) => void;
   onOpenMatThat3D: () => void;
   onOpenMatThatPlane: () => void;
   onOpenMatThatGraph: () => void;
   onStartLessonPractice?: (lessonId: string) => void;
}

type HangSubjectId = SubjectId;

const MAT_THAT_CARDS = [
  {
    id: 'biki3d',
    title: 'Xưởng Toán Hình 3D',
    description: 'Dựng hình không gian, xoay 360°, chọn góc nhìn và đọc lời giải từng bước.',
    icon: <Move3D className="w-5 h-5" />
  },
  {
    id: 'bikiplane',
    title: 'Xưởng Toán Hình',
    description: 'Dựng tam giác, đường tròn, đường cao, trung tuyến và các dấu hiệu chứng minh.',
    icon: <Layers3 className="w-5 h-5" />
  },
  {
    id: 'bikigraph',
    title: 'Xưởng Toán Đồ Thị',
    description: 'Slider hệ số, đỉnh parabol, giao điểm và trục đối xứng theo thời gian thực.',
    icon: <LineChart className="w-5 h-5" />
  }
] as const;

const SUBJECT_META: Record<string, any> = {
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
  },
  science: {
    label: 'Khoa Học Tự Nhiên',
    shortLabel: 'KHTN',
    accent: 'text-emerald-400',
    accentSoft: 'from-emerald-500/20 to-teal-500/10',
    icon: <Sparkles className="w-5 h-5" />
  },
  history_geography: {
    label: 'Lịch Sử & Địa Lý',
    shortLabel: 'Sử Địa',
    accent: 'text-amber-400',
    accentSoft: 'from-amber-500/20 to-orange-500/10',
    icon: <NotebookTabs className="w-5 h-5" />
  },
  civics: {
    label: 'Giáo Dục Công Dân',
    shortLabel: 'GDCD',
    accent: 'text-blue-400',
    accentSoft: 'from-blue-500/20 to-indigo-500/10',
    icon: <Target className="w-5 h-5" />
  },
  technology: {
    label: 'Công Nghệ',
    shortLabel: 'CN',
    accent: 'text-indigo-400',
    accentSoft: 'from-indigo-500/20 to-cyan-500/10',
    icon: <Calculator className="w-5 h-5" />
  },
  informatics: {
    label: 'Tin Học',
    shortLabel: 'Tin',
    accent: 'text-cyan-400',
    accentSoft: 'from-cyan-500/20 to-blue-500/10',
    icon: <Layers3 className="w-5 h-5" />
  },
  arts: {
    label: 'Nghệ Thuật',
    shortLabel: 'Arts',
    accent: 'text-fuchsia-400',
    accentSoft: 'from-fuchsia-500/20 to-pink-500/10',
    icon: <BookOpen className="w-5 h-5" />
  }
};

const DEFAULT_TRACK = {
  tag: 'Luyện tập tổng hợp và củng cố kiến thức',
  title: 'Học Đường: Rèn luyện chuyên sâu kiến thức môn học',
  description: 'Hệ thống câu hỏi và bài giảng được thiết kế để củng cố toàn diện kỹ năng và lý thuyết của môn học.',
  focusLabel: 'Trọng tâm ôn tập',
  focusPoints: [
    'Luyện tập các dạng bài từ cơ bản đến nâng cao',
    'Xem lý thuyết chi tiết tích hợp kèm theo bài giảng',
    'Nhận diện nhanh cấu trúc câu hỏi đề thi'
  ],
  lessonTitle: 'Bài giảng lý thuyết',
  lessonDescription: 'Nắm vững cốt lõi kiến thức trước khi bước vào phòng rèn luyện.',
  sampleTitle: 'Đề mẫu tiêu biểu',
  sampleDescription: 'Khảo sát nhanh với các dạng bài xuất hiện thường xuyên trong ngân hàng câu hỏi.',
  toolTitle: 'Công cụ học tập',
  toolDescription: 'Các công cụ bổ trợ học tập giúp nâng cao hiệu quả học tập.',
  notePlaceholder: 'Ghi chép đèn sách của con sau buổi học này...'
};

const SUBJECT_TRACKS: Partial<Record<HangSubjectId, {
  tag: string;
  title: string;
  description: string;
  focusLabel: string;
  focusPoints: string[];
  lessonTitle: string;
  lessonDescription: string;
  sampleTitle: string;
  sampleDescription: string;
  toolTitle: string;
  toolDescription: string;
  notePlaceholder: string;
}>> = {
  math: {
    tag: 'Toán - công thức, dạng bài, thực chiến',
    title: 'Track Toán: giải nhanh, trình bày gọn, tránh lỗi công thức',
    description: 'Tách riêng phần đại số, hình học, đồ thị và bài toán thực tế để con luyện đúng nhịp, đúng dạng, đúng cách trình bày.',
    focusLabel: 'Trọng tâm Toán',
    focusPoints: [
      'Bấm đúng công thức, khai triển đúng bước, trình bày ngắn mà đủ ý',
      'Tách riêng đại số, hình học, đồ thị và bài thực tế',
      'Luyện theo dạng để nhận diện đề nhanh hơn trước khi làm'
    ],
    lessonTitle: 'Chuyên đề Toán',
    lessonDescription: 'Ôn lý thuyết theo từng mảng kiến thức rồi mới nhảy sang câu luyện.',
    sampleTitle: 'Câu mẫu Toán',
    sampleDescription: 'Xem nhanh các câu đại diện cho dạng bài, mức độ và nguồn ra đề.',
    toolTitle: 'Bảng công cụ Toán',
    toolDescription: 'Chọn một công cụ luyện duy nhất ở mỗi lượt để tránh loãng nhịp học.',
    notePlaceholder: 'Ví dụ: quên điều kiện xác định; viết thiếu bước biến đổi; nhầm dấu khi khai triển...'
  },
  literature: {
    tag: 'Ngữ văn - đọc hiểu, nghị luận, dẫn chứng',
    title: 'Track Văn: đọc đúng, viết đúng, chạm rubric',
    description: 'Chia rõ đọc hiểu, nghị luận xã hội và nghị luận văn học để con luyện cách trả lời, lập luận và dùng dẫn chứng theo thang chấm.',
    focusLabel: 'Trọng tâm Văn',
    focusPoints: [
      'Đọc hiểu theo câu hỏi, trả lời ngắn gọn nhưng đúng trọng tâm',
      'Nghị luận có bố cục rõ, luận điểm mạch lạc, dẫn chứng phù hợp',
      'Luyện cách trình bày để không bị mất điểm vì diễn đạt hoặc thiếu ý'
    ],
    lessonTitle: 'Chuyên đề Văn',
    lessonDescription: 'Ôn từng mảng nội dung, sau đó nối sang cách viết và cách chấm.',
    sampleTitle: 'Câu mẫu Văn',
    sampleDescription: 'Bộ câu đại diện cho các kiểu đọc hiểu và viết đoạn/bài trong đề thật.',
    toolTitle: 'Bảng công cụ Văn',
    toolDescription: 'Ghi lỗi sai, chốt bố cục, kiểm tra dẫn chứng trước khi nộp bài.',
    notePlaceholder: 'Ví dụ: mở bài dài nhưng thiếu luận điểm; dẫn chứng chung chung; chưa bám yêu cầu câu hỏi...'
  },
  english: {
    tag: 'Tiếng Anh - ngữ pháp, đọc hiểu, biến đổi câu',
    title: 'Track Anh: tách ngữ pháp, đọc hiểu và viết lại câu',
    description: 'Chia riêng từng cụm kỹ năng để con học theo đúng kiểu đề: ngữ pháp, từ vựng, đọc hiểu, viết lại câu và phát âm.',
    focusLabel: 'Trọng tâm Anh',
    focusPoints: [
      'Nhìn nhanh cấu trúc để khoanh đúng dạng ngữ pháp và từ vựng',
      'Tách phần đọc hiểu và viết lại câu thành bài luyện riêng',
      'Ghi lỗi sai theo mẫu để tránh lặp lại bẫy đề'
    ],
    lessonTitle: 'Chuyên đề Anh',
    lessonDescription: 'Ôn lý thuyết theo nhóm dạng rồi mới chuyển sang câu luyện.',
    sampleTitle: 'Câu mẫu Anh',
    sampleDescription: 'Mỗi câu đại diện cho một nhóm dạng thường gặp trong đề thi.',
    toolTitle: 'Bảng công cụ Anh',
    toolDescription: 'Dùng luyện nhanh, sổ tay và nguồn tài liệu theo đúng thứ tự.',
    notePlaceholder: 'Ví dụ: nhầm thì, nhầm mạo từ, chọn sai dạng word form, thiếu từ trong rewrite...'
  },
  science: {
    tag: 'KHTN - lý thuyết, thí nghiệm, thực hành',
    title: 'Track KHTN: tích hợp Vật lý, Hóa học, Sinh học',
    description: 'Nắm chắc kiến thức cốt lõi lớp 9, hiểu hiện tượng tự nhiên và công thức cơ bản.',
    focusLabel: 'Trọng tâm KHTN',
    focusPoints: [
      'Hiểu bản chất hiện tượng Vật lý, Hóa học, Sinh học',
      'Ghi nhớ công thức tính toán cơ bản và bảng tuần hoàn',
      'Ứng dụng kiến thức giải thích đời sống'
    ],
    lessonTitle: 'Chuyên đề KHTN',
    lessonDescription: 'Học lý thuyết tích hợp trước khi thực hành trả lời.',
    sampleTitle: 'Câu mẫu KHTN',
    sampleDescription: 'Bộ câu hỏi mẫu cho 3 phân môn KHTN.',
    toolTitle: 'Công cụ KHTN',
    toolDescription: 'Tập trung luyện tập lý thuyết và bài tập.',
    notePlaceholder: 'Ví dụ: nhầm công thức thấu kính, quên cân bằng phương trình hóa học...'
  },
  history_geography: {
    tag: 'Sử Địa - dòng sự kiện, bản đồ, số liệu',
    title: 'Track Sử Địa: mốc thời gian và phân tích lược đồ',
    description: 'Học Sử qua câu chuyện, Địa qua bản đồ và số liệu thực tế lớp 9.',
    focusLabel: 'Trọng tâm Sử Địa',
    focusPoints: [
      'Ghi nhớ các mốc sự kiện lịch sử Việt Nam và thế giới',
      'Đọc hiểu bản đồ địa lý, biểu đồ số liệu tự nhiên',
      'Rèn luyện kỹ năng phân tích mối liên hệ nhân quả'
    ],
    lessonTitle: 'Chuyên đề Sử Địa',
    lessonDescription: 'Nắm vững dòng lịch sử và kiến thức địa lý.',
    sampleTitle: 'Câu mẫu Sử Địa',
    sampleDescription: 'Câu hỏi kiểm tra mốc lịch sử và phân tích địa lý.',
    toolTitle: 'Công cụ Sử Địa',
    toolDescription: 'Học tập bằng sơ đồ tư duy và dữ liệu bản đồ.',
    notePlaceholder: 'Ví dụ: nhớ sai mốc thời gian sự kiện, đọc nhầm biểu đồ nhiệt độ lượng mưa...'
  },
  civics: {
    tag: 'GDCD - pháp luật, đạo đức, quyền công dân',
    title: 'Track GDCD: tình huống pháp luật lớp 9',
    description: 'Phân tích các tình huống đạo đức và pháp luật thực tế gần gũi.',
    focusLabel: 'Trọng tâm GDCD',
    focusPoints: [
      'Nắm chắc quyền và nghĩa vụ công dân cơ bản',
      'Phân biệt các hành vi đạo đức và vi phạm pháp luật',
      'Giải quyết tình huống thực tế thường gặp'
    ],
    lessonTitle: 'Chuyên đề GDCD',
    lessonDescription: 'Học lý thuyết chuẩn mực đạo đức và pháp luật.',
    sampleTitle: 'Câu mẫu GDCD',
    sampleDescription: 'Các tình huống trắc nghiệm pháp luật.',
    toolTitle: 'Công cụ GDCD',
    toolDescription: 'Ôn luyện chuẩn kiến thức.',
    notePlaceholder: 'Ví dụ: nhầm lẫn giữa nghĩa vụ và quyền lợi...'
  },
  technology: {
    tag: 'Công nghệ - an toàn điện, quy trình kỹ thuật',
    title: 'Track Công nghệ: mạch điện gia đình và đời sống',
    description: 'Hiểu nguyên lý hoạt động của thiết bị và quy trình kỹ thuật an toàn.',
    focusLabel: 'Trọng tâm Công nghệ',
    focusPoints: [
      'Nhận diện các thiết bị điện và sơ đồ mạch điện',
      'Hiểu quy trình kỹ thuật lắp ráp, nuôi trồng cơ bản',
      'Áp dụng quy tắc an toàn lao động'
    ],
    lessonTitle: 'Chuyên đề Công nghệ',
    lessonDescription: 'Ôn tập lý thuyết kỹ thuật.',
    sampleTitle: 'Câu mẫu Công nghệ',
    sampleDescription: 'Câu hỏi sơ đồ mạch điện và thiết bị.',
    toolTitle: 'Công cụ Công nghệ',
    toolDescription: 'Luyện câu hỏi thực hành lý thuyết.',
    notePlaceholder: 'Ví dụ: đọc sai sơ đồ lắp đặt, nhầm công dụng cầu chì...'
  },
  informatics: {
    tag: 'Tin học - thuật toán, tin học văn phòng, internet',
    title: 'Track Tin học: tư duy lập trình và sử dụng máy tính',
    description: 'Rèn luyện tư duy thuật toán lớp 9, sử dụng phần mềm và mạng internet an toàn.',
    focusLabel: 'Trọng tâm Tin học',
    focusPoints: [
      'Hiểu cấu trúc rẽ nhánh, lặp trong lập trình cơ bản',
      'Sử dụng các công cụ văn phòng và tìm kiếm thông tin',
      'Nguyên tắc bảo mật thông tin cá nhân trên mạng'
    ],
    lessonTitle: 'Chuyên đề Tin học',
    lessonDescription: 'Học lý thuyết thuật toán và phần cứng/mạng.',
    sampleTitle: 'Câu mẫu Tin học',
    sampleDescription: 'Các đoạn code mẫu và câu hỏi tin học.',
    toolTitle: 'Công cụ Tin học',
    toolDescription: 'Tải tài liệu và ôn luyện.',
    notePlaceholder: 'Ví dụ: nhầm lẫn điều kiện dừng vòng lặp, hiểu sai khái niệm IP/DNS...'
  },
  arts: {
    tag: 'Nghệ thuật - nhạc lý, phối màu, mỹ thuật',
    title: 'Track Nghệ thuật: nhạc lý cơ bản và phối màu mỹ thuật',
    description: 'Tìm hiểu về lịch sử âm nhạc, mỹ thuật, nhạc lý và bố cục màu sắc.',
    focusLabel: 'Trọng tâm Nghệ thuật',
    focusPoints: [
      'Ghi nhớ nhạc lý cơ bản và tác giả tác phẩm tiêu biểu',
      'Phân biệt gam màu, bố cục tạo hình mỹ thuật',
      'Cảm thụ văn hóa nghệ thuật dân tộc và thế giới'
    ],
    lessonTitle: 'Chuyên đề Nghệ thuật',
    lessonDescription: 'Kiến thức nhạc lý và lý thuyết mỹ thuật.',
    sampleTitle: 'Câu mẫu Nghệ thuật',
    sampleDescription: 'Nhận diện nốt nhạc và phân tích tranh vẽ.',
    toolTitle: 'Công cụ Nghệ thuật',
    toolDescription: 'Tài liệu hướng dẫn trực quan.',
    notePlaceholder: 'Ví dụ: nhớ sai tên nhạc sĩ, nhầm màu tương phản...'
  }
};

export const HangLuyenCong: React.FC<HangLuyenCongProps> = ({
  onStartPractice,
  onStudyLesson,
  onOpenMatThat3D,
  onOpenMatThatPlane,
  onOpenMatThatGraph,
  onStartLessonPractice
}) => {
  const { activeSectId, activeGradeTier } = useSect();
  const questions = useGameState(state => state.questions);
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);
  const currentUser = useGameState(state => state.currentUser);

  const [noteText, setNoteText] = useState('');
  const [overlayLessonId, setOverlayLessonId] = useState<string | null>(null);
  const [visibleLessonCounts, setVisibleLessonCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!currentUser?.id) return;
    const saved = localStorage.getItem(`gameengg10-hang-notes:${currentUser.id}`);
    setNoteText(saved || '');
  }, [currentUser?.id]);

  useEffect(() => {
    if (!currentUser?.id) return;
    localStorage.setItem(`gameengg10-hang-notes:${currentUser.id}`, noteText);
  }, [currentUser?.id, noteText]);

  const selectedSubject: HangSubjectId = activeSectId as HangSubjectId;
  const subjectToolIds = getSubjectToolIds(selectedSubject);

  const subjectQuestions = useMemo(() => {
    return filterQuestionsInScope(questions, selectedSubject as SubjectId, activeGradeTier);
  }, [questions, selectedSubject, activeGradeTier]);

  const subjectLessons = useMemo(() => {
    return filterLessonsInScope(lessons, selectedSubject as SubjectId, activeGradeTier);
  }, [lessons, selectedSubject, activeGradeTier]);

  useEffect(() => {
    setVisibleLessonCounts({});
  }, [selectedSubject, activeGradeTier]);



  const sampleQuestions = useMemo(() => {
    const allowedCategories: Record<string, string[]> = {
      english: ['grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress'],
      math: ['parabol-line', 'viet-relation', 'real-equations', 'real-geometry', 'real-finance', 'plane-geometry'],
    };

    const moduleCategories = getSubjectActivities(selectedSubject).flatMap(activity => activity.categories);
    const targetCategories = moduleCategories.length > 0 ? [...new Set(moduleCategories)] : allowedCategories[selectedSubject] || Array.from(new Set(
      subjectQuestions.map(q => q.category)
    )).filter(Boolean);

    return subjectQuestions.filter(q => targetCategories.includes(q.category)).slice(0, 3);
  }, [selectedSubject, subjectQuestions]);

  const meta = SUBJECT_META[selectedSubject] || {
    label: SUBJECTS_CONFIG[selectedSubject as SubjectId]?.name || selectedSubject,
    shortLabel: SUBJECTS_CONFIG[selectedSubject as SubjectId]?.name || selectedSubject,
    accent: 'text-synth-cyan',
    accentSoft: 'from-synth-cyan/20 to-synth-purple/10',
    icon: <Sparkles className="w-5 h-5" />
  };
  const track = SUBJECT_TRACKS[selectedSubject] || DEFAULT_TRACK;

  const handleStart = () => {
    onStartPractice();
  };

  const completedLessonsCount = subjectLessons.filter(l => lessonsProgress[l.id]).length;
  const totalLessonsCount = subjectLessons.length;
  const progressPct = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 1. Header Card - Glassmorphism, Premium Synthwave style */}
      <section className="glass-panel rounded-3xl border border-synth-cyan/20 p-6 md:p-8 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_35%)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-synth-cyan/30 bg-synth-blue/40 text-[9px] font-orbitron font-bold uppercase tracking-[0.24em] text-synth-cyan">
              <Sparkles className="w-3.5 h-3.5" />
              Phòng Luyện Tập
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{meta.icon}</span>
                <h1 className="font-orbitron font-black text-2xl md:text-4xl uppercase tracking-wider text-white">
                  Môn Học {meta.label}
                </h1>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {track.description}
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 max-w-md pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Tiến độ lĩnh ngộ chuyên đề:</span>
                <span className="font-bold font-orbitron text-synth-cyan">{completedLessonsCount}/{totalLessonsCount} ({progressPct}%)</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-synth-cyan to-synth-purple rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 md:text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Luyện tập tổng hợp ({subjectQuestions.length} câu hỏi)</div>
            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-synth-cyan via-synth-purple to-synth-magenta text-black font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Bắt Đầu Luyện Tập <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6 items-start">
        
        {/* Column Left: Main Content (Interactive Chambers & Elemental Dungeons & Samples) */}
        <div className="space-y-6">
          
          {/* Kho Nền Tảng tương tác - chỉ dành cho Toán */}
          {subjectToolIds.length > 0 && (
            <div className="glass-panel rounded-2xl border border-white/10 p-5 bg-black/20">
              <h2 className="font-orbitron font-black text-xs text-synth-cyan uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-synth-cyan" />
                Kho Nền Tảng tương tác trực quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MAT_THAT_CARDS.filter(card => subjectToolIds.includes(card.id)).map(card => {
                  const onOpen = card.id === 'biki3d'
                    ? onOpenMatThat3D
                    : card.id === 'bikiplane'
                      ? onOpenMatThatPlane
                      : onOpenMatThatGraph;
                  return (
                    <button
                      key={card.id}
                      onClick={onOpen}
                      className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left hover:border-synth-cyan/30 hover:bg-white/[0.05] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-white">
                          <div className="inline-flex items-center gap-2 font-orbitron font-bold text-xs uppercase group-hover:text-synth-cyan transition-colors">
                            {card.icon}
                            {card.title}
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-synth-cyan transition-colors" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-synth-cyan group-hover:translate-x-0.5 transition-transform">
                        Khám phá Xưởng Toán <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Elemental Dungeons List */}
          <div className="glass-panel rounded-2xl border border-white/10 p-3 space-y-3">
            <div>
              <h2 className="font-orbitron font-black text-sm text-white uppercase tracking-wider">
                {track.lessonTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chọn chuyên đề để học lý thuyết cốt lõi và làm các bài luyện liên quan.
              </p>
            </div>
            <div className="space-y-3">
              {Object.values(DUNGEONS_CONFIG).map(dungeon => {
                const rawDungeonLessons = subjectLessons.filter(l => getElementalDungeon(l) === dungeon.id);
                if (rawDungeonLessons.length === 0) return null;

                // Tự động gán số thứ tự cho các bài chưa có số bài (do Viện Chủ tạo thêm hoặc ngoài danh mục)
                const mappedLessons = rawDungeonLessons.filter(l => typeof l.bai === 'number');
                const unmappedLessons = rawDungeonLessons.filter(l => typeof l.bai !== 'number');
                const maxBai = mappedLessons.length > 0 ? Math.max(...mappedLessons.map(l => l.bai as number)) : 0;

                const dungeonLessons = [
                  ...mappedLessons,
                  ...unmappedLessons.map((l, idx) => ({ ...l, bai: maxBai + 1 + idx }))
                ].sort((a, b) => (a.bai ?? 0) - (b.bai ?? 0));

                const dungeonConfig = getDungeonConfig(dungeon.id, selectedSubject as string);
                const firstLesson = dungeonLessons[0];
                const loaiLabel = firstLesson?.loai && firstLesson.loai !== 'Chưa phân loại SGK' ? ` - ${firstLesson.loai}` : '';

                return (
                  <div key={dungeon.id} className={`rounded-xl border p-2.5 ${dungeon.bg}`}>
                    <div className="mb-2 flex justify-between items-center border-b border-white/5 pb-1.5">
                      <div>
                        <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-white">
                          {dungeonConfig.label}{loaiLabel}
                        </h3>
                        <p className="text-[9px] text-slate-400 tracking-wider mt-0.5">{dungeon.desc}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-orbitron">{dungeonLessons.length} Bài học</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
                      {dungeonLessons.slice(0, visibleLessonCounts[dungeon.id] ?? 6).map(lesson => {
                        const isCompleted = lessonsProgress[lesson.id] || false;
                        return (
                          <div key={lesson.id} className="relative h-full w-full">
                            <FogCard
                              pageId={lesson.id}
                              requiredCompletions={2}
                              decayDays={7}
                              label="Bài học chưa trải nghiệm"
                              onOpenLevel3={() => setOverlayLessonId(lesson.id)}
                            >
                              <div className={`rounded-lg border p-2.5 flex flex-col justify-between gap-2 transition-all duration-200 h-full bg-black/40 ${
                                isCompleted ? 'border-synth-cyan/20' : 'border-white/5 hover:border-white/20'
                              }`}>
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                      lesson.loai === 'Chưa phân loại SGK'
                                        ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                                        : 'bg-white/5 border border-white/10 text-slate-400'
                                    }`}>
                                      {lesson.loai === 'Chưa phân loại SGK' ? '⚠️ Thiếu SGK KNTT' : (lesson.loai || lesson.topic)}
                                    </span>
                                    {isCompleted ? (
                                      <span className="text-[8px] font-bold text-synth-cyan uppercase font-orbitron tracking-wider">
                                        Đã lĩnh ngộ 🌟
                                      </span>
                                    ) : (
                                      <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">
                                        Chưa học ⏳
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="font-orbitron font-bold uppercase text-xs text-white tracking-wide leading-snug">
                                    {lesson.bai ? `Bài ${lesson.bai}: ` : ''}{lesson.title}
                                  </h3>
                                  <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                                    {lesson.theory.replace(/[#*`>]/g, '').trim()}
                                  </p>
                                </div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStudyLesson(lesson.id);
                                  }}
                                  className={`self-start inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md font-orbitron font-bold text-[8px] uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                                    isCompleted 
                                      ? 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                                      : 'bg-gradient-to-r from-synth-cyan to-synth-purple text-black shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:scale-[1.01]'
                                  }`}
                                >
                                  {isCompleted ? 'Học lại' : 'Học bài'}
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </FogCard>
                          </div>
                        );
                      })}
                    </div>
                    {(visibleLessonCounts[dungeon.id] ?? 6) < dungeonLessons.length && (
                      <div className="flex justify-center pt-3">
                        <button
                          type="button"
                          onClick={() => setVisibleLessonCounts(current => ({
                            ...current,
                            [dungeon.id]: (current[dungeon.id] ?? 6) + 6
                          }))}
                          className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 font-orbitron font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer"
                        >
                          Xem thêm bài học ⚔️
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample Questions Section */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-3 bg-black/10">
            <div>
              <h2 className="font-orbitron font-black text-xs text-slate-200 uppercase tracking-wider">
                🎯 {track.sampleTitle}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Các câu hỏi mẫu đại diện tiêu biểu giúp đệ tử hình dung đề thi thực tế.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sampleQuestions.length > 0 ? sampleQuestions.map(question => (
                <div key={question.id} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 flex flex-col justify-between gap-3 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      <span className="text-synth-orange">{question.category}</span>
                      <span>Độ khó {question.difficulty}/10</span>
                    </div>
                    {question.imageUrl && (
                      <div className="flex justify-center bg-black/20 rounded-lg p-2 max-h-[85px] overflow-hidden border border-white/5">
                        <img 
                          src={question.imageUrl} 
                          className="rounded max-h-[65px] object-contain" 
                          alt="Preview" 
                        />
                      </div>
                    )}
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                      {question.prompt}
                    </p>
                  </div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider truncate">
                    Nguồn: {question.source}
                  </div>
                </div>
              )) : (
                <div className="col-span-3 py-4 text-center text-xs text-slate-500 italic">
                  Chưa có dữ liệu câu hỏi mẫu cho môn này.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Column Right: Supplement Panel (Fixed Error Notebook & Sources) */}
        <aside className="space-y-6 xl:sticky xl:top-24">
          
          {/* Sổ tay Lỗi Sai - Error Notebook */}
          <div className="glass-panel rounded-2xl border border-synth-cyan/20 p-5 bg-gradient-to-b from-synth-blue/30 to-black/50 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-synth-cyan/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-synth-cyan" />
              <h3 className="font-orbitron font-black uppercase tracking-wider text-xs text-white">
                Sổ tay lỗi sai
              </h3>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ghi lại những lỗi sai bạn thường mắc phải (sai công thức, thiếu điều kiện, dịch nhầm từ...) để ghi nhớ và ôn tập hàng ngày.
            </p>

            <div className="relative">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder={track.notePlaceholder}
                className="w-full min-h-[220px] rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs text-slate-200 outline-none focus:border-synth-cyan/40 focus:ring-1 focus:ring-synth-cyan/30 resize-y transition-all leading-relaxed placeholder-slate-600"
              />
              <div className="absolute bottom-2.5 right-2.5 text-[9px] text-slate-500 font-orbitron uppercase tracking-wider select-none pointer-events-none">
                Tự động lưu
              </div>
            </div>
          </div>

          {/* Nguồn Học Liệu - Sources */}
          <div className="glass-panel rounded-2xl border border-white/10 p-5 bg-black/20 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-synth-orange" />
              <h3 className="font-orbitron font-black uppercase tracking-wider text-xs text-white">
                Nguồn học liệu tham khảo
              </h3>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Các nguồn tài liệu, đề mẫu, cẩm nang tra cứu chọn lọc cho môn {meta.label}.
            </p>

            <div className="space-y-2 pt-1">
              {(() => {
                const sources = HANG_SOURCES[selectedSubject] || [];
                if (sources.length === 0) {
                  return (
                    <div className="text-[10px] text-slate-500 italic py-2 text-center border border-dashed border-white/5 rounded-xl">
                      Chưa có nguồn học liệu riêng cho môn này.
                    </div>
                  );
                }
                return sources.map(source => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-xl border border-white/5 bg-white/[0.01] p-3 hover:border-synth-orange/30 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200 group-hover:text-synth-orange transition-colors">
                      <span>{source.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-synth-orange transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                      {source.note}
                    </p>
                  </a>
                ));
              })()}
            </div>
          </div>

        </aside>

      </div>

      {overlayLessonId && (
        <FullscreenModal
          isOpen={true}
          onClose={() => setOverlayLessonId(null)}
          title="CHI TIẾT CHUYÊN ĐỀ"
        >
          <LessonStudyView
            lessonId={overlayLessonId}
            onStartPractice={(lId) => {
              if (onStartLessonPractice) {
                onStartLessonPractice(lId);
              } else {
                onStudyLesson(lId);
              }
            }}
            onBack={() => setOverlayLessonId(null)}
          />
        </FullscreenModal>
      )}
    </div>
  );
};
