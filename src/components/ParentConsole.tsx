import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Question } from '../types/game';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock, Unlock, Check, X, Award, FileText, Database, Plus, BarChart2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const ParentConsole: React.FC = () => {
  const player = useGameState(state => state.player);
  const verifyPIN = useGameState(state => state.verifyPIN);
  const approveReward = useGameState(state => state.approveReward);
  const rejectReward = useGameState(state => state.rejectReward);
  const addParentReward = useGameState(state => state.addParentReward);
  const importQuestions = useGameState(state => state.importQuestions);

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

  // PIN Lock States
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(currentUser?.role === 'admin');
  const [pinError, setPinError] = useState(false);

  // Admin Ingestion States
  const [rawText, setRawText] = useState('');
  const [importPreview, setImportPreview] = useState<Question[]>([]);
  const [showImportPreview, setShowImportPreview] = useState(false);
  const [loadingIngest, setLoadingIngest] = useState(false);

  // Create Reward States
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardCost, setRewardCost] = useState(200);
  const [rewardCash, setRewardCash] = useState(20000);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'rewards' | 'ingestion' | 'members' | 'settings'>('members');
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  // Load students list on mount for admin users
  React.useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchAdminStudents();
    }
  }, []);

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

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardTitle.trim()) return;
    addParentReward(rewardTitle, rewardCost, rewardCash);
    setRewardTitle('');
    alert('Thêm quà tặng mới thành công!');
  };

  // Raw text parsing to JSON question using Gemini AI on backend
  const handleParseQuestions = async () => {
    if (!rawText.trim()) return;

    setLoadingIngest(true);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token;
      if (!token) throw new Error('Cần đăng nhập qua Supabase để sử dụng AI.');

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const res = await fetch(`${backendUrl}/api/ai/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rawText })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Lỗi server.');
      }

      const data = await res.json();
      setImportPreview(data.questions);
      setShowImportPreview(true);
    } catch (e: any) {
      console.error('Lỗi phân tích AI:', e);
      alert('Không thể phân tích đề thi bằng AI: ' + e.message);
    } finally {
      setLoadingIngest(false);
    }
  };

  const handleConfirmImport = () => {
    if (importPreview.length === 0) return;
    importQuestions(importPreview);
    setRawText('');
    setImportPreview([]);
    setShowImportPreview(false);
    alert('Đã nhập câu hỏi thành công!');
  };

  // Active Data bindings: if viewing a student, use their loaded data. Otherwise fall back to parent.
  const activePlayer = selectedStudentProfile?.player || player;
  const activeCategoryStats = selectedStudentProfile?.categoryStats || {};
  const activeRewards = selectedStudentProfile?.rewards || [];

  // Prediction calculations
  const calculatePrediction = () => {
    const totalQuestionsSolved = Object.values(activeCategoryStats).reduce((acc: number, current: any) => acc + current.totalAnswered, 0);
    if (totalQuestionsSolved < 20) {
      return { score: 'Đang tích lũy...', range: 'Cần làm ít nhất 20 câu để AI dự đoán' };
    }

    // Calculate rolling average accuracy
    const activeStats = Object.values(activeCategoryStats);
    const totalAccuracy = activeStats.reduce((acc: number, current: any) => acc + current.rollingAccuracy, 0);
    const avgAccuracy = totalAccuracy / activeStats.length;

    // Map accuracy to entrance score (10.0 scale)
    const baseScore = avgAccuracy * 10;
    const marginOfError = totalQuestionsSolved > 200 ? 0.2 : totalQuestionsSolved > 50 ? 0.5 : 1.0;
    
    return {
      score: baseScore.toFixed(1),
      range: `±${marginOfError.toFixed(1)}`
    };
  };



  // Prepare chart data
  const chartData = Object.values(activeCategoryStats).map((stat: any) => ({
    name: stat.category.toUpperCase().replace('-', ' '),
    'Tỷ Lệ Đúng (%)': Math.round(stat.rollingAccuracy * 100),
    'Đã làm': stat.totalAnswered
  }));

  if (!isUnlocked) {
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

  const prediction = calculatePrediction();

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
          {['members', 'analytics', 'rewards', 'ingestion'].map(tab => {
            const tabNames: Record<string, string> = {
              members: 'Thành viên',
              analytics: 'Thống kê',
              rewards: 'Phần thưởng',
              ingestion: 'AI Ingest'
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        !viewingStudentId ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-12 text-center space-y-4">
            <p className="text-sm text-synth-text-muted">
              Vui lòng chọn một tài khoản con từ danh sách <strong>Thành viên</strong> để xem thống kê năng lực học tập.
            </p>
            <button
              onClick={() => setActiveTab('members')}
              className="px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300"
            >
              Xem danh sách Thành viên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prediction Metric */}
            <div className="glass-panel rounded-2xl border border-synth-cyan/20 p-5 flex flex-col justify-between min-h-[160px]">
              <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Dự đoán điểm thi vào lớp 10
                <button
                  onClick={() => showHelp('prediction')}
                  className="w-4 h-4 rounded-full bg-synth-cyan/20 border border-synth-cyan/40 text-synth-cyan text-[9px] font-black flex items-center justify-center hover:bg-synth-cyan/40 cursor-pointer transition-colors"
                  title="Tìm hiểu cách AI dự đoán điểm thi"
                >
                  ?
                </button>
              </h4>
              <div className="py-4 text-center">
                <span className="text-4xl font-black font-orbitron text-white">
                  {prediction.score}
                </span>
                <span className="text-sm font-semibold text-synth-cyan font-orbitron ml-1">
                  {prediction.range !== 'Cần làm ít nhất 20 câu để AI dự đoán' && prediction.range}
                </span>
              </div>
              <p className="text-[10px] text-synth-text-muted leading-relaxed">
                Dự đoán dựa trên tỷ lệ làm đúng trên từng chuyên đề thực tế. {prediction.range}
              </p>
            </div>

            {/* Core Volume */}
            <div className="glass-panel rounded-2xl border border-synth-orange/20 p-5 flex flex-col justify-between min-h-[160px]">
              <h4 className="font-orbitron font-bold text-xs text-synth-orange uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" /> Tổng quan kết quả làm bài
              </h4>
              <div className="py-4 text-center">
                <span className="text-4xl font-black font-orbitron text-white">
                  {chartData.reduce((acc, cur) => acc + cur['Đã làm'], 0)}
                </span>
                <span className="text-xs text-synth-text-muted font-bold uppercase ml-2">Câu Hỏi</span>
              </div>
              <p className="text-[10px] text-synth-text-muted leading-relaxed">
                Số câu đã trả lời. Luyện tập trên 2000 câu giúp dự đoán chính xác điểm tới 98%.
              </p>
            </div>

            {/* Current Wallet Approved */}
            <div className="glass-panel rounded-2xl border border-synth-magenta/20 p-5 flex flex-col justify-between min-h-[160px]">
              <h4 className="font-orbitron font-bold text-xs text-synth-magenta uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4" /> Số dư Ví đổi quà của con
              </h4>
              <div className="py-4 text-center">
                <span className="text-4xl font-black font-orbitron text-synth-magenta">
                  {(activePlayer?.walletVND || 0).toLocaleString()}đ
                </span>
              </div>
              <p className="text-[10px] text-synth-text-muted leading-relaxed">
                Khoản thưởng tích lũy của con chưa quy đổi. Con tích lũy từ nhiệm vụ ngày hoặc đấu Boss.
              </p>
            </div>

            {/* Category Bar Chart */}
            <div className="glass-panel rounded-2xl border border-white/5 p-5 md:col-span-3">
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-4">
                Biểu đồ tỷ lệ đúng theo chuyên đề
              </h4>
              <div className="h-64 w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#95a5a6" fontSize={10} tickLine={false} />
                      <YAxis stroke="#95a5a6" fontSize={10} domain={[0, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#141722', borderColor: '#ff007f' }} />
                      <Bar dataKey="Tỷ Lệ Đúng (%)" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-synth-text-muted">
                    Con chưa làm bài luyện tập nào để kết xuất biểu đồ.
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}

      {/* Rewards tab */}
      {activeTab === 'rewards' && (
        !viewingStudentId ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-12 text-center space-y-4">
            <p className="text-sm text-synth-text-muted">
              Vui lòng chọn một tài khoản con từ danh sách <strong>Thành viên</strong> để duyệt và quản lý quy đổi phần thưởng.
            </p>
            <button
              onClick={() => setActiveTab('members')}
              className="px-4 py-2 rounded-lg font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300"
            >
              Xem danh sách Thành viên
            </button>
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
        )
      )}

      {/* Ingestion tab */}
      {activeTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div>
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Nhập thêm đề thi Tiếng Anh vào lớp 10 (PDF/Thô)
                <button
                  onClick={() => showHelp('ai-ingest')}
                  className="w-4 h-4 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black flex items-center justify-center hover:bg-white/25 cursor-pointer transition-colors"
                  title="Xem định dạng mẫu và hướng dẫn nhập liệu"
                >
                  ?
                </button>
              </h4>
              <p className="text-xs text-synth-text-muted leading-relaxed">
                Nhập văn bản thô của đề thi theo định dạng bên dưới. Công cụ sẽ tự động tách câu và đáp án.
              </p>
            </div>

            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Ví dụ:
The weather was extremely cold...
A. because
B. despite (correct)
C. although
D. however

She behaved very ______ towards guests. (POLITE)
Answer: politely"
              rows={8}
              className="w-full p-4 rounded-xl border border-white/10 bg-synth-gray/20 text-white text-xs outline-none focus:border-synth-magenta font-mono"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleParseQuestions}
                disabled={!rawText.trim() || loadingIngest}
                className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-magenta text-black hover:synth-glow-magenta cursor-pointer transition-all duration-300 disabled:opacity-40"
              >
                {loadingIngest ? 'Đang phân tích (AI)...' : 'Phân Tích Đề Thi (AI)'}
              </button>
            </div>
          </div>

          {/* Import Preview List */}
          {showImportPreview && (
            <div className="glass-panel rounded-2xl border border-synth-cyan/20 p-5 space-y-4 animate-float">
              <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider">
                Xem trước câu hỏi phân tích ({importPreview.length} câu)
              </h4>

              <div className="space-y-3 overflow-y-auto max-h-[300px]">
                {importPreview.map((q, idx) => (
                  <div key={idx} className="bg-synth-gray/30 p-3 rounded-lg border border-white/5 text-xs">
                    <span className="font-bold text-synth-cyan uppercase font-orbitron text-[10px]">
                      Loại: {q.type} | Dạng: {q.category}
                    </span>
                    <p className="text-white font-medium my-1">{q.prompt}</p>
                    {q.options && (
                      <ul className="pl-4 list-disc text-synth-text-muted">
                        {q.options.map((opt, oIdx) => (
                          <li key={oIdx} className={opt === q.correctAnswer ? 'text-synth-green font-bold' : ''}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                    {!q.options && (
                      <p className="text-synth-green font-bold">Đáp án: {q.correctAnswer}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleConfirmImport}
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider bg-synth-cyan text-black hover:synth-glow-cyan cursor-pointer transition-all"
                >
                  Xác Nhận Nhập Đề
                </button>
                <button
                  onClick={() => {
                    setImportPreview([]);
                    setShowImportPreview(false);
                  }}
                  className="px-6 py-2.5 rounded-xl border border-synth-gray text-synth-text-muted font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Hủy Bỏ
                </button>
              </div>
            </div>
          )}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <span className="text-[10px] uppercase text-synth-magenta font-bold font-orbitron">Ví tích lũy</span>
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
                      <span className="text-[10px] text-synth-text-muted mt-1">Năng lượng còn lại: {selectedStudentProfile.player?.energy || 0}/100</span>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-synth-bg/95 backdrop-blur-md border-t border-synth-magenta/25 px-3 py-2.5 pb-3 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(255,0,127,0.15)]">
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
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'analytics' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">📊</span>
          <span>Thống kê</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'rewards' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">🎁</span>
          <span>Phần thưởng</span>
        </button>

        <button
          onClick={() => setActiveTab('ingestion')}
          className={`flex flex-col items-center gap-0.5 font-orbitron font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === 'ingestion' ? 'text-synth-magenta' : 'text-synth-text-muted hover:text-white'
          }`}
        >
          <span className="text-lg">🤖</span>
          <span>AI Ingest</span>
        </button>
      </nav>
    </div>
  );
};
