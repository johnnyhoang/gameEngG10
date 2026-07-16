import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  /** Nội dung phụ hiển thị cạnh nút đóng trên header (đồng hồ đếm giờ, điểm số...) */
  headerExtra?: React.ReactNode;
  /** Ghi đè class cho vùng nội dung (mặc định có padding + scroll) */
  bodyClassName?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
}

/**
 * Modal toàn màn hình — dùng chung cho game, bài giảng và thử thách.
 */
export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  title,
  headerExtra,
  bodyClassName,
  hideHeader = false,
  children
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Portal về body: tránh ancestor có transform/backdrop-filter (vd .glass-panel)
  // biến thành containing block làm lệch vị trí của fixed inset-0.
  return createPortal(
    <div className="fixed inset-0 z-[90] flex flex-col bg-synth-bg animate-overlay-fade-in">
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-wider truncate">
            {title || 'KHU VỰC HUẤN LUYỆN'}
          </h2>
          <div className="flex items-center gap-3 shrink-0">
            {headerExtra}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 overflow-y-auto overflow-x-hidden ${bodyClassName ?? 'p-4 sm:p-6'}`}>
        {children}
      </div>
    </div>,
    document.body
  );
};
