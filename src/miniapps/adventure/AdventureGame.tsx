import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { AdventureApp } from './AdventureApp';
import type { MiniGameProps } from '../../types/minigame';

export const AdventureGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <AdventureApp
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
      questions={questions}
    />
  );
};
