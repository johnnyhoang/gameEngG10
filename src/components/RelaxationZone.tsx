import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Lock } from 'lucide-react';
import { useSect } from '../contexts/SectContext';
import { useGameState } from '../hooks/useGameState';
import { FogCard, getFogStatus } from './FogCard';
import { Level3Overlay } from './Level3Overlay';

// Game components
import { FlashcardGame } from './games/FlashcardGame';
import { MatchPairsGame } from './games/MatchPairsGame';
import { MindmapGame } from './games/MindmapGame';
import { StoryGame } from './games/StoryGame';
import { AdventureGame } from './games/AdventureGame';
import { StepBuilderGame } from './games/StepBuilderGame';
import { ReadingGame } from './games/ReadingGame';
import { ExplainGame } from './games/ExplainGame';
import { DiagramGame } from './games/DiagramGame';

interface RelaxationZoneProps {
  onBack: () => void;
}

type GameId = 'flashcards' | 'match' | 'mindmap' | 'story' | 'adventure' | 'stepbuilder' | 'reading' | 'explain' | 'dragdiagram';

interface GameCard {
  id: GameId;
  icon: string;
  title: string;
  desc: string;
  reward: string;
  color: string; // tailwind accent
  pageId: string;
}

const CANH_HOA_VIEN: GameCard[] = [
  { id: 'flashcards', icon: '🎴', title: 'Xưởng Thẻ Nhớ', desc: 'Active Recall lật mặt — ghi nhớ nhanh câu hỏi bằng SRS', reward: '+2 NP, +5 XP / thẻ', color: 'synth-cyan', pageId: 'relax-flashcards' },
  { id: 'match', icon: '🔗', title: 'Ghép Cặp', desc: 'Nối từ vựng với nghĩa, công thức với tên gọi', reward: '+10 NP, +20 XP', color: 'synth-magenta', pageId: 'relax-match' },
  { id: 'mindmap', icon: '🗺️', title: 'Sơ Đồ Ôn Tập', desc: 'Tóm tắt kiến thức theo sơ đồ tư duy trực quan', reward: 'Không điểm — luyện trí nhớ', color: 'synth-cyan', pageId: 'relax-mindmap' },
];

const CANH_NUI_RUNG: GameCard[] = [
  { id: 'adventure', icon: '🧭', title: 'Du Khảo Kỳ Thú', desc: 'Tung xúc xắc di chuyển trên bản đồ trivia', reward: '+100 NP, +80 XP khi về đích', color: 'synth-orange', pageId: 'relax-adventure' },
  { id: 'stepbuilder', icon: '🧩', title: 'Trình Tự Giải', desc: 'Sắp xếp đúng thứ tự các bước giải toán, ngữ pháp', reward: '+30 NP, +25 XP', color: 'synth-cyan', pageId: 'relax-stepbuilder' },
  { id: 'reading', icon: '📖', title: 'Đọc Hiểu Sâu', desc: 'Tô sáng từ khóa & tìm ý chính đoạn văn', reward: '+35 NP, +30 XP', color: 'synth-cyan', pageId: 'relax-reading' },
];

const CANH_THAC_HO: GameCard[] = [
  { id: 'story', icon: '🎭', title: 'Tình Huống RPG', desc: 'Phiêu lưu giải cứu Heo Maikawaii qua 3 ải tri thức', reward: '+60 NP, +50 XP', color: 'synth-purple', pageId: 'relax-story' },
  { id: 'explain', icon: '✍️', title: 'Giảng Cho AI', desc: 'Đóng vai giáo viên dạy AI — Phương pháp Feynman', reward: '+15 NP, +30 XP', color: 'synth-purple', pageId: 'relax-explain' },
  { id: 'dragdiagram', icon: '🧱', title: 'Ghép Sơ Đồ', desc: 'Lắp ghép nhãn dán vào sơ đồ kiến thức', reward: '+30 NP, +35 XP', color: 'synth-cyan', pageId: 'relax-dragdiagram' },
];

function renderGame(
  game: GameCard,
  explorationStates: any,
  currentUser: any,
  currentSubject: string,
  completeLevel3Page: (pageId: string) => void
) {
  const isEasy = game.id === 'flashcards' || game.id === 'match';
  const req = isEasy ? 2 : 3;
  const status = getFogStatus(game.pageId, explorationStates, req, 7);
  const lockedStatus = status === 'shadowed';

  const props = {
    currentStudentId: currentUser?.id || 'mock-student',
    activeSectId: currentSubject,
    difficulty: (isEasy ? 'easy' : 'hard') as 'easy' | 'hard',
    lockedStatus,
    onGameStart: () => {
      console.log(`Bắt đầu chơi game: ${game.title}`);
    },
    onGameComplete: (results: any) => {
      console.log(`Hoàn thành game: ${game.title}`, results);
      completeLevel3Page(game.pageId);
    }
  };

  switch (game.id) {
    case 'flashcards': return <FlashcardGame {...props} />;
    case 'match': return <MatchPairsGame {...props} />;
    case 'stepbuilder': return <StepBuilderGame {...props} />;
    case 'mindmap': return <MindmapGame {...props} />;
    case 'story': return <StoryGame {...props} />;
    case 'adventure': return <AdventureGame {...props} />;
    case 'reading': return <ReadingGame {...props} />;
    case 'explain': return <ExplainGame {...props} />;
    case 'dragdiagram': return <DiagramGame {...props} />;
  }
}

interface CanhSectionProps {
  icon: string;
  label: string;
  desc: string;
  games: GameCard[];
  onOpenGame: (game: GameCard) => void;
  isUnicorn: boolean;
  bgClass: string;
  borderClass: string;
}

const CanhSection: React.FC<CanhSectionProps> = ({ icon, label, desc, games, onOpenGame, isUnicorn, bgClass, borderClass }) => (
  <div className={`rounded-2xl border p-5 space-y-4 ${bgClass} ${borderClass}`}>
    <div className="space-y-0.5">
      <h2 className={`font-orbitron font-black text-base uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
        {icon} {label}
      </h2>
      <p className="text-[10px] text-slate-400">{desc}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.map(game => (
        <div key={game.id} className="relative">
          <FogCard
            pageId={game.pageId}
            requiredCompletions={game.id === 'flashcards' || game.id === 'match' ? 2 : 3}
            decayDays={7}
            label="Trò chơi chưa trải nghiệm"
            onOpenLevel3={() => onOpenGame(game)}
          >
            <div
              className="rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col gap-3 cursor-pointer hover:border-white/20 transition-all duration-200 h-full group"
              onClick={(e) => { e.stopPropagation(); onOpenGame(game); }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{game.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-orbitron font-black text-xs uppercase tracking-wide text-white leading-tight">
                    {game.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{game.desc}</p>
                </div>
              </div>
              <div className="mt-auto">
                <span className="inline-block text-[9px] font-bold font-orbitron uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  🎁 {game.reward}
                </span>
              </div>
              <div className="w-full py-2 rounded-lg bg-gradient-to-r from-synth-cyan/20 to-synth-purple/20 border border-synth-cyan/20 text-center text-[10px] font-bold font-orbitron uppercase text-synth-cyan group-hover:from-synth-cyan/30 group-hover:to-synth-purple/30 transition-all">
                Vào Chơi →
              </div>
            </div>
          </FogCard>
        </div>
      ))}
    </div>
  </div>
);

export const RelaxationZone: React.FC<RelaxationZoneProps> = ({ onBack }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = uiTheme === 'unicorn-dream';

  const currentUser = useGameState(state => state.currentUser);
  const { activeSectId } = useSect();
  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const completeLevel3Page = useGameState(state => state.completeLevel3Page);

  const [activeGame, setActiveGame] = useState<GameCard | null>(null);

  const handleOpenGame = (game: GameCard) => {
    setActiveGame(game);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            Khu trò chơi trí tuệ — thư giãn bổ ích bằng cách vận dụng kho kiến thức.
          </p>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-bold font-orbitron uppercase ${isUnicorn ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-synth-gray/20 border-white/10 text-synth-cyan'}`}>
          <Lock className="w-3.5 h-3.5" />
          Click card để vào — sương mù tan khi chơi đủ
        </div>
      </div>

      {/* 3 Cảnh (Level 2) */}
      <div className="space-y-6">
        <CanhSection
          icon="🌸"
          label="Hoa Viên"
          desc="Khu ghi nhớ nhẹ nhàng — thẻ nhớ, ghép cặp, sơ đồ tư duy"
          games={CANH_HOA_VIEN}
          onOpenGame={handleOpenGame}
          isUnicorn={isUnicorn}
          bgClass={isUnicorn ? 'bg-pink-50/40' : 'bg-pink-500/5'}
          borderClass={isUnicorn ? 'border-pink-200/40' : 'border-pink-500/15'}
        />

        <CanhSection
          icon="🏔️"
          label="Núi Rừng"
          desc="Khu thử thách tư duy — du khảo, sắp xếp, đọc hiểu"
          games={CANH_NUI_RUNG}
          onOpenGame={handleOpenGame}
          isUnicorn={isUnicorn}
          bgClass={isUnicorn ? 'bg-green-50/40' : 'bg-emerald-500/5'}
          borderClass={isUnicorn ? 'border-green-200/40' : 'border-emerald-500/15'}
        />

        <CanhSection
          icon="🌊"
          label="Thác Hồ"
          desc="Khu sáng tạo ngôn ngữ — tình huống RPG, giảng bài, ghép sơ đồ"
          games={CANH_THAC_HO}
          onOpenGame={handleOpenGame}
          isUnicorn={isUnicorn}
          bgClass={isUnicorn ? 'bg-blue-50/40' : 'bg-blue-500/5'}
          borderClass={isUnicorn ? 'border-blue-200/40' : 'border-blue-500/15'}
        />
      </div>

      {/* Level 3 Overlay — game modal */}
      {activeGame && (
        <Level3Overlay
          isOpen={true}
          onClose={() => setActiveGame(null)}
          title={`${activeGame.icon} ${activeGame.title.toUpperCase()}`}
        >
          {renderGame(activeGame, pageExplorationStates, currentUser, activeSectId, completeLevel3Page)}
        </Level3Overlay>
      )}
    </div>
  );
};
