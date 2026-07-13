import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoreState } from './types';

import { createAuthSlice } from './slices/createAuthSlice';
import { createFamilySlice } from './slices/createFamilySlice';
import { createUISlice } from './slices/createUISlice';
import { createPlayerSlice } from './slices/createPlayerSlice';
import { createAdminSlice } from './slices/createAdminSlice';
import { createClassRewardSlice } from './slices/createClassRewardSlice';
import { ALL_HANDBOOK_PAGES } from '../data/handbookPages';
import { normalizePersistedRubyState } from '../utils/rubyCompatibility';

export const useGameState = create<StoreState>()(
  persist(
    (set, get, store) => ({
      ...createAuthSlice(set, get, store),
      ...createFamilySlice(set, get, store),
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
        const merged = { ...currentState, ...(migratedState as object) } as any;
        const persistedPages = merged.handbookPages || [];
        const existingIds = new Set(persistedPages.map((p: any) => p.id));
        const missingDefaults = ALL_HANDBOOK_PAGES.filter(p => !existingIds.has(p.id));
        merged.handbookPages = [...persistedPages, ...missingDefaults];
        return merged;
      },
    }
  )
);
