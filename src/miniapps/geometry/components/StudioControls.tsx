import React from 'react';
import { useGeometryState } from '../hooks/useGeometryState';
import {
  MousePointer2,
  Plus,
  PenLine,
  Ruler,
  Square,
  RefreshCw,
  Circle,
  ArrowRight
} from 'lucide-react';

import type { PlaneTool } from '../utils/planeMath';

interface StudioControlsProps {
  dimension: '2d' | '3d';
}

export const StudioControls: React.FC<StudioControlsProps> = ({ dimension }) => {
  const {
    planeTool,
    setPlaneTool,
    setSelectedPointId2D,
    boardTool3D,
    setBoardTool3D,
    setPickedVertex3D,
    setPickedVertices3D
  } = useGeometryState();

  if (dimension === '2d') {
    const tools = [
      { id: 'move', label: 'Kéo thả', icon: <MousePointer2 className="w-4 h-4" /> },
      { id: 'connect-vertex', label: 'Nối đỉnh-đỉnh', icon: <Plus className="w-4 h-4" /> },
      { id: 'connect-edge', label: 'Nối đỉnh-cạnh', icon: <PenLine className="w-4 h-4" /> },
      { id: 'altitude', label: 'Đường cao', icon: <Ruler className="w-4 h-4" /> },
      { id: 'median', label: 'Trung tuyến', icon: <Square className="w-4 h-4" /> },
      { id: 'perpendicular', label: 'Vuông góc', icon: <Square className="w-4 h-4" /> },
      { id: 'parallel', label: 'Song song', icon: <RefreshCw className="w-4 h-4" /> },
      { id: 'angle-mark', label: 'Đánh dấu góc', icon: <Circle className="w-4 h-4" /> },
      { id: 'tangent', label: 'Tiếp tuyến', icon: <ArrowRight className="w-4 h-4" /> }
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-2">
        {tools.map(tool => {
          const isActive = planeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setPlaneTool(tool.id as PlaneTool);
                setSelectedPointId2D(null);
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isActive
                  ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan'
                  : 'border-white/10 bg-white/5 text-white hover:border-white/20'
              }`}
            >
              {tool.icon}
              {tool.label}
            </button>
          );
        })}
      </div>
    );
  }

  // 3D tools
  const tools3D = [
    { id: 'ai', label: 'Công cụ AI', color: 'synth-cyan' },
    { id: 'vertex-vertex', label: 'Đỉnh → đỉnh', color: 'synth-cyan' },
    { id: 'vertex-edge', label: 'Đỉnh → cạnh', color: 'synth-orange' },
    { id: 'perpendicular', label: 'Vuông góc', color: 'synth-magenta' },
    { id: 'plane-3p', label: 'Mặt phẳng 3 điểm', color: 'synth-green' }
  ] as const;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bảng vẽ nhanh 3D:</span>
        {tools3D.map(({ id, label, color }) => {
          const isActive = boardTool3D === id;
          let colorClass = 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan';
          if (color === 'synth-orange') colorClass = 'border-synth-orange/30 bg-synth-orange/10 text-synth-orange';
          if (color === 'synth-magenta') colorClass = 'border-synth-magenta/30 bg-synth-magenta/10 text-synth-magenta';
          if (color === 'synth-green') colorClass = 'border-synth-green/30 bg-synth-green/10 text-synth-green';

          return (
            <button
              key={id}
              onClick={() => {
                setBoardTool3D(id);
                setPickedVertex3D(null);
                if (id !== 'plane-3p') setPickedVertices3D([]);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                isActive ? colorClass : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
