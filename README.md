# PathMantra - AI-Powered Career Path Advisor

PathMantra is an intelligent career guidance platform that helps users discover their ideal career path through AI-powered recommendations, skill gap analysis, and personalized learning roadmaps.

## Features

### 🧠 AI-Powered Career Recommendations


### 🎯 Skill Gap Analysis
- 

### 🗺️ Custom Learning Roadmaps
- Detailed 3-6 month learning plans
- Phase-based progression with timelines
- Recommended resources and tools
- Practice projects and milestones

### 🔐 User Authentication & Dashboard
- Google Sign-In integration with Firebase
- Personal dashboard to track progress
- Save and manage career recommendations
- Export roadmaps as PDF

### 🎤 Voice Input Support


## Tech Stack

- **Frontend**: Next.js 13+ with App Router, React, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Authentication**: Firebase Auth with Google Sign-In
- **Database**: Firebase Firestore
- **AI**: open router ai


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled
- open router

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/PathMantra.git
cd PathMantra
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
Create a \`.env.local\` file in the root directory:
\`\`\`env
# open router API Key
OPENROUTER_API_KEY=your_openai_api_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
\`\`\`

4. Configure Firebase
- Create a new Firebase project
- Enable Authentication and set up Google Sign-In
- Create a Firestore database
- Copy your Firebase config to the environment variables

5. Run the development server
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser


## Key Features Implementation

### Career Quiz with Voice Input
- Multi-step form with progress tracking
- Voice-to-text integration using Web Speech API
- Real-time form validation and user feedback
- Responsive design for all devices

### AI-Powered Recommendations
- GPT-4 integration for intelligent career matching
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing GPT-4 API
- Firebase for authentication and database services
- shadcn/ui for beautiful UI components
- The open-source community for inspiration and support

## Support

For support, email support@PathMantra.com or join our community discussions.

---

Built with ❤️ by the PathMantra team
\`\`\`
