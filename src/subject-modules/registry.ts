import type { Question, SubjectId } from '../types/game';
import type { AssessmentProviderContribution, QuestionPresentation, SubjectModule } from './contracts';
import { englishSubjectModule } from './english/manifest';
import { literatureSubjectModule } from './literature/manifest';
import { mathSubjectModule } from './math/manifest';

function createRegistry(modules: readonly SubjectModule[]): ReadonlyMap<SubjectId, SubjectModule> {
  const registry = new Map<SubjectId, SubjectModule>();
  const contributionIds = new Set<string>();

  for (const module of modules) {
    if (registry.has(module.subjectId)) throw new Error(`Duplicate SubjectModule: ${module.subjectId}`);
    for (const contribution of [...(module.tools ?? []), ...(module.activities ?? []), ...(module.miniGames ?? [])]) {
      const key = `${module.subjectId}:${contribution.id}`;
      if (contributionIds.has(key)) throw new Error(`Duplicate subject contribution: ${key}`);
      contributionIds.add(key);
    }
    registry.set(module.subjectId, Object.freeze(module));
  }

  return registry;
}

const MODULES = createRegistry([englishSubjectModule, mathSubjectModule, literatureSubjectModule]);

export function getSubjectModule(subjectId: SubjectId): SubjectModule | undefined {
  const mod = MODULES.get(subjectId);
  if (mod) return mod;

  // Dynamic fallback for other subjects (science, civics, informatics, etc.)
  // TODO: Once complete data is provided for these subjects, define their standard manifests explicitly
  return {
    subjectId,
    lang: 'vi-VN',
    supportsShortAnswer: false,
    activities: [
      {
        id: `${subjectId}-mixed`,
        title: 'Luyện tập ngẫu nhiên',
        categories: [],
        modeKey: 'mixed',
        label: 'Phụ bản hỗn hợp',
        icon: 'BookOpen',
        topicIds: ['*'] // wildcard: grab all questions in scope for this subject
      }
    ]
  };
}

export function getSubjectToolIds(subjectId: SubjectId): readonly string[] {
  return getSubjectModule(subjectId)?.tools?.map(tool => tool.id) ?? [];
}

export function getSubjectMiniGameIds(subjectId: SubjectId): readonly string[] {
  return getSubjectModule(subjectId)?.miniGames?.map(game => game.id) ?? [];
}

export function getSubjectActivities(subjectId: SubjectId) {
  return getSubjectModule(subjectId)?.activities ?? [];
}

export function getSubjectQuestionMetadata(subjectId: SubjectId) {
  return getSubjectModule(subjectId)?.questionMetadata;
}

export function getQuestionPresentation(subjectId: SubjectId, question: Question): QuestionPresentation {
  return getSubjectModule(subjectId)?.questionPresentation?.present(question) ?? {
    splitPassage: false,
    passageText: '',
    questionText: question.prompt,
    metadataLabels: [],
  };
}

export function hasSubjectUtility(subjectId: SubjectId, utilityId: string): boolean {
  return getSubjectModule(subjectId)?.utilities?.includes(utilityId) ?? false;
}

export function getSubjectHint(subjectId: SubjectId, question: Question, mode: string): string | null {
  return getSubjectModule(subjectId)?.getHint?.({ question, mode }) ?? null;
}

export function getAssessmentProvider(subjectId: SubjectId, question: Question): AssessmentProviderContribution | undefined {
  return getSubjectModule(subjectId)?.assessmentProviders?.find(provider => provider.matches(question));
}
