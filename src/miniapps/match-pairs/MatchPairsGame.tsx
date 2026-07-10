import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { MatchPairsApp } from './MatchPairsApp';
import type { MiniGameProps } from '../../types/minigame';

export const MatchPairsGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <MatchPairsApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
    />
  );
};
