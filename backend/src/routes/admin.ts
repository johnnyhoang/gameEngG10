import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';
import { checkStudentManagementPermission, logAuditEvent } from '../helpers/permissions.js';
import { ensureDefaultRewards } from '../helpers/questions.js';
import {
  saveBossCompletionBonusRuby,
  saveChallengeEnergyCosts,
  saveBaseXP,
  saveBaseRuby
} from '../helpers/gameSettings.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

// GET /api/admin/users: Lists active users and links (academy-wide for admins, class-specific for teachers)
router.get('/admin/users', authMiddleware, async (req: any, res) => {
  try {
    const callerProfileId = req.profile.id;
    const callerRole = req.profile.role;

    if (callerRole === 'truong_vien' || callerRole === 'pho_vien') {
      // 1. Admin: Lấy toàn bộ học viên và cán bộ trong viện
      const usersRes = await pool.query(`
        SELECT u.id, u.name, u.email, u.avatar_url, u.role,
               p.level, p.xp, p.ruby, p.streak, p.energy, p.max_energy, p.reset_hours
        FROM ge10_users u
        LEFT JOIN ge10_player_profiles p ON u.id = p.user_id
        WHERE u.is_active = TRUE
        ORDER BY u.role, u.name
      `);

      const linksRes = await pool.query(`
        SELECT l.id, l.parent_id, l.student_id, l.link_type, l.status,
               u_parent.name as parent_name, u_parent.role as parent_role,
               u_student.name as student_name, u_student.role as student_role
        FROM ge10_class_links l
        JOIN ge10_users u_parent ON l.parent_id = u_parent.id
        JOIN ge10_users u_student ON l.student_id = u_student.id
        WHERE l.status = 'active'
      `);

      return res.json({ users: usersRes.rows, links: linksRes.rows });
    } else if (callerRole === 'parent' || callerRole === 'secondary_parent') {
      // 2. Giáo viên: Chỉ lấy thông tin liên quan đến lớp của mình
      const studentsRes = await pool.query(`
        SELECT DISTINCT u.id, u.name, u.email, u.avatar_url, u.role,
               p.level, p.xp, p.ruby, p.streak, p.energy, p.max_energy, p.reset_hours
        FROM ge10_users u
        JOIN ge10_class_links l ON u.id = l.student_id
        LEFT JOIN ge10_player_profiles p ON u.id = p.user_id
        WHERE l.parent_id = $1 AND l.status = 'active' AND u.is_active = TRUE
      `, [callerProfileId]);

      const studentIds = studentsRes.rows.map(s => s.id);
      let relatedUsers = [...studentsRes.rows];

      // Thêm chính profile của giáo viên gọi API
      const callerProfileRes = await pool.query(`
        SELECT u.id, u.name, u.email, u.avatar_url, u.role
        FROM ge10_users u
        WHERE u.id = $1
      `, [callerProfileId]);
      if ((callerProfileRes.rowCount ?? 0) > 0) {
        relatedUsers.push(callerProfileRes.rows[0]);
      }

      let linksRows: any[] = [];

      if (studentIds.length > 0) {
        // Lấy thêm các giáo viên phụ/co-teachers quản lý chung các học sinh này
        const coTeachersRes = await pool.query(`
          SELECT DISTINCT u.id, u.name, u.email, u.avatar_url, u.role
          FROM ge10_users u
          JOIN ge10_class_links l ON u.id = l.parent_id
          WHERE l.student_id = ANY($1) AND l.status = 'active' AND u.id != $2 AND u.is_active = TRUE
        `, [studentIds, callerProfileId]);

        relatedUsers.push(...coTeachersRes.rows);

        // Lấy thêm Ban Giám Hiệu (Viện Trưởng/Phó Viện Trưởng) để giáo viên liên hệ
        const adminsRes = await pool.query(`
          SELECT u.id, u.name, u.email, u.avatar_url, u.role
          FROM ge10_users u
          WHERE u.role IN ('truong_vien', 'pho_vien') AND u.is_active = TRUE
        `);
        relatedUsers.push(...adminsRes.rows);

        // Lấy tất cả links kết nối liên quan đến các học sinh này
        const linksRes = await pool.query(`
          SELECT l.id, l.parent_id, l.student_id, l.link_type, l.status,
                 u_parent.name as parent_name, u_parent.role as parent_role,
                 u_student.name as student_name, u_student.role as student_role
          FROM ge10_class_links l
          JOIN ge10_users u_parent ON l.parent_id = u_parent.id
          JOIN ge10_users u_student ON l.student_id = u_student.id
          WHERE l.student_id = ANY($1) AND l.status = 'active'
        `, [studentIds]);

        linksRows = linksRes.rows;
      } else {
        // Nếu lớp trống, vẫn trả về Ban Giám Hiệu để giáo viên liên hệ
        const adminsRes = await pool.query(`
          SELECT u.id, u.name, u.email, u.avatar_url, u.role
          FROM ge10_users u
          WHERE u.role IN ('truong_vien', 'pho_vien') AND u.is_active = TRUE
        `);
        relatedUsers.push(...adminsRes.rows);
      }

      // Loại trùng lặp users
      const uniqueUsersMap = new Map();
      relatedUsers.forEach(u => uniqueUsersMap.set(u.id, u));

      return res.json({ users: Array.from(uniqueUsersMap.values()), links: linksRows });
    } else {
      return res.status(403).json({ error: 'Forbidden: Vai trò này không được phép truy cập roster.' });
    }
  } catch (error: any) {
    console.error('Error fetching admin users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users list.' });
  }
});

// GET /api/admin/users-all: Lists ALL profiles (kể cả inactive) gộp theo account_id — dùng cho RoleManager
router.get('/admin/users-all', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE id = $1 AND role IN ('truong_vien', 'pho_vien') AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Ban Giám Hiệu mới có thể xem toàn bộ danh sách profile.' });
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
router.post('/admin/update-user-role', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE id = $1 AND role IN ('truong_vien', 'pho_vien') AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Ban Giám Hiệu mới có quyền quản lý vai trò.' });
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
        const cleanName = baseInfo.name.replace(/\s*\((?:Hiệu Trưởng|Hiệu Phó|Viện Trưởng|Phó Viện Trưởng|Chủ Nhiệm|Chủ Nhiệm Chính|Học Sinh|Sĩ Tử)\)/g, '');
        let roleSuffix = '';
        if (roleKey === 'truong_vien') roleSuffix = 'Viện Trưởng';
        else if (roleKey === 'pho_vien') roleSuffix = 'Phó Viện Trưởng';
        else if (roleKey === 'parent') roleSuffix = 'Chủ Nhiệm Chính';
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

// GET /api/admin/vice-principal-applications: Lấy tất cả yêu cầu ứng tuyển Phó Viện Trưởng đang chờ duyệt (Chỉ dành cho Viện Trưởng)
router.get('/admin/vice-principal-applications', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE id = $1 AND role IN ('truong_vien', 'pho_vien') AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Ban Giám Hiệu mới có quyền duyệt đơn ứng tuyển Phó Viện Trưởng.' });
    }

    const appsRes = await pool.query(`
      SELECT l.id, l.status, l.created_at, 
             u.id as teacher_id, u.name as teacher_name, u.email as teacher_email, u.avatar_url as teacher_avatar, u.account_id as teacher_account_id
      FROM ge10_class_links l
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

// POST /api/admin/respond-vice-principal: Duyệt hoặc từ chối yêu cầu ứng tuyển Phó Viện Trưởng (Chỉ dành cho Viện Trưởng)
router.post('/admin/respond-vice-principal', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE id = $1 AND role IN ('truong_vien', 'pho_vien') AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Ban Giám Hiệu mới có quyền duyệt đơn ứng tuyển.' });
    }

    const { applicationId, accept } = req.body;
    if (!applicationId || accept === undefined) {
      return res.status(400).json({ error: 'Missing applicationId or accept status.' });
    }

    // 1. Lấy thông tin đơn ứng tuyển
    const appCheck = await pool.query(
      "SELECT * FROM ge10_class_links WHERE id = $1 AND link_type = 'vice_principal' AND status = 'pending'",
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
      // 3. Kích hoạt hoặc Tạo mới profile pho_vien (Phó Viện Trưởng) cho tài khoản này
      const profileCheck = await pool.query(
        "SELECT id FROM ge10_users WHERE account_id = $1 AND role = 'pho_vien'",
        [targetAccountId]
      );

      if (profileCheck.rows.length > 0) {
        // Đã từng có profile -> Kích hoạt lại
        await pool.query("UPDATE ge10_users SET is_active = TRUE WHERE id = $1", [profileCheck.rows[0].id]);
      } else {
        // Chưa có profile -> Tạo mới profile Phó Viện Trưởng
        const newProfileId = `u-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const cleanName = teacherInfo.name.replace(/\s*\((?:Hiệu Trưởng|Hiệu Phó|Viện Trưởng|Phó Viện Trưởng|Chủ Nhiệm|Chủ Nhiệm Chính|Học Sinh|Sĩ Tử)\)/g, '');
        const finalName = `${cleanName} (Phó Viện Trưởng)`;

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
      await pool.query("UPDATE ge10_class_links SET status = 'active' WHERE id = $1", [applicationId]);
      await logAuditEvent(teacherProfileId, 'approve_vice_principal_request', null, { applicationId });
    } else {
      // Từ chối: Xóa đơn ứng tuyển
      await pool.query("DELETE FROM ge10_class_links WHERE id = $1", [applicationId]);
      await logAuditEvent(teacherProfileId, 'reject_vice_principal_request', null, { applicationId });
    }

    res.json({ success: true, message: accept ? 'Đã duyệt thăng cấp Phó Viện Trưởng thành công!' : 'Đã từ chối đơn ứng tuyển.' });
  } catch (error: any) {
    console.error('Error responding to VP application:', error);
    res.status(500).json({ error: 'Failed to process application.', details: error.message });
  }
});

// GET /api/admin/audit-logs: Fetches all admin/parent audit logs (only for truong_vien)
router.get('/admin/audit-logs', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      "SELECT role FROM ge10_users WHERE id = $1 AND role IN ('truong_vien', 'pho_vien') AND is_active = TRUE",
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Ban Giám Hiệu mới có quyền truy cập nhật ký.' });
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
  const adminId = req.profile.id;
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
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Đã Trao Quà',
          `Viện Trưởng xác nhận đã trao "${reward_title}" ngoài đời.`,
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

// POST /api/admin/cancel-redemption: Cancels a student's pending redemption, refunding Ruby and restocking quantity
router.post('/admin/cancel-redemption', authMiddleware, async (req: any, res) => {
  const adminId = req.profile.id;
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
      'SELECT reward_id, reward_title, cost_ruby FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2 AND status = \'pending\'',
      [redemptionId, studentUserId]
    );
    if (redemptionRes.rowCount === 0) {
      return res.status(404).json({ error: 'Pending redemption not found.' });
    }
    const { reward_id, reward_title, cost_ruby } = redemptionRes.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM ge10_reward_redemptions WHERE id = $1 AND user_id = $2', [redemptionId, studentUserId]);

      // Hoàn Ruby — được phép âm/dương tùy tình huống, không kẹp đáy (CORE_SPECS §3.1).
      await client.query(
        'UPDATE ge10_player_profiles SET ruby = ruby + $1 WHERE user_id = $2',
        [cost_ruby, studentUserId]
      );

      if (reward_id) {
        await client.query(
          'UPDATE ge10_parent_rewards SET remaining_quantity = remaining_quantity + 1 WHERE id = $1',
          [reward_id]
        );
      }

      const logId = `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await client.query(
        `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed, xp_changed)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          logId,
          studentUserId,
          Date.now(),
          'parent_approve',
          'Viện Trưởng hoàn trả Ruby',
          `Hủy lượt đổi "${reward_title}". Đã hoàn lại ${cost_ruby} Ruby`,
          cost_ruby,
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
  const adminId = req.profile.id;
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
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed, xp_changed, wallet_changed)
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

// POST /api/admin/set-energy-config: Chủ nhiệm chỉnh Trần Năng Lượng + giờ hồi RIÊNG cho 1 con (SUB_SPEC_ENERGY §2).
router.post('/admin/set-energy-config', authMiddleware, async (req: any, res: any) => {
  const adminId = req.profile.id;
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
  const adminId = req.profile.id;
  try {
    const adminCheck = await pool.query(
      'SELECT role FROM ge10_users WHERE id = $1 AND role IN (\'truong_vien\', \'pho_vien\') AND is_active = TRUE',
      [adminId]
    );
    if (adminCheck.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Admin access only.' });
    }

    const bossCompletionBonusRuby = req.body?.bossCompletionBonusRuby ?? req.body?.bossCompletionBonusNP;
    const challengeEnergyCosts = req.body?.challengeEnergyCosts;
    const baseXP = req.body?.baseXP;
    const baseRuby = req.body?.baseRuby ?? req.body?.baseCoins;
    const response: any = { success: true };

    if (bossCompletionBonusRuby !== undefined) {
      if (!Array.isArray(bossCompletionBonusRuby) || bossCompletionBonusRuby.length !== 3) {
        return res.status(400).json({ error: 'Invalid parameters: bossCompletionBonusRuby must contain 3 values.' });
      }
      const normalizedBonus = bossCompletionBonusRuby.map((value: any) => Math.max(0, Math.round(Number(value)))) as [number, number, number];
      if (normalizedBonus.some(v => !Number.isFinite(v))) {
        return res.status(400).json({ error: 'Invalid boss completion bonus values.' });
      }
      await saveBossCompletionBonusRuby(normalizedBonus);
      response.bossCompletionBonusRuby = normalizedBonus;
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

    if (baseRuby !== undefined) {
      const val = Math.max(1, Math.round(Number(baseRuby)));
      if (!Number.isFinite(val)) {
        return res.status(400).json({ error: 'Invalid baseRuby value.' });
      }
      await saveBaseRuby(val);
      response.baseRuby = val;
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
  const adminId = req.profile.id;
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
      rubyChanged: row.ruby_changed,
      xpChanged: row.xp_changed,
      walletChanged: row.wallet_changed
    }));

    const rewards = rewardsRes.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      costRuby: row.cost_ruby,
      quantity: row.quantity,
      remainingQuantity: row.remaining_quantity,
      timestamp: Number(row.timestamp)
    }));

    const rewardRedemptions = redemptionsRes.rows.map((row: any) => ({
      id: row.id,
      rewardId: row.reward_id,
      rewardTitle: row.reward_title,
      costRuby: row.cost_ruby,
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
        ruby: playerRes.rows[0].ruby,
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

// GET /api/admin/lessons
router.get('/admin/lessons', authMiddleware, async (req: any, res) => {
  const accountId = req.profile.id;
  const gradeTier = Number(req.query.gradeTier);
  if (![6, 7, 8, 9, 10, 11, 12].includes(gradeTier)) return res.status(400).json({ error: 'gradeTier is required.' });
  try {
    const check = await pool.query(
      "SELECT id FROM ge10_users WHERE id = $1 AND is_active = TRUE AND role IN ('parent', 'secondary_parent', 'truong_vien', 'pho_vien')",
      [accountId]
    );
    if (check.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Bạn không có quyền truy cập.' });
    }
    const lessonsRes = await pool.query('SELECT * FROM ge10_lessons WHERE grade_tier = $1 ORDER BY created_at DESC', [gradeTier]);
    res.json(lessonsRes.rows);
  } catch (error: any) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Không thể tải danh sách bài giảng.' });
  }
});

// POST /api/admin/lessons
router.post('/admin/lessons', authMiddleware, async (req: any, res) => {
  const accountId = req.profile.id;
  const { subject, gradeTier, category, topic, title, theory, is_standard } = req.body;

  if (!subject || ![6, 7, 8, 9, 10, 11, 12].includes(Number(gradeTier)) || !category || !topic || !title || theory === undefined) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const check = await pool.query(
      "SELECT id, role FROM ge10_users WHERE id = $1 AND is_active = TRUE AND role IN ('parent', 'secondary_parent', 'truong_vien', 'pho_vien') LIMIT 1",
      [accountId]
    );
    if (check.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Bạn không có quyền thêm bài giảng.' });
    }
    const actorProfileId = check.rows[0].id;

    const lessonId = `les-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    await pool.query(
      `INSERT INTO ge10_lessons (id, subject, grade_tier, category, topic, title, theory, is_standard)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [lessonId, subject, gradeTier, category, topic, title, theory, is_standard || false]
    );

    await logAuditEvent(actorProfileId, 'create_lesson', lessonId, { subject, category, title });
    res.json({ success: true, lesson: { id: lessonId, subject, category, topic, title, theory, is_standard: is_standard || false } });
  } catch (error: any) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Không thể tạo bài giảng.', details: error.message });
  }
});

// PUT /api/admin/lessons/:lessonId
router.put('/admin/lessons/:lessonId', authMiddleware, async (req: any, res) => {
  const accountId = req.profile.id;
  const { lessonId } = req.params;
  const { subject, gradeTier, category, topic, title, theory, is_standard } = req.body;

  if (!subject || ![6, 7, 8, 9, 10, 11, 12].includes(Number(gradeTier)) || !category || !topic || !title || theory === undefined) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const check = await pool.query(
      "SELECT id, role FROM ge10_users WHERE id = $1 AND is_active = TRUE AND role IN ('parent', 'secondary_parent', 'truong_vien', 'pho_vien') LIMIT 1",
      [accountId]
    );
    if (check.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Bạn không có quyền sửa bài giảng.' });
    }
    const actorProfileId = check.rows[0].id;

    const updateRes = await pool.query(
      `UPDATE ge10_lessons 
       SET subject = $1, grade_tier = $2, category = $3, topic = $4, title = $5, theory = $6, is_standard = $7
       WHERE id = $8`,
      [subject, gradeTier, category, topic, title, theory, is_standard !== undefined ? is_standard : false, lessonId]
    );

    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: 'Bài giảng không tồn tại.' });
    }

    await logAuditEvent(actorProfileId, 'update_lesson', lessonId, { subject, category, title });
    res.json({ success: true, message: 'Đã cập nhật bài giảng thành công!' });
  } catch (error: any) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Không thể cập nhật bài giảng.', details: error.message });
  }
});

// DELETE /api/admin/lessons/:lessonId
router.delete('/admin/lessons/:lessonId', authMiddleware, async (req: any, res) => {
  const accountId = req.profile.id;
  const { lessonId } = req.params;

  try {
    const check = await pool.query(
      "SELECT id, role FROM ge10_users WHERE id = $1 AND is_active = TRUE AND role IN ('parent', 'secondary_parent', 'truong_vien', 'pho_vien') LIMIT 1",
      [accountId]
    );
    if (check.rowCount === 0) {
      return res.status(403).json({ error: 'Forbidden: Bạn không có quyền xóa bài giảng.' });
    }
    const actorProfileId = check.rows[0].id;

    const deleteRes = await pool.query('DELETE FROM ge10_lessons WHERE id = $1', [lessonId]);
    if (deleteRes.rowCount === 0) {
      return res.status(404).json({ error: 'Bài giảng không tồn tại.' });
    }

    await logAuditEvent(actorProfileId, 'delete_lesson', lessonId, {});
    res.json({ success: true, message: 'Đã xóa bài giảng thành công!' });
  } catch (error: any) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Không thể xóa bài giảng.', details: error.message });
  }
});

export default router;
