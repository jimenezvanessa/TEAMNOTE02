# TeamNote

TeamNote is a difficulty-based team task board with:
- React frontend (Vite)
- Express backend API
- MongoDB

This repository is now a unified monorepo setup:
- One install command at root
- One local `.env` file at root
- One Vercel project deployment from root

## Project Structure

- `backend/` Express API (`/api/auth`, `/api/tasks`, `/api/users`, `/api/health`)
- `frontend/teamnote-app/` Vite React app
- `public/` static build output used by Vercel
- `vercel.json` root routing and runtime config

## Quick Start

1. Install dependencies once:

```bash
npm install
```

2. Create root environment file:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

3. Start frontend + backend together:

```bash
npm run dev
```

4. Open app:
- Frontend: `http://localhost:5173`
- API health: `http://localhost:5000/api/health`

## Root Scripts

- `npm run dev` run frontend and backend in parallel
- `npm run frontend:dev` run only frontend
- `npm run backend:dev` run only backend (nodemon)
- `npm run build` build frontend workspace
- `npm run vercel-build` build frontend and copy artifacts into root `public/`
- `npm run start` start backend from root workspace script

## Environment Variables

Use only root `.env` for local development.

Required for backend:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-strong-random-secret
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Optional for frontend:

```env
VITE_API_URL=/api
```

## Deploy to Vercel

1. Set Vercel environment variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `NODE_ENV=production`

2. Deploy from repository root:

```bash
vercel --prod
```

3. Verify:
- `GET /api/health`
- auth flows
- task CRUD

## Important Runtime Notes

- Run root commands from project root: `D:\OJT\NoteTeam\TEAMNOTE02`.
- If you run `npm run start` from `D:\OJT\NoteTeam`, npm will fail because no `package.json` exists there.
- Frontend defaults to same-origin API (`/api`), so no separate frontend deployment is required in this setup.

## Realtime Note

`Socket.IO` is kept for local-server usage only. Vercel serverless does not provide persistent websocket connections in this architecture.
