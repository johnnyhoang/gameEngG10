import React, { useState } from 'react';
import { toast } from '../../utils/toast';
import { SearchSuggest } from '../Common/SearchSuggest';

interface FamilyManagerProps {
  currentUser: any;
  familyLinks: any[];
  secondaryParents: any[];
  sendInvite: (targetEmail: string, connectAsSecondary?: boolean) => Promise<{ success: boolean; conflictCode?: string; error?: string }>;
  respondInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  inviteSecondary: (email: string) => Promise<boolean>;
  inviteSecondaryRequest: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateSecondaryPermissions: (linkId: string, permissions: any) => Promise<boolean>;
  leaveFamily: (linkId: string) => Promise<boolean>;
  applyVicePrincipal?: () => Promise<{ success: boolean; error?: string }>;
}

export const FamilyManager: React.FC<FamilyManagerProps> = ({
  currentUser,
  familyLinks,
  secondaryParents,
  sendInvite,
  respondInvite,
  inviteSecondary,
  inviteSecondaryRequest,
  updateSecondaryPermissions,
  leaveFamily,
  applyVicePrincipal
}) => {
  const [inviteStudentEmail, setInviteStudentEmail] = useState('');
  const [isInvitingStudent, setIsInvitingStudent] = useState(false);

  const [inviteTeacherEmail, setInviteTeacherEmail] = useState('');
  const [isInvitingTeacher, setIsInvitingTeacher] = useState(false);

  const [requestClassEmail, setRequestClassEmail] = useState('');
  const [isRequestingClass, setIsRequestingClass] = useState(false);
  const [isApplyingVicePrincipal, setIsApplyingVicePrincipal] = useState(false);

  const isPrimaryTeacher = currentUser?.role === 'parent';
  const isSecondaryTeacher = currentUser?.role === 'secondary_parent';

  const vicePrincipalApplication = familyLinks.find(
    l => l.link_type === 'vice_principal' && l.parent_id === currentUser?.id
  );

  const handleApplyVicePrincipal = async () => {
    if (!applyVicePrincipal) return;
    if (window.confirm('Bạn có chắc muốn ứng tuyển làm Hiệu Phó của trường không?')) {
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
  const activeStudents = familyLinks.filter(l => l.status === 'active');
  
  // Incoming requests from students trying to join class (Primary Link & pending_parent)
  const incomingStudentRequests = familyLinks.filter(
    l => l.status === 'pending_parent' && l.link_type === 'primary'
  );

  // Incoming requests from other teachers wanting to join my class as Secondary Teacher
  const incomingTeacherRequests = secondaryParents.filter(
    sp => sp.status === 'pending_primary'
  );

  // Outgoing invitations sent to students
  const outgoingStudentInvites = familyLinks.filter(
    l => l.status === 'pending_student'
  );

  // Outgoing invitations sent to secondary teachers
  const outgoingTeacherInvites = secondaryParents.filter(
    sp => sp.status === 'pending_parent'
  );

  // Active secondary teachers connected to my class
  const activeSecondaryTeachers = secondaryParents.filter(
    sp => sp.status === 'active'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-synth-cyan uppercase tracking-wider flex items-center gap-2">
            🏫 Quản Lý Lớp Học & Đội Ngũ Chủ Nhiệm
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Vai trò hiện tại: <span className="font-bold text-synth-magenta uppercase font-orbitron">{isPrimaryTeacher ? 'Chủ nhiệm chính' : 'Phó chủ nhiệm'}</span>
          </p>
        </div>
      </div>

      {/* ================= SECTION 1: INCOMING REQUESTS FOR PRIMARY TEACHER ================= */}
      {isPrimaryTeacher && (incomingStudentRequests.length > 0 || incomingTeacherRequests.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Học sinh xin vào lớp */}
          {incomingStudentRequests.length > 0 && (
            <div className="rounded-2xl border border-synth-orange/20 bg-synth-orange/5 p-4 space-y-3">
              <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider flex items-center gap-2">
                📥 Học Sinh Xin Gia Nhập Lớp ({incomingStudentRequests.length})
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
                        <span className="text-xs text-white font-bold block">{link.student_name || 'Học sinh'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{link.student_email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          const ok = await respondInvite(link.id, true);
                          if (ok) toast.success('Đã nhận học sinh vào lớp!');
                        }}
                        className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-[10px] uppercase cursor-pointer"
                      >
                        Nhận
                      </button>
                      <button
                        onClick={async () => {
                          const ok = await respondInvite(link.id, false);
                          if (ok) toast.info('Đã từ chối yêu cầu.');
                        }}
                        className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-[10px] uppercase cursor-pointer"
                      >
                        Từ chối
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
                📥 Giáo Viên Khác Xin Đồng Hành ({incomingTeacherRequests.length})
              </h4>
              <p className="text-[11px] text-slate-300">Giáo viên phụ xin cùng quản lý toàn bộ học sinh trong lớp của bạn.</p>
              <div className="space-y-2">
                {incomingTeacherRequests.map(sp => (
                  <div key={sp.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      {sp.parent_avatar ? (
                        <img src={sp.parent_avatar} alt={sp.parent_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-synth-purple/10 border border-synth-purple/30 flex items-center justify-center text-xs font-bold text-synth-purple">
                          {sp.parent_name ? sp.parent_name.charAt(0).toUpperCase() : 'T'}
                        </div>
                      )}
                      <div>
                        <span className="text-xs text-white font-bold block">{sp.parent_name || 'Giáo viên phụ'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{sp.parent_email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          const ok = await respondInvite(sp.id, true);
                          if (ok) toast.success('Đã duyệt Phó Chủ Nhiệm!');
                        }}
                        className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-[10px] uppercase cursor-pointer"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={async () => {
                          const ok = await respondInvite(sp.id, false);
                          if (ok) toast.info('Đã từ chối yêu cầu.');
                        }}
                        className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-[10px] uppercase cursor-pointer"
                      >
                        Từ chối
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
      {isSecondaryTeacher && familyLinks.filter(l => l.status === 'pending_parent' && l.link_type === 'secondary').length > 0 && (
        <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-2">
             📩 Lời Mời Đồng Hành Từ Giáo Viên Chính
          </h4>
          <p className="text-xs text-slate-300">
            Bạn được mời làm Giáo viên phụ (Phó Chủ Nhiệm) quản lý chung cho lớp học sau:
          </p>
          <div className="space-y-2">
            {familyLinks.filter(l => l.status === 'pending_parent' && l.link_type === 'secondary').map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2.5">
                  {link.parent_avatar ? (
                    <img src={link.parent_avatar} alt={link.parent_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-xs font-bold text-synth-cyan">
                      {link.parent_name ? link.parent_name.charAt(0).toUpperCase() : 'T'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">Lớp của Thầy/Cô: {link.parent_name || 'Giáo viên'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{link.parent_email}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const ok = await respondInvite(link.id, true);
                      if (ok) toast.success('Đã chấp nhận làm Phó Chủ Nhiệm!');
                    }}
                    className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={async () => {
                      const ok = await respondInvite(link.id, false);
                      if (ok) toast.info('Đã từ chối lời mời');
                    }}
                    className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-xs uppercase cursor-pointer"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 3: SEND CONNECTION INVITES & REQUESTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form dành cho Giáo Viên Chính */}
        {isPrimaryTeacher && (
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
            <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">Mời Thành Viên Lớp Học</h4>
            
            {/* Mời Học Sinh */}
            <div className="space-y-2">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mời Học Sinh Gia Nhập</span>
              <div className="flex gap-2">
                <SearchSuggest
                  placeholder="Tìm học sinh theo tên/email..."
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
                    const result = await sendInvite(inviteStudentEmail.trim());
                    if (result.success) {
                      toast.success('Đã gửi lời mời thành công!');
                      setInviteStudentEmail('');
                    } else if (result.conflictCode === 'STUDENT_HAS_PRIMARY') {
                      if (window.confirm(`${result.error}\n\nBạn có muốn gửi lời mời làm Phó Chủ Nhiệm để cùng quản lý không?`)) {
                        const secRes = await sendInvite(inviteStudentEmail.trim(), true);
                        if (secRes.success) {
                          toast.success('Đã gửi lời mời làm Phó Chủ Nhiệm thành công!');
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
                  Mời Học Sinh
                </button>
              </div>
            </div>

            {/* Mời Giáo Viên Phụ (Phó Chủ Nhiệm) */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mời Giáo Viên Phụ Đồng Hành</span>
              <div className="flex gap-2">
                <SearchSuggest
                  placeholder="Tìm giáo viên theo tên/email..."
                  roleFilter="parent"
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
                      toast.success('Đã gửi lời mời Giáo viên phụ thành công!');
                      setInviteTeacherEmail('');
                    }
                    setIsInvitingTeacher(false);
                  }}
                  disabled={isInvitingTeacher || !inviteTeacherEmail.trim()}
                  className="px-3 bg-synth-purple text-white font-bold rounded-lg hover:bg-synth-purple/85 disabled:opacity-50 text-[10px] uppercase cursor-pointer"
                >
                  Mời Chủ Nhiệm Phụ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form xin kết nối lớp dành cho mọi Giáo Viên (cả chính và phụ đều có thể xin phụ lớp khác) */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
          <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider">Xin Đồng Hành Lớp Khác</h4>
          <p className="text-[10px] text-slate-400">Bạn muốn xin làm Phó Chủ Nhiệm hỗ trợ quản lý học sinh cho lớp của đồng nghiệp? Nhập email đồng nghiệp bên dưới.</p>
          <div className="space-y-2">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Giáo Viên Chính</span>
            <div className="flex gap-2">
              <SearchSuggest
                placeholder="Nhập email Giáo viên chính..."
                roleFilter="parent"
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
                    toast.success('Đã gửi yêu cầu kết nối thành công! Vui lòng chờ Giáo viên chính phê duyệt.');
                    setRequestClassEmail('');
                  } else {
                    toast.error(result.error || 'Gửi yêu cầu thất bại.');
                  }
                  setIsRequestingClass(false);
                }}
                disabled={isRequestingClass || !requestClassEmail.trim()}
                className="px-3 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/85 disabled:opacity-50 text-[10px] uppercase cursor-pointer"
              >
                Xin Làm GV Phụ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 4: OUTGOING REQUESTS PENDING RESPONSE ================= */}
      {(outgoingStudentInvites.length > 0 || outgoingTeacherInvites.length > 0) && (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-slate-400 uppercase tracking-wider">
            ⏳ Yêu Cầu Kết Nối Đã Gửi Đi (Đang Chờ Duyệt)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Học sinh chờ duyệt */}
            {outgoingStudentInvites.map(link => (
              <div key={link.id} className="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-white/5 text-xs">
                <div>
                  <span className="block text-slate-300 font-bold">{link.student_name || 'Học sinh'}</span>
                  <span className="text-[10px] text-slate-500">{link.student_email}</span>
                </div>
                <button
                  onClick={async () => {
                    if (window.confirm('Bạn có chắc muốn thu hồi lời mời này?')) {
                      const ok = await leaveFamily(link.id);
                      if (ok) toast.success('Đã thu hồi lời mời.');
                    }
                  }}
                  className="px-2 py-1 text-[9px] text-red-400 hover:text-red-300 bg-red-500/10 rounded font-bold uppercase cursor-pointer"
                >
                  Thu Hồi
                </button>
              </div>
            ))}

            {/* Giáo viên phụ chờ duyệt */}
            {outgoingTeacherInvites.map(sp => (
              <div key={sp.id} className="flex items-center justify-between p-2 rounded-xl bg-black/20 border border-white/5 text-xs">
                <div>
                  <span className="block text-synth-purple font-bold">{sp.parent_name || 'Giáo viên phụ'}</span>
                  <span className="text-[10px] text-slate-500">{sp.parent_email}</span>
                </div>
                <button
                  onClick={async () => {
                    if (window.confirm('Bạn có chắc muốn thu hồi lời mời này?')) {
                      const ok = await leaveFamily(sp.id);
                      if (ok) toast.success('Đã thu hồi lời mời.');
                    }
                  }}
                  className="px-2 py-1 text-[9px] text-red-400 hover:text-red-300 bg-red-500/10 rounded font-bold uppercase cursor-pointer"
                >
                  Thu Hồi
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 5: ACTIVE SECONDARY TEACHERS & PERMISSIONS ================= */}
      {isPrimaryTeacher && activeSecondaryTeachers.length > 0 && (
        <div className="rounded-2xl border border-synth-purple/20 bg-synth-purple/5 p-4 space-y-4">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider flex items-center gap-2">
              👥 Đội Ngũ Giáo Viên Phụ (Phó Chủ Nhiệm)
            </h4>
            <p className="text-[11px] text-slate-300 mt-1">Các giáo viên phụ này có quyền truy cập, theo dõi báo cáo và hỗ trợ lớp của bạn.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-synth-purple uppercase font-orbitron text-[9px] tracking-wider">
                  <th className="py-2 px-3">Giáo Viên Phụ</th>
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
                          {sp.parent_avatar ? (
                            <img src={sp.parent_avatar} alt={sp.parent_name} className="w-6 h-6 rounded-full object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-synth-purple/10 border border-synth-purple/25 flex items-center justify-center text-[10px] font-bold text-synth-purple">
                              {sp.parent_name ? sp.parent_name.charAt(0).toUpperCase() : 'T'}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-white block">{sp.parent_name || 'Giáo viên phụ'}</span>
                            <span className="text-[10px] text-slate-400">{sp.parent_email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perms.can_approve_rewards || false}
                              onChange={async (e) => {
                                await updateSecondaryPermissions(sp.id, {
                                  can_approve_rewards: e.target.checked
                                });
                                toast.success('Đã cập nhật quyền duyệt quà');
                              }}
                              className="accent-synth-purple"
                            />
                            <span>Duyệt quà</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perms.can_create_missions || false}
                              onChange={async (e) => {
                                await updateSecondaryPermissions(sp.id, {
                                  can_create_missions: e.target.checked
                                });
                                toast.success('Đã cập nhật quyền giao nhiệm vụ');
                              }}
                              className="accent-synth-purple"
                            />
                            <span>Giao nhiệm vụ</span>
                          </label>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={async () => {
                            if (window.confirm(`Bạn có chắc muốn mời Giáo viên phụ ${sp.parent_name || sp.parent_email} ra khỏi lớp không?`)) {
                              const success = await leaveFamily(sp.id);
                              if (success) toast.success('Đã xóa Giáo viên phụ khỏi lớp.');
                            }
                          }}
                          className="px-2 py-1 text-[9px] border border-red-500/30 hover:border-red-500/60 bg-red-500/10 text-red-400 rounded uppercase font-bold cursor-pointer"
                        >
                          Hủy Đồng Hành
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
              🏛️ Lớp Học Đang Đồng Hành (Phó Chủ Nhiệm)
            </h4>
            <p className="text-[11px] text-slate-300 mt-1">Bạn đang hỗ trợ quản lý học sinh cho các giáo viên chính sau:</p>
          </div>

          <div className="space-y-3">
            {/* We find unique active class-level links for this secondary parent */}
            {secondaryParents.filter(sp => sp.status === 'active').map((sp: any) => (
              <div key={sp.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2.5">
                  {sp.parent_avatar ? (
                    <img src={sp.parent_avatar} alt={sp.parent_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center text-xs font-bold text-synth-cyan">
                      {sp.parent_name ? sp.parent_name.charAt(0).toUpperCase() : 'T'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">Giáo Viên Chính: {sp.parent_name}</span>
                    <span className="text-[10px] text-slate-400">{sp.parent_email}</span>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (window.confirm('Bạn có chắc muốn xin dừng đồng hành với lớp này không?')) {
                      const success = await leaveFamily(sp.id);
                      if (success) toast.success('Đã rời lớp đồng hành.');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors"
                >
                  Rừng Đồng Hành
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 7: VICE PRINCIPAL APPLICATION ================= */}
      {(isPrimaryTeacher || isSecondaryTeacher) && (
        <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-4">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-2">
              🛡️ Ứng Tuyển Làm Hiệu Phó Trường Học
            </h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Bạn có thể ứng cử làm Hiệu Phó để hỗ trợ Ban Giám Hiệu quản lý ngân hàng câu hỏi, học sinh và phân quyền toàn trường. Đơn ứng cử sẽ được gửi trực tiếp đến tất cả Hiệu Trưởng để phê duyệt.
            </p>
          </div>

          {vicePrincipalApplication ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="animate-pulse text-synth-orange">⏳</span>
                <div>
                  <span className="text-xs text-white font-bold block">Đang chờ Hiệu Trưởng duyệt ứng cử</span>
                  <span className="text-[9px] text-slate-400">Ngày gửi: {new Date(vicePrincipalApplication.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (window.confirm('Bạn có chắc muốn hủy đơn ứng cử Hiệu Phó này không?')) {
                    const ok = await leaveFamily(vicePrincipalApplication.id);
                    if (ok) toast.success('Đã hủy đơn ứng cử Hiệu Phó.');
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors"
              >
                Hủy Ứng Tuyển
              </button>
            </div>
          ) : (
            <div className="flex justify-start">
              <button
                disabled={isApplyingVicePrincipal}
                onClick={handleApplyVicePrincipal}
                className="px-4 py-2 bg-synth-magenta text-black font-bold font-orbitron text-xs uppercase rounded-lg hover:synth-glow-magenta transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplyingVicePrincipal ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Ứng Tuyển 🛡️'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
