import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-100">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}