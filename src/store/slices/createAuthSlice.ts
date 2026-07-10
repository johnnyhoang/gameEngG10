// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { INITIAL_PLAYER, INITIAL_PET, DEFAULT_GAME_SETTINGS, INITIAL_CHALLENGES, DEFAULT_REWARDS } from '../initialState';
import { INITIAL_QUESTIONS } from '../../data/questions';
import { INITIAL_LESSONS } from '../../data/lessons';
import { DEFAULT_UI_THEME } from '../../theme/uiThemes';
import { supabase } from '../../utils/supabaseClient';
import { logActivity } from '../helpers';

export const createAuthSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'currentUser' | 'sessionAccountId' | 'availableProfiles' | 
    'setSessionAccountId' | 'fetchProfiles' | 'selectProfile' | 
    'createProfile' | 'login' | 'logout'
  >
> = (set, get) => ({
  currentUser: null,
  sessionAccountId: null,
  availableProfiles: [],

  setSessionAccountId: (accountId: string) => {
    set({ sessionAccountId: accountId });
  },

  fetchProfiles: async () => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/profiles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ availableProfiles: data.profiles || [] });
      }
    } catch (e) {
      console.error('fetchProfiles error', e);
    }
  },

  selectProfile: async (profileId: string) => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/profile/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const resolvedTheme = (get().uiThemesByUser[profileId]?.[0] || DEFAULT_UI_THEME) as any;
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
          lastSyncTime: new Date().toISOString(),
        });
        // Fetch family data after profile is selected
        const state = get();
        if(state.fetchFamily) await state.fetchFamily();
      }
    } catch (e) {
      console.error('selectProfile error', e);
    }
  },

  createProfile: async (role: 'student' | 'parent', name: string) => {
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token || !session?.user) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name,
          email: session.user.email,
          avatar_url: session.user.user_metadata?.avatar_url,
          role
        })
      });
      if (res.ok) {
        await get().fetchProfiles();
      }
    } catch (e) {
      console.error('createProfile error', e);
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
          role: 'student',
          level: 1,
          xp: 0,
          coins: 200,
          streak: 0,
          energy: 100, // PLAYER_ENERGY_MAX
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
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) return;

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

      // Sync user details to backend pg first
      await fetch(`${backendUrl}/api/auth/sync-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Retrieve profile
      const res = await fetch(`${backendUrl}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        const dbCustomQs = data.customQuestions || [];
        const resolvedTheme = (get().uiThemesByUser[data.currentUser?.id || user.id] || DEFAULT_UI_THEME) as any;

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
            player: data.player || {
              id: user.id,
              name: user.name,
              role: (data.currentUser?.role || 'student') as any,
              level: 1,
              xp: 0,
              coins: 200,
              streak: 0,
              energy: 100,
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
      }
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
          hearts: 3,
          lastActive: new Date().toISOString(),
          badges: []
        };
        return {
          currentUser: updatedUser,
          player: newPlayer,
          uiTheme: resolvedTheme,
          gameSettings: state.gameSettings || DEFAULT_GAME_SETTINGS
        };
      });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ge10_login_time');
    set({
      currentUser: null,
      sessionAccountId: null,
      availableProfiles: [],
      familyLinks: [],
      player: INITIAL_PLAYER,
      pet: INITIAL_PET,
      categoryStats: {},
      gameSettings: DEFAULT_GAME_SETTINGS,
      activeCombo: 0,
      adminStudents: [],
      selectedStudentProfile: null,
      helpPageId: null,
      uiTheme: DEFAULT_UI_THEME as any
    });
  },
});
