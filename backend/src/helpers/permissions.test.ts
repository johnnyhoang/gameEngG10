import { describe, it, expect, vi, beforeEach } from 'vitest';

// pool.query bị mock để checkStudentManagementPermission chạy được mà không cần Postgres thật —
// test này khoá lại đúng lỗ hổng đã audit: secondary_tutor phải KHÔNG được approve reward/tạo
// mission/refill energy trừ khi link của họ có cờ cho phép tường minh (SUB_SPEC_AUTH_PROFILE.md).
vi.mock('../db.js', () => ({
  pool: { query: vi.fn() }
}));

import { pool } from '../db.js';
import { hasPermission, checkStudentManagementPermission } from './permissions.js';

const mockedQuery = pool.query as unknown as ReturnType<typeof vi.fn>;

describe('hasPermission', () => {
  it('luôn cho phép truong_vien/pho_vien bất kể action', () => {
    expect(hasPermission('truong_vien', 'APPROVE_REWARD')).toBe(true);
    expect(hasPermission('pho_vien', 'CREATE_MISSION')).toBe(true);
  });

  it('không có role thì luôn từ chối', () => {
    expect(hasPermission(undefined, 'VIEW_STUDENT_PROFILE')).toBe(false);
  });

  it('tutor (primary) luôn được approve reward / tạo mission / refill energy', () => {
    expect(hasPermission('tutor', 'APPROVE_REWARD')).toBe(true);
    expect(hasPermission('tutor', 'CREATE_MISSION')).toBe(true);
    expect(hasPermission('tutor', 'REFILL_ENERGY')).toBe(true);
  });

  describe('secondary_tutor — chỉ được làm đúng những gì link cho phép tường minh', () => {
    it('mặc định restrictive của schema (read_only: true, cả hai cờ false) chặn mọi mutation', () => {
      const perms = { can_approve_rewards: false, can_create_missions: false, read_only: true };
      expect(hasPermission('secondary_tutor', 'APPROVE_REWARD', perms)).toBe(false);
      expect(hasPermission('secondary_tutor', 'CREATE_MISSION', perms)).toBe(false);
      expect(hasPermission('secondary_tutor', 'REFILL_ENERGY', perms)).toBe(false);
      expect(hasPermission('secondary_tutor', 'SET_ENERGY_CONFIG', perms)).toBe(false);
    });

    it('không truyền secondaryPermissions (thiếu/không rõ ràng) phải bị coi là hạn chế, không phải cho phép', () => {
      expect(hasPermission('secondary_tutor', 'APPROVE_REWARD')).toBe(false);
      expect(hasPermission('secondary_tutor', 'CREATE_MISSION')).toBe(false);
      expect(hasPermission('secondary_tutor', 'REFILL_ENERGY')).toBe(false);
      expect(hasPermission('secondary_tutor', 'SET_ENERGY_CONFIG', {})).toBe(false);
    });

    it('read_only=true chặn approve reward dù can_approve_rewards=true', () => {
      const perms = { can_approve_rewards: true, read_only: true };
      expect(hasPermission('secondary_tutor', 'APPROVE_REWARD', perms)).toBe(false);
    });

    it('read_only=false + can_approve_rewards=true thì được approve reward, nhưng vẫn không được tạo mission', () => {
      const perms = { can_approve_rewards: true, can_create_missions: false, read_only: false };
      expect(hasPermission('secondary_tutor', 'APPROVE_REWARD', perms)).toBe(true);
      expect(hasPermission('secondary_tutor', 'CREATE_MISSION', perms)).toBe(false);
    });

    it('read_only=false cho phép refill energy / set energy config', () => {
      const perms = { read_only: false };
      expect(hasPermission('secondary_tutor', 'REFILL_ENERGY', perms)).toBe(true);
      expect(hasPermission('secondary_tutor', 'SET_ENERGY_CONFIG', perms)).toBe(true);
    });

    it('xem hồ sơ học sinh (VIEW_STUDENT_PROFILE) luôn được phép — không phải mutation', () => {
      expect(hasPermission('secondary_tutor', 'VIEW_STUDENT_PROFILE')).toBe(true);
    });
  });
});

describe('checkStudentManagementPermission — cô lập theo active profile + quan hệ link', () => {
  beforeEach(() => {
    mockedQuery.mockReset();
  });

  it('secondary_tutor có link nhưng read_only=true (mặc định) không được approve_reward', async () => {
    mockedQuery
      .mockResolvedValueOnce({ rows: [{ id: 'secTutor-1', role: 'secondary_tutor' }] }) // actor lookup
      .mockResolvedValueOnce({
        rows: [{ secondary_permissions: { can_approve_rewards: false, can_create_missions: false, read_only: true } }]
      }); // link lookup

    const allowed = await checkStudentManagementPermission('secTutor-1', 'student-1', 'approve_reward');
    expect(allowed).toBe(false);
  });

  it('secondary_tutor có link với can_approve_rewards=true + read_only=false thì được approve_reward', async () => {
    mockedQuery
      .mockResolvedValueOnce({ rows: [{ id: 'secTutor-1', role: 'secondary_tutor' }] })
      .mockResolvedValueOnce({
        rows: [{ secondary_permissions: { can_approve_rewards: true, read_only: false } }]
      });

    const allowed = await checkStudentManagementPermission('secTutor-1', 'student-1', 'approve_reward');
    expect(allowed).toBe(true);
  });

  it('profile không active (inactive/không tồn tại) bị từ chối hoàn toàn, không xét tiếp link', async () => {
    mockedQuery.mockResolvedValueOnce({ rows: [] }); // actor lookup rỗng vì is_active = FALSE

    const allowed = await checkStudentManagementPermission('someone-inactive', 'student-1', 'approve_reward');
    expect(allowed).toBe(false);
    expect(mockedQuery).toHaveBeenCalledTimes(1); // không query link nếu actor đã bị chặn ở bước đầu
  });

  it('tutor không có link primary với đúng học sinh này thì bị từ chối dù cùng role tutor', async () => {
    mockedQuery
      .mockResolvedValueOnce({ rows: [{ id: 'tutor-1', role: 'tutor' }] })
      .mockResolvedValueOnce({ rows: [] }); // không tìm thấy link primary active với student này

    const allowed = await checkStudentManagementPermission('tutor-1', 'student-not-mine', 'approve_reward');
    expect(allowed).toBe(false);
  });
});
