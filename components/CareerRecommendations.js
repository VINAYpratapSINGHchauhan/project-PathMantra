'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Target, ArrowRight } from 'lucide-react';

export default function CareerRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('careerSuggestions');
    if (data) {
      setRecommendations(JSON.parse(data));
    } else {
      router.push('/quiz');
    }
  }, [router]);

  const handleViewSkillGap = async (career) => {
    setLoading(true);
    setSelectedCareer(career);
    
    try {
      const quizData = JSON.parse(localStorage.getItem('quizData'));
      const response = await fetch('/api/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userSkills: quizData.skills,
          careerTitle: career.title
        }),
      });

      if (response.ok) {
        const skillGapData = await response.json();
        localStorage.setItem('skillGapData', JSON.stringify(skillGapData));
        localStorage.setItem('selectedCareer', JSON.stringify(career));
        router.push('/roadmap');
      }
    } catch (error) {
      console.error('Error fetching skill gap:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p>Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-lg text-gray-600">
            Based on your skills, interests, and preferences, here are your top career matches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.careers?.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {career.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {career.match_percentage}% Match
                  </Badge>
                </div>
                <CardDescription className="text-gray-600">
                  {career.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Match Score</span>
                    <span className="text-sm text-gray-600">{career.match_percentage}%</span>
                  </div>
                  <Progress value={career.match_percentage} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Salary Range</p>
                      <p className="text-sm text-gray-600">{career.salary_range}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Growth Potential</p>
                      <p className="text-sm text-gray-600">{career.growth_potential}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {career.required_skills?.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleViewSkillGap(career)}
                  disabled={loading && selectedCareer?.title === career.title}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {loading && selectedCareer?.title === career.title ? (
                    'Analyzing Skills...'
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      View Skill Gap & Roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/quiz')}
            className="mr-4"
          >
            Retake Quiz
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}