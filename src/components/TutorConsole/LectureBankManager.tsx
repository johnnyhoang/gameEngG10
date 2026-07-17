import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Plus, Trash2, Search, RefreshCw } from 'lucide-react';
import { SideDrawer } from '../Common/SideDrawer';
import { SUBJECTS_CONFIG } from '../../types/game';
import type { SubjectId } from '../../types/game';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';
import { useGameState } from '../../hooks/useGameState';
import { DUNGEONS_CONFIG } from '../../utils/textbookEnricher';
import type { HamNguyenTo } from '../../types/game';

interface Lesson {
  id: string;
  subject: string;
  category: string;
  topic: string;
  title: string;
  theory: string;
  grade_tier: number;
  is_standard?: boolean;
  loai?: string;
  bai?: number;
  hamNguyenTo?: HamNguyenTo;
  created_at?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const LectureBankManager: React.FC = () => {
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const currentSubject = useGameState(state => state.currentSubject);
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
  const [formCategory, setFormCategory] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTheory, setFormTheory] = useState('');
  const [formIsStandard, setFormIsStandard] = useState(false);
  const [formLoai, setFormLoai] = useState('');
  const [formBai, setFormBai] = useState('');
  const [formHamNguyenTo, setFormHamNguyenTo] = useState<HamNguyenTo>('thach');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({});

  // Lazy Load Paging (Page Size 6)
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, currentSubject]);

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

  const handleOpenCreateModal = () => {
    setEditingLesson(null);
    setFormSubject(currentSubject);
    setFormCategory('');
    setFormTopic('');
    setFormTitle('');
    setFormTheory('');
    setFormIsStandard(false);
    setFormLoai('');
    setFormBai('');
    setFormHamNguyenTo('thach');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormSubject(lesson.subject as SubjectId);
    setFormCategory(lesson.category);
    setFormTopic(lesson.topic);
    setFormTitle(lesson.title);
    setFormTheory(lesson.theory);
    setFormIsStandard(lesson.is_standard || false);
    setFormLoai(lesson.loai || '');
    setFormBai(lesson.bai !== undefined ? String(lesson.bai) : '');
    setFormHamNguyenTo(lesson.hamNguyenTo || 'thach');
    setIsModalOpen(true);
  };

  const handleSaveLesson = async (e: React.FormEvent, isStandardOverride?: boolean) => {
    if (e) e.preventDefault();
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

      const payload = {
        subject: formSubject,
        gradeTier: activeGradeTier,
        category: formCategory.trim(),
        topic: formTopic.trim(),
        title: formTitle.trim(),
        theory: formTheory.trim(),
        is_standard: isStandardOverride !== undefined ? isStandardOverride : formIsStandard,
        loai: formLoai.trim() || undefined,
        bai: parsedBai,
        hamNguyenTo: formHamNguyenTo
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
        setIsModalOpen(false);
        fetchLessons();
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

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel rounded-2xl border border-synth-cyan/30 overflow-hidden bg-gradient-to-r from-synth-cyan/10 via-transparent to-synth-magenta/5 relative shadow-lg p-5 mb-6">
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
                      Category: {lesson.category}
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

      {/* CREATE/EDIT SIDE DRAWER */}
      <SideDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        widthClass="max-w-2xl"
        title={
          <span className="text-synth-cyan flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> {editingLesson ? 'Hiệu Đính Bài Giảng' : 'Soạn Thảo Bài Giảng Mới'}
          </span>
        }
      >
        <form onSubmit={handleSaveLesson} className="p-5 space-y-4 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold">Môn phái học tập</span>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value as SubjectId)}
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer"
                  >
                    {Object.values(SUBJECTS_CONFIG).map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.icon} {sub.name}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold">Nhóm chuyên mục (Category - vd: to-infinitive, grammar)</span>
                  <input
                    type="text"
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="to-infinitive, linear-equations..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold">Chủ đề bài giảng (Topic - vd: Verb Patterns)</span>
                  <input
                    type="text"
                    required
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="Ví dụ: Cấu trúc động từ đi kèm, Đồ thị hàm số..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold">Tiêu đề bài giảng (Title - vd: Động từ + V-ing)</span>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ví dụ: Động từ đi kèm To-Infinitive và Gerund, Cách vẽ đồ thị bậc 1..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-3 mt-3">
                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold text-[11px]">Loại SGK (Học Đường)</span>
                  <input
                    type="text"
                    value={formLoai}
                    onChange={(e) => setFormLoai(e.target.value)}
                    placeholder="Đại số, Hình học, Ngữ pháp..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold text-[11px]">Số thứ tự Bài (Số thực/lẻ)</span>
                  <input
                    type="number"
                    step="any"
                    value={formBai}
                    onChange={(e) => setFormBai(e.target.value)}
                    placeholder="1, 5.5, 9..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold text-[11px]">Hầm Nguyên Tố</span>
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

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Nội dung Lý Thuyết / Cẩm nang truyền thụ (Theory - Markdown / Text)</span>
                <textarea
                  required
                  value={formTheory}
                  onChange={(e) => setFormTheory(e.target.value)}
                  placeholder="Nhập nội dung lý thuyết chi tiết để học sinh đọc học tại Học Đường..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan h-44 resize-none font-mono leading-relaxed"
                />
              </label>

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-3 border-t border-white/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider"
                >
                  Hủy bỏ
                </button>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-synth-cyan text-black rounded-lg hover:synth-glow-cyan transition-all font-orbitron font-bold text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? 'Đang lưu...' : editingLesson ? 'Cập Nhật 💾' : 'Tạo mới 💾'}
                  </button>
                  {editingLesson?.is_standard ? (
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={(e) => handleSaveLesson(e, false)}
                      className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all font-orbitron text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                    >
                      ❌ Chưa Đạt Chuẩn
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={(e) => handleSaveLesson(e, true)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black font-orbitron rounded-lg hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                    >
                      🏆 Đạt Chuẩn
                    </button>
                  )}
                </div>
              </div>
        </form>
      </SideDrawer>
    </div>
  );
};
