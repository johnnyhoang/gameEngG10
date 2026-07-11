import React, { useState } from 'react';
import { isParentRole } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';

interface FamilyManagerProps {
  currentUser: any;
  familyLinks: any[];
  secondaryParents: any[];
  sendInvite: (targetEmail: string, connectAsSecondary?: boolean) => Promise<{ success: boolean; conflictCode?: string; error?: string }>;
  respondInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  inviteSecondary: (email: string, studentId: string) => Promise<boolean>;
  updateSecondaryPermissions: (linkId: string, permissions: any) => Promise<boolean>;
}

export const FamilyManager: React.FC<FamilyManagerProps> = ({
  currentUser,
  familyLinks,
  secondaryParents,
  sendInvite,
  respondInvite,
  inviteSecondary,
  updateSecondaryPermissions
}) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSecondaryEmail, setInviteSecondaryEmail] = useState('');
  const [selectedSecondaryStudentId, setSelectedSecondaryStudentId] = useState('');
  const [isInvitingSecondary, setIsInvitingSecondary] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="font-orbitron font-bold text-sm text-synth-magenta uppercase tracking-wider flex items-center gap-2">
        🏛️ Chính Điện — Quản lý thiếu hiệp & Cấp quyền
      </h3>

      {/* Mời Thiếu Hiệp (Family System Phase 1.1) */}
      <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-4">
        <div className="space-y-1">
          <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider">Mời Học Sinh</h4>
          <p className="text-xs text-slate-300">Nhập Email Google của học sinh để gửi lời mời liên kết lớp chủ nhiệm. Bạn cũng có thể xem danh sách lời mời đang chờ bên dưới.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            placeholder="Nhập Email Google của học sinh (ví dụ: hocsinh@gmail.com)"
            className="flex-1 p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-magenta font-mono text-sm"
          />
          <button
            onClick={async () => {
              if (!inviteEmail.trim()) return;
              setIsInviting(true);
              const result = await sendInvite(inviteEmail.trim());
              if (result.success) {
                toast.success('Đã gửi lời mời kết nối thành công!');
                setInviteEmail('');
              } else if (result.conflictCode === 'STUDENT_HAS_PRIMARY') {
                if (window.confirm(`${result.error}\n\nBạn có muốn gửi lời mời làm Phó Chủ Nhiệm để cùng quản lý không?`)) {
                  const secRes = await sendInvite(inviteEmail.trim(), true);
                  if (secRes.success) {
                    toast.success('Đã gửi lời mời làm Phó Chủ Nhiệm thành công!');
                    setInviteEmail('');
                  } else {
                    toast.error(secRes.error || 'Gửi lời mời làm Phó Chủ Nhiệm thất bại.');
                  }
                }
              } else {
                toast.error(result.error || 'Gửi lời mời thất bại. Email không tồn tại hoặc đã liên kết.');
              }
              setIsInviting(false);
            }}
            disabled={isInviting || !inviteEmail.trim()}
            className="px-4 py-2.5 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/80 disabled:opacity-50 transition-colors uppercase text-xs cursor-pointer"
          >
            {isInviting ? 'Đang gửi...' : 'Gửi lời mời'}
          </button>
        </div>

        {familyLinks.filter(l => l.status === 'pending_student' && l.parent_id === currentUser?.id).length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <h5 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase">Lời mời đang chờ học sinh duyệt</h5>
            <div className="space-y-2">
              {familyLinks.filter(l => l.status === 'pending_student' && l.parent_id === currentUser?.id).map(link => (
                <div key={link.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-300">Gửi tới Học sinh: <span className="font-bold text-synth-cyan">{link.student_name || link.student_id}</span></span>
                  <span className="text-[10px] text-synth-orange uppercase px-2 py-1 bg-synth-orange/10 rounded">Đang chờ</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lời mời làm Chủ Nhiệm Phụ nhận được (Sprint 2) */}
      {isParentRole(currentUser?.role) && familyLinks.filter(l => l.status === 'pending_parent' && l.parent_id === currentUser?.id && l.link_type === 'secondary').length > 0 && (
        <div className="rounded-2xl border border-synth-orange/20 bg-synth-orange/5 p-4 space-y-3 mt-4">
          <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider">
             📩 Lời Mời Đồng Hành (Chủ Nhiệm Phụ)
          </h4>
          <p className="text-xs text-slate-300">
            Bạn được mời làm Chủ nhiệm Phụ cùng quản lý học sinh sau:
          </p>
          <div className="space-y-2">
            {familyLinks.filter(l => l.status === 'pending_parent' && l.parent_id === currentUser?.id && l.link_type === 'secondary').map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-xs text-white font-bold block">{link.student_name || 'Học sinh'}</span>
                  <span className="text-[10px] text-synth-text-muted font-mono">{link.student_id}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const ok = await respondInvite(link.id, true);
                      if (ok) {
                        toast.success('Đã chấp nhận làm Chủ nhiệm Phụ!');
                      }
                    }}
                    className="px-3 py-1.5 rounded bg-synth-green text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={async () => {
                      const ok = await respondInvite(link.id, false);
                      if (ok) {
                        toast.info('Đã từ chối lời mời');
                      }
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

      {/* Quản lý Chủ Nhiệm Phụ (Sprint 2) */}
      {currentUser?.role === 'parent' && (
        <div className="rounded-2xl border border-synth-purple/20 bg-synth-purple/5 p-4 space-y-4 mt-4">
          <div className="space-y-1">
            <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider flex items-center gap-2">
              👥 Quản lý Chủ Nhiệm Phụ (Secondary Parents)
            </h4>
            <p className="text-xs text-slate-300">
              Mời chủ nhiệm khác cùng theo dõi báo cáo, duyệt quà hoặc giao nhiệm vụ cho con.
            </p>
          </div>

          {/* Form mời Chủ nhiệm phụ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <label className="space-y-1.5 text-xs">
              <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Email Chủ Nhiệm cần mời</span>
              <input
                type="email"
                value={inviteSecondaryEmail}
                onChange={e => setInviteSecondaryEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-purple text-xs"
              />
            </label>
            <label className="space-y-1.5 text-xs">
              <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Chọn Con cùng quản lý</span>
              <select
                value={selectedSecondaryStudentId}
                onChange={e => setSelectedSecondaryStudentId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-purple text-xs"
              >
                <option value="">-- Chọn học sinh --</option>
                {familyLinks.filter(l => l.status === 'active' && l.parent_id === currentUser?.id).map((link: any) => (
                  <option key={link.student_id} value={link.student_id}>
                    {link.student_name || link.student_id}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={async () => {
                if (!inviteSecondaryEmail.trim() || !selectedSecondaryStudentId) {
                  toast.error('Vui lòng điền email và chọn học sinh!');
                  return;
                }
                setIsInvitingSecondary(true);
                const ok = await inviteSecondary(inviteSecondaryEmail.trim(), selectedSecondaryStudentId);
                if (ok) {
                  toast.success('Đã gửi lời mời Chủ nhiệm Phụ thành công!');
                  setInviteSecondaryEmail('');
                }
                setIsInvitingSecondary(false);
              }}
              disabled={isInvitingSecondary || !inviteSecondaryEmail.trim() || !selectedSecondaryStudentId}
              className="px-4 py-2.5 bg-synth-purple text-white font-bold rounded-lg hover:bg-synth-purple/80 disabled:opacity-50 transition-colors uppercase text-xs cursor-pointer h-10 flex items-center justify-center"
            >
              {isInvitingSecondary ? 'Đang gửi...' : 'Mời Chủ Nhiệm Phụ'}
            </button>
          </div>

          {/* Danh sách Chủ nhiệm phụ và phân quyền */}
          {secondaryParents.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <h5 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase">Danh sách Chủ Nhiệm Phụ liên kết</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-synth-purple uppercase font-orbitron text-[9px] tracking-wider">
                      <th className="py-2 px-3">Chủ Nhiệm</th>
                      <th className="py-2 px-3">Học Sinh</th>
                      <th className="py-2 px-3">Trạng Thái</th>
                      <th className="py-2 px-3">Quyền Hạn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {secondaryParents.map((sp: any) => {
                      const studentLink = familyLinks.find(l => l.student_id === sp.student_id);
                      const studentName = studentLink ? (studentLink.student_name || sp.student_id) : sp.student_id;
                      const perms = sp.secondary_permissions || {};

                      return (
                        <tr key={sp.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-2 px-3">
                            <span className="font-bold text-white block">{sp.parent_name || 'Đang chờ tạo hồ sơ'}</span>
                            <span className="text-[10px] text-synth-text-muted">{sp.parent_email}</span>
                          </td>
                          <td className="py-2 px-3 font-semibold text-synth-cyan">{studentName}</td>
                          <td className="py-2 px-3">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-orbitron bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20">
                              {sp.status === 'active' ? 'Hoạt Động' : 'Chờ Chấp Nhận'}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex flex-col gap-1.5">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={perms.can_approve_rewards || false}
                                  disabled={sp.status !== 'active'}
                                  onChange={async (e) => {
                                    await updateSecondaryPermissions(sp.id, {
                                      can_approve_rewards: e.target.checked
                                    });
                                    toast.success('Đã cập nhật quyền duyệt quà');
                                  }}
                                  className="accent-synth-purple"
                                />
                                <span>Duyệt đổi quà</span>
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={perms.can_create_missions || false}
                                  disabled={sp.status !== 'active'}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
