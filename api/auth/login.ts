import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// In-memory store for failed login attempts
const failedAttempts: Record<string, { count: number; lastAttempt: number }> = {};
const ATTEMPT_RESET_TIME = 15 * 60 * 1000; // 15 minutes

function getFailedAttempts(ip: string): number {
  const record = failedAttempts[ip];
  if (!record) return 0;
  if (Date.now() - record.lastAttempt > ATTEMPT_RESET_TIME) {
    delete failedAttempts[ip];
    return 0;
  }
  return record.count;
}

function recordFailedAttempt(ip: string): void {
  if (!failedAttempts[ip]) {
    failedAttempts[ip] = { count: 0, lastAttempt: Date.now() };
  }
  failedAttempts[ip].count++;
  failedAttempts[ip].lastAttempt = Date.now();
}

function clearFailedAttempts(ip: string): void {
  delete failedAttempts[ip];
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// Inline auth functions
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function generateToken(
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const clientIp = getClientIp(req);

    console.log('[LOGIN] Received login request for:', email);

    // Validate input
    if (!email || !password) {
      recordFailedAttempt(clientIp);
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Query Supabase for user
    const { data: users, error: queryError } = await supabase
      .from('app_users')
      .select('id, email, password_hash, name, role')
      .eq('email', email)
      .limit(1);

    if (queryError || !users || users.length === 0) {
      console.log('[LOGIN] User not found:', email);
      recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      console.log('[LOGIN] Password mismatch for:', email);
      recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Clear failed attempts on successful login
    clearFailedAttempts(clientIp);

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.name, user.role);

    console.log('[LOGIN] Authentication successful for:', email);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[LOGIN] Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

