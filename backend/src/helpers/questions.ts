import { pool } from '../db.js';
import crypto from 'crypto';

function buildScopeCode(subject: string, gradeTier: number, loai?: string, bai?: number): string {
  const normLoai = loai ? loai.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : 'general';
  const baiStr = bai !== undefined && bai !== null && !isNaN(bai) ? `b${bai}` : '';
  return `${subject}_g${gradeTier}_${normLoai}_${baiStr}`.replace(/_+$/g, '');
}

export const persistCustomQuestion = async (userId: string, question: any) => {
  const gradeTier = Number(question.gradeTier ?? question.grade);
  const subject = question.subject;
  if (![6, 7, 8, 9, 10, 11, 12].includes(gradeTier) || !subject) {
    throw new Error('Question requires a valid gradeTier and subject.');
  }
  const explicitLessonId = question.lessonId || null;
  let lessonId = explicitLessonId;
  if (!lessonId) {
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
  }

  const parsedBai = question.bai !== undefined && question.bai !== null && question.bai !== '' ? parseFloat(question.bai) : undefined;
  const scopeCode = question.scopeCode || buildScopeCode(subject, gradeTier, question.loai || question.category, parsedBai);
  const pedagogicalPhase = question.pedagogicalPhase || 'comprehension';
  const relatedLessonIds = Array.isArray(question.relatedLessonIds) ? question.relatedLessonIds : null;

  await pool.query(
    `INSERT INTO ge10_custom_questions (
       id, user_id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, image_url, metadata, lesson_id, is_confused, loai, bai, related_lesson_ids, pedagogical_phase, scope_code
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
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
       is_confused = EXCLUDED.is_confused,
       loai = EXCLUDED.loai,
       bai = EXCLUDED.bai,
       related_lesson_ids = EXCLUDED.related_lesson_ids,
       pedagogical_phase = EXCLUDED.pedagogical_phase,
       scope_code = EXCLUDED.scope_code`,
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
      question.isConfused || false,
      question.loai || null,
      parsedBai || null,
      relatedLessonIds,
      pedagogicalPhase,
      scopeCode
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
