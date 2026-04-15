# TeamNote Deployment Instructions (Vercel Backend Fix + Full Setup)

## 🚀 Quick Fix: Backend API (Root Project)
1. `vercel.json` updated to `version: 2` ✅
2. Install Vercel CLI: `npm i -g vercel`
3. Deploy: `vercel --prod`
4. Set env vars in Vercel dashboard:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
   JWT_SECRET=your-32-char-secret-key-here
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Test: `https://your-project.vercel.app/api/health` → `{"status":"OK"}`

## 🏗️ Full Production Setup (Separate Backend + Frontend)
### Backend API (Vercel Serverless - Root)
- Uses `backend/server.js` (Express → serverless via routes).
- **Limitation**: Socket.io won't work (serverless cold starts). Use Pusher/Supabase Realtime for prod.

**Deploy Command:**
```
vercel --prod
```
Project Settings: Link to root dir.

### Frontend (Vercel Static - Vite Build)
```
cd "frontend/TeamNote mockup"
vercel --prod
```
- Framework Preset: Vite
- Build: `npm run build`
- Output Dir: `dist`
- Env: `VITE_API_URL=https://your-backend.vercel.app/api`

## 🧪 Local Development
```
# Backend (port 5000)
cd backend
npm start

# Frontend (port 5173, proxies /api → backend)
cd "frontend/TeamNote mockup"
npm run dev
```

## 📋 Prerequisites
1. **MongoDB Atlas**:
   - Create free M0 cluster.
   - Network Access: Allow all IPs (0.0.0.0/0).
   - DB User: Read/Write.
2. **Vercel Account**: Free tier sufficient.

## ✅ Deployment Order
1. Deploy backend → copy API base URL (e.g., `https://teamnote-api-xxxx.vercel.app`).
2. Deploy frontend → set `VITE_API_URL={backend-url}/api`.
3. Test full flow: Login → Tasks CRUD.

## ⚠️ Notes
- Root deploy serves basic `public/index.html` for non-API routes.
- For monorepo: Use Vercel Git integration with root dirs.
- Sockets: Disabled in serverless → update `backend/server.js` or migrate.

Redeploy now – error fixed!
