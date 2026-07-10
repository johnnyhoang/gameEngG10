import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { FlashcardApp } from '../../miniapps/flashcard';
import type { MiniGameProps } from '../../types/minigame';

export const FlashcardGame: React.FC<MiniGameProps> = ({ activeSectId, onGameStart, onGameComplete }) => {
  const questions = useGameState(state => state.questions);
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <FlashcardApp
      questions={questions}
      activeSectId={activeSectId}
      uiTheme={uiTheme}
      onReward={awardCoinsAndXp}
      onGameComplete={onGameComplete}
    />
  );
};
