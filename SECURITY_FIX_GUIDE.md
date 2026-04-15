# 🔴 CRITICAL: Credential Exposure Remediation Guide

**Status:** Your MongoDB credentials are exposed in the git repository  
**Risk Level:** CRITICAL - Database access compromised  
**Time to Fix:** ~10 minutes

---

## Step 1: Rotate MongoDB Credentials (5 min)

### In MongoDB Atlas Console:
1. Go to https://cloud.mongodb.com
2. Select your Cluster0 project
3. Go to **Security** → **Database Access**
4. Find user `jimenezvanessac27_db_user`
5. Click **Edit** → **Edit Password**
6. Generate new strong password (save it temporarily)
7. Click **Update User**

### Update Connection String:
1. Go to **Deployment** → **Database** → **Connect**
2. Click **Drivers**
3. Copy the new connection string with the new password
4. Keep this handy for Step 4

---

## Step 2: Regenerate JWT_SECRET (2 min)

### Generate New Secret:
```powershell
# Run in PowerShell
$secret = [Convert]::ToBase64String(([guid]::NewGuid().ToByteArray())) + [Convert]::ToBase64String(([guid]::NewGuid().ToByteArray()))
$secret.Substring(0, 64)  # Copy this 64-char string
```

Or use online generator: https://generate.plus/en/base64

---

## Step 3: Remove Credentials from Git History (3 min)

### Using BFG Repo Cleaner (Recommended - Safer):
```bash
# Install BFG
# Go to https://rtyley.github.io/bfg-repo-cleaner/

# Clone fresh copy as backup first
git clone --mirror https://github.com/YOUR_USERNAME/team-note.git teamnote.git
cd teamnote.git

# Run BFG to remove .env files
bfg --delete-files backend/.env

# Reflog and GC
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Push back
git push --mirror
cd ..
rm -rf teamnote.git
```

### Or Using git filter-branch (Standard):
```bash
# From your repository root
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch backend/.env' --prune-empty --tag-name-filter cat -- --all

# Force push to clean history
git push origin --force --all
git push origin --force --tags
```

---

## Step 4: Update Environment Variables

### Create Local .env.production (DO NOT COMMIT):
```bash
# backend/.env.production (local only, DO NOT commit)
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://jimenezvanessac27_db_user:[NEW_PASSWORD]@cluster0.tgmkgti.mongodb.net/teamnote?retryWrites=true&w=majority
JWT_SECRET=[NEW_SECRET_FROM_STEP_2]
CORS_ORIGIN=https://your-teamnote-domain.vercel.app
```

### Set Vercel Environment Variables:
```bash
# Via Vercel CLI
vercel env add MONGODB_URI
# Paste: mongodb+srv://jimenezvanessac27_db_user:[NEW_PASSWORD]@cluster0.tgmkgti.mongodb.net/teamnote

vercel env add JWT_SECRET
# Paste: [NEW_SECRET_FROM_STEP_2]

vercel env add NODE_ENV
# Paste: production

vercel env add CORS_ORIGIN
# Paste: https://your-teamnote-domain.vercel.app
```

---

## Step 5: Verify Clean Git History

```bash
# Check that .env is NOT in recent commits
git log --all --full-history --pretty=format:"%H %s" -- backend/.env

# Should show: [No commits found] or only old commits

# Check current .env content
cat backend/.env

# Should show: [file not found] or empty after git clean
```

---

## Step 6: Deploy

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel --prod

# Option 2: Git push (if GitHub integration enabled)
git push origin main

# Option 3: Manual via vercel.com dashboard
```

---

## Step 7: Verification

```bash
# Test health endpoint
curl https://your-teamnote.vercel.app/api/health

# Check Vercel logs
vercel logs --prod

# Test authentication
curl -X POST https://your-teamnote.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}'
```

---

## Cleanup Checklist

- [ ] MongoDB password rotated
- [ ] JWT_SECRET regenerated
- [ ] Git history cleaned with BFG or filter-branch
- [ ] Force push completed
- [ ] Vercel environment variables set
- [ ] Local .env.production configured
- [ ] Confirmed .env not in git log
- [ ] Deployed to Vercel
- [ ] Health check endpoint working
- [ ] Authentication flow tested

---

## Verification Commands

After cleanup, verify no secrets remain:

```bash
# Search for AWS patterns (check for other leaks)
git log -p | grep -i "mongodb\|password\|secret\|apikey" | head -20

# Check .gitignore is effective
git check-ignore -v backend/.env

# Verify git history is clean
git log --all --pretty=format:"%h %s" | head -10
```

---

## Prevention Going Forward

Add to `.gitignore` (already done, but ensure it's there):
```
.env
.env.local
.env.*.local
backend/.env
```

Add to `.gitattributes`:
```
.env export-ignore
backend/.env export-ignore
```

---

## Still Have Issues?

1. **GitHub cleanup didn't work?** Contact GitHub support for repository secret scanning
2. **MongoDB still showing old credentials?** Change DB access again or contact MongoDB support
3. **Stuck on git commands?** Use GitHub Desktop GUI for easier history management

---

## Timeline

- **NOW:** Rotate credentials (Step 1-2)
- **In 5 min:** Clean git history (Step 3)
- **Immediately:** Update Vercel env vars (Step 4)
- **Next:** Deploy (Step 6)
- **Done:** Verify (Step 7)

---

**Your application is ready for secure deployment once these steps are completed.**
