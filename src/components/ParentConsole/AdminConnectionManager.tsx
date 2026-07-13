import React, { useState } from 'react';
import { toast } from '../../utils/toast';
import { SearchSuggest } from '../Common/SearchSuggest';
import { RefreshCw } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';

interface AdminConnectionManagerProps {
  currentUser: any;
  familyLinks: any[];
  respondInvite: (linkId: string, accept: boolean) => Promise<boolean>;
  leaveFamily: (linkId: string) => Promise<boolean>;
  inviteAdminConnection?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export const AdminConnectionManager: React.FC<AdminConnectionManagerProps> = ({
  currentUser,
  familyLinks,
  respondInvite,
  leaveFamily,
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
      const ok = await respondInvite(linkId, accept);
      if (ok) {
        toast.success(accept ? 'Đã chấp nhận kết nối Ban Giám Hiệu!' : 'Đã từ chối kết nối.');
        await fetchFamily();
      }
    } catch (err) {
      console.error(err);
      toast.error('Thao tác thất bại.');
    } finally {
      setProcessingIds(prev => ({ ...prev, [linkId]: false }));
    }
  };

  const handleLeaveFamily = async (linkId: string, confirmMsg: string, successMsg: string) => {
    if (processingIds[linkId]) return;
    if (window.confirm(confirmMsg)) {
      setProcessingIds(prev => ({ ...prev, [linkId]: true }));
      try {
        const ok = await leaveFamily(linkId);
        if (ok) {
          toast.success(successMsg);
          await fetchFamily();
        }
      } catch (err) {
        console.error(err);
        toast.error('Thao tác thất bại.');
      } finally {
        setProcessingIds(prev => ({ ...prev, [linkId]: false }));
      }
    }
  };

  const fetchFamily = useGameState(state => state.fetchFamily);

  // --- FILTERS ---
  const activeConnections = familyLinks.filter(
    l => l.link_type === 'admin_connection' && l.status === 'active'
  );

  const incomingRequests = familyLinks.filter(
    l => l.link_type === 'admin_connection' && l.status === 'pending' && l.sender_id !== currentUser?.id
  );

  const outgoingRequests = familyLinks.filter(
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
    await fetchFamily();
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-orbitron font-bold text-lg text-synth-magenta uppercase tracking-wider flex items-center gap-2">
            🛡️ Ban Giám Hiệu Giang Hồ
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Vai trò hiện tại: <span className="font-bold text-synth-magenta uppercase font-orbitron">
              {currentUser?.role === 'truong_vien' ? 'Viện Trưởng 👑' : 'Phó Viện Trưởng 🛡️'}
            </span> — Quản trị viên quản lý toàn diện lớp học và học sinh.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-3 py-1.5 rounded-lg border border-synth-magenta/30 text-synth-magenta hover:bg-synth-magenta/10 font-bold text-xs uppercase cursor-pointer flex items-center gap-1.5 self-start md:self-auto transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Tải Lại
        </button>
      </div>

      {/* ================= SECTION 1: INCOMING REQUESTS ================= */}
      {incomingRequests.length > 0 && (
        <div className="rounded-2xl border border-synth-magenta/20 bg-synth-magenta/5 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-2">
            📥 Lời Mời Kết Nối Ban Giám Hiệu
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

      {/* ================= SECTION 2: SEND CONNECTION INVITE ================= */}
      {inviteAdminConnection && (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-4">
          <div>
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
              ✉️ Lời Mời Đồng Hành Ban Giám Hiệu
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">Kết nối với các Viện Trưởng hoặc Phó Viện Trưởng khác để cùng song hành trong học viện.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 items-end sm:items-center">
            <div className="w-full flex-1">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Mời Qua Tài Khoản</span>
              <SearchSuggest
                placeholder="Tìm Viện Trưởng / Phó Viện Trưởng theo tên hoặc email..."
                roleFilter="admin_board"
                value={inviteEmail}
                onChange={setInviteEmail}
                onSelect={user => setInviteEmail(user.email)}
                className="w-full"
              />
            </div>
            <button
              onClick={handleSendInvite}
              disabled={isSending || !inviteEmail.trim()}
              className="w-full sm:w-auto px-4 py-2 bg-synth-magenta text-black font-bold font-orbitron text-xs uppercase rounded-lg hover:synth-glow-magenta transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              {isSending ? 'Đang gửi...' : 'Gửi Yêu Cầu ⚔️'}
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: OUTGOING REQUESTS ================= */}
      {outgoingRequests.length > 0 && (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-slate-300 uppercase tracking-wider">
            ⏳ Lời Mời Kết Nối Đã Gửi (Đang Chờ Phản Hồi)
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
                  onClick={() => handleLeaveFamily(link.id, 'Bạn có chắc muốn hủy lời mời kết nối này không?', 'Đã hủy lời mời kết nối.')}
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
                  onClick={() => handleLeaveFamily(link.id, 'Bạn có chắc muốn hủy kết nối đồng hành với thành viên Ban Giám Hiệu này không?', 'Đã hủy kết nối đồng hành.')}
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
