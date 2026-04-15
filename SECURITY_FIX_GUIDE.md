# Security Remediation Guide (Monorepo Version)

## Current Risk

- Secrets must never be committed to git.
- Use only root `.env` for local development.
- Use Vercel environment variables for production.

## Step 1: Rotate Exposed Credentials

1. Rotate MongoDB user password in Atlas.
2. Generate a new `JWT_SECRET`.
3. Invalidate old credentials immediately.

## Step 2: Clean Git History (if secrets were committed)

Use one approach:

1. BFG Repo Cleaner (recommended), or
2. `git filter-branch` / `git filter-repo`.

Remove any committed secret files and values, then force-push cleaned history.

## Step 3: Use the New Env Model

### Local only (root `.env`, do not commit)

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>
JWT_SECRET=<new-strong-secret>
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
VITE_API_URL=/api
```

### Production (Vercel env vars)

Set in Vercel Project Settings:

- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `NODE_ENV=production`

## Step 4: Verify Security Controls

1. `.env` is ignored by git.
2. No secrets found in git history scans.
3. Backend boots without hardcoded credentials.
4. `/api/health` returns OK after deploy.

## Quick Verification Commands

```bash
# Check current ignore behavior
git check-ignore -v .env

# Search tracked files for accidental secret-like keys
git grep -n "MONGODB_URI\|JWT_SECRET\|password\|apikey"
```

## Checklist

- [ ] MongoDB password rotated
- [ ] JWT secret rotated
- [ ] Git history cleaned (if needed)
- [ ] Root `.env` used locally
- [ ] Vercel env vars set in dashboard
- [ ] Deployed and verified
