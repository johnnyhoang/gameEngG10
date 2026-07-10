import React from 'react';
import { Award } from 'lucide-react';
import type { RunFinishedScreenProps } from './types';

export const RunFinishedScreen: React.FC<RunFinishedScreenProps> = ({
  mode,
  rewardsEarned,
  runMistakes,
  onEscape
}) => {
  // Luật "Tẩu Hỏa Nhập Ma": sai đủ 3 câu trong lượt Sinh Tồn hoặc Boss đều tính là thất bại.
  const isDefeat = runMistakes >= 3 && (mode === 'boss' || mode === 'survival');
  const displayedCoins = isDefeat ? Math.floor(rewardsEarned.coins / 2) : rewardsEarned.coins;
  const displayedXp = isDefeat ? Math.floor(rewardsEarned.xp / 2) : rewardsEarned.xp;

  return (
    <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-8 max-w-xl mx-auto text-center space-y-6">
      <Award className="w-16 h-16 mx-auto text-synth-orange animate-bounce" />

      <h2 className="font-orbitron font-black text-2xl text-white uppercase tracking-wider">
        {isDefeat ? `TẨU HỎA NHẬP MA - ${mode === 'boss' ? 'BOSS' : 'SINH TỒN'} THẤT BẠI` : 'CHINH PHỤC THÀNH CÔNG'}
      </h2>

      <p className="text-xs text-synth-text-muted">
        {isDefeat
          ? 'Sai đủ 3 câu rồi. Chỉ giữ được 50% chiến lợi phẩm thu được trong trận. Lần sau ra tay chắc hơn.'
          : mode === 'lesson'
            ? 'Củng cố xong. Muốn kiểm tra lại thì quay về bản đồ.'
            : mode === 'vocabulary'
              ? 'Khá đấy. Vocabulary Castle đã gục. Lượt sau từ vựng và word form sẽ được ưu tiên hơn.'
              : mode === 'pronunciation'
                ? 'Khá lắm. Pronunciation Peak đã qua. Giữ nhịp phát âm và trọng âm cho chắc tay.'
                : `Qua ải ${mode.toUpperCase()}. Nhận chiến lợi phẩm rồi tính tiếp.`}
      </p>

      {/* Reward card */}
      <div className="bg-synth-gray/40 rounded-xl p-5 border border-synth-cyan/20 grid grid-cols-2 gap-4">
        <div className="text-center font-orbitron">
          <span className="text-[10px] text-synth-text-muted uppercase">Nanite Vàng</span>
          <p className="text-2xl font-black text-synth-orange">+{displayedCoins} NP</p>
        </div>
        <div className="text-center font-orbitron">
          <span className="text-[10px] text-synth-text-muted uppercase">Điểm Kinh Nghiệm</span>
          <p className="text-2xl font-black text-synth-cyan">+{displayedXp} XP</p>
        </div>
      </div>

      {/* Payout note */}
      {mode === 'boss' && !isDefeat && (
        <div className="bg-synth-magenta/10 border border-synth-magenta/30 rounded-lg p-3 text-xs text-synth-magenta">
          🔥 Đánh bại Boss: +150 XP và bonus hoàn thành Ngân Lượng đã tự động cộng thêm!
        </div>
      )}

      <button
        onClick={onEscape}
        className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-synth-purple to-synth-cyan text-black hover:synth-border-cyan cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      >
        {mode === 'lesson' ? 'Hoàn Thành Học Bài 🎓' : 'Trở Lại Bản Đồ 🗺️'}
      </button>
    </div>
  );
};
