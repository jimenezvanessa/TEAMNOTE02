# Vercel Deployment Fix TODO

## Steps:
- [x] Tried rename - permission denied (close VSCode tabs)
- [x] Edit frontend/TeamNote mockup/vite.config.ts: set build.outDir = 'build'
- [x] Edit vercel.json: distDir="build", dest="frontend/TeamNote mockup/build/$1" (outputDirectory pending)

- [ ] git add . && git commit -m "fix: vercel deploy - use 'build' output dir" && git push origin main
- [ ] Check Vercel dashboard
- [x] Create TODO.md
