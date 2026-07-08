import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Feather } from 'lucide-react';
import type { HandbookPage } from '../types/game';
import { useGameState } from '../hooks/useGameState';

interface GiangHoCamNangProps {
  isOpen: boolean;
  onClose: () => void;
  // If activePage is passed, it acts as a single page reading mode (login/logout popup)
  activePage?: HandbookPage | null;
  // Jump straight to this page id in normal browse mode (X/close vẫn dùng được, vẫn lật trang tự do) —
  // dùng cho mọi điểm chạm "?" khắp app, vì cốt lõi Cẩm Nang Bí Lục chính là help/guide (CORE_SPECS §2.7).
  initialPageId?: string;
  // If true, shows a logout option instead of close
  isLogoutMode?: boolean;
  onLogoutConfirm?: () => void;
}

export const GiangHoCamNang: React.FC<GiangHoCamNangProps> = ({
  isOpen,
  onClose,
  activePage,
  initialPageId,
  isLogoutMode = false,
  onLogoutConfirm
}) => {
  if (!isOpen) return null;

  const allHandbookPages = useGameState(state => state.handbookPages);
  const currentUser = useGameState(state => state.currentUser);
  const isAdminViewer = currentUser?.role === 'admin';

  // Trang dành riêng cho Viện Chủ chỉ hiện khi đang xem với vai trò Viện Chủ.
  const handbookPages = allHandbookPages.filter(p => p.audience !== 'admin' || isAdminViewer);

  const initialPage = initialPageId ? allHandbookPages.find(p => p.id === initialPageId) : undefined;

  // Group pages by category
  const categories = Array.from(new Set(handbookPages.map(p => p.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(initialPage?.category || categories[0] || '');
  const categoryPages = handbookPages.filter(p => p.category === selectedCategory);

  const [pageIndex, setPageIndex] = useState<number>(() => {
    if (!initialPage) return 0;
    const idx = categoryPages.findIndex(p => p.id === initialPage.id);
    return idx >= 0 ? idx : 0;
  });

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
      {/* Ancient Book Container — màu đổi theo Phong Vị đang chọn (CORE_SPECS §5), luôn dùng font-ancient-book */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-8 border-handbook-border bg-handbook-paper p-5 text-handbook-ink shadow-[0_30px_90px_rgba(0,0,0,0.8)] font-ancient-book">
        {/* Decorative Calligraphy Brush Pattern Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] text-handbook-ink" />

        {/* Silk Ribbon Border */}
        <div className="absolute inset-2 border-2 border-handbook-border-soft pointer-events-none rounded-[1.5rem]" />

        {/* Book Header decoration */}
        <div className="flex justify-between items-center border-b-2 border-handbook-border-soft pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-handbook-title animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-handbook-ink-soft font-mono">
              🏯 CẨM NANG BÍ LỤC • GIANG HỒ KỶ YẾU 📖
            </span>
          </div>
          {!activePage && (
            <button
              onClick={onClose}
              className="text-handbook-ink-soft hover:text-handbook-ink transition-colors p-1 cursor-pointer"
              title="Khép lại cẩm nang"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic Category Selector (Only in full reader mode) */}
        {!activePage && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin border-b border-handbook-border-soft">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPageIndex(0);
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-handbook-tab-active-bg text-handbook-tab-active-text shadow-sm'
                    : 'bg-handbook-tag-bg hover:opacity-80 text-handbook-ink-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content Page Section */}
        {currentPage ? (
          <div className="min-h-[180px] flex flex-col justify-between">
            <div>
              {/* Category tag */}
              <span className="inline-block text-[9px] font-black bg-handbook-tag-bg text-handbook-tag-text px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider font-mono">
                {currentPage.category}
              </span>

              {/* Page Title */}
              <h2 className="text-base font-black text-handbook-title mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-handbook-accent" />
                {currentPage.title}
              </h2>

              {/* Page Body: đoạn văn (lore) hoặc danh sách gạch đầu dòng (trợ giúp nhanh) */}
              {currentPage.bullets && currentPage.bullets.length > 0 ? (
                <div className="space-y-2 bg-handbook-content-bg p-3.5 rounded-xl border border-handbook-border-soft">
                  {currentPage.bullets.map((b, i) => (
                    <p key={i} className="text-handbook-ink leading-relaxed text-xs md:text-sm">
                      {b}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-handbook-ink leading-relaxed text-xs md:text-sm whitespace-pre-line bg-handbook-content-bg p-3.5 rounded-xl border border-handbook-border-soft">
                  {currentPage.content}
                </div>
              )}
            </div>

            {/* Bottom Page Navigation or Close Actions */}
            <div className="mt-8 flex justify-between items-center border-t border-handbook-border-soft pt-4">
              {/* Page Index indicator in reader mode */}
              {!activePage ? (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={pageIndex === 0}
                    className="flex items-center gap-1 text-xs font-bold text-handbook-title disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Trang Trước
                  </button>
                  <span className="text-xs font-bold font-mono text-handbook-ink-soft">
                    Trang {pageIndex + 1} / {categoryPages.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={pageIndex === categoryPages.length - 1}
                    className="flex items-center gap-1 text-xs font-bold text-handbook-title disabled:opacity-30 cursor-pointer"
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
                        className="px-6 py-2.5 rounded-xl border border-handbook-ink-soft bg-transparent text-handbook-ink-soft hover:opacity-80 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        Ở LẠI GIANG HỒ
                      </button>
                      <button
                        onClick={onLogoutConfirm}
                        className="px-6 py-2.5 rounded-xl bg-handbook-seal hover:bg-handbook-seal-hover text-handbook-seal-text font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
                      >
                        ĐÃ LĨNH NGỘ & RỜI ĐI 👋
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={onClose}
                      className="relative overflow-hidden px-8 py-3 bg-handbook-seal hover:bg-handbook-seal-hover text-handbook-seal-text font-black text-sm uppercase tracking-widest transition duration-300 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.35)] border border-handbook-border hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                      {/* Red Imperial Seal Style */}
                      <span className="relative z-10 flex items-center gap-2">
                        印 ĐÃ LĨNH NGỘ 🌟
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-handbook-ink-soft text-sm">
            Trang sách này chưa được ghi chép.
          </div>
        )}
      </div>
    </div>
  );
};
