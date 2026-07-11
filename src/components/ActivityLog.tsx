import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useSect } from '../contexts/SectContext';
import { Target, Clock, Gift, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';


export const ActivityLog: React.FC = () => {
  const dailyMission = useGameState(state => state.dailyMission);
  const logs = useGameState(state => state.logs);
  const { activeSectId } = useSect();
  const uiTheme = useGameState(state => state.uiTheme);
  const currentUser = useGameState(state => state.currentUser);
  const isUnicorn = uiTheme === 'unicorn-dream';
  const [visibleCount, setVisibleCount] = useState(15);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreLockRef = useRef(false);
  const pageSize = 15;

  // Cô lập nhật ký hoạt động theo Môn phái đang hoạt động (Chỉ áp dụng cho Học Sinh).
  const sectLogs = useMemo(
    () => {
      if (currentUser?.role !== 'student') return logs;
      return logs.filter(log => !log.subject || log.subject === activeSectId);
    },
    [logs, activeSectId, currentUser?.role]
  );

  useEffect(() => {
    setVisibleCount(15);
  }, [sectLogs.length, activeSectId]);

  const visibleLogs = useMemo(() => sectLogs.slice(0, visibleCount), [sectLogs, visibleCount]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loadMoreLockRef.current) return;

    const threshold = 120;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    if (!nearBottom) return;
    if (visibleCount >= sectLogs.length) return;

    loadMoreLockRef.current = true;
    setVisibleCount(prev => Math.min(prev + pageSize, sectLogs.length));
    window.setTimeout(() => {
      loadMoreLockRef.current = false;
    }, 150);
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <FileText className="w-3.5 h-3.5 text-synth-cyan" />;
      case 'challenge': return <Award className="w-3.5 h-3.5 text-synth-orange" />;
      case 'boss': return <Award className="w-3.5 h-3.5 text-synth-magenta" />;
      case 'shop': return <Gift className="w-3.5 h-3.5 text-synth-cyan" />;
      case 'streak_penalty': return <ShieldAlert className="w-3.5 h-3.5 text-red-500" />;
      case 'parent_approve': return <CheckCircle2 className="w-3.5 h-3.5 text-synth-green" />;
      default: return <Clock className="w-3.5 h-3.5 text-synth-text-muted" />;
    }
  };

  return (
    <div className={`glass-panel rounded-2xl p-5 flex flex-col h-full overflow-hidden ${
      isUnicorn ? 'border-violet-200/35 bg-white/80' : 'border-synth-cyan/15'
    }`}>
      {/* Nhiệm vụ ngày Section */}
      {currentUser?.role === 'student' && (
        <div className={`mb-6 pb-4 ${isUnicorn ? 'border-b border-violet-200/35' : 'border-b border-synth-gray'}`}>
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 ${isUnicorn ? 'text-violet-700' : 'text-synth-orange'}`}>
            <Target className={`w-4 h-4 ${isUnicorn ? 'text-fuchsia-500' : ''}`} /> Nhiệm vụ ngày
          </h3>

          {dailyMission ? (
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h4 className={`text-xs font-bold leading-tight ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {dailyMission.title}
                </h4>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-orbitron font-semibold ${
                  dailyMission.completed ? 'bg-synth-green/20 text-synth-green border border-synth-green/30' : 'bg-synth-orange/20 text-synth-orange border border-synth-orange/30'
                }`}>
                  {dailyMission.completed ? 'ĐÃ XONG' : 'ĐANG ĐÁNH'}
                </span>
              </div>

              {/* Requirements list */}
              <div className="space-y-2">
                {dailyMission.requirements.map((req, idx) => (
                  <div key={idx} className={`rounded-lg p-2 text-[11px] ${isUnicorn ? 'bg-white/70 border border-violet-200/25' : 'bg-synth-gray/20 border border-white/5'}`}>
                    <div className={`flex justify-between font-semibold mb-1 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                      <span>{req.description}</span>
                      <span>{req.current}/{req.target}</span>
                    </div>
                    <div className={`w-full h-1 rounded-full overflow-hidden ${isUnicorn ? 'bg-violet-100' : 'bg-synth-gray'}`}>
                      <div 
                        className={`h-full transition-all duration-300 ${
                          req.completed ? (isUnicorn ? 'unicorn-rainbow-strip' : 'bg-synth-green') : (isUnicorn ? 'bg-violet-300' : 'bg-synth-orange')
                        }`}
                        style={{ width: `${Math.min(100, (req.current / req.target) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Rewards */}
              <div className={`flex items-center justify-between rounded-lg p-2 text-xs font-semibold ${
                isUnicorn ? 'bg-white/70 border border-violet-200/25' : 'bg-synth-blue/30 border border-synth-cyan/10'
              }`}>
                <span className={isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}>Phần thưởng hoàn thành:</span>
                <span className={`font-orbitron font-bold ${isUnicorn ? 'text-violet-700' : 'text-synth-magenta'}`}>
                  +{dailyMission.rewardXP} XP
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-synth-gray/10 rounded-lg border border-dashed border-synth-gray">
              <span className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>Vào ải hôm nay để nhận Nhiệm vụ ngày!</span>
            </div>
          )}
        </div>
      )}


      {/* Activity Logs Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
          <Clock className={`w-4 h-4 ${isUnicorn ? 'text-fuchsia-500' : ''}`} /> Dòng hoạt động
        </h3>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 max-h-[480px] overflow-y-auto space-y-2 pr-1 select-none"
        >
          {visibleLogs.length > 0 ? (
            <>
              <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-2 sticky top-0 z-10 backdrop-blur-sm py-1 ${
                isUnicorn ? 'bg-white/85 text-violet-600/80' : 'bg-synth-bg/90 text-synth-text-muted'
              }`}>
                <span>Hiển thị {visibleLogs.length}/{sectLogs.length}</span>
                {visibleLogs.length < sectLogs.length && <span>Kéo xuống để rút thêm</span>}
              </div>
              {visibleLogs.map(log => (
              <div 
                key={log.id} 
                className="bg-synth-gray/30 rounded-lg p-2.5 border border-white/5 flex gap-2.5 items-start text-xs hover:bg-synth-gray/40 transition-all duration-200"
              >
                <div className="mt-0.5 p-1 rounded bg-synth-gray/50 border border-white/5">
                  {getLogIcon(log.activityType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-white truncate">{log.title}</span>
                    <span className="text-[9px] text-synth-text-muted">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-synth-text-muted leading-snug">
                    {log.detail}
                  </p>
                  
                  {/* Reward indicator */}
                  {(log.coinsChanged !== 0 || log.xpChanged !== 0) && (
                    <div className="flex gap-2 mt-1.5 text-[9px] font-orbitron font-bold">
                      {log.coinsChanged > 0 && (
                        <span className="text-synth-orange">+{log.coinsChanged} NP</span>
                      )}
                      {log.coinsChanged < 0 && (
                        <span className="text-red-400">{log.coinsChanged} NP</span>
                      )}
                      {log.xpChanged > 0 && (
                        <span className="text-synth-cyan">+{log.xpChanged} XP</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              ))}
            </>
          ) : (
            <div className="text-center py-8 text-synth-text-muted text-xs">
              Hôm nay chưa có dấu vết nào.
            </div>
          )}
          {visibleLogs.length < sectLogs.length && (
            <div className="py-3 text-center text-[10px] text-synth-text-muted font-bold uppercase tracking-wider">
              Đang rút thêm...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
