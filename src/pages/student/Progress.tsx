import { motion } from 'framer-motion';
import { TrendingUp, Clock, Target, Award, Brain, Zap, Loader2 } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useProgress } from '@/hooks/useStudentData';

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

function StatSkeleton() {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
      </div>
      <div className="h-8 w-20 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
      <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
    </div>
  );
}

export default function StudentProgressPage() {
  const { statsQuery, activityQuery, skillsQuery } = useProgress();

  const stats = statsQuery.data || { totalHours: 0, completion: 0, rank: 'N/A', hourDiff: 0 };
  const activityData = activityQuery.data || [];
  const skillData = skillsQuery.data || [];
  const isLoading = statsQuery.isLoading || activityQuery.isLoading || skillsQuery.isLoading;

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
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
              <p className="text-4xl font-black mb-1">
                {stats.totalHours} <span className={`text-sm font-bold ${stats.hourDiff >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stats.hourDiff >= 0 ? '+' : ''}{stats.hourDiff}%
                </span>
              </p>
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
              <p className="text-4xl font-black mb-1">{stats.completion}% <span className="text-sm text-purple-500 font-bold">On Track</span></p>
              <p className="text-xs text-gray-400">Average across enrolled courses</p>
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
              <p className="text-4xl font-black mb-1">{stats.rank}</p>
              <p className="text-xs text-gray-400">In the ArtBeat Community</p>
            </motion.article>
          </>
        )}
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
            {activityQuery.isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary-500" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData.length ? activityData : [
                  { day: 'M', hours: 0 }, { day: 'T', hours: 0 }, { day: 'W', hours: 0 },
                  { day: 'T', hours: 0 }, { day: 'F', hours: 0 }, { day: 'S', hours: 0 }, { day: 'S', hours: 0 }
                ]}>
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
            )}
          </div>
        </section>

        {/* Skill Breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold px-2">Skill Mastery</h2>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 space-y-8">
            {skillsQuery.isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-primary-500" />
              </div>
            ) : skillData.length === 0 ? (
              <div className="text-center py-10">
                <Award size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">Start learning to build skills!</p>
              </div>
            ) : (
              skillData.map((skill: any, idx: number) => (
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
                      style={{ backgroundColor: skill.color || '#6366f1' }}
                    />
                  </div>
                </motion.div>
              ))
            )}

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-sm text-gray-500 mb-4">Live feedback and performance analytics are synchronized with your practice zone activity.</p>
              <button className="text-sm font-bold text-primary-600 hover:underline">Download Report</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
