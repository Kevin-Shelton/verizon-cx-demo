

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

- [ ] Verify deployment readiness

- [x] Implement video hosting for portal
  - [x] Determined video hosting strategy: S3 storage (proprietary content)
  - [x] Created video player section on home page
  - [x] Integrated Ikoneworld video service with secure backend authentication
  - [x] Created VideoPlayer component with loading and error states
  - [x] Stored credentials securely as environment variables
  - [ ] Test video playback across browsers

