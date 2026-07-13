import React, { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { SUBJECTS_CONFIG } from '../../../types/game';
import { toast } from '../../../utils/toast';

interface Lesson {
  id: string;
  subject: string;
  category: string;
  topic: string;
  title: string;
  theory: string;
  is_standard?: boolean;
  created_at?: string;
}

interface LectureFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAddingNew: boolean;
  editingLesson: Lesson | null;
  selectedSubject: string;
  handleSaveLesson: (e: React.FormEvent, isStandardOverride?: boolean, formPayload?: any) => Promise<void>;
  isSaving: boolean;
}

export const LectureFormModal: React.FC<LectureFormModalProps> = ({
  isOpen,
  onClose,
  isAddingNew,
  editingLesson,
  selectedSubject,
  handleSaveLesson,
  isSaving
}) => {
  const [formSubject, setFormSubject] = useState('english');
  const [formCategory, setFormCategory] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTheory, setFormTheory] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (isAddingNew) {
        setFormSubject(selectedSubject === 'all' ? 'english' : selectedSubject);
        setFormCategory('');
        setFormTopic('');
        setFormTitle('');
        setFormTheory('');
      } else if (editingLesson) {
        const l = editingLesson;
        setFormSubject(l.subject);
        setFormCategory(l.category);
        setFormTopic(l.topic);
        setFormTitle(l.title);
        setFormTheory(l.theory);
      }
    }
  }, [isOpen, isAddingNew, editingLesson, selectedSubject]);

  if (!isOpen) return null;

  const onSubmit = (e: React.FormEvent, isStandardOverride?: boolean) => {
    e.preventDefault();
    if (!formSubject || !formCategory.trim() || !formTopic.trim() || !formTitle.trim() || !formTheory.trim()) {
      toast.error('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    const formPayload = {
      subject: formSubject,
      category: formCategory.trim(),
      topic: formTopic.trim(),
      title: formTitle.trim(),
      theory: formTheory.trim()
    };
    handleSaveLesson(e, isStandardOverride, formPayload);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`glass-panel w-full max-w-2xl border rounded-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        isAddingNew ? 'border-synth-green/30 bg-synth-green/5' : 'border-synth-cyan/30 bg-synth-cyan/5'
      }`}>
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h4 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${
            isAddingNew ? 'text-synth-green' : 'text-synth-cyan'
          }`}>
            <BookOpen className="w-4 h-4" /> {isAddingNew ? 'Soạn Thảo Bài Giảng Mới' : 'Hiệu Đính Bài Giảng'}
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={(e) => onSubmit(e)} className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-left">
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
              <span className="text-slate-400 font-semibold">Nhóm chuyên mục (Category)</span>
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
              <span className="text-slate-400 font-semibold">Chủ đề bài giảng (Topic)</span>
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
              <span className="text-slate-400 font-semibold">Tiêu đề bài giảng (Title)</span>
              <input
                type="text"
                required
                value={formTopic === '' ? formTitle : formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Ví dụ: Động từ đi kèm To-Infinitive và Gerund, Cách vẽ đồ thị bậc 1..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
              />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-slate-400 font-semibold">Nội dung Lý Thuyết / Bí kíp truyền thụ (Theory)</span>
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
              onClick={onClose}
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
                {isSaving ? 'Đang lưu...' : isAddingNew ? 'Tạo mới 💾' : 'Cập Nhật 💾'}
              </button>
              {editingLesson?.is_standard ? (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={(e) => onSubmit(e, false)}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-400 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all font-orbitron text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                >
                  ❌ Chưa Đạt Chuẩn
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={(e) => onSubmit(e, true)}
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
  );
};
