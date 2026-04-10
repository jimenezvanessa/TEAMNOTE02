# Backend Implementation TODO for TeamNote

# Backend Implementation TODO for TeamNote - COMPLETE ✅

## Plan Breakdown (Approved)
1. ~~Create backend folder structure, package.json, .env.example, .gitignore~~
2. ~~Create models (User.js, Task.js)~~
3. ~~Create utils/db.js for MongoDB connection~~
4. ~~Create middleware/auth.js for JWT and role checks~~
5. ~~Create routes/auth.js and routes/tasks.js~~
6. ~~Create sockets/taskSocket.js for real-time~~
7. ~~Create server.js to tie everything together~~

## Setup & Run
1. Install: `cd backend && npm install`
2. .env: Copy `.env.example` → `.env`, set `MONGODB_URI` (get from MongoDB Atlas or local), `JWT_SECRET=supersecretkey`
3. Dev: `cd backend && npm run dev`
4. Test APIs (Postman):
   - POST http://localhost:5000/api/auth/register {name:'Leader',email:'leader@test.com',password:'pass123',role:'leader'}
   - POST /api/auth/login → get token
   - POST /api/tasks {title:'Test',description:'Desc',difficulty:'Easy'} (Auth Bearer token, Leader)
   - GET /api/tasks?status=To Do&difficulty=Easy
   - PUT /api/tasks/{id} {status:'In Progress'}
   - Socket: Connect io('http://localhost:5000'), emit/listen task:updated etc.
5. Frontend: Ready - APIs on /api/auth, /api/tasks; Socket http://localhost:5000

Backend complete and connection-ready for frontend!

