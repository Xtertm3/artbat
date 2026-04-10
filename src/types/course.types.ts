export type CourseCategory = 'music' | 'dance' | 'theater' | 'vocals';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'video' | 'live' | 'assignment' | 'quiz';

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  previewVideo?: string;
  category: CourseCategory;
  subcategory: string;
  level: SkillLevel;
  language: string;
  price: number;
  originalPrice?: number;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalLessons: number;
  totalDuration: number;
  modules: Module[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: number;
  videoUrl?: string;
  isPreview: boolean;
  isCompleted?: boolean;
  order: number;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'document' | 'link';
  url: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  lastAccessedAt?: string;
  course?: Course;
}

export interface Review {
  id: string;
  courseId: string;
  user: { id: string; name: string; avatar?: string };
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
}

export interface CourseFilters {
  category?: CourseCategory;
  level?: SkillLevel;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  search?: string;
  language?: string;
  subcategory?: string;
  sortBy?: 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating';
  page?: number;
  limit?: number;
}
