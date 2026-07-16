// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_TUTOR_REWARDS } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { supabase } from '../../utils/supabaseClient';
import { logActivity } from '../helpers';
import { toast } from '../../utils/toast';
import { authService } from '../../services/authService';
import { DEFAULT_GRADE_TIER } from '../../types/game';
import { normalizeRubyPayload } from '../../utils/rubyCompatibility';
import { enrichTextbookAttributes } from '../../utils/textbookEnricher';

export const createAuthSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState,
    'currentUser' | 'sessionAccountId' | 'availableProfiles' | 'profilesLoading' |
    'setSessionAccountId' | 'fetchProfiles' | 'selectProfile' |
    'createProfile' | 'quickStartProfile' | 'login' | 'logout' | 'renameProfile' |
    'logoutState'
  >
> = (set, get) => ({
  currentUser: null,
  sessionAccountId: null,
  availableProfiles: [],
  profilesLoading: false,
  logoutState: 'idle',

  setSessionAccountId: (accountId: string) => {
    set({ sessionAccountId: accountId });
  },

  fetchProfiles: async () => {
    set({ profilesLoading: true });
    try {
      const profiles = await authService.fetchProfiles();
      set({ availableProfiles: profiles });
    } catch (e) {
      console.error('fetchProfiles error', e);
    } finally {
      set({ profilesLoading: false });
    }
  },

  selectProfile: async (profileId: string) => {
    try {
      // Clear every profile-scoped value before loading the next profile.
      // Account/session/profile-list state intentionally remains available.
      set({
        currentUser: null,
        player: INITIAL_PLAYER,
        pet: INITIAL_PET,
        categoryStats: {},
        topicStats: {},
        lessonsProgress: {},
        topics: [],
        activities: [],
        activityProgress: {},
        explorationProgress: {},
        pageExplorationStates: {},
        rewards: DEFAULT_TUTOR_REWARDS,
        rewardRedemptions: [],
        classRewards: [],
        classRewardRedemptions: [],
        challenges: INITIAL_CHALLENGES,
        logs: [],
        activeCombo: 0,
        maxCombo: 0,
        failedQuestionIds: [],
        recentlyPlayedQuestionIds: [],
        selectedStudentProfile: null,
        questions: [...INITIAL_QUESTIONS],
        lessons: [...INITIAL_LESSONS]
      });
      const data = normalizeRubyPayload(await authService.selectProfile(profileId));
      const resolvedTheme = data.player?.uiTheme || (get().uiThemesByUser[profileId] || DEFAULT_UI_THEME) as any;
      const mergedQuestions = [...INITIAL_QUESTIONS];
      const idMap = new Map<string, number>();
      mergedQuestions.forEach((q, idx) => {
        if (q.id) idMap.set(q.id, idx);
      });
      const promptSet = new Set<string>();
      mergedQuestions.forEach(q => {
        if (q.prompt) promptSet.add(q.prompt);
      });

      (data.customQuestions || []).forEach((q: any) => {
        if (!q) return;
        const textbook = enrichTextbookAttributes(q.topicId, q.category, q.subject);
        const enrichedQ = {
          ...q,
          loai: q.loai || textbook.loai,
          bai: q.bai || textbook.bai
        };
        const idx = enrichedQ.id ? idMap.get(enrichedQ.id) : undefined;
        if (idx !== undefined && idx !== -1) {
          mergedQuestions[idx] = enrichedQ;
        } else if (enrichedQ.prompt && !promptSet.has(enrichedQ.prompt)) {
          mergedQuestions.push(enrichedQ);
          promptSet.add(enrichedQ.prompt);
          if (enrichedQ.id) idMap.set(enrichedQ.id, mergedQuestions.length - 1);
        }
      });
      set({
        currentUser: data.currentUser,
        player: data.player || INITIAL_PLAYER,
        pet: data.pet || INITIAL_PET,
        categoryStats: data.categoryStats || {},
        rewards: data.rewards || DEFAULT_TUTOR_REWARDS,
        rewardRedemptions: data.rewardRedemptions || [],
        challenges: data.challenges || INITIAL_CHALLENGES,
        lessonsProgress: data.lessonsProgress || {},
        topics: data.topics || [],
        activities: data.activities || [],
        activityProgress: data.activityProgress || {},
        explorationProgress: data.explorationProgress || {},
        logs: data.logs || [],
        questions: mergedQuestions,
        lessons: (data.lessons || INITIAL_LESSONS).map((l: any) => {
          const textbook = enrichTextbookAttributes(l.id, l.category, l.subject);
          return {
            ...l,
            loai: l.loai || textbook.loai,
            bai: l.bai || textbook.bai,
            hamNguyenTo: l.hamNguyenTo || textbook.hamNguyenTo
          };
        }),
        gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
        uiTheme: resolvedTheme,
        currentSubject: data.player?.activeSubject || 'english',
        activeGradeTier: data.player?.activeGradeTier || DEFAULT_GRADE_TIER,
        lastSyncTime: new Date().toISOString(),
      });
      localStorage.setItem('ge10_selected_profile_id', profileId);
      // Fetch class links data after profile is selected
      const state = get();
      if(state.fetchClassLinks) await state.fetchClassLinks();
    } catch (e) {
      console.error('selectProfile error', e);
    }
  },

  createProfile: async (role: 'student' | 'tutor', name: string) => {
    try {
      await authService.createProfile(role, name);
      await get().fetchProfiles();
    } catch (e) {
      console.error('createProfile error', e);
    }
  },

  quickStartProfile: async (role: 'student' | 'tutor') => {
    try {
      const data = await authService.quickStartProfile(role);
      if (data.profile?.id) {
        await get().selectProfile(data.profile.id);
      } else {
        toast.error('Không thể kết nối máy chủ. Vui lòng thử lại.');
      }
    } catch (e) {
      console.error('quickStartProfile error', e);
      toast.error('Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.');
    }
  },

  login: async (user) => {
    if (user.id.startsWith('mock-')) {
      set((state: any) => {
        const resolvedTheme = state.uiThemesByUser[user.id] || DEFAULT_UI_THEME;
        const newPlayer = state.profiles[user.id] || {
          id: user.id,
          name: user.name,
          role: (user.role as any) || 'student',
          level: 1,
          xp: 0,
          ruby: 200,
          streak: 0,
          energy: 100,
          maxEnergy: 100,
          resetHours: 3,
          energyDepletedAt: null,
          hearts: 3,
          lastActive: new Date().toISOString(),
          badges: []
        };

        const newPet = state.petStates[user.id] || {
          name: 'Heo Maikawaii',
          stage: 'egg',
          level: 1,
          exp: 0,
          energy: 100,
          mood: 'neutral',
          lastFed: new Date().toISOString()
        };

        const newStats = state.categoryStatsAll[user.id] || {};

        return {
          currentUser: user,
          sessionAccountId: user.id,
          player: newPlayer,
          pet: newPet,
          categoryStats: newStats,
          gameSettings: state.gameSettings || DEFAULT_GAME_SETTINGS,
          uiTheme: resolvedTheme
        };
      });
      logActivity(get, set, 'energy_refill', 'Đã vào sân', `Chào mừng ${user.name}. Sân học đã mở.`);
      return;
    }

    // Real Supabase login
    try {
      await authService.syncUser();
      const data = normalizeRubyPayload(await authService.fetchCurrentProfile());
      const dbCustomQs = data.customQuestions || [];
      const resolvedTheme = data.player?.uiTheme || (get().uiThemesByUser[data.currentUser?.id || user.id] || DEFAULT_UI_THEME) as any;

      set(_state => {
        const mergedQuestions = [...INITIAL_QUESTIONS];
        const idMap = new Map<string, number>();
        mergedQuestions.forEach((q, idx) => {
          if (q.id) idMap.set(q.id, idx);
        });
        const promptSet = new Set<string>();
        mergedQuestions.forEach(q => {
          if (q.prompt) promptSet.add(q.prompt);
        });

        dbCustomQs.forEach((q: any) => {
          if (!q) return;
          const idx = q.id ? idMap.get(q.id) : undefined;
          if (idx !== undefined && idx !== -1) {
            mergedQuestions[idx] = q;
          } else if (q.prompt && !promptSet.has(q.prompt)) {
            mergedQuestions.push(q);
            promptSet.add(q.prompt);
            if (q.id) idMap.set(q.id, mergedQuestions.length - 1);
          }
        });

        return {
          currentUser: data.currentUser || user,
          uiTheme: resolvedTheme,
          currentSubject: data.player?.activeSubject || 'english',
          activeGradeTier: data.player?.activeGradeTier || DEFAULT_GRADE_TIER,
          player: data.player || {
            id: user.id,
            name: user.name,
            role: (data.currentUser?.role || 'student') as any,
            level: 1,
            xp: 0,
            ruby: 200,
            streak: 0,
            energy: 100,
            maxEnergy: 100,
            resetHours: 3,
            energyDepletedAt: null,
            hearts: 3,
            lastActive: new Date().toISOString(),
            badges: []
          },
          pet: data.pet || {
            name: 'Heo Maikawaii',
            stage: 'egg',
            level: 1,
            exp: 0,
            energy: 100,
            mood: 'neutral',
            lastFed: new Date().toISOString()
          },
          categoryStats: data.categoryStats || {},
          logs: data.logs || [],
          rewards: data.rewards || [],
          rewardRedemptions: data.rewardRedemptions || [],
          challenges: data.challenges || INITIAL_CHALLENGES,
          gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
          questions: mergedQuestions,
          lessons: (data.lessons || INITIAL_LESSONS).map((l: any) => {
            const textbook = enrichTextbookAttributes(l.id, l.category, l.subject);
            return {
              ...l,
              loai: l.loai || textbook.loai,
              bai: l.bai || textbook.bai,
              hamNguyenTo: l.hamNguyenTo || textbook.hamNguyenTo
            };
          }),
          lessonsProgress: data.lessonsProgress || {},
          topics: data.topics || [],
          activities: data.activities || [],
          activityProgress: data.activityProgress || {},
          explorationProgress: data.explorationProgress || {}
        };
      });
      logActivity(get, set, 'energy_refill', 'Đồng bộ Đám mây', `Dữ liệu học tập đã được kéo về cho ${user.name}!`);
    } catch (e) {
      console.error('Lỗi khi tải thông tin từ backend Supabase:', e);
      // Fallback to local profile if offline
      set((state: any) => {
        const updatedUser = {
          ...user,
          role: user.email === 'hoang.hoa@gmail.com' ? 'truong_vien' : 'student'
        };
        const resolvedTheme = state.uiThemesByUser[user.id] || DEFAULT_UI_THEME;
        const newPlayer = state.profiles[user.id] || {
          id: user.id,
          name: user.name,
          role: updatedUser.role as any,
          level: 1,
          xp: 0,
          ruby: 200,
          streak: 0,
          energy: 100,
          maxEnergy: 100,
          resetHours: 3,
          energyDepletedAt: null,
          hearts: 3,
          lastActive: new Date().toISOString(),
          badges: []
        };
        return {
          currentUser: updatedUser,
          player: newPlayer,
          uiTheme: resolvedTheme,
          currentSubject: newPlayer.activeSubject || 'english',
          activeGradeTier: newPlayer.activeGradeTier || DEFAULT_GRADE_TIER,
          gameSettings: state.gameSettings || DEFAULT_GAME_SETTINGS
        };
      });
    }
  },

  renameProfile: async (newName: string) => {
    const profile = get().currentUser;
    if (!profile) return false;

    const ok = await authService.renameProfile(profile.id, newName);
    if (ok) {
      set(state => ({
        currentUser: state.currentUser ? { ...state.currentUser, name: newName } : null,
        availableProfiles: state.availableProfiles.map(p =>
          p.id === profile.id ? { ...p, name: newName } : p
        )
      }));
      toast.success('Đã thay đổi tên gọi thành công! 🎉');
      return true;
    }
    toast.error('Không thể thay đổi tên gọi.');
    return false;
  },

  logout: async () => {
    // Prevent duplicate concurrent logout runs
    if (get().logoutState === 'processing') {
      console.warn('Logout execution already in progress.');
      return;
    }

    set({ logoutState: 'processing' });

    try {
      // 1. Clear all credentials from localStorage & sessionStorage immediately & synchronously
      try {
        localStorage.removeItem('ge10_selected_profile_id');
        localStorage.removeItem('cyber-app-screen');

        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('auth-token') || key.includes('supabase.auth'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        const sessionKeysToRemove: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('auth-token') || key.includes('supabase.auth'))) {
            sessionKeysToRemove.push(key);
          }
        }
        sessionKeysToRemove.forEach(k => sessionStorage.removeItem(k));
      } catch (err) {
        console.error('Error clearing local storage credentials during logout:', err);
      }

      // 2. Clear Zustand state synchronously to reset all user data
      try {
        set({
          currentUser: null,
          sessionAccountId: null,
          availableProfiles: [],
          profilesLoading: false,
          classLinks: [],
          player: INITIAL_PLAYER,
          pet: INITIAL_PET,
          categoryStats: {},
          topicStats: {},
          lessonsProgress: {},
          topics: [],
          activities: [],
          activityProgress: {},
          explorationProgress: {},
          pageExplorationStates: {},
          rewards: DEFAULT_TUTOR_REWARDS,
          rewardRedemptions: [],
          classRewards: [],
          classRewardRedemptions: [],
          isOrphanStudent: true,
          challenges: INITIAL_CHALLENGES,
          logs: [],
          activeCombo: 0,
          maxCombo: 0,
          lastSyncTime: null,
          adminStudents: [],
          selectedStudentProfile: null,
          failedQuestionIds: [],
          recentlyPlayedQuestionIds: [],
          tutorQuests: [],
          helpPageId: null,
          uiTheme: DEFAULT_UI_THEME as any,
          currentSubject: 'english',
          activeGradeTier: DEFAULT_GRADE_TIER,
          gameSettings: DEFAULT_GAME_SETTINGS
        });
      } catch (err) {
        console.error('Error resetting Zustand state during logout:', err);
      }

      // 3. Asynchronously sign out from Supabase with timeout fallback
      try {
        const signOutPromise = supabase.auth.signOut();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase signOut timeout')), 1000)
        );

        await Promise.race([signOutPromise, timeoutPromise])
          .catch(err => {
            console.warn('Supabase signOut non-blocking warning:', err);
          });
      } catch (err) {
        console.error('Error executing supabase signOut:', err);
      }

      set({ logoutState: 'success' });

      // Clean redirect to root path
      window.location.replace('/');
    } catch (err) {
      console.error('Fatal error during logout sequence:', err);
      set({ logoutState: 'failed' });
      throw err;
    } finally {
      set({ logoutState: 'idle' });
    }
  },
});
