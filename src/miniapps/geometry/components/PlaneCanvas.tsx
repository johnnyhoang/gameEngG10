import React, { useMemo, useRef } from 'react';
import { useGeometryState } from '../hooks/useGeometryState';
import {
  distance,
  midpoint,
  projectPointToLine,
  getPointMap,
  edgePairs,
  deriveOverlayGeometry,
  boardToSvgPoint,
  overlayMidpoint,
  clamp
} from '../utils/planeMath';
import type { PlanePoint, PlaneOverlay } from '../utils/planeMath';


interface PlaneCanvasProps {
  interactive?: boolean;
}

export const PlaneCanvas: React.FC<PlaneCanvasProps> = ({ interactive = true }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const {
    planeScene,
    planeTool,
    selectedPointId2D,
    viewport2D,
    currentStep2D,
    dragPointId2D,
    isPanning2D,
    panAnchor2D,
    setPlaneScene,
    setSelectedPointId2D,
    setViewport2D,
    setDragPointId2D,
    setIsPanning2D,
    setPanAnchor2D,
    setHistory2D,
    setLessonSteps2D
  } = useGeometryState();

  const visiblePoints = useMemo(() => {
    return planeScene.points.filter(
      p => p.stepIndex === undefined || currentStep2D === -1 || p.stepIndex <= currentStep2D
    );
  }, [planeScene.points, currentStep2D]);

  const visibleOverlays = useMemo(() => {
    return planeScene.overlays.filter(
      o => o.stepIndex === undefined || currentStep2D === -1 || o.stepIndex <= currentStep2D
    );
  }, [planeScene.overlays, currentStep2D]);

  const visiblePolygon = useMemo(() => {
    if (!planeScene.polygon) return undefined;
    if (planeScene.polygon.stepIndex !== undefined && currentStep2D >= 0 && planeScene.polygon.stepIndex > currentStep2D) return undefined;
    return planeScene.polygon;
  }, [planeScene.polygon, currentStep2D]);

  const visibleCircle = useMemo(() => {
    if (!planeScene.circle) return undefined;
    if (planeScene.circle.stepIndex !== undefined && currentStep2D >= 0 && planeScene.circle.stepIndex > currentStep2D) return undefined;
    return planeScene.circle;
  }, [planeScene.circle, currentStep2D]);

  const pointMap = useMemo(() => getPointMap(visiblePoints), [visiblePoints]);

  const polygonPoints = useMemo(() => {
    if (!visiblePolygon) return [];
    return visiblePolygon.points.map(pointId => pointMap.get(pointId)).filter(Boolean) as PlanePoint[];
  }, [pointMap, visiblePolygon]);

  const circleMetrics = useMemo(() => {
    if (!visibleCircle) return null;
    const center = pointMap.get(visibleCircle.center);
    const radiusPoint = pointMap.get(visibleCircle.radiusPoint);
    if (!center || !radiusPoint) return null;
    const radius = distance(center, radiusPoint);
    return { center, radiusPoint, radius };
  }, [pointMap, visibleCircle]);

  const edges = useMemo(() => edgePairs(planeScene), [planeScene]);
  const polygonLabelPoint = polygonPoints.length > 0 ? polygonPoints.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 }) : null;

  const addHistory = (entry: string) => {
    setHistory2D(prev => [entry, ...prev].slice(0, 8));
  };

  const addLessonStep = (step: any) => {
    setLessonSteps2D(prev => [step, ...prev].slice(0, 8));
  };

  const addOverlay = (overlay: PlaneOverlay, step: any, historyLabel: string) => {
    setPlaneScene(prev => ({ ...prev, overlays: [...prev.overlays, overlay] }));
    addLessonStep(step);
    addHistory(historyLabel);
    setSelectedPointId2D(null);
  };

  const addSegmentByEdge = (fromId: string, edgeId: string, type: PlaneOverlay['type'], label: string) => {
    const edge = edges.find(item => item.id === edgeId);
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
      setPlaneScene(prev => ({
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
    if (!interactive) return;
    if (planeTool === 'move') {
      setSelectedPointId2D(pointId);
      return;
    }

    if (planeTool === 'angle-mark') {
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

    if (planeTool === 'tangent') {
      if (!planeScene.circle) {
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
          body: `Qua tiếp điểm ${pointId} kẻ tiếp tuyến vuông góc với bán kính ${planeScene.circle.center}${pointId} tại tiếp điểm đó.`
        },
        `Tiếp tuyến tại ${pointId}`
      );
      return;
    }

    if (!selectedPointId2D) {
      setSelectedPointId2D(pointId);
      return;
    }

    if (selectedPointId2D === pointId) {
      setSelectedPointId2D(null);
      return;
    }

    const first = selectedPointId2D;
    const overlay: PlaneOverlay = {
      id: `overlay-${Date.now()}`,
      type: 'segment',
      from: first,
      to: pointId,
      color: '#00f0ff',
      label: 'Nối hai đỉnh',
      dashed: false
    };
    setPlaneScene(prev => ({ ...prev, overlays: [...prev.overlays, overlay] }));
    addLessonStep({
      title: 'Nối hai điểm',
      body: `Dựng đoạn thẳng ${first}${pointId} để hình rõ quan hệ cần xét.`
    });
    addHistory(`Nối ${first} với ${pointId}`);
    setSelectedPointId2D(null);
  };

  const handleEdgeClick = (edgeId: string) => {
    if (!interactive || !selectedPointId2D) return;
    if (planeTool === 'connect-edge') {
      addSegmentByEdge(selectedPointId2D, edgeId, 'segment', 'Nối đỉnh với cạnh');
    } else if (planeTool === 'altitude') {
      addSegmentByEdge(selectedPointId2D, edgeId, 'altitude', 'Đường cao');
    } else if (planeTool === 'median') {
      addSegmentByEdge(selectedPointId2D, edgeId, 'median', 'Trung tuyến');
    } else if (planeTool === 'perpendicular') {
      addSegmentByEdge(selectedPointId2D, edgeId, 'perpendicular', 'Vuông góc');
    } else if (planeTool === 'parallel') {
      addSegmentByEdge(selectedPointId2D, edgeId, 'parallel', 'Song song');
    }
    setSelectedPointId2D(null);
  };

  const handleSvgWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    if (!interactive) return;
    event.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const zoomFactor = event.deltaY > 0 ? 1.08 : 0.92;
    const mousePoint = boardToSvgPoint(svg, viewport2D, event.clientX, event.clientY);
    setViewport2D((prev: any) => {
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
    if (!interactive) return;
    if (event.target !== event.currentTarget) return;
    setIsPanning2D(true);
    setPanAnchor2D({ clientX: event.clientX, clientY: event.clientY, viewport: viewport2D });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSvgPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return;
    if (dragPointId2D) {
      const svg = svgRef.current;
      if (!svg) return;
      const nextPoint = boardToSvgPoint(svg, viewport2D, event.clientX, event.clientY);
      setPlaneScene(prev => ({
        ...prev,
        points: prev.points.map(point => (point.id === dragPointId2D && !point.locked ? { ...point, x: nextPoint.x, y: nextPoint.y } : point))
      }));
      return;
    }

    if (!isPanning2D || !panAnchor2D) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = (event.clientX - panAnchor2D.clientX) / rect.width * panAnchor2D.viewport.width;
    const dy = (event.clientY - panAnchor2D.clientY) / rect.height * panAnchor2D.viewport.height;
    setViewport2D({
      x: panAnchor2D.viewport.x - dx,
      y: panAnchor2D.viewport.y - dy,
      width: panAnchor2D.viewport.width,
      height: panAnchor2D.viewport.height
    });
  };

  const handleSvgPointerUp = () => {
    setIsPanning2D(false);
    setPanAnchor2D(null);
    setDragPointId2D(null);
  };

  const renderOverlay = (overlay: PlaneOverlay) => {
    const geometry = deriveOverlayGeometry(planeScene, overlay);
    const mid = overlayMidpoint(planeScene, overlay);
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

  return (
    <svg
      ref={svgRef}
      viewBox={`${viewport2D.x} ${viewport2D.y} ${viewport2D.width} ${viewport2D.height}`}
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

      <rect x={viewport2D.x} y={viewport2D.y} width={viewport2D.width} height={viewport2D.height} fill="url(#plane-grid)" />
      <rect x={viewport2D.x} y={viewport2D.y} width={viewport2D.width} height={viewport2D.height} fill="url(#plane-grid-bold)" opacity="0.6" />

      {visibleCircle && circleMetrics ? (
        <circle
          cx={circleMetrics.center.x}
          cy={circleMetrics.center.y}
          r={circleMetrics.radius}
          fill={visibleCircle.fill}
          fillOpacity={visibleCircle.opacity}
          stroke="#7dd3fc"
          strokeWidth="2.5"
        />
      ) : null}

      {visiblePolygon && polygonPoints.length > 1 ? (
        <polygon
          points={polygonPoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill={visiblePolygon.fill}
          fillOpacity={visiblePolygon.opacity}
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

      {visibleOverlays.map(renderOverlay)}

      {visiblePoints.map(point => (
        <g key={point.id}>
          <circle
            cx={point.x}
            cy={point.y}
            r={selectedPointId2D === point.id ? 10 : 8}
            fill={point.locked ? '#f59e0b' : '#00f0ff'}
            fillOpacity={0.96}
            stroke="#fff"
            strokeWidth="2"
            className={interactive && planeTool === 'move' && !point.locked ? 'cursor-move' : 'cursor-pointer'}
            onPointerDown={event => {
              event.stopPropagation();
              if (interactive && planeTool === 'move' && !point.locked) {
                setDragPointId2D(point.id);
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

      {visibleCircle && circleMetrics ? (
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
          {planeScene.notation}
        </text>
      ) : null}
    </svg>
  );
};
