import type { SubjectModule } from '../contracts';

export const englishSubjectModule: SubjectModule = {
  subjectId: 'english',
  lang: 'en-US',
  supportsShortAnswer: false,
  miniGames: [
    { id: 'phrase-valley', surface: 'relaxation-park' },
    { id: 'conversation-town', surface: 'relaxation-park' },
    { id: 'writing-pavilion', surface: 'relaxation-park' },
    { id: 'listening-lake', surface: 'relaxation-park' },
  ],
  activities: [
    {
      id: 'eng-grammar',
      title: 'Grammar Cave',
      categories: [],
      modeKey: 'grammar',
      label: 'Grammar Cave',
      icon: 'BookOpen',
      topicIds: [
        'eng-grammar',
        'eng-passive-voice',
        'eng-relative-clauses',
        'eng-tenses',
        'eng-rewrite',
        'eng-conditional',
        'eng-reported-speech',
        'eng-gerund-infinitive',
        'eng-comparison',
        'eng-modal-verbs',
        'eng-wish-suggest',
        'eng-have-get-done'
      ]
    },
    {
      id: 'eng-reading',
      title: 'Reading Forest',
      categories: [],
      modeKey: 'reading',
      label: 'Reading Forest',
      icon: 'Compass',
      topicIds: [
        'eng-reading-passage',
        'eng-reading-cloze',
        'eng-reading-sign'
      ]
    },
    {
      id: 'eng-vocabulary',
      title: 'Vocabulary Castle',
      categories: [],
      modeKey: 'vocabulary',
      label: 'Vocabulary Castle',
      icon: 'BookMarked',
      topicIds: [
        'eng-word-form',
        'eng-vocabulary-topic',
        'eng-communication'
      ]
    },
    {
      id: 'eng-pronunciation',
      title: 'Pronunciation Peak',
      categories: [],
      modeKey: 'pronunciation',
      label: 'Pronunciation Peak',
      icon: 'Volume2',
      topicIds: [
        'eng-pronunciation',
        'eng-stress'
      ]
    }
  ]
};
