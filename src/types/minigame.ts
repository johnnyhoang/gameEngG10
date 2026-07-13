export interface MiniGameProps {
  currentStudentId: string;
  activeSectId: string;
  gradeTier: number;
  difficulty: 'easy' | 'hard';
  lockedStatus: boolean;
  onGameStart?: () => void;
  onGameComplete?: (results: { correctAnswers: number; timeSpent: number; score: number; passed: boolean }) => void;
  onGatekeeperTriggered?: () => void;
}
