# Team Update: Monorepo Unification Completed

**Date:** April 15, 2026  
**Audience:** TeamNote developers, QA, and deployment owners

## What Changed

TeamNote has been unified into a single monorepo runtime model.

### Key decisions implemented

1. One install flow from root (`npm install`)
2. One local environment source at root (`.env` from `.env.example`)
3. One Vercel project deployment from repository root
4. One API runtime source (`backend/server.js`)
5. Frontend folder renamed to `frontend/teamnote-app`

## Structural Changes

### Kept

- `backend/` as the authoritative backend implementation
- `frontend/teamnote-app/` as the authoritative frontend implementation
- root `public/` as deploy-time frontend artifact target

### Removed duplicates

- `api/`
- `backend/api/`
- `lib/models/`
- `backend/public/`

## Daily Workflow (New Standard)

1. Install dependencies:

```bash
npm install
```

2. Create local env file (one file only):

```powershell
Copy-Item .env.example .env
```

3. Run full app (frontend + backend):

```bash
npm run dev
```

4. Build deploy artifacts:

```bash
npm run vercel-build
```

5. Start backend only:

```bash
npm run start
```

## Deployment Workflow (One Vercel Project)

1. Set environment variables in Vercel project:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
2. Deploy from root:

```bash
vercel --prod
```

## Important Notes

- Run npm commands from `D:\OJT\NoteTeam\TEAMNOTE02`.
- `Socket.IO` is treated as local-only in current Vercel serverless setup.
- Frontend API uses `/api` same-origin path by default.

## Team Action Items

1. Pull latest changes.
2. Remove any old local workflows that use `frontend/TeamNote mockup`.
3. Recreate local `.env` from root `.env.example`.
4. Re-run smoke tests for auth and tasks CRUD.

## Expected Benefits

- Simpler onboarding
- Fewer deployment mismatches
- Less duplication and maintenance overhead
- Consistent local and production routing model
