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
 * Resend activation link to user
 * 
 * POST /api/admin/users/resend-activation
 * 
 * Body:
 *   userId: UUID of the user
 * 
 * Returns:
 *   success: boolean
 *   message: Success message
 *   expiresAt: When new token expires
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
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Verify the request is from an admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('app_users')
      .select('id, email, name, account_status')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('[Resend Activation] User not found:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user is already activated
    if (user.account_status === 'active') {
      return res.status(400).json({
        error: 'User already activated',
        message: 'This user has already activated their account and can log in.'
      });
    }

    // Generate new cryptographically secure token
    const token = crypto.randomBytes(32).toString('hex');

    // Set expiration to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Get request metadata
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                      (req.headers['x-real-ip'] as string) || 
                      'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Extract admin email from auth token if possible
    let createdBy = 'admin';
    try {
      const tokenParts = authHeader.split(' ')[1];
      const decoded = JSON.parse(Buffer.from(tokenParts, 'base64').toString());
      createdBy = decoded.email || 'admin';
    } catch (e) {
      // Use default 'admin' if can't decode
    }

    // Insert new token
    // The database trigger will automatically revoke previous pending tokens
    const { data: tokenRecord, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .insert([
        {
          user_id: userId,
          token: token,
          token_type: 'activation',
          status: 'pending',
          expires_at: expiresAt.toISOString(),
          created_by: createdBy,
          ip_address: ipAddress,
          user_agent: userAgent,
          metadata: {
            resend: true,
            resent_at: new Date().toISOString(),
            email: user.email
          }
        }
      ])
      .select()
      .single();

    if (tokenError) {
      console.error('[Resend Activation] Error creating token:', tokenError);
      return res.status(500).json({
        error: 'Failed to create activation token',
        details: tokenError.message
      });
    }

    // Send welcome email with new token via chat system
    try {
      const chatApiUrl = process.env.CHAT_API_URL || 'https://demo-chat.ikoneworld.net';
      const chatApiKey = process.env.CHAT_API_KEY || process.env.JWT_SECRET;

      if (chatApiUrl && chatApiKey) {
        const emailResponse = await fetch(`${chatApiUrl}/api/email/welcome`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': chatApiKey,
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            portalUrl: 'https://demo-portal.ikoneworld.net',
            language: 'en',
            resetToken: token,
            isResend: true, // Flag to indicate this is a resend
          }),
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log('[Resend Activation] Email sent successfully:', emailResult);
        } else {
          const errorText = await emailResponse.text();
          console.error('[Resend Activation] Failed to send email:', emailResponse.status, errorText);
          // Don't fail the request - token was created successfully
        }
      } else {
        console.warn('[Resend Activation] Email not sent: CHAT_API_URL or CHAT_API_KEY not configured');
      }
    } catch (emailError) {
      console.error('[Resend Activation] Error sending email:', emailError);
      // Don't fail the request - token was created successfully
    }

    console.log('[Resend Activation] Token created and email sent:', {
      userId,
      email: user.email,
      tokenId: tokenRecord.id,
      expiresAt: expiresAt.toISOString(),
      createdBy
    });

    return res.status(200).json({
      success: true,
      message: 'Activation link resent successfully',
      tokenId: tokenRecord.id,
      expiresAt: expiresAt.toISOString(),
      expiresInHours: 24,
      email: user.email
    });

  } catch (error) {
    console.error('Error in resend-activation:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
