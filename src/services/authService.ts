import { supabase } from '../utils/supabaseClient';
import { activeProfileHeaders } from './profileHeaders';
import { useGameState } from '../hooks/useGameState';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const authService = {
  getAccessToken: async (): Promise<string | null> => {
    const state = useGameState.getState();
    if (state.currentUser?.id?.startsWith('mock-dev-')) {
      return state.currentUser.id;
    }
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  fetchProfiles: async (): Promise<any[]> => {
    const token = await authService.getAccessToken();
    if (!token) return [];
    
    const res = await fetch(`${backendUrl}/api/profiles`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data.profiles || [];
    }
    throw new Error('Failed to fetch profiles');
  },

  selectProfile: async (profileId: string): Promise<any> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/profile/${profileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Failed to load profile details for ${profileId}`);
  },

  createProfile: async (role: 'student' | 'tutor', name: string): Promise<any> => {
    const sessionRes = await supabase.auth.getSession();
    const token = sessionRes.data.session?.access_token;
    const user = sessionRes.data.session?.user;
    if (!token || !user) throw new Error('No user session available');

    const res = await fetch(`${backendUrl}/api/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url,
        role
      })
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to create new profile');
  },

  quickStartProfile: async (role: 'student' | 'tutor'): Promise<any> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No token found');

    const res = await fetch(`${backendUrl}/api/profiles/quick-start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role })
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to quick start profile');
  },

  syncUser: async (): Promise<void> => {
    const token = await authService.getAccessToken();
    if (!token) return;

    await fetch(`${backendUrl}/api/auth/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  fetchCurrentProfile: async (): Promise<any> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token');

    const res = await fetch(`${backendUrl}/api/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to fetch current profile');
  },

  renameProfile: async (profileId: string, newName: string): Promise<boolean> => {
    const token = await authService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/profiles/rename`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...activeProfileHeaders(profileId)
      },
      body: JSON.stringify({ profileId, newName })
    });
    return res.ok;
  },

  updateAvatar: async (profileId: string, newAvatar: string): Promise<boolean> => {
    const token = await authService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/profiles/update-avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...activeProfileHeaders(profileId)
      },
      body: JSON.stringify({ profileId, newAvatar })
    });
    return res.ok;
  }
};
