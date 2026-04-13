import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import api from '@/lib/axios';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
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
      await api.post('/contact', data);
      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      {/* Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Have questions about our courses or institutional programs? We're here to help you unlock your artistic potential.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Us</p>
                    <a href="mailto:info@lssm.co.in" className="text-lg font-semibold hover:text-primary-600 transition">info@lssm.co.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Call Us</p>
                    <a href="tel:+911234567890" className="text-lg font-semibold hover:text-primary-600 transition">+91 123 456 7890</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Visit Our Studio</p>
                    <p className="text-lg font-semibold">123 Arts Lane, Serenade Square,<br />Kolkata, West Bengal, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                <div className="flex items-center gap-3 text-primary-700 dark:text-primary-300 mb-2">
                  <MessageSquare size={20} />
                  <span className="font-bold">Live Chat Available</span>
                </div>
                <p className="text-sm text-primary-600/80 dark:text-primary-400">Our support team is active Mon-Sat, 10 AM - 7 PM IST.</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Thank you for reaching out. We've received your message and will get back to you at info@lssm.co.in or your provided email shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                  
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 ml-1">Full Name</label>
                      <input 
                        {...register('name')} 
                        placeholder="John Doe"
                        className={`w-full h-12 px-4 rounded-xl border bg-gray-50 dark:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                          errors.name ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 ml-1">Email Address</label>
                      <input 
                        type="email"
                        {...register('email')} 
                        placeholder="john@example.com"
                        className={`w-full h-12 px-4 rounded-xl border bg-gray-50 dark:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                          errors.email ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 ml-1">Subject</label>
                    <input 
                      {...register('subject')} 
                      placeholder="How can we help?"
                      className={`w-full h-12 px-4 rounded-xl border bg-gray-50 dark:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.subject ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 ml-1">Message</label>
                    <textarea 
                      {...register('message')} 
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className={`w-full p-4 rounded-xl border bg-gray-50 dark:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 gradient-bg text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-primary-500/20 disabled:opacity-70 group"
                  >
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
