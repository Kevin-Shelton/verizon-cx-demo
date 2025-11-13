import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

/**
 * Generate activation token for new user
 * 
 * POST /api/auth/create-activation-token
 * 
 * Body:
 *   userId: UUID of the user
 *   email: User's email address
 *   createdBy: Email of admin creating the token (optional)
 * 
 * Returns:
 *   token: Secure random token string
 *   expiresAt: ISO timestamp when token expires
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, email, createdBy } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }

    // Verify user exists
    const { data: user, error: userError } = await supabase
      .from('app_users')
      .select('id, email, account_status')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('User not found:', userError);
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is already activated
    if (user.account_status === 'active') {
      return res.status(400).json({ 
        error: 'User already activated',
        message: 'This user has already set their password and activated their account.'
      });
    }

    // Generate cryptographically secure random token
    const token = crypto.randomBytes(32).toString('hex'); // 64 character hex string

    // Set expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Get request metadata for audit trail
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                      (req.headers['x-real-ip'] as string) || 
                      'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Insert token into database
    // The trigger will automatically revoke any previous pending tokens
    const { data: tokenRecord, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .insert([
        {
          user_id: userId,
          token: token,
          token_type: 'activation',
          status: 'pending',
          expires_at: expiresAt.toISOString(),
          created_by: createdBy || 'system',
          ip_address: ipAddress,
          user_agent: userAgent,
          metadata: {
            email: email,
            created_at: new Date().toISOString()
          }
        }
      ])
      .select()
      .single();

    if (tokenError) {
      console.error('Error creating token:', tokenError);
      return res.status(500).json({ 
        error: 'Failed to create activation token',
        details: tokenError.message 
      });
    }

    console.log('[Activation Token] Created for user:', {
      userId,
      email,
      tokenId: tokenRecord.id,
      expiresAt: expiresAt.toISOString()
    });

    return res.status(201).json({
      success: true,
      token: token,
      tokenId: tokenRecord.id,
      expiresAt: expiresAt.toISOString(),
      expiresInHours: 24,
      message: 'Activation token created successfully'
    });

  } catch (error) {
    console.error('Error in create-activation-token:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
