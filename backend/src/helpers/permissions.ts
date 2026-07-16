import { pool } from '../db.js';

export type PermissionAction =
  | 'VIEW_AUDIT_LOGS'
  | 'PROMOTE_TO_ADMIN'
  | 'PROMOTE_TO_USER'
  | 'MANAGE_CONTENT'
  | 'REFILL_ENERGY'
  | 'SET_ENERGY_CONFIG'
  | 'APPROVE_REWARD'
  | 'CREATE_MISSION'
  | 'VIEW_STUDENT_PROFILE';

export const hasPermission = (
  role: string | undefined,
  action: PermissionAction,
  secondaryPermissions?: {
    can_approve_rewards?: boolean;
    can_create_missions?: boolean;
    read_only?: boolean;
  }
): boolean => {
  if (!role) return false;
  if (role === 'truong_vien' || role === 'pho_vien') return true;

  switch (action) {
    case 'VIEW_AUDIT_LOGS':
    case 'PROMOTE_TO_ADMIN':
      return role === 'truong_vien' || role === 'pho_vien';

    case 'PROMOTE_TO_USER':
    case 'MANAGE_CONTENT':
      return role === 'truong_vien' || role === 'pho_vien';

    case 'REFILL_ENERGY':
    case 'SET_ENERGY_CONFIG':
      return role === 'truong_vien' || role === 'pho_vien' || role === 'tutor' || role === 'secondary_tutor';

    case 'APPROVE_REWARD':
      return role === 'pho_vien' || role === 'tutor' || role === 'secondary_tutor';

    case 'CREATE_MISSION':
      return role === 'pho_vien' || role === 'tutor' || role === 'secondary_tutor';

    case 'VIEW_STUDENT_PROFILE':
      return role === 'pho_vien' || role === 'tutor' || role === 'secondary_tutor';

    default:
      return false;
  }
};

export const checkStudentManagementPermission = async (
  actorProfileId: string,
  studentUserId: string,
  action: 'approve_reward' | 'refill_energy' | 'set_energy_config' | 'view_profile'
) => {
  // Authorization is evaluated only for the active profile, never sibling profiles.
  const actorCheck = await pool.query(
    'SELECT id, role FROM ge10_users WHERE id = $1 AND is_active = TRUE',
    [actorProfileId]
  );
  if (actorCheck.rows.length === 0) return false;

  let permissionAction: PermissionAction;
  if (action === 'approve_reward') permissionAction = 'APPROVE_REWARD';
  else if (action === 'refill_energy') permissionAction = 'REFILL_ENERGY';
  else if (action === 'set_energy_config') permissionAction = 'SET_ENERGY_CONFIG';
  else permissionAction = 'VIEW_STUDENT_PROFILE';

  for (const actorProfile of actorCheck.rows) {
    const role = actorProfile.role;
    const profileId = actorProfile.id;

    if (role === 'truong_vien' || role === 'pho_vien') {
      if (hasPermission(role, permissionAction)) return true;
    }

    if (role === 'tutor') {
      const linkCheck = await pool.query(
        "SELECT id FROM ge10_class_links WHERE tutor_id = $1 AND student_id = $2 AND link_type = 'primary' AND status = 'active'",
        [profileId, studentUserId]
      );
      if (linkCheck.rows.length > 0 && hasPermission(role, permissionAction)) return true;
    }

    if (role === 'secondary_tutor') {
      const linkCheck = await pool.query(
        "SELECT secondary_permissions FROM ge10_class_links WHERE tutor_id = $1 AND student_id = $2 AND link_type = 'secondary' AND status = 'active'",
        [profileId, studentUserId]
      );
      if (linkCheck.rows.length > 0) {
        const perms = linkCheck.rows[0].secondary_permissions || {};
        if (hasPermission(role, permissionAction, perms)) return true;
      }
    }
  }

  return false;
};

export const logAuditEvent = async (actorId: string, action: string, targetId: string | null, payload: any = {}) => {
  try {
    const actorRes = await pool.query('SELECT name, role FROM ge10_users WHERE id = $1', [actorId]);
    if (actorRes.rows.length === 0) return;
    const { name, role } = actorRes.rows[0];

    let targetName = null;
    if (targetId) {
      const targetRes = await pool.query('SELECT name FROM ge10_users WHERE id = $1', [targetId]);
      if (targetRes.rows.length > 0) {
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
