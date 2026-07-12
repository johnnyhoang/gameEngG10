import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Question, SubjectId } from '../../../types/game';
import { SUBJECTS_CONFIG } from '../../../types/game';
import { CORE_KNOWLEDGE_TOPICS } from '../../../data/coreKnowledge';
import { toast } from '../../../utils/toast';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAddingNew: boolean;
  editingQuestion: Question | null;
  selectedSect: SubjectId | null;
  addQuestion: (question: Partial<Question>) => Promise<boolean>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<boolean>;
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  mcq: 'Trắc nghiệm',
  'short-answer': 'Tự luận ngắn',
  proof: 'Chứng minh',
  'multi-part': 'Nhiều ý',
  wordform: 'Word form',
  rewrite: 'Rewrite',
  cloze: 'Cloze',
  reading: 'Reading',
  multiple_choice: 'Trắc nghiệm (mới)',
  text_input: 'Tự luận (mới)',
  matching: 'Nối đáp án'
};

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  onClose,
  isAddingNew,
  editingQuestion,
  selectedSect,
  addQuestion,
  updateQuestion
}) => {
  const [editType, setEditType] = useState<Question['type']>('mcq');
  const [editPrompt, setEditPrompt] = useState('');
  const [editExplanation, setEditExplanation] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editTopicId, setEditTopicId] = useState('');
  const [editDifficulty, setEditDifficulty] = useState(5);
  const [editOptions, setEditOptions] = useState('');
  const [editCorrectAnswer, setEditCorrectAnswer] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editSubject, setEditSubject] = useState<SubjectId>('english');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isAddingNew) {
        setEditType('mcq');
        setEditPrompt('');
        setEditExplanation('');
        setEditCategory('general');
        setEditTopicId('');
        setEditDifficulty(5);
        setEditOptions('Lựa chọn A\nLựa chọn B\nLựa chọn C\nLựa chọn D');
        setEditCorrectAnswer('Lựa chọn A');
        setEditSource('Custom Ingest');
        setEditImageUrl('');
        setEditSubject(selectedSect || 'english');
      } else if (editingQuestion) {
        const q = editingQuestion;
        setEditType(q.type);
        setEditPrompt(q.prompt);
        setEditExplanation(q.explanation || '');
        setEditCategory(q.category);
        setEditTopicId(q.topicId || '');
        setEditDifficulty(q.difficulty || 5);
        setEditOptions(q.options ? q.options.join('\n') : '');
        setEditCorrectAnswer(Array.isArray(q.correctAnswer) ? q.correctAnswer.join('\n') : q.correctAnswer);
        setEditSource(q.source || '');
        setEditImageUrl(q.imageUrl || '');
        setEditSubject(q.subject || 'english');
      }
    }
  }, [isOpen, isAddingNew, editingQuestion, selectedSect]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, forceStandard = false) => {
    e.preventDefault();
    if (!editPrompt.trim()) {
      toast.error('Vui lòng điền đề bài câu hỏi.');
      return;
    }

    setIsSaving(true);
    const parsedOptions = editOptions.split('\n').map(o => o.trim()).filter(Boolean);
    const parsedCorrectAnswer = editCorrectAnswer.split('\n').map(a => a.trim()).filter(Boolean);

    const payload: Partial<Question> = {
      type: editType,
      prompt: editPrompt,
      explanation: editExplanation,
      category: editCategory,
      topicId: editTopicId || undefined,
      difficulty: editDifficulty,
      options: parsedOptions.length > 0 ? parsedOptions : undefined,
      correctAnswer: parsedCorrectAnswer.length > 1 ? parsedCorrectAnswer : parsedCorrectAnswer[0] || '',
      source: editSource,
      imageUrl: editImageUrl || undefined,
      subject: editSubject,
      metadata: {
        ...(editingQuestion?.metadata || {}),
        isStandard: forceStandard ? true : (editingQuestion?.metadata?.isStandard || false)
      }
    };

    if (isAddingNew) {
      const ok = await addQuestion(payload);
      if (ok) {
        toast.success(forceStandard ? 'Đã tạo câu hỏi Đạt Chuẩn thành công! 🏆' : 'Đã tạo câu hỏi thành công! 💾');
        onClose();
      }
    } else if (editingQuestion) {
      const ok = await updateQuestion(editingQuestion.id, payload);
      if (ok) {
        toast.success('Đã lưu thay đổi câu hỏi thành công!');
        onClose();
      }
    }
    setIsSaving(false);
  };

  const handleRemoveStandard = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    setIsSaving(true);
    const parsedOptions = editOptions.split('\n').map(o => o.trim()).filter(Boolean);
    const parsedCorrectAnswer = editCorrectAnswer.split('\n').map(a => a.trim()).filter(Boolean);

    const payload: Partial<Question> = {
      type: editType,
      prompt: editPrompt,
      explanation: editExplanation,
      category: editCategory,
      topicId: editTopicId || undefined,
      difficulty: editDifficulty,
      options: parsedOptions.length > 0 ? parsedOptions : undefined,
      correctAnswer: parsedCorrectAnswer.length > 1 ? parsedCorrectAnswer : parsedCorrectAnswer[0] || '',
      source: editSource,
      imageUrl: editImageUrl || undefined,
      subject: editSubject,
      metadata: {
        ...(editingQuestion.metadata || {}),
        isStandard: false
      }
    };

    const ok = await updateQuestion(editingQuestion.id, payload);
    if (ok) {
      toast.success('Đã hủy trạng thái Đạt Chuẩn câu hỏi thành công! ❌');
      onClose();
    }
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`glass-panel w-full max-w-2xl border rounded-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        isAddingNew ? 'border-synth-green/30 bg-synth-green/5' : 'border-synth-cyan/30 bg-synth-cyan/5'
      }`}>
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h4 className={`font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${
            isAddingNew ? 'text-synth-green' : 'text-synth-cyan'
          }`}>
            <span>{isAddingNew ? '➕ Tạo mới câu hỏi' : '✏️ Chỉnh sửa câu hỏi'}</span>
          </h4>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-left">
          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Môn học</span>
              <select
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white cursor-pointer"
              >
                {Object.values(SUBJECTS_CONFIG).map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Loại câu hỏi</span>
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white cursor-pointer"
              >
                {Object.entries(QUESTION_TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-slate-400 font-semibold">Đề bài</span>
            <textarea
              required
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-20 resize-none"
              placeholder="Ví dụ: Hai tam giác đồng dạng khi nào?"
            />
          </label>

          <label className="space-y-1 block">
            <span className="text-slate-400 font-semibold">Giải thích lời giải</span>
            <textarea
              value={editExplanation}
              onChange={(e) => setEditExplanation(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-14 resize-none"
              placeholder="Ví dụ: Theo định nghĩa, tỉ số các cạnh tương ứng..."
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Kỹ năng (Category)</span>
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
                placeholder="Ví dụ: geometry"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Topic Lõi (Core Knowledge)</span>
              <select
                value={editTopicId}
                onChange={(e) => setEditTopicId(e.target.value)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white cursor-pointer"
              >
                <option value="">-- Chưa chọn topic --</option>
                {CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === editSubject).map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.hamNguyenTo === 'hoa' ? '🔥 Hỏa' : t.hamNguyenTo === 'bang' ? '❄️ Băng' : '🪨 Thạch'})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Độ khó (1-10)</span>
              <input
                type="number"
                min={1}
                max={10}
                value={editDifficulty}
                onChange={(e) => setEditDifficulty(Number(e.target.value) || 5)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Nguồn (Source)</span>
              <input
                type="text"
                value={editSource}
                onChange={(e) => setEditSource(e.target.value)}
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
              />
            </label>
          </div>

          {editType === 'mcq' && (
            <div className="space-y-2">
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Các lựa chọn (Mỗi lựa chọn 1 dòng)</span>
                <textarea
                  value={editOptions}
                  onChange={(e) => setEditOptions(e.target.value)}
                  placeholder="Lựa chọn A&#10;Lựa chọn B&#10;Lựa chọn C&#10;Lựa chọn D"
                  className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-20 resize-none font-mono"
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Đáp án đúng (Khớp với một trong các lựa chọn)</span>
                <input
                  type="text"
                  value={editCorrectAnswer}
                  onChange={(e) => setEditCorrectAnswer(e.target.value)}
                  className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
                />
              </label>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-3 border-t border-white/10 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 rounded-lg text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider"
            >
              Hủy bỏ
            </button>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className={`px-5 py-2 text-black font-bold rounded-lg transition-all text-xs uppercase cursor-pointer ${
                  isAddingNew ? 'bg-synth-green hover:synth-glow-green font-black' : 'bg-synth-cyan hover:synth-glow-cyan font-black'
                } disabled:opacity-50`}
              >
                {isSaving ? 'Đang lưu...' : isAddingNew ? 'Tạo câu hỏi 💾' : 'Cập nhật 💾'}
              </button>
              {editingQuestion?.metadata?.isStandard ? (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleRemoveStandard}
                  className="px-3 py-2 bg-red-600/20 border border-red-500/40 text-red-400 font-black font-orbitron rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs uppercase cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-50"
                >
                  ❌ Chưa Đạt Chuẩn
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black font-orbitron rounded-lg hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all text-xs uppercase cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-50"
                >
                  🏆 Đạt Chuẩn
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
