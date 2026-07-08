import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { 
  ArrowLeft, Sparkles, Brain, Award, Clock
} from 'lucide-react';
import { toast } from '../utils/toast';

interface RelaxationZoneProps {
  onBack: () => void;
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
}

const DEFAULT_FLASHCARDS: Flashcard[] = [
  { id: '1', front: 'Procrastinate (v)', back: 'Trì hoãn, khất lần (hành động hoãn việc cần làm lại)', category: 'English Vocabulary', difficulty: 'Trung bình' },
  { id: '2', front: 'Mệnh đề quan hệ xác định (Defining Relative Clause)', back: 'Dùng để định nghĩa danh từ đứng trước nó, không có dấu phẩy, bắt buộc phải có để câu đủ nghĩa.', category: 'English Grammar', difficulty: 'Dễ' },
  { id: '3', front: 'Thể tích hình nón (Cone Volume)', back: 'V = (1/3) * pi * r^2 * h\n(Với r là bán kính đáy, h là đường cao)', category: 'Math Formula', difficulty: 'Dễ' },
  { id: '4', front: 'Biện pháp nhân hóa', back: 'Gọi hoặc tả con vật, cây cối, đồ vật bằng những từ ngữ vốn được dùng để gọi hoặc tả con người.', category: 'Literature Device', difficulty: 'Dễ' },
  { id: '5', front: 'Elaborate (adj/v)', back: 'Phức tạp, tỉ mỉ, chi tiết; (v) Giải thích chi tiết, thêm chi tiết.', category: 'English Vocabulary', difficulty: 'Khó' },
  { id: '6', front: 'Hệ thức lượng trong tam giác vuông', back: 'a^2 = b^2 + c^2 (Pythagoras)\nb^2 = a * b\'\nh^2 = b\' * c\'', category: 'Math Geometry', difficulty: 'Trung bình' },
];

export const RelaxationZone: React.FC<RelaxationZoneProps> = ({ onBack }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';
  
  const [activeTab, setActiveTab] = useState<'flashcards' | 'match' | 'mindmap' | 'story' | 'adventure'>('flashcards');
  
  // Flashcard states
  const [flashcards] = useState<Flashcard[]>(DEFAULT_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberedCount, setRememberedCount] = useState(0);
  
  // Interactive mock state for Ghép cặp
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [selectedMatchItems, setSelectedMatchItems] = useState<string[]>([]);
  const matchItems = [
    { id: 't1', text: 'Benevolent', pair: 'p1', type: 'word' },
    { id: 'p1', text: 'Nhân từ, rộng lượng', pair: 't1', type: 'mean' },
    { id: 't2', text: 'Sóng - Xuân Quỳnh', pair: 'p2', type: 'word' },
    { id: 'p2', text: 'Thể thơ ngũ ngôn, tình yêu', pair: 't2', type: 'mean' },
    { id: 't3', text: 'P = (a + b) * 2', pair: 'p3', type: 'word' },
    { id: 'p3', text: 'Chu vi hình chữ nhật', pair: 't3', type: 'mean' },
  ];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 200);
  };

  const handleMarkAsRemembered = () => {
    setRememberedCount(prev => prev + 1);
    toast.success('Đã ghi nhận là thuộc rồi. Khá đấy.');
    handleNextCard();
  };

  const handleMatchSelect = (id: string) => {
    if (selectedMatchItems.includes(id)) {
      setSelectedMatchItems(prev => prev.filter(x => x !== id));
      return;
    }

    const newSelection = [...selectedMatchItems, id];
    if (newSelection.length === 2) {
      const item1 = matchItems.find(x => x.id === newSelection[0]);
      const item2 = matchItems.find(x => x.id === newSelection[1]);
      
      if (item1 && item2 && (item1.pair === item2.id || item2.pair === item1.id)) {
        toast.success('Chuẩn xác, ghép đúng rồi 🎉');
        setMatchedPairsCount(prev => prev + 1);
      } else {
        toast.error('Lệch một nhịp, ghép lại đi!');
      }
      setSelectedMatchItems([]);
    } else {
      setSelectedMatchItems(newSelection);
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header HUD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <button 
            onClick={onBack}
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
              isUnicorn 
                ? 'border-violet-200/50 bg-white/70 hover:bg-violet-50 text-violet-700' 
                : 'border-white/5 bg-synth-gray/30 hover:bg-synth-gray/50 text-synth-text-muted hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Bản Đồ Chính
          </button>
          <div className="flex items-center gap-2 mt-2">
            <Sparkles className={`w-6 h-6 ${isUnicorn ? 'text-fuchsia-500' : 'text-synth-magenta animate-pulse'}`} />
            <h1 className={`font-orbitron font-black text-2xl uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
              Sơn Trang Thư Giãn
            </h1>
          </div>
          <p className={`text-xs ${isUnicorn ? 'text-violet-700/70' : 'text-synth-text-muted'}`}>
            Chỗ luyện đầu óc nhẹ nhịp, chơi mà nhớ, nghỉ mà vẫn lên tay.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-synth-gray/30 pb-3">
        {[
          { id: 'flashcards', label: '🎴 Xưởng thẻ nhớ', desc: 'Thẻ nhớ gọn, dễ thuộc' },
          { id: 'match', label: '🔗 Ghép cặp', desc: 'Ghép đúng là ăn điểm' },
          { id: 'mindmap', label: '🗺️ Sơ đồ tư duy', desc: 'Sơ đồ tư duy' },
          { id: 'story', label: '🎭 Tình huống', desc: 'Phiêu lưu theo tình huống' },
          { id: 'adventure', label: '🧭 Du khảo', desc: 'Hành trình bản đồ' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-orbitron text-xs font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer text-left flex flex-col ${
              activeTab === tab.id
                ? isUnicorn
                  ? 'bg-gradient-to-r from-fuchsia-100 to-violet-100 text-violet-900 border border-violet-300'
                  : 'bg-synth-magenta/20 border border-synth-magenta text-synth-magenta shadow-[0_0_12px_rgba(255,0,127,0.2)]'
                : isUnicorn
                  ? 'bg-white/40 border border-transparent hover:bg-white/70 text-violet-700/80'
                  : 'bg-synth-gray/20 border border-transparent hover:bg-synth-gray/40 text-synth-text-muted hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[9px] font-semibold opacity-60 normal-case mt-0.5">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'flashcards' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Flashcard display */}
            <div className="lg:col-span-2 space-y-6 flex flex-col items-center">
              {/* Card area */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-lg aspect-[5/3] cursor-pointer group [perspective:1000px]"
              >
                <div className={`relative w-full h-full duration-500 transform-style-3d ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}>
                  {/* Front Side */}
                  <div className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                    isUnicorn 
                      ? 'bg-gradient-to-br from-white to-violet-50/50 border-violet-200/50 text-violet-900' 
                      : 'bg-gradient-to-br from-synth-gray/40 to-synth-bg border-synth-cyan/30 text-white'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${
                        isUnicorn ? 'bg-violet-100 text-violet-700' : 'bg-synth-cyan/15 text-synth-cyan'
                      }`}>
                        {currentCard.category}
                      </span>
                      <span className={`text-[10px] font-bold font-orbitron px-2 py-0.5 rounded ${
                        currentCard.difficulty === 'Khó' ? 'text-red-400 bg-red-400/10' : currentCard.difficulty === 'Trung bình' ? 'text-yellow-400 bg-yellow-400/10' : 'text-green-400 bg-green-400/10'
                      }`}>
                        Độ khó: {currentCard.difficulty}
                      </span>
                    </div>

                    <div className="text-center py-6">
                      <h3 className="font-orbitron font-bold text-xl sm:text-2xl tracking-wide select-none leading-relaxed">
                        {currentCard.front}
                      </h3>
                    </div>

                    <div className="text-center text-[10px] text-synth-text-muted uppercase tracking-wider font-semibold animate-pulse">
                      Bấm vào thẻ để xem định nghĩa/đáp án
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                    isUnicorn 
                      ? 'bg-gradient-to-br from-fuchsia-50/90 to-white border-violet-200/50 text-violet-950' 
                      : 'bg-gradient-to-br from-synth-gray/50 to-synth-bg border-synth-magenta/30 text-white'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${
                        isUnicorn ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-synth-magenta/15 text-synth-magenta'
                      }`}>
                        Định nghĩa & Đáp án
                      </span>
                      <span className="text-[10px] font-bold font-orbitron text-slate-400">
                        Thẻ {currentIndex + 1}/{flashcards.length}
                      </span>
                    </div>

                    <div className="text-center py-4 px-2">
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                        {currentCard.back}
                      </p>
                    </div>

                    <div className="text-center text-[10px] text-synth-text-muted uppercase tracking-wider font-semibold">
                      Bấm vào thẻ để quay lại mặt trước
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 items-center">
                <button
                  onClick={handlePrevCard}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${
                    isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'
                  }`}
                >
                  Thẻ Trước
                </button>

                <span className="text-xs font-bold font-orbitron text-slate-400">
                  {currentIndex + 1} / {flashcards.length}
                </span>

                <button
                  onClick={handleNextCard}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${
                    isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'
                  }`}
                >
                  Thẻ Tiếp
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleMarkAsRemembered}
                  className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer hover:synth-glow-green hover:scale-[1.03] transition-all flex items-center gap-1.5 ${
                    isUnicorn 
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-synth-green text-black shadow-[0_0_12px_rgba(57,255,20,0.25)]'
                  }`}
                >
                  <Award className="w-4 h-4 text-black" /> Thuộc luôn thẻ này
                </button>
              </div>
            </div>

            {/* Right Guide & Stats */}
            <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'
            }`}>
              <div className="space-y-4">
                <h3 className={`font-orbitron font-black text-sm uppercase tracking-wide flex items-center gap-1.5 ${
                  isUnicorn ? 'text-violet-800' : 'text-synth-cyan'
                }`}>
                  <Brain className="w-4 h-4" /> Thống kê thẻ
                </h3>

                <div className="space-y-3">
                  <div className={`p-3 rounded-xl border flex justify-between items-center ${
                    isUnicorn ? 'bg-violet-50/50 border-violet-100 text-violet-950' : 'bg-white/5 border-white/5 text-white'
                  }`}>
                    <span className="text-xs font-semibold text-slate-400">Tổng số thẻ:</span>
                    <span className="text-xs font-bold font-orbitron">{flashcards.length}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex justify-between items-center ${
                    isUnicorn ? 'bg-violet-50/50 border-violet-100 text-violet-950' : 'bg-white/5 border-white/5 text-white'
                  }`}>
                    <span className="text-xs font-semibold text-slate-400">Đã thuộc lòng hôm nay:</span>
                    <span className="text-xs font-bold font-orbitron text-synth-green">+{rememberedCount} thẻ</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className={`text-xs font-bold ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>Công năng hỗ trợ:</h4>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                    <li>Ghi nhớ chủ động qua lật thẻ.</li>
                    <li>Sắp xếp thuật toán SRS lặp lại ngắt quãng (sắp ra mắt).</li>
                    <li>Tự tạo Flashcard mới của con từ Sổ Tay Lỗi Sai.</li>
                  </ul>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-center text-[10px] text-slate-400 border border-dashed ${
                isUnicorn ? 'border-violet-200 text-violet-700/80' : 'border-synth-cyan/35 text-synth-cyan/80'
              }`}>
                💡 Thư giãn mỗi ngày 10 phút cùng Flashcards giúp ghi nhớ thêm 50 từ vựng mỗi tuần!
              </div>
            </div>
          </div>
        )}

        {activeTab === 'match' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-magenta/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🔗 Ghép cặp - Ghép Cặp Bài Trùng</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nối từ vựng với định nghĩa, công thức với tên gọi để rèn luyện phản xạ siêu tốc. Chọn 2 ô liên kết để ghép cặp.
              </p>
            </div>

            {/* Interactive Demo Area */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto py-4">
              {matchItems.map(item => {
                const isSelected = selectedMatchItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleMatchSelect(item.id)}
                    className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center text-center h-20 select-none ${
                      isSelected
                        ? isUnicorn
                          ? 'border-violet-600 bg-violet-100 text-violet-900 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                          : 'border-synth-magenta bg-synth-magenta/15 text-synth-magenta shadow-[0_0_10px_rgba(255,0,127,0.3)]'
                        : isUnicorn
                          ? 'border-violet-200 bg-white hover:border-violet-400 text-violet-900'
                          : 'border-white/10 bg-synth-gray/30 hover:border-white/20 text-white'
                    }`}
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-6 text-xs font-bold">
              <div className={isUnicorn ? 'text-violet-900' : 'text-white'}>
                Đã ghép đúng: <span className="font-orbitron font-bold text-synth-green">{matchedPairsCount} cặp</span>
              </div>
              <button 
                onClick={() => {
                  setMatchedPairsCount(0);
                  toast.success('Đã làm mới bảng ghép cặp!');
                }}
                className="text-[10px] text-synth-cyan hover:underline font-bold uppercase tracking-wider cursor-pointer"
              >
                Chơi Lại Bảng Này
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mindmap' && (
          <div className={`glass-panel rounded-3xl border p-8 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                isUnicorn ? 'bg-violet-100 border border-violet-200' : 'bg-synth-cyan/15 border border-synth-cyan/35'
              }`}>
                🗺️
              </div>
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🗺️ Sơ đồ tư duy Builder - Kiến Tạo Sơ Đồ Tư Duy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tự tay kết nối các bài học, công thức toán, hoặc nhân vật văn học để thấy bức tranh toàn cảnh của môn học.
              </p>
            </div>

            {/* Visual Node Diagram Concept */}
            <div className="border border-white/5 bg-black/30 rounded-2xl p-6 max-w-lg mx-auto relative overflow-hidden h-48 flex items-center justify-center">
              <div className="absolute inset-0 synth-grid-bg opacity-20" />
              
              <div className="relative flex flex-col items-center gap-4 z-10">
                <div className={`px-3 py-1.5 rounded-xl border font-bold text-[11px] ${
                  isUnicorn 
                    ? 'border-violet-400 bg-violet-100 text-violet-800 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'border-synth-cyan bg-synth-cyan/10 text-synth-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                }`}>
                  Chủ đề lớn: Tiếng Anh Lớp 9
                </div>
                
                <div className="flex gap-4">
                  <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-300">
                    Mệnh đề quan hệ
                  </div>
                  <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-300">
                    Thì hoàn thành
                  </div>
                  <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-300">
                    Câu bị động
                  </div>
                </div>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-orbitron ${
              isUnicorn ? 'bg-violet-100 text-violet-700' : 'bg-synth-cyan/10 border border-synth-cyan/20 text-synth-cyan'
            }`}>
              <Clock className="w-3.5 h-3.5 animate-spin" /> Đang rèn · Bản thử nghiệm
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className={`glass-panel rounded-3xl border p-8 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                isUnicorn ? 'bg-fuchsia-100 border border-fuchsia-200' : 'bg-synth-purple/15 border border-synth-purple/35'
              }`}>
                🎭
              </div>
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🎭 Story & Scenario Mode - Học Qua Tình Huống</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hóa thân thành thám tử khoa học hoặc nhà du hành lịch sử. Kiến thức của con sẽ là vũ khí/chìa khóa để giúp nhân vật lựa chọn lối đi và sinh tồn!
              </p>
            </div>

            {/* RPG Choice Mock */}
            <div className="bg-synth-gray/20 border border-white/5 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-4">
              <p className="text-xs text-slate-300 italic">
                "Kẻ gác cổng cổ đại hỏi con: Để qua cầu vồng lửa, con phải tìm từ viết đúng của động từ bất quy tắc 'fly' ở dạng quá khứ phân từ..."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => toast.error('Cửa ải lắc đầu. Chọn lại đi.')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left cursor-pointer transition-all"
                >
                  A) Flew (Quá khứ đơn)
                </button>
                <button 
                  onClick={() => toast.success('Chuẩn xác. Cầu vồng lửa hạ xuống, qua đi.')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left cursor-pointer transition-all"
                >
                  B) Flown (Quá khứ phân từ)
                </button>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-orbitron ${
              isUnicorn ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-synth-purple/10 border border-synth-purple/20 text-synth-purple'
            }`}>
              <Clock className="w-3.5 h-3.5 animate-spin" /> Đang rèn · Bản thử nghiệm
            </div>
          </div>
        )}

        {activeTab === 'adventure' && (
          <div className={`glass-panel rounded-3xl border p-8 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-orange/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                isUnicorn ? 'bg-amber-100 border border-amber-200' : 'bg-synth-orange/15 border border-synth-orange/35'
              }`}>
                🧭
              </div>
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🧭 Du khảo Journey - Chuyến Du Khảo Kỳ Thú</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Biến bài học thành ải nhiệm vụ. Qua ải là mở thêm đất.
              </p>
            </div>

            {/* Visual Steps Mock */}
            <div className="flex items-center justify-center gap-4 py-4 max-w-sm mx-auto">
              <div className="w-8 h-8 rounded-full bg-synth-green border border-synth-green/40 flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </div>
              <div className="h-0.5 w-12 bg-synth-green" />
              <div className="w-8 h-8 rounded-full bg-synth-orange border border-synth-orange/40 flex items-center justify-center text-white text-[10px] font-bold animate-pulse">
                2
              </div>
              <div className="h-0.5 w-12 bg-white/10" />
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 text-[10px] font-bold">
                3
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-orbitron ${
              isUnicorn ? 'bg-amber-100 text-amber-700' : 'bg-synth-orange/10 border border-synth-orange/20 text-synth-orange'
            }`}>
              <Clock className="w-3.5 h-3.5 animate-spin" /> Đang rèn · Bản thử nghiệm
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
