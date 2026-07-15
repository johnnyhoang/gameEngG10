import React, { useEffect } from 'react';
import { GeometryApp } from './GeometryApp';
import type { MiniGameProps } from '../../types/minigame';
import { useGameState } from '../../hooks/useGameState';

export const GeometryGame: React.FC<MiniGameProps> = ({
  gradeTier,
  onGameStart,
  onGameComplete
}) => {

  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-slate-300">
        <h2 className="text-xl font-bold font-orbitron text-synth-cyan">📐 PHÒNG THÍ NGHIỆM HÌNH HỌC</h2>
        <span className="text-xs">Môn: Toán học • Lớp {gradeTier}</span>
      </div>

      <GeometryApp
        mode="studio"
        dimension="auto"
        problemText=""
        uiTheme={uiTheme}
        onComplete={(result) => {
          onGameComplete?.({
            correctAnswers: result.actionsCount,
            timeSpent: result.timeSpent,
            score: 100,
            passed: true
          });
        }}
      />
    </div>
  );
};
