import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Bcrypt hash
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a bcrypt hash
 * @param password - Plain text password to verify
 * @param hash - Bcrypt hash to compare against
 * @returns True if password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for a user
 * @param userId - User ID to encode in token
 * @param email - User email
 * @param name - User name
 * @param role - User role (admin or user)
 * @returns JWT token
 */
export function generateToken(
  userId: string,
  email: string,
  name: string | null,
  role: string
): string {
  const secret = process.env.AUTH_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('AUTH_TOKEN_SECRET or JWT_SECRET environment variable not set');
  }

  return jwt.sign(
    {
      userId,
      email,
      name,
      role,
      iat: Math.floor(Date.now() / 1000),
    },
    secret,
    {
      expiresIn: '24h',
      algorithm: 'HS256',
    }
  );
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(token: string): Record<string, any> | null {
  const secret = process.env.AUTH_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('AUTH_TOKEN_SECRET or JWT_SECRET environment variable not set');
  }

  try {
    return jwt.verify(token, secret) as Record<string, any>;
  } catch (error) {
    return null;
  }
}
