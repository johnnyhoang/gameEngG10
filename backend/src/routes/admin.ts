import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { checkStudentManagementPermission, logAuditEvent } from '../helpers/permissions.js';
import { ensureDefaultRewards } from '../helpers/questions.js';
import {
  saveBossCompletionBonusNP,
  saveChallengeEnergyCosts,
  saveBaseXP,
  saveBaseCoins
} from '../helpers/gameSettings.js';

const router = express.Router();

// GET /api/admin/users: Lists all ACTIVE users (dùng cho danh sách học sinh trong lớp)
router.get('/admin/users', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE account_id = $1 AND role IN (\'truong_vien\', \'pho_vien\') AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const usersRes = await pool.query('SELECT id, name, email, avatar_url, role FROM ge10_users WHERE is_active = TRUE');
    res.json(usersRes.rows);
  } catch (error: any) {
    console.error('Error fetching admin users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});

// GET /api/admin/users-all: Lists ALL profiles (kể cả inactive) gộp theo account_id — dùng cho RoleManager
router.get('/admin/users-all', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE account_id = $1 AND role = \'truong_vien\' AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Hiệu Trưởng mới có thể xem toàn bộ danh sách profile.' });
    }

    // Trả về tất cả profiles kể cả inactive — RoleManager sẽ group theo account_id
    const usersRes = await pool.query(
      'SELECT id, account_id, name, email, avatar_url, role, is_active, created_at FROM ge10_users ORDER BY account_id, created_at'
    );
    res.json({ users: usersRes.rows });
  } catch (error: any) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});


// POST /api/admin/update-user-role: Bật/Tắt (active/deactivate/create) bất kỳ role nào trong 4 role của tài khoản
router.post('/api/admin/update-user-role', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE account_id = $1 AND role = \'truong_vien\' AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Hiệu Trưởng mới có quyền quản lý vai trò.' });
    }

    const { targetAccountId, roleKey, active } = req.body;
    if (!targetAccountId || !roleKey || active === undefined) {
      return res.status(400).json({ error: 'Missing targetAccountId, roleKey, or active status.' });
    }

    // Lấy thông tin cơ bản từ một profile bất kỳ của tài khoản targetAccountId để lấy email, avatar_url, name
    const infoRes = await pool.query(
      'SELECT name, email, avatar_url FROM ge10_users WHERE account_id = $1 LIMIT 1',
      [targetAccountId]
    );
    if (infoRes.rows.length === 0) {
      return res.status(404).json({ error: 'Target account not found.' });
    }
    const baseInfo = infoRes.rows[0];

    // Tìm profile hiện tại của roleKey cho tài khoản đó
    const profileCheck = await pool.query(
      'SELECT id, is_active FROM ge10_users WHERE account_id = $1 AND role = $2',
      [targetAccountId, roleKey]
    );

    if (active) {
      if (profileCheck.rows.length > 0) {
        // Đã có profile -> Kích hoạt lại
        const existing = profileCheck.rows[0];
        await pool.query('UPDATE ge10_users SET is_active = TRUE WHERE id = $1', [existing.id]);
      } else {
        // Chưa có profile -> Tạo profile mới
        const newProfileId = `u-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Chuẩn hóa tên (Xóa hậu tố cũ nếu có và thêm hậu tố vai trò mới)
        const cleanName = baseInfo.name.replace(/\s*\(Hiệu Trưởng\)|\s*\(Hiệu Phó\)|\s*\(Chủ Nhiệm\)|\s*\(Học Sinh\)/g, '');
        let roleSuffix = '';
        if (roleKey === 'truong_vien') roleSuffix = 'Hiệu Trưởng';
        else if (roleKey === 'pho_vien') roleSuffix = 'Hiệu Phó';
        else if (roleKey === 'parent') roleSuffix = 'Chủ Nhiệm';
        else if (roleKey === 'student') roleSuffix = 'Học Sinh';
        
        const finalName = roleSuffix ? `${cleanName} (${roleSuffix})` : cleanName;

        await pool.query(
          `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
          [newProfileId, targetAccountId, finalName, baseInfo.email, baseInfo.avatar_url, roleKey]
        );

        // Khởi tạo các bảng phụ thuộc cho profile mới
        await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [newProfileId]);
        await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [newProfileId]);
      }
    } else {
      // Vô hiệu hóa
      if (profileCheck.rows.length > 0) {
        const existing = profileCheck.rows[0];
        await pool.query('UPDATE ge10_users SET is_active = FALSE WHERE id = $1', [existing.id]);
      }
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error updating user role:', error.message);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

// GET /api/admin/vice-principal-applications: Lấy tất cả yêu cầu ứng tuyển Hiệu Phó đang chờ duyệt (Chỉ dành cho Hiệu Trưởng)
router.get('/admin/vice-principal-applications', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE account_id = $1 AND role = 'truong_vien' AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Hiệu Trưởng mới có quyền duyệt đơn ứng tuyển Hiệu Phó.' });
    }

    const appsRes = await pool.query(`
      SELECT l.id, l.status, l.created_at, 
             u.id as teacher_id, u.name as teacher_name, u.email as teacher_email, u.avatar_url as teacher_avatar, u.account_id as teacher_account_id
      FROM ge10_family_links l
      JOIN ge10_users u ON l.parent_id = u.id
      WHERE l.link_type = 'vice_principal' AND l.status = 'pending'
      ORDER BY l.created_at DESC
    `);
    res.json(appsRes.rows);
  } catch (error: any) {
    console.error('Error fetching VP applications:', error);
    res.status(500).json({ error: 'Failed to fetch VP applications.', details: error.message });
  }
});

// POST /api/admin/respond-vice-principal: Duyệt hoặc từ chối yêu cầu ứng tuyển Hiệu Phó (Chỉ dành cho Hiệu Trưởng)
router.post('/api/admin/respond-vice-principal', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE account_id = $1 AND role = 'truong_vien' AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Hiệu Trưởng mới có quyền duyệt đơn ứng tuyển.' });
    }

    const { applicationId, accept } = req.body;
    if (!applicationId || accept === undefined) {
      return res.status(400).json({ error: 'Missing applicationId or accept status.' });
    }

    // 1. Lấy thông tin đơn ứng tuyển
    const appCheck = await pool.query(
      "SELECT * FROM ge10_family_links WHERE id = $1 AND link_type = 'vice_principal' AND status = 'pending'",
      [applicationId]
    );
    if (appCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Đơn ứng tuyển không tồn tại hoặc đã được xử lý.' });
    }
    const appRow = appCheck.rows[0];
    const teacherProfileId = appRow.parent_id;

    // 2. Lấy thông tin tài khoản giáo viên
    const teacherRes = await pool.query(
      "SELECT account_id, name, email, avatar_url FROM ge10_users WHERE id = $1",
      [teacherProfileId]
    );
    if (teacherRes.rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin giáo viên ứng tuyển.' });
    }
    const teacherInfo = teacherRes.rows[0];
    const targetAccountId = teacherInfo.account_id;

    if (accept) {
      // 3. Kích hoạt hoặc Tạo mới profile pho_vien (Hiệu Phó) cho tài khoản này
      const profileCheck = await pool.query(
        "SELECT id FROM ge10_users WHERE account_id = $1 AND role = 'pho_vien'",
        [targetAccountId]
      );

      if (profileCheck.rows.length > 0) {
        // Đã từng có profile -> Kích hoạt lại
        await pool.query("UPDATE ge10_users SET is_active = TRUE WHERE id = $1", [profileCheck.rows[0].id]);
      } else {
        // Chưa có profile -> Tạo mới profile Hiệu Phó
        const newProfileId = `u-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const cleanName = teacherInfo.name.replace(/\s*\(Hiệu Trưởng\)|\s*\(Hiệu Phó\)|\s*\(Chủ Nhiệm\)|\s*\(Học Sinh\)/g, '');
        const finalName = `${cleanName} (Hiệu Phó)`;

        await pool.query(
          `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
           VALUES ($1, $2, $3, $4, $5, 'pho_vien', TRUE)`,
          [newProfileId, targetAccountId, finalName, teacherInfo.email, teacherInfo.avatar_url]
        );

        // Khởi tạo player_profile & pet_state
        await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [newProfileId]);
        await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [newProfileId]);
      }

      // Cập nhật trạng thái đơn ứng tuyển sang active
      await pool.query("UPDATE ge10_family_links SET status = 'active' WHERE id = $1", [applicationId]);
      await logAuditEvent(teacherProfileId, 'approve_vice_principal_request', null, { applicationId });
    } else {
      // Từ chối: Xóa đơn ứng tuyển
      await pool.query("DELETE FROM ge10_family_links WHERE id = $1", [applicationId]);
      await logAuditEvent(teacherProfileId, 'reject_vice_principal_request', null, { applicationId });
    }

    res.json({ success: true, message: accept ? 'Đã duyệt thăng cấp Hiệu Phó thành công!' : 'Đã từ chối đơn ứng tuyển.' });
  } catch (error: any) {
    console.error('Error responding to VP application:', error);
    res.status(500).json({ error: 'Failed to process application.', details: error.message });
  }
});

// GET /api/admin/audit-logs: Fetches all admin/parent audit logs (only for truong_vien)
router.get('/admin/audit-logs', authMiddleware, async (req: any, res) => {
  const adminId = req.user.sub;
  try {
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE account_id = $1 AND role = \'truong_vien\' AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
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
          `Hiệu Trưởng xác nhận đã trao "${reward_title}" ngoài đời.`,
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
          'Hiệu Trưởng hoàn trả Ngân Lượng',
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

// POST /api/admin/set-energy-config: Chủ nhiệm chỉnh Trần Chân Khí + giờ hồi RIÊNG cho 1 con (SUB_SPEC_ENERGY §2).
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
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE account_id = $1 AND role IN (\'truong_vien\', \'pho_vien\') AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
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
