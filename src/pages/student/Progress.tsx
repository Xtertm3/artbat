import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Award, Brain, Zap, ZapOff } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const WEEKLY_DATA = [
  { day: 'Mon', hours: 1.5, practice: 45 },
  { day: 'Tue', hours: 2.1, practice: 60 },
  { day: 'Wed', hours: 0.8, practice: 30 },
  { day: 'Thu', hours: 3.2, practice: 90 },
  { day: 'Fri', hours: 2.5, practice: 75 },
  { day: 'Sat', hours: 4.0, practice: 120 },
  { day: 'Sun', hours: 2.8, practice: 80 },
];

const SKILL_DATA = [
  { name: 'Theory', value: 85, color: '#6366f1' },
  { name: 'Technique', value: 70, color: '#a855f7' },
  { name: 'Performance', value: 92, color: '#ec4899' },
  { name: 'Ear Training', value: 65, color: '#3b82f6' },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-xl shadow-xl">
        <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-black text-primary-600">{payload[0].value} Hours Learned</p>
      </div>
    );
  }
  return null;
};

export default function StudentProgressPage() {
  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
              <Clock size={20} />
            </div>
            <p className="text-sm font-bold text-gray-500">Learning Hours</p>
          </div>
          <p className="text-4xl font-black mb-1">16.9 <span className="text-sm text-emerald-500 font-bold">+12%</span></p>
          <p className="text-xs text-gray-400">Total time spent this week</p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <Target size={20} />
            </div>
            <p className="text-sm font-bold text-gray-500">Course Completion</p>
          </div>
          <p className="text-4xl font-black mb-1">68% <span className="text-sm text-purple-500 font-bold">On Track</span></p>
          <p className="text-xs text-gray-400">Average across 4 courses</p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-600">
              <Award size={20} />
            </div>
            <p className="text-sm font-bold text-gray-500">Global Rank</p>
          </div>
          <p className="text-4xl font-black mb-1">Top 5%</p>
          <p className="text-xs text-gray-400">In the ArtBeat Community</p>
        </motion.article>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <section className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold">Learning Activity</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600">Weekly</button>
              <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg">Monthly</button>
            </div>
          </div>
          <div className="h-[400px] w-full bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_DATA}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Skill Breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold px-2">Skill Mastery</h2>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 space-y-8">
            {SKILL_DATA.map((skill, idx) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">{skill.name}</span>
                  <span className="text-sm font-black text-gray-900 dark:text-gray-100">{skill.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </motion.div>
            ))}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 mb-4">You're making incredible progress in <span className="font-bold text-gray-900 dark:text-gray-100">Performance</span>. Sharpen your Theory to level up!</p>
              <button className="text-sm font-bold text-primary-600 hover:underline">Download Performance Report</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
