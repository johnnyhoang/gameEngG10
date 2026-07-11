import { supabase } from '../utils/supabaseClient';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

export const adminService = {
  getAccessToken: async (): Promise<string | null> => {
    const sessionRes = await supabase.auth.getSession();
    return sessionRes.data.session?.access_token || null;
  },

  fetchAuditLogs: async (): Promise<any[]> => {
    const token = await adminService.getAccessToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to fetch audit logs');
  },

  fetchSkipReviews: async (studentId: string): Promise<any[]> => {
    const token = await adminService.getAccessToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/family/skip-reviews/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to fetch skip reviews');
  },

  resolveSkipReview: async (reviewId: string): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/family/skip-reviews/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reviewId })
    });
    return res.ok;
  },

  deleteCustomQuestion: async (questionId: string): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.ok;
  },

  updateCustomQuestion: async (questionId: string, questionData: any): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/questions/custom/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(questionData)
    });
    return res.ok;
  },

  fetchAdminStudents: async (): Promise<any[]> => {
    const token = await adminService.getAccessToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/admin/users`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to fetch admin students list');
  },

  promoteUser: async (targetUserId: string, newRole: string): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/promote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ targetUserId, newRole })
    });
    return res.ok;
  },

  fetchStudentProfile: async (studentUserId: string): Promise<any> => {
    const token = await adminService.getAccessToken();
    if (!token) return null;

    const res = await fetch(`${backendUrl}/api/admin/student-profile?studentUserId=${studentUserId}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Failed to fetch student profile');
  },

  adminMarkRewardDelivered: async (studentUserId: string, redemptionId: string): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/deliver-reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ studentUserId, redemptionId })
    });
    return res.ok;
  },

  adminCancelRedemption: async (studentUserId: string, redemptionId: string): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/cancel-redemption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ studentUserId, redemptionId })
    });
    return res.ok;
  },

  adminSetEnergy: async (studentUserId: string, energyPercent: number): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/refill-energy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ studentUserId, energyPercent })
    });
    return res.ok;
  },

  adminSetEnergyConfig: async (studentUserId: string, maxEnergy: number, resetHours: number): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/set-energy-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ studentUserId, maxEnergy, resetHours })
    });
    return res.ok;
  },

  updateGameSettings: async (payload: any): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/game-settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(payload)
    });
    return res.ok;
  },

  fetchVicePrincipalApplications: async (): Promise<any[]> => {
    const token = await adminService.getAccessToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/admin/vice-principal-applications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      return await res.json();
    }
    return [];
  },

  respondVicePrincipal: async (applicationId: string, accept: boolean): Promise<boolean> => {
    const token = await adminService.getAccessToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/respond-vice-principal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ applicationId, accept })
    });
    return res.ok;
  }
};
