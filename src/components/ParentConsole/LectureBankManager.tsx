import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, X, RefreshCw } from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../types/game';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';

interface Lesson {
  id: string;
  subject: string;
  category: string;
  topic: string;
  title: string;
  theory: string;
  created_at?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const LectureBankManager: React.FC = () => {
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
  const [isSaving, setIsSaving] = useState(false);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const res = await fetch(`${backendUrl}/api/admin/lessons`, {
        headers: { Authorization: `Bearer ${token}` }
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
  }, []);

  const handleOpenCreateModal = () => {
    setEditingLesson(null);
    setFormSubject('english');
    setFormCategory('');
    setFormTopic('');
    setFormTitle('');
    setFormTheory('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormSubject(lesson.subject);
    setFormCategory(lesson.category);
    setFormTopic(lesson.topic);
    setFormTitle(lesson.title);
    setFormTheory(lesson.theory);
    setIsModalOpen(true);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
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
        category: formCategory.trim(),
        topic: formTopic.trim(),
        title: formTitle.trim(),
        theory: formTheory.trim()
      };

      const url = editingLesson 
        ? `${backendUrl}/api/admin/lessons/${editingLesson.id}`
        : `${backendUrl}/api/admin/lessons`;
      const method = editingLesson ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài giảng này? Hành động này không thể hoàn tác.')) {
      return;
    }

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) return;

      const res = await fetch(`${backendUrl}/api/admin/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
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
    }
  };

  // Filters
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
      const matchSubject = selectedSubject === 'all' || l.subject === selectedSubject;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        l.title.toLowerCase().includes(q) || 
        l.topic.toLowerCase().includes(q) || 
        l.category.toLowerCase().includes(q) || 
        l.theory.toLowerCase().includes(q);
      return matchSubject && matchQuery;
    });
  }, [lessons, selectedSubject, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-synth-cyan uppercase tracking-wider flex items-center gap-2">
            📚 Tàng Kinh Các — Quản lý Ngân Hàng Bài Giảng
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Soạn thảo, hiệu đính lý thuyết cho các chương mục luyện tập trong Hang Luyện Công.
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
      <div className="flex flex-col md:flex-row gap-3 items-center">
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
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full md:w-44 px-3 py-2 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none text-xs focus:border-synth-cyan cursor-pointer"
          >
            <option value="all">Tất cả môn phái</option>
            {Object.values(SUBJECTS_CONFIG).map(sub => (
              <option key={sub.id} value={sub.id}>{sub.icon} {sub.name}</option>
            ))}
          </select>
          <button
            onClick={fetchLessons}
            disabled={loading}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Tải lại danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredLessons.map(lesson => (
            <div key={lesson.id} className="glass-panel border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-synth-cyan/35 transition-all">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-synth-cyan/15 text-synth-cyan border border-synth-cyan/25 uppercase font-orbitron">
                      {SUBJECTS_CONFIG[lesson.subject as keyof typeof SUBJECTS_CONFIG]?.name || lesson.subject}
                    </span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                      Category: {lesson.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenEditModal(lesson)}
                      className="p-1.5 rounded hover:bg-white/5 text-slate-300 hover:text-synth-cyan transition-colors cursor-pointer"
                      title="Chỉnh sửa bài giảng"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="p-1.5 rounded hover:bg-white/5 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                      title="Xóa bài giảng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
                  placeholder="Nhập nội dung lý thuyết chi tiết để học sinh đọc học tại Hang Luyện Công..."
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan h-44 resize-none font-mono leading-relaxed"
                />
              </label>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-synth-cyan text-black rounded-lg hover:synth-glow-cyan transition-all font-orbitron font-bold text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Đang lưu...' : 'Nhập Bản Ký ✍️'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
