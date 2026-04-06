import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
});
type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const [show, setShow] = useState(false);
  const { login, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((d) => login(d.email, d.password))} className="space-y-5">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}

      <div>
        <label className="block text-base font-semibold mb-2.5 text-slate-800 dark:text-slate-100">Email</label>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1.5">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-base font-semibold mb-2.5 text-slate-800 dark:text-slate-100">Password</label>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            {...register('password')}
            placeholder="••••••••"
            className="w-full h-12 px-4 pr-12 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500 mt-1.5">{errors.password.message}</p>}
      </div>

      <div className="flex justify-end -mt-0.5">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-base text-primary-600 hover:underline">Forgot password?</Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 gradient-bg text-white rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>

      <p className="text-center text-base text-gray-600 dark:text-gray-400 pt-1">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-primary-600 font-medium hover:underline">Sign up</Link>
      </p>
    </form>
  );
}
