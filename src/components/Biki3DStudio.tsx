// ============================================================
// Biki3DStudio.tsx — Component chính, rút gọn sau refactor 4.3
// Chỉ quản lý: UI layout, state xoay/zoom, AI Geometry Chat,
// Command CLI, Step Walkthrough Player.
// Toán học 3D → shapeGenerators.ts | Canvas → Canvas3D.tsx
// ============================================================

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Circle, Layers3, Move3D, Pause, Play, RotateCcw, Ruler, Sparkles, Square, Triangle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import type {
  AiGeometryResult,
  Biki3DStudioProps,
  CommandHistoryItem,
  LessonStep,
  OverlayAnnotation,
  ShapeKind,
  ViewPreset
} from './3d/types';
import { VIEW_PRESETS } from './3d/types';
import {
  SHAPE_LABELS,
  buildAnnotationsFromAiResult,
  buildBaseSteps,
  buildShape,
  detectShape,
  extractCylinderEvidence,
  formatNumber,
  normalizeVertexId,
  parse3DProblemText,
  parseCommand,
  stripVietnamese
} from './3d/shapeGenerators';
import { Canvas3D } from './3d/Canvas3D';

// ---- Icon map cho các loại hình ----
const SHAPE_ICONS: Record<ShapeKind, React.ReactNode> = {
  prism: <Layers3 className="w-4 h-4" />,
  cuboid: <Square className="w-4 h-4" />,
  pyramid: <Triangle className="w-4 h-4" />,
  tetrahedron: <Move3D className="w-4 h-4" />,
  cylinder: <Circle className="w-4 h-4" />
};

export { parse3DProblemText };

export function Biki3DStudio({ problemText }: Biki3DStudioProps) {
  const detectedShape = detectShape(problemText);
  const cylinderEvidence = useMemo(() => extractCylinderEvidence(problemText), [problemText]);
  const [manualShape, setManualShape] = useState<ShapeKind>('pyramid');
  const [autoResolve, setAutoResolve] = useState(true);

  // Trạng thái góc nhìn
  const [yaw, setYaw] = useState(32);
  const [pitch, setPitch] = useState(-22);
  const [roll, setRoll] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Trạng thái UI và tương tác
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

  useEffect(() => { setPrompt(problemText); }, [problemText]);
  useEffect(() => { setActiveStepIndex(0); }, [shape, prompt]);
  useEffect(() => { setPickedVertex(null); setPickedVertices([]); }, [boardTool]);

  const baseSteps = useMemo(() => buildBaseSteps(shape, model, prompt), [model, prompt, shape]);

  const { overlayAnnotations, commandSteps } = useMemo(() => {
    const combinedAnnotations: OverlayAnnotation[] = [];
    const combinedSteps: LessonStep[] = [];
    history.forEach(item => {
      combinedAnnotations.push(...item.annotations);
      combinedSteps.push(...item.steps);
    });
    return { overlayAnnotations: combinedAnnotations, commandSteps: combinedSteps };
  }, [history]);

  const fullSteps = useMemo(() => [...baseSteps, ...commandSteps], [baseSteps, commandSteps]);
  const currentStep = fullSteps[Math.min(activeStepIndex, Math.max(fullSteps.length - 1, 0))];

  // Bộ đếm giờ tự động phát từng bước
  useEffect(() => {
    if (!isPlaying) return;
    playTimerRef.current = window.setInterval(() => {
      setActiveStepIndex(prev => {
        const next = prev + 1;
        return next >= fullSteps.length ? 0 : next;
      });
    }, 1400);
    return () => {
      if (playTimerRef.current) window.clearInterval(playTimerRef.current);
    };
  }, [isPlaying, fullSteps.length]);

  // ---- Prompt hints ----
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

  // ---- Problem summary ----
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

  // ---- Handlers ----

  const appendHistoryItem = (item: CommandHistoryItem, focusLastStep = true) => {
    setHistory(prev => [...prev, item]);
    if (focusLastStep) {
      setActiveStepIndex(baseSteps.length + history.length);
    }
    setIsPlaying(false);
  };

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
      if (!token) throw new Error('Chưa có phiên đăng nhập Supabase.');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/geometry-3d`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || '' },
        body: JSON.stringify({ problemText: text, subjectHint: 'math', shapeHint: shape })
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

  const handleVertexClick = useCallback((vertexId: string) => {
    if (boardTool === 'vertex-vertex') {
      if (!pickedVertex) { setPickedVertex(vertexId); return; }
      if (pickedVertex === vertexId) { setPickedVertex(null); return; }
      const from = pickedVertex;
      const to = vertexId;
      const itemId = `manual-${Date.now()}`;
      const annotation: OverlayAnnotation = {
        id: `${itemId}-a1`,
        type: 'line',
        title: `${from} nối ${to}`,
        body: `Nối đỉnh ${from} với đỉnh ${to} bằng công cụ thủ công.`,
        from, to,
        color: '#00f0ff', opacity: 1, dashed: false
      };
      createManualConstruction(
        `Nối đỉnh ${from} với đỉnh ${to}`,
        [annotation],
        [{ title: 'Nối hai đỉnh', body: `Dựng đoạn thẳng từ ${from} đến ${to}. Đây là thao tác cơ bản để dựng cạnh, đường chéo hoặc đường phụ.`, focus: [from, to], annotationIds: [annotation.id] }]
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
          addManualFaceByVertices(next, `Mặt phẳng qua ${next.join(', ')}`, `Tô nổi mặt phẳng đi qua ba điểm ${next.join(', ')} để học sinh dễ theo dõi và trình bày.`, '#22c55e');
          return [];
        }
        return next;
      });
    }
  }, [boardTool, pickedVertex]);

  const handleEdgeClick = useCallback((from: string, to: string) => {
    if ((boardTool !== 'vertex-edge' && boardTool !== 'perpendicular') || !pickedVertex) return;
    const edgeId = `${normalizeVertexId(from)}${normalizeVertexId(to)}`;
    const isPerpendicular = boardTool === 'perpendicular';
    const annotation: OverlayAnnotation = {
      id: `manual-${Date.now()}-a1`,
      type: 'line',
      title: isPerpendicular ? `Vuông góc từ ${pickedVertex}` : `${pickedVertex} tới cạnh ${edgeId}`,
      body: isPerpendicular ? `Dựng đường vuông góc từ ${pickedVertex} xuống cạnh ${edgeId}.` : `Nối đỉnh ${pickedVertex} tới cạnh ${edgeId} bằng trung điểm của cạnh.`,
      from: pickedVertex, to: `EDGE:${edgeId}`,
      color: isPerpendicular ? '#00f0ff' : '#f59e0b', opacity: 1, dashed: true
    };
    const marker: OverlayAnnotation = {
      id: `manual-${Date.now()}-a2`,
      type: 'marker',
      title: isPerpendicular ? 'Vuông góc' : 'Trung điểm',
      body: isPerpendicular ? `Đánh dấu chân đường vuông góc trên cạnh ${edgeId}.` : `Đánh dấu trung điểm của cạnh ${edgeId}.`,
      at: `EDGE:${edgeId}`,
      color: isPerpendicular ? '#ffffff' : '#f8fafc', opacity: 1, dashed: isPerpendicular
    };
    createManualConstruction(
      isPerpendicular ? `Vẽ đường vuông góc từ ${pickedVertex} xuống cạnh ${edgeId}` : `Nối đỉnh ${pickedVertex} tới cạnh ${edgeId}`,
      [annotation, marker],
      [{ title: isPerpendicular ? 'Vẽ vuông góc' : 'Nối đỉnh với cạnh', body: isPerpendicular ? `Chọn đỉnh ${pickedVertex}, sau đó bấm cạnh ${edgeId} để dựng đường vuông góc.` : `Chọn đỉnh ${pickedVertex}, sau đó nối đến cạnh ${edgeId} để hỗ trợ dựng mặt phẳng hoặc chứng minh.`, focus: [pickedVertex, edgeId], annotationIds: [annotation.id, marker.id] }]
    );
    setPickedVertex(null);
  }, [boardTool, pickedVertex]);

  const resetScene = () => {
    setHistory([]);
    setCommandText('');
    setActiveStepIndex(0);
    setYaw(VIEW_PRESETS.iso.yaw);
    setPitch(VIEW_PRESETS.iso.pitch);
    setRoll(VIEW_PRESETS.iso.roll);
    setZoom(VIEW_PRESETS.iso.zoom);
    setPanX(0); setPanY(0);
    setIsPlaying(false);
    setPickedVertex(null);
    setBoardTool('ai');
    setAnalysisStatus('idle');
    setAnalysisError('');
  };

  const applyPreset = (preset: ViewPreset) => {
    const next = VIEW_PRESETS[preset];
    setYaw(next.yaw); setPitch(next.pitch); setRoll(next.roll);
    setZoom(next.zoom); setPanX(next.panX); setPanY(next.panY);
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="space-y-6">
      {/* ---- Header & controls ---- */}
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

          {/* View presets */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            {(['iso', 'front', 'top', 'side'] as const).map((preset, i) => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-orbitron font-bold uppercase tracking-wider text-white hover:bg-white/10 cursor-pointer"
              >
                {['Xiên chuẩn', 'Chính diện', 'Từ trên', 'Từ cạnh'][i]}
              </button>
            ))}
          </div>
        </div>

        {/* Nhập đề & chọn hình */}
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
              onChange={e => { setManualShape(e.target.value as ShapeKind); setAutoResolve(false); }}
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
              className={`w-full rounded-2xl border px-4 py-3 text-xs font-orbitron font-bold uppercase tracking-wider cursor-pointer ${autoResolve ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'}`}
            >
              {autoResolve ? 'Đang tự nhận dạng' : 'Bật tự nhận dạng'}
            </button>
          </label>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-white font-orbitron font-black uppercase text-sm tracking-wider">
                {SHAPE_ICONS[shape]}
                {SHAPE_LABELS[shape].label}
              </div>
              <div className="text-xs text-slate-300">Mã hình: <span className="text-white font-semibold">{model.notation}</span></div>
              <div className="text-xs text-slate-300">Điểm có sẵn: <span className="text-white font-semibold">{model.vertices.map(v => v.id).join(', ')}</span></div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Mẹo lệnh: <span className="text-white">"vẽ đường cao từ S"</span>, <span className="text-white">"nối trung điểm BC với đỉnh S"</span>, <span className="text-white">"tô màu mặt ABCD"</span>, <span className="text-white">"vẽ OM vuông góc AB"</span>.
            </div>
          </div>
        </div>
      </section>

      {/* ---- Canvas + Sidebar ---- */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)] gap-6 items-start">
        <div className="space-y-4">
          {/* SVG Canvas 3D */}
          <div className="glass-panel rounded-2xl border border-white/10 p-4">
            <Canvas3D
              model={model}
              yaw={yaw}
              pitch={pitch}
              roll={roll}
              zoom={zoom}
              panX={panX}
              panY={panY}
              overlayAnnotations={overlayAnnotations}
              currentStep={currentStep}
              boardTool={boardTool}
              pickedVertex={pickedVertex}
              pickedVertices={pickedVertices}
              onVertexClick={handleVertexClick}
              onEdgeClick={handleEdgeClick}
            />
          </div>

          {/* Thanh điều khiển xoay/zoom */}
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

          {/* AI Command Box */}
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

            {/* Board tools */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bảng vẽ nhanh:</span>
                {([
                  ['ai', 'AI', 'synth-cyan'],
                  ['vertex-vertex', 'Đỉnh → đỉnh', 'synth-cyan'],
                  ['vertex-edge', 'Đỉnh → cạnh', 'synth-orange'],
                  ['perpendicular', 'Vuông góc', 'synth-magenta'],
                  ['plane-3p', 'Mặt phẳng 3 điểm', 'synth-green']
                ] as const).map(([tool, label, color]) => (
                  <button
                    key={tool}
                    onClick={() => { setBoardTool(tool as typeof boardTool); setPickedVertex(null); if (tool !== 'plane-3p') setPickedVertices([]); }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer ${boardTool === tool ? `border-${color}/30 bg-${color}/10 text-${color}` : 'border-white/10 bg-white/5 text-white'}`}
                  >
                    {label}
                  </button>
                ))}
                {pickedVertex && (
                  <span className="text-[10px] font-bold text-synth-orange uppercase tracking-wider">Đã chọn: {pickedVertex}</span>
                )}
                {boardTool === 'plane-3p' && pickedVertices.length > 0 && (
                  <span className="text-[10px] font-bold text-synth-green uppercase tracking-wider">Đang chọn: {pickedVertices.join(', ')}</span>
                )}
              </div>
            </div>

            {/* Command input */}
            <div className="mt-4 flex flex-col md:flex-row gap-3">
              <input
                value={commandText}
                onChange={e => setCommandText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runCommand()}
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
            <div className="mt-3 text-[10px] text-slate-400">Mẹo: dùng tên đỉnh đang xuất hiện trên hình. Nếu đề có ghi ký hiệu khác, nhập đúng theo đề gốc.</div>

            {/* Prompt hints */}
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Mẹo nhanh từ đề</div>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-200 leading-relaxed">
                {promptHints.map(hint => (
                  <li key={hint} className="flex gap-2">
                    <span className="text-synth-cyan">•</span>
                    <span>{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analysis status */}
            {analysisStatus === 'error' && analysisError && (
              <div className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">{analysisError}</div>
            )}
            {analysisStatus === 'success' && (
              <div className="mt-3 rounded-2xl border border-synth-green/20 bg-synth-green/10 p-3 text-xs text-synth-green">
                AI đã phân tích xong và cập nhật lời giải lên bảng.
              </div>
            )}
          </div>
        </div>

        {/* ---- Sidebar: Lời giải từng bước + Lịch sử ---- */}
        <aside className="space-y-4">
          <div className="glass-panel rounded-2xl border border-white/10 p-4 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Ruler className="w-5 h-5 text-synth-cyan" />
              <h3 className="font-orbitron font-black uppercase tracking-wider text-sm">Lời giải từng bước</h3>
            </div>
            {fullSteps.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bước {activeStepIndex + 1}/{fullSteps.length}</div>
                  <h4 className="mt-2 text-base font-orbitron font-black text-white uppercase tracking-wider">{currentStep?.title}</h4>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">{currentStep?.body}</p>
                  {currentStep?.focus && currentStep.focus.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentStep.focus.map(item => (
                        <span key={item} className="px-2.5 py-1 rounded-full border border-white/10 bg-synth-blue/30 text-[10px] font-semibold text-white">{item}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))} className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer">Trước</button>
                  <button onClick={() => setActiveStepIndex(prev => Math.min(fullSteps.length - 1, prev + 1))} className="px-3 py-2 rounded-xl border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-xs font-bold uppercase tracking-wider cursor-pointer">Sau</button>
                </div>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {fullSteps.map((step, index) => (
                    <button
                      key={`${step.title}-${index}`}
                      onClick={() => setActiveStepIndex(index)}
                      className={`w-full text-left rounded-2xl border p-3 cursor-pointer transition-colors ${index === activeStepIndex ? 'border-synth-cyan/30 bg-synth-cyan/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bước {index + 1}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{step.title}</div>
                      <div className="mt-1 text-xs text-slate-300 line-clamp-2">{step.body}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-300">Chưa có bước giải nào. Nhập lệnh để AI sinh ra từng bước dựng hình và trình bày.</div>
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
              <div className="text-sm text-slate-300">Chưa có lệnh nào. Nhập thử kiểu "vẽ đường cao từ S" để khởi động.</div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
