# Project Notes

## Overview
KindReach is a Vite React frontend for a donation/claim workflow with login, signup, donor dashboard, charity marketplace, and profile/claims views.

## Current Setup
- Main workflow: `npm run dev`
- Preview port: 5000
- Vite is configured for Replit preview with `host: '0.0.0.0'`, `port: 5000`, and `allowedHosts: true`.

## Recent Fixes
- Removed an invalid duplicate `AuthProvider` usage from `src/main.jsx`.
- Fixed invalid citation text in `src/services/api.js` that broke JavaScript parsing.
- Updated API base URL to use `VITE_API_BASE_URL` or `/api/v1` by default.
- Skipped the `/auth/me` request when there is no saved token.
- Added safe defaults for list props so marketplace and post lists do not crash before data is loaded.
- Fixed upload handling in `DonationForm` to use the selected file instead of the file list object.
- Added form autocomplete attributes and improved MongoDB `_id` handling for claims/cards.
