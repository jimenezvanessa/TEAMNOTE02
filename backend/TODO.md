# Backend Implementation TODO for TeamNote

## Status

Backend implementation is complete and integrated into monorepo runtime.

## Current Runtime Notes

1. Backend is started from root workspace scripts.
2. Local env source is root `.env`.
3. API routes are served from `backend/routes/*`.
4. Vercel API uses `backend/server.js` runtime.

## Commands

- Install once (root): `npm install`
- Backend dev only: `npm run backend:dev`
- Backend start only: `npm run start`
- Full app dev (frontend + backend): `npm run dev`

## API Smoke Tests

- `GET http://localhost:5000/api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`

## Realtime Note

Socket.IO remains available for local backend runtime usage.

