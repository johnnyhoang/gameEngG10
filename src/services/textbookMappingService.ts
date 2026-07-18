import { supabase } from '../utils/supabaseClient';
import type { TextbookMapping } from '../types/game';
import { activeProfileHeaders } from './profileHeaders';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

async function getToken(): Promise<string | null> {
  const sessionRes = await supabase.auth.getSession();
  return sessionRes.data.session?.access_token || null;
}

function mapMapping(m: any): TextbookMapping {
  return {
    categoryKey: m.category_key || m.categoryKey,
    subject: m.subject,
    loai: m.loai,
    bai: Number(m.bai),
    ham: m.ham,
  };
}

export const textbookMappingService = {
  fetch: async (): Promise<TextbookMapping[]> => {
    const token = await getToken();
    if (!token) return [];

    const res = await fetch(`${backendUrl}/api/admin/textbook-mappings`, {
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    if (!res.ok) return [];

    const data = await res.json();
    return (data.textbookMappings || []).map(mapMapping);
  },

  create: async (mapping: TextbookMapping): Promise<{ success: boolean; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/admin/textbook-mappings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...activeProfileHeaders(),
      },
      body: JSON.stringify(mapping),
    });

    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  update: async (key: string, mapping: Partial<TextbookMapping>): Promise<{ success: boolean; error?: string }> => {
    const token = await getToken();
    if (!token) return { success: false, error: 'No access token' };

    const res = await fetch(`${backendUrl}/api/admin/textbook-mappings/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...activeProfileHeaders(),
      },
      body: JSON.stringify(mapping),
    });

    if (res.ok) return { success: true };
    const err = await res.json();
    return { success: false, error: err.error || 'Có lỗi xảy ra' };
  },

  delete: async (key: string): Promise<boolean> => {
    const token = await getToken();
    if (!token) return false;

    const res = await fetch(`${backendUrl}/api/admin/textbook-mappings/${key}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}`, ...activeProfileHeaders() },
    });
    return res.ok;
  },
};
