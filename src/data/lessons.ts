import type { GradeTier, SubjectId, HamNguyenTo } from '../types/game';

export interface Lesson {
  id: string;
  subject: SubjectId;
  /** Legacy content without this field is normalized to grade 9 at the registry boundary. */
  gradeTier?: GradeTier;
  examples?: string[];
  practicePoints?: string[];
  difficulty?: number;
  topic: string;
  title: string;
  theory: string;
  category: string;
  is_standard?: boolean;
  loai?: string;
  bai?: number;
  hamNguyenTo?: HamNguyenTo;
}
