import React from 'react';

interface AuditLogsManagerProps {
  auditLogs: any[];
  fetchAuditLogs: () => Promise<void>;
}

export const AuditLogsManager: React.FC<AuditLogsManagerProps> = ({ auditLogs, fetchAuditLogs }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-orbitron font-bold text-xs text-synth-text-muted uppercase tracking-wider">
          📔 Nhật Ký Quyết Nghị Viện Trưởng (Audit Logs)
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
                let actionBadgeColor = 'bg-white/10 text-slate-300 border border-white/10';
                let actionName = log.action;

                switch (log.action) {
                  case 'approve_reward':
                    actionBadgeColor = 'bg-synth-green/10 text-synth-green border border-synth-green/20';
                    actionName = 'Duyệt Đổi Quà';
                    break;
                  case 'cancel_redemption':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Hủy Đổi Quà';
                    break;
                  case 'refill_energy':
                    actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                    actionName = 'Nạp Năng Lượng';
                    break;
                  case 'promote_user':
                    actionBadgeColor = 'bg-synth-yellow/10 text-synth-yellow border border-synth-yellow/20';
                    actionName = 'Bổ Nhiệm Quyền';
                    break;
                  case 'invite_secondary_parent':
                  case 'invite_family':
                    actionBadgeColor = 'bg-synth-purple/10 text-synth-purple border border-synth-purple/20';
                    actionName = log.action === 'invite_family' ? 'Mời Học Sinh' : 'Mời Chủ Nhiệm Phụ';
                    break;
                  case 'update_secondary_permissions':
                    actionBadgeColor = 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
                    actionName = 'Sửa Quyền Phụ';
                    break;
                  case 'approve_vice_principal_request':
                    actionBadgeColor = 'bg-synth-green/10 text-synth-green border border-synth-green/20';
                    actionName = 'Duyệt Phó Viện';
                    break;
                  case 'reject_vice_principal_request':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Từ Chối Phó Viện';
                    break;
                  case 'cancel_vice_principal_request':
                    actionBadgeColor = 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
                    actionName = 'Hủy Đơn Phó Viện';
                    break;
                  case 'apply_vice_principal':
                    actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                    actionName = 'Ứng Tuyển Phó Viện';
                    break;
                  case 'create_lesson':
                    actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                    actionName = 'Tạo Bài Học';
                    break;
                  case 'update_lesson':
                    actionBadgeColor = 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
                    actionName = 'Sửa Bài Học';
                    break;
                  case 'delete_lesson':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Xóa Bài Học';
                    break;
                  case 'create_school_reward':
                    actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                    actionName = 'Tạo Quà Trường';
                    break;
                  case 'update_school_reward':
                    actionBadgeColor = 'bg-orange-500/10 text-orange-400 border border-orange-500/20';
                    actionName = 'Sửa Quà Trường';
                    break;
                  case 'delete_school_reward':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Xóa Quà Trường';
                    break;
                  case 'request_secondary_tutor':
                    actionBadgeColor = 'bg-synth-purple/10 text-synth-purple border border-synth-purple/20';
                    actionName = 'Xin Đồng Hành';
                    break;
                  case 'invite_admin_connection':
                    actionBadgeColor = 'bg-synth-purple/10 text-synth-purple border border-synth-purple/20';
                    actionName = 'Mời Kết Nối BGH';
                    break;
                  case 'respond_admin_connection':
                    actionBadgeColor = 'bg-synth-yellow/10 text-synth-yellow border border-synth-yellow/20';
                    actionName = 'Phản Hồi BGH';
                    break;
                  case 'leave_admin_connection':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Hủy Kết Nối BGH';
                    break;
                  case 'respond_family_invite':
                    actionBadgeColor = 'bg-synth-yellow/10 text-synth-yellow border border-synth-yellow/20';
                    actionName = 'Phản Hồi Vào Lớp';
                    break;
                  case 'leave_family':
                    actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = 'Rời Lớp Học';
                    break;
                  default:
                    if (log.action && log.action.includes('create')) actionBadgeColor = 'bg-synth-cyan/10 text-synth-cyan border border-synth-cyan/20';
                    else if (log.action && log.action.includes('delete')) actionBadgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                    actionName = log.action || 'Hành động';
                }

                let detailText = '';
                try {
                  const p = typeof log.payload === 'string' ? JSON.parse(log.payload) : log.payload;
                  
                  switch (log.action) {
                    case 'approve_reward':
                      detailText = `Xác nhận trao quà "${p.rewardTitle || 'Quà'}"`;
                      break;
                    case 'cancel_redemption':
                      detailText = `Hủy đổi "${p.rewardTitle || 'Quà'}", hoàn trả ${p.refundRuby} Ruby`;
                      break;
                    case 'refill_energy':
                      detailText = `Nạp đầy Năng Lượng lên ${p.targetEnergy}%`;
                      break;
                    case 'promote_user':
                      detailText = `Bổ nhiệm vai trò mới: ${p.targetRole === 'pho_vien' ? 'Phó Viện Trưởng 🛡️' : p.targetRole === 'tutor' ? 'Chủ Nhiệm Chính' : 'Sĩ Tử'}`;
                      break;
                    case 'invite_secondary_parent':
                      detailText = 'Gửi thư mời làm Giáo viên đồng hành (Chủ nhiệm phụ)';
                      break;
                    case 'invite_family':
                      detailText = `Mời vào lớp học (Kiểu: ${p.linkType === 'primary' ? 'Chính' : 'Phụ'})`;
                      break;
                    case 'update_secondary_permissions':
                      const rights = [];
                      if (p.permissions?.can_approve_rewards) rights.push('Duyệt quà');
                      if (p.permissions?.can_create_missions) rights.push('Giao NV');
                      detailText = `Cập nhật quyền hạn: [${rights.join(', ') || 'Chỉ xem'}]`;
                      break;
                    case 'approve_vice_principal_request':
                      detailText = 'Chấp thuận đơn ứng tuyển làm Phó Viện Trưởng';
                      break;
                    case 'reject_vice_principal_request':
                      detailText = 'Từ chối đơn ứng tuyển làm Phó Viện Trưởng';
                      break;
                    case 'cancel_vice_principal_request':
                      detailText = 'Hủy đơn xin ứng tuyển làm Phó Viện Trưởng';
                      break;
                    case 'apply_vice_principal':
                      detailText = 'Gửi đơn ứng tuyển làm Phó Viện Trưởng của trường';
                      break;
                    case 'create_lesson':
                      detailText = `Tạo bài học mới: "${p.title || 'Không tên'}" (Môn: ${p.subject || '—'}, Danh mục: ${p.category || '—'})`;
                      break;
                    case 'update_lesson':
                      detailText = `Cập nhật bài học: "${p.title || 'Không tên'}" (Môn: ${p.subject || '—'}, Danh mục: ${p.category || '—'})`;
                      break;
                    case 'delete_lesson':
                      detailText = 'Xóa bài học khỏi hệ thống';
                      break;
                    case 'create_school_reward':
                      detailText = `Tạo quà trường mới: "${p.title || 'Không tên'}" (Giá: ${p.costRuby || 0} Ruby, Số lượng: ${p.quantity || 0})`;
                      break;
                    case 'update_school_reward':
                      detailText = `Cập nhật quà trường: "${p.title || 'Không tên'}" (Giá: ${p.costRuby || 0} Ruby, Số lượng: ${p.quantity || 0})`;
                      break;
                    case 'delete_school_reward':
                      detailText = 'Xóa quà trường khỏi danh mục chung';
                      break;
                    case 'request_secondary_tutor':
                      detailText = 'Gửi yêu cầu xin làm Giáo viên đồng hành lớp học';
                      break;
                    case 'invite_admin_connection':
                      detailText = 'Gửi lời mời kết nối quản trị Ban Giám Hiệu';
                      break;
                    case 'respond_admin_connection':
                      detailText = `${p.accept ? 'Đồng ý' : 'Từ chối'} yêu cầu kết nối Ban Giám Hiệu`;
                      break;
                    case 'leave_admin_connection':
                      detailText = 'Hủy liên kết quản trị Ban Giám Hiệu';
                      break;
                    case 'respond_family_invite':
                      detailText = `${p.accept ? 'Đồng ý' : 'Từ chối'} lời mời vào lớp (Kiểu: ${p.linkType === 'primary' ? 'Chính' : 'Phụ'})`;
                      break;
                    case 'leave_family':
                      detailText = 'Rời khỏi lớp học hoặc hủy kết nối với thành viên';
                      break;
                    default:
                      detailText = `Thực hiện hành động hệ thống: ${log.action}`;
                  }
                } catch {
                  detailText = `Thực hiện hành động: ${log.action || 'hệ thống'}`;
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
                      {log.target_name || '—'}
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
  );
};
