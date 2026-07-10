import React, { useState } from 'react';
import { isParentRole } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';

interface FamilyManagerProps {
  currentUser: any;
  parentPIN: string;
  familyLinks: any[];
  secondaryParents: any[];
  sendInvite: (studentId: string) => Promise<boolean>;
  respondInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  inviteSecondary: (email: string, studentId: string) => Promise<boolean>;
  updateSecondaryPermissions: (linkId: string, permissions: any) => Promise<boolean>;
  changePIN: (newPIN: string) => Promise<boolean>;
}

export const FamilyManager: React.FC<FamilyManagerProps> = ({
  currentUser,
  parentPIN,
  familyLinks,
  secondaryParents,
  sendInvite,
  respondInvite,
  inviteSecondary,
  updateSecondaryPermissions,
  changePIN
}) => {
  const [inviteId, setInviteId] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSecondaryEmail, setInviteSecondaryEmail] = useState('');
  const [selectedSecondaryStudentId, setSelectedSecondaryStudentId] = useState('');
  const [isInvitingSecondary, setIsInvitingSecondary] = useState(false);

  // Đổi PIN bảo mật (Chính Điện — CORE_SPECS §2.6)
  const [changePinNew, setChangePinNew] = useState('');
  const [changePinConfirm, setChangePinConfirm] = useState('');
  const [changePinFeedback, setChangePinFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isChangingPin, setIsChangingPin] = useState(false);

  const handleCreateOrChangePIN = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changePinNew || changePinNew.length < 4) {
      setChangePinFeedback({ type: 'error', text: 'Mã PIN mới phải có ít nhất 4 ký tự.' });
      return;
    }
    if (changePinNew !== changePinConfirm) {
      setChangePinFeedback({ type: 'error', text: 'Xác nhận mã PIN mới không khớp.' });
      return;
    }

    setIsChangingPin(true);
    setChangePinFeedback(null);
    try {
      const ok = await changePIN(changePinNew);
      if (ok) {
        setChangePinFeedback({ type: 'success', text: 'Đã thay đổi mã PIN bảo mật cá nhân thành công!' });
        setChangePinNew('');
        setChangePinConfirm('');
        toast.success('Đã cập nhật mã PIN bảo mật cá nhân');
      } else {
        setChangePinFeedback({ type: 'error', text: 'Thay đổi mã PIN thất bại. Vui lòng kiểm tra lại.' });
      }
    } catch (err: any) {
      setChangePinFeedback({ type: 'error', text: err.message || 'Lỗi khi cập nhật PIN.' });
    } finally {
      setIsChangingPin(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-orbitron font-bold text-sm text-synth-magenta uppercase tracking-wider flex items-center gap-2">
        🏛️ Chính Điện — Quản lý thiếu hiệp & Cấp quyền
      </h3>

      {/* Family Connection Information */}
      <div className="rounded-2xl border border-synth-cyan/20 bg-synth-cyan/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">Mã Liên Kết Gia Đình</h4>
          <p className="text-xs text-slate-300">Sử dụng mã PIN này để Học sinh kết nối tài khoản vào gia đình.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-3 bg-black/40 border border-synth-cyan/30 rounded-xl font-orbitron font-bold text-2xl text-white tracking-[0.25em]">
            {parentPIN}
          </div>
        </div>
      </div>

      {/* Mời Thiếu Hiệp (Family System Phase 1.1) */}
      <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-4">
        <div className="space-y-1">
          <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider">Mời Học Sinh</h4>
          <p className="text-xs text-slate-300">Nhập ID của học sinh để gửi lời mời liên kết gia đình. Bạn cũng có thể xem danh sách lời mời đang chờ bên dưới.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inviteId}
            onChange={e => setInviteId(e.target.value)}
            placeholder="Nhập ID học sinh (ví dụ: b1a3...)"
            className="flex-1 p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-magenta font-mono text-sm"
          />
          <button
            onClick={async () => {
              if (!inviteId.trim()) return;
              setIsInviting(true);
              const success = await sendInvite(inviteId.trim());
              if (success) {
                toast.success('Đã gửi lời mời thành công');
                setInviteId('');
              } else {
                toast.error('Gửi lời mời thất bại. ID không tồn tại hoặc đã kết nối.');
              }
              setIsInviting(false);
            }}
            disabled={isInviting || !inviteId.trim()}
            className="px-4 py-2.5 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/80 disabled:opacity-50 transition-colors uppercase text-xs cursor-pointer"
          >
            {isInviting ? 'Đang gửi...' : 'Gửi lời mời'}
          </button>
        </div>

        {familyLinks.filter(l => l.status === 'pending_student' && l.parent_id === currentUser?.id).length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <h5 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase">Lời mời đang chờ</h5>
            <div className="space-y-2">
              {familyLinks.filter(l => l.status === 'pending_student' && l.parent_id === currentUser?.id).map(link => (
                <div key={link.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-300">ID Nhận: <span className="font-mono text-synth-cyan">{link.student_id}</span></span>
                  <span className="text-[10px] text-synth-orange uppercase px-2 py-1 bg-synth-orange/10 rounded">Đang chờ</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lời mời làm Phụ Huynh Phụ nhận được (Sprint 2) */}
      {isParentRole(currentUser?.role) && familyLinks.filter(l => l.status === 'pending_parent' && l.parent_id === currentUser?.id && l.link_type === 'secondary').length > 0 && (
        <div className="rounded-2xl border border-synth-orange/20 bg-synth-orange/5 p-4 space-y-3 mt-4">
          <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider">
             📩 Lời Mời Đồng Hành (Phụ Huynh Phụ)
          </h4>
          <p className="text-xs text-slate-300">
            Bạn được mời làm Phụ huynh Phụ cùng quản lý học sinh sau:
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
                        toast.success('Đã chấp nhận làm Phụ huynh Phụ!');
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

      {/* Quản lý Phụ Huynh Phụ (Sprint 2) */}
      {currentUser?.role === 'parent' && (
        <div className="rounded-2xl border border-synth-purple/20 bg-synth-purple/5 p-4 space-y-4 mt-4">
          <div className="space-y-1">
            <h4 className="font-orbitron font-bold text-xs text-synth-purple uppercase tracking-wider flex items-center gap-2">
              👥 Quản lý Phụ Huynh Phụ (Secondary Parents)
            </h4>
            <p className="text-xs text-slate-300">
              Mời phụ huynh khác cùng theo dõi báo cáo, duyệt quà hoặc giao nhiệm vụ cho con.
            </p>
          </div>

          {/* Form mời Phụ huynh phụ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <label className="space-y-1.5 text-xs">
              <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Email Phụ Huynh cần mời</span>
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
                  toast.success('Đã gửi lời mời Phụ huynh Phụ thành công!');
                  setInviteSecondaryEmail('');
                }
                setIsInvitingSecondary(false);
              }}
              disabled={isInvitingSecondary || !inviteSecondaryEmail.trim() || !selectedSecondaryStudentId}
              className="px-4 py-2.5 bg-synth-purple text-white font-bold rounded-lg hover:bg-synth-purple/80 disabled:opacity-50 transition-colors uppercase text-xs cursor-pointer h-10 flex items-center justify-center"
            >
              {isInvitingSecondary ? 'Đang gửi...' : 'Mời Phụ Huynh Phụ'}
            </button>
          </div>

          {/* Danh sách Phụ huynh phụ và phân quyền */}
          {secondaryParents.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <h5 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase">Danh sách Phụ Huynh Phụ liên kết</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-synth-purple uppercase font-orbitron text-[9px] tracking-wider">
                      <th className="py-2 px-3">Phụ Huynh</th>
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

      {/* Đổi mã PIN bảo mật cá nhân (PIN Cá Nhân — CORE_SPECS §2.6) */}
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
        <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
          🔒 Thay đổi PIN bảo mật cá nhân
        </h4>
        <p className="text-xs text-slate-300">
          Mã PIN cá nhân giúp bảo vệ các hành động nhạy cảm của bạn (như nạp chân khí, phê duyệt quà, chỉnh sửa câu hỏi) không bị học sinh tự ý thao tác.
        </p>

        <form onSubmit={handleCreateOrChangePIN} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end max-w-2xl">
          <label className="space-y-1 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Mã PIN mới</span>
            <input
              type="password"
              maxLength={10}
              value={changePinNew}
              onChange={e => setChangePinNew(e.target.value.replace(/\D/g, ''))}
              placeholder="Nhập PIN số mới"
              className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-magenta text-xs font-mono text-center tracking-[0.25em]"
            />
          </label>
          <label className="space-y-1 text-xs">
            <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Xác nhận PIN mới</span>
            <input
              type="password"
              maxLength={10}
              value={changePinConfirm}
              onChange={e => setChangePinConfirm(e.target.value.replace(/\D/g, ''))}
              placeholder="Xác nhận PIN mới"
              className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-white outline-none focus:border-synth-magenta text-xs font-mono text-center tracking-[0.25em]"
            />
          </label>
          <button
            type="submit"
            disabled={isChangingPin || !changePinNew || !changePinConfirm}
            className="px-4 py-2.5 bg-synth-magenta text-white font-bold rounded-lg hover:bg-synth-magenta/80 disabled:opacity-50 transition-colors uppercase text-xs cursor-pointer h-10 flex items-center justify-center"
          >
            {isChangingPin ? 'Đang lưu...' : 'Đổi mã PIN'}
          </button>
        </form>

        {changePinFeedback && (
          <p className={`text-xs font-bold ${changePinFeedback.type === 'success' ? 'text-synth-green' : 'text-red-400'}`}>
            {changePinFeedback.type === 'success' ? '✓' : '✗'} {changePinFeedback.text}
          </p>
        )}
      </div>
    </div>
  );
};
