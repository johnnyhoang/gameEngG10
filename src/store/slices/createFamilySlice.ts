// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { supabase } from '../../utils/supabaseClient';

export const createFamilySlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState, 
    'familyLinks' | 'fetchFamily' | 'sendInvite' | 'respondInvite' | 'leaveFamily'
  >
> = (set, get) => ({
  familyLinks: [],

  fetchFamily: async () => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId || pId.startsWith('mock-')) return;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/${pId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ familyLinks: data.links || [] });
      }
    } catch (e) {
      console.error('Lỗi lấy dữ liệu gia đình', e);
    }
  },

  sendInvite: async (targetId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return false;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ senderProfileId: pId, targetId })
      });
      if (res.ok) { await state.fetchFamily(); return true; }
      const err = await res.json();
      alert(err.error || 'Có lỗi xảy ra');
      return false;
    } catch (e) { return false; }
  },

  respondInvite: async (linkId: string, accept: boolean) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return false;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ profileId: pId, linkId, accept })
      });
      if (res.ok) { await state.fetchFamily(); return true; }
      return false;
    } catch (e) { return false; }
  },

  leaveFamily: async (linkId: string) => {
    const state = get();
    const pId = state.currentUser?.id;
    if (!pId) return false;
    const session = (await supabase.auth.getSession()).data.session;
    const token = session?.access_token;
    if (!token) return false;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
    try {
      const res = await fetch(`${backendUrl}/api/family/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ profileId: pId, linkId })
      });
      if (res.ok) { await state.fetchFamily(); return true; }
      return false;
    } catch (e) { return false; }
  }
});
