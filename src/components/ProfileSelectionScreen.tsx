import { isAdmin, isSuperAdmin } from '../utils/roleHelpers';
import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { LogOut, Plus, GraduationCap, Users } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const ProfileSelectionScreen: React.FC = () => {
  const { availableProfiles, selectProfile, createProfile, quickStartProfile } = useGameState();
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState<'student' | 'parent'>('student');
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickStarting, setQuickStarting] = useState<'student' | 'parent' | null>(null);

  // Chỉ Viện Trưởng/Phó Viện mới cần thấy toàn bộ danh sách hồ sơ + form tạo thủ công —
  // người dùng thường (1 Google Account = 1 Học Sinh và/hoặc 1 Phụ Huynh) chỉ cần 2 lựa chọn đơn giản.
  const hasAdminProfile = availableProfiles.some((p: any) => isAdmin(p.role));
  const existingStudent = availableProfiles.find((p: any) => p.role === 'student');
  const existingParent = availableProfiles.find((p: any) => p.role === 'parent' || p.role === 'secondary_parent');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setIsSubmitting(true);
    try {
      await createProfile(newRole, newName);
      setIsCreating(false);
      setNewName('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStart = async (role: 'student' | 'parent') => {
    const existing = role === 'student' ? existingStudent : existingParent;
    if (existing) {
      selectProfile(existing.id);
      return;
    }
    setQuickStarting(role);
    try {
      await quickStartProfile(role);
    } finally {
      setQuickStarting(null);
    }
  };

  // Người dùng thường: hiện 1 modal chọn vai trò gọn nhẹ (không phải trang riêng) —
  // đồng bộ phong cách với GoogleLoginScreen + các modal khác trong app.
  if (!hasAdminProfile) {
    return (
      <div className="min-h-screen synth-grid-bg bg-synth-bg flex items-center justify-center p-4">
        <div className="glass-panel rounded-3xl border border-synth-cyan/20 p-8 max-w-md w-full text-center space-y-6 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-synth-cyan/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-synth-magenta/10 rounded-full blur-2xl"></div>

          <div className="space-y-1">
            <h2 className="font-orbitron text-2xl font-black uppercase text-white tracking-widest">
              Chọn Vai Trò
            </h2>
            <p className="text-xs text-synth-text-muted">Bạn muốn trải nghiệm với tư cách nào?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleQuickStart('student')}
              disabled={quickStarting !== null}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-synth-cyan/50 hover:bg-synth-cyan/5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {existingStudent ? (
                <img src={existingStudent.avatar} alt={existingStudent.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/20 group-hover:ring-synth-cyan/50" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-synth-cyan" />
                </div>
              )}
              <div className="text-center">
                <div className="font-orbitron font-bold text-sm">
                  {quickStarting === 'student' ? 'Đang vào...' : existingStudent ? existingStudent.name : 'Học Sinh'}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-synth-cyan font-bold mt-1">Thiếu Hiệp 🌱</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickStart('parent')}
              disabled={quickStarting !== null}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-synth-orange/50 hover:bg-synth-orange/5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {existingParent ? (
                <img src={existingParent.avatar} alt={existingParent.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/20 group-hover:ring-synth-orange/50" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-synth-orange/10 border border-synth-orange/30 flex items-center justify-center">
                  <Users className="w-8 h-8 text-synth-orange" />
                </div>
              )}
              <div className="text-center">
                <div className="font-orbitron font-bold text-sm">
                  {quickStarting === 'parent' ? 'Đang vào...' : existingParent ? existingParent.name : 'Phụ Huynh'}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-synth-orange font-bold mt-1">Viện Chủ 👑</div>
              </div>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mx-auto text-[11px] uppercase tracking-widest text-slate-400 hover:text-synth-magenta transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Đăng xuất
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-synth-bg text-white flex flex-col font-mono">
      {/* HUD Header */}
      <div className="border-b border-synth-magenta/30 bg-synth-magenta/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="font-orbitron font-black text-xl tracking-wider text-synth-cyan">
            GAME_ENG_G10 <span className="text-synth-magenta">::</span> SYSTEM
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-synth-magenta transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto p-8 flex flex-col items-center justify-center">
        {!isCreating ? (
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-orbitron text-3xl font-black uppercase text-white tracking-widest">
                Chọn Hồ Sơ
              </h2>
              <p className="text-slate-400">Tài khoản của bạn đang có {availableProfiles.length} hồ sơ.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availableProfiles.map((profile: any) => (
                <button
                  key={profile.id}
                  onClick={() => selectProfile(profile.id)}
                  className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-synth-cyan/50 hover:bg-synth-cyan/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-black/50 border border-white/10">
                    {isAdmin(profile.role) ? <span className="text-synth-magenta">{isSuperAdmin(profile.role) ? 'Viện Trưởng' : 'Phó Viện'}</span> : 
                     profile.role === 'parent' ? <span className="text-synth-orange">Phụ huynh</span> : 
                     <span className="text-synth-cyan">Học sinh</span>}
                  </div>
                  
                  <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-xl object-cover ring-2 ring-white/20 group-hover:ring-synth-cyan/50" />
                  
                  <div className="text-center">
                    <div className="font-orbitron font-bold text-lg">{profile.name}</div>
                  </div>
                </button>
              ))}

              <button
                onClick={() => setIsCreating(true)}
                className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-synth-cyan/50 hover:bg-synth-cyan/5 transition-all duration-300 min-h-[200px] cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-synth-cyan" />
                </div>
                <div className="font-orbitron font-bold uppercase tracking-wider text-sm text-slate-300 group-hover:text-white">
                  Tạo Hồ Sơ Mới
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md p-8 rounded-2xl border border-synth-cyan/30 bg-black/40 backdrop-blur-md space-y-6">
            <h2 className="font-orbitron text-2xl font-black text-center text-synth-cyan uppercase tracking-wider">
              Tạo Hồ Sơ Mới
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Thân Phận (Role)</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                     onClick={() => setNewRole('student')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer ${newRole === 'student' ? 'border-synth-cyan bg-synth-cyan/10 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'}`}
                  >
                    <GraduationCap className="w-6 h-6" />
                    <span className="font-bold text-sm uppercase">Học Sinh</span>
                  </button>
                  <button
                     onClick={() => setNewRole('parent')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer ${newRole === 'parent' ? 'border-synth-orange bg-synth-orange/10 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'}`}
                  >
                    <Users className="w-6 h-6" />
                    <span className="font-bold text-sm uppercase">Phụ Huynh</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Tên Hồ Sơ</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Nhập tên gọi..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-synth-cyan/50 font-sans"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-white/10 hover:bg-white/5 font-bold uppercase text-sm tracking-wider cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim() || isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl bg-synth-cyan hover:bg-synth-cyan/80 text-black font-black uppercase text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? 'Đang tạo...' : 'Xác Nhận'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
