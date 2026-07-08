import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Circle, Layers3, Move3D, Pause, Play, RotateCcw, Ruler, Sparkles, Square, Triangle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

type ShapeKind = 'prism' | 'cuboid' | 'pyramid' | 'tetrahedron' | 'cylinder';
type ViewPreset = 'iso' | 'front' | 'top' | 'side';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Vertex extends Point3D {
  id: string;
}

interface Face {
  id: string;
  vertices: string[];
  fill: string;
  opacity: number;
}

interface SceneModel {
  title: string;
  notation: string;
  vertices: Vertex[];
  faces: Face[];
  baseFaceIds: string[];
  apexId?: string;
  autoAnnotations?: OverlayAnnotation[];
}

interface ProjectedFace extends Face {
  points: { x: number; y: number; z: number }[];
  depth: number;
  visible: boolean;
}

interface OverlayAnnotation {
  id: string;
  type: 'line' | 'face' | 'marker' | 'note';
  title: string;
  body: string;
  points?: string[];
  from?: string;
  to?: string;
  at?: string;
  color: string;
  opacity: number;
  dashed?: boolean;
}

interface LessonStep {
  title: string;
  body: string;
  focus?: string[];
  annotationIds: string[];
}

interface CommandHistoryItem {
  id: string;
  text: string;
  summary: string;
  annotations: OverlayAnnotation[];
  steps: LessonStep[];
}

interface AiGeometryAction {
  type: 'drawAltitude' | 'connectVertexToEdge' | 'connectVertexToVertex' | 'highlightFace' | 'markPerpendicular' | 'markParallel' | 'markMidpoint';
  from?: string;
  to?: string;
  face?: string[];
  note?: string;
  style?: 'solid' | 'dashed';
  color?: string;
}

interface AiGeometryResult {
  detectedShape: ShapeKind | 'unknown';
  title: string;
  summary: string;
  assumptions: string[];
  stepByStep: { title: string; body: string }[];
  modelActions: AiGeometryAction[];
  commands: string[];
  warnings: string[];
}

interface Biki3DStudioProps {
  problemText: string;
}

const SHAPE_LABELS: Record<ShapeKind, { label: string; icon: React.ReactNode }> = {
  prism: { label: 'Lăng trụ tam giác', icon: <Layers3 className="w-4 h-4" /> },
  cuboid: { label: 'Hình hộp chữ nhật', icon: <Square className="w-4 h-4" /> },
  pyramid: { label: 'Hình chóp', icon: <Triangle className="w-4 h-4" /> },
  tetrahedron: { label: 'Tứ diện', icon: <Move3D className="w-4 h-4" /> },
  cylinder: { label: 'Hình trụ', icon: <Circle className="w-4 h-4" /> }
};

const VIEW_PRESETS: Record<ViewPreset, { yaw: number; pitch: number; roll: number; zoom: number; panX: number; panY: number }> = {
  iso: { yaw: 32, pitch: -22, roll: 0, zoom: 1, panX: 0, panY: 0 },
  front: { yaw: 0, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 },
  top: { yaw: 0, pitch: -78, roll: 0, zoom: 1, panX: 0, panY: 0 },
  side: { yaw: 90, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 }
};

function stripVietnamese(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function getLabelTokens(text: string) {
  const matches = text.match(/[A-Z](?:[0-9]+|')?/g);
  return matches ? matches.map(item => item.replace(/'/g, '').toUpperCase()) : [];
}

function midpoint(a: Point3D, b: Point3D): Point3D {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 };
}

function centroid(points: Point3D[]) {
  const total = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y, z: acc.z + point.z }),
    { x: 0, y: 0, z: 0 }
  );
  return {
    x: total.x / points.length,
    y: total.y / points.length,
    z: total.z / points.length
  };
}

function rotatePoint(point: Point3D, yaw: number, pitch: number, roll: number) {
  const toRad = Math.PI / 180;
  const cy = Math.cos(yaw * toRad);
  const sy = Math.sin(yaw * toRad);
  const cx = Math.cos(pitch * toRad);
  const sx = Math.sin(pitch * toRad);
  const cz = Math.cos(roll * toRad);
  const sz = Math.sin(roll * toRad);

  const x1 = point.x * cy + point.z * sy;
  const z1 = -point.x * sy + point.z * cy;
  const y1 = point.y;

  const y2 = y1 * cx - z1 * sx;
  const z2 = y1 * sx + z1 * cx;
  const x2 = x1;

  const x3 = x2 * cz - y2 * sz;
  const y3 = x2 * sz + y2 * cz;

  return { x: x3, y: y3, z: z2 };
}

function circlePoint(angleDeg: number, radius: number, z: number): Point3D {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
    z
  };
}

function formatNumber(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/\.00$/, '');
}

interface CylinderEvidence {
  chordLength?: number;
  distanceToChord?: number;
  sectionArea?: number;
}

function extractCylinderEvidence(problemText: string): CylinderEvidence {
  const normalized = stripVietnamese(problemText).toLowerCase();
  const numberPattern = '(\\d+(?:[.,]\\d+)?)';
  const chordMatch = normalized.match(new RegExp(`ab\\s*=\\s*${numberPattern}`));
  const distanceMatch = normalized.match(new RegExp(`(?:tam\\s*o\\s*cach\\s*ab|o\\s*cach\\s*ab|cach\\s*ab)\\s*(?:la\\s*)?${numberPattern}`));
  const areaMatch = normalized.match(new RegExp(`dien tich mat cat(?:\\s*la)?\\s*${numberPattern}`));

  return {
    chordLength: chordMatch ? Number(chordMatch[1].replace(',', '.')) : undefined,
    distanceToChord: distanceMatch ? Number(distanceMatch[1].replace(',', '.')) : undefined,
    sectionArea: areaMatch ? Number(areaMatch[1].replace(',', '.')) : undefined
  };
}

function buildCylinderShape(evidence?: CylinderEvidence): SceneModel {
  const topRing = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * 360;
    const point = circlePoint(angle, 1, 1.2);
    return { id: `T${index + 1}`, ...point };
  });
  const bottomRing = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * 360;
    const point = circlePoint(angle, 1, -1.2);
    return { id: `B${index + 1}`, ...point };
  });

  const sectionTopLeft = { id: 'A', ...circlePoint(143.13010235415598, 1, 1.2) };
  const sectionTopRight = { id: 'B', ...circlePoint(36.86989764584402, 1, 1.2) };
  const sectionBottomRight = { id: 'C', ...circlePoint(36.86989764584402, 1, -1.2) };
  const sectionBottomLeft = { id: 'D', ...circlePoint(143.13010235415598, 1, -1.2) };
  const center = { id: 'O', x: 0, y: 0, z: 1.2 };
  const midpoint = { id: 'M', x: 0, y: 0.6, z: 1.2 };
  const axisBottom = { id: 'O1', x: 0, y: 0, z: -1.2 };

  const sectionAreaText = evidence?.sectionArea ? `${formatNumber(evidence.sectionArea)} cm²` : 'diện tích mặt cắt';
  const chordText = evidence?.chordLength ? `AB = ${formatNumber(evidence.chordLength)} cm` : 'AB';
  const distanceText = evidence?.distanceToChord ? `d(O,AB) = ${formatNumber(evidence.distanceToChord)} cm` : 'OM';

  return {
    title: 'Hình trụ có mặt cắt ABCD song song với trục',
    notation: 'hình trụ',
    vertices: [
      ...topRing,
      ...bottomRing,
      sectionTopLeft,
      sectionTopRight,
      sectionBottomRight,
      sectionBottomLeft,
      center,
      midpoint,
      axisBottom
    ],
    faces: [
      { id: 'base', vertices: ['A', 'B', 'C', 'D'], fill: '#38bdf8', opacity: 0.26 },
      { id: 'top', vertices: topRing.map(point => point.id), fill: '#38bdf8', opacity: 0.14 },
      { id: 'bottom', vertices: bottomRing.map(point => point.id), fill: '#fb7185', opacity: 0.1 },
      ...topRing.map((point, index) => {
        const next = topRing[(index + 1) % topRing.length];
        const bottom = bottomRing[index];
        const bottomNext = bottomRing[(index + 1) % bottomRing.length];
        return {
          id: `side-${index + 1}`,
          vertices: [point.id, next.id, bottomNext.id, bottom.id],
          fill: '#8b5cf6',
          opacity: 0.12
        };
      })
    ],
    baseFaceIds: ['A', 'B', 'C', 'D'],
    autoAnnotations: [
      {
        id: 'guide-ab',
        type: 'line',
        title: chordText,
        body: 'Dây cung AB là cạnh trên của mặt cắt chữ nhật ABCD.',
        from: 'A',
        to: 'B',
        color: '#00f0ff',
        opacity: 1
      },
      {
        id: 'guide-om',
        type: 'line',
        title: distanceText,
        body: 'Đoạn OM vuông góc với AB và biểu diễn khoảng cách từ tâm O đến dây AB.',
        from: 'O',
        to: 'M',
        color: '#f59e0b',
        opacity: 1,
        dashed: true
      },
      {
        id: 'guide-center',
        type: 'marker',
        title: 'Tâm O',
        body: 'Tâm của đáy tròn và đầu mút của trục đối xứng.',
        at: 'O',
        color: '#ffffff',
        opacity: 1
      },
      {
        id: 'guide-section',
        type: 'face',
        title: sectionAreaText,
        body: 'Mặt cắt ABCD là hình chữ nhật sinh ra bởi mặt phẳng song song với trục.',
        points: ['A', 'B', 'C', 'D'],
        color: '#22c55e',
        opacity: 0.22
      }
    ]
  };
}

function buildShape(kind: ShapeKind, evidence?: CylinderEvidence): SceneModel {
  if (kind === 'cylinder') {
    return buildCylinderShape(evidence);
  }

  if (kind === 'cuboid') {
    const vertices: Vertex[] = [
      { id: 'A', x: -1.25, y: -0.75, z: -1 },
      { id: 'B', x: 1.25, y: -0.75, z: -1 },
      { id: 'C', x: 1.25, y: 0.75, z: -1 },
      { id: 'D', x: -1.25, y: 0.75, z: -1 },
      { id: 'A1', x: -1.25, y: -0.75, z: 1 },
      { id: 'B1', x: 1.25, y: -0.75, z: 1 },
      { id: 'C1', x: 1.25, y: 0.75, z: 1 },
      { id: 'D1', x: -1.25, y: 0.75, z: 1 }
    ];
    return {
      title: 'Hình hộp chữ nhật ABCD.A1B1C1D1',
      notation: 'ABCD.A1B1C1D1',
      vertices,
      faces: [
        { id: 'base', vertices: ['A', 'B', 'C', 'D'], fill: '#38bdf8', opacity: 0.18 },
        { id: 'top', vertices: ['A1', 'B1', 'C1', 'D1'], fill: '#fb7185', opacity: 0.2 },
        { id: 'side1', vertices: ['A', 'B', 'B1', 'A1'], fill: '#f472b6', opacity: 0.18 },
        { id: 'side2', vertices: ['B', 'C', 'C1', 'B1'], fill: '#f59e0b', opacity: 0.16 },
        { id: 'side3', vertices: ['C', 'D', 'D1', 'C1'], fill: '#22c55e', opacity: 0.16 },
        { id: 'side4', vertices: ['D', 'A', 'A1', 'D1'], fill: '#8b5cf6', opacity: 0.16 }
      ],
      baseFaceIds: ['A', 'B', 'C', 'D']
    };
  }

  if (kind === 'prism') {
    const vertices: Vertex[] = [
      { id: 'A', x: -1.2, y: -0.8, z: -1 },
      { id: 'B', x: 1.2, y: -0.8, z: -1 },
      { id: 'C', x: 0, y: 0.95, z: -1 },
      { id: 'A1', x: -1.2, y: -0.8, z: 1 },
      { id: 'B1', x: 1.2, y: -0.8, z: 1 },
      { id: 'C1', x: 0, y: 0.95, z: 1 }
    ];
    return {
      title: 'Lăng trụ tam giác ABC.A1B1C1',
      notation: 'ABC.A1B1C1',
      vertices,
      faces: [
        { id: 'base', vertices: ['A', 'B', 'C'], fill: '#38bdf8', opacity: 0.2 },
        { id: 'top', vertices: ['A1', 'B1', 'C1'], fill: '#fb7185', opacity: 0.2 },
        { id: 'side1', vertices: ['A', 'B', 'B1', 'A1'], fill: '#f472b6', opacity: 0.16 },
        { id: 'side2', vertices: ['B', 'C', 'C1', 'B1'], fill: '#f59e0b', opacity: 0.16 },
        { id: 'side3', vertices: ['C', 'A', 'A1', 'C1'], fill: '#22c55e', opacity: 0.16 }
      ],
      baseFaceIds: ['A', 'B', 'C']
    };
  }

  if (kind === 'tetrahedron') {
    const vertices: Vertex[] = [
      { id: 'A', x: 0, y: 1.15, z: 1.05 },
      { id: 'B', x: -1.15, y: -0.9, z: -1 },
      { id: 'C', x: 1.15, y: -0.9, z: -1 },
      { id: 'D', x: 0, y: 1.05, z: -0.2 }
    ];
    return {
      title: 'Tứ diện ABCD',
      notation: 'ABCD',
      vertices,
      faces: [
        { id: 'face1', vertices: ['A', 'B', 'C'], fill: '#38bdf8', opacity: 0.2 },
        { id: 'face2', vertices: ['A', 'B', 'D'], fill: '#f472b6', opacity: 0.18 },
        { id: 'face3', vertices: ['A', 'C', 'D'], fill: '#f59e0b', opacity: 0.18 },
        { id: 'face4', vertices: ['B', 'C', 'D'], fill: '#22c55e', opacity: 0.18 }
      ],
      baseFaceIds: ['B', 'C', 'D'],
      apexId: 'A'
    };
  }

  const vertices: Vertex[] = [
    { id: 'A', x: -1.25, y: -0.8, z: -1 },
    { id: 'B', x: 1.25, y: -0.8, z: -1 },
    { id: 'C', x: 1.25, y: 0.8, z: -1 },
    { id: 'D', x: -1.25, y: 0.8, z: -1 },
    { id: 'S', x: 0, y: 0.15, z: 1.35 }
  ];
  return {
    title: 'Hình chóp S.ABCD',
    notation: 'S.ABCD',
    vertices,
    faces: [
      { id: 'base', vertices: ['A', 'B', 'C', 'D'], fill: '#38bdf8', opacity: 0.2 },
      { id: 'side1', vertices: ['S', 'A', 'B'], fill: '#f472b6', opacity: 0.18 },
      { id: 'side2', vertices: ['S', 'B', 'C'], fill: '#f59e0b', opacity: 0.16 },
      { id: 'side3', vertices: ['S', 'C', 'D'], fill: '#22c55e', opacity: 0.16 },
      { id: 'side4', vertices: ['S', 'D', 'A'], fill: '#8b5cf6', opacity: 0.16 }
    ],
    baseFaceIds: ['A', 'B', 'C', 'D'],
    apexId: 'S'
  };
}

function detectShape(problemText: string): ShapeKind | null {
  const normalized = stripVietnamese(problemText).toLowerCase();
  if (!normalized.trim()) return null;
  if (normalized.includes('hinh tru') || normalized.includes('mat cat song song voi truc') || (normalized.includes('mat cat') && normalized.includes('truc'))) return 'cylinder';
  if (normalized.includes('tu dien')) return 'tetrahedron';
  if (normalized.includes('hinh hop') || normalized.includes('hop chu nhat')) return 'cuboid';
  if (normalized.includes('lang tru')) return 'prism';
  if (normalized.includes('hinh chop')) return 'pyramid';
  return null;
}

function getVertexMap(model: SceneModel) {
  return new Map(model.vertices.map(vertex => [vertex.id, vertex]));
}

function pickBaseFace(model: SceneModel) {
  return model.faces.find(face => face.id === 'base') ?? model.faces[0];
}

function normalizeVertexId(value: string) {
  return value.replace(/'/g, '').trim().toUpperCase();
}

function resolvePointReference(reference: string, model: SceneModel, vertexMap: Map<string, Vertex>) {
  const clean = normalizeVertexId(reference);
  if (vertexMap.has(clean)) {
    return vertexMap.get(clean)!;
  }

  const cleanNoSeparators = clean.replace(/[^A-Z0-9]/g, '');
  if (!cleanNoSeparators) return null;

  if (clean.startsWith('EDGE:')) {
    const edge = clean.slice(5);
    if (edge.length >= 2) {
      const start = vertexMap.get(edge[0]);
      const end = vertexMap.get(edge[1]);
      if (start && end) return { id: `MID-${edge}`, ...midpoint(start, end) };
    }
  }

  if (clean.startsWith('FACE:')) {
    const faceKey = clean.slice(5);
    const faceVertices = faceKey.split('').map(letter => vertexMap.get(letter)).filter(Boolean) as Vertex[];
    if (faceVertices.length >= 3) return { id: `CTR-${faceKey}`, ...centroid(faceVertices) };
  }

  if (cleanNoSeparators.length === 2) {
    const start = vertexMap.get(cleanNoSeparators[0]);
    const end = vertexMap.get(cleanNoSeparators[1]);
    if (start && end) return { id: `MID-${cleanNoSeparators}`, ...midpoint(start, end) };
  }

  if (cleanNoSeparators.length >= 3) {
    const faceVertices = cleanNoSeparators.split('').map(letter => vertexMap.get(letter)).filter(Boolean) as Vertex[];
    if (faceVertices.length >= 3) return { id: `CTR-${cleanNoSeparators}`, ...centroid(faceVertices) };
  }

  const base = pickBaseFace(model);
  if (clean === 'BASE' || clean === 'ABCD' || clean === 'ABC') {
    const faceVertices = base.vertices.map(id => vertexMap.get(id)).filter(Boolean) as Vertex[];
    if (faceVertices.length >= 3) return { id: `CTR-${clean}`, ...centroid(faceVertices) };
  }

  return null;
}

function parseCommand(text: string, model: SceneModel, annotationIndex: number) {
  const normalized = stripVietnamese(text).toLowerCase().replace(/\s+/g, ' ').trim();
  const tokens = getLabelTokens(text);
  const vertexMap = getVertexMap(model);
  const annotations: OverlayAnnotation[] = [];
  const steps: LessonStep[] = [];
  const baseFace = pickBaseFace(model);
  const baseVertices = baseFace.vertices.map(id => vertexMap.get(id)).filter(Boolean) as Vertex[];
  const apexId = model.apexId ?? (model.vertices.find(v => !baseFace.vertices.includes(v.id))?.id ?? model.vertices[0]?.id);

  const addLine = (from: string, to: string, title: string, body: string, color: string, dashed = false) => {
    const id = `anno-${annotationIndex + annotations.length + 1}`;
    annotations.push({
      id,
      type: 'line',
      title,
      body,
      from,
      to,
      color,
      opacity: 1,
      dashed
    });
    return id;
  };

  const addFace = (points: string[], title: string, body: string, color: string, opacity = 0.28) => {
    const id = `anno-${annotationIndex + annotations.length + 1}`;
    annotations.push({
      id,
      type: 'face',
      title,
      body,
      points,
      color,
      opacity
    });
    return id;
  };

  const addMarker = (at: string, title: string, body: string, color: string) => {
    const id = `anno-${annotationIndex + annotations.length + 1}`;
    annotations.push({
      id,
      type: 'marker',
      title,
      body,
      at,
      color,
      opacity: 1
    });
    return id;
  };

  let summary = 'Chưa nhận ra lệnh đặc biệt. Đã giữ nguyên mô hình hiện tại để học sinh xem lại hình gốc.';

  if (normalized.includes('duong cao')) {
    const fromMatch = text.match(/(?:tu|cua)\s+([A-Z](?:[0-9]+|')?)/);
    const apex = (fromMatch?.[1] ?? apexId ?? 'S').replace(/'/g, '').toUpperCase();
    const foot = centroid(baseVertices);
    const footId = `H${annotationIndex}`;
    const footVertex: Vertex = { id: footId, ...foot };
    vertexMap.set(footId, footVertex);
    annotations.push({
      id: `anno-${annotationIndex + 1}`,
      type: 'line',
      title: `Đường cao từ ${apex}`,
      body: `Kẻ đoạn vuông góc từ ${apex} xuống mặt đáy tại H để xác định chiều cao của khối.`,
      from: apex,
      to: footId,
      color: '#00f0ff',
      opacity: 1
    });
    annotations.push({
      id: `anno-${annotationIndex + 2}`,
      type: 'marker',
      title: 'Chân đường cao',
      body: 'Đánh dấu góc vuông tại chân đường cao để thể hiện quan hệ vuông góc với mặt đáy.',
      at: footId,
      color: '#ffffff',
      opacity: 1
    });
    summary = `Đã dựng đường cao từ ${apex} xuống mặt đáy và đánh dấu chân vuông góc.`;
  } else if (normalized.includes('trung diem')) {
    const pairMatch = text.match(/trung diem\s+([A-Z]{2})\s+voi\s+dinh\s+([A-Z](?:[0-9]+|')?)/i) || text.match(/trung diem\s+([A-Z]{2})\s+v?i?\s+dinh\s+([A-Z](?:[0-9]+|')?)/i);
    const edge = (pairMatch?.[1] ?? tokens[0] ?? 'BC').replace(/'/g, '').toUpperCase();
    const apex = (pairMatch?.[2] ?? tokens[1] ?? apexId ?? 'S').replace(/'/g, '').toUpperCase();
    const start = vertexMap.get(edge[0]);
    const end = vertexMap.get(edge[1]);
    if (start && end) {
      const mid = midpoint(start, end);
      const midId = `M${annotationIndex}`;
      const midVertex: Vertex = { id: midId, ...mid };
      vertexMap.set(midId, midVertex);
      const lineId = addLine(apex, midId, `Nối trung điểm ${edge} với đỉnh ${apex}`, `Dựng đoạn nối từ ${apex} đến trung điểm của ${edge}.`, '#f59e0b');
      addMarker(midId, 'Trung điểm', `Đánh dấu trung điểm của đoạn ${edge}.`, '#ffffff');
      summary = `Đã nối đỉnh ${apex} với trung điểm của ${edge}.`;
      steps.push({
        title: 'Dựng trung điểm',
        body: `Xác định trung điểm của cạnh ${edge}, sau đó nối điểm đó với đỉnh ${apex}. Cách trình bày này thường dùng để dựng mặt phẳng hoặc chứng minh song song.`,
        focus: [apex, edge, 'trung điểm'],
        annotationIds: [lineId]
      });
    }
  } else if (normalized.includes('mat phang qua')) {
    const points = tokens.slice(0, 3);
    if (points.length >= 3) {
      const faceId = addFace(points, `Mặt phẳng qua ${points.join(', ')}`, `Tô nổi mặt phẳng đi qua ba điểm ${points.join(', ')} để học sinh dễ theo dõi mặt đang xét.`, '#22c55e', 0.32);
      summary = `Đã làm nổi mặt phẳng đi qua ${points.join(', ')}.`;
      steps.push({
        title: 'Chọn mặt phẳng',
        body: `Khoanh vùng mặt phẳng qua ${points.join(', ')} để không lẫn với các mặt còn lại của khối.`,
        focus: points,
        annotationIds: [faceId]
      });
    }
  } else if (normalized.includes('to mau mat')) {
    const points = tokens.slice(0, 4);
    if (points.length >= 3) {
      const faceId = addFace(points, `Tô màu mặt ${points.join('')}`, `Tô màu mặt ${points.join('')} để nhấn vùng đang sử dụng trong lời giải.`, '#fb7185', 0.38);
      summary = `Đã tô màu mặt ${points.join('')}.`;
      steps.push({
        title: 'Nhấn mặt cần dùng',
        body: `Mặt ${points.join('')} được tô nổi để làm rõ dữ kiện và tránh nhầm với các mặt khuất.`,
        focus: points,
        annotationIds: [faceId]
      });
    }
  } else if (normalized.includes('vuong goc')) {
    const point = tokens[0] ?? apexId ?? 'H';
    const markerId = addMarker(point, 'Vuông góc', 'Gắn ký hiệu vuông góc tại điểm cần chứng minh.', '#ffffff');
    summary = `Đã gắn ký hiệu vuông góc tại ${point}.`;
    steps.push({
      title: 'Gắn điều kiện vuông góc',
      body: `Khi trình bày, ghi rõ đoạn hoặc đường thẳng vuông góc tại điểm ${point}, rồi mới suy luận theo định lý phù hợp.`,
      focus: [point],
      annotationIds: [markerId]
    });
  } else if (normalized.includes('song song')) {
    const points = tokens.slice(0, 2);
    const markerId = addMarker(points[0] ?? 'A', 'Song song', 'Gắn ký hiệu song song để nhắc học sinh dùng tính chất hai đường thẳng song song.', '#22c55e');
    summary = 'Đã gắn ký hiệu song song để hỗ trợ chứng minh.';
    steps.push({
      title: 'Nhắc điều kiện song song',
      body: `Nếu cần chứng minh song song, hãy kiểm tra các cặp cạnh tương ứng, trung điểm, hoặc các đường cùng vuông góc với một mặt phẳng.`,
      focus: points,
      annotationIds: [markerId]
    });
  } else if (normalized.trim()) {
    const markerId = addMarker(apexId ?? 'S', 'Ghi chú', 'Lệnh được giữ dưới dạng ghi chú để học sinh không mất tiến trình.', '#f8fafc');
    summary = 'Lệnh chưa khớp mẫu, nhưng mô hình vẫn được giữ nguyên và ghi chú đã được lưu.';
    steps.push({
      title: 'Xử lý lệnh tự do',
      body: `Lệnh "${text}" chưa khớp vào mẫu dựng hình chuyên biệt. Mô hình vẫn giữ trạng thái hiện tại và ghi chú này có thể dùng làm yêu cầu bổ sung cho công cụ AI sau này.`,
      focus: [],
      annotationIds: [markerId]
    });
  }

  return { summary, annotations, steps };
}

function buildAnnotationsFromAiResult(result: AiGeometryResult, model: SceneModel, annotationStartIndex: number) {
  const vertexMap = getVertexMap(model);
  const annotations: OverlayAnnotation[] = [];
  const steps: LessonStep[] = [];
  const generatedIds: string[] = [];

  const addAnnotation = (annotation: Omit<OverlayAnnotation, 'id'>) => {
    const id = `ai-${annotationStartIndex + annotations.length + 1}`;
    annotations.push({ id, ...annotation });
    generatedIds.push(id);
    return id;
  };

  (result.stepByStep || []).forEach(step => {
    steps.push({
      title: step.title,
      body: step.body,
      focus: [],
      annotationIds: generatedIds
    });
  });

  (result.modelActions || []).forEach(action => {
    const color = action.color || '#00f0ff';
    const dashed = action.style === 'dashed';

    if (action.type === 'highlightFace' && action.face && action.face.length >= 3) {
      addAnnotation({
        type: 'face',
        title: action.note || 'Nhấn mặt phẳng',
        body: action.note || 'Làm nổi mặt phẳng cần dùng trong lời giải.',
        points: action.face,
        color,
        opacity: 0.32
      });
      return;
    }

    if (action.type === 'connectVertexToVertex' && action.from && action.to) {
      addAnnotation({
        type: 'line',
        title: action.note || `${action.from} - ${action.to}`,
        body: action.note || 'Nối hai đỉnh theo yêu cầu đề bài.',
        from: normalizeVertexId(action.from),
        to: normalizeVertexId(action.to),
        color,
        opacity: 1,
        dashed
      });
      return;
    }

    if (action.type === 'connectVertexToEdge' && action.from && action.to) {
      const edgeId = normalizeVertexId(action.to);
      const edgePoint = resolvePointReference(edgeId, model, vertexMap);
      if (edgePoint) {
        const tempKey = edgeId.length >= 2 ? edgeId.slice(0, 2) : edgeId;
        addAnnotation({
          type: 'line',
          title: action.note || `Nối ${action.from} với cạnh ${tempKey}`,
          body: action.note || 'Nối một đỉnh với trung điểm của cạnh.',
          from: normalizeVertexId(action.from),
          to: `EDGE:${tempKey}`,
          color,
          opacity: 1,
          dashed
        });
      }
      return;
    }

    if (action.type === 'drawAltitude' && action.from) {
      const apex = normalizeVertexId(action.from);
      const baseFace = action.face && action.face.length >= 3 ? action.face.map(normalizeVertexId) : pickBaseFace(model).vertices;
      addAnnotation({
        type: 'line',
        title: action.note || `Đường cao từ ${apex}`,
        body: action.note || 'Kẻ đường cao từ đỉnh xuống mặt đáy.',
        from: apex,
        to: `FACE:${baseFace.join('')}`,
        color,
        opacity: 1,
        dashed: true
      });
      addAnnotation({
        type: 'marker',
        title: 'Chân đường cao',
        body: 'Đánh dấu chân đường cao trên mặt đáy.',
        at: `FACE:${baseFace.join('')}`,
        color: '#ffffff',
        opacity: 1
      });
      return;
    }

    if (action.type === 'markPerpendicular' || action.type === 'markParallel' || action.type === 'markMidpoint') {
      const ref = action.from || action.to || (action.face?.[0] ?? '');
      if (!ref) return;
      addAnnotation({
        type: 'marker',
        title: action.note || (action.type === 'markPerpendicular' ? 'Vuông góc' : action.type === 'markParallel' ? 'Song song' : 'Trung điểm'),
        body: action.note || 'Ký hiệu hình học cần thiết.',
        at: action.type === 'markMidpoint' && action.to ? action.to : ref,
        color,
        opacity: 1,
        dashed
      });
    }
  });

  return { annotations, steps };
}

function buildBaseSteps(shape: ShapeKind, model: SceneModel, problemText: string): LessonStep[] {
  const labels = SHAPE_LABELS[shape];
  const detected = problemText.trim()
    ? `Đề bài đã được nhận dạng theo dạng ${labels.label.toLowerCase()}.`
    : 'Chưa có đề bài; công cụ đang ở chế độ mẫu để học sinh quan sát cấu trúc hình.';

  if (shape === 'cylinder') {
    const evidence = extractCylinderEvidence(problemText);
    const hasExactData = Boolean(evidence.chordLength && evidence.distanceToChord && evidence.sectionArea);
    const chordText = evidence.chordLength ? `AB = ${formatNumber(evidence.chordLength)} cm` : 'AB';
    const distanceText = evidence.distanceToChord ? `OM = ${formatNumber(evidence.distanceToChord)} cm` : 'OM';
    const areaText = evidence.sectionArea ? `S = ${formatNumber(evidence.sectionArea)} cm²` : 'S';
    const height = evidence.chordLength && evidence.sectionArea ? evidence.sectionArea / evidence.chordLength : undefined;
    const radius = evidence.chordLength && evidence.distanceToChord
      ? Math.sqrt((evidence.chordLength / 2) ** 2 + evidence.distanceToChord ** 2)
      : undefined;
    const lateralArea = radius && height ? 2 * Math.PI * radius * height : undefined;
    const volume = radius && height ? Math.PI * radius * radius * height : undefined;

    return [
      {
        title: 'Nhận dạng hình trụ',
        body: `Đây là hình trụ có mặt cắt ABCD song song với trục. ${detected}`,
        focus: ['A', 'B', 'C', 'D', 'O', 'M'],
        annotationIds: ['guide-ab', 'guide-om', 'guide-center', 'guide-section']
      },
      {
        title: 'Đọc dữ kiện hình',
        body: hasExactData
          ? `Mặt cắt là hình chữ nhật nên ${chordText}, ${distanceText}, ${areaText}.`
          : 'Mặt cắt là hình chữ nhật; cần xác định AB là dây cung trên đáy, OM là khoảng cách từ tâm đến dây và diện tích mặt cắt để suy ra các kích thước còn lại.',
        focus: ['A', 'B', 'C', 'D', 'O', 'M'],
        annotationIds: ['guide-section', 'guide-ab', 'guide-om']
      },
      {
        title: 'Tính bán kính và chiều cao',
        body: hasExactData && radius && height
          ? `Từ ${chordText} và khoảng cách ${distanceText}, suy ra r = √((AB/2)^2 + OM^2) = ${formatNumber(radius)} cm. Đồng thời h = S / AB = ${formatNumber(height)} cm.`
          : 'Từ dây cung AB và khoảng cách từ tâm đến AB, dùng công thức r² = (AB/2)² + OM². Chiều cao h lấy bằng diện tích mặt cắt chia cho AB.',
        focus: ['O', 'M', 'A', 'B'],
        annotationIds: ['guide-om', 'guide-ab']
      },
      {
        title: 'Diện tích xung quanh và thể tích',
        body: hasExactData && lateralArea && volume
          ? `Dùng lệnh công thức: Sxq = 2πrh = ${formatNumber(lateralArea)} cm² và V = πr²h = ${formatNumber(volume)} cm³.`
          : 'Sau khi có r và h, tính diện tích xung quanh theo Sxq = 2πrh và thể tích theo V = πr²h.',
        focus: ['O', 'M'],
        annotationIds: ['guide-om']
      }
    ];
  }

  const baseSteps: LessonStep[] = [
    {
      title: 'Nhận dạng hình',
      body: `Xác định đây là ${model.title}. ${detected}`,
      focus: model.vertices.map(v => v.id),
      annotationIds: [model.faces[0]?.id ?? '']
    },
    {
      title: 'Chọn dữ kiện',
      body: 'Đọc đúng giả thiết, điểm đặc biệt, quan hệ vuông góc hoặc song song. Từ đó quyết định sẽ dựng thêm đường phụ nào.',
      focus: model.baseFaceIds,
      annotationIds: []
    },
    {
      title: 'Trình bày',
      body: 'Viết theo trật tự: giả thiết, dựng hình, lập luận, kết luận. Trong bài hình 9, cần nêu rõ vì sao một đoạn thẳng là đường cao, trung điểm hoặc đoạn song song.',
      focus: [],
      annotationIds: []
    }
  ];

  return baseSteps;
}

function unionEdges(faces: Face[]) {
  const map = new Map<string, { from: string; to: string; faces: string[] }>();
  faces.forEach(face => {
    for (let i = 0; i < face.vertices.length; i += 1) {
      const from = face.vertices[i];
      const to = face.vertices[(i + 1) % face.vertices.length];
      const key = [from, to].sort().join('-');
      const existing = map.get(key);
      if (existing) {
        existing.faces.push(face.id);
      } else {
        map.set(key, { from, to, faces: [face.id] });
      }
    }
  });
  return [...map.values()];
}

export function parse3DProblemText(text: string, currentShape: ShapeKind): { detectedShape: ShapeKind; annotations: OverlayAnnotation[]; steps: LessonStep[] } {
  const normalized = stripVietnamese(text).toLowerCase();

  // 1. Detect shape
  let detectedShape = currentShape;
  if (normalized.includes('hinh hop') || normalized.includes('cuboid') || normalized.includes('hinh hop chu nhat')) {
    detectedShape = 'cuboid';
  } else if (normalized.includes('hinh chop') || normalized.includes('pyramid') || normalized.includes('chop tam giac') || normalized.includes('chop tu giac')) {
    detectedShape = 'pyramid';
  } else if (normalized.includes('tu dien') || normalized.includes('tetrahedron')) {
    detectedShape = 'tetrahedron';
  } else if (normalized.includes('lang tru') || normalized.includes('prism')) {
    detectedShape = 'prism';
  } else if (normalized.includes('hinh tru') || normalized.includes('cylinder')) {
    detectedShape = 'cylinder';
  }

  const annotations: OverlayAnnotation[] = [];
  const steps: LessonStep[] = [
    {
      title: 'Dựng hình cơ sở',
      body: `Vẽ hình không gian (${SHAPE_LABELS[detectedShape]?.label || detectedShape}) làm nền tảng.`,
      annotationIds: []
    }
  ];

  const sentences = text.split(/[.,;\n]/);
  sentences.forEach((sentence) => {
    const sNorm = stripVietnamese(sentence).toLowerCase();
    if (!sNorm.trim()) return;

    // Check for drawing altitude (đường cao từ S xuống mặt đáy, hoặc AH...)
    const altMatch = sNorm.match(/(?:duong cao|chieu cao|ke|ve)\s*([a-z])([a-z])\s*(?:vuong goc|xuong|\(|den)/i);
    if (altMatch) {
      const from = altMatch[1].toUpperCase();
      const to = altMatch[2].toUpperCase();
      const annoId = `alt-${Date.now()}-${annotations.length}`;
      annotations.push({
        id: annoId,
        type: 'line',
        title: `Đường cao ${from}${to}`,
        body: `Kẻ đường cao ${from}${to} vuông góc với đáy.`,
        from,
        to: `FACE:ABCD`,
        color: '#f43f5e',
        opacity: 1,
        dashed: true
      });
      steps.push({
        title: `Kẻ đường cao ${from}${to}`,
        body: `Từ đỉnh ${from}, kẻ đường cao ${from}${to} vuông góc với mặt đáy.`,
        annotationIds: [annoId]
      });
      return;
    }

    // Check for connecting two vertices
    const connMatch = sNorm.match(/(?:noi|ve doan thail)\s*([a-z])\s*(?:den|voi|va)\s*([a-z])/i) || sNorm.match(/(?:ke|ve)\s*([a-z])([a-z])/i);
    if (connMatch) {
      const from = connMatch[1].toUpperCase();
      const to = connMatch[2].toUpperCase();
      const annoId = `conn-${Date.now()}-${annotations.length}`;
      annotations.push({
        id: annoId,
        type: 'line',
        title: `Nối ${from}${to}`,
        body: `Nối ${from} với ${to} theo đề bài.`,
        from,
        to,
        color: '#10b981',
        opacity: 1
      });
      steps.push({
        title: `Nối ${from} với ${to}`,
        body: `Vẽ đoạn thẳng nối đỉnh ${from} và đỉnh ${to}.`,
        annotationIds: [annoId]
      });
      return;
    }

    // Highlight face
    if (sNorm.includes('mat phang') || sNorm.includes('mat ben') || sNorm.includes('mat day')) {
      const pts = getLabelTokens(sentence);
      if (pts.length >= 3) {
        const annoId = `face-${Date.now()}-${annotations.length}`;
        annotations.push({
          id: annoId,
          type: 'face',
          title: `Mặt phẳng ${pts.join('')}`,
          body: `Nhấn mạnh mặt phẳng ${pts.join('')}.`,
          points: pts,
          color: '#3b82f6',
          opacity: 0.25
        });
        steps.push({
          title: `Xét mặt phẳng ${pts.join('')}`,
          body: `Làm nổi bật mặt phẳng ${pts.join('')} để phục vụ chứng minh hoặc tính toán.`,
          annotationIds: [annoId]
        });
      }
    }
  });

  return { detectedShape, annotations, steps };
}

export function Biki3DStudio({ problemText }: Biki3DStudioProps) {
  const detectedShape = detectShape(problemText);
  const cylinderEvidence = useMemo(() => extractCylinderEvidence(problemText), [problemText]);
  const [manualShape, setManualShape] = useState<ShapeKind>('pyramid');
  const [autoResolve, setAutoResolve] = useState(true);
  const [yaw, setYaw] = useState(32);
  const [pitch, setPitch] = useState(-22);
  const [roll, setRoll] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [commandText, setCommandText] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [boardTool, setBoardTool] = useState<'ai' | 'vertex-vertex' | 'vertex-edge' | 'perpendicular' | 'plane-3p'>('ai');
  const [pickedVertex, setPickedVertex] = useState<string | null>(null);
  const [pickedVertices, setPickedVertices] = useState<string[]>([]);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [analysisError, setAnalysisError] = useState('');
  const playTimerRef = useRef<number | null>(null);

  const shape = autoResolve && detectedShape ? detectedShape : manualShape;
  const model = useMemo(() => buildShape(shape, cylinderEvidence), [cylinderEvidence, shape]);

  useEffect(() => {
    setPrompt(problemText);
  }, [problemText]);

  useEffect(() => {
    setActiveStepIndex(0);
  }, [shape, prompt]);

  useEffect(() => {
    setPickedVertex(null);
    setPickedVertices([]);
  }, [boardTool]);

  const baseSteps = useMemo(() => buildBaseSteps(shape, model, prompt), [model, prompt, shape]);

  const parsedHistory = useMemo(() => history, [history]);

  const { overlayAnnotations, commandSteps } = useMemo(() => {
    const combinedAnnotations: OverlayAnnotation[] = [];
    const combinedSteps: LessonStep[] = [];
    parsedHistory.forEach(item => {
      combinedAnnotations.push(...item.annotations);
      combinedSteps.push(...item.steps);
    });
    return { overlayAnnotations: combinedAnnotations, commandSteps: combinedSteps };
  }, [parsedHistory]);

  const fullSteps = useMemo(() => [...baseSteps, ...commandSteps], [baseSteps, commandSteps]);
  const currentStep = fullSteps[Math.min(activeStepIndex, Math.max(fullSteps.length - 1, 0))];

  useEffect(() => {
    if (!isPlaying) return;
    playTimerRef.current = window.setInterval(() => {
      setActiveStepIndex(prev => {
        const next = prev + 1;
        return next >= fullSteps.length ? 0 : next;
      });
    }, 1400);

    return () => {
      if (playTimerRef.current) {
        window.clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, fullSteps.length]);

  const vertexMap = useMemo(() => getVertexMap(model), [model]);
  const extraVertexMap = useMemo(() => {
    const map = new Map<string, Vertex>();
    overlayAnnotations.forEach(annotation => {
      if (annotation.type === 'line' || annotation.type === 'marker') {
        const label = annotation.to ?? annotation.at ?? annotation.from;
        const all = [annotation.from, annotation.to, annotation.at].filter(Boolean) as string[];
        all.forEach(id => {
          if (!map.has(id) && vertexMap.has(id)) {
            map.set(id, vertexMap.get(id)!);
          }
        });
        if (annotation.title.includes('Đường cao') && annotation.to) {
          const target = annotation.to;
          if (!map.has(target)) {
            const base = pickBaseFace(model);
            const basePoints = base.vertices.map(id => vertexMap.get(id)).filter(Boolean) as Vertex[];
            const foot = centroid(basePoints);
            map.set(target, { id: target, ...foot });
          }
        }
        if (annotation.title.includes('Trung điểm') && label && !map.has(label) && vertexMap.has(label)) {
          map.set(label, vertexMap.get(label)!);
        }
      }
    });
    return map;
  }, [model, overlayAnnotations, vertexMap]);

  const displayVertices = useMemo(() => {
    const merged = new Map<string, Vertex>(vertexMap);
    extraVertexMap.forEach((value, key) => merged.set(key, value));
    return merged;
  }, [extraVertexMap, vertexMap]);

  const projectPoint = useCallback((point: Point3D) => {
    const center = { x: 500, y: 320 };
    const rotated = rotatePoint(point, yaw, pitch, roll);
    const perspective = 540 * zoom;
    const scale = perspective / (perspective + rotated.z + 4);
    return {
      x: center.x + rotated.x * 160 * scale + panX,
      y: center.y - rotated.y * 160 * scale + panY,
      z: rotated.z
    };
  }, [panX, panY, pitch, roll, yaw, zoom]);

  const transformed = useMemo(() => {
    const transformedMap = new Map<string, { x: number; y: number; z: number }>();
    displayVertices.forEach(vertex => {
      transformedMap.set(vertex.id, projectPoint(vertex));
    });

    const faceDepth = new Map<string, number>();
    model.faces.forEach(face => {
      const points = face.vertices
        .map(id => displayVertices.get(id))
        .filter(Boolean) as Vertex[];
      if (points.length < 3) return;
      const rotated = points.map(point => rotatePoint(point, yaw, pitch, roll));
      const depth = rotated.reduce((sum, point) => sum + point.z, 0) / rotated.length;
      faceDepth.set(face.id, depth);
    });

    const facesWithProjected = model.faces
      .map(face => {
        const points = face.vertices.map(id => transformedMap.get(id)).filter(Boolean) as { x: number; y: number; z: number }[];
        const original = face.vertices.map(id => displayVertices.get(id)).filter(Boolean) as Vertex[];
        if (points.length < 3 || original.length < 3) return null;
        const [a, b, c] = original.map(point => rotatePoint(point, yaw, pitch, roll));
        const normalZ = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        return {
          ...face,
          points,
          depth: faceDepth.get(face.id) ?? 0,
          visible: normalZ < 0
        } as ProjectedFace;
      })
      .filter((face): face is ProjectedFace => face !== null)
      .sort((a, b) => a.depth - b.depth);

    const edges = unionEdges(model.faces).map(edge => {
      const a = transformedMap.get(edge.from);
      const b = transformedMap.get(edge.to);
      if (!a || !b) return null;
      const depth = (a.z + b.z) / 2;
      const adjacentVisible = edge.faces.some(faceId => {
        const face = facesWithProjected.find(item => item?.id === faceId);
        return Boolean(face?.visible);
      });
      return { ...edge, a, b, depth, solid: adjacentVisible || edge.faces.length <= 1 };
    }).filter((edge): edge is { from: string; to: string; faces: string[]; a: { x: number; y: number; z: number }; b: { x: number; y: number; z: number }; depth: number; solid: boolean } => edge !== null).sort((a, b) => a.depth - b.depth);

    return { transformedMap, facesWithProjected, edges };
  }, [displayVertices, model.faces, pitch, projectPoint, roll, yaw]);

  const currentAnnotationIds = useMemo(() => currentStep?.annotationIds ?? [], [currentStep]);

  const activeAnnotations = useMemo(() => {
    if (!currentAnnotationIds.length) return overlayAnnotations;
    return overlayAnnotations.filter(annotation => currentAnnotationIds.includes(annotation.id));
  }, [currentAnnotationIds, overlayAnnotations]);

  const visibleAnnotations = useMemo(
    () => [...(model.autoAnnotations ?? []), ...(currentStep ? activeAnnotations : overlayAnnotations)],
    [activeAnnotations, currentStep, model.autoAnnotations, overlayAnnotations]
  );

  const problemSummary = useMemo(() => {
    if (!prompt.trim()) {
      return 'Nhập đề bài vào ô bên dưới để AI dựng hình và sinh lời giải theo đúng cấu trúc trình bày.';
    }
    if (shape === 'cylinder') {
      const area = cylinderEvidence.sectionArea ? `${formatNumber(cylinderEvidence.sectionArea)} cm²` : 'diện tích mặt cắt';
      const chord = cylinderEvidence.chordLength ? `${formatNumber(cylinderEvidence.chordLength)} cm` : 'AB';
      const distance = cylinderEvidence.distanceToChord ? `${formatNumber(cylinderEvidence.distanceToChord)} cm` : 'OM';
      return `Đề dạng hình trụ: mặt cắt ABCD song song trục, ${chord}, tâm O cách AB ${distance}, ${area}.`;
    }
    if (detectedShape) {
      return `AI nhận dạng đề theo dạng ${SHAPE_LABELS[detectedShape].label.toLowerCase()}.`;
    }
    return 'Đề bài chưa đủ dấu hiệu để nhận dạng tự động, nhưng mô hình vẫn có thể dựng thủ công bằng chọn hình bên cạnh.';
  }, [cylinderEvidence.chordLength, cylinderEvidence.distanceToChord, cylinderEvidence.sectionArea, detectedShape, prompt, shape]);

  const promptHints = useMemo(() => {
    const normalized = stripVietnamese(prompt).toLowerCase();
    const hints: string[] = [];

    if (normalized.includes('duong cao')) {
      hints.push('Ưu tiên xác định đỉnh cần hạ vuông góc và mặt đáy liên quan.');
      hints.push('Bấm công cụ Vuông góc rồi chọn đỉnh, sau đó chọn cạnh đáy phù hợp.');
    }

    if (normalized.includes('hinh tru') || normalized.includes('mat cat') || normalized.includes('truc')) {
      hints.push('Chọn hình trụ nếu đề có mặt cắt song song với trục hoặc có tiết diện là hình chữ nhật.');
      hints.push('Xác định AB là dây cung trên đáy trên, rồi dựng OM vuông góc AB để lấy khoảng cách từ tâm đến dây.');
    }

    if (normalized.includes('trung diem')) {
      hints.push('Xác định đúng cạnh có trung điểm, rồi nối trung điểm đó với đỉnh còn lại.');
      hints.push('Có thể dùng công cụ Đỉnh → cạnh để chốt đoạn dựng phụ.');
    }

    if (normalized.includes('mat phang')) {
      hints.push('Tìm đủ 3 điểm không thẳng hàng để tạo mặt phẳng.');
      hints.push('Bấm công cụ Mặt phẳng 3 điểm rồi chấm lần lượt 3 đỉnh.');
    }

    if (normalized.includes('song song')) {
      hints.push('Đối chiếu các cạnh tương ứng hoặc các mặt cùng phương.');
    }

    if (hints.length === 0) {
      hints.push('Dùng AI phân tích nếu đề dài hoặc nhiều ý phụ.');
      hints.push('Nếu đã biết hình, chọn đúng loại hình ở cột bên trái trước khi dựng.');
    }

    return hints.slice(0, 3);
  }, [prompt]);

  const runCommand = () => {
    if (!commandText.trim()) return;
    const result = parseCommand(commandText, model, history.length + 1);
    const item: CommandHistoryItem = {
      id: `cmd-${Date.now()}`,
      text: commandText,
      summary: result.summary,
      annotations: result.annotations,
      steps: result.steps.length > 0 ? result.steps : [{
        title: 'Ghi chú lệnh',
        body: result.summary,
        focus: [],
        annotationIds: []
      }]
    };
    setHistory(prev => [...prev, item]);
    setCommandText('');
    setActiveStepIndex(baseSteps.length + history.length);
    setIsPlaying(false);
  };

  const appendHistoryItem = (item: CommandHistoryItem, focusLastStep = true) => {
    setHistory(prev => [...prev, item]);
    if (focusLastStep) {
      setActiveStepIndex(baseSteps.length + history.length);
    }
    setIsPlaying(false);
  };

  const handleAiAnalyze = async () => {
    const text = prompt.trim();
    if (!text) {
      setAnalysisError('Nhập nguyên văn đề bài trước khi phân tích.');
      setAnalysisStatus('error');
      return;
    }

    try {
      setAnalysisStatus('loading');
      setAnalysisError('');

      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) {
        throw new Error('Chưa có phiên đăng nhập Supabase.');
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/geometry-3d`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          problemText: text,
          subjectHint: 'math',
          shapeHint: shape
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Phân tích AI thất bại.');
      }

      const data = await res.json() as { success: boolean; result: AiGeometryResult };
      const result = data.result;
      if (!result) throw new Error('AI chưa trả về dữ liệu phân tích.');

      const { annotations, steps } = buildAnnotationsFromAiResult(result, model, history.length + 1);
      const mergedSteps = steps.length > 0 ? steps : [{
        title: result.title || 'Phân tích AI',
        body: result.summary || 'AI đã phân tích đề bài.',
        focus: [],
        annotationIds: annotations.map(item => item.id)
      }];

      const item: CommandHistoryItem = {
        id: `ai-${Date.now()}`,
        text,
        summary: result.summary || result.title || 'Phân tích AI hoàn tất.',
        annotations,
        steps: mergedSteps.map(step => ({
          ...step,
          annotationIds: annotations.length > 0 ? annotations.map(item => item.id) : step.annotationIds
        }))
      };

      if (result.detectedShape && result.detectedShape !== 'unknown') {
        setManualShape(result.detectedShape);
        setAutoResolve(true);
      }

      appendHistoryItem(item);
      setAnalysisStatus('success');
    } catch (error: any) {
      console.warn('Lỗi gọi AI phân tích 3D, sử dụng bộ phân tích quy tắc dự phòng:', error.message);
      const fallbackResult = parse3DProblemText(text, shape);
      const item: CommandHistoryItem = {
        id: `fallback-${Date.now()}`,
        text,
        summary: `Hệ thống đã tự động phân tích và chia nhỏ đề bài thành các bước vẽ.`,
        annotations: fallbackResult.annotations,
        steps: fallbackResult.steps
      };

      setManualShape(fallbackResult.detectedShape);
      setAutoResolve(true);
      appendHistoryItem(item, true);
      setAnalysisStatus('success');
    }
  };

  const createManualConstruction = (summary: string, annotations: OverlayAnnotation[], steps: LessonStep[]) => {
    const item: CommandHistoryItem = {
      id: `manual-${Date.now()}`,
      text: summary,
      summary,
      annotations,
      steps: steps.length > 0 ? steps : [{
        title: 'Thao tác thủ công',
        body: summary,
        focus: [],
        annotationIds: annotations.map(item => item.id)
      }]
    };
    appendHistoryItem(item);
  };

  const addManualFaceByVertices = (vertices: string[], summary: string, note: string, color: string) => {
    const cleanVertices = vertices.map(normalizeVertexId);
    const annotation: OverlayAnnotation = {
      id: `manual-${Date.now()}-a1`,
      type: 'face',
      title: summary,
      body: note,
      points: cleanVertices,
      color,
      opacity: 0.3
    };
    createManualConstruction(summary, [annotation], [{
      title: 'Chọn mặt phẳng',
      body: note,
      focus: cleanVertices,
      annotationIds: [annotation.id]
    }]);
  };

  const handleVertexClick = (vertexId: string) => {
    if (boardTool === 'vertex-vertex') {
      if (!pickedVertex) {
        setPickedVertex(vertexId);
        return;
      }

      if (pickedVertex === vertexId) {
        setPickedVertex(null);
        return;
      }

      const from = pickedVertex;
      const to = vertexId;
      const itemId = `manual-${Date.now()}`;
      const annotation: OverlayAnnotation = {
        id: `${itemId}-a1`,
        type: 'line',
        title: `${from} nối ${to}`,
        body: `Nối đỉnh ${from} với đỉnh ${to} bằng công cụ thủ công.`,
        from,
        to,
        color: '#00f0ff',
        opacity: 1,
        dashed: false
      };
      createManualConstruction(
        `Nối đỉnh ${from} với đỉnh ${to}`,
        [annotation],
        [{
          title: 'Nối hai đỉnh',
          body: `Dựng đoạn thẳng từ ${from} đến ${to}. Đây là thao tác cơ bản để dựng cạnh, đường chéo hoặc đường phụ.`,
          focus: [from, to],
          annotationIds: [annotation.id]
        }]
      );
      setPickedVertex(null);
      return;
    }

    if (boardTool === 'vertex-edge' || boardTool === 'perpendicular') {
      setPickedVertex(prev => (prev === vertexId ? null : vertexId));
      return;
    }

    if (boardTool === 'plane-3p') {
      setPickedVertices(prev => {
        const next = prev.includes(vertexId) ? prev : [...prev, vertexId];
        if (next.length === 3) {
          addManualFaceByVertices(
            next,
            `Mặt phẳng qua ${next.join(', ')}`,
            `Tô nổi mặt phẳng đi qua ba điểm ${next.join(', ')} để học sinh dễ theo dõi và trình bày.`,
            '#22c55e'
          );
          return [];
        }
        return next;
      });
    }
  };

  const handleEdgeClick = (from: string, to: string) => {
    if ((boardTool !== 'vertex-edge' && boardTool !== 'perpendicular') || !pickedVertex) return;

    const edgeId = `${normalizeVertexId(from)}${normalizeVertexId(to)}`;
    const isPerpendicular = boardTool === 'perpendicular';
    const annotation: OverlayAnnotation = {
      id: `manual-${Date.now()}-a1`,
      type: 'line',
      title: isPerpendicular ? `Vuông góc từ ${pickedVertex}` : `${pickedVertex} tới cạnh ${edgeId}`,
      body: isPerpendicular
        ? `Dựng đường vuông góc từ ${pickedVertex} xuống cạnh ${edgeId}.`
        : `Nối đỉnh ${pickedVertex} tới cạnh ${edgeId} bằng trung điểm của cạnh.`,
      from: pickedVertex,
      to: `EDGE:${edgeId}`,
      color: isPerpendicular ? '#00f0ff' : '#f59e0b',
      opacity: 1,
      dashed: true
    };
    const marker: OverlayAnnotation = {
      id: `manual-${Date.now()}-a2`,
      type: 'marker',
      title: isPerpendicular ? 'Vuông góc' : 'Trung điểm',
      body: isPerpendicular
        ? `Đánh dấu chân đường vuông góc trên cạnh ${edgeId}.`
        : `Đánh dấu trung điểm của cạnh ${edgeId}.`,
      at: `EDGE:${edgeId}`,
      color: isPerpendicular ? '#ffffff' : '#f8fafc',
      opacity: 1,
      dashed: isPerpendicular
    };
    createManualConstruction(
      isPerpendicular
        ? `Vẽ đường vuông góc từ ${pickedVertex} xuống cạnh ${edgeId}`
        : `Nối đỉnh ${pickedVertex} tới cạnh ${edgeId}`,
      [annotation, marker],
      [{
        title: isPerpendicular ? 'Vẽ vuông góc' : 'Nối đỉnh với cạnh',
        body: isPerpendicular
          ? `Chọn đỉnh ${pickedVertex}, sau đó bấm cạnh ${edgeId} để dựng đường vuông góc.`
          : `Chọn đỉnh ${pickedVertex}, sau đó nối đến cạnh ${edgeId} để hỗ trợ dựng mặt phẳng hoặc chứng minh.`,
        focus: [pickedVertex, edgeId],
        annotationIds: [annotation.id, marker.id]
      }]
    );
    setPickedVertex(null);
  };

  const resetScene = () => {
    setHistory([]);
    setCommandText('');
    setActiveStepIndex(0);
    setYaw(VIEW_PRESETS.iso.yaw);
    setPitch(VIEW_PRESETS.iso.pitch);
    setRoll(VIEW_PRESETS.iso.roll);
    setZoom(VIEW_PRESETS.iso.zoom);
    setPanX(0);
    setPanY(0);
    setIsPlaying(false);
    setPickedVertex(null);
    setBoardTool('ai');
    setAnalysisStatus('idle');
    setAnalysisError('');
  };

  const applyPreset = (preset: ViewPreset) => {
    const next = VIEW_PRESETS[preset];
    setYaw(next.yaw);
    setPitch(next.pitch);
    setRoll(next.roll);
    setZoom(next.zoom);
    setPanX(next.panX);
    setPanY(next.panY);
  };

  const pointCoords = (id: string) => {
    const direct = transformed.transformedMap.get(id);
    if (direct) return direct;
    const resolved = resolvePointReference(id, model, displayVertices);
    return resolved ? projectPoint(resolved) : undefined;
  };

  const renderFace = (face: ProjectedFace) => {
    const coords = face.vertices.map(id => pointCoords(id)).filter(Boolean) as { x: number; y: number; z: number }[];
    if (coords.length < 3) return null;
    const points = coords.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
    return (
      <polygon
        key={face.id}
        points={points}
        fill={face.fill}
        fillOpacity={face.visible ? Math.min(0.35, face.opacity + 0.08) : Math.min(0.12, face.opacity * 0.4)}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />
    );
  };

  const renderMarker = (annotation: OverlayAnnotation) => {
    if (!annotation.at) return null;
    const point = pointCoords(annotation.at);
    if (!point) return null;
    const size = 12;
    return (
      <g key={annotation.id}>
        <rect
          x={point.x - size / 2}
          y={point.y - size / 2}
          width={size}
          height={size}
          fill="none"
          stroke={annotation.color}
          strokeWidth={1.8}
        />
        <text x={point.x + 10} y={point.y - 10} fill={annotation.color} fontSize="11" fontWeight={700}>
          {annotation.title}
        </text>
      </g>
    );
  };

  const renderLine = (annotation: OverlayAnnotation) => {
    if (!annotation.from || !annotation.to) return null;
    const from = pointCoords(annotation.from);
    const to = pointCoords(annotation.to);
    if (!from || !to) return null;
    return (
      <g key={annotation.id}>
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={annotation.color}
          strokeWidth={annotation.dashed ? 2 : 2.4}
          strokeDasharray={annotation.dashed ? '8 6' : undefined}
          strokeLinecap="round"
        />
        <text x={(from.x + to.x) / 2 + 8} y={(from.y + to.y) / 2 - 6} fill={annotation.color} fontSize="11" fontWeight={700}>
          {annotation.title}
        </text>
      </g>
    );
  };

  const renderFaceAnnotation = (annotation: OverlayAnnotation) => {
    if (!annotation.points || annotation.points.length < 3) return null;
    const coords = annotation.points.map(id => pointCoords(id)).filter(Boolean) as { x: number; y: number; z: number }[];
    if (coords.length < 3) return null;
    const points = coords.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
    return (
      <g key={annotation.id}>
        <polygon
          points={points}
          fill={annotation.color}
          fillOpacity={annotation.opacity}
          stroke={annotation.color}
          strokeWidth={1.2}
        />
        <text x={coords[0].x + 10} y={coords[0].y - 10} fill={annotation.color} fontSize="11" fontWeight={700}>
          {annotation.title}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-2xl border border-synth-cyan/20 p-5 md:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-synth-cyan/20 bg-synth-blue/40 text-[10px] font-orbitron font-bold uppercase tracking-[0.22em] text-synth-cyan">
              <Sparkles className="w-3.5 h-3.5" />
              Bí kíp 3D
            </div>
            <h2 className="font-orbitron font-black text-2xl md:text-4xl uppercase tracking-wider text-white">
              Hình học không gian lớp 9
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Công cụ dựng hình theo đề bài, hiển thị nét thấy - nét khuất đúng quy ước, cho phép xoay 360°, zoom, pan, đổi góc nhìn và đi từng bước lời giải.
            </p>
            <p className="text-xs text-synth-cyan font-semibold">{problemSummary}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            {([
              ['iso', 'Xiên chuẩn'],
              ['front', 'Chính diện'],
              ['top', 'Từ trên'],
              ['side', 'Từ cạnh']
            ] as const).map(([preset, label]) => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-orbitron font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Nhận dạng từ đề</span>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Dán nguyên văn đề bài, ví dụ: Cho hình chóp S.ABCD có đáy ABCD là hình vuông..."
              className="w-full min-h-[140px] rounded-2xl border border-white/10 bg-synth-gray/25 p-4 text-sm text-white outline-none focus:border-synth-cyan/40"
            />
          </label>

          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Chọn hình</span>
            <select
              value={manualShape}
              onChange={e => {
                setManualShape(e.target.value as ShapeKind);
                setAutoResolve(false);
              }}
              className="w-full rounded-2xl border border-white/10 bg-synth-gray/25 p-4 text-sm text-white outline-none"
            >
              <option value="prism">Lăng trụ tam giác</option>
              <option value="cuboid">Hình hộp chữ nhật</option>
              <option value="pyramid">Hình chóp</option>
              <option value="tetrahedron">Tứ diện</option>
              <option value="cylinder">Hình trụ</option>
            </select>
            <button
              onClick={() => setAutoResolve(true)}
              className={`w-full rounded-2xl border px-4 py-3 text-xs font-orbitron font-bold uppercase tracking-wider cursor-pointer ${
                autoResolve
                  ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {autoResolve ? 'Đang tự nhận dạng' : 'Bật tự nhận dạng'}
            </button>
          </label>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-white font-orbitron font-black uppercase text-sm tracking-wider">
                <Layers3 className="w-4 h-4 text-synth-cyan" />
                {SHAPE_LABELS[shape].label}
              </div>
              <div className="text-xs text-slate-300">
                Mã hình: <span className="text-white font-semibold">{model.notation}</span>
              </div>
              <div className="text-xs text-slate-300">
                Điểm có sẵn: <span className="text-white font-semibold">{model.vertices.map(v => v.id).join(', ')}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Mẹo lệnh: <span className="text-white">"vẽ đường cao từ S"</span>, <span className="text-white">"nối trung điểm BC với đỉnh S"</span>, <span className="text-white">"tô màu mặt ABCD"</span>, <span className="text-white">"vẽ OM vuông góc AB"</span>.
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] gap-6 items-start">
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/10 p-4">
            <svg viewBox="0 0 1000 640" className="w-full h-[420px] md:h-[520px] rounded-2xl bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.1),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_32%),linear-gradient(180deg,rgba(7,10,19,0.95),rgba(7,10,19,0.8))]">
              <defs>
                <filter id="biki-shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f0ff" floodOpacity="0.25" />
                </filter>
              </defs>

              {transformed.facesWithProjected.map(face => renderFace(face))}

              {transformed.edges.map(edge => {
                if (!edge) return null;
                const active = visibleAnnotations.some(annotation => annotation.type === 'line' && ((annotation.from === edge.from && annotation.to === edge.to) || (annotation.from === edge.to && annotation.to === edge.from)));
                const stroke = active ? '#f8fafc' : '#cbd5e1';
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={edge.a.x}
                      y1={edge.a.y}
                      x2={edge.b.x}
                      y2={edge.b.y}
                      stroke="transparent"
                      strokeWidth={14}
                      className={boardTool === 'vertex-edge' ? 'cursor-pointer' : undefined}
                      onClick={() => handleEdgeClick(edge.from, edge.to)}
                    />
                    <line
                      x1={edge.a.x}
                      y1={edge.a.y}
                      x2={edge.b.x}
                      y2={edge.b.y}
                      stroke={stroke}
                      strokeWidth={active ? 3 : 2}
                      strokeDasharray={edge.solid ? undefined : '9 7'}
                      strokeLinecap="round"
                      opacity={edge.solid ? 0.95 : 0.62}
                    />
                  </g>
                );
              })}

              {visibleAnnotations.map(annotation => {
                if (annotation.type === 'line') return renderLine(annotation);
                if (annotation.type === 'face') return renderFaceAnnotation(annotation);
                return renderMarker(annotation);
              })}

              {model.vertices.map(vertex => {
                const point = pointCoords(vertex.id);
                if (!point) return null;
                const isPicked = pickedVertex === vertex.id || pickedVertices.includes(vertex.id);
                return (
                  <g key={vertex.id}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={5.8}
                      fill={isPicked ? '#f59e0b' : '#f8fafc'}
                      stroke="#0f172a"
                      strokeWidth={1.5}
                      filter="url(#biki-shadow)"
                      className={boardTool !== 'ai' ? 'cursor-pointer' : undefined}
                      onClick={() => handleVertexClick(vertex.id)}
                    />
                    <text x={point.x + 10} y={point.y - 10} fill="#f8fafc" fontSize="12" fontWeight={700}>
                      {vertex.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="glass-panel rounded-2xl border border-white/10 p-3 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Xoay ngang</span>
              <input type="range" min="-180" max="180" value={yaw} onChange={e => setYaw(Number(e.target.value))} className="w-full" />
            </label>
            <label className="glass-panel rounded-2xl border border-white/10 p-3 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Xoay dọc</span>
              <input type="range" min="-90" max="90" value={pitch} onChange={e => setPitch(Number(e.target.value))} className="w-full" />
            </label>
            <label className="glass-panel rounded-2xl border border-white/10 p-3 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Zoom</span>
              <input type="range" min="0.7" max="1.8" step="0.01" value={zoom} onChange={e => setZoom(Number(e.target.value))} className="w-full" />
            </label>
            <button
              onClick={resetScene}
              className="glass-panel rounded-2xl border border-synth-orange/20 p-3 text-left cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <RotateCcw className="w-5 h-5 text-synth-orange" />
              <div>
                <div className="text-xs font-orbitron font-bold uppercase tracking-wider text-white">Reset bảng</div>
                <div className="text-[10px] text-slate-400">Xóa lệnh và quay về góc mặc định</div>
              </div>
            </button>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 p-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div>
                <h3 className="font-orbitron font-black text-sm text-white uppercase tracking-wider">Cập nhật tức thì</h3>
                <p className="text-xs text-slate-400 mt-1">Nhập yêu cầu dựng hình, rồi AI cập nhật mô hình ngay trên màn hình.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-xs font-orbitron font-bold uppercase tracking-wider cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Dừng phát' : 'Phát từng bước'}
                </button>
                <button
                  onClick={handleAiAnalyze}
                  disabled={analysisStatus === 'loading'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-synth-magenta/20 bg-synth-magenta/10 text-synth-magenta text-xs font-orbitron font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {analysisStatus === 'loading' ? 'AI đang soi đề...' : 'Soi đề bằng AI'}
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bảng vẽ nhanh:</span>
                <button
                  onClick={() => { setBoardTool('ai'); setPickedVertex(null); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    boardTool === 'ai' ? 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  AI
                </button>
                <button
                  onClick={() => { setBoardTool('vertex-vertex'); setPickedVertex(null); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    boardTool === 'vertex-vertex' ? 'border-synth-cyan/30 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  Đỉnh → đỉnh
                </button>
                <button
                  onClick={() => { setBoardTool('vertex-edge'); setPickedVertex(null); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    boardTool === 'vertex-edge' ? 'border-synth-orange/30 bg-synth-orange/10 text-synth-orange' : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  Đỉnh → cạnh
                </button>
                <button
                  onClick={() => { setBoardTool('perpendicular'); setPickedVertex(null); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    boardTool === 'perpendicular' ? 'border-synth-magenta/30 bg-synth-magenta/10 text-synth-magenta' : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  Vuông góc
                </button>
                <button
                  onClick={() => { setBoardTool('plane-3p'); setPickedVertex(null); setPickedVertices([]); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    boardTool === 'plane-3p' ? 'border-synth-green/30 bg-synth-green/10 text-synth-green' : 'border-white/10 bg-white/5 text-white'
                  }`}
                >
                  Mặt phẳng 3 điểm
                </button>
                {pickedVertex && (
                  <span className="text-[10px] font-bold text-synth-orange uppercase tracking-wider">
                    Đã chọn: {pickedVertex}
                  </span>
                )}
                {boardTool === 'plane-3p' && pickedVertices.length > 0 && (
                  <span className="text-[10px] font-bold text-synth-green uppercase tracking-wider">
                    Đang chọn: {pickedVertices.join(', ')}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-3">
              <input
                value={commandText}
                onChange={e => setCommandText(e.target.value)}
                placeholder="Ví dụ: vẽ đường cao từ S, nối trung điểm BC với đỉnh S, tô màu mặt ABCD"
                className="flex-1 rounded-2xl border border-white/10 bg-synth-gray/25 px-4 py-3 text-sm text-white outline-none focus:border-synth-cyan/40"
              />
              <button
                onClick={runCommand}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-synth-cyan to-synth-purple text-black font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Dùng lệnh <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 text-[10px] text-slate-400">
              Mẹo: dùng tên đỉnh đang xuất hiện trên hình. Nếu đề có ghi ký hiệu khác, nhập đúng theo đề gốc.
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">
                Mẹo nhanh từ đề
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-200 leading-relaxed">
                {promptHints.map(hint => (
                  <li key={hint} className="flex gap-2">
                    <span className="text-synth-cyan">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            {analysisStatus === 'error' && analysisError && (
              <div className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
                {analysisError}
              </div>
            )}
            {analysisStatus === 'success' && (
              <div className="mt-3 rounded-2xl border border-synth-green/20 bg-synth-green/10 p-3 text-xs text-synth-green">
                AI đã phân tích xong và cập nhật lời giải lên bảng.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/10 p-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Ruler className="w-5 h-5 text-synth-cyan" />
              <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Lời giải từng bước</h3>
            </div>
            {fullSteps.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">
                    Bước {activeStepIndex + 1}/{fullSteps.length}
                  </div>
                  <h4 className="mt-2 text-base font-orbitron font-black text-white uppercase tracking-wider">
                    {currentStep?.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                    {currentStep?.body}
                  </p>
                  {currentStep?.focus && currentStep.focus.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentStep.focus.map(item => (
                        <span key={item} className="px-2.5 py-1 rounded-full border border-white/10 bg-synth-blue/30 text-[10px] font-semibold text-white">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                    className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => setActiveStepIndex(prev => Math.min(fullSteps.length - 1, prev + 1))}
                    className="px-3 py-2 rounded-xl border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Sau
                  </button>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {fullSteps.map((step, index) => (
                    <button
                      key={`${step.title}-${index}`}
                      onClick={() => setActiveStepIndex(index)}
                      className={`w-full text-left rounded-2xl border p-3 cursor-pointer transition-colors ${
                        index === activeStepIndex
                          ? 'border-synth-cyan/30 bg-synth-cyan/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">
                        Bước {index + 1}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white">{step.title}</div>
                      <div className="mt-1 text-xs text-slate-300 line-clamp-2">{step.body}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-300">
                Chưa có bước giải nào. Nhập lệnh để AI sinh ra từng bước dựng hình và trình bày.
              </div>
            )}
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 p-4 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-synth-cyan" />
              <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Lịch sử thao tác</h3>
            </div>
            {history.length > 0 ? (
              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {history.slice().reverse().map(item => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">{item.text}</div>
                    <div className="mt-1 text-xs text-slate-300">{item.summary}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-300">
                Chưa có lệnh nào. Nhập thử kiểu "vẽ đường cao từ S" để khởi động.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
