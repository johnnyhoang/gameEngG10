import React, { useState } from 'react';
import { useGeometryState } from '../hooks/useGeometryState';
import { ArrowRight } from 'lucide-react';
import {
  findPointById,
  edgePairs,
  midpoint,
  projectPointToLine,
  stripVietnamese as stripVietnamese2D
} from '../utils/planeMath';
import {
  parseCommand as parse3DCommand
} from '../utils/solidMath';

interface CommandConsoleProps {
  dimension: '2d' | '3d';
  model3D?: any; // Chỉ truyền khi dimension là 3d
}

export const CommandConsole: React.FC<CommandConsoleProps> = ({ dimension, model3D }) => {
  const [commandText, setCommandText] = useState('');
  const {
    planeScene,
    setPlaneScene,
    history2D,
    setHistory2D,
    setLessonSteps2D,
    history3D,
    setHistory3D,
    setActiveStepIndex3D,
    setIsPlaying3D
  } = useGeometryState();

  const addHistory2D = (entry: string) => {
    setHistory2D(prev => [entry, ...prev].slice(0, 8));
  };

  const addLessonStep2D = (step: any) => {
    setLessonSteps2D(prev => [step, ...prev].slice(0, 8));
  };

  const apply2DCommand = (text: string) => {
    const normalized = stripVietnamese2D(text).toLowerCase();

    // Regex tìm đỉnh và quan hệ nối
    const pointMatch = normalized.match(/([a-z])\s*(?:toi|den|vao|voi|sang)\s*([a-z][0-9']?)/i);
    const edges = edgePairs(planeScene);
    const pointMap = new Map(planeScene.points.map(p => [p.id, p]));

    const addSegmentByEdge = (fromId: string, edgeId: string, type: any, _label: string) => {
      const edge = edges.find(item => item.id === edgeId);
      const fromPoint = pointMap.get(fromId);

      if (!edge || !fromPoint) return;
      const edgeStart = pointMap.get(edge.from);
      const edgeEnd = pointMap.get(edge.to);
      if (!edgeStart || !edgeEnd) return;

      const derivedPoint = type === 'median'
        ? midpoint(edgeStart, edgeEnd)
        : projectPointToLine(fromPoint, edgeStart, edgeEnd);

      const connectorLabel = type === 'median' ? 'Trung tuyến' : type === 'altitude' ? 'Đường cao' : 'Vuông góc';

      setPlaneScene(prev => ({
        ...prev,
        points: [
          ...prev.points,
          {
            id: `P${Date.now()}`,
            x: derivedPoint.x,
            y: derivedPoint.y,
            label: type === 'median' ? 'M' : type === 'altitude' || type === 'perpendicular' ? 'H' : 'K',
            locked: true
          }
        ],
        overlays: [
          ...prev.overlays,
          {
            id: `overlay-${Date.now()}`,
            type: type === 'perpendicular' ? 'segment' : type,
            from: fromId,
            to: edgeId,
            color: '#00f0ff',
            label: connectorLabel,
            dashed: type === 'altitude'
          }
        ]
      }));

      addLessonStep2D({
        title: connectorLabel,
        body: `Từ ${fromId} kẻ ${connectorLabel.toLowerCase()} xuống cạnh ${edgeId}. Điểm chân được cập nhật ngay trên bảng.`
      });
      addHistory2D(`${connectorLabel} từ ${fromId} xuống ${edgeId}`);
    };

    if (normalized.includes('duong cao') && planeScene.polygon) {
      const apex = findPointById(planeScene.points, pointMatch?.[1]?.toUpperCase() || planeScene.points[0]?.id);
      const edge = edges[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'altitude', `Đường cao từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    if (normalized.includes('trung tuyen') && planeScene.polygon) {
      const apex = findPointById(planeScene.points, pointMatch?.[1]?.toUpperCase() || planeScene.points[0]?.id);
      const edge = edges[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'median', `Trung tuyến từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    if (normalized.includes('vuong goc') && planeScene.polygon) {
      const apex = findPointById(planeScene.points, pointMatch?.[1]?.toUpperCase() || planeScene.points[0]?.id);
      const edge = edges[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'perpendicular', `Vuông góc từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    addHistory2D(`Lệnh ghi chú: ${text}`);
    addLessonStep2D({
      title: 'Ghi chú lệnh',
      body: `Chưa tự động hiểu hết lệnh "${text}". AI phân tích sẽ bổ sung cấu trúc chuẩn hơn.`
    });
    setCommandText('');
  };

  const apply3DCommand = (text: string) => {
    if (!model3D) return;
    const result = parse3DCommand(text, model3D, history3D.length + 1);
    const item = {
      id: `cmd-${Date.now()}`,
      text,
      summary: result.summary,
      annotations: result.annotations,
      steps: result.steps.length > 0 ? result.steps : [{
        title: 'Ghi chú lệnh',
        body: result.summary,
        focus: [],
        annotationIds: []
      }]
    };
    setHistory3D(prev => [...prev, item]);
    setCommandText('');
    setActiveStepIndex3D(prev => prev + 1);
    setIsPlaying3D(false);
  };

  const handleApplyCommand = () => {
    const text = commandText.trim();
    if (!text) return;
    if (dimension === '2d') {
      apply2DCommand(text);
    } else {
      apply3DCommand(text);
    }
  };

  const currentHistory = dimension === '2d' ? history2D : history3D.map(item => item.summary);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={commandText}
          onChange={e => setCommandText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleApplyCommand();
            }
          }}
          placeholder={
            dimension === '2d'
              ? 'Nhập lệnh như "vẽ đường cao từ A", "nối trung điểm BC với đỉnh A"...'
              : 'Ví dụ: vẽ đường cao từ S, nối trung điểm BC với đỉnh S, tô màu mặt ABCD...'
          }
          className="flex-1 rounded-2xl border border-white/10 bg-synth-gray/25 px-4 py-3 text-sm text-white outline-none focus:border-synth-cyan/40"
        />
        <button
          onClick={handleApplyCommand}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          Dùng lệnh <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lịch sử thao tác</div>
        <div className="mt-3 space-y-2">
          {currentHistory.length > 0 ? (
            currentHistory.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-synth-blue/15 px-3 py-2 text-xs text-slate-200 leading-relaxed">
                {item}
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-3 py-4 text-xs text-slate-400">
              Chưa có thao tác nào. Nhập câu lệnh ở trên hoặc dùng thanh công cụ vẽ nhanh.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
