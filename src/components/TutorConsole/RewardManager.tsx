import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Award, Check, X, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { toast } from '../../utils/toast';
import { SideDrawer } from '../Common/SideDrawer';

interface RewardManagerProps {
  viewingStudentId: string | null;
  activeRedemptions: any[];
  canApproveReward: boolean;
  /** Chỉ truong_vien/pho_vien được sửa Danh Mục Quà Khuyến Học CHUNG của trường. */
  isSchoolAdmin: boolean;
  schoolRewards: any[];
  fetchSchoolRewards: () => Promise<void>;
  createSchoolReward: (title: string, costRuby: number, quantity: number) => Promise<boolean>;
  deleteSchoolReward: (rewardId: string) => Promise<boolean>;
  markRewardDelivered: (redemptionId: string) => void;
  cancelRedemption: (redemptionId: string) => void;
  adminMarkRewardDelivered: (studentId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentId: string, redemptionId: string) => Promise<void>;
}

export const RewardManager: React.FC<RewardManagerProps> = ({
  viewingStudentId,
  activeRedemptions,
  canApproveReward,
  isSchoolAdmin,
  schoolRewards,
  fetchSchoolRewards,
  createSchoolReward,
  deleteSchoolReward,
  markRewardDelivered,
  cancelRedemption,
  adminMarkRewardDelivered,
  adminCancelRedemption
}) => {
  // ── Class Rewards from store ──────────────────────────────
  const classRewards = useGameState(state => state.classRewards);
  const classRewardRedemptions = useGameState(state => state.classRewardRedemptions);
  const fetchClassRewards = useGameState(state => state.fetchClassRewards);
  const createClassReward = useGameState(state => state.createClassReward);
  const deleteClassReward = useGameState(state => state.deleteClassReward);
  const deliverClassRedemption = useGameState(state => state.deliverClassRedemption);

  const [classTitle, setClassTitle] = useState('');
  const [classCost, setClassCost] = useState(200);
  const [classQty, setClassQty] = useState(5);
  const [isCreating, setIsCreating] = useState(false);
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isPersonalFormOpen, setIsPersonalFormOpen] = useState(false);
  const [showPendingOnly, setShowPendingOnly] = useState(true);
  const [processingRedemptions, setProcessingRedemptions] = useState<Record<string, boolean>>({});

  const handleDeliverClassRedemption = async (redemptionId: string) => {
    if (processingRedemptions[redemptionId]) return;
    setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: true }));
    try {
      const ok = await deliverClassRedemption(redemptionId);
      if (ok) {
        toast.success('Đã trao Quà Khuyến Học thành công! 🎁');
      }
    } catch (err) {
      console.error(err);
      toast.error('Phát thưởng phúc lợi thất bại.');
    } finally {
      setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: false }));
    }
  };

  const handleApproveRedemption = async (redemptionId: string) => {
    if (processingRedemptions[redemptionId]) return;
    setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: true }));
    try {
      if (viewingStudentId) {
        await adminMarkRewardDelivered(viewingStudentId, redemptionId);
      } else {
        await markRewardDelivered(redemptionId);
      }
      toast.success('Đã xác nhận trao phần quà thành công! 🎁');
    } catch (err) {
      console.error(err);
      toast.error('Xác nhận trao quà thất bại.');
    } finally {
      setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: false }));
    }
  };

  const handleCancelRedemption = async (redemptionId: string) => {
    if (processingRedemptions[redemptionId]) return;
    if (window.confirm('Bạn có chắc muốn hủy đơn đổi quà này và hoàn lại Ruby cho học sinh?')) {
      setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: true }));
      try {
        if (viewingStudentId) {
          await adminCancelRedemption(viewingStudentId, redemptionId);
        } else {
          await cancelRedemption(redemptionId);
        }
        toast.success('Đã hủy và hoàn Ruby thành công! 🪙');
      } catch (err) {
        console.error(err);
        toast.error('Hủy đơn đổi quà thất bại.');
      } finally {
        setProcessingRedemptions(prev => ({ ...prev, [redemptionId]: false }));
      }
    }
  };

  // ── Danh Mục Quà Khuyến Học CHUNG của trường (form state) ──
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardQuantity, setRewardQuantity] = useState(999999);
  const [isCreatingSchoolReward, setIsCreatingSchoolReward] = useState(false);

  useEffect(() => {
    fetchClassRewards();
    if (isSchoolAdmin) fetchSchoolRewards();
  }, [isSchoolAdmin]);

  const pendingRedemptions = classRewardRedemptions.filter(r => r.status === 'pending');
  const displayRedemptions = showPendingOnly
    ? pendingRedemptions
    : classRewardRedemptions;

  const handleCreateClassReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classTitle.trim()) { toast.error('Vui lòng điền tên phúc lợi!'); return; }
    if (classCost <= 0 || classQty <= 0) { toast.error('Chi phí và số lượng phải lớn hơn 0!'); return; }
    setIsCreating(true);
    const ok = await createClassReward(classTitle.trim(), classCost, classQty);
    if (ok) { setClassTitle(''); setClassCost(200); setClassQty(5); setIsClassFormOpen(false); }
    setIsCreating(false);
  };

  const handleCreateSchoolReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) { toast.error('Vui lòng điền tên phần quà!'); return; }
    if (rewardCost <= 0 || rewardQuantity <= 0) { toast.error('Chi phí và số lượng phải lớn hơn 0!'); return; }
    setIsCreatingSchoolReward(true);
    const ok = await createSchoolReward(rewardTitle.trim(), rewardCost, rewardQuantity);
    if (ok) {
      toast.success('Đã tạo Quà Khuyến Học của trường thành công!');
      setRewardTitle(''); setRewardCost(200); setRewardQuantity(999999);
      setIsPersonalFormOpen(false);
    } else {
      toast.error('Tạo Quà Khuyến Học thất bại.');
    }
    setIsCreatingSchoolReward(false);
  };

  const handleDeleteSchoolReward = async (rewardId: string) => {
    if (!window.confirm('Xóa Quà Khuyến Học này khỏi danh mục CHUNG của trường?')) return;
    const ok = await deleteSchoolReward(rewardId);
    if (!ok) toast.error('Xóa thất bại.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-synth-orange" />
        <h3 className="font-orbitron font-bold text-sm text-synth-orange uppercase tracking-wider">
          💰 Phòng Tài Vụ
        </h3>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: QUÀ KHUYẾN HỌC (Luôn hiện với Chủ Nhiệm)
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-synth-orange/20 pb-2">
          <Users className="w-4 h-4 text-synth-orange" />
          <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider">
            🏫 Quà Khuyến Học
          </h4>
          <span className="text-[10px] text-synth-text-muted ml-1">
            — Tạo một lần, cả lớp thấy. Số lượng giảm khi học sinh đổi.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Danh mục quà lớp + nút mở drawer tạo mới */}
          <div className="glass-panel rounded-2xl border border-synth-orange/20 p-5 h-fit space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h5 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider flex items-center gap-1.5">
                🎁 Quà Khuyến Học Của Lớp
              </h5>
              <button
                onClick={() => setIsClassFormOpen(true)}
                disabled={!canApproveReward}
                className="px-3 py-1.5 rounded-lg bg-synth-orange text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-orange cursor-pointer transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm Quà
              </button>
            </div>
            {!canApproveReward && (
              <p className="text-[9px] text-yellow-500/80 italic leading-tight">
                ⚠️ Bạn chưa được cấp quyền quản lý Quà Khuyến Học của lớp này.
              </p>
            )}
            {classRewards.length === 0 && (
              <div className="text-center py-6 text-xs text-synth-text-muted border border-dashed border-white/10 rounded-xl">
                Chưa có Quà Khuyến Học nào cho lớp.
              </div>
            )}

            {/* Danh sách phúc lợi hiện có */}
            {classRewards.length > 0 && (
              <div className="pt-3 border-t border-white/5 space-y-2">
                <h6 className="text-[10px] text-synth-text-muted uppercase font-bold tracking-wider">
                  Danh mục ({classRewards.length})
                </h6>
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {classRewards.map(reward => {
                    const pct = reward.quantity > 0 ? (reward.remaining / reward.quantity) * 100 : 0;
                    const isOut = reward.remaining <= 0;
                    return (
                      <div key={reward.id} className="bg-white/5 rounded-lg px-3 py-2 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-semibold ${isOut ? 'text-synth-text-muted line-through' : 'text-white'}`}>
                            {reward.title}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-orbitron text-synth-orange font-bold">
                              {reward.costRuby} Ruby
                            </span>
                            {canApproveReward && (
                              <button
                                onClick={() => deleteClassReward(reward.id)}
                                className="text-synth-magenta hover:opacity-70 cursor-pointer"
                                title="Xóa phúc lợi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        {/* Progress bar remaining */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full transition-all ${isOut ? 'bg-red-500/50' : 'bg-synth-cyan'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-orbitron font-bold shrink-0 ${isOut ? 'text-red-400' : 'text-synth-cyan'}`}>
                            {isOut ? 'Hết' : `${reward.remaining}/${reward.quantity}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Danh sách yêu cầu đổi phúc lợi lớp */}
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Yêu Cầu Đổi Quà
                {pendingRedemptions.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-synth-orange text-black text-[9px] font-black">
                    {pendingRedemptions.length}
                  </span>
                )}
              </h5>
              {classRewardRedemptions.length > 0 && (
                <button
                  onClick={() => setShowPendingOnly(p => !p)}
                  className="flex items-center gap-1 text-[10px] text-synth-text-muted hover:text-white transition-colors cursor-pointer"
                >
                  {showPendingOnly ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  {showPendingOnly ? 'Chờ duyệt' : 'Tất cả'}
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {displayRedemptions.length > 0 ? displayRedemptions.map(red => (
                <div
                  key={red.id}
                  className={`rounded-xl p-3 border flex justify-between items-start gap-3 ${
                    red.status === 'pending'
                      ? 'bg-synth-orange/5 border-synth-orange/20'
                      : red.status === 'delivered'
                        ? 'bg-synth-green/5 border-synth-green/10'
                        : 'bg-white/3 border-white/5 opacity-60'
                  }`}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {red.studentAvatar ? (
                        <img src={red.studentAvatar} alt="" className="w-5 h-5 rounded-full" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-synth-purple/30 flex items-center justify-center text-[10px]">🧑</span>
                      )}
                      <span className="text-xs font-semibold text-white truncate">{red.studentName || 'Học sinh'}</span>
                    </div>
                    <p className="text-[11px] text-synth-text-muted truncate">→ {red.rewardTitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-orbitron text-synth-orange font-bold">{red.costRuby} Ruby</span>
                      <span className="text-[10px] text-synth-text-muted">
                        {new Date(red.requestedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {red.status === 'pending' ? (
                      canApproveReward ? (
                        <button
                          disabled={processingRedemptions[red.id]}
                          onClick={() => handleDeliverClassRedemption(red.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-synth-green text-black text-[11px] font-orbitron font-bold cursor-pointer hover:synth-glow-green transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Xác nhận đã phát thưởng ngoài đời"
                        >
                          {processingRedemptions[red.id] ? (
                            <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          Phát Thưởng
                        </button>
                      ) : (
                        <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-slate-400 font-bold uppercase font-orbitron">
                          Chờ Duyệt
                        </span>
                      )
                    ) : red.status === 'delivered' ? (
                      <span className="text-[10px] text-synth-green font-orbitron font-bold">Đã Trao ✓</span>
                    ) : (
                      <span className="text-[10px] text-synth-text-muted font-orbitron">Đã Hủy</span>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-xs text-synth-text-muted">
                  {showPendingOnly ? 'Chưa có yêu cầu đổi quà nào đang chờ.' : 'Chưa có lượt đổi quà nào.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2A: DANH MỤC QUÀ CHUNG CỦA TRƯỜNG (chỉ truong_vien/pho_vien sửa)
          Một danh sách duy nhất cho toàn viện — học sinh mồ côi (không có giáo viên) thấy
          danh sách này; giáo viên mới clone danh sách này khi hồ sơ được tạo.
          ═══════════════════════════════════════════════════════ */}
      {isSchoolAdmin && (
        <div className="space-y-4 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <h4 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase tracking-wider">
              🏛️ Quà Khuyến Học Của Trường
            </h4>
            <span className="text-[10px] text-synth-text-muted/60">— Danh sách CHUNG toàn viện. Học sinh chưa vào lớp (orphan) thấy danh sách này.</span>
          </div>

          <div className="glass-panel rounded-2xl border border-synth-text-muted/20 p-5">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h5 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase tracking-wider flex items-center gap-1.5">
                🏛️ Danh Mục Quà Của Trường
              </h5>
              <button
                onClick={() => setIsPersonalFormOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-synth-cyan text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-cyan cursor-pointer transition-all flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm Quà
              </button>
            </div>
            {schoolRewards.length === 0 && (
              <div className="text-center py-6 text-xs text-synth-text-muted border border-dashed border-white/10 rounded-xl">
                Chưa có Quà Khuyến Học nào của trường.
              </div>
            )}

            {schoolRewards.length > 0 && (
              <div className="space-y-1.5">
                <div className="space-y-1 max-h-52 overflow-y-auto">
                  {schoolRewards.map((reward: any) => (
                    <div key={reward.id} className="flex justify-between items-center text-xs bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-white truncate">{reward.title}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-synth-cyan font-bold font-orbitron text-[10px]">
                          {reward.costRuby} Ruby · Còn {reward.remainingQuantity}/{reward.quantity}
                        </span>
                        <button onClick={() => handleDeleteSchoolReward(reward.id)} className="text-synth-magenta hover:opacity-70 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 2B: NHẬT KÝ ĐỔI QUÀ CÁ NHÂN (cần chọn học sinh)
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-4 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <h4 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase tracking-wider">
            👤 Nhật Ký Đổi Quà Cá Nhân
          </h4>
          <span className="text-[10px] text-synth-text-muted/60">— Lượt đổi quà trường của học sinh đang xem (khi mồ côi)</span>
        </div>

        {!viewingStudentId ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-6 text-center">
            <p className="text-xs text-synth-text-muted">
              Chọn tài khoản học sinh tại tab <strong className="text-synth-magenta">👥 Học Sinh & Liên Kết</strong> → "Xem Hoạt Động" để xem lịch sử đổi quà.
            </p>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <h5 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Nhật Ký Đổi Quà Cá Nhân
            </h5>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {activeRedemptions.length > 0 ? activeRedemptions.map((redemption: any) => (
                  <div key={redemption.id} className="bg-synth-gray/20 rounded-xl p-4 border border-white/5 flex justify-between items-center">
                    <div>
                      <h6 className="text-sm font-bold text-white">{redemption.rewardTitle}</h6>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <span className="text-synth-orange font-bold font-orbitron">{redemption.costRuby} Ruby</span>
                        <span className="text-synth-text-muted">{new Date(redemption.timestamp).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {redemption.status === 'pending' ? (
                        !canApproveReward ? (
                          <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-slate-400 font-bold uppercase font-orbitron">Chờ Duyệt</span>
                        ) : (
                          <>
                            <button
                              disabled={processingRedemptions[redemption.id]}
                              onClick={() => handleApproveRedemption(redemption.id)}
                              className="p-2 rounded-lg bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center min-w-[32px] min-h-[32px]"
                              title="Xác nhận đã trao"
                            >
                              {processingRedemptions[redemption.id] ? (
                                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              disabled={processingRedemptions[redemption.id]}
                              onClick={() => handleCancelRedemption(redemption.id)}
                              className="p-2 rounded-lg border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center min-w-[32px] min-h-[32px]"
                              title="Hủy, hoàn Ruby"
                            >
                              {processingRedemptions[redemption.id] ? (
                                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-synth-magenta border-t-transparent rounded-full"></span>
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        )
                      ) : (
                        <span className="text-xs text-synth-text-muted italic px-3 py-1 bg-synth-gray/50 rounded-lg">Đã trao ✓</span>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-xs text-synth-text-muted">Chưa có lượt đổi quà nào.</div>
                )}
            </div>
          </div>
        )}
      </div>

      {/* Drawer: Tạo Quà Khuyến Học cho lớp */}
      <SideDrawer
        isOpen={isClassFormOpen}
        onClose={() => setIsClassFormOpen(false)}
        widthClass="max-w-md"
        title={
          <span className="text-synth-orange flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Thêm Quà Khuyến Học Mới
          </span>
        }
      >
        <form onSubmit={handleCreateClassReward} className="p-5 space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-synth-text-muted uppercase">Tên Quà</label>
            <input
              type="text"
              value={classTitle}
              onChange={e => setClassTitle(e.target.value)}
              disabled={!canApproveReward}
              placeholder="Ví dụ: Sticker ngôi sao, Giờ chơi game"
              className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-synth-text-muted uppercase">Giá (Ruby)</label>
              <input
                type="number"
                min={1}
                value={classCost}
                onChange={e => setClassCost(Number(e.target.value))}
                disabled={!canApproveReward}
                className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-synth-text-muted uppercase">Số lượng</label>
              <input
                type="number"
                min={1}
                value={classQty}
                onChange={e => setClassQty(Number(e.target.value))}
                disabled={!canApproveReward}
                className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange disabled:opacity-50"
              />
            </div>
          </div>
          <p className="text-[10px] text-synth-text-muted">
            🎁 Quà trao ngoài đời thực — bấm "Phát Thưởng" khi đã thực hiện.
          </p>
          <button
            type="submit"
            disabled={!canApproveReward || isCreating}
            className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-orange text-black hover:synth-glow-orange cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? 'Đang tạo...' : '+ Tạo Quà Khuyến Học Cho Lớp'}
          </button>
        </form>
      </SideDrawer>

      {/* Drawer: Tạo Quà Khuyến Học của trường */}
      <SideDrawer
        isOpen={isPersonalFormOpen}
        onClose={() => setIsPersonalFormOpen(false)}
        widthClass="max-w-md"
        title={
          <span className="text-synth-cyan flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Thêm Quà Khuyến Học Của Trường
          </span>
        }
      >
        <form onSubmit={handleCreateSchoolReward} className="p-5 space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-synth-text-muted uppercase">Tên Quà</label>
            <input
              type="text"
              value={rewardTitle}
              onChange={e => setRewardTitle(e.target.value)}
              disabled={isCreatingSchoolReward}
              placeholder="Ví dụ: Ly trà sữa, 1h chơi iPad"
              className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-cyan disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-synth-text-muted uppercase">Giá (Ruby)</label>
              <input type="number" value={rewardCost} onChange={e => setRewardCost(Number(e.target.value))}
                disabled={isCreatingSchoolReward}
                className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-cyan disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-synth-text-muted uppercase">Số lượng</label>
              <input type="number" min={1} value={rewardQuantity} onChange={e => setRewardQuantity(Number(e.target.value))}
                disabled={isCreatingSchoolReward}
                className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-cyan disabled:opacity-50"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isCreatingSchoolReward}
            className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tạo Quà Khuyến Học Của Trường
          </button>
        </form>
      </SideDrawer>
    </div>
  );
};
