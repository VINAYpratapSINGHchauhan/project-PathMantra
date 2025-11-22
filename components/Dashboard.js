'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, Map, Download, Eye, Trash2 } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { getAuth, GoogleAuthProvider, reauthenticateWithPopup, deleteUser } from "firebase/auth";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [savedCareers, setSavedCareers] = useState([]);

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
        setSavedCareers(data.savedCareers || []);
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

  }, [user]);

  const handleDeleteCareer = async (titleToDelete) => {
    try {
      const data = await fetchUserData();
      if (!data) return;

      const currentCareers = data.savedCareers || [];
      const updatedCareers = currentCareers.filter(
        (career) => career.title !== titleToDelete
      );

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        savedCareers: updatedCareers,
      });

      setSavedCareers(updatedCareers);
      toast.success(`Career Deleted successfully!`);
    } catch (error) {
      console.error('Error deleting career:', error);
      toast.error('Failed to delete career');
    }
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const provider = new GoogleAuthProvider();
    await reauthenticateWithPopup(user, provider);

    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      toast.success("Account deleted Successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error deleting user:", error);
      console.log(error);
    }
  };
 const handleViewRoadmap = (career) => {
  // Clear previous data to avoid reuse of old career roadmap
  localStorage.removeItem("selectedCareer");

  // Ensure the clicked career is the one being sent
  const roadmapPayload = JSON.parse(JSON.stringify(career));

  localStorage.setItem("selectedCareer", JSON.stringify(roadmapPayload));

  router.push("/roadmap");
};


  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl  text-gray-900 mb-2">
            Welcome back, <p className='font-bold'>{user.displayName}!</p>
          </h1>
          <p className="text-lg text-gray-600">
            Track your career journey and manage your personalized recommendations
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="careers">Saved Careers</TabsTrigger>
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
                  View Previous Recommendations
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
                    <div key={career.title} className="flex md:flex-row items-start flex-col gap-2 justify-between p-4 border rounded-lg ">
                      <div className="flex-1">
                        <div className="flex items-center md:space-x-4 space-x-1">
                          <div>
                            <h3 className="font-semibold text-gray-900 md:text-base text-sm ">{career.title}</h3>
                          </div>
                          <Badge variant="secondary" className='md:text-sm text-xs'>
                            {career.match_percentage}% Match
                          </Badge>
                          <span className="text-sm text-green-600 font-medium hidden md:block" >
                            {career.salary_range}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium md:hidden " >
                        {career.salary_range}
                      </span>
                      <div className="flex items-center space-x-2">
                        {/* <Button size="sm" variant="outline" className='bg-blue-500 text-white hover:bg-blue-700 hover:text-white' onClick={() => handleViewRoadmap(career)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button> */}
                        {/* <Button size="sm" variant="outline" className=' bg-green-500 text-white' onClick={handleDownloadPDF}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button> */}
                        <Button

                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCareer(career.title)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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
                    <img src={user.photoURL || '/default-profile.png'} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <div className="hidden md:block">
                    <h3 className="md:text-lg  text-sm font-semibold">{user.displayName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  {/* <Button variant="outline" className="mr-4">
                    Update Profile /
                  </Button> */}
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
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