import React from 'react';
import { X, Check } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import { SUBJECTS_CONFIG } from '../types/game';
import { useSect } from '../contexts/SectContext';
import { isLightTheme } from '../theme/uiThemes';
import type { SubjectId } from '../types/game';

export const GlobalSectModal: React.FC = () => {
  const isSectModalOpen = useGameState(state => state.isSectModalOpen);
  const setSectModalOpen = useGameState(state => state.setSectModalOpen);
  const { activeSectId, setActiveSectId } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  if (!isSectModalOpen) return null;

  const subjects = Object.values(SUBJECTS_CONFIG);
  const chuyenSau = subjects.filter(s => s.group === 'chuyen_sau');
  const coBan = subjects.filter(s => s.group === 'co_ban');

  const handleSelect = (id: SubjectId) => {
    setActiveSectId(id);
    setSectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-3xl border p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col gap-6 animate-fade-in ${
        isUnicorn 
          ? 'bg-gradient-to-br from-fuchsia-50 via-white to-cyan-50 border-violet-200 text-violet-900'
          : 'bg-synth-bg border-synth-cyan/20 text-white'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h2 className="font-orbitron font-black text-lg uppercase tracking-wider bg-gradient-to-r from-synth-cyan to-synth-magenta bg-clip-text text-transparent">
              Chọn Môn Phái (Sect Selection)
            </h2>
            <p className={`text-[10px] uppercase font-bold tracking-widest font-orbitron ${isUnicorn ? 'text-violet-600/70' : 'text-synth-cyan'}`}>
              Chọn môn học để tập trung tu học
            </p>
          </div>
          <button 
            onClick={() => setSectModalOpen(false)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isUnicorn 
                ? 'border-violet-200/50 hover:bg-violet-100 text-violet-700'
                : 'border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chuyên Sâu */}
        <div className="space-y-3">
          <h3 className="text-xs font-black font-orbitron uppercase tracking-widest text-synth-orange">
            🔥 Môn Phái Ôn Thi Chuyên Sâu (Lớp 10)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {chuyenSau.map(s => {
              const active = s.id === activeSectId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.1)' }}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    active 
                      ? 'bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                      : 'bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-orbitron font-bold text-xs uppercase text-white">{s.name}</span>
                  </div>
                  {active && <Check className="w-4 h-4 text-synth-cyan" style={{ color: s.color }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cơ Bản */}
        <div className="space-y-3">
          <h3 className="text-xs font-black font-orbitron uppercase tracking-widest text-synth-cyan">
            ❄️ Môn Phái Kiến Thức Lớp 9 Cơ Bản
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {coBan.map(s => {
              const active = s.id === activeSectId;
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s.id)}
                  style={{ borderColor: active ? s.color : 'rgba(255,255,255,0.1)' }}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    active 
                      ? 'bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                      : 'bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-orbitron font-bold text-xs uppercase text-white">{s.name}</span>
                  </div>
                  {active && <Check className="w-4 h-4 text-synth-cyan" style={{ color: s.color }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
