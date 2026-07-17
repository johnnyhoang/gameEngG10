import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoreState } from './types';

import { createAuthSlice } from './slices/createAuthSlice';
import { createClassLinksSlice } from './slices/createClassLinksSlice';
import { createUISlice } from './slices/createUISlice';
import { createPlayerSlice } from './slices/createPlayerSlice';
import { createAdminSlice } from './slices/createAdminSlice';
import { createClassRewardSlice } from './slices/createClassRewardSlice';
import { normalizePersistedRubyState } from '../utils/rubyCompatibility';

export const useGameState = create<StoreState>()(
  persist(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
      ...createClassLinksSlice(set, get, store),
      ...createUISlice(set, get, store),
      ...createPlayerSlice(set, get, store),
      ...createAdminSlice(set, get, store),
      ...createClassRewardSlice(set, get, store),
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
        profiles: state.profiles,
        petStates: state.petStates,
        pageExplorationStates: state.pageExplorationStates,
        categoryStatsAll: state.categoryStatsAll,
        uiTheme: state.uiTheme,
        uiThemesByUser: state.uiThemesByUser,
        failedQuestionIds: state.failedQuestionIds,
        recentlyPlayedQuestionIds: state.recentlyPlayedQuestionIds,
      }),
      merge: (persistedState: any, currentState: any) => {
        const migratedState = normalizePersistedRubyState(persistedState);
        return { ...currentState, ...(migratedState as object) } as any;
      },
    }
  )
);
