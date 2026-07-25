import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, Plus, Trash2, Search, RefreshCw, ChevronLeft, ChevronRight, Eye, Edit2, ChevronDown } from 'lucide-react';
import { FullscreenModal } from '../Common/FullscreenModal';
import { LessonStudyView } from '../LessonStudyView';
import { SUBJECTS_CONFIG } from '../../types/game';
import type { SubjectId, GradeTier, HamNguyenTo, CurriculumTextbookItem } from '../../types/game';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';
import { useGameState } from '../../hooks/useGameState';
import { DUNGEONS_CONFIG, enrichTextbookAttributes } from '../../utils/textbookEnricher';

interface Lesson {
  id: string;
  subject: string;
  category: string;
  topic: string;
  topicId?: string;
  title: string;
  theory: string;
  grade_tier: number;
  is_standard?: boolean;
  loai?: string;
  bai?: number;
  chapterName?: string;
  lessonName?: string;
  hamNguyenTo?: HamNguyenTo;
  times_opened?: number;
  times_completed?: number;
  created_at?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

interface TypeableComboboxProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
  step?: string;
  className?: string;
  id?: string;
}

const TypeableCombobox: React.FC<TypeableComboboxProps> = ({
  value,
  onChange,
  options,
  placeholder,
  required,
  type = 'text',
  step,
  className,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!value || !value.trim()) return options;
    const lower = value.toLowerCase().trim();
    return options.filter(opt => opt.toLowerCase().includes(lower));
  }, [options, value]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          id={id}
          type={type}
          step={step}
          required={required}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`${className || ''} pr-8`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="absolute right-2 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
          tabIndex={-1}
          aria-label="Toggle options"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-synth-cyan' : ''}`} />
        </button>
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-slate-900/95 border border-synth-cyan/30 rounded-xl shadow-2xl backdrop-blur-md py-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 text-xs cursor-pointer transition-colors hover:bg-synth-cyan/20 hover:text-synth-cyan flex items-center justify-between ${
                  opt === value ? 'bg-synth-cyan/15 text-synth-cyan font-bold' : 'text-slate-200'
                }`}
              >
                <span>{opt}</span>
                {opt === value && <span className="text-[10px] text-synth-cyan font-mono">Đang chọn</span>}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-[11px] text-slate-400 italic">
              Nhập giá trị mới: "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const LectureBankManager: React.FC = () => {
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const currentSubject = useGameState(state => state.currentSubject);
  const topics = useGameState(state => state.topics || []);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [standardFilter, setStandardFilter] = useState('all');

  // Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Form Fields
  const [formSubject, setFormSubject] = useState<SubjectId>(currentSubject);
  const [formGradeTier, setFormGradeTier] = useState<GradeTier>(activeGradeTier);
  const [formCategory, setFormCategory] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formTopicId, setFormTopicId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTheory, setFormTheory] = useState('');
  const [formIsStandard, setFormIsStandard] = useState(false);
  const [formLoai, setFormLoai] = useState('');
  const [formBai, setFormBai] = useState('');
  const [formChapterName, setFormChapterName] = useState('');
  const [formLessonName, setFormLessonName] = useState('');
  const [curriculumItems, setCurriculumItems] = useState<CurriculumTextbookItem[]>([]);
  const [formHamNguyenTo, setFormHamNguyenTo] = useState<HamNguyenTo>('thach');
  const [isSaving, setIsSaving] = useState(false);
  const [formAttempted, setFormAttempted] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, currentSubject]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) return;
        const res = await fetch(`${backendUrl}/api/curriculum/textbooks?subject=${formSubject}&gradeTier=${formGradeTier}`, {
          headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || '' }
        });
        if (res.ok) {
          const data = await res.json();
          setCurriculumItems(data.textbooks || []);
        }
      } catch (e) {
        console.error('Error fetching curriculum:', e);
      }
    };
    if (isModalOpen) {
      fetchCurriculum();
    }
  }, [formSubject, formGradeTier, isModalOpen]);

  const availableChapters = useMemo(() => {
    const set = new Set<string>();
    curriculumItems.forEach(item => {
      if (item.chapterFullName?.trim()) set.add(item.chapterFullName.trim());
    });
    return Array.from(set);
  }, [curriculumItems]);

  const availableLessonsForChapter = useMemo(() => {
    if (!formChapterName) return curriculumItems;
    return curriculumItems.filter(item => item.chapterFullName === formChapterName);
  }, [curriculumItems, formChapterName]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const res = await fetch(`${backendUrl}/api/admin/lessons?gradeTier=${activeGradeTier}`, {
        headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || '' }
      });
      if (res.ok) {
        const data = await res.json();
        setLessons(data || []);
      } else {
        toast.error('Không thể tải danh sách bài giảng.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Lỗi kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [activeGradeTier]);

  // Rich distinct options derived from presets, Zustand topics store & DB lessons
  const distinctCategories = useMemo(() => {
    const set = new Set<string>();
    const presets: Record<string, string[]> = {
      toan: ['real-geometry', 'algebra', 'geometry', 'plane-geometry', 'solid-geometry', 'modeling', 'statistics', 'calculus', 'general'],
      english: ['grammar', 'reading', 'vocabulary', 'pronunciation', 'rewrite', 'cloze', 'listening', 'speaking', 'general'],
      van: ['van-hoc', 'tieng-viet', 'tap-lam-van', 'reading', 'essay', 'general'],
      ly: ['co-ban', 'thi-nghiem', 'li-thuyet', 'bai-tap-tinh-toan', 'general'],
      hoa: ['co-ban', 'vo-co', 'huu-co', 'thi-nghiem', 'general'],
      sinh: ['di-truyen', 'te-bao', 'sinh-thai', 'general']
    };
    (presets[formSubject] || ['general', 'reading', 'grammar', 'algebra', 'geometry']).forEach(c => set.add(c));

    lessons.forEach(l => {
      if (l.subject === formSubject && l.category?.trim()) set.add(l.category.trim());
    });
    return Array.from(set).sort();
  }, [lessons, formSubject]);

  const distinctTopics = useMemo(() => {
    const set = new Set<string>();
    topics.filter((t: any) => t.subjectId === formSubject).forEach((t: any) => {
      if (t.label?.trim()) set.add(t.label.trim());
      if (t.id?.trim()) set.add(t.id.trim());
    });
    lessons.forEach(l => {
      if (l.subject === formSubject && l.topic?.trim()) set.add(l.topic.trim());
    });
    return Array.from(set).sort();
  }, [lessons, formSubject, topics]);

  const distinctTitles = useMemo(() => {
    const set = new Set<string>();
    lessons.forEach(l => {
      if (l.subject === formSubject && l.title?.trim()) set.add(l.title.trim());
    });
    return Array.from(set).sort();
  }, [lessons, formSubject]);

  const distinctLoai = useMemo(() => {
    const set = new Set<string>();
    const presets: Record<string, string[]> = {
      toan: ['Đại số', 'Hình học', 'Thống kê & Xác suất', 'Hình học & Đo lường', 'Đại số & Giải tích', 'Giải tích', 'Chuyên đề học tập'],
      english: ['Grammar', 'Reading', 'Vocabulary', 'Phonetics & Pronunciation', 'Sentence Transformation', 'Listening & Speaking'],
      van: ['Văn học', 'Tiếng Việt', 'Tập làm văn', 'Đọc hiểu văn bản'],
      ly: ['Vật lý đại cương', 'Cơ học', 'Điện học', 'Quang học'],
      hoa: ['Hóa học đại cương', 'Hóa học vô cơ', 'Hóa học hữu cơ'],
      sinh: ['Sinh học tế bào', 'Di truyền học', 'Sinh thái học & Tiến hóa']
    };
    (presets[formSubject] || ['Chương trình chuẩn', 'Lý thuyết cơ bản', 'Chuyên đề']).forEach(l => set.add(l));

    lessons.forEach(l => {
      if (l.subject === formSubject && l.loai?.trim()) set.add(l.loai.trim());
    });
    return Array.from(set).sort();
  }, [lessons, formSubject]);

  const distinctBai = useMemo(() => {
    const set = new Set<number>();
    [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].forEach(n => set.add(n));
    lessons.forEach(l => {
      if (l.subject === formSubject && l.bai !== undefined && l.bai !== null && !isNaN(l.bai)) set.add(l.bai);
    });
    return Array.from(set).sort((a, b) => a - b).map(n => String(n));
  }, [lessons, formSubject]);

  const handleOpenCreateModal = () => {
    setEditingLesson(null);
    setFormSubject(currentSubject);
    setFormGradeTier(activeGradeTier);
    setFormCategory('');
    setFormTopic('');
    setFormTopicId('');
    setFormTitle('');
    setFormTheory('');
    setFormIsStandard(false);
    setFormChapterName('');
    setFormLessonName('');

    const enriched = enrichTextbookAttributes('', '', currentSubject);
    setFormLoai(enriched.loai || 'Chương trình chuẩn');
    setFormBai(String(enriched.bai || 1));
    setFormHamNguyenTo(enriched.hamNguyenTo || 'thach');

    setFormAttempted(false);
    setIsPreviewMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lesson: Lesson, keepPreview?: boolean) => {
    setEditingLesson(lesson);
    setFormSubject(lesson.subject as SubjectId);
    setFormGradeTier((lesson.grade_tier || activeGradeTier) as GradeTier);
    setFormCategory(lesson.category);
    setFormTopic(lesson.topic);
    setFormTopicId(lesson.topicId || '');
    setFormTitle(lesson.title);
    setFormTheory(lesson.theory);
    setFormIsStandard(lesson.is_standard || false);
    setFormChapterName(lesson.chapterName || '');
    setFormLessonName(lesson.lessonName || '');

    const enriched = enrichTextbookAttributes(lesson.topicId || lesson.category, lesson.category, lesson.subject);
    setFormLoai(lesson.loai?.trim() || enriched.loai || 'Chương trình chuẩn');
    setFormBai(lesson.bai !== undefined && lesson.bai !== null ? String(lesson.bai) : String(enriched.bai || 1));
    setFormHamNguyenTo(lesson.hamNguyenTo || enriched.hamNguyenTo || 'thach');

    setFormAttempted(true);
    if (!keepPreview) {
      setIsPreviewMode(false);
    }
    setIsModalOpen(true);
  };

  const handleSaveLesson = async (e: React.FormEvent, isStandardOverride?: boolean) => {
    if (e) e.preventDefault();
    setFormAttempted(true);
    if (!formSubject || !formCategory.trim() || !formTopic.trim() || !formTitle.trim() || !formTheory.trim()) {
      toast.error('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }

    setIsSaving(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const parsedBai = formBai.trim() ? parseFloat(formBai) : undefined;
      const enrichedFallback = enrichTextbookAttributes(formTopicId || formCategory, formCategory, formSubject);

      const payload = {
        subject: formSubject,
        gradeTier: formGradeTier,
        category: formCategory.trim(),
        topic: formTopic.trim(),
        topicId: formTopicId || undefined,
        title: formTitle.trim(),
        theory: formTheory.trim(),
        is_standard: isStandardOverride !== undefined ? isStandardOverride : formIsStandard,
        loai: formLoai.trim() || enrichedFallback.loai || 'Chương trình chuẩn',
        bai: parsedBai !== undefined ? parsedBai : (enrichedFallback.bai || 1),
        hamNguyenTo: formHamNguyenTo,
        chapterName: formChapterName.trim() || undefined,
        lessonName: formLessonName.trim() || undefined
      };

      const url = editingLesson 
        ? `${backendUrl}/api/admin/lessons/${editingLesson.id}`
        : `${backendUrl}/api/admin/lessons`;
      const method = editingLesson ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || ''
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(editingLesson ? 'Cập nhật bài giảng thành công!' : 'Tạo mới bài giảng thành công!');
        fetchLessons();
        if (editingLesson && editingIndex >= 0 && editingIndex < filteredLessons.length - 1) {
          handleNavigateEditing(1);
        } else {
          setIsModalOpen(false);
        }
      } else {
        const err = await res.json();
        toast.error(err.error || 'Thao tác thất bại.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Lỗi lưu bài giảng.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (deletingIds[lessonId]) return;
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài giảng này? Hành động này không thể hoàn tác.')) {
      return;
    }

    setDeletingIds(prev => ({ ...prev, [lessonId]: true }));
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const res = await fetch(`${backendUrl}/api/admin/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || '' }
      });

      if (res.ok) {
        toast.success('Đã xóa bài giảng thành công!');
        fetchLessons();
      } else {
        toast.error('Không thể xóa bài giảng.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Lỗi khi xóa.');
    } finally {
      setDeletingIds(prev => ({ ...prev, [lessonId]: false }));
    }
  };

  // Filters
  const sectLessons = useMemo(() => {
    return lessons.filter(l => l.subject === currentSubject && l.grade_tier === activeGradeTier);
  }, [lessons, currentSubject, activeGradeTier]);

  const topCategories = useMemo(() => {
    const counts = sectLessons.reduce((acc, l) => {
      if (!l.category) return acc;
      acc[l.category] = (acc[l.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [sectLessons]);

  const topTopics = useMemo(() => {
    const counts = sectLessons.filter(l => categoryFilter === 'all' || l.category === categoryFilter).reduce((acc, l) => {
      if (!l.topic) return acc;
      acc[l.topic] = (acc[l.topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [sectLessons, categoryFilter]);

  const filteredLessons = useMemo(() => {
    return sectLessons.filter(l => {
      if (categoryFilter !== 'all' && l.category !== categoryFilter) return false;
      if (topicFilter !== 'all' && l.topic !== topicFilter) return false;
      if (standardFilter === 'standard' && !l.is_standard) return false;
      if (standardFilter === 'non_standard' && l.is_standard) return false;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        l.title.toLowerCase().includes(q) || 
        l.topic.toLowerCase().includes(q) || 
        l.category.toLowerCase().includes(q) || 
        l.theory.toLowerCase().includes(q);
      return matchQuery;
    });
  }, [sectLessons, categoryFilter, topicFilter, standardFilter, searchQuery]);

  const editingIndex = editingLesson 
    ? filteredLessons.findIndex(l => l.id === editingLesson.id) 
    : -1;

  const handleNavigateEditing = (direction: -1 | 1) => {
    if (editingIndex < 0) return;
    const nextLesson = filteredLessons[editingIndex + direction];
    if (nextLesson) handleOpenEditModal(nextLesson, true);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
      {/* Banner */}
      <div className="bg-gradient-to-r from-synth-cyan/10 via-transparent to-synth-magenta/5 relative border-b border-white/10 p-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-synth-cyan/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-orbitron font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              📚 KHO BÀI GIẢNG
            </h3>
            <div className="text-xs text-synth-text-muted leading-relaxed max-w-4xl space-y-1">
              <p>Soạn thảo, hiệu đính lý thuyết cho các chương mục luyện tập trong Học Đường.</p>
            </div>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-synth-cyan text-black font-bold font-orbitron text-xs uppercase rounded-lg hover:synth-glow-cyan transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Nạp Bài Giảng Mới
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6">
      {/* Filters bar */}
      <div className="bg-synth-gray/10 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="relative flex-1 w-full lg:max-w-2xl">
            <Search className="w-4 h-4 text-synth-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tiêu đề, nội dung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider hidden sm:inline-block">Bộ lọc bài giảng</span>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setTopicFilter('all');
                setStandardFilter('all');
                setSearchQuery('');
              }}
              className="text-[9px] px-2 py-1.5 rounded bg-white/5 border border-white/10 font-bold uppercase hover:bg-white/10 text-white cursor-pointer transition-colors whitespace-nowrap"
            >
              Xóa lọc
            </button>
            <button
              onClick={fetchLessons}
              disabled={loading}
              className="text-[9px] px-2 py-1.5 flex items-center gap-1 rounded bg-white/5 border border-white/10 font-bold uppercase hover:bg-white/10 text-white cursor-pointer transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Làm mới
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="space-y-1 text-[10px] block">
            <span className="uppercase font-orbitron font-bold text-synth-text-muted">Nhóm (Category)</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
            >
              <option value="all">Tất cả nhóm</option>
              {topCategories.map(([cat, count]) => (
                <option key={cat} value={cat}>{cat} ({count})</option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-[10px] block">
            <span className="uppercase font-orbitron font-bold text-synth-text-muted">Chủ đề (Topic)</span>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
            >
              <option value="all">Tất cả chủ đề</option>
              {topTopics.map(([topic, count]) => (
                <option key={topic} value={topic}>{topic} ({count})</option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-[10px] block">
            <span className="uppercase font-orbitron font-bold text-synth-text-muted">Trạng thái</span>
            <select
              value={standardFilter}
              onChange={(e) => setStandardFilter(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
            >
              <option value="all">Tất cả bài giảng</option>
              <option value="standard">🏆 Đạt chuẩn</option>
              <option value="non_standard">Chưa đạt chuẩn</option>
            </select>
          </label>
        </div>
      </div>

      {/* Lessons List Grid */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-synth-cyan animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Đang tìm kiếm tài liệu từ Kho Bài Giảng...</p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/5 rounded-2xl">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 italic">Không tìm thấy bài giảng nào phù hợp.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
          {filteredLessons.slice(0, visibleCount).map(lesson => (
            <div 
              key={lesson.id} 
              onClick={() => handleOpenEditModal(lesson)}
              className="glass-panel border border-white/5 bg-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-synth-cyan/35 hover:bg-white/[0.07] transition-all relative group cursor-pointer"
            >
              {/* Tick xanh nhỏ ở góc trái trên */}
              {lesson.is_standard && (
                <span className="absolute top-2 left-2 text-emerald-400 text-[10px]" title="Bài giảng đạt chuẩn">
                  ✔️
                </span>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className={`flex items-center gap-1.5 flex-wrap ${lesson.is_standard ? 'pl-4' : ''}`}>
                    {lesson.is_standard && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-orbitron flex items-center gap-1">
                        🏆 Đạt Chuẩn
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-synth-cyan/15 text-synth-cyan border border-synth-cyan/25 uppercase font-orbitron">
                      {SUBJECTS_CONFIG[lesson.subject as keyof typeof SUBJECTS_CONFIG]?.name || lesson.subject}
                    </span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                      Danh mục: {lesson.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      disabled={deletingIds[lesson.id]}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLesson(lesson.id);
                      }}
                      className="p-1.5 rounded hover:bg-red-500 hover:text-black bg-red-500/10 border border-red-500/20 text-red-400 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center min-w-[28px] min-h-[28px]"
                      title="Xóa bài giảng"
                    >
                      {deletingIds[lesson.id] ? (
                        <span className="animate-spin inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"></span>
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
 
                <div className="text-xs font-semibold text-slate-400 font-sans">
                  Chủ đề: {lesson.topic}
                </div>
                <h4 className="font-bold text-white text-sm font-sans mt-0.5">
                  {lesson.title}
                </h4>
                <div className="text-[11px] text-slate-300 line-clamp-3 bg-black/30 p-2.5 rounded-lg border border-white/5 font-mono mt-2 overflow-y-auto max-h-20 leading-relaxed">
                  {lesson.theory}
                </div>
              </div>
            </div>
          ))}
          </div>
          {visibleCount < filteredLessons.length && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2 rounded-xl border border-synth-cyan/30 hover:border-synth-cyan bg-synth-cyan/10 hover:bg-synth-cyan/20 text-synth-cyan font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Xem thêm bài giảng ⚔️
              </button>
            </div>
          )}
        </div>
      )}
      </div>

      {/* FULLSCREEN CREATE/EDIT MODAL */}
      <FullscreenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <span className="text-synth-cyan flex items-center gap-2 font-orbitron text-sm sm:text-base">
            <BookOpen className="w-5 h-5" /> {editingLesson ? 'HIỆU ĐÍNH BÀI GIẢNG' : 'SOẠN THẢO BÀI GIẢNG MỚI'}
          </span>
        }
        bodyClassName="p-4 sm:p-6 flex flex-col h-full min-h-0 bg-synth-bg"
      >
        {editingLesson && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 shrink-0 mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                disabled={isSaving || editingIndex <= 0}
                onClick={() => handleNavigateEditing(-1)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] sm:text-xs tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Bài trước
              </button>
              <span className="text-[10px] sm:text-xs font-orbitron font-bold text-synth-cyan uppercase tracking-wider bg-synth-cyan/10 px-3 py-1.5 rounded-lg border border-synth-cyan/20">
                Bài {editingIndex + 1}/{filteredLessons.length}
              </span>
              <button
                type="button"
                disabled={isSaving || editingIndex >= filteredLessons.length - 1}
                onClick={() => handleNavigateEditing(1)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] sm:text-xs tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Bài sau <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-orbitron font-bold">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase">👁️ Tổng lượt mở</span>
                <span className="text-white text-xs">{editingLesson.times_opened || 0}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="text-slate-400 text-[10px] uppercase">✅ Học hoàn tất</span>
                <span className="text-emerald-400 text-xs">{editingLesson.times_completed || 0}</span>
              </div>
            </div>
          </div>
        )}

        {isPreviewMode ? (
          <div className="flex-1 flex flex-col min-h-0 bg-black rounded-xl border border-synth-cyan/30 overflow-hidden">
            <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center shrink-0">
              <span className="text-synth-cyan font-bold font-orbitron text-xs uppercase tracking-wider">👁️ Chế độ xem trước</span>
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className="px-4 py-2 bg-synth-magenta/20 text-synth-magenta border border-synth-magenta/40 hover:bg-synth-magenta/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" /> Tiếp tục sửa
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto min-h-0">
              <LessonStudyView
                draftLesson={{
                  id: editingLesson?.id || 'draft',
                  subject: formSubject,
                  category: formCategory,
                  topic: formTopic,
                  title: formTitle,
                  theory: formTheory,
                  grade_tier: activeGradeTier,
                  loai: formLoai,
                  bai: formBai ? parseFloat(formBai) : undefined,
                  hamNguyenTo: formHamNguyenTo
                }}
                onBack={() => setIsPreviewMode(false)}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveLesson} className="flex-1 flex flex-col min-h-0 space-y-4 text-xs text-left">
            {/* Top Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-synth-gray/10 p-4 rounded-xl border border-white/5 shrink-0">
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Môn phái học tập</span>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value as SubjectId)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer text-xs"
                >
                  {Object.values(SUBJECTS_CONFIG).map(sub => (
                    <option key={sub.id} value={sub.id} className="bg-slate-900 text-white">{sub.icon} {sub.name}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Khối lớp (Tầng học)</span>
                <select
                  value={formGradeTier}
                  onChange={(e) => setFormGradeTier(Number(e.target.value) as GradeTier)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer text-xs font-bold text-synth-cyan"
                >
                  {[6, 7, 8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g} className="bg-slate-900 text-white">Lớp {g}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Danh mục chuyên đề</span>
                <TypeableCombobox
                  value={formCategory}
                  onChange={setFormCategory}
                  options={distinctCategories}
                  required
                  placeholder="vd: Reading, Ngữ pháp, Đại số..."
                  className={`w-full p-2.5 rounded-lg border ${formAttempted && !formCategory.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-synth-gray/20 focus:border-synth-cyan'} text-white outline-none text-xs`}
                />
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Chủ đề bài giảng</span>
                <TypeableCombobox
                  value={formTopic}
                  onChange={setFormTopic}
                  options={distinctTopics}
                  required
                  placeholder="vd: Cấu trúc động từ, Đồ thị..."
                  className={`w-full p-2.5 rounded-lg border ${formAttempted && !formTopic.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-synth-gray/20 focus:border-synth-cyan'} text-white outline-none text-xs`}
                />
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Topic Lõi (Core Taxonomy)</span>
                <select
                  value={formTopicId}
                  onChange={(e) => setFormTopicId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-white">-- Chưa gắn Topic Lõi --</option>
                  {topics.filter((t: any) => t.subjectId === formSubject).map((t: any) => (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.label || t.name || t.id} ({t.id})
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Tiêu đề bài giảng</span>
                <TypeableCombobox
                  value={formTitle}
                  onChange={setFormTitle}
                  options={distinctTitles}
                  required
                  placeholder="vd: Động từ + V-ing..."
                  className={`w-full p-2.5 rounded-lg border ${formAttempted && !formTitle.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-synth-gray/20 focus:border-synth-cyan'} text-white outline-none text-xs`}
                />
              </label>

              <label className="space-y-1 block sm:col-span-2 lg:col-span-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  📚 Chọn Chương (SGK Chuẩn)
                </span>
                <select
                  value={formChapterName}
                  onChange={(e) => {
                    const ch = e.target.value;
                    setFormChapterName(ch);
                    const matchedItem = curriculumItems.find(item => item.chapterFullName === ch);
                    if (matchedItem) {
                      setFormLoai(matchedItem.chapterTitle);
                    }
                  }}
                  className="w-full p-2.5 rounded-lg border border-synth-cyan/30 bg-synth-gray/30 text-synth-cyan font-semibold outline-none focus:border-synth-cyan cursor-pointer text-xs"
                >
                  <option value="" className="bg-slate-900 text-slate-400">-- Chọn Chương SGK chuẩn (vd: Chương I...) --</option>
                  {availableChapters.map(ch => (
                    <option key={ch} value={ch} className="bg-slate-900 text-white font-medium">
                      {ch}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block sm:col-span-2 lg:col-span-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  📖 Chọn Bài Học (SGK Chuẩn)
                </span>
                <select
                  value={formLessonName}
                  onChange={(e) => {
                    const les = e.target.value;
                    setFormLessonName(les);
                    const matchedItem = curriculumItems.find(item => item.lessonFullName === les);
                    if (matchedItem) {
                      setFormChapterName(matchedItem.chapterFullName);
                      setFormLoai(matchedItem.chapterTitle);
                      const numStr = matchedItem.lessonNumber.replace(/[^0-9.]/g, '');
                      if (numStr) setFormBai(numStr);
                      if (!formTitle.trim()) setFormTitle(matchedItem.lessonTitle);
                    }
                  }}
                  className="w-full p-2.5 rounded-lg border border-synth-cyan/30 bg-synth-gray/30 text-synth-cyan font-semibold outline-none focus:border-synth-cyan cursor-pointer text-xs"
                >
                  <option value="" className="bg-slate-900 text-slate-400">-- Chọn Bài học SGK chuẩn (vd: Bài 1...) --</option>
                  {availableLessonsForChapter.map(les => (
                    <option key={les.id} value={les.lessonFullName} className="bg-slate-900 text-white font-medium">
                      {les.lessonFullName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Loại SGK (Học Đường)</span>
                <TypeableCombobox
                  value={formLoai}
                  onChange={setFormLoai}
                  options={distinctLoai}
                  placeholder="Đại số, Hình học, Ngữ pháp..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                />
              </label>

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Số thứ tự Bài (Số thực/lẻ)</span>
                <TypeableCombobox
                  value={formBai}
                  onChange={setFormBai}
                  options={distinctBai}
                  type="number"
                  step="any"
                  placeholder="1, 5.5, 9..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                />
              </label>

              <label className="space-y-1 block sm:col-span-2 lg:col-span-2">
                <span className="text-slate-400 font-semibold">Hầm Nguyên Tố</span>
                <select
                  value={formHamNguyenTo}
                  onChange={(e) => setFormHamNguyenTo(e.target.value as HamNguyenTo)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/25 text-white outline-none focus:border-synth-cyan text-xs cursor-pointer"
                >
                  {Object.entries(DUNGEONS_CONFIG).map(([key, details]) => (
                    <option key={key} value={key} className="bg-slate-900 text-white">
                      {details.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Main Theory Textarea Section - VERY SPACIOUS */}
            <div className="flex-1 flex flex-col min-h-0 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
                  📝 Nội dung Lý Thuyết / Truyền thụ kiến thức (Hỗ trợ Markdown)
                </span>
                <span className="text-[10px] text-synth-cyan/80 font-mono">
                  {formTheory.length} ký tự
                </span>
              </div>
              <textarea
                required
                value={formTheory}
                onChange={(e) => setFormTheory(e.target.value)}
                placeholder="Nhập nội dung lý thuyết chi tiết để học sinh đọc học tại Học Đường..."
                className={`w-full flex-1 min-h-[250px] p-4 rounded-xl border ${formAttempted && !formTheory.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-white outline-none resize-none font-mono text-sm leading-relaxed tracking-wide shadow-inner`}
              />
            </div>

            {/* Action Buttons Footer */}
            <div className="flex justify-between items-center gap-3 border-t border-white/10 pt-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-xs tracking-wider"
              >
                Hủy bỏ
              </button>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="px-4 py-2.5 bg-synth-magenta/20 text-synth-magenta border border-synth-magenta/40 rounded-xl hover:bg-synth-magenta/30 transition-colors uppercase font-orbitron font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  {isPreviewMode ? <Edit2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isPreviewMode ? 'Tiếp tục Sửa' : 'Xem Thử'}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-synth-cyan text-black rounded-xl hover:synth-glow-cyan transition-all font-orbitron font-bold text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Đang lưu...' : editingLesson ? 'Cập Nhật 💾' : 'Tạo mới 💾'}
                </button>
                {editingLesson?.is_standard ? (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={(e) => handleSaveLesson(e, false)}
                    className="px-4 py-2.5 bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all font-orbitron text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50"
                  >
                    ❌ Chưa Đạt Chuẩn
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={(e) => handleSaveLesson(e, true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black font-orbitron rounded-xl hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50"
                  >
                    🏆 Đạt Chuẩn
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </FullscreenModal>
    </div>
  );
};
