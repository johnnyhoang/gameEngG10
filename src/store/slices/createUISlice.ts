// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import type { HandbookPage, GradeTier, SubjectId, UiThemeId } from '../../types/game';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';
import { DEFAULT_GRADE_TIER } from '../../hooks/useGameState';

export const createUISlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'isSectModalOpen' | 'currentSubject' | 'activeGradeTier' | 
    'uiTheme' | 'uiThemesByUser' | 'helpPageId' | 'handbookPages' |
    'setSectModalOpen' | 'setSubject' | 'setGradeTier' | 'setUiTheme' | 
    'showHelp' | 'closeHelp' | 'initEventSubscriptions' | 'addHandbookPage'
  >
> = (set, get) => ({
  isSectModalOpen: false,
  currentSubject: 'english',
  activeGradeTier: DEFAULT_GRADE_TIER as any,
  uiTheme: 'cyber',
  uiThemesByUser: {},
  helpPageId: null,
  handbookPages: [], // Filled by default array during monolithic merge, or can be passed here

  setSectModalOpen: (open) => set({ isSectModalOpen: open }),

  setSubject: (subject) => set({ currentSubject: subject }),

  setGradeTier: (tier) => {
    if (tier.toString() === 'coming_soon') {
      toast.error('Tầng này chưa mở. Vui lòng quay lại sau!');
      return;
    }
    set({ activeGradeTier: tier as GradeTier });
    toast.success(`Đã chuyển sang Tầng ${tier}`);
  },

  setUiTheme: (themeId) => {
    set(state => {
      if (!state.currentUser) return { uiTheme: themeId };
      const newMap = { ...state.uiThemesByUser, [state.currentUser.id]: themeId };
      return { uiTheme: themeId, uiThemesByUser: newMap };
    });
  },

  showHelp: (topic: string) => set({ helpPageId: topic }),

  closeHelp: () => set({ helpPageId: null }),

  addHandbookPage: (page: Omit<HandbookPage, 'id'>) => {
    set(state => {
      const newPage: HandbookPage = {
        ...page,
        id: `hb-${Date.now()}`
      };
      return {
        handbookPages: [...state.handbookPages, newPage]
      };
    });
  },

  initEventSubscriptions: () => {
    const unsubEnergy = eventBus.subscribe('ENERGY_RESTORED', (data: any) => {
      set((state: any) => {
        if (!state.player) return state;
        const maxEnergy = state.gameSettings?.maxEnergy ?? 1000;
        const amount = data.amount || Math.floor(maxEnergy * 0.1);
        const nextEnergy = Math.min(state.player.energy + amount, maxEnergy);
        return { player: { ...state.player, energy: nextEnergy } };
      });
    });

    const unsubPetGrowth = eventBus.subscribe('PET_GROWTH', (data: any) => {
      if (data.levelUp) {
        toast.success('Chúc mừng! Linh thú của bạn đã thăng cấp!');
      }
    });

    return () => {
      unsubEnergy();
      unsubPetGrowth();
    };
  }
});
