import { useNavigate } from 'react-router-dom';
import { Heart, Star, Clock, Users, BookOpen } from 'lucide-react';
import { cn, formatPrice, formatDuration, truncate } from '@/lib/utils';
import type { Course } from '@/types';
import { ROUTES } from '@/config/routes';
import { CURRENCY } from '@/config/constants';

interface CourseCardProps {
  course: Course;
  className?: string;
  showProgress?: boolean;
  progress?: number;
}

const LEVEL_COLORS = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function CourseCard({ course, className, showProgress, progress }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300', className)}
      onClick={() => navigate(ROUTES.COURSE_DETAIL.replace(':id', course.id))}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full gradient-bg flex items-center justify-center text-white text-4xl">
            {course.category === 'music' ? '🎸' : course.category === 'dance' ? '💃' : '🎭'}
          </div>
        )}
        {/* Level badge */}
        <span className={cn('absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize', LEVEL_COLORS[course.level])}>
          {course.level}
        </span>
        {/* Wishlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 w-9 h-9 bg-white/95 dark:bg-gray-900 rounded-full flex items-center justify-center shadow hover:text-red-500 transition"
        >
          <Heart size={15} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-base leading-snug mb-1.5 group-hover:text-primary-600 transition line-clamp-2">
          {truncate(course.title, 60)}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {course.instructor.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-semibold text-amber-600">{course.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-400">({course.totalReviews.toLocaleString()})</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 flex-wrap">
          <span className="flex items-center gap-1"><Clock size={14} />{formatDuration(course.totalDuration)}</span>
          <span className="flex items-center gap-1"><BookOpen size={14} />{course.totalLessons} lessons</span>
          <span className="flex items-center gap-1"><Users size={14} />{course.totalStudents.toLocaleString()}</span>
        </div>

        {/* Progress bar (enrolled courses) */}
        {showProgress && progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span><span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-lg text-primary-600">{formatPrice(course.price, CURRENCY)}</span>
          {course.originalPrice && course.originalPrice > course.price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(course.originalPrice, CURRENCY)}</span>
          )}
          {course.originalPrice && course.originalPrice > course.price && (
            <span className="text-xs font-semibold text-green-700 bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded">
              {Math.round((1 - course.price / course.originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
