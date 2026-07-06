import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Activity, Sparkles } from 'lucide-react';

export const PetSanctuary: React.FC = () => {
  const pet = useGameState(state => state.pet);
  const feedPet = useGameState(state => state.feedPet);
  const [interacting, setInteracting] = useState(false);

  const handleFeed = () => {
    setInteracting(true);
    feedPet();
    setTimeout(() => setInteracting(false), 2000);
  };

  // Get evolutionary stage display names
  const getStageTitle = (stage: string) => {
    switch (stage) {
      case 'egg': return 'Trứng Rồng cổ đại';
      case 'baby': return 'Rồng Con sơ sinh';
      case 'dragon': return 'Hắc Long Trưởng Thành';
      case 'legend': return 'Cổ Long Huyền Thoại';
      default: return 'Trứng Rồng';
    }
  };

  // SVG graphic for different pet stages
  const renderPetAvatar = () => {
    const isHappy = pet.mood === 'happy' || interacting;
    const isSad = pet.mood === 'sad';

    const glowClass = pet.stage === 'legend' 
      ? 'shadow-[0_0_30px_#ff007f]' 
      : pet.stage === 'dragon' 
        ? 'shadow-[0_0_20px_#00f0ff]' 
        : 'shadow-[0_0_10px_rgba(255,255,255,0.2)]';

    if (pet.stage === 'egg') {
      return (
        <div className={`relative w-36 h-44 mx-auto rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] bg-gradient-to-t from-synth-purple via-synth-magenta to-synth-cyan border-2 border-white/20 flex items-center justify-center overflow-hidden ${glowClass} ${interacting ? 'animate-bounce' : 'animate-pulse'}`}>
          {/* Crack lines on egg */}
          <div className="absolute inset-0 bg-transparent opacity-30 flex flex-col justify-around">
            <div className="w-full h-[1px] bg-white transform rotate-12"></div>
            <div className="w-full h-[1px] bg-white transform -rotate-45"></div>
            <div className="w-full h-[1px] bg-white transform rotate-45"></div>
          </div>
          <Sparkles className="w-8 h-8 text-white absolute animate-spin opacity-60" style={{ animationDuration: '8s' }} />
        </div>
      );
    }

    if (pet.stage === 'baby') {
      return (
        <div className={`relative w-40 h-40 mx-auto flex items-center justify-center ${interacting ? 'animate-bounce' : 'animate-float'}`}>
          {/* Baby Dragon body */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-synth-purple to-synth-cyan flex flex-col items-center justify-center border border-white/20 relative shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            {/* Eyes */}
            <div className="flex gap-4 mb-2">
              <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full bg-black ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
              </div>
              <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full bg-black ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
              </div>
            </div>
            {/* Mouth */}
            <div className={`w-4 h-2 bg-synth-magenta rounded-b-full ${isHappy ? 'scale-y-125' : 'scale-y-50'}`} />
            
            {/* Tiny Wings */}
            <div className="absolute -left-4 w-6 h-8 bg-synth-purple rounded-l-full transform -rotate-12 animate-pulse" />
            <div className="absolute -right-4 w-6 h-8 bg-synth-cyan rounded-r-full transform rotate-12 animate-pulse" />
          </div>
        </div>
      );
    }

    // Default: Dragon or Legend Dragon
    return (
      <div className={`relative w-48 h-48 mx-auto flex items-center justify-center ${interacting ? 'animate-bounce' : 'animate-float'}`}>
        <div className="relative">
          {/* Dragon Wings */}
          <div 
            className="absolute -left-12 top-2 w-16 h-24 bg-gradient-to-l from-synth-purple to-synth-magenta rounded-l-3xl origin-right transform rotate-12 animate-pulse"
            style={{ animationDuration: pet.stage === 'legend' ? '1.5s' : '3s' }}
          />
          <div 
            className="absolute -right-12 top-2 w-16 h-24 bg-gradient-to-r from-synth-purple to-synth-cyan rounded-r-3xl origin-left transform -rotate-12 animate-pulse"
            style={{ animationDuration: pet.stage === 'legend' ? '1.5s' : '3s' }}
          />

          {/* Dragon Head/Body */}
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-synth-purple via-synth-gray to-synth-cyan flex flex-col items-center justify-center border-2 border-synth-cyan/40 relative shadow-[0_0_25px_rgba(0,240,255,0.6)]">
            {/* Horns */}
            <div className="absolute -top-6 flex justify-between w-20">
              <div className="w-4 h-8 bg-synth-cyan rounded-t-full transform -rotate-12" />
              <div className="w-4 h-8 bg-synth-cyan rounded-t-full transform rotate-12" />
            </div>

            {/* Eyes */}
            <div className="flex gap-6 mb-2">
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-synth-cyan">
                <div className={`w-2.5 h-2.5 rounded-full bg-black ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
              </div>
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-synth-cyan">
                <div className={`w-2.5 h-2.5 rounded-full bg-black ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
              </div>
            </div>

            {/* Mouth */}
            <div className={`w-6 h-3 bg-synth-magenta rounded-b-full ${isHappy ? 'scale-y-125' : 'scale-y-50'}`} />
          </div>
        </div>
      </div>
    );
  };

  const getMoodEmoji = (mood: string) => {
    if (interacting) return '🥰';
    switch (mood) {
      case 'happy': return '😊 Hạnh phúc';
      case 'sad': return '😢 Buồn chán';
      case 'sleeping': return '😴 Đang ngủ';
      default: return '😐 Bình thường';
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-synth-cyan/15 p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-synth-gray pb-3">
        <h3 className="font-orbitron font-bold text-synth-cyan text-sm uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4" /> Pet Sanctuary
        </h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30 font-orbitron">
          LV.{pet.level}
        </span>
      </div>

      {/* Pet graphic */}
      <div className="flex-1 flex flex-col justify-center py-6 relative">
        {renderPetAvatar()}
        
        <div className="text-center mt-6">
          <h4 className="font-orbitron font-bold text-lg text-white mb-1">
            {pet.name}
          </h4>
          <p className="text-xs text-synth-text-muted mb-4 font-semibold uppercase tracking-wider">
            {getStageTitle(pet.stage)}
          </p>
        </div>
      </div>

      {/* Pet Stats & Actions */}
      <div className="space-y-4 border-t border-synth-gray pt-4">
        {/* EXP Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-synth-text-muted">Độ Trưởng Thành</span>
            <span className="text-synth-cyan font-orbitron">{pet.exp}/{pet.level * 150}</span>
          </div>
          <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-synth-cyan shadow-[0_0_8px_#00f0ff] transition-all duration-300"
              style={{ width: `${Math.min(100, (pet.exp / (pet.level * 150)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <div className="bg-synth-gray/40 rounded-lg p-2 flex flex-col border border-white/5">
            <span className="text-[10px] text-synth-text-muted uppercase">Tâm Trạng</span>
            <span className="text-white mt-0.5">{getMoodEmoji(pet.mood)}</span>
          </div>
          <div className="bg-synth-gray/40 rounded-lg p-2 flex flex-col border border-white/5">
            <span className="text-[10px] text-synth-text-muted uppercase">Năng Lượng</span>
            <span className="text-white mt-0.5">{pet.energy}/100</span>
          </div>
        </div>

        {/* Interact Actions */}
        <button
          onClick={handleFeed}
          disabled={interacting}
          className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.2)] disabled:opacity-50"
        >
          {interacting ? 'Đang Cho Ăn... 🍖' : 'Cho Pet Ăn 🍖'}
        </button>
      </div>
    </div>
  );
};
