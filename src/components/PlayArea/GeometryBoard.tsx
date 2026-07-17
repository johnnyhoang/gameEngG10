import React, { lazy, Suspense } from 'react';

const GeometryApp = lazy(() =>
  import('../../miniapps/geometry').then((m) => ({ default: m.GeometryApp }))
);

interface GeometryBoardProps {
  isGeometry: boolean;
  showHandbookBoard: boolean;
  onToggleBikiBoard: () => void;
  is3D: boolean;
  prompt: string;
  sceneData?: any;
}

export const GeometryBoard: React.FC<GeometryBoardProps> = ({
  isGeometry,
  showHandbookBoard,
  onToggleBikiBoard,
  is3D,
  prompt,
  sceneData,
}) => {
  if (!isGeometry) return null;

  return (
    <div className="border border-synth-cyan/20 rounded-xl bg-synth-gray/10 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={onToggleBikiBoard}
        className="w-full px-4 py-2.5 bg-synth-cyan/10 hover:bg-synth-cyan/15 flex items-center justify-between text-xs font-orbitron font-bold text-synth-cyan uppercase tracking-wider cursor-pointer text-left"
      >
        <span className="flex items-center gap-2">
          📐 Bảng Vẽ Hình Học (Phẳng & Không Gian)
          <span className="text-[10px] text-synth-text-muted lowercase font-normal italic">
            (Nhấp để {showHandbookBoard ? 'thu gọn' : 'mở rộng'})
          </span>
        </span>
        <span>{showHandbookBoard ? '▼' : '▲'}</span>
      </button>

      {showHandbookBoard && (
        <div className="p-3 border-t border-synth-cyan/15 bg-black/25 space-y-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-synth-cyan"></div>
              </div>
            }
          >
            <GeometryApp
              mode="widget"
              dimension={is3D ? '3d' : '2d'}
              problemText={prompt}
              initialScene={sceneData}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};
