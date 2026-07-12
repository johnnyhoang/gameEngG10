import { pool } from '../db.js';

export const persistCustomQuestion = async (userId: string, question: any) => {
  let lessonId = null;
  try {
    const lessonRes = await pool.query('SELECT id FROM ge10_lessons WHERE category = $1', [question.category]);
    if (lessonRes.rows.length > 0) {
      lessonId = lessonRes.rows[0].id;
    }
  } catch (e: any) {
    console.error('Lỗi khi truy vấn lesson_id cho câu hỏi:', e.message);
  }

  await pool.query(
    `INSERT INTO ge10_custom_questions (id, user_id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, image_url, metadata, lesson_id, is_confused)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
     ON CONFLICT (id) DO UPDATE SET
       type = EXCLUDED.type,
       category = EXCLUDED.category,
       topic_id = EXCLUDED.topic_id,
       prompt = EXCLUDED.prompt,
       options = EXCLUDED.options,
       correct_answer = EXCLUDED.correct_answer,
       explanation = EXCLUDED.explanation,
       difficulty = EXCLUDED.difficulty,
       source = EXCLUDED.source,
       subject = EXCLUDED.subject,
       image_url = EXCLUDED.image_url,
       metadata = EXCLUDED.metadata,
       lesson_id = EXCLUDED.lesson_id,
       is_confused = EXCLUDED.is_confused`,
    [
      question.id,
      userId,
      question.type || 'mcq',
      question.category,
      question.topicId || null,
      question.prompt,
      question.options || null,
      Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer],
      question.explanation || '',
      question.difficulty || 5,
      question.source || 'AI Ingested English',
      question.subject || 'english',
      question.imageUrl || question.image_url || null,
      question.metadata ? JSON.stringify(question.metadata) : null,
      lessonId,
      question.isConfused || false
    ]
  );
};

export const ensureDefaultRewards = async (userId: string) => {
  const rewardsRes = await pool.query('SELECT id FROM ge10_parent_rewards WHERE user_id = $1', [userId]);
  if (rewardsRes.rowCount === 0) {
    const defaultRewards = [
      { id: `default-rew-1-${userId}`, title: '15 phút chơi game', cost_coins: 150, quantity: 10 },
      { id: `default-rew-2-${userId}`, title: 'Ly trà sữa đặc biệt', cost_coins: 400, quantity: 4 },
      { id: `default-rew-3-${userId}`, title: 'Bao lì xì 20.000đ', cost_coins: 500, quantity: 5 },
      { id: `default-rew-4-${userId}`, title: 'Bao lì xì 50.000đ', cost_coins: 1000, quantity: 3 },
      { id: `default-rew-5-${userId}`, title: 'Bao lì xì 100.000đ', cost_coins: 1800, quantity: 1 }
    ];

    for (const dr of defaultRewards) {
      await pool.query(
        `INSERT INTO ge10_parent_rewards (id, user_id, title, cost_coins, quantity, remaining_quantity, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [dr.id, userId, dr.title, dr.cost_coins, dr.quantity, dr.quantity, Date.now()]
      );
    }
  }
};

export const ensureDefaultClassRewards = async (teacherId: string) => {
  const rewardsRes = await pool.query('SELECT id FROM ge10_class_rewards WHERE teacher_id = $1', [teacherId]);
  if (rewardsRes.rowCount === 0) {
    const defaultRewards = [
      { id: `default-cls-rew-1-${teacherId}`, title: '15 phút chơi game', cost_coins: 150, quantity: 10 },
      { id: `default-cls-rew-2-${teacherId}`, title: 'Ly trà sữa đặc biệt', cost_coins: 400, quantity: 4 },
      { id: `default-cls-rew-3-${teacherId}`, title: 'Bao lì xì 20.000đ', cost_coins: 500, quantity: 5 },
      { id: `default-cls-rew-4-${teacherId}`, title: 'Bao lì xì 50.000đ', cost_coins: 1000, quantity: 3 },
      { id: `default-cls-rew-5-${teacherId}`, title: 'Bao lì xì 100.000đ', cost_coins: 1800, quantity: 1 }
    ];

    for (const dr of defaultRewards) {
      await pool.query(
        `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_coins, quantity, remaining, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [dr.id, teacherId, dr.title, dr.cost_coins, dr.quantity, dr.quantity, Date.now()]
      );
    }
  }
};
