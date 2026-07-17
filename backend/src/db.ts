import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Mặc định giữ nguyên hành vi cũ (không xác thực CA chain) để không làm gãy kết nối DB
    // production một cách âm thầm — set DB_SSL_REJECT_UNAUTHORIZED=true sau khi đã kiểm chứng
    // kết nối vẫn thành công (Supabase Postgres thường dùng chứng chỉ hợp lệ với CA public,
    // nên bật xác thực thường an toàn, nhưng cần test trước khi bật ở production thật).
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
  },
  connectionTimeoutMillis: 5000, // 5 seconds connection timeout
  query_timeout: 5000 // 5 seconds query timeout
});
