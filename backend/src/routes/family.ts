import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { logAuditEvent, checkStudentManagementPermission } from '../helpers/permissions.js';

const router = express.Router();

// GET /api/users/search
router.get('/users/search', authMiddleware, async (req: any, res) => {
  const { q, role } = req.query;
  if (!q || typeof q !== 'string' || !q.trim()) return res.json([]);
  try {
    const searchTerm = `%${q.trim()}%`;
    let queryText = `
      SELECT id, name, email, avatar_url, role 
      FROM ge10_users 
      WHERE is_active = TRUE AND (LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1))
    `;
    const params: any[] = [searchTerm];
    if (role) {
      if (role === 'parent' || role === 'secondary_parent') {
        queryText += " AND role IN ('parent', 'secondary_parent')";
      } else {
        queryText += ' AND role = $2';
        params.push(role);

        if (role === 'student') {
          queryText += `
            AND NOT EXISTS (
              SELECT 1 FROM ge10_family_links 
              WHERE student_id = ge10_users.id 
                AND status = 'active' 
                AND link_type = 'primary'
            )
          `;
        }
      }
    }
    queryText += ' LIMIT 15';
    
    const result = await pool.query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// GET /api/family/:profileId
// Fetch the family status, members, and pending invitations for a specific profile
router.get('/family/:profileId', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const profileId = req.params.profileId;
  
  try {
    // 1. Verify ownership
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const myRole = check.rows[0].role;

    // 2. Fetch data based on role
    if (myRole === 'student') {
      const linkRes = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as parent_id, u.name as parent_name, u.email as parent_email, u.avatar_url as parent_avatar 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.parent_id = u.id 
        WHERE l.student_id = $1
      `, [profileId]);
      
      return res.json({ role: 'student', links: linkRes.rows });
    } else if (myRole === 'parent') {
      const studentLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as student_id, u.name as student_name, u.email as student_email, u.avatar_url as student_avatar 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1 AND l.link_type = 'primary'
      `, [profileId]);

      const classSecondaryLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, u.id as parent_id, u.name as parent_name, u.email as parent_email, u.avatar_url as parent_avatar
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1 AND l.link_type = 'secondary' AND u.role IN ('parent', 'secondary_parent')
      `, [profileId]);
      
      return res.json({ 
        role: 'parent', 
        links: studentLinks.rows,
        classSecondaryLinks: classSecondaryLinks.rows
      });
    } else if (myRole === 'secondary_parent') {
      const studentLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as student_id, u.name as student_name, u.email as student_email, u.avatar_url as student_avatar 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1 AND l.link_type = 'secondary'
      `, [profileId]);

      const classSecondaryLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, u.id as parent_id, u.name as parent_name, u.email as parent_email, u.avatar_url as parent_avatar
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.parent_id = u.id 
        WHERE l.student_id = $1 AND l.link_type = 'secondary'
      `, [profileId]);

      return res.json({
        role: 'secondary_parent',
        links: studentLinks.rows,
        classSecondaryLinks: classSecondaryLinks.rows
      });
    } else {
      return res.json({ role: myRole, links: [] });
    }
  } catch (error) {
    console.error('Error fetching family:', error);
    res.status(500).json({ error: 'Failed to fetch family' });
  }
});

// POST /api/family/invite
router.post('/family/invite', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, targetEmail, connectAsSecondary } = req.body;

  if (!senderProfileId || !targetEmail) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Verify sender profile and active account
    const senderRes = await pool.query(
      'SELECT id, role, name, email, avatar_url FROM ge10_users WHERE id = $1 AND account_id = $2 AND is_active = TRUE',
      [senderProfileId, accountId]
    );
    if (senderRes.rowCount === 0) {
      return res.status(403).json({ error: 'Unauthorized sender.' });
    }
    const myRole = senderRes.rows[0].role;

    // 2. Find target user by email (case-insensitive)
    const targetCheck = await pool.query(
      'SELECT id, account_id, name, email, avatar_url, role FROM ge10_users WHERE LOWER(email) = LOWER($1) AND is_active = TRUE ORDER BY created_at ASC',
      [targetEmail.trim()]
    );
    if (targetCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản trong hệ thống với email này. Vui lòng yêu cầu đối phương đăng ký trước.' });
    }

    const targetAccountId = targetCheck.rows[0].account_id;
    const targetName = targetCheck.rows[0].name;
    const targetEmailVal = targetCheck.rows[0].email;
    const targetAvatar = targetCheck.rows[0].avatar_url;

    let parentId, studentId, initialStatus, linkType;

    if (myRole === 'student') {
      // --- Case 1: Student invites Teacher/Parent ---
      let parentProfile = targetCheck.rows.find((r: any) => r.role === 'parent');
      if (!parentProfile) {
        // Auto-create parent profile
        const newParentId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
        await pool.query(
          `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
           VALUES ($1, $2, $3, $4, $5, 'parent', TRUE)`,
          [newParentId, targetAccountId, targetName, targetEmailVal, targetAvatar]
        );
        parentId = newParentId;
      } else {
        parentId = parentProfile.id;
      }

      // Check if student already has a primary parent
      const existCheck = await pool.query(
        "SELECT id FROM ge10_family_links WHERE student_id = $1 AND link_type = 'primary' AND status IN ('active', 'pending_student', 'pending_parent')",
        [senderProfileId]
      );
      if (existCheck.rowCount && existCheck.rowCount > 0) {
        return res.status(400).json({ error: 'Bạn đã có Chủ Nhiệm chính hoặc đang có lời mời kết nối chờ duyệt.' });
      }

      studentId = senderProfileId;
      initialStatus = 'pending_parent';
      linkType = 'primary';

    } else if (myRole === 'parent' || myRole === 'secondary_parent') {
      // --- Case 2: Teacher/Parent invites Student ---
      let studentProfile = targetCheck.rows.find((r: any) => r.role === 'student');
      if (!studentProfile) {
        // Auto-create student profile
        const newStudentId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
        await pool.query(
          `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
           VALUES ($1, $2, $3, $4, $5, 'student', TRUE)`,
          [newStudentId, targetAccountId, targetName, targetEmailVal, targetAvatar]
        );
        await pool.query(`INSERT INTO ge10_player_profiles (user_id) VALUES ($1)`, [newStudentId]);
        await pool.query(`INSERT INTO ge10_pet_states (user_id) VALUES ($1)`, [newStudentId]);
        studentId = newStudentId;
      } else {
        studentId = studentProfile.id;
      }

      // Check if student already has a primary parent
      const existCheck = await pool.query(
        "SELECT l.id, u.name as parent_name FROM ge10_family_links l JOIN ge10_users u ON l.parent_id = u.id WHERE l.student_id = $1 AND l.link_type = 'primary' AND l.status IN ('active', 'pending_student', 'pending_parent')",
        [studentId]
      );

      if (existCheck.rowCount && existCheck.rowCount > 0) {
        if (!connectAsSecondary) {
          const primaryParentName = existCheck.rows[0].parent_name || 'Chủ Nhiệm khác';
          return res.status(409).json({
            code: 'STUDENT_HAS_PRIMARY',
            error: `Học sinh này đã có Chủ Nhiệm chính là "${primaryParentName}". Bạn có muốn kết nối làm Phó Chủ Nhiệm không?`,
            primaryParentName
          });
        }
        parentId = senderProfileId;
        initialStatus = 'pending_primary';
        linkType = 'secondary';
      } else {
        parentId = senderProfileId;
        initialStatus = 'pending_student';
        linkType = 'primary';
      }
    } else {
      return res.status(403).json({ error: 'Forbidden: Vai trò này không được phép gửi lời mời.' });
    }

    // Check if link already exists
    const linkExist = await pool.query(
      "SELECT id, status FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2",
      [parentId, studentId]
    );
    if (linkExist.rowCount && linkExist.rowCount > 0) {
      return res.status(400).json({ error: 'Yêu cầu kết nối này đã tồn tại hoặc đã hoạt động.' });
    }

    const linkId = crypto.randomUUID();
    await pool.query(
      "INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) VALUES ($1, $2, $3, $4, $5)",
      [linkId, parentId, studentId, initialStatus, linkType]
    );

    await logAuditEvent(senderProfileId, 'invite_family', studentId, { studentId, parentId, linkType });
    res.json({ success: true, message: 'Gửi lời mời kết nối thành công.' });
  } catch (error) {
    console.error('Error inviting family member:', error);
    res.status(500).json({ error: 'Gửi lời mời thất bại.' });
  }
});

// POST /api/family/invite-secondary: Primary parent invites a secondary parent
router.post('/family/invite-secondary', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, targetEmail } = req.body;

  if (!senderProfileId || !targetEmail) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Verify sender is active primary parent
    const senderCheck = await pool.query(
      'SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2 AND is_active = TRUE',
      [senderProfileId, accountId]
    );
    if (senderCheck.rowCount === 0 || senderCheck.rows[0].role !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Only active primary parent can invite secondary parent.' });
    }

    // 2. Find target user by email
    const targetCheck = await pool.query(
      'SELECT id, account_id, name, email, avatar_url, role FROM ge10_users WHERE LOWER(email) = LOWER($1) AND is_active = TRUE ORDER BY created_at ASC',
      [targetEmail.trim()]
    );
    if (targetCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản trong hệ thống với email này. Vui lòng yêu cầu đối phương đăng ký trước.' });
    }

    const targetAccountId = targetCheck.rows[0].account_id;
    const targetName = targetCheck.rows[0].name;
    const targetEmailVal = targetCheck.rows[0].email;
    const targetAvatar = targetCheck.rows[0].avatar_url;

    let secondaryParentId;
    let parentProfile = targetCheck.rows.find((r: any) => r.role === 'parent' || r.role === 'secondary_parent');
    if (!parentProfile) {
      const newParentId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
      await pool.query(
        `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
         VALUES ($1, $2, $3, $4, $5, 'parent', TRUE)`,
        [newParentId, targetAccountId, targetName, targetEmailVal, targetAvatar]
      );
      secondaryParentId = newParentId;
    } else {
      secondaryParentId = parentProfile.id;
    }

    // Check if class-level link already exists (student_id matches the secondaryParentId)
    const linkExist = await pool.query(
      "SELECT id, status FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'secondary'",
      [senderProfileId, secondaryParentId]
    );
    if (linkExist.rowCount && linkExist.rowCount > 0) {
      return res.status(400).json({ error: `Yêu cầu hoặc lời mời đã tồn tại với trạng thái: ${linkExist.rows[0].status}` });
    }

    const linkId = crypto.randomUUID();
    await pool.query(
      "INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) VALUES ($1, $2, $3, 'pending_parent', 'secondary')",
      [linkId, senderProfileId, secondaryParentId]
    );

    await logAuditEvent(senderProfileId, 'invite_secondary_parent', secondaryParentId, {});
    res.json({ success: true, message: 'Secondary parent invite sent.' });
  } catch (error) {
    console.error('Error inviting secondary parent:', error);
    res.status(500).json({ error: 'Failed to send secondary parent invite.' });
  }
});

// POST /api/family/invite-secondary-request: Secondary parent requests to join a class
router.post('/family/invite-secondary-request', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, targetEmail } = req.body; // targetEmail is primary parent's email

  if (!senderProfileId || !targetEmail) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Verify sender is active parent profile
    const senderCheck = await pool.query(
      'SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2 AND is_active = TRUE',
      [senderProfileId, accountId]
    );
    if (senderCheck.rowCount === 0 || (senderCheck.rows[0].role !== 'parent' && senderCheck.rows[0].role !== 'secondary_parent')) {
      return res.status(403).json({ error: 'Forbidden: Only active parents can request.' });
    }

    // 2. Find target primary parent by email
    const targetCheck = await pool.query(
      'SELECT id, account_id, name, email, avatar_url, role FROM ge10_users WHERE LOWER(email) = LOWER($1) AND is_active = TRUE ORDER BY created_at ASC',
      [targetEmail.trim()]
    );
    if (targetCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản Giáo viên chính với email này.' });
    }

    const targetAccountId = targetCheck.rows[0].account_id;
    const targetName = targetCheck.rows[0].name;
    const targetEmailVal = targetCheck.rows[0].email;
    const targetAvatar = targetCheck.rows[0].avatar_url;

    let primaryParentId;
    let parentProfile = targetCheck.rows.find((r: any) => r.role === 'parent');
    if (!parentProfile) {
      const newParentId = 'prof-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
      await pool.query(
        `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
         VALUES ($1, $2, $3, $4, $5, 'parent', TRUE)`,
        [newParentId, targetAccountId, targetName, targetEmailVal, targetAvatar]
      );
      primaryParentId = newParentId;
    } else {
      primaryParentId = parentProfile.id;
    }

    // Check if class-level link already exists
    const linkExist = await pool.query(
      "SELECT id, status FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'secondary'",
      [primaryParentId, senderProfileId]
    );
    if (linkExist.rowCount && linkExist.rowCount > 0) {
      return res.status(400).json({ error: `Yêu cầu hoặc lời mời đã tồn tại với trạng thái: ${linkExist.rows[0].status}` });
    }

    const linkId = crypto.randomUUID();
    await pool.query(
      "INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) VALUES ($1, $2, $3, 'pending_primary', 'secondary')",
      [linkId, primaryParentId, senderProfileId]
    );

    await logAuditEvent(senderProfileId, 'request_secondary_parent', primaryParentId, {});
    res.json({ success: true, message: 'Secondary parent request sent.' });
  } catch (error) {
    console.error('Error requesting secondary parent:', error);
    res.status(500).json({ error: 'Failed to request secondary parent.' });
  }
});

// PATCH /api/family/secondary-permissions
router.patch('/family/secondary-permissions', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, linkId, permissions } = req.body;

  if (!senderProfileId || !linkId || !permissions) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const linkRes = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkRes.rowCount === 0) return res.status(404).json({ error: 'Link not found.' });
    const link = linkRes.rows[0];

    if (link.link_type !== 'secondary') {
      return res.status(400).json({ error: 'Can only update permissions for secondary parents.' });
    }

    // Verify sender is the primary active parent
    const primaryCheck = await pool.query(
      "SELECT id FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'primary' AND status = 'active'",
      [senderProfileId, link.student_id]
    );
    const senderCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1 AND account_id = $2', [senderProfileId, accountId]);

    if (primaryCheck.rowCount === 0 || senderCheck.rowCount === 0 || senderCheck.rows[0].role !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Only the primary parent can configure permissions.' });
    }

    const currentPerms = link.secondary_permissions || {};
    const newPerms = {
      can_approve_rewards: typeof permissions.can_approve_rewards === 'boolean' ? permissions.can_approve_rewards : currentPerms.can_approve_rewards,
      can_create_missions: typeof permissions.can_create_missions === 'boolean' ? permissions.can_create_missions : currentPerms.can_create_missions,
      read_only: typeof permissions.read_only === 'boolean' ? permissions.read_only : currentPerms.read_only
    };

    await pool.query(
      'UPDATE ge10_family_links SET secondary_permissions = $1, updated_at = NOW() WHERE id = $2',
      [JSON.stringify(newPerms), linkId]
    );
    await logAuditEvent(senderProfileId, 'update_secondary_permissions', link.parent_id, { studentId: link.student_id, permissions: newPerms });
    res.json({ success: true, permissions: newPerms });
  } catch (error) {
    console.error('Error updating secondary parent permissions:', error);
    res.status(500).json({ error: 'Failed to update permissions.' });
  }
});

// POST /api/family/respond
router.post('/family/respond', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, linkId, accept } = req.body;

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    const linkCheck = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkCheck.rowCount === 0) return res.status(404).json({ error: 'Link not found' });
    const link = linkCheck.rows[0];

    // Authorize response
    if (link.status === 'pending_primary') {
      // Recipient is primary parent (link.parent_id)
      if (profileId !== link.parent_id) {
        return res.status(403).json({ error: 'Unauthorized: Only the primary parent can approve this request.' });
      }
    } else {
      if (link.status === 'pending_parent') {
        const expectedRecipient = link.link_type === 'primary' ? link.parent_id : link.student_id;
        if (profileId !== expectedRecipient) return res.status(403).json({ error: 'Unauthorized' });
      } else if (link.status === 'pending_student') {
        if (profileId !== link.student_id) return res.status(403).json({ error: 'Unauthorized' });
      }
    }

    if (!accept) {
      await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
      return res.json({ success: true, message: 'Invite rejected' });
    }

    await pool.query("UPDATE ge10_family_links SET status = 'active', updated_at = NOW() WHERE id = $1", [linkId]);
    
    // --- Auto-populating student-level links for secondary parents ---
    if (link.link_type === 'secondary') {
      const studentProfileRes = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [link.student_id]);
      const targetRole = studentProfileRes.rows[0]?.role;

      if (targetRole === 'parent' || targetRole === 'secondary_parent') {
        // Class-level link accepted!
        // 1. Upgrade secondary parent role in ge10_users
        await pool.query("UPDATE ge10_users SET role = 'secondary_parent' WHERE id = $1 AND role = 'parent'", [link.student_id]);

        // 2. Fetch all active students of primary parent (link.parent_id)
        const studentsRes = await pool.query(
          "SELECT student_id FROM ge10_family_links WHERE parent_id = $1 AND link_type = 'primary' AND status = 'active'",
          [link.parent_id]
        );

        // 3. Link secondary parent to all these students
        for (const row of studentsRes.rows) {
          const detailLinkId = crypto.randomUUID();
          await pool.query(
            `INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) 
             VALUES ($1, $2, $3, 'active', 'secondary')
             ON CONFLICT (parent_id, student_id) DO UPDATE SET status = 'active'`,
            [detailLinkId, link.student_id, row.student_id]
          );
        }
      }
    } else if (link.link_type === 'primary') {
      // Primary student joins the class!
      // Fetch all active class-level secondary parents of this primary parent
      const secondaryParentsRes = await pool.query(
        "SELECT student_id FROM ge10_family_links WHERE parent_id = $1 AND link_type = 'secondary' AND status = 'active'",
        [link.parent_id]
      );

      // Create student-level secondary link for this new student for each secondary parent
      for (const row of secondaryParentsRes.rows) {
        const detailLinkId = crypto.randomUUID();
        await pool.query(
          `INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) 
           VALUES ($1, $2, $3, 'active', 'secondary')
           ON CONFLICT (parent_id, student_id) DO UPDATE SET status = 'active'`,
          [detailLinkId, row.student_id, link.student_id]
        );
      }
    }

    await logAuditEvent(profileId, 'respond_family_invite', null, { linkId, accept, linkType: link.link_type });
    res.json({ success: true, message: 'Invite accepted' });
  } catch (error) {
    console.error('Error responding:', error);
    res.status(500).json({ error: 'Failed to respond' });
  }
});

// POST /api/family/leave
router.post('/family/leave', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, linkId } = req.body;

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });

    const linkCheck = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkCheck.rowCount === 0) return res.status(404).json({ error: 'Link not found' });
    const link = linkCheck.rows[0];

    // Primary link delete: delete all primary and secondary links for this student
    if (link.link_type === 'primary') {
      if (link.student_id !== profileId && link.parent_id !== profileId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      await pool.query('DELETE FROM ge10_family_links WHERE student_id = $1', [link.student_id]);
    } else {
      // Check if class-level secondary parent link
      const targetCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [link.student_id]);
      const targetRole = targetCheck.rows[0]?.role;

      if (targetRole === 'parent' || targetRole === 'secondary_parent') {
        if (link.student_id !== profileId && link.parent_id !== profileId) {
          return res.status(403).json({ error: 'Unauthorized' });
        }
        // Class-level co-management link deleted
        await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
        // Delete all student-level links for this secondary parent (link.student_id) under this primary parent (link.parent_id)'s class
        await pool.query(
          `DELETE FROM ge10_family_links 
           WHERE parent_id = $1 AND link_type = 'secondary' 
             AND student_id IN (
               SELECT student_id FROM ge10_family_links WHERE parent_id = $2 AND link_type = 'primary'
             )`,
          [link.student_id, link.parent_id]
        );
      } else {
        if (link.student_id !== profileId && link.parent_id !== profileId) {
          return res.status(403).json({ error: 'Unauthorized' });
        }
        await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
      }
    }

    await logAuditEvent(profileId, 'leave_family', null, { linkId, linkType: link.link_type, studentId: link.student_id, parentId: link.parent_id });
    res.json({ success: true, message: 'Left family' });
  } catch (error) {
    console.error('Error leaving:', error);
    res.status(500).json({ error: 'Failed to leave family' });
  }
});

// GET /api/family/skip-reviews/:studentId: Fetches pending skip reviews for a student
router.get('/family/skip-reviews/:studentId', authMiddleware, async (req: any, res) => {
  const parentId = req.user.sub;
  const { studentId } = req.params;

  try {
    // Verify parent's management permission for this student
    const hasPermission = await checkStudentManagementPermission(parentId, studentId, 'view_profile');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to view this student.' });
    }

    const result = await pool.query(
      "SELECT * FROM ge10_skip_reviews WHERE student_id = $1 AND status = 'pending' ORDER BY created_at DESC",
      [studentId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skip reviews:', error);
    res.status(500).json({ error: 'Failed to fetch skip reviews.' });
  }
});

// POST /api/family/skip-reviews/resolve: Marks a skip review as resolved (closed loop)
router.post('/family/skip-reviews/resolve', authMiddleware, async (req: any, res) => {
  const parentId = req.user.sub;
  const { reviewId } = req.body;

  if (!reviewId) {
    return res.status(400).json({ error: 'Missing reviewId.' });
  }

  try {
    // Fetch review to verify studentId
    const reviewRes = await pool.query('SELECT student_id FROM ge10_skip_reviews WHERE id = $1', [reviewId]);
    if (reviewRes.rowCount === 0) {
      return res.status(404).json({ error: 'Skip review not found.' });
    }
    const studentId = reviewRes.rows[0].student_id;

    // Verify parent's management permission
    const hasPermission = await checkStudentManagementPermission(parentId, studentId, 'approve_reward');
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    await pool.query(
      "UPDATE ge10_skip_reviews SET status = 'resolved' WHERE id = $1",
      [reviewId]
    );
    res.json({ success: true, message: 'Skip review resolved successfully.' });
  } catch (error) {
    console.error('Error resolving skip review:', error);
    res.status(500).json({ error: 'Failed to resolve skip review.' });
  }
});

export default router;
