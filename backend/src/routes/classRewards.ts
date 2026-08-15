import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

import { ensureDefaultClassRewards } from '../helpers/questions.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

// Chỉ giáo viên (chủ nhiệm + trợ giảng) chạm vào quà LỚP. Ban Lãnh Đạo Viện (truong_vien/pho_vien)
// quản lý quà TRƯỜNG riêng qua /api/admin/school-rewards + /api/school-rewards — không được
// lẫn vào đây (trước đây 2 role này nằm trong TEACHER_ROLES, cho phép tự tạo "quà lớp" cá
// nhân tách biệt hoàn toàn khỏi kênh quản lý đúng, đã sửa).
const TEACHER_ROLES = ['tutor', 'secondary_tutor'];

async function getUserRole(profileId: string): Promise<string | null> {
  const res = await pool.query('SELECT role FROM ge10_users WHERE id = $1', [profileId]);
  return res.rows[0]?.role || null;
}

// ─────────────────────────────────────────────
// "Quà Khuyến Học Của Lớp" là 1 danh mục DÙNG CHUNG cho cả lớp (ge10_class_rewards.teacher_id
// = ID của Chủ Nhiệm) — không phải 1 danh mục riêng cho mỗi giáo viên. Trợ Giảng thao
// tác lên CHÍNH danh mục đó khi được Chủ Nhiệm bật quyền (secondary_permissions.
// can_approve_rewards — dùng chung 1 cờ cho cả "tạo/sửa/xoá" lẫn "duyệt", đúng như ma trận
// §3.2 SUB_SPEC_FAMILY_ROLE.md chỉ có 1 dòng "Tạo/Duyệt Phần Thưởng" cho Trợ Giảng).
//
// resolveClassContext trả về:
//  - ownerId: teacher_id thực sự sở hữu danh mục quà (chính là actor nếu là Chủ Nhiệm;
//    là Chủ Nhiệm của lớp nếu actor là Trợ Giảng; null nếu Trợ Giảng chưa được
//    liên kết secondary với học sinh nào — chưa thuộc lớp nào).
//  - canManage: có được tạo/sửa/xoá/duyệt quà không (Chủ Nhiệm luôn true; Trợ Giảng
//    phụ thuộc toggle can_approve_rewards do Chủ Nhiệm cấu hình).
// ─────────────────────────────────────────────
async function resolveClassContext(
  profileId: string,
  role: string
): Promise<{ ownerId: string | null; canManage: boolean }> {
  if (role === 'tutor') {
    return { ownerId: profileId, canManage: true };
  }
  if (role === 'secondary_tutor') {
    const res = await pool.query(
      `SELECT pl.tutor_id AS owner_id, sl.secondary_permissions
       FROM ge10_class_links sl
       JOIN ge10_class_links pl
         ON pl.student_id = sl.student_id AND pl.link_type = 'primary' AND pl.status = 'active'
       WHERE sl.tutor_id = $1 AND sl.link_type = 'secondary' AND sl.status = 'active'
       ORDER BY sl.created_at ASC
       LIMIT 1`,
      [profileId]
    );
    if (res.rows.length === 0) return { ownerId: null, canManage: false };
    const perms = res.rows[0].secondary_permissions || {};
    return { ownerId: res.rows[0].owner_id, canManage: perms.can_approve_rewards === true };
  }
  return { ownerId: null, canManage: false };
}

// ─────────────────────────────────────────────
// GET /api/class-rewards
// Teacher (chính/phụ) → quà của LỚP mình thuộc về + mọi yêu cầu đổi quà của lớp đó
// Student trong lớp → quà lớp từ (các) Chủ Nhiệm, và yêu cầu đổi quà của riêng mình
// Student orphan → { rewards: [], redemptions: [], isOrphan: true }
// ─────────────────────────────────────────────
router.get('/class-rewards', async (req: any, res) => {

  try {
    const profileId = req.profile.id;

    const role = await getUserRole(profileId);
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (isTeacher) {
      const ctx = await resolveClassContext(profileId, role!);
      if (!ctx.ownerId) {
        // Trợ Giảng chưa được mời vào lớp nào — chưa có gì để quản lý.
        return res.json({ rewards: [], redemptions: [], isOrphan: false, canManage: false });
      }

      await ensureDefaultClassRewards(ctx.ownerId);
      const rewardsRes = await pool.query(
        'SELECT * FROM ge10_class_rewards WHERE teacher_id = $1 ORDER BY created_at DESC',
        [ctx.ownerId]
      );
      const rewardIds = rewardsRes.rows.map((r: any) => r.id);

      let redemptions: any[] = [];
      if (rewardIds.length > 0) {
        const rRes = await pool.query(
          `SELECT r.*, u.name AS student_name, u.avatar_url AS student_avatar
           FROM ge10_class_reward_redemptions r
           JOIN ge10_users u ON u.id = r.student_id
           WHERE r.class_reward_id = ANY($1::text[])
           ORDER BY r.requested_at DESC`,
          [rewardIds]
        );
        redemptions = rRes.rows;
      }

      return res.json({ rewards: rewardsRes.rows, redemptions, isOrphan: false, canManage: ctx.canManage });
    }

    // Student: check if in a class
    const linksRes = await pool.query(
      `SELECT tutor_id FROM ge10_class_links WHERE student_id = $1 AND status = 'active'`,
      [profileId]
    );
    const teacherIds = linksRes.rows.map((r: any) => r.tutor_id);

    if (teacherIds.length === 0) {
      return res.json({ rewards: [], redemptions: [], isOrphan: true });
    }

    // Seed default rewards for student's primary teacher(s) if not existing
    for (const tId of teacherIds) {
      await ensureDefaultClassRewards(tId);
    }

    const rewardsRes = await pool.query(
      `SELECT cr.*, u.name AS teacher_name
       FROM ge10_class_rewards cr
       JOIN ge10_users u ON u.id = cr.teacher_id
       WHERE cr.teacher_id = ANY($1::text[])
       ORDER BY cr.created_at DESC`,
      [teacherIds]
    );
    const rewardIds = rewardsRes.rows.map((r: any) => r.id);

    let myRedemptions: any[] = [];
    if (rewardIds.length > 0) {
      const rRes = await pool.query(
        `SELECT * FROM ge10_class_reward_redemptions
         WHERE student_id = $1 AND class_reward_id = ANY($2::text[])
         ORDER BY requested_at DESC`,
        [profileId, rewardIds]
      );
      myRedemptions = rRes.rows;
    }

    return res.json({ rewards: rewardsRes.rows, redemptions: myRedemptions, isOrphan: false });
  } catch (err) {
    console.error('[GET /class-rewards]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// POST /api/class-rewards — Chủ Nhiệm, hoặc Trợ Giảng được cấp quyền, tạo quà cho LỚP
// ─────────────────────────────────────────────
router.post('/class-rewards', async (req: any, res) => {

  const { title } = req.body;
  const costRuby = req.body.costRuby ?? req.body.costCoins;
  const isUnlimited = req.body.isUnlimited === true;
  const quantity = isUnlimited ? 1 : req.body.quantity;
  if (!title?.trim() || !costRuby || costRuby <= 0 || (!isUnlimited && (!quantity || quantity <= 0))) {
    return res.status(400).json({ error: 'Missing or invalid fields: title, costRuby, quantity' });
  }

  try {
    const profileId = req.profile.id;

    const role = await getUserRole(profileId);
    if (!TEACHER_ROLES.includes(role || '')) {
      return res.status(403).json({ error: 'Only teachers can create class rewards' });
    }

    const ctx = await resolveClassContext(profileId, role!);
    if (!ctx.ownerId || !ctx.canManage) {
      return res.status(403).json({ error: 'Bạn chưa được cấp quyền quản lý Quà Khuyến Học của lớp này.' });
    }

    const id = crypto.randomUUID();
    const now = Date.now();

    await pool.query(
      `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, is_unlimited, created_at)
       VALUES ($1, $2, $3, $4, $5, $5, $6, $7)`,
      [id, ctx.ownerId, title.trim(), costRuby, quantity, isUnlimited, now]
    );

    return res.json({ success: true, id, createdAt: now });
  } catch (err) {
    console.error('[POST /class-rewards]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/class-rewards/:id — Chủ Nhiệm, hoặc Trợ Giảng được cấp quyền, xoá quà của LỚP
// ─────────────────────────────────────────────
router.delete('/class-rewards/:id', async (req: any, res) => {
  const rewardId = req.params.id;

  try {
    const profileId = req.profile.id;

    const role = await getUserRole(profileId);
    if (!TEACHER_ROLES.includes(role || '')) {
      return res.status(403).json({ error: 'Only teachers can delete class rewards' });
    }

    const ctx = await resolveClassContext(profileId, role!);
    if (!ctx.ownerId || !ctx.canManage) {
      return res.status(403).json({ error: 'Bạn chưa được cấp quyền quản lý Quà Khuyến Học của lớp này.' });
    }

    const check = await pool.query(
      'SELECT id FROM ge10_class_rewards WHERE id = $1 AND teacher_id = $2',
      [rewardId, ctx.ownerId]
    );
    if (check.rows.length === 0) {
      return res.status(403).json({ error: 'Reward not found or not owned by your class' });
    }

    await pool.query('DELETE FROM ge10_class_rewards WHERE id = $1', [rewardId]);
    return res.json({ success: true });
  } catch (err) {
    console.error('[DELETE /class-rewards/:id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// POST /api/class-rewards/:id/redeem — Student redeems (deduct ruby, remaining--, create pending redemption)
// ─────────────────────────────────────────────
router.post('/class-rewards/:id/redeem', async (req: any, res) => {
  const rewardId = req.params.id;

  try {
    const profileId = req.profile.id;

    // Fetch reward
    const rewardRes = await pool.query('SELECT * FROM ge10_class_rewards WHERE id = $1', [rewardId]);
    const reward = rewardRes.rows[0];
    if (!reward) return res.status(404).json({ error: 'Reward not found' });
    if (!reward.is_unlimited && reward.remaining <= 0) return res.status(400).json({ error: 'out_of_stock' });

    // Verify student is linked to this teacher
    const linkCheck = await pool.query(
      `SELECT id FROM ge10_class_links WHERE student_id = $1 AND tutor_id = $2 AND status = 'active'`,
      [profileId, reward.teacher_id]
    );
    if (linkCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not in this class' });
    }

    // Check ruby
    const playerRes = await pool.query(
      'SELECT ruby FROM ge10_player_profiles WHERE user_id = $1',
      [profileId]
    );
    const player = playerRes.rows[0];
    if (!player) return res.status(404).json({ error: 'Player profile not found' });
    if (player.ruby < reward.cost_ruby) {
      return res.status(400).json({ error: 'not_enough_ruby' });
    }

    // Atomic transaction
    await pool.query('BEGIN');
    try {
      // Deduct ruby
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby - $1 WHERE user_id = $2',
        [reward.cost_ruby, profileId]
      );

      if (!reward.is_unlimited) {
        // Decrement remaining (race-condition safe)
        const updateRes = await pool.query(
          'UPDATE ge10_class_rewards SET remaining = remaining - 1 WHERE id = $1 AND remaining > 0 RETURNING id',
          [rewardId]
        );
        if ((updateRes.rowCount ?? 0) === 0) {
          await pool.query('ROLLBACK');
          return res.status(400).json({ error: 'out_of_stock' });
        }
      }

      // Create redemption record
      const redemptionId = crypto.randomUUID();
      await pool.query(
        `INSERT INTO ge10_class_reward_redemptions
           (id, class_reward_id, student_id, reward_title, cost_ruby, status, requested_at)
         VALUES ($1, $2, $3, $4, $5, 'pending', $6)`,
        [redemptionId, rewardId, profileId, reward.title, reward.cost_ruby, Date.now()]
      );

      await pool.query('COMMIT');
      return res.json({ success: true, redemptionId });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[POST /class-rewards/:id/redeem]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/class-rewards/redemptions/:id — Student cancels a pending redemption
// Refunds ruby + increments remaining
// ─────────────────────────────────────────────
router.delete('/class-rewards/redemptions/:id', async (req: any, res) => {
  const redemptionId = req.params.id;

  try {
    const profileId = req.profile.id;

    const redemptionRes = await pool.query(
      `SELECT r.*, cr.id AS reward_fk
       FROM ge10_class_reward_redemptions r
       JOIN ge10_class_rewards cr ON cr.id = r.class_reward_id
       WHERE r.id = $1 AND r.student_id = $2 AND r.status = 'pending'`,
      [redemptionId, profileId]
    );
    const redemption = redemptionRes.rows[0];
    if (!redemption) return res.status(404).json({ error: 'Pending redemption not found' });

    await pool.query('BEGIN');
    try {
      // Refund ruby
      await pool.query(
        'UPDATE ge10_player_profiles SET ruby = ruby + $1 WHERE user_id = $2',
        [redemption.cost_ruby, profileId]
      );
      // Restore remaining (không giới hạn thì không có tồn kho để hoàn)
      await pool.query(
        'UPDATE ge10_class_rewards SET remaining = remaining + 1 WHERE id = $1 AND is_unlimited = FALSE',
        [redemption.reward_fk]
      );
      // Mark cancelled
      await pool.query(
        `UPDATE ge10_class_reward_redemptions SET status = 'cancelled' WHERE id = $1`,
        [redemptionId]
      );

      await pool.query('COMMIT');
      return res.json({ success: true });
    } catch (err) {
      await pool.query('ROLLBACK');
      throw err;
    }
  } catch (err) {
    console.error('[DELETE /class-rewards/redemptions/:id]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/class-rewards/redemptions/:id/deliver — Chủ Nhiệm, hoặc Trợ Giảng được
// cấp quyền, xác nhận đã trao quà ngoài đời
// ─────────────────────────────────────────────
router.patch('/class-rewards/redemptions/:id/deliver', async (req: any, res) => {
  const redemptionId = req.params.id;

  try {
    const profileId = req.profile.id;
    const role = await getUserRole(profileId);
    if (!TEACHER_ROLES.includes(role || '')) {
      return res.status(403).json({ error: 'Only teachers can deliver class rewards' });
    }

    const rowRes = await pool.query(
      `SELECT cr.teacher_id FROM ge10_class_reward_redemptions r
       JOIN ge10_class_rewards cr ON cr.id = r.class_reward_id
       WHERE r.id = $1 AND r.status = 'pending'`,
      [redemptionId]
    );
    if (rowRes.rows.length === 0) {
      return res.status(404).json({ error: 'Redemption not found or already processed' });
    }
    const ownerTeacherId = rowRes.rows[0].teacher_id;

    let allowed = false;
    if (role === 'tutor') {
      allowed = ownerTeacherId === profileId;
    } else {
      const ctx = await resolveClassContext(profileId, role!);
      allowed = ctx.canManage && ctx.ownerId === ownerTeacherId;
    }
    if (!allowed) {
      return res.status(403).json({ error: 'Bạn chưa được cấp quyền duyệt Quà Khuyến Học của lớp này.' });
    }

    await pool.query(
      `UPDATE ge10_class_reward_redemptions SET status = 'delivered', delivered_at = $1 WHERE id = $2`,
      [Date.now(), redemptionId]
    );

    return res.json({ success: true });
  } catch (err) {
    console.error('[PATCH /class-rewards/redemptions/:id/deliver]', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
