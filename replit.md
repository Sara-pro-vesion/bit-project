# Project Notes

## Overview
KindReach is a Vite React app with a lightweight Express API for a donation/claim workflow. It supports login, signup, donor donation posts with image uploads, charity marketplace browsing, and donation claim requests.

## Current Setup
- Main workflow: `node server/index.js & npx vite --host 0.0.0.0 --port 5000`
- Frontend preview port: 5000
- API server port: 3001
- Vite proxies `/api` requests to the API server.
- Uploaded images are stored under `public/uploads` and referenced as `/uploads/<filename>`.
- App data is stored in `data/db.json` with `users`, `posts`, and `claims` arrays.

## Recent Fixes
- Removed an invalid duplicate `AuthProvider` usage from `src/main.jsx`.
- Fixed invalid citation text in `src/services/api.js` that broke JavaScript parsing.
- Updated API base URL to use `VITE_API_BASE_URL` or `/api/v1` by default.
- Skipped the `/auth/me` request when there is no saved token.
- Added safe defaults for list props so marketplace and post lists do not crash before data is loaded.
- Fixed upload handling in `DonationForm` to use the selected file instead of the file list object.
- Added form autocomplete attributes and improved MongoDB `_id` handling for claims/cards.
- Added an Express backend with auth, donation post creation/editing, image upload support, marketplace listing, and claim creation/review endpoints.
- Connected the charity marketplace page to fetch donation posts and create claims through the API.
