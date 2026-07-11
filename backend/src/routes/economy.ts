import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/economy/transaction: Record a coin transaction for a profile
router.post('/economy/transaction', authMiddleware, async (req: any, res) => {
  try {
    const accountId = req.user?.sub;
    if (!accountId) {
      console.error('No accountId in req.user');
      return res.status(401).json({ error: 'Unauthorized: missing accountId' });
    }

    const { profileId, amount, reason, details } = req.body;
    if (!profileId || amount === undefined) {
      return res.status(400).json({ error: 'Missing profileId or amount.' });
    }

    // Verify profile ownership
    const check = await pool.query('SELECT id FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    // Update coins in player profile
    const result = await pool.query(
      `UPDATE ge10_player_profiles SET coins = GREATEST(0, coins + $1) WHERE user_id = $2 RETURNING coins`,
      [amount, profileId]
    );
    const newCoins = result.rows[0]?.coins ?? 0;
    res.json({ success: true, coins: newCoins, reason, details });
  } catch (error: any) {
    console.error('Error processing economy transaction:', error?.message || error);
    res.status(500).json({ error: 'Failed to process transaction.', details: error?.message });
  }
});

export default router;
