import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import musicPulseData from '@/assets/lottie/musicPulse.json';
import eqBarsData from '@/assets/lottie/eqBars.json';

class LottieErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Intentionally silent to avoid noisy logs in production.
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function SafeLottie({ animationData }: { animationData: object }) {
  return (
    <LottieErrorBoundary>
      <Lottie animationData={animationData} loop autoplay />
    </LottieErrorBoundary>
  );
}

/**
 * Decorative Lottie animations for the hero section.
 * All positioned absolutely — parent must be `relative overflow-hidden`.
 */
export default function HeroAnimations() {
  return (
    <>
      {/* Large pulse — top-right */}
      <motion.div
        className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <SafeLottie animationData={musicPulseData} />
      </motion.div>

      {/* Medium pulse — bottom-left */}
      <motion.div
        className="absolute -bottom-12 -left-12 w-48 h-48 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.14, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
      >
        <SafeLottie animationData={musicPulseData} />
      </motion.div>

      {/* Small pulse — mid-left */}
      <motion.div
        className="absolute top-1/3 -left-8 w-32 h-32 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
      >
        <SafeLottie animationData={musicPulseData} />
      </motion.div>

      {/* EQ bars — top-left badge */}
      <motion.div
        className="absolute top-10 left-8 w-20 h-20 pointer-events-none hidden sm:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
      >
        <SafeLottie animationData={eqBarsData} />
      </motion.div>

      {/* EQ bars — bottom-right badge */}
      <motion.div
        className="absolute bottom-24 right-10 w-20 h-20 pointer-events-none hidden sm:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.45, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: 'easeOut' }}
      >
        <SafeLottie animationData={eqBarsData} />
      </motion.div>
    </>
  );
}
