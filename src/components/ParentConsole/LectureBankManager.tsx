import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Plus, Trash2, Search, X, RefreshCw } from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../types/game';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';
import { useGameState } from '../../hooks/useGameState';

interface Lesson {
  id: string;
  subject: string;
  category: string;
  topic: string;
  title: string;
  theory: string;
  grade_tier: number;
  is_standard?: boolean;
  created_at?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const LectureBankManager: React.FC = () => {
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Form Fields
  const [formSubject, setFormSubject] = useState('english');
  const [formCategory, setFormCategory] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTheory, setFormTheory] = useState('');
  const [formIsStandard, setFormIsStandard] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({});

  // Lazy Load Paging
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedSubject]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 50) {
      if (visibleCount < filteredLessons.length) {
        setVisibleCount(prev => prev + 10);
      }
    }
  };

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
    setFormSubject('english');
    setFormCategory('');
    setFormTopic('');
    setFormTitle('');
    setFormTheory('');
    setFormIsStandard(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormSubject(lesson.subject);
    setFormCategory(lesson.category);
    setFormTopic(lesson.topic);
    setFormTitle(lesson.title);
    setFormTheory(lesson.theory);
    setFormIsStandard(lesson.is_standard || false);
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

      const payload = {
        subject: formSubject,
        gradeTier: activeGradeTier,
        category: formCategory.trim(),
        topic: formTopic.trim(),
        title: formTitle.trim(),
        theory: formTheory.trim(),
        is_standard: isStandardOverride !== undefined ? isStandardOverride : formIsStandard
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
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
      const matchSubject = selectedSubject === 'all' || l.subject === selectedSubject;
      const matchGrade = l.grade_tier === activeGradeTier;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        l.title.toLowerCase().includes(q) || 
        l.topic.toLowerCase().includes(q) || 
        l.category.toLowerCase().includes(q) || 
        l.theory.toLowerCase().includes(q);
      return matchGrade && matchSubject && matchQuery;
    });
  }, [lessons, activeGradeTier, selectedSubject, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-synth-cyan uppercase tracking-wider flex items-center gap-2">
            📚 Tàng Kinh Các — Quản lý Ngân Hàng Bài Giảng
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Soạn thảo, hiệu đính lý thuyết cho các chương mục luyện tập trong Học Đường.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 bg-synth-cyan text-black font-bold font-orbitron text-xs uppercase rounded-lg hover:synth-glow-cyan transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nạp Bài Giảng Mới
        </button>
      </div>

      {/* Filters bar */}
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, chủ đề, nhóm hoặc nội dung lý thuyết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </div>
          <button
            onClick={fetchLessons}
            disabled={loading}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Tải lại danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Môn phái selector dạng Grid Card mẫu dọc to hoành tráng - Tối ưu Grid Columns & Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between h-[180px] ${
              selectedSubject === 'all'
                ? 'border-synth-cyan bg-synth-cyan/15 shadow-[0_0_15px_rgba(0,240,255,0.2)] ring-1 ring-synth-cyan'
                : 'border-white/5 bg-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex justify-between items-start w-full gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-3xl shrink-0">📚</span>
                <div className="min-w-0">
                  <span className="block text-xs font-black uppercase font-orbitron text-white truncate">
                    Tất Cả
                  </span>
                  <span className="block text-[8px] text-slate-400 uppercase font-semibold truncate">
                    Toàn Học Viện
                  </span>
                </div>
              </div>
              {selectedSubject === 'all' && (
                <span className="text-[8px] font-black uppercase tracking-wider bg-synth-cyan text-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)] shrink-0">
                  Active
                </span>
              )}
            </div>

            <div className="space-y-1 text-[10px] text-slate-300 w-full mt-2">
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400 font-semibold whitespace-nowrap">Tổng bài giảng:</span>
                <span className="font-bold text-white whitespace-nowrap">{lessons.length} bài</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-400 font-semibold whitespace-nowrap">Trạng thái:</span>
                <span className="font-bold text-synth-cyan whitespace-nowrap">Đang hiển thị</span>
              </div>
            </div>

            <div className="w-full mt-2 h-1 bg-black/45 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-synth-cyan w-full" />
            </div>
          </button>

          {Object.values(SUBJECTS_CONFIG).map(sub => {
            const isActive = selectedSubject === sub.id;
            const subLessons = lessons.filter(l => l.subject === sub.id);
            const count = subLessons.length;
            const topicsCount = new Set(subLessons.map(l => l.topic)).size;
            const percent = count === 0 ? 0 : Math.min(100, Math.max(15, count * 15));

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between h-[180px] ${
                  isActive
                    ? 'border-synth-cyan bg-synth-cyan/15 shadow-[0_0_15px_rgba(0,240,255,0.2)] ring-1 ring-synth-cyan'
                    : 'border-white/5 bg-white/5 hover:border-white/15'
                }`}
              >
                {/* Subject icon & title */}
                <div className="flex justify-between items-start w-full gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-3xl shrink-0">{sub.icon}</span>
                    <div className="min-w-0">
                      <span className="block text-xs font-black uppercase font-orbitron text-white truncate" title={sub.name}>
                        {sub.name}
                      </span>
                      <span className="block text-[8px] text-slate-400 uppercase font-semibold truncate">
                        {sub.group === 'chuyen_sau' ? 'Chuyên Sâu' : 'Cơ Bản'}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-[8px] font-black uppercase tracking-wider bg-synth-cyan text-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)] shrink-0">
                      Active
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-[10px] text-slate-300 w-full mt-2">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-400 font-semibold whitespace-nowrap">Bài giảng:</span>
                    <span className="font-bold text-white whitespace-nowrap">{count} bài</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-400 font-semibold whitespace-nowrap">Chủ đề:</span>
                    <span className="font-bold text-white whitespace-nowrap">{topicsCount} nhóm</span>
                  </div>
                </div>

                <div className="space-y-1 w-full mt-2">
                  <div className="flex justify-between text-[8px] font-bold text-slate-400">
                    <span className="whitespace-nowrap">Độ phủ giáo trình</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: isActive ? sub.color : '#64748b'
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lessons List Grid */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-synth-cyan animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Đang lục tìm cổ tịch từ Tàng Kinh Các...</p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/5 rounded-2xl">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <p className="text-xs text-slate-400 italic">Không tìm thấy bài giảng nào phù hợp.</p>
        </div>
      ) : (
        <div 
          onScroll={handleScroll}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1"
        >
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
      )}

      {/* CREATE/EDIT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-2xl border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h4 className="font-orbitron font-bold text-sm text-synth-cyan uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {editingLesson ? 'Hiệu Đính Bài Giảng' : 'Soạn Thảo Bài Giảng Mới'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveLesson} className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1 block">
                  <span className="text-slate-400 font-semibold">Môn phái học tập</span>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
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

              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Nội dung Lý Thuyết / Bí kíp truyền thụ (Theory - Markdown / Text)</span>
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
          </div>
        </div>
      )}
    </div>
  );
};
