import type { Question } from '../types/game';

export const INITIAL_QUESTIONS: Question[] = [
  // 1. Word Form (HCMC High-Yield Focus)
  {
    id: 'wf-1',
    type: 'wordform',
    category: 'wordform',
    prompt: 'She is a very ________ writer who has published ten books. (IMAGINE)',
    correctAnswer: ['imaginative'],
    explanation: 'Dùng tính từ "imaginative" (giàu trí tưởng tượng) để bổ nghĩa cho danh từ "writer".',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'wf-2',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The noise of the street is extremely ________ for his study. (DISRUPT)',
    correctAnswer: ['disruptive'],
    explanation: 'Dùng tính từ "disruptive" (gây gián đoạn, phiền phức) sau trạng từ "extremely" và động từ tobe "is".',
    difficulty: 7,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'wf-3',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Parents should encourage their children to act ________. (DEPEND)',
    correctAnswer: ['independently'],
    explanation: 'Dùng trạng từ "independently" (một cách độc lập) để bổ nghĩa cho động từ "act".',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'wf-4',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Many students find the teacher’s explanation very ________. (INFORM)',
    correctAnswer: ['informative'],
    explanation: 'Cấu trúc "find something + adj". "Informative" có nghĩa là cung cấp nhiều thông tin bổ ích.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 'wf-5',
    type: 'wordform',
    category: 'wordform',
    prompt: 'There is a ________ difference between the two versions. (SIGNIFY)',
    correctAnswer: ['significant'],
    explanation: 'Dùng tính từ "significant" (đáng kể) đứng trước danh từ "difference".',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 'wf-6',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The sudden system failure was completely ________. (EXPECT)',
    correctAnswer: ['unexpected'],
    explanation: 'Dùng tính từ "unexpected" (không mong đợi, bất ngờ) sau trạng từ "completely".',
    difficulty: 6,
    source: 'Specialized 2026 Mock Exam'
  },

  // 2. Passive Voice
  {
    id: 'pv-1',
    type: 'mcq',
    category: 'passive-voice',
    prompt: 'The new bridge ________ by the time the governor arrives next month.',
    options: [
      'will have been completed',
      'will be completed',
      'has been completed',
      'is completed'
    ],
    correctAnswer: 'will have been completed',
    explanation: 'Cấu trúc tương lai hoàn thành bị động: "will have been + V3/ed" đi với trạng ngữ chỉ thời gian "by the time + hiện tại đơn".',
    difficulty: 7,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'pv-2',
    type: 'mcq',
    category: 'passive-voice',
    prompt: 'It is reported that the criminal ________ by the local police yesterday.',
    options: [
      'was arrested',
      'had arrested',
      'is arrested',
      'has arrested'
    ],
    correctAnswer: 'was arrested',
    explanation: 'Sử dụng thể bị động ở quá khứ đơn vì có trạng từ "yesterday".',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 'pv-3',
    type: 'rewrite',
    category: 'passive-voice',
    prompt: 'They believe that the storm caused severe damage to the coastal area. (Rewrite starting with: "The storm...")',
    correctAnswer: [
      'The storm is believed to have caused severe damage to the coastal area.',
      'The storm is believed to cause severe damage to the coastal area'
    ],
    explanation: 'Cấu trúc bị động khách quan: "S2 + is/are + believed + to have V3" khi hành động tin ở hiện tại và hành động gây ra ở quá khứ.',
    difficulty: 8,
    source: 'Specialized 2026 Mock Exam'
  },

  // 3. Relative Clauses
  {
    id: 'rc-1',
    type: 'mcq',
    category: 'relative-clauses',
    prompt: 'The woman ________ son won the first prize in the English competition is my colleague.',
    options: ['whose', 'whom', 'who', 'that'],
    correctAnswer: 'whose',
    explanation: 'Dùng đại từ quan hệ chỉ sở hữu "whose" thay cho danh từ chỉ người đứng trước "The woman" để chỉ con trai của cô ấy.',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'rc-2',
    type: 'mcq',
    category: 'relative-clauses',
    prompt: 'The laboratory in ________ we conducted our chemistry experiments has been renovated.',
    options: ['which', 'where', 'whom', 'that'],
    correctAnswer: 'which',
    explanation: 'Sau giới từ "in" dùng đại từ quan hệ "which" thay cho danh từ chỉ vật "The laboratory". Không dùng "where" sau giới từ.',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 'rc-3',
    type: 'rewrite',
    category: 'relative-clauses',
    prompt: 'The teacher who coordinates the English department is extremely dedicated. (Rewrite using a participle phrase instead of a relative clause)',
    correctAnswer: [
      'The teacher coordinating the English department is extremely dedicated.',
      'The teacher coordinating the English department is dedicated.'
    ],
    explanation: 'Rút gọn mệnh đề quan hệ chủ động bằng cách chuyển động từ thành dạng V-ing.',
    difficulty: 7,
    source: 'Specialized 2026 Mock Exam'
  },

  // 4. Tenses & Verb Patterns
  {
    id: 't-1',
    type: 'mcq',
    category: 'tenses',
    prompt: 'By the time I reached the cinema, the movie ________ for fifteen minutes.',
    options: [
      'had been running',
      'has been running',
      'was running',
      'ran'
    ],
    correctAnswer: 'had been running',
    explanation: 'Thì Quá khứ hoàn thành tiếp diễn nhấn mạnh tính liên tục của hành động xảy ra trước một hành động khác trong quá khứ.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 't-2',
    type: 'mcq',
    category: 'tenses',
    prompt: 'I remember ________ to that museum once when I was a child.',
    options: ['being taken', 'taking', 'to take', 'to be taken'],
    correctAnswer: 'being taken',
    explanation: 'Cấu trúc "remember + V-ing" (nhớ đã làm gì). Trong trường hợp này là thể bị động "being taken" (được đưa đi).',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 't-3',
    type: 'rewrite',
    category: 'tenses',
    prompt: 'The last time she visited her hometown was three years ago. (Rewrite starting with: "She has...")',
    correctAnswer: [
      'She has not visited her hometown for three years.',
      'She has not visited her hometown since three years ago.',
      "She hasn't visited her hometown for three years."
    ],
    explanation: 'Chuyển đổi từ quá khứ đơn sang hiện tại hoàn thành phủ định: "S + has not + V3 + for + time".',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },

  // 5. Stress & Pronunciation
  {
    id: 'pr-1',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others.',
    options: ['liked', 'washed', 'played', 'stopped'],
    correctAnswer: 'played',
    explanation: 'Đuôi "-ed" của "played" phát âm là /d/, còn các từ khác phát âm là /t/.',
    difficulty: 3,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'pr-2',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Choose the word whose underlined part is pronounced differently from the others.',
    options: ['threat', 'breath', 'heather', 'health'],
    correctAnswer: 'heather',
    explanation: 'Nguyên âm "ea" của "heather" phát âm là /e/ nhưng có phụ âm /ð/, các từ khác phát âm âm cuối là /θ/.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2025'
  },
  {
    id: 'st-1',
    type: 'mcq',
    category: 'stress',
    prompt: 'Choose the word whose main stress is placed differently from the others.',
    options: ['agree', 'visit', 'allow', 'decide'],
    correctAnswer: 'visit',
    explanation: '"visit" nhấn âm 1 (/ˈvɪz.ɪt/), các từ còn lại nhấn âm 2.',
    difficulty: 3,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'st-2',
    type: 'mcq',
    category: 'stress',
    prompt: 'Choose the word whose main stress is placed differently from the others.',
    options: ['academic', 'representative', 'satisfactory', 'responsibility'],
    correctAnswer: 'responsibility',
    explanation: '"responsibility" nhấn âm 5, các từ còn lại nhấn âm 3.',
    difficulty: 7,
    source: 'HCMC Entrance Exam 2025'
  },

  // 6. Vocabulary & Expressions
  {
    id: 'vc-1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'The government decided to ________ the historical monument after it was damaged in the storm.',
    options: ['restore', 'replace', 'renovate', 'repeat'],
    correctAnswer: 'restore',
    explanation: '"restore" nghĩa là phục chế, trùng tu di tích lịch sử trở lại trạng thái cũ.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'vc-2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Due to severe weather conditions, the flight was delayed ________ notice.',
    options: ['until further', 'unless', 'despite of', 'instead of'],
    correctAnswer: 'until further',
    explanation: 'Cụm từ cố định: "until further notice" nghĩa là cho đến khi có thông báo mới.',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2025'
  },

  // 7. Cloze Reading (Reading Forest)
  {
    id: 'cl-1',
    type: 'cloze',
    category: 'cloze',
    prompt: `Environmental pollution is one of the key (1) ________ of our time. It refers to the introduction of harmful substances into the environment. Air pollution is caused by the smoke released from factories and automobiles. (2) ________, water pollution occurs when chemicals are dumped into rivers and lakes. To tackle this, everyone must contribute by reducing waste and recycling plastics.
    
    Choose the correct word for blank (1):`,
    options: ['challenges', 'decisions', 'benefits', 'processes'],
    correctAnswer: 'challenges',
    explanation: '"challenges" (thử thách/vấn đề khó giải quyết) phù hợp về nghĩa nhất trong ngữ cảnh này.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'cl-2',
    type: 'cloze',
    category: 'cloze',
    prompt: `Environmental pollution is one of the key (1) challenges of our time. It refers to the introduction of harmful substances into the environment. Air pollution is caused by the smoke released from factories and automobiles. (2) ________, water pollution occurs when chemicals are dumped into rivers and lakes. To tackle this, everyone must contribute by reducing waste and recycling plastics.
    
    Choose the correct connector for blank (2):`,
    options: ['Similarly', 'However', 'Therefore', 'Although'],
    correctAnswer: 'Similarly',
    explanation: '"Similarly" (Tương tự như vậy) dùng để liên kết hai ví dụ về ô nhiễm (không khí và nước).',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2024'
  }
];
