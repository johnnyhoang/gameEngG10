import { createRemoteJWKSet, jwtVerify } from 'jose';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://czngbleeeiljsrpbaksg.supabase.co';
const JWKS = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`));

export const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${supabaseUrl}/auth/v1`,
      algorithms: ['ES256']
    });

    req.user = payload;
    next();
  } catch (error: any) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

export const activeProfileMiddleware = async (req: any, res: any, next: any) => {
  const accountId = req.user?.sub;
  const profileId = req.get('X-Profile-Id');
  if (!accountId) return res.status(401).json({ error: 'Unauthorized: missing account identity.' });
  if (!profileId) return res.status(400).json({ error: 'X-Profile-Id header is required.' });

  try {
    const { pool } = await import('../db.js');
    const result = await pool.query(
      `SELECT id, account_id, role, is_active
       FROM ge10_users
       WHERE id = $1 AND account_id = $2 AND is_active = TRUE`,
      [profileId, accountId]
    );
    if (result.rowCount === 0) {
      return res.status(403).json({ error: 'Active profile is invalid, inactive, or not owned by this account.' });
    }
    req.accountId = accountId;
    req.profile = result.rows[0];
    next();
  } catch (error) {
    console.error('Active Profile Resolution Error:', error);
    return res.status(500).json({ error: 'Failed to resolve active profile.' });
  }
};

export const requireProfileRoles = (...roles: string[]) => (req: any, res: any, next: any) => {
  if (!req.profile || !roles.includes(req.profile.role)) {
    return res.status(403).json({ error: 'Forbidden for the active profile.' });
  }
  next();
};
