import React, { useState, useMemo, useEffect } from 'react';
import { Database, Search, Sparkles, ShieldCheck, AlertTriangle, Plus, X } from 'lucide-react';
import type { Question, SubjectId } from '../../types/game';
import { SUBJECTS_CONFIG } from '../../types/game';
import { ENGLISH_EXAM_BLUEPRINT, ENGLISH_TASK_LABELS } from '../../data/englishExamBlueprint';
import { MATH_EXAM_BLUEPRINT, MATH_TOPIC_LABELS } from '../../data/mathExamBlueprint';
import { getSubjectQuestionMetadata } from '../../subject-modules/registry';
import { toast } from '../../utils/toast';
import { supabase } from '../../utils/supabaseClient';
import { getRiddleCoverageStats, isRiddleEligible } from '../../miniapps/riddle/riddleEngine';
import { CORE_KNOWLEDGE_TOPICS } from '../../data/coreKnowledge';
import { useGameState } from '../../hooks/useGameState';

import { QuestionFormModal } from './Modals/QuestionFormModal';

interface QuestionBankManagerProps {
  questions: Question[];
  deleteQuestion: (id: string) => Promise<boolean>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<boolean>;
  addQuestion: (question: Partial<Question>) => Promise<boolean>;
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

const humanizeKey = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());

const getExamPartLabel = (question: Question) => {
  const part = question.metadata?.examPart?.trim();
  if (!part) return 'Chưa gắn part';
  const moduleLabel = getSubjectQuestionMetadata(question.subject as SubjectId)?.getExamPartLabel(question);
  if (moduleLabel) return moduleLabel;
  if (question.subject === 'math') return MATH_PART_LABELS[part] ? `${part} - ${MATH_PART_LABELS[part]}` : part;
  return ENGLISH_PART_LABELS[part] ? `${part} - ${ENGLISH_PART_LABELS[part]}` : part;
};

const getTopicLabel = (question: Question) => {
  const moduleLabel = getSubjectQuestionMetadata(question.subject as SubjectId)?.getTopicLabel(question);
  if (moduleLabel) return moduleLabel;
  if (question.subject === 'math') {
    const topic = question.metadata?.mathTopic || question.category;
    return MATH_TOPIC_LABELS[topic as keyof typeof MATH_TOPIC_LABELS] || humanizeKey(topic || 'Chưa phân loại');
  }
  const topic = question.metadata?.englishTask || question.category;
  return ENGLISH_TASK_LABELS[topic as keyof typeof ENGLISH_TASK_LABELS] || humanizeKey(topic || 'Chưa phân loại');
};

export const QuestionBankManager: React.FC<QuestionBankManagerProps> = ({
  questions,
  deleteQuestion,
  updateQuestion,
  addQuestion,
  importQuestions
}) => {
  const activeGradeTier = useGameState(state => state.activeGradeTier);
  const currentProfileId = useGameState(state => state.currentUser?.id);
  const [selectedSect, setSelectedSect] = useState<SubjectId | null>(null);
  const [questionQuery, setQuestionQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'english' | 'math' | 'literature'>('all');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<'all' | Question['type']>('all');
  const [examPartFilter, setExamPartFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [confusedFilter, setConfusedFilter] = useState<'all' | 'confused'>('all');
  const [riddleFilter, setRiddleFilter] = useState<'all' | 'eligible' | 'not-eligible'>('all');

  // local state for editing / adding question
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Lazy Load Paging
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [selectedSect, questionQuery, subjectFilter, questionTypeFilter, examPartFilter, topicFilter, confusedFilter, riddleFilter]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 50) {
      if (visibleCount < filteredQuestions.length) {
        setVisibleCount(prev => prev + 10);
      }
    }
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingQuestion(null);
  };

  // AI Ingest state
  const [rawText, setRawText] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [pendingAiQuestions, setPendingAiQuestions] = useState<any[]>([]);
  const [isConfirmingAiImport, setIsConfirmingAiImport] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({});
  const contextQuestions = useMemo(
    () => questions.filter(question => (question.gradeTier ?? question.grade ?? 9) === activeGradeTier),
    [questions, activeGradeTier]
  );

  // Filters logic
  const filteredQuestions = useMemo(() => {
    return contextQuestions.filter(q => {
      const matchSect = selectedSect ? q.subject === selectedSect : true;
      const matchGrade = (q.gradeTier ?? q.grade ?? 9) === activeGradeTier;
      const matchSub = subjectFilter === 'all' ? true : q.subject === subjectFilter;
      const matchType = questionTypeFilter === 'all' ? true : q.type === questionTypeFilter;
      const matchPart = examPartFilter === 'all' ? true : q.metadata?.examPart === examPartFilter;
      const matchTopic = topicFilter === 'all' ? true : q.topicId === topicFilter;
      const matchConfused = confusedFilter === 'all' ? true : q.isConfused === true;
      const matchRiddle = riddleFilter === 'all' ? true : riddleFilter === 'eligible' ? isRiddleEligible(q) : !isRiddleEligible(q);

      const qText = `${q.prompt} ${q.category} ${q.source || ''} ${q.id}`.toLowerCase();
      const matchQuery = qText.includes(questionQuery.toLowerCase());

      return matchGrade && matchSect && matchSub && matchType && matchPart && matchTopic && matchConfused && matchRiddle && matchQuery;
    });
  }, [contextQuestions, activeGradeTier, selectedSect, subjectFilter, questionTypeFilter, examPartFilter, topicFilter, confusedFilter, riddleFilter, questionQuery]);

  // Thống kê câu đủ điều kiện cho hai mini-game câu đố theo môn và Hầm nguyên tố.
  const riddleStats = useMemo(() => getRiddleCoverageStats(contextQuestions), [contextQuestions]);

  const coreCoverage = useMemo(() => {
    if (!selectedSect) return null;
    const topics = CORE_KNOWLEDGE_TOPICS.filter(topic =>
      topic.subjectId === selectedSect && (topic.gradeTier ?? 9) === activeGradeTier
    );
    const counts = contextQuestions.reduce<Record<string, number>>((acc, question) => {
      if (question.subject === selectedSect && question.topicId) {
        acc[question.topicId] = (acc[question.topicId] || 0) + 1;
      }
      return acc;
    }, {});
    const items = topics.map(topic => ({
      ...topic,
      count: counts[topic.id] || 0,
      ratio: topic.minQuestions > 0 ? (counts[topic.id] || 0) / topic.minQuestions : 1,
    }));
    const current = items.reduce((sum, item) => sum + Math.min(item.count, item.minQuestions), 0);
    const required = items.reduce((sum, item) => sum + item.minQuestions, 0);
    const byHam = (['hoa', 'bang', 'thach'] as const).map(ham => {
      const hamItems = items.filter(item => item.hamNguyenTo === ham);
      const hamCurrent = hamItems.reduce((sum, item) => sum + Math.min(item.count, item.minQuestions), 0);
      const hamRequired = hamItems.reduce((sum, item) => sum + item.minQuestions, 0);
      return {
        ham,
        current: hamCurrent,
        required: hamRequired,
        percent: hamRequired > 0 ? Math.round((hamCurrent / hamRequired) * 100) : 100,
      };
    });
    return {
      items,
      highPriorityGaps: items.filter(item => item.examRelevance === 'high' && item.count < item.minQuestions),
      current,
      required,
      percent: required > 0 ? Math.round((current / required) * 100) : 100,
      byHam,
    };
  }, [contextQuestions, selectedSect, activeGradeTier]);


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
      const key = q.topicId?.trim() || 'untagged';
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
    return Object.fromEntries([
      ['untagged', 'Chưa gắn chuyên đề'],
      ...CORE_KNOWLEDGE_TOPICS.map(topic => [topic.id, topic.label]),
    ]);
  }, []);

  // Handle Edit/Save
  const startEdit = (q: Question) => {
    setIsAddingNew(false);
    setEditingQuestion(q);
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
          Authorization: `Bearer ${token}`,
          'X-Profile-Id': currentProfileId || ''
        },
        body: JSON.stringify({
          rawText: rawText.trim(),
          subject: selectedSect,
          topicCatalog: CORE_KNOWLEDGE_TOPICS
            .filter(topic => topic.subjectId === selectedSect)
            .map(topic => ({ id: topic.id, label: topic.label, examRelevance: topic.examRelevance }))
        })
      });

      if (!res.ok) {
        throw new Error('API ingest failed');
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setPendingAiQuestions(data.questions);
        toast.success(`AI đã đề xuất ${data.questions.length} câu. Vui lòng rà chuyên đề trước khi lưu.`);
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

  const confirmAiImport = async () => {
    if (!importQuestions || pendingAiQuestions.length === 0) return;
    const missingTopic = pendingAiQuestions.find(question => !question.topicId);
    if (missingTopic) {
      toast.error('Mỗi câu hỏi phải được chọn một chuyên đề trước khi lưu.');
      return;
    }
    setIsConfirmingAiImport(true);
    try {
      await importQuestions(
        pendingAiQuestions.map(question => ({ ...question, gradeTier: activeGradeTier })),
        `ai-ingest-${Date.now()}`
      );
      toast.success(`Đã lưu ${pendingAiQuestions.length} câu hỏi sau khi review.`);
      setPendingAiQuestions([]);
      setRawText('');
    } catch (error) {
      console.error(error);
      toast.error('Không thể lưu danh sách câu hỏi đã review.');
    } finally {
      setIsConfirmingAiImport(false);
    }
  };

  const handleDeleteQuestion = async (e: React.MouseEvent, qId: string, qPrompt: string) => {
    e.stopPropagation();
    if (deletingIds[qId]) return;
    if (window.confirm(`⚠️ BẠN CÓ CHẮC CHẮN MUỐN XÓA CÂU HỎI NÀY?\n\nĐề bài: "${qPrompt}"\n\nHành động này sẽ xóa vĩnh viễn khỏi ngân hàng câu hỏi.`)) {
      setDeletingIds(prev => ({ ...prev, [qId]: true }));
      try {
        const ok = await deleteQuestion(qId);
        if (ok) toast.success('Đã xóa câu hỏi thành công! 🗑️');
      } catch (err) {
        console.error(err);
        toast.error('Xóa câu hỏi thất bại.');
      } finally {
        setDeletingIds(prev => ({ ...prev, [qId]: false }));
      }
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
              📚 KHO ĐỀ THI
            </h2>
            <p className="text-xs text-synth-text-muted">
              Kính xin Viện Trưởng lựa chọn Môn phái cần thiết lập giáo án và khảo hạch để tiếp tục.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
            {Object.values(SUBJECTS_CONFIG).map(sub => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSect(sub.id);
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
                    {(() => {
                      const stat = riddleStats[sub.id];
                      const eligible = stat?.eligible || 0;
                      const isLow = eligible === 0;
                      return (
                        <span className={`inline-flex items-center gap-1 mt-1.5 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase font-orbitron border ${isLow ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>
                          {isLow ? <AlertTriangle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                          {eligible} câu đố
                        </span>
                      );
                    })()}
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
            <div className="flex items-center gap-2">
              <button
                onClick={startAddNew}
                className="text-[10px] px-3 py-1.5 rounded-lg bg-synth-cyan text-black hover:opacity-85 uppercase font-black font-orbitron cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm Câu Hỏi
              </button>
              <button
                onClick={() => setSelectedSect(null)}
                className="text-[10px] px-3 py-1.5 rounded-lg border border-white/10 text-synth-text-muted hover:text-white uppercase font-bold cursor-pointer transition-colors"
              >
                Đổi môn phái
              </button>
            </div>
          </div>

          {/* Coverage chuyên đề cốt lõi — CORE_SPECS §9.6 */}
          {coreCoverage && (
            <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider">
                    Độ phủ chuyên đề cốt lõi — {SUBJECTS_CONFIG[selectedSect].name}
                  </span>
                  <p className="text-[10px] text-synth-text-muted mt-1">
                    {coreCoverage.current.toLocaleString()} / {coreCoverage.required.toLocaleString()} câu theo định mức
                  </p>
                </div>
                <span className="text-lg font-orbitron font-black text-synth-cyan">{coreCoverage.percent}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-black/30 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-synth-cyan to-synth-green transition-all"
                  style={{ width: `${Math.min(coreCoverage.percent, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {coreCoverage.byHam.map(item => {
                  const label = item.ham === 'hoa' ? '🔥 Hỏa Hầm' : item.ham === 'bang' ? '❄️ Băng Hầm' : '🪨 Thạch Hầm';
                  return (
                    <div key={item.ham} className="rounded-xl border border-white/5 bg-white/5 p-3 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-synth-text-muted">{label}</span>
                        <span className="text-white">{item.percent}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/30 overflow-hidden">
                        <div className="h-full bg-synth-cyan" style={{ width: `${Math.min(item.percent, 100)}%` }} />
                      </div>
                      <span className="block text-[9px] text-synth-text-muted">{item.current} / {item.required} câu</span>
                    </div>
                  );
                })}
              </div>

              {coreCoverage.highPriorityGaps.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-red-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {coreCoverage.highPriorityGaps.length} chuyên đề ưu tiên cao đang thiếu câu
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {coreCoverage.highPriorityGaps.map(item => {
                      const severity = item.ratio < 0.5 ? 'red' : 'yellow';
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTopicFilter(item.id);
                            document.getElementById('question-bank-tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className={`rounded-xl border p-3 text-left cursor-pointer transition-colors ${
                            severity === 'red'
                              ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10'
                              : 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10'
                          }`}
                          title="Lọc ngân hàng theo chuyên đề này"
                        >
                          <span className="block text-[10px] font-bold text-white line-clamp-2">{item.label}</span>
                          <span className={`block mt-1 text-[10px] font-orbitron font-black ${severity === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                            {item.count} / {item.minQuestions} câu
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-synth-green">
                  <ShieldCheck className="w-3.5 h-3.5" /> Đủ định mức cho mọi chuyên đề ưu tiên cao
                </div>
              )}
            </div>
          )}

          {/* Thống kê câu đố (CORE_SPECS §9.5) — số câu đủ điều kiện theo Hầm nguyên tố */}
          <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-synth-cyan" /> Thống kê câu đố — {SUBJECTS_CONFIG[selectedSect].name}
              </span>
              <span className="text-[10px] font-bold text-white">
                Tổng: {riddleStats[selectedSect]?.eligible || 0} / {riddleStats[selectedSect]?.total || 0} câu
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {([
                { ham: 'hoa', label: '🔥 Hỏa Hầm' },
                { ham: 'bang', label: '❄️ Băng Hầm' },
                { ham: 'thach', label: '🪨 Thạch Hầm' },
              ] as const).map(({ ham, label }) => {
                const count = riddleStats[selectedSect]?.byHam[ham] || 0;
                const isLow = count === 0;
                return (
                  <div
                    key={ham}
                    className={`rounded-xl border p-3 text-center ${isLow ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 bg-white/5'}`}
                  >
                    <span className="block text-[10px] text-synth-text-muted uppercase font-bold">{label}</span>
                    <span className={`block text-lg font-orbitron font-black ${isLow ? 'text-red-400' : 'text-white'}`}>{count}</span>
                    {isLow && (
                      <span className="flex items-center justify-center gap-1 text-[9px] text-red-400 mt-1">
                        <AlertTriangle className="w-3 h-3" /> Thiếu câu
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div id="question-bank-tools" className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5 scroll-mt-24">
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

            <div className="flex flex-col gap-6">
              {/* Row 1: Filters */}
              <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider">Bộ lọc câu hỏi</span>
                  <button
                    onClick={() => {
                      setQuestionTypeFilter('all');
                      setExamPartFilter('all');
                      setTopicFilter('all');
                      setConfusedFilter('all');
                      setRiddleFilter('all');
                      setQuestionQuery('');
                    }}
                    className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold uppercase hover:bg-white/10 text-white cursor-pointer transition-colors"
                  >
                    Xóa lọc
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <label className="space-y-1 text-[10px] block">
                    <span className="uppercase font-orbitron font-bold text-synth-text-muted">Dạng câu</span>
                    <select
                      value={questionTypeFilter}
                      onChange={(e) => setQuestionTypeFilter(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
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
                      className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
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
                      className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
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
                      className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
                    >
                      <option value="all">Tất cả câu</option>
                      <option value="confused">Con hổng hiểu 🧠 ({questions.filter(q => q.isConfused).length})</option>
                    </select>
                  </label>
                  <label className="space-y-1 text-[10px] block">
                    <span className="uppercase font-orbitron font-bold text-synth-text-muted">Mini-game câu đố</span>
                    <select
                      value={riddleFilter}
                      onChange={(e) => setRiddleFilter(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs cursor-pointer outline-none focus:border-synth-cyan"
                    >
                      <option value="all">Tất cả câu</option>
                      <option value="eligible">🐷 Đủ điều kiện câu đố ({questions.filter(isRiddleEligible).length})</option>
                      <option value="not-eligible">Chưa đủ điều kiện</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Row 2: AI Ingest tool (Full Width) */}
              <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-synth-orange animate-pulse" />
                  <h5 className="text-xs font-bold text-synth-orange uppercase font-orbitron">
                    Ingest đề thi bằng AI ✨ (Dán thô văn bản đề thi)
                  </h5>
                </div>
                <p className="text-[10px] text-synth-text-muted leading-relaxed">
                  Dán đề thi của bạn vào ô dưới đây (hỗ trợ đề thi trắc nghiệm tiếng Việt/tiếng Anh thô). AI của Phòng Học Vụ sẽ tự động nhận diện câu hỏi, lựa chọn, đáp án, và đề xuất lời giải thích chi tiết.
                </p>

                <form onSubmit={handleAiIngest} className="space-y-3">
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Ví dụ:&#10;Câu 1: Cho biểu thức A = (căn x + 1)/(căn x - 1)...&#10;Câu 2: Rút gọn biểu thức..."
                    className="w-full p-2.5 rounded-lg border border-white/10 bg-black/40 text-[11px] text-white h-24 resize-none outline-none focus:border-synth-orange"
                  />
                  <button
                    type="submit"
                    disabled={isIngesting || !rawText.trim()}
                    className="w-full py-2.5 bg-synth-orange text-black font-bold rounded-lg hover:synth-glow-orange disabled:opacity-50 transition-all text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isIngesting ? 'AI đang phân tích...' : 'Ingest Đề Thi 🎇'}
                  </button>
                </form>

                {pendingAiQuestions.length > 0 && (
                  <div className="rounded-xl border border-synth-orange/30 bg-synth-orange/5 p-4 space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h6 className="text-[11px] font-orbitron font-black uppercase text-synth-orange">
                          Hàng chờ review — {pendingAiQuestions.length} câu
                        </h6>
                        <p className="text-[10px] text-synth-text-muted mt-1">
                          Kiểm tra nội dung, đáp án và chuyên đề. Chưa có câu nào được lưu vào Kho Đề Thi.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPendingAiQuestions([])}
                        className="text-[9px] px-2.5 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 cursor-pointer uppercase font-bold"
                      >
                        Hủy đề xuất
                      </button>
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {pendingAiQuestions.map((question, index) => (
                        <div key={question.id || index} className="rounded-lg border border-white/10 bg-black/20 p-3 space-y-2">
                          <p className="text-[11px] text-white leading-relaxed line-clamp-3">
                            <strong>Câu {index + 1}:</strong> {question.prompt}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:items-end">
                            <label className="space-y-1 text-[9px] uppercase font-bold text-synth-text-muted">
                              Chuyên đề đề xuất
                              <select
                                value={question.topicId || ''}
                                onChange={event => setPendingAiQuestions(current => current.map((item, itemIndex) => (
                                  itemIndex === index ? { ...item, topicId: event.target.value } : item
                                )))}
                                className="w-full p-2 rounded-lg border border-white/10 bg-synth-gray/30 text-white text-[10px] outline-none focus:border-synth-orange"
                              >
                                <option value="">Chọn chuyên đề...</option>
                                {CORE_KNOWLEDGE_TOPICS.filter(topic => topic.subjectId === selectedSect).map(topic => (
                                  <option key={topic.id} value={topic.id}>{topic.label}</option>
                                ))}
                              </select>
                            </label>
                            <span className="px-2 py-1.5 rounded-lg border border-white/10 text-[9px] uppercase font-bold text-synth-text-muted">
                              Ưu tiên: {question.suggestedExamRelevance || 'medium'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={confirmAiImport}
                      disabled={isConfirmingAiImport || pendingAiQuestions.some(question => !question.topicId)}
                      className="w-full py-2.5 rounded-lg bg-synth-green text-black font-orbitron font-black text-[10px] uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isConfirmingAiImport ? 'Đang lưu...' : `Xác nhận và lưu ${pendingAiQuestions.length} câu`}
                    </button>
                  </div>
                )}
              </div>

              {/* Row 3: List of Questions (Full Width) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-synth-text-muted">
                  <span>Đang tải: <strong>{Math.min(visibleCount, filteredQuestions.length)}</strong> / {filteredQuestions.length} câu (Tổng {questions.length})</span>
                </div>

                <div 
                  onScroll={handleScroll}
                  className="space-y-3 max-h-[600px] overflow-y-auto pr-1"
                >
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.slice(0, visibleCount).map(q => {
                      const coreTopic = q.topicId ? CORE_KNOWLEDGE_TOPICS.find(topic => topic.id === q.topicId) : undefined;
                      return (
                        <div 
                          key={q.id} 
                          onClick={() => startEdit(q)}
                          className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3 cursor-pointer hover:border-synth-cyan/35 hover:bg-white/[0.07] transition-all duration-300 relative group"
                        >
                          {/* Tick xanh nhỏ xíu ở góc trái trên */}
                          {q.metadata?.isStandard && (
                            <span className="absolute top-2 left-2 text-emerald-400 text-[10px]" title="Câu hỏi đạt chuẩn">
                              ✔️
                            </span>
                          )}

                          {/* Nút Xóa nhanh ở góc phải khi hover */}
                          <button
                            disabled={deletingIds[q.id]}
                            onClick={(e) => handleDeleteQuestion(e, q.id, q.prompt)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center min-w-[28px] min-h-[28px]"
                            title="Xóa câu hỏi này"
                          >
                            {deletingIds[q.id] ? (
                              <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between pr-6">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className={`flex flex-wrap items-center gap-1.5 ${q.metadata?.isStandard ? 'pl-4' : ''}`}>
                                {q.metadata?.isStandard && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase font-orbitron border border-emerald-500/30 flex items-center gap-1">
                                    🏆 Đạt Chuẩn
                                  </span>
                                )}
                                {q.isConfused && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase font-orbitron border border-red-500/40">
                                    Con hổng hiểu 🧠
                                  </span>
                                )}
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-cyan/20 text-synth-cyan font-bold uppercase font-orbitron">
                                  {QUESTION_TYPE_LABELS[q.type] || q.type}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta font-bold uppercase font-orbitron">
                                  {coreTopic?.label || getTopicLabel(q)}
                                </span>
                                {coreTopic && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-synth-text-muted font-bold uppercase border border-white/10">
                                    {coreTopic.hamNguyenTo === 'hoa' ? '🔥 Hỏa Hầm' : coreTopic.hamNguyenTo === 'bang' ? '❄️ Băng Hầm' : '🪨 Thạch Hầm'}
                                  </span>
                                )}
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-synth-green/15 text-synth-green font-bold uppercase font-orbitron">
                                  Độ khó: {q.difficulty}/10
                                </span>
                                {isRiddleEligible(q) && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400 font-bold uppercase font-orbitron border border-yellow-500/30 flex items-center gap-1">
                                    🐷 Câu đố
                                  </span>
                                )}
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
            </div>
          </div>
        </div>
      )}
      <QuestionFormModal
        isOpen={isAddingNew || !!editingQuestion}
        onClose={() => {
          setIsAddingNew(false);
          setEditingQuestion(null);
        }}
        isAddingNew={isAddingNew}
        editingQuestion={editingQuestion}
        selectedSect={selectedSect}
        gradeTier={activeGradeTier}
        addQuestion={addQuestion}
        updateQuestion={updateQuestion}
      />
    </div>
  );
};
