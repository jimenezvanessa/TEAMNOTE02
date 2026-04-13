# Vercel 404 Fix - TODO Steps

## Plan Breakdown:
1. [x] Read backend/package.json to check deps/build scripts
2. [x] Create unified backend/api/index.js for all /api routes
3. [x] Update vercel.json: Fix builds/routes to use unified API + frontend
4. [ ] Update frontend/src/app/services/api.ts for prod base URL
5. [ ] Test local build/vercel dev
6. [ ] attempt_completion

Progress: Updated vercel.json and backend/api/index.js (step 3). api.ts already correct (step 4 skipped). Run tests/deploy (step 5).

