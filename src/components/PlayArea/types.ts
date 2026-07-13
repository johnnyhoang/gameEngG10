import type { Question } from '../../types/game';

export interface PlayAreaHeaderProps {
  modeLabel: string;
  activeQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  isMuted: boolean;
  activeCombo: number;
  timeLeft: number;
  activeSectId: string;
  onToggleMute: () => void;
  onShowScratchpad: () => void;
  formatTime: (seconds: number) => string;
}

export interface QuestionMCQProps {
  activeQuestion: Question;
  selectedAnswer: string;
  checked: boolean;
  onSelectAnswer: (answer: string) => void;
}

export interface QuestionEssayProps {
  typedAnswer: string;
  checked: boolean;
  onTypeAnswer: (answer: string) => void;
  lang?: 'en-US' | 'vi-VN';
}

export interface QuestionTextInputProps {
  typedAnswer: string;
  checked: boolean;
  onTypeAnswer: (answer: string) => void;
  lang?: 'en-US' | 'vi-VN';
}

export interface ExplanationBoxProps {
  activeSectId: string;
  activeQuestion: Question;
  isLastCorrect: boolean;
  lastRubricScore: number | null;
  lastRubricMissing: string[];
  aiWarningMessage: string;
  aiFeedback: string;
  aiSuggestions: string[];
}
