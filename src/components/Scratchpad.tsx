import React, { useRef, useState, useEffect } from 'react';

export const Scratchpad: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ff0080'); // Cyber magenta default
  const [lineWidth] = useState(3.5);

  // Setup Canvas size and default grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill the container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw Cyber Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Default line settings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prevent default scrolling behaviour on touch screens
    if (e.cancelable) e.preventDefault();

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (e.cancelable) e.preventDefault();

    const { x, y } = getCoordinates(e);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-draw Cyber Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#07080b]/90 backdrop-blur-md flex flex-col p-4 rounded-3xl border border-synth-magenta/30 shadow-[0_0_30px_rgba(255,0,128,0.2)]">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-synth-magenta" /> Bảng Nháp MIKAWAII ✏️
        </span>
        
        <div className="flex items-center gap-2">
          {/* Neon Colors list */}
          <div className="flex gap-1.5 mr-2">
            {['#ff0080', '#00f0ff', '#39ff14', '#ffffff'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-4 h-4 rounded-full border cursor-pointer transition-transform duration-200 ${
                  color === c ? 'scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button
            onClick={handleClear}
            className="px-2.5 py-1 rounded-lg bg-synth-gray/40 border border-white/10 hover:bg-synth-gray/70 text-[9px] text-white font-bold cursor-pointer transition-all duration-200 font-orbitron"
          >
            XÓA NHÁP
          </button>
          
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-synth-magenta/20 border border-synth-magenta/40 hover:bg-synth-magenta/40 text-[9px] text-synth-magenta font-bold cursor-pointer transition-all duration-200 font-orbitron"
          >
            ĐÓNG (X)
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="flex-1 relative bg-synth-bg/30 border border-white/5 rounded-2xl overflow-hidden">
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
      </div>
      
      <p className="text-[9px] text-synth-text-muted text-center mt-2 uppercase tracking-widest font-orbitron">
        Dùng ngón tay vẽ nháp tính toán cực kỳ dễ dàng
      </p>
    </div>
  );
};
