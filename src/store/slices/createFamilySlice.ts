// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { familyService } from '../../services/familyService';

export const createFamilySlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'familyLinks' | 'secondaryParents' | 'fetchFamily' | 'sendInvite' | 'inviteSecondary' | 'updateSecondaryPermissions' | 'respondInvite' | 'leaveFamily'
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
        secondaryParents: data.secondaryParents || []
      });
    } catch (e) {
      console.error('Lỗi lấy dữ liệu gia đình', e);
    }
  },

  sendInvite: async (targetId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.sendInvite(pId, targetId);
    if (success) { await state.fetchFamily(); }
    return success;
  },

  inviteSecondary: async (targetEmail: string, studentId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const success = await familyService.inviteSecondary(pId, targetEmail, studentId);
    if (success) { 
      await state.fetchFamily(); 
    }
    return success;
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
  }
});

