import type { UiThemeId } from '../../types/game';
import React, { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

interface DiagramSlot { id: string; label: string; expectedLabel: string; currentLabel: string; }

const DIAGRAM_DATA = {
  math: {
    slots: [
      { id: 'ds-m1', label: 'Cạnh đối diện góc vuông', expectedLabel: 'Cạnh huyền', currentLabel: '' },
      { id: 'ds-m2', label: 'Cạnh đứng kề góc vuông', expectedLabel: 'Cạnh góc vuông 1', currentLabel: '' },
      { id: 'ds-m3', label: 'Cạnh đáy kề góc vuông', expectedLabel: 'Cạnh góc vuông 2', currentLabel: '' }
    ],
    pool: ['Cạnh huyền', 'Cạnh góc vuông 1', 'Cạnh góc vuông 2', 'Đường trung trực']
  },
  english: {
    slots: [
      { id: 'ds-e1', label: 'Từ: "The students"', expectedLabel: 'Chủ ngữ (Subject)', currentLabel: '' },
      { id: 'ds-e2', label: 'Từ: "solved"', expectedLabel: 'Động từ (Verb)', currentLabel: '' },
      { id: 'ds-e3', label: 'Từ: "the equations"', expectedLabel: 'Tân ngữ (Object)', currentLabel: '' }
    ],
    pool: ['Chủ ngữ (Subject)', 'Động từ (Verb)', 'Tân ngữ (Object)', 'Trạng ngữ (Adverb)']
  },
  literature: {
    slots: [
      { id: 'ds-l1', label: 'Tác phẩm: "Lão Hạc"', expectedLabel: 'Truyện ngắn hiện thực', currentLabel: '' },
      { id: 'ds-l2', label: 'Tác phẩm: "Sóng"', expectedLabel: 'Thơ tình yêu trữ tình', currentLabel: '' },
      { id: 'ds-l3', label: 'Tác phẩm: "Vũ Như Tô"', expectedLabel: 'Kịch lịch sử', currentLabel: '' }
    ],
    pool: ['Truyện ngắn hiện thực', 'Thơ tình yêu trữ tình', 'Kịch lịch sử', 'Tùy bút']
  }
};


export interface DiagramAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (ruby: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
}

export const DiagramApp: React.FC<DiagramAppProps> = ({ activeSectId, uiTheme, onReward, onGameComplete }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';

  const diagramSubject = (activeSectId === 'english' || activeSectId === 'math' || activeSectId === 'literature')
    ? activeSectId
    : 'math';
  const [selectedLabel, setSelectedLabel] = useState('');
  const [diagramSlots, setDiagramSlots] = useState<DiagramSlot[]>([]);
  const [diagramLabels, setDiagramLabels] = useState<string[]>([]);
  const [diagramStatus, setDiagramStatus] = useState<'playing' | 'won'>('playing');

  const initDiagramGame = () => {
    const data = DIAGRAM_DATA[diagramSubject];
    setDiagramSlots(data.slots.map(s => ({ ...s })));
    setDiagramLabels(data.pool);
    setSelectedLabel('');
    setDiagramStatus('playing');
  };

  useEffect(() => { initDiagramGame(); }, [diagramSubject]);

  const handlePlaceLabel = (slotId: string) => {
    if (!selectedLabel || diagramStatus !== 'playing') return;
    setDiagramSlots(prev => prev.map(s => s.id === slotId ? { ...s, currentLabel: selectedLabel } : s));
    setSelectedLabel('');
  };

  const checkDiagram = () => {
    const allFilled = diagramSlots.every(s => s.currentLabel !== '');
    if (!allFilled) { toast.error('Điền hết nhãn vào các ô trống đi!'); return; }
    const isCorrect = diagramSlots.every(s => s.currentLabel === s.expectedLabel);
    if (isCorrect) {
      setDiagramStatus('won');
      onReward(30, 35, 'Ghép sơ đồ thành công', `Hoàn thành ghép sơ đồ môn ${diagramSubject}`);
      toast.success('Chuẩn xác, sơ đồ khớp rồi! 🎉');
      onGameComplete?.({ correctAnswers: diagramSlots.length, timeSpent: 0, score: 100, passed: true });
    } else {
      toast.error('Có một số nhãn lắp sai vị trí rồi!');
    }
  };

  return (
    <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/30'}`}>
      <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
        <h3 className="font-orbitron font-black text-lg text-white uppercase">🧱 Lắp Ghép Sơ Đồ</h3>
        <p className="text-xs text-slate-400 leading-relaxed">Nhấp chọn một nhãn dán ở bể chứa, sau đó nhấp vào ô trống tương ứng để lắp ráp!</p>
        <div className="text-[10px] font-bold font-orbitron uppercase mt-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 inline-block text-slate-400">
          Chủ đề: {diagramSubject === 'math' ? 'Tam giác vuông 📐' : diagramSubject === 'english' ? 'Cấu trúc câu 🇬🇧' : 'Thể loại tác phẩm ✍️'}
        </div>
      </div>

      {diagramStatus === 'playing' ? (
        <div className="space-y-6 max-w-xl mx-auto py-2 text-left">
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center text-xs">
            <span className="text-slate-400">Nhãn dán đang chọn:</span>
            <span className={`px-3 py-1 rounded font-bold uppercase ${selectedLabel ? 'bg-synth-cyan text-black' : 'text-slate-500 italic'}`}>
              {selectedLabel || 'Chưa chọn'}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 font-orbitron uppercase">Bể chứa nhãn dán:</span>
            <div className="flex flex-wrap gap-2">
              {diagramLabels.map((lbl, idx) => (
                <button key={idx} onClick={() => setSelectedLabel(lbl)} className={`px-3 py-2 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${selectedLabel === lbl ? 'bg-synth-cyan border-synth-cyan text-black' : 'bg-white/5 border-white/5 text-white hover:bg-white/10'}`}>
                  🏷️ {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5">
            <span className="text-[10px] font-bold text-slate-400 font-orbitron uppercase">Vị trí lắp ráp sơ đồ:</span>
            <div className="grid grid-cols-1 gap-2.5">
              {diagramSlots.map((slot) => (
                <div key={slot.id} className="p-3 rounded-xl border border-white/5 bg-black/20 flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{slot.label}</span>
                  <button onClick={() => handlePlaceLabel(slot.id)} className={`px-4 py-2 rounded-lg border text-[11px] font-bold uppercase min-w-[150px] text-center cursor-pointer transition-all ${slot.currentLabel ? 'bg-white/10 border-white/20 text-synth-cyan' : 'border-dashed border-synth-cyan/40 bg-synth-cyan/5 text-synth-cyan/60 animate-pulse'}`}>
                    {slot.currentLabel || '➕ Nhấp để dán'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={checkDiagram} className="w-full mt-4 px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-[1.01] transition-all">
            Kiểm Tra Sơ Đồ Lắp Ráp ✔️
          </button>
        </div>
      ) : (
        <div className="py-10 space-y-4 max-w-md mx-auto">
          <div className="text-4xl animate-bounce">🧱🏆🎉</div>
          <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Ghép Sơ Đồ Thành Công</h4>
          <p className="text-xs text-slate-300">Phần thưởng: +30 Ruby, +35 XP</p>
          <button onClick={initDiagramGame} className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-105 transition-all">Ghép Bảng Sơ Đồ Mới 🔁</button>
        </div>
      )}
    </div>
  );
};
