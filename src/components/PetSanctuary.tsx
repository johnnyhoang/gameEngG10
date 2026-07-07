import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Activity, Sparkles } from 'lucide-react';

export const PetSanctuary: React.FC = () => {
  const pet = useGameState(state => state.pet);
  const feedPet = useGameState(state => state.feedPet);
  const showHelp = useGameState(state => state.showHelp);
  const uiTheme = useGameState(state => state.uiTheme);
  const [interacting, setInteracting] = useState(false);
  const isUnicorn = uiTheme === 'unicorn-dream';

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

    if (isUnicorn) {
      if (pet.stage === 'egg') {
        return (
          <div className={`relative w-36 h-44 mx-auto overflow-hidden rounded-[50%_50%_48%_52%/_58%_58%_42%_42%] border-2 border-violet-200/50 bg-gradient-to-b from-white via-fuchsia-50 to-cyan-50 flex items-center justify-center ${glowClass} ${interacting ? 'animate-bounce' : 'animate-pulse'}`}>
            <div className="absolute inset-0 unicorn-rainbow-strip h-1.5 opacity-90 top-0" />
            <div className="absolute inset-0 opacity-40 flex flex-col justify-around">
              <div className="w-full h-[1px] bg-white transform rotate-12"></div>
              <div className="w-full h-[1px] bg-white transform -rotate-45"></div>
              <div className="w-full h-[1px] bg-white transform rotate-45"></div>
            </div>
            <div className="absolute -top-3 left-1/2 h-10 w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-300 to-violet-500 shadow-[0_0_10px_rgba(192,132,252,0.45)] rotate-12" />
            <Sparkles className="unicorn-twinkle absolute w-8 h-8 text-fuchsia-400" />
          </div>
        );
      }

      return (
        <div className={`relative w-48 h-48 mx-auto flex items-center justify-center ${interacting ? 'animate-bounce' : 'animate-float'}`}>
          <div className="relative">
            <div className="absolute -left-12 top-10 w-16 h-8 bg-gradient-to-r from-fuchsia-200 to-cyan-200 rounded-full blur-[1px] opacity-80 unicorn-cloud" />
            <div className="absolute -right-12 top-10 w-16 h-8 bg-gradient-to-l from-violet-200 to-fuchsia-200 rounded-full blur-[1px] opacity-80 unicorn-cloud" />

            <div className="absolute -left-10 top-10 w-20 h-14 bg-gradient-to-tr from-fuchsia-200 to-white rounded-[60%_40%_60%_40%] transform -rotate-12 opacity-80" />
            <div className="absolute -right-10 top-10 w-20 h-14 bg-gradient-to-tr from-cyan-200 to-white rounded-[40%_60%_40%_60%] transform rotate-12 opacity-80" />

            <div className="absolute -top-7 left-1/2 h-16 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-300 via-violet-400 to-cyan-300 shadow-[0_0_12px_rgba(192,132,252,0.45)] rotate-12" />
            <div className="absolute -top-4 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />

            <div className="relative w-28 h-28 rounded-[48%] bg-gradient-to-br from-white via-fuchsia-50 to-cyan-50 flex flex-col items-center justify-center border-2 border-violet-200/45 shadow-[0_0_24px_rgba(192,132,252,0.28)]">
              <div className="absolute -top-4 flex gap-1">
                <div className="w-6 h-8 rounded-full bg-gradient-to-b from-fuchsia-300 to-fuchsia-100 transform -rotate-12" />
                <div className="w-6 h-8 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-100 transform rotate-12" />
              </div>

              <div className="flex gap-6 mb-2">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-violet-200">
                  <div className={`w-2.5 h-2.5 rounded-full bg-violet-700 ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
                </div>
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-violet-200">
                  <div className={`w-2.5 h-2.5 rounded-full bg-violet-700 ${isHappy ? 'translate-y-0.5' : isSad ? '-translate-y-0.5' : ''}`} />
                </div>
              </div>

              <div className={`w-7 h-3 rounded-b-full ${isHappy ? 'bg-fuchsia-400 scale-y-125' : 'bg-violet-300 scale-y-50'}`} />

              <div className="absolute -bottom-2 left-1/2 h-3 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-300 via-cyan-300 to-violet-300 opacity-90 blur-[1px]" />
            </div>
          </div>
        </div>
      );
    }

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
    <div className={`glass-panel rounded-2xl border p-5 flex flex-col h-full ${
      isUnicorn ? 'border-violet-200/35 bg-gradient-to-b from-white/90 via-fuchsia-50/80 to-cyan-50/70' : 'border-synth-cyan/15'
    }`}>
      <div className={`flex items-center justify-between mb-4 pb-3 ${isUnicorn ? 'border-b border-violet-200/35' : 'border-b border-synth-gray'}`}>
        <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-1.5 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
          <Activity className="w-4 h-4" /> {isUnicorn ? 'Unicorn Sanctuary' : 'Pet Sanctuary'}
          <button
            onClick={() => showHelp('dragon')}
            className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center cursor-pointer transition-colors ${
              isUnicorn
                ? 'bg-fuchsia-200/50 border border-violet-200/60 text-violet-700 hover:bg-fuchsia-200/80'
                : 'bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan hover:bg-synth-cyan/40'
            }`}
            title="Xem hướng dẫn về thú cưng"
          >
            ?
          </button>
        </h3>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded font-orbitron ${
          isUnicorn
            ? 'bg-fuchsia-100/80 text-fuchsia-700 border border-violet-200/40'
            : 'bg-synth-magenta/15 text-synth-magenta border border-synth-magenta/30'
        }`}>
          LV.{pet.level}
        </span>
      </div>

      {/* Pet graphic */}
      <div className="flex-1 flex flex-col justify-center py-6 relative">
        {renderPetAvatar()}
        
        <div className="text-center mt-6">
          <h4 className={`font-orbitron font-bold text-lg mb-1 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            {pet.name}
          </h4>
          <p className={`text-xs mb-4 font-semibold uppercase tracking-wider ${isUnicorn ? 'text-violet-600/80' : 'text-synth-text-muted'}`}>
            {getStageTitle(pet.stage)}
          </p>
        </div>
      </div>

      {/* Pet Stats & Actions */}
      <div className="space-y-4 border-t border-synth-gray pt-4">
        {/* EXP Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Độ Trưởng Thành</span>
            <span className={`${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'} font-orbitron`}>{pet.exp}/{pet.level * 150}</span>
          </div>
          <div className="w-full h-1.5 bg-synth-gray rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isUnicorn ? 'unicorn-rainbow-strip shadow-[0_0_8px_rgba(192,132,252,0.25)]' : 'bg-synth-cyan shadow-[0_0_8px_#00f0ff]'}`}
              style={{ width: `${Math.min(100, (pet.exp / (pet.level * 150)) * 100)}%` }}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <div className={`rounded-lg p-2 flex flex-col border ${isUnicorn ? 'bg-white/70 border-violet-200/30' : 'bg-synth-gray/40 border border-white/5'}`}>
            <span className={`text-[10px] uppercase ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Tâm Trạng</span>
            <span className="text-white mt-0.5">{getMoodEmoji(pet.mood)}</span>
          </div>
          <div className={`rounded-lg p-2 flex flex-col border ${isUnicorn ? 'bg-white/70 border-violet-200/30' : 'bg-synth-gray/40 border border-white/5'}`}>
            <span className={`text-[10px] uppercase ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Năng Lượng</span>
            <span className="text-white mt-0.5">{pet.energy}/100</span>
          </div>
        </div>

        {/* Interact Actions */}
        <button
          onClick={handleFeed}
          disabled={interacting}
          className={`w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-50 ${
            isUnicorn
              ? 'bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 text-violet-900 shadow-[0_0_14px_rgba(192,132,252,0.25)] hover:brightness-105'
              : 'bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]'
          }`}
        >
          {interacting ? 'Đang Cho Ăn... 🍖' : isUnicorn ? 'Cho Unicorn Ăn ✨' : 'Cho Pet Ăn 🍖'}
        </button>
      </div>
    </div>
  );
};
