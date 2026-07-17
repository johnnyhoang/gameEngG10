import React, { useState, useEffect, useMemo } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isAdmin, isTutorRole, isSuperAdmin } from '../utils/roleHelpers';
import { toast } from '../utils/toast';
import { useTranslate } from '../hooks/useTranslate';

// Import child managers
import { AdminConnectionManager } from './TutorConsole/AdminConnectionManager';
import { ClassLinksManager } from './TutorConsole/ClassLinksManager';
import { SettingsManager } from './TutorConsole/SettingsManager';
import { StudentProfileView } from './TutorConsole/StudentProfileView';
import { QuestionBankManager } from './TutorConsole/QuestionBankManager';
import { LectureBankManager } from './TutorConsole/LectureBankManager';
import { OrgChart } from './TutorConsole/OrgChart';
import { MemberRoster } from './TutorConsole/MemberRoster';
import { RoleManager } from './TutorConsole/RoleManager';
import { VicePrincipalApplicationsManager } from './TutorConsole/VicePrincipalApplicationsManager';
import { AuditLogsManager } from './TutorConsole/AuditLogsManager';

export const TutorConsole: React.FC = () => {
  const { t } = useTranslate();
  const markRewardDelivered = useGameState(state => state.markRewardDelivered);
  const cancelRedemption = useGameState(state => state.cancelRedemption);
  const schoolRewards = useGameState(state => state.schoolRewards);
  const fetchSchoolRewards = useGameState(state => state.fetchSchoolRewards);
  const createSchoolReward = useGameState(state => state.createSchoolReward);
  const deleteSchoolReward = useGameState(state => state.deleteSchoolReward);

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

  const tutorQuests = useGameState(state => state.tutorQuests || []);
  const addTutorQuest = useGameState(state => state.addTutorQuest);
  const completeTutorQuest = useGameState(state => state.completeTutorQuest);
  const deleteTutorQuest = useGameState(state => state.deleteTutorQuest);
  const auditLogs = useGameState(state => state.auditLogs || []);
  const fetchAuditLogs = useGameState(state => state.fetchAuditLogs);
  const skipReviews = useGameState(state => state.skipReviews || []);
  const fetchSkipReviews = useGameState(state => state.fetchSkipReviews);
  const resolveSkipReview = useGameState(state => state.resolveSkipReview);

  // Class Links Management
  const classLinks = useGameState(state => state.classLinks);
  const secondaryTutors = useGameState(state => state.secondaryTutors);
  const sendClassInvite = useGameState(state => state.sendClassInvite);
  const respondClassInvite = useGameState(state => state.respondClassInvite);
  const inviteSecondary = useGameState(state => state.inviteSecondary);
  const inviteSecondaryRequest = useGameState(state => state.inviteSecondaryRequest);
  const updateSecondaryPermissions = useGameState(state => state.updateSecondaryPermissions);
  const leaveClass = useGameState(state => state.leaveClass);
  const applyVicePrincipal = useGameState(state => state.applyVicePrincipal);
  const inviteAdminConnection = useGameState(state => state.inviteAdminConnection);


  // Tab chính đọc từ store — nav chính nằm trên TopHUD (thanh MIKAWAII), không còn nav riêng trong trang
  const activeTab = useGameState(state => state.tutorConsoleTab);
  const setActiveTab = useGameState(state => state.setTutorConsoleTab);
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  // Filter students strictly by role for stats
  const allStudents = useMemo(() => {
    return adminStudents.filter((s: any) => s.role === 'student');
  }, [adminStudents]);

  // If teacher: filter students into "My Class" (Primary link) and "Co-managed Class" (Secondary link)
  const myClassStudents = useMemo(() => {
    if (isAdmin(currentUser?.role)) return allStudents;
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.tutor_id === currentUser?.id && l.link_type === 'primary')
      .map((l: any) => l.student_id);
    return allStudents.filter((s: any) => studentIds.includes(s.id));
  }, [allStudents, adminLinks, currentUser?.id, currentUser?.role]);

  const coManagedClassStudents = useMemo(() => {
    if (isAdmin(currentUser?.role)) return [];
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.tutor_id === currentUser?.id && l.link_type === 'secondary')
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
    if (isTutorRole(currentUser?.role) || isAdmin(currentUser?.role)) {
      fetchClass();
    }
  }, [currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { fetchAdminStudents: fetchAdm, fetchClassLinks: fetchClass } = useGameState.getState();
    fetchAdm();
    fetchClass();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeTab === 'management' && isAdmin(currentUser?.role)) {
      useGameState.getState().fetchAuditLogs();
    }
  }, [activeTab, currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (viewingStudentId && isTutorRole(currentUser?.role)) {
      useGameState.getState().fetchSkipReviews(viewingStudentId);
    }
  }, [viewingStudentId, currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInspectStudent = async (studentId: string) => {
    setInspectLoading(true);
    setViewingStudentId(studentId);
    try {
      await fetchStudentProfile(studentId);

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

  const activeRedemptions = selectedStudentProfile?.rewardRedemptions || [];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Nav chính đã dời lên TopHUD (thanh MIKAWAII); tiêu đề trang do heading từng tab đảm nhiệm */}



      {/* Tab Panels */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5">
        {activeTab === 'management' && (
          <div className="space-y-6">
            {/* Welcome & Dashboard */}
            <div className="glass-panel rounded-2xl border border-synth-cyan/30 overflow-hidden bg-gradient-to-r from-synth-cyan/10 via-transparent to-synth-magenta/5 relative shadow-lg p-5 mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-synth-cyan/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-orbitron font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
                    ⚙️ {isAdmin(currentUser?.role) ? 'BAN GIÁM HIỆU' : 'LỚP CHỦ NHIỆM'}
                    <button
                      onClick={() => showHelp('parent-console')}
                      className="w-5 h-5 rounded-full bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[10px] font-black flex items-center justify-center hover:bg-synth-magenta/40 cursor-pointer transition-colors shrink-0"
                      title="Xem hướng dẫn sử dụng"
                    >
                      ?
                    </button>
                  </h3>
                  <div className="text-xs text-synth-text-muted leading-relaxed max-w-4xl space-y-1">
                    {isAdmin(currentUser?.role) ? (
                      <p>Theo dõi toàn bộ học sinh và cán bộ trong viện, quản lý liên kết lớp học, cấu hình quy tắc thưởng (Ruby) và xem lịch sử hoạt động.</p>
                    ) : (
                      <>
                        <p>
                          Vai trò hiện tại:{' '}
                          <span className="font-bold text-synth-magenta uppercase font-orbitron">
                            {currentUser?.role === 'tutor' ? 'Chủ Nhiệm Chính' : 'Phó chủ nhiệm'}
                          </span>
                        </p>
                        <p>Theo dõi học sinh lớp bạn phụ trách, quản lý liên kết lớp học, giao nhiệm vụ và duyệt đổi quà khuyến học.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
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
            {/* Nội dung Trang Chính */}
            <div className="space-y-6">
              <MemberRoster
                currentUser={currentUser}
                adminStudents={adminStudents}
                adminLinks={adminLinks}
                onInspectStudent={handleInspectStudent}
                inspectLoading={inspectLoading}
              />

              {!isAdmin(currentUser?.role) && (
                <div className="space-y-6">
                  {/* Quản lý liên kết lớp của giáo viên */}
                  <ClassLinksManager
                    currentUser={currentUser}
                    classLinks={classLinks}
                    secondaryTutors={secondaryTutors}
                    sendClassInvite={sendClassInvite}
                    respondClassInvite={respondClassInvite}
                    inviteSecondary={inviteSecondary}
                    inviteSecondaryRequest={inviteSecondaryRequest}
                    updateSecondaryPermissions={updateSecondaryPermissions}
                    leaveClass={leaveClass}
                    applyVicePrincipal={applyVicePrincipal}
                  />
                </div>
              )}

              {isAdmin(currentUser?.role) && (
                <div className="space-y-6">
                  <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 space-y-6">
                    <AdminConnectionManager
                      currentUser={currentUser}
                      classLinks={classLinks}
                      respondClassInvite={respondClassInvite}
                      leaveClass={leaveClass}
                      inviteAdminConnection={inviteAdminConnection}
                    />
                    <div className="border-t border-white/5 pt-6">
                      <VicePrincipalApplicationsManager currentUser={currentUser} />
                    </div>
                    {isSuperAdmin(currentUser?.role) && (
                      <div className="border-t border-white/5 pt-6">
                        <RoleManager currentUser={currentUser} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <OrgChart
                currentUser={currentUser}
                adminStudents={adminStudents}
                adminLinks={adminLinks}
              />

              {isAdmin(currentUser?.role) && (
                <AuditLogsManager
                  auditLogs={auditLogs}
                  fetchAuditLogs={fetchAuditLogs}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsManager
            currentUser={currentUser}
            gameSettings={gameSettings}
            updateGameSettings={updateGameSettings as any}
            addHandbookPage={addHandbookPage as any}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBankManager
            questions={questions}
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
            addQuestion={addQuestion}
            importQuestions={importQuestions as any}
          />
        )}

        {activeTab === 'lectures' && (
          <LectureBankManager />
        )}
      </div>

      {/* Student Profile Modal Overlay */}
      {viewingStudentId && selectedStudentProfile && (
        <div className="fixed inset-0 z-[150] bg-synth-bg/95 backdrop-blur-md flex flex-col p-4 md:p-6 overflow-auto animate-fade-in">
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col space-y-4">
            {/* Header Modal */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentProfile.studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={selectedStudentProfile.studentUser?.name}
                  className="w-10 h-10 rounded-2xl border border-synth-cyan/40 object-cover"
                />
                <div>
                  <span className="text-[10px] text-synth-cyan uppercase font-bold tracking-wider font-orbitron">
                    {t('Quản lý hồ sơ Sĩ Tử', 'Student Profile Management')}
                  </span>
                  <h3 className="font-bold text-white text-base leading-tight mt-0.5">
                    {selectedStudentProfile.studentUser?.name} ({selectedStudentProfile.studentUser?.email})
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setViewingStudentId(null)}
                className="px-4 py-2 rounded-xl bg-synth-gray/30 border border-white/10 text-xs text-white hover:bg-white/10 hover:border-white/20 font-bold font-orbitron cursor-pointer transition-colors"
              >
                {t('Đóng Hồ Sơ', 'Close Profile')}
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex-1 min-h-0 overflow-auto">
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
                  toast.success(t('Đã quay lại danh sách', 'Returned to directory'));
                }}
                activeRedemptions={activeRedemptions}
                schoolRewards={schoolRewards}
                fetchSchoolRewards={fetchSchoolRewards}
                createSchoolReward={createSchoolReward as any}
                deleteSchoolReward={deleteSchoolReward as any}
                markRewardDelivered={markRewardDelivered as any}
                cancelRedemption={cancelRedemption as any}
                tutorQuests={tutorQuests}
                addTutorQuest={addTutorQuest as any}
                completeTutorQuest={completeTutorQuest as any}
                deleteTutorQuest={deleteTutorQuest as any}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Admin Bottom Navigation Bar — 3 tabs */}
      {currentUser && (isTutorRole(currentUser.role) || isAdmin(currentUser.role)) && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-2 py-2 pb-3 grid grid-cols-3 gap-1 items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)] text-center">
          <button
            onClick={() => {
              setActiveTab('management');
              fetchAdminStudents();
            }}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${activeTab === 'management' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
              }`}
          >
            <span className="text-base">🏫</span>
            <span>{t('Hiệu Trưởng', 'Homeroom')}</span>
          </button>

          <button
            onClick={() => setActiveTab('lectures')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${activeTab === 'lectures' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
              }`}
          >
            <span className="text-base">📖</span>
            <span>{t('Bài Giảng', 'Lectures')}</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${activeTab === 'questions' ? 'text-synth-magenta font-black' : 'text-synth-text-muted hover:text-white'
              }`}
          >
            <span className="text-base">📚</span>
            <span>{t('Đề Thi', 'Questions')}</span>
          </button>
        </nav>
      )}
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
