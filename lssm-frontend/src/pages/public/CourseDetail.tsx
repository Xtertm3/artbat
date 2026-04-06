import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Users, Star, Clock } from 'lucide-react';
import { Curriculum } from '@/components/course/Curriculum';
import { Reviews } from '@/components/course/Reviews';
import { CURRENCY } from '@/config/constants';
import { getMockCourseById, MOCK_COURSES, MOCK_REVIEWS_BY_COURSE } from '@/config/mockData';
import { ROUTES } from '@/config/routes';
import { useCourse, useEnrollCourse } from '@/hooks/useCourses';
import { formatDuration, formatPrice } from '@/lib/utils';

export default function CourseDetailPage() {
  const { id = '' } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const { data } = useCourse(id);
  const { mutateAsync, isPending } = useEnrollCourse();

  const course = data || getMockCourseById(id) || MOCK_COURSES[0];
  const reviews = MOCK_REVIEWS_BY_COURSE[course.id] || [];

  const totalLessons = useMemo(
    () => course.modules.reduce((sum, module) => sum + module.lessons.length, 0),
    [course.modules]
  );

  const handleEnroll = async () => {
    try {
      await mutateAsync(course.id);
    } catch {
      // Frontend-first mode: keep UI responsive even if API is unavailable.
    }
  };

  return (
    <div className="container py-10 space-y-6">
      <Link to={ROUTES.COURSES} className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm text-gray-500 mb-2 capitalize">{course.category} • {course.level}</p>
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-5">{course.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating.toFixed(1)} ({course.totalReviews})</span>
            <span className="inline-flex items-center gap-1"><Users size={14} /> {course.totalStudents.toLocaleString()} students</span>
            <span className="inline-flex items-center gap-1"><Clock size={14} /> {formatDuration(course.totalDuration)}</span>
          </div>
        </article>

        <aside className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="text-3xl font-bold text-primary-600 mb-1">{formatPrice(course.price, CURRENCY)}</div>
          {!!course.originalPrice && course.originalPrice > course.price && (
            <div className="text-sm text-gray-400 line-through mb-4">{formatPrice(course.originalPrice, CURRENCY)}</div>
          )}

          <button
            onClick={handleEnroll}
            disabled={isPending}
            className="w-full h-11 rounded-lg gradient-bg text-white font-semibold mb-4 disabled:opacity-60"
          >
            {isPending ? 'Enrolling...' : 'Enroll Now'}
          </button>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} /> {totalLessons} lessons</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} /> Lifetime access</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 size={14} /> Instructor support</li>
          </ul>
        </aside>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'reviews', label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition',
                activeTab === tab.id
                  ? 'gradient-bg text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">What you will learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              {[
                'Build strong fundamentals with guided practice',
                'Track measurable progress across lessons',
                'Apply techniques in assignments and mini projects',
                'Prepare for advanced-level learning paths',
              ].map((item) => (
                <li key={item} className="inline-flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5" /> {item}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <Curriculum modules={course.modules} completedLessons={['l-1']} currentLessonId="l-2" />
        )}

        {activeTab === 'reviews' && (
          <Reviews reviews={reviews} rating={course.rating} totalReviews={course.totalReviews} />
        )}
      </section>
    </div>
  );
}
