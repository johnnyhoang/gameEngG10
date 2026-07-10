import React, { useEffect, useMemo, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import {
   BookOpen,
   Calculator,
   ExternalLink,
   Languages,
   Layers3,
   LineChart,
   Lock,
   Move3D,
   Target,
   NotebookTabs,
   Sparkles,
   ArrowRight,
   CheckCircle2,
   ChevronLeft,
   UserCircle2
} from 'lucide-react';
import {
   HANG_SOURCES
} from '../data/hangLuyenCong';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';
import { useSect } from '../contexts/SectContext';
import type { Lesson } from '../data/lessons';
import { FogCard } from './FogCard';
import { Level3Overlay } from './Level3Overlay';
import { LessonStudyView } from './LessonStudyView';

const getElementalDungeon = (lesson: Lesson): 'fire' | 'ice' | 'stone' => {
  const t = (lesson.topic || '').toLowerCase();
  const c = (lesson.category || '').toLowerCase();
  const str = `${t} ${c}`;
  
  if (str.includes('vocabulary') || str.includes('pronunciation') || str.includes('rút gọn') || str.includes('từ vựng') || str.includes('phát âm')) return 'fire';
  if (str.includes('reading') || str.includes('hình học không gian') || str.includes('đồ thị') || str.includes('bất đẳng thức') || str.includes('đọc hiểu')) return 'ice';
  if (str.includes('grammar') || str.includes('hệ phương trình') || str.includes('vi-ét') || str.includes('ngữ pháp')) return 'stone';
  return 'stone';
};

interface HangLuyenCongProps {
   onStartPractice: () => void;
   onStudyLesson: (lessonId: string) => void;
   onBackToMap: () => void;
   onOpenMatThat3D: () => void;
   onOpenMatThatPlane: () => void;
   onOpenMatThatGraph: () => void;
   onOpenProfile?: () => void;
   onStartLessonPractice?: (lessonId: string) => void;
}

type HangSubjectId = SubjectId;

type StudyPanelId = 'drill' | 'notes' | 'sources';

const STUDY_PANELS: Array<{
  id: StudyPanelId;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'drill', label: 'Học lý thuyết', icon: <Target className="w-4 h-4" /> },
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
  drill: 'Luyện nhanh',
  notes: 'Sổ tay',
  sources: 'Nguồn'
};

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

const SUBJECT_TRACKS: Record<HangSubjectId, {
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
}> = {
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
  onBackToMap,
  onOpenMatThat3D,
  onOpenMatThatPlane,
  onOpenMatThatGraph,
  onOpenProfile,
  onStartLessonPractice
}) => {
  const { activeSectId } = useSect();
  const questions = useGameState(state => state.questions);
  const lessons = useGameState(state => state.lessons);
  const lessonsProgress = useGameState(state => state.lessonsProgress);

  const [selectedStudyPanel, setSelectedStudyPanel] = useState<StudyPanelId>('drill');
  const [noteText, setNoteText] = useState('');
  const [overlayLessonId, setOverlayLessonId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gameengg10-hang-notes');
    if (saved) setNoteText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('gameengg10-hang-notes', noteText);
  }, [noteText]);

  const selectedSubject: HangSubjectId = activeSectId as HangSubjectId;

  const subjectQuestions = useMemo(() => {
    return questions.filter(q => (q.subject || 'english') === selectedSubject);
  }, [questions, selectedSubject]);

  const subjectLessons = useMemo(() => {
    return lessons.filter(l => l.subject === selectedSubject);
  }, [lessons, selectedSubject]);

  const sampleQuestions = useMemo(() => {
    const allowedCategories: Record<string, string[]> = {
      english: ['grammar', 'passive-voice', 'relative-clauses', 'tenses', 'rewrite', 'reading', 'cloze', 'vocabulary', 'wordform', 'pronunciation', 'stress'],
      math: ['parabol-line', 'viet-relation', 'real-equations', 'real-geometry', 'real-finance', 'plane-geometry'],
      literature: ['literature-vietnamese', 'literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument', 'literature-writing']
    };

    const targetCategories = allowedCategories[selectedSubject] || Array.from(new Set(
      subjectQuestions.map(q => q.category)
    )).filter(Boolean);

    return subjectQuestions.filter(q => targetCategories.includes(q.category)).slice(0, 3);
  }, [selectedSubject, subjectQuestions]);

  const meta = SUBJECT_META[selectedSubject];
  const track = SUBJECT_TRACKS[selectedSubject];

  const handleStart = () => {
    onStartPractice();
  };

  const subjectTotals: Record<SubjectId, number> = Object.keys(SUBJECTS_CONFIG).reduce((acc, id) => {
    acc[id as SubjectId] = questions.filter(q => (q.subject || 'english') === id).length;
    return acc;
  }, {} as Record<SubjectId, number>);

  const wizardSteps = [
    {
      step: '01',
      title: 'Môn phái đang tu luyện',
      body: `Đang mở track ${meta.label}: ${track.tag}. Đổi môn phái tại Thân Phận.`
    },
    {
      step: '02',
      title: 'Chọn mật thất',
      body: `Mở đúng cụm ${meta.shortLabel} để đi thẳng vào dạng bài phù hợp.`
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
                Phòng luyện riêng cho môn phái {meta.label} đang tu luyện: bản đồ kiến thức, thẻ nhớ, bài luyện nhanh và sổ tay lỗi sai để con ôn tập theo đúng dạng đề.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_18px_rgba(0,240,255,0.35)] hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Vào học ngay <ArrowRight className="w-4 h-4" />
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

          <div className={`rounded-2xl border border-white/10 bg-gradient-to-r ${meta.accentSoft} p-4 flex items-center justify-between gap-3 flex-wrap`}>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl border border-white/15 bg-black/20 flex items-center justify-center ${meta.accent}`}>
                {meta.icon}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/70 font-bold">Đang tu luyện môn phái</div>
                <h2 className={`font-orbitron font-black text-sm uppercase tracking-wider mt-0.5 ${meta.accent}`}>
                  {meta.label} · {subjectTotals[selectedSubject]} câu trong kho
                </h2>
              </div>
            </div>
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-black/20 text-white text-[10px] font-orbitron font-bold uppercase tracking-wider hover:bg-black/30 transition-colors cursor-pointer"
              >
                <UserCircle2 className="w-4 h-4" />
                Đổi môn phái tại Thân Phận
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-3">
            <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${meta.accentSoft} p-4`}>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-bold">
                {track.tag}
              </div>
              <div className="mt-2 flex items-center gap-2 text-white">
                {meta.icon}
                <h3 className="font-orbitron font-black uppercase tracking-wider text-sm md:text-base">{track.title}</h3>
              </div>
              <p className="mt-2 text-xs md:text-sm text-white/80 leading-relaxed">
                {track.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-synth-gray/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-bold ${meta.accent}`}>
                  {meta.shortLabel} hiện tại
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-synth-gray/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-200 font-bold">
                  {subjectTotals[selectedSubject]} câu trong kho
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-synth-cyan font-bold">
                {track.focusLabel}
              </div>
              <ul className="mt-3 space-y-2">
                {track.focusPoints.map(point => (
                  <li key={point} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${meta.accentSoft}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
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
              Mật thất nhanh - {meta.shortLabel}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {track.sampleDescription}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-full border border-synth-cyan/30 bg-synth-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-bold">
              Đang xem: {meta.label}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-300 font-bold">
              {track.focusLabel}
            </span>
          </div>
        </div>
        {selectedSubject === 'math' ? (
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
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl border border-white/15 bg-black/20 flex items-center justify-center text-slate-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-orbitron font-black uppercase tracking-wider text-sm text-slate-300">
                Mật thất tương tác - sắp khai mở cho {meta.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hiện Mật Thất Biki chỉ dựng đủ 3 phòng cho môn Toán (3D, Hình học phẳng, Đồ thị hàm số). Các mô-đun tương tác trực quan riêng cho {meta.label} đang được phát triển.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-5 md:gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl border border-white/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-orbitron font-black text-lg text-white uppercase tracking-wider">
                  {track.lessonTitle} - {meta.label}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  {track.lessonDescription}
                </p>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-gradient-to-r ${meta.accentSoft} text-xs font-bold ${meta.accent}`}>
                <Target className="w-4 h-4" />
                {track.focusLabel}
              </div>
            </div>

            <div className="space-y-6">
              {[
                { id: 'fire', label: '🔥 Hỏa Hầm', desc: 'Phản xạ nhanh, ghi nhớ ngắn hạn', bg: 'bg-orange-500/10 border-orange-500/30' },
                { id: 'ice', label: '❄️ Băng Hầm', desc: 'Suy luận logic sâu, điềm tĩnh', bg: 'bg-cyan-500/10 border-cyan-500/30' },
                { id: 'stone', label: '🪨 Thạch Hầm', desc: 'Kiến thức nền tảng, quy tắc cốt lõi', bg: 'bg-stone-500/10 border-stone-500/30' }
              ].map(dungeon => {
                const dungeonLessons = subjectLessons.filter(l => getElementalDungeon(l) === dungeon.id);
                if (dungeonLessons.length === 0) return null;

                return (
                  <div key={dungeon.id} className={`rounded-2xl border p-4 ${dungeon.bg}`}>
                    <div className="mb-4">
                      <h3 className="font-orbitron font-black text-sm text-white uppercase tracking-wider">{dungeon.label}</h3>
                      <p className="text-[10px] text-slate-300 uppercase tracking-wider">{dungeon.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dungeonLessons.map(lesson => {
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
                              <div className={`rounded-2xl border p-4 flex flex-col justify-between gap-4 transition-all duration-200 h-full ${
                                isCompleted ? 'border-synth-cyan/20 bg-black/40' : 'border-white/10 bg-black/40'
                              }`}>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                                  {lesson.topic}
                                </span>
                                {isCompleted ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-synth-cyan uppercase font-orbitron tracking-wider">
                                    Đã Lĩnh Ngộ 🌟
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                    Chưa Lĩnh Ngộ ⏳
                                  </span>
                                )}
                              </div>
                              <h3 className="font-orbitron font-black uppercase text-sm text-white tracking-wide leading-snug">
                                {lesson.title}
                              </h3>
                              <p className="text-xs text-slate-400 line-clamp-2">
                                {lesson.theory.replace(/[#*`>]/g, '').trim()}
                              </p>
                            </div>

                            <button
                              onClick={() => onStudyLesson(lesson.id)}
                              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                isCompleted 
                                  ? 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                                  : 'bg-gradient-to-r from-synth-cyan to-synth-purple text-black shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:scale-[1.01]'
                              }`}
                            >
                              {isCompleted ? 'Học lại bài 🎓' : 'Học bài ngay 📖'}
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                          </FogCard>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {sampleQuestions.length > 0 ? sampleQuestions.map(question => (
              <div key={question.id} className="rounded-2xl border border-white/10 bg-synth-gray/20 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <span>{track.sampleTitle}</span>
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
                  {question.category} · Nguồn: {question.source}
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
                <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">{track.toolTitle}</h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400 font-bold">
                1 công cụ / lúc
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {track.toolDescription}
            </p>
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
              {selectedStudyPanel === 'drill' && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-synth-orange" />
                    <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Học theo chuyên đề - {meta.shortLabel}</h3>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {track.lessonDescription}
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span>Số chuyên đề hiện có</span>
                      <span className="font-bold text-white">{subjectLessons.length} bài học</span>
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
                    Bắt đầu học ngay <ArrowRight className="w-4 h-4" />
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
                    placeholder={track.notePlaceholder}
                    className="w-full min-h-[180px] rounded-2xl border border-white/10 bg-synth-gray/25 p-4 text-sm text-white outline-none focus:border-synth-cyan/40 resize-y"
                  />
                </>
              )}

              {selectedStudyPanel === 'sources' && (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5 text-synth-cyan" />
                    <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Nguồn học liệu - {meta.shortLabel}</h3>
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

      {overlayLessonId && (
        <Level3Overlay
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
        </Level3Overlay>
      )}
    </div>
  );
};
