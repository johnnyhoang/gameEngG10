import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { StoryApp } from './StoryApp';
import type { MiniGameProps } from '../../types/minigame';

export const StoryGame: React.FC<MiniGameProps> = ({ activeSectId, gradeTier, onGameStart, onGameComplete }) => {
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  return (
    <StoryApp
      activeSectId={activeSectId}
      gradeTier={gradeTier}
      uiTheme={uiTheme}
      onReward={awardRubyAndXp}
      onGameComplete={onGameComplete}
      onGameStart={onGameStart}
      questions={questions}
    />
  );
};
