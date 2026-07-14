import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Lock } from 'lucide-react';
import { useSect } from '../contexts/SectContext';
import { useGameState } from '../hooks/useGameState';
import { FogCard, getFogStatus } from './FogCard';
import { FullscreenModal } from './Common/FullscreenModal';
import { toast } from '../utils/toast';
import { getSubjectMiniGameIds } from '../subject-modules/registry';

// Năng Lượng tiêu hao mỗi ván mini-game Công Viên Thư Giãn có sinh điểm (SUB_SPEC_ENERGY §3).
const MINIGAME_ENERGY_COST = 10;

// Game components
import { FlashcardGame } from '../miniapps/flashcard';
import { MatchPairsGame } from '../miniapps/match-pairs';
import { MindmapGame } from '../miniapps/mindmap';
import { StoryGame } from '../miniapps/story';
import { AdventureGame } from '../miniapps/adventure';
import { StepBuilderGame } from '../miniapps/step-builder';
import { ReadingGame } from '../miniapps/reading';
import { ExplainGame } from '../miniapps/explain';
import { DiagramGame } from '../miniapps/diagram';
import { EnglishSkillDistrictGame } from '../miniapps/english-skill-districts';

interface RelaxationZoneProps {
  onBack: () => void;
}

type GameId = 'flashcards' | 'match' | 'mindmap' | 'story' | 'adventure' | 'stepbuilder' | 'reading' | 'explain' | 'dragdiagram' | 'phrase-valley' | 'conversation-town' | 'writing-pavilion' | 'listening-lake';

interface GameCard {
  id: GameId;
  icon: string;
  title: string;
  desc: string;
  reward: string;
  color: string; // tailwind accent
  pageId: string;
  /** Ván có sinh điểm (Ruby/XP) mới tốn Năng Lượng — "Không điểm" thì miễn phí (SUB_SPEC_ENERGY §1+3). Mặc định true. */
  costsEnergy?: boolean;
}

const CANH_HOA_VIEN: GameCard[] = [
  { id: 'flashcards', icon: '🎴', title: 'Xưởng Thẻ Nhớ', desc: 'Active Recall lật mặt — ghi nhớ nhanh câu hỏi bằng SRS', reward: '+2 Ruby, +5 XP / thẻ', color: 'synth-cyan', pageId: 'relax-flashcards' },
  { id: 'match', icon: '🔗', title: 'Ghép Cặp', desc: 'Nối từ vựng với nghĩa, công thức với tên gọi', reward: '+10 Ruby, +20 XP', color: 'synth-magenta', pageId: 'relax-match' },
  { id: 'mindmap', icon: '🗺️', title: 'Sơ Đồ Ôn Tập', desc: 'Tóm tắt kiến thức theo sơ đồ tư duy trực quan', reward: 'Không điểm — luyện trí nhớ', color: 'synth-cyan', pageId: 'relax-mindmap', costsEnergy: false },
];

const CANH_NUI_RUNG: GameCard[] = [
  { id: 'adventure', icon: '🧭', title: 'Du Khảo Kỳ Thú', desc: 'Tung xúc xắc di chuyển trên bản đồ trivia', reward: '+100 Ruby, +80 XP khi về đích', color: 'synth-orange', pageId: 'relax-adventure' },
  { id: 'stepbuilder', icon: '🧩', title: 'Trình Tự Giải', desc: 'Sắp xếp đúng thứ tự các bước giải toán, ngữ pháp', reward: '+30 Ruby, +25 XP', color: 'synth-cyan', pageId: 'relax-stepbuilder' },
  { id: 'reading', icon: '📖', title: 'Đọc Hiểu Sâu', desc: 'Tô sáng từ khóa & tìm ý chính đoạn văn', reward: '+35 Ruby, +30 XP', color: 'synth-cyan', pageId: 'relax-reading' },
];

const CANH_THAC_HO: GameCard[] = [
  { id: 'story', icon: '🎭', title: 'Tình Huống RPG', desc: 'Phiêu lưu giải cứu Heo Maikawaii qua 3 ải tri thức', reward: '+60 Ruby, +50 XP', color: 'synth-purple', pageId: 'relax-story' },
  { id: 'explain', icon: '✍️', title: 'Giảng Cho AI', desc: 'Đóng vai giáo viên dạy AI — Phương pháp Feynman', reward: '+15 Ruby, +30 XP', color: 'synth-purple', pageId: 'relax-explain' },
  { id: 'dragdiagram', icon: '🧱', title: 'Ghép Sơ Đồ', desc: 'Lắp ghép nhãn dán vào sơ đồ kiến thức', reward: '+30 Ruby, +35 XP', color: 'synth-cyan', pageId: 'relax-dragdiagram' },
];

const ENGLISH_SKILL_DISTRICTS: GameCard[] = [
  { id: 'phrase-valley', icon: '🏞️', title: 'Phrase Valley', desc: 'Practise collocations and phrasal verbs in context', reward: '+25 Ruby, +30 XP', color: 'synth-green', pageId: 'relax-phrase-valley' },
  { id: 'conversation-town', icon: '🏘️', title: 'Conversation Town', desc: 'Choose natural responses for everyday situations', reward: '+25 Ruby, +30 XP', color: 'synth-orange', pageId: 'relax-conversation-town' },
  { id: 'writing-pavilion', icon: '📝', title: 'Writing Pavilion', desc: 'Build accurate sentences with clear answer rubrics', reward: '+35 Ruby, +40 XP', color: 'synth-magenta', pageId: 'relax-writing-pavilion' },
  { id: 'listening-lake', icon: '🌊', title: 'Listening Lake', desc: 'Listen for key details and main ideas', reward: '+35 Ruby, +40 XP', color: 'synth-cyan', pageId: 'relax-listening-lake' },
];

function renderGame(
  game: GameCard,
  explorationStates: any,
  currentUser: any,
  currentSubject: string,
  gradeTier: number,
  completeLevel3Page: (pageId: string) => void
) {
  const isEasy = game.id === 'flashcards' || game.id === 'match';
  const req = isEasy ? 2 : 3;
  const contextualPageId = `${gradeTier}-${currentSubject}-${game.pageId}`;
  const status = getFogStatus(contextualPageId, explorationStates, req, 7);
  const lockedStatus = status === 'shadowed';

  const props = {
    currentStudentId: currentUser?.id || 'mock-student',
    activeSectId: currentSubject,
    gradeTier,
    difficulty: (isEasy ? 'easy' : 'hard') as 'easy' | 'hard',
    lockedStatus,
    onGameStart: () => {
      console.log(`Bắt đầu chơi game: ${game.title}`);
    },
    onGameComplete: (results: any) => {
      console.log(`Hoàn thành game: ${game.title}`, results);
      if (results?.passed) {
        completeLevel3Page(contextualPageId);
      } else {
        toast.error('Chưa đạt yêu cầu hoàn thành trò chơi này! Hãy thử lại.');
      }
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
    case 'phrase-valley': return <EnglishSkillDistrictGame {...props} mode="phrase-valley" />;
    case 'conversation-town': return <EnglishSkillDistrictGame {...props} mode="conversation-town" />;
    case 'writing-pavilion': return <EnglishSkillDistrictGame {...props} mode="writing-pavilion" />;
    case 'listening-lake': return <EnglishSkillDistrictGame {...props} mode="listening-lake" />;
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
  lowEnergy: boolean;
}

const CanhSection: React.FC<CanhSectionProps> = ({ icon, label, desc, games, onOpenGame, isUnicorn, bgClass, borderClass, lowEnergy }) => (
  <div className={`rounded-2xl border p-5 space-y-4 ${bgClass} ${borderClass}`}>
    <div className="space-y-0.5">
      <h2 className={`font-orbitron font-black text-base uppercase tracking-wider ${isUnicorn ? 'text-violet-800' : 'text-white'}`}>
        {icon} {label}
      </h2>
      <p className="text-[10px] text-slate-400">{desc}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.map(game => {
        const isLocked = lowEnergy && game.costsEnergy !== false;
        return (
        <div key={game.id} className="relative">
          <FogCard
            pageId={game.pageId}
            requiredCompletions={game.id === 'flashcards' || game.id === 'match' ? 2 : 3}
            decayDays={7}
            label="Trò chơi chưa trải nghiệm"
            onOpenLevel3={() => onOpenGame(game)}
          >
            <div
              title={isLocked ? `Cần ${MINIGAME_ENERGY_COST} Năng Lượng để chơi — hãy nghỉ chờ hồi hoặc đọc Cẩm Nang.` : undefined}
              className={`rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col gap-3 transition-all duration-200 h-full group ${
                isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'
              }`}
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
                {isLocked ? 'Hết Năng Lượng' : 'Vào Chơi →'}
              </div>
            </div>
          </FogCard>
        </div>
        );
      })}
    </div>
  </div>
);

import { isLightTheme } from '../theme/uiThemes';

export const RelaxationZone: React.FC<RelaxationZoneProps> = ({ onBack }) => {
  const uiTheme = useGameState(state => state.uiTheme);
  const isUnicorn = isLightTheme(uiTheme);

  const currentUser = useGameState(state => state.currentUser);
  const { activeSectId, activeGradeTier } = useSect();
  const pageExplorationStates = useGameState(state => state.pageExplorationStates || {});
  const completeLevel3Page = useGameState(state => state.completeLevel3Page);
  const player = useGameState(state => state.player);
  const consumeEnergy = useGameState(state => state.useEnergy);

  const [activeGame, setActiveGame] = useState<GameCard | null>(null);
  const subjectMiniGameIds = getSubjectMiniGameIds(activeSectId);

  const handleOpenGame = (game: GameCard) => {
    if (game.costsEnergy !== false) {
      if (player.energy < MINIGAME_ENERGY_COST) {
        toast.error('Hết Năng Lượng rồi. Nghỉ một nhịp hoặc đọc Cẩm Nang trong lúc chờ hồi.');
        return;
      }
      consumeEnergy(MINIGAME_ENERGY_COST);
    }
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
              Công Viên Thư Giãn
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
          lowEnergy={player.energy < MINIGAME_ENERGY_COST}
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
          lowEnergy={player.energy < MINIGAME_ENERGY_COST}
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
          lowEnergy={player.energy < MINIGAME_ENERGY_COST}
          isUnicorn={isUnicorn}
          bgClass={isUnicorn ? 'bg-blue-50/40' : 'bg-blue-500/5'}
          borderClass={isUnicorn ? 'border-blue-200/40' : 'border-blue-500/15'}
        />

        {subjectMiniGameIds.length > 0 && (
          <CanhSection
            icon="🇬🇧"
            label="English Skill Districts"
            desc="English-only practice spaces for phrases, conversation, writing and listening"
            games={ENGLISH_SKILL_DISTRICTS.filter(game => subjectMiniGameIds.includes(game.id))}
            onOpenGame={handleOpenGame}
            lowEnergy={player.energy < MINIGAME_ENERGY_COST}
            isUnicorn={isUnicorn}
            bgClass={isUnicorn ? 'bg-violet-50/40' : 'bg-violet-500/5'}
            borderClass={isUnicorn ? 'border-violet-200/40' : 'border-violet-500/15'}
          />
        )}
      </div>

      {/* Fullscreen modal — game */}
      {activeGame && (
        <FullscreenModal
          isOpen={true}
          onClose={() => setActiveGame(null)}
          title={`${activeGame.icon} ${activeGame.title.toUpperCase()}`}
        >
          {renderGame(activeGame, pageExplorationStates, currentUser, activeSectId, activeGradeTier, completeLevel3Page)}
        </FullscreenModal>
      )}
    </div>
  );
};
