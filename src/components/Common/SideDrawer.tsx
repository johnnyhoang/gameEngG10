import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  /** Tailwind max-width class cho panel, ví dụ 'max-w-xl' | 'max-w-2xl' */
  widthClass?: string;
  panelClassName?: string;
  children: React.ReactNode;
}

/**
 * Side Panel / Drawer trượt từ cạnh phải — dùng chung cho mọi form
 * xem / thêm / sửa dữ liệu (thay cho modal căn giữa màn hình).
 */
export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  title,
  widthClass = 'max-w-xl',
  panelClassName = '',
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-overlay-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`relative h-full w-full ${widthClass} glass-panel border-l border-white/10 shadow-2xl flex flex-col animate-drawer-in-right ${panelClassName}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
          <h4 className="font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 min-w-0">
            {title}
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
