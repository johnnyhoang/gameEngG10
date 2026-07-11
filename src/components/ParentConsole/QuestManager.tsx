import React, { useState } from 'react';
import { Plus, Trash2, SlidersHorizontal } from 'lucide-react';
import { toast } from '../../utils/toast';

interface QuestManagerProps {
  parentQuests: any[];
  canCreateMission: boolean;
  addParentQuest: (title: string, description: string, rewardNP: number) => void;
  completeParentQuest: (questId: string) => void;
  deleteParentQuest: (questId: string) => void;
}

export const QuestManager: React.FC<QuestManagerProps> = ({
  parentQuests,
  canCreateMission,
  addParentQuest,
  completeParentQuest,
  deleteParentQuest
}) => {
  const [questTitle, setQuestTitle] = useState('');
  const [questDesc, setQuestDesc] = useState('');
  const [questNP, setQuestNP] = useState(50);

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questTitle.trim() || !questDesc.trim()) {
      toast.error('Vui lòng điền tiêu đề và mô tả nhiệm vụ!');
      return;
    }
    addParentQuest(questTitle.trim(), questDesc.trim(), questNP);
    toast.success('Giao nhiệm vụ chủ nhiệm giao thành công! 🎯');
    setQuestTitle('');
    setQuestDesc('');
    setQuestNP(50);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-synth-cyan" />
        <h3 className="font-orbitron font-bold text-sm text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
          🎯 Cáo Thị — Nhiệm vụ Chủ nhiệm giao cho con
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quest Creator Form */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 h-fit space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Giao nhiệm vụ mới cho con 📜
          </h4>
          {!canCreateMission ? (
            <p className="text-xs text-red-400 italic">
              Tài khoản Chủ Nhiệm Phụ của bạn chưa được cấp quyền giao nhiệm vụ.
            </p>
          ) : (
            <form onSubmit={handleCreateQuest} className="space-y-4">
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Tiêu đề nhiệm vụ</span>
                <input
                  type="text"
                  value={questTitle}
                  onChange={(e) => setQuestTitle(e.target.value)}
                  placeholder="Ví dụ: Rửa bát đĩa buổi tối, Quét nhà sạch sẽ"
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                />
              </label>
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Yêu cầu cụ thể (Mô tả)</span>
                <textarea
                  value={questDesc}
                  onChange={(e) => setQuestDesc(e.target.value)}
                  placeholder="Mô tả hành động cần con thực hiện..."
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs h-20 resize-none"
                />
              </label>
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Phần thưởng (NP)</span>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={questNP}
                  onChange={(e) => setQuestNP(Number(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                />
              </label>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-synth-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider transition hover:opacity-90 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Giao nhiệm vụ cho con
              </button>
            </form>
          )}
        </div>

        {/* List of parent quests */}
        <div className="glass-panel rounded-2xl border border-white/5 p-5 md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-synth-text-muted uppercase tracking-wider">
            Nhiệm vụ đang giao ({parentQuests.length})
          </h4>
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {parentQuests.length > 0 ? (
              parentQuests.map((quest: any) => (
                <div key={quest.id} className="p-4 rounded-xl border border-white/5 bg-synth-gray/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{quest.title}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase font-orbitron ${
                        quest.status === 'claimed' 
                          ? 'bg-synth-green/10 border border-synth-green/20 text-synth-green' 
                          : quest.status === 'completed'
                            ? 'bg-synth-cyan/10 border border-synth-cyan/20 text-synth-cyan'
                            : 'bg-white/5 border border-white/10 text-slate-400'
                      }`}>
                        {quest.status === 'claimed' ? 'Đã lĩnh thưởng' : quest.status === 'completed' ? 'Đã hoàn thành (Chờ nhận)' : 'Đang thực hiện'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{quest.description}</p>
                    <div className="flex gap-4 mt-2 text-[10px] font-bold font-orbitron text-slate-300">
                      <span>🎁 Thưởng: +{quest.rewardNP} NP</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {quest.status === 'pending' && canCreateMission && (
                      <button
                        onClick={() => {
                          completeParentQuest(quest.id);
                          toast.success('Đã xác nhận hoàn thành nhiệm vụ! Con có thể nhận thưởng.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-synth-green text-black font-orbitron font-bold text-[10px] uppercase cursor-pointer hover:synth-glow-green"
                      >
                        Xác nhận xong
                      </button>
                    )}
                    {canCreateMission && (
                      <button
                        onClick={() => {
                          deleteParentQuest(quest.id);
                          toast.success('Đã xoá nhiệm vụ giao.');
                        }}
                        className="p-1.5 rounded-lg border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10"
                        title="Xoá nhiệm vụ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-synth-text-muted border border-dashed border-white/10 rounded-xl">
                Chưa có nhiệm vụ chủ nhiệm giao nào được tạo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
