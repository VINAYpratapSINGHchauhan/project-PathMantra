import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-100">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}