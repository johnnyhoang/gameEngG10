import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

// POST /api/economy/transaction: Record a Ruby transaction for a profile
router.post('/economy/transaction', async (req: any, res) => {
  try {
    const { profileId, amount, reason, details } = req.body;
    if (!profileId || amount === undefined) {
      return res.status(400).json({ error: 'Missing profileId or amount.' });
    }

    if (profileId !== req.profile.id) return res.status(403).json({ error: 'Profile ID does not match active profile.' });

    // Update ruby in player profile
    const result = await pool.query(
      `UPDATE ge10_player_profiles SET ruby = GREATEST(0, ruby + $1) WHERE user_id = $2 RETURNING ruby`,
      [amount, profileId]
    );
    const newRuby = result.rows[0]?.ruby ?? 0;
    res.json({ success: true, ruby: newRuby, coins: newRuby, reason, details });
  } catch (error: any) {
    console.error('Error processing economy transaction:', error?.message || error);
    res.status(500).json({ error: 'Failed to process transaction.', details: error?.message });
  }
});

export default router;
