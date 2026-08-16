import React, { useState, useMemo } from 'react';
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
import { ReferenceExamCard } from './ReferenceExamCard';
import { PdfViewerModal } from './PdfViewerModal';

export const ReferenceExamsPage: React.FC = () => {
  const { activeSectId, activeGradeTier } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const isLight = isLightTheme(uiTheme);

  const activeSect = SUBJECTS_CONFIG[activeSectId] || { name: 'Môn Học', icon: '📚' };

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

  // Lọc danh sách đề thi theo môn học, lớp, category, search
  const filteredExams = useMemo(() => {
    return filterReferenceExams(REFERENCE_EXAMS, {
      subjectId: activeSectId,
      gradeTier: String(activeGradeTier),
      category: selectedCategory,
      searchQuery,
    });
  }, [activeSectId, activeGradeTier, selectedCategory, searchQuery]);

  // Đếm số lượng đề theo từng category trong môn & lớp hiện tại
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    const currentContextExams = REFERENCE_EXAMS.filter(
      e => e.subjectId === activeSectId && e.gradeTier === String(activeGradeTier)
    );
    counts.all = currentContextExams.length;

    EXAM_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = currentContextExams.filter(e => e.category === cat.id).length;
      }
    });
    return counts;
  }, [activeSectId, activeGradeTier]);

  const handleOpenPreview = (exam: ReferenceExam, type: 'exam' | 'solution') => {
    setActivePreview({
      isOpen: true,
      exam,
      type,
    });
  };

  const handleClosePreview = () => {
    setActivePreview(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-6 animate-fade-in">
      {/* ── Top Header & Hero Banner ── */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 sm:p-7 md:p-8 transition-all duration-300 ${
          isLight
            ? 'glass-panel bg-gradient-to-br from-white/90 via-violet-50/50 to-pink-50/40 border-violet-200/60 shadow-lg shadow-violet-200/40'
            : 'glass-panel bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-cyan-950/40 border-cyan-500/20 shadow-xl shadow-cyan-950/50'
        }`}
      >
        {/* Background glow circle */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl sm:text-3xl">📑</span>
              <span
                className={`text-[11px] sm:text-xs font-orbitron font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isLight
                    ? 'bg-violet-100 text-violet-800 border-violet-200'
                    : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                }`}
              >
                Tàng Kinh Đề Thi • PDF Archive
              </span>

              {/* Learning Context Indicator */}
              <button
                onClick={() => setSectModalOpen(true)}
                className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all duration-200 hover:scale-105 cursor-pointer ${
                  isLight
                    ? 'bg-white text-slate-700 border-violet-200 shadow-sm hover:bg-violet-50'
                    : 'bg-slate-800/80 text-cyan-300 border-slate-700 hover:bg-slate-700'
                }`}
                title="Bấm để đổi môn học hoặc khối lớp"
              >
                <span>{activeSect.icon}</span>
                <span>{activeSect.name} • Lớp {activeGradeTier}</span>
                <span className="text-[10px] opacity-70">▼</span>
              </button>
            </div>

            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Kho Đề Thi & Đáp Án Tham Khảo
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Tuyển tập đề thi chính thức từ các trường THCS trọng điểm, đề thi học kỳ, tuyển sinh lớp 10 và đề ôn tập chuyên sâu dạng PDF có sẵn lời giải chi tiết.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div
              className={`flex-1 sm:flex-initial px-4 py-3 rounded-2xl border text-center ${
                isLight
                  ? 'bg-white/90 border-violet-100 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="font-orbitron font-extrabold text-lg sm:text-xl text-cyan-400">
                {categoryCounts.all}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-medium">
                Bộ Đề {activeSect.name}
              </div>
            </div>

            <div
              className={`flex-1 sm:flex-initial px-4 py-3 rounded-2xl border text-center ${
                isLight
                  ? 'bg-white/90 border-violet-100 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="font-orbitron font-extrabold text-lg sm:text-xl text-emerald-400">
                100%
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-medium">
                Kèm Lời Giải
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters & Search Controls ── */}
      <div className="space-y-4">
        {/* Category Pills Slider / Wrap */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700/50">
          {EXAM_CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? isLight
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white border-transparent shadow-md shadow-violet-300/50 scale-105'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-transparent shadow-md shadow-cyan-500/20 scale-105'
                    : isLight
                    ? 'bg-white/80 hover:bg-violet-50 text-slate-700 border-violet-100 shadow-sm'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-orbitron ${
                    isSelected
                      ? isLight
                        ? 'bg-white/30 text-white'
                        : 'bg-black/30 text-slate-950'
                      : isLight
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên trường (VD: Trần Đại Nghĩa, Nguyễn Văn Tố, Lê Quý Đôn...), quận huyện hoặc từ khóa..."
            className={`w-full pl-10 pr-10 py-3 rounded-2xl border text-xs sm:text-sm transition-all outline-none focus:ring-2 ${
              isLight
                ? 'bg-white/90 border-violet-200 text-slate-800 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-300/30'
                : 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20'
            }`}
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200"
              title="Xóa tìm kiếm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Exam Cards Grid / Results ── */}
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredExams.map(exam => (
            <ReferenceExamCard
              key={exam.id}
              exam={exam}
              onPreview={handleOpenPreview}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className={`flex flex-col items-center justify-center py-16 px-4 rounded-3xl border text-center ${
            isLight
              ? 'bg-white/50 border-violet-100'
              : 'bg-slate-900/30 border-slate-800'
          }`}
        >
          <div className="text-5xl mb-3">🔍</div>
          <h3
            className={`font-bold text-base sm:text-lg mb-1 ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            Chưa tìm thấy đề tham khảo phù hợp
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-5 leading-relaxed">
            {searchQuery
              ? `Không có kết quả nào khớp với từ khóa "${searchQuery}". Hãy thử tìm tên trường khác hoặc xóa bộ lọc.`
              : `Hiện tại chưa có đề tham khảo cho danh mục này. Thư viện đang liên tục cập nhật thêm đề mới.`}
          </p>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-violet-100 hover:bg-violet-200 text-violet-700 border-violet-200'
                  : 'bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border-cyan-500/30'
              }`}
            >
              Đặt Lại Bộ Lọc
            </button>
          )}
        </div>
      )}

      {/* ── PDF Viewer Modal ── */}
      {activePreview.isOpen && activePreview.exam && (
        <PdfViewerModal
          isOpen={activePreview.isOpen}
          onClose={handleClosePreview}
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
    </div>
  );
};
