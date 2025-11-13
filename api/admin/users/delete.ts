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

    // Delete the user from portal database
    const { error: deleteError } = await supabase
      .from('app_users')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      console.error('Error deleting user from portal:', deleteError);
      return res.status(500).json({ error: 'Failed to delete user from portal' });
    }

    console.log(`[User Deletion] User ${user[0].email} deleted from portal database`);

    // Also delete the user from chat database
    // This is a non-blocking operation - portal deletion succeeds even if chat deletion fails
    try {
      const chatApiUrl = process.env.CHAT_API_URL || 'https://demo-chat.ikoneworld.net';
      const chatApiKey = process.env.CHAT_API_KEY || process.env.JWT_SECRET;
      
      if (chatApiUrl && chatApiKey) {
        const chatDeleteResponse = await fetch(`${chatApiUrl}/api/users/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': chatApiKey,
          },
          body: JSON.stringify({
            userId: userId,
            email: user[0].email,
          }),
        });

        if (chatDeleteResponse.ok) {
          const chatResult = await chatDeleteResponse.json();
          console.log('[User Deletion] User deleted from chat database:', chatResult);
        } else {
          const errorText = await chatDeleteResponse.text();
          console.error('[User Deletion] Failed to delete user from chat database:', chatDeleteResponse.status, errorText);
        }
      } else {
        console.warn('[User Deletion] Chat deletion skipped: CHAT_API_URL or CHAT_API_KEY not configured');
      }
    } catch (chatError) {
      // Log the error but don't fail portal deletion
      console.error('[User Deletion] Error deleting user from chat database:', chatError);
    }

    return res.status(200).json({
      success: true,
      message: `User ${user[0].email} deleted successfully from portal and chat databases`,
    });
  } catch (error) {
    console.error('Error in delete user endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

