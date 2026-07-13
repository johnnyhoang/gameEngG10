import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { ExplainApp } from './ExplainApp';
import type { MiniGameProps } from '../../types/minigame';

export const ExplainGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <ExplainApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardRubyAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
