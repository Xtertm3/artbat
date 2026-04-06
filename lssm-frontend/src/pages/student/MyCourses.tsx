import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, SlidersHorizontal } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useMyCourses } from '@/hooks/useCourses';
import { formatDuration } from '@/lib/utils';
import type { Enrollment } from '@/types';

const FALLBACK_ENROLLMENTS: Enrollment[] = [
  {
    id: 'demo-mc-1',
    courseId: 'c-101',
    userId: 'u-1',
    enrolledAt: new Date().toISOString(),
    progress: 42,
    completedLessons: ['l-1', 'l-2'],
    lastAccessedAt: new Date().toISOString(),
    course: {
      id: 'c-101',
      title: 'Guitar Foundations Bootcamp',
      description: 'A practical beginner path to rhythm, chords, and songs.',
      shortDescription: 'Play your first songs in 2 weeks.',
      thumbnail: '',
      category: 'music',
      subcategory: 'guitar',
      level: 'beginner',
      language: 'English',
      price: 0,
      instructor: { id: 'i-1', name: 'James Wilson', rating: 4.9 },
      rating: 4.9,
      totalReviews: 120,
      totalStudents: 3400,
      totalLessons: 36,
      totalDuration: 540,
      modules: [],
      tags: ['guitar', 'music'],
      isPublished: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'demo-mc-2',
    courseId: 'c-202',
    userId: 'u-1',
    enrolledAt: new Date().toISOString(),
    progress: 18,
    completedLessons: ['l-1'],
    lastAccessedAt: new Date().toISOString(),
    course: {
      id: 'c-202',
      title: 'Hip Hop Dance Starter',
      description: 'Learn grooves, isolations, and choreography basics.',
      shortDescription: 'Build confidence and flow.',
      thumbnail: '',
      category: 'dance',
      subcategory: 'hip-hop',
      level: 'beginner',
      language: 'English',
      price: 0,
      instructor: { id: 'i-2', name: 'Priya Sharma', rating: 4.8 },
      rating: 4.8,
      totalReviews: 85,
      totalStudents: 2700,
      totalLessons: 24,
      totalDuration: 420,
      modules: [],
      tags: ['dance', 'movement'],
      isPublished: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'demo-mc-3',
    courseId: 'c-303',
    userId: 'u-1',
    enrolledAt: new Date().toISOString(),
    progress: 100,
    completedLessons: ['l-1', 'l-2', 'l-3'],
    lastAccessedAt: new Date().toISOString(),
    course: {
      id: 'c-303',
      title: 'Theater Voice and Presence',
      description: 'Train projection, diction, and stage confidence.',
      shortDescription: 'Build a compelling stage voice.',
      thumbnail: '',
      category: 'theater',
      subcategory: 'voice',
      level: 'intermediate',
      language: 'English',
      price: 0,
      instructor: { id: 'i-3', name: 'Asha Kapoor', rating: 4.7 },
      rating: 4.7,
      totalReviews: 63,
      totalStudents: 1600,
      totalLessons: 18,
      totalDuration: 300,
      modules: [],
      tags: ['theater', 'voice'],
      isPublished: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

type ProgressFilter = 'all' | 'in-progress' | 'completed' | 'not-started';

function matchesFilter(progress: number, filter: ProgressFilter) {
  if (filter === 'completed') return progress >= 100;
  if (filter === 'not-started') return progress === 0;
  if (filter === 'in-progress') return progress > 0 && progress < 100;
  return true;
}

export default function StudentMyCoursesPage() {
  const { data, isLoading } = useMyCourses();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ProgressFilter>('all');

  const enrollments = data && data.length ? data : FALLBACK_ENROLLMENTS;

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return enrollments.filter((item) => {
      const title = item.course?.title?.toLowerCase() || '';
      const instructor = item.course?.instructor?.name?.toLowerCase() || '';
      const searchMatch = !search || title.includes(search) || instructor.includes(search);
      return searchMatch && matchesFilter(item.progress, filter);
    });
  }, [enrollments, filter, query]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-400">Track progress and resume your learning anytime.</p>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="relative lg:col-span-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course title or instructor"
              className="w-full h-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ProgressFilter)}
              className="w-full h-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All courses</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="not-started">Not started</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-gray-500">
            Loading your learning space...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-10 text-center">
            <BookOpen size={28} className="mx-auto mb-3 text-gray-400" />
            <h2 className="font-semibold text-lg mb-1">No matching courses</h2>
            <p className="text-sm text-gray-500 mb-5">Try changing search or filter settings.</p>
            <Link
              to={ROUTES.COURSES}
              className="inline-flex items-center rounded-lg px-4 py-2 gradient-bg text-white font-medium"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold mb-1">{item.course?.title || 'Untitled Course'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.course?.instructor.name || 'Unknown Instructor'}
                    {' '}| {item.course?.totalLessons || 0} lessons | {formatDuration(item.course?.totalDuration || 0)}
                  </p>
                </div>

                <Link
                  to={ROUTES.STUDENT_COURSE_LEARNING.replace(':id', item.courseId)}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-2 gradient-bg text-white font-semibold"
                >
                  {item.progress >= 100 ? 'Review Course' : 'Resume Learning'}
                </Link>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <div className="h-full gradient-bg" style={{ width: `${Math.max(2, item.progress)}%` }} />
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
