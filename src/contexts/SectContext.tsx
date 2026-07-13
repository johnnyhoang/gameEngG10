import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { GradeTier, LearningContext, SubjectId } from '../types/game';

type SectContextType = {
  activeSectId: SubjectId;
  activeGradeTier: GradeTier;
  learningContext: LearningContext;
  setActiveSectId: (sectId: string) => void;
  setLearningContext: (context: LearningContext) => void;
};

const SectContext = createContext<SectContextType | undefined>(undefined);

export const SectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const activeSectId = useGameState(state => state.currentSubject);
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const setSubject = useGameState(state => state.setSubject);
  const updateLearningContext = useGameState(state => state.setLearningContext);

  const setActiveSectId = (sectId: string) => {
    setSubject(sectId as SubjectId);
  };

  return (
    <SectContext.Provider value={{
      activeSectId,
      activeGradeTier,
      learningContext: { gradeTier: activeGradeTier, subjectId: activeSectId },
      setActiveSectId,
      setLearningContext: updateLearningContext,
    }}>
      {children}
    </SectContext.Provider>
  );
};

export const useSect = () => {
  const context = useContext(SectContext);
  if (!context) {
    throw new Error('useSect must be used within a SectProvider');
  }
  return context;
};
