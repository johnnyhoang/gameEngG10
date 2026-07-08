import React, { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { 
  ArrowLeft, Sparkles, Brain, Award, RefreshCw, HelpCircle, Send, Check, X
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

interface StepItem {
  id: string;
  text: string;
  correctOrder: number;
}

interface DiagramSlot {
  id: string;
  label: string;
  expectedLabel: string;
  currentLabel: string;
}

export const RelaxationZone: React.FC<RelaxationZoneProps> = ({ onBack }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const questions = useGameState(state => state.questions);
  const awardCoinsAndXp = useGameState(state => state.awardCoinsAndXp);
  
  const isUnicorn = uiTheme === 'unicorn-dream';
  
  const [activeTab, setActiveTab] = useState<'flashcards' | 'match' | 'mindmap' | 'story' | 'adventure' | 'stepbuilder' | 'reading' | 'explain' | 'dragdiagram'>('flashcards');

  // ----------------------------------------------------
  // Tab 1: Xưởng Thẻ Nhớ (Dynamic SRS Flashcards)
  // ----------------------------------------------------
  const [flashcardSubject, setFlashcardSubject] = useState<'all' | 'english' | 'math' | 'literature'>('all');
  const [activeFlashcards, setActiveFlashcards] = useState<Question[]>([]);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcRememberedCount, setFcRememberedCount] = useState(0);

  useEffect(() => {
    let filtered = questions;
    if (flashcardSubject !== 'all') {
      filtered = questions.filter(q => q.subject === flashcardSubject);
    }
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
    awardCoinsAndXp(5, 10, 'Thuộc thẻ nhớ', `Ghi nhớ câu hỏi: ${activeFlashcards[fcIndex].prompt.slice(0, 20)}...`);
    toast.success('Ghi nhận rồi. +5 NP, +10 XP 🎉');
    handleFcNext();
  };


  // ----------------------------------------------------
  // Tab 2: Trò Chơi Ghép Cặp (Dynamic Match Pairs)
  // ----------------------------------------------------
  const [matchSubject, setMatchSubject] = useState<'english' | 'math' | 'literature'>('english');
  const [matchCards, setMatchCards] = useState<MatchItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchStatus, setMatchStatus] = useState<'playing' | 'victory'>('playing');

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

    const pairs = [...source].sort(() => 0.5 - Math.random()).slice(0, 5);
    const cards: MatchItem[] = [];
    pairs.forEach((p, idx) => {
      const pairId = `pair-${idx}`;
      cards.push({ id: `a-${idx}`, text: p.word, pairId, isMatched: false });
      cards.push({ id: `b-${idx}`, text: p.mean, pairId, isMatched: false });
    });

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
        setTimeout(() => {
          setMatchCards(prev => prev.map(c => 
            c.pairId === card1.pairId ? { ...c, isMatched: true } : c
          ));
          setSelectedCards([]);
          toast.success('Ghép khớp. 🎉');

          setMatchCards(current => {
            const allMatched = current.every(c => c.isMatched || c.pairId === card1.pairId);
            if (allMatched) {
              setMatchStatus('victory');
              awardCoinsAndXp(30, 40, 'Ghép cặp thành công', `Hoàn thành bảng ghép cặp chủ đề ${matchSubject}`);
            }
            return current;
          });
        }, 300);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
          toast.error('Lệch cặp rồi, ghép lại đi!');
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
  const [storyStep, setStoryStep] = useState<number>(0); 
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
      toast.success('Chuẩn, bạn qua ải này rồi.');
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
        setStoryStep(4); 
        awardCoinsAndXp(60, 50, 'Phiêu lưu tình huống', 'Giải thoát Rồng nhỏ thành công');
      }
    } else {
      toast.error('Lệch rồi, chỉnh lại đi.');
      const nextLives = storyLives - 1;
      setStoryLives(nextLives);
      if (nextLives <= 0) {
        setStoryStep(5); 
      } else {
        initStoryQuest(activeStoryQuest.subject as any);
      }
    }
  };


  // ----------------------------------------------------
  // Tab 5: Hành Trình Du Khảo (Trivia Board Game)
  // ----------------------------------------------------
  const [boardPosition, setBoardPosition] = useState<number>(0); 
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
      setRolledNumber(Math.floor(Math.random() * 3) + 1); 
      rolls++;
      if (rolls > 8) {
        clearInterval(interval);
        setDiceRolling(false);
        const rolled = Math.floor(Math.random() * 3) + 1;
        setRolledNumber(rolled);
        
        const nextPos = Math.min(9, boardPosition + rolled);
        setBoardPosition(nextPos);

        if (nextPos >= 9) {
          setBoardStatus('won');
          awardCoinsAndXp(100, 80, 'Về đích Du khảo', 'Đạt vạch đích rương báu sơn trang');
          toast.success('Bạn đã clear xong bản đồ du khảo! 🏆');
        } else {
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
      toast.success('Chuẩn xác, ô này an toàn. (+15 NP)');
      awardCoinsAndXp(15, 10, 'Đúng ô du khảo', 'Trả lời chính xác ô trivia trên bản đồ du khảo');
      setBoardStatus('idle');
    } else {
      toast.error('Lạc nhịp rồi, lùi 1 ô.');
      setBoardPosition(prev => Math.max(0, prev - 1));
      setBoardStatus('idle');
    }
  };

  const restartBoardGame = () => {
    setBoardPosition(0);
    setBoardStatus('idle');
    setRolledNumber(0);
  };


  // ----------------------------------------------------
  // Tab 6: Sắp Xếp Trình Tự (Step Builder)
  // ----------------------------------------------------
  const [stepSubject, setStepSubject] = useState<'math' | 'english' | 'literature'>('math');
  const [scrambledSteps, setScrambledSteps] = useState<StepItem[]>([]);
  const [stepStatus, setStepStatus] = useState<'playing' | 'won'>('playing');

  const STEP_DATA = {
    math: [
      { id: 's-m1', text: '1. Xác định hệ số a, b, c của phương trình ax² + bx + c = 0', correctOrder: 0 },
      { id: 's-m2', text: '2. Tính biệt thức Delta = b² - 4ac', correctOrder: 1 },
      { id: 's-m3', text: '3. So sánh Delta với số 0 (lớn hơn, bằng hoặc nhỏ hơn 0)', correctOrder: 2 },
      { id: 's-m4', text: '4. Kết luận số nghiệm và áp dụng công thức tìm x₁, x₂', correctOrder: 3 }
    ],
    english: [
      { id: 's-e1', text: '1. Xác định tân ngữ của câu chủ động đưa lên làm chủ ngữ mới', correctOrder: 0 },
      { id: 's-e2', text: '2. Chia động từ BE theo đúng thì của câu chủ động gốc', correctOrder: 1 },
      { id: 's-e3', text: '3. Đưa động từ chính về dạng Quá khứ phân từ V3/ed', correctOrder: 2 },
      { id: 's-e4', text: '4. Thêm cụm "by + tác nhân hành động" ở cuối câu', correctOrder: 3 }
    ],
    literature: [
      { id: 's-l1', text: '1. Tìm hiểu hoàn cảnh sáng tác, tác giả và đề tài chính của tác phẩm', correctOrder: 0 },
      { id: 's-l2', text: '2. Đọc văn bản, phân tích kết cấu và xác định bố cục liên kết', correctOrder: 1 },
      { id: 's-l3', text: '3. Khai thác sâu các biện pháp tu từ, hình ảnh thơ/chi tiết truyện đặc sắc', correctOrder: 2 },
      { id: 's-l4', text: '4. Khái quát giá trị nhân văn nghệ thuật và bài học tư tưởng rút ra', correctOrder: 3 }
    ]
  };

  const initStepGame = () => {
    const list = [...STEP_DATA[stepSubject]];
    // Shuffle the steps
    const shuffled = list.sort(() => 0.5 - Math.random());
    setScrambledSteps(shuffled);
    setStepStatus('playing');
  };

  useEffect(() => {
    initStepGame();
  }, [stepSubject]);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (stepStatus !== 'playing') return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= scrambledSteps.length) return;

    const list = [...scrambledSteps];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setScrambledSteps(list);
  };

  const checkStepOrder = () => {
    const isCorrect = scrambledSteps.every((step, idx) => step.correctOrder === idx);
    if (isCorrect) {
      setStepStatus('won');
      awardCoinsAndXp(30, 25, 'Hoàn thành Sắp xếp', `Sắp xếp trình tự giải chủ đề ${stepSubject}`);
      toast.success('Chuẩn xác, xếp trình tự ngon rồi! 🎉');
    } else {
      toast.error('Trình tự chưa đúng rồi, hãy suy nghĩ lại nhé!');
    }
  };


  // ----------------------------------------------------
  // Tab 7: Thử Thách Đọc Hiểu (Reading Challenge)
  // ----------------------------------------------------
  const [readingSubject, setReadingSubject] = useState<'english' | 'math' | 'literature'>('english');
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [selectedReadingOption, setSelectedReadingOption] = useState<string>('');
  const [readingChecked, setReadingChecked] = useState<boolean>(false);
  const [readingResult, setReadingResult] = useState<'success' | 'fail' | null>(null);

  const READING_DATA = {
    english: {
      passage: 'Sử dụng năng lượng sạch là giải pháp cấp bách. Solar energy represents a clean, renewable, and infinitely abundant source of power. Harnessing this energy helps decrease emissions dramatically.',
      words: ['Solar', 'energy', 'represents', 'a', 'clean,', 'renewable,', 'and', 'infinitely', 'abundant', 'source', 'of', 'power.'],
      targetWords: ['Solar', 'energy', 'clean,', 'renewable,'],
      question: 'Ý chính của đoạn văn trên thảo luận về điều gì?',
      options: ['A. Sự hạn chế của điện than truyền thống', 'B. Lợi ích vượt trội của nguồn năng lượng mặt trời', 'C. Cơ chế chuyển đổi nhiệt lượng Trái đất'],
      correctOption: 'B. Lợi ích vượt trội của nguồn năng lượng mặt trời'
    },
    math: {
      passage: 'Một tam giác vuông luôn có tổng hai góc nhọn phụ nhau. Theo định lý Pythagoras, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.',
      words: ['Theo', 'định', 'lý', 'Pythagoras,', 'bình', 'phương', 'cạnh', 'huyền', 'bằng', 'tổng', 'bình', 'phương', 'hai', 'cạnh', 'góc', 'vuông.'],
      targetWords: ['Pythagoras,', 'cạnh', 'huyền'],
      question: 'Phát biểu Pythagoras áp dụng cho loại tam giác nào?',
      options: ['A. Tam giác đều', 'B. Tam giác cân', 'C. Tam giác vuông'],
      correctOption: 'C. Tam giác vuông'
    },
    literature: {
      passage: 'Xuân Quỳnh đã tạo ra một ẩn dụ độc đáo. Trong bài thơ Sóng, hình tượng sóng là biểu tượng sinh động của tâm trạng người phụ nữ đang yêu.',
      words: ['hình', 'tượng', 'sóng', 'là', 'biểu', 'tượng', 'sinh', 'động', 'của', 'tâm', 'trạng', 'người', 'phụ', 'nữ', 'đang', 'yêu.'],
      targetWords: ['sóng', 'tâm', 'trạng', 'người', 'phụ', 'nữ'],
      question: 'Hình tượng sóng trong bài thơ trữ tình của Xuân Quỳnh ẩn dụ cho điều gì?',
      options: ['A. Sự dữ dội của bão tố thiên tai', 'B. Vẻ đẹp kỳ vĩ của đại dương xanh', 'C. Tâm trạng thiết tha thủy chung của người con gái đang yêu'],
      correctOption: 'C. Tâm trạng thiết tha thủy chung của người con gái đang yêu'
    }
  };

  const initReadingGame = () => {
    setHighlightedIndices([]);
    setSelectedReadingOption('');
    setReadingChecked(false);
    setReadingResult(null);
  };

  useEffect(() => {
    initReadingGame();
  }, [readingSubject]);

  const toggleWordHighlight = (index: number) => {
    if (readingChecked) return;
    setHighlightedIndices(prev => 
      prev.includes(index) ? prev.filter(x => x !== index) : [...prev, index]
    );
  };

  const checkReadingChallenge = () => {
    const data = READING_DATA[readingSubject];
    const selectedAns = selectedReadingOption.trim();
    if (!selectedAns) {
      toast.error('Vui lòng chọn một đáp án trắc nghiệm!');
      return;
    }

    // Check highlighted words match at least 50% of targets
    const highlightedWords = highlightedIndices.map(idx => data.words[idx].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const matchCount = highlightedWords.filter(w => 
      data.targetWords.some(tw => tw.toLowerCase().includes(w.toLowerCase()))
    ).length;

    const isOptionCorrect = selectedAns === data.correctOption;
    const isHighlightAcceptable = matchCount >= 1;

    setReadingChecked(true);
    if (isOptionCorrect && isHighlightAcceptable) {
      setReadingResult('success');
      awardCoinsAndXp(35, 30, 'Đọc hiểu sâu', `Hoàn thành thử thách đọc hiểu môn ${readingSubject}`);
      toast.success('Chuẩn, bạn bắt đúng từ khóa và chốt đúng ý cốt lõi! 🎉');
    } else {
      setReadingResult('fail');
      toast.error('Đáp án hoặc từ khóa tô sáng chưa chính xác rồi.');
    }
  };


  // ----------------------------------------------------
  // Tab 8: Giảng Giải Cho AI (Explain / Teach to AI)
  // ----------------------------------------------------
  const [explainTopic, setExplainTopic] = useState<'pythagoras' | 'present_perfect' | 'song_poem'>('pythagoras');
  const [studentText, setStudentText] = useState<string>('');
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [aiCounterQuestion, setAiCounterQuestion] = useState<{ q: string; opts: string[]; ans: string } | null>(null);
  const [counterAnswer, setCounterAnswer] = useState<string>('');
  const [explainPhase, setExplainPhase] = useState<'input' | 'feedback' | 'won'>('input');

  const EXPLAIN_TOPICS = {
    pythagoras: {
      title: 'Định lý Pythagoras (Toán 9)',
      keywords: ['vuông', 'cạnh huyền', 'bình phương', 'cộng', 'tổng'],
      missingAlert: 'đặc điểm tam giác vuông hoặc mối quan hệ bình phương cạnh huyền',
      successFeedback: 'Chào bạn! Mình đã ngấm bài. Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: a² + b² = c².',
      counterQ: 'Vậy nếu một tam giác có độ dài ba cạnh lần lượt là 3cm, 4cm, 5cm thì đó có phải là tam giác vuông không ạ?',
      opts: ['A. Đúng, vì 3² + 4² = 5² (9 + 16 = 25)', 'B. Sai, vì tam giác vuông phải có cạnh huyền lớn gấp đôi cạnh góc vuông'],
      correctOpt: 'A. Đúng, vì 3² + 4² = 5² (9 + 16 = 25)'
    },
    present_perfect: {
      title: 'Thì Hiện tại hoàn thành (Tiếng Anh)',
      keywords: ['have', 'has', 'past participle', 'v3', 'hoàn thành', 'trước đây'],
      missingAlert: 'công thức dùng Have/Has đi kèm động từ phân từ hai (V3/ed)',
      successFeedback: 'Hi teacher! Mình là học sinh AI. Nhờ bạn giảng mà mình đã nắm: hiện tại hoàn thành dùng cấu trúc "Subject + have/has + V3/ed" để kể trải nghiệm chưa cần mốc thời gian rõ ràng.',
      counterQ: 'Cô ơi, vậy câu nào dưới đây chia đúng thì Hiện tại hoàn thành ạ?',
      opts: ['A. She has gone to Paris three times.', 'B. She went to Paris yesterday.', 'C. She goes to Paris every year.'],
      correctOpt: 'A. She has gone to Paris three times.'
    },
    song_poem: {
      title: 'Ý nghĩa hình tượng "Sóng" của Xuân Quỳnh (Văn)',
      keywords: ['tình yêu', 'phụ nữ', 'thủy chung', 'xuân quỳnh', 'biểu tượng', 'ẩn dụ'],
      missingAlert: 'khái niệm ẩn dụ biểu tượng cho tâm trạng thủy chung của người phụ nữ đang yêu',
      successFeedback: 'Chào bạn! Mình đã bắt được ý. Hình tượng "Sóng" vừa là hình ảnh tự nhiên, vừa là biểu tượng ẩn dụ cho tâm hồn rạo rực, khao khát tình yêu chân thành, chung thủy của người phụ nữ.',
      counterQ: 'Vậy trong bài thơ, hình tượng nào luôn song hành và hòa quyện cùng hình tượng "Sóng" ạ?',
      opts: ['A. Thuyền', 'B. Em', 'C. Biển'],
      correctOpt: 'B. Em'
    }
  };

  const handleTeachAI = () => {
    const data = EXPLAIN_TOPICS[explainTopic];
    const text = studentText.toLowerCase().trim();

    if (text.length < 20) {
      toast.error('Bài giảng ngắn quá. Bạn bung ý thêm chút đi.');
      return;
    }

    // Match keywords
    const matches = data.keywords.filter(kw => text.includes(kw));
    const isQualityLecture = matches.length >= 2;

    if (isQualityLecture) {
      setAiFeedback(data.successFeedback);
      setAiCounterQuestion({
        q: data.counterQ,
        opts: data.opts,
        ans: data.correctOpt
      });
      setExplainPhase('feedback');
    } else {
      setAiFeedback(`Mình vẫn chưa ngấm lắm. Bạn còn thiếu ý về [${data.missingAlert}]. Bạn giảng lại thêm một nhịp được không?`);
      setExplainPhase('feedback');
      setAiCounterQuestion(null);
    }
  };

  const handleCounterAnswerSubmit = () => {
    if (!aiCounterQuestion) return;
    if (counterAnswer === aiCounterQuestion.ans) {
      setExplainPhase('won');
      awardCoinsAndXp(40, 40, 'Giảng giải cho AI', `Giảng bài thành công chủ đề ${explainTopic}`);
      toast.success('Chuẩn xác. AI đã thông suốt bài này. (+40 NP, +40 XP)');
    } else {
      toast.error('Lệch rồi nhé. AI bắt ngược lại luôn, thử lại đi.');
    }
  };

  const restartExplainGame = () => {
    setStudentText('');
    setAiFeedback('');
    setAiCounterQuestion(null);
    setCounterAnswer('');
    setExplainPhase('input');
  };


  // ----------------------------------------------------
  // Tab 9: Ghép Sơ Đồ Kéo Thả (Drag & Drop Diagram)
  // ----------------------------------------------------
  const [diagramSubject, setDiagramSubject] = useState<'math' | 'english' | 'literature'>('math');
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [diagramSlots, setDiagramSlots] = useState<DiagramSlot[]>([]);
  const [diagramLabels, setDiagramLabels] = useState<string[]>([]);
  const [diagramStatus, setDiagramStatus] = useState<'playing' | 'won'>('playing');

  const DIAGRAM_DATA = {
    math: {
      slots: [
        { id: 'ds-m1', label: 'Cạnh đối diện góc vuông', expectedLabel: 'Cạnh huyền', currentLabel: '' },
        { id: 'ds-m2', label: 'Cạnh đứng kề góc vuông', expectedLabel: 'Cạnh góc vuông 1', currentLabel: '' },
        { id: 'ds-m3', label: 'Cạnh đáy kề góc vuông', expectedLabel: 'Cạnh góc vuông 2', currentLabel: '' }
      ],
      pool: ['Cạnh huyền', 'Cạnh góc vuông 1', 'Cạnh góc vuông 2', 'Đường trung trực']
    },
    english: {
      slots: [
        { id: 'ds-e1', label: 'Từ: "The students"', expectedLabel: 'Chủ ngữ (Subject)', currentLabel: '' },
        { id: 'ds-e2', label: 'Từ: "solved"', expectedLabel: 'Động từ (Verb)', currentLabel: '' },
        { id: 'ds-e3', label: 'Từ: "the equations"', expectedLabel: 'Tân ngữ (Object)', currentLabel: '' }
      ],
      pool: ['Chủ ngữ (Subject)', 'Động từ (Verb)', 'Tân ngữ (Object)', 'Trạng ngữ (Adverb)']
    },
    literature: {
      slots: [
        { id: 'ds-l1', label: 'Tác phẩm: "Lão Hạc"', expectedLabel: 'Truyện ngắn hiện thực', currentLabel: '' },
        { id: 'ds-l2', label: 'Tác phẩm: "Sóng"', expectedLabel: 'Thơ tình yêu trữ tình', currentLabel: '' },
        { id: 'ds-l3', label: 'Tác phẩm: "Vũ Như Tô"', expectedLabel: 'Kịch lịch sử', currentLabel: '' }
      ],
      pool: ['Truyện ngắn hiện thực', 'Thơ tình yêu trữ tình', 'Kịch lịch sử', 'Tùy bút']
    }
  };

  const initDiagramGame = () => {
    const data = DIAGRAM_DATA[diagramSubject];
    setDiagramSlots(data.slots.map(s => ({ ...s })));
    setDiagramLabels(data.pool);
    setSelectedLabel('');
    setDiagramStatus('playing');
  };

  useEffect(() => {
    initDiagramGame();
  }, [diagramSubject]);

  const handlePlaceLabel = (slotId: string) => {
    if (!selectedLabel || diagramStatus !== 'playing') return;

    setDiagramSlots(prev => prev.map(s => 
      s.id === slotId ? { ...s, currentLabel: selectedLabel } : s
    ));
    setSelectedLabel('');
  };

  const checkDiagram = () => {
    const allFilled = diagramSlots.every(s => s.currentLabel !== '');
    if (!allFilled) {
      toast.error('Điền hết nhãn vào các ô trống đi!');
      return;
    }

    const isCorrect = diagramSlots.every(s => s.currentLabel === s.expectedLabel);
    if (isCorrect) {
      setDiagramStatus('won');
      awardCoinsAndXp(30, 35, 'Ghép sơ đồ thành công', `Hoàn thành ghép sơ đồ môn ${diagramSubject}`);
      toast.success('Chuẩn xác, sơ đồ khớp rồi! 🎉');
    } else {
      toast.error('Có một số nhãn lắp sai vị trí rồi!');
    }
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
          { id: 'flashcards', label: '🎴 Xưởng Thẻ Nhớ', desc: 'Active Recall lật mặt' },
          { id: 'match', label: '🔗 Ghép Cặp', desc: 'Chọn ô liên kết kiến thức' },
          { id: 'mindmap', label: '🗺️ Sơ Đồ Ôn Tập', desc: 'Tóm tắt bài học' },
          { id: 'story', label: '🎭 Tình Huống RPG', desc: 'Phiêu lưu giải đố' },
          { id: 'adventure', label: '🧭 Du Khảo Kỳ Thú', desc: 'Tung xúc xắc trivia' },
          { id: 'stepbuilder', label: '🧩 Trình Tự Giải', desc: 'Sắp xếp bước giải toán' },
          { id: 'reading', label: '📖 Đọc Hiểu Sâu', desc: 'Tô sáng & tìm ý chính' },
          { id: 'explain', label: '✍️ Giảng Cho AI', desc: 'Thử làm giáo viên' },
          { id: 'dragdiagram', label: '🧱 Ghép Sơ Đồ', desc: 'Lắp ghép nhãn dán' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 rounded-xl font-orbitron text-[10px] font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer text-left flex flex-col ${
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
            <span className="text-[8px] font-semibold opacity-60 normal-case mt-0.5">{tab.desc}</span>
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
                            Đáp An & Giải Thích
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

            {/* Right stats info */}
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
                    <li>Tự nhớ đáp án trước khi nhấn vào thẻ để lật xem lời giải.</li>
                    <li>Sử dụng nút lọc để đổi chủ đề câu hỏi.</li>
                  </ul>
                </div>
              </div>

              <div className={`p-3 rounded-xl text-center text-[9px] text-slate-400 border border-dashed ${
                isUnicorn ? 'border-violet-200 text-violet-700/80' : 'border-synth-cyan/35 text-synth-cyan/85'
              } mt-4`}>
                💡 Kỹ thuật lặp lại ngắt quãng (SRS) giúp tiết kiệm 70% thời gian ôn luyện mà ghi nhớ lâu gấp 3 lần!
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
                <div className="text-4xl animate-bounce">🎉🏆🥇</div>
                <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Hoàn Thành Tuyệt Đối</h4>
                <p className="text-xs text-slate-300">
                  Ghép xong toàn bộ cặp liên kết. Thưởng qua ải: **+30 NP coins, +40 XP**
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

        {/* TAB 3: SƠ ĐỒ ÔN TẬP (MINDMAP) */}
        {activeTab === 'mindmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-cyan">
                  🗺️ Sơ Đồ Ôn Tập Tri Thức
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

              <div className="bg-black/30 rounded-2xl p-4 min-h-[300px] relative overflow-hidden flex flex-col justify-center gap-3">
                <div className="absolute inset-0 synth-grid-bg opacity-10" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="px-4 py-2 rounded-xl bg-synth-cyan/15 border border-synth-cyan text-synth-cyan font-bold font-orbitron text-xs shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                    {MINDMAP_DATA[selectedMapSubject].label}
                  </div>

                  <div className="w-0.5 h-4 bg-white/20" />

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
                    Bấm chọn một nhánh bên trái để xem nhanh lý thuyết.
                  </p>
                </div>
              )}
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
                <h3 className="font-orbitron font-black text-lg text-white uppercase">Giải Cứu Rồng</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chú pet **Rồng nhỏ** đang bị giam cầm tại đền cổ. Bạn dùng tri thức Toán học, Tiếng Anh và Ngữ văn để vượt qua 3 thử thách cổ đại nhé!
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
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-300 font-orbitron font-bold">Mạng:</span>
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

                <div className="bg-synth-purple/5 border border-synth-purple/20 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-synth-purple uppercase font-orbitron flex items-center gap-1">
                    📖 Kịch Bản Tình Huống:
                  </h4>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {storyStep === 1 && '"Bạn tiến vào Cổng Thần Thạch. Thần Đá yêu cầu mở khóa mật mã toán học này..."'}
                    {storyStep === 2 && '"Qua cổng rừng sương mù, Hiệp sĩ Anh yêu cầu trả lời đúng ngữ pháp này..."'}
                    {storyStep === 3 && '"Trước ngục đá, Thần Rùa gác cổng yêu cầu phân tích đúng kiến thức văn học này..."'}
                  </p>
                </div>

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

            {storyStep === 4 && (
              <div className="max-w-md mx-auto space-y-4 py-8">
                <div className="text-5xl animate-bounce">🏆🦅🐉</div>
                <h3 className="font-orbitron font-black text-xl text-synth-green uppercase">Giải Cứu Hoàn Tất</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bạn đã xử đẹp toàn bộ tình huống! Rồng nhỏ vẫy đuôi rồi bay về.
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

            {storyStep === 5 && (
              <div className="max-w-md mx-auto space-y-4 py-8">
                <div className="text-5xl">💀🥀</div>
                <h3 className="font-orbitron font-black text-xl text-red-500 uppercase">Thất Bại Tiếc Nuối</h3>
                <p className="text-xs text-slate-300">
                  Lượt mạng đã cạn kiệt. Thử lại ván mới đi.
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
                Tung xúc xắc 🎲 để tiến bước trên bản đồ. Trả lời đúng trivia ở mỗi ô để về đích lấy rương báu!
              </p>
            </div>

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
                        Bạn ở đây
                      </span>
                    )}
                    {isGoal && !isCurrent && (
                      <span className="text-[12px] animate-pulse">👑</span>
                    )}
                  </div>
                );
              })}
            </div>

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

        {/* TAB 6: TRÌNH TỰ GIẢI (STEP BUILDER) */}
        {activeTab === 'stepbuilder' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
              <h3 className={`font-orbitron font-black text-lg ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>🧩 Sắp Xếp Trình Tự</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Di chuyển các bước lên xuống để tạo thành trình tự giải hoặc lập luận hoàn hảo!
              </p>

              <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5 mt-2">
                {[
                  { id: 'math', label: 'Giải toán 📐' },
                  { id: 'english', label: 'Chuyển bị động 🇬🇧' },
                  { id: 'literature', label: 'Phân tích thơ ✍' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setStepSubject(opt.id as any)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold font-orbitron uppercase cursor-pointer ${
                      stepSubject === opt.id ? 'bg-synth-cyan text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {stepStatus === 'playing' ? (
              <div className="max-w-xl mx-auto space-y-2.5 py-2">
                {scrambledSteps.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className="p-3.5 rounded-xl border border-white/5 bg-synth-gray/20 flex justify-between items-center text-xs font-semibold text-white text-left"
                  >
                    <span>{step.text}</span>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => moveStep(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] hover:bg-white/10 disabled:opacity-30 cursor-pointer font-bold"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveStep(idx, 'down')}
                        disabled={idx === scrambledSteps.length - 1}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] hover:bg-white/10 disabled:opacity-30 cursor-pointer font-bold"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={checkStepOrder}
                  className="w-full mt-4 px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:synth-glow-cyan"
                >
                  Kiểm Tra Trình Tự ✔️
                </button>
              </div>
            ) : (
              <div className="py-10 space-y-4 max-w-md mx-auto">
                <div className="text-4xl animate-bounce">🧩🏆🎉</div>
                <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Hoàn Thành Trình Tự</h4>
                <p className="text-xs text-slate-300">
                  Bạn đã xếp đúng chuỗi lập luận. Thưởng: **+30 NP coins, +25 XP**
                </p>
                <button
                  onClick={initStepGame}
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-105 transition-all"
                >
                  Trộn Lại Bước Giải 🔁
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: ĐỌC HIỂU SÂU (READING CHALLENGE) */}
        {activeTab === 'reading' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/25'
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-cyan">
                  📖 Thử Thách Đọc Hiểu
                </h3>
                <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5">
                  {[
                    { id: 'english', label: 'Tiếng Anh 🇬🇧' },
                    { id: 'math', label: 'Toán Học 📐' },
                    { id: 'literature', label: 'Ngữ Văn ✍️' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setReadingSubject(opt.id as any)}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold font-orbitron uppercase cursor-pointer ${
                        readingSubject === opt.id ? 'bg-synth-cyan text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive highlight reader area */}
              <div className="space-y-4">
                <div className="bg-synth-cyan/5 border border-synth-cyan/10 p-3 rounded-xl text-[10px] text-synth-cyan font-semibold">
                  👉 Nhấp chọn các từ khóa chính liên quan đến chủ đề của bài học bên dưới để tô sáng:
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl p-4 leading-relaxed flex flex-wrap gap-1.5 text-xs text-white">
                  {READING_DATA[readingSubject].words.map((word, idx) => {
                    const isHighlighted = highlightedIndices.includes(idx);
                    return (
                      <span
                        key={idx}
                        onClick={() => toggleWordHighlight(idx)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                          isHighlighted 
                            ? 'bg-synth-cyan/30 border border-synth-cyan/50 text-synth-cyan font-bold scale-105 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                            : 'bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Multiple choice question below */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3 text-left">
                <h4 className="text-xs font-bold text-white">
                  Câu hỏi: {READING_DATA[readingSubject].question}
                </h4>
                
                <div className="grid grid-cols-1 gap-2">
                  {READING_DATA[readingSubject].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => !readingChecked && setSelectedReadingOption(opt)}
                      disabled={readingChecked}
                      className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                        selectedReadingOption === opt
                          ? 'border-synth-cyan bg-synth-cyan/15 text-synth-cyan font-semibold'
                          : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!readingChecked ? (
                  <button
                    onClick={checkReadingChallenge}
                    className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:synth-glow-cyan"
                  >
                    Xác Nhận Thử Thách ✔️
                  </button>
                ) : (
                  <button
                    onClick={initReadingGame}
                    className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10"
                  >
                    Thử Lại Màn Khác 🔁
                  </button>
                )}
              </div>
            </div>

            {/* Right Guide Info */}
            <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/15'
            }`}>
              <div className="space-y-4">
                <h3 className="font-orbitron font-bold text-sm text-white uppercase flex items-center gap-1">
                  🏆 Kết quả đọc hiểu
                </h3>

                {readingResult === 'success' && (
                  <div className="p-4 rounded-xl border border-synth-green bg-synth-green/5 text-center space-y-2">
                    <Check className="w-10 h-10 text-synth-green mx-auto animate-bounce" />
                    <h4 className="font-bold text-xs text-synth-green">Tô Sáng Chuẩn Xác</h4>
                    <p className="text-[10px] text-slate-400">
                      Bạn chốt đúng từ khóa cốt lõi và đáp án. (+35 NP, +30 XP)
                    </p>
                  </div>
                )}

                {readingResult === 'fail' && (
                  <div className="p-4 rounded-xl border border-red-500 bg-red-500/5 text-center space-y-2">
                    <X className="w-10 h-10 text-red-500 mx-auto" />
                    <h4 className="font-bold text-xs text-red-500">Chưa Đạt Yêu Cầu</h4>
                    <p className="text-[10px] text-slate-400">
                      Bắt đúng từ khóa mấu chốt rồi chọn ý nghĩa chuẩn của đoạn văn.
                    </p>
                  </div>
                )}

                {readingResult === null && (
                  <div className="text-center py-10 text-slate-500 text-[10px] flex flex-col items-center gap-2">
                    <HelpCircle className="w-10 h-10 text-slate-600" />
                    Đang đợi bạn chốt xong thử thách đọc...
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white">Lợi ích:</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Kỹ năng lọc thông tin, xác định cấu trúc cốt lõi giúp cải thiện tốc độ giải bài trắc nghiệm đọc hiểu Tiếng Anh và làm văn nghị luận văn học.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: GIẢNG BÀI CHO AI (EXPLAIN TO AI) */}
        {activeTab === 'explain' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 glass-panel rounded-3xl border p-5 space-y-4 ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/25'
            }`}>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-orbitron font-black text-xs uppercase tracking-wider text-synth-purple">
                  ✍️ Trải Nghiệm Giảng Bài Cho AI
                </h3>
                <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5">
                  {[
                    { id: 'pythagoras', label: 'Pythagoras 📐' },
                    { id: 'present_perfect', label: 'Hiện tại hoàn thành 🇬🇧' },
                    { id: 'song_poem', label: 'Bài thơ Sóng ✍️' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setExplainTopic(opt.id as any);
                        restartExplainGame();
                      }}
                      className={`px-3 py-1 rounded-md text-[9px] font-bold font-orbitron uppercase cursor-pointer ${
                        explainTopic === opt.id ? 'bg-synth-purple text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {explainPhase === 'input' && (
                <div className="space-y-4 text-left">
                  <div className="bg-synth-purple/5 border border-synth-purple/10 p-3 rounded-xl text-xs text-slate-300">
                    Chủ đề: <span className="font-bold text-white">{EXPLAIN_TOPICS[explainTopic].title}</span>.
                    Bạn hãy viết lời giải thích của mình vào ô dưới đây, như thể đang đứng lớp dạy AI.
                  </div>

                  <textarea
                    value={studentText}
                    onChange={(e) => setStudentText(e.target.value)}
                    placeholder="Nhập bài giảng giải của bạn vào đây (tối thiểu 20 ký tự)..."
                    rows={6}
                    className="w-full p-3.5 rounded-xl border border-white/10 focus:border-synth-purple bg-synth-gray/20 text-white text-xs outline-none transition-all"
                  />

                  <button
                    onClick={handleTeachAI}
                    className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold cursor-pointer hover:synth-border-purple flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Đẩy bài cho AI
                  </button>
                </div>
              )}

              {explainPhase === 'feedback' && (
                <div className="space-y-5 text-left">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-synth-purple font-orbitron">💬 Phản hồi từ học sinh AI:</h4>
                    <p className="text-xs leading-relaxed text-slate-200 italic">
                      "{aiFeedback}"
                    </p>
                  </div>

                  {aiCounterQuestion && (
                    <div className="bg-synth-purple/5 border border-synth-purple/20 p-4 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold text-white font-orbitron flex items-center gap-1">
                        ❓ Câu hỏi kiểm tra từ học sinh AI:
                      </h4>
                      <p className="text-xs text-slate-300">
                        {aiCounterQuestion.q}
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {aiCounterQuestion.opts.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setCounterAnswer(opt)}
                            className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                              counterAnswer === opt
                                ? 'border-synth-purple bg-synth-purple/10 text-white font-semibold'
                                : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleCounterAnswerSubmit}
                        className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold cursor-pointer hover:synth-border-purple"
                      >
                        Đáp lại AI ✔
                      </button>
                    </div>
                  )}

                  {!aiCounterQuestion && (
                    <button
                      onClick={restartExplainGame}
                      className="w-full px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10"
                    >
                      Quay Lại Giảng Bài 🔁
                    </button>
                  )}
                </div>
              )}

              {explainPhase === 'won' && (
                <div className="py-12 space-y-4">
                  <div className="text-5xl animate-bounce">🎓🦉🎖️</div>
                  <h4 className="font-orbitron font-black text-lg text-synth-green uppercase">
                    Bài Giảng Xuất Sắc
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    AI đã ngấm bài. Bạn nhận **+40 xu (NP), +40 XP** nhờ kiểu học Feynman.
                  </p>
                  <button
                    onClick={restartExplainGame}
                    className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-purple text-black font-semibold cursor-pointer hover:scale-105 transition-all"
                  >
                    Dạy Bài Khác 🔁
                  </button>
                </div>
              )}
            </div>

            {/* Right Guide box */}
            <div className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between ${
              isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-purple/15'
            }`}>
              <div className="space-y-4">
                <h3 className="font-orbitron font-bold text-xs text-synth-purple uppercase">
                  💡 Phương pháp Feynman
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Khi bạn dạy lại cho AI bằng lời dễ hiểu, hổng nào trong lập luận cũng lộ ra ngay.
                </p>
                <div className="border border-white/5 p-3 rounded-xl bg-white/5 text-[9px] text-slate-300 space-y-1">
                  <span className="font-bold text-synth-orange uppercase">Từ khóa học sinh AI tìm kiếm:</span>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    <li>**Toán**: vuông, cạnh huyền, bình phương, cộng...</li>
                    <li>**Anh**: have/has, past participle, v3...</li>
                    <li>**Văn**: tình yêu, phụ nữ, thủy chung, biểu tượng...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: GHÉP SƠ ĐỒ (DRAG & DROP DIAGRAM) */}
        {activeTab === 'dragdiagram' && (
          <div className={`glass-panel rounded-3xl border p-6 text-center space-y-6 ${
            isUnicorn ? 'border-violet-200/35 bg-white/70' : 'border-synth-cyan/30'
          }`}>
            <div className="max-w-md mx-auto space-y-2 flex flex-col items-center">
              <h3 className="font-orbitron font-black text-lg text-white uppercase">🧱 Lắp Ghép Sơ Đồ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhấp chọn một nhãn dán ở bể chứa, sau đó nhấp vào ô trống tương ứng trên sơ đồ để lắp ráp!
              </p>

              <div className="flex gap-1.5 bg-black/20 p-1 rounded-lg border border-white/5 mt-2">
                {[
                  { id: 'math', label: 'Tam giác vuông 📐' },
                  { id: 'english', label: 'Cấu trúc câu 🇬🇧' },
                  { id: 'literature', label: 'Thể loại tác phẩm ✍️' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDiagramSubject(opt.id as any)}
                    className={`px-3 py-1 rounded-md text-[10px] font-bold font-orbitron uppercase cursor-pointer ${
                      diagramSubject === opt.id ? 'bg-synth-cyan text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {diagramStatus === 'playing' ? (
              <div className="space-y-6 max-w-xl mx-auto py-2 text-left">
                {/* Selected label notification */}
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-slate-400">Nhãn dán đang chọn:</span>
                  <span className={`px-3 py-1 rounded font-bold uppercase ${
                    selectedLabel ? 'bg-synth-cyan text-black' : 'text-slate-500 italic'
                  }`}>
                    {selectedLabel || 'Chưa chọn'}
                  </span>
                </div>

                {/* Pool of Labels */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 font-orbitron uppercase">Bể chứa nhãn dán:</span>
                  <div className="flex flex-wrap gap-2">
                    {diagramLabels.map((lbl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedLabel(lbl)}
                        className={`px-3 py-2 rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${
                          selectedLabel === lbl
                            ? 'bg-synth-cyan border-synth-cyan text-black'
                            : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        🏷️ {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diagram Target Slots */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 font-orbitron uppercase">Vị trí lắp ráp sơ đồ:</span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {diagramSlots.map((slot) => (
                      <div 
                        key={slot.id}
                        className="p-3 rounded-xl border border-white/5 bg-black/20 flex justify-between items-center text-xs"
                      >
                        <span className="text-slate-300 font-medium">{slot.label}</span>
                        
                        <button
                          onClick={() => handlePlaceLabel(slot.id)}
                          className={`px-4 py-2 rounded-lg border text-[11px] font-bold uppercase min-w-[150px] text-center cursor-pointer transition-all ${
                            slot.currentLabel
                              ? 'bg-white/10 border-white/20 text-synth-cyan'
                              : 'border-dashed border-synth-cyan/40 bg-synth-cyan/5 text-synth-cyan/60 animate-pulse'
                          }`}
                        >
                          {slot.currentLabel || '➕ Nhấp để dán'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={checkDiagram}
                  className="w-full mt-4 px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:synth-glow-cyan"
                >
                  Kiểm Tra Sơ Đồ Lắp Ráp ✔️
                </button>
              </div>
            ) : (
              <div className="py-10 space-y-4 max-w-md mx-auto">
                <div className="text-4xl animate-bounce">🧱🏆🎉</div>
                <h4 className="font-orbitron font-black text-xl text-synth-green uppercase">Ghép Sơ Đồ Thành Công</h4>
                <p className="text-xs text-slate-300">
                  Bạn đã ghép xong toàn bộ nhãn sơ đồ. Nhận thưởng: **+30 xu (NP), +35 XP**
                </p>
                <button
                  onClick={initDiagramGame}
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase bg-synth-cyan text-black cursor-pointer hover:scale-105 transition-all"
                >
                  Ghép Bảng Sơ Đồ Mới 🔁
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
