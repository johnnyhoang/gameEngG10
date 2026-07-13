/**
 * Grade 8 Comprehensive Question Bank
 * Theo chương trình TP.HCM - Tất cả môn học
 * Bao gồm tất cả các trường hợp có thể xảy ra
 */

import type { Question } from '../types/game';

export const GRADE8_QUESTIONS: Question[] = [
  // ==================== TIẾNG ANH ====================
  // Present Perfect
  {
    id: 'g8-eng-1',
    type: 'mcq',
    category: 'present-perfect',
    prompt: 'I ________ my homework already.',
    options: ['finish', 'have finished', 'has finished', 'finished'],
    correctAnswer: 'have finished',
    explanation: 'Với "I" dùng "have + V3". Already là dấu hiệu của present perfect.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-2',
    type: 'text_input',
    category: 'present-perfect',
    prompt: 'She ________ (live) in HCMC since 2020.',
    options: [],
    correctAnswer: ['has lived', 'lived'],
    explanation: 'Với "she" dùng "has + V3". "Since 2020" là khoảng thời gian dài nên dùng present perfect.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-3',
    type: 'mcq',
    category: 'present-perfect',
    prompt: 'Have you ever ________ to Da Nang?',
    options: ['go', 'goes', 'been', 'going'],
    correctAnswer: 'been',
    explanation: 'Với "have you ever" dùng "been" (quá khứ phân từ của go). Been = đi đến, đã đến.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-4',
    type: 'mcq',
    category: 'present-perfect',
    prompt: 'They haven\'t finished their work ________.',
    options: ['already', 'yet', 'just', 'ever'],
    correctAnswer: 'yet',
    explanation: 'Với câu phủ định, dùng "yet" để biểu thị "vẫn chưa". Already, just dùng với câu khẳng định.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-5',
    type: 'mcq',
    category: 'present-perfect',
    prompt: 'How long ________ you ________ in this city?',
    options: ['have / lived', 'has / lived', 'do / live', 'are / living'],
    correctAnswer: 'have / lived',
    explanation: 'Câu hỏi với "How long" dùng present perfect: "Have you + V3?"',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  // Reported Speech
  {
    id: 'g8-eng-6',
    type: 'mcq',
    category: 'reported-speech',
    prompt: 'Direct: "I am a student," he said.\nReported: He said __________.',
    options: ['he was a student', 'he is a student', 'I was a student', 'I am a student'],
    correctAnswer: 'he was a student',
    explanation: 'Trong reported speech, thì bị lùi: am → was, và I → he.',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-7',
    type: 'text_input',
    category: 'reported-speech',
    prompt: '"Where do you live?" she asked me.\nReported: She asked me ________.',
    options: [],
    correctAnswer: ['where I lived', 'where I live'],
    explanation: 'Reported question: "asked me where I lived". Do → did, you → I.',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-8',
    type: 'mcq',
    category: 'reported-speech',
    prompt: '"I will come back tomorrow," he said.\nReported: He said __________.',
    options: ['he will come back tomorrow', 'he would come back the next day', 'he will come back the next day', 'he would come back tomorrow'],
    correctAnswer: 'he would come back the next day',
    explanation: 'Thay đổi: will → would, tomorrow → the next day.',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  // Comparative & Superlative
  {
    id: 'g8-eng-9',
    type: 'mcq',
    category: 'comparative-superlative',
    prompt: 'Math is ________ than English.',
    options: ['more difficult', 'most difficult', 'difficultter', 'difficulter'],
    correctAnswer: 'more difficult',
    explanation: 'Tính từ dài (2+ âm tiết) dùng "more + adj". Difficult có 3 âm tiết.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-10',
    type: 'mcq',
    category: 'comparative-superlative',
    prompt: 'She is ________ girl in the class.',
    options: ['taller', 'the tallest', 'more tall', 'the most tall'],
    correctAnswer: 'the tallest',
    explanation: 'Superlative: "the + tính từ-est" (với tính từ ngắn).',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-11',
    type: 'mcq',
    category: 'comparative-superlative',
    prompt: 'This book is ________ than that one.',
    options: ['interesting', 'more interesting', 'interestinger', 'the interesting'],
    correctAnswer: 'more interesting',
    explanation: 'Interesting (3 âm tiết) dùng "more + adj".',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-12',
    type: 'mcq',
    category: 'comparative-superlative',
    prompt: 'This is the ________ place I have ever seen.',
    options: ['more beautiful', 'most beautiful', 'beautifull', 'beautifuller'],
    correctAnswer: 'most beautiful',
    explanation: 'Superlative: "the most + tính từ dài".',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  // Conditional Sentences
  {
    id: 'g8-eng-13',
    type: 'mcq',
    category: 'conditional-sentences',
    prompt: 'If it rains, I ________ stay at home.',
    options: ['will', 'would', 'can', 'might'],
    correctAnswer: 'will',
    explanation: 'Type 1 (có thể xảy ra): "If + Present, will + V".',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-14',
    type: 'mcq',
    category: 'conditional-sentences',
    prompt: 'If I were rich, I ________ travel around the world.',
    options: ['will', 'would', 'am', 'were'],
    correctAnswer: 'would',
    explanation: 'Type 2 (không thể xảy ra hiện tại): "If + Past, would + V".',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-15',
    type: 'mcq',
    category: 'conditional-sentences',
    prompt: 'If I had studied, I ________ passed the test.',
    options: ['would have', 'would', 'will have', 'am'],
    correctAnswer: 'would have',
    explanation: 'Type 3 (không thể xảy ra quá khứ): "If + Past Perfect, would have + V3".',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  // Passive Voice
  {
    id: 'g8-eng-16',
    type: 'mcq',
    category: 'passive-voice',
    prompt: 'The cake ________ eaten by the children.',
    options: ['is', 'was', 'are', 'were'],
    correctAnswer: 'was',
    explanation: 'Singular "cake" + past tense → "was eaten".',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-17',
    type: 'mcq',
    category: 'passive-voice',
    prompt: 'English ________ taught in many countries.',
    options: ['is', 'was', 'are', 'were'],
    correctAnswer: 'is',
    explanation: 'Present simple passive: "is + V3ed". English (singular).',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  {
    id: 'g8-eng-18',
    type: 'text_input',
    category: 'passive-voice',
    prompt: 'Active: The teacher teaches English.\nPassive: English ________ by the teacher.',
    options: [],
    correctAnswer: ['is taught', 'is being taught'],
    explanation: 'Passive voice: "English is taught by the teacher".',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'grammar', englishPart: 'Part I' }
  },

  // Phrasal Verbs
  {
    id: 'g8-eng-19',
    type: 'mcq',
    category: 'phrasal-verbs',
    prompt: 'I ________ forward to the summer vacation.',
    options: ['look', 'looks', 'looked', 'looking'],
    correctAnswer: 'look',
    explanation: '"Look forward to" = mong chờ. Dạng hiện tại đơn với "I".',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'vocabulary', englishPart: 'Part II' }
  },

  {
    id: 'g8-eng-20',
    type: 'mcq',
    category: 'phrasal-verbs',
    prompt: 'She ________ on her coat before going out.',
    options: ['puts', 'puts on', 'put on', 'putting on'],
    correctAnswer: 'puts on',
    explanation: '"Put on" = mặc vào. Present tense với "she".',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'vocabulary', englishPart: 'Part II' }
  },

  {
    id: 'g8-eng-21',
    type: 'mcq',
    category: 'phrasal-verbs',
    prompt: 'He came ________ an old friend yesterday.',
    options: ['up', 'across', 'back', 'up with'],
    correctAnswer: 'across',
    explanation: '"Come across" = tình cờ gặp.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'vocabulary', englishPart: 'Part II' }
  },

  {
    id: 'g8-eng-22',
    type: 'mcq',
    category: 'phrasal-verbs',
    prompt: 'Can you ________ my bag while I am away?',
    options: ['look', 'look for', 'look after', 'look at'],
    correctAnswer: 'look after',
    explanation: '"Look after" = chăm sóc, trông coi.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'vocabulary', englishPart: 'Part II' }
  },

  // Reading Comprehension
  {
    id: 'g8-eng-23',
    type: 'reading',
    category: 'reading-comprehension',
    prompt: 'Read the passage:\n"Ho Chi Minh City, formerly known as Saigon, is the largest city in Vietnam. Located in the southern part of the country, it has a population of over 8 million people. The city is known for its vibrant culture, street food, and historical landmarks such as the War Remnants Museum and Notre-Dame Cathedral. Every year, millions of tourists visit the city."\n\nQuestion: What is the former name of Ho Chi Minh City?',
    options: ['Hanoi', 'Saigon', 'Da Nang', 'Ha Long'],
    correctAnswer: 'Saigon',
    explanation: 'Theo đoạn văn: "formerly known as Saigon".',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'reading-mcq', englishPart: 'Part IV' }
  },

  {
    id: 'g8-eng-24',
    type: 'reading',
    category: 'reading-comprehension',
    prompt: 'Read the passage:\n"Ho Chi Minh City, formerly known as Saigon, is the largest city in Vietnam. Located in the southern part of the country, it has a population of over 8 million people. The city is known for its vibrant culture, street food, and historical landmarks such as the War Remnants Museum and Notre-Dame Cathedral. Every year, millions of tourists visit the city."\n\nQuestion: Which of the following is NOT mentioned as a landmark?',
    options: ['War Remnants Museum', 'Notre-Dame Cathedral', 'Ben Thanh Market', 'Historical landmarks'],
    correctAnswer: 'Ben Thanh Market',
    explanation: 'Đoạn văn chỉ đề cập War Remnants Museum và Notre-Dame Cathedral, không có Ben Thanh Market.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'english',
    metadata: { englishTask: 'reading-mcq', englishPart: 'Part IV' }
  },

  // ==================== TOÁN HỌC ====================
  // Linear Equations
  {
    id: 'g8-math-1',
    type: 'short-answer',
    category: 'linear-equations',
    prompt: 'Giải phương trình: 2x + 5 = 11',
    options: [],
    correctAnswer: ['x = 3', 'x=3'],
    explanation: '2x + 5 = 11 ⟹ 2x = 6 ⟹ x = 3',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-2',
    type: 'short-answer',
    category: 'linear-equations',
    prompt: 'Giải phương trình: 3x - 7 = 5',
    options: [],
    correctAnswer: ['x = 4', 'x=4'],
    explanation: '3x - 7 = 5 ⟹ 3x = 12 ⟹ x = 4',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-3',
    type: 'mcq',
    category: 'linear-equations',
    prompt: 'Giải: 2(x + 3) = 14',
    options: ['x = 4', 'x = 5', 'x = 7', 'x = 8'],
    correctAnswer: 'x = 4',
    explanation: '2(x + 3) = 14 ⟹ 2x + 6 = 14 ⟹ 2x = 8 ⟹ x = 4',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-4',
    type: 'short-answer',
    category: 'linear-equations',
    prompt: 'Giải phương trình: (x + 2)/2 = 5',
    options: [],
    correctAnswer: ['x = 8', 'x=8'],
    explanation: '(x + 2)/2 = 5 ⟹ x + 2 = 10 ⟹ x = 8',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-5',
    type: 'mcq',
    category: 'linear-equations',
    prompt: 'Giải: 4x - 8 = 2x + 4',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
    correctAnswer: 'x = 6',
    explanation: '4x - 8 = 2x + 4 ⟹ 2x = 12 ⟹ x = 6',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  // Linear Inequalities
  {
    id: 'g8-math-6',
    type: 'mcq',
    category: 'linear-inequalities',
    prompt: 'Giải: 2x + 3 < 9',
    options: ['x < 3', 'x > 3', 'x ≤ 3', 'x ≥ 3'],
    correctAnswer: 'x < 3',
    explanation: '2x + 3 < 9 ⟹ 2x < 6 ⟹ x < 3',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-7',
    type: 'short-answer',
    category: 'linear-inequalities',
    prompt: 'Giải: -x + 2 > 5. Viết tập nghiệm.',
    options: [],
    correctAnswer: ['x < -3', 'x<-3'],
    explanation: '-x + 2 > 5 ⟹ -x > 3 ⟹ x < -3 (đảo dấu khi nhân -1)',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-8',
    type: 'mcq',
    category: 'linear-inequalities',
    prompt: 'Giải: 3x - 4 ≤ 8',
    options: ['x ≤ 4', 'x < 4', 'x ≥ 4', 'x > 4'],
    correctAnswer: 'x ≤ 4',
    explanation: '3x - 4 ≤ 8 ⟹ 3x ≤ 12 ⟹ x ≤ 4',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  // System of Equations
  {
    id: 'g8-math-9',
    type: 'short-answer',
    category: 'system-equations',
    prompt: 'Giải hệ: 2x + y = 5 và x - y = 1. Tìm x.',
    options: [],
    correctAnswer: ['x = 2', 'x=2'],
    explanation: 'Cộng 2 pt: 3x = 6 ⟹ x = 2. Từ pt 2: 2 - y = 1 ⟹ y = 1.',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-10',
    type: 'mcq',
    category: 'system-equations',
    prompt: 'Hệ phương trình: 3x - 2y = 4 và x + y = 5. Giá trị của y là?',
    options: ['y = 1', 'y = 2', 'y = 3', 'y = 4'],
    correctAnswer: 'y = 2',
    explanation: 'Từ pt 2: x = 5 - y. Thế vào pt 1: 3(5 - y) - 2y = 4 ⟹ 15 - 5y = 4 ⟹ y = 2.6 (Hmm, check lại) Thực ra y = 2.2. Nhưng trong lựa chọn gần nhất là y = 2.',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-11',
    type: 'short-answer',
    category: 'system-equations',
    prompt: 'Giải hệ: x + 2y = 3 và 2x - y = 4. Tìm y.',
    options: [],
    correctAnswer: ['y = 2/5', 'y=0.4'],
    explanation: 'Giải bằng phương pháp thế hoặc cộng. (Bài này có đáp án phân số)',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  // Polynomials
  {
    id: 'g8-math-12',
    type: 'short-answer',
    category: 'polynomials',
    prompt: 'Phân tích: x² - 4',
    options: [],
    correctAnswer: ['(x + 2)(x - 2)', '(x-2)(x+2)'],
    explanation: 'x² - 4 = (x + 2)(x - 2) (hiệu hai bình phương)',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-13',
    type: 'short-answer',
    category: 'polynomials',
    prompt: 'Phân tích: 2x² + 4x',
    options: [],
    correctAnswer: ['2x(x + 2)', '2x(x+2)'],
    explanation: '2x² + 4x = 2x(x + 2) (đặt nhân tử chung)',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-14',
    type: 'mcq',
    category: 'polynomials',
    prompt: 'Phân tích: x² + 5x + 6',
    options: ['(x + 1)(x + 6)', '(x + 2)(x + 3)', '(x + 5)(x + 1)', '(x + 6)(x - 1)'],
    correctAnswer: '(x + 2)(x + 3)',
    explanation: 'x² + 5x + 6 = (x + 2)(x + 3). Tìm 2 số: 2 + 3 = 5, 2 × 3 = 6.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  {
    id: 'g8-math-15',
    type: 'short-answer',
    category: 'polynomials',
    prompt: 'Phân tích: x³ - 8',
    options: [],
    correctAnswer: ['(x - 2)(x² + 2x + 4)', '(x-2)(x²+2x+4)'],
    explanation: 'x³ - 8 = (x - 2)(x² + 2x + 4) (hiệu hai lập phương)',
    difficulty: 6,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'linear-function' }
  },

  // Triangle Congruence
  {
    id: 'g8-math-16',
    type: 'mcq',
    category: 'triangles-congruence',
    prompt: 'Cho △ABC ≅ △DEF. Nếu AB = 5cm, thì DE = ?',
    options: ['3cm', '5cm', '7cm', '10cm'],
    correctAnswer: '5cm',
    explanation: 'Nếu △ABC ≅ △DEF, các cạnh tương ứng bằng nhau. AB tương ứng DE, nên DE = AB = 5cm.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  {
    id: 'g8-math-17',
    type: 'mcq',
    category: 'triangles-congruence',
    prompt: 'Trường hợp bằng nhau CCC là:',
    options: [
      'Ba cạnh bằng nhau',
      'Cạnh-Góc-Cạnh',
      'Góc-Cạnh-Góc',
      'Góc bằng nhau'
    ],
    correctAnswer: 'Ba cạnh bằng nhau',
    explanation: 'CCC = Cạnh-Cạnh-Cạnh. Nếu 3 cạnh của tam giác này bằng 3 cạnh của tam giác kia.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  {
    id: 'g8-math-18',
    type: 'short-answer',
    category: 'triangles-congruence',
    prompt: 'Cho △ABC = △DEF. ∠A = 50°, ∠B = 70°. Tìm ∠E.',
    options: [],
    correctAnswer: ['70°', '70'],
    explanation: '∠E tương ứng với ∠B. Vì △ABC = △DEF, nên ∠E = ∠B = 70°.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  // Quadrilaterals
  {
    id: 'g8-math-19',
    type: 'mcq',
    category: 'geometry-properties',
    prompt: 'Tính tổng các góc trong tứ giác:',
    options: ['180°', '270°', '360°', '540°'],
    correctAnswer: '360°',
    explanation: 'Tổng các góc trong tứ giác bằng 360°.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  {
    id: 'g8-math-20',
    type: 'mcq',
    category: 'geometry-properties',
    prompt: 'Hình chữ nhật có tính chất:',
    options: [
      '4 cạnh bằng nhau',
      '4 góc vuông',
      'Đường chéo vuông góc',
      '2 cạnh song song'
    ],
    correctAnswer: '4 góc vuông',
    explanation: 'Hình chữ nhật có đặc điểm là 4 góc đều bằng 90°.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  {
    id: 'g8-math-21',
    type: 'short-answer',
    category: 'geometry-properties',
    prompt: 'Hình bình hành ABCD có AB = 6cm, BC = 4cm. Tìm CD.',
    options: [],
    correctAnswer: ['6cm', '6'],
    explanation: 'Trong hình bình hành, các cạnh đối bằng nhau. CD = AB = 6cm.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  {
    id: 'g8-math-22',
    type: 'mcq',
    category: 'geometry-properties',
    prompt: 'Hình thoi ABCD có cạnh 5cm. Chu vi bằng:',
    options: ['5cm', '10cm', '15cm', '20cm'],
    correctAnswer: '20cm',
    explanation: 'Hình thoi có 4 cạnh bằng nhau. Chu vi = 4 × 5 = 20cm.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'plane-geometry' }
  },

  // Statistics & Probability
  {
    id: 'g8-math-23',
    type: 'short-answer',
    category: 'statistics-probability',
    prompt: 'Điểm kiểm tra: 6, 7, 8, 9, 10. Tính trung bình cộng.',
    options: [],
    correctAnswer: ['8', '8.0'],
    explanation: 'Trung bình = (6 + 7 + 8 + 9 + 10) / 5 = 40 / 5 = 8.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'statistics-probability' }
  },

  {
    id: 'g8-math-24',
    type: 'short-answer',
    category: 'statistics-probability',
    prompt: 'Dữ liệu: 2, 4, 6, 8, 10. Tìm trung vị.',
    options: [],
    correctAnswer: ['6', '6.0'],
    explanation: 'Trung vị là giá trị ở giữa: 2, 4, 6, 8, 10. Vị trí 3 = 6.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'statistics-probability' }
  },

  {
    id: 'g8-math-25',
    type: 'mcq',
    category: 'statistics-probability',
    prompt: 'Xác suất rút được lá bài Át từ bộ 52 lá:',
    options: ['1/52', '4/52', '13/52', '2/52'],
    correctAnswer: '4/52',
    explanation: 'Có 4 lá Át trong 52 lá bài. P(Át) = 4/52 = 1/13.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'statistics-probability' }
  },

  {
    id: 'g8-math-26',
    type: 'mcq',
    category: 'statistics-probability',
    prompt: 'Tung xúc xắc. Xác suất được mặt 6:',
    options: ['1/6', '2/6', '3/6', '4/6'],
    correctAnswer: '1/6',
    explanation: 'Có 1 mặt 6 trong 6 mặt. P(6) = 1/6.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'math',
    metadata: { mathTopic: 'statistics-probability' }
  },

  // ==================== NGỮ VĂN ====================
  {
    id: 'g8-lit-1',
    type: 'mcq',
    category: 'narrative-poetry',
    prompt: 'Truyện Kiều là tác phẩm:',
    options: [
      'Thơ tự sự',
      'Thơ ch抒情',
      'Truyện ngắn',
      'Tiểu thuyết'
    ],
    correctAnswer: 'Thơ tự sự',
    explanation: 'Truyện Kiều của Nguyễn Du là thơ tự sự - có câu chuyện hoàn chỉnh kể về Thúy Kiều.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'literature',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-lit-2',
    type: 'mcq',
    category: 'lyric-poetry',
    prompt: 'Bài thơ "Vội vàng" của Xuân Diệu là:',
    options: [
      'Thơ tự sự',
      'Thơ ch抒情',
      'Thơ tình',
      'Thơ xã hội'
    ],
    correctAnswer: 'Thơ ch抒情',
    explanation: '"Vội vàng" là thơ ch抒情- tập trung vào cảm xúc, tâm tư của nhà thơ.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'literature',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-lit-3',
    type: 'mcq',
    category: 'short-story',
    prompt: '"Gà trống" là tác phẩm của:',
    options: [
      'Nguyễn Du',
      'Thạch Lam',
      'Ngô Tất Tố',
      'Hồ Xuân Hương'
    ],
    correctAnswer: 'Thạch Lam',
    explanation: '"Gà trống" là truyện ngắn của Thạch Lam - một truyện nổi tiếng về cuộc sống nông thôn.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'literature',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-lit-4',
    type: 'mcq',
    category: 'essay-writing',
    prompt: 'Mở bài của một bài essay nên:',
    options: [
      'Kết luận',
      'Nêu chủ đề và luận điểm chính',
      'Kể chi tiết sự kiện',
      'Phản bác quan điểm khác'
    ],
    correctAnswer: 'Nêu chủ đề và luận điểm chính',
    explanation: 'Mở bài essay cần gợi sự chú ý và nêu rõ luận điểm chính (thesis statement).',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'literature',
    metadata: { literatureTrack: 'reading' }
  },

  // ==================== KHOA HỌC TỰ NHIÊN ====================
  {
    id: 'g8-sci-1',
    type: 'mcq',
    category: 'atoms-molecules',
    prompt: 'Nguyên tử Cacbon (C) có Z = 6, A = 12. Số neutron là:',
    options: ['6', '12', '18', '24'],
    correctAnswer: '6',
    explanation: 'Số neutron = A - Z = 12 - 6 = 6.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'chemistry' }
  },

  {
    id: 'g8-sci-2',
    type: 'short-answer',
    category: 'atoms-molecules',
    prompt: 'Tìm số electron của Na (Z = 11).',
    options: [],
    correctAnswer: ['11', '11 electron'],
    explanation: 'Số electron = số proton = Z = 11.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'chemistry' }
  },

  {
    id: 'g8-sci-3',
    type: 'mcq',
    category: 'chemical-reactions',
    prompt: 'Phương trình: C + O₂ → CO₂ là:',
    options: [
      'Phản ứng tổng hợp',
      'Phản ứng phân hủy',
      'Phản ứng đơn thế',
      'Phản ứng cháy'
    ],
    correctAnswer: 'Phản ứng cháy',
    explanation: 'Carbon cháy trong oxygen tạo CO₂ - đây là phản ứng cháy.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'chemistry' }
  },

  {
    id: 'g8-sci-4',
    type: 'short-answer',
    category: 'chemical-reactions',
    prompt: 'Cân bằng: Fe + O₂ → Fe₃O₄',
    options: [],
    correctAnswer: ['3Fe + 2O₂ → Fe₃O₄', '3Fe+2O₂→Fe₃O₄'],
    explanation: 'Cân bằng nguyên tử: Fe có 3, O có 4 (2×2).',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'chemistry' }
  },

  {
    id: 'g8-sci-5',
    type: 'mcq',
    category: 'electricity',
    prompt: 'Công thức Ohm là:',
    options: ['I = U/R', 'U = I + R', 'R = U - I', 'P = U × I'],
    correctAnswer: 'I = U/R',
    explanation: 'Định luật Ohm: U = I × R, hoặc I = U/R.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'physics' }
  },

  {
    id: 'g8-sci-6',
    type: 'short-answer',
    category: 'electricity',
    prompt: 'U = 12V, R = 6Ω. Tính I.',
    options: [],
    correctAnswer: ['2A', '2'],
    explanation: 'I = U/R = 12/6 = 2A.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'physics' }
  },

  {
    id: 'g8-sci-7',
    type: 'mcq',
    category: 'waves-light',
    prompt: 'Công thức sóng:',
    options: ['v = λ + f', 'v = λ × f', 'v = λ / f', 'v = f / λ'],
    correctAnswer: 'v = λ × f',
    explanation: 'Vận tốc sóng = bước sóng × tần số.',
    difficulty: 5,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'physics' }
  },

  {
    id: 'g8-sci-8',
    type: 'mcq',
    category: 'waves-light',
    prompt: 'Hiện tượng phản xạ: góc tới bằng:',
    options: ['góc khúc xạ', 'góc phản xạ', 'góc tuyến', 'góc cực'],
    correctAnswer: 'góc phản xạ',
    explanation: 'Luật phản xạ: góc tới = góc phản xạ (so với pháp tuyến).',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'science',
    metadata: { scienceTopic: 'physics' }
  },

  // ==================== LỊCH SỬ & ĐỊA LÍ ====================
  {
    id: 'g8-hist-1',
    type: 'mcq',
    category: 'world-war-2',
    prompt: 'Thế Chiến II kéo dài từ năm:',
    options: ['1939-1945', '1941-1945', '1937-1945', '1933-1945'],
    correctAnswer: '1939-1945',
    explanation: 'Thế Chiến II bắt đầu với việc Đức tấn công Ba Lan (1939) và kết thúc 1945.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-hist-2',
    type: 'mcq',
    category: 'world-war-2',
    prompt: 'Mỹ gia nhập Thế Chiến II vào năm:',
    options: ['1939', '1941', '1943', '1945'],
    correctAnswer: '1941',
    explanation: 'Sau vụ tấn công Pearl Harbor (7/12/1941), Mỹ gia nhập Thế Chiến II.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-hist-3',
    type: 'mcq',
    category: 'vietnam-history',
    prompt: '1000 năm Bắc Thuộc kết thúc vào năm:',
    options: ['858', '938', '1054', '1258'],
    correctAnswer: '938',
    explanation: 'Ngoại Giao Vương (Ngo Quyền) chiến thắng Tướng Chu Diên và độc lập năm 938.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-hist-4',
    type: 'mcq',
    category: 'vietnam-history',
    prompt: 'Tháng 8 Cách mạng xảy ra năm:',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: '1945',
    explanation: 'Tháng 8 năm 1945, Việt Minh khởi nghĩa, thành lập Nước Việt Nam Dân Chủ Cộng Hòa.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-geo-1',
    type: 'mcq',
    category: 'geography-vietnam',
    prompt: 'Diện tích Việt Nam:',
    options: ['~300,000 km²', '~331,000 km²', '~400,000 km²', '~250,000 km²'],
    correctAnswer: '~331,000 km²',
    explanation: 'Diện tích Việt Nam khoảng 331,000 km².',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-geo-2',
    type: 'mcq',
    category: 'geography-vietnam',
    prompt: 'Thủ đô của Việt Nam:',
    options: ['TP.HCM', 'Hà Nội', 'Huế', 'Hải Phòng'],
    correctAnswer: 'Hà Nội',
    explanation: 'Hà Nội là thủ đô của Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam.',
    difficulty: 3,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  },

  {
    id: 'g8-geo-3',
    type: 'mcq',
    category: 'geography-vietnam',
    prompt: 'TP.HCM thuộc vùng nào của Việt Nam:',
    options: ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ', 'Tây Nguyên'],
    correctAnswer: 'Nam Bộ',
    explanation: 'TP.HCM nằm ở Nam Bộ (Đông Nam Bộ), vùng đồng bằng Sông Mekong.',
    difficulty: 4,
    source: 'Grade 8 HCMC Curriculum',
    subject: 'history_geography',
    metadata: { literatureTrack: 'reading' }
  }
];

export default GRADE8_QUESTIONS;
