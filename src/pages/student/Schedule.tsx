import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, Video, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useMyCourses } from '@/hooks/useCourses';
import { format } from 'date-fns';

export default function StudentSchedulePage() {
  const { data: enrollments } = useMyCourses();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const upcomingSessions = [
    { 
      id: 's-1', 
      title: 'Theory Q&A: Ragas & Talas', 
      instructor: 'Pandit Rajan Misra', 
      date: new Date(Date.now() + 86400000 * 2), // 2 days later
      type: 'Group Class',
      course: 'Tabla for Beginners'
    },
    { 
      id: 's-2', 
      title: 'Performance Critique', 
      instructor: 'James Wilson', 
      date: new Date(Date.now() + 86400000 * 5), // 5 days later
      type: '1:1 Mentorship',
      course: 'Guitar Foundations Bootcamp'
    }
  ];

  const paidCourses = enrollments?.filter(e => e.course?.price === 0 || e.id.includes('en-')) || [];

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setBookingStep(2);
      setTimeout(() => {
        setIsBooking(false);
        setBookingStep(1);
        setSelectedCourse(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <motion.section 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 lg:p-10 bg-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Users size={12} /> Personalized Learning
            </div>
            <h1 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">Book Your <span className="text-primary-400">1:1 Mentorship</span></h1>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connect with world-class faculty for personalized feedback, doubt clearing, and career guidance tailored to your artistic journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Video size={16} className="text-primary-500" /> Live HD Sessions
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={16} className="text-primary-500" /> Flexible Timing
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto shrink-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-full md:w-80">
              <p className="text-sm font-bold mb-4">Book a Session</p>
              <div className="space-y-4">
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={selectedCourse || ''}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select a Course</option>
                  {paidCourses.map(e => (
                    <option key={e.id} value={e.course?.title}>{e.course?.title}</option>
                  ))}
                </select>
                <button 
                  disabled={!selectedCourse || isBooking}
                  onClick={handleBook}
                  className="w-full h-12 gradient-bg rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition transform active:scale-95"
                >
                  {isBooking ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {bookingStep === 1 ? 'Booking...' : 'Success!'}
                    </>
                  ) : (
                    <>Book Now <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
            <button className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline">Sync to Calendar</button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session, idx) => (
              <motion.article
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={session.id}
                className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary-500/30 transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{format(session.date, 'MMM')}</span>
                      <span className="text-xl font-black text-primary-600 leading-none">{format(session.date, 'dd')}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary-600 transition">{session.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{session.course} • With {session.instructor}</p>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                          {session.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} /> {format(session.date, 'hh:mm a')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Join Session
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold px-2">Mentor Spotlight</h2>
          <div className="p-6 rounded-3xl bg-primary-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mb-4 flex items-center justify-center">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">ArtBeat Mentors</h4>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Our faculty consists of Bharat Ratna nominees and Grammy artists. Every minute spent with them is a step towards greatness.
              </p>
              <div className="space-y-3">
                {['Live Feedback', 'Career Roadmaps', 'Technical Fixes'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 size={14} className="text-white/60" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
