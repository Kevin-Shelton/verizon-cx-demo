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
    const { email, password, name, createdBy } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
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

    // Hash the password using bcrypt (10 rounds as per security requirements)
    const bcrypt = await import('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create new user with hashed password
    const userId = crypto.randomUUID();
    const userName = name || email.split('@')[0]; // Use provided name or email prefix
    
    const { data: newUser, error: createError } = await supabase
      .from('app_users')
      .insert([
        {
          id: userId,
          email: email,
          name: userName,
          password_hash: passwordHash,
          role: 'user',
          password_status: 'active', // Password is set and ready to use
          created_by: createdBy || 'admin',
        },
      ])
      .select();

    if (createError) {
      console.error('Error creating user:', createError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Send welcome email via chat system's email API
    // This is a non-blocking operation - user creation succeeds even if email fails
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
          }),
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log('Welcome email sent successfully:', emailResult);
        } else {
          const errorText = await emailResponse.text();
          console.error('Failed to send welcome email:', emailResponse.status, errorText);
        }
      } else {
        console.warn('Welcome email not sent: CHAT_API_URL or CHAT_API_KEY not configured');
      }
    } catch (emailError) {
      // Log the error but don't fail user creation
      console.error('Error sending welcome email:', emailError);
    }

    return res.status(201).json({
      success: true,
      user: newUser?.[0] || { id: userId, email, name: userName },
      message: 'User created successfully with hashed password. Welcome email sent.',
    });
  } catch (error) {
    console.error('Error in create user endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

