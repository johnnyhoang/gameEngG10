import { supabase } from '../utils/supabaseClient';
import { activeProfileHeaders } from './profileHeaders';
import { useGameState } from '../hooks/useGameState';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export interface StartSessionParams {
  profileId: string;
  sessionType: string;
  subject: string;
  gradeTier?: number;
  bossId?: string;
  lessonId?: string;
  failedQuestionIds?: string[];
  lessonQuizCount?: number;
}

export interface EndSessionParams {
  sessionId: string;
  profileId: string;
  answers: {
    questionId: string;
    typedAnswer?: string;
    selectedAnswer?: string;
    scoreRatio: number;
    isSkipped?: boolean;
    signature?: string;
  }[];
  isDefeat: boolean;
  bossBonusIndex?: number;
}

export const gameService = {
  getAccessToken: async (): Promise<string | null> => {
    const state = useGameState.getState();
    if (state.currentUser?.id?.startsWith('mock-dev-')) {
      return state.currentUser.id;
    }
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  startSession: async (params: StartSessionParams): Promise<{ sessionId: string; questions: any[] }> => {
    const token = await gameService.getAccessToken();
    if (!token) throw new Error('No access token available');

    const res = await fetch(`${backendUrl}/api/game/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(params.profileId) },
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
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...activeProfileHeaders(params.profileId) },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to submit game session results');
  },
  getMatchPairs: async (subject: string, gradeTier: number = 9): Promise<{ word: string; mean: string }[]> => {
    const token = await gameService.getAccessToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/game/match-pairs?subject=${encodeURIComponent(subject)}&gradeTier=${gradeTier}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data.pairs || [];
    }
    return [];
  }
};
