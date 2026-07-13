import React from 'react';
import { Coins, X } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';

interface RubyConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  cost: number;
  actionDescription: string;
  isLoading?: boolean;
}

export const RubyConfirmModal: React.FC<RubyConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  cost,
  actionDescription,
  isLoading = false,
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className={`glass-panel rounded-2xl p-6 max-w-sm w-full border text-center transition-all duration-300 transform scale-100 relative ${
          isUnicorn
            ? 'border-violet-200/50 bg-white/95 shadow-[0_0_30px_rgba(139,92,246,0.15)] text-slate-800'
            : 'border-synth-orange/30 bg-slate-900/90 shadow-[0_0_30px_rgba(249,115,22,0.15)] text-white'
        }`}
      >
        {/* Header Close button */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className={`absolute right-4 top-4 p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
            isUnicorn ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Ruby Icon */}
        <div className="flex justify-center mb-4 mt-2">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border animate-bounce shadow-md ${
              isUnicorn
                ? 'bg-fuchsia-50 border-fuchsia-200/50 text-fuchsia-600'
                : 'bg-synth-orange/10 border-synth-orange/30 text-synth-orange'
            }`}
          >
            <Coins className="w-8 h-8" />
          </div>
        </div>

        {/* Dialog Title */}
        <h3 className={`font-orbitron font-black text-base uppercase tracking-wider mb-2 ${isUnicorn ? 'text-violet-800' : 'text-synth-orange'}`}>
          Xác Nhận Tiêu Hao
        </h3>

        {/* Dialog Content */}
        <div className="space-y-3 mb-6 px-2">
          <p className={`text-sm font-serif italic ${isUnicorn ? 'text-slate-600' : 'text-slate-300'}`}>
            "Sĩ Tử có đồng ý tiêu tốn <span className="font-bold text-synth-orange font-orbitron">{cost} Ruby</span> để {actionDescription} không?"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`flex-1 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isUnicorn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
              isUnicorn
                ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white hover:brightness-105 shadow-md shadow-fuchsia-500/20'
                : 'bg-synth-orange text-black hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full"></span>
                Đang xử lý...
              </>
            ) : (
              'Đồng ý'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
