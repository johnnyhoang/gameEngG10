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
      isConfused: row.is_confused
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

export default router;
