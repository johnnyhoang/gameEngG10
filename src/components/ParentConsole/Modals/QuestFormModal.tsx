import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { toast } from '../../../utils/toast';

interface QuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  canCreateMission: boolean;
  addParentQuest: (title: string, description: string, rewardNP: number) => void;
}

export const QuestFormModal: React.FC<QuestFormModalProps> = ({
  isOpen,
  onClose,
  canCreateMission,
  addParentQuest
}) => {
  const [questTitle, setQuestTitle] = useState('');
  const [questDesc, setQuestDesc] = useState('');
  const [questNP, setQuestNP] = useState(50);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questTitle.trim() || !questDesc.trim()) {
      toast.error('Vui lòng điền tiêu đề và mô tả nhiệm vụ!');
      return;
    }
    setIsSaving(true);
    addParentQuest(questTitle.trim(), questDesc.trim(), questNP);
    toast.success('Giao nhiệm vụ chủ nhiệm giao thành công! 🎯');
    setQuestTitle('');
    setQuestDesc('');
    setQuestNP(50);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg border border-synth-cyan/30 bg-synth-cyan/5 rounded-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h4 className="font-orbitron font-bold text-sm text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4" /> Giao nhiệm vụ mới cho con 📜
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleCreateQuest} className="p-5 space-y-4 text-xs text-left">
          {!canCreateMission ? (
            <p className="text-xs text-red-400 italic">
              Tài khoản Chủ Nhiệm Phụ của bạn chưa được cấp quyền giao nhiệm vụ.
            </p>
          ) : (
            <>
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Tiêu đề nhiệm vụ</span>
                <input
                  type="text"
                  required
                  value={questTitle}
                  onChange={(e) => setQuestTitle(e.target.value)}
                  placeholder="Ví dụ: Rửa bát đĩa buổi tối, Quét nhà sạch sẽ"
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
                />
              </label>
              <label className="space-y-1.5 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Yêu cầu cụ thể (Mô tả)</span>
                <textarea
                  required
                  value={questDesc}
                  onChange={(e) => setQuestDesc(e.target.value)}
                  placeholder="Mô tả hành động cần con thực hiện..."
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs h-24 resize-none"
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-synth-cyan text-black rounded-lg hover:synth-glow-cyan transition-all font-orbitron font-bold text-[10px] tracking-wider uppercase cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Đang lưu...' : 'Giao nhiệm vụ 🎯'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
