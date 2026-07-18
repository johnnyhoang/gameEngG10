import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routers
import profilesRouter from './routes/profiles.js';
import questionsRouter from './routes/questions.js';
import classLinksRouter from './routes/classLinks.js';
import aiRouter from './routes/ai.js';
import adminRouter from './routes/admin.js';
import economyRouter from './routes/economy.js';
import riddleRouter from './routes/riddle.js';
import gameRouter from './routes/game.js';
import classRewardsRouter from './routes/classRewards.js';
import learningContextRouter from './routes/learningContext.js';
import missionLedgerRouter from './routes/missionLedger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Danh sách domain frontend được phép gọi API, phân tách bằng dấu phẩy (CORS_ALLOWED_ORIGINS
// trong .env, ví dụ "https://game10.vercel.app,http://localhost:5173"). Chưa cấu hình thì giữ
// nguyên hành vi cũ (mở cho mọi origin) để không làm gãy deployment hiện tại — nên đặt biến
// này trong production càng sớm càng tốt để thu hẹp phạm vi CORS.
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*'
}));
app.use(express.json());

// Schema/migration application (schema.sql + backend/migrations/*.sql + seed data) sống ở
// migrationRunner.ts, chạy thủ công qua `npm run migrate --workspace=gameengg10-backend` —
// KHÔNG được gọi từ request-serving process này. Chuỗi migration cũ (initDB()) từng chạy lại
// mỗi lần server khởi động, kể cả mỗi cold start serverless trên Vercel, và là một phần
// nguyên nhân gây cạn kiệt connection pool/deadlock (xem HANDOFF.md 2026-07-17).

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Register routes
app.use('/api', profilesRouter);
app.use('/api', questionsRouter);
app.use('/api', classLinksRouter);
app.use('/api', aiRouter);
app.use('/api', adminRouter);
app.use('/api', economyRouter);
app.use('/api', riddleRouter);
app.use('/api', gameRouter);
app.use('/api', classRewardsRouter);
app.use('/api/learning-content', learningContextRouter);
app.use('/api', (req, res, next) => {
  if (req.url.startsWith('/mission-ledger') || req.url.startsWith('/mission-events')) {
    console.log(`[Debug] Routing mission ledger request: ${req.method} ${req.url}`);
  }
  next();
}, missionLedgerRouter);

// Error Handler Middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(`[${new Date().toISOString()}] Server Error:`, err);
  const isProduction = process.env.NODE_ENV === 'production';
  res.status(500).json({
    error: 'Internal Server Error',
    details: isProduction ? undefined : err.message,
    message: isProduction ? 'Đã xảy ra sự cố hệ thống. Vui lòng liên hệ quản trị viên hoặc thử lại sau.' : undefined
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`CyberEnglish API Server booting on port ${PORT}...`);
  });
}

export default app;
// Trigger reload: 2026-07-14 11:21
