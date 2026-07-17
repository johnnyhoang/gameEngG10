// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { DEFAULT_GAME_SETTINGS, getProfileScopedResetState } from '../initialState';
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
    'setSessionAccountId' | 'fetchProfiles' | 'selectProfile' | 'deselectProfile' |
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
      set(getProfileScopedResetState());
      const data = normalizeRubyPayload(await authService.selectProfile(profileId));
      if (!data.player || !data.pet) {
        // Hồ sơ player_profiles/pet_states lẽ ra luôn được tạo cùng lúc với ge10_users
        // (xem backend routes/profiles.ts). Thiếu ở đây nghĩa là dữ liệu server bị lỗi —
        // báo rõ thay vì âm thầm dựng nhân vật giả.
        throw new Error('Thiếu dữ liệu hồ sơ nhân vật (player/pet) trên máy chủ cho hồ sơ này.');
      }
      const resolvedTheme = data.player?.uiTheme || (get().uiThemesByUser[profileId] || DEFAULT_UI_THEME) as any;
      // Ngân hàng câu hỏi (gốc + do giáo viên/admin tạo) đều nằm trong ge10_custom_questions,
      // server đã trả về đầy đủ trong data.customQuestions — không còn trộn với mảng hardcode.
      const enrichedQuestions = (data.customQuestions || []).map((q: any) => {
        const textbook = enrichTextbookAttributes(q.topicId, q.category, q.subject);
        return { ...q, loai: q.loai || textbook.loai, bai: q.bai || textbook.bai };
      });
      if (enrichedQuestions.length === 0) {
        console.warn('[selectProfile] Server trả về ngân hàng câu hỏi rỗng — cần kiểm tra seed ge10_custom_questions.');
      }
      if (!data.lessons || data.lessons.length === 0) {
        console.warn('[selectProfile] Server trả về danh sách bài giảng rỗng — cần kiểm tra seed ge10_lessons.');
      }
      set({
        currentUser: data.currentUser,
        player: data.player,
        pet: data.pet,
        categoryStats: data.categoryStats || {},
        rewards: data.rewards || [],
        rewardRedemptions: data.rewardRedemptions || [],
        challenges: data.challenges || [],
        challengeTemplates: data.challengeTemplates || [],
        lessonsProgress: data.lessonsProgress || {},
        topics: data.topics || [],
        activities: data.activities || [],
        activityProgress: data.activityProgress || {},
        explorationProgress: data.explorationProgress || {},
        logs: data.logs || [],
        questions: enrichedQuestions,
        lessons: (data.lessons || []).map((l: any) => {
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
      toast.error('Không tải được hồ sơ. Vui lòng thử lại hoặc liên hệ quản trị viên.');
    }
  },

  // Rời khỏi profile đang xem để quay lại màn hình chọn vai trò (KHÔNG đăng xuất tài khoản
  // Google — availableProfiles/sessionAccountId vẫn giữ nguyên). Dùng chung reset state với
  // selectProfile để tránh việc mỗi nơi gọi tự xoá một tập field khác nhau (xem TopHUD.tsx).
  deselectProfile: () => {
    set(getProfileScopedResetState());
    localStorage.removeItem('ge10_selected_profile_id');
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
      // TODO(dev-tooling): dev backdoor login (nhánh mock-* phía trên) chỉ set state cục bộ
      // trong trình duyệt, không tạo/đụng tới bất kỳ record nào trong DB. Xoá bỏ hoàn toàn
      // khi không còn cần test nhanh không cần tài khoản Google thật.
      logActivity(get, set, 'energy_refill', 'Đã vào sân', `Chào mừng ${user.name}. Sân học đã mở.`);
      return;
    }

    // Real Supabase login
    try {
      await authService.syncUser();
      const data = normalizeRubyPayload(await authService.fetchCurrentProfile());
      if (!data.player || !data.pet) {
        // Hồ sơ player_profiles/pet_states lẽ ra luôn được tạo cùng lúc với ge10_users
        // (xem backend routes/profiles.ts). Thiếu ở đây nghĩa là dữ liệu server bị lỗi —
        // báo rõ thay vì âm thầm dựng nhân vật giả.
        throw new Error('Thiếu dữ liệu hồ sơ nhân vật (player/pet) trên máy chủ cho tài khoản này.');
      }
      // Ngân hàng câu hỏi (gốc + do giáo viên/admin tạo) đều nằm trong ge10_custom_questions,
      // server đã trả về đầy đủ trong data.customQuestions — không còn trộn với mảng hardcode.
      const enrichedQuestions = (data.customQuestions || []).map((q: any) => {
        const textbook = enrichTextbookAttributes(q.topicId, q.category, q.subject);
        return { ...q, loai: q.loai || textbook.loai, bai: q.bai || textbook.bai };
      });
      if (enrichedQuestions.length === 0) {
        console.warn('[login] Server trả về ngân hàng câu hỏi rỗng — cần kiểm tra seed ge10_custom_questions.');
      }
      const resolvedTheme = data.player?.uiTheme || (get().uiThemesByUser[data.currentUser?.id || user.id] || DEFAULT_UI_THEME) as any;
      if (!data.lessons || data.lessons.length === 0) {
        console.warn('[login] Server trả về danh sách bài giảng rỗng — cần kiểm tra seed ge10_lessons.');
      }

      set(_state => {
        return {
          currentUser: data.currentUser || user,
          uiTheme: resolvedTheme,
          currentSubject: data.player?.activeSubject || 'english',
          activeGradeTier: data.player?.activeGradeTier || DEFAULT_GRADE_TIER,
          player: data.player,
          pet: data.pet,
          categoryStats: data.categoryStats || {},
          logs: data.logs || [],
          rewards: data.rewards || [],
          rewardRedemptions: data.rewardRedemptions || [],
          challenges: data.challenges || [],
          challengeTemplates: data.challengeTemplates || [],
          gameSettings: data.gameSettings || DEFAULT_GAME_SETTINGS,
          questions: enrichedQuestions,
          lessons: (data.lessons || []).map((l: any) => {
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
      // Không tạo hồ sơ/vai trò giả khi không tải được dữ liệu thật — báo lỗi rõ ràng
      // và giữ nguyên trạng thái hiện có (currentUser vẫn null → màn hình đăng nhập).
      toast.error('Không thể tải hồ sơ từ máy chủ. Vui lòng kiểm tra kết nối và thử đăng nhập lại.');
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

  updateAvatar: async (newAvatar: string) => {
    const profile = get().currentUser;
    if (!profile) return false;

    const ok = await authService.updateAvatar(profile.id, newAvatar);
    if (ok) {
      set(state => ({
        currentUser: state.currentUser ? { ...state.currentUser, avatar: newAvatar } : null,
        availableProfiles: state.availableProfiles.map(p =>
          p.id === profile.id ? { ...p, avatar: newAvatar } : p
        )
      }));
      toast.success('Đã thay đổi ảnh đại diện thành công! 🎉');
      return true;
    }
    toast.error('Không thể thay đổi ảnh đại diện.');
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
          ...getProfileScopedResetState(),
          sessionAccountId: null,
          availableProfiles: [],
          profilesLoading: false,
          lastSyncTime: null,
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
