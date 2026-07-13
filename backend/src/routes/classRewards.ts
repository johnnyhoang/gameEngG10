import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

import { ensureDefaultClassRewards } from '../helpers/questions.js';

const router = express.Router();

const TEACHER_ROLES = ['parent', 'secondary_parent', 'truong_vien', 'pho_vien'];

async function getProfileId(accountId: string): Promise<string | null> {
  const res = await pool.query('SELECT id FROM ge10_users WHERE account_id = $1', [accountId]);
  return res.rows[0]?.id || null;
}

async function getUserRole(profileId: string): Promise<string | null> {
  const res = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [profileId]);
  return res.rows[0]?.role || null;
}

// ─────────────────────────────────────────────
// GET /api/class-rewards
// Teacher → rewards they created + all redemptions for those rewards
// Student in class → class rewards from their teachers + their own redemptions
// Student orphan → { rewards: [], redemptions: [], isOrphan: true }
// ─────────────────────────────────────────────
router.get('/class-rewards', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    const role = await getUserRole(profileId);
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (isTeacher) {
      await ensureDefaultClassRewards(profileId);
      const rewardsRes = await pool.query(
        'SELECT * FROM ge10_class_rewards WHERE teacher_id = $1 ORDER BY created_at DESC',
        [profileId]
      );
      const rewardIds = rewardsRes.rows.map((r: any) => r.id);

      let redemptions: any[] = [];
      if (rewardIds.length > 0) {
        const rRes = await pool.query(
          `SELECT r.*, u.name AS student_name, u.avatar_url AS student_avatar
           FROM ge10_class_reward_redemptions r
           JOIN ge10_users u ON u.id = r.student_id
           WHERE r.class_reward_id = ANY($1::text[])
           ORDER BY r.requested_at DESC`,
          [rewardIds]
        );
        redemptions = rRes.rows;
      }

      return res.json({ rewards: rewardsRes.rows, redemptions, isOrphan: false });
    }

    // Student: check if in a class
    const linksRes = await pool.query(
      `SELECT parent_id FROM ge10_family_links WHERE student_id = $1 AND status = 'active'`,
      [profileId]
    );
    const teacherIds = linksRes.rows.map((r: any) => r.parent_id);

    if (teacherIds.length === 0) {
      return res.json({ rewards: [], redemptions: [], isOrphan: true });
    }

    // Seed default rewards for student's teachers if not existing
    for (const tId of teacherIds) {
      await ensureDefaultClassRewards(tId);
    }

    const rewardsRes = await pool.query(
      `SELECT cr.*, u.name AS teacher_name
       FROM ge10_class_rewards cr
       JOIN ge10_users u ON u.id = cr.teacher_id
       WHERE cr.teacher_id = ANY($1::text[])
       ORDER BY cr.created_at DESC`,
      [teacherIds]
    );
    const rewardIds = rewardsRes.rows.map((r: any) => r.id);

    let myRedemptions: any[] = [];
    if (rewardIds.length > 0) {
      const rRes = await pool.query(
        `SELECT * FROM ge10_class_reward_redemptions
         WHERE student_id = $1 AND class_reward_id = ANY($2::text[])
         ORDER BY requested_at DESC`,
        [profileId, rewardIds]
      );
      myRedemptions = rRes.rows;
    }

    return res.json({ rewards: rewardsRes.rows, redemptions: myRedemptions, isOrphan: false });
  } catch (err) {
    console.error('[GET /class-rewards]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// POST /api/class-rewards — Teacher creates a class reward
// ─────────────────────────────────────────────
router.post('/class-rewards', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  const { title, quantity } = req.body;
  const costRuby = req.body.costRuby ?? req.body.costCoins;
  if (!title?.trim() || !costRuby || !quantity || costRuby <= 0 || quantity <= 0) {
    return res.status(400).json({ error: 'Missing or invalid fields: title, costRuby, quantity' });
  }

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    const role = await getUserRole(profileId);
    if (!TEACHER_ROLES.includes(role || '')) {
      return res.status(403).json({ error: 'Only teachers can create class rewards' });
    }

    const id = crypto.randomUUID();
    const now = Date.now();

    await pool.query(
      `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, created_at)
       VALUES ($1, $2, $3, $4, $5, $5, $6)`,
      [id, profileId, title.trim(), costRuby, quantity, now]
    );

    return res.json({ success: true, id, createdAt: now });
  } catch (err) {
    console.error('[POST /class-rewards]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/class-rewards/:id — Teacher deletes a class reward
// ─────────────────────────────────────────────
router.delete('/class-rewards/:id', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const rewardId = req.params.id;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    const check = await pool.query(
      'SELECT id FROM ge10_class_rewards WHERE id = $1 AND teacher_id = $2',
      [rewardId, profileId]
    );
    if (check.rows.length === 0) {
      return res.status(403).json({ error: 'Reward not found or not owned by you' });
    }

    await pool.query('DELETE FROM ge10_class_rewards WHERE id = $1', [rewardId]);
    return res.json({ success: true });
  } catch (err) {
    console.error('[DELETE /class-rewards/:id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// POST /api/class-rewards/:id/redeem — Student redeems (deduct ruby, remaining--, create pending redemption)
// ─────────────────────────────────────────────
router.post('/class-rewards/:id/redeem', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const rewardId = req.params.id;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    // Fetch reward
    const rewardRes = await pool.query('SELECT * FROM ge10_class_rewards WHERE id = $1', [rewardId]);
    const reward = rewardRes.rows[0];
    if (!reward) return res.status(404).json({ error: 'Reward not found' });
    if (reward.remaining <= 0) return res.status(400).json({ error: 'out_of_stock' });

    // Verify student is linked to this teacher
    const linkCheck = await pool.query(
      `SELECT id FROM ge10_family_links WHERE student_id = $1 AND parent_id = $2 AND status = 'active'`,
      [profileId, reward.teacher_id]
    );
    if (linkCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not in this class' });
    }

    // Check ruby
    const playerRes = await pool.query(
      'SELECT ruby FROM ge10_player_profiles WHERE user_id = $1',
      [profileId]
    );
    const player = playerRes.rows[0];
    if (!player) return res.status(404).json({ error: 'Player profile not found' });
    if (player.ruby < reward.cost_ruby) {
      return res.status(400).json({ error: 'not_enough_ruby' });
    }

    // Atomic transaction
    await pool.query('BEGIN');
    try {
      // Deduct ruby
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby - $1 WHERE user_id = $2',
        [reward.cost_ruby, profileId]
      );

      // Decrement remaining (race-condition safe)
      const updateRes = await pool.query(
        'UPDATE ge10_class_rewards SET remaining = remaining - 1 WHERE id = $1 AND remaining > 0 RETURNING id',
        [rewardId]
      );
      if ((updateRes.rowCount ?? 0) === 0) {
        await pool.query('ROLLBACK');
        return res.status(400).json({ error: 'out_of_stock' });
      }

      // Create redemption record
      const redemptionId = crypto.randomUUID();
      await pool.query(
        `INSERT INTO ge10_class_reward_redemptions
           (id, class_reward_id, student_id, reward_title, cost_ruby, status, requested_at)
         VALUES ($1, $2, $3, $4, $5, 'pending', $6)`,
        [redemptionId, rewardId, profileId, reward.title, reward.cost_ruby, Date.now()]
      );

      await pool.query('COMMIT');
      return res.json({ success: true, redemptionId });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[POST /class-rewards/:id/redeem]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/class-rewards/redemptions/:id — Student cancels a pending redemption
// Refunds ruby + increments remaining
// ─────────────────────────────────────────────
router.delete('/class-rewards/redemptions/:id', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const redemptionId = req.params.id;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    const redemptionRes = await pool.query(
      `SELECT r.*, cr.id AS reward_fk
       FROM ge10_class_reward_redemptions r
       JOIN ge10_class_rewards cr ON cr.id = r.class_reward_id
       WHERE r.id = $1 AND r.student_id = $2 AND r.status = 'pending'`,
      [redemptionId, profileId]
    );
    const redemption = redemptionRes.rows[0];
    if (!redemption) return res.status(404).json({ error: 'Pending redemption not found' });

    await pool.query('BEGIN');
    try {
      // Refund ruby
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby + $1 WHERE user_id = $2',
        [redemption.cost_ruby, profileId]
      );
      // Restore remaining
      await pool.query(
        'UPDATE ge10_class_rewards SET remaining = remaining + 1 WHERE id = $1',
        [redemption.reward_fk]
      );
      // Mark cancelled
      await pool.query(
        `UPDATE ge10_class_reward_redemptions SET status = 'cancelled' WHERE id = $1`,
        [redemptionId]
      );

      await pool.query('COMMIT');
      return res.json({ success: true });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[DELETE /class-rewards/redemptions/:id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/class-rewards/redemptions/:id/deliver — Teacher marks as delivered
// ─────────────────────────────────────────────
router.patch('/class-rewards/redemptions/:id/deliver', authMiddleware, async (req: any, res) => {
  const accountId = req.user?.sub;
  const redemptionId = req.params.id;
  if (!accountId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const profileId = await getProfileId(accountId);
    if (!profileId) return res.status(404).json({ error: 'Profile not found' });

    // Verify teacher owns the reward and redemption is pending
    const check = await pool.query(
      `SELECT r.id FROM ge10_class_reward_redemptions r
       JOIN ge10_class_rewards cr ON cr.id = r.class_reward_id
       WHERE r.id = $1 AND cr.teacher_id = $2 AND r.status = 'pending'`,
      [redemptionId, profileId]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Redemption not found or already processed' });
    }

    await pool.query(
      `UPDATE ge10_class_reward_redemptions SET status = 'delivered', delivered_at = $1 WHERE id = $2`,
      [Date.now(), redemptionId]
    );

    return res.json({ success: true });
  } catch (err) {
    console.error('[PATCH /class-rewards/redemptions/:id/deliver]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
