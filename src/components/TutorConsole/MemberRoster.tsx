import React, { useState, useMemo } from 'react';
import { BarChart as ChartIcon, FileText } from 'lucide-react';
import { getStudentRankForLevel } from '../../types/game';
import { isAdmin } from '../../utils/roleHelpers';

interface MemberRosterProps {
  currentUser: any;
  adminStudents: any[];
  adminLinks?: any[];
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
}

export const MemberRoster: React.FC<MemberRosterProps> = ({
  currentUser,
  adminStudents,
  adminLinks = [],
  auditLogs,
  fetchAuditLogs
}) => {
  const [rosterTab, setRosterTab] = useState<'students' | 'primary_teachers' | 'secondary_teachers' | 'admins'>('students');
  const [teacherStudentTab, setTeacherStudentTab] = useState<'mine' | 'co_managed'>('mine');

  const isCallerAdmin = isAdmin(currentUser?.role);

  // Filter students strictly by role
  const allStudents = useMemo(() => {
    return adminStudents.filter((s: any) => s.role === 'student');
  }, [adminStudents]);

  // If teacher: filter students into "My Class" (Primary link) and "Co-managed Class" (Secondary link)
  const myClassStudents = useMemo(() => {
    if (isCallerAdmin) return allStudents;
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.tutor_id === currentUser?.id && l.link_type === 'primary')
      .map((l: any) => l.student_id);
    return allStudents.filter((s: any) => studentIds.includes(s.id));
  }, [allStudents, adminLinks, currentUser?.id, isCallerAdmin]);

  const coManagedClassStudents = useMemo(() => {
    if (isCallerAdmin) return [];
    const studentIds = (adminLinks || [])
      .filter((l: any) => l.tutor_id === currentUser?.id && l.link_type === 'secondary')
      .map((l: any) => l.student_id);
    return allStudents.filter((s: any) => studentIds.includes(s.id));
  }, [allStudents, adminLinks, currentUser?.id, isCallerAdmin]);

  const activeDisplayStudents = useMemo(() => {
    if (isCallerAdmin) {
      return [...allStudents].sort((a, b) => (b.player?.xp || 0) - (a.player?.xp || 0));
    }
    const pool = teacherStudentTab === 'mine' ? myClassStudents : coManagedClassStudents;
    return [...pool].sort((a, b) => (b.player?.xp || 0) - (a.player?.xp || 0));
  }, [isCallerAdmin, allStudents, teacherStudentTab, myClassStudents, coManagedClassStudents]);

  // Other personnel lists
  const primaryTeachers = useMemo(() => {
    const list = adminStudents.filter((u: any) => u.role === 'tutor');
    if (isCallerAdmin) return list;
    const studentIds = [...myClassStudents, ...coManagedClassStudents].map(s => s.id);
    const parentIds = (adminLinks || [])
      .filter(l => studentIds.includes(l.student_id) && l.tutor_role === 'tutor')
      .map(l => l.tutor_id);
    return list.filter(u => parentIds.includes(u.id) || u.id === currentUser?.id);
  }, [adminStudents, isCallerAdmin, myClassStudents, coManagedClassStudents, adminLinks, currentUser?.id]);

  const secondaryTeachers = useMemo(() => {
    const list = adminStudents.filter((u: any) => u.role === 'secondary_tutor');
    if (isCallerAdmin) return list;
    const studentIds = [...myClassStudents, ...coManagedClassStudents].map(s => s.id);
    const parentIds = (adminLinks || [])
      .filter(l => studentIds.includes(l.student_id) && l.tutor_role === 'secondary_tutor')
      .map(l => l.tutor_id);
    return list.filter(u => parentIds.includes(u.id) || u.id === currentUser?.id);
  }, [adminStudents, isCallerAdmin, myClassStudents, coManagedClassStudents, adminLinks, currentUser?.id]);

  const schoolAdmins = useMemo(() => {
    return adminStudents.filter((u: any) => u.role === 'truong_vien' || u.role === 'pho_vien');
  }, [adminStudents]);

  // Helpers to get relationships
  const getStudentCoManagers = (studentId: string) => {
    const links = (adminLinks || []).filter(l => l.student_id === studentId);
    const managers = links.map(l => {
      const roleName = l.tutor_role === 'tutor' ? 'Chủ Nhiệm Chính' : 'Chủ Nhiệm Phụ';
      return `${l.tutor_name} (${roleName})`;
    });
    return managers.length > 0 ? managers.join(', ') : 'Chưa nhận lớp';
  };

  const getTeacherManagedStudents = (teacherId: string, linkType: 'primary' | 'secondary') => {
    const studentIds = (adminLinks || [])
      .filter(l => l.tutor_id === teacherId && l.link_type === linkType)
      .map(l => l.student_id);
    const names = adminStudents
      .filter(s => s.role === 'student' && studentIds.includes(s.id))
      .map(s => s.name);
    return names.length > 0 ? names.join(', ') : 'Trống';
  };

  return (
    <div className="space-y-6">
      {/* Thống Kê Hoạt Động & Roster */}
      <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-6">
        <div className="flex items-center gap-2">
          <ChartIcon className="w-4 h-4 text-synth-cyan" />
          <h3 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">
            📊 Thư Tịch Thành Viên & Học Lực
          </h3>
        </div>

        {/* Rich Directory & Roster Lists Section */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-white/10 pb-3 gap-2.5">
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              📁 Danh Sách Thành Viên Học Viện
            </h4>
            {/* Roster Tabs */}
            <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-[10px] uppercase font-bold font-orbitron overflow-x-auto">
              {[
                { key: 'students', label: `Học Sinh (${allStudents.length})` },
                { key: 'primary_teachers', label: `Chủ Nhiệm Chính (${primaryTeachers.length})` },
                { key: 'secondary_teachers', label: `Chủ Nhiệm Phụ (${secondaryTeachers.length})` },
                { key: 'admins', label: `Ban Giám Hiệu (${schoolAdmins.length})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setRosterTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                    rosterTab === tab.key ? 'bg-synth-cyan text-black font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-selector for Students (Only for Teachers) */}
          {rosterTab === 'students' && !isCallerAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => setTeacherStudentTab('mine')}
                className={`px-3 py-1 rounded-lg font-orbitron font-bold text-[9px] uppercase cursor-pointer transition-all border ${
                  teacherStudentTab === 'mine' 
                    ? 'bg-synth-magenta/15 border-synth-magenta text-synth-magenta'
                    : 'border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Lớp của tôi (Chủ nhiệm) ({myClassStudents.length})
              </button>
              <button
                onClick={() => setTeacherStudentTab('co_managed')}
                className={`px-3 py-1 rounded-lg font-orbitron font-bold text-[9px] uppercase cursor-pointer transition-all border ${
                  teacherStudentTab === 'co_managed'
                    ? 'bg-synth-magenta/15 border-synth-magenta text-synth-magenta'
                    : 'border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Lớp tham gia phụ (Phó chủ nhiệm) ({coManagedClassStudents.length})
              </button>
            </div>
          )}

          {/* Roster Tables */}
          <div className="overflow-x-auto">
            {rosterTab === 'students' && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-orbitron uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 px-3">Xếp hạng</th>
                    <th className="py-2.5 px-3">Học Sinh</th>
                    <th className="py-2.5 px-3">Cấp Độ</th>
                    <th className="py-2.5 px-3">Danh Hiệu Học Tập</th>
                    <th className="py-2.5 px-3">Chuỗi Ngày</th>
                    <th className="py-2.5 px-3">Người Quản Lý</th>
                    <th className="py-2.5 px-3 text-right">Tích Lũy XP</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDisplayStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-synth-text-muted italic">
                        Không có học sinh nào trong danh sách.
                      </td>
                    </tr>
                  ) : (
                    activeDisplayStudents.map((stud, idx) => {
                      const lv = stud.player?.level || 1;
                      const studentRank = getStudentRankForLevel(lv);
                      return (
                        <tr key={stud.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-2.5 px-3 font-orbitron font-bold text-slate-400">#{idx + 1}</td>
                          <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                            <img 
                              src={stud.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                              alt={stud.name} 
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <div>
                              <span className="block">{stud.name}</span>
                              <span className="block text-[9px] text-slate-500 font-sans font-normal">{stud.email}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-orbitron font-black text-synth-magenta">LV.{lv}</td>
                          <td className="py-2.5 px-3 font-bold text-synth-orange">
                            {studentRank.icon} {studentRank.name}
                          </td>
                          <td className="py-2.5 px-3 text-orange-400 font-semibold">{stud.player?.streak || 0} Ngày</td>
                          <td className="py-2.5 px-3 text-slate-300 max-w-[180px] truncate" title={getStudentCoManagers(stud.id)}>
                            {getStudentCoManagers(stud.id)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-orbitron text-synth-green font-bold">
                            {(stud.player?.xp || 0).toLocaleString()} XP
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {rosterTab === 'primary_teachers' && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-orbitron uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 px-3">Tên Giáo Viên</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Sĩ Tử Phụ Trách (Chủ Nhiệm Chính)</th>
                  </tr>
                </thead>
                <tbody>
                  {primaryTeachers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-synth-text-muted italic">
                        Không có giáo viên chủ nhiệm nào.
                      </td>
                    </tr>
                  ) : (
                    primaryTeachers.map(teacher => (
                      <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <img 
                            src={teacher.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={teacher.name} 
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          {teacher.name}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans">{teacher.email}</td>
                        <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate" title={getTeacherManagedStudents(teacher.id, 'primary')}>
                          {getTeacherManagedStudents(teacher.id, 'primary')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {rosterTab === 'secondary_teachers' && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-orbitron uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 px-3">Tên Người Hỗ Trợ</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Học Sinh Hỗ Trợ (Chủ Nhiệm Phụ)</th>
                  </tr>
                </thead>
                <tbody>
                  {secondaryTeachers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-synth-text-muted italic">
                        Không có phó chủ nhiệm hoặc giáo viên hỗ trợ nào.
                      </td>
                    </tr>
                  ) : (
                    secondaryTeachers.map(teacher => (
                      <tr key={teacher.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <img 
                            src={teacher.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={teacher.name} 
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          {teacher.name}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans">{teacher.email}</td>
                        <td className="py-2.5 px-3 text-slate-400 max-w-xs truncate" title={getTeacherManagedStudents(teacher.id, 'secondary')}>
                          {getTeacherManagedStudents(teacher.id, 'secondary')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {rosterTab === 'admins' && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-orbitron uppercase text-[9px] tracking-wider">
                    <th className="py-2.5 px-3">Ban Giám Hiệu</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Chức Vụ Học Viện</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolAdmins.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-synth-text-muted italic">
                        Không tìm thấy thành viên ban giám hiệu.
                      </td>
                    </tr>
                  ) : (
                    schoolAdmins.map(admin => (
                      <tr key={admin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <img 
                            src={admin.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={admin.name} 
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          {admin.name}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans">{admin.email}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] ${
                            admin.role === 'truong_vien' ? 'bg-synth-magenta/20 text-synth-magenta' : 'bg-synth-yellow/20 text-synth-yellow'
                          }`}>
                            {admin.role === 'truong_vien' ? 'Viện Trưởng 👑' : 'Phó Viện Trưởng 🛡️'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Nhật Ký Quyết Nghị Viện Trưởng (Audit Logs) */}
      {isCallerAdmin && (
        <div className="bg-synth-gray/10 rounded-xl p-4 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-synth-magenta" /> 📜 Nhật Ký Quyết Nghị Viện Trưởng (Audit Logs)
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
                    } else if (log.action === 'invite_secondary_parent') {
                      actionBadgeColor = 'bg-synth-purple/10 text-synth-purple border border-synth-purple/20';
                      actionName = 'Mời Chủ Nhiệm Phụ';
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
                        detailText = `Hủy đổi "${p.rewardTitle || 'Quà'}", hoàn trả ${p.refundRuby} Ruby`;
                      } else if (log.action === 'refill_energy') {
                        detailText = `Nạp đầy Năng Lượng lên ${p.targetEnergy}%`;
                      } else if (log.action === 'promote_user') {
                        detailText = `Bổ nhiệm vai trò mới: ${p.targetRole === 'pho_vien' ? 'Phó Viện Trưởng 🛡️' : p.targetRole === 'tutor' ? 'Chủ Nhiệm Chính' : 'Sĩ Tử'}`;
                      } else if (log.action === 'invite_secondary_parent') {
                        detailText = 'Gửi thư mời làm Chủ nhiệm Phụ cùng quản lý';
                      } else if (log.action === 'update_secondary_permissions') {
                        const rights = [];
                        if (p.permissions?.can_approve_rewards) rights.push('Duyệt quà');
                        if (p.permissions?.can_create_missions) rights.push('Giao NV');
                        detailText = `Cập nhật quyền hạn: [${rights.join(', ') || 'Chỉ xem'}]`;
                      } else {
                        detailText = JSON.stringify(p);
                      }
                    } catch {
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
                            {log.actor_role === 'truong_vien' ? 'Viện Trưởng' : log.actor_role === 'pho_vien' ? 'Phó Viện Trưởng' : 'Chủ Nhiệm Chính'}
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
