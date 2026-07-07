import React, { useEffect, useMemo, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Question, QuestionMeta } from '../types/game';
import { ENGLISH_ANSWER_MODE_LABELS, ENGLISH_EXAM_BLUEPRINT, ENGLISH_SKILL_LABELS, ENGLISH_TASK_LABELS } from '../data/englishExamBlueprint';
import { MATH_ANSWER_MODE_LABELS, MATH_EXAM_BLUEPRINT, MATH_TOPIC_LABELS } from '../data/mathExamBlueprint';
import { LITERATURE_ANSWER_MODE_LABELS, LITERATURE_EXAM_BLUEPRINT, LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from '../data/literatureExamBlueprint';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock, Unlock, Check, X, Award, Database, Plus, SlidersHorizontal, Search, Pencil, Trash2 } from 'lucide-react';
import { toast } from '../utils/toast';

export const ParentConsole: React.FC = () => {
  const verifyPIN = useGameState(state => state.verifyPIN);
  const approveReward = useGameState(state => state.approveReward);
  const rejectReward = useGameState(state => state.rejectReward);
  const addParentReward = useGameState(state => state.addParentReward);

  // Admin and member management states
  const currentUser = useGameState(state => state.currentUser);
  const adminStudents = useGameState(state => state.adminStudents);
  const selectedStudentProfile = useGameState(state => state.selectedStudentProfile);
  const fetchAdminStudents = useGameState(state => state.fetchAdminStudents);
  const promoteUser = useGameState(state => state.promoteUser);
  const fetchStudentProfile = useGameState(state => state.fetchStudentProfile);
  const adminApproveReward = useGameState(state => state.adminApproveReward);
  const adminRejectReward = useGameState(state => state.adminRejectReward);
  const showHelp = useGameState(state => state.showHelp);
  const adminDeductWallet = useGameState(state => state.adminDeductWallet);
  const adminSetEnergy = useGameState(state => state.adminSetEnergy);
  const updateGameSettings = useGameState(state => state.updateGameSettings);
  const gameSettings = useGameState(state => state.gameSettings);
  const questions = useGameState(state => state.questions);
  const deleteQuestion = useGameState(state => state.deleteQuestion);
  const updateQuestion = useGameState(state => state.updateQuestion);

  // PIN Lock States
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(currentUser?.role === 'admin');
  const [pinError, setPinError] = useState(false);



  // Create Reward States
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardCash, setRewardCash] = useState(20000);
  const [studentEnergyPercent, setStudentEnergyPercent] = useState(100);
  const [bossBounty2024, setBossBounty2024] = useState(10000);
  const [bossBounty2025, setBossBounty2025] = useState(15000);
  const [bossBounty2026, setBossBounty2026] = useState(20000);
  const [challengeCost1, setChallengeCost1] = useState(10);
  const [challengeCost2, setChallengeCost2] = useState(10);
  const [challengeCost3, setChallengeCost3] = useState(15);
  const [challengeCost4, setChallengeCost4] = useState(10);
  const [questionQuery, setQuestionQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'english' | 'math' | 'literature'>('all');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editType, setEditType] = useState<Question['type']>('mcq');
  const [editPrompt, setEditPrompt] = useState('');
  const [editExplanation, setEditExplanation] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDifficulty, setEditDifficulty] = useState(5);
  const [editOptions, setEditOptions] = useState('');
  const [editCorrectAnswer, setEditCorrectAnswer] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editSubject, setEditSubject] = useState<'english' | 'math' | 'literature'>('english');
  const [editExamPart, setEditExamPart] = useState('');
  const [editMathTopic, setEditMathTopic] = useState('');
  const [editEnglishPart, setEditEnglishPart] = useState('');
  const [editEnglishTask, setEditEnglishTask] = useState('');
  const [editEnglishSkill, setEditEnglishSkill] = useState('');
  const [editLiteratureTrack, setEditLiteratureTrack] = useState('');
  const [editLiteratureTask, setEditLiteratureTask] = useState('');
  const [editTextGenre, setEditTextGenre] = useState('');
  const [editAnswerMode, setEditAnswerMode] = useState('');
  const [editSolutionStyle, setEditSolutionStyle] = useState('');
  const [editSolutionSteps, setEditSolutionSteps] = useState('');

  const [maxEnergyVal, setMaxEnergyVal] = useState(1000);
  const [baseXPVal, setBaseXPVal] = useState(15);
  const [baseCoinsVal, setBaseCoinsVal] = useState(5);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'rewards' | 'ingestion' | 'members' | 'settings'>('members');
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  // Load students list on mount for admin users
  React.useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchAdminStudents();
    }
  }, []);

  useEffect(() => {
    if (!selectedStudentProfile?.player) return;
    const maxE = gameSettings.maxEnergy ?? 1000;
    setStudentEnergyPercent(Math.round((selectedStudentProfile.player.energy / maxE) * 100));
  }, [selectedStudentProfile?.player?.energy, gameSettings.maxEnergy]);

  useEffect(() => {
    const [b2024, b2025, b2026] = gameSettings.bossBountiesVnd;
    setBossBounty2024(b2024);
    setBossBounty2025(b2025);
    setBossBounty2026(b2026);
    const [c1, c2, c3, c4] = gameSettings.challengeEnergyCosts;
    setChallengeCost1(c1);
    setChallengeCost2(c2);
    setChallengeCost3(c3);
    setChallengeCost4(c4);
    setMaxEnergyVal(gameSettings.maxEnergy ?? 1000);
    setBaseXPVal(gameSettings.baseXP ?? 15);
    setBaseCoinsVal(gameSettings.baseCoins ?? 5);
  }, [gameSettings.bossBountiesVnd, gameSettings.challengeEnergyCosts, gameSettings.maxEnergy, gameSettings.baseXP, gameSettings.baseCoins]);

  useEffect(() => {
    if (!editingQuestion) return;
    setEditType(editingQuestion.type);
    setEditPrompt(editingQuestion.prompt);
    setEditExplanation(editingQuestion.explanation);
    setEditCategory(editingQuestion.category);
    setEditDifficulty(editingQuestion.difficulty);
    setEditOptions(Array.isArray(editingQuestion.options) ? editingQuestion.options.join('\n') : '');
    setEditCorrectAnswer(Array.isArray(editingQuestion.correctAnswer) ? editingQuestion.correctAnswer.join('\n') : editingQuestion.correctAnswer);
    setEditSource(editingQuestion.source);
    setEditImageUrl(editingQuestion.imageUrl || '');
    setEditSubject(editingQuestion.subject || 'english');
    setEditExamPart(editingQuestion.metadata?.examPart || '');
    setEditMathTopic(editingQuestion.metadata?.mathTopic || '');
    setEditEnglishPart(editingQuestion.metadata?.englishPart || '');
    setEditEnglishTask(editingQuestion.metadata?.englishTask || '');
    setEditEnglishSkill(editingQuestion.metadata?.englishSkill || '');
    setEditLiteratureTrack(editingQuestion.metadata?.literatureTrack || '');
    setEditLiteratureTask(editingQuestion.metadata?.literatureTask || '');
    setEditTextGenre(editingQuestion.metadata?.textGenre || '');
    setEditAnswerMode(editingQuestion.metadata?.answerMode || '');
    setEditSolutionStyle(editingQuestion.metadata?.solutionStyle || '');
    setEditSolutionSteps(Array.isArray(editingQuestion.metadata?.solutionSteps) ? editingQuestion.metadata.solutionSteps.join('\n') : '');
  }, [editingQuestion]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPIN(pin)) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;

    const nextOptions = editOptions
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    const nextCorrectAnswer = editCorrectAnswer
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const metadata = editSubject === 'math' ? ({
      examPart: editExamPart.trim() || undefined,
      mathTopic: editMathTopic.trim() || undefined,
      answerMode: editAnswerMode.trim() || undefined,
      solutionStyle: editSolutionStyle.trim() || undefined,
      solutionSteps: editSolutionSteps.split('\n').map(line => line.trim()).filter(Boolean)
    } as QuestionMeta) : editSubject === 'english' ? ({
      examPart: editExamPart.trim() || undefined,
      englishPart: editEnglishPart.trim() || undefined,
      englishTask: editEnglishTask.trim() || undefined,
      englishSkill: editEnglishSkill.trim() || undefined,
      answerMode: editAnswerMode.trim() || undefined,
      solutionStyle: editSolutionStyle.trim() || undefined,
      solutionSteps: editSolutionSteps.split('\n').map(line => line.trim()).filter(Boolean)
    } as QuestionMeta) : editSubject === 'literature' ? ({
      examPart: editExamPart.trim() || undefined,
      literatureTrack: editLiteratureTrack.trim() || undefined,
      literatureTask: editLiteratureTask.trim() || undefined,
      textGenre: editTextGenre.trim() || undefined,
      answerMode: editAnswerMode.trim() || undefined,
      solutionStyle: editSolutionStyle.trim() || undefined,
      solutionSteps: editSolutionSteps.split('\n').map(line => line.trim()).filter(Boolean)
    } as QuestionMeta) : undefined;

    const payload = {
      type: editType,
      prompt: editPrompt.trim(),
      explanation: editExplanation.trim(),
      category: editCategory.trim(),
      difficulty: Math.max(1, Math.min(10, Number(editDifficulty) || 5)),
      options: nextOptions.length > 0 ? nextOptions : undefined,
      correctAnswer: nextCorrectAnswer.length > 1 ? nextCorrectAnswer : nextCorrectAnswer[0] || '',
      source: editSource.trim(),
      imageUrl: editImageUrl.trim() || undefined,
      subject: editSubject,
      metadata
    };

    const ok = await updateQuestion(editingQuestion.id, payload);
    if (ok) {
      setEditingQuestion(null);
    }
  };

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) return;
    addParentReward(rewardTitle, rewardCost, rewardCash);
    setRewardTitle('');
    toast.success('Thêm quà tặng mới thành công!');
  };



  // Active Data bindings: if viewing a student, use their loaded data. Otherwise fall back to parent.
  const activeRewards = selectedStudentProfile?.rewards || [];

  const typeCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const examPartCounts = useMemo(() => {
    return questions.reduce((acc: Record<string, number>, q) => {
      const key = q.metadata?.examPart || 'Chưa gắn part';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [questions]);

  const mathTopicCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'math')
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.mathTopic || q.category || 'mixed';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const englishTaskCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'english' || !q.subject)
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.englishTask || q.category || 'grammar';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const literatureTaskCounts = useMemo(() => {
    return questions
      .filter(q => q.subject === 'literature')
      .reduce((acc: Record<string, number>, q) => {
        const key = q.metadata?.literatureTask || q.category || 'reading';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  }, [questions]);

  const topTypeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const topExamParts = Object.entries(examPartCounts).sort((a, b) => b[1] - a[1]);
  const topMathTopics = Object.entries(mathTopicCounts).sort((a, b) => b[1] - a[1]);
  const topEnglishTasks = Object.entries(englishTaskCounts).sort((a, b) => b[1] - a[1]);
  const topLiteratureTasks = Object.entries(literatureTaskCounts).sort((a, b) => b[1] - a[1]);

  const filteredQuestions = useMemo(() => {
    const query = questionQuery.trim().toLowerCase();
    return questions.filter(q => {
      if (subjectFilter !== 'all') {
        const qSubject = q.subject || 'english';
        if (qSubject !== subjectFilter) return false;
      }
      if (!query) return true;
      const haystack = [
        q.prompt,
        q.category,
        q.source,
        q.type,
        q.subject,
        q.metadata?.examPart,
        q.metadata?.mathTopic,
        q.metadata?.englishPart,
        q.metadata?.englishTask,
        q.metadata?.englishSkill,
        q.metadata?.literatureTrack,
        q.metadata?.literatureTask,
        q.metadata?.textGenre,
        q.metadata?.answerMode,
        q.metadata?.solutionStyle
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [questions, questionQuery, subjectFilter]);

  const filteredSubjectCounts = useMemo(() => {
    return filteredQuestions.reduce((acc: Record<string, number>, q) => {
      const key = q.subject || 'english';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [filteredQuestions]);

  const bankStats = useMemo(() => {
    const total = questions.length;
    const avgDifficulty = total ? questions.reduce((sum, q) => sum + q.difficulty, 0) / total : 0;
    return {
      total,
      avgDifficulty,
      easy: questions.filter(q => q.difficulty <= 4).length,
      medium: questions.filter(q => q.difficulty >= 5 && q.difficulty <= 7).length,
      hard: questions.filter(q => q.difficulty >= 8).length,
      mcq: questions.filter(q => q.type === 'mcq').length,
      shortAnswer: questions.filter(q => q.type === 'short-answer').length,
      proof: questions.filter(q => q.type === 'proof').length,
      multiPart: questions.filter(q => q.type === 'multi-part').length,
      english: questions.filter(q => !q.subject || q.subject === 'english').length,
      math: questions.filter(q => q.subject === 'math').length,
      literature: questions.filter(q => q.subject === 'literature').length
    };
  }, [questions]);  if (!isUnlocked) {
    return (
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-8 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-synth-magenta/10 border border-synth-magenta/30 flex items-center justify-center">
          <Lock className="w-8 h-8 text-synth-magenta animate-pulse" />
        </div>
        
        <h2 className="font-orbitron font-black text-xl text-white uppercase tracking-wider">
          Phụ Huynh Lockscreen
        </h2>
        <p className="text-xs text-synth-text-muted">
          Nhập mã PIN của Ba Mẹ để duyệt phần thưởng, xem thống kê chi tiết hoặc nhập thêm đề thi cho con.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Mã PIN 4 số (Mặc định: 1234)"
            maxLength={4}
            className="w-full p-3.5 rounded-xl border border-white/10 focus:border-synth-magenta bg-synth-gray/20 text-center text-white text-lg font-black outline-none tracking-widest"
          />
          
          {pinError && (
            <p className="text-xs text-red-500 font-semibold">Mã PIN không đúng! Vui lòng thử lại.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300"
          >
            Mở Khóa Bảng Điều Khiển
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* HUD Header */}
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-synth-magenta/5 to-transparent">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-synth-magenta" />
          <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider flex items-center gap-1.5">
            Bảng Quản Trị Của Ba Mẹ
            <button
              onClick={() => showHelp('parent-console')}
              className="w-5 h-5 rounded-full bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta text-[10px] font-black flex items-center justify-center hover:bg-synth-magenta/40 cursor-pointer transition-colors"
              title="Xem hướng dẫn sử dụng trang quản trị"
            >
              ?
            </button>
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="hidden md:flex gap-2 flex-wrap">
          {['members', 'rewards', 'ingestion'].map(tab => {
            const tabNames: Record<string, string> = {
              members: 'Thành viên',
              rewards: 'Phần thưởng & Cấu hình',
              ingestion: 'Ngân hàng câu hỏi'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  if (tab === 'members') {
                    fetchAdminStudents();
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-synth-magenta border-synth-magenta text-black shadow-[0_0_8px_#ff007f]' 
                    : 'bg-transparent border-synth-magenta/30 text-synth-magenta hover:bg-synth-magenta/10'
                }`}
              >
                {tabNames[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspected Student Banner */}
      {viewingStudentId && selectedStudentProfile && (
        <div className="glass-panel rounded-xl border border-synth-cyan/30 p-4 flex justify-between items-center bg-gradient-to-r from-synth-cyan/5 to-transparent">
          <div className="flex items-center gap-3">
            <img 
              src={selectedStudentProfile.studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
              alt={selectedStudentProfile.studentUser?.name}
              className="w-9 h-9 rounded-full border border-synth-cyan/40"
            />
            <div>
              <span className="text-[10px] text-synth-cyan uppercase font-bold tracking-wider font-orbitron">Đang quản trị tài khoản</span>
              <h4 className="font-bold text-white text-sm leading-tight mt-0.5">
                {selectedStudentProfile.studentUser?.name} ({selectedStudentProfile.studentUser?.email})
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setViewingStudentId(null);
              setActiveTab('members');
            }}
            className="px-3 py-1.5 rounded bg-synth-gray/30 border border-white/10 text-xs text-white hover:bg-white/10 font-bold cursor-pointer transition-colors"
          >
            Đổi học sinh khác
          </button>
        </div>
      )}

      {/* Rewards tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Game configuration panel - always visible */}
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-synth-cyan" />
              <h3 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">
                Cấu hình Game & Mức thưởng
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Boss 2024 Bounty (VNĐ)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={bossBounty2024}
                  onChange={(e) => setBossBounty2024(Number(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Boss 2025 Bounty (VNĐ)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={bossBounty2025}
                  onChange={(e) => setBossBounty2025(Number(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Boss 2026 Bounty (VNĐ)</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={bossBounty2026}
                  onChange={(e) => setBossBounty2026(Number(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Đảo 1', value: challengeCost1, setter: setChallengeCost1 },
                { label: 'Đảo 2', value: challengeCost2, setter: setChallengeCost2 },
                { label: 'Đảo 3', value: challengeCost3, setter: setChallengeCost3 },
                { label: 'Đảo 4', value: challengeCost4, setter: setChallengeCost4 }
              ].map(item => (
                <label key={item.label} className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">{item.label} cost (Energy)</span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value) || 0)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  />
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Năng lượng tối đa (Max Energy)</span>
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={maxEnergyVal}
                  onChange={(e) => setMaxEnergyVal(Number(e.target.value) || 1000)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Điểm XP cơ bản / Câu đúng</span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={baseXPVal}
                  onChange={(e) => setBaseXPVal(Number(e.target.value) || 15)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Điểm Coins cơ bản (NP) / Câu đúng</span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={baseCoinsVal}
                  onChange={(e) => setBaseCoinsVal(Number(e.target.value) || 5)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white/5 rounded-xl border border-white/5 p-4">
              <p className="text-[10px] text-synth-text-muted leading-relaxed">
                Các cấu hình này sẽ tự động áp dụng trực tiếp cho tất cả học sinh trên ứng dụng (Boss Arena, đảo thử thách, lượng năng lượng tối đa nhận mỗi ngày, và điểm thưởng học tập).
              </p>
              <button
                onClick={async () => {
                  await updateGameSettings({
                    bossBountiesVnd: [bossBounty2024, bossBounty2025, bossBounty2026],
                    challengeEnergyCosts: [challengeCost1, challengeCost2, challengeCost3, challengeCost4],
                    maxEnergy: maxEnergyVal,
                    baseXP: baseXPVal,
                    baseCoins: baseCoinsVal
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-synth-magenta text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-magenta transition-all shrink-0 cursor-pointer"
              >
                Lưu cấu hình game
              </button>
            </div>
          </div>

          {/* Child rewards management section */}
          {!viewingStudentId ? (
            <div className="glass-panel rounded-2xl border border-white/5 p-8 text-center space-y-3">
              <p className="text-xs text-synth-text-muted">
                Chọn tài khoản con tại tab <strong className="text-synth-magenta">Thành viên</strong> để duyệt yêu cầu đổi quà hoặc thiết kế các phần quà tặng dành riêng cho con.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Create Reward Form */}
              <div className="glass-panel rounded-2xl border border-synth-orange/20 p-5 h-fit">
                <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Thêm Quà tặng mới
                </h4>

                <form onSubmit={handleCreateReward} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-synth-text-muted uppercase">Tên Quà Tặng</label>
                    <input
                      type="text"
                      value={rewardTitle}
                      onChange={(e) => setRewardTitle(e.target.value)}
                      placeholder="Ví dụ: Ly trà sữa, 1h chơi iPad"
                      className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-synth-text-muted uppercase">Giá Coins (NP)</label>
                      <input
                        type="number"
                        value={rewardCost}
                        onChange={(e) => setRewardCost(Number(e.target.value))}
                        className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-synth-text-muted uppercase">Giá trị VNĐ (Mặt)</label>
                      <input
                        type="number"
                        value={rewardCash}
                        onChange={(e) => setRewardCash(Number(e.target.value))}
                        className="p-3 rounded-lg border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-orange"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-orange text-black hover:synth-glow-orange cursor-pointer transition-all duration-300"
                  >
                    Tạo Phần Thưởng
                  </button>
                </form>
              </div>

              {/* Approvals ledger */}
              <div className="glass-panel rounded-2xl border border-white/5 p-5 md:col-span-2 space-y-4">
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Danh sách duyệt quy đổi phần thưởng của con
                </h4>

                <div className="space-y-2 overflow-y-auto max-h-[300px]">
                  {activeRewards.length > 0 ? (
                    activeRewards.map((reward: any) => (
                      <div
                        key={reward.id}
                        className="bg-synth-gray/20 rounded-xl p-4 border border-white/5 flex justify-between items-center"
                      >
                        <div>
                          <h5 className="text-sm font-bold text-white">{reward.title}</h5>
                          <div className="flex items-center gap-3 text-xs mt-1">
                            <span className="text-synth-orange font-bold font-orbitron">{reward.costCoins} NP</span>
                            {reward.cashValueVND > 0 && (
                              <span className="text-synth-green font-bold font-orbitron">{reward.cashValueVND.toLocaleString()}đ mặt</span>
                            )}
                            <span className="text-synth-text-muted">{new Date(reward.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {reward.status === 'approved' ? (
                            <>
                              <button
                                onClick={() => {
                                  if (viewingStudentId) {
                                    adminApproveReward(viewingStudentId, reward.id);
                                  } else {
                                    approveReward(reward.id);
                                  }
                                }}
                                className="p-2 rounded-lg bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all"
                                title="Xác nhận đã chi quà thật cho con"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (viewingStudentId) {
                                    adminRejectReward(viewingStudentId, reward.id);
                                  } else {
                                    rejectReward(reward.id);
                                  }
                                }}
                                className="p-2 rounded-lg border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10 transition-all"
                                title="Hủy bỏ yêu cầu, hoàn lại coins cho con"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-synth-text-muted italic px-3 py-1 bg-synth-gray/50 rounded-lg">
                              {reward.status === 'claimed' ? 'Đã trao quà' : 'Chưa quy đổi'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-synth-text-muted">
                      Chưa có phần thưởng nào đang chờ duyệt.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ingestion tab */}
      {activeTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-5">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
              <div className="space-y-2">
                <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4 h-4" /> Ngân hàng câu hỏi hiện có
                </h4>
                <p className="text-[10px] text-synth-text-muted max-w-2xl leading-relaxed">
                  Dùng bộ lọc theo môn ở cột trái, xem thống kê ở cột phải, rồi sửa/xóa câu AI nhập ngay trong danh sách lớn bên dưới.
                </p>
              </div>

              <div className="w-full xl:max-w-xl space-y-2">
                <label className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider">Tìm kiếm</label>
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

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)] gap-6 items-start">
              <div className="space-y-5 min-w-0">
                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-text-muted tracking-wider">Bộ lọc theo môn</span>
                      <p className="text-[10px] text-synth-text-muted mt-1">Chọn đúng môn trước rồi mới soi chi tiết part, topic và task.</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white border border-white/5 font-bold uppercase">
                      {filteredQuestions.length}/{questions.length} câu đang khớp
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'english', 'math', 'literature'] as const).map(sub => {
                      const label = sub === 'all' ? 'Tất cả' : sub === 'english' ? 'Tiếng Anh' : sub === 'math' ? 'Toán học' : 'Ngữ văn';
                      const count = sub === 'all' ? questions.length : sub === 'english' ? bankStats.english : sub === 'math' ? bankStats.math : bankStats.literature;
                      const activeStyle = sub === 'all'
                        ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan'
                        : sub === 'english'
                          ? 'bg-synth-cyan/20 border-synth-cyan text-synth-cyan'
                          : sub === 'math'
                            ? 'bg-synth-magenta/20 border-synth-magenta text-synth-magenta'
                            : 'bg-synth-orange/20 border-synth-orange text-synth-orange';

                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setSubjectFilter(sub)}
                          className={`min-w-[140px] flex-1 px-3.5 py-3 rounded-xl border text-left text-[10px] font-bold font-orbitron uppercase cursor-pointer transition-all duration-200 ${
                            subjectFilter === sub
                              ? activeStyle
                              : 'bg-synth-gray/10 border-white/5 text-synth-text-muted hover:text-white hover:border-white/10'
                          }`}
                        >
                          <span className="block text-[11px] tracking-wider">{label}</span>
                          <span className="mt-1 block text-sm normal-case font-black">{count} câu</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-1.5">
                    <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Tổng câu hỏi</span>
                    <span className="text-2xl font-black text-synth-cyan font-orbitron">{bankStats.total}</span>
                    <span className="text-[10px] text-synth-text-muted">Trong toàn bộ kho đề</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-1.5">
                    <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Độ khó TB</span>
                    <span className="text-2xl font-black text-synth-orange font-orbitron">{bankStats.avgDifficulty.toFixed(1)}/10</span>
                    <span className="text-[10px] text-synth-text-muted">Dễ {bankStats.easy} · TB {bankStats.medium} · Khó {bankStats.hard}</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-1.5">
                    <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Dạng phổ biến</span>
                    <span className="text-2xl font-black text-synth-magenta font-orbitron">{bankStats.mcq}</span>
                    <span className="text-[10px] text-synth-text-muted">Trắc nghiệm nhiều nhất</span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-1.5">
                    <span className="text-[10px] text-synth-text-muted font-bold uppercase tracking-wider block">Câu lọc được</span>
                    <span className="text-2xl font-black text-synth-green font-orbitron">{filteredQuestions.length}</span>
                    <span className="text-[10px] text-synth-text-muted">Theo môn + từ khóa</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Loại câu hỏi</span>
                      <button onClick={() => showHelp('bank-structure')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Help</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topTypeEntries.map(([type, count]) => (
                        <span key={type} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                          {type}: <span className="text-synth-cyan">{count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-green">Part / chuyên đề</span>
                      <button onClick={() => showHelp('rubric')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Rubric</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topExamParts.map(([part, count]) => (
                        <span key={part} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                          {part}: <span className="text-synth-green">{count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">Gợi ý sử dụng</span>
                      <button onClick={() => showHelp('parent-console')} className="text-[10px] px-2 py-1 rounded bg-white/5 text-white hover:bg-white/10">Console</button>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <button onClick={() => showHelp('math-bank')} className="px-2.5 py-1 rounded-full bg-synth-magenta/15 text-synth-magenta font-bold uppercase">Toán</button>
                      <button onClick={() => showHelp('english-bank')} className="px-2.5 py-1 rounded-full bg-synth-cyan/15 text-synth-cyan font-bold uppercase">Anh</button>
                      <button onClick={() => showHelp('literature-bank')} className="px-2.5 py-1 rounded-full bg-synth-orange/15 text-synth-orange font-bold uppercase">Văn</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-magenta">Toán theo topic</span>
                      <span className="text-[10px] text-synth-text-muted">{questions.filter(q => q.subject === 'math').length} câu</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topMathTopics.map(([topic, count]) => (
                        <span key={topic} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                          {MATH_TOPIC_LABELS[topic] || topic}: <span className="text-synth-magenta">{count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Anh theo task</span>
                      <span className="text-[10px] text-synth-text-muted">{questions.filter(q => !q.subject || q.subject === 'english').length} câu</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topEnglishTasks.map(([task, count]) => (
                        <span key={task} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                          {ENGLISH_TASK_LABELS[task] || task}: <span className="text-synth-cyan">{count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">Văn theo task</span>
                      <span className="text-[10px] text-synth-text-muted">{questions.filter(q => q.subject === 'literature').length} câu</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topLiteratureTasks.map(([task, count]) => (
                        <span key={task} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase text-white border border-white/5">
                          {LITERATURE_TASK_LABELS[task] || task}: <span className="text-synth-orange">{count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h5 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Danh sách câu hỏi</h5>
                      <p className="text-[10px] text-synth-text-muted mt-1">Card to, dễ đọc hơn, tập trung vào prompt, metadata, hình ảnh và nút CRUD.</p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-synth-text-muted border border-white/5 font-bold uppercase">
                      {filteredQuestions.length} kết quả
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map(q => {
                        const isCustom = q.source?.startsWith('AI Ingested') || q.id.startsWith('hcmc-') || q.id.startsWith('mock-');
                        return (
                          <div key={q.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-3">
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                              <div className="space-y-2 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-synth-cyan/20 text-synth-cyan font-bold uppercase font-orbitron">
                                    {q.type}
                                  </span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase font-orbitron ${
                                    (q.subject || 'english') === 'english' ? 'bg-synth-cyan/20 text-synth-cyan' :
                                    q.subject === 'math' ? 'bg-synth-magenta/20 text-synth-magenta' :
                                    'bg-synth-orange/20 text-synth-orange'
                                  }`}>
                                    {(q.subject || 'english') === 'english' ? '🇬🇧 Anh' :
                                     q.subject === 'math' ? '📐 Toán' :
                                     '✍️ Văn'}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta font-bold uppercase font-orbitron">
                                    {q.category}
                                  </span>
                                  {q.metadata?.examPart && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-green/15 text-synth-green font-bold uppercase font-orbitron">
                                      {q.metadata.examPart}
                                    </span>
                                  )}
                                  {q.subject === 'english' && q.metadata?.englishPart && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-cyan/15 text-synth-cyan font-bold uppercase font-orbitron">
                                      {q.metadata.englishPart}
                                    </span>
                                  )}
                                  {q.subject === 'english' && q.metadata?.englishTask && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white font-bold uppercase font-orbitron">
                                      {ENGLISH_TASK_LABELS[q.metadata.englishTask] || q.metadata.englishTask}
                                    </span>
                                  )}
                                  {q.subject === 'english' && q.metadata?.englishSkill && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-magenta/15 text-synth-magenta font-bold uppercase font-orbitron">
                                      {ENGLISH_SKILL_LABELS[q.metadata.englishSkill] || q.metadata.englishSkill}
                                    </span>
                                  )}
                                  {q.metadata?.answerMode && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white font-bold uppercase font-orbitron">
                                      {(q.subject === 'literature' ? LITERATURE_ANSWER_MODE_LABELS : q.subject === 'english' ? ENGLISH_ANSWER_MODE_LABELS : MATH_ANSWER_MODE_LABELS)[q.metadata.answerMode] || q.metadata.answerMode}
                                    </span>
                                  )}
                                  {q.metadata?.solutionStyle && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-green/15 text-synth-green font-bold uppercase font-orbitron">
                                      {q.metadata.solutionStyle}
                                    </span>
                                  )}
                                  {q.metadata?.literatureTask && q.subject === 'literature' && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-orange/15 text-synth-orange font-bold uppercase font-orbitron">
                                      {LITERATURE_TASK_LABELS[q.metadata.literatureTask] || q.metadata.literatureTask}
                                    </span>
                                  )}
                                  {q.metadata?.textGenre && q.subject === 'literature' && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white font-bold uppercase font-orbitron">
                                      {LITERATURE_TEXT_GENRE_LABELS[q.metadata.textGenre] || q.metadata.textGenre}
                                    </span>
                                  )}
                                  {isCustom && (
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-synth-orange/20 text-synth-orange font-bold uppercase font-orbitron">
                                      AI / Custom
                                    </span>
                                  )}
                                </div>
                                {q.imageUrl && (
                                  <div className="w-full max-w-[280px] bg-synth-gray/30 p-2 rounded-xl border border-white/5">
                                    <img
                                      src={q.imageUrl}
                                      className="rounded-lg max-h-[180px] object-contain mx-auto"
                                      alt="Question"
                                    />
                                  </div>
                                )}
                                <p className="text-sm text-white font-medium leading-relaxed">{q.prompt}</p>
                                <p className="text-[10px] text-synth-text-muted break-words">
                                  Nguồn: {q.source || 'Default'} | Độ khó: {q.difficulty}/10 | ID: {q.id}
                                </p>
                              </div>

                              {isCustom && (
                                <div className="flex items-center gap-2 shrink-0 xl:flex-col xl:items-stretch">
                                  <button
                                    onClick={() => setEditingQuestion(q)}
                                    className="px-3 py-2 rounded-xl bg-synth-cyan/20 text-synth-cyan border border-synth-cyan/30 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                                  >
                                    <Pencil className="w-3.5 h-3.5" /> Sửa
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (window.confirm(`Xóa câu hỏi này?\n\n${q.prompt}`)) {
                                        await deleteQuestion(q.id);
                                      }
                                    }}
                                    className="px-3 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Xóa
                                  </button>
                                </div>
                              )}
                            </div>
                            {q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                {q.options.map((opt, idx) => (
                                  <div
                                    key={idx}
                                    className={`rounded-xl px-3 py-2.5 border ${Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(opt) : q.correctAnswer === opt ? 'border-synth-green text-synth-green bg-synth-green/10' : 'border-white/5 text-synth-text-muted bg-white/5'}`}
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
                      <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center space-y-2">
                        <p className="text-sm text-white font-semibold">Không có câu hỏi nào khớp bộ lọc hiện tại.</p>
                        <p className="text-[10px] text-synth-text-muted">Thử đổi môn học hoặc xóa bớt từ khóa tìm kiếm.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 xl:sticky xl:top-4 self-start">
                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Phân bố theo môn</span>
                    <span className="text-[10px] text-synth-text-muted">Kết quả đang lọc</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-synth-cyan font-semibold">Tiếng Anh</span>
                      <span className="text-white font-bold">{filteredSubjectCounts.english || 0}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-synth-magenta font-semibold">Toán học</span>
                      <span className="text-white font-bold">{filteredSubjectCounts.math || 0}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <span className="text-synth-orange font-semibold">Ngữ văn</span>
                      <span className="text-white font-bold">{filteredSubjectCounts.literature || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-magenta">Toán</span>
                    <span className="text-[10px] text-synth-text-muted">7 bài chuẩn</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {MATH_EXAM_BLUEPRINT.map(part => (
                      <div key={part.part} className="rounded-xl border border-white/5 bg-white/5 p-3 text-[11px] text-white space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-orbitron font-bold text-synth-magenta">{part.part}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-synth-text-muted">{part.answerModes.join(' / ')}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{part.title}</h4>
                        <p className="text-synth-text-muted leading-relaxed">{part.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">Tiếng Anh</span>
                    <span className="text-[10px] text-synth-text-muted">Blueprint chuẩn hóa</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {ENGLISH_EXAM_BLUEPRINT.map(part => (
                      <div key={part.part} className="rounded-xl border border-white/5 bg-white/5 p-3 text-[11px] text-white space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-orbitron font-bold text-synth-cyan">{part.part}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-synth-text-muted">{part.answerModes.join(' / ')}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{part.title}</h4>
                        <p className="text-synth-text-muted leading-relaxed">{part.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-synth-gray/10 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">Ngữ văn</span>
                    <span className="text-[10px] text-synth-text-muted">Blueprint theo năng lực</span>
                  </div>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {LITERATURE_EXAM_BLUEPRINT.map(part => (
                      <div key={`${part.part}-${part.title}`} className="rounded-xl border border-white/5 bg-white/5 p-3 text-[11px] text-white space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] uppercase font-orbitron font-bold text-synth-orange">{part.part}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-synth-text-muted">{part.answerModes.join(' / ')}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{part.title}</h4>
                        <p className="text-synth-text-muted leading-relaxed">{part.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingQuestion && (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl border border-synth-cyan/30 w-full max-w-6xl max-h-[92vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="font-orbitron font-bold text-sm text-synth-cyan uppercase tracking-wider">
                  Sửa câu hỏi
                </h4>
                <p className="text-[10px] text-synth-text-muted mt-1">
                  Câu hỏi AI/import sẽ được cập nhật và lưu lại vào kho đề.
                </p>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-bold hover:bg-white/5"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Môn học</span>
                <select
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                >
                  <option value="english">🇬🇧 Tiếng Anh</option>
                  <option value="math">📐 Toán học</option>
                  <option value="literature">✍️ Ngữ văn</option>
                </select>
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Dạng câu hỏi</span>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as Question['type'])}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                >
                  <option value="mcq">Trắc nghiệm</option>
                  <option value="short-answer">Tự luận ngắn</option>
                  <option value="proof">Chứng minh</option>
                  <option value="multi-part">Nhiều ý</option>
                  <option value="wordform">Word form</option>
                  <option value="rewrite">Rewrite</option>
                  <option value="cloze">Cloze</option>
                  <option value="reading">Reading</option>
                </select>
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Chuyên đề</span>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Nguồn</span>
                <input
                  type="text"
                  value={editSource}
                  onChange={(e) => setEditSource(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
            </div>

            {editSubject === 'english' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">English part</span>
                  <select
                    value={editEnglishPart}
                    onChange={(e) => setEditEnglishPart(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa phân loại</option>
                    {ENGLISH_EXAM_BLUEPRINT.map(part => (
                      <option key={part.part} value={part.part}>{part.part} - {part.title}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">English task</span>
                  <select
                    value={editEnglishTask}
                    onChange={(e) => setEditEnglishTask(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa chọn</option>
                    {Object.entries(ENGLISH_TASK_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Skill group</span>
                  <select
                    value={editEnglishSkill}
                    onChange={(e) => setEditEnglishSkill(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa chọn</option>
                    {Object.entries(ENGLISH_SKILL_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {editSubject === 'math' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Bài / Phần</span>
                  <input
                    type="text"
                    value={editExamPart}
                    onChange={(e) => setEditExamPart(e.target.value)}
                    placeholder="Bài 1, Bài 2, ..."
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  />
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Math topic</span>
                  <select
                    value={editMathTopic}
                    onChange={(e) => setEditMathTopic(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa phân loại</option>
                    {Object.entries(MATH_TOPIC_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Answer mode</span>
                  <select
                    value={editAnswerMode}
                    onChange={(e) => setEditAnswerMode(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa chọn</option>
                    {Object.entries(MATH_ANSWER_MODE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Solution style</span>
                  <select
                    value={editSolutionStyle}
                    onChange={(e) => setEditSolutionStyle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa chọn</option>
                    <option value="direct">Direct</option>
                    <option value="worked">Worked</option>
                    <option value="proof-outline">Proof outline</option>
                    <option value="diagram">Diagram</option>
                    <option value="table">Table</option>
                    <option value="rubric">Rubric</option>
                  </select>
                </label>
              </div>
            )}

            {(editSubject === 'math' || editSubject === 'english' || editSubject === 'literature') && (
              <label className="space-y-2 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Solution steps / 1 dòng = 1 ý</span>
                <textarea
                  value={editSolutionSteps}
                  onChange={(e) => setEditSolutionSteps(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan font-mono text-xs"
                />
              </label>
            )}

            {editSubject === 'literature' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Literature track</span>
                  <select
                    value={editLiteratureTrack}
                    onChange={(e) => setEditLiteratureTrack(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa phân loại</option>
                    <option value="reading">Đọc hiểu</option>
                    <option value="vietnamese">Tiếng Việt</option>
                    <option value="social-essay">Nghị luận xã hội</option>
                    <option value="literary-essay">Nghị luận văn học</option>
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Literature task</span>
                  <select
                    value={editLiteratureTask}
                    onChange={(e) => setEditLiteratureTask(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa chọn</option>
                    {Object.entries(LITERATURE_TASK_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-xs">
                  <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Text genre</span>
                  <select
                    value={editTextGenre}
                    onChange={(e) => setEditTextGenre(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                  >
                    <option value="">Chưa phân loại</option>
                    {Object.entries(LITERATURE_TEXT_GENRE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <label className="space-y-2 text-xs block xl:col-span-2">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Đề bài</span>
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan font-mono text-xs"
                />
              </label>

              <label className="space-y-2 text-xs block xl:col-span-2">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Giải thích</span>
                <textarea
                  value={editExplanation}
                  onChange={(e) => setEditExplanation(e.target.value)}
                  rows={5}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan font-mono text-xs"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Đáp án / Mỗi dòng 1 đáp án</span>
                <textarea
                  value={editCorrectAnswer}
                  onChange={(e) => setEditCorrectAnswer(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan font-mono text-xs"
                />
              </label>
              <label className="space-y-2 text-xs">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Options / Mỗi dòng 1 lựa chọn</span>
                <textarea
                  value={editOptions}
                  onChange={(e) => setEditOptions(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan font-mono text-xs"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Độ khó (1-10)</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={editDifficulty}
                  onChange={(e) => setEditDifficulty(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
              <label className="space-y-2 text-xs block">
                <span className="block text-synth-text-muted font-bold uppercase tracking-wider">Đường dẫn hình ảnh (URL)</span>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="w-full p-3 rounded-xl border border-white/10 bg-synth-gray/20 text-white outline-none focus:border-synth-cyan"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white/5"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveQuestion}
                className="px-4 py-2.5 rounded-xl bg-synth-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider hover:synth-glow-cyan"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-6">
          {!viewingStudentId ? (
            <div className="space-y-4">
              <h3 className="font-orbitron font-bold text-sm text-synth-magenta uppercase tracking-wider">
                Đội ngũ quản trị & Danh sách tài khoản con
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-synth-cyan uppercase font-orbitron text-[10px] tracking-wider">
                      <th className="py-3 px-4">Thành viên</th>
                      <th className="py-3 px-4 hidden md:table-cell">Email</th>
                      <th className="py-3 px-4">Vai trò</th>
                      <th className="py-3 px-4 text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {adminStudents.map((usr: any) => (
                      <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img 
                            src={usr.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                            alt={usr.name}
                            className="w-8 h-8 rounded-full border border-white/10"
                          />
                          <span className="font-bold text-white">{usr.name}</span>
                        </td>
                        <td className="py-3 px-4 text-synth-text-muted hidden md:table-cell">{usr.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-orbitron ${
                            usr.role === 'admin' 
                              ? 'bg-synth-magenta/20 text-synth-magenta border border-synth-magenta/30' 
                              : 'bg-synth-cyan/20 text-synth-cyan border border-synth-cyan/30'
                          }`}>
                            {usr.role === 'admin' ? 'Quản trị' : 'Tài khoản con'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setViewingStudentId(usr.id);
                                fetchStudentProfile(usr.id);
                              }}
                              className="px-2.5 py-1 rounded bg-synth-blue/30 border border-synth-cyan/30 text-synth-cyan hover:bg-synth-cyan/20 font-semibold cursor-pointer transition-colors"
                            >
                              Xem Hoạt Động
                            </button>

                            {usr.id !== currentUser?.id && (
                              <button
                                onClick={async () => {
                                  const targetRole = usr.role === 'admin' ? 'student' : 'admin';
                                  const actionText = targetRole === 'admin' ? 'nâng cấp tài khoản này làm Quản trị viên' : 'chuyển tài khoản này thành Tài khoản con';
                                  if (window.confirm(`Ba có chắc muốn ${actionText}?`)) {
                                    await promoteUser(usr.id, targetRole);
                                  }
                                }}
                                className={`px-2.5 py-1 rounded font-semibold cursor-pointer transition-colors ${
                                  usr.role === 'admin'
                                    ? 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30'
                                    : 'bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta hover:bg-synth-magenta/30'
                                }`}
                              >
                                {usr.role === 'admin' ? 'Hạ cấp Student' : 'Cấp quyền Admin'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Inspection Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <button
                  onClick={() => setViewingStudentId(null)}
                  className="px-3 py-1.5 rounded bg-synth-gray/30 border border-white/10 text-white hover:bg-white/10 font-bold cursor-pointer transition-colors"
                >
                  ← Quay lại danh sách
                </button>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStudentProfile?.studentUser?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={selectedStudentProfile?.studentUser?.name}
                    className="w-10 h-10 rounded-full border border-synth-cyan/40"
                  />
                  <div className="text-right">
                    <h3 className="font-bold text-white leading-tight">
                      {selectedStudentProfile?.studentUser?.name}
                    </h3>
                    <span className="text-[10px] text-synth-text-muted">
                      {selectedStudentProfile?.studentUser?.email}
                    </span>
                  </div>
                </div>
              </div>

              {!selectedStudentProfile ? (
                <div className="text-center py-12 text-synth-text-muted font-orbitron animate-pulse">
                  Đang tải hồ sơ hoạt động của con...
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Student Stats Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-synth-cyan font-bold font-orbitron">Cấp độ & EXP</span>
                      <span className="text-2xl font-black text-white font-orbitron mt-1">
                        LV.{selectedStudentProfile.player?.level || 1}
                      </span>
                      <span className="text-[10px] text-synth-text-muted mt-1">
                        Tích lũy: {selectedStudentProfile.player?.xp || 0} EXP
                      </span>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-synth-orange font-bold font-orbitron">Tiền xu vàng NP</span>
                      <span className="text-2xl font-black text-synth-orange font-orbitron mt-1">
                        {selectedStudentProfile.player?.coins || 0} xu
                      </span>
                      <span className="text-[10px] text-synth-text-muted mt-1">Dùng để đổi quà tiêu vặt</span>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase text-synth-magenta font-bold font-orbitron">Ví tích lũy</span>
                        <button
                          onClick={async () => {
                            const currentVal = selectedStudentProfile.player?.walletVND || 0;
                            if (currentVal <= 0) {
                              toast.error('Ví tích lũy của bé đang bằng 0đ, không thể rút tiền!');
                              return;
                            }
                            const rawAmount = window.prompt(`Nhập số tiền mặt ba đã đưa cho bé ở ngoài để khấu trừ vào Ví (Số dư hiện tại: ${currentVal.toLocaleString()}đ):`);
                            if (rawAmount === null) return; // Cancelled
                            const amount = parseInt(rawAmount.replace(/\D/g, ''), 10);
                            if (isNaN(amount) || amount <= 0) {
                              toast.error('Số tiền nhập vào không hợp lệ!');
                              return;
                            }
                            if (amount > currentVal) {
                              toast.error(`Số tiền khấu trừ không được vượt quá số dư hiện có (${currentVal.toLocaleString()}đ)!`);
                              return;
                            }
                            if (window.confirm(`Xác nhận khấu trừ ${amount.toLocaleString()}đ khỏi ví thưởng của bé?`)) {
                              await adminDeductWallet(selectedStudentProfile.studentUser.id, amount);
                            }
                          }}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-synth-magenta/20 border border-synth-magenta/40 text-synth-magenta font-bold hover:bg-synth-magenta/35 cursor-pointer transition-colors"
                          title="Trừ tiền trong ví khi đã đưa tiền mặt cho con ở ngoài"
                        >
                          Rút Tiền 💸
                        </button>
                      </div>
                      <span className="text-2xl font-black text-synth-magenta font-orbitron mt-1">
                        {(selectedStudentProfile.player?.walletVND || 0).toLocaleString()}đ
                      </span>
                      <span className="text-[10px] text-synth-text-muted mt-1">Tiền thưởng đã duyệt trao</span>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                      <span className="text-[10px] uppercase text-orange-400 font-bold font-orbitron">Streak liên tiếp</span>
                      <span className="text-2xl font-black text-orange-500 font-orbitron mt-1">
                        {selectedStudentProfile.player?.streak || 0} Ngày
                      </span>
                      <span className="text-[10px] text-synth-text-muted mt-1">Năng lượng còn lại: {selectedStudentProfile.player?.energy || 0}/1000</span>
                    </div>

                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col justify-between gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase text-synth-cyan font-bold font-orbitron">Energy (% max)</span>
                        <span className="text-xs font-black text-white font-orbitron">{studentEnergyPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={studentEnergyPercent}
                        onChange={(e) => setStudentEnergyPercent(Number(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                      <div className="flex items-center justify-between text-[10px] text-synth-text-muted font-bold">
                        <span>0%</span>
                        <span>{Math.round((studentEnergyPercent / 100) * 1000)}/1000</span>
                        <span>100%</span>
                      </div>
                      <button
                        onClick={async () => {
                          if (!selectedStudentProfile?.studentUser?.id) return;
                          await adminSetEnergy(selectedStudentProfile.studentUser.id, studentEnergyPercent);
                        }}
                        className="w-full py-2 rounded-lg bg-synth-cyan text-black font-orbitron font-bold text-[10px] uppercase tracking-wider hover:synth-glow-cyan transition-all"
                      >
                        Cập nhật Energy
                      </button>
                    </div>
                  </div>

                  {/* Pet Dragon Sanctuary */}
                  {selectedStudentProfile.pet && (
                    <div className="glass-panel rounded-xl border border-white/5 p-4 space-y-3 bg-gradient-to-r from-synth-cyan/5 to-transparent">
                      <div className="flex justify-between items-center">
                        <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">
                          Companion Dragon
                        </h4>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-synth-cyan/20 border border-synth-cyan/30 text-synth-cyan font-orbitron">
                          Giai đoạn: {selectedStudentProfile.pet.stage.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-synth-text-muted block text-[10px]">Tên rồng:</span>
                          <span className="font-bold text-white">{selectedStudentProfile.pet.name}</span>
                        </div>
                        <div>
                          <span className="text-synth-text-muted block text-[10px]">Cấp độ rồng:</span>
                          <span className="font-bold text-white">LV.{selectedStudentProfile.pet.level}</span>
                        </div>
                        <div>
                          <span className="text-synth-text-muted block text-[10px]">Cảm xúc:</span>
                          <span className="font-bold text-white capitalize">{selectedStudentProfile.pet.mood}</span>
                        </div>
                        <div>
                          <span className="text-synth-text-muted block text-[10px]">Cho ăn lần cuối:</span>
                          <span className="font-bold text-white">
                            {selectedStudentProfile.pet.lastFed ? new Date(selectedStudentProfile.pet.lastFed).toLocaleDateString('vi-VN') : 'Chưa rõ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charts & Diagnostics for Inspected Child */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="glass-panel rounded-xl border border-white/5 p-4 lg:col-span-2">
                      <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
                        Biểu đồ tỷ lệ đúng theo chuyên đề
                      </h4>
                      <div className="h-64 w-full text-xs">
                        {Object.values(selectedStudentProfile.categoryStats).length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.values(selectedStudentProfile.categoryStats).map((stat: any) => ({
                              name: stat.category.toUpperCase().replace('-', ' '),
                              'Tỷ Lệ Đúng (%)': Math.round(stat.rollingAccuracy * 100),
                              'Đã làm': stat.totalAnswered
                            }))}>
                              <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} />
                              <YAxis stroke="#888888" fontSize={9} tickLine={false} domain={[0, 100]} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#181b2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                              />
                              <Bar dataKey="Tỷ Lệ Đúng (%)" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex items-center justify-center text-synth-text-muted">
                            Con chưa làm câu hỏi nào để ghi nhận thống kê.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pending/Approved Rewards Ledger */}
                    <div className="glass-panel rounded-xl border border-white/5 p-4 flex flex-col">
                      <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
                        Nhật ký đổi quà tiêu vặt
                      </h4>
                      <div className="flex-1 overflow-y-auto max-h-60 space-y-2.5 text-xs pr-1">
                        {selectedStudentProfile.rewards.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-synth-text-muted text-center py-12">
                            Con chưa đổi phần quà nào.
                          </div>
                        ) : (
                          selectedStudentProfile.rewards.map((rew: any) => (
                            <div key={rew.id} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                              <div>
                                <span className="font-bold text-white block">{rew.title}</span>
                                <span className="text-[10px] text-synth-text-muted">
                                  {new Date(rew.timestamp).toLocaleString('vi-VN')}
                                </span>
                              </div>
                              <div className="text-right flex flex-col items-end gap-1">
                                <span className="font-bold block text-synth-magenta">{rew.cashValueVND.toLocaleString()}đ</span>
                                {rew.status === 'approved' ? (
                                  <div className="flex gap-1 mt-1">
                                    <button
                                      onClick={() => adminApproveReward(viewingStudentId!, rew.id)}
                                      className="p-1 rounded bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all"
                                      title="Xác nhận đã chi quà thật cho con (Cộng vào ví thưởng)"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => adminRejectReward(viewingStudentId!, rew.id)}
                                      className="p-1 rounded border border-synth-magenta text-synth-magenta cursor-pointer hover:bg-synth-magenta/10 transition-all"
                                      title="Từ chối yêu cầu, hoàn trả xu NP lại cho con"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase font-orbitron ${
                                    rew.status === 'claimed'
                                      ? 'bg-green-500/20 text-green-400'
                                      : rew.status === 'rejected'
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {rew.status === 'claimed' ? 'Đã nhận' : rew.status === 'rejected' ? 'Từ chối' : 'Chưa quy đổi'}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Activity log ledger */}
                  <div className="glass-panel rounded-xl border border-white/5 p-4">
                    <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
                      Nhật ký 50 hoạt động học tập gần nhất
                    </h4>
                    <div className="overflow-y-auto max-h-72 space-y-2 pr-1">
                      {selectedStudentProfile.logs.length === 0 ? (
                        <div className="text-center py-8 text-synth-text-muted">Chưa có nhật ký hoạt động.</div>
                      ) : (
                        selectedStudentProfile.logs.slice(0, 50).map((log: any) => (
                          <div key={log.id} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{log.title}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-synth-cyan font-semibold">
                                  {log.activityType.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-synth-text-muted mt-0.5">{log.detail}</p>
                            </div>
                            <div className="flex sm:flex-col items-end gap-2 sm:gap-0 shrink-0 text-right">
                              <span className="text-[10px] text-synth-text-muted">
                                {new Date(log.timestamp).toLocaleString('vi-VN')}
                              </span>
                              {(log.xpChanged > 0 || log.coinsChanged > 0) && (
                                <span className="text-[10px] font-bold text-synth-orange">
                                  +{log.xpChanged} XP / +{log.coinsChanged} NP
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Admin Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-3 py-2.5 pb-3 grid grid-cols-3 gap-1.5 items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)]">
        <button
          onClick={() => {
            setActiveTab('members');
            fetchAdminStudents();
          }}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'members' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">👥</span>
          <span>Thành viên</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'rewards' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">🎁</span>
          <span>Thưởng & Cấu hình</span>
        </button>

        <button
          onClick={() => setActiveTab('ingestion')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'ingestion' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">🤖</span>
          <span>Ngân hàng</span>
        </button>
      </nav>
    </div>
  );
};












