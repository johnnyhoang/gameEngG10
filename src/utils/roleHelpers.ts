export const isAdmin = (role?: string) => role === 'truong_vien' || role === 'pho_vien';
export const isSuperAdmin = (role?: string) => role === 'truong_vien';
export const isTutorRole = (role?: string) => role === 'tutor' || role === 'secondary_tutor';

// Nguồn DUY NHẤT cho tên hiển thị vai trò — mọi nơi trong UI phải đọc từ đây,
// không tự viết lại chuỗi role === 'x' ? 'Y' : 'Z' rải rác (xem SUB_SPEC_TERMINOLOGY.md).
export const ROLE_LABELS: Record<string, { name: string; icon: string }> = {
  truong_vien: { name: 'Viện Trưởng', icon: '👑' },
  pho_vien: { name: 'Viện Phó', icon: '🛡️' },
  tutor: { name: 'Chủ Nhiệm', icon: '📋' },
  secondary_tutor: { name: 'Trợ Giảng', icon: '📋' },
  student: { name: 'Học Sinh', icon: '🌱' },
};

export const getRoleLabel = (role?: string): { name: string; icon: string } =>
  ROLE_LABELS[role || ''] || { name: 'Không rõ', icon: '❓' };

export const canPromoteTo = (actorRole: string, targetRole: string): boolean => {
  if (actorRole === 'truong_vien') return true;
  if (actorRole === 'pho_vien') {
    return targetRole === 'student' || targetRole === 'tutor';
  }
  return false;
};
