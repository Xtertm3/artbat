import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Sun, Moon, Menu, LogOut, Settings, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useNotificationStore } from '@/store/notificationStore';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/config/constants';
import { getInitials } from '@/lib/utils';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useTranslation } from 'react-i18next';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { unreadCount } = useNotificationStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dashboardRoute = user?.role === 'instructor' ? ROUTES.INSTRUCTOR_DASHBOARD
    : user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD
    : ROUTES.STUDENT_DASHBOARD;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 lg:px-6 gap-4">
      {/* Hamburger (mobile) */}
      {onMenuClick && (
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu size={20} />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0 mr-4">
        <span className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-sm font-bold">L</span>
        <span className="hidden sm:block gradient-text">{APP_NAME}</span>
      </Link>

      {/* Main Nav */}
      <nav className="hidden lg:flex items-center gap-6 mr-4">
        <Link to={ROUTES.COURSES} className="text-sm font-medium hover:text-primary-600 transition">Courses</Link>
        <Link to={ROUTES.EXPLORE_ARTS} className="text-sm font-medium hover:text-primary-600 transition">Explore</Link>
        <Link to={ROUTES.PRICING} className="text-sm font-medium hover:text-primary-600 transition">Pricing</Link>
        <Link to={ROUTES.CONTACT} className="text-sm font-medium hover:text-primary-600 transition">Contact</Link>
      </nav>


      {/* Search */}
      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder={t('header.searchPlaceholder')}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            onKeyDown={(e) => e.key === 'Enter' && navigate(`${ROUTES.COURSES}?search=${(e.target as HTMLInputElement).value}`)}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Language selector */}
        <LanguageSelector />

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {isAuthenticated ? (
          <>
            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => navigate(ROUTES.STUDENT_DASHBOARD)}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user?.name || 'U')}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link to={dashboardRoute} onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <BookOpen size={16} /> {t('header.dashboard')}
                  </Link>
                  <Link to={`${dashboardRoute.split('/')[1]}/settings` as string} onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <Settings size={16} /> {t('header.settings')}
                  </Link>
                  <hr className="my-1 border-gray-100 dark:border-gray-800" />
                  <button onClick={() => { logout(); setProfileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition">
                    <LogOut size={16} /> {t('header.logout')}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">
              Login
            </Link>
            <Link to={ROUTES.REGISTER}
              className="px-4 py-2 text-sm font-semibold gradient-bg text-white rounded-lg hover:opacity-90 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
