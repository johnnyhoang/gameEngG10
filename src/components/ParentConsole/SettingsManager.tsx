import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, BookOpen, BarChart as ChartIcon, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SUBJECTS_CONFIG, getStudentRankForLevel } from '../../types/game';
import { isAdmin, isSuperAdmin } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';

interface SettingsManagerProps {
  currentUser: any;
  adminStudents: any[];
  questions: any[];
  gameSettings: any;
  updateGameSettings: (settings: any) => Promise<void>;
  addHandbookPage: (page: any) => void;
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  currentUser,
  adminStudents,
  questions,
  gameSettings,
  updateGameSettings,
  addHandbookPage,
  auditLogs,
  fetchAuditLogs
}) => {
  // Cấu hình game settings
  const [bossBonusEasy, setBossBonusEasy] = useState(gameSettings?.bossCompletionBonusNP?.[0] ?? 100);
  const [bossBonusMedium, setBossBonusMedium] = useState(gameSettings?.bossCompletionBonusNP?.[1] ?? 150);
  const [bossBonusHard, setBossBonusHard] = useState(gameSettings?.bossCompletionBonusNP?.[2] ?? 200);
  const [challengeCost1, setChallengeCost1] = useState(gameSettings?.challengeEnergyCosts?.[0] ?? 30);
  const [challengeCost2, setChallengeCost2] = useState(gameSettings?.challengeEnergyCosts?.[1] ?? 30);
  const [challengeCost3, setChallengeCost3] = useState(gameSettings?.challengeEnergyCosts?.[2] ?? 30);
  const [challengeCost4, setChallengeCost4] = useState(gameSettings?.challengeEnergyCosts?.[3] ?? 30);
  const [baseXPVal, setBaseXPVal] = useState(gameSettings?.baseXP ?? 15);
  const [baseCoinsVal, setBaseCoinsVal] = useState(gameSettings?.baseCoins ?? 5);

  // Cẩm nang bí lục
  const [hbCategory, setHbCategory] = useState('Dặn Dò của Viện Chủ');
  const [hbTitle, setHbTitle] = useState('');
  const [hbContent, setHbContent] = useState('');

  const handleSaveSettings = async () => {
    await updateGameSettings({
      bossCompletionBonusNP: [bossBonusEasy, bossBonusMedium, bossBonusHard],
      challengeEnergyCosts: [challengeCost1, challengeCost2, challengeCost3, challengeCost4],
      baseXP: baseXPVal,
      baseCoins: baseCoinsVal
    });
    toast.success('Đã lưu cấu hình hoạt động của game thành công!');
  };

  const totalQuestions = questions.length;
  const subjectQuestionStats = useMemo(() => {
    return Object.values(SUBJECTS_CONFIG).map(sub => {
      const count = questions.filter(q => q.subject === sub.id).length;
      return {
        name: sub.name,
        icon: sub.icon,
        color: sub.color,
        count
      };
    });
  }, [questions]);

  const nonAdminStudents = useMemo(() => {
    return adminStudents.filter((s: any) => !isAdmin(s.role));
  }, [adminStudents]);

  const totalStudents = nonAdminStudents.length;
  const totalXP = nonAdminStudents.reduce((acc, s) => acc + (s.player?.xp || 0), 0);
  const totalCoins = nonAdminStudents.reduce((acc, s) => acc + (s.player?.coins || 0), 0);
  const avgLevel = totalStudents > 0
    ? Math.round(nonAdminStudents.reduce((acc, s) => acc + (s.player?.level || 1), 0) / totalStudents)
    : 0;

  const sortedStudents = useMemo(() => {
    return [...nonAdminStudents].sort((a, b) => (b.player?.level || 1) - (a.player?.level || 1));
  }, [nonAdminStudents]);

  return (
    <div className="space-y-6">
      {/* 1. Cấu hình game settings (Thiên Cơ Các — CORE_SPECS §2.1) */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
          <h3 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
            ⚙️ Quy Tắc Hoạt Động — Thiết lập nạp Chân Khí & Bonus Boss
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="space-y-2 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Bonus Boss — Đề Dễ (NP)</span>
            <input
              type="number"
              min={0}
              step={10}
              value={bossBonusEasy}
              onChange={(e) => setBossBonusEasy(Number(e.target.value) || 0)}
              className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </label>
          <label className="space-y-2 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Bonus Boss — Đề Trung Bình (NP)</span>
            <input
              type="number"
              min={0}
              step={10}
              value={bossBonusMedium}
              onChange={(e) => setBossBonusMedium(Number(e.target.value) || 0)}
              className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </label>
          <label className="space-y-2 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Bonus Boss — Đề Khó (NP)</span>
            <input
              type="number"
              min={0}
              step={10}
              value={bossBonusHard}
              onChange={(e) => setBossBonusHard(Number(e.target.value) || 0)}
              className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Đảo 1', value: challengeCost1, setter: setChallengeCost1 },
            { label: 'Đảo 2', value: challengeCost2, setter: setChallengeCost2 },
            { label: 'Đảo 3', value: challengeCost3, setter: setChallengeCost3 },
            { label: 'Đảo 4', value: challengeCost4, setter: setChallengeCost4 }
          ].map(item => (
            <label key={item.label} className="space-y-2 text-xs">
              <span className="block text-synth-text-muted font-bold uppercase tracking-wider">{item.label} cost (Chân khí)</span>
              <input
                type="number"
                min={0}
                step={1}
                value={item.value}
                onChange={(e) => item.setter(Number(e.target.value) || 0)}
                className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Điểm XP cơ bản / Câu đúng</span>
            <input
              type="number"
              min={1}
              step={1}
              value={baseXPVal}
              onChange={(e) => setBaseXPVal(Number(e.target.value) || 15)}
              className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </label>
          <label className="space-y-2 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Điểm Coins cơ bản (NP) / Câu đúng</span>
            <input
              type="number"
              min={1}
              step={1}
              value={baseCoinsVal}
              onChange={(e) => setBaseCoinsVal(Number(e.target.value) || 5)}
              className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white/5 rounded-xl border border-white/5 p-4">
          <p className="text-[10px] text-synth-text-muted leading-relaxed">
            Các cấu hình này áp dụng chung cho tất cả thiếu hiệp (Đảo thử thách và lượng điểm nhận được). Riêng Trần Chân Khí + giờ hồi thì chỉnh RIÊNG cho từng con tại tab 🏛️ Thân Phận → xem hồ sơ con.
          </p>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2.5 rounded-xl bg-synth-cyan text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-cyan transition-all shrink-0 cursor-pointer"
          >
            Lưu cấu hình quy tắc
          </button>
        </div>
      </div>

      {/* 2. Cẩm Nang Bí Lục Management Panel */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-synth-magenta" />
          <h3 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
            📖 Cẩm Nang Bí Lục — Sổ tay dặn dò & Giang Hồ Quy Tắc
          </h3>
        </div>

        <div className="bg-synth-gray/10 p-4 rounded-xl border border-white/5">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Nạp thêm trang dặn dò / quy định mới 📜
          </h4>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!hbTitle || !hbContent) {
                toast.error('Vui lòng điền tiêu đề và nội dung trang sách!');
                return;
              }
              addHandbookPage({
                category: hbCategory,
                title: hbTitle,
                content: hbContent
              });
              toast.success('Đã nạp thêm trang dặn dò thành công vào cẩm nang của thiếu hiệp! ✍️');
              setHbTitle('');
              setHbContent('');
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="space-y-1">
                <span className="text-synth-text-muted font-semibold block">Chương (Category)</span>
                <select
                  value={hbCategory}
                  onChange={(e) => setHbCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta cursor-pointer text-xs"
                >
                  <option value="Dặn Dò của Viện Chủ">Dặn Dò của Viện Chủ 👑</option>
                  <option value="Võ Học & Tinh Tấn">Võ Học & Tinh Tấn ⚔️</option>
                  <option value="Đấu Trường Kỳ Ngộ">Đấu Trường Kỳ Ngộ 🏟️</option>
                  <option value="Giang Hồ Quy Tắc">Giang Hồ Quy Tắc 📜</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-synth-text-muted font-semibold block">Tiêu đề trang</span>
                <input
                  type="text"
                  value={hbTitle}
                  onChange={(e) => setHbTitle(e.target.value)}
                  placeholder="Ví dụ: Quy tắc phân bổ NP, Nhắc nhở kỷ luật"
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs"
                />
              </label>
            </div>
            <label className="space-y-1 text-xs block">
              <span className="text-synth-text-muted font-semibold block">Nội dung bài viết (Markdown / Text)</span>
              <textarea
                value={hbContent}
                onChange={(e) => setHbContent(e.target.value)}
                placeholder="Nhập nội dung dặn dò chi tiết tại đây..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs h-24 resize-none"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/80 transition-colors uppercase text-xs cursor-pointer"
            >
              Nạp trang sách ✍️
            </button>
          </form>
        </div>
      </div>

      {/* 3. Thống Kê Thống Kê Toàn Viện */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-6">
        <div className="flex items-center gap-2">
          <ChartIcon className="w-4 h-4 text-synth-cyan" />
          <h3 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">
            📊 Thiên Cơ Các — Báo cáo & Thống kê toàn viện
          </h3>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase text-slate-400 font-bold font-orbitron">Tổng Số Thiếu Hiệp</span>
            <span className="text-2xl font-black text-synth-cyan font-orbitron mt-1">{totalStudents}</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase text-slate-400 font-bold font-orbitron">Cấp Độ Trung Bình</span>
            <span className="text-2xl font-black text-synth-magenta font-orbitron mt-1">LV.{avgLevel}</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase text-slate-400 font-bold font-orbitron">Tổng XP Tích Lũy</span>
            <span className="text-2xl font-black text-synth-green font-orbitron mt-1">{totalXP.toLocaleString()}</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase text-slate-400 font-bold font-orbitron">Tổng Ngân Sách (NP)</span>
            <span className="text-2xl font-black text-synth-orange font-orbitron mt-1">{totalCoins.toLocaleString()}</span>
          </div>
        </div>

        {/* Chart & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/5 rounded-xl p-4 lg:col-span-2 space-y-4">
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              Mật Độ Câu Hỏi Trong Vạn Quyển Các
            </h4>
            <div className="h-64 w-full text-xs">
              {totalQuestions > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectQuestionStats}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} />
                    <YAxis stroke="#888888" fontSize={9} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="count" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-synth-text-muted">
                  Vạn Quyển Các chưa được nạp câu hỏi nào.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              Kho Tàng Tri Thức (Tỷ Lệ Môn)
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {subjectQuestionStats.map(stat => {
                const percent = totalQuestions > 0 ? Math.round((stat.count / totalQuestions) * 100) : 0;
                return (
                  <div key={stat.name} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-300">
                      <span className="flex items-center gap-1">
                        <span>{stat.icon}</span>
                        <span>{stat.name}</span>
                      </span>
                      <span>{stat.count} câu ({percent}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percent}%`, backgroundColor: stat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-4">
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
            Bảng Tinh Anh Thiếu Hiệp (Xếp Hạng Tu Học)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-orbitron uppercase text-[9px] tracking-wider">
                  <th className="py-2.5 px-3">Xếp hạng</th>
                  <th className="py-2.5 px-3">Thiếu Hiệp</th>
                  <th className="py-2.5 px-3">Vai Trò</th>
                  <th className="py-2.5 px-3">Cấp Độ</th>
                  <th className="py-2.5 px-3">Danh Hiệu Kiếm Hiệp</th>
                  <th className="py-2.5 px-3">Chuỗi Ngày</th>
                  <th className="py-2.5 px-3 text-right">Tích Lũy XP</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-synth-text-muted">
                      Chưa có tài khoản thiếu hiệp nào đăng ký học viện.
                    </td>
                  </tr>
                ) : (
                  sortedStudents.map((stud, idx) => {
                    const lv = stud.player?.level || 1;
                    const studentRank = getStudentRankForLevel(lv);
                    return (
                      <tr key={stud.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-orbitron font-bold text-slate-400">#{idx + 1}</td>
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <img 
                            src={stud.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={stud.name} 
                            className="w-5 h-5 rounded-full"
                          />
                          {stud.name}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] ${
                            isSuperAdmin(stud.role) ? 'bg-synth-magenta/20 text-synth-magenta' : stud.role === 'pho_vien' ? 'bg-synth-yellow/20 text-synth-yellow' : 'bg-synth-cyan/20 text-synth-cyan'
                          }`}>
                            {isSuperAdmin(stud.role) ? 'Viện Trưởng 👑' : stud.role === 'pho_vien' ? 'Phó Viện 🛡️' : 'Thiếu Hiệp'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-orbitron font-black text-synth-magenta">LV.{lv}</td>
                        <td className="py-2.5 px-3 font-bold text-synth-orange">
                          {studentRank.icon} {studentRank.name}
                        </td>
                        <td className="py-2.5 px-3 text-orange-400 font-semibold">{stud.player?.streak || 0} Ngày</td>
                        <td className="py-2.5 px-3 text-right font-orbitron text-synth-green font-bold">
                          {stud.player?.xp || 0} XP
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Nhật Ký Quyết Nghị Viện Chủ (Audit Logs) (Chỉ Viện Trưởng xem được) */}
      {currentUser?.role === 'truong_vien' && (
        <div className="bg-synth-gray/10 rounded-xl p-4 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-synth-magenta" /> 📜 Nhật Ký Quyết Nghị Viện Chủ (Audit Logs)
            </h4>
            <button
              onClick={() => fetchAuditLogs()}
              className="px-2 py-1 rounded bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[9px] font-orbitron font-bold uppercase tracking-wider hover:bg-synth-magenta/40 transition-all cursor-pointer"
            >
              Tải Lại Nhật Ký
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 font-orbitron text-[9px] uppercase tracking-wider text-synth-text-muted">
                  <th className="py-2.5 px-3">Thời gian</th>
                  <th className="py-2.5 px-3">Người thực hiện</th>
                  <th className="py-2.5 px-3">Vai trò</th>
                  <th className="py-2.5 px-3">Hành động</th>
                  <th className="py-2.5 px-3">Đối tượng</th>
                  <th className="py-2.5 px-3">Chi tiết quyết định</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs && auditLogs.length > 0 ? (
                  auditLogs.map((log: any) => {
                    let actionBadgeColor = 'bg-white/10 text-slate-300';
                    let actionName = log.action;
                    
                    if (log.action === 'approve_reward') {
                      actionBadgeColor = 'bg-synth-green/10 text-synth-green border border-synth-green/20';
                      actionName = 'Duyệt Đổi Quà';
                    } else if (log.action === 'cancel_redemption') {
                      actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                      actionName = 'Hủy Đổi Quà';
                    } else if (log.action === 'refill_energy') {
                      actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                      actionName = 'Nạp Năng Lượng';
                    } else if (log.action === 'promote_user') {
                      actionBadgeColor = 'bg-synth-yellow/10 text-synth-yellow border border-synth-yellow/20';
                      actionName = 'Bổ Nhiệm Quyền';
                    } else if (log.action === 'update_pin') {
                      actionBadgeColor = 'bg-synth-magenta/10 text-synth-magenta border border-synth-magenta/20';
                      actionName = 'Đổi PIN Bảo Mật';
                    } else if (log.action === 'invite_secondary_parent') {
                      actionBadgeColor = 'bg-synth-purple/10 text-synth-purple border border-synth-purple/20';
                      actionName = 'Mời Phụ Huynh Phụ';
                    } else if (log.action === 'update_secondary_permissions') {
                      actionBadgeColor = 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
                      actionName = 'Sửa Quyền Phụ';
                    }

                    let detailText = '';
                    try {
                      const p = typeof log.payload === 'string' ? JSON.parse(log.payload) : log.payload;
                      if (log.action === 'approve_reward') {
                        detailText = `Xác nhận trao quà "${p.rewardTitle || 'Quà'}"`;
                      } else if (log.action === 'cancel_redemption') {
                        detailText = `Hủy đổi "${p.rewardTitle || 'Quà'}", hoàn trả ${p.refundNP} NP`;
                      } else if (log.action === 'refill_energy') {
                        detailText = `Nạp đầy Chân Khí lên ${p.targetEnergy}%`;
                      } else if (log.action === 'promote_user') {
                        detailText = `Bổ nhiệm thân phận mới: ${p.targetRole === 'pho_vien' ? 'Phó Viện 🛡️' : p.targetRole === 'parent' ? 'Phụ Huynh' : 'Thiếu Hiệp'}`;
                      } else if (log.action === 'update_pin') {
                        detailText = 'Cập nhật mã PIN bảo mật cá nhân thành công';
                      } else if (log.action === 'invite_secondary_parent') {
                        detailText = 'Gửi thư mời làm Phụ huynh Phụ cùng quản lý';
                      } else if (log.action === 'update_secondary_permissions') {
                        const rights = [];
                        if (p.permissions?.can_approve_rewards) rights.push('Duyệt quà');
                        if (p.permissions?.can_create_missions) rights.push('Giao NV');
                        detailText = `Cập nhật quyền hạn: [${rights.join(', ') || 'Chỉ xem'}]`;
                      } else {
                        detailText = JSON.stringify(p);
                      }
                    } catch (e) {
                      detailText = typeof log.payload === 'string' ? log.payload : JSON.stringify(log.payload);
                    }

                    return (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors text-[11px]">
                        <td className="py-2 px-3 text-[10px] text-synth-text-muted font-mono whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString('vi-VN')}
                        </td>
                        <td className="py-2 px-3 font-bold text-white">
                          {log.actor_name}
                        </td>
                        <td className="py-2 px-3">
                          <span className={`text-[9px] font-black uppercase font-orbitron ${
                            log.actor_role === 'truong_vien' ? 'text-synth-magenta' : log.actor_role === 'pho_vien' ? 'text-synth-yellow' : 'text-synth-cyan'
                          }`}>
                            {log.actor_role === 'truong_vien' ? 'Viện Trưởng' : log.actor_role === 'pho_vien' ? 'Phó Viện' : 'Phụ Huynh'}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-orbitron ${actionBadgeColor}`}>
                            {actionName}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-semibold text-synth-cyan whitespace-nowrap">
                          {log.target_name || log.target_id || '—'}
                        </td>
                        <td className="py-2 px-3 text-slate-300 max-w-xs truncate" title={detailText}>
                          {detailText}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-synth-text-muted italic">
                      Chưa ghi nhận hoạt động quyết nghị nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
