import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { isLightTheme } from '../theme/uiThemes';
import { useSect } from '../contexts/SectContext';
import { SUBJECTS_CONFIG } from '../types/game';
import type { SubjectId } from '../types/game';

interface DesktopCentralNavProps {
  currentScreen: string;
  onNavigate: (screen: 'map' | 'arena' | 'hang' | 'shop' | 'relax' | 'pet' | 'profile') => void;
}

export const DesktopCentralNav: React.FC<DesktopCentralNavProps> = ({ currentScreen, onNavigate }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);
  const { activeSectId } = useSect();
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const activeSubjectConfig = SUBJECTS_CONFIG[activeSectId as SubjectId];

  const gates = [
    { id: 'arena', icon: '⚡', label: 'Trường Thi' },
    { id: 'hang', icon: '📚', label: 'Hang Luyện' },
    { id: 'relax', icon: '🦄', label: 'Sơn Trang' }
  ];

  return (
    <nav className={`hidden lg:flex items-center justify-between gap-3 mb-6 p-2 rounded-2xl border ${
      isUnicorn 
        ? 'glass-panel border-violet-200/35 bg-white/40' 
        : 'glass-panel border-synth-cyan/20 bg-black/40'
    }`}>
      {/* Môn phái hiện tại / Đổi môn */}
      <button
        onClick={() => setSectModalOpen(true)}
        className={`flex-1 flex items-center justify-center gap-2 px-3 xl:px-4 py-2.5 rounded-xl font-orbitron font-bold text-[10px] xl:text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
          isUnicorn
            ? 'border-violet-200/40 bg-violet-50 text-violet-800 hover:bg-violet-100'
            : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan hover:bg-synth-cyan/20'
        }`}
        title={`Môn phái hiện tại: ${activeSubjectConfig?.name}. Bấm để đổi môn.`}
      >
        <span className="text-lg">{activeSubjectConfig?.icon || '📖'}</span>
        <span>Môn: {activeSubjectConfig?.name || 'Chọn môn'}</span>
      </button>

      {/* Các khu học luyện */}
      {gates.map(gate => {
        const isActive = currentScreen === gate.id;
        return (
          <button
            key={gate.id}
            onClick={() => onNavigate(gate.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 xl:px-4 py-2.5 rounded-xl font-orbitron font-bold text-[10px] xl:text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
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
