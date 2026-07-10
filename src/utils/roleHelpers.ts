export const isAdmin = (role?: string) => role === 'truong_vien' || role === 'pho_vien';
export const isSuperAdmin = (role?: string) => role === 'truong_vien';
export const isParentRole = (role?: string) => role === 'parent' || role === 'secondary_parent';
export const canManageContent = (role?: string) => isAdmin(role);
export const canManageUsers = (role?: string) => isAdmin(role);

export const canPromoteTo = (actorRole: string, targetRole: string): boolean => {
  if (actorRole === 'truong_vien') return true;
  if (actorRole === 'pho_vien') {
    return targetRole === 'student' || targetRole === 'parent';
  }
  return false;
};
