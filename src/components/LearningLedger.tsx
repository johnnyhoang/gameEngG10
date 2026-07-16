import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import { fetchMissionLedger, type MissionAssignment } from '../services/missionLedgerService';

interface LearningLedgerProps {
  compact?: boolean;
  defaultExpanded?: boolean;
}

export function LearningLedger({ compact = false, defaultExpanded = false }: LearningLedgerProps) {
  const profileId = useGameState(state => state.currentUser?.id);
  const gradeTier = useGameState(state => state.activeGradeTier);
  const player = useGameState(state => state.player);
  const [missions, setMissions] = useState<MissionAssignment[]>([]);
  const [expanded, setExpanded] = useState(defaultExpanded);
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
      setError(loadError instanceof Error ? loadError.message : 'Không tải được Sổ Tu Học');
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
  const done = (items: MissionAssignment[]) => items.filter(item => item.status === 'completed' || item.status === 'claimed').length;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-3" aria-label="Sổ Tu Học">
      <div className="rounded-2xl border border-synth-cyan/20 bg-synth-gray/20 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => !compact && setExpanded(value => !value)}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
          aria-expanded={expanded}
        >
          <BookOpenCheck className="h-4 w-4 shrink-0 text-synth-cyan" />
          <span className="font-orbitron text-[11px] font-black uppercase text-white">Sổ Tu Học</span>
          <span className="ml-auto flex flex-wrap items-center justify-end gap-2 text-[10px] text-slate-300">
            <span>Level {player.level} · {player.xp} XP</span>
            {!loading && !error && <span>Nhập Môn {done(onboarding)}/{onboarding.length} · Hôm nay {done(daily)}/{daily.length}</span>}
            {loading && <span>Đang cập nhật...</span>}
          </span>
          {!compact && (expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />)}
        </button>

        {!compact && expanded && (
          <div className="border-t border-white/5 p-4">
            {error ? (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200">
                <span>{error}</span>
                <button onClick={() => void load()} className="inline-flex items-center gap-1 font-bold"><RefreshCw className="h-3.5 w-3.5" /> Thử lại</button>
              </div>
            ) : loading ? (
              <p className="py-3 text-center text-xs text-slate-400">Đang mở Sổ Tu Học...</p>
            ) : missions.length === 0 ? (
              <p className="py-3 text-center text-xs text-slate-400">Chưa có nhiệm vụ phù hợp với hồ sơ này.</p>
            ) : (
              <div className="grid gap-4 lg:grid-cols-3">
                <MissionGroup title="🌱 Nhập Môn" items={onboarding} />
                <MissionGroup title="📋 Nhiệm Vụ Hôm Nay" items={daily} />
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <h3 className="mb-2 font-orbitron text-[10px] font-black uppercase text-synth-orange">📈 Tiến Độ Tu Học</h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p>Level <strong className="text-white">{player.level}</strong></p>
                    <p>Kinh nghiệm <strong className="text-white">{player.xp} XP</strong></p>
                    <p>Chuỗi học <strong className="text-white">{player.streak} ngày</strong></p>
                  </div>
                  <div className="mt-3 rounded-lg border border-dashed border-synth-orange/30 bg-synth-orange/5 p-2.5" aria-disabled="true">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">🎁</span>
                      <div>
                        <p className="text-[10px] font-bold text-synth-orange">Hòm Bí Mật</p>
                        <p className="text-[9px] text-slate-400">Đang hoàn thiện cơ chế nhận thưởng an toàn.</p>
                      </div>
                      <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase text-slate-500">Sắp mở</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function MissionGroup({ title, items }: { title: string; items: MissionAssignment[] }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-3">
      <h3 className="mb-2 font-orbitron text-[10px] font-black uppercase text-synth-cyan">{title}</h3>
      <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
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
