import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { LogOut, GraduationCap, Users, Shield, Crown } from 'lucide-react';

export const ProfileSelectionScreen: React.FC = () => {
  const availableProfiles = useGameState(state => state.availableProfiles);
  const selectProfile = useGameState(state => state.selectProfile);
  const quickStartProfile = useGameState(state => state.quickStartProfile);
  const logout = useGameState(state => state.logout);
  const profilesLoading = useGameState(state => state.profilesLoading);
  const [quickStarting, setQuickStarting] = useState<'student' | 'tutor' | null>(null);
  const [selectingProfileId, setSelectingProfileId] = useState<string | null>(null);

  const existingStudent = availableProfiles.find((p: any) => p.role === 'student');
  const existingTutor = availableProfiles.find((p: any) => p.role === 'tutor' || p.role === 'secondary_tutor');
  const existingHieuPho = availableProfiles.find((p: any) => p.role === 'pho_vien');
  const existingHieuTruong = availableProfiles.find((p: any) => p.role === 'truong_vien');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const handleSelectRole = async (role: 'student' | 'tutor' | 'pho_vien' | 'truong_vien') => {
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
    } else if (role === 'tutor') {
      if (existingTutor) {
        setSelectingProfileId(existingTutor.id);
        try {
          await selectProfile(existingTutor.id);
        } finally {
          setSelectingProfileId(null);
        }
      } else {
        setQuickStarting('tutor');
        try {
          await quickStartProfile('tutor');
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
      label: 'Sĩ Tử 🌱',
      icon: <GraduationCap className="w-5 h-5 text-synth-cyan" />,
      colorClass: 'border-synth-cyan/30 hover:border-synth-cyan hover:bg-synth-cyan/5 text-synth-cyan shadow-[0_0_15px_rgba(0,240,255,0.03)]',
      exists: !!existingStudent,
      name: existingStudent?.name || 'Chưa khởi tạo',
      desc: 'Sĩ Tử vào học tập & rèn luyện',
      isLoading: quickStarting === 'student',
      isSelecting: selectingProfileId === existingStudent?.id,
      theme: existingStudent?.uiTheme || 'current',
    },
    {
      key: 'tutor',
      label: 'Chủ Nhiệm 📋',
      icon: <Users className="w-5 h-5 text-synth-orange" />,
      colorClass: 'border-synth-orange/30 hover:border-synth-orange hover:bg-synth-orange/5 text-synth-orange shadow-[0_0_15px_rgba(255,159,28,0.03)]',
      exists: !!existingTutor,
      name: existingTutor?.name || 'Chưa khởi tạo',
      desc: 'Quản lý lớp, phê duyệt quà & nhiệm vụ',
      isLoading: quickStarting === 'tutor',
      isSelecting: selectingProfileId === existingTutor?.id,
      theme: existingTutor?.uiTheme || 'current',
    },
  ];

  // Chỉ thêm card Phó Viện Trưởng nếu có profile tương ứng hoạt động
  if (existingHieuPho) {
    roleCards.push({
      key: 'pho_vien',
      label: 'Phó Viện Trưởng 🛡️',
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      colorClass: 'border-purple-400/30 hover:border-purple-400 hover:bg-purple-400/5 text-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.03)]',
      exists: true,
      name: existingHieuPho.name,
      desc: 'Được Ban Giám Hiệu ủy thác quản trị trường',
      isLoading: false,
      isSelecting: selectingProfileId === existingHieuPho.id,
      theme: existingHieuPho.uiTheme || 'current',
    });
  }

  // Chỉ thêm card Viện Trưởng nếu có profile tương ứng hoạt động
  if (existingHieuTruong) {
    roleCards.push({
      key: 'truong_vien',
      label: 'Viện Trưởng 👑',
      icon: <Crown className="w-5 h-5 text-synth-magenta" />,
      colorClass: 'border-synth-magenta/30 hover:border-synth-magenta hover:bg-synth-magenta/5 text-synth-magenta shadow-[0_0_15px_rgba(255,0,127,0.03)]',
      exists: true,
      name: existingHieuTruong.name,
      desc: 'Chủ viện quản trị tối cao học viện',
      isLoading: false,
      isSelecting: selectingProfileId === existingHieuTruong.id,
      theme: existingHieuTruong.uiTheme || 'current',
    });
  }

  if (profilesLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 font-mono text-white animate-fade-in">
        <div className="glass-panel rounded-3xl border border-white/10 p-8 max-w-sm w-full text-center space-y-4 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-synth-cyan mx-auto"></div>
          <p className="font-orbitron text-[10px] text-synth-cyan font-bold tracking-widest uppercase animate-pulse">
            Đang tải danh sách hồ sơ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 font-mono text-white animate-fade-in">
      <div className="glass-panel rounded-3xl border border-white/10 p-6 pb-8 max-w-md w-full text-center space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.1)] relative">
        {/* Đăng xuất */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-slate-400 hover:text-synth-magenta transition-colors cursor-pointer"
          title="Đăng xuất tài khoản Google"
        >
          <LogOut className="w-3 h-3" />
          Đăng xuất
        </button>

        <div className="space-y-1.5 pt-2">
          <h2 className="font-orbitron text-lg font-black uppercase tracking-wider text-synth-cyan">
            Chọn Hồ Sơ Đăng Nhập
          </h2>
          <p className="text-[10px] text-slate-400">
            Chọn vai trò bên dưới để tham gia học viện. Hồ sơ chưa có sẽ tự động khởi tạo.
          </p>
        </div>

        {/* Danh sách các Option sắp xếp dọc từ trên xuống */}
        <div className="flex flex-col gap-3 w-full">
          {roleCards.map((card) => {
            if (card.exists) {
              return (
                <button
                  key={card.key}
                  data-theme={card.theme}
                  disabled={quickStarting !== null || selectingProfileId !== null}
                  onClick={() => handleSelectRole(card.key as any)}
                  className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border bg-white/3 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full text-left ${card.colorClass}`}
                >
                  <div className="flex items-center gap-3 truncate min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                      {card.icon}
                    </div>
                    <div className="truncate min-w-0">
                      <div className="font-orbitron font-bold text-sm text-white leading-tight">
                        {card.label}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans truncate mt-0.5">
                        {card.desc}
                      </div>
                    </div>
                  </div>

                  {/* Phần hiển thị tên / trạng thái load đăng nhập */}
                  <div className="font-sans text-xs font-semibold text-white bg-slate-950/60 py-1.5 px-3 rounded-lg border border-white/5 flex items-center justify-center gap-1.5 min-h-[30px] max-w-[140px] truncate flex-shrink-0">
                    {card.isLoading || card.isSelecting ? (
                      <>
                        <span className="animate-spin rounded-full h-3 w-3 border-2 border-synth-cyan border-t-transparent" />
                        <span className="text-[9px]">{card.isLoading ? 'Khởi tạo...' : 'Đăng nhập...'}</span>
                      </>
                    ) : (
                      card.name
                    )}
                  </div>
                </button>
              );
            } else {
              // Option cho hồ sơ chưa khởi tạo: Hiển thị box nhỏ gọn dạng [icon - Trở thành Giáo Viên]
              const displayLabel = card.key === 'student' ? 'Trở thành Sĩ Tử 🌱' : 'Trở thành Chủ Nhiệm 📋';
              return (
                <button
                  key={card.key}
                  disabled={quickStarting !== null || selectingProfileId !== null}
                  onClick={() => handleSelectRole(card.key as any)}
                  className="group flex items-center gap-3 p-2.5 rounded-xl border border-dashed border-white/10 hover:border-white/30 bg-white/1 hover:bg-white/3 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="font-orbitron font-bold text-[11px] text-slate-400 group-hover:text-white transition-colors">
                    {displayLabel}
                  </div>
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
