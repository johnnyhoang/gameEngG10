import React, { useState, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';
import { SUBJECTS_CONFIG } from '../../types/game';
import { EXAM_CATEGORIES } from '../../data/referenceExamsData';
import type { ReferenceExam, ExamCategoryType } from '../../types/referenceExam';

interface ExamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (examData: Partial<ReferenceExam>) => Promise<void>;
  examToEdit?: ReferenceExam | null;
  defaultSubjectId?: string;
  defaultGradeTier?: string;
}

export const ExamEditModal: React.FC<ExamEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  examToEdit,
  defaultSubjectId = 'math',
  defaultGradeTier = '9',
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isLight = isLightTheme(uiTheme);

  const [formData, setFormData] = useState<Partial<ReferenceExam>>({
    title: '',
    subjectId: defaultSubjectId,
    gradeTier: defaultGradeTier,
    category: 'final_hk1',
    categoryName: 'Cuối Học Kỳ 1',
    schoolName: '',
    district: '',
    province: 'TP. Hồ Chí Minh',
    year: '2024 - 2025',
    examPdfUrl: '',
    solutionPdfUrl: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (examToEdit) {
      setFormData({
        id: examToEdit.id,
        title: examToEdit.title,
        subjectId: examToEdit.subjectId,
        gradeTier: examToEdit.gradeTier,
        category: examToEdit.category,
        categoryName: examToEdit.categoryName,
        schoolName: examToEdit.schoolName || '',
        district: examToEdit.district || '',
        province: examToEdit.province || 'TP. Hồ Chí Minh',
        year: examToEdit.year || '2024 - 2025',
        examPdfUrl: examToEdit.examPdfUrl,
        solutionPdfUrl: examToEdit.solutionPdfUrl || '',
        description: examToEdit.description || '',
      });
    } else {
      setFormData({
        title: '',
        subjectId: defaultSubjectId,
        gradeTier: defaultGradeTier,
        category: 'final_hk1',
        categoryName: 'Cuối Học Kỳ 1',
        schoolName: '',
        district: '',
        province: 'TP. Hồ Chí Minh',
        year: '2024 - 2025',
        examPdfUrl: '',
        solutionPdfUrl: '',
        description: '',
      });
    }
    setErrorMsg('');
  }, [examToEdit, defaultSubjectId, defaultGradeTier, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (catId: ExamCategoryType) => {
    const cat = EXAM_CATEGORIES.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category: catId,
      categoryName: cat?.label || 'Kỳ Thi',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.examPdfUrl?.trim()) {
      setErrorMsg('Vui lòng nhập Tiêu đề đề thi và Đường dẫn file Đề PDF.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onSave({
        ...formData,
        hasSolution: Boolean(formData.solutionPdfUrl?.trim()),
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Đã xảy ra lỗi khi lưu đề thi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isLight
            ? 'bg-white border-violet-200 text-slate-800'
            : 'bg-slate-950 border-cyan-500/30 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isLight
              ? 'bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border-violet-100'
              : 'bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-cyan-500/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{examToEdit ? '✏️' : '➕'}</span>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {examToEdit ? 'Chỉnh Sửa Đề Thi Tham Khảo' : 'Thêm Đề Thi Tham Khảo Mới'}
              </h3>
              <p className="text-xs text-slate-400">
                Dành cho Viện Trưởng & Viện Phó quản lý kho học liệu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Tiêu đề */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Tiêu Đề Đề Thi <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="VD: Đề Thi HK1 Toán 9 — THCS Chuyên Trần Đại Nghĩa"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-400'
                  : 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500'
              }`}
            />
          </div>

          {/* Môn học, Khối lớp, Kỳ thi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Môn Học
              </label>
              <select
                value={formData.subjectId}
                onChange={e => setFormData({ ...formData, subjectId: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                {Object.values(SUBJECTS_CONFIG).map(s => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Khối Lớp
              </label>
              <select
                value={formData.gradeTier}
                onChange={e => setFormData({ ...formData, gradeTier: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                {['6', '7', '8', '9', '10', '11', '12'].map(g => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Phân Loại Kỳ Thi
              </label>
              <select
                value={formData.category}
                onChange={e => handleCategoryChange(e.target.value as ExamCategoryType)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              >
                {EXAM_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Trường, Quận, Năm học */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Tên Trường
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="VD: THCS Chuyên Trần Đại Nghĩa"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Quận / Huyện
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
                placeholder="VD: Quận 1, TP. Thủ Đức"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Năm Học
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                placeholder="VD: 2024 - 2025"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
              />
            </div>
          </div>

          {/* Đường dẫn PDF Đề Thi & Lời Giải */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Đường Dẫn File Đề Thi (PDF URL) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.examPdfUrl}
                onChange={e => setFormData({ ...formData, examPdfUrl: e.target.value })}
                placeholder="/documents/exams/math/grade-9/De_Thi_HK1_Toan_9_...pdf"
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-400'
                    : 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Đường Dẫn File Lời Giải / Đáp Án (PDF URL - Tùy chọn)
              </label>
              <input
                type="text"
                value={formData.solutionPdfUrl}
                onChange={e => setFormData({ ...formData, solutionPdfUrl: e.target.value })}
                placeholder="/documents/exams/math/grade-9/Loi_Giai_Chi_Tiet_HK1_...pdf"
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-mono outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-violet-400'
                    : 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500'
                }`}
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Ghi Chú / Mô Tả Tóm Tắt
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Nhập mô tả tóm tắt về đề thi..."
              className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-500/20">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              Hủy Bỏ
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-transparent shadow-md'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border-transparent shadow-md shadow-cyan-500/20'
              }`}
            >
              {isSubmitting ? 'Đang Lưu...' : examToEdit ? 'Cập Nhật Đề Thi' : 'Thêm Đề Thi Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
