import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePasswords() {
  console.log('Starting password migration...');

  try {
    // Fetch all users with plain-text passwords (password_hash is NULL)
    const { data: users, error: fetchError } = await supabase
      .from('app_users')
      .select('*')
      .is('password_hash', null);

    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      return;
    }

    if (!users || users.length === 0) {
      console.log('No users with NULL password_hash found. Migration complete!');
      return;
    }

    console.log(`Found ${users.length} users to migrate`);

    // Hash passwords for each user
    for (const user of users) {
      try {
        // Check if user has a password field (old schema)
        if (user.password) {
          const saltRounds = 10;
          const passwordHash = await bcrypt.hash(user.password, saltRounds);

          // Update user with hashed password
          const { error: updateError } = await supabase
            .from('app_users')
            .update({
              password_hash: passwordHash,
              password_status: 'set',
            })
            .eq('id', user.id);

          if (updateError) {
            console.error(`Error updating user ${user.email}:`, updateError);
          } else {
            console.log(`✓ Migrated user: ${user.email}`);
          }
        } else {
          console.log(`⚠ User ${user.email} has no password field, skipping`);
        }
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
      }
    }

    console.log('Password migration complete!');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

migratePasswords();

