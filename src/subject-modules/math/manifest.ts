import type { SubjectModule } from '../contracts';

export const mathSubjectModule: SubjectModule = {
  subjectId: 'math',
  lang: 'vi-VN',
  supportsShortAnswer: true,
  tools: [
    { id: 'biki3d', title: 'Xưởng Toán Hình 3D', surface: 'learning-hall' },
    { id: 'bikiplane', title: 'Xưởng Toán Hình', surface: 'learning-hall' },
    { id: 'bikigraph', title: 'Xưởng Toán Đồ Thị', surface: 'learning-hall' },
  ],
  utilities: ['scratchpad'],
  activities: [
    {
      id: 'math-grammar',
      title: 'Ải Đại Số',
      categories: [],
      modeKey: 'grammar',
      label: 'Ải Đại Số',
      icon: 'BookOpen',
      topicIds: [
        'math-quadratic-function',
        'math-quadratic-equation',
        'math-vieta',
        'math-linear-system',
        'math-inequality',
        'math-radicals',
        'math-rational-expression'
      ]
    },
    {
      id: 'math-reading',
      title: 'Ải Hình Học',
      categories: [],
      modeKey: 'reading',
      label: 'Ải Hình Học',
      icon: 'Compass',
      topicIds: [
        'math-plane-geometry-circle',
        'math-plane-geometry-triangle',
        'math-plane-geometry-cyclic',
        'math-solid-geometry-volume',
        'math-solid-geometry-3d',
        'math-plane-geometry-coordinates'
      ]
    },
    {
      id: 'math-vocabulary',
      title: 'Ải Toán Thực Tế',
      categories: [],
      modeKey: 'vocabulary',
      label: 'Ải Toán Thực Tế',
      icon: 'BookMarked',
      topicIds: [
        'math-real-world-algebra',
        'math-real-world-percent',
        'math-statistics',
        'math-probability'
      ]
    }
  ]
};
