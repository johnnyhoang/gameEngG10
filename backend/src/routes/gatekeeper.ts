import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { checkStudentManagementPermission } from '../helpers/permissions.js';

const router = express.Router();

// GET /api/gatekeeper-history
router.get('/gatekeeper-history', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const studentId = req.query.studentId as string;
  const pageId = req.query.pageId as string;
  if (!studentId) return res.status(400).json({ error: 'Missing studentId' });
  try {
    // 1. Verify ownership/permission
    const callerRes = await pool.query('SELECT id FROM ge10_users WHERE account_id = $1', [accountId]);
    if (callerRes.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const callerId = callerRes.rows[0].id;

    if (callerId !== studentId) {
      const hasPermission = await checkStudentManagementPermission(callerId, studentId, 'view_profile');
      if (!hasPermission) return res.status(403).json({ error: 'Forbidden: You do not have permission to view this history.' });
    }

    let query = 'SELECT * FROM ge10_gatekeeper_history WHERE student_id = $1';
    let params: any[] = [studentId];
    if (pageId) {
      query += ' AND page_id = $2';
      params.push(pageId);
    }
    const result = await pool.query(query, params);
    res.json(result.rows.map(r => ({
      studentId: r.student_id,
      pageId: r.page_id,
      questionId: r.question_id,
      usedAt: r.used_at
    })));
  } catch (error) {
    console.error('Error fetching gatekeeper history:', error);
    res.status(500).json({ error: 'Failed to fetch gatekeeper history' });
  }
});

// POST /api/gatekeeper-history
router.post('/gatekeeper-history', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { studentId, pageId, questionId } = req.body;
  if (!studentId || !pageId || !questionId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // 1. Verify ownership/permission
    const callerRes = await pool.query('SELECT id FROM ge10_users WHERE account_id = $1', [accountId]);
    if (callerRes.rowCount === 0) return res.status(403).json({ error: 'Unauthorized' });
    const callerId = callerRes.rows[0].id;

    if (callerId !== studentId) {
      const hasPermission = await checkStudentManagementPermission(callerId, studentId, 'approve_reward');
      if (!hasPermission) return res.status(403).json({ error: 'Forbidden: You do not have permission to record this history.' });
    }

    const result = await pool.query(
      'INSERT INTO ge10_gatekeeper_history (student_id, page_id, question_id) VALUES ($1, $2, $3) RETURNING *',
      [studentId, pageId, questionId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error recording gatekeeper history:', error);
    res.status(500).json({ error: 'Failed to record gatekeeper history' });
  }
});

export default router;
