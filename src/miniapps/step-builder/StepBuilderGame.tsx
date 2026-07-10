import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { StepBuilderApp } from './StepBuilderApp';
import type { MiniGameProps } from '../../types/minigame';

export const StepBuilderGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <StepBuilderApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
