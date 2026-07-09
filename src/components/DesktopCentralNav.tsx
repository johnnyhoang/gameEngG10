import React from 'react';
import { useGameState } from '../hooks/useGameState';

interface DesktopCentralNavProps {
  currentScreen: string;
  onNavigate: (screen: 'map' | 'arena' | 'hang' | 'shop' | 'relax' | 'pet') => void;
}

export const DesktopCentralNav: React.FC<DesktopCentralNavProps> = ({ currentScreen, onNavigate }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const gates = [
    { id: 'map', icon: '🗺️', label: 'Bản Đồ' },
    { id: 'arena', icon: '⚡', label: 'Đấu Trường' },
    { id: 'hang', icon: '📚', label: 'Hang Luyện' },
    { id: 'relax', icon: '🦄', label: 'Sơn Trang' },
    { id: 'shop', icon: '🏮', label: 'Bách Hóa' },
    { id: 'pet', icon: '🐷', label: 'Sân Thú' }
  ];

  return (
    <nav className={`hidden lg:flex items-center justify-between gap-2 mb-6 p-2 rounded-2xl border ${
      isUnicorn 
        ? 'glass-panel border-violet-200/35 bg-white/40' 
        : 'glass-panel border-synth-cyan/20 bg-black/40'
    }`}>
      {gates.map(gate => {
        const isActive = currentScreen === gate.id;
        return (
          <button
            key={gate.id}
            onClick={() => onNavigate(gate.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 xl:px-4 py-2.5 rounded-xl font-orbitron font-bold text-[10px] xl:text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isActive 
                ? (isUnicorn 
                    ? 'bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-100 text-violet-900 shadow-[0_0_10px_rgba(192,132,252,0.3)] border border-violet-300/50' 
                    : 'bg-synth-cyan text-black shadow-[0_0_10px_#00f0ff] border border-transparent') 
                : (isUnicorn 
                    ? 'text-violet-600/70 hover:bg-white/60 border border-transparent' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-synth-cyan border border-transparent')
            }`}
          >
            <span className="text-lg">{gate.icon}</span>
            <span>{gate.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
