import { supabase } from '../utils/supabaseClient';
import type { ClassReward, ClassRewardRedemption } from '../types/game';
import { activeProfileHeaders } from './profileHeaders';
import { useGameState } from '../hooks/useGameState';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

async function getToken(): Promise<string | null> {
  const state = useGameState.getState();
  if (state.currentUser?.id?.startsWith('mock-dev-')) {
    return state.currentUser.id;
  }
  const sessionRes = await supabase.auth.getSession();
  return sessionRes.data.session?.access_token || null;
}

function mapReward(r: any): ClassReward {
  return {
    id: r.id,
    teacherId: r.teacher_id,
    teacherName: r.teacher_name,
    title: r.title,
    costRuby: r.cost_ruby ?? r.cost_coins,
    quantity: r.quantity,
    remaining: r.remaining,
    createdAt: r.created_at,
  };
}

function mapRedemption(r: any): ClassRewardRedemption {
  return {
    id: r.id,
    classRewardId: r.class_reward_id,
    studentId: r.student_id,
    studentName: r.student_name,
    studentAvatar: r.student_avatar,
    rewardTitle: r.reward_title,
    costRuby: r.cost_ruby ?? r.cost_coins,
    status: r.status,
    requestedAt: r.requested_at,
    deliveredAt: r.delivered_at,
  };
}

export const classRewardService = {
  /** Lấy danh sách class rewards + redemptions theo role hiện tại */
  fetch: async (): Promise<{
    rewards: ClassReward[];
    redemptions: ClassRewardRedemption[];
    isOrphan: boolean;
  }> => {
    const token = await getToken();
    if (!token) return { rewards: [], redemptions: [], isOrphan: false };

    const res = await fetch(`${backendUrl}/api/class-rewards`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    if (!res.ok) return { rewards: [], redemptions: [], isOrphan: false };

    const data = await res.json();
    return {
      rewards: (data.rewards || []).map(mapReward),
      redemptions: (data.redemptions || []).map(mapRedemption),
      isOrphan: data.isOrphan ?? false,
    };
  },

  /** Teacher tạo phần thưởng lớp */
  create: async (
    title: string,
    costRuby: number,
    quantity: number
  ): Promise<{ success: boolean; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/class-rewards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
      body: JSON.stringify({ title, costRuby, quantity }),
    });
    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  /** Teacher xóa phần thưởng lớp */
  delete: async (rewardId: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-rewards/${rewardId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },

  /** Student đổi phần thưởng lớp */
  redeem: async (
    rewardId: string
  ): Promise<{ success: boolean; redemptionId?: string; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/class-rewards/${rewardId}/redeem`, {
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

  /** Student hủy yêu cầu đổi đang pending → hoàn Ruby */
  cancelRedemption: async (redemptionId: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-rewards/redemptions/${redemptionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },

  /** Teacher xác nhận đã phát thưởng ngoài đời */
  deliver: async (redemptionId: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/class-rewards/redemptions/${redemptionId}/deliver`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },
};
