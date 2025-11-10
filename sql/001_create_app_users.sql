-- Migration: Create app_users table for password-based authentication
-- Created: 2025-11-10
-- Description: Creates the app_users table with email-based authentication support

-- Create user_role enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add columns to app_users table if they don't exist
ALTER TABLE app_users
ADD COLUMN IF NOT EXISTS email VARCHAR(320) UNIQUE,
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_app_users_email ON app_users(email);

-- Create index on role for admin queries
CREATE INDEX IF NOT EXISTS idx_app_users_role ON app_users(role);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_app_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_app_users_updated_at ON app_users;
CREATE TRIGGER trigger_app_users_updated_at
BEFORE UPDATE ON app_users
FOR EACH ROW
EXECUTE FUNCTION update_app_users_updated_at();
