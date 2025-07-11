import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareerQuiz from '@/components/CareerQuiz';

export default function Quiz() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <CareerQuiz />
      <Footer />
    </div>
  );
}