import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Target, Clock, Gift, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

export const ActivityLog: React.FC = () => {
  const dailyMission = useGameState(state => state.dailyMission);
  const logs = useGameState(state => state.logs);

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
    <div className="glass-panel rounded-2xl border border-synth-cyan/15 p-5 flex flex-col h-full overflow-hidden">
      {/* Daily Mission Section */}
      <div className="mb-6 border-b border-synth-gray pb-4">
        <h3 className="font-orbitron font-bold text-synth-orange text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" /> Daily Mission
        </h3>

        {dailyMission ? (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="text-xs font-bold text-white leading-tight">
                {dailyMission.title}
              </h4>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-orbitron font-semibold ${
                dailyMission.completed ? 'bg-synth-green/20 text-synth-green border border-synth-green/30' : 'bg-synth-orange/20 text-synth-orange border border-synth-orange/30'
              }`}>
                {dailyMission.completed ? 'COMPLETED' : 'IN PROGRESS'}
              </span>
            </div>

            {/* Requirements list */}
            <div className="space-y-2">
              {dailyMission.requirements.map((req, idx) => (
                <div key={idx} className="bg-synth-gray/20 rounded-lg p-2 border border-white/5 text-[11px]">
                  <div className="flex justify-between font-semibold text-white mb-1">
                    <span>{req.description}</span>
                    <span>{req.current}/{req.target}</span>
                  </div>
                  <div className="w-full h-1 bg-synth-gray rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        req.completed ? 'bg-synth-green' : 'bg-synth-orange'
                      }`}
                      style={{ width: `${Math.min(100, (req.current / req.target) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Rewards */}
            <div className="flex items-center justify-between bg-synth-blue/30 rounded-lg p-2 border border-synth-cyan/10 text-xs font-semibold">
              <span className="text-synth-text-muted">Phần thưởng hoàn thành:</span>
              <span className="text-synth-magenta font-orbitron font-bold">
                +{dailyMission.rewardVND.toLocaleString()}đ (Ví)
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-synth-gray/10 rounded-lg border border-dashed border-synth-gray">
            <span className="text-xs text-synth-text-muted">Làm bài luyện tập hôm nay để nhận Nhiệm Vụ Ngày!</span>
          </div>
        )}
      </div>

      {/* Activity Logs Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="font-orbitron font-bold text-synth-cyan text-sm uppercase tracking-wider flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4" /> Activity Feed
        </h3>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-none">
          {logs.length > 0 ? (
            logs.map(log => (
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
                  {(log.coinsChanged !== 0 || log.xpChanged !== 0 || log.walletChanged !== 0) && (
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
                      {log.walletChanged > 0 && (
                        <span className="text-synth-magenta">+{log.walletChanged.toLocaleString()}đ</span>
                      )}
                      {log.walletChanged < 0 && (
                        <span className="text-red-400">-{Math.abs(log.walletChanged).toLocaleString()}đ</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-synth-text-muted text-xs">
              Chưa có dữ liệu hoạt động hôm nay.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
