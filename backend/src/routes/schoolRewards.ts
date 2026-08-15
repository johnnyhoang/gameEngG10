import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

// ─────────────────────────────────────────────
// Danh Mục Quà Khuyến Học CHUNG toàn viện (ge10_school_reward_templates) — phía HỌC SINH:
// xem, đổi (redeem), tự huỷ yêu cầu đang chờ. CRUD danh mục là việc của Viện Trưởng/Viện
// Phó, nằm ở /api/admin/school-rewards (routes/admin.ts). Duyệt/huỷ bởi Ban Lãnh Đạo Viện nằm
// ở /api/admin/deliver-reward và /api/admin/cancel-redemption (đã atomic, đúng — không đổi).
//
// Route redeem này trước đây KHÔNG tồn tại — client tự trừ Ruby trong state cục bộ rồi đẩy
// bản ghi redemption qua endpoint sync chung (routes/profiles.ts), không có transaction, không
// trừ tồn kho, không xác thực lại phía server. Đây chính là nguồn gốc bug "đổi quà xong không
// trừ tiền". Route dưới đây làm lại toàn bộ atomic ở server, giống hệt pattern classRewards.ts.
// ─────────────────────────────────────────────

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

function mapReward(row: any) {
  return {
    id: row.id,
    title: row.title,
    costRuby: row.cost_ruby,
    quantity: row.quantity,
    remainingQuantity: row.remaining_quantity,
    isUnlimited: row.is_unlimited,
    createdAt: Number(row.created_at),
  };
}

function mapRedemption(row: any) {
  return {
    id: row.id,
    rewardId: row.reward_id,
    rewardTitle: row.reward_title,
    costRuby: row.cost_ruby,
    status: row.status,
    timestamp: Number(row.timestamp),
    deliveredAt: row.delivered_at ? Number(row.delivered_at) : null,
  };
}

// GET /api/school-rewards
router.get('/school-rewards', async (req: any, res) => {
  try {
    const profileId = req.profile.id;
    const [rewardsRes, redemptionsRes] = await Promise.all([
      pool.query('SELECT * FROM ge10_school_reward_templates ORDER BY created_at DESC'),
      pool.query('SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 ORDER BY timestamp DESC', [profileId]),
    ]);
    return res.json({
      rewards: rewardsRes.rows.map(mapReward),
      redemptions: redemptionsRes.rows.map(mapRedemption),
    });
  } catch (err) {
    console.error('[GET /school-rewards]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/school-rewards/:id/redeem — trừ Ruby, trừ tồn kho (trừ khi is_unlimited), tạo yêu cầu pending — atomic
router.post('/school-rewards/:id/redeem', async (req: any, res) => {
  const rewardId = req.params.id;

  try {
    const profileId = req.profile.id;

    const rewardRes = await pool.query('SELECT * FROM ge10_school_reward_templates WHERE id = $1', [rewardId]);
    const reward = rewardRes.rows[0];
    if (!reward) return res.status(404).json({ error: 'Reward not found' });
    if (!reward.is_unlimited && reward.remaining_quantity <= 0) {
      return res.status(400).json({ error: 'out_of_stock' });
    }

    const playerRes = await pool.query('SELECT ruby FROM ge10_player_profiles WHERE user_id = $1', [profileId]);
    const player = playerRes.rows[0];
    if (!player) return res.status(404).json({ error: 'Player profile not found' });
    if (player.ruby < reward.cost_ruby) {
      return res.status(400).json({ error: 'not_enough_ruby' });
    }

    await pool.query('BEGIN');
    try {
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby - $1 WHERE user_id = $2',
        [reward.cost_ruby, profileId]
      );

      if (!reward.is_unlimited) {
        const updateRes = await pool.query(
          'UPDATE ge10_school_reward_templates SET remaining_quantity = remaining_quantity - 1 WHERE id = $1 AND remaining_quantity > 0 RETURNING id',
          [rewardId]
        );
        if ((updateRes.rowCount ?? 0) === 0) {
          await pool.query('ROLLBACK');
          return res.status(400).json({ error: 'out_of_stock' });
        }
      }

      const redemptionId = crypto.randomUUID();
      await pool.query(
        `INSERT INTO ge10_reward_redemptions (id, user_id, reward_id, reward_title, cost_ruby, status, timestamp)
         VALUES ($1, $2, $3, $4, $5, 'pending', $6)`,
        [redemptionId, profileId, rewardId, reward.title, reward.cost_ruby, Date.now()]
      );

      await pool.query('COMMIT');
      return res.json({ success: true, redemptionId });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[POST /school-rewards/:id/redeem]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/school-rewards/redemptions/:id — Học sinh tự huỷ yêu cầu đang chờ, hoàn Ruby + tồn kho
router.delete('/school-rewards/redemptions/:id', async (req: any, res) => {
  const redemptionId = req.params.id;

  try {
    const profileId = req.profile.id;

    const redemptionRes = await pool.query(
      `SELECT * FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = 'pending'`,
      [redemptionId, profileId]
    );
    const redemption = redemptionRes.rows[0];
    if (!redemption) return res.status(404).json({ error: 'Pending redemption not found' });

    await pool.query('BEGIN');
    try {
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby + $1 WHERE user_id = $2',
        [redemption.cost_ruby, profileId]
      );

      if (redemption.reward_id) {
        await pool.query(
          'UPDATE ge10_school_reward_templates SET remaining_quantity = remaining_quantity + 1 WHERE id = $1 AND is_unlimited = FALSE',
          [redemption.reward_id]
        );
      }

      await pool.query(
        `UPDATE ge10_reward_redemptions SET status = 'cancelled' WHERE id = $1`,
        [redemptionId]
      );

      await pool.query('COMMIT');
      return res.json({ success: true });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[DELETE /school-rewards/redemptions/:id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
