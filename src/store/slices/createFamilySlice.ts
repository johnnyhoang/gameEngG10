// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { familyService } from '../../services/familyService';

export const createFamilySlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'familyLinks' | 'secondaryParents' | 'fetchFamily' | 'sendInvite' | 'inviteSecondary' | 'inviteSecondaryRequest' | 'searchUsers' | 'updateSecondaryPermissions' | 'respondInvite' | 'leaveFamily' | 'applyVicePrincipal' | 'inviteAdminConnection'
  >
> = (set, get) => ({
  familyLinks: [],
  secondaryParents: [],

  fetchFamily: async () => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId || pId.startsWith('mock-')) return;
    try {
      const data = await familyService.fetchFamily(pId);
      set({ 
        familyLinks: data.links || [],
        secondaryParents: data.classSecondaryLinks || []
      });
    } catch (e) {
      console.error('Lỗi lấy dữ liệu gia đình', e);
    }
  },

  sendInvite: async (targetEmail: string, connectAsSecondary?: boolean) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'No current user' };
    const result = await familyService.sendInvite(pId, targetEmail, connectAsSecondary);
    if (result.success) { 
      await state.fetchFamily(); 
    }
    return result;
  },

  inviteSecondary: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.inviteSecondary(pId, targetEmail);
    if (success) { 
      await state.fetchFamily(); 
    }
    return success;
  },

  inviteSecondaryRequest: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'No current user' };
    const result = await familyService.inviteSecondaryRequest(pId, targetEmail);
    if (result.success) {
      await state.fetchFamily();
    }
    return result;
  },

  searchUsers: async (q: string, role?: string) => {
    const profileId = get().currentUser?.id;
    return familyService.searchUsers(q, role, profileId);
  },

  updateSecondaryPermissions: async (linkId: string, permissions: any) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.updateSecondaryPermissions(pId, linkId, permissions);
    if (success) { 
      await state.fetchFamily(); 
    }
    return success;
  },

  respondInvite: async (linkId: string, accept: boolean) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.respondInvite(pId, linkId, accept);
    if (success) { await state.fetchFamily(); }
    return success;
  },

  leaveFamily: async (linkId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.leaveFamily(pId, linkId);
    if (success) { await state.fetchFamily(); }
    return success;
  },

  applyVicePrincipal: async () => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'Chưa chọn profile' };
    const res = await familyService.applyVicePrincipal(pId);
    if (res.success) { await state.fetchFamily(); }
    return res;
  },

  inviteAdminConnection: async (targetEmail: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return { success: false, error: 'Chưa chọn profile' };
    const res = await familyService.inviteAdminConnection(pId, targetEmail);
    if (res.success) { await state.fetchFamily(); }
    return res;
  }
});

