import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { classLinksService } from '../../services/classLinksService';

export const createClassLinksSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'classLinks' | 'secondaryTutors' | 'fetchClassLinks' | 'sendClassInvite' | 'inviteSecondary' | 'inviteSecondaryRequest' | 'searchUsers' | 'updateSecondaryPermissions' | 'respondClassInvite' | 'leaveClass' | 'applyVicePrincipal' | 'inviteAdminConnection'
  >
> = (set, get) => ({
  classLinks: [],
  secondaryTutors: [],

  fetchClassLinks: async () => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId || pId.startsWith('mock-')) return;
    try {
      const data = await classLinksService.fetchClassLinks(pId);
      set({ 
        classLinks: data.links || [],
        secondaryTutors: data.secondaryTutors || []
      });
    } catch (e) {
      console.error('Lỗi lấy dữ liệu liên kết lớp', e);
    }
  },

  sendClassInvite: async (targetEmail: string, connectAsSecondary?: boolean) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'No current user' };
    const result = await classLinksService.sendInvite(pId, targetEmail, connectAsSecondary);
    if (result.success) { 
      await state.fetchClassLinks(); 
    }
    return result;
  },

  inviteSecondary: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await classLinksService.inviteSecondary(pId, targetEmail);
    if (success) { 
      await state.fetchClassLinks(); 
    }
    return success;
  },

  inviteSecondaryRequest: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'No current user' };
    const result = await classLinksService.inviteSecondaryRequest(pId, targetEmail);
    if (result.success) {
      await state.fetchClassLinks();
    }
    return result;
  },

  searchUsers: async (q: string, role?: string) => {
    const profileId = get().currentUser?.id;
    return classLinksService.searchUsers(q, role, profileId);
  },

  updateSecondaryPermissions: async (linkId: string, permissions: any) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await classLinksService.updateSecondaryPermissions(pId, linkId, permissions);
    if (success) { 
      await state.fetchClassLinks(); 
    }
    return success;
  },

  respondClassInvite: async (linkId: string, accept: boolean) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await classLinksService.respondInvite(pId, linkId, accept);
    if (success) { await state.fetchClassLinks(); }
    return success;
  },

  leaveClass: async (linkId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await classLinksService.leaveClass(pId, linkId);
    if (success) { await state.fetchClassLinks(); }
    return success;
  },

  applyVicePrincipal: async () => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'Chưa chọn profile' };
    const res = await classLinksService.applyVicePrincipal(pId);
    if (res.success) { await state.fetchClassLinks(); }
    return res;
  },

  inviteAdminConnection: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'Chưa chọn profile' };
    const res = await classLinksService.inviteAdminConnection(pId, targetEmail);
    if (res.success) { await state.fetchClassLinks(); }
    return res;
  }
});
