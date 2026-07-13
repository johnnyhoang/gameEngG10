import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  LineChart,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

type GraphKind = 'linear' | 'quadratic' | 'unknown';

interface GraphStep {
  title: string;
  body: string;
}

interface GraphFeature {
  label: string;
  x: number;
  y: number;
}

interface GraphAiResult {
  functionKind: GraphKind;
  title: string;
  summary: string;
  assumptions: string[];
  stepByStep: GraphStep[];
  coefficients: {
    a?: number;
    b?: number;
    c?: number;
    m?: number;
    n?: number;
  };
  commands: string[];
  warnings: string[];
}

interface BikiDoThiHamSoProps {
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

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return '0';
  const rounded = Math.abs(value) < 1e-9 ? 0 : value;
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2).replace(/\.?0+$/, '');
}

function evaluateLinear(m: number, n: number, x: number) {
  return m * x + n;
}

function evaluateQuadratic(a: number, b: number, c: number, x: number) {
  return a * x * x + b * x + c;
}

function solveQuadratic(a: number, b: number, c: number) {
  if (Math.abs(a) < 1e-9) return [];
  const delta = b * b - 4 * a * c;
  if (delta < 0) return [];
  if (Math.abs(delta) < 1e-9) return [-b / (2 * a)];
  const root = Math.sqrt(delta);
  return [(-b - root) / (2 * a), (-b + root) / (2 * a)];
}

function boardToSvgPoint(svg: SVGSVGElement, viewport: { xMin: number; xMax: number; yMin: number; yMax: number }, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  const x = viewport.xMin + ((clientX - rect.left) / rect.width) * (viewport.xMax - viewport.xMin);
  const y = viewport.yMax - ((clientY - rect.top) / rect.height) * (viewport.yMax - viewport.yMin);
  return { x, y };
}

function toScreenPoint(x: number, y: number, viewport: { xMin: number; xMax: number; yMin: number; yMax: number }) {
  return {
    sx: ((x - viewport.xMin) / (viewport.xMax - viewport.xMin)) * BOARD_WIDTH,
    sy: BOARD_HEIGHT - ((y - viewport.yMin) / (viewport.yMax - viewport.yMin)) * BOARD_HEIGHT
  };
}

export function BikiDoThiHamSo({ problemText = '' }: BikiDoThiHamSoProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [prompt, setPrompt] = useState(problemText);
  const [commandText, setCommandText] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [analysisError, setAnalysisError] = useState('');
  const [graphKind, setGraphKind] = useState<GraphKind>('quadratic');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [m, setM] = useState(1);
  const [n, setN] = useState(0);
  const [showFeatures, setShowFeatures] = useState(true);
  const [lessonSteps, setLessonSteps] = useState<GraphStep[]>([
    { title: 'Bắt đầu', body: 'Nhập đề bài hoặc dùng slider để xem đồ thị biến đổi ngay lập tức.' }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [range, setRange] = useState({ xMin: -8, xMax: 8, yMin: -6, yMax: 6 });
  const [isPanning, setIsPanning] = useState(false);
  const [panAnchor, setPanAnchor] = useState<{ clientX: number; clientY: number; range: typeof range } | null>(null);

  const { xMin, xMax, yMin, yMax } = range;

  useEffect(() => {
    setPrompt(problemText);
  }, [problemText]);

  useEffect(() => {
    const normalized = stripVietnamese(prompt).toLowerCase();
    if (!normalized.trim()) return;
    if (normalized.includes('bac nhat') || normalized.includes('y = mx + n') || normalized.includes('duong thang')) {
      setGraphKind('linear');
      return;
    }
    if (normalized.includes('bac hai') || normalized.includes('parabol') || normalized.includes('y = ax^2')) {
      setGraphKind('quadratic');
    }
  }, [prompt]);

  const addHistory = (entry: string) => {
    setHistory(prev => [entry, ...prev].slice(0, 8));
  };

  const addStep = (step: GraphStep) => {
    setLessonSteps(prev => [step, ...prev].slice(0, 8));
  };

  const handleAnalyze = async () => {
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
      const res = await fetch(`${backendUrl}/api/ai/function-graph`, {
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
        throw new Error(errData.error || 'Phân tích AI thất bại.');
      }

      const data = await res.json() as { success: boolean; result: GraphAiResult };
      const result = data.result;
      if (!result) throw new Error('AI chưa trả về dữ liệu phân tích.');

      setGraphKind(result.functionKind || 'unknown');
      if (typeof result.coefficients.a === 'number') setA(result.coefficients.a);
      if (typeof result.coefficients.b === 'number') setB(result.coefficients.b);
      if (typeof result.coefficients.c === 'number') setC(result.coefficients.c);
      if (typeof result.coefficients.m === 'number') setM(result.coefficients.m);
      if (typeof result.coefficients.n === 'number') setN(result.coefficients.n);

      setLessonSteps(result.stepByStep.length > 0 ? result.stepByStep : [{ title: 'Phân tích AI', body: result.summary }]);
      addHistory(result.summary || result.title || 'AI phân tích đồ thị xong.');
      if (result.commands.length > 0) setCommandText(result.commands[0]);
      setAnalysisStatus('success');
    } catch (error: any) {
      setAnalysisStatus('error');
      setAnalysisError(error.message || 'Không thể gọi AI phân tích đồ thị.');
    }
  };

  const applyCommand = () => {
    const text = commandText.trim();
    if (!text) return;
    const normalized = stripVietnamese(text).toLowerCase();

    if (normalized.includes('bac nhat')) {
      setGraphKind('linear');
      addStep({ title: 'Chuyển dạng', body: 'Đồ thị được chuyển sang dạng hàm bậc nhất.' });
      addHistory(`Chuyển sang hàm bậc nhất: ${text}`);
      setCommandText('');
      return;
    }

    if (normalized.includes('bac hai') || normalized.includes('parabol')) {
      setGraphKind('quadratic');
      addStep({ title: 'Chuyển dạng', body: 'Đồ thị được chuyển sang dạng hàm bậc hai.' });
      addHistory(`Chuyển sang hàm bậc hai: ${text}`);
      setCommandText('');
      return;
    }

    const sliderMatch = normalized.match(/\b([abcmn])\b.*?(-?\d+(?:[.,]\d+)?)/i);
    if (sliderMatch) {
      const key = sliderMatch[1].toLowerCase();
      const value = Number(sliderMatch[2].replace(',', '.'));
      if (Number.isFinite(value)) {
        if (key === 'a') setA(value);
        if (key === 'b') setB(value);
        if (key === 'c') setC(value);
        if (key === 'm') setM(value);
        if (key === 'n') setN(value);
        addStep({ title: 'Cập nhật hệ số', body: `Đã đặt ${key} = ${formatNumber(value)} theo yêu cầu.` });
        addHistory(`Đặt ${key} = ${formatNumber(value)}`);
        setCommandText('');
        return;
      }
    }

    if (normalized.includes('giao diem voi ox') || normalized.includes('giao diem voi truc hoanh')) {
      setShowFeatures(true);
      addStep({ title: 'Hiển thị giao điểm', body: 'Các giao điểm với trục hoành đã được bật để quan sát.' });
      addHistory(`Bật giao điểm với Ox: ${text}`);
      setCommandText('');
      return;
    }

    if (normalized.includes('dinh') || normalized.includes('truc doi xung')) {
      setShowFeatures(true);
      addStep({ title: 'Hiển thị điểm đặc biệt', body: 'Đỉnh và trục đối xứng được bật lên trên bảng.' });
      addHistory(`Hiển thị điểm đặc biệt: ${text}`);
      setCommandText('');
      return;
    }

    addStep({ title: 'Ghi chú lệnh', body: `Chưa tự động hiểu hết lệnh "${text}". Hệ số vẫn giữ nguyên.` });
    addHistory(`Lệnh ghi chú: ${text}`);
    setCommandText('');
  };

  const handleSvgWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mousePoint = boardToSvgPoint(svg, range, event.clientX, event.clientY);
    const zoomFactor = event.deltaY > 0 ? 1.08 : 0.92;
    const nextWidth = clamp((range.xMax - range.xMin) * zoomFactor, 4, 40);
    const nextHeight = clamp((range.yMax - range.yMin) * zoomFactor, 4, 30);
    const relX = (mousePoint.x - range.xMin) / (range.xMax - range.xMin);
    const relY = (range.yMax - mousePoint.y) / (range.yMax - range.yMin);
    setRange({
      xMin: mousePoint.x - relX * nextWidth,
      xMax: mousePoint.x + (1 - relX) * nextWidth,
      yMin: mousePoint.y - (1 - relY) * nextHeight,
      yMax: mousePoint.y + relY * nextHeight
    });
  };

  const handleSvgPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.target !== event.currentTarget) return;
    setIsPanning(true);
    setPanAnchor({ clientX: event.clientX, clientY: event.clientY, range });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleSvgPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!isPanning || !panAnchor) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((event.clientX - panAnchor.clientX) / rect.width) * (panAnchor.range.xMax - panAnchor.range.xMin);
    const dy = ((event.clientY - panAnchor.clientY) / rect.height) * (panAnchor.range.yMax - panAnchor.range.yMin);
    setRange({
      xMin: panAnchor.range.xMin - dx,
      xMax: panAnchor.range.xMax - dx,
      yMin: panAnchor.range.yMin + dy,
      yMax: panAnchor.range.yMax + dy
    });
  };

  const handleSvgPointerUp = () => {
    setIsPanning(false);
    setPanAnchor(null);
  };

  const currentFeatures = useMemo(() => {
    const items: GraphFeature[] = [];
    if (graphKind === 'linear') {
      items.push({ label: 'Oy', x: 0, y: n });
      if (Math.abs(m) > 1e-9) {
        items.push({ label: 'Ox', x: -n / m, y: 0 });
      }
      return items;
    }

    const axis = Math.abs(a) < 1e-9 ? 0 : -b / (2 * a);
    if (Math.abs(a) >= 1e-9) {
      items.push({ label: 'Đỉnh', x: axis, y: evaluateQuadratic(a, b, c, axis) });
      items.push({ label: 'Trục', x: axis, y: 0 });
      solveQuadratic(a, b, c).forEach((root, index) => {
        items.push({ label: index === 0 ? 'Ox1' : 'Ox2', x: root, y: 0 });
      });
    } else if (Math.abs(b) > 1e-9) {
      items.push({ label: 'Ox', x: -c / b, y: 0 });
    }
    items.push({ label: 'Oy', x: 0, y: c });
    return items;
  }, [a, b, c, graphKind, m, n]);

  const samples = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const steps = 220;
    const minX = xMin;
    const maxX = xMax;
    for (let index = 0; index <= steps; index += 1) {
      const x = minX + (index / steps) * (maxX - minX);
      const y = graphKind === 'linear'
        ? evaluateLinear(m, n, x)
        : evaluateQuadratic(a, b, c, x);
      points.push({ x, y });
    }
    return points;
  }, [a, b, c, graphKind, m, n, xMax, xMin]);

  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; bold?: boolean; label?: string }[] = [];
    const startX = Math.floor(xMin);
    const endX = Math.ceil(xMax);
    const startY = Math.floor(yMin);
    const endY = Math.ceil(yMax);
    for (let x = startX; x <= endX; x += 1) {
      const { sx } = toScreenPoint(x, 0, range);
      lines.push({ x1: sx, y1: 0, x2: sx, y2: BOARD_HEIGHT, bold: x % 5 === 0, label: x % 2 === 0 ? `${x}` : undefined });
    }
    for (let y = startY; y <= endY; y += 1) {
      const { sy } = toScreenPoint(0, y, range);
      lines.push({ x1: 0, y1: sy, x2: BOARD_WIDTH, y2: sy, bold: y % 5 === 0, label: y % 2 === 0 ? `${y}` : undefined });
    }
    return lines;
  }, [range, xMin, xMax, yMin, yMax]);

  const pathData = useMemo(() => {
    return samples
      .map((point, index) => {
        const { sx, sy } = toScreenPoint(point.x, point.y, range);
        return `${index === 0 ? 'M' : 'L'} ${sx.toFixed(2)} ${sy.toFixed(2)}`;
      })
      .join(' ');
  }, [samples, range]);

  const title = graphKind === 'linear' ? 'Đồ thị hàm số bậc nhất' : 'Đồ thị hàm số bậc hai';

  return (
    <div className="glass-panel rounded-3xl border border-synth-magenta/20 p-5 md:p-6 space-y-5 bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.10),transparent_28%)]">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 text-white">
          <Sparkles className="w-5 h-5 text-synth-magenta" />
          <div>
            <h3 className="font-orbitron font-black uppercase tracking-wider text-sm md:text-base">Bí Kíp Đồ thị hàm số</h3>
            <p className="text-xs text-slate-300 mt-1">Slider thay đổi hệ số theo thời gian thực, có zoom/pan, đọc tọa độ và chốt điểm đặc biệt.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-100">
          <LineChart className="w-4 h-4" />
          {graphKind === 'linear' ? 'Bậc nhất' : graphKind === 'quadratic' ? 'Bậc hai' : 'Chưa xác định'}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-5 items-start">
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-synth-gray/20 p-3 md:p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Bảng trục tọa độ</div>
                <div className="text-sm text-white mt-1">{title}</div>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Zoom / pan / hover to read</div>
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
                <marker id="graph-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="rgba(255,255,255,0.8)" />
                </marker>
              </defs>

              {gridLines.map((line, index) => (
                <line
                  key={`${line.x1}-${line.y1}-${index}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.bold ? 'rgba(148,163,184,0.28)' : 'rgba(148,163,184,0.14)'}
                  strokeWidth={line.bold ? 1.4 : 1}
                />
              ))}

              {(() => {
                const axisX = toScreenPoint(0, 0, range).sx;
                const axisY = toScreenPoint(0, 0, range).sy;
                return (
                  <>
                    <line x1={0} y1={axisY} x2={BOARD_WIDTH} y2={axisY} stroke="rgba(255,255,255,0.9)" strokeWidth="2" markerEnd="url(#graph-arrow)" />
                    <line x1={axisX} y1={BOARD_HEIGHT} x2={axisX} y2={0} stroke="rgba(255,255,255,0.9)" strokeWidth="2" markerEnd="url(#graph-arrow)" />
                  </>
                );
              })()}

              <path d={pathData} fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

              {showFeatures ? currentFeatures.map(feature => {
                const { sx, sy } = toScreenPoint(feature.x, feature.y, range);
                return (
                  <g key={`${feature.label}-${feature.x}-${feature.y}`}>
                    <circle cx={sx} cy={sy} r="5" fill={feature.label === 'Đỉnh' ? '#f472b6' : '#f59e0b'} />
                    <text x={sx + 10} y={sy - 10} fill="#fff" fontSize="12" fontWeight="700">
                      {feature.label}
                    </text>
                  </g>
                );
              }) : null}

              <text x={18} y={26} fill="rgba(255,255,255,0.45)" fontSize="12" fontWeight="700">
                {title}
              </text>
            </svg>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Đề bài</div>
                <p className="text-sm text-white mt-1">Nhập đề bài rồi bấm AI để trích hệ số và diễn giải theo đúng chương trình Toán 9.</p>
              </div>
              <button
                onClick={handleAnalyze}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-synth-magenta to-synth-cyan px-4 py-2 text-xs font-black uppercase tracking-wider text-black cursor-pointer"
              >
                Phân tích AI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={event => setPrompt(event.target.value)}
              placeholder="Ví dụ: Cho hàm số y = ax^2 + bx + c..."
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
                placeholder='Nhập lệnh như "tăng a lên 2", "tìm giao điểm với Ox"...'
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
                <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Slider hệ số</div>
                <div className="text-sm text-white mt-1">Mọi thay đổi cập nhật đồ thị ngay lập tức.</div>
              </div>
              <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGraphKind('linear')}
                  className={`flex-1 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${graphKind === 'linear' ? 'border-synth-cyan/40 bg-synth-cyan/10 text-synth-cyan' : 'border-white/10 bg-white/5 text-white'}`}
                >
                  Hàm bậc nhất
                </button>
                <button
                  onClick={() => setGraphKind('quadratic')}
                  className={`flex-1 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${graphKind === 'quadratic' ? 'border-synth-magenta/40 bg-synth-magenta/10 text-synth-magenta' : 'border-white/10 bg-white/5 text-white'}`}
                >
                  Hàm bậc hai
                </button>
              </div>

              {graphKind === 'linear' ? (
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    m = {formatNumber(m)}
                    <input type="range" min="-5" max="5" step="0.1" value={m} onChange={event => setM(Number(event.target.value))} className="mt-2 w-full" />
                  </label>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    n = {formatNumber(n)}
                    <input type="range" min="-10" max="10" step="0.1" value={n} onChange={event => setN(Number(event.target.value))} className="mt-2 w-full" />
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    a = {formatNumber(a)}
                    <input type="range" min="-3" max="3" step="0.1" value={a} onChange={event => setA(Number(event.target.value))} className="mt-2 w-full" />
                  </label>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    b = {formatNumber(b)}
                    <input type="range" min="-10" max="10" step="0.1" value={b} onChange={event => setB(Number(event.target.value))} className="mt-2 w-full" />
                  </label>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold">
                    c = {formatNumber(c)}
                    <input type="range" min="-10" max="10" step="0.1" value={c} onChange={event => setC(Number(event.target.value))} className="mt-2 w-full" />
                  </label>
                </div>
              )}

              <button
                onClick={() => setShowFeatures(prev => !prev)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
              >
                {showFeatures ? 'Ẩn điểm đặc biệt' : 'Hiện điểm đặc biệt'}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Thông số hiện tại</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-synth-blue/15 p-3 text-sm text-white leading-relaxed">
              {graphKind === 'linear'
                ? <span>y = {formatNumber(m)}x {n >= 0 ? '+' : '-'} {formatNumber(Math.abs(n))}</span>
                : <span>y = {formatNumber(a)}x² {b >= 0 ? '+' : '-'} {formatNumber(Math.abs(b))}x {c >= 0 ? '+' : '-'} {formatNumber(Math.abs(c))}</span>}
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              {graphKind === 'linear' ? (
                <>
                  <p>• Giao với Oy: ({formatNumber(0)}, {formatNumber(n)})</p>
                  <p>• Hệ số góc: {formatNumber(m)}</p>
                  <p>• Giao với Ox: {Math.abs(m) > 1e-9 ? `(${formatNumber(-n / m)}, 0)` : 'không xác định khi m = 0'}</p>
                </>
              ) : (
                <>
                  <p>• Đỉnh: ({formatNumber(Math.abs(a) < 1e-9 ? 0 : -b / (2 * a))}, {formatNumber(Math.abs(a) < 1e-9 ? c : evaluateQuadratic(a, b, c, -b / (2 * a)))})</p>
                  <p>• Trục đối xứng: x = {formatNumber(Math.abs(a) < 1e-9 ? 0 : -b / (2 * a))}</p>
                  <p>• Giao với Oy: ({formatNumber(0)}, {formatNumber(c)})</p>
                  <p>• Nghiệm: {solveQuadratic(a, b, c).length > 0 ? solveQuadratic(a, b, c).map(root => formatNumber(root)).join(', ') : 'không có nghiệm thực'}</p>
                </>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lời giải từng bước</div>
            <div className="mt-3 space-y-2 max-h-[260px] overflow-auto pr-1">
              {lessonSteps.map((step, index) => (
                <div key={`${step.title}-${index}`} className="rounded-2xl border border-white/10 bg-synth-purple/10 p-3">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-synth-magenta font-bold">Bước {lessonSteps.length - index}</div>
                  <div className="text-sm text-white font-semibold mt-1">{step.title}</div>
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
                  Chưa có thao tác nào. Thử kéo slider hoặc nhập lệnh chuyển hệ số.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">Lưu ý nhanh</div>
            <div className="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>• Dùng slider để quan sát tác động tức thời của từng hệ số.</p>
              <p>• Kéo bảng vẽ để pan, lăn chuột để zoom.</p>
              <p>• Đỉnh và giao điểm được đánh dấu tự động khi có đủ dữ kiện.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
