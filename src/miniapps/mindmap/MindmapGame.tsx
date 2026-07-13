import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { MindmapApp } from './MindmapApp';
import type { MiniGameProps } from '../../types/minigame';

export const MindmapGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <MindmapApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardRubyAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
    />
  );
};
