# SmartQuiz - Online Quiz Platform

SmartQuiz is a production-ready, full-stack web application designed for interactive learning and assessment. It features role-based access, a beautiful dark-mode-ready UI, real-time grading, and an advanced AI integration to generate quizzes directly from PDF notes.

## Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS v4, Framer Motion, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **AI Integration:** Google Gemini AI API (`@google/generative-ai`), `pdf-parse`

## Features

### 🎓 For Students
- **Interactive Quiz Interface:** Timer countdown, auto-submission, question palette, and "mark for review" tracking.
- **Detailed Results:** Immediate visual feedback with circular progress charts, percentage calculation, and pass/fail status.
- **Global Leaderboard:** Compete with other students and see top rankings.
- **Student Profile:** Track earned certificates and edit personal details.
- **Modern UI:** Glassmorphism design, smooth animations, and a seamless Dark Mode toggle.

### 🛡️ For Administrators
- **Admin Dashboard:** Visual analytics using Chart.js to track active users and quiz attempts.
- **Quiz Management:** Full CRUD operations to create and manage quizzes.
- **AI-Powered Quiz Generation:** Upload a PDF of notes, and Google's Gemini AI will automatically extract the text and generate Multiple Choice Questions for you!

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key (for AI features)

### 1. Clone & Install Dependencies
Navigate to the root directory and set up both folders.
```bash
# Setup Backend
cd backend
npm install

# Setup Frontend
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend/` folder and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Run the Application
You will need two terminals running simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Server will run on import.meta.env.VITE_API_URL
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# App will run on import.meta.env.VITE_API_URL
```

---

## Deployment Guide

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. In Network Access, whitelist your IP (or `0.0.0.0/0` for production).
3. Get the connection string and update your `.env` (backend).

### Backend (Render)
1. Push your code to GitHub.
2. Go to Render.com and create a new "Web Service".
3. Connect your repo. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).

### Frontend (Vercel)
1. Go to Vercel.com and create a new Project.
2. Connect your repo. Set the Framework Preset to "Vite".
3. Set the Root Directory to `frontend`.
4. Ensure you set an environment variable for the backend API URL (e.g., `VITE_API_URL`) so Axios points to your live Render backend instead of import.meta.env.VITE_API_URL
5. Click Deploy!
