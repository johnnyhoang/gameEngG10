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

// POST /api/reference-exams — Thêm đề thi mới (CRUD cho Viện Trưởng & Viện Phó)
router.post('/reference-exams', async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      subjectId,
      gradeTier,
      category,
      categoryName,
      schoolName,
      district,
      province,
      year,
      examPdfUrl,
      solutionPdfUrl,
      fileSizeExam,
      fileSizeSolution,
      hasSolution,
      description,
    } = req.body;

    if (!title || !examPdfUrl) {
      return res.status(400).json({ success: false, message: 'Tiêu đề và đường dẫn Đề thi là bắt buộc.' });
    }

    const examId = id || `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const insertQuery = `
      INSERT INTO ge10_reference_exams (
        id, title, subject_id, grade_tier, category, category_name,
        school_name, district, province, year,
        exam_pdf_url, solution_pdf_url, file_size_exam, file_size_solution,
        has_solution, description, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        subject_id = EXCLUDED.subject_id,
        grade_tier = EXCLUDED.grade_tier,
        category = EXCLUDED.category,
        category_name = EXCLUDED.category_name,
        school_name = EXCLUDED.school_name,
        district = EXCLUDED.district,
        province = EXCLUDED.province,
        year = EXCLUDED.year,
        exam_pdf_url = EXCLUDED.exam_pdf_url,
        solution_pdf_url = EXCLUDED.solution_pdf_url,
        file_size_exam = EXCLUDED.file_size_exam,
        file_size_solution = EXCLUDED.file_size_solution,
        has_solution = EXCLUDED.has_solution,
        description = EXCLUDED.description,
        updated_at = NOW()
      RETURNING *;
    `;

    const values = [
      examId,
      title,
      subjectId || 'math',
      String(gradeTier || '9'),
      category || 'final_hk1',
      categoryName || 'Cuối Học Kỳ 1',
      schoolName || null,
      district || null,
      province || 'TP. Hồ Chí Minh',
      year || '2024 - 2025',
      examPdfUrl,
      solutionPdfUrl || null,
      fileSizeExam || null,
      fileSizeSolution || null,
      hasSolution ?? Boolean(solutionPdfUrl),
      description || null,
    ];

    const result = await pool.query(insertQuery, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Error creating reference exam:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/reference-exams/:id — Cập nhật đề thi
router.put('/reference-exams/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      subjectId,
      gradeTier,
      category,
      categoryName,
      schoolName,
      district,
      province,
      year,
      examPdfUrl,
      solutionPdfUrl,
      fileSizeExam,
      fileSizeSolution,
      hasSolution,
      description,
    } = req.body;

    const updateQuery = `
      UPDATE ge10_reference_exams SET
        title = COALESCE($2, title),
        subject_id = COALESCE($3, subject_id),
        grade_tier = COALESCE($4, grade_tier),
        category = COALESCE($5, category),
        category_name = COALESCE($6, category_name),
        school_name = COALESCE($7, school_name),
        district = COALESCE($8, district),
        province = COALESCE($9, province),
        year = COALESCE($10, year),
        exam_pdf_url = COALESCE($11, exam_pdf_url),
        solution_pdf_url = COALESCE($12, solution_pdf_url),
        file_size_exam = COALESCE($13, file_size_exam),
        file_size_solution = COALESCE($14, file_size_solution),
        has_solution = COALESCE($15, has_solution),
        description = COALESCE($16, description),
        updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;

    const values = [
      id,
      title,
      subjectId,
      gradeTier ? String(gradeTier) : undefined,
      category,
      categoryName,
      schoolName,
      district,
      province,
      year,
      examPdfUrl,
      solutionPdfUrl,
      fileSizeExam,
      fileSizeSolution,
      hasSolution,
      description,
    ];

    const result = await pool.query(updateQuery, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đề thi cần cập nhật.' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating reference exam:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/reference-exams/:id — Xóa đề thi
router.delete('/reference-exams/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM ge10_reference_exams WHERE id = $1', [id]);
    res.json({ success: true, message: 'Đã xóa đề thi thành công.' });
  } catch (error: any) {
    console.error('Error deleting reference exam:', error);
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
