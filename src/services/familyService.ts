import { supabase } from '../utils/supabaseClient';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const familyService = {
  getAccessToken: async (): Promise<string | null> => {
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  fetchFamily: async (profileId: string): Promise<{ links: any[]; secondaryParents: any[] }> => {
    const token = await familyService.getAccessToken();
    if (!token) throw new Error('No access token');

    const res = await fetch(`${backendUrl}/api/family/${profileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        links: data.links || [],
        secondaryParents: data.secondaryParents || []
      };
    }
    throw new Error('Failed to fetch family data');
  },

  sendInvite: async (senderProfileId: string, targetEmail: string, connectAsSecondary?: boolean): Promise<{ success: boolean; conflictCode?: string; error?: string }> => {
    const token = await familyService.getAccessToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/family/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ senderProfileId, targetEmail, connectAsSecondary })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, conflictCode: err.code, error: err.error || 'Có lỗi xảy ra' };
  },

  inviteSecondary: async (senderProfileId: string, targetEmail: string): Promise<boolean> => {
    const token = await familyService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/family/invite-secondary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ senderProfileId, targetEmail })
    });
    if (res.ok) return true;
    const err = await res.json();
    alert(err.error || 'Có lỗi xảy ra');
    return false;
  },

  inviteSecondaryRequest: async (senderProfileId: string, targetEmail: string): Promise<{ success: boolean; error?: string }> => {
    const token = await familyService.getAccessToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/family/invite-secondary-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ senderProfileId, targetEmail })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  searchUsers: async (q: string, role?: string): Promise<any[]> => {
    const token = await familyService.getAccessToken();
    if (!token) return [];

    const url = new URL(`${backendUrl}/api/users/search`);
    url.searchParams.append('q', q);
    if (role) url.searchParams.append('role', role);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) return res.json();
    return [];
  },

  updateSecondaryPermissions: async (senderProfileId: string, linkId: string, permissions: any): Promise<boolean> => {
    const token = await familyService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/family/secondary-permissions`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ senderProfileId, linkId, permissions })
    });
    if (res.ok) return true;
    const err = await res.json();
    alert(err.error || 'Có lỗi xảy ra');
    return false;
  },

  respondInvite: async (profileId: string, linkId: string, accept: boolean): Promise<boolean> => {
    const token = await familyService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/family/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ profileId, linkId, accept })
    });
    return res.ok;
  },

  leaveFamily: async (profileId: string, linkId: string): Promise<boolean> => {
    const token = await familyService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/family/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ profileId, linkId })
    });
    return res.ok;
  },

  applyVicePrincipal: async (profileId: string): Promise<any> => {
    const token = await familyService.getAccessToken();
    if (!token) return { success: false, error: 'No token' };

    const res = await fetch(`${backendUrl}/api/family/apply-vice-principal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ profileId })
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  }
};
