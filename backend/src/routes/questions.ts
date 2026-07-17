import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware, requireProfileRoles } from '../middleware/auth.js';
import { persistCustomQuestion } from '../helpers/questions.js';
import { checkStudentManagementPermission } from '../helpers/permissions.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

// GET /api/questions/custom: Loads default or custom questions for this user
router.get('/questions/custom', async (req: any, res) => {
  const userId = req.profile.id;
  const gradeTier = Number(req.query.gradeTier);
  const subject = typeof req.query.subject === 'string' ? req.query.subject : '';
  if (![6, 7, 8, 9, 10, 11, 12].includes(gradeTier) || !subject) {
    return res.status(400).json({ error: 'gradeTier and subject are required.' });
  }
  try {
    const qRes = await pool.query(
      `SELECT * FROM ge10_custom_questions
       WHERE grade_tier = $2 AND subject = $3 AND (
          user_id = $1 OR user_id IS NULL
          OR user_id IN (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien')))`,
      [userId, gradeTier, subject]
    );
    res.json(qRes.rows.map((row: any) => ({
      id: row.id,
      type: row.type,
      category: row.category,
      topicId: row.topic_id,
      prompt: row.prompt,
      options: row.options,
      correctAnswer: row.correct_answer,
      explanation: row.explanation,
      difficulty: row.difficulty,
      source: row.source,
      subject: row.subject,
      gradeTier: row.grade_tier,
      imageUrl: row.image_url,
      metadata: row.metadata || undefined,
      isConfused: row.is_confused,
      timesOpened: row.times_opened || 0,
      timesAnsweredCorrectly: row.times_answered_correctly || 0,
      timesSkipped: row.times_skipped || 0,
      lastOpenedAt: row.last_opened_at
    })));
  } catch (error) {
    console.error('Error loading custom questions:', error);
    res.status(500).json({ error: 'Failed to retrieve questions.' });
  }
});

// POST /api/questions/confused: Flags any question as confused/not understood
router.post('/questions/confused', async (req: any, res) => {
  const userId = req.profile.id;
  const question = req.body;
  try {
    await persistCustomQuestion(userId, { ...question, isConfused: true });
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error flagging question confused:', error.message);
    res.status(500).json({ error: 'Failed to flag question as confused.' });
  }
});

// PUT /api/questions/custom/:questionId: Updates a custom question owned by the signed-in user
router.put('/questions/custom/:questionId', requireProfileRoles('tutor', 'secondary_tutor', 'truong_vien', 'pho_vien'), async (req: any, res) => {
  const userId = req.profile.id;
  const { questionId } = req.params;
  try {
    const exists = await pool.query('SELECT id FROM ge10_custom_questions WHERE id = $1 AND user_id = $2', [questionId, userId]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    const question = {
      id: questionId,
      ...req.body,
      subject: req.body.subject || 'english'
    };
    await persistCustomQuestion(userId, question);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error updating custom question:', error.message);
    res.status(500).json({ error: 'Failed to update question.' });
  }
});

// DELETE /api/questions/custom/:questionId: Deletes a custom question owned by the signed-in user
router.delete('/questions/custom/:questionId', requireProfileRoles('tutor', 'secondary_tutor', 'truong_vien', 'pho_vien'), async (req: any, res) => {
  const userId = req.profile.id;
  const { questionId } = req.params;
  try {
    const result = await pool.query('DELETE FROM ge10_custom_questions WHERE id = $1 AND user_id = $2', [questionId, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting custom question:', error.message);
    res.status(500).json({ error: 'Failed to delete question.' });
  }
});

// GET /api/questions/stats: Gets question statistics (admin only)
router.get('/questions/stats', requireProfileRoles('truong_vien', 'pho_vien'), async (req: any, res) => {
  try {
    const { subject, sortBy = 'opened', limit = 100 } = req.query;

    let query = `SELECT
      id,
      type,
      category,
      subject,
      difficulty,
      prompt,
      source,
      times_opened,
      times_answered_correctly,
      times_skipped,
      last_opened_at,
      updated_at
    FROM ge10_custom_questions
    WHERE 1=1`;

    const params: any[] = [];

    if (subject) {
      query += ` AND subject = $${params.length + 1}`;
      params.push(subject);
    }

    const sortMap: Record<string, string> = {
      'opened': 'times_opened DESC',
      'correct': 'times_answered_correctly DESC',
      'skipped': 'times_skipped DESC',
      'last_used': 'last_opened_at DESC'
    };

    query += ` ORDER BY ${sortMap[sortBy as string] || sortMap['opened']}`;
    query += ` LIMIT $${params.length + 1}`;
    params.push(parseInt(limit as string) || 100);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching question stats:', error.message);
    res.status(500).json({ error: 'Failed to retrieve question statistics.' });
  }
});

// GET /api/questions/stats/student/:studentId: Gets specific student's question performance
router.get('/questions/stats/student/:studentId', async (req: any, res) => {
  const userId = req.profile.id;
  const { studentId } = req.params;
  try {
    // Học sinh xem thống kê của chính mình, hoặc truong_vien/pho_vien/tutor/secondary_tutor
    // có quan hệ (link) active với đúng học sinh này — dùng chung logic phân quyền với các
    // route quản lý học sinh khác thay vì tự re-query role (tránh loại nhầm tutor/secondary_tutor).
    const isSelf = userId === studentId;
    if (!isSelf && !(await checkStudentManagementPermission(userId, studentId, 'view_profile'))) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    const result = await pool.query(
      `SELECT
        q.id,
        q.prompt,
        q.subject,
        q.category,
        q.difficulty,
        p.times_attempted,
        p.times_correct,
        p.times_skipped,
        p.last_attempted_at,
        ROUND(CAST(p.times_correct AS FLOAT) / NULLIF(p.times_attempted, 0), 3) as accuracy
      FROM ge10_student_question_performance p
      JOIN ge10_custom_questions q ON p.question_id = q.id
      WHERE p.student_id = $1
      ORDER BY p.last_attempted_at DESC
      LIMIT 100`,
      [studentId]
    );
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching student question performance:', error.message);
    res.status(500).json({ error: 'Failed to retrieve student performance.' });
  }
});

export default router;
