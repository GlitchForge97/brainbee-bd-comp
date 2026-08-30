---
- chore: add backend scaffold (package.json, src/index.js, README, tests)

This PR introduces a minimal, human-friendly fullstack scaffold so the static site can be run locally and extended with server-side features without changing the UI.

What I changed
- Added package.json with scripts and dependencies for a small Node/Express backend.
- Added src/index.js — a tiny Express server that serves the existing static frontend and exposes a /api/status smoke endpoint.
- Added README.md describing how to run the branch locally and why the change was made.
- Added test/status.test.js (Jest + supertest) to verify /api/status.
- Added .github/workflows/ci.yml to run tests on PRs.

Why this is safe
- Frontend files in the repo root are unchanged; UI and UX remain identical.
- The change adds developer tooling and server scaffolding only — no content changes are made to the public site.

How to run locally
1. git fetch && git checkout upgrade/fullstack/brainbee-bd-comp
2. npm install
3. npm run dev
4. Open http://localhost:3000

Notes for reviewers
- Confirm package.json scripts and dependencies look correct.
- Review test/status.test.js to ensure the smoke test is appropriate.
- Confirm README instructions are clear.


CI re-run trigger: updated to re-run workflow
