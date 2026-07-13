import type { Question } from '../../types/game';
import type { QuestionPresentation } from '../contracts';
import { LITERATURE_ANSWER_MODE_LABELS, LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from './blueprint';

export function presentLiteratureQuestion(question: Question): QuestionPresentation {
  const sections = question.prompt.split('\n\n');
  const splitPassage = sections.length > 1;

  return {
    splitPassage,
    passageText: splitPassage ? sections.slice(0, -1).join('\n\n') : '',
    questionText: splitPassage ? sections.at(-1) ?? question.prompt : question.prompt,
    metadataLabels: [
      question.metadata?.answerMode ? { value: LITERATURE_ANSWER_MODE_LABELS[question.metadata.answerMode] || question.metadata.answerMode, tone: 'primary' as const } : null,
      question.metadata?.literatureTask ? { value: LITERATURE_TASK_LABELS[question.metadata.literatureTask] || question.metadata.literatureTask, tone: 'accent' as const } : null,
      question.metadata?.textGenre ? { value: LITERATURE_TEXT_GENRE_LABELS[question.metadata.textGenre] || question.metadata.textGenre, tone: 'neutral' as const } : null,
    ].filter((label): label is { value: string; tone: 'primary' | 'accent' | 'neutral' } => label !== null),
  };
}
