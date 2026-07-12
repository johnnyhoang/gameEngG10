// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { supabase } from '../../utils/supabaseClient';
import { logActivity } from '../helpers';
import { toast } from '../../utils/toast';
import { authService } from '../../services/authService';

export const createAuthSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState,
    'currentUser' | 'sessionAccountId' | 'availableProfiles' | 'profilesLoading' |
    'setSessionAccountId' | 'fetchProfiles' | 'selectProfile' |
    'createProfile' | 'quickStartProfile' | 'login' | 'logout' | 'renameProfile'
  >
> = (set, get) => ({
  currentUser: null,
  sessionAccountId: null,
  availableProfiles: [],
  profilesLoading: false,

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
      const data = await authService.selectProfile(profileId);
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
        const idx = q.id ? idMap.get(q.id) : undefined;
        if (idx !== undefined && idx !== -1) {
          mergedQuestions[idx] = q;
        } else if (q.prompt && !promptSet.has(q.prompt)) {
          mergedQuestions.push(q);
          promptSet.add(q.prompt);
          if (q.id) idMap.set(q.id, mergedQuestions.length - 1);
        }
      });
      set({
        currentUser: data.currentUser,
        player: data.player || INITIAL_PLAYER,
        pet: data.pet || INITIAL_PET,
        categoryStats: data.categoryStats || {},
        rewards: data.rewards || DEFAULT_REWARDS,
        challenges: data.challenges || INITIAL_CHALLENGES,
        dailyMission: data.dailyMission || null,
        lessonsProgress: data.lessonsProgress || {},
        explorationProgress: data.explorationProgress || {},
        questions: mergedQuestions,
        gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
        uiTheme: resolvedTheme,
        currentSubject: data.player?.activeSubject || 'english',
        activeGradeTier: data.player?.activeGradeTier || DEFAULT_GRADE_TIER,
        lastSyncTime: new Date().toISOString(),
      });
      // Fetch family data after profile is selected
      const state = get();
      if(state.fetchFamily) await state.fetchFamily();
    } catch (e) {
      console.error('selectProfile error', e);
    }
  },

  createProfile: async (role: 'student' | 'parent', name: string) => {
    try {
      await authService.createProfile(role, name);
      await get().fetchProfiles();
    } catch (e) {
      console.error('createProfile error', e);
    }
  },

  quickStartProfile: async (role: 'student' | 'parent') => {
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
    // Mốc "vừa đăng nhập" để Heo chờ đủ 30 phút mới xuất hiện (PetStableOverlay).
    // Phải ghi lại MỖI lần login, không chỉ lần đầu — nếu không, học viên đăng
    // xuất rồi đăng nhập lại sau khi mốc cũ đã quá 30 phút sẽ thấy Heo xuất hiện ngay.
    localStorage.setItem('ge10_login_time', Date.now().toString());

    if (user.id.startsWith('mock-')) {
      set((state: any) => {
        const resolvedTheme = state.uiThemesByUser[user.id] || DEFAULT_UI_THEME;
        const newPlayer = state.profiles[user.id] || {
          id: user.id,
          name: user.name,
          role: (user.role as any) || 'student',
          level: 1,
          xp: 0,
          coins: 200,
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
      const data = await authService.fetchCurrentProfile();
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
            coins: 200,
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
          dailyMission: data.dailyMission || null,
          gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
          questions: mergedQuestions,
          lessons: data.lessons || INITIAL_LESSONS,
          lessonsProgress: data.lessonsProgress || {},
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
          coins: 200,
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
    localStorage.removeItem('ge10_login_time');

    // 1. Clear all Supabase session keys from localStorage synchronously
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('auth-token') || key.includes('supabase.auth'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    // 2. Clear from sessionStorage
    const sessionKeysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('auth-token') || key.includes('supabase.auth'))) {
        sessionKeysToRemove.push(key);
      }
    }
    sessionKeysToRemove.forEach(k => sessionStorage.removeItem(k));

    // 3. Clear Zustand state synchronously
    set({
      currentUser: null,
      sessionAccountId: null,
      availableProfiles: [],
      profilesLoading: false,
      familyLinks: [],
      player: INITIAL_PLAYER,
      pet: INITIAL_PET,
      categoryStats: {},
      gameSettings: DEFAULT_GAME_SETTINGS,
      activeCombo: 0,
      adminStudents: [],
      selectedStudentProfile: null,
      helpPageId: null,
      uiTheme: DEFAULT_UI_THEME as any,
      currentSubject: 'english',
      activeGradeTier: DEFAULT_GRADE_TIER
    });

    try {
      supabase.auth.signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
    window.location.href = '/';
  },
});

