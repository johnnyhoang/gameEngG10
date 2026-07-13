import type { UiThemeId } from '../../types/game';
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { toast } from '../../utils/toast';

interface MindmapNode {
  id: string;
  label: string;
  details?: string;
  formula?: string;
  children?: MindmapNode[];
}

const MINDMAP_DATA: Record<'math' | 'english' | 'literature', MindmapNode> = {
  math: {
    id: 'm1', label: 'Đại Số & Hình Học 9',
    children: [
      { id: 'm1-1', label: 'Hàm số bậc nhất & bậc hai', children: [
        { id: 'm1-1-1', label: 'Hàm số y = ax + b', details: 'Hàm số đồng biến khi a > 0, nghịch biến khi a < 0. Đồ thị là đường thẳng cắt trục tung tại (0, b).', formula: 'y = ax + b' },
        { id: 'm1-1-2', label: 'Hàm số y = ax²', details: 'Đồ thị parabol đỉnh O(0,0), đối xứng qua trục tung.', formula: 'y = ax²' }
      ]},
      { id: 'm1-2', label: 'Hệ thức Vi-ét', children: [
        { id: 'm1-2-1', label: 'Định lý Vi-ét thuận', details: 'Nếu phương trình bậc hai ax² + bx + c = 0 có hai nghiệm x₁, x₂ thì tổng và tích các nghiệm tuân theo hệ thức Vi-ét.', formula: 'x₁ + x₂ = -b/a\nx₁ * x₂ = c/a' },
        { id: 'm1-2-2', label: 'Định lý Vi-ét đảo', details: 'Nếu hai số có tổng là S và tích là P thì hai số đó là nghiệm của phương trình t² - St + P = 0.', formula: 't² - St + P = 0' }
      ]},
      { id: 'm1-3', label: 'Hình Học Không Gian', children: [
        { id: 'm1-3-1', label: 'Hình Trụ', details: 'R là bán kính đáy, h là chiều cao.', formula: 'V = π * r² * h\nS_xq = 2 * π * r * h' },
        { id: 'm1-3-2', label: 'Hình Nón', details: 'R là bán kính đáy, h là chiều cao, l là đường sinh.', formula: 'V = ⅓ * π * r² * h\nS_xq = π * r * l' }
      ]}
    ]
  },
  english: {
    id: 'e1', label: 'English Grammar Master',
    children: [
      { id: 'e1-1', label: 'Verb Tenses', children: [
        { id: 'e1-1-1', label: 'Present Perfect', details: 'Dùng để diễn tả một hành động đã hoàn thành cho tới thời điểm hiện tại.', formula: 'S + have/has + V3/ed' },
        { id: 'e1-1-2', label: 'Past Simple', details: 'Dùng để diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.', formula: 'S + V2/ed' }
      ]},
      { id: 'e1-2', label: 'Relative Clauses', children: [
        { id: 'e1-2-1', label: 'Who vs Whom', details: 'Who làm chủ ngữ chỉ người. Whom làm tân ngữ.', formula: 'N(people) + WHO + V\nN(people) + WHOM + S + V' },
        { id: 'e1-2-2', label: 'Whose', details: 'Đại từ sở hữu dùng cho cả người và vật.', formula: 'N1 + WHOSE + N2' }
      ]}
    ]
  },
  literature: {
    id: 'l1', label: 'Ngữ Văn 9 Tác Phẩm',
    children: [
      { id: 'l1-1', label: 'Thơ Hiện Đại', children: [
        { id: 'l1-1-1', label: 'Sóng (Xuân Quỳnh)', details: 'Sáng tác năm 1967. Bài thơ thể hiện tình yêu thiết tha, thủy chung của người phụ nữ.', formula: 'Đề tài: Tình yêu đôi lứa' },
        { id: 'l1-1-2', label: 'Đồng chí (Chính Hữu)', details: 'Sáng tác năm 1948. Ca ngợi tình đồng chí trong thời kỳ đầu kháng chiến chống Pháp.', formula: 'Đề tài: Tình đồng đội' }
      ]},
      { id: 'l1-2', label: 'Truyện Hiện Đại', children: [
        { id: 'l1-2-1', label: 'Lão Hạc (Nam Cao)', details: 'Sáng tác năm 1943. Phản ánh số phận bi thảm của người nông dân nghèo.', formula: 'Thể loại: Truyện ngắn hiện thực' },
        { id: 'l1-2-2', label: 'Chiếc thuyền ngoài xa', details: 'Nguyễn Minh Châu sáng tác năm 1983. Đặt ra vấn đề về mối quan hệ giữa nghệ thuật và cuộc sống.', formula: 'Đề tài: Nghệ thuật & Đời sống' }
      ]}
    ]
  }
};


export interface MindmapAppProps {
  activeSectId?: string;
  uiTheme: UiThemeId;
  onReward: (coins: number, xp: number, type: string, detail: string) => void;
  onGameComplete?: (result: any) => void;
  onGameStart?: () => void;
}

const getSubjectFromSectId = (sectId?: string) => {
  if (sectId === 'english') return 'english';
  if (sectId === 'literature') return 'literature';
  return 'math';
};

export const MindmapApp: React.FC<MindmapAppProps> = ({ activeSectId, uiTheme, onReward, onGameComplete }) => {
  const isUnicorn = uiTheme === 'unicorn-dream';
  const [selectedMapSubject, setSelectedMapSubject] = useState<'math' | 'english' | 'literature'>(() => getSubjectFromSectId(activeSectId));
  const [activeNodeDetails, setActiveNodeDetails] = useState<MindmapNode | null>(null);

  React.useEffect(() => {
    setSelectedMapSubject(getSubjectFromSectId(activeSectId));
    setActiveNodeDetails(null);
  }, [activeSectId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'}`}>
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-cyan">🗺️ Sơ Đồ Ôn Tập Tri Thức</h3>
        </div>

        <div className="bg-black/30 rounded-2xl p-4 min-h-[300px] relative overflow-hidden flex flex-col justify-center gap-3">
          <div className="absolute inset-0 synth-grid-bg opacity-10" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="px-4 py-2 rounded-xl bg-synth-cyan/15 border border-synth-cyan text-synth-cyan font-bold font-orbitron text-xs shadow-[0_0_12px_rgba(0,240,255,0.15)]">
              {MINDMAP_DATA[selectedMapSubject].label}
            </div>
            <div className="w-0.5 h-4 bg-white/20" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              {MINDMAP_DATA[selectedMapSubject].children?.map((branch) => (
                <div key={branch.id} className="flex flex-col items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl min-w-[130px] flex-1">
                  <span className="text-[10px] font-bold text-white border-b border-white/10 pb-1 w-full text-center">{branch.label}</span>
                  <div className="flex flex-col gap-1.5 w-full">
                    {branch.children?.map(leaf => (
                      <button key={leaf.id} onClick={() => setActiveNodeDetails(leaf)}
                        className={`p-2 rounded text-[9px] text-left cursor-pointer transition-all border ${activeNodeDetails?.id === leaf.id ? 'bg-synth-magenta/20 border-synth-magenta text-synth-magenta font-semibold' : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10 hover:text-white'}`}>
                        👉 {leaf.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'}`}>
        <div className="space-y-4">
          {activeNodeDetails ? (
            <div className="space-y-4">
              <span className="text-[9px] font-bold tracking-wider text-synth-magenta font-orbitron uppercase border border-synth-magenta/30 px-2 py-0.5 rounded bg-synth-magenta/5">Lý Thuyết Rút Gọn</span>
              <h4 className="font-orbitron font-bold text-sm text-white">{activeNodeDetails.label}</h4>
              <p className="text-xs leading-relaxed text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">{activeNodeDetails.details}</p>
              {activeNodeDetails.formula && (
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 font-orbitron uppercase">Cấu trúc / Công thức:</span>
                  <pre className="bg-[#050608] border border-synth-cyan/35 p-3 rounded-xl text-synth-cyan font-bold font-mono text-[10px] overflow-x-auto whitespace-pre-line">{activeNodeDetails.formula}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3 h-full">
              <HelpCircle className="w-12 h-12 text-slate-500 animate-bounce" />
              <p className="text-[11px]">Bấm chọn một nhánh bên trái để xem nhanh lý thuyết.</p>
            </div>
          )}
        </div>

        <div className="border-t border-white/5 pt-4 mt-4 flex justify-end">
          <button 
            onClick={() => {
              onReward(10, 15, 'Đọc sơ đồ tri thức', `Xem sơ đồ ôn tập môn ${selectedMapSubject}`);
              onGameComplete?.({ correctAnswers: 1, timeSpent: 0, score: 100, passed: true });
              toast.success('Đã hoàn thành ôn tập sơ đồ! +10 NP, +15 XP 🧠');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all duration-300 text-center"
          >
            Đã xem xong sơ đồ 📋
          </button>
        </div>
      </div>
    </div>
  );
};
