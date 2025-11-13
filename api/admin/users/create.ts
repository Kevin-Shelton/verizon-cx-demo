import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
// Using built-in crypto module for UUID and token generation

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

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
    const { email, name, createdBy } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Verify the request is from an admin (check auth token)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('app_users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (checkError || (existingUsers && existingUsers.length > 0)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user WITHOUT password - they will set it via activation link
    const userId = crypto.randomUUID();
    const userName = name || email.split('@')[0]; // Use provided name or email prefix
    
    const { data: newUser, error: createError } = await supabase
      .from('app_users')
      .insert([
        {
          id: userId,
          email: email,
          name: userName,
          password_hash: null, // No password yet - user will set via activation link
          role: 'user',
          password_status: 'pending', // Waiting for user to set password
          account_status: 'pending_activation', // New status field
          created_by: createdBy || 'admin',
        },
      ])
      .select();

    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Generate activation token directly (no HTTP call needed)
    let activationToken = '';
    try {
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
        .insert([{
          user_id: userId,
          token: token,
          token_type: 'activation',
          status: 'pending',
          expires_at: expiresAt.toISOString(),
          created_by: createdBy || 'admin',
          ip_address: ipAddress,
          user_agent: userAgent,
          metadata: {
            email: email,
            created_at: new Date().toISOString()
          }
        }])
        .select()
        .single();

      if (tokenError) {
        console.error('Error creating token:', tokenError);
      } else {
        activationToken = token;
        console.log('[Activation Token] Created for user:', {
          userId,
          email,
          tokenId: tokenRecord.id,
          expiresAt: expiresAt.toISOString()
        });
      }
    } catch (tokenError) {
      console.error('Error creating activation token:', tokenError);
    }

    // Send welcome email via chat system's email API with activation token
    // Only send if activation token was successfully created
    let emailSent = false;
    
    if (!activationToken) {
      console.error('[User Creation] Activation token not created - welcome email will NOT be sent');
      console.error('[User Creation] Admin must manually resend activation link from admin dashboard');
    } else {
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
            email: email,
            name: userName,
            portalUrl: 'https://demo-portal.ikoneworld.net',
            language: 'en',
            resetToken: activationToken, // Include activation token for magic link
          }),
        });

          if (emailResponse.ok) {
            const emailResult = await emailResponse.json();
            console.log('[User Creation] Welcome email sent successfully:', emailResult);
            emailSent = true;
          } else {
            const errorText = await emailResponse.text();
            console.error('[User Creation] Failed to send welcome email:', emailResponse.status, errorText);
          }
        } else {
          console.warn('[User Creation] Welcome email not sent: CHAT_API_URL or CHAT_API_KEY not configured');
        }
      } catch (emailError) {
        // Log the error but don't fail user creation
        console.error('[User Creation] Error sending welcome email:', emailError);
      }
    }

    // Return appropriate message based on token and email status
    let message = 'User created successfully.';
    let warning = null;
    
    if (activationToken && emailSent) {
      message = 'User created successfully. Activation email sent with password setup link.';
    } else if (activationToken && !emailSent) {
      message = 'User created successfully. Activation token created but email failed to send.';
      warning = 'Please use the "Resend Activation Link" button in the admin dashboard to send the welcome email.';
    } else {
      message = 'User created but activation token creation failed.';
      warning = 'Please use the "Resend Activation Link" button in the admin dashboard to generate a new token and send the welcome email.';
    }

    return res.status(201).json({
      success: true,
      user: newUser?.[0] || { id: userId, email, name: userName },
      message: message,
      warning: warning,
      activationRequired: true,
      tokenCreated: !!activationToken,
      emailSent: emailSent
    });
  } catch (error) {
    console.error('Error in create user endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

