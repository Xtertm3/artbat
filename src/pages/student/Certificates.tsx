import { motion } from 'framer-motion';
import { Award, Download, Share2, Search, Filter, Lock } from 'lucide-react';
import { APP_NAME } from '@/config/constants';

export default function StudentCertificatesPage() {
  const earnedCertificates = [
    {
      id: 'cert-1',
      title: 'Guitar Foundations',
      instructor: 'James Wilson',
      date: 'March 15, 2026',
      grade: 'A+',
      tier: 'Gold',
      icon: '🎸'
    },
    {
      id: 'cert-2',
      title: 'Introduction to Rhythm',
      instructor: 'Pandit Rajan Misra',
      date: 'April 02, 2026',
      grade: 'A',
      tier: 'Silver',
      icon: '🥁'
    }
  ];

  const upcomingCertificates = [
    {
      id: 'cert-3',
      title: 'Advanced Tabla Bols',
      progress: 45,
      icon: '🥁'
    },
    {
      id: 'cert-4',
      title: 'Bharatanatyam Posture',
      progress: 10,
      icon: '🕍'
    }
  ];

  const handleDownload = (cert: any) => {
    // Basic simulation of a download action
    const printContent = `
      CERTIFICATE OF COMPLETION
      -------------------------
      This is to certify that
      ARJUN MEHTA
      has successfully completed the course
      ${cert.title}
      at ${APP_NAME}
      Grade: ${cert.grade}
      Instructor: ${cert.instructor}
      Date: ${cert.date}
    `;
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cert.title}_Certificate.txt`;
    link.click();
  };

  return (
    <div className="space-y-8">
      <motion.section 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-500 text-white shadow-xl shadow-amber-500/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black mb-3">Your Achievements</h1>
            <p className="text-white/90 max-w-xl">
              Celebrate your artistic journey. You have earned {earnedCertificates.length} official certifications from the London Serenade School of Music.
            </p>
          </div>
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
            <Award size={48} className="text-white" />
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Gallery */}
        <section className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold">Earned Certificates</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary-600 transition">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <motion.article
                key={cert.id}
                whileHover={{ y: -5 }}
                className="p-6 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group"
              >
                {/* Decorative Tier Badge */}
                <div className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  cert.tier === 'Gold' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {cert.tier} Edition
                </div>

                <div className="text-4xl mb-6">{cert.icon}</div>
                <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Instructor: {cert.instructor}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                  <div className="text-[11px] font-bold text-gray-400">
                    ID: {cert.id.toUpperCase()}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDownload(cert)}
                      className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition"
                    >
                      <Download size={18} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Progress Sidebar */}
        <section className="xl:col-span-4 space-y-6">
          <h3 className="text-2xl font-bold px-2">In Progress</h3>
          <div className="space-y-4">
            {upcomingCertificates.map((cert) => (
              <div key={cert.id} className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 opacity-80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{cert.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{cert.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{cert.progress}% Complete</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-gray-50 dark:bg-gray-800 overflow-hidden mb-3">
                  <div className="h-full bg-amber-500" style={{ width: `${cert.progress}%` }} />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <Lock size={10} /> LOCKS AT 100%
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gray-900 text-white">
            <h4 className="font-bold mb-2">Did you know?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              ArtBeat certifications are recognized by leading cultural institutions globally. Add them to your LinkedIn profile to showcase your skills.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
