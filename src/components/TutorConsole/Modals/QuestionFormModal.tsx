import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SideDrawer } from '../../Common/SideDrawer';
import type { GradeTier, Question, SubjectId } from '../../../types/game';
import { SUBJECTS_CONFIG } from '../../../types/game';
import { CORE_KNOWLEDGE_TOPICS } from '../../../data/coreKnowledge';
import { toast } from '../../../utils/toast';
import { DUNGEONS_CONFIG, enrichTextbookAttributes } from '../../../utils/textbookEnricher';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAddingNew: boolean;
  editingQuestion: Question | null;
  selectedSect: SubjectId | null;
  gradeTier: GradeTier;
  addQuestion: (question: Partial<Question>) => Promise<boolean>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<boolean>;
  /** Vị trí câu đang sửa trong danh sách đã lọc (1-based) — null khi không xác định được */
  navPosition?: { current: number; total: number } | null;
  /** Chuyển sang câu trước (-1) / câu sau (+1) trong danh sách */
  onNavigate?: (direction: -1 | 1) => void;
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
  gradeTier,
  addQuestion,
  updateQuestion,
  navPosition,
  onNavigate
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
  const [editSubject, setEditSubject] = useState<SubjectId>(selectedSect || 'english');
  const [editLoai, setEditLoai] = useState('');
  const [editBai, setEditBai] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formAttempted, setFormAttempted] = useState(false);

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
        setEditLoai('');
        setEditBai('');
        setFormAttempted(false);
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
        setEditLoai(q.loai || '');
        setEditBai(q.bai !== undefined ? String(q.bai) : '');
        setFormAttempted(false);
      }
    }
  }, [isOpen, isAddingNew, editingQuestion, selectedSect]);

  if (!isOpen) return null;

  // Sau khi lưu ở chế độ chỉnh sửa: giữ drawer mở và chuyển sang câu kế tiếp trong danh sách;
  // đang ở câu cuối (hoặc không có danh sách) thì mới đóng.
  const advanceAfterSave = () => {
    if (onNavigate && navPosition && navPosition.current < navPosition.total) {
      onNavigate(1);
    } else {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent, forceStandard = false) => {
    e.preventDefault();
    setFormAttempted(true);
    if (!editPrompt.trim()) {
      toast.error('Vui lòng điền đề bài câu hỏi.');
      return;
    }
    if (!editTopicId) {
      toast.error('Vui lòng chọn Topic Lõi (Core Knowledge).');
      return;
    }

    setIsSaving(true);
    const parsedOptions = editOptions.split('\n').map(o => o.trim()).filter(Boolean);
    const parsedCorrectAnswer = editCorrectAnswer.split('\n').map(a => a.trim()).filter(Boolean);

    const parsedBai = editBai.trim() ? parseFloat(editBai) : undefined;

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
      gradeTier,
      loai: editLoai.trim() || undefined,
      bai: parsedBai,
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
        toast.success(forceStandard ? 'Đã lưu và đánh dấu Đạt Chuẩn thành công! 🏆' : 'Đã lưu thay đổi câu hỏi thành công!');
        advanceAfterSave();
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
      gradeTier,
      metadata: {
        ...(editingQuestion.metadata || {}),
        isStandard: false
      }
    };

    const ok = await updateQuestion(editingQuestion.id, payload);
    if (ok) {
      toast.success('Đã hủy trạng thái Đạt Chuẩn câu hỏi thành công! ❌');
      advanceAfterSave();
    }
    setIsSaving(false);
  };

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      widthClass="max-w-2xl"
      panelClassName={isAddingNew ? 'border-l-synth-green/40' : 'border-l-synth-cyan/40'}
      title={
        <span className={isAddingNew ? 'text-synth-green' : 'text-synth-cyan'}>
          {isAddingNew ? '➕ Tạo mới câu hỏi' : '✏️ Chỉnh sửa câu hỏi'}
        </span>
      }
    >
      <form onSubmit={(e) => handleSubmit(e)} className="p-5 space-y-4 text-xs text-left">
          {editingQuestion && (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl border border-white/10 bg-white/5">
              <button
                type="button"
                disabled={isSaving || !navPosition || navPosition.current <= 1}
                onClick={() => onNavigate?.(-1)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Câu trước
              </button>
              <span className="text-[10px] font-orbitron font-bold text-slate-300 uppercase tracking-wider">
                {navPosition ? `Câu ${navPosition.current}/${navPosition.total}` : 'Ngoài danh sách lọc'}
              </span>
              <button
                type="button"
                disabled={isSaving || !navPosition || navPosition.current >= navPosition.total}
                onClick={() => onNavigate?.(1)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Câu sau <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {editingQuestion && (
            <div className="p-3.5 rounded-xl border border-synth-cyan/20 bg-synth-cyan/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">👁️ Tổng lượt mở</span>
                <span className="text-sm font-bold text-white mt-1 block">{editingQuestion.timesOpened || 0}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">✅ Trả lời đúng</span>
                <span className="text-sm font-bold text-emerald-400 mt-1 block">{editingQuestion.timesAnsweredCorrectly || 0}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">⏩ Lượt bỏ qua</span>
                <span className="text-sm font-bold text-amber-500 mt-1 block">{editingQuestion.timesSkipped || 0}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">🎯 Tỉ lệ đúng</span>
                <span className="text-sm font-bold text-synth-cyan mt-1 block">
                  {editingQuestion.timesOpened && editingQuestion.timesOpened > 0 ? (
                    `${Math.round(((editingQuestion.timesAnsweredCorrectly || 0) / editingQuestion.timesOpened) * 100)}%`
                  ) : (
                    '—'
                  )}
                </span>
              </div>
            </div>
          )}

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
            <span className="text-slate-400 font-semibold">Đề bài (Có thể chứa Markdown/HTML) <span className="text-red-500">*</span></span>
            <textarea
              required
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${formAttempted && !editPrompt.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-xs text-white h-24 resize-none`}
              placeholder="Nhập nội dung câu hỏi..."
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
              <span className="text-slate-400 font-semibold">Topic Lõi (Core Knowledge) <span className="text-red-500">*</span></span>
              <select
                required
                value={editTopicId}
                onChange={(e) => setEditTopicId(e.target.value)}
                className={`w-full p-2 rounded-lg border ${formAttempted && !editTopicId ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-xs text-white cursor-pointer`}
              >
                <option value="">-- Chưa chọn topic --</option>
                {CORE_KNOWLEDGE_TOPICS.filter(t => t.subjectId === editSubject).map(t => {
                  const textbook = enrichTextbookAttributes(t.id, undefined, editSubject);
                  const details = DUNGEONS_CONFIG[textbook.hamNguyenTo];
                  const dLabel = details ? details.label.split(' ')[0] : textbook.hamNguyenTo; // e.g. 🔥 or 🪨
                  return (
                    <option key={t.id} value={t.id}>
                      {t.label} ({dLabel})
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2 mt-2">
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold text-[11px]">Phân loại SGK (Ví dụ: Đại số)</span>
              <input
                type="text"
                value={editLoai}
                onChange={(e) => setEditLoai(e.target.value)}
                placeholder="Ghi đè Loại SGK nếu cần..."
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold text-[11px]">Số thứ tự Bài (Ví dụ: 5.5)</span>
              <input
                type="number"
                step="any"
                value={editBai}
                onChange={(e) => setEditBai(e.target.value)}
                placeholder="Ghi đè số Bài..."
                className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
              />
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
                <span className="text-slate-400 font-semibold">Các lựa chọn (Mỗi lựa chọn 1 dòng) <span className="text-red-500">*</span></span>
                <textarea
                  required
                  value={editOptions}
                  onChange={(e) => setEditOptions(e.target.value)}
                  placeholder="Lựa chọn A&#10;Lựa chọn B&#10;Lựa chọn C&#10;Lựa chọn D"
                  className={`w-full p-2 rounded-lg border ${formAttempted && !editOptions.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-xs text-white h-20 resize-none font-mono`}
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-slate-400 font-semibold">Đáp án đúng (Khớp với một trong các lựa chọn) <span className="text-red-500">*</span></span>
                <input
                  required
                  type="text"
                  value={editCorrectAnswer}
                  onChange={(e) => setEditCorrectAnswer(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${formAttempted && !editCorrectAnswer.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-xs text-white`}
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
              {isAddingNew ? 'Hủy bỏ' : '✕ Đóng'}
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
    </SideDrawer>
  );
};
