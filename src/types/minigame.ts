export interface MiniGameProps {
  currentStudentId: string;
  activeSectId: string;
  difficulty: 'easy' | 'hard';
  lockedStatus: boolean;
  onGameStart?: () => void;
  onGameComplete?: (results: { correctAnswers: number; timeSpent: number; score: number }) => void;
  onGatekeeperTriggered?: () => void;
}
