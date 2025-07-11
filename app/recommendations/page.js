import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CareerRecommendations from '@/components/CareerRecommendations';

export default function Recommendations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-100">
      <Header />
      <CareerRecommendations />
      <Footer />
    </div>
  );
}