import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Sun, Moon, Menu, LogOut, Settings, BookOpen, ChevronDown } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 flex items-center px-4 lg:px-6 gap-4 transition-all duration-300">
      {/* Hamburger (mobile) */}
      {onMenuClick && (
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 active:scale-95 transition-all">
          <Menu size={20} />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0 mr-4 group">
        <span className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">L</span>
        <span className="hidden sm:block gradient-text tracking-tight group-hover:opacity-80 transition-opacity">{APP_NAME}</span>
      </Link>

      {/* Main Nav */}
      <nav className="hidden lg:flex items-center gap-6 mr-4">
        <div className="relative group/courses">
          <button className="flex items-center gap-1 text-sm font-medium hover:text-primary-600 transition py-4">
            Courses <ChevronDown size={14} className="group-hover/courses:rotate-180 transition-transform" />
          </button>
          
          {/* Mega Menu Dropdown */}
          <div className="absolute top-full left-0 w-[600px] bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 p-6 opacity-0 invisible group-hover/courses:opacity-100 group-hover/courses:visible transition-all duration-300 grid grid-cols-3 gap-6 translate-y-2 group-hover/courses:translate-y-0">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Instruments</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={`${ROUTES.COURSES}?category=piano`} className="hover:text-primary-600 transition">Piano</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=acoustic-guitar`} className="hover:text-primary-600 transition">Acoustic Guitar</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=electronic-keyboard`} className="hover:text-primary-600 transition">Electronic Keyboard</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=ukulele`} className="hover:text-primary-600 transition">Ukulele</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=violin`} className="hover:text-primary-600 transition">Violin</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=electric-guitar`} className="hover:text-primary-600 transition">Electric Guitar</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=flute`} className="hover:text-primary-600 transition">Flute</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=tabla`} className="hover:text-primary-600 transition">Tabla</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Vocals</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={`${ROUTES.COURSES}?category=bollywood-vocals`} className="hover:text-primary-600 transition">Bollywood Vocals</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=western-vocals`} className="hover:text-primary-600 transition">Western Vocals</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=hindustani-vocals`} className="hover:text-primary-600 transition">Hindustani Vocals</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=carnatic-vocals`} className="hover:text-primary-600 transition">Carnatic Vocals</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=regional-vocals`} className="hover:text-primary-600 transition">Regional Film Music</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">Dance</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={`${ROUTES.COURSES}?category=bharatanatyam`} className="hover:text-primary-600 transition">Bharatanatyam</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=bollywood-dance`} className="hover:text-primary-600 transition">Bollywood Dance</Link></li>
                <li><Link to={`${ROUTES.COURSES}?category=kathak`} className="hover:text-primary-600 transition">Kathak</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <Link to={ROUTES.ABOUT} className="text-sm font-medium hover:text-primary-600 transition">About</Link>
        <Link to={ROUTES.RESOURCES} className="text-sm font-medium hover:text-primary-600 transition">Resources</Link>
        <Link to={ROUTES.PROGRAMS} className="text-sm font-medium hover:text-primary-600 transition">Programs</Link>
        <Link to={ROUTES.CONTACT} className="text-sm font-medium hover:text-primary-600 transition">Support</Link>
        <Link to={ROUTES.BECOME_EDUCATOR} className="text-sm font-medium hover:text-primary-600 transition">Teach with Us</Link>
      </nav>


      {/* Search */}
      <div className="flex-1 max-w-md mx-auto hidden md:block group">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            placeholder={t('header.searchPlaceholder')}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all backdrop-blur-sm"
            onKeyDown={(e) => e.key === 'Enter' && navigate(`${ROUTES.COURSES}?search=${(e.target as HTMLInputElement).value}`)}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Language selector */}
        <LanguageSelector />

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 active:scale-95 transition-all">
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-primary-600" />}
        </button>

        {isAuthenticated ? (
          <>
            {/* Notifications */}
            <button
              className="relative p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 active:scale-95 transition-all"
              onClick={() => navigate(ROUTES.STUDENT_DASHBOARD)}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold ring-2 ring-white dark:ring-gray-900">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 active:scale-95 transition-all ring-primary-500/20 hover:ring-4"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500/50" />
                ) : (
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/20">
                    {getInitials(user?.name || 'U')}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
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
            <Link to={ROUTES.TRIAL}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition items-center">
              Book a Free Trial
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
