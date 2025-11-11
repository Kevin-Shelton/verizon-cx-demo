import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

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
    const { email, password, token } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Get user from database
    const { data: users, error: fetchError } = await supabase
      .from('app_users')
      .select('id, email, password_status')
      .eq('email', email)
      .limit(1);

    if (fetchError || !users || users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // Hash the password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Update user with new password hash
    const { data: updatedUser, error: updateError } = await supabase
      .from('app_users')
      .update({
        password_hash: passwordHash,
        password_status: 'set',
      })
      .eq('id', user.id)
      .select();

    if (updateError) {
      console.error('Error updating password:', updateError);
      return res.status(500).json({ error: 'Failed to set password' });
    }

    // Generate JWT token for the user
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const payload = {
      userId: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    };

    // Simple JWT creation (in production, use a proper JWT library)
    const jwtToken = Buffer.from(JSON.stringify(payload)).toString('base64');

    return res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
      },
      message: 'Password set successfully',
    });
  } catch (error) {
    console.error('Error in set password endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

