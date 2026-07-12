// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import type { HandbookPage, GradeTier, SubjectId, UiThemeId } from '../../types/game';
import { eventBus } from '../../utils/EventBus';
import { toast } from '../../utils/toast';
import { DEFAULT_GRADE_TIER, getGradeTierConfig } from '../../types/game';
import { ALL_HANDBOOK_PAGES } from '../../data/handbookPages';

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
  activeGradeTier: DEFAULT_GRADE_TIER,
  uiTheme: 'current',
  uiThemesByUser: {},
  helpPageId: null,
  handbookPages: ALL_HANDBOOK_PAGES,

  setSectModalOpen: (open) => set({ isSectModalOpen: open }),

  setSubject: (subject) => {
    set(state => {
      const updatedPlayer = state.player ? { ...state.player, activeSubject: subject } : state.player;
      return { currentSubject: subject, player: updatedPlayer } as any;
    });
    get().syncWithServer?.();
  },

  setGradeTier: (tier: GradeTier) => {
    const config = getGradeTierConfig(tier);
    if (config.status !== 'active') {
      toast.error(`${config.name} chưa khai mở!`);
      return;
    }
    if (get().activeGradeTier === tier) return;
    set(state => {
      const updatedPlayer = state.player ? { ...state.player, activeGradeTier: tier } : state.player;
      return { activeGradeTier: tier, player: updatedPlayer } as any;
    });
    toast.success(`Đã bước vào ${config.name}`);
    get().syncWithServer?.();
  },

  setUiTheme: (themeId) => {
    set(state => {
      if (!state.currentUser) return { uiTheme: themeId } as any;
      const newMap = { ...state.uiThemesByUser, [state.currentUser.id]: themeId };
      const updatedPlayer = state.player ? { ...state.player, uiTheme: themeId } : state.player;
      return { uiTheme: themeId, uiThemesByUser: newMap, player: updatedPlayer } as any;
    });
    get().syncWithServer?.();
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
        const maxEnergy = state.player?.maxEnergy ?? 100;
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
