# 🧭 PathMantra

**PathMantra** is an AI-powered career path advisor that helps individuals discover their ideal career based on personal skills, interests, education, and work preferences. Built using **Next.js (App Router)**, **Firebase**, **OpenRouter AI**, **Next.js** and ** JavaScript** , it delivers intelligent, personalized recommendations — like a virtual career guru.

---


## 🚀 Live Demo

Coming soon...


---

## 📌 Features



- 🔐 **Firebase Google Authentication**  

  Users can securely log in and save their progress using Google Sign-In.


- 🧠 **Smart Career Quiz**  

  Users enter their skills, interests, education level, and work style through an intuitive quiz form (with **voice input support**).


- 🤖 **AI-Powered Career Suggestions**  

  User input is sent to the OpenRouter AI (ChatGPT-like API) to return:
  - 3–5 matching career paths
  - Matching percentage
  - Role descriptions


- 📉 **Skill Gap Analyzer**  

  Compares user input to ideal skills per career and shows what's missing.


- 🗺️ **Roadmap Generator**  

  AI-generated roadmaps per career path including:
   - Recommended tools
   - Learning resources
   - Practice projects  
  Users can **save** or **download as PDF**.


- 🗺️ **Custom Learning Roadmaps**

   - Detailed 3-6 month learning plans
   - Phase-based progression with timelines
   - Recommended resources and tools
   - Practice projects and milestones


- 🔐 **User Authentication & Dashboard**

   - Google Sign-In integration with Firebase
   - Personal dashboard to track progress
   - Save and manage career recommendations
   - Export roadmaps as PDF



- 🧾 **User Dashboard**  

  Logged-in users can access all their saved roadmaps and career suggestions.


- 🎤 **Voice Input **  

  Users can fill the quiz using speech-to-text (ideal for accessibility).


---


## 🛠 Tech Stack

| Area              | Tech Used                         |
|-------------------|-----------------------------------|
| Frontend          | Next.js (App Router), JavaScript  |
| Authentication    | Firebase Google Auth              |
| Backend (API)     | Firebase Functions, OpenRouter AI |
| UI Component      | redux-ui / react hook form        |
| Styling           | Tailwind CSS / CSS Modules        |
| PDF Export        | jsPDF or html2pdf.js              |


---


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled
- open router

### Installation


1. Clone the repository

```
git clone https://github.com/your-username/PathMantra.git
cd PathMantra
````


2. Install dependencies

```
npm install
```


3. Set up environment variables

```
Create a `.env.local` file in the root directory:



# open router API Key

OPENROUTER_API_KEY=your_openai_api_key_here

# Firebase Configuration

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here

```

4. Configure Firebase

- Create a new Firebase project
- Enable Authentication and set up Google Sign-In
- Copy your Firebase config to the environment variables

5. Run the development server

```
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser


## Key Features Implementation

### Career Quiz with Voice Input

- Multi-step form with progress tracking
- Voice-to-text integration using Web Speech API
- Real-time form validation and user feedback
- Responsive design for all devices

### AI-Powered Recommendations

- integration for intelligent career matching
- Structured prompts for consistent AI responses
- Error handling and fallback mechanisms
- Caching for improved performance

### Skill Gap Analysis

- Dynamic skill comparison algorithms
- Visual representation of skill gaps
- Priority-based learning recommendations
- Integration with career requirements database

### Learning Roadmaps

- Automated roadmap generation based on skill gaps
- Timeline-based learning progression
- Resource recommendations and project suggestions
- Progress tracking and milestone management

### User Dashboard

- Comprehensive user profile management
- Save and organize career recommendations
- Track learning progress and achievements
- Export functionality for offline access

## API Endpoints

### POST /api/career-suggestions
Generates personalized career recommendations based on user quiz data.

### POST /api/skill-gap
Analyzes skill gaps between user skills and career requirements.

### POST /api/roadmap
Creates detailed learning roadmaps for specific career paths.

## Security Features

- Firebase Authentication with Google Sign-In
- Secure API key management
- User data protection with Firestore security rules
- Input validation and sanitization
- CORS protection for API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request


Built with ❤️ by the PathMantra team
\`\`\`
