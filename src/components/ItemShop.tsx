import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { Shield, Heart, Coins, Gift } from 'lucide-react';
import { toast } from '../utils/toast';

export const ItemShop: React.FC = () => {
  const player = useGameState(state => state.player);
  const rewards = useGameState(state => state.rewards);
  const buyStreakShield = useGameState(state => state.buyStreakShield);
  const buyHeart = useGameState(state => state.buyHeart);
  const claimParentReward = useGameState(state => state.claimParentReward);
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const handleBuyShield = () => {
    const success = buyStreakShield();
    if (!success) {
      toast.error('Thiếu NP hoặc bạn đã có Khiên rồi.');
    } else {
      toast.success('Mua Khiên thành công.');
    }
  };

  const handleBuyHeart = () => {
    const success = buyHeart();
    if (!success) {
      toast.error('Thiếu NP hoặc đã chạm trần 3 tim rồi.');
    } else {
      toast.success('Hồi tim thành công.');
    }
  };

  const handleClaimReward = (id: string) => {
    const success = claimParentReward(id);
    if (!success) {
      toast.error('Không đủ Coins (NP) để đổi quà này!');
    } else {
      toast.success('Yêu cầu đổi quà đã gửi. Chờ duyệt.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-orange/20 text-synth-orange border border-synth-orange/30 uppercase">Đợi Duyệt</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-cyan/20 text-synth-cyan border border-synth-cyan/30 uppercase animate-pulse">Ba đã duyệt</span>;
      case 'claimed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-green/20 text-synth-green border border-synth-green/30 uppercase">Đã nhận quà</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* HUD Banner */}
      <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center ${
        isUnicorn
          ? 'border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90'
          : 'border-synth-orange/30 bg-gradient-to-r from-synth-orange/10 via-synth-purple/10 to-transparent'
      }`}>
        <div className="space-y-1">
          <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            Cửa hàng đổi quà
          </h2>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            Dùng Nanite Points (NP) tích lũy được từ việc làm đúng để mua bổ trợ hoặc đổi quà thực tế từ Ba.
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-orbitron font-bold ${
          isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-orange/30'
        }`}>
          <Coins className={`w-5 h-5 animate-pulse ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-orange fill-synth-orange'}`} /> {player.coins} NP
        </div>
      </div>

      {/* Utility items grid */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
          <Shield className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-cyan'}`} /> Vật Phẩm Hỗ Trợ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Streak Shield Card */}
          <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center ${
            isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-fuchsia-50/70 to-cyan-50/70' : 'border-synth-cyan/20 bg-gradient-to-tr from-synth-cyan/5 to-transparent'
          }`}>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-xl bg-synth-gray/50 border border-synth-cyan/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-synth-cyan fill-synth-cyan/20 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-base text-white">Khiên giữ chuỗi</h4>
                <p className="text-xs text-synth-text-muted">
                  Giữ chuỗi không bị đứt và tránh bị phạt nếu lỡ mất một ngày.
                </p>
              </div>
            </div>

            <button
              onClick={handleBuyShield}
              className="px-4 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            >
              150 NP
            </button>
          </div>

          {/* Nano Heart Card */}
          <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center ${
            isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-fuchsia-50/70 to-cyan-50/70' : 'border-synth-magenta/20 bg-gradient-to-tr from-synth-magenta/5 to-transparent'
          }`}>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-xl bg-synth-gray/50 border border-synth-magenta/30 flex items-center justify-center">
                <Heart className="w-8 h-8 text-synth-magenta fill-synth-magenta/20 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-orbitron font-bold text-base text-white">Tim hồi phục</h4>
                <p className="text-xs text-synth-text-muted">
                  Hồi lại 1 tim đã mất trong Boss hoặc Sinh tồn.
                </p>
              </div>
            </div>

            <button
              onClick={handleBuyHeart}
              className="px-4 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(255,0,127,0.2)]"
            >
              100 NP
            </button>
          </div>
        </div>
      </div>

      {/* Parent rewards redeem ledger */}
      <div>
        <h3 className={`font-orbitron font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-white'}`}>
          <Gift className={`w-5 h-5 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-orange'}`} /> Quầy phần thưởng của Ba
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map(reward => {
            const isRedeemed = reward.status !== 'pending';
            const isAffordable = player.coins >= reward.costCoins;

            return (
              <div
                key={reward.id}
              className={`glass-panel rounded-2xl p-4 flex justify-between items-center transition-all duration-200 ${
                isUnicorn ? 'border-violet-200/25 bg-white/75 hover:bg-white/90' : 'border border-white/5 bg-synth-gray/20 hover:bg-synth-gray/30'
              }`}
            >
                <div className="flex gap-3 items-center min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-synth-blue/60 border border-white/5 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-synth-orange" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="font-semibold text-sm text-white truncate">{reward.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-synth-orange font-bold font-orbitron">
                        {reward.costCoins} NP
                      </span>
                      {reward.cashValueVND > 0 && (
                        <span className="text-[10px] text-synth-green font-bold font-orbitron border border-synth-green/30 px-1 rounded bg-synth-green/5">
                          {reward.cashValueVND.toLocaleString()}đ mặt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isRedeemed ? (
                    getStatusBadge(reward.status)
                  ) : (
                    <button
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={!isAffordable}
                      className="px-3.5 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-orange text-black hover:synth-glow-orange cursor-pointer transition-all duration-300 disabled:opacity-40"
                    >
                      Đổi Quà
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


