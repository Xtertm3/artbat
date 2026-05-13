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

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={ROUTES.RESOURCES} className="hover:text-white transition">Online Music Resources</Link></li>
              <li><Link to={ROUTES.PROGRAMS} className="hover:text-white transition">Packages & Programs</Link></li>
              <li><Link to={ROUTES.BECOME_EDUCATOR} className="hover:text-white transition">Careers</Link></li>
              <li><Link to={ROUTES.ABOUT} className="hover:text-white transition">About Us</Link></li>
              <li><a href="https://www.spardhaidol.com/" target="_blank" rel="noreferrer" className="hover:text-white transition">Spardha Idol</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Available Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`${ROUTES.COURSES}?category=piano`} className="hover:text-white transition">Piano</Link></li>
              <li><Link to={`${ROUTES.COURSES}?category=acoustic-guitar`} className="hover:text-white transition">Acoustic Guitar</Link></li>
              <li><Link to={`${ROUTES.COURSES}?category=electronic-keyboard`} className="hover:text-white transition">Electronic Keyboard</Link></li>
              <li><Link to={`${ROUTES.COURSES}?category=bollywood-vocals`} className="hover:text-white transition">Bollywood Vocals</Link></li>
              <li><Link to={`${ROUTES.COURSES}?category=western-vocals`} className="hover:text-white transition">Western Vocals</Link></li>
              <li><Link to={`${ROUTES.COURSES}?category=bharatanatyam`} className="hover:text-white transition">Bharatanatyam Dance</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={ROUTES.CONTACT} className="hover:text-white transition">Help & Contact Us</Link></li>
              <li><Link to={ROUTES.FAQ} className="hover:text-white transition">FAQ's</Link></li>
              <li><Link to={ROUTES.TERMS_CONDITIONS} className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to={ROUTES.PRIVACY_POLICY} className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to={ROUTES.COOKIES_POLICY} className="hover:text-white transition">Cookies Policy</Link></li>
              <li><Link to={ROUTES.REFUND_POLICY} className="hover:text-white transition">Refund Policy</Link></li>
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
