# Monorepo Unified Deploy TODO

## Completed
- [x] Migrate to npm workspaces (`backend`, `frontend/teamnote-app`)
- [x] Unify local env to root `.env` / `.env.example`
- [x] Route Vercel API to `backend/server.js`
- [x] Remove duplicate runtime paths (`api/`, `backend/api/`, `lib/models/`, `backend/public/`)
- [x] Rename frontend folder from `TeamNote mockup` to `teamnote-app`
- [x] Verify build pipeline (`npm run vercel-build`)
- [x] Verify backend health endpoint (`/api/health`)

## Next Actions
- [ ] Run end-to-end functional smoke tests (register, login, task CRUD)
- [ ] Configure production env vars in Vercel dashboard
- [ ] Deploy with `vercel --prod`
- [ ] Capture production validation evidence in `DEPLOYMENT_AUDIT.md`

## Quick Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build for Vercel: `npm run vercel-build`
- Start backend only: `npm run start`

