'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, Download, Save, ArrowLeft } from 'lucide-react';
import { generatePDF } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'react-toastify';

export default function RoadmapGenerator() {
  const [skillGapData, setSkillGapData] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const skillGap = localStorage.getItem('skillGapData');
    const career = localStorage.getItem('selectedCareer');

    if (skillGap && career) {
      setSkillGapData(JSON.parse(skillGap));
      setSelectedCareer(JSON.parse(career));
      generateRoadmap(JSON.parse(skillGap), JSON.parse(career));
    } else {
      router.push('/quiz');
    }
  }, [router]);

  const generateRoadmap = async (skillGap, career) => {
    setLoading(true);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          careerTitle: career.title,
          missingSkills: skillGap.missing_skills?.join(', ') || '',
          userLevel: 'intermediate' // This could be determined from quiz data
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRoadmapData(data);
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('roadmap-content');
    if (element) {
      generatePDF(element, `${selectedCareer?.title}-roadmap.pdf`);
    }
  };


  const handleSaveRoadmap = async () => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const presentUser = await getDoc(userRef);

    if (presentUser.exists()) {
      const data = presentUser.data();
      const savedCareers = data.savedCareer || [];


      const alreadyExists = savedCareers.some(
        (career) => career.title === selectedCareer.title
      );

      if (alreadyExists) {
        toast.info('Roadmap Already Exist!')
        return;
      }

      const updatedCareers = [...savedCareers, selectedCareer];

      await updateDoc(userRef, {
        savedCareer: updatedCareers
      });

      toast.success(
        <div>
          <strong>Roadmap Added Successfuly !</strong>
          <div>check your Dashborad for details. </div>
        </div>
      )
    } else {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        joinedAt: serverTimestamp(),
        savedCareer: [selectedCareer]
      });
      toast.success(
        <div>
          <strong>Roadmap Created Successfuly !</strong>
          <div>check your Dashborad for details. </div>
        </div>
      )
    }
  };

  if (!skillGapData || !selectedCareer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading skill analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:flex-row flex-col items-center justify-between mb-8 gap-1">
          <Button
            variant="outline"
            onClick={() => router.push('/recommendations')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={handleSaveRoadmap}
              variant="outline"
              className="flex items-center w-fit"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="flex items-center bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div id="roadmap-content" className="space-y-4">
          {/* Career Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Choosen Career : {selectedCareer.title}
              </CardTitle>
              <CardDescription>
                {selectedCareer.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div className="md:text-center">
                  <p className="text-sm text-gray-600">Compatibility Score</p>
                  <Badge variant="secondary" className="text-lg font-semibold mb-2">
                    {selectedCareer.match_percentage}% Match
                  </Badge>
                </div>
                <div className="md:text-center">
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="text-lg font-semibold text-green-600 mb-2">
                    {selectedCareer.salary_range}
                  </p>
                </div>
                <div className="md:text-center">
                  <p className="text-sm text-gray-600">Growth Potential</p>
                  <p className="text-lg font-semibold text-blue-600 mb-2">
                    {selectedCareer.growth_potential}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Skill Gap Analysis
              </CardTitle>
              <CardDescription>
                Here&apos;s how your current skills align with the requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Skills You Already Have
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGapData.existing_skills?.map((skill, index) => (
                    <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                  <XCircle className="mr-2 h-5 w-5" />
                  Skills to Develop
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGapData.missing_skills?.map((skill, index) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {skillGapData.skill_priorities && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3">Learning Priorities</h4>
                    <div className="space-y-3">
                      {skillGapData.skill_priorities.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 ">
                          <div className="">
                            <Badge
                              variant={item.priority === 'High' ? 'destructive' :
                                item.priority === 'Medium' ? 'default' : 'secondary'}
                              className="mt-1 "
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium">{item.skill}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Learning Roadmap */}
          {loading ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>Generating your personalized learning roadmap...</p>
                </div>
              </CardContent>
            </Card>
          ) : roadmapData ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Your Learning Roadmap
                </CardTitle>
                <CardDescription>
                  A {roadmapData.roadmap?.duration} plan to achieve your career goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {roadmapData.roadmap?.phases?.map((phase, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-blue-600">
                        {phase.phase}
                      </Badge>
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{phase.duration}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{phase.title}</h4>
                    <div className="space-y-3">
                      {phase.tasks?.map((task, taskIndex) => (
                        <div key={taskIndex} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{task.task}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Estimated time: {task.estimated_time}
                              </p>
                            </div>
                          </div>
                          {task.resources && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Resources:</p>
                              <div className="flex flex-wrap gap-1">
                                {task.resources.map((resource, resourceIndex) => (
                                  <Badge key={resourceIndex} variant="secondary" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recommended Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {roadmapData.roadmap?.recommended_tools?.map((tool, index) => (
                        <Badge key={index} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Practice Projects</h4>
                    <div className="flex flex-wrap gap-2">
                      {roadmapData.roadmap?.practice_projects?.map((project, index) => (
                        <Badge key={index} variant="outline">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}