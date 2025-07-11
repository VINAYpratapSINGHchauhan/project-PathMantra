import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RoadmapGenerator from '@/components/RoadmapGenerator';

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <RoadmapGenerator />
      <Footer />
    </div>
  );
}