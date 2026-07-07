import React from 'react';
import { ArrowLeft, Layers3, LineChart, Move3D, Sparkles } from 'lucide-react';

type MatThatKind = '3d' | 'plane' | 'graph';

interface HangMatThatPageProps {
  kind: MatThatKind;
  title: string;
  subtitle: string;
  onBack: () => void;
  onSwitchTo3D: () => void;
  onSwitchToPlane: () => void;
  onSwitchToGraph: () => void;
  children: React.ReactNode;
}

const KIND_META: Record<MatThatKind, {
  label: string;
  icon: React.ReactNode;
  accent: string;
}> = {
  '3d': {
    label: 'Mật thất 3D',
    icon: <Move3D className="w-4 h-4" />,
    accent: 'from-synth-cyan/25 to-synth-purple/10'
  },
  plane: {
    label: 'Mật thất Hình học phẳng',
    icon: <Layers3 className="w-4 h-4" />,
    accent: 'from-synth-green/25 to-synth-cyan/10'
  },
  graph: {
    label: 'Mật thất Đồ thị hàm số',
    icon: <LineChart className="w-4 h-4" />,
    accent: 'from-synth-magenta/25 to-synth-orange/10'
  }
};

export function HangMatThatPage({
  kind,
  title,
  subtitle,
  onBack,
  onSwitchTo3D,
  onSwitchToPlane,
  onSwitchToGraph,
  children
}: HangMatThatPageProps) {
  const meta = KIND_META[kind];

  return (
    <div className="space-y-6">
      <section className={`glass-panel rounded-3xl border border-white/10 p-6 md:p-8 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_32%)]`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-gradient-to-r ${meta.accent} text-[10px] font-orbitron font-bold uppercase tracking-[0.24em] text-white`}>
              <Sparkles className="w-3.5 h-3.5" />
              {meta.label}
            </div>
            <div className="space-y-2">
              <h1 className="font-orbitron font-black text-3xl md:text-5xl uppercase tracking-wider text-white">
                {title}
              </h1>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Hang Luyện Công
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full lg:w-[420px]">
            {[
              { key: '3d' as const, onClick: onSwitchTo3D, active: kind === '3d', icon: <Move3D className="w-5 h-5" />, label: '3D' },
              { key: 'plane' as const, onClick: onSwitchToPlane, active: kind === 'plane', icon: <Layers3 className="w-5 h-5" />, label: 'Phẳng' },
              { key: 'graph' as const, onClick: onSwitchToGraph, active: kind === 'graph', icon: <LineChart className="w-5 h-5" />, label: 'Hàm số' }
            ].map(item => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`rounded-2xl border p-4 text-left bg-gradient-to-br ${KIND_META[item.key].accent} transition-all duration-200 cursor-pointer ${
                  item.active ? 'border-white/35 shadow-[0_0_18px_rgba(255,255,255,0.08)] scale-[1.01]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 font-orbitron font-black uppercase text-white">
                  {item.icon}
                  <span className="text-[11px]">{item.label}</span>
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-slate-200/90">
                  {KIND_META[item.key].label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[calc(100vh-260px)]">
        {children}
      </section>
    </div>
  );
}
