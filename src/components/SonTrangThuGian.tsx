import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { isLightTheme } from '../theme/uiThemes';

export const SonTrangThuGian: React.FC = () => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`glass-panel p-8 rounded-3xl text-center border ${
        isUnicorn 
          ? 'border-violet-200/40 bg-gradient-to-br from-fuchsia-100/50 via-white/50 to-cyan-100/50' 
          : 'border-synth-cyan/30 bg-black/40'
      }`}>
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-xl">
          <span className="text-5xl animate-float">🦄</span>
        </div>
        <h2 className={`text-2xl font-black font-orbitron uppercase tracking-widest mb-4 ${
          isUnicorn ? 'text-violet-800' : 'text-synth-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]'
        }`}>
          Công Viên Thư Giãn
        </h2>
        <p className={`max-w-xl mx-auto text-sm leading-relaxed font-semibold ${
          isUnicorn ? 'text-violet-600/80' : 'text-slate-300'
        }`}>
          Nơi đây phong cảnh hữu tình, mây trắng vờn quanh đỉnh núi, thác nước róc rách tuôn chảy. Sĩ Tử có thể dạo bước ngắm cảnh, hoặc đắm mình vào các kỳ cục trí tuệ (mini-games) để mài dũa tư duy mà không lo áp lực thi cử.
        </p>
        
        <div className="mt-8 inline-block px-6 py-3 rounded-full border border-dashed border-white/30 bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-400">
          🚧 Các khu vực Cảnh Hoa Viên, Núi Rừng, Thác Hồ đang được xây dựng...
        </div>
      </div>
    </div>
  );
};
