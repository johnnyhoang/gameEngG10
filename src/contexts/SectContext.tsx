import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type SectContextType = {
  activeSectId: string;
  setActiveSectId: (sectId: string) => void;
};

const SectContext = createContext<SectContextType | undefined>(undefined);

export const SectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSectId, setActiveSectId] = useState<string>('english');

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
