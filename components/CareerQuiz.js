'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Mic, MicOff } from 'lucide-react';

export default function CareerQuiz() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    education: '',
    experience: '',
    workStyle: [],
    careerGoals: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';
      setRecognition(speechRecognition);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkStyleChange = (style, checked) => {
    setFormData(prev => ({
      ...prev,
      workStyle: checked
        ? [...prev.workStyle, style]
        : prev.workStyle.filter(s => s !== style)
    }));
  };

  const startVoiceInput = (field) => {
    if (!recognition) return;
    
    setIsListening(true);
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      handleInputChange(field, transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/career-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('careerSuggestions', JSON.stringify(data));
        localStorage.setItem('quizData', JSON.stringify(formData));
        router.push('/recommendations');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const workStyleOptions = [
    'Team collaboration',
    'Independent work',
    'Remote work',
    'Flexible schedule',
    'Creative environment',
    'Structured environment',
    'Leadership roles',
    'Mentoring others'
  ];

  const educationOptions = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Professional Certification',
    'Self-taught'
  ];

  const experienceOptions = [
    'No experience',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Career Discovery Quiz
            </CardTitle>
            <CardDescription className="text-center">
              Step {step} of 4 - Tell us about yourself to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skills & Expertise</h3>
                <div className="space-y-2">
                  <Label htmlFor="skills">What are your current skills? (e.g., Python, Communication, Leadership)</Label>
                  <div className="relative">
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="List your skills separated by commas"
                      className="pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => isListening ? stopVoiceInput() : startVoiceInput('skills')}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">What are your interests and passions?</Label>
                  <div className="relative">
                    <Input
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Describe what you enjoy doing"
                      className="pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => isListening ? stopVoiceInput() : startVoiceInput('interests')}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Education & Experience</h3>
                <div className="space-y-2">
                  <Label>What&apos;s your highest level of education?</Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>How much work experience do you have?</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Work Style Preferences</h3>
                <p className="text-sm text-gray-600">Select all that apply to you:</p>
                <div className="grid grid-cols-2 gap-3">
                  {workStyleOptions.map(style => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={style}
                        checked={formData.workStyle.includes(style)}
                        onCheckedChange={(checked) => handleWorkStyleChange(style, checked)}
                      />
                      <Label htmlFor={style} className="text-sm">{style}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Career Goals</h3>
                <div className="space-y-2">
                  <Label htmlFor="careerGoals">What are your long-term career goals?</Label>
                  <div className="relative">
                    <Input
                      id="careerGoals"
                      value={formData.careerGoals}
                      onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                      placeholder="Describe your career aspirations"
                      className="pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => isListening ? stopVoiceInput() : startVoiceInput('careerGoals')}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Quiz Summary</h4>
                  <div className="mt-2 text-sm text-blue-800">
                    <p><strong>Skills:</strong> {formData.skills}</p>
                    <p><strong>Interests:</strong> {formData.interests}</p>
                    <p><strong>Education:</strong> {formData.education}</p>
                    <p><strong>Experience:</strong> {formData.experience}</p>
                    <p><strong>Work Style:</strong> {formData.workStyle.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="ml-auto bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Analyzing...' : 'Get My Recommendations'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}