import React from 'react';
import type { ReferenceExam } from '../../types/referenceExam';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';

interface ReferenceExamCardProps {
  exam: ReferenceExam;
  onPreview: (exam: ReferenceExam, type: 'exam' | 'solution') => void;
}

export const ReferenceExamCard: React.FC<ReferenceExamCardProps> = ({ exam, onPreview }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isLight = isLightTheme(uiTheme);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${
        isLight
          ? 'bg-white/80 border-violet-100 hover:border-violet-300 shadow-sm hover:shadow-violet-200/50'
          : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 shadow-md hover:shadow-cyan-500/10'
      }`}
    >
      {/* Top badges & School info */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`text-[10px] sm:text-[11px] font-orbitron font-bold px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? 'bg-violet-100/80 text-violet-700 border-violet-200'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}
            >
              {exam.categoryName}
            </span>

            {exam.hasSolution ? (
              <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Có Lời Giải
              </span>
            ) : (
              <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
                Đề Thi
              </span>
            )}
          </div>

          {exam.year && (
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
              {exam.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h4
          className={`font-bold text-sm sm:text-base leading-snug mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 ${
            isLight ? 'text-slate-800 group-hover:text-violet-600' : 'text-slate-100'
          }`}
          title={exam.title}
        >
          {exam.title}
        </h4>

        {/* School & District / Sub info */}
        {(exam.schoolName || exam.district || exam.province) && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="inline-flex items-center gap-1">
              🏛️ {exam.schoolName || 'Đề Mẫu Ôn Tập'}
            </span>
            {exam.district && (
              <>
                <span>•</span>
                <span>{exam.district}</span>
              </>
            )}
          </div>
        )}

        {/* Description snippet if any */}
        {exam.description && (
          <p className="text-xs text-slate-400/90 line-clamp-2 mb-4 leading-relaxed">
            {exam.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-500/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-auto">
        {/* Exam PDF Action Group */}
        <div className="flex items-center gap-1.5 flex-1">
          <button
            onClick={() => onPreview(exam, 'exam')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
              isLight
                ? 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200 shadow-sm'
                : 'bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border-cyan-500/30 shadow-sm'
            }`}
            title="Xem đề thi trực tiếp"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Xem Đề</span>
            {exam.fileSizeExam && (
              <span className="text-[10px] opacity-75 font-normal">({exam.fileSizeExam})</span>
            )}
          </button>

          <a
            href={exam.examPdfUrl}
            download
            className={`p-2 rounded-xl border text-xs flex items-center justify-center transition-all duration-200 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Tải file đề thi PDF"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* Solution PDF Action Group if available */}
        {exam.hasSolution && exam.solutionPdfUrl && (
          <div className="flex items-center gap-1.5 flex-1">
            <button
              onClick={() => onPreview(exam, 'solution')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                isLight
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/30 shadow-sm'
              }`}
              title="Xem đáp án và lời giải chi tiết"
            >
              <span>💡</span>
              <span>Lời Giải</span>
              {exam.fileSizeSolution && (
                <span className="text-[10px] opacity-75 font-normal">({exam.fileSizeSolution})</span>
              )}
            </button>

            <a
              href={exam.solutionPdfUrl}
              download
              className={`p-2 rounded-xl border text-xs flex items-center justify-center transition-all duration-200 ${
                isLight
                  ? 'bg-emerald-100/60 hover:bg-emerald-200/80 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border-emerald-700/50'
              }`}
              title="Tải file lời giải PDF"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
