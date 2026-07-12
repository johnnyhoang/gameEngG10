import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { SubjectId } from '../types/game';

type SectContextType = {
  activeSectId: string;
  setActiveSectId: (sectId: string) => void;
};

const SectContext = createContext<SectContextType | undefined>(undefined);

export const SectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const activeSectId = useGameState(state => state.currentSubject);
  const setSubject = useGameState(state => state.setSubject);

  const setActiveSectId = (sectId: string) => {
    setSubject(sectId as SubjectId);
  };

  return (
    <SectContext.Provider value={{ activeSectId, setActiveSectId }}>
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
