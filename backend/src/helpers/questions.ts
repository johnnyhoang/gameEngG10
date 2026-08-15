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
  const chapterName = question.chapterName || null;
  const lessonName = question.lessonName || null;

  await pool.query(
    `INSERT INTO ge10_custom_questions (
       id, user_id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, image_url, metadata, lesson_id, is_confused, loai, bai, related_lesson_ids, pedagogical_phase, scope_code, chapter_name, lesson_name
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
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
       scope_code = EXCLUDED.scope_code,
       chapter_name = EXCLUDED.chapter_name,
       lesson_name = EXCLUDED.lesson_name`,
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
      scopeCode,
      chapterName,
      lessonName
    ]
  );
};

/**
 * Nhân bản Danh Mục Quà Khuyến Học của TRƯỜNG (ge10_school_reward_templates — bảng dùng
 * chung toàn viện, quản lý qua /api/admin/school-rewards) vào danh mục riêng của một
 * giáo viên (ge10_class_rewards). Gọi khi hồ sơ giáo viên được tạo (routes/profiles.ts).
 *
 * Chỉ nhân bản ĐÚNG 1 LẦN trong đời hồ sơ — dùng cờ `ge10_users.class_rewards_seeded`,
 * KHÔNG dùng "đang có 0 quà" làm điều kiện. Lý do: nếu giáo viên chủ động xoá hết quà mặc
 * định (không muốn dùng), họ phải được toàn quyền giữ danh mục rỗng — không bị hệ thống tự
 * "mọc lại" quà mỗi lần trang tải lại. An toàn khi gọi lại nhiều lần (no-op nếu đã seeded).
 *
 * Chỉ nhân bản ĐÚNG 1 quà (mẫu đầu tiên của danh mục toàn viện) làm khởi đầu — không copy
 * nguyên cả danh mục. Chủ Nhiệm/Trợ Giảng (được cấp quyền) tự thêm/sửa/xoá tiếp theo nhu cầu
 * thật của lớp mình, tránh danh mục "rác" đầy quà không liên quan ngay từ đầu.
 */
export const ensureDefaultClassRewards = async (teacherId: string) => {
  const userRes = await pool.query('SELECT class_rewards_seeded FROM ge10_users WHERE id = $1', [teacherId]);
  if (userRes.rows[0]?.class_rewards_seeded) return;

  const templatesRes = await pool.query(
    'SELECT title, cost_ruby, quantity, is_unlimited FROM ge10_school_reward_templates ORDER BY created_at LIMIT 1'
  );
  for (const t of templatesRes.rows) {
    const id = `cls-rew-${teacherId}-${crypto.randomUUID()}`;
    await pool.query(
      `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, is_unlimited, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO NOTHING`,
      [id, teacherId, t.title, t.cost_ruby, t.quantity, t.quantity, t.is_unlimited, Date.now()]
    );
  }

  await pool.query('UPDATE ge10_users SET class_rewards_seeded = TRUE WHERE id = $1', [teacherId]);
};
