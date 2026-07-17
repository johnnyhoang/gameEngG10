import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import { fetchMissionLedger, type MissionAssignment } from '../services/missionLedgerService';
import { useTranslate } from '../hooks/useTranslate';

interface LearningLedgerProps {
  compact?: boolean;
  defaultExpanded?: boolean;
}

export function LearningLedger({ compact: _compact = false, defaultExpanded: _defaultExpanded = false }: LearningLedgerProps) {
  const { t } = useTranslate();
  const profileId = useGameState(state => state.currentUser?.id);
  const gradeTier = useGameState(state => state.activeGradeTier);
  const player = useGameState(state => state.player);
  const [missions, setMissions] = useState<MissionAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!profileId || profileId.startsWith('mock-')) { setLoading(false); return; }
    setLoading(true);
    setError('');
    try {
      const data = await fetchMissionLedger(profileId, gradeTier);
      setMissions(data.missions);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t('Không tải được Sổ Tu Học', 'Failed to load Study Record'));
    } finally {
      setLoading(false);
    }
  }, [gradeTier, profileId]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const refresh = () => void load();
    window.addEventListener('mission-ledger-updated', refresh);
    return () => window.removeEventListener('mission-ledger-updated', refresh);
  }, [load]);

  const onboarding = useMemo(() => missions.filter(item => item.category === 'onboarding'), [missions]);
  const daily = useMemo(() => missions.filter(item => item.category === 'daily'), [missions]);

  return (
    <div className="w-full">
      {error ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200">
          <span>{error}</span>
          <button onClick={() => void load()} className="inline-flex items-center gap-1 font-bold">
            <RefreshCw className="h-3.5 w-3.5" /> {t("Thử lại", "Retry")}
          </button>
        </div>
      ) : loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-synth-cyan" />
          <p className="text-[10px] text-slate-400 font-orbitron uppercase tracking-wider">{t("Đang nạp Sổ Tu Học...", "Loading Journal...")}</p>
        </div>
      ) : missions.length === 0 ? (
        <p className="py-3 text-center text-xs text-slate-400">{t("Chưa có nhiệm vụ phù hợp với hồ sơ này.", "No tasks available for this profile.")}</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <MissionGroup title={t("🌱 Nhập Môn", "🌱 Onboarding")} items={onboarding} />
          <MissionGroup title={t("📋 Nhiệm Vụ Hôm Nay", "📋 Today's Missions")} items={daily} />
          <div className="rounded-xl border border-white/5 bg-white/5 p-3">
            <h3 className="mb-2 font-orbitron text-[10px] font-black uppercase text-synth-orange">{t("📈 Tiến Độ Tu Học", "📈 Study Progress")}</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>Level <strong className="text-white">{player.level}</strong></p>
              <p>{t("Kinh nghiệm", "Experience")} <strong className="text-white">{player.xp} XP</strong></p>
              <p>{t("Chuỗi học", "Study Streak")} <strong className="text-white">{player.streak} {t("ngày", "days")}</strong></p>
            </div>
            <div className="mt-3 rounded-lg border border-dashed border-synth-orange/30 bg-synth-orange/5 p-2.5" aria-disabled="true">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">🎁</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-synth-orange">{t("Hòm Bí Mật", "Mystery Box")}</p>
                  <p className="text-[9px] text-slate-400 truncate">{t("Đang hoàn thiện cơ chế nhận thưởng an toàn.", "Reward system is under development.")}</p>
                </div>
                <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase text-slate-500 shrink-0">{t("Sắp mở", "Soon")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MissionGroup({ title, items }: { title: string; items: MissionAssignment[] }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-3">
      <h3 className="mb-2 font-orbitron text-[10px] font-black uppercase text-synth-cyan">{title}</h3>
      <div className="max-h-none md:max-h-52 space-y-2 overflow-y-visible md:overflow-y-auto pr-1">
        {items.map(item => {
          const percent = Math.min(100, Math.round(item.current / item.target * 100));
          return (
            <div key={item.id} className="rounded-lg bg-black/15 p-2 text-[10px]">
              <div className="mb-1 flex justify-between gap-2 text-slate-200">
                <span className="font-semibold">{item.status === 'completed' ? '✅ ' : ''}{item.title}</span>
                <span className="shrink-0">{item.current}/{item.target}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-black/30"><div className="h-full rounded-full bg-synth-green" style={{ width: `${percent}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
