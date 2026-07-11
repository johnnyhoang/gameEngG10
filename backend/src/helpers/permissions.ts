import { pool } from '../db.js';

export const checkStudentManagementPermission = async (actorId: string, studentUserId: string, action: 'approve_reward' | 'refill_energy' | 'set_energy_config' | 'view_profile') => {
  const actorCheck = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [actorId]);
  if (actorCheck.rowCount === 0) return false;
  const role = actorCheck.rows[0].role;

  if (role === 'truong_vien' || role === 'pho_vien') {
    return true; // Admins have global access
  }

  if (role === 'parent') {
    // Check if they are the primary parent of this student
    const linkCheck = await pool.query(
      "SELECT id FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'primary' AND status = 'active'",
      [actorId, studentUserId]
    );
    return linkCheck.rowCount !== null && linkCheck.rowCount > 0;
  }

  if (role === 'secondary_parent') {
    if (action === 'refill_energy' || action === 'set_energy_config') {
      return false; // Secondary parents cannot manage energy
    }

    if (action === 'approve_reward') {
      // Check if they are linked to the student and have approve reward permission
      const linkCheck = await pool.query(
        "SELECT secondary_permissions FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'secondary' AND status = 'active'",
        [actorId, studentUserId]
      );
      if (linkCheck.rowCount !== null && linkCheck.rowCount > 0) {
        const perms = linkCheck.rows[0].secondary_permissions || {};
        return perms.can_approve_rewards === true;
      }
    }

    if (action === 'view_profile') {
      // Secondary parents can always view profile if linked
      const linkCheck = await pool.query(
        "SELECT id FROM ge10_family_links WHERE parent_id = $1 AND student_id = $2 AND link_type = 'secondary' AND status = 'active'",
        [actorId, studentUserId]
      );
      return linkCheck.rowCount !== null && linkCheck.rowCount > 0;
    }
  }

  return false;
};

export const logAuditEvent = async (actorId: string, action: string, targetId: string | null, payload: any = {}) => {
  try {
    const actorRes = await pool.query('SELECT name, role FROM ge10_users WHERE id = $1', [actorId]);
    if (actorRes.rowCount === 0) return;
    const { name, role } = actorRes.rows[0];

    let targetName = null;
    if (targetId) {
      const targetRes = await pool.query('SELECT name FROM ge10_users WHERE id = $1', [targetId]);
      if (targetRes.rowCount !== null && targetRes.rowCount > 0) {
        targetName = targetRes.rows[0].name;
      }
    }

    const logId = `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await pool.query(
      `INSERT INTO ge10_audit_logs (id, actor_id, actor_name, actor_role, action, target_id, target_name, payload)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [logId, actorId, name, role, action, targetId, targetName, JSON.stringify(payload)]
    );
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
};
