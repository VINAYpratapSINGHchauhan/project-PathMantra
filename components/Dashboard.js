'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, Map, Download, Eye, Trash2 } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {toast} from 'react-toastify';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [savedCareers, setSavedCareers] = useState([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const fetchUserData = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const presentUser = await getDoc(userRef);

      if (presentUser.exists()) {
        const data = presentUser.data();
        setSavedCareers(data.savedCareer || []);
        return data;
      } else {
        toast.info('User data not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data');
      return null;
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchUserData();
    const mockRoadmaps = [
      {
        id: 1,
        career: 'Software Developer',
        duration: '4 months',
        progress: 25,
        created_date: '2024-01-15'
      },
      {
        id: 2,
        career: 'Data Scientist',
        duration: '6 months',
        progress: 10,
        created_date: '2024-01-10'
      }
    ];
    setSavedRoadmaps(mockRoadmaps);
  }, [user]);

  const handleDeleteCareer = async (titleToDelete) => {
    try {
      const data = await fetchUserData();
      if (!data) return;

      const currentCareers = data.savedCareer || [];
      const updatedCareers = currentCareers.filter(
        (career) => career.title !== titleToDelete
      );

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        savedCareer: updatedCareers,
      });

      setSavedCareers(updatedCareers); 
      toast.success(`Career Deleted successfully!`);
    } catch (error) {
      console.error('Error deleting career:', error);
      toast.error('Failed to delete career');
    }
  };



  const handleDeleteRoadmap = (id) => {
    setSavedRoadmaps(prev => prev.filter(roadmap => roadmap.id !== id));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.displayName}!
          </h1>
          <p className="text-lg text-gray-600">
            Track your career journey and manage your personalized recommendations
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="careers">Saved Careers</TabsTrigger>
            <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Careers</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedCareers.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Career recommendations saved
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Roadmaps</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedRoadmaps.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Learning plans in progress
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-xs text-muted-foreground">
                    Member since {new Date(user.metadata?.creationTime).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with your career development
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button
                  onClick={() => router.push('/quiz')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Take Career Quiz
                </Button>
                <Button
                  onClick={() => router.push('/recommendations')}
                  variant="outline"
                >
                  View Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Career Recommendations</CardTitle>
                <CardDescription>
                  Your personalized career matches and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCareers.length > 0 ? savedCareers.map((career) => (
                    <div key={career.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{career.title}</h3>
                            <p className="text-sm text-gray-600">
                              Saved on {new Date(career.saved_date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {career.match_percentage}% Match
                          </Badge>
                          <span className="text-sm text-green-600 font-medium">
                            {career.salary_range}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export /
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCareer(career.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )) : <div className="text-gray-500 text-center p-4">
                    No saved careers yet. Start exploring your options!
                  </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Roadmaps</CardTitle>
                <CardDescription>
                  Track your progress on personalized learning paths
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedRoadmaps.map((roadmap) => (
                    <div key={roadmap.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{roadmap.career}</h3>
                          <p className="text-sm text-gray-600">
                            {roadmap.duration} plan • Created {new Date(roadmap.created_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button> */}
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export /
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteRoadmap(roadmap.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{roadmap.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${roadmap.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.displayName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900">{user.displayName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900">
                      {new Date(user.metadata?.creationTime).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Sign In
                    </label>
                    <p className="text-gray-900">
                      {new Date(user.metadata?.lastSignInTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="mr-4">
                    Update Profile /
                  </Button>
                  <Button variant="destructive">
                    Delete Account /
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}