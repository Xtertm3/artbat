import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock3, Target, Trophy, ArrowRight, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { ROUTES } from '@/config/routes';
import { COURSE_CATEGORIES } from '@/config/constants';
import { useMyCourses } from '@/hooks/useCourses';
import { useAuthStore } from '@/store/authStore';
import { formatDuration } from '@/lib/utils';
import type { Enrollment } from '@/types';

const FALLBACK_ENROLLMENTS: Enrollment[] = [
  { id: 'en-1', courseId: 'demo-course', userId: 'u-1', enrolledAt: new Date().toISOString(), progress: 45, completedLessons: ['l-1'], lastAccessedAt: new Date().toISOString(),
    course: { id: 'demo-course', title: 'Guitar Foundations Bootcamp', description: 'Master the basics of rhythm and chords.', shortDescription: 'Play your first songs in 2 weeks.', thumbnail: '', category: 'music', subcategory: 'guitar', level: 'beginner', language: 'English', price: 0, instructor: { id: 'i-1', name: 'James Wilson', rating: 4.9 }, rating: 4.9, totalReviews: 832, totalStudents: 12420, totalLessons: 6, totalDuration: 78, modules: [], tags: ['guitar'], isPublished: true, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } },
  { id: 'en-2', courseId: 'course-tabla-101', userId: 'u-1', enrolledAt: new Date().toISOString(), progress: 15, completedLessons: ['l-1'], lastAccessedAt: new Date().toISOString(),
    course: { id: 'course-tabla-101', title: 'Tabla for Beginners', description: 'Comprehensive guide to tabla bols and rhythm.', shortDescription: 'Master the art of Indian percussion.', thumbnail: '', category: 'music', subcategory: 'tabla', level: 'beginner', language: 'Hindi', price: 0, instructor: { id: 'i-4', name: 'Pandit Rajan Misra', rating: 4.9 }, rating: 4.9, totalReviews: 612, totalStudents: 9800, totalLessons: 30, totalDuration: 480, modules: [], tags: ['tabla'], isPublished: true, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } },
  { id: 'en-3', courseId: 'course-bharatanatyam-101', userId: 'u-1', enrolledAt: new Date().toISOString(), progress: 5, completedLessons: [], lastAccessedAt: new Date().toISOString(),
    course: { id: 'course-bharatanatyam-101', title: 'Bharatanatyam Foundations', description: 'Traditional dance technique and posture.', shortDescription: 'Start your classical dance journey.', thumbnail: '', category: 'dance', subcategory: 'bharatanatyam', level: 'beginner', language: 'Tamil', price: 0, instructor: { id: 'i-12', name: 'Savitha Narayanan', rating: 4.9 }, rating: 4.9, totalReviews: 748, totalStudents: 11230, totalLessons: 36, totalDuration: 540, modules: [], tags: ['Bharatanatyam'], isPublished: true, isFeatured: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } },
];

const COURSE_EMOJI: Record<string, string> = {
  guitar: '🎸', tabla: '🥁', bharatanatyam: '🕍', hindustani: '🎤',
  piano: '🎹', sitar: '🪕', violin: '🎻', kathak: '🕍', bansuri: '🪈', default: '🎼',
};

const RECOMMENDED = [
  { id: 'course-carnatic-vocals-101', title: 'Carnatic Classical Vocals', instructor: 'Sudha Ragunathan', rating: 4.9, price: 1399, emoji: '🎶' },
  { id: 'course-bollywood-101', title: 'Bollywood Dance: Filmi Moves', instructor: 'Geeta Kapur', rating: 4.7, price: 899, emoji: '🎬' },
  { id: 'course-bansuri-101', title: 'Bansuri Flute: Indian Classical', instructor: 'Shri Hari Prasad', rating: 4.8, price: 999, emoji: '🪈' },
];
function StatCard({
  label, value, icon, gradient,
}: { label: string; value: string; icon: ReactNode; gradient?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className={`rounded-2xl p-5 ${gradient || 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className={`text-sm ${gradient ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{label}</p>
        <div className={gradient ? 'text-white/90' : 'text-primary-600 dark:text-primary-400'}>{icon}</div>
      </div>
      <p className={`text-3xl font-bold tracking-tight ${gradient ? 'text-white' : ''}`}>{value}</p>
    </motion.article>
  );
}

export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const { data, isLoading } = useMyCourses();

  const enrollments = data && data.length ? data : FALLBACK_ENROLLMENTS;
  const totalCourses = enrollments.length;
  const avgProgress = totalCourses ? Math.round(enrollments.reduce((s, i) => s + i.progress, 0) / totalCourses) : 0;
  const completedCourses = enrollments.filter((i) => i.progress >= 100).length;
  const totalMinutes = enrollments.reduce((s, i) => s + (i.course?.totalDuration || 0), 0);
  const inProgressCount = enrollments.filter((i) => i.progress > 0 && i.progress < 100).length;

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 text-white"
      >
        <p className="text-sm text-white/80 mb-1.5">Welcome back 🎵</p>
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          {user?.name ? `${user.name.split(' ')[0]}, keep learning!` : 'Keep your streak alive!'}
        </h1>
        <p className="max-w-2xl text-white/90 mb-6">
          You have {inProgressCount} course{inProgressCount !== 1 ? 's' : ''} in progress. Pick up where you left off!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to={ROUTES.STUDENT_MY_COURSES}
            className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-2.5 font-semibold text-sm hover:bg-gray-100 transition">
            My Courses <ArrowRight size={16} />
          </Link>
          <Link to={ROUTES.COURSES}
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 font-semibold text-sm hover:bg-white/10 transition">
            Discover More
          </Link>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Enrolled" value={String(totalCourses)} icon={<BookOpen size={18} />} />
        <StatCard label="Avg Progress" value={`${avgProgress}%`} icon={<Target size={18} />} />
        <StatCard label="Completed" value={String(completedCourses)} icon={<Trophy size={18} />} />
        <StatCard label="Time Learned" value={formatDuration(totalMinutes)} icon={<Clock3 size={18} />} />
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Continue Learning</h2>
          <Link to={ROUTES.STUDENT_MY_COURSES} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">View all</Link>
        </div>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading your courses...</p>
        ) : (
          <div className="space-y-3">
            {enrollments.slice(0, 3).map((item) => {
              const emoji = COURSE_EMOJI[item.course?.subcategory || ''] || COURSE_EMOJI.default;
              const isDone = item.progress >= 100;
              return (
                <motion.article key={item.id}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4 hover:border-primary-300 transition-colors">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-2xl shrink-0">{emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm truncate">{item.course?.title}</p>
                      {isDone && <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full shrink-0">✓ Done</span>}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{item.course?.instructor.name} • {item.course?.totalLessons} lessons</p>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${isDone ? 'bg-green-500' : 'gradient-bg'}`} style={{ width: `${Math.max(3, item.progress)}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.progress}% complete</p>
                  </div>
                  <Link to={ROUTES.STUDENT_COURSE_LEARNING.replace(':id', item.courseId)}
                    className="shrink-0 px-4 py-2 gradient-bg text-white text-sm font-semibold rounded-lg hover:opacity-90 transition">
                    {isDone ? 'Review' : 'Resume'}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <Link to={ROUTES.COURSES} className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">Browse all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RECOMMENDED.map((c) => (
            <Link key={c.id} to={ROUTES.COURSE_DETAIL.replace(':id', c.id)}>
              <motion.div whileHover={{ y: -3 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-primary-300 hover:shadow-md transition-all group">
                <div className="h-24 gradient-bg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">{c.emoji}</div>
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1 line-clamp-1">{c.title}</p>
                  <p className="text-xs text-gray-500 mb-2">{c.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold">{c.rating}</span>
                    </div>
                    <span className="text-sm font-bold text-primary-600">₹{c.price}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-xl font-bold mb-4">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COURSE_CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`${ROUTES.COURSES}?category=${cat.id}`}>
              <motion.div whileHover={{ y: -3 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-400 hover:shadow-md transition-all text-center">
                <span className="text-3xl">{cat.icon}</span>
                <p className="font-semibold text-sm mt-2">{cat.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">Explore courses</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
