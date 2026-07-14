import React, { useState } from 'react';
import { toast } from '../../utils/toast';
import { SearchSuggest } from '../Common/SearchSuggest';
import { RefreshCw } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';

interface AdminConnectionManagerProps {
  currentUser: any;
  classLinks: any[];
  respondClassInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  leaveClass: (linkId: string) => Promise<boolean>;
  inviteAdminConnection?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export const AdminConnectionManager: React.FC<AdminConnectionManagerProps> = ({
  currentUser,
  classLinks,
  respondClassInvite,
  leaveClass,
  inviteAdminConnection
}) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>({});

  const handleRespondInvite = async (linkId: string, accept: boolean) => {
    if (processingIds[linkId]) return;
    setProcessingIds(prev => ({ ...prev, [linkId]: true }));
    try {
      const ok = await respondClassInvite(linkId, accept);
      if (ok) {
        toast.success(accept ? 'Đã chấp nhận kết nối Ban Giám Hiệu!' : 'Đã từ chối kết nối.');
        await fetchClassLinks();
      }
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
        if (ok) {
          toast.success(successMsg);
          await fetchClassLinks();
        }
      } catch (err) {
        console.error(err);
        toast.error('Thao tác thất bại.');
      } finally {
        setProcessingIds(prev => ({ ...prev, [linkId]: false }));
      }
    }
  };

  const fetchClassLinks = useGameState(state => state.fetchClassLinks);

  // --- FILTERS ---
  const activeConnections = classLinks.filter(
    l => l.link_type === 'admin_connection' && l.status === 'active'
  );

  const incomingRequests = classLinks.filter(
    l => l.link_type === 'admin_connection' && l.status === 'pending' && l.sender_id !== currentUser?.id
  );

  const outgoingRequests = classLinks.filter(
    l => l.link_type === 'admin_connection' && l.status === 'pending' && l.sender_id === currentUser?.id
  );

  const handleSendInvite = async () => {
    if (!inviteEmail.trim()) return;
    if (!inviteAdminConnection) return;

    setIsSending(true);
    try {
      const res = await inviteAdminConnection(inviteEmail.trim());
      if (res.success) {
        toast.success('Đã gửi lời mời kết nối thành công!');
        setInviteEmail('');
      } else {
        toast.error(res.error || 'Có lỗi xảy ra.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Có lỗi xảy ra.');
    } finally {
      setIsSending(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchClassLinks();
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 space-y-4">
      {/* Header gọn: tên khối + đếm + nút tải lại (vai trò đã hiển thị trên TopHUD) */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
          🤝 Ban Giám Hiệu Đồng Hành ({activeConnections.length})
        </h3>
        <button
          onClick={handleRefresh}
          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tải lại danh sách"
          disabled={loading}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Mời kết nối: một hàng duy nhất */}
      {inviteAdminConnection && (
        <div className="flex flex-col sm:flex-row gap-2">
          <SearchSuggest
            placeholder="Mời Viện Trưởng / Phó Viện Trưởng theo tên hoặc email..."
            roleFilter="admin_board"
            value={inviteEmail}
            onChange={setInviteEmail}
            onSelect={user => setInviteEmail(user.email)}
            className="w-full flex-1"
          />
          <button
            onClick={handleSendInvite}
            disabled={isSending || !inviteEmail.trim()}
            className="w-full sm:w-auto px-4 py-2 bg-synth-magenta text-black font-bold font-orbitron text-xs uppercase rounded-lg hover:synth-glow-magenta transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isSending ? 'Đang gửi...' : 'Gửi Yêu Cầu ⚔️'}
          </button>
        </div>
      )}

      {/* Lời mời ĐẾN đang chờ mình duyệt */}
      {incomingRequests.length > 0 && (
        <div className="rounded-xl border border-synth-magenta/20 bg-synth-magenta/5 p-3 space-y-2">
          <h4 className="font-orbitron font-bold text-[10px] text-synth-magenta uppercase tracking-wider">
            📥 Lời Mời Đến ({incomingRequests.length})
          </h4>
          <div className="space-y-2">
            {incomingRequests.map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2.5">
                  {link.peer_avatar ? (
                    <img src={link.peer_avatar} alt={link.peer_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center text-xs font-bold text-synth-magenta">
                      {link.peer_name ? link.peer_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">
                      {link.peer_name} <span className="text-[9px] text-synth-magenta px-1 rounded bg-synth-magenta/15 font-orbitron">{link.peer_role === 'truong_vien' ? 'Viện Trưởng 👑' : 'Phó Viện Trưởng 🛡️'}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">{link.peer_email}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={processingIds[link.id]}
                    onClick={() => handleRespondInvite(link.id, true)}
                    className="px-3 py-1.5 rounded bg-synth-cyan text-black font-bold text-[10px] uppercase cursor-pointer transition-colors hover:bg-synth-cyan/85 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[65px]"
                  >
                    {processingIds[link.id] ? (
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full"></span>
                    ) : (
                      'Đồng Ý'
                    )}
                  </button>
                  <button
                    disabled={processingIds[link.id]}
                    onClick={() => handleRespondInvite(link.id, false)}
                    className="px-3 py-1.5 rounded border border-red-500 text-red-400 font-bold text-[10px] uppercase cursor-pointer hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[65px]"
                  >
                    {processingIds[link.id] ? (
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                    ) : (
                      'Từ Chối'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lời mời ĐÃ GỬI đang chờ phản hồi */}
      {outgoingRequests.length > 0 && (
        <div className="rounded-xl border border-white/5 bg-white/5 p-3 space-y-2">
          <h4 className="font-orbitron font-bold text-[10px] text-slate-300 uppercase tracking-wider">
            ⏳ Đã Gửi — Chờ Phản Hồi ({outgoingRequests.length})
          </h4>
          <div className="space-y-2">
            {outgoingRequests.map(link => (
              <div key={link.id} className="flex items-center justify-between p-3 rounded-xl bg-black/35 border border-white/5">
                <div className="flex items-center gap-2.5">
                  {link.peer_avatar ? (
                    <img src={link.peer_avatar} alt={link.peer_name} className="w-8 h-8 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-xs font-bold text-slate-400">
                      {link.peer_name ? link.peer_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">
                      {link.peer_name} <span className="text-[9px] text-slate-400 px-1 rounded bg-white/10 font-orbitron">{link.peer_role === 'truong_vien' ? 'Viện Trưởng 👑' : 'Phó Viện Trưởng 🛡️'}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">{link.peer_email}</span>
                  </div>
                </div>
                <button
                  disabled={processingIds[link.id]}
                  onClick={() => handleLeaveClass(link.id, 'Bạn có chắc muốn hủy lời mời kết nối này không?', 'Đã hủy lời mời kết nối.')}
                  className="px-3 py-1.5 rounded border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {processingIds[link.id] ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                  ) : (
                    'Hủy Yêu Cầu'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: ACTIVE ADMIN CONNECTIONS ================= */}
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
        <div>
          <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
            🤝 Ban Giám Hiệu Đồng Hành ({activeConnections.length})
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">Các thành viên Ban Giám Hiệu cùng cộng tác quản lý trong học viện.</p>
        </div>

        {activeConnections.length === 0 ? (
          <p className="text-xs text-synth-text-muted italic py-2">Chưa kết nối với thành viên Ban Giám Hiệu nào khác.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeConnections.map(link => (
              <div key={link.id} className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-3">
                  {link.peer_avatar ? (
                    <img src={link.peer_avatar} alt={link.peer_name} className="w-9 h-9 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center text-xs font-bold text-synth-magenta">
                      {link.peer_name ? link.peer_name.charAt(0).toUpperCase() : 'A'}
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-white font-bold block">
                      {link.peer_name}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{link.peer_email}</span>
                    <span className="inline-block text-[9px] font-bold text-synth-magenta uppercase tracking-wider font-orbitron mt-0.5">
                      {link.peer_role === 'truong_vien' ? 'Viện Trưởng 👑' : 'Phó Viện Trưởng 🛡️'}
                    </span>
                  </div>
                </div>
                <button
                  disabled={processingIds[link.id]}
                  onClick={() => handleLeaveClass(link.id, 'Bạn có chắc muốn hủy kết nối đồng hành với thành viên Ban Giám Hiệu này không?', 'Đã hủy kết nối đồng hành.')}
                  className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {processingIds[link.id] ? (
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                  ) : (
                    'Hủy Kết Nối'
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
