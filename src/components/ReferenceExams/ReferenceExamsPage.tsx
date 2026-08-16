import React, { useState, useMemo, useEffect } from 'react';
import { useSect } from '../../contexts/SectContext';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';
import { SUBJECTS_CONFIG } from '../../types/game';
import {
  REFERENCE_EXAMS,
  EXAM_CATEGORIES,
  filterReferenceExams,
} from '../../data/referenceExamsData';
import type { ReferenceExam, ExamCategoryType } from '../../types/referenceExam';
import { PdfViewerModal } from './PdfViewerModal';
import { ExamEditModal } from './ExamEditModal';

const LOCAL_STORAGE_DOWNLOADED_KEY = 'mika_downloaded_exam_ids';
const LOCAL_STORAGE_CUSTOM_EXAMS_KEY = 'mika_custom_reference_exams';

export const ReferenceExamsPage: React.FC = () => {
  const { activeSectId, activeGradeTier } = useSect();
  const currentUser = useGameState(state => state.currentUser);
  const uiTheme = useGameState(state => state.uiTheme);
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const isLight = isLightTheme(uiTheme);

  // Quyền CRUD cho Viện Trưởng (admin) & Viện Phó (tutor)
  const isStaff = currentUser?.role === 'admin' || currentUser?.role === 'tutor';

  const activeSect = SUBJECTS_CONFIG[activeSectId] || { name: 'Môn Học', icon: '📚' };

  // Danh sách đề thi (gồm danh mục mặc định + custom đề thi)
  const [exams, setExams] = useState<ReferenceExam[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_EXAMS_KEY);
      if (saved) {
        const custom = JSON.parse(saved);
        const map = new Map<string, ReferenceExam>();
        REFERENCE_EXAMS.forEach(e => map.set(e.id, e));
        custom.forEach((e: ReferenceExam) => map.set(e.id, e));
        return Array.from(map.values());
      }
    } catch {
      // fallback
    }
    return REFERENCE_EXAMS;
  });

  // State các ID đề thi đã tải về máy
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_DOWNLOADED_KEY);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  const [selectedCategory, setSelectedCategory] = useState<ExamCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // State cho PDF Viewer Modal
  const [activePreview, setActivePreview] = useState<{
    isOpen: boolean;
    exam?: ReferenceExam;
    type: 'exam' | 'solution';
  }>({
    isOpen: false,
    type: 'exam',
  });

  // State cho CRUD Edit/Add Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<ReferenceExam | null>(null);

  // Lưu custom exams vào localStorage và thử fetch từ backend
  useEffect(() => {
    // Fetch từ backend nếu có
    fetch(`/api/reference-exams?subjectId=${activeSectId}&gradeTier=${activeGradeTier}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setExams(prev => {
            const map = new Map<string, ReferenceExam>();
            prev.forEach(e => map.set(e.id, e));
            data.data.forEach((e: ReferenceExam) => map.set(e.id, e));
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {
        // im lặng nếu backend offline
      });
  }, [activeSectId, activeGradeTier]);

  // Đánh dấu một đề đã được tải về
  const markAsDownloaded = (examId: string) => {
    setDownloadedIds(prev => {
      const next = new Set(prev);
      next.add(examId);
      try {
        localStorage.setItem(LOCAL_STORAGE_DOWNLOADED_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });

    // Báo backend tăng download counter
    void fetch(`/api/reference-exams/${examId}/download`, { method: 'POST' }).catch(() => {});
  };

  // Mở popup xem trước PDF
  const handleOpenPreview = (exam: ReferenceExam, type: 'exam' | 'solution') => {
    setActivePreview({
      isOpen: true,
      exam,
      type,
    });
    void fetch(`/api/reference-exams/${exam.id}/view`, { method: 'POST' }).catch(() => {});
  };

  // Lưu đề thi (Thêm mới hoặc Cập nhật)
  const handleSaveExam = async (formData: Partial<ReferenceExam>) => {
    const examId = formData.id || `exam-${Date.now()}`;
    const newExam: ReferenceExam = {
      id: examId,
      title: formData.title || 'Đề Thi Tham Khảo',
      subjectId: formData.subjectId || activeSectId,
      gradeTier: String(formData.gradeTier || activeGradeTier),
      category: formData.category || 'final_hk1',
      categoryName: formData.categoryName || 'Cuối Học Kỳ 1',
      schoolName: formData.schoolName,
      district: formData.district,
      province: formData.province || 'TP. Hồ Chí Minh',
      year: formData.year || '2024 - 2025',
      examPdfUrl: formData.examPdfUrl || '',
      solutionPdfUrl: formData.solutionPdfUrl,
      fileSizeExam: formData.fileSizeExam,
      fileSizeSolution: formData.fileSizeSolution,
      hasSolution: Boolean(formData.solutionPdfUrl),
      description: formData.description,
    };

    // Cập nhật state
    setExams(prev => {
      const filtered = prev.filter(e => e.id !== examId);
      const updated = [newExam, ...filtered];
      try {
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_EXAMS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Sync lên backend
    await fetch('/api/reference-exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExam),
    }).catch(() => {});
  };

  // Xóa đề thi
  const handleDeleteExam = async (exam: ReferenceExam) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa đề thi "${exam.title}" không?`)) {
      return;
    }

    setExams(prev => {
      const updated = prev.filter(e => e.id !== exam.id);
      try {
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_EXAMS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    await fetch(`/api/reference-exams/${exam.id}`, { method: 'DELETE' }).catch(() => {});
  };

  // Lọc danh sách đề thi theo môn, lớp, category, search
  const filteredExams = useMemo(() => {
    return filterReferenceExams(exams, {
      subjectId: activeSectId,
      gradeTier: String(activeGradeTier),
      category: selectedCategory,
      searchQuery,
    });
  }, [exams, activeSectId, activeGradeTier, selectedCategory, searchQuery]);

  // Đếm số lượng theo từng category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    const currentContextExams = exams.filter(
      e => e.subjectId === activeSectId && e.gradeTier === String(activeGradeTier)
    );
    counts.all = currentContextExams.length;

    EXAM_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = currentContextExams.filter(e => e.category === cat.id).length;
      }
    });
    return counts;
  }, [exams, activeSectId, activeGradeTier]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 space-y-4 animate-fade-in">
      {/* ── Minimalist Header & Filter Bar ── */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white/80 border-violet-100 shadow-sm'
            : 'bg-slate-900/80 border-slate-800 shadow-md'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">📑</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-base sm:text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Kho Đề Thi Tham Khảo
              </h1>
              {/* Nút đổi môn/lớp */}
              <button
                onClick={() => setSectModalOpen(true)}
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 cursor-pointer transition-all hover:scale-105 ${
                  isLight
                    ? 'bg-violet-50 text-violet-700 border-violet-200'
                    : 'bg-cyan-950/50 text-cyan-300 border-cyan-500/30'
                }`}
                title="Bấm để chuyển môn học hoặc khối lớp"
              >
                <span>{activeSect.icon}</span>
                <span>{activeSect.name} • Lớp {activeGradeTier}</span>
                <span className="text-[10px] opacity-70">▼</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Học sinh có thể xem trực tiếp hoặc tải file PDF về máy. Item đã tải sẽ được <strong className="text-cyan-400">in đậm</strong> và đánh dấu.
            </p>
          </div>
        </div>

        {/* Nút Viện Trưởng/Viện Phó Thêm Đề Mới */}
        {isStaff && (
          <button
            onClick={() => {
              setExamToEdit(null);
              setIsEditModalOpen(true);
            }}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all self-start md:self-auto cursor-pointer ${
              isLight
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-transparent shadow-sm'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border-transparent shadow-md shadow-cyan-500/20'
            }`}
          >
            <span>➕</span>
            <span>Thêm Đề Mới</span>
          </button>
        )}
      </div>

      {/* ── Category Tabs & Search Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin flex-1">
          {EXAM_CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? isLight
                      ? 'bg-violet-600 text-white border-transparent shadow-sm'
                      : 'bg-cyan-500 text-slate-950 border-transparent shadow-sm'
                    : isLight
                    ? 'bg-white hover:bg-violet-50 text-slate-700 border-violet-100'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-slate-950'
                      : isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative sm:w-80 flex-shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm tên trường, quận hoặc từ khóa..."
            className={`w-full pl-8 pr-8 py-1.5 rounded-xl border text-xs outline-none transition-all ${
              isLight
                ? 'bg-white border-violet-200 text-slate-800 focus:border-violet-400'
                : 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500'
            }`}
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Clean Minimalist List View (Bảng danh sách) ── */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-violet-100 shadow-sm'
            : 'bg-slate-900/70 border-slate-800 shadow-md'
        }`}
      >
        {filteredExams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr
                  className={`border-b font-orbitron uppercase text-[10px] tracking-wider ${
                    isLight
                      ? 'bg-violet-50/70 text-violet-800 border-violet-100'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800'
                  }`}
                >
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Tên Đề Thi & Trường</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Kỳ Thi</th>
                  <th className="py-3 px-4 hidden md:table-cell text-center">Đáp Án</th>
                  <th className="py-3 px-4 text-center">Tài Liệu & Tải Về</th>
                  {isStaff && <th className="py-3 px-4 text-center w-24">Quản Trị</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-500/10">
                {filteredExams.map((exam, idx) => {
                  const isDownloaded = downloadedIds.has(exam.id);

                  return (
                    <tr
                      key={exam.id}
                      className={`transition-colors group ${
                        isDownloaded
                          ? isLight
                            ? 'bg-violet-50/40 hover:bg-violet-50/70 font-semibold'
                            : 'bg-cyan-950/20 hover:bg-cyan-950/40 font-semibold'
                          : isLight
                          ? 'hover:bg-slate-50'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* STT + Badge Đã Tải */}
                      <td className="py-3 px-4 text-center text-slate-400 font-mono">
                        {isDownloaded ? (
                          <span
                            className="inline-block text-emerald-400 font-bold"
                            title="Bạn đã tải đề này về máy"
                          >
                            ✓
                          </span>
                        ) : (
                          idx + 1
                        )}
                      </td>

                      {/* Tên Đề Thi & Trường */}
                      <td className="py-3 px-4 min-w-[220px]">
                        <div className="flex items-center gap-2">
                          <span
                            className={`transition-colors ${
                              isDownloaded
                                ? isLight
                                  ? 'font-black text-violet-900 text-sm'
                                  : 'font-black text-cyan-300 text-sm'
                                : isLight
                                ? 'font-medium text-slate-800 group-hover:text-violet-600'
                                : 'font-medium text-slate-200 group-hover:text-cyan-400'
                            }`}
                          >
                            {exam.title}
                          </span>

                          {isDownloaded && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                              ĐÃ TẢI
                            </span>
                          )}
                        </div>

                        {/* Sub info */}
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          {exam.schoolName && <span>🏛️ {exam.schoolName}</span>}
                          {exam.district && <span>• {exam.district}</span>}
                          {exam.year && <span>• Năm: {exam.year}</span>}
                        </div>
                      </td>

                      {/* Phân Loại Kỳ Thi */}
                      <td className="py-3 px-4 hidden sm:table-cell whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            isLight
                              ? 'bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {exam.categoryName}
                        </span>
                      </td>

                      {/* Trạng Thái Lời Giải */}
                      <td className="py-3 px-4 hidden md:table-cell text-center whitespace-nowrap">
                        {exam.hasSolution ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Có Lời Giải
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-medium">
                            Chỉ Có Đề
                          </span>
                        )}
                      </td>

                      {/* Thao Tác: Xem & Tải */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {/* Xem Đề */}
                          <button
                            onClick={() => handleOpenPreview(exam, 'exam')}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                              isLight
                                ? 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200'
                                : 'bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border-cyan-500/30'
                            }`}
                            title="Xem trước đề thi"
                          >
                            <span>👁️</span>
                            <span className="hidden sm:inline">Xem Đề</span>
                          </button>

                          {/* Tải Đề */}
                          <a
                            href={exam.examPdfUrl}
                            download
                            onClick={() => markAsDownloaded(exam.id)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                              isDownloaded
                                ? isLight
                                  ? 'bg-violet-600 hover:bg-violet-700 text-white border-transparent shadow-sm'
                                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-transparent shadow-sm'
                                : isLight
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            }`}
                            title="Tải file đề thi PDF"
                          >
                            <span>⬇️</span>
                            <span className="hidden sm:inline">Tải Đề</span>
                          </a>

                          {/* Lời Giải Chi Tiết nếu có */}
                          {exam.hasSolution && exam.solutionPdfUrl && (
                            <>
                              <button
                                onClick={() => handleOpenPreview(exam, 'solution')}
                                className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                                  isLight
                                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/30'
                                }`}
                                title="Xem hướng dẫn giải chi tiết"
                              >
                                <span>💡</span>
                                <span className="hidden lg:inline">Lời Giải</span>
                              </button>

                              <a
                                href={exam.solutionPdfUrl}
                                download
                                onClick={() => markAsDownloaded(exam.id)}
                                className={`px-2 py-1 rounded-lg border text-xs flex items-center justify-center transition-all ${
                                  isLight
                                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-200'
                                    : 'bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 border-emerald-700/40'
                                }`}
                                title="Tải file lời giải chi tiết"
                              >
                                <span>📥</span>
                              </a>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Cột Quản Trị (Viện Trưởng & Viện Phó) */}
                      {isStaff && (
                        <td className="py-3 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setExamToEdit(exam);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-cyan-400 transition-all"
                              title="Sửa đề thi"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteExam(exam)}
                              className="p-1.5 rounded-lg border border-slate-700 hover:bg-rose-950/50 text-rose-400 transition-all"
                              title="Xóa đề thi"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="py-12 px-4 text-center space-y-2">
            <div className="text-4xl">🔍</div>
            <h4 className="font-bold text-sm text-slate-300">Không tìm thấy đề thi phù hợp</h4>
            <p className="text-xs text-slate-500">
              Hãy thử tìm kiếm từ khóa khác hoặc chuyển sang danh mục khác.
            </p>
          </div>
        )}
      </div>

      {/* ── PDF Viewer Modal ── */}
      {activePreview.isOpen && activePreview.exam && (
        <PdfViewerModal
          isOpen={activePreview.isOpen}
          onClose={() => setActivePreview(prev => ({ ...prev, isOpen: false }))}
          title={
            activePreview.type === 'solution'
              ? `Lời Giải Chi Tiết — ${activePreview.exam.title}`
              : activePreview.exam.title
          }
          pdfUrl={
            activePreview.type === 'solution'
              ? activePreview.exam.solutionPdfUrl || activePreview.exam.examPdfUrl
              : activePreview.exam.examPdfUrl
          }
          type={activePreview.type}
        />
      )}

      {/* ── Edit/Add Exam Modal cho Viện Trưởng & Viện Phó ── */}
      {isEditModalOpen && (
        <ExamEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveExam}
          examToEdit={examToEdit}
          defaultSubjectId={activeSectId}
          defaultGradeTier={String(activeGradeTier)}
        />
      )}
    </div>
  );
};
