import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const jwtSecret = process.env.JWT_SECRET;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

if (!jwtSecret) {
  console.error('Missing JWT_SECRET');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

/**
 * Set password for user via activation token
 * 
 * POST /api/auth/set-password
 * 
 * Body:
 *   token: Activation token
 *   password: New password (min 8 characters)
 * 
 * Returns:
 *   success: boolean
 *   sessionToken: JWT for auto-login
 *   user: User details
 */
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
    const { token, password } = req.body;

    // Validate input
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters',
        message: 'Please choose a stronger password with at least 8 characters.'
      });
    }

    // Optional: Additional password strength validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return res.status(400).json({
        error: 'Password too weak',
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
      });
    }

    // Look up token with user details
    const { data: tokenRecord, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select(`
        id,
        user_id,
        token,
        status,
        expires_at,
        app_users (
          id,
          email,
          name,
          account_status
        )
      `)
      .eq('token', token)
      .single();

    if (tokenError || !tokenRecord) {
      console.error('[Set Password] Token not found');
      return res.status(404).json({
        error: 'Invalid token',
        message: 'This activation link is not valid.'
      });
    }

    // Verify token is still valid
    if (tokenRecord.status !== 'pending') {
      return res.status(400).json({
        error: 'Token not valid',
        message: 'This activation link has already been used or is no longer valid.'
      });
    }

    const now = new Date();
    const expiresAt = new Date(tokenRecord.expires_at);
    
    if (now > expiresAt) {
      // Mark as expired
      await supabase
        .from('password_reset_tokens')
        .update({ status: 'expired' })
        .eq('id', tokenRecord.id);

      return res.status(400).json({
        error: 'Token expired',
        message: 'This activation link has expired. Please contact your administrator.'
      });
    }

    const user = Array.isArray(tokenRecord.app_users) 
      ? tokenRecord.app_users[0] 
      : tokenRecord.app_users;

    if (user.account_status === 'active') {
      return res.status(400).json({
        error: 'User already activated',
        message: 'Your account is already activated. Please log in.'
      });
    }

    // Hash the password using bcrypt
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);

    // Update user record with hashed password and activate account
    const { error: updateError } = await supabase
      .from('app_users')
      .update({
        password_hash: passwordHash,
        password_status: 'active',
        account_status: 'active',
        activated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('[Set Password] Error updating user:', updateError);
      return res.status(500).json({
        error: 'Failed to set password',
        message: 'An error occurred while setting your password. Please try again.'
      });
    }

    // Mark token as used
    const { error: tokenUpdateError } = await supabase
      .from('password_reset_tokens')
      .update({
        status: 'used',
        used_at: new Date().toISOString()
      })
      .eq('id', tokenRecord.id);

    if (tokenUpdateError) {
      console.error('[Set Password] Error updating token:', tokenUpdateError);
      // Don't fail the request - password was set successfully
    }

    // Generate session token for auto-login
    let sessionToken = '';
    if (jwtSecret) {
      sessionToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
          role: 'user'
        },
        jwtSecret,
        { expiresIn: '7d' } // 7 day session
      );
    }

    console.log('[Set Password] Password set successfully:', {
      userId: user.id,
      email: user.email,
      activatedAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Password set successfully. You are now logged in.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        accountStatus: 'active'
      },
      sessionToken: sessionToken,
      redirectTo: '/dashboard'
    });

  } catch (error) {
    console.error('Error in set-password:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
