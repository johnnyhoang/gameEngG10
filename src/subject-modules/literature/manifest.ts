import { LITERATURE_EXAM_BLUEPRINT, LITERATURE_TASK_LABELS, LITERATURE_TEXT_GENRE_LABELS } from './blueprint';
import type { SubjectModule } from '../contracts';
import { assessLiteratureRubric } from './assessment';
import { presentLiteratureQuestion } from './presentation';

export const literatureSubjectModule: SubjectModule = {
  subjectId: 'literature',
  lang: 'vi-VN',
  supportsShortAnswer: true,
  activities: [
    {
      id: 'literature-reading',
      title: 'Đọc hiểu văn bản',
      categories: ['literature-reading-poetry', 'literature-reading-prose', 'literature-reading-argument'],
      legacyMode: 'reading',
      modeKey: 'reading',
      label: 'Ải Đọc Hiểu',
      icon: 'Compass',
      topicIds: ['lit-reading-poetry', 'lit-reading-prose']
    },
    {
      id: 'literature-vietnamese',
      title: 'Tiếng Việt',
      categories: ['literature-vietnamese'],
      legacyMode: 'grammar',
      modeKey: 'grammar',
      label: 'Ải Tiếng Việt',
      icon: 'BookOpen',
      topicIds: ['lit-rhetoric-device']
    },
    {
      id: 'literature-social-essay',
      title: 'Viết đoạn và bài nghị luận',
      categories: ['literature-writing'],
      legacyMode: 'vocabulary',
      modeKey: 'vocabulary',
      label: 'Ải Viết Nghị Luận',
      icon: 'BookMarked',
      topicIds: ['lit-social-essay']
    },
    {
      id: 'literature-literary-essay',
      title: 'Nghị luận văn học',
      categories: ['literature-writing'],
      legacyMode: 'mixed',
      modeKey: 'mixed',
      label: 'Ải Nghị Luận Văn Học',
      icon: 'Star',
      topicIds: ['lit-literary-essay']
    },
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
