# Careerlytics
 
An AI-powered interview preparation platform that analyzes your resume, job description, and background to generate a targeted, structured interview strategy — technical & behavioral questions, skill gap analysis, a day-by-day preparation roadmap, and an ATS-friendly tailored resume.
 
**Live demo:** https://careerlytics-ten.vercel.app
 
---
 
## ✨ Features
 
- **Resume + Job Description Analysis** — upload your resume (PDF) and paste a job description to generate a personalized interview prep report
- **AI Match Score** — see how well your profile matches the role, powered by Google Gemini
- **Technical & Behavioral Questions** — 8-10 technical and 5 behavioral questions, each with the interviewer's intention and a model answer
- **Skill Gap Analysis** — identifies missing skills with severity ratings (Low / Medium / High)
- **7-Day Preparation Roadmap** — a structured, day-by-day study plan tailored to the role
- **Downloadable Reports** — export your full interview report or a role-tailored resume as a PDF
- **Session History** — every report is saved to your account and revisitable anytime
- **Secure Authentication** — JWT-based auth with httpOnly cookies
- **Fully Responsive** — usable on desktop, tablet, and mobile
---
 
## 🛠 Tech Stack
 
**Frontend**
- React (Vite)
- React Router
- SCSS with a centralized design token system
- Axios
- react-hot-toast
**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication with httpOnly cookies
- Multer (file uploads)
- pdf-parse (resume text extraction)
**AI & PDF Generation**
- Google Gemini API (`@google/genai`) for content generation
- Zod + zod-to-json-schema for structured AI output validation
- Puppeteer + `@sparticuz/chromium` for serverless-compatible PDF generation
**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- A Google Gemini API key ([Google AI Studio](https://aistudio.google.com/))
### 1. Clone the repository
 
```bash
git clone https://github.com/rAi380/Careerlytics.git
cd Careerlytics
```
 
### 2. Backend setup
 
```bash
cd backend
npm install
```
 
Create a `.env` file in `backend/`:
 
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```
 
Start the backend:
 
```bash
npm run dev
```
 
### 3. Frontend setup
 
```bash
cd frontend
npm install
```
 
Create a `.env` file in `frontend/`:
 
```env
VITE_API_BASE_URL=http://localhost:3000
```
 
Start the frontend:
 
```bash
npm run dev
```
 
The app should now be running at `http://localhost:5173`.
 
---
 

 
## 🔑 Environment Variables Reference
 
| Variable | Location | Description |
|---|---|---|
| `MONGO_URI` | backend | MongoDB connection string |
| `JWT_SECRET` | backend | Secret used to sign JWT tokens |
| `GOOGLE_GENAI_API_KEY` | backend | Google Gemini API key |
| `FRONTEND_URL` | backend | Deployed frontend URL (for CORS) |
| `NODE_ENV` | backend | `development` or `production` |
| `VITE_API_BASE_URL` | frontend | Deployed backend API URL |
 
---
 
## 📡 API Overview
 
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/get-me` | Get current session user |
| POST | `/api/interview` | Generate a new interview report (resume upload) |
| GET | `/api/interview` | Get all reports for the logged-in user |
| GET | `/api/interview/report/:id` | Get a single report by ID |
| DELETE | `/api/interview/:id` | Delete a report |
| POST | `/api/interview/resume/pdf/:id` | Download tailored resume as PDF |
| POST | `/api/interview/report/pdf/:id` | Download full interview report as PDF |
 
All `/api/interview/*` routes require authentication.
 
---
 
## 🌐 Deployment Notes
 
- **Cross-origin cookies**: since frontend and backend live on different domains in production, auth cookies are set with `secure: true` and `sameSite: "none"` when `NODE_ENV=production`.
- **PDF generation on serverless hosts**: Puppeteer's default Chromium download doesn't work reliably on hosts like Render. This project uses `puppeteer-core` + `@sparticuz/chromium` in production, while falling back to the full `puppeteer` package for local development (which uses its own bundled Chromium, cross-platform).
---
 
## 🗺 Possible Future Improvements
 
- Mock interview practice mode with AI-scored answers
- Progress tracking on the preparation roadmap (checkable tasks)
- Match score trend chart across multiple sessions
- Company-specific interview prep using web-grounded search
---
 
