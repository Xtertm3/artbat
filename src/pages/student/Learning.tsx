import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, PlayCircle } from 'lucide-react';
import { Curriculum } from '@/components/course/Curriculum';
import { ROUTES } from '@/config/routes';
import { useCourse, useMarkLessonComplete } from '@/hooks/useCourses';
import { formatDuration } from '@/lib/utils';
import type { Course, Lesson } from '@/types';

function buildFallbackCourse(id: string): Course {
  return {
    id,
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
    totalLessons: 6,
    totalDuration: 78,
    tags: ['guitar', 'music'],
    isPublished: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: 'm-1',
        title: 'Getting Started',
        order: 1,
        lessons: [
          { id: 'l-1', title: 'Welcome and Setup', type: 'video', duration: 8, isPreview: true, order: 1 },
          { id: 'l-2', title: 'Posture and Hand Position', type: 'video', duration: 12, isPreview: false, order: 2 },
          { id: 'l-3', title: 'First Chords Practice', type: 'assignment', duration: 10, isPreview: false, order: 3 },
        ],
      },
      {
        id: 'm-2',
        title: 'Rhythm and Flow',
        order: 2,
        lessons: [
          { id: 'l-4', title: 'Strumming Patterns', type: 'video', duration: 14, isPreview: false, order: 1 },
          { id: 'l-5', title: 'Song Walkthrough', type: 'video', duration: 18, isPreview: false, order: 2 },
          { id: 'l-6', title: 'Weekly Progress Check', type: 'quiz', duration: 16, isPreview: false, order: 3 },
        ],
      },
    ],
  };
}

export default function StudentLearningPage() {
  const { id = 'demo-course' } = useParams();
  const { data } = useCourse(id);
  const { mutateAsync } = useMarkLessonComplete();

  const course = data || buildFallbackCourse(id);
  const allLessons = useMemo(() => course.modules.flatMap((m) => m.lessons), [course.modules]);
  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0]?.id || '');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l-1']);

  const currentLesson = allLessons.find((lesson) => lesson.id === currentLessonId) || allLessons[0];
  const completion = allLessons.length
    ? Math.round((completedLessons.length / allLessons.length) * 100)
    : 0;

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

          <div className="rounded-xl bg-gray-100 dark:bg-gray-800 h-56 flex items-center justify-center text-center p-6">
            <div>
              <PlayCircle size={34} className="mx-auto mb-3 text-primary-600" />
              <p className="font-semibold">Lesson player UI placeholder</p>
              <p className="text-sm text-gray-500 mt-1">
                Video, quiz, and assignment rendering will be connected in the next frontend pass.
              </p>
            </div>
          </div>
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
