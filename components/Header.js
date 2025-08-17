'use client';

import { useAuth } from '@/lib/auth-context';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [MobileNavbar, setMobileNavbar] = useState(false);
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

  const toggleMobileNavbar = () => {
    setMobileNavbar((prev) => !prev);
  }

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
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

          <div className=" hidden md:flex items-center space-x-4">
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
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white"
                >
                  <LogOut className="h-4 w-4 " />
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
          <div className="mobileNav md:hidden">
            <button onClick={toggleMobileNavbar} className="p-2 rounded-md text-gray-800 ">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg>
            </button>
            {MobileNavbar && <>
              <div className='absolute top-16 right-0 bg-gray-100 shadow-lg  p-4 w-[80vw] h-[100vh] flex flex-col gap-3'>
                <Link href="/" className="text-black font-semibold ">
                  Home
                </Link>
                <Link href="/quiz" className="text-black font-semibold ">
                  Career Quiz
                </Link>
                <Link href="/about" className="text-black font-semibold ">
                  About
                </Link>
                {user ? (
                  <div className="flex flex-col space-y-5">
                    <Link href="/dashboard" className="text-black font-semibold ">
                      Dashboard
                    </Link>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-black " />
                      <span className="text-sm text-black font-semibold ">{user.displayName}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className='font-semibold'>Logout</span>
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
            </>}
          </div>
        </div>
      </div>
    </header>
  );
}