import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

/**
 * Verify activation token is valid
 * 
 * POST /api/auth/verify-token
 * 
 * Body:
 *   token: The activation token to verify
 * 
 * Returns:
 *   valid: boolean
 *   user: User details if valid
 *   expiresAt: When token expires
 *   error: Error message if invalid
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
    const { token } = req.body;

    // Validate input
    if (!token) {
      return res.status(400).json({ 
        valid: false,
        error: 'Token is required' 
      });
    }

    // Look up token with user details
    const { data: tokenRecord, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select(`
        id,
        user_id,
        token,
        token_type,
        status,
        expires_at,
        created_at,
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
      console.log('[Token Verification] Token not found:', token.substring(0, 10) + '...');
      return res.status(404).json({
        valid: false,
        error: 'Invalid token',
        message: 'This activation link is not valid. Please contact your administrator.'
      });
    }

    // Check if token is already used
    if (tokenRecord.status === 'used') {
      console.log('[Token Verification] Token already used:', tokenRecord.id);
      return res.status(400).json({
        valid: false,
        error: 'Token already used',
        message: 'This activation link has already been used. Please log in with your password.'
      });
    }

    // Check if token is revoked
    if (tokenRecord.status === 'revoked') {
      console.log('[Token Verification] Token revoked:', tokenRecord.id);
      return res.status(400).json({
        valid: false,
        error: 'Token revoked',
        message: 'This activation link has been replaced by a newer one. Please check your email for the latest link.'
      });
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(tokenRecord.expires_at);
    
    if (now > expiresAt) {
      // Mark token as expired in database
      await supabase
        .from('password_reset_tokens')
        .update({ status: 'expired' })
        .eq('id', tokenRecord.id);

      console.log('[Token Verification] Token expired:', tokenRecord.id);
      return res.status(400).json({
        valid: false,
        error: 'Token expired',
        message: 'This activation link has expired. Please contact your administrator to request a new one.',
        expiredAt: expiresAt.toISOString()
      });
    }

    // Check if user is already activated
    const user = Array.isArray(tokenRecord.app_users) 
      ? tokenRecord.app_users[0] 
      : tokenRecord.app_users;

    if (user.account_status === 'active') {
      console.log('[Token Verification] User already activated:', user.id);
      return res.status(400).json({
        valid: false,
        error: 'User already activated',
        message: 'Your account is already activated. Please log in with your password.'
      });
    }

    // Token is valid!
    const secondsUntilExpiration = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
    const hoursUntilExpiration = Math.floor(secondsUntilExpiration / 3600);

    console.log('[Token Verification] Token valid:', {
      tokenId: tokenRecord.id,
      userId: user.id,
      email: user.email,
      hoursRemaining: hoursUntilExpiration
    });

    return res.status(200).json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        accountStatus: user.account_status
      },
      token: {
        id: tokenRecord.id,
        type: tokenRecord.token_type,
        createdAt: tokenRecord.created_at,
        expiresAt: tokenRecord.expires_at,
        secondsUntilExpiration,
        hoursUntilExpiration
      },
      message: 'Token is valid'
    });

  } catch (error) {
    console.error('Error in verify-token:', error);
    return res.status(500).json({ 
      valid: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
