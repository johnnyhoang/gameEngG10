import React, { useState } from 'react';
import { toast } from '../../utils/toast';
import { SearchSuggest } from '../Common/SearchSuggest';

interface ClassLinksManagerProps {
  currentUser: any;
  classLinks: any[];
  secondaryTutors: any[];
  sendClassInvite: (targetEmail: string, connectAsSecondary?: boolean) => Promise<{ success: boolean; conflictCode?: string; error?: string }>;
  respondClassInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  inviteSecondary: (email: string) => Promise<boolean>;
  inviteSecondaryRequest: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateSecondaryPermissions: (linkId: string, permissions: any) => Promise<boolean>;
  leaveClass: (linkId: string) => Promise<boolean>;
  applyVicePrincipal?: () => Promise<{ success: boolean; error?: string }>;
}

export const ClassLinksManager: React.FC<ClassLinksManagerProps> = ({
  currentUser,
  classLinks,
  secondaryTutors,
  sendClassInvite,
  respondClassInvite,
  inviteSecondary,
  inviteSecondaryRequest,
  updateSecondaryPermissions,
  leaveClass,
  applyVicePrincipal
}) => {
  const [inviteStudentEmail, setInviteStudentEmail] = useState('');
  const [isInvitingStudent, setIsInvitingStudent] = useState(false);

  const [inviteTeacherEmail, setInviteTeacherEmail] = useState('');
  const [isInvitingTeacher, setIsInvitingTeacher] = useState(false);

  const [requestClassEmail, setRequestClassEmail] = useState('');
  const [isRequestingClass, setIsRequestingClass] = useState(false);
  const [isApplyingVicePrincipal, setIsApplyingVicePrincipal] = useState(false);
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>({});
  const [updatingPermsIds, setUpdatingPermsIds] = useState<Record<string, boolean>>({});

  const handleRespondInvite = async (linkId: string, accept: boolean, successMsg: string) => {
    if (processingIds[linkId]) return;
    setProcessingIds(prev => ({ ...prev, [linkId]: true }));
    try {
      const ok = await respondClassInvite(linkId, accept);
      if (ok) toast.success(successMsg);
    } catch (err) {
      console.error(err);
      toast.error('Thao tác thất bại.');
    } finally {
      setProcessingIds(prev => ({ ...prev, [linkId]: false }));
    }
  };

  const handleLeaveClass = async (linkId: string, confirmMsg: string, successMsg: string) => {
    if (processingIds[linkId]) return;
    if (window.confirm(confirmMsg)) {
      setProcessingIds(prev => ({ ...prev, [linkId]: true }));
      try {
        const ok = await leaveClass(linkId);
        if (ok) toast.success(successMsg);
      } catch (err) {
        console.error(err);
        toast.error('Thao tác thất bại.');
      } finally {
        setProcessingIds(prev => ({ ...prev, [linkId]: false }));
      }
    }
  };

  const handleUpdatePermissions = async (spId: string, permissions: any, successMsg: string) => {
    if (updatingPermsIds[spId]) return;
    setUpdatingPermsIds(prev => ({ ...prev, [spId]: true }));
    try {
      await updateSecondaryPermissions(spId, permissions);
      toast.success(successMsg);
    } catch (err) {
      console.error(err);
      toast.error('Cập nhật quyền thất bại.');
    } finally {
      setUpdatingPermsIds(prev => ({ ...prev, [spId]: false }));
    }
  };

  const isPrimaryTeacher = currentUser?.role === 'tutor';
  const isSecondaryTeacher = currentUser?.role === 'secondary_tutor';

  const vicePrincipalApplication = classLinks.find(
    l => l.link_type === 'vice_principal' && l.tutor_id === currentUser?.id
  );

  const handleApplyVicePrincipal = async () => {
    if (!applyVicePrincipal) return;
    if (window.confirm('Bạn có chắc muốn ứng tuyển làm Phó Viện Trưởng của trường không?')) {
      setIsApplyingVicePrincipal(true);
      try {
        const res = await applyVicePrincipal();
        if (res.success) {
          toast.success('Gửi yêu cầu ứng tuyển thành công!');
        } else {
          toast.error(res.error || 'Có lỗi xảy ra.');
        }
      } catch (err: any) {
        toast.error(err.message || 'Có lỗi xảy ra.');
      } finally {
        setIsApplyingVicePrincipal(false);
      }
    }
  };

  // --- FILTERS ---
  // Active students under this teacher
  const activeStudents = classLinks.filter(l => l.status === 'active');
  
  // Incoming requests from students trying to join class (Primary Link & pending_tutor)
  const incomingStudentRequests = classLinks.filter(
    l => l.status === 'pending_tutor' && l.link_type === 'primary'
  );

  // Incoming requests from other teachers wanting to join my class as Secondary Teacher
  const incomingTeacherRequests = secondaryTutors.filter(
    sp => sp.status === 'pending_primary'
  );

  // Outgoing invitations sent to students
  const outgoingStudentInvites = classLinks.filter(
    l => l.status === 'pending_student'
  );

  // Outgoing invitations sent to secondary teachers
  const outgoingTeacherInvites = secondaryTutors.filter(
    sp => sp.status === 'pending_tutor'
  );

  // Active secondary teachers connected to my class
  const activeSecondaryTeachers = secondaryTutors.filter(
    sp => sp.status === 'active'
  );

  // Với Chủ Nhiệm Phụ: các đơn "xin đồng hành" mình đã gửi đi, đang chờ giáo viên chính duyệt
  // (cùng status pending_primary nhưng ngược chiều với incomingTeacherRequests của Chủ Nhiệm Chính)
  const outgoingCoTeachRequests = isSecondaryTeacher
    ? secondaryTutors.filter(sp => sp.status === 'pending_primary')
    : [];

  // Dòng "yêu cầu đã gửi, đang chờ" hiển thị ngay trong box đã tạo ra nó
  const renderOutgoingInvite = (id: string, name: string, email: string) => (
    <div key={id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
      <div className="min-w-0">
        <span className="block text-[11px] text-slate-300 font-bold truncate">{name}</span>
        <span className="block text-[10px] text-slate-500 truncate">{email}</span>
      </div>
      <button
        disabled={processingIds[id]}
        onClick={() => handleLeaveClass(id, 'Bạn có chắc muốn thu hồi yêu cầu này?', 'Đã thu hồi yêu cầu.')}
        className="px-2 py-1 text-[9px] text-red-400 hover:text-red-300 bg-red-500/10 rounded font-bold uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[64px] shrink-0"
      >
        {processingIds[id] ? (
          <span className="animate-spin inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"></span>
        ) : (
          'Thu Hồi'
        )}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ================= SECTION 1: INCOMING REQUESTS FOR PRIMARY TEACHER ================= */}
      {isPrimaryTeacher && (incomingStudentRequests.length > 0 || incomingTeacherRequests.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Học sinh xin vào lớp */}
          {incomingStudentRequests.length > 0 && (
            <div className="rounded-2xl border border-synth-orange/20 bg-synth-orange/5 p-4 space-y-3">
              <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider flex items-center gap-2">
                📥 Sĩ Tử Xin Gia Nhập Lớp ({incomingStudentRequests.length})
              </h4>
              <div className="space-y-2">
                {incomingStudentRequests.map(link => (
                  <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      {link.student_avatar ? (
                        <img src={link.student_avatar} alt={link.student_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-xs font-bold text-synth-cyan">
                          {link.student_name ? link.student_name.charAt(0).toUpperCase() : 'S'}
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-white font-bold block">{link.student_name || 'Sĩ Tử'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{link.student_email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={processingIds[link.id]}
                        onClick={() => handleRespondInvite(link.id, true, 'Đã nhận Sĩ Tử vào lớp!')}
                        className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-[10px] uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
                      >
                        {processingIds[link.id] ? (
                          <span className="animate-spin inline-block w-3 h-3 border-2 border-black border-t-transparent rounded-full"></span>
                        ) : (
                          'Nhận'
                        )}
                      </button>
                      <button
                        disabled={processingIds[link.id]}
                        onClick={() => handleRespondInvite(link.id, false, 'Đã từ chối yêu cầu.')}
                        className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-[10px] uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                      >
                        {processingIds[link.id] ? (
                          <span className="animate-spin inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"></span>
                        ) : (
                          'Từ chối'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Giáo viên phụ xin đồng hành */}
          {incomingTeacherRequests.length > 0 && (
            <div className="rounded-2xl border border-synth-purple/20 bg-synth-purple/5 p-4 space-y-3">
              <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider flex items-center gap-2">
                📥 Chủ Nhiệm Phụ Xin Đồng Hành ({incomingTeacherRequests.length})
              </h4>
              <p className="text-[11px] text-slate-300">Chủ nhiệm phụ xin cùng quản lý toàn bộ Sĩ Tử trong lớp của bạn.</p>
              <div className="space-y-2">
                {incomingTeacherRequests.map(sp => (
                  <div key={sp.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      {sp.tutor_avatar ? (
                        <img src={sp.tutor_avatar} alt={sp.tutor_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-synth-purple/10 border border-synth-purple/30 flex items-center justify-center text-xs font-bold text-synth-purple">
                          {sp.tutor_name ? sp.tutor_name.charAt(0).toUpperCase() : 'T'}
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-white font-bold block">{sp.tutor_name || 'Chủ nhiệm phụ'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{sp.tutor_email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={processingIds[sp.id]}
                        onClick={() => handleRespondInvite(sp.id, true, 'Đã duyệt Chủ Nhiệm Phụ!')}
                        className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-[10px] uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
                      >
                        {processingIds[sp.id] ? (
                          <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                        ) : (
                          'Duyệt'
                        )}
                      </button>
                      <button
                        disabled={processingIds[sp.id]}
                        onClick={() => handleRespondInvite(sp.id, false, 'Đã từ chối yêu cầu.')}
                        className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-[10px] uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                      >
                        {processingIds[sp.id] ? (
                          <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                        ) : (
                          'Từ chối'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SECTION 2: INCOMING CLASS INVITATIONS FOR SECONDARY TEACHER ================= */}
      {isSecondaryTeacher && classLinks.filter(l => l.status === 'pending_tutor' && l.link_type === 'secondary').length > 0 && (
        <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-2">
             📩 Lời Mời Đồng Hành Từ Chủ Nhiệm Chính
          </h4>
          <p className="text-xs text-slate-300">
            Bạn được mời làm Chủ Nhiệm Phụ quản lý chung cho lớp học sau:
          </p>
          <div className="space-y-2">
            {classLinks.filter(l => l.status === 'pending_tutor' && l.link_type === 'secondary').map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2.5">
                  {link.tutor_avatar ? (
                    <img src={link.tutor_avatar} alt={link.tutor_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-xs font-bold text-synth-cyan">
                      {link.tutor_name ? link.tutor_name.charAt(0).toUpperCase() : 'T'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">Lớp của Chủ Nhiệm Chính: {link.tutor_name || 'Chủ nhiệm'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{link.tutor_email}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={processingIds[link.id]}
                    onClick={() => handleRespondInvite(link.id, true, 'Đã chấp nhận làm Chủ Nhiệm Phụ!')}
                    className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-xs uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                  >
                    {processingIds[link.id] ? (
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                    ) : (
                      'Đồng ý'
                    )}
                  </button>
                  <button
                    disabled={processingIds[link.id]}
                    onClick={() => handleRespondInvite(link.id, false, 'Đã từ chối lời mời')}
                    className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-xs uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px]"
                  >
                    {processingIds[link.id] ? (
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                    ) : (
                      'Từ chối'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: SEND CONNECTION INVITES & REQUESTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Mời Thành Viên Lớp Học */}
        {isPrimaryTeacher && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">Mời Thành Viên Lớp Học</h4>
              <p className="text-[10px] text-slate-400 mt-1">Tìm kiếm và mời Sĩ Tử gia nhập lớp học của bạn để quản lý và học tập.</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <SearchSuggest
                  placeholder="Tìm Sĩ Tử theo tên/email..."
                  roleFilter="student"
                  value={inviteStudentEmail}
                  onChange={setInviteStudentEmail}
                  onSelect={user => setInviteStudentEmail(user.email)}
                  className="flex-1"
                />
                <button
                  onClick={async () => {
                    if (!inviteStudentEmail.trim()) return;
                    setIsInvitingStudent(true);
                    const result = await sendClassInvite(inviteStudentEmail.trim());
                    if (result.success) {
                      toast.success('Đã gửi lời mời thành công!');
                      setInviteStudentEmail('');
                    } else if (result.conflictCode === 'STUDENT_HAS_PRIMARY') {
                      if (window.confirm(`${result.error}\n\nBạn có muốn gửi lời mời làm Chủ Nhiệm Phụ để cùng quản lý không?`)) {
                        const secRes = await sendClassInvite(inviteStudentEmail.trim(), true);
                        if (secRes.success) {
                          toast.success('Đã gửi lời mời làm Chủ Nhiệm Phụ thành công!');
                          setInviteStudentEmail('');
                        } else {
                          toast.error(secRes.error || 'Thao tác thất bại.');
                        }
                      }
                    } else {
                      toast.error(result.error || 'Gửi lời mời thất bại.');
                    }
                    setIsInvitingStudent(false);
                  }}
                  disabled={isInvitingStudent || !inviteStudentEmail.trim()}
                  className="px-3 bg-synth-cyan text-black font-bold rounded-lg hover:bg-synth-cyan/85 disabled:opacity-50 text-[10px] uppercase cursor-pointer"
                >
                  Mời
                </button>
              </div>

              {/* Lời mời học sinh đã gửi — chờ học sinh chấp nhận */}
              {outgoingStudentInvites.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="block text-[9px] text-synth-orange font-bold uppercase tracking-wider">
                    ⏳ Chờ Sĩ Tử chấp nhận ({outgoingStudentInvites.length})
                  </span>
                  {outgoingStudentInvites.map(link =>
                    renderOutgoingInvite(link.id, link.student_name || 'Sĩ Tử', link.student_email)
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Card 2: Mời Giáo Viên Phụ Đồng Hành */}
        {isPrimaryTeacher && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">Mời Chủ Nhiệm Phụ Đồng Hành</h4>
              <p className="text-[10px] text-slate-400 mt-1">Mời đồng nghiệp làm Chủ Nhiệm Phụ cùng quản lý và hỗ trợ Sĩ Tử trong lớp.</p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <SearchSuggest
                  placeholder="Tìm chủ nhiệm theo tên/email..."
                  roleFilter="tutor"
                  value={inviteTeacherEmail}
                  onChange={setInviteTeacherEmail}
                  onSelect={user => setInviteTeacherEmail(user.email)}
                  className="flex-1"
                />
                <button
                  onClick={async () => {
                    if (!inviteTeacherEmail.trim()) return;
                    setIsInvitingTeacher(true);
                    const success = await inviteSecondary(inviteTeacherEmail.trim());
                    if (success) {
                      toast.success('Đã gửi lời mời Chủ nhiệm phụ thành công!');
                      setInviteTeacherEmail('');
                    }
                    setIsInvitingTeacher(false);
                  }}
                  disabled={isInvitingTeacher || !inviteTeacherEmail.trim()}
                  className="px-3 bg-synth-purple text-white font-bold rounded-lg hover:bg-synth-purple/85 disabled:opacity-50 text-[10px] uppercase cursor-pointer"
                >
                  Mời
                </button>
              </div>

              {/* Lời mời giáo viên phụ đã gửi — chờ giáo viên chấp nhận */}
              {isPrimaryTeacher && outgoingTeacherInvites.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="block text-[9px] text-synth-orange font-bold uppercase tracking-wider">
                    ⏳ Chờ chủ nhiệm phụ chấp nhận ({outgoingTeacherInvites.length})
                  </span>
                  {outgoingTeacherInvites.map(sp =>
                    renderOutgoingInvite(sp.id, sp.tutor_name || 'Chủ nhiệm phụ', sp.tutor_email)
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Card 3: Xin Đồng Hành Lớp Khác */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider">Xin Đồng Hành Lớp Khác</h4>
            <p className="text-[10px] text-slate-400 mt-1">Xin làm Chủ Nhiệm Phụ hỗ trợ quản lý Sĩ Tử cho lớp của đồng nghiệp. Nhập email của họ.</p>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <SearchSuggest
                placeholder="Nhập email Chủ nhiệm chính..."
                roleFilter="tutor"
                value={requestClassEmail}
                onChange={setRequestClassEmail}
                onSelect={user => setRequestClassEmail(user.email)}
                className="flex-1"
              />
              <button
                onClick={async () => {
                  if (!requestClassEmail.trim()) return;
                  setIsRequestingClass(true);
                  const result = await inviteSecondaryRequest(requestClassEmail.trim());
                  if (result.success) {
                    toast.success('Đã gửi yêu cầu kết nối thành công! Vui lòng chờ Chủ nhiệm chính phê duyệt.');
                    setRequestClassEmail('');
                  } else {
                    toast.error(result.error || 'Gửi yêu cầu thất bại.');
                  }
                  setIsRequestingClass(false);
                }}
                disabled={isRequestingClass || !requestClassEmail.trim()}
                className="px-3 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/85 disabled:opacity-50 text-[10px] uppercase cursor-pointer"
              >
                Gửi Xin
              </button>
            </div>

            {/* Đơn xin đồng hành đã gửi — chờ giáo viên chính duyệt */}
            {outgoingCoTeachRequests.length > 0 && (
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <span className="block text-[9px] text-synth-orange font-bold uppercase tracking-wider">
                  ⏳ Chờ chủ nhiệm chính duyệt ({outgoingCoTeachRequests.length})
                </span>
                {outgoingCoTeachRequests.map(sp =>
                  renderOutgoingInvite(sp.id, sp.tutor_name || 'Chủ nhiệm chính', sp.tutor_email)
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Ứng Tuyển Làm Phó Viện Trưởng Trường Học */}
        {(isPrimaryTeacher || isSecondaryTeacher) && (
          <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-2">
                🛡️ Ứng Tuyển Làm Phó Viện Trưởng Trường Học
              </h4>
              <p className="text-[10px] text-slate-400 mt-1">Ứng tuyển làm Phó Viện Trưởng trường học để hỗ trợ Ban Giám Hiệu quản lý toàn diện.</p>
            </div>
            {vicePrincipalApplication ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="animate-pulse text-synth-orange">⏳</span>
                  <div>
                    <span className="text-[11px] text-white font-bold block">Chờ duyệt ứng cử</span>
                    <span className="text-[8px] text-slate-400 block">Gửi: {new Date(vicePrincipalApplication.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <button
                  disabled={processingIds[vicePrincipalApplication.id]}
                  onClick={() => handleLeaveClass(vicePrincipalApplication.id, 'Bạn có chắc muốn hủy đơn ứng cử Phó Viện Trưởng này không?', 'Đã hủy đơn ứng cử Phó Viện Trưởng.')}
                  className="px-2.5 py-1 rounded border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-[9px] uppercase cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[70px]"
                >
                  {processingIds[vicePrincipalApplication.id] ? (
                    <span className="animate-spin inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"></span>
                  ) : (
                    'Hủy Đơn'
                  )}
                </button>
              </div>
            ) : (
              <div className="flex justify-end mt-2">
                <button
                  disabled={isApplyingVicePrincipal}
                  onClick={handleApplyVicePrincipal}
                  className="w-auto px-2.5 py-1 bg-synth-magenta text-black font-bold font-orbitron text-[10px] uppercase rounded hover:synth-glow-magenta transition-all cursor-pointer disabled:opacity-50"
                >
                  {isApplyingVicePrincipal ? '...' : 'Ứng Tuyển'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= SECTION 5: ACTIVE SECONDARY TEACHERS & PERMISSIONS ================= */}
      {isPrimaryTeacher && activeSecondaryTeachers.length > 0 && (
        <div className="rounded-2xl border border-synth-purple/20 bg-synth-purple/5 p-4 space-y-4">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider flex items-center gap-2">
              👥 Đội Ngũ Chủ Nhiệm Phụ
            </h4>
            <p className="text-[11px] text-slate-300 mt-1">Các chủ nhiệm phụ này có quyền truy cập, theo dõi báo cáo và hỗ trợ lớp của bạn.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-synth-purple uppercase font-orbitron text-[9px] tracking-wider">
                  <th className="py-2 px-3">Chủ Nhiệm Phụ</th>
                  <th className="py-2 px-3">Quyền Hạn</th>
                  <th className="py-2 px-3 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeSecondaryTeachers.map((sp: any) => {
                  const perms = sp.secondary_permissions || {};

                  return (
                    <tr key={sp.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {sp.tutor_avatar ? (
                            <img src={sp.tutor_avatar} alt={sp.tutor_name} className="w-6 h-6 rounded-full object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-synth-purple/10 border border-synth-purple/25 flex items-center justify-center text-[10px] font-bold text-synth-purple">
                              {sp.tutor_name ? sp.tutor_name.charAt(0).toUpperCase() : 'T'}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-white block">{sp.tutor_name || 'Chủ nhiệm phụ'}</span>
                            <span className="text-[10px] text-slate-400">{sp.tutor_email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perms.can_approve_rewards || false}
                              disabled={updatingPermsIds[sp.id]}
                              onChange={(e) => handleUpdatePermissions(sp.id, { can_approve_rewards: e.target.checked }, 'Đã cập nhật quyền duyệt quà')}
                              className="accent-synth-purple cursor-pointer disabled:cursor-wait"
                            />
                            <span>Duyệt quà</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perms.can_create_missions || false}
                              disabled={updatingPermsIds[sp.id]}
                              onChange={(e) => handleUpdatePermissions(sp.id, { can_create_missions: e.target.checked }, 'Đã cập nhật quyền giao nhiệm vụ')}
                              className="accent-synth-purple cursor-pointer disabled:cursor-wait"
                            />
                            <span>Giao nhiệm vụ</span>
                          </label>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          disabled={processingIds[sp.id]}
                          onClick={() => handleLeaveClass(sp.id, `Bạn có chắc muốn mời Chủ nhiệm phụ ${sp.tutor_name || sp.tutor_email} ra khỏi lớp không?`, 'Đã xóa Chủ nhiệm phụ khỏi lớp.')}
                          className="px-2 py-1 text-[9px] border border-red-500/30 hover:border-red-500/60 bg-red-500/10 text-red-400 rounded uppercase font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                        >
                          {processingIds[sp.id] ? (
                            <span className="animate-spin inline-block w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full"></span>
                          ) : (
                            'Hủy Đồng Hành'
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= SECTION 6: ACTIVE CLASSES THAT I CO-MANAGE AS SECONDARY TEACHER ================= */}
      {isSecondaryTeacher && activeStudents.length > 0 && (
        <div className="rounded-2xl border border-synth-cyan/20 bg-synth-cyan/5 p-4 space-y-4">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-2">
              🏛️ Lớp Học Đang Đồng Hành (Chủ Nhiệm Phụ)
            </h4>
            <p className="text-[11px] text-slate-300 mt-1">Bạn đang hỗ trợ quản lý Sĩ Tử cho các chủ nhiệm chính sau:</p>
          </div>

          <div className="space-y-3">
            {secondaryTutors.filter(sp => sp.status === 'active').map((sp: any) => (
              <div key={sp.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2.5">
                  {sp.tutor_avatar ? (
                    <img src={sp.tutor_avatar} alt={sp.tutor_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-xs font-bold text-synth-cyan">
                      {sp.tutor_name ? sp.tutor_name.charAt(0).toUpperCase() : 'T'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">Chủ Nhiệm Chính: {sp.tutor_name}</span>
                    <span className="text-[10px] text-slate-400">{sp.tutor_email}</span>
                  </div>
                </div>
                <button
                  disabled={processingIds[sp.id]}
                  onClick={() => handleLeaveClass(sp.id, 'Bạn có chắc muốn xin dừng đồng hành với lớp này không?', 'Đã rời lớp đồng hành.')}
                  className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
                >
                  {processingIds[sp.id] ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                  ) : (
                    'Dừng Đồng Hành'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
