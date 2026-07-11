import React, { useState } from 'react';
import { Plus, Trash2, Award, Check, X } from 'lucide-react';
import { toast } from '../../utils/toast';

interface RewardManagerProps {
  viewingStudentId: string | null;
  activeRewardCatalog: any[];
  activeRedemptions: any[];
  canApproveReward: boolean;
  addParentReward: (title: string, costCoins: number, quantity: number) => void;
  deleteParentReward: (rewardId: string) => void;
  markRewardDelivered: (redemptionId: string) => void;
  cancelRedemption: (redemptionId: string) => void;
  adminMarkRewardDelivered: (studentId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentId: string, redemptionId: string) => Promise<void>;
}

export const RewardManager: React.FC<RewardManagerProps> = ({
  viewingStudentId,
  activeRewardCatalog,
  activeRedemptions,
  canApproveReward,
  addParentReward,
  deleteParentReward,
  markRewardDelivered,
  cancelRedemption,
  adminMarkRewardDelivered,
  adminCancelRedemption
}) => {
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardQuantity, setRewardQuantity] = useState(5);

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) {
      toast.error('Vui lòng điền tên phần quà!');
      return;
    }
    if (rewardCost <= 0 || rewardQuantity <= 0) {
      toast.error('Chi phí và số lượng phải lớn hơn 0!');
      return;
    }
    addParentReward(rewardTitle.trim(), rewardCost, rewardQuantity);
    toast.success('Đã tạo phần quà mới thành công!');
    setRewardTitle('');
    setRewardCost(200);
    setRewardQuantity(5);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-synth-orange" />
        <h3 className="font-orbitron font-bold text-sm text-synth-orange uppercase tracking-wider flex items-center gap-1.5">
          💰 Ngân Các — Quản lý phúc lợi & Duyệt đổi quà
        </h3>
      </div>

      {!viewingStudentId ? (
        <div className="glass-panel rounded-2xl border border-white/5 p-8 text-center space-y-3">
          <p className="text-xs text-synth-text-muted">
            Chọn tài khoản thiếu hiệp tại tab <strong className="text-synth-magenta">🏛️ Chính Điện</strong> (bấm "Xem Hoạt Động") để duyệt yêu cầu đổi Phúc Lợi hoặc thiết lập Phúc Lợi Lớp Học dành riêng cho con.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Reward Form */}
          <div className="glass-panel rounded-2xl border border-synth-orange/20 p-5 h-fit">
            <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider mb-4 flex items-center gap-1.5">
               <Plus className="w-4 h-4" /> Thêm Phúc Lợi Lớp Học mới
            </h4>

            <form onSubmit={handleCreateReward} className="space-y-4">
              <div className="flex flex-col gap-1">
                 <label className="text-[10px] text-synth-text-muted uppercase">Tên Phúc Lợi</label>
                <input
                  type="text"
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  disabled={!canApproveReward}
                  placeholder="Ví dụ: Ly trà sữa, 1h chơi iPad"
                  className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-synth-text-muted uppercase">Giá Coins (NP)</label>
                  <input
                    type="number"
                    value={rewardCost}
                    onChange={(e) => setRewardCost(Number(e.target.value))}
                    disabled={!canApproveReward}
                    className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-synth-text-muted uppercase">Số lượng</label>
                  <input
                    type="number"
                    min={1}
                    value={rewardQuantity}
                    onChange={(e) => setRewardQuantity(Number(e.target.value))}
                    disabled={!canApproveReward}
                    className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <p className="text-[10px] text-synth-text-muted -mt-1">
                App không quản lý tiền — quà thật trao ngoài đời, xác nhận qua nút "Đã Trao" bên dưới.
              </p>

              <button
                type="submit"
                disabled={!canApproveReward}
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-orange text-black hover:synth-glow-orange cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tạo Phúc Lợi Lớp Học
              </button>
              {!canApproveReward && (
                <p className="text-[9px] text-yellow-500/80 italic mt-2 leading-tight">
                  ⚠️ Bạn hiện là Chủ nhiệm phụ và chưa được cấp quyền quản lý Phúc Lợi của lớp này.
                </p>
              )}
            </form>

            {activeRewardCatalog.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                <h5 className="text-[10px] text-synth-text-muted uppercase font-bold tracking-wider">Danh mục hiện có</h5>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {activeRewardCatalog.map((reward: any) => (
                    <div key={reward.id} className="flex justify-between items-center text-xs bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-white truncate">{reward.title}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-synth-orange font-bold font-orbitron">{reward.costCoins} NP · Còn {reward.remainingQuantity}/{reward.quantity}</span>
                        {canApproveReward && (
                          <button
                            onClick={() => deleteParentReward(reward.id)}
                            className="text-synth-magenta hover:opacity-70 cursor-pointer"
                            title="Xóa khỏi danh mục"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Redemption ledger — lượt đổi đang chờ trao / đã trao */}
          <div className="glass-panel rounded-2xl border border-white/5 p-5 md:col-span-2 space-y-4">
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
               <Award className="w-4 h-4" /> Nhật ký đổi quà — Chờ Hiệu Trưởng trao
            </h4>

            <div className="space-y-2 overflow-y-auto max-h-[350px]">
              {activeRedemptions.length > 0 ? (
                activeRedemptions.map((redemption: any) => (
                  <div
                    key={redemption.id}
                    className="bg-synth-gray/20 rounded-xl p-4 border border-white/5 flex justify-between items-center"
                  >
                    <div>
                      <h5 className="text-sm font-bold text-white">{redemption.rewardTitle}</h5>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <span className="text-synth-orange font-bold font-orbitron">{redemption.costCoins} NP</span>
                        <span className="text-synth-text-muted">{new Date(redemption.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {redemption.status === 'pending' ? (
                        !canApproveReward ? (
                          <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-slate-400 font-bold uppercase font-orbitron">
                            Chờ Duyệt
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                if (viewingStudentId) {
                                  adminMarkRewardDelivered(viewingStudentId, redemption.id);
                                } else {
                                  markRewardDelivered(redemption.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all"
                              title="Xác nhận đã trao quà thật cho con"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (viewingStudentId) {
                                  adminCancelRedemption(viewingStudentId, redemption.id);
                                } else {
                                  cancelRedemption(redemption.id);
                                }
                              }}
                              className="p-2 rounded-lg border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10 transition-all"
                              title="Hủy lượt đổi, hoàn lại NP cho con"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )
                      ) : (
                        <span className="text-xs text-synth-text-muted italic px-3 py-1 bg-synth-gray/50 rounded-lg">
                          Đã trao ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-synth-text-muted">
                  Chưa có lượt đổi quà nào.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
