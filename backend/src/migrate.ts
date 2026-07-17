// CLI entrypoint để chạy migration thủ công: `npm run migrate --workspace=gameengg10-backend`.
// Không import/gọi từ server.ts — xem lý do trong migrationRunner.ts.
import { runMigrations } from './migrationRunner.js';

runMigrations()
  .then(() => {
    console.log('[migrate] Migration run completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[migrate] Migration run failed:', err);
    process.exit(1);
  });
