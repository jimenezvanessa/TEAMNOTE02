# TeamNote Vercel Deployment TODO

## Current Progress:
- [x] Plan approved: Deploy frontend to Vercel first

## Steps to Complete:
2. [x] cd frontend/TeamNote mockup && vercel login (success)\n3. [ ] cd frontend/TeamNote mockup && vercel deploy --prod (gets live URL)
4. [ ] Test deployed frontend (static UI works, APIs 404 until backend)
5. [ ] Backend deploy (Railway/Render): Push to Git, link repo, set MongoDB URI
6. [ ] Update frontend api.ts baseURL to backend URL if separate domains (CORS)
7. [ ] Redeploy frontend if API updated

**Notes:** Frontend ready for static deploy. Backend needs WS-compatible host. CLI install running/success.
