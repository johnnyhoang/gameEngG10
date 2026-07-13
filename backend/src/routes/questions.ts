import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { persistCustomQuestion } from '../helpers/questions.js';

const router = express.Router();

// GET /api/questions/custom: Loads default or custom questions for this user
router.get('/questions/custom', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  try {
    const qRes = await pool.query(
      `SELECT * FROM ge10_custom_questions
       WHERE user_id = $1
          OR user_id IS NULL
          OR user_id IN (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien'))`,
      [userId]
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
router.post('/questions/confused', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
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
router.put('/questions/custom/:questionId', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
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
router.delete('/questions/custom/:questionId', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
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
router.get('/questions/stats', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  try {
    // Check if user is admin
    const userRes = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [userId]);
    if (userRes.rows.length === 0 || !['truong_vien', 'pho_vien'].includes(userRes.rows[0].role)) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

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
router.get('/questions/stats/student/:studentId', authMiddleware, async (req: any, res) => {
  const userId = req.user.sub;
  const { studentId } = req.params;
  try {
    // Check if user is parent/teacher or student viewing own stats
    const userRes = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [userId]);
    const user = userRes.rows[0];

    if (user.role !== 'truong_vien' && user.role !== 'pho_vien' && userId !== studentId) {
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
