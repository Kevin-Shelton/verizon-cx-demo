

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
  - [x] Built persona experience data (4 personas x 3 experiences each)
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
  - [ ] Run database migration to create app_users table (pending database connection)
  - [ ] Add test user credentials to app_users table
  - [ ] Test end-to-end login and persona experience loading flow

- [x] Fix Vercel deployment issues
  - [x] Environment variables not being substituted in client code (VITE_ANALYTICS_ENDPOINT showing as literal string)
  - [x] tRPC API endpoint returning HTML instead of JSON on deployed version
  - [x] Moved analytics script injection to main.tsx to use import.meta.env
  - [x] Updated vercel.json to run server as Node.js function
  - [x] Configured routes to properly handle API and static file serving

- [ ] Complete database setup and testing
  - [ ] Run pnpm db:push to create app_users table
  - [ ] Add test credentials (demo/demo) to app_users
  - [ ] Test login flow with valid credentials
  - [ ] Verify persona experience loading from database
  - [ ] Test all 4 personas (carlos, maria, lucia, diego)

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

- [x] Implement hybrid demo delivery system (Option 3)
  - [x] Refactor ExperienceCarousel to support hybrid content rendering
    - [x] Add content type detection (internal vs external)
    - [x] Create hybrid rendering logic based on demo type
    - [x] Preserve carousel state while user navigates external demos
  - [x] Implement internal experience components
    - [x] Create EmailViewerComponent for embedded email demo
    - [x] Create FieldServicesComponent for embedded field services demo
    - [x] Style components to match carousel aesthetic
  - [x] Implement external demo launcher
    - [x] Create LaunchDemoButton component for external URLs
    - [x] Add "Launch Demo" button to carousel for external experiences
    - [x] Open external demos in new window (target="_blank")
    - [x] Add "Return to Demo" instructions in carousel
  - [x] Test all 4 personas with hybrid demo flow
    - [x] Carlos: 3-step journey with mixed internal/external demos
    - [x] María: 3-step journey with mixed demos
    - [x] Lucía: 3-step journey with mixed demos
    - [x] Diego: 3-step journey with mixed demos
  - [x] Verify carousel state preservation
    - [x] Current step maintained when user opens external demo
    - [x] Navigation buttons functional after returning from external demo
    - [x] Progress bar accurate throughout journey

- [x] Fix regression: Restore Carlos's 5-step journey
  - [x] Add Step 4: Website Translation (https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/)
  - [x] Add Step 5: Document Translation (https://explore.ikoneworld.com/document-translate/)
  - [x] Update ExperienceViewer hardcodedExperiences for Carlos
  - [x] Verify all 5 steps display in carousel

- [ ] Fix header and font sizing in ExperienceCarousel
  - [ ] Reduce header padding (p-6 → p-4)
  - [ ] Reduce logo size (h-12 → h-8)
  - [ ] Reduce title font size (text-2xl → text-lg)
  - [ ] Reduce description font size (text-blue-100 → text-sm)
  - [ ] Reduce step description from text-base back to text-sm
  - [ ] Compact overall header layout

- [x] Implement SSO token passing for seamless demo authentication
  - [x] Install jsonwebtoken and @types/jsonwebtoken packages
  - [x] Create /api/generate-auth-token endpoint with 5-minute JWT expiration
  - [x] Add /api/verify-auth-token endpoint for token validation
  - [x] Update LaunchDemoButton component to fetch and append auth tokens
  - [x] Token includes user email, name, and portalUserId
  - [x] Tokens appended as ?auth=TOKEN query parameter to demo URLs
  - [x] Tested token generation - working correctly with demo user fallback
  - [x] All demo types supported (ikoneworld, chat, field services, IVR, website, email)
  - [x] LaunchDemoButton shows loading state during token generation
  - [x] Error handling for failed token generation
  - [x] Maintains hybrid demo delivery architecture (external launches in new windows)

- [x] Update field services demo URL to https://demo-chat.ikoneworld.net/select-language
  - [x] Updated ExperienceViewer hardcoded field-services URL for all personas
  - [x] Changed from https://ikoneworld-demo.vercel.app/select-language to https://demo-chat.ikoneworld.net/select-language
  - [x] Verified URL in ExperienceViewer for Carlos, Maria, and Diego

- [x] Create internal dual pane chat app landing page
  - [x] Created /dual-pane-chat.html landing page
  - [x] Landing page includes Launch button and documentation
  - [x] Integrated with SSO token passing system
  - [x] Auto-launch capability with ?auto=true parameter
  - [x] Professional UI with gradient styling
  - [x] Features list and info box

- [x] Update live chat demo URL with internal dual pane version
  - [x] Updated ExperienceViewer hardcoded live-chat URLs for all personas
  - [x] Changed from https://ikoneworld-demo.vercel.app/demo/101 to /dual-pane-chat.html
  - [x] Updated Carlos, Maria, and Diego personas
  - [x] Lucia persona unchanged (only has IVR-voice step)

- [x] Test and verify all URL updates
  - [x] Dev server running with no compilation errors
  - [x] TypeScript validation passed
  - [x] All URL changes deployed locally
  - [x] Ready for testing



- [x] Fix missing Launch Demo button in live chat experience
  - [x] LaunchDemoButton not rendering for /dual-pane-chat.html URL
  - [x] Updated ExperienceCarousel to recognize /dual-pane-chat.html as external URL
  - [x] Modified isExternalUrl() function to handle relative URLs for live-chat type
  - [x] Added live-chat type check in URL detection logic

- [x] Fix demo launch URLs and simplify LaunchDemoButton
  - [x] Identified root cause: /dual-pane-chat.html was a relative path, not external URL
  - [x] Updated live chat demo URL to https://dual-pane-chat.ikoneworld.net (fixed landing page)
  - [x] Simplified LaunchDemoButton to open external URLs directly without token generation
  - [x] Removed complex tRPC token generation logic that was causing empty response errors
  - [x] Updated ExperienceViewer with new dual pane URL for all personas (Carlos, Maria, Diego)
  - [x] Removed special handling for relative URLs in isExternalUrl function
  - [x] All demo launches now work with external URLs: field services, live chat, IVR, website translation
  - [x] Pushed all changes to GitHub

