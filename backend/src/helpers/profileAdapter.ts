import { pool } from '../db.js';

export async function adaptLegacyProfiles() {
  console.log('=== Khởi chạy thích ứng dữ liệu hồ sơ cũ (Legacy Profile Adaptation) ===');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Đảm bảo tất cả các row ge10_users cũ đều có account_id
    await client.query(`
      UPDATE ge10_users 
      SET account_id = id 
      WHERE account_id IS NULL OR account_id = ''
    `);

    // 2. Lấy tất cả các account_id độc lập
    const accountsRes = await client.query('SELECT DISTINCT account_id FROM ge10_users');
    const accountIds = accountsRes.rows.map(r => r.account_id);

    for (const accountId of accountIds) {
      // Lấy tất cả profiles của account_id này
      const profilesRes = await client.query(
        'SELECT id, name, email, avatar_url, role, is_active FROM ge10_users WHERE account_id = $1',
        [accountId]
      );
      const profiles = profilesRes.rows;

      // Chỉ xử lý nếu tài khoản này chỉ có duy nhất 1 profile (tình trạng cũ khi chưa dùng 4-profile)
      if (profiles.length === 1) {
        const legacyProfile = profiles[0];
        const pId = legacyProfile.id;
        const pRole = legacyProfile.role;

        const cleanName = legacyProfile.name.replace(/\s*\((?:Hiệu Trưởng|Hiệu Phó|Viện Trưởng|Phó Viện Trưởng|Chủ Nhiệm|Chủ Nhiệm Chính|Học Sinh|Sĩ Tử)\)/g, '');

        if (pRole === 'student') {
          // Bắt đầu kiểm tra xem profile "Học Sinh" này có chứa liên kết lớp (Chủ nhiệm) cũ hay không
          const familyCheck = await client.query(
            'SELECT COUNT(*)::int as count FROM ge10_family_links WHERE parent_id = $1',
            [pId]
          );

          if (familyCheck.rows[0].count > 0) {
            console.log(`[Adaptation] Phát hiện tài khoản ${legacyProfile.email} có vai trò Học Sinh nhưng chứa dữ liệu Chủ Nhiệm (Family Links). Tiến hành phân tách...`);
            
            // Tạo thêm profile Chủ Nhiệm Chính
            const newParentId = `prof-parent-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            const finalParentName = `${cleanName} (Chủ Nhiệm Chính)`;

            await client.query(
              `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
               VALUES ($1, $2, $3, $4, $5, 'parent', TRUE)`,
              [newParentId, accountId, finalParentName, legacyProfile.email, legacyProfile.avatar_url]
            );

            // Chuyển toàn bộ dữ liệu quản lý lớp/phần thưởng sang profile Chủ Nhiệm Chính mới
            await client.query('UPDATE ge10_family_links SET parent_id = $1 WHERE parent_id = $2', [newParentId, pId]);
            await client.query('UPDATE ge10_parent_rewards SET user_id = $1 WHERE user_id = $2', [newParentId, pId]);
            
            // Chuẩn hóa lại tên của profile Học Sinh cũ
            await client.query('UPDATE ge10_users SET name = $1 WHERE id = $2', [`${cleanName} (Học Sinh)`, pId]);

            console.log(`[Adaptation] Đã tạo profile Chủ Nhiệm Chính mới (${newParentId}) và chuyển liên kết lớp từ profile Học Sinh (${pId}) sang.`);
          }
        } 
        else if (pRole === 'parent') {
          // Bắt đầu kiểm tra xem profile "Chủ Nhiệm" này có chứa lịch sử tiến trình học sinh (Level/XP) hay không
          const playerCheck = await client.query(
            'SELECT level, xp FROM ge10_player_profiles WHERE user_id = $1',
            [pId]
          );

          // Nếu có dòng stats game và đã cày (level > 1 hoặc xp > 0)
          if (playerCheck.rows.length > 0 && (playerCheck.rows[0].level > 1 || playerCheck.rows[0].xp > 0)) {
            console.log(`[Adaptation] Phát hiện tài khoản ${legacyProfile.email} có vai trò Chủ Nhiệm nhưng chứa dữ liệu tiến trình Học Sinh (level=${playerCheck.rows[0].level}, xp=${playerCheck.rows[0].xp}). Tiến hành phân tách...`);

            // Tạo thêm profile Học Sinh
            const newStudentId = `prof-student-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            const finalStudentName = `${cleanName} (Học Sinh)`;

            await client.query(
              `INSERT INTO ge10_users (id, account_id, name, email, avatar_url, role, is_active)
               VALUES ($1, $2, $3, $4, $5, 'student', TRUE)`,
              [newStudentId, accountId, finalStudentName, legacyProfile.email, legacyProfile.avatar_url]
            );

            // Chuyển toàn bộ dữ liệu game (tiến trình học tập, thú cưng...) sang profile Học Sinh mới
            await client.query('UPDATE ge10_player_profiles SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_pet_states SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_category_stats SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_history_logs SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_user_challenges SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_daily_missions SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_user_lessons_progress SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_exploration_progress SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);
            await client.query('UPDATE ge10_reward_redemptions SET user_id = $1 WHERE user_id = $2', [newStudentId, pId]);

            // Khởi tạo hàng trống cho profile Chủ Nhiệm cũ để tránh lỗi tham chiếu rỗng
            await client.query('INSERT INTO ge10_player_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [pId]);
            await client.query('INSERT INTO ge10_pet_states (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [pId]);

            // Chuẩn hóa lại tên của profile Chủ Nhiệm cũ
            await client.query('UPDATE ge10_users SET name = $1 WHERE id = $2', [`${cleanName} (Chủ Nhiệm Chính)`, pId]);

            console.log(`[Adaptation] Đã tạo profile Học Sinh mới (${newStudentId}) và chuyển toàn bộ dữ liệu game từ profile Chủ Nhiệm (${pId}) sang.`);
          }
        }
      }
    }

    await client.query('COMMIT');
    console.log('=== Hoàn tất thích ứng dữ liệu hồ sơ cũ thành công! ===');
  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('[Adaptation] Lỗi khi chạy thích ứng dữ liệu hồ sơ cũ:', error.message);
  } finally {
    client.release();
  }
}
