# Verizon Multilingual CX Demo Portal

A modern, interactive demo portal showcasing end-to-end multilingual customer experience across Website, Documents, IVR, Chat, Email, and In-Field interactions.

## 🌟 Features

- **Interactive Journey Map**: R2B journey with translation coverage overlay (90% coverage visualization)
- **4 Spanish-Speaking Personas**: Carlos (MX), María (PR), Lucía (CO), Diego (US)
- **Live Chat Translation**: Dual-pane real-time Spanish ↔ English translation
- **Experience Modules**: Web, Email, Chat, IVR, Documents, and Field Services demos
- **CRM Integration**: Feedback and transcript capture with database storage
- **Verizon Brand Design**: Official colors, typography, and design system

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Backend**: Express 4, tRPC 11, Node.js 22
- **Database**: MySQL/TiDB (via Drizzle ORM)
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Audio**: Howler.js, WaveSurfer.js
- **Build Tool**: Vite 7

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

## 🗄️ Database Setup

The project uses **PostgreSQL** (Supabase) with the following tables:

- `users` - User authentication and profiles
- `feedback` - Customer feedback submissions
- `transcripts` - Chat conversation transcripts

**Quick Setup**: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

Run migrations:
```bash
# Set your Supabase connection string
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# Push schema to database
pnpm db:push
```

## 🌐 Deployment to Vercel

### Prerequisites
- Vercel account
- Supabase account (free tier available)
- GitHub repository already set up ✅

### Steps

1. **Import GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import `Kevin-Shelton/verizon-cx-demo`

2. **Configure Environment Variables**
   Add these in Vercel project settings:
   
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   JWT_SECRET=your-random-secret-key
   VITE_APP_ID=verizon-cx-demo
   VITE_APP_TITLE=Verizon Multilingual CX Demo Portal
   VITE_APP_LOGO=https://your-logo-url.com/logo.png
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://portal.manus.im
   OWNER_OPEN_ID=your-owner-id
   OWNER_NAME=Your Name
   ```

3. **Build Settings**
   - Framework Preset: `Other`
   - Build Command: `pnpm run build`
   - Output Directory: `client/dist`
   - Install Command: `pnpm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

## 📁 Project Structure

```
verizon-cx-demo/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities (store, translate, tts)
│   │   └── App.tsx        # Main app with routes
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # API routes
│   ├── db.ts              # Database queries
│   └── _core/             # Framework internals
├── drizzle/               # Database schema
│   └── schema.ts
├── shared/                # Shared types and utilities
│   ├── types.ts
│   └── journeyUtils.ts
├── data/                  # Static data
│   ├── journey.json       # R2B journey stages
│   └── personas.json      # Persona definitions
└── fixtures/              # Mock data for demos
    ├── emails/
    ├── ivr/
    ├── docs/
    └── chat/
```

## 🎨 Design System

### Colors
- **Brand Red**: `#E60000`
- **Brand Dark**: `#0F0F10`
- **Brand Gray**: `#6B7280`
- **Background**: `#F7F7F7`
- **Success**: `#16A34A`
- **Warning**: `#F59E0B`
- **Error**: `#DC2626`

### Typography
- Font Family: Inter
- Scales: 12/14/16/18/24/32/48px

### Radius
- Small: 8px
- Medium: 14px
- Large: 20px
- XL: 24px

## 🔧 Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Database migrations
pnpm db:push

# Type checking
pnpm typecheck
```

## 📊 Coverage Calculation

The journey overlay calculates coverage based on activity weights:
- **Full Coverage**: 1.0 weight (🟢)
- **Partial Coverage**: 0.5 weight (🟡)
- **Not Covered**: 0.0 weight (🔴)

Stage coverage = `(sum of activity weights / total activities) × 100`, rounded to nearest 5%.

## 🌍 Translation System

Mock translation adapter (`client/src/lib/translate.ts`) provides deterministic translations for offline demos. In production, this would connect to the Verbum API.

Supported dialects:
- `es-MX` - Mexican Spanish
- `es-PR` - Caribbean Spanish (Puerto Rico)
- `es-CO` - Latin American Spanish (Colombia)
- `es-US` - US Spanish

## 📝 API Routes

### Feedback
- `POST /api/trpc/feedback.submit` - Submit feedback
- `GET /api/trpc/feedback.list` - List all feedback

### Transcripts
- `POST /api/trpc/transcripts.submit` - Save chat transcript
- `GET /api/trpc/transcripts.list` - List all transcripts

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `JWT_SECRET` | Session signing secret | Yes |
| `VITE_APP_ID` | Application identifier | Yes |
| `VITE_APP_TITLE` | Application title | Yes |
| `VITE_APP_LOGO` | Logo URL | No |
| `OAUTH_SERVER_URL` | OAuth backend URL | Yes |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL | Yes |

## 📄 License

© 2025 Verizon. Multilingual CX powered by Invictus.

## 🤝 Contributing

This is a demo project. For production use, replace mock translation adapters with actual Verbum API integration.

## 📞 Support

For questions or issues, contact the Invictus team.



