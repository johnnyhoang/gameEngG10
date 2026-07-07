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
  const isUnicorn = theme.id === 'unicorn-dream';

  return (
    <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/50 px-4 py-3 backdrop-blur-sm">
      {isUnicorn && (
        <>
          <div className="unicorn-rainbow-strip absolute inset-x-0 top-0 h-1.5 opacity-90" />
          <div className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-fuchsia-200/40 blur-xl unicorn-cloud" />
          <div className="absolute -right-3 bottom-[-0.8rem] h-10 w-10 rounded-full bg-cyan-200/40 blur-xl unicorn-cloud" />
        </>
      )}

      <div className="flex items-center gap-3 min-w-0">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/80 text-lg shadow-sm">
          <span className={isUnicorn ? 'unicorn-twinkle' : ''}>{theme.iconSet[0]}</span>
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
        {currentTheme === 'unicorn-dream' && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-fuchsia-200/45 via-white/80 to-cyan-200/45" />
            <div className="pointer-events-none absolute left-6 top-4 flex gap-2 text-xl opacity-70">
              <span className="unicorn-twinkle">✨</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.3s' }}>🦄</span>
              <span className="unicorn-twinkle" style={{ animationDelay: '0.6s' }}>🌈</span>
            </div>
            <div className="pointer-events-none absolute right-8 top-8 h-16 w-24 rounded-full bg-white/40 blur-2xl unicorn-cloud" />
          </>
        )}

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border transition ${
            currentTheme === 'unicorn-dream'
              ? 'border-violet-200/40 bg-white/70 text-violet-700 hover:bg-white'
              : 'border-white/10 bg-white/10 text-white hover:bg-white/20'
          }`}
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
                <p className={`mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] ${
                  currentTheme === 'unicorn-dream'
                    ? 'border-violet-200/40 bg-white/80 text-violet-700'
                    : 'border-white/10 bg-white/5 text-white/70'
                }`}>
                  <Palette className={`h-3.5 w-3.5 ${currentTheme === 'unicorn-dream' ? 'text-fuchsia-500' : ''}`} />
                  {currentTheme === 'unicorn-dream' ? 'Unicorn Dream Profile' : 'Profile giao diện'}
                </p>
                <h2 className={`text-2xl font-black md:text-3xl ${currentTheme === 'unicorn-dream' ? 'text-violet-800' : 'text-white'}`}>
                  {currentUser.name}
                </h2>
                <p className={`mt-1 text-sm ${currentTheme === 'unicorn-dream' ? 'text-violet-700/75' : 'text-white/60'}`}>
                  Chọn một style phù hợp với cá tính của bé. Theme sẽ được lưu theo tài khoản.
                </p>
              </div>
            </div>

            <div className={`grid gap-2 rounded-3xl border p-4 text-sm ${
              currentTheme === 'unicorn-dream'
                ? 'border-violet-200/40 bg-white/80 text-violet-700'
                : 'border-white/10 bg-white/5 text-white/75'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${currentTheme === 'unicorn-dream' ? 'text-fuchsia-500' : 'text-cyan-300'}`} />
                <span className="font-semibold">Theme hiện tại</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeTheme.iconSet[0]}</span>
                <span className="font-bold text-white">{activeTheme.name}</span>
              </div>
              <p className={`text-xs ${currentTheme === 'unicorn-dream' ? 'text-violet-700/70' : 'text-white/55'}`}>{activeTheme.tagline}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UI_THEMES.map(theme => {
              const isActive = theme.id === currentTheme;
              const toneClass = getTextToneClass(theme.id);
              const isUnicorn = theme.id === 'unicorn-dream';

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    onClose();
                  }}
                  className={getThemeCardClass(theme.id, isActive)}
                >
                  <div className={`absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                    isUnicorn ? 'bg-white/90 text-violet-700' : 'bg-white/85 text-slate-600'
                  }`}>
                    {theme.iconSet.join(' ')}
                  </div>

                  {isActive && (
                    <div className={`absolute left-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-sm ${
                      isUnicorn ? 'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400' : 'bg-emerald-500'
                    }`}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Đang dùng
                    </div>
                  )}

                  <div className="mt-10 space-y-3">
                    {isUnicorn && (
                      <div className="unicorn-rainbow-strip h-1.5 rounded-full opacity-90" />
                    )}
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

                    <div className={`space-y-2 rounded-2xl p-3 ${
                      isUnicorn ? 'bg-white/70 border border-violet-200/40' : 'bg-white/55'
                    }`}>
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

                    {isUnicorn && (
                      <div className="flex items-center justify-between rounded-2xl border border-violet-200/35 bg-white/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-violet-700">
                        <span className="inline-flex items-center gap-1">
                          <span className="unicorn-twinkle">✨</span>
                          Magical cozy mode
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="unicorn-cloud">☁️</span>
                          Soft sparkles
                        </span>
                      </div>
                    )}
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
