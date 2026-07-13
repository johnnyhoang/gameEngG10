import { pool } from '../db.js';

/**
 * Track question being opened/viewed
 */
export const trackQuestionOpened = async (questionId: string) => {
  try {
    await pool.query(
      `UPDATE ge10_custom_questions
       SET times_opened = COALESCE(times_opened, 0) + 1,
           last_opened_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [questionId]
    );

    // Also update the dedicated stats table
    await pool.query(
      `INSERT INTO ge10_question_stats (question_id, times_opened, last_opened_at, updated_at)
       VALUES ($1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT (question_id) DO UPDATE SET
         times_opened = ge10_question_stats.times_opened + 1,
         last_opened_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP`,
      [questionId]
    );
  } catch (error) {
    console.error(`Error tracking question opened (${questionId}):`, error);
  }
};

/**
 * Track correct answer for a question
 */
export const trackQuestionAnsweredCorrectly = async (questionId: string) => {
  try {
    await pool.query(
      `UPDATE ge10_custom_questions
       SET times_answered_correctly = COALESCE(times_answered_correctly, 0) + 1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [questionId]
    );

    // Also update the dedicated stats table
    await pool.query(
      `INSERT INTO ge10_question_stats (question_id, times_answered_correctly, updated_at)
       VALUES ($1, 1, CURRENT_TIMESTAMP)
       ON CONFLICT (question_id) DO UPDATE SET
         times_answered_correctly = ge10_question_stats.times_answered_correctly + 1,
         updated_at = CURRENT_TIMESTAMP`,
      [questionId]
    );
  } catch (error) {
    console.error(`Error tracking question answered correctly (${questionId}):`, error);
  }
};

/**
 * Track skipped question
 */
export const trackQuestionSkipped = async (questionId: string) => {
  try {
    await pool.query(
      `UPDATE ge10_custom_questions
       SET times_skipped = COALESCE(times_skipped, 0) + 1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [questionId]
    );

    // Also update the dedicated stats table
    await pool.query(
      `INSERT INTO ge10_question_stats (question_id, times_skipped, updated_at)
       VALUES ($1, 1, CURRENT_TIMESTAMP)
       ON CONFLICT (question_id) DO UPDATE SET
         times_skipped = ge10_question_stats.times_skipped + 1,
         updated_at = CURRENT_TIMESTAMP`,
      [questionId]
    );
  } catch (error) {
    console.error(`Error tracking question skipped (${questionId}):`, error);
  }
};

/**
 * Track per-student question performance
 */
export const trackStudentQuestionPerformance = async (
  studentId: string,
  questionId: string,
  isCorrect: boolean,
  wasSkipped: boolean = false
) => {
  try {
    const updateFields: string[] = [
      'times_attempted = COALESCE(times_attempted, 0) + 1',
      'updated_at = CURRENT_TIMESTAMP',
      'last_attempted_at = CURRENT_TIMESTAMP'
    ];

    if (isCorrect) {
      updateFields.push('times_correct = COALESCE(times_correct, 0) + 1');
    }
    if (wasSkipped) {
      updateFields.push('times_skipped = COALESCE(times_skipped, 0) + 1');
    }

    await pool.query(
      `INSERT INTO ge10_student_question_performance (student_id, question_id, times_attempted, times_correct, times_skipped, last_attempted_at, updated_at)
       VALUES ($1, $2, 1, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, question_id) DO UPDATE SET
         ${updateFields.join(', ')}`,
      [studentId, questionId, isCorrect ? 1 : 0, wasSkipped ? 1 : 0]
    );
  } catch (error) {
    console.error(`Error tracking student question performance:`, error);
  }
};

/**
 * Get question statistics
 */
export const getQuestionStats = async (questionId: string) => {
  try {
    const result = await pool.query(
      `SELECT
         times_opened,
         times_answered_correctly,
         times_skipped,
         last_opened_at,
         updated_at
       FROM ge10_custom_questions
       WHERE id = $1`,
      [questionId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching question stats (${questionId}):`, error);
    return null;
  }
};

/**
 * Get questions sorted by usage statistics
 */
export const getQuestionsByStats = async (subject?: string, sortBy: 'opened' | 'correct' | 'skipped' = 'opened', limit: number = 100) => {
  try {
    let query = `SELECT * FROM ge10_custom_questions WHERE 1=1`;
    const params: any[] = [];

    if (subject) {
      query += ` AND subject = $${params.length + 1}`;
      params.push(subject);
    }

    const sortMap = {
      'opened': 'times_opened DESC',
      'correct': 'times_answered_correctly DESC',
      'skipped': 'times_skipped DESC'
    };

    query += ` ORDER BY ${sortMap[sortBy]} LIMIT $${params.length + 1}`;
    params.push(limit);

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching questions by stats:', error);
    return [];
  }
};

/**
 * Get student performance on a specific question
 */
export const getStudentQuestionPerformance = async (studentId: string, questionId: string) => {
  try {
    const result = await pool.query(
      `SELECT times_attempted, times_correct, times_skipped, last_attempted_at
       FROM ge10_student_question_performance
       WHERE student_id = $1 AND question_id = $2`,
      [studentId, questionId]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching student question performance:', error);
    return null;
  }
};

/**
 * Get student's most struggled questions
 */
export const getStudentStruggledQuestions = async (studentId: string, limit: number = 20) => {
  try {
    const result = await pool.query(
      `SELECT
         q.id, q.prompt, q.subject, q.category, q.difficulty,
         p.times_attempted, p.times_correct, p.times_skipped,
         ROUND(CAST(p.times_correct AS FLOAT) / NULLIF(p.times_attempted, 0), 2) as accuracy
       FROM ge10_student_question_performance p
       JOIN ge10_custom_questions q ON p.question_id = q.id
       WHERE p.student_id = $1 AND p.times_attempted > 0
       ORDER BY accuracy ASC, p.times_attempted DESC
       LIMIT $2`,
      [studentId, limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching student struggled questions:', error);
    return [];
  }
};
