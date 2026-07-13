import { LITERATURE_EXAM_BLUEPRINT, LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from './blueprint';
import type { SubjectModule } from '../contracts';
import { assessLiteratureRubric } from './assessment';
import { presentLiteratureQuestion } from './presentation';

export const literatureSubjectModule: SubjectModule = {
  subjectId: 'literature',
  activities: [
    { id: 'literature-reading', title: 'Đọc hiểu văn bản', categories: ['literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument'], legacyMode: 'reading' },
    { id: 'literature-vietnamese', title: 'Tiếng Việt', categories: ['literature-vietnamese'], legacyMode: 'grammar' },
    { id: 'literature-social-essay', title: 'Viết đoạn và bài nghị luận', categories: ['literature-writing'], legacyMode: 'vocabulary' },
    { id: 'literature-literary-essay', title: 'Nghị luận văn học', categories: ['literature-writing'], legacyMode: 'mixed' },
  ],
  questionPresentation: { present: presentLiteratureQuestion },
  questionMetadata: {
    getExamPartLabel: question => {
      const part = question.metadata?.examPart?.trim();
      if (!part) return null;
      const blueprint = LITERATURE_EXAM_BLUEPRINT.find(item => item.part === part);
      return blueprint ? `${part} - ${blueprint.title}` : part;
    },
    getTopicLabel: question => {
      const topic = question.metadata?.literatureTask;
      return topic ? LITERATURE_TASK_LABELS[topic] || topic : null;
    },
  },
  utilities: ['scratchpad'],
  getHint: ({ question }) => {
    const task = question.metadata?.literatureTask;
    if (!task) return null;
    if (task === 'social-essay') {
      const firstStep = question.metadata?.solutionSteps?.[0];
      return `Gợi ý: Bám bố cục nghị luận, dựng dàn ý rõ ràng${firstStep ? `, bắt đầu từ "${firstStep}"` : ''}.`;
    }
    const genre = question.metadata?.textGenre;
    const genreLabel = genre ? LITERATURE_TEXT_GENRE_LABELS[genre] || genre : '';
    const taskLabel = LITERATURE_TASK_LABELS[task] || task;
    return `Gợi ý${genreLabel ? ` (${genreLabel})` : ''}: Tập trung vào ý ${taskLabel.toLowerCase()} và nêu đúng chi tiết trọng tâm.`;
  },
  assessmentProviders: [{
    id: 'literature-rubric',
    matches: question => question.category === 'literature-writing',
    assess: assessLiteratureRubric,
  }],
};
