import { supabase } from '../utils/supabaseClient';
import type { TutorQuest } from '../types/game';
import { activeProfileHeaders } from './profileHeaders';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

async function getToken(): Promise<string | null> {
  const sessionRes = await supabase.auth.getSession();
  return sessionRes.data.session?.access_token || null;
}

function mapTutorQuest(q: any): TutorQuest {
  return {
    id: q.id,
    title: q.title,
    description: q.description,
    rewardRuby: q.reward_ruby,
    status: q.status === 'assigned' ? 'pending' : q.status,
    timestamp: q.created_at ? new Date(q.created_at).getTime() : Date.now(),
    studentId: q.student_id,
    studentName: q.student_name,
    tutorId: q.tutor_id,
    tutorName: q.tutor_name,
    completedAt: q.completed_at,
    claimedAt: q.claimed_at,
  };
}

export const tutorQuestsService = {
  fetch: async (): Promise<TutorQuest[]> => {
    const token = await getToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/tutor-quests`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    if (!res.ok) return [];

    const data = await res.json();
    return (data.quests || []).map(mapTutorQuest);
  },

  create: async (
    studentIds: string[],
    title: string,
    description: string,
    rewardRuby: number
  ): Promise<{ success: boolean; quests?: TutorQuest[]; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/tutor-quests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
      body: JSON.stringify({ studentIds, title, description, rewardRuby }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, quests: (data.quests || []).map(mapTutorQuest) };
    }
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  complete: async (questId: string): Promise<{ success: boolean; quest?: TutorQuest; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/tutor-quests/${questId}/complete`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, quest: mapTutorQuest(data.quest) };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  },

  claim: async (questId: string): Promise<{ success: boolean; rewardRuby?: number; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/tutor-quests/${questId}/claim`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, rewardRuby: data.rewardRuby };
    }
    const err = await res.json();
    return { success: false, error: err.error };
  },

  delete: async (questId: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/tutor-quests/${questId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },
};
