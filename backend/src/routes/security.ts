import express from 'express';
import { pool } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import { hashPIN, verifyPIN } from '../utils/security.js';
import { logAuditEvent } from '../helpers/permissions.js';

const router = express.Router();

// POST /api/security/pin: Sets or updates a personal profile PIN code
router.post('/security/pin', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, pin } = req.body;

  if (!profileId || !pin) {
    return res.status(400).json({ error: 'Missing profileId or pin.' });
  }

  // Validate pin format (4-6 digits)
  if (!/^\d{4,6}$/.test(pin)) {
    return res.status(400).json({ error: 'PIN must be between 4 to 6 numeric digits.' });
  }

  try {
    // Verify ownership
    const check = await pool.query('SELECT role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized.' });
    
    const hashed = hashPIN(pin);
    await pool.query(
      `INSERT INTO ge10_users_security (user_id, pin_hash, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (user_id) DO UPDATE SET pin_hash = $2, updated_at = NOW()`,
      [profileId, hashed]
    );

    await logAuditEvent(profileId, 'update_pin', null, { message: 'Thay đổi mã PIN bảo mật cá nhân' });

    res.json({ success: true, message: 'PIN updated successfully.' });
  } catch (error) {
    console.error('Error updating PIN:', error);
    res.status(500).json({ error: 'Failed to update PIN.' });
  }
});

// POST /api/security/verify-pin: Verifies a personal profile PIN code
router.post('/security/verify-pin', authMiddleware, async (req: any, res) => {
  const accountId = req.user.sub;
  const { profileId, pin } = req.body;

  if (!profileId || !pin) {
    return res.status(400).json({ error: 'Missing profileId or pin.' });
  }

  try {
    // Verify ownership
    const check = await pool.query('SELECT role FROM ge10_users WHERE id = $1 AND account_id = $2', [profileId, accountId]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'Unauthorized.' });

    const pinRes = await pool.query('SELECT pin_hash FROM ge10_users_security WHERE user_id = $1', [profileId]);
    let storedHash = '';
    
    if (pinRes.rowCount === 0) {
      // Fallback default '1234'
      storedHash = hashPIN('1234');
    } else {
      storedHash = pinRes.rows[0].pin_hash;
    }

    const matches = verifyPIN(pin, storedHash);
    if (!matches) {
      return res.status(400).json({ error: 'Mã PIN bảo mật không chính xác!' });
    }

    res.json({ success: true, message: 'PIN verified successfully.' });
  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({ error: 'Failed to verify PIN.' });
  }
});

export default router;
