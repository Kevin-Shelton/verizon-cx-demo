

- [x] Update Explore Module links to open in new windows
  - Website Translation: https://explore.ikoneworld.com/site-translate/
  - Live Chat: https://explore.ikoneworld.com/live-chat/
  - Document Translation: https://explore.ikoneworld.com/document-translate/
  - Added target="_blank" rel="noopener noreferrer" to external links

- [x] Push changes to GitHub
  - Configured GitHub remote with authentication
  - Successfully pushed commit 2609e87 to main branch

- [ ] Add URLs for remaining Experience modules
  - Email Viewer module URL needed
  - IVR & Voice module URL needed
  - Field Services module URL needed

- [ ] Test all external links open correctly in new windows

- [x] Fix video player tRPC endpoint error
  - [x] Simplified VideoPlayer component to use direct video URL
  - [x] Removed tRPC call that was causing HTML response error
  - [x] Video now opens directly in new window with authentication dialog

- [x] Restructure navigation
  - [x] Updated navigation component with new order: Home, Exec Summary, Video, Personas
  - [x] Created "More" dropdown for: Sales Flow Journey, Experiences, Research and Feedback
  - [x] Created new multi-video page at /videos
  - [x] Removed video section from home page
  - [x] Reduced hero section height by 40% (py-14 md:py-20)
  - [x] Updated all routing and links
  - [x] Added Videos route to App.tsx
  - [x] Updated MainLayout with dropdown menu

- [x] Remove 90% coverage badge from home page
  - [x] Removed coverage statement section
  - [x] Removed CheckCircle2 import
  - [x] Home page now flows directly from hero to experiences

- [x] Fix iframe video player positioning
  - [x] Added explicit positioning styles (position: absolute, inset-0)
  - [x] Changed to single column layout for better focus
  - [x] Ensured iframe fills entire aspect-video container
  - [x] Video player properly centered and sized
  - [x] Autoplay and muted settings maintained
  - [x] Responsive design verified

- [x] Optimize Videos page layout
  - [x] Reduced hero section height (py-8 md:py-12)
  - [x] Reduced hero title and description sizes
  - [x] Reduced video section padding
  - [x] Both videos now visible without scrolling on desktop
  - [x] Cleaner, more efficient use of space

- [x] Fix session persistence and iframe centering
  - [x] Fixed sameSite cookie policy (lax in dev, none in prod)
  - [x] Added maxAge to ensure cookies persist for 1 year
  - [x] Fixed secure flag for both dev and production
  - [x] Sessions now persist across page refreshes
  - [x] Fixed iframe centering - removed absolute positioning
  - [x] Simplified iframe styling with display: block
  - [x] Iframe now properly fills container and centers video

- [x] Implement Persona-Based Experience Carousel Viewer
  - [x] Created carousel component with full-page immersive viewer
  - [x] Built persona experience data (4 personas × 3 experiences each)
  - [x] Created placeholder pages for Email and Field Services
  - [x] Added "View" button to each Persona card (emerald/teal gradient)
  - [x] Designed frame with ikOneWorld logo and Invictus branding
  - [x] Implemented navigation (Previous/Next/Restart/Exit with step indicators)
  - [x] Responsive design with best practices (mobile-friendly)
  - [x] Created /experience-viewer/:personaId route
  - [x] Carousel supports skipping steps via clickable indicators
  - [x] Integrated IVR experience URL
  - [x] All 4 personas configured (Carlos, Maria, Juan, Amara)

- [x] Update all experience URLs with correct links
  - [x] Website Translation: https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/
  - [x] Live Chat: https://explore.ikoneworld.com/live-chat/
  - [x] IVR & Voice: https://qa-web.ikunnect.com/auth/login
  - [x] Document Translation: https://explore.ikoneworld.com/document-translate/
  - [x] Updated Experiences page links
  - [x] Updated Experience Carousel IVR step for all 4 personas
  - [x] All URLs tested and working

- [x] Fix carousel iframe session persistence
  - [x] Added sandbox attributes to iframe (allow-same-origin, allow-scripts, allow-forms, allow-popups, allow-cookies)
  - [x] Added payment to allow attribute for cross-origin authentication
  - [x] IVR iframe maintains authenticated session within carousel
  - [x] Users no longer forced to login again when selecting View button
  - [x] Session cookies maintained across iframe boundary

- [x] Fix View button redirect to login on carousel
  - [x] Found bug: window.location.href was causing full page reload
  - [x] Changed to setLocation for smooth router navigation
  - [x] Prevents localStorage from being cleared
  - [x] Authentication state now preserved when navigating to carousel
  - [x] Users no longer redirected to login when clicking View button

- [x] Fix iframe redirect to demo portal login
  - [x] Removed sandbox attribute causing redirect to demo portal login
  - [x] Kept allow attribute for autoplay, fullscreen, picture-in-picture
  - [x] IVR login screen now displays within iframe without breaking out
  - [x] Users can login to IVR experience within carousel frame
  - [x] Carousel navigation flow maintained

- [x] Implement database-driven persona experience sequences
  - [x] User created persona_experiences table in Supabase with step_type enum
  - [x] Added getPersonaExperiences tRPC procedure
  - [x] Created stepTypeConfig utility for step type mapping
  - [x] Updated ExperienceViewer to fetch sequences from database
  - [x] Removed hardcoded persona data from code
  - [x] All 4 personas now use database-managed sequences
  - [x] Easy to modify sequences without code changes

- [x] Fetch persona experiences from Supabase table
  - [x] persona_experiences table created in Supabase
  - [x] All 4 personas with 3 steps each populated
  - [x] Updated ExperienceViewer to fetch from tRPC backend
  - [x] Removed hardcoded persona data
  - [x] Carousel now loads sequences from database via tRPC
  - [x] Easy to modify sequences without code changes
  - [x] tRPC backend queries Supabase persona_experiences table

- [x] Verify deployment readiness
  - [x] All TypeScript compiles without errors
  - [x] Dev server running and responsive
  - [x] All navigation links functional
  - [x] Video player integrated
  - [x] All external links configured
  - [x] Portal ready for deployment

- [x] Supabase integration complete
  - [x] ExperienceViewer uses tRPC backend to fetch persona sequences
  - [x] tRPC getPersonaExperiences procedure queries Supabase database
  - [x] All 4 personas (carlos, maria, lucia, diego) configured
  - [x] All 6 experience types supported (website-translation, email-viewer, live-chat, ivr-voice, document-translation, field-services)
  - [x] Code properly handles database errors and missing data

- [x] Fix React app rendering and tRPC integration
  - [x] React app now renders properly on login page
  - [x] Fixed tRPC input validation using zod.string()
  - [x] Added app_users table to schema for username/password authentication
  - [x] Login form functional and displaying validation errors
  - [x] All form elements working correctly (username, password, sign in button)
  - [ ] Run database migration to create app_users table (pending database connection)
  - [ ] Add test user credentials to app_users table
  - [ ] Test end-to-end login and persona experience loading flow

- [x] Fix Vercel deployment issues
  - [x] Environment variables not being substituted in client code (VITE_ANALYTICS_ENDPOINT showing as literal string)
  - [x] tRPC API endpoint returning HTML instead of JSON on deployed version
  - [x] Moved analytics script injection to main.tsx to use import.meta.env
  - [x] Updated vercel.json to run server as Node.js function
  - [x] Configured routes to properly handle API and static file serving

- [x] Complete database setup and testing
  - [x] Run pnpm db:push to create app_users table
  - [x] Add test credentials (demo/demo) to app_users
  - [x] Test login flow with valid credentials
  - [x] Verify persona experience loading from database
  - [x] Test all 4 personas (carlos, maria, lucia, diego)

- [x] Remove Quick Demo Access button from login page
  - [x] Removed handleDemoLogin function from Login.tsx
  - [x] Removed Quick Demo Access button from UI
  - [x] Dev server rebuilt and tested
  - [x] Verified button no longer appears in browser
  - [x] All 4 personas still accessible via normal login flow

- [x] Implement video hosting for portal
  - [x] Determined video hosting strategy: S3 storage (proprietary content)
  - [x] Created video player section on home page
  - [x] Integrated Ikoneworld video service with secure backend authentication
  - [x] Created VideoPlayer component with loading and error states
  - [x] Stored credentials securely as environment variables
  - [x] Video playback functional with authentication
  - [x] Implemented embedded iframe player with autoplay
  - [x] Video muted by default for autoplay compliance
  - [x] Public URL hidden from users - secure within portal
  - [x] Added second video (Carlos Demo) to Videos page
  - [x] Updated grid layout to 2-column for side-by-side display
  - [x] Both videos autoplay and muted

- [x] Improve step description styling in ExperienceCarousel
  - [x] Increased font size from text-sm to text-base for better readability
  - [x] Added whitespace-normal and leading-relaxed for natural text wrapping
  - [x] Adjusted layout to allow description to flow to the right of logo
  - [x] Added margin between title and description for visual hierarchy
  - [x] Description now more prominent and easier to read

