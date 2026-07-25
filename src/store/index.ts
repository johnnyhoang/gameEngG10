import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoreState } from './types';

import { createAuthSlice } from './slices/createAuthSlice';
import { createClassLinksSlice } from './slices/createClassLinksSlice';
import { createUISlice } from './slices/createUISlice';
import { createPlayerSlice } from './slices/createPlayerSlice';
import { createAdminSlice } from './slices/createAdminSlice';
import { createClassRewardSlice } from './slices/createClassRewardSlice';
import { createTextbookMappingsSlice } from './slices/createTextbookMappingsSlice';

export const useGameState = create<StoreState>()(
  persist(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
      ...createClassLinksSlice(set, get, store),
      ...createUISlice(set, get, store),
      ...createPlayerSlice(set, get, store),
      ...createAdminSlice(set, get, store),
      ...createClassRewardSlice(set, get, store),
      ...createTextbookMappingsSlice(set, get, store),
    }),
    {
      name: 'cyber-english-state',
      partialize: (state: any) => ({
        currentUser: state.currentUser,
        player: state.player,
        currentSubject: state.currentSubject,
        activeGradeTier: state.activeGradeTier,
        categoryStats: state.categoryStats,
        pet: state.pet,
        rewards: state.rewards,
        challenges: state.challenges,
        maxCombo: state.maxCombo,
        uiTheme: state.uiTheme,
        uiThemesByUser: state.uiThemesByUser,
        failedQuestionIds: state.failedQuestionIds,
        recentlyPlayedQuestionIds: state.recentlyPlayedQuestionIds,
        // NOTE: profiles, petStates, categoryStatsAll, textbookMappings, pageExplorationStates
        // được bỏ khỏi persist để tránh JSON.stringify blocking trên mỗi state update.
        // Các data này được fetch lại từ server khi selectProfile().
      }),
      merge: (persistedState: any, currentState: any) => {
        return { ...currentState, ...(persistedState as object) } as any;
      },
    }
  )
);
