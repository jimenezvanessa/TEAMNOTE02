# TeamNote Deployment Instructions (Backend: Render, Frontend: Vercel)

## Repo Status
- **Root Repo**: https://github.com/jimenezvanessa/TeamNote01 (pushed latest changes: deployment files, backend/frontend updates).
- **Backend**: `backend/` directory ready (clean working tree, 1 commit).
- **Frontend**: `frontend/TeamNote mockup/` ready (ahead by commits, latest pushed).

**Note**: Single repo structure. Use subfolders for deployment or extract to separate repos if needed.

## Backend to Render
1. Dashboard → New → Web Service → Connect https://github.com/jimenezvanessa/TeamNote01 (branch: master).
2. Settings:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
3. Env Vars:
   ```
   MONGODB_URI=your_atlas_uri
   FRONTEND_URL=your_vercel_url
   JWT_SECRET=supersecret32chars+
   ```
4. Deploy → Get URL e.g. `https://teamnote-backend-abc.onrender.com`

## Frontend to Vercel
1. Dashboard → New Project → Connect https://github.com/jimenezvanessa/TeamNote01.
2. Settings:
   - Root Directory: `frontend/TeamNote mockup`
   - Build: `npm run build`
   - Output: `dist`
3. Env Var:
   ```
   VITE_API_URL=https://your-render-url/api
   ```
4. Deploy → Get URL.

## Next Steps
1. Create MongoDB Atlas cluster, get MONGODB_URI.
2. Deploy backend first, copy URL.
3. Deploy frontend, set VITE_API_URL, update backend FRONTEND_URL.
4. Test: Register, tasks, real-time Socket.io.

Repos updated and ready for deployment import. You do the Render/Vercel steps.
