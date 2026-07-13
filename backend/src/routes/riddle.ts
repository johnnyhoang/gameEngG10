import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

const ALLOWED_MODES = new Set(['ruby-riddle', 'encounter-sprint']);

router.get('/riddle-history', async (req: any, res) => {
  const profileId = String(req.query.profileId || '');
  const mode = String(req.query.mode || '');
  if (!profileId || !ALLOWED_MODES.has(mode)) return res.status(400).json({ error: 'Invalid profileId or mode' });
  if (req.profile.id !== profileId) return res.status(403).json({ error: 'Forbidden' });

  try {
    const result = await pool.query(
      `SELECT question_id, used_at
       FROM ge10_riddle_history
       WHERE profile_id = $1 AND mode = $2 AND used_at >= NOW() - INTERVAL '30 days'
       ORDER BY used_at DESC`,
      [profileId, mode]
    );
    return res.json(result.rows.map(row => ({ questionId: row.question_id, usedAt: row.used_at })));
  } catch (error) {
    console.error('Error fetching riddle history:', error);
    return res.status(500).json({ error: 'Failed to fetch riddle history' });
  }
});

router.post('/riddle-history', async (req: any, res) => {
  const { profileId, mode, questionId } = req.body ?? {};
  if (!profileId || !questionId || !ALLOWED_MODES.has(mode)) return res.status(400).json({ error: 'Invalid payload' });
  if (req.profile.id !== profileId) return res.status(403).json({ error: 'Forbidden' });

  try {
    await pool.query(
      'INSERT INTO ge10_riddle_history (profile_id, mode, question_id) VALUES ($1, $2, $3)',
      [profileId, mode, questionId]
    );
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Error recording riddle history:', error);
    return res.status(500).json({ error: 'Failed to record riddle history' });
  }
});

export default router;
