import { authService } from './authService';
import { activeProfileHeaders } from './profileHeaders';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const learningService = {
  fetchContentAll: async (gradeTier: number, subjectId: string): Promise<{ questions: any[]; lessons: any[] }> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/learning-content/content/all?gradeTier=${gradeTier}&subjectId=${subjectId}`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        questions: data.questions || [],
        lessons: data.lessons || []
      };
    }
    throw new Error(`Failed to load learning content for grade ${gradeTier} subject ${subjectId}`);
  },

  fetchHandbookPages: async (): Promise<any[]> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/learning-content/handbook-pages`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.handbookPages || [];
    }
    throw new Error('Failed to load handbook pages from server');
  },

  fetchEnglishIslandItems: async (): Promise<any[]> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/learning-content/english-island/items`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    }
    throw new Error('Failed to load english island items from server');
  },

  fetchExamBlueprints: async (subject: string): Promise<any[]> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/learning-content/exam-blueprints?subject=${subject}`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() }
    });
    if (res.ok) {
      const data = await res.json();
      return data.blueprints || [];
    }
    throw new Error(`Failed to load exam blueprints for subject ${subject} from server`);
  }
};

