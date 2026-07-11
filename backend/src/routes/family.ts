import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { logAuditEvent, checkStudentManagementPermission } from '../helpers/permissions.js';

const router = express.Router();

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
      // Find my parents (can have primary parent and secondary parents)
      const linkRes = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as parent_id, u.name as parent_name, u.email as parent_email 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.parent_id = u.id 
        WHERE l.student_id = $1
      `, [profileId]);
      
      return res.json({ role: 'student', links: linkRes.rows });
    } else if (myRole === 'parent') {
      // Find my students (primary links)
      const studentLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as student_id, u.name as student_name, u.email as student_email 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1 AND l.link_type = 'primary'
      `, [profileId]);

      // Find secondary parents sharing my students
      const secondaryParents = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as parent_id, u.name as parent_name, u.email as parent_email, l.student_id
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.parent_id = u.id 
        WHERE l.student_id IN (
          SELECT student_id FROM ge10_family_links WHERE parent_id = $1 AND link_type = 'primary'
        ) AND l.link_type = 'secondary'
      `, [profileId]);
      
      return res.json({ 
        role: 'parent', 
        links: studentLinks.rows,
        secondaryParents: secondaryParents.rows
      });
    } else if (myRole === 'secondary_parent') {
      // Find my students (secondary links)
      const studentLinks = await pool.query(`
        SELECT l.id, l.status, l.link_type, l.secondary_permissions, u.id as student_id, u.name as student_name, u.email as student_email 
        FROM ge10_family_links l 
        JOIN ge10_users u ON l.student_id = u.id 
        WHERE l.parent_id = $1 AND l.link_type = 'secondary'
      `, [profileId]);

      return res.json({
        role: 'secondary_parent',
        links: studentLinks.rows
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
  const { senderProfileId, targetId } = req.body; // targetId can be student ID or parent ID

  try {
    const check = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 AND account_id = $2', [senderProfileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const myRole = check.rows[0].role;

    // Check if target exists
    const targetCheck = await pool.query('SELECT id, role FROM ge10_users WHERE id = $1 OR email = $1', [targetId]);
    if (targetCheck.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    const target = targetCheck.rows[0];

    let parentId, studentId, initialStatus;

    if (myRole === 'student') {
      if (target.role === 'student') return res.status(400).json({ error: 'Cannot invite another student' });
      // Check if student already has a parent
      const existCheck = await pool.query("SELECT id FROM ge10_family_links WHERE student_id = $1 AND link_type = 'primary'", [senderProfileId]);
      if (existCheck.rowCount && existCheck.rowCount > 0) return res.status(400).json({ error: 'You already have a primary parent or pending primary invite' });
      
      studentId = senderProfileId;
      parentId = target.id;
      initialStatus = 'pending_parent'; // needs parent approval
    } else {
      if (target.role !== 'student') return res.status(400).json({ error: 'Can only invite a student' });
      const existCheck = await pool.query("SELECT id FROM ge10_family_links WHERE student_id = $1 AND link_type = 'primary'", [target.id]);
      if (existCheck.rowCount && existCheck.rowCount > 0) return res.status(400).json({ error: 'Student already has a primary parent or pending primary invite' });
      
      parentId = senderProfileId;
      studentId = target.id;
      initialStatus = 'pending_student'; // needs student approval
    }

    // Đây là link CHA-CON CHÍNH (primary) — mời Chủ nhiệm Phụ nằm ở endpoint riêng
    // /api/family/invite-secondary. Trước đây INSERT bỏ qua parentId/studentId/initialStatus
    // vừa tính ở trên và hard-code 'pending_parent'/'secondary'/target.id — khiến link tạo ra
    // sai chiều (parent_id = student_id = id học sinh) và không khớp status mà 2 phía UI đang lọc.
    const linkId = crypto.randomUUID();
    await pool.query(
      "INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type) VALUES ($1, $2, $3, $4, 'primary')",
      [linkId, parentId, studentId, initialStatus]
    );
    await logAuditEvent(senderProfileId, 'invite_family', target.id, { studentId, parentId });
    res.json({ success: true, message: 'Family invite sent.' });
  } catch (error) {
    console.error('Error inviting family member:', error);
    res.status(500).json({ error: 'Failed to send invite.' });
  }
});

// POST /api/family/invite-secondary
router.post('/family/invite-secondary', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, targetEmail, studentId } = req.body;

  if (!senderProfileId || !targetEmail || !studentId) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Verify sender is active primary parent of student
    const checkSender = await pool.query(
      "SELECT id FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'primary' AND status = 'active'",
      [senderProfileId, studentId]
    );
    const senderCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1 AND account_id = $2', [senderProfileId, accountId]);
    if (checkSender.rowCount === 0 || senderCheck.rowCount === 0 || senderCheck.rows[0].role !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Only active primary parent can invite secondary parent.' });
    }

    // 2. Check if secondary parent user exists by email
    const targetCheck = await pool.query('SELECT id, role FROM ge10_users WHERE email = $1', [targetEmail]);
    if (targetCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản Chủ nhiệm Phụ với email này. Hãy yêu cầu Chủ nhiệm Phụ đăng ký trước.' });
    }
    const targetParent = targetCheck.rows[0];
    if (targetParent.role !== 'parent' && targetParent.role !== 'secondary_parent') {
      return res.status(400).json({ error: 'Tài khoản được mời phải có vai trò Chủ nhiệm.' });
    }

    // 3. Check if link already exists
    const linkExist = await pool.query(
      "SELECT id, status FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'secondary'",
      [targetParent.id, studentId]
    );
    if (linkExist.rowCount && linkExist.rowCount > 0) {
      return res.status(400).json({ error: `Lời mời chủ nhiệm phụ đã tồn tại với trạng thái: ${linkExist.rows[0].status}` });
    }

    // 4. Create secondary parent link
    const linkId = crypto.randomUUID();
    await pool.query(
      "INSERT INTO ge10_family_links (id, parent_id, student_id, status, link_type, secondary_permissions) VALUES ($1, $2, $3, 'pending_parent', 'secondary', $4)",
      [
        linkId,
        targetParent.id,
        studentId,
        JSON.stringify({ can_approve_rewards: false, can_create_missions: false, read_only: true })
      ]
    );

    await logAuditEvent(senderProfileId, 'invite_secondary_parent', targetParent.id, { studentId });
    res.json({ success: true, message: 'Secondary parent invite sent.' });
  } catch (error) {
    console.error('Error inviting secondary parent:', error);
    res.status(500).json({ error: 'Failed to send secondary parent invite.' });
  }
});

// PATCH /api/family/secondary-permissions
// Primary parent updates permissions for a secondary parent link
router.patch('/family/secondary-permissions', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { senderProfileId, linkId, permissions } = req.body;

  if (!senderProfileId || !linkId || !permissions) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // 1. Fetch link details
    const linkRes = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkRes.rowCount === 0) return res.status(404).json({ error: 'Link not found.' });
    const link = linkRes.rows[0];

    if (link.link_type !== 'secondary') {
      return res.status(400).json({ error: 'Can only update permissions for secondary parents.' });
    }

    // 2. Verify sender is the primary active parent of that student
    const primaryCheck = await pool.query(
      "SELECT id FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'primary' AND status = 'active'",
      [senderProfileId, link.student_id]
    );
    const senderCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1 AND account_id = $2', [senderProfileId, accountId]);

    if (primaryCheck.rowCount === 0 || senderCheck.rowCount === 0 || senderCheck.rows[0].role !== 'parent') {
      return res.status(403).json({ error: 'Forbidden: Only the primary parent can configure permissions.' });
    }

    // 3. Update permissions
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
    const myRole = check.rows[0].role;

    const linkCheck = await pool.query('SELECT * FROM ge10_family_links WHERE id = $1', [linkId]);
    if (linkCheck.rowCount === 0) return res.status(404).json({ error: 'Link not found' });
    const link = linkCheck.rows[0];

    // Authorize response
    if (myRole === 'student' && link.student_id !== profileId) return res.status(403).json({ error: 'Unauthorized' });
    if (myRole !== 'student' && link.parent_id !== profileId) return res.status(403).json({ error: 'Unauthorized' });

    if (!accept) {
      await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
      return res.json({ success: true, message: 'Invite rejected' });
    }

    await pool.query("UPDATE ge10_family_links SET status = 'active', updated_at = NOW() WHERE id = $1", [linkId]);
    
    // If it's a secondary parent link, update their role to secondary_parent
    if (link.link_type === 'secondary') {
      await pool.query("UPDATE ge10_users SET role = 'secondary_parent' WHERE id = $1 AND role = 'parent'", [link.parent_id]);
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

    if (link.student_id !== profileId && link.parent_id !== profileId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await pool.query('DELETE FROM ge10_family_links WHERE id = $1', [linkId]);
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
