import React, { useState, useEffect, useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isAdmin, isParentRole } from '../utils/roleHelpers';
import { toast } from '../utils/toast';

// Import child managers
import { AdminConnectionManager } from './ParentConsole/AdminConnectionManager';
import { ProfilePage } from './ProfilePage';
import { ClassLinksManager } from './ParentConsole/ClassLinksManager';
import { SettingsManager } from './ParentConsole/SettingsManager';
import { StudentProfileView } from './ParentConsole/StudentProfileView';
import { QuestionBankManager } from './ParentConsole/QuestionBankManager';
import { LectureBankManager } from './ParentConsole/LectureBankManager';
import { OrgChart } from './ParentConsole/OrgChart';
import { StudentDirectory } from './ParentConsole/StudentDirectory';
import { RoleManager } from './ParentConsole/RoleManager';
import { VicePrincipalApplicationsManager } from './ParentConsole/VicePrincipalApplicationsManager';

export const ParentConsole: React.FC = () => {
  const markRewardDelivered = useGameState(state => state.markRewardDelivered);
  const cancelRedemption = useGameState(state => state.cancelRedemption);
  const addParentReward = useGameState(state => state.addParentReward);
  const deleteParentReward = useGameState(state => state.deleteParentReward);

  // Admin and member management states
  const currentUser = useGameState(state => state.currentUser);
  const adminStudents = useGameState(state => state.adminStudents);
  const adminLinks = useGameState(state => state.adminLinks);
  const selectedStudentProfile = useGameState(state => state.selectedStudentProfile);
  const fetchAdminStudents = useGameState(state => state.fetchAdminStudents);
  const fetchStudentProfile = useGameState(state => state.fetchStudentProfile);
  const adminMarkRewardDelivered = useGameState(state => state.adminMarkRewardDelivered);
  const adminCancelRedemption = useGameState(state => state.adminCancelRedemption);
  const showHelp = useGameState(state => state.showHelp);
  const adminSetEnergy = useGameState(state => state.adminSetEnergy);
  const adminSetEnergyConfig = useGameState(state => state.adminSetEnergyConfig);
  const updateGameSettings = useGameState(state => state.updateGameSettings);
  const gameSettings = useGameState(state => state.gameSettings);
  const questions = useGameState(state => state.questions || []);
  const deleteQuestion = useGameState(state => state.deleteQuestion);
  const updateQuestion = useGameState(state => state.updateQuestion);
  const importQuestions = useGameState(state => state.importQuestions);
  const addQuestion = useGameState(state => state.addQuestion);
  const addHandbookPage = useGameState(state => state.addHandbookPage);

  const parentQuests = useGameState(state => state.parentQuests || []);
  const addParentQuest = useGameState(state => state.addParentQuest);
  const completeParentQuest = useGameState(state => state.completeParentQuest);
  const deleteParentQuest = useGameState(state => state.deleteParentQuest);
  const auditLogs = useGameState(state => state.auditLogs || []);
  const fetchAuditLogs = useGameState(state => state.fetchAuditLogs);
  const skipReviews = useGameState(state => state.skipReviews || []);
  const fetchSkipReviews = useGameState(state => state.fetchSkipReviews);
  const resolveSkipReview = useGameState(state => state.resolveSkipReview);

  // Class Links Management
  const classLinks = useGameState(state => state.classLinks);
  const secondaryParents = useGameState(state => state.secondaryParents);
  const sendClassInvite = useGameState(state => state.sendClassInvite);
  const respondClassInvite = useGameState(state => state.respondClassInvite);
  const inviteSecondary = useGameState(state => state.inviteSecondary);
  const inviteSecondaryRequest = useGameState(state => state.inviteSecondaryRequest);
  const updateSecondaryPermissions = useGameState(state => state.updateSecondaryPermissions);
  const leaveClass = useGameState(state => state.leaveClass);
  const applyVicePrincipal = useGameState(state => state.applyVicePrincipal);
  const inviteAdminConnection = useGameState(state => state.inviteAdminConnection);
  const uiTheme = useGameState(state => state.uiTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);

  // Tab chính đọc từ store — nav chính nằm trên TopHUD (thanh MIKAWAII), không còn nav riêng trong trang
  const activeTab = useGameState(state => state.parentConsoleTab);
  const setActiveTab = useGameState(state => state.setParentConsoleTab);
  const [thienCoSubTab, setThienCoSubTab] = useState<'dashboard' | 'org_chart' | 'staff' | 'settings'>('dashboard');
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  // Filter students strictly by role for stats
  const allStudents = useMemo(() => {
    return adminStudents.filter((s: any) => s.role === 'student');
  }, [adminStudents]);

  // If teacher: filter students into "My Class" (Primary link) and "Co-managed Class" (Secondary link)
  const myClassStudents = useMemo(() => {
    if (isAdmin(currentUser?.role)) return allStudents;
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.parent_id === currentUser?.id && l.link_type === 'primary')
      .map((l: any) => l.student_id);
    return allStudents.filter((s: any) => studentIds.includes(s.id));
  }, [allStudents, adminLinks, currentUser?.id, currentUser?.role]);

  const coManagedClassStudents = useMemo(() => {
    if (isAdmin(currentUser?.role)) return [];
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.parent_id === currentUser?.id && l.link_type === 'secondary')
      .map((l: any) => l.student_id);
    return allStudents.filter((s: any) => studentIds.includes(s.id));
  }, [allStudents, adminLinks, currentUser?.id, currentUser?.role]);

  const combinedStudentsForStats = useMemo(() => {
    if (isAdmin(currentUser?.role)) return allStudents;
    const uniqueMap = new Map();
    [...myClassStudents, ...coManagedClassStudents].forEach(s => uniqueMap.set(s.id, s));
    return Array.from(uniqueMap.values());
  }, [currentUser?.role, allStudents, myClassStudents, coManagedClassStudents]);

  // adminStudents trả về từ /api/admin/users với các chỉ số PHẲNG (xp/level/ruby),
  // không lồng trong object `player` — đọc qua s.player sẽ luôn ra 0.
  const totalStudents = combinedStudentsForStats.length;
  const totalXP = combinedStudentsForStats.reduce((acc, s) => acc + (s.xp || 0), 0);
  const totalRuby = combinedStudentsForStats.reduce((acc, s) => acc + (s.ruby || 0), 0);
  const avgLevel = totalStudents > 0
    ? Math.round(combinedStudentsForStats.reduce((acc, s) => acc + (s.level || 1), 0) / totalStudents)
    : 0;
  const avgXP = totalStudents > 0 ? Math.round(totalXP / totalStudents) : 0;
  const avgRuby = totalStudents > 0 ? Math.round(totalRuby / totalStudents) : 0;
  const topStudentsByXP = useMemo(() => {
    return [...combinedStudentsForStats]
      .sort((a, b) => (b.xp || 0) - (a.xp || 0))
      .slice(0, 3);
  }, [combinedStudentsForStats]);
  const scopeLabel = isAdmin(currentUser?.role) ? 'Toàn Viện' : 'Cả Lớp';

  const [inspectLoading, setInspectLoading] = useState(false);

  // Load students list on mount for admin users
  // NOTE: fetchAdminStudents/fetchClassLinks intentionally NOT in deps — Zustand actions get new references
  // on every set() call, which would cause an infinite loop. We only re-run when role changes.
  useEffect(() => {
    const { fetchAdminStudents: fetchAdm, fetchClassLinks: fetchClass } = useGameState.getState();
    if (isAdmin(currentUser?.role)) {
      fetchAdm();
    }
    if (isParentRole(currentUser?.role) || isAdmin(currentUser?.role)) {
      fetchClass();
    }
  }, [currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { fetchAdminStudents: fetchAdm, fetchClassLinks: fetchClass } = useGameState.getState();
    fetchAdm();
    fetchClass();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeTab === 'thien_co_cac' && isAdmin(currentUser?.role)) {
      useGameState.getState().fetchAuditLogs();
    }
  }, [activeTab, currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (viewingStudentId && isParentRole(currentUser?.role)) {
      useGameState.getState().fetchSkipReviews(viewingStudentId);
    }
  }, [viewingStudentId, currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInspectStudent = async (studentId: string) => {
    setInspectLoading(true);
    setViewingStudentId(studentId);
    try {
      await fetchStudentProfile(studentId);
      setActiveTab('than_phan');
    } finally {
      setInspectLoading(false);
    }
  };

  // Phân quyền Chủ nhiệm phụ
  const currentStudentLink = classLinks.find(l => l.student_id === viewingStudentId && l.status === 'active');
  const isPrimaryLink = currentStudentLink?.link_type === 'primary';
  const isSecondaryLink = currentStudentLink?.link_type === 'secondary';

  const canApproveReward = isAdmin(currentUser?.role) || isPrimaryLink || (
    isSecondaryLink && currentStudentLink?.secondary_permissions?.can_approve_rewards
  );
  const canCreateMission = isAdmin(currentUser?.role) || isPrimaryLink || (
    isSecondaryLink && currentStudentLink?.secondary_permissions?.can_create_missions
  );
  const canManageEnergy = isAdmin(currentUser?.role) || isPrimaryLink;

  const activeRewardCatalog = selectedStudentProfile?.rewards || [];
  const activeRedemptions = selectedStudentProfile?.rewardRedemptions || [];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Nav chính đã dời lên TopHUD (thanh MIKAWAII); tiêu đề trang do heading từng tab đảm nhiệm */}

      {/* Inspected Student Banner — ẩn ở tab than_phan vì header hồ sơ đã hiển thị đủ danh tính + nút đổi học sinh */}
      {viewingStudentId && selectedStudentProfile && activeTab !== 'than_phan' && (
        <div className="glass-panel rounded-xl border border-synth-cyan/30 p-4 flex justify-between items-center bg-gradient-to-r from-synth-cyan/5 to-transparent">
          <div className="flex items-center gap-3">
            <img 
              src={selectedStudentProfile.studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
              alt={selectedStudentProfile.studentUser?.name}
              className="w-9 h-9 rounded-full border border-synth-cyan/40"
            />
            <div>
              <span className="text-[10px] text-synth-cyan uppercase font-bold tracking-wider font-orbitron">Đang quản lý tài khoản</span>
              <h4 className="font-bold text-white text-sm leading-tight mt-0.5">
                {selectedStudentProfile.studentUser?.name} ({selectedStudentProfile.studentUser?.email})
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('thien_co_cac');
              toast.success('Đã quay lại danh sách học sinh');
            }}
            className="px-3 py-1.5 rounded bg-synth-gray/30 border border-white/10 text-xs text-white hover:bg-white/10 font-bold cursor-pointer transition-colors"
          >
            Đổi học sinh khác
          </button>
        </div>
      )}

      {/* Tab Panels */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5">
        {activeTab === 'thien_co_cac' && (
          <div className="space-y-6">
            {/* Welcome & Dashboard: gọn một khối — lời chào ngắn + chỉ số + bảng vàng */}
            <div className="glass-panel rounded-2xl border border-synth-cyan/30 p-5 bg-gradient-to-r from-synth-cyan/10 via-transparent to-synth-magenta/5 relative overflow-hidden shadow-lg space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-synth-cyan/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 space-y-1">
                <h3 className="font-orbitron font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  ⚙️ PHÒNG HIỆU TRƯỞNG — TRUNG TÂM QUẢN TRỊ HỌC VIỆN
                  <button
                    onClick={() => showHelp('parent-console')}
                    className="w-5 h-5 rounded-full bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[10px] font-black flex items-center justify-center hover:bg-synth-magenta/40 cursor-pointer transition-colors shrink-0"
                    title="Xem hướng dẫn sử dụng"
                  >
                    ?
                  </button>
                </h3>
                <p className="text-xs text-synth-text-muted leading-relaxed max-w-4xl">
                  {isAdmin(currentUser?.role)
                    ? 'Theo dõi toàn bộ học sinh và cán bộ trong viện, quản lý liên kết lớp học, cấu hình quy tắc thưởng (Ruby) và xem lịch sử hoạt động.'
                    : 'Theo dõi học sinh lớp bạn phụ trách, quản lý liên kết lớp học, giao nhiệm vụ và duyệt đổi quà khuyến học.'}
                </p>
              </div>

              {/* Quick Stats Grid — chỉ hiện chỉ số có ý nghĩa với vai trò hiện tại */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="glass-panel border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-synth-cyan/30 transition-all duration-300 group bg-white/3">
                  <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-cyan transition-colors">👥 Tổng Số Học Sinh</span>
                  <span className="text-2xl font-black text-synth-cyan font-orbitron mt-1">{totalStudents}</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-synth-magenta/30 transition-all duration-300 group bg-white/3">
                  <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-magenta transition-colors">🔥 Cấp Độ Trung Bình</span>
                  <span className="text-2xl font-black text-synth-magenta font-orbitron mt-1">LV.{avgLevel}</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-synth-green/30 transition-all duration-300 group bg-white/3">
                  <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-green transition-colors">⚡ XP Trung Bình {scopeLabel}</span>
                  <span className="text-2xl font-black text-synth-green font-orbitron mt-1">{avgXP.toLocaleString()}</span>
                </div>
                <div className="glass-panel border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-synth-orange/30 transition-all duration-300 group bg-white/3">
                  <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-orange transition-colors">💎 Ruby Trung Bình {scopeLabel}</span>
                  <span className="text-2xl font-black text-synth-orange font-orbitron mt-1">{avgRuby.toLocaleString()}</span>
                </div>
              </div>

              {/* Bảng Vàng: top học sinh theo XP */}
              {topStudentsByXP.length > 0 && (
                <div className="relative z-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-3.5">
                  <h4 className="font-orbitron font-bold text-[10px] text-yellow-400 uppercase tracking-wider mb-2.5">
                    🏆 Bảng Vàng {scopeLabel} (theo XP)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {topStudentsByXP.map((s: any, idx: number) => (
                      <div key={s.id} className="flex items-center gap-2.5 rounded-xl bg-black/20 border border-white/5 px-3 py-2">
                        <span className="text-lg shrink-0">{['🥇', '🥈', '🥉'][idx]}</span>
                        {s.avatar_url ? (
                          <img src={s.avatar_url} alt="" className="w-7 h-7 rounded-full border border-white/10 object-cover shrink-0" />
                        ) : (
                          <span className="w-7 h-7 rounded-full bg-synth-purple/25 border border-white/10 flex items-center justify-center text-[10px] font-black text-white shrink-0">
                            {(s.name || '?').trim().charAt(0).toUpperCase()}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-white text-xs truncate block">{s.name}</span>
                          <span className="text-[9px] font-orbitron text-slate-400">
                            LV.{s.level ?? 1} · {(s.xp ?? 0).toLocaleString()} XP · 💎 {(s.ruby ?? 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sub-Tab Control inside Phòng Hiệu Trưởng — tab Nhân Sự & Phân Quyền chỉ dành cho Ban Giám Hiệu */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
              {([
                { key: 'dashboard', label: '👥 Học Sinh & Liên Kết' },
                { key: 'org_chart', label: '🌳 Sơ Đồ Tổ Chức' },
                ...(isAdmin(currentUser?.role) ? [{ key: 'staff', label: '🛡️ Nhân Sự & Phân Quyền' }] : []),
                { key: 'settings', label: '⚙️ Cấu Hình & Học Viện' },
              ] as { key: typeof thienCoSubTab; label: string }[]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setThienCoSubTab(tab.key)}
                  className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                    thienCoSubTab === tab.key
                      ? 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_8px_#00f0ff]'
                      : 'bg-transparent border-white/10 text-synth-text-muted hover:text-white hover:border-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-Tab Contents */}
            {thienCoSubTab === 'org_chart' ? (
              <OrgChart
                currentUser={currentUser}
                adminStudents={adminStudents}
                adminLinks={adminLinks}
              />
            ) : thienCoSubTab === 'dashboard' ? (
              isAdmin(currentUser?.role) ? (
                /* Viện Trưởng / Phó: sổ danh bộ TOÀN TRƯỜNG — kể cả học sinh chưa vào lớp nào */
                <StudentDirectory
                  students={allStudents}
                  adminLinks={adminLinks}
                  inspectLoading={inspectLoading}
                  onInspect={handleInspectStudent}
                />
              ) : (
              <div className="space-y-6">
                {/* List of students for parent/admin viewing */}
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                      👥 Danh sách Học Sinh liên kết
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {classLinks.filter(l => l.status === 'active' && l.parent_id === currentUser?.id).map((link: any) => {
                      const student = adminStudents.find((s: any) => s.id === link.student_id);
                      return (
                        <button
                          key={link.student_id}
                          disabled={inspectLoading}
                          onClick={() => handleInspectStudent(link.student_id)}
                          title="Bấm để xem hoạt động, tiến độ và báo cáo của học sinh"
                          className="text-left p-3.5 rounded-xl bg-synth-gray/20 border border-white/5 hover:border-synth-cyan/40 hover:bg-white/[0.06] transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {/* Hàng 1: avatar + tên + email + chevron */}
                          <div className="flex items-center gap-3">
                            {student?.avatar_url ? (
                              <img src={student.avatar_url} alt="" className="w-10 h-10 rounded-full border border-white/10 object-cover shrink-0" />
                            ) : (
                              <span className="w-10 h-10 rounded-full bg-synth-purple/25 border border-white/10 flex items-center justify-center text-sm font-black text-white shrink-0">
                                {(link.student_name || link.student_email || '?').trim().charAt(0).toUpperCase()}
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white text-sm truncate">{link.student_name || link.student_email || 'Học sinh'}</span>
                                <span
                                  className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded shrink-0 ${
                                    link.link_type === 'primary'
                                      ? 'bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan'
                                      : 'bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta'
                                  }`}
                                  title={link.link_type === 'primary' ? 'Bạn là Chủ Nhiệm Chính của lớp này' : 'Bạn là Chủ nhiệm phụ hỗ trợ lớp này'}
                                >
                                  {link.link_type === 'primary' ? 'CN Chính' : 'CN Phụ'}
                                </span>
                              </div>
                              <span className="text-[10px] text-synth-text-muted truncate block">{link.student_email}</span>
                            </div>
                            <span className="text-lg text-slate-500 group-hover:text-synth-cyan group-hover:translate-x-0.5 transition-all shrink-0 font-bold">
                              {inspectLoading ? '…' : '›'}
                            </span>
                          </div>

                          {/* Hàng 2: chỉ số nhanh của học sinh */}
                          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded bg-synth-purple/15 border border-synth-purple/30 text-[9px] font-bold font-orbitron text-white">
                              👑 LV.{student?.level ?? 1}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold font-orbitron text-slate-300">
                              {student?.xp ?? 0} XP
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-synth-orange/10 border border-synth-orange/30 text-[9px] font-bold font-orbitron text-synth-orange">
                              💎 {student?.ruby ?? 0}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-synth-cyan/10 border border-synth-cyan/25 text-[9px] font-bold font-orbitron text-synth-cyan">
                              ⚡ {student?.energy ?? 0}/{student?.max_energy ?? 100}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/25 text-[9px] font-bold font-orbitron text-red-400">
                              🔥 {student?.streak ?? 0} ngày
                            </span>
                          </div>
                        </button>
                      );
                    })}
                    {classLinks.filter(l => l.status === 'active' && l.parent_id === currentUser?.id).length === 0 && (
                      <p className="text-xs text-synth-text-muted italic py-4 col-span-3 text-center">
                        Chưa có tài khoản học sinh nào kết nối vào lớp học.
                      </p>
                    )}
                  </div>
                </div>

                {/* Quản lý liên kết lớp của giáo viên */}
                <ClassLinksManager
                  currentUser={currentUser}
                  classLinks={classLinks}
                  secondaryParents={secondaryParents}
                  sendClassInvite={sendClassInvite}
                  respondClassInvite={respondClassInvite}
                  inviteSecondary={inviteSecondary}
                  inviteSecondaryRequest={inviteSecondaryRequest}
                  updateSecondaryPermissions={updateSecondaryPermissions}
                  leaveClass={leaveClass}
                  applyVicePrincipal={applyVicePrincipal}
                />
              </div>
              )
            ) : thienCoSubTab === 'staff' ? (
              /* Nhân Sự & Phân Quyền: kết nối Ban Giám Hiệu + duyệt ứng tuyển Phó Viện + cấp/thu hồi quyền toàn viện */
              <div className="space-y-6">
                <AdminConnectionManager
                  currentUser={currentUser}
                  classLinks={classLinks}
                  respondClassInvite={respondClassInvite}
                  leaveClass={leaveClass}
                  inviteAdminConnection={inviteAdminConnection}
                />
                <VicePrincipalApplicationsManager currentUser={currentUser} />
                <RoleManager currentUser={currentUser} />
              </div>
            ) : (
              <SettingsManager
                currentUser={currentUser}
                adminStudents={adminStudents}
                adminLinks={adminLinks}
                gameSettings={gameSettings}
                updateGameSettings={updateGameSettings as any}
                addHandbookPage={addHandbookPage as any}
                auditLogs={auditLogs}
                fetchAuditLogs={fetchAuditLogs}
              />
            )}
          </div>
        )}

        {activeTab === 'than_phan' && (
          viewingStudentId ? (
            <StudentProfileView
              currentUser={currentUser}
              selectedStudentProfile={selectedStudentProfile}
              gameSettings={gameSettings}
              canApproveReward={!!canApproveReward}
              canManageEnergy={!!canManageEnergy}
              canCreateMission={!!canCreateMission}
              skipReviews={skipReviews}
              adminMarkRewardDelivered={adminMarkRewardDelivered as any}
              adminCancelRedemption={adminCancelRedemption as any}
              adminSetEnergy={adminSetEnergy as any}
              adminSetEnergyConfig={adminSetEnergyConfig as any}
              fetchSkipReviews={fetchSkipReviews}
              resolveSkipReview={resolveSkipReview}
              onSwitchStudent={() => {
                setViewingStudentId(null);
                setActiveTab('thien_co_cac');
                toast.success('Đã quay lại danh sách học sinh');
              }}
              // Reward props
              activeRewardCatalog={activeRewardCatalog}
              activeRedemptions={activeRedemptions}
              addParentReward={addParentReward as any}
              deleteParentReward={deleteParentReward as any}
              markRewardDelivered={markRewardDelivered as any}
              cancelRedemption={cancelRedemption as any}
              // Quest props
              parentQuests={parentQuests}
              addParentQuest={addParentQuest as any}
              completeParentQuest={completeParentQuest as any}
              deleteParentQuest={deleteParentQuest as any}
            />
          ) : (
            <ProfilePage
              currentUser={currentUser!}
              currentTheme={uiTheme}
              onSelectTheme={setUiTheme}
            />
          )
        )}

        {activeTab === 'van_quyen_cac' && (
          <QuestionBankManager
            questions={questions}
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
            addQuestion={addQuestion}
            importQuestions={importQuestions as any}
          />
        )}

        {activeTab === 'tang_kinh_cac' && (
          <LectureBankManager />
        )}
      </div>

      {/* Mobile Admin Bottom Navigation Bar — cùng thứ tự với top nav desktop */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-2 py-2 pb-3 grid ${viewingStudentId ? 'grid-cols-5' : 'grid-cols-4'} gap-1 items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)] text-center`}>
        <button
          onClick={() => {
            setActiveTab('thien_co_cac');
            fetchAdminStudents();
          }}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'thien_co_cac' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">⚙️</span>
          <span>Hiệu Trưởng</span>
        </button>

        <button
          onClick={() => setActiveTab('van_quyen_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'van_quyen_cac' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📚</span>
          <span>Đề Thi</span>
        </button>

        <button
          onClick={() => setActiveTab('tang_kinh_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'tang_kinh_cac' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📖</span>
          <span>Bài Giảng</span>
        </button>

        <button
          onClick={() => setActiveTab('than_phan')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'than_phan' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">👤</span>
          <span>{viewingStudentId ? 'Hồ Sơ HS' : 'Hồ Sơ'}</span>
        </button>

        {viewingStudentId && (
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('thien_co_cac');
              toast.success('Đã quay lại danh sách học sinh');
            }}
            className="flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <span className="text-base">🔄</span>
            <span>Đổi Học Sinh</span>
          </button>
        )}
      </nav>
      {inspectLoading && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-synth-cyan mb-3"></div>
          <p className="font-orbitron text-xs text-synth-cyan font-bold tracking-widest uppercase animate-pulse">
            Đang tải hồ sơ học sinh...
          </p>
        </div>
      )}
    </div>
  );
};
