import React from 'react';
import { CheckCircle2, Palette, Sparkles, X } from 'lucide-react';
import { UI_THEMES, type UiThemeConfig } from '../theme/uiThemes';
import type { UiThemeId, UserProfile } from '../types/game';

interface ProfileThemeModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  currentTheme: UiThemeId;
  onClose: () => void;
  onSelectTheme: (themeId: UiThemeId) => void;
}

const getThemeCardClass = (themeId: UiThemeId, isActive: boolean) => {
  const base = 'relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer';

  const variants: Record<UiThemeId, string> = {
    current: 'border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-fuchsia-500/10',
    'cute-pink-pastel': 'border-pink-200/50 bg-gradient-to-br from-pink-100 via-fuchsia-50 to-rose-100',
    'space-adventure': 'border-cyan-300/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-900/40',
    'fantasy-forest': 'border-emerald-200/40 bg-gradient-to-br from-lime-50 via-amber-50 to-green-100',
    'pixel-arcade': 'border-lime-300/40 bg-gradient-to-br from-slate-950 via-slate-900 to-green-900/40',
    'unicorn-dream': 'border-violet-200/60 bg-gradient-to-br from-fuchsia-50 via-white to-cyan-50'
  };

  return `${base} ${variants[themeId]} ${isActive ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-white/70 scale-[1.01]' : 'hover:-translate-y-1'}`;
};

const getTextToneClass = (themeId: UiThemeId) => {
  switch (themeId) {
    case 'cute-pink-pastel':
      return 'text-fuchsia-700';
    case 'space-adventure':
      return 'text-cyan-200';
    case 'fantasy-forest':
      return 'text-emerald-900';
    case 'pixel-arcade':
      return 'text-lime-300';
    case 'unicorn-dream':
      return 'text-violet-700';
    default:
      return 'text-cyan-200';
  }
};

const ThemePreview: React.FC<{ theme: UiThemeConfig }> = ({ theme }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/80 text-lg shadow-sm">
          <span>{theme.iconSet[0]}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
            {theme.shortName}
          </p>
          <p className="truncate text-sm font-bold text-slate-900">{theme.name}</p>
        </div>
      </div>
      {theme.recommended && (
        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
          Gợi ý
        </span>
      )}
    </div>
  );
};

export const ProfileThemeModal: React.FC<ProfileThemeModalProps> = ({
  isOpen,
  currentUser,
  currentTheme,
  onClose,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  const activeTheme = UI_THEMES.find(theme => theme.id === currentTheme) || UI_THEMES[0];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/95 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Đóng profile"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-16 w-16 rounded-3xl border border-white/15 object-cover shadow-lg"
              />
              <div>
                <p className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
                  <Palette className="h-3.5 w-3.5" />
                  Profile giao diện
                </p>
                <h2 className="text-2xl font-black text-white md:text-3xl">
                  {currentUser.name}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Chọn một style phù hợp với cá tính của bé. Theme sẽ được lưu theo tài khoản.
                </p>
              </div>
            </div>

            <div className="grid gap-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span className="font-semibold">Theme hiện tại</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeTheme.iconSet[0]}</span>
                <span className="font-bold text-white">{activeTheme.name}</span>
              </div>
              <p className="text-xs text-white/55">{activeTheme.tagline}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UI_THEMES.map(theme => {
              const isActive = theme.id === currentTheme;
              const toneClass = getTextToneClass(theme.id);

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    onClose();
                  }}
                  className={getThemeCardClass(theme.id, isActive)}
                >
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                    {theme.iconSet.join(' ')}
                  </div>

                  {isActive && (
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Đang dùng
                    </div>
                  )}

                  <div className="mt-10 space-y-3">
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-[0.28em] ${toneClass} opacity-80`}>
                        {theme.shortName}
                      </p>
                      <h3 className={`text-xl font-black ${theme.id === 'pixel-arcade' ? 'font-mono' : ''} ${theme.id === 'cute-pink-pastel' ? 'tracking-tight' : ''} ${toneClass}`}>
                        {theme.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-black/70">
                        {theme.description}
                      </p>
                    </div>

                    <div className="space-y-2 rounded-2xl bg-white/55 p-3">
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Phong cách</span>
                        <span className="text-right font-black text-black">{theme.mood}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Màu chủ đạo</span>
                        <span className="text-right font-black text-black">{theme.accentLabel}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-black/65">
                        <span>Font</span>
                        <span className="text-right font-black text-black">{theme.fontLabel}</span>
                      </div>
                    </div>

                    <ThemePreview theme={theme} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
