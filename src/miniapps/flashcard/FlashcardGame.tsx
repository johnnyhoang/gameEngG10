import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { FlashcardApp } from './FlashcardApp';
import type { MiniGameProps } from '../../types/minigame';

export const FlashcardGame: React.FC<MiniGameProps> = ({ activeSectId, gradeTier, onGameStart, onGameComplete }) => {
  const questions = useGameState(state => state.questions);
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const uiTheme = useGameState(state => state.uiTheme);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <FlashcardApp
      questions={questions}
      activeSectId={activeSectId}
      gradeTier={gradeTier}
      uiTheme={uiTheme}
      onReward={awardRubyAndXp}
      onGameComplete={onGameComplete}
    />
  );
};
