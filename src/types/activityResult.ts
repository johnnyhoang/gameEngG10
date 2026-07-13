/**
 * Unified result contract for all learning activities
 * (quizzes, lessons, minigames, practice, boss fights, survival).
 *
 * `passed` is the single source of truth for whether an activity run
 * should count toward mastery, fog-of-war unlock, quest progress, etc.
 */

export type ActivityStatus =
  | 'completed'  // finished with score >= threshold
  | 'failed'     // finished but score < threshold
  | 'timeout'    // ran out of time (treated as fail)
  | 'abandoned'; // user quit early

export interface ActivityResult {
  /** Overall outcome status */
  status: ActivityStatus;

  /** Number of correctly answered questions / matched pairs / steps */
  score: number;

  /** Total questions / pairs / steps in the activity */
  total: number;

  /** score / total, range 0–1 */
  accuracyRatio: number;

  /** Seconds elapsed during the activity */
  timeSpentSeconds: number;

  /** Ruby and XP actually awarded for this run */
  rewardsEarned: { ruby: number; xp: number };

  /**
   * True when ≥ 3 mistakes occurred in boss/survival mode.
   * Used to apply the 50% reward clawback.
   */
  isDefeat: boolean;

  /**
   * THE gate flag:
   * - true  → counts toward mastery / fog unlock / quest progress
   * - false → no progression update (but review is still shown)
   */
  passed: boolean;
}
