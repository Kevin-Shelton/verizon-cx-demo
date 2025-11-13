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

// Supabase-based persistent failed attempt tracking
const ATTEMPT_RESET_TIME = 15 * 60 * 1000; // 15 minutes

async function getFailedAttempts(ip: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('login_attempts')
      .select('count, last_attempt')
      .eq('ip_address', ip)
      .single();

    if (error || !data) return 0;

    const lastAttempt = new Date(data.last_attempt).getTime();
    if (Date.now() - lastAttempt > ATTEMPT_RESET_TIME) {
      await supabase.from('login_attempts').delete().eq('ip_address', ip);
      return 0;
    }

    return data.count || 0;
  } catch (error) {
    console.error('[LOGIN] Error getting failed attempts:', error);
    return 0;
  }
}

async function recordFailedAttempt(ip: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('login_attempts')
      .select('count')
      .eq('ip_address', ip)
      .single();

    if (existing) {
      await supabase
        .from('login_attempts')
        .update({
          count: (existing.count || 0) + 1,
          last_attempt: new Date().toISOString(),
        })
        .eq('ip_address', ip);
    } else {
      await supabase.from('login_attempts').insert({
        ip_address: ip,
        count: 1,
        last_attempt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('[LOGIN] Error recording failed attempt:', error);
  }
}

async function clearFailedAttempts(ip: string): Promise<void> {
  try {
    await supabase.from('login_attempts').delete().eq('ip_address', ip);
  } catch (error) {
    console.error('[LOGIN] Error clearing failed attempts:', error);
  }
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
    const { email, password, recaptchaToken } = req.body;
    const clientIp = getClientIp(req);
    const failedCount = await getFailedAttempts(clientIp);

    console.log('[LOGIN] Received login request for:', email);
    console.log('[LOGIN] Failed attempts for IP:', failedCount);

    // Check if reCAPTCHA is required (after 3 failed attempts)
    if (failedCount >= 3) {
      console.log('[LOGIN] reCAPTCHA required (failed attempts:', failedCount + ')');
      
      if (!recaptchaToken) {
        console.log('[LOGIN] reCAPTCHA token missing');
        return res.status(403).json({
          error: 'reCAPTCHA verification required',
          requiresRecaptcha: true,
        });
      }

      // Verify reCAPTCHA token
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      if (!secretKey) {
        console.warn('[LOGIN] RECAPTCHA_SECRET_KEY not configured');
        // Continue without verification if not configured
      } else {
        try {
          const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
          const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(recaptchaToken)}`,
          });
          
          const verifyData = await verifyResponse.json();
          console.log('[LOGIN] reCAPTCHA verification result:', verifyData);
          
          if (!verifyData.success || (verifyData.score && verifyData.score < 0.5)) {
            console.log('[LOGIN] reCAPTCHA verification failed');
            await recordFailedAttempt(clientIp);
            return res.status(403).json({
              error: 'reCAPTCHA verification failed',
              requiresRecaptcha: true,
            });
          }
          
          console.log('[LOGIN] reCAPTCHA verification passed');
        } catch (captchaError) {
          console.error('[LOGIN] reCAPTCHA verification error:', captchaError);
          // Continue without verification on error
        }
      }
    }

    // Validate input
    if (!email || !password) {
      await recordFailedAttempt(clientIp);
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
      await recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      console.log('[LOGIN] Password mismatch for:', email);
      await recordFailedAttempt(clientIp);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Clear failed attempts on successful login
    await clearFailedAttempts(clientIp);

    // Generate JWT token
    const token = generateToken(user.id, user.email, user.name, user.role);

    console.log('[LOGIN] Authentication successful for:', email);

    // Set session cookie for subsequent requests
    try {
      // Import SDK and db dynamically to avoid circular dependencies
      const { sdk } = await import('../../server/_core/sdk.js');
      const { upsertUser } = await import('../../server/db.js');
      
      // Ensure name is non-empty (required by session validation)
      const userName = user.name || user.email.split('@')[0] || 'User';
      
      // Add user to the users table so SDK can find them
      await upsertUser({
        id: user.id,
        name: userName,
        email: user.email,
        loginMethod: 'email',
        lastSignedIn: new Date(),
      });
      console.log('[LOGIN] User added to users table:', user.id);
      
      const sessionToken = await sdk.createSessionToken(user.id, { name: userName, email: user.email } as any);
      
      // Set cookie with appropriate options
      const isSecure = req.headers['x-forwarded-proto'] === 'https';
      res.setHeader('Set-Cookie', [
        `app_session_id=${sessionToken}; Path=/; HttpOnly; SameSite=${isSecure ? 'None' : 'Lax'}${isSecure ? '; Secure' : ''}; Max-Age=31536000`
      ]);
      console.log('[LOGIN] Session cookie set for user:', user.id);
    } catch (cookieError) {
      console.error('[LOGIN] Error setting session cookie:', cookieError);
      // Continue anyway - user can still use the token
    }

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

