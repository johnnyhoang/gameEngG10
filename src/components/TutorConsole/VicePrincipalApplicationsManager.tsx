import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { isAdmin } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';
import { authService } from '../../services/authService';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

interface VicePrincipalApplicationsManagerProps {
  currentUser: any;
}

export const VicePrincipalApplicationsManager: React.FC<VicePrincipalApplicationsManagerProps> = ({ currentUser }) => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    if (!isAdmin(currentUser?.role)) return;
    setLoading(true);
    try {
      const token = await authService.getAccessToken();
      const res = await fetch(`${backendUrl}/api/admin/vice-principal-applications`, {
        headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': currentUser.id }
      });
      if (res.ok) {
        const data = await res.json();
        setApps(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, currentUser?.role]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const handleRespond = async (applicationId: string, accept: boolean) => {
    setProcessingId(applicationId);
    try {
      const token = await authService.getAccessToken();
      const res = await fetch(`${backendUrl}/api/admin/respond-vice-principal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-Profile-Id': currentUser.id },
        body: JSON.stringify({ applicationId, accept })
      });
      if (res.ok) {
        toast.success(accept ? 'Đã thăng chức Phó Viện Trưởng thành công!' : 'Đã từ chối đơn ứng cử.');
        fetchApps();
        // Reload page to refresh all active profiles
        window.location.reload();
      } else {
        toast.error('Có lỗi xảy ra khi xử lý đơn.');
      }
    } catch (e) {
      toast.error('Lỗi kết nối.');
    } finally {
      setProcessingId(null);
    }
  };

  if (!isAdmin(currentUser?.role)) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-synth-text-muted italic">
          Số lượng đơn chờ duyệt: {apps.length}
        </span>
        <button
          onClick={fetchApps}
          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tải lại danh sách"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {apps.length === 0 ? (
        <p className="text-xs text-synth-text-muted italic py-4 text-center">
          Không có đơn ứng cử Phó Viện Trưởng nào đang chờ duyệt.
        </p>
      ) : (
        <div className="space-y-3">
          {apps.map((app: any) => (
            <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5 gap-4">
              <div className="flex items-center gap-3">
                {app.teacher_avatar ? (
                  <img src={app.teacher_avatar} alt={app.teacher_name} className="w-9 h-9 rounded-full border border-white/10 object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center text-xs font-bold text-synth-magenta">
                    {app.teacher_name ? app.teacher_name.charAt(0).toUpperCase() : 'T'}
                  </div>
                )}
                <div>
                  <span className="text-xs text-white font-bold block">{app.teacher_name}</span>
                  <span className="text-[10px] text-slate-400">{app.teacher_email}</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Ngày nộp đơn: {new Date(app.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={processingId !== null}
                  onClick={() => handleRespond(app.id, true)}
                  className="px-3 py-1.5 rounded-lg bg-synth-cyan text-black hover:bg-synth-cyan/80 font-bold text-xs uppercase cursor-pointer disabled:opacity-50 transition-colors"
                >
                  Phê Duyệt
                </button>
                <button
                  disabled={processingId !== null}
                  onClick={() => handleRespond(app.id, false)}
                  className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer disabled:opacity-50 transition-colors"
                >
                  Từ Chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
