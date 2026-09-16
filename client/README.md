# AI Interview Coach

AI Interview Coach is a full-stack web application that helps users prepare for technical interviews using their resume and a job description.

The application uses Google Gemini AI to analyze the user's resume, compare it with the job description, and generate personalized interview questions.

## Features

* User registration and login
* JWT-based authentication using HTTP-only cookies
* Resume PDF upload
* Resume text extraction
* Job description input
* AI-powered resume and job description analysis
* Technical interview questions
* Behavioral interview questions
* Project-based interview questions
* Suggested answers for generated questions
* Responsive frontend interface

## Tech Stack

### Frontend

* Next.js
* React
* JavaScript
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* pdf-parse

### AI

* Google Gemini API
* Structured JSON responses
* Gemini response schema

## Project Structure


ai-interview-coach
│
├── client
│   ├── app
│   ├── components
│   ├── apiServices
│   └── package.json
│
└── server
    ├── controllers
    ├── models
    ├── routes
    ├── services
    ├── middleware
    ├── uploads
    ├── app.js
    ├── server.js
    └── package.json

## How It Works

1. The user creates an account or logs in.
2. The user uploads a resume in PDF format.
3. The backend extracts text from the resume.
4. The user pastes a job description.
5. Gemini analyzes the resume and job description.
6. The application displays:

   * Matching skills
   * Missing skills
   * Resume strengths
   * Areas for improvement
   * Interview preparation suggestions
7. The user generates mock interview questions.
8. Gemini generates:

   * Technical questions
   * Behavioral questions
   * Project questions
   * Suggested answers

## AI Workflow


Resume PDF
    ↓
PDF Text Extraction
    ↓
Resume Text + Job Description
    ↓
Google Gemini API
    ↓
Structured JSON Response
    ↓
Interview Analysis
    ↓
Mock Interview Questions


## API Routes

### Authentication


POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/current-user

### Resume

POST /api/resume/upload

The resume endpoint accepts a PDF file and extracts the resume text.

### Interview Preparation

POST /api/interview-preparation
POST /api/interview-preparation/mock-questions
GET  /api/interview-preparation
GET  /api/interview-preparation/get/:id


## Environment Variables

Create a `.env` file inside the `server` folder.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000


Create a `.env.local` file inside the `client` folder if required:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Never upload your `.env` files or API keys to GitHub.

## Installation

### 1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL


### 2. Install backend dependencies

cd server
npm install

### 3. Start the backend


npm run dev


The backend will run on:


http://localhost:5000


### 4. Install frontend dependencies

Open another terminal:


cd client
npm install


### 5. Start the frontend

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

## Example Gemini Output

```json
{
  "technicalQuestions": [
    {
      "question": "What is the difference between useState and useEffect?",
      "suggestedAnswer": "useState is used to manage component state, while useEffect is used to handle side effects."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenging task you completed.",
      "suggestedAnswer": "Explain the task, the challenge, the action you took, and the result."
    }
  ],
  "projectQuestions": [
    {
      "question": "Explain the main features of your project.",
      "suggestedAnswer": "Describe the project purpose, technologies used, your responsibilities, and the final result."
    }
  ]
}
```

## What I Learned

While building this project, I learned:

* How to build a full-stack MERN-style application
* How to connect a Next.js frontend with an Express backend
* How to upload and process PDF files
* How to extract text from a resume
* How to integrate Google Gemini into a backend service
* How to generate structured AI responses
* How to use JSON schemas with Gemini
* How to protect APIs using JWT authentication
* How to manage authentication cookies
* How to connect MongoDB with Mongoose
* How to handle API errors and loading states

## Future Improvements

Possible future improvements include:

* AI answer evaluation
* Resume ATS scoring
* Voice-based mock interviews
* Skill-gap learning roadmap
* Saved question bank
* Interview performance tracking

## Author

Amit Kumar Sen

Frontend Developer Intern

Technologies: React, Next.js, Node.js, Express.js, MongoDB, and Google Gemini AI
