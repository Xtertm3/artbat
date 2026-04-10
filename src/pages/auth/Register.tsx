import { RegisterForm } from '@/components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-sm w-full mx-auto">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-8">
            <span className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">L</span>
            <span className="font-bold text-xl gradient-text">LSSM</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Create your account 🎭</h1>
          <p className="text-gray-500 text-sm mb-8">Start your creative journey today</p>
          <RegisterForm />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center gradient-bg p-12">
        <div className="text-center text-white">
          <p className="text-8xl mb-6">🎸</p>
          <h2 className="text-3xl font-bold mb-3">Join 10,000+ Artists</h2>
          <p className="text-white/80 text-lg max-w-sm">Learn from the best instructors and unlock your creative potential.</p>
        </div>
      </div>
    </div>
  );
}
