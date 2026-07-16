import React, { lazy, Suspense } from 'react';
import { useGameState } from '../hooks/useGameState';
import { isLightTheme } from '../theme/uiThemes';
import { useTranslate } from '../hooks/useTranslate';

const PetSanctuary = lazy(() => import('./PetSanctuary').then(m => ({ default: m.PetSanctuary })));
const ItemShop = lazy(() => import('./ItemShop').then(m => ({ default: m.ItemShop })));

interface FunzoneTabProps {
  onSpinWheel: () => void;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-10">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan" />
  </div>
);

export const FunzoneTab: React.FC<FunzoneTabProps> = ({ onSpinWheel }) => {
  const { t } = useTranslate();
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className={`glass-panel rounded-2xl border p-4 flex items-center gap-3 ${
        isUnicorn
          ? 'border-violet-200/35 bg-gradient-to-r from-fuchsia-50/80 via-white/70 to-cyan-50/80'
          : 'border-synth-purple/20 bg-gradient-to-r from-synth-purple/10 via-synth-orange/5 to-transparent'
      }`}>
        <span className="text-2xl">🎮</span>
        <div>
          <h1 className={`font-orbitron font-black text-base uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
            Funzone
          </h1>
          <p className={`text-xs ${isUnicorn ? 'text-violet-600/70' : 'text-synth-text-muted'}`}>
            {t('Sân chơi & Cửa Hàng — Dùng Ruby để mua vật phẩm, chăm thú cưng và đổi quà!', 'Game zone & Shop — Use Ruby to buy items, care for your pet, and redeem rewards!')}
          </p>
        </div>
      </div>

      {/* ── 2-column layout: Shop (main) + Pet (right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Shop — vùng chính (2/3 width) */}
        <div className="lg:col-span-2">
          <Suspense fallback={<LoadingFallback />}>
            <ItemShop onSpinWheel={onSpinWheel} />
          </Suspense>
        </div>

        {/* Pet Sanctuary — cột phải (1/3 width) */}
        <div className="lg:col-span-1 space-y-0">
          {/* Pet header label */}
          <div className={`mb-3 flex items-center gap-2 px-1`}>
            <span className="text-lg">🐷</span>
            <h2 className={`font-orbitron font-bold text-xs uppercase tracking-wider ${isUnicorn ? 'text-violet-700' : 'text-synth-cyan'}`}>
              {t('Sân Thú Nuôi', 'Pet Sanctuary')}
            </h2>
          </div>
          <Suspense fallback={<LoadingFallback />}>
            <PetSanctuary variant="full" />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
