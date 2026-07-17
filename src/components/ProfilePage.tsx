import React, { useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { UI_THEMES } from '../theme/uiThemes';
import type { UiThemeId, UserProfile } from '../types/game';
import { useGameState } from '../hooks/useGameState';
import { getStudentRankForLevel, STUDENT_RANKS } from '../types/game';
import { toast } from '../utils/toast';
import { AcademyHandbook } from './AcademyHandbook';
import { ActivityLog } from './ActivityLog';
import { RubyConfirmModal } from './Common/RubyConfirmModal';
import { SearchSuggest } from './Common/SearchSuggest';
import { useTranslate } from '../hooks/useTranslate';

interface ProfilePageProps {
  currentUser: UserProfile;
  currentTheme: UiThemeId;
  onNavigate?: (screen: any) => void;
}

import { isLightTheme } from '../theme/uiThemes';

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  currentTheme,
  onNavigate
}) => {
  const player = useGameState(state => state.player);
  const { t } = useTranslate();

  const [isCamNangOpen, setIsCamNangOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const updateAvatar = useGameState(state => state.updateAvatar);

  const MOCK_AVATARS = [
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii1',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii2',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii3',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii4',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii5',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Maikawaii6',
    'https://api.dicebear.com/7.x/bottts/svg?seed=MaikawaiiRobot1',
    'https://api.dicebear.com/7.x/bottts/svg?seed=MaikawaiiRobot2',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=MaikawaiiScholar1',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=MaikawaiiScholar2'
  ];

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    cost: number;
    actionDescription: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    cost: 0,
    actionDescription: '',
    onConfirm: () => {},
  });

  // Class Connection state & functions
  const classLinks = useGameState(state => state.classLinks);
  const respondClassInvite = useGameState(state => state.respondClassInvite);
  const leaveClass = useGameState(state => state.leaveClass);
  const sendClassInvite = useGameState(state => state.sendClassInvite);

  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const activeLink = classLinks.find((l: any) => l.status === 'active');
  const pendingLink = classLinks.find((l: any) => l.status === 'pending_tutor' && l.student_id === currentUser.id);
  const pendingStudentInvites = classLinks.filter((l: any) => l.status === 'pending_student');

  // States for Profile Renaming
  const renameProfile = useGameState(state => state.renameProfile);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(currentUser.name);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      toast.error('Tên gọi không được để trống.');
      return;
    }
    setIsRenaming(true);
    const ok = await renameProfile(tempName.trim());
    if (ok) {
      setIsEditingName(false);
    }
    setIsRenaming(false);
  };

  const activeTheme = UI_THEMES.find(theme => theme.id === currentTheme) || UI_THEMES[0];
  const isUnicorn = currentTheme === 'unicorn-dream';
  const isLight = isLightTheme(currentTheme);


  return (
    <div className="space-y-6">
      <div className={`relative overflow-hidden rounded-[2rem] border p-5 md:p-8 ${
        isLight ? 'border-violet-200/35 bg-white/40' : 'border-white/15 bg-slate-950/60'
      }`}>
        {isUnicorn && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-fuchsia-200/45 via-white/80 to-cyan-200/45" />
            <div className="absolute left-6 top-4 flex gap-2 text-xl opacity-70">
              <span className="unicorn-twinkle">✨</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.3s' }}>🦄</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.6s' }}>🌈</span>
            </div>
            <div className="absolute right-8 top-8 h-16 w-24 rounded-full bg-white/40 blur-2xl unicorn-cloud" />
          </div>
        )}

        <div className="relative z-10 mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-16 w-16 rounded-3xl border border-white/15 object-cover shadow-lg"
              />
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className={`text-[9px] font-bold px-2 py-0.5 rounded border tracking-wide uppercase transition-colors cursor-pointer ${
                  isLight
                    ? 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Đổi Avatar
              </button>
            </div>
            <div>
              <p className={`mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${
                isUnicorn
                  ? 'border-violet-200/40 bg-white/80 text-violet-700'
                  : 'border-white/10 bg-white/5 text-white/70'
              }`}>
                <Palette className={`h-3.5 w-3.5 ${isUnicorn ? 'text-fuchsia-500' : ''}`} />
                {t('Học tịch hồ sơ', 'Student Profile')}
              </p>
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    className={`px-3 py-1 text-sm rounded border outline-none bg-white/10 ${
                      isUnicorn ? 'border-violet-300 text-violet-900' : 'border-white/20 text-white'
                    }`}
                    disabled={isRenaming}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={isRenaming}
                    className="px-3 py-1 rounded bg-synth-green text-black font-orbitron font-bold text-xs cursor-pointer hover:opacity-80"
                  >
                    {isRenaming ? '...' : t('Lưu', 'Save')}
                  </button>
                  <button
                    onClick={() => { setIsEditingName(false); setTempName(currentUser.name); }}
                    className="px-3 py-1 rounded bg-white/10 text-xs text-white cursor-pointer hover:bg-white/20"
                  >
                    {t('Hủy', 'Cancel')}
                  </button>
                </div>
              ) : (
                <h2 className={`text-2xl font-black md:text-3xl flex items-center gap-2 ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
                  {currentUser.name}
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
                    title={t('Đổi tên gọi', 'Rename')}
                  >
                    ✏️
                  </button>
                </h2>
              )}
              <p className={`mt-1 text-sm ${isUnicorn ? 'text-violet-700/75' : 'text-white/60'}`}>
                {currentUser.email}
              </p>
            </div>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('academy')}
              className={`md:self-center px-4 py-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer border ${
                isLight
                  ? 'border-violet-200 bg-gradient-to-r from-fuchsia-100 to-violet-100 text-violet-900 shadow-sm hover:brightness-105'
                  : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan hover:bg-synth-cyan/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              }`}
            >
              ⬅ {t('Quay lại Học Viện', 'Back to Academy')}
            </button>
          )}
        </div>

        {/* Bố cục 1 trang duy nhất gộp mọi thông tin học tịch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* CỘT TRÁI: Học Tích & Giáo Viên (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Chỉ số học tập (General Stats) */}
            {currentUser.role === 'student' && (
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 text-xs">
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron mb-1">{t('Danh hiệu học tập', 'Academic Title')}</span>
                  <span className="font-orbitron font-black text-synth-cyan text-sm leading-snug flex items-center gap-1">
                    <span>{getStudentRankForLevel(player.level).icon}</span>
                    <span>{getStudentRankForLevel(player.level).name}</span>
                  </span>
                  <span className="block text-[10px] text-slate-400 font-semibold mt-1">{t('Cấp', 'Level')} {player.level}</span>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron mb-1">{t('Tích lũy điểm số', 'Accumulated Points')}</span>
                  <span className="font-orbitron font-black text-synth-magenta text-sm">{player.xp} XP</span>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron mb-1">{t('Ruby tích lũy', 'Accumulated Ruby')}</span>
                  <span className="font-orbitron font-black text-synth-orange text-sm">{player.ruby} Ruby</span>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-orbitron mb-1">{t('Chuỗi học tập', 'Learning Streak')}</span>
                  <span className="font-orbitron font-black text-synth-green text-sm">{player.streak} {t('Ngày', 'Days')}</span>
                </div>
              </div>
            )}

            {/* Cây Danh Hiệu */}
            {currentUser.role === 'student' && (
              <div className={`p-5 rounded-2xl border ${isLight ? 'border-violet-200/50 bg-violet-50/20' : 'border-white/10 bg-white/5'} space-y-3`}>
                <h3 className={`font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                  <span>🏆</span> {t('Cây Danh Hiệu Sĩ Tử', 'Academic Titles Tree')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {STUDENT_RANKS.map(rank => {
                    const isUnlocked = player.level >= rank.minLevel;
                    return (
                      <div key={rank.id} className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                        isUnlocked
                          ? (isLight ? 'border-violet-200 bg-white/80' : 'border-synth-cyan/35 bg-synth-cyan/5 text-slate-200')
                          : 'opacity-40 border-white/5 bg-black/10'
                      }`} title={rank.description}>
                        <span className="text-xl">{rank.icon}</span>
                        <span className="font-orbitron font-bold text-[10px] mt-1 truncate max-w-full">{rank.name}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Lv.{rank.minLevel}+</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 1.2. Phong Cách Học Đường đang dùng */}
            <div className={`relative z-10 grid gap-2 rounded-2xl border p-4 text-sm ${
              isLight
                ? 'border-violet-200/40 bg-white/80 text-violet-700'
                : 'border-white/10 bg-white/5 text-white/75'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${isLight ? 'text-fuchsia-500' : 'text-synth-cyan'}`} />
                <span className="font-semibold font-orbitron text-xs">{t('Phong Cách Học Đường đang dùng', 'Current School Style')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeTheme.iconSet[0]}</span>
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>{activeTheme.name}</span>
              </div>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-white/55'}`}>{activeTheme.tagline}</p>
              
              {onNavigate && (
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => onNavigate('shop')}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-orbitron font-bold uppercase tracking-wider cursor-pointer transition-all ${
                      isLight
                        ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100'
                        : 'border-synth-cyan/30 bg-synth-cyan/5 text-synth-cyan hover:bg-synth-cyan/15'
                    }`}
                  >
                    {t('Đổi Phong Cách', 'Change Style')} 👘
                  </button>
                </div>
              )}
            </div>

            {/* 2. Lớp chủ nhiệm & kết nối giáo viên (Class Connection) */}
            {currentUser.role === 'student' && (
              <div className={`p-5 rounded-2xl border ${isLight ? 'border-violet-200/50 bg-violet-50/20' : 'border-white/10 bg-white/5'} space-y-4`}>
                <h3 className={`font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                  <span>🎓</span> {t('Lớp Chủ Nhiệm & Kết Nối Giáo Viên', 'Homeroom Class & Teacher Connection')}
                </h3>
                
                {/* 2.1 Active class connection status */}
                {activeLink && (
                  <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
                    isLight ? 'border-violet-200/50 bg-white/80 text-violet-800' : 'border-synth-cyan/20 bg-black/30 text-synth-cyan'
                  }`}>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('Đang học lớp của:', 'Currently in class of:')}</p>
                      <p className={`font-bold ${isLight ? 'text-violet-900' : 'text-white'}`}>
                        {activeLink.tutor_name || t('Chưa rõ tên', 'Unknown')}
                      </p>
                      <p className="text-[10px] opacity-70">({activeLink.tutor_email})</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (window.confirm('Bạn có chắc muốn rời khỏi lớp của Chủ Nhiệm này không?')) {
                          const success = await leaveClass(activeLink.id);
                          if (success) toast.success('Đã rời Lớp Chủ Nhiệm');
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[9px] uppercase font-black tracking-wide cursor-pointer transition-colors ${
                        isLight
                          ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                          : 'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      }`}
                    >
                      {t('Rời Lớp', 'Leave Class')} 🚪
                    </button>
                  </div>
                )}

                {/* 2.2 Pending connection request status */}
                {pendingLink && (
                  <div className={`flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border ${
                    isLight ? 'border-amber-200/50 bg-amber-50/50 text-amber-800' : 'border-synth-orange/20 bg-black/30 text-synth-orange'
                  }`}>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400">{t('Đang chờ phản hồi kết nối:', 'Awaiting connection response:')}</p>
                      <p className={`font-bold ${isLight ? 'text-amber-900' : 'text-white'}`}>
                        {pendingLink.tutor_name || t('Chưa rõ tên', 'Unknown')}
                      </p>
                      <p className="text-[10px] opacity-70">({pendingLink.tutor_email})</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (window.confirm('Bạn có chắc muốn hủy yêu cầu kết nối này không?')) {
                          const ok = await leaveClass(pendingLink.id);
                          if (ok) toast.success('Đã hủy yêu cầu kết nối.');
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[9px] uppercase font-black tracking-wide cursor-pointer transition-colors ${
                        isLight
                          ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                          : 'border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      }`}
                    >
                      {t('Hủy Yêu Cầu', 'Cancel Request')}
                    </button>
                  </div>
                )}

                {/* 2.3 Connection input form (Always visible to allow class switching/joining) */}
                <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl border ${
                  isLight ? 'border-violet-200/40 bg-white/60' : 'border-white/5 bg-black/20'
                }`}>
                  <div className="space-y-0.5 shrink-0 flex-1 min-w-[180px]">
                    <p className={`font-bold text-xs flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                      <span>🎓</span> {(activeLink || pendingLink) ? t('Chuyển Lớp Thầy/Cô', 'Switch Class') : t('Gia Nhập Lớp Mới', 'Join New Class')}
                    </p>
                    <p className="text-[10px] leading-normal text-slate-400">
                      {t('Nhập Email Google của Thầy/Cô để kết nối lớp.', "Enter your teacher's Google Email to connect to class.")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-1 max-w-sm w-full">
                    <SearchSuggest
                      placeholder={t('Email Thầy/Cô...', "Teacher's Email...")}
                      roleFilter="tutor"
                      value={inviteEmail}
                      onChange={setInviteEmail}
                      onSelect={user => setInviteEmail(user.email)}
                      className="flex-1"
                    />
                    <button
                      onClick={async () => {
                        if (!inviteEmail.trim()) return;
                        setIsInviting(true);
                        const result = await sendClassInvite(inviteEmail.trim());
                        if (result.success) {
                          toast.success('Đã gửi yêu cầu kết nối thành công! Vui lòng chờ Thầy/Cô phê duyệt.');
                          setInviteEmail('');
                        } else {
                          toast.error(result.error || 'Gửi yêu cầu thất bại.');
                        }
                        setIsInviting(false);
                      }}
                      disabled={isInviting || !inviteEmail.trim()}
                      className={`px-3.5 py-2 rounded-lg font-orbitron font-bold text-[9px] uppercase tracking-wider cursor-pointer transition-all ${
                        isLight
                          ? 'bg-violet-600 hover:bg-violet-700 text-white disabled:bg-violet-200'
                          : 'bg-synth-cyan hover:bg-synth-cyan/80 text-black disabled:opacity-50'
                      }`}
                    >
                      {isInviting ? t('Gửi...', 'Sending...') : (activeLink || pendingLink) ? t('Chuyển', 'Switch') : t('Kết nối', 'Connect')}
                    </button>
                  </div>
                </div>

                {/* 2.4 Lời mời kết nối từ thầy cô gửi tới */}
                {pendingStudentInvites.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <p className="font-bold text-synth-magenta flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                      <span>💌</span> {t('Lời mời gia nhập lớp từ Thầy/Cô:', 'Class invitations from Teacher:')}
                    </p>
                    {pendingStudentInvites.map((link: any) => (
                      <div key={link.id} className={`flex items-center justify-between p-3 rounded-xl border ${
                        isLight ? 'border-pink-200 bg-pink-50/50' : 'border-synth-magenta/30 bg-synth-magenta/5'
                      }`}>
                        <div className="text-[10px] leading-relaxed">
                          {t('Thầy/Cô', 'Teacher')} <strong className={isLight ? 'text-pink-700' : 'text-synth-cyan'}>{link.tutor_name || t('Chưa rõ tên', 'Unknown')}</strong> ({link.tutor_email}) {t('muốn nhận bạn vào lớp.', 'wants to add you to their class.')}
                        </div>
                        <div className="flex gap-1.5 shrink-0 ml-2">
                          <button
                            onClick={async () => {
                              const success = await respondClassInvite(link.id, true);
                              if (success) toast.success('Đã đồng ý kết nối!');
                            }}
                            className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase cursor-pointer ${
                              isLight ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-synth-cyan text-black hover:bg-synth-cyan/80'
                            }`}
                          >
                            {t('Đồng ý', 'Accept')}
                          </button>
                          <button
                            onClick={async () => {
                              const success = await respondClassInvite(link.id, false);
                              if (success) toast.success('Đã từ chối kết nối');
                            }}
                            className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase cursor-pointer ${
                              isLight ? 'bg-white border border-pink-200 text-pink-700 hover:bg-pink-50' : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                            }`}
                          >
                            {t('Từ chối', 'Decline')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Cẩm Nang Học Tập Banner */}
            <div className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-2xl border gap-4 ${
              isLight
                ? 'border-violet-200/50 bg-white/80 text-violet-800 shadow-sm'
                : 'border-synth-cyan/20 bg-synth-blue/30 text-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <div>
                  <h4 className={`text-sm font-bold font-serif ${isLight ? 'text-violet-900' : 'text-synth-cyan'}`}>{t('Cẩm Nang Học Tập', 'Study Handbook')}</h4>
                  <p className={`text-xs font-serif ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>{t('Quy chế học phủ, điều kiện thăng cấp và điểm tu học.', 'Learning rules, level-up conditions and experience.')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCamNangOpen(true)}
                className={`w-full sm:w-auto px-5 py-2.5 font-orbitron font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border hover:scale-[1.02] ${
                  isLight
                    ? 'border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100'
                    : 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan hover:bg-synth-cyan/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                }`}
              >
                {t('Mở Cẩm Nang', 'Open Handbook')} 📖
              </button>
            </div>

            {isCamNangOpen && (
              <AcademyHandbook
                isOpen={isCamNangOpen}
                onClose={() => setIsCamNangOpen(false)}
              />
            )}
          </div>

          {/* CỘT PHẢI: Nhật Ký Hoạt Động (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-5 rounded-2xl border ${isLight ? 'border-violet-200/35 bg-white/60' : 'border-white/10 bg-slate-950/40'} flex flex-col h-full max-h-[600px] overflow-hidden`}>
              <h3 className={`font-orbitron font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5 ${isLight ? 'text-violet-800' : 'text-synth-cyan'}`}>
                <span>📊</span> {t('Nhật Ký Hoạt Động Sĩ Tử', 'Student Activity Log')}
              </h3>
              <div className="flex-1 overflow-y-auto pr-1">
                <ActivityLog />
              </div>
            </div>
          </div>

        </div>
      </div>
      <RubyConfirmModal
        isOpen={confirmModal.isOpen}
        cost={confirmModal.cost}
        actionDescription={confirmModal.actionDescription}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />

      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-2xl border p-5 space-y-4 ${
            isLight ? 'border-violet-200 bg-white text-violet-900 shadow-xl' : 'border-synth-cyan/35 bg-slate-950 text-slate-100 shadow-[0_0_30px_rgba(0,240,255,0.25)]'
          }`}>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider">🔮 {t('Chọn Ảnh Đại Diện Mới', 'Select New Avatar')}</h3>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-3.5 py-2">
              {MOCK_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  onClick={async () => {
                    if (updatingAvatar) return;
                    setUpdatingAvatar(true);
                    const success = await updateAvatar(url);
                    if (success) {
                      setIsAvatarModalOpen(false);
                    }
                    setUpdatingAvatar(false);
                  }}
                  disabled={updatingAvatar}
                  className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-slate-800/40 hover:scale-105 cursor-pointer ${
                    currentUser.avatar === url
                      ? 'border-synth-cyan shadow-[0_0_10px_#00f0ff]'
                      : 'border-white/10 hover:border-synth-magenta'
                  }`}
                >
                  <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <div className="text-[10px] text-slate-400 leading-normal text-center">
              * {t('Avatar được lưu trên mây và áp dụng đồng bộ khắp học viện.', 'Avatar is stored in the cloud and synced everywhere.')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
