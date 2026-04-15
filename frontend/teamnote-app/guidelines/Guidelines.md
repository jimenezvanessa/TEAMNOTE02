# TeamNote Frontend Guidelines

## Scope

These guidelines apply to `frontend/teamnote-app`.

## API and Data

1. Use the existing API client in `src/app/services/api.ts`.
2. Keep frontend API base path as `/api` unless deployment model changes.
3. Avoid hardcoding absolute backend URLs in components.

## Component Rules

1. Prefer reusable components in `src/app/components`.
2. Keep UI components presentational and move API/state logic to context or service layers.
3. Keep files focused and avoid large single-file components where possible.

## Styling Rules

1. Preserve current theme and utility conventions.
2. Avoid introducing new global CSS unless necessary.
3. Reuse existing UI primitives before adding new custom variants.

## Quality Rules

1. Keep local state minimal and predictable.
2. Guard async calls with basic error handling.
3. Preserve beginner-friendly readability in naming and flow.

## Runtime Notes

1. Run frontend via root workspace commands:
   - `npm run frontend:dev`
   - or `npm run dev` for full stack.
2. Backend route compatibility must be preserved for `/api/auth`, `/api/tasks`, `/api/users`, `/api/health`.
