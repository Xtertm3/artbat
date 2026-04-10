import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { ROUTES } from '@/config/routes';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-8 justify-center">
          <span className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">L</span>
          <span className="font-bold text-xl gradient-text">LSSM</span>
        </Link>

        {sent ? (
          <div className="text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Check your inbox</h2>
            <p className="text-gray-500 text-sm mb-6">We sent a password reset link to <strong>{email}</strong></p>
            <Link to={ROUTES.LOGIN} className="text-primary-600 font-medium hover:underline">Back to login</Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1">Forgot password?</h1>
            <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link</p>
            {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
              <button type="submit" disabled={loading}
                className="w-full h-12 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2">
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              <Link to={ROUTES.LOGIN} className="text-primary-600 hover:underline">Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
