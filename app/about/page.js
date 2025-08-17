import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/AboutPage';

export default function about() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <About />
      <Footer />
    </div>
  );
}