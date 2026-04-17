import { motion } from 'framer-motion';
import { Award, Download, Share2, Filter, Lock, Loader2 } from 'lucide-react';
import { useCertificates } from '@/hooks/useStudentData';

export default function StudentCertificatesPage() {
  const { listQuery, downloadMutation } = useCertificates();

  const certificates = listQuery.data || [];
  const isLoading = listQuery.isLoading;

  const earnedCertificates = certificates.filter((c: any) => c.status === 'earned');
  const upcomingCertificates = certificates.filter((c: any) => c.status === 'in_progress');

  const handleDownload = (certId: string) => {
    downloadMutation.mutate(certId, {
      onSuccess: (data) => {
        if (data?.url) {
          window.open(data.url, '_blank');
        } else {
          alert('Certificate file not found.');
        }
      }
    });
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
              Celebrate your artistic journey. {isLoading ? 'Syncing your credentials...' : `You have earned ${earnedCertificates.length} official certifications.`}
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
            {isLoading ? (
              [1,2].map(i => (
                <div key={i} className="h-64 rounded-[2rem] bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))
            ) : earnedCertificates.length === 0 ? (
              <div className="md:col-span-2 text-center py-20 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem]">
                <Award size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Complete a course to earn your first certificate!</p>
              </div>
            ) : (
              earnedCertificates.map((cert: any) => (
                <motion.article
                  key={cert.id}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group"
                >
                  <div className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    cert.tier === 'Gold' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {cert.tier || 'Standard'} Edition
                  </div>

                  <div className="text-4xl mb-6">{cert.icon || '🏅'}</div>
                  <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-500 mb-6">Instructor: {cert.instructorName}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                    <div className="text-[11px] font-bold text-gray-400 uppercase">
                      ID: {cert.id.slice(0, 8).toUpperCase()}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        disabled={downloadMutation.isPending}
                        onClick={() => handleDownload(cert.id)}
                        className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition disabled:opacity-50"
                      >
                        {downloadMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                      </button>
                      <button className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </section>

        {/* Progress Sidebar */}
        <section className="xl:col-span-4 space-y-6">
          <h3 className="text-2xl font-bold px-2">In Progress</h3>
          <div className="space-y-4">
            {upcomingCertificates.length === 0 && !isLoading && (
              <p className="text-sm text-gray-500 px-2">No certificates currently in progress.</p>
            )}
            {upcomingCertificates.map((cert: any) => (
              <div key={cert.id} className="p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 opacity-80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{cert.icon || '🏅'}</div>
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
              ArtBeat certifications are recognized by leading cultural institutions globally. All credentials are cryptographically verifiable.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
