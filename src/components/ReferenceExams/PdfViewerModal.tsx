import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  type: 'exam' | 'solution';
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfUrl,
  type,
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isLight = isLightTheme(uiTheme);

  if (!isOpen || !pdfUrl) return null;

  const isSolution = type === 'solution';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          isLight
            ? 'bg-white/95 border-violet-200 text-slate-800 shadow-violet-500/20'
            : 'bg-slate-950/95 border-cyan-500/30 text-white shadow-cyan-500/20'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isLight
              ? 'bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border-violet-100'
              : 'bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/50 border-cyan-500/20'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <span className="text-2xl flex-shrink-0">
              {isSolution ? '💡' : '📄'}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-orbitron font-bold px-2 py-0.5 rounded-full border ${
                    isSolution
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                  }`}
                >
                  {isSolution ? 'Lời Giải Chi Tiết' : 'Đề Thi PDF'}
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base truncate mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Open in new tab button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all duration-200 ${
                isLight
                  ? 'bg-violet-100 hover:bg-violet-200 text-violet-700 border-violet-200'
                  : 'bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border-cyan-500/30'
              }`}
              title="Mở trong tab mới"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline font-medium">Tab mới</span>
            </a>

            {/* Download button */}
            <a
              href={pdfUrl}
              download
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 font-bold transition-all duration-200 ${
                isLight
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-transparent shadow-sm'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border-transparent shadow-sm shadow-cyan-500/30'
              }`}
              title="Tải file PDF về máy"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline font-medium">Tải về</span>
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Đóng cửa sổ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Embedded Frame */}
        <div className="flex-1 w-full bg-slate-900/50 relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            title={title}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
