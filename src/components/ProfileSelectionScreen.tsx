import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { LogOut, GraduationCap, Users, Shield, Crown } from 'lucide-react';

export const ProfileSelectionScreen: React.FC = () => {
  const availableProfiles = useGameState(state => state.availableProfiles);
  const selectProfile = useGameState(state => state.selectProfile);
  const quickStartProfile = useGameState(state => state.quickStartProfile);
  const logout = useGameState(state => state.logout);
  const [quickStarting, setQuickStarting] = useState<'student' | 'parent' | null>(null);
  const [selectingProfileId, setSelectingProfileId] = useState<string | null>(null);

  const existingStudent = availableProfiles.find((p: any) => p.role === 'student');
  const existingParent = availableProfiles.find((p: any) => p.role === 'parent' || p.role === 'secondary_parent');
  const existingHieuPho = availableProfiles.find((p: any) => p.role === 'pho_vien');
  const existingHieuTruong = availableProfiles.find((p: any) => p.role === 'truong_vien');

  const handleLogout = async () => {
    await logout();
  };

  const handleSelectRole = async (role: 'student' | 'parent' | 'pho_vien' | 'truong_vien') => {
    if (selectingProfileId || quickStarting) return;

    if (role === 'student') {
      if (existingStudent) {
        setSelectingProfileId(existingStudent.id);
        try {
          await selectProfile(existingStudent.id);
        } finally {
          setSelectingProfileId(null);
        }
      } else {
        setQuickStarting('student');
        try {
          await quickStartProfile('student');
        } finally {
          setQuickStarting(null);
        }
      }
    } else if (role === 'parent') {
      if (existingParent) {
        setSelectingProfileId(existingParent.id);
        try {
          await selectProfile(existingParent.id);
        } finally {
          setSelectingProfileId(null);
        }
      } else {
        setQuickStarting('parent');
        try {
          await quickStartProfile('parent');
        } finally {
          setQuickStarting(null);
        }
      }
    } else if (role === 'pho_vien' && existingHieuPho) {
      setSelectingProfileId(existingHieuPho.id);
      try {
        await selectProfile(existingHieuPho.id);
      } finally {
        setSelectingProfileId(null);
      }
    } else if (role === 'truong_vien' && existingHieuTruong) {
      setSelectingProfileId(existingHieuTruong.id);
      try {
        await selectProfile(existingHieuTruong.id);
      } finally {
        setSelectingProfileId(null);
      }
    }
  };

  // Cấu hình các card vai trò hiển thị
  const roleCards = [
    {
      key: 'student',
      label: 'Học Sinh 🌱',
      icon: <GraduationCap className="w-8 h-8 text-synth-cyan" />,
      colorClass: 'border-synth-cyan/30 hover:border-synth-cyan hover:bg-synth-cyan/5 text-synth-cyan shadow-[0_0_15px_rgba(0,240,255,0.05)]',
      exists: !!existingStudent,
      name: existingStudent?.name || 'Chưa khởi tạo',
      desc: 'Học sinh vào học tập & rèn luyện',
      isLoading: quickStarting === 'student',
      isSelecting: selectingProfileId === existingStudent?.id,
      theme: existingStudent?.uiTheme || 'current',
    },
    {
      key: 'parent',
      label: 'Chủ Nhiệm 📋',
      icon: <Users className="w-8 h-8 text-synth-orange" />,
      colorClass: 'border-synth-orange/30 hover:border-synth-orange hover:bg-synth-orange/5 text-synth-orange shadow-[0_0_15px_rgba(255,159,28,0.05)]',
      exists: !!existingParent,
      name: existingParent?.name || 'Chưa khởi tạo',
      desc: 'Quản lý lớp, phê duyệt quà & nhiệm vụ',
      isLoading: quickStarting === 'parent',
      isSelecting: selectingProfileId === existingParent?.id,
      theme: existingParent?.uiTheme || 'current',
    },
  ];

  // Chỉ thêm card Hiệu Phó nếu có profile tương ứng hoạt động
  if (existingHieuPho) {
    roleCards.push({
      key: 'pho_vien',
      label: 'Hiệu Phó 🛡️',
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      colorClass: 'border-purple-400/30 hover:border-purple-400 hover:bg-purple-400/5 text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.05)]',
      exists: true,
      name: existingHieuPho.name,
      desc: 'Được Ban Giám Hiệu ủy thác quản trị trường',
      isLoading: false,
      isSelecting: selectingProfileId === existingHieuPho.id,
      theme: existingHieuPho.uiTheme || 'current',
    });
  }

  // Chỉ thêm card Hiệu Trưởng nếu có profile tương ứng hoạt động
  if (existingHieuTruong) {
    roleCards.push({
      key: 'truong_vien',
      label: 'Hiệu Trưởng 👑',
      icon: <Crown className="w-8 h-8 text-synth-magenta" />,
      colorClass: 'border-synth-magenta/30 hover:border-synth-magenta hover:bg-synth-magenta/5 text-synth-magenta shadow-[0_0_15px_rgba(255,0,127,0.05)]',
      exists: true,
      name: existingHieuTruong.name,
      desc: 'Chủ viện quản trị tối cao học viện',
      isLoading: false,
      isSelecting: selectingProfileId === existingHieuTruong.id,
      theme: existingHieuTruong.uiTheme || 'current',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 font-mono text-white animate-fade-in">
      <div className="glass-panel rounded-3xl border border-white/10 p-8 max-w-4xl w-full text-center space-y-8 shadow-[0_0_50px_rgba(0,240,255,0.1)] relative">
        {/* Đăng xuất */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400 hover:text-synth-magenta transition-colors cursor-pointer"
          title="Đăng xuất tài khoản Google"
        >
          <LogOut className="w-3.5 h-3.5" />
          Đăng xuất
        </button>

        <div className="space-y-2">
          <h2 className="font-orbitron text-2xl font-black uppercase tracking-wider text-synth-cyan">
            Chọn Thân Phận Đăng Nhập
          </h2>
          <p className="text-xs text-slate-400">
            Chọn vai trò bên dưới để tham gia học viện. Hồ sơ chưa có sẽ tự động khởi tạo.
          </p>
        </div>

        <div className={`grid gap-6 ${roleCards.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {roleCards.map((card) => (
            <button
              key={card.key}
              data-theme={card.theme}
              disabled={quickStarting !== null || selectingProfileId !== null}
              onClick={() => handleSelectRole(card.key as any)}
              className={`group flex flex-col items-center justify-between gap-4 p-6 rounded-2xl border bg-white/3 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${card.colorClass}`}
            >
              {/* Icon & Label */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <div className="font-orbitron font-bold text-base mt-1">
                  {card.label}
                </div>
              </div>

              {/* Info */}
              <div className="w-full space-y-1.5 mt-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Trạng thái
                </div>
                <div className="font-sans text-xs font-semibold text-white bg-black/40 py-1.5 px-3 rounded-lg truncate border border-white/5 flex items-center justify-center gap-1.5 min-h-[32px]">
                  {card.isLoading ? (
                    <>
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-synth-cyan border-t-transparent" />
                      <span>Khởi tạo...</span>
                    </>
                  ) : card.isSelecting ? (
                    <>
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-synth-cyan border-t-transparent" />
                      <span>Đăng nhập...</span>
                    </>
                  ) : (
                    card.name
                  )}
                </div>
                <p className="text-[9px] text-slate-400 leading-normal font-sans pt-1">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
