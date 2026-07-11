import { supabase } from '../utils/supabaseClient';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export interface StartSessionParams {
  profileId: string;
  sessionType: string;
  subject: string;
  gradeTier?: number;
  bossId?: string;
  lessonId?: string;
  failedQuestionIds?: string[];
}

export interface EndSessionParams {
  sessionId: string;
  profileId: string;
  answers: {
    questionId: string;
    typedAnswer?: string;
    selectedAnswer?: string;
    scoreRatio: number;
  }[];
  isDefeat: boolean;
  bossBonusIndex?: number;
}

export const gameService = {
  getAccessToken: async (): Promise<string | null> => {
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  startSession: async (params: StartSessionParams): Promise<{ sessionId: string; questions: any[] }> => {
    const token = await gameService.getAccessToken();
    if (!token) throw new Error('No access token available');

    const res = await fetch(`${backendUrl}/api/game/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to start game session');
  },

  endSession: async (params: EndSessionParams): Promise<any> => {
    const token = await gameService.getAccessToken();
    if (!token) throw new Error('No access token available');

    const res = await fetch(`${backendUrl}/api/game/session/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to submit game session results');
  }
};
