import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { DiagramApp } from './DiagramApp';
import type { MiniGameProps } from '../../types/minigame';

export const DiagramGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <DiagramApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardRubyAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
