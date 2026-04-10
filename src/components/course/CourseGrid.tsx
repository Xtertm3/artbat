import { CourseCard } from './CourseCard';
import type { Course } from '@/types';

interface CourseGridProps {
  courses: Course[];
  isLoading?: boolean;
  showProgress?: boolean;
  progresses?: Record<string, number>;
}

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
    <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
    </div>
  </div>
);

export function CourseGrid({ courses, isLoading, showProgress, progresses }: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🎵</p>
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-gray-500 text-base">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          showProgress={showProgress}
          progress={progresses?.[course.id]}
        />
      ))}
    </div>
  );
}
