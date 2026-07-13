import type { SubjectId } from '../types/game';

export type SubjectCapability =
  | 'english-skill-districts'
  | 'math-foundation-studios';

const SUBJECT_CAPABILITIES: Partial<Record<SubjectId, readonly SubjectCapability[]>> = {
  english: ['english-skill-districts'],
  math: ['math-foundation-studios'],
};

export function hasSubjectCapability(subjectId: SubjectId, capability: SubjectCapability): boolean {
  return SUBJECT_CAPABILITIES[subjectId]?.includes(capability) ?? false;
}
