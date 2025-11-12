-- Create table for tracking failed login attempts
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS login_attempts (
  ip_address VARCHAR(45) PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  last_attempt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_login_attempts_last_attempt ON login_attempts(last_attempt);

-- Add comment
COMMENT ON TABLE login_attempts IS 'Tracks failed login attempts by IP address for reCAPTCHA enforcement';
