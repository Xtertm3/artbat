import { motion } from 'framer-motion';
import { BarChart3, BookOpen, DollarSign, Users, TrendingUp, PlusCircle, Star, Clock, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/authStore';
import type { ReactNode } from 'react';

interface MetricProps { label: string; value: string; sub: string; icon: ReactNode; trend?: string; trendUp?: boolean }

function Metric({ label, value, sub, icon, trend, trendUp }: MetricProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <div className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center text-white">{icon}</div>
      </div>
      <p className="text-3xl font-bold tracking-tight mb-1">{value}</p>
      <div className="flex items-center gap-1.5">
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={11} className={!trendUp ? 'rotate-180' : ''} />{trend}
          </span>
        )}
        <span className="text-xs text-gray-400">{sub}</span>
      </div>
    </motion.article>
  );
}

const COURSE_PERFORMANCE = [
  { id: 'c-1', title: 'Tabla for Beginners', students: 320, rating: 4.9, revenue: '₹41,600', completionRate: 78, emoji: '🥁' },
  { id: 'c-2', title: 'Hindustani Classical Vocals', students: 214, rating: 5.0, revenue: '₹32,086', completionRate: 84, emoji: '🎤' },
  { id: 'c-3', title: 'Bansuri Flute Essentials', students: 188, rating: 4.8, revenue: '₹22,560', completionRate: 71, emoji: '🪈' },
];

const RECENT_ENROLLMENTS = [
  { name: 'Arjun Mehta', course: 'Tabla for Beginners', time: '2 min ago', avatar: 'AM', amount: '₹1,299' },
  { name: 'Kavya Pillai', course: 'Hindustani Vocals', time: '18 min ago', avatar: 'KP', amount: '₹1,499' },
  { name: 'Rahul Singh', course: 'Tabla for Beginners', time: '1 hr ago', avatar: 'RS', amount: '₹1,299' },
  { name: 'Priya Patel', course: 'Bansuri Flute', time: '2 hr ago', avatar: 'PP', amount: '₹999' },
  { name: 'Ankit Kumar', course: 'Hindustani Vocals', time: '3 hr ago', avatar: 'AK', amount: '₹1,499' },
];

const QUICK_ACTIONS = [
  { to: ROUTES.INSTRUCTOR_CREATE_COURSE, icon: PlusCircle, label: 'Create Course', desc: 'Publish a new curriculum', color: 'gradient-bg', textColor: 'text-white' },
  { to: ROUTES.INSTRUCTOR_ANALYTICS, icon: BarChart3, label: 'View Analytics', desc: 'Student engagement data', color: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800', textColor: '' },
  { to: ROUTES.INSTRUCTOR_STUDENTS, icon: Users, label: 'My Students', desc: 'Manage & message learners', color: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800', textColor: '' },
  { to: ROUTES.INSTRUCTOR_EARNINGS, icon: DollarSign, label: 'Earnings', desc: 'Revenue & payouts', color: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800', textColor: '' },
];

export default function InstructorDashboardPage() {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(' ')[0] || 'Instructor';

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-500 text-white"
      >
        <p className="text-sm text-white/80 mb-1.5">Welcome back, {firstName} 👋</p>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">Instructor Dashboard</h1>
        <p className="text-white/90 max-w-2xl mb-6">Manage your courses, monitor student outcomes, and grow your teaching revenue.</p>
        <div className="flex flex-wrap gap-3">
          <Link to={ROUTES.INSTRUCTOR_CREATE_COURSE}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-2.5 font-semibold text-sm hover:bg-gray-100 transition">
            <PlusCircle size={16} /> Create Course
          </Link>
          <Link to={ROUTES.INSTRUCTOR_ANALYTICS}
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 font-semibold text-sm hover:bg-white/10 transition">
            View Analytics <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>

      {/* Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Metric label="Active Courses" value="12" sub="across 4 categories" trend="+2 this month" trendUp icon={<BookOpen size={16} />} />
        <Metric label="Total Students" value="4,820" sub="lifetime enrollments" trend="+312 this month" trendUp icon={<Users size={16} />} />
        <Metric label="Monthly Revenue" value="₹1,28,400" sub="this month" trend="+18%" trendUp icon={<DollarSign size={16} />} />
        <Metric label="Avg Completion" value="74%" sub="across all courses" trend="+3% vs last month" trendUp icon={<BarChart3 size={16} />} />
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.to} to={action.to}>
              <motion.div
                whileHover={{ y: -3 }}
                className={`rounded-2xl p-5 ${action.color} cursor-pointer transition-all hover:shadow-lg`}
              >
                <action.icon size={22} className={action.textColor || 'text-primary-600 dark:text-primary-400'} />
                <p className={`font-semibold mt-3 mb-0.5 text-sm ${action.textColor}`}>{action.label}</p>
                <p className={`text-xs ${action.textColor ? 'text-white/75' : 'text-gray-500'}`}>{action.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Top Courses</h2>
            <Link to={ROUTES.INSTRUCTOR_MY_COURSES} className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {COURSE_PERFORMANCE.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-xl shrink-0">{c.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{c.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-0.5"><Users size={10} />{c.students}</span>
                    <span className="flex items-center gap-0.5"><Star size={10} className="fill-amber-400 text-amber-400" />{c.rating}</span>
                    <span className="flex items-center gap-0.5"><Eye size={10} />{c.completionRate}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full gradient-bg" style={{ width: `${c.completionRate}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 shrink-0">{c.revenue}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Enrollments */}
        <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Recent Enrollments</h2>
            <Link to={ROUTES.INSTRUCTOR_STUDENTS} className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {RECENT_ENROLLMENTS.map((e, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{e.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{e.name}</p>
                  <p className="text-xs text-gray-500 truncate">{e.course}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary-600">{e.amount}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 justify-end">
                    <Clock size={10} />{e.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
