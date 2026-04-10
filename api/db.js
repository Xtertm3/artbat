import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const HASH_ROUNDS = 10;

// Initialize database with seed data
export async function initializeDatabase() {
  // Check if admin user exists, if not, seed data
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@lssm.in' }
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', HASH_ROUNDS);
    await prisma.user.create({
      data: {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@lssm.in',
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      }
    });
  }

  const instructorExists = await prisma.user.findUnique({
    where: { email: 'instructor@lssm.in' }
  });

  if (!instructorExists) {
    const hashedPassword = await bcrypt.hash('instructor123', HASH_ROUNDS);
    await prisma.user.create({
      data: {
        id: 'instructor-1',
        name: 'Instructor User',
        email: 'instructor@lssm.in',
        password: hashedPassword,
        role: 'instructor',
        isVerified: true,
      }
    });
  }

  const studentExists = await prisma.user.findUnique({
    where: { email: 'student@lssm.in' }
  });

  if (!studentExists) {
    const hashedPassword = await bcrypt.hash('student123', HASH_ROUNDS);
    await prisma.user.create({
      data: {
        id: 'student-1',
        name: 'Student User',
        email: 'student@lssm.in',
        password: hashedPassword,
        role: 'student',
        isVerified: true,
      }
    });
  }

  // Seed courses if none exist
  const coursesCount = await prisma.course.count();
  if (coursesCount === 0) {
    await prisma.course.create({
      data: {
        id: 'course-1',
        title: 'Introduction to Digital Art',
        description: 'Learn the basics of digital art creation using modern tools and techniques.',
        shortDescription: 'Master digital art fundamentals',
        thumbnail: '/api/placeholder/400/250',
        category: 'Art & Design',
        subcategory: 'Digital Art',
        level: 'Beginner',
        language: 'English',
        price: 49.99,
        originalPrice: 99.99,
        instructorId: 'instructor-1',
        instructorName: 'Instructor User',
        instructorRating: 4.8,
        rating: 4.5,
        totalReviews: 128,
        totalStudents: 1250,
        totalLessons: 24,
        totalDuration: 480,
        modules: [
          { id: 'module-1', title: 'Getting Started', lessons: 6 },
          { id: 'module-2', title: 'Basic Tools', lessons: 8 },
          { id: 'module-3', title: 'Color Theory', lessons: 5 },
          { id: 'module-4', title: 'Projects', lessons: 5 }
        ],
        tags: ['digital art', 'photoshop', 'creativity'],
        isPublished: true,
        isFeatured: true,
      }
    });
  }
}

export async function getUserByEmail(email, includePassword = false) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: includePassword ? {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      avatar: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    } : {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    }
  });
  return user;
}

export async function createUser({ name, email, password, role }) {
  const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    }
  });
  return user.id;
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    }
  });
}

export async function getCourses(filters = {}) {
  const where = {
    isPublished: true,
  };

  if (filters.category) where.category = filters.category;
  if (filters.level) where.level = filters.level;
  if (filters.language) where.language = filters.language;
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } }
    ];
  }

  const courses = await prisma.course.findMany({
    where,
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return courses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    shortDescription: course.shortDescription,
    thumbnail: course.thumbnail,
    category: course.category,
    subcategory: course.subcategory,
    level: course.level,
    language: course.language,
    price: course.price.toNumber(),
    originalPrice: course.originalPrice.toNumber(),
    instructor: {
      id: course.instructor.id,
      name: course.instructor.name,
      rating: course.instructorRating.toNumber(),
    },
    rating: course.rating.toNumber(),
    totalReviews: course.totalReviews,
    totalStudents: course.totalStudents,
    totalLessons: course.totalLessons,
    totalDuration: course.totalDuration,
    modules: course.modules,
    tags: course.tags,
    isPublished: course.isPublished,
    isFeatured: course.isFeatured,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  }));
}

export async function getCourseById(id) {
  const course = await prisma.course.findUnique({
    where: { id, isPublished: true },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    }
  });

  if (!course) return null;

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    shortDescription: course.shortDescription,
    thumbnail: course.thumbnail,
    category: course.category,
    subcategory: course.subcategory,
    level: course.level,
    language: course.language,
    price: course.price.toNumber(),
    originalPrice: course.originalPrice.toNumber(),
    instructor: {
      id: course.instructor.id,
      name: course.instructor.name,
      rating: course.instructorRating.toNumber(),
    },
    rating: course.rating.toNumber(),
    totalReviews: course.totalReviews,
    totalStudents: course.totalStudents,
    totalLessons: course.totalLessons,
    totalDuration: course.totalDuration,
    modules: course.modules,
    tags: course.tags,
    isPublished: course.isPublished,
    isFeatured: course.isFeatured,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  };
}

export async function createEnrollment(userId, courseId) {
  const course = await getCourseById(courseId);
  if (!course) return null;

  const enrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId,
      progress: 0,
      completedLessons: [],
    },
    include: {
      course: true,
    }
  });

  return {
    id: enrollment.id,
    courseId: enrollment.courseId,
    userId: enrollment.userId,
    enrolledAt: enrollment.enrolledAt,
    progress: enrollment.progress,
    completedLessons: enrollment.completedLessons,
    lastAccessedAt: enrollment.lastAccessedAt,
    course,
  };
}

export async function getEnrollmentsByUser(userId) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              avatar: true,
            }
          }
        }
      }
    },
    orderBy: { enrolledAt: 'desc' }
  });

  return enrollments.map(enrollment => ({
    id: enrollment.id,
    courseId: enrollment.courseId,
    userId: enrollment.userId,
    enrolledAt: enrollment.enrolledAt,
    progress: enrollment.progress,
    completedLessons: enrollment.completedLessons,
    lastAccessedAt: enrollment.lastAccessedAt,
    course: {
      id: enrollment.course.id,
      title: enrollment.course.title,
      shortDescription: enrollment.course.shortDescription,
      thumbnail: enrollment.course.thumbnail,
      category: enrollment.course.category,
      subcategory: enrollment.course.subcategory,
      level: enrollment.course.level,
      language: enrollment.course.language,
      price: enrollment.course.price.toNumber(),
      originalPrice: enrollment.course.originalPrice.toNumber(),
      instructor: {
        id: enrollment.course.instructor.id,
        name: enrollment.course.instructor.name,
        rating: enrollment.course.instructorRating.toNumber(),
      },
      rating: enrollment.course.rating.toNumber(),
      totalReviews: enrollment.course.totalReviews,
      totalStudents: enrollment.course.totalStudents,
      totalLessons: enrollment.course.totalLessons,
      totalDuration: enrollment.course.totalDuration,
      modules: enrollment.course.modules,
      tags: enrollment.course.tags,
      isPublished: enrollment.course.isPublished,
      isFeatured: enrollment.course.isFeatured,
      createdAt: enrollment.course.createdAt,
      updatedAt: enrollment.course.updatedAt,
    }
  }));
}

export async function getEnrollmentByUserCourse(userId, courseId) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      }
    }
  });

  if (!enrollment) return null;

  return {
    id: enrollment.id,
    courseId: enrollment.courseId,
    userId: enrollment.userId,
    enrolledAt: enrollment.enrolledAt,
    progress: enrollment.progress,
    completedLessons: enrollment.completedLessons,
    lastAccessedAt: enrollment.lastAccessedAt,
  };
}

export async function completeLesson(userId, courseId, lessonId) {
  const enrollment = await getEnrollmentByUserCourse(userId, courseId);
  if (!enrollment) return null;

  const completedLessons = enrollment.completedLessons || [];
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  }

  const progress = Math.round((completedLessons.length / 24) * 100); // Assuming 24 lessons

  const updated = await prisma.enrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId,
      }
    },
    data: {
      completedLessons,
      progress,
      lastAccessedAt: new Date(),
    }
  });

  return {
    id: updated.id,
    courseId: updated.courseId,
    userId: updated.userId,
    enrolledAt: updated.enrolledAt,
    progress: updated.progress,
    completedLessons: updated.completedLessons,
    lastAccessedAt: updated.lastAccessedAt,
  };
}

export async function getReviewsByCourse(courseId) {
  const reviews = await prisma.review.findMany({
    where: { courseId },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return reviews.map(review => ({
    id: review.id,
    courseId: review.courseId,
    userId: review.userId,
    userName: review.user.name,
    userAvatar: review.user.avatar,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  }));
}

export async function createReview(courseId, userId, rating, comment) {
  const review = await prisma.review.create({
    data: {
      courseId,
      userId,
      rating,
      comment,
    }
  });

  return {
    id: review.id,
    courseId: review.courseId,
    userId: review.userId,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
}