import type { Question, SubjectId } from '../types/game';

export interface SubjectToolContribution {
  id: string;
  title: string;
  surface: 'learning-hall';
}

export interface SubjectActivityContribution {
  id: string;
  title: string;
  categories: readonly string[];
  legacyMode?: string;
}

export interface MiniGameContribution {
  id: string;
  surface: 'relaxation-park';
}

export interface QuestionPresentation {
  splitPassage: boolean;
  passageText: string;
  questionText: string;
  metadataLabels?: readonly { value: string; tone: 'primary' | 'accent' | 'neutral' }[];
}

export interface QuestionPresentationContribution {
  present(question: Question): QuestionPresentation;
}

export interface QuestionMetadataContribution {
  getExamPartLabel(question: Question): string | null;
  getTopicLabel(question: Question): string | null;
}

export interface SubjectHintContext {
  question: Question;
  mode: string;
}

export interface AssessmentInput {
  question: Question;
  answer: string;
  token: string;
  profileId: string;
  backendUrl: string;
}

export interface AssessmentResult {
  score: number;
  missingKeywords: string[];
  feedback: string;
  suggestions: string[];
}

export interface AssessmentProviderContribution {
  id: string;
  matches(question: Question): boolean;
  assess(input: AssessmentInput): Promise<AssessmentResult>;
}

export interface SubjectModule {
  subjectId: SubjectId;
  tools?: readonly SubjectToolContribution[];
  activities?: readonly SubjectActivityContribution[];
  miniGames?: readonly MiniGameContribution[];
  utilities?: readonly string[];
  questionPresentation?: QuestionPresentationContribution;
  questionMetadata?: QuestionMetadataContribution;
  getHint?: (context: SubjectHintContext) => string | null;
  assessmentProviders?: readonly AssessmentProviderContribution[];
}
