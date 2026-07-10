// ============================================================
// types.ts — Định nghĩa kiểu dữ liệu cho hệ thống đồ họa 3D
// Tất cả types được export từ đây để dùng chung giữa các module.
// ============================================================

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

export interface Biki3DStudioProps {
  problemText: string;
}

export const VIEW_PRESETS: Record<ViewPreset, { yaw: number; pitch: number; roll: number; zoom: number; panX: number; panY: number }> = {
  iso: { yaw: 32, pitch: -22, roll: 0, zoom: 1, panX: 0, panY: 0 },
  front: { yaw: 0, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 },
  top: { yaw: 0, pitch: -78, roll: 0, zoom: 1, panX: 0, panY: 0 },
  side: { yaw: 90, pitch: 0, roll: 0, zoom: 1, panX: 0, panY: 0 }
};
