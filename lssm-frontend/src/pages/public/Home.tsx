import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroAnimations from '@/components/home/HeroAnimations';
import { useRef } from 'react';
import { ArrowRight, Star, Play, CheckCircle, Music, Users, BookOpen, Award } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { PLATFORM_STATS, COURSE_CATEGORIES, CURRENCY } from '@/config/constants';

const FEATURED_COURSES = [
  { id: 'course-tabla-101', title: 'Tabla for Beginners', instructor: 'Pandit Rajan Misra', rating: 4.9, price: 1299, originalPrice: 2499, category: 'music', emoji: '🥁', reviews: 612 },
  { id: 'course-bharatanatyam-101', title: 'Bharatanatyam Foundations', instructor: 'Savitha Narayanan', rating: 4.9, price: 1299, originalPrice: 2499, category: 'dance', emoji: '🕍', reviews: 748 },
  { id: 'course-hindustani-101', title: 'Hindustani Classical Vocals', instructor: 'Pt. Jasraj Das', rating: 5.0, price: 1499, originalPrice: 2999, category: 'vocals', emoji: '🎤', reviews: 934 },
  { id: 'course-piano-101', title: 'Piano: From Zero to Hero', instructor: 'Michael Chen', rating: 5.0, price: 1999, originalPrice: 3999, category: 'music', emoji: '🎹', reviews: 1203 },
];

const TESTIMONIALS = [
  { id: '1', name: 'Rahul Mehta', course: 'Guitar Foundations', text: 'Transformed my guitar skills in just 3 months. The structured lessons are incredible!', rating: 5 },
  { id: '2', name: 'Kavya Pillai', course: 'Bharatanatyam', text: 'Savitha madam\'s teaching is so detailed. I learned proper adavus from scratch at home!', rating: 5 },
  { id: '3', name: 'Vikram Gupta', course: 'Hindustani Vocals', text: 'The riyaz structure and raga explanations are exactly what I needed. Best platform ever!', rating: 5 },
];

const INSTRUCTORS = [
  { id: '1', name: 'Pandit Rajan Misra', specialty: 'Tabla & Hindustani Percussion', rating: 4.9, students: 9800, emoji: '🥁' },
  { id: '2', name: 'Savitha Narayanan', specialty: 'Bharatanatyam & Classical Dance', rating: 4.9, students: 11230, emoji: '💃' },
  { id: '3', name: 'Pt. Jasraj Das', specialty: 'Hindustani Classical Vocals', rating: 5.0, students: 15800, emoji: '🎤' },
  { id: '4', name: 'Michael Chen', specialty: 'Piano & Music Theory', rating: 5.0, students: 18900, emoji: '🎹' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 } }),
};

function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center flex flex-col items-center gap-2"
    >
      <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center shadow-lg mb-1">
        <Icon size={24} className="text-white" />
      </div>
      <p className="text-3xl lg:text-4xl font-bold gradient-text">{value}</p>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">

        {/* Gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950" />
        <div className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 70%, #8B5CF6 0%, transparent 50%)' }} />

          <HeroAnimations />

          <div className="relative container text-center max-w-4xl mx-auto z-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              India's Premier Online Arts Academy
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Master{' '}
            <span className="gradient-text">Music</span>,{' '}
            <span className="gradient-text">Dance</span>
            <br />& <span className="gradient-text">Vocals</span> from Home
          </h1>

          <p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Learn Tabla, Bharatanatyam, Hindustani Vocals, Piano, Kathak & 50+ more arts from world-class instructors. Structured, live, and self-paced options.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to={ROUTES.COURSES}
              className="group flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition shadow-xl shadow-primary-500/30">
              Explore All Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to={ROUTES.LOGIN}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-semibold text-lg hover:border-primary-400 transition shadow-md">
              <Play size={18} className="text-primary-600" /> Try Demo for Free
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500"
          >
            {['No credit card required', 'Free 7-day trial', 'Certificate included'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedStat value={PLATFORM_STATS.students} label="Happy Students" icon={Users} />
            <AnimatedStat value={PLATFORM_STATS.courses} label="Courses Available" icon={BookOpen} />
            <AnimatedStat value={PLATFORM_STATS.instructors} label="Expert Instructors" icon={Music} />
            <AnimatedStat value={PLATFORM_STATS.satisfaction} label="Satisfaction Rate" icon={Award} />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choose Your Category</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Clean and focused paths for Music, Dance, Vocals, and Theater.</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {COURSE_CATEGORIES.map((cat, i) => (
            <div key={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 lg:p-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900"
              >
                <span className="text-5xl lg:text-6xl mb-4 block">{cat.icon}</span>
                <h3 className="text-lg font-bold mb-1">{cat.label}</h3>
                <p className="text-gray-500 text-xs">Focused learning path</p>
              </motion.div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            to={ROUTES.EXPLORE_ARTS}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 gradient-bg text-white font-semibold"
          >
            View More <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── FEATURED COURSES ─────────────────────────── */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Trending Courses</h2>
            <p className="text-gray-500">Hand-picked by our experts — loved by thousands</p>
          </div>
          <Link to={ROUTES.COURSES} className="flex items-center gap-1 text-primary-600 font-medium hover:gap-2 transition-all text-sm">
            View all <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <Link to={ROUTES.COURSE_DETAIL.replace(':id', course.id)}>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all group">
                  <div className="aspect-video gradient-bg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                    {course.emoji}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold">{course.rating}</span>
                      <span className="text-xs text-gray-400">({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-600">{CURRENCY}{course.price}</span>
                        <span className="text-xs text-gray-400 line-through">{CURRENCY}{course.originalPrice}</span>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        {Math.round((1 - course.price / (course.originalPrice || 1)) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-500">Get started in 3 simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '01', emoji: '🔍', title: 'Choose Your Art', desc: 'Browse 100+ courses across music, dance, and vocal styles' },
              { step: '02', emoji: '📝', title: 'Enroll & Pay', desc: 'Secure one-time payment in ₹. Instant lifetime access.' },
              { step: '03', emoji: '🎓', title: 'Learn & Earn', desc: 'Practice at your pace and earn a verified certificate' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
                >{item.emoji}</motion.div>
                <span className="text-xs font-bold text-primary-500 tracking-widest">STEP {item.step}</span>
                <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUCTORS ──────────────────────────────── */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Your Instructors</h2>
          <p className="text-gray-500">World-class artists dedicated to your growth</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCTORS.map((inst, i) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all"
            >
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-4xl mx-auto mb-3 shadow-md">{inst.emoji}</div>
              <h4 className="font-semibold text-sm">{inst.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{inst.specialty}</p>
              <div className="flex items-center justify-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold">{inst.rating}</span>
                <span className="text-xs text-gray-400">• {inst.students.toLocaleString()} students</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-gray-500">Real stories from our learners across India</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.course}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
        <div className="container text-center text-white relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Start Your Learning Journey Today</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Join 50,000+ students mastering their passion. Instant access to all courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to={ROUTES.REGISTER}
                className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold hover:bg-gray-100 transition shadow-xl">
                Get Started Free
              </Link>
              <Link to={ROUTES.COURSES}
                className="px-8 py-4 border-2 border-white/50 text-white rounded-2xl font-semibold hover:border-white hover:bg-white/10 transition">
                Browse Courses
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
              {['No credit card required', 'Cancel anytime', 'Certificate included', 'Lifetime access'].map(t => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle size={14} /> {t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


