import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

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
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Verify the request is from an admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Reset password by clearing password_hash and setting status to temporary
    const { data: updatedUser, error: updateError } = await supabase
      .from('app_users')
      .update({
        password_hash: null,
        password_status: 'temporary',
      })
      .eq('id', userId)
      .select();

    if (updateError) {
      console.error('Error resetting password:', updateError);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Password reset for ${updatedUser[0].email}. User must set a new password on next login.`,
    });
  } catch (error) {
    console.error('Error in reset password endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

