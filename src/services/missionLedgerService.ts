import { supabase } from '../utils/supabaseClient';

export type MissionCategory = 'onboarding' | 'daily' | 'milestone';

export interface MissionAssignment {
  id: number;
  missionKey: string;
  category: MissionCategory;
  title: string;
  description: string;
  target: number;
  current: number;
  status: 'active' | 'completed' | 'claimed' | 'expired';
  periodKey: string;
  completedAt?: string | null;
  reward: { xp?: number; ruby?: number };
  displayOrder: number;
}

export interface MissionLedgerResponse {
  missions: MissionAssignment[];
  progress?: { level: number; xp: number; streak: number; ruby?: number };
}

export interface MissionEventInput {
  profileId: string;
  idempotencyKey: string;
  eventType: string;
  gradeTier?: number;
  subjectId?: string;
  entityType?: string;
  entityId?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

async function headers(profileId: string, json = false): Promise<Record<string, string>> {
  const session = (await supabase.auth.getSession()).data.session;
  return {
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    'X-Profile-Id': profileId,
  };
}

export async function fetchMissionLedger(profileId: string, gradeTier: number): Promise<MissionLedgerResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      `${backendUrl}/api/mission-ledger?profileId=${encodeURIComponent(profileId)}&gradeTier=${gradeTier}`,
      { 
        headers: await headers(profileId),
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Không tải được Sổ Tu Học (${response.status})`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Kết nối tới máy chủ Sổ Tu Học bị quá hạn (Timeout). Vui lòng thử lại.');
    }
    throw error;
  }
}

export async function recordMissionEvent(input: MissionEventInput): Promise<void> {
  if (!input.profileId || input.profileId.startsWith('mock-')) return;
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${backendUrl}/api/mission-events`, {
        method: 'POST',
        headers: await headers(input.profileId, true),
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      window.dispatchEvent(new CustomEvent('mission-ledger-updated', { detail: data }));
      return;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise(resolve => window.setTimeout(resolve, 400));
    }
  }
  console.error('[Sổ Tu Học] Không thể ghi nhận hoạt động sau khi retry', { input, error: lastError });
}
