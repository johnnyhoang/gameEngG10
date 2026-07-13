export type EnglishSkillDistrictId = 'phrase-valley' | 'conversation-town' | 'writing-pavilion' | 'listening-lake';

export interface EnglishChoiceItem {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  speechText?: string;
}

export interface EnglishWritingItem {
  id: string;
  prompt: string;
  acceptedAnswers: string[];
  explanation: string;
}

export const PHRASE_VALLEY_ITEMS: EnglishChoiceItem[] = [
  { id: 'pv-1', prompt: 'The school trip was cancelled ___ the heavy rain.', options: ['because of', 'although', 'despite of', 'in order to'], correctAnswer: 'because of', explanation: 'Because of is followed by a noun phrase: the heavy rain.' },
  { id: 'pv-2', prompt: 'Mai always ___ attention to the teacher’s pronunciation.', options: ['pays', 'makes', 'takes', 'does'], correctAnswer: 'pays', explanation: 'Pay attention is the standard collocation.' },
  { id: 'pv-3', prompt: 'We should ___ up plastic bottles instead of throwing them away.', options: ['pick', 'look', 'turn', 'give'], correctAnswer: 'pick', explanation: 'Pick up means collect something from the ground.' },
  { id: 'pv-4', prompt: 'Nam is looking ___ to joining the English speaking club.', options: ['forward', 'after', 'into', 'over'], correctAnswer: 'forward', explanation: 'Look forward to is followed by a noun or gerund.' },
  { id: 'pv-5', prompt: 'The new library gives students easy ___ to digital books.', options: ['access', 'approach', 'entrance', 'arrival'], correctAnswer: 'access', explanation: 'Have/give access to is the natural collocation.' },
];

export const CONVERSATION_TOWN_ITEMS: EnglishChoiceItem[] = [
  { id: 'ct-1', prompt: 'A: “Would you like to join our study group?” — B: “___”', options: ['Yes, I’d love to.', 'Never mind.', 'You are welcome.', 'Not at all.'], correctAnswer: 'Yes, I’d love to.', explanation: 'This politely accepts an invitation.' },
  { id: 'ct-2', prompt: 'A: “I’m sorry I broke your ruler.” — B: “___”', options: ['Don’t worry about it.', 'That sounds great.', 'Here you are.', 'The same to you.'], correctAnswer: 'Don’t worry about it.', explanation: 'This is an appropriate response to an apology.' },
  { id: 'ct-3', prompt: 'A: “Could you show me the way to the library?” — B: “___”', options: ['Sure. Go straight and turn left.', 'Yes, I could.', 'No, I don’t.', 'That is my library.'], correctAnswer: 'Sure. Go straight and turn left.', explanation: 'The response accepts the request and gives directions.' },
  { id: 'ct-4', prompt: 'A: “You did a great job on the presentation!” — B: “___”', options: ['Thank you. That’s kind of you.', 'No problem.', 'I disagree.', 'You must be joking.'], correctAnswer: 'Thank you. That’s kind of you.', explanation: 'Thanking the speaker is the natural response to a compliment.' },
  { id: 'ct-5', prompt: 'A: “How about practising English after class?” — B: “___”', options: ['That’s a good idea.', 'I’m fine, thanks.', 'It doesn’t matter.', 'Here it is.'], correctAnswer: 'That’s a good idea.', explanation: 'This appropriately agrees with a suggestion.' },
];

export const WRITING_PAVILION_ITEMS: EnglishWritingItem[] = [
  { id: 'wp-1', prompt: 'Rewrite: “I started learning English three years ago.” → I have ...', acceptedAnswers: ['I have learned English for three years.', 'I have learnt English for three years.', 'I have been learning English for three years.'], explanation: 'Use the present perfect with for + duration.' },
  { id: 'wp-2', prompt: 'Rewrite: “The test was difficult, but Lan completed it.” → Although ...', acceptedAnswers: ['Although the test was difficult, Lan completed it.'], explanation: 'Although introduces a concessive clause.' },
  { id: 'wp-3', prompt: 'Complete with the correct word form: She answered all the questions ___. (CONFIDENT)', acceptedAnswers: ['confidently'], explanation: 'An adverb is needed to modify answered.' },
  { id: 'wp-4', prompt: 'Rewrite in the passive voice: “People speak English in many countries.”', acceptedAnswers: ['English is spoken in many countries.'], explanation: 'Present simple passive: is/am/are + past participle.' },
  { id: 'wp-5', prompt: 'Combine using “so”: The bus was late. We arrived after the bell.', acceptedAnswers: ['The bus was late, so we arrived after the bell.'], explanation: 'So connects a cause with its result.' },
];

export const LISTENING_LAKE_ITEMS: EnglishChoiceItem[] = [
  { id: 'll-1', speechText: 'The English club meets in room twelve every Friday afternoon.', prompt: 'Where does the English club meet?', options: ['In room 12', 'In room 20', 'In the library', 'In the school yard'], correctAnswer: 'In room 12', explanation: 'The announcement says “in room twelve”.' },
  { id: 'll-2', speechText: 'Please bring your student card when you borrow books from the library.', prompt: 'What must students bring?', options: ['Their student card', 'A notebook', 'A dictionary', 'Their timetable'], correctAnswer: 'Their student card', explanation: 'The key detail is “bring your student card”.' },
  { id: 'll-3', speechText: 'The science workshop starts at half past eight, not at nine o’clock.', prompt: 'When does the workshop start?', options: ['8:30', '8:00', '9:00', '9:30'], correctAnswer: '8:30', explanation: 'Half past eight means 8:30.' },
  { id: 'll-4', speechText: 'Because it may rain this afternoon, the football match will take place in the sports hall.', prompt: 'Why will the match be indoors?', options: ['It may rain', 'It is too hot', 'The field is closed', 'The team is late'], correctAnswer: 'It may rain', explanation: 'The reason given is possible rain.' },
  { id: 'll-5', speechText: 'Students can submit their projects by email before Monday morning.', prompt: 'How should students submit their projects?', options: ['By email', 'By post', 'In person only', 'Through a classmate'], correctAnswer: 'By email', explanation: 'The instruction explicitly says “by email”.' },
];
