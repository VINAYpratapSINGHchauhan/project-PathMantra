'use client';

import { useAuth } from '@/lib/auth-context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/PathMantraLogo.jpg" className='h-8 w-8' alt="PathMantra-Logo" />
            <span className="text-xl font-bold text-gray-800">PathMantra</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-black  hover:font-semibold transition-colors">
              Home
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-800 hover:text-black hover:font-semibold  transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="/about" className="text-gray-800 hover:text-black  hover:font-semibold transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-800  " />
                  <span className="text-sm text-gray-800 hover:text-black  hover:font-semibold ">{user.displayName}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}