import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const sourceText = 'Đề ôn thi vào lớp 10 - Đề số 2';

const questions = [
  {
    id: 'mock-de2-q1',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Choose the word whose underlined part differs from that of the other three in pronunciation:\n\nsweet, sword, answer, whole (the underlined part is "w")',
    options: ['A. sweet', 'B. sword', 'C. answer', 'D. whole'],
    correct_answer: ['A. sweet'],
    explanation: 'Chữ "w" trong "sweet" phát âm là /w/, còn trong "sword", "answer", "whole" là âm câm.',
    difficulty: 4
  },
  {
    id: 'mock-de2-q2',
    type: 'mcq',
    category: 'pronunciation',
    prompt: 'Choose the word whose underlined part differs from that of the other three in pronunciation:\n\nsupported, finished, noticed, approached (the underlined part is "ed")',
    options: ['A. supported', 'B. finished', 'C. noticed', 'D. approached'],
    correct_answer: ['A. supported'],
    explanation: 'Đuôi "ed" ở "supported" phát âm là /ɪd/, còn ở "finished", "noticed", "approached" phát âm là /t/.',
    difficulty: 4
  },
  {
    id: 'mock-de2-q3',
    type: 'mcq',
    category: 'stress',
    prompt: 'Choose the word that differs from the other three in the position of primary stress:\n\nprevent, recent, receive, remote',
    options: ['A. prevent', 'B. recent', 'C. receive', 'D. remote'],
    correct_answer: ['B. recent'],
    explanation: 'Trọng âm của "recent" rơi vào âm tiết 1, các từ còn lại rơi vào âm tiết 2.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q4',
    type: 'mcq',
    category: 'stress',
    prompt: 'Choose the word that differs from the other three in the position of primary stress:\n\navoid, manage, career, advise',
    options: ['A. avoid', 'B. manage', 'C. career', 'D. advise'],
    correct_answer: ['B. manage'],
    explanation: 'Trọng âm của "manage" rơi vào âm tiết 1, các từ còn lại rơi vào âm tiết 2.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q5',
    type: 'mcq',
    category: 'correction',
    prompt: 'Identify the underlined part that needs correction:\n\nSome underground water is enough safe (A) to drink, but all the surface water must (B) be treated (C).',
    options: ['A. enough safe', 'B. must', 'C. treated', 'D. Some'],
    correct_answer: ['A. enough safe'],
    explanation: 'Cấu trúc đúng là "safe enough" (tính từ + enough), không dùng "enough safe".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q6',
    type: 'mcq',
    category: 'correction',
    prompt: 'Identify the underlined part that needs correction:\n\nWhat did (A) you have for the breakfast (B) this morning (C)?',
    options: ['A. did', 'B. the breakfast', 'C. this morning', 'D. have'],
    correct_answer: ['B. the breakfast'],
    explanation: 'Không dùng mạo từ "the" trước tên các bữa ăn nói chung (dùng "have breakfast").',
    difficulty: 5
  },
  {
    id: 'mock-de2-q7',
    type: 'mcq',
    category: 'correction',
    prompt: 'Identify the underlined part that needs correction:\n\nThe more confidence (A) and positive you look, the better (B) you will feel (C).',
    options: ['A. confidence', 'B. better', 'C. will feel', 'D. you look'],
    correct_answer: ['A. confidence'],
    explanation: 'Cần một tính từ để song hành với "positive" đứng sau động từ liên kết "look". Sửa "confidence" thành "confident".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q8',
    type: 'mcq',
    category: 'correction',
    prompt: 'Identify the underlined part that needs correction:\n\nThe result of that end-term test must be (A) inform (B) before (C) September.',
    options: ['A. must be', 'B. inform', 'C. before', 'D. result'],
    correct_answer: ['B. inform'],
    explanation: 'Câu bị động với động từ khuyết thiếu: "must be + V3/ed". Sửa "inform" thành "informed".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q9',
    type: 'mcq',
    category: 'grammar',
    prompt: 'The tourist company was ____________ down the street than she had thought.',
    options: ['A. farther', 'B. far', 'C. farer', 'D. farest'],
    correct_answer: ['A. farther'],
    explanation: 'Câu so sánh hơn có "than". Dạng so sánh hơn của "far" là "farther" (hoặc "further").',
    difficulty: 5
  },
  {
    id: 'mock-de2-q10',
    type: 'mcq',
    category: 'grammar',
    prompt: 'My mother is a strong person. She stays calm even ____________ the worst situations.',
    options: ['A. in', 'B. at', 'C. on', 'D. to'],
    correct_answer: ['A. in'],
    explanation: 'Cụm giới từ chỉ tình huống/hoàn cảnh: "in the worst situations".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q11',
    type: 'mcq',
    category: 'grammar',
    prompt: 'When we told him the plan, he agreed ____________ our team.',
    options: ['A. join', 'B. to join', 'C. joining', 'D. joined'],
    correct_answer: ['B. to join'],
    explanation: 'Cấu trúc "agree + to V": đồng ý làm gì.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q12',
    type: 'mcq',
    category: 'grammar',
    prompt: 'I suffer from depression and anxiety, but I don’t know ____________ to get over my problems.',
    options: ['A. what', 'B. which', 'C. where', 'D. how'],
    correct_answer: ['D. how'],
    explanation: 'Cấu trúc từ để hỏi + to V: "how to get over my problems" (cách vượt qua những khó khăn của tôi).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q13',
    type: 'mcq',
    category: 'grammar',
    prompt: 'He asked his father how to ____________ negative emotions.',
    options: ['A. cope to', 'B. cope of', 'C. cope for', 'D. cope with'],
    correct_answer: ['D. cope with'],
    explanation: 'Cụm động từ cố định: "cope with" có nghĩa là đối phó, đương đầu với.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q14',
    type: 'mcq',
    category: 'grammar',
    prompt: 'If they want to have a quick ____________ lunch, they should buy some avocado sushi.',
    options: ['A. unhealthy', 'B. healthy', 'C. healthily', 'D. health'],
    correct_answer: ['B. healthy'],
    explanation: 'Cần một tính từ bổ nghĩa cho danh từ "lunch" đứng sau: "healthy lunch" (bữa trưa lành mạnh).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q15',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Make sure you ____________ a hotel before you come to our island, especially in the summer.',
    options: ['A. book', 'B. keep', 'C. put', 'D. buy'],
    correct_answer: ['A. book'],
    explanation: 'Động từ "book" có nghĩa là đặt trước phòng/vé: "book a hotel".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q16',
    type: 'mcq',
    category: 'grammar',
    prompt: '____________ the price is high, we can’t afford to buy a new car.',
    options: ['A. Although', 'B. Whereas', 'C. Because', 'D. As long as'],
    correct_answer: ['C. Because'],
    explanation: 'Liên từ chỉ nguyên nhân: "Because + mệnh đề" (Bởi vì giá cả đắt đỏ...).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q17',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'My friends have just moved to a new flat in the residential area on the ____________ of Paris.',
    options: ['A. side', 'B. outskirt', 'C. suburbs', 'D. outside'],
    correct_answer: ['B. outskirt'],
    explanation: 'Cụm từ "on the outskirts/outskirt of" nghĩa là ở vùng ngoại ô.',
    difficulty: 6
  },
  {
    id: 'mock-de2-q18',
    type: 'mcq',
    category: 'grammar',
    prompt: 'My father advised ____________ too far.',
    options: ['A. me did not swim', 'B. me do not swim', 'C. me not to swim', 'D. I did not swim'],
    correct_answer: ['C. me not to swim'],
    explanation: 'Cấu trúc khuyên bảo: "advise someone not to do something".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q19',
    type: 'mcq',
    category: 'exchange',
    prompt: 'Ben: “Sam’s the best singer in our school.”\nNadia: “____________”',
    options: ['A. Yes tell me about it', 'B. That’s ok', 'C. I can’t agree with you more', 'D. Yes please'],
    correct_answer: ['C. I can’t agree with you more'],
    explanation: 'Nadia đồng ý hoàn toàn với ý kiến của Ben: "I can\'t agree with you more".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q20',
    type: 'mcq',
    category: 'exchange',
    prompt: 'George: “Need a hand with your suitcase, Jane.”\nJane: “____________”',
    options: ['A. That’s very kind of you', 'B. Not a chance', 'C. I don’t believe', 'D. Well done!'],
    correct_answer: ['A. That’s very kind of you'],
    explanation: 'Đáp lại lời đề nghị giúp đỡ lịch sự: "That\'s very kind of you" (Bạn thật tử tế).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q21',
    type: 'mcq',
    category: 'synonym',
    prompt: 'Choose the word CLOSEST in meaning to the underlined word:\n\nFace-to-face socializing is not as preferred as virtual socializing among the young. (underlined word: "Face-to-face")',
    options: ['A. instant', 'B. available', 'C. direct', 'D. facial'],
    correct_answer: ['C. direct'],
    explanation: '"Face-to-face" (trực tiếp) đồng nghĩa với "direct".',
    difficulty: 6
  },
  {
    id: 'mock-de2-q22',
    type: 'mcq',
    category: 'synonym',
    prompt: 'Choose the word CLOSEST in meaning to the underlined word:\n\nThere is no alternative. The president must approve the bill if the Congress passes it. (underlined word: "alternative")',
    options: ['A. Possible agreement', 'B. improvement', 'C. change', 'D. other choice'],
    correct_answer: ['D. other choice'],
    explanation: '"alternative" (sự lựa chọn thay thế) đồng nghĩa với "other choice".',
    difficulty: 6
  },
  {
    id: 'mock-de2-q23',
    type: 'mcq',
    category: 'antonym',
    prompt: 'Choose the word OPPOSITE in meaning to the underlined word:\n\nWhy does the secretary always go to meetings on time? (underlined word: "on time")',
    options: ['A. lately', 'B. late', 'C. rarely', 'D. sometimes'],
    correct_answer: ['B. late'],
    explanation: 'Trái nghĩa với "on time" (đúng giờ) là "late" (muộn).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q24',
    type: 'mcq',
    category: 'antonym',
    prompt: 'Choose the word OPPOSITE in meaning to the underlined word:\n\nWhy do you join those wires? Think by contrast, you have to split them up. (underlined word: "join")',
    options: ['A. separate', 'B. paste', 'C. gather', 'D. unite'],
    correct_answer: ['A. separate'],
    explanation: 'Trái nghĩa với "join" (nối lại, liên kết) là "separate" (chia tách).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q25',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (25):\n\nMany people love boats. Going out on the water on a warm summer day is a lot of (25) ____________.',
    options: ['A. funny', 'B. fun', 'C. funs', 'D. funnies'],
    correct_answer: ['B. fun'],
    explanation: 'Cụm từ "a lot of fun" nghĩa là rất nhiều niềm vui.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q26',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (26):\n\n(26) ____________, different people like different kinds of boats.',
    options: ['A. However', 'B. Although', 'C. Because', 'D. Unless'],
    correct_answer: ['A. However'],
    explanation: 'Liên từ đứng đầu câu chỉ sự chuyển ý tương phản: "However" (Tuy nhiên).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q27',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (27):\n\nTwo of the most popular kinds of boat are sailboats and speedboats. Sailboats use the (27) ____________ to give them power.',
    options: ['A. water', 'B. speed', 'C. weather', 'D. wind'],
    correct_answer: ['D. wind'],
    explanation: 'Thuyền buồm dùng sức gió ("wind") để di chuyển.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q28',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (28):\n\nFurthermore, speedboats are usually not as (28) ____________ as sailboats. Speedboats are small so that they can go fast.',
    options: ['A. small', 'B. fast', 'C. warm', 'D. big'],
    correct_answer: ['D. big'],
    explanation: 'Dựa vào câu tiếp theo: Xuồng cao tốc nhỏ, còn thuyền buồm lớn. Vậy xuồng cao tốc thường "không lớn bằng" (not as big as) thuyền buồm.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q29',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (29):\n\n(29) ____________, sailboats can travel into the ocean, but this would be very dangerous in a speedboat.',
    options: ['A. Unfortunately', 'B. At first', 'C. In addition', 'D. Except for'],
    correct_answer: ['C. In addition'],
    explanation: 'Liên từ bổ sung thêm thông tin: "In addition" (Ngoài ra).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q30',
    type: 'mcq',
    category: 'cloze',
    prompt: 'Read the passage and choose the best word to fit blank (30):\n\nYou can only use speedboats (30) ____________ rivers or lakes.',
    options: ['A. on', 'B. up', 'C. over', 'D. to'],
    correct_answer: ['A. on'],
    explanation: 'Giới từ đi với sông/hồ: "on rivers or lakes".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q31',
    type: 'mcq',
    category: 'reading',
    prompt: 'Read the passage and answer the question:\n\nAs a result of years of research, we know that too much animal fat is bad for our health. For example, Americans eat a lot of meat and only a small amount of grains, fruit and vegetables. Because of their diet, they have high rates of cancer and heart disease. In Japan, in contrast, people eat large amounts of grains and very little meat. The Japanese also have low rates of cancer and heart disease. In fact, the Japanese live longer than anyone else in the world. Unfortunately, when people move to the US, the rates of heart disease and cancer increase as their diet changes. Moreover, as hamburgers, ice-cream, and other high fat food become popular in Japan, the rates of heart disease and cancer are increasing there as well. People are also eating more meat and dairy products in other countries such as Cuba, Mauritius and Hungary. Not surprisingly, the disease rates in these countries are increasing along with the change in diet. Consequently, doctors everywhere advise people to eat more grains, fruit and vegetables and to eat less meat and fewer dairy products.\n\nWhat is the main idea of this passage?',
    options: [
      'A. Doctors advise people to eat more grains, fruit and vegetables.',
      'B. Eating meat causes cancer and heart disease.',
      'C. The kind of diet we have can cause or prevent diseases.',
      'D. Children eat the same way their parents eat.'
    ],
    correct_answer: ['B. Eating meat causes cancer and heart disease.'],
    explanation: 'Đoạn văn chủ yếu nhấn mạnh về tác hại của việc ăn quá nhiều thịt/chất béo động vật đối với các bệnh ung thư và tim mạch.',
    difficulty: 6
  },
  {
    id: 'mock-de2-q32',
    type: 'mcq',
    category: 'reading',
    prompt: 'Animal fat bad for health... (passage details)\n\nAs a result of years of research, what is bad for our health?',
    options: ['A. Too much animal fat', 'B. Animal fat', 'C. Too much vegetable oil', 'D. vegetable oil'],
    correct_answer: ['A. Too much animal fat'],
    explanation: 'Ngay dòng đầu tiên của bài đọc: "too much animal fat is bad for our health".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q33',
    type: 'mcq',
    category: 'reading',
    prompt: 'Animal fat bad for health... (passage details)\n\nDo Americans or Japanese people have lower rates of cancer and heart disease?',
    options: ['A. Americans', 'B. The Japanese', 'C. Both of them', 'D. None of them'],
    correct_answer: ['B. The Japanese'],
    explanation: 'Thông tin trong bài đọc: "The Japanese also have low rates of cancer and heart disease."',
    difficulty: 5
  },
  {
    id: 'mock-de2-q34',
    type: 'mcq',
    category: 'reading',
    prompt: 'Animal fat bad for health... (passage details)\n\nThe rates of cancer and heart disease are increasing because ____________.',
    options: [
      'A. they move to the US',
      'B. they eat more hamburgers and ice-cream',
      'C. they eat large amounts of grains and very little meat',
      'D. they change their diet'
    ],
    correct_answer: ['D. they change their diet'],
    explanation: 'Tỷ lệ mắc bệnh gia tăng do thói quen ăn uống thay đổi (change in diet).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q35',
    type: 'mcq',
    category: 'rewrite',
    prompt: 'Choose the sentence that is closest in meaning to the original sentence:\n\nI learned a few words of English at the weekend.',
    options: [
      'A. I picked off a few words of English at the weekend.',
      'B. I picked at a few words of English at the weekend.',
      'C. I picked up a few words of English at the weekend.',
      'D. I picked from a few words of English at the weekend.'
    ],
    correct_answer: ['C. I picked up a few words of English at the weekend.'],
    explanation: 'Cụm động từ "pick up" có nghĩa là học mót, học lỏm được cái gì một cách tự nhiên.',
    difficulty: 5
  },
  {
    id: 'mock-de2-q36',
    type: 'mcq',
    category: 'rewrite',
    prompt: 'Choose the sentence that is closest in meaning to the original sentence:\n\nNo one has seen Linda since the day of the party.',
    options: [
      'A. Linda has not been seen since the day of the party.',
      'B. Linda has been seen since the day of the party.',
      'C. Linda has not seen since the day of the party.',
      'D. Linda has not been see since the day of the party.'
    ],
    correct_answer: ['A. Linda has not been seen since the day of the party.'],
    explanation: 'Chuyển câu từ chủ động sang bị động ở thì Hiện tại hoàn thành: "S + has/have + not + been + V3".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q37',
    type: 'mcq',
    category: 'rewrite',
    prompt: 'Choose the sentence that is closest in meaning to the original sentence:\n\n“Why don’t you participate in the volunteer work in the summer?” said Lya.',
    options: [
      'A. Lya suggested I shouldn’t participate in the volunteer work in the summer.',
      'B. Lya suggested I should participate in the volunteer work in the summer.',
      'C. Lya asked me to participate in the volunteer work in the summer.',
      'D. Lya told me to participate in the volunteer work in the summer.'
    ],
    correct_answer: ['B. Lya suggested I should participate in the volunteer work in the summer.'],
    explanation: 'Câu gián tiếp với gợi ý: "suggest + (that) + S + should + V".',
    difficulty: 6
  },
  {
    id: 'mock-de2-q38',
    type: 'mcq',
    category: 'rewrite',
    prompt: 'Choose the sentence that is closest in meaning to the original sentence:\n\nThe problem is so difficult that he can’t solve it.',
    options: [
      'A. The problem is not easy and he can solve it.',
      'B. He doesn’t solve the problem because it is so easy.',
      'C. The problem is too easy for him to solve.',
      'D. The problem is too difficult for him to solve.'
    ],
    correct_answer: ['D. The problem is too difficult for him to solve.'],
    explanation: 'Cấu trúc tương đương: "so + adj + that..." chuyển sang "too + adj + for someone to V" (quá khó để anh ấy giải quyết).',
    difficulty: 5
  },
  {
    id: 'mock-de2-q39',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Choose the sentence that is best written from the words/phrases given:\n\nWhat / height / mountain?',
    options: [
      'A. What’s height of the mountain?',
      'B. What’s the height in the mountain?',
      'C. What’s the height of the mountain?',
      'D. What’s the height on the mountain?'
    ],
    correct_answer: ['C. What’s the height of the mountain?'],
    explanation: 'Cấu trúc câu hỏi về thông số: "What is the height of the mountain?".',
    difficulty: 5
  },
  {
    id: 'mock-de2-q40',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Choose the sentence that is best written from the words/phrases given:\n\nYou / must / work / harder / you / be / sacked.',
    options: [
      'A. You must work harder so you’ll be sacked.',
      'B. You must work harder or you’ll be sacked.',
      'C. You must work harder because you’ll be sacked.',
      'D. You must work harder of you’ll be sacked.'
    ],
    correct_answer: ['B. You must work harder or you’ll be sacked.'],
    explanation: 'Liên từ "or" dùng để chỉ hậu quả nếu không làm hành động trước: "hoặc là con phải làm việc chăm chỉ hơn, hoặc là con sẽ bị sa thải".',
    difficulty: 5
  }
];

async function main() {
  console.log('Bắt đầu kết nối database để nạp Đề ôn thi vào lớp 10 - Đề 2...');
  try {
    let successCount = 0;
    for (const q of questions) {
      await pool.query(
        `INSERT INTO ge10_custom_questions 
           (id, user_id, type, category, prompt, options, correct_answer, explanation, difficulty, source, subject)
         VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           type = EXCLUDED.type,
           category = EXCLUDED.category,
           prompt = EXCLUDED.prompt,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation = EXCLUDED.explanation,
           difficulty = EXCLUDED.difficulty,
           source = EXCLUDED.source,
           subject = EXCLUDED.subject`,
        [
          q.id,
          q.type,
          q.category,
          q.prompt,
          q.options,
          q.correct_answer,
          q.explanation,
          q.difficulty,
          sourceText,
          'english'
        ]
      );
      successCount++;
    }
    console.log(`Đã nạp thành công ${successCount}/${questions.length} câu hỏi tiếng Anh vào cơ sở dữ liệu!`);
  } catch (error) {
    console.error('Lỗi khi nạp dữ liệu:', error);
  } finally {
    await pool.end();
    console.log('Đã đóng kết nối database.');
  }
}

main();
