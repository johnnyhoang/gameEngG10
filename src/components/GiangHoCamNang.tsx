import { isSuperAdmin } from '../utils/roleHelpers';
import React, { useEffect } from 'react';
import { X, Sparkles, Feather } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';

interface GiangHoCamNangProps {
  isOpen: boolean;
  onClose: () => void;
  initialPageId?: string;
}

export const GiangHoCamNang: React.FC<GiangHoCamNangProps> = ({
  isOpen,
  onClose,
  initialPageId
}) => {
  const allHandbookPages = useGameState(state => state.handbookPages);
  const currentUser = useGameState(state => state.currentUser);
  const isAdminViewer = isSuperAdmin(currentUser?.role);

  // Trang dành riêng cho Viện Trưởng chỉ hiện khi đang xem với vai trò Viện Trưởng.
  const handbookPages = allHandbookPages.filter(p => p.audience !== 'admin' || isAdminViewer);

  // Group pages by category
  const categories = Array.from(new Set(handbookPages.map(p => p.category)));

  // Scroll to initialPageId and trigger highlight glow
  useEffect(() => {
    if (isOpen && initialPageId && initialPageId !== 'all') {
      let targetId = initialPageId;
      const foundPage = allHandbookPages.find(
        p => p.id === targetId || p.id === `help-${targetId}` || p.id === `hb-${targetId}`
      );
      if (foundPage) {
        targetId = foundPage.id;
      }

      const timer = setTimeout(() => {
        const element = document.getElementById(`hb-section-${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('custom-glow');
          
          const glowTimer = setTimeout(() => {
            element.classList.remove('custom-glow');
          }, 2500);
          return () => clearTimeout(glowTimer);
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialPageId, allHandbookPages]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-sm transition-opacity duration-300 flex justify-start cursor-pointer" 
      onClick={onClose}
    >
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-glow {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.5) !important;
          border-color: rgba(0, 240, 255, 0.8) !important;
          transform: scale(1.02);
        }
      `}</style>

      {/* Ancient Book Panel Drawer */}
      <div 
        className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl h-full border-r-8 border-handbook-border bg-handbook-paper p-6 text-handbook-ink shadow-[10px_0_40px_rgba(0,0,0,0.6)] font-ancient-book flex flex-col animate-slide-in-left cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Calligraphy Brush Pattern Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-handbook-ink" />

        {/* Silk Ribbon Border */}
        <div className="absolute inset-2 border-2 border-handbook-border-soft pointer-events-none rounded-[1.5rem]" />

        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-handbook-border-soft pb-3 mb-4 z-10 shrink-0">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-handbook-title animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-handbook-title font-mono">
              🏯 CẨM NANG HỌC ĐƯỜNG 📖
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-handbook-ink-soft hover:text-handbook-ink transition-colors p-1 cursor-pointer"
            title="Khép lại cẩm nang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table of Contents (Mục lục) */}
        <div className="z-10 mb-4 shrink-0">
          <span className="text-[9px] uppercase tracking-wider text-handbook-ink-soft font-bold block mb-1">Mục Lục Chương / Category:</span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  const element = document.getElementById(`cat-section-${cat.replace(/\s+/g, '-')}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap bg-handbook-tab-active-bg text-handbook-tab-active-text border border-handbook-border-soft shadow-sm hover:opacity-90 cursor-pointer transition-all"
              >
                📖 {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Handbook Pages List */}
        <div 
          className="flex-1 overflow-y-auto pr-1 space-y-8 scrollbar-thin z-10 scroll-smooth pb-10" 
          id="handbook-scroll-container"
        >
          {categories.map(cat => {
            const pagesInCategory = handbookPages.filter(p => p.category === cat);
            return (
              <div key={cat} id={`cat-section-${cat.replace(/\s+/g, '-')}`} className="space-y-4 pt-1">
                {/* Category Heading */}
                <div className="flex items-center gap-2">
                  <div className="h-px bg-handbook-border-soft flex-1"></div>
                  <h3 className="text-xs font-black bg-handbook-seal text-handbook-seal-text px-3 py-1.5 rounded-lg uppercase tracking-wider font-mono shadow-sm">
                    {cat}
                  </h3>
                  <div className="h-px bg-handbook-border-soft flex-1"></div>
                </div>

                <div className="space-y-5">
                  {pagesInCategory.map((page, index) => (
                    <div 
                      key={page.id} 
                      id={`hb-section-${page.id}`} 
                      className="p-5 rounded-2xl bg-handbook-content-bg border border-handbook-border-soft transition-all duration-300 shadow-sm relative group hover:shadow-md"
                    >
                      {/* Page Header */}
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-black text-handbook-title flex items-center gap-1.5 leading-tight">
                          <Sparkles className="w-4 h-4 text-handbook-accent shrink-0 group-hover:scale-110 transition-transform duration-300" />
                          {page.title}
                        </h4>
                        <span className="text-[9px] font-bold text-handbook-ink-soft bg-handbook-tag-bg px-2 py-0.5 rounded-md font-mono shrink-0">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Content Body */}
                      {page.bullets && page.bullets.length > 0 ? (
                        <div className="space-y-2 pl-3 border-l-2 border-handbook-accent/40 font-sans">
                          {page.bullets.map((b, i) => (
                            <p key={i} className="text-handbook-ink leading-relaxed text-xs md:text-sm">
                              {b}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-handbook-ink leading-relaxed text-xs md:text-sm whitespace-pre-line font-sans pl-1">
                          {page.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
