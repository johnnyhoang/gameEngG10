import React, { useState, useEffect, useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isAdmin, isParentRole } from '../utils/roleHelpers';
import { Unlock } from 'lucide-react';
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

  // Local state for layout
  const [activeTab, setActiveTab] = useState<'thien_co_cac' | 'van_quyen_cac' | 'tang_kinh_cac' | 'ngan_cac' | 'than_phan'>('thien_co_cac');
  const [thienCoSubTab, setThienCoSubTab] = useState<'dashboard' | 'org_chart' | 'settings'>('dashboard');
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

  const totalStudents = combinedStudentsForStats.length;
  const totalXP = combinedStudentsForStats.reduce((acc, s) => acc + (s.player?.xp || 0), 0);
  const totalRuby = combinedStudentsForStats.reduce((acc, s) => acc + (s.player?.ruby || 0), 0);
  const avgLevel = totalStudents > 0
    ? Math.round(combinedStudentsForStats.reduce((acc, s) => acc + (s.player?.level || 1), 0) / totalStudents)
    : 0;

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

  const consoleTitle = useMemo(() => {
    switch (currentUser?.role) {
      case 'truong_vien': return 'Phòng Điều Hành 👑';
      case 'pho_vien': return 'Phòng Điều Hành — Phó Viện Trưởng 🛡️';
      case 'parent': return 'Phòng Điều Hành — Chủ Nhiệm Chính 📋';
      case 'secondary_parent': return 'Phòng Điều Hành — Chủ Nhiệm Phụ 🤝';
      default: return 'Phòng Điều Hành Học Viện 🏛️';
    }
  }, [currentUser?.role]);

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* HUD Header */}
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-synth-magenta/5 to-transparent">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-synth-magenta" />
          <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            {consoleTitle}
            <button
              onClick={() => showHelp('parent-console')}
              className="w-5 h-5 rounded-full bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[10px] font-black flex items-center justify-center hover:bg-synth-magenta/40 cursor-pointer transition-colors"
              title="Xem hướng dẫn sử dụng"
            >
              ?
            </button>
          </h2>
        </div>


        {/* Nav 1: Primary Navigation */}
        <div className="hidden md:flex gap-2">
          {(['than_phan'] as const).map(tab => {
            const tabNames: Record<string, string> = {
              than_phan: currentUser?.role === 'truong_vien' || currentUser?.role === 'pho_vien' ? '👤 Học Tích Học Viện' : '👤 Hồ Sơ Học Sinh'
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_12px_#ff007f]'
                    : 'bg-transparent border-synth-magenta/30 text-synth-magenta hover:bg-synth-magenta/10'
                }`}
              >
                {tabNames[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav 2: Secondary Navigation */}
      <div className="hidden md:flex items-center justify-between bg-synth-gray/10 border border-white/5 p-3 rounded-2xl gap-2">
        <div className="flex gap-2">
          {(['thien_co_cac', 'van_quyen_cac', 'tang_kinh_cac'] as const).map(tab => {
            const tabNames: Record<string, string> = {
              thien_co_cac: '⚙️ Phòng Hiệu Trưởng',
              van_quyen_cac: '📚 Ngân Hàng Đề Thi',
              tang_kinh_cac: '📖 Thư Viện Bài Giảng'
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl font-orbitron font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_10px_#00f0ff]'
                    : 'bg-transparent border-synth-cyan/30 text-synth-cyan hover:bg-synth-cyan/10'
                }`}
              >
                {tabNames[tab]}
              </button>
            );
          })}
        </div>

        {/* Đổi Học Sinh Quick Action */}
        {viewingStudentId && (
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('thien_co_cac');
              toast.success('Đã quay lại danh sách học sinh');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-orbitron font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-all duration-300"
          >
            <span>🔄</span>
            <span>Đổi học sinh</span>
          </button>
        )}
      </div>

      {/* Inspected Student Banner */}
      {viewingStudentId && selectedStudentProfile && (
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
            {/* Welcome & Introduction Banner */}
            <div className="glass-panel rounded-2xl border border-synth-cyan/30 p-6 bg-gradient-to-r from-synth-cyan/10 via-transparent to-synth-magenta/5 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-synth-cyan/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-synth-magenta/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 space-y-2">
                <h3 className="font-orbitron font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  ⚙️ PHÒNG HIỆU TRƯỞNG — TRUNG TÂM QUẢN TRỊ HỌC VIỆN
                </h3>
                <p className="text-xs text-synth-text-muted leading-relaxed max-w-4xl">
                  Chào mừng bạn đến với Phòng Hiệu Trưởng! Đây là trung tâm điều hành và quản trị của học viện. Tại đây, bạn có thể theo dõi danh sách học sinh, thiết lập liên kết gia đình/trường học, điều chỉnh quy tắc nhận thưởng (Ruby), biên soạn cẩm nang học tập, và xem lịch sử hoạt động.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-synth-cyan/30 transition-all duration-300 group bg-white/3">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-cyan transition-colors">👥 Tổng Số Học Sinh</span>
                <span className="text-2xl font-black text-synth-cyan font-orbitron mt-1">{totalStudents}</span>
              </div>
              <div className="glass-panel border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-synth-magenta/30 transition-all duration-300 group bg-white/3">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-magenta transition-colors">🔥 Cấp Độ Trung Bình</span>
                <span className="text-2xl font-black text-synth-magenta font-orbitron mt-1">LV.{avgLevel}</span>
              </div>
              <div className="glass-panel border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-synth-green/30 transition-all duration-300 group bg-white/3">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-green transition-colors">⚡ Tổng XP Tích Lũy</span>
                <span className="text-2xl font-black text-synth-green font-orbitron mt-1">{totalXP.toLocaleString()}</span>
              </div>
              <div className="glass-panel border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-synth-orange/30 transition-all duration-300 group bg-white/3">
                <span className="text-[9px] uppercase text-slate-400 font-bold font-orbitron tracking-wider group-hover:text-synth-orange transition-colors">💰 Tổng Ngân Sách (Ruby)</span>
                <span className="text-2xl font-black text-synth-orange font-orbitron mt-1">{totalRuby.toLocaleString()}</span>
              </div>
            </div>

            {/* Sub-Tab Control inside Phòng Hiệu Trưởng */}
            <div className="flex gap-2 border-b border-white/5 pb-3">
              <button
                onClick={() => setThienCoSubTab('dashboard')}
                className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  thienCoSubTab === 'dashboard'
                    ? 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_8px_#00f0ff]'
                    : 'bg-transparent border-white/10 text-synth-text-muted hover:text-white hover:border-white/30'
                }`}
              >
                👥 Học Sinh & Liên Kết
              </button>
              <button
                onClick={() => setThienCoSubTab('org_chart')}
                className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  thienCoSubTab === 'org_chart'
                    ? 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_8px_#00f0ff]'
                    : 'bg-transparent border-white/10 text-synth-text-muted hover:text-white hover:border-white/30'
                }`}
              >
                🌳 Sơ Đồ Tổ Chức
              </button>
              <button
                onClick={() => setThienCoSubTab('settings')}
                className={`px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  thienCoSubTab === 'settings'
                    ? 'bg-synth-cyan border-synth-cyan text-black shadow-[0_0_8px_#00f0ff]'
                    : 'bg-transparent border-white/10 text-synth-text-muted hover:text-white hover:border-white/30'
                }`}
              >
                ⚙️ Cấu Hình & Học Viện
              </button>
            </div>

            {/* Sub-Tab Contents */}
            {thienCoSubTab === 'org_chart' ? (
              <OrgChart
                currentUser={currentUser}
                adminStudents={adminStudents}
                adminLinks={adminLinks}
              />
            ) : thienCoSubTab === 'dashboard' ? (
              <div className="space-y-6">
                {/* List of students for parent/admin viewing */}
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                      👥 Danh sách Học Sinh liên kết
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {classLinks.filter(l => l.status === 'active' && (l.parent_id === currentUser?.id || isAdmin(currentUser?.role))).map((link: any) => {
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
                    {classLinks.filter(l => l.status === 'active' && (l.parent_id === currentUser?.id || isAdmin(currentUser?.role))).length === 0 && (
                      <p className="text-xs text-synth-text-muted italic py-4 col-span-3 text-center">
                        Chưa có tài khoản học sinh nào kết nối vào gia đình.
                      </p>
                    )}
                  </div>
                </div>

                {/* Connection Manager */}
                {(currentUser?.role === 'truong_vien' || currentUser?.role === 'pho_vien') ? (
                  <AdminConnectionManager
                    currentUser={currentUser}
                    classLinks={classLinks}
                    respondClassInvite={respondClassInvite}
                    leaveClass={leaveClass}
                    inviteAdminConnection={inviteAdminConnection}
                  />
                ) : (
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
                )}
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

      {/* Mobile Admin Bottom Navigation Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-2 py-2 pb-3 grid ${viewingStudentId ? 'grid-cols-5' : 'grid-cols-4'} gap-1 items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)] text-center`}>
        <button
          onClick={() => setActiveTab('than_phan')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'than_phan' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">👤</span>
          <span>Hồ Sơ Sĩ Tử</span>
        </button>

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
          <span>Vạn Quyển</span>
        </button>

        <button
          onClick={() => setActiveTab('tang_kinh_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'tang_kinh_cac' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📖</span>
          <span>Tàng Kinh</span>
        </button>

        {viewingStudentId && (
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('thien_co_cac');
              toast.success('Đã quay lại danh sách Sĩ Tử');
            }}
            className="flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <span className="text-base">🔄</span>
            <span>Đổi Môn</span>
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
