import crypto from 'crypto';

/**
 * Hash a plain text PIN using PBKDF2 with a random salt.
 * Returns salt:hash format.
 */
export const hashPIN = (pin: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pin, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

/**
 * Verify a plain text PIN against a stored hash.
 */
export const verifyPIN = (pin: string, storedHash: string): boolean => {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const verifyHash = crypto.pbkdf2Sync(pin, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};
