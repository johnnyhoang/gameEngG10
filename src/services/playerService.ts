import { supabase } from '../utils/supabaseClient';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const playerService = {
  getAccessToken: async (): Promise<string | null> => {
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  awardCoins: async (profileId: string, coins: number, activityTitle: string, activityDetails: string | object): Promise<number> => {
    const token = await playerService.getAccessToken();
    if (!token) throw new Error('No access token');

    const res = await fetch(`${backendUrl}/api/economy/transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        profileId,
        amount: coins,
        reason: activityTitle,
        details: activityDetails
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.coins;
    }
    throw new Error('Failed to record transaction');
  },

  clearExploration: async (profileId: string, pageId: string): Promise<any> => {
    const token = await playerService.getAccessToken();
    if (!token) throw new Error('No access token');

    const res = await fetch(`${backendUrl}/api/exploration/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        profileId,
        pageId
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.progress;
    }
    throw new Error('Failed to sync exploration progress');
  },

  syncProfile: async (profileId: string, payload: any): Promise<any> => {
    const token = await playerService.getAccessToken();
    if (!token) throw new Error('No access token');

    const res = await fetch(`${backendUrl}/api/profile/${profileId}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      return await res.json();
    }
    if (res.status === 409) {
      const data = await res.json();
      return { conflict: true, serverData: data.serverData };
    }
    throw new Error('Failed to sync profile data');
  }
};
