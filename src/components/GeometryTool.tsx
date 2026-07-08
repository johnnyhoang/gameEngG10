import React, { useRef, useState, useEffect } from 'react';
import { Trash2, Undo, Brush, Type } from 'lucide-react';

interface Shape {
  type: 'freehand' | 'line' | 'dashed-line' | 'circle' | 'triangle' | 'rectangle' | 'text';
  points: { x: number; y: number }[];
  color: string;
  text?: string;
}

export const GeometryTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [tool, setTool] = useState<'freehand' | 'line' | 'dashed-line' | 'circle' | 'triangle' | 'rectangle' | 'text'>('line');
  const [color, setColor] = useState('#00f0ff'); // Neon cyan default
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [nextLabel, setNextLabel] = useState('A');
  const [customLabel, setCustomLabel] = useState('');

  // Redraw canvas whenever shapes list or drawing state changes
  useEffect(() => {
    redraw();
  }, [shapes, currentShape, color]);

  // Adjust canvas size to parent container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width || canvas.clientWidth;
        const height = 320; // fixed height
        canvas.width = width;
        canvas.height = height;
        redraw();
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, [shapes]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 20;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.strokeStyle = shape.color;
    ctx.fillStyle = shape.color;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]); // Reset to solid line

    const pts = shape.points;
    if (pts.length === 0) return;

    switch (shape.type) {
      case 'freehand':
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
        break;

      case 'line':
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.stroke();
        break;

      case 'dashed-line':
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.setLineDash([6, 6]); // Dashed style
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.stroke();
        ctx.setLineDash([]); // Reset
        break;

      case 'circle':
        if (pts.length < 2) return;
        const dx = pts[1].x - pts[0].x;
        const dy = pts[1].y - pts[0].y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;

      case 'triangle':
        if (pts.length < 2) return;
        // Symmetrical triangle using start as top vertex and end to determine width/height
        const topX = pts[0].x;
        const topY = pts[0].y;
        const widthHalf = Math.abs(pts[1].x - pts[0].x);
        const bottomY = pts[1].y;

        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(topX - widthHalf, bottomY);
        ctx.lineTo(topX + widthHalf, bottomY);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'rectangle':
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.rect(pts[0].x, pts[0].y, pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        ctx.stroke();
        break;

      case 'text':
        ctx.font = 'bold 13px Orbitron, sans-serif';
        ctx.fillText(shape.text || '', pts[0].x + 5, pts[0].y - 5);
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 3, 0, 2 * Math.PI); // Draw point dot
        ctx.fill();
        break;
    }
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw saved shapes
    shapes.forEach((shape) => drawShape(ctx, shape));

    // Draw active preview shape
    if (currentShape) {
      drawShape(ctx, currentShape);
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);

    if (tool === 'text') {
      const activeText = (customLabel.trim() || nextLabel).toUpperCase();
      const newTextShape: Shape = {
        type: 'text',
        points: [{ x, y }],
        color,
        text: activeText
      };
      setShapes((prev) => [...prev, newTextShape]);

      // If we used the auto-label, increment it
      if (!customLabel.trim()) {
        const nextChar = String.fromCharCode(nextLabel.charCodeAt(0) + 1);
        if (nextLabel >= 'A' && nextLabel <= 'Z') {
          setNextLabel(nextChar <= 'Z' ? nextChar : 'A');
        }
      } else {
        setCustomLabel(''); // Clear custom input after placement
      }
      return;
    }

    setIsDrawing(true);
    const newShape: Shape = {
      type: tool,
      points: [{ x, y }],
      color
    };
    setCurrentShape(newShape);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentShape) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);

    if (tool === 'freehand') {
      setCurrentShape((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          points: [...prev.points, { x, y }]
        };
      });
    } else {
      setCurrentShape((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          points: [prev.points[0], { x, y }]
        };
      });
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentShape) {
      setShapes((prev) => [...prev, currentShape]);
    }
    setIsDrawing(false);
    setCurrentShape(null);
  };

  const handleClear = () => {
    setShapes([]);
    setNextLabel('A');
  };

  const handleUndo = () => {
    setShapes((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col gap-2 bg-[#090b10] border border-synth-cyan/30 rounded-xl p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
      {/* Toolbar & controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-white/5">
        {/* Drawing tools selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setTool('line')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer ${
              tool === 'line' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Đường thẳng"
          >
            📏 Nét thẳng
          </button>
          
          <button
            onClick={() => setTool('dashed-line')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer ${
              tool === 'dashed-line' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Đường nét đứt (hình không gian)"
          >
            --- Nét đứt
          </button>

          <button
            onClick={() => setTool('circle')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer ${
              tool === 'circle' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Đường tròn"
          >
            ⭕ Tròn
          </button>

          <button
            onClick={() => setTool('triangle')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer ${
              tool === 'triangle' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Tam giác"
          >
            🔺 Tam giác
          </button>

          <button
            onClick={() => setTool('rectangle')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer ${
              tool === 'rectangle' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Hình chữ nhật/tứ giác"
          >
            ⬜ Tứ giác
          </button>

          <button
            onClick={() => setTool('freehand')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer flex items-center gap-1 ${
              tool === 'freehand' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Vẽ tự do"
          >
            <Brush className="w-3 h-3" /> Tự do
          </button>

          <button
            onClick={() => setTool('text')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-orbitron font-bold transition-all duration-200 border cursor-pointer flex items-center gap-1 ${
              tool === 'text' ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10'
            }`}
            title="Nhãn đỉnh (A, B, C...)"
          >
            <Type className="w-3 h-3" /> Đỉnh ({customLabel.trim() || nextLabel})
          </button>
        </div>

        {/* Text tools helper input */}
        {tool === 'text' && (
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
            <span className="text-[9px] text-synth-text-muted font-bold font-orbitron uppercase">Tên đỉnh:</span>
            <input
              type="text"
              maxLength={3}
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Nhập tên"
              className="bg-transparent text-[10px] text-white outline-none w-14 font-bold border-b border-white/20 focus:border-synth-cyan"
            />
          </div>
        )}

        {/* Color picker, Undo & Clear */}
        <div className="flex items-center gap-2">
          {/* Colors */}
          <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
            {['#00f0ff', '#ff007f', '#39ff14', '#ff9f1c', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-3.5 h-3.5 rounded-full border cursor-pointer transition-transform duration-200 ${
                  color === c ? 'scale-125 border-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button
            onClick={handleUndo}
            disabled={shapes.length === 0}
            className="p-1.5 rounded-lg bg-synth-gray/40 border border-white/5 hover:bg-synth-gray/60 text-white disabled:opacity-40 cursor-pointer transition-colors"
            title="Hoàn tác nét vẽ cuối"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClear}
            disabled={shapes.length === 0}
            className="p-1.5 rounded-lg bg-red-950/20 border border-red-500/20 hover:bg-red-950/40 text-red-400 disabled:opacity-40 cursor-pointer transition-colors"
            title="Xóa toàn bộ bản vẽ"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative bg-[#050608] border border-white/5 rounded-xl overflow-hidden h-[320px]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none bg-transparent"
        />
        {tool === 'text' && (
          <div className="absolute top-2 left-2 pointer-events-none bg-black/60 px-2 py-1 rounded text-[9px] text-synth-cyan font-bold tracking-wider font-orbitron uppercase">
            👉 Nhấp chuột vào hình để gán nhãn đỉnh
          </div>
        )}
      </div>
    </div>
  );
};
