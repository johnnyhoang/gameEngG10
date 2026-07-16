import { supabase } from '../utils/supabaseClient';
import { activeProfileHeaders } from './profileHeaders';
import { useGameState } from '../hooks/useGameState';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const classLinksService = {
  getAccessToken: async (): Promise<string | null> => {
    const state = useGameState.getState();
    if (state.currentUser?.id?.startsWith('mock-dev-')) {
      return state.currentUser.id;
    }
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  fetchClassLinks: async (profileId: string): Promise<{ links: any[]; secondaryTutors: any[] }> => {
    const token = await classLinksService.getAccessToken();
    if (!token) throw new Error('No access token');

    const res = await fetch(`${backendUrl}/api/class-links/${profileId}`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders(profileId) }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        links: data.links || [],
        secondaryTutors: data.secondaryTutors || []
      };
    }
    throw new Error('Failed to fetch class links data');
  },

  sendInvite: async (senderProfileId: string, targetEmail: string, connectAsSecondary?: boolean): Promise<{ success: boolean; conflictCode?: string; error?: string }> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/class-links/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(senderProfileId) },
      body: JSON.stringify({ senderProfileId, targetEmail, connectAsSecondary })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, conflictCode: err.code, error: err.error || 'Có lỗi xảy ra' };
  },

  inviteSecondary: async (senderProfileId: string, targetEmail: string): Promise<boolean> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-links/invite-secondary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(senderProfileId) },
      body: JSON.stringify({ senderProfileId, targetEmail })
    });
    if (res.ok) return true;
    const err = await res.json();
    alert(err.error || 'Có lỗi xảy ra');
    return false;
  },

  inviteSecondaryRequest: async (senderProfileId: string, targetEmail: string): Promise<{ success: boolean; error?: string }> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/class-links/invite-secondary-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
      body: JSON.stringify({ senderProfileId, targetEmail })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  searchUsers: async (q: string, role?: string, profileId?: string): Promise<any[]> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return [];

    const url = new URL(`${backendUrl}/api/users/search`);
    url.searchParams.append('q', q);
    if (role) url.searchParams.append('role', role);
    if (profileId) url.searchParams.append('profileId', profileId);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders(profileId) }
    });
    if (res.ok) return res.json();
    return [];
  },

  updateSecondaryPermissions: async (senderProfileId: string, linkId: string, permissions: any): Promise<boolean> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-links/secondary-permissions`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
      body: JSON.stringify({ senderProfileId, linkId, permissions })
    });
    if (res.ok) return true;
    const err = await res.json();
    alert(err.error || 'Có lỗi xảy ra');
    return false;
  },

  respondInvite: async (profileId: string, linkId: string, accept: boolean): Promise<boolean> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-links/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(profileId) },
      body: JSON.stringify({ profileId, linkId, accept })
    });
    return res.ok;
  },

  leaveClass: async (profileId: string, linkId: string): Promise<boolean> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-links/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(profileId) },
      body: JSON.stringify({ profileId, linkId })
    });
    return res.ok;
  },

  applyVicePrincipal: async (profileId: string): Promise<any> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return { success: false, error: 'No token' };

    const res = await fetch(`${backendUrl}/api/class-links/apply-vice-principal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(profileId) },
      body: JSON.stringify({ profileId })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  inviteAdminConnection: async (senderProfileId: string, targetEmail: string): Promise<any> => {
    const token = await classLinksService.getAccessToken();
    if (!token) return { success: false, error: 'No token' };

    const res = await fetch(`${backendUrl}/api/class-links/invite-admin-connection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
      body: JSON.stringify({ senderProfileId, targetEmail })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  }
};
