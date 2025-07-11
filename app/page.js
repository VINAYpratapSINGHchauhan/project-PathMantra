import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-100">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}