import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';

export type FogStatus = 'shadowed' | 'temporary' | 'permanent';

interface FogCardProps {
  pageId: string;
  requiredCompletions?: number;
  decayDays?: number;
  onOpenLevel3: () => void;
  children: React.ReactNode;
  /** Nhãn hiển thị trên lớp mờ sương — tùy ngữ cảnh trang (xem SUB_SPEC_UI_RULES.md §2) */
  label?: string;
}

export function getFogStatus(
  pageId: string,
  explorationProgress: Record<string, import('../types/game').ExplorationProgress>,
  requiredCompletions: number = 1,
  decayDays: number = 7
): FogStatus {
  const progress = explorationProgress[pageId];
  if (!progress) return 'shadowed';

  const { clearCount, lastClearedAt } = progress;

  if (clearCount >= requiredCompletions) {
    return 'permanent';
  }

  if (clearCount > 0 && lastClearedAt) {
    const lastDate = new Date(lastClearedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= decayDays) {
      return 'temporary';
    } else {
      return 'shadowed'; // Decayed
    }
  }

  return 'shadowed';
}

export const FogCard: React.FC<FogCardProps> = ({
  pageId,
  requiredCompletions = 1,
  decayDays = 7,
  onOpenLevel3,
  children,
  label = 'Khu vực chưa khám phá'
}) => {
  const { explorationProgress } = useGameState();
  const status = getFogStatus(pageId, explorationProgress, requiredCompletions, decayDays);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (status === 'shadowed') {
      // Bắn event để hiển thị GatekeeperModal
      const event = new CustomEvent('FOG_CARD_CLICKED', {
        detail: { pageId, onUnlock: onOpenLevel3 }
      });
      window.dispatchEvent(event);
    } else {
      onOpenLevel3();
    }
  };

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-500 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Container của nội dung thực */}
      <div 
        className={`transition-all duration-500 h-full w-full ${
          status === 'shadowed' 
            ? 'filter grayscale-[100%] brightness-50 opacity-80 blur-[1px] group-hover:grayscale-[50%] group-hover:brightness-75 group-hover:blur-0' 
            : ''
        } ${status === 'permanent' ? 'ring-2 ring-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3)] rounded-2xl' : ''}`}
      >
        {children}
      </div>

      {/* Lớp phủ mờ sương — cùng tông với nền trang (theo theme đang chọn), không dùng nền đen hay icon ổ khóa (SUB_SPEC_UI_RULES.md §2) */}
      {status === 'shadowed' && (
        <div
          className={`absolute inset-0 z-10 flex flex-col items-end justify-end overflow-hidden rounded-2xl transition-opacity duration-300 ${
            isHovered ? 'opacity-40' : 'opacity-55'
          }`}
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-synth-bg) 55%, transparent)' }}
        >
          <div
            className="absolute -inset-8 rounded-full blur-xl animate-[fog-drift_9s_ease-in-out_infinite]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-synth-bg) 55%, white 10%)' }}
          />
          <div
            className="absolute -inset-10 rounded-full blur-xl animate-[fog-drift-reverse_12s_ease-in-out_infinite]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-synth-bg) 45%, black 8%)' }}
          />
          <span
            className="relative z-10 text-[10px] uppercase font-orbitron font-bold tracking-wider text-right max-w-[85%] px-3 pb-2"
            style={{ color: 'color-mix(in srgb, var(--color-synth-text-muted) 75%, transparent)' }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Dấu hiệu sáng vĩnh viễn */}
      {status === 'permanent' && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-1.5 shadow-[0_0_10px_rgba(234,179,8,0.5)] z-20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Thanh tiến trình cày cuốc (hiển thị khi đang Temporary) */}
      {status === 'temporary' && requiredCompletions > 1 && (
        <div className="absolute bottom-2 left-2 right-2 z-20">
          <div className="bg-black/80 rounded-full p-1 border border-white/10 flex items-center justify-center gap-1 backdrop-blur-sm">
            {Array.from({ length: requiredCompletions }).map((_, i) => {
              const isDone = i < (explorationProgress[pageId]?.clearCount || 0);
              return (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full ${isDone ? 'bg-synth-cyan shadow-[0_0_5px_rgba(0,240,255,0.5)]' : 'bg-white/10'}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
