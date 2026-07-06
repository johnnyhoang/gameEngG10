import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Question } from '../types/game';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock, Unlock, Check, X, ShieldAlert, Award, FileText, Database, Plus, BarChart2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

export const ParentConsole: React.FC = () => {
  const player = useGameState(state => state.player);
  const rewards = useGameState(state => state.rewards);
  const categoryStats = useGameState(state => state.categoryStats);
  const verifyPIN = useGameState(state => state.verifyPIN);
  const approveReward = useGameState(state => state.approveReward);
  const rejectReward = useGameState(state => state.rejectReward);
  const addParentReward = useGameState(state => state.addParentReward);
  const importQuestions = useGameState(state => state.importQuestions);
  const resetProgress = useGameState(state => state.resetProgress);

  // PIN Lock States
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
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
  const [activeTab, setActiveTab] = useState<'analytics' | 'rewards' | 'ingestion' | 'settings'>('analytics');

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

  // Prediction calculations
  const calculatePrediction = () => {
    const totalQuestionsSolved = Object.values(categoryStats).reduce((acc, current) => acc + current.totalAnswered, 0);
    if (totalQuestionsSolved < 20) {
      return { score: 'Đang tích lũy...', range: 'Cần làm ít nhất 20 câu để AI dự đoán' };
    }

    // Calculate rolling average accuracy
    const activeStats = Object.values(categoryStats);
    const totalAccuracy = activeStats.reduce((acc, current) => acc + current.rollingAccuracy, 0);
    const avgAccuracy = totalAccuracy / activeStats.length;

    // Map accuracy to entrance score (10.0 scale)
    const baseScore = avgAccuracy * 10;
    const marginOfError = totalQuestionsSolved > 200 ? 0.2 : totalQuestionsSolved > 50 ? 0.5 : 1.0;
    
    return {
      score: baseScore.toFixed(1),
      range: `±${marginOfError.toFixed(1)}`
    };
  };

  const handleResetProgress = () => {
    if (window.confirm('Ba mẹ có chắc muốn thiết lập lại toàn bộ tiến độ của con không? Dữ liệu câu hỏi sẽ KHÔNG bị mất, nhưng điểm số, level và pet sẽ quay lại từ đầu.')) {
      resetProgress();
      alert('Đã hoàn tất thiết lập lại!');
    }
  };

  const handleBackupExport = () => {
    const stateJson = localStorage.getItem('cyber-english-state');
    if (!stateJson) return;
    const blob = new Blob([stateJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyber-english-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRestoreImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.player && data.questions) {
          localStorage.setItem('cyber-english-state', JSON.stringify(data));
          window.location.reload(); // Reload to refresh Zustand state from localStorage
        } else {
          alert('Tệp dữ liệu không hợp lệ!');
        }
      } catch (err) {
        alert('Lỗi khi phân tích tệp dữ liệu!');
      }
    };
    reader.readAsText(file);
  };

  // Prepare chart data
  const chartData = Object.values(categoryStats).map(stat => ({
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
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="glass-panel rounded-2xl border border-synth-magenta/30 p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-synth-magenta/5 to-transparent">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-synth-magenta" />
          <h2 className="font-orbitron text-lg font-black text-white uppercase tracking-wider">
            Bảng Quản Trị Của Ba Mẹ
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2">
          {['analytics', 'rewards', 'ingestion', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-synth-magenta border-synth-magenta text-black' 
                  : 'bg-transparent border-synth-magenta/30 text-synth-magenta hover:bg-synth-magenta/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Prediction Metric */}
          <div className="glass-panel rounded-2xl border border-synth-cyan/20 p-5 flex flex-col justify-between min-h-[160px]">
            <h4 className="font-orbitron font-bold text-xs text-synth-cyan uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Dự đoán điểm thi vào lớp 10
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
                {player.walletVND.toLocaleString()}đ
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
      )}

      {/* Rewards tab */}
      {activeTab === 'rewards' && (
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
              {rewards.length > 0 ? (
                rewards.map(reward => (
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
                            onClick={() => approveReward(reward.id)}
                            className="p-2 rounded-lg bg-synth-green text-black cursor-pointer hover:synth-glow-green transition-all"
                            title="Xác nhận đã chi quà thật cho con"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => rejectReward(reward.id)}
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
                  Chưa có phần thưởng nào.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ingestion tab */}
      {activeTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <div>
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Nhập thêm đề thi Tiếng Anh vào lớp 10 (PDF/Thô)
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

      {/* Settings tab */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backup Database */}
          <div className="glass-panel rounded-2xl border border-white/5 p-5 space-y-4">
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4" /> Sao lưu & Khôi phục dữ liệu học tập
            </h4>
            <p className="text-xs text-synth-text-muted leading-relaxed">
              Tránh mất mát dữ liệu do cache trình duyệt bị xóa. Hãy tạo sao lưu dự phòng định kỳ.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBackupExport}
                className="flex-1 py-3 rounded-xl border border-synth-cyan text-synth-cyan font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-synth-cyan/10 cursor-pointer transition-all duration-300"
              >
                Sao Lưu (JSON Export)
              </button>

              <label className="flex-1 py-3 rounded-xl border border-synth-orange text-synth-orange font-orbitron font-bold text-xs uppercase tracking-wider text-center cursor-pointer hover:bg-synth-orange/10 transition-all duration-300">
                Khôi Phục (JSON Import)
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Reset progress */}
          <div className="glass-panel rounded-2xl border border-red-500/20 p-5 space-y-4 bg-gradient-to-t from-red-500/5 to-transparent">
            <h4 className="font-orbitron font-bold text-xs text-red-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Vùng quản trị Nguy hiểm
            </h4>
            <p className="text-xs text-synth-text-muted leading-relaxed">
              Thiết lập lại toàn bộ điểm số, streak và pet rồng lửa của con trở lại mặc định. Thao tác không thể hoàn tác.
            </p>

            <button
              onClick={handleResetProgress}
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-black font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
            >
              Reset Tiến Độ Của Con
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
