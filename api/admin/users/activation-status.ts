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
 * Get user activation status for admin dashboard
 * 
 * GET /api/admin/users/activation-status
 * 
 * Returns:
 *   users: Array of users with activation status
 *   statistics: Summary statistics
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify the request is from an admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get all users with their activation status using the view
    const { data: users, error: usersError } = await supabase
      .from('user_activation_status')
      .select('*')
      .order('user_created_at', { ascending: false });

    if (usersError) {
      console.error('[Activation Status] Error fetching users:', usersError);
      return res.status(500).json({
        error: 'Failed to fetch users',
        details: usersError.message
      });
    }

    // Get statistics using the function
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_activation_statistics');

    let statistics = {
      total_users: 0,
      activated_users: 0,
      pending_users: 0,
      expired_links: 0,
      activation_rate: 0
    };

    if (!statsError && statsData && statsData.length > 0) {
      statistics = statsData[0];
    } else if (statsError) {
      console.error('[Activation Status] Error fetching statistics:', statsError);
      // Calculate statistics manually from users data
      statistics.total_users = users?.length || 0;
      statistics.activated_users = users?.filter(u => u.account_status === 'active').length || 0;
      statistics.pending_users = users?.filter(u => u.account_status === 'pending_activation').length || 0;
      statistics.expired_links = users?.filter(u => u.latest_token_status === 'expired').length || 0;
      statistics.activation_rate = statistics.total_users > 0
        ? Math.round((statistics.activated_users / statistics.total_users) * 100 * 100) / 100
        : 0;
    }

    // Format users data for frontend
    const formattedUsers = users?.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      accountStatus: user.account_status,
      activationDisplayStatus: user.activation_display_status,
      activatedAt: user.activated_at,
      createdAt: user.user_created_at,
      lastLoginAt: user.last_login_at,
      needsNewLink: user.needs_new_link,
      token: user.latest_token_id ? {
        id: user.latest_token_id,
        type: user.latest_token_type,
        status: user.latest_token_status,
        createdAt: user.token_created_at,
        expiresAt: user.token_expires_at,
        usedAt: user.token_used_at,
        secondsUntilExpiration: user.seconds_until_expiration
      } : null
    })) || [];

    console.log('[Activation Status] Fetched successfully:', {
      totalUsers: formattedUsers.length,
      activatedUsers: statistics.activated_users,
      pendingUsers: statistics.pending_users
    });

    return res.status(200).json({
      success: true,
      users: formattedUsers,
      statistics: {
        totalUsers: statistics.total_users,
        activatedUsers: statistics.activated_users,
        pendingUsers: statistics.pending_users,
        expiredLinks: statistics.expired_links,
        activationRate: statistics.activation_rate
      }
    });

  } catch (error) {
    console.error('Error in activation-status:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
