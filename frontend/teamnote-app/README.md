
# TeamNote Frontend (teamnote-app)

This folder contains the Vite React frontend used by TeamNote monorepo.

Original design source:
https://www.figma.com/design/NBXUFjHYsoSPDJRhqvxJxB/TeamNote-mockup

## Preferred Monorepo Commands

Run from repository root:

- `npm install`
- `npm run frontend:dev`
- `npm run build --workspace frontend/teamnote-app`

## Local API Behavior

- Frontend uses `/api` base path.
- In development, Vite proxy points `/api` to backend at `http://localhost:5000`.
  