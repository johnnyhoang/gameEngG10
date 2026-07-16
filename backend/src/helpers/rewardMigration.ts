import { pool } from '../db.js';
import crypto from 'crypto';
import { ensureDefaultClassRewards, ensureDefaultRewards } from './questions.js';

export const migratePendingClaims = async (studentId: string, newTeacherId: string | null) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (newTeacherId) {
      // --- CASE 1 & 2: JOINING OR CHANGING CLASS ---
      // Ensure default class rewards are seeded for the new teacher
      await ensureDefaultClassRewards(newTeacherId);

      // A. Move pending school redemptions to class redemptions
      const schoolRedemptionsRes = await client.query(
        "SELECT * FROM ge10_reward_redemptions WHERE user_id = $1 AND status = 'pending'",
        [studentId]
      );

      for (const row of schoolRedemptionsRes.rows) {
        // Find matching class reward for this teacher
        const classRewardRes = await client.query(
          "SELECT id FROM ge10_class_rewards WHERE teacher_id = $1 AND LOWER(title) = LOWER($2)",
          [newTeacherId, row.reward_title]
        );

        let classRewardId: string;
        if (classRewardRes.rowCount && classRewardRes.rowCount > 0) {
          classRewardId = classRewardRes.rows[0].id;
        } else {
          // Auto-create a class reward for this teacher so the claim can reference it
          classRewardId = crypto.randomUUID();
          await client.query(
            `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [classRewardId, newTeacherId, row.reward_title, row.cost_ruby, 1, 0, Date.now()]
          );
        }

        // Insert into class reward redemptions
        await client.query(
          `INSERT INTO ge10_class_reward_redemptions (id, class_reward_id, student_id, reward_title, cost_ruby, status, requested_at)
           VALUES ($1, $2, $3, $4, $5, 'pending', $6)
           ON CONFLICT (id) DO NOTHING`,
          [row.id, classRewardId, studentId, row.reward_title, row.cost_ruby, row.timestamp]
        );

        // Delete from school redemptions
        await client.query(
          "DELETE FROM ge10_reward_redemptions WHERE id = $1",
          [row.id]
        );
      }

      // B. Transfer existing pending class redemptions to the new teacher
      const classRedemptionsRes = await client.query(
        "SELECT * FROM ge10_class_reward_redemptions WHERE student_id = $1 AND status = 'pending'",
        [studentId]
      );

      for (const row of classRedemptionsRes.rows) {
        // Find matching class reward for the new teacher
        const classRewardRes = await client.query(
          "SELECT id FROM ge10_class_rewards WHERE teacher_id = $1 AND LOWER(title) = LOWER($2)",
          [newTeacherId, row.reward_title]
        );

        let classRewardId: string;
        if (classRewardRes.rowCount && classRewardRes.rowCount > 0) {
          classRewardId = classRewardRes.rows[0].id;
        } else {
          // Auto-create a class reward for this teacher so the claim can reference it
          classRewardId = crypto.randomUUID();
          await client.query(
            `INSERT INTO ge10_class_rewards (id, teacher_id, title, cost_ruby, quantity, remaining, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [classRewardId, newTeacherId, row.reward_title, row.cost_ruby, 1, 0, Date.now()]
          );
        }

        // Update the class redemption to point to the new teacher's class reward
        await client.query(
          "UPDATE ge10_class_reward_redemptions SET class_reward_id = $1 WHERE id = $2",
          [classRewardId, row.id]
        );
      }

    } else {
      // --- CASE 3: LEAVING ALL CLASSES (BECOMING FREE STUDENT) ---
      // Ensure default school rewards are seeded for the student
      await ensureDefaultRewards(studentId);

      // Move all pending class redemptions back to school redemptions
      const classRedemptionsRes = await client.query(
        "SELECT * FROM ge10_class_reward_redemptions WHERE student_id = $1 AND status = 'pending'",
        [studentId]
      );

      for (const row of classRedemptionsRes.rows) {
        // Find matching school reward
        const schoolRewardRes = await client.query(
          "SELECT id FROM ge10_tutor_rewards WHERE user_id = $1 AND LOWER(title) = LOWER($2)",
          [studentId, row.reward_title]
        );

        let schoolRewardId: string;
        if (schoolRewardRes.rowCount && schoolRewardRes.rowCount > 0) {
          schoolRewardId = schoolRewardRes.rows[0].id;
        } else {
          // Auto-create a school reward for this student
          schoolRewardId = crypto.randomUUID();
          await client.query(
            `INSERT INTO ge10_tutor_rewards (id, user_id, title, cost_ruby, quantity, remaining_quantity, timestamp)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [schoolRewardId, studentId, row.reward_title, row.cost_ruby, 999999, 999999, Date.now()]
          );
        }

        // Insert into school redemptions
        await client.query(
          `INSERT INTO ge10_reward_redemptions (id, user_id, reward_id, reward_title, cost_ruby, status, timestamp)
           VALUES ($1, $2, $3, $4, $5, 'pending', $6)
           ON CONFLICT (id) DO NOTHING`,
          [row.id, studentId, schoolRewardId, row.reward_title, row.cost_ruby, row.requested_at]
        );

        // Delete from class redemptions
        await client.query(
          "DELETE FROM ge10_class_reward_redemptions WHERE id = $1",
          [row.id]
        );
      }
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('[migratePendingClaims] Error migrating claims:', e);
    throw e;
  } finally {
    client.release();
  }
};
