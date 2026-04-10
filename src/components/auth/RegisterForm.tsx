import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';

const schema = z.object({
  name: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['student', 'instructor']),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const { register: doRegister, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  });

  const onSubmit = (d: FormData) => doRegister({ name: d.name, email: d.email, password: d.password, role: d.role });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1.5">Full Name</label>
        <input {...register('name')} placeholder="John Doe"
          className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input type="email" {...register('email')} placeholder="you@example.com"
          className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Password</label>
        <input type="password" {...register('password')} placeholder="••••••••"
          className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
        <input type="password" {...register('confirmPassword')} placeholder="••••••••"
          className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">I am a</label>
        <div className="grid grid-cols-2 gap-3">
          {(['student', 'instructor'] as const).map((role) => (
            <label key={role} className="cursor-pointer">
              <input type="radio" {...register('role')} value={role} className="sr-only peer" />
              <div className="border-2 border-gray-200 peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 rounded-lg p-3 text-center capitalize font-medium transition">
                {role}
              </div>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={isLoading}
        className="w-full h-12 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2">
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        {isLoading ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary-600 font-medium hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
