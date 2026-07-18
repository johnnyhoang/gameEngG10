import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware, requireProfileRoles } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/textbook-mappings: Lấy toàn bộ danh sách ánh xạ SGK (Học sinh và GV/Admin đều có quyền xem)
router.get('/admin/textbook-mappings', authMiddleware, activeProfileMiddleware, async (req: any, res) => {
  try {
    const result = await pool.query(
      `SELECT category_key, subject, loai, bai, ham FROM ge10_textbook_mappings ORDER BY subject, loai, bai`
    );
    res.json({ success: true, textbookMappings: result.rows });
  } catch (error: any) {
    console.error('Error fetching textbook mappings:', error?.message || error);
    res.status(500).json({ error: 'Failed to fetch textbook mappings.', details: error?.message });
  }
});

const requireSuperAdmin = (req: any, res: any, next: any) => {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  if (!superAdminEmail || req.user?.email !== superAdminEmail) {
    return res.status(403).json({ error: 'Access denied: Super Admin authorization required.' });
  }
  next();
};

// POST /api/admin/textbook-mappings: Tạo ánh xạ SGK mới (Chỉ Super Admin)
router.post(
  '/admin/textbook-mappings',
  authMiddleware,
  activeProfileMiddleware,
  requireSuperAdmin,
  async (req: any, res) => {
    try {
      const { categoryKey, subject, loai, bai, ham } = req.body;
      if (!categoryKey || !subject || !loai || bai === undefined || !ham) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }

      await pool.query(
        `INSERT INTO ge10_textbook_mappings (category_key, subject, loai, bai, ham)
         VALUES ($1, $2, $3, $4, $5)`,
        [categoryKey.trim(), subject.trim(), loai.trim(), Number(bai), ham.trim()]
      );

      res.json({ success: true, message: 'Textbook mapping created successfully.' });
    } catch (error: any) {
      console.error('Error creating textbook mapping:', error?.message || error);
      if (error?.code === '23505') {
        return res.status(400).json({ error: 'Category key already exists in mappings.' });
      }
      res.status(500).json({ error: 'Failed to create textbook mapping.', details: error?.message });
    }
  }
);

// PUT /api/admin/textbook-mappings/:key: Cập nhật ánh xạ SGK (Chỉ Super Admin)
router.put(
  '/admin/textbook-mappings/:key',
  authMiddleware,
  activeProfileMiddleware,
  requireSuperAdmin,
  async (req: any, res) => {
    try {
      const { key } = req.params;
      const { subject, loai, bai, ham } = req.body;
      if (!subject || !loai || bai === undefined || !ham) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }

      const result = await pool.query(
        `UPDATE ge10_textbook_mappings
         SET subject = $1, loai = $2, bai = $3, ham = $4
         WHERE category_key = $5`,
        [subject.trim(), loai.trim(), Number(bai), ham.trim(), key]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Textbook mapping not found.' });
      }

      res.json({ success: true, message: 'Textbook mapping updated successfully.' });
    } catch (error: any) {
      console.error('Error updating textbook mapping:', error?.message || error);
      res.status(500).json({ error: 'Failed to update textbook mapping.', details: error?.message });
    }
  }
);

// DELETE /api/admin/textbook-mappings/:key: Xóa ánh xạ SGK (Chỉ Super Admin)
router.delete(
  '/admin/textbook-mappings/:key',
  authMiddleware,
  activeProfileMiddleware,
  requireSuperAdmin,
  async (req: any, res) => {
    try {
      const { key } = req.params;
      const result = await pool.query(
        `DELETE FROM ge10_textbook_mappings WHERE category_key = $1`,
        [key]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Textbook mapping not found.' });
      }

      res.json({ success: true, message: 'Textbook mapping deleted successfully.' });
    } catch (error: any) {
      console.error('Error deleting textbook mapping:', error?.message || error);
      res.status(500).json({ error: 'Failed to delete textbook mapping.', details: error?.message });
    }
  }
);

export default router;
