'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
          savedCareers: []
        });
        toast.success("Logged in Successfully!");
      } else {
        toast.success("Welcome back!");
      }
      router.push('/quiz');
    } catch (error) {
      toast.error(`Error signing in: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src="PathMantraLogo.jpg" alt="path-mantra logo" className='h-12 w-12' />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to PathMantra</CardTitle>
          <CardDescription>
            Sign in to discover your perfect career path with AI-powered recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
          >
            <Chrome className="mr-2 h-5 w-5" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}