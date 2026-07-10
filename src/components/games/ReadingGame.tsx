import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { ReadingApp } from '../../miniapps/reading';
import type { MiniGameProps } from '../../types/minigame';

export const ReadingGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <ReadingApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
