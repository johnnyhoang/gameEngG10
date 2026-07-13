import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { isParentRole } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';
import { RewardManager } from './RewardManager';
import { QuestManager } from './QuestManager';

interface StudentProfileViewProps {
  currentUser: any;
  selectedStudentProfile: any;
  gameSettings: any;
  canApproveReward: boolean;
  canManageEnergy: boolean;
  canCreateMission: boolean;
  skipReviews: any[];
  adminMarkRewardDelivered: (studentId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentId: string, redemptionId: string) => Promise<void>;
  adminSetEnergy: (studentId: string, targetPercent: number) => Promise<void>;
  adminSetEnergyConfig: (studentId: string, maxEnergy: number, resetHours: 2 | 3 | 5) => Promise<void>;
  fetchSkipReviews: (studentId: string) => Promise<void>;
  resolveSkipReview: (reviewId: string) => Promise<boolean>;
  // Reward props
  activeRewardCatalog: any[];
  activeRedemptions: any[];
  addParentReward: (title: string, costCoins: number, quantity: number) => void;
  deleteParentReward: (rewardId: string) => void;
  markRewardDelivered: (redemptionId: string) => void;
  cancelRedemption: (redemptionId: string) => void;
  // Quest props
  parentQuests: any[];
  addParentQuest: (title: string, description: string, rewardNP: number) => void;
  completeParentQuest: (questId: string) => void;
  deleteParentQuest: (questId: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  currentUser,
  selectedStudentProfile,
  canApproveReward,
  canManageEnergy,
  canCreateMission,
  skipReviews,
  adminMarkRewardDelivered,
  adminCancelRedemption,
  adminSetEnergy,
  adminSetEnergyConfig,
  fetchSkipReviews,
  resolveSkipReview,
  activeRewardCatalog,
  activeRedemptions,
  addParentReward,
  deleteParentReward,
  markRewardDelivered,
  cancelRedemption,
  parentQuests,
  addParentQuest,
  completeParentQuest,
  deleteParentQuest
}) => {
  // Chân Khí v2 (SUB_SPEC_ENERGY §2): maxEnergy/resetHours là cấu hình RIÊNG của con này, không còn đọc gameSettings global.
  const maxE = selectedStudentProfile?.player?.maxEnergy ?? 100;
  const [studentEnergyPercent, setStudentEnergyPercent] = useState(100);
  const [maxEnergyInput, setMaxEnergyInput] = useState(100);
  const [resetHoursInput, setResetHoursInput] = useState<2 | 3 | 5>(3);
  const [isSettingEnergy, setIsSettingEnergy] = useState(false);
  const [isSettingEnergyConfig, setIsSettingEnergyConfig] = useState(false);
  const [resolvingReviewIds, setResolvingReviewIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedStudentProfile?.player) {
      setStudentEnergyPercent(Math.round((selectedStudentProfile.player.energy / maxE) * 100));
      setMaxEnergyInput(selectedStudentProfile.player.maxEnergy ?? 100);
      setResetHoursInput((selectedStudentProfile.player.resetHours ?? 3) as 2 | 3 | 5);
    }
  }, [selectedStudentProfile?.player?.energy, selectedStudentProfile?.player?.maxEnergy, selectedStudentProfile?.player?.resetHours, maxE]);

  if (!selectedStudentProfile) {
    return (
      <div className="glass-panel rounded-2xl border border-white/5 p-8 text-center space-y-3">
        <p className="text-xs text-synth-text-muted">
          Chọn tài khoản học sinh tại tab <strong className="text-synth-magenta">👥 Học Sinh & Liên Kết</strong> (bấm "Xem Hoạt Động") để theo dõi báo cáo, tiến độ và nạp năng lượng.
        </p>
      </div>
    );
  }

  const { studentUser, player, pet, categoryStats = {}, logs = [] } = selectedStudentProfile;

  return (
    <div className="space-y-6">
      {/* 1. Header Profile */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-synth-cyan/5 via-white/3 to-synth-magenta/5 border border-white/10 p-5 rounded-2xl">
        <div className="flex items-center gap-4">
          <img 
            src={studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
            alt={studentUser?.name} 
            className="w-16 h-16 rounded-full border-2 border-synth-magenta/40 shadow-md object-cover"
          />
          <div>
            <h3 className="font-orbitron font-bold text-base text-white">{studentUser?.name}</h3>
            <p className="text-xs text-synth-text-muted font-mono">{studentUser?.email}</p>
          </div>
        </div>

        {/* Quick parameters display */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 text-xs">
          <div className="bg-white/3 border border-white/5 rounded-2xl px-4 py-2.5 text-center shadow-sm backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <span className="block text-[9px] uppercase text-synth-text-muted">Cấp Độ</span>
            <span className="font-orbitron font-black text-synth-magenta text-sm">LV.{player?.level || 1}</span>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-2xl px-4 py-2.5 text-center shadow-sm backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <span className="block text-[9px] uppercase text-synth-text-muted">Điểm Thưởng (NP)</span>
            <span className={`font-orbitron font-black text-sm ${(player?.coins || 0) < 0 ? 'text-red-400' : 'text-synth-orange'}`}>
              {player?.coins || 0} NP
            </span>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-2xl px-4 py-2.5 text-center shadow-sm backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <span className="block text-[9px] uppercase text-synth-text-muted">Tích Lũy Điểm Số</span>
            <span className="font-orbitron font-black text-synth-green text-sm">{player?.xp || 0} XP</span>
          </div>
          <div className="bg-white/3 border border-white/5 rounded-2xl px-4 py-2.5 text-center shadow-sm backdrop-blur-sm hover:border-white/20 transition-all duration-300">
            <span className="block text-[9px] uppercase text-synth-text-muted">Chuỗi ngày</span>
            <span className="font-orbitron font-black text-orange-400 text-sm">{player?.streak || 0} ngày</span>
          </div>
        </div>
      </div>

      {/* 2. Nạp Năng Lượng & Thú Cưng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nạp Năng Lượng (Energy Control) */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              ⚡ Nạp Năng Lượng cho Học Sinh
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            Nạp đầy năng lượng để học sinh hoàn thành các đảo thử thách học tập.
          </p>

          {/* Visual Progress Bar showing exact current level */}
          <div className="space-y-2 bg-white/3 p-3.5 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
              <span>TRẠNG THÁI NĂNG LƯỢNG HIỆN TẠI</span>
              <span>{player?.energy || 0} / {maxE} ({(player?.energy && maxE) ? Math.round((player.energy / maxE) * 100) : 0}%)</span>
            </div>
            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-synth-cyan to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                style={{ width: `${Math.min(100, Math.max(0, (player?.energy && maxE) ? (player.energy / maxE) * 100 : 0))}%` }}
              />
            </div>
          </div>

          <div className="bg-white/3 p-4 rounded-xl border border-white/5 space-y-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-synth-cyan">⚡ Điều chỉnh lượng nạp</span>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                value={studentEnergyPercent}
                onChange={e => setStudentEnergyPercent(Number(e.target.value))}
                disabled={!canManageEnergy}
                className="flex-1 accent-synth-cyan cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="font-orbitron font-bold text-sm text-synth-cyan w-12 text-right">
                {studentEnergyPercent}%
              </span>
            </div>

            <button
              onClick={async () => {
                if (!selectedStudentProfile?.studentUser?.id) return;
                setIsSettingEnergy(true);
                try {
                  await adminSetEnergy(selectedStudentProfile.studentUser.id, studentEnergyPercent);
                  toast.success(`Đã nạp năng lượng lên ${studentEnergyPercent}% thành công!`);
                } catch (err) {
                  console.error(err);
                  toast.error('Nạp năng lượng thất bại.');
                } finally {
                  setIsSettingEnergy(false);
                }
              }}
              disabled={!canManageEnergy || isSettingEnergy}
              className="w-full py-2 bg-synth-cyan text-black font-bold rounded-lg hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSettingEnergy ? 'Đang xử lý...' : 'Xác Nhận Nạp Năng Lượng ⚡'}
            </button>
          </div>

          {/* Cấu hình Năng Lượng Tối Đa + giờ hồi RIÊNG cho học sinh (SUB_SPEC_ENERGY §2) */}
          <div className="pt-3 mt-1 border-t border-white/5 space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-synth-text-muted">
              ⚙️ Cấu Hình Riêng Cho Học Sinh
            </h5>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs">
                <span className="block text-synth-text-muted font-semibold">Năng Lượng Tối Đa (50-300)</span>
                <input
                  type="number"
                  min={50}
                  max={300}
                  step={10}
                  value={maxEnergyInput}
                  onChange={e => setMaxEnergyInput(Number(e.target.value) || 100)}
                  disabled={!canManageEnergy}
                  className="w-full p-2 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>
              <label className="space-y-1 text-xs">
                <span className="block text-synth-text-muted font-semibold">Giờ hồi đầy</span>
                <select
                  value={resetHoursInput}
                  onChange={e => setResetHoursInput(Number(e.target.value) as 2 | 3 | 5)}
                  disabled={!canManageEnergy}
                  className="w-full p-2 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value={2}>2 giờ</option>
                  <option value={3}>3 giờ</option>
                  <option value={5}>5 giờ</option>
                </select>
              </label>
            </div>
            <button
              onClick={async () => {
                if (!selectedStudentProfile?.studentUser?.id) return;
                setIsSettingEnergyConfig(true);
                try {
                  await adminSetEnergyConfig(selectedStudentProfile.studentUser.id, maxEnergyInput, resetHoursInput);
                  toast.success('Đã lưu cấu hình năng lượng riêng thành công!');
                } catch (err) {
                  console.error(err);
                  toast.error('Không thể lưu cấu hình.');
                } finally {
                  setIsSettingEnergyConfig(false);
                }
              }}
              disabled={!canManageEnergy || isSettingEnergyConfig}
              className="w-full py-2 border border-synth-cyan/40 text-synth-cyan font-bold rounded-lg hover:bg-synth-cyan/10 transition-all text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSettingEnergyConfig ? 'Đang lưu...' : 'Lưu cấu hình Năng Lượng'}
            </button>
            {!canManageEnergy && (
              <p className="text-[9px] text-yellow-500/80 italic mt-2 leading-tight">
                ⚠️ Tài khoản của bạn hiện là Chủ nhiệm phụ, chỉ Chủ nhiệm chính mới có quyền thay đổi Năng lượng của học sinh này.
              </p>
            )}
          </div>
        </div>

        {/* Pet stable information */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5">
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
            🐷 Thú Cưng Đồng Hành (Pet Stable)
          </h4>
          {pet ? (
            <div className="flex items-center gap-5 bg-white/3 border border-white/5 p-4 rounded-2xl w-full">
              <div className="w-20 h-20 rounded-3xl bg-black/40 border border-synth-magenta/25 flex items-center justify-center text-5xl shrink-0 shadow-lg relative group overflow-hidden">
                <div className="absolute inset-0 bg-synth-magenta/5 animate-pulse pointer-events-none"></div>
                <span className="relative z-10 group-hover:scale-115 transition-transform duration-300 inline-block">
                  {pet.stage === 'egg' ? '🥚' : pet.stage === 'baby' ? '🐷' : '🐗'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 text-xs">
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold">Tên thú cưng</span>
                  <span className="font-bold text-white text-sm">{pet.name}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold">Cấp độ</span>
                  <span className="font-orbitron font-black text-synth-magenta text-sm">LV.{pet.level}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold">Tâm trạng</span>
                  <span className="inline-flex items-center gap-1 font-bold text-white mt-0.5 capitalize">
                    {pet.mood === 'happy' ? '😄 Hân Hoan' : pet.mood === 'neutral' ? '😐 Bình Hòa' : '😢 U Uất'}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase text-slate-400 font-bold">Cho ăn gần cuối</span>
                  <span className="font-semibold text-slate-300 block mt-0.5">
                    {pet.lastFed ? new Date(pet.lastFed).toLocaleDateString('vi-VN') : 'Chưa rõ'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-synth-text-muted italic py-6 text-center w-full">
              Học sinh chưa kích hoạt Thú cưng đồng hành.
            </p>
          )}
        </div>
      </div>

      {/* 3. Biểu đồ Mastery chuyên đề */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
        <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
          📊 Tiến Độ Học Tập Chuyên Đề (Mastery Breakdown)
        </h4>
        <div className="h-64 w-full text-xs">
          {Object.keys(categoryStats).length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(categoryStats).map((stat: any) => ({
                name: stat.name,
                correct: stat.correct,
                total: stat.total
              }))}>
                <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} />
                <YAxis stroke="#888888" fontSize={9} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181b2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="correct" name="Đúng" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={30} />
                <Bar dataKey="total" name="Tổng" fill="#334155" radius={[6, 6, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-synth-text-muted">
              Học sinh chưa bắt đầu làm bài luyện tập.
            </div>
          )}
        </div>
      </div>

      {/* 4. Quản Lý Phúc Lợi & Duyệt Đổi Quà (Nằm trong Học Tịch) */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5">
        <RewardManager
          viewingStudentId={studentUser?.id}
          activeRewardCatalog={activeRewardCatalog}
          activeRedemptions={activeRedemptions}
          canApproveReward={canApproveReward}
          addParentReward={addParentReward}
          deleteParentReward={deleteParentReward}
          markRewardDelivered={markRewardDelivered}
          cancelRedemption={cancelRedemption}
          adminMarkRewardDelivered={adminMarkRewardDelivered}
          adminCancelRedemption={adminCancelRedemption}
        />
      </div>

      {/* 5. Cáo Thị Nhiệm Vụ */}
      {studentUser?.id && (
        <div className="glass-panel rounded-2xl border border-white/5 p-5">
          <QuestManager
            parentQuests={parentQuests}
            canCreateMission={canCreateMission}
            addParentQuest={addParentQuest}
            completeParentQuest={completeParentQuest}
            deleteParentQuest={deleteParentQuest}
          />
        </div>
      )}

      {/* 6. Nhật Ký Hoạt Động & Hàng Đợi Skip Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hàng đợi Phản hồi Skip (Closed-loop Review) */}
        {isParentRole(currentUser?.role) ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col h-[350px]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider flex items-center gap-1.5">
                ⚠️ Hàng đợi phản hồi Bỏ qua (Skip Reviews)
              </h4>
              <button
                onClick={() => {
                  if (studentUser?.id) {
                    fetchSkipReviews(studentUser.id);
                  }
                }}
                className="px-2 py-0.5 rounded border border-synth-orange/30 text-synth-orange text-[9px] font-orbitron font-bold hover:bg-synth-orange/10 cursor-pointer transition-colors"
              >
                Tải Lại
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2.5 text-xs pr-1">
              {!skipReviews || skipReviews.length === 0 ? (
                <div className="h-full flex items-center justify-center text-synth-text-muted text-center py-8 italic">
                  Chưa có phản hồi bỏ qua câu hỏi nào chờ xem duyệt.
                </div>
              ) : (
                skipReviews.map((review: any) => (
                  <div key={review.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-white max-w-xs break-words block">
                        {review.question_prompt}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-orbitron uppercase bg-red-500/20 text-red-400 border border-red-500/30 whitespace-nowrap">
                        {review.reason}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-synth-text-muted">
                      <span>{new Date(review.created_at).toLocaleString('vi-VN')}</span>
                      <button
                        disabled={resolvingReviewIds[review.id]}
                        onClick={async () => {
                          if (resolvingReviewIds[review.id]) return;
                          setResolvingReviewIds(prev => ({ ...prev, [review.id]: true }));
                          try {
                            const ok = await resolveSkipReview(review.id);
                            if (ok) {
                              toast.success('Đã xác nhận phản hồi bỏ qua.');
                            }
                          } catch (err) {
                            console.error(err);
                            toast.error('Không thể lưu xác nhận.');
                          } finally {
                            setResolvingReviewIds(prev => ({ ...prev, [review.id]: false }));
                          }
                        }}
                        className="px-2 py-1 rounded bg-synth-green text-black font-black uppercase text-[8px] font-orbitron cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {resolvingReviewIds[review.id] ? 'Đang duyệt...' : 'Đã Xem ✓'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col h-[350px] items-center justify-center text-center text-xs text-slate-400">
            <span>🔒 Chỉ phụ huynh mới xem được hàng đợi Skip Reviews.</span>
          </div>
        )}

        {/* Nhật ký hoạt động học tập */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col h-[350px]">
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
            Nhật ký 50 hoạt động học tập gần nhất
          </h4>
          <div className="flex-1 overflow-y-auto space-y-2.5 text-xs pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-synth-text-muted italic">
                Chưa ghi nhận hoạt động học tập nào.
              </div>
            ) : (
              logs.slice(0, 50).map((log: any) => (
                <div key={log.id} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white capitalize">{log.actionType || 'Học tập'}</span>
                    <span className="text-[10px] text-synth-text-muted">
                      {new Date(log.timestamp).toLocaleString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{log.description}</p>
                  <div className="flex gap-4 text-[10px] font-bold font-orbitron">
                    {log.xpAwarded !== 0 && (
                      <span className={log.xpAwarded > 0 ? 'text-synth-green' : 'text-red-400'}>
                        {log.xpAwarded > 0 ? '+' : ''}{log.xpAwarded} XP
                      </span>
                    )}
                    {log.coinsAwarded !== 0 && (
                      <span className={log.coinsAwarded > 0 ? 'text-synth-orange' : 'text-red-400'}>
                        {log.coinsAwarded > 0 ? '+' : ''}{log.coinsAwarded} NP
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
