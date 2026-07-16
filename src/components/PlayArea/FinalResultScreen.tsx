import React from 'react';
import { Trophy, XCircle, Clock, Target, Coins, Zap, RotateCcw, Map, CheckCircle2, AlertTriangle, TimerOff } from 'lucide-react';
import type { ActivityResult } from '../../types/activityResult';
import { useGameState } from '../../hooks/useGameState';
import { isLightTheme } from '../../theme/uiThemes';
import { getSubjectModule } from '../../subject-modules/registry';

export interface FinalResultScreenProps {
  result: ActivityResult;
  mode: string;
  onFinish: () => void;
  onRetry?: () => void;
}

const MIN_ACCURACY: Record<string, number> = {
  lesson: 70,
  boss: 100,    // boss = no defeat at all
  survival: 100,
  default: 60,
};

function getModeLabel(subjectId: string, mode: string): string {
  if (mode === 'lesson') return 'Phụ bản bài học';
  if (mode === 'mixed') return 'Phụ bản hỗn hợp';
  if (mode === 'revenge') return 'Phụ bản trả bài';
  if (mode === 'boss') return 'Trường Thi Boss';
  if (mode === 'survival') return 'Trường Thi sinh tồn';

  const module = getSubjectModule(subjectId as any);
  const activity = module?.activities?.find(a => a.modeKey === mode || a.id === mode || a.legacyMode === mode);
  return activity?.label || activity?.title || mode;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}p ${s}s` : `${s}s`;
}

export const FinalResultScreen: React.FC<FinalResultScreenProps> = ({
  result,
  mode,
  onFinish,
  onRetry,
}) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  const { passed, status, score, total, accuracyRatio, timeSpentSeconds, rewardsEarned, isDefeat } = result;
  const accuracyPct = Math.round(accuracyRatio * 100);

  const isBossSurvival = mode === 'boss' || mode === 'survival';
  const minAcc = MIN_ACCURACY[mode] ?? MIN_ACCURACY.default;

  // ── Status banner config ─────────────────────────────────────────────
  let statusIcon = passed ? <Trophy className="w-20 h-20" /> : <XCircle className="w-20 h-20" />;
  let statusColor = passed ? 'text-emerald-400' : 'text-red-400';
  let statusBg = passed
    ? 'from-emerald-950/60 to-emerald-900/30 border-emerald-500/40'
    : 'from-red-950/60 to-red-900/30 border-red-500/40';
  let statusTitle: string;
  let statusSubtitle: string;

  if (status === 'timeout') {
    statusIcon = <TimerOff className="w-20 h-20 text-orange-400" />;
    statusColor = 'text-orange-400';
    statusBg = 'from-orange-950/60 to-orange-900/30 border-orange-500/40';
    statusTitle = 'HẾT THỜI GIAN ⏰';
    statusSubtitle = 'Đồng hồ đã điểm. Trận lần này không tính vào tiến độ. Lần sau canh đủ 20 phút nhé.';
  } else if (status === 'failed' && isDefeat) {
    statusTitle = 'TẨU HỎA NHẬP MA 💀';
    statusSubtitle = 'Sai đủ 3 câu trong trận. Phần thưởng giảm 50%. Lần sau ra tay chắc hơn.';
  } else if (passed) {
    statusTitle = mode === 'lesson' ? 'ẢI HOÀN THÀNH 🏆' : 'CHINH PHỤC THÀNH CÔNG 🎖️';
    statusSubtitle = mode === 'lesson'
      ? 'Hoàn thành ải bài học. Tiến độ đã được ghi nhận.'
      : isBossSurvival
        ? 'Đánh bại toàn bộ thử thách. Tiến độ đã được ghi nhận.'
        : 'Vượt qua ngưỡng yêu cầu. Tiến độ đã được ghi nhận.';
  } else {
    statusTitle = 'CHƯA ĐẠT YÊU CẦU ❌';
    statusSubtitle = `Cần độ chính xác tối thiểu ${minAcc}% để hoàn thành ải này. Lần này không tính vào tiến độ.`;
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-fade-in p-4">

      {/* Status Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${statusBg} p-8 text-center space-y-3`}>
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className={`mx-auto w-fit ${statusColor}`}>{statusIcon}</div>
        <h2 className={`font-orbitron font-black text-2xl uppercase tracking-wider ${statusColor}`}>
          {statusTitle}
        </h2>
        <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">{statusSubtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className={`rounded-2xl border p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 ${
        isUnicorn ? 'bg-white border-violet-100' : 'bg-black/40 border-white/5'
      }`}>
        {/* Score */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Điểm số</span>
          </div>
          <p className="font-orbitron font-black text-2xl text-white">{score}<span className="text-sm text-slate-400">/{total}</span></p>
        </div>

        {/* Accuracy */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Chính xác</span>
          </div>
          <p className={`font-orbitron font-black text-2xl ${accuracyPct >= (minAcc) ? 'text-emerald-400' : 'text-red-400'}`}>
            {accuracyPct}<span className="text-sm">%</span>
          </p>
          <p className="text-[9px] text-slate-500">Yêu cầu: {isBossSurvival ? 'không sai 3 lần' : `≥${minAcc}%`}</p>
        </div>

        {/* Time */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Thời gian</span>
          </div>
          <p className="font-orbitron font-black text-2xl text-white">{formatTime(timeSpentSeconds)}</p>
        </div>

        {/* Mode */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-synth-cyan">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest">Ải</span>
          </div>
          <p className="font-orbitron font-bold text-xs text-white leading-tight">
            {(() => {
              const currentSubject = useGameState.getState().currentSubject;
              return getModeLabel(currentSubject, mode);
            })()}
          </p>
        </div>
      </div>

      {/* Rewards Panel */}
      <div className={`rounded-2xl border p-5 space-y-3 ${
        isUnicorn ? 'bg-white border-violet-100' : 'bg-black/40 border-white/5'
      }`}>
        <p className="font-orbitron font-bold text-[10px] uppercase tracking-widest text-synth-text-muted">
          Chiến Lợi Phẩm
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${
            isUnicorn ? 'bg-amber-50 border-amber-100' : 'bg-amber-500/5 border-amber-500/10'
          }`}>
            <Coins className="w-6 h-6 text-synth-orange shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-orbitron uppercase">Ruby</p>
              <p className="font-orbitron font-black text-xl text-synth-orange">
                {rewardsEarned.ruby > 0 ? `+${rewardsEarned.ruby}` : '0'}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${
            isUnicorn ? 'bg-cyan-50 border-cyan-100' : 'bg-synth-cyan/5 border-synth-cyan/10'
          }`}>
            <Zap className="w-6 h-6 text-synth-cyan shrink-0" />
            <div>
              <p className="text-[9px] text-slate-400 font-orbitron uppercase">Kinh Nghiệm XP</p>
              <p className="font-orbitron font-black text-xl text-synth-cyan">
                {rewardsEarned.xp > 0 ? `+${rewardsEarned.xp}` : '0'}
              </p>
            </div>
          </div>
        </div>
        {isDefeat && (
          <div className="flex items-center gap-2 text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            Đã áp dụng hình phạt Tẩu Hỏa Nhập Ma: phần thưởng giảm 50%.
          </div>
        )}
      </div>

      {/* Progression Status */}
      <div className={`rounded-2xl border px-5 py-4 flex items-start gap-3 ${
        passed
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : 'bg-red-500/5 border-red-500/20'
      }`}>
        {passed
          ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          : <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        }
        <div>
          <p className={`font-orbitron font-bold text-xs uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {passed ? 'Lần này tính vào tiến độ ✅' : 'Lần này không tính vào tiến độ ❌'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            {passed
              ? mode === 'lesson'
                ? 'Bài học đã được ghi nhận. Tiến độ học tập đã được cập nhật.'
                : 'Kết quả đã được ghi nhận. Tiến độ học tập khu vực đã được cập nhật.'
              : status === 'timeout'
                ? 'Hết thời gian — lần này không tính. Hãy hoàn thành trong 20 phút ở lần tiếp theo.'
                : `Cần đạt tối thiểu ${isBossSurvival ? 'không mắc đủ 3 lỗi' : `${minAcc}% độ chính xác`} để tính vào tiến độ.`
            }
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        {!passed && onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-red-700 to-red-500 text-white cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <RotateCcw className="w-4 h-4" /> Thử Lại
          </button>
        )}
        <button
          onClick={onFinish}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <Map className="w-4 h-4" />
          {mode === 'lesson' ? 'Hoàn Thành Học Bài 🎓' : 'Trở Lại Bản Đồ 🗺️'}
        </button>
      </div>
    </div>
  );
};
