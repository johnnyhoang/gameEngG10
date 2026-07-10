import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { ExplainApp } from '../../miniapps/explain';
import type { MiniGameProps } from '../../types/minigame';

export const ExplainGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <ExplainApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
