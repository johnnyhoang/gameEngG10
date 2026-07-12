import React, { useState, useEffect } from 'react';
import { Check, X, SlidersHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { isParentRole } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';

interface StudentProfileViewProps {
  currentUser: any;
  selectedStudentProfile: any;
  gameSettings: any;
  canApproveReward: boolean;
  canManageEnergy: boolean;
  skipReviews: any[];
  adminMarkRewardDelivered: (studentId: string, redemptionId: string) => Promise<void>;
  adminCancelRedemption: (studentId: string, redemptionId: string) => Promise<void>;
  adminSetEnergy: (studentId: string, targetPercent: number) => Promise<void>;
  adminSetEnergyConfig: (studentId: string, maxEnergy: number, resetHours: 2 | 3 | 5) => Promise<void>;
  fetchSkipReviews: (studentId: string) => Promise<void>;
  resolveSkipReview: (reviewId: string) => Promise<boolean>;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  currentUser,
  selectedStudentProfile,
  canApproveReward,
  canManageEnergy,
  skipReviews,
  adminMarkRewardDelivered,
  adminCancelRedemption,
  adminSetEnergy,
  adminSetEnergyConfig,
  fetchSkipReviews,
  resolveSkipReview
}) => {
  // Chân Khí v2 (SUB_SPEC_ENERGY §2): maxEnergy/resetHours là cấu hình RIÊNG của con này, không còn đọc gameSettings global.
  const maxE = selectedStudentProfile?.player?.maxEnergy ?? 100;
  const [studentEnergyPercent, setStudentEnergyPercent] = useState(100);
  const [maxEnergyInput, setMaxEnergyInput] = useState(100);
  const [resetHoursInput, setResetHoursInput] = useState<2 | 3 | 5>(3);

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
          Chọn tài khoản môn sinh tại tab <strong className="text-synth-magenta">🏛️ Chính Điện</strong> (bấm "Xem Hoạt Động") để theo dõi báo cáo, tiến độ và nạp chân khí.
        </p>
      </div>
    );
  }

  const { studentUser, player, pet, categoryStats = {}, rewardRedemptions = [], logs = [] } = selectedStudentProfile;

  return (
    <div className="space-y-6">
      {/* 1. Header Profile */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/5 p-5 rounded-2xl">
        <div className="flex items-center gap-4">
          <img 
            src={studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
            alt={studentUser?.name} 
            className="w-16 h-16 rounded-full border-2 border-synth-magenta/30"
          />
          <div>
            <h3 className="font-orbitron font-bold text-base text-white">{studentUser?.name}</h3>
            <p className="text-xs text-synth-text-muted font-mono">{studentUser?.email}</p>
          </div>
        </div>

        {/* Quick parameters display */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 text-xs">
          <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-[9px] uppercase text-synth-text-muted">Cấp Độ</span>
            <span className="font-orbitron font-black text-synth-magenta text-sm">LV.{player?.level || 1}</span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-[9px] uppercase text-synth-text-muted">Ngân Lượng (NP)</span>
            <span className={`font-orbitron font-black text-sm ${(player?.coins || 0) < 0 ? 'text-red-400' : 'text-synth-orange'}`}>
              {player?.coins || 0} NP
            </span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-[9px] uppercase text-synth-text-muted">Tích Lũy Chân Lý</span>
            <span className="font-orbitron font-black text-synth-green text-sm">{player?.xp || 0} XP</span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-2 text-center">
            <span className="block text-[9px] uppercase text-synth-text-muted">Chuỗi ngày</span>
            <span className="font-orbitron font-black text-orange-400 text-sm">{player?.streak || 0} ngày</span>
          </div>
        </div>
      </div>

      {/* 2. Nạp Chân Khí & Thú Cưng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nạp Chân Khí (Energy Control) */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              ⚡ Nạp Chân Khí cho Môn Sinh
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            Nạp đầy chân khí để con có năng lượng hoàn thành các đảo thử thách. Chân khí hiện tại: <strong className="text-synth-cyan">{player?.energy || 0}/{maxE}</strong>.
          </p>

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
              await adminSetEnergy(selectedStudentProfile.studentUser.id, studentEnergyPercent);
              toast.success(`Đã nạp chân khí lên ${studentEnergyPercent}% thành công!`);
            }}
            disabled={!canManageEnergy}
            className="w-full py-2 bg-synth-cyan text-black font-bold rounded-lg hover:synth-glow-cyan transition-all text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nạp chân khí ⚡
          </button>

          {/* Cấu hình Trần Chân Khí + giờ hồi RIÊNG cho con này (SUB_SPEC_ENERGY §2) */}
          <div className="pt-3 mt-1 border-t border-white/5 space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-synth-text-muted">
              ⚙️ Cấu Hình Riêng Cho Con Này
            </h5>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs">
                <span className="block text-synth-text-muted font-semibold">Trần Chân Khí (50-300)</span>
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
                await adminSetEnergyConfig(selectedStudentProfile.studentUser.id, maxEnergyInput, resetHoursInput);
              }}
              disabled={!canManageEnergy}
              className="w-full py-2 border border-synth-cyan/40 text-synth-cyan font-bold rounded-lg hover:bg-synth-cyan/10 transition-all text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lưu cấu hình Chân Khí
            </button>
            {!canManageEnergy && (
              <p className="text-[9px] text-yellow-500/80 italic mt-2 leading-tight">
                ⚠️ Tài khoản của bạn hiện là Chủ nhiệm phụ, chỉ Chủ nhiệm chính mới có quyền thay đổi Chân khí của học sinh này.
              </p>
            )}
          </div>
        </div>

        {/* Pet stable information */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5">
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
            🐷 Linh Thú Hộ Vệ (Pet Stable)
          </h4>
          {pet ? (
            <div className="flex items-center gap-4 text-xs">
              <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-4xl shrink-0">
                {pet.stage === 'egg' ? '🥚' : pet.stage === 'baby' ? '🐷' : '🐗'}
              </div>
              <div className="space-y-1.5 flex-1">
                <div>
                  <span className="text-synth-text-muted">Tên linh thú: </span>
                  <span className="font-bold text-white">{pet.name}</span>
                </div>
                <div>
                  <span className="text-synth-text-muted">Cấp độ: </span>
                  <span className="font-bold text-white">LV.{pet.level}</span>
                </div>
                <div>
                  <span className="text-synth-text-muted">Tâm trạng: </span>
                  <span className="font-bold text-white capitalize">{pet.mood}</span>
                </div>
                <div>
                  <span className="text-synth-text-muted">Cho ăn lần cuối: </span>
                  <span className="font-semibold text-slate-300">
                    {pet.lastFed ? new Date(pet.lastFed).toLocaleDateString('vi-VN') : 'Chưa rõ'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-synth-text-muted italic py-6 text-center">
              Thiếu hiệp chưa kích hoạt Linh Thú Hộ Vệ.
            </p>
          )}
        </div>
      </div>

      {/* 3. Biểu đồ Mastery chuyên đề */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
        <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
          📊 Tiến Độ Tinh Tấn Chuyên Đề (Mastery Breakdown)
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
                <Bar dataKey="correct" name="Đúng" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Tổng" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-synth-text-muted">
              Thiếu hiệp chưa bắt đầu làm bài luyện công.
            </div>
          )}
        </div>
      </div>

      {/* 4. Nhật Ký Đổi Quà & Hàng Đợi Skip Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nhật ký đổi quà tiêu vặt */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 flex flex-col h-[350px]">
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
            Nhật ký đổi quà tiêu vặt
          </h4>
          <div className="flex-1 overflow-y-auto space-y-2.5 text-xs pr-1">
            {rewardRedemptions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-synth-text-muted text-center py-12">
                Con chưa đổi phần quà nào.
              </div>
            ) : (
              rewardRedemptions.map((rr: any) => (
                <div key={rr.id} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">{rr.rewardTitle}</span>
                    <span className="text-[10px] text-synth-text-muted">
                      {new Date(rr.timestamp).toLocaleString('vi-VN')}
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1 shrink-0">
                    <span className="font-bold block text-synth-orange">{rr.costCoins} NP</span>
                    {rr.status === 'pending' ? (
                      !canApproveReward ? (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-black uppercase font-orbitron bg-white/10 text-slate-400 mt-1">
                          Chờ duyệt
                        </span>
                      ) : (
                        <div className="flex gap-1 mt-1">
                          <button
                            onClick={() => {
                              if (studentUser?.id) {
                                adminMarkRewardDelivered(studentUser.id, rr.id);
                              }
                            }}
                            className="p-1 rounded bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all"
                            title="Xác nhận đã trao quà thật cho con"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (studentUser?.id) {
                                adminCancelRedemption(studentUser.id, rr.id);
                              }
                            }}
                            className="p-1 rounded border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10 transition-all"
                            title="Hủy lượt đổi, hoàn trả xu NP lại cho con"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-black uppercase font-orbitron bg-green-500/20 text-green-400">
                        Đã trao ✓
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hàng đợi Phản hồi Skip (Closed-loop Review) */}
        {isParentRole(currentUser?.role) && (
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
                        onClick={async () => {
                          const ok = await resolveSkipReview(review.id);
                          if (ok) {
                            toast.success('Đã xác nhận phản hồi bỏ qua.');
                          }
                        }}
                        className="px-2 py-1 rounded bg-synth-green text-black font-black uppercase text-[8px] font-orbitron cursor-pointer transition-all"
                      >
                        Đã Xem ✓
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Nhật ký 50 hoạt động học tập gần nhất */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
        <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
          Nhật ký 50 hoạt động học tập gần nhất
        </h4>
        <div className="overflow-y-auto max-h-60 space-y-2.5 text-xs pr-1">
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
  );
};
