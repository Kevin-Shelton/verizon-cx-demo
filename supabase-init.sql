-- Verizon CX Demo Database Schema for Supabase PostgreSQL
-- Run this in Supabase SQL Editor to create all tables

-- Create enums
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE feedback_type AS ENUM ('question', 'issue', 'improvement', 'observation');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name TEXT,
  email VARCHAR(320),
  login_method VARCHAR(64),
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  last_signed_in TIMESTAMP DEFAULT NOW()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  user_name TEXT,
  user_email VARCHAR(320),
  type feedback_type NOT NULL,
  title TEXT,
  description TEXT,
  route TEXT,
  persona_id VARCHAR(64),
  dialect VARCHAR(32),
  activity_id VARCHAR(128),
  attachments TEXT,
  metadata TEXT
);

-- Transcripts table
CREATE TABLE IF NOT EXISTS transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  persona_id VARCHAR(64),
  dialect VARCHAR(32),
  original TEXT,
  translated TEXT,
  sentiment VARCHAR(32),
  source VARCHAR(64),
  hash VARCHAR(128)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_transcripts_created_at ON transcripts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transcripts_persona_id ON transcripts(persona_id);

-- Grant permissions (optional, for RLS setup later)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Success message
SELECT 'Database schema created successfully!' AS status;

