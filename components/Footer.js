import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="PathMantra-bg.png" alt="path-mantra logo" className='h-8 w-8' />
              <span className="text-xl font-bold">PathMantra</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered career path advisor helping you navigate your professional journey
              with personalized recommendations and skill gap analysis.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/VINAYpratapSINGHchauhan" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/vinay-pratap-singh-chauhan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>

            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/quiz" className="text-gray-400 hover:text-white transition-colors">Career Quiz</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">AI Career Recommendations</span></li>
              <li><span className="text-gray-400">Skill Gap Analysis</span></li>
              <li><span className="text-gray-400">Learning Roadmaps</span></li>
              <li><span className="text-gray-400">Voice Input</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PathMantra. All rights reserved .Built by Vinay
          </p>
        </div>
      </div>
    </footer>
  );
}