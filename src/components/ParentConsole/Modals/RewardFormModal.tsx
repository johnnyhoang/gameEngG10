import React, { useState } from 'react';
import { X, Award } from 'lucide-react';
import { toast } from '../../../utils/toast';

interface RewardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  canApproveReward: boolean;
  isClassRewardMode: boolean; // true = Phúc lợi lớp, false = Quà tặng gia đình
  createClassReward?: (title: string, costCoins: number, quantity: number) => Promise<boolean>;
  addParentReward?: (title: string, costCoins: number, quantity: number) => void;
}

export const RewardFormModal: React.FC<RewardFormModalProps> = ({
  isOpen,
  onClose,
  canApproveReward,
  isClassRewardMode,
  createClassReward,
  addParentReward
}) => {
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardQuantity, setRewardQuantity] = useState(5);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) {
      toast.error('Vui lòng điền tên phần quà/phúc lợi!');
      return;
    }
    if (rewardCost <= 0 || rewardQuantity <= 0) {
      toast.error('Chi phí và số lượng phải lớn hơn 0!');
      return;
    }

    setIsSaving(true);
    if (isClassRewardMode && createClassReward) {
      const ok = await createClassReward(rewardTitle.trim(), rewardCost, rewardQuantity);
      if (ok) {
        toast.success('Đã tạo Phúc Lợi Lớp Học mới thành công! 🏫');
        setRewardTitle('');
        setRewardCost(200);
        setRewardQuantity(5);
        onClose();
      }
    } else if (!isClassRewardMode && addParentReward) {
      addParentReward(rewardTitle.trim(), rewardCost, rewardQuantity);
      toast.success('Đã tạo Phần Quà Gia Đình mới thành công! 🎁');
      setRewardTitle('');
      setRewardCost(200);
      setRewardQuantity(5);
      onClose();
    }
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg border border-synth-orange/30 bg-synth-orange/5 rounded-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h4 className="font-orbitron font-bold text-sm text-synth-orange uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" /> {isClassRewardMode ? 'Thêm Phúc Lợi Lớp Học Mới 🏫' : 'Thêm Phần Quà Gia Đình Mới 🎁'}
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs text-left">
          {!canApproveReward ? (
            <p className="text-xs text-red-400 italic">
              Tài khoản của bạn chưa được cấp quyền quản lý phần thưởng.
            </p>
          ) : (
            <>
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Tên phần thưởng / phúc lợi</span>
                <input
                  type="text"
                  required
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  placeholder={isClassRewardMode ? "Ví dụ: Sticker ngôi sao học tập, Giờ chơi máy tính..." : "Ví dụ: 15 phút chơi game, Ly trà sữa đặc biệt..."}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-orange text-xs"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1.5 text-xs block">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Chi phí (NP)</span>
                  <input
                    type="number"
                    min={10}
                    step={10}
                    value={rewardCost}
                    onChange={(e) => setRewardCost(Number(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-orange text-xs"
                  />
                </label>

                <label className="space-y-1.5 text-xs block">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Số lượng tối đa</span>
                  <input
                    type="number"
                    min={1}
                    value={rewardQuantity}
                    onChange={(e) => setRewardQuantity(Number(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-orange text-xs"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-synth-orange text-black rounded-lg hover:synth-glow-orange transition-all font-orbitron font-bold text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Đang lưu...' : 'Thêm Phần Thưởng 🎁'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
