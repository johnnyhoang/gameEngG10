import React, { lazy, Suspense } from 'react';

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
  return (
    <div className="space-y-5">
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
          <Suspense fallback={<LoadingFallback />}>
            <PetSanctuary variant="full" />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
