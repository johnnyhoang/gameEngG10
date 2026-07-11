import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { checkStudentManagementPermission } from '../helpers/permissions.js';
import { ensureDefaultRewards } from '../helpers/questions.js';
import {
  saveBossCompletionBonusNP,
  saveChallengeEnergyCosts,
  saveBaseXP,
  saveBaseCoins
} from '../helpers/gameSettings.js';

const router = express.Router();

// GET /api/admin/users: Lists all users in the system
router.get('/admin/users', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const usersRes = await pool.query('SELECT id, name, email, avatar_url, role FROM ge10_users');
    res.json(usersRes.rows);
  } catch (error: any) {
    console.error('Error fetching admin users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});

// POST /api/admin/promote: Updates role for a specific user ID
router.post('/admin/promote', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    const adminRole = adminCheck.rows[0].role;
    if (adminRole !== 'truong_vien' && adminRole !== 'pho_vien') {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { targetUserId, newRole } = req.body;
    if (!targetUserId || !newRole) {
      return res.status(400).json({ error: 'Missing targetUserId or newRole.' });
    }

    if (adminRole === 'pho_vien' && newRole !== 'student' && newRole !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Pho Vien can only promote to student or parent.' });
    }

    await pool.query('UPDATE ge10_users SET role = $1 WHERE id = $2', [newRole, targetUserId]);
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error promoting user:', error.message);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// GET /api/admin/audit-logs: Fetches all admin/parent audit logs (only for truong_vien)
router.get('/admin/audit-logs', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || adminCheck.rows[0].role !== 'truong_vien') {
      return res.status(403).json({ error: 'Forbidden: Super Admin access only.' });
    }

    const logsRes = await pool.query('SELECT * FROM ge10_audit_logs ORDER BY created_at DESC LIMIT 200');
    res.json(logsRes.rows);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs.' });
  }
});

// POST /api/admin/deliver-reward: Confirms a student's pending redemption has been handed over in real life
router.post('/admin/deliver-reward', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const { studentUserId, redemptionId } = req.body;
    if (!studentUserId || !redemptionId) {
      return res.status(400).json({ error: 'Missing studentUserId or redemptionId.' });
    }

    const hasPermission = await checkStudentManagementPermission(adminId, studentUserId, 'approve_reward');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to manage this student.' });
    }

    const redemptionRes = await pool.query(
      'SELECT reward_title FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [redemptionId, studentUserId]
    );
    if (redemptionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending redemption not found.' });
    }
    const { reward_title } = redemptionRes.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const deliveredAt = Date.now();
      await client.query(
        "UPDATE ge10_reward_redemptions SET status = 'delivered', delivered_at = $1 WHERE id = $2 AND user_id = $3",
        [deliveredAt, redemptionId, studentUserId]
      );

      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Đã Trao Phần Thưởng',
          `Viện Chủ xác nhận đã trao "${reward_title}" ngoài đời.`,
          0,
          0
        ]
      );

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error delivering reward:', error.message);
    res.status(500).json({ error: 'Failed to deliver reward.' });
  }
});

// POST /api/admin/cancel-redemption: Cancels a student's pending redemption, refunding NP and restocking quantity
router.post('/admin/cancel-redemption', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const { studentUserId, redemptionId } = req.body;
    if (!studentUserId || !redemptionId) {
      return res.status(400).json({ error: 'Missing studentUserId or redemptionId.' });
    }

    const hasPermission = await checkStudentManagementPermission(adminId, studentUserId, 'approve_reward');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to manage this student.' });
    }

    const redemptionRes = await pool.query(
      'SELECT reward_id, reward_title, cost_coins FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [redemptionId, studentUserId]
    );
    if (redemptionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending redemption not found.' });
    }
    const { reward_id, reward_title, cost_coins } = redemptionRes.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2', [redemptionId, studentUserId]);

      // Hoàn NP — được phép âm/dương tùy tình huống, không kẹp đáy (CORE_SPECS §3.1).
      await client.query(
        'UPDATE ge10_player_profiles SET coins = coins + $1 WHERE user_id = $2',
        [cost_coins, studentUserId]
      );

      if (reward_id) {
        await client.query(
          'UPDATE ge10_parent_rewards SET remaining_quantity = remaining_quantity + 1 WHERE id = $1',
          [reward_id]
        );
      }

      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Viện Chủ hoàn trả Ngân Lượng',
          `Hủy lượt đổi "${reward_title}". Đã hoàn lại ${cost_coins} NP`,
          cost_coins,
          0
        ]
      );

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error cancelling redemption:', error.message);
    res.status(500).json({ error: 'Failed to cancel redemption.' });
  }
});

// POST /api/admin/refill-energy: Sets a student's energy to a percentage of the max when parent clicks "⚡ Nạp Năng Lượng"
router.post('/admin/refill-energy', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const { studentUserId } = req.body;
    if (!studentUserId) {
      return res.status(400).json({ error: 'Invalid parameters: studentUserId.' });
    }

    const hasPermission = await checkStudentManagementPermission(adminId, studentUserId, 'refill_energy');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to configure energy for this student.' });
    }

    const currentRes = await pool.query('SELECT energy, max_energy FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    if (currentRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    const rawPercent = Number(req.body.energyPercent);
    const rawEnergyValue = Number(req.body.energyValue);
    const maxEnergy = currentRes.rows[0].max_energy ?? 100;
    let targetEnergy = maxEnergy;
    if (Number.isFinite(rawPercent)) {
      const clampedPercent = Math.max(0, Math.min(100, rawPercent));
      targetEnergy = Math.round((maxEnergy * clampedPercent) / 100);
    } else if (Number.isFinite(rawEnergyValue)) {
      targetEnergy = Math.max(0, Math.min(maxEnergy, Math.round(rawEnergyValue)));
    }

    await pool.query(
      'UPDATE ge10_player_profiles SET energy = $2, energy_depleted_at = CASE WHEN $2 > 0 THEN NULL ELSE energy_depleted_at END, server_updated_at = NOW() WHERE user_id = $1',
      [studentUserId, targetEnergy]
    );

    // Log the energy refill log
    const logId = `log-refill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await pool.query(
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, coins_changed, xp_changed, wallet_changed)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        logId,
        studentUserId,
        Date.now(),
        'exercise',
        '⚡ Bơm Năng Lượng',
        `Ba Mẹ đã cập nhật năng lượng cho bé lên ${targetEnergy}/${maxEnergy} (${Math.round((targetEnergy / maxEnergy) * 100)}%).`,
        0,
        0,
        0
      ]
    );

    res.json({ success: true, energy: targetEnergy, maxEnergy: maxEnergy });
  } catch (error: any) {
    console.error('Error refilling energy:', error.message);
    res.status(500).json({ error: 'Failed to refill energy.' });
  }
});

// POST /api/admin/set-energy-config: Phụ huynh chỉnh Trần Chân Khí + giờ hồi RIÊNG cho 1 con (SUB_SPEC_ENERGY §2).
router.post('/admin/set-energy-config', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const { studentUserId, maxEnergy, resetHours } = req.body || {};
    if (!studentUserId) {
      return res.status(400).json({ error: 'Invalid parameters: studentUserId.' });
    }

    const hasPermission = await checkStudentManagementPermission(adminId, studentUserId, 'set_energy_config');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to configure energy for this student.' });
    }

    const clampedMax = Math.max(50, Math.min(300, Math.round(Number(maxEnergy))));
    if (!Number.isFinite(clampedMax)) {
      return res.status(400).json({ error: 'Invalid maxEnergy value.' });
    }
    const allowedResetHours = [2, 3, 5];
    const normalizedResetHours = allowedResetHours.includes(Number(resetHours)) ? Number(resetHours) : 3;

    const currentRes = await pool.query('SELECT energy FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    if (currentRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    // Hạ trần thấp hơn năng lượng hiện có thì clamp luôn energy xuống trần mới, tránh hiển thị tràn (VD 120/100).
    const clampedEnergy = Math.min(currentRes.rows[0].energy, clampedMax);

    await pool.query(
      'UPDATE ge10_player_profiles SET max_energy = $2, reset_hours = $3, energy = $4, server_updated_at = NOW() WHERE user_id = $1',
      [studentUserId, clampedMax, normalizedResetHours, clampedEnergy]
    );

    res.json({ success: true, maxEnergy: clampedMax, resetHours: normalizedResetHours, energy: clampedEnergy });
  } catch (error: any) {
    console.error('Error updating student energy config:', error.message);
    res.status(500).json({ error: 'Failed to update energy config.' });
  }
});

// PUT /api/admin/game-settings: Updates global game configuration parameters
router.put('/admin/game-settings', authMiddleware, async (req: any, res: any) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [adminId]);
    if (adminCheck.rowCount === 0 || (adminCheck.rows[0].role !== 'truong_vien' && adminCheck.rows[0].role !== 'pho_vien')) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const { bossCompletionBonusNP, challengeEnergyCosts, baseXP, baseCoins } = req.body || {};
    const response: any = { success: true };

    if (bossCompletionBonusNP !== undefined) {
      if (!Array.isArray(bossCompletionBonusNP) || bossCompletionBonusNP.length !== 3) {
        return res.status(400).json({ error: 'Invalid parameters: bossCompletionBonusNP must contain 3 values.' });
      }
      const normalizedBonus = bossCompletionBonusNP.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number];
      if (normalizedBonus.some(v => !Number.isFinite(v))) {
        return res.status(400).json({ error: 'Invalid boss completion bonus values.' });
      }
      await saveBossCompletionBonusNP(normalizedBonus);
      response.bossCompletionBonusNP = normalizedBonus;
    }

    if (challengeEnergyCosts !== undefined) {
      if (!Array.isArray(challengeEnergyCosts) || challengeEnergyCosts.length !== 4) {
        return res.status(400).json({ error: 'Invalid parameters: challengeEnergyCosts must contain 4 values.' });
      }
      const normalizedCosts = challengeEnergyCosts.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number, number];
      if (normalizedCosts.some(v => !Number.isFinite(v))) {
        return res.status(400).json({ error: 'Invalid challenge energy values.' });
      }
      await saveChallengeEnergyCosts(normalizedCosts);
      response.challengeEnergyCosts = normalizedCosts;
    }

    if (baseXP !== undefined) {
      const val = Math.max(1, Math.round(Number(baseXP)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid baseXP value.' });
      }
      await saveBaseXP(val);
      response.baseXP = val;
    }

    if (baseCoins !== undefined) {
      const val = Math.max(1, Math.round(Number(baseCoins)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid baseCoins value.' });
      }
      await saveBaseCoins(val);
      response.baseCoins = val;
    }

    res.json(response);
  } catch (error: any) {
    console.error('Error updating game settings:', error.message);
    res.status(500).json({ error: 'Failed to update game settings.' });
  }
});

// GET /api/admin/student-profile: Retrieves another student's profile statistics, logs, and pet state
router.get('/admin/student-profile', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const { studentUserId } = req.query;
    if (!studentUserId) {
      return res.status(400).json({ error: 'Missing studentUserId query parameter.' });
    }

    const hasPermission = await checkStudentManagementPermission(adminId, studentUserId as string, 'view_profile');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to view this student profile.' });
    }

    const userRes = await pool.query('SELECT id, name, email, avatar_url, role FROM ge10_users WHERE id = $1', [studentUserId]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    const userRow = userRes.rows[0];

    const playerRes = await pool.query('SELECT * FROM ge10_player_profiles WHERE user_id = $1', [studentUserId]);
    const petRes = await pool.query('SELECT * FROM ge10_pet_states WHERE user_id = $1', [studentUserId]);
    const statsRes = await pool.query('SELECT * FROM ge10_category_stats WHERE user_id = $1', [studentUserId]);
    const logsRes = await pool.query('SELECT * FROM ge10_history_logs WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 100', [studentUserId]);
    await ensureDefaultRewards(studentUserId as string);
    const rewardsRes = await pool.query('SELECT * FROM ge10_parent_rewards WHERE user_id = $1 ORDER BY timestamp DESC', [studentUserId]);
    const redemptionsRes = await pool.query('SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 ORDER BY timestamp DESC', [studentUserId]);

    const categoryStats: any = {};
    statsRes.rows.forEach((row: any) => {
      categoryStats[row.category] = {
        category: row.category,
        totalAnswered: row.total_answered,
        totalCorrect: row.total_correct,
        rollingAccuracy: row.rolling_accuracy
      };
    });

    const logs = logsRes.rows.map((row: any) => ({
      id: row.id,
      timestamp: Number(row.timestamp),
      activityType: row.activity_type,
      title: row.title,
      detail: row.detail,
      coinsChanged: row.coins_changed,
      xpChanged: row.xp_changed,
      walletChanged: row.wallet_changed
    }));

    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costCoins: row.cost_coins,
      quantity: row.quantity,
      remainingQuantity: row.remaining_quantity,
      timestamp: Number(row.timestamp)
    }));

    const rewardRedemptions = redemptionsRes.rows.map((row: any) => ({
      id: row.id,
      rewardId: row.reward_id,
      rewardTitle: row.reward_title,
      costCoins: row.cost_coins,
      status: row.status,
      timestamp: Number(row.timestamp),
      deliveredAt: row.delivered_at ? Number(row.delivered_at) : undefined
    }));

    res.json({
      studentUser: userRow,
      player: playerRes.rows[0] ? {
        id: playerRes.rows[0].user_id,
        name: userRow.name,
        role: userRow.role,
        level: playerRes.rows[0].level,
        xp: playerRes.rows[0].xp,
        coins: playerRes.rows[0].coins,
        streak: playerRes.rows[0].streak,
        energy: playerRes.rows[0].energy,
        hearts: playerRes.rows[0].hearts,
        lastActive: playerRes.rows[0].last_active,
        badges: playerRes.rows[0].badges || []
      } : null,
      pet: petRes.rows[0] ? {
        name: petRes.rows[0].name,
        stage: petRes.rows[0].stage,
        level: petRes.rows[0].level,
        exp: petRes.rows[0].exp,
        energy: petRes.rows[0].energy,
        mood: petRes.rows[0].mood,
        lastFed: petRes.rows[0].last_fed
      } : null,
      categoryStats,
      logs,
      rewards,
      rewardRedemptions
    });
  } catch (error: any) {
    console.error('Error fetching student profile:', error.message);
    res.status(500).json({ error: 'Failed to retrieve student profile.' });
  }
});

export default router;
