import { Router, Request, Response } from 'express';
import { pool } from '../db.js';

const router = Router();

// GET /api/reference-exams — Lấy danh sách đề tham khảo theo ngữ cảnh (subjectId, gradeTier, category)
router.get('/reference-exams', async (req: Request, res: Response) => {
  try {
    const { subjectId, gradeTier, category } = req.query;

    let query = 'SELECT * FROM ge10_reference_exams WHERE 1=1';
    const params: any[] = [];

    if (subjectId) {
      params.push(subjectId);
      query += ` AND subject_id = $${params.length}`;
    }

    if (gradeTier) {
      params.push(String(gradeTier));
      query += ` AND grade_tier = $${params.length}`;
    }

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    
    // Map snake_case to camelCase
    const formatted = result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      subjectId: row.subject_id,
      gradeTier: row.grade_tier,
      category: row.category,
      categoryName: row.category_name,
      schoolName: row.school_name,
      district: row.district,
      province: row.province,
      year: row.year,
      examPdfUrl: row.exam_pdf_url,
      solutionPdfUrl: row.solution_pdf_url,
      fileSizeExam: row.file_size_exam,
      fileSizeSolution: row.file_size_solution,
      hasSolution: row.has_solution,
      totalViews: row.total_views,
      totalDownloads: row.total_downloads,
      description: row.description,
    }));

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('Error fetching reference exams:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/reference-exams/increment-view
router.post('/reference-exams/:id/view', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(
      'UPDATE ge10_reference_exams SET total_views = total_views + 1, updated_at = NOW() WHERE id = $1',
      [id]
    );
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/reference-exams/increment-download
router.post('/reference-exams/:id/download', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query(
      'UPDATE ge10_reference_exams SET total_downloads = total_downloads + 1, updated_at = NOW() WHERE id = $1',
      [id]
    );
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
