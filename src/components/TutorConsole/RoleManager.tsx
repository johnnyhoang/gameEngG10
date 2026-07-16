import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { isSuperAdmin } from '../../utils/roleHelpers';
import { toast } from '../../utils/toast';
import { authService } from '../../services/authService';

const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

const ROLES_CONFIG = [
  { key: 'student',     label: 'Học Sinh',    icon: '🌱', color: 'synth-cyan' },
  { key: 'tutor',      label: 'Chủ Nhiệm Chính', icon: '📋', color: 'synth-orange' },
  { key: 'pho_vien',    label: 'Phó Viện Trưởng',    icon: '🛡️', color: 'purple-400' },
  { key: 'truong_vien', label: 'Viện Trưởng', icon: '👑', color: 'synth-magenta' },
];

interface RoleManagerProps {
  currentUser: any;
}

export const RoleManager: React.FC<RoleManagerProps> = ({ currentUser }) => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null); // accountId đang saving
  const [search, setSearch] = useState('');

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = await authService.getAccessToken();
      const res = await fetch(`${backendUrl}/api/admin/users-all`, {
        headers: { Authorization: `Bearer ${token}`, 'X-Profile-Id': currentUser.id }
      });
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data.users || []);
      } else {
        toast.error('Không thể tải danh sách tài khoản.');
      }
    } catch (e) {
      toast.error('Lỗi kết nối server.');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (isSuperAdmin(currentUser?.role)) fetchAllUsers();
  }, [currentUser?.role, fetchAllUsers]);

  // Group profiles by account_id
  const groupedAccounts = useMemo(() => {
    const map = new Map<string, any>();
    allUsers.forEach(u => {
      if (!map.has(u.account_id)) {
        map.set(u.account_id, {
          account_id: u.account_id,
          email: u.email,
          name: u.name,
          avatar_url: u.avatar_url,
          profiles: []
        });
      }
      map.get(u.account_id).profiles.push(u);
    });
    return Array.from(map.values());
  }, [allUsers]);

  const filtered = useMemo(() => {
    if (!search.trim()) return groupedAccounts;
    const q = search.toLowerCase();
    return groupedAccounts.filter(a =>
      a.email?.toLowerCase().includes(q) || a.name?.toLowerCase().includes(q)
    );
  }, [groupedAccounts, search]);

  const hasRole = (account: any, roleKey: string) => {
    return account.profiles.some((p: any) => p.role === roleKey && p.is_active);
  };

  const handleToggleRole = async (account: any, roleKey: string, currentlyActive: boolean) => {
    setSaving(account.account_id + roleKey);
    try {
      const token = await authService.getAccessToken();
      const nextActiveState = !currentlyActive;

      const res = await fetch(`${backendUrl}/api/admin/update-user-role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-Profile-Id': currentUser.id },
        body: JSON.stringify({
          targetAccountId: account.account_id,
          roleKey,
          active: nextActiveState
        })
      });

      if (res.ok) {
        toast.success(
          nextActiveState 
            ? `Đã cấp quyền ${ROLES_CONFIG.find(r => r.key === roleKey)?.label} cho ${account.email}.`
            : `Đã vô hiệu hóa quyền ${ROLES_CONFIG.find(r => r.key === roleKey)?.label} của ${account.email}.`
        );
        await fetchAllUsers();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Thao tác thất bại.');
      }
    } catch (e) {
      toast.error('Lỗi kết nối server.');
    } finally {
      setSaving(null);
    }
  };

  if (!isSuperAdmin(currentUser?.role)) return null;

  return (
    <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-synth-magenta" />
          <h3 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider">
            👑 Quản Lý Vai Trò — Cấp & Thu Hồi Quyền
          </h3>
        </div>
        <button
          onClick={fetchAllUsers}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-synth-text-muted hover:text-white hover:border-white/30 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Làm mới
        </button>
      </div>

      <p className="text-[10px] text-slate-500 italic">
        Tick checkbox = cấp quyền / kích hoạt profile. Bỏ tick = vô hiệu hóa profile (dữ liệu vẫn giữ, có thể phục hồi).
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Tìm theo email hoặc tên..."
        className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-magenta text-xs"
      />

      {/* Role column headers */}
      <div className="hidden md:grid grid-cols-[1fr_repeat(4,80px)] gap-2 px-2">
        <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Tài khoản</div>
        {ROLES_CONFIG.map(r => (
          <div key={r.key} className="text-[9px] text-slate-500 uppercase tracking-wider font-bold text-center">
            {r.icon} {r.label}
          </div>
        ))}
      </div>

      {/* Accounts list */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {loading ? (
          <div className="text-center py-8 text-xs text-synth-text-muted animate-pulse">Đang tải...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-synth-text-muted italic">Không có tài khoản nào.</div>
        ) : filtered.map(account => (
          <div
            key={account.account_id}
            className="grid grid-cols-1 md:grid-cols-[1fr_repeat(4,80px)] gap-2 items-center p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
          >
            {/* Account info */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={account.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&q=80'}
                alt={account.name}
                className="w-7 h-7 rounded-full border border-white/10 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{account.name}</div>
                <div className="text-[9px] text-slate-400 truncate">{account.email}</div>
              </div>
              {account.account_id === currentUser?.id && (
                <span className="text-[8px] bg-synth-cyan/20 border border-synth-cyan/30 text-synth-cyan px-1.5 py-0.5 rounded font-bold uppercase flex-shrink-0">Bạn</span>
              )}
            </div>

            {/* 4 role checkboxes */}
            {ROLES_CONFIG.map(r => {
              const active = hasRole(account, r.key);
              const isSaving = saving === account.account_id + r.key;
              const disabled = isSaving;
              return (
                <div key={r.key} className="flex items-center justify-center gap-1.5 md:flex-col md:gap-0.5">
                  <span className="text-[9px] text-slate-400 md:hidden">{r.icon} {r.label}</span>
                  <button
                    onClick={() => !disabled && handleToggleRole(account, r.key, active)}
                    disabled={disabled}
                    title={active ? `Vô hiệu hóa profile ${r.label}` : `Cấp quyền ${r.label}`}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer disabled:cursor-wait
                      ${active
                        ? `bg-${r.color}/20 border-${r.color} text-${r.color}`
                        : 'bg-transparent border-white/20 text-transparent hover:border-white/50'
                      }`}
                  >
                    {isSaving ? (
                      <RefreshCw className="w-2.5 h-2.5 animate-spin text-white" />
                    ) : active ? (
                      <span className="text-[10px] font-black">✓</span>
                    ) : null}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
