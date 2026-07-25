import express from 'express';
import crypto from 'crypto';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

const TEACHER_ROLES = ['tutor', 'secondary_tutor', 'truong_vien', 'pho_vien'];

// GET /api/tutor-quests
// Get quests assigned by teacher OR quests assigned to student
router.get('/tutor-quests', async (req: any, res) => {
  try {
    const profileId = req.profile.id;
    const role = req.profile.role;
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (isTeacher) {
      // Teacher: Get all quests created by this teacher
      const questsRes = await pool.query(
        `SELECT q.*, u.name AS student_name, u.avatar_url AS student_avatar
         FROM ge10_tutor_quests q
         JOIN ge10_users u ON u.id = q.student_id
         WHERE q.tutor_id = $1
         ORDER BY q.created_at DESC`,
        [profileId]
      );
      return res.json({ success: true, quests: questsRes.rows });
    } else {
      // Student: Get all quests assigned to this student
      const questsRes = await pool.query(
        `SELECT q.*, u.name AS tutor_name, u.avatar_url AS tutor_avatar
         FROM ge10_tutor_quests q
         JOIN ge10_users u ON u.id = q.tutor_id
         WHERE q.student_id = $1 AND q.status != 'claimed'
         ORDER BY q.created_at DESC`,
        [profileId]
      );
      return res.json({ success: true, quests: questsRes.rows });
    }
  } catch (err: any) {
    console.error('[GET /tutor-quests] Error:', err);
    res.status(500).json({ error: 'Server error', details: err?.message });
  }
});

// POST /api/tutor-quests
// Assign a new quest to one or more students (Teacher only)
router.post('/tutor-quests', async (req: any, res) => {
  try {
    const profileId = req.profile.id;
    const role = req.profile.role;
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (!isTeacher) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Chủ Nhiệm/Admin mới được phép giao bài tập.' });
    }

    const { studentIds, title, description, rewardRuby } = req.body;
    if (!studentIds || !title || rewardRuby === undefined) {
      return res.status(400).json({ error: 'Missing studentIds, title or rewardRuby.' });
    }

    const students = Array.isArray(studentIds) ? studentIds : [studentIds];
    if (students.length === 0) {
      return res.status(400).json({ error: 'studentIds list cannot be empty.' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const createdQuests = [];

      for (const studentId of students) {
        // Verify connection exists
        const linkCheck = await client.query(
          `SELECT 1 FROM ge10_class_links 
           WHERE tutor_id = $1 AND student_id = $2 AND status = 'active'`,
          [profileId, studentId]
        );

        if (linkCheck.rowCount === 0 && role !== 'truong_vien') {
          // If not Admin and no active link, block
          throw new Error(`Student ${studentId} is not linked to this teacher.`);
        }

        const questId = 'tq-' + crypto.randomUUID();
        const insertRes = await client.query(
          `INSERT INTO ge10_tutor_quests (id, tutor_id, student_id, title, description, reward_ruby, status)
           VALUES ($1, $2, $3, $4, $5, $6, 'assigned')
           RETURNING *`,
          [questId, profileId, studentId, title, description, rewardRuby]
        );
        createdQuests.push(insertRes.rows[0]);
      }

      await client.query('COMMIT');
      res.json({ success: true, quests: createdQuests });
    } catch (err: any) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error('[POST /tutor-quests] Error:', err);
    res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// POST /api/tutor-quests/:id/complete
// Mark quest completed (Teacher only)
router.post('/tutor-quests/:id/complete', async (req: any, res) => {
  try {
    const profileId = req.profile.id;
    const role = req.profile.role;
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (!isTeacher) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Chủ Nhiệm/Admin mới được hoàn tất bài tập.' });
    }

    const questId = req.params.id;

    // Check ownership
    const checkRes = await pool.query(
      `SELECT tutor_id, status FROM ge10_tutor_quests WHERE id = $1`,
      [questId]
    );

    if (checkRes.rowCount === 0) {
      return res.status(404).json({ error: 'Tutor Quest not found.' });
    }

    const quest = checkRes.rows[0];
    if (quest.tutor_id !== profileId && role !== 'truong_vien') {
      return res.status(403).json({ error: 'Forbidden: Bạn không tạo bài tập này.' });
    }

    if (quest.status !== 'assigned') {
      return res.status(400).json({ error: `Quest status must be 'assigned', currently it is '${quest.status}'.` });
    }

    const updateRes = await pool.query(
      `UPDATE ge10_tutor_quests
       SET status = 'completed', completed_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [questId]
    );

    res.json({ success: true, quest: updateRes.rows[0] });
  } catch (err: any) {
    console.error('[POST /tutor-quests/:id/complete] Error:', err);
    res.status(500).json({ error: 'Server error', details: err?.message });
  }
});

// POST /api/tutor-quests/:id/claim
// Claim reward for completed quest (Student only)
router.post('/tutor-quests/:id/claim', async (req: any, res) => {
  const questId = req.params.id;
  const profileId = req.profile.id;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // SELECT and LOCK the quest row
    const questRes = await client.query(
      `SELECT * FROM ge10_tutor_quests WHERE id = $1 FOR UPDATE`,
      [questId]
    );

    if (questRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Tutor Quest not found.' });
    }

    const quest = questRes.rows[0];
    if (quest.student_id !== profileId) {
      await client.query('ROLLBACK');
      return res.status(403).json({ error: 'Forbidden: Bạn không phải chủ sở hữu bài tập này.' });
    }

    if (quest.status !== 'completed') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Quest must be completed by tutor before claiming reward.' });
    }

    // Call stored procedure to process ruby transaction
    const txRes = await client.query(
      `SELECT ge10_process_ruby_transaction($1, $2) AS success`,
      [profileId, quest.reward_ruby]
    );

    if (!txRes.rows[0]?.success) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Failed to credit ruby reward.' });
    }

    // Record activity log
    const logId = 'log-' + crypto.randomUUID();
    const timestamp = Date.now();
    await client.query(
      `INSERT INTO ge10_history_logs (id, user_id, timestamp, activity_type, title, detail, ruby_changed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        logId,
        profileId,
        timestamp,
        'claim_tutor_quest',
        `Hoàn thành Bài Tập: ${quest.title}`,
        `Nhận phần thưởng hoàn thành bài tập từ Chủ Nhiệm`,
        quest.reward_ruby
      ]
    );

    // Update quest status
    const updateRes = await client.query(
      `UPDATE ge10_tutor_quests
       SET status = 'claimed', claimed_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [questId]
    );

    await client.query('COMMIT');
    res.json({ success: true, quest: updateRes.rows[0], rewardRuby: quest.reward_ruby });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('[POST /tutor-quests/:id/claim] Error:', err);
    res.status(500).json({ error: 'Server error', details: err?.message });
  } finally {
    client.release();
  }
});

// DELETE /api/tutor-quests/:id
// Delete quest (Teacher only)
router.delete('/tutor-quests/:id', async (req: any, res) => {
  try {
    const profileId = req.profile.id;
    const role = req.profile.role;
    const isTeacher = TEACHER_ROLES.includes(role || '');

    if (!isTeacher) {
      return res.status(403).json({ error: 'Forbidden: Chỉ Chủ Nhiệm/Admin mới được xóa bài tập.' });
    }

    const questId = req.params.id;

    // Check ownership
    const checkRes = await pool.query(
      `SELECT tutor_id FROM ge10_tutor_quests WHERE id = $1`,
      [questId]
    );

    if (checkRes.rowCount === 0) {
      return res.status(404).json({ error: 'Tutor Quest not found.' });
    }

    const quest = checkRes.rows[0];
    if (quest.tutor_id !== profileId && role !== 'truong_vien') {
      return res.status(403).json({ error: 'Forbidden: Bạn không tạo bài tập này.' });
    }

    await pool.query('DELETE FROM ge10_tutor_quests WHERE id = $1', [questId]);
    res.json({ success: true, message: 'Quest deleted successfully.' });
  } catch (err: any) {
    console.error('[DELETE /tutor-quests/:id] Error:', err);
    res.status(500).json({ error: 'Server error', details: err?.message });
  }
});

export default router;
