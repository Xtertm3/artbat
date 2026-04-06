import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ModuleWorkspace } from '@/components/common/ModuleWorkspace';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/authStore';

const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPassword'));
const LoginPage = lazy(() => import('@/pages/auth/Login'));
const RegisterPage = lazy(() => import('@/pages/auth/Register'));
const CourseDetailPage = lazy(() => import('@/pages/public/CourseDetail'));
const CoursesPage = lazy(() => import('@/pages/public/Courses'));
const ExploreArtsPage = lazy(() => import('@/pages/public/ExploreArts'));
const HomePage = lazy(() => import('@/pages/public/Home'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/Dashboard'));
const InstructorDashboardPage = lazy(() => import('@/pages/instructor/Dashboard'));
const StudentDashboardPage = lazy(() => import('@/pages/student/Dashboard'));
const StudentLearningPage = lazy(() => import('@/pages/student/Learning'));
const StudentMyCoursesPage = lazy(() => import('@/pages/student/MyCourses'));

function RouteSkeleton() {
  return (
    <div className="container py-12">
      <div className="h-6 w-52 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
      <div className="h-4 w-full max-w-xl rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-8" />
      <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    </div>
  );
}

const studentPages = [
  { path: ROUTES.STUDENT_SCHEDULE, title: 'Schedule' },
  { path: ROUTES.STUDENT_PRACTICE, title: 'Practice Zone' },
  { path: ROUTES.STUDENT_PROGRESS, title: 'Progress' },
  { path: ROUTES.STUDENT_CERTIFICATES, title: 'Certificates' },
  { path: ROUTES.STUDENT_COMMUNITY, title: 'Community' },
  { path: ROUTES.STUDENT_SETTINGS, title: 'Settings' },
];

const instructorPages = [
  { path: ROUTES.INSTRUCTOR_MY_COURSES, title: 'My Courses' },
  { path: ROUTES.INSTRUCTOR_CREATE_COURSE, title: 'Create Course' },
  { path: ROUTES.INSTRUCTOR_EDIT_COURSE, title: 'Edit Course' },
  { path: ROUTES.INSTRUCTOR_STUDENTS, title: 'Students' },
  { path: ROUTES.INSTRUCTOR_ANALYTICS, title: 'Analytics' },
  { path: ROUTES.INSTRUCTOR_EARNINGS, title: 'Earnings' },
  { path: ROUTES.INSTRUCTOR_LIVE, title: 'Live Sessions' },
  { path: ROUTES.INSTRUCTOR_MESSAGES, title: 'Messages' },
  { path: ROUTES.INSTRUCTOR_SETTINGS, title: 'Settings' },
];

const adminPages = [
  { path: ROUTES.ADMIN_USERS, title: 'Users' },
  { path: ROUTES.ADMIN_COURSES, title: 'Courses' },
  { path: ROUTES.ADMIN_INSTRUCTORS, title: 'Instructors' },
  { path: ROUTES.ADMIN_PAYMENTS, title: 'Payments' },
  { path: ROUTES.ADMIN_ANALYTICS, title: 'Analytics' },
  { path: ROUTES.ADMIN_SUPPORT, title: 'Support' },
  { path: ROUTES.ADMIN_ANNOUNCEMENTS, title: 'Announcements' },
  { path: ROUTES.ADMIN_SETTINGS, title: 'Settings' },
];

function AppRouter() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

      <Route
        path={ROUTES.COURSES}
        element={
          <PublicLayout>
            <CoursesPage />
          </PublicLayout>
        }
      />

      <Route
        path={ROUTES.EXPLORE_ARTS}
        element={
          <PublicLayout>
            <ExploreArtsPage />
          </PublicLayout>
        }
      />

      <Route
        path={ROUTES.COURSE_DETAIL}
        element={
          <PublicLayout>
            <CourseDetailPage />
          </PublicLayout>
        }
      />

      <Route
        path={ROUTES.STUDENT_DASHBOARD}
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout>
              <StudentDashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STUDENT_MY_COURSES}
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout>
              <StudentMyCoursesPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.STUDENT_COURSE_LEARNING}
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout>
              <StudentLearningPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.INSTRUCTOR_DASHBOARD}
        element={
          <ProtectedRoute allowedRoles={['instructor']}>
            <DashboardLayout>
              <InstructorDashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ADMIN_DASHBOARD}
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminDashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {studentPages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout>
                <ModuleWorkspace
                  title={page.title}
                  subtitle="Student module frontend is active. Detailed interactions and backend integration are being expanded."
                />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {instructorPages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <DashboardLayout>
                <ModuleWorkspace
                  title={page.title}
                  subtitle="Instructor workspace frontend is active. Course operations and analytics behaviors are being integrated."
                />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {adminPages.map((page) => (
        <Route
          key={page.path}
          path={page.path}
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <ModuleWorkspace
                  title={page.title}
                  subtitle="Admin operations frontend is active. Governance, data actions, and audit workflows are being integrated."
                />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      ))}

      <Route
        path={ROUTES.UNAUTHORIZED}
        element={
          <PublicLayout>
            <div className="container py-20 text-center">
              <h1 className="text-3xl font-bold mb-3">Unauthorized</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You do not have permission to view this page.
              </p>
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center rounded-lg px-4 py-2 gradient-bg text-white font-medium"
              >
                Go To Home
              </Link>
            </div>
          </PublicLayout>
        }
      />

      <Route
        path="*"
        element={
          <PublicLayout>
            <div className="container py-20 text-center">
              <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The page you are looking for does not exist.
              </p>
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center rounded-lg px-4 py-2 gradient-bg text-white font-medium"
              >
                Back To Home
              </Link>
            </div>
          </PublicLayout>
        }
      />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
