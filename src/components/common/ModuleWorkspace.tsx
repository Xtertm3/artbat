import { CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import LottieComponent from 'lottie-react';
import eqBarsData from '@/assets/lottie/eqBars.json';

// Handle ESM/CJS interop for Lottie
const Lottie = (LottieComponent as any).default || LottieComponent;


interface ModuleWorkspaceProps {
  title: string;
  subtitle: string;
  tasks?: string[];
}

const DEFAULT_TASKS = [
  'Finalize visual layout and interactive states',
  'Connect API data sources and loading behavior',
  'Add validation, empty states, and error handling',
  'Complete responsive and accessibility QA pass',
];

export function ModuleWorkspace({ title, subtitle, tasks = DEFAULT_TASKS }: ModuleWorkspaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-6"
    >
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="rounded-2xl p-6 lg:p-8 bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-700 text-white"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide bg-white/20 rounded-full px-3 py-1 mb-4">
              <Sparkles size={13} /> Active Workspace
            </div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-white/90 max-w-2xl">{subtitle}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.45 }}
            className="rounded-xl bg-white/15 border border-white/30 p-3 backdrop-blur-sm shrink-0"
          >
            <div className="w-24 h-24">
              <Lottie animationData={eqBarsData} loop autoplay />
            </div>
            <p className="text-[11px] text-white/90 text-center mt-1 font-medium">Live Rhythm</p>
          </motion.div>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <p className="text-2xl font-bold">Frontend Active</p>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <p className="text-sm text-gray-500 mb-1">Current Focus</p>
          <p className="text-2xl font-bold">UX + Data Wiring</p>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.35 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
        >
          <p className="text-sm text-gray-500 mb-1">Phase</p>
          <p className="text-2xl font-bold">In Progress</p>
        </motion.article>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock3 size={16} className="text-primary-600" />
          <h2 className="text-lg font-bold">Implementation Checklist</h2>
        </div>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <motion.li
              key={task}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42 + index * 0.06, duration: 0.25 }}
              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
            >
              <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
              {task}
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
}
