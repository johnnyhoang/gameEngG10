import React, { useState } from 'react';
import { LogOut, X } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const currentUser = useGameState(state => state.currentUser);
  const isUnicorn = isLightTheme(uiTheme);
  const [localLoggingOut, setLocalLoggingOut] = useState(false);
  const logoutState = useGameState(state => state.logoutState);
  const isLoggingOut = localLoggingOut || logoutState === 'processing';

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLocalLoggingOut(true);
    try {
      // Give a small delay to let user read the farewell message
      await new Promise(resolve => setTimeout(resolve, 1500));
      await onConfirm();
    } catch (err) {
      console.error('Error during logout execution:', err);
      // Fallback: force immediate clean redirection to root path
      window.location.replace('/');
    } finally {
      setLocalLoggingOut(false);
    }
  };

  const isStudent = currentUser?.role === 'student';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className={`glass-panel rounded-2xl p-6 max-w-sm w-full border text-center transition-all duration-300 transform scale-100 relative ${
          isUnicorn
            ? 'border-violet-200/50 bg-white/95 shadow-[0_0_30px_rgba(139,92,246,0.15)] text-slate-800'
            : 'border-synth-magenta/30 bg-slate-900/90 shadow-[0_0_30px_rgba(255,0,127,0.15)] text-white'
        }`}
      >
        {!isLoggingOut ? (
          <>
            {/* Header Close button */}
            <button
              onClick={onCancel}
              className={`absolute right-4 top-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isUnicorn ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-600' : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Floating LogOut Icon */}
            <div className="flex justify-center mb-4 mt-2">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border animate-bounce shadow-md ${
                  isUnicorn
                    ? 'bg-fuchsia-50 border-fuchsia-200/50 text-fuchsia-600'
                    : 'bg-synth-magenta/10 border-synth-magenta/30 text-synth-magenta'
                }`}
              >
                <LogOut className="w-8 h-8" />
              </div>
            </div>

            {/* Dialog Title */}
            <h3 className={`font-orbitron font-black text-base uppercase tracking-wider mb-2 ${isUnicorn ? 'text-violet-800' : 'text-synth-magenta'}`}>
              Rời Học Viện
            </h3>

            {/* Dialog Content */}
            <div className="space-y-3 mb-6 px-2">
              <p className={`text-sm ${isUnicorn ? 'text-slate-600' : 'text-slate-300'}`}>
                {isStudent
                  ? 'Thiếu hiệp có chắc chắn muốn rời khỏi học viện rèn luyện hôm nay?'
                  : 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className={`flex-1 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider border transition-colors cursor-pointer ${
                  isUnicorn
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer transition-all duration-300 ${
                  isUnicorn
                    ? 'bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white hover:brightness-105 shadow-md shadow-fuchsia-500/20'
                    : 'bg-synth-magenta text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.4)]'
                }`}
              >
                Đồng ý
              </button>
            </div>
          </>
        ) : (
          <div className="py-6 space-y-4">
            <div className="flex justify-center">
              <span className="animate-spin rounded-full h-10 w-10 border-4 border-synth-magenta border-t-transparent" />
            </div>
            <div className="space-y-1">
              <h4 className={`font-orbitron font-bold text-sm uppercase tracking-widest ${isUnicorn ? 'text-violet-800' : 'text-synth-magenta'}`}>
                Đang đăng xuất...
              </h4>
              <p className={`text-xs ${isUnicorn ? 'text-slate-500' : 'text-slate-400'} animate-pulse`}>
                {isStudent ? 'Hẹn gặp lại thiếu hiệp tại học viện!' : 'Hẹn gặp lại bạn!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
