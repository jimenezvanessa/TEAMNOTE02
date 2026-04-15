# Monorepo Unified Deploy TODO

## Steps to Complete
- [x] Step 1: Read current package.json, vercel.json, vite.config.ts for edit planning.
- [ ] Step 2: Update root package.json build script to build frontend + copy to public/.
- [ ] Step 3: Update vercel.json with build command.
- [ ] Step 4: Replace root public/index.html with frontend's production-ready version.
- [ ] Step 5: Verify/update vite.config.ts for prod (base='', assets).
- [x] Step 6: Ensure api/*.js serverless functions complete (inline backend routes if needed). ✅ Already implemented (auth/tasks/users/health/connect.js use backend models).
- [ ] Step 7: Test `npm run build` - check public/ has full frontend.
- [ ] Step 8: Local test `npx vercel dev`.
- [ ] Step 9: Manual `vercel deploy --prod`.
- [ ] Done: attempt_completion.

Progress: ✅ Step 1 & 6 complete. Proceeding to Step 2.

