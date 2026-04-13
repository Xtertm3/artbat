import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const PRICING_PLANS = [
  {
    name: 'Hobbyist',
    price: '₹1499',
    period: '/month',
    description: 'Perfect for beginners starting their artistic journey.',
    features: [
      'Access to 5 Beginner Courses',
      'Basic Community Access',
      'Course Completion Certificates',
      'Mobile App Access',
      'Standard Support'
    ],
    buttonText: 'Start Learning',
    popular: false,
    icon: <Zap size={24} />,
  },
  {
    name: 'Professional',
    price: '₹3499',
    period: '/month',
    description: 'For dedicated artists looking for expert mastery.',
    features: [
      'Unlimited Access to All Courses',
      'Live Masterclasses & Workshops',
      'Direct Instructor Feedbacks',
      'Exclusive Practice Resources',
      'Priority Priority Support',
      'Advanced Certifications'
    ],
    buttonText: 'Join Pro Tier',
    popular: true,
    icon: <Award size={24} />,
  },
  {
    name: 'Institutional',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for schools and organizations.',
    features: [
      'Multi-user Dashboard',
      'Progress Tracking for Teams',
      'Custom Course Curriculums',
      'LMS Integration Support',
      'Dedicated Account Manager',
      'Bulk Enrollment Discounts'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    icon: <Globe size={24} />,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-semibold mb-4"
          >
            Flexible Pricing for Everyone
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Invest in Your <span className="gradient-text">Artistic Vision</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Choose a plan that fits your learning pace. High-quality art education, taught by world-class masters, accessible anywhere.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular 
                  ? 'bg-white dark:bg-gray-900 border-primary-500 shadow-2xl shadow-primary-500/10' 
                  : 'bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 backdrop-blur-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg text-white text-xs font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular ? 'gradient-bg text-white' : 'bg-gray-100 dark:bg-gray-800 text-primary-500'
              }`}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">{plan.period}</span>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Check size={14} />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to={plan.name === 'Institutional' ? ROUTES.CONTACT : ROUTES.REGISTER}
                className={`w-full py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2 group ${
                  plan.popular 
                    ? 'gradient-bg text-white shadow-xl shadow-primary-500/30 hover:opacity-90' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {plan.buttonText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview or Trust Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Shield className="text-primary-500" />
              <span className="font-semibold">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-primary-500" />
              <span className="font-semibold">Authentic Certifications</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-primary-500" />
              <span className="font-semibold">Global Community</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
