import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye, Edit2, ChevronDown, HelpCircle } from 'lucide-react';
import { FullscreenModal } from '../../Common/FullscreenModal';
import { PlayArea } from '../../PlayArea';
import type { GradeTier, Question, SubjectId } from '../../../types/game';
import { SUBJECTS_CONFIG } from '../../../types/game';
import { useGameState } from '../../../hooks/useGameState';
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
  /** Danh sách câu hỏi hiện có để lấy gợi ý distinct */
  existingQuestions?: Question[];
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

interface TypeableComboboxProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number';
  step?: string;
  className?: string;
  id?: string;
}

const TypeableCombobox: React.FC<TypeableComboboxProps> = ({
  value,
  onChange,
  options,
  placeholder,
  required,
  type = 'text',
  step,
  className,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!value || !value.trim()) return options;
    const lower = value.toLowerCase().trim();
    return options.filter(opt => opt.toLowerCase().includes(lower));
  }, [options, value]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          id={id}
          type={type}
          step={step}
          required={required}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`${className || ''} pr-8`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="absolute right-2 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
          tabIndex={-1}
          aria-label="Toggle options"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-synth-cyan' : ''}`} />
        </button>
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-slate-900/95 border border-synth-cyan/30 rounded-xl shadow-2xl backdrop-blur-md py-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 text-xs cursor-pointer transition-colors hover:bg-synth-cyan/20 hover:text-synth-cyan flex items-center justify-between ${
                  opt === value ? 'bg-synth-cyan/15 text-synth-cyan font-bold' : 'text-slate-200'
                }`}
              >
                <span>{opt}</span>
                {opt === value && <span className="text-[10px] text-synth-cyan font-mono">Đang chọn</span>}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-[11px] text-slate-400 italic">
              Nhập giá trị mới: "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  );
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
  onNavigate,
  existingQuestions = []
}) => {
  const topics = useGameState(state => state.topics || []);
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
  const [editPedagogicalPhase, setEditPedagogicalPhase] = useState<NonNullable<Question['pedagogicalPhase']>>('comprehension');
  const [isSaving, setIsSaving] = useState(false);
  const [formAttempted, setFormAttempted] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const wasOpenRef = useRef(false);

  // Distinct options calculated for current editSubject
  const subjectQuestions = useMemo(() => {
    if (!existingQuestions || !Array.isArray(existingQuestions)) return [];
    return existingQuestions.filter(q => q.subject === editSubject);
  }, [existingQuestions, editSubject]);

  const distinctCategories = useMemo(() => {
    const set = new Set<string>();
    ['general', 'reading', 'grammar', 'vocabulary', 'algebra', 'geometry', 'real-geometry'].forEach(c => set.add(c));
    subjectQuestions.forEach(q => {
      if (q.category?.trim()) set.add(q.category.trim());
    });
    return Array.from(set).sort();
  }, [subjectQuestions]);

  const distinctLoai = useMemo(() => {
    const set = new Set<string>();
    subjectQuestions.forEach(q => {
      if (q.loai?.trim()) set.add(q.loai.trim());
    });
    return Array.from(set).sort();
  }, [subjectQuestions]);

  const distinctBai = useMemo(() => {
    const set = new Set<number>();
    subjectQuestions.forEach(q => {
      if (q.bai !== undefined && q.bai !== null && !isNaN(q.bai)) set.add(q.bai);
    });
    return Array.from(set).sort((a, b) => a - b).map(n => String(n));
  }, [subjectQuestions]);

  const distinctSources = useMemo(() => {
    const set = new Set<string>();
    ['GDPT 2018', 'Đề Thi Thử', 'Custom Ingest'].forEach(s => set.add(s));
    subjectQuestions.forEach(q => {
      if (q.source?.trim()) set.add(q.source.trim());
    });
    return Array.from(set).sort();
  }, [subjectQuestions]);

  const previewQuestion = useMemo(() => {
    if (!isOpen) return null;
    return {
      id: editingQuestion?.id || 'draft',
      type: editType as any,
      prompt: editPrompt,
      explanation: editExplanation,
      category: editCategory,
      topicId: editTopicId || undefined,
      difficulty: editDifficulty,
      options: editOptions.split('\n').map(o => o.trim()).filter(Boolean),
      correctAnswer: editCorrectAnswer.split('\n').map(a => a.trim()).filter(Boolean),
      source: editSource,
      imageUrl: editImageUrl || undefined,
      subject: editSubject,
      gradeTier
    };
  }, [
    isOpen,
    editingQuestion?.id,
    editType,
    editPrompt,
    editExplanation,
    editCategory,
    editTopicId,
    editDifficulty,
    editOptions,
    editCorrectAnswer,
    editSource,
    editImageUrl,
    editSubject,
    gradeTier
  ]);

  useEffect(() => {
    if (isOpen) {
      const justOpened = !wasOpenRef.current;
      wasOpenRef.current = true;

      if (justOpened) {
        setIsPreviewMode(false);
      }

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
        setEditPedagogicalPhase('comprehension');
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
        setEditPedagogicalPhase(q.pedagogicalPhase || 'comprehension');
        setFormAttempted(false);
      }
    } else {
      wasOpenRef.current = false;
    }
  }, [isOpen, isAddingNew, editingQuestion, selectedSect]);

  if (!isOpen) return null;

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
      pedagogicalPhase: editPedagogicalPhase,
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
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className={`flex items-center gap-2 font-orbitron text-sm sm:text-base ${isAddingNew ? 'text-synth-green' : 'text-synth-cyan'}`}>
          <HelpCircle className="w-5 h-5" />
          {isAddingNew ? 'TẠO CÂU HỎI MỚI' : 'CHỈNH SỬA CÂU HỎI'}
        </span>
      }
      bodyClassName="p-4 sm:p-6 flex flex-col h-full min-h-0 bg-synth-bg"
    >
      {editingQuestion && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 shrink-0 mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              disabled={isSaving || !navPosition || navPosition.current <= 1}
              onClick={() => onNavigate?.(-1)}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] sm:text-xs tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Câu trước
            </button>
            <span className="text-[10px] sm:text-xs font-orbitron font-bold text-synth-cyan uppercase tracking-wider bg-synth-cyan/10 px-3 py-1.5 rounded-lg border border-synth-cyan/20">
              {navPosition ? `Câu ${navPosition.current}/${navPosition.total}` : 'Ngoài danh sách'}
            </span>
            <button
              type="button"
              disabled={isSaving || !navPosition || navPosition.current >= navPosition.total}
              onClick={() => onNavigate?.(1)}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer uppercase font-orbitron font-bold text-[10px] sm:text-xs tracking-wider flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Câu sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-orbitron font-bold">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase">👁️ Lượt mở</span>
              <span className="text-white text-xs">{editingQuestion.timesOpened || 0}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase">✅ Trả lời đúng</span>
              <span className="text-emerald-400 text-xs">{editingQuestion.timesAnsweredCorrectly || 0}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase">⏩ Lượt bỏ qua</span>
              <span className="text-amber-400 text-xs">{editingQuestion.timesSkipped || 0}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] uppercase">🎯 Tỉ lệ đúng</span>
              <span className="text-synth-cyan text-xs">
                {editingQuestion.timesOpened && editingQuestion.timesOpened > 0 ? (
                  `${Math.round(((editingQuestion.timesAnsweredCorrectly || 0) / editingQuestion.timesOpened) * 100)}%`
                ) : (
                  '—'
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {isPreviewMode ? (
        <div className="flex-1 flex flex-col min-h-0 bg-black rounded-xl border border-synth-cyan/30 overflow-hidden">
          <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center shrink-0">
            <span className="text-synth-cyan font-bold font-orbitron text-xs uppercase tracking-wider">👁️ Chế độ xem trước</span>
            <button
              type="button"
              onClick={() => setIsPreviewMode(false)}
              className="px-4 py-2 bg-synth-magenta/20 text-synth-magenta border border-synth-magenta/40 hover:bg-synth-magenta/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" /> Tiếp tục sửa
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto min-h-0">
            <PlayArea 
              mode="preview" 
              previewQuestion={previewQuestion || undefined} 
              onFinish={() => setIsPreviewMode(false)} 
            />
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="flex-1 flex flex-col min-h-0 space-y-4 text-xs text-left">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-synth-gray/10 p-4 rounded-xl border border-white/5 shrink-0">
            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Môn học</span>
              <select
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer text-xs"
              >
                {Object.values(SUBJECTS_CONFIG).map(sub => (
                  <option key={sub.id} value={sub.id} className="bg-slate-900 text-white">{sub.icon} {sub.name}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Loại câu hỏi</span>
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer text-xs"
              >
                {Object.entries(QUESTION_TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val} className="bg-slate-900 text-white">{label}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Kỹ năng (Category)</span>
              <TypeableCombobox
                value={editCategory}
                onChange={setEditCategory}
                options={distinctCategories}
                placeholder="Ví dụ: geometry..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Topic Lõi (Core Knowledge) <span className="text-red-500">*</span></span>
              <select
                required
                value={editTopicId}
                onChange={(e) => setEditTopicId(e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${formAttempted && !editTopicId ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-synth-gray/20 focus:border-synth-cyan'} text-white outline-none text-xs cursor-pointer`}
              >
                <option value="" className="bg-slate-900 text-white">-- Chưa chọn topic --</option>
                {topics.filter(t => t.subjectId === editSubject).map(t => {
                  const textbook = enrichTextbookAttributes(t.id, undefined, editSubject);
                  const details = DUNGEONS_CONFIG[textbook.hamNguyenTo];
                  const dLabel = details ? details.label.split(' ')[0] : textbook.hamNguyenTo;
                  return (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.label} ({dLabel})
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Phân loại SGK (Ví dụ: Đại số)</span>
              <TypeableCombobox
                value={editLoai}
                onChange={setEditLoai}
                options={distinctLoai}
                placeholder="Ghi đè Loại SGK nếu cần..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Số thứ tự Bài (Ví dụ: 5.5)</span>
              <TypeableCombobox
                value={editBai}
                onChange={setEditBai}
                options={distinctBai}
                type="number"
                step="any"
                placeholder="Ghi đè số Bài..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Độ khó (1-10)</span>
              <input
                type="number"
                min={1}
                max={10}
                value={editDifficulty}
                onChange={(e) => setEditDifficulty(Number(e.target.value) || 5)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Phân đoạn sư phạm (Pedagogical Phase)</span>
              <select
                value={editPedagogicalPhase}
                onChange={(e) => setEditPedagogicalPhase(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan cursor-pointer text-xs"
              >
                <option value="illustration" className="bg-slate-900 text-white">📖 Minh hoạ khái niệm (Xem trong bài giảng)</option>
                <option value="comprehension" className="bg-slate-900 text-white">✅ Kiểm tra củng cố (Tập sau bài giảng)</option>
                <option value="mastery" className="bg-slate-900 text-white">🏆 Luyện tập thành thạo (Chuyên đề)</option>
                <option value="challenge" className="bg-slate-900 text-white">🔥 Vận dụng cao / Thử thách Boss</option>
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-slate-400 font-semibold">Nguồn (Source)</span>
              <TypeableCombobox
                value={editSource}
                onChange={setEditSource}
                options={distinctSources}
                placeholder="Nguồn dữ liệu câu hỏi..."
                className="w-full p-2.5 rounded-lg border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan text-xs"
              />
            </label>
          </div>

          {/* Main Content Areas - Spacious Prompt, Explanation, Options */}
          <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-y-auto pr-1">
            <label className="space-y-1 flex flex-col flex-1 min-h-[140px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-semibold text-xs">
                  Đề bài (Có thể chứa Markdown/HTML) <span className="text-red-500">*</span>
                </span>
                <span className="text-[10px] text-synth-cyan/80 font-mono">{editPrompt.length} ký tự</span>
              </div>
              <textarea
                required
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                className={`w-full flex-1 p-3.5 rounded-xl border ${formAttempted && !editPrompt.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-white outline-none resize-none font-mono text-sm leading-relaxed tracking-wide shadow-inner`}
                placeholder="Nhập nội dung đề bài câu hỏi..."
              />
            </label>

            <label className="space-y-1 flex flex-col flex-1 min-h-[100px]">
              <span className="text-slate-300 font-semibold text-xs">Giải thích lời giải</span>
              <textarea
                value={editExplanation}
                onChange={(e) => setEditExplanation(e.target.value)}
                className="w-full flex-1 p-3.5 rounded-xl border border-white/10 bg-black/40 text-white outline-none focus:border-synth-cyan resize-none font-mono text-xs leading-relaxed"
                placeholder="Ví dụ: Theo định lý Pitago, C = 2πr = 2 * 3.14 * 5 = 31.4 cm..."
              />
            </label>

            {editType === 'mcq' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <label className="space-y-1 flex flex-col min-h-[120px]">
                  <span className="text-slate-300 font-semibold text-xs">
                    Các lựa chọn (Mỗi lựa chọn 1 dòng) <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    value={editOptions}
                    onChange={(e) => setEditOptions(e.target.value)}
                    placeholder="Lựa chọn A&#10;Lựa chọn B&#10;Lựa chọn C&#10;Lựa chọn D"
                    className={`w-full flex-1 p-3 rounded-xl border ${formAttempted && !editOptions.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-white outline-none resize-none font-mono text-xs leading-relaxed`}
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-slate-300 font-semibold text-xs">
                    Đáp án đúng (Khớp với một trong các lựa chọn) <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    value={editCorrectAnswer}
                    onChange={(e) => setEditCorrectAnswer(e.target.value)}
                    placeholder="Nhập chính xác đáp án đúng..."
                    className={`w-full h-24 p-3 rounded-xl border ${formAttempted && !editCorrectAnswer.trim() ? 'border-red-500/80 bg-red-500/5 focus:border-red-500' : 'border-white/10 bg-black/40 focus:border-synth-cyan'} text-white outline-none resize-none font-mono text-xs`}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons Footer */}
          <div className="flex justify-between items-center gap-3 border-t border-white/10 pt-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/5 transition-colors cursor-pointer uppercase font-orbitron font-bold text-xs tracking-wider"
            >
              {isAddingNew ? 'Hủy bỏ' : '✕ Đóng'}
            </button>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="px-4 py-2.5 bg-synth-magenta/20 text-synth-magenta border border-synth-magenta/40 rounded-xl hover:bg-synth-magenta/30 transition-colors uppercase font-orbitron font-bold text-xs tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                {isPreviewMode ? <Edit2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreviewMode ? 'Tiếp tục Sửa' : 'Preview'}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-6 py-2.5 text-black font-bold font-orbitron rounded-xl transition-all text-xs uppercase cursor-pointer ${
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
                  className="px-4 py-2.5 bg-red-600/20 border border-red-500/40 text-red-400 font-black font-orbitron rounded-xl hover:bg-red-600 hover:text-white transition-all text-xs uppercase cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-50"
                >
                  ❌ Chưa Đạt Chuẩn
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black font-orbitron rounded-xl hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all text-xs uppercase cursor-pointer flex items-center gap-1 shrink-0 disabled:opacity-50"
                >
                  🏆 Đạt Chuẩn
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </FullscreenModal>
  );
};

