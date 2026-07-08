import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { 
  ArrowLeft, Sparkles, Brain, Award, RefreshCw, HelpCircle
} from 'lucide-react';
import { toast } from '../utils/toast';
import type { Question } from '../types/game';

interface RelaxationZoneProps {
  onBack: () => void;
}

// ----------------------------------------------------
// Type Definitions for Games
// ----------------------------------------------------
interface MatchItem {
  id: string;
  text: string;
  pairId: string;
  isMatched: boolean;
}

interface MindmapNode {
  id: string;
  label: string;
  details?: string;
  formula?: string;
  children?: MindmapNode[];
}

export const RelaxationZone: React.FC<RelaxationZoneProps> = ({ onBack }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  
  const isUnicorn = uiTheme === 'unicorn-dream';
  
  const [activeTab, setActiveTab] = useState<'flashcards' | 'match' | 'mindmap' | 'story' | 'adventure'>('flashcards');

  // ----------------------------------------------------
  // Tab 1: Xưởng Thẻ Nhớ (Dynamic SRS Flashcards)
  // ----------------------------------------------------
  const [flashcardSubject, setFlashcardSubject] = useState<'all' | 'english' | 'math' | 'literature'>('all');
  const [activeFlashcards, setActiveFlashcards] = useState<Question[]>([]);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcRememberedCount, setFcRememberedCount] = useState(0);

  useEffect(() => {
    // Generate flashcards from repository questions
    let filtered = questions;
    if (flashcardSubject !== 'all') {
      filtered = questions.filter(q => q.subject === flashcardSubject);
    }
    // Shuffle slightly or take first 15
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 15);
    setActiveFlashcards(shuffled);
    setFcIndex(0);
    setFcFlipped(false);
  }, [flashcardSubject, questions]);

  const handleFcNext = () => {
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev + 1) % activeFlashcards.length);
    }, 200);
  };

  const handleFcPrev = () => {
    setFcFlipped(false);
    setTimeout(() => {
      setFcIndex((prev) => (prev - 1 + activeFlashcards.length) % activeFlashcards.length);
    }, 200);
  };

  const handleFcRemembered = () => {
    if (activeFlashcards.length === 0) return;
    setFcRememberedCount(prev => prev + 1);
    
    // Reward player 5 Coins and 10 XP for active recall memorization
    awardCoinsAndXp(5, 10, 'Thuộc thẻ nhớ', `Ghi nhớ câu hỏi: ${activeFlashcards[fcIndex].prompt.slice(0, 20)}...`);
    toast.success('Đã ghi nhận! Thưởng +5 NP, +10 XP 🎉');
    handleFcNext();
  };


  // ----------------------------------------------------
  // Tab 2: Trò Chơi Ghép Cặp (Dynamic Match Pairs)
  // ----------------------------------------------------
  const [matchSubject, setMatchSubject] = useState<'english' | 'math' | 'literature'>('english');
  const [matchCards, setMatchCards] = useState<MatchItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchStatus, setMatchStatus] = useState<'playing' | 'victory'>('playing');

  // Hardcoded pair banks representing core curricula
  const ENGLISH_PAIRS = [
    { word: 'Procrastinate', mean: 'Trì hoãn, khất lần' },
    { word: 'Benevolent', mean: 'Nhân từ, rộng lượng' },
    { word: 'Elaborate', mean: 'Chi tiết, tỉ mỉ' },
    { word: 'Abundant', mean: 'Dồi dào, phong phú' },
    { word: 'Obsolete', mean: 'Lỗi thời, cổ xưa' },
    { word: 'Resilient', mean: 'Kiên cường, bền bỉ' }
  ];

  const MATH_PAIRS = [
    { word: 'Diện tích đường tròn', mean: 'S = π * r²' },
    { word: 'Hệ thức Pythagoras', mean: 'a² = b² + c²' },
    { word: 'Thể tích hình trụ', mean: 'V = π * r² * h' },
    { word: 'Diện tích tam giác', mean: 'S = ½ * a * h' },
    { word: 'Hệ thức Vi-ét (Tổng)', mean: 'x₁ + x₂ = -b/a' },
    { word: 'Thể tích hình nón', mean: 'V = ⅓ * π * r² * h' }
  ];

  const LITERATURE_PAIRS = [
    { word: 'Xuân Quỳnh', mean: 'Tác phẩm "Sóng"' },
    { word: 'Nam Cao', mean: 'Tác phẩm "Lão Hạc"' },
    { word: 'Nguyễn Du', mean: 'Tác phẩm "Truyện Kiều"' },
    { word: 'Nguyễn Minh Châu', mean: 'Tác phẩm "Chiếc thuyền ngoài xa"' },
    { word: 'Tô Hoài', mean: 'Tác phẩm "Dế Mèn Phiêu Lưu Ký"' },
    { word: 'Chính Hữu', mean: 'Tác phẩm "Đồng chí"' }
  ];

  const initMatchGame = () => {
    let source = ENGLISH_PAIRS;
    if (matchSubject === 'math') source = MATH_PAIRS;
    else if (matchSubject === 'literature') source = LITERATURE_PAIRS;

    // Pick 5 random pairs
    const pairs = [...source].sort(() => 0.5 - Math.random()).slice(0, 5);

    // Create cards list
    const cards: MatchItem[] = [];
    pairs.forEach((p, idx) => {
      const pairId = `pair-${idx}`;
      cards.push({ id: `a-${idx}`, text: p.word, pairId, isMatched: false });
      cards.push({ id: `b-${idx}`, text: p.mean, pairId, isMatched: false });
    });

    // Shuffle cards
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchStatus('playing');
  };

  useEffect(() => {
    initMatchGame();
  }, [matchSubject]);

  const handleCardClick = (cardId: string) => {
    const card = matchCards.find(c => c.id === cardId);
    if (!card || card.isMatched || selectedCards.includes(cardId)) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const card1 = matchCards.find(c => c.id === newSelected[0])!;
      const card2 = matchCards.find(c => c.id === newSelected[1])!;

      if (card1.pairId === card2.pairId) {
        // MATCH!
        setTimeout(() => {
          setMatchCards(prev => prev.map(c => 
            c.pairId === card1.pairId ? { ...c, isMatched: true } : c
          ));
          setSelectedCards([]);
          toast.success('Hợp nhất thành công! 🎉');

          // Check win condition
          setMatchCards(current => {
            const allMatched = current.every(c => c.isMatched || c.pairId === card1.pairId);
            if (allMatched) {
              setMatchStatus('victory');
              // Reward 30 Coins and 40 XP
              awardCoinsAndXp(30, 40, 'Ghép cặp thành công', `Hoàn thành bảng ghép cặp chủ đề ${matchSubject}`);
            }
            return current;
          });
        }, 300);
      } else {
        // MISMATCH!
        setTimeout(() => {
          setSelectedCards([]);
          toast.error('Không khớp nhau rồi!');
        }, 800);
      }
    }
  };


  // ----------------------------------------------------
  // Tab 3: Sơ Đồ Tư Duy (Visual Course Syllabus Map)
  // ----------------------------------------------------
  const [selectedMapSubject, setSelectedMapSubject] = useState<'math' | 'english' | 'literature'>('math');
  const [activeNodeDetails, setActiveNodeDetails] = useState<MindmapNode | null>(null);

  const MINDMAP_DATA: Record<'math' | 'english' | 'literature', MindmapNode> = {
    math: {
      id: 'm1',
      label: 'Đại Số & Hình Học 9',
      children: [
        {
          id: 'm1-1',
          label: 'Hàm số bậc nhất & bậc hai',
          children: [
            { id: 'm1-1-1', label: 'Hàm số y = ax + b', details: 'Hàm số đồng biến khi a > 0, nghịch biến khi a < 0. Đồ thị là đường thẳng cắt trục tung tại (0, b).', formula: 'y = ax + b' },
            { id: 'm1-1-2', label: 'Hàm số y = ax²', details: 'Đồ thị parabol đỉnh O(0,0), đối xứng qua trục tung. Quay bề lõm lên trên khi a > 0, xuống dưới khi a < 0.', formula: 'y = ax²' }
          ]
        },
        {
          id: 'm1-2',
          label: 'Hệ thức Vi-ét',
          children: [
            { id: 'm1-2-1', label: 'Định lý Vi-ét thuận', details: 'Nếu phương trình bậc hai ax² + bx + c = 0 có hai nghiệm x₁, x₂ thì tổng và tích các nghiệm tuân theo hệ thức Vi-ét.', formula: 'x₁ + x₂ = -b/a \n x₁ * x₂ = c/a' },
            { id: 'm1-2-2', label: 'Định lý Vi-ét đảo', details: 'Nếu hai số có tổng là S và tích là P thì hai số đó là nghiệm của phương trình t² - St + P = 0 (Điều kiện S² ≥ 4P).', formula: 't² - St + P = 0' }
          ]
        },
        {
          id: 'm1-3',
          label: 'Hình Học Không Gian',
          children: [
            { id: 'm1-3-1', label: 'Hình Trụ', details: 'Hình sinh ra khi quay hình chữ nhật quanh một cạnh cố định. R là bán kính đáy, h là chiều cao.', formula: 'V = π * r² * h \n S_xq = 2 * π * r * h' },
            { id: 'm1-3-2', label: 'Hình Nón', details: 'Hình sinh ra khi quay tam giác vuông quanh một cạnh góc vuông. R là bán kính đáy, h là chiều cao, l là đường sinh.', formula: 'V = ⅓ * π * r² * h \n S_xq = π * r * l' }
          ]
        }
      ]
    },
    english: {
      id: 'e1',
      label: 'English Grammar Master',
      children: [
        {
          id: 'e1-1',
          label: 'Verb Tenses',
          children: [
            { id: 'e1-1-1', label: 'Present Perfect', details: 'Dùng để diễn tả một hành động đã hoàn thành cho tới thời điểm hiện tại mà không đề cập tới thời gian cụ thể.', formula: 'S + have/has + V3/ed' },
            { id: 'e1-1-2', label: 'Past Simple', details: 'Dùng để diễn tả hành động đã xảy ra và kết thúc hoàn toàn trong quá khứ.', formula: 'S + V2/ed' }
          ]
        },
        {
          id: 'e1-2',
          label: 'Relative Clauses',
          children: [
            { id: 'e1-2-1', label: 'Who vs Whom', details: 'Who làm chủ ngữ chỉ người. Whom làm tân ngữ thế mạng cho danh từ chỉ người đứng trước.', formula: 'N(people) + WHO + V \n N(people) + WHOM + S + V' },
            { id: 'e1-2-2', label: 'Whose', details: 'Đại từ sở hữu dùng cho cả người và vật, đứng giữa hai danh từ diễn tả quan hệ sở hữu.', formula: 'N1 + WHOSE + N2' }
          ]
        }
      ]
    },
    literature: {
      id: 'l1',
      label: 'Ngữ Văn 9 Tác Phẩm',
      children: [
        {
          id: 'l1-1',
          label: 'Thơ Hiện Đại',
          children: [
            { id: 'l1-1-1', label: 'Sóng (Xuân Quỳnh)', details: 'Sáng tác năm 1967. Bài thơ thể hiện tình yêu thiết tha, sâu nặng, thủy chung của người phụ nữ thông qua hình tượng Sóng.', formula: 'Đề tài: Tình yêu đôi lứa' },
            { id: 'l1-1-2', label: 'Đồng chí (Chính Hữu)', details: 'Sáng tác năm 1948. Ca ngợi tình đồng chí, đồng đội cao đẹp của các chiến sĩ vệ quốc quân trong thời kỳ đầu kháng chiến chống Pháp.', formula: 'Đề tài: Tình đồng đội' }
          ]
        },
        {
          id: 'l1-2',
          label: 'Truyện Hiện Đại',
          children: [
            { id: 'l1-2-1', label: 'Lão Hạc (Nam Cao)', details: 'Sáng tác năm 1943. Phản ánh số phận bi thảm và nhân phẩm cao đẹp của người nông dân nghèo trước Cách mạng Tháng Tám.', formula: 'Thể loại: Truyện ngắn hiện thực' },
            { id: 'l1-2-2', label: 'Chiếc thuyền ngoài xa', details: 'Nguyễn Minh Châu sáng tác năm 1983. Đặt ra vấn đề về mối quan hệ giữa nghệ thuật và cuộc sống, cái nhìn đa chiều về con người.', formula: 'Đề tài: Nghệ thuật & Đời sống' }
          ]
        }
      ]
    }
  };


  // ----------------------------------------------------
  // Tab 4: Kịch Bản Tình Huống (RPG Text Adventure)
  // ----------------------------------------------------
  const [storyStep, setStoryStep] = useState<number>(0); // 0: intro, 1: math node, 2: eng node, 3: lit node, 4: win, 5: gameover
  const [storyLives, setStoryLives] = useState<number>(3);
  const [storyInventory, setStoryInventory] = useState<string[]>([]);
  const [activeStoryQuest, setActiveStoryQuest] = useState<Question | null>(null);

  const initStoryQuest = (subject: 'math' | 'english' | 'literature') => {
    const list = questions.filter(q => q.subject === subject);
    const randomQ = list[Math.floor(Math.random() * list.length)] || null;
    setActiveStoryQuest(randomQ);
  };

  const handleStartStory = () => {
    setStoryStep(1);
    setStoryLives(3);
    setStoryInventory([]);
    initStoryQuest('math');
  };

  const handleStoryAnswer = (selectedOption: string) => {
    if (!activeStoryQuest) return;

    const correctAnsStr = Array.isArray(activeStoryQuest.correctAnswer)
      ? activeStoryQuest.correctAnswer[0]
      : activeStoryQuest.correctAnswer;

    if (selectedOption.trim().toLowerCase() === correctAnsStr.trim().toLowerCase()) {
      // Correct!
      toast.success('Chính xác! Con vượt qua thử thách này.');
      if (storyStep === 1) {
        setStoryInventory(prev => [...prev, '🔑 Chìa Khóa Vàng']);
        setStoryStep(2);
        initStoryQuest('english');
      } else if (storyStep === 2) {
        setStoryInventory(prev => [...prev, '🧭 La Bàn Cổ']);
        setStoryStep(3);
        initStoryQuest('literature');
      } else if (storyStep === 3) {
        setStoryInventory(prev => [...prev, '📜 Cuộn Sách Cổ']);
        setStoryStep(4); // Win
        awardCoinsAndXp(60, 50, 'Phiêu lưu tình huống', 'Giải thoát Rồng Con thành công');
      }
    } else {
      // Incorrect!
      toast.error('Ôi không, đáp án chưa đúng rồi!');
      const nextLives = storyLives - 1;
      setStoryLives(nextLives);
      if (nextLives <= 0) {
        setStoryStep(5); // Game Over
      } else {
        // Redraw a new question of the same subject
        initStoryQuest(activeStoryQuest.subject as any);
      }
    }
  };


  // ----------------------------------------------------
  // Tab 5: Hành Trình Du Khảo (Trivia Board Game)
  // ----------------------------------------------------
  const [boardPosition, setBoardPosition] = useState<number>(0); // 0 to 9
  const [diceRolling, setDiceRolling] = useState<boolean>(false);
  const [rolledNumber, setRolledNumber] = useState<number>(0);
  const [activeBoardQuestion, setActiveBoardQuestion] = useState<Question | null>(null);
  const [boardStatus, setBoardStatus] = useState<'idle' | 'answering' | 'won'>('idle');

  const handleRollDice = () => {
    if (diceRolling || boardStatus !== 'idle') return;
    setDiceRolling(true);
    setRolledNumber(0);

    let rolls = 0;
    const interval = setInterval(() => {
      setRolledNumber(Math.floor(Math.random() * 3) + 1); // Dice 1 to 3
      rolls++;
      if (rolls > 8) {
        clearInterval(interval);
        setDiceRolling(false);
        const rolled = Math.floor(Math.random() * 3) + 1;
        setRolledNumber(rolled);
        
        // Calculate new position
        const nextPos = Math.min(9, boardPosition + rolled);
        setBoardPosition(nextPos);

        if (nextPos >= 9) {
          setBoardStatus('won');
          awardCoinsAndXp(100, 80, 'Về đích Du khảo', 'Đạt vạch đích rương báu sơn trang');
          toast.success('Chúc mừng con đã hoàn thành bản đồ du khảo! 🏆');
        } else {
          // Trigger trivia at new tile
          setBoardStatus('answering');
          const randomQ = questions[Math.floor(Math.random() * questions.length)];
          setActiveBoardQuestion(randomQ);
        }
      }
    }, 120);
  };

  const handleBoardAnswer = (selectedOption: string) => {
    if (!activeBoardQuestion) return;

    const correctAnsStr = Array.isArray(activeBoardQuestion.correctAnswer)
      ? activeBoardQuestion.correctAnswer[0]
      : activeBoardQuestion.correctAnswer;

    if (selectedOption.trim().toLowerCase() === correctAnsStr.trim().toLowerCase()) {
      toast.success('Tuyệt vời! Con trả lời đúng, ô này an toàn! (+15 NP)');
      awardCoinsAndXp(15, 10, 'Đúng ô du khảo', 'Trả lời chính xác ô trivia trên bản đồ du khảo');
      setBoardStatus('idle');
    } else {
      toast.error('Nhầm đường rồi! Con bị thụt lùi 1 ô.');
      setBoardPosition(prev => Math.max(0, prev - 1));
      setBoardStatus('idle');
    }
  };

  const restartBoardGame = () => {
    setBoardPosition(0);
    setBoardStatus('idle');
    setRolledNumber(0);
  };


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
            Khu trò chơi trí tuệ, thư giãn bổ ích bằng cách vận dụng kho kiến thức.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-synth-gray/30 pb-3">
        {[
          { id: 'flashcards', label: '🎴 Xưởng Thẻ Nhớ', desc: 'Active Recall thực tế' },
          { id: 'match', label: '🔗 Ghép Cặp', desc: 'Chọn ô liên kết kiến thức' },
          { id: 'mindmap', label: '🗺️ Sơ Đồ Tư Duy', desc: 'Xem tóm tắt bài học' },
          { id: 'story', label: '🎭 Tình Huống RPG', desc: 'Phiêu lưu giải đố' },
          { id: 'adventure', label: '🧭 Du Khảo Kỳ Thú', desc: 'Tung xúc xắc trivia' },
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

      {/* Main Content Areas */}
      <div className="min-h-[400px]">
        
        {/* TAB 1: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6 flex flex-col items-center">
              {/* Filter controls */}
              <div className="flex gap-2 w-full max-w-lg bg-black/20 p-1.5 rounded-xl border border-white/5 justify-between">
                {[
                  { id: 'all', label: 'Tất Cả' },
                  { id: 'english', label: 'Tiếng Anh 🇬🇧' },
                  { id: 'math', label: 'Toán Học 📐' },
                  { id: 'literature', label: 'Ngữ Văn ✍️' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFlashcardSubject(opt.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-orbitron uppercase cursor-pointer transition-all ${
                      flashcardSubject === opt.id
                        ? 'bg-synth-cyan text-black'
                        : 'text-synth-text-muted hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {activeFlashcards.length > 0 ? (
                <>
                  {/* Card deck container */}
                  <div 
                    onClick={() => setFcFlipped(!fcFlipped)}
                    className="w-full max-w-lg aspect-[5/3] cursor-pointer group [perspective:1000px]"
                  >
                    <div className={`relative w-full h-full duration-500 transform-style-3d ${
                      fcFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}>
                      {/* Front Side */}
                      <div className={`absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                        isUnicorn 
                          ? 'bg-gradient-to-br from-white to-violet-50/50 border-violet-200/50 text-violet-900' 
                          : 'bg-gradient-to-br from-synth-gray/40 to-synth-bg border-synth-cyan/30 text-white'
                      }`}>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${
                            isUnicorn ? 'bg-violet-100 text-violet-700' : 'bg-synth-cyan/15 text-synth-cyan'
                          }`}>
                            Hệ Thống Thẻ Nhớ
                          </span>
                          <span className="text-[10px] font-bold font-orbitron text-slate-400">
                            Thẻ {fcIndex + 1}/{activeFlashcards.length}
                          </span>
                        </div>

                        <div className="text-center py-4 overflow-y-auto max-h-[120px]">
                          <h3 className="font-orbitron font-semibold text-sm sm:text-base tracking-wide select-none leading-relaxed whitespace-pre-line">
                            {activeFlashcards[fcIndex].prompt}
                          </h3>
                        </div>

                        {activeFlashcards[fcIndex].options && (
                          <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-300 font-medium">
                            {activeFlashcards[fcIndex].options?.slice(0, 4).map((opt, i) => (
                              <div key={i} className="bg-white/5 border border-white/5 rounded px-2 py-1 truncate">
                                {String.fromCharCode(65 + i)}. {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-center text-[9px] text-synth-text-muted uppercase tracking-wider font-semibold animate-pulse border-t border-white/5 pt-2">
                          👆 Nhấp vào thẻ để lật xem đáp án mẫu
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-3xl p-6 flex flex-col justify-between border shadow-xl ${
                        isUnicorn 
                          ? 'bg-gradient-to-br from-fuchsia-50/90 to-white border-violet-200/50 text-violet-950' 
                          : 'bg-gradient-to-br from-synth-gray/50 to-synth-bg border-synth-magenta/30 text-white'
                      }`}>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded font-orbitron ${
                            isUnicorn ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-synth-magenta/15 text-synth-magenta'
                          }`}>
                            Đáp Án & Giải Thích
                          </span>
                          <span className="text-[10px] font-bold font-orbitron text-slate-400">
                            Thẻ {fcIndex + 1}/{activeFlashcards.length}
                          </span>
                        </div>

                        <div className="text-center py-4 overflow-y-auto max-h-[140px] px-2 space-y-2">
                          <p className="text-xs sm:text-sm font-bold text-synth-green">
                            Đáp án: {Array.isArray(activeFlashcards[fcIndex].correctAnswer) ? activeFlashcards[fcIndex].correctAnswer.join(', ') : activeFlashcards[fcIndex].correctAnswer}
                          </p>
                          <p className="text-[11px] leading-relaxed text-slate-300 italic whitespace-pre-line">
                            {activeFlashcards[fcIndex].explanation || 'Chưa cập nhật lý thuyết giải chi tiết.'}
                          </p>
                        </div>

                        <div className="text-center text-[9px] text-synth-text-muted uppercase tracking-wider font-semibold border-t border-white/5 pt-2">
                          Bấm lật lại mặt trước
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flashcard Action Buttons */}
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={handleFcPrev}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${
                        isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'
                      }`}
                    >
                      Thẻ Trước
                    </button>

                    <button
                      onClick={handleFcRemembered}
                      className={`px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider cursor-pointer hover:synth-glow-green hover:scale-[1.03] transition-all flex items-center gap-1.5 ${
                        isUnicorn 
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-synth-green text-black shadow-[0_0_12px_rgba(57,255,20,0.25)]'
                      }`}
                    >
                      <Award className="w-4 h-4 text-black" /> Thuộc rồi (+5 NP)
                    </button>

                    <button
                      onClick={handleFcNext}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer hover:scale-105 transition-all ${
                        isUnicorn ? 'bg-white border-violet-200 text-violet-700' : 'bg-synth-gray/30 border-white/5 text-white'
                      }`}
                    >
                      Bỏ qua / Tiếp
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-10 font-orbitron text-synth-text-muted border border-dashed border-white/10 rounded-2xl w-full max-w-lg">
                  Không tìm thấy câu hỏi tương thích trong kho học liệu.
                </div>
              )}
            </div>

            {/* Right Guide & Stats */}
            <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'
            }`}>
              <div className="space-y-4">
                <h3 className={`font-orbitron font-black text-sm uppercase tracking-wide flex items-center gap-1.5 ${
                  isUnicorn ? 'text-violet-800' : 'text-synth-cyan'
                }`}>
                  <Brain className="w-4 h-4" /> Thống Kê Thẻ
                </h3>

                <div className="space-y-3">
                  <div className={`p-3 rounded-xl border flex justify-between items-center ${
                    isUnicorn ? 'bg-violet-50/50 border-violet-100 text-violet-950' : 'bg-white/5 border-white/5 text-white'
                  }`}>
                    <span className="text-[11px] font-semibold text-slate-400">Thẻ đang nạp:</span>
                    <span className="text-xs font-bold font-orbitron">{activeFlashcards.length}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex justify-between items-center ${
                    isUnicorn ? 'bg-violet-50/50 border-violet-100 text-violet-950' : 'bg-white/5 border-white/5 text-white'
                  }`}>
                    <span className="text-[11px] font-semibold text-slate-400">Đã nhớ hôm nay:</span>
                    <span className="text-xs font-bold font-orbitron text-synth-green">+{fcRememberedCount} thẻ</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className={`text-xs font-bold ${isUnicorn ? 'text-violet-900' : 'text-white'}`}>Hướng dẫn:</h4>
                  <ul className="list-disc list-inside text-[10px] text-slate-400 space-y-1">
                    <li>Đọc kỹ câu hỏi, tự suy nghĩ đáp án.</li>
                    <li>Lật mặt sau để tự đối chứng câu trả lời.</li>
                    <li>Nhấn nút "Thuộc rồi" nếu nhớ đúng để nhận xu và thăng hạng!</li>
                  </ul>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-center text-[9px] text-slate-400 border border-dashed ${
                isUnicorn ? 'border-violet-200 text-violet-700/80' : 'border-synth-cyan/35 text-synth-cyan/85'
              } mt-4`}>
                💡 Active Recall (Gợi nhớ chủ động) tăng hiệu suất lưu giữ tri thức lên tới 150% so với đọc thụ động!
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GHÉP CẶP (MATCH PAIRS) */}
        {activeTab === 'match' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-magenta/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🔗 Ghép Cặp Bài Trùng</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nối từ vựng với nghĩa, công thức với tên gọi để rèn luyện phản xạ siêu tốc.
              </p>

              {/* Subject selectors */}
              <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5 mt-2">
                {[
                  { id: 'english', label: 'Từ vựng 🇬🇧' },
                  { id: 'math', label: 'Hình & Số 📐' },
                  { id: 'literature', label: 'Văn học ✍️' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setMatchSubject(opt.id as any)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold font-orbitron uppercase cursor-pointer ${
                      matchSubject === opt.id ? 'bg-synth-magenta text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {matchStatus === 'playing' ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto py-4">
                {matchCards.map(card => {
                  const isSelected = selectedCards.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center text-center h-24 select-none ${
                        card.isMatched
                          ? 'opacity-0 scale-95 pointer-events-none'
                          : isSelected
                            ? isUnicorn
                              ? 'border-violet-600 bg-violet-100 text-violet-900 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                              : 'border-synth-magenta bg-synth-magenta/15 text-synth-magenta shadow-[0_0_10px_rgba(255,0,127,0.3)] font-bold'
                            : isUnicorn
                              ? 'border-violet-200 bg-white hover:border-violet-400 text-violet-900'
                              : 'border-white/10 bg-synth-gray/30 hover:border-white/20 text-white'
                      }`}
                    >
                      {card.text}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 space-y-4 max-w-md mx-auto">
                <div className="text-4xl">🎉🏆🥇</div>
                <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Hoàn Thành Tuyệt Đối</h4>
                <p className="text-xs text-slate-300">
                  Con đã ghép thành công tất cả các cặp liên kết! Thưởng vượt ải thành công: **+30 NP coins, +40 XP**
                </p>
                <button
                  onClick={initMatchGame}
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-magenta text-white cursor-pointer hover:synth-glow-magenta hover:scale-105 transition-all"
                >
                  Chơi Lại Bảng Mới 🔁
                </button>
              </div>
            )}

            {matchStatus === 'playing' && (
              <div className="flex justify-center items-center gap-6 text-xs font-bold pt-2 border-t border-white/5">
                <div className={isUnicorn ? 'text-violet-900' : 'text-white'}>
                  Ghép đúng: <span className="font-orbitron font-bold text-synth-green">{matchCards.filter(c => c.isMatched).length / 2} / 5 cặp</span>
                </div>
                <button 
                  onClick={initMatchGame}
                  className="text-[10px] text-synth-cyan hover:underline font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Trộn lại bảng vẽ
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SƠ ĐỒ TƯ DUY (MINDMAP) */}
        {activeTab === 'mindmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Subject Selector & Mindmap Tree */}
            <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-cyan">
                  🗺️ Sơ Đồ Tư Duy Tri Thức
                </h3>
                <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5">
                  {[
                    { id: 'math', label: 'Toán Học' },
                    { id: 'english', label: 'Tiếng Anh' },
                    { id: 'literature', label: 'Ngữ Văn' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedMapSubject(opt.id as any);
                        setActiveNodeDetails(null);
                      }}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold font-orbitron uppercase cursor-pointer ${
                        selectedMapSubject === opt.id ? 'bg-synth-cyan text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mindmap Interactive Visualization */}
              <div className="bg-black/30 rounded-2xl p-4 min-h-[300px] relative overflow-hidden flex flex-col justify-center gap-3">
                <div className="absolute inset-0 synth-grid-bg opacity-10" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  {/* Root Node */}
                  <div className="px-4 py-2 rounded-xl bg-synth-cyan/15 border border-synth-cyan text-synth-cyan font-bold font-orbitron text-xs shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                    {MINDMAP_DATA[selectedMapSubject].label}
                  </div>

                  {/* Horizontal Connector Line decoration */}
                  <div className="w-0.5 h-4 bg-white/20" />

                  {/* Branches */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    {MINDMAP_DATA[selectedMapSubject].children?.map((branch) => (
                      <div key={branch.id} className="flex flex-col items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl min-w-[130px] flex-1">
                        <span className="text-[10px] font-bold text-white border-b border-white/10 pb-1 w-full text-center">
                          {branch.label}
                        </span>
                        
                        <div className="flex flex-col gap-1.5 w-full">
                          {branch.children?.map(leaf => (
                            <button
                              key={leaf.id}
                              onClick={() => setActiveNodeDetails(leaf)}
                              className={`p-2 rounded text-[9px] text-left cursor-pointer transition-all border ${
                                activeNodeDetails?.id === leaf.id
                                  ? 'bg-synth-magenta/20 border-synth-magenta text-synth-magenta font-semibold shadow-[0_0_10px_rgba(255,0,127,0.15)]'
                                  : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              👉 {leaf.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Node Cheat-Sheet detail view */}
            <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'
            }`}>
              {activeNodeDetails ? (
                <div className="space-y-4">
                  <span className="text-[9px] font-bold tracking-wider text-synth-magenta font-orbitron uppercase border border-synth-magenta/30 px-2 py-0.5 rounded bg-synth-magenta/5">
                    Lý Thuyết Rút Gọn
                  </span>
                  
                  <h4 className="font-orbitron font-bold text-sm text-white">
                    {activeNodeDetails.label}
                  </h4>

                  <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                    <p className="bg-white/5 p-3 rounded-xl border border-white/5">
                      {activeNodeDetails.details}
                    </p>
                  </div>

                  {activeNodeDetails.formula && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400 font-orbitron uppercase">Cấu trúc / Công thức:</span>
                      <pre className="bg-[#050608] border border-synth-cyan/35 p-3 rounded-xl text-synth-cyan font-bold font-mono text-[10px] overflow-x-auto whitespace-pre-line">
                        {activeNodeDetails.formula}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3 h-full">
                  <HelpCircle className="w-12 h-12 text-slate-500 animate-bounce" />
                  <p className="text-[11px]">
                    Hãy nhấp chọn một chủ đề nhánh ở sơ đồ bên trái để xem nhanh lý thuyết ôn tập gọn gàng!
                  </p>
                </div>
              )}

              <div className="p-3 bg-synth-cyan/5 border border-synth-cyan/15 rounded-xl text-[9px] text-synth-cyan/90 leading-normal mt-4">
                💡 Sử dụng sơ đồ tư duy giúp liên kết não bộ cực nhanh khi ôn tập trước các kỳ kiểm tra chính khóa!
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: KỊCH BẢN TÌNH HUỐNG (STORY RPG) */}
        {activeTab === 'story' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/30'
          }`}>
            {storyStep === 0 && (
              <div className="max-w-md mx-auto space-y-5 py-6">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl bg-synth-purple/15 border border-synth-purple/35">
                  🎭
                </div>
                <h3 className="font-orbitron font-black text-lg text-white uppercase">Giải Cứu Rồng Con</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chú Pet **Rồng Con** thân yêu của con đang bị giam cầm tại ngôi đền cổ xưa. Hãy dùng tri thức Toán học, Tiếng Anh và Ngữ văn để vượt qua 3 thử thách bảo vệ thần đền và đưa Pet trở về!
                </p>
                <button
                  onClick={handleStartStory}
                  className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold hover:synth-border-purple hover:scale-105 transition-all shadow-[0_0_15px_rgba(188,19,254,0.3)] cursor-pointer"
                >
                  Bắt Đầu Hành Trình 🧭
                </button>
              </div>
            )}

            {(storyStep >= 1 && storyStep <= 3) && (
              <div className="max-w-2xl mx-auto text-left space-y-5">
                {/* Story HUD */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-300 font-orbitron font-bold">Lượt Mạng:</span>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span key={i} className={`text-xs ${i < storyLives ? 'text-red-500' : 'text-slate-600'}`}>
                        ❤️
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Túi đồ:</span>
                    {storyInventory.length > 0 ? (
                      storyInventory.map((item, idx) => (
                        <span key={idx} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-medium text-synth-orange">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] text-slate-600 italic">Trống</span>
                    )}
                  </div>

                  <span className="text-xs font-orbitron font-bold text-synth-purple uppercase">
                    Thử Thách {storyStep}/3
                  </span>
                </div>

                {/* Scenario description text */}
                <div className="bg-synth-purple/5 border border-synth-purple/20 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-synth-purple uppercase font-orbitron flex items-center gap-1">
                    📖 Kịch Bản Tình Huống:
                  </h4>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {storyStep === 1 && '"Con tiếp cận Cổng Thần Thạch. Thần Đá rầm rập bước ra và cất giọng ồm ồm: Muốn đi tiếp thì phải mở khóa mật mã toán học này..."'}
                    {storyStep === 2 && '"Đi qua cổng, con đi sâu vào rừng sương mù và gặp một Hiệp sĩ người Anh Quốc. Ông ấy cần con giải đáp câu hỏi ngữ pháp tiếng Anh này để nhận la bàn..."'}
                    {storyStep === 3 && '"Ngay trước ngục đá, Thần Rùa gác cửa yêu cầu con xác định chính xác kiến thức Ngữ Văn lớp 9 này để hoàn trả Pet..."'}
                  </p>
                </div>

                {/* Active Question Challenge block */}
                {activeStoryQuest ? (
                  <div className="space-y-4 bg-synth-gray/10 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase flex justify-between">
                      <span>Đề Bài Thách Thức:</span>
                      <span className="text-synth-cyan">Cấp độ {activeStoryQuest.difficulty}/10</span>
                    </div>

                    <p className="text-xs font-semibold text-white whitespace-pre-line leading-relaxed">
                      {activeStoryQuest.prompt}
                    </p>

                    {activeStoryQuest.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {activeStoryQuest.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleStoryAnswer(opt)}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-synth-purple text-left cursor-pointer transition-all text-slate-300 hover:text-white"
                          >
                            <span className="font-orbitron font-bold text-synth-purple mr-2">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-400 font-orbitron">
                    Đang nạp câu hỏi ải...
                  </div>
                )}
              </div>
            )}

            {/* Win state */}
            {storyStep === 4 && (
              <div className="max-w-md mx-auto space-y-4 py-8">
                <div className="text-5xl animate-bounce">🏆🦅🐉</div>
                <h3 className="font-orbitron font-black text-xl text-synth-green uppercase">Giải Cứu Hoàn Tất</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Con đã giải quyết toàn bộ tình huống thành công! Rồng Con vẫy đuôi sung sướng và bay trở lại vòng tay con!
                  Phần thưởng vượt ải thành công: **+60 NP coins, +50 XP**
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={onBack}
                    className="px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10"
                  >
                    Bản Đồ Chính
                  </button>
                  <button
                    onClick={handleStartStory}
                    className="px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold cursor-pointer hover:synth-border-purple shadow-[0_0_12px_rgba(188,19,254,0.2)]"
                  >
                    Chơi Lại Phiêu Lưu 🔁
                  </button>
                </div>
              </div>
            )}

            {/* Game Over state */}
            {storyStep === 5 && (
              <div className="max-w-md mx-auto space-y-4 py-8">
                <div className="text-5xl">💀🥀</div>
                <h3 className="font-orbitron font-black text-xl text-red-500 uppercase">Thất Bại Tiếc Nuối</h3>
                <p className="text-xs text-slate-300">
                  Lượt mạng của con đã cạn kiệt trước khi giải cứu được Rồng Con! Hãy ôn lại bài thật kỹ và thử sức lại nhé.
                </p>
                <button
                  onClick={handleStartStory}
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold cursor-pointer hover:scale-105 transition-all"
                >
                  Thử Sức Lại 🔁
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DU KHẢO KỲ THÚ (TRIVIA BOARD GAME) */}
        {activeTab === 'adventure' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-orange/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🧭 Du Khảo Kỳ Thú</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tung xúc xắc 🎲 để tiến bước trên bản đồ hành trình du khảo. Trả lời đúng trivia ở mỗi ô để về đích lấy rương kho báu!
              </p>
            </div>

            {/* Virtual Board Map representation (10 tiles) */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-w-3xl mx-auto py-3 bg-black/40 p-4 rounded-2xl border border-white/5 relative">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isCurrent = boardPosition === idx;
                const isGoal = idx === 9;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border text-[10px] font-orbitron font-bold flex flex-col items-center justify-between h-14 relative transition-all duration-300 ${
                      isCurrent
                        ? 'border-synth-orange bg-synth-orange/20 text-synth-orange scale-105 shadow-[0_0_12px_rgba(255,159,28,0.3)]'
                        : isGoal
                          ? 'border-synth-green bg-synth-green/5 text-synth-green'
                          : 'border-white/5 bg-synth-gray/10 text-slate-400'
                    }`}
                  >
                    <span>Ô {idx}</span>
                    {isCurrent && (
                      <span className="text-[9px] px-1 bg-synth-orange text-black rounded font-sans scale-90 animate-bounce">
                        Bé ở đây
                      </span>
                    )}
                    {isGoal && !isCurrent && (
                      <span className="text-[12px] animate-pulse">👑</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active challenge window when landing on a tile */}
            {boardStatus === 'answering' && activeBoardQuestion && (
              <div className="max-w-xl mx-auto text-left bg-synth-gray/20 border border-synth-orange/30 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between text-[9px] font-bold font-orbitron text-synth-orange uppercase">
                  <span>⚠️ Ô Thử Thách Trivia:</span>
                  <span>Môn: {activeBoardQuestion.subject === 'math' ? 'Toán Học' : activeBoardQuestion.subject === 'literature' ? 'Ngữ Văn' : 'Tiếng Anh'}</span>
                </div>

                <p className="text-xs font-semibold text-white leading-relaxed whitespace-pre-line">
                  {activeBoardQuestion.prompt}
                </p>

                {activeBoardQuestion.options && (
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {activeBoardQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleBoardAnswer(opt)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left cursor-pointer transition-all text-slate-300 hover:text-white"
                      >
                        <span className="font-orbitron font-bold text-synth-orange mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Dice Rolling HUD */}
            {boardStatus === 'idle' && (
              <div className="flex flex-col items-center gap-3 py-4">
                {rolledNumber > 0 && (
                  <div className="text-xs font-bold text-synth-cyan font-orbitron">
                    🎲 Kết quả tung xúc xắc: <span className="text-lg text-synth-orange">{rolledNumber} bước</span>
                  </div>
                )}

                <button
                  onClick={handleRollDice}
                  disabled={diceRolling}
                  className="px-6 py-3 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-orange text-black cursor-pointer hover:synth-glow-orange hover:scale-105 transition-all disabled:opacity-40"
                >
                  {diceRolling ? 'Đang xoay xúc xắc... 🎲' : 'Tung Xúc Xắc 🎲'}
                </button>
              </div>
            )}

            {/* Victory overlay */}
            {boardStatus === 'won' && (
              <div className="py-6 space-y-3 max-w-md mx-auto">
                <div className="text-5xl animate-bounce">🎁👑✨</div>
                <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Đã Chạm Rương Báu</h4>
                <p className="text-xs text-slate-300">
                  Hoàn thành chuyến du khảo! Nhận rương báu phần thưởng tối cao: **+100 NP coins, +80 XP**
                </p>
                <button
                  onClick={restartBoardGame}
                  className="px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-green text-black cursor-pointer hover:scale-105 transition-all font-semibold"
                >
                  Du Khảo Lần Nữa 🧭
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
