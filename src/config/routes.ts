export const ROUTES = {
  // Public
  HOME: '/',
  EXPLORE_ARTS: '/explore-arts',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  INSTRUCTOR_PROFILE: '/instructors/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRICING: '/pricing',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',

  // Student
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_MY_COURSES: '/student/my-courses',
  STUDENT_COURSE_LEARNING: '/student/courses/:id/learn',
  STUDENT_ASSIGNMENTS: '/student/assignments',
  STUDENT_SCHEDULE: '/student/schedule',
  STUDENT_PRACTICE: '/student/practice',
  STUDENT_PROGRESS: '/student/progress',
  STUDENT_CERTIFICATES: '/student/certificates',
  STUDENT_COMMUNITY: '/student/community',
  STUDENT_SETTINGS: '/student/settings',

  // Instructor
  INSTRUCTOR_DASHBOARD: '/instructor/dashboard',
  INSTRUCTOR_MY_COURSES: '/instructor/my-courses',
  INSTRUCTOR_CREATE_COURSE: '/instructor/create-course',
  INSTRUCTOR_EDIT_COURSE: '/instructor/courses/:id/edit',
  INSTRUCTOR_STUDENTS: '/instructor/students',
  INSTRUCTOR_ANALYTICS: '/instructor/analytics',
  INSTRUCTOR_EARNINGS: '/instructor/earnings',
  INSTRUCTOR_LIVE: '/instructor/live',
  INSTRUCTOR_MESSAGES: '/instructor/messages',
  INSTRUCTOR_SETTINGS: '/instructor/settings',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_INSTRUCTORS: '/admin/instructors',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SUPPORT: '/admin/support',
  ADMIN_ANNOUNCEMENTS: '/admin/announcements',
  ADMIN_SETTINGS: '/admin/settings',

  // Payment
  CHECKOUT: '/checkout/:courseId',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILED: '/payment/failed',

  // Errors
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
} as const;
