# TeamNote Vercel 404 Fix - Hybrid Static + Serverless Plan

## Steps (approved by user):

1. ✅ **Plan confirmed** - Hybrid deploy: static frontend + serverless backend APIs.

2. ✅ Updated `vercel.json` for hybrid builds/routes (SPA fallback to index.html).

3. ✅ Created serverless API handlers:
   - `backend/api/auth/index.js`
   - `backend/api/tasks/index.js`
   - `backend/api/users/index.js`
   - `backend/api/health.js`

4. **[PENDING]** Improve handlers for Vercel (fix Express app execution, DB per-request):
   - Update handler code to properly handle req/res without full Express stack.

5. **[PENDING]** Test locally: `npx vercel dev` (Vercel CLI v50.42.0 installed).

6. **[PENDING]** Deploy: `npx vercel --prod`, set env vars in dashboard.

7. **[PENDING]** Verify endpoints.

**Current status: Core files ready. Run `npx vercel dev` to test local deploy.**

## Quick Test Commands:
```
npx vercel dev
# Then visit http://localhost:3000/health, /api/health, build frontend
```

