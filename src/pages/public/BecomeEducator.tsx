import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  Clock, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Music, 
  Search, 
  UserPlus
} from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/axios';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  instrument: z.string().min(2, 'Please specify your instrument or subject'),
  experience: z.string().min(1, 'Please specify your experience'),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  message: z.string().min(20, 'Please tell us a bit more about your teaching background (min 20 chars)'),
});

type FormData = z.infer<typeof schema>;

export default function BecomeEducatorPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Mocking submission to a relevant endpoint or the contact endpoint
      await api.post('/contact', {
        ...data,
        subject: `Educator Application: ${data.instrument}`,
      });
      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description: "Set your own hours and teach from the comfort of your home or studio."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      description: "Connect with students from all over the world and grow your international reputation."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Professional Tools",
      description: "Access our state-of-the-art virtual classroom and assessment technologies."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Artist Community",
      description: "Join a network of elite educators and artists sharing knowledge and inspiration."
    }
  ];

  const steps = [
    { title: "Apply", desc: "Fill out the enrollment form with your details and portfolio." },
    { title: "Review", desc: "Our academic team reviews your background and expertise." },
    { title: "Interview", desc: "A brief session to discuss your teaching philosophy and methods." },
    { title: "Onboard", desc: "Get trained on our platform and start your first batch!" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-bold mb-6"
          >
            <Music size={16} />
            <span>Join Our Faculty</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            Shape the Future of <span className="gradient-text">Artistic Education</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            ArtBeat is looking for passionate musicians, dancers, and theater artists to join our world-class faculty. Share your talent with thousands of eager students globally.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none hover:border-primary-500/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Process & Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Our Selection <span className="text-primary-600">Process</span></h2>
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800 -z-0" />
                
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (0.1 * idx) }}
                    className="flex gap-6 relative z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-50 dark:border-gray-800 flex items-center justify-center text-primary-600 font-black shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gray-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-4 relative z-10">Need more info?</h4>
              <p className="text-gray-400 text-sm mb-6 relative z-10">Check our FAQ for educators or reach out to our talent acquisition team directly.</p>
              <a href="mailto:talent@lssm.co.in" className="inline-flex items-center gap-2 text-primary-400 font-bold hover:text-primary-300 transition">
                talent@lssm.co.in <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Side: Application Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none relative"
            >
              {isSubmitted ? (
                <div className="py-16 text-center">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 animate-bounce">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Application Received!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">
                    Thank you for your interest in joining ArtBeat. Our team will review your profile and contact you within 3-5 business days.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-10 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl">
                      <UserPlus size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Educator Enrollment</h3>
                      <p className="text-sm text-gray-500">Fill in your details to get started.</p>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium border border-red-100 dark:border-red-900/30">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Full Name</label>
                      <input 
                        {...register('name')} 
                        placeholder="Maestro John"
                        className={`w-full h-14 px-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 ${
                          errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Email Address</label>
                      <input 
                        type="email"
                        {...register('email')} 
                        placeholder="maestro@music.com"
                        className={`w-full h-14 px-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 ${
                          errors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Instrument / Subject</label>
                      <input 
                        {...register('instrument')} 
                        placeholder="e.g. Classical Guitar"
                        className={`w-full h-14 px-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 ${
                          errors.instrument ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                        }`}
                      />
                      {errors.instrument && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.instrument.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Years of Experience</label>
                      <select 
                        {...register('experience')} 
                        className={`w-full h-14 px-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 appearance-none ${
                          errors.experience ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                        }`}
                      >
                        <option value="">Select experience</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      {errors.experience && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.experience.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Portfolio / Social Link (Optional)</label>
                    <input 
                      {...register('portfolio')} 
                      placeholder="https://youtube.com/myperformances"
                      className={`w-full h-14 px-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 ${
                        errors.portfolio ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                      }`}
                    />
                    {errors.portfolio && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.portfolio.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Teaching Background / Why ArtBeat?</label>
                    <textarea 
                      {...register('message')} 
                      placeholder="Share a bit about your journey as an artist and educator..."
                      rows={4}
                      className={`w-full p-5 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 transition focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:bg-white dark:focus:bg-gray-900 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-100 dark:border-gray-700 hover:border-primary-500/50'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.message.message}</p>}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 px-1 italic">
                    By submitting this application, you agree to our educator terms and background verification process.
                  </p>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 gradient-bg text-white rounded-[1.25rem] font-black text-lg flex items-center justify-center gap-3 hover:opacity-95 transition-all shadow-xl shadow-primary-500/25 disabled:opacity-70 group mt-4 transform active:scale-[0.98]"
                  >
                    {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <CheckCircle2 size={24} className="group-hover:scale-110 transition-transform" />}
                    {isSubmitting ? 'Processing Application...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
