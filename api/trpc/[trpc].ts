import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { verifyPassword, generateToken } from '../../server/auth.js';
import { verifyRecaptcha, isRecaptchaRequired } from '../../server/_core/captcha.js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// In-memory store for failed login attempts (in production, use Redis)
const failedAttempts: Record<string, { count: number; lastAttempt: number }> = {};
const ATTEMPT_RESET_TIME = 15 * 60 * 1000; // 15 minutes

/**
 * Get failed attempt count for an IP
 */
function getFailedAttempts(ip: string): number {
  const record = failedAttempts[ip];
  if (!record) return 0;

  // Reset if time window has passed
  if (Date.now() - record.lastAttempt > ATTEMPT_RESET_TIME) {
    delete failedAttempts[ip];
    return 0;
  }

  return record.count;
}

/**
 * Increment failed attempt count
 */
function recordFailedAttempt(ip: string): void {
  if (!failedAttempts[ip]) {
    failedAttempts[ip] = { count: 0, lastAttempt: Date.now() };
  }
  failedAttempts[ip].count++;
  failedAttempts[ip].lastAttempt = Date.now();
}

/**
 * Clear failed attempts for an IP
 */
function clearFailedAttempts(ip: string): void {
  delete failedAttempts[ip];
}

/**
 * Extract IP address from request
 */
function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

/**
 * Handle authentication requests
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, recaptchaToken } = req.body;
    const clientIp = getClientIp(req);
    const failedCount = getFailedAttempts(clientIp);

    // Check if reCAPTCHA is required
    if (isRecaptchaRequired(failedCount)) {
      if (!recaptchaToken) {
        return res.status(403).json({
          error: 'reCAPTCHA verification required',
          requiresRecaptcha: true,
        });
      }

      // Verify reCAPTCHA token
      const captchaResult = await verifyRecaptcha(recaptchaToken);
      if (!captchaResult.success) {
        return res.status(403).json({
          error: 'reCAPTCHA verification failed',
          requiresRecaptcha: true,
        });
      }
    }

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
      recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Clear failed attempts on successful login
    clearFailedAttempts(clientIp);

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.name, user.role);

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
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
