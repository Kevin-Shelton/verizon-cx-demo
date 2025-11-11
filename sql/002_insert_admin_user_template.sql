-- Template: Insert Admin User
-- IMPORTANT: You must generate a bcrypt hash of your password BEFORE running this query
--
-- To generate a bcrypt hash:
-- 1. Use an online tool: https://bcrypt-generator.com/
-- 2. Or use Node.js: node -e "console.log(require('bcrypt').hashSync('your-password', 10))"
-- 3. Or use Python: python3 -c "import bcrypt; print(bcrypt.hashpw(b'your-password', bcrypt.gensalt(10)).decode())"
--
-- STEPS:
-- 1. Choose a strong password (min 8 chars, uppercase, lowercase, number, special char)
-- 2. Generate the bcrypt hash using one of the methods above
-- 3. Replace 'YOUR_BCRYPT_HASH_HERE' below with the actual hash
-- 4. Replace 'kevin.shelton@invictusbpo.com' if using a different email
-- 5. Run this SQL in your Supabase database console

INSERT INTO app_users (email, password_hash, name, role)
VALUES (
    'kevin.shelton@invictusbpo.com',
    'YOUR_BCRYPT_HASH_HERE',
    'Kevin Shelton',
    'admin'
)
ON CONFLICT (email) DO UPDATE
SET password_hash = 'YOUR_BCRYPT_HASH_HERE',
    name = 'Kevin Shelton',
    role = 'admin',
    updated_at = CURRENT_TIMESTAMP;

-- Verify the user was created
SELECT id, email, name, role, created_at FROM app_users WHERE email = 'kevin.shelton@invictusbpo.com';
