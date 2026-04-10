import { LoginForm } from '@/components/auth/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import eqBarsData from '@/assets/lottie/eqBars.json';

const DEMO_ROLES: { role: UserRole; label: string; desc: string; emoji: string; color: string }[] = [
  { role: 'student', label: 'Student', desc: 'Browse courses & track progress', emoji: '🎓', color: 'from-violet-500 to-purple-600' },
  { role: 'instructor', label: 'Instructor', desc: 'Manage courses & view analytics', emoji: '🎤', color: 'from-pink-500 to-rose-600' },
  { role: 'admin', label: 'Admin', desc: 'Platform management & reports', emoji: '🛡️', color: 'from-amber-500 to-orange-600' },
];

export default function LoginPage() {
  const { demoLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleDemo = (role: UserRole) => {
    demoLogin(role);
    if (role === 'student') navigate(ROUTES.STUDENT_DASHBOARD);
    else if (role === 'instructor') navigate(ROUTES.INSTRUCTOR_DASHBOARD);
    else navigate(ROUTES.ADMIN_DASHBOARD);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 py-8 lg:px-16 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-[430px] w-full mx-auto"
        >
          <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-8">
            <span className="w-11 h-11 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">L</span>
            <span className="font-bold text-[38px] leading-none gradient-text">LSSM</span>
          </Link>
          <h1 className="text-[46px] sm:text-[52px] font-bold leading-[1.03] mb-2">Welcome back 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-7 mb-8">Sign in to continue your learning journey</p>
          <LoginForm />

          {/* Demo login section */}
          <div className="mt-8">
            <div className="relative flex items-center mb-5">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="mx-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Or try a demo</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">No account needed — explore with a demo role</p>
            <div className="grid grid-cols-3 gap-3 items-stretch">
              {DEMO_ROLES.map(({ role, label, desc, emoji, color }) => (
                <button
                  key={role}
                  onClick={() => handleDemo(role)}
                  title={desc}
                  className={`h-full min-h-[88px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br ${color} text-white hover:opacity-90 active:scale-95 transition-all shadow-md hover:-translate-y-0.5`}
                >
                  <span className="text-[24px] leading-none">{emoji}</span>
                  <span className="text-sm font-semibold leading-none">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: decorative */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="hidden lg:flex relative overflow-hidden flex-col items-center justify-center gradient-bg p-10 xl:p-12"
      >
        <motion.div
          className="absolute -top-20 -left-16 w-56 h-56 rounded-full bg-white/15 blur-2xl"
          animate={{ x: [0, 12, 0], y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-violet-300/20 blur-2xl"
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="text-center text-white relative z-10 max-w-md">
          <motion.p
            className="text-8xl mb-4"
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0], scale: [1, 1.07, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎵
          </motion.p>
          <motion.div
            className="w-28 h-28 mx-auto mb-2 rounded-2xl bg-white/15 border border-white/35 backdrop-blur-sm p-3"
            animate={{ y: [0, -6, 0], boxShadow: ['0 0 0 rgba(255,255,255,0.0)', '0 10px 24px rgba(255,255,255,0.28)', '0 0 0 rgba(255,255,255,0.0)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Lottie animationData={eqBarsData} loop autoplay />
          </motion.div>
          <h2 className="text-[42px] leading-none font-bold mb-4">Keep Learning</h2>
          <p className="text-white/85 text-xl leading-relaxed max-w-sm mx-auto">
            Thousands of students are mastering Music, Dance & Theater every day.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-10 relative z-10">
          {['🎸 Guitar', '🎹 Piano', '💃 Dance', '🪘 Tabla', '🎻 Violin', '🎤 Vocals'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0.88, 1, 0.88], y: [0, -2, 0] }}
              transition={{ delay: 0.2 + index * 0.08, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/20 backdrop-blur-sm rounded-xl py-3 px-2 text-center text-white text-sm font-medium"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
