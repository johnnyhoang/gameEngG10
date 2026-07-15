import React, { useEffect, useRef } from 'react';
import { useGeometryState } from '../hooks/useGeometryState';
import { Play, Pause } from 'lucide-react';

interface StepWalkthroughProps {
  dimension: '2d' | '3d';
  steps: any[]; // Mảng chứa { title, body, command, focus, annotationIds }
}

export const StepWalkthrough: React.FC<StepWalkthroughProps> = ({ dimension, steps }) => {
  const {
    currentStep2D,
    setCurrentStep2D,
    maxStep2D,
    activeStepIndex3D,
    setActiveStepIndex3D,
    isPlaying3D,
    setIsPlaying3D
  } = useGeometryState();

  const playTimerRef = useRef<number | null>(null);

  // Bộ đếm giờ tự động phát từng bước giải (chỉ dùng cho 3D)
  useEffect(() => {
    if (dimension !== '3d' || !isPlaying3D) return;
    playTimerRef.current = window.setInterval(() => {
      setActiveStepIndex3D(prev => {
        const next = prev + 1;
        return next >= steps.length ? 0 : next;
      });
    }, 1500);
    return () => {
      if (playTimerRef.current) window.clearInterval(playTimerRef.current);
    };
  }, [isPlaying3D, steps.length, dimension, setActiveStepIndex3D]);

  if (dimension === '2d') {
    if (maxStep2D < 0) return null;

    const currentTitle = steps[currentStep2D]?.command || steps[currentStep2D]?.title || 'Bắt đầu';

    return (
      <div className="mt-4 flex items-center justify-between bg-[#0f172a] rounded-xl p-3 border border-white/10">
        <button
          onClick={() => setCurrentStep2D(prev => Math.max(0, prev - 1))}
          disabled={currentStep2D <= 0}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <div className="flex-1 text-center px-4">
          <div className="text-sm font-bold text-synth-cyan">Bước {currentStep2D + 1} / {maxStep2D + 1}</div>
          <div className="text-xs text-white/80 mt-1">{currentTitle}</div>
        </div>
        <button
          onClick={() => setCurrentStep2D(prev => Math.min(maxStep2D, prev + 1))}
          disabled={currentStep2D >= maxStep2D}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    );
  }

  // 3D step-walkthrough
  if (steps.length === 0) return null;

  const currentStep3D = steps[Math.min(activeStepIndex3D, Math.max(steps.length - 1, 0))];

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex justify-between items-start">
          <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">
            Bước {activeStepIndex3D + 1} / {steps.length}
          </div>
          <button
            onClick={() => setIsPlaying3D(!isPlaying3D)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-[10px] font-bold uppercase tracking-wider cursor-pointer"
          >
            {isPlaying3D ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying3D ? 'Dừng phát' : 'Tự phát'}
          </button>
        </div>
        <h4 className="mt-2 text-base font-orbitron font-black text-white uppercase tracking-wider">
          {currentStep3D?.title}
        </h4>
        <p className="mt-2 text-sm text-slate-200 leading-relaxed">
          {currentStep3D?.body}
        </p>
        {currentStep3D?.focus && currentStep3D.focus.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {currentStep3D.focus.map((item: string) => (
              <span key={item} className="px-2.5 py-1 rounded-full border border-white/10 bg-synth-blue/30 text-[10px] font-semibold text-white">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setActiveStepIndex3D(prev => Math.max(0, prev - 1));
            setIsPlaying3D(false);
          }}
          disabled={activeStepIndex3D <= 0}
          className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <button
          onClick={() => {
            setActiveStepIndex3D(prev => Math.min(steps.length - 1, prev + 1));
            setIsPlaying3D(false);
          }}
          disabled={activeStepIndex3D >= steps.length - 1}
          className="px-3 py-2 rounded-xl border border-synth-cyan/20 bg-synth-cyan/10 text-synth-cyan text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>

      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {steps.map((step, index) => (
          <button
            key={`${step.title}-${index}`}
            onClick={() => {
              setActiveStepIndex3D(index);
              setIsPlaying3D(false);
            }}
            className={`w-full text-left rounded-2xl border p-3 cursor-pointer transition-colors ${
              index === activeStepIndex3D
                ? 'border-synth-cyan/30 bg-synth-cyan/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold">Bước {index + 1}</div>
            <div className="mt-1 text-sm font-semibold text-white">{step.title}</div>
            <div className="mt-1 text-xs text-slate-300 line-clamp-2">{step.body}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
