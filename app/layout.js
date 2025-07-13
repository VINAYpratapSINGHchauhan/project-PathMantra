import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PathMantra - AI-Powered Career Path Advisor',
  description: 'Find your perfect career path with AI-powered recommendations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
          <body className={inter.className}>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </body>
        </html>
        );
}