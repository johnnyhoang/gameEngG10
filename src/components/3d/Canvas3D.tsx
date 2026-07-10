// ============================================================
// Canvas3D.tsx — SVG Canvas render engine cho đồ họa 3D
// Đảm nhận: chiếu 3D, vẽ mặt/cạnh/annotations, click tương tác.
// ============================================================

import { useMemo, useCallback } from 'react';
import type {
  LessonStep,
  OverlayAnnotation,
  Point3D,
  ProjectedFace,
  SceneModel,
  Vertex
} from './types';
import {
  centroid,
  getVertexMap,
  pickBaseFace,
  resolvePointReference,
  rotatePoint,
  unionEdges
} from './shapeGenerators';

export interface Canvas3DProps {
  model: SceneModel;
  yaw: number;
  pitch: number;
  roll: number;
  zoom: number;
  panX: number;
  panY: number;
  overlayAnnotations: OverlayAnnotation[];
  currentStep: LessonStep | undefined;
  boardTool: 'ai' | 'vertex-vertex' | 'vertex-edge' | 'perpendicular' | 'plane-3p';
  pickedVertex: string | null;
  pickedVertices: string[];
  onVertexClick: (vertexId: string) => void;
  onEdgeClick: (from: string, to: string) => void;
}

export function Canvas3D({
  model,
  yaw,
  pitch,
  roll,
  zoom,
  panX,
  panY,
  overlayAnnotations,
  currentStep,
  boardTool,
  pickedVertex,
  pickedVertices,
  onVertexClick,
  onEdgeClick
}: Canvas3DProps) {
  const vertexMap = useMemo(() => getVertexMap(model), [model]);

  // Tính toán các đỉnh phụ từ annotations (đường cao, trung điểm, v.v.)
  const extraVertexMap = useMemo(() => {
    const map = new Map<string, Vertex>();
    overlayAnnotations.forEach(annotation => {
      if (annotation.type === 'line' || annotation.type === 'marker') {
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
        if (annotation.title.includes('Trung điểm') && annotation.at && !map.has(annotation.at) && vertexMap.has(annotation.at)) {
          map.set(annotation.at, vertexMap.get(annotation.at)!);
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
    // Tâm chiếu & hệ số tỉ lệ khớp khung an toàn 800x560 (CORE_SPECS §5 Khuôn khổ dựng hình).
    const center = { x: 400, y: 280 };
    const rotated = rotatePoint(point, yaw, pitch, roll);
    const perspective = 432 * zoom;
    const scale = perspective / (perspective + rotated.z + 4);
    return {
      x: center.x + rotated.x * 128 * scale + panX,
      y: center.y - rotated.y * 128 * scale + panY,
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
      const points = face.vertices.map(id => displayVertices.get(id)).filter(Boolean) as Vertex[];
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

  const pointCoords = useCallback((id: string) => {
    const direct = transformed.transformedMap.get(id);
    if (direct) return direct;
    const resolved = resolvePointReference(id, model, displayVertices);
    return resolved ? projectPoint(resolved) : undefined;
  }, [transformed.transformedMap, model, displayVertices, projectPoint]);

  // ---- Render functions ----

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
    <svg
      viewBox="0 0 800 560"
      className="w-full h-[420px] md:h-[520px] rounded-2xl bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.1),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_32%),linear-gradient(180deg,rgba(7,10,19,0.95),rgba(7,10,19,0.8))]"
    >
      <defs>
        <filter id="biki-shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f0ff" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Render các mặt (polygon) */}
      {transformed.facesWithProjected.map(face => renderFace(face))}

      {/* Render các cạnh */}
      {transformed.edges.map(edge => {
        if (!edge) return null;
        const active = visibleAnnotations.some(annotation =>
          annotation.type === 'line' &&
          ((annotation.from === edge.from && annotation.to === edge.to) ||
            (annotation.from === edge.to && annotation.to === edge.from))
        );
        const stroke = active ? '#f8fafc' : '#cbd5e1';
        return (
          <g key={`${edge.from}-${edge.to}`}>
            {/* Vùng click rộng hơn cho cạnh */}
            <line
              x1={edge.a.x}
              y1={edge.a.y}
              x2={edge.b.x}
              y2={edge.b.y}
              stroke="transparent"
              strokeWidth={14}
              className={boardTool === 'vertex-edge' || boardTool === 'perpendicular' ? 'cursor-pointer' : undefined}
              onClick={() => onEdgeClick(edge.from, edge.to)}
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

      {/* Render các annotations */}
      {visibleAnnotations.map(annotation => {
        if (annotation.type === 'line') return renderLine(annotation);
        if (annotation.type === 'face') return renderFaceAnnotation(annotation);
        return renderMarker(annotation);
      })}

      {/* Render các đỉnh và nhãn */}
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
              onClick={() => onVertexClick(vertex.id)}
            />
            <text x={point.x + 10} y={point.y - 10} fill="#f8fafc" fontSize="12" fontWeight={700}>
              {vertex.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
