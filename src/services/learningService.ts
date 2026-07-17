import { authService } from './authService';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const learningService = {
  fetchContentAll: async (gradeTier: number, subjectId: string): Promise<{ questions: any[]; lessons: any[] }> => {
    const token = await authService.getAccessToken();
    if (!token) throw new Error('No auth token available');

    const res = await fetch(`${backendUrl}/api/learning-content/content/all?gradeTier=${gradeTier}&subjectId=${subjectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        questions: data.questions || [],
        lessons: data.lessons || []
      };
    }
    throw new Error(`Failed to load learning content for grade ${gradeTier} subject ${subjectId}`);
  }
};
