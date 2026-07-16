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
  );
};
