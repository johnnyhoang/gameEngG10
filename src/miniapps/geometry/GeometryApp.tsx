import React, { useEffect, useMemo, useState } from 'react';
import { useGeometryState } from './hooks/useGeometryState';
import { PlaneCanvas } from './components/PlaneCanvas';
import { SolidCanvas } from './components/SolidCanvas';
import { StudioControls } from './components/StudioControls';
import { StepWalkthrough } from './components/StepWalkthrough';
import { CommandConsole } from './components/CommandConsole';
import { supabase } from '../../utils/supabaseClient';
import {
  Sparkles,
  RotateCcw
} from 'lucide-react';
import {
  createDefaultScene as createDefaultScene2D
} from './utils/planeMath';
import type { PlaneScene, PlaneAiResult } from './utils/planeMath';
import {
  buildShape as buildShape3D,
  detectShape as detectShape3D,
  extractCylinderEvidence,
  buildAnnotationsFromAiResult,
  buildBaseSteps as buildBaseSteps3D,
  VIEW_PRESETS,
  SHAPE_LABELS,
  parse3DProblemText
} from './utils/solidMath';
import type { ShapeKind, AiGeometryResult } from './utils/solidMath';

export type GeometryMode = 'studio' | 'solve' | 'widget';
export type GeometryDimension = '2d' | '3d' | 'auto';

export interface GeometryAppProps {
  mode: GeometryMode;
  dimension?: GeometryDimension;
  problemText?: string;
  initialScene?: any;
  interactive?: boolean;
  uiTheme?: string;
  onSceneChange?: (scene: any) => void;
  onComplete?: (result: { stepsViewed: number; timeSpent: number; actionsCount: number }) => void;
}



export const GeometryApp: React.FC<GeometryAppProps> = ({
  mode,
  dimension = 'auto',
  problemText = '',
  initialScene: _initialScene,
  interactive = true,
  uiTheme: _uiTheme,
  onSceneChange: _onSceneChange,
  onComplete: _onComplete
}) => {
  const {
    planeScene,
    setPlaneScene,
    setHistory2D,
    setLessonSteps2D,
    setCurrentStep2D,
    maxStep2D,
    setMaxStep2D,
    setAnalysisStatus2D,
    setAnalysisError2D,
    analysisStatus2D,
    analysisError2D,

    manualShape3D,
    setManualShape3D,
    autoResolve3D,
    setAutoResolve3D,
    yaw3D,
    pitch3D,
    zoom3D,
    setYaw3D,
    setPitch3D,
    setZoom3D,
    setPanX3D,
    setPanY3D,
    history3D,
    setHistory3D,
    activeStepIndex3D,
    setActiveStepIndex3D,
    setIsPlaying3D,
    setAnalysisStatus3D,
    setAnalysisError3D,
    analysisStatus3D,
    analysisError3D,

    resetStore
  } = useGeometryState();

  const [prompt, setPrompt] = useState(problemText);
  const [activeDim, setActiveDim] = useState<'2d' | '3d'>('2d');

  // Khởi tạo/dọn dẹp store
  useEffect(() => {
    resetStore();
    setPrompt(problemText);
  }, [problemText, resetStore]);

  // Phân tích dimension
  useEffect(() => {
    if (dimension === '2d') {
      setActiveDim('2d');
    } else if (dimension === '3d') {
      setActiveDim('3d');
    } else {
      // auto dimension
      const normalized = prompt.toLowerCase();
      const is3DKeyword = normalized.includes('hinh chop') ||
        normalized.includes('hinh hop') ||
        normalized.includes('lang tru') ||
        normalized.includes('tu dien') ||
        normalized.includes('hinh tru') ||
        normalized.includes('hinh non') ||
        normalized.includes('hinh cau');
      setActiveDim(is3DKeyword ? '3d' : '2d');
    }
  }, [dimension, prompt]);

  // Setup default 2D scene dựa vào từ khoá đề bài
  useEffect(() => {
    if (activeDim !== '2d') return;
    const normalized = prompt.toLowerCase();
    if (!normalized.trim()) return;

    let nextKind: 'triangle' | 'quadrilateral' | 'circle' = 'triangle';
    if (normalized.includes('duong tron') || normalized.includes('circle')) nextKind = 'circle';
    else if (normalized.includes('tu giac') || normalized.includes('hinh thang')) nextKind = 'quadrilateral';

    setPlaneScene(prev => {
      if (prev.figureKind === nextKind) return prev;
      return createDefaultScene2D(nextKind);
    });
  }, [prompt, activeDim, setPlaneScene]);

  // Logic 3D Model
  const detectedShape3D = useMemo(() => detectShape3D(prompt), [prompt]);
  const cylinderEvidence = useMemo(() => extractCylinderEvidence(prompt), [prompt]);
  const shape3D = autoResolve3D && detectedShape3D ? detectedShape3D : manualShape3D;
  const model3D = useMemo(() => buildShape3D(shape3D, cylinderEvidence), [cylinderEvidence, shape3D]);
  const baseSteps3D = useMemo(() => buildBaseSteps3D(shape3D, model3D, prompt), [model3D, prompt, shape3D]);

  const { overlayAnnotations3D, commandSteps3D } = useMemo(() => {
    const combinedAnnotations: any[] = [];
    const combinedSteps: any[] = [];
    history3D.forEach(item => {
      combinedAnnotations.push(...item.annotations);
      combinedSteps.push(...item.steps);
    });
    return { overlayAnnotations3D: combinedAnnotations, commandSteps3D: combinedSteps };
  }, [history3D]);

  const fullSteps3D = useMemo(() => [...baseSteps3D, ...commandSteps3D], [baseSteps3D, commandSteps3D]);

  // Gọi AI soi đề 2D
  const handleAiAnalyze2D = async () => {
    const text = prompt.trim();
    if (!text) {
      setAnalysisStatus2D('error');
      setAnalysisError2D('Nhập nguyên văn đề bài trước khi phân tích.');
      return;
    }

    try {
      setAnalysisStatus2D('loading');
      setAnalysisError2D('');
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error('Chưa có phiên đăng nhập Supabase.');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/geometry-plane`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || ''
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
        title: result.scene?.polygon ? result.title : planeScene.title,
        notation: result.scene?.polygon ? result.title : planeScene.notation,
        points: result.scene?.points?.length ? result.scene.points : planeScene.points,
        polygon: result.scene?.polygon || planeScene.polygon,
        circle: result.scene?.circle || planeScene.circle,
        overlays: result.scene?.overlays?.map((overlay, index) => ({
          id: `ai-overlay-${Date.now()}-${index}`,
          type: overlay.type as any,
          from: overlay.from,
          to: overlay.to,
          at: overlay.at,
          color: overlay.color || '#00f0ff',
          label: overlay.label || '',
          dashed: overlay.dashed,
          stepIndex: overlay.stepIndex
        })) || planeScene.overlays
      };

      setPlaneScene(nextScene);
      const steps = result.stepByStep.length > 0 ? result.stepByStep : [{ title: 'Soi đề AI', body: result.summary, command: result.summary }];
      setLessonSteps2D(steps);
      setMaxStep2D(steps.length - 1);
      setCurrentStep2D(0);
      setHistory2D(prev => [result.summary || 'AI phân tích hoàn tất.', ...prev]);
      setAnalysisStatus2D('success');
    } catch (error: any) {
      setAnalysisStatus2D('error');
      setAnalysisError2D(error.message || 'Không thể gọi AI phân tích hình.');
    }
  };

  // Gọi AI soi đề 3D
  const handleAiAnalyze3D = async () => {
    const text = prompt.trim();
    if (!text) {
      setAnalysisError3D('Nhập nguyên văn đề bài trước khi phân tích.');
      setAnalysisStatus3D('error');
      return;
    }

    try {
      setAnalysisStatus3D('loading');
      setAnalysisError3D('');
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error('Chưa có phiên đăng nhập Supabase.');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/geometry-3d`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Profile-Id': localStorage.getItem('ge10_selected_profile_id') || ''
        },
        body: JSON.stringify({ problemText: text, subjectHint: 'math', shapeHint: shape3D })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Phân tích AI thất bại.');
      }

      const data = await res.json() as { success: boolean; result: AiGeometryResult };
      const result = data.result;
      if (!result) throw new Error('AI chưa trả về dữ liệu phân tích.');

      const { annotations, steps } = buildAnnotationsFromAiResult(result, model3D, history3D.length + 1);
      const mergedSteps = steps.length > 0 ? steps : [{
        title: result.title || 'Phân tích AI',
        body: result.summary || 'AI đã phân tích đề bài.',
        focus: [],
        annotationIds: annotations.map(item => item.id)
      }];

      const item = {
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
        setManualShape3D(result.detectedShape);
        setAutoResolve3D(true);
      }

      setHistory3D(prev => [...prev, item]);
      setActiveStepIndex3D(baseSteps3D.length + history3D.length);
      setIsPlaying3D(false);
      setAnalysisStatus3D('success');
    } catch (error: any) {
      console.warn('Lỗi gọi AI phân tích 3D, sử dụng bộ phân tích quy tắc dự phòng:', error.message);
      const fallbackResult = parse3DProblemText(text, shape3D);
      const item = {
        id: `fallback-${Date.now()}`,
        text,
        summary: `Hệ thống đã tự động phân tích và chia nhỏ đề bài thành các bước vẽ.`,
        annotations: fallbackResult.annotations,
        steps: fallbackResult.steps
      };
      setManualShape3D(fallbackResult.detectedShape);
      setAutoResolve3D(true);
      setHistory3D(prev => [...prev, item]);
      setActiveStepIndex3D(baseSteps3D.length + history3D.length);
      setIsPlaying3D(false);
      setAnalysisStatus3D('success');
    }
  };

  const handleAiAnalyze = () => {
    if (activeDim === '2d') {
      handleAiAnalyze2D();
    } else {
      handleAiAnalyze3D();
    }
  };

  const applyPreset3D = (preset: 'iso' | 'front' | 'top' | 'side') => {
    const next = VIEW_PRESETS[preset];
    setYaw3D(next.yaw);
    setPitch3D(next.pitch);
    setZoom3D(next.zoom);
    setPanX3D(next.panX);
    setPanY3D(next.panY);
  };

  const resetAll = () => {
    resetStore();
    if (activeDim === '3d') {
      applyPreset3D('iso');
    }
  };

  // --- RENDER WIDGET MODE (Tối giản trong Quiz) ---
  if (mode === 'widget') {
    const currentStepObj = activeDim === '3d' ? fullSteps3D[activeStepIndex3D] : undefined;

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Hình minh họa {activeDim === '2d' ? '2D Phẳng' : '3D Không gian'}</span>
          {activeDim === '3d' && (
            <div className="flex gap-1.5">
              {(['iso', 'front', 'side'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => applyPreset3D(p)}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-white uppercase cursor-pointer"
                >
                  {p === 'iso' ? 'Xiên' : p === 'front' ? 'Thẳng' : 'Cạnh'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative border border-white/10 rounded-2xl bg-black/40 overflow-hidden">
          {activeDim === '2d' ? (
            <PlaneCanvas interactive={interactive} />
          ) : (
            <SolidCanvas
              model={model3D}
              overlayAnnotations={overlayAnnotations3D}
              currentStep={currentStepObj}
              interactive={interactive}
            />
          )}
        </div>

        {/* Nút lật xem các bước vẽ gọn nhẹ dưới Canvas */}
        {activeDim === '2d' && maxStep2D >= 0 && (
          <StepWalkthrough dimension="2d" steps={planeScene.overlays} />
        )}
        {activeDim === '3d' && fullSteps3D.length > 0 && (
          <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300">
            <span>Bước giải {activeStepIndex3D + 1}/{fullSteps3D.length}: <strong className="text-white">{currentStepObj?.title}</strong></span>
            <div className="flex gap-1">
              <button
                onClick={() => setActiveStepIndex3D(prev => Math.max(0, prev - 1))}
                disabled={activeStepIndex3D <= 0}
                className="px-2 py-1 rounded bg-white/5 disabled:opacity-30 cursor-pointer"
              >
                Trước
              </button>
              <button
                onClick={() => setActiveStepIndex3D(prev => Math.min(fullSteps3D.length - 1, prev + 1))}
                disabled={activeStepIndex3D >= fullSteps3D.length - 1}
                className="px-2 py-1 rounded bg-white/5 disabled:opacity-30 cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RENDER SOLVE / STUDIO MODES ---


  return (
    <div className="glass-panel rounded-3xl border border-synth-cyan/20 p-5 md:p-6 space-y-5 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,113,133,0.10),transparent_28%)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="space-y-1.5 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-synth-cyan" />
            <h3 className="font-orbitron font-black uppercase tracking-wider text-sm md:text-base">
              Phòng Thí Nghiệm Hình Học {activeDim === '2d' ? '2D' : '3D'}
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Dựng hình, kéo thả, kẻ đường phụ và xem phân tích lời giải trực quan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDim('2d')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase transition-colors cursor-pointer ${
              activeDim === '2d' ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'
            }`}
          >
            2D Phẳng
          </button>
          <button
            onClick={() => setActiveDim('3d')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase transition-colors cursor-pointer ${
              activeDim === '3d' ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'
            }`}
          >
            3D Không gian
          </button>
        </div>
      </div>

      {/* Editor / Studio Controls (Chỉ hiện ở mode="studio") */}
      {mode === 'studio' && (
        <div className="space-y-3">
          <StudioControls dimension={activeDim} />
          {activeDim === '3d' && (
            <div className="flex justify-between items-center flex-wrap gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase">{SHAPE_LABELS[shape3D]?.label}</span>
                <span className="text-slate-400">Mã: {model3D.notation}</span>
              </div>
              <div className="flex gap-2">
                {(['iso', 'front', 'top', 'side'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => applyPreset3D(p)}
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[11px] text-white hover:bg-white/10 cursor-pointer"
                  >
                    {p === 'iso' ? 'Xiên' : p === 'front' ? 'Chính diện' : p === 'top' ? 'Từ trên' : 'Từ bên'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Canvas + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-5 items-start">
        {/* Canvas Column */}
        <div className="space-y-4">
          <div className="relative border border-white/10 rounded-2xl bg-black/40 overflow-hidden">
            {activeDim === '2d' ? (
              <PlaneCanvas interactive={interactive} />
            ) : (
              <SolidCanvas
                model={model3D}
                overlayAnnotations={overlayAnnotations3D}
                currentStep={fullSteps3D[activeStepIndex3D]}
                interactive={interactive}
              />
            )}

            {/* 3D sliders (Chỉ ở studio mode 3D) */}
            {mode === 'studio' && activeDim === '3d' && (
              <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 bg-black/70 border border-white/10 p-2.5 rounded-xl text-[10px] text-slate-400">
                <label className="flex flex-col gap-1">
                  <span>Xoay ngang ({yaw3D}°)</span>
                  <input type="range" min="-180" max="180" value={yaw3D} onChange={e => setYaw3D(Number(e.target.value))} className="w-full h-1" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Xoay dọc ({pitch3D}°)</span>
                  <input type="range" min="-90" max="90" value={pitch3D} onChange={e => setPitch3D(Number(e.target.value))} className="w-full h-1" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Thu phóng ({zoom3D.toFixed(1)}x)</span>
                  <input type="range" min="0.7" max="1.8" step="0.05" value={zoom3D} onChange={e => setZoom3D(Number(e.target.value))} className="w-full h-1" />
                </label>
              </div>
            )}
          </div>

          {/* 3D Reset (Chỉ ở studio mode) */}
          {mode === 'studio' && (
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-synth-orange/20 bg-synth-orange/10 text-synth-orange text-xs font-orbitron font-bold uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset bảng vẽ
            </button>
          )}

          {/* StepWalkthrough for 2D */}
          {activeDim === '2d' && maxStep2D >= 0 && (
            <StepWalkthrough dimension="2d" steps={planeScene.overlays} />
          )}

          {/* Command Console (Chỉ ở studio/solve mode) */}
          <CommandConsole dimension={activeDim} model3D={activeDim === '3d' ? model3D : undefined} />

        </div>

        {/* Sidebar Column: AI Prompt & Walkthrough */}
        <aside className="space-y-4">
          {/* Nhập đề bài & Soi AI */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.26em] text-slate-400 font-bold">Soi đề bài toán</span>
              <button
                onClick={handleAiAnalyze}
                disabled={analysisStatus2D === 'loading' || analysisStatus3D === 'loading'}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-synth-cyan to-synth-green px-3.5 py-2 text-xs font-black uppercase tracking-wider text-black cursor-pointer disabled:opacity-50"
              >
                {analysisStatus2D === 'loading' || analysisStatus3D === 'loading' ? 'Đang soi...' : 'Soi AI'}
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Ví dụ: Cho tam giác ABC, kẻ đường cao AH..."
              className="w-full min-h-[100px] rounded-2xl border border-white/10 bg-synth-gray/25 p-3 text-xs text-white outline-none focus:border-synth-cyan/40 resize-y"
            />
            {activeDim === '3d' && mode === 'studio' && (
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <label className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Chọn hình chóp/lăng trụ</span>
                  <select
                    value={manualShape3D}
                    onChange={e => { setManualShape3D(e.target.value as ShapeKind); setAutoResolve3D(false); }}
                    className="rounded-xl border border-white/10 bg-synth-gray/25 p-2 text-xs text-white outline-none"
                  >
                    <option value="prism">Lăng trụ tam giác</option>
                    <option value="cuboid">Hình hộp chữ nhật</option>
                    <option value="pyramid">Hình chóp</option>
                    <option value="tetrahedron">Tứ diện</option>
                    <option value="cylinder">Hình trụ</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1 justify-end">
                  <button
                    onClick={() => setAutoResolve3D(!autoResolve3D)}
                    className={`w-full rounded-xl border p-2 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      autoResolve3D ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'
                    }`}
                  >
                    {autoResolve3D ? 'Đang tự nhận dạng' : 'Nhận dạng tay'}
                  </button>
                </label>
              </div>
            )}
            {analysisError2D || analysisError3D ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {activeDim === '2d' ? analysisError2D : analysisError3D}
              </div>
            ) : null}
          </div>

          {/* Lời giải từng bước (3D) hoặc danh sách bước (2D) */}
          {activeDim === '3d' && (
            <div className="glass-panel rounded-2xl border border-white/10 p-4 space-y-3">
              <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lời giải không gian</div>
              <StepWalkthrough dimension="3d" steps={fullSteps3D} />
            </div>
          )}

          {activeDim === '2d' && (
            <div className="glass-panel rounded-2xl border border-white/10 p-4 space-y-3">
              <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold font-orbitron">Lời giải phẳng</div>
              <div className="space-y-3 max-h-[300px] overflow-auto pr-1">
                {planeScene.overlays.length > 0 ? (
                  planeScene.overlays.map((step, index) => (
                    <div key={`${step.id}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-[10px] uppercase tracking-[0.24em] text-synth-cyan font-bold">Bước {index + 1}</div>
                      <div className="text-sm font-semibold text-white mt-1">{step.label || 'Vẽ nét'}</div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{step.from ? `Nối từ ${step.from}` : ''} {step.to ? `đến ${step.to}` : ''}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">Nhập đề bài hình học phẳng rồi bấm "Soi AI" hoặc tự dựng hình bằng thanh công cụ.</div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
