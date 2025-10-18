# Supabase Setup Guide

This guide will help you set up Supabase for the Verizon Multilingual CX Demo Portal.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `verizon-cx-demo`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient for demo

## Step 2: Get Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection String**
3. Select **"URI"** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 3: Run Database Migrations

Once you have the connection string:

```bash
# Set the DATABASE_URL environment variable
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# Run migrations to create tables
pnpm db:push
```

This will create the following tables:
- `users` - User authentication and profiles
- `feedback` - Customer feedback submissions  
- `transcripts` - Chat conversation transcripts

## Step 4: Verify Tables Created

1. In Supabase dashboard, go to **Table Editor**
2. You should see three tables: `users`, `feedback`, `transcripts`
3. Check that the schema matches:

### users table
- id (varchar)
- name (text)
- email (varchar)
- login_method (varchar)
- role (enum: user, admin)
- created_at (timestamp)
- last_signed_in (timestamp)

### feedback table
- id (uuid)
- created_at (timestamp)
- user_name (text)
- user_email (varchar)
- type (enum: question, issue, improvement, observation)
- title (text)
- description (text)
- route (text)
- persona_id (varchar)
- dialect (varchar)
- activity_id (varchar)
- attachments (text)
- metadata (text)

### transcripts table
- id (uuid)
- created_at (timestamp)
- persona_id (varchar)
- dialect (varchar)
- original (text)
- translated (text)
- sentiment (varchar)
- source (varchar)
- hash (varchar)

## Step 5: Deploy to Vercel

### 5.1 Connect GitHub Repository

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select `Kevin-Shelton/verizon-cx-demo`
4. Click **"Import"**

### 5.2 Configure Environment Variables

In Vercel project settings, add these environment variables:

#### Required Variables

```bash
# Database (from Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# Authentication
JWT_SECRET=your-random-secret-key-min-32-chars

# Application
VITE_APP_ID=verizon-cx-demo
VITE_APP_TITLE=Verizon Multilingual CX Demo Portal
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# OAuth (Manus platform)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Owner
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
```

#### Optional Variables

```bash
# Analytics
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# Built-in APIs
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
```

### 5.3 Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Other
- **Build Command**: `pnpm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `pnpm install`
- **Node Version**: 22.x

### 5.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Navigate through the pages:
   - Home → Personas → Journey → Experiences
3. Test the Chat module
4. Check Supabase Table Editor to see if data is being saved

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Check that `DATABASE_URL` is correct in Vercel
2. Verify your Supabase database password
3. Ensure you're using the **direct connection string** (not pooler)
4. Check Supabase logs in **Logs** → **Postgres Logs**

### Build Failures

If build fails on Vercel:

1. Check build logs for specific errors
2. Verify all environment variables are set
3. Try running `pnpm run build` locally first
4. Check that Node version is 22.x

### Missing Tables

If tables don't exist:

1. Run `pnpm db:push` locally with your Supabase DATABASE_URL
2. Or manually create tables using SQL Editor in Supabase
3. SQL schema is in `drizzle/schema.ts`

## Next Steps

### Enable Row Level Security (RLS)

For production, enable RLS in Supabase:

```sql
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;

-- Create policies (example for feedback)
CREATE POLICY "Anyone can insert feedback"
ON feedback FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can view feedback"
ON feedback FOR SELECT
TO public
USING (true);
```

### Add Supabase Storage (Optional)

For file uploads in the Documents module:

1. Go to **Storage** in Supabase
2. Create a bucket named `documents`
3. Set public access policies
4. Update code to use Supabase Storage SDK

### Enable Supabase Auth (Optional)

To use Supabase Auth instead of Manus OAuth:

1. Go to **Authentication** in Supabase
2. Enable desired providers (Email, Google, etc.)
3. Update auth flow in `server/_core/` to use Supabase

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Project Repo**: https://github.com/Kevin-Shelton/verizon-cx-demo

## Quick Reference

### Useful Commands

```bash
# Generate migrations
pnpm drizzle-kit generate

# Push schema to database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm drizzle-kit studio

# Run dev server
pnpm dev

# Build for production
pnpm run build
```

### Important URLs

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/Kevin-Shelton/verizon-cx-demo

