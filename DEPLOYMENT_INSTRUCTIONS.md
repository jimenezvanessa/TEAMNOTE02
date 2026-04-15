# TeamNote Deployment Instructions (Unified Monorepo)

## Architecture
- One Vercel project at repository root.
- API runtime: `backend/server.js`.
- Frontend build: `frontend/teamnote-app` copied into root `public/`.
- API + frontend use same domain (`/api/*` + SPA routes).

## Prerequisites
1. Vercel account and Vercel CLI (`npm i -g vercel`) or Git integration.
2. MongoDB Atlas connection string.
3. Root local environment file copied from `.env.example` for development.

## Local Development
1. Install once at root:
```bash
npm install
```
Run this from: `D:\OJT\NoteTeam\TEAMNOTE02`

2. Run frontend and backend together:
```bash
npm run dev
```
3. Health check:
```bash
http://localhost:5000/api/health
```

## Build Pipeline
1. Build frontend and prepare deploy output:
```bash
npm run vercel-build
```
2. This command:
- Builds `frontend/teamnote-app`.
- Copies build output to root `public/`.

## Vercel Environment Variables
Set these in Vercel Project Settings -> Environment Variables:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-strong-secret
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
```

`VITE_API_URL` is optional because frontend defaults to `/api`.

## Deployment
From repository root:

```bash
vercel --prod
```

If Vercel is linked through Git integration, push to the tracked branch after setting environment variables.

## Verification Checklist
1. `GET /api/health` returns status JSON.
2. Login and register work.
3. Task CRUD works.
4. Frontend route refresh works (SPA fallback to `index.html`).

## Notes
- Socket.IO is local-development only in this setup.
- Production on Vercel serverless should use polling or a managed realtime provider if realtime is required.
- Use only root `.env` for local development. Do not create or use per-app `.env` files in this architecture.
