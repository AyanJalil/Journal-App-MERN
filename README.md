Follow the steps below to run both the backend and frontend locally.

📦 Prerequisites
Node.js
MongoDB (running locally or via cloud like MongoDB Atlas)

🔧 Backend Setup
Navigate to the backend directory:
cd backend

Install dependencies:
npm install

Run the backend server:
node src/app.js

💻 Frontend Setup
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser and visit:
http://localhost:5173

✅ Default Ports
Backend: http://localhost:3000

Frontend: http://localhost:5173

✅ Features
🔐 Login & Session Control: Secure JWT-based authentication with session management — users can log in from a maximum of 2 devices/tabs, and the oldest session is automatically invalidated when the limit is exceeded.

📓 Journal Management: Authenticated users can create, view, edit, and delete their personal journal entries.

If you just want a single bullet line:

✅ Working implementation of login/session control with journal CRUD functionality (Create, Read, Update, Delete) using JWT and session-based auth.
