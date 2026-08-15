import { supabase } from '../utils/supabaseClient';
import type { TutorReward, RewardRedemption } from '../types/game';
import { activeProfileHeaders } from './profileHeaders';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

async function getToken(): Promise<string | null> {
  const sessionRes = await supabase.auth.getSession();
  return sessionRes.data.session?.access_token || null;
}

function mapReward(r: any): TutorReward {
  return {
    id: r.id,
    title: r.title,
    costRuby: r.costRuby,
    quantity: r.quantity,
    remainingQuantity: r.remainingQuantity,
    isUnlimited: r.isUnlimited,
    timestamp: r.createdAt,
  };
}

function mapRedemption(r: any): RewardRedemption {
  return {
    id: r.id,
    rewardId: r.rewardId,
    rewardTitle: r.rewardTitle,
    costRuby: r.costRuby,
    status: r.status,
    timestamp: r.timestamp,
    deliveredAt: r.deliveredAt ?? undefined,
  };
}

/** Quà Khuyến Học CHUNG toàn viện — phía Học Sinh (xem / đổi / tự huỷ yêu cầu đang chờ). */
export const schoolRewardService = {
  fetch: async (): Promise<{ rewards: TutorReward[]; redemptions: RewardRedemption[] }> => {
    const token = await getToken();
    if (!token) return { rewards: [], redemptions: [] };

    const res = await fetch(`${backendUrl}/api/school-rewards`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    if (!res.ok) return { rewards: [], redemptions: [] };

    const data = await res.json();
    return {
      rewards: (data.rewards || []).map(mapReward),
      redemptions: (data.redemptions || []).map(mapRedemption),
    };
  },

  redeem: async (rewardId: string): Promise<{ success: boolean; redemptionId?: string; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/school-rewards/${rewardId}/redeem`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, redemptionId: data.redemptionId };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  },

  cancelRedemption: async (redemptionId: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/school-rewards/redemptions/${redemptionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },
};
