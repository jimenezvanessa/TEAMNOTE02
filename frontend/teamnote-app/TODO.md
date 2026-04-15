# TeamNote Implementation Plan

## Steps (7/7 completed) - Auth UI persisted and validated

### 1. [x] Update Account interface to include password (SignUpScreen.tsx, LoginScreen.tsx)
### 2. [x] In SignUpScreen: Store hashed/mock password in localStorage
### 3. [x] In LoginScreen: Add password input + verify before login; Add delete button per account (confirm + remove from localStorage)
### 4. [x] In App.tsx: Change useState([]) empty tasks; Remove stats computation + header badges
### 5. [x] In DifficultyColumn.tsx: Remove count badge display
### 6. [x] Test: New signup → empty board; Delete account → list updates; Login verifies password
### 7. [x] Update this TODO.md with completion status

## Testing
- `npm run dev --workspace frontend/teamnote-app`
- Verify: Signup password required, new user empty columns, counts hidden, delete works, login verifies password, task functionality intact.

Status: complete.

