import { useEffect } from 'react';
import type { MiniGameProps } from '../../types/minigame';
import { useGameState } from '../../hooks/useGameState';
import type { EnglishSkillDistrictId } from '../../data/englishSkillDistricts';
import { EnglishSkillDistrictApp } from './EnglishSkillDistrictApp';

interface EnglishSkillDistrictGameProps extends MiniGameProps {
  mode: EnglishSkillDistrictId;
}

export function EnglishSkillDistrictGame({ mode, activeSectId, onGameStart, onGameComplete }: EnglishSkillDistrictGameProps) {
  const awardRubyAndXp = useGameState(state => state.awardRubyAndXp);

  useEffect(() => {
    onGameStart?.();
  }, [onGameStart]);

  if (activeSectId !== 'english') {
    return <p role="alert" className="p-6 text-center text-synth-text-muted">This feature is available only in the English subject.</p>;
  }

  return <EnglishSkillDistrictApp mode={mode} onReward={awardRubyAndXp} onGameComplete={onGameComplete} />;
}
