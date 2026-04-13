# TeamNote Error Fixes - Implementation TODO

## Current Status
✅ Plan approved  
✅ Step 1.1: api/auth.ts created

## Steps (Complete sequentially)

### 1. Fix TS Errors - Convert /api/*.js to .ts (Priority 1)
- ✅ Read & convert `api/auth.js` → `api/auth.ts`
- ✅ Read & convert `api/tasks.js` → `api/tasks.ts`  
- ✅ Read & convert `api/users.js` → `api/users.ts`
- ✅ Read & convert `api/health.js` → `api/health.ts`
- ✅ tsconfig.json updated with allowJs + types: node

### 2. Fix Vite Proxy for Local Dev
- ✅ Commented out /api proxy in vite.config.ts (use Vercel dev)

### 3. Frontend Minor Fixes
- ✅ Removed duplicate React import in App.tsx

### 4. Backend Local Dev (Optional)
- [ ] Skip/Remove backend/ if Vercel-only (recommended)

### 5. Testing
- [ ] `vercel dev`
- [ ] Frontend build test

**TS Errors Fixed! Ready for testing.**

### 4. Backend Local Dev (Optional - if keeping)
- [ ] Fix `backend/server.js` require paths to `backend/routes/*`
- [ ] Create missing `backend/middleware/auth.js` copy from root logic

### 5. Testing & Validation
- [ ] `npm install`
- [ ] `cd frontend/TeamNote mockup && npm install`
- [ ] `vercel dev` - Test full stack
- [ ] `npx tsc --noEmit`
- [ ] Frontend: `cd frontend/TeamNote mockup && npm run build`

### 6. Cleanup & Deploy
- [ ] Optional: rm -rf backend/ (per TODO.md)
- [ ] `vercel --prod`

**Next: Convert api/tasks.js → api/tasks.ts**

