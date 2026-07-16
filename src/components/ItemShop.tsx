import React, { useEffect, useState } from 'react';
import { useGameState, THEME_UNLOCK_COST } from '../hooks/useGameState';
import { Shield, Coins, Gift, Palette, RotateCcw } from 'lucide-react';
import { toast } from '../utils/toast';
import { UI_THEMES, isLightTheme } from '../theme/uiThemes';
import { FogCard } from './FogCard';
import { RubyConfirmModal } from './Common/RubyConfirmModal';

interface ItemShopProps {
  onSpinWheel?: () => void;
}

export const ItemShop: React.FC<ItemShopProps> = ({ onSpinWheel }) => {
  const player = useGameState(state => state.player);
  const rewards = useGameState(state => state.rewards);
  const rewardRedemptions = useGameState(state => state.rewardRedemptions);
  const buyStreakShield = useGameState(state => state.buyStreakShield);
  const buyHint = useGameState(state => state.buyHint);
  const buyTheme = useGameState(state => state.buyTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);
  const redeemReward = useGameState(state => state.redeemReward);
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);
  const unlockedThemes = player.unlockedThemes || ['current'];

  // Class Rewards (mới)
  const classRewards = useGameState(state => state.classRewards);
  const classRewardRedemptions = useGameState(state => state.classRewardRedemptions);
  const isOrphanStudent = useGameState(state => state.isOrphanStudent);
  const fetchClassRewards = useGameState(state => state.fetchClassRewards);
  const redeemClassReward = useGameState(state => state.redeemClassReward);
  const cancelClassRedemption = useGameState(state => state.cancelClassRedemption);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    cost: number;
    actionDescription: string;
    onConfirm: () => void;
    isLoading?: boolean;
  }>({
    isOpen: false,
    cost: 0,
    actionDescription: '',
    onConfirm: () => {},
    isLoading: false,
  });

  const [classRewardsLoading, setClassRewardsLoading] = useState(true);
  const [cancellingIds, setCancellingIds] = useState<Record<string, boolean>>({});

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const daysUntilWeekend = () => {
    const day = new Date().getDay();
    if (day === 0 || day === 6) return 0;
    return day <= 5 ? 6 - day : 1;
  };

  useEffect(() => {
    setClassRewardsLoading(true);
    fetchClassRewards().finally(() => {
      setClassRewardsLoading(false);
    });
  }, []);

  const handleBuyTheme = (themeId: typeof UI_THEMES[number]['id']) => {
    if (player.ruby < THEME_UNLOCK_COST) {
      toast.error(`Thiếu Ruby. Cần ${THEME_UNLOCK_COST} Ruby để mở khóa Giao diện này.`);
      return;
    }
    const themeConfig = UI_THEMES.find(t => t.id === themeId);
    setConfirmModal({
      isOpen: true,
      cost: THEME_UNLOCK_COST,
      actionDescription: `mở khóa Giao diện "${themeConfig?.name || themeId}"`,
      onConfirm: () => {
        const success = buyTheme(themeId);
        if (success) {
          toast.success('🎭 Mở khóa giao diện thành công! Vào Hồ Sơ Cá Nhân để áp dụng ngay.');
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBuyShield = () => {
    if (hasStreakShield) {
      toast.error('Thẻ Chuyên Cần đã sẵn sàng rồi.');
      return;
    }
    if (player.ruby < 150) {
      toast.error('Thiếu Ruby. Cần 150 Ruby để mua Thẻ Chuyên Cần.');
      return;
    }
    setConfirmModal({
      isOpen: true,
      cost: 150,
      actionDescription: 'mua Thẻ Chuyên Cần để bảo toàn Chuỗi Học Tập',
      onConfirm: () => {
        const success = buyStreakShield();
        if (success) {
          toast.success('✅ Mua Thẻ Chuyên Cần thành công! Chuỗi học tập được bảo vệ.');
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleBuyHint = () => {
    if (player.ruby < 50) {
      toast.error('Thiếu Ruby để mua Thẻ Gợi Ý!');
      return;
    }
    setConfirmModal({
      isOpen: true,
      cost: 50,
      actionDescription: 'mua Thẻ Gợi Ý trợ giúp trong bài làm',
      onConfirm: () => {
        const success = buyHint();
        if (success) {
          toast.success('📜 Thẻ Gợi Ý đã được ghi vào tủ đồ. Dùng trong bài làm để xem hướng dẫn!');
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRedeem = (id: string, title: string) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    if (player.ruby < reward.costRuby) {
      toast.error('Ruby chưa đủ để đổi phần thưởng này!');
      return;
    }
    setConfirmModal({
      isOpen: true,
      cost: reward.costRuby,
      actionDescription: `đổi phần thưởng "${title}"`,
      onConfirm: () => {
        const success = redeemReward(id);
        if (success) {
          toast.success(`🎁 Đã đổi "${title}"! Chờ Chủ Nhiệm Chính trao quà ngoài đời nhé.`);
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRedeemClass = async (rewardId: string, title: string) => {
    const reward = classRewards.find(r => r.id === rewardId);
    if (!reward || reward.remaining <= 0) {
      toast.error('Phúc lợi này đã hết số lượng!');
      return;
    }
    if (player.ruby < reward.costRuby) {
      toast.error('Ruby chưa đủ để đổi phúc lợi này!');
      return;
    }
    setConfirmModal({
      isOpen: true,
      cost: reward.costRuby,
      actionDescription: `đổi phần thưởng lớp học "${title}"`,
      isLoading: false,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isLoading: true }));
        try {
          const ok = await redeemClassReward(rewardId);
          if (ok) {
            toast.success(`🎁 Đã gửi yêu cầu đổi "${title}"! Chờ giáo viên phát thưởng nhé.`);
          }
        } catch (err) {
          console.error(err);
          toast.error('Gửi yêu cầu đổi phúc lợi thất bại.');
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false, isLoading: false }));
        }
      }
    });
  };

  const handleCancelClassRedemption = async (redemptionId: string) => {
    if (cancellingIds[redemptionId]) return;
    setCancellingIds(prev => ({ ...prev, [redemptionId]: true }));
    try {
      await cancelClassRedemption(redemptionId);
      toast.success('Đã rút lại yêu cầu đổi quà.');
    } catch (err) {
      console.error(err);
      toast.error('Không thể rút lại yêu cầu.');
    } finally {
      setCancellingIds(prev => ({ ...prev, [redemptionId]: false }));
    }
  };

  const hasStreakShield = player.badges?.includes('Streak Shield') || false;

  const getRedemptionStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-orange/20 text-synth-orange border border-synth-orange/30 uppercase animate-pulse">Chờ Giáo Viên Trao</span>;
      case 'delivered':
        return <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-semibold bg-synth-green/20 text-synth-green border border-synth-green/30 uppercase">Đã Trao ✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* HUD Banner */}
      <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center ${
        isUnicorn
          ? 'border-violet-200/35 bg-gradient-to-r from-fuchsia-50/90 via-white/90 to-cyan-50/90'
          : 'border-synth-orange/30 bg-gradient-to-r from-synth-orange/10 via-synth-purple/10 to-transparent'
      }`}>
        <div className="space-y-1">
          <h2 className={`font-orbitron text-lg font-black uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            🛒 Cửa Hàng Quà Tặng
          </h2>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            Tiêu hao Ruby tích lũy để đổi các vật phẩm học tập và đặc quyền giao diện.
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-orbitron font-bold ${
          isUnicorn ? 'bg-white/80 border border-violet-200/40 text-violet-700' : 'bg-synth-blue border border-synth-orange/30'
        }`}>
          <Coins className={`w-5 h-5 animate-pulse ${isUnicorn ? 'text-fuchsia-500 fill-fuchsia-500' : 'text-synth-orange fill-synth-orange'}`} /> {player.ruby} Ruby
        </div>
      </div>

      {/* QUẦY 1: CÔNG CỤ TRỢ GIÚP */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-cyan-50/40 border-violet-200/40' : 'bg-synth-cyan/5 border-synth-cyan/10'}`}>
        <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
          <Shield className="w-4 h-4" /> 💊 Quầy Vật Phẩm Trợ Giúp
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FogCard pageId="shop-item-shield" requiredCompletions={2} decayDays={7}
              forceOpenNormal={player.ruby >= 150}
              label="Chưa đủ Ruby"
              onOpenLevel3={handleBuyShield}>
              <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-cyan-50/70 to-fuchsia-50/70' : 'border-synth-cyan/20 bg-gradient-to-tr from-synth-cyan/5 to-transparent'}`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${isUnicorn ? 'bg-cyan-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-cyan/30'}`}>🛡️</div>
                  <div className="space-y-1">
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>Thẻ Chuyên Cần</h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>Bảo vệ chuỗi học tập khi lỡ bỏ một ngày đèn sách, tránh bị phạt ngắt chuỗi.</p>
                    {hasStreakShield && <span className="text-[9px] font-bold text-synth-cyan border border-synth-cyan/40 px-1.5 py-0.5 rounded font-orbitron inline-block">Đang kích hoạt ✓</span>}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleBuyShield(); }} disabled={hasStreakShield}
                  className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${isUnicorn ? 'bg-gradient-to-r from-cyan-300 to-violet-300 text-violet-900 shadow-md hover:brightness-105' : 'bg-synth-cyan text-black hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]'}`}>150 Ruby</button>
              </div>
            </FogCard>
          </div>
          <div className="relative md:col-span-2">
            <FogCard pageId="shop-item-hint" requiredCompletions={2} decayDays={7}
              forceOpenNormal={player.ruby >= 50}
              label="Chưa đủ Ruby"
              onOpenLevel3={handleBuyHint}>
              <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-amber-50/70 to-fuchsia-50/70' : 'border-synth-orange/20 bg-gradient-to-tr from-synth-orange/5 to-transparent'}`}>
                <div className="flex gap-4 items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${isUnicorn ? 'bg-amber-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-orange/30'}`}>📜</div>
                  <div className="space-y-1">
                    <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>Thẻ Gợi Ý</h4>
                    <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>Gợi mở hướng giải hoặc loại bỏ một đáp án nhiễu trong câu hỏi đang làm.</p>
                    <span className={`text-[9px] font-bold font-orbitron ${isUnicorn ? 'text-amber-600' : 'text-synth-orange'}`}>Dùng ngay trong câu hỏi đang làm</span>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleBuyHint(); }}
                  className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${isUnicorn ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-violet-900 shadow-md hover:brightness-105' : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.4)]'}`}>50 Ruby</button>
              </div>
            </FogCard>
          </div>
        </div>
      </div>

      {/* QUẦY: VÒNG QUAY MAY MẮN */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-amber-50/40 border-violet-200/40' : 'bg-synth-orange/5 border-synth-orange/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
            🎡 Vòng Quay May Mắn (Cuối Tuần)
          </h3>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
            Quay để nhận phần quà ngẫu nhiên từ học viện vào mỗi dịp cuối tuần!
          </p>
        </div>
        
        <div className={`glass-panel rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 ${isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-amber-50/70 to-fuchsia-50/70' : 'border-synth-orange/20 bg-gradient-to-tr from-synth-orange/5 to-transparent'}`}>
          <div className="flex gap-4 items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl border shrink-0 ${isWeekend() ? 'animate-spin-slow' : 'opacity-40 grayscale'} ${isUnicorn ? 'bg-amber-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-orange/30'}`}>
              🎡
            </div>
            <div className="space-y-1">
              <h4 className={`font-orbitron font-bold text-sm ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                {isWeekend() ? 'Vòng Quay Đang Mở!' : 'Vòng Quay Đang Khóa'}
              </h4>
              <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>
                {isWeekend() ? 'Hãy thử vận may để nhận Ruby, năng lượng hoặc các phần thưởng bất ngờ!' : `Vòng quay sẽ mở vào Thứ Bảy & Chủ Nhật. Còn lại ${daysUntilWeekend()} ngày.`}
              </p>
            </div>
          </div>
          
          {isWeekend() ? (
            <button
              onClick={onSpinWheel}
              className={`px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${isUnicorn ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-violet-900 shadow-md hover:brightness-105' : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.4)]'}`}
            >
              Quay Ngay 🎁
            </button>
          ) : (
            <button
              disabled
              className="px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider shrink-0 bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed"
            >
              Đóng (Chờ Cuối Tuần)
            </button>
          )}
        </div>
      </div>

      {/* QUẦY 2: KHO GIAO DIỆN */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-violet-50/40 border-violet-200/40' : 'bg-synth-purple/5 border-synth-purple/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
            <Palette className="w-4 h-4" /> 👘 Kho Giao Diện (Phong Cách Học Đường)
          </h3>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>Mở khóa phong cách giao diện cá tính để cá nhân hóa không gian học tập của bạn.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UI_THEMES.map(theme => {
            const isUnlocked = theme.id === 'current' || unlockedThemes.includes(theme.id);
            const isActive = theme.id === uiTheme;
            return (
              <div key={theme.id} className="relative">
                <FogCard pageId={`shop-theme-${theme.id}`} requiredCompletions={1} decayDays={10}
                  forceOpenNormal={isUnlocked || player.ruby >= THEME_UNLOCK_COST}
                  label="Chưa đủ Ruby"
                  onOpenLevel3={() => isUnlocked ? setUiTheme(theme.id) : handleBuyTheme(theme.id)}>
                  <div className={`glass-panel rounded-2xl p-5 flex justify-between items-center h-full ${isUnicorn ? 'border-violet-200/35 bg-gradient-to-tr from-white/85 via-violet-50/70 to-fuchsia-50/70' : 'border-synth-purple/20 bg-gradient-to-tr from-synth-purple/5 to-transparent'}`}>
                    <div className="flex gap-4 items-center min-w-0">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0 ${isUnicorn ? 'bg-violet-50 border-violet-200/30' : 'bg-synth-gray/50 border-synth-purple/30'}`}>{theme.iconSet[0]}</div>
                      <div className="space-y-1 min-w-0">
                        <h4 className={`font-orbitron font-bold text-sm truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{theme.name}</h4>
                        <p className={`text-xs line-clamp-2 ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'} leading-normal`}>{theme.tagline}</p>
                        {isActive && <span className="text-[9px] font-bold text-synth-green border border-synth-green/40 px-1.5 py-0.5 rounded font-orbitron inline-block">Đang dùng ✓</span>}
                      </div>
                    </div>
                    {isActive ? null : isUnlocked ? (
                      <button onClick={(e) => { e.stopPropagation(); setUiTheme(theme.id); }}
                        className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${isUnicorn ? 'bg-gradient-to-r from-violet-300 to-fuchsia-300 text-violet-900 shadow-md hover:brightness-105' : 'bg-synth-purple text-white hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]'}`}>Mặc Ngay</button>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); handleBuyTheme(theme.id); }}
                        className={`ml-3 px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shrink-0 ${isUnicorn ? 'bg-gradient-to-r from-cyan-300 to-violet-300 text-violet-900 shadow-md hover:brightness-105' : 'bg-synth-cyan text-black hover:shadow-[0_0_10px_rgba(0,240,255,0.4)]'}`}>🔒 {THEME_UNLOCK_COST} Ruby</button>
                    )}
                  </div>
                </FogCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUẦY 3: PHÚC LỢI */}
      <div className={`rounded-2xl border p-5 space-y-4 ${isUnicorn ? 'bg-fuchsia-50/40 border-pink-200/40' : 'bg-synth-orange/5 border-synth-orange/10'}`}>
        <div className="space-y-0.5">
          <h3 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${isUnicorn ? 'text-violet-700' : 'text-synth-orange'}`}>
            <Gift className="w-4 h-4" />
            {isOrphanStudent ? '🎁 Quầy Quà Khuyến Học Toàn Viện' : '🎁 Quầy Quà Khuyến Học'}
          </h3>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
            {isOrphanStudent
              ? 'Đổi Ruby lấy Quà Khuyến Học do Viện Trưởng thiết lập và phê duyệt.'
              : 'Đổi điểm tích lũy lấy phần thưởng do giáo viên lớp bạn tạo. Số lượng có hạn — đổi sớm!'}
          </p>
        </div>

        {isOrphanStudent ? (
          /* Học sinh orphan → school rewards cũ */
          rewards.length === 0 ? (
            <div className={`rounded-2xl border border-dashed p-8 text-center ${isUnicorn ? 'border-violet-200/40 text-violet-600/60' : 'border-white/10 text-synth-text-muted'}`}>
              <Gift className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">Chưa có Quà Khuyến Học nào được Viện Trưởng thiết lập.</p>
              <p className="text-xs mt-1 opacity-70">Viện Trưởng vào Phòng Tài Vụ → Phần thưởng để thêm mới.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map(reward => {
                const isAffordable = player.ruby >= reward.costRuby;
                const canRedeem = isAffordable;
                return (
                  <div key={reward.id} className="relative">
                    <FogCard pageId={`shop-reward-${reward.id}`} requiredCompletions={1} decayDays={5}
                      forceOpenNormal={isAffordable}
                      label="Chưa đủ Ruby"
                      onOpenLevel3={() => canRedeem && handleRedeem(reward.id, reward.title)}>
                      <div className={`glass-panel rounded-2xl p-4 flex justify-between items-center transition-all duration-200 h-full ${isUnicorn ? 'border-violet-200/25 bg-white/75 hover:bg-white/90' : 'border border-white/5 bg-synth-gray/20 hover:bg-synth-gray/30'}`}>
                        <div className="flex gap-3 items-center min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-synth-blue/60 border border-white/5 flex items-center justify-center shrink-0 text-xl">🎁</div>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className={`font-semibold text-sm truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{reward.title}</h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold font-orbitron ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-orange'}`}>{reward.costRuby} Ruby</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); handleRedeem(reward.id, reward.title); }} disabled={!canRedeem}
                            className={`px-3.5 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${isUnicorn ? 'bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-900 hover:brightness-105' : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`}>
                            Đổi Quà
                          </button>
                        </div>
                      </div>
                    </FogCard>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Học sinh có lớp → class rewards mới */
          classRewardsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-synth-cyan">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan mb-2"></div>
              <span className="text-xs font-orbitron font-bold tracking-widest uppercase animate-pulse">Đang tải phần thưởng lớp...</span>
            </div>
          ) : classRewards.length === 0 ? (
            <div className={`rounded-2xl border border-dashed p-8 text-center ${isUnicorn ? 'border-violet-200/40 text-violet-600/60' : 'border-white/10 text-synth-text-muted'}`}>
              <Gift className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">Chưa có Quà Khuyến Học nào từ giáo viên của bạn.</p>
              <p className="text-xs mt-1 opacity-70">Giáo viên vào Phòng Tài Vụ để tạo phần thưởng cho lớp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classRewards.map(reward => {
                const isOutOfStock = reward.remaining <= 0;
                const isAffordable = player.ruby >= reward.costRuby;
                const canRedeem = !isOutOfStock && isAffordable;
                const myPendingForThisReward = classRewardRedemptions.filter(r => r.classRewardId === reward.id && r.status === 'pending');
                const alreadyPending = myPendingForThisReward.length > 0;
                return (
                  <div key={reward.id} className="relative">
                    <FogCard pageId={`shop-class-reward-${reward.id}`} requiredCompletions={1} decayDays={5}
                      forceOpenNormal={isAffordable}
                      label="Chưa đủ Ruby"
                      onOpenLevel3={() => !alreadyPending && canRedeem && handleRedeemClass(reward.id, reward.title)}>
                      <div className={`glass-panel rounded-2xl p-4 flex justify-between items-center transition-all duration-200 h-full ${isUnicorn ? 'border-violet-200/25 bg-white/75 hover:bg-white/90' : 'border border-white/5 bg-synth-gray/20 hover:bg-synth-gray/30'} ${isOutOfStock ? 'opacity-50' : ''}`}>
                        <div className="flex gap-3 items-center min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-synth-purple/30 border border-white/5 flex items-center justify-center shrink-0 text-xl">🎁</div>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className={`font-semibold text-sm truncate ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{reward.title}</h4>
                            {reward.teacherName && <p className="text-[10px] text-synth-text-muted">từ {reward.teacherName}</p>}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-bold font-orbitron ${isUnicorn ? 'text-fuchsia-600' : 'text-synth-orange'}`}>{reward.costRuby} Ruby</span>
                              <span className={`text-[10px] font-bold font-orbitron px-1 rounded border ${isOutOfStock ? 'text-red-400 border-red-400/30 bg-red-400/5' : 'text-synth-cyan border-synth-cyan/30 bg-synth-cyan/5'}`}>
                                Còn {reward.remaining}/{reward.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end ml-2 shrink-0">
                          {alreadyPending ? (
                            <>
                              <span className="text-[10px] px-2 py-1 rounded font-orbitron font-bold text-synth-orange border border-synth-orange/30 bg-synth-orange/10 animate-pulse">Chờ Trao</span>
                              <button 
                                disabled={cancellingIds[myPendingForThisReward[0].id]}
                                onClick={(e) => { e.stopPropagation(); handleCancelClassRedemption(myPendingForThisReward[0].id); }}
                                className="flex items-center gap-1 text-[10px] text-synth-text-muted hover:text-synth-magenta transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                <RotateCcw className="w-3 h-3" /> {cancellingIds[myPendingForThisReward[0].id] ? 'Đang hủy...' : 'Rút lại'}
                              </button>
                            </>
                          ) : (
                            <button onClick={(e) => { e.stopPropagation(); handleRedeemClass(reward.id, reward.title); }} disabled={!canRedeem}
                              className={`px-3.5 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${isUnicorn ? 'bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-900 hover:brightness-105' : 'bg-synth-orange text-black hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]'}`}>
                              {isOutOfStock ? 'Hết Hàng' : !isAffordable ? 'Chưa đủ Ruby' : 'Đổi Quà'}
                            </button>
                          )}
                        </div>
                      </div>
                    </FogCard>
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* Nhật ký đổi quà */}
        {(classRewardRedemptions.length > 0 || rewardRedemptions.length > 0) && (
          <div className="pt-2 space-y-2">
            <h4 className={`text-xs font-orbitron font-bold uppercase tracking-wider ${isUnicorn ? 'text-violet-700' : 'text-synth-text-muted'}`}>Nhật ký đổi quà</h4>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {classRewardRedemptions.filter(r => r.status !== 'cancelled').map(redemption => (
                <div key={redemption.id} className={`rounded-xl p-3 flex justify-between items-center ${isUnicorn ? 'bg-white/60 border border-violet-200/25' : 'bg-white/5 border border-white/5'}`}>
                  <div>
                    <span className={`text-xs font-semibold block ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{redemption.rewardTitle}</span>
                    <span className="text-[10px] text-synth-text-muted">{new Date(redemption.requestedAt).toLocaleString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRedemptionStatusBadge(redemption.status)}
                    {redemption.status === 'pending' && (
                      <button 
                        disabled={cancellingIds[redemption.id]}
                        onClick={() => handleCancelClassRedemption(redemption.id)}
                        className="text-[10px] text-synth-text-muted hover:text-synth-magenta transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" 
                        title="Rút lại"
                      >
                        {cancellingIds[redemption.id] ? '...' : <RotateCcw className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {rewardRedemptions.map(redemption => (
                <div key={redemption.id} className={`rounded-xl p-3 flex justify-between items-center ${isUnicorn ? 'bg-white/60 border border-violet-200/25' : 'bg-white/5 border border-white/5'}`}>
                  <div>
                    <span className={`text-xs font-semibold block ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>{redemption.rewardTitle}</span>
                    <span className="text-[10px] text-synth-text-muted">{new Date(redemption.timestamp).toLocaleString('vi-VN')}</span>
                  </div>
                  {getRedemptionStatusBadge(redemption.status)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <RubyConfirmModal
        isOpen={confirmModal.isOpen}
        cost={confirmModal.cost}
        actionDescription={confirmModal.actionDescription}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        isLoading={confirmModal.isLoading}
      />
    </div>
  );
};
