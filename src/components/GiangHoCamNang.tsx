import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Feather } from 'lucide-react';
import type { HandbookPage } from '../types/game';
import { useGameState } from '../hooks/useGameState';

interface GiangHoCamNangProps {
  isOpen: boolean;
  onClose: () => void;
  // If activePage is passed, it acts as a single page reading mode (login/logout popup)
  activePage?: HandbookPage | null;
  // If true, shows a logout option instead of close
  isLogoutMode?: boolean;
  onLogoutConfirm?: () => void;
}

export const GiangHoCamNang: React.FC<GiangHoCamNangProps> = ({
  isOpen,
  onClose,
  activePage,
  isLogoutMode = false,
  onLogoutConfirm
}) => {
  if (!isOpen) return null;

  const handbookPages = useGameState(state => state.handbookPages);

  // Group pages by category
  const categories = Array.from(new Set(handbookPages.map(p => p.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  const categoryPages = handbookPages.filter(p => p.category === selectedCategory);
  
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Determine which page to show
  const currentPage = activePage || categoryPages[pageIndex];

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleNext = () => {
    if (pageIndex < categoryPages.length - 1) setPageIndex(pageIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      {/* Ancient Book Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border-8 border-amber-950 bg-[#ebdcb9] p-6 text-stone-900 shadow-[0_30px_90px_rgba(0,0,0,0.8)] md:p-10 font-serif">
        {/* Decorative Calligraphy Brush Pattern Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Silk Ribbon Border */}
        <div className="absolute inset-2 border-2 border-stone-800/25 pointer-events-none rounded-[2rem]" />
        
        {/* Book Header decoration */}
        <div className="flex justify-between items-center border-b-2 border-stone-800/20 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Feather className="w-5 h-5 text-red-800 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-stone-700 font-mono">
              🏯 CẨM NANG BÍ LỤC • GIANG HỒ KỶ YẾU 📖
            </span>
          </div>
          {!activePage && (
            <button
              onClick={onClose}
              className="text-stone-600 hover:text-stone-900 transition-colors p-1"
              title="Khép lại cẩm nang"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Category Selector (Only in full reader mode) */}
        {!activePage && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin border-b border-stone-800/10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPageIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-950 text-white shadow-md'
                    : 'bg-stone-800/5 hover:bg-stone-800/10 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content Page Section */}
        {currentPage ? (
          <div className="min-h-[260px] flex flex-col justify-between">
            <div>
              {/* Category tag */}
              <span className="inline-block text-[10px] font-black bg-stone-900/10 text-stone-800 px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider font-mono">
                {currentPage.category}
              </span>
              
              {/* Page Title */}
              <h2 className="text-2xl font-black text-red-950 mb-4 font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {currentPage.title}
              </h2>

              {/* Page Body text */}
              <div className="text-stone-800 leading-relaxed text-sm md:text-base font-serif whitespace-pre-line bg-stone-900/[0.02] p-4 rounded-xl border border-stone-800/5">
                {currentPage.content}
              </div>
            </div>

            {/* Bottom Page Navigation or Close Actions */}
            <div className="mt-8 flex justify-between items-center border-t border-stone-800/10 pt-4">
              {/* Page Index indicator in reader mode */}
              {!activePage ? (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={pageIndex === 0}
                    className="flex items-center gap-1 text-xs font-bold text-red-900 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Trang Trước
                  </button>
                  <span className="text-xs font-bold font-mono text-stone-500">
                    Trang {pageIndex + 1} / {categoryPages.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={pageIndex === categoryPages.length - 1}
                    className="flex items-center gap-1 text-xs font-bold text-red-900 disabled:opacity-30 cursor-pointer"
                  >
                    Trang Sau <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* Login / Logout special seal button */
                <div className="w-full flex justify-center mt-2">
                  {isLogoutMode ? (
                    <div className="flex gap-4">
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-stone-700 bg-transparent text-stone-700 hover:bg-stone-800/5 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        Ở LẠI GIANG HỒ
                      </button>
                      <button
                        onClick={onLogoutConfirm}
                        className="px-6 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-red-950/20"
                      >
                        ĐÃ LĨNH NGỘ & RỜI ĐI 👋
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={onClose}
                      className="relative overflow-hidden px-8 py-3 bg-red-900 hover:bg-red-800 text-white font-black text-sm uppercase tracking-widest transition duration-300 rounded-lg shadow-[0_4px_15px_rgba(153,27,27,0.4)] border border-red-950 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                      {/* Red Imperial Seal Style */}
                      <span className="relative z-10 flex items-center gap-2">
                        印 ĐÃ LĨNH NGỘ 🌟
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-800 to-red-950 opacity-0 hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-stone-500 text-sm">
            Trang sách này chưa được ghi chép.
          </div>
        )}
      </div>
    </div>
  );
};
