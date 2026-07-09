import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { ShieldAlert, AlertOctagon } from 'lucide-react';

interface MonChuHoiToiDialogProps {
  onConfirm: (reason: 'quá khó' | 'quá dài' | 'quá khùng', severity: number) => void;
  onCancel: () => void;
}

export const MonChuHoiToiDialog: React.FC<MonChuHoiToiDialogProps> = ({ onConfirm, onCancel }) => {
  const [reason, setReason] = useState<'quá khó' | 'quá dài' | 'quá khùng' | null>(null);
  const [severity, setSeverity] = useState<number>(3);
  
  const dailySkips = useGameState(state => state.player.dailySkips);
  const todayStr = new Date().toISOString().split('T')[0];
  const skipsToday = dailySkips?.date === todayStr ? dailySkips.count : 0;
  
  const isBlocked = skipsToday >= 3;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel border-red-500/50 bg-slate-900/90 rounded-2xl p-6 max-w-md w-full shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
            {isBlocked ? <AlertOctagon className="w-8 h-8 text-red-500" /> : <ShieldAlert className="w-8 h-8 text-red-500" />}
          </div>
          <h2 className="text-xl font-black font-orbitron text-red-500 uppercase tracking-wider text-center">
            Môn Chủ Vấn Tội
          </h2>
          <p className="text-xs text-red-400 font-semibold uppercase tracking-widest mt-1">
            Lượt bỏ qua hôm nay: {skipsToday}/3
          </p>
        </div>

        {isBlocked ? (
          <div className="text-center space-y-4">
            <p className="text-slate-300 font-serif italic text-sm border-l-4 border-red-500 pl-4 py-2 bg-red-500/10 rounded-r text-left">
              "To gan! Hôm nay ngươi đã trốn tránh thử thách quá nhiều lần rồi. Con đường tu luyện võ học không có chỗ cho kẻ hèn nhát. Lần này ta từ chối yêu cầu, ngươi phải tự mình đối mặt và trả lời câu hỏi này!"
            </p>
            <button
              onClick={onCancel}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-orbitron font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-colors cursor-pointer"
            >
              Quay lại trả lời
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-slate-300 font-serif italic text-sm border-l-4 border-red-500 pl-4 py-2 bg-red-500/10 rounded-r text-left">
              "Tại sao ngươi muốn bỏ qua thử thách này? Hãy khai rõ sự tình trước khi ta chấp thuận!"
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-left">Lý do né tránh:</label>
              <div className="grid grid-cols-1 gap-2">
                {(['quá khó', 'quá dài', 'quá khùng'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    className={`px-4 py-3 rounded-lg border text-sm font-semibold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                      reason === r 
                        ? 'bg-red-500/20 border-red-500 text-red-100' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">
                      {r === 'quá khó' ? '🥵' : r === 'quá dài' ? '📜' : '🤪'}
                    </span>
                    <span className="capitalize">{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                <span>Mức độ nghiêm trọng:</span>
                <span className="text-red-400">{severity}/5</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={severity} 
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full accent-red-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-1">
                <span>Nhẹ</span>
                <span>Rất nghiêm trọng</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase text-xs tracking-wider border border-slate-700 transition-colors cursor-pointer"
              >
                Hủy (Quay lại)
              </button>
              <button
                onClick={() => reason && onConfirm(reason, severity)}
                disabled={!reason}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-800 disabled:cursor-not-allowed text-white font-bold uppercase text-xs tracking-wider transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] cursor-pointer"
              >
                Xác nhận Bỏ qua
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
