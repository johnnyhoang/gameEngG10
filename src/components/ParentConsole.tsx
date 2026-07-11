import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isAdmin, isParentRole } from '../utils/roleHelpers';
import { Unlock } from 'lucide-react';

// Import child managers
import { AdminConnectionManager } from './ParentConsole/AdminConnectionManager';
import { ProfilePage } from './ProfilePage';
import { FamilyManager } from './ParentConsole/FamilyManager';
import { RewardManager } from './ParentConsole/RewardManager';
import { QuestManager } from './ParentConsole/QuestManager';
import { SettingsManager } from './ParentConsole/SettingsManager';
import { StudentProfileView } from './ParentConsole/StudentProfileView';
import { QuestionBankManager } from './ParentConsole/QuestionBankManager';
import { LectureBankManager } from './ParentConsole/LectureBankManager';

export const ParentConsole: React.FC = () => {
  const markRewardDelivered = useGameState(state => state.markRewardDelivered);
  const cancelRedemption = useGameState(state => state.cancelRedemption);
  const addParentReward = useGameState(state => state.addParentReward);
  const deleteParentReward = useGameState(state => state.deleteParentReward);

  // Admin and member management states
  const currentUser = useGameState(state => state.currentUser);
  const adminStudents = useGameState(state => state.adminStudents || []);
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

  // Family Management
  const familyLinks = useGameState(state => state.familyLinks || []);
  const secondaryParents = useGameState(state => state.secondaryParents || []);
  const sendInvite = useGameState(state => state.sendInvite);
  const respondInvite = useGameState(state => state.respondInvite);
  const inviteSecondary = useGameState(state => state.inviteSecondary);
  const inviteSecondaryRequest = useGameState(state => state.inviteSecondaryRequest);
  const updateSecondaryPermissions = useGameState(state => state.updateSecondaryPermissions);
  const leaveFamily = useGameState(state => state.leaveFamily);
  const applyVicePrincipal = useGameState(state => state.applyVicePrincipal);
  const inviteAdminConnection = useGameState(state => state.inviteAdminConnection);
  const uiTheme = useGameState(state => state.uiTheme);
  const setUiTheme = useGameState(state => state.setUiTheme);

  // Local state for layout
  const [activeTab, setActiveTab] = useState<'chinh_dien' | 'thien_co_cac' | 'van_quyen_cac' | 'tang_kinh_cac' | 'ngan_cac' | 'than_phan'>('chinh_dien');
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  // Load students list on mount for admin users
  // NOTE: fetchAdminStudents/fetchFamily intentionally NOT in deps — Zustand actions get new references
  // on every set() call, which would cause an infinite loop. We only re-run when role changes.
  useEffect(() => {
    const { fetchAdminStudents: fetchAdm, fetchFamily: fetchFam } = useGameState.getState();
    if (isAdmin(currentUser?.role)) {
      fetchAdm();
    }
    if (isParentRole(currentUser?.role) || isAdmin(currentUser?.role)) {
      fetchFam();
    }
  }, [currentUser?.role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeTab === 'chinh_dien') {
      const { fetchAdminStudents: fetchAdm, fetchFamily: fetchFam } = useGameState.getState();
      fetchAdm();
      fetchFam();
    }
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
    setViewingStudentId(studentId);
    await fetchStudentProfile(studentId);
    setActiveTab('than_phan');
  };

  // Phân quyền Chủ nhiệm phụ
  const currentStudentLink = familyLinks.find(l => l.student_id === viewingStudentId && l.status === 'active');
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
      {/* HUD Header */}
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-synth-magenta/5 to-transparent">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-synth-magenta" />
          <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            Bảng Quản Trị Hiệu Trưởng 👑
            <button
              onClick={() => showHelp('parent-console')}
              className="w-5 h-5 rounded-full bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[10px] font-black flex items-center justify-center hover:bg-synth-magenta/40 cursor-pointer transition-colors"
              title="Xem hướng dẫn sử dụng"
            >
              ?
            </button>
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="hidden md:flex gap-2 flex-wrap">
          {(['chinh_dien', 'than_phan', 'thien_co_cac', 'van_quyen_cac', 'tang_kinh_cac', 'ngan_cac'] as const).map(tab => {
            const tabNames: Record<string, string> = {
              chinh_dien: '🏛️ Chính Điện',
              than_phan: '👑 Thân Phận',
              thien_co_cac: '📖 Thiên Cơ Các',
              van_quyen_cac: '📚 Vạn Quyển Các',
              tang_kinh_cac: '📖 Tàng Kinh Các',
              ngan_cac: '💰 Ngân Các'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'chinh_dien') {
                    fetchAdminStudents();
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_8px_#ff007f]' 
                    : 'bg-transparent border-synth-magenta/30 text-synth-magenta hover:bg-synth-magenta/10'
                }`}
              >
                {tabNames[tab]}
              </button>
            );
          })}
        </div>
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
              <span className="text-[10px] text-synth-cyan uppercase font-bold tracking-wider font-orbitron">Đang quản trị tài khoản</span>
              <h4 className="font-bold text-white text-sm leading-tight mt-0.5">
                {selectedStudentProfile.studentUser?.name} ({selectedStudentProfile.studentUser?.email})
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('chinh_dien');
            }}
            className="px-3 py-1.5 rounded bg-synth-gray/30 border border-white/10 text-xs text-white hover:bg-white/10 font-bold cursor-pointer transition-colors"
          >
            Đổi thiếu hiệp khác
          </button>
        </div>
      )}

      {/* Tab Panels */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5">
        {activeTab === 'chinh_dien' && (
          <div className="space-y-6">
            {(currentUser?.role === 'truong_vien' || currentUser?.role === 'pho_vien') ? (
              <AdminConnectionManager
                currentUser={currentUser}
                familyLinks={familyLinks}
                respondInvite={respondInvite}
                leaveFamily={leaveFamily}
                inviteAdminConnection={inviteAdminConnection}
              />
            ) : (
              <FamilyManager
                currentUser={currentUser}
                familyLinks={familyLinks}
                secondaryParents={secondaryParents}
                sendInvite={sendInvite}
                respondInvite={respondInvite}
                inviteSecondary={inviteSecondary}
                inviteSecondaryRequest={inviteSecondaryRequest}
                updateSecondaryPermissions={updateSecondaryPermissions}
                leaveFamily={leaveFamily}
                applyVicePrincipal={applyVicePrincipal}
              />
            )}

            {/* List of students for parent/admin viewing */}
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                👥 Danh sách Thiếu Hiệp liên kết
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyLinks.filter(l => l.status === 'active' && (l.parent_id === currentUser?.id || isAdmin(currentUser?.role))).map((link: any) => (
                  <div key={link.student_id} className="p-4 rounded-xl bg-synth-gray/20 border border-white/5 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm block">{link.student_name || link.student_email || 'Học sinh'}</span>
                        {link.link_type === 'primary' ? (
                          <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan" title="Bạn là Chủ nhiệm chính của lớp này">
                            Chủ nhiệm chính
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta" title="Bạn là Chủ nhiệm phụ hỗ trợ lớp này">
                            Chủ nhiệm phụ
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-synth-text-muted">{link.student_email}</span>
                    </div>
                    <button
                      onClick={() => handleInspectStudent(link.student_id)}
                      className="px-3 py-2 bg-synth-cyan text-black font-bold font-orbitron text-[10px] uppercase rounded-lg hover:synth-glow-cyan transition-all cursor-pointer w-full text-center"
                    >
                      Xem Hoạt Động 👑
                    </button>
                  </div>
                ))}
                {familyLinks.filter(l => l.status === 'active' && (l.parent_id === currentUser?.id || isAdmin(currentUser?.role))).length === 0 && (
                  <p className="text-xs text-synth-text-muted italic py-4 col-span-3 text-center">
                    Chưa có tài khoản thiếu hiệp nào kết nối vào gia đình.
                  </p>
                )}
              </div>
            </div>
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
              skipReviews={skipReviews}
              adminMarkRewardDelivered={adminMarkRewardDelivered as any}
              adminCancelRedemption={adminCancelRedemption as any}
              adminSetEnergy={adminSetEnergy as any}
              adminSetEnergyConfig={adminSetEnergyConfig as any}
              fetchSkipReviews={fetchSkipReviews}
              resolveSkipReview={resolveSkipReview}
            />
          ) : (
            <ProfilePage
              currentUser={currentUser!}
              currentTheme={uiTheme}
              onSelectTheme={setUiTheme}
              onOpenLogs={() => {}}
            />
          )
        )}

        {activeTab === 'thien_co_cac' && (
          <SettingsManager
            currentUser={currentUser}
            adminStudents={adminStudents}
            questions={questions}
            gameSettings={gameSettings}
            updateGameSettings={updateGameSettings as any}
            addHandbookPage={addHandbookPage as any}
            auditLogs={auditLogs}
            fetchAuditLogs={fetchAuditLogs}
          />
        )}

        {activeTab === 'van_quyen_cac' && (
          <QuestionBankManager
            questions={questions}
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
            importQuestions={importQuestions as any}
          />
        )}

        {activeTab === 'tang_kinh_cac' && (
          <LectureBankManager />
        )}

        {activeTab === 'ngan_cac' && (
          <div className="space-y-8">
            <RewardManager
              viewingStudentId={viewingStudentId}
              activeRewardCatalog={activeRewardCatalog}
              activeRedemptions={activeRedemptions}
              canApproveReward={!!canApproveReward}
              addParentReward={addParentReward as any}
              deleteParentReward={deleteParentReward as any}
              markRewardDelivered={markRewardDelivered as any}
              cancelRedemption={cancelRedemption as any}
              adminMarkRewardDelivered={adminMarkRewardDelivered as any}
              adminCancelRedemption={adminCancelRedemption as any}
            />
            {viewingStudentId && (
              <QuestManager
                parentQuests={parentQuests}
                canCreateMission={!!canCreateMission}
                addParentQuest={addParentQuest as any}
                completeParentQuest={completeParentQuest as any}
                deleteParentQuest={deleteParentQuest as any}
              />
            )}
          </div>
        )}
      </div>

      {/* Mobile Admin Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-3 py-2.5 pb-3 grid grid-cols-6 gap-1 items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)] text-center">
        <button
          onClick={() => {
            setActiveTab('chinh_dien');
            fetchAdminStudents();
          }}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'chinh_dien' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">🏛️</span>
          <span>Chính Điện</span>
        </button>

        <button
          onClick={() => setActiveTab('than_phan')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'than_phan' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">👑</span>
          <span>Thân Phận</span>
        </button>

        <button
          onClick={() => setActiveTab('thien_co_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'thien_co_cac' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📖</span>
          <span>Thiên Cơ</span>
        </button>

        <button
          onClick={() => setActiveTab('van_quyen_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'van_quyen_cac' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📚</span>
          <span>Vạn Quyển</span>
        </button>

        <button
          onClick={() => setActiveTab('tang_kinh_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'tang_kinh_cac' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">📖</span>
          <span>Tàng Kinh</span>
        </button>

        <button
          onClick={() => setActiveTab('ngan_cac')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[8px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'ngan_cac' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-base">💰</span>
          <span>Ngân Các</span>
        </button>
      </nav>
    </div>
  );
};
