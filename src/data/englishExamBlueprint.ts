export interface EnglishExamPartBlueprint {
  part: string;
  title: string;
  focus: string;
  commonQuestionForms: string[];
  answerModes: string[];
  importHint: string;
}

export const ENGLISH_EXAM_BLUEPRINT: EnglishExamPartBlueprint[] = [
  {
    part: 'Part I',
    title: 'Multiple Choice',
    focus: 'Grammar, vocabulary, pronunciation, stress, communication, and sign/notice reading.',
    commonQuestionForms: ['grammar', 'vocabulary', 'pronunciation', 'stress', 'communication', 'signs'],
    answerModes: ['single-choice'],
    importHint: 'Use metadata.englishTask to separate grammar, pronunciation, stress, and sign questions inside the same multiple-choice block.'
  },
  {
    part: 'Part II',
    title: 'Guided Cloze',
    focus: 'Choose the best option based on sentence context, collocations, and grammar clues around each blank.',
    commonQuestionForms: ['guided cloze', 'context clue', 'collocation'],
    answerModes: ['single-choice'],
    importHint: 'Set metadata.englishSkill = guided-cloze and keep each blank as a separate question when importing itemized banks.'
  },
  {
    part: 'Part III',
    title: 'Reading Comprehension',
    focus: 'True/False, main idea, detail, reference, and inference questions based on one passage.',
    commonQuestionForms: ['true/false', 'main idea', 'reference', 'detail'],
    answerModes: ['single-choice', 'multi-part', 'short-answer'],
    importHint: 'Mark the passage genre and task type so the UI can show whether the question is T/F or main-idea reading.'
  },
  {
    part: 'Part IV',
    title: 'Word Forms',
    focus: 'Build the correct noun, adjective, adverb, or verb form from the given root word.',
    commonQuestionForms: ['word form', 'part of speech', 'derivation'],
    answerModes: ['short-answer'],
    importHint: 'Store acceptable variants in correctAnswer and set englishTask = word-form for quick filtering.'
  },
  {
    part: 'Part V',
    title: 'Sentence Rearrangement',
    focus: 'Reorder jumbled words or phrases into a correct and meaningful sentence.',
    commonQuestionForms: ['rearrangement', 'ordering', 'sentence building'],
    answerModes: ['short-answer'],
    importHint: 'Use solutionSteps to show how the sentence should be built from subject to predicate and modifiers.'
  },
  {
    part: 'Part VI',
    title: 'Sentence Transformation',
    focus: 'Rewrite sentences while preserving meaning using tense shifts, reported speech, passive voice, and structural changes.',
    commonQuestionForms: ['rewrite', 'transformation', 'reported speech', 'passive'],
    answerModes: ['short-answer', 'multi-part'],
    importHint: 'Keep all accepted rewrites in correctAnswer and set englishTask = transformation for analysis and hints.'
  }
];

export const ENGLISH_TASK_LABELS: Record<string, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  pronunciation: 'Pronunciation',
  stress: 'Stress',
  'guided-cloze': 'Guided Cloze',
  'reading-true-false': 'Reading T/F',
  'reading-mcq': 'Reading MCQ',
  'word-form': 'Word Form',
  rearrangement: 'Sentence Rearrangement',
  transformation: 'Sentence Transformation',
  mixed: 'Mixed'
};

export const ENGLISH_SKILL_LABELS: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'guided-cloze': 'Guided Cloze',
  reading: 'Reading',
  'word-form': 'Word Form',
  rearrangement: 'Rearrangement',
  transformation: 'Transformation'
};

export const ENGLISH_ANSWER_MODE_LABELS: Record<string, string> = {
  'single-choice': 'Trắc nghiệm',
  'short-answer': 'Tự luận ngắn',
  'multi-part': 'Nhiều ý',
  proof: 'Chứng minh',
  numeric: 'Điền số',
  expression: 'Biểu thức'
};
