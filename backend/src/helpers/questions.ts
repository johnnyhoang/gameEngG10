import { pool } from '../db.js';
import crypto from 'crypto';

export const persistCustomQuestion = async (userId: string, question: any) => {
  const gradeTier = Number(question.gradeTier ?? question.grade);
  const subject = question.subject;
  if (![6, 7, 8, 9, 10, 11, 12].includes(gradeTier) || !subject) {
    throw new Error('Question requires a valid gradeTier and subject.');
  }
  let lessonId = null;
  try {
    const lessonRes = await pool.query(
      'SELECT id FROM ge10_lessons WHERE category = $1 AND grade_tier = $2 AND subject = $3 LIMIT 1',
      [question.category, gradeTier, subject]
    );
    if (lessonRes.rows.length > 0) {
      lessonId = lessonRes.rows[0].id;
    }
  } catch (e: any) {
    console.error('Lỗi khi truy vấn lesson_id cho câu hỏi:', e.message);
  }

  await pool.query(
    `INSERT INTO ge10_custom_questions (id, user_id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, image_url, metadata, lesson_id, is_confused)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
     ON CONFLICT (id) DO UPDATE SET
       type = EXCLUDED.type,
       category = EXCLUDED.category,
       topic_id = EXCLUDED.topic_id,
       prompt = EXCLUDED.prompt,
       options = EXCLUDED.options,
       correct_answer = EXCLUDED.correct_answer,
       explanation = EXCLUDED.explanation,
       difficulty = EXCLUDED.difficulty,
       source = EXCLUDED.source,
       subject = EXCLUDED.subject,
       grade_tier = EXCLUDED.grade_tier,
       image_url = EXCLUDED.image_url,
       metadata = EXCLUDED.metadata,
       lesson_id = EXCLUDED.lesson_id,
       is_confused = EXCLUDED.is_confused`,
    [
      question.id,
      userId,
      question.type || 'mcq',
      question.category,
      question.topicId || null,
      question.prompt,
      question.options || null,
      Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer],
      question.explanation || '',
      question.difficulty || 5,
      question.source || 'AI Ingested English',
      subject,
      gradeTier,
      question.imageUrl || question.image_url || null,
      question.metadata ? JSON.stringify(question.metadata) : null,
      lessonId,
      question.isConfused || false
    ]
  );
};

/**
 * Nhân bản Danh Mục Quà Khuyến Học của TRƯỜNG (ge10_school_reward_templates — bảng dùng
 * chung toàn viện, quản lý qua /api/admin/school-rewards) vào danh mục riêng của một
 * giáo viên (ge10_class_rewards). Gọi khi hồ sơ giáo viên được tạo (routes/profiles.ts);
 * cũng an toàn để gọi lại nhiều lần (chỉ clone khi giáo viên đó chưa có quà nào).
 */
export const ensureDefaultClassRewards = async (teacherId: string) => {
  const rewardsRes = await pool.query('SELECT id FROM ge10_class_rewards WHERE teacher_id = $1', [teacherId]);
  if (rewardsRes.rowCount === 0) {
    const templatesRes = await pool.query(
      'SELECT title, cost_ruby, quantity FROM ge10_school_reward_templates ORDER BY created_at'
    );
    for (const t of templatesRes.rows) {
      const id = `cls-rew-${teacherId}-${crypto.randomUUID()}`;
      await pool.query(
        `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [id, teacherId, t.title, t.cost_ruby, t.quantity, t.quantity, Date.now()]
      );
    }
  }
};
