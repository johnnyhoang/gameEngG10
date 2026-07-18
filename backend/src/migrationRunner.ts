import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import { SEED_LESSONS } from './lessonsData.js';
import { ensureDefaultClassRewards } from './helpers/questions.js';
import { seedTopicsAndActivities } from './helpers/seedTopicsAndActivities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

// Thứ tự áp dụng — một số migration phụ thuộc bảng/cột do migration trước đó tạo ra.
const MIGRATION_FILES = [
  '20260713_ruby_currency.sql',
  '20260713_learning_context.sql',
  '20260713_canonical_content_payload.sql',
  '20260713_seed_canonical_learning_content.sql',
  '20260713_harden_ge10_data_api.sql',
  '20260713_isolate_profile_identity.sql',
  '20260713_remove_profile_pin.sql',
  '20260713_normalize_legacy_pet_name.sql',
  '20260713_generalize_riddle_history.sql',
  '20260713_mission_ledger.sql',
  '20260714_rename_family_to_class.sql',
  '20260716_rename_parent_to_tutor.sql',
  '20260717_school_reward_templates.sql',
  '20260717_seed_game_settings_and_challenges.sql',
  '20260717_prevent_duplicate_profiles.sql',
  '20260717_auto_connect_admins.sql',
  '20260717_dynamic_data_migration.sql',
  '20260718_upgrade_topics_metadata.sql',
];

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function applyMigrationFile(filename: string) {
  const already = await pool.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [filename]);
  if ((already.rowCount ?? 0) > 0) {
    console.log(`[migrate] skip (already applied): ${filename}`);
    return;
  }
  const filePath = path.join(MIGRATIONS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required migration file: ${filePath}`);
  }
  const sql = fs.readFileSync(filePath, 'utf8');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
    await client.query('COMMIT');
    console.log(`[migrate] applied: ${filename}`);
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(`Migration failed (${filename}): ${(err as Error).message}`);
  } finally {
    client.release();
  }
}

/**
 * Áp dụng schema.sql + toàn bộ migration đã đánh version (ghi lại migration nào đã chạy vào
 * bảng `schema_migrations`, để biết chắc DB production đang ở trạng thái nào), rồi seed dữ
 * liệu nền (lessons/questions/topics/activities/class rewards mặc định).
 *
 * CHỦ Ý không được gọi từ `server.ts` / import bởi request-serving process: bản `initDB()` cũ
 * chạy lại toàn bộ chuỗi này mỗi lần server khởi động — kể cả mỗi cold start serverless trên
 * Vercel — và là một phần nguyên nhân gây cạn kiệt connection pool/deadlock (xem HANDOFF.md
 * 2026-07-17, mục sửa lỗi treo missionLedger). Chạy runner này thủ công qua
 * `npm run migrate --workspace=gameengg10-backend` sau khi deploy schema mới, không phải mỗi
 * lần process khởi động.
 */
export async function runMigrations(): Promise<void> {
  // schema.sql chỉ dùng CREATE TABLE IF NOT EXISTS nên an toàn khi áp lại nhiều lần — không
  // track trong schema_migrations, để bảng mới thêm vào schema.sql sau này luôn được tạo.
  let schemaPath = path.join(__dirname, 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    schemaPath = path.join(__dirname, '..', 'src', 'schema.sql');
  }
  await pool.query(fs.readFileSync(schemaPath, 'utf8'));
  console.log('[migrate] schema.sql applied');

  await ensureMigrationsTable();
  for (const filename of MIGRATION_FILES) {
    await applyMigrationFile(filename);
  }

  // Các ALTER TABLE lẻ này chưa được gộp vào file migration riêng — giữ nguyên hành vi cũ
  // (IF NOT EXISTS nên an toàn khi lặp lại) thay vì tách migration mới trong lúc chỉ đang
  // khôi phục cơ chế chạy migration.
  await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS subject VARCHAR(50) DEFAULT 'english';`);
  await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS image_url TEXT;`);
  await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;`);
  await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS is_confused BOOLEAN DEFAULT FALSE;`);
  await pool.query(`ALTER TABLE ge10_custom_questions ADD COLUMN IF NOT EXISTS topic_id VARCHAR(100);`);
  await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMP DEFAULT NOW();`);
  await pool.query(`ALTER TABLE ge10_player_profiles ADD COLUMN IF NOT EXISTS ui_theme VARCHAR(50) DEFAULT 'current';`);
  await pool.query(`ALTER TABLE ge10_lessons ADD COLUMN IF NOT EXISTS is_standard BOOLEAN DEFAULT FALSE;`);
  await pool.query(`ALTER TABLE ge10_lessons ALTER COLUMN grade_tier SET DEFAULT 9;`);
  await pool.query(`ALTER TABLE ge10_topics ALTER COLUMN grade_tier SET DEFAULT 9;`);
  await pool.query(`ALTER TABLE ge10_activities ALTER COLUMN grade_tier SET DEFAULT 9;`);

  // Seed lessons
  for (const lesson of SEED_LESSONS) {
    await pool.query(
      `INSERT INTO ge10_lessons (id, subject, topic, title, theory, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [lesson.id, lesson.subject, lesson.topic, lesson.title, lesson.theory, lesson.category]
    );
  }

  // Seed ngân hàng câu hỏi gốc (trước đây hardcode trong src/data/questions.ts phía frontend,
  // mỗi client tự trộn vào bộ nhớ) — nay là dữ liệu hệ thống thật trong DB (user_id = NULL),
  // trả về cho MỌI hồ sơ qua GET /api/profile/:id (WHERE user_id IS NULL đã có sẵn).
  const seedQuestionsPath = path.join(__dirname, 'questionsData.json');
  if (!fs.existsSync(seedQuestionsPath)) {
    throw new Error(`Missing required base question bank seed: ${seedQuestionsPath}`);
  }
  const seedQuestions: any[] = JSON.parse(fs.readFileSync(seedQuestionsPath, 'utf8'));
  const QUESTION_BATCH_SIZE = 500;
  for (let i = 0; i < seedQuestions.length; i += QUESTION_BATCH_SIZE) {
    const batch = seedQuestions.slice(i, i + QUESTION_BATCH_SIZE);
    const values: any[] = [];
    const placeholders: string[] = [];
    batch.forEach((q, idx) => {
      const o = idx * 13;
      placeholders.push(`($${o + 1}, $${o + 2}, $${o + 3}, $${o + 4}, $${o + 5}, $${o + 6}, $${o + 7}, $${o + 8}, $${o + 9}, $${o + 10}, $${o + 11}, $${o + 12}, $${o + 13})`);
      values.push(
        q.id, q.type, q.category, q.topicId, q.prompt, q.options, q.correctAnswer,
        q.explanation, q.difficulty, q.source, q.subject, q.gradeTier,
        q.metadata ? JSON.stringify(q.metadata) : null
      );
    });
    await pool.query(
      `INSERT INTO ge10_custom_questions
         (id, type, category, topic_id, prompt, options, correct_answer, explanation, difficulty, source, subject, grade_tier, metadata)
       VALUES ${placeholders.join(', ')}
       ON CONFLICT (id) DO NOTHING`,
      values
    );
  }

  // Auto-link existing questions to their lessons by category.
  await pool.query(
    `UPDATE ge10_custom_questions
     SET lesson_id = (SELECT id FROM ge10_lessons
       WHERE ge10_lessons.category = ge10_custom_questions.category
         AND ge10_lessons.grade_tier = ge10_custom_questions.grade_tier
         AND ge10_lessons.subject = ge10_custom_questions.subject
       LIMIT 1)
     WHERE lesson_id IS NULL`
  );

  // Seed data-driven Topics and Activities
  await seedTopicsAndActivities(pool);

  console.log('[migrate] lessons/questions/topics/activities seeded');

  console.log('[migrate] seeding default classroom rewards for existing teachers...');
  const teachersRes = await pool.query(
    `SELECT DISTINCT tutor_id FROM ge10_class_links
     WHERE status = 'active'
       AND tutor_id IN (SELECT id FROM ge10_users WHERE role IN ('tutor', 'secondary_tutor', 'truong_vien', 'pho_vien'))`
  );
  for (const row of teachersRes.rows) {
    await ensureDefaultClassRewards(row.tutor_id);
  }
  console.log(`[migrate] default classroom rewards ensured for ${teachersRes.rows.length} teacher(s)`);

  console.log('[migrate] done.');
}
