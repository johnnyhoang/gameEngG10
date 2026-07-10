import React, { useState, useMemo } from 'react';
import { Database, Search, Sparkles } from 'lucide-react';
import type { Question, SubjectId } from '../../types/game';
import { SUBJECTS_CONFIG } from '../../types/game';
import { ENGLISH_EXAM_BLUEPRINT, ENGLISH_TASK_LABELS } from '../../data/englishExamBlueprint';
import { MATH_EXAM_BLUEPRINT, MATH_TOPIC_LABELS } from '../../data/mathExamBlueprint';
import { LITERATURE_EXAM_BLUEPRINT, LITERATURE_TASK_LABELS } from '../../data/literatureExamBlueprint';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';

interface QuestionBankManagerProps {
  questions: Question[];
  deleteQuestion: (id: string) => Promise<boolean>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<boolean>;
  importQuestions?: (questions: any[], lessonId?: string) => Promise<void>;
}

const QUESTION_TYPE_LABELS: Record<Question['type'], string> = {
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

const ENGLISH_PART_LABELS = Object.fromEntries(ENGLISH_EXAM_BLUEPRINT.map(part => [part.part, part.title])) as Record<string, string>;
const MATH_PART_LABELS = Object.fromEntries(MATH_EXAM_BLUEPRINT.map(part => [part.part, part.title])) as Record<string, string>;
const LITERATURE_PART_LABELS = Object.fromEntries(LITERATURE_EXAM_BLUEPRINT.map(part => [part.part, part.title])) as Record<string, string>;

const humanizeKey = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());

const getExamPartLabel = (question: Question) => {
  const part = question.metadata?.examPart?.trim();
  if (!part) return 'Chưa gắn part';
  if (question.subject === 'math') return MATH_PART_LABELS[part] ? `${part} - ${MATH_PART_LABELS[part]}` : part;
  if (question.subject === 'literature') return LITERATURE_PART_LABELS[part] ? `${part} - ${LITERATURE_PART_LABELS[part]}` : part;
  return ENGLISH_PART_LABELS[part] ? `${part} - ${ENGLISH_PART_LABELS[part]}` : part;
};

const getTopicLabel = (question: Question) => {
  if (question.subject === 'math') {
    const topic = question.metadata?.mathTopic || question.category;
    return MATH_TOPIC_LABELS[topic as keyof typeof MATH_TOPIC_LABELS] || humanizeKey(topic || 'Chưa phân loại');
  }
  if (question.subject === 'literature') {
    const topic = question.metadata?.literatureTask || question.category;
    return LITERATURE_TASK_LABELS[topic as keyof typeof LITERATURE_TASK_LABELS] || humanizeKey(topic || 'Chưa phân loại');
  }
  const topic = question.metadata?.englishTask || question.category;
  return ENGLISH_TASK_LABELS[topic as keyof typeof ENGLISH_TASK_LABELS] || humanizeKey(topic || 'Chưa phân loại');
};

export const QuestionBankManager: React.FC<QuestionBankManagerProps> = ({
  questions,
  deleteQuestion,
  updateQuestion,
  importQuestions
}) => {
  const [selectedSect, setSelectedSect] = useState<SubjectId | null>(null);
  const [questionQuery, setQuestionQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'english' | 'math' | 'literature'>('all');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<'all' | Question['type']>('all');
  const [examPartFilter, setExamPartFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [confusedFilter, setConfusedFilter] = useState<'all' | 'confused'>('all');

  // local state for editing / adding question
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
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

  // AI Ingest state
  const [rawText, setRawText] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);

  // Filters logic
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchSect = selectedSect ? q.subject === selectedSect : true;
      const matchSub = subjectFilter === 'all' ? true : q.subject === subjectFilter;
      const matchType = questionTypeFilter === 'all' ? true : q.type === questionTypeFilter;
      const matchPart = examPartFilter === 'all' ? true : q.metadata?.examPart === examPartFilter;
      const matchTopic = topicFilter === 'all' ? true : q.category === topicFilter;
      const matchConfused = confusedFilter === 'all' ? true : q.isConfused === true;

      const qText = `${q.prompt} ${q.category} ${q.source || ''} ${q.id}`.toLowerCase();
      const matchQuery = qText.includes(questionQuery.toLowerCase());

      return matchSect && matchSub && matchType && matchPart && matchTopic && matchConfused && matchQuery;
    });
  }, [questions, selectedSect, subjectFilter, questionTypeFilter, examPartFilter, topicFilter, confusedFilter, questionQuery]);


  // Counts helpers
  const questionTypeCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const examPartCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      const key = q.metadata?.examPart?.trim() || 'Chưa gắn part';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const topicCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      const key = q.category?.trim() || 'Chưa phân loại';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const topTypeEntries = Object.entries(questionTypeCounts).sort((a, b) => b[1] - a[1]);
  const topExamParts = Object.entries(examPartCounts).sort((a, b) => b[1] - a[1]);
  const topTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

  const examPartLabelMap = useMemo(() => {
    return questions.reduce((acc: Record<string, string>, q) => {
      const key = q.metadata?.examPart?.trim() || 'Chưa gắn part';
      if (!acc[key]) acc[key] = getExamPartLabel(q);
      return acc;
    }, {});
  }, [questions]);

  const topicLabelMap = useMemo(() => {
    return questions.reduce((acc: Record<string, string>, q) => {
      const key = q.category?.trim() || 'Chưa phân loại';
      if (!acc[key]) acc[key] = getTopicLabel(q);
      return acc;
    }, {});
  }, [questions]);

  // Handle Edit/Save
  const startEdit = (q: Question) => {
    setEditingQuestion(q);
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
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

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
      subject: editSubject
    };

    const ok = await updateQuestion(editingQuestion.id, payload);
    if (ok) {
      setEditingQuestion(null);
      toast.success('Đã lưu thay đổi câu hỏi thành công!');
    }
  };

  // AI Ingest
  const handleAiIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim() || !selectedSect) {
      toast.error('Vui lòng điền đề thi thô và chọn môn học!');
      return;
    }

    setIsIngesting(true);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error('No auth token');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');
      const res = await fetch(`${backendUrl}/api/ai/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          rawText: rawText.trim(),
          subject: selectedSect,
          lessonId: `ai-ingest-${Date.now()}`
        })
      });

      if (!res.ok) {
        throw new Error('API ingest failed');
      }

      const data = await res.json();
      if (data.success && data.questions && importQuestions) {
        await importQuestions(data.questions);
        toast.success(`Đã tự động Ingest & lưu thành công ${data.questions.length} câu hỏi! 🎇`);
        setRawText('');
      } else {
        toast.error('Lỗi định dạng response từ AI.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi gọi AI Ingest đề thi.');
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {selectedSect === null ? (
        <div className="glass-panel rounded-2xl border border-white/5 p-8 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-synth-cyan/10 border border-synth-cyan/30 flex items-center justify-center">
              <Database className="w-8 h-8 text-synth-cyan" />
            </div>
            <h2 className="font-orbitron font-black text-xl text-white uppercase tracking-wider flex items-center justify-center gap-2">
              📚 VẠN QUYỂN CÁC (KHO TRI THỨC & KHẢO HẠCH)
            </h2>
            <p className="text-xs text-synth-text-muted">
              Kính xin Viện Chủ lựa chọn Môn phái cần thiết lập giáo án và khảo hạch để tiếp tục.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
            {Object.values(SUBJECTS_CONFIG).map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSect(sub.id);
                  setEditSubject(sub.id);
                  setSubjectFilter(sub.id as any);
                }}
                className="rounded-2xl border border-white/5 bg-synth-gray/10 p-5 text-left hover:border-white/10 hover:bg-synth-gray/20 transition-all cursor-pointer group shadow-lg"
                style={{ borderLeft: `4px solid ${sub.color}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sub.icon}</span>
                  <div>
                    <span className="block text-xs font-black uppercase font-orbitron text-white group-hover:text-synth-cyan transition-colors">
                      {sub.name}
                    </span>
                    <span className="block text-[10px] text-synth-text-muted mt-0.5">
                      {sub.group === 'chuyen_sau' ? 'Môn thi Chuyên Sâu Lớp 10' : 'Môn tu học Cơ Bản Lớp 9'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header context info */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-synth-gray/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{SUBJECTS_CONFIG[selectedSect].icon}</span>
              <div>
                <span className="block text-xs font-black uppercase font-orbitron text-white">
                  Môn phái đang quản lý: {SUBJECTS_CONFIG[selectedSect].name}
                </span>
                <span className="block text-[10px] text-synth-text-muted">
                  Ngữ cảnh được cô lập để tránh trộn lẫn ngân hàng câu hỏi.
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedSect(null)}
              className="text-[10px] px-3 py-1.5 rounded-lg border border-white/10 text-synth-text-muted hover:text-white uppercase font-bold cursor-pointer transition-colors"
            >
              Đổi môn phái
            </button>
          </div>

          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
              <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Ngân hàng câu hỏi hiện có
              </h4>

              <div className="w-full xl:max-w-xl space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-synth-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={questionQuery}
                    onChange={(e) => setQuestionQuery(e.target.value)}
                    placeholder="Tìm theo đề bài, chuyên đề, part, kỹ năng, nguồn..."
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-white/10 bg-synth-gray/20 text-xs text-white outline-none focus:border-synth-cyan"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 items-start">
              {/* Left Column: Filters */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider">Lọc câu hỏi</span>
                    <button
                      onClick={() => {
                        setQuestionTypeFilter('all');
                        setExamPartFilter('all');
                        setTopicFilter('all');
                        setConfusedFilter('all');
                        setQuestionQuery('');
                      }}
                      className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold uppercase hover:bg-white/10 text-white"
                    >
                      Xóa lọc
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="space-y-1 text-[10px] block">
                      <span className="uppercase font-orbitron font-bold text-synth-text-muted">Dạng câu</span>
                      <select
                        value={questionTypeFilter}
                        onChange={(e) => setQuestionTypeFilter(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs"
                      >
                        <option value="all">Tất cả dạng</option>
                        {topTypeEntries.map(([type, count]) => (
                          <option key={type} value={type}>
                            {QUESTION_TYPE_LABELS[type as Question['type']] || type} ({count})
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-1 text-[10px] block">
                      <span className="uppercase font-orbitron font-bold text-synth-text-muted">Bài / Part</span>
                      <select
                        value={examPartFilter}
                        onChange={(e) => setExamPartFilter(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs"
                      >
                        <option value="all">Tất cả part</option>
                        {topExamParts.map(([part, count]) => (
                          <option key={part} value={part}>
                            {examPartLabelMap[part] || part} ({count})
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-1 text-[10px] block">
                      <span className="uppercase font-orbitron font-bold text-synth-text-muted">Chuyên đề (Topic)</span>
                      <select
                        value={topicFilter}
                        onChange={(e) => setTopicFilter(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs"
                      >
                        <option value="all">Tất cả topic</option>
                        {topTopics.map(([topic, count]) => (
                          <option key={topic} value={topic}>
                            {topicLabelMap[topic] || topic} ({count})
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-1 text-[10px] block">
                      <span className="uppercase font-orbitron font-bold text-synth-text-muted">Trạng thái</span>
                      <select
                        value={confusedFilter}
                        onChange={(e) => setConfusedFilter(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs"
                      >
                        <option value="all">Tất cả câu</option>
                        <option value="confused">Con hổng hiểu 🧠 ({questions.filter(q => q.isConfused).length})</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              {/* Middle Column: List of Questions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-synth-text-muted">
                  <span>Hiển thị: <strong>{filteredQuestions.length}</strong> / {questions.length} câu</span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(q => {
                      const isCustom = q.source?.startsWith('AI Ingested') || q.id.startsWith('hcmc-') || q.id.startsWith('mock-') || q.isConfused;
                      return (
                        <div key={q.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {q.isConfused && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase font-orbitron border border-red-500/40">
                                    Con hổng hiểu 🧠
                                  </span>
                                )}
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-cyan/20 text-synth-cyan font-bold uppercase font-orbitron">
                                  {QUESTION_TYPE_LABELS[q.type] || q.type}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta font-bold uppercase font-orbitron">
                                  {getTopicLabel(q)}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-green/15 text-synth-green font-bold uppercase font-orbitron">
                                  Độ khó: {q.difficulty}/10
                                </span>
                              </div>
                              <p className="text-sm text-white font-medium">{q.prompt}</p>
                              {q.imageUrl && (
                                <img src={q.imageUrl} alt="Đồ họa đề thi" className="max-h-24 rounded-lg bg-black/20 p-1 border border-white/5" />
                              )}
                              {q.explanation && (
                                <p className="text-[10px] text-synth-text-muted italic bg-white/5 p-2 rounded-lg mt-1">
                                  💡 Giải thích: {q.explanation}
                                </p>
                              )}
                            </div>

                            {isCustom && (
                              <div className="flex gap-2 shrink-0">
                                <button
                                  onClick={() => startEdit(q)}
                                  className="px-2 py-1 rounded bg-synth-cyan/10 border border-synth-cyan/30 text-synth-cyan text-[10px] uppercase font-bold"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={async () => {
                                    if (window.confirm(`Xóa câu hỏi này?\n\n${q.prompt}`)) {
                                      await deleteQuestion(q.id);
                                    }
                                  }}
                                  className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] uppercase font-bold"
                                >
                                  Xóa
                                </button>
                              </div>
                            )}
                          </div>

                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs pt-1 border-t border-white/5">
                              {q.options.map((opt, idx) => (
                                <div
                                  key={idx}
                                  className={`rounded-lg px-2.5 py-1.5 border text-[11px] ${Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(opt) : q.correctAnswer === opt ? 'border-synth-green text-synth-green bg-synth-green/10 font-bold' : 'border-white/5 text-synth-text-muted bg-white/5'}`}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-xs text-synth-text-muted">
                      Không có câu hỏi nào khớp bộ lọc.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Edit Form / Ingest tool */}
              <div className="space-y-4">
                {/* Form sửa câu hỏi */}
                {editingQuestion && (
                  <div className="glass-panel rounded-2xl border border-synth-cyan/30 bg-synth-cyan/5 p-4 space-y-3">
                    <h5 className="text-xs font-bold text-synth-cyan uppercase font-orbitron flex items-center justify-between">
                      <span>✏️ Chỉnh sửa câu hỏi</span>
                      <button onClick={() => setEditingQuestion(null)} className="text-[10px] text-white">Đóng</button>
                    </h5>
                    <form onSubmit={handleUpdate} className="space-y-3 text-xs">
                      <label className="space-y-1 block">
                        <span>Đề bài</span>
                        <textarea
                          value={editPrompt}
                          onChange={(e) => setEditPrompt(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-16 resize-none"
                        />
                      </label>
                      <label className="space-y-1 block">
                        <span>Giải thích lời giải</span>
                        <textarea
                          value={editExplanation}
                          onChange={(e) => setEditExplanation(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-12 resize-none"
                        />
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="space-y-1 block">
                          <span>Chuyên đề</span>
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
                          />
                        </label>
                        <label className="space-y-1 block">
                          <span>Độ khó (1-10)</span>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={editDifficulty}
                            onChange={(e) => setEditDifficulty(Number(e.target.value))}
                            className="w-full p-2 rounded-lg border border-white/10 bg-black/40 text-xs text-white"
                          />
                        </label>
                      </div>

                      {editType === 'mcq' && (
                        <label className="space-y-1 block">
                          <span>Các lựa chọn (Mỗi dòng 1 lựa chọn)</span>
                          <textarea
                            value={editOptions}
                            onChange={(e) => setEditOptions(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-16 resize-none font-mono"
                          />
                        </label>
                      )}

                      <label className="space-y-1 block">
                        <span>Đáp án đúng (Nếu trắc nghiệm, phải giống hệt lựa chọn. Nếu nhiều đáp án đúng, mỗi dòng 1 đáp án)</span>
                        <textarea
                          value={editCorrectAnswer}
                          onChange={(e) => setEditCorrectAnswer(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-xs text-white h-12 resize-none font-mono"
                        />
                      </label>

                      <button
                        type="submit"
                        className="w-full py-2 bg-synth-cyan text-black font-bold rounded-lg hover:synth-glow-cyan text-xs uppercase"
                      >
                        Cập nhật câu hỏi
                      </button>
                    </form>
                  </div>
                )}

                {/* AI Ingest đề thi */}
                <div className="glass-panel rounded-2xl border border-white/5 p-4 space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase font-orbitron flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-synth-orange" /> Ingest Đề Thi Tự Động bằng AI
                  </h5>
                  <p className="text-[10px] text-synth-text-muted">
                    Sao chép các câu hỏi thi tuyển sinh 10 (Text thô) vào khung dưới đây. AI của Viện Chủ sẽ tự động phân loại cấu trúc đề thi, tách đáp án, topic và nạp trực tiếp vào Vạn Quyển Các!
                  </p>

                  <form onSubmit={handleAiIngest} className="space-y-3">
                    <textarea
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder="Ví dụ:&#10;Câu 1: Cho biểu thức A = (căn x + 1)/(căn x - 1)...&#10;Câu 2: Rút gọn biểu thức..."
                      className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-[11px] text-white h-36 resize-none outline-none focus:border-synth-orange"
                    />

                    <button
                      type="submit"
                      disabled={isIngesting || !rawText.trim()}
                      className="w-full py-2 bg-synth-orange text-black font-bold rounded-lg hover:synth-glow-orange disabled:opacity-50 transition-all text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {isIngesting ? 'AI đang phân tích...' : 'Ingest Đề Thi 🎇'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
