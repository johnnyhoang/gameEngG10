import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);
const SUPPORTED_GRADES = new Set([6, 7, 8, 9, 10, 11, 12, 13]);

export function parseContext(input: Record<string, unknown>) {
  const gradeTier = Number(input.gradeTier);
  const rawSubject = input.subjectId ?? input.subject;
  const subjectId = typeof rawSubject === 'string' ? rawSubject.trim() : '';
  if (!SUPPORTED_GRADES.has(gradeTier) || !subjectId) return null;
  return { gradeTier, subjectId };
}

router.get('/content/lessons', async (req, res) => {
  const context = parseContext(req.query);
  if (!context) return res.status(400).json({ error: 'gradeTier and subject are required.' });
  const result = await pool.query(
    `SELECT id, subject, grade_tier AS "gradeTier", topic, title, theory, category
     FROM ge10_lessons WHERE grade_tier = $1 AND subject = $2 ORDER BY id`,
    [context.gradeTier, context.subjectId]
  );
  return res.json({ success: true, learningContext: context, lessons: result.rows });
});

router.get('/content/questions', async (req: any, res) => {
  const context = parseContext(req.query);
  if (!context) return res.status(400).json({ error: 'gradeTier and subject are required.' });
  const userId = req.profile.id;
  const result = await pool.query(
    `SELECT id, type, category, topic_id AS "topicId", prompt, options,
            correct_answer AS "correctAnswer", explanation, difficulty, source,
            subject, grade_tier AS "gradeTier", image_url AS "imageUrl", metadata
     FROM ge10_custom_questions
     WHERE grade_tier = $1 AND subject = $2
       AND (user_id = $3 OR user_id IS NULL OR user_id IN
         (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien')))
     ORDER BY id`,
    [context.gradeTier, context.subjectId, userId]
  );
  return res.json({ success: true, learningContext: context, questions: result.rows });
});

router.get('/learning-progress', async (req: any, res) => {
  const context = parseContext(req.query);
  if (!context) return res.status(400).json({ error: 'gradeTier and subject are required.' });
  const [progress, results] = await Promise.all([
    pool.query(
      `SELECT lesson_id, completed, completed_at FROM ge10_grade_lesson_progress
       WHERE user_id = $1 AND grade_tier = $2 AND subject = $3
       ORDER BY completed_at DESC NULLS LAST`,
      [req.profile.id, context.gradeTier, context.subjectId]
    ),
    pool.query(
      `SELECT lesson_id, score, total, accuracy, completed_at FROM ge10_grade_quiz_results
       WHERE user_id = $1 AND grade_tier = $2 AND subject = $3
       ORDER BY completed_at DESC LIMIT 50`,
      [req.profile.id, context.gradeTier, context.subjectId]
    )
  ]);
  return res.json({ success: true, learningContext: context, progress: progress.rows, recentResults: results.rows });
});

router.get('/quizzes/random', async (req: any, res) => {
  const context = parseContext(req.query);
  if (!context) return res.status(400).json({ error: 'gradeTier and subject are required.' });
  const requestedCount = Math.min(Math.max(Number(req.query.count) || 10, 1), 50);
  const result = await pool.query(
    `SELECT id, type, category, topic_id AS "topicId", prompt, options, difficulty, source,
            subject, grade_tier AS "gradeTier", image_url AS "imageUrl"
     FROM ge10_custom_questions
     WHERE grade_tier = $1 AND subject = $2
       AND (user_id = $3 OR user_id IS NULL OR user_id IN
         (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien')))
     ORDER BY random() LIMIT $4`,
    [context.gradeTier, context.subjectId, req.profile.id, requestedCount]
  );
  return res.json({ success: true, learningContext: context, count: result.rows.length, questions: result.rows });
});

router.post('/quizzes/submit', async (req: any, res) => {
  const context = parseContext(req.body ?? {});
  const { lessonId, answers } = req.body ?? {};
  if (!context || !lessonId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'gradeTier, subject, lessonId and answers are required.' });
  }
  const ids = answers.map((answer: any) => answer.questionId).filter(Boolean);
  const questionResult = await pool.query(
    `SELECT id, correct_answer, explanation FROM ge10_custom_questions
     WHERE grade_tier = $1 AND subject = $2 AND id = ANY($3::varchar[])`,
    [context.gradeTier, context.subjectId, ids]
  );
  const byId = new Map(questionResult.rows.map(row => [row.id, row]));
  const feedback = answers.map((answer: any) => {
    const question = byId.get(answer.questionId);
    if (!question) return { questionId: answer.questionId, error: 'Question not found in learning context.' };
    const accepted = (question.correct_answer as string[]).map(value => value.trim().toLowerCase());
    const isCorrect = accepted.includes(String(answer.userAnswer ?? '').trim().toLowerCase());
    return { questionId: answer.questionId, isCorrect, explanation: question.explanation, correctAnswer: question.correct_answer };
  });
  const correctCount = feedback.filter(item => item.isCorrect).length;
  const accuracy = correctCount / answers.length * 100;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `INSERT INTO ge10_grade_quiz_results
       (user_id, grade_tier, subject, lesson_id, score, total, accuracy)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [req.profile.id, context.gradeTier, context.subjectId, lessonId, correctCount, answers.length, accuracy]
    );
    await client.query(
      `INSERT INTO ge10_grade_lesson_progress
       (user_id, grade_tier, subject, lesson_id, completed, completed_at)
       VALUES ($1, $2, $3, $4, $5, CASE WHEN $5 THEN NOW() END)
       ON CONFLICT (user_id, grade_tier, subject, lesson_id) DO UPDATE SET
         completed = ge10_grade_lesson_progress.completed OR EXCLUDED.completed,
         completed_at = CASE WHEN EXCLUDED.completed THEN NOW() ELSE ge10_grade_lesson_progress.completed_at END`,
      [req.profile.id, context.gradeTier, context.subjectId, lessonId, accuracy >= 70]
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  return res.json({ success: true, learningContext: context, score: correctCount, total: answers.length, accuracy, passed: accuracy >= 70, feedback });
});

router.get('/content/all', async (req: any, res) => {
  const context = parseContext(req.query);
  if (!context) return res.status(400).json({ error: 'gradeTier and subject are required.' });
  const userId = req.profile.id;

  try {
    const [lessonsRes, questionsRes] = await Promise.all([
      pool.query(
        `SELECT id, subject, grade_tier AS "gradeTier", topic, title, theory, category
         FROM ge10_lessons WHERE grade_tier = $1 AND subject = $2 ORDER BY id`,
        [context.gradeTier, context.subjectId]
      ),
      pool.query(
        `SELECT id, type, category, topic_id AS "topicId", prompt, options,
                correct_answer AS "correctAnswer", explanation, difficulty, source,
                subject, grade_tier AS "gradeTier", image_url AS "imageUrl", metadata
         FROM ge10_custom_questions
         WHERE grade_tier = $1 AND subject = $2
           AND (user_id = $3 OR user_id IS NULL OR user_id IN
             (SELECT id FROM ge10_users WHERE role IN ('truong_vien', 'pho_vien')))
         ORDER BY id`,
        [context.gradeTier, context.subjectId, userId]
      )
    ]);

    return res.json({
      success: true,
      learningContext: context,
      lessons: lessonsRes.rows,
      questions: questionsRes.rows
    });
  } catch (error) {
    console.error('Error fetching learning content:', error);
    return res.status(500).json({ error: 'Internal server error while fetching content.' });
  }
});

router.get('/handbook-pages', async (req: any, res) => {
  try {
    const result = await pool.query(
      `SELECT id, category, title, content, audience, bullets FROM ge10_handbook_pages ORDER BY id`
    );
    return res.json({ success: true, handbookPages: result.rows });
  } catch (error) {
    console.error('Error fetching handbook pages:', error);
    return res.status(500).json({ error: 'Internal server error while fetching handbook pages.' });
  }
});

router.get('/english-island/items', async (req: any, res) => {
  try {
    const result = await pool.query(
      `SELECT id, district_id AS "districtId", type, prompt, options, correct_answer AS "correctAnswer", accepted_answers AS "acceptedAnswers", explanation, speech_text AS "speechText"
       FROM ge10_english_island_items ORDER BY id`
    );
    return res.json({ success: true, items: result.rows });
  } catch (error) {
    console.error('Error fetching english island items:', error);
    return res.status(500).json({ error: 'Internal server error while fetching island items.' });
  }
});

router.get('/exam-blueprints', async (req: any, res) => {
  const subject = req.query.subject;
  if (!subject) return res.status(400).json({ error: 'subject is required.' });
  try {
    const result = await pool.query(
      `SELECT id, subject, part, title, focus, common_question_forms AS "commonQuestionForms", answer_modes AS "answerModes", import_hint AS "importHint"
       FROM ge10_subject_exam_blueprints WHERE subject = $1 ORDER BY id`,
      [subject]
    );
    return res.json({ success: true, subject, blueprints: result.rows });
  } catch (error) {
    console.error('Error fetching exam blueprints:', error);
    return res.status(500).json({ error: 'Internal server error while fetching blueprints.' });
  }
});

export default router;
