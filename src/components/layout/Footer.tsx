import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { APP_FULL_NAME, APP_NAME } from '@/config/constants';
import { ROUTES } from '@/config/routes';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">L</span>
              <span className="text-white font-bold text-lg">{APP_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{APP_FULL_NAME} — Master Music, Dance & Theater from Home.</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[['About', ROUTES.ABOUT], ['Contact', ROUTES.CONTACT], ['Pricing', ROUTES.PRICING]].map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-white transition">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-sm">
              {[['🎸 Music', `${ROUTES.COURSES}?category=music`], ['💃 Dance', `${ROUTES.COURSES}?category=dance`], ['🎭 Theater', `${ROUTES.COURSES}?category=theater`]].map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-white transition">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {APP_FULL_NAME}. All rights reserved.</p>
          <p>Made with ❤️ for artists</p>
        </div>
      </div>
    </footer>
  );
}
