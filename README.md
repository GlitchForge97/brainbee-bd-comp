# Brainbee BD Comp — local README for developers

This repository primarily hosts a static frontend. The upgrade branch adds a minimal Node/Express backend so the site can be run locally with a single command and extended with server-side features.

Quick start

1. git clone https://github.com/GlitchForge97/brainbee-bd-comp.git
2. git checkout upgrade/fullstack/brainbee-bd-comp
3. npm install
4. npm run dev
5. Open http://localhost:3000

What changed in this branch

- Added src/index.js (Express server) to serve static files and a /api/status endpoint.
- Added package.json with dev/test scripts.
- Kept all frontend files unchanged in the repo root so UI/UX is preserved.
- Added basic .gitignore entries for Node projects.

Testing

- npm test runs a small Jest test that verifies the /api/status endpoint is available.

Rationale

This is intended as a minimal, human-readable scaffold to make the project fullstack-ready while preserving the public site exactly as-is. Feel free to suggest a different backend stack for this repo if desired.
