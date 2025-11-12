import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
// Using built-in crypto.randomUUID() instead of uuid package

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
    const { email, createdBy } = req.body;

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

    // Create new user with temporary password status
    const userId = crypto.randomUUID();
    const { data: newUser, error: createError } = await supabase
      .from('app_users')
      .insert([
        {
          id: userId,
          email: email,
          name: email.split('@')[0], // Use email prefix as default name
          password_hash: null, // No password yet - user must set on first login
          role: 'user',
          password_status: 'temporary', // Indicates user needs to set password
          created_by: createdBy || 'admin',
        },
      ])
      .select();

    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    return res.status(201).json({
      success: true,
      user: newUser?.[0] || { id: userId, email },
      message: 'User created successfully. They must set their password on first login.',
    });
  } catch (error) {
    console.error('Error in create user endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

