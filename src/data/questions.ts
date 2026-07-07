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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the word class needed.', 'Apply prefix/suffix changes.', 'Check grammar with surrounding words.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'wf-2',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The noise of the street is extremely ________ for his study. (DISRUPT)',
    correctAnswer: ['disruptive'],
    explanation: 'Dùng tính từ "disruptive" (gây gián đoạn, phiền phức) sau trạng từ "extremely" và động từ tobe "is".',
    difficulty: 7,
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the word class needed.', 'Check suffix choice.', 'Keep the answer natural in context.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'wf-3',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Parents should encourage their children to act ________. (DEPEND)',
    correctAnswer: ['independently'],
    explanation: 'Dùng trạng từ "independently" (một cách độc lập) để bổ nghĩa cho động từ "act".',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Find the base word.', 'Decide whether adverb or adjective is needed.', 'Fill the blank with the derived form.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'wf-4',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Many students find the teacher’s explanation very ________. (INFORM)',
    correctAnswer: ['informative'],
    explanation: 'Cấu trúc "find something + adj". "Informative" có nghĩa là cung cấp nhiều thông tin bổ ích.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Use the collocation with find + adj.', 'Check the meaning required by the sentence.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'wf-5',
    type: 'wordform',
    category: 'wordform',
    prompt: 'There is a ________ difference between the two versions. (SIGNIFY)',
    correctAnswer: ['significant'],
    explanation: 'Dùng tính từ "significant" (đáng kể) đứng trước danh từ "difference".',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Use adjective before a noun.', 'Check word family and common collocation.'], tags: ['official-exam', 'hcmc-2026'] }
  },
  {
    id: 'wf-6',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The sudden system failure was completely ________. (EXPECT)',
    correctAnswer: ['unexpected'],
    explanation: 'Dùng tính từ "unexpected" (không mong đợi, bất ngờ) sau trạng từ "completely".',
    difficulty: 6,
    source: 'Specialized 2026 Mock Exam',
    metadata: { examPart: 'Part IV', englishPart: 'Part IV', englishTask: 'word-form', englishSkill: 'word-form', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Read the root word.', 'Check the adjective form and common prefix.'], tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'Specialized 2026 Mock Exam',
    metadata: { examPart: 'Part VI', englishPart: 'Part VI', englishTask: 'transformation', englishSkill: 'transformation', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Identify the target structure.', 'Rewrite the clause into a participle phrase.'], tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'Specialized 2026 Mock Exam',
    metadata: { examPart: 'Part VI', englishPart: 'Part VI', englishTask: 'transformation', englishSkill: 'transformation', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Rewrite the clause using V-ing.', 'Keep the original meaning unchanged.'], tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'grammar', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'tenses', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2024',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'pronunciation', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
    source: 'HCMC Entrance Exam 2025',
    metadata: { examPart: 'Part I', englishPart: 'Part I', englishTask: 'pronunciation', englishSkill: 'multiple-choice', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
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
  },
  {
    id: 'hcm-2023-pr-1',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Which word has the underlined part pronounced differently from that of the others?',
    options: ['mentioned', 'consisted', 'described', 'studied'],
    correctAnswer: 'consisted',
    explanation: 'Đuôi "-ed" trong "consisted" phát âm là /ɪd/, các từ còn lại phát âm là /d/.',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-pr-2',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Which word has the underlined part pronounced differently from that of the others?',
    options: ['village', 'lighting', 'litter', 'river'],
    correctAnswer: 'lighting',
    explanation: 'Nguyên âm "i" trong "lighting" phát âm là /aɪ/, các từ còn lại phát âm là /ɪ/.',
    difficulty: 3,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-st-1',
    type: 'mcq',
    category: 'stress',
    prompt: 'Which word has a different stress pattern from that of the others?',
    options: ['refresh', 'intend', 'excite', 'eager'],
    correctAnswer: 'eager',
    explanation: '"eager" nhấn âm 1 (/ˈiː.ɡər/), các từ còn lại nhấn âm 2.',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-st-2',
    type: 'mcq',
    category: 'stress',
    prompt: 'Which word has a different stress pattern from that of the others?',
    options: ['happening', 'responses', 'benefit', 'prisoner'],
    correctAnswer: 'responses',
    explanation: '"responses" nhấn âm 2 (/rɪˈspɒn.sɪz/), các từ còn lại nhấn âm 1.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-1',
    type: 'wordform',
    category: 'wordform',
    prompt: 'AI like ChatGPT is believed to be _______ in the search of information. (BENEFIT)',
    correctAnswer: ['beneficial'],
    explanation: 'Cần tính từ "beneficial" đứng sau tobe "to be" để bổ nghĩa cho chủ ngữ.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-2',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Minh Thu, the youngest _______, won the special prize for “Promising Voice”. (CONTEST)',
    correctAnswer: ['contestant'],
    explanation: 'Cần danh từ chỉ người "contestant" (thí sinh) đóng vai trò là chủ ngữ rút gọn.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-3',
    type: 'wordform',
    category: 'wordform',
    prompt: 'The earthquake in Turkey destroyed several villages and many people became _______. (HOME)',
    correctAnswer: ['homeless'],
    explanation: 'Cấu trúc "become + adj". Cần tính từ "homeless" (vô gia cư) phù hợp với ngữ cảnh bị động đất tàn phá.',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-4',
    type: 'wordform',
    category: 'wordform',
    prompt: '_______ all buildings in Sweden have been heated by solar energy. (NEAR)',
    correctAnswer: ['Nearly'],
    explanation: 'Cần trạng từ "Nearly" (hầu như, gần như) đứng đầu câu để bổ nghĩa cho định lượng từ "all".',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-5',
    type: 'wordform',
    category: 'wordform',
    prompt: 'In _______, we really need to do something about our neighborhood. (CONCLUDE)',
    correctAnswer: ['conclusion'],
    explanation: 'Cụm từ cố định: "In conclusion" (Tóm lại, kết luận lại).',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-wf-6',
    type: 'wordform',
    category: 'wordform',
    prompt: 'I spent some time _______ because I just didn\'t know which website was useful for me. (SURF)',
    correctAnswer: ['surfing'],
    explanation: 'Cấu trúc "spend time + V-ing" (dành thời gian làm gì).',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-rw-1',
    type: 'rewrite',
    category: 'rewrite',
    prompt: 'Change the way you learn vocabulary, and you can improve your English. (Rewrite starting with: "If you...")',
    correctAnswer: ['If you change the way you learn vocabulary, you can improve your English.'],
    explanation: 'Chuyển đổi câu mệnh lệnh điều kiện thành câu điều kiện Loại 1.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-rw-2',
    type: 'rewrite',
    category: 'rewrite',
    prompt: '“Why don\'t we collect those empty bottles for recycling?” said Robert. (Rewrite starting with: "Robert suggested that those...")',
    correctAnswer: [
      'Robert suggested that those empty bottles should be collected for recycling.',
      'Robert suggested that those empty bottles be collected for recycling.'
    ],
    explanation: 'Cấu trúc giả định với suggest: "S + suggest + that + S + (should) + be + V3" (bị động).',
    difficulty: 8,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-rw-3',
    type: 'rewrite',
    category: 'rewrite',
    prompt: 'Because Tom is very lazy, he can\'t get good marks at school. (Rewrite ending with: "..., so...")',
    correctAnswer: ['Tom is very lazy, so he can\'t get good marks at school.'],
    explanation: 'Thay thế liên từ chỉ nguyên nhân "Because" bằng liên từ chỉ kết quả "so".',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2023-rw-4',
    type: 'rewrite',
    category: 'rewrite',
    prompt: 'Michael loves to play football after school. (Rewrite starting with: "Michael is fond...")',
    correctAnswer: ['Michael is fond of playing football after school.'],
    explanation: 'Cấu trúc tương đương: "love/like + V-ing" = "be fond of + V-ing".',
    difficulty: 4,
    source: 'HCMC Entrance Exam 2023'
  },
  {
    id: 'hcm-2024-pr-3',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Which word has the underlined part pronounced differently from that of the others?',
    options: ['destroys', 'controls', 'predicts', 'wanders'],
    correctAnswer: 'predicts',
    explanation: 'Đuôi "-s" của "predicts" phát âm là /s/ đứng sau âm vô thanh /t/. Các từ còn lại phát âm là /z/.',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'hcm-2024-wf-7',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Mr. Tam is a well-qualified and _______ teacher. (EXPERIENCE)',
    correctAnswer: ['experienced'],
    explanation: 'Cần tính từ "experienced" (giàu kinh nghiệm) để bổ nghĩa cho danh từ "teacher".',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'hcm-2024-wf-8',
    type: 'wordform',
    category: 'wordform',
    prompt: 'We need to _______ our house to welcome the New Year. (BEAUTY)',
    correctAnswer: ['beautify'],
    explanation: 'Sau "need to" cần động từ nguyên mẫu "beautify" (làm đẹp).',
    difficulty: 6,
    source: 'HCMC Entrance Exam 2024'
  },
  {
    id: 'hcm-2024-wf-9',
    type: 'wordform',
    category: 'wordform',
    prompt: 'Thanks to my dad\'s _______, I now feel confident for the coming contest. (ASSIST)',
    correctAnswer: ['assistance'],
    explanation: 'Sau sở hữu cách "my dad\'s" cần danh từ "assistance" (sự hỗ trợ/giúp đỡ).',
    difficulty: 5,
    source: 'HCMC Entrance Exam 2024'
  },
  
  // ==================== MATH SUBJECT QUESTIONS ====================
  {
    id: 'm-1',
    type: 'mcq',
    category: 'parabol-line',
    prompt: 'Tìm giao điểm của Parabol y = x² và đường thẳng y = 2x + 3.',
    options: [
      '(3; 9) và (-1; 1)',
      '(3; 9) và (1; 1)',
      '(-3; 9) và (-1; 1)',
      '(3; 6) và (-1; 2)'
    ],
    correctAnswer: '(3; 9) và (-1; 1)',
    explanation: 'Phương trình hoành độ giao điểm: x² = 2x + 3 <=> x² - 2x - 3 = 0. Có dạng a - b + c = 0 nên có hai nghiệm x = -1 và x = 3. Thay vào y: x = -1 => y = 1; x = 3 => y = 9. Ta có hai giao điểm (3; 9) và (-1; 1).',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2024',
    subject: 'math',
    metadata: { examPart: 'Bài 1', mathTopic: 'function-graph', answerMode: 'short-answer', solutionStyle: 'diagram', solutionSteps: ['Lập phương trình đường thẳng và parabol.', 'Thế x để tìm tung độ / hoành độ.', 'Kết luận tọa độ điểm hoặc giao điểm.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-2',
    type: 'mcq',
    category: 'viet-relation',
    prompt: 'Cho phương trình x² - 5x + 3 = 0 có hai nghiệm x₁, x₂. Tính giá trị biểu thức A = x₁² + x₂².',
    options: ['A = 19', 'A = 22', 'A = 25', 'A = 16'],
    correctAnswer: 'A = 19',
    explanation: 'Theo hệ thức Vi-ét ta có: S = x₁ + x₂ = 5 và P = x₁ * x₂ = 3. Biểu thức A = x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = S² - 2P = 5² - 2*3 = 25 - 6 = 19.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2024',
    subject: 'math',
    metadata: { examPart: 'Bài 2', mathTopic: 'quadratic-equation', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Tính tổng và tích theo Vi-ét.', 'Biến đổi biểu thức cần tìm.', 'Thay số và rút gọn.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-3',
    type: 'mcq',
    category: 'real-finance',
    prompt: 'Một cửa hàng niêm yết giá bán một chiếc balo là 300.000 đồng. Nhân dịp khai giảng, cửa hàng giảm giá đợt 1 là 10%. Sau đó đợt 2 cửa hàng lại giảm tiếp 5% trên giá đã giảm của đợt 1. Hỏi sau hai đợt giảm giá, chiếc balo có giá bao nhiêu?',
    options: ['256.500 đồng', '255.000 đồng', '270.000 đồng', '245.000 đồng'],
    correctAnswer: '256.500 đồng',
    explanation: 'Giá bán sau đợt giảm thứ nhất: 300.000 * (1 - 0.10) = 270.000 đồng. Giá bán sau đợt giảm thứ hai: 270.000 * (1 - 0.05) = 256.500 đồng.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2024',
    subject: 'math',
    metadata: { examPart: 'Bài 4', mathTopic: 'finance', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Tính giá sau mỗi lần giảm.', 'Nhân các hệ số phần trăm còn lại.', 'Kết luận giá cuối cùng.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-4',
    type: 'mcq',
    category: 'real-geometry',
    prompt: 'Một lon nước ngọt hình trụ có bán kính đáy r = 3 cm và chiều cao h = 12 cm. Tính thể tích vỏ lon nước ngọt này (lấy π ≈ 3.14).',
    options: ['339.12 cm³', '113.04 cm³', '108.00 cm³', '300.00 cm³'],
    correctAnswer: '339.12 cm³',
    explanation: 'Thể tích hình trụ V = π * r² * h. Thay số: V ≈ 3.14 * 3² * 12 = 3.14 * 9 * 12 = 3.14 * 108 = 339.12 cm³.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2025',
    subject: 'math',
    metadata: { examPart: 'Bài 5', mathTopic: 'solid-geometry', answerMode: 'short-answer', solutionStyle: 'diagram', solutionSteps: ['Nhận dạng hình khối trong đề.', 'Áp dụng công thức diện tích hoặc thể tích phù hợp.', 'Làm tròn theo yêu cầu.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-5',
    type: 'mcq',
    category: 'viet-relation',
    prompt: 'Tìm giá trị tham số m để phương trình x² - 2x + m - 1 = 0 có hai nghiệm phân biệt.',
    options: ['m < 2', 'm > 2', 'm ≤ 2', 'm < 1'],
    correctAnswer: 'm < 2',
    explanation: 'Phương trình có hai nghiệm phân biệt khi delta phẩy lớn hơn 0. Ta có delta phẩy = (-1)² - 1*(m - 1) = 1 - m + 1 = 2 - m. Vậy 2 - m > 0 nên m < 2.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2025',
    subject: 'math',
    metadata: { examPart: 'Bài 2', mathTopic: 'quadratic-equation', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Tính tổng và tích theo Vi-ét.', 'Biến đổi biểu thức cần tìm.', 'Thay số và rút gọn.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-6',
    type: 'mcq',
    category: 'real-equations',
    prompt: 'Hai trường A và B có tổng cộng 500 học sinh đỗ lớp 10. Biết tỷ lệ đỗ của trường A là 90%, trường B là 85%. Tổng số học sinh dự thi của hai trường là 560 học sinh. Hỏi trường A có bao nhiêu học sinh dự thi?',
    options: ['480 học sinh', '320 học sinh', '240 học sinh', '80 học sinh'],
    correctAnswer: '480 học sinh',
    explanation: 'Gọi x, y lần lượt là số học sinh dự thi của trường A và B (x, y > 0). Ta có hệ phương trình: x + y = 560 và 0.90x + 0.85y = 500. Từ phương trình 1 suy ra y = 560 - x. Thế vào phương trình 2: 0.90x + 0.85(560 - x) = 500 <=> 0.05x + 476 = 500 <=> 0.05x = 24 <=> x = 480 (thỏa mãn). Vậy trường A có 480 học sinh dự thi.',
    difficulty: 7,
    source: 'Đề thi Toán lớp 10 TP.HCM 2025',
    subject: 'math',
    metadata: { examPart: 'Bài 6', mathTopic: 'modeling', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Đặt ẩn và điều kiện.', 'Viết hệ phương trình từ các dữ kiện.', 'Giải hệ và đối chiếu điều kiện.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'm-7',
    type: 'mcq',
    category: 'plane-geometry',
    prompt: 'Cho đường tròn (O; R) và điểm A nằm ngoài đường tròn sao cho OA = 2R. Kẻ tiếp tuyến AB với đường tròn (B là tiếp điểm). Tính độ dài tiếp tuyến AB theo R.',
    options: ['R√3', 'R√2', 'R', '1.5R'],
    correctAnswer: 'R√3',
    explanation: 'Vì AB là tiếp tuyến của (O) tại B nên tam giác OAB vuông tại B. Áp dụng định lý Py-ta-go: OA² = OB² + AB² <=> (2R)² = R² + AB² <=> 4R² = R² + AB² <=> AB² = 3R² <=> AB = R√3.',
    difficulty: 7,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 7', mathTopic: 'plane-geometry', answerMode: 'short-answer', solutionStyle: 'diagram', solutionSteps: ['Phân tích dữ kiện hình học.', 'Dựng thêm đường phụ nếu cần.', 'Kết luận theo quan hệ góc / tiếp tuyến / đồng dạng.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  
  {
    id: 'hcmc-math-2026-q2',
    type: 'multi-part',
    category: 'quadratic-equation',
    prompt: 'Cho phương trình bậc hai: x^2 - 2mx + m^2 - m + 1 = 0 (x là ẩn số, m là tham số).\na) Tìm điều kiện của m để phương trình có hai nghiệm phân biệt x1, x2.\nb) Tìm m để hai nghiệm x1, x2 thỏa mãn hệ thức x1^2 + x2^2 - x1x2 = 5.',
    options: null,
    correctAnswer: ['m > 1', 'm = (-3 + sqrt(41)) / 2'],
    explanation: 'Ta có Delta phẩy = m - 1 nên điều kiện có hai nghiệm phân biệt là m > 1. Theo Viète, S = 2m và P = m^2 - m + 1. Từ x1^2 + x2^2 - x1x2 = (x1 + x2)^2 - 3x1x2 = 5 suy ra (2m)^2 - 3(m^2 - m + 1) = 5, tức m^2 + 3m - 8 = 0. Lấy nghiệm thỏa m > 1 là m = (-3 + sqrt(41)) / 2.',
    difficulty: 8,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 2', mathTopic: 'quadratic-equation', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Tính Delta phẩy để xét điều kiện có hai nghiệm phân biệt.', 'Viết hệ thức Viète rồi biến đổi biểu thức theo S và P.', 'Giải phương trình theo m và đối chiếu điều kiện.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q3',
    type: 'multi-part',
    category: 'linear-function',
    prompt: 'Một mối liên hệ giữa nhiệt độ F (Fahrenheit) và nhiệt độ C (Celsius) được cho bởi công thức hàm số bậc nhất: F = a.C + b. Biết rằng nước đóng băng ở 0°C tương ứng với 32°F và sôi ở 100°C tương ứng với 212°F.\na) Xác định các hệ số a và b.\nb) Nếu nhiệt độ cơ thể của một người đo được là 37°C thì tương ứng là bao nhiêu độ F?',
    options: null,
    correctAnswer: ['a = 1,8', 'b = 32', 'F = 98,6°F'],
    explanation: 'Thế C = 0 vào công thức suy ra b = 32. Thế C = 100, F = 212 suy ra 212 = 100a + 32, nên a = 1,8. Với C = 37 ta có F = 1,8 × 37 + 32 = 98,6°F.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 3', mathTopic: 'linear-function', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Thế hai cặp dữ kiện để tìm a, b.', 'Tính giá trị F khi C = 37.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q4',
    type: 'multi-part',
    category: 'growth-modeling',
    prompt: 'Để chuẩn bị cho giải chạy Marathon quốc tế tại TP.HCM vào cuối năm, một vận động viên lên kế hoạch tập luyện. Trong tuần đầu tiên, anh ấy chạy tổng cộng 40 km. Kể từ tuần thứ hai, mục tiêu của anh ấy là tăng quãng đường chạy mỗi tuần thêm 5% so với tuần ngay trước đó.\na) Viết công thức tính tổng quãng đường anh ấy chạy được trong tuần thứ n (với n là số tuần tập luyện).\nb) Hỏi vào tuần thứ mấy thì tổng quãng đường chạy trong tuần đó của anh ấy sẽ lần đầu tiên vượt qua mốc 50 km?',
    options: null,
    correctAnswer: ['S_n = 40 × (1,05)^(n-1)', 'n = 6'],
    explanation: 'Đây là cấp số nhân với số hạng đầu 40 và công bội 1,05 nên S_n = 40 × (1,05)^(n-1). Giải bất đẳng thức 40 × (1,05)^(n-1) > 50 cho thấy n = 6 là tuần đầu tiên vượt mốc 50 km.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 4', mathTopic: 'growth-modeling', answerMode: 'multi-part', solutionStyle: 'worked', subparts: ['a', 'b'], solutionSteps: ['Xác định số hạng đầu và công bội.', 'Lập bất đẳng thức vượt mốc 50 km.', 'Thử các giá trị n để tìm tuần đầu tiên thỏa mãn.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q5',
    type: 'short-answer',
    category: 'percentage-discount',
    prompt: 'Một cửa hàng thời trang giảm giá một lô áo khoác. Lần thứ nhất cửa hàng giảm giá 10% so với giá niêm yết. Do vẫn chưa bán hết, cửa hàng tiếp tục giảm giá thêm 5% nữa trên giá đã giảm của lần thứ nhất. Lúc này, giá bán của một chiếc áo khoác là 427.500 đồng. Hỏi giá niêm yết ban đầu của một chiếc áo khoác là bao nhiêu?',
    options: null,
    correctAnswer: ['500.000 đồng'],
    explanation: 'Sau hai lần giảm, giá còn 0,9 × 0,95 = 0,855 lần giá niêm yết. Suy ra 0,855x = 427.500 nên x = 500.000.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 5', mathTopic: 'percentage-discount', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Gọi x là giá niêm yết.', 'Tính giá sau hai lần giảm.', 'Lập phương trình và suy ra giá gốc.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q6',
    type: 'multi-part',
    category: 'volume-displacement',
    prompt: 'Một chiếc ly thủy tinh có dạng hình trụ chứa nước, đường kính đáy bên trong ly là 6 cm, chiều cao mực nước hiện tại là 10 cm. Người ta thả vào ly 4 viên bi thủy tinh hình cầu giống hệt nhau chìm hoàn toàn trong nước thì thấy nước dâng lên vừa vặn đầy ly (không bị tràn ra ngoài). Biết chiều cao của ly là 12 cm. Tính bán kính của mỗi viên bi (làm tròn kết quả đến chữ số thập phân thứ nhất; lấy π ≈ 3,14).',
    options: null,
    correctAnswer: ['R ≈ 1,5 cm'],
    explanation: 'Bán kính ly là 3 cm, phần nước dâng thêm là 2 cm nên thể tích nước dâng là 3,14 × 3^2 × 2 = 56,52 cm³. Mỗi viên bi có thể tích 14,13 cm³. Giải (4/3)πR^3 = 14,13 suy ra R ≈ 1,5 cm.',
    difficulty: 6,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 6', mathTopic: 'volume-displacement', answerMode: 'multi-part', solutionStyle: 'diagram', subparts: ['a', 'b'], solutionSteps: ['Tính thể tích phần nước dâng lên.', 'Chia cho 4 để được thể tích mỗi viên bi.', 'Dùng công thức hình cầu để suy bán kính.'], formulaHints: ['V_trụ = πr²h', 'V_cầu = 4/3 πR³'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q7',
    type: 'short-answer',
    category: 'shopping-discount',
    prompt: 'Bạn An đem theo một số tiền vào siêu thị để mua 10 quyển tập cùng loại. Tuy nhiên, hôm nay siêu thị có chương trình khuyến mãi: "Mua từ quyển thứ 6 trở đi sẽ được giảm 20% trên giá niêm yết". Nhờ vậy, với số tiền đem theo ban đầu, An đã mua được tổng cộng 11 quyển tập và còn dư lại 4.000 đồng. Tính giá niêm yết của một quyển tập.',
    options: null,
    correctAnswer: ['20.000 đồng'],
    explanation: 'Nếu gọi y là giá niêm yết một quyển tập thì số tiền ban đầu đủ mua 10 quyển là 10y. Thực tế An mua 5 quyển đầu giá y và 6 quyển sau giá 0,8y, tổng là 9,8y. Hiệu 10y - 9,8y = 0,2y bằng 4.000 nên y = 20.000 đồng.',
    difficulty: 5,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 7', mathTopic: 'shopping-discount', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Gọi y là giá niêm yết một quyển.', 'Tính tổng tiền theo chương trình khuyến mãi.', 'Lập phương trình với số tiền còn dư.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'hcmc-math-2026-q8',
    type: 'proof',
    category: 'tangent-geometry',
    prompt: 'Cho đường tròn tâm O đường kính AB. Lấy điểm C thuộc đường tròn (O) sao cho AC < BC (C không trùng A). Tiếp tuyến tại A của đường tròn (O) cắt đường thẳng BC tại điểm M.\na) Chứng minh: Tam giác ABC vuông tại C và MA^2 = MB · MC.\nb) Vẽ đường cao CH của tam giác ABC (H thuộc AB). Gọi I là trung điểm của CH. Đường thẳng MI cắt AC tại E và cắt đường tròn (O) tại D (D khác M). Chứng minh tứ giác AHCE nội tiếp.\nc) Chứng minh: MB · MC = MD · MH. Từ đó chứng minh đường thẳng BC là tiếp tuyến của đường tròn ngoại tiếp tam giác ACD.',
    options: null,
    correctAnswer: ['ABC vuông tại C', 'MA^2 = MB · MC', 'AHCE nội tiếp', 'BC là tiếp tuyến của đường tròn ngoại tiếp tam giác ACD'],
    explanation: 'Sử dụng góc nội tiếp chắn nửa đường tròn để có tam giác ABC vuông tại C. Từ hệ thức tiếp tuyến - cát tuyến suy ra MA^2 = MB · MC. Phần b dùng quan hệ vuông góc và trung điểm trên đường cao. Phần c khai thác phương tích và góc tạo bởi tiếp tuyến với dây cung để kết luận BC là tiếp tuyến của (ACD).',
    difficulty: 8,
    source: 'Đề thi Toán lớp 10 TP.HCM 2026',
    subject: 'math',
    metadata: { examPart: 'Bài 8', mathTopic: 'tangent-geometry', answerMode: 'proof', solutionStyle: 'proof-outline', subparts: ['a', 'b', 'c'], solutionSteps: ['Chứng minh tam giác ABC vuông tại C.', 'Dùng hệ thức tiếp tuyến - cát tuyến.', 'Khai thác góc vuông và phương tích để suy ra tứ giác nội tiếp và tiếp tuyến.'], diagramHint: 'Đường tròn đường kính AB, điểm C trên đường tròn, tiếp tuyến tại A cắt BC tại M, đường cao CH và trung điểm I.', tags: ['official-exam', 'hcmc-2026'] }
  } as any,

  // ==================== LITERATURE SUBJECT QUESTIONS ====================
  {
    id: 'lit-1',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Xác định biện pháp tu từ được sử dụng trong câu thơ sau: "Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng" (Nguyễn Khoa Điềm).',
    options: ['Ẩn dụ', 'Hoán dụ', 'So sánh', 'Nhân hóa'],
    correctAnswer: 'Ẩn dụ',
    explanation: 'Hình ảnh "Mặt trời của mẹ" là ẩn dụ chỉ đứa con - nguồn sáng, nguồn ấm áp và hy vọng sống của cuộc đời người mẹ.',
    difficulty: 5,
    source: 'Đề thi Văn lớp 10 TP.HCM 2024',
    subject: 'literature'
  } as any,
  {
    id: 'lit-2',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Tìm thành ngữ Tiếng Việt phù hợp điền vào câu sau: "Anh ấy luôn làm việc cẩu thả, kiểu _______ nên sản phẩm thường xuyên bị lỗi."',
    options: ['Đem con bỏ chợ', 'Cưỡi ngựa xem hoa', 'Làm dối ăn thật', 'Đầu voi đuôi chuột'],
    correctAnswer: 'Cưỡi ngựa xem hoa',
    explanation: '"Cưỡi ngựa xem hoa" chỉ việc làm qua loa, cẩu thả, không tìm hiểu sâu sắc vấn đề.',
    difficulty: 4,
    source: 'Đề thi Văn lớp 10 TP.HCM 2024',
    subject: 'literature'
  } as any,
  {
    id: 'lit-3',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Trong câu: "Trăng cứ tròn vành vạnh / ánh chi đã im phăng phắc" (Ánh trăng - Nguyễn Duy), từ "tròn vành vạnh" mang ý nghĩa gì?',
    options: [
      'Biểu tượng cho vẻ đẹp nguyên vẹn, thủy chung không phai mờ của quá khứ',
      'Biểu tượng cho vẻ đẹp của thiên nhiên đêm rằm',
      'Biểu tượng cho sự cô đơn của nhân vật trữ tình',
      'Biểu tượng cho sự đổi thay của lòng người'
    ],
    correctAnswer: 'Biểu tượng cho vẻ đẹp nguyên vẹn, thủy chung không phai mờ của quá khứ',
    explanation: '"Tròn vành vạnh" là biểu tượng cho quá khứ nghĩa tình thủy chung, trọn vẹn, không bao giờ thay đổi dù lòng người có đổi thay.',
    difficulty: 6,
    source: 'Đề thi Văn lớp 10 TP.HCM 2024',
    subject: 'literature'
  } as any,
  {
    id: 'lit-4',
    type: 'mcq',
    category: 'literature-reading-argument',
    prompt: 'Văn bản sau thuộc phương thức biểu đạt chính nào? "Để thành công, con người cần có sự kiên trì. Kiên trì giúp ta vượt qua những khó khăn thử thách, tích lũy kinh nghiệm và hoàn thiện bản thân..."',
    options: ['Nghị luận', 'Tự sự', 'Biểu cảm', 'Thuyết minh'],
    correctAnswer: 'Nghị luận',
    explanation: 'Đoạn văn đưa ra quan điểm, dùng lí lẽ và lập luận để thuyết phục người đọc về giá trị của sự kiên trì, nên phương thức biểu đạt chính là Nghị luận.',
    difficulty: 4,
    source: 'Đề thi Văn lớp 10 TP.HCM 2025',
    subject: 'literature'
  } as any,
  {
    id: 'lit-5',
    type: 'mcq',
    category: 'literature-vietnamese',
    prompt: 'Từ "hoa" trong câu thơ "Làn thu thủy nét xuân sơn / Hoa ghen thua thắm liễu hờn kém xanh" (Truyện Kiều - Nguyễn Du) được dùng theo nghĩa nào?',
    options: ['Nghĩa gốc', 'Nghĩa chuyển theo phương thức ẩn dụ', 'Nghĩa chuyển theo phương thức hoán dụ', 'Nghĩa chuyển theo phương thức nhân hóa'],
    correctAnswer: 'Nghĩa gốc',
    explanation: 'Từ "hoa" ở đây mang nghĩa gốc chỉ bông hoa của tự nhiên (đối lập với liễu), dùng trong phép nhân hóa "hoa ghen" để làm nổi bật vẻ đẹp tuyệt mĩ của Thúy Kiều.',
    difficulty: 6,
    source: 'Đề thi Văn lớp 10 TP.HCM 2025',
    subject: 'literature'
  } as any,
  {
    id: 'lit-6',
    type: 'mcq',
    category: 'literature-writing',
    prompt: 'Yếu tố nào dưới đây KHÔNG thuộc luận cứ trong bài văn nghị luận xã hội về lối sống tử tế?',
    options: [
      'Cảm xúc chủ quan và sở thích riêng của cá nhân người viết',
      'Những tấm gương giúp đỡ người có hoàn cảnh khó khăn trong đại dịch',
      'Số liệu thống kê về các quỹ từ thiện xã hội uy tín',
      'Danh ngôn, câu nói của các danh nhân về lòng nhân ái'
    ],
    correctAnswer: 'Cảm xúc chủ quan và sở thích riêng của cá nhân người viết',
    explanation: 'Bài văn nghị luận xã hội đòi hỏi luận cứ khách quan, tính thuyết phục cao như dẫn chứng thực tế, danh ngôn, số liệu thực tế; cảm xúc chủ quan cá nhân không được xem là luận cứ thuyết phục.',
    difficulty: 5,
    source: 'Đề thi Văn lớp 10 TP.HCM 2025',
    subject: 'literature'
  } as any,
  {
    id: 'lit-7',
    type: 'mcq',
    category: 'literature-reading-poetry',
    prompt: `**Đọc đoạn trích sau và trả lời câu hỏi:**
"Con gặp lại nhân dân như nai về suối cũ
Cỏ đón giếng đầu giùm, chim chập cánh hoa rừng
Tình yêu đất nước là nơi ta đi tới
Khi đi xa, đất đã hóa tâm hồn"
*(Tiếng hát con tàu - Chế Lan Viên)*

Xác định ý nghĩa sâu sắc của câu thơ "Khi đi xa, đất đã hóa tâm hồn".`,
    options: [
      'Khẳng định sự gắn bó máu thịt giữa con người với mảnh đất quê hương',
      'Tả thực về sự thay đổi của đất đai địa chất',
      'Mô tả vẻ đẹp lãng mạn của vùng cao Tây Bắc',
      'Thể hiện khát vọng đi du lịch thám hiểm của nhà thơ'
    ],
    correctAnswer: 'Khẳng định sự gắn bó máu thịt giữa con người với mảnh đất quê hương',
    explanation: 'Câu thơ khẳng định sự gắn bó máu thịt tâm hồn giữa con người và vùng đất họ đi qua; tình yêu thương biến những nơi xa lạ thành một phần máu thịt tâm hồn.',
    difficulty: 7,
    source: 'Đề thi Văn lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần I', literatureTrack: 'reading', literatureTask: 'message', textGenre: 'poetry', answerMode: 'single-choice', solutionStyle: 'direct', tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'lit-8',
    type: 'short-answer',
    category: 'literature-reading-argument',
    prompt: 'Đọc đoạn văn bản về "Giá trị của sự thấu hiểu và sẻ chia trong kỷ nguyên công nghệ". Theo tác giả, việc lạm dụng công nghệ mà thiếu giao tiếp trực tiếp sẽ dẫn đến hậu quả gì?',
    correctAnswer: ['xa cách', 'giảm khả năng đồng cảm', 'cô đơn', 'lạc lõng'],
    explanation: 'Câu hỏi đọc hiểu hướng tới ý chính: con người dễ xa cách nhau, giảm đồng cảm và rơi vào trạng thái cô đơn, lạc lõng khi chỉ giao tiếp qua công nghệ.',
    difficulty: 4,
    source: 'Đề thi Ngữ văn lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần I', literatureTrack: 'reading', literatureTask: 'main-idea', textGenre: 'argument', answerMode: 'short-answer', solutionStyle: 'worked', solutionSteps: ['Xác định ý chính của đoạn văn.', 'Chọn các hậu quả được tác giả nhấn mạnh.', 'Diễn đạt ngắn gọn, đúng trọng tâm.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'lit-9',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Từ thông điệp của phần Đọc hiểu, hãy viết bài văn nghị luận khoảng 500 chữ bàn về ý nghĩa của sự lắng nghe chân thành trong mối quan hệ giữa con người với con người trong cuộc sống hiện đại ngày nay.',
    correctAnswer: ['lắng nghe chân thành', 'thấu hiểu', 'giảm khoảng cách', 'xoa dịu tổn thương', 'mối quan hệ bền vững', 'phê phán thờ ơ', 'bài học hành động'],
    explanation: 'Bài viết cần nêu khái niệm lắng nghe chân thành, phân tích ý nghĩa, đưa dẫn chứng, phản đề và chốt bài học hành động.',
    difficulty: 8,
    source: 'Đề thi Ngữ văn lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần III', literatureTrack: 'social-essay', literatureTask: 'social-essay', textGenre: 'argument', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'giải thích', 'phân tích', 'phản đề', 'bài học', 'kết bài'], solutionSteps: ['Xác định vấn đề nghị luận.', 'Giải thích khái niệm và nêu ý nghĩa.', 'Đưa dẫn chứng và phản đề.', 'Rút ra bài học và kết bài.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'lit-10',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Cảm nhận của em về tình yêu quê hương, đất nước và khát vọng cống hiến được thể hiện qua khổ thơ trong bài thơ Mùa xuân nho nhỏ của Thanh Hải. Từ đó, liên hệ trách nhiệm của thế hệ trẻ ngày nay đối với việc xây dựng và phát triển đất nước.',
    correctAnswer: ['ta làm con chim hót', 'một mùa xuân nho nhỏ', 'lặng lẽ dâng cho đời', 'tuổi hai mươi', 'khi tóc bạc', 'cống hiến', 'thế hệ trẻ'],
    explanation: 'Bài viết cần làm rõ ước nguyện hóa thân giản dị, cống hiến lặng lẽ của Thanh Hải và liên hệ trách nhiệm của người trẻ trong học tập, lao động, sáng tạo.',
    difficulty: 8,
    source: 'Đề thi Ngữ văn lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần IV', literatureTrack: 'literary-essay', literatureTask: 'poetry-analysis', textGenre: 'poetry', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'khổ 1', 'khổ 2', 'liên hệ', 'kết bài'], solutionSteps: ['Xác định chủ đề và hình tượng thơ.', 'Phân tích các hình ảnh và điệp cấu trúc.', 'Liên hệ trách nhiệm thế hệ trẻ.', 'Kết lại giá trị nội dung và nghệ thuật.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any,
  {
    id: 'lit-11',
    type: 'multi-part',
    category: 'literature-writing',
    prompt: 'Trong tác phẩm Chiếc lược ngà của Nguyễn Quang Sáng, hãy phân tích nhân vật anh Sáu, đặc biệt là giai đoạn ở chiến khu khi anh dồn hết tâm trí để làm chiếc lược ngà tặng con. Từ câu chuyện cha con anh Sáu, hãy chia sẻ suy nghĩ của em về giá trị của tình cảm gia đình trong những hoàn cảnh thử thách.',
    correctAnswer: ['anh sáu', 'chiếc lược ngà', 'tình phụ tử', 'gia đình', 'thử thách', 'hy sinh'],
    explanation: 'Bài làm cần làm rõ tình yêu con sâu nặng của anh Sáu, quá trình làm lược ngà như dồn nén mọi yêu thương, và rút ra giá trị của tình cảm gia đình khi đối diện thử thách.',
    difficulty: 8,
    source: 'Đề thi Ngữ văn lớp 10 TP.HCM 2026',
    subject: 'literature',
    metadata: { examPart: 'Phần IV', literatureTrack: 'literary-essay', literatureTask: 'character-analysis', textGenre: 'prose', answerMode: 'multi-part', solutionStyle: 'rubric', subparts: ['mở bài', 'tình yêu con ở chiến khu', 'nghệ thuật xây dựng nhân vật', 'ý nghĩa gia đình', 'kết bài'], solutionSteps: ['Xác định nhân vật và hoàn cảnh truyện.', 'Phân tích hành động, tâm lí và chi tiết chiếc lược ngà.', 'Khái quát giá trị tình cảm gia đình.', 'Kết luận thông điệp tác phẩm.'], tags: ['official-exam', 'hcmc-2026'] }
  } as any
];
