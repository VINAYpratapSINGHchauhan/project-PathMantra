import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPage from '@/components/ContactPage';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <ContactPage />
      <Footer />
    </div>
  );
}