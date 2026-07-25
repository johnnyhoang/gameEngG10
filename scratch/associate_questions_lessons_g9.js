import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

// Hàm chuẩn hóa chuỗi tiếng Việt để so sánh
function normalizeStr(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // loại bỏ dấu tiếng Việt
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ') // loại bỏ ký tự đặc biệt
    .replace(/\s+/g, ' ')
    .trim();
}

// Từ khóa đặc trưng của các bài học Tiếng Anh
const ENGLISH_KEYWORDS_MAP = {
  'eng-comparison-1': ['comparative', 'superlative', 'comparison', 'so sanh hon', 'so sanh nhat', 'than', 'as', 'more than'],
  'eng-comparison-2': ['double comparative', 'the more', 'the better', 'so sanh kep'],
  'eng-conjunctions-1': ['conjunction', 'because', 'since', 'as', 'due to', 'because of', 'so that', 'in order to', 'lien tu chi nguyen nhan', 'lien tu chi muc dich'],
  'eng-conjunctions-2': ['although', 'even though', 'though', 'despite', 'in spite of', 'however', 'nevertheless', 'lien tu tuong phan', 'lien tu nhuong bo'],
  'eng-cloze-1': ['cloze test', 'fill in the blank', 'word form', 'loai tu', 'noun', 'verb', 'adjective', 'adverb'],
  'eng-cloze-2': ['cloze test', 'fill in the blank', 'meaning', 'ngu nghia', 'vocabulary in context'],
  'eng-grammar-mcq-2': ['sign', 'notice', 'real life notice', 'bien bao', 'thong bao thực te'],
  'eng-reading-comprehension-1': ['reading comprehension', 'multiple choice', 'mcq reading', 'trac nghiem doc hieu'],
  'eng-reading-comprehension-2': ['true or false', 'true/false', 'not given', 'doc hieu dung sai'],
  'eng-reading-skills-1': ['skimming', 'scanning', 'reading technique', 'ky thuat doc nhanh'],
  'eng-reading-skills-2': ['guess meaning', 'word meaning', 'context clue', 'doan nghia tu']
};

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  try {
    // 1. Lấy toàn bộ bài học lớp 9
    const lessonsRes = await client.query(
      `SELECT id, subject, title, theory, category FROM ge10_lessons WHERE grade_tier = 9`
    );
    const lessons = lessonsRes.rows;
    console.log(`Đã load ${lessons.length} bài học lớp 9.`);

    // 2. Lấy toàn bộ câu hỏi lớp 9 chưa được gắn lesson_id
    const questionsRes = await client.query(
      `SELECT id, subject, category, topic_id, prompt FROM ge10_custom_questions WHERE grade_tier = 9 AND lesson_id IS NULL`
    );
    const questions = questionsRes.rows;
    console.log(`Đã load ${questions.length} câu hỏi lớp 9 chưa được gắn lesson_id.`);

    // Gom nhóm bài học theo môn
    const lessonsBySub = {};
    lessons.forEach(l => {
      const sub = l.subject.toLowerCase();
      if (!lessonsBySub[sub]) lessonsBySub[sub] = [];
      lessonsBySub[sub].push(l);
    });

    let updateCount = 0;
    const updates = [];

    for (const q of questions) {
      const qSub = q.subject.toLowerCase();
      
      // Chuyển đổi tên môn học để khớp ('arts' và 'art')
      const normSub = qSub === 'arts' ? 'arts' : qSub;
      const subLessons = lessonsBySub[normSub] || lessonsBySub['arts'] || [];
      if (subLessons.length === 0) continue;

      const qPromptNorm = normalizeStr(q.prompt);
      let bestLesson = null;
      let maxScore = 0;

      if (normSub === 'english') {
        // So khớp chuyên biệt cho môn Tiếng Anh dựa trên ENGLISH_KEYWORDS_MAP
        for (const lesson of subLessons) {
          const keywords = ENGLISH_KEYWORDS_MAP[lesson.id] || [];
          let score = 0;
          keywords.forEach(kw => {
            if (qPromptNorm.includes(kw)) {
              score += 10; // Khớp từ khóa cốt lõi được cộng nhiều điểm
            }
          });
          
          // Thêm điểm nếu category khớp
          if (lesson.category === q.category) {
            score += 2;
          }

          if (score > maxScore && score >= 10) {
            maxScore = score;
            bestLesson = lesson;
          }
        }
      } else {
        // So khớp thông minh dựa trên từ khóa tiếng Việt cho các môn học khác
        for (const lesson of subLessons) {
          let score = 0;
          const titleNorm = normalizeStr(lesson.title);
          
          // Tách tiêu đề thành các từ ghép/từ khóa quan trọng (tối thiểu 3 ký tự)
          const titleWords = titleNorm.split(' ').filter(w => w.length > 2);
          
          // Tạo các cụm từ khóa 2 từ (nếu có)
          const titlePhrases = [];
          const words = titleNorm.split(' ');
          for (let i = 0; i < words.length - 1; i++) {
            titlePhrases.push(`${words[i]} ${words[i+1]}`);
          }

          // Kiểm tra khớp cụm từ khóa 2 từ (trọng số cao)
          titlePhrases.forEach(phrase => {
            if (qPromptNorm.includes(phrase)) {
              score += 5;
            }
          });

          // Kiểm tra khớp từ đơn (trọng số thấp hơn)
          titleWords.forEach(word => {
            if (qPromptNorm.includes(word)) {
              score += 1;
            }
          });

          // Điểm cộng nếu khớp category
          if (lesson.category === q.category) {
            score += 3;
          }

          // Tiêu chí tối thiểu: Phải khớp ít nhất 1 cụm từ khóa 2 từ hoặc 3 từ đơn trở lên
          if (score > maxScore && score >= 5) {
            maxScore = score;
            bestLesson = lesson;
          }
        }
      }

      if (bestLesson) {
        updates.push({
          questionId: q.id,
          lessonId: bestLesson.id,
          title: bestLesson.title
        });
      }
    }

    console.log(`Đang chạy cập nhật ${updates.length} câu hỏi lên database...`);
    
    // Thực hiện update tuần tự trong transaction
    await client.query('BEGIN');
    for (const item of updates) {
      await client.query(
        `UPDATE ge10_custom_questions SET lesson_id = $1 WHERE id = $2`,
        [item.lessonId, item.questionId]
      );
      updateCount++;
    }
    await client.query('COMMIT');

    console.log(`Hoàn tất phân bổ dữ liệu! Đã liên kết thành công ${updateCount}/${questions.length} câu hỏi với lesson_id tương ứng.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lỗi khi chạy phân bổ dữ liệu:', err);
  } finally {
    await client.end();
  }
}

run();
