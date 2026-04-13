import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, BookOpen, Calendar, Target, BarChart2, Award, Users, MessageSquare,
  Settings, LogOut, PlusCircle, DollarSign, ShieldCheck, Bell, X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/routes';
import { getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

const studentLinks = [
  { to: ROUTES.STUDENT_DASHBOARD, icon: Home, label: 'Dashboard' },
  { to: ROUTES.STUDENT_MY_COURSES, icon: BookOpen, label: 'My Courses' },
  { to: ROUTES.STUDENT_PRACTICE, icon: Target, label: 'Practice Zone' },
  { to: '/student/assignments', icon: Award, label: 'Assignments' }, // Using hardcoded path for now until routes.ts is updated
  { to: ROUTES.STUDENT_SCHEDULE, icon: Calendar, label: 'Schedule' },
  { to: ROUTES.STUDENT_PROGRESS, icon: BarChart2, label: 'Progress' },
  { to: ROUTES.STUDENT_CERTIFICATES, icon: Award, label: 'Certificates' },
  { to: ROUTES.STUDENT_COMMUNITY, icon: Users, label: 'Community' },
  { to: ROUTES.STUDENT_SETTINGS, icon: Settings, label: 'Settings' },
];

const instructorLinks = [
  { to: ROUTES.INSTRUCTOR_DASHBOARD, icon: Home, label: 'Dashboard' },
  { to: ROUTES.INSTRUCTOR_MY_COURSES, icon: BookOpen, label: 'My Courses' },
  { to: ROUTES.INSTRUCTOR_CREATE_COURSE, icon: PlusCircle, label: 'Create Course' },
  { to: ROUTES.INSTRUCTOR_STUDENTS, icon: Users, label: 'Students' },
  { to: ROUTES.INSTRUCTOR_ANALYTICS, icon: BarChart2, label: 'Analytics' },
  { to: ROUTES.INSTRUCTOR_EARNINGS, icon: DollarSign, label: 'Earnings' },
  { to: ROUTES.INSTRUCTOR_MESSAGES, icon: MessageSquare, label: 'Messages' },
  { to: ROUTES.INSTRUCTOR_SETTINGS, icon: Settings, label: 'Settings' },
];

const adminLinks = [
  { to: ROUTES.ADMIN_DASHBOARD, icon: Home, label: 'Dashboard' },
  { to: ROUTES.ADMIN_USERS, icon: Users, label: 'Users' },
  { to: ROUTES.ADMIN_COURSES, icon: BookOpen, label: 'Courses' },
  { to: ROUTES.ADMIN_INSTRUCTORS, icon: ShieldCheck, label: 'Instructors' },
  { to: ROUTES.ADMIN_PAYMENTS, icon: DollarSign, label: 'Payments' },
  { to: ROUTES.ADMIN_ANALYTICS, icon: BarChart2, label: 'Analytics' },
  { to: ROUTES.ADMIN_SUPPORT, icon: Bell, label: 'Support' },
  { to: ROUTES.ADMIN_SETTINGS, icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const links = user?.role === 'instructor' ? instructorLinks
    : user?.role === 'admin' ? adminLinks
    : studentLinks;

  return (
    <>
      {/* Overlay on mobile */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside className={cn(
        'fixed left-0 top-16 bottom-0 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-40 flex flex-col transition-all duration-300 shadow-xl shadow-black/5',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Mobile close */}
        <button onClick={onClose} className="absolute top-3 right-3 lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <X size={18} />
        </button>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 pt-4">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] group',
                isActive
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold shadow-sm ring-1 ring-primary-500/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <Icon size={18} className={cn("transition-transform group-hover:scale-110")} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-800/20">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-primary-500/20">
              {getInitials(user?.name || 'U')}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
