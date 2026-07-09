import React from 'react';
import { useGameState, THEME_UNLOCK_COST } from '../hooks/useGameState';
import { Shield, Coins, Gift, Palette } from 'lucide-react';
import { toast } from '../utils/toast';
import { UI_THEMES } from '../theme/uiThemes';
import { FogCard } from './FogCard';

export const ItemShop: React.FC = () => {
  const player = useGameState(state => state.player);
  const rewards = useGameState(state => state.rewards);
  const buyStreakShield = useGameState(state => state.buyStreakShield);
  const buyHeart = useGameState(state => state.buyHeart);
  const buyHint = useGameState(state => state.buyHint);
  const buyTheme = useGameState(state => state.buyTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);
  const claimParentReward = useGameState(state => state.claimParentReward);
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';
  const unlockedThemes = player.unlockedThemes || ['current'];

  const handleBuyTheme = (themeId: typeof UI_THEMES[number]['id']) => {
    const success = buyTheme(themeId);
    if (!success) {
      toast.error(`Thiếu Ngân lượng. Cần ${THEME_UNLOCK_COST} NP để mở khóa Phong Vị này.`);
    } else {
      toast.success('🎭 Mở khóa Phong Vị thành công! Vào Thân Phận để mặc thử ngay.');
    }
  };

  const handleBuyShield = () => {
    const success = buyStreakShield();
    if (!success) {
      toast.error('Thiếu Ngân lượng hoặc Hộ Tâm Phù đã sẵn sàng rồi.');
    } else {
      toast.success('✅ Lĩnh Hộ Tâm Phù thành công! Chuỗi tu luyện được bảo vệ.');
    }
  };

  const handleBuyHeart = () => {
    const success = buyHeart();
    if (!success) {
      toast.error('Thiếu Ngân lượng hoặc đã chạm trần 3 tim sinh lực rồi.');
    } else {
      toast.success('❤️ Hồi Nguyên Đan phát huy! Tim sinh lực đã hồi phục.');
    }
  };

  const handleBuyHint = () => {
    const success = buyHint();
    if (!success) {
      toast.error('Thiếu Ngân lượng để lĩnh Khai Ngộ Quyển!');
    } else {
      toast.success('📜 Khai Ngộ Quyển đã được ghi vào túi vật. Dùng trong bài làm để khai ngộ!');
    }
  };

  const handleClaimReward = (id: string) => {
    const success = claimParentReward(id);
    if (!success) {
      toast.error('Ngân lượng chưa đủ để đổi Phúc Lợi này!');
    } else {
      toast.success('🎁 Gửi yêu cầu Phúc Lợi Gia Môn thành công. Chờ Viện Chủ phê duyệt.');
    }
  };

  const hasStreakShield = player.badges?.includes('Streak Shield') || false;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-orange/20 text-synth-orange border border-synth-orange/30 uppercase">Chờ Duyệt</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-cyan/20 text-synth-cyan border border-synth-cyan/30 uppercase animate-pulse">Viện Chủ Đã Duyệt ✓</span>;
      case 'claimed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-green/20 text-synth-green border border-synth-green/30 uppercase">Đã Nhận Phúc Lợi</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* HUD Banner — Bách Hóa Phường */}
      <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center ${
        isUnicorn
          ? 'border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90'
          : 'border-synth-orange/30 bg-gradient-to-r from-synth-orange/10 via-synth-purple/10 to-transparent'
      }`}>
        <div className="space-y-1">
          <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            🏮 Bách Hóa Phường
          </h2>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            Vận hành nền kinh tế vi mô trong học viện. Tiêu hao Ngân lượng để đổi vật phẩm và đặc quyền.
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-orbitron font-bold ${
          isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-orange/30'
        }`}>
          <Coins className={`w-5 h-5 animate-pulse ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-orange fill-synth-orange'}`} /> {player.coins} NP
        </div>
      </div>

      {/* QUẦY 1: QUẦY LINH ĐAN & PHÁP BẢO (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-cyan-50/40 border-violet-200/40' : 'bg-synth-cyan/5 border-synth-cyan/10'}`}>
        <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
          <Shield className="w-4 h-4" /> 💊 Quầy Linh Đan & Pháp Bảo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 🛡️ Hộ Tâm Phù */}
          <div className="relative">
            <FogCard
              pageId="shop-item-shield"
              requiredCompletions={2}
              decayDays={7}
              onOpenLevel3={handleBuyShield}
            >
              <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${
                isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-cyan-50/70 to-fuchsia-50/70' : 'border-synth-cyan/20 bg-gradient-to-tr from-synth-cyan/5 to-transparent'
              }`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${
                    isUnicorn ? 'bg-cyan-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-cyan/30'
                  }`}>
                    🛡️
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>Hộ Tâm Phù</h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>
                      Bảo vệ chuỗi tu luyện khi lỡ bỏ một ngày, tránh bị áp Luật Phế Bỏ Võ Công.
                    </p>
                    {hasStreakShield && (
                      <span className="text-[9px] font-bold text-synth-cyan border border-synth-cyan/40 px-1.5 py-0.5 rounded font-orbitron inline-block">
                        Đang kích hoạt ✓
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBuyShield(); }}
                  disabled={hasStreakShield}
                  className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
                    isUnicorn
                      ? 'bg-gradient-to-r from-cyan-300 to-violet-300 text-violet-900 shadow-md hover:brightness-105'
                      : 'bg-synth-cyan text-black hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  }`}
                >
                  150 NP
                </button>
              </div>
            </FogCard>
          </div>

          {/* ❤️ Hồi Nguyên Đan */}
          <div className="relative">
            <FogCard
              pageId="shop-item-heart"
              requiredCompletions={2}
              decayDays={7}
              onOpenLevel3={handleBuyHeart}
            >
              <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${
                isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-rose-50/70 to-fuchsia-50/70' : 'border-synth-magenta/20 bg-gradient-to-tr from-synth-magenta/5 to-transparent'
              }`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${
                    isUnicorn ? 'bg-rose-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-magenta/30'
                  }`}>
                    ❤️
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>Hồi Nguyên Đan</h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>
                      Phục hồi 1 tim sinh lực đã mất trong chế độ Boss hoặc Sinh tồn.
                    </p>
                    <span className={`text-[9px] font-bold font-orbitron ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-magenta'}`}>
                      Tim hiện tại: {player.hearts}/3
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBuyHeart(); }}
                  disabled={player.hearts >= 3}
                  className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
                    isUnicorn
                      ? 'bg-gradient-to-r from-rose-300 to-fuchsia-300 text-violet-900 shadow-md hover:brightness-105'
                      : 'bg-synth-magenta text-black hover:shadow-[0_0_10px_rgba(255,0,127,0.4)]'
                  }`}
                >
                  100 NP
                </button>
              </div>
            </FogCard>
          </div>

          {/* 📜 Khai Ngộ Quyển */}
          <div className="relative md:col-span-2">
            <FogCard
              pageId="shop-item-hint"
              requiredCompletions={2}
              decayDays={7}
              onOpenLevel3={handleBuyHint}
            >
              <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${
                isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-amber-50/70 to-fuchsia-50/70' : 'border-synth-orange/20 bg-gradient-to-tr from-synth-orange/5 to-transparent'
              }`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${
                    isUnicorn ? 'bg-amber-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-orange/30'
                  }`}>
                    📜
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>Khai Ngộ Quyển</h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>
                      Gợi mở hướng giải hoặc loại bỏ một đáp án nhiễu trong câu hỏi đang làm.
                    </p>
                    <span className={`text-[9px] font-bold font-orbitron ${isUnicorn ? 'text-amber-600' : 'text-synth-orange'}`}>
                      Dùng ngay trong câu hỏi đang làm
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBuyHint(); }}
                  className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${
                    isUnicorn
                      ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-violet-900 shadow-md hover:brightness-105'
                      : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                  }`}
                >
                  50 NP
                </button>
              </div>
            </FogCard>
          </div>
        </div>
      </div>

      {/* QUẦY 2: TIỆM Y PHỤC (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-violet-50/40 border-violet-200/40' : 'bg-synth-purple/5 border-synth-purple/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
            <Palette className="w-4 h-4" /> 👘 Tiệm Y Phục (Phong Vị)
          </h3>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
            Mở khóa phong cách giao diện cá tính để cá nhân hóa không gian học tập của thiếu hiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UI_THEMES.map(theme => {
            const isUnlocked = theme.id === 'current' || unlockedThemes.includes(theme.id);
            const isActive = theme.id === uiTheme;
            return (
              <div key={theme.id} className="relative">
                <FogCard
                  pageId={`shop-theme-${theme.id}`}
                  requiredCompletions={1}
                  decayDays={10}
                  onOpenLevel3={() => isUnlocked ? setUiTheme(theme.id) : handleBuyTheme(theme.id)}
                >
                  <div
                    className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${
                      isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-violet-50/70 to-fuchsia-50/70' : 'border-synth-purple/20 bg-gradient-to-tr from-synth-purple/5 to-transparent'
                    }`}
                  >
                    <div className="flex gap-4 items-center min-w-0">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${
                        isUnicorn ? 'bg-violet-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-purple/30'
                      }`}>
                        {theme.iconSet[0]}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className={`font-orbitron font-bold text-sm truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{theme.name}</h4>
                        <p className={`text-xs line-clamp-2 ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>
                          {theme.tagline}
                        </p>
                        {isActive && (
                          <span className="text-[9px] font-bold text-synth-green border border-synth-green/40 px-1.5 py-0.5 rounded font-orbitron inline-block">
                            Đang dùng ✓
                          </span>
                        )}
                      </div>
                    </div>
                    {isActive ? null : isUnlocked ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setUiTheme(theme.id); }}
                        className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${
                          isUnicorn
                            ? 'bg-gradient-to-r from-violet-300 to-fuchsia-300 text-violet-900 shadow-md hover:brightness-105'
                            : 'bg-synth-purple text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                        }`}
                      >
                        Mặc Ngay
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBuyTheme(theme.id); }}
                        className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${
                          isUnicorn
                            ? 'bg-gradient-to-r from-cyan-300 to-violet-300 text-violet-900 shadow-md hover:brightness-105'
                            : 'bg-synth-cyan text-black hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        }`}
                      >
                        🔒 {THEME_UNLOCK_COST} NP
                      </button>
                    )}
                  </div>
                </FogCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUẦY 3: QUẦY PHÚC LỢI GIA MÔN (Level 2 Section) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-fuchsia-50/40 border-pink-200/40' : 'bg-synth-orange/5 border-synth-orange/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-orange'}`}>
            <Gift className="w-4 h-4" /> 🎁 Quầy Phúc Lợi Gia Môn
          </h3>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
            Đổi Ngân lượng lấy các phần thưởng thực tế do Viện Chủ thiết lập và phê duyệt.
          </p>
        </div>

        {rewards.length === 0 ? (
          <div className={`rounded-2xl border border-dashed p-8 text-center ${
            isUnicorn ? 'border-violet-200/40 text-violet-600/60' : 'border-white/10 text-synth-text-muted'
          }`}>
            <Gift className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">Chưa có Phúc Lợi nào được Viện Chủ thiết lập.</p>
            <p className="text-xs mt-1 opacity-70">Viện Chủ vào Ngân Các → Phần thưởng để thêm mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map(reward => {
              const isRedeemed = reward.status !== 'pending';
              const isAffordable = player.coins >= reward.costCoins;

              return (
                <div key={reward.id} className="relative">
                  <FogCard
                    pageId={`shop-reward-${reward.id}`}
                    requiredCompletions={1}
                    decayDays={5}
                    onOpenLevel3={() => !isRedeemed && isAffordable && handleClaimReward(reward.id)}
                  >
                    <div
                      className={`glass-panel rounded-2xl p-4 flex justify-between items-center transition-all duration-200 h-full ${
                        isUnicorn ? 'border-violet-200/25 bg-white/75 hover:bg-white/90' : 'border border-white/5 bg-synth-gray/20 hover:bg-synth-gray/30'
                      }`}
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-synth-blue/60 border border-white/5 flex items-center justify-center shrink-0 text-xl">
                          🎁
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <h4 className={`font-semibold text-sm truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{reward.title}</h4>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-bold font-orbitron ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-orange'}`}>
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

                      <div className="flex items-center gap-2 ml-2 shrink-0">
                        {isRedeemed ? (
                          getStatusBadge(reward.status)
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleClaimReward(reward.id); }}
                            disabled={!isAffordable}
                            className={`px-3.5 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                              isUnicorn
                                ? 'bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-900 hover:brightness-105'
                                : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]'
                            }`}
                          >
                            Đổi Phúc Lợi
                          </button>
                        )}
                      </div>
                    </div>
                  </FogCard>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
