import { useMemo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Curriculum } from '@/components/course/Curriculum';
import { LessonPlayer } from '@/components/student/LessonPlayer';
import { ROUTES } from '@/config/routes';
import { useCourse, useMarkLessonComplete } from '@/hooks/useCourses';
import { formatDuration } from '@/lib/utils';
import type { Course, Lesson } from '@/types';

export default function StudentLearningPage() {
  const { id = '' } = useParams();
  const { data: course, isLoading, isError } = useCourse(id);
  const { mutateAsync } = useMarkLessonComplete();
  const allLessons = useMemo(() => course?.modules?.flatMap((m) => m.lessons) || [], [course?.modules]);
  const [currentLessonId, setCurrentLessonId] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (allLessons.length > 0 && !currentLessonId) {
      setCurrentLessonId(allLessons[0].id);
    }
  }, [allLessons, currentLessonId]);

  const currentLesson = allLessons.find((lesson) => lesson.id === currentLessonId) || allLessons[0];
  const completion = allLessons.length
    ? Math.round((completedLessons.length / allLessons.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-primary-500" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-gray-500 mb-6">The course you are looking for might have been removed or moved.</p>
        <Link to={ROUTES.STUDENT_MY_COURSES} className="px-6 py-3 gradient-bg text-white rounded-xl font-bold">
          Back to My Courses
        </Link>
      </div>
    );
  }

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
  };

  const markCurrentLessonComplete = async () => {
    if (!currentLesson || completedLessons.includes(currentLesson.id)) return;

    setCompletedLessons((prev) => [...prev, currentLesson.id]);
    try {
      await mutateAsync({ courseId: course.id, lessonId: currentLesson.id });
    } catch {
      // Keep local progress for frontend-first flow when backend is unavailable.
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <section className="xl:col-span-2 space-y-6">
        <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Now Learning</p>
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{course.shortDescription}</p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {course.totalLessons} lessons | {formatDuration(course.totalDuration)} total | {course.instructor.name}
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Lesson</p>
              <h2 className="text-xl font-bold">{currentLesson?.title || 'Select a lesson'}</h2>
            </div>
            <button
              onClick={markCurrentLessonComplete}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 gradient-bg text-white font-semibold"
            >
              <CheckCircle2 size={16} /> Mark Complete
            </button>
          </div>

          <LessonPlayer 
            videoUrl={currentLesson?.videoUrl} 
            title={currentLesson?.title} 
            onEnded={markCurrentLessonComplete}
          />
        </article>
      </section>

      <aside className="space-y-6">
        <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <p className="text-sm text-gray-500 mb-2">Course Progress</p>
          <p className="text-3xl font-bold mb-3">{completion}%</p>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden mb-3">
            <div className="h-full gradient-bg" style={{ width: `${Math.max(2, completion)}%` }} />
          </div>
          <p className="text-xs text-gray-500">{completedLessons.length} of {allLessons.length} lessons completed</p>
        </article>

        <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Curriculum</h3>
            <Link to={ROUTES.STUDENT_MY_COURSES} className="text-sm text-primary-600 dark:text-primary-400 font-medium">
              Back
            </Link>
          </div>
          <Curriculum
            modules={course.modules}
            completedLessons={completedLessons}
            currentLessonId={currentLesson?.id}
            onLessonClick={handleLessonClick}
          />
        </article>
      </aside>
    </div>
  );
}
