export type QuestionType = 'mcq' | 'wordform' | 'rewrite' | 'cloze' | 'reading' | 'short-answer' | 'proof' | 'multi-part';
export type ChallengeType = 'daily' | 'weekly' | 'achievement' | 'one-time';
export type RewardStatus = 'pending' | 'approved' | 'claimed';
export type PetStage = 'egg' | 'baby' | 'dragon' | 'legend';
export type PetMood = 'happy' | 'neutral' | 'sad' | 'sleeping';
export type UiThemeId = 'current' | 'cute-pink-pastel' | 'space-adventure' | 'fantasy-forest' | 'pixel-arcade' | 'unicorn-dream';

export interface GameSettings {
  bossBountiesVnd: [number, number, number];
  challengeEnergyCosts: [number, number, number, number];
  maxEnergy?: number;
  baseXP?: number;
  baseCoins?: number;
}

export interface UserProfile {
  id: string; // unique google id or email
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  role: 'student' | 'admin' | 'parent';
  level: number;
  xp: number;
  coins: number;
  walletVND: number;
  streak: number;
  energy: number; // 0 - 1000
  hearts: number; // 0 - 3 (or max hearts)
  lastActive: string; // ISO String date
  badges: string[];
}

export interface Question {
  id: string;
  type: QuestionType;
  category: string; // e.g. "tenses", "passive-voice", "relative-clauses", "vocabulary", "wordform", "reading", "pronunciation", "stress"
  prompt: string;
  options?: string[]; // for MCQs
  correctAnswer: string | string[]; // case-insensitive exact string or array of alternate valid strings
  explanation: string;
  difficulty: number; // 1 to 10 scale
  source: string; // e.g. "HCMC 2024 Exam", "Specialized 2025 Mock"
  subject?: 'english' | 'math' | 'literature';
  imageUrl?: string;
  metadata?: QuestionMeta;
  isConfused?: boolean;
}

export interface QuestionMeta {
  examPart?: string;
  mathTopic?: 'function-graph' | 'quadratic-equation' | 'linear-function' | 'growth-modeling' | 'percentage-discount' | 'volume-displacement' | 'shopping-discount' | 'tangent-geometry' | 'statistics-probability' | 'modeling' | 'solid-geometry' | 'finance' | 'plane-geometry' | 'mixed';
  answerMode?: 'single-choice' | 'short-answer' | 'proof' | 'multi-part' | 'numeric' | 'expression';
  solutionStyle?: 'direct' | 'worked' | 'proof-outline' | 'diagram' | 'table' | 'rubric';
  englishPart?: 'Part I' | 'Part II' | 'Part III' | 'Part IV' | 'Part V' | 'Part VI';
  englishTask?: 'grammar' | 'vocabulary' | 'pronunciation' | 'stress' | 'guided-cloze' | 'reading-true-false' | 'reading-mcq' | 'word-form' | 'rearrangement' | 'transformation' | 'mixed';
  englishSkill?: 'multiple-choice' | 'guided-cloze' | 'reading' | 'word-form' | 'rearrangement' | 'transformation';
  literatureTrack?: 'reading' | 'vietnamese' | 'social-essay' | 'literary-essay';
  literatureTask?: 'main-idea' | 'detail' | 'rhetoric' | 'vocabulary' | 'message' | 'social-essay' | 'poetry-analysis' | 'prose-analysis' | 'character-analysis' | 'comparison';
  textGenre?: 'poetry' | 'prose' | 'argument' | 'informative' | 'mixed';
  subparts?: string[];
  solutionSteps?: string[];
  formulaHints?: string[];
  diagramHint?: string;
  tags?: string[];
}

export interface CategoryStat {
  category: string;
  totalAnswered: number;
  totalCorrect: number;
  rollingAccuracy: number; // Rolling accuracy of the last N questions
  recentResults: boolean[]; // Array of last N question outcomes (true/false)
}

export interface PetState {
  name: string;
  stage: PetStage;
  level: number;
  exp: number;
  energy: number; // 0 - 100
  mood: PetMood;
  lastFed: string; // ISO String
}

export interface ParentReward {
  id: string;
  title: string;
  costCoins: number;
  cashValueVND: number;
  status: RewardStatus;
  timestamp: number;
}

export interface HistoryLog {
  id: string;
  timestamp: number;
  activityType: 'exercise' | 'challenge' | 'boss' | 'shop' | 'streak_penalty' | 'parent_approve' | 'pet_interact' | 'energy_refill' | 'box_open';
  title: string;
  detail: string;
  coinsChanged: number;
  xpChanged: number;
  walletChanged: number;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  rewardXP: number;
  completed: boolean;
  category?: string; // If restricted to a specific category
}

export interface DailyMission {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  requirements: {
    description: string;
    type: 'count' | 'accuracy' | 'category' | 'time';
    target: number;
    current: number;
    completed: boolean;
  }[];
  rewardVND: number;
  rewardXP: number;
  completed: boolean;
}

export interface GameEvent {
  id: string;
  timestamp: number;
  type: 'QUESTION_ANSWERED' | 'EXAM_COMPLETED' | 'DAILY_CHECK_IN' | 'REWARD_CLAIMED' | 'STREAK_RESET' | 'MISSION_COMPLETED' | 'CHALLENGE_COMPLETED' | 'PET_GROWTH' | 'ENERGY_CHANGE' | 'BOOST_ACTIVATED';
  payload: any;
}
