export const isAdmin = (role?: string) => role === 'truong_vien' || role === 'pho_vien';
export const isSuperAdmin = (role?: string) => role === 'truong_vien';
export const isParentRole = (role?: string) => role === 'parent' || role === 'secondary_parent';

export type WuxiaAction =
  | 'VIEW_AUDIT_LOGS'
  | 'PROMOTE_TO_ADMIN'
  | 'PROMOTE_TO_USER'
  | 'MANAGE_CONTENT'
  | 'REFILL_ENERGY'
  | 'SET_ENERGY_CONFIG'
  | 'APPROVE_REWARD'
  | 'CREATE_MISSION'
  | 'VIEW_STUDENT_PROFILE';

export const canPromoteTo = (actorRole: string, targetRole: string): boolean => {
  if (actorRole === 'truong_vien') return true;
  if (actorRole === 'pho_vien') {
    return targetRole === 'student' || targetRole === 'parent';
  }
  return false;
};

/**
 * Kiểm tra quyền hạn của User đối với một action cụ thể (Dùng chung cho UI và API check).
 * @param role Thân phận của người dùng
 * @param action Hành động muốn thực hiện
 * @param secondaryPermissions Quyền phụ (dành cho Secondary Parent)
 * @returns boolean
 */
export const hasPermission = (
  role: string | undefined,
  action: WuxiaAction,
  secondaryPermissions?: {
    can_approve_rewards?: boolean;
    can_create_missions?: boolean;
    read_only?: boolean;
  }
): boolean => {
  if (!role) return false;

  // Hiệu Trưởng có toàn quyền
  if (role === 'truong_vien') return true;

  switch (action) {
    case 'VIEW_AUDIT_LOGS':
    case 'PROMOTE_TO_ADMIN':
      return role === 'truong_vien';

    case 'PROMOTE_TO_USER':
    case 'MANAGE_CONTENT':
      return role === 'truong_vien' || role === 'pho_vien';

    case 'REFILL_ENERGY':
    case 'SET_ENERGY_CONFIG':
      return role === 'truong_vien' || role === 'pho_vien' || role === 'parent';

    case 'APPROVE_REWARD':
      if (role === 'pho_vien' || role === 'parent') return true;
      if (role === 'secondary_parent') {
        return secondaryPermissions?.can_approve_rewards === true;
      }
      return false;

    case 'CREATE_MISSION':
      if (role === 'pho_vien' || role === 'parent') return true;
      if (role === 'secondary_parent') {
        return secondaryPermissions?.can_create_missions === true || secondaryPermissions?.read_only === false;
      }
      return false;

    case 'VIEW_STUDENT_PROFILE':
      return role === 'pho_vien' || role === 'parent' || role === 'secondary_parent';

    default:
      return false;
  }
};
