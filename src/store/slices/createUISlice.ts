// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import type { HandbookPage, GradeTier, LearningContext, SubjectId, UiThemeId } from '../../types/game';
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
    'isSwitchingContext' | 'learningContextVersion' |
    'setSectModalOpen' | 'setLearningContext' | 'setSubject' | 'setGradeTier' | 'setUiTheme' |
    'showHelp' | 'closeHelp' | 'initEventSubscriptions' | 'addHandbookPage' |
    'tutorConsoleTab' | 'setTutorConsoleTab'
  >
> = (set, get) => ({
  isSectModalOpen: false,
  currentSubject: 'english',
  activeGradeTier: DEFAULT_GRADE_TIER,
  isSwitchingContext: false,
  learningContextVersion: 0,
  uiTheme: 'current',
  uiThemesByUser: {},
  helpPageId: null,
  handbookPages: ALL_HANDBOOK_PAGES,
  tutorConsoleTab: 'phong_hieu_truong',

  setSectModalOpen: (open) => set({ isSectModalOpen: open }),

  setTutorConsoleTab: (tab) => set({ tutorConsoleTab: tab }),

  setLearningContext: (context: LearningContext) => {
    const version = (get().learningContextVersion ?? 0) + 1;
    set(state => {
      const updatedPlayer = state.player ? {
        ...state.player,
        activeSubject: context.subjectId,
        activeGradeTier: context.gradeTier,
      } : state.player;
      return {
        currentSubject: context.subjectId,
        activeGradeTier: context.gradeTier,
        player: updatedPlayer,
        learningContextVersion: version,
        isSwitchingContext: true,
      } as any;
    });

    // Spinner giữ tối thiểu 400ms cho người dùng thấy app đang nạp lại ngữ cảnh,
    // và chỉ tắt khi version chưa bị một lần chuyển mới hơn vượt qua (chống ghi trễ).
    const minDelay = new Promise(resolve => setTimeout(resolve, 400));
    const sync = Promise.resolve(get().syncWithServer?.()).catch(() => undefined);
    void Promise.all([minDelay, sync]).then(() => {
      if (get().learningContextVersion === version) {
        set({ isSwitchingContext: false } as any);
      }
    });
  },

  setSubject: (subject) => {
    get().setLearningContext({ subjectId: subject, gradeTier: get().activeGradeTier });
  },

  setGradeTier: (tier: GradeTier) => {
    const config = getGradeTierConfig(tier);
    if (get().activeGradeTier === tier) return;
    get().setLearningContext({ gradeTier: tier, subjectId: get().currentSubject });
    toast.success(`Đã bước vào ${config.name}`);
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
