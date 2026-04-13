# 🚀 Vercel Deployment Guide for TeamNote

## ✅ Migration Complete: Serverless Functions Ready

Your project has been successfully converted to Vercel Serverless Functions architecture.

### 📂 New Project Structure

```
TeamNote/
├── api/                          # ✅ Vercel Serverless Functions
│   ├── auth.js                   # POST /api/auth/register, /api/auth/login
│   ├── tasks.js                  # GET, POST, PUT, DELETE /api/tasks
│   ├── users.js                  # GET /api/users
│   └── health.js                 # GET /api/health
├── lib/                          # ✅ Shared code & utilities
│   ├── db.js                     # MongoDB connection (optimized for serverless)
│   └── models/
│       ├── User.js
│       └── Task.js
├── frontend/                     # Vite SPA (already configured)
│   └── TeamNote mockup/
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── vercel.json                   # ✅ Updated routing configuration
├── package.json                  # ✅ Root dependencies
└── .env.example                  # Environment template
```

### ⚙️ Step 1: Install Dependencies

```bash
npm install
```

This installs both frontend and API dependencies at the root level.

### ⚙️ Step 2: Set Environment Variables on Vercel

Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables

Add:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Generate a strong secret key

Example:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamnote
JWT_SECRET=your-random-secret-key-at-least-32-chars-long
```

### ⚙️ Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Convert backend to Vercel Serverless Functions"
git push origin main
```

Vercel will automatically detect the changes and deploy.

### ⚙️ Step 4: Test Your Deployment

Once deployed, test the endpoints:

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# Register user
curl -X POST https://your-domain.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","role":"leader"}'

# Get tasks (requires Bearer token)
curl https://your-domain.vercel.app/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### ✨ What Changed

#### ✅ Removed (No Longer Needed)
- ❌ `backend/server.js` - Express server with `app.listen()`
- ❌ `backend/sockets/taskSocket.js` - Socket.io (not supported on serverless)
- ❌ Separate backend folder structure

#### ✅ Added (New Vercel Structure)
- ✅ `/api` folder with serverless functions
- ✅ `/lib` folder with shared utilities and models
- ✅ Optimized `lib/db.js` with connection pooling for serverless
- ✅ `.env.example` with required variables

#### ✅ Updated
- ✅ `vercel.json` - Proper routing for Vercel
- ✅ `package.json` - Root-level dependencies
- ✅ Frontend already uses `/api` (no changes needed)

### 🔌 API Endpoints

All endpoints work exactly the same, but now on Vercel:

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login & get token |
| GET | `/api/tasks` | Yes | Get tasks (filter by status/difficulty) |
| POST | `/api/tasks` | Yes (Leader) | Create task |
| PUT | `/api/tasks/:id` | Yes | Update task status |
| DELETE | `/api/tasks/:id` | Yes (Leader) | Delete task |
| GET | `/api/users` | No | Get users list |
| GET | `/api/health` | No | Health check |

### 📝 Frontend Configuration

The frontend already uses `/api` as the base URL:

```typescript
// frontend/TeamNote mockup/src/app/services/api.ts
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
```

✅ No changes needed - works on both localhost and Vercel!

### 🛝 Local Testing with Vercel CLI

To test locally before pushing:

```bash
# Install Vercel CLI (if not already)
npm install -g vercel

# Run local dev server
vercel dev
```

This simulates Vercel's environment locally.

### 📊 Monitoring & Logs

View deployment logs on Vercel Dashboard:
- Settings → Deployments → Click any deployment → View Logs
- Includes all `console.log()` output from your functions

### 🚨 Important Notes

1. **Database Connection**
   - Each serverless function gets its own connection
   - `lib/db.js` handles pooling automatically
   - MongoDB connection strings need `?retryWrites=true&w=majority`

2. **Cold Starts**
   - First request after inactivity may take ~1-2 seconds
   - Subsequent requests are instant
   - Pro plan has longer compute time if needed

3. **No Socket.io**
   - Real-time updates via Socket.io don't work on Vercel
   - Consider Upstash Redis with polling or webhooks instead
   - For now, use manual refresh or polling

4. **Timeouts**
   - Free tier: 10 seconds max execution
   - Pro/Pro tier: 60 seconds max execution
   - Keep functions lightweight

### ✅ Checklist Before Final Deploy

- [ ] Add `MONGODB_URI` and `JWT_SECRET` to Vercel Environment Variables
- [ ] Test all API endpoints locally with `vercel dev`
- [ ] Verify frontend builds: `npm run build`
- [ ] Check that socket.io is disabled or replaced
- [ ] All `.env.example` variables are configured
- [ ] Git changes committed and pushed

### 🆘 Troubleshooting

**502 Bad Gateway?**
- Check that `MONGODB_URI` and `JWT_SECRET` are set in Vercel
- Verify MongoDB IP whitelist includes Vercel's IPs (use 0.0.0.0/0 for now)

**CORS errors?**
- All API functions have CORS headers enabled
- Ensure frontend requests include proper headers

**Functions not found?**
- Verify `/api` folder is committed to git
- Check `vercel.json` routes are correctly mapped

**Database connection timeouts?**
- Increase MongoDB connection timeout in `lib/db.js`
- Check MongoDB Atlas cluster is running
- Verify connection string format

---

🎉 **You're ready to deploy!** Push your changes and monitor the Vercel dashboard for real-time deployment status.
