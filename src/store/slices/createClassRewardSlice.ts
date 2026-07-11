// @ts-nocheck
import type { StateCreator } from 'zustand';
import type { StoreState } from '../types';
import { classRewardService } from '../../services/classRewardService';
import { toast } from '../../utils/toast';

export const createClassRewardSlice: StateCreator<
  StoreState,
  [],
  [],
  Pick<StoreState,
    | 'classRewards'
    | 'classRewardRedemptions'
    | 'isOrphanStudent'
    | 'fetchClassRewards'
    | 'createClassReward'
    | 'deleteClassReward'
    | 'redeemClassReward'
    | 'cancelClassRedemption'
    | 'deliverClassRedemption'
  >
> = (set, get) => ({
  classRewards: [],
  classRewardRedemptions: [],
  isOrphanStudent: false,

  fetchClassRewards: async () => {
    const { currentUser } = get();
    if (!currentUser?.id || currentUser.id.startsWith('mock-')) return;
    try {
      const data = await classRewardService.fetch();
      set({
        classRewards: data.rewards,
        classRewardRedemptions: data.redemptions,
        isOrphanStudent: data.isOrphan,
      });
    } catch (e) {
      console.error('[fetchClassRewards]', e);
    }
  },

  createClassReward: async (title, costCoins, quantity) => {
    const result = await classRewardService.create(title, costCoins, quantity);
    if (result.success) {
      toast.success(`🎁 Đã tạo phúc lợi "${title}" cho lớp!`);
      await get().fetchClassRewards();
      return true;
    }
    toast.error(result.error || 'Không thể tạo phúc lợi');
    return false;
  },

  deleteClassReward: async (rewardId) => {
    const ok = await classRewardService.delete(rewardId);
    if (ok) {
      set(state => ({
        classRewards: state.classRewards.filter(r => r.id !== rewardId),
      }));
      toast.success('Đã xóa phúc lợi lớp.');
      return true;
    }
    toast.error('Không thể xóa phúc lợi này.');
    return false;
  },

  redeemClassReward: async (rewardId) => {
    const result = await classRewardService.redeem(rewardId);
    if (result.success) {
      // Refresh to get updated remaining + new redemption record
      await get().fetchClassRewards();
      // Also sync player coins from server
      await get().syncWithServer?.();
      return true;
    }
    if (result.error === 'not_enough_coins') {
      toast.error('Ngân lượng chưa đủ để đổi phúc lợi này!');
    } else if (result.error === 'out_of_stock') {
      toast.error('Phúc lợi này đã hết số lượng!');
    } else {
      toast.error(result.error || 'Không thể đổi phúc lợi.');
    }
    return false;
  },

  cancelClassRedemption: async (redemptionId) => {
    const ok = await classRewardService.cancelRedemption(redemptionId);
    if (ok) {
      toast.success('Đã rút lại yêu cầu. Ngân lượng đã được hoàn trả.');
      await get().fetchClassRewards();
      await get().syncWithServer?.();
      return true;
    }
    toast.error('Không thể rút lại yêu cầu này.');
    return false;
  },

  deliverClassRedemption: async (redemptionId) => {
    const ok = await classRewardService.deliver(redemptionId);
    if (ok) {
      toast.success('✅ Đã xác nhận phát thưởng!');
      set(state => ({
        classRewardRedemptions: state.classRewardRedemptions.map(r =>
          r.id === redemptionId ? { ...r, status: 'delivered' as const, deliveredAt: Date.now() } : r
        ),
      }));
      return true;
    }
    toast.error('Không thể xác nhận phát thưởng.');
    return false;
  },
});
