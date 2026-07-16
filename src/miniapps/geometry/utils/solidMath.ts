export type ShapeKind = 'prism' | 'cuboid' | 'pyramid' | 'tetrahedron' | 'cylinder';
export type ViewPreset = 'iso' | 'front' | 'top' | 'side';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Vertex extends Point3D {
  id: string;
}

export interface Face {
  id: string;
  vertices: string[];
  fill: string;
  opacity: number;
}

export interface SceneModel {
  title: string;
  notation: string;
  vertices: Vertex[];
  faces: Face[];
  baseFaceIds: string[];
  apexId?: string;
  autoAnnotations?: OverlayAnnotation[];
}

export interface ProjectedFace extends Face {
  points: { x: number; y: number; z: number }[];
  depth: number;
  visible: boolean;
}

export interface OverlayAnnotation {
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

export interface LessonStep {
  title: string;
  body: string;
  command?: string;
  focus?: string[];
  annotationIds: string[];
}

export interface CommandHistoryItem {
  id: string;
  text: string;
  summary: string;
  annotations: OverlayAnnotation[];
  steps: LessonStep[];
}

export interface AiGeometryAction {
  type: 'drawAltitude' | 'connectVertexToEdge' | 'connectVertexToVertex' | 'highlightFace' | 'markPerpendicular' | 'markParallel' | 'markMidpoint';
  from?: string;
  to?: string;
  face?: string[];
  note?: string;
  style?: 'solid' | 'dashed';
  color?: string;
  stepIndex?: number;
}

export interface AiGeometryResult {
  detectedShape: ShapeKind | 'unknown';
  title: string;
  summary: string;
  assumptions: string[];
  stepByStep: { title: string; body: string; command?: string }[];
  modelActions: AiGeometryAction[];
  commands: string[];
  warnings: string[];
}

export interface CylinderEvidence {
  chordLength?: number;
  distanceToChord?: number;
  sectionArea?: number;
}

export interface GeometryWorkshop3DProps {
  problemText: string;
}

export const VIEW_PRESETS: Record<ViewPreset, { yaw: number; pitch: number; roll: number; zoom: number; panX: number; panY: number }> = {
  iso: { yaw: 32, pitch: -22, roll: 0, zoom: 1, panX: 0, panY: 0 },
  front: { yaw: 0, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 },
  top: { yaw: 0, pitch: -78, roll: 0, zoom: 1, panX: 0, panY: 0 },
  side: { yaw: 90, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 }
};

// ---- Hằng số nhãn hình ----
export const SHAPE_LABELS: Record<ShapeKind, { label: string }> = {
  prism: { label: 'Lăng trụ tam giác' },
  cuboid: { label: 'Hình hộp chữ nhật' },
  pyramid: { label: 'Hình chóp' },
  tetrahedron: { label: 'Tứ diện' },
  cylinder: { label: 'Hình trụ' }
};

// ---- Tiện ích chuỗi ----
export function stripVietnamese(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function getLabelTokens(text: string) {
  const matches = text.match(/[A-Z](?:[0-9]+|')?/g);
  return matches ? matches.map(item => item.replace(/'/g, '').toUpperCase()) : [];
}

export function normalizeVertexId(value: string) {
  return value.replace(/'/g, '').trim().toUpperCase();
}

export function formatNumber(value: number) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/\.00$/, '');
}

// ---- Toán học hình học ----
export function midpoint(a: Point3D, b: Point3D): Point3D {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2 };
}

export function centroid(points: Point3D[]) {
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

export function rotatePoint(point: Point3D, yaw: number, pitch: number, roll: number) {
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

export function circlePoint(angleDeg: number, radius: number, z: number): Point3D {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
    z
  };
}

// ---- Tiện ích mô hình ----
export function getVertexMap(model: SceneModel) {
  return new Map(model.vertices.map(vertex => [vertex.id, vertex]));
}

export function pickBaseFace(model: SceneModel) {
  return model.faces.find(face => face.id === 'base') ?? model.faces[0];
}

export function resolvePointReference(reference: string, model: SceneModel, vertexMap: Map<string, Vertex>) {
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

export function unionEdges(faces: Face[]) {
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

// ---- Nhận dạng hình ----
export function detectShape(problemText: string): ShapeKind | null {
  const normalized = stripVietnamese(problemText).toLowerCase();
  if (!normalized.trim()) return null;
  if (normalized.includes('hinh tru') || normalized.includes('mat cat song song voi truc') || (normalized.includes('mat cat') && normalized.includes('truc'))) return 'cylinder';
  if (normalized.includes('tu dien')) return 'tetrahedron';
  if (normalized.includes('hinh hop') || normalized.includes('hop chu nhat')) return 'cuboid';
  if (normalized.includes('lang tru')) return 'prism';
  if (normalized.includes('hinh chop')) return 'pyramid';
  return null;
}

// ---- Phân tích dữ liệu hình trụ ----
export function extractCylinderEvidence(problemText: string): CylinderEvidence {
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

// ---- Sinh mô hình hình học ----
export function buildCylinderShape(evidence?: CylinderEvidence): SceneModel {
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
  const midpt = { id: 'M', x: 0, y: 0.6, z: 1.2 };
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
      midpt,
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

export function buildShape(kind: ShapeKind, evidence?: CylinderEvidence): SceneModel {
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

  // Mặc định: hình chóp pyramid
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

// ---- Phân tích lệnh văn bản ----
export function parseCommand(text: string, model: SceneModel, annotationIndex: number) {
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
    annotations.push({ id, type: 'line', title, body, from, to, color, opacity: 1, dashed });
    return id;
  };

  const addFace = (points: string[], title: string, body: string, color: string, opacity = 0.28) => {
    const id = `anno-${annotationIndex + annotations.length + 1}`;
    annotations.push({ id, type: 'face', title, body, points, color, opacity });
    return id;
  };

  const addMarker = (at: string, title: string, body: string, color: string) => {
    const id = `anno-${annotationIndex + annotations.length + 1}`;
    annotations.push({ id, type: 'marker', title, body, at, color, opacity: 1 });
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

// ---- Sinh annotations từ kết quả AI ----
export function buildAnnotationsFromAiResult(result: AiGeometryResult, model: SceneModel, annotationStartIndex: number) {
  const vertexMap = getVertexMap(model);
  const annotations: OverlayAnnotation[] = [];
  const steps: LessonStep[] = [];

  (result.stepByStep || []).forEach(step => {
    steps.push({
      title: step.title,
      body: step.body,
      command: step.command,
      focus: [],
      annotationIds: []
    });
  });

  const addAnnotation = (annotation: Omit<OverlayAnnotation, 'id'>, stepIndex?: number) => {
    const id = `ai-${annotationStartIndex + annotations.length + 1}`;
    annotations.push({ id, ...annotation });
    if (stepIndex !== undefined && steps[stepIndex]) {
      steps[stepIndex].annotationIds.push(id);
    } else {
      steps.forEach(s => s.annotationIds.push(id));
    }
    return id;
  };

  (result.modelActions || []).forEach(action => {
    const color = action.color || '#00f0ff';
    const dashed = action.style === 'dashed';

    if (action.type === 'highlightFace' && action.face && action.face.length >= 3) {
      addAnnotation({ type: 'face', title: action.note || 'Nhấn mặt phẳng', body: action.note || 'Làm nổi mặt phẳng cần dùng trong lời giải.', points: action.face, color, opacity: 0.32 }, action.stepIndex);
      return;
    }

    if (action.type === 'connectVertexToVertex' && action.from && action.to) {
      addAnnotation({ type: 'line', title: action.note || `${action.from} - ${action.to}`, body: action.note || 'Nối hai đỉnh theo yêu cầu đề bài.', from: normalizeVertexId(action.from), to: normalizeVertexId(action.to), color, opacity: 1, dashed }, action.stepIndex);
      return;
    }

    if (action.type === 'connectVertexToEdge' && action.from && action.to) {
      const edgeId = normalizeVertexId(action.to);
      const edgePoint = resolvePointReference(edgeId, model, vertexMap);
      if (edgePoint) {
        const tempKey = edgeId.length >= 2 ? edgeId.slice(0, 2) : edgeId;
        addAnnotation({ type: 'line', title: action.note || `Nối ${action.from} với cạnh ${tempKey}`, body: action.note || 'Nối một đỉnh với trung điểm của cạnh.', from: normalizeVertexId(action.from), to: `EDGE:${tempKey}`, color, opacity: 1, dashed }, action.stepIndex);
      }
      return;
    }

    if (action.type === 'drawAltitude' && action.from) {
      const apex = normalizeVertexId(action.from);
      const baseFaceVerts = action.face && action.face.length >= 3 ? action.face.map(normalizeVertexId) : pickBaseFace(model).vertices;
      addAnnotation({ type: 'line', title: action.note || `Đường cao từ ${apex}`, body: action.note || 'Kẻ đường cao từ đỉnh xuống mặt đáy.', from: apex, to: `FACE:${baseFaceVerts.join('')}`, color, opacity: 1, dashed: true }, action.stepIndex);
      addAnnotation({ type: 'marker', title: 'Chân đường cao', body: 'Đánh dấu chân đường cao trên mặt đáy.', at: `FACE:${baseFaceVerts.join('')}`, color: '#ffffff', opacity: 1 }, action.stepIndex);
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
      }, action.stepIndex);
    }
  });

  return { annotations, steps };
}

// ---- Sinh các bước bài học cơ sở ----
export function buildBaseSteps(shape: ShapeKind, model: SceneModel, problemText: string): LessonStep[] {
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
      { title: 'Nhận dạng hình trụ', body: `Đây là hình trụ có mặt cắt ABCD song song với trục. ${detected}`, focus: ['A', 'B', 'C', 'D', 'O', 'M'], annotationIds: ['guide-ab', 'guide-om', 'guide-center', 'guide-section'] },
      { title: 'Đọc dữ kiện hình', body: hasExactData ? `Mặt cắt là hình chữ nhật nên ${chordText}, ${distanceText}, ${areaText}.` : 'Mặt cắt là hình chữ nhật; cần xác định AB là dây cung trên đáy, OM là khoảng cách từ tâm đến dây và diện tích mặt cắt để suy ra các kích thước còn lại.', focus: ['A', 'B', 'C', 'D', 'O', 'M'], annotationIds: ['guide-section', 'guide-ab', 'guide-om'] },
      { title: 'Tính bán kính và chiều cao', body: hasExactData && radius && height ? `Từ ${chordText} và khoảng cách ${distanceText}, suy ra r = √((AB/2)^2 + OM^2) = ${formatNumber(radius)} cm. Đồng thời h = S / AB = ${formatNumber(height)} cm.` : 'Từ dây cung AB và khoảng cách từ tâm đến AB, dùng công thức r² = (AB/2)² + OM². Chiều cao h lấy bằng diện tích mặt cắt chia cho AB.', focus: ['O', 'M', 'A', 'B'], annotationIds: ['guide-om', 'guide-ab'] },
      { title: 'Diện tích xung quanh và thể tích', body: hasExactData && lateralArea && volume ? `Dùng lệnh công thức: Sxq = 2πrh = ${formatNumber(lateralArea)} cm² và V = πr²h = ${formatNumber(volume)} cm³.` : 'Sau khi có r và h, tính diện tích xung quanh theo Sxq = 2πrh và thể tích theo V = πr²h.', focus: ['O', 'M'], annotationIds: ['guide-om'] }
    ];
  }

  return [
    { title: 'Nhận dạng hình', body: `Xác định đây là ${model.title}. ${detected}`, focus: model.vertices.map(v => v.id), annotationIds: [model.faces[0]?.id ?? ''] },
    { title: 'Chọn dữ kiện', body: 'Đọc đúng giả thiết, điểm đặc biệt, quan hệ vuông góc hoặc song song. Từ đó quyết định sẽ dựng thêm đường phụ nào.', focus: model.baseFaceIds, annotationIds: [] },
    { title: 'Trình bày', body: 'Viết theo trật tự: giả thiết, dựng hình, lập luận, kết luận. Trong bài hình 9, cần nêu rõ vì sao một đoạn thẳng là đường cao, trung điểm hoặc đoạn song song.', focus: [], annotationIds: [] }
  ];
}

// ---- Phân tích đề bài tự động (fallback) ----
export function parse3DProblemText(text: string, currentShape: ShapeKind): { detectedShape: ShapeKind; annotations: OverlayAnnotation[]; steps: LessonStep[] } {
  const normalized = stripVietnamese(text).toLowerCase();

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
    { title: 'Dựng hình cơ sở', body: `Vẽ hình không gian (${SHAPE_LABELS[detectedShape]?.label || detectedShape}) làm nền tảng.`, annotationIds: [] }
  ];

  const sentences = text.split(/[.,;\n]/);
  sentences.forEach(sentence => {
    const sNorm = stripVietnamese(sentence).toLowerCase();
    if (!sNorm.trim()) return;

    const altMatch = sNorm.match(/(?:duong cao|chieu cao|ke|ve)\s*([a-z])([a-z])\s*(?:vuong goc|xuong|\(|den)/i);
    if (altMatch) {
      const from = altMatch[1].toUpperCase();
      const to = altMatch[2].toUpperCase();
      const annoId = `alt-${Date.now()}-${annotations.length}`;
      annotations.push({ id: annoId, type: 'line', title: `Đường cao ${from}${to}`, body: `Kẻ đường cao ${from}${to} vuông góc với đáy.`, from, to: `FACE:ABCD`, color: '#f43f5e', opacity: 1, dashed: true });
      steps.push({ title: `Kẻ đường cao ${from}${to}`, body: `Từ đỉnh ${from}, kẻ đường cao ${from}${to} vuông góc với mặt đáy.`, annotationIds: [annoId] });
      return;
    }

    const connMatch = sNorm.match(/(?:noi|ve doan thail)\s*([a-z])\s*(?:den|voi|va)\s*([a-z])/i) || sNorm.match(/(?:ke|ve)\s*([a-z])([a-z])/i);
    if (connMatch) {
      const from = connMatch[1].toUpperCase();
      const to = connMatch[2].toUpperCase();
      const annoId = `conn-${Date.now()}-${annotations.length}`;
      annotations.push({ id: annoId, type: 'line', title: `Nối ${from}${to}`, body: `Nối ${from} với ${to} theo đề bài.`, from, to, color: '#10b981', opacity: 1 });
      steps.push({ title: `Nối ${from} với ${to}`, body: `Vẽ đoạn thẳng nối đỉnh ${from} và đỉnh ${to}.`, annotationIds: [annoId] });
      return;
    }

    if (sNorm.includes('mat phang') || sNorm.includes('mat ben') || sNorm.includes('mat day')) {
      const pts = getLabelTokens(sentence);
      if (pts.length >= 3) {
        const annoId = `face-${Date.now()}-${annotations.length}`;
        annotations.push({ id: annoId, type: 'face', title: `Mặt phẳng ${pts.join('')}`, body: `Nhấn mạnh mặt phẳng ${pts.join('')}.`, points: pts, color: '#3b82f6', opacity: 0.25 });
        steps.push({ title: `Xét mặt phẳng ${pts.join('')}`, body: `Làm nổi bật mặt phẳng ${pts.join('')} để phục vụ chứng minh hoặc tính toán.`, annotationIds: [annoId] });
      }
    }
  });

  return { detectedShape, annotations, steps };
}
