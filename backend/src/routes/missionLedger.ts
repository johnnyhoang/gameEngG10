import crypto from 'node:crypto';
import express from 'express';
import { pool } from '../db.js';
import { activeProfileMiddleware, authMiddleware } from '../middleware/auth.js';
import { applyLevelUps } from '../helpers/leveling.js';

const router = express.Router();
router.use(authMiddleware, activeProfileMiddleware);

const ALLOWED_EVENT_TYPES = new Set([
  'teacher_link_activated', 'pet_fed', 'pet_tickled', 'riddle_completed',
  'encounter_sprint_completed', 'lesson_completed', 'question_answered',
  'feature_opened', 'boss_completed', 'shop_item_redeemed', 'hint_used', 'level_reached',
]);

const todayPeriod = () => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());

const conditionMatches = (condition: Record<string, unknown>, metadata: Record<string, unknown>) =>
  Object.entries(condition).every(([key, expected]) => metadata[key] === expected);

async function ensureAssignments(client: any, profileId: string, gradeTier?: number) {
  const period = todayPeriod();
  await client.query(
    `INSERT INTO ge10_profile_mission_assignments
       (profile_id, mission_key, definition_version, period_key, target)
     SELECT $1, mission_key, version,
       CASE WHEN category = 'daily' THEN $2 ELSE 'lifetime' END,
       target
     FROM ge10_mission_definitions
     WHERE is_active = TRUE AND (grade_scope IS NULL OR grade_scope = $3)
     ON CONFLICT (profile_id, mission_key, period_key) DO NOTHING`,
    [profileId, period, gradeTier ?? null]
  );
  await client.query(
    `UPDATE ge10_profile_mission_assignments
     SET status = 'expired', updated_at = NOW()
     WHERE profile_id = $1 AND period_key <> 'lifetime' AND period_key <> $2 AND status = 'active'`,
    [profileId, period]
  );
}

async function readLedger(client: any, profileId: string) {
  const result = await client.query(
    `SELECT a.id, a.mission_key AS "missionKey", d.category, d.title, d.description,
            a.target, a.current, a.status, a.period_key AS "periodKey",
            a.completed_at AS "completedAt", d.reward_json AS reward,
            d.display_order AS "displayOrder"
     FROM ge10_profile_mission_assignments a
     JOIN ge10_mission_definitions d ON d.mission_key = a.mission_key
     WHERE a.profile_id = $1 AND a.period_key IN ('lifetime', $2)
       AND d.is_active = TRUE AND a.status <> 'expired'
     ORDER BY d.category, d.display_order`,
    [profileId, todayPeriod()]
  );
  return result.rows;
}

async function grantMissionReward(client: any, profileId: string, rewardType: string, amount: number) {
  if (rewardType === 'ruby') {
    await client.query(
      'UPDATE ge10_player_profiles SET ruby = ruby + $2, server_updated_at = NOW() WHERE user_id = $1',
      [profileId, amount]
    );
    return;
  }
  const profile = await client.query(
    'SELECT level, xp FROM ge10_player_profiles WHERE user_id = $1 FOR UPDATE', [profileId]
  );
  if (!profile.rowCount) return;
  const { level, xp } = applyLevelUps(
    (profile.rows[0].xp || 0) + amount,
    profile.rows[0].level || 1
  );
  await client.query(
    'UPDATE ge10_player_profiles SET level = $2, xp = $3, server_updated_at = NOW() WHERE user_id = $1',
    [profileId, level, xp]
  );
}

router.get('/mission-ledger', async (req: any, res) => {
  const profileId = String(req.query.profileId || '');
  const gradeTier = Number(req.query.gradeTier || 0) || undefined;
  if (!profileId) return res.status(400).json({ error: 'profileId is required' });
  if (req.profile.id !== profileId) return res.status(403).json({ error: 'Forbidden' });
  const client = await pool.connect();
  try {
    await ensureAssignments(client, profileId, gradeTier);
    const missions = await readLedger(client, profileId);
    const progress = await client.query(
      `SELECT level, xp, streak FROM ge10_player_profiles WHERE user_id = $1`, [profileId]
    );
    return res.json({ missions, progress: progress.rows[0] ?? { level: 1, xp: 0, streak: 0 } });
  } catch (error) {
    console.error('Error reading mission ledger:', error);
    return res.status(500).json({ error: 'Failed to read mission ledger' });
  } finally {
    client.release();
  }
});

router.post('/mission-events', async (req: any, res) => {
  const { profileId, idempotencyKey, eventType, gradeTier, subjectId, entityType, entityId, value = 1, metadata = {} } = req.body ?? {};
  if (
    !profileId || typeof idempotencyKey !== 'string' || idempotencyKey.length > 255
    || typeof eventType !== 'string' || !ALLOWED_EVENT_TYPES.has(eventType)
    || !Number.isInteger(value) || value < 1 || value > 100
    || (metadata !== null && (typeof metadata !== 'object' || Array.isArray(metadata)))
  ) {
    return res.status(400).json({ error: 'Invalid mission event' });
  }
  if (req.profile.id !== profileId) return res.status(403).json({ error: 'Forbidden' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await ensureAssignments(client, profileId, gradeTier);
    const inserted = await client.query(
      `INSERT INTO ge10_learning_events
        (event_id, idempotency_key, profile_id, event_type, grade_tier, subject_id, entity_type, entity_id, value, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (profile_id, idempotency_key) DO NOTHING RETURNING event_id`,
      [crypto.randomUUID(), idempotencyKey, profileId, eventType, gradeTier ?? null, subjectId ?? null, entityType ?? null, entityId ?? null, value, JSON.stringify(metadata)]
    );
    if (inserted.rowCount) {
      // Lock the player profile first to establish a consistent lock hierarchy (Profile -> Assignments) and prevent deadlocks.
      await client.query(
        'SELECT 1 FROM ge10_player_profiles WHERE user_id = $1 FOR UPDATE',
        [profileId]
      );

      const candidates = await client.query(
        `SELECT a.id, a.current, a.target, d.condition_json, d.subject_scope, d.reward_json
         FROM ge10_profile_mission_assignments a
         JOIN ge10_mission_definitions d ON d.mission_key = a.mission_key
         WHERE a.profile_id = $1 AND a.status = 'active' AND d.event_type = $2
           AND a.period_key IN ('lifetime', $3)
         FOR UPDATE OF a`,
        [profileId, eventType, todayPeriod()]
      );
      for (const mission of candidates.rows) {
        if (mission.subject_scope && mission.subject_scope !== subjectId) continue;
        if (!conditionMatches(mission.condition_json ?? {}, metadata)) continue;
        const next = Math.min(mission.target, mission.current + value);
        const completed = next >= mission.target;
        await client.query(
          `UPDATE ge10_profile_mission_assignments
           SET current = $2, status = CASE WHEN $3 THEN 'completed' ELSE status END,
               completed_at = CASE WHEN $3 THEN COALESCE(completed_at, NOW()) ELSE completed_at END,
               updated_at = NOW()
           WHERE id = $1`, [mission.id, next, completed]
        );
        if (completed) {
          for (const [rewardType, amount] of Object.entries(mission.reward_json ?? {})) {
            if (!['xp', 'ruby'].includes(rewardType) || !Number.isInteger(amount) || Number(amount) <= 0) continue;
            const reward = await client.query(
              `INSERT INTO ge10_mission_reward_ledger (assignment_id, profile_id, reward_type, amount)
               VALUES ($1,$2,$3,$4) ON CONFLICT (assignment_id, reward_type) DO NOTHING RETURNING id`,
              [mission.id, profileId, rewardType, amount]
            );
            if (reward.rowCount) {
              await grantMissionReward(client, profileId, rewardType, Number(amount));
            }
          }
        }
      }
    }
    const missions = await readLedger(client, profileId);
    const progress = await client.query(
      `SELECT level, xp, streak, ruby FROM ge10_player_profiles WHERE user_id = $1`, [profileId]
    );
    await client.query('COMMIT');
    return res.json({ accepted: Boolean(inserted.rowCount), missions, progress: progress.rows[0] ?? null });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error recording mission event:', error);
    return res.status(500).json({ error: 'Failed to record mission event' });
  } finally {
    client.release();
  }
});

export default router;
