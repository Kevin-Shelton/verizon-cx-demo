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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
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

    // Prevent deleting the admin user
    const { data: user, error: fetchError } = await supabase
      .from('app_users')
      .select('email, role')
      .eq('id', userId)
      .limit(1);

    if (fetchError || !user || user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user[0].role === 'admin') {
      return res.status(403).json({ error: 'Cannot delete admin users' });
    }

    // Delete the user
    const { error: deleteError } = await supabase
      .from('app_users')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    return res.status(200).json({
      success: true,
      message: `User ${user[0].email} deleted successfully`,
    });
  } catch (error) {
    console.error('Error in delete user endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

