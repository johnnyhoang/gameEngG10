export type PlaneFigureKind = 'triangle' | 'quadrilateral' | 'circle' | 'mixed' | 'unknown';
export type PlaneTool = 'move' | 'connect-vertex' | 'connect-edge' | 'altitude' | 'median' | 'perpendicular' | 'parallel' | 'angle-mark' | 'tangent';

export interface PlanePoint {
  id: string;
  x: number;
  y: number;
  label?: string;
  locked?: boolean;
  stepIndex?: number;
}

export interface PlanePolygon {
  id: string;
  points: string[];
  fill: string;
  opacity: number;
  stepIndex?: number;
}

export interface PlaneCircleShape {
  center: string;
  radiusPoint: string;
  fill: string;
  opacity: number;
  stepIndex?: number;
}

export interface PlaneOverlay {
  id: string;
  type: 'segment' | 'marker' | 'parallel' | 'angle' | 'altitude' | 'median' | 'perpendicular' | 'tangent';
  from?: string;
  to?: string;
  at?: string;
  color: string;
  label: string;
  dashed?: boolean;
  stepIndex?: number;
}

export interface PlaneLessonStep {
  title: string;
  body: string;
  command?: string;
}

export interface PlaneScene {
  figureKind: PlaneFigureKind;
  title: string;
  notation: string;
  points: PlanePoint[];
  polygon?: PlanePolygon;
  circle?: PlaneCircleShape;
  overlays: PlaneOverlay[];
}

export interface PlaneAiOverlay {
  type: 'segment' | 'marker' | 'parallel' | 'angle';
  from?: string;
  to?: string;
  at?: string;
  color?: string;
  label?: string;
  dashed?: boolean;
  stepIndex?: number;
}

export interface PlaneAiResult {
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

export const BOARD_WIDTH = 800;
export const BOARD_HEIGHT = 560;

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function stripVietnamese(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function distance(a: PlanePoint, b: PlanePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function projectPointToLine(point: PlanePoint, a: PlanePoint, b: PlanePoint) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 === 0) return { x: a.x, y: a.y };
  const t = ((point.x - a.x) * abx + (point.y - a.y) * aby) / len2;
  return { x: a.x + t * abx, y: a.y + t * aby };
}

export function normalizeVector(a: PlanePoint, b: PlanePoint) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

export function createDefaultScene(kind: PlaneFigureKind): PlaneScene {
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

export function getPointMap(points: PlanePoint[]) {
  return new Map(points.map(point => [point.id, point]));
}

export function edgePairs(scene: PlaneScene) {
  const polygon = scene.polygon;
  if (!polygon || polygon.points.length < 2) return [];
  return polygon.points.map((pointId, index) => {
    const next = polygon.points[(index + 1) % polygon.points.length];
    return { id: `${pointId}${next}`, from: pointId, to: next };
  });
}

export function findPointById(points: PlanePoint[], pointId?: string) {
  if (!pointId) return undefined;
  return points.find(point => point.id === pointId);
}

export function deriveOverlayGeometry(scene: PlaneScene, overlay: PlaneOverlay) {
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

export function boardToSvgPoint(svg: SVGSVGElement, viewport: { x: number; y: number; width: number; height: number }, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  return {
    x: viewport.x + ((clientX - rect.left) / rect.width) * viewport.width,
    y: viewport.y + ((clientY - rect.top) / rect.height) * viewport.height
  };
}

export function overlayMidpoint(scene: PlaneScene, overlay: PlaneOverlay) {
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
