import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Circle,
  Move,
  MousePointer2,
  PenLine,
  Plus,
  RefreshCw,
  Ruler,
  Sparkles,
  Square,
  Triangle
} from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

type PlaneFigureKind = 'triangle' | 'quadrilateral' | 'circle' | 'mixed' | 'unknown';
type PlaneTool = 'move' | 'connect-vertex' | 'connect-edge' | 'altitude' | 'median' | 'perpendicular' | 'parallel' | 'angle-mark' | 'tangent';

interface PlanePoint {
  id: string;
  x: number;
  y: number;
  label?: string;
  locked?: boolean;
}

interface PlanePolygon {
  id: string;
  points: string[];
  fill: string;
  opacity: number;
}

interface PlaneCircleShape {
  center: string;
  radiusPoint: string;
  fill: string;
  opacity: number;
}

interface PlaneOverlay {
  id: string;
  type: 'segment' | 'marker' | 'parallel' | 'angle' | 'altitude' | 'median' | 'perpendicular' | 'tangent';
  from?: string;
  to?: string;
  at?: string;
  color: string;
  label: string;
  dashed?: boolean;
}

interface PlaneLessonStep {
  title: string;
  body: string;
}

interface PlaneScene {
  figureKind: PlaneFigureKind;
  title: string;
  notation: string;
  points: PlanePoint[];
  polygon?: PlanePolygon;
  circle?: PlaneCircleShape;
  overlays: PlaneOverlay[];
}

interface PlaneAiOverlay {
  type: 'segment' | 'marker' | 'parallel' | 'angle';
  from?: string;
  to?: string;
  at?: string;
  color?: string;
  label?: string;
  dashed?: boolean;
}

interface PlaneAiResult {
  figureKind: PlaneFigureKind;
  title: string;
  summary: string;
  assumptions: string[];
  stepByStep: PlaneLessonStep[];
  scene: {
    points?: PlanePoint[];
    polygon?: PlanePolygon;
    circle?: PlaneCircleShape;
    overlays?: PlaneAiOverlay[];
  };
  commands: string[];
  warnings: string[];
}

interface BikiHinhHocPhangProps {
  problemText?: string;
}

const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 560;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function stripVietnamese(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function distance(a: PlanePoint, b: PlanePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function projectPointToLine(point: PlanePoint, a: PlanePoint, b: PlanePoint) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 === 0) return { x: a.x, y: a.y };
  const t = ((point.x - a.x) * abx + (point.y - a.y) * aby) / len2;
  return { x: a.x + t * abx, y: a.y + t * aby };
}

function normalizeVector(a: PlanePoint, b: PlanePoint) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

function createDefaultScene(kind: PlaneFigureKind): PlaneScene {
  if (kind === 'circle') {
    return {
      figureKind: 'circle',
      title: 'Đường tròn (O)',
      notation: '(O)',
      points: [
        { id: 'O', x: 380, y: 280, label: 'O', locked: true },
        { id: 'A', x: 520, y: 280, label: 'A' },
        { id: 'B', x: 380, y: 140, label: 'B' },
        { id: 'C', x: 250, y: 280, label: 'C' }
      ],
      circle: { center: 'O', radiusPoint: 'A', fill: '#38bdf8', opacity: 0.08 },
      overlays: []
    };
  }

  if (kind === 'quadrilateral') {
    return {
      figureKind: 'quadrilateral',
      title: 'Tứ giác ABCD',
      notation: 'ABCD',
      points: [
        { id: 'A', x: 150, y: 140, label: 'A' },
        { id: 'B', x: 460, y: 155, label: 'B' },
        { id: 'C', x: 500, y: 370, label: 'C' },
        { id: 'D', x: 180, y: 395, label: 'D' }
      ],
      polygon: { id: 'quad', points: ['A', 'B', 'C', 'D'], fill: '#f472b6', opacity: 0.12 },
      overlays: []
    };
  }

  return {
    figureKind: 'triangle',
    title: 'Tam giác ABC',
    notation: 'ABC',
    points: [
      { id: 'A', x: 180, y: 120, label: 'A' },
      { id: 'B', x: 110, y: 390, label: 'B' },
      { id: 'C', x: 470, y: 370, label: 'C' }
    ],
    polygon: { id: 'tri', points: ['A', 'B', 'C'], fill: '#38bdf8', opacity: 0.14 },
    overlays: []
  };
}

function getPointMap(points: PlanePoint[]) {
  return new Map(points.map(point => [point.id, point]));
}

function edgePairs(scene: PlaneScene) {
  const polygon = scene.polygon;
  if (!polygon || polygon.points.length < 2) return [];
  return polygon.points.map((pointId, index) => {
    const next = polygon.points[(index + 1) % polygon.points.length];
    return { id: `${pointId}${next}`, from: pointId, to: next };
  });
}

function findPointById(points: PlanePoint[], pointId?: string) {
  if (!pointId) return undefined;
  return points.find(point => point.id === pointId);
}

function deriveOverlayGeometry(scene: PlaneScene, overlay: PlaneOverlay) {
  const pointMap = getPointMap(scene.points);
  const polygonPoints = scene.polygon?.points.map(pointId => pointMap.get(pointId)).filter(Boolean) as PlanePoint[] | undefined;
  const fromPoint = overlay.from ? pointMap.get(overlay.from) : undefined;
  const toPoint = overlay.to ? pointMap.get(overlay.to) : undefined;

  if (overlay.type === 'segment' && fromPoint && toPoint) {
    return { x1: fromPoint.x, y1: fromPoint.y, x2: toPoint.x, y2: toPoint.y };
  }

  if ((overlay.type === 'segment' || overlay.type === 'parallel' || overlay.type === 'angle' || overlay.type === 'altitude' || overlay.type === 'median' || overlay.type === 'perpendicular') && fromPoint && overlay.to && overlay.to.length === 2 && polygonPoints) {
    const startEdge = edgePairs(scene).find(edge => edge.id === overlay.to);
    if (startEdge) {
      const edgeStart = pointMap.get(startEdge.from);
      const edgeEnd = pointMap.get(startEdge.to);
      if (edgeStart && edgeEnd) {
        if (overlay.type === 'parallel') {
          const direction = normalizeVector(edgeStart, edgeEnd);
          const length = 260;
          return {
            x1: fromPoint.x - direction.x * length,
            y1: fromPoint.y - direction.y * length,
            x2: fromPoint.x + direction.x * length,
            y2: fromPoint.y + direction.y * length
          };
        }

        if (overlay.type === 'segment') {
          const target = midpoint(edgeStart, edgeEnd);
          return { x1: fromPoint.x, y1: fromPoint.y, x2: target.x, y2: target.y };
        }

        if (overlay.type === 'altitude' || overlay.type === 'median' || overlay.type === 'perpendicular') {
          const target = overlay.type === 'median' ? midpoint(edgeStart, edgeEnd) : projectPointToLine(fromPoint, edgeStart, edgeEnd);
          return { x1: fromPoint.x, y1: fromPoint.y, x2: target.x, y2: target.y };
        }
      }
    }
  }

  if ((overlay.type === 'segment' || overlay.type === 'marker') && fromPoint && overlay.to && overlay.to.length === 2) {
    const edge = edgePairs(scene).find(item => item.id === overlay.to);
    if (edge) {
      const edgeStart = pointMap.get(edge.from);
      const edgeEnd = pointMap.get(edge.to);
      if (edgeStart && edgeEnd) {
        const projected = projectPointToLine(fromPoint, edgeStart, edgeEnd);
        if (overlay.type === 'segment') {
          return { x1: fromPoint.x, y1: fromPoint.y, x2: projected.x, y2: projected.y };
        }
        return { x1: projected.x - 8, y1: projected.y - 8, x2: projected.x + 8, y2: projected.y + 8 };
      }
    }
  }

  if (overlay.type === 'angle' && fromPoint) {
    return { x1: fromPoint.x - 12, y1: fromPoint.y - 12, x2: fromPoint.x + 12, y2: fromPoint.y + 12 };
  }

  // Tiếp tuyến (CORE_SPECS §2.2): đường thẳng qua tiếp điểm, vuông góc với bán kính tại tiếp điểm đó.
  if (overlay.type === 'tangent' && fromPoint && scene.circle) {
    const center = pointMap.get(scene.circle.center);
    if (center) {
      const dx = fromPoint.x - center.x;
      const dy = fromPoint.y - center.y;
      const len = Math.hypot(dx, dy) || 1;
      const perpX = -dy / len;
      const perpY = dx / len;
      const halfLength = 150;
      return {
        x1: fromPoint.x - perpX * halfLength,
        y1: fromPoint.y - perpY * halfLength,
        x2: fromPoint.x + perpX * halfLength,
        y2: fromPoint.y + perpY * halfLength
      };
    }
  }

  return null;
}

function boardToSvgPoint(svg: SVGSVGElement, viewport: { x: number; y: number; width: number; height: number }, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  return {
    x: viewport.x + ((clientX - rect.left) / rect.width) * viewport.width,
    y: viewport.y + ((clientY - rect.top) / rect.height) * viewport.height
  };
}

function overlayMidpoint(scene: PlaneScene, overlay: PlaneOverlay) {
  const pointMap = getPointMap(scene.points);
  const fromPoint = overlay.from ? pointMap.get(overlay.from) : undefined;
  if (!fromPoint) return undefined;

  if (overlay.type === 'segment' && overlay.to && overlay.to.length === 1) {
    const toPoint = pointMap.get(overlay.to);
    if (!toPoint) return undefined;
    return midpoint(fromPoint, toPoint);
  }

  if (overlay.to && overlay.to.length === 2) {
    const edge = edgePairs(scene).find(item => item.id === overlay.to);
    if (!edge) return undefined;
    const edgeStart = pointMap.get(edge.from);
    const edgeEnd = pointMap.get(edge.to);
    if (!edgeStart || !edgeEnd) return undefined;
    if (overlay.type === 'parallel') return { x: fromPoint.x, y: fromPoint.y };
    return midpoint(fromPoint, projectPointToLine(fromPoint, edgeStart, edgeEnd));
  }

  return fromPoint;
}

export function BikiHinhHocPhang({ problemText = '' }: BikiHinhHocPhangProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [prompt, setPrompt] = useState(problemText);
  const [commandText, setCommandText] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [analysisError, setAnalysisError] = useState('');
  const [boardTool, setBoardTool] = useState<PlaneTool>('move');
  const [scene, setScene] = useState<PlaneScene>(() => createDefaultScene('triangle'));
  const [lessonSteps, setLessonSteps] = useState<PlaneLessonStep[]>([
    {
      title: 'Bắt đầu',
      body: 'Nhập đề bài hình học phẳng hoặc dùng công cụ nhanh để dựng hình.'
    }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, width: BOARD_WIDTH, height: BOARD_HEIGHT });
  const [isPanning, setIsPanning] = useState(false);
  const [panAnchor, setPanAnchor] = useState<{ clientX: number; clientY: number; viewport: typeof viewport } | null>(null);
  const [dragPointId, setDragPointId] = useState<string | null>(null);

  useEffect(() => {
    setPrompt(problemText);
  }, [problemText]);

  useEffect(() => {
    const normalized = stripVietnamese(prompt).toLowerCase();
    if (!normalized.trim()) return;

    let nextKind: PlaneFigureKind = 'triangle';
    if (normalized.includes('duong tron') || normalized.includes('circle')) nextKind = 'circle';
    else if (normalized.includes('tu giac') || normalized.includes('hinh thang')) nextKind = 'quadrilateral';
    else if (normalized.includes('tam giac')) nextKind = 'triangle';

    setScene(prev => {
      if (prev.figureKind === nextKind) return prev;
      return createDefaultScene(nextKind);
    });
  }, [prompt]);

  const pointMap = useMemo(() => getPointMap(scene.points), [scene.points]);
  const polygonPoints = useMemo(() => {
    if (!scene.polygon) return [] as PlanePoint[];
    return scene.polygon.points.map(pointId => pointMap.get(pointId)).filter(Boolean) as PlanePoint[];
  }, [pointMap, scene.polygon]);

  const circleMetrics = useMemo(() => {
    if (!scene.circle) return null;
    const center = pointMap.get(scene.circle.center);
    const radiusPoint = pointMap.get(scene.circle.radiusPoint);
    if (!center || !radiusPoint) return null;
    const radius = distance(center, radiusPoint);
    return { center, radiusPoint, radius };
  }, [pointMap, scene.circle]);

  const addHistory = (entry: string) => {
    setHistory(prev => [entry, ...prev].slice(0, 8));
  };

  const addLessonStep = (step: PlaneLessonStep) => {
    setLessonSteps(prev => [step, ...prev].slice(0, 8));
  };

  const addOverlay = (overlay: PlaneOverlay, step: PlaneLessonStep, historyLabel: string) => {
    setScene(prev => ({ ...prev, overlays: [...prev.overlays, overlay] }));
    addLessonStep(step);
    addHistory(historyLabel);
    setSelectedPointId(null);
  };

  const handleAiAnalyze = async () => {
    const text = prompt.trim();
    if (!text) {
      setAnalysisStatus('error');
      setAnalysisError('Nhập nguyên văn đề bài trước khi phân tích.');
      return;
    }

    try {
      setAnalysisStatus('loading');
      setAnalysisError('');
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error('Chưa có phiên đăng nhập Supabase.');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/geometry-plane`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ problemText: text })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Soi đề AI thất bại.');
      }

      const data = await res.json() as { success: boolean; result: PlaneAiResult };
      if (!data.result) throw new Error('AI chưa trả về dữ liệu phân tích.');

      const result = data.result;
      const nextScene: PlaneScene = {
        figureKind: result.figureKind || 'unknown',
        title: result.scene?.polygon ? result.title : scene.title,
        notation: result.scene?.polygon ? result.title : scene.notation,
        points: result.scene?.points?.length ? result.scene.points : scene.points,
        polygon: result.scene?.polygon || scene.polygon,
        circle: result.scene?.circle || scene.circle,
        overlays: result.scene?.overlays?.map((overlay, index) => ({
          id: `ai-overlay-${Date.now()}-${index}`,
          type: overlay.type,
          from: overlay.from,
          to: overlay.to,
          at: overlay.at,
          color: overlay.color || '#00f0ff',
          label: overlay.label || '',
          dashed: overlay.dashed
        })) || scene.overlays
      };

      setScene(nextScene);
      setLessonSteps(result.stepByStep.length > 0 ? result.stepByStep : [{ title: 'Soi đề AI', body: result.summary }]);
      addHistory(result.summary || result.title || 'AI phân tích hình học phẳng xong.');
      if (result.commands.length > 0) {
        setCommandText(result.commands[0]);
      }
      setAnalysisStatus('success');
    } catch (error: any) {
      setAnalysisStatus('error');
      setAnalysisError(error.message || 'Không thể gọi AI phân tích hình.');
    }
  };

  const addSegmentByEdge = (fromId: string, edgeId: string, type: PlaneOverlay['type'], label: string) => {
    const edge = edgePairs(scene).find(item => item.id === edgeId);
    const fromPoint = pointMap.get(fromId);
    if (!edge || !fromPoint) return;
    const edgeStart = pointMap.get(edge.from);
    const edgeEnd = pointMap.get(edge.to);
    if (!edgeStart || !edgeEnd) return;

    const overlay: PlaneOverlay = {
      id: `overlay-${Date.now()}`,
      type: type === 'perpendicular' ? 'segment' : type,
      from: fromId,
      to: edgeId,
      color: type === 'parallel' ? '#f59e0b' : '#00f0ff',
      label
    };

    if (type === 'parallel') {
      setScene(prev => ({
        ...prev,
        overlays: [
          ...prev.overlays,
          {
            ...overlay,
            type: 'parallel',
            label: label || 'Song song'
          },
          {
            id: `${overlay.id}-helper`,
            type: 'segment',
            from: fromId,
            to: edgeId,
            color: '#f59e0b',
            label: 'Hướng song song',
            dashed: true
          }
        ]
      }));
      addLessonStep({
        title: 'Dựng đường song song',
        body: `Qua ${fromId} kẻ một đường thẳng song song với cạnh ${edgeId}.`
      });
      addHistory(`${label} qua ${fromId} // ${edgeId}`);
      return;
    }

    const derivedPoint = type === 'median' || type === 'segment'
      ? midpoint(edgeStart, edgeEnd)
      : projectPointToLine(fromPoint, edgeStart, edgeEnd);
    const connectorLabel = type === 'median' ? 'Trung tuyến' : type === 'altitude' ? 'Đường cao' : 'Vuông góc';
    setScene(prev => ({
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
          ...overlay,
          type: type === 'perpendicular' ? 'segment' : type,
          label: connectorLabel,
          dashed: type === 'altitude'
        }
      ]
    }));
    addLessonStep({
      title: connectorLabel,
      body: `Từ ${fromId} kẻ ${connectorLabel.toLowerCase()} xuống cạnh ${edgeId}. Điểm chân được cập nhật ngay trên bảng.`
    });
    addHistory(`${connectorLabel} từ ${fromId} xuống ${edgeId}`);
  };

  const handlePointClick = (pointId: string) => {
    if (boardTool === 'move') {
      setSelectedPointId(pointId);
      return;
    }

    if (boardTool === 'angle-mark') {
      addOverlay(
        {
          id: `overlay-${Date.now()}`,
          type: 'angle',
          at: pointId,
          color: '#22c55e',
          label: 'Đánh dấu góc'
        },
        {
          title: 'Đánh dấu góc',
          body: `Chọn góc tại điểm ${pointId} để nhấn mạnh yếu tố cần chứng minh.`
        },
        `Đánh dấu góc tại ${pointId}`
      );
      return;
    }

    if (boardTool === 'tangent') {
      if (!scene.circle) {
        addHistory('Tiếp tuyến chỉ dựng được trên hình Đường tròn.');
        return;
      }
      addOverlay(
        {
          id: `overlay-${Date.now()}`,
          type: 'tangent',
          from: pointId,
          color: '#a855f7',
          label: 'Tiếp tuyến'
        },
        {
          title: 'Dựng tiếp tuyến',
          body: `Qua tiếp điểm ${pointId} kẻ tiếp tuyến vuông góc với bán kính ${scene.circle.center}${pointId} tại tiếp điểm đó.`
        },
        `Tiếp tuyến tại ${pointId}`
      );
      return;
    }

    if (!selectedPointId) {
      setSelectedPointId(pointId);
      return;
    }

    if (selectedPointId === pointId) {
      setSelectedPointId(null);
      return;
    }

    const first = selectedPointId;
    const overlay: PlaneOverlay = {
      id: `overlay-${Date.now()}`,
      type: 'segment',
      from: first,
      to: pointId,
      color: '#00f0ff',
      label: 'Nối hai đỉnh',
      dashed: false
    };
    setScene(prev => ({ ...prev, overlays: [...prev.overlays, overlay] }));
    addLessonStep({
      title: 'Nối hai điểm',
      body: `Dựng đoạn thẳng ${first}${pointId} để hình rõ quan hệ cần xét.`
    });
    addHistory(`Nối ${first} với ${pointId}`);
    setSelectedPointId(null);
  };

  const handleEdgeClick = (edgeId: string) => {
    if (!selectedPointId) return;
    if (boardTool === 'connect-edge') {
      addSegmentByEdge(selectedPointId, edgeId, 'segment', 'Nối đỉnh với cạnh');
    } else if (boardTool === 'altitude') {
      addSegmentByEdge(selectedPointId, edgeId, 'altitude', 'Đường cao');
    } else if (boardTool === 'median') {
      addSegmentByEdge(selectedPointId, edgeId, 'median', 'Trung tuyến');
    } else if (boardTool === 'perpendicular') {
      addSegmentByEdge(selectedPointId, edgeId, 'perpendicular', 'Vuông góc');
    } else if (boardTool === 'parallel') {
      addSegmentByEdge(selectedPointId, edgeId, 'parallel', 'Song song');
    }
    setSelectedPointId(null);
  };

  const applyCommand = () => {
    const text = commandText.trim();
    if (!text) return;
    const normalized = stripVietnamese(text).toLowerCase();

    const pointMatch = normalized.match(/([a-z])\s*(?:toi|den|vao|voi|sang)\s*([a-z][0-9']?)/i);
    if (normalized.includes('duong cao') && scene.polygon) {
      const apex = findPointById(scene.points, pointMatch?.[1]?.toUpperCase() || scene.points[0]?.id);
      const edge = edgePairs(scene)[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'altitude', `Đường cao từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    if (normalized.includes('trung tuyen') && scene.polygon) {
      const apex = findPointById(scene.points, pointMatch?.[1]?.toUpperCase() || scene.points[0]?.id);
      const edge = edgePairs(scene)[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'median', `Trung tuyến từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    if (normalized.includes('vuong goc') && scene.polygon) {
      const apex = findPointById(scene.points, pointMatch?.[1]?.toUpperCase() || scene.points[0]?.id);
      const edge = edgePairs(scene)[0];
      if (apex && edge) {
        addSegmentByEdge(apex.id, edge.id, 'perpendicular', `Vuông góc từ ${apex.id}`);
        setCommandText('');
        return;
      }
    }

    addHistory(`Lệnh ghi chú: ${text}`);
    addLessonStep({
      title: 'Ghi chú lệnh',
      body: `Chưa tự động hiểu hết lệnh "${text}". AI phân tích sẽ bổ sung cấu trúc chuẩn hơn.`
    });
    setCommandText('');
  };

  const renderOverlay = (overlay: PlaneOverlay) => {
    const geometry = deriveOverlayGeometry(scene, overlay);
    const mid = overlayMidpoint(scene, overlay);
    if (!geometry) return null;

    if (overlay.type === 'angle') {
      return (
        <g key={overlay.id}>
          <circle cx={geometry.x1} cy={geometry.y1} r={14} fill="none" stroke={overlay.color} strokeWidth={2} opacity={0.95} />
          <circle cx={geometry.x1} cy={geometry.y1} r={5} fill={overlay.color} opacity={0.85} />
          {overlay.label ? (
            <text x={geometry.x1 + 16} y={geometry.y1 - 12} fill={overlay.color} fontSize="12" fontWeight="700">
              {overlay.label}
            </text>
          ) : null}
        </g>
      );
    }

    return (
      <g key={overlay.id}>
        <line
          x1={geometry.x1}
          y1={geometry.y1}
          x2={geometry.x2}
          y2={geometry.y2}
          stroke={overlay.color}
          strokeWidth={2.5}
          strokeDasharray={overlay.dashed ? '8 7' : undefined}
          strokeLinecap="round"
        />
        {mid ? (
          <text x={mid.x + 10} y={mid.y - 10} fill={overlay.color} fontSize="11" fontWeight="700">
            {overlay.label}
          </text>
        ) : null}
      </g>
    );
  };

  const handleSvgWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const zoomFactor = event.deltaY > 0 ? 1.08 : 0.92;
    const mousePoint = boardToSvgPoint(svg, viewport, event.clientX, event.clientY);
    setViewport(prev => {
      const nextWidth = clamp(prev.width * zoomFactor, 300, 1600);
      const nextHeight = clamp(prev.height * zoomFactor, 210, 1120);
      const relX = (mousePoint.x - prev.x) / prev.width;
      const relY = (mousePoint.y - prev.y) / prev.height;
      return {
        x: mousePoint.x - relX * nextWidth,
        y: mousePoint.y - relY * nextHeight,
        width: nextWidth,
        height: nextHeight
      };
    });
  };

  const handleSvgPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.target !== event.currentTarget) return;
    setIsPanning(true);
    setPanAnchor({ clientX: event.clientX, clientY: event.clientY, viewport });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSvgPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (dragPointId) {
      const svg = svgRef.current;
      if (!svg) return;
      const nextPoint = boardToSvgPoint(svg, viewport, event.clientX, event.clientY);
      setScene(prev => ({
        ...prev,
        points: prev.points.map(point => (point.id === dragPointId && !point.locked ? { ...point, x: nextPoint.x, y: nextPoint.y } : point))
      }));
      return;
    }

    if (!isPanning || !panAnchor) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = (event.clientX - panAnchor.clientX) / rect.width * panAnchor.viewport.width;
    const dy = (event.clientY - panAnchor.clientY) / rect.height * panAnchor.viewport.height;
    setViewport({
      x: panAnchor.viewport.x - dx,
      y: panAnchor.viewport.y - dy,
      width: panAnchor.viewport.width,
      height: panAnchor.viewport.height
    });
  };

  const handleSvgPointerUp = () => {
    setIsPanning(false);
    setPanAnchor(null);
    setDragPointId(null);
  };

  const currentBadge = scene.figureKind === 'triangle'
    ? { icon: <Triangle className="w-4 h-4" />, label: 'Tam giác' }
    : scene.figureKind === 'quadrilateral'
      ? { icon: <Square className="w-4 h-4" />, label: 'Tứ giác' }
      : scene.figureKind === 'circle'
        ? { icon: <Circle className="w-4 h-4" />, label: 'Đường tròn' }
        : { icon: <Move className="w-4 h-4" />, label: 'Hình học phẳng' };

  const edges = edgePairs(scene);
  const polygonLabelPoint = polygonPoints.length > 0 ? polygonPoints.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 }) : null;

  return (
    <div className="glass-panel rounded-3xl border border-synth-cyan/20 p-5 md:p-6 space-y-5 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.10),transparent_28%)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-synth-cyan" />
            <div>
              <h3 className="font-orbitron font-black uppercase tracking-wider text-sm md:text-base">Phòng Hình Học phẳng</h3>
              <p className="text-xs text-slate-300 mt-1">Dựng hình, kéo thả, kẻ đường cao, trung tuyến và cập nhật lời giải ngay trên bảng.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-100">
            {currentBadge.icon}
            {currentBadge.label}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'move', label: 'Kéo thả', icon: <MousePointer2 className="w-4 h-4" /> },
            { id: 'connect-vertex', label: 'Nối đỉnh-đỉnh', icon: <Plus className="w-4 h-4" /> },
            { id: 'connect-edge', label: 'Nối đỉnh-cạnh', icon: <PenLine className="w-4 h-4" /> },
            { id: 'altitude', label: 'Đường cao', icon: <Ruler className="w-4 h-4" /> },
            { id: 'median', label: 'Trung tuyến', icon: <Square className="w-4 h-4" /> },
            { id: 'perpendicular', label: 'Vuông góc', icon: <Square className="w-4 h-4" /> },
            { id: 'parallel', label: 'Song song', icon: <RefreshCw className="w-4 h-4" /> },
            { id: 'angle-mark', label: 'Đánh dấu góc', icon: <Circle className="w-4 h-4" /> },
            { id: 'tangent', label: 'Tiếp tuyến', icon: <ArrowRight className="w-4 h-4" /> }
          ].map(tool => {
            const isActive = boardTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setBoardTool(tool.id as PlaneTool);
                  setSelectedPointId(null);
                }}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white hover:border-white/20'
                }`}
              >
                {tool.icon}
                {tool.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-5 items-start">
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-synth-gray/20 p-3 md:p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Bảng vẽ hình học phẳng</div>
                <div className="text-sm text-white mt-1">{scene.title}</div>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Zoom / pan / drag</div>
            </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
              className="w-full h-[560px] rounded-2xl border border-white/10 bg-[#07111f] touch-none"
              onWheel={handleSvgWheel}
              onPointerDown={handleSvgPointerDown}
              onPointerMove={handleSvgPointerMove}
              onPointerUp={handleSvgPointerUp}
              onPointerLeave={handleSvgPointerUp}
            >
              <defs>
                <pattern id="plane-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
                </pattern>
                <pattern id="plane-grid-bold" width="120" height="120" patternUnits="userSpaceOnUse">
                  <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1.2" />
                </pattern>
              </defs>

              <rect x={0} y={0} width={BOARD_WIDTH} height={BOARD_HEIGHT} fill="url(#plane-grid)" />
              <rect x={0} y={0} width={BOARD_WIDTH} height={BOARD_HEIGHT} fill="url(#plane-grid-bold)" opacity="0.6" />

              {scene.circle && circleMetrics ? (
                <circle
                  cx={circleMetrics.center.x}
                  cy={circleMetrics.center.y}
                  r={circleMetrics.radius}
                  fill={scene.circle.fill}
                  fillOpacity={scene.circle.opacity}
                  stroke="#7dd3fc"
                  strokeWidth="2.5"
                />
              ) : null}

              {scene.polygon && polygonPoints.length > 1 ? (
                <polygon
                  points={polygonPoints.map(point => `${point.x},${point.y}`).join(' ')}
                  fill={scene.polygon.fill}
                  fillOpacity={scene.polygon.opacity}
                  stroke="#c4b5fd"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              ) : null}

              {edges.map(edge => {
                const start = pointMap.get(edge.from);
                const end = pointMap.get(edge.to);
                if (!start || !end) return null;
                return (
                  <g key={edge.id} onClick={() => handleEdgeClick(edge.id)} className="cursor-crosshair">
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="transparent"
                      strokeWidth={18}
                    />
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth={2}
                      opacity={0.9}
                    />
                  </g>
                );
              })}

              {scene.overlays.map(renderOverlay)}

              {scene.points.map(point => (
                <g key={point.id}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={selectedPointId === point.id ? 10 : 8}
                    fill={point.locked ? '#f59e0b' : '#00f0ff'}
                    fillOpacity={0.96}
                    stroke="#fff"
                    strokeWidth="2"
                    className={boardTool === 'move' && !point.locked ? 'cursor-move' : 'cursor-pointer'}
                    onPointerDown={event => {
                      event.stopPropagation();
                      if (boardTool === 'move' && !point.locked) {
                        setDragPointId(point.id);
                        return;
                      }
                      handlePointClick(point.id);
                    }}
                  />
                  <text x={point.x + 12} y={point.y - 12} fill="#fff" fontSize="14" fontWeight="700">
                    {point.label || point.id}
                  </text>
                </g>
              ))}

              {scene.circle && circleMetrics ? (
                <g>
                  <circle cx={circleMetrics.center.x} cy={circleMetrics.center.y} r={5} fill="#f472b6" />
                  <text x={circleMetrics.center.x + 10} y={circleMetrics.center.y - 10} fill="#f472b6" fontSize="13" fontWeight="700">
                    O
                  </text>
                </g>
              ) : null}

              {polygonLabelPoint && polygonPoints.length > 0 ? (
                <text
                  x={polygonLabelPoint.x / polygonPoints.length + 20}
                  y={polygonLabelPoint.y / polygonPoints.length - 18}
                  fill="rgba(255,255,255,0.55)"
                  fontSize="12"
                  fontWeight="700"
                >
                  {scene.notation}
                </text>
              ) : null}
            </svg>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Đề bài</div>
                <p className="text-sm text-white mt-1">Nhập nguyên văn bài toán rồi bấm soi AI để dựng lời giải và điểm mốc.</p>
              </div>
              <button
                onClick={handleAiAnalyze}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-green px-4 py-2 text-xs font-black uppercase tracking-wider text-black cursor-pointer"
              >
                Soi đề AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={event => setPrompt(event.target.value)}
              placeholder="Ví dụ: Cho tam giác ABC, kẻ đường cao AH..."
              className="w-full min-h-[110px] rounded-2xl border border-white/10 bg-synth-gray/20 p-4 text-sm text-white outline-none focus:border-synth-cyan/40 resize-y"
            />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
              <input
                value={commandText}
                onChange={event => setCommandText(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    applyCommand();
                  }
                }}
                placeholder='Nhập lệnh như "vẽ đường cao từ A", "nối trung điểm BC với đỉnh A"...'
                className="w-full rounded-2xl border border-white/10 bg-synth-gray/20 px-4 py-3 text-sm text-white outline-none focus:border-synth-cyan/40"
              />
              <button
                onClick={applyCommand}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-wider text-white hover:border-synth-cyan/30 cursor-pointer"
              >
                Áp dụng lệnh
              </button>
            </div>

            {analysisStatus === 'error' ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {analysisError}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-synth-gray/20 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lời giải từng bước</div>
                <div className="text-sm text-white mt-1">{analysisStatus === 'loading' ? 'AI đang phân tích...' : 'Tóm tắt hướng làm và thao tác dựng hình.'}</div>
              </div>
              <RefreshCw className="w-4 h-4 text-synth-cyan" />
            </div>
            <div className="space-y-3 max-h-[320px] overflow-auto pr-1">
              {lessonSteps.map((step, index) => (
                <div key={`${step.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-bold">Bước {lessonSteps.length - index}</div>
                  <div className="text-sm font-semibold text-white mt-1">{step.title}</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lịch sử thao tác</div>
            <div className="mt-3 space-y-2">
              {history.length > 0 ? history.map(item => (
                <div key={item} className="rounded-2xl border border-white/10 bg-synth-blue/15 px-3 py-2 text-xs text-slate-200 leading-relaxed">
                  {item}
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-3 py-4 text-xs text-slate-400">
                  Chưa có thao tác nào. Bấm vào điểm hoặc cạnh trên bảng đi.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lưu ý nhanh</div>
            <div className="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>• Chế độ kéo thả chỉ áp dụng với điểm không khóa.</p>
              <p>• Bấm vào cạnh để nối đỉnh với cạnh theo đúng công cụ đang chọn.</p>
              <p>• AI sẽ thay lại hình mẫu nếu đề bài có tam giác, tứ giác hoặc đường tròn.</p>
              <p>• Nếu lệnh chưa hiểu hết, nhập lại đề bài đầy đủ rồi bấm phân tích AI.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
