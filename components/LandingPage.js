'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Brain, Target, Map, Users, CheckCircle, Star } from 'lucide-react';
import { toast } from 'react-toastify';


export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/quiz');
    } else {
      router.push('/login');
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Get personalized career recommendations based on your skills, interests, and goals."
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Identify exactly what skills you need to develop for your dream career."
    },
    {
      icon: Map,
      title: "Custom Roadmaps",
      description: "Receive detailed 3-6 month learning plans tailored to your career path."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access professional insights and industry-specific advice."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "PathMantra helped me transition from marketing to tech. The roadmap was incredibly detailed!"
    },
    {
      name: "Mike Chen",
      role: "Data Scientist",
      content: "The skill gap analysis was spot-on. I knew exactly what to focus on learning."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "Finally found my perfect career path. The AI recommendations were amazingly accurate."
    }
  ];
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-700 to-sky-400 text-white">
        <div className="max-w-4xl mx-auto text-center ">
          <h1 className="text-6xl md:text-6xl font-bold  mb-10">
            Find Your Perfect
            <span className=" block">Career Path</span>
            <span className="text-emerald-400">with AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get personalized career recommendations, skill gap analysis, and custom learning roadmaps
            powered by advanced AI technology.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-blue-800 hover:bg-blue-950 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold text-black mb-4">
              Why Choose PathMantra?
            </h2>
            <p className="text-lg text-gray-700">
              Discover the features that make PathMantra the ultimate career guidance platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How PathMantra Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to discover your ideal career path
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center border border-gray-500 rounded-xl p-7 shadow-md hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Take the Quiz</h3>
              <p className="text-gray-600">Answer questions about your skills, interests, and career goals</p>
            </div>
            
            <div className="text-center border border-gray-500 rounded-xl p-7 shadow-md hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive AI-powered career suggestions with match percentages</p>
            </div>
            
            <div className="text-center border border-gray-500 rounded-xl p-7 shadow-md hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Follow Your Roadmap</h3>
              <p className="text-gray-600">Get a personalized learning plan to achieve your career goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from people who found their perfect career path
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who&apos;ve discovered their ideal career path with PathMantra
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}